# 43. Git Alternatives / Các lựa chọn thay thế Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu về các version control systems khác ngoài Git.

### Khi nào cần hiểu / When to Understand

- Khi cần chọn VCS cho project
- Khi cần migrate từ VCS khác
- Khi so sánh Git với alternatives

### Giá trị gì / Benefits

- Chọn VCS phù hợp
- Hiểu trade-offs
- Migrate hiệu quả

---

## Câu hỏi 1: Mercurial là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Mercurial và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Mercurial.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Migrate giữa VCS

### Định nghĩa / Definition

Mercurial (Hg) là distributed version control system tương tự Git nhưng với design khác.

### Ví dụ / Examples

```bash
# Mercurial commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
hg clone https://hg.example.com/repo

# Status
git status
hg status

# Add files
git add file.txt
hg add file.txt

# Commit
git commit -m "Message"
hg commit -m "Message"

# Push
git push origin main
hg push

# Pull
git pull
hg pull -u

# Branch
git branch feature
hg branch feature

# Checkout branch
git checkout feature
hg update feature

# Merge
git merge feature
hg merge feature

# Log
git log
hg log

# Diff
git diff
hg diff

# Mercurial features:
# - Easier learning curve
# - Better Windows support
# - Extensions system
# - Phases (public, secret, draft)
# - Built-in extensions (rebase, histedit, etc.)

# Git features:
# - Larger community
# - More tools
# - Better performance
# - More hosting platforms
```

### Best Practices

- Chọn Git cho new projects
- Hiểu Mercurial khi cần
- Migrate từ Mercurial khi cần

### Anti-patterns

- Chọn Mercurial mà không hiểu trade-offs
- Migrate mà không backup
- Không học Git khi cần

---

## Câu hỏi 2: Subversion (SVN) là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Subversion và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và SVN.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Migrate từ SVN

### Định nghĩa / Definition

Subversion (SVN) là centralized version control system khác với Git (distributed).

### Ví dụ / Examples

```bash
# SVN commands vs Git commands:

# Checkout repository
git clone https://github.com/user/repo.git
svn checkout https://svn.example.com/repo

# Status
git status
svn status

# Add files
git add file.txt
svn add file.txt

# Commit
git commit -m "Message"
svn commit -m "Message"

# Update
git pull
svn update

# Branch
git branch feature
svn copy trunk branches/feature

# Merge
git merge feature
svn merge branches/feature

# Log
git log
svn log

# Diff
git diff
svn diff

# SVN features:
# - Centralized model
# - Better for binary files
# - Fine-grained permissions
# - Atomic commits
# - Locking mechanism

# Git features:
# - Distributed model
# - Faster operations
# - Better branching/merging
# - Offline work
# - Staging area

# SVN use cases:
# - Large binary files
# - Centralized control
# - Fine-grained permissions
# - Legacy systems

# Git use cases:
# - Distributed teams
# - Frequent branching
# - Offline work
# - Modern development
```

### Best Practices

- Chọn Git cho new projects
- Hiểu SVN khi cần
- Migrate từ SVN khi cần

### Anti-patterns

- Chọn SVN cho new projects
- Migrate mà không backup
- Không học Git khi cần

---

## Câu hỏi 3: Perforce là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Perforce và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Perforce.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Migrate từ Perforce

### Định nghĩa / Definition

Perforce là centralized version control system optimized cho large binary files.

### Ví dụ / Examples

```bash
# Perforce commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
p4 clone //depot/path

# Status
git status
p4 status

# Add files
git add file.txt
p4 add file.txt

# Submit (commit)
git commit -m "Message"
p4 submit -d "Message"

# Sync (update)
git pull
p4 sync

# Branch
git branch feature
p4 integrate //depot/trunk //depot/branches/feature

# Merge
git merge feature
p4 integrate //depot/branches/feature //depot/trunk

# Log
git log
p4 changes

# Diff
git diff
p4 diff

# Perforce features:
# - Optimized cho large binary files
# - Fine-grained permissions
# - Atomic changesets
# - File locking
# - Streams

# Git features:
# - Distributed model
# - Faster operations
# - Better branching/merging
# - Offline work
# - Larger community

# Perforce use cases:
# - Game development
# - Large binary files
# - Centralized control
# - Enterprise needs

# Git use cases:
# - Software development
# - Distributed teams
# - Open source
# - Modern development
```

### Best Practices

- Chọn Git cho software development
- Hiểu Perforce cho game development
- Migrate từ Perforce khi cần

### Anti-patterns

- Chọn Perforce cho software development
- Migrate mà không backup
- Không hiểu trade-offs

---

## Câu hỏi 4: Bazaar là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Bazaar và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Bazaar.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Migrate từ Bazaar

