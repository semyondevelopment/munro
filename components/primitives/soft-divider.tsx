import { cn } from "@/lib/utils";

const TONE = {
  cream: "var(--color-cream)",
  sand: "var(--color-sand)",
  sage: "var(--color-sage-100)",
  navy: "var(--color-navy)",
} as const;

type Tone = keyof typeof TONE;

/**
 * A soft gradient transition between two section tones — melts one band into
 * the next instead of a hard seam. Placed between sections in the page flow.
 */
export function SoftDivider({
  from,
  to,
  className,
}: {
  from: Tone;
  to: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("h-20 w-full sm:h-28", className)}
      style={{ background: `linear-gradient(to bottom, ${TONE[from]}, ${TONE[to]})` }}
    />
  );
}
