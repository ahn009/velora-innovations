import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
const port = 9223
const baseUrl = process.env.RAG_QA_BASE_URL ?? 'http://127.0.0.1:3001'
const outputDir = path.join(process.cwd(), '.next', 'rag-visual-qa')
await mkdir(outputDir, { recursive: true })

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(outputDir, 'chrome-profile')}`,
  `${baseUrl}/pricing`,
], { stdio: 'ignore' })

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function debuggerTargets() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`)
      if (response.ok) return response.json()
    } catch {}
    await wait(250)
  }
  throw new Error('Chrome remote debugger did not start.')
}

const targets = await debuggerTargets()
const target = targets.find((item) => item.type === 'page' && item.url.startsWith(baseUrl))
  ?? targets.find((item) => item.type === 'page')
if (!target?.webSocketDebuggerUrl) throw new Error('Chrome did not expose the Velora page target.')

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let commandId = 0
const pending = new Map()
const browserErrors = []
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params?.exceptionDetails?.text ?? 'runtime exception')
  if (message.method === 'Runtime.consoleAPICalled' && message.params?.type === 'error') browserErrors.push('console error')
  if (!message.id) return
  const entry = pending.get(message.id)
  if (!entry) return
  pending.delete(message.id)
  if (message.error) entry.reject(new Error(message.error.message))
  else entry.resolve(message.result)
})

function command(method, params = {}) {
  const id = ++commandId
  socket.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}

await command('Page.enable')
await command('Runtime.enable')

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
]

const results = []
try {
  for (const viewport of viewports) {
    await command('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600,
    })
    await command('Page.navigate', { url: `${baseUrl}/pricing` })
    await wait(1800)
    const launcher = await command('Runtime.evaluate', {
      returnByValue: true,
      expression: `Boolean(document.querySelector('[aria-label="Open Velora Assistant"]'))`,
    })
    if (!launcher.result.value) throw new Error(`Chat launcher was not rendered at ${viewport.width}px.`)
    const clickTarget = await command('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => { const button = document.querySelector('[aria-label="Open Velora Assistant"]'); const rect = button.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, before: button.getAttribute('aria-expanded') } })()`,
    })
    await command('Input.dispatchMouseEvent', { type: 'mousePressed', x: clickTarget.result.value.x, y: clickTarget.result.value.y, button: 'left', clickCount: 1 })
    await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: clickTarget.result.value.x, y: clickTarget.result.value.y, button: 'left', clickCount: 1 })
    await wait(5000)
    const metrics = await command('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const dialog = document.querySelector('[role="dialog"]')
        const close = dialog?.querySelector('[data-slot="dialog-close"]')
        const input = dialog?.querySelector('textarea')
        const rect = (element) => element ? element.getBoundingClientRect().toJSON() : null
        const dialogRect = rect(dialog)
        const closeRect = rect(close)
        const inputRect = rect(input)
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight
        return {
          dialogPresent: Boolean(dialog),
          noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
          dialogWithinViewport: Boolean(dialogRect && dialogRect.left >= -1 && dialogRect.right <= window.innerWidth + 1 && dialogRect.top >= -1 && dialogRect.bottom <= viewportHeight + 1),
          closeAccessible: Boolean(closeRect && closeRect.top >= 0 && closeRect.bottom <= viewportHeight),
          inputReachable: Boolean(inputRect && inputRect.bottom <= viewportHeight && inputRect.top >= 0),
          starterText: dialog?.textContent?.includes('What affects implementation cost?') ?? false,
          dialogRect,
        }
      })()`,
    })
    const screenshot = await command('Page.captureScreenshot', { format: 'png', fromSurface: true })
    const filename = `chat-${viewport.width}.png`
    await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, 'base64'))
    results.push({ ...viewport, click: clickTarget.result.value, browserErrors: [...browserErrors], ...metrics.result.value, screenshot: path.join(outputDir, filename) })
  }
  console.log(JSON.stringify(results, null, 2))
} finally {
  socket.close()
  chrome.kill()
}
