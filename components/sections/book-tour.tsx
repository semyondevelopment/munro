"use client";

import { useActionState, useEffect, useRef } from "react";
import { Check, ChevronDown, Loader2, Phone, CalendarHeart } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { submitTour, type TourState } from "@/app/actions";
import { rooms } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const expect = [
  "A relaxed walk through every room",
  "Meet the educators who'd care for your child",
  "Straight answers on fees, CCS & availability",
  "No pressure — just come and feel it",
];

const ageOptions = [
  ...rooms.items.map((r) => `${r.name} · ${r.age}`),
  "Not sure yet",
];

const timeOptions = ["Morning", "Midday", "Afternoon", "Either works"];

export function BookTour() {
  const [state, formAction, pending] = useActionState<TourState, FormData>(
    submitTour,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Move focus to the first invalid field after a failed submit.
  useEffect(() => {
    if (state && !state.ok && state.errors) {
      const first = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      first?.focus();
    }
  }, [state]);

  return (
    <section id="book" className="scroll-mt-24 bg-navy py-section">
      <Container className="relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Persuasion panel */}
          <Reveal className="flex flex-col justify-center">
            <Eyebrow tone="onDark">Book a tour</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.03] text-cream">
              Come and feel the difference
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
              The best way to know if Munro is right for your family is to visit.
              Book a tour and we&apos;ll show you around — most families just know.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {expect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/85">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[1.02rem]">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 inline-flex w-fit items-center gap-2 rounded-pill bg-cream/[0.08] px-4 py-2 text-sm text-cream/85 ring-1 ring-cream/15">
              <CalendarHeart className="size-4 text-sage" strokeWidth={1.8} />
              Enrolling now — tour times fill quickly each term.
            </p>

            <div className="mt-6 flex items-center gap-3 text-cream/75">
              <Phone className="size-5 text-sage" strokeWidth={1.7} />
              <span>
                Prefer to talk?{" "}
                <a
                  href={site.contact.phoneHref}
                  className="font-medium text-cream underline-offset-4 hover:underline"
                >
                  {site.contact.phone}
                </a>
              </span>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-lg)] bg-cream p-6 shadow-hero sm:p-9">
              {state?.ok ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <CalendarHeart className="size-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-navy">
                    Your tour request is in
                  </h3>
                  <p className="mt-3 max-w-sm text-ink-soft">{state.message}</p>
                  <a
                    href={site.contact.phoneHref}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-navy underline-offset-4 hover:underline"
                  >
                    <Phone className="size-4" strokeWidth={1.8} />
                    Or call us now — {site.contact.phone}
                  </a>
                </div>
              ) : (
                <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-navy">Request your visit</h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      We&apos;ll reply within one business day.
                    </p>
                  </div>

                  <Field
                    label="Your name"
                    name="name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    error={state?.errors?.name}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@email.com"
                      autoComplete="email"
                      error={state?.errors?.email}
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="0400 000 000"
                      autoComplete="tel"
                      error={state?.errors?.phone}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField label="Child's age / room" name="childAge" options={ageOptions} />
                    <SelectField label="Preferred time" name="preferred" options={timeOptions} />
                  </div>
                  <FieldWrap label="Anything we should know? (optional)" name="message">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Start date, days needed, questions…"
                      className="w-full resize-none rounded-[14px] border border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-ink-faint transition-colors focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </FieldWrap>

                  {state && !state.ok && state.message && (
                    <p className="text-sm font-medium text-terracotta-700" role="alert">
                      {state.message}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="mt-1 w-full" disabled={pending}>
                    {pending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Request my tour"
                    )}
                  </Button>
                  <p className="text-center text-xs text-ink-soft">
                    Your details stay private. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---- Field building blocks ------------------------------------------------ */

function FieldWrap({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  error,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <FieldWrap label={label} name={name}>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-12 w-full rounded-[14px] border bg-white px-4 text-navy placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/30",
          error ? "border-terracotta-700" : "border-navy/15 focus:border-navy/40",
        )}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className="text-xs font-medium text-terracotta-700">
          {error}
        </span>
      )}
    </FieldWrap>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <FieldWrap label={label} name={name}>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue=""
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 w-full appearance-none rounded-[14px] border bg-white px-4 pr-10 text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/30",
            error ? "border-terracotta-700" : "border-navy/15 focus:border-navy/40",
          )}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-soft"
          strokeWidth={1.8}
        />
      </div>
      {error && (
        <span id={errorId} role="alert" className="text-xs font-medium text-terracotta-700">
          {error}
        </span>
      )}
    </FieldWrap>
  );
}
