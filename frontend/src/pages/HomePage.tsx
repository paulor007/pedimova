import { ArchitectureSection } from "../components/site/ArchitectureSection";
import { BenefitsSection } from "../components/site/BenefitsSection";
import { DomainsSection } from "../components/site/DomainsSection";
import { HeroSection } from "../components/site/HeroSection";
import { ContingenciesSection } from "../components/site/ContingenciesSection";
import { OperationOverviewSection } from "../components/site/OperationOverviewSection";
import { FinalCallSection } from "../components/site/FinalCallSection";
import { pageTitle } from "../config/brand";

export function HomePage() {
  return (
    <>
      <title>{pageTitle()}</title>

      <HeroSection />

      <ArchitectureSection />

      <DomainsSection />

      <ContingenciesSection />

      <OperationOverviewSection />

      <BenefitsSection />

      <FinalCallSection />
    </>
  );
}
