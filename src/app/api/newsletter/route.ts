import { db } from '@/lib/db'
import {
  CONSENT_VERSION,
  checkRateLimit,
  getRequestFingerprint,
  isSameOrigin,
  validateNewsletter,
} from '@/lib/submissions'

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  const allowed = await checkRateLimit('newsletter', getRequestFingerprint(request))
  if (!allowed) {
    return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = validateNewsletter(body as Record<string, unknown>)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

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
}
