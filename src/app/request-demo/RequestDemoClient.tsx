"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stop = {
  focus: string;
  time: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
};

const STOPS: Stop[] = [
  {
    focus: "planning",
    time: "00:00",
    icon: "ti-layout-board",
    title: "Live, personalized walkthrough",
    desc: "We map Jaggle onto your real projects and team setup so you see exactly how it fits.",
    tags: ["kanban", "timelines", "capacity"],
  },
  {
    focus: "ai-agents",
    time: "00:08",
    icon: "ti-brain",
    title: "AI agents, working",
    desc: "Predictive risk, task prioritisation and auto-drafted docs running live on a real board.",
    tags: ["risk", "auto-docs", "prioritise"],
  },
  {
    focus: "gnh",
    time: "00:18",
    icon: "ti-heart-handshake",
    title: "The GNH wellbeing layer",
    desc: "Balance, purpose, energy and growth scored into every sprint — Bhutan's philosophy, built in.",
    tags: ["balance", "energy", "growth"],
  },
  {
    focus: "reports",
    time: "00:26",
    icon: "ti-chart-histogram",
    title: "Reports, pricing & rollout",
    desc: "Narrative dashboards, then honest answers on plans, migration and your first sprint.",
    tags: ["dashboards", "pricing", "q&a"],
  },
];

const TOPICS: { id: string; label: string }[] = [
  { id: "everything", label: "Everything" },
  { id: "planning", label: "Planning" },
  { id: "ai-agents", label: "AI agents" },
  { id: "reports", label: "Reports" },
  { id: "gnh", label: "GNH wellbeing" },
];

const FLOW = [
  {
    icon: "ti-calendar-event",
    badge: "01",
    tag: "Day 0",
    title: "You book",
    desc: "Send the form and we confirm a 30-minute slot by email — within one business day.",
  },
  {
    icon: "ti-device-laptop",
    badge: "02",
    tag: "~30 min",
    title: "Guided tour",
    desc: "We walk your team through Jaggle on a live workspace shaped around your real projects.",
  },
  {
    icon: "ti-rocket",
    badge: "03",
    tag: "Day 1–14",
    title: "Start free",
    desc: "Spin up your workspace with a 14-day trial and run your first AI-assisted sprint.",
  },
];

/* -------------------------------------------------------------
   useInViewOnce — mirrors the source's one-shot IntersectionObserver
   reveal (adds a class the first time an element scrolls into view).
   ------------------------------------------------------------- */
