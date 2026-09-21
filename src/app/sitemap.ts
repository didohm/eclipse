import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";
import { site } from "@/lib/site";

function toDate(value: string): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const events = await getEvents();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...events
      .filter((event) => event.slug)
      .map((event) => ({
        url: `${site.url}/events/${event.slug}`,
        lastModified: event.date ? toDate(event.date) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
