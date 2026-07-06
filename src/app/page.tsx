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
