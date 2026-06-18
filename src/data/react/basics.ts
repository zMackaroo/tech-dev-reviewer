import type { InterviewQuestion } from '../../types'

export const basicsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is React and why use it?',
    answer: 'React is a JavaScript library for building user interfaces using a component-based architecture, where each piece of UI is a reusable, self-contained unit. It uses a virtual DOM to diff changes efficiently, JSX for declarative markup, and a unidirectional data flow that makes state predictable. This matters because it scales well for complex apps — teams can compose small components into large UIs without manually syncing the DOM. For example, a dashboard might split into Sidebar, Chart, and Table components that each manage their own rendering while sharing data through props. In a real app like a social feed, React lets you update a single post\'s like count without re-rendering the entire page.',
    code: `// React lets you describe UI as a function of state
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
// UI = f(state)`,
    output: ['UI = f(state)'],
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript, making UI code more readable than nested function calls. At build time, tools like Babel transpile JSX into React.createElement() calls that React can render. You can embed any JavaScript expression inside curly braces and must return a single root element or wrap siblings in a Fragment. This matters because JSX bridges the gap between markup and logic, so you can conditionally render or map over data inline. For example, a paragraph that shows "Admin" or "User" based on user.isAdmin keeps presentation and logic in one place. In a real app, a product card component might use JSX to combine an image, price, and dynamic discount badge in a single readable return statement.',
    code: `const element = (
  <>
    <h1>Title</h1>
    <p>{2 + 2}</p>
  </>
);
// Transpiles to React.createElement calls`,
    output: ['Transpiles to React.createElement calls'],
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is the Virtual DOM?',
    answer: 'The Virtual DOM is a lightweight in-memory JavaScript representation of the real DOM tree that React maintains between renders. When state changes, React builds a new virtual tree, compares it to the previous one through a process called reconciliation, and applies only the minimal set of changes to the actual DOM. This matters because direct DOM manipulation is slow — batching and diffing updates keeps the UI responsive even in data-heavy interfaces. For example, updating one item in a list of 1,000 rows only patches that single node instead of rebuilding the whole list. In a real app like a live chat, new messages append efficiently without re-rendering every prior message.',
    code: `// State change → new VDOM → diff → patch real DOM
setState(newValue);
// React only updates changed nodes, not the whole page`,
    output: ['React only updates changed nodes, not the whole page'],
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What is the difference between React and ReactDOM?',
    answer: 'React is the core library containing components, hooks, and the createElement API — it is platform-agnostic and defines how UI is described. ReactDOM is the browser-specific renderer that takes React elements and mounts them into the real DOM. This separation matters because the same React core can target different environments: React Native uses a different renderer for mobile, and React DOM Server renders HTML on the server. For example, you import hooks from "react" but call createRoot from "react-dom/client" to attach your app to a div. In a real app, your entry file typically imports App from React components and uses ReactDOM to render it into document.getElementById("root").',
    code: `import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`,
    output: ['createRoot → render → DOM updated'],
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What is a React component?',
    answer: 'A React component is a reusable piece of UI defined as either a function that returns JSX or a class extending React.Component. Components accept inputs called props and can manage internal state to determine what they render. This matters because breaking an interface into components enforces separation of concerns and makes code easier to test, reuse, and maintain across a codebase. For example, a Button component might accept label and onClick props and be used in forms, modals, and nav bars alike. In a real app, an e-commerce site might compose ProductCard, CartIcon, and CheckoutForm components into a full shopping experience.',
    code: `function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Usage
<Button label="Save" onClick={() => alert("saved")} />`,
    output: ['Reusable, composable UI building blocks'],
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What are props in React?',
    answer: 'Props (short for properties) are read-only inputs passed from a parent component to a child, enabling data to flow down the component tree. They make components configurable and composable — the same component can render differently depending on what the parent passes in. This matters because props enforce a clear contract between components and prevent children from accidentally corrupting parent data. For example, a UserCard might receive name and role props to display profile information without knowing where that data came from. In a real app, a parent page fetches user data from an API and passes it down as props to presentational components.',
    code: `function UserCard({ name, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <span>{role}</span>
    </div>
  );
}
<UserCard name="Alice" role="Admin" />`,
    output: ['Props flow down — read-only in child'],
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What is the difference between functional and class components?',
    answer: 'Functional components are plain JavaScript functions that return JSX and use hooks like useState and useEffect for state and side effects. Class components extend React.Component, use this.state for state, and rely on lifecycle methods like componentDidMount. Functional components are now the standard because they involve less boilerplate, are easier to read, and work better with React\'s modern optimization features. This matters when maintaining or starting new projects — nearly all new React code uses functions with hooks. For example, a simple counter is a few lines with useState versus a full class with constructor and render method. In a real app, you will still encounter class components in legacy codebases, but new features should be written as functional components.',
    code: `// Functional (modern)
function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// Class (legacy)
class Counter extends React.Component {
  state = { n: 0 };
  render() { return <button onClick={() => this.setState({ n: this.state.n + 1 })}>{this.state.n}</button>; }
}`,
    demo: 'react-state',
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'What is one-way data flow in React?',
    answer: 'One-way data flow means data travels down the component tree via props, while events and updates travel back up through callback functions passed as props. The parent owns the state and passes both the current value and an onChange handler to children, keeping a single source of truth. This matters because predictable data direction makes bugs easier to trace — you always know where state lives and how it changes. For example, a Parent holds text state and a Child input calls onChange when the user types, never modifying props directly. In a real app, a search page might keep the query string in the parent and pass it to both a SearchInput and a ResultsList so they stay synchronized.',
    code: `function Parent() {
  const [text, setText] = useState("");
  return <Child value={text} onChange={setText} />;
}
function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}`,
    demo: 'react-lifting-state',
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is React.Fragment and why use it?',
    answer: 'React.Fragment lets you group multiple JSX elements as siblings without adding an extra DOM node like a wrapper div. The shorthand syntax is <>...</>, which produces the same result as an explicit <React.Fragment>. This matters because extra wrapper elements can break CSS layouts (flexbox, grid), semantic HTML structure, or accessibility tree relationships. For example, a table row component that returns multiple <td> cells must use a Fragment since a div between tr and td is invalid HTML. In a real app, a modal overlay might use a Fragment to render a backdrop and dialog panel as siblings without polluting the DOM hierarchy.',
    code: `function List() {
  return (
    <>
      <li>One</li>
      <li>Two</li>
    </>
  );
}
// No extra <div> in the DOM`,
    output: ['No extra wrapper div in DOM'],
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What is the difference between element and component?',
    answer: 'A React element is a plain JavaScript object describing what to render — it has a type, props, and children, like { type: "h1", props: { children: "Hello" } }. A component is a function or class that returns elements when invoked by React. This distinction matters because elements are immutable snapshots of UI at a point in time, while components are reusable factories that produce new elements on each render. For example, a Button component with a label prop creates an element whose type is the Button function, not a DOM node directly. In a real app, React.createElement or JSX compiles your components into element trees that the reconciler diff against the previous render.',
    code: `const element = <h1 className="title">Hello</h1>;
// { type: "h1", props: { className: "title", children: "Hello" } }

const Component = () => element;`,
    output: ['Elements describe UI; components produce elements'],
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'What is conditional rendering in React?',
    answer: 'Conditional rendering means displaying different UI depending on a condition, using patterns like if/else before the return, ternary operators, logical AND (&&), or early returns. You cannot use if statements directly inside JSX curly braces — only expressions are allowed there. This matters because nearly every interactive app needs to show or hide content based on auth status, loading state, or user input. For example, a ternary that renders Dashboard when logged in and LoginForm otherwise switches the entire view based on authentication. In a real app, you might show a skeleton loader while data fetches, then render the content or an error message once the request completes.',
    code: `function Status({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      {isLoggedIn && <Dashboard />}
    </div>
  );
}`,
    output: ['Ternary, &&, and early return are common patterns'],
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'How do you render lists in React?',
    answer: 'You render lists by calling array.map() to transform each data item into a JSX element inside your component\'s return. Each element in the list must have a unique, stable key prop so React can track items efficiently during updates and reordering. This matters because lists are everywhere in UIs — feeds, tables, menus — and incorrect rendering causes bugs like duplicate keys or lost component state. For example, todos.map(todo => <li key={todo.id}>{todo.text}</li>) turns an array of objects into a rendered list. In a real app, a notification panel maps over an API response to render each alert with its own dismiss button and icon.',
    code: `const todos = [{ id: 1, text: "Learn React" }, { id: 2, text: "Build app" }];

function TodoList() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    demo: 'react-keys',
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'What is the purpose of key prop?',
    answer: 'The key prop gives React a stable identity for each item in a list so it can determine which items were added, removed, or reordered during reconciliation. Without proper keys, React may reuse the wrong DOM nodes, causing lost input focus, stale state, or incorrect animations. This matters most when lists are dynamic — filtered, sorted, or updated in place. For example, using item.id as the key ensures each Row component stays tied to the correct data even after a sort. In a real app, using array index as key in a draggable task list would cause inputs to show the wrong text after reordering.',
    code: `// Good: stable unique id
