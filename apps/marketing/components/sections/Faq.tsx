"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { FaqSkeleton } from "@/components/ui/SectionSkeletons";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
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

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How long does setup take, and do I need technical staff?",
    answer:
      "Setup takes less than 15 minutes. Lumora connects directly with your PMS and Channel Manager using secure OAuth or pre-configured API keys. There is zero code to write and no hardware to install. Our hospitality onboarding team is also available on WhatsApp to guide your team.",
  },
  {
    question: "Will Lumora change my room prices automatically without my permission?",
    answer:
      "Only if you choose to enable it. Lumora operates in two modes: Recommendation Mode (default), where every proposed rate action is delivered to you at 7:00 AM with full reasoning for single-click approval, and Autopilot Mode, where rates adjust dynamically within custom price floor and ceiling guardrails set by you.",
  },
  {
    question: "Which OTAs and distribution channels does Lumora track?",
    answer:
      "Lumora monitors and synchronizes across all major online travel agencies including Booking.com, MakeMyTrip, Agoda, Expedia, and Airbnb, plus channel managers like SiteMinder and RateGain. We continuously detect rate disparity, wholesale undercutting, and unaligned promotions before bookings land on them.",
  },
  {
    question: "What size properties is Lumora built for?",
    answer:
      "Lumora is purpose-built for independent hotels, boutique resorts, heritage havelis, bed & breakfasts, and boutique stays ranging from 10 to 150+ rooms. We deliver institutional-grade revenue intelligence to properties without the overhead of hiring an in-house revenue manager.",
  },
  {
    question: "How does Lumora calculate rate recommendations?",
    answer:
      "Lumora blends your historical booking pacing, live comp-set rate movements, flight search volumes, city conventions, regional festivals, weather forecasts, and length-of-stay data. Every recommendation comes with full explainability so you always understand why a rate was adjusted.",
  },
  {
    question: "Is there a long-term contract or cancellation fee?",
    answer:
      "No. All Lumora subscriptions are month-to-month or annual with zero lock-in contracts. You can upgrade, pause, or cancel your subscription at any time with no questions asked.",
  },
];

export default function Faq() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!mounted) return <FaqSkeleton />;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-[980px] space-y-12 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-[var(--secondary)]">
            <span className="h-px w-5 bg-[var(--secondary)]" />
            Clear Answers
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] sm:text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]">
            Frequently asked questions.
          </h2>
          <p className="mx-auto text-[length:var(--text-sm)] sm:text-[length:var(--text-base)] leading-relaxed text-[var(--text-secondary)]">
            Everything you need to know about connecting Lumora to your hotel and maximizing yield.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                custom={prefersReducedMotion ? 0 : 0.05 * idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[var(--secondary)]/50 bg-[var(--surface)] shadow-[0_12px_32px_-12px_rgba(104,29,38,0.12)]"
                    : "border-[var(--border)] bg-[var(--surface)]/80 hover:border-[var(--border-hover)] hover:bg-[var(--surface)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 rounded-full p-1.5 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[var(--primary)] text-surface"
                        : "bg-[var(--surface-alt)] text-[var(--text-muted)]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]/40 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Strip */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]/70 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-[var(--text-primary)]">
              Have questions about your specific property?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Our hospitality specialists can audit your competitor set and show you live pacing data.
            </p>
          </div>
          <Link
            href="#demo"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-surface shadow-md hover:bg-[var(--primary-hover)] transition-all"
          >
            <span>Ask a specialist</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
