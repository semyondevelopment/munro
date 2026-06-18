import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The Munro Centre logo — the official artwork (full lockup with the diamond,
 * wordmark and "Belong · Grow · Thrive" tagline) served from /public/images.
 * It sits on the brand cream, so it blends on cream/light surfaces; on dark
 * surfaces it's placed on a light chip (see the footer).
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt={`${site.name} — early learning in St Lucia`}
      width={1073}
      height={423}
      priority={priority}
      className={cn("h-11 w-auto", className)}
    />
  );
}
