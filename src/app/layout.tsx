import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import { BackgroundLayer } from "@/components/site/BackgroundLayer";
import { GlassFilters } from "@/components/site/GlassFilters";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { themeInitScript } from "@/components/site/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jaggle.ai"),
  title: "Jaggle AI — AI + GNH Project Management",
  description: "AI + GNH project management. Plan smarter. Ship calmer.",
  keywords: ["project management", "AI project management", "team wellbeing", "GNH", "Gross National Happiness", "Bhutan", "risk prediction", "sprint planning"],
  openGraph: {
    type: "website",
    siteName: "Jaggle AI",
    title: "Jaggle AI — AI + GNH Project Management",
    description: "AI + GNH project management. Plan smarter. Ship calmer.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jaggleai",
    title: "Jaggle AI — AI + GNH Project Management",
    description: "AI + GNH project management. Plan smarter. Ship calmer.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jaggle AI",
  url: "https://jaggle.ai",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thimphu",
    addressCountry: "BT",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="day" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.5.0/dist/tabler-icons.min.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body suppressHydrationWarning>
        <BackgroundLayer />
        <GlassFilters />
        <SiteNav />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