### Định nghĩa / Definition

Bazaar (bzr) là distributed version control system từ Canonical.

### Ví dụ / Examples

```bash
# Bazaar commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
bzr branch lp:project

# Status
git status
bzr status

# Add files
git add file.txt
bzr add file.txt

# Commit
git commit -m "Message"
bzr commit -m "Message"

# Push
git push origin main
bzr push

# Pull
git pull
bzr pull

# Branch
git branch feature
bzr branch feature

# Merge
git merge feature
bzr merge feature

# Log
git log
bzr log

# Diff
git diff
bzr diff

# Bazaar features:
# - Easier learning curve
# - Better Windows support
# - Launchpad integration
# - Nested trees

# Git features:
# - Larger community
# - More tools
# - Better performance
# - More hosting platforms

# Bazaar status:
# - Bị deprecated
# - Canonical chuyển sang Git
# - Launchpad hỗ trợ Git

# Recommendation:
# - Chọn Git cho new projects
# - Migrate từ Bazaar khi cần
```

### Best Practices

- Chọn Git cho new projects
- Migrate từ Bazaar khi cần
- Hiểu Bazaar là deprecated

### Anti-patterns

- Chọn Bazaar cho new projects
- Không migrate từ Bazaar
- Không hiểu Bazaar status

---

## Câu hỏi 5: Darcs là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Darcs và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Darcs.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Hiểu patch theory

### Định nghĩa / Definition

Darcs là distributed version control system dựa trên patch theory.

### Ví dụ / Examples

```bash
# Darcs commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
darcs get https://darcs.example.com/repo

# Status
git status
darcs whatsnew

# Add files
git add file.txt
darcs add file.txt

# Record (commit)
git commit -m "Message"
darcs record -m "Message"

# Push
git push origin main
darcs push

# Pull
git pull
darcs pull

# Branch
git branch feature
darcs clone feature

# Merge
git merge feature
darcs pull ../feature

# Log
git log
darcs changes

# Diff
git diff
darcs diff

# Darcs features:
# - Patch theory
# - Conflict-free merging
# - Interactive record
# - Cherry-picking
# - Reordering patches

# Git features:
# - Larger community
# - More tools
# - Better performance
# - More hosting platforms

# Darcs use cases:
# - Research projects
# - Patch-based workflows
# - Interactive development

# Git use cases:
# - Software development
# - Distributed teams
# - Open source
- Modern development
```

### Best Practices

- Chọn Git cho most projects
- Hiểu Darcs cho research
- Migrate từ Darcs khi cần

### Anti-patterns

- Chọn Darcs cho production
- Không hiểu patch theory
- Migrate mà không backup

---

## Câu hỏi 6: Fossil là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Fossil và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Fossil.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Hiểu integrated features

### Định nghĩa / Definition

Fossil là distributed version control system với integrated bug tracking và wiki.

### Ví dụ / Examples

```bash
# Fossil commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
fossil clone https://fossil.example.com/repo

# Status
git status
fossil status

# Add files
git add file.txt
fossil add file.txt

# Commit
git commit -m "Message"
fossil commit -m "Message"

# Push
git push origin main
fossil push

# Pull
git pull
fossil pull

# Branch
git branch feature
fossil branch create feature

# Merge
git merge feature
fossil merge feature

# Log
git log
fossil timeline

# Diff
git diff
fossil diff

# Fossil features:
# - Integrated bug tracking
# - Integrated wiki
# - Single file repository
# - Built-in web UI
# - Autosync

# Git features:
# - Larger community
# - More tools
# - Better performance
# - More hosting platforms

# Fossil use cases:
# - Small projects
# - Integrated features needed
# - Single file repository
# - SQLite projects

# Git use cases:
# - Software development
# - Distributed teams
# - Open source
- Modern development
```

### Best Practices

- Chọn Git cho most projects
- Hiểu Fossil cho integrated features
- Migrate từ Fossil khi cần

### Anti-patterns

- Chọn Fossil cho large projects
- Không hiểu integrated features
- Migrate mà không backup

---

## Câu hỏi 7: Plastic SCM là gì và khác gì so với Git?

### Mục đích / Purpose

Hiểu về Plastic SCM và so sánh với Git.

### Khi nào dùng / When to Use

Khi cần chọn giữa Git và Plastic SCM.

### Giá trị gì / Benefits

- Hiểu trade-offs
- Chọn VCS phù hợp
- Migrate từ Plastic SCM

### Định nghĩa / Definition

Plastic SCM là distributed version control system optimized cho game development.

### Ví dụ / Examples

