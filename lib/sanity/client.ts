import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Read-only client for fetching published content into the public site.
 * `useCdn` serves cached, fast responses — ideal for a marketing site.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
