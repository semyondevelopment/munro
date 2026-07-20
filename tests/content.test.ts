/**
 * Guards on the bundled content in lib/content.ts. This content is the site's
 * fallback whenever Sanity is empty or unreachable, so its integrity is what
 * keeps the public site from ever rendering a blank or broken section.
 *
 * Run with: pnpm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import * as content from "@/lib/content";
import { images } from "@/lib/images";
import { iconMap } from "@/components/icon-map";

const imageKeys = new Set(Object.keys(images));
const iconKeys = new Set(Object.keys(iconMap));

test("every image key referenced in content exists in the manifest", () => {
  const used: string[] = [
    content.hero.image,
    content.hero.imageSecondary,
    content.impact.image,
    content.finalCta.image,
    content.team.image,
    ...content.about.pillars.map((p) => p.image),
    ...content.rooms.items.map((r) => r.image),
    ...content.tour.gallery.map((g) => g.image),
  ];
  for (const key of used) {
    assert.ok(imageKeys.has(key), `content references a missing image key: ${key}`);
  }
});

test("every image in the manifest has a real src and non-empty alt text", () => {
  for (const [key, im] of Object.entries(images)) {
    assert.ok(im.src.startsWith("/images/"), `${key}: src should live under /images/`);
    assert.ok(im.alt.trim().length > 0, `${key}: alt text must not be empty`);
  }
});

test("each room has the required copy fields and a valid age range", () => {
  assert.ok(content.rooms.items.length >= 1, "there should be at least one room");
  for (const room of content.rooms.items) {
    for (const field of ["key", "name", "tag", "age", "copy"] as const) {
      assert.ok(String(room[field]).trim().length > 0, `${room.key}: ${field} is empty`);
    }
    const age = content.roomAgeMonths[room.key];
    assert.ok(age, `${room.key}: no roomAgeMonths entry (breaks the room finder)`);
    assert.ok(age.min < age.max, `${room.key}: age range min must be below max`);
  }
});

test("roomAgeMonths has no stray keys that don't match a room", () => {
  const roomKeys = new Set(content.rooms.items.map((r) => r.key));
  for (const key of Object.keys(content.roomAgeMonths)) {
    assert.ok(roomKeys.has(key), `roomAgeMonths has an orphan key: ${key}`);
  }
});

test("every icon used by the trust bar and features is known to the icon map", () => {
  const used = [
    ...content.trustBar.map((t) => t.icon),
    ...content.features.items.map((f) => f.icon),
  ];
  for (const icon of used) {
    assert.ok(iconKeys.has(icon), `unknown icon "${icon}" — add it to components/icon-map.ts`);
  }
});

test("testimonials and FAQs are complete", () => {
  assert.ok(content.testimonials.items.length > 0, "expected at least one testimonial");
  for (const t of content.testimonials.items) {
    assert.ok(t.quote.trim().length > 0, "testimonial quote is empty");
    assert.ok(t.name.trim().length > 0, "testimonial attribution is empty");
  }
  assert.ok(content.faq.items.length > 0, "expected at least one FAQ");
  for (const f of content.faq.items) {
    assert.ok(f.q.trim().length > 0, "FAQ question is empty");
    assert.ok(f.a.trim().length > 0, "FAQ answer is empty");
  }
});

test("navigation and footer links point somewhere valid", () => {
  const links = [
    ...content.nav,
    ...content.footer.columns.flatMap((c) => c.links),
  ];
  for (const link of links) {
    assert.ok(link.label.trim().length > 0, "a link has an empty label");
    assert.ok(
      /^(#|\/|https?:\/\/|tel:|mailto:)/.test(link.href),
      `link "${link.label}" has an unusable href: ${link.href}`,
    );
  }
});
