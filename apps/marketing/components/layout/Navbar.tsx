"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { useIsMounted } from "@/hooks/useIsMounted";

const navigation = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const mounted = useIsMounted();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // All hooks must be called unconditionally — no early returns before this block
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Early return after all hooks — safe per Rules of Hooks
  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 top-0 z-50 h-[64px] border-b border-[var(--navbar-border)] bg-[var(--primary)]" aria-hidden="true" />
    );
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#")) {
      const hashIndex = href.indexOf("#");
      const targetId = href.substring(hashIndex + 1);
      const element = document.getElementById(targetId);
      if (element && (pathname === "/" || pathname === "")) {
        e.preventDefault();
        if (typeof window !== "undefined" && window.__lenis) {
          window.__lenis.scrollTo(element, {
            offset: -80,
            duration: 0.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 pt-5 mb-2 tracking-[0.1em]">
      <Container>
        <nav
          className={`flex h-16 items-center justify-between rounded-[var(--radius-lg)] border px-5 backdrop-blur-[var(--blur-lg)] transition-all duration-300 ${
            scrolled
              ? "border-[color:var(--navbar-border)] bg-[var(--primary)]/95"
              : "border-transparent bg-[var(--primary)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Lumora"
              width={40}
              height={40}
              priority
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[31px] font-bold leading-none tracking-[0.07em]">
              LUMORA
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-20 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 tracking-[0.1em] transition-colors hover:opacity-80 ${
                    active ? "font-medium" : ""
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 bottom-1 h-px bg-white"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hover:bg-white/10"
              )}
            >
              LOGIN
            </Link>
            <Link
              href="#demo"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "bg-[var(--surface)] !text-[var(--primary)] font-bold hover:bg-[var(--surface)]/90"
              )}
            >
              GET STARTED
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--surface)] transition-colors hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Slide-Over Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
              />

              {/* Slide-in Drawer */}
              <motion.div
                id="mobile-nav-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[320px] flex-col bg-[var(--primary)] text-surface shadow-2xl lg:hidden"
              >
                {/* Header */}
                <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src="/logo.png"
                      alt="Lumora"
                      width={32}
                      height={32}
                      className="h-8 w-auto object-contain brightness-0 invert"
                    />
                    <span className="text-xl font-bold tracking-[0.07em]">
                      LUMORA
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-surface transition-colors hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8">
                  <div className="flex flex-col gap-2">
                    {navigation.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            setMobileOpen(false);
                            handleNavClick(e, item.href);
                          }}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-base tracking-[0.08em] transition-all ${
                            active
                              ? "bg-white/15 font-semibold text-surface"
                              : "text-surface/80 hover:bg-white/10 hover:text-surface"
                          }`}
                        >
                          <span>{item.label}</span>
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6">
                    <Link
                      href="/login"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "md" }),
                        "w-full justify-center border border-white/20 text-surface hover:bg-white/10"
                      )}
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="#demo"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "primary", size: "md" }),
                        "w-full justify-center bg-[var(--surface)] !text-[var(--primary)] font-bold hover:bg-[var(--surface)]/90"
                      )}
                    >
                      GET STARTED
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}