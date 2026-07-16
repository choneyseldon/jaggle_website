"use client";

import { useState } from "react";
import { LiquidButton } from "@/components/site/LiquidButton";
import "./pricing.css";

type Cycle = "monthly" | "annual";
type Location = "global" | "bhutan";

const PRICES: Record<Cycle, { global: { amt: string; note: string }; bhutan: { amt: string; note: string } }> = {
  monthly: {
    global: { amt: "$12", note: "Billed monthly. Unlimited projects." },
    bhutan: { amt: "Nu.1,472", note: "Billed in Nu (BTN)." },
  },
  annual: {
    global: { amt: "$10", note: "Billed annually — 2 months free." },
    bhutan: { amt: "Nu.1,178", note: "Billed annually in Nu via MBOB." },
  },
};

const TEAM_PRESETS = [1, 5, 10, 25, 50];

const FAQ_ITEMS = [
  {
    q: "Is the free plan really free, or a trial?",
    a: "Free forever — no card, no clock. Up to 2 users and 3 projects with the board, timeline and basic AI docs.",
  },
  {
    q: "Can I pay in Ngultrum (BTN)?",
    a: "Yes. Advanced · Bhutan is billed in Nu via MBOB; access activates within 24h of payment proof.",
  },
  {
    q: "What counts as a ‘user seat’?",
    a: "Anyone you invite into a paid workspace. Seats bill per person and you can add or remove them anytime.",
  },
  {
    q: "Can I switch plans or cancel later?",
    a: "Switch monthly↔annual or up/down tiers whenever you like. Annual saves 20%; cancel anytime.",
  },
];

