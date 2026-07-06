"use client";

import { useState } from "react";
import Link from "next/link";
import { LiquidButton } from "@/components/site/LiquidButton";

type Cycle = "monthly" | "annual";

const PRICES: Record<Cycle, { global: { amt: string; note: string }; bhutan: { amt: string; note: string } }> = {
  monthly: {
    global: { amt: "$12", note: "Billed monthly. Unlimited projects." },
    bhutan: { amt: "$9", note: "Billed in Nu (BTN)." },
  },
  annual: {
    global: { amt: "$10", note: "Billed annually — 2 months free." },
    bhutan: { amt: "$7", note: "Billed annually in Nu (BTN)." },
  },
};

const TEAM_PRESETS = [1, 5, 10, 25, 50];

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [teamSize, setTeamSize] = useState(5);
  const prices = PRICES[cycle];

  return (
    <section className="sec" id="pricing">
      <div className="sec-inner">
        <div className="sec-head center">
          <h2 className="sec-title">Free to start. Fair as you grow.</h2>
          <p className="sec-sub">No credit card for the free plan — ever. Switch to annual for two months on us.</p>
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
            <button type="button" aria-label="Decrease team size" onClick={() => setTeamSize((n) => Math.max(1, n - 1))}>
              &minus;
            </button>
            <span className="ts-val">{teamSize}</span>
            <button type="button" aria-label="Increase team size" onClick={() => setTeamSize((n) => Math.min(999, n + 1))}>
              +
            </button>
          </div>
          <div className="ts-presets">
            {TEAM_PRESETS.map((n) => (
              <button key={n} type="button" className={teamSize === n ? "is-active" : ""} onClick={() => setTeamSize(n)}>
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
            <a className="price-cta ghost" href="#cta">
              Get started
            </a>
          </div>

          <div className="price-card popular">
            <div className="price-head">
              <span className="price-tier">Advanced &middot; Global</span>
              <span className="price-badge popular">Most popular</span>
            </div>
            <div className="price-amt">
              <span>{prices.global.amt}</span> <small>/ user / mo</small>
            </div>
            <div className="price-note">{prices.global.note}</div>
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
            <LiquidButton href="#cta" variant="primary" className="price-cta">
              Start 14-day trial
            </LiquidButton>
          </div>

          <div className="price-card local">
            <div className="price-head">
              <span className="price-tier">Advanced &middot; Bhutan</span>
              <span className="price-badge local">
                <i className="ti ti-heart-filled" /> Local
              </span>
            </div>
            <div className="price-amt">
              <span>{prices.bhutan.amt}</span> <small>/ user / mo</small>
            </div>
            <div className="price-note">{prices.bhutan.note}</div>
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
            <a className="price-cta ghost" href="#cta">
              <i className="ti ti-credit-card pay-ico" /> Pay via MBOB <i className="ti ti-chevron-down pay-caret" />
            </a>
          </div>

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
            <Link className="price-cta ghost" href="/contact">
              Talk to sales
            </Link>
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
          <p className="price-tax">Prices shown in USD. Taxes may apply.</p>
        </div>
      </div>
    </section>
  );
}