function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function RequestDemoClient() {
  /* ---------------- contact console / left column reveal ---------------- */
  const [ciColRef, ciColInView] = useInViewOnce<HTMLDivElement>(0.2);

  /* ---------------- Thimphu local clock ---------------- */
  const [localTime, setLocalTime] = useState("—:—:—");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Thimphu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setLocalTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ---------------- live agenda console ---------------- */
  const [activeIndex, setActiveIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("everything");

  const lockedRef = useRef(locked);
  const hoveringRef = useRef(hovering);
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    lockedRef.current = locked;
    hoveringRef.current = hovering;
    activeIndexRef.current = activeIndex;
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [line, setLine] = useState({ top: 0, height: 0 });
  const [fill, setFill] = useState({ top: 0, height: 0 });
  const [pct, setPct] = useState(0);

  const paint = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const trackRect = trackEl.getBoundingClientRect();
    const centers = nodeRefs.current.map((n) => {
      if (!n) return 0;
      const r = n.getBoundingClientRect();
      return r.top - trackRect.top + r.height / 2;
    });
    if (!centers.length) return;
    const first = centers[0];
    const last = centers[centers.length - 1];
    const cur = centers[activeIndexRef.current];
    setLine({ top: first, height: last - first });
    setFill({ top: first, height: Math.max(0, cur - first) });
    const p = STOPS.length > 1 ? Math.round((activeIndexRef.current / (STOPS.length - 1)) * 100) : 0;
    setPct(p);
  }, []);

  useEffect(() => {
    paint();
  }, [activeIndex, paint]);

  useEffect(() => {
    queueMicrotask(() => setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(paint));
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(paint);
    }
    window.addEventListener("resize", paint, { passive: true });
    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("resize", paint);
    };
  }, [paint]);

  // in-view detection for the agenda track (drives autoplay)
  const [agendaInView, setAgendaInView] = useState(false);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setAgendaInView(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setAgendaInView(e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const agendaInViewRef = useRef(agendaInView);
  useEffect(() => {
    agendaInViewRef.current = agendaInView;
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (agendaInView && timerRef.current == null) {
      timerRef.current = setInterval(() => {
        if (!hoveringRef.current && !lockedRef.current && agendaInViewRef.current) {
          setActiveIndex((i) => (i + 1) % STOPS.length);
        }
      }, 3000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [agendaInView, reduceMotion]);

  const goToStop = (idx: number, syncTopic: boolean) => {
    setActiveIndex(((idx % STOPS.length) + STOPS.length) % STOPS.length);
    if (syncTopic) setSelectedTopic(STOPS[idx].focus);
  };

  const onTopicClick = (id: string) => {
    setSelectedTopic(id);
    if (id === "everything") {
      setLocked(false);
      return;
    }
    const idx = STOPS.findIndex((s) => s.focus === id);
    if (idx >= 0) {
      setLocked(true);
      setActiveIndex(idx);
    }
  };

  /* ---------------- process flow reveal ---------------- */
  const [flowRef, flowLive] = useInViewOnce<HTMLDivElement>(0.25);

  /* ---------------- demo request form ---------------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("11–50");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const recapLabel = TOPICS.find((t) => t.id === selectedTopic)?.label ?? "Everything";

  return (
    <main id="top" className="rd">
      {/* ========================= HERO ========================= */}
      <section className="sec contact-hero" id="demo">
        <div className="sec-inner">
          <div className="sec-head center contact-title">
            <h1 className="contact-h">
              See Jaggle <span className="grad">in action.</span>
            </h1>
            <p>
              Book a guided 30-minute walkthrough. We&apos;ll tailor it to your team — planning, AI agents, reports and the GNH
              wellbeing layer. No slides, no pressure.
            </p>
          </div>
        </div>
      </section>

      {/* ========================= EXPECTATIONS + FORM ========================= */}
      <section className="sec rd-form-sec">
        <div className="contact-grid">
          {/* Left: what to expect */}
          <div className={`ci-col${ciColInView ? " is-inview" : ""}`} ref={ciColRef}>
            <div className="ci-lead">
              <div className="ci-eyebrow">{"// what to expect"}</div>
              <h3 className="ci-h">A tour built around you.</h3>
              <p className="ci-sub">A live workspace, your use case, and time for every question — not a canned playback.</p>
            </div>

            {/* interactive live-agenda console */}
            <div className="agenda">
              <div className="agenda-meta">
                <span className="am-clock">
                  <i className="ti ti-clock-bolt" /> {localTime} <span className="blink">BTT</span>
                </span>
                <span className="am-prog">
                  <span className="am-prog-fill" style={{ width: `${pct}%` }} />
                </span>
                <span className="am-pct">{pct}%</span>
              </div>

              <div className={`ag-track${!reduceMotion ? " is-playing" : ""}`} ref={trackRef}>
                <span className="ag-line" aria-hidden="true" style={{ top: line.top, height: line.height }} />
                <span className="ag-fill" aria-hidden="true" style={{ top: fill.top, height: fill.height }} />

                {STOPS.map((stop, k) => (
                  <div
                    key={stop.focus}
                    className={`ag-stop${activeIndex === k ? " is-active" : ""}`}
                    data-focus={stop.focus}
                    tabIndex={0}
                    onMouseEnter={() => {
                      setHovering(true);
                      goToStop(k, false);
                    }}
                    onMouseLeave={() => setHovering(false)}
                    onFocus={() => {
                      setHovering(true);
                      goToStop(k, false);
                    }}
                    onBlur={() => setHovering(false)}
                    onClick={() => {
                      setLocked(true);
                      goToStop(k, true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLocked(true);
                        goToStop(k, true);
                      }
                    }}
                  >
                    <span className="ag-time">{stop.time}</span>
                    <span
                      className="ag-node"
                      ref={(el) => {
                        nodeRefs.current[k] = el;
                      }}
                    >
                      <i className={`ti ${stop.icon}`} />
                    </span>
                    <span className="ag-text">
                      <span className="ag-t">{stop.title}</span>
                      <span className="ag-d">{stop.desc}</span>
                      <span className="ag-tags">
                        {stop.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="agenda-foot">
                <span className="af-av">
                  <i className="ti ti-user" />
                  <span className="af-on" />
                </span>
                <span className="af-txt">
                  <b>Sonam Wangchuk</b>
                  <span>Product specialist · online now</span>
                </span>
                <span className="af-tag">Your guide</span>
              </div>
            </div>
          </div>

          {/* Right: book a demo */}
          <form className={`cform${submitted ? " is-sent" : ""}`} onSubmit={handleSubmit}>
            <div className="winbar">
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span className="name">demo_request.txt</span>
              <span className="live">
                <span className="pulse" /> Secure
              </span>
            </div>
            <div className="cform-body">
              <div className="cform-head">
                <h3>Book your demo</h3>
                <p>30 minutes, tailored to your team. We&apos;ll confirm by email.</p>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-name">Full name</label>
                  <input
                    className="cf-input"
                    id="cf-name"
                    type="text"
                    placeholder="Jane Dorji"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-email">Work email</label>
                  <input
                    className="cf-input"
                    id="cf-email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-company">Company</label>
                  <input
                    className="cf-input"
                    id="cf-company"
                    type="text"
                    placeholder="Company name"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-team">Team size</label>
                  <select className="cf-input" id="cf-team" value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
                    <option value="1–10">1–10</option>
                    <option value="11–50">11–50</option>
                    <option value="51–200">51–200</option>
                    <option value="201–1000">201–1,000</option>
                    <option value="1000+">1,000+</option>
                  </select>
                </div>
              </div>

              <div className="cf-field">
                <label>What do you want to see?</label>
                <div className="cf-topics" role="group" aria-label="Focus areas">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      className={`cf-topic${selectedTopic === topic.id ? " is-active" : ""}`}
                      data-topic={topic.id}
                      onClick={() => onTopicClick(topic.id)}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cf-field">
                <label htmlFor="cf-msg">
                  Anything we should know? <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  className="cf-textarea"
                  id="cf-msg"
                  placeholder="Your stack, team setup, timeline, or the problem you're trying to solve…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button className="lg-btn lg-btn--primary cf-submit" type="submit">
                <span className="lg-refract" aria-hidden="true" />
                <span className="lg-edge" aria-hidden="true" />
                <span className="lg-label">
                  Request demo <i className="ti ti-calendar-event arrow" aria-hidden="true" />
                </span>
              </button>

              {/* success state */}
              <div className="cform-success">
                <span className="ok">
                  <i className="ti ti-check" />
                </span>
                <h3>Request received.</h3>
                <p>Thanks — we&apos;ll email you within one business day to lock in a time that works.</p>
                <span className="dm-recap">
                  Focus: <b>{recapLabel}</b>
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ========================= WHAT HAPPENS NEXT ========================= */}
      <section className="sec dm-steps" id="how">
        <div className="sec-inner">
          <div className="sec-head center">
            <div className="eyebrow">
              <span className="status-dot" /> How it works
            </div>
            <h2 className="contact-h" style={{ fontSize: "clamp(34px,4.6vw,60px)" }}>
              From request to first sprint.
            </h2>
            <p>Three steps, about a week. No long sales cycle.</p>
          </div>
          <div className={`flow${flowLive ? " is-live" : ""}`} ref={flowRef}>
            <div className="flow-rail" aria-hidden="true">
              <span className="flow-rail-fill" />
            </div>

            {FLOW.map((step) => (
              <div className="flow-step" key={step.badge}>
                <div className="fs-node">
                  <i className={`ti ${step.icon}`} />
                  <span className="fs-badge">{step.badge}</span>
                </div>
                <div className="fs-card">
                  <span className="wm">{step.badge}</span>
                  <span className="fs-tag">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
