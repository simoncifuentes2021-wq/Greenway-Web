import { expect, test } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

test('production home reserves layout and keeps media responsive', async ({ page, baseURL }) => {
  test.setTimeout(90_000);
  const report = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      const measured = window as typeof window & { greenwayVitals: { cls: number; lcp: number } };
      measured.greenwayVitals = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => list.getEntries().forEach((entry) => {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) measured.greenwayVitals.cls += shift.value;
      })).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((list) => {
        measured.greenwayVitals.lcp = list.getEntries().at(-1)?.startTime ?? 0;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('#home-hero-title')).toHaveCSS('opacity', '1');
    const initial = await page.evaluate(() => ({
      ...(window as typeof window & { greenwayVitals: { cls: number; lcp: number } }).greenwayVitals,
      resources: performance.getEntriesByType('resource').map((e) => {
        const r = e as PerformanceResourceTiming;
        return { name: new URL(r.name).pathname, bytes: r.transferSize };
      }),
    }));
    for (const id of ['proposito-title', 'ecosistema-title', 'portal-title', 'final-cta-title']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    }
    const cls = await page.evaluate(() => (window as typeof window & { greenwayVitals: { cls: number } }).greenwayVitals.cls);
    expect(cls).toBeLessThan(.1);
    expect(await page.locator('video[autoplay], canvas').count()).toBe(0);
    report.push({ width, baseURL, initial, clsAfterScroll: cls, note: 'Local Chromium, no network or CPU throttling; not field Core Web Vitals.' });
  }
  mkdirSync('artifacts/premium', { recursive: true });
  writeFileSync('artifacts/premium/performance-local.json', JSON.stringify(report, null, 2));
});
