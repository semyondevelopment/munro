/**
 * The embedded Sanity Studio — the centre's staff log in here at /studio to
 * edit text and images. This route takes over its own layout and is excluded
 * from the marketing site's chrome.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
