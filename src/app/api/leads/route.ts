import { db } from '@/lib/db'
import {
  CONSENT_VERSION,
  checkRateLimit,
  getRequestFingerprint,
  isSameOrigin,
  notifyLead,
  validateLead,
} from '@/lib/submissions'

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  const allowed = await checkRateLimit('lead', getRequestFingerprint(request))
  if (!allowed) {
    return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = validateLead(body as Record<string, unknown>)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

  const lead = await db.lead.create({
    data: {
      ...parsed.value,
      phone: parsed.value.phone || null,
      budget: parsed.value.budget || null,
      notes: parsed.value.notes || null,
      consentVersion: CONSENT_VERSION,
    },
    select: { id: true, createdAt: true },
  })

  await notifyLead({
    id: lead.id,
    firstName: parsed.value.firstName,
    lastName: parsed.value.lastName,
    email: parsed.value.email,
    phone: parsed.value.phone || null,
    company: parsed.value.company,
    industry: parsed.value.industry,
    budget: parsed.value.budget || null,
    notes: parsed.value.notes || null,
    source: parsed.value.source,
    createdAt: lead.createdAt.toISOString(),
  })

  return Response.json({ success: true, reference: lead.id }, { status: 201 })
}
