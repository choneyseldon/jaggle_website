import { LiquidButton } from "@/components/site/LiquidButton";

export function FinalCta() {
  return (
    <section className="final" id="cta">
      <div className="final-panel">
        <h2>Build better. Sustainably.</h2>
        <p>No credit card · free plan forever · Bhutan-born, globally available.</p>
        <div className="final-cta">
          <LiquidButton href="#top" variant="primary" size="lg">
            Start for free <i className="ti ti-arrow-right arrow" />
          </LiquidButton>
          <LiquidButton href="/request-demo" size="lg">
            <i className="ti ti-player-play-filled" /> Book a demo
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}
