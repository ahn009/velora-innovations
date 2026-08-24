import assert from 'node:assert/strict'
import test from 'node:test'
import { RAG_EVALUATION_CASES } from './evaluation-cases'
import { analyzeChatRequest } from './intelligence'

test('evaluation corpus contains at least 60 questions', () => {
  assert.ok(RAG_EVALUATION_CASES.length >= 60, `expected at least 60 cases, found ${RAG_EVALUATION_CASES.length}`)
})

for (const evaluation of RAG_EVALUATION_CASES) {
  test(`classifies ${evaluation.id}`, () => {
    const result = analyzeChatRequest({ message: evaluation.query, history: evaluation.history ?? [], route: evaluation.route })
    assert.equal(result.intent, evaluation.expectedIntent)
    assert.equal(result.industry, evaluation.expectedIndustry)
    if (evaluation.expectedBuyingStage) assert.equal(result.buyingStage, evaluation.expectedBuyingStage)
    for (const solution of evaluation.expectedSolutions ?? []) {
      assert.ok(result.solutions.includes(solution), `${evaluation.id} did not map ${solution}; got ${result.solutions.join(', ')}`)
    }
    if (evaluation.expectConsultation !== undefined) assert.equal(result.commercialIntent, evaluation.expectConsultation)
  })
}
