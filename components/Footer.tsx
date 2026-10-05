"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { buildWaLink, WA_MESSAGES } from "@/lib/whatsapp";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const EXPLORE_LINKS = [
  { href: "#services", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Proses" },
  { href: "#faq", label: "FAQ" },
];

const SERVICE_LINKS = [
  { href: "#services", label: "Website & Web App" },
  { href: "#services", label: "Mobile App" },
  { href: "#services", label: "Bot Otomasi" },
  { href: "#services", label: "SEO & Growth" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const footer = footerRef.current as HTMLElement;

      /* Reveal kolom */
      gsap.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(".footer-col", { clearProps: "opacity,transform" });
        },
        scrollTrigger: { trigger: footer, start: "top 88%", once: true },
      });

      /* Garis pemisah tergambar masuk */
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 94%", once: true },
        },
      );

      /* Wordmark raksasa — muncul naik dari balik clipping */
      if (markRef.current && markWrapRef.current) {
        gsap.from(markRef.current, {
          yPercent: 115,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: markWrapRef.current,
            start: "top 96%",
            once: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const waHref = buildWaLink(WA_MESSAGES.consultation);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <footer
      ref={footerRef as RefObject<HTMLElement>}
      className="relative overflow-hidden border-t border-black/10 bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* ── 4 kolom ── */}
        <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:pt-16">
          {/* Brand */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <p className="text-[15px] font-black uppercase leading-none tracking-[0.3em] text-[#111111]">
              AMI Store
            </p>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#6E6E73]">
              Jasa pembuatan website, aplikasi, bot &amp; SEO untuk bisnis yang
              siap tumbuh.
            </p>
            <a
              href="#kontak"
              className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#0A84FF] transition-all duration-300 hover:gap-2.5"
            >
              Mulai project <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Jelajahi */}
          <nav aria-label="Jelajahi" className="footer-col">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8E8E93]">
              Jelajahi
            </p>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14.5px] text-[#6E6E73] transition-colors duration-200 hover:text-[#111111]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Layanan */}
          <nav aria-label="Layanan" className="footer-col">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8E8E93]">
              Layanan
            </p>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14.5px] text-[#6E6E73] transition-colors duration-200 hover:text-[#111111]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div className="footer-col">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8E8E93]">
              Kontak
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-[#6E6E73] transition-colors duration-200 hover:text-[#111111]"
                >
                  WhatsApp — balas &lt; 5 menit
                </a>
              </li>
              <li className="text-[14.5px] text-[#6E6E73]">
                Senin–Sabtu, 09.00–18.00 WIB
              </li>
              <li className="text-[14.5px] text-[#6E6E73]">
                Indonesia (remote-friendly)
              </li>
            </ul>
          </div>
        </div>

        {/* ── Garis tergambar ── */}
        <div
          ref={lineRef}
          aria-hidden="true"
          className="mt-12 h-px origin-left bg-black/10"
        />

        {/* ── Wordmark raksasa + kembali ke atas ── */}
        <div className="mt-8 flex items-end justify-between gap-6 lg:mt-10">
          <div ref={markWrapRef} className="min-w-0 overflow-hidden">
            <span
              ref={markRef}
              className="block select-none text-[clamp(56px,15vw,220px)] font-black leading-[0.95] tracking-[-0.045em] text-[#111111]"
            >
              AMI STORE
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="group mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#5A6172] transition-colors duration-300 hover:border-[#0A84FF] hover:text-[#0A84FF]"
          >
            <ArrowUp
              className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* ── Bar bawah ── */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[13px] text-[#8E8E93]">
            © {new Date().getFullYear()} AMI Store. All rights reserved.
          </p>
          <p className="text-[13px] text-[#8E8E93]">
            Dibuat dengan standar kualitas tinggi.
          </p>
        </div>
      </div>
    </footer>
  );
}
