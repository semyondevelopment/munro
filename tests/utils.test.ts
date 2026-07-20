/**
 * Guards on the cn() class-name helper (lib/utils.ts) that every component uses
 * to compose Tailwind classes. Conflicting utilities must resolve last-wins so
 * component overrides behave predictably.
 *
 * Run with: pnpm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { cn } from "@/lib/utils";

test("cn drops falsy values and joins the rest", () => {
  assert.equal(cn("a", false, null, undefined, "b"), "a b");
});

test("cn resolves conflicting Tailwind utilities (last wins)", () => {
  assert.equal(cn("px-2", "px-4"), "px-4");
  assert.equal(cn("text-navy", "text-cream"), "text-cream");
});

test("cn supports conditional/array inputs", () => {
  assert.equal(cn(["a", "b"], { c: true, d: false }), "a b c");
});
