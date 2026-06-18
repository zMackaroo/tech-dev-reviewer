import type { InterviewQuestion } from '../../types'

export const branchingQuestions: InterviewQuestion[] = [
  {
    id: 14,
    category: 'Branching',
    question: 'What does git branch do without any arguments?',
    answer: 'Running git branch with no flags lists all local branches in your repository, marking the current branch with an asterisk. It shows branch names but not commit messages or how far ahead or behind each branch is relative to remotes. Use it when you need a quick inventory of local branches before switching or deleting stale ones. For remote branches too, use git branch -a or git branch -r. In a real app, listing branches before a release helps confirm no forgotten feature branches still exist locally.',
    code: `# List local branches (* marks current)
git branch

# List with last commit hash and message per branch
git branch -v

# List branches merged into current branch
git branch --merged`,
  },
  {
    id: 15,
    category: 'Branching',
    question: 'How do you create a new branch with git branch and git checkout -b?',
    answer: 'git branch <name> creates a new branch pointer at the current commit but does not switch to it—you stay on your current branch. git checkout -b <name> (or git switch -c <name>) creates the branch and checks it out in one step, which is what you almost always want when starting new work. The new branch inherits the full history of the commit you were on. In a real app, git switch -c feature/oauth-google main creates a feature branch from the latest main tip and puts you on it immediately.',
    code: `# Create branch but stay on current branch
git branch feature/notifications

# Create and switch (older syntax)
git checkout -b feature/notifications

# Create and switch (modern syntax)
git switch -c feature/notifications

# Create branch starting from a specific commit or branch
git switch -c hotfix/login-bug origin/main`,
  },
  {
    id: 16,
    category: 'Branching',
    question: 'What is the difference between git checkout and git switch?',
    answer: 'git checkout is a multi-purpose command: it switches branches, restores files, and checks out commits or paths. git switch, added in Git 2.23, does only branch switching and has clearer error messages when you have uncommitted changes that would be overwritten. git restore handles file restoration, splitting checkout responsibilities into focused commands. Prefer git switch for changing branches and git restore for discarding file edits. In a real app, git switch main is safer and more readable than git checkout main when you simply want to change branches.',
    code: `# Switch to an existing branch (modern)
git switch main

# Switch to an existing branch (classic)
git checkout main

# Switch to previous branch
git switch -

# Create and switch to new branch
git switch -c feature/dark-mode`,
  },
  {
    id: 17,
    category: 'Branching',
    question: 'How does git merge integrate branch history?',
    answer: 'git merge combines the commits from another branch into your current branch, creating a new merge commit when the histories have diverged (non-fast-forward merge). A fast-forward merge simply moves your branch pointer forward when there are no divergent commits on your branch. Merge preserves the full branch history and shows exactly when integration happened. Resolve any conflicts in affected files, stage them, and run git commit to complete the merge. In a real app, merging feature/payments into develop after PR approval brings all payment commits into the integration branch.',
    code: `# Merge feature branch into current branch
git switch develop
git merge feature/payments

# Merge with an explicit merge commit message
git merge feature/payments -m "Merge feature/payments into develop"

# Abort a merge with conflicts (before committing)
git merge --abort`,
  },
  {
    id: 18,
    category: 'Branching',
    question: 'How do you resolve merge conflicts from the command line?',
    answer: 'When git merge or git pull finds conflicting edits to the same lines, it marks affected files as unmerged and inserts conflict markers (<<<<<<<, =======, >>>>>>>) in the file content. Open each conflicted file, choose the correct code, remove the markers, then git add the resolved files and complete the merge with git commit. git status lists all unmerged paths during the process. Use git diff to see conflict details. In a real app, after merging main into your feature branch, you might resolve package.json conflicts manually, stage the file, and commit to finish the merge.',
    code: `# See which files have conflicts
git status

# After editing conflicted files, mark as resolved
git add src/config.ts package.json

# Complete the merge
git commit -m "merge: resolve conflicts with main"

# Or abort and return to pre-merge state
git merge --abort`,
  },
  {
    id: 19,
    category: 'Branching',
    question: 'How do you delete local and remote branches?',
    answer: 'git branch -d <name> deletes a local branch only if it has been fully merged into your current branch, protecting you from losing work. Use -D to force delete even when unmerged. To remove a remote branch, use git push origin --delete <name> or the shorthand git push origin :<name>. Deleting the remote branch does not remove your local copy—you must delete locally separately. In a real app, after a PR merges on GitHub, you delete feature/old-ui locally and run git push origin --delete feature/old-ui to tidy the remote.',
    code: `# Safe delete (refuses if unmerged)
git branch -d feature/old-ui

# Force delete local branch
git branch -D feature/old-ui

# Delete remote branch
git push origin --delete feature/old-ui

# Prune stale remote-tracking references locally
git fetch --prune`,
  },
  {
    id: 20,
    category: 'Branching',
    question: 'How do you list all local and remote branches?',
    answer: 'git branch -r lists remote-tracking branches your local repo knows about from the last fetch. git branch -a lists both local and remote-tracking branches together. git branch -vv adds upstream tracking info and ahead/behind counts, which is especially useful before pushing or cleaning up. Remote branches appear as origin/main, not as local branches until you check them out. In a real app, git branch -vv shows your feature branch is three commits ahead of origin, reminding you to push before leaving for the day.',
    code: `# Local branches only
git branch

# Remote-tracking branches
git branch -r

# All branches (local + remote-tracking)
git branch -a

# Verbose with upstream and ahead/behind
git branch -vv`,
  },
  {
    id: 21,
    category: 'Branching',
    question: 'What is detached HEAD state and how do you fix it?',
    answer: 'Detached HEAD means Git checked out a specific commit directly instead of a branch name, so new commits are not attached to any branch and can be lost when you switch away. This happens when you git checkout a commit hash, tag, or remote branch without creating a local branch. To fix it, create a branch at the current commit with git switch -c <name> or git checkout -b <name> to preserve your work. git switch - detaches you safely back to your previous branch. In a real app, after git checkout v1.0.0 to debug a release, run git switch -c hotfix/from-v1 to keep any fixes you make.',
    code: `# Detached HEAD at a specific commit (for inspection)
git checkout a1b2c3d4

# Save work: create a branch while detached
git switch -c investigate-regression

# Return to previous branch
git switch -

# Or return to main explicitly
git switch main`,
  },
  {
    id: 22,
    category: 'Branching',
    question: 'What is a fast-forward merge and when does Git perform one?',
    answer: 'A fast-forward merge occurs when the branch you are merging in is a direct ancestor of your current branch tip—your branch has no unique commits since the other branch diverged. Git simply moves your branch pointer forward without creating a merge commit, keeping history linear. This is the default when possible. If you want to always record an explicit merge commit even when fast-forward is possible, use git merge --no-ff. In a real app, updating a short-lived feature branch with latest main often fast-forwards cleanly if you have not committed locally yet.',
    code: `# Merge that fast-forwards when possible (default)
git merge feature/quick-fix

# Always create a merge commit
git merge feature/quick-fix --no-ff

# Only allow fast-forward; fail otherwise
git merge feature/quick-fix --ff-only`,
  },
  {
    id: 23,
    category: 'Branching',
    question: 'How do you rename a local branch?',
    answer: 'git branch -m <new-name> renames the currently checked-out branch, while git branch -m <old-name> <new-name> renames a branch you are not on. Renaming only affects your local repository until you push the new name and delete the old remote branch. After renaming, update upstream tracking with git push -u origin <new-name> and remove the stale remote with git push origin --delete <old-name>. In a real app, renaming fix/typo to fix/header-typo before opening a PR keeps branch names consistent with team conventions.',
    code: `# Rename current branch
git branch -m fix/header-typo

# Rename a branch you are not on
git branch -m old-name new-name

# Push renamed branch and set upstream
git push -u origin fix/header-typo
git push origin --delete old-name`,
  },
  {
    id: 24,
    category: 'Branching',
    question: 'How do you check out a remote branch locally?',
    answer: 'After git fetch, remote branches appear as remote-tracking refs like origin/feature/api. Use git switch feature/api or git checkout feature/api and Git auto-creates a local tracking branch if the name is unique among remotes. Explicitly: git switch -c feature/api origin/feature/api creates a local branch tracking the remote. Without fetch, your local repo may not know the branch exists. In a real app, a teammate pushes feature/api—you run git fetch, then git switch feature/api to review it locally.',
    code: `# Fetch latest remote branches
git fetch origin

# Auto-create local tracking branch from remote
git switch feature/api

# Explicit checkout with tracking
git switch -c feature/api origin/feature/api

# List remote branches to find the name
git branch -r`,
  },
  {
    id: 25,
    category: 'Branching',
    question: 'What does git merge --abort do?',
    answer: 'git merge --abort cancels an in-progress merge and restores your branch to the state before you ran git merge, as long as you have not yet committed the merge. It removes conflict markers and unstages merge-related changes. Use it when a merge went wrong, you chose the wrong target branch, or conflicts are too complex to resolve right now. This only works during an active merge; completed merges require git reset or git revert instead. In a real app, if you accidentally merge develop into main instead of the reverse, --abort immediately undoes the attempt.',
    code: `# Start a merge
git merge feature/big-refactor

# Conflicts are too messy — cancel everything
git merge --abort

# Verify you are back to pre-merge state
git status`,
  },
  {
    id: 26,
    category: 'Branching',
    question: 'How do you compare two branches with git diff?',
    answer: 'git diff branch1..branch2 shows changes that exist on branch2 but not on branch1—the diff you would get by merging branch2 into branch1. git diff branch1...branch2 uses the merge base as the starting point, showing only what branch2 introduced since both branches diverged. This triple-dot form is what pull requests typically display. Use branch comparison before merging to understand scope of changes. In a real app, git diff main...feature/billing previews exactly what the PR will introduce without noise from main moving forward separately.',
    code: `# Changes on feature since it split from main (PR view)
git diff main...feature/billing

# All differences between branch tips
git diff main..feature/billing

# List only changed file names
git diff --name-only main...feature/billing`,
  },
  {
    id: 27,
    category: 'Branching',
    question: 'What is git switch -c versus git switch -C?',
    answer: 'git switch -c <branch> creates a new branch and switches to it, failing if the branch name already exists. git switch -C <branch> does the same but resets an existing branch to the starting point if the name is taken, discarding the old branch tip locally. Use -c for normal new feature work and -C only when you intentionally want to recreate a branch from scratch, such as rebuilding a feature branch on top of updated main. In a real app, git switch -C feature/rebuild origin/main recreates your feature branch from latest main after a messy history.',
    code: `# Create new branch (fails if exists)
git switch -c feature/new-widget

# Create or reset branch to current start point
git switch -C feature/rebuild origin/main

# Equivalent checkout syntax
git checkout -B feature/rebuild origin/main`,
  },
  {
    id: 28,
    category: 'Branching',
    question: 'How do you see which branches contain a specific commit?',
    answer: 'git branch --contains <commit> lists local branches whose history includes the given commit, meaning the commit is an ancestor of those branch tips. Add --merged or --no-merged to filter relative to your current branch. Use git branch -a --contains to include remote-tracking branches. This helps trace where a fix landed and whether it reached production branches. In a real app, after identifying a security patch commit, git branch -a --contains abc1234 confirms it is on main and release/2.3 but not release/2.2.',
    code: `# Local branches containing a commit
git branch --contains a1b2c3d4

# All branches including remotes
git branch -a --contains a1b2c3d4

# Branches NOT merged into current branch
git branch --no-merged`,
  },
]
