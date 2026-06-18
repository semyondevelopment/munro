import { cn } from "@/lib/utils";

type Tone = "cream" | "sand" | "sage" | "navy";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  /** Remove default vertical padding (for full-bleed sections). */
  flush?: boolean;
};

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  sage: "bg-sage-100 text-ink",
  navy:
    "bg-navy text-cream/80 [&_h1]:text-cream [&_h2]:text-cream [&_h3]:text-cream [&_h4]:text-cream",
};

export function Section({
  tone = "cream",
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], !flush && "py-section", className)}
      {...props}
    >
      {children}
    </section>
  );
}
