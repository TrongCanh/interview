# 39. Git Team Collaboration / Hợp tác nhóm với Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu cách sử dụng Git để làm việc hiệu quả trong team.

### Khi nào cần hiểu / When to Understand

- Khi làm việc trong team với Git
- Khi cần thiết lập workflow cho team
- Khi chuẩn bị cho team lead roles

### Giá trị gì / Benefits

- Tăng hiệu suất team
- Giảm conflicts
- Cải thiện code quality

---

## Câu hỏi 1: Git Workflow cho team là gì?

### Mục đích / Purpose

Hiểu về các Git workflows phổ biến cho team.

### Khi nào dùng / When to Use

Khi cần chọn workflow phù hợp cho team.

### Giá trị gì / Benefits

- Tổ chức work hiệu quả
- Giảm conflicts
- Tăng tốc độ development

### Định nghĩa / Definition

Git workflow là quy trình làm việc với Git để quản lý code changes trong team.

### Ví dụ / Examples

```bash
# Feature Branch Workflow
# 1. Developer tạo feature branch từ main
git checkout -b feature/new-feature main

# 2. Làm việc và commit
git add .
git commit -m "feat: add new feature"

# 3. Push và tạo Pull Request
git push -u origin feature/new-feature

# 4. Review và merge vào main

# Git Flow Workflow
# main: production code
# develop: development code
# feature/*: new features
# release/*: prepare release
# hotfix/*: urgent fixes

# GitHub Flow
# main: production-ready code
# feature/*: new features
# PR review trước khi merge

# GitLab Flow
# main: production
# develop: development
# feature/*: features
# environment branches: staging, production
```

### Best Practices

- Chọn workflow phù hợp với team size và project
- Document workflow cho team
- Sửze branches cho features
- Review code trước khi merge

### Anti-patterns

- Không có workflow rõ ràng
- Commit trực tiếp vào main
- Không review code

---

## Câu hỏi 2: Code Review với Git là gì?

### Mục đích / Purpose

Hiểu cách thực hiện code review với Git.

### Khi nào dùng / When to Use

Khi cần review code trước khi merge.

### Giá trị gì / Benefits

- Cải thiện code quality
- Chia sẻ kiến thức
- Catch bugs sớm

### Định nghĩa / Definition

Code review là quá trình review code changes trước khi merge vào main branch.

### Ví dụ / Examples

```bash
# GitHub Pull Request
# 1. Tạo feature branch
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push -u origin feature/new-feature

# 2. Tạo Pull Request trên GitHub
# 3. Gán reviewers
# 4. Review comments
# 5. Fix issues
# 6. Approve và merge

# GitLab Merge Request
# 1. Tạo feature branch
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push -u origin feature/new-feature

# 2. Tạo Merge Request trên GitLab
# 3. Gán reviewers
# 4. Review comments
# 5. Fix issues
# 6. Approve và merge

# Review guidelines:
# - Code style và formatting
# - Logic và correctness
# - Performance considerations
# - Security issues
# - Test coverage
# - Documentation

# GitHub CLI
gh pr create --title "New feature" --body "Description"
gh pr review --approve
gh pr merge --merge

# GitLab CLI
glab mr create --title "New feature" --description "Description"
glab mr approve
glab mr merge
```

### Best Practices

- Review code nhanh chóng
- Cung cấp constructive feedback
- Review small PRs/MRs
- Sửze templates cho PRs/MRs
- Link issues với PRs/MRs

### Anti-patterns

- Review quá chậm
- Review quá nhiều changes cùng lúc
- Không test trước khi review
- Bỏ qua review guidelines

---

## Câu hỏi 3: Resolving Conflicts trong team là gì?

### Mục đích / Purpose

Hiểu cách giải quyết conflicts khi làm việc trong team.

### Khi nào dùng / When to Use

Khi merge hoặc rebase gặp conflicts.

### Giá trị gì / Benefits

- Giải quyết conflicts hiệu quả
- Giảm downtime
- Tăng collaboration

### Định nghĩa / Definition

Conflicts xảy ra khi hai developers thay đổi cùng một phần của code.

