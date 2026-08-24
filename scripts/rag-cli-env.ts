export function configureDirectDatabaseForRagCli() {
  const nodeMajor = Number.parseInt(process.versions.node.split('.')[0] ?? '', 10)
  if (!Number.isFinite(nodeMajor) || nodeMajor < 20 || nodeMajor >= 23) {
    throw new Error(`RAG CLI commands require the project Node.js 20 or 22 LTS runtime; found ${process.version}.`)
  }

  const configured = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!configured) throw new Error('DIRECT_URL or DATABASE_URL is required for RAG CLI commands.')

  const url = new URL(configured)
  if (!url.searchParams.has('sslmode')) url.searchParams.set('sslmode', 'require')
  process.env.DATABASE_URL = url.toString()
}
