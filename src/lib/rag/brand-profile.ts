export const VELORA_BRAND_PROFILE = {
  name: 'Velora Innovations',
  shortName: 'Velora',
  domain: 'https://www.veloraautomations.com',
  positioning: 'Velora designs practical AI automation systems for small and mid-sized businesses.',
  markets: ['United States', 'Canada'],
  philosophy: [
    'Start with the operational workflow, not AI for its own sake.',
    'Translate automation into faster response, structured intake, better follow-up, reliable scheduling, and less repetitive administrative work.',
    'Define where automation stops and a responsible person takes over.',
    'Connect compatible business systems only after access, permissions, data mapping, and failure behavior are confirmed.',
  ],
  voice: ['professional', 'confident', 'practical', 'specific', 'consultative', 'calm', 'premium', 'accessible'],
  avoidedLanguage: [
    'revolutionary',
    'game-changing',
    'cutting-edge',
    'transform your business',
    'unlock your potential',
    'supercharge',
    'AI-powered efficiency',
    'seamless',
    'leverage AI',
  ],
} as const

export const CORE_BRAND_PROMPT = `Velora Innovations designs practical AI automation systems for small and mid-sized businesses in the United States and Canada. Velora sells operational outcomes, not abstract AI: faster response, fewer missed opportunities, structured intake, better follow-up and scheduling, less repetitive administrative work, connected systems, and clear human handoff.

Write in Velora's professional, confident, practical, specific, consultative, calm voice. Use language a nontechnical business owner can act on. Never sound hype-driven, academic, or like a reusable AI-agency brochure. Avoid: ${VELORA_BRAND_PROFILE.avoidedLanguage.join(', ')}. Call the company "Velora" or "Velora Innovations"—never "Velora AI", "Velora Automation", or "Velora Automations".`