```bash
# Plastic SCM commands vs Git commands:

# Clone repository
git clone https://github.com/user/repo.git
cm clone https://plastic.example.com/repo

# Status
git status
cm status

# Add files
git add file.txt
cm add file.txt

# Commit
git commit -m "Message"
cm commit -m "Message"

# Push
git push origin main
cm push

# Pull
git pull
cm update

# Branch
git branch feature
cm mkbranch feature

# Merge
git merge feature
cm merge feature

# Log
git log
cm log

# Diff
git diff
cm diff

# Plastic SCM features:
# - Optimized cho large binary files
# - Visual tools
- - Branch explorer
- - Xlinks
- - Locking mechanism

# Git features:
- - Larger community
- - More tools
- - Better performance for text
- - More hosting platforms

# Plastic SCM use cases:
- - Game development
- - Large binary files
- - Visual workflow
- - Enterprise needs

# Git use cases:
- - Software development
- - Distributed teams
- - Open source
- - Modern development
```

### Best Practices

- Chọn Git cho software development
- Hiểu Plastic SCM cho game development
- Migrate từ Plastic SCM khi cần

### Anti-patterns

- Chọn Plastic SCM cho software development
- Không hiểu visual workflow
- Migrate mà không backup

---

## Câu hỏi 8: Monorepo vs Polyrepo là gì?

### Mục đích / Purpose

Hiểu về monorepo và polyrepo strategies.

### Khi nào dùng / When to Use

Khi cần chọn repository structure.

### Giá trị gì / Benefits

- Chọn structure phù hợp
- Hiểu trade-offs
- Optimize workflow

### Định nghĩa / Definition

- **Monorepo**: Single repository cho multiple projects
- **Polyrepo**: Multiple repositories cho multiple projects

### Ví dụ / Examples

```bash
# Monorepo structure:
# repo/
# ├── frontend/
# ├── backend/
# ├── shared/
# └── docs/

# Polyrepo structure:
# frontend-repo/
# backend-repo/
# shared-repo/
# docs-repo/

# Monorepo benefits:
# - Shared code dễ dàng
# - Atomic commits
# - Unified CI/CD
# - Code visibility
# - Simplified dependency management

# Monorepo drawbacks:
# - Large repository size
# - Slower operations
# - Complex permissions
# - CI/CD complexity

# Polyrepo benefits:
# - Smaller repositories
# - Faster operations
# - Independent releases
# - Clear boundaries
# - Flexible permissions

# Polyrepo drawbacks:
# - Shared code khó khăn
# - Dependency management
# - Multiple CI/CD pipelines
# - Less visibility

# Monorepo tools:
# - Nx
# - Lerna
# - Turborepo
# - Bazel

# Polyrepo tools:
# - Git submodules
# - Git subtrees
# - Package managers

# Khi nào dùng monorepo:
# - Tight coupling giữa projects
# - Shared code nhiều
# - Unified releases
# - Small team

# Khi nào dùng polyrepo:
# - Independent projects
# - Different release cycles
# - Large team
# - Different languages/frameworks
```

### Best Practices

- Chọn structure phù hợp với team
- Hiểu trade-offs
- Sửze tools khi cần
- Migrate khi cần

### Anti-patterns

- Chọn structure mà không hiểu trade-offs
- Không migrate khi cần
- Không sửze tools

---

## Câu hỏi 9: Git LFS vs Alternatives là gì?

### Mục đích / Purpose

Hiểu về Git LFS và alternatives cho large files.

### Khi nào dùng / When to Use

Khi cần quản lý large files trong Git.

### Giá trị gì / Benefits

- Quản lý large files hiệu quả
- Chọn solution phù hợp
- Migrate khi cần

### Định nghĩa / Definition

Git LFS (Large File Storage) là extension cho Git để quản lý large files.

### Ví dụ / Examples

```bash
# Git LFS commands:
git lfs install
git lfs track "*.psd"
git lfs track "*.zip"
git add .gitattributes
git add file.psd
git commit -m "Add large file"
git push

# Git LFS alternatives:

# 1. Git-annex
git annex init
git annex add largefile.zip
git commit -m "Add large file"
git push

# 2. Git-media (deprecated)
git media init
git media add largefile.zip
git commit -m "Add large file"
git push

# 3. DVC (Data Version Control)
dvc init
dvc add largefile.zip
git add largefile.zip.dvc .gitignore
git commit -m "Add large file"
git push

# 4. Git-fat
git fat init
git fat add largefile.zip
git commit -m "Add large file"
git push

# Git LFS benefits:
# - Official Git extension
- - Easy to use
- - Hosting platform support
- - Transparent workflow

# Git LFS drawbacks:
- - Requires LFS server
- - Additional cost
- - Slower operations

# Git-annex benefits:
- - Multiple backends
- - Flexible
- - No central server required

# DVC benefits:
- - Optimized cho ML/data
- - Pipeline support
- - Data versioning

# Khi nào dùng Git LFS:
- - Large binary files
- - Hosting platform supports LFS
- - Simple workflow needed

# Khi nào dùng Git-annex:
- - Multiple backends needed
- - Flexible storage
- - No central server

# Khi nào dùng DVC:
- - ML/data projects
- - Pipeline support
- - Data versioning
```

