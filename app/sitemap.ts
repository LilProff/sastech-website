import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pillars } from "@/lib/content";
import { projects } from "@/lib/projects";
import { articles } from "@/lib/insights";

type Entry = { path: string; priority: number; freq: "weekly" | "monthly" | "yearly"; modified?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Entry[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    ...pillars.map((p) => ({ path: `/services/${p.slug}`, priority: 0.9, freq: "monthly" as const })),
    { path: "/portfolio", priority: 0.8, freq: "monthly" },
    ...projects.map((p) => ({ path: `/portfolio/${p.slug}`, priority: 0.7, freq: "monthly" as const })),
    { path: "/insights", priority: 0.7, freq: "weekly" },
    ...articles.map((a) => ({ path: `/insights/${a.slug}`, priority: 0.6, freq: "monthly" as const, modified: a.updated })),
    { path: "/process", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/events", priority: 0.5, freq: "weekly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: r.modified ? new Date(r.modified) : now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
