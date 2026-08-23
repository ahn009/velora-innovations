import 'server-only'

import { createHash } from 'node:crypto'
import { db } from '@/lib/db'

export const CONSENT_VERSION = '2026-08-06'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+()\-\.\s\d]{7,30}$/

const industries = new Set([
  'home-services',
  'dental',
  'medical',
  'law',
  'property-management',
  'real-estate',
  'accounting-firm',
  'automotive-business',
  'marketing-agency',
  'e-commerce',
  'other',
])

const budgets = new Set([
  'under-2500',
  '2500-5000-usd',
  '5000-10000-usd',
  '10000-20000-usd',
  '20000-plus-usd',
  'not-sure',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

function normalizeEmail(value: unknown) {
  return cleanString(value, 254).toLowerCase()
}

export function validateLead(input: unknown) {
  const data = isRecord(input) ? input : {}
  const value = {
    firstName: cleanString(data.firstName, 80),
    lastName: cleanString(data.lastName, 80),
    email: normalizeEmail(data.email),
    phone: cleanString(data.phone, 30),
    company: cleanString(data.company, 120),
    industry: cleanString(data.industry, 80),
    budget: cleanString(data.budget, 80),
    notes: cleanString(data.notes, 2000),
    source: cleanString(data.source, 120) || 'website-consultation',
    utmSource: cleanString(data.utmSource, 100),
    utmMedium: cleanString(data.utmMedium, 100),
    utmCampaign: cleanString(data.utmCampaign, 150),
    utmContent: cleanString(data.utmContent, 150),
    utmTerm: cleanString(data.utmTerm, 150),
    referrer: cleanString(data.referrer, 500),
    landingPage: cleanString(data.landingPage, 200),
    primaryOpportunity: cleanString(data.primaryOpportunity, 120),
    secondaryOpportunity: cleanString(data.secondaryOpportunity, 120),
    readiness: cleanString(data.readiness, 40),
    timeline: cleanString(data.timeline, 40),
  }

  if (cleanString(data.website, 200)) return { ok: false as const, message: 'Unable to submit this request.' }
  if (!value.firstName || !value.lastName || !value.company) return { ok: false as const, message: 'Please complete all required fields.' }
  if (!EMAIL_PATTERN.test(value.email)) return { ok: false as const, message: 'Please enter a valid email address.' }
  if (value.phone && !PHONE_PATTERN.test(value.phone)) return { ok: false as const, message: 'Please enter a valid phone number.' }
  if (!industries.has(value.industry)) return { ok: false as const, message: 'Please select a valid industry.' }
  if (value.budget && !budgets.has(value.budget)) return { ok: false as const, message: 'Please select a valid budget range.' }
  if (data.consent !== true) return { ok: false as const, message: 'Please agree to the privacy notice before submitting.' }

  return { ok: true as const, value }
}

export function validateNewsletter(input: unknown) {
  const data = isRecord(input) ? input : {}
  const email = normalizeEmail(data.email)
  const source = cleanString(data.source, 120) || 'website-newsletter'

  if (cleanString(data.website, 200)) return { ok: false as const, message: 'Unable to submit this request.' }
  if (!EMAIL_PATTERN.test(email)) return { ok: false as const, message: 'Please enter a valid email address.' }
  if (data.consent !== true) return { ok: false as const, message: 'Please confirm that you want to receive email updates.' }

  return { ok: true as const, value: { email, source } }
}

export function validateUnsubscribe(input: unknown) {
  const data = isRecord(input) ? input : {}
  const email = normalizeEmail(data.email)

  if (cleanString(data.website, 200)) return { ok: false as const, message: 'Unable to submit this request.' }
  if (!EMAIL_PATTERN.test(email)) return { ok: false as const, message: 'Please enter a valid email address.' }

  return { ok: true as const, value: { email } }
}

export function getRequestFingerprint(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const address = forwarded || request.headers.get('x-real-ip') || 'unknown'
  const agent = request.headers.get('user-agent') || 'unknown'
  return createHash('sha256').update(`${address}|${agent}`).digest('hex')
}

export async function checkRateLimit(kind: 'lead' | 'newsletter' | 'unsubscribe', fingerprint: string) {
  const windowMs = 10 * 60 * 1000
  const limit = kind === 'lead' ? 5 : 8
  const now = Date.now()
  const bucketStart = Math.floor(now / windowMs) * windowMs
  const id = `${kind}:${bucketStart}:${fingerprint}`
  const expiresAt = new Date(bucketStart + windowMs * 2)

  const bucket = await db.rateLimitBucket.upsert({
    where: { id },
    create: { id, count: 1, expiresAt },
    update: { count: { increment: 1 } },
    select: { count: true },
  })

  if (Math.random() < 0.02) {
    void db.rateLimitBucket.deleteMany({ where: { expiresAt: { lt: new Date() } } })
  }

  return bucket.count <= limit
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
  if (!forwardedHost) return false

  try {
    return new URL(origin).host === forwardedHost
  } catch {
    return false
  }
}

export async function notifyLead(payload: Record<string, string | null>) {
  const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'lead.created', ...payload }),
      signal: AbortSignal.timeout(5000),
    })
  } catch (error) {
    console.error('Lead notification failed after persistence', error)
  }
}
