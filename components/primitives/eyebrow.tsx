import { cn } from "@/lib/utils";

/** Playful brand colourways for the chip. */
type EyebrowColor = "green" | "blue" | "yellow" | "red";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "onDark";
  /** Brand colourway — vary it section to section for a cheerful rhythm. */
  color?: EyebrowColor;
  /** Center the chip within its container. */
  center?: boolean;
};

const colorways: Record<EyebrowColor, { chip: string; dot: string }> = {
  green: { chip: "bg-brand-green-100 text-brand-green-deep", dot: "bg-brand-green" },
  blue: { chip: "bg-brand-blue-100 text-brand-blue-deep", dot: "bg-brand-blue" },
  yellow: { chip: "bg-brand-yellow-100 text-brand-yellow-deep", dot: "bg-brand-yellow" },
  red: { chip: "bg-brand-red-100 text-brand-red-deep", dot: "bg-brand-red" },
};

export function Eyebrow({
  tone = "default",
  color = "green",
  center = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  const cw = colorways[color];

  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5",
        tone === "onDark" ? "bg-cream/10 text-cream" : cw.chip,
        center && "justify-center",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          tone === "onDark" ? "bg-brand-yellow" : cw.dot,
        )}
      />
      {children}
    </span>
  );
}
