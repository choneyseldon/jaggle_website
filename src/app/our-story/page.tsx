import type { Metadata } from "next";
import Image from "next/image";
import { LiquidButton } from "@/components/site/LiquidButton";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { AwardsSection } from "./AwardsRail";
import "./our-story.css";

export const metadata: Metadata = {
  title: "Jaggle AI — About",
};

const STATS = [
  { count: 31, suffix: "%", label: "Higher Productivity", desc: "Teams with high wellbeing consistently outperform stressed teams, delivering faster without compromising quality." },
  { count: 42, suffix: "%", label: "Lower Turnover", desc: "Reduced attrition means keeping experienced talent and avoiding costly rehiring." },
  { count: 12, suffix: "K+", label: "Hours Saved Through Automation", desc: "Helping organizations automate repetitive processes and focus on strategic work." },
  { count: 3, suffix: "×", label: "More Creative Solutions", desc: "Empowering teams to innovate, collaborate, and solve complex problems more effectively." },
];

const LEADS = [
  { name: "Jigme Tashi Namgayal", role: "Chief Executive Officer", socials: ["linkedin", "x", "mail"] as const },
  { name: "Lhatul Wangmo", role: "Chief Product Officer", socials: ["linkedin", "x", "mail"] as const },
  { name: "Tashi Tobgay Drakpa", role: "Co-Chief Technology Officer", socials: ["linkedin", "github", "mail"] as const },
  { name: "Sangay Wangchuk", role: "Co-Chief Technology Officer", socials: ["linkedin", "github", "mail"] as const },
];

const BUILDERS = [
  { name: "Dorji Tshering", role: "Frontend Engineer", socials: ["linkedin", "github"] as const },
  { name: "Chojay Wangchuk", role: "Fullstack Engineer", socials: ["linkedin", "github"] as const },
  { name: "Ngawang Delma", role: "UX Engineer", socials: ["linkedin", "dribbble"] as const },
  { name: "Ugyen Jigme Rangdrel", role: "ML Engineer", socials: ["linkedin", "github"] as const },
];

const SOCIAL_ICON: Record<string, string> = {
  linkedin: "ti-brand-linkedin",
  x: "ti-brand-x",
  github: "ti-brand-github",
  dribbble: "ti-brand-dribbble",
  mail: "ti-mail",
};

const BENTO_TILES = [
  { label: "GSEA", cap: "Global Student Entrepreneur Awards", key: "On the world stage", classes: "t-wide t-tall", delay: undefined },
  { label: "K-Startup", cap: "K-Startup Grand Challenge", key: "Seoul, South Korea", classes: "", delay: 1 as const },
  { label: "Startup Bhutan", cap: "Startup Bhutan", key: "Home ground", classes: "", delay: 2 as const },
  { label: "Team collaboration", cap: "Team Collaboration", key: "Everyday work", classes: "t-wide", delay: 1 as const },
  { label: "Workshops", cap: "Innovation Workshops", key: null, classes: "", delay: 2 as const },
  { label: "Dev sessions", cap: "Product Development Sessions", key: null, classes: "", delay: 3 as const },
  { label: "Conferences", cap: "Conference Participation", key: null, classes: "", delay: 1 as const },
  { label: "Office culture", cap: "Office Culture", key: "Thimphu HQ", classes: "", delay: 2 as const },
];

