import React from "react";
import Skeleton from "./Skeleton";

/* ──────────────────────────────────────────────
   Hero Section Skeleton
   Mirrors the actual Hero layout exactly:
   - Top header (badge + h1 + logos row | desc)
   - Large dashboard mockup card
   - Proof band (headline + 3 stat counters)
────────────────────────────────────────────── */
export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)]">
      <div className="mx-auto max-w-[1600px] px-6 pb-14 pt-15 sm:px-10 sm:pt-19 lg:px-16 lg:pt-21">
        {/* Header split */}
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-13">
          {/* Left: badge + h1 + logos */}
          <div className="w-full lg:w-[50%] lg:max-w-[800px]">
            <Skeleton className="mb-6 h-7 w-52 rounded-full" />
            <Skeleton className="h-14 w-full max-w-[480px] rounded-xl" />
            <Skeleton className="mt-3 h-10 w-3/4 max-w-[360px] rounded-xl" />
            <div className="mt-7 flex flex-wrap items-center gap-8">
              <Skeleton className="h-14 w-32 rounded-lg sm:h-16" />
              <Skeleton className="h-14 w-28 rounded-lg sm:h-16" />
              <Skeleton className="h-14 w-36 rounded-lg sm:h-16" />
            </div>
          </div>
          {/* Right: description */}
          <div className="flex w-full flex-col gap-3 lg:w-[42%]">
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-5/6 rounded-md" />
            <Skeleton className="h-5 w-4/5 rounded-md" />
            <Skeleton className="h-5 w-3/4 rounded-md" />
          </div>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="mx-auto max-w-[1600px] px-4 pb-10 sm:px-8 sm:pb-13 lg:px-12">
        <Skeleton className="w-full rounded-[var(--radius-lg)] h-[420px] sm:h-[520px] lg:h-[580px]" />
      </div>

      {/* Proof band */}
      <div className="mx-auto max-w-[1600px] px-6 pb-20 pt-4 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48 rounded-lg" />
            <Skeleton className="h-9 w-40 rounded-lg" />
          </div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-8 sm:gap-x-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-12 w-24 rounded-lg sm:h-16 sm:w-28" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Feature Section Skeleton
   4-card grid + section header
────────────────────────────────────────────── */
export function FeatureSkeleton() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1450px] space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <Skeleton className="h-5 w-52 mx-auto rounded-full" />
          <Skeleton className="h-10 w-96 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-5 w-72 mx-auto max-w-full rounded-md" />
          <Skeleton className="h-5 w-80 mx-auto max-w-full rounded-md" />
        </div>
        {/* 4-Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[360px] w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Solutions Section Skeleton
   2×2 bento grid of visual card + text pairs
────────────────────────────────────────────── */
export function SolutionsSkeleton() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14 max-w-3xl mx-auto text-center lg:mb-20 space-y-3 sm:space-y-4">
          <Skeleton className="h-4 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 w-96 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded-md" />
          <Skeleton className="h-5 w-5/6 max-w-xl mx-auto rounded-md" />
        </div>
        {/* 2×2 grid */}
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
              <Skeleton className="w-full sm:w-[55%] shrink-0 h-48 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-6 w-full rounded-lg" />
                <Skeleton className="h-6 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-md mt-2" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/6 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Testimonials Section Skeleton
   Header + Card 1 (image + dark box) + Card 2
   + Bottom row (dark box + image)
────────────────────────────────────────────── */
export function TestimonialsSkeleton() {
  return (
    <section className="px-0 py-10">
      <div className="mx-auto max-w-[1450px]">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center space-y-3">
          <Skeleton className="h-4 w-44 mx-auto rounded-full" />
          <Skeleton className="h-9 w-72 mx-auto max-w-full rounded-xl" />
        </div>
        {/* Layout */}
        <div className="space-y-5">
          {/* Row 1 */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Card 1 */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end lg:w-[58%]">
              <Skeleton variant="arch" className="w-full flex-shrink-0 h-72 sm:h-auto sm:self-stretch sm:w-48" />
              <Skeleton className="h-72 sm:flex-1 sm:self-stretch w-full rounded-[var(--radius-xl)]" />
            </div>
            {/* Card 2 */}
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[42%]">
              <div className="flex sm:w-48 sm:flex-shrink-0 lg:w-full lg:justify-end">
                <Skeleton variant="arch" className="w-full sm:w-48 lg:w-[57%] h-72 lg:h-72" />
              </div>
              <Skeleton className="w-full h-40 rounded-[var(--radius-xl)] sm:flex-1" />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="w-full sm:flex-1 h-52 rounded-[var(--radius-xl)]" />
            <Skeleton className="w-full flex-shrink-0 h-72 sm:h-60 sm:w-48 rounded-[var(--radius-xl)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   GrowthBanner Section Skeleton
   Full-width banner with overlay text area
────────────────────────────────────────────── */
export function GrowthBannerSkeleton({ className = "" }: { className?: string }) {
  return (
    <section className={`py-12 md:py-20 lg:py-24 ${className}`}>
      <Skeleton className="w-full rounded-3xl md:rounded-[36px] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px]" />
    </section>
  );
}

/* ──────────────────────────────────────────────
   Integrations Section Skeleton
   Compatibility band + PMS & OTA grid/strip
────────────────────────────────────────────── */
export function IntegrationsSkeleton() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1450px] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Skeleton className="h-4 w-40 mx-auto rounded-full" />
          <Skeleton className="h-8 w-80 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-4 w-96 mx-auto max-w-full rounded-md" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   How It Works Section Skeleton
   3-step cards with numbers and preview layout
────────────────────────────────────────────── */
export function HowItWorksSkeleton() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1450px] space-y-12 sm:space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Skeleton className="h-4 w-36 mx-auto rounded-full" />
          <Skeleton className="h-9 w-96 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-4 w-full max-w-lg mx-auto rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[380px] w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Pricing Section Skeleton
   Toggle + 3 tiers with feature list
────────────────────────────────────────────── */
export function PricingSkeleton() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1450px] space-y-10 sm:space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-4 w-32 mx-auto rounded-full" />
          <Skeleton className="h-9 w-96 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
          <Skeleton className="h-10 w-56 mx-auto rounded-full mt-6" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[520px] w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FAQ Section Skeleton
   Header + 6 accordion items
────────────────────────────────────────────── */
export function FaqSkeleton() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[980px] space-y-10">
        <div className="text-center space-y-3">
          <Skeleton className="h-4 w-32 mx-auto rounded-full" />
          <Skeleton className="h-9 w-80 mx-auto max-w-full rounded-xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

