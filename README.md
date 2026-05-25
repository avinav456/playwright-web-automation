# Seneca Hackathon 2026 – Playwright Test Suite

Automated end-to-end tests for [senecahackathon.com](https://www.senecahackathon.com).

---

## 📁 Project Structure

```
playwright-web-automation/
├── playwright.config.js       # Browser projects, timeouts, reporter
├── package.json
├── tests/
│   ├── homepage.spec.js       # Hero, roadmap, sponsors, Hall of Fame
│   ├── navigation.spec.js     # Nav bar links + routing
│   ├── pages.spec.js          # All sub-pages load & 404 handling
│   ├── footer.spec.js         # Address, social links, copyright, email
│   └── performance.spec.js    # Load time, console errors, a11y, responsive
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

---

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (first time only)
npx playwright install --with-deps
```

---

## 🧪 Running Tests

| Command | What it runs |
|---|---|
| `npm test` | All tests, all 3 browsers |
| `npm run test:chrome` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:mobile` | iPhone 14 (Mobile Safari) |
| `npm run test:homepage` | Homepage tests only |
| `npm run test:navigation` | Navigation tests only |
| `npm run test:pages` | Sub-page tests only |
| `npm run test:footer` | Footer tests only |
| `npm run test:performance` | Performance & accessibility |
| `npm run test:headed` | Run with browser window visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the HTML test report |

---

## 📊 Test Coverage

### `homepage.spec.js` (26 tests)
- Page load & HTTP 200
- Title & logo
- Hero section: tagline, event dates, registration status
- Hybrid model phases (virtual + in-person)
- Sprint roadmap (5 phases)
- Students & Partners sections + CTA link
- Sponsor logos (Alectra, Esri, SSF, Octo, TTW, ComUnity, GDG)
- Hall of Fame section + link

### `navigation.spec.js` (15 tests)
- All 6 nav links visible (Home, About, Challenges, Our Team, News, FAQs)
- Each link has correct `href`
- Clicking each link routes to the right page
- Logo links back to homepage
- Browser back button works

### `pages.spec.js` (13 tests)
- HTTP 200 for all sub-pages: `/about`, `/challenges`, `/our-team`, `/news`, `/faqs`, `/hall-of-fame`
- No 404 error messages shown
- Content presence per page
- 404 graceful handling for invalid URLs

### `footer.spec.js` (9 tests)
- Seneca Polytechnic postal address
- `learnatocto.com` link
- Instagram, YouTube, LinkedIn social links
- Contact email: `hackathon@senecapolytechnic.ca`
- Copyright 2026 notice

### `performance.spec.js` (17 tests)
- All pages load in < 5 seconds
- Zero critical console errors on all pages
- Homepage has ≥1 `<h1>`
- All `<img>` have `alt` attributes
- All links have accessible text
- `<title>` tag present
- No horizontal scroll at 375px, 768px, 1440px

---

## 📄 Reports

After a test run, open the HTML report:

```bash
npm run report
```

Screenshots and videos are captured automatically on failures in `test-results/`.
