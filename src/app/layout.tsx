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
import { ChatLauncher } from "@/components/velora/chat/chat-launcher"
import { companyDescription, contactEmail, isIndexingEnabled, linkedInUrl, siteName, siteUrl, xUrl } from "@/lib/site-config"

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
  title: "Velora Automations | AI Automation for Growing Businesses",
  description: companyDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Velora Automations | AI Automation for Growing Businesses",
    description: companyDescription,
    siteName,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: `${siteName} — practical AI automation` }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Velora_Automate",
    title: "Velora Automations | AI Automation for Growing Businesses",
    description: companyDescription,
    images: [{ url: `${siteUrl}/opengraph-image`, alt: `${siteName} — practical AI automation` }],
  },
  robots: {
    index: isIndexingEnabled,
    follow: isIndexingEnabled,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      email: contactEmail,
      logo: `${siteUrl}/favicon.svg`,
      description: companyDescription,
      sameAs: [linkedInUrl, xUrl].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: companyDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
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
          {process.env.NEXT_PUBLIC_RAG_CHAT_ENABLED === "true" ? <ChatLauncher /> : null}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
