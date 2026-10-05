const TICKER_ITEMS = [
  "Slot project bulan ini terbatas",
  "Konsultasi gratis — langsung ke WhatsApp",
  "Respon cepat 24/7",
  "Mulai dari Rp 2.000.000",
];

function TickerCopy({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex items-center"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {TICKER_ITEMS.map((text) => (
        <span
          key={text}
          className="px-7 text-[14px] font-bold tracking-[-0.01em] text-white lg:text-[15px]"
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export default function TopTicker() {
  return (
    <div className="overflow-hidden bg-black py-3">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        <TickerCopy />
        <TickerCopy ariaHidden />
      </div>
    </div>
  );
}
