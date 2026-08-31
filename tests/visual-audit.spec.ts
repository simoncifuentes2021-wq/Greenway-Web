import { expect, test } from '@playwright/test';

const stage = process.env.VISUAL_STAGE ?? 'current';
const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-small-360x800', width: 360, height: 800 },
] as const;

for (const viewport of viewports) {
  test(`${viewport.name} has no horizontal overflow`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));

    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport);
    expect(consoleErrors).toEqual([]);
    await page.screenshot({
      path: `artifacts/visual-audit/${stage}/${viewport.name}-viewport.png`,
      animations: 'disabled',
    });
    await page.screenshot({
      path: `artifacts/visual-audit/${stage}/${viewport.name}.png`,
      fullPage: true,
      animations: 'disabled',
    });

    if (viewport.name === 'mobile-390x844') {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await page.screenshot({
        path: `artifacts/visual-audit/${stage}/mobile-menu-390x844.png`,
        animations: 'disabled',
      });
      await page.keyboard.press('Escape');
    }
  });
}
