import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Build an optimised image URL from a Sanity image reference.
 * Usage: urlForImage(value).width(1200).url()
 */
export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
