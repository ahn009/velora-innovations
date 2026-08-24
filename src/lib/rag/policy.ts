import { INDUSTRY_INTELLIGENCE } from './industry-intelligence'
import type { RagSource } from './types'
import { SOLUTION_ROUTES, type VeloraIndustry, type VeloraSolution } from './velora-knowledge'

type PolicyAnswer = { answer: string; sources?: RagSource[] }

const source = (title: string, route: string): RagSource => ({ title, route, url: route })

export function getPolicyAnswer(message: string): PolicyAnswer | null {
  const normalized = message.toLowerCase()

  if (/\b(system prompt|hidden (prompt|instruction|context)|api key|database schema|private data|internal context|environment variables?|credentials?)\b/.test(normalized)
    || /\b(show|list|reveal|print|give me)\b.{0,24}\b(?:customer )?leads?\b/.test(normalized)
    || /ignore (all |the )?(previous|prior|above) instructions/.test(normalized)) {
    return { answer: 'I can’t reveal private data, leads, hidden instructions, credentials, or internal system information. Velora Assistant only uses Velora’s approved public business information, and I can help with its services, industries, pricing, implementation, integrations, or consultation process.' }
  }

  if (/\b(chest pain|can(?:not|'t) breathe|difficulty breathing|stroke|overdose|suicid|medical emergency)\b/.test(normalized)) {
    return {
      answer: 'Velora Assistant is not a medical guidance or emergency service. If this may be an emergency, contact your local emergency services now. For medical advice, speak with a qualified healthcare professional.',
      sources: [source('Medical Practices', '/industries/medical-practices')],
    }
  }

  if (/\b(?:diagnos\w*.*(?:ac|hvac|air condition|furnace|equipment|brake|vehicle|car)|(?:ac|hvac|air condition|furnace|equipment|brake|vehicle|car).*diagnos\w*)\b/.test(normalized)) {
    const automotive = /\b(brake|vehicle|car|repair shop|automotive)\b/.test(normalized)
    return {
      answer: `No. Velora should not independently diagnose ${automotive ? 'a vehicle or make a safety-critical repair decision' : 'equipment or make a safety-critical service decision'}. It can collect the customer's description, location and contact details, apply approved intake and urgency rules, schedule an eligible service visit, and route uncertain or urgent situations to qualified staff.`,
      sources: [source(automotive ? 'Automotive' : 'Home Services', automotive ? '/industries/automotive' : '/industries/home-services')],
    }
  }

  if (/\b(diagnos\w*|treatment|medication|symptom\w*|what should i do for|medical advice)\b/.test(normalized)) {
    return {
      answer: 'I can’t provide diagnosis, treatment, or medical guidance. Velora supports administrative intake, front-desk workflows, and appointment coordination; clinical questions and safety-critical decisions stay with qualified healthcare staff.',
      sources: [source('Medical Practices', '/industries/medical-practices')],
    }
  }

  if (/\b(strong legal case|good (?:legal )?case|(?:legal )?case is strong|legal advice|case strategy|interpret (the )?law|should i sue|do i have a case|whether i have a (?:legal )?case)\b/.test(normalized)) {
    return {
      answer: 'No. I can’t provide legal advice or assess a case, including whether someone has a strong case. Velora’s law-firm workflows can collect approved intake information, identify a broad matter category, create an intake record, schedule a consultation, and route the prospect; legal rights, case strength, and strategy stay with a qualified attorney.',
      sources: [source('Law Firms', '/industries/law-firms')],
    }
  }

  if (/\b(tax deductions?|tax advice|which deduction|financial advice|investment advice|accounting judgment)\b/.test(normalized)) {
    return {
      answer: 'I can’t provide personalized tax, accounting, or financial advice or recommend a tax deduction. Velora can support an accounting firm with administrative intake, document reminders, prospect follow-up, and consultation scheduling; professional judgments stay with a qualified professional.',
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

export function consultationUrl(route?: string, message = '', industryName?: VeloraIndustry | null, solutionName?: VeloraSolution | null) {
  const params = new URLSearchParams({ source: 'website-assistant' })
  const industry = industryName
    ? INDUSTRY_INTELLIGENCE[industryName].route.split('/').at(-1)
    : route?.match(/^\/industries\/([^/?#]+)/)?.[1]
  const solution = solutionName
    ? SOLUTION_ROUTES[solutionName].split('/').at(-1)
    : route?.match(/^\/solutions\/([^/?#]+)/)?.[1] ?? inferredSolution(message)
  if (industry) params.set('industry', industry)
  if (solution) params.set('solution', solution)
  return `/consultation?${params.toString()}`
}
