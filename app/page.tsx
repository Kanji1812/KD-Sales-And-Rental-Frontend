import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { Stats } from "@/components/sections/Stats";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <PageWrapper>
          <Hero />
          <Stats />
          <FeaturesGrid />
          <Testimonials />
          <PricingPreview />
          <CTA />
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}
