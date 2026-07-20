"use client";

import { useActionState } from "react";
import { MapPin, Phone, Clock, Send, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/ui/button";
import { bookTour } from "@/app/actions";
import { initialTourState } from "@/lib/tour-form";
import type { ResolvedSite } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

/**
 * "Come and see us" — a Book-a-Tour enquiry form (emailed to the centre via the
 * bookTour server action) paired with an embedded Google map + directions, so
 * families can both request a visit and see exactly where we are.
 */
export function Visit({ site }: { site: ResolvedSite }) {
  const [state, action, pending] = useActionState(bookTour, initialTourState);
  const v = state.values;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.full,
  )}&z=15&output=embed`;

  return (
    <section id="visit" className="scroll-mt-24 bg-sand py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow color="green" center>
            Come and see us
          </Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05]">
            Book a tour of The Munro Centre
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            The best way to feel the difference is to visit. Tell us a little about
            your family and we&rsquo;ll be in touch to arrange a relaxed,
            no-pressure tour.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Enquiry form */}
          <div className="rounded-[var(--radius-lg)] border border-navy/8 bg-paper p-6 shadow-soft sm:p-8">
            {state.status === "success" ? (
              <div className="flex min-h-[27rem] flex-col items-center justify-center text-center">
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-deep">
                  <Check className="size-8" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-navy">Request received 🎉</h3>
                <p className="mt-3 max-w-sm text-ink-soft">{state.message}</p>
              </div>
            ) : (
              <form action={action} noValidate className="flex flex-col gap-4">
                <h3 className="font-display text-2xl text-navy">Request a tour</h3>

                {state.status === "error" && Object.keys(state.errors).length === 0 && (
                  <p
                    role="alert"
                    className="rounded-xl bg-brand-red-100 px-4 py-3 text-sm leading-relaxed text-brand-red-deep"
                  >
                    {state.message}
                  </p>
                )}

                {/* Honeypot — hidden from people, catches bots. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" name="parentName" required defaultValue={v.parentName} error={state.errors.parentName} autoComplete="name" />
                  <Field label="Phone" name="phone" type="tel" required defaultValue={v.phone} error={state.errors.phone} autoComplete="tel" />
                </div>
                <Field label="Email" name="email" type="email" required defaultValue={v.email} error={state.errors.email} autoComplete="email" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Child's age" name="childAge" placeholder="e.g. 18 months" defaultValue={v.childAge} />
                  <Field label="Preferred start" name="preferredDate" placeholder="e.g. Feb 2026" defaultValue={v.preferredDate} />
                </div>
                <Field label="Preferred days" name="days" placeholder="e.g. Mon, Wed, Fri" defaultValue={v.days} />
                <Field label="Anything else? (optional)" name="message" textarea placeholder="Tell us anything that would help us prepare for your visit." defaultValue={v.message} />

                <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
                  {pending ? (
                    "Sending…"
                  ) : (
                    <>
                      Request a tour <Send className="size-4" strokeWidth={1.9} />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-ink-faint">
                  We&rsquo;ll only use your details to arrange your tour. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Map + directions */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-navy/8 shadow-soft">
              <iframe
                title={`Map showing ${site.name}, ${site.address.full}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 sm:h-[19rem]"
              />
            </div>

            <div className="rounded-[var(--radius-lg)] border border-navy/8 bg-paper p-6 shadow-soft sm:p-7">
              <h3 className="font-display text-xl text-navy">Find us in St Lucia</h3>
              <ul className="mt-4 flex flex-col gap-3.5 text-[0.98rem] text-ink">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-sage-700" strokeWidth={1.7} />
                  <span>
                    {site.address.full}
                    <span className="mt-0.5 block text-ink-soft">
                      On the University of Queensland campus — easy to reach from
                      Toowong, Indooroopilly and the inner west.
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-sage-700" strokeWidth={1.7} />
                  <a href={site.contact.phoneHref} className="hover:text-navy">
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-sage-700" strokeWidth={1.7} />
                  <span>{site.hours.display}</span>
                </li>
              </ul>
              <Button asChild variant="secondary" size="md" className="mt-6 w-full sm:w-auto">
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer">
                  Get directions <ArrowRight className="size-4" strokeWidth={1.9} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  error,
  placeholder,
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `tour-${name}`;
  const base =
    "w-full rounded-xl border bg-sand/60 px-4 py-3 text-[0.98rem] text-navy outline-none transition-colors placeholder:text-ink-faint focus:border-terracotta focus:bg-paper";
  const border = error ? "border-brand-red/60" : "border-navy/12";

  return (
    <div className={textarea ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-brand-red-deep"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(base, border, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          className={cn(base, border)}
        />
      )}
      {error && <p className="mt-1.5 text-sm text-brand-red-deep">{error}</p>}
    </div>
  );
}
