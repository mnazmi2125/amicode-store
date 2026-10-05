import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ami-store.example.com"),
  title: {
    default: "AMI Store — Jasa Pembuatan Website, App, Bot & SEO",
    template: "%s | AMI Store",
  },
  description:
    "Agensi digital untuk pembuatan website, mobile app, bot otomasi, SEO, dan sistem kustom. Konsultasi gratis dan slot project terbatas tiap bulan.",
  keywords: [
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "bot whatsapp otomasi",
    "jasa seo",
    "web developer indonesia",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "AMI Store",
    title: "AMI Store — Jasa Pembuatan Website, App, Bot & SEO",
    description:
      "Agensi digital untuk pembuatan website, mobile app, bot otomasi, SEO, dan sistem kustom. Konsultasi gratis!",
    url: "https://ami-store.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMI Store — Jasa Pembuatan Website, App, Bot & SEO",
    description:
      "Agensi digital untuk pembuatan website, mobile app, bot otomasi, SEO, dan sistem kustom.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
