import type { InterviewQuestion } from '../../types'

export const cypressQuestions: InterviewQuestion[] = [
  {
    id: 41,
    category: 'Cypress',
    question: 'What is Cypress and what types of testing does it support?',
    answer: 'Cypress is a JavaScript end-to-end testing framework that runs tests inside the browser alongside your application, giving direct access to the DOM and network layer. It supports E2E testing of full user flows, component testing of isolated React/Vue components, and API testing via cy.request(). Cypress is known for its interactive test runner, time-travel debugging, and automatic waiting. In a real app, Cypress can verify login, add-to-cart, and checkout flows while also testing individual modal components in isolation.',
    code: `// cypress/e2e/checkout.cy.ts
describe("Checkout flow", () => {
  it("completes a purchase", () => {
    cy.visit("/products");
    cy.get("[data-testid=add-to-cart]").first().click();
    cy.get("[data-testid=cart-count]").should("contain", "1");
    cy.visit("/checkout");
    cy.get("#email").type("user@example.com");
    cy.get("[type=submit]").click();
    cy.contains("Order confirmed").should("be.visible");
  });
});`,
  },
  {
    id: 42,
    category: 'Cypress',
    question: 'What are the core Cypress commands cy.visit, cy.get, and cy.contains?',
    answer: 'cy.visit navigates to a URL and waits for the page load event. cy.get queries the DOM using CSS selectors, data attributes, or aliases and retries until the element exists or times out. cy.contains finds elements by their text content, partial text, or regex. All Cypress commands are chainable and automatically retry, reducing flaky timing issues. In a real app, cy.visit("/login") followed by cy.contains("Sign in").click() drives a standard authentication flow.',
    code: `cy.visit("https://example.com/login");
cy.get('[data-testid="email"]').type("user@example.com");
cy.get('[data-testid="password"]').type("secret123");
cy.contains("button", "Sign in").click();
cy.contains("Welcome back").should("be.visible");`,
  },
  {
    id: 43,
    category: 'Cypress',
    question: 'How does Cypress automatic waiting differ from Selenium?',
    answer: 'Cypress automatically retries commands and assertions until they pass or a timeout expires, eliminating most manual sleep calls. Selenium traditionally requires explicit waits (WebDriverWait) because it operates outside the browser and cannot observe the app\'s internal event loop directly. Cypress runs in the same event loop as your app, making synchronization more reliable for SPAs. In a real app, cy.get(".toast") waits for a notification to appear after an async save without adding arbitrary cy.wait(3000) delays.',
    code: `// Cypress — auto-retries until assertion passes
cy.get(".loading").should("not.exist");
cy.get(".toast").should("contain", "Saved");

// Selenium — often needs explicit wait
// WebDriverWait(driver, 10).until(
//   ExpectedConditions.invisibilityOf(loading)
// );`,
  },
  {
    id: 44,
    category: 'Cypress',
    question: 'What are Cypress fixtures and how do you use them?',
    answer: 'Fixtures are static JSON, text, or binary files stored in cypress/fixtures/ that provide reusable test data. cy.fixture("users.json") loads the file and can be aliased with .as() for use in intercepts or direct assertions. Fixtures keep test data out of test files and version-controlled alongside tests. In a real app, a users.json fixture supplies login credentials and expected profile data for multiple E2E specs.',
    code: `// cypress/fixtures/users.json
// { "admin": { "email": "admin@example.com", "password": "admin123" } }

cy.fixture("users").then((users) => {
  cy.get("#email").type(users.admin.email);
  cy.get("#password").type(users.admin.password);
});

// Or alias for reuse
cy.fixture("users").as("users");`,
  },
  {
    id: 45,
    category: 'Cypress',
    question: 'How does cy.intercept work for network stubbing?',
    answer: 'cy.intercept registers a listener on HTTP requests matching a method, URL pattern, or route alias, letting you stub responses or spy on real traffic. You can return fixture data, custom status codes, or delays to simulate slow networks and error states. Combined with cy.wait("@alias"), intercepts make API-dependent tests deterministic. In a real app, intercept GET /api/products to return a fixture list so product grid tests never depend on a live backend.',
    code: `cy.intercept("GET", "/api/products", {
  fixture: "products.json",
}).as("getProducts");

cy.visit("/shop");
cy.wait("@getProducts");
cy.get("[data-testid=product-card]").should("have.length", 3);`,
  },
  {
    id: 46,
    category: 'Cypress',
    question: 'What are custom commands in Cypress and how do you create them?',
    answer: 'Custom commands extend Cypress with reusable actions like cy.login() or cy.dataCy() defined in cypress/support/commands.ts. They wrap common sequences to reduce duplication across specs and enforce consistent patterns. Register with Cypress.Commands.add and declare TypeScript types for autocomplete. In a real app, a cy.login(email, password) command handles visiting the login page, filling fields, and asserting redirect in one line.',
    code: `// cypress/support/commands.ts
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[type="submit"]').click();
});

// In a spec:
cy.login("user@example.com", "secret123");
cy.url().should("include", "/dashboard");`,
  },
  {
    id: 47,
    category: 'Cypress',
    question: 'What is Cypress component testing?',
    answer: 'Cypress component testing mounts individual UI components in a real browser using cy.mount(), combining the speed of unit tests with browser-accurate rendering. It supports React, Vue, Angular, and other frameworks with framework-specific adapters. Unlike jsdom-based tests, components run with real layout, CSS, and browser APIs. In a real app, mount a DatePicker component and verify selecting a date fires the onChange callback with the correct ISO string.',
    code: `// DatePicker.cy.tsx
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("calls onChange when date selected", () => {
    const onChange = cy.stub().as("onChange");
    cy.mount(<DatePicker onChange={onChange} />);
    cy.get('[data-testid="day-15"]').click();
    cy.get("@onChange").should("have.been.calledOnce");
  });
});`,
  },
  {
    id: 48,
    category: 'Cypress',
    question: 'What are Cypress best practices for stable selectors?',
    answer: 'Prefer data-testid, data-cy, or role-based attributes over CSS classes and DOM hierarchy, which change frequently during styling refactors. Avoid selecting by implementation details like nth-child unless necessary. Stable selectors decouple tests from visual redesigns and reduce maintenance. In a real app, use [data-testid="submit-order"] instead of .btn.btn-primary.mt-4 so a Tailwind refactor does not break E2E tests.',
    code: `// Stable — survives CSS refactors
cy.get('[data-testid="submit-order"]').click();
cy.findByRole("button", { name: /submit order/i }).click();

// Fragile — breaks when styles change
cy.get(".btn-primary").click();
cy.get("form > div:nth-child(3) > button").click();`,
  },
  {
    id: 49,
    category: 'Cypress',
    question: 'How do you handle authentication in Cypress E2E tests?',
    answer: 'Avoid logging in through the UI in every test — use cy.session() to cache authenticated state, programmatic login via cy.request(), or inject tokens into localStorage before cy.visit(). cy.session() replays cookies and storage across specs while validating the session is still valid. In a real app, log in once per spec file with cy.session("user", () => { cy.request("POST", "/api/login", credentials) }) and reuse it for dashboard tests.',
    code: `cy.session("logged-in-user", () => {
  cy.request("POST", "/api/auth/login", {
    email: "user@example.com",
    password: "secret123",
  }).then(({ body }) => {
    window.localStorage.setItem("token", body.token);
  });
});

cy.visit("/dashboard");
cy.contains("Welcome").should("be.visible");`,
  },
  {
    id: 50,
    category: 'Cypress',
    question: 'What is the Cypress command log and why is it useful?',
    answer: 'The command log appears in the Cypress test runner and shows every command, assertion, and network request in chronological order with before/after DOM snapshots. Clicking a command reveals the application state at that moment, enabling time-travel debugging. This makes failures much easier to diagnose than plain stack traces. In a real app, when cy.contains("Total: $49") fails, the snapshot shows whether the cart was empty or the price formatted differently.',
    code: `// Each command appears in the runner log:
cy.visit("/cart");           // snapshot: cart page loaded
cy.get(".item-count")       // snapshot: 2 items visible
  .should("contain", "2");  // assertion logged with retry info`,
  },
  {
    id: 51,
    category: 'Cypress',
    question: 'How do you test file uploads in Cypress?',
    answer: 'Use cy.selectFile() (or the legacy cy.fixture + attachFile plugin) to attach files to input[type="file"] elements without a real file picker dialog. You can upload from fixtures or specify MIME types and drag-and-drop behavior. Cypress handles the file input programmatically since native dialogs cannot be automated. In a real app, selectFile("cypress/fixtures/avatar.png") on a profile upload input and assert a preview image appears.',
    code: `cy.get('input[type="file"]').selectFile("cypress/fixtures/avatar.png", {
  force: true,
});

cy.get('[data-testid="avatar-preview"]')
  .should("be.visible")
  .and("have.attr", "src")
  .and("include", "avatar");`,
  },
  {
    id: 52,
    category: 'Cypress',
    question: 'What is cy.request() and when should you use it?',
    answer: 'cy.request() sends HTTP requests directly from Node, bypassing the browser UI — useful for seeding data, logging in, or testing APIs independently of the frontend. It inherits cookies from the browser session when configured and supports all HTTP methods. Use it for test setup rather than replacing UI tests for user-facing flows. In a real app, cy.request("POST", "/api/orders", orderPayload) seeds an order before testing the order detail page.',
    code: `cy.request("POST", "/api/test/seed", {
  products: [{ id: 1, name: "Widget", stock: 10 }],
});

cy.request({
  method: "GET",
  url: "/api/products/1",
  auth: { bearer: Cypress.env("API_TOKEN") },
}).its("body.name").should("eq", "Widget");`,
  },
  {
    id: 53,
    category: 'Cypress',
    question: 'How do environment variables work in Cypress?',
    answer: 'Cypress.env() reads values from cypress.config.ts env block, cypress.env.json, or CLI flags like --env apiUrl=https://staging.example.com. Never commit secrets — use CI environment variables injected at runtime. Different env files support dev, staging, and production target URLs. In a real app, Cypress.env("API_URL") points tests at a staging API while local development uses localhost.',
    code: `// cypress.config.ts
export default defineConfig({
  env: {
    API_URL: "http://localhost:3001",
  },
});

// In tests:
cy.request(\`\${Cypress.env("API_URL")}/health\`).its("status").should("eq", 200);

// CLI override:
// npx cypress run --env API_URL=https://staging.example.com`,
  },
  {
    id: 54,
    category: 'Cypress',
    question: 'What are Cypress aliases and how do cy.as() and cy.get("@alias") work?',
    answer: 'Aliases label DOM elements, fixtures, intercepts, or stubs for later reference with cy.get("@alias") or cy.wait("@alias"). They make tests readable and let Cypress retry against the same subject. Intercept aliases are especially common for waiting on specific API calls before asserting UI updates. In a real app, alias a product list intercept as @products and cy.wait("@products") before checking the grid rendered.',
    code: `cy.intercept("GET", "/api/users").as("getUsers");
cy.get('[data-testid="user-row"]').first().as("firstUser");

cy.visit("/users");
cy.wait("@getUsers");

cy.get("@firstUser").within(() => {
  cy.contains("Alice").should("exist");
});`,
  },
  {
    id: 55,
    category: 'Cypress',
    question: 'How does Cypress compare to Selenium WebDriver?',
    answer: 'Cypress runs inside the browser with direct DOM access, automatic retries, and built-in network stubbing, while Selenium drives browsers externally via the WebDriver protocol and requires more explicit synchronization. Selenium supports more browsers and languages out of the box; Cypress focuses on developer experience for JavaScript teams. Cypress cannot easily test multiple tabs or multiple origins in one test, which Selenium handles natively. In a real app, teams often choose Cypress for fast SPA E2E feedback and Selenium for cross-browser enterprise suites with Java or Python test code.',
    code: `// Cypress — in-browser, auto-wait, built-in intercept
cy.intercept("GET", "/api/data").as("data");
cy.visit("/");
cy.wait("@data");

// Selenium — external driver, explicit waits common
// driver.get("https://example.com");
// wait.until(ExpectedConditions.elementToBeClickable(btn));`,
  },
  {
    id: 56,
    category: 'Cypress',
    question: 'What is the difference between cy.should() and cy.and()?',
    answer: 'Both chain assertions in Cypress, but cy.should() starts an assertion chain while cy.and() continues it with an additional condition on the same subject. Under the hood they are aliases — .and() reads naturally when combining multiple checks. Assertions auto-retry until they pass or time out. In a real app, cy.get(".alert").should("be.visible").and("contain", "Saved successfully") verifies both visibility and text.',
    code: `cy.get('[data-testid="product-card"]')
  .should("be.visible")
  .and("contain", "Widget")
  .and("have.attr", "data-price", "29.99");

cy.get("input#email")
  .should("have.value", "user@example.com")
  .and("have.attr", "type", "email");`,
  },
  {
    id: 57,
    category: 'Cypress',
    question: 'How do you run Cypress tests in CI/CD pipelines?',
    answer: 'Use cypress run for headless execution in CI, often with cypress-io/github-action or a Docker image that includes browser dependencies. Record results to Cypress Cloud for parallelization and flake detection, or output JUnit/XML reports for your CI dashboard. Set baseUrl, video recording, and screenshot-on-failure options in cypress.config.ts. In a real app, a GitHub Actions workflow runs npx cypress run on every PR against a preview deployment URL.',
    code: `// cypress.config.ts
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    screenshotOnRunFailure: true,
  },
});

// CI: npx cypress run --browser chrome --headless
// Or: npx cypress run --record --key \${CYPRESS_RECORD_KEY}`,
  },
  {
    id: 58,
    category: 'Cypress',
    question: 'What is cy.within() and when should you use it?',
    answer: 'cy.within() scopes subsequent commands to a specific DOM element, preventing accidental interactions with similar elements elsewhere on the page. It is essential when multiple components share the same selectors or when testing list items individually. The scope resets after the callback completes. In a real app, within each [data-testid="cart-item"] block, assert the item name and quantity without matching elements from a recommended products sidebar.',
    code: `cy.get('[data-testid="cart-item"]').each(($item) => {
  cy.wrap($item).within(() => {
    cy.get(".item-name").should("not.be.empty");
    cy.get(".item-qty").should("match", /^\\d+$/);
  });
});`,
  },
  {
    id: 59,
    category: 'Cypress',
    question: 'How do you avoid flaky Cypress tests?',
    answer: 'Rely on Cypress built-in retries and assertions instead of arbitrary cy.wait(ms) delays. Stub network calls with cy.intercept for deterministic data, reset state between tests with cy.session or API cleanup, and use stable selectors. Avoid testing timing-dependent animations without waiting for specific conditions. In a real app, replace cy.wait(5000) after form submit with cy.intercept + cy.wait("@saveOrder") and cy.contains("Order saved").',
    code: `// Flaky — arbitrary wait
cy.get("#submit").click();
cy.wait(3000);
cy.contains("Success");

// Stable — wait for known condition
cy.intercept("POST", "/api/orders").as("saveOrder");
cy.get("#submit").click();
cy.wait("@saveOrder");
cy.contains("Success").should("be.visible");`,
  },
  {
    id: 60,
    category: 'Cypress',
    question: 'What is the Cypress support file and what belongs there?',
    answer: 'cypress/support/e2e.ts (or index.js) loads before every spec and is the place for global configuration, custom commands, and third-party plugin imports. It is not meant for test cases themselves. Import commands.ts here and add global beforeEach hooks for common setup like preserving cookies. In a real app, the support file imports cypress-real-events, registers cy.login(), and sets default intercepts for analytics endpoints you want to block.',
    code: `// cypress/support/e2e.ts
import "./commands";

beforeEach(() => {
  cy.intercept("POST", "**/analytics/**", { statusCode: 204 });
});

// cypress/support/commands.ts — custom commands imported above`,
  },
]
