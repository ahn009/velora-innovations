#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const manifestFile = new URL('../src/lib/site-manifest.json', import.meta.url)
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
const siteUrl = new URL(manifest.siteUrl)
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
const endpoint = 'https://api.indexnow.org/indexnow'
const keyLocation = new URL(manifest.indexNowKeyPath, siteUrl)
const keyPattern = /^[A-Za-z0-9-]{8,128}$/
const requestTimeoutMs = 20_000
const maxBatchSize = 10_000

if (configuredSiteUrl && configuredSiteUrl !== manifest.siteUrl) {
  throw new Error(`NEXT_PUBLIC_SITE_URL must be ${manifest.siteUrl} for production IndexNow submissions.`)
}

function usage() {
  return `Usage:
  npm run indexnow -- --url /path [--url /another-path]
  npm run indexnow -- --deleted /removed-path
  npm run indexnow:all
  npm run indexnow:changed -- --base <git-sha> --head <git-sha>

Options:
  --url <url>              Submit one current canonical URL; repeat for a batch.
  --deleted <url>          Submit a deleted canonical URL; repeat for a batch.
  --all                    Submit every URL in the deployed sitemap.
  --changed                Discover changed and deleted routes from Git.
  --base <git-sha>         Base revision for --changed (defaults to HEAD^).
  --head <git-sha>         Head revision for --changed (defaults to HEAD).
  --wait-for-commit <sha>  Wait for this Vercel commit before submitting.
  --skip-if-noindex        Exit successfully without submitting when production is noindex.
  --dry-run                Validate and print URLs without contacting IndexNow.
  --help                    Show this help.`
}

function takeValue(argumentsList, index, option) {
  const value = argumentsList[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`${option} requires a value.`)
  return value
}

function parseArguments(argumentsList) {
  const options = {
    mode: 'manual',
    urls: [],
    deletedUrls: [],
    base: undefined,
    head: 'HEAD',
    waitForCommit: undefined,
    skipIfNoindex: false,
    dryRun: false,
  }

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index]
    if (argument === '--url') {
      options.urls.push(takeValue(argumentsList, index, argument))
      index += 1
    } else if (argument === '--deleted') {
      options.deletedUrls.push(takeValue(argumentsList, index, argument))
      index += 1
    } else if (argument === '--all') {
      options.mode = 'all'
    } else if (argument === '--changed') {
      options.mode = 'changed'
    } else if (argument === '--base') {
      options.base = takeValue(argumentsList, index, argument)
      index += 1
    } else if (argument === '--head') {
      options.head = takeValue(argumentsList, index, argument)
      index += 1
    } else if (argument === '--wait-for-commit') {
      options.waitForCommit = takeValue(argumentsList, index, argument)
      index += 1
    } else if (argument === '--skip-if-noindex') {
      options.skipIfNoindex = true
    } else if (argument === '--dry-run') {
      options.dryRun = true
    } else if (argument === '--help') {
      console.log(usage())
      process.exit(0)
    } else {
      throw new Error(`Unknown option: ${argument}`)
    }
  }

  if (options.mode !== 'manual' && (options.urls.length || options.deletedUrls.length)) {
    throw new Error('Use --all, --changed, or explicit --url/--deleted values, not both.')
  }
  if (options.mode === 'manual' && !options.urls.length && !options.deletedUrls.length) {
    throw new Error(`No URLs supplied.\n\n${usage()}`)
  }

  return options
}

function normalizeUrl(value) {
  const url = value.startsWith('/') ? new URL(value, siteUrl) : new URL(value)
  if (url.origin !== siteUrl.origin) {
    throw new Error(`IndexNow URL must belong to ${siteUrl.origin}: ${value}`)
  }
  if (url.search || url.hash) {
    throw new Error(`IndexNow URL must be a canonical URL without a query or fragment: ${value}`)
  }
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '')
  return url.pathname === '/' ? canonicalRootUrl() : url.href
}

function canonicalRootUrl() {
  return siteUrl.href.replace(/\/$/, '')
}

