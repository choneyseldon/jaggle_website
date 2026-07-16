"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { LiquidButton } from "@/components/site/LiquidButton";
import "./features.css";

function pct(value: string): CSSProperties {
  return { "--pct": value } as CSSProperties;
}

function useFeatReveal() {
  const nodes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const feats = nodes.current.filter((el): el is HTMLElement => Boolean(el));
    if (!("IntersectionObserver" in window)) {
      feats.forEach((f) => f.classList.add("is-live"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-live");
        });
      },
      { threshold: 0.18 }
    );
    feats.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (i: number) => (el: HTMLElement | null) => {
    nodes.current[i] = el;
  };
}

export function FeaturesClient() {
  const setFeatRef = useFeatReveal();

  return (
    <main id="top">
      {/* HERO */}
      <header className="fp-hero">
        <div className="eyebrow">
          <span className="pill">FEATURES</span> 6 modules · one workspace
        </div>
        <h1>
          Everything your team needs to ship — <em>without burning out</em>
        </h1>
        <p>
          Jaggle pairs intelligent automation with built-in wellbeing. Plan, predict, write and report from a single
          surface — guided by Bhutan&rsquo;s Gross National Happiness philosophy.
        </p>
        <div className="fp-index">
          <a className="fp-chip" href="#plan">
            <i className="ti ti-layout-board" /> Plan
          </a>
          <a className="fp-chip" href="#ai-agents">
            <i className="ti ti-brain" /> AI agents
          </a>
          <a className="fp-chip" href="#docs">
            <i className="ti ti-file-text" /> Docs
          </a>
          <a className="fp-chip" href="#reports">
            <i className="ti ti-chart-histogram" /> Reports
          </a>
          <a className="fp-chip" href="#risks">
            <i className="ti ti-alert-triangle" /> Risks
          </a>
          <a className="fp-chip" href="#gnh">
            <i className="ti ti-heart-handshake" /> GNH
          </a>
        </div>
      </header>

      <div className="feat-wrap">
        {/* 01 · PLAN */}
        <section className="feat" id="plan" ref={setFeatRef(0)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-layout-board" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>01 — Plan</b>
            </div>
            <h2>Adaptive kanban &amp; timelines</h2>
            <p className="lead">
              Sprint planning, capacity scheduling and milestones in one place — re-balanced automatically when
              wellbeing signals say a teammate is stretched thin.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> Kanban, list, calendar and timeline of the same work
              </li>
              <li>
                <i className="ti ti-circle-check" /> Capacity-aware auto-assignment that respects real load
              </li>
              <li>
                <i className="ti ti-circle-check" /> Milestones and dependencies that re-flow as plans shift
              </li>
            </ul>
            <div className="spec">
              <span className="chip">Sprint</span>
              <span className="chip">Milestone</span>
              <span className="chip">Calendar</span>
              <span className="chip">Timeline</span>
              <span className="chip">Capacity</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">board · Druk Team</span>
                <span className="chip">
                  <span className="dot" /> Auto-balanced
                </span>
              </div>
              <div className="fv-stage">
                <div className="kan">
                  <div className="kan-col">
                    <div className="kan-h">
                      To do <span className="n">3</span>
                    </div>
                    <div className="kc">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">5 pts</span>
                      </div>
                    </div>
                    <div className="kc">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">2 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="kan-col">
                    <div className="kan-h">
                      Doing <span className="n">2</span>
                    </div>
                    <div className="kc grad">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">8 pts</span>
                      </div>
                    </div>
                    <div className="kc">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">5 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="kan-col">
                    <div className="kan-h">
                      Done <span className="n">4</span>
                    </div>
                    <div className="kc">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">3 pts</span>
                      </div>
                    </div>
                    <div className="kc">
                      <span className="t" />
                      <div className="m">
                        <span className="av" />
                        <span className="pt">2 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gantt">
                  <div className="gantt-row">
                    <span>Design</span>
                    <div className="gantt-track">
                      <b style={{ left: "4%", width: "38%" }} />
                    </div>
                  </div>
                  <div className="gantt-row">
                    <span>Build</span>
                    <div className="gantt-track">
                      <b style={{ left: "28%", width: "52%" }} />
                    </div>
                  </div>
                  <div className="gantt-row">
                    <span>QA</span>
                    <div className="gantt-track">
                      <b style={{ left: "64%", width: "30%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 · AI AGENTS */}
        <section className="feat rev" id="ai-agents" ref={setFeatRef(1)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-brain" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>02 — AI agents</b>
            </div>
            <h2>Six agents working the sprint with you</h2>
            <p className="lead">
              Predictive risk, task prioritisation, workload re-balancing and automations run quietly in the
              background — surfacing a suggestion only when it actually helps.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> Prioritisation that weighs impact, deadlines and capacity
              </li>
              <li>
                <i className="ti ti-circle-check" /> Workflow automations triggered by status, not by hand
              </li>
              <li>
                <i className="ti ti-circle-check" /> Plain-language reasoning behind every recommendation
              </li>
            </ul>
            <div className="spec">
              <span className="chip">Predict</span>
              <span className="chip">Prioritise</span>
              <span className="chip">Rebalance</span>
              <span className="chip">Automate</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">agents · live</span>
                <span className="chip">
                  <span className="dot" /> Processing
                </span>
              </div>
              <div className="fv-stage">
                <div className="agents">
                  <div className="ag">
                    <div className="ag-h">
                      <span className="d" /> Rebalance · capacity <span className="tag">2m ago</span>
                    </div>
                    <p>
                      Pema is at <b>118% capacity</b>. Move <b>JG-211</b> to Dorji — wellbeing index holds at{" "}
                      <b>7.4</b>.
                    </p>
                    <div className="ag-act">
                      <span className="ag-btn pri">Apply</span>
                      <span className="ag-btn">Dismiss</span>
                    </div>
                  </div>
                  <div className="ag">
                    <div className="ag-h">
                      <span className="d" /> Prioritise · sprint 14 <span className="tag">now</span>
                    </div>
                    <p>Payments API blocks <b>3 tasks</b>. Promote it to the top of Doing to protect the release date.</p>
                  </div>
                  <div className="ag">
                    <div className="ag-h">
                      <span className="d" /> Automation <span className="tag">scheduled</span>
                    </div>
                    <p>
                      Friday digest will post to <b>#druk-team</b> with velocity, risks and the GNH pulse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 · DOCS */}
        <section className="feat" id="docs" ref={setFeatRef(2)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-file-text" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>03 — Docs</b>
            </div>
            <h2>PRDs, retros &amp; research, written for you</h2>
            <p className="lead">
              Generate product docs straight from your workspace context. A one-line brief becomes a structured PRD,
              user stories or a sprint retrospective in seconds.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> PRDs and user stories from a single prompt
              </li>
              <li>
                <i className="ti ti-circle-check" /> Sprint retros assembled from real task history
              </li>
              <li>
                <i className="ti ti-circle-check" /> Research summaries with sources kept in context
              </li>
            </ul>
            <div className="spec">
              <span className="chip">PRD</span>
              <span className="chip">User stories</span>
              <span className="chip">Retro</span>
              <span className="chip">Research</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">docs · editor</span>
                <span className="chip">
                  <span className="dot" /> Generating…
                </span>
              </div>
              <div className="fv-stage">
                <div className="doc">
                  <div className="doc-title">PRD · Onboarding flow</div>
                  <div className="doc-meta">v0.3 · drafted from 41 tasks</div>
                  <div className="doc-lines">
                    <div className="doc-line head l1" />
                    <div className="doc-line l2" />
                    <div className="doc-line l3" />
                    <div className="doc-line l4" />
                    <div className="doc-line l5" />
                    <div className="doc-line l6" />
                  </div>
                  <div className="doc-status">
                    Writing acceptance criteria <span className="caret" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · REPORTS */}
        <section className="feat rev" id="reports" ref={setFeatRef(3)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-chart-histogram" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>04 — Reports</b>
            </div>
            <h2>Live dashboards that read themselves</h2>
            <p className="lead">
              Project overviews, financials and velocity update in real time — each paired with a narrative summary
              so stakeholders get the story, not just the chart.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> Real-time velocity, burndown and budget views
              </li>
              <li>
                <i className="ti ti-circle-check" /> Narrative summaries written from the live data
              </li>
              <li>
                <i className="ti ti-circle-check" /> Scheduled stakeholder reports, delivered automatically
              </li>
            </ul>
            <div className="spec">
              <span className="chip">Velocity</span>
              <span className="chip">Burndown</span>
              <span className="chip">Budget</span>
              <span className="chip">Narrative</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">reports · overview</span>
                <span className="chip">
                  <span className="dot" /> Live
                </span>
              </div>
              <div className="fv-stage">
                <div className="rep">
                  <div className="rep-kpis">
                    <div className="rep-kpi">
                      <span className="k">Velocity</span>
                      <span className="v">
                        47<small style={{ fontSize: "13px", color: "var(--fg-muted)" }}> pts</small>
                      </span>
                      <span className="d up">
                        <i className="ti ti-arrow-up-right" /> 12%
                      </span>
                    </div>
                    <div className="rep-kpi">
                      <span className="k">On track</span>
                      <span className="v">
                        92<small style={{ fontSize: "13px", color: "var(--fg-muted)" }}>%</small>
                      </span>
                      <span className="d up">
                        <i className="ti ti-arrow-up-right" /> 5%
                      </span>
                    </div>
                    <div className="rep-kpi">
                      <span className="k">Budget</span>
                      <span className="v">
                        68<small style={{ fontSize: "13px", color: "var(--fg-muted)" }}>%</small>
                      </span>
                      <span className="d warn">
                        <i className="ti ti-minus" /> watch
                      </span>
                    </div>
                  </div>
                  <div className="rep-chart">
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 · RISKS */}
        <section className="feat" id="risks" ref={setFeatRef(4)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-alert-triangle" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>05 — Risks</b>
            </div>
            <h2>See the slip before it happens</h2>
            <p className="lead">
              Jaggle watches velocity, dependencies and workload to score delivery confidence days ahead — with
              mitigation surfaced early, not at standup.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> Per-sprint slip probability, updated continuously
              </li>
              <li>
                <i className="ti ti-circle-check" /> Dependency and blocker chains flagged before they bite
              </li>
              <li>
                <i className="ti ti-circle-check" /> Suggested mitigations, ranked by impact
              </li>
            </ul>
            <div className="spec">
              <span className="chip warn">Real-time</span>
              <span className="chip">Dependencies</span>
              <span className="chip">Workload</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">risk radar · sprint 14</span>
                <span className="chip warn">
                  <span className="dot" /> Monitoring
                </span>
              </div>
              <div className="fv-stage">
                <div className="risk">
                  <div className="risk-list">
                    <div className="risk-row">
                      <span className="sev hi" />
                      <span className="lbl">Payments API integration</span>
                      <span className="pct">71% slip</span>
                    </div>
                    <div className="risk-row">
                      <span className="sev md" />
                      <span className="lbl">Design QA backlog</span>
                      <span className="pct">38% slip</span>
                    </div>
                    <div className="risk-row">
                      <span className="sev lo" />
                      <span className="lbl">Docs &amp; handover</span>
                      <span className="pct">9% slip</span>
                    </div>
                  </div>
                  <div className="risk-gauge">
                    <svg viewBox="0 0 100 56">
                      <defs>
                        <linearGradient id="fpGaugeG" x1="0" x2="1">
                          <stop offset="0" stopColor="#2ecc71" />
                          <stop offset=".5" stopColor="#f5c542" />
                          <stop offset="1" stopColor="#ff5a5f" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 8 50 A 42 42 0 0 1 92 50"
                        fill="none"
                        stroke="rgba(255,255,255,.10)"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 8 50 A 42 42 0 0 1 92 50"
                        fill="none"
                        stroke="url(#fpGaugeG)"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <g className="needle">
                        <line x1="50" y1="46" x2="50" y2="14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="50" cy="46" r="3" fill="#fff" />
                      </g>
                    </svg>
                    <span className="gx">Sprint risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 · GNH */}
        <section className="feat rev" id="gnh" ref={setFeatRef(5)}>
          <div className="feat-copy">
            <div className="feat-ico">
              <i className="ti ti-heart-handshake" />
            </div>
            <div className="feat-num">
              <span>/ Module</span> <b>06 — GNH</b>
            </div>
            <h2>Wellbeing as a first-class metric</h2>
            <p className="lead">
              Balance, purpose, energy and growth are tracked alongside delivery — Bhutan&rsquo;s Gross National
              Happiness philosophy built into every sprint, not bolted on.
            </p>
            <ul>
              <li>
                <i className="ti ti-circle-check" /> Four wellbeing signals scored weekly per person and team
              </li>
              <li>
                <i className="ti ti-circle-check" /> Burnout warnings before they turn into attrition
              </li>
              <li>
                <i className="ti ti-circle-check" /> Sustainable-pace guardrails on every sprint plan
              </li>
            </ul>
            <div className="spec">
              <span className="chip">Balance</span>
              <span className="chip">Purpose</span>
              <span className="chip">Energy</span>
              <span className="chip">Growth</span>
            </div>
          </div>
          <div className="feat-vis">
            <div className="fv">
              <div className="fv-bar">
                <span className="fv-dots">
                  <i /> <i /> <i />
                </span>
                <span className="fv-name">gnh pulse · this week</span>
                <span className="chip">
                  <span className="dot" /> Healthy
                </span>
              </div>
              <div className="fv-stage">
                <div className="gnh">
                  <div className="gnh-score">
                    <div className="big">7.4</div>
                    <div className="lbl">GNH index</div>
                    <div className="delta">▲ 0.3 vs last week</div>
                  </div>
                  <div className="gnh-rows">
                    <div className="gnh-r">
                      <span>Balance</span>
                      <div className="track">
                        <div className="fill" style={pct("82%")} />
                      </div>
                      <span className="num">82</span>
                    </div>
                    <div className="gnh-r">
                      <span>Purpose</span>
                      <div className="track">
                        <div className="fill" style={pct("64%")} />
                      </div>
                      <span className="num">64</span>
                    </div>
                    <div className="gnh-r">
                      <span>Energy</span>
                      <div className="track">
                        <div className="fill" style={pct("91%")} />
                      </div>
                      <span className="num">91</span>
                    </div>
                    <div className="gnh-r">
                      <span>Growth</span>
                      <div className="track">
                        <div className="fill" style={pct("73%")} />
                      </div>
                      <span className="num">73</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <section className="final" id="cta">
        <div className="final-panel">
          <h2>One workspace for the whole sprint.</h2>
          <p>No credit card · free plan forever · Bhutan-born, globally available.</p>
          <div className="final-cta">
            <LiquidButton href="/#cta" variant="primary" size="lg">
              Start for free <i className="ti ti-arrow-right arrow" />
            </LiquidButton>
            <LiquidButton href="/" size="lg">
              <i className="ti ti-arrow-left" /> Back to home
            </LiquidButton>
          </div>
        </div>
      </section>
    </main>
  );
}
