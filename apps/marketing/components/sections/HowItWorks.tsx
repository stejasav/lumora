"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { HowItWorksSkeleton } from "@/components/ui/SectionSkeletons";
import {
  Link2,
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

interface StepItem {
  step: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ElementType;
  preview: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    tag: "15-minute setup",
    title: "Connect your property",
    description:
      "Link your PMS, channel manager, and select your local competitor set. Lumora begins ingesting historical bookings and live inventory instantly.",
    icon: Link2,
    preview: (
      <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--text-primary)]">Opera PMS Sync</span>
          <span className="flex items-center gap-1 font-medium text-[var(--success)]">
            <CheckCircle2 className="h-3.5 w-3.5" /> Connected
          </span>
        </div>
        <div className="flex items-center justify-between text-[var(--text-secondary)]">
          <span>Comp-set tracked</span>
          <span className="font-mono font-semibold text-[var(--text-primary)]">4 properties</span>
        </div>
        <div className="flex items-center justify-between text-[var(--text-secondary)]">
          <span>Distribution nodes</span>
          <span className="font-mono font-semibold text-[var(--text-primary)]">6 live OTAs</span>
        </div>
        <div className="mt-2 rounded-lg bg-[var(--surface)] p-2 text-[11px] text-[var(--text-muted)] border border-[var(--border)]">
          Zero manual spreadsheets or CSV imports needed.
        </div>
      </div>
    ),
  },
  {
    step: "02",
    tag: "Autonomous monitoring",
    title: "24/7 Market surveillance",
    description:
      "While you sleep, Lumora models flight search volumes, city events, rival rate adjustments, and pace curves to forecast true demand.",
    icon: Activity,
    preview: (
      <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--text-primary)]">Market Signal</span>
          <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
            High Surge
          </span>
        </div>
        <p className="text-[11.5px] leading-snug text-[var(--text-secondary)]">
          Regional festival detected for Oct 17 to 19. Competitor ADR raised 14% across 3 nearby properties.
        </p>
        <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/70 text-[var(--text-secondary)]">
          <span>Surge confidence</span>
          <span className="font-semibold text-[var(--primary)]">98% probability</span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    tag: "Transparent execution",
    title: "Review or autopilot",
    description:
      "Wake up to a single 7:00 AM morning digest with explainable rate actions. Approve with one click, or enable autopilot within your custom safety limits.",
    icon: Sparkles,
    preview: (
      <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--text-primary)]">Morning Briefing</span>
          <span className="text-[10px] text-[var(--text-muted)]">7:00 AM</span>
        </div>
        <div className="rounded-lg bg-[var(--primary)]/10 p-2 border border-[var(--primary)]/20 text-[11.5px] text-[var(--primary)] font-medium">
          Raise Deluxe King rates by 16% (₹8,200 → ₹9,500)
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px] text-[var(--text-secondary)]">
          <span>Projected yield lift</span>
          <span className="font-semibold text-[var(--success)]">+₹3,42,000</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) return <HowItWorksSkeleton />;

  return (
    <section className="py-14 sm:py-20 lg:py-24">
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
            How it works
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] sm:text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]">
            From zero to autonomous revenue
            <br className="hidden sm:inline" /> in three simple steps.
          </h2>
          <p className="mx-auto text-[length:var(--text-sm)] sm:text-[length:var(--text-base)] leading-relaxed text-[var(--text-secondary)]">
            You do not need a degree in data science or hours of manual analysis. Lumora does 
            the heavy lifting in the background so you can focus on guest hospitality.
          </p>
        </motion.div>

        {/* 3-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={fadeUp}
                custom={prefersReducedMotion ? 0 : 0.12 * idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                // whileHover={prefersReducedMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-[0_16px_40px_-15px_rgba(43,28,29,0.08)] hover:shadow-[0_24px_55px_-12px_rgba(104,29,38,0.16)] hover:border-[var(--secondary)]/40 transition-all duration-300"
              >
                <div>
                  {/* Top Row: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--primary)] font-mono opacity-85 group-hover:opacity-100 transition-opacity">
                      {item.step}
                    </span>
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--primary)] text-[var(--surface)] transition-all duration-300">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Badge & Title */}
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* UI Preview Box */}
                <div className="pt-2">
                  {item.preview}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
