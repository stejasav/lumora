"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { GrowthBannerSkeleton } from "@/components/ui/SectionSkeletons";

interface GrowthBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GrowthBanner({
  title = "Open the door to growth with Lumora",
  description = "Get a personalized demo and see how Lumora can revolutionize your property and revenue.",
  buttonText = "Get Started",
  buttonHref = "#demo",
  imageSrc = "/img1.png",
  className = "",
}: GrowthBannerProps) {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) return <GrowthBannerSkeleton className={className} />;

  return (
    <section className={`py-12 md:py-20 lg:py-24 ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-full overflow-hidden rounded-3xl md:rounded-[36px] border border-[var(--border)] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] flex items-center shadow-[0_24px_60px_-15px_rgba(43,28,29,0.12)]"
      >
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1900px"
          className="object-cover object-center transition-transform duration-1000 hover:scale-105"
        />

        {/* Subtle Dark Overlay Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent sm:from-black/55 sm:via-black/25 sm:to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl px-6 py-10 sm:px-12 md:px-16 lg:px-20 text-surface space-y-6 sm:space-y-8">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-surface drop-shadow-sm max-w-xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="text-sm sm:text-base md:text-lg pt-2 text-surface/90 font-normal leading-relaxed max-w-lg drop-shadow-sm"
          >
            {description}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="pt-2"
          >
            <Link
              href={buttonHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider !text-[#681d26] shadow-lg transition-all duration-300 hover:bg-white/95 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
