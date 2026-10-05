# Product Requirement Document (PRD)

**Project Title:** Digital Agency Services Landing Page

**Target Output:** Single Page Web Application (High-Conversion Landing Page)

**Tone & Visual Style:** Cyber-tech dark mode, modern SaaS/Agency feel, neon glow & gradients.

## 1. Executive Summary & Goals

* **Problem Statement:** Agensi membutuhkan *landing page* berperforma tinggi, modern, dan interaktif untuk memamerkan layanan digital (Website, Apps, Bot Otomasi, SEO, dan Layanan Custom) serta mengonversi pengunjung menjadi calon klien secara efisien.


* **Core Objectives:**

  1. Menghadirkan katalog layanan interaktif yang mudah diperbarui (*data-driven* via array TypeScript).

  2. Menyediakan fitur interaktif seperti filter kategori layanan dan tombol aksi yang langsung mengarah ke WhatsApp / Modal Konsultasi.

  3. Memaksimalkan kecepatan *load*, *responsiveness*, dan estetika visual modern (dark-mode cyber tech dengan efek glow).

## 2. Tech Stack & Dependencies

* **Framework:** Next.js 15 (App Router, React Server Components)

* **Language:** TypeScript

* **Styling:** Tailwind CSS (v3 atau v4)

* **Icons:** `lucide-react`

* **Animations:** `framer-motion`

* **Interactivity & Effects:** `canvas-confetti` (efek selebrasi saat menekan CTA/submit)

* **Media Handling:** `next/image`

## 3. Design Tokens & Design System

### 3.1 Color Palette

* `--bg-base`: `#0B0D12` (Background utama - Dark Navy/Black)

* `--bg-surface`: `#14171F` (Background card/modul)

* `--bg-surface-hover`: `#1C202B` (Hover state pada card)

* `--border-subtle`: `#242833` (Border default card & input)

* `--accent-primary`: `#7C5CFF` (Violet/Purple - CTA Utama & Aksen Brand)

* `--accent-glow`: `rgba(124, 92, 255, 0.35)` (Glow effect di sekeliling card featured/popular)

* `--accent-cyan`: `#06B6D4` (Aksen sekunder - SEO & Bot Otomasi)

* `--accent-gold`: `#FFC24B` (Badge "Recommended" / Paket VIP)

* `--text-primary`: `#F5F6F8` (Judul & teks utama)

* `--text-secondary`: `#9AA0AC` (Subtitle, deskripsi singkat, label)

* `--success`: `#4ADE80` (Indikator status/slot ketersediaan)

### 3.2 Typography & Layout Rules

* **Font Family:** `Inter` atau `Geist Sans`

* **Headings:** Bold / ExtraBold, letter-spacing rapat (`tracking-tight` / `-0.03em`)

* **Sizes:**

  * Hero H1: `48px–64px` (Desktop) / `32px–40px` (Mobile)

  * Section H2: `32px–40px`

  * Card Title H3: `20px–24px`

  * Body Text: `14px–16px`

  * Caption/Badge: `12px`

* **Border Radius:**

  * Card: `16px` (`rounded-2xl`)

  * Button: `10px` (`rounded-lg`)

  * Badge: `9999px` (`rounded-full` / Pill)

* **Glow Shadow:** `shadow-[0_0_30px_rgba(124,92,255,0.25)]`

## 4. Architecture & Data Structures

### 4.1 Data Schema: `data/services.ts`

```
export interface ServiceItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'automation' | 'seo' | 'custom';
  description: string;
  features: string[];
  icon: string; // Identifier nama ikon dari Lucide React
  priceStartingFrom: string;
  badge?: string; // misal: "Popular", "High Demand"
  isFeatured?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Website & Web Application',
    category: 'web',
    description: 'Pengembangan landing page, company profile, e-commerce, hingga web app kustom bereputasi tinggi.',
    features: ['Next.js / React Framework', 'Responsive & Mobile First', 'SEO Friendly Architecture', 'CMS Integration'],
    icon: 'Globe',
    priceStartingFrom: 'Rp 3.500.000',
    badge: 'Popular',
    isFeatured: true
  },
  {
    id: 'bot-automation',
    title: 'Bot Otomasi & Sistem Workflow',
    category: 'automation',
    description: 'Integrasi WhatsApp Bot, Scraping Data, serta otomatisasi alur kerja bisnis menggunakan n8n & API.',
    features: ['WhatsApp / Telegram Bot', 'Integration dengan CRM / Google Sheets', 'Automated Notification', '24/7 Server Uptime'],
    icon: 'Bot',
    priceStartingFrom: 'Rp 2.000.000',
    badge: 'High Demand',
    isFeatured: true
  },
  {
    id: 'seo-optimization',
    title: 'SEO & Growth Hacking',
    category: 'seo',
    description: 'Optimasi mesin pencari organik untuk meningkatkan peringkat website di Google dan mendatangkan traffic berkualifikasi.',
    features: ['Technical SEO Audit', 'Keyword Strategy & Content Plan', 'On-Page & Off-Page SEO', 'Monthly Analytics Report'],
    icon: 'TrendingUp',
    priceStartingFrom: 'Rp 2.500.000',
    isFeatured: false
  }
];

```

