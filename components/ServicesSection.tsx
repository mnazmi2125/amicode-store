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
import { SearchX } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  type ServiceCategory,
} from "@/data/services";
import ServiceCard from "./ServiceCard";

/* useLayoutEffect hanya di browser (hindari warning SSR) */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type FilterValue = ServiceCategory | "all";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ServicesSection() {
  const [active, setActive] = useState<FilterValue>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === active);

  /* ── Efek 1 (sekali jalan): parallax dekorasi + judul, lalu reveal header ── */
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    /* Abaikan refresh karena URL bar mobile muncul/hilang saat scroll —
       ini pemicu utama animasi kartu tiba-tiba hilang */
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const section = sectionRef.current as HTMLElement;

      /* Parallax: dua lapis dekorasi dengan kecepatan berbeda (scrub) */
      gsap.to(decor1Ref.current, {
        y: 170,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(decor2Ref.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      /* Parallax judul: naik pelan saat scroll — efek kedalaman */
      gsap.fromTo(
        headingRef.current,
        { y: 56 },
        {
          y: -56,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      /* Reveal header saat masuk viewport */
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Efek 2 (ulang saat filter berubah): kartu masuk + refresh trigger ── */
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.from(".service-card", {
          y: 48,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          /* Bersihkan style inline setelah selesai — kartu tidak pernah
             tersangkut di opacity:0 saat trigger di-refresh browser */
          onComplete: () => {
            gsap.set(".service-card", { clearProps: "opacity,transform" });
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            /* Sekali bermain → trigger mati, tak bisa di-rewind jadi hilang */
            once: true,
          },
        });
      }
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      id="services"
      ref={sectionRef as RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#F5F5F7] py-20 sm:py-24 lg:py-28"
    >
      {/* Dekorasi blur parallax */}
      <div
        ref={decor1Ref}
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-[#0A84FF]/12 blur-[110px]"
      />
      <div
        ref={decor2Ref}
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-32 h-64 w-64 rounded-full bg-[#64D2FF]/20 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div ref={headingRef}>
          <div ref={headerRef} className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]">
              Layanan
            </p>
            <h2 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[42px] lg:text-[50px]">
              Semua yang bisnis Anda butuhkan.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#6E6E73] sm:text-[17px]">
              Dari website sampai bot &amp; SEO — pilih layanannya, tim kami
              yang kerjakan.
            </p>

            {/* Filter tabs — segmented control ala Apple */}
            <div
              role="tablist"
              aria-label="Filter kategori layanan"
              className="mt-8 inline-flex flex-wrap justify-center gap-1 rounded-full bg-[#E8E8ED] p-1"
            >
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = active === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActive(cat.value)}
                    className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                        : "text-[#5A6172] hover:text-[#111111]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid kartu */}
        <div ref={gridRef} className="mt-12">
          {filtered.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[20px] border border-dashed border-black/10 bg-white py-16 text-center">
              <SearchX
                className="h-8 w-8 text-[#8E8E93]"
                aria-hidden="true"
              />
              <p className="font-semibold text-[#111111]">
                Belum ada layanan di kategori ini
              </p>
              <p className="text-sm text-[#6E6E73]">
                Coba pilih kategori lainnya.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