### Best Practices

- Chọn solution phù hợp với use case
- Hiểu trade-offs
- Migrate khi cần
- Test trước khi deploy

### Anti-patterns

- Chọn solution mà không hiểu trade-offs
- Migrate mà không backup
- Không test trước

---

## Câu hỏi 10: Migrate từ VCS khác sang Git là gì?

### Mục đích / Purpose

Hiểu cách migrate từ VCS khác sang Git.

### Khi nào dùng / When to Use

Khi cần migrate từ SVN, Mercurial, etc. sang Git.

### Giá trị gì / Benefits

- Migrate hiệu quả
- Preserve history
- Minimize downtime

### Định nghĩa / Definition

Migration là quá trình chuyển từ VCS khác sang Git.

### Ví dụ / Examples

```bash
# Migrate từ SVN sang Git:
git svn clone https://svn.example.com/repo

# Migrate từ Mercurial sang Git:
hg-fast-export | git fast-import

# Migrate từ Bazaar sang Git:
bzr-fast-export | git fast-import

# Migrate từ Perforce sang Git:
git-p4 clone //depot/path

# Migrate từ CVS sang Git:
cvs2git

# GitHub Importer:
# 1. Vào GitHub > New repository
# 2. Chọn "Import repository"
# 3. Nhập URL của VCS khác
# 4. GitHub tự động migrate

# GitLab Importer:
# 1. Vào GitLab > New project
# 2. Chọn "Import project"
# 3. Chọn VCS source
# 4. Nhập URL và credentials

# Migration best practices:
# 1. Backup repository trước khi migrate
# 2. Test migration trên copy
# 3. Preserve history
# 4. Migrate branches và tags
# 5. Update team về migration
# 6. Update CI/CD pipelines
# 7. Update documentation
# 8. Train team về Git

# Migration checklist:
# [ ] Backup repository
# [ ] Test migration
# [ ] Migrate history
# [ ] Migrate branches
# [ ] Migrate tags
# [ ] Update CI/CD
# [ ] Update documentation
# [ ] Train team
# [ ] Switch to Git
# [ ] Archive old repository
```

### Best Practices

- Backup trước khi migrate
- Test migration trước
- Preserve history
- Train team
- Update documentation

### Anti-patterns

- Migrate mà không backup
- Không test migration
- Không preserve history
- Không train team

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. Git là popular nhất, nhưng có alternatives
2. Mercurial: Easier learning curve, smaller community
3. SVN: Centralized, good cho binary files
4. Perforce: Optimized cho game development
5. Bazaar: Deprecated, Canonical chuyển sang Git
6. Darcs: Patch theory, research projects
7. Fossil: Integrated bug tracking và wiki
8. Plastic SCM: Optimized cho game development
9. Monorepo vs Polyrepo: Single vs multiple repositories
10. Git LFS: Large file storage solution

### Commands Reference / Tham khảo lệnh

```bash
# Mercurial
hg clone URL
hg status
hg add file.txt
hg commit -m "Message"
hg push
hg pull

# SVN
svn checkout URL
svn status
svn add file.txt
svn commit -m "Message"
svn update

# Perforce
p4 clone //depot/path
p4 status
p4 add file.txt
p4 submit -d "Message"
p4 sync

# Bazaar
bzr branch URL
bzr status
bzr add file.txt
bzr commit -m "Message"
bzr push
bzr pull

# Darcs
darcs get URL
darcs whatsnew
darcs add file.txt
darcs record -m "Message"
darcs push
darcs pull

# Fossil
fossil clone URL
fossil status
fossil add file.txt
fossil commit -m "Message"
fossil push
fossil pull

# Plastic SCM
cm clone URL
cm status
cm add file.txt
cm commit -m "Message"
cm push
cm update

# Git LFS
git lfs install
git lfs track "*.psd"
git add .gitattributes
git commit -m "Add LFS tracking"

# Migration
git svn clone URL
hg-fast-export | git fast-import
bzr-fast-export | git fast-import
git-p4 clone //depot/path
```

### Best Practices / Thực hành tốt

1. Chọn Git cho most projects
2. Hiểu alternatives khi cần
3. Migrate từ VCS khác khi cần
4. Backup trước khi migrate
5. Test migration trước
6. Preserve history
7. Train team
8. Update documentation
9. Chọn monorepo/polyrepo phù hợp
10. Sửze Git LFS cho large files
