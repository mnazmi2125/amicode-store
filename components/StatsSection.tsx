"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const starPop: Variants = {
  hidden: { scale: 0, rotate: -40, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const STATS = [
  { value: 150, suffix: "+", label: "Project selesai" },
  { value: 98, suffix: "%", label: "Klien puas" },
  { value: 5, suffix: "+", label: "Tahun pengalaman" },
  { value: 24, suffix: "/7", label: "Siap membantu" },
];

const TESTIMONIALS = [
  {
    quote:
      "Tim AMI Store cepat dan hasilnya melebihi ekspektasi. Website kami naik konversi tiga kali lipat dalam sebulan.",
    name: "Arif Nugroho",
    role: "Founder, Nusa Digital",
    initials: "AN",
    gradient: "from-[#0A84FF] to-[#5E5CE6]",
  },
  {
    quote:
      "Proses transparan, komunikasi lancar. Bot WhatsApp yang mereka buat menghemat waktu tim kami drastis.",
    name: "Sinta Pratiwi",
    role: "Marketing Lead, Karya Labs",
    initials: "SP",
    gradient: "from-[#12A594] to-[#30D158]",
  },
  {
    quote:
      "Dari desain sampai rilis tanpa drama. SEO kami masuk halaman 1 Google untuk kata kunci utama.",
    name: "Budi Santoso",
    role: "Owner, Toko Medika",
    initials: "BS",
    gradient: "from-[#BF5AF2] to-[#FF375F]",
  },
];

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);

  const initial = reduce ? "show" : "hidden";

  /* ── GSAP: counter + parallax ── */
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current as HTMLElement;

      /* Orb parallax */
      gsap.fromTo(
        orbRef.current,
        { y: 120 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );

      /* Tanda kutip raksasa parallax */
      gsap.fromTo(
        quoteMarkRef.current,
        { y: -90 },
        {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

      /* Judul — efek kedalaman (wrapper, framer mengatur anak di dalamnya) */
      gsap.fromTo(
        headingRef.current,
        { y: 44 },
        {
          y: -44,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      /* Counter angka — hitung dari 0 */
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimoni"
      ref={sectionRef as RefObject<HTMLElement>}
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Orb parallax */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#0A84FF]/12 blur-[130px]"
      />
      {/* Tanda kutip raksasa parallax */}
      <span
        ref={quoteMarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-[34%] select-none text-[200px] font-black leading-none text-[#F0F0F2] xl:text-[260px]"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Strip angka — reveal Framer Motion + counter GSAP */}
        <motion.div
          variants={stagger}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 gap-y-10 border-y border-black/10 py-10 text-center lg:grid-cols-4 lg:py-12"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={index > 0 ? "lg:border-l lg:border-black/10" : ""}
            >
              <p
                className="stat-number text-[40px] font-semibold leading-none tracking-[-0.03em] text-[#111111] sm:text-[48px] lg:text-[56px]"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                {`${stat.value}${stat.suffix}`}
              </p>
              <p className="mt-3 text-[14px] text-[#8E8E93]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Header testimoni — parallax GSAP (wrapper) + reveal Framer (anak) */}
        <div ref={headingRef} className="mt-16 lg:mt-20">
          <motion.div
            variants={stagger}
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]"
            >
              Testimoni
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[42px] lg:text-[50px]"
            >
              Yang klien kami katakan.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#6E6E73] sm:text-[17px]"
            >
              Kepercayaan mereka adalah alasan kami terus menghasilkan kerja
              terbaik.
            </motion.p>
          </motion.div>
        </div>

        {/* Kartu testimoni — reveal bertahap + bintang pop spring */}
        <motion.div
          variants={stagger}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {TESTIMONIALS.map((item) => (
            <motion.figure
              key={item.name}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -6 }}
              className="flex flex-col rounded-[20px] bg-[#F5F5F7] p-6 transition-shadow duration-300 hover:shadow-[0_28px_52px_-28px_rgba(11,13,18,0.22)]"
            >
              {/* Bintang — muncul pop berurutan */}
              <div
                className="flex gap-1"
                aria-label="Rating 5 dari 5"
                role="img"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span key={i} variants={starPop}>
                    <Star
                      className="h-3.5 w-3.5 fill-[#FFD60A] text-[#FFD60A]"
                      aria-hidden="true"
                    />
                  </motion.span>
                ))}
              </div>
              {/* Kutipan */}
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#3A3C42]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              {/* Penulis */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-[14px] font-semibold text-white`}
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-[#111111]">
                    {item.name}
                  </p>
                  <p className="text-[13px] text-[#8E8E93]">{item.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
