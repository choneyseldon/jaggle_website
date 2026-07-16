import type { Metadata } from "next";
import { RequestDemoClient } from "./RequestDemoClient";
import "./request-demo.css";

const title = "Jaggle AI — Request a Demo";
const description = "Book a guided 30-minute walkthrough of Jaggle, tailored to your team — planning, AI agents, reports and the GNH wellbeing layer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/request-demo" },
  openGraph: { title, description, url: "/request-demo", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function RequestDemoPage() {
  return <RequestDemoClient />;
}
