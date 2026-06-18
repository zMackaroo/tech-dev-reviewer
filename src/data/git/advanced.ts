import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 95,
    category: 'Advanced Commands',
    question: 'How do you create and push Git tags?',
    answer: 'git tag <name> creates a lightweight tag pointing at HEAD; git tag -a <name> -m "msg" creates an annotated tag with metadata, preferred for releases. Tags are not automatically pushed—use git push origin <tag> or git push --tags. List tags with git tag -l "v*". Tags mark specific points in history like v1.0.0 for deployments. In a real app, after QA approves a build, git tag -a v2.3.0 -m "Release 2.3.0" && git push origin v2.3.0 triggers the release pipeline.',
    code: `# Lightweight tag at HEAD
git tag v2.3.0-rc1

# Annotated release tag
git tag -a v2.3.0 -m "Release 2.3.0"

# List version tags
git tag -l "v*"

# Push tag to remote
git push origin v2.3.0`,
  },
  {
    id: 96,
    category: 'Advanced Commands',
    question: 'How does git bisect find a bad commit?',
    answer: 'git bisect performs a binary search through commit history to find which commit introduced a bug. Start with git bisect start, mark the current bad commit with git bisect bad, and mark a known good commit with git bisect good <hash>. Git checks out the middle commit; you test and mark good or bad until the culprit is isolated. git bisect reset returns to your original branch. In a real app, when tests passed last Tuesday but fail today, bisect between those commits finds the exact breaking change in minutes.',
    code: `git bisect start
git bisect bad                    # current commit is broken
git bisect good v1.9.0            # known good tag

# Git checks out middle commit — test, then:
git bisect good   # or git bisect bad

# Done — Git reports first bad commit
git bisect reset`,
  },
  {
    id: 97,
    category: 'Advanced Commands',
    question: 'What does git reflog show and why is it critical?',
    answer: 'git reflog records every position HEAD and branch refs have pointed to, including resets, rebases, and amended commits—even "deleted" history. Each entry has a timestamp and operation description. Use it to recover from mistakes like accidental git reset --hard or a bad rebase. Entries expire after gc.reflogExpire (default 90 days). In a real app, after git reset --hard discards three hours of work, git reflog finds the lost tip and git reset --hard HEAD@{2} restores it.',
    code: `# View HEAD movement history
git reflog

# Recover lost commit
git reset --hard HEAD@{3}

# Reflog for a specific branch
git reflog show feature/api`,
  },
  {
    id: 98,
    category: 'Advanced Commands',
    question: 'What are git submodules and basic commands?',
    answer: 'Submodules let you embed one Git repository inside another at a fixed commit pointer, common for shared libraries or vendored dependencies. git submodule add <url> <path> registers a submodule; git submodule update --init --recursive clones and checks out submodule commits after cloning the parent. Submodules require explicit updates—git pull on the parent does not auto-update submodule content. In a real app, a docs repo submodule pinned to a specific commit keeps generated API docs consistent across app releases.',
    code: `# Add a submodule
git submodule add https://github.com/org/shared-ui.git libs/shared-ui

# Initialize submodules after cloning parent
git submodule update --init --recursive

# Update submodule to latest remote commit
cd libs/shared-ui && git pull origin main`,
  },
  {
    id: 99,
    category: 'Advanced Commands',
    question: 'What does git worktree let you do?',
    answer: 'git worktree add lets you check out multiple branches simultaneously in separate directories linked to the same repository, without cloning again or stashing. Each worktree has its own working directory but shares the same .git object database. Use it to review a PR on one branch while actively developing on another. Remove with git worktree remove. In a real app, git worktree add ../my-app-hotfix hotfix/critical-bug lets you fix production in a side folder while keeping feature work open in the main directory.',
    code: `# Add worktree for another branch
git worktree add ../my-app-hotfix hotfix/critical-bug

# List worktrees
git worktree list

# Remove worktree when done
git worktree remove ../my-app-hotfix`,
  },
  {
    id: 100,
    category: 'Advanced Commands',
    question: 'How do you create an archive of the repository with git archive?',
    answer: 'git archive exports a snapshot of the repository at a given commit or tag as a tar or zip file without the .git directory—ideal for release artifacts and deployment bundles. --format specifies output type; --output sets the filename. Pass a tree-ish (commit, tag, branch) and optional paths to include only subdirectories. In a real app, git archive --format=zip --output=release-v2.3.0.zip v2.3.0 produces a clean deployable zip for a PHP app without dev history.',
    code: `# Zip archive of a tag
git archive --format=zip --output=release-v2.3.0.zip v2.3.0

# Tar.gz of a subdirectory at HEAD
git archive --format=tar.gz --output=dist.tar.gz HEAD:src

# List archive contents without creating file
git archive --list`,
  },
  {
    id: 101,
    category: 'Advanced Commands',
    question: 'What does git fsck do?',
    answer: 'git fsck (file system check) validates the integrity of Git object database, detecting corrupted blobs, missing objects, dangling commits, and broken links. Run it when you suspect repository corruption after disk errors or interrupted operations. It reports issues but does not auto-fix most problems. Dangling commits may be recoverable via reflog or git show. In a real app, after a crash during a large fetch, git fsck --full verifies objects before you continue development.',
    code: `# Check repository integrity
git fsck

# Full check including connectivity
git fsck --full

# Find dangling commits (possible recovery)
git fsck --lost-found`,
  },
  {
    id: 102,
    category: 'Advanced Commands',
    question: 'What is git sparse-checkout?',
    answer: 'git sparse-checkout limits your working directory to a subset of files in a large repository (monorepos), so you only checkout packages you work on. Enable with git sparse-checkout init --cone and set paths with git sparse-checkout set <dirs>. Requires partial clone or filter for best performance on huge repos. Git 2.25+ integrates sparse-checkout into the main workflow. In a real app, in a 10-package monorepo, sparse-checkout set apps/web packages/ui checks out only those folders, saving disk and IDE indexing time.',
    code: `# Enable cone-mode sparse checkout
git sparse-checkout init --cone

# Checkout only needed directories
git sparse-checkout set apps/web packages/ui

# List current sparse patterns
git sparse-checkout list

# Disable sparse checkout
git sparse-checkout disable`,
  },
  {
    id: 103,
    category: 'Advanced Commands',
    question: 'How do you delete a tag locally and remotely?',
    answer: 'git tag -d <name> removes a tag locally. To remove from remote, use git push origin --delete <tag> or git push origin :refs/tags/<name>. Deleting a remote release tag does not delete GitHub release assets automatically on all platforms—check your hosting provider. Never delete tags others depend on without coordination. In a real app, after tagging v2.0.0 on the wrong commit, delete locally and remotely, then recreate the tag on the correct commit.',
    code: `# Delete local tag
git tag -d v2.0.0

# Delete remote tag
git push origin --delete v2.0.0

# Recreate on correct commit
git tag -a v2.0.0 correct_hash -m "Release 2.0.0"
git push origin v2.0.0`,
  },
  {
    id: 104,
    category: 'Advanced Commands',
    question: 'What is git filter-repo and when use it over filter-branch?',
    answer: 'git filter-repo (external tool, recommended by Git docs) rewrites history to remove secrets, large files, or paths from all commits—replacing the deprecated git filter-branch. It is faster, safer, and easier to use for purging credentials accidentally committed. After filtering, force-push and have all collaborators re-clone. In a real app, if API keys land in config.json history, filter-repo removes the file from every commit before the repo is made public.',
    code: `# Install: pip install git-filter-repo
# Remove a file from all history
git filter-repo --path secrets.json --invert-paths

# After rewrite, all hashes change — team must re-clone
git push --force --all origin`,
  },
]
