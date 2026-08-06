import { db } from '@/lib/db'
import {
  checkRateLimit,
  getRequestFingerprint,
  isSameOrigin,
  validateUnsubscribe,
} from '@/lib/submissions'

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  const allowed = await checkRateLimit('unsubscribe', getRequestFingerprint(request))
  if (!allowed) {
    return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = validateUnsubscribe(body as Record<string, unknown>)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

  await db.subscriber.updateMany({
    where: { email: parsed.value.email },
    data: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
  })

  return Response.json({ success: true })
}
