import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import FAQSection from "@/components/FAQSection";
import PartnerMarquee from "@/components/PartnerMarquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <StatsSection />
        <FAQSection />
        <PartnerMarquee />
      </main>
    </>
  );
}
