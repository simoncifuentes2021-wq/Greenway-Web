import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/components/service-detail-page';
import { StructuredData } from '@/components/structured-data';
import { InternalPage } from '@/components/internal-page';
import { isDetailedServiceSlug, servicePages } from '@/data/service-pages';
import { services } from '@/data/site';
import { createServicePageSchema } from '@/data/structured-data';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  if (!isDetailedServiceSlug(slug)) {
    return {
      title: service.name,
      description: service.description,
      robots: { index: false, follow: true },
    };
  }

  const page = servicePages[slug];
  const canonical = `/servicios/${slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${page.metaTitle} | Greenway`,
      description: page.metaDescription,
      url: canonical,
      type: 'website',
      locale: 'es_CL',
      siteName: 'Greenway',
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${page.metaTitle} | Greenway`,
      description: page.metaDescription,
      images: [],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  if (isDetailedServiceSlug(slug)) {
    const page = servicePages[slug];
    const schema = createServicePageSchema(page);

    return (
      <>
        <StructuredData data={schema} />
        <ServiceDetailPage service={page} />
      </>
    );
  }
  return <InternalPage eyebrow="Servicio" title={service.name} description={service.description}><p className="mt-10 rounded-2xl border border-line bg-white p-6 text-sm text-muted">Contenido detallado pendiente de validación con el cliente.</p></InternalPage>;
}
