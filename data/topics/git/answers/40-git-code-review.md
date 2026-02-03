# 40. Git Code Review / Review code với Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu cách thực hiện code review hiệu quả với Git.

### Khi nào cần hiểu / When to Understand

- Khi cần review code trong team
- Khi cần thiết lập review process
- Khi chuẩn bị cho senior/lead roles

### Giá trị gì / Benefits

- Cải thiện code quality
- Chia sẻ kiến thức
- Catch bugs sớm
- Tăng team cohesion

---

## Câu hỏi 1: Code Review là gì và tại sao quan trọng?

### Mục đích / Purpose

Hiểu về code review và giá trị của nó.

### Khi nào dùng / When to Use

Khi cần giải thích importance của code review.

### Giá trị gì / Benefits

- Cải thiện code quality
- Chia sẻ kiến thức
- Catch bugs sớm
- Build team culture

### Định nghĩa / Definition

Code review là quá trình review code changes trước khi merge vào main branch.

### Ví dụ / Examples

```bash
# Code Review Process:
# 1. Developer tạo feature branch
# 2. Developer làm changes và commit
# 3. Developer tạo Pull Request/Merge Request
# 4. Reviewers review code
# 5. Developer address feedback
# 6. Reviewer approve
# 7. Code merge vào main

# Benefits:
# - Catch bugs và issues
# - Improve code quality
# - Share knowledge
# - Maintain consistency
# - Onboarding new team members
# - Build team culture

# Code Review Checklist:
# - Functionality: Does it work as intended?
# - Code style: Does it follow conventions?
# - Performance: Are there performance issues?
# - Security: Are there security vulnerabilities?
# - Testing: Is there adequate test coverage?
# - Documentation: Is code well documented?
# - Edge cases: Are edge cases handled?
```

### Best Practices

- Review code thường xuyên
- Provide constructive feedback
- Review small changes
- Test changes locally
- Ask questions khi cần

### Anti-patterns

- Review quá chậm
- Review quá nhiều changes cùng lúc
- Not testing trước khi review
- Provide negative feedback

---

## Câu hỏi 2: GitHub Pull Request là gì?

### Mục đích / Purpose

Hiểu về GitHub Pull Request cho code review.

### Khi nào dùng / When to Use

Khi dùng GitHub và cần code review.

### Giá trị gì / Benefits

- Integrated code review
- Easy collaboration
- Rich review features

### Định nghĩa / Definition

GitHub Pull Request là feature cho phép propose và review code changes.

### Ví dụ / Examples

```bash
# Tạo Pull Request
# 1. Tạo feature branch
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push -u origin feature/new-feature

# 2. Tạo Pull Request trên GitHub
#    - Vào repository > Pull requests > New pull request
#    - Chọn source và target branch
#    - Điền title và description
#    - Gán reviewers
#    - Click "Create pull request"

# 3. Review Pull Request
#    - View changes tab
#    - Add comments inline
#    - Request changes hoặc approve
#    - Add review comments

# 4. Update Pull Request
#    - Developer push new commits
#    - Reviewer review changes
#    - Approve khi ready

# 5. Merge Pull Request
#    - Click "Merge pull request"
#    - Chọn merge type: Merge commit, Squash, hoặc Rebase
#    - Delete branch sau khi merge

# GitHub CLI
gh pr create --title "New feature" --body "Description"
gh pr review --approve
gh pr review --request-changes --body "Comments"
gh pr merge --merge
gh pr list --state open
```

### Best Practices

- Write clear PR descriptions
- Link PRs với issues
- Request appropriate reviewers
- Review changes before merge
- Delete branches sau khi merge

### Anti-patterns

- PR descriptions không rõ ràng
- Không link với issues
- Merge mà không review
- Không delete branches

---

## Câu hỏi 3: GitLab Merge Request là gì?

### Mục đích / Purpose

Hiểu về GitLab Merge Request cho code review.

### Khi nào dùng / When to Use

Khi dùng GitLab và cần code review.

### Giá trị gì / Benefits

- Integrated code review
- CI/CD integration
- Advanced review features

### Định nghĩa / Definition

GitLab Merge Request là feature cho phép propose và review code changes.

### Ví dụ / Examples

