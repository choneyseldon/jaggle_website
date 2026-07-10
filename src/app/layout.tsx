import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import { BackgroundLayer } from "@/components/site/BackgroundLayer";
import { GlassFilters } from "@/components/site/GlassFilters";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { themeInitScript } from "@/components/site/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jaggle AI",
  description: "AI + GNH project management. Plan smarter. Ship calmer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="day" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.5.0/dist/tabler-icons.min.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
