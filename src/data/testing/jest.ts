import type { InterviewQuestion } from '../../types'

export const jestQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Jest',
    question: 'What is Jest and why is it popular for JavaScript testing?',
    answer: 'Jest is a JavaScript testing framework maintained by Meta that provides a test runner, assertion library, mocking utilities, and code coverage out of the box. It works with minimal configuration in React and Node projects and supports parallel test execution for speed. Jest\'s zero-config defaults and snapshot testing make it a common choice for frontend teams.',
    code: `// package.json
// "scripts": { "test": "jest" }

// Basic test
test("adds numbers", () => {
  expect(1 + 1).toBe(2);
});`,
  },
  {
    id: 17,
    category: 'Jest',
    question: 'How do describe and it (or test) blocks organize Jest tests?',
    answer: 'describe groups related tests into a suite, often mirroring a module or component name, while it (alias test) defines individual test cases within that suite. Nested describe blocks create hierarchical structure for complex features. This organization improves readability and lets you run subsets of tests with pattern matching.',
    code: `describe("Cart", () => {
  describe("addItem", () => {
    it("adds a product to the cart", () => {
      const cart = createCart();
      cart.addItem({ id: 1, price: 10 });
      expect(cart.items).toHaveLength(1);
    });

    it("rejects invalid products", () => {
      const cart = createCart();
      expect(() => cart.addItem(null)).toThrow("Invalid product");
    });
  });
});`,
  },
  {
    id: 18,
    category: 'Jest',
    question: 'What are common Jest expect matchers?',
    answer: 'Jest matchers are assertion methods on expect() that compare actual values to expected outcomes. Common matchers include toBe for primitive equality, toEqual for deep object comparison, toContain for arrays, toThrow for errors, and toMatch for strings or regex. Negation uses .not, and specialized matchers like toHaveBeenCalled verify mock interactions.',
    code: `expect(2 + 2).toBe(4);
expect({ a: 1 }).toEqual({ a: 1 });
expect(["a", "b"]).toContain("a");
expect(() => parseJSON("bad")).toThrow();
expect("hello world").toMatch(/world/);
expect(undefined).toBeDefined();`,
  },
  {
    id: 19,
    category: 'Jest',
    question: 'What is the difference between toBe and toEqual in Jest?',
    answer: 'toBe uses Object.is equality, which checks referential identity for objects and strict equality for primitives — use it for numbers, strings, booleans, and null. toEqual performs deep recursive comparison, checking that nested object and array structures match in value. Using toBe on two object literals with the same content fails because they are different references.',
    code: `expect(5).toBe(5);                    // primitives — use toBe
expect({ x: 1 }).not.toBe({ x: 1 });   // different references
expect({ x: 1 }).toEqual({ x: 1 });    // deep equality

const arr = [1, 2, 3];
expect(arr).toContain(2);              // partial match`,
  },
  {
    id: 20,
    category: 'Jest',
    question: 'How do you create and use mocks in Jest?',
    answer: 'Jest mocks replace functions or modules with controllable fakes using jest.fn(), jest.mock(), or jest.spyOn(). jest.fn() creates a mock function that records calls and can return custom values via mockReturnValue or mockResolvedValue. Module mocks hoist to the top of the file and replace entire imports.',
    code: `const sendEmail = jest.fn().mockResolvedValue({ sent: true });

await notifyUser("alice@example.com");
expect(sendEmail).toHaveBeenCalledWith("alice@example.com");
expect(sendEmail).toHaveBeenCalledTimes(1);`,
  },
  {
    id: 21,
    category: 'Jest',
    question: 'What is jest.spyOn and when should you use it?',
    answer: 'jest.spyOn wraps an existing method on an object, allowing you to track calls while optionally overriding its implementation. Unlike full module mocks, spies let you observe real code paths and restore the original afterward with mockRestore(). Use spies when you want to verify side effects without replacing the entire module.',
    code: `const storage = { setItem: jest.fn() };
jest.spyOn(Storage.prototype, "setItem").mockImplementation(storage.setItem);

saveToken("abc123");
expect(storage.setItem).toHaveBeenCalledWith("token", "abc123");

jest.restoreAllMocks();`,
  },
  {
    id: 22,
    category: 'Jest',
    question: 'How do you mock an entire module with jest.mock()?',
    answer: 'jest.mock("./modulePath") replaces all exports from that module with automatic mocks, and you can provide a factory function for custom implementations. Because jest.mock is hoisted, it runs before imports, so the mocked version is what your code under test receives. This is ideal for isolating units from heavy or external dependencies.',
    code: `jest.mock("./api", () => ({
  fetchProducts: jest.fn(() =>
    Promise.resolve([{ id: 1, name: "Widget" }])
  ),
}));

import { fetchProducts } from "./api";

test("loads products", async () => {
  const products = await fetchProducts();
  expect(products).toHaveLength(1);
});`,
  },
  {
    id: 23,
    category: 'Jest',
    question: 'What is snapshot testing in Jest?',
    answer: 'Snapshot testing serializes a value — often rendered component output — to a stored file and fails on future runs if the output changes unexpectedly. expect(value).toMatchSnapshot() compares against the saved snapshot, and you review diffs to accept intentional UI changes with jest -u. Snapshots catch unintended regressions quickly but should not replace meaningful behavioral assertions.',
    code: `import { render } from "@testing-library/react";
import { Badge } from "./Badge";

test("renders badge markup", () => {
  const { container } = render(<Badge label="New" />);
  expect(container.firstChild).toMatchSnapshot();
});

// First run creates __snapshots__/Badge.test.tsx.snap
// Update snapshots: jest -u`,
  },
  {
    id: 24,
    category: 'Jest',
    question: 'How do you test asynchronous code in Jest?',
    answer: 'Jest supports async tests by returning a Promise, using async/await, or calling done() in callback-style tests. For Promises, return the promise or await it so Jest waits for completion before asserting. jest.setTimeout increases the timeout for slow operations.',
    code: `// async/await (preferred)
test("fetches user", async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe("Alice");
});

// returning a Promise
test("resolves with data", () => {
  return getData().then((data) => {
    expect(data).toHaveProperty("id");
  });
});`,
  },
  {
    id: 25,
    category: 'Jest',
    question: 'What are beforeEach, afterEach, beforeAll, and afterAll?',
    answer: 'These lifecycle hooks run setup and teardown at different scopes in a test file. beforeEach and afterEach run before and after every test, ideal for resetting state. beforeAll and afterAll run once per describe block, useful for expensive one-time setup like starting a test server. Proper hooks keep tests isolated and avoid duplication.',
    code: `describe("UserService", () => {
  beforeAll(() => {
    // connect to test DB once
  });

  beforeEach(() => {
    // clear tables between tests
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // disconnect from test DB
  });
});`,
  },
  {
    id: 26,
    category: 'Jest',
    question: 'How do you test that a function throws an error in Jest?',
    answer: 'Wrap the throwing call in an arrow function passed to expect().toThrow(), because Jest needs to invoke the function itself to catch the error. You can pass an error message string or regex to verify the specific error. For async functions, use await expect(fn()).rejects.toThrow().',
    code: `function divide(a: number, b: number) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

test("throws on divide by zero", () => {
  expect(() => divide(10, 0)).toThrow("Division by zero");
  expect(() => divide(10, 0)).toThrow(/zero/);
});`,
  },
  {
    id: 27,
    category: 'Jest',
    question: 'What is jest.useFakeTimers and why use it?',
    answer: 'jest.useFakeTimers replaces real timers (setTimeout, setInterval, Date) with mock implementations you control manually. advanceTimersByTime and runAllTimers let tests skip waiting for debounce delays or polling intervals. Always restore real timers with jest.useRealTimers after tests to avoid leaking into other suites.',
    code: `jest.useFakeTimers();

test("debounces search input", () => {
  const onSearch = jest.fn();
  debounceSearch(onSearch, "react");

  jest.advanceTimersByTime(299);
  expect(onSearch).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1);
  expect(onSearch).toHaveBeenCalledWith("react");

  jest.useRealTimers();
});`,
  },
  {
    id: 28,
    category: 'Jest',
    question: 'How do you run only specific tests in Jest?',
    answer: 'Use it.only or describe.only to run a single test or suite during development, and it.skip or describe.skip to temporarily disable tests. The -t flag on the CLI filters tests by name pattern. Avoid committing .only in shared code because CI would skip other tests silently if not caught.',
    code: `describe.only("checkout", () => {
  it.only("applies coupon", () => {
    expect(applyCoupon(100, "SAVE10")).toBe(90);
  });

  it.skip("handles expired coupon", () => {
    // temporarily disabled
  });
});

// CLI: jest -t "applies coupon"`,
  },
  {
    id: 29,
    category: 'Jest',
    question: 'What is the purpose of setupFilesAfterEnv in Jest?',
    answer: 'setupFilesAfterEnv specifies scripts that run after the test framework is installed but before each test file, making it the right place for global test utilities and matchers. Common uses include importing @testing-library/jest-dom for DOM matchers, configuring mock defaults, or setting up MSW. It differs from setupFiles which runs before the framework loads.',
    code: `// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

// src/setupTests.ts
import "@testing-library/jest-dom";
// extends expect with toBeInTheDocument(), etc.`,
  },
  {
    id: 30,
    category: 'Jest',
    question: 'How does React Testing Library work with Jest?',
    answer: 'React Testing Library renders components into a virtual DOM (via jsdom) and provides queries to find elements the way users would — by role, label, or text. Jest runs the tests and assertions while RTL focuses on accessible, behavior-driven queries instead of implementation details. Together they form the standard stack for React unit and component testing.',
    code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("shows error for empty submit", async () => {
  render(<LoginForm />);
  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
  expect(screen.getByRole("alert")).toHaveTextContent(/email is required/i);
});`,
  },
  {
    id: 31,
    category: 'Jest',
    question: 'What is the difference between getBy, queryBy, and findBy in RTL?',
    answer: 'getBy queries throw immediately if no element is found — use when the element must exist. queryBy returns null instead of throwing, ideal for asserting something is not present. findBy returns a Promise and waits for async appearance, with a default timeout — use for elements that appear after data loads.',
    code: `// getBy — element must exist now
screen.getByRole("heading", { name: /dashboard/i });

// queryBy — assert absence
expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

// findBy — wait for async appearance
const message = await screen.findByText(/welcome/i);`,
  },
  {
    id: 32,
    category: 'Jest',
    question: 'Why does React Testing Library recommend querying by role?',
    answer: 'Querying by role mirrors how assistive technology and users perceive the page, encouraging accessible markup with proper ARIA roles and labels. getByRole("button", { name: "Submit" }) fails if the button lacks an accessible name, surfacing a11y issues during testing. It also avoids brittle selectors tied to CSS classes or DOM structure.',
    code: `// Accessible — preferred
screen.getByRole("button", { name: /submit order/i });
screen.getByRole("textbox", { name: /email address/i });

// Less preferred — implementation-coupled
screen.getByTestId("submit-btn");
document.querySelector(".btn-primary");`,
  },
  {
    id: 33,
    category: 'Jest',
    question: 'How do you test React hooks with renderHook?',
    answer: '@testing-library/react provides renderHook to mount a hook in a test environment and access its return value and rerender function. Wrap hook updates in act() when state changes trigger re-renders. This lets you test custom hooks in isolation without building wrapper components.',
    code: `import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("increments count", () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => result.current.increment());

  expect(result.current.count).toBe(1);
});`,
  },
  {
    id: 34,
    category: 'Jest',
    question: 'How do you mock React context in Jest tests?',
    answer: 'Wrap the component under test in the real Provider with test-specific values, or create a mock provider component that supplies controlled context. Avoid mocking useContext directly — testing through the Provider exercises the same code path production uses.',
    code: `const mockAuth = { user: { name: "Alice" }, isLoggedIn: true };