### Ví dụ / Examples

```bash
# Conflict khi merge
git checkout main
git pull
git merge feature/new-feature
# CONFLICT (content): Merge conflict in file.txt

# Xem conflicts
git status
cat file.txt

# File với conflict markers:
<<<<<<< HEAD
// Code của bạn
=======
// Code từ branch khác
>>>>>>> feature/new-feature

# Giải quyết conflict
# 1. Edit file để giải quyết
# 2. Xóa markers và giữ code cần thiết
# 3. Mark as resolved
git add file.txt

# 4. Hoàn thành merge
git commit

# Conflict khi rebase
git checkout feature/new-feature
git rebase main
# CONFLICT (content): Merge conflict in file.txt

# Giải quyết
# 1. Edit file
# 2. git add file.txt
# 3. git rebase --continue

# Hủy rebase nếu cần
git rebase --abort

# Best practices cho resolving conflicts:
# 1. Communicate với team
# 2. Thường xuyên pull để tránh conflicts lớn
# 3. Review cả hai sides của conflict
# 4. Test sau khi resolve
# 5. Ask for help nếu cần
```

### Best Practices

- Thường xuyên pull để tránh conflicts lớn
- Communicate với team khi có conflicts
- Review cả hai sides của conflict
- Test sau khi resolve
- Sửze merge tools

### Anti-patterns

- Bỏ qua conflicts một cách tùy ý
- Không test sau khi resolve
- Không communicate với team
- Force push để tránh conflicts

---

## Câu hỏi 4: Branch Naming Conventions là gì?

### Mục đích / Purpose

Hiểu về quy tắc đặt tên branches cho team.

### Khi nào dùng / When to Use

Khi cần đặt tên branches cho team.

### Giá trị gì / Benefits

- Tổ chức branches hiệu quả
- Dễ dàng tìm branches
- Hiểu mục đích của branch

### Định nghĩa / Definition

Branch naming conventions là quy tắc đặt tên branches để tổ chức và dễ hiểu.

### Ví dụ / Examples

```bash
# Feature branches
feature/user-authentication
feature/add-payment-gateway
feature/new-dashboard

# Bugfix branches
bugfix/login-error
bugfix/memory-leak
bugfix/crash-on-startup

# Hotfix branches
hotfix/critical-security-fix
hotfix/production-down
hotfix/data-corruption

# Release branches
release/v1.0.0
release/v2.1.0
release/2024.01.01

# Environment branches
development
staging
production

# JIRA ticket based
feature/PROJ-123-user-auth
bugfix/PROJ-456-login-error
hotfix/PROJ-789-security-fix

# Team-based
feature/frontend/user-auth
feature/backend/api-endpoint
feature/devops/ci-pipeline

# Date-based
feature/2024-01-01-new-year-promo
release/2024-Q1

# Naming conventions:
# - Sửze lowercase và hyphens
# - Mô tả ngắn gọn và rõ ràng
# - Bao gồm ticket ID nếu có
# - Sửze prefixes: feature/, bugfix/, hotfix/, release/
# - Tránh special characters
```

### Best Practices

- Document naming conventions
- Sửze prefixes rõ ràng
- Bao gồm ticket ID khi có thể
- Giữ tên ngắn gọn
- Sửze hyphens thay vì underscores

### Anti-patterns

- Tên branch không rõ ràng
- Không có conventions
- Tên quá dài
- Sửze special characters

---

## Câu hỏi 5: Commit Message Conventions trong team là gì?

### Mục đích / Purpose

Hiểu về quy tắc viết commit messages cho team.

### Khi nào dùng / When to Use

Khi cần viết commit messages cho team.

### Giá trị gì / Benefits

- Hiểu lịch sử changes
- Tạo changelog tự động
- Tăng collaboration

### Định nghĩa / Definition

Commit message conventions là quy tắc viết commit messages để tổ chức và dễ hiểu.

### Ví dụ / Examples

