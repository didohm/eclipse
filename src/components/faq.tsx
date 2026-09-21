"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { collapse } from "@/lib/motion-variants";
import { faqItems } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">
    {faqItems.map(([question, answer], index) => {
      const expanded = open === index;
      return <div className={`faq-item ${expanded ? "is-open" : ""}`} key={question}>
        <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : index)}>
          <span>{question}</span><Plus size={23} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {expanded && <motion.div className="faq-answer" variants={collapse} initial="hidden" animate="visible" exit="exit"><p>{answer}</p></motion.div>}
        </AnimatePresence>
      </div>;
    })}
  </div>;
}
