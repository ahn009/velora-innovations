import type { Metadata } from 'next'
import { aiReceptionist, SolutionPageTemplate } from '@/components/velora/page-templates'

export const metadata: Metadata = { title: 'AI Receptionist | Velora Innovations', description: 'An AI receptionist designed around approved business calls, qualification, scheduling, routing, and human handoff.' }

export default function AiReceptionistPage() { return <SolutionPageTemplate content={aiReceptionist} /> }
