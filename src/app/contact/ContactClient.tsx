"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROLES, DEPT_FILTERS, type Role } from "@/data/roles";
import "./contact.css";

const TOPICS = [
  { value: "general", label: "General" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
];

function countFor(key: string) {
  if (key === "all") return ROLES.length;
  return ROLES.filter((r) => r.dept === key).length;
}

export function ContactClient() {
  // ---- contact form ----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (sendTimer.current) clearTimeout(sendTimer.current);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    sendTimer.current = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 650);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setTopic("general");
    setMessage("");
    setSent(false);
  };

  // ---- local Thimphu clock ----
  const [time, setTime] = useState("—:—");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Thimphu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ---- contact directory staggered in-view reveal ----
  const ciColRef = useRef<HTMLDivElement | null>(null);
  const [ciInView, setCiInView] = useState(false);
  useEffect(() => {
    const el = ciColRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setCiInView(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCiInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- open roles: filter + staggered scroll-in reveal ----
  const [activeFilter, setActiveFilter] = useState<"all" | Role["dept"]>("all");
  const rolesSectionRef = useRef<HTMLElement | null>(null);
  const [rolesInView, setRolesInView] = useState(false);
  const roleCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isFirstFilterRender = useRef(true);

  useEffect(() => {
    const el = rolesSectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setRolesInView(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRolesInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    ROLES.forEach((role, i) => {
      if (activeFilter !== "all" && role.dept !== activeFilter) return;
      const el = roleCardRefs.current[i];
      if (!el) return;
      el.classList.remove("just-in");
      void el.offsetWidth;
      el.classList.add("just-in");
    });
  }, [activeFilter]);

  const handleRolePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
    card.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
  };

  const visibleCount = countFor(activeFilter);

  // ---- scroll affordance hint ----
  const [hintVisible, setHintVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setHintVisible(window.scrollY <= 24);
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="top">
      {/* ========================= HERO ========================= */}
      <section className="section contact-hero" id="contact">
        <div className="container">
          <div className="sec-head contact-title">
            <h2 className="contact-h">
              Get in <span className="grad">touch.</span>
            </h2>
            <p>Questions, demos, partnerships or press — we usually reply within one business day.</p>
          </div>
        </div>
      </section>

      {/* ========================= INFO + FORM ========================= */}
      <section className="section" style={{ borderTop: "none", paddingTop: 0 }}>
        <div className="contact-grid">
          {/* Left: open contact directory */}
          <div className={`ci-col${ciInView ? " is-inview" : ""}`} id="ciCol" ref={ciColRef}>
            <div className="ci-lead">
              <div className="ci-eyebrow">{"// reach us"}</div>
              <h3 className="ci-h">Talk to a human.</h3>
              <p className="ci-sub">Pick a line below — questions, demos or partnerships. We usually reply within four hours.</p>
            </div>

            <div className="ci-status">
              <span className="dot" /> Online
              <span className="sep">/</span>
              <span className="muted">Thimphu</span>
              <span id="localTime">
                {time} <span className="blink">BTT</span>
              </span>
            </div>

            <ul className="ci-lines">
              <li>
                <a className="ci-line" href="mailto:hello@jaggle.ai">
                  <span className="ln-txt">
                    <span className="ln-k">
                      <span className="idx">01</span> General
                    </span>
                    <span className="ln-v">hello@jaggle.ai</span>
                  </span>
                  <span className="ln-go">
                    <i className="ti ti-arrow-up-right" />
                  </span>
                </a>
              </li>
              <li>
                <a className="ci-line" href="mailto:sales@jaggle.ai">
                  <span className="ln-txt">
                    <span className="ln-k">
                      <span className="idx">02</span> Sales &amp; demos
                    </span>
                    <span className="ln-v">sales@jaggle.ai</span>
                  </span>
                  <span className="ln-go">
                    <i className="ti ti-arrow-up-right" />
                  </span>
                </a>
              </li>
              <li>
                <a className="ci-line" href="#">
                  <span className="ln-txt">
                    <span className="ln-k">
                      <span className="idx">03</span> Office
                    </span>
                    <span className="ln-v">Thimphu, Bhutan</span>
                  </span>
                  <span className="ln-go">
                    <i className="ti ti-map-pin" />
                  </span>
                </a>
              </li>
            </ul>

            <div className="ci-follow">
              <div className="ci-follow-top">
                <span className="lbl">Connect</span>
                <span className="rule" />
                <span className="handle">@jaggleai</span>
              </div>
              <div className="ci-socials">
                <a href="#" aria-label="LinkedIn">
                  <i className="ti ti-brand-linkedin" />
                </a>
                <a href="#" aria-label="X / Twitter">
                  <i className="ti ti-brand-x" />
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="ti ti-brand-instagram" />
                </a>
                <a href="#" aria-label="GitHub">
                  <i className="ti ti-brand-github" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: send us a message */}
          <form className="cform" id="contactForm" onSubmit={handleSubmit}>
            <div className="winbar">
              <span className="dots">
                <i /> <i /> <i />
              </span>
              <span className="name">new_message.txt</span>
              <span className="live">
                <span className="pulse" /> Encrypted
              </span>
            </div>

            {sent ? (
              <div className="cform-body cform-success">
                <div className="cf-success-icon">
                  <i className="ti ti-circle-check" />
                </div>
                <h3>Message sent</h3>
                <p>Thanks, {name || "there"} — we&rsquo;ll get back within a day.</p>
                <button type="button" className="lg-btn" onClick={resetForm}>
                  <span className="lg-refract" aria-hidden="true" />
                  <span className="lg-edge" aria-hidden="true" />
                  <span className="lg-label">Send another message</span>
                </button>
              </div>
            ) : (
              <div className="cform-body">
                <div className="cform-head">
                  <h3>Send us a message</h3>
                  <p>We&rsquo;ll get back within a day.</p>
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
                <div className="cf-field">
                  <label htmlFor="cf-company">
                    Company <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}>(optional)</span>
                  </label>
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
                  <label>Topic</label>
                  <div className="cf-topics" id="cfTopics" role="group" aria-label="Topic">
                    {TOPICS.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        className={`cf-topic${topic === t.value ? " is-active" : ""}`}
                        onClick={() => setTopic(t.value)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea
                    className="cf-textarea"
                    id="cf-msg"
                    placeholder="Tell us what you're working on…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button className="lg-btn lg-btn--primary cf-submit" type="submit" disabled={sending}>
                  <span className="lg-refract" aria-hidden="true" />
                  <span className="lg-edge" aria-hidden="true" />
                  <span className="lg-label">
                    {sending ? "Sending…" : "Send message"}
                    {!sending && <i className="ti ti-send arrow" aria-hidden="true" />}
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ========================= OPEN ROLES ========================= */}
      <section className={`section${rolesInView ? " is-inview" : ""}`} id="roles" ref={rolesSectionRef}>
        <div className="roles-head">
          <div className="rh-left">
            <span className="rh-eyebrow">
              Careers <span className="sep">/</span>{" "}
              <span className="live">
                <span className="pulse" /> 6 open
              </span>
            </span>
            <h2>Open roles</h2>
            <p className="rh-sub">We&rsquo;re a small team in Thimphu building for the world. Come build with us.</p>
          </div>
          <div className="roles-filter" id="rolesFilter" role="group" aria-label="Filter by department">
            {DEPT_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`rf-chip${activeFilter === f.key ? " is-active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label} <span className="n">{countFor(f.key)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`roles-grid${visibleCount === 0 ? " is-empty" : ""}`} id="rolesGrid">
          {ROLES.map((role, i) => {
            const hidden = activeFilter !== "all" && role.dept !== activeFilter;
            return (
              <Link
                key={role.title}
                ref={(el) => {
                  roleCardRefs.current[i] = el;
                }}
                className={`role dept-${role.dept}${hidden ? " is-hidden" : ""}`}
                href={`/careers/apply/${role.id}`}
                data-dept={role.dept}
                onPointerMove={handleRolePointerMove}
              >
                <span className="role-cover">
                  <span className="role-cover-img" />
                  <span className="role-cover-ico">
                    <i className={`ti ${role.icon}`} />
                  </span>
                  <span className="role-cover-scrim" />
                  <span className="role-badges">
                    <span className="role-dept">
                      <span className="d" /> {role.deptLabel}
                    </span>
                    {role.isNew && <span className="role-tag-new">New</span>}
                  </span>
                  <span className="role-overlay">
                    <span className="role-cta">
                      Apply now <i className="ti ti-arrow-up-right" />
                    </span>
                  </span>
                </span>
                <span className="role-content">
                  <span className="role-title">{role.title}</span>
                  <span className="role-excerpt">{role.excerpt}</span>
                  <span className="role-foot">
                    <span className="role-author">
                      <span className="role-avatar">
                        <i className={`ti ${role.icon}`} />
                      </span>
                      <span className="meta">
                        <b>{role.deptLabel}</b>
                        <span>{role.location}</span>
                      </span>
                    </span>
                    <span className="role-time">
                      {role.isNew ? <span className="new-dot" /> : <i className="ti ti-clock" />} {role.time}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
        <p className="roles-empty" id="rolesEmpty" style={{ display: visibleCount === 0 ? "block" : "none" }}>
          No open roles in this team right now.
        </p>

        <p className="roles-foot">
          Don&rsquo;t see your role? Tell us how you&rsquo;d help — <a href="mailto:careers@jaggle.ai">careers@jaggle.ai</a>
        </p>
      </section>

      <div className="scroll-hint" id="scrollHint" style={{ opacity: hintVisible ? 1 : 0 }}>
        Scroll to reveal
      </div>
    </main>
  );
}
