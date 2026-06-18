import { cn } from "@/lib/utils";

type AtmosphereProps = {
  /** Dominant glow colour. */
  tone?: "sage" | "terracotta";
  /** Mirror the composition to the opposite corners. */
  flip?: boolean;
  className?: string;
};

/**
 * Soft, heavily-blurred colour washes that sit behind section content to add
 * warmth and depth to otherwise-flat cream surfaces. Purely decorative.
 * Place as the first child of a `relative overflow-hidden` section, with the
 * content container marked `relative` so it stays crisply above.
 */
export function Atmosphere({ tone = "sage", flip = false, className }: AtmosphereProps) {
  const primary = tone === "sage" ? "bg-sage-100/70" : "bg-terracotta-100/55";
  const secondary = tone === "sage" ? "bg-terracotta-100/40" : "bg-sage-100/55";

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
