import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Testing Fundamentals',
    question: 'What is the testing pyramid and why does it matter?',
    answer: 'The testing pyramid is a model that recommends many fast unit tests at the base, fewer integration tests in the middle, and the fewest end-to-end tests at the top. Unit tests run quickly and pinpoint failures precisely, while E2E tests are slower and harder to maintain but validate real user flows. A balanced pyramid keeps CI fast and feedback loops short without sacrificing confidence in critical paths. In a real app, you might have hundreds of unit tests for utility functions, dozens of integration tests for API routes, and a handful of E2E tests for checkout and login.',
    code: `// Pyramid shape (conceptual):
//        / E2E \\        ← few, slow, high confidence
//       / Integr. \\     ← moderate count
//      /   Unit     \\    ← many, fast, isolated

// Aim: most tests at the bottom, critical flows at the top`,
  },
  {
    id: 2,
    category: 'Testing Fundamentals',
    question: 'What is the difference between unit, integration, and E2E tests?',
    answer: 'Unit tests verify a single function, class, or component in isolation, often with dependencies mocked or stubbed. Integration tests verify that multiple units work together correctly, such as a service calling a database or a React component interacting with a context provider. End-to-end (E2E) tests drive the full application through a browser or API client, simulating real user behavior from start to finish. In a real app, a unit test might assert that formatPrice returns "$19.99", an integration test confirms the cart API persists items, and an E2E test completes a purchase flow in the browser.',
    code: `// Unit — test one function in isolation
function add(a: number, b: number) { return a + b; }
expect(add(2, 3)).toBe(5);

// Integration — test components working together
// render(<CartProvider><CartSummary /></CartProvider>);

// E2E — test full user flow in browser
// cy.visit("/products"); cy.get("[data-testid=add]").click();`,
  },
  {
    id: 3,
    category: 'Testing Fundamentals',
    question: 'What is Test-Driven Development (TDD)?',
    answer: 'Test-Driven Development is a workflow where you write a failing test first, then write the minimum code to make it pass, and finally refactor while keeping tests green. The cycle is often summarized as Red-Green-Refactor. TDD forces you to define expected behavior before implementation and produces a safety net that makes refactoring less risky. In a real app, before building a discount calculator you would write tests for percentage off, fixed amount off, and edge cases like zero or negative prices, then implement until all pass.',
    code: `// 1. RED — write failing test first
test("applies 10% discount", () => {
  expect(applyDiscount(100, 0.1)).toBe(90);
});

// 2. GREEN — minimal implementation
function applyDiscount(price: number, rate: number) {
  return price * (1 - rate);
}

// 3. REFACTOR — improve without changing behavior`,
  },
  {
    id: 4,
    category: 'Testing Fundamentals',
    question: 'What is test coverage and how should teams use it?',
    answer: 'Test coverage measures what percentage of your source code is executed when the test suite runs, commonly reported as line, branch, or function coverage. High coverage indicates more code paths were exercised, but it does not guarantee tests are meaningful or that edge cases are handled. Teams typically set a minimum threshold in CI (e.g., 80%) as a floor, not a goal to chase blindly. In a real app, 100% line coverage on a payment module still misses bugs if assertions never verify the correct amount was charged.',
    code: `// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80 },
  },
};

// Coverage tells you what ran, not whether tests are good`,
  },
  {
    id: 5,
    category: 'Testing Fundamentals',
    question: 'What is mocking and when should you use it?',
    answer: 'Mocking replaces real dependencies with controlled stand-ins so tests stay fast, deterministic, and isolated. You mock external systems like APIs, databases, timers, or random number generators that would make tests flaky or slow. Over-mocking can hide integration bugs, so mock at boundaries rather than every internal call. In a real app, you mock fetch when testing a data-fetching hook so the test does not depend on a live server, but you still run integration tests against a staging API separately.',
    code: `// Mock an external API dependency
jest.mock("./api", () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "Alice" }),
}));

import { fetchUser } from "./api";

test("loads user profile", async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe("Alice");
});`,
  },
  {
    id: 6,
    category: 'Testing Fundamentals',
    question: 'What is the AAA pattern in unit testing?',
    answer: 'AAA stands for Arrange, Act, and Assert — a structure that keeps tests readable and consistent. In the Arrange phase you set up inputs, mocks, and initial state. In the Act phase you invoke the function or trigger the behavior under test. In the Assert phase you verify the outcome matches expectations. In a real app, testing a login form might arrange default props, act by simulating a button click, and assert that the onSubmit callback received the correct credentials.',
    code: `test("increments counter on click", () => {
  // Arrange
  let count = 0;
  const increment = () => { count += 1; };

  // Act
  increment();

  // Assert
  expect(count).toBe(1);
});`,
  },
  {
    id: 7,
    category: 'Testing Fundamentals',
    question: 'What is the difference between a mock, a stub, and a spy?',
    answer: 'A stub provides canned responses to calls and does not verify how it was used — it replaces behavior. A spy wraps a real function (or creates a fake one) and records calls, arguments, and return values so you can assert on interactions. A mock is a full fake object that both stubs behavior and sets expectations about how it should be called. In a real app, you might stub a date utility to return a fixed timestamp, spy on console.error to verify error logging, and mock an email service to assert it was called once with the right recipient.',
    code: `const logger = { error: jest.fn() };           // spy/mock
const getDate = jest.fn().mockReturnValue("2024-01-01"); // stub

logger.error("failed");
expect(logger.error).toHaveBeenCalledWith("failed");
expect(getDate()).toBe("2024-01-01");`,
  },
  {
    id: 8,
    category: 'Testing Fundamentals',
    question: 'What makes a good unit test?',
    answer: 'A good unit test is fast, isolated, deterministic, and clearly named so failures are easy to diagnose. It tests one behavior per test case, avoids depending on external services or shared mutable state, and uses meaningful assertions rather than checking implementation details. Tests should survive refactors as long as behavior stays the same. In a real app, prefer testing that searchResults returns matching products over asserting that an internal cache Map was updated.',
    code: `// Good — tests behavior, clear name
test("returns empty array when query matches nothing", () => {
  expect(searchProducts([], "widget")).toEqual([]);
});

// Avoid — tests implementation detail
test("calls filter internally", () => {
  const spy = jest.spyOn(Array.prototype, "filter");
  searchProducts(products, "widget");
  expect(spy).toHaveBeenCalled();
});`,
  },
  {
    id: 9,
    category: 'Testing Fundamentals',
    question: 'What is regression testing?',
    answer: 'Regression testing re-runs existing tests after code changes to ensure previously working behavior has not broken. Automated test suites in CI are the primary regression safety net on every pull request and merge. Without it, fixes and new features can silently reintroduce old bugs. In a real app, after refactoring the authentication module, the full suite of login, logout, and token refresh tests confirms nothing regressed before deployment.',
    code: `// CI runs the full suite on every PR
// npm test -- --coverage

// If a refactor breaks login, an existing test fails:
test("valid credentials redirect to dashboard", async () => {
  const result = await login("user@example.com", "secret");
  expect(result.redirectTo).toBe("/dashboard");
});`,
  },
  {
    id: 10,
    category: 'Testing Fundamentals',
    question: 'What is smoke testing vs sanity testing?',
    answer: 'Smoke testing is a quick, broad check that critical functionality works after a build or deployment — enough to decide whether deeper testing is worthwhile. Sanity testing is a focused check on a specific area after a small change, verifying that related features still behave correctly. Both are shallow by design and meant to catch obvious failures fast. In a real app, a smoke test after deploy might verify the homepage loads and the health endpoint returns 200, while a sanity test after a payment fix re-runs only checkout-related cases.',
    code: `// Smoke test — critical paths only
describe("smoke", () => {
  test("app boots", () => { /* render root */ });
  test("health endpoint", () => { /* GET /health */ });
});

// Sanity — targeted after a hotfix
describe("payment hotfix sanity", () => {
  test("charge succeeds with valid card", () => { /* ... */ });
});`,
  },
  {
    id: 11,
    category: 'Testing Fundamentals',
    question: 'What is the difference between manual and automated testing?',
    answer: 'Manual testing requires a human to execute steps and observe results, which is flexible for exploratory and usability testing but slow and inconsistent at scale. Automated testing runs scripts that verify behavior programmatically, making regression checks repeatable and suitable for CI pipelines. Most teams combine both: automate repetitive checks and reserve manual effort for new features, edge cases, and UX review. In a real app, automated tests cover API contracts nightly while QA manually explores a new checkout redesign before release.',
    code: `// Automated — runs in CI on every commit
test("API returns 401 for missing token", async () => {
  const res = await request(app).get("/api/profile");
  expect(res.status).toBe(401);
});

// Manual — exploratory checklist (not in code)
// - Can user complete checkout on mobile Safari?
// - Is error message readable for invalid email?`,
  },
  {
    id: 12,
    category: 'Testing Fundamentals',
    question: 'What is a test fixture?',
    answer: 'A test fixture is the fixed baseline state used across one or more tests — sample data, database records, configuration, or DOM setup that tests depend on. Fixtures keep tests consistent and reduce duplication by centralizing common setup. They can be defined inline, in beforeEach hooks, or loaded from external files. In a real app, a users.json fixture might supply predictable user records for login tests without hitting a real database.',
    code: `// Inline fixture data
const validUser = { email: "alice@example.com", password: "secret123" };

beforeEach(() => {
  // Reset fixture state before each test
  db.users = [{ id: 1, email: "alice@example.com" }];
});

test("finds user by email", () => {
  expect(findUser("alice@example.com")).toEqual(db.users[0]);
});`,
  },
  {
    id: 13,
    category: 'Testing Fundamentals',
    question: 'What is test isolation and why is it important?',
    answer: 'Test isolation means each test runs independently without relying on side effects or execution order from other tests. Shared mutable state, global variables, or leftover data from a previous test cause order-dependent failures that are hard to debug. Isolated tests can run in parallel and produce the same result every time. In a real app, if one test adds items to a global cart and another assumes an empty cart, failures appear only when tests run in a certain order — proper teardown prevents this.',
    code: `let cart: string[] = [];

afterEach(() => {
  cart = []; // reset shared state
});

test("adds item to cart", () => {
  addToCart("book");
  expect(cart).toContain("book");
});

test("starts with empty cart", () => {
  expect(cart).toHaveLength(0);
});`,
  },
  {
    id: 14,
    category: 'Testing Fundamentals',
    question: 'What is the difference between black-box and white-box testing?',
    answer: 'Black-box testing evaluates software based on inputs and outputs without knowledge of internal implementation — common in E2E and acceptance testing. White-box testing examines internal structure, branches, and logic paths, which unit tests often do when covering edge cases in algorithms. Both perspectives complement each other: black-box catches missing requirements, white-box catches untested branches. In a real app, an E2E test submits a form and checks the confirmation page (black-box), while a unit test verifies every branch in the discount calculation function (white-box).',
    code: `// White-box — knows internal branches
function classifyAge(age: number) {
  if (age < 0) return "invalid";
  if (age < 18) return "minor";
  return "adult";
}
test("handles negative age", () => expect(classifyAge(-1)).toBe("invalid"));

// Black-box — only cares about observable outcome
// POST /signup with valid body → 201 + confirmation email sent`,
  },
  {
    id: 15,
    category: 'Testing Fundamentals',
    question: 'What is shift-left testing?',
    answer: 'Shift-left testing means moving quality checks earlier in the development lifecycle — during coding and code review rather than only after deployment. Developers write unit tests alongside features, run linters and type checks locally, and CI validates every pull request before merge. Catching defects early is cheaper and faster than fixing them in production. In a real app, a developer runs Jest and TypeScript checks before pushing, so broken builds rarely reach the shared main branch.',
    code: `// Local pre-push workflow
// npm run lint && npm run typecheck && npm test

// CI on every PR (shift-left gate)
// - unit tests
// - integration tests
// - lint + typecheck
// merge blocked if any step fails`,
  },
]
