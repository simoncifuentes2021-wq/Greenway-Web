import { expect, test } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

test('measure living-system frames, CPU, heap and layout on four device profiles', async ({ browser, baseURL }) => {
  test.setTimeout(180_000);
  const report = [];
  for (const profile of [
    { name: 'desktop', width: 1440, rate: 1, mobile: false },
    { name: 'desktop-medium', width: 1280, rate: 4, mobile: false },
    { name: 'mobile', width: 390, rate: 4, mobile: true },
    { name: 'mobile-small', width: 360, rate: 6, mobile: true },
  ]) {
    const context = await browser.newContext({ viewport: { width: profile.width, height: 900 }, isMobile: profile.mobile, hasTouch: profile.mobile });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: profile.rate });
    await client.send('Performance.enable');
    await page.addInitScript(() => {
      const state = window as typeof window & { flowVitals: { cls: number; lcp: number; longTasks: number } };
      state.flowVitals = { cls: 0, lcp: 0, longTasks: 0 };
      new PerformanceObserver((entries) => entries.getEntries().forEach((entry) => {
        const value = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!value.hadRecentInput) state.flowVitals.cls += value.value;
      })).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((entries) => { state.flowVitals.lcp = entries.getEntries().at(-1)?.startTime ?? 0; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((entries) => { state.flowVitals.longTasks += entries.getEntries().length; }).observe({ type: 'longtask', buffered: true });
    });
    await page.goto(baseURL + '/', { waitUntil: 'networkidle' });
    await expect(page.locator('#home-hero-title')).toHaveCSS('opacity', '1');
    const before = await client.send('Performance.getMetrics');
    const start = performance.now();
    const frames = page.evaluate(() => new Promise<number[]>((resolve) => {
      const timings: number[] = []; let previous = 0, beginning = 0;
      const tick = (time: number) => {
        if (!beginning) beginning = time;
        if (previous) timings.push(time - previous);
        previous = time;
        if (time - beginning < 2200) requestAnimationFrame(tick); else resolve(timings);
      };
      requestAnimationFrame(tick);
    }));
    for (let i = 0; i < 6; i++) {
      await page.mouse.move(profile.width * (.2 + i * .1), 400, { steps: 8 });
      await page.mouse.wheel(0, 130);
    }
    const samples = (await frames).sort((a, b) => a - b);
    const after = await client.send('Performance.getMetrics');
    const metrics = (list: { metrics: { name: string; value: number }[] }, name: string) => list.metrics.find((metric) => metric.name === name)?.value ?? 0;
    const vitals = await page.evaluate(() => (window as typeof window & { flowVitals: { cls: number; lcp: number; longTasks: number } }).flowVitals);
    expect(vitals.cls).toBeLessThan(.1);
    report.push({ ...profile, ...vitals, medianFPS: +(1000 / samples[Math.floor(samples.length / 2)]).toFixed(1), p95FrameMs: +samples[Math.floor(samples.length * .95)].toFixed(2), cpuTaskMs: Math.round((metrics(after, 'TaskDuration') - metrics(before, 'TaskDuration')) * 1000), elapsedMs: Math.round(performance.now() - start), heapMB: +(metrics(after, 'JSHeapUsedSize') / 1024 / 1024).toFixed(2), domNodes: metrics(after, 'Nodes'), quality: await page.locator('[data-greenway-flow="hero"]').getAttribute('data-quality') });
    await context.close();
  }
  mkdirSync('artifacts/living-system', { recursive: true });
  writeFileSync('artifacts/living-system/performance.json', JSON.stringify({ note: 'Local Chromium, CPU emulation, no network throttling; synthetic measurements, not real-device or field data.', report }, null, 2));
});

test('limited devices retain a static signature and no mandatory gestures', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => 2 }));
  await page.goto('/');
  const flow = page.locator('[data-greenway-flow="hero"]');
  await expect(flow).toHaveAttribute('data-quality', 'minimal');
  await expect(flow).toHaveAttribute('data-running', 'false');
  const particle = flow.locator('[data-flow-particle]').first();
  const position = await particle.getAttribute('cx');
  await page.mouse.move(900, 350, { steps: 8 });
  await expect(particle).toHaveAttribute('cx', position!);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
