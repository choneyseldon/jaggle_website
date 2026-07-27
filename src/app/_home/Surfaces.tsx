"use client";

import { useEffect, useRef, useState } from "react";

export function Surfaces() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isLive, setIsLive] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // pointer-following spotlight is a desktop hover/cursor effect — skip on mobile,
    // where it only added continuous work during touch-scroll without visual benefit
    if (window.matchMedia("(max-width: 620px)").matches) return;

    const root = document.documentElement;
    let raf: number | null = null;
    let px = window.innerWidth * 0.5;
    let py = window.innerHeight * 0.45;
    const apply = () => {
      raf = null;
      root.style.setProperty("--x", px.toFixed(1));
      root.style.setProperty("--xp", (px / window.innerWidth).toFixed(4));
      root.style.setProperty("--y", py.toFixed(1));
      root.style.setProperty("--yp", (py / window.innerHeight).toFixed(4));
    };
    apply();
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (raf == null) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = 7.4;

    function runScore() {
      if (reduce) {
        setScore(target);
        return;
      }
      setScore(0);
      const dur = 1300;
      const t0 = performance.now();
      function tick(now: number) {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setScore(Math.round(target * eased * 10) / 10);
        if (p < 1) requestAnimationFrame(tick);
        else setScore(target);
      }
      requestAnimationFrame(tick);
    }

    function go() {
      setIsLive(true);
      runScore();
    }

    if (!("IntersectionObserver" in window)) {
      go();
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            go();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="surfaces">
      <div className="sec-inner">
        <div className="os-head">
          <h2 className="os-title">
            <span className="b">One workspace.</span>
            <span className="b dim">Eight surfaces.</span>
          </h2>
          <div className="os-meta">
            Plan · Prioritize · Execute · Report · Improve
            <span className="count">
              / <b>8 modules</b>
            </span>
          </div>
        </div>

        <div className={`os-grid${isLive ? " is-live" : ""}`} ref={gridRef}>
          {/* 1 · PLAN */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 268, ["--spread" as string]: 90, ["--backdrop" as string]: "#1a1142" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Plan</h3>
              <span className="surf-tag">/ 5 surfaces</span>
            </header>
            <div className="surf-vis">
              <div className="sf-kanwrap">
                <div className="sf-kan">
                  <div className="sf-kancol">
                    <span className="sf-kanh">Backlog</span>
                    <span className="sf-kanbar" />
                    <span className="sf-kanbar sm" />
                  </div>
                  <div className="sf-kancol">
                    <span className="sf-kanh">Doing</span>
                    <span className="sf-kanbar" />
                    <span className="sf-kanbar sm" />
                  </div>
                  <div className="sf-kancol">
                    <span className="sf-kanh">Done</span>
                    <span className="sf-kanbar" />
                    <span className="sf-kanbar sm" />
                  </div>
                </div>
              </div>
            </div>
            <footer className="surf-foot">Sprint · Milestone · Calendar</footer>
          </article>

          {/* 2 · AI AGENTS */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 278, ["--spread" as string]: 80, ["--backdrop" as string]: "#15132c" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">
                AI
                <br />
                agents
              </h3>
              <span className="surf-tag">/ 6 agents</span>
            </header>
            <div className="surf-vis">
              <div className="sf-sug">
                <div className="sf-sugh">
                  <span className="dot" /> Jaggle · suggestion
                </div>
                <p className="sf-sugbody">
                  Pema is at <b>118% capacity</b>. Move JG-211 to Dorji. Wellbeing index holds at <b>7.4</b>.
                </p>
              </div>
            </div>
            <footer className="surf-foot">Predict · Prioritize · Rebalance</footer>
          </article>

          {/* 3 · AI DOCS */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 216, ["--spread" as string]: 70, ["--backdrop" as string]: "#0f1320" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">
                AI
                <br />
                docs
              </h3>
              <span className="surf-tag">/ generated</span>
            </header>
            <div className="surf-vis">
              <div className="sf-doc">
                <span className="sf-docrow s" />
                <span className="sf-docrow l" />
                <span className="sf-docrow m" />
                <span className="sf-docrow l" />
                <span className="sf-docrow x" />
              </div>
            </div>
            <footer className="surf-foot">PRD · Retro · Summary</footer>
          </article>

          {/* 4 · WELLBEING */}
          <article
            className="sf-glow surf"
            style={{ ["--base" as string]: 148, ["--spread" as string]: 60, ["--sat" as string]: 70, ["--backdrop" as string]: "#0a1f15" }}
          >
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Wellbeing</h3>
              <span className="surf-tag">/ GNH layer</span>
            </header>
            <div className="surf-vis">
              <div className="sf-gnh">
                <div className="sf-gnhscore">
                  {score.toFixed(1)}
                  <span className="of">/10</span>
                </div>
                <div className="sf-gnhstate">
                  <span className="dot" /> Steady · 4 wk
                </div>
              </div>
            </div>
            <footer className="surf-foot">Bhutan-born · World-first</footer>
          </article>

          {/* 5 · REPORTS */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 212, ["--spread" as string]: 70, ["--backdrop" as string]: "#0c1322" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Reports</h3>
              <span className="surf-tag">/ live</span>
            </header>
            <div className="surf-vis">
              <svg className="sf-chart" viewBox="0 0 280 150" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sfRepFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f8bff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#4f8bff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,118 L40,104 L80,88 L120,92 L160,64 L200,52 L240,30 L280,16 L280,150 L0,150 Z" fill="url(#sfRepFill)" />
                <path
                  d="M0,118 L40,104 L80,88 L120,92 L160,64 L200,52 L240,30 L280,16"
                  pathLength={1}
                  fill="none"
                  stroke="#5d97ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <footer className="surf-foot">Analytics · Insights · Overview</footer>
          </article>

          {/* 6 · RISKS */}
          <article
            className="sf-glow surf"
            style={{ ["--base" as string]: 30, ["--spread" as string]: 46, ["--sat" as string]: 88, ["--backdrop" as string]: "#1d1206" }}
          >
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Risks</h3>
              <span className="surf-tag">/ proactive</span>
            </header>
            <div className="surf-vis">
              <svg className="sf-chart" viewBox="0 0 280 150" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sfRiskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5862b" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f5862b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,128 L56,118 L112,102 L168,74 L224,40 L280,8 L280,150 L0,150 Z" fill="url(#sfRiskFill)" />
                <path
                  d="M0,128 L56,118 L112,102 L168,74 L224,40 L280,8"
                  pathLength={1}
                  fill="none"
                  stroke="#ff9a3c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="112" cy="102" r="4.5" fill="#ff9a3c" />
                <circle cx="224" cy="40" r="4.5" fill="#ff9a3c" />
              </svg>
            </div>
            <footer className="surf-foot">Detect · Alert · Mitigate</footer>
          </article>

          {/* 7 · TEAM */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 264, ["--spread" as string]: 84, ["--backdrop" as string]: "#181232" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Team</h3>
              <span className="surf-tag">/ workspace</span>
            </header>
            <div className="surf-vis">
              <div className="sf-avs">
                <span className="sf-av s">S</span>
                <span className="sf-av p">P</span>
                <span className="sf-av d">D</span>
                <span className="sf-av k">K</span>
                <span className="sf-av more">+6</span>
              </div>
            </div>
            <footer className="surf-foot">Collaborate · Assign · Track</footer>
          </article>

          {/* 8 · WORKFLOWS */}
          <article className="sf-glow surf" style={{ ["--base" as string]: 224, ["--spread" as string]: 64, ["--backdrop" as string]: "#0e0e1a" }}>
            <span className="sf-bloom" />
            <header className="surf-top">
              <h3 className="surf-name">Workflows</h3>
              <span className="surf-tag">/ automated</span>
            </header>
            <div className="surf-vis">
              <div className="sf-flow">
                <div className="sf-step">
                  <span className="box warn" /> trigger · slip detected
                </div>
                <div className="sf-link" />
                <div className="sf-step">
                  <span className="box" /> notify owner
                </div>
                <div className="sf-link" />
                <div className="sf-step">
                  <span className="box" /> draft mitigation
                </div>
              </div>
            </div>
            <footer className="surf-foot">Trigger · Automate · Resolve</footer>
          </article>
        </div>
      </div>
    </section>
  );
}
