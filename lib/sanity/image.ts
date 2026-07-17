import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

export function sanityImage(source: SanityImageSource) {
  if (!builder) return { url: () => "" as string, width: () => ({ quality: () => ({ url: () => "" }) }) };
  return builder.image(source);
}
