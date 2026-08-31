import type { Metadata } from 'next';
import { ServicesIndexPage } from '@/components/services-index-page';
import { StructuredData } from '@/components/structured-data';
import { createCorporatePageSchema } from '@/data/structured-data';

export const metadata: Metadata = {
  title: 'Servicios ambientales',
  description: 'Conoce los servicios ambientales y sanitarios de Greenway para eventos, producciones, empresas e instituciones.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios ambientales | Greenway',
    description: 'Soluciones ambientales y sanitarias conectadas, planificadas según cada operación.',
    url: '/servicios',
    type: 'website',
    images: [],
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={createCorporatePageSchema('/servicios', 'Servicios', true)} />
      <ServicesIndexPage />
    </>
  );
}
