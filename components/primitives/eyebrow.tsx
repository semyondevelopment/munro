import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "onDark";
  /** Center the leading rule + text. */
  center?: boolean;
};

export function Eyebrow({
  tone = "default",
  center = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        center && "justify-center",
        tone === "onDark" ? "text-sage" : "text-terracotta-700",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "onDark" ? "bg-sage/60" : "bg-terracotta/50",
        )}
      />
      {children}
    </span>
  );
}
