"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { SolutionsSkeleton } from "@/components/ui/SectionSkeletons";
import {
  Radar,
  PieChart,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

/* ——— animation constants ——— */

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ================================================================
   Visual components — bespoke animated cards per capability
   ================================================================ */

/* ——— 1. Comp-set position table ——— */

function CompetitorVisual() {
  const prefersReducedMotion = useReducedMotion();

  const rows = [
    { name: "Harbor View Suites", rate: "₹17,850", you: false },
    { name: "Fairmont Ridge Inn", rate: "₹16,800", you: true },
    { name: "The Wayfare Hotel", rate: "₹16,425", you: false },
    { name: "Northgate Lodge", rate: "₹15,450", you: false },
  ];

  return (
    <div className="relative pb-7">
      {/* Main card */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -3 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_-20px_rgba(43,28,29,0.14)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-16px_rgba(43,28,29,0.20)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
            Comp set position
          </span>
          <Radar
            className="h-4 w-4 text-[var(--secondary)]"
            strokeWidth={1.6}
          />
        </div>

        <ul className="space-y-1.5">
          {rows.map((r, i) => (
            <motion.li
              key={r.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }}
              className={`flex items-center justify-between rounded-[10px] px-3 py-2 text-[13px] transition-colors ${r.you
                  ? "border border-[var(--primary)]/20 bg-[var(--surface-alt)] font-semibold text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
                }`}
            >
              <span>{r.you ? `${r.name} (you)` : r.name}</span>
              <span className="font-mono">{r.rate}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Floating position alert badge */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 14, scale: 0.92 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
        className="absolute -bottom-1 right-1 max-w-[190px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_16px_44px_-14px_rgba(43,28,29,0.22)] sm:right-[-6px]"
      >
        <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)]">
          Position alert
        </span>
        <p className="text-[11.5px] leading-snug text-[var(--text-secondary)]">
          Priced{" "}
          <span className="font-semibold text-[var(--primary)]">6% below</span>{" "}
          comp set avg — room to move.
        </p>
      </motion.div>
    </div>
  );
}

/* ——— 2. Channel performance donut ——— */

function MarketingVisual() {
  const prefersReducedMotion = useReducedMotion();

  const channels = [
    { name: "Direct", revenue: "₹1,38,000" },
    { name: "OTA", revenue: "₹84,000" },
    { name: "Metasearch", revenue: "₹51,750" },
  ];

  const R = 28;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_-20px_rgba(43,28,29,0.14)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-16px_rgba(43,28,29,0.20)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
          Channel performance
        </span>
        <PieChart
          className="h-4 w-4 text-[var(--secondary)]"
          strokeWidth={1.6}
        />
      </div>

      <div className="mb-4 flex items-center gap-3.5">
        <svg
          viewBox="0 0 72 72"
          className="h-14 w-14 shrink-0 -rotate-90"
        >
          <circle
            cx="36"
            cy="36"
            r={R}
            fill="none"
            stroke="var(--divider)"
            strokeWidth="7"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={prefersReducedMotion ? { strokeDashoffset: C * 0.28 } : { strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * 0.28 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          />
        </svg>
        <div>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="font-mono text-[20px] font-semibold text-[var(--text-primary)]"
          >
            4.2x
          </motion.div>
          <div className="text-[11px] text-[var(--text-muted)]">
            Blended return on spend
          </div>
        </div>
      </div>

      <ul className="space-y-1.5 border-t border-[var(--divider)] pt-3">
        {channels.map((c, i) => (
          <motion.li
            key={c.name}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.08, ease: EASE }}
            className="flex items-center justify-between text-[13px] text-[var(--text-secondary)]"
          >
            <span>{c.name}</span>
            <span className="font-mono text-[var(--text-primary)]">
              {c.revenue}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ——— 3. Demand forecast bars ——— */

function ForecastVisual() {
  const prefersReducedMotion = useReducedMotion();

  const weeks = [
    { label: "This week", occ: 78, revpar: "₹13,200", highlight: false },
    { label: "Next week", occ: 85, revpar: "₹14,800", highlight: true },
    { label: "Week +2", occ: 72, revpar: "₹12,100", highlight: false },
  ];

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_-20px_rgba(43,28,29,0.14)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-16px_rgba(43,28,29,0.20)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
          Demand forecast
        </span>
        <TrendingUp
          className="h-4 w-4 text-[var(--secondary)]"
          strokeWidth={1.6}
        />
      </div>

      <div className="space-y-2">
        {weeks.map((w, idx) => (
          <div
            key={w.label}
            className={`rounded-[10px] px-3 py-2.5 ${w.highlight
                ? "border border-[var(--primary)]/20 bg-[var(--surface-alt)]"
                : ""
              }`}
          >
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[var(--text-muted)]">{w.label}</span>
              <span className="font-mono font-medium text-[var(--text-primary)]">
                {w.revpar}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2.5">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--divider)]">
                <motion.div
                  initial={prefersReducedMotion ? { width: `${w.occ}%` } : { width: "0%" }}
                  whileInView={{ width: `${w.occ}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    delay: 0.2 + idx * 0.12,
                    ease: EASE,
                  }}
                  className="h-full rounded-full bg-[var(--accent)]"
                />
              </div>
              <span className="w-8 text-right font-mono text-[10.5px] font-medium text-[var(--text-primary)]">
                {w.occ}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ——— 4. Conversation chat bubbles ——— */

function ConversationVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_64px_-20px_rgba(43,28,29,0.14)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-16px_rgba(43,28,29,0.20)]"
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-[var(--divider)] bg-[var(--surface-alt)] px-5 py-3">
        <MessageCircle
          className="h-4 w-4 text-[var(--secondary)]"
          strokeWidth={1.6}
        />
        <span className="text-[12px] font-medium text-[var(--text-secondary)]">
          Ask Lumora
        </span>
      </div>

      {/* Chat */}
      <div className="space-y-3 p-5">
        {/* User bubble */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 14 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
          className="ml-auto max-w-[82%] rounded-xl rounded-tr-sm bg-[var(--primary)] px-4 py-2.5 text-[13px] text-[var(--background)]"
        >
          Why did Tuesday underperform?
        </motion.div>

        {/* Assistant bubble */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -14, y: 6 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="max-w-[90%] rounded-xl rounded-tl-sm border border-[var(--divider)] bg-[var(--surface-alt)] px-4 py-3 text-[13px] leading-relaxed text-[var(--text-secondary)]"
        >
          Two corporate accounts shifted their usual Tue–Wed stay to next week,
          likely tied to a conference date change.
          <div className="mt-2 font-mono text-[10.5px] text-[var(--secondary)]">
            Confidence 84% · Source: PMS pace, comp set feed
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface Capability {
  id: string;
  kicker: string;
  heading: string;
  body: string;
  Visual: React.FC;
}

const CAPABILITIES: Capability[] = [
  {
    id: "competitor",
    kicker: "Competitor intelligence",
    heading:
      "Know exactly where you stand — every hour, not once a quarter.",
    body: "Lumora tracks your comp set\u2019s rates, availability, and positioning around the clock, turning raw rate-shopping data into a plain-language read on where you sit and what to do about it.",
    Visual: CompetitorVisual,
  },
  {
    id: "marketing",
    kicker: "Marketing intelligence",
    heading: "See which channels are actually paying you back.",
    body: "Direct, OTA, metasearch, paid \u2014 Lumora reconciles spend and revenue across every channel and tells you where to lean in, before the monthly report would have.",
    Visual: MarketingVisual,
  },
  {
    id: "forecast",
    kicker: "Revenue forecasting",
    heading:
      "See demand before it arrives — and price ahead of it.",
    body: "Lumora models booking pace, seasonal patterns, and local demand signals to project occupancy and RevPAR week by week, so you\u2019re adjusting before the market moves.",
    Visual: ForecastVisual,
  },
  {
    id: "conversations",
    kicker: "AI conversations",
    heading: "Ask, and get an answer with the reasoning attached.",
    body: "No dashboards to interpret. Ask a real question the way you\u2019d ask a revenue manager, and get a direct answer back \u2014 grounded in your data, with the source shown.",
    Visual: ConversationVisual,
  },
];

function TextBlock({
  kicker,
  heading,
  body,
}: {
  kicker: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--secondary)]">
        {kicker}
      </div>
      <h3 className="text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--text-primary)] sm:text-[19px]">
        {heading}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        {body}
      </p>
    </div>
  );
}

export default function Solutions() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) return <SolutionsSkeleton />;

  return (
    <section
      id="solutions"
      className="scroll-mt-16 py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        {/* ——— Section header ——— */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-14 max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-2 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-[var(--secondary)]">
            <span className="h-px w-5 bg-[var(--secondary)]" />
            What Lumora does
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[34px] lg:text-[40px]">
            One strategist. Four very different jobs.
          </h2>
          <p className="mx-auto max-w-2xl text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
            Each runs continuously in the background. Lumora surfaces what
            matters, explains why, and shows its confidence so you&apos;re
            never starting from a blank dashboard.
          </p>
        </motion.div>

        {/* ——— Bento container ——— */}
        <div className="relative">
          {/* Subtle container background */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[var(--surface-alt)]/25 lg:-inset-8"
          />

          {/* Soft decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-[300px] w-[300px] rounded-full bg-[var(--primary)]/[0.025] blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-[260px] w-[260px] rounded-full bg-[var(--accent)]/[0.035] blur-[90px]"
          />

          {/* Center vertical connector line (desktop) */}
          <motion.div
            aria-hidden
            initial={prefersReducedMotion ? {} : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: EASE }}
            className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 origin-top lg:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--border) 15%, var(--border) 85%, transparent)",
            }}
          />

          {/* Connection nodes (desktop) */}
          <motion.div
            aria-hidden
            initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            className="pointer-events-none absolute left-1/2 top-[28%] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] lg:block"
          />
          <motion.div
            aria-hidden
            initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            className="pointer-events-none absolute bottom-[28%] left-1/2 hidden h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] lg:block"
          />

          {/* ——— 2 × 2 grid ——— */}
          <div className="relative grid gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-20">
            {CAPABILITIES.map((cap, i) => {
              const isRightColumn = i % 2 === 1;
              const Visual = cap.Visual;

              return (
                <motion.div
                  key={cap.id}
                  variants={prefersReducedMotion ? fadeUp : cardReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7"
                >
                  {/* Visual card */}
                  <div
                    className={`w-full sm:w-[55%] shrink-0 ${isRightColumn ? "sm:order-last" : ""
                      }`}
                  >
                    <Visual />
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <TextBlock
                      kicker={cap.kicker}
                      heading={cap.heading}
                      body={cap.body}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}