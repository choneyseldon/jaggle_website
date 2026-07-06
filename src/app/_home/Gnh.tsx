"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidButton } from "@/components/site/LiquidButton";

type Dim = {
  c: string;
  kicker: string;
  title: string;
  tag: string;
  desc: string;
  pts: string[];
};

const DIMS: Dim[] = [
  {
    c: "#46d39a",
    kicker: "Sustainable load",
    title: "Balance",
    tag: "Workload that respects human limits.",
    desc:
      "Jaggle watches how work is spread across the team and flags overload before it turns into burnout — then rebalances tasks by real capacity instead of gut feel.",
    pts: ["Capacity-aware assignment", "Overload early-warning", "Fair sprint spread"],
  },
  {
    c: "#6E8CFF",
    kicker: "Meaningful work",
    title: "Purpose",
    tag: "Every task carries its why.",
    desc:
      "Work stays connected to the goal it serves, so people can see how today's task ladders up to something that matters — not busywork in a vacuum.",
    pts: ["Goal-linked tasks", "Visible impact", "Clear priorities"],
  },
  {
    c: "#B080FF",
    kicker: "Pace & focus",
    title: "Energy",
    tag: "Focus and rest as the default.",
    desc:
      "Jaggle protects deep-focus time and reads the rhythm of work — surfacing an unsustainable pace long before a deadline is ever missed.",
    pts: ["Focus-time protection", "Pace monitoring", "Sustainable sprints"],
  },
  {
    c: "#78c8ff",
    kicker: "Recognition",
    title: "Growth",
    tag: "Quiet wins don't go unseen.",
    desc:
      "Steady progress and behind-the-scenes contributions get surfaced, so growth is recognised across the team — not just the loudest output in the room.",
    pts: ["Contribution surfacing", "Progress recognition", "Skill momentum"],
  },
];

const AUTO_MS = 4200;

