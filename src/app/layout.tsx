import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { contactConfig, services, siteConfig } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Siti web, software e prodotti digitali su misura`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "sviluppo siti web",
    "realizzazione siti web",
    "web app su misura",
    "software su misura",
    "automazioni aziendali",
    "agenzia sviluppo software",
    "CMA Enterprise",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Siti web, software e prodotti digitali su misura`,
    description: siteConfig.description,
    images: [{ url: "/media/cinematic-poster.jpg", width: 1920, height: 1080, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Siti web, software e prodotti digitali su misura`,
    description: siteConfig.description,
    images: ["/media/cinematic-poster.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Dati strutturati: aiutano i motori di ricerca a capire chi siamo. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  email: contactConfig.email,
  description: siteConfig.description,
  logo: `${siteConfig.url}/favicon.svg`,
  image: `${siteConfig.url}/media/cinematic-poster.jpg`,
  areaServed: "IT",
  knowsLanguage: "it",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servizi",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${siteConfig.url}/servizi/#${service.id}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main id="main" className="flex-1 overflow-x-clip">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
