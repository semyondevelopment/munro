import {
  HeartHandshake,
  GraduationCap,
  CalendarHeart,
  Globe,
  Utensils,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/** Maps content-layer icon keys to lucide components (used by TrustBar + Features). */
export const iconMap: Record<string, LucideIcon> = {
  heart: HeartHandshake,
  graduation: GraduationCap,
  calendar: CalendarHeart,
  globe: Globe,
  utensils: Utensils,
  phone: Smartphone,
};
