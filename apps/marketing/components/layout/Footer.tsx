"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Container from "@/components/layout/Container";
import { useIsMounted } from "@/hooks/useIsMounted";

const NAV_LINKS = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "#demo" },
];

export default function Footer() {
  const mounted = useIsMounted();
  const year = new Date().getFullYear();

  if (!mounted) {
    return (
      <footer
        aria-hidden="true"
        style={{ backgroundColor: "#681d26" }}
        className="relative w-full min-h-[320px]"
      />
    );
  }

  return (
    <footer
      aria-label="Site footer"
      style={{ backgroundColor: "#681d26" }}
      className="relative w-full overflow-hidden text-[var(--surface)]"
    >
      <Container className="!max-w-[1600px]">
        {/* ——— Main Top Content Grid ——— */}
        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-12 py-12 sm:py-16 md:py-20 items-start">
          {/* Left Column: Logo, Tagline, Social Icons */}
          <div className="md:col-span-5 space-y-5 sm:space-y-6">
            <Link href="/" className="flex items-center gap-3 w-fit" aria-label="Lumora home">
              <Image
                src="/logo.png"
                alt="Lumora"
                width={40}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert"
              />
              <span className="text-2xl sm:text-3xl font-bold leading-none tracking-[0.07em] uppercase text-[var(--surface)]">
                LUMORA
              </span>
            </Link>

            <p className="max-w-md text-sm sm:text-base text-[var(--surface)]/80 leading-relaxed font-normal">
              We empower independent hotels to maximize revenue and bookings with an AI-powered revenue management system.
            </p>

            <div className="flex items-center gap-4 pt-1 sm:pt-2">
              <a
                href="https://www.linkedin.com/in/tejasav-singh-63b618276/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--surface)]/80 hover:text-[var(--surface)] transition-colors"
              >
                <FaLinkedin size={22} color="var(--surface)" />
              </a>
              <a
                href="mailto:tejasavsingh2528@gmail.com"
                aria-label="Email"
                className="text-[var(--surface)]/80 hover:text-[var(--surface)] transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/stejasav"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--surface)]/80 hover:text-[var(--surface)] transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.instagram.com/stejasav/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--surface)]/80 hover:text-[var(--surface)] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Center Column: Navigation Links */}
          <div className="md:col-span-3 md:pl-6">
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-[var(--surface)]/80 hover:text-[var(--surface)] font-normal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Award Badges */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-6 sm:gap-8 pt-2 md:pt-0">
            <Image
              src="/TravelTech.png"
              alt="TravelTech Breakthrough Award"
              width={100}
              height={90}
              className="h-16 sm:h-20 w-auto object-contain"
            />
            <Image
              src="/hotel-tech.png"
              alt="Hotel Tech Report"
              width={70}
              height={90}
              className="h-16 sm:h-20 w-auto object-contain invert"
            />
            <Image
              src="/hotel-visionary.png"
              alt="Hotel Visionary Awards"
              width={110}
              height={70}
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* ——— Bottom Divider & Bar ——— */}
        <div className="border-t border-[var(--surface)]/10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-8 gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--surface)]/60 font-normal">
          <div>
            © {year} Lumora. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <Link href="/terms" className="hover:text-[var(--surface)]/90 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-[var(--surface)]/90 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-[var(--surface)]/90 transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