```bash
# Conventional Commits
# Format: type(scope): subject

# Types:
# feat: New feature
# fix: Bug fix
# docs: Documentation changes
# style: Code style changes (formatting, etc.)
# refactor: Code refactoring
# test: Test changes
# chore: Build process or auxiliary tool changes
# perf: Performance improvements
# ci: CI/CD changes

# Examples:
feat(auth): add user authentication
fix(api): resolve memory leak in user endpoint
docs(readme): update installation instructions
style(format): apply prettier formatting
refactor(user): simplify user validation logic
test(auth): add unit tests for authentication
chore(deps): update dependencies to latest versions
perf(api): optimize database queries
ci(github): add automated tests

# Full format:
feat(auth): add user authentication

Add OAuth2 authentication with Google and Facebook.
Users can now sign in with their social accounts.

Closes #123

# Breaking changes:
feat(api)!: change API response format

BREAKING CHANGE: The API response format has changed.
All clients need to be updated to handle the new format.

# Footer:
feat(auth): add user authentication

Add OAuth2 authentication with Google and Facebook.

Closes #123
Refs #456

# Git hooks để enforce conventions
# .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

### Best Practices

- Sửze Conventional Commits
- Viết subject ngắn gọn (50 chars)
- Bắt đầu với verb
- Viết body để giải thích why
- Reference issues và PRs

### Anti-patterns

- Commit messages không rõ ràng
- "Fixed bug" - quá chung chung
- Không reference issues
- Không follow conventions

---

## Câu hỏi 6: Git Permissions trong team là gì?

### Mục đích / Purpose

Hiểu về quản lý permissions cho team.

### Khi nào dùng / When to Use

Khi cần quản lý access control cho team.

### Giá trị gì / Benefits

- Bảo vệ codebase
- Kiểm soát access
- Giảm rủi ro

### Định nghĩa / Definition

Git permissions là quy tắc kiểm soát ai có thể làm gì với repository.

### Ví dụ / Examples

```bash
# GitHub Permissions:
# Owner: Full access
# Admin: Manage settings, collaborators
# Maintainer: Push/pull, manage issues/PRs
# Developer: Push/pull, manage issues
# Reporter: View and comment
# Guest: Minimal access

# GitLab Permissions:
# Owner: Full access
# Maintainer: Push/pull, manage project
# Developer: Push/pull, create branches
# Reporter: View and comment
# Guest: Minimal access

# Branch protection rules:
# - Require PR review
# - Require status checks
# - Restrict who can push
# - Require signed commits

# Example GitHub branch protection:
# Settings > Branches > Add rule
# Branch name pattern: main
# Require pull request reviews:
#   - Require approvals: 2
#   - Dismiss stale reviews
# Require status checks:
#   - CI/CD
#   - Tests
#   - Lint
# Restrict who can push:
#   - Maintainers only

# Example GitLab protected branches:
# Settings > Repository > Protected branches
# Branch: main
# Allowed to merge: Maintainers
# Allowed to push: No one
# Required status checks:
#   - pipeline:success
```

### Best Practices

- Protect main branches
- Require reviews before merge
- Limit who can bypass rules
- Use least privilege principle
- Review permissions regularly

### Anti-patterns

- Quá nhiều permissions
- Bỏ qua protection rules
- Không review permissions
- Admin access cho tất cả

---

## Câu hỏi 7: Git Documentation trong team là gì?

### Mục đích / Purpose

Hiểu cách document Git workflow và conventions cho team.

### Khi nào dùng / When to Use

Khi cần document Git practices cho team.

### Giá trị gì / Benefits

- Onboarding nhanh hơn
- Giảm confusion
- Tăng consistency

### Định nghĩa / Definition

Git documentation là tài liệu hướng dẫn về Git workflow, conventions, và best practices.

### Ví dụ / Examples

````markdown
# README.md - Git Workflow

## Branching Strategy

We use GitHub Flow:

- `main`: Production-ready code
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent fixes

## Creating a Feature Branch

```bash
git checkout -b feature/PROJ-123-new-feature main
```
````

## Commit Message Format

Follow Conventional Commits:

- `feat: New feature`
- `fix: Bug fix`
- `docs: Documentation changes`

Example:

```
feat(auth): add user authentication

Add OAuth2 authentication with Google and Facebook.

