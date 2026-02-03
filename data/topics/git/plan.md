# Git Topic Plan / Kế hoạch Topic Git

## Tổng quan / Overview

Tạo topic "git" trong `interview-viewer\data\topics` để lưu trữ toàn bộ tài liệu phỏng vấn về Git, bao gồm Git cơ bản, Git nâng cao và Git trong thực tế (best practices, CI/CD integration).

## Cấu trúc thư mục / Directory Structure

```
interview-viewer/data/topics/git/
├── README.md
├── plan.md
├── questions.md
└── answers/
    ├── 01-git-fundamentals.md
    ├── 02-git-installation-setup.md
    ├── 03-git-configuration.md
    ├── 04-git-repository.md
    ├── 05-git-staging-area.md
    ├── 06-git-commit.md
    ├── 07-git-diff.md
    ├── 08-git-log.md
    ├── 09-git-undo-changes.md
    ├── 10-git-branching-basics.md
    ├── 11-git-branching-advanced.md
    ├── 12-git-merge.md
    ├── 13-git-rebase.md
    ├── 14-git-merge-vs-rebase.md
    ├── 15-git-remote-repositories.md
    ├── 16-git-fetch-pull.md
    ├── 17-git-push.md
    ├── 18-git-remote-branches.md
    ├── 19-git-stash.md
    ├── 20-git-tag.md
    ├── 21-git-ignore.md
    ├── 22-git-workflows.md
    ├── 23-git-conflict-resolution.md
    ├── 24-git-bisect.md
    ├── 25-git-blame.md
    ├── 26-git-reflog.md
    ├── 27-git-clean.md
    ├── 28-git-submodules.md
    ├── 29-git-hooks.md
    ├── 30-git-lfs.md
    ├── 31-git-best-practices.md
    ├── 32-git-commit-message.md
    ├── 33-git-security.md
    ├── 34-git-performance.md
    ├── 35-git-troubleshooting.md
    ├── 36-git-github.md
    ├── 37-git-gitlab.md
    ├── 38-git-cicd-integration.md
    ├── 39-git-team-collaboration.md
    ├── 40-git-code-review.md
    ├── 41-git-advanced-commands.md
    ├── 42-git-internals.md
    ├── 43-git-alternatives.md
    ├── 44-git-history-visualization.md
    ├── 45-git-patching.md
    ├── 46-git-worktree.md
    ├── 47-git-sparse-checkout.md
    ├── 48-git-partial-clone.md
    ├── 49-git-maintenance.md
    └── 50-git-tips-tricks.md
```

## Danh sách file cần tạo / List of Files to Create

### Phần 1: Git Cơ bản (10 files) / Git Basics

| STT | File                         | Chủ đề                   | Mô tả                                                    |
| --- | ---------------------------- | ------------------------ | -------------------------------------------------------- |
| 1   | 01-git-fundamentals.md       | Git Fundamentals         | Git là gì, lịch sử, khái niệm cơ bản, cách Git hoạt động |
| 2   | 02-git-installation-setup.md | Git Installation & Setup | Cài đặt Git trên các OS, cấu hình ban đầu                |
| 3   | 03-git-configuration.md      | Git Configuration        | Git config, user.name, user.email, aliases               |
| 4   | 04-git-repository.md         | Git Repository           | Khởi tạo repository, clone, .git directory               |
| 5   | 05-git-staging-area.md       | Git Staging Area         | Staging area, git add, working directory                 |
| 6   | 06-git-commit.md             | Git Commit               | Git commit, commit message, amend                        |
| 7   | 07-git-diff.md               | Git Diff                 | git diff, git diff --staged, git diff HEAD               |
| 8   | 08-git-log.md                | Git Log                  | git log, git log --oneline, git log --graph              |
| 9   | 09-git-undo-changes.md       | Git Undo Changes         | git reset, git checkout, git revert, git restore         |
| 10  | 10-git-branching-basics.md   | Git Branching Basics     | Git branch, git checkout, git switch                     |

### Phần 2: Git Nâng cao (15 files) / Git Advanced

