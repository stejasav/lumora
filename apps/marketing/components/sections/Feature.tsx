"use client";

import React from "react";
import { Eye, RefreshCw, TrendingUp, Maximize2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { FeatureSkeleton } from "@/components/ui/SectionSkeletons";

/* ─── Animation helpers ───────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgGradient: string;
  shapeOverlay: React.ReactNode;
}

const features: FeatureCardProps[] = [
  {
    icon: Eye,
    title: "Boost visibility",
    description:
      "Place your hotel strategically and reach high-intent travelers who are ready to book.",
    bgGradient: "from-[#5a161f] via-[#431017] to-[#2c0a0e]",
    shapeOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-xl)]">
        {/* Curving swept surface accent in Lumora Gold & Amber */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[var(--secondary)]/25 via-[var(--accent)]/15 to-transparent blur-md transform -rotate-12" />
        <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--secondary)]/10 rounded-bl-full border-b border-l border-[var(--secondary)]/20" />
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: "Optimize prices",
    description:
      "Update rates automatically based on live comp-set movements, pacing, and real-time demand.",
    bgGradient: "from-[#52141c] via-[#3c0e14] to-[#26080c]",
    shapeOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-xl)]">
        {/* Lumora Signature Archway background structure */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-52 border-[10px] border-[var(--secondary)]/25 rounded-t-full bg-[var(--secondary)]/5 backdrop-blur-xs" />
        <div className="absolute bottom-0 -right-10 w-28 h-36 border-[8px] border-[var(--secondary)]/15 rounded-t-full" />
      </div>
    ),
  },
  {
    icon: TrendingUp,
    title: "Increase direct bookings",
    description:
      "Recapture revenue lost to high OTA commissions and channel traffic straight to your direct engine.",
    bgGradient: "from-[#56161e] via-[#3f1016] to-[#29090d]",
    shapeOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-xl)]">
        {/* Architectural pillar + glowing quarter circle */}
        <div className="absolute bottom-0 right-0 w-44 h-44 rounded-tl-full bg-gradient-to-br from-[var(--secondary)]/25 to-transparent border-t border-l border-[var(--secondary)]/25" />
        <div className="absolute bottom-0 left-0 w-8 h-full bg-gradient-to-r from-[var(--secondary)]/15 to-transparent" />
      </div>
    ),
  },
  {
    icon: Maximize2,
    title: "Convert & upsell",
    description:
      "A cohesive, on-brand booking journey that automatically drives room upgrades and higher ADR.",
    bgGradient: "from-[#4b1219] via-[#350b11] to-[#20060a]",
    shapeOverlay: (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius-xl)]">
        {/* Illuminated circular halo glow in Lumora Gold */}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-[12px] border-[var(--secondary)]/25 shadow-[0_0_35px_rgba(170,138,81,0.2)]" />
      </div>
    ),
  },
];

export default function Feature() {
  const mounted = useIsMounted();
  const reduced = useReducedMotion();

  if (!mounted) return <FeatureSkeleton />;

  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1450px] space-y-12 sm:space-y-16">
        {/* ── Section Header ── */}
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
            Revenue Management & Marketing
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] sm:text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]">
            Powering independent hoteliers
            <br className="hidden sm:inline" /> to play big with ease.
          </h2>
          <p className="mx-auto text-[length:var(--text-sm)] sm:text-[length:var(--text-base)] leading-relaxed text-[var(--text-secondary)]">
            Replace guesswork with continuous, automated intelligence. From live dynamic pricing
            to frictionless direct bookings, Lumora puts institutional-grade revenue tools in your hands.
          </p>
        </motion.div>

        {/* ── 4-Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={reduced ? 0 : 0.1 * idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative min-h-[360px] rounded-[var(--radius-xl)] bg-gradient-to-b ${feature.bgGradient} p-7 text-surface flex flex-col justify-between overflow-hidden border border-[var(--secondary)]/15 shadow-[0_16px_36px_-12px_rgba(43,28,29,0.2)] hover:shadow-[0_24px_50px_-10px_rgba(104,29,38,0.35)] hover:border-[var(--secondary)]/35 hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Visual Architectural Background Shapes */}
                {feature.shapeOverlay}

                {/* Subtle top-right warm glow on hover */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[var(--secondary)] opacity-0 blur-2xl group-hover:opacity-20 transition-opacity duration-500" />

                {/* Top: Minimalist Icon */}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface/10 backdrop-blur-md border border-surface/15 text-[var(--secondary)] group-hover:scale-105 group-hover:border-[var(--secondary)]/40 transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                </div>

                {/* Bottom: Text Content */}
                <div className="relative z-10 space-y-2.5">
                  <h3 className="text-[length:var(--text-lg)] font-semibold tracking-tight text-surface">
                    {feature.title}
                  </h3>
                  <p className="text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)] font-normal leading-relaxed text-surface/75">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}