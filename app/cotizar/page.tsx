import type { Metadata } from 'next';
import { QuotePage } from '@/components/quote-page';
import { StructuredData } from '@/components/structured-data';
import { services } from '@/data/site';
import { createCorporatePageSchema } from '@/data/structured-data';

export const metadata: Metadata = {
  title: 'Cotizar servicios ambientales',
  description: 'Cuéntanos las necesidades de tu evento, producción u organización para preparar una futura cotización de servicios ambientales Greenway.',
  alternates: { canonical: '/cotizar' },
  openGraph: { title: 'Cotizar servicios ambientales | Greenway', description: 'Comparte el contexto de tu operación y el servicio ambiental que necesitas.', url: '/cotizar', type: 'website', images: [] },
};

type Props = { searchParams: Promise<{ servicio?: string | string[] }> };

export default async function Page({ searchParams }: Props) {
  const requested = (await searchParams).servicio;
  const candidate = Array.isArray(requested) ? requested[0] : requested;
  const initialService = services.some((service) => service.slug === candidate) ? candidate ?? '' : '';
  return <><StructuredData data={createCorporatePageSchema('/cotizar', 'Cotizar')} /><QuotePage initialService={initialService} /></>;
}
