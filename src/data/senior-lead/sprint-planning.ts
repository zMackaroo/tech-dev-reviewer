import type { InterviewQuestion } from '../../types'

export const sprintPlanningQuestions: InterviewQuestion[] = [
  {
    id: 41,
    category: 'Sprint Planning',
    question: 'Stories are vague going into sprint planning. How do you facilitate a productive session?',
    answer: 'Stop the line for stories that fail a readiness checklist — clear user value, acceptance criteria, design link, and known dependencies — and move them back to refinement instead of guessing in planning. Time-box discussion per story and park deep technical debates for a follow-up spike with fewer people. As facilitator, keep the team focused on commitment for the sprint, not solving every unknown in the room.',
    code: `Definition of Ready (DoR):
□ User story + AC
□ Design / API spec linked
□ Dependencies identified
□ Sized or estimable`,
  },
  {
    id: 42,
    category: 'Sprint Planning',
    question: 'The team consistently overcommits every sprint. What changes do you drive?',
    answer: 'Compare committed versus completed points over several sprints and use that average velocity as the planning baseline, not optimistic peak sprints. Include capacity for bugs, support, and meetings explicitly — many teams plan as if engineers have 40 hours of feature work. Protect slack for unknowns; running at 100% planned capacity guarantees carryover every sprint.',
    code: `Planning capacity:
Sprint capacity = velocity × focus factor
Reserve 15–20% for unplanned work`,
  },
  {
    id: 43,
    category: 'Sprint Planning',
    question: 'How do you break down a large frontend epic during planning?',
    answer: 'Slice vertically by user-visible outcomes — "user can save payment method" before "build reusable card form" — so each story delivers testable value and can ship independently when possible. Identify cross-cutting enablers (API, auth, design tokens) as explicit tasks or spikes rather than hiding them inside UI stories. Size the thinnest end-to-end slice first to de-risk unknowns early in the sprint or prior sprint.',
    code: `Vertical slice example:
Epic: Checkout redesign
→ Story 1: Guest can complete purchase (MVP path)
→ Story 2: Logged-in saved addresses
→ Story 3: Error + empty states`,
  },
  {
    id: 44,
    category: 'Sprint Planning',
    question: 'Product insists on filling the sprint with new features and no bug or debt capacity. How do you respond?',
    answer: 'Show the cost of zero maintenance — escaped defect rate, slower feature delivery, on-call pain — using team metrics and recent incidents. Negotiate a fixed allocation, commonly 15–25% of capacity, for bugs, support, and debt that the team controls internally even if product owns the feature backlog. Frame it as protecting feature velocity long term, not engineers avoiding work.',
    code: `Capacity buckets:
~70% features (product backlog)
~20% bugs / support / incidents
~10% engineering-driven debt`,
  },
  {
    id: 45,
    category: 'Sprint Planning',
    question: 'How do you handle planning when key team members will be on PTO mid-sprint?',
    answer: 'Reduce committed scope proportionally and front-load knowledge transfer before PTO — no single-owner stories that span the absence without a backup. Mark stories with owners and coverage in the sprint board so the team sees risk during daily standups. Avoid starting high-risk migrations or releases the week someone critical is out unless coverage is explicit.',
    code: `PTO planning:
Adjust velocity down
Pair before leave; document in-progress state
No "bus factor 1" stories spanning absence`,
  },
  {
    id: 46,
    category: 'Sprint Planning',
    question: 'Estimates vary wildly between engineers for the same story. What do you do in the session?',
    answer: 'Ask each person to explain assumptions behind high and low estimates — often the gap is missing context, not skill. Align on scope using acceptance criteria and reference similar past stories ("like the profile page, which was 5 points"). Use planning poker or async estimation to reduce anchoring, then discuss outliers until the team converges or splits the story.',
    code: `When estimates diverge:
"What did you include that I didn't?"
→ Update AC or split story
→ Spike if still unknown > 1 day`,
  },
  {
    id: 47,
    category: 'Sprint Planning',
    question: 'How do you facilitate sprint planning when the team is remote across time zones?',
    answer: 'Share the backlog and designs async before the live session so timezone-limited members can comment in writing. Record decisions, final commitments, and story owners in a shared doc or Jira immediately so late joiners are not excluded. Keep the synchronous portion for negotiation and commitment only, not silent reading time.',
    code: `Remote planning flow:
Async: backlog review + questions (24h)
Sync: estimate, commit, assign owners
Doc: sprint goal + risks + links`,
  },
  {
    id: 48,
    category: 'Sprint Planning',
    question: 'A dependency on another team is not ready but product wants the story in the sprint anyway. How do you handle it?',
    answer: 'Split the story into what your team can finish independently — mocks, UI behind flag, contract tests — and what is blocked on the dependency with a clear unblock date and owner on the other team. Do not commit to end-to-end delivery unless the dependency is ready or formally mocked with agreed contract. Escalate cross-team blockers in scrum of scrums or PM syncs with dates, not vague "they are working on it."',
    code: `Dependency story split:
Frontend: UI + MSW mock + flag (in sprint)
Integration: wire real API (blocked → next sprint)`,
  },
  {
    id: 49,
    category: 'Sprint Planning',
    question: 'How do you define and communicate the sprint goal?',
    answer: 'Craft one sentence that describes the user or business outcome the sprint should achieve, not a list of every ticket. Select stories that directly support the goal and be willing to defer tangential work even if it is partially started. Repeat the goal at standup and demo so the team can self-prioritize when surprises appear mid-sprint.',
    code: `Sprint goal template:
"By end of sprint, [user] can [outcome] so that [value]."
Max 1–2 primary goals per sprint`,
  },
  {
    id: 50,
    category: 'Sprint Planning',
    question: 'Planning runs over three hours and energy is gone. How do you fix facilitation going forward?',
    answer: 'Enforce timeboxes — refinement happens before planning, planning caps at two hours for a two-week sprint — with a scrum master or senior engineer guarding scope. Pre-sort the backlog so only ready stories are discussed live; everything else stays in the parking lot. Split planning into part one (commitment) and a short follow-up only if needed, rather than one marathon meeting.',
    code: `Meeting hygiene:
Refinement weekly (1h) → ready backlog
Planning max 2h: goal → stories → commit
Parking lot for off-topic debates`,
  },
]
