import type { SchemaTypeDefinition } from "sanity";

import { imageWithAlt, cta } from "./objects";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import {
  room,
  educator,
  testimonial,
  faq,
  feature,
  trustItem,
} from "./collections";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  imageWithAlt,
  cta,
  // Singletons
  siteSettings,
  homePage,
  // Collections
  room,
  educator,
  testimonial,
  faq,
  feature,
  trustItem,
];
