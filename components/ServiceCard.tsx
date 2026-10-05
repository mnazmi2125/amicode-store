"use client";

import { Check, ArrowUpRight, type LucideIcon } from "lucide-react";
import {
  Bot,
  Globe,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { ServiceItem } from "@/data/services";
import { buildWaLink, WA_MESSAGES } from "@/lib/whatsapp";
import { fireConfetti } from "@/lib/confetti";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Bot,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  Workflow,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.icon] ?? Globe;
  const waHref = buildWaLink(WA_MESSAGES.service(service.title));

  return (
    <article className="service-card group flex h-full flex-col rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(11,13,18,0.18)]">
      {/* Header: ikon + badge */}
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#0A84FF]/10 transition-transform duration-300 group-hover:scale-105">
          <Icon
            className="h-6 w-6 text-[#0A84FF]"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
        {service.badge && (
          <span className="rounded-full bg-[#111111] px-2.5 py-1 text-[11px] font-semibold text-white">
            {service.badge}
          </span>
        )}
      </div>

      {/* Judul + deskripsi */}
      <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#111111]">
        {service.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#6E6E73]">
        {service.description}
      </p>

      {/* Fitur */}
      <ul className="mt-5 space-y-2">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[13.5px] text-[#6E6E73]"
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0A84FF]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Harga + CTA */}
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-black/[0.06] pt-5">
        <div>
          <p className="text-[12px] text-[#8E8E93]">Mulai dari</p>
          <p className="mt-0.5 text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
            {service.priceStartingFrom}
          </p>
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={fireConfetti}
          className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#0A84FF] transition-all duration-300 hover:gap-2"
        >
          Konsultasi
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
