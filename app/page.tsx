import { ClientsSection } from '@/components/sections/clients-section';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { MetricsSection } from '@/components/sections/metrics-section';
import { OrganizationsSection } from '@/components/sections/organizations-section';
import { PortalSection } from '@/components/sections/portal-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { PurposeSection } from '@/components/sections/purpose-section';
import { ServicesEcosystem } from '@/components/sections/services-ecosystem';
import { TeamSection } from '@/components/sections/team-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { StoryReveals } from '@/components/animations/story-reveals';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <SiteHeader overlay />
      <main id="main-content" tabIndex={-1} className={styles.home}>
        <StoryReveals />
        <Hero />
        <MetricsSection />
        <PurposeSection />
        <ServicesEcosystem />
        <ProcessSection />
        <ProjectsSection />
        <PortalSection />
        <TeamSection />
        <ClientsSection />
        <OrganizationsSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
