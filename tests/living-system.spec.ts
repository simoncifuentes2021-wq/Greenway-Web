import { expect, test } from '@playwright/test';

test('the same flow responds to inputs and closes its geometry in the footer', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const hero = page.locator('[data-greenway-flow="hero"]');
  await expect(hero).toHaveAttribute('data-running', 'true');
  await page.mouse.move(1100, 350, { steps: 5 });
  await expect(hero).toHaveAttribute('data-mode', 'awakening');
  await expect(hero.locator('[data-flow-plane]')).not.toHaveCSS('transform', 'none');
  await page.getByRole('link', { name: 'Cotizar servicio' }).first().focus();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  const footer = page.locator('footer [data-greenway-flow="footer"]');
  await expect(footer).toHaveAttribute('data-mode', 'completing');
  await expect(hero).toHaveAttribute('data-running', 'false');
  await expect.poll(() => footer.locator('[data-flow-path]').first().evaluate((e: SVGPathElement) => {
    const start = e.getPointAtLength(0), end = e.getPointAtLength(e.getTotalLength());
    return Math.hypot(start.x - end.x, start.y - end.y);
  })).toBeLessThan(3);
  expect(errors).toEqual([]);
});

test('desktop orbit has inertia, visited nodes and only authored relationships', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const section = page.locator('#servicios-experiencia');
  const nodes = section.locator('button[aria-controls="service-panel-desktop"]');
  await nodes.filter({ hasText: 'Manejo de Residuos' }).click();
  await nodes.filter({ hasText: 'Economía Circular' }).click();
  await expect(section.locator('[data-service-relation]')).toHaveCount(1);
  await expect(nodes.filter({ hasText: 'Manejo de Residuos' })).toHaveAttribute('data-visited', 'true');
  await nodes.filter({ hasText: 'Limpieza' }).click();
  await expect(section.locator('[data-service-relation]')).toHaveCount(0);
  const surface = section.locator('[data-service-drag="desktop"]');
  await surface.scrollIntoViewIfNeeded();
  const box = (await surface.boundingBox())!;
  const previous = await section.locator('#service-panel-desktop h3').textContent();
  await page.mouse.move(box.x + box.width * .38, box.y + box.height * .53);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .73, box.y + box.height * .53, { steps: 12 });
  await expect(surface).toHaveAttribute('data-dragging', 'true');
  await page.mouse.up();
  await expect(surface).toHaveAttribute('data-dragging', 'false');
  await expect(section.locator('#service-panel-desktop h3')).not.toHaveText(previous!);
  await expect(surface.locator('[data-orbit-rotate]').first()).toHaveAttribute('style', /rotate/);
});

test('mobile swipes select services and preserve normal vertical scrolling', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(test.info().project.use.baseURL + '/', { waitUntil: 'networkidle' });
  const surface = page.locator('[data-service-drag="mobile"]');
  await surface.scrollIntoViewIfNeeded();
  const box = (await surface.boundingBox())!;
  const client = await context.newCDPSession(page);
  const swipe = async (x: number, y: number, dx: number, dy: number) => {
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 12; step++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * step / 12, y: y + dy * step / 12 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  const previous = await page.locator('#service-panel-desktop h3').textContent();
  await swipe(box.x + box.width * .72, box.y + box.height * .5, -box.width * .5, 0);
  await expect(page.locator('#service-panel-desktop h3')).not.toHaveText(previous!);
  await surface.scrollIntoViewIfNeeded();
  const nextBox = (await surface.boundingBox())!;
  const scroll = await page.evaluate(() => scrollY);
  await swipe(nextBox.x + nextBox.width / 2, nextBox.y + nextBox.height * .7, 0, -160);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scroll + 40);
  expect(errors).toEqual([]);
  await context.close();
});

test('reduced motion keeps controls, stops continuous motion and restores after navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('[data-greenway-flow="hero"]')).toHaveAttribute('data-running', 'false');
  await page.getByRole('button', { name: 'Explorar servicio siguiente' }).click();
  await expect(page.locator('#service-panel-desktop h3')).toHaveText('Asesoría Ambiental');
  await page.getByRole('button', { name: 'Móvil', exact: true }).click();
  await expect(page.locator('[data-technology-drag]')).toHaveAttribute('data-device', 'phone');
  await page.locator('footer').getByRole('link', { name: 'Nosotros', exact: true }).click();
  await expect(page.locator('.internal-hero [data-greenway-flow]')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
