import { expect, test } from '@playwright/test';

test.setTimeout(150_000);

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-small-360x800', width: 360, height: 800 },
] as const;

const routes = [
  { path: '/', name: 'home' },
  { path: '/servicios', name: 'servicios' },
  { path: '/servicios/limpieza', name: 'servicio-limpieza' },
  { path: '/nosotros', name: 'nosotros' },
  { path: '/empresas', name: 'empresas' },
  { path: '/proyectos', name: 'proyectos' },
  { path: '/cotizar?servicio=limpieza', name: 'cotizar-limpieza' },
] as const;

for (const viewport of viewports) {
  test(`premium routes at ${viewport.name} stay responsive and quiet`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      const consoleErrors: string[] = [];
      const listener = (message: { type: () => string; text: () => string }) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      };
      page.on('console', listener);
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
      await page.evaluate(() => document.fonts.ready);

      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth }));
      expect(dimensions.page, `${route.path} overflows at ${viewport.name}`).toBeLessThanOrEqual(dimensions.viewport);
      expect(consoleErrors, `${route.path} logs errors at ${viewport.name}`).toEqual([]);
      expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');

      await page.screenshot({ path: `artifacts/visual-audit/premium-after/${route.name}-${viewport.name}.png`, animations: 'disabled', fullPage: true });
      page.off('console', listener);
    }
  });
}

for (const viewport of [viewports[0], viewports[3]]) {
  test(`premium Home signature sections at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    const sections = [
      ['header', page.locator('header')],
      ['hero', page.locator('[aria-labelledby="home-hero-title"]')],
      ['ecosystem', page.locator('[aria-labelledby="ecosistema-title"]')],
      ['process', page.locator('[aria-labelledby="process-title"]')],
      ['projects', page.locator('[aria-labelledby="projects-title"]')],
      ['portal', page.locator('[aria-labelledby="portal-title"]')],
      ['solar', page.locator('[aria-labelledby="solar-title"]')],
      ['cta', page.locator('[aria-labelledby="final-cta-title"]')],
    ] as const;
    for (const [name, locator] of sections) {
      await expect(locator).toBeVisible();
      await locator.screenshot({ path: `artifacts/visual-audit/premium-after/section-${name}-${viewport.name}.png`, animations: 'disabled' });
      if (name === 'header') await page.addStyleTag({ content: 'header { display: none !important; }' });
    }
  });
}

test('desktop ecosystem exposes ten keyboard-operable service nodes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const ecosystem = page.locator('[aria-labelledby="ecosistema-title"]');
  const nodes = ecosystem.locator('button[aria-controls="service-panel-desktop"]');
  await expect(nodes).toHaveCount(10);
  await expect(ecosystem.locator('.ecosystem-signal-line')).toHaveCount(0);
  const orbitDistances = await ecosystem.evaluate((section) => {
    const center = section.querySelector('#ecosystem-center')?.getBoundingClientRect();
    if (!center) return [];
    const centerPoint = { x: center.left + center.width / 2, y: center.top + center.height / 2 };
    return [...section.querySelectorAll<HTMLButtonElement>('button[aria-controls="service-panel-desktop"]')].map((button) => {
      const icon = button.querySelector('span')?.getBoundingClientRect();
      if (!icon) return 0;
      return Math.hypot(icon.left + icon.width / 2 - centerPoint.x, icon.top + icon.height / 2 - centerPoint.y);
    });
  });
  expect(Math.max(...orbitDistances) - Math.min(...orbitDistances)).toBeLessThan(1);
  await nodes.first().focus();
  await page.keyboard.press('Tab');
  await expect(nodes.nth(1)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(nodes.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.waitForTimeout(280);
  await expect(ecosystem.locator('#ecosystem-center p')).toHaveText('Energías Renovables');
  const signal = ecosystem.locator('.ecosystem-signal-line');
  await expect(signal).toHaveCount(1);
  expect(await signal.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  expect(await ecosystem.locator('[data-core-aura]').evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  const originDelta = await ecosystem.evaluate((section) => {
    const path = section.querySelector<SVGPathElement>('.ecosystem-signal-line');
    const icon = section.querySelectorAll<HTMLButtonElement>('button[aria-controls="service-panel-desktop"]')[1]?.querySelector('span')?.getBoundingClientRect();
    const matrix = path?.getScreenCTM();
    if (!path || !icon || !matrix) return Number.POSITIVE_INFINITY;
    const origin = new DOMPoint(path.getPointAtLength(0).x, path.getPointAtLength(0).y).matrixTransform(matrix);
    return Math.hypot(origin.x - (icon.left + icon.width / 2), origin.y - (icon.top + icon.height / 2));
  });
  expect(originDelta).toBeLessThan(1);
  await expect(ecosystem.locator('#service-panel-desktop h3')).toHaveText('Limpieza');
  await expect(ecosystem.locator('#service-panel-desktop a')).toHaveAttribute('href', '/servicios/limpieza');
  await expect(ecosystem.locator('#ecosystem-center p')).toHaveText('Limpieza', { timeout: 900 });
  await page.waitForTimeout(250);
  await ecosystem.screenshot({ path: 'artifacts/visual-audit/premium-after/ecosystem-interactive-desktop.png' });
});

test('mobile ecosystem uses a dedicated touch selector and contextual panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const ecosystem = page.locator('[aria-labelledby="ecosistema-title"]');
  const mobility = ecosystem.getByRole('button', { name: 'Movilidad' });
  await mobility.click();
  await expect(mobility).toHaveAttribute('aria-pressed', 'true');
  await expect(ecosystem.locator('#service-panel-mobile h3')).toHaveText('Movilidad Sostenible');
  await expect(ecosystem.locator('#service-panel-mobile a')).toHaveAttribute('href', '/servicios/movilidad-sostenible');
});
