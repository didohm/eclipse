import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getDb } from "@/lib/firebase-admin";
import type { ClubEvent, Leader } from "@/lib/types";

export { getDb };

/**
 * Cache tags. Tagged caches are invalidated from the admin API the moment
 * content changes (see `revalidateTag` in the admin routes), so the site
 * stays correct while public traffic never waits on Firestore.
 */
const EVENTS_TAG = "eclipse-events";
const LEADERS_TAG = "eclipse-leaders";

function dateValue(value: unknown) {
  if (typeof value === "string") return value.slice(0, 10);
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
  }
  return "";
}

/**
 * Cross-request cache. Public pages are mostly static content that changes
 * only through the admin panel, so a durable cache is the right default and
 * keeps Firestore out of the hot path for every visitor.
 */
export const getEvents = unstable_cache(
  async (): Promise<ClubEvent[]> => {
    const db = getDb();
    if (!db) return [];

    try {
      const snapshot = await db.collection("events").orderBy("date", "desc").get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: String(data.title ?? ""),
          shortDescription: String(data.shortDescription ?? ""),
          fullDescription: String(data.fullDescription ?? ""),
          date: dateValue(data.date),
          location: String(data.location ?? ""),
          images: Array.isArray(data.images) ? data.images.filter((image): image is string => typeof image === "string") : [],
          primaryImage: String(data.primaryImage ?? ""),
          slug: String(data.slug ?? ""),
        };
      });
    } catch {
      return [];
    }
  },
  ["events"],
  { tags: [EVENTS_TAG] },
);

export const getLeaders = unstable_cache(
  async (): Promise<Leader[]> => {
    const db = getDb();
    if (!db) return [];

    try {
      const snapshot = await db.collection("leaders").orderBy("createdAt", "asc").get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: String(data.name ?? ""),
          position: String(data.position ?? ""),
          photoUrl: String(data.photoUrl ?? ""),
          linkedinUrl: String(data.linkedinUrl ?? ""),
        };
      });
    } catch {
      return [];
    }
  },
  ["leaders"],
  { tags: [LEADERS_TAG] },
);

export const REVALIDATE_TAGS = {
  events: EVENTS_TAG,
  leaders: LEADERS_TAG,
} as const;

/**
 * Reads a single document directly. Used by `getEventBySlug` so an event page
 * never fetches the whole collection, and falls back to the cached list only
 * if the document is not found there.
 */
export const getEventBySlug = cache(async (slug: string) => {
  const db = getDb();
  if (db) {
    try {
      // The URL slug is not the document id (`title-<first6 of id>`), so look
      // the record up by its stored slug field — one document read instead of
      // the whole collection.
      const snapshot = await db.collection("events").where("slug", "==", slug).limit(1).get();
      const doc = snapshot.docs[0];
      const data = doc?.data();
      if (doc && data) {
        return {
          id: doc.id,
          title: String(data.title ?? ""),
          shortDescription: String(data.shortDescription ?? ""),
          fullDescription: String(data.fullDescription ?? ""),
          date: dateValue(data.date),
          location: String(data.location ?? ""),
          images: Array.isArray(data.images) ? data.images.filter((image): image is string => typeof image === "string") : [],
          primaryImage: String(data.primaryImage ?? ""),
          slug: String(data.slug ?? slug),
        };
      }
    } catch {
      /* fall through to the cached list */
    }
  }
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
});
