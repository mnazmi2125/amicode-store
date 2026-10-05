import confetti from "canvas-confetti";

export function fireConfetti(): void {
  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const colors = ["#7C5CFF", "#06B6D4", "#FFC24B", "#4ADE80"];

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.7 },
    colors,
    disableForReducedMotion: true,
  });
}
