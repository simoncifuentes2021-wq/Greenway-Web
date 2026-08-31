import { expect, test } from '@playwright/test';

const servicePages = [
  { slug: 'reciclaje', title: 'Reciclaje para eventos y producciones' },
  { slug: 'manejo-de-residuos', title: 'Manejo de residuos para eventos y operaciones' },
  { slug: 'huella-de-carbono', title: 'Medición de huella de carbono para eventos' },
  { slug: 'energias-renovables', title: 'Energía solar para eventos, faenas y zonas remotas' },
] as const;

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-small-360x800', width: 360, height: 800 },
] as const;

for (const service of servicePages) {
  test(`${service.slug} has complete metadata, schema, navigation and CTAs`, async ({ page, request }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto(`/servicios/${service.slug}`, { waitUntil: 'networkidle' });

    await expect(page).toHaveTitle(new RegExp(`${service.title}.*Greenway`));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Greenway/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/servicios/${service.slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(service.title);

    const breadcrumbs = page.getByRole('navigation', { name: 'Migas de pan' });
    await expect(breadcrumbs.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    await expect(breadcrumbs.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/servicios');
    await expect(breadcrumbs.locator('[aria-current="page"]')).toBeVisible();

    const primaryCta = page.locator('main').getByRole('link', { name: 'Cotizar servicio' }).first();
    await expect(primaryCta).toHaveAttribute('href', `/cotizar?servicio=${service.slug}`);
    await primaryCta.focus();
    await expect(primaryCta).toBeFocused();

    const schema = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(schema).toBeTruthy();
    const graph = JSON.parse(schema ?? '{}')['@graph'] as { '@type': string }[];
    expect(graph.map((item) => item['@type'])).toEqual(['Organization', 'Service', 'BreadcrumbList']);

    const internalHrefs = await page.locator('main a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)))],
    );
    for (const href of internalHrefs) {
      const response = await request.get(href);
      expect(response.status(), `${href} should resolve`).toBeLessThan(400);
    }

    const missingAlts = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.hasAttribute('alt')).length);
    expect(missingAlts).toBe(0);
    expect(consoleErrors).toEqual([]);
  });
}

for (const viewport of viewports) {
  test(`service pages at ${viewport.name} have no overflow or console errors`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const service of servicePages) {
      const consoleErrors: string[] = [];
      const listener = (message: { type: () => string; text: () => string }) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      };
      page.on('console', listener);

      await page.goto(`/servicios/${service.slug}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      }));

      expect(dimensions.page, `${service.slug} overflows at ${viewport.name}`).toBeLessThanOrEqual(dimensions.viewport);
      expect(consoleErrors, `${service.slug} logs errors at ${viewport.name}`).toEqual([]);
      expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');

      await page.screenshot({
        path: `artifacts/visual-audit/service-pages/${service.slug}-${viewport.name}.png`,
        animations: 'disabled',
        fullPage: viewport.width === 1440 || viewport.width === 390,
      });
      page.off('console', listener);
    }
  });
}

test('certified service pages remain indexable and included in the sitemap', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml');
  const body = await sitemap.text();

  for (const service of servicePages) {
    await page.goto(`/servicios/${service.slug}`);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    expect(body).toContain(`/servicios/${service.slug}`);
  }
});
