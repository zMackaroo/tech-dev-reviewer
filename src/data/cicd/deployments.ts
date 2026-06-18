import type { InterviewQuestion } from '../../types'

export const deploymentsQuestions: InterviewQuestion[] = [
  {
    id: 69,
    category: 'Cloud Deployments',
    question: 'What is Vercel and how does it deploy frontend applications?',
    answer: 'Vercel is a cloud platform optimized for frontend frameworks like Next.js, React, and static sites, providing zero-config deployments from Git integration. Connecting a GitHub repository triggers automatic builds on every push, with preview URLs for each pull request and production deploys on merge to main. Vercel handles CDN distribution, HTTPS, and serverless functions for API routes without managing servers. Environment variables are configured per environment (Production, Preview, Development) in the dashboard or CLI. It is ideal for Jamstack and SSR apps where fast global delivery matters.',
    code: `# vercel.json — basic configuration
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  }
}

# Deploy from CLI
vercel --prod`,
  },
  {
    id: 70,
    category: 'Cloud Deployments',
    question: 'What are preview deployments and why are they valuable?',
    answer: 'Preview deployments build and host every pull request at a unique URL so designers, PMs, and QA review changes before merge. They mirror production configuration closely while using staging secrets and test data where appropriate. Stakeholders click a link in the PR instead of running code locally, shortening feedback cycles. Preview URLs expire when the PR closes, keeping infrastructure tidy. Combined with E2E tests targeting the preview URL, teams catch UI regressions before production.',
    code: `# GitHub Actions + Vercel preview (conceptual)
# PR opened → Vercel bot comments:
# "Preview: https://myapp-git-feature-abc.vercel.app"

# Run E2E against preview
- run: npm run test:e2e
  env:
    BASE_URL: \${{ steps.vercel.outputs.preview-url }}`,
  },
  {
    id: 71,
    category: 'Cloud Deployments',
    question: 'How do you configure environment variables for different deployment targets?',
    answer: 'Environment-specific variables separate production API keys from staging and local development values without code changes. Platforms like Vercel, Netlify, and GitHub Actions scope variables to Production, Preview/Staging, and Development contexts. Public client-side variables (NEXT_PUBLIC_, VITE_) are embedded in bundles and must never hold secrets. Server-side secrets stay in platform vaults and inject at build or runtime only on the server. Document which variables each environment requires so onboarding and CI setup stay consistent.',
    code: `# .env.local (never committed)
DATABASE_URL=postgres://localhost/dev

# Vercel dashboard / CLI
vercel env add API_SECRET production
vercel env add API_SECRET preview

# Next.js — public vs server-only
# NEXT_PUBLIC_ANALYTICS_ID=G-XXX  ← exposed to browser
# DATABASE_URL=...                ← server only`,
  },
  {
    id: 72,
    category: 'Cloud Deployments',
    question: 'What is static site hosting on AWS S3 with CloudFront?',
    answer: 'Amazon S3 stores built static files (HTML, JS, CSS, images) in a bucket configured for website or origin access. CloudFront sits in front as a CDN, caching assets at edge locations worldwide and terminating HTTPS with ACM certificates. Deploy pipelines upload files to S3 with aws s3 sync and invalidate CloudFront cache so users receive updated content. This pattern is cost-effective for SPAs built with Vite or Create React App. S3 alone serves files; CloudFront adds performance, custom domains, and DDoS protection.',
    code: `# Build and deploy static site to S3 + CloudFront
npm run build

aws s3 sync dist/ s3://my-app-bucket --delete
aws cloudfront create-invalidation \\
  --distribution-id E1234567890 \\
  --paths "/*"`,
  },
  {
    id: 73,
    category: 'Cloud Deployments',
    question: 'What is AWS Lambda and when is it used in deployment architectures?',
    answer: 'AWS Lambda runs code in response to events without provisioning servers, billing per invocation and execution time. It suits API endpoints, webhooks, scheduled jobs, and image processing triggered by S3 uploads. Lambda integrates with API Gateway for HTTP APIs and with CloudFront Lambda@Edge for request manipulation at the edge. Cold starts and execution time limits (up to 15 minutes) affect design choices for long-running tasks. Teams deploy Lambda via CI using SAM, Serverless Framework, or Terraform packaging zip or container images.',
    code: `# Simple Lambda handler (Node.js)
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? 'World';
  return {
    statusCode: 200,
    body: JSON.stringify({ message: \`Hello, \${name}!\` }),
  };
};

# Deploy with AWS SAM
sam build && sam deploy --guided`,
  },
  {
    id: 74,
    category: 'Cloud Deployments',
    question: 'What is Netlify and how does its deploy pipeline work?',
    answer: 'Netlify is a platform for static sites and serverless functions with Git-based continuous deployment similar to Vercel. Pushing to a connected branch triggers a build using commands from netlify.toml or the dashboard, publishing output to Netlify\'s global CDN. Deploy previews generate unique URLs for pull requests, and split testing can route traffic between deploy versions. Netlify Functions run serverless backend code in AWS Lambda under the hood without direct AWS account setup. Forms, redirects, and headers are configured declaratively in netlify.toml.',
    code: `# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200`,
  },
  {
    id: 75,
    category: 'Cloud Deployments',
    question: 'What is Cloudflare Pages and what advantages does it offer?',
    answer: 'Cloudflare Pages deploys static sites and full-stack apps on Cloudflare\'s edge network with unlimited bandwidth on free tiers for personal projects. Git integration builds on push and provides preview URLs for branches and pull requests. Pages Functions add serverless logic at the edge using Workers runtime, close to users globally. Integration with Cloudflare DNS, WAF, and D1 database creates an all-in-one edge stack. Build times and concurrent build limits vary by plan but edge performance is a key differentiator.',
    code: `# wrangler.toml for Cloudflare Pages + Functions
name = "my-app"
compatibility_date = "2024-01-01"

[site]
  bucket = "./dist"

# functions/ directory auto-deployed as Pages Functions
# functions/api/hello.ts`,
  },
  {
    id: 76,
    category: 'Cloud Deployments',
    question: 'How do you implement rollback when a deployment causes production issues?',
    answer: 'Rollback restores the last known good version quickly, prioritizing user impact over root cause analysis which happens afterward. Strategies include redeploying a previous git tag, promoting a prior immutable artifact, or using platform instant rollback (Vercel, Netlify, Cloudflare retain previous deploys). Database migrations complicate rollback—design backward-compatible migrations so app rollbacks do not break schema. Document runbooks with rollback commands and RTO targets. After rollback, fix forward with a new deploy rather than reverting git history on main.',
    code: `# Vercel instant rollback to previous production deploy
vercel rollback

# Redeploy previous git tag via CI
git checkout v2.3.1
# trigger deploy pipeline for tag

# AWS — point alias to previous Lambda version
aws lambda update-alias \\
  --function-name my-api \\
  --name production \\
  --function-version 42`,
  },
  {
    id: 77,
    category: 'Cloud Deployments',
    question: 'What is blue-green deployment?',
    answer: 'Blue-green deployment maintains two identical production environments: blue (live) and green (idle). You deploy the new version to green, run smoke tests, then switch traffic routing to green instantly while blue remains for quick rollback. Users experience no incremental rollout—traffic flips atomically at the load balancer or DNS level. The approach requires double infrastructure cost during cutover but minimizes downtime risk. Cloud load balancers, Kubernetes services, and platform-specific traffic splitting enable blue-green patterns.',
    code: `# Conceptual traffic switch
# 1. Deploy v2 to green environment (0% traffic)
# 2. Run health checks on green
# 3. Update load balancer / DNS: 100% → green
# 4. Keep blue warm for 24h rollback window

# Kubernetes — switch service selector
kubectl patch service my-app -p '{"spec":{"selector":{"version":"green"}}}'`,
  },
  {
    id: 78,
    category: 'Cloud Deployments',
    question: 'What is canary deployment and how does it reduce release risk?',
    answer: 'Canary deployment routes a small percentage of traffic to the new version while the majority stays on the stable release. Metrics and error rates on the canary are monitored before gradually increasing traffic to 100%. If anomalies appear, rollback affects only the small canary slice instead of all users. Feature flags complement canaries by decoupling code deployment from feature exposure. Load balancers (AWS ALB, Istio, Cloudflare) and platforms like Argo Rollouts automate progressive traffic shifting.',
    code: `# Progressive traffic shift (conceptual weights)
# Step 1: 5%  → v2.4.0 canary
# Step 2: 25% → monitor error rate, latency
# Step 3: 50%
# Step 4: 100% → full rollout

# Argo Rollouts canary steps
strategy:
  canary:
    steps:
      - setWeight: 10
      - pause: { duration: 5m }
      - setWeight: 50
      - pause: { duration: 5m }`,
  },
  {
    id: 79,
    category: 'Cloud Deployments',
    question: 'What is the difference between build-time and runtime environment variables?',
    answer: 'Build-time variables are embedded during compilation—Vite\'s import.meta.env and Next.js NEXT_PUBLIC_ values become literal strings in the client bundle at build. Runtime variables are read when the server or container starts, allowing the same artifact to run in staging and production with different configs. SPAs on S3 cannot read server runtime env without a bootstrap endpoint or injection step. SSR frameworks and serverless functions can read runtime secrets securely without exposing them to browsers. CI must supply the correct build-time vars for each preview vs production build.',
    code: `# Build-time (baked into client bundle — Vite)
# VITE_API_URL=https://api.example.com
const url = import.meta.env.VITE_API_URL;

# Runtime (server only — Node.js)
const dbUrl = process.env.DATABASE_URL;

# Same Docker image, different runtime env per environment
# docker run -e DATABASE_URL=postgres://prod... myapp`,
  },
  {
    id: 80,
    category: 'Cloud Deployments',
    question: 'How does CI/CD deploy a Next.js app to Vercel vs self-hosted Node?',
    answer: 'Vercel natively understands Next.js routing, ISR, middleware, and serverless functions with git-push deploys and automatic scaling. Self-hosted deployment runs next build then next start on your Node server or Docker container behind a reverse proxy, giving full infrastructure control. Vercel optimizes edge caching and cold start behavior; self-hosted requires you to configure PM2, Kubernetes, or systemd for process management. Choose Vercel for speed and simplicity; choose self-hosted for compliance, custom networking, or cost at very large scale.',
    code: `# Vercel — zero-config from Git push
# vercel.json optional overrides

# Self-hosted Docker deploy
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]`,
  },
  {
    id: 81,
    category: 'Cloud Deployments',
    question: 'What are deployment hooks and post-deploy smoke tests?',
    answer: 'Deployment hooks are scripts or HTTP endpoints triggered after a deploy completes to warm caches, notify Slack, or run database seed tasks. Post-deploy smoke tests hit critical endpoints—health check, login, checkout—to verify the release works in the target environment before announcing success. Failing smoke tests should trigger automatic rollback or page on-call engineers. Smoke tests differ from full regression suites; they validate the deployment itself, not exhaustive business logic. Platforms like Netlify and Render support build and deploy notification webhooks for custom automation.',
    code: `# Post-deploy smoke test script
#!/bin/bash
BASE_URL=\${1:-https://app.example.com}

curl -f "\$BASE_URL/api/health" || exit 1
curl -f "\$BASE_URL/" || exit 1

echo "Smoke tests passed for \$BASE_URL"

# Netlify deploy notification webhook → Slack / run smoke tests`,
  },
  {
    id: 82,
    category: 'Cloud Deployments',
    question: 'How do custom domains and HTTPS work on deployment platforms?',
    answer: 'Deployment platforms verify domain ownership via DNS TXT or CNAME records pointing your domain to their infrastructure. They provision and renew TLS certificates automatically through Let\'s Encrypt or platform-managed ACM certificates. Apex domains (@) often use ALIAS/ANAME records; subdomains use CNAME to the platform hostname. HTTPS is enforced by default with automatic HTTP-to-HTTPS redirects. Misconfigured DNS causes certificate provisioning failures visible in the platform dashboard until records propagate.',
    code: `# Typical DNS setup for www.example.com on Vercel/Netlify
# CNAME  www  →  cname.vercel-dns.com

# Apex domain (@)
# A      @    →  76.76.21.21  (platform IP)
# or ALIAS @  →  cname.vercel-dns.com

# Platform auto-provisions TLS once DNS verifies`,
  },
  {
    id: 83,
    category: 'Cloud Deployments',
    question: 'What is infrastructure immutability and immutable deploy artifacts?',
    answer: 'Immutable deployment means never patching running servers in place—you replace entire artifacts (containers, zip bundles, AMIs) with new versions for each release. The same Docker image or build artifact tested in CI is what production runs, identified by digest or checksum. Rollback means redeploying the previous artifact, not reverting files on a live server. Immutability improves reproducibility and auditability because every release is a distinct versioned object. Mutable SSH-and-edit production servers are an anti-pattern in modern CI/CD.',
    code: `# Immutable container deploy
docker build -t myapp:sha-abc123 .
docker push registry.example.com/myapp:sha-abc123

# Production always pulls exact digest
# registry.example.com/myapp@sha256:deadbeef...

# Never: ssh prod && vim app.js && restart`,
  },
  {
    id: 84,
    category: 'Cloud Deployments',
    question: 'How do you deploy serverless functions alongside a static frontend?',
    answer: 'Jamstack architectures serve static assets from a CDN while API logic runs as serverless functions colocated on the same platform or linked API gateway. Vercel maps files in api/ or Next.js route handlers; Netlify uses netlify/functions; Cloudflare uses functions/ on Pages. The frontend calls relative paths like /api/users so the same domain avoids CORS complexity. CI builds both static output and function bundles in one pipeline step. Cold starts and regional latency affect function placement choices for global apps.',
    code: `# Netlify Function: netlify/functions/users.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ users: [] }),
  };
};

# Frontend fetch — same origin
fetch("/.netlify/functions/users")`,
  },
  {
    id: 85,
    category: 'Cloud Deployments',
    question: 'What monitoring and observability should follow a cloud deployment?',
    answer: 'Deploying code is not complete until you can detect failures in production through logs, metrics, and traces. Structured logging (JSON) shipped to Datadog, CloudWatch, or Grafana Loki helps correlate errors with deploy versions tagged in each log line. Alert on error rate, latency p99, and saturation spikes after deploy windows. Synthetic uptime checks complement application metrics for user-facing endpoints. Tie observability dashboards to deploy markers so on-call engineers instantly see which release caused a regression.',
    code: `# Tag logs with deploy version
console.log(JSON.stringify({
  level: "error",
  message: "Payment failed",
  deployVersion: process.env.VERCEL_GIT_COMMIT_SHA,
  userId: "u_123",
}));

# Alert rule (conceptual)
# IF error_rate > 2% for 5m AFTER deploy
# THEN page on-call + suggest rollback`,
  },
]
