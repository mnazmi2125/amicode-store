"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STEPS = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Discovery & Konsultasi",
    description:
      "Kami memahami kebutuhan, target, dan tantangan bisnis Anda secara mendalam.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design & Prototipe",
    description:
      "Wireframe dan desain visual modern yang selaras dengan brand Anda.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Development & Testing",
    description:
      "Implementasi kode bersih, cepat, dan diuji menyeluruh di berbagai perangkat.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Maintenance",
    description:
      "Deployment ke produksi dilanjutkan monitoring dan maintenance berkala.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current as HTMLElement;

      /* ── Parallax ── */
      // Angka hantu "04" besar — bergerak lambat ke bawah
      gsap.fromTo(
        ghostRef.current,
        { y: -70 },
        {
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
      // Orb blur — bergerak berlawanan arah
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
            scrub: 0.9,
          },
        },
      );
      // Judul — efek kedalaman halus
      gsap.fromTo(
        headingRef.current,
        { y: 48 },
        {
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      /* ── Garis timeline tergambar mengikuti scroll (scrub) ── */
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
            end: "bottom 65%",
            scrub: 0.4,
          },
        },
      );

      /* ── Reveal: header ── */
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      }

      /* ── Reveal: kartu langkah ── */
      gsap.from(".process-step", {
        y: 44,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(".process-step", { clearProps: "opacity,transform" });
        },
        scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef as RefObject<HTMLElement>}
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Angka hantu parallax */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-24 select-none text-[170px] font-black leading-none tracking-tight text-[#F0F0F2] xl:text-[230px]"
      >
        04
      </span>
      {/* Orb blur parallax */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-24 h-72 w-72 rounded-full bg-[#0A84FF]/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div ref={headingRef}>
          <div ref={headerRef} className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]">
              Cara Kerja
            </p>
            <h2 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[42px] lg:text-[50px]">
              Prosesnya sederhana. Hasilnya nyata.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#6E6E73] sm:text-[17px]">
              Empat langkah transparan dari ide pertama sampai produk Anda
              tayang.
            </p>
          </div>
        </div>

        {/* Timeline langkah */}
        <ol
          ref={listRef}
          className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {/* Garis track + garis progres (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-black/10 lg:block"
          />
          <div
            ref={progressRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px origin-left bg-[#0A84FF] lg:block"
          />

          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.step}
                className="group relative lg:pt-9 process-step"
              >
                {/* Titik di garis timeline */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#0A84FF] bg-white lg:block"
                />
                {/* Ikon */}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A84FF]/10 transition-transform duration-300 group-hover:scale-105">
                  <Icon
                    className="h-5 w-5 text-[#0A84FF]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                {/* Nomor langkah */}
                <p className="mt-5 text-[13px] font-semibold tracking-[0.12em] text-[#0A84FF]">
                  {item.step}
                </p>
                <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#6E6E73]">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
