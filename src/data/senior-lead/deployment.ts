import type { InterviewQuestion } from '../../types'

export const deploymentQuestions: InterviewQuestion[] = [
  {
    id: 21,
    category: 'Deployment',
    question: 'A deployment fails during a Friday release. What is your approach as the senior engineer?',
    answer: 'Default to rollback first if user impact is active — restore service before root-cause analysis when customers are affected. Communicate status in the incident channel with clear ownership: who is driving, what is known, and next update time. Schedule the fix and redeploy for when the full team is available unless the issue is truly trivial, avoiding risky Friday evening heroics.',
    code: `Friday deploy rule (team norm):
If SEV ≥ 2 → rollback immediately
Root cause Monday with full team
Exception: documented hotfix path + second reviewer`,
  },
  {
    id: 22,
    category: 'Deployment',
    question: 'How do you plan a zero-downtime deployment for a high-traffic frontend app?',
    answer: 'Use incremental rollout strategies — blue-green, canary, or feature flags — so new code reaches a small percentage of users before full promotion. Ensure static assets are cache-busted and API contracts remain backward compatible during the transition window. Coordinate with backend and CDN teams on cache invalidation and health check endpoints that reflect real user journeys, not just "200 on /".',
    code: `Rollout checklist:
□ Feature flag or canary % configured
□ Asset hashing / cache headers verified
□ Rollback path tested (flag off or redeploy)
□ Dashboards: errors, LCP, conversion`,
  },
  {
    id: 23,
    category: 'Deployment',
    question: 'Staging looks fine but production breaks after deploy. How do you prevent this class of issue?',
    answer: 'Audit environment parity — env vars, feature flags, API endpoints, auth config, and CDN behavior — because staging-prod mismatches cause most "works on staging" incidents. Add smoke tests and synthetic checks that run against production after deploy, not only pre-merge CI. Gradually roll out risky changes and watch real-user monitoring (RUM) metrics, since staging traffic patterns rarely match prod.',
    code: `Parity audit:
Compare staging vs prod env vars (redacted)
Run post-deploy smoke: login, checkout, critical API
Monitor RUM 30–60 min after promote`,
  },
  {
    id: 24,
    category: 'Deployment',
    question: 'How do you coordinate a frontend deploy that depends on a backend migration?',
    answer: 'Define a deployment order and compatibility window — often backend ships backward-compatible API first, then frontend consumes new fields, then backend removes old paths. Use feature flags to decouple deploy timing so frontend and backend do not need simultaneous releases. Document the rollback order too: reverting frontend before backend or vice versa depending on contract changes.',
    code: `Compatible release sequence:
1. Backend: additive API (old clients still work)
2. Frontend: adopt new API behind flag
3. Enable flag → monitor
4. Backend: remove deprecated (later release)`,
  },
  {
    id: 25,
    category: 'Deployment',
    question: 'Product wants to ship daily but QA is overwhelmed. What do you recommend?',
    answer: 'Shift quality left with automated tests, preview environments per PR, and risk-based manual QA focused on high-impact flows rather than full regression every day. Introduce a release train or feature flags so code merges continuously but exposure is controlled. Measure escaped defects and adjust the balance — daily deploys require daily discipline in CI, not zero testing.',
    code: `Daily deploy enablers:
CI: unit + integration + smoke E2E
PR previews for PM/QA spot check
Feature flags for incomplete work
Risk tier decides manual QA depth`,
  },
  {
    id: 26,
    category: 'Deployment',
    question: 'How do you handle a long-running database or CMS content change tied to a frontend release?',
    answer: 'Treat content and code as separate deployables with explicit sync points — code should tolerate old and new content shapes during the transition when possible. Schedule content publishes and code flags together in a runbook with named owners and verification steps. Validate in preview/staging with production-like content snapshots before promote.',
    code: `Content + code runbook:
1. Deploy code (backward compatible)
2. Validate in staging with prod content clone
3. Publish CMS changes
4. Enable feature flag / announce`,
  },
  {
    id: 27,
    category: 'Deployment',
    question: 'You need to hotfix production during an active incident. What is your process?',
    answer: 'Open an incident channel, assign roles (incident commander, comms, fix owner), and branch from the last known good tag or production commit — not from unrelated work on main. Keep the fix minimal, get a second reviewer even if abbreviated, and deploy through the fastest safe path your platform allows. After stability returns, merge the hotfix back to main and write a short postmortem with preventive actions.',
    code: `Hotfix branch:
git checkout -b hotfix/login-500 tags/prod-2024-03-01
→ minimal fix → review → deploy → merge to main`,
  },
  {
    id: 28,
    category: 'Deployment',
    question: 'How do you communicate deployment risk to non-technical stakeholders?',
    answer: 'Translate risk into user impact and business outcomes — downtime minutes, affected user percentage, rollback time — rather than technical jargon about webpack or SSR. Present a go/no-go recommendation with what you will watch after release and when you will declare success or rollback. Use plain language status updates during deploy windows so leadership can respond to support tickets proactively.',
    code: `Stakeholder update template:
Status: in progress / success / rolled back
User impact: who, how many, what symptom
Next step + next update time`,
  },
  {
    id: 29,
    category: 'Deployment',
    question: 'A feature flag is stuck on for 6 months with duplicate code paths. What do you do?',
    answer: 'Treat long-lived flags as debt — schedule flag removal like any other tech task with a named owner and deadline tied to a sprint. Verify metrics show the new path is stable, then remove the old branch, tests for the old path, and the flag configuration in one focused PR. Document flag hygiene norms: every flag has an owner, expiry date, and removal ticket at creation time.',
    code: `Flag lifecycle:
Create → owner + expiry ticket
100% rollout → remove within 2 sprints
Delete flag config + dead code + tests`,
  },
  {
    id: 30,
    category: 'Deployment',
    question: 'How do you onboard a new deployment platform (e.g., moving from Netlify to Vercel)?',
    answer: 'Run a time-boxed spike on a non-critical app or branch to validate build, env vars, edge functions, preview URLs, and rollback before committing the migration. Map parity checklist: redirects, headers, ISR behavior, serverless limits, and secrets management. Migrate one service at a time with DNS or traffic splitting if possible, and keep the old platform rollback-ready for a defined window.',
    code: `Migration phases:
Spike → parity checklist → pilot app
→ migrate traffic → monitor → decommission old`,
  },
]
