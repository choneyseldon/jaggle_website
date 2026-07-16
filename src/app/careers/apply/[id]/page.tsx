import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoleById, type Role } from "@/data/roles";
import { JobApplyClient } from "./JobApplyClient";

type Params = { id: string };

function employmentTypeFor(role: Role): string {
  return role.location.includes("Internship") ? "INTERN" : "FULL_TIME";
}

function jobLocationFor(role: Role) {
  if (role.location.startsWith("Remote")) {
    return { jobLocationType: "TELECOMMUTE" as const };
  }
  const city = role.location.split("·")[0].trim();
  return {
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: "BT",
      },
    },
  };
}

function validThroughFor(datePosted: string): string {
  const d = new Date(`${datePosted}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 60);
  return d.toISOString().slice(0, 10);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const role = getRoleById(Number(id));
  if (!role) {
    return { title: "Jaggle AI — Careers" };
  }
  const title = `Jaggle AI — ${role.title}`;
  const description = role.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/careers/apply/${role.id}` },
    openGraph: { title, description, url: `/careers/apply/${role.id}`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function JobApplyPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const role = getRoleById(Number(id));
  if (!role) {
    notFound();
  }

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.about,
    datePosted: role.datePosted,
    validThrough: `${validThroughFor(role.datePosted)}T00:00:00Z`,
    employmentType: employmentTypeFor(role),
    hiringOrganization: {
      "@type": "Organization",
      name: "Jaggle AI",
      sameAs: "https://jaggle.ai",
    },
    ...jobLocationFor(role),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />
      <JobApplyClient role={role} />
    </>
  );
}
