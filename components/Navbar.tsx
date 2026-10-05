"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { buildWaLink, WA_MESSAGES } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";

const NAV_PRIMARY = [
  { href: "#services", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Proses" },
  { href: "#faq", label: "FAQ" },
];

const NAV_SECONDARY = [
  {
    href: buildWaLink(
      "Halo! Saya ingin tahu daftar harga layanan di AMI Store.",
    ),
    label: "Harga",
    external: true,
  },
  {
    href: buildWaLink(WA_MESSAGES.consultation),
    label: "Kontak",
    external: true,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_-12px_rgba(11,13,18,0.18)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-10">
        {/* Logo — wordmark hitam, tracking lebar */}
      <a href="#" aria-label="Beranda">
  <img src="/logo.jpg" alt="AMI Store" className="h-13 lg:h-14 w-auto" />
</a>

        {/* Tombol hamburger — 2 garis dalam lingkaran abu */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F1F3] text-[#111111] transition-colors hover:bg-[#E5E5E7] lg:h-11 lg:w-11"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1.25H17M1 8.75H17"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Panel menu mengambang — kanan-atas, seperti referensi */}
      <AnimatePresence>
        {open && (
          <>
            {/* Penangkap klik di luar panel */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed right-4 top-3 z-50 w-[min(310px,calc(100vw-32px))] rounded-[20px] bg-white p-5 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04] lg:right-10"
            >
              {/* Tombol tutup di dalam panel */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F1F3] text-[#111111] transition-colors hover:bg-[#E5E5E7]"
                aria-label="Tutup menu"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <ul className="space-y-3.5 pr-10">
                {NAV_PRIMARY.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-[15px] font-normal text-[#111111] transition-colors hover:text-[#0A84FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <hr className="my-4 border-[#ECECEE]" />

              <ul className="space-y-3.5">
                {NAV_SECONDARY.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="text-[15px] font-normal text-[#111111] transition-colors hover:text-[#0A84FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <hr className="my-4 border-[#ECECEE]" />

              <a
                href={buildWaLink(WA_MESSAGES.consultation)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setOpen(false);
                  fireConfetti();
                }}
                className="inline-block rounded-full bg-[#0A84FF] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0A77EB]"
              >
                Konsultasi Gratis
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
