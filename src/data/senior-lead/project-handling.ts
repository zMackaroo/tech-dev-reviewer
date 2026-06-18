import type { InterviewQuestion } from '../../types'

export const projectHandlingQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Project Handling',
    question: 'A critical feature is behind schedule two weeks before a hard launch date. How do you respond as the senior engineer?',
    answer: 'Start by clarifying what is truly required for launch versus nice-to-have scope, then re-estimate remaining work with the team using concrete tasks rather than gut feel. Communicate early to product and stakeholders with options: cut scope, add resources, or shift the date — never silently absorb the slip. Protect quality on must-ship paths while deferring non-critical polish to a fast follow release. For example, you might propose shipping checkout without saved addresses if that saves four days and document the tradeoff in writing. In a real app launch, the senior engineer owns the technical risk assessment and ensures the team is not burning out on work that will not ship.',
    code: `Response framework:
1. Triage scope — must-have vs deferrable
2. Re-estimate with the team (hours, not vibes)
3. Present options to stakeholders with tradeoffs
4. Lock a plan and protect the team from scope creep`,
  },
  {
    id: 2,
    category: 'Project Handling',
    question: 'Product wants to add a major new feature mid-sprint. What do you do?',
    answer: 'Treat it as a change request, not an informal addition — assess impact on current sprint commitments before agreeing to anything. Explain what would need to come out of the sprint or whether the new work belongs in backlog grooming for the next cycle. If it is truly urgent, facilitate a conversation with the product owner to swap equivalent scope rather than stacking work. This matters because uncontrolled mid-sprint inserts destroy predictability and erode team trust. For example, a "quick analytics widget" might touch routing, auth, and API contracts and should not land without replanning. In a real app team, the senior engineer helps product understand cost in engineering terms, not just calendar days.',
    code: `Questions to ask:
• Is this blocking revenue or compliance?
• What sprint work gets deprioritized?
• Do we have design, API, and QA capacity?
• Can we spike first before committing?`,
  },
  {
    id: 3,
    category: 'Project Handling',
    question: 'Two teams depend on your frontend work, but priorities conflict. How do you handle it?',
    answer: 'Make the conflict visible by mapping dependencies, deadlines, and blast radius rather than trying to satisfy both teams privately. Escalate to product or engineering leadership with a clear recommendation based on business impact, not personal preference. Where possible, deliver thin vertical slices that unblock both sides incrementally instead of finishing one monolith first. This matters because hidden priority juggling leads to missed commitments on all sides. For example, if Team A needs a shared component library update and Team B needs a checkout fix, you might ship the checkout hotfix first and schedule the library migration with a communicated date. In a real app org, the senior engineer documents dependencies in a shared tracker so conflicts are resolved in the open.',
    code: `Priority matrix:
Impact (high/low) × Urgency (now/later)
→ Share matrix with leads, agree in writing`,
  },
  {
    id: 4,
    category: 'Project Handling',
    question: 'Legacy code is blocking a rewrite. How do you approach the migration without stopping feature work?',
    answer: 'Use the strangler fig pattern — wrap or route around legacy modules incrementally instead of a big-bang rewrite that freezes the product for months. Define clear boundaries: which routes or features migrate first, what "done" means for each slice, and how you will measure regression risk. Allocate a sustainable percentage of sprint capacity to migration rather than pausing all product work. For example, new pages use the App Router and design system while old pages stay on legacy layout until their turn in the queue. In a real app, the senior engineer sets migration standards, creates codemods or scaffolding, and prevents new code from deepening legacy debt.',
    code: `Migration slices:
• Route-by-route or feature-by-feature
• Shared adapter layer during transition
• Feature flags for rollback
• Definition of done per slice`,
  },
  {
    id: 5,
    category: 'Project Handling',
    question: 'Stakeholders keep changing requirements after sign-off. How do you regain control?',
    answer: 'Re-establish a lightweight change-control process: what was agreed, what changed, and what the new cost is in time or scope. Use written summaries after refinement sessions and link tickets to accepted designs so "sign-off" is traceable. Push back constructively by showing the cumulative cost of churn, not by saying no without alternatives. This matters because requirement thrashing is a leading cause of missed deadlines and team frustration. For example, after a third dashboard layout change, you propose a design review gate before engineering starts and charge subsequent changes to the next sprint. In a real app project, the senior engineer partners with design and PM to freeze acceptance criteria before implementation begins.',
    code: `Change log template:
Date | Requester | Change | Impact (days) | Accepted?`,
  },
  {
    id: 6,
    category: 'Project Handling',
    question: 'You discover a security issue in production code your team shipped. What are your immediate steps?',
    answer: 'Assess severity and exploitability first, then notify the right people — security, platform, and leadership — through the established incident channel rather than fixing silently in a side PR. Contain the issue with the smallest safe change (feature flag off, hotfix, WAF rule) while a proper patch is reviewed and tested. Document timeline, root cause, and customer impact for a post-incident review. This matters because senior engineers are accountable for production outcomes, not just merged PRs. For example, an exposed API key in client bundle might require rotation, cache invalidation, and a same-day patch with coordinated communication. In a real app, you also add a guardrail test or lint rule so the class of bug cannot recur.',
    code: `Incident steps:
1. Triage severity (SEV1–SEV4)
2. Contain → fix → verify
3. Communicate status updates
4. Blameless postmortem + preventive action`,
  },
  {
    id: 7,
    category: 'Project Handling',
    question: 'How do you estimate a large frontend initiative you have never built before?',
    answer: 'Break the work into discoverable spikes, known implementation tasks, and explicit unknowns rather than giving a single number from intuition. Time-box spikes to answer the highest-risk questions — API shape, third-party SDK fit, performance on target devices — before committing to a delivery date. Present estimates as ranges with assumptions listed so stakeholders understand what could move the date. This matters because senior engineers are judged on forecast accuracy and risk transparency, not optimism. For example, a "real-time collaboration" feature might need a two-day spike on WebSocket scaling before you estimate the full build. In a real app, you compare the estimate to similar past projects and include buffer for code review, QA, and rollout.',
    code: `Estimate breakdown:
Spikes (unknowns) + Build tasks + Integration + QA + Rollout
Document assumptions; revise after spike`,
  },
  {
    id: 8,
    category: 'Project Handling',
    question: 'A project has no clear owner and work is stalling. How do you step in as a senior engineer?',
    answer: 'Clarify the outcome, identify the decision-makers, and propose a lightweight RACI so everyone knows who decides, who builds, and who must be consulted. Create a short execution plan with milestones and assign or request owners for each workstream — frontend, backend, design, QA. Run a kickoff sync to align on timeline and unblock access, environments, and specs. This matters because senior engineers often lead through influence without formal authority. For example, a cross-team notification feature might stall until you schedule a weekly sync and publish a shared doc with open questions and due dates. In a real app org, you escalate only after making the gap visible and offering a concrete plan.',
    code: `RACI quick pass:
R = Responsible (does the work)
A = Accountable (single decision maker)
C = Consulted | I = Informed`,
  },
  {
    id: 9,
    category: 'Project Handling',
    question: 'Technical debt is slowing every feature. How do you make the case to leadership for paying it down?',
    answer: 'Translate debt into business metrics leadership already cares about — lead time, incident rate, onboarding time for new engineers, and velocity trend — not abstract "we need a refactor." Propose a bounded investment with measurable outcomes, such as reducing build time by 40% or cutting checkout bug rate in half after migrating off legacy state. Pair debt work with feature delivery using the strangler approach so the team is not "off product" for a quarter. For example, you might show that 30% of sprint capacity goes to bug fixes touching the same legacy module. In a real app, the senior engineer maintains a debt register ranked by impact and reviews it quarterly with product.',
    code: `Debt pitch:
Problem (metric) → Cost today → Proposed fix
→ Expected improvement → Time/capacity needed`,
  },
  {
    id: 10,
    category: 'Project Handling',
    question: 'How do you handle a project where design and engineering disagree on feasibility?',
    answer: 'Bring the conversation to facts — prototype, performance budget, accessibility requirements, and platform constraints — instead of debating opinions in abstract terms. Offer alternatives that preserve the user intent when the original design is costly or risky, such as a phased interaction or a simpler pattern from the design system. Document the agreed approach and any deferred enhancements so design does not feel overruled and engineering does not feel surprised later. For example, a complex parallax hero might become a static hero for v1 with motion added after Core Web Vitals are validated. In a real app, the senior engineer joins design critiques early to catch feasibility issues before pixels are finalized.',
    code: `Feasibility discussion:
• User goal (what problem are we solving?)
• Constraints (perf, a11y, timeline, platforms)
• Options with cost/ benefit
• Agreed v1 vs future enhancement`,
  },
]
