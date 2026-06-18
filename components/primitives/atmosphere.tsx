import { cn } from "@/lib/utils";

type AtmosphereTone = "sage" | "terracotta" | "blue" | "yellow" | "green" | "red";

type AtmosphereProps = {
  /** Dominant glow colour. */
  tone?: AtmosphereTone;
  /** Mirror the composition to the opposite corners. */
  flip?: boolean;
  className?: string;
};

/** Soft tint pairs for each colourway — [primary glow, secondary glow]. */
const washes: Record<AtmosphereTone, [string, string]> = {
  sage: ["bg-sage-100/70", "bg-brand-yellow-100/50"],
  terracotta: ["bg-terracotta-100/55", "bg-sage-100/55"],
  blue: ["bg-brand-blue-100/70", "bg-brand-green-100/55"],
  yellow: ["bg-brand-yellow-100/70", "bg-brand-red-100/45"],
  green: ["bg-brand-green-100/70", "bg-brand-blue-100/50"],
  red: ["bg-brand-red-100/60", "bg-brand-yellow-100/55"],
};

/**
 * Soft, heavily-blurred colour washes that sit behind section content to add
 * warmth and playful depth to otherwise-flat cream surfaces. Purely decorative.
 * Place as the first child of a `relative overflow-hidden` section, with the
 * content container marked `relative` so it stays crisply above.
 */
export function Atmosphere({ tone = "sage", flip = false, className }: AtmosphereProps) {
  const [primary, secondary] = washes[tone];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute size-[40rem] rounded-full blur-[110px]",
          flip ? "-left-48 -top-44" : "-right-48 -top-44",
          primary,
        )}
      />
      <div
        className={cn(
          "absolute size-[32rem] rounded-full blur-[110px]",
          flip ? "-right-40 -bottom-48" : "-left-40 -bottom-48",
          secondary,
        )}
      />
    </div>
  );
}