export function PricingClient() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [location, setLocation] = useState<Location>("global");
  const [teamSize, setTeamSize] = useState(5);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const global = PRICES[cycle].global;
  const bhutan = PRICES[cycle].bhutan;

  return (
    <main id="top">
      {/* ========================= PRICING HERO + PLANS ========================= */}
      <section className="section pricing-hero" id="pricing">
        <div className="container">
          <div className="pricing-title">
            <h2>
              <span className="line grad">Simple,</span>
              <span className="line">fair pricing.</span>
            </h2>
            <p>
              Start free, scale when it pays off.
              <br />
              Pay globally in USD or locally in Ngultrum via MBOB.
            </p>
          </div>

          <div className="location-tabs" role="tablist" aria-label="Pricing location">
            <button
              type="button"
              role="tab"
              aria-selected={location === "global"}
              className={location === "global" ? "is-active" : ""}
              onClick={() => setLocation("global")}
            >
              Global
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={location === "bhutan"}
              className={location === "bhutan" ? "is-active" : ""}
              onClick={() => setLocation("bhutan")}
            >
              Bhutan
            </button>
          </div>

          <div className="price-toggle-wrap">
            <div className="price-toggle" id="priceToggle">
              <button className={cycle === "monthly" ? "is-active" : ""} onClick={() => setCycle("monthly")}>
                <span className="lg-refract" aria-hidden="true" />
                <span className="lg-edge" aria-hidden="true" />
                <span className="lg-label">Monthly</span>
              </button>
              <button className={cycle === "annual" ? "is-active" : ""} onClick={() => setCycle("annual")}>
                <span className="lg-refract" aria-hidden="true" />
                <span className="lg-edge" aria-hidden="true" />
                <span className="lg-label">
                  Annual <span className="save">-20%</span>
                </span>
              </button>
            </div>
          </div>

          <div className="team-size" id="teamSize">
            <span className="ts-label">
              <i className="ti ti-users" /> Team size (paid):
            </span>
            <div className="ts-stepper">
              <button
                type="button"
                aria-label="Decrease team size"
                onClick={() => setTeamSize((n) => Math.max(1, n - 1))}
              >
                &minus;
              </button>
              <span className="ts-val">{teamSize}</span>
              <button
                type="button"
                aria-label="Increase team size"
                onClick={() => setTeamSize((n) => Math.min(999, n + 1))}
              >
                +
              </button>
            </div>
            <div className="ts-presets">
              {TEAM_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={teamSize === n ? "is-active" : ""}
                  onClick={() => setTeamSize(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="price-grid">
            <div className="price-card free">
              <div className="price-head">
                <span className="price-tier">Free</span>
              </div>
              <div className="price-amt">
                $0 <small>/ forever</small>
              </div>
              <div className="price-note">For solo PMs &amp; small trials.</div>
              <ul className="feat">
                <li>
                  <i className="ti ti-check" /> Up to 2 users
                </li>
                <li>
                  <i className="ti ti-check" /> 3 projects
                </li>
                <li>
                  <i className="ti ti-check" /> Basic AI docs
                </li>
                <li>
                  <i className="ti ti-check" /> Task board &amp; timeline
                </li>
              </ul>
              <a className="price-cta ghost" href="#">
                Get started
              </a>
            </div>

            {location === "global" && (
              <div className="price-card popular">
                <div className="price-head">
                  <span className="price-tier">Advanced &middot; Global</span>
                  <span className="price-badge popular">Most popular</span>
                </div>
                <div className="price-amt">
                  <span>{global.amt}</span> <small>/ user / mo</small>
                </div>
                <div className="price-note">{global.note}</div>
                <ul className="feat">
                  <li>
                    <i className="ti ti-check" /> Unlimited users &amp; projects
                  </li>
                  <li>
                    <i className="ti ti-check" /> Full AI suite + risk prediction
                  </li>
                  <li>
                    <i className="ti ti-check" /> GNH wellbeing layer
                  </li>
                  <li>
                    <i className="ti ti-check" /> Advanced analytics
                  </li>
                  <li>
                    <i className="ti ti-check" /> Team collaboration
                  </li>
                </ul>
                <LiquidButton href="#" className="price-cta" variant="primary">
                  Start 14-day trial
                </LiquidButton>
              </div>
            )}

            {location === "bhutan" && (
              <div className="price-card local popular">
                <div className="price-head">
                  <span className="price-tier">Advanced &middot; Bhutan</span>
                  <span className="price-badge local">
                    <i className="ti ti-heart-filled" /> Local
                  </span>
                </div>
                <div className="price-amt">
                  <span>{bhutan.amt}</span> <small>/ user / mo</small>
                </div>
                <div className="price-note">{bhutan.note}</div>
                <ul className="feat">
                  <li>
                    <i className="ti ti-check" /> Unlimited users &amp; projects
                  </li>
                  <li>
                    <i className="ti ti-check" /> GNH wellbeing layer
                  </li>
                  <li>
                    <i className="ti ti-check" /> Advanced analytics
                  </li>
                  <li>
                    <i className="ti ti-check" /> Team collaboration
                  </li>
                  <li>
                    <i className="ti ti-check" /> Local data residency
                  </li>
                </ul>
                <a className="price-cta ghost" href="#">
                  <i className="ti ti-credit-card pay-ico" /> Pay via MBOB{" "}
                  <i className="ti ti-chevron-down pay-caret" />
                </a>
              </div>
            )}

            <div className="price-card enterprise">
              <div className="price-head">
                <span className="price-tier">Enterprise</span>
                <span className="price-badge custom">Custom</span>
              </div>
              <div className="price-amt">Custom</div>
              <div className="price-note">For orgs with compliance needs.</div>
              <ul className="feat">
                <li>
                  <i className="ti ti-check" /> SSO &amp; advanced compliance
                </li>
                <li>
                  <i className="ti ti-check" /> Dedicated SLA &amp; support
                </li>
                <li>
                  <i className="ti ti-check" /> Onboarding &amp; success manager
                </li>
                <li>
                  <i className="ti ti-check" /> Custom integrations &amp; API
                </li>
                <li>
                  <i className="ti ti-check" /> Advanced security &amp; audit logs
                </li>
              </ul>
              <a className="price-cta ghost" href="#">
                Talk to sales
              </a>
            </div>
          </div>

          <div className="plans-include">
            <div className="pi-title">
              <i className="ti ti-stack-2" /> All plans include:
            </div>
            <div className="pi-items">
              <span className="pi-item">
                <i className="ti ti-rosette-discount-check" /> 99.9% uptime SLA
              </span>
              <span className="pi-item">
                <i className="ti ti-shield-check" /> Secure &amp; encrypted
              </span>
              <span className="pi-item">
                <i className="ti ti-headset" /> Priority 24/7 support
              </span>
            </div>
            <p className="price-tax">Prices shown for monthly billing. Taxes may apply. Nu pricing settled via MBOB.</p>
          </div>
        </div>
      </section>

      {/* ========================= COMPARE EVERY PLAN ========================= */}
      <section className="section" id="compare">
        <div className="container">
          <div className="lead-head">
            <h2>Compare every plan</h2>
            <p>The detail behind the cards.</p>
          </div>
          <div className="compare-wrap">
            <table className="ctable">
              <thead>
                <tr>
                  <th className="feat-h"></th>
                  <th>
                    <span className="plan-name">Free</span>
                    <span className="plan-sub">$0</span>
                  </th>
                  <th className="col-pop">
                    <span className="plan-name">Advanced &middot; Global</span>
                    <span className="plan-sub">$12 / mo</span>
                  </th>
                  <th>
                    <span className="plan-name">Advanced &middot; Bhutan</span>
                    <span className="plan-sub">Nu.1,472 / mo</span>
                  </th>
                  <th>
                    <span className="plan-name">Enterprise</span>
                    <span className="plan-sub">Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feat-c">Users</td>
                  <td>Up to 2</td>
                  <td className="col-pop">Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td className="feat-c">Projects</td>
                  <td>3</td>
                  <td className="col-pop">Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td className="feat-c">AI docs</td>
                  <td>Basic</td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Full AI suite + risk prediction</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">GNH wellbeing layer</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Advanced analytics</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Team collaboration</td>
                  <td>
                    <span className="yes free">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Real-time team chat</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Local data residency</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="no">&mdash;</span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">SSO &amp; advanced security</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="no">&mdash;</span>
                  </td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Dedicated SLA &amp; 24/7 support</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">
                    <span className="no">&mdash;</span>
                  </td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td>
                    <span className="yes">
                      <i className="ti ti-check" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="feat-c">Billing currency</td>
                  <td>
                    <span className="no">&mdash;</span>
                  </td>
                  <td className="col-pop">USD</td>
                  <td>Nu (BTN)</td>
                  <td>Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================== QUESTIONS, ANSWERED ========================== */}
      <section className="section" id="faq">
        <div className="container">
          <div className="lead-head">
            <h2>Questions, answered.</h2>
            <p>Everything teams ask before switching to Jaggle.</p>
          </div>
          <div className="faq" id="faqList">
            {FAQ_ITEMS.map((item, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={item.q}>
                <button className="faq-q" onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}>
                  {item.q} <i className="ti ti-plus" />
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ACT · FINAL CTA ============================ */}
      <section className="final" id="cta">
        <div className="final-panel">
          <h2>Build better. Sustainably.</h2>
          <p>No credit card &middot; free plan forever &middot; Bhutan-born, globally available.</p>
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
    </main>
  );
}