| STT | File                          | Chủ đề                  | Mô tả                                                      |
| --- | ----------------------------- | ----------------------- | ---------------------------------------------------------- |
| 11  | 11-git-branching-advanced.md  | Git Branching Advanced  | Git branch -d, -D, tracking branches, detached HEAD        |
| 12  | 12-git-merge.md               | Git Merge               | Git merge, fast-forward, 3-way merge, merge conflicts      |
| 13  | 13-git-rebase.md              | Git Rebase              | Git rebase, interactive rebase, rebase conflicts           |
| 14  | 14-git-merge-vs-rebase.md     | Git Merge vs Rebase     | So sánh merge và rebase, khi nào dùng cái nào              |
| 15  | 15-git-remote-repositories.md | Git Remote Repositories | Git remote, git remote add, git remote -v                  |
| 16  | 16-git-fetch-pull.md          | Git Fetch & Pull        | Git fetch, git pull, git pull --rebase                     |
| 17  | 17-git-push.md                | Git Push                | Git push, git push -u, git push -f, git push --tags        |
| 18  | 18-git-remote-branches.md     | Git Remote Branches     | Tracking branches, upstream, git branch --set-upstream     |
| 19  | 19-git-stash.md               | Git Stash               | Git stash, git stash pop, git stash list, git stash drop   |
| 20  | 20-git-tag.md                 | Git Tag                 | Git tag, annotated tags, lightweight tags, git push --tags |
| 21  | 21-git-ignore.md              | Git Ignore              | .gitignore, git ignore, git check-ignore                   |
| 22  | 22-git-workflows.md           | Git Workflows           | Git Flow, GitHub Flow, Trunk-based development             |
| 23  | 23-git-conflict-resolution.md | Git Conflict Resolution | Xử lý conflict, merge tools, conflict markers              |
| 24  | 24-git-bisect.md              | Git Bisect              | Git bisect, binary search for bugs                         |
| 25  | 25-git-blame.md               | Git Blame               | Git blame, git annotate, tìm ai đã thay đổi code           |

### Phần 3: Git Nâng cao hơn (10 files) / Git More Advanced

| STT | File                      | Chủ đề              | Mô tả                                                      |
| --- | ------------------------- | ------------------- | ---------------------------------------------------------- |
| 26  | 26-git-reflog.md          | Git Reflog          | Git reflog, khôi phục commits đã xóa, HEAD@{n}             |
| 27  | 27-git-clean.md           | Git Clean           | Git clean, xóa untracked files                             |
| 28  | 28-git-submodules.md      | Git Submodules      | Git submodule, quản lý dependencies                        |
| 29  | 29-git-hooks.md           | Git Hooks           | Git hooks, pre-commit, post-commit, client/server hooks    |
| 30  | 30-git-lfs.md             | Git LFS             | Git Large File Storage, quản lý large files                |
| 31  | 31-git-best-practices.md  | Git Best Practices  | Best practices, conventions, guidelines                    |
| 32  | 32-git-commit-message.md  | Git Commit Message  | Conventional Commits, commit message format                |
| 33  | 33-git-security.md        | Git Security        | Git security, signing commits, secrets management          |
| 34  | 34-git-performance.md     | Git Performance     | Git performance optimization, shallow clone, partial clone |
| 35  | 35-git-troubleshooting.md | Git Troubleshooting | Common issues, solutions, debugging techniques             |

### Phần 4: Git trong Thực tế (15 files) / Git in Practice

| STT | File                            | Chủ đề                    | Mô tả                                                      |
| --- | ------------------------------- | ------------------------- | ---------------------------------------------------------- |
| 36  | 36-git-github.md                | Git & GitHub              | GitHub features, PR, Issues, Actions, GitHub CLI           |
| 37  | 37-git-gitlab.md                | Git & GitLab              | GitLab features, MR, CI/CD, GitLab CI                      |
| 38  | 38-git-cicd-integration.md      | Git CI/CD Integration     | Git trong CI/CD pipelines, automated deployments           |
| 39  | 39-git-team-collaboration.md    | Git Team Collaboration    | Collaboration patterns, code ownership, review process     |
| 40  | 40-git-code-review.md           | Git Code Review           | Code review process, PR review, review checklist           |
| 41  | 41-git-advanced-commands.md     | Git Advanced Commands     | Git cherry-pick, git filter-branch, git subtree            |
| 42  | 42-git-internals.md             | Git Internals             | Git objects, blobs, trees, commits, refs, pack files       |
| 43  | 43-git-alternatives.md          | Git Alternatives          | Mercurial, SVN, Perforce, so sánh với Git                  |
| 44  | 44-git-history-visualization.md | Git History Visualization | Git log --graph, gitk, GUI tools, visualization techniques |
| 45  | 45-git-patching.md              | Git Patching              | Git format-patch, git am, git apply, patch files           |
| 46  | 46-git-worktree.md              | Git Worktree              | Git worktree, work multiple branches simultaneously        |
| 47  | 47-git-sparse-checkout.md       | Git Sparse Checkout       | Git sparse-checkout, partial repository checkout           |
| 48  | 48-git-partial-clone.md         | Git Partial Clone         | Git partial clone, blobless, treeless clones               |
| 49  | 49-git-maintenance.md           | Git Maintenance           | Git maintenance, git gc, git prune, repository health      |
| 50  | 50-git-tips-tricks.md           | Git Tips & Tricks         | Tips, tricks, shortcuts, productivity hacks                |

