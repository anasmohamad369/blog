import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://earthingsolutions.com"),
  title: {
    default: "Earthing Solutions | Lightning Protection System & Earthing Mart DFM Hub",
    template: "%s | Earthing Solutions",
  },
  description:
    "Official Earthing Mart & DFM Hub blog hub for certified lightning protection systems, chemical earthing equipment, industrial grounding standards, and electrical safety guides.",
  keywords: [
    "Blog",
    "blog",
    "Lightning Protection System",
    "lightning protection system",
    "Earthing",
    "earthing",
    "Earthing Mart",
    "DFM Hub",
    "Earthing Solutions",
    "Chemical Earthing",
    "Grounding System",
    "Earth Electrode",
    "IEEE 81",
    "IS 3043",
    "IEC 62305",
    "Electrical Grounding Safety",
  ],
  authors: [{ name: "Earthing Solutions & DFM Hub Team" }],
  publisher: "Earthing Solutions Inc. / Earthing Mart DFM Hub",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Earthing Solutions | Lightning Protection System & Earthing Mart DFM Hub",
    description:
      "Explore expert articles, technical guides, installation specs, and industrial standards for chemical earthing and lightning protection systems.",
    url: "https://earthingsolutions.com",
    siteName: "Earthing Solutions - Earthing Mart DFM Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Earthing Solutions Lightning Protection & Grounding Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthing Solutions | Lightning Protection System & Earthing Mart DFM Hub",
    description:
      "Official Earthing Mart & DFM Hub blog for certified lightning protection systems and chemical earthing equipment.",
    images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Site Search & Organization Schemas for Google indexing
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Earthing Solutions - Earthing Mart DFM Hub",
    "alternateName": ["Earthing Mart", "DFM Hub", "Lightning Protection System Blog Hub"],
    "url": "https://earthingsolutions.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://earthingsolutions.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Earthing Solutions - Earthing Mart DFM Hub",
    "url": "https://earthingsolutions.com",
    "logo": "https://earthingsolutions.com/logo.png",
    "description": "Provider of certified chemical earthing, lightning protection systems, and industrial grounding solutions."
  };

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
