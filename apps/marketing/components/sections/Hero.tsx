"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { HeroSkeleton } from "@/components/ui/SectionSkeletons";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  Zap,
  Compass,
  ChevronDown,
  User,
  BarChart3,
  CalendarDays,
  PieChart,
  Award,
  ShieldCheck,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = (staggerChildren = 0.1, delay = 0) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren, delayChildren: delay } },
});

const KPIS = [
  { label: "Rooms sold", value: "214", delta: "+11%" },
  { label: "ADR", value: "₹8,200", delta: "+20%" },
  { label: "Occupancy", value: "88%", delta: "+14%" },
  { label: "RevPAR", value: "₹7,240", delta: "+37%" },
  { label: "Monthly revenue", value: "₹18.6L", delta: "+33%" },
] as const;

const INSIGHTS = [
  {
    id: "pricing",
    tabLabel: "Rate strategy",
    cycleWord: "pricing decision",
    badge: "Action required",
    time: "7:00 AM today",
    summary:
      "A regional event pushed local room searches up 34% for Oct 17–19. Three comp-set properties raised ADR in the last 4 hours.",
    recommendation:
      "Raise Deluxe & Premium King rates 16% (₹8,200 → ₹9,500). Hold Standard inventory open to catch overflow.",
    impact: "+₹3,42,000",
    impactLabel: "projected weekend yield",
    confidence: 98,
  },
  {
    id: "forecast",
    tabLabel: "Pacing & demand",
    cycleWord: "demand forecast",
    badge: "Opportunity",
    time: "7:00 AM today",
    summary:
      "Direct bookings are pacing 8.2% ahead of last year. Thursday-arrival length of stay stretched from 1.8 to 2.7 nights.",
    recommendation:
      "Apply a 3-night minimum on high-demand dates to protect yield on the softer Sunday check-outs.",
    impact: "+14%",
    impactLabel: "occupancy stabilization",
    confidence: 96,
  },
  {
    id: "channel",
    tabLabel: "Parity & OTA",
    cycleWord: "parity correction",
    badge: "Auto-resolved",
    time: "6:45 AM today",
    summary:
      "Expedia listed Standard Suites ₹1,400 below direct rate after an unaligned wholesale feed — corrected before a single booking landed on it.",
    recommendation:
      "Automated channel correction applied. Direct-rate parity restored across every distribution node.",
    impact: "₹89,000",
    impactLabel: "commission leak avoided",
    confidence: 100,
  },
] as const;

const STATS = [
  { target: 14, suffix: "%", prefix: "+", label: "Average RevPAR lift" },
  { target: 6, suffix: "hr", label: "Saved per week" },
  { target: 300, suffix: "+", label: "Properties on Lumora" },
] as const;

const SIDEBAR_ITEMS = [
  { id: "analytics", icon: BarChart3, active: true },
  { id: "calendar", icon: CalendarDays, active: false },
  { id: "reports", icon: PieChart, active: false },
  { id: "profile", icon: User, active: false },
] as const;

