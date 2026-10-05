"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1700;
const VEIL_FADE_AT = 0.5;
const TRAIL_LIFE = 420;
const ROCKET_W = 120;
const ROCKET_H = 48;
const TAIL_OFFSET = 48;

type Pt = { x: number; y: number };

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  max: number;
  size: number;
  color: [number, number, number];
}

const SPARK_COLORS: { color: [number, number, number]; weight: number }[] = [
  { color: [255, 194, 75], weight: 4 }, // gold
  { color: [255, 138, 61], weight: 3 }, // orange
  { color: [255, 92, 92], weight: 1 }, // ember red
  { color: [255, 243, 196], weight: 2 }, // white-hot
  { color: [124, 92, 255], weight: 1 }, // brand violet
];

const SPARK_TOTAL_WEIGHT = SPARK_COLORS.reduce((s, c) => s + c.weight, 0);

function pickSparkColor(): [number, number, number] {
  let roll = Math.random() * SPARK_TOTAL_WEIGHT;
  for (const entry of SPARK_COLORS) {
    roll -= entry.weight;
    if (roll <= 0) return entry.color;
  }
  return SPARK_COLORS[0].color;
}

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function bezierTangent(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = 3 * u * u;
  const b = 6 * u * t;
  const c = 3 * t * t;
  return {
    x: a * (p1.x - p0.x) + b * (p2.x - p1.x) + c * (p3.x - p2.x),
    y: a * (p1.y - p0.y) + b * (p2.y - p1.y) + c * (p3.y - p2.y),
  };
}

function RocketSvg() {
  return (
    <svg
      width={ROCKET_W}
      height={ROCKET_H}
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_14px_rgba(124,92,255,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rk-body" x1="0" y1="13" x2="0" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5F6F8" />
          <stop offset="0.5" stopColor="#C9CEDA" />
          <stop offset="1" stopColor="#8A91A3" />
        </linearGradient>
        <linearGradient id="rk-nose" x1="88" y1="13" x2="118" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B84FF" />
          <stop offset="1" stopColor="#7C5CFF" />
        </linearGradient>
        <linearGradient id="rk-flame" x1="30" y1="24" x2="2" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF3C4" />
          <stop offset="0.45" stopColor="#FFC24B" />
          <stop offset="1" stopColor="#FF8A3D" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Exhaust flame */}
      <g className="flame-flicker">
        <polygon points="31,16 2,24 31,32" fill="url(#rk-flame)" />
        <polygon points="31,19 12,24 31,29" fill="#FFF3C4" opacity="0.9" />
      </g>

      {/* Fins */}
      <path d="M47 15 L37 1 L60 12 Z" fill="#7C5CFF" />
      <path d="M47 33 L37 47 L60 36 Z" fill="#7C5CFF" />

      {/* Body */}
      <rect x="32" y="13" width="58" height="22" rx="9" fill="url(#rk-body)" />

      {/* Tail ring */}
      <rect x="30" y="15" width="8" height="18" rx="3" fill="#6E7689" />

      {/* Nose cone */}
      <path d="M86 13 L118 24 L86 35 Z" fill="url(#rk-nose)" />

      {/* Window */}
      <circle cx="76" cy="24" r="6.5" fill="#06B6D4" />
      <circle cx="76" cy="24" r="6.5" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <circle cx="74" cy="22" r="2" fill="rgba(255,255,255,0.75)" />

      {/* Body accent line */}
      <rect x="44" y="22" width="22" height="3" rx="1.5" fill="#7C5CFF" opacity="0.85" />
    </svg>
  );
}

