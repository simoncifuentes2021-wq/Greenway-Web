import type { MetadataRoute } from 'next';
import { detailedServiceSlugs } from '@/data/service-pages';
import { siteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/servicios', '/proyectos', '/nosotros', '/empresas', '/cotizar'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: 'monthly' as const, priority: route === '' ? 1 : 0.7 })),
    ...detailedServiceSlugs.map((slug) => ({ url: `${siteUrl}/servicios/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