Closes #123
```

## Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Push to remote
4. Create Pull Request
5. Request review
6. Address feedback
7. Merge after approval

## Code Review Guidelines

- Review within 24 hours
- Provide constructive feedback
- Test changes locally
- Check for security issues
- Ensure test coverage

## Resolving Conflicts

1. Pull latest changes
2. Resolve conflicts locally
3. Test thoroughly
4. Commit and push
5. Update PR

## Useful Commands

```bash
# Pull latest changes
git pull origin main

# Rebase feature branch
git rebase main

# Resolve conflicts
git add <file>
git rebase --continue
```

## Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Team Wiki](https://wiki.company.com/git-workflow)

````

### Best Practices
- Document workflow rõ ràng
- Include examples
- Keep documentation updated
- Use diagrams khi cần
- Link to external resources

### Anti-patterns
- Documentation không cập nhật
- Không có examples
- Documentation quá phức tạp
- Không accessible cho team

---

## Câu hỏi 8: Git Training cho team là gì?

### Mục đích / Purpose
Hiểu cách training team về Git.

### Khi nào dùng / When to Use
Khi cần train team về Git best practices.

### Giá trị gì / Benefits
- Tăng Git skills
- Giảm errors
- Tăng hiệu suất

### Định nghĩa / Definition
Git training là quá trình đào tạo team về Git concepts, commands, và best practices.

### Ví dụ / Examples

```markdown
# Git Training Plan

## Week 1: Git Basics

### Topics:
- Git concepts (repository, commit, branch, merge)
- Basic commands (init, clone, add, commit, push, pull)
- Branching basics

### Exercises:
1. Create local repository
2. Make commits
3. Create and switch branches
4. Merge branches

## Week 2: Git Advanced

### Topics:
- Rebase vs merge
- Stashing
- Tags
- Remote repositories

### Exercises:
1. Rebase feature branch
2. Stash changes
3. Create tags
4. Work with remotes

## Week 3: Git Team Workflow

### Topics:
- Branching strategies
- Pull requests
- Code review
- Conflict resolution

### Exercises:
1. Create feature branch
2. Make pull request
3. Review code
4. Resolve conflicts

## Week 4: Git Best Practices

### Topics:
- Commit message conventions
- .gitignore
- Git hooks
- CI/CD integration

### Exercises:
1. Write conventional commits
2. Configure .gitignore
3. Set up Git hooks
4. Integrate with CI/CD

