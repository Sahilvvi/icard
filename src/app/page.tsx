import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { CustomCursor } from "@/components/CustomCursor";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IDCardExperience } from "@/components/IDCardExperience";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { Loader } from "@/components/Loader";
import { ManufacturingStory } from "@/components/ManufacturingStory";
import { Navbar } from "@/components/Navbar";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { PartnershipPaths } from "@/components/PartnershipPaths";
import { Product3DViewer } from "@/components/Product3DViewer";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProofStats } from "@/components/ProofStats";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TrustMetrics } from "@/components/TrustMetrics";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <main id="top">
        <Hero />
        <TrustMetrics />
        <PartnerMarquee />
        <EcosystemSection />
        <ProductCarousel />
        <Product3DViewer />
        <PartnershipPaths />
        <ManufacturingStory />
        <IndustrySolutions />
        <IDCardExperience />
        <ProofStats />
        <CTASection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
