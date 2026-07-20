/**
 * Guards on the Book-a-Tour server action (app/actions.ts). Server Actions are
 * reachable by direct POST, so validation must hold on the server regardless of
 * the browser. These run the action directly with a FormData payload.
 *
 * Run with: pnpm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { bookTour } from "@/app/actions";
import { initialTourState } from "@/lib/tour-form";

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

test("rejects an empty submission with per-field errors", async () => {
  const state = await bookTour(initialTourState, form({}));
  assert.equal(state.status, "error");
  assert.ok(state.errors.parentName, "expected a name error");
  assert.ok(state.errors.email, "expected an email error");
  assert.ok(state.errors.phone, "expected a phone error");
});

test("rejects an invalid email and echoes values back", async () => {
  const state = await bookTour(
    initialTourState,
    form({ parentName: "Sam", email: "not-an-email", phone: "0400 000 000" }),
  );
  assert.equal(state.status, "error");
  assert.ok(state.errors.email, "expected an email error");
  assert.equal(state.values.parentName, "Sam", "should repopulate the form");
});

test("silently accepts and drops honeypot (bot) submissions", async () => {
  const state = await bookTour(
    initialTourState,
    form({ company: "spam-bot", parentName: "x", email: "a@b.com", phone: "1" }),
  );
  assert.equal(state.status, "success");
});

test("a valid submission with no email provider asks the family to call", async () => {
  delete process.env.WEB3FORMS_ACCESS_KEY; // ensure the "not configured" path
  const state = await bookTour(
    initialTourState,
    form({ parentName: "Sam Lee", email: "sam@example.com", phone: "0400 123 456" }),
  );
  assert.equal(state.status, "error");
  assert.match(state.message, /call us/i, "should direct the family to phone");
  assert.equal(state.values.email, "sam@example.com", "should preserve values");
});
