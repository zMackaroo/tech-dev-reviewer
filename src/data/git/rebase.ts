import type { InterviewQuestion } from '../../types'

export const rebaseQuestions: InterviewQuestion[] = [
  {
    id: 80,
    category: 'Rebase & Cherry-pick',
    question: 'What does git rebase do?',
    answer: 'git rebase replays your branch commits one by one on top of another branch tip, creating new commits with new hashes instead of merging. The result is a linear history without merge commits. Use it to update a feature branch with latest main: git switch feature && git rebase main. Conflicts are resolved per commit during the replay. Never rebase commits others are building on unless coordinated.',
    code: `# Rebase current branch onto main
git switch feature/dashboard
git rebase main

# Rebase onto a specific commit
git rebase abc1234

# Abort if things go wrong
git rebase --abort`,
  },
  {
    id: 81,
    category: 'Rebase & Cherry-pick',
    question: 'How does interactive rebase with git rebase -i work?',
    answer: 'git rebase -i <base> opens an editor listing commits from base to HEAD where you reorder, squash, fixup, edit, drop, or reword commits using single-letter commands. Squash combines commits into one; fixup squashes without keeping the message; reword changes commit messages. This is the primary tool for cleaning up history before merging a PR. The base is usually main or HEAD~n.',
    code: `# Interactive rebase last 5 commits
git rebase -i HEAD~5

# In editor: pick, squash, fixup, drop, reword
# pick abc1234 feat: add cart
# squash def5678 fix typo
# squash ghi9012 fix lint

# Rebase onto main interactively
git rebase -i main`,
  },
  {
    id: 82,
    category: 'Rebase & Cherry-pick',
    question: 'What does git cherry-pick do?',
    answer: 'git cherry-pick applies the changes from a specific commit onto your current branch as a new commit with a new hash. It copies one commit without merging entire branches—ideal for backporting bug fixes to release branches. If conflicts arise, resolve them, git add, and git cherry-pick --continue. Use -n to apply without committing so you can combine with other changes.',
    code: `# Apply one commit to current branch
git cherry-pick abc1234

# Cherry-pick without committing
git cherry-pick -n abc1234

# Cherry-pick a range
git cherry-pick abc1234..def5678`,
  },
  {
    id: 83,
    category: 'Rebase & Cherry-pick',
    question: 'When do you use git rebase --continue, --skip, and --abort?',
    answer: 'During a rebase, Git pauses when a commit hits conflicts. After resolving conflicts and staging files, git rebase --continue proceeds to the next commit. --skip drops the current commit entirely and moves on—use sparingly as it discards that commit changes. --abort cancels the entire rebase and returns to the pre-rebase state. Cherry-pick uses the same continue/abort pattern.',
    code: `# After resolving rebase conflict
git add src/conflicted.ts
git rebase --continue

# Skip problematic commit (destructive)
git rebase --skip

# Cancel entire rebase
git rebase --abort`,
  },
  {
    id: 84,
    category: 'Rebase & Cherry-pick',
    question: 'How do you squash commits during an interactive rebase?',
    answer: 'In git rebase -i, mark the first commit as pick and subsequent commits you want combined as squash or fixup. Squash merges commit messages into one (you edit the combined message); fixup merges but discards the secondary messages. Save and close the editor; Git replays and combines them. The result is one commit where there were many.',
    code: `# Start interactive rebase
git rebase -i HEAD~6

# Editor content example:
# pick a1b2c3d feat: add settings page scaffold
# fixup d4e5f6g fix styles
# fixup h7i8j9k fix tests
# fixup l0m1n2o address review
# fixup p3q4r5s fix typo
# fixup t6u7v8w fix lint`,
  },
  {
    id: 85,
    category: 'Rebase & Cherry-pick',
    question: 'What is the difference between rebase and merge?',
    answer: 'Merge integrates two branch histories with a merge commit that preserves both timelines exactly as they happened. Rebase replays one branch commits on top of another, producing linear history without a merge commit but rewriting commit hashes on the rebased branch. Merge is safer for shared branches; rebase is preferred for cleaning local feature branches before integration. Neither is universally better—teams choose per workflow.',
    code: `# Merge: preserves branch topology
git switch develop
git merge feature/api

# Rebase: linear history on feature branch
git switch feature/api
git rebase main
git push --force-with-lease origin feature/api`,
  },
  {
    id: 86,
    category: 'Rebase & Cherry-pick',
    question: 'What is the golden rule of rebasing?',
    answer: 'Never rebase commits that have been pushed to a shared branch others may have based work on, because rebase rewrites history and changes commit hashes, breaking collaborators clones and PRs. Rebase only local commits or your own feature branches where you alone work, then force-push with lease if already published. Shared branches like main and develop should receive merges, not rebases.',
    code: `# Safe: rebase local feature branch
git switch feature/login
git rebase main

# Safe push after rebase (your branch only)
git push --force-with-lease origin feature/login

# Unsafe on shared branch:
# git switch main && git rebase feature/x  # do not do this`,
  },
  {
    id: 87,
    category: 'Rebase & Cherry-pick',
    question: 'How do you reword a commit message with interactive rebase?',
    answer: 'In git rebase -i, change pick to reword (or r) for any commit whose message you want to edit. When Git reaches that commit during replay, it opens your editor with the current message for modification. You can reword multiple commits in one interactive session. This only affects local history until you push.',
    code: `# Interactive rebase to reword
git rebase -i HEAD~3

# Editor:
# reword abc1234 fix stuff
# pick def5678 feat: add tests
# pick ghi9012 chore: update docs

# Git opens editor for new message on reword commit`,
  },
  {
    id: 88,
    category: 'Rebase & Cherry-pick',
    question: 'What does git rebase --onto do?',
    answer: 'git rebase --onto <newbase> <upstream> moves commits from upstream (exclusive) to HEAD onto newbase, letting you transplant a slice of commits to a different branch point. The three-argument form is powerful for extracting commits from a messy branch or dropping bad merge bases. It is advanced but invaluable for history surgery.',
    code: `# Move commits after <upstream> onto <newbase>
git rebase --onto main bad-branch tip-of-good-commits

# Simpler: rebase last 3 commits onto main
git rebase --onto main HEAD~3`,
  },
  {
    id: 89,
    category: 'Rebase & Cherry-pick',
    question: 'How do you abort or continue a cherry-pick?',
    answer: 'When git cherry-pick stops due to conflicts, fix the files, git add them, then git cherry-pick --continue to create the cherry-pick commit. git cherry-pick --abort restores the branch to its pre-cherry-pick state entirely. --skip abandons the current commit and tries the next in a range. These mirror rebase conflict controls.',
    code: `# After resolving cherry-pick conflict
git add src/config.ts
git cherry-pick --continue

# Cancel cherry-pick entirely
git cherry-pick --abort

# Skip current commit in a range pick
git cherry-pick --skip`,
  },
  {
    id: 90,
    category: 'Rebase & Cherry-pick',
    question: 'What does git pull --rebase origin main do step by step?',
    answer: 'It first runs git fetch origin to update remote-tracking branches, then git rebase origin/main to replay your local commits on top of the fetched main tip. Unlike pull with merge, no merge commit is created. If you have uncommitted changes, stash first or commit—rebase requires a clean working tree by default. Configure pull.rebase true to make this default.',
    code: `# Fetch + rebase onto origin/main
git pull --rebase origin main

# Equivalent manual steps
git fetch origin
git rebase origin/main

# Autostash uncommitted changes during rebase pull
git pull --rebase --autostash origin main`,
  },
  {
    id: 91,
    category: 'Rebase & Cherry-pick',
    question: 'How do you drop a commit during interactive rebase?',
    answer: 'In the git rebase -i todo list, change pick to drop (or d) for any commit you want removed from history entirely. That commit changes are discarded and not included in the replay. Use drop to remove accidental commits, secrets, or experimental dead ends from a feature branch before merge. Dropped commits can sometimes be recovered via reflog if the rebase just completed.',
    code: `# Interactive rebase
git rebase -i HEAD~4

# Editor — drop unwanted commit:
# pick abc1234 feat: add auth
# drop def5678 accidentally committed .env
# pick ghi9012 feat: add tests
# pick jkl0123 chore: docs`,
  },
  {
    id: 92,
    category: 'Rebase & Cherry-pick',
    question: 'What is autosquash in interactive rebase?',
    answer: 'If commits are created with git commit --fixup or --squash referencing an earlier commit, git rebase -i --autosquash automatically orders and marks them as fixup/squash in the todo list without manual editing. This streamlines the "commit review feedback as fixup" workflow. Run git rebase -i --autosquash main to absorb all fixup commits into their targets.',
    code: `# Create fixup commit targeting earlier commit
git commit --fixup abc1234

# Autosquash during interactive rebase
git rebase -i --autosquash main

# Squash variant (keeps message for editing)
git commit --squash abc1234`,
  },
  {
    id: 93,
    category: 'Rebase & Cherry-pick',
    question: 'How do you rebase a feature branch onto the latest main before opening a PR?',
    answer: 'Fetch latest main, switch to your feature branch, run git rebase origin/main, resolve any conflicts commit-by-commit, then push with --force-with-lease if the branch was already on the remote. This ensures your PR diff contains only your feature changes on top of current main. CI runs against the latest base, reducing merge surprises.',
    code: `git fetch origin
git switch feature/notifications
git rebase origin/main

# Resolve conflicts per commit if needed
git add .
git rebase --continue

git push --force-with-lease origin feature/notifications`,
  },
  {
    id: 94,
    category: 'Rebase & Cherry-pick',
    question: 'What does git cherry-pick -x add to a commit?',
    answer: 'git cherry-pick -x appends a "cherry picked from commit <hash>" line to the commit message, documenting the source commit for audit trails. This is especially valuable on release and hotfix branches where tracing the origin of a backported fix matters for compliance and debugging. Without -x, the cherry-picked commit looks like an independent change.',
    code: `# Cherry-pick with source reference in message
git cherry-pick -x abc1234

# Resulting message includes:
# cherry picked from commit abc1234567890...

# Cherry-pick mainline parent for merge commits
git cherry-pick -m 1 -x merge_commit_hash`,
  },
]
