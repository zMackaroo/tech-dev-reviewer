import type { InterviewQuestion } from '../../types'

export const strategiesQuestions: InterviewQuestion[] = [
  {
    id: 81,
    category: 'UI Testing Strategies',
    question: 'What is accessibility testing and why include it in UI tests?',
    answer: 'Accessibility testing verifies that your application is usable by people with disabilities and compatible with assistive technologies like screen readers. Automated tools check ARIA roles, labels, color contrast, keyboard navigation, and focus management. Catching a11y issues in tests is cheaper than fixing them after launch or facing compliance risk. In a real app, assert that form inputs have associated labels and that error messages use role="alert" so screen reader users hear validation feedback.',
    code: `import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("login form has no a11y violations", async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Also test keyboard navigation manually or with RTL:
// await user.tab(); expect(emailInput).toHaveFocus();`,
  },
  {
    id: 82,
    category: 'UI Testing Strategies',
    question: 'What is visual regression testing?',
    answer: 'Visual regression testing captures screenshots of UI components or pages and compares them pixel-by-pixel against approved baseline images to detect unintended visual changes. Tools like Percy, Chromatic, Playwright snapshots, or BackstopJS automate this in CI. Differences in layout, color, or typography trigger review workflows. In a real app, a Percy build on every PR flags that a button padding change shifted the checkout total by 4 pixels.',
    code: `// Playwright visual snapshot
test("homepage matches snapshot", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixelRatio: 0.01,
  });
});

// Storybook + Chromatic for component-level visual tests
// npx chromatic --project-token=\${CHROMATIC_TOKEN}`,
  },
  {
    id: 83,
    category: 'UI Testing Strategies',
    question: 'Why is test isolation critical in UI test suites?',
    answer: 'Test isolation ensures each test starts from a known clean state and does not depend on data or side effects from other tests. Shared databases, cached auth tokens, or leftover DOM state cause order-dependent failures that pass locally but fail in CI. Isolation enables parallel execution and reliable debugging. In a real app, reset the test database and clear localStorage in beforeEach so a "delete account" test does not break the next "view profile" test.',
    code: `beforeEach(async () => {
  await resetTestDatabase();
  await page.evaluate(() => localStorage.clear());
  await page.context().clearCookies();
});

// Each test gets fresh state — safe to run in parallel`,
  },
  {
    id: 84,
    category: 'UI Testing Strategies',
    question: 'What causes flaky tests and how do you fix them?',
    answer: 'Flaky tests pass and fail intermittently without code changes, usually due to race conditions, timing assumptions, shared state, or dependencies on external services. Fix them by replacing hard-coded waits with condition-based waits, stubbing network calls, isolating test data, and increasing timeouts only as a last resort. Track flaky test rates in CI and quarantine persistently flaky tests until fixed. In a real app, replace setTimeout(1000) before asserting toast visibility with waitFor(() => expect(screen.getByRole("alert")).toBeVisible()).',
    code: `// Flaky — fixed delay
await new Promise((r) => setTimeout(r, 1000));
expect(screen.getByText("Saved")).toBeInTheDocument();

// Stable — wait for condition
await waitFor(() => {
  expect(screen.getByRole("alert")).toHaveTextContent("Saved");
});`,
  },
  {
    id: 85,
    category: 'UI Testing Strategies',
    question: 'How should automated tests integrate into CI pipelines?',
    answer: 'Run fast unit tests on every commit, integration tests on pull requests, and E2E tests against preview or staging environments before merge or deploy. Fail the build on test failures, publish coverage and test reports as artifacts, and parallelize slow suites across workers. Separate test stages so developers get quick feedback within minutes. In a real app, a PR pipeline runs lint, typecheck, and Jest in 3 minutes, then triggers Playwright against a Vercel preview URL.',
    code: `# GitHub Actions (simplified)
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: npm test -- --coverage

  e2e:
    needs: unit
    runs-on: ubuntu-latest
    steps:
      - run: npx playwright test
    env:
      BASE_URL: \${{ steps.preview.outputs.url }}`,
  },
  {
    id: 86,
    category: 'UI Testing Strategies',
    question: 'What should you test in a frontend application?',
    answer: 'Focus on user-facing behavior, business logic, and critical paths rather than implementation details. Test pure functions and hooks with unit tests, component interactions with RTL, API integration with mocked or staging backends, and key user journeys with E2E tests. Skip testing third-party library internals or trivial getters. In a real app, test that applying a coupon reduces the total, but do not test that useState was called twice inside the coupon component.',
    code: `// DO test — user-visible behavior
test("shows discount after valid coupon", () => {
  render(<Cart total={100} coupon="SAVE10" />);
  expect(screen.getByText("$90.00")).toBeInTheDocument();
});

// DON'T test — implementation details
// expect(useState).toHaveBeenCalledTimes(2);`,
  },
  {
    id: 87,
    category: 'UI Testing Strategies',
    question: 'What is Mock Service Worker (MSW) and why use it for API mocking?',
    answer: 'Mock Service Worker intercepts HTTP requests at the network level using Service Workers in the browser and request listeners in Node, so your application code runs unmodified against fake responses. Unlike mocking fetch directly, MSW tests the same code path production uses. One set of handlers works in Jest, Storybook, and development. In a real app, MSW handlers return predictable product data so product grid tests and Storybook stories work offline without a backend.',
    code: `// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json([
      { id: 1, name: "Widget", price: 29.99 },
    ]);
  }),
];

// src/setupTests.ts
import { setupServer } from "msw/node";
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`,
  },
  {
    id: 88,
    category: 'UI Testing Strategies',
    question: 'What is the testing trophy vs testing pyramid debate?',
    answer: 'The testing pyramid emphasizes many unit tests and few E2E tests for speed and maintainability. The testing trophy, coined by Kent C. Dodds, adds a larger slice of integration tests because they deliver more confidence per test for UI-heavy apps with less brittleness than E2E. Neither model is absolute — the right balance depends on your app architecture and risk profile. In a real app with heavy API coupling, integration tests covering "user submits form → API called → success UI shown" may outnumber isolated unit tests.',
    code: `// Trophy emphasis — integration tests give high confidence
test("submitting form shows confirmation", async () => {
  render(<ContactForm />);           // real component
  // MSW intercepts real fetch call  // real network layer
  await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  await userEvent.click(screen.getByRole("button", { name: /send/i }));
  expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
});`,
  },
  {
    id: 89,
    category: 'UI Testing Strategies',
    question: 'How do you decide what to automate vs test manually?',
    answer: 'Automate repetitive regression checks, critical business paths, and anything that must run on every deploy. Reserve manual testing for exploratory sessions, usability evaluation, one-off edge cases, and features still in flux where automation cost exceeds benefit. The goal is a sustainable mix, not 100% automation. In a real app, automate login and checkout E2E flows but manually explore a redesigned onboarding wizard for confusing copy or layout before writing stable selectors.',
    code: `// Automate — stable, high-value, repeated every deploy
// - login / logout
// - payment processing
// - role-based access checks

// Manual — exploratory, subjective, or rapidly changing
// - "Does this onboarding flow feel intuitive?"
// - first look at a new experimental feature`,
  },
  {
    id: 90,
    category: 'UI Testing Strategies',
    question: 'What is contract testing and when is it useful?',
    answer: 'Contract testing verifies that a consumer (frontend) and provider (API) agree on the shape and behavior of API responses without running both services together. Tools like Pact record consumer expectations and verify the provider satisfies them. It catches breaking API changes before integration or E2E tests fail. In a real app, the frontend Pact test asserts GET /users/:id returns { id, name, email }, and the backend provider verification job fails if a field is renamed.',
    code: `// Consumer test (Pact — conceptual)
provider
  .given("user 1 exists")
  .uponReceiving("a request for user 1")
  .withRequest("GET", "/users/1")
  .willRespondWith(200, {
    body: { id: 1, name: "Alice", email: "alice@example.com" },
  });

// Provider verifies actual API matches recorded contracts`,
  },
  {
    id: 91,
    category: 'UI Testing Strategies',
    question: 'How do you test error states and edge cases in the UI?',
    answer: 'Use MSW or jest mocks to simulate API errors, empty responses, slow networks, and validation failures, then assert the UI shows appropriate messages and recovery options. Test loading spinners, empty states, 404 pages, and permission denied screens explicitly — these paths are often untested. In a real app, mock a 500 response on GET /api/orders and verify the orders page shows "Unable to load orders" with a retry button instead of a blank screen.',
    code: `test("shows error when API fails", async () => {
  server.use(
    http.get("/api/orders", () => new HttpResponse(null, { status: 500 }))
  );

  render(<OrdersPage />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    /unable to load orders/i
  );
  expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
});`,
  },
  {
    id: 92,
    category: 'UI Testing Strategies',
    question: 'What is the role of data-testid attributes in testing strategy?',
    answer: 'data-testid provides stable hooks for tests when semantic queries like role or label are insufficient — dynamic lists, canvas elements, or third-party widgets without accessible names. React Testing Library and Playwright both support getByTestId, but it should be a fallback, not the default, because it does not encourage accessible markup. In a real app, add data-testid="product-row-{id}" on table rows while still ensuring each row has readable text for screen readers.',
    code: `// Fallback when role/label isn't practical
<tr data-testid={\`product-row-\${product.id}\`}>
  <td>{product.name}</td>
</tr>

// In tests — last resort after role/label
screen.getByTestId("product-row-42");
page.getByTestId("product-row-42");`,
  },
  {
    id: 93,
    category: 'UI Testing Strategies',
    question: 'How do you test responsive and mobile-specific UI behavior?',
    answer: 'Set viewport dimensions in Playwright or Cypress, use matchMedia mocks in Jest for hook-based responsive logic, and test touch interactions with user-event or real event libraries. Verify that mobile-only elements appear and desktop elements hide at breakpoints. In a real app, set viewport to 375px width and assert the navigation collapses into a hamburger menu while desktop nav links are not visible.',
    code: `// Playwright — mobile viewport
test.use({ viewport: { width: 375, height: 812 } });

test("shows mobile menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("desktop-nav")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
});`,
  },
  {
    id: 94,
    category: 'UI Testing Strategies',
    question: 'What is a test quarantine strategy for flaky tests?',
    answer: 'Quarantining temporarily isolates flaky tests from the main CI pipeline so they do not block deployments while the root cause is investigated. Mark quarantined tests with a tag like @quarantine, run them in a separate non-blocking job, and track ownership and fix deadlines. Never let quarantine become permanent — review weekly. In a real app, a persistently flaky payment E2E test moves to a nightly quarantine job until the race condition in the Stripe redirect is fixed.',
    code: `// Playwright tag
test("checkout with Stripe @quarantine", async ({ page }) => {
  // runs in separate non-blocking CI job
});

// Jest — separate config or describe.skip with ticket reference
describe.skip("QUAR-123: flaky payment redirect", () => {
  it("completes Stripe checkout", () => { /* ... */ });
});`,
  },
  {
    id: 95,
    category: 'UI Testing Strategies',
    question: 'How do you measure and improve test suite health?',
    answer: 'Track metrics like pass rate, flaky test percentage, average CI duration, code coverage trends, and mean time to fix broken tests. Review tests that never fail — they may be too shallow — and tests that fail often without product bugs — they may be brittle. Regularly delete obsolete tests and refactor slow E2E specs into faster integration tests. In a real app, a dashboard showing 2% flake rate and 12-minute E2E runtime helps the team prioritize stabilizing the top 5 slowest specs.',
    code: `// Metrics to monitor:
// - CI pass rate (target: > 98%)
// - Flaky test count (target: 0 quarantined)
// - Unit test duration (target: < 2 min)
// - E2E duration (target: < 15 min with parallelization)
// - Coverage trend (floor, not ceiling)

// Tooling: Cypress Cloud, Playwright HTML report,
// GitHub Actions insights, Codecov`,
  },
]
