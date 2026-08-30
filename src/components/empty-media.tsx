import { Aperture } from "lucide-react";

export function EmptyMedia({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`empty-media ${className}`} role="img" aria-label={`${label}. Photography pending`}>
    <Aperture size={25} strokeWidth={1.4} />
    <span>{label}</span>
  </div>;
}