## 5. Functional Requirements & Component Specs

### 5.1 Sticky Glassmorphism Navbar (`components/Navbar.tsx`)

* **Position & Styling:** `sticky top-0 z-50 backdrop-blur-md bg-[#0B0D12]/80 border-b border-[#242833]`.

* **Kiri:** Logo Brand (Teks Bold + Icon Neon Glow).

* **Tengah:** Navigation Links dengan Smooth Scroll (`#services`, `#portfolio`, `#calculator`, `#process`, `#faq`).

* **Kanan:** Tombol CTA *"Konsultasi Gratis"* (Solid Gradient Button dengan efek glow saat hover).

### 5.2 High-Conversion Hero Section (`components/HeroSection.tsx`)

* **Status Pill:** Badge kecil beranimasi `pulse` dengan dot hijau: `🟢 Slot Project Bulan Ini Tersedia`.

* **Headline (H1):** Headline bertingkat dengan kata kunci bernoda gradient (misal: `"Ubah Ide Menjadi Produk Digital Bereputasi Tinggi"`).

* **Subheadline:** Penjelasan padat bahwa agensi menyediakan jasa pembuatan Website, Mobile Apps, Bot Otomasi, SEO, dan Sistem Kustom.

* **CTA Group:**

  * **Primary CTA:** `"Diskusi Project Anda"` (Membuka direct link WhatsApp API dengan preset pesan otomatis / Modal Form).

  * **Secondary CTA:** `"Lihat Katalog Layanan"` (Smooth scroll ke `#services`).

* **Social Proof Bar:**

  * Grid 4 kolom angka statistik:

    * `50+` Project Selesai

    * `99.9%` Uptime Bot

    * `100%` Kepuasan Klien

    * `24/7` Technical Support

### 5.3 Interactive Service Cards (`components/ServicesSection.tsx`)

* **Data Rendering:** Merender data secara dinamis dari `SERVICES_DATA` (`data/services.ts`).

* **Filter Tab:** Berdasarkan kategori (`All`, `Web`, `Mobile`, `Automation`, `SEO`, `Custom`).

* **Card Component (`components/ServiceCard.tsx`):**

  * Card Background `#14171F`, border `#242833`, hover state `#1C202B`.

  * Jika `isFeatured === true`, tambahkan border gradient `#7C5CFF` dan efek `accent-glow`.

  * Menampilkan Badge (seperti "Popular" / "High Demand" dengan aksen warna `--accent-gold`).

  * List fitur menggunakan checkmark ikon dari `lucide-react`.

  * Button CTA tiap card: *"Pesan Layanan Ini"* (Mengirim nama layanan otomatis ke format pesan WhatsApp).

### 5.4 Interactive Features & Animations

* **Interaktivitas CTA:** Menjalankan efek selebrasi `canvas-confetti` saat pengunjung menekan tombol CTA konsultasi atau pesan layanan.

* **Framer Motion Integration:**

  * Fade-in dan slide-up animation pada Hero Section.

  * Staggered animation pada grid card layanan saat di-scroll atau saat filter berubah.

## 6. Non-Functional Requirements

1. **Performance:** Skor Lighthouse minimal 90+ di Desktop dan Mobile (menggunakan optimasi `next/image` dan Server Components).

2. **SEO & Accessibility:**

   * OpenGraph Meta Tags lengkap untuk pratinjau media sosial & WhatsApp.

   * Tag HTML Semantik (`<header>`, `<main>`, `<section>`, `<footer>`).

3. **Responsiveness:** Tampilan responsif sempurna dari layar mobile (`320px`) hingga desktop besar (`1920px+`).

## 7. Implementation Steps for AI Agent

1. **Step 1:** Inisialisasi project Next.js 15 App Router, konfigurasi Tailwind CSS, dan install dependencies (`lucide-react`, `framer-motion`, `canvas-confetti`, `@types/canvas-confetti`).

2. **Step 2:** Buat file `data/services.ts` sesuai skema interface pada section 4.1.

3. **Step 3:** Atur Design System / Tokens pada `globals.css` atau config Tailwind (Warna, Radius, Font, Glow Shadow).

4. **Step 4:** Bangun komponen UI secara bertahap (`Navbar`, `HeroSection`, `ServicesSection`, `ServiceCard`).

5. **Step 5:** Sambungkan interaksi filter, WhatsApp CTA URL generator, dan efek `canvas-confetti`.