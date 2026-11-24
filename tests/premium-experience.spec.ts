import { expect, test } from '@playwright/test';

test('editorial scenes stay readable and stable across viewports', async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    expect(await page.locator('.skip-link').evaluate((e) => e.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
    await page.screenshot({ path: `artifacts/premium/hero-${width}.png` });
    const overflow = await page.evaluate(() => ({
      styles: ['#home-hero', '.skip-link', '#proposito-title'].map((s) => { const e = document.querySelector(s)!; const c = getComputedStyle(e); return [s, e.className, c.color, c.position, c.overflow, c.transform]; }),
      width: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll('main *')].filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.right > innerWidth + 2;
      }).map((el) => `${el.tagName}.${el.className}`).slice(0, 12),
    }));
    expect.soft(overflow.width, JSON.stringify(overflow)).toBeLessThanOrEqual(width);
    for (const id of ['proposito-title', 'ecosistema-title', 'portal-title', 'final-cta-title']) {
      await page.addStyleTag({ content: 'header, .skip-link { visibility: hidden !important; }' });
      const section = page.locator(`section[aria-labelledby="${id}"]`);
      for (const img of await section.locator('img:visible').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty('complete', true, { timeout: 15_000 });
        await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      }
      await section.screenshot({ path: `artifacts/premium/${id}-${width}.png` });
    }
  }
  expect(errors).toEqual([]);
});

test('depth is subtle, resets and respects a live reduced-motion preference', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const plane = page.locator('#home-hero [data-depth-plane]');
  await page.mouse.move(1200, 300);
  await expect(plane).toHaveAttribute('style', /rotateY/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(plane).not.toHaveAttribute('style', /rotateY/);
  await page.mouse.move(1100, 400);
  await expect(plane).not.toHaveAttribute('style', /rotateY/);
});

test('all service selections preserve destinations and stable panel geometry', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const panel = page.locator('#service-panel-desktop');
    const selector = width === 1440 ? 'service-panel-desktop' : 'service-panel-mobile';
    const buttons = page.locator(`button[aria-controls="${selector}"]`);
    const initialHeight = (await panel.boundingBox())!.height;
    for (const button of await buttons.all()) {
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      const label = await button.getAttribute('aria-label');
      await expect(panel.locator('h3')).toHaveText(label!);
      await expect(panel.getByRole('link')).toHaveAttribute('href', /^\/servicios\//);
      expect(Math.abs((await panel.boundingBox())!.height - initialHeight)).toBeLessThan(2);
    }
  }
});

test('touch menu contains focus and releases the page on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  const lastLink = page.getByRole('navigation', { name: 'Navegación móvil' }).getByRole('link', { name: 'Cotizar servicio' });
  await lastLink.focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('header .site-logo')).toBeFocused();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('main')).not.toHaveAttribute('inert');
  await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toHaveCount(0);
});
