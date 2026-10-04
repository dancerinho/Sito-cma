import type { Metadata } from "next";
import { Geist_Mono, Mulish } from "next/font/google";
import { contactConfig, services, siteConfig, socialLinks } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { Universe } from "@/components/fx/universe";
import { SmoothScroll } from "@/components/fx/smooth-scroll";
import "./globals.css";

const sans = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
  telephone: contactConfig.phone.replace(/\s/g, ""),
  description: siteConfig.description,
  logo: `${siteConfig.url}/favicon.svg`,
  image: `${siteConfig.url}/media/cinematic-poster.jpg`,
  areaServed: "IT",
  sameAs: Object.values(socialLinks).filter(Boolean),
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

const introScript = `try{if(location.pathname==="/"&&!sessionStorage.getItem("cma-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="loading"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `data-intro` viene impostato prima del primo disegno dallo script qui
    // sotto: React non deve considerarlo una differenza.
    <html lang="it" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* Le estensioni del browser (es. ColorZilla) aggiungono attributi al
          body prima che React parta: non è un errore del sito. */}
      <body className="relative flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        {/* Prima visita alla home: header e testi restano nascosti finché il
            caricamento con il contatore non è finito. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Universe />
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1 overflow-x-clip">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
