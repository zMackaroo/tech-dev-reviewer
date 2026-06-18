import type { InterviewQuestion } from '../../types'

export const historyQuestions: InterviewQuestion[] = [
  {
    id: 29,
    category: 'History & Diff',
    question: 'What does git log --graph add to commit history output?',
    answer: 'git log --graph draws an ASCII art diagram of branch and merge history alongside each commit, making it easy to see where branches diverged and merged. It is most useful combined with --oneline and --all to visualize the entire repository topology. Without --graph, log output is a flat list that hides merge structure. Use it when debugging complex integration history or explaining branch strategy in a team review.',
    code: `# Graph of recent commits on current branch
git log --oneline --graph -15

# Graph across all branches
git log --oneline --graph --all -30

# Graph with decorations (branch/tag names)
git log --oneline --graph --decorate --all`,
  },
  {
    id: 30,
    category: 'History & Diff',
    question: 'How do you filter git log by author?',
    answer: 'git log --author="name" shows commits whose author field matches the given pattern (partial matches work). Combine with --since, --until, and path limits to narrow results further. This searches author metadata, not committer, unless you use --committer instead. It is invaluable for release notes, auditing contributions, or finding when a teammate introduced a change.',
    code: `# Commits by author (partial match)
git log --author="Jordan" --oneline

# Author plus date range
git log --author="Jordan" --since="2024-06-01" --until="2024-06-30"

# Filter by committer instead of author
git log --committer="ci-bot" --oneline`,
  },
  {
    id: 31,
    category: 'History & Diff',
    question: 'What useful formatting flags does git log support?',
    answer: 'Beyond --oneline, git log accepts --pretty=format:"..." for custom output templates showing hash, author, date, and subject in any layout. --stat appends a summary of files changed and line counts per commit. -p shows the full patch for each commit (verbose but thorough). -S"string" finds commits that added or removed a specific string. Use these flags to tailor output for scripts, changelogs, or deep investigation.',
    code: `# Custom format
git log --pretty=format:"%h %an %ad %s" --date=short -10

# Show stat summary per commit
git log --stat -5

# Find commits that changed a specific string
git log -S"API_BASE_URL" --oneline`,
  },
  {
    id: 32,
    category: 'History & Diff',
    question: 'What is the difference between git diff and git diff --staged?',
    answer: 'git diff compares your working directory to the staging area, revealing changes you have made but not yet staged with git add. git diff --staged (synonym --cached) compares the staging area to the last commit, showing exactly what will be included if you commit right now. Run both before committing to understand the full picture: unstaged edits plus staged edits.',
    code: `# Working tree vs staging area
git diff

# Staging area vs last commit
git diff --staged

# See both staged and unstaged for one file
git diff HEAD -- src/api.ts`,
  },
  {
    id: 33,
    category: 'History & Diff',
    question: 'What does git blame do and when should you use it?',
    answer: 'git blame annotates each line of a file with the commit hash, author, and date of the last change to that line. It answers who introduced a specific line and in which commit, without blaming people—it is a history tool. Use -L to limit to a line range and -w to ignore whitespace changes. Follow up with git show <hash> to see the full commit context.',
    code: `# Blame entire file
git blame src/components/PaymentForm.tsx

# Blame specific lines only
git blame -L 42,60 src/components/PaymentForm.tsx

# Ignore whitespace when attributing lines
git blame -w src/utils/parse.ts`,
  },
  {
    id: 34,
    category: 'History & Diff',
    question: 'How does git show differ from git log for inspecting commits?',
    answer: 'git log lists multiple commits with summary metadata, while git show focuses on a single object—typically one commit—and includes its full diff patch. git show defaults to HEAD if you pass no argument. It also works on blobs, trees, and tags. Use log to browse history and show to deeply inspect one changeset.',
    code: `# Show latest commit with full patch
git show

# Show specific commit
git show abc1234

# Show commit metadata without patch
git show --stat abc1234

# Show only the commit message
git show -s --format=%B abc1234`,
  },
  {
    id: 35,
    category: 'History & Diff',
    question: 'What does git shortlog provide?',
    answer: 'git shortlog summarizes git log output grouped by author, showing commit counts and optionally subject lines under each contributor. It is designed for generating contributor lists for release notes or open-source acknowledgments. Use -sn for a numbered summary sorted by commit count without individual messages. Add --since and --until to scope to a release window.',
    code: `# Summary: commits per author with subjects
git shortlog

# Numbered summary without commit messages
git shortlog -sn

# Contributors since a date
git shortlog -sn --since="2024-01-01"`,
  },
  {
    id: 36,
    category: 'History & Diff',
    question: 'How do you search commit messages and code history with git grep and git log -G?',
    answer: 'git grep searches file content in the working tree or a specific commit, like ripgrep built into Git. git log -G"pattern" finds commits where the number of occurrences of a regex in the diff changed—useful for finding when code was introduced or removed. git log -S"string" (pickaxe) finds commits that added or removed an exact string. Use grep for current code and log -G/-S for historical archaeology.',
    code: `# Search tracked files in working tree
git grep "TODO"

# Search with line numbers in a specific path
git grep -n "fetchUser" -- src/

# Commits where regex appearance changed
git log -G"deprecatedAuth" --oneline

# Commits that added/removed exact string
git log -S"API_BASE_URL" --oneline`,
  },
  {
    id: 37,
    category: 'History & Diff',
    question: 'How do you view the history of a single file with git log?',
    answer: 'Pass a file path after git log options to list only commits that modified that file: git log -- path/to/file. Add --follow to continue tracking history across renames, which Git does not do by default. Combine with -p to see the actual patch per commit for that file. This is essential for understanding how a module evolved.',
    code: `# Commits touching one file
git log --oneline -- src/auth/login.ts

# Follow renames
git log --follow --oneline -- src/auth/login.ts

# Full patch history for a file
git log -p --follow -- src/auth/login.ts`,
  },
  {
    id: 38,
    category: 'History & Diff',
    question: 'What does git diff HEAD show?',
    answer: 'git diff HEAD compares your entire working tree (both staged and unstaged changes) against the latest commit on your current branch. It is the union of git diff and git diff --staged, showing everything that differs from the last commit. Use it for a complete pre-commit overview when you have a mix of staged and unstaged edits. git diff HEAD -- <file> scopes to one file.',
    code: `# All uncommitted changes vs last commit
git diff HEAD

# Single file: all uncommitted changes
git diff HEAD -- package.json

# Compare last commit to its parent (previous commit)
git diff HEAD~1 HEAD`,
  },
  {
    id: 39,
    category: 'History & Diff',
    question: 'How do you limit git log by date or number of commits?',
    answer: 'Use -n <number> or -<number> to show only the most recent N commits. --since and --until accept dates like "2 weeks ago", "2024-06-01", or ISO timestamps. --after and --before are synonyms for since and until. Combining limits keeps output manageable on large repositories.',
    code: `# Last 5 commits
git log --oneline -5

# Commits in the last two weeks
git log --oneline --since="2 weeks ago"

# Commits in a specific window
git log --oneline --since="2024-06-01" --until="2024-06-15"`,
  },
  {
    id: 40,
    category: 'History & Diff',
    question: 'What does git diff --name-only and --stat provide?',
    answer: 'git diff --name-only lists just the paths of changed files without line-level diffs, ideal for scripting or quick overviews. git diff --stat adds a summary table showing files changed with insertion and deletion counts. Both work with any diff target: unstaged, staged, branches, or commits. Use name-only in CI scripts that only need to know which files changed.',
    code: `# Changed file names only (unstaged)
git diff --name-only

# Summary with line counts
git diff --stat

# Stat between branches (PR scope)
git diff --stat main...feature/reports`,
  },
  {
    id: 41,
    category: 'History & Diff',
    question: 'How do you compare a file between two commits or branches?',
    answer: 'git diff commit1 commit2 -- path/to/file shows how that file changed between two points in history. You can use branch names, tags, or hashes interchangeably. git show commit:path/to/file prints the file content as it existed at that commit without a diff. These commands help answer what changed in a config file between releases.',
    code: `# Diff one file between two tags
git diff v2.0.0 v2.1.0 -- config/production.json

# Show file content at a specific commit
git show abc1234:src/config.ts

# Diff file between branch tips
git diff main feature/api -- src/routes.ts`,
  },
  {
    id: 42,
    category: 'History & Diff',
    question: 'What does git log --merges and --no-merges filter?',
    answer: 'git log --merges shows only merge commits—commits with more than one parent—which stand out in a merge-based workflow. git log --no-merges excludes merge commits, showing only linear feature commits. Use --merges to audit integration points or find when a branch was merged. Use --no-merges for a cleaner changelog of actual feature work.',
    code: `# Only merge commits
git log --merges --oneline

# Exclude merge commits
git log --no-merges --oneline -20

# First-parent log (mainline history only)
git log --first-parent --oneline main`,
  },
]
