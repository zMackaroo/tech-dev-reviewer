import type { InterviewQuestion } from '../../types'

export const cicdPipelinesQuestions: InterviewQuestion[] = [
  {
    id: 51,
    category: 'CI/CD Pipelines',
    question: 'What is CI/CD and how do continuous integration and continuous deployment differ?',
    answer: 'Continuous Integration (CI) automatically builds and tests every code change merged or proposed to the main codebase, catching defects early. Continuous Delivery extends CI by keeping the application always in a deployable state, with manual approval before production release. Continuous Deployment goes further by automatically releasing every passing change to production without human gates. CI is the foundation—without reliable automated tests, delivery and deployment pipelines just ship bugs faster. Most teams start with CI, add delivery to staging, and adopt full CD when confidence in tests and observability is high.',
    code: `# Pipeline stages (conceptual)
# CI:        lint → test → build
# CDelivery: CI + deploy to staging (manual promote to prod)
# CDeploy:   CI + auto deploy to production on main merge`,
  },
  {
    id: 52,
    category: 'CI/CD Pipelines',
    question: 'How do you structure a basic GitHub Actions workflow YAML file?',
    answer: 'A workflow file lives in .github/workflows/ and defines name, on triggers, permissions, and one or more jobs. Each job runs on a runs-on runner and contains steps using uses (actions) or run (shell commands). Jobs can depend on each other with needs: for ordering and share data via artifacts or cache. Environment variables and secrets are scoped at workflow, job, or step level. Keeping workflows readable with named jobs and comments helps onboarding when pipelines grow complex.',
    code: `name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run lint

  test:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test`,
  },
  {
    id: 53,
    category: 'CI/CD Pipelines',
    question: 'What are pipeline stages and why order jobs into stages?',
    answer: 'Stages group jobs that run sequentially while jobs within the same stage run in parallel, optimizing total pipeline duration. A typical order is fast feedback first (lint, typecheck), then unit tests, integration tests, build, and finally deploy. Failing early in cheap stages avoids wasting runner minutes on expensive downstream jobs. GitLab formalizes stages explicitly; GitHub Actions uses needs: dependencies to achieve the same graph. Clear staging makes it obvious which gate blocked a release.',
    code: `# GitLab explicit stages
stages:
  - validate   # lint, typecheck (parallel)
  - test       # unit, integration (parallel)
  - build      # compile artifacts
  - deploy     # staging → production

lint:
  stage: validate
  script: npm run lint

typecheck:
  stage: validate
  script: npm run typecheck`,
  },
  {
    id: 54,
    category: 'CI/CD Pipelines',
    question: 'What are build artifacts and how do you pass them between CI jobs?',
    answer: 'Build artifacts are files produced by one job—compiled binaries, bundled JS, Docker images, or test reports—consumed by later jobs or stored for download. GitHub Actions uses actions/upload-artifact and download-artifact; GitLab defines artifacts: on jobs with expiration. Artifacts avoid rebuilding the same output in every downstream job, saving time and ensuring consistency. Production deploy jobs should deploy the exact artifact tested in CI, not rebuild from source at deploy time. Set retention policies so storage costs stay manageable.',
    code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - run: ./deploy.sh dist/`,
  },
  {
    id: 55,
    category: 'CI/CD Pipelines',
    question: 'How do environment variables work in CI pipelines?',
    answer: 'Environment variables configure jobs without hardcoding values—Node version, API URLs, feature flags, or log levels. Workflows define them at workflow, job, or step level using env: key-value pairs. CI platforms also inject predefined variables like GITHUB_SHA, CI_COMMIT_SHA, or branch names for conditional logic. Non-sensitive defaults can live in YAML; sensitive values must use secrets instead of plain env vars. Document required variables in README so local development mirrors CI behavior.',
    code: `env:
  NODE_ENV: test
  API_BASE_URL: https://staging-api.example.com

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      COVERAGE_THRESHOLD: 80
    steps:
      - run: echo "Testing commit \${{ github.sha }}"
      - run: npm test`,
  },
  {
    id: 56,
    category: 'CI/CD Pipelines',
    question: 'How should secrets be managed in CI/CD pipelines?',
    answer: 'Secrets are encrypted at rest and masked in logs when referenced via platform-specific syntax like ${{ secrets.API_KEY }}. Never echo secrets, encode them in artifacts, or pass them to untrusted fork PR workflows without approval gates. Rotate secrets regularly and scope them to environments so staging credentials cannot deploy to production. Use OIDC federation to cloud providers instead of long-lived cloud access keys when possible. Audit secret access through platform logs and limit who can edit repository secrets.',
    code: `# GitHub Actions — secrets and OIDC
permissions:
  id-token: write
  contents: read

steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789:role/GitHubDeployRole
      aws-region: us-east-1

  - run: npm run deploy
    env:
      DATABASE_URL: \${{ secrets.DATABASE_URL }}`,
  },
  {
    id: 57,
    category: 'CI/CD Pipelines',
    question: 'What is a matrix build and when should you use one?',
    answer: 'A matrix strategy runs the same job across multiple combinations of variables—OS, language version, or dependency versions—in parallel. It ensures your code works on Ubuntu, macOS, and Windows or on Node 18 and 20 without writing duplicate job definitions. Matrix builds increase runner usage, so use them where platform variance actually matters. fail-fast: false lets you see all failing combinations instead of stopping at the first. Exclude or include specific combos to skip redundant cells.',
    code: `jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm ci && npm test`,
  },
  {
    id: 58,
    category: 'CI/CD Pipelines',
    question: 'How does caching work in CI and what should you cache?',
    answer: 'CI caching stores dependencies or compiled outputs between runs so jobs skip re-downloading unchanged layers. Cache node_modules, npm/pnpm store, Maven .m2, or Docker layers keyed on lockfile hashes so cache invalidates when dependencies change. Poor cache keys cause stale dependency bugs; good keys include lockfile checksums. GitHub Actions provides actions/cache; GitLab uses cache: keywords in jobs. Caching does not replace reproducible builds—it accelerates them when inputs are unchanged.',
    code: `- uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-

- run: npm ci
- run: npm test`,
  },
  {
    id: 59,
    category: 'CI/CD Pipelines',
    question: 'What is the difference between npm ci and npm install in CI?',
    answer: 'npm ci installs exactly what package-lock.json specifies, deleting node_modules first for a clean, reproducible install. npm install may update the lockfile and resolve newer semver-compatible versions, making CI non-deterministic. Always commit lockfiles and use npm ci in pipelines so local and CI installs match. ci fails if package.json and lockfile are out of sync, catching a common mistake before tests run. The same principle applies to yarn install --frozen-lockfile and pnpm install --frozen-lockfile.',
    code: `# CI install step (preferred)
npm ci

# Local development (may update lockfile)
npm install some-new-package

# Equivalent strict installs
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile`,
  },
  {
    id: 60,
    category: 'CI/CD Pipelines',
    question: 'How do you run lint and typecheck as separate CI jobs?',
    answer: 'Splitting lint and typecheck into parallel jobs gives faster feedback than one sequential script because both start immediately after checkout. Each job runs npm ci (or shares cache) independently, which trades some install duplication for wall-clock speed. Name jobs clearly (ci / lint, ci / typecheck) so branch protection maps to the right required checks. Fail the pipeline on any warning policy only if the team enforces zero-warning lint rules. Keeping lint fast encourages developers to run it locally before pushing.',
    code: `jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run typecheck`,
  },
  {
    id: 61,
    category: 'CI/CD Pipelines',
    question: 'What are integration tests in CI and how do they differ from unit tests?',
    answer: 'Unit tests verify isolated functions or components with mocked dependencies, running quickly in milliseconds. Integration tests exercise real interactions—API endpoints hitting a test database, message queues, or external sandboxes—and run slower but catch wiring bugs unit tests miss. CI typically runs unit tests on every PR and integration tests on main or nightly schedules if they are expensive. Use service containers (PostgreSQL, Redis) in GitHub Actions or GitLab services: to spin up dependencies. Flaky integration tests erode trust, so invest in stable test data and timeouts.',
    code: `jobs:
  integration:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
    env:
      DATABASE_URL: postgres://postgres:test@localhost:5432/test
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration`,
  },
  {
    id: 62,
    category: 'CI/CD Pipelines',
    question: 'How do you conditionally run CI jobs based on branch or file paths?',
    answer: 'Conditional execution skips irrelevant jobs—deploy only on main, E2E only when frontend files change—saving runner minutes and speeding feedback. GitHub Actions uses if: expressions with github.ref, github.event_name, or paths-filter outputs. GitLab uses rules: with changes: paths or if: variables. Path filters prevent running mobile CI when only backend README changed. Document conditions clearly so developers understand why a job was skipped on their PR.',
    code: `jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh

  frontend-e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            frontend:
              - 'src/components/**'
      - if: steps.filter.outputs.frontend == 'true'
        run: npm run test:e2e`,
  },
  {
    id: 63,
    category: 'CI/CD Pipelines',
    question: 'What is a Docker-based CI job and why containerize builds?',
    answer: 'Docker-based CI runs jobs inside containers with pinned tool versions, ensuring identical environments locally and in the pipeline. The job specifies an image (node:20-alpine) or a custom Dockerfile with all dependencies preinstalled. Containerization eliminates "works on my machine" drift from different OS packages or Node versions. Multi-stage Dockerfiles separate build and runtime layers for smaller production images. CI builds and pushes images to a registry, then deploy systems pull by digest for immutable releases.',
    code: `# Job using official Node image
jobs:
  test:
    runs-on: ubuntu-latest
    container: node:20-bookworm
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

# Build and push image
- run: |
    docker build -t myapp:\${{ github.sha }} .
    docker push myapp:\${{ github.sha }}`,
  },
  {
    id: 64,
    category: 'CI/CD Pipelines',
    question: 'How do you handle flaky tests in CI pipelines?',
    answer: 'Flaky tests pass or fail non-deterministically, causing false red builds and training teams to retry without investigating. First identify flakiness with test quarantine, retry analytics, or tracking failure rates per test over time. Fix root causes—race conditions, timing assumptions, shared mutable state, or external service dependencies. Temporary retries (retry: 2 in Jest or flaky test markers) are a band-aid, not a solution. Remove or quarantine persistently flaky tests from required checks until fixed, or they will undermine CI credibility.',
    code: `# Jest — detect open handles and set timeouts
// jest.config.js
module.exports = {
  testTimeout: 10000,
  detectOpenHandles: true,
};

# Mark and track flaky tests separately
# quarantine/flaky-auth.spec.ts — excluded from required CI
# Fix race: await expect(page).toHaveURL(...) not sleep(3000)`,
  },
  {
    id: 65,
    category: 'CI/CD Pipelines',
    question: 'What is pipeline as code and why store CI config in the repository?',
    answer: 'Pipeline as code means CI/CD definitions live in version-controlled files alongside application source, not in a UI-only configuration. Changes to the pipeline go through pull request review, branch protection, and audit history like any other code. Teams can diff pipeline changes across releases to understand when a new check was added. Reusable templates share organization standards without copy-paste drift. Storing config in git also enables local linting of YAML and disaster recovery if the CI vendor has an outage.',
    code: `# All pipeline logic in repo — reviewable diffs
# .github/workflows/ci.yml
# .gitlab-ci.yml
# bitbucket-pipelines.yml

# PR that adds security scan:
# +  security:
# +    runs-on: ubuntu-latest
# +    steps:
# +      - run: npm audit --audit-level=high`,
  },
  {
    id: 66,
    category: 'CI/CD Pipelines',
    question: 'How do you publish test coverage reports from CI?',
    answer: 'Coverage tools like Istanbul (nyc), Jest coverage, or coverage.py measure which lines tests execute and output reports in lcov or cobertura format. CI uploads reports to services like Codecov or Coveralls for trend graphs and PR diff comments showing uncovered lines. Failing CI when coverage drops below a threshold prevents untested code from merging silently. Upload coverage only after tests pass to avoid misleading metrics. Coverage percentage is a heuristic—100% coverage does not guarantee correctness.',
    code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true`,
  },
  {
    id: 67,
    category: 'CI/CD Pipelines',
    question: 'What are concurrency groups in GitHub Actions and why use them?',
    answer: 'Concurrency groups control how many workflow runs execute simultaneously for the same resource, canceling or queueing redundant runs. A common pattern is cancel-in-progress: true on pull request workflows so only the latest commit\'s CI runs when you push rapidly. Deploy workflows use concurrency groups named per environment to prevent simultaneous production deploys colliding. Without concurrency control, stale commits might deploy after newer ones or waste runners on outdated PR pushes. Group keys often include workflow name and branch or PR number.',
    code: `on:
  pull_request:

concurrency:
  group: ci-\${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test`,
  },
  {
    id: 68,
    category: 'CI/CD Pipelines',
    question: 'How do you implement a manual approval gate before production deploy?',
    answer: 'Manual approval gates pause the pipeline until an authorized person approves deployment to sensitive environments. GitHub Actions uses environment protection rules with required reviewers; GitLab uses manual when: on deploy jobs or protected environments. Approvers receive notifications and the deployment audit log records who approved and when. Gates balance speed with safety for production while keeping staging fully automated. Pair manual gates with smoke tests post-deploy so approval means both human judgment and automated verification.',
    code: `jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment:
      name: production   # requires reviewer approval in GitHub settings
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy:prod

# GitLab manual job
# deploy_prod:
#   when: manual
#   script: ./deploy.sh production`,
  },
]
