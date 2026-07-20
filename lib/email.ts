/**
 * Delivers a "Book a tour" enquiry to the centre's inbox as a formatted email.
 *
 * Uses Resend's HTTP API directly (no SDK dependency). Configure via env:
 *   RESEND_API_KEY   — from resend.com. Required to actually send.
 *   TOUR_EMAIL_TO    — recipient inbox (defaults to the centre email).
 *   TOUR_EMAIL_FROM  — verified sender. Defaults to Resend's shared test
 *                      sender; set a verified munrocentre.com address for
 *                      production so mail lands reliably.
 *
 * Until RESEND_API_KEY is set, sendTourRequest() returns
 * { ok: false, reason: "not_configured" } and logs the enquiry, so the caller
 * can ask the family to phone instead — an enquiry is never silently dropped.
 */
import { site } from "./site";

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

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function detailRow(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#66625b;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 0;color:#11253f;font-size:15px;font-weight:600">${esc(value)}</td>
  </tr>`;
}

function renderHtml(d: TourRequest): string {
  return `<!doctype html><html><body style="margin:0;background:#f6f2eb;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7dece">
    <div style="background:#11253f;padding:22px 28px">
      <div style="font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:#a8c29a">New tour request</div>
      <div style="font-size:20px;font-weight:700;color:#ffffff;margin-top:3px">${esc(d.parentName)}</div>
    </div>
    <div style="padding:22px 28px">
      <table style="width:100%;border-collapse:collapse">
        ${detailRow("Name", d.parentName)}
        ${detailRow("Email", d.email)}
        ${detailRow("Phone", d.phone)}
        ${detailRow("Child&rsquo;s age", d.childAge)}
        ${detailRow("Preferred start", d.preferredDate)}
        ${detailRow("Preferred days", d.days)}
      </table>
      ${
        d.message
          ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid #efe9dd">
        <div style="color:#66625b;font-size:13px;margin-bottom:6px">Message</div>
        <div style="color:#11253f;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(d.message)}</div>
      </div>`
          : ""
      }
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #efe9dd;color:#8a857c;font-size:12px">
        Reply to this email to respond directly to ${esc(d.parentName)}.
      </div>
    </div>
  </div>
</body></html>`;
}

function renderText(d: TourRequest): string {
  return [
    "New tour request",
    "",
    `Name: ${d.parentName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    d.childAge ? `Child's age: ${d.childAge}` : "",
    d.preferredDate ? `Preferred start: ${d.preferredDate}` : "",
    d.days ? `Preferred days: ${d.days}` : "",
    d.message ? `\nMessage:\n${d.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendTourRequest(d: TourRequest): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[tour] RESEND_API_KEY not set — enquiry not emailed:\n" + renderText(d));
    return { ok: false, reason: "not_configured" };
  }

  const to = process.env.TOUR_EMAIL_TO || site.contact.email;
  const from = process.env.TOUR_EMAIL_FROM || "The Munro Centre <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: `Tour request — ${d.parentName}`,
        html: renderHtml(d),
        text: renderText(d),
      }),
    });

    if (!res.ok) {
      console.error("[tour] Resend send failed:", res.status, await res.text());
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[tour] Resend request threw:", err);
    return { ok: false, reason: "send_failed" };
  }
}
