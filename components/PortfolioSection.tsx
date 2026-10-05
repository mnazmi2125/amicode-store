"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current as HTMLElement;

      /* Judul — efek kedalaman halus */
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

      /* Reveal header */
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

      /* Reveal kartu */
      gsap.from(".portfolio-card", {
        y: 52,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(".portfolio-card", { clearProps: "opacity,transform" });
        },
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      /* Parallax cover — tiap kartu beda kecepatan */
      gsap.utils
        .toArray<HTMLElement>(".portfolio-cover")
        .forEach((el, index) => {
          const dist = 12 + (index % 3) * 8; /* 12 / 20 / 28 px */
          gsap.fromTo(
            el,
            { y: -dist },
            {
              y: dist,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".portfolio-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef as RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#F5F5F7] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div ref={headingRef}>
          <div ref={headerRef} className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]">
              Portfolio
            </p>
            <h2 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[42px] lg:text-[50px]">
              Karya yang berbicara hasil.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#6E6E73] sm:text-[17px]">
              Beberapa proyek terbaru yang kami kerjakan untuk klien dari
              berbagai industri.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {PORTFOLIO_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className={`portfolio-card group relative overflow-hidden rounded-[24px] ${item.span} ${item.height}`}
              >
                {/* Cover dengan parallax (ukuran lebih tinggi agar tepi tak terlihat) */}
                <div className="portfolio-cover absolute inset-x-0 -top-[10%] h-[120%]">
                  <div
                    className={`relative h-full w-full bg-gradient-to-br ${item.gradient} transition-transform duration-700 ease-out group-hover:scale-105`}
                  >
                    {/* Ikon ghost besar */}
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 lg:right-8">
                      <Icon
                        className="h-20 w-20 text-white/20 lg:h-28 lg:w-28"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>

                {/* Scrim bawah */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                />

                {/* Konten — tetap di tempat (tidak ikut parallax) */}
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-white lg:text-[22px]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[13.5px] text-white/75">
                        {item.result}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-[#111111] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
