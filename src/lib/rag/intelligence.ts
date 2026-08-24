import type { ChatInput } from './types'
import { INDUSTRY_INTELLIGENCE } from './industry-intelligence'
import { PROBLEM_PATTERNS, PROBLEM_SOLUTION_MAP, type OperationalProblem } from './solution-mapping'
import { CORE_SOLUTIONS, SOLUTION_ROUTES, type VeloraIndustry, type VeloraSolution } from './velora-knowledge'

export const RAG_INTENTS = [
  'GENERAL_INFO',
  'SERVICE_DISCOVERY',
  'INDUSTRY_USE_CASE',
  'PRICING',
  'INTEGRATION',
  'IMPLEMENTATION',
  'SECURITY',
  'AUTOMATION_IDEA',
  'COMPARISON',
  'PURCHASE_INTENT',
  'CONSULTATION_INTENT',
  'REGULATED_ADVICE',
  'SUPPORT_REQUEST',
  'UNKNOWN',
] as const

export type RagIntent = typeof RAG_INTENTS[number]
export type BuyingStage = 'EXPLORATION' | 'PROBLEM_AWARE' | 'SOLUTION_EVALUATION' | 'PURCHASE_INTENT' | 'HIGH_INTENT'

export type RequestIntelligence = {
  intent: RagIntent
  industry: VeloraIndustry | null
  problems: OperationalProblem[]
  solutions: VeloraSolution[]
  buyingStage: BuyingStage
  retrievalQuery: string
  preferredRoutes: string[]
  commercialIntent: boolean
  rememberedContext: boolean
}

const SOLUTION_PATTERNS: Array<[VeloraSolution, RegExp]> = [
  ['AI Receptionist', /\b(ai |virtual |phone )?receptionist|answer(?:ing)? (?:the )?phone|call handling|missed calls?\b/i],
  ['Lead Qualification', /\blead (?:qualification|screening)|qualif(?:y|ying) (?:new )?(?:leads?|enquiries|inquiries)|screen(?:ing)? (?:new )?leads?\b/i],
  ['Appointment Automation', /\bappointment|schedul(?:e|ing)|booking|calendar|showing requests?\b/i],
  ['Customer Support', /\bcustomer support|support (?:questions?|tickets?)|order[- ]status|returns? (?:assistant|questions?)|tenant faq\b/i],
  ['Follow-Up Automation', /\bfollow(?:ed|ing)?[- ]?up|reminders?|recalls?|rebooking|lead nurture|cart recovery|abandoned carts?|go(?:es)? cold\b/i],
  ['CRM Automation', /\bcrm|customer record|lead status|job record|pipeline update\b/i],
  ['Workflow Automation', /\bworkflow|connected systems?|business process|routing|dispatch|handoff|maintenance requests?|shopify\b/i],
]

const REGULATED = /\b(legal advice|case strategy|strong (?:legal )?case|(?:legal )?case is strong|have a legal case|do i have a case|should i sue|interpret (?:the )?law|diagnos(?:e|is)|treatment|medication|medical advice|chest pain|difficulty breathing|tax deductions?|tax advice|accounting judgment|financial advice|investment advice)\b/i
const HIGH_INTENT = /\b(i want (?:this|to (?:start|set|deploy))|set this up|get started|request (?:a )?(?:quote|consultation)|get a quote|need a quote|someone (?:call|contact) me|talk to (?:someone|sales)|hire velora|ready to (?:start|buy))\b/i
const PURCHASE = /\b(for my (?:business|company|office|practice|firm)|what would (?:this|it) cost|how much.*(?:my|our)|(?:i|we) need\b|\bmy .{0,40} needs\b|need (?:this|automation)|pricing for|implementation quote)\b/i

function unique<T>(items: T[]) {
  return [...new Set(items)]
}

function visitorMessages(input: ChatInput) {
  return input.history.filter((message) => message.role === 'user').slice(-4).map((message) => message.content)
}

