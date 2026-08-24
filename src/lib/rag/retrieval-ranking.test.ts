import assert from 'node:assert/strict'
import test from 'node:test'
import { rerankKnowledge } from './retrieval-ranking'
import type { RetrievedChunk } from './types'

const chunk = (route: string, similarity: number): RetrievedChunk => ({
  id: route, sourceTitle: route, sourceUrl: route, route, heading: 'Overview', content: 'Approved content.', similarity,
})

test('industry and solution context rerank semantic candidates without changing similarity', () => {
  const result = rerankKnowledge([
    chunk('/about', 0.62),
    chunk('/industries/home-services', 0.57),
    chunk('/solutions/ai-receptionist', 0.58),
  ], {
    industryRoute: '/industries/home-services',
    solutionRoutes: ['/solutions/ai-receptionist'],
  }, 2)

  assert.equal(result[0].route, '/industries/home-services')
  assert.equal(result[0].similarity, 0.57)
  assert.deepEqual(result[0].rankingReasons, ['industry'])
  assert.equal(result[1].route, '/solutions/ai-receptionist')
})
