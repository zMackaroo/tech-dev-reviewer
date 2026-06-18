import type { InterviewQuestion } from '../../types'

export const gitFundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Git Fundamentals',
    question: 'What is Git and how does it differ from other version control systems?',
    answer: 'Git is a distributed version control system that stores the full project history on every developer machine, not just on a central server. Each commit is a snapshot linked to its parent, forming a directed acyclic graph of changes that can be branched and merged efficiently. Unlike older centralized systems like SVN, Git lets you commit, branch, and inspect history offline and sync with remotes when ready. In practice, this means teams can work in parallel on features without blocking each other and recover from mistakes using local history even when the remote is unavailable.',
    code: `# Initialize a new repository
git init

# Clone an existing remote repository
git clone https://github.com/org/project.git

# Check repository status
git status`,
  },
  {
    id: 2,
    category: 'Git Fundamentals',
    question: 'What is the difference between git add, git commit, and git push?',
    answer: 'git add stages changes from your working directory into the index (staging area), selecting what will go into the next commit. git commit records a snapshot of the staged changes in your local repository with a message describing the change. git push uploads local commits to a remote repository so teammates can pull them. A common workflow is to edit files, stage the relevant hunks with git add, commit with a descriptive message, and push to share the work.',
    code: `# Stage specific files
git add src/app.ts README.md

# Commit staged changes locally
git commit -m "feat: add user profile page"

# Push the branch to origin
git push origin feature/user-profile`,
  },
  {
    id: 3,
    category: 'Git Fundamentals',
    question: 'What are the three trees in Git (working directory, staging area, and repository)?',
    answer: 'Git manages code in three layers: the working directory holds your actual files as you edit them, the staging area (index) holds changes you have marked for the next commit, and the repository (.git) stores committed snapshots permanently. Moving changes between layers uses git add (working → staging) and git commit (staging → repository). Understanding this model explains why git status shows both unstaged and staged changes separately. When a commit fails unexpectedly, checking which tree holds your edits helps you decide whether to stage again or amend.',
    code: `# Edit a file in the working directory
echo "console.log('hello')" >> app.js

# Move changes to staging
git add app.js

# Move staged snapshot into the repository
git commit -m "chore: add hello log"`,
  },
  {
    id: 4,
    category: 'Git Fundamentals',
    question: 'What is a Git branch and why are branches useful?',
    answer: 'A branch is a movable pointer to a commit that lets you diverge from the main line of development and work in isolation. Creating a branch is cheap because Git only creates a new reference, not a copy of every file. Branches enable parallel work: one developer fixes a bug on hotfix/login while another builds a feature on feature/dashboard. When the work is done, branches are merged back into a shared branch like main. Naming branches clearly (feature/, fix/, chore/) makes it easy to see intent in pull request lists.',
    code: `# List local branches
git branch

# Create and switch to a new branch
git checkout -b feature/oauth-login

# Push the branch and set upstream tracking
git push -u origin feature/oauth-login`,
  },
  {
    id: 5,
    category: 'Git Fundamentals',
    question: 'What is the difference between git merge and git rebase?',
    answer: 'git merge combines two branch histories by creating a merge commit that has two parents, preserving the exact timeline of when work happened. git rebase replays your commits on top of another branch, producing a linear history without a merge commit. Merge is safer for shared branches because it does not rewrite existing commits. Rebase keeps history clean for feature branches before opening a pull request but should not be used on commits others have already pulled. Teams often rebase locally on feature branches and merge into main to balance clarity with safety.',
    code: `# Merge feature into main
git checkout main
git pull
git merge feature/payments

# Rebase feature onto latest main (linear history)
git checkout feature/payments
git rebase main`,
  },
  {
    id: 6,
    category: 'Git Fundamentals',
    question: 'When should you use git rebase instead of git merge?',
    answer: 'Use rebase when you want a linear, easy-to-read history on a private feature branch before merging into a shared branch. Rebasing onto the latest main keeps your commits stacked cleanly on top of recent changes, which simplifies bisecting and code review. Avoid rebasing commits that have already been pushed and pulled by others, because rewriting history forces collaborators to resolve duplicate commits. A common pattern is git pull --rebase on feature branches and merge (or squash merge) into main via pull request.',
    code: `# Update feature branch with latest main via rebase
git checkout feature/notifications
git fetch origin
git rebase origin/main

# If conflicts occur, fix files then continue
git add .
git rebase --continue`,
  },
  {
    id: 7,
    category: 'Git Fundamentals',
    question: 'What does git stash do and when is it useful?',
    answer: 'git stash temporarily saves uncommitted changes (staged and unstaged) and reverts your working directory to a clean state matching HEAD. It is useful when you need to switch branches quickly but are not ready to commit half-finished work. You can list stashes, apply the most recent one, or drop stashes you no longer need. Stashing prevents accidental commits of WIP code while still preserving your edits. Many developers stash before pulling with rebase or when an urgent hotfix interrupts feature work.',
    code: `# Save current changes and clean working tree
git stash push -m "WIP: refactor auth middleware"

# Switch branches, do other work, then restore
git checkout main
git pull

git checkout feature/auth
git stash pop`,
  },
  {
    id: 8,
    category: 'Git Fundamentals',
    question: 'What is git cherry-pick and when would you use it?',
    answer: 'git cherry-pick applies the changes from a specific commit onto your current branch, creating a new commit with the same diff but a different hash. It is useful for backporting a bug fix from main to a release branch without merging unrelated commits. Cherry-pick is also handy when you accidentally committed to the wrong branch and want to move a single commit elsewhere. Because it duplicates history rather than sharing it, overuse can make tracking original context harder. Always verify the cherry-picked commit builds and passes tests on the target branch.',
    code: `# Apply commit abc123 onto current branch
git cherry-pick abc123

# Cherry-pick a range of commits (exclusive of start)
git cherry-pick def456..abc123

# Abort if conflicts are too messy
git cherry-pick --abort`,
  },
  {
    id: 9,
    category: 'Git Fundamentals',
    question: 'What is the difference between git reset --soft, --mixed, and --hard?',
    answer: 'All three reset modes move the branch pointer to a specified commit, but they differ in what happens to the staging area and working directory. --soft keeps staged and unstaged changes; only the commit history moves back. --mixed (the default) unstages changes but keeps them in your working directory. --hard discards staged and unstaged changes entirely, matching the target commit. Use --soft to rework the last commit message or combine commits. Use --hard only when you are certain you want to throw away local changes, because recovery may require reflog.',
    code: `# Undo last commit but keep changes staged
git reset --soft HEAD~1

# Undo last commit and unstage files (default)
git reset HEAD~1

# Discard last commit and all local changes (destructive)
git reset --hard HEAD~1`,
  },
  {
    id: 10,
    category: 'Git Fundamentals',
    question: 'What is git reflog and why is it important?',
    answer: 'The reflog (reference log) records every movement of branch tips and HEAD, including commits that are no longer reachable from any branch. It is a safety net when you reset too far, rebase incorrectly, or delete a branch by mistake. Entries expire after a default period (often 90 days), so recovery should happen promptly. Reflog is local to your machine and is not pushed to remotes. Knowing git reflog exists turns many "I lost my work" moments into a quick git reset --hard HEAD@{n}.',
    code: `# View recent HEAD movements
git reflog

# Recover a "lost" commit from reflog entry
git checkout -b recovered-work HEAD@{2}

# Or reset current branch to a previous state
git reset --hard HEAD@{1}`,
  },
  {
    id: 11,
    category: 'Git Fundamentals',
    question: 'How does .gitignore work and what patterns should you include?',
    answer: 'The .gitignore file tells Git which files and directories to exclude from tracking, using glob patterns matched against paths relative to the repository root. Ignored files never appear in git status as untracked and cannot be accidentally committed. Common entries include node_modules/, build output, .env files with secrets, OS files like .DS_Store, and IDE-specific folders. Patterns can be negated with ! to force-include a file inside an ignored directory. A well-maintained .gitignore keeps repositories small and prevents leaking credentials or generated artifacts.',
    code: `# .gitignore examples
node_modules/
dist/
.env
.env.local
*.log
.DS_Store

# Ignore all .local files except one config
*.local
!important.local.json`,
  },
  {
    id: 12,
    category: 'Git Fundamentals',
    question: 'What are conventional commits and why do teams adopt them?',
    answer: 'Conventional Commits is a specification for commit messages with a structured prefix like feat:, fix:, chore:, or docs: followed by a short description. The format enables automated changelog generation, semantic versioning, and clearer code review history. Tools like commitlint and semantic-release parse these prefixes to decide version bumps and release notes. Consistent messages make git log searchable and help reviewers understand intent at a glance. A team using conventional commits can ship patch releases automatically when only fix: commits land on main.',
    code: `# Valid conventional commit examples
git commit -m "feat(auth): add OAuth2 login with Google"
git commit -m "fix(api): handle null user in session middleware"
git commit -m "chore(deps): bump eslint to 9.x"

# Breaking change (major version bump signal)
git commit -m "feat!: remove legacy REST v1 endpoints"`,
  },
  {
    id: 13,
    category: 'Git Fundamentals',
    question: 'What is the difference between git fetch and git pull?',
    answer: 'git fetch downloads new commits and branch references from the remote without changing your local branches or working directory. git pull is essentially git fetch followed by git merge (or git rebase if configured), integrating remote changes into your current branch immediately. Fetch is safer when you want to inspect incoming changes before merging. Pull is convenient for quick updates on branches you own exclusively. Many teams prefer git pull --rebase on feature branches to avoid unnecessary merge commits.',
    code: `# Download remote updates without merging
git fetch origin

# Inspect what changed on main
git log HEAD..origin/main --oneline

# Pull with rebase instead of merge
git pull --rebase origin main`,
  },
  {
    id: 14,
    category: 'Git Fundamentals',
    question: 'What is a detached HEAD state in Git?',
    answer: 'A detached HEAD occurs when HEAD points directly to a commit rather than to a branch name, often after checking out a specific commit hash or tag. In this state, new commits are not attached to any branch and can become unreachable once you switch away unless you create a branch to hold them. It is normal and useful for inspecting old releases or running bisect. To keep work done in detached HEAD, create a branch with git switch -c branch-name before switching elsewhere. Always check git status, which warns when you are in detached HEAD.',
    code: `# Checkout a specific commit (detached HEAD)
git checkout abc1234

# Create a branch to preserve new commits
git switch -c fix-from-old-release

# Or return to a named branch
git switch main`,
  },
  {
    id: 15,
    category: 'Git Fundamentals',
    question: 'What is git bisect and how does it help debug regressions?',
    answer: 'git bisect performs a binary search through commit history to find the first bad commit that introduced a bug. You mark a known good commit and a known bad commit, then Git checks out middle commits for you to test and label as good or bad. Each step halves the search space, quickly narrowing thousands of commits to the culprit. It is invaluable when a test started failing but nobody knows which merge caused it. Automated bisect scripts can run a test command and mark commits without manual intervention.',
    code: `# Start bisect between good and bad commits
git bisect start
git bisect bad                    # current HEAD is broken
git bisect good v1.2.0            # this tag worked

# After testing each checkout
git bisect good   # or git bisect bad

# Finish and return to original branch
git bisect reset`,
  },
  {
    id: 16,
    category: 'Git Fundamentals',
    question: 'What is the purpose of git tag and how do release tags differ from branches?',
    answer: 'A git tag is a permanent pointer to a specific commit, commonly used to mark release versions like v2.1.0. Lightweight tags are simple names; annotated tags store a message, tagger, and date, and are preferred for releases. Unlike branches, tags do not move forward as new commits are added—they freeze a moment in history. Tags integrate with CI/CD to trigger production deployments when v* tags are pushed. Semantic versioning tags make it clear whether a release includes breaking changes.',
    code: `# Create an annotated release tag
git tag -a v2.1.0 -m "Release 2.1.0: payments module"

# Push a specific tag to remote
git push origin v2.1.0

# List tags matching a pattern
git tag -l "v2.*"`,
  },
  {
    id: 17,
    category: 'Git Fundamentals',
    question: 'What is git amend and when should you use it carefully?',
    answer: 'git commit --amend replaces the most recent commit with a new one that includes any staged changes and optionally an updated message. It is useful for fixing typos in the last commit message or adding a forgotten file before pushing. Once a commit has been pushed and others may have based work on it, amending rewrites history and causes divergence. The safe rule is amend only on commits that exist solely on your local machine. For shared branches, add a follow-up commit instead of amending.',
    code: `# Stage a forgotten file into the last commit
git add missed-file.ts
git commit --amend --no-edit

# Amend the commit message
git commit --amend -m "fix: correct typo in validation logic"

# Force push only if the amended commit was never shared
git push --force-with-lease origin feature/local-only`,
  },
  {
    id: 18,
    category: 'Git Fundamentals',
    question: 'How do you undo changes with git restore and git revert?',
    answer: 'git restore discards uncommitted changes in the working directory or unstages files, effectively rolling back local edits without touching commit history. git revert creates a new commit that inverts the changes introduced by a prior commit, preserving history for shared branches. Restore is for "I have not committed yet and want my file back." Revert is for "this commit is on main and needs to be undone safely." Revert is the standard approach for hotfixing production without force-pushing.',
    code: `# Discard unstaged changes in one file
git restore src/config.ts

# Unstage a file
git restore --staged src/config.ts

# Revert a published commit (creates new inverse commit)
git revert abc1234`,
  },
  {
    id: 19,
    category: 'Git Fundamentals',
    question: 'What is a merge conflict and how do you resolve one?',
    answer: 'A merge conflict happens when Git cannot automatically combine changes because two commits modified the same lines differently. Git marks conflicted files with <<<<<<<, =======, and >>>>>>> sections showing both versions. You edit the file to keep the correct code, remove the markers, stage the resolved file, and complete the merge or rebase with a commit or continue command. Conflicts are normal in active teams and are not a sign of failure—they require human judgment. Using smaller, frequent merges and clear ownership of files reduces conflict frequency.',
    code: `# After a failed merge, open conflicted files:
# <<<<<<< HEAD
# const timeout = 5000;
# =======
# const timeout = 10000;
# >>>>>>> feature/retry-logic

# Mark resolved and finish merge
git add src/api/client.ts
git commit -m "merge: resolve timeout conflict with retry-logic"`,
  },
  {
    id: 20,
    category: 'Git Fundamentals',
    question: 'What is the difference between origin, upstream, and remote tracking branches?',
    answer: 'A remote is a named reference to another repository, typically called origin for the repository you cloned from. Upstream usually refers to the remote branch your local branch tracks, set with git push -u or git branch --set-upstream-to. Remote tracking branches like origin/main are local read-only pointers updated by fetch; they show where the remote branch was last seen. git status uses upstream to report ahead/behind counts. Explicit upstream configuration prevents accidentally pushing to the wrong remote branch.',
    code: `# List configured remotes
git remote -v

# Set upstream for current branch
git push -u origin feature/billing

# See ahead/behind relative to upstream
git status
git log --oneline @{u}..HEAD   # commits not yet pushed`,
  },
]
