import { pageMetadata } from '@/lib/seo'
import { ecommerce, IndustryPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for E-commerce | Velora Innovations', description: 'Answer approved product and order questions, categorize requests, and route e-commerce support exceptions.', path: '/industries/ecommerce' })
export default function Page() { return <IndustryPageTemplate content={ecommerce} current="E-commerce" consultationPath="/consultation?industry=ecommerce" /> }
