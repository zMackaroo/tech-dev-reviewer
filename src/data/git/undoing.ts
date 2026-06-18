import type { InterviewQuestion } from '../../types'

export const undoingQuestions: InterviewQuestion[] = [
  {
    id: 43,
    category: 'Undo & Restore',
    question: 'What is the difference between git reset --soft, --mixed, and --hard?',
    answer: 'All three move the current branch pointer to a specified commit, but they differ in what happens to the staging area and working directory. --soft keeps both staging and working directory intact—only the branch pointer moves, so changes remain staged. --mixed (the default) resets the staging area but keeps working directory files edited. --hard discards everything, matching the target commit exactly—destructive to uncommitted work. Use --soft to re-commit differently, --mixed to unstage, and --hard only when you are certain you want to throw away local changes.',
    code: `# Move HEAD back 1 commit, keep changes staged
git reset --soft HEAD~1

# Move HEAD back 1 commit, unstage but keep file edits (default)
git reset HEAD~1
git reset --mixed HEAD~1

# Move HEAD back 1 commit, discard all local changes
git reset --hard HEAD~1`,
  },
  {
    id: 44,
    category: 'Undo & Restore',
    question: 'When should you use git revert instead of git reset?',
    answer: 'git revert creates a new commit that undoes the changes of a specified commit, preserving history rather than erasing it. Use revert on commits already pushed to a shared remote, because reset rewrites history and breaks teammates clones. Revert is safe for production branches where audit trails matter. You can revert a merge commit with -m 1 to specify the mainline parent.',
    code: `# Revert a specific commit (creates new undo commit)
git revert abc1234

# Revert without opening editor for message
git revert abc1234 --no-edit

# Revert a merge commit (keep first parent as mainline)
git revert -m 1 merge_commit_hash`,
  },
  {
    id: 45,
    category: 'Undo & Restore',
    question: 'What does git restore do?',
    answer: 'git restore, introduced in Git 2.23, discards changes in the working directory or unstages files from the index. git restore <file> reverts the working copy to match the index (or HEAD with --source=HEAD). git restore --staged <file> removes the file from staging without touching working directory edits. It replaces the file-restoration half of git checkout with clearer semantics.',
    code: `# Discard unstaged changes in a file
git restore src/config.json

# Unstage a file (keep working directory edits)
git restore --staged src/config.json

# Discard all unstaged changes in tracked files
git restore .`,
  },
  {
    id: 46,
    category: 'Undo & Restore',
    question: 'How does git checkout -- <file> differ from git restore?',
    answer: 'git checkout -- <file> is the legacy command to discard unstaged working directory changes and restore the file from the index or HEAD. The -- separator is required to distinguish file paths from branch names. git restore <file> is the modern equivalent with the same default behavior. Both are destructive to uncommitted edits in that file. Prefer git restore in new scripts and documentation for clarity.',
    code: `# Legacy: restore file from index/HEAD
git checkout -- src/app.ts

# Modern equivalent
git restore src/app.ts

# Restore file from a specific commit
git restore --source=HEAD~2 src/app.ts`,
  },
  {
    id: 47,
    category: 'Undo & Restore',
    question: 'What does git clean do and when is it dangerous?',
    answer: 'git clean removes untracked files from the working directory—files Git has never been told to track. -n performs a dry run showing what would be deleted without actually deleting. -f forces deletion; -d also removes untracked directories. -x removes ignored files too (like node_modules and build output), which is usually undesirable. Never run git clean -fdx without -n first on a project with local-only config.',
    code: `# Dry run: see what would be removed
git clean -n

# Remove untracked files and directories
git clean -fd

# Also remove ignored files (dangerous)
git clean -fdx`,
  },
  {
    id: 48,
    category: 'Undo & Restore',
    question: 'How do you amend the most recent commit with git commit --amend?',
    answer: 'git commit --amend replaces the tip commit with a new one that includes any currently staged changes and/or an updated message. It rewrites the most recent commit hash, so never amend commits already pushed to a shared branch unless the team agrees and you force-push carefully. Use it to fix a typo in the commit message or add a file you forgot to stage.',
    code: `# Amend commit message (opens editor)
git commit --amend

# Amend message inline
git commit --amend -m "fix: correct validation regex"

# Add staged files to last commit, keep message
git add package-lock.json
git commit --amend --no-edit`,
  },
  {
    id: 49,
    category: 'Undo & Restore',
    question: 'How do you unstage a file without losing edits?',
    answer: 'git restore --staged <file> (or git reset HEAD <file>) removes the file from the staging area while keeping your working directory modifications intact. This is the opposite of git add. Use it when you accidentally staged too much or want to split changes across multiple commits. The file will appear as modified but unstaged in git status.',
    code: `# Unstage one file
git restore --staged .env

# Unstage everything
git restore --staged .

# Legacy equivalent
git reset HEAD .env`,
  },
  {
    id: 50,
    category: 'Undo & Restore',
    question: 'What does git reset HEAD~1 do in practice?',
    answer: 'git reset HEAD~1 moves the current branch back one commit using the default --mixed mode. The undone commit changes become unstaged modifications in your working directory—you have not lost the edits, only the commit record locally. This is useful for splitting an oversized commit or fixing a premature commit before pushing. If you already pushed, prefer git revert instead.',
    code: `# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last 3 commits
git reset HEAD~3

# Undo last commit but keep changes staged
git reset --soft HEAD~1`,
  },
  {
    id: 51,
    category: 'Undo & Restore',
    question: 'How do you recover a "lost" commit using git reflog before reset?',
    answer: 'git reflog records every movement of HEAD and branch tips, including commits removed by reset or rebase. Find the lost commit hash in the reflog, then git branch recovery <hash> or git reset --hard <hash> to restore it. Reflog entries expire after the default 90 days but usually suffice for immediate mistakes. This is your safety net when --hard reset goes wrong.',
    code: `# View recent HEAD movements
git reflog

# Recover by creating a branch at lost commit
git branch recovery abc1234

# Or jump branch back to lost commit
git reset --hard abc1234`,
  },
  {
    id: 52,
    category: 'Undo & Restore',
    question: 'What does git restore --source allow you to do?',
    answer: 'git restore --source=<tree> restores file content from any commit, tag, or tree object—not just HEAD or the index. This lets you pull an old version of a file into your working directory without checking out an entire commit. Combine with --staged to populate the staging area from history. It is cleaner than git checkout <commit> -- <file> for single-file recovery.',
    code: `# Restore file content from a specific commit
git restore --source=abc1234 -- src/utils.ts

# Stage a historical version of a file
git restore --source=abc1234 --staged -- src/utils.ts

# Restore entire tree from another branch
git restore --source=feature/old-ui -- .`,
  },
  {
    id: 53,
    category: 'Undo & Restore',
    question: 'How do you undo git add for all files at once?',
    answer: 'git restore --staged . unstages every file in the staging area without modifying working directory content. Alternatively, git reset (with no commit argument) unstages all files using the default mixed reset against HEAD. Both leave your edits in place—only the index is cleared. Use this when git add . grabbed files you did not intend to commit yet. to start fresh, then git add -p to stage selectively.',
    code: `# Unstage all files
git restore --staged .

# Equivalent
git reset

# Then selectively re-stage
git add -p`,
  },
  {
    id: 54,
    category: 'Undo & Restore',
    question: 'What is the difference between reverting and resetting a merge commit?',
    answer: 'Resetting a merge commit removes it from branch history entirely, which rewrites shared history and confuses collaborators if pushed. Reverting a merge with git revert -m 1 creates a new commit that undoes the merge changes while keeping the merge record intact. The -m flag specifies which parent is the mainline (usually 1 for the branch you merged into). Always revert merged commits on shared branches.',
    code: `# Find merge commit hash
git log --merges --oneline -5

# Revert merge (parent 1 = branch you merged into)
git revert -m 1 merge_hash --no-edit

# Do NOT reset a pushed merge on shared branches
# git reset --hard HEAD~1  # only safe if not pushed`,
  },
  {
    id: 55,
    category: 'Undo & Restore',
    question: 'How do you discard all local changes and match remote exactly?',
    answer: 'To throw away all local commits and uncommitted changes on a branch and match the remote, fetch first then reset hard to the remote tracking branch: git fetch origin && git reset --hard origin/main. This is destructive and cannot be undone except via reflog. For uncommitted changes only, git restore . and git clean -fd suffice without touching commits.',
    code: `# Discard uncommitted tracked changes
git restore .

# Remove untracked files too
git clean -fd

# Reset branch to match remote exactly (destructive)
git fetch origin
git reset --hard origin/main`,
  },
  {
    id: 56,
    category: 'Undo & Restore',
    question: 'What does git reset <file> do (path-specific reset)?',
    answer: 'git reset <file> (without a commit) unstages the named file, moving the index entry back to match HEAD while leaving the working directory unchanged. It is equivalent to git restore --staged <file>. This path-specific form does not move branch pointers—it only affects the staging area for that file. Use it for surgical unstaging during multi-file commits.',
    code: `# Unstage one file (legacy path reset)
git reset src/README.md

# Modern equivalent
git restore --staged src/README.md

# Unstage multiple files
git reset file1.ts file2.ts`,
  },
  {
    id: 57,
    category: 'Undo & Restore',
    question: 'How do you undo the last git pull that caused a bad merge?',
    answer: 'If the pull just completed and created a merge commit, git reset --hard ORIG_HEAD jumps back to where HEAD was before the pull—Git sets ORIG_HEAD automatically for dangerous operations. If more work happened since, use git reflog to find the pre-pull commit. Alternatively, git merge --abort works if the pull merge is still in progress with unresolved conflicts.',
    code: `# Immediately after a bad pull merge
git reset --hard ORIG_HEAD

# If merge still in progress with conflicts
git merge --abort

# Find pre-pull state in reflog
git reflog
git reset --hard HEAD@{1}`,
  },
]