function renderWithAuth(ui: React.ReactElement) {
  return render(
    <AuthContext.Provider value={mockAuth}>{ui}</AuthContext.Provider>
  );
}

test("shows user name when logged in", () => {
  renderWithAuth(<Navbar />);
  expect(screen.getByText("Alice")).toBeInTheDocument();
});`,
  },
  {
    id: 35,
    category: 'Jest',
    question: 'What is jest.mocked() and how is it used with TypeScript?',
    answer: 'jest.mocked() is a TypeScript helper that narrows a mocked function or module to its mock type, giving autocomplete for mock methods like mockReturnValue and mockResolvedValue. It improves type safety when working with jest.mock() auto-mocks. Without it, TypeScript may not recognize mock-specific APIs on imported functions.',
    code: `import { fetchUser } from "./api";

jest.mock("./api");
const mockedFetchUser = jest.mocked(fetchUser);

test("loads user", async () => {
  mockedFetchUser.mockResolvedValue({ id: 1, name: "Alice" });
  const user = await loadProfile(1);
  expect(user.name).toBe("Alice");
});`,
  },
  {
    id: 36,
    category: 'Jest',
    question: 'How do you test API calls in Jest without hitting a real server?',
    answer: 'Mock the HTTP client or data-fetching module with jest.mock(), use libraries like MSW to intercept requests at the network level, or stub global fetch with mockResolvedValue. The goal is deterministic responses that test your logic, not the remote server.',
    code: `global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, name: "Alice" }),
  })
) as jest.Mock;

