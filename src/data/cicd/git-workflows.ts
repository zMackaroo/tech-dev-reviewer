import type { InterviewQuestion } from '../../types'

export const gitWorkflowsQuestions: InterviewQuestion[] = [
  {
    id: 21,
    category: 'Git Workflows',
    question: 'What is Git Flow and what branches does it define?',
    answer: 'Git Flow is a branching model that uses long-lived main and develop branches plus short-lived supporting branches for features, releases, and hotfixes. Feature branches fork from develop and merge back when complete. Release branches stabilize a version before tagging, and hotfix branches patch production directly from main. The model suits scheduled releases with QA cycles but adds overhead for teams shipping continuously. Many organizations simplify Git Flow by eliminating develop and merging features directly to main with feature flags.',
    code: `# Typical Git Flow branch commands
git checkout -b develop
git checkout -b feature/user-settings develop
# ... work, merge feature back to develop
git checkout -b release/1.4.0 develop
git checkout -b hotfix/security-patch main`,
  },
  {
    id: 22,
    category: 'Git Workflows',
    question: 'What is trunk-based development and how does it differ from Git Flow?',
    answer: 'Trunk-based development keeps a single main branch (trunk) as the integration point, with developers merging small changes frequently—often multiple times per day. Feature branches, when used, are short-lived (hours, not weeks) and merged quickly behind feature flags or toggles. Unlike Git Flow, there is no parallel develop branch or long release branches. This approach minimizes merge conflicts and aligns with continuous integration and deployment. Companies like Google and many high-velocity SaaS teams prefer trunk-based flow for faster feedback loops.',
    code: `# Trunk-based: small branch, quick merge
git checkout -b fix/typo-in-header
# make a one-line fix
git push origin fix/typo-in-header
# open PR, review, merge to main within hours

# Feature flag hides incomplete work on main
// if (flags.newDashboard) { ... }`,
  },
  {
    id: 23,
    category: 'Git Workflows',
    question: 'What is a pull request (PR) workflow and why is it standard on teams?',
    answer: 'A pull request workflow requires developers to propose merging their branch through a review interface before code lands on a shared branch. PRs show the diff, linked issues, CI status, and discussion thread so reviewers can approve, request changes, or comment. Required checks and approvals enforce quality gates without blocking local development. PRs also create an audit trail of who reviewed what and when. Even solo developers benefit from PRs as a checkpoint before merging to main.',
    code: `# Typical PR workflow
git checkout -b feature/export-csv
git commit -m "feat: add CSV export for reports"
git push -u origin feature/export-csv

# Open PR on GitHub/GitLab targeting main
# Wait for CI green + reviewer approval
# Merge via squash, merge commit, or rebase (team policy)`,
  },
  {
    id: 24,
    category: 'Git Workflows',
    question: 'What should effective code review focus on in a PR?',
    answer: 'Effective code review prioritizes correctness, security, maintainability, and alignment with team standards over stylistic nitpicks already handled by linters. Reviewers should verify the change solves the stated problem, handles edge cases, includes appropriate tests, and does not introduce unnecessary complexity. Comments should be constructive and specific, suggesting alternatives when requesting changes. Small, focused PRs receive better review than thousand-line dumps. Approving means you would be comfortable maintaining the code if the author left tomorrow.',
    code: `# PR description template (helps reviewers)
## Summary
Add rate limiting to public API endpoints.

## Test plan
- [ ] Unit tests for 429 response
- [ ] Manual test with 100 req/min burst
- [ ] Verified existing clients unaffected

## Related issue
Closes #842`,
  },
  {
    id: 25,
    category: 'Git Workflows',
    question: 'What are common branch naming conventions and why do they matter?',
    answer: 'Branch naming conventions use prefixes like feature/, fix/, hotfix/, chore/, or docs/ followed by a short kebab-case description or ticket number. Consistent names make branch lists scannable and allow automation rules to trigger different CI pipelines. Including a ticket ID (feature/JIRA-123-dark-mode) links branches to project management tools. Avoid vague names like fix-stuff or temp-branch that tell reviewers nothing. Teams document their convention in CONTRIBUTING.md so new members follow the same pattern.',
    code: `# Good branch names
feature/oauth-login
fix/null-pointer-in-checkout
hotfix/ CVE-2024-1234-patch
chore/upgrade-node-20
docs/api-authentication-guide

# Avoid
johns-branch
test
wip`,
  },
  {
    id: 26,
    category: 'Git Workflows',
    question: 'What is squash merge vs merge commit vs rebase merge on a PR?',
    answer: 'Squash merge combines all commits on a feature branch into a single commit on main, keeping history linear and concise. Merge commit preserves every individual commit and adds an explicit merge commit, showing the full branch timeline. Rebase merge replays commits onto main without a merge commit, keeping linear history with multiple commits intact. Squash is popular for noisy WIP commits; merge commit preserves authorship granularity. Teams pick one default in repository settings and document exceptions for release branches.',
    code: `# GitHub merge options (conceptual)
# Squash: 5 feature commits → 1 commit on main
# Merge commit: 5 commits + 1 merge commit on main
# Rebase: 5 commits replayed linearly on main

# Local squash before PR (alternative)
git rebase -i main   # squash/fixup commits interactively`,
  },
  {
    id: 27,
    category: 'Git Workflows',
    question: 'How do you resolve merge conflicts during a rebase on a feature branch?',
    answer: 'During rebase, Git pauses at each commit that conflicts with the updated base branch. You open conflicted files, resolve markers, stage them with git add, and run git rebase --continue to proceed to the next commit. If the conflict is too complex, git rebase --abort returns you to the pre-rebase state. Rebasing frequently onto main reduces the size and number of conflicts. Communicate with teammates if you force-push a rebased branch others are using.',
    code: `git checkout feature/api-v2
git fetch origin
git rebase origin/main

# Fix conflicts in src/routes.ts
git add src/routes.ts
git rebase --continue

# If needed, skip a commit (use sparingly)
# git rebase --skip`,
  },
  {
    id: 28,
    category: 'Git Workflows',
    question: 'What is a fork-and-pull workflow vs a shared repository workflow?',
    answer: 'In a fork-and-pull workflow, external contributors clone their own fork, push branches there, and open pull requests to the upstream repository. Maintainers review and merge without granting write access to strangers. Shared repository workflows give all team members push access to one repo, using branches and PRs internally. Open-source projects almost always use forks to isolate untrusted code until reviewed. Internal teams typically use shared repos with branch protection instead of personal forks.',
    code: `# Fork workflow (contributor)
git clone https://github.com/you/project.git
git remote add upstream https://github.com/org/project.git
git fetch upstream
git checkout -b feature/improve-docs
git push origin feature/improve-docs
# Open PR: your fork → org/project main`,
  },
  {
    id: 29,
    category: 'Git Workflows',
    question: 'What is release branching and when is it appropriate?',
    answer: 'Release branching creates a stabilization branch from main where only bug fixes and documentation changes are allowed while new features continue on main. QA tests the release branch, version numbers are bumped, and the branch is tagged before merging back to main. This suits products with fixed release trains or compliance requirements for frozen builds. Continuous deployment teams often skip release branches and tag main directly. Release branches should be short-lived to avoid diverging far from trunk.',
    code: `git checkout -b release/3.2.0 main
# Only bug fixes cherry-picked or committed here
git cherry-pick fix123

git tag -a v3.2.0 -m "Release 3.2.0"
git checkout main
git merge release/3.2.0
git branch -d release/3.2.0`,
  },
  {
    id: 30,
    category: 'Git Workflows',
    question: 'What is a hotfix workflow for production emergencies?',
    answer: 'A hotfix workflow addresses critical production bugs by branching from the production tag or main, applying a minimal fix, testing quickly, and deploying without waiting for unrelated in-progress features. The fix is merged to main and backported to any active release branches. Hotfix branches should be named clearly (hotfix/payment-timeout) and kept as small as possible. Post-incident, teams write a retrospective and add regression tests. Bypassing normal review is sometimes allowed with a mandatory post-merge review for audit compliance.',
    code: `git checkout -b hotfix/payment-timeout v3.1.0
# minimal fix + test
git commit -m "fix: increase payment gateway timeout to 30s"
git tag v3.1.1
git push origin hotfix/payment-timeout v3.1.1

git checkout main
git merge hotfix/payment-timeout`,
  },
  {
    id: 31,
    category: 'Git Workflows',
    question: 'How does pair programming or mob programming integrate with Git workflows?',
    answer: 'Pair and mob sessions often commit from a shared branch with co-authorship trailers so both contributors receive credit in git log. Some teams rotate the driver who pushes while the navigator reviews each commit message for clarity. Short-lived branches still go through PR review even when two people wrote the code together, ensuring CI runs and a third party can spot issues. Co-authored-by trailers in commit messages integrate with GitHub\'s contribution graph. The workflow discipline remains the same—small commits, clear messages, and protected main.',
    code: `git commit -m "feat: add search filters to dashboard

Co-authored-by: Alex Chen <alex@example.com>
Co-authored-by: Sam Rivera <sam@example.com>"`,
  },
  {
    id: 32,
    category: 'Git Workflows',
    question: 'What is the role of main (or master) branch policies on a team?',
    answer: 'The main branch represents production-ready code and should always be deployable under trunk-based or Git Flow models. Policies typically require pull requests, passing CI, and at least one approval before merging. Direct pushes to main are blocked for most developers via branch protection. Some teams also require linear history or signed commits. Treating main as sacred means rollbacks and hotfixes are predictable because every commit met quality gates. Broken main blocks the entire team, so fixing it becomes everyone\'s top priority.',
    code: `# Branch protection settings (GitHub concept)
# - Require pull request before merging
# - Require status checks: ci/test, ci/lint
# - Require 1 approving review
# - Do not allow force pushes
# - Restrict who can push (release managers only)`,
  },
  {
    id: 33,
    category: 'Git Workflows',
    question: 'How do monorepos affect Git workflow and branching strategy?',
    answer: 'Monorepos store multiple packages or services in one repository, so a single PR may touch frontend, backend, and shared libraries together. Branch naming and CI often scope checks to changed paths so unrelated projects are not rebuilt on every commit. Feature branches must keep main green across all affected packages, which encourages comprehensive CI and path-based test selection. Merge conflicts can span team boundaries, so CODEOWNERS files assign reviewers by directory. Trunk-based development works well in monorepos when changes are small and path-filtered CI is fast.',
    code: `# Path-scoped CI trigger (conceptual)
# on pull_request:
#   paths:
#     - 'packages/web/**'
#     - 'packages/shared/**'

# CODEOWNERS
/packages/web/     @frontend-team
/packages/api/     @backend-team`,
  },
  {
    id: 34,
    category: 'Git Workflows',
    question: 'What is a git worktree and when is it useful in daily workflow?',
    answer: 'Git worktrees let you check out multiple branches simultaneously in separate directories linked to the same repository. Instead of stashing and switching branches, you can run the app on main in one folder while developing a feature in another. Worktrees share the same .git object database, saving disk space compared to multiple clones. They are useful for reviewing a PR while keeping your current work intact, or running a hotfix in parallel with a long feature. Remove worktrees with git worktree remove when finished.',
    code: `# Add a worktree for a hotfix alongside current work
git worktree add ../project-hotfix hotfix/login-bug

# List active worktrees
git worktree list

# Remove when done
git worktree remove ../project-hotfix`,
  },
  {
    id: 35,
    category: 'Git Workflows',
    question: 'How should teams handle long-running feature branches?',
    answer: 'Long-running feature branches diverge from main, accumulate merge conflicts, and delay integration feedback—generally they should be avoided. Prefer incremental delivery with feature flags, splitting work into stacked PRs, or shipping thin vertical slices. If a branch must stay open for weeks, rebase or merge main into it frequently to surface conflicts early. Track progress with draft PRs so reviewers see direction without approving prematurely. When a long branch finally merges, expect a painful review and higher defect rate.',
    code: `# Reduce long-branch risk: merge main weekly
git checkout feature/large-refactor
git fetch origin
git merge origin/main
# resolve conflicts in small chunks

# Better: split into reviewable PRs
# PR1: database schema
# PR2: API endpoints (depends on PR1)
# PR3: UI (depends on PR2)`,
  },
]
