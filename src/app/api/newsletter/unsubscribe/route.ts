import { db } from '@/lib/db'
import {
  checkRateLimit,
  getRequestFingerprint,
  isSameOrigin,
  validateUnsubscribe,
} from '@/lib/submissions'

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 16 * 1024) {
    return Response.json({ message: 'Request is too large.' }, { status: 413 })
  }
  if (!isSameOrigin(request)) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = validateUnsubscribe(body)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

  try {
    const allowed = await checkRateLimit('unsubscribe', getRequestFingerprint(request))
    if (!allowed) {
      return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
    }

    await db.subscriber.updateMany({
      where: { email: parsed.value.email },
      data: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Newsletter unsubscribe failed', error)
    return Response.json({ message: 'We could not process that request right now. Please try again shortly.' }, { status: 503 })
  }
}
