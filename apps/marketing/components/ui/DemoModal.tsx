"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DemoModal() {
  const mounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [roomCount, setRoomCount] = useState("26 to 80 rooms");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pms, setPms] = useState("Opera Cloud");

  // Listen for hash changes to #demo or custom trigger
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#demo") {
        setIsOpen(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    // Global listener for any anchor clicking #demo
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#demo"], button[data-trigger="demo"]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
        if (window.location.hash !== "#demo") {
          window.history.pushState(null, "", "#demo");
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("hashchange", checkHash);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (window.location.hash === "#demo") {
      window.history.pushState(null, "", window.location.pathname);
    }
    setTimeout(() => {
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative z-10 w-full max-w-lg rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-2xl text-[var(--text-primary)] my-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--success)]/10 text-[var(--success)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  Audit Request Confirmed!
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold">{name || "Hotelier"}</span>. A Lumora revenue strategist will contact you shortly with a personalized comp-set yield analysis for <span className="font-semibold">{hotelName || "your property"}</span>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full bg-[var(--primary)] px-8 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-surface shadow-md hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                    <Sparkles className="h-3 w-3" />
                    Personalized Revenue Audit
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    See Lumora in action with your hotel data.
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    Enter your property details below to receive a custom competitor yield report and 15-minute product tour.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Hotel / Property Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                      <input
                        type="text"
                        required
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        placeholder="e.g. The Heritage Haveli"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Room Inventory
                      </label>
                      <select
                        value={roomCount}
                        onChange={(e) => setRoomCount(e.target.value)}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 px-3 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                      >
                        <option value="1 to 25 rooms">1 to 25 rooms</option>
                        <option value="26 to 80 rooms">26 to 80 rooms</option>
                        <option value="80+ rooms">80+ rooms</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Current PMS
                      </label>
                      <select
                        value={pms}
                        onChange={(e) => setPms(e.target.value)}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 px-3 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                      >
                        <option value="Opera Cloud">Opera Cloud</option>
                        <option value="Cloudbeds">Cloudbeds</option>
                        <option value="Mews">Mews</option>
                        <option value="eZee Absolute">eZee Absolute</option>
                        <option value="Hotelogix">Hotelogix</option>
                        <option value="Other / None">Other / None</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tejasav Singh"
                          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Business Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="gm@heritagehotel.com"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[var(--primary)] py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-surface shadow-md hover:bg-[var(--primary-hover)] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Request Free Revenue Audit</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)] pt-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
                    <span>Your hotel data is confidential and protected by 256-bit encryption.</span>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
