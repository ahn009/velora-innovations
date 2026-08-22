import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/velora/header"
import { Footer } from "@/components/velora/footer"
import { ConsultationProvider } from "@/components/velora/consultation-provider"
import { isIndexingEnabled, siteName, siteUrl } from "@/lib/site-config"

const googleTagManagerId = "GTM-NVSPW7CJ"

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
  metadataBase: new URL(siteUrl),
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
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Velora Innovations — AI Automation for Growing Businesses",
    description:
      "Custom AI agents that help your business respond faster, follow up consistently and operate more efficiently.",
    siteName: "Velora Innovations",
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Innovations — AI Automation for Growing Businesses",
    description:
      "Custom AI agents that help your business respond faster, follow up consistently and operate more efficiently.",
  },
  robots: {
    index: isIndexingEnabled,
    follow: isIndexingEnabled,
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description:
      "AI automation agency designing custom AI agents for businesses across the United States and Canada.",
    sameAs: [],
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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
          >
            Skip to main content
          </a>
          <ConsultationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ConsultationProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