export default function OurStoryPage() {
  return (
    <main id="top">
      {/* SECTION 1 — HERO */}
      <header className="about-hero" data-screen-label="Hero">
        <div className="about-hero-inner">
          <div className="ah-copy">
            <span className="eyebrow">
              <span className="pill">ABOUT</span> Bhutan-born · globally minded
            </span>
            <h1>
              We&apos;re Here to Help You <em>Thrive</em>
            </h1>
            <p className="lede">
              We champion AI-driven automation and are reshaping how organizations think about productivity, collaboration, and operational efficiency through intelligent project management.
            </p>
            <div className="ah-cta">
              <LiquidButton href="/#cta" variant="primary" size="lg">
                Get Started <i className="ti ti-arrow-right arrow" />
              </LiquidButton>
              <LiquidButton href="/request-demo" size="lg">
                <i className="ti ti-player-play" /> Request Demo
              </LiquidButton>
            </div>
            <div className="ah-meta">
              <div className="ah-meta-item">
                <span className="ahm-n">2023</span>
                <span className="ahm-l">Founded in Thimphu</span>
              </div>
              <span className="ah-meta-div" aria-hidden="true" />
              <div className="ah-meta-item">
                <span className="ahm-n">8+</span>
                <span className="ahm-l">Global recognitions</span>
              </div>
              <span className="ah-meta-div" aria-hidden="true" />
              <div className="ah-meta-item">
                <span className="ahm-n">100%</span>
                <span className="ahm-l">Founder-led team</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2 — COMPANY STORY */}
      <section className="sec" data-screen-label="Company Story">
        <div className="sec-inner">
          <div className="story-grid">
            <Reveal as="div" className="story-img">
              <div className="ph">
                <Image
                  src="/images/story-startup-weekend.png"
                  alt="Jaggle AI team receiving the BTN 500,000 award at National Startup Weekend 2025, Thimphu"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="story-badge glass-card">
                <div className="sb-n">2023</div>
                <div className="sb-l">Founded in Thimphu, building for teams worldwide</div>
              </div>
            </Reveal>
            <Reveal as="div" delay={1} className="story-copy">
              <p className="sec-eyebrow">Our story</p>
              <h2>Building the Future of AI-Powered Work</h2>
              <p>
                Jaggle AI was founded with a vision to transform project management through intelligent automation. We help governments, enterprises, startups, and teams eliminate repetitive work, improve operational efficiency, and make smarter decisions through AI-powered workflows.
              </p>
              <p>
                Our platform combines project management, automation, collaboration, and artificial intelligence into a single experience that enables teams to focus on meaningful work and lasting impact.
              </p>
              <p className="story-quote">
                <span className="qmark">&ldquo;</span>Project success is more than tasks and deadlines. It&apos;s about people, meaningful outcomes, and sustainable growth.<span className="qmark">&rdquo;</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 — IMPACT IN NUMBERS */}
      <section className="sec impact" data-screen-label="Impact in Numbers">
        <div className="sec-inner">
          <div className="sec-head">
            <p className="sec-eyebrow">By the numbers</p>
            <h2 className="sec-title">Our Impact in Numbers</h2>
          </div>
          <div className="impact-ledger">
            {STATS.map((stat, i) => (
              <Reveal as="div" key={stat.label} delay={i > 0 ? (i as 1 | 2 | 3) : undefined} className="stat">
                <CountUp className="num" target={stat.count} suffix={stat.suffix} />
                <div className="stat-idx">{String(i + 1).padStart(2, "0")}</div>
                <div className="stat-body">
                  <div className="stat-label">{stat.label}</div>
                  <p className="stat-desc">{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="impact-foot">* Indicative figures — replace with your verified metrics.</p>
        </div>
      </section>

      {/* SECTION 4 — AWARDS & RECOGNITION */}
      <AwardsSection />

      {/* SECTION 5 — MEET THE TEAM */}
      <section className="sec" data-screen-label="Meet the Team">
        <div className="sec-inner">
          <div className="sec-head center">
            <p className="sec-eyebrow">The people</p>
            <h2 className="sec-title">Meet the Team Behind Jaggle AI</h2>
            <p className="sec-sub">
              A founder-led team building from Thimphu for organizations everywhere — engineers, designers and operators obsessed with better work.
            </p>
          </div>

          <div className="lead-grid">
            {LEADS.map((person, i) => (
              <Reveal as="article" key={person.name} delay={i > 0 ? (i as 1 | 2 | 3) : undefined} className="person lead">
                <div className="ph">
                  <span className="ph-label">
                    <i className="ti ti-user" /> Portrait
                  </span>
                </div>
                <div className="person-body">
                  <h4>{person.name}</h4>
                  <span className="role grad">{person.role}</span>
                  <div className="person-social">
                    {person.socials.map((s) => (
                      <a href="#" aria-label={s} key={s}>
                        <i className={`ti ${SOCIAL_ICON[s]}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="team-divider">
            <span>The builders</span>
          </div>

          <div className="team-grid">
            {BUILDERS.map((person, i) => (
              <Reveal as="article" key={person.name} delay={i > 0 ? (i as 1 | 2 | 3) : undefined} className="person mini">
                <div className="ph">
                  <span className="ph-label">
                    <i className="ti ti-user" /> Photo
                  </span>
                </div>
                <div className="person-body">
                  <h4>{person.name}</h4>
                  <span className="role">{person.role}</span>
                  <div className="person-social">
                    {person.socials.map((s) => (
                      <a href="#" aria-label={s} key={s}>
                        <i className={`ti ${SOCIAL_ICON[s]}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — LIFE AT JAGGLE */}
      <section className="sec" data-screen-label="Life at Jaggle">
        <div className="sec-inner">
          <div className="sec-head">
            <p className="sec-eyebrow">Behind the scenes</p>
            <h2 className="sec-title">Life at Jaggle AI</h2>
            <p className="sec-sub">Moments that define us — from global innovation events to everyday collaboration.</p>
          </div>
          <div className="bento">
            {BENTO_TILES.map((tile) => (
              <Reveal as="div" key={tile.label} delay={tile.delay} className={`tile ${tile.classes}`.trim()}>
                <div className="ph">
                  <span className="ph-label">
                    <i className="ti ti-photo" /> {tile.label}
                  </span>
                </div>
                <span className="cap">
                  {tile.cap}
                  {tile.key && <span className="k">{tile.key}</span>}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="final" id="cta" data-screen-label="Final CTA">
        <Reveal as="div" className="final-panel">
          <span className="eyebrow">
            <span className="pill">GET STARTED</span> Free forever plan
          </span>
          <h2>Join the Teams Building Better Work</h2>
          <p>Discover how AI-powered project management can help your organization automate workflows, improve collaboration, and achieve meaningful outcomes faster.</p>
          <div className="final-cta">
            <LiquidButton href="/#cta" variant="primary" size="lg">
              Get Started Free <i className="ti ti-arrow-right arrow" />
            </LiquidButton>
            <LiquidButton href="/request-demo" size="lg">
              <i className="ti ti-player-play" /> Request Demo
            </LiquidButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
