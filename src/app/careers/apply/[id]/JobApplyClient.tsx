"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Role } from "@/data/roles";
import "../apply.css";

export function JobApplyClient({ role }: { role: Role }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setPhone("");
    setLinkedin("");
    setResumeName("");
    setCoverLetter("");
    setSent(false);
  };

  return (
    <main id="top" className="jd">
      <section className="section jd-hero">
        <div className="container">
          <Link className="jd-back" href="/contact#roles">
            <i className="ti ti-arrow-left" /> All open roles
          </Link>

          <div className="jd-head">
            <div className="jd-badges">
              <span className={`role-dept jd-dept jd-dept-${role.dept}`}>
                <span className="d" /> {role.deptLabel}
              </span>
              {role.isNew && <span className="role-tag-new">New</span>}
            </div>
            <h1>{role.title}</h1>
            <div className="jd-meta">
              <span>
                <i className="ti ti-map-pin" /> {role.location}
              </span>
              <span>
                {role.isNew ? <span className="new-dot" /> : <i className="ti ti-clock" />} Posted {role.time}
              </span>
            </div>
            <a className="lg-btn lg-btn--primary jd-apply-cta" href="#apply">
              <span className="lg-refract" aria-hidden="true" />
              <span className="lg-edge" aria-hidden="true" />
              <span className="lg-label">
                Apply for this role <i className="ti ti-arrow-down arrow" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="section jd-body">
        <div className="container jd-grid">
          <div className="jd-content">
            <div className="jd-block">
              <h2>About the role</h2>
              <p>{role.about}</p>
            </div>

            <div className="jd-block">
              <h2>What you&rsquo;ll do</h2>
              <ul className="jd-list">
                {role.responsibilities.map((item) => (
                  <li key={item}>
                    <i className="ti ti-check" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="jd-block">
              <h2>What we&rsquo;re looking for</h2>
              <ul className="jd-list">
                {role.requirements.map((item) => (
                  <li key={item}>
                    <i className="ti ti-check" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {role.niceToHave.length > 0 && (
              <div className="jd-block">
                <h2>Nice to have</h2>
                <ul className="jd-list jd-list--muted">
                  {role.niceToHave.map((item) => (
                    <li key={item}>
                      <i className="ti ti-plus" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="jd-foot-note">
              Don&rsquo;t tick every box? Apply anyway — we&rsquo;d rather hear from you at{" "}
              <a href="mailto:careers@jaggle.ai">careers@jaggle.ai</a>.
            </p>
          </div>

          <div className="jd-sidebar" id="apply">
            <form className="cform jd-form" onSubmit={handleSubmit}>
              <div className="winbar">
                <span className="dots">
                  <i /> <i /> <i />
                </span>
                <span className="name">apply.txt</span>
                <span className="live">
                  <span className="pulse" /> Encrypted
                </span>
              </div>

              {sent ? (
                <div className="cform-body cform-success">
                  <div className="cf-success-icon">
                    <i className="ti ti-circle-check" />
                  </div>
                  <h3>Application sent</h3>
                  <p>
                    Thanks, {name || "there"} — we&rsquo;ll review your application for {role.title} and get back within a week.
                  </p>
                  <button type="button" className="lg-btn" onClick={resetForm}>
                    <span className="lg-refract" aria-hidden="true" />
                    <span className="lg-edge" aria-hidden="true" />
                    <span className="lg-label">Submit another application</span>
                  </button>
                </div>
              ) : (
                <div className="cform-body">
                  <div className="cform-head">
                    <h3>Apply for this role</h3>
                    <p>{role.title}</p>
                  </div>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="jf-name">Full name</label>
                      <input
                        className="cf-input"
                        id="jf-name"
                        type="text"
                        placeholder="Jane Dorji"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="jf-email">Email</label>
                      <input
                        className="cf-input"
                        id="jf-email"
                        type="email"
                        placeholder="jane@email.com"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="jf-phone">
                        Phone <span className="jd-optional">(optional)</span>
                      </label>
                      <input
                        className="cf-input"
                        id="jf-phone"
                        type="tel"
                        placeholder="+975 17 123 456"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="jf-linkedin">
                        LinkedIn / portfolio <span className="jd-optional">(optional)</span>
                      </label>
                      <input
                        className="cf-input"
                        id="jf-linkedin"
                        type="url"
                        placeholder="https://"
                        autoComplete="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="cf-field">
                    <label htmlFor="jf-resume">Resume / CV</label>
                    <label className="jd-file" htmlFor="jf-resume">
                      <i className="ti ti-paperclip" />
                      {resumeName || "Choose a file (PDF, DOC)"}
                    </label>
                    <input
                      id="jf-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="jd-file-input"
                      required
                      onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
                    />
                  </div>
                  <div className="cf-field">
                    <label htmlFor="jf-cover">
                      Cover letter <span className="jd-optional">(optional)</span>
                    </label>
                    <textarea
                      className="cf-textarea"
                      id="jf-cover"
                      placeholder="Tell us why you'd be a good fit…"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>
                  <button className="lg-btn lg-btn--primary cf-submit" type="submit" disabled={sending}>
                    <span className="lg-refract" aria-hidden="true" />
                    <span className="lg-edge" aria-hidden="true" />
                    <span className="lg-label">
                      {sending ? "Submitting…" : "Submit application"}
                      {!sending && <i className="ti ti-send arrow" aria-hidden="true" />}
                    </span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
