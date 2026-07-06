"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How is Jaggle different from ClickUp or Notion?",
    a: "Jaggle is the only PM tool built around both AI-first execution and a GNH team-wellbeing layer. Most tools track tasks — Jaggle predicts risks and monitors sustainability so delivery never quietly burns out the team.",
  },
  {
    q: "What does GNH actually mean for my team day to day?",
    a: "A weekly read on balance, energy and growth sits beside delivery metrics. When someone trends toward overload, Jaggle suggests re-balancing work before it becomes attrition — no surveys required.",
  },
  {
    q: "Is my project data used to train AI models?",
    a: "No. Your workspace data is never used to train shared models. AI features run on your context in isolation, and you can disable AI per project at any time.",
  },
  {
    q: "Can I import from Jira or Asana?",
    a: "Yes. Import projects, issues and history from Jira, Asana and Trello in a few clicks, and keep two-way sync running during a phased migration.",
  },
  {
    q: "Is the free plan actually free, or a trial?",
    a: "Genuinely free, forever — up to 5 users and 3 projects with no credit card. The 14-day trial only applies if you want to test the paid Team features.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="sec" id="faq">
      <div className="sec-inner">
        <div className="sec-head center">
          <h2 className="sec-title">Questions, answered.</h2>
          <p className="sec-sub">Everything teams ask before switching to Jaggle.</p>
        </div>
        <div className="faq" id="faqList">
          {FAQS.map((item, i) => (
            <div className={`faq-item${open === i ? " open" : ""}`} key={item.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
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
  );
}
