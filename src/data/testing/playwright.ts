import type { InterviewQuestion } from '../../types'

export const playwrightQuestions: InterviewQuestion[] = [
  {
    id: 61,
    category: 'Playwright',
    question: 'What is Playwright and how does it differ from other E2E tools?',
    answer: 'Playwright is a Microsoft-maintained browser automation library that supports Chromium, Firefox, and WebKit with a unified API. It uses the browser\'s native automation protocols, runs tests in parallel out of the box, and includes auto-waiting, network interception, and tracing built in. Unlike Cypress, Playwright can test multiple tabs, iframes, and browser contexts in one test. In a real app, a single Playwright suite validates checkout in Chrome, Safari, and Firefox without separate tooling.',
    code: `import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});`,
  },
  {
    id: 62,
    category: 'Playwright',
    question: 'What is the Page Object Model in Playwright?',
    answer: 'The Page Object Model encapsulates page-specific selectors and actions in a class, so tests read like user scenarios rather than low-level DOM operations. A LoginPage class might expose fillEmail(), fillPassword(), and submit() methods that hide selector details. When the UI changes, you update one class instead of every test. In a real app, CheckoutPage.placeOrder() wraps filling shipping fields and clicking confirm, reused across guest and logged-in checkout tests.',
    code: `class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}

// test: await loginPage.login("user@example.com", "secret");`,
  },
  {
    id: 63,
    category: 'Playwright',
    question: 'What are Playwright locators and why are they preferred over page.$()?',
    answer: 'Locators are Playwright\'s primary element-finding API — they are lazy, auto-retrying, and support readable methods like getByRole, getByLabel, and getByTestId. Unlike one-shot element handles from page.$(), locators re-query the DOM on each action, staying valid after re-renders. Chain locators with filter() and nth() for precise targeting. In a real app, page.getByRole("button", { name: "Add to cart" }) survives React re-renders that would stale a cached element handle.',
    code: `const addButton = page.getByRole("button", { name: "Add to cart" });
await addButton.click();

// Chain and filter
await page
  .getByTestId("product-card")
  .filter({ hasText: "Widget" })
  .getByRole("button", { name: "Buy" })
  .click();`,
  },
  {
    id: 64,
    category: 'Playwright',
    question: 'How does Playwright auto-waiting work?',
    answer: 'Playwright automatically waits for elements to be actionable before clicking, filling, or asserting — checking visibility, stability, enabled state, and receiving events. Assertions with expect(locator) retry until the condition passes or the timeout expires. This eliminates most manual sleep calls and reduces flakiness. In a real app, await page.getByText("Payment complete").click() waits for the success message to appear and stabilize before interacting.',
    code: `// Playwright waits automatically for:
// - element attached to DOM
// - visible and stable (not animating)
// - enabled and not obscured

await page.getByRole("button", { name: "Submit" }).click();

// Assertions retry too
await expect(page.getByRole("alert")).toHaveText("Saved successfully");`,
  },
  {
    id: 65,
    category: 'Playwright',
    question: 'How do you run Playwright tests across multiple browsers?',
    answer: 'Configure projects in playwright.config.ts with different browser devices or channel settings for chromium, firefox, and webkit. Playwright Test runs each project, and you can tag tests to run only on specific browsers. CI matrices can shard projects across workers for speed. In a real app, three projects in config ensure a modal component works in Chrome, Firefox, and Safari WebKit.',
    code: `// playwright.config.ts
export default defineConfig({
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});

// Run one: npx playwright test --project=firefox`,
  },
  {
    id: 66,
    category: 'Playwright',
    question: 'What is the Playwright Trace Viewer and when do you use it?',
    answer: 'The Trace Viewer captures a detailed recording of test execution including DOM snapshots, network requests, console logs, and screenshots at each step. Enable tracing with trace: "on-first-retry" or trace: "retain-on-failure" in config, then open the trace with npx playwright show-trace trace.zip. It is invaluable for debugging CI failures you cannot reproduce locally. In a real app, when a flaky checkout test fails in CI, the trace shows exactly which API call returned 500 before the assertion failed.',
    code: `// playwright.config.ts
export default defineConfig({
  use: {
    trace: "on-first-retry", // capture trace when test retries
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});

// Debug: npx playwright show-trace test-results/.../trace.zip`,
  },
  {
    id: 67,
    category: 'Playwright',
    question: 'How do you perform API testing with Playwright?',
    answer: 'Playwright provides request via APIRequestContext for HTTP calls independent of the browser, sharing cookies and auth state with browser contexts when needed. Use it to seed data, verify endpoints, or run pure API test suites alongside E2E tests. apiTest in Playwright Test runs without launching a browser for speed. In a real app, POST /api/users via request.post() seeds a user, then a browser test logs in as that user.',
    code: `import { test, expect } from "@playwright/test";

test("API creates user", async ({ request }) => {
  const response = await request.post("/api/users", {
    data: { email: "new@example.com", name: "New User" },
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.email).toBe("new@example.com");
});`,
  },
  {
    id: 68,
    category: 'Playwright',
    question: 'What is Playwright codegen and how does it help?',
    answer: 'Codegen (npx playwright codegen) opens a browser and records your interactions, generating Playwright test code with locators in real time. It accelerates test authoring and teaches recommended locator strategies like getByRole. Generated code often needs cleanup — remove redundant steps and replace brittle selectors. In a real app, record a signup flow to get a starter spec, then refactor into a SignupPage page object.',
    code: `// Generate tests interactively:
// npx playwright codegen https://example.com/signup

// Generated output (simplified):
await page.goto("https://example.com/signup");
await page.getByLabel("Email").fill("user@example.com");
await page.getByRole("button", { name: "Create account" }).click();
await expect(page.getByText("Welcome")).toBeVisible();`,
  },
  {
    id: 69,
    category: 'Playwright',
    question: 'How does Playwright handle parallel test execution?',
    answer: 'Playwright Test runs test files in parallel by default using worker processes, each with isolated browser contexts. Configure workers in playwright.config.ts or via --workers CLI flag. Tests within the same file run sequentially unless test.describe.configure({ mode: "parallel" }) is set. Parallel runs dramatically reduce CI time but require test isolation. In a real app, 4 workers on a 4-core CI runner cut a 20-minute suite to under 6 minutes.',
    code: `// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,
});

// CLI: npx playwright test --workers=8`,
  },
  {
    id: 70,
    category: 'Playwright',
    question: 'How do you mock network requests in Playwright?',
    answer: 'Use page.route() to intercept requests matching a URL pattern and fulfill them with mock responses, abort them, or modify real responses. route.fulfill() returns static JSON, while route.fetch() lets you modify a real upstream response. Combine with page.waitForResponse() to synchronize on mocked calls. In a real app, route "**/api/products" to return fixture data so product listing tests never hit production APIs.',
    code: `await page.route("**/api/products", (route) => {
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([{ id: 1, name: "Widget", price: 29.99 }]),
  });
});

await page.goto("/shop");
await expect(page.getByText("Widget")).toBeVisible();`,
  },
  {
    id: 71,
    category: 'Playwright',
    question: 'What are Playwright fixtures and how do they extend test setup?',
    answer: 'Fixtures are Playwright\'s dependency injection system — built-in fixtures like page, context, and browser are provided to each test, and you can define custom fixtures with test.extend(). Fixtures handle setup and teardown automatically and can depend on other fixtures. They replace global beforeEach hooks with composable, typed setup. In a real app, an authenticatedPage fixture logs in once and yields a page already on the dashboard.',
    code: `const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("secret");
    await page.getByRole("button", { name: "Sign in" }).click();
    await use(page);
  },
});

test("dashboard loads", async ({ authenticatedPage }) => {
  await expect(authenticatedPage.getByText("Dashboard")).toBeVisible();
});`,
  },
  {
    id: 72,
    category: 'Playwright',
    question: 'How do you test file downloads in Playwright?',
    answer: 'Start waiting for the download event before triggering the action that initiates it, then save or inspect the downloaded file. page.waitForEvent("download") returns a Download object with path(), suggestedFilename(), and saveAs() methods. This pattern handles browser download dialogs that cannot be interacted with directly. In a real app, click "Export CSV" and assert the downloaded file contains expected column headers.',
    code: `test("exports CSV", async ({ page }) => {
  await page.goto("/reports");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/report.*\\.csv/);
  const path = await download.path();
  // read file and assert contents
});`,
  },
  {
    id: 73,
    category: 'Playwright',
    question: 'What is test.describe and how do you organize Playwright tests?',
    answer: 'test.describe groups related tests under a shared label, supporting nested describes, beforeEach/afterEach hooks, and configuration like retries or timeouts at the group level. describe.configure controls parallel vs serial execution within a file. Organizing by feature or page keeps specs maintainable. In a real app, test.describe("Shopping cart") contains add, remove, and checkout tests sharing a beforeEach that navigates to /products.',
    code: `test.describe("Shopping cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("adds item to cart", async ({ page }) => {
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await expect(page.getByTestId("cart-count")).toHaveText("1");
  });

  test("removes item from cart", async ({ page }) => {
    // ...
  });
});`,
  },
  {
    id: 74,
    category: 'Playwright',
    question: 'How do you handle authentication state reuse in Playwright?',
    answer: 'Log in once in a setup project, save storageState to a JSON file, and reuse it across tests via storageState in config or test.use(). This avoids repeating login UI steps in every spec and speeds up suites significantly. storageState includes cookies and localStorage. In a real app, a global-setup.ts authenticates an admin user and saves admin-auth.json for all admin dashboard tests.',
    code: `// global-setup.ts — login and save state
await page.goto("/login");
await page.getByLabel("Email").fill("admin@example.com");
await page.getByLabel("Password").fill("secret");
await page.getByRole("button", { name: "Sign in" }).click();
await page.context().storageState({ path: "admin-auth.json" });

// playwright.config.ts
use: { storageState: "admin-auth.json" }`,
  },
  {
    id: 75,
    category: 'Playwright',
    question: 'What is the difference between page.click() and locator.click()?',
    answer: 'In modern Playwright, you should use locator.click() rather than page.click(selector) because locators auto-retry and re-query the DOM. page.click with a string selector still works but is a legacy pattern that can act on stale elements. Locators also support strict mode, failing if multiple elements match when one is expected. In a real app, prefer page.getByRole("link", { name: "Settings" }).click() over page.click("text=Settings").',
    code: `// Preferred — locator with auto-retry
await page.getByRole("button", { name: "Save" }).click();

// Legacy — string selector, no retry semantics
// await page.click('button:has-text("Save")');

// Strict mode error if 2+ matches:
// await page.getByRole("button").click(); // throws`,
  },
  {
    id: 76,
    category: 'Playwright',
    question: 'How do you test responsive layouts in Playwright?',
    answer: 'Use page.setViewportSize() or device presets from playwright.devices to simulate mobile, tablet, and desktop dimensions. Playwright can also emulate touch, geolocation, and color scheme preferences. Run the same test across viewport projects in config for comprehensive coverage. In a real app, set viewport to iPhone 13 dimensions and verify the mobile hamburger menu appears while the desktop nav is hidden.',
    code: `import { devices } from "@playwright/test";

test.use({ ...devices["iPhone 13"] });

test("mobile nav menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("desktop-nav")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
});`,
  },
  {
    id: 77,
    category: 'Playwright',
    question: 'What are Playwright test assertions and how do they retry?',
    answer: 'Playwright wraps expect with web-first assertions that retry until pass or timeout — toBeVisible(), toHaveText(), toHaveCount(), and toHaveURL() among others. Configure default timeout globally or per assertion with { timeout: 10000 }. This retry behavior is what makes Playwright tests resilient to async UI updates. In a real app, await expect(page.getByRole("status")).toHaveText("3 items") waits for the cart count to update after an API call.',
    code: `await expect(page.getByRole("heading")).toHaveText("Dashboard");
await expect(page.getByTestId("cart-item")).toHaveCount(3);
await expect(page).toHaveURL(/\\/checkout/);

// Custom timeout for slow operations
await expect(page.getByText("Report ready")).toBeVisible({ timeout: 30_000 });`,
  },
  {
    id: 78,
    category: 'Playwright',
    question: 'How do you test WebSocket or SSE behavior in Playwright?',
    answer: 'Monitor network events with page.on("websocket") to inspect frames sent and received, or mock WebSocket servers using route and external tools. For SSE, wait for specific DOM updates triggered by streamed events. Playwright does not provide a first-class WebSocket mock, so teams often stub at the API layer or use MSW. In a real app, listen for websocket connections to /ws/chat and assert a "Connected" status badge appears after the handshake.',
    code: `test("websocket chat connects", async ({ page }) => {
  const wsPromise = page.waitForEvent("websocket");
  await page.goto("/chat");

  const ws = await wsPromise;
  expect(ws.url()).toContain("/ws/chat");

  ws.on("framereceived", (frame) => {
    // inspect incoming messages
  });

  await expect(page.getByText("Connected")).toBeVisible();
});`,
  },
  {
    id: 79,
    category: 'Playwright',
    question: 'What is Playwright component testing?',
    answer: 'Playwright CT mounts components in a real browser using @playwright/experimental-ct-react (or Vue/Svelte adapters) with mount() similar to Cypress component testing. It shares Playwright\'s locator and assertion APIs and runs in the same config ecosystem as E2E tests. Component tests validate rendering, interactions, and accessibility with real browser behavior. In a real app, mount a SearchInput component and verify debounced API calls fire after typing.',
    code: `import { test, expect } from "@playwright/experimental-ct-react";
import { SearchInput } from "./SearchInput";

test("search input renders", async ({ mount }) => {
  const component = await mount(<SearchInput placeholder="Search..." />);
  await expect(component.getByPlaceholder("Search...")).toBeVisible();
});`,
  },
  {
    id: 80,
    category: 'Playwright',
    question: 'How do you configure Playwright for CI environments?',
    answer: 'Set retries, workers, forbidOnly, and reporter in playwright.config.ts with CI-specific conditionals. Install browsers in CI with npx playwright install --with-deps. Use blob reporter or HTML reporter for artifacts uploaded on failure. Sharding splits tests across multiple CI jobs with --shard=1/4. In a real app, GitHub Actions runs playwright test with 2 retries, uploads trace and HTML report artifacts, and fails the build if forbidOnly catches a committed test.only.',
    code: `// playwright.config.ts
export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html"], ["github"]] : "list",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },
});`,
  },
]