## Resources:
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Learning Lab](https://lab.github.com/)
- [GitLab Learn](https://learn.gitlab.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
````

### Best Practices

- Training hands-on
- Use real-world examples
- Provide exercises
- Encourage questions
- Follow up with mentoring

### Anti-patterns

- Training quá lý thuyết
- Không có exercises
- Training quá dài
- Không follow up

---

## Câu hỏi 9: Git Tools cho team collaboration là gì?

### Mục đích / Purpose

Hiểu về các tools hỗ trợ Git team collaboration.

### Khi nào dùng / When to Use

Khi cần chọn tools cho team.

### Giá trị gì / Benefits

- Tăng hiệu suất
- Giảm conflicts
- Tăng visibility

### Định nghĩa / Definition

Git tools là applications và integrations hỗ trợ Git team collaboration.

### Ví dụ / Examples

```bash
# Git Hosting Platforms:
# GitHub: https://github.com
# GitLab: https://gitlab.com
# Bitbucket: https://bitbucket.org

# Git GUI Clients:
# GitKraken: Cross-platform Git client
# SourceTree: Git GUI from Atlassian
# GitHub Desktop: Official GitHub client
# GitExtensions: Windows Git client

# Code Review Tools:
# GitHub Pull Requests
# GitLab Merge Requests
# Gerrit: Code review tool

# CI/CD Integration:
# GitHub Actions
# GitLab CI/CD
# Jenkins
# CircleCI

# Project Management Integration:
# GitHub Projects
# GitLab Issues
# Jira Integration
# Trello Integration

# Communication Tools:
# Slack Integration
# Microsoft Teams Integration
# Discord Integration

# Git CLI Tools:
# gh: GitHub CLI
# glab: GitLab CLI
# hub: GitHub command-line tool

# Example: GitHub CLI
gh auth login
gh repo create my-repo
gh pr create --title "New feature"
gh issue create --title "Bug"
gh workflow list

# Example: GitLab CLI
glab auth login
glab repo create
glab mr create --title "New feature"
glab issue create --title "Bug"
glab ci view
```

### Best Practices

- Chọn tools phù hợp với team size
- Integrate tools với workflow
- Train team về tools
- Evaluate tools regularly
- Use automation khi có thể

### Anti-patterns

- Quá nhiều tools
- Tools không phù hợp với workflow
- Không train team về tools
- Không evaluate tools

---

## Câu hỏi 10: Git Metrics cho team là gì?

### Mục đích / Purpose

Hiểu về cách đo lường Git metrics cho team.

### Khi nào dùng / When to Use

Khi cần track team performance với Git.

### Giá trị gì / Benefits

- Track progress
- Identify bottlenecks
- Improve workflow

### Định nghĩa / Definition

Git metrics là measurements về team activity và performance với Git.

### Ví dụ / Examples

```bash
# Git Metrics to Track:
# - Number of commits per day/week
# - Number of branches created
# - PR/MR review time
# - PR/MR merge time
# - Number of conflicts
# - Code churn
# - Contribution per developer

# GitHub Insights:
# https://github.com/org/repo/graphs/contributors
# https://github.com/org/repo/graphs/commit-activity
# https://github.com/org/repo/graphs/code-frequency

# GitLab Analytics:
# https://gitlab.com/org/repo/-/analytics/ci_cd
# https://gitlab.com/org/repo/-/analytics/productivity_analytics

# Git commands for metrics:
# Commits per author
git shortlog -sn --all

# Commits per day
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# Lines changed per author
git log --numstat --pretty=format:"%an" | \
  awk '{nf=$1+$2; $1=$2=""; if (nf>0) {a[$0]+=nf}} END {for (i in a) print i, a[i]}'

# PR/MR review time (GitHub CLI)
gh pr list --state closed --json number,author,createdAt,mergedAt

# Git commands for analysis:
# Active branches
git branch -a

# Stale branches
git branch -a --merged | grep -v "main\|develop"

# Large files
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort -n -k2 | tail -n 10
```

### Best Practices

- Track relevant metrics
- Review metrics regularly
- Use metrics để improve
- Don't measure everything
- Context matters

### Anti-patterns

- Quá nhiều metrics
- Metrics không relevant
- Không review metrics
- Sửze metrics để blame

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. Git workflow tổ chức làm việc team
2. Code review cải thiện quality
3. Conflicts cần resolve collaboratively
4. Branch naming conventions tổ chức branches
5. Commit message conventions improve history
6. Permissions bảo vệ codebase
7. Documentation giúp onboarding
8. Training tăng Git skills
9. Tools hỗ trợ collaboration
10. Metrics track performance

### Commands Reference / Tham khảo lệnh

```bash
# Branch management
git branch -a  # List all branches
git checkout -b feature/new-feature  # Create branch
git branch -d feature/new-feature  # Delete branch

# Conflict resolution
git merge feature/new-feature  # Merge branch
git rebase main  # Rebase branch
git add <file>  # Mark conflict as resolved
git rebase --continue  # Continue rebase

# GitHub CLI
gh pr create --title "New feature" --body "Description"
gh pr review --approve
gh pr merge --merge
gh issue create --title "Bug"

# GitLab CLI
glab mr create --title "New feature" --description "Description"
glab mr approve
glab mr merge
glab issue create --title "Bug"

# Metrics
git shortlog -sn --all  # Commits per author
git log --pretty=format:"%ad" --date=short | sort | uniq -c  # Commits per day
```

### Best Practices / Thực hành tốt

1. Document workflow và conventions
2. Review code trước khi merge
3. Resolve conflicts collaboratively
4. Use clear branch naming
5. Write descriptive commit messages
6. Protect main branches
7. Train team regularly
8. Use appropriate tools
9. Track relevant metrics
10. Communicate regularly
