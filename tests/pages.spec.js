const { test, expect } = require('@playwright/test');

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/about');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain "About" in the document', async ({ page }) => {
    await expect(page.getByText(/about/i).first()).toBeVisible();
  });
});

test.describe('Challenges Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenges');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/challenges');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain challenge-related content', async ({ page }) => {
    await expect(
      page.getByText(/challenge/i).first()
    ).toBeVisible();
  });
});

test.describe('Our Team Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/our-team');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/our-team');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain team-related content', async ({ page }) => {
    await expect(page.getByText(/team/i).first()).toBeVisible();
  });
});

test.describe('News & Media Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/news');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain news/media-related content', async ({ page }) => {
    await expect(page.getByText(/news|media/i).first()).toBeVisible();
  });
});

test.describe('FAQs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faqs');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/faqs');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain FAQ/questions content', async ({ page }) => {
    await expect(page.getByText(/faq|question|frequently/i).first()).toBeVisible();
  });
});

test.describe('Hall of Fame Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hall-of-fame');
    await page.waitForLoadState('networkidle');
  });

  test('should return 200 OK', async ({ page }) => {
    const res = await page.request.get('/hall-of-fame');
    expect(res.status()).toBe(200);
  });

  test('should not show 404 message', async ({ page }) => {
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible();
  });

  test('should contain "Hall of Fame" or innovation-related content', async ({ page }) => {
    await expect(page.getByText(/hall of fame|innovation|project/i).first()).toBeVisible();
  });
});

test.describe('404 – Invalid Pages', () => {
  test('non-existent page should show an error or redirect gracefully', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-xyz');
    const isExpected = response?.status() === 404 || page.url() === 'https://www.senecahackathon.com/';
    expect(isExpected).toBeTruthy();
  });
});
