"use client";

import { motion, useReducedMotion } from "framer-motion";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { useIsMounted } from "@/hooks/useIsMounted";
import { TestimonialsSkeleton } from "@/components/ui/SectionSkeletons";

/* ─── Animation helpers ───────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

/* ─── Types ───────────────────────────────────────────── */
interface Testimonial {
  id: string;
  quote: string;
  role: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right" | "top-right";
  imageStyle: "arch" | "rounded";
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Every morning used to start the exact same way for me. I would sit with my chai, opening MakeMyTrip, Booking.com, and Agoda across three tabs, second-guessing every single room rate before the day began. It was exhausting and felt like guesswork. Lumora completely transformed that routine for us. It processes city demand and competitor movements overnight, so I wake up to clear, confident recommendations with the exact reasoning right in front of me. During our peak festival weekend, we captured an 18% lift in rates before any neighboring property had even reacted.",
    role: "Boutique Hotel Owner",
    location: "Rajasthan, India",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Boutique Hotel Owner",
    imagePosition: "left",
    imageStyle: "arch",
  },
  {
    id: "t2",
    quote:
      "The parity correction alone paid for the subscription inside a week. An OTA had us listed ₹1,400 below direct rate, Lumora caught and fixed it before we even knew it happened.",
    role: "Independent Hotel GM",
    location: "Goa, India",
    imageSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Independent Hotel GM",
    imagePosition: "top-right",
    imageStyle: "arch",
  },
  {
    id: "t3",
    quote:
      "I run a 22-room property on my own. I don't have a revenue manager, and I never could have afforded one. Lumora is what I'd have hired, except it's available at 6 am and it never guesses.",
    role: "Bed & Breakfast Owner",
    location: "Coorg, India",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Bed & Breakfast Owner",
    imagePosition: "right",
    imageStyle: "rounded",
  },
];

/* ─── Quote mark SVG ──────────────────────────────────── */
function QuoteMark() {
  return (
    <svg
      aria-hidden
      width="26"
      height="20"
      viewBox="0 0 28 22"
      fill="none"
      className="mb-4 shrink-0"
    >
      <path
        d="M0 22V13.156C0 9.607.9 6.637 2.7 4.244 4.54 1.852 7.38.37 11.22 0L12.6 2.444C10.12 3.037 8.26 4.126 7.02 5.71 5.82 7.296 5.18 9.2 5.1 11.422H10.08V22H0ZM15.92 22V13.156C15.92 9.607 16.82 6.637 18.62 4.244 20.46 1.852 23.3.37 27.14 0L28.52 2.444C26.04 3.037 24.18 4.126 22.94 5.71 21.74 7.296 21.1 9.2 21.02 11.422H26V22H15.92Z"
        fill="rgba(255,255,255,0.25)"
      />
    </svg>
  );
}

/* ─── Shared dark card content ────────────────────────── */
function DarkCardContent({
  quote,
  role,
  location,
  size = "lg",
}: {
  quote: string;
  role: string;
  location: string;
  size?: "lg" | "sm";
}) {
  return (
    <>
      <div>
        <QuoteMark />
        <blockquote
          className={`font-medium leading-[1.75] text-surface ${
            size === "lg"
              ? "text-[length:var(--text-sm)] sm:text-[length:var(--text-base)]"
              : "text-[length:var(--text-xs)] sm:text-[length:var(--text-sm)]"
          }`}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
      <div className={`mt-auto ${size === "lg" ? "pt-8" : "pt-6"}`}>
        <p className="text-[length:var(--text-2xs)] font-bold uppercase tracking-wider text-surface">
          {role}
        </p>
        <p className="text-[length:var(--text-2xs)] text-surface/80 mt-0.5">
          {location}
        </p>
      </div>
    </>
  );
}

/* ─── Main Component ──────────────────────────────────── */
export default function Testimonials() {
  const mounted = useIsMounted();
  const reduced = useReducedMotion();
  const [t1, t2, t3] = TESTIMONIALS;

  if (!mounted) return <TestimonialsSkeleton />;

  return (
    <section className="px-0 py-10">
      <div className="mx-auto max-w-[1450px]">

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 sm:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.1em] text-[var(--secondary)]">
            <span className="h-px w-5 bg-[var(--secondary)]" />
            What hoteliers say
            <span className="h-px w-5 bg-[var(--secondary)]" />
          </div>
          <h2 className="text-[length:var(--text-2xl)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[length:var(--text-3xl)]">
            Trusted by independent hoteliers.
          </h2>
        </motion.div>

        {/* ── Layout grid ── */}
        <div className="space-y-5">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* ── Card 1 ── */}
            <motion.div
              variants={fadeUp}
              custom={reduced ? 0 : 0.1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-4 sm:flex-row sm:items-end lg:w-[58%]"
            >
              <div className="w-full flex-shrink-0 overflow-hidden rounded-t-full rounded-b-[var(--radius-lg)] h-72 sm:h-auto sm:self-stretch sm:w-48">
                <ImageWithSkeleton
                  src={t1.imageSrc}
                  alt={t1.imageAlt}
                  variant="arch"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Dark card */}
              <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-xl)] bg-[var(--primary)] p-6 sm:p-8 flex flex-col justify-between self-stretch sm:flex-1">
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[var(--secondary)] opacity-[0.15] blur-2xl" />
                <div className="relative flex flex-col justify-between h-full flex-1">
                  <DarkCardContent
                    quote={t1.quote}
                    role={t1.role}
                    location={t1.location}
                    size="lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Card 2 ── */}
            <motion.div
              variants={fadeUp}
              custom={reduced ? 0 : 0.2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[42%]"
            >
              {/* Arch profile image */}
              <div className="flex sm:w-48 sm:flex-shrink-0 sm:self-stretch lg:w-full lg:justify-end">
                <div className="w-full overflow-hidden rounded-t-full rounded-b-[var(--radius-lg)] h-72 sm:h-auto sm:self-stretch sm:w-48 lg:!w-[57%] lg:h-72">
                  <ImageWithSkeleton
                    src={t2.imageSrc}
                    alt={t2.imageAlt}
                    variant="arch"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
              </div>

              {/* Dark card */}
              <div className="relative w-full overflow-hidden rounded-[var(--radius-xl)] bg-[var(--primary)] p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:flex-1 self-stretch">
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[var(--secondary)] opacity-[0.15] blur-2xl" />
                <div className="relative flex flex-col justify-between h-full flex-1">
                  <DarkCardContent
                    quote={t2.quote}
                    role={t2.role}
                    location={t2.location}
                    size="sm"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom row: full-width dark card + image RIGHT ── */}
          <motion.div
            variants={fadeUp}
            custom={reduced ? 0 : 0.3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            {/* Dark card */}
            <div className="relative w-full overflow-hidden rounded-[var(--radius-xl)] bg-[var(--primary)] p-6 sm:p-8 flex flex-col justify-between min-h-[240px] sm:flex-1 self-stretch order-2 sm:order-1">
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[var(--secondary)] opacity-[0.15] blur-2xl" />
              <div className="relative flex flex-col justify-between h-full flex-1">
                <DarkCardContent
                  quote={t3.quote}
                  role={t3.role}
                  location={t3.location}
                  size="lg"
                />
              </div>
            </div>

            {/* Profile image */}
            <div className="w-full flex-shrink-0 overflow-hidden rounded-[var(--radius-xl)] h-72 sm:h-60 sm:w-48 order-1 sm:order-2">
              <ImageWithSkeleton
                src={t3.imageSrc}
                alt={t3.imageAlt}
                variant="rounded"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
