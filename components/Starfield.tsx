"use client";

import { useEffect, useRef } from "react";

const STAR_COLORS = ["#F5F6F8", "#F5F6F8", "#F5F6F8", "#9AA0AC", "#7C5CFF", "#06B6D4"];

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  vx: number;
  vy: number;
  color: string;
}

export default function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: Star[] = [];
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(170, Math.max(60, Math.floor((w * h) / 9000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.55 + 0.25,
        tw: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: 0.015 + Math.random() * 0.05,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    const draw = (now: number) => {
      const dt = last ? Math.min((now - last) / 16.67, 3) : 1;
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        if (!reduceMotion) {
          s.tw += 0.025 * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.y > h + 2) {
            s.y = -2;
            s.x = Math.random() * w;
          }
          if (s.x < -2) s.x = w + 2;
          else if (s.x > w + 2) s.x = -2;
        }

        const alpha = s.a * (0.55 + 0.45 * Math.sin(s.tw));
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(canvas);

    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
        last = 0;
      } else {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none block ${className ?? ""}`}
    />
  );
}
