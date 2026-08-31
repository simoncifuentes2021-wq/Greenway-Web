import type { Metadata } from 'next';
import { ProjectsIndexPage } from '@/components/projects-index-page';
import { StructuredData } from '@/components/structured-data';
import { createCorporatePageSchema } from '@/data/structured-data';

export const metadata: Metadata = {
  title: 'Proyectos de gestión ambiental',
  description: 'Sección de proyectos Greenway preparada para casos reales con desafío, solución, servicios, resultados y evidencia aprobada.',
  alternates: { canonical: '/proyectos' },
  openGraph: { title: 'Proyectos de gestión ambiental | Greenway', description: 'Experiencia en terreno documentada mediante casos reales cuando la información sea aprobada.', url: '/proyectos', type: 'website', images: [] },
};

export default function Page() {
  return <><StructuredData data={createCorporatePageSchema('/proyectos', 'Proyectos')} /><ProjectsIndexPage /></>;
}
