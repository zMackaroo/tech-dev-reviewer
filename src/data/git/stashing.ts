import type { InterviewQuestion } from '../../types'

export const stashingQuestions: InterviewQuestion[] = [
  {
    id: 70,
    category: 'Stash',
    question: 'What does git stash do?',
    answer: 'git stash saves your uncommitted changes (staged and unstaged tracked modifications by default) to a stack and reverts your working directory to a clean state matching HEAD. Use it when you need to switch branches or pull changes but are not ready to commit your current work. Stashes are local only—they are never pushed to remotes. git stash push -m "message" adds a descriptive label. In a real app, mid-feature you get pulled into a production hotfix—stash WIP, switch branches, fix, then pop the stash to resume.',
    code: `# Stash tracked changes
git stash

# Stash with a descriptive message
git stash push -m "WIP: checkout form validation"

# Stash including untracked files
git stash -u`,
  },
  {
    id: 71,
    category: 'Stash',
    question: 'What is the difference between git stash pop and git stash apply?',
    answer: 'Both restore stashed changes to your working directory, but git stash pop applies the latest stash and then removes it from the stash list. git stash apply restores the changes but keeps the stash entry intact—useful if you want the same changes on multiple branches or might need to re-apply after a failed attempt. Specify stash@{n} to target a particular entry instead of the latest. In a real app, use apply when unsure the pop will succeed cleanly due to conflicts; keep the stash until you confirm success.',
    code: `# Apply latest stash and remove it from list
git stash pop

# Apply latest stash but keep it in list
git stash apply

# Apply a specific stash entry
git stash apply stash@{2}`,
  },
  {
    id: 72,
    category: 'Stash',
    question: 'How do you list and inspect stashes with git stash list?',
    answer: 'git stash list shows all stash entries as a stack, newest first, labeled stash@{0}, stash@{1}, etc., with branch name and message. git stash show displays a summary diff of the latest stash; add -p for the full patch. This helps you find the right stash when you have several saved WIP states. Stashes persist until explicitly dropped or popped. In a real app, after a week away, git stash list reminds you of three saved contexts so you pick stash@{2} for the API refactor work.',
    code: `# List all stashes
git stash list

# Summary diff of latest stash
git stash show

# Full patch of a specific stash
git stash show -p stash@{1}`,
  },
  {
    id: 73,
    category: 'Stash',
    question: 'How do you delete a stash with git stash drop and git stash clear?',
    answer: 'git stash drop stash@{n} removes one specific stash entry without applying it. git stash clear deletes the entire stash stack—use with caution as this is irreversible. Drop stashes you no longer need to reduce clutter; stale stashes confuse future you during git stash list. If a pop or apply succeeded and you used apply instead of pop, manually drop the stash afterward. In a real app, after successfully popping the hotfix WIP stash, drop any duplicate failed entries left from conflict attempts.',
    code: `# Drop latest stash without applying
git stash drop

# Drop specific stash
git stash drop stash@{3}

# Delete all stashes
git stash clear`,
  },
  {
    id: 74,
    category: 'Stash',
    question: 'What does git stash branch do?',
    answer: 'git stash branch <new-branch> creates a new branch starting from the commit where the stash was created, applies the stash there, and drops the stash if successful. This is safer than popping a stash onto the wrong branch when the stash context differs from your current HEAD. It preserves the original branch context the work belonged to. Use it when a stash is old and your current branch has moved significantly. In a real app, git stash branch feature/resume-work stash@{1} restores WIP on a fresh branch cut from where you originally stashed.',
    code: `# Create branch from stash creation point and apply
git stash branch feature/resume-work stash@{1}

# Shorthand: use latest stash
git stash branch feature/resume-work`,
  },
  {
    id: 75,
    category: 'Stash',
    question: 'How do you stash only specific files?',
    answer: 'git stash push -- <paths> stashes changes only in the listed files or directories, leaving other modifications in your working directory. Combine with -m for a message. This is useful when you want to temporarily clear one file conflicts while keeping the rest of your edits active. You can also use git stash -p for interactive hunk selection similar to git add -p. In a real app, stash only package-lock.json while continuing to edit component files during a dependency experiment.',
    code: `# Stash changes in specific files only
git stash push -m "lockfile only" -- package-lock.json

# Stash specific directory
git stash push -- src/experimental/

# Interactive stash (select hunks)
git stash -p`,
  },
  {
    id: 76,
    category: 'Stash',
    question: 'What does git stash -u (include-untracked) do?',
    answer: 'By default git stash only saves changes to tracked files. The -u flag (or --include-untracked) also stashes new untracked files, giving you a completely clean working directory. It does not stash ignored files unless you also pass -a (--all), which includes ignored files like node_modules—rarely desirable. Use -u when your WIP includes new files you have not git added yet. In a real app, stashing with -u before switching to main ensures your new scaffolded component files do not bleed into the wrong branch.',
    code: `# Stash tracked + untracked files
git stash -u

# Stash everything including ignored files (rare)
git stash -a

# Message with untracked
git stash push -u -m "WIP including new files"`,
  },
  {
    id: 77,
    category: 'Stash',
    question: 'How do you stash staged changes only with git stash --staged?',
    answer: 'git stash --staged (or --keep-index in older workflows) stashes only what is in the staging area, leaving unstaged working directory changes in place. Combined with a full stash, this enables complex workflows like testing only staged content. A common pattern is stage what is ready, stash --staged to set aside, then continue editing other parts. In a real app, you staged a finished API change but are still tweaking tests—stash --staged preserves the API snapshot while you keep hacking on tests.',
    code: `# Stash only staged changes
git stash --staged -m "ready API changes"

# Stash everything except staged (inverse workflow)
git stash push --keep-index -m "save unstaged WIP"`,
  },
  {
    id: 78,
    category: 'Stash',
    question: 'What happens when git stash pop causes merge conflicts?',
    answer: 'If applying a stash conflicts with current branch content, Git marks conflicted files and leaves the stash entry in the list (pop does not drop on conflict). Resolve conflicts manually, git add the files, but there is no stash commit to continue—you simply finish resolving and commit normally if needed. The stash remains at stash@{0} until you drop it after confirming the apply succeeded. In a real app, after pop conflicts in utils.ts, fix the file, add it, verify tests pass, then git stash drop to remove the applied stash.',
    code: `# Pop that may conflict
git stash pop

# If conflicts: edit files, then
git add src/utils.ts

# Stash remains after failed pop — drop when done
git stash drop`,
  },
  {
    id: 79,
    category: 'Stash',
    question: 'How do you create a commit from a stash without applying to working tree?',
    answer: 'git stash branch is the primary way to turn a stash into committed work on its own branch. Alternatively, git stash show -p stash@{n} | git apply lets you preview before applying. For a direct commit approach, create a branch, git stash apply, then commit the restored changes normally. Stashes are not shared—teammates cannot git stash pull. In a real app, when a stash represents a complete small feature, git stash branch feature/from-stash then commit and push formalizes the work.',
    code: `# Turn stash into branch with applied changes
git stash branch feature/from-stash stash@{0}

# Then commit as usual
git add .
git commit -m "feat: complete stashed notification work"
git push -u origin feature/from-stash`,
  },
]
