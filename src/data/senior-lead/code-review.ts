import type { InterviewQuestion } from '../../types'

export const codeReviewQuestions: InterviewQuestion[] = [
  {
    id: 11,
    category: 'Code Reviewing',
    question: 'A junior developer submits a large PR that mixes refactoring with a feature. How do you handle the review?',
    answer: 'Ask them to split the PR into focused changes — refactor first or feature first — so each review is understandable and bisectable if something breaks. Explain that mixed PRs slow review, hide regressions, and make rollback harder, which is a teaching moment about professional delivery habits. If splitting is not feasible due to deadline, review in logical commits and flag the pattern for next time in a constructive retro comment. For example, a 40-file PR might become "extract shared hook" then "add filter UI using hook." In a real app team, the senior engineer sets team norms in a CONTRIBUTING doc so this expectation is clear before the PR lands.',
    code: `Review response:
"Thanks for the work! Can we split this into:
1) Refactor /move shared logic (no behavior change)
2) Feature using the new structure
Easier to review and safer to revert."`,
  },
  {
    id: 12,
    category: 'Code Reviewing',
    question: 'You find a bug in a PR but the author is defensive when you comment. What do you do?',
    answer: 'Keep feedback specific, kind, and tied to user impact or team standards rather than personal judgment — "this path throws when items is empty" beats "this is wrong." Offer to pair or hop on a short call if the thread gets heated, because async text often amplifies tone. Escalate to the engineering manager only if behavior is repeated or blocks quality, not after a single tense exchange. This matters because code review culture determines whether people ask for help or hide mistakes. For example, you might suggest a test case that reproduces the bug so the fix is collaborative. In a real app team, senior engineers model curiosity ("help me understand why you chose X") instead of authority.',
    code: `Constructive comment pattern:
Observation → Impact → Question or suggestion
"When cart is empty, checkout throws. Users hit a blank screen.
Could we guard with early return? Happy to pair if useful."`,
  },
  {
    id: 13,
    category: 'Code Reviewing',
    question: 'How do you review code when you are unfamiliar with the area of the codebase?',
    answer: 'Focus on universal quality bars — correctness, tests, accessibility, security, readability, and observability — even when you do not know every module name. Ask the author for context in the PR description: problem, approach, alternatives considered, and how to test manually. Pull a domain expert as a second reviewer when business logic or compliance is involved rather than rubber-stamping. For example, you might not know the billing module deeply but can still verify error handling, loading states, and that PII is not logged. In a real app, the senior engineer uses the review to learn the system while still catching cross-cutting issues experts might miss.',
    code: `Universal review checklist:
□ Tests for happy + edge paths
□ a11y (labels, focus, keyboard)
□ No secrets / PII in logs
□ Error + loading UI
□ PR description explains why`,
  },
  {
    id: 14,
    category: 'Code Reviewing',
    question: 'A PR looks fine but introduces subtle performance regression. How do you communicate that?',
    answer: 'Show evidence — profiler screenshot, Lighthouse delta, or complexity analysis — so the feedback is objective rather than "I feel this is slow." Explain the user-visible symptom and suggest a concrete fix, such as memoization, virtualization, or moving work off the render path. Distinguish between blocking issues and follow-up improvements so the team can ship when the regression is minor and tracked. For example, filtering 10k rows on every keystroke without useDeferredValue might be demonstrated with a quick React Profiler capture. In a real app, the senior engineer links performance expectations to the team\'s performance budget doc.',
    code: `Performance review comment:
"Profiler shows 180ms commit on each keystroke (was ~20ms).
Suggest deferring filter with useDeferredValue or virtualizing list.
Can block merge if search is a core flow."`,
  },
  {
    id: 15,
    category: 'Code Reviewing',
    question: 'How do you balance thorough reviews with team velocity?',
    answer: 'Define what must be checked on every PR versus what can be automated — lint, typecheck, tests, bundle size, and a11y rules should run in CI so human review focuses on design and logic. Use review SLAs and rotate reviewers to avoid one person becoming a bottleneck. Reserve deep architectural review for high-risk changes: auth, payments, migrations, and shared libraries. For example, a copy change in marketing might need one quick reviewer while a checkout change needs two and a QA pass. In a real app team, the senior engineer invests in templates and checklists so reviews are faster and more consistent.',
    code: `Risk-based review tiers:
Low risk → 1 reviewer, CI must pass
Medium → 2 reviewers, manual test notes
High → architect + QA + rollout plan`,
  },
  {
    id: 16,
    category: 'Code Reviewing',
    question: 'You notice repeated mistakes from the same developer. How do you address it beyond leaving comments?',
    answer: 'Look for a systemic cause — unclear docs, missing lint rules, rushed deadlines, or knowledge gaps — before treating it as an individual performance issue. Offer pairing, internal docs, or a short team learning session on the pattern you are seeing, such as missing dependency arrays or improper error boundaries. Track whether the pattern improves; if not, involve the manager with examples and the support already offered. This matters because senior engineers develop people, not just codebases. For example, if someone repeatedly skips tests, you might pair on TDD for one story and add a CI coverage gate for critical paths. In a real app org, mentorship is part of the senior role expectation.',
    code: `Coaching loop:
1. Pattern observed (specific examples)
2. Root cause hypothesis
3. Support (pair, doc, lint rule)
4. Check back in 2–3 PRs`,
  },
  {
    id: 17,
    category: 'Code Reviewing',
    question: 'How do you review your own team\'s code differently from an external contributor\'s?',
    answer: 'Hold the same quality bar for everyone, but internal PRs can assume more shared context while external or cross-team PRs need clearer descriptions, migration notes, and adherence to published conventions. For internal work, use review as a coaching opportunity with richer "why" explanations that build team skill over time. For external contributions, prioritize kindness, explicit setup steps, and fast feedback so contributors are not discouraged. For example, an open-source PR might need a CLA check and a maintainer explaining naming conventions that internal devs already know. In a real app monorepo, CODEOWNERS routes external teams to the right reviewers automatically.',
    code: `Internal vs external:
Internal → coach, reference team ADRs
External → link conventions, be explicit, respond quickly`,
  },
  {
    id: 18,
    category: 'Code Reviewing',
    question: 'A PR bypasses review and lands in main with a production bug. What happens next?',
    answer: 'Fix forward or revert immediately based on severity, then run a blameless postmortem focused on process gaps rather than punishing an individual. Identify whether branch protection, required reviewers, or emergency merge policy failed and tighten guards without blocking legitimate hotfixes. Share learnings with the team — what signal was missed and what check would have caught it. This matters because senior engineers shape incident culture and prevention. For example, if someone merged without CI green, you restore required status checks and document the hotfix exception process. In a real app, you also add a regression test in the same PR as the fix.',
    code: `Post-incident questions:
• How did it reach prod without review/CI?
• What test or lint would catch it?
• Process change (not blame)`,
  },
  {
    id: 19,
    category: 'Code Reviewing',
    question: 'How do you give feedback on architecture you disagree with without blocking progress?',
    answer: 'Separate must-fix concerns (security, data loss, unmaintainable coupling) from preferences (naming, file layout) and label them clearly in review. Propose alternatives with tradeoffs and ask the author to document the chosen approach in an ADR if the decision is significant. Approve with follow-up tickets when the issue is real but not launch-blocking, so the team keeps momentum. For example, you might accept a temporary client-side cache with a ticket to align with the shared data layer next sprint. In a real app, the senior engineer knows when to escalate to a design review versus resolving in PR comments.',
    code: `Comment labels:
[blocking] — must fix before merge
[suggestion] — optional improvement
[question] — understand intent
[future] — track as follow-up ticket`,
  },
  {
    id: 20,
    category: 'Code Reviewing',
    question: 'What makes an excellent PR description, and how do you enforce it as a senior engineer?',
    answer: 'A strong PR description explains the problem, the approach, how to test, screenshots for UI, and any rollout or feature-flag notes — it answers reviewers\' first questions without a meeting. Enforce it through a PR template in the repo, gentle bot reminders, and modeling good descriptions on your own PRs. During review, send back PRs with empty descriptions rather than guessing intent, which trains the habit quickly. For example, a checkout fix PR might include steps to reproduce the bug, the root cause, and a Loom for the fixed flow on mobile. In a real app team, good descriptions cut review time in half and improve release notes quality.',
    code: `PR template sections:
## What / Why
## How to test
## Screenshots / recordings
## Rollout (flag, migration, risk)`,
  },
]
