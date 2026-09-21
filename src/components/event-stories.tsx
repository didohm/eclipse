"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";

const ITEM_MS = 5000;
const SEEN_KEY = "eclipse-seen-stories";
const UNSEEN_RING = "linear-gradient(135deg, var(--coral), var(--teal), var(--gold))";

type StoryItem = { src: string; caption?: string };

function storyCover(event: ClubEvent): string {
  return event.primaryImage || event.images[0] || "";
}

function storyItems(event: ClubEvent): StoryItem[] {
  const images = event.images.length ? event.images : event.primaryImage ? [event.primaryImage] : [];
  return images.map((src, i) => ({
    src,
    caption: i === 0 && event.shortDescription ? event.shortDescription : undefined,
  }));
}

function readSeen(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/**
 * In-memory mirror of the seen set so every tab/subscriber stays in sync and
 * React reads through `useSyncExternalStore` — no setState-in-effect and no
 * hydration mismatch (the server snapshot is always the empty set).
 */
let seenCache: string[] = [];
const seenListeners = new Set<() => void>();

function refreshSeenCache(): string[] {
  const next = readSeen();
  seenCache = next;
  return next;
}

function subscribeSeen(callback: () => void) {
  seenListeners.add(callback);
  return () => {
    seenListeners.delete(callback);
  };
}

function getSeenSnapshot(): string[] {
  return seenCache;
}

/** Stable empty value returned during SSR and hydration. */
const EMPTY_SEEN: string[] = [];

function getServerSeenSnapshot(): string[] {
  return EMPTY_SEEN;
}

function writeSeen(ids: string[]) {
  seenCache = ids;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable — seen state simply won't persist */
  }
  seenListeners.forEach((listener) => listener());
}

function markSeen(id: string) {
  if (seenCache.includes(id)) return;
  writeSeen([...seenCache, id]);
}

/** Hydrate the seen set once on the client, before the first read. */
if (typeof window !== "undefined") refreshSeenCache();