## Nội dung chi tiết từng file / Detailed Content per File

### 01-git-fundamentals.md

- Git là gì?
- Lịch sử phát triển của Git
- Sự khác biệt giữa Git và các VCS khác (SVN, Mercurial)
- Distributed vs Centralized VCS
- Git workflow cơ bản
- Git object model
- Git three states: working directory, staging area, repository

### 02-git-installation-setup.md

- Cài đặt Git trên Windows, macOS, Linux
- Git GUI clients (GitHub Desktop, GitKraken, SourceTree)
- Git command line setup
- Verifying installation
- Git version check
- First-time setup steps

### 03-git-configuration.md

- git config --global, --local, --system
- user.name và user.email
- git config --list
- Git aliases
- Default branch name
- Line ending settings (core.autocrlf)
- Merge tools configuration

### 04-git-repository.md

- git init
- git clone
- .git directory structure
- HEAD file
- refs/heads/, refs/tags/, refs/remotes/
- objects/ directory
- Bare repository vs non-bare repository

### 05-git-staging-area.md

- Git staging area (index)
- git add file
- git add .
- git add -A
- git add -p (patch mode)
- git restore --staged
- git reset HEAD
- Understanding staged vs unstaged changes

### 06-git-commit.md

- git commit
- git commit -m
- git commit -am
- git commit --amend
- Commit message best practices
- Empty commits
- Skipping hooks with --no-verify
- Commit signing

### 07-git-diff.md

- git diff (working vs staged)
- git diff --staged (staged vs HEAD)
- git diff HEAD (working vs HEAD)
- git diff --stat
- git diff --color-words
- git diff branch1 branch2
- git diff file1 file2

### 08-git-log.md

- git log
- git log --oneline
- git log --graph
- git log --all
- git log --decorate
- git log -n
- git log --since, --until
- git log --author
- git log --grep
- git log -p (show patches)

### 09-git-undo-changes.md

- git restore file (discard working changes)
- git restore --staged file (unstage)
- git reset --soft HEAD~n
- git reset --mixed HEAD~n (default)
- git reset --hard HEAD~n
- git revert commit
- Sự khác biệt giữa reset và revert

### 10-git-branching-basics.md

- Git branch là gì?
- git branch
- git branch branchname
- git checkout branchname
- git switch branchname
- git checkout -b branchname
- git switch -c branchname
- git branch -d branchname

### 11-git-branching-advanced.md

- Detached HEAD state
- git branch -D (force delete)
- git branch -m (rename)
- git branch --merged
- git branch --no-merged
- Tracking branches
- git branch --set-upstream-to
- git branch -u

### 12-git-merge.md

- git merge branchname
- Fast-forward merge
- 3-way merge
- Merge commit
- git merge --no-ff
- git merge --squash
- Merge conflicts
- git merge --abort

### 13-git-rebase.md

- git rebase branchname
- Interactive rebase (git rebase -i)
- Rebase vs merge
- git rebase --onto
- Rebase conflicts
- git rebase --continue, --abort, --skip
- Rebase best practices

### 14-git-merge-vs-rebase.md

- So sánh merge và rebase
- Khi nào dùng merge
- Khi nào dùng rebase
- Ưu nhược điểm của từng cách
- Impact on history
- Team considerations
- Golden rule of rebase

### 15-git-remote-repositories.md

- git remote
- git remote -v
- git remote add origin URL
- git remote remove origin
- git remote rename old new
- git remote set-url origin URL
- Git protocols (HTTPS, SSH, Git)

### 16-git-fetch-pull.md

- git fetch
- git fetch origin
- git fetch --all
- git pull
- git pull --rebase
- Sự khác biệt giữa fetch và pull
- git pull origin branchname

### 17-git-push.md

- git push
- git push -u origin branchname
- git push origin branchname
- git push --all
- git push --tags
- git push -f (force push)
- git push --force-with-lease
- Handling rejected pushes

### 18-git-remote-branches.md

- Tracking branches
- Upstream branches
- git branch -vv (show tracking)
- git branch --set-upstream-to
- git push -u
- git branch -r (list remote branches)
- git checkout -b local origin/remote

