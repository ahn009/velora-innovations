export const primaryNavigation = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
] as const

export const resourceNavigation = [
  {
    label: 'Resources Overview',
    href: '/resources',
    description: 'Browse practical tools and implementation details.',
  },
  {
    label: 'Guided Demo',
    href: '/resources/demo',
    description: 'Walk through a transparent scripted workflow.',
  },
  {
    label: 'Example Workflows',
    href: '/resources/workflows',
    description: 'Explore carefully scoped illustrative use cases.',
  },
  {
    label: 'Integrations',
    href: '/resources/integrations',
    description: 'See how deployment depends on real system access.',
  },
  {
    label: 'Security & Control',
    href: '/resources/security',
    description: 'Review permissions, retention and human oversight.',
  },
  {
    label: 'Opportunity Calculator',
    href: '/resources/calculator',
    description: 'Model a missed-enquiry opportunity using your inputs.',
  },
  {
    label: 'FAQ',
    href: '/resources/faq',
    description: 'Get direct answers about scope, cost and delivery.',
  },
] as const

export function isNavigationActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