function industryFromText(text: string): VeloraIndustry | null {
  const ordered = Object.entries(INDUSTRY_INTELLIGENCE) as Array<[VeloraIndustry, typeof INDUSTRY_INTELLIGENCE[VeloraIndustry]]>
  for (const [industry, profile] of ordered) {
    if (profile.aliases.some((alias) => new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\ /g, '\\s+')}\\b`, 'i').test(text))) return industry
  }
  return null
}

function industryFromRoute(route?: string): VeloraIndustry | null {
  if (!route) return null
  return (Object.entries(INDUSTRY_INTELLIGENCE) as Array<[VeloraIndustry, typeof INDUSTRY_INTELLIGENCE[VeloraIndustry]]>)
    .find(([, profile]) => profile.route === route)?.[0] ?? null
}

function classifyIntent(current: string, combined: string, industry: VeloraIndustry | null, problems: OperationalProblem[]): RagIntent {
  if (/\b(system prompt|api key|private data|hidden (?:prompt|context)|credentials?)\b/i.test(current)
    || /\b(?:show|list|reveal|print|give me)\b.{0,24}\b(?:customer )?leads?\b/i.test(current)) return 'UNKNOWN'
  if (REGULATED.test(current)) return 'REGULATED_ADVICE'
  if (HIGH_INTENT.test(current)) return 'CONSULTATION_INTENT'
  if (/\b(price|pricing|cost|foundation|growth|budget|fee)\b/i.test(current)) return 'PRICING'
  if (/\b(integrat\w*|connect|compatible|compatibility|api|webhook|crm|servicetitan|shopify)\b/i.test(current)) return 'INTEGRATION'
  if (/\b(implement\w*|build process|launch|deploy|timeline)\b/i.test(current) || /\bhow (?:does|would) .{0,50} work\b/i.test(current)) return 'IMPLEMENTATION'
  if (/\b(security|privacy|data handling|retention|access control|compliance|safe|human handoff|soc\s*2|certif\w*)\b/i.test(current)) return 'SECURITY'
  if (/\b(why (?:not|shouldn't|should not)|different|difference|compare|versus|\bvs\b|competitor|chatgpt)\b/i.test(current)) return 'COMPARISON'
  if (/\b(already (?:a )?(?:client|customer)|existing (?:client|customer)|support with my|problem with my velora)\b/i.test(current)) return 'SUPPORT_REQUEST'
  if (PURCHASE.test(current)) return 'PURCHASE_INTENT'
  if (industry && (problems.length > 0 || /\b(can|could|help|handle|automate|use|fit|work|need|miss|front desk|intake|drowning|requests?|routine|calls?|enquiries|inquiries)\b/i.test(combined))) return 'INDUSTRY_USE_CASE'
  if (/\b(which solution|what (?:can|does) velora automate|services?|capabilit|offer|fit my business)\b/i.test(current)) return 'SERVICE_DISCOVERY'
  if (problems.length > 0 || /\b(automate|automation|workflow|manual|repetitive|bottleneck|problem|qualif(?:y|ication)|follow(?:ed|ing)?[- ]?up|abandoned carts?)\b/i.test(current)) return 'AUTOMATION_IDEA'
  if (/\b(what is velora|what does velora do|tell me about velora|who is velora|how can velora help|guarantee|biggest customers?)\b/i.test(current)) return 'GENERAL_INFO'
  return 'UNKNOWN'
}

function buyingStage(current: string, intent: RagIntent, problems: OperationalProblem[], industry: VeloraIndustry | null): BuyingStage {
  if (HIGH_INTENT.test(current) || intent === 'CONSULTATION_INTENT') return 'HIGH_INTENT'
  if (PURCHASE.test(current) || (intent === 'PRICING' && (industry !== null || /\b(my|our|for a|for an)\b/i.test(current)))) return 'PURCHASE_INTENT'
  if (['INTEGRATION', 'IMPLEMENTATION', 'COMPARISON', 'SECURITY'].includes(intent) || /\b(can (?:this|it)|will (?:this|it))\b/i.test(current)) return 'SOLUTION_EVALUATION'
  if (problems.length > 0 || intent === 'INDUSTRY_USE_CASE' || intent === 'AUTOMATION_IDEA') return 'PROBLEM_AWARE'
  return 'EXPLORATION'
}

function inferredProblems(text: string) {
  return PROBLEM_PATTERNS.filter(([, pattern]) => pattern.test(text)).map(([problem]) => problem)
}

function inferredSolutions(text: string, problems: OperationalProblem[], industry: VeloraIndustry | null, intent: RagIntent) {
  const explicit = SOLUTION_PATTERNS.filter(([, pattern]) => pattern.test(text)).map(([solution]) => solution)
  const mapped = problems.flatMap((problem) => PROBLEM_SOLUTION_MAP[problem])
  const intentDefaults: VeloraSolution[] = intent === 'INTEGRATION'
    ? ['CRM Automation', 'Workflow Automation']
    : intent === 'IMPLEMENTATION' || intent === 'SECURITY'
      ? ['Workflow Automation']
      : []
  const industryDefaults = industry && (intent === 'INDUSTRY_USE_CASE' || intent === 'PURCHASE_INTENT')
    ? INDUSTRY_INTELLIGENCE[industry].solutions.slice(0, 3)
    : []
  return unique([...explicit, ...mapped, ...intentDefaults, ...industryDefaults]).slice(0, 5)
}

function buildQuery(message: string, industry: VeloraIndustry | null, problems: OperationalProblem[], solutions: VeloraSolution[], intent: RagIntent) {
  return unique([
    message,
    industry ?? '',
    ...problems,
    ...solutions,
    intent === 'INTEGRATION' ? 'compatible API authentication permissions field mapping failure handling' : '',
    intent === 'IMPLEMENTATION' ? 'discover design build test launch monitor human handoff' : '',
    intent === 'PRICING' ? 'Foundation Growth Custom scope telephony model usage integrations recurring management' : '',
    intent === 'SECURITY' ? 'approved knowledge least necessary access monitoring retention restricted actions human escalation' : '',
  ].filter(Boolean)).join(' | ')
}

export function analyzeChatRequest(input: ChatInput): RequestIntelligence {
  const history = visitorMessages(input)
  const currentIndustry = industryFromText(input.message)
  const rememberedIndustry = [...history].reverse().map(industryFromText).find(Boolean) ?? null
  const industry = currentIndustry ?? rememberedIndustry ?? industryFromRoute(input.route)
  const combined = [...history, input.message].join('\n')
  const problems = unique(inferredProblems(combined))
  const intent = classifyIntent(input.message, combined, industry, problems)
  const solutions = intent === 'UNKNOWN' ? [] : inferredSolutions(combined, problems, industry, intent)
  const stage = buyingStage(input.message, intent, problems, industry)
  const preferredRoutes = unique([
    industry ? INDUSTRY_INTELLIGENCE[industry].route : '',
    ...solutions.map((solution) => SOLUTION_ROUTES[solution]),
    input.route ?? '',
  ].filter(Boolean))

  return {
    intent,
    industry,
    problems,
    solutions,
    buyingStage: stage,
    retrievalQuery: buildQuery(input.message, industry, problems, solutions, intent),
    preferredRoutes,
    commercialIntent: stage === 'PURCHASE_INTENT' || stage === 'HIGH_INTENT',
    rememberedContext: Boolean(!currentIndustry && rememberedIndustry),
  }
}

export function industryPromptContext(industry: VeloraIndustry | null) {
  if (!industry) return ''
  const profile = INDUSTRY_INTELLIGENCE[industry]
  return `${industry} context:\n- Common operational problems: ${profile.commonProblems.join('; ')}.\n- Relevant implementation patterns: ${profile.implementations.join('; ')}.\n- Boundaries: ${profile.boundaries.join(' ')}`
}

export function intentPromptContext(intelligence: RequestIntelligence) {
  const solutions = intelligence.solutions.length ? intelligence.solutions.join(', ') : CORE_SOLUTIONS.join(', ')
  const directives: Partial<Record<RagIntent, string>> = {
    PRICING: 'Explain the published starting levels, what changes scope, and why discovery is needed for a final price. Do not calculate a quote.',
    INTEGRATION: 'Describe the desired data/actions, then qualify compatibility by API or supported access, authentication, permissions, mapping, rate limits, and failure handling. Never imply a native integration without evidence.',
    IMPLEMENTATION: 'Describe implementation as discover, design, build/test, controlled launch, and refinement, tied to the visitor workflow.',
    SECURITY: 'Explain controls for the actual workflow: approved knowledge, least-necessary access, retention/logging choices, monitoring, restricted actions, failures, and human escalation. Do not invent certifications.',
    COMPARISON: 'Differentiate Velora through implemented, bounded business workflows and compatible system connections—not unsupported superiority claims.',
    REGULATED_ADVICE: 'Refuse the requested professional judgment briefly, then explain the allowed administrative workflow and human boundary.',
    CONSULTATION_INTENT: 'Give a concise fit-oriented answer and a clear consultation next step without asking for contact details in chat.',
    PURCHASE_INTENT: 'Recommend a practical starting workflow and identify the discovery information needed to scope it.',
    SUPPORT_REQUEST: 'Explain that this website assistant cannot access customer accounts, deployments, messages, or support records. Use only published information and direct the visitor to their established Velora contact when appropriate.',
    UNKNOWN: 'Answer only what the approved context confirms; ask one focused question if business type or operational problem would materially change the answer.',
  }
  return `Detected visitor context (guidance, not independent factual evidence): intent=${intelligence.intent}; buying stage=${intelligence.buyingStage}; industry=${intelligence.industry ?? 'not stated'}; likely relevant Velora solutions=${solutions}. ${directives[intelligence.intent] ?? 'Connect the question to a real operational problem, a specific workflow, a boundary where relevant, and a useful next step.'}`
}
