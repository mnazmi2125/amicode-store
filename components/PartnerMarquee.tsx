const PARTNERS = [
  { name: "WhatsApp Business", className: "font-semibold" },
  { name: "Google Partner", className: "font-bold tracking-tight" },
  { name: "Meta", className: "font-black" },
  { name: "Midtrans", className: "font-bold" },
  { name: "Xendit", className: "font-extrabold tracking-tight" },
  { name: "Next.js", className: "font-semibold" },
  { name: "React", className: "font-medium" },
  { name: "n8n", className: "font-black tracking-tight" },
  { name: "Vercel", className: "font-bold tracking-tight" },
  { name: "Telegram Bot API", className: "font-semibold" },
];

function PartnerRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex items-center"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {PARTNERS.map((partner) => (
        <span
          key={partner.name}
          className={`px-8 text-[16px] text-[#9A9AA0] transition-colors duration-300 hover:text-[#111111] lg:px-11 lg:text-[18px] ${partner.className}`}
        >
          {partner.name}
        </span>
      ))}
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="bg-white py-12 lg:py-14" aria-label="Partner">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8E8E93]">
        Compatible With & Trusted By
      </p>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          <PartnerRow />
          <PartnerRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
