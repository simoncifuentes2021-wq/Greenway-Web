import type { Metadata } from 'next';
import { AboutPage } from '@/components/about-page';
import { StructuredData } from '@/components/structured-data';
import { createCorporatePageSchema } from '@/data/structured-data';

export const metadata: Metadata = {
  title: 'Nosotros: experiencia ambiental en terreno',
  description: 'Conoce el propósito, la experiencia operacional y la forma de trabajo de Greenway en servicios ambientales personalizados.',
  alternates: { canonical: '/nosotros' },
  openGraph: { title: 'Nosotros: experiencia ambiental en terreno | Greenway', description: 'Más de 10 años de experiencia declarada, capacidad técnica y soluciones ambientales adaptadas a cada proyecto.', url: '/nosotros', type: 'website', images: [] },
};

export default function Page() {
  return <><StructuredData data={createCorporatePageSchema('/nosotros', 'Nosotros', true)} /><AboutPage /></>;
}
