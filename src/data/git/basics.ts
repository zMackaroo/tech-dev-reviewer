import type { InterviewQuestion } from '../../types'

export const basicsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Basics',
    question: 'What does git init do and when should you use it?',
    answer: 'git init creates a new Git repository in the current directory by adding a hidden .git folder that stores all version history and metadata. Use it when starting a brand-new project locally before your first commit, or when you want to turn an existing folder of files into a tracked repository. The command does not connect to a remote server—you add that later with git remote add.',
    code: `# Create a new repository in the current directory
git init

# Create a repository in a new subdirectory
git init my-new-project

# Reinitialize an existing repo (safe; refreshes hooks/templates)
git init`,
  },
  {
    id: 2,
    category: 'Basics',
    question: 'How does git clone work and what are common flags?',
    answer: 'git clone downloads a remote repository and sets up a local copy with the full commit history, default branch checkout, and a configured origin remote pointing back to the source URL. By default it creates a new folder named after the repository. Use --depth 1 for a shallow clone when you only need the latest snapshot and want faster CI checkouts. Use --branch to clone a specific branch instead of the remote default.',
    code: `# Standard HTTPS clone
git clone https://github.com/org/my-app.git

# Clone into a custom folder name
git clone https://github.com/org/my-app.git my-app-local

# Shallow clone (latest commit only)
git clone --depth 1 https://github.com/org/my-app.git

# Clone a specific branch
git clone --branch develop https://github.com/org/my-app.git`,
  },
  {
    id: 3,
    category: 'Basics',
    question: 'What does git status show and how do you read its output?',
    answer: 'git status reports the current branch, whether it is ahead or behind its upstream, and which files are modified, staged, untracked, or deleted. Unstaged changes appear under "Changes not staged for commit" while staged files appear under "Changes to be committed." Untracked files are new files Git has never seen. Use git status constantly before committing to confirm you are staging exactly what you intend.',
    code: `# Full status report
git status

# Short, compact status (great for scripts and quick checks)
git status -s

# Show status ignoring submodules
git status --ignore-submodules`,
  },
  {
    id: 4,
    category: 'Basics',
    question: 'What does git add do and what are the most useful forms?',
    answer: 'git add moves changes from your working directory into the staging area (index), marking them for inclusion in the next commit. You can stage entire files, specific paths, or interactively choose hunks with git add -p. Staging lets you split unrelated edits into separate, focused commits. Use git add . to stage all changes in the current directory tree, but prefer naming files explicitly when a commit should only cover part of your work.',
    code: `# Stage specific files
git add src/api/users.ts src/api/users.test.ts

# Stage all changes under current directory
git add .

# Stage interactively (pick hunks one at a time)
git add -p

# Stage all tracked modifications (not new untracked files)
git add -u`,
  },
  {
    id: 5,
    category: 'Basics',
    question: 'How do you create a commit with git commit and what flags matter?',
    answer: 'git commit records a snapshot of everything currently in the staging area and stores it permanently in your local repository with a message describing the change. The -m flag sets the message inline; omit it to open your configured editor for longer descriptions. Use --amend only when you need to fix the most recent commit message or include forgotten staged files. A good commit message explains why the change was made, not just what files changed.',
    code: `# Commit with an inline message
git commit -m "feat: add password reset endpoint"

# Open editor for a detailed message
git commit

# Commit with a multi-line message via multiple -m flags
git commit -m "fix: handle null avatar URL" -m "Prevents crash on profile page when OAuth provider omits photo."

# Stage all tracked changes and commit in one step (skips new untracked files)
git commit -am "chore: update lockfile"`,
  },
  {
    id: 6,
    category: 'Basics',
    question: 'What does git push do and how do you specify where commits go?',
    answer: 'git push uploads your local commits to a remote repository so teammates and CI can access them. The syntax git push <remote> <branch> sends your current branch commits to the matching branch on that remote. Without upstream tracking, you must name the remote and branch explicitly every time. Use -u on the first push to set upstream tracking so future git push and git pull work with no extra arguments.',
    code: `# Push current branch to origin (requires upstream set)
git push

# First push: create remote branch and set upstream
git push -u origin feature/login

# Push a specific local branch to a remote branch
git push origin feature/login:feature/login

# Push all branches (use carefully)
git push --all origin`,
  },
  {
    id: 7,
    category: 'Basics',
    question: 'What does git pull do and how is it different from git fetch?',
    answer: 'git pull is a convenience command that runs git fetch followed by git merge (or git rebase if configured) to integrate remote changes into your current branch. It updates your local branch with commits others pushed while you were working. Use pull when you want to sync and merge in one step before continuing development or pushing your own work. If you only want to download remote updates without merging yet, use git fetch instead.',
    code: `# Fetch and merge remote tracking branch into current branch
git pull

# Pull from a specific remote and branch
git pull origin main

# Pull using rebase instead of merge (if configured or per-invocation)
git pull --rebase origin main`,
  },
  {
    id: 8,
    category: 'Basics',
    question: 'How do you view commit history with git log?',
    answer: 'git log lists commits reachable from your current HEAD, newest first, showing hash, author, date, and message for each. Without flags the output is verbose, so most developers use formatting options daily. --oneline compresses each commit to one line; --graph draws an ASCII branch diagram; -n limits how many commits appear. Combine flags to scan recent history quickly during code review or incident response.',
    code: `# Default verbose log
git log

# Compact one-line format
git log --oneline

# Last 10 commits with graph
git log --oneline --graph -10

# Log for a specific file
git log --oneline -- src/components/Header.tsx`,
  },
  {
    id: 9,
    category: 'Basics',
    question: 'What does git diff show and when do you use each form?',
    answer: 'git diff displays line-by-line differences between two states of your project. With no flags it compares your working directory against the staging area—what would be staged if you ran git add now. git diff --staged (or --cached) compares the staging area against the last commit, showing exactly what your next commit will contain. git diff main compares your working tree to another branch tip. Use diff before every commit to catch accidental debug code or formatting-only noise.',
    code: `# Unstaged changes (working tree vs index)
git diff

# Staged changes (index vs last commit)
git diff --staged

# Compare working tree to another branch
git diff main

# Show only file names that changed
git diff --name-only`,
  },
  {
    id: 10,
    category: 'Basics',
    question: 'What does git show display and when is it useful?',
    answer: 'git show presents the metadata and full patch introduced by a specific commit, tag, or other object. By default it shows HEAD—the tip of your current branch. Pass a commit hash to inspect exactly what that commit changed, which is invaluable during code review and debugging regressions. It also works with tags and tree objects. Unlike git log which lists many commits, git show zooms into one changeset.',
    code: `# Show the latest commit on current branch
git show

# Show a specific commit by hash
git show a1b2c3d4

# Show only the list of files changed in a commit
git show --name-only a1b2c3d4

# Show a tag annotation and its commit
git show v2.1.0`,
  },
  {
    id: 11,
    category: 'Basics',
    question: 'How do you get help for any Git command?',
    answer: 'Git ships with built-in documentation accessible from the terminal via git help and the --help flag on any subcommand. git help <command> opens the full manual page in your pager (usually less), while git <command> -h prints a short usage summary ideal for quick flag reminders. Use --help when you forget whether a flag is --staged or --cached, or when exploring advanced options like git rebase -i.',
    code: `# Full manual for git rebase
git help rebase

# Short usage summary
git rebase -h

# Help for the main git command itself
git --help

# Open the Git documentation website reference (if git-web installed)
git help -w commit`,
  },
  {
    id: 12,
    category: 'Basics',
    question: 'What is the basic daily workflow combining status, add, commit, and push?',
    answer: 'The core loop is: edit files, check git status to see what changed, stage intentional changes with git add, commit with a clear message, and push to share with the remote. Always status before add to avoid staging secrets or build artifacts; always diff --staged before commit to verify the snapshot. Pull or fetch before push if teammates may have merged to your branch. This cycle is entirely local until push—commits exist on your machine first.',
    code: `# Typical feature development cycle
git status
git add src/auth/login.ts src/auth/login.test.ts
git commit -m "feat: add login form validation"
git status
git add src/auth/LoginForm.tsx
git commit -m "feat: wire login form to API"
git push -u origin feature/login`,
  },
  {
    id: 13,
    category: 'Basics',
    question: 'How do you view a compact summary of recent commits with git log --oneline?',
    answer: 'git log --oneline prints each commit as a single line containing the abbreviated hash and the first line of the commit message. It is the fastest way to scan history, identify when a bug was introduced, or pick commits for cherry-pick and revert. Combine with --graph to see branch merges and with -n to limit output length. Decorations like --decorate show branch and tag pointers next to commits.',
    code: `# Compact log
git log --oneline

# With branch graph and last 15 commits
git log --oneline --graph --decorate -15

# Oneline log since yesterday
git log --oneline --since="yesterday"`,
  },
]
