import type { InterviewQuestion } from '../../types'

export const githubGitlabQuestions: InterviewQuestion[] = [
  {
    id: 36,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are GitHub Actions and how do they differ from traditional CI servers?',
    answer: 'GitHub Actions is a CI/CD platform built into GitHub that runs workflows defined in YAML files stored in the repository. Workflows trigger on events like push, pull_request, or schedule and execute jobs on GitHub-hosted or self-hosted runners. Unlike standalone Jenkins servers, Actions requires no separate infrastructure for basic use and integrates directly with PR checks and branch protection. Reusable actions from the marketplace compose common steps like checkout, setup-node, and deploy. Teams colocate pipeline code with application code so changes to CI go through the same review process.',
    code: `# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm test`,
  },
  {
    id: 37,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'How does GitLab CI/CD work with .gitlab-ci.yml?',
    answer: 'GitLab CI/CD reads pipeline configuration from a .gitlab-ci.yml file at the repository root, defining stages, jobs, scripts, and artifacts. GitLab Runners execute jobs—either shared SaaS runners or self-hosted agents registered to your GitLab instance. Pipelines progress through stages sequentially (build, test, deploy) while jobs within a stage run in parallel. GitLab includes built-in container registry, environments, and deployment tracking without third-party plugins. Include directives let teams split large configs into reusable templates across projects.',
    code: `# .gitlab-ci.yml
stages:
  - test
  - deploy

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test

deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  only:
    - main`,
  },
  {
    id: 38,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are pull requests on GitHub and merge requests on GitLab?',
    answer: 'Pull requests (GitHub) and merge requests (GitLab) are the same concept: a request to merge one branch into another with a review and CI gate. They display the diff, conversation, linked issues, and pipeline status in one view. Reviewers leave inline comments on specific lines and approve or block merging based on policy. Draft or WIP MRs signal work in progress without triggering full review. Both platforms support auto-merge when checks pass and squash or rebase merge strategies.',
    code: `# GitHub CLI: create and view a PR
gh pr create --title "feat: add dark mode" --body "Closes #55"
gh pr checks
gh pr merge --squash

# GitLab CLI (glab)
glab mr create --title "feat: add dark mode"
glab mr merge 42 --squash`,
  },
  {
    id: 39,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are protected branches and why configure them?',
    answer: 'Protected branches enforce rules on important branches like main or release/* before changes can land. Rules can require pull requests, minimum approving reviews, passing status checks, and signed commits. Force pushes and deletions are typically disabled to prevent accidental history rewrites. Administrators can optionally be included or excluded from restrictions. Protected branches are the primary mechanism preventing direct pushes that bypass CI and review. Without them, one git push --force can break production for the entire team.',
    code: `# GitHub: Settings → Branches → Branch protection rules
# Pattern: main
# ✓ Require a pull request before merging
# ✓ Require status checks to pass
# ✓ Require branches to be up to date
# ✓ Do not allow bypassing the above settings

# GitLab: Settings → Repository → Protected branches
# Allowed to merge: Maintainers
# Allowed to push: No one`,
  },
  {
    id: 40,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What is a CODEOWNERS file and how does it automate review assignment?',
    answer: 'CODEOWNERS maps file paths or directories to individuals or teams who are automatically requested as reviewers when those paths change in a pull request. It ensures domain experts review changes to critical areas like infrastructure, auth, or payment code. On GitHub the file lives in .github/CODEOWNERS; GitLab uses CODEOWNERS at the repo root with similar syntax. Combined with branch protection requiring owner approval, CODEOWNERS prevents unauthorized changes to sensitive modules. Patterns use glob syntax and later rules override earlier ones.',
    code: `# .github/CODEOWNERS
*                     @acme/engineering
/docs/                @acme/tech-writers
/infra/               @acme/platform-team
/packages/payments/   @acme/payments-team @acme/security`,
  },
  {
    id: 41,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'How does issue tracking integrate with Git branches and CI on GitHub/GitLab?',
    answer: 'Issues track bugs, features, and tasks with labels, milestones, assignees, and cross-links to pull requests. Magic words like Closes #42 or Fixes #42 automatically close linked issues when the PR merges. Branch names often include issue numbers (feature/42-dark-mode) for traceability. CI can reference issue context in bot comments when checks fail. GitLab and GitHub both support issue boards for kanban-style sprint planning. Linking every PR to an issue creates an auditable trail from requirement to deployment.',
    code: `# Commit message linking
git commit -m "fix: prevent double submit on checkout

Fixes #842"

# PR description
Closes #842
Related to #800

# GitHub project board auto-moves issue when PR merges`,
  },
  {
    id: 42,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are GitHub Actions reusable workflows and composite actions?',
    answer: 'Reusable workflows are entire workflow files callable from other repositories or workflows via workflow_call, promoting DRY CI configuration across an organization. Composite actions bundle multiple steps into a single action referenced with uses:, ideal for repeated setup sequences. Both reduce duplication when dozens of repos need identical lint, test, and publish steps. Reusable workflows accept inputs and secrets from the caller. Centralizing CI logic in a platform repo means updating Node version once propagates everywhere.',
    code: `# .github/workflows/reusable-test.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
      - run: npm ci && npm test`,
  },
  {
    id: 43,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What is Bitbucket Pipelines and how does it compare to GitHub Actions?',
    answer: 'Bitbucket Pipelines is Atlassian\'s built-in CI/CD for Bitbucket Cloud and Data Center, configured via bitbucket-pipelines.yml in the repository root. It uses Docker images for each step and integrates tightly with Jira for issue and deployment visibility. Compared to GitHub Actions, Pipelines is the natural choice when the team already uses Bitbucket and Jira in the Atlassian suite. Syntax differs but concepts—triggers, steps, caches, and artifacts—map closely. Self-hosted runners are available for Bitbucket Pipelines as well.',
    code: `# bitbucket-pipelines.yml
image: node:20

pipelines:
  default:
    - step:
        name: Test
        caches:
          - node
        script:
          - npm ci
          - npm test

  branches:
    main:
      - step:
          name: Deploy
          script:
            - npm run deploy`,
  },
  {
    id: 44,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are GitHub Environments and deployment protection rules?',
    answer: 'GitHub Environments represent deployment targets like staging or production with optional protection rules and secrets scoped to that environment. Protection rules can require specific reviewers to approve before a deployment job runs, impose wait timers, or restrict deployment branches to main only. Environment secrets are only exposed to jobs targeting that environment, reducing blast radius if a workflow is compromised. Deployment history shows who deployed what commit and when. This replaces ad-hoc manual approval processes in chat with auditable gates in CI.',
    code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.example.com
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:production
        env:
          DEPLOY_TOKEN: \${{ secrets.PRODUCTION_DEPLOY_TOKEN }}`,
  },
  {
    id: 45,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'How do GitLab merge request pipelines differ from branch pipelines?',
    answer: 'Merge request (MR) pipelines run on the merged result preview (source branch merged into target) when you open or update an MR, catching integration issues before merge. Branch pipelines run on direct pushes to a branch without an MR context. GitLab recommends MR pipelines for validation because they test what main will look like after merge, not just the feature branch in isolation. Rules like rules: or only: / except: control which pipeline type runs. MR pipelines also show status directly on the merge request widget.',
    code: `# .gitlab-ci.yml — MR-only test job
test:
  script:
    - npm ci && npm test
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"

deploy:
  script:
    - ./deploy.sh
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"`,
  },
  {
    id: 46,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are required status checks on pull requests?',
    answer: 'Required status checks are CI jobs that must pass before a pull request can merge into a protected branch. They appear as green or red indicators on the PR and block the merge button until all required checks succeed. Branch protection settings let admins select which checks are mandatory, such as lint, unit tests, and security scans. Requiring branches to be up to date ensures checks ran on the latest combined code. Missing or flaky required checks are a common reason teams lose trust in CI gates.',
    code: `# GitHub branch protection (conceptual)
# Required status checks:
#   - ci / lint
#   - ci / unit-tests
#   - ci / typecheck
# ✓ Require branches to be up to date before merging

# Workflow job names must match required check names
jobs:
  unit-tests:
    name: ci / unit-tests
    runs-on: ubuntu-latest`,
  },
  {
    id: 47,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What is Dependabot or Renovate and how does it fit into platform workflows?',
    answer: 'Dependabot (native on GitHub) and Renovate (self-hosted or GitHub App) automatically open pull requests when dependencies have newer versions. They scan package.json, Dockerfile, GitHub Actions versions, and other manifest files on a schedule. Each update PR runs CI to verify compatibility before a human merges. Grouping rules batch minor and patch updates to reduce PR noise. Keeping dependencies current reduces security vulnerabilities and prevents painful big-bang upgrades. Teams configure auto-merge for patch updates that pass CI without manual review.',
    code: `# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      dev-dependencies:
        patterns:
          - eslint*
          - "@types/*"`,
  },
  {
    id: 48,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'How do GitHub/GitLab handle secrets and why never commit them?',
    answer: 'Secrets are encrypted variables stored in repository or organization settings and injected into CI jobs at runtime—they never appear in logs if masking works correctly. Committing API keys or tokens to git exposes them in history forever, even after deletion, because clones retain old commits. Both platforms offer secret scanning to detect leaked credentials and alert or revoke them. Use environment-scoped secrets so production keys are unavailable in PR workflows from forks. Rotate any secret that was ever committed, regardless of how quickly you removed it.',
    code: `# GitHub Actions — reference a repository secret
- run: deploy.sh
  env:
    API_KEY: \${{ secrets.API_KEY }}

# NEVER do this:
# API_KEY=sk-live-abc123  ← in .env committed to git

# Use git-secrets or pre-commit hooks to block commits`,
  },
  {
    id: 49,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What are GitHub Releases and GitLab Releases for versioning artifacts?',
    answer: 'Releases attach human-readable release notes and binary assets to a git tag, marking a version customers or deploy systems can reference. GitHub Releases can auto-generate notes from merged PRs; GitLab Releases link to CI job artifacts and milestones. Release assets might include compiled binaries, Docker images, or changelog PDFs beyond what git tags alone provide. CI pipelines often trigger on tag push to build and attach artifacts automatically. Semantic version tags (v1.2.3) paired with releases create a clear contract for downstream consumers.',
    code: `# Trigger release workflow on tag push
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - uses: softprops/action-gh-release@v2
        with:
          files: dist/app.zip`,
  },
  {
    id: 50,
    category: 'GitHub / GitLab / Bitbucket',
    question: 'What is the difference between GitHub-hosted and self-hosted runners?',
    answer: 'GitHub-hosted runners are virtual machines managed by GitHub with preinstalled tools, billed by minute and isolated per job. Self-hosted runners are machines you register in your network, useful for accessing private resources, specialized hardware, or avoiding cloud egress costs. Self-hosted runners carry security responsibility—you must patch them, isolate jobs, and prevent untrusted fork PRs from executing arbitrary code on your network. GitLab Runners follow the same model with shared, group, or project-level registration. Choose self-hosted when compliance requires data never leaves your VPC.',
    code: `# Self-hosted runner labels in workflow
jobs:
  deploy-internal:
    runs-on: [self-hosted, linux, internal-vpc]
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy-to-private-k8s.sh

# GitLab: register runner with tag
# gitlab-runner register --tag-list "docker,aws"`,
  },
]
