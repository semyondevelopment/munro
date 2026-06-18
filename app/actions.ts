"use server";

/**
 * Tour-request handler.
 *
 * Validates the enquiry server-side and returns a typed result for the form's
 * useActionState hook. Right now it succeeds without persisting — wire the
 * marked TODO to an email service (Resend), a form backend (Formspree) or a
 * CRM/Supabase row to start capturing leads. The UX is already production-ready.
 */

export type TourState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "childAge", string>>;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitTour(
  _prev: TourState,
  formData: FormData,
): Promise<TourState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const childAge = String(formData.get("childAge") ?? "").trim();
  const preferred = String(formData.get("preferred") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: NonNullable<TourState>["errors"] = {};
  const hasEmail = EMAIL_RE.test(email);
  const hasPhone = phone.replace(/\D/g, "").length >= 8;

  if (name.length < 2) errors.name = "Please enter your name.";
  // Require at least one way to reach you — but not both (lower friction).
  if (email && !hasEmail) errors.email = "Please enter a valid email.";
  if (!hasEmail && !hasPhone) {
    errors.email = errors.email ?? "Add an email or phone so we can reply.";
    errors.phone = "Add an email or phone so we can reply.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  // TODO(integration): deliver the lead.
  // e.g. await resend.emails.send({ ... }) or await db.insert(tourRequests)...
  void { name, email, phone, childAge, preferred, message };

  return {
    ok: true,
    message:
      "Thank you — your request is in. We'll be in touch within one business day to confirm your tour.",
  };
}
