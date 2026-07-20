/**
 * Guards on the content resolver (lib/sanity/get-content.ts). With no Sanity
 * project configured (as in tests), getSiteContent() must return the fully
 * resolved bundled content — the guarantee that "the site never renders blank".
 *
 * Run with: pnpm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { getSiteContent } from "@/lib/sanity/get-content";

test("the bundled fallback resolves every section with content", async () => {
  const c = await getSiteContent();

  assert.equal(c.rooms.items.length, 6, "expected the six Munro rooms");
  assert.ok(c.testimonials.items.length > 0, "testimonials should not be empty");
  assert.ok(c.faq.items.length > 0, "faqs should not be empty");
  assert.ok(c.educators.people.length > 0, "educators should not be empty");
  assert.ok(c.features.items.length > 0, "features should not be empty");
  assert.ok(c.trustBar.length > 0, "trust bar should not be empty");

  // Headline copy is present for the key sections.
  assert.ok(c.hero.title.trim().length > 0, "hero title missing");
  assert.ok(c.about.title.trim().length > 0, "about title missing");
});

test("every rendered image resolves to a real src and alt", async () => {
  const c = await getSiteContent();
  const imgs = [
    c.hero.image,
    c.hero.imageSecondary,
    c.impact.image,
    c.finalCta.image,
    ...c.about.pillars.map((p) => p.image),
    ...c.rooms.items.map((r) => r.image),
    ...c.tour.gallery.map((g) => g.image),
  ];
  for (const im of imgs) {
    assert.ok(im.src && im.src.length > 0, "an image resolved without a src");
    assert.equal(typeof im.alt, "string", "an image resolved without alt text");
  }
});

test("contact details (NAP) resolve from lib/site", async () => {
  const c = await getSiteContent();
  assert.match(c.site.contact.phone, /\d/, "phone should contain digits");
  assert.ok(c.site.contact.email.includes("@"), "email should be an address");
  assert.ok(c.site.address.full.trim().length > 0, "address should be present");
  assert.ok(c.site.hours.display.trim().length > 0, "opening hours should be present");
});

test("each resolved room maps to an age range for the room finder", async () => {
  const c = await getSiteContent();
  for (const room of c.rooms.items) {
    const age = c.roomAgeMonths[room.key];
    assert.ok(age, `no age range resolved for ${room.key}`);
    assert.ok((age.min ?? 0) < (age.max ?? 0), `${room.key}: resolved age range is invalid`);
  }
});
