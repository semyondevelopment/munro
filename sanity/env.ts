/**
 * Sanity project configuration, read from environment variables.
 *
 * These are safe to expose to the browser (NEXT_PUBLIC_*). The write token is
 * NOT here — it lives only on the server (see lib/sanity/client.ts).
 *
 * Until the centre creates their Sanity project, projectId falls back to a
 * placeholder so the app still builds. `isSanityConfigured` lets the content
 * layer fall back to the bundled static content in lib/content.ts.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

/** True once a real Sanity project id has been supplied via env. */
export const isSanityConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";
