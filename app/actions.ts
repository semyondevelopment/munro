"use server";

import { site } from "@/lib/site";
import { sendTourRequest } from "@/lib/email";
import type { TourFormState } from "@/lib/tour-form";

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

/**
 * Book-a-Tour server action. Validates the enquiry, emails it to the centre
 * (see lib/email.ts), and returns a `TourFormState` the form renders. Server
 * Actions are reachable by direct POST, so all validation lives here, not only
 * in the browser.
 */
export async function bookTour(
  _prev: TourFormState,
  formData: FormData,
): Promise<TourFormState> {
  const get = (key: string) => (formData.get(key)?.toString() ?? "").trim();

  // Honeypot: bots fill this hidden field; real visitors never see it. Pretend
  // success so the bot moves on, but send nothing.
  if (get("company")) {
    return { status: "success", message: "Thanks! We'll be in touch soon.", errors: {}, values: {} };
  }

  const values = {
    parentName: get("parentName"),
    email: get("email"),
    phone: get("phone"),
    childAge: get("childAge"),
    preferredDate: get("preferredDate"),
    days: get("days"),
    message: get("message"),
  };

  const errors: Record<string, string> = {};
  if (!values.parentName) errors.parentName = "Please tell us your name.";
  if (!values.email) errors.email = "Please add your email.";
  else if (!isEmail(values.email)) errors.email = "That email doesn't look quite right.";
  if (!values.phone) errors.phone = "Please add a phone number.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const result = await sendTourRequest(values);

  if (!result.ok) {
    const call = `please call us on ${site.contact.phone}`;
    return {
      status: "error",
      message:
        result.reason === "not_configured"
          ? `Our online form isn't switched on yet — ${call} and we'll book your tour straight away.`
          : `Sorry, something went wrong sending your request. Please try again in a moment, or ${call}.`,
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your tour request is on its way — we'll be in touch within one business day.",
    errors: {},
    values: {},
  };
}
