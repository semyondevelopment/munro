import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarsProps = {
  /** 0–5 */
  value?: number;
  className?: string;
  starClassName?: string;
  label?: string;
};

export function Stars({
  value = 5,
  className,
  starClassName,
  label,
}: StarsProps) {
  const full = Math.round(value);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < full
              ? "fill-terracotta text-terracotta"
              : "fill-transparent text-terracotta/40",
            starClassName,
          )}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
