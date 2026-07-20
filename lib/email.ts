/**
 * Delivers a "Book a tour" enquiry to the centre's inbox as a formatted email —
 * using Web3Forms, which is free (no cost, no credit card, no domain to verify).
 *
 * Setup (one-time, free): go to web3forms.com, enter the inbox that should
 * receive enquiries (e.g. office@munrocentre.com), and copy the access key it
 * emails you. Add it to the environment as:
 *   WEB3FORMS_ACCESS_KEY=...
 * Enquiries are delivered to the address you registered the key with, and
 * replying to one replies straight to the family.
 *
 * Until the key is set, sendTourRequest() returns
 * { ok: false, reason: "not_configured" } and logs the enquiry, so the caller
 * can ask the family to phone instead — an enquiry is never silently dropped.
 */

export type TourRequest = {
  parentName: string;
  email: string;
  phone: string;
  childAge?: string;
  preferredDate?: string;
  days?: string;
  message?: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

/** Plain-text summary, used for the "not configured" server log. */
function summary(d: TourRequest): string {
  return [
    `Name: ${d.parentName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    d.childAge ? `Child's age: ${d.childAge}` : "",
    d.preferredDate ? `Preferred start: ${d.preferredDate}` : "",
    d.days ? `Preferred days: ${d.days}` : "",
    d.message ? `Message: ${d.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTourRequest(d: TourRequest): Promise<SendResult> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn("[tour] WEB3FORMS_ACCESS_KEY not set — enquiry not emailed:\n" + summary(d));
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New tour request — ${d.parentName}`,
        from_name: "The Munro Centre website",
        // Web3Forms formats every field below into the email it sends, and uses
        // `email` as the Reply-To so a reply reaches the family directly.
        name: d.parentName,
        email: d.email,
        phone: d.phone,
        child_age: d.childAge || "—",
        preferred_start: d.preferredDate || "—",
        preferred_days: d.days || "—",
        message: d.message || "(no message)",
        botcheck: false,
      }),
    });

    const json: { success?: boolean } | null = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      console.error("[tour] Web3Forms send failed:", res.status, json);
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[tour] Web3Forms request threw:", err);
    return { ok: false, reason: "send_failed" };
  }
}
