"use client";

import { useState } from "react";
import { HeartHandshake, PiggyBank, ReceiptText, Info } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Button } from "@/components/ui/button";
import { fees } from "@/lib/content";

const pointIcons = [HeartHandshake, PiggyBank, ReceiptText];

/**
 * Estimate the CCS rate from family income using the official 2024–25 taper:
 * 90% up to $83,280, then −1 percentage point per $5,000 of income, to 0%
 * around $533,280. Indicative only — real entitlement also depends on activity.
 */
function ccsRate(income: number): number {
  if (income <= 83_280) return 90;
  const steps = Math.floor((income - 83_280) / 5_000);
  return Math.max(0, 90 - steps);
}

const fmt = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

export function Fees() {
  const [income, setIncome] = useState(120_000);
  const [days, setDays] = useState(3);
  const [dailyFee, setDailyFee] = useState(fees.estimator.sampleDailyFee);

  const rate = ccsRate(income);
  const grossWeek = dailyFee * days;
  const subsidy = (grossWeek * rate) / 100;
  const outOfPocket = grossWeek - subsidy;

  return (
    <section
      id="fees"
      className="scroll-mt-24 bg-sage-100 py-section"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Explainer */}
          <Reveal>
            <Eyebrow color="green">{fees.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04]">
              {fees.title}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              {fees.copy}
            </p>

            <ul className="mt-8 flex flex-col gap-5">
              {fees.points.map((point, i) => {
                const Icon = pointIcons[i % pointIcons.length];
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cream text-brand-green-deep shadow-soft">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-navy">{point.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                        {point.copy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Estimator */}
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-lg)] bg-paper p-6 shadow-lift ring-1 ring-navy/5 sm:p-9">
              <h3 className="font-display text-2xl text-navy">
                Estimate your subsidy
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                A rough guide using current CCS rates.
              </p>

              <div className="mt-7 flex flex-col gap-7">
                <Slider
                  id="income"
                  label="Family income (per year)"
                  value={fmt(income)}
                  min={40_000}
                  max={350_000}
                  step={5_000}
                  raw={income}
                  onChange={setIncome}
                />
                <Slider
                  id="days"
                  label="Days per week"
                  value={`${days} ${days === 1 ? "day" : "days"}`}
                  min={1}
                  max={5}
                  step={1}
                  raw={days}
                  onChange={setDays}
                />
                <Slider
                  id="fee"
                  label="Daily fee (sample — confirm with us)"
                  value={fmt(dailyFee)}
                  min={90}
                  max={180}
                  step={5}
                  raw={dailyFee}
                  onChange={setDailyFee}
                />
              </div>

              {/* Result */}
              <div className="mt-8 rounded-[var(--radius)] bg-brand-green-100 p-6 text-center">
                <p className="text-sm font-medium text-brand-green-deep">
                  Estimated CCS {rate}% · you may pay around
                </p>
                <p className="mt-1 font-display text-5xl font-bold text-navy">
                  {fmt(outOfPocket)}
                  <span className="text-xl font-medium text-ink-soft"> /week</span>
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  after an estimated {fmt(subsidy)} subsidy
                </p>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-faint">
                <Info className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.8} />
                {fees.estimator.note}
              </p>

              <Button asChild className="mt-6 w-full" variant="brand">
                <a href="#book">Get your exact quote on a tour</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink-soft">
          {label}
        </label>
        <span className="font-display text-xl font-bold text-navy">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-brand-green"
      />
    </div>
  );
}
