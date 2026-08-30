"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const questions = [
  ["What is ECLIPSE?", "ECLIPSE is an active scientific and digital student club based at ESGEN."],
  ["When was ECLIPSE founded?", "ECLIPSE was founded in 2025."],
  ["What does the club focus on?", "Scientific discovery, digital economy, research, workshops, and events are at the center of the club’s activity."],
  ["How can I connect with ECLIPSE?", "Use the contact page to reach the club, and follow the club’s official channels once they are published."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">
    {questions.map(([question, answer], index) => {
      const expanded = open === index;
      return <div className={`faq-item ${expanded ? "is-open" : ""}`} key={question}>
        <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : index)}>
          <span>{question}</span><Plus size={23} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {expanded && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}><p>{answer}</p></motion.div>}
        </AnimatePresence>
      </div>;
    })}
  </div>;
}