async function fetchWithTimeout(url, init = {}) {
  return fetch(url, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(requestTimeoutMs),
  })
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
}

async function getDeployedSitemapUrls() {
  const sitemapUrl = new URL('/sitemap.xml', siteUrl)
  const response = await fetchWithTimeout(sitemapUrl)
  if (!response.ok) throw new Error(`Could not read ${sitemapUrl.href} (HTTP ${response.status}).`)

  const xml = await response.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizeUrl(decodeXml(match[1].trim())))
  return new Set(urls)
}

async function indexingIsAllowed() {
  const response = await fetchWithTimeout(canonicalRootUrl())
  if (!response.ok) throw new Error(`Could not inspect ${canonicalRootUrl()} (HTTP ${response.status}).`)
  const html = await response.text()
  const robotsTags = [...html.matchAll(/<meta[^>]+name=["'](?:robots|bingbot)["'][^>]*>/gi)].map((match) => match[0])
  return !robotsTags.some((tag) => /content=["'][^"']*\bnoindex\b/i.test(tag))
}

async function verificationFileMatches(key) {
  const response = await fetchWithTimeout(`${keyLocation.href}?verification=${Date.now()}`)
  if (!response.ok) return { matches: false, commit: response.headers.get('x-velora-deployment-commit') }
  const body = await response.text()
  return {
    matches: body === key,
    commit: response.headers.get('x-velora-deployment-commit'),
  }
}

async function waitForDeployment(key, expectedCommit) {
  const deadline = Date.now() + 10 * 60_000
  while (Date.now() < deadline) {
    try {
      const verification = await verificationFileMatches(key)
      const commitMatches = !expectedCommit || verification.commit === expectedCommit
      if (verification.matches && commitMatches) return
    } catch {
      // The deployment may still be switching over. Retry until the deadline.
    }
    await new Promise((resolve) => setTimeout(resolve, 15_000))
  }
  throw new Error(`Timed out waiting for deployment ${expectedCommit ?? ''} and the IndexNow verification file.`.trim())
}

function routeFromPageFile(filePath) {
  const normalized = filePath.replaceAll('\\', '/')
  const match = normalized.match(/^src\/app\/(.*\/)?page\.(?:js|jsx|ts|tsx)$/)
  if (!match) return undefined

  const path = (match[1] ?? '')
    .split('/')
    .filter(Boolean)
    .filter((segment) => !segment.startsWith('(') && !segment.startsWith('@'))

  if (path.some((segment) => segment.startsWith('['))) return undefined
  return path.length ? `/${path.join('/')}` : '/'
}

function isGlobalPageChange(filePath) {
  const normalized = filePath.replaceAll('\\', '/')
  return [
    /^src\/app\/layout\./,
    /^src\/app\/globals\.css$/,
    /^src\/app\/(?:sitemap|robots)\.ts$/,
    /^src\/components\//,
    /^src\/lib\//,
    /^public\//,
    /^next\.config\./,
    /^package(?:-lock)?\.json$/,
    /^postcss\.config\./,
  ].some((pattern) => pattern.test(normalized))
}

function loadManifestRoutesAtRevision(revision) {
  try {
    const contents = execFileSync('git', ['show', `${revision}:src/lib/site-manifest.json`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    const historicalManifest = JSON.parse(contents)
    return new Set(historicalManifest.routes ?? [])
  } catch {
    return new Set()
  }
}

function resolveBaseRevision(base, head) {
  if (base && !/^0+$/.test(base)) return base
  try {
    return execFileSync('git', ['rev-parse', `${head}^`], { encoding: 'utf8' }).trim()
  } catch {
    return undefined
  }
}

function discoverChangedRoutes(baseArgument, head) {
  const base = resolveBaseRevision(baseArgument, head)
  const currentRoutes = new Set(manifest.routes)
  if (!base) return { changed: currentRoutes, deleted: new Set(), globalChange: true }

  const previousRoutes = loadManifestRoutesAtRevision(base)
  const changed = new Set([...currentRoutes].filter((route) => !previousRoutes.has(route)))
  const deleted = new Set([...previousRoutes].filter((route) => !currentRoutes.has(route)))
  const diff = execFileSync('git', ['diff', '--name-status', '--find-renames', base, head], { encoding: 'utf8' })
  let globalChange = false

  for (const line of diff.split(/\r?\n/).filter(Boolean)) {
    const [status, firstPath, secondPath] = line.split('\t')
    const isRename = status.startsWith('R') || status.startsWith('C')
    const oldPath = isRename ? firstPath : status === 'D' ? firstPath : undefined
    const newPath = isRename ? secondPath : status === 'D' ? undefined : firstPath

    if (oldPath) {
      const route = routeFromPageFile(oldPath)
      if (route && previousRoutes.has(route) && !currentRoutes.has(route)) deleted.add(route)
      if (!route && isGlobalPageChange(oldPath)) globalChange = true
    }
    if (newPath) {
      const route = routeFromPageFile(newPath)
      if (route && currentRoutes.has(route)) changed.add(route)
      if (!route && isGlobalPageChange(newPath)) globalChange = true
    }
  }

  return { changed, deleted, globalChange }
}

async function submitUrls(key, urls) {
  const list = [...urls]
  for (let offset = 0; offset < list.length; offset += maxBatchSize) {
    const urlList = list.slice(offset, offset + maxBatchSize)
    const response = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: siteUrl.host,
        key,
        keyLocation: keyLocation.href,
        urlList,
      }),
    })

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow rejected a batch of ${urlList.length} URL(s) with HTTP ${response.status}.`)
    }
    console.log(`IndexNow accepted a crawling notification for ${urlList.length} URL(s) (HTTP ${response.status}).`)
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2))
  const key = process.env.INDEXNOW_API_KEY?.trim()
  if (!key || !keyPattern.test(key)) {
    throw new Error('INDEXNOW_API_KEY must contain 8-128 letters, numbers, or dashes.')
  }

  if (!options.dryRun) {
    if (options.waitForCommit) await waitForDeployment(key, options.waitForCommit)
    else {
      const verification = await verificationFileMatches(key)
      if (!verification.matches) throw new Error(`IndexNow verification failed at ${keyLocation.href}.`)
    }

    if (!(await indexingIsAllowed())) {
      if (options.skipIfNoindex) {
        console.log('IndexNow submission skipped because production currently publishes a noindex directive.')
        return
      }
      throw new Error('Production currently publishes a noindex directive; IndexNow submission was not sent.')
    }
  }

  const deployedUrls = options.dryRun
    ? new Set(manifest.routes.map((path) => normalizeUrl(path)))
    : await getDeployedSitemapUrls()
  const urls = new Set()

  if (options.mode === 'all') {
    for (const url of deployedUrls) urls.add(url)
  } else if (options.mode === 'changed') {
    const discovered = discoverChangedRoutes(options.base, options.head)
    if (discovered.globalChange) {
      for (const url of deployedUrls) urls.add(url)
    } else {
      for (const route of discovered.changed) {
        const url = normalizeUrl(route)
        if (deployedUrls.has(url)) urls.add(url)
      }
    }
    for (const route of discovered.deleted) urls.add(normalizeUrl(route))
  } else {
    for (const value of options.urls) {
      const url = normalizeUrl(value)
      if (!deployedUrls.has(url)) throw new Error(`Current URL is not in the deployed sitemap: ${url}`)
      urls.add(url)
    }
    for (const value of options.deletedUrls) urls.add(normalizeUrl(value))
  }

  if (!urls.size) {
    console.log('No relevant canonical URL changes were found; nothing was submitted.')
    return
  }

  console.log(`${options.dryRun ? 'Would notify' : 'Notifying'} IndexNow about ${urls.size} canonical URL(s):`)
  for (const url of urls) console.log(`- ${url}`)
  if (!options.dryRun) await submitUrls(key, urls)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'IndexNow submission failed.')
  process.exitCode = 1
})
