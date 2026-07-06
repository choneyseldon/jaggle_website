import Link from "next/link";

type MegaCardData = {
  href: string;
  icon: string;
  title: string;
  sub: string;
  spec: string;
  desc: string;
  dotsOn: number;
  dotsTotal: number;
  preview: React.ReactNode;
};

const CARDS: MegaCardData[] = [
  {
    href: "/features#plan",
    icon: "ti-layout-board",
    title: "Plan",
    sub: "Adaptive kanban & timelines",
    spec: "5 surfaces",
    desc: "Sprint planning, capacity scheduling, milestones, calendar and adaptive timelines — guided by team wellbeing signals.",
    dotsOn: 5,
    dotsTotal: 5,
    preview: (
      <div className="stage stage--plan" aria-hidden="true">
        <div className="kan-col">
          <div className="kan-h">
            To do <span className="n">4</span>
          </div>
          <div className="kan-card" />
          <div className="kan-card" />
          <div className="kan-card" />
        </div>
        <div className="kan-col">
          <div className="kan-h">
            Doing <span className="n">2</span>
          </div>
          <div className="kan-card" />
          <div className="kan-card" />
          <div className="kan-card" />
        </div>
        <div className="kan-col">
          <div className="kan-h">
            Done <span className="n">7</span>
          </div>
          <div className="kan-card" />
          <div className="kan-card" />
          <div className="kan-card" />
        </div>
        <div className="kan-track">
          <div className="kan-card lead" />
        </div>
      </div>
    ),
  },
  {
    href: "/features#ai-agents",
    icon: "ti-brain",
    title: "AI agents",
    sub: "Predictive risk, prioritisation, automations",
    spec: "6 agents",
    desc: "Predictive risk, task prioritisation, workflow automation, narrative reports and doc drafting.",
    dotsOn: 3,
    dotsTotal: 6,
    preview: (
      <div className="stage stage--ai" aria-hidden="true">
        <span className="chip">
          <span className="dot" /> Processing
        </span>
        <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid meet">
          <g className="edges" strokeLinecap="round">
            <line className="edge" x1="40" y1="80" x2="120" y2="40" />
            <line className="edge" x1="40" y1="80" x2="120" y2="80" />
            <line className="edge" x1="40" y1="80" x2="120" y2="120" />
            <line className="edge" x1="120" y1="40" x2="200" y2="60" />
            <line className="edge" x1="120" y1="80" x2="200" y2="60" />
            <line className="edge" x1="120" y1="80" x2="200" y2="100" />
            <line className="edge" x1="120" y1="120" x2="200" y2="100" />
            <line className="edge" x1="200" y1="60" x2="280" y2="80" />
            <line className="edge" x1="200" y1="100" x2="280" y2="80" />
          </g>
          <circle className="node" cx="40" cy="80" r="5" fill="#6E8CFF" />
          <circle className="node" cx="120" cy="40" r="4" fill="#9A8AFF" />
          <circle className="node" cx="120" cy="80" r="4" fill="#9A8AFF" />
          <circle className="node" cx="120" cy="120" r="4" fill="#9A8AFF" />
          <circle className="node" cx="200" cy="60" r="4" fill="#B080FF" />
          <circle className="node" cx="200" cy="100" r="4" fill="#B080FF" />
          <circle className="node" cx="280" cy="80" r="5" fill="#B080FF" />
        </svg>
      </div>
    ),
  },
  {
    href: "/features#docs",
    icon: "ti-file-text",
    title: "Docs",
    sub: "PRDs, retros & research, written for you",
    spec: "4 templates",
    desc: "PRDs, user stories, sprint retros, research summaries. Generated from your workspace context.",
    dotsOn: 2,
    dotsTotal: 5,
    preview: (
      <div className="stage stage--docs" aria-hidden="true">
        <span className="chip">
          <span className="dot" /> Generating…
        </span>
        <div className="doc-line l1" />
        <div className="doc-line l2" />
        <div className="doc-line l3" />
        <div className="doc-line l4" />
        <div className="doc-cursor-wrap">
          PRD · v0.3 <span className="doc-cursor" />
        </div>
      </div>
    ),
  },
  {
    href: "/features#reports",
    icon: "ti-chart-histogram",
    title: "Reports",
    sub: "Live dashboards & narrative summaries",
    spec: "unlimited",
    desc: "Live dashboards, financial insights, project overviews and narrative summaries that read themselves.",
    dotsOn: 4,
    dotsTotal: 5,
    preview: (
      <div className="stage stage--reports" aria-hidden="true">
        <span className="chip">
          <span className="dot" /> Live
        </span>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    ),
  },
  {
    href: "/features#risks",
    icon: "ti-alert-triangle",
    title: "Risks",
    sub: "Proactive monitoring & mitigation",
    spec: "real-time",
    desc: "Real-time monitoring of timelines, dependencies and workload. Mitigation surfaced early.",
    dotsOn: 2,
    dotsTotal: 5,
    preview: (
      <div className="stage stage--risk" aria-hidden="true">
        <span className="alert" />
        <span className="chip warn">
          <span className="dot" /> Monitoring
        </span>
        <div className="gauge">
          <svg viewBox="0 0 100 56">
            <defs>
              <linearGradient id="gaugeG" x1="0" x2="1">
                <stop offset="0" stopColor="#2ecc71" />
                <stop offset=".5" stopColor="#f5c542" />
                <stop offset="1" stopColor="#ff5a5f" />
              </linearGradient>
            </defs>
            <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" strokeLinecap="round" />
            <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="url(#gaugeG)" strokeWidth="6" strokeLinecap="round" />
            <g className="needle">
              <line x1="50" y1="46" x2="50" y2="14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="50" cy="46" r="3" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    ),
  },
  {
    href: "/features#gnh",
    icon: "ti-heart-handshake",
    title: "GNH",
    sub: "Wellbeing scores, built in",
    spec: "4 signals",
    desc: "Balance, purpose, energy and growth — Bhutan's GNH philosophy built into every sprint, not bolted on.",
    dotsOn: 5,
    dotsTotal: 5,
    preview: (
      <div className="stage stage--gnh" aria-hidden="true">
        <div className="gnh-row">
          <span>Balance</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="num">82</span>
        </div>
        <div className="gnh-row">
          <span>Purpose</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="num">64</span>
        </div>
        <div className="gnh-row">
          <span>Energy</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="num">91</span>
        </div>
        <div className="gnh-row">
          <span>Growth</span>
          <div className="track">
            <div className="fill" />
          </div>
          <span className="num">73</span>
        </div>
      </div>
    ),
  },
];

type MegaMenuProps = {
  id: string;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

export function MegaMenu({ id, open, onEnter, onLeave }: MegaMenuProps) {
  return (
    <div
      className={`mega${open ? " is-open" : ""}`}
      id={id}
      role="region"
      aria-label="Features"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="mega-head">
        <span className="lbl">/ Features · 6 modules</span>
        <Link className="all" href="/features#features">
          View all <i className="ti ti-arrow-right" style={{ fontSize: 13 }} />
        </Link>
      </div>
      <div className="mega-list">
        {CARDS.map((card) => (
          <Link className="mega-card" href={card.href} key={card.title}>
            <div className="top">
              <span className="head">
                <span className="ico">
                  <i className={`ti ${card.icon}`} />
                </span>
                <span className="title">
                  {card.title} <span className="sub">{card.sub}</span>
                </span>
              </span>
              <span className="spec">
                / <b>{card.spec}</b>
              </span>
            </div>
            <p className="desc">{card.desc}</p>
            <div className="meta">
              <div className="dots">
                {Array.from({ length: card.dotsTotal }).map((_, i) => (
                  <i key={i} className={i < card.dotsOn ? "on" : ""} />
                ))}
              </div>
              <span className="arrow">
                <i className="ti ti-arrow-right" />
              </span>
            </div>
            <div className="preview">{card.preview}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
