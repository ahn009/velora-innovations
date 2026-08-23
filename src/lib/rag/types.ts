export type ChatRole = 'user' | 'assistant'

export type ChatHistoryMessage = {
  role: ChatRole
  content: string
}

export type ChatInput = {
  message: string
  history: ChatHistoryMessage[]
  route?: string
}

export type RagSource = {
  title: string
  url: string
  route: string | null
}

export type RetrievedChunk = {
  id: string
  sourceTitle: string
  sourceUrl: string | null
  route: string | null
  heading: string | null
  content: string
  similarity: number
}

export type ChatResponse = {
  answer: string
  sources: RagSource[]
  consultation?: { label: string; url: string }
  requestId: string
  retryable?: boolean
  debug?: {
    retrieved: Array<{ title: string; route: string | null; similarity: number; tokenEstimate: number }>
  }
}
