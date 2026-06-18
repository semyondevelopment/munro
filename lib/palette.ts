/**
 * Playful brand colourways from the Munro logo, used to add cheerful variety
 * to repeating elements (icon tiles, room cards, chips). Cycle through them by
 * index with `brandTile(i)` so adjacent items always differ.
 */
export const brandTiles = [
  "bg-brand-blue-100 text-brand-blue-deep",
  "bg-brand-yellow-100 text-brand-yellow-deep",
  "bg-brand-green-100 text-brand-green-deep",
  "bg-brand-red-100 text-brand-red-deep",
  "bg-sage-100 text-sage-700",
  "bg-terracotta-100 text-terracotta-700",
] as const;

export function brandTile(i: number) {
  return brandTiles[i % brandTiles.length];
}

/** Eyebrow chip colourway names, for varying section kickers in order. */
export const eyebrowColors = ["green", "blue", "yellow", "red"] as const;
