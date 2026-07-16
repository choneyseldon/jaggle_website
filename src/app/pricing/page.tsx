import type { Metadata } from "next";
import { PricingClient } from "./PricingClient";

const title = "Jaggle AI — Pricing";
const description = "Simple, fair pricing for teams of any size. Start free, scale when it pays off — pay globally in USD or locally in Ngultrum via MBOB.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description, url: "/pricing", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function PricingPage() {
  return <PricingClient />;
}
