import type { InterviewQuestion } from '../../types'

export const teamResourcesQuestions: InterviewQuestion[] = [
  {
    id: 31,
    category: 'Team & Resources',
    question: 'Your team is understaffed for committed work. How do you manage expectations and people?',
    answer: 'Make capacity visible with a honest view of sprint commitments versus available hours, including time lost to meetings, support, and interviews. Renegotiate scope with product using data — what slips, what ships, and what hiring or contractor support would change the timeline. Protect the team from chronic overtime, which destroys quality and retention, while escalating staffing needs early with specific skill gaps listed. For example, you might show that three engineers at 60% feature capacity cannot deliver five epics and propose a ranked cut line. In a real app org, the senior engineer is the voice of sustainable pace in planning meetings.',
    code: `Capacity formula (rough):
Available hrs = headcount × focus factor (0.6–0.7)
Compare to sum of estimated tasks + support buffer`,
  },
  {
    id: 32,
    category: 'Team & Resources',
    question: 'Two senior engineers disagree on technical direction and the team is split. How do you resolve it?',
    answer: 'Facilitate a decision process with clear criteria — user impact, maintenance cost, time to ship, and alignment with existing architecture — rather than letting the loudest voice win. Time-box a spike or proof-of-concept for each approach when evidence is missing, then decide and document in an ADR so dissent is recorded but the team moves forward together. As a senior engineer, you may need to make the call or escalate to an architect or EM with options summarized neutrally. For example, REST versus GraphQL for a new module might be decided after a two-day spike measuring bundle size and cache behavior. In a real app team, disagree-and-commit after documentation prevents re-litigation every sprint.',
    code: `Decision record (ADR):
Context → Options → Decision → Consequences
Team commits to decision for agreed period`,
  },
  {
    id: 33,
    category: 'Team & Resources',
    question: 'How do you allocate work across juniors, mids, and seniors on the same project?',
    answer: 'Match risk and ambiguity to experience — seniors own architecture, cross-team coordination, and production incidents; mids own feature slices end-to-end with review; juniors take bounded tasks with clear acceptance criteria and a dedicated mentor. Avoid giving juniors isolated grunt work only — rotate them through pairing and small vertical stories to build judgment. Seniors should not hoard interesting work; delegating grows the team\'s bus factor. For example, a junior might own a form component with tests while a senior owns the API contract and integration review. In a real app sprint, the senior engineer checks load balance in planning so one person is not the bottleneck for every review.',
    code: `Work allocation:
Senior → design, spikes, incidents, hard integrations
Mid → features E2E with review
Junior → scoped stories + pair time`,
  },
  {
    id: 34,
    category: 'Team & Resources',
    question: 'A high performer is burning out from too many responsibilities. What do you do?',
    answer: 'Have a direct, empathetic conversation to list everything they are carrying — code, on-call, interviews, mentoring, firefighting — and identify what only they can do versus what can redistribute. Work with the manager to temporarily remove or rotate nonessential duties and adjust sprint commitments to reflect realistic capacity. Burnout recovery requires sustained load reduction, not one long weekend. For example, you might rotate on-call away for a month and defer their optional RFC work while they finish one critical project. In a real app team, senior engineers watch for heroes who become single points of failure and proactively spread knowledge.',
    code: `Burnout conversation prompts:
What can we stop doing this sprint?
What must only you do — and who can we train?
What would sustainable look like?`,
  },
  {
    id: 35,
    category: 'Team & Resources',
    question: 'You need to ramp two new frontend hires during an active release cycle. How do you onboard them?',
    answer: 'Prepare a structured onboarding path — repo setup, architecture overview, first good-first-issue, and a buddy for daily questions — without expecting full sprint velocity in week one. Assign low-risk tasks with clear docs and pair on the first PR to model team standards. Shield new hires from production fire drills when possible so they build confidence in the codebase first. For example, week one might be docs, local run, and a small bug fix; week two a feature behind a flag with their buddy as reviewer. In a real app, the senior engineer maintains an onboarding checklist updated after each hire\'s feedback.',
    code: `Onboarding 30-day arc:
Week 1: env, architecture tour, 1 merged small PR
Week 2–3: feature with buddy
Week 4: independent story + demo to team`,
  },
  {
    id: 36,
    category: 'Team & Resources',
    question: 'How do you handle an engineer who consistently misses deadlines without public blame?',
    answer: 'Investigate privately first — unclear requirements, underestimated tasks, blockers they did not escalate, or personal circumstances — with specific examples rather than vague "you are slow" feedback. Adjust support: smaller tasks, clearer AC, daily check-ins, or pairing if skill gap is the issue; involve the manager if performance does not improve after documented support. Protect team morale by not compensating silently for one person\'s slips, which breeds resentment. For example, you might discover they were waiting three days on API access nobody knew about and fix the process. In a real app team, senior engineers escalate early when blockers are organizational, not personal.',
    code: `Private 1:1 structure:
Recent misses (facts) → blockers heard → support plan
→ clear expectations + check-in date`,
  },
  {
    id: 37,
    category: 'Team & Resources',
    question: 'Leadership asks you to estimate headcount needed for next year\'s roadmap. How do you approach it?',
    answer: 'Break the roadmap into epics, apply historical velocity and known overhead (bugs, on-call, meetings), and stress-test with best and worst case staffing scenarios. Include non-feature work — migrations, compliance, platform upgrades — that consumes capacity invisibly if omitted. Present assumptions explicitly so finance and product can challenge inputs rather than the final number alone. For example, you might show that three teams shipping 40 points per sprint cannot deliver 200 points of roadmap without cutting 30% or adding two engineers. In a real app org, the senior engineer collaborates with EM and PM; they do not invent headcount in isolation.',
    code: `Headcount inputs:
Roadmap epics → story points / throughput
+ overhead % + attrition buffer
Scenario: current team vs +1 vs +2 FTE`,
  },
  {
    id: 38,
    category: 'Team & Resources',
    question: 'How do you mentor a junior developer who wants to become senior?',
    answer: 'Share a transparent skills map — technical depth, ownership, communication, mentoring, and delivery — and agree on two or three focus areas for the quarter with measurable goals. Give them stretch assignments with safety nets: lead a small feature, run a retro, or present a tech talk with your review first. Provide regular feedback on PRs and meetings, not just at review time, and sponsor their visibility to leadership when they deliver. For example, they might own a migration slice while you handle stakeholder updates until they are ready to lead the conversation. In a real app career path, senior engineers act as coaches, not gatekeepers.',
    code: `Growth plan example:
Q goal: lead one feature E2E
Practice: review others' PRs, write RFC draft
Feedback: biweekly 30-min career 1:1`,
  },
  {
    id: 39,
    category: 'Team & Resources',
    question: 'Contractors join mid-project. How do you integrate them with full-time engineers?',
    answer: 'Onboard contractors with the same technical standards — PR template, CI, access policies — but clarify decision authority and communication channels on day one. Assign well-scoped work packages with documented interfaces so they are not blocked by tribal knowledge. Include them in standups and Slack channels relevant to their work while respecting IP and security boundaries your company requires. For example, a contractor might own a isolated marketing microsite while core app engineers review integration PRs. In a real app team, the senior engineer prevents a two-tier culture where contractors get only cleanup tasks and no context.',
    code: `Contractor integration:
Day 1: access, buddy, scope doc, Definition of Done
Weekly: sync with FTE lead, same review bar`,
  },
  {
    id: 40,
    category: 'Team & Resources',
    question: 'How do you distribute on-call and production support fairly across the frontend team?',
    answer: 'Rotate on-call on a predictable schedule with clear runbooks, escalation paths, and compensation or time-off policies if your company offers them. Ensure primary responders have access to logs, feature flags, and rollback tools without needing five people to fix a CSS deploy. Use incidents to improve tooling so on-call load decreases over time — alerts with actionable runbooks beat noisy pages. For example, a one-week frontend rotation with backend backup and documented "first 15 minutes" steps keeps support fair. In a real app team, senior engineers champion reducing alert fatigue and never punishing someone for escalating.',
    code: `On-call fairness:
Fixed rotation + handoff notes
Runbooks for top 5 incidents
Post-incident: fix root cause, not hero culture`,
  },
]
