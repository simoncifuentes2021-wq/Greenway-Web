import { ClientsSection } from '@/components/sections/clients-section';
import { FeaturedServices } from '@/components/sections/featured-services';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { ImpactSection } from '@/components/sections/impact-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { OrganizationsSection } from '@/components/sections/organizations-section';
import { PortalSection } from '@/components/sections/portal-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { PurposeSection } from '@/components/sections/purpose-section';
import { ServicesEcosystem } from '@/components/sections/services-ecosystem';
import { SolarEnergySection } from '@/components/sections/solar-energy-section';
import { TeamSection } from '@/components/sections/team-section';
import { WhyGreenway } from '@/components/sections/why-greenway';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <Hero />
        <MetricsSection />
        <PurposeSection />
        <ServicesEcosystem />
        <FeaturedServices />
        <ProcessSection />
        <ProjectsSection />
        <PortalSection />
        <SolarEnergySection />
        <ImpactSection />
        <OrganizationsSection />
        <WhyGreenway />
        <TeamSection />
        <ClientsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
