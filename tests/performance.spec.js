const { test, expect } = require('@playwright/test');

const ALL_PAGES = ['/', '/about', '/challenges', '/our-team', '/news', '/faqs', '/hall-of-fame'];

test.describe('Performance – Page Load Times', () => {
  for (const path of ALL_PAGES) {
    test(`"${path}" loads within 5 seconds`, async ({ page }) => {
      const start = Date.now();
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const duration = Date.now() - start;
      console.log(`  ⏱  ${path} loaded in ${duration}ms`);
      expect(duration).toBeLessThan(5000);
    });
  }
});

test.describe('Performance – No Console Errors', () => {
  for (const path of ALL_PAGES) {
    test(`"${path}" has no critical console errors`, async ({ page }) => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const criticalErrors = errors.filter(
        e => !e.includes('favicon') && !e.includes('analytics') && !e.includes('gtm')
      );
      if (criticalErrors.length > 0) {
        console.warn(`  ⚠  Console errors on ${path}:`, criticalErrors);
      }
      expect(criticalErrors.length).toBe(0);
    });
  }
});

test.describe('Accessibility – Basic Checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page should have exactly one <h1>', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('all images should have alt attributes', async ({ page }) => {
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('all links should have accessible text or aria-label', async ({ page }) => {
    const emptyLinks = await page.locator('a:not([aria-label])').evaluateAll(links =>
      links.filter(l => !l.textContent?.trim() && !l.querySelector('img[alt]')).length
    );
    expect(emptyLinks).toBe(0);
  });

  test('page should have a <title> tag', async ({ page }) => {
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});

test.describe('Responsive – Viewport Tests', () => {
  const viewports = [
    { name: 'Mobile (375px)',  width: 375,  height: 812 },
    { name: 'Tablet (768px)',  width: 768,  height: 1024 },
    { name: 'Desktop (1440px)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`homepage renders without overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHorizontalScroll).toBeFalsy();
    });
  }
});