test("loads profile from API", async () => {
  const profile = await getProfile(1);
  expect(profile.name).toBe("Alice");
  expect(fetch).toHaveBeenCalledWith("/api/users/1");
});`,
  },
  {
    id: 37,
    category: 'Jest',
    question: 'What is the difference between jest.clearAllMocks and jest.resetAllMocks?',
    answer: 'jest.clearAllMocks() clears call history and instances on all mocks but keeps mock implementations intact. jest.resetAllMocks() goes further by resetting implementations to empty functions (returning undefined). jest.restoreAllMocks() restores spied original implementations. Use clearAllMocks in afterEach for call count assertions, and resetAllMocks when tests set different mockReturnValue per case.',
    code: `const fn = jest.fn().mockReturnValue(42);

fn();
jest.clearAllMocks();
fn(); // still returns 42, call count is 1

jest.resetAllMocks();
fn(); // returns undefined, implementation cleared`,
  },
  {
    id: 38,
    category: 'Jest',
    question: 'How do you configure Jest for a TypeScript project?',
    answer: 'Use ts-jest or babel-jest to transform TypeScript files, set testMatch patterns for test file locations, and configure moduleNameMapper for path aliases and static assets. A jest.config.ts or jest.config.js file centralizes these settings. Most Vite projects use vitest instead, but Jest remains common in CRA and Next.js setups.',
    code: `// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};`,
  },
  {
    id: 39,
    category: 'Jest',
    question: 'What is jsdom and why does Jest use it for React tests?',
    answer: 'jsdom is a JavaScript implementation of web browser APIs like document, window, and DOM manipulation that runs in Node.js. Jest\'s jsdom test environment lets React Testing Library render components without a real browser. It does not implement every browser feature (layout, full CSS), so some visual or navigation tests belong in E2E tools instead.',
    code: `// jest.config.js
module.exports = {
  testEnvironment: "jsdom", // simulates browser DOM in Node
};

// Now RTL can do:
// render(<App />);
// screen.getByRole("button").click();`,
  },
  {
    id: 40,
    category: 'Jest',
    question: 'How do you test error boundaries in Jest with React Testing Library?',
    answer: 'Suppress console.error in the test because React logs boundary errors, render a component that throws inside an ErrorBoundary wrapper, and assert the fallback UI appears. You can trigger throws via a prop or mock child component. Testing error boundaries verifies graceful degradation when child components fail.',
    code: `const ThrowError = () => { throw new Error("boom"); };

test("error boundary shows fallback", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});`,
  },
]
