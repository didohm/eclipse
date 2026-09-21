/**
 * Compatibility re-export.
 *
 * The reveal primitive now lives in the shared motion system at
 * `@/components/motion`. This shim keeps the ~30 existing usages across the
 * app (`<Reveal delay={...}>`) working unchanged.
 *
 * For new code, prefer:
 *   import { Reveal } from "@/components/motion";
 */
export { Reveal, RevealTall } from "@/components/motion";
export type { RevealAnimation } from "@/components/motion";
