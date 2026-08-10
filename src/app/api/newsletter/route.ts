import { db } from '@/lib/db'
import {
  CONSENT_VERSION,
  checkRateLimit,
  getRequestFingerprint,
  isSameOrigin,
  validateNewsletter,
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

  const parsed = validateNewsletter(body)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

  try {
    const allowed = await checkRateLimit('newsletter', getRequestFingerprint(request))
    if (!allowed) {
      return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
    }

    await db.subscriber.upsert({
      where: { email: parsed.value.email },
      create: {
        email: parsed.value.email,
        source: parsed.value.source,
        consentVersion: CONSENT_VERSION,
        consentedAt: new Date(),
        unsubscribedAt: null,
      },
      update: {
        status: 'ACTIVE',
        source: parsed.value.source,
        consentVersion: CONSENT_VERSION,
        consentedAt: new Date(),
        unsubscribedAt: null,
      },
    })

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Newsletter subscription failed', error)
    return Response.json({ message: 'We could not save your subscription right now. Please try again shortly.' }, { status: 503 })
  }
}
