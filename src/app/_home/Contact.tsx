"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
  };

  return (
    <section className="sec" id="contact">
      <div className="sec-inner">
        <div className="sec-head center">
          <h2 className="sec-title">Let&rsquo;s talk.</h2>
          <p className="sec-sub">Questions, a demo, or a partnership in mind? Reach the team in Thimphu — we reply within one business day.</p>
        </div>

        <div className="contact-grid">
          <aside className="contact-aside">
            <p className="contact-lead">Built in Bhutan, here for your team.</p>
            <p className="contact-sub">
              Whether you&rsquo;re a two-person startup or a national agency, we&rsquo;ll help you get set up — and onboard your
              team for free.
            </p>
            <div className="contact-channels">
              <a className="channel" href="mailto:hello@jaggle.ai">
                <span className="ci">
                  <i className="ti ti-mail" />
                </span>
                <span className="cm">
                  <span className="ck">Email us</span>
                  <span className="cv">hello@jaggle.ai</span>
                </span>
              </a>
              <a className="channel" href="mailto:sales@jaggle.ai">
                <span className="ci">
                  <i className="ti ti-headset" />
                </span>
                <span className="cm">
                  <span className="ck">Sales &amp; demos</span>
                  <span className="cv">sales@jaggle.ai</span>
                </span>
              </a>
              <div className="channel">
                <span className="ci">
                  <i className="ti ti-map-pin" />
                </span>
                <span className="cm">
                  <span className="ck">Visit</span>
                  <span className="cv">
                    Thimphu, Bhutan <small>· GMT+6</small>
                  </span>
                </span>
              </div>
            </div>
          </aside>

          <form className={`contact-form${sent ? " is-sent" : ""}`} id="contactForm" noValidate onSubmit={onSubmit}>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Work email</label>
                <input id="cf-email" name="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" name="company" type="text" placeholder="Company name" />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-topic">I&rsquo;m here about</label>
                <select id="cf-topic" name="topic" defaultValue="Booking a demo">
                  <option>Booking a demo</option>
                  <option>Pricing &amp; plans</option>
                  <option>Partnerships</option>
                  <option>Support</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" name="message" placeholder="Tell us a little about your team and what you're looking for…" required />
            </div>
            <div className="cf-foot">
              <span className="cf-note">
                <i className="ti ti-lock" /> We&rsquo;ll never share your details.
              </span>
              <button className="lg-btn lg-btn--primary" type="submit">
                <span className="lg-refract" aria-hidden="true" />
                <span className="lg-edge" aria-hidden="true" />
                <span className="lg-label">
                  Send message <i className="ti ti-send arrow" />
                </span>
              </button>
            </div>
            <div className="cf-success" aria-live="polite">
              <span className="si">
                <i className="ti ti-check" />
              </span>
              <h4>Message sent</h4>
              <p>Thanks for reaching out — we&rsquo;ll get back to you within one business day.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
