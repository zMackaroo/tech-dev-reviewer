import type { InterviewQuestion } from '../../types'

export const remoteQuestions: InterviewQuestion[] = [
  {
    id: 58,
    category: 'Remote',
    question: 'What does git remote add do?',
    answer: 'git remote add <name> <url> registers a new remote repository under a short alias, typically origin for the primary upstream. After adding, you can push, pull, and fetch using the alias instead of typing the full URL every time. Verify with git remote -v which shows fetch and push URLs. You can add multiple remotes—for example origin for your fork and upstream for the original repo.',
    code: `# Add primary remote (done automatically by git clone)
git remote add origin https://github.com/you/my-app.git

# Add upstream for fork workflow
git remote add upstream https://github.com/org/original.git

# Verify remotes
git remote -v`,
  },
  {
    id: 59,
    category: 'Remote',
    question: 'How do you remove or rename a remote?',
    answer: 'git remote remove <name> (or git remote rm) deletes a remote alias and its tracking configuration—it does not delete the remote server repository. git remote rename <old> <new> changes the alias locally. Use remove when you accidentally added the wrong URL or no longer need a secondary remote. After renaming, existing remote-tracking branches update to the new prefix automatically.',
    code: `# Remove a remote
git remote remove upstream

# Rename a remote
git remote rename origin old-origin

# Change URL for existing remote
git remote set-url origin https://github.com/org/new-repo.git`,
  },
  {
    id: 60,
    category: 'Remote',
    question: 'What does git fetch do and why use it instead of pull?',
    answer: 'git fetch downloads new commits, branches, and tags from a remote into your local repository as remote-tracking branches (e.g., origin/main) without modifying your working directory or current branch. It is safe and non-destructive—you inspect what changed before merging or rebasing. git pull equals fetch plus merge (or rebase). Fetch first when you want to review incoming changes with git log origin/main or diff before integrating.',
    code: `# Fetch all branches from origin
git fetch origin

# Fetch all configured remotes
git fetch --all

# Fetch and prune deleted remote branches
git fetch --prune`,
  },
  {
    id: 61,
    category: 'Remote',
    question: 'What does git push -u (set-upstream) do?',
    answer: 'git push -u origin <branch> pushes your local branch to the remote and sets the upstream tracking relationship so future git push and git pull commands work without specifying remote and branch names. Git records that your local feature/login tracks origin/feature/login. Use -u on the first push of a new branch; subsequent pushes need only git push. git branch -vv confirms upstream configuration and ahead/behind status.',
    code: `# First push: publish branch and set upstream
git push -u origin feature/checkout

# Later pushes (upstream already set)
git push

# Set upstream without pushing (branch already on remote)
git branch --set-upstream-to=origin/feature/checkout`,
  },
  {
    id: 62,
    category: 'Remote',
    question: 'What is origin in Git?',
    answer: 'origin is the conventional default alias for the remote repository you cloned from or first added with git remote add. git clone automatically creates origin pointing at the source URL and sets up remote-tracking branches like origin/main. It is not a special Git keyword—just a widely adopted name you could rename. When documentation says push to origin, it means your primary hosted repository on GitHub, GitLab, or similar.',
    code: `# Clone sets origin automatically
git clone https://github.com/team/app.git

# See origin URL
git remote get-url origin

# Push to origin default remote
git push origin main`,
  },
  {
    id: 63,
    category: 'Remote',
    question: 'What does git remote prune do?',
    answer: 'git remote prune <remote> removes stale remote-tracking branch references locally when those branches were deleted on the remote server. Without pruning, git branch -r still lists origin/feature/old long after someone deleted it on GitHub. git fetch --prune (or git fetch -p) fetches and prunes in one step—most teams use this by default. Pruning does not delete local branches, only outdated remote-tracking refs.',
    code: `# Prune stale refs for origin
git remote prune origin

# Fetch and prune together (recommended)
git fetch --prune

# Configure automatic prune on every fetch
git config fetch.prune true`,
  },
  {
    id: 64,
    category: 'Remote',
    question: 'What does git remote -v show?',
    answer: 'git remote -v lists all configured remotes with their fetch and push URLs side by side. Fetch URL is used for git fetch and pull; push URL is used for git push (often identical). Use it to verify you are pointing at the correct repository before pushing sensitive code or force-pushing. Add -v to any remote subcommand when onboarding to a project to confirm remotes.',
    code: `# List remotes with URLs
git remote -v

# Show detailed info including tracked branches
git remote show origin

# List remote names only
git remote`,
  },
  {
    id: 65,
    category: 'Remote',
    question: 'How do you push a specific branch and delete a remote branch?',
    answer: 'git push <remote> <local-branch> uploads that branch commits to the remote. To delete a remote branch, use git push <remote> --delete <branch> or the refspec syntax git push <remote> :<branch> which pushes nothing to that branch name, deleting it. Deleting remote branches is common after PR merge. Your local branch remains until you delete it separately.',
    code: `# Push specific branch
git push origin feature/payments

# Delete remote branch
git push origin --delete feature/payments

# Shorthand delete syntax
git push origin :feature/payments`,
  },
  {
    id: 66,
    category: 'Remote',
    question: 'What does git pull --rebase do?',
    answer: 'git pull --rebase fetches remote changes and replays your local commits on top of the updated remote branch instead of creating a merge commit. This keeps history linear, which many teams prefer for feature branches. If conflicts occur during replay, resolve them, git add, and git rebase --continue. Configure pull.rebase true to make this the default behavior.',
    code: `# Pull with rebase instead of merge
git pull --rebase origin main

# Set rebase as default for all pulls
git config pull.rebase true

# If conflicts during pull --rebase
git add .
git rebase --continue`,
  },
  {
    id: 67,
    category: 'Remote',
    question: 'How do you push tags to a remote?',
    answer: 'Tags are not pushed by default with git push—you must push them explicitly. git push origin <tagname> pushes one tag; git push origin --tags pushes all local tags. Annotated tags are common for releases (v1.0.0) and trigger CI release pipelines on many platforms. Use --follow-tags to push annotated tags reachable from pushed commits.',
    code: `# Push a single tag
git push origin v2.1.0

# Push all local tags
git push origin --tags

# Push branch and its annotated tags
git push --follow-tags`,
  },
  {
    id: 68,
    category: 'Remote',
    question: 'What is git push --force-with-lease and why prefer it over --force?',
    answer: 'git push --force-with-lease updates the remote branch only if no one else has pushed new commits since your last fetch—preventing you from overwriting teammates work. Plain --force overwrites the remote branch unconditionally, which can delete others commits from the shared branch history. Use force-with-lease after amending or rebasing commits you already pushed on your own feature branch. Never force-push main without team policy.',
    code: `# Safer force push after rebase
git push --force-with-lease origin feature/api

# Specify expected remote value explicitly
git push --force-with-lease=feature/api:abc1234 origin feature/api

# Avoid on shared branches
# git push --force origin main  # dangerous`,
  },
  {
    id: 69,
    category: 'Remote',
    question: 'How do you sync a fork with upstream changes?',
    answer: 'Add the original repository as upstream, fetch its latest commits, then merge or rebase upstream/main into your local main and push to origin (your fork). The typical fork workflow is: git fetch upstream, git merge upstream/main (on main), git push origin main. Feature branches rebase onto updated main before opening PRs upstream. This keeps your fork current without re-cloning.',
    code: `# One-time: add upstream remote
git remote add upstream https://github.com/org/original.git

# Sync fork
git fetch upstream
git switch main
git merge upstream/main
git push origin main`,
  },
]
