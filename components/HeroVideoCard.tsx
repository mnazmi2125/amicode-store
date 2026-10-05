"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play, Star, Volume2, Zap } from "lucide-react";

export default function HeroVideoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useReducedMotion();

  /* ── Parallax halus saat scroll ── */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : 36, reduceMotion ? 0 : -36],
  );

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video || videoFailed) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        /* autoplay policy may block — ignore */
      }
    }
    setMuted(nextMuted);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className="lg:ml-auto lg:max-w-[700px]"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#EDEEF1] shadow-[0_28px_70px_-28px_rgba(11,13,18,0.35)] lg:rounded-[28px]">
        {/* Video MP4 — drop file ke public/videos/hero.mp4 */}
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          className={`h-full w-full object-cover ${videoFailed ? "hidden" : ""}`}
        />

        {/* Fallback bila video belum tersedia */}
        {videoFailed && (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-accent-primary via-[#5B7CFF] to-accent-cyan bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]"
          >
            <span className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
              <Zap className="h-8 w-8 text-white" />
            </span>
            <p className="text-sm font-semibold text-white">
              Video intro segera hadir
            </p>
            <p className="text-xs text-white/75">
              public/videos/hero.mp4
            </p>
          </div>
        )}

        {/* Badge melayang — kiri-bawah di mobile, kanan-atas di desktop */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_30px_-8px_rgba(11,13,18,0.25)] lg:bottom-auto lg:left-auto lg:right-4 lg:top-4">
          <Star className="h-5 w-5 fill-accent-gold text-accent-gold" />
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-[#0B0D12]">5.0</p>
            <p className="text-[11px] text-[#8A91A0]">Rating Klien</p>
          </div>
        </div>

        {/* Glass card (kanan-bawah) — desktop saja, sesuai referensi */}
        <div className="absolute bottom-4 right-4 hidden max-w-[300px] rounded-2xl bg-black/55 p-4 text-white backdrop-blur-md lg:block">
          <p className="text-[13px] leading-relaxed text-white/85">
            Lihat bagaimana kami mengubah ide menjadi produk digital yang
            nyata.
          </p>
          <div className="mt-3 flex items-center gap-3">
            {!videoFailed && (
              <button
                type="button"
                onClick={toggleSound}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                aria-label={
                  muted ? "Putar video dengan suara" : "Matikan suara video"
                }
              >
                {muted ? (
                  <Play className="h-4 w-4 fill-black" aria-hidden="true" />
                ) : (
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
            <span className="text-[13px] font-bold">Intro Layanan Kami</span>
            <span className="ml-auto flex -space-x-2" aria-hidden="true">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black/40 bg-accent-primary text-[10px] font-bold">
                A
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black/40 bg-accent-cyan text-[10px] font-bold">
                M
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
