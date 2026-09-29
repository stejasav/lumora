"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { PricingSkeleton } from "@/components/ui/SectionSkeletons";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  rooms: string;
  priceMonthly: string;
  priceAnnual: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
}

const PLANS: PricingPlan[] = [
  {
    id: "boutique",
    name: "Boutique & Heritage",
    tagline: "Essential market intelligence and competitor tracking for small properties.",
    rooms: "Up to 25 rooms",
    priceMonthly: "₹5,999",
    priceAnnual: "₹4,799",
    period: "/ month",
    features: [
      "Up to 25 rooms tracked",
      "Comp-set monitor (up to 4 properties)",
      "Daily 7:00 AM rate recommendations",
      "Single-click rate execution",
      "OTA parity alert notifications",
      "WhatsApp and email morning digest",
      "Standard email support",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "#demo",
  },
  {
    id: "hotel",
    name: "Independent Hotel",
    popular: true,
    badge: "Most Popular",
    tagline: "Full dynamic revenue automation with two-way PMS sync and parity guardrails.",
    rooms: "26 to 80 rooms",
    priceMonthly: "₹11,999",
    priceAnnual: "₹9,599",
    period: "/ month",
    features: [
      "Up to 80 rooms tracked",
      "Comp-set monitor (up to 8 properties)",
      "Two-way PMS and channel manager sync",
      "Automated dynamic rate autopilot",
      "Instant OTA commission leak protection",
      "Forward demand forecast (365 days)",
      "Ask Lumora AI revenue copilot",
      "Priority WhatsApp and phone support",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "#demo",
  },
  {
    id: "resort",
    name: "Resort & Group",
    tagline: "Institutional revenue infrastructure for high-inventory or multi-property groups.",
    rooms: "80+ rooms or multi-unit",
    priceMonthly: "₹24,999",
    priceAnnual: "₹19,999",
    period: "/ month",
    features: [
      "Unlimited rooms & multi-property overview",
      "Custom comp-set clusters (unlimited)",
      "Two-way multi-property PMS sync",
      "Group booking displacement analysis",
      "Custom event and regional surge modeling",
      "Dedicated Revenue Strategist support",
      "Custom API and webhook integrations",
      "99.9% uptime SLA guarantee",
    ],
    cta: "Schedule Consultation",
    ctaHref: "#demo",
  },
];

export default function Pricing() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const [annual, setAnnual] = useState(true);

  if (!mounted) return <PricingSkeleton />;

  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1450px] space-y-12 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-[var(--secondary)]">
            <span className="h-px w-5 bg-[var(--secondary)]" />
            Pricing
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] sm:text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]">
            Simple, honest pricing built
            <br className="hidden sm:inline" /> for independent hoteliers.
          </h2>
          <p className="mx-auto text-[length:var(--text-sm)] sm:text-[length:var(--text-base)] leading-relaxed text-[var(--text-secondary)]">
            Choose the plan tailored to your room inventory. Every plan includes a 14-day free trial with
            zero credit card commitment and zero setup charges.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs sm:text-sm font-medium transition-colors ${!annual ? "text-[var(--primary)] font-semibold" : "text-[var(--text-secondary)]"}`}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                annual ? "bg-[var(--primary)]" : "bg-[var(--border)]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  annual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors ${annual ? "text-[var(--primary)] font-semibold" : "text-[var(--text-secondary)]"}`}>
              Annual
              <span className="rounded-full bg-[var(--secondary)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)] tracking-wide">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PLANS.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                custom={prefersReducedMotion ? 0 : 0.1 * idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={prefersReducedMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`relative flex flex-col justify-between rounded-[var(--radius-xl)] p-7 sm:p-8 transition-all duration-300 ${
                  isPopular
                    ? "border-2 border-[var(--secondary)] bg-[var(--surface)] shadow-[0_24px_60px_-15px_rgba(104,29,38,0.22)]"
                    : "border border-[var(--border)] bg-[var(--surface)] shadow-[0_16px_40px_-15px_rgba(43,28,29,0.08)] hover:border-[var(--secondary)]/30 hover:shadow-[0_20px_50px_-12px_rgba(43,28,29,0.14)]"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-surface shadow-md">
                      <Sparkles className="h-3 w-3 text-[var(--secondary)]" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Title and Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider">
                      {plan.rooms}
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="my-6 pb-6 border-b border-[var(--border)]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
                        {annual ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      <span className="text-xs sm:text-sm text-[var(--text-muted)] font-normal">
                        {plan.period}
                      </span>
                    </div>
                    {annual && (
                      <span className="text-[11px] text-[var(--success)] font-medium mt-1 block">
                        Billed annually (save 20%)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                      Included in this plan:
                    </span>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        <div className="shrink-0 mt-0.5 rounded-full bg-[var(--secondary)]/15 p-0.5 text-[var(--secondary)]">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href={plan.ctaHref}
                    className={`group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isPopular
                        ? "bg-[var(--primary)] text-surface hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg"
                        : "border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-surface"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
            <span>14-day free trial on all plans</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
            <span>No credit card required to start</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
            <span>Cancel or adjust plans anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
