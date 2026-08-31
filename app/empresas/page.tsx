import type { Metadata } from 'next';
import { CompaniesPage } from '@/components/companies-page';
import { StructuredData } from '@/components/structured-data';
import { createCorporatePageSchema } from '@/data/structured-data';

export const metadata: Metadata = {
  title: 'Servicios ambientales para empresas e instituciones',
  description: 'Soluciones ambientales personalizadas para empresas, instituciones y organizaciones: residuos, medición, asesoría, energía y trazabilidad.',
  alternates: { canonical: '/empresas' },
  openGraph: { title: 'Servicios ambientales para empresas e instituciones | Greenway', description: 'Capacidad técnica y operacional para organizaciones que necesitan soluciones ambientales concretas y trazables.', url: '/empresas', type: 'website', images: [] },
};

export default function Page() {
  return <><StructuredData data={createCorporatePageSchema('/empresas', 'Empresas e instituciones', true)} /><CompaniesPage /></>;
}
