import type { Metadata } from "next";
import "./page.css";
import { Hero } from "./_home/Hero";
import { Demo } from "./_home/Demo";
import { Trust } from "./_home/Trust";
import { Features } from "./_home/Features";
import { Surfaces } from "./_home/Surfaces";
import { Gnh } from "./_home/Gnh";
import { Pricing } from "./_home/Pricing";
import { Faq } from "./_home/Faq";
import { Contact } from "./_home/Contact";
import { FinalCta } from "./_home/FinalCta";
import { ScrollHint } from "./_home/ScrollHint";

const title = "Jaggle AI — AI + GNH Project Management";
const description =
  "Plan smarter. Ship calmer. Jaggle combines AI-powered planning, risk prediction and reporting with a built-in wellbeing layer inspired by Bhutan's Gross National Happiness philosophy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function LandingPage() {
  return (
    <main id="top">
      <Hero />
      <Demo />
      <Trust />
      <Features />
      <Surfaces />
      <Gnh />
      <Pricing />
      <Faq />
      <Contact />
      <FinalCta />
      <ScrollHint />
    </main>
  );
}
