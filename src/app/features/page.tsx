import type { Metadata } from "next";
import { FeaturesClient } from "./FeaturesClient";

const title = "Jaggle AI — Features";
const description =
  "Explore Jaggle's six modules: adaptive planning, AI agents for risk and prioritisation, auto-drafted docs, live reports, proactive risk monitoring, and the GNH wellbeing layer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/features" },
  openGraph: { title, description, url: "/features", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
