import type { RagSource } from './types'

type PolicyAnswer = { answer: string; sources?: RagSource[] }

const source = (title: string, route: string): RagSource => ({ title, route, url: route })

export function getPolicyAnswer(message: string): PolicyAnswer | null {
  const normalized = message.toLowerCase()

  if (/\b(system prompt|hidden (prompt|instruction|context)|api key|database schema|customer leads?|private data|internal context)\b/.test(normalized)
    || /ignore (all |the )?(previous|prior|above) instructions/.test(normalized)) {
    return { answer: 'I can’t reveal private data, hidden instructions, credentials, or internal system information. I can help with Velora’s published services and resources.' }
  }

  if (/\b(chest pain|can(?:not|'t) breathe|difficulty breathing|stroke|overdose|suicid|medical emergency)\b/.test(normalized)) {
    return {
      answer: 'Velora Assistant is not a medical guidance or emergency service. If this may be an emergency, contact your local emergency services now. For medical advice, speak with a qualified healthcare professional.',
      sources: [source('Medical Practices', '/industries/medical-practices')],
    }
  }

  if (/\b(diagnos|treatment|medication|symptom|what should i do for|medical advice)\b/.test(normalized)) {
    return {
      answer: 'I can’t provide diagnosis, treatment, or medical guidance. Velora supports administrative intake, front-desk workflows, and appointment coordination; clinical questions belong with qualified healthcare staff.',
      sources: [source('Medical Practices', '/industries/medical-practices')],
    }
  }

  if (/\b(strong legal case|legal advice|case strategy|interpret (the )?law|should i sue|do i have a case)\b/.test(normalized)) {
    return {
      answer: 'I can’t provide legal advice or assess a case. Velora can support non-advisory administrative intake, matter routing, and consultation scheduling for law firms; legal judgment stays with a qualified lawyer.',
      sources: [source('Law Firms', '/industries/law-firms')],
    }
  }

  if (/\b(tax deduction|tax advice|which deduction|financial advice|investment advice|accounting judgment)\b/.test(normalized)) {
    return {
      answer: 'I can’t provide personalized tax, accounting, or financial advice. Velora can support administrative intake, document reminders, and consultation scheduling for accounting firms; professional judgments stay with qualified professionals.',
      sources: [source('Accounting', '/industries/accounting')],
    }
  }

  return null
}

export function hasCommercialIntent(message: string) {
  return /\b(get started|request (a )?(quote|consultation)|get a quote|someone (call|contact) me|for my (business|office|company|practice|firm)|need this|want this|talk to (someone|sales)|hire velora)\b/i.test(message)
}

function inferredSolution(message: string) {
  const signals: Array<[string, RegExp]> = [
    ['appointment-automation', /\b(appointment|scheduling|schedule|booking)\b/i],
    ['ai-receptionist', /\b(ai receptionist|receptionist|missed calls?|answer calls?)\b/i],
    ['lead-qualification', /\b(lead qualification|qualify leads?|screen leads?)\b/i],
    ['customer-support', /\b(customer support|support questions?|support tickets?)\b/i],
    ['follow-up-automation', /\b(follow[- ]?up|reminders?)\b/i],
    ['crm-automation', /\b(crm|customer relationship management)\b/i],
    ['workflow-automation', /\b(workflow|connected process|operations automation)\b/i],
  ]
  return signals.find(([, pattern]) => pattern.test(message))?.[0]
}

export function consultationUrl(route?: string, message = '') {
  const params = new URLSearchParams({ source: 'website-assistant' })
  const industry = route?.match(/^\/industries\/([^/?#]+)/)?.[1]
  const solution = route?.match(/^\/solutions\/([^/?#]+)/)?.[1] ?? inferredSolution(message)
  if (industry) params.set('industry', industry)
  if (solution) params.set('solution', solution)
  return `/consultation?${params.toString()}`
}
