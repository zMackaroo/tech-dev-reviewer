import type { InterviewQuestion } from '../../types'

export const agilePracticesQuestions: InterviewQuestion[] = [
  {
    id: 51,
    category: 'Agile Practices',
    question: 'Daily standup has become a status report to the manager. How do you reset it?',
    answer: 'Reframe standup as a coordination meeting for the team — what blocks delivery today — not a performance update for leadership. Suggest the three-question format briefly, with optional deeper dives taken offline after standup. Model behavior by stating blockers and offers to help rather than listing completed tasks from yesterday. For example, "I am blocked on API credentials" triggers a quick follow-up instead of everyone reading Jira tickets aloud. In a real app team, the senior engineer reinforces that managers observe but do not turn standup into a review meeting.',
    code: `Standup focus:
Yesterday (brief) → Today → Blockers
Deep dives → after standup ("parking lot")`,
  },
  {
    id: 52,
    category: 'Agile Practices',
    question: 'How do you run an effective sprint retrospective as a senior engineer?',
    answer: 'Prepare a safe format — start/stop/continue, 4Ls, or sailboat — with anonymous input option if trust is low, and time-box each section so action items get space. Turn discussion into one or two concrete experiments for next sprint with owners and dates, not a endless complaint session. Follow up on last retro actions at the start; teams stop participating when nothing ever changes. For example, "stop merging without preview URL" becomes an owner adding a CI check before next retro. In a real app team, the senior engineer shares their own mistakes first to normalize psychological safety.',
    code: `Retro output:
1–2 actionable experiments (owner + date)
Review previous retro actions first
Psychological safety: blame process, not people`,
  },
  {
    id: 53,
    category: 'Agile Practices',
    question: 'Scrum feels like ceremony overhead with no benefit. How do you adapt without abandoning structure?',
    answer: 'Audit which ceremonies deliver value — planning that prevents mid-sprint chaos, retros that changed something — and trim or shorten the rest with team agreement. Align ceremony length to sprint length; a one-week sprint does not need a four-hour retro. Replace performative metrics like velocity charts nobody uses with outcomes the team cares about, such as cycle time or incident count. For example, you might move refinement async and keep a short planning session only. In a real app team, the senior engineer advocates for "minimum viable process" and revisits it quarterly instead of copying Spotify model slides.',
    code: `Ceremony audit:
Keep if → prevents pain we actually had
Cut if → no decisions in 3 sessions
Revisit quarterly with team`,
  },
  {
    id: 54,
    category: 'Agile Practices',
    question: 'Product changes priorities every few days. How do you protect agile sprint integrity?',
    answer: 'Educate product on the cost of churn — unfinished work, context switching, morale — and agree on a formal change process mid-sprint for truly urgent items with equivalent scope swap. Use a visible sprint board so when priorities shift, something comes off explicitly rather than silently accumulating WIP. Track carryover and escaped urgency to inform the next planning negotiation with data. For example, inserting a CEO demo request might mean dropping a lower-priority polish story with product\'s written approval. In a real app org, the senior engineer and scrum master present sprint commitment as a contract negotiable only through tradeoffs.',
    code: `Mid-sprint change rule:
Urgent insert → product picks what drops
Document swap in sprint notes`,
  },
  {
    id: 55,
    category: 'Agile Practices',
    question: 'How do you demo unfinished work at sprint review without embarrassing the team?',
    answer: 'Demo completed, working slices even if the epic is incomplete — show progress on the sprint goal with honest caveats about what is not production-ready. Use feature flags or staging environments so stakeholders see real interactions, not slide decks. Frame incomplete items as learning and next-sprint scope, not failure, when the team hit external blockers or underestimated. For example, you demo guest checkout working end-to-end while saved cards remain behind a flag with a clear ETA. In a real app review, the senior engineer helps engineers prepare a three-minute narrative: problem, demo, next steps.',
    code: `Sprint review structure:
Sprint goal recap → live demos → metrics/feedback
Not done: why + plan (no surprise)`,
  },
  {
    id: 56,
    category: 'Agile Practices',
    question: 'The team skips documentation because "we are agile." How do you balance speed and knowledge sharing?',
    answer: 'Clarify that agile values working software and responding to change, not avoiding all docs — lightweight ADRs, README updates, and runbooks are part of sustainable speed. Define what must be documented: architecture decisions, onboarding steps, deploy procedures, and API contracts — versus what lives in code and tests only. Make documentation part of Definition of Done for relevant stories instead of a separate cleanup sprint that never happens. For example, a new auth flow merges only when the runbook and env var list are updated in the repo. In a real app team, the senior engineer models updating docs in the same PR as code changes.',
    code: `DoD documentation triggers:
New env vars → README
Architecture choice → ADR
User-facing flow change → help doc / release note`,
  },
  {
    id: 57,
    category: 'Agile Practices',
    question: 'How do you practice continuous improvement without retro fatigue?',
    answer: 'Limit improvement experiments to one or two per sprint so the team can actually finish them and see results. Rotate retro formats and facilitators to keep sessions fresh and distribute ownership beyond the scrum master. Celebrate when an experiment works — faster reviews, fewer bugs — so the team connects process change to felt benefit. For example, trying "no meeting Wednesday afternoons" for deep work is one experiment with a survey at retro end. In a real app team, the senior engineer tracks improvement items like any other backlog with priority and closure.',
    code: `Improvement backlog:
Same as tech debt — prioritized, owned, closed
Max 2 experiments active per sprint`,
  },
  {
    id: 58,
    category: 'Agile Practices',
    question: 'Engineers and QA are siloed — bugs are found late. How do you improve collaboration in agile?',
    answer: 'Shift left by involving QA in refinement and planning so test scenarios influence acceptance criteria before code starts. Encourage developers to demo to QA on preview branches mid-sprint rather than only at sprint end. Share Definition of Done that includes automated tests and manual exploratory notes for high-risk areas. For example, payment stories include QA pairing on day two to write Playwright cases together. In a real app team, the senior engineer breaks the "throw over the wall" habit by having devs attend triage and retros with QA present.',
    code: `Dev + QA agile habits:
QA in refinement for complex stories
Preview deploy per PR
Shared DoD: tests + exploratory notes`,
  },
  {
    id: 59,
    category: 'Agile Practices',
    question: 'How do you align a frontend team with backend and design in a scaled agile environment?',
    answer: 'Participate in cross-team ceremonies that matter — PI planning, scrum of scrums, or weekly triad syncs with design and backend leads — with clear agendas and dependency tracking. Publish frontend roadmap themes and API contract timelines so other teams can plan against them. Use shared Slack channels and RFC docs for decisions that span teams instead of surprise changes mid-sprint. For example, a monthly design-engineering sync reviews upcoming flows and token changes before sprint commitment. In a real app org at scale, the senior engineer represents frontend capacity and risks in program-level planning honestly.',
    code: `Cross-team sync agenda:
Upcoming dependencies (both directions)
Contract / design changes next 2 sprints
Blocked items + owners`,
  },
  {
    id: 60,
    category: 'Agile Practices',
    question: 'You join a team new to agile. What do you implement first versus later?',
    answer: 'Start with visibility and rhythm — backlog, board, two-week sprint, standup, review, retro — before advanced metrics or SAFe layers. Add Definition of Ready and Done early to reduce thrash; introduce velocity tracking only after three sprints of stable process. Avoid importing every tool and ceremony at once, which overwhelms people who are still learning git flow. For example, month one focuses on board hygiene and retros with one action item; month two adds refinement and CI gates. In a real app team, the senior engineer meets the team where they are and improves one pain point at a time based on retro data.',
    code: `Agile adoption order:
1. Backlog + board + sprint cadence
2. DoR / DoD + basic CI
3. Refinement habit
4. Metrics (cycle time, quality) after baseline`,
  },
]
