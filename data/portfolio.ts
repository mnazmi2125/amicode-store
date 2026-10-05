import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  TrendingUp,
} from "lucide-react";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  result: string;
  gradient: string;
  icon: LucideIcon;
  span: string;
  height: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "nusa-shop",
    title: "Nusa Shop",
    category: "E-Commerce",
    result: "Konversi checkout +320%",
    gradient: "from-[#0A84FF] via-[#5E5CE6] to-[#BF5AF2]",
    icon: ShoppingCart,
    span: "sm:col-span-2 lg:col-span-4",
    height: "min-h-[320px] lg:min-h-[400px]",
  },
  {
    id: "karya-dashboard",
    title: "Karya Dashboard",
    category: "Sistem Internal",
    result: "Hemat 20 jam kerja / minggu",
    gradient: "from-[#12A594] via-[#30D158] to-[#0A84FF]",
    icon: LayoutDashboard,
    span: "lg:col-span-2",
    height: "min-h-[320px] lg:min-h-[400px]",
  },
  {
    id: "medibot",
    title: "MediBot WhatsApp",
    category: "Bot Otomasi",
    result: "12rb chat/bulan ditangani otomatis",
    gradient: "from-[#64D2FF] via-[#0A84FF] to-[#5E5CE6]",
    icon: Bot,
    span: "lg:col-span-2",
    height: "min-h-[260px] lg:min-h-[300px]",
  },
  {
    id: "fittrack",
    title: "FitTrack App",
    category: "Mobile App",
    result: "50rb+ unduhan di Play Store",
    gradient: "from-[#FF9F0A] via-[#FF375F] to-[#BF5AF2]",
    icon: Smartphone,
    span: "lg:col-span-2",
    height: "min-h-[260px] lg:min-h-[300px]",
  },
  {
    id: "seo-rakasa",
    title: "SEO Rakasa",
    category: "SEO & Growth",
    result: "Organic traffic +180% dalam 6 bulan",
    gradient: "from-[#0A84FF] via-[#12A594] to-[#30D158]",
    icon: TrendingUp,
    span: "lg:col-span-2",
    height: "min-h-[260px] lg:min-h-[300px]",
  },
  {
    id: "landing-klinika",
    title: "Landing Klinika Sehat",
    category: "Landing Page",
    result: "Lead baru +240% di bulan pertama",
    gradient: "from-[#5E5CE6] via-[#BF5AF2] to-[#FF375F]",
    icon: Globe,
    span: "sm:col-span-2 lg:col-span-6",
    height: "min-h-[280px] lg:min-h-[340px]",
  },
];
