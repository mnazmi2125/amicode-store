"use client";

import { motion } from "framer-motion";
import HeroVideoCard from "./HeroVideoCard";
import { buildWaLink, WA_MESSAGES } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";

const FEATURES = ["Web & App", "Bot Otomasi", "SEO & Growth"];

/* 4 nama klien — perlakuan visual meniru logo pers di referensi
   (block-bold, serif, putih-di-kotak hitam, serif tipis) */
const CLIENTS = [
  {
    name: "NUSA DIGITAL",
    className:
      "text-[15px] font-black tracking-[-0.03em] text-[#111111] lg:text-[19px]",
  },
  {
    name: "KARYA LABS",
    className:
      "font-serif text-[14px] font-bold uppercase tracking-[0.06em] text-[#2B2B2B] lg:text-[17px]",
  },
  {
    name: "BISNIS PLUS",
    className:
      "font-serif text-[15px] tracking-[0.02em] text-[#6E6E73] lg:text-[19px]",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const waHref = buildWaLink(WA_MESSAGES.consultation);

  return (
    <section className="relative bg-white text-[#111111]">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-9 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10 lg:pb-12 lg:pt-7">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
          {/* ── Kolom kiri: teks (center di mobile, kiri di desktop) ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Row fitur + separator vertikal */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center gap-y-2 text-[11px] font-normal tracking-[-0.01em] text-[#1D1D1F] sm:text-[13px] lg:justify-start lg:text-[15px]"
            >
              {FEATURES.map((feature, index) => (
                <span key={feature} className="flex items-center">
                  {index > 0 && (
                    <span
                      className="mx-2.5 h-3 w-px bg-[#C7C7CC] sm:mx-3 lg:mx-4 lg:h-3.5"
                      aria-hidden="true"
                    />
                  )}
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* Headline — Medium weight, 2 baris, tracking rapat */}
            <motion.h1
              variants={item}
              className="mt-7 text-[30px] font-medium leading-[1.1] tracking-[-0.025em] text-[#111111] sm:text-[40px] lg:mt-12 lg:text-[56px] xl:text-[60px]"
            >
              Ide hebat, jadi produk digital.
            </motion.h1>

            {/* Baris CTA: pil biru + info abu di sampingnya (desktop) */}
            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:mt-11 lg:justify-start lg:gap-5"
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireConfetti}
                className="rounded-full bg-[#0A84FF] px-6 py-2.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(10,132,255,0.65)] transition-all duration-300 hover:bg-[#0A77EB] lg:px-7 lg:py-3 lg:text-[17px]"
              >
                Konsultasi Gratis
              </a>
              <span className="hidden text-[15px] text-[#8E8E93] sm:inline lg:text-[17px]">
                {"Balas < 5 menit"}
              </span>
            </motion.div>

            {/* Social proof — label abu + deretan logo */}
            <motion.div variants={item} className="mt-10 lg:mt-24">
              <p className="text-[13px] text-[#8E8E93] lg:text-[15px]">
                Dipercaya oleh
              </p>
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:mt-4 lg:justify-start lg:gap-x-9">
                {CLIENTS.map((client) => (
                  <span
                    key={client.name}
                    className={`${client.className} transition-colors duration-300 hover:text-[#111111]`}
                  >
                    {client.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Kolom kanan: kartu video ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <HeroVideoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
