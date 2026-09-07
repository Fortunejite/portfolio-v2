import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { HasLoadedProvider } from "@/components/loadedContext";
import { portfolio } from "@/data/data.json";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fortunejite.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030014",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolio.name} | ${portfolio.title} & Full-Stack Developer`,
    template: `%s | ${portfolio.name}`,
  },
  description: portfolio.description,
  keywords: portfolio.keywords,
  authors: [{ name: portfolio.name, url: portfolio.social_links.github }],
  creator: portfolio.name,
  publisher: portfolio.name,
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: `${portfolio.name} | ${portfolio.title}`,
    description: portfolio.description,
    url: siteUrl,
    siteName: `${portfolio.name} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${portfolio.name} - ${portfolio.title} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} | ${portfolio.title}`,
    description: portfolio.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// JSON-LD Structured Data Schema for Search Engines (Person & WebSite)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  jobTitle: portfolio.title,
  description: portfolio.description,
  email: portfolio.email,
  telephone: portfolio.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: portfolio.location,
  },
  sameAs: Object.values(portfolio.social_links || {}),
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Prisma ORM",
    "REST APIs",
    "WebSockets",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <HasLoadedProvider>
        <body className="min-h-full flex flex-col bg-[#030014] text-white selection:bg-purple-500/30 selection:text-purple-200">
          {children}
        </body>
      </HasLoadedProvider>
    </html>
  );
}
