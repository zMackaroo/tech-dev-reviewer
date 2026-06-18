import type { InterviewQuestion } from '../../types'

export const configQuestions: InterviewQuestion[] = [
  {
    id: 105,
    category: 'Config & Aliases',
    question: 'How does git config work and what are the scope levels?',
    answer: 'git config sets repository, user, or system options that control Git behavior. --local (default) writes to .git/config for the current repo only. --global writes to ~/.gitconfig for your user account across all repos. --system applies machine-wide. More specific scopes override broader ones. View settings with git config --list or git config <key>. In a real app, set user.email globally for identity but use local config for project-specific push URLs on a client fork.',
    code: `# Set local repo config
git config user.email "you@company.com"

# Set global config for all repos
git config --global user.name "Your Name"

# List all effective settings
git config --list --show-origin`,
  },
  {
    id: 106,
    category: 'Config & Aliases',
    question: 'How do you set user.name and user.email?',
    answer: 'Git embeds user.name and user.email in every commit you create as author metadata. Set them with git config --global user.name and user.email before your first commit on a new machine. Use --local to override for work vs personal repos with different identities. git log and GitHub attribution depend on correct values. In a real app, global config uses your personal GitHub email while a work repo sets local user.email to your company address for commit attribution on the org account.',
    code: `git config --global user.name "Jane Developer"
git config --global user.email "jane@example.com"

# Per-repo override
git config --local user.email "jane@company.com"

# Verify
git config user.email`,
  },
  {
    id: 107,
    category: 'Config & Aliases',
    question: 'How do you create Git aliases?',
    answer: 'git config alias.<name> "<command>" creates a shortcut expanding to any Git command or shell snippet. Aliases run with git <name>—for example alias.st = status lets you type git st. Use ! prefix for shell commands like !git checkout. Aliases save typing for frequent operations and can encode team conventions. In a real app, alias.lg = log --oneline --graph --decorate -20 becomes your daily history scanner.',
    code: `# Simple alias
git config --global alias.st status

# Pretty log alias
git config --global alias.lg "log --oneline --graph --decorate -20"

# Use aliases
git st
git lg

# Shell alias with !
git config --global alias.undo "reset HEAD~1 --mixed"`,
  },
  {
    id: 108,
    category: 'Config & Aliases',
    question: 'What belongs in .gitignore and how does it work?',
    answer: '.gitignore lists file patterns Git should never track—build output, dependencies, secrets, OS files, and IDE caches. Patterns use glob syntax; ** matches directories recursively. Each repo has its own .gitignore committed to source control so the whole team shares rules. Already-tracked files are not ignored until removed with git rm --cached. In a real app, .gitignore excludes node_modules/, dist/, .env, and .DS_Store so they never appear in git status or accidental commits.',
    code: `# .gitignore example
node_modules/
dist/
.env
.env.local
*.log
.DS_Store

# Stop tracking a file already committed
git rm --cached .env`,
  },
  {
    id: 109,
    category: 'Config & Aliases',
    question: 'How do you configure the default Git editor?',
    answer: 'Git opens an editor for commit messages, interactive rebase, and merge messages when you omit -m. Set core.editor to your preferred tool: git config --global core.editor "code --wait" for VS Code, "vim", or "nano". The --wait flag is required for GUI editors so Git waits until you close the file. GIT_EDITOR environment variable also works per session. In a real app, setting core.editor to your IDE integrates commit message editing with spell-check and snippets.',
    code: `# VS Code as editor
git config --global core.editor "code --wait"

# Vim
git config --global core.editor "vim"

# One-off for single command
GIT_EDITOR=nano git commit`,
  },
  {
    id: 110,
    category: 'Config & Aliases',
    question: 'What is a credential helper and how do you configure it?',
    answer: 'Credential helpers store and retrieve Git hosting credentials so you are not prompted for username/password on every push. macOS uses osxkeychain, Windows uses wincred, Linux often uses cache or libsecret. Set with git config --global credential.helper <helper>. For HTTPS remotes, this caches tokens securely in the OS keychain. SSH keys are an alternative that bypass HTTPS credential prompts entirely. In a real app, git config --global credential.helper osxkeychain stores your GitHub PAT after the first push on a Mac.',
    code: `# macOS Keychain
git config --global credential.helper osxkeychain

# Cache credentials in memory for 1 hour
git config --global credential.helper 'cache --timeout=3600'

# List config
git config --global --get credential.helper`,
  },
]
