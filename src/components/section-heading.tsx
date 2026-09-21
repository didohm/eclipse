import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: React.ReactNode; copy?: string; action?: React.ReactNode }) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading__side">
        {copy && <p>{copy}</p>}
        {action}
      </div>
    </Reveal>
  );
}
