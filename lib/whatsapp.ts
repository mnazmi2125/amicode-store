/**
 * Konfigurasi WhatsApp CTA.
 * Ganti WA_NUMBER dengan nomor agensi asli (format internasional tanpa "+").
 */
export const WA_NUMBER = "628123456789"; // TODO: ganti nomor asli

export const WA_MESSAGES = {
  consultation:
    "Halo! Saya ingin konsultasi gratis mengenai pembuatan produk digital untuk bisnis saya.",
  service: (serviceTitle: string) =>
    `Halo! Saya tertarik dengan layanan "${serviceTitle}". Bisa tolong berikan info lebih lanjut?`,
} as const;

export function buildWaLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
