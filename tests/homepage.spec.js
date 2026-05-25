const { test, expect } = require('@playwright/test');

test.describe('Homepage – Page Load & Meta', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load with HTTP 200', async ({ page }) => {
    const response = await page.request.get('/');
    expect(response.status()).toBe(200);
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Hackathon 2026/i);
  });

  test('should render the site logo', async ({ page }) => {
    const logo = page.getByRole('img', { name: /Hackathon 2026/i }).first();
    await expect(logo).toBeVisible();
  });
});

test.describe('Homepage – Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main tagline', async ({ page }) => {
    await expect(page.getByText(/THE ENERGY TO INNOVATE/i)).toBeVisible();
  });

  test('should show MAIN EVENT dates', async ({ page }) => {
    await expect(page.getByText(/MAY 24.30, 2026/i)).toBeVisible();
  });

  test('should display "Registration Closed" banner', async ({ page }) => {
    await expect(page.getByText(/Registration Closed/i)).toBeVisible();
  });

  test('should show the FINALE date', async ({ page }) => {
    await expect(page.getByText(/FINALE/i)).toBeVisible();
    await expect(page.getByText(/MAY 30, 2026/i)).toBeVisible();
  });
});

test.describe('Homepage – Hybrid Model Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display VIRTUAL BUILD + IN-PERSON STAGE heading', async ({ page }) => {
    await expect(page.getByText(/VIRTUAL BUILD/i)).toBeVisible();
    await expect(page.getByText(/IN-PERSON STAGE/i)).toBeVisible();
  });

  test('should show Phase 1 description', async ({ page }) => {
    await expect(page.getByText(/PHASE 1: THE VIRTUAL BUILD/i)).toBeVisible();
    await expect(page.getByText(/Sunday, May 24/i)).toBeVisible();
  });

  test('should show Phase 2 description', async ({ page }) => {
    await expect(page.getByText(/PHASE 2: THE IN-PERSON STAGE/i)).toBeVisible();
    await expect(page.getByText(/Friday, May 29/i)).toBeVisible();
  });
});

test.describe('Homepage – Sprint Roadmap', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display SPRINT ROADMAP heading', async ({ page }) => {
    await expect(page.getByText(/SPRINT ROADMAP/i)).toBeVisible();
  });

  test('should show all 5 roadmap phases', async ({ page }) => {
    await expect(page.getByText(/KICK OFF/i)).toBeVisible();
    await expect(page.getByText(/BUILD PHASE/i)).toBeVisible();
    await expect(page.getByText(/PROJECT SUBMISSION & JUDGING/i)).toBeVisible();
    await expect(page.getByText(/FINALISTS REVEAL/i)).toBeVisible();
    await expect(page.getByText(/FINALE/i)).toBeVisible();
  });
});

test.describe('Homepage – Students & Partners Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Students section', async ({ page }) => {
    await expect(page.getByText(/Build Something Real/i)).toBeVisible();
  });

  test('should display Partners section', async ({ page }) => {
    await expect(page.getByText(/Meet the Talent Building the Future/i)).toBeVisible();
  });

  test('"PARTNER WITH US" link should point to /challenges', async ({ page }) => {
    const link = page.getByRole('link', { name: /PARTNER WITH US/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /challenges/);
  });
});

test.describe('Homepage – Sponsors & Partners', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show Alectra sponsor logo', async ({ page }) => {
    const alectraLogo = page.getByRole('img', { name: /Alectra/i }).first();
    await expect(alectraLogo).toBeVisible();
  });

  test('Alectra logo should link to alectra.com', async ({ page }) => {
    const alectraLink = page.locator('a[href="https://www.alectra.com"]').first();
    await expect(alectraLink).toBeVisible();
  });

  test('should show Esri sponsor logo', async ({ page }) => {
    const esriLogo = page.getByRole('img', { name: /Esri/i }).first();
    await expect(esriLogo).toBeVisible();
  });

  test('should show partner logos (Octo, TTW, ComUnity, GDG)', async ({ page }) => {
    await expect(page.getByRole('img', { name: /Octo/i }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: /TorontoTechWeek/i }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: /ComUnity/i }).first()).toBeVisible();
    await expect(page.getByRole('img', { name: /GDG/i }).first()).toBeVisible();
  });
});

test.describe('Homepage – Hall of Fame', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display HALL OF FAME section', async ({ page }) => {
    await expect(page.getByText(/HALL OF FAME/i)).toBeVisible();
  });

  test('"Explore Hall Of Fame" link should navigate to /hall-of-fame', async ({ page }) => {
    const link = page.getByRole('link', { name: /Explore Hall Of Fame/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/hall-of-fame/);
  });
});
