import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

const title = "Jaggle AI — Contact";
const description = "Get in touch with the Jaggle team — questions, demos, partnerships or press. Plus open roles: we're hiring across engineering, AI, design and go-to-market.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function ContactPage() {
  return <ContactClient />;
}
