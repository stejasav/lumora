"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { IntegrationsSkeleton } from "@/components/ui/SectionSkeletons";
import { CheckCircle2, RefreshCw, Zap, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

interface IntegrationItem {
  name: string;
  category: "PMS" | "Channel Manager" | "OTA";
  badge: string;
  detail: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "Opera Cloud",
    category: "PMS",
    badge: "Oracle Certified",
    detail: "Direct two-way reservation & rate synchronization",
  },
  {
    name: "Cloudbeds",
    category: "PMS",
    badge: "Preferred Partner",
    detail: "Instant inventory updates & dynamic room pricing",
  },
  {
    name: "Mews",
    category: "PMS",
    badge: "Open API",
    detail: "Real-time guest folio & automated rate distribution",
  },
  {
    name: "eZee Absolute",
    category: "PMS",
    badge: "Certified",
    detail: "Full yield management & live calendar sync",
  },
  {
    name: "Hotelogix",
    category: "PMS",
    badge: "Enterprise",
    detail: "Multi-property rate strategy & pacing integration",
  },
  {
    name: "SiteMinder",
    category: "Channel Manager",
    badge: "Live Exchange",
    detail: "Sub-second rate push across all online channels",
  },
  {
    name: "Booking.com",
    category: "OTA",
    badge: "Direct Feed",
    detail: "Automated parity surveillance & promotion sync",
  },
  {
    name: "MakeMyTrip",
    category: "OTA",
    badge: "Strategic Feed",
    detail: "Domestic demand intelligence & pricing guardrails",
  },
  {
    name: "Agoda",
    category: "OTA",
    badge: "Two-Way Feed",
    detail: "Flash deal monitoring & commission leak prevention",
  },
  {
    name: "Expedia Partner",
    category: "OTA",
    badge: "Wholesale Guard",
    detail: "Uncapped parity monitoring & instant rate updates",
  },
  {
    name: "Airbnb",
    category: "OTA",
    badge: "Direct Sync",
    detail: "Length of stay restrictions & seasonal yield rules",
  },
  {
    name: "Universal Webhook",
    category: "PMS",
    badge: "Custom API",
    detail: "Connect proprietary systems or custom booking engines",
  },
];

const PERKS = [
  {
    icon: RefreshCw,
    title: "15-minute connection",
    description: "Connect via one-click OAuth or secure API keys with zero engineering work required.",
  },
  {
    icon: Zap,
    title: "Sub-second parity sync",
    description: "Whenever a rate update is triggered, it distributes across your comp-set and OTAs instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Zero double-booking guarantee",
    description: "Centralized live inventory checks protect your property from overbooking across channels.",
  },
];

export default function Integrations() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) return <IntegrationsSkeleton />;

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-b border-[var(--border)]">
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
            Seamless Ecosystem
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] sm:text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-[1.15]">
            Works with your existing
            <br className="hidden sm:inline" /> hotel technology stack.
          </h2>
          <p className="mx-auto text-[length:var(--text-sm)] sm:text-[length:var(--text-base)] leading-relaxed text-[var(--text-secondary)]">
            No need to replace your software or hire technical staff. Lumora seamlessly plugs into 
            your current PMS, channel manager, and OTAs within 15 minutes.
          </p>
        </motion.div>

        {/* Integration Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {INTEGRATIONS.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              custom={prefersReducedMotion ? 0 : 0.04 * idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_10px_25px_-12px_rgba(43,28,29,0.06)] hover:border-[var(--secondary)]/40 hover:shadow-[0_16px_35px_-10px_rgba(104,29,38,0.12)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" title="Live sync ready" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                  {item.name}
                </h3>
              </div>
              <p className="mt-3 text-[11px] leading-tight text-[var(--text-muted)] line-clamp-2">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Perks Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--border)]/60">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                custom={prefersReducedMotion ? 0 : 0.1 * i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-xl bg-[var(--surface-alt)]/60 border border-[var(--border)]/50"
              >
                <div className="shrink-0 p-2.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {perk.description}
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
