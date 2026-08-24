import { RAG_EVALUATION_CASES, type RagEvaluationCase } from '../src/lib/rag/evaluation-cases'
import { analyzeChatRequest } from '../src/lib/rag/intelligence'
import { getPolicyAnswer } from '../src/lib/rag/policy'
import { selectResponseExamples } from '../src/lib/rag/response-examples'
import type { ChatResponse } from '../src/lib/rag/types'

const args = process.argv.slice(2)
const urlArgument = args.find((argument) => argument.startsWith('--url='))?.slice('--url='.length)
const liveUrl = urlArgument || process.env.RAG_EVAL_URL
const jsonOutput = args.includes('--json')

function boundedInteger(prefix: string, fallback: number, min: number, max: number) {
  const value = Number.parseInt(args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? '', 10)
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback
}

const offset = boundedInteger('--offset=', 0, 0, RAG_EVALUATION_CASES.length)
const limit = boundedInteger('--limit=', RAG_EVALUATION_CASES.length, 1, RAG_EVALUATION_CASES.length)
const selectedCases = RAG_EVALUATION_CASES.slice(offset, offset + limit)

function normalize(value: string) {
  return value.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
}

function containsAll(answer: string, values: string[]) {
  const normalized = normalize(answer)
  return values.every((value) => normalized.includes(normalize(value)))
}

function containsNone(answer: string, values: string[]) {
  const normalized = normalize(answer)
  return values.every((value) => !normalized.includes(normalize(value)))
}

function architectureResult(evaluation: RagEvaluationCase) {
  const intelligence = analyzeChatRequest({
    message: evaluation.query,
    history: evaluation.history ?? [],
    route: evaluation.route,
  })
  const policy = getPolicyAnswer(evaluation.query)
  const examples = selectResponseExamples(intelligence)
  const checks = {
    intent: intelligence.intent === evaluation.expectedIntent,
    industry: intelligence.industry === evaluation.expectedIndustry,
    buyingStage: !evaluation.expectedBuyingStage || intelligence.buyingStage === evaluation.expectedBuyingStage,
    solutionMapping: (evaluation.expectedSolutions ?? []).every((solution) => intelligence.solutions.includes(solution)),
    boundaryRouting: evaluation.expectPolicy === undefined || Boolean(policy) === evaluation.expectPolicy,
    consultationRouting: evaluation.expectConsultation === undefined || intelligence.commercialIntent === evaluation.expectConsultation,
    focusedExamples: examples.length <= 3 && examples.length < 25,
  }
  return { evaluation, intelligence, policy, examples, checks, passed: Object.values(checks).every(Boolean) }
}

async function callLive(evaluation: RagEvaluationCase) {
  if (!liveUrl) throw new Error('Live evaluation URL is missing.')
  const endpoint = new URL('/api/chat?debug=1', liveUrl)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 35_000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: endpoint.origin,
        'user-agent': 'Velora-RAG-Quality-Evaluator/1.0',
      },
      body: JSON.stringify({
        message: evaluation.query,
        history: evaluation.history ?? [],
        route: evaluation.route,
        website: '',
      }),
      signal: controller.signal,
    })
    const body = await response.json().catch(() => ({})) as ChatResponse & { message?: string }
    if (!response.ok || !body.answer) throw new Error(`HTTP ${response.status}: ${body.message ?? 'No answer'}`)
    return body
  } finally {
    clearTimeout(timeout)
  }
}

function scoreLiveAnswer(evaluation: RagEvaluationCase, response: ChatResponse) {
  const intelligence = analyzeChatRequest({ message: evaluation.query, history: evaluation.history ?? [], route: evaluation.route })
  const mustInclude = evaluation.answerMustInclude ?? []
  const mustNotInclude = evaluation.answerMustNotInclude ?? []
  const expectedSolutions = evaluation.expectedSolutions ?? []
  const hasGroundingEvidence = Boolean(response.debug?.retrieved.length || response.sources.length || getPolicyAnswer(evaluation.query))
    || /don't have enough approved velora information/i.test(normalize(response.answer))
  const mentionsMappedSolution = expectedSolutions.length === 0
    || expectedSolutions.some((solution) => normalize(response.answer).includes(normalize(solution)))
    || Boolean(response.debug && expectedSolutions.every((solution) => response.debug?.inferredSolutions.includes(solution)))
  const industryRelevant = !evaluation.expectedIndustry
    || normalize(response.answer).includes(normalize(evaluation.expectedIndustry))
    || response.sources.some((source) => source.route?.startsWith('/industries/'))
  const dimensions = {
    grounding: hasGroundingEvidence && containsAll(response.answer, mustInclude),
    specificity: mentionsMappedSolution,
    veloraVoice: containsNone(response.answer, ['revolutionary', 'game-changing', 'cutting-edge', 'unlock your potential', 'supercharge', 'leverage AI']),
    correctSolutionMapping: expectedSolutions.every((solution) => intelligence.solutions.includes(solution)),
    industryRelevance: industryRelevant,
    boundaryCompliance: evaluation.expectPolicy ? Boolean(getPolicyAnswer(evaluation.query)) && containsAll(response.answer, mustInclude) : true,
    hallucinationAvoidance: containsNone(response.answer, mustNotInclude),
    nextStepUsefulness: evaluation.expectConsultation ? Boolean(response.consultation) : true,
  }
  return { dimensions, score: Object.values(dimensions).filter(Boolean).length, passed: Object.values(dimensions).every(Boolean) }
}

async function main() {
  const architecture = selectedCases.map(architectureResult)
  if (!liveUrl) {
    for (const result of architecture) {
      const row = {
        id: result.evaluation.id,
        query: result.evaluation.query,
        detectedIntent: result.intelligence.intent,
        detectedIndustry: result.intelligence.industry,
        inferredSolutions: result.intelligence.solutions,
        buyingStage: result.intelligence.buyingStage,
        selectedExamples: result.examples.map((example) => example.id),
        checks: result.checks,
        passed: result.passed,
      }
      console.log(jsonOutput ? JSON.stringify(row) : `${row.passed ? 'PASS' : 'FAIL'} ${row.id}: ${row.detectedIntent} | ${row.detectedIndustry ?? 'no industry'} | ${row.inferredSolutions.join(', ') || 'no solution'}`)
    }
    const passed = architecture.filter((result) => result.passed).length
    console.log(`\nArchitecture evaluation: ${passed}/${architecture.length} passed. Live answer generation not requested.`)
    if (passed !== architecture.length) process.exitCode = 1
    return
  }

  let passed = 0
  for (const result of architecture) {
    try {
      const response = await callLive(result.evaluation)
      const scored = scoreLiveAnswer(result.evaluation, response)
      if (result.passed && scored.passed) passed += 1
      console.log(JSON.stringify({
        query: result.evaluation.query,
        detectedIntent: result.intelligence.intent,
        detectedIndustry: result.intelligence.industry,
        inferredSolutions: result.intelligence.solutions,
        retrievedChunks: response.debug?.retrieved ?? [],
        selectedExamples: response.debug?.selectedExamples ?? result.examples.map((example) => example.id),
        finalAnswer: response.answer,
        sources: response.sources.map((source) => source.url),
        consultation: response.consultation ?? null,
        dimensions: scored.dimensions,
        score: scored.score,
        fullySupported: scored.dimensions.grounding && scored.dimensions.hallucinationAvoidance,
      }))
    } catch (error) {
      console.error(JSON.stringify({ query: result.evaluation.query, error: error instanceof Error ? error.message : 'Evaluation failed.' }))
    }
  }
  console.log(`Live answer evaluation: ${passed}/${architecture.length} passed all deterministic checks.`)
  if (passed !== architecture.length) process.exitCode = 1
}

void main()