### 19-git-stash.md

- git stash
- git stash save "message"
- git stash list
- git stash pop
- git stash apply
- git stash drop
- git stash clear
- git stash branch
- Stashing untracked files

### 20-git-tag.md

- Lightweight tags
- Annotated tags
- git tag tagname
- git tag -a tagname -m "message"
- git tag -l
- git show tagname
- git push origin tagname
- git push --tags
- Deleting tags

### 21-git-ignore.md

- .gitignore file
- .gitignore patterns
- git ignore file
- git check-ignore
- git check-ignore -v
- .gitignore precedence
- Ignoring tracked files
- Global .gitignore

### 22-git-workflows.md

- Centralized Workflow
- Feature Branch Workflow
- Gitflow Workflow
- Forking Workflow
- GitHub Flow
- Trunk-based Development
- Choosing the right workflow

### 23-git-conflict-resolution.md

- Merge conflict markers (<<<<<<<, =======, >>>>>>>)
- git status during conflict
- Resolving conflicts manually
- Using merge tools (git mergetool)
- git merge --continue
- git merge --abort
- Best practices for avoiding conflicts

### 24-git-bisect.md

- git bisect start
- git bisect bad
- git bisect good
- git bisect run
- git bisect reset
- Binary search for bugs
- Automated bisecting

### 25-git-blame.md

- git blame filename
- git blame -L start,end filename
- git blame -M (detect moved lines)
- git blame -C (detect copied lines)
- Understanding blame output
- Using blame for code review

### 26-git-reflog.md

- git reflog
- git reflog show HEAD
- HEAD@{n} syntax
- Recovering lost commits
- git reset --hard HEAD@{n}
- Reflog expiration
- Reflog vs git log

### 27-git-clean.md

- git clean -f
- git clean -fd
- git clean -n (dry run)
- git clean -x (remove ignored files)
- git clean -i (interactive)
- Removing untracked files
- Safety considerations

### 28-git-submodules.md

- git submodule add URL
- git submodule init
- git submodule update
- git submodule update --init --recursive
- Cloning with submodules
- Removing submodules
- Submodule best practices

### 29-git-hooks.md

- Client-side hooks (pre-commit, commit-msg, post-commit)
- Server-side hooks (pre-receive, update, post-receive)
- Hook location (.git/hooks/)
- Sample hooks
- Writing custom hooks
- Hook examples
- Bypassing hooks (--no-verify)

### 30-git-lfs.md

- Git LFS overview
- Installing Git LFS
- git lfs track "\*.extension"
- git lfs track
- git lfs ls-files
- git lfs pull
- git lfs push
- LFS server requirements

### 31-git-best-practices.md

- Commit early, commit often
- Write meaningful commit messages
- Keep commits atomic
- Don't commit broken code
- Use branches for features
- Review before merging
- Keep history clean
- Document decisions

### 32-git-commit-message.md

- Conventional Commits specification
- Format: type(scope): subject
- Types: feat, fix, docs, style, refactor, test, chore
- Subject line rules
- Body and footer
- Examples of good messages
- Commit message tools

### 33-git-security.md

- Signing commits with GPG
- git commit -S
- git tag -s
- Verifying signatures
- Secrets in repositories
- git-secrets tool
- .gitignore for sensitive files
- Access control

### 34-git-performance.md

- Shallow clone (git clone --depth 1)
- Partial clone (git clone --filter)
- Sparse checkout
- Git gc (garbage collection)
- Git prune
- Large file handling
- Network optimization
- Repository size management

### 35-git-troubleshooting.md

- Common error messages
- "fatal: refusing to merge unrelated histories"
- "error: failed to push some refs"
- Merge conflict resolution
- Detached HEAD recovery
- Corrupted repository
- Permission issues
- Network problems

### 36-git-github.md

- GitHub features overview
- Pull Requests (PR)
- Issues
- GitHub Actions
- GitHub Pages
- GitHub CLI (gh)
- GitHub Codespaces
- GitHub Security

### 37-git-gitlab.md

- GitLab features overview
- Merge Requests (MR)
- Issues and Boards
- GitLab CI/CD
- GitLab Registry
- GitLab Pages
- GitLab API
- GitLab Security

### 38-git-cicd-integration.md

- Git in CI/CD pipelines
- Triggering builds on commit
- Git checkout in CI
- Shallow clones in CI
- Git credentials in CI
- Automated deployments
- Git hooks in CI/CD
- Version tagging in CI/CD

### 39-git-team-collaboration.md

