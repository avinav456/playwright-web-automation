const { test, expect } = require('@playwright/test');

test.describe('Footer – Address', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Seneca Polytechnic address', async ({ page }) => {
    await expect(page.getByText(/Seneca Polytechnic/i).last()).toBeVisible();
    await expect(page.getByText(/1750 Finch Ave East/i)).toBeVisible();
    await expect(page.getByText(/Toronto, Ontario/i)).toBeVisible();
    await expect(page.getByText(/M2J 2X5/i)).toBeVisible();
  });
});

test.describe('Footer – Learning Resources', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('learnatocto.com link should be in the footer', async ({ page }) => {
    const link = page.getByRole('link', { name: /learnatocto\.com/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /learnatocto\.com/);
  });
});

test.describe('Footer – Social Media Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Instagram link should be present', async ({ page }) => {
    const ig = page.locator('a[href*="instagram.com/senecahackathon"]');
    await expect(ig).toBeVisible();
  });

  test('YouTube link should be present', async ({ page }) => {
    const yt = page.locator('a[href*="youtube.com"]');
    await expect(yt).toBeVisible();
  });

  test('LinkedIn link should be present', async ({ page }) => {
    const li = page.locator('a[href*="linkedin.com/company/seneca-hackathon"]');
    await expect(li).toBeVisible();
  });
});

test.describe('Footer – Contact Email', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hackathon contact email should be shown', async ({ page }) => {
    await expect(page.getByText(/hackathon@senecapolytechnic\.ca/i)).toBeVisible();
  });
});

test.describe('Footer – Copyright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('copyright notice should be present', async ({ page }) => {
    await expect(page.getByText(/Copyright 2026/i)).toBeVisible();
    await expect(page.getByText(/Seneca Polytechnic Hackathon 2026/i)).toBeVisible();
  });
});
