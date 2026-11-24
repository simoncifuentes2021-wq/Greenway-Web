import { expect, test } from '@playwright/test';

test.setTimeout(120_000);

const newServices = [
  { slug: 'limpieza', title: 'Limpieza para eventos antes, durante y después' },
  { slug: 'economia-circular', title: 'Economía circular para recuperar y reutilizar materiales' },
  { slug: 'asesoria-ambiental', title: 'Asesoría ambiental para eventos y organizaciones' },
  { slug: 'gestion-y-trazabilidad', title: 'Gestión y trazabilidad ambiental con AppGreenway' },
  { slug: 'movilidad-sostenible', title: 'Movilidad sostenible para eventos y recintos' },
  { slug: 'sustentabilidad-audiovisual', title: 'Sustentabilidad para producciones audiovisuales' },
] as const;

const corporatePages = [
  { path: '/servicios', title: 'Soluciones conectadas para cada operación.', schemaTypes: ['Organization', 'BreadcrumbList'] },
  { path: '/nosotros', title: 'Experiencia para llevar la gestión ambiental a terreno.', schemaTypes: ['Organization', 'BreadcrumbList'] },
  { path: '/empresas', title: 'Gestión ambiental para organizaciones.', schemaTypes: ['Organization', 'BreadcrumbList'] },
  { path: '/proyectos', title: 'Experiencia que se demuestra en terreno.', schemaTypes: ['BreadcrumbList'] },
  { path: '/cotizar', title: 'Cuéntanos qué necesita tu proyecto.', schemaTypes: ['BreadcrumbList'] },
] as const;

const auditRoutes = [
  '/',
  '/servicios',
  ...newServices.map((service) => `/servicios/${service.slug}`),
  '/nosotros',
  '/empresas',
  '/proyectos',
  '/cotizar?servicio=limpieza',
];

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-small-360x800', width: 360, height: 800 },
] as const;

for (const service of newServices) {
  test(`${service.slug} is indexable with service metadata, schema and internal links`, async ({ page, request }) => {
    await page.goto(`/servicios/${service.slug}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(service.title);
    await expect(page).toHaveTitle(/Greenway/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Greenway/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/servicios/${service.slug}$`));
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);

    const schemaText = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(schemaText ?? '{}')['@graph'] as { '@type': string }[];
    expect(graph.map((item) => item['@type'])).toEqual(['Organization', 'Service', 'BreadcrumbList']);

    const breadcrumbs = page.getByRole('navigation', { name: 'Migas de pan' });
    await expect(breadcrumbs.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    await expect(breadcrumbs.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/servicios');
    await expect(page.locator('main').getByRole('link', { name: 'Cotizar servicio' }).first()).toHaveAttribute('href', `/cotizar?servicio=${service.slug}`);

    const hrefs = await page.locator('main a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)))]);
    for (const href of hrefs) expect((await request.get(href)).status(), `${href} should resolve`).toBeLessThan(400);
  });
}

for (const corporate of corporatePages) {
  test(`${corporate.path} has unique metadata, breadcrumbs and supported schema`, async ({ page }) => {
    await page.goto(corporate.path, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(corporate.title);
    await expect(page).toHaveTitle(/Greenway/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${corporate.path}$`));
    await expect(page.getByRole('navigation', { name: 'Migas de pan' })).toBeVisible();

    const schemaText = await page.locator('script[type="application/ld+json"]').first().textContent();
    const graph = JSON.parse(schemaText ?? '{}')['@graph'] as { '@type': string }[];
    expect(graph.map((item) => item['@type'])).toEqual(corporate.schemaTypes);
  });
}

test('services index exposes ten crawlable service links grouped by need', async ({ page, request }) => {
  await page.goto('/servicios');
  const serviceLinks = page.locator('section[aria-labelledby="service-groups-title"] a[href^="/servicios/"]');
  await expect(serviceLinks).toHaveCount(10);
  const hrefs = await serviceLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href') as string));
  expect(new Set(hrefs).size).toBe(10);
  for (const href of hrefs) expect((await request.get(href)).status()).toBe(200);
});

test('quote form preselects a valid service and does not simulate submission', async ({ page }) => {
  await page.goto('/cotizar?servicio=movilidad-sostenible');
  await expect(page.getByLabel('Servicio')).toHaveValue('movilidad-sostenible');
  await expect(page.getByLabel('Nombre')).toBeEditable();
  await expect(page.getByLabel('Empresa u organización')).toBeEditable();
  await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email');
  await expect(page.getByLabel('Teléfono')).toHaveAttribute('type', 'tel');
  await expect(page.getByLabel('Fecha')).toHaveAttribute('type', 'date');
  await expect(page.getByRole('button', { name: 'Envío pendiente de configuración' })).toBeDisabled();
  await expect(page.getByText('El formulario no envía ni almacena datos.')).toBeVisible();

  await page.goto('/cotizar?servicio=slug-invalido');
  await expect(page.getByLabel('Servicio')).toHaveValue('');
});

test('all ten services are indexable and present in the sitemap; project details remain unavailable', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml');
  const body = await sitemap.text();
  const serviceHrefs = await page.goto('/servicios').then(async () => page.locator('main a[href^="/servicios/"]').evaluateAll((links) => links.map((link) => link.getAttribute('href') as string)));
  for (const href of serviceHrefs) {
    expect(body).toContain(href);
    await page.goto(href);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  }

  const projectDetail = await request.get('/proyectos/caso-no-aprobado');
  expect(projectDetail.status()).toBe(404);
});

for (const viewport of viewports) {
  test(`stage 4 routes at ${viewport.name} have no overflow or console errors`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of auditRoutes) {
      const consoleErrors: string[] = [];
      const listener = (message: { type: () => string; text: () => string }) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      };
      page.on('console', listener);
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth }));
      expect(dimensions.page, `${route} overflows at ${viewport.name}`).toBeLessThanOrEqual(dimensions.viewport);
      expect(consoleErrors, `${route} logs errors at ${viewport.name}`).toEqual([]);
      expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
      await page.screenshot({ path: `artifacts/visual-audit/stage4/${route.replace(/[/?=]/g, '-').replace(/^-+|-+$/g, '') || 'home'}-${viewport.name}.png`, animations: 'disabled' });
      page.off('console', listener);
    }
  });
}
