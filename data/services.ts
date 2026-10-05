export type ServiceCategory =
  | "web"
  | "mobile"
  | "automation"
  | "seo"
  | "custom";

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  features: string[];
  icon: string; // Identifier nama ikon dari Lucide React
  priceStartingFrom: string;
  badge?: string;
  isFeatured?: boolean;
}

export const SERVICE_CATEGORIES: { value: ServiceCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "automation", label: "Automation" },
  { value: "seo", label: "SEO" },
  { value: "custom", label: "Custom" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website & Web Application",
    category: "web",
    description:
      "Pengembangan landing page, company profile, e-commerce, hingga web app kustom bereputasi tinggi.",
    features: [
      "Next.js / React Framework",
      "Responsive & Mobile First",
      "SEO Friendly Architecture",
      "CMS Integration",
    ],
    icon: "Globe",
    priceStartingFrom: "Rp 3.500.000",
    badge: "Popular",
    isFeatured: true,
  },
  {
    id: "bot-automation",
    title: "Bot Otomasi & Sistem Workflow",
    category: "automation",
    description:
      "Integrasi WhatsApp Bot, Scraping Data, serta otomatisasi alur kerja bisnis menggunakan n8n & API.",
    features: [
      "WhatsApp / Telegram Bot",
      "Integration dengan CRM / Google Sheets",
      "Automated Notification",
      "24/7 Server Uptime",
    ],
    icon: "Bot",
    priceStartingFrom: "Rp 2.000.000",
    badge: "High Demand",
    isFeatured: true,
  },
  {
    id: "seo-optimization",
    title: "SEO & Growth Hacking",
    category: "seo",
    description:
      "Optimasi mesin pencari organik untuk meningkatkan peringkat website di Google dan mendatangkan traffic berkualifikasi.",
    features: [
      "Technical SEO Audit",
      "Keyword Strategy & Content Plan",
      "On-Page & Off-Page SEO",
      "Monthly Analytics Report",
    ],
    icon: "TrendingUp",
    priceStartingFrom: "Rp 2.500.000",
    isFeatured: false,
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    category: "mobile",
    description:
      "Aplikasi Android & iOS performa tinggi dengan pengalaman pengguna yang mulus dan publikasi ke Play Store / App Store.",
    features: [
      "React Native / Expo",
      "Push Notification & Offline Mode",
      "Publish ke Play Store & App Store",
      "Analytics & Crash Report",
    ],
    icon: "Smartphone",
    priceStartingFrom: "Rp 5.000.000",
    badge: "Baru",
    isFeatured: false,
  },
  {
    id: "ecommerce-build",
    title: "E-Commerce & Payment Gateway",
    category: "web",
    description:
      "Toko online lengkap dengan katalog produk, keranjang belanja, dan integrasi payment gateway lokal.",
    features: [
      "Midtrans / Xendit Integration",
      "Manajemen Produk & Stok",
      "Checkout Optimized",
      "Order Notification Otomatis",
    ],
    icon: "ShoppingCart",
    priceStartingFrom: "Rp 4.500.000",
    isFeatured: false,
  },
  {
    id: "custom-system",
    title: "Sistem Kustom & Integrasi API",
    category: "custom",
    description:
      "Sistem internal, dashboard, dan integrasi API sesuai alur kerja unik bisnis Anda dari nol hingga deployment.",
    features: [
      "Konsultasi & Requirement Analysis",
      "Dashboard Admin Custom",
      "Integrasi API Pihak Ketiga",
      "Deployment & Maintenance",
    ],
    icon: "Workflow",
    priceStartingFrom: "Rp 4.000.000",
    badge: "Flexible",
    isFeatured: false,
  },
];
