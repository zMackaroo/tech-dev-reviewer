import type { InterviewQuestion } from '../../types'

export const modernHooksQuestions: InterviewQuestion[] = [
  {
    id: 101,
    category: 'Modern Hooks',
    question: 'What is the React use() hook?',
    answer: 'The use() hook reads the value of a resource during render — either a Promise or a Context object — and integrates with Suspense to pause rendering until async data resolves. Unlike useEffect, it can be called conditionally after early returns, which is an intentional exception to the Rules of Hooks for this API only. When the Promise rejects, the nearest error boundary catches it; when it resolves, React continues rendering with the unwrapped value.',
    code: `import { use, Suspense } from "react";

function UserProfile({ userPromise }) {
  const user = use(userPromise); // suspends until resolved
  return <h1>{user.name}</h1>;
}

<Suspense fallback={<Spinner />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>`,
    output: ['Read Promise or Context during render — works with Suspense'],
  },
  {
    id: 102,
    category: 'Modern Hooks',
    question: 'What is useActionState?',
    answer: 'useActionState (formerly useFormState in early React 19 betas) manages state returned from an async action function, typically a form submission or Server Action. It returns a tuple of [state, formAction, isPending] so you get the latest result, a wrapped action to pass to a form, and built-in pending status without extra useState boilerplate. The action receives the previous state as its first argument, then the form payload, making multi-step or error-retry flows straightforward.',
    code: `"use client";
import { useActionState } from "react";

async function saveProfile(prevState, formData) {
  const res = await updateUser(formData);
  if (!res.ok) return { error: "Save failed" };
  return { success: true };
}

function ProfileForm() {
  const [state, action, isPending] = useActionState(saveProfile, null);
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>{isPending ? "Saving…" : "Save"}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}`,
    output: ['[state, action, isPending] — async form/action state'],
  },
  {
    id: 103,
    category: 'Modern Hooks',
    question: 'What is useFormStatus?',
    answer: 'useFormStatus reads the submission status of the nearest parent <form> that is being processed by a React Action, without prop drilling pending state from the submit button component. It returns { pending, data, method, action } so child components like a SubmitButton or FormSpinner can disable themselves or show loading UI automatically. The hook must be used in a component rendered inside the form — it cannot be called in the same component that owns the form action in some setups, which is why teams extract a SubmitButton child.',
    code: `"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Submitting…" : children}
    </button>
  );
}

function LoginForm({ action }) {
  return (
    <form action={action}>
      <input name="email" />
      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}`,
    output: ['Pending state from nearest submitting form — no prop drilling'],
  },
  {
    id: 104,
    category: 'Modern Hooks',
    question: 'What is useOptimistic?',
    answer: 'useOptimistic lets you show an optimistic UI update immediately while an async action is in flight, then automatically revert or reconcile when the server responds. It returns [optimisticState, addOptimistic] where addOptimistic applies a temporary update that React rolls back if the action fails. This is cleaner than manually cloning state, applying a fake update, and undoing on error in useEffect. It pairs naturally with Server Actions, transitions, and lists where users expect instant feedback.',
    code: `"use client";
import { useOptimistic, useTransition } from "react";

function MessageList({ messages, sendAction }) {
  const [optimistic, addOptimistic] = useOptimistic(
    messages,
    (state, newMsg) => [...state, { ...newMsg, sending: true }]
  );
  const [, startTransition] = useTransition();

  function handleSend(text) {
    startTransition(async () => {
      addOptimistic({ id: crypto.randomUUID(), text });
      await sendAction(text);
    });
  }

  return optimistic.map((m) => (
    <div key={m.id}>{m.text}{m.sending ? " …" : ""}</div>
  ));
}`,
    output: ['Temporary optimistic UI — reverts on failure'],
  },
  {
    id: 105,
    category: 'Modern Hooks',
    question: 'What is useInsertionEffect?',
    answer: 'useInsertionEffect runs synchronously before useLayoutEffect and before the browser paints, specifically for injecting styles into the DOM from CSS-in-JS libraries. It fires after DOM mutations but before layout reads, giving libraries a safe place to insert <style> tags without triggering layout thrashing. Unlike useEffect, it must not read layout or schedule updates — it is only for DOM insertions that affect styling.',
    code: `useInsertionEffect(() => {
  // Inject styles before layout/paint — CSS-in-JS libraries
  const style = document.createElement("style");
  style.textContent = \`.btn { color: \${theme.primary}; }\`;
  document.head.appendChild(style);
  return () => style.remove();
}, [theme.primary]);

// Order: useInsertionEffect → useLayoutEffect → paint → useEffect`,
    output: ['Inject styles before layout — CSS-in-JS timing'],
  },
  {
    id: 106,
    category: 'Modern Hooks',
    question: 'What is useEffectEvent?',
    answer: 'useEffectEvent (React 19.2+) returns a stable function reference that always sees the latest props and state when invoked, without needing to list those values in a useEffect dependency array. It solves the stale closure problem for effect callbacks that should not re-subscribe when unrelated values change — like an analytics handler that needs the latest userId but should not re-run setup on every render. You define the event handler with useEffectEvent and call it from inside useEffect with a minimal dependency list.',
    code: `function ChatRoom({ roomId, theme }) {
  const onMessage = useEffectEvent((msg) => {
    log(msg, theme); // always latest theme — not a dep of effect below
  });

  useEffect(() => {
    const socket = connect(roomId);
    socket.on("message", onMessage);
    return () => socket.disconnect();
  }, [roomId]); // theme changes do NOT reconnect socket
}`,
    output: ['Stable callback with latest props/state — fewer effect deps'],
  },
  {
    id: 107,
    category: 'Modern Hooks',
    question: 'How do useActionState and useFormStatus work together?',
    answer: 'useActionState owns the async action, returned state, and top-level isPending flag at the form level, while useFormStatus lets deeply nested submit controls read pending status from that same form without props. The form passes action={formAction} from useActionState, and child components like buttons or fieldsets call useFormStatus to disable inputs or show spinners during submission. Together they replace the common pattern of lifting isSubmitting state and drilling it into every interactive child.',
    code: `function CheckoutForm() {
  const [state, action, isPending] = useActionState(checkoutAction, null);

  return (
    <form action={action}>
      <AddressFields disabled={isPending} /> {/* uses useFormStatus inside */}
      <SubmitButton />                     {/* uses useFormStatus inside */}
      {state?.errors?.card && <p>{state.errors.card}</p>}
    </form>
  );
}`,
    output: ['Action state at form root — pending UI in children via useFormStatus'],
  },
  {
    id: 108,
    category: 'Modern Hooks',
    question: 'When should you use useOptimistic vs useTransition?',
    answer: 'useTransition marks state updates as low priority so React keeps the UI responsive during expensive re-renders — it does not fake data, it defers work. useOptimistic temporarily shows predicted data before the server confirms it, then reconciles when the async action completes. Use startTransition when the slowdown is rendering or filtering large local state, and useOptimistic when users expect immediate feedback for mutations like likes, sends, or drag-and-drop. They can be combined: startTransition wraps the async call while addOptimistic applies the instant UI change.',
    code: `// useTransition — defer expensive render, same data timing
startTransition(() => setFilter(query));

// useOptimistic — show predicted result before server confirms
addOptimistic({ id: tempId, text, pending: true });
await createComment(text);`,
    output: ['Transition = defer work; Optimistic = show predicted result early'],
  },
  {
    id: 109,
    category: 'Modern Hooks',
    question: 'How does use() integrate with Suspense and error boundaries?',
    answer: 'When use() receives a pending Promise, React suspends the component and renders the nearest Suspense fallback until the Promise settles, similar to lazy-loaded components or React Query suspense mode. If the Promise rejects, React propagates the error to the nearest error boundary instead of returning undefined to your component. This creates a declarative async rendering model where loading and error UI live at the boundary level rather than inside every leaf component. It matters because it reduces branching on isLoading and error flags scattered through the tree.',
    code: `function Widget({ dataPromise }) {
  const data = use(dataPromise); // suspends or throws
  return <Chart values={data} />;
}

<ErrorBoundary fallback={<WidgetError />}>
  <Suspense fallback={<WidgetSkeleton />}>
    <Widget dataPromise={fetchMetrics()} />
  </Suspense>
</ErrorBoundary>`,
    output: ['Pending Promise → Suspense fallback; rejection → error boundary'],
  },
  {
    id: 110,
    category: 'Modern Hooks',
    question: 'What is the modern React hooks landscape (React 18–19)?',
    answer: 'React 18 added concurrent hooks — useTransition, useDeferredValue, useId, useSyncExternalStore, and useInsertionEffect — focused on responsiveness, SSR safety, and external stores. React 19 added use, useActionState, useFormStatus, and useOptimistic for async actions, forms, and optimistic mutations, plus ref-as-prop and Actions that reduce forwardRef and manual pending-state boilerplate. React 19.2 added useEffectEvent to simplify effect dependencies for event-like callbacks. Together these hooks push data fetching and mutations toward declarative patterns with Suspense and Server Actions instead of useEffect plus useState for every async path.',
    code: `// React 18 concurrent
useTransition, useDeferredValue, useId, useSyncExternalStore

// React 19 async UI
use(), useActionState, useFormStatus, useOptimistic

// React 19.2 effects
useEffectEvent`,
    output: ['18: concurrent + SSR; 19: async forms/actions; 19.2: effect events'],
  },
]