- Collaboration patterns
- Code ownership
- Review process
- Branch naming conventions
- Commit conventions
- Release process
- Onboarding new team members
- Git training for teams

### 40-git-code-review.md

- Code review process
- Pull Request/Merge Request workflow
- Review checklist
- Review comments and suggestions
- Addressing review feedback
- Review tools and integrations
- Review metrics
- Best practices

### 41-git-advanced-commands.md

- git cherry-pick
- git filter-branch
- git subtree
- git archive
- git bundle
- git format-patch
- git am
- git apply

### 42-git-internals.md

- Git objects (blob, tree, commit, tag)
- SHA-1 hashing
- .git/objects/ directory
- refs and HEAD
- pack files
- index file
- Git DAG (Directed Acyclic Graph)

### 43-git-alternatives.md

- Mercurial (Hg)
- Subversion (SVN)
- Perforce
- Bazaar
- Comparison with Git
- Migration from other VCS
- When to use alternatives

### 44-git-history-visualization.md

- git log --graph
- gitk
- Git GUI tools
- GitHub commit graph
- GitLab commit graph
- Visualization best practices
- Understanding complex histories

### 45-git-patching.md

- git format-patch
- git am
- git apply
- git diff > patch
- Patch file format
- Applying patches
- Creating patches for review
- Email-based workflows

### 46-git-worktree.md

- git worktree add
- git worktree list
- git worktree remove
- git worktree prune
- Use cases for worktree
- Worktree vs branches
- Worktree best practices

### 47-git-sparse-checkout.md

- git sparse-checkout init
- git sparse-checkout set
- git sparse-checkout add
- git sparse-checkout disable
- Cone mode vs non-cone mode
- Use cases
- Performance benefits

### 48-git-partial-clone.md

- git clone --filter=blob:none
- git clone --filter=tree:0
- Partial clone concepts
- Fetching missing objects
- Use cases
- Limitations

### 49-git-maintenance.md

- git maintenance start
- git maintenance run
- git gc
- git prune
- git repack
- Repository health checks
- Maintenance schedules

### 50-git-tips-tricks.md

- Useful Git aliases
- Productivity shortcuts
- Git tricks
- Hidden features
- Git configuration tips
- Command line tips
- GUI tips
- Time-saving techniques

## Tiêu chuẩn nội dung / Content Standards

### Format file / File Format

Mỗi file answer sẽ tuân theo format sau:

```markdown
# [Số thứ tự]. [Tên chủ đề] / [Topic Name]

## Tổng quan / Overview

### Mục đích / Purpose

...

### Khi nào cần / When to Use

...

### Giúp ích gì / Benefits

...

---

## [Câu hỏi 1]

### Mục đích / Purpose

...

### Khi nào dùng / When to Use

...

### Giúp ích gì / Benefits

...

### Ưu nhược điểm / Pros & Cons

...

### Cách sử dụng / How to Use

#### Cú pháp / Syntax

...

#### Ví dụ / Example

...

### Common Pitfalls / Lỗi thường gặp

...

### Best Practices / Thực hành tốt nhất

...
```

### Yêu cầu nội dung / Content Requirements

1. **Bilingual content**: Mọi nội dung phải có cả tiếng Việt và tiếng Anh
2. **Code examples**: Cung cấp ví dụ code thực tế cho mọi lệnh
3. **Tables**: Sử dụng bảng để so sánh và tóm tắt
4. **Mermaid diagrams**: Sử dụng diagram khi cần minh họa workflow
5. **Practical examples**: Các ví dụ phải thực tế và dễ hiểu
6. **Common pitfalls**: Nêu rõ các lỗi thường gặp và cách tránh
7. **Best practices**: Cung cấp các thực hành tốt nhất
8. **References**: Thêm links đến tài liệu chính thức khi cần

## Thứ tự thực hiện / Implementation Order

1. Tạo cấu trúc thư mục
2. Viết file plan.md
3. Viết file README.md
4. Viết file questions.md
5. Tạo các file answers theo thứ tự:
   - Phần 1: Git cơ bản (01-10)
   - Phần 2: Git nâng cao (11-25)
   - Phần 3: Git nâng cao hơn (26-35)
   - Phần 4: Git trong thực tế (36-50)
6. Review và hoàn thiện

## Lưu ý / Notes

- Số lượng câu hỏi: 50 câu
- Số lượng file answers: 50 files
- Ngôn ngữ: Tiếng Việt và tiếng Anh (bilingual)
- Format markdown
- Code examples trong các code blocks
- Sử dụng emoji cho các section headers
- Tuân thủ format của các topic hiện có