```bash
# Tạo Merge Request
# 1. Tạo feature branch
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push -u origin feature/new-feature

# 2. Tạo Merge Request trên GitLab
#    - Vào repository > Merge requests > New merge request
#    - Chọn source và target branch
#    - Điền title và description
#    - Gán reviewers
#    - Click "Create merge request"

# 3. Review Merge Request
#    - View changes tab
#    - Add comments inline
#    - Request changes hoặc approve
#    - Add review comments

# 4. Update Merge Request
#    - Developer push new commits
#    - Reviewer review changes
#    - Approve khi ready

# 5. Merge Merge Request
#    - Click "Merge"
#    - Chọn merge type: Merge commit, Squash, hoặc Rebase
#    - Delete branch sau khi merge

# GitLab CLI
glab mr create --title "New feature" --description "Description"
glab mr approve
glab mr review --body "Comments"
glab mr merge
glab mr list --state opened
```

### Best Practices

- Write clear MR descriptions
- Link MRs với issues
- Request appropriate reviewers
- Review CI/CD status
- Delete branches sau khi merge

### Anti-patterns

- MR descriptions không rõ ràng
- Không link với issues
- Merge mà không review
- Không check CI/CD status

---

## Câu hỏi 4: Code Review Checklist là gì?

### Mục đích / Purpose

Hiểu về checklist để review code hiệu quả.

### Khi nào dùng / When to Use

Khi cần review code systematically.

### Giá trị gì / Benefits

- Consistent review process
- Catch common issues
- Improve code quality

### Định nghĩa / Definition

Code review checklist là danh sách items cần check khi review code.

### Ví dụ / Examples

```markdown
# Code Review Checklist

## Functionality

- [ ] Code hoạt động như expected?
- [ ] Edge cases được xử lý?
- [ ] Error handling phù hợp?
- [ ] Input validation được thực hiện?

## Code Quality

- [ ] Code follows conventions?
- [ ] Code dễ đọc và hiểu?
- [ ] Variables/functions có tên rõ ràng?
- [ ] Code không bị duplicated?

## Performance

- [ ] Không có performance issues?
- [ ] Database queries được tối ưu?
- [ ] Memory usage hợp lý?
- [ ] Caching được sử dụng khi cần?

## Security

- [ ] Không có security vulnerabilities?
- [ ] User input được sanitized?
- [ ] Sensitive data được bảo vệ?
- [ ] Authentication/authorization đúng?

## Testing

- [ ] Tests được thêm/updated?
- [ ] Tests cover edge cases?
- [ ] Tests pass?
- [ ] Test coverage adequate?

## Documentation

- [ ] Code được commented khi cần?
- [ ] README được updated?
- [ ] API documentation được updated?
- [ ] Changelog được updated?

## Style

- [ ] Code style consistent?
- [ ] Formatting consistent?
- [ ] No console.log hoặc debug code?
- [ ] No commented out code?

## Dependencies

- [ ] Dependencies được updated?
- [ ] No unused dependencies?
- [ ] Security vulnerabilities được fixed?
- [ ] License compatible?

## Git

- [ ] Commit messages follow conventions?
- [ ] No merge commits in feature branch?
- [ ] Branch name follows conventions?
- [ ] No sensitive data committed?
```

### Best Practices

- Customize checklist cho team
- Review systematically theo checklist
- Update checklist regularly
- Share checklist với team

### Anti-patterns

- Checklist quá dài
- Not following checklist
- Checklist không updated
- Checklist không phù hợp với project

---

## Câu hỏi 5: Inline Comments trong Code Review là gì?

### Mục đích / Purpose

Hiểu cách sử dụng inline comments để review code.

### Khi nào dùng / When to Use

Khi cần comment trên specific lines of code.

### Giá trị gì / Benefits

- Precise feedback
- Easy to understand
- Context-specific

### Định nghĩa / Definition

Inline comments là comments trên specific lines of code trong PR/MR.

### Ví dụ / Examples

```javascript
// Example inline comments in code review

// Comment 1: Suggest improvement
function calculateTotal(items) {
  // TODO: Consider using reduce for better readability
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Comment 2: Question about logic
if (user.age >= 18) {
  // Why 18? Should this be a constant?
  allowAccess();
}

// Comment 3: Security concern
function login(username, password) {
  // SECURITY: Password should be hashed before comparing
  if (password === storedPassword) {
    // ...
  }
}

// Comment 4: Performance suggestion
function findUser(id) {
  // PERFORMANCE: Consider using a Map for O(1) lookup
  return users.find((user) => user.id === id);
}

// Comment 5: Documentation needed
function complexAlgorithm(data) {
  // Please add documentation explaining this algorithm
  // It's not clear what this does
  // ...
}

// Good inline comment practices:
// - Be specific and constructive
// - Provide suggestions when possible
// - Ask questions instead of just pointing out issues
// - Explain why something is wrong
// - Suggest improvements
```

### Best Practices

- Be specific và constructive
- Provide suggestions
- Ask questions
- Explain why
- Keep comments brief

### Anti-patterns

- Negative comments
- Vague feedback
- Too many comments
- Not providing solutions