items.map(item => <Row key={item.id} data={item} />)

// Bad: index as key when list reorders
items.map((item, i) => <Row key={i} data={item} />)`,
    demo: 'react-keys',
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'What is CRA and what replaced it?',
    answer: 'Create React App (CRA) was the official zero-configuration tool for bootstrapping React projects with webpack, Babel, and a dev server out of the box. It has been deprecated because its build tooling became slow and hard to customize compared to modern alternatives. This matters when starting new projects — choosing an actively maintained toolchain affects developer experience and build performance. For example, Vite uses native ES modules for near-instant hot module replacement during development. In a real app, teams now typically scaffold with Vite for SPAs, Next.js for full-stack apps, or Remix for data-heavy web applications.',
    code: `// Modern setup with Vite
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev`,
    output: ['Vite, Next.js, and Remix are modern choices'],
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is StrictMode in React?',
    answer: 'StrictMode is a development-only wrapper component that activates additional checks and warnings to help you write safer React code. It intentionally double-invokes certain functions like render, state updaters, and effects in development to surface side effects and impure logic. This matters because bugs from missing cleanup functions or non-idempotent effects are hard to catch otherwise. For example, if your useEffect fetches data without proper cleanup, running it twice in dev will reveal duplicate network requests. In a real app, wrapping your root <App /> in StrictMode during development helps catch issues before they reach production, though it has no effect on the production build.',
    code: `<StrictMode>
  <App />
</StrictMode>
// Effects run twice in dev to surface side-effect bugs`,
    output: ['Dev-only checks — effects may run twice'],
  },
]
