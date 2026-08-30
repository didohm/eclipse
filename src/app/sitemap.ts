import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";
import { site } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const events = await getEvents(); return [{ url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: .8 }, { url: `${site.url}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: .9 }, { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: .7 }, ...events.map((event) => ({ url: `${site.url}/events/${event.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 }))]; }