---

## Câu hỏi 6: Code Review Templates là gì?

### Mục đích / Purpose

Hiểu về templates để standardize code review.

### Khi nào dùng / When to Use

Khi cần standardize review process.

### Giá trị gì / Benefits

- Consistent reviews
- Better documentation
- Faster reviews

### Định nghĩa / Definition

Code review templates là predefined formats cho PR/MR descriptions.

### Ví dụ / Examples

```markdown
# Pull Request Template (.github/PULL_REQUEST_TEMPLATE.md)

## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue

Fixes #(issue number)

## Changes Made

- List of changes made

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

---

# Merge Request Template (.gitlab/merge_request_templates/default.md)

## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue

Closes #(issue number)

## Changes Made

- List of changes made

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] CI/CD pipeline passing
```

### Best Practices

- Use templates cho consistency
- Customize cho project
- Keep templates simple
- Update regularly

### Anti-patterns

- Templates quá phức tạp
- Not using templates
- Templates không updated
- Templates không phù hợp

---

## Câu hỏi 7: Code Review Metrics là gì?

### Mục đích / Purpose

Hiểu về metrics để track code review effectiveness.

### Khi nào dùng / When to Use

Khi cần measure và improve review process.

### Giá trị gì / Benefits

- Track review performance
- Identify bottlenecks
- Improve process

### Định nghĩa / Definition

Code review metrics là measurements về review process và effectiveness.

### Ví dụ / Examples

```bash
# Code Review Metrics to Track:

# 1. Review Time
# - Time from PR creation to first review
# - Time from review to approval
# - Total review time

# 2. Review Volume
# - Number of PRs reviewed per person
# - Number of comments per PR
# - Number of changes per PR

# 3. Review Quality
# - Number of bugs caught in review
# - Number of bugs after merge
# - Review satisfaction score

# 4. Review Participation
# - Number of reviewers per PR
# - Review coverage (percentage of code reviewed)
# - Reviewer diversity

# GitHub CLI for metrics
gh pr list --state closed --json number,author,createdAt,mergedAt,reviewDecision

# GitLab CLI for metrics
glab mr list --state closed

# Calculate review time
gh pr view --json number,createdAt,mergedAt | \
  jq '{number, createdAt, mergedAt, reviewTime: (.mergedAt - .createdAt)}'

# Review comments
gh api repos/:owner/:repo/pulls/:number/comments

# GitLab API for metrics
curl --header "PRIVATE-TOKEN: <token>" \
  "https://gitlab.com/api/v4/projects/:id/merge_requests?state=closed"
```

### Best Practices

- Track relevant metrics
- Review metrics regularly
- Use metrics để improve
- Don't measure everything

### Anti-patterns

- Quá nhiều metrics
- Metrics không relevant
- Not reviewing metrics
- Using metrics để blame

---

## Câu hỏi 8: Code Review Automation là gì?

### Mục đích / Purpose

Hiểu về automation để improve code review process.

### Khi nào dùng / When to Use

Khi cần automate repetitive review tasks.

### Giá trị gì / Benefits

- Faster reviews
- Consistent checks
- Catch common issues

### Định nghĩa / Definition

Code review automation là sử dụng tools để automate review checks.

### Ví dụ / Examples

```yaml
# GitHub Actions - Automated checks
name: Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run linter
        run: |
          npm ci
          npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm ci
          npm test

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security scan
        run: |
          npm audit

# Automated review bots
# - GitHub: CodeClimate, SonarCloud, DeepSource
# - GitLab: GitLab Code Quality, SonarQube
# - Custom bots: Danger, Reviewdog

# Danger.js example
import danger from 'danger'
const { markdown, warn, fail } = danger

// Warn if PR is large
if (danger.github.pr.additions + danger.github.pr.deletions > 500) {
  warn(':exclamation: Big PR, consider splitting into smaller ones')
}

// Check for TODOs
const todoRegex = /TODO|FIXME/g
const todos = danger.git.modifiedFiles.join(' ').match(todoRegex)
if (todos) {
  warn(':memo: Found TODOs in code')
}

# Reviewdog example
# .reviewdog.yml
runner:
  eslint:
    cmd: eslint -f stylish
    errorformat:
      - "%f:%l:%c: %m"

# SonarQube integration
# .github/workflows/sonarqube.yml
name: SonarQube Scan
on:
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

### Best Practices

- Automate repetitive checks
- Use multiple tools
- Configure thresholds appropriately
- Review automation results

### Anti-patterns

- Over-automating
- Not reviewing automation results
- Too many false positives
- Not updating automation rules

---

## Câu hỏi 9: Code Review Best Practices là gì?

### Mục đích / Purpose

Hiểu về best practices để review code hiệu quả.

### Khi nào dùng / When to Use

Khi cần improve review process.

### Giá trị gì / Benefits

- Better code quality
- Faster reviews
- Happier team

### Định nghĩa / Definition

Code review best practices là guidelines để review code hiệu quả.

### Ví dụ / Examples

```markdown
# Code Review Best Practices

