import type { MetadataRoute } from "next";
import { ROLES } from "@/data/roles";

const BASE_URL = "https://jaggle.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/request-demo`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const jobRoutes: MetadataRoute.Sitemap = ROLES.map((role) => ({
    url: `${BASE_URL}/careers/apply/${role.id}`,
    lastModified: role.datePosted,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...jobRoutes];
}
