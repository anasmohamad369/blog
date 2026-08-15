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
  metadataBase: new URL("https://www.structuralearthing.com"),
  title: {
    default: "Structural Earthing: Foundation, Design, Lightning Protection & Standards",
    template: "%s | Structural Earthing",
  },
  description:
    "Learn structural earthing, foundation earthing, bonding, lightning protection, design, installation, testing, products, standards and compliance with practical engineering guidance",
  keywords: [
    "Structural Earthing",
    "Structural Earthing System",
    "Structural Earthing System Manufacturer",
    "Structural Earthing System in India",
    "Structural Earthing Manufacturer in India",
    "Foundation Earthing System",
    "Foundation Earthing",
    "Bonding",
    "Lightning Protection",
    "lightning protection system",
    "Structural Earthing Design",
    "Earthing Installation",
    "Earthing Testing",
    "Earthing Products",
    "Earthing Standards",
    "IEEE 81",
    "IS 3043",
    "IEC 62305",
    "BS 7430",
    "Electrical Grounding Safety",
  ],
  authors: [{ name: "Structural Earthing Technical Team" }],
  publisher: "Structural Earthing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Structural Earthing: Foundation, Design, Lightning Protection & Standards",
    description:
      "Learn structural earthing, foundation earthing, bonding, lightning protection, design, installation, testing, products, standards and compliance with practical engineering guidance",
    url: "https://www.structuralearthing.com",
    siteName: "Structural Earthing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Structural Earthing, Foundation, Design & Lightning Protection Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Structural Earthing: Foundation, Design, Lightning Protection & Standards",
    description:
      "Learn structural earthing, foundation earthing, bonding, lightning protection, design, installation, testing, products, standards and compliance with practical engineering guidance",
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
    "name": "Structural Earthing",
    "alternateName": ["Structural Earthing Hub", "Foundation Earthing & Lightning Protection"],
    "url": "https://www.structuralearthing.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.structuralearthing.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Structural Earthing",
    "url": "https://www.structuralearthing.com",
    "logo": "https://www.structuralearthing.com/logo.png",
    "description": "Learn structural earthing, foundation earthing, bonding, lightning protection, design, installation, testing, products, standards and compliance with practical engineering guidance"
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