## For Reviewers

### Before Review

- Understand the context and purpose
- Review small, focused changes
- Set aside dedicated review time

### During Review

- Be constructive and respectful
- Ask questions instead of making demands
- Provide specific feedback
- Suggest improvements when possible
- Focus on the code, not the person

### After Review

- Respond promptly to follow-up questions
- Approve when satisfied
- Delete branches after merge

## For Authors

### Before Submitting

- Self-review your code
- Write clear descriptions
- Link to related issues
- Keep changes small and focused
- Test thoroughly

### During Review

- Respond to feedback promptly
- Ask for clarification if needed
- Update code based on feedback
- Be open to suggestions

### After Review

- Learn from feedback
- Apply lessons to future code
- Thank reviewers

## General Practices

- Review within 24 hours
- Keep PRs under 400 lines
- Request 1-3 reviewers
- Use templates for consistency
- Track review metrics
- Automate repetitive checks
- Document review guidelines
- Train team on review process
```

### Best Practices

- Review small changes
- Be constructive
- Respond promptly
- Use templates
- Track metrics

### Anti-patterns

- Review too slowly
- Negative feedback
- Not responding to feedback
- Large PRs

---

## Câu hỏi 10: Code Review Tools là gì?

### Mục đích / Purpose

Hiểu về các tools hỗ trợ code review.

### Khi nào dùng / When to Use

Khi cần chọn tools cho review process.

### Giá trị gì / Benefits

- Better review experience
- Automated checks
- Integration with workflow

### Định nghĩa / Definition

Code review tools là applications hỗ trợ review process.

### Ví dụ / Examples

```bash
# Git Hosting Platforms with Review Features:
# GitHub: Pull Requests, Code Review, Actions
# GitLab: Merge Requests, Code Quality, CI/CD
# Bitbucket: Pull Requests, Code Insights
# Azure DevOps: Pull Requests, Code Review

# Code Review Tools:
# Gerrit: Code review tool
# Phabricator: Code review platform
# Review Board: Code review tool
# Crucible: Code review from Atlassian

# Automated Review Tools:
# SonarQube: Code quality analysis
# CodeClimate: Code analysis platform
# DeepSource: Static analysis
# LGTM: Code analysis

# Review Automation Tools:
# Danger: Automate code review
# Reviewdog: Automated review
# Hound: Automated review comments
# PullReview: Automated review

# GitHub Integrations:
# - GitHub Actions for automated checks
# - GitHub Code Scanning
# - GitHub Dependabot
# - Third-party bots

# GitLab Integrations:
# - GitLab CI/CD
# - GitLab Code Quality
# - GitLab Security Scanning
# - Third-party integrations

# CLI Tools:
# gh: GitHub CLI for PRs
# glab: GitLab CLI for MRs
# hub: GitHub command-line tool
```

### Best Practices

- Choose tools phù hợp với workflow
- Integrate tools với process
- Train team về tools
- Evaluate tools regularly

### Anti-patterns

- Quá nhiều tools
- Tools không phù hợp
- Not training team
- Not evaluating tools

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. Code review cải thiện code quality
2. GitHub PRs và GitLab MRs là main review tools
3. Checklist giúp systematic review
4. Inline comments provide specific feedback
5. Templates standardize process
6. Metrics track effectiveness
7. Automation speeds up review
8. Best practices guide reviewers
9. Tools support review process

### Commands Reference / Tham khảo lệnh

```bash
# GitHub CLI
gh pr create --title "New feature" --body "Description"
gh pr review --approve
gh pr review --request-changes --body "Comments"
gh pr merge --merge
gh pr list --state open
gh pr view --json number,createdAt,mergedAt

# GitLab CLI
glab mr create --title "New feature" --description "Description"
glab mr approve
glab mr review --body "Comments"
glab mr merge
glab mr list --state opened

# Git commands
git checkout -b feature/new-feature
git push -u origin feature/new-feature
git branch -d feature/new-feature
```

### Best Practices / Thực hành tốt

1. Review small, focused changes
2. Be constructive và respectful
3. Respond promptly
4. Use templates
5. Track metrics
6. Automate repetitive checks
7. Train team regularly
8. Document guidelines
9. Use appropriate tools
10. Learn from feedback
