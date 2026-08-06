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
      "It can, when the telephony provider, consent requirements, business rules and escalation path are confirmed. The system must identify itself appropriately and stay within the approved workflow.",
  },
  {
    question: "Can it book appointments?",
    answer:
      "It can when the calendar exposes suitable API access. Availability, confirmations, rescheduling, reminders and human exceptions are tested against the actual scheduling rules before launch.",
  },
  {
    question: "Can it connect with our CRM?",
    answer:
      "Integration availability depends on your CRM software, API access and security requirements. We work with common CRMs and can often connect through available APIs or middleware.",
  },
  {
    question: "Can a human take over?",
    answer:
      "Human escalation is defined for every accepted deployment. The exact transfer method depends on the channel, staffing model and tools available to the client.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timelines depend on workflow scope, API access, data readiness, risk review and acceptance testing. The proposal includes a delivery plan only after those dependencies are confirmed.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Implementation starts at $2,500 USD for a limited workflow. Monthly management, model usage, telephony and third-party software are quoted separately based on scope and volume.",
  },
  {
    question: "How is our data handled by model providers?",
    answer:
      "Provider data-use settings and contracts are reviewed for each deployment. We document which vendors receive data, their retention settings, whether training is disabled, and any remaining limitations before launch.",
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