export function Gnh() {
  const [cur, setCur] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const engineRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef(true);
  const visibleRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pick = (i: number) => {
    setCur(i);
    if (!firstRef.current) setFlipKey((k) => k + 1);
    firstRef.current = false;
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // use refs to avoid stale closure over `cur`
  const curRef = useRef(cur);
  useEffect(() => {
    curRef.current = cur;
  });

  useEffect(() => {
    const eng = engineRef.current;
    if (!eng) return;

    function next() {
      pick((curRef.current + 1) % DIMS.length);
    }
    function realStart() {
      stop();
      timerRef.current = setInterval(next, AUTO_MS);
    }

    const onEnter = () => stop();
    const onLeave = () => {
      if (visibleRef.current) realStart();
    };
    eng.addEventListener("mouseenter", onEnter);
    eng.addEventListener("mouseleave", onLeave);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) realStart();
            else stop();
          });
        },
        { threshold: 0.25 }
      );
      io.observe(eng);
    } else {
      visibleRef.current = true;
      realStart();
    }

    return () => {
      eng.removeEventListener("mouseenter", onEnter);
      eng.removeEventListener("mouseleave", onLeave);
      stop();
      if (io) io.disconnect();
    };
  }, []);

  const d = DIMS[cur];

  return (
    <section className="sec" id="gnh">
      <div className="sec-inner">
        <div className="sec-head center">
          <h2 className="sec-title">
            Success measured as <span className="gnh-grad">happiness</span>, not just output.
          </h2>
          <p className="sec-sub">
            Bhutan measures progress by wellbeing, not GDP. Jaggle is the first project tool to do the same for teams — a live
            wellbeing layer wired into every sprint, not a survey nobody fills in.
          </p>
        </div>

        <div className="gnh-engine" ref={engineRef} style={{ ["--c" as string]: d.c }}>
          <div className="ge-stage">
            <svg className="ge-ring" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="ge-track" cx="100" cy="100" r="78" />
              <circle
                className={`ge-arc${cur === 0 ? " is-active" : ""}`}
                cx="100"
                cy="100"
                r="78"
                pathLength={100}
                style={{ stroke: "#46d39a", transform: "rotate(234deg)" }}
              />
              <circle
                className={`ge-arc${cur === 1 ? " is-active" : ""}`}
                cx="100"
                cy="100"
                r="78"
                pathLength={100}
                style={{ stroke: "#6E8CFF", transform: "rotate(-36deg)" }}
              />
              <circle
                className={`ge-arc${cur === 2 ? " is-active" : ""}`}
                cx="100"
                cy="100"
                r="78"
                pathLength={100}
                style={{ stroke: "#B080FF", transform: "rotate(54deg)" }}
              />
              <circle
                className={`ge-arc${cur === 3 ? " is-active" : ""}`}
                cx="100"
                cy="100"
                r="78"
                pathLength={100}
                style={{ stroke: "#78c8ff", transform: "rotate(144deg)" }}
              />
            </svg>
            <div className="ge-core">
              <span className="ge-pulse" aria-hidden="true" />
              <span className="ge-live">
                <span className="ge-livedot" /> Live
              </span>
              <b>GNH</b>
              <span className="ge-coredim">{d.title}</span>
            </div>
            <button className={`ge-node${cur === 0 ? " is-active" : ""}`} data-dim="0" style={{ ["--nc" as string]: "#46d39a" }} aria-label="Balance" onClick={() => pick(0)}>
              <i className="ti ti-scale" />
            </button>
            <button className={`ge-node${cur === 1 ? " is-active" : ""}`} data-dim="1" style={{ ["--nc" as string]: "#6E8CFF" }} aria-label="Purpose" onClick={() => pick(1)}>
              <i className="ti ti-target-arrow" />
            </button>
            <button className={`ge-node${cur === 2 ? " is-active" : ""}`} data-dim="2" style={{ ["--nc" as string]: "#B080FF" }} aria-label="Energy" onClick={() => pick(2)}>
              <i className="ti ti-bolt" />
            </button>
            <button className={`ge-node${cur === 3 ? " is-active" : ""}`} data-dim="3" style={{ ["--nc" as string]: "#78c8ff" }} aria-label="Growth" onClick={() => pick(3)}>
              <i className="ti ti-plant-2" />
            </button>
          </div>

          <div className="ge-detail" id="geDetail">
            <span className="ge-eyebrow">
              <span className="bar" /> <span className="ge-idx">{String(cur + 1).padStart(2, "0")}</span> &middot;{" "}
              <span className="ge-kicker">{d.kicker}</span>
            </span>
            <div className={`ge-flip-group${flipKey > 0 ? " is-flip" : ""}`} key={flipKey}>
              <h3 className="ge-title">{d.title}</h3>
              <div className="ge-wave" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="ge-tagline">{d.tag}</p>
              <p className="ge-desc">{d.desc}</p>
              <ul className="ge-points">
                {d.pts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="ge-dots">
              {DIMS.map((dim, i) => (
                <button key={dim.title} className={`ge-dot${cur === i ? " is-active" : ""}`} data-dim={i} aria-label={dim.title} onClick={() => pick(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="gnh-an-head">
          <span className="k">/ Under the hood</span>
          <h3>What the engine quietly runs</h3>
        </div>
        <div className="gnh-an-grid">
          <article className="gnh-acard">
            <div className="top">
              <span className="ico">
                <i className="ti ti-heartbeat" />
              </span>
              <span className="num">01</span>
            </div>
            <h4>Team Health Score</h4>
            <p>One workspace-level read on how the team&rsquo;s really doing.</p>
          </article>
          <article className="gnh-acard">
            <div className="top">
              <span className="ico">
                <i className="ti ti-flame" />
              </span>
              <span className="num">02</span>
            </div>
            <h4>Burnout Prediction</h4>
            <p>Early warning from workload and performance trends — before someone breaks.</p>
          </article>
          <article className="gnh-acard">
            <div className="top">
              <span className="ico">
                <i className="ti ti-arrows-shuffle" />
              </span>
              <span className="num">03</span>
            </div>
            <h4>Intelligent Workload Allocation</h4>
            <p>Redistributes tasks by capacity, performance and stress — automatically.</p>
          </article>
        </div>

        <div className="gnh-rooted">
          <div>
            <span className="eyebrow">
              <span className="pill">
                <i className="ti ti-mountain" style={{ fontSize: 11 }} />
              </span>{" "}
              Rooted in Bhutan
            </span>
            <p className="stmt">
              From the country that chose happiness over GDP — now building the world&rsquo;s first GNH-guided project platform.
            </p>
            <span className="born">Born in Thimphu</span>
          </div>
          <div className="gnh-aside">
            <div className="gnh-trust">
              <i className="ti ti-shield-check" />
              <p>
                <b>Built to support people, not police them.</b> Wellbeing signals stay team-level and opt-in — never a ranked
                list of who&rsquo;s struggling.
              </p>
            </div>
            <div className="gnh-cta">
              <LiquidButton href="#features" variant="primary">
                See the GNH dashboard <i className="ti ti-arrow-right arrow" />
              </LiquidButton>
              <LiquidButton href="#faq">Why we measure happiness</LiquidButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
