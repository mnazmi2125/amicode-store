"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Plus } from "lucide-react";
import { buildWaLink, WA_MESSAGES } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const FAQS = [
  {
    question: "Berapa lama pengerjaan satu project?",
    answer:
      "Landing page umumnya selesai dalam 1–2 minggu, web app atau sistem kustom 4–8 minggu tergantung kompleksitas. Timeline pasti disepakati di awal sebelum project dimulai.",
  },
  {
    question: "Apakah harga yang tertera sudah termasuk hosting & domain?",
    answer:
      "Harga adalah biaya development. Hosting, domain, dan layanan pihak ketiga (payment gateway, dsb) ditagihkan terpisah atau dapat ditanggung kami sesuai kesepakatan.",
  },
  {
    question: "Apakah ada garansi setelah project selesai?",
    answer:
      "Ya, kami memberikan garansi bug fixing gratis selama 30 hari setelah serah terima. Setelah itu tersedia paket maintenance bulanan opsional.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Umumnya 50% dp saat kickoff dan 50% pelunasan sebelum deployment. Untuk project besar bisa dibagi per milestone.",
  },
  {
    question: "Apakah bisa request perubahan selama proses development?",
    answer:
      "Bisa. Perubahan minor tetap dalam scope gratis, sedangkan perubahan besar akan kami hitung dampaknya terlebih dahulu sebelum dieksekusi.",
  },
  {
    question: "Teknologi apa yang digunakan untuk development?",
    answer:
      "Web dibangun dengan Next.js / React, mobile dengan React Native, dan otomasi dengan n8n / Node.js — semuanya siap terintegrasi dengan API yang sudah bisnis Anda pakai.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const initial = reduce ? "show" : "hidden";

  /* ── GSAP: parallax ghost & orb ── */
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current as HTMLElement;

      /* Tanda tanya raksasa — parallax pelan */
      gsap.fromTo(
        ghostRef.current,
        { y: -80, rotate: -6 },
        {
          y: 80,
          rotate: 4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      /* Orb parallax berlawanan arah */
      gsap.fromTo(
        orbRef.current,
        { y: 130 },
        {
          y: -130,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const waHref = buildWaLink(WA_MESSAGES.consultation);

  return (
    <section
      id="faq"
      ref={sectionRef as RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#F5F5F7] py-20 sm:py-24 lg:py-28"
    >
      {/* Ghost "?" parallax */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/3 select-none text-[220px] font-black leading-none text-white xl:text-[300px]"
      >
        ?
      </span>
      {/* Orb parallax */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-16 h-72 w-72 rounded-full bg-[#0A84FF]/12 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-16">
          {/* ── Kiri: judul sticky + CTA ── */}
          <motion.div
            variants={stagger}
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="lg:sticky lg:top-28"
          >
            <motion.p
              variants={fadeUp}
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[40px] lg:text-[46px]"
            >
              Pertanyaan yang sering ditanya.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-md text-[16px] leading-relaxed text-[#6E6E73] sm:text-[17px]"
            >
              Semua yang perlu Anda tahu sebelum memulai project bersama kami.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fireConfetti}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A84FF] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(10,132,255,0.6)] transition-colors duration-300 hover:bg-[#0A77EB]"
            >
              Tanya via WhatsApp
            </motion.a>
          </motion.div>

          {/* ── Kanan: akordeon ── */}
          <motion.ul
            variants={stagger}
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-3"
          >
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.li
                  key={faq.question}
                  variants={fadeUp}
                  className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-300 ${
                    isOpen
                      ? "border-[#0A84FF]/35 shadow-[0_22px_48px_-26px_rgba(10,132,255,0.45)]"
                      : "border-black/[0.06] hover:border-black/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left lg:px-6 lg:py-5"
                  >
                    <span
                      className={`text-[15px] font-semibold leading-snug transition-colors duration-200 lg:text-[16px] ${
                        isOpen ? "text-[#0A84FF]" : "text-[#111111]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    {/* Ikon + berputar jadi × */}
                    <motion.span
                      animate={{ rotate: isOpen && !reduce ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#0A84FF]/10 text-[#0A84FF]"
                          : "bg-[#F1F1F3] text-[#5A6172]"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </motion.span>
                  </button>

                  {/* Jawaban — tinggi & opacity halus */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="jawaban"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduce ? 0 : 0.38,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-[#6E6E73] lg:px-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
