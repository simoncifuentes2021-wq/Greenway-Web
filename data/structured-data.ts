import type { ServicePageContent } from '@/data/service-pages';
import { siteUrl } from '@/data/site';

export type SchemaBreadcrumb = {
  name: string;
  path: string;
};

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Greenway',
  url: siteUrl,
  description: 'Servicios ambientales y sanitarios para eventos, producciones, empresas e instituciones.',
} as const;

export function createBreadcrumbSchema(items: SchemaBreadcrumb[], pagePath: string) {
  const pageUrl = `${siteUrl}${pagePath}`;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function createServicePageSchema(page: ServicePageContent) {
  const pagePath = `/servicios/${page.slug}`;
  const pageUrl = `${siteUrl}${pagePath}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: page.eyebrow,
        serviceType: page.eyebrow,
        description: page.metaDescription,
        url: pageUrl,
        provider: { '@id': organizationSchema['@id'] },
      },
      createBreadcrumbSchema([
        { name: 'Inicio', path: '' },
        { name: 'Servicios', path: '/servicios' },
        { name: page.eyebrow, path: pagePath },
      ], pagePath),
    ],
  };
}

export function createCorporatePageSchema(pagePath: string, pageName: string, includeOrganization = false) {
  const graph: Record<string, unknown>[] = [
    createBreadcrumbSchema([
      { name: 'Inicio', path: '' },
      { name: pageName, path: pagePath },
    ], pagePath),
  ];
  if (includeOrganization) graph.unshift(organizationSchema);
  return { '@context': 'https://schema.org', '@graph': graph };
}
