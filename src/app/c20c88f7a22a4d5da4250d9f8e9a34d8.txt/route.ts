const indexNowKeyPattern = /^[A-Za-z0-9-]{8,128}$/

function responseHeaders() {
  const headers = new Headers({
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
  })
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.trim()
  if (commitSha) headers.set('X-Velora-Deployment-Commit', commitSha)
  return headers
}

export function GET() {
  const key = process.env.INDEXNOW_API_KEY?.trim()
  if (!key || !indexNowKeyPattern.test(key)) {
    return new Response(null, { status: 404, headers: responseHeaders() })
  }

  return new Response(key, { status: 200, headers: responseHeaders() })
}
