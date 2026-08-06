import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/theme-color-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Velora Innovations — AI Automation for Growing Businesses",
  description:
    "We design AI agents that answer customers, qualify leads, book appointments, send follow-ups and connect with the tools your business already uses. Serving businesses across the United States and Canada.",
  keywords: [
    "AI automation agency",
    "AI receptionist",
    "AI lead qualification",
    "AI appointment booking",
    "AI customer support",
    "AI voice agent",
    "business automation",
    "workflow automation",
    "AI agents for business",
    "Velora Innovations",
  ],
  authors: [{ name: "Velora Innovations" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Velora Innovations — AI Automation for Growing Businesses",
    description:
      "Custom AI agents that help your business respond faster, follow up consistently and operate more efficiently.",
    siteName: "Velora Innovations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Innovations — AI Automation for Growing Businesses",
    description:
      "Custom AI agents that help your business respond faster, follow up consistently and operate more efficiently.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: "What is an AI agent?",
    answer:
      "An AI agent is a software system that uses artificial intelligence to perform specific tasks autonomously. Unlike a simple chatbot, an AI agent can make decisions, follow multi-step workflows, connect with other software and escalate to humans when appropriate. Our agents are configured around your specific business processes.",
  },
  {
    question: "Is this just a chatbot?",
    answer:
      "No. While chat is one interface our agents support, they also handle phone calls, SMS, email and internal workflows. Each agent follows a defined business process, connects with your existing tools and knows when to involve a human. A chatbot typically only responds to text on a website.",
  },
  {
    question: "Can it answer phone calls?",
    answer:
      "Yes. Our AI receptionist can answer incoming calls, identify the reason for the call, collect relevant information and take action such as scheduling appointments or routing to the correct team member. It clearly identifies itself as an AI system.",
  },
  {
    question: "Can it book appointments?",
    answer:
      "Yes. The appointment agent checks real-time availability, books appointments, sends confirmations, handles rescheduling requests and sends reminders. It connects with your existing calendar system.",
  },
  {
    question: "Can it connect with our CRM?",
    answer:
      "Integration availability depends on your CRM software, API access and security requirements. We work with common CRMs and can often connect through available APIs or middleware.",
  },
  {
    question: "Can a human take over?",
    answer:
      "Yes. Every system includes human escalation rules. The AI transfers conversations to the appropriate team member when it encounters a complex request, a restricted topic or when the customer asks to speak with someone.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Implementation timelines vary based on the number of workflows, integration complexity and testing requirements. A single focused workflow can be deployed in a few weeks. Multi-agent systems with complex integrations take longer. We provide a timeline during the consultation.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Projects typically have a one-time implementation fee and an ongoing management component. The final investment depends on the number of workflows, channels, integrations, usage volume and security requirements. We discuss pricing during the consultation.",
  },
  {
    question: "Is our data used to train public models?",
    answer:
      "No. Your business data, conversation logs and customer information are not used to train public AI models. Data handling, retention and access controls are defined during implementation.",
  },
  {
    question: "What happens when the agent does not know the answer?",
    answer:
      "The agent is configured with approved knowledge and clear escalation rules. When it encounters a question outside its scope, it acknowledges the limitation and either provides a general approved response or transfers the conversation to a human team member.",
  },
] as const

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Velora Innovations",
    url: "https://velora.ai",
    logo: "/images/hero-dashboard.png",
    description:
      "AI automation agency designing custom AI agents for businesses across the United States and Canada.",
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Velora AI Automation Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Custom AI agents that answer customers, qualify leads, book appointments, send follow-ups and connect with the tools your business already uses.",
    url: "https://velora.ai",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "2500",
      highPrice: "5000",
      offerCount: 3,
    },
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ColorThemeProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
            >
              Skip to main content
            </a>
            {children}
            <Toaster />
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
