import { cache } from "react";
import { getDb } from "@/lib/firebase-admin";
import type { ClubEvent, Leader } from "@/lib/types";

function dateValue(value: unknown) {
  if (typeof value === "string") return value.slice(0, 10);
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
  }
  return "";
}

export const getEvents = cache(async (): Promise<ClubEvent[]> => {
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
});

export const getLeaders = cache(async (): Promise<Leader[]> => {
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
        bio: String(data.bio ?? ""),
        linkedinUrl: String(data.linkedinUrl ?? ""),
      };
    });
  } catch {
    return [];
  }
});

export const getEventBySlug = cache(async (slug: string) => {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
});
