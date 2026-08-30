"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EmptyMedia } from "@/components/empty-media";

export function EventGallery({ title, images }: { title: string; images: string[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  if (!images.length) return <EmptyMedia label="Event gallery" className="event-gallery__empty" />;
  const next = () => setActive((index) => (index + 1) % images.length);
  const previous = () => setActive((index) => (index - 1 + images.length) % images.length);
  return <section className="event-gallery" aria-label={`${title} gallery`}>
    <div className="event-gallery__main">
      <AnimatePresence mode="wait">
        <motion.div key={images[active]} className="event-gallery__image" initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: 0.45 }}>
          <Image src={images[active]} alt={`${title}, image ${active + 1}`} fill sizes="(max-width: 900px) 100vw, 80vw" priority />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && <>
        <button type="button" className="gallery-control gallery-control--previous" onClick={previous} aria-label="Previous image"><ChevronLeft /></button>
        <button type="button" className="gallery-control gallery-control--next" onClick={next} aria-label="Next image"><ChevronRight /></button>
        <p className="gallery-count">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
      </>}
    </div>
    {images.length > 1 && <div className="event-gallery__thumbs">
      {images.map((image, index) => <button type="button" key={image} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`}><Image src={image} alt="" fill sizes="110px" /></button>)}
    </div>}
  </section>;
}