export default function IntroRocket() {
  const [visible, setVisible] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const force = new URLSearchParams(window.location.search).has("intro");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced && !force) {
      console.debug(
        "[IntroRocket] dilewati: preferensi reduced-motion aktif di OS.",
      );
      return;
    }

    console.debug("[IntroRocket] animasi dimulai");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    const rocket = rocketRef.current;
    if (!canvas || !rocket) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let vw = 0;
    let vh = 0;
    let finished = false;
    let afterEnd = 0;
    let revealTriggered = false;

    const sparks: Spark[] = [];
    const trail: { x: number; y: number; age: number }[] = [];

    const getPoints = (): [Pt, Pt, Pt, Pt] => [
      { x: vw + 90, y: -90 },
      { x: vw * 0.62, y: vh * 0.06 },
      { x: vw * 0.48, y: vh * 0.72 },
      { x: -90, y: vh + 90 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let last = start;

    const spawnSparks = (tail: Pt, dx: number, dy: number) => {
      const n = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const backward = 1.4 + Math.random() * 3.6;
        const perpendicular = (Math.random() - 0.5) * 1.7;
        const alongTrail = Math.random() * 14;
        sparks.push({
          x: tail.x - dx * alongTrail + (Math.random() - 0.5) * 5,
          y: tail.y - dy * alongTrail + (Math.random() - 0.5) * 5,
          vx: -dx * backward - dy * perpendicular + (Math.random() - 0.5) * 0.5,
          vy: -dy * backward + dx * perpendicular + (Math.random() - 0.5) * 0.5 + 0.25,
          age: 0,
          max: 480 + Math.random() * 600,
          size: 1 + Math.random() * 3,
          color: pickSparkColor(),
        });
      }
    };

    const drawTrail = () => {
      if (trail.length < 2) return;
      ctx.lineCap = "round";
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const cur = trail[i];
          const a = 1 - cur.age / TRAIL_LIFE;
          if (a <= 0) continue;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(cur.x, cur.y);
          if (pass === 0) {
            ctx.strokeStyle = `rgba(255, 160, 70, ${0.3 * a})`;
            ctx.lineWidth = 2 + 9 * a;
          } else {
            ctx.strokeStyle = `rgba(124, 92, 255, ${0.22 * a})`;
            ctx.lineWidth = 1 + 3.5 * a;
          }
          ctx.stroke();
        }
      }
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      console.debug("[IntroRocket] selesai");
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      setVisible(false);
    };

    const frame = (now: number) => {
      const dtms = Math.min(now - last, 48);
      last = now;
      const dtf = dtms / 16.67;

      const t = Math.min((now - start) / DURATION, 1);
      const e = Math.pow(t, 1.35);

      const [p0, p1, p2, p3] = getPoints();
      const pos = bezier(p0, p1, p2, p3, e);
      const tan = bezierTangent(p0, p1, p2, p3, e);
      const len = Math.hypot(tan.x, tan.y) || 1;
      const dx = tan.x / len;
      const dy = tan.y / len;
      const angle = (Math.atan2(tan.y, tan.x) * 180) / Math.PI;

      if (t < 1) {
        rocket.style.transform = `translate3d(${pos.x - ROCKET_W / 2}px, ${pos.y - ROCKET_H / 2}px, 0) rotate(${angle}deg)`;
        spawnSparks({ x: pos.x - dx * TAIL_OFFSET, y: pos.y - dy * TAIL_OFFSET }, dx, dy);
        trail.push({ x: pos.x - dx * 34, y: pos.y - dy * 34, age: 0 });
        if (trail.length > 34) trail.shift();
      }

      for (const p of trail) p.age += dtms;
      while (trail.length && trail[0].age > TRAIL_LIFE) trail.shift();

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dtms;
        if (s.age >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        s.vx *= 1 - 0.012 * dtf;
        s.vy = s.vy * (1 - 0.012 * dtf) + 0.055 * dtf;
        s.x += s.vx * dtf;
        s.y += s.vy * dtf;
      }

      ctx.clearRect(0, 0, vw, vh);
      ctx.globalCompositeOperation = "lighter";
      drawTrail();
      for (const s of sparks) {
        const a = 1 - s.age / s.max;
        const size = s.size * (0.35 + 0.65 * a);
        ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (size > 2.1) {
          ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.55})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      if (!revealTriggered && t >= VEIL_FADE_AT) {
        revealTriggered = true;
        setRevealing(true);
      }

      if (t >= 1) {
        afterEnd += dtms;
        if (afterEnd > 950 || (afterEnd > 300 && sparks.length === 0)) {
          finish();
          return;
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
      aria-hidden="true"
    >
      {/* Veil yang menyala lalu memudar memperlihatkan halaman */}
      <div
        className={`absolute inset-0 bg-bg-base transition-opacity duration-700 ${
          revealing ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Percikan api (canvas) */}
      <canvas ref={canvasRef} className="absolute left-0 top-0" />

      {/* Roket */}
      <div
        ref={rocketRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: ROCKET_W, height: ROCKET_H, transform: "translate3d(-200px, -200px, 0)" }}
      >
        <RocketSvg />
      </div>
    </div>
  );
}