export default function Hero() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof INSIGHTS)[number]["id"]>("pricing");
  const active = INSIGHTS.find((i) => i.id === activeId)!;
  const activeIndex = INSIGHTS.findIndex((i) => i.id === activeId);

  // All hooks must be declared before any early return
  // Headline word cycles through the same three categories as the tabs below
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setActiveId((curr) => {
        const i = INSIGHTS.findIndex((x) => x.id === curr);
        return INSIGHTS[(i + 1) % INSIGHTS.length].id;
      });
    }, 3400);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // Subtle mouse tilt on the product frame — not a scroll-jack, just depth.
  const frameRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [3, -3]), {
    stiffness: 150,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 150,
    damping: 24,
  });

  // Early return after all hooks — safe per Rules of Hooks
  if (!mounted) return <HeroSkeleton />;

  function handleFrameMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleFrameMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[var(--background)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Header block — flexbox split matching wireframe */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-14 pt-15 sm:px-10 sm:pt-19 lg:px-16 lg:pt-21">
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-13"
        >
          {/* Left Column: Badge + Headline */}
          <div className="w-full lg:w-[50%] lg:max-w-[800px] lg:-mt-7">
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3.5 py-1.5 text-sm text-[var(--text-secondary)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Lumora OS v3.2
              </span>
              <span className="h-3 w-px bg-[var(--border)]" />
              Your AI Revenue Strategist
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            >
              The AI strategist behind every{" "}
              <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={active.cycleWord}
                    initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="inline-block text-[var(--primary)] whitespace-nowrap"
                  >
                    {active.cycleWord}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              your hotel makes.
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-15 sm:gap-10 lg:gap-12"
            >
              <Image
                src="/TravelTech.png"
                alt="TravelTech"
                width={200}
                height={65}
                className="h-14 w-auto object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-16"
              />
              <Image
                src="/hotel-tech.png"
                alt="Hotel Tech"
                width={200}
                height={65}
                className="h-14 w-auto object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-16"
              />
              <Image
                src="/hotel-visionary.png"
                alt="Hotel Visionary"
                width={200}
                height={65}
                className="h-14 w-auto object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-16"
              />
            </motion.div>
          </div>

          {/* Right Column: Description + Trust Signals */}
          <div className="flex w-full flex-col lg:w-[42%] lg:max-w-[580px] lg:self-end">
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
            >
              Demand alone does not drive revenue growth, timely execution does.
              Lumora continuously monitors market pacing, competitor rate changes,
              and channel parity to deliver high-confidence pricing actions before
              your competitors respond.
            </motion.p>

          </div>
        </motion.div>
      </div>

      {/* Signature element: the actual product, not a mockup card */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-10 sm:px-8 sm:pb-13 lg:px-12">
        <motion.div
          ref={frameRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          onMouseMove={handleFrameMouseMove}
          onMouseLeave={handleFrameMouseLeave}
          className="relative mx-auto w-full max-w-[1600px] [perspective:1600px]"
        >
          <motion.div
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative overflow-hidden rounded-[var(--radius-lg,16px)] border border-[var(--border)] bg-[var(--surface)] shadow-[0_50px_120px_-35px_rgba(43,28,29,0.25)]"
          >
            {/* App chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[var(--primary)] px-5 py-3.5 text-surface sm:px-6">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo.png"
                  alt="Lumora Logo"
                  width={24}
                  height={24}
                  className="h-5 w-auto object-contain brightness-0 invert"
                />
                <span className="text-base font-semibold tracking-tight text-surface">
                  LUMORA
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-surface/90 sm:flex">
                  <Zap className="h-3.5 w-3.5 text-surface" />
                  Live market feed
                </span>
                <button className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-surface">
                  Fairmont Ridge Inn
                  <ChevronDown className="h-3.5 w-3.5 text-surface/80" />
                </button>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-surface">
                  <User className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar rail */}
              <div className="hidden w-14 flex-col items-center gap-3 border-r border-[var(--divider)] bg-[var(--surface-alt)] py-6 sm:flex">
                {SIDEBAR_ITEMS.map(({ id, icon: Icon, active }) => (
                  <span
                    key={id}
                    className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm,10px)] transition-colors ${
                      active
                        ? "bg-[var(--primary)] text-[var(--surface)]"
                        : "cursor-pointer text-[var(--text-muted)] hover:bg-[var(--divider)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>

              {/* Workspace */}
              <div className="flex-1 p-5 sm:p-6 lg:p-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
                  {KPIS.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-[12px] border border-[var(--divider)] bg-[var(--surface-alt)] px-3.5 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)]">
                          {kpi.label}
                        </span>
                        <span className="text-2xs font-medium text-[var(--success)]">
                          {kpi.delta}
                        </span>
                      </div>
                      <div className="mt-1.5 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
                        {kpi.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabs — same order/wording as the cycling headline word */}
                <div
                  role="tablist"
                  aria-label="Insight category"
                  className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--divider)] pt-5"
                >
                  <div className="flex flex-wrap gap-2">
                    {INSIGHTS.map((item) => {
                      const isActive = item.id === activeId;
                      return (
                        <button
                          key={item.id}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveId(item.id)}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-[var(--primary)] text-[var(--surface)]"
                              : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--secondary)]"
                          }`}
                        >
                          {item.tabLabel}
                        </button>
                      );
                    })}
                  </div>
                  <span className="hidden text-xs text-[var(--text-muted)] sm:inline-block">
                    Updated 7:00 AM · Automated market digest
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    role="tabpanel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="mt-4"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 px-2.5 py-0.5 text-2xs font-medium text-[var(--success)]">
                        {active.badge}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {active.time}
                      </span>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
                      <div className="space-y-4 rounded-[14px] border border-[var(--divider)] bg-[var(--background)]/40 p-5">
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                            What happened &amp; why
                          </h4>
                          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                            {active.summary}
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                            Recommended action
                          </h4>
                          <p className="text-sm font-medium leading-relaxed text-[var(--text-primary)]">
                            {active.recommendation}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between rounded-[14px] border border-[var(--divider)] bg-[var(--surface-alt)] p-5">
                        <div>
                          <span className="text-2xs font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                            Projected yield impact
                          </span>
                          <div className="mt-1 text-2xl font-semibold text-[var(--success)]">
                            {active.impact}
                          </div>
                          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                            {active.impactLabel}
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <span>Confidence index</span>
                            <span className="text-[var(--text-primary)]">
                              {active.confidence}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--divider)]">
                            <motion.div
                              key={active.id}
                              initial={{ width: 0 }}
                              animate={{ width: `${active.confidence}%` }}
                              transition={{ duration: 0.8, ease: EASE }}
                              className="h-full bg-[var(--accent)]"
                            />
                          </div>
                          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-md,10px)] bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--surface)] transition-colors hover:bg-[var(--primary-hover)]">
                            Apply strategy
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--divider)] pt-4 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-[var(--secondary)]" />
                    Explainable AI — zero black-box recommendations
                  </div>
                  <div className="hidden text-xs sm:block">
                    PMS integration: Synced
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Proof band */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-20 pt-4 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
              Your property
              <br />
              <span className="text-[var(--primary)]">Optimized to win</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-8 sm:gap-x-16 ">
            {STATS.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUpStat({
  target,
  suffix,
  prefix = "",
  label,
}: {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, prefersReducedMotion]);

  return (
    <div ref={ref}>
      <div className="text-4xl font-semibold leading-none text-[var(--primary)] sm:text-7xl">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-[var(--text-muted)]">{label}</div>
    </div>
  );
}