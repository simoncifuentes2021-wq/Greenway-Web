import { expect, test } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`the five living scenes at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'nextjs-portal { display:none!important; }' });
    await expect(page.locator('#home-hero-title')).toHaveCSS('opacity', '1');
    await page.mouse.move(width * .75, 350, { steps: 6 });
    for (const [name, selector] of [
      ['awakening', '#home-hero'],
      ['connection', 'section[aria-labelledby="proposito-title"]'],
      ['ecosystem', '#servicios-experiencia'],
      ['transformation', '#portal'],
      ['cycle', 'footer'],
    ]) {
      const scene = page.locator(selector);
      if (name !== 'awakening') await page.addStyleTag({ content: 'header,.skip-link { visibility:hidden!important; }' });
      await scene.scrollIntoViewIfNeeded();
      if (name === 'cycle') {
        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
        await expect.poll(() => scene.locator('[data-flow-path]').first().evaluate((path: SVGPathElement) => {
          const a = path.getPointAtLength(0), b = path.getPointAtLength(path.getTotalLength());
          return Math.hypot(a.x - b.x, a.y - b.y);
        })).toBeLessThan(3);
      }
      for (const img of await scene.locator('img:visible').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty('complete', true, { timeout: 15_000 });
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await scene.screenshot({ path: `artifacts/living-system/${name}-${width}.png`, animations: 'disabled' });
    }
  });
}
