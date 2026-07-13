export type RoleDept = "eng" | "ai" | "design" | "gtm";

export type Role = {
  id: number;
  dept: RoleDept;
  deptLabel: string;
  icon: string;
  isNew: boolean;
  title: string;
  excerpt: string;
  location: string;
  time: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export const ROLES: Role[] = [
  {
    id: 1,
    dept: "eng",
    deptLabel: "Engineering",
    icon: "ti-code",
    isNew: true,
    title: "Senior Frontend Engineer",
    excerpt: "Own our React design system and craft the glassy, motion-rich surfaces our users live in every day.",
    location: "Thimphu · Hybrid · Full-time",
    time: "2d ago",
    about:
      "You'll own the design system and surfaces that every Jaggle user lives in — the planning boards, AI report views and the GNH wellbeing layer. We're a small team, so you'll ship end to end: from a Figma frame to a production component used across the whole app, with a real say in the interaction and motion language.",
    responsibilities: [
      "Build and maintain our shared React component library, including the liquid-glass design system",
      "Turn product and design specs into fast, accessible, responsive UI",
      "Own frontend performance — bundle size, rendering, animation smoothness",
      "Pair with design on interaction details: motion, empty states, edge cases",
      "Mentor newer engineers on frontend architecture and code quality",
    ],
    requirements: [
      "5+ years building production UI with React and TypeScript",
      "Deep CSS skills — layout, animation, responsive design without a component library crutch",
      "Experience owning a design system or shared component library",
      "Comfortable working directly with designers and shipping fast in a small team",
      "Care about accessibility and performance, not just visual polish",
    ],
    niceToHave: ["Experience with Next.js App Router", "Familiarity with WebGL/Three.js for background/visual effects", "Prior startup experience"],
  },
  {
    id: 2,
    dept: "ai",
    deptLabel: "AI",
    icon: "ti-sparkles",
    isNew: true,
    title: "ML Engineer — LLM & Agents",
    excerpt: "Build the agents behind predictive risk, task prioritisation and auto-drafted docs.",
    location: "Remote · Full-time",
    time: "4d ago",
    about:
      "Jaggle's AI layer is what turns a plain project tracker into something that actually thinks alongside the team — predicting risk before it becomes a fire drill, prioritising the next task, drafting the PRD nobody wanted to write. You'll design and ship the agents behind that layer, end to end.",
    responsibilities: [
      "Design and build LLM-powered agents for risk prediction, prioritisation and document drafting",
      "Own the prompting, evaluation and fine-tuning pipeline for our agent workflows",
      "Work with product to define what 'good' looks like for each agent, then measure against it",
      "Build the infrastructure for reliable, observable agent execution in production",
      "Keep latency and cost in check without sacrificing output quality",
    ],
    requirements: [
      "Experience building production systems on top of LLMs (OpenAI, Anthropic, or open-weight models)",
      "Strong Python skills and comfort with modern ML/LLM tooling",
      "Track record of shipping and iterating on agentic or RAG-based systems",
      "Able to reason about evaluation — how do you know an agent got better, not just different",
      "Comfortable working remotely and asynchronously with a Bhutan-based team",
    ],
    niceToHave: ["Experience with vector databases and retrieval pipelines", "Published research or writing on LLM agents", "Experience with workflow/orchestration frameworks"],
  },
  {
    id: 3,
    dept: "design",
    deptLabel: "Design",
    icon: "ti-pencil",
    isNew: false,
    title: "Product Designer (UI/UX)",
    excerpt: "Shape end-to-end flows for planning, reports and our GNH wellbeing layer.",
    location: "Thimphu · Full-time",
    time: "1w ago",
    about:
      "You'll shape how teams plan, report and check in on their own wellbeing inside Jaggle — end-to-end flows, not just screens. Bhutan's Gross National Happiness philosophy is genuinely baked into the product, and you'll help make that feel real rather than decorative.",
    responsibilities: [
      "Design end-to-end flows across planning, AI reports and the GNH wellbeing layer",
      "Maintain and extend our liquid-glass visual design system in Figma",
      "Run lightweight user research and usability sessions to validate direction",
      "Partner closely with engineering to make sure what ships matches the intent",
      "Help define the interaction and motion language for new surfaces",
    ],
    requirements: [
      "3+ years of product design experience, ideally on a B2B SaaS product",
      "A portfolio showing end-to-end flows, not just polished individual screens",
      "Strong craft in Figma — components, variants, auto-layout",
      "Comfortable presenting and defending design decisions with reasoning, not just taste",
      "Genuine interest in wellbeing/human-centred product design",
    ],
    niceToHave: ["Experience designing data-dense dashboards or reporting tools", "Basic HTML/CSS fluency to prototype in code", "Illustration or motion design skills"],
  },
  {
    id: 4,
    dept: "eng",
    deptLabel: "Engineering",
    icon: "ti-server-2",
    isNew: false,
    title: "Backend Engineer",
    excerpt: "Design the realtime APIs and data models powering every Jaggle workspace.",
    location: "Thimphu · Hybrid · Full-time",
    time: "1w ago",
    about:
      "Every Jaggle workspace — its boards, timelines, AI agent runs and reports — is backed by the APIs and data models you'll help design. We're still early enough that core architecture decisions are open, and you'll have real ownership over how the backend scales as teams grow.",
    responsibilities: [
      "Design and build the realtime APIs powering planning, docs and reporting features",
      "Own core data models as the product surface area grows",
      "Build the infrastructure that AI agents read from and write to safely",
      "Improve reliability, observability and performance of core services",
      "Work closely with frontend and AI engineers to ship full features, not just endpoints",
    ],
    requirements: [
      "4+ years building production backend systems at scale",
      "Strong fundamentals in API design, data modelling and databases",
      "Experience with realtime systems (websockets, pub/sub, or similar)",
      "Comfortable owning a service from design through on-call",
      "Pragmatic about tradeoffs — we're a small team, not everything needs to be perfect",
    ],
    niceToHave: ["Experience with Postgres at scale", "Experience integrating LLM/agent workloads into backend systems", "Prior experience at an early-stage startup"],
  },
  {
    id: 5,
    dept: "gtm",
    deptLabel: "Go-to-market",
    icon: "ti-chart-line",
    isNew: false,
    title: "Founding Account Executive",
    excerpt: "Take Jaggle to teams across the region as our first dedicated seller.",
    location: "Thimphu · Full-time",
    time: "2w ago",
    about:
      "You'll be the first dedicated seller at Jaggle, taking the product to teams across the region who are done burning people out to hit deadlines. There's no existing playbook to inherit — you'll help write it, working directly with the founders on positioning, pricing conversations and early customer relationships.",
    responsibilities: [
      "Own the full sales cycle from first conversation to close",
      "Build and refine our early sales playbook and pricing conversations",
      "Work directly with founders on positioning and ideal customer profile",
      "Represent customer feedback back into product and roadmap discussions",
      "Help build repeatable outbound and demo processes as the team grows",
    ],
    requirements: [
      "3+ years of closing experience in B2B SaaS sales",
      "Comfortable being the first seller — building process, not just following one",
      "Strong communicator who can run a great product demo",
      "Genuine interest in project management and team wellbeing as a category",
      "Based in or willing to work from Thimphu",
    ],
    niceToHave: ["Experience selling into PM/collaboration tools categories", "Existing network across regional startups or enterprises", "Experience at a founding/early sales hire stage before"],
  },
  {
    id: 6,
    dept: "eng",
    deptLabel: "Engineering",
    icon: "ti-code",
    isNew: true,
    title: "Frontend Intern",
    excerpt: "Learn alongside our team shipping real UI to production from day one.",
    location: "Thimphu · Internship",
    time: "Just posted",
    about:
      "You'll ship real UI to production from your first week, not just shadow the team. This is a hands-on internship for someone who wants to learn modern frontend engineering by actually building the surfaces thousands of people will use — with real code review and mentorship along the way.",
    responsibilities: [
      "Build UI components and features under the guidance of senior engineers",
      "Fix bugs and polish details across the app",
      "Participate in code review — both giving and receiving feedback",
      "Learn our design system and contribute new components as needed",
      "Pair with design and product on smaller, well-scoped features",
    ],
    requirements: [
      "Solid fundamentals in HTML, CSS and JavaScript",
      "Some exposure to React, even from personal projects or coursework",
      "Eagerness to learn and take feedback well",
      "Based in or able to work from Thimphu",
      "Available for a full-time internship (duration flexible, discussed on application)",
    ],
    niceToHave: ["Personal projects or a GitHub profile you're proud of", "Exposure to TypeScript", "Coursework or self-study in computer science fundamentals"],
  },
];

export const DEPT_FILTERS: { key: "all" | RoleDept; label: string }[] = [
  { key: "all", label: "All" },
  { key: "eng", label: "Engineering" },
  { key: "ai", label: "AI" },
  { key: "design", label: "Design" },
  { key: "gtm", label: "Go-to-market" },
];

export function getRoleById(id: number): Role | undefined {
  return ROLES.find((r) => r.id === id);
}
