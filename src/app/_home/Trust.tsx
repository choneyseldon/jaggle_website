const LOGOS = [
  { src: "/images/logos/govtech-t.png", alt: "GovTech Bhutan", cls: "lc-logo wordmark tall mono" },
  { src: "/images/logos/moice.png", alt: "Ministry of Industry, Commerce & Employment — Royal Government of Bhutan", cls: "lc-logo wordmark mono" },
  { src: "/images/logos/acc-t.png", alt: "Anti-Corruption Commission", cls: "lc-logo crest" },
  { src: "/images/logos/innovest-t.png", alt: "Innovest — mindful investments", cls: "lc-logo wordmark mono" },
  { src: "/images/logos/loden-t.png", alt: "Loden Foundation", cls: "lc-logo crest" },
];

export function Trust() {
  return (
    <section className="trust" id="trusted" aria-label="Trusted by Bhutan's institutions">
      <p className="trust-eyebrow">Trusted by</p>
      <h2>
        <span className="lead">Backed by Bhutan&rsquo;s pioneers.</span> <span className="rest">From the Royal Government to the country&rsquo;s boldest founders.</span>
      </h2>

      <div className="lc-frame">
        <span className="lc-rule top" aria-hidden="true" />
        <div className="lc-viewport">
          <div className="lc-track" id="trustTrack">
            {LOGOS.map((l) => (
              <div className={l.cls} key={l.src}>
                {/* eslint-disable-next-line @next/next/no-img-element -- variable-width logo marquee, intrinsic size unknown per-logo */}
                <img src={l.src} alt={l.alt} loading="lazy" />
              </div>
            ))}
            {LOGOS.map((l) => (
              <div className={l.cls} key={`${l.src}-dup`} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- variable-width logo marquee, intrinsic size unknown per-logo */}
                <img src={l.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <span className="lc-fade l" aria-hidden="true" />
        <span className="lc-fade r" aria-hidden="true" />
        <span className="lc-rule bottom" aria-hidden="true" />
      </div>
    </section>
  );
}
