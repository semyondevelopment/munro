/**
 * Guards on the JSON-LD structured data (lib/seo.ts). Accurate, consistent
 * structured data is a primary local-SEO signal, so we assert the graph keeps
 * the entities Google expects and that the NAP matches lib/site exactly.
 *
 * Run with: pnpm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { getSiteContent } from "@/lib/sanity/get-content";
import { homeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Node = Record<string, unknown>;

async function graph(): Promise<Node[]> {
  const c = await getSiteContent();
  const ld = homeJsonLd(c) as { "@context": string; "@graph": Node[] };
  assert.equal(ld["@context"], "https://schema.org", "missing schema.org context");
  assert.ok(Array.isArray(ld["@graph"]), "@graph should be an array");
  return ld["@graph"];
}

test("emits a LocalBusiness node with NAP matching lib/site", async () => {
  const nodes = await graph();
  const biz = nodes.find(
    (n) => Array.isArray(n["@type"]) && (n["@type"] as string[]).includes("ChildCare"),
  );
  assert.ok(biz, "no ChildCare/EducationalOrganization node found");

  assert.equal(biz.telephone, site.contact.phoneHref.replace("tel:", ""), "telephone drift");
  const address = biz.address as Node;
  assert.equal(address.postalCode, site.address.postcode, "postcode drift");
  assert.equal(address.addressLocality, site.address.suburb, "suburb drift");
  assert.equal(address.addressRegion, site.address.region, "region drift");
});

test("emits a WebSite node", async () => {
  const nodes = await graph();
  assert.ok(nodes.some((n) => n["@type"] === "WebSite"), "no WebSite node found");
});

test("emits one EducationalOccupationalProgram per room", async () => {
  const c = await getSiteContent();
  const nodes = await graph();
  const programs = nodes.filter((n) => n["@type"] === "EducationalOccupationalProgram");
  assert.equal(programs.length, c.rooms.items.length, "program count should match room count");
});

test("emits a FAQPage with one entry per FAQ", async () => {
  const c = await getSiteContent();
  const nodes = await graph();
  const faq = nodes.find((n) => n["@type"] === "FAQPage");
  assert.ok(faq, "no FAQPage node found");
  assert.equal(
    (faq.mainEntity as unknown[]).length,
    c.faq.items.length,
    "FAQ question count should match",
  );
});

test("does not emit a self-asserted aggregateRating (Google policy)", async () => {
  const c = await getSiteContent();
  const json = JSON.stringify(homeJsonLd(c));
  assert.ok(!json.includes("aggregateRating"), "must not emit aggregateRating without real reviews");
});
