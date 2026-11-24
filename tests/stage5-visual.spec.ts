import { expect, test } from '@playwright/test';

test.setTimeout(180_000);

const stage = process.env.STAGE5_VISUAL_STAGE ?? 'stage5-regression';
const root = `artifacts/visual-audit/${stage}`;

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-small-360x800', width: 360, height: 800 },
] as const;

async function prepare(page: import('@playwright/test').Page, path: string) {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
  expect(consoleErrors).toEqual([]);
}

for (const viewport of viewports) {
  test(`stage 5 Home ${viewport.name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await prepare(page, '/');
    await page.screenshot({ path: `${root}/home-${viewport.name}.png`, fullPage: true, animations: 'disabled' });
  });
}

const routes = [
  { path: '/servicios', name: 'servicios' },
  { path: '/servicios/limpieza', name: 'servicio-operacional-limpieza' },
  { path: '/servicios/huella-de-carbono', name: 'servicio-huella-de-carbono' },
  { path: '/servicios/energias-renovables', name: 'servicio-energias-renovables' },
  { path: '/nosotros', name: 'nosotros' },
  { path: '/empresas', name: 'empresas' },
  { path: '/proyectos', name: 'proyectos' },
  { path: '/cotizar?servicio=limpieza', name: 'cotizar' },
] as const;

for (const route of routes) {
  test(`stage 5 route ${route.name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await prepare(page, route.path);
    await page.screenshot({ path: `${root}/${route.name}-desktop-1440x900.png`, fullPage: true, animations: 'disabled' });
  });
}

const sections = [
  ['hero', '[aria-labelledby="home-hero-title"]'],
  ['metrics', '[aria-labelledby="impacto-title"]'],
  ['ecosystem', '[aria-labelledby="ecosistema-title"]'],
  ['featured-services', '[aria-labelledby="featured-services-title"]'],
  ['process', '[aria-labelledby="process-title"]'],
  ['projects', '[aria-labelledby="projects-title"]'],
  ['appgreenway', '[aria-labelledby="portal-title"]'],
  ['energy', '[aria-labelledby="solar-title"]'],
  ['final-cta', '[aria-labelledby="final-cta-title"]'],
] as const;

for (const viewport of [viewports[0], viewports[3]]) {
  test(`stage 5 signature sections ${viewport.name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await prepare(page, '/');
    for (const [name, selector] of sections) {
      const section = page.locator(selector);
      await expect(section).toBeVisible();
      if (name !== 'hero') await page.locator('header').evaluate((element) => { element.style.visibility = 'hidden'; });
      await section.screenshot({ path: `${root}/section-${name}-${viewport.name}.png`, animations: 'disabled' });
      if (name !== 'hero') await page.locator('header').evaluate((element) => { element.style.visibility = ''; });
    }
  });
}
