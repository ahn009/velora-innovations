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
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 32 * 1024) {
    return Response.json({ message: 'Request is too large.' }, { status: 413 })
  }
  if (!isSameOrigin(request)) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  if (new TextEncoder().encode(rawBody).byteLength > 32 * 1024) {
    return Response.json({ message: 'Request is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = validateLead(body)
  if (!parsed.ok) return Response.json({ message: parsed.message }, { status: 400 })

  try {
    const allowed = await checkRateLimit('lead', getRequestFingerprint(request))
    if (!allowed) {
      return Response.json({ message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
    }

    const lead = await db.lead.create({
      data: {
        ...parsed.value,
        phone: parsed.value.phone || null,
        budget: parsed.value.budget || null,
        notes: parsed.value.notes || null,
        utmSource: parsed.value.utmSource || null,
        utmMedium: parsed.value.utmMedium || null,
        utmCampaign: parsed.value.utmCampaign || null,
        utmContent: parsed.value.utmContent || null,
        utmTerm: parsed.value.utmTerm || null,
        referrer: parsed.value.referrer || null,
        landingPage: parsed.value.landingPage || null,
        primaryOpportunity: parsed.value.primaryOpportunity || null,
        secondaryOpportunity: parsed.value.secondaryOpportunity || null,
        readiness: parsed.value.readiness || null,
        timeline: parsed.value.timeline || null,
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
      utmSource: parsed.value.utmSource || null,
      utmMedium: parsed.value.utmMedium || null,
      utmCampaign: parsed.value.utmCampaign || null,
      utmContent: parsed.value.utmContent || null,
      utmTerm: parsed.value.utmTerm || null,
      referrer: parsed.value.referrer || null,
      landingPage: parsed.value.landingPage || null,
      primaryOpportunity: parsed.value.primaryOpportunity || null,
      secondaryOpportunity: parsed.value.secondaryOpportunity || null,
      readiness: parsed.value.readiness || null,
      timeline: parsed.value.timeline || null,
      createdAt: lead.createdAt.toISOString(),
    })

    return Response.json({ success: true, reference: lead.id }, { status: 201 })
  } catch (error) {
    console.error('Lead submission failed', error)
    return Response.json({ message: 'We could not save your request right now. Please try again shortly.' }, { status: 503 })
  }
}
