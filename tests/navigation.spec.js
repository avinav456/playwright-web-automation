const { test, expect } = require('@playwright/test');

const NAV_LINKS = [
  { label: 'Home',        href: '/',          urlPattern: /senecahackathon\.com\/?$/ },
  { label: 'About',       href: '/about',      urlPattern: /\/about/ },
  { label: 'Challenges',  href: '/challenges', urlPattern: /\/challenges/ },
  { label: 'Our Team',    href: '/our-team',   urlPattern: /\/our-team/ },
  { label: 'News & Media',href: '/news',       urlPattern: /\/news/ },
  { label: 'FAQs',        href: '/faqs',       urlPattern: /\/faqs/ },
];

test.describe('Navigation Bar – Link Presence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const link of NAV_LINKS) {
    test(`nav link "${link.label}" is visible`, async ({ page }) => {
      const navLink = page.getByRole('navigation').getByRole('link', { name: link.label }).first();
      await expect(navLink).toBeVisible();
    });

    test(`nav link "${link.label}" has correct href`, async ({ page }) => {
      const navLink = page.getByRole('navigation').getByRole('link', { name: link.label }).first();
      const href = await navLink.getAttribute('href');
      expect(href).toContain(link.href);
    });
  }
});

test.describe('Navigation Bar – Routing', () => {
  for (const link of NAV_LINKS) {
    test(`clicking "${link.label}" navigates to correct URL`, async ({ page }) => {
      await page.goto('/');
      const navLink = page.getByRole('navigation').getByRole('link', { name: link.label }).first();
      await navLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(link.urlPattern);
      await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
    });
  }
});

test.describe('Navigation Bar – Logo Link', () => {
  test('logo links back to homepage', async ({ page }) => {
    await page.goto('/about');
    const logoLink = page.getByRole('link').filter({
      has: page.getByRole('img', { name: /Hackathon 2026/i }),
    }).first();
    await logoLink.click();
    await expect(page).toHaveURL(/senecahackathon\.com\/?$/);
  });
});

test.describe('Navigation Bar – Back Navigation', () => {
  test('browser back button returns to previous page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/about');
    await page.goBack();
    await expect(page).toHaveURL(/senecahackathon\.com\/?$/);
  });
});