export function EventStories({ events }: { events: ClubEvent[] }) {
  const stories = useMemo(() => events.filter((event) => storyCover(event)), [events]);
  const seen = useSyncExternalStore(subscribeSeen, getSeenSnapshot, getServerSeenSnapshot);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const open = useCallback(
    (idx: number) => {
      const story = stories[idx];
      if (!story) return;
      markSeen(story.id);
      setOpenIdx(idx);
    },
    [stories],
  );

  if (!stories.length) return null;

  return (
    <>
      <div className="event-stories" role="list" aria-label="Event stories">
        {stories.map((story, idx) => {
          const isSeen = seen.includes(story.id);
          return (
            <button
              key={story.id}
              type="button"
              role="listitem"
              onClick={() => open(idx)}
              aria-label={`Open story: ${story.title}`}
              className="group flex w-[64px] shrink-0 flex-col items-center gap-2.5 sm:w-[78px]"
            >
              <span
                className="rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105"
                style={{ background: isSeen ? "#CCCCCC" : UNSEEN_RING, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}
              >
                <span className="block rounded-full bg-white p-[2px]">
                  <span className="relative block h-[52px] w-[52px] overflow-hidden rounded-full sm:h-[60px] sm:w-[60px]">
                    <Image
                      src={storyCover(story)}
                      alt=""
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </span>
                </span>
              </span>
              <span
                className="w-full truncate text-center text-[11.5px] font-medium tracking-[-0.01em] sm:text-[13px]"
                style={{ color: isSeen ? "#CCCCCC" : "var(--ink)" }}
              >
                {story.title}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {openIdx !== null && stories[openIdx] && (
          <StoryViewer
            stories={stories}
            index={openIdx}
            onIndex={setOpenIdx}
            onClose={() => setOpenIdx(null)}
            onSeen={markSeen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function StoryViewer({
  stories,
  index,
  onIndex,
  onClose,
  onSeen,
}: {
  stories: ClubEvent[];
  index: number;
  onIndex: (idx: number) => void;
  onClose: () => void;
  onSeen: (id: string) => void;
}) {
  const story = stories[index];
  const items = useMemo(() => (story ? storyItems(story) : []), [story]);
  const [rawItemIdx, setItemIdx] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [holding, setHolding] = useState(false);

  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef(0);
  const totalRef = useRef(ITEM_MS);
  const remainingRef = useRef(ITEM_MS);
  const manualRef = useRef(false);
  const holdingRef = useRef(false);
  const itemIdxRef = useRef(0);
  const indexRef = useRef(index);

  // Refs must not be written during render — sync them here instead.
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const cancelCycle = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const advance = useCallback(() => {
    const s = stories[indexRef.current];
    if (!s) {
      onClose();
      return;
    }
    const count = storyItems(s).length;
    if (itemIdxRef.current < count - 1) {
      setItemIdx(itemIdxRef.current + 1);
      return;
    }
    if (indexRef.current < stories.length - 1) {
      const next = stories[indexRef.current + 1];
      if (next) onSeen(next.id);
      onIndex(indexRef.current + 1);
      setItemIdx(0);
      return;
    }
    onClose();
  }, [stories, onClose, onIndex, onSeen]);

  const runCycle = useCallback(
    (ms: number) => {
      cancelCycle();
      totalRef.current = ms;
      remainingRef.current = ms;
      startRef.current = Date.now();
      const current = itemIdxRef.current;
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.width = i < current ? "100%" : "0%";
      });
      const loop = () => {
        const p = Math.min(1, (Date.now() - startRef.current) / totalRef.current);
        const el = barRefs.current[itemIdxRef.current];
        if (el) el.style.width = `${p * 100}%`;
        if (p < 1) raf.current = requestAnimationFrame(loop);
      };
      raf.current = requestAnimationFrame(loop);
      timer.current = setTimeout(advance, ms);
    },
    [advance, cancelCycle],
  );

  const pauseCycle = useCallback(() => {
    remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current));
    cancelCycle();
  }, [cancelCycle]);

  // Reset to the first item when the story changes, and (re)start the cycle
  // whenever the story or item changes. The reset is derived from `index`
  // during render (clamped to a valid slot) rather than setState-in-effect.
  const storyCount = story?.images?.length ?? 0;
  const itemIdx = Math.min(rawItemIdx, Math.max(0, storyCount - 1));

  // Keep the cycle's item pointer in sync before the cycle restarts below,
  // so `runCycle` reads the current slot when it initialises the bars.
  useEffect(() => {
    itemIdxRef.current = itemIdx;
  }, [itemIdx]);

  useEffect(() => {
    runCycle(ITEM_MS);
    return cancelCycle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, itemIdx]);

  // lock body scroll + keyboard nav while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") {
        if (itemIdxRef.current > 0) {
          setItemIdx(itemIdxRef.current - 1);
        } else if (indexRef.current > 0) {
          onIndex(indexRef.current - 1);
          setItemIdx(0);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [advance, onClose, onIndex]);

  useEffect(() => () => {
    cancelCycle();
    if (holdTimer.current !== null) clearTimeout(holdTimer.current);
  }, [cancelCycle]);

  if (!story) return null;

  const toggleManual = () => {
    if (manualRef.current) {
      manualRef.current = false;
      setManualPaused(false);
      if (!holdingRef.current) {
        runCycle(remainingRef.current);
      }
    } else {
      manualRef.current = true;
      setManualPaused(true);
      pauseCycle();
    }
  };

  const holdStart = () => {
    if (holdTimer.current !== null) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      holdingRef.current = true;
      setHolding(true);
      pauseCycle();
    }, 200);
  };

  const holdEnd = (goNext: boolean) => {
    if (holdTimer.current !== null) clearTimeout(holdTimer.current);
    holdTimer.current = null;
    if (holdingRef.current) {
      holdingRef.current = false;
      setHolding(false);
      if (!manualRef.current) runCycle(remainingRef.current);
      return;
    }
    if (goNext) {
      advance();
    } else if (itemIdx > 0) {
      setItemIdx(itemIdx - 1);
    } else if (index > 0) {
      onIndex(index - 1);
      setItemIdx(0);
    }
  };

  const paused = manualPaused || holding;
  const activeItem = items[itemIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${story.title}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-xl md:p-5"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: holding ? 0.98 : 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0b0c] shadow-[0_24px_80px_rgba(0,0,0,0.55)] outline outline-white/10 max-md:rounded-none md:h-[92dvh] md:max-h-[860px] md:max-w-[400px] md:rounded-[32px]"
      >
        {/* media */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b0c]">
          {activeItem && (
            <Image
              key={`${story.id}-${itemIdx}`}
              src={activeItem.src}
              alt={`${story.title}, photo ${itemIdx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className={`object-cover story-zoom ${paused ? "story-zoom--paused" : ""}`}
            />
          )}
        </div>
        {/* scrims */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-60 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        {/* tap zones */}
        <div className="absolute inset-0 z-10 flex">
          <div
            role="button"
            aria-label="Previous"
            className="h-full w-1/3"
            onPointerDown={holdStart}
            onPointerUp={() => holdEnd(false)}
            onPointerCancel={() => holdEnd(false)}
          />
          <div
            role="button"
            aria-label="Next"
            className="h-full w-2/3"
            onPointerDown={holdStart}
            onPointerUp={() => holdEnd(true)}
            onPointerCancel={() => holdEnd(true)}
          />
        </div>

        {/* chrome */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-[18px] pt-[14px]">
          <div className="flex w-full flex-col gap-5 px-0.5">
            <div className="flex h-1 w-full gap-1.5">
              {items.map((_, i) => (
                <div key={i} className="h-full flex-1 overflow-hidden rounded-full bg-white/35">
                  <div
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                    style={{ width: i < itemIdx ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-0.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/15">
                  <Image src={storyCover(story)} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-col justify-center">
                  <span className="truncate text-[16px] font-medium tracking-[-0.02em] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.25)]">
                    {story.title}
                  </span>
                  <span className="mt-0.5 text-[14px] font-medium text-white/70">
                    {formatDate(story.date)}
                  </span>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleManual}
                  aria-label={manualPaused ? "Play" : "Pause"}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105"
                >
                  {manualPaused ? <Play size={20} aria-hidden="true" /> : <Pause size={20} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close story"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2.5 px-0.5">
            {activeItem?.caption && (
              <p className="pointer-events-none absolute right-5 bottom-[92px] left-5 line-clamp-2 text-[16px] leading-snug font-medium text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                {activeItem.caption}
              </p>
            )}
            <Link
              href={`/events/${story.slug}`}
              onClick={onClose}
              className="group relative flex h-12 flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white text-[16px] font-semibold tracking-[-0.02em] text-[var(--ink)] shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.02]"
              aria-label={`Read the full story: ${story.title}`}
            >
              <span aria-hidden="true" className="story-cta-shimmer" />
              <span>Read full story</span>
              <ArrowUpRight size={20} aria-hidden="true" className="opacity-70" />
            </Link>
          </div>
        </div>

        {/* desktop arrows */}
        <button
          type="button"
          onClick={() => holdEnd(false)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3.5 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 md:grid"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => holdEnd(true)}
          aria-label="Next slide"
          className="absolute top-1/2 right-3.5 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 md:grid"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}
