import { expect, test } from '@playwright/test';

test('desktop header, service focus and footer CTA preserve contrast', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const firstNavLink = page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link').first();
  await expect(page.locator('header')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('header > div').first()).toHaveCSS('height', '76px');
  const headerColor = await firstNavLink.evaluate((element) => getComputedStyle(element).color);
  expect(headerColor).toContain('255, 255, 255');

  await page.evaluate(() => window.scrollTo(0, 820));
  await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(22, 61, 53)');
  await expect(page.locator('header > div').first()).toHaveCSS('height', '76px');
  const scrolledColor = await firstNavLink.evaluate((element) => getComputedStyle(element).color);
  expect(scrolledColor).toBe('rgb(255, 255, 255)');

  await page.evaluate(() => window.scrollTo(0, 1800));
  await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(22, 61, 53)');

  const serviceSelector = page.getByRole('button', { name: 'Limpieza', exact: true }).first();
  await serviceSelector.click();
  await expect(page.locator('#service-panel-desktop h3')).toHaveText('Limpieza');

  const footerCta = page.getByRole('link', { name: 'Conversemos sobre tu proyecto' });
  const footerStyles = await footerCta.evaluate((element) => ({
    color: getComputedStyle(element).color,
    background: getComputedStyle(element).backgroundColor,
  }));
  expect(footerStyles.color).not.toBe(footerStyles.background);
});

test('mobile menu supports Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const menuButton = page.getByRole('button', { name: 'Abrir menú' });
  await menuButton.click();
  await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Navegación móvil' })).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test('Hero runs its editorial entrance sequence once on load', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const title = page.locator('#home-hero-title');
  const timings = await title.evaluate((element) => element.getAnimations().map((animation) => {
    const timing = animation.effect?.getTiming();
    return { delay: Number(timing?.delay), duration: Number(timing?.duration) };
  }));
  expect(timings).toContainEqual({ delay: 170, duration: 640 });
  await page.waitForTimeout(900);
  await expect(title).toHaveCSS('opacity', '1');
});

test('reduced motion disables smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const scrollBehavior = await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe('auto');
  const heroFrames = await page.locator('#home-hero-title').evaluate((element) => {
    const effect = element.getAnimations()[0]?.effect;
    return effect instanceof KeyframeEffect ? effect.getKeyframes() : [];
  });
  expect(heroFrames.every((frame) => !frame.transform || frame.transform === 'none')).toBe(true);
});

test('confirmed metrics animate when visible and finish at their approved values', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const metrics = page.locator('[aria-labelledby="impacto-title"] dd span[aria-hidden="true"]');
  await expect(metrics).toHaveCount(4);
  await page.locator('[aria-labelledby="impacto-title"]').evaluate((element) => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(250);
  await expect(metrics.nth(1)).not.toHaveText('500+');
  await page.waitForTimeout(1100);
  await expect(metrics.nth(0)).toHaveText('+10');
  await expect(metrics.nth(1)).toHaveText('500+');
  await expect(metrics.nth(2)).toHaveText('42.000');
  await expect(metrics.nth(3)).toHaveText('200+');

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(150);
  await page.locator('[aria-labelledby="impacto-title"]').evaluate((element) => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(250);
  await expect(metrics.nth(2)).not.toHaveText('42.000');
});

test('all internal Home links resolve successfully', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)))],
  );

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), `${href} should resolve`).toBeLessThan(400);
  }
});
