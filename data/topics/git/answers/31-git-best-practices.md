# Git Best Practices / Git Best Practices

> Hướng dẫn chi tiết về các best practices khi làm việc với Git / Comprehensive guide to Git best practices when working with Git

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu và áp dụng các best practices khi làm việc với Git để tăng hiệu suất và giảm lỗi.

Understand and apply best practices when working with Git to increase productivity and reduce errors.

### Khi nào cần hiểu / When to understand

Luôn luôn cần áp dụng best practices khi làm việc với Git.

Always need to apply best practices when working with Git.

### Giá trị gì / Benefits

- Tăng hiệu suất làm việc
- Giảm lỗi do con người
- Giữ lịch sử Git sạch sẽ
- Cải thiện collaboration trong team
- Tối ưu hóa repository performance

- Increase work productivity
- Reduce human errors
- Keep Git history clean
- Improve team collaboration
- Optimize repository performance

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Giảm conflicts và merge issues
- Lịch sử dễ đọc và hiểu
- Dễ debug và rollback
- Collaboration hiệu quả hơn

**Nhược điểm / Cons:**

- Có thể mất thời gian để học
- Một số practices có thể không phù hợp mọi project
- Cần discipline để tuân thủ

**Pros:**

- Reduce conflicts and merge issues
- History is easier to read and understand
- Easier to debug and rollback
- More efficient collaboration

**Cons:**

- Can take time to learn
- Some practices may not fit all projects
- Requires discipline to follow

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: "Commit early, commit often" có nghĩa là gì? / What does "commit early, commit often" mean?

#### Mục đích / Purpose

Hiểu nguyên tắc commit thường xuyên và nhỏ.

Understand principle of committing frequently and in small chunks.

#### Khi nào dùng / When to use

Luôn luôn nên áp dụng nguyên tắc này.

Always should apply this principle.

#### Giá trị gì / Benefits

- Giảm conflicts
- Dễ debug và rollback
- Lịch sử sạch sẽ hơn
- Giảm rủi ro mất code

- Reduce conflicts
- Easier to debug and rollback
- Cleaner history
- Reduce risk of losing code

#### Định nghĩa / Definition

"Commit early, commit often" có nghĩa là:

1. **Commit thường xuyên**: Commit sau khi hoàn thành một task nhỏ
2. **Commit nhỏ**: Mỗi commit chỉ làm một việc
3. **Không đợi**: Không đợi hoàn thành feature lớn mới commit

"Commit early, commit often" means:

1. **Commit frequently**: Commit after completing a small task
2. **Commit small**: Each commit does one thing
3. **Don't wait**: Don't wait for large feature to be complete before committing

#### Ví dụ / Examples

**Commit thường xuyên và nhỏ:**

```bash
# ❌ Không nên - Commit lớn
git add .
git commit -m "Add user authentication, registration, profile, settings, notifications, and dashboard"

# ✅ Nên - Commit nhỏ
git add src/auth/login.js
git commit -m "feat: add user login"

git add src/auth/register.js
git commit -m "feat: add user registration"

git add src/user/profile.js
git commit -m "feat: add user profile"

git add src/settings.js
git commit -m "feat: add settings"
```

**Workflow tốt:**

```bash
# 1. Làm task nhỏ
# Thêm một function
vim src/utils/formatDate.js

# 2. Test nhanh
npm test -- --grep "formatDate"

# 3. Commit ngay
git add src/utils/formatDate.js
git commit -m "feat: add date formatting utility"

# 4. Tiếp tục task tiếp theo
```

#### Best Practices

1. **Commit sau mỗi task nhỏ** hoàn thành
2. **Giữ commits atomic** - một commit làm một việc
3. **Test trước khi commit**
4. **Viết commit message rõ ràng**
5. **Không đợi quá lâu** trước khi commit

6. **Commit after each small task** is complete
7. **Keep commits atomic** - one commit does one thing
8. **Test before committing**
9. **Write clear commit messages**
10. **Don't wait too long** before committing

#### Anti-patterns

- ❌ Commit lớn với nhiều thay đổi
- ❌ Đợi hoàn thành feature lớn mới commit
- ❌ Commit mà không test
- ❌ Commit message mơ hồ

- ❌ Commit large with many changes
- ❌ Wait for large feature to be complete before committing
- ❌ Commit without testing
- ❌ Vague commit message

---

### Q2: Best practices cho commit message? / Best practices for commit messages?

#### Mục đích / Purpose

Hiểu cách viết commit message hiệu quả.

Understand how to write effective commit messages.

#### Khi nào dùng / When to use

Luôn luôn cần viết commit message rõ ràng.

Always need to write clear commit messages.

#### Giá trị gì / Benefits

- Lịch sử dễ đọc
- Dễ hiểu lý do thay đổi
- Dễ tìm và filter commits
- Cải thiện code review

- History is easy to read
- Easy to understand reason for change
- Easy to find and filter commits
- Improve code review

#### Định nghĩa / Definition

Commit message tốt nên:

1. **Ngắn gọn**: Subject line < 72 ký tự
2. **Rõ ràng**: Mô tả chính xác những gì đã thay đổi
3. **Imperative mood**: Dùng động từ (add, fix, update)
4. **Conventional format**: Theo quy ước (feat, fix, docs, etc.)

Good commit message should:

1. **Concise**: Subject line < 72 characters
2. **Clear**: Accurately describe what changed
3. **Imperative mood**: Use imperative verbs (add, fix, update)
4. **Conventional format**: Follow convention (feat, fix, docs, etc.)

#### Ví dụ / Examples

**Commit message tốt:**

```
feat: add user authentication

Add login and registration functionality with JWT tokens.
```

**Commit message kém:**

```
Update stuff

Fixed some bugs and added new features.
```

**Conventional Commits format:**

```
feat(auth): add user login
Fix login bug in auth module
docs: update README with new features
refactor(api): simplify user service
test: add unit tests for auth
chore: update dependencies
```

#### Best Practices

1. **Dùng Conventional Commits format**
2. **Giữ subject line ngắn** (< 72 ký tự)
3. **Dùng imperative mood** (add, fix, update)
4. **Mô tả "what" và "why"** trong body
5. **Reference issues** trong footer

6. **Use Conventional Commits format**
7. **Keep subject line short** (< 72 characters)
8. **Use imperative mood** (add, fix, update)
9. **Describe "what" and "why"** in body
10. **Reference issues** in footer

#### Anti-patterns

- ❌ Subject line quá dài
- ❌ Message mơ hồ
- ❌ Không dùng conventional format
- ❌ Không mô tả lý do
- ❌ Dùng past tense

- ❌ Subject line too long
- ❌ Vague message
- ❌ Don't use conventional format
- ❌ Don't describe reason
- ❌ Use past tense

---

### Q3: Tại sao nên keep commits atomic? / Why should you keep commits atomic?

#### Mục đích / Purpose

Hiểu lợi ích của atomic commits.

Understand benefits of atomic commits.

#### Khi nào dùng / When to use

Luôn luôn nên giữ commits atomic.

Always should keep commits atomic.

#### Giá trị gì / Benefits

- Dễ rollback từng thay đổi
- Dễ code review từng commit
- Giảm conflicts
- Lịch sử dễ đọc

- Easier to rollback each change
- Easier to code review each commit
- Reduce conflicts
- History is easy to read

#### Định nghĩa / Definition

Atomic commit có nghĩa là một commit chỉ làm một việc, không liên quan đến các thay đổi khác.

Atomic commit means one commit does one thing, not related to other changes.

#### Ví dụ / Examples

**Atomic commits:**

```bash
# ✅ Atomic - mỗi commit làm một việc
git add src/utils/date.js
git commit -m "feat: add date formatting utility"

git add src/components/Button.js
git commit -m "feat: add button component"

git add src/styles/button.css
git commit -m "style: add button styles"

# ❌ Không atomic - nhiều thay đổi trong một commit
git add src/utils/date.js src/components/Button.js src/styles/button.css
git commit -m "Add date utility and button component with styles"
```

**Atomic refactoring:**

```bash
# ✅ Atomic - refactor từng function
git add src/utils/format.js
git commit -m "refactor: improve date formatting"

git add src/utils/parse.js
git commit -m "refactor: improve date parsing"

# ❌ Không atomic - refactor nhiều function cùng lúc
git add src/utils/format.js src/utils/parse.js
git commit -m "Refactor date utilities"
```

#### Best Practices

1. **Một commit = một logical change**
2. **Không mix refactoring với new features**
3. **Không mix unrelated changes**
4. **Review trước khi commit** để đảm bảo atomic
5. **Git add từng file** thay vì `git add .`

6. **One commit = one logical change**
7. **Don't mix refactoring with new features**
8. **Don't mix unrelated changes**
9. **Review before committing** to ensure atomic
10. **Git add individual files** instead of `git add .`

#### Anti-patterns

- ❌ Mix nhiều thay đổi trong một commit
- ❌ Mix refactoring với features
- ❌ Mix unrelated changes
- ❌ Commit mà không review
- ❌ Git add . thay vì từng file

- ❌ Mix multiple changes in one commit
- ❌ Mix refactoring with features
- ❌ Mix unrelated changes
- ❌ Commit without reviewing
- ❌ Git add . instead of individual files

---

### Q4: Tại sao không nên commit broken code? / Why shouldn't you commit broken code?

#### Mục đích / Purpose

Hiểu rủi ro của commit broken code.

Understand risks of committing broken code.

#### Khi nào dùng / When to use

Luôn luôn nên test kỹ trước khi commit.

Always should test thoroughly before committing.

#### Giá trị gì / Benefits

- Tránh làm hỏ build cho team
- Giảm thời gian debug
- Giữ CI/CD ổn định
- Giữ repository trong trạng thái tốt

- Avoid breaking build for team
- Reduce debugging time
- Keep CI/CD stable
- Keep repository in good state

#### Định nghĩa / Definition

Broken code là code không hoạt động đúng, gây lỗi build, test failures, hoặc runtime errors.

Broken code is code that doesn't work correctly, causing build errors, test failures, or runtime errors.

#### Ví dụ / Examples

**Broken code:**

```javascript
// ❌ Syntax error
function calculateTotal(price, tax) {
  return price + tax; // Missing closing brace
}

// ❌ Runtime error
function divide(a, b) {
  return a / b; // Division by zero risk
}

// ❌ Test failure
function validateEmail(email) {
  return email.includes("@"); // Always returns true
}
```

**Trước khi commit:**

```bash
# ✅ Test kỹ trước
npm test
npm run build

# Nếu tests pass và build thành công
git add .
git commit -m "feat: add user authentication"

# ❌ Nếu tests fail hoặc build error
# KHÔNG COMMIT
```

**CI/CD check:**

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test
      - run: npm run build

# Nếu tests fail, push bị block
```

#### Best Practices

1. **Luôn chạy tests** trước khi commit
2. **Chạy build** để đảm bảo không có errors
3. **Review code** trước khi commit
4. **Test trên môi trường khác nhau** (local, CI)
5. **Không commit** nếu tests fail hoặc build error

6. **Always run tests** before committing
7. **Run build** to ensure no errors
8. **Review code** before committing
9. **Test on different environments** (local, CI)
10. **Don't commit** if tests fail or build error

#### Anti-patterns

- ❌ Commit mà không test
- ❌ Commit với build errors
- ❌ Commit với failing tests
- ❌ Bypass CI checks
- ❌ Commit "WIP" code

- ❌ Commit without testing
- ❌ Commit with build errors
- ❌ Commit with failing tests
- ❌ Bypass CI checks
- ❌ Commit "WIP" code

---

### Q5: Tại sao nên use branches cho features? / Why should you use branches for features?

#### Mục đích / Purpose

Hiểu lợi ích của branching cho feature development.

Understand benefits of branching for feature development.

#### Khi nào dùng / When to use

Khi phát triển features mới hoặc làm việc trên nhiều tasks cùng lúc.

When developing new features or working on multiple tasks at once.

#### Giá trị gì / Benefits

- Tách biệt features
- Dễ review từng feature
- Giảm conflicts
- Có thể work song song
- Dễ rollback nếu cần

- Separate features
- Easy to review each feature
- Reduce conflicts
- Can work in parallel
- Easy to rollback if needed

#### Định nghĩa / Definition

Feature branching là tạo branch riêng cho mỗi feature, phát triển độc lập, và merge khi hoàn thành.

Feature branching is creating separate branch for each feature, developing independently, and merging when complete.

#### Ví dụ / Examples

**Feature branching workflow:**

```bash
# Main branch
git checkout main

# Tạo feature branch
git checkout -b feature/user-authentication

# Develop feature
# ... làm việc ...

# Commit changes
git add .
git commit -m "feat: add user authentication"

# Merge vào main khi hoàn thành
git checkout main
git merge feature/user-authentication

# Xóa feature branch
git branch -d feature/user-authentication
```

**Multiple features:**

```bash
# Main branch
git checkout main

# Feature 1
git checkout -b feature/user-auth
# ... develop ...

# Feature 2
git checkout -b feature/user-profile
# ... develop ...

# Feature 3
git checkout -b feature/settings
# ... develop ...

# Merge khi hoàn thành
git checkout main
git merge feature/user-auth
git merge feature/user-profile
git merge feature/settings
```

#### Best Practices

1. **Tạo branch cho mỗi feature**
2. **Giữ branches ngắn** - merge sớm khi hoàn thành
3. **Đặt tên branch rõ ràng**
4. **Delete branches** sau khi merge
5. **Sử dụng descriptive branch names**

6. **Create branch for each feature**
7. **Keep branches short** - merge soon after complete
8. **Use clear branch names**
9. **Delete branches** after merging
10. **Use descriptive branch names**

#### Anti-patterns

- ❌ Làm nhiều features trên một branch
- ❌ Giữ branches quá lâu
- ❌ Tên branch mơ hồ
- ❌ Không delete branches sau khi merge
- ❌ Merge mà không review

- ❌ Work on multiple features on one branch
- ❌ Keep branches too long
- ❌ Vague branch names
- ❌ Don't delete branches after merging
- ❌ Merge without reviewing

---

### Q6: Best practices cho review trước khi merge? / Best practices for review before merge?

#### Mục đích / Purpose

Hiểu cách review code hiệu quả trước khi merge.

Understand how to effectively review code before merging.

#### Khi nào dùng / When to use

Luôn luôn nên review code trước khi merge vào main branch.

Always should review code before merging into main branch.

#### Giá trị gì / Benefits

- Bắt lỗi sớm
- Cải thiện code quality
- Chia sẻ kiến thức
- Giảm conflicts

- Catch bugs early
- Improve code quality
- Share knowledge
- Reduce conflicts

#### Định nghĩa / Definition

Code review là quá trình kiểm tra code bởi team members trước khi merge.

Code review is process of checking code by team members before merging.

#### Ví dụ / Examples

**Pull Request review:**

```markdown
## PR: Add user authentication

### Changes

- Added login component
- Added registration component
- Implemented JWT authentication
- Added auth middleware

### Testing

- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed

### Checklist

- [x] Code follows style guide
- [x] No console errors
- [x] Performance acceptable
- [x] Documentation updated

### Notes

Please review the auth implementation for security best practices.
```

**Review comments:**

```javascript
// ❌ Review comment không hữu ích
// This looks good. +1

// ✅ Review comment hữu ích
// Consider using async/await pattern instead of callbacks
// The callback nesting makes this hard to read.

// ✅ Review comment với action item
// TODO: Extract this to a separate utility function
```

#### Best Practices

1. **Review từng commit** trong PR
2. **Test code** trước khi request review
3. **Cung context** trong review comments
4. **Sử dụng checklist** để đảm bảo chất lượng
5. **Constructive feedback** - chuyên vào code, không người

6. **Review each commit** in PR
7. **Test code** before requesting review
8. **Provide context** in review comments
9. **Use checklist** to ensure quality
10. **Constructive feedback** - focus on code, not person

#### Anti-patterns

- ❌ Review quá nhanh
- ❌ Không test trước khi review
- ❌ Review comments không hữu ích
- ❌ Feedback cá nhân
- ❌ Không follow checklist

- ❌ Review too quickly
- ❌ Don't test before review
- ❌ Unhelpful review comments
- ❌ Personal feedback
- ❌ Don't follow checklist

---

### Q7: Tại sao nên keep history clean? / Why should you keep history clean?

#### Mục đích / Purpose

Hiểu lợi ích của lịch sử Git sạch sẽ.

Understand benefits of clean Git history.

#### Khi nào dùng / When to use

Luôn luôn nên giữ lịch sử Git sạch sẽ.

Always should keep Git history clean.

#### Giá trị gì / Benefits

- Dễ đọc và hiểu lịch sử
- Dễ tìm và debug
- Giảm repository size
- Cải thiện performance
- Chuyên nghiệp hơn

- Easy to read and understand history
- Easy to find and debug
- Reduce repository size
- Improve performance
- More professional

#### Định nghĩa / Definition

Lịch sử sạch sẽ là lịch sử có commits rõ ràng, không có WIP commits, không có merge conflicts, và dễ hiểu.

Clean history is history with clear commits, no WIP commits, no merge conflicts, and easy to understand.

#### Ví dụ / Examples

**Lịch sử sạch sẽ:**

```bash
$ git log --oneline
abc1234 feat: add user login
def5678 fix: correct email validation
ghi9012 docs: update README
jkl3456 refactor: simplify auth service
mno7890 feat: add user profile
pqr1234 fix: profile image upload
```

**Lịch sử bừa rộn:**

```bash
$ git log --oneline
abc1234 WIP: add user login
def5678 fix: typo
ghi9012 WIP: add more features
jkl3456 fix: another typo
mno7890 WIP: almost done
pqr1234 fix: final fix
abc1234 feat: complete user authentication
def5678 refactor: cleanup
```

**Clean history với interactive rebase:**

```bash
# Squash WIP commits
git rebase -i HEAD~5

# Kết quả: một commit rõ ràng
abc1234 feat: add user authentication
```

#### Best Practices

1. **Không commit WIP code**
2. **Rebase trước khi merge** để squash WIP commits
3. **Sửa commit messages** nếu cần
4. **Sử dụng merge --no-ff** để giữ lịch sử rõ ràng
5. **Giữ commits linear** khi có thể

6. **Don't commit WIP code**
7. **Rebase before merging** to squash WIP commits
8. **Fix commit messages** if needed
9. **Use merge --no-ff** to keep clear history
10. **Keep commits linear** when possible

#### Anti-patterns

- ❌ Commit WIP thường xuyên
- ❌ Không clean WIP commits trước khi merge
- ❌ Commit messages mơ hồ
- ❌ Không rebase để squash
- ❌ Merge commits gây conflicts

- ❌ Commit WIP frequently
- ❌ Don't clean WIP commits before merging
- ❌ Vague commit messages
- ❌ Don't rebase to squash
- ❌ Merge commits causing conflicts

---

### Q8: Tại sao nên document decisions? / Why should you document decisions?

#### Mục đích / Purpose

Hiểu tầm quan trọng của documenting decisions trong Git.

Understand importance of documenting decisions in Git.

#### Khi nào dùng / When to use

Khi đưa ra quyết định quan trọng về architecture, design, hoặc trade-offs.

When making important decisions about architecture, design, or trade-offs.

#### Giá trị gì / Benefits

- Lưu lại lý do cho các quyết định
- Giúp team members hiểu context
- Dễ review decisions sau này
- Tránh tranh luận lặp lại

- Record reasons for decisions
- Help team members understand context
- Easy to review decisions later
- Avoid repeating arguments

#### Định nghĩa / Definition

Documenting decisions là ghi lại lý do tại sao chọn giải pháp này thay vì giải pháp khác trong commit message hoặc documentation.

Documenting decisions is recording why choosing this solution instead of other solutions in commit message or documentation.

#### Ví dụ / Examples

**Document trong commit message:**

```
feat: use PostgreSQL instead of MongoDB

Chose PostgreSQL over MongoDB for this project because:
- Better support for complex queries
- Lower operational cost
- Team has more experience with PostgreSQL
- Better integration with existing infrastructure

Trade-offs:
- MongoDB would have been faster for simple queries
- MongoDB has better horizontal scaling
```

**Document trong ADR (Architecture Decision Record):**

```markdown
# ADR-001: Database Selection

## Context

Need to choose database for user management system.

## Decision

Use PostgreSQL instead of MongoDB.

## Reasons

- Better support for complex queries
- Lower operational cost
- Team has more experience with PostgreSQL
- Better integration with existing infrastructure

## Trade-offs

- MongoDB would have been faster for simple queries
- MongoDB has better horizontal scaling

## Alternatives Considered

- MySQL
- PostgreSQL
- MongoDB
- Cassandra

## Result

Use PostgreSQL.

## Date

2024-01-15
```

**Document trong code comments:**

```javascript
/**
 * ADR: Use async/await pattern for API calls
 *
 * Decision: Use async/await instead of callbacks
 *
 * Reason:
 * - Better error handling
 * - More readable code
 * - Easier to test
 * - Modern JavaScript practice
 *
 * Trade-offs:
 * - Requires Node.js 8+ (not a concern for this project)
 * - Slightly more verbose than callbacks
 *
 * Date: 2024-01-20
 */
```

#### Best Practices

1. **Document trong commit message** cho decisions lớn
2. **Tạo ADR files** cho architecture decisions
3. **Document trong code** với comments
4. **Update documentation** khi thay đổi
5. **Review documentation** thường xuyên

6. **Document in commit message** for large decisions
7. **Create ADR files** for architecture decisions
8. **Document in code** with comments
9. **Update documentation** when changing
10. **Review documentation** regularly

#### Anti-patterns

- ❌ Không document decisions
- ❌ Documentation quá cũ
- ❌ Không review documentation
- ❌ Documentation mơ hồ
- ❌ Không update khi thay đổi

- ❌ Don't document decisions
- ❌ Documentation is outdated
- ❌ Don't review documentation
- ❌ Vague documentation
- ❌ Don't update when changing

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **"Commit early, commit often"** - Commit thường xuyên và nhỏ
2. **Commit messages** - Rõ ràng, ngắn, theo conventional format
3. **Atomic commits** - Một commit làm một việc
4. **Không commit broken code** - Test kỹ trước khi commit
5. **Feature branching** - Tạo branch riêng cho mỗi feature
6. **Code review** - Review kỹ trước khi merge
7. **Clean history** - Giữ lịch sử sạch sẽ
8. **Document decisions** - Ghi lại lý do cho quyết định

9. **"Commit early, commit often"** - Commit frequently and in small chunks
10. **Commit messages** - Clear, short, follow conventional format
11. **Atomic commits** - One commit does one thing
12. **Don't commit broken code** - Test thoroughly before committing
13. **Feature branching** - Create separate branch for each feature
14. **Code review** - Review carefully before merging
15. **Clean history** - Keep Git history clean
16. **Document decisions** - Record reasons for decisions

### Commands Reference / Tham khảo lệnh

```bash
# Commit thường xuyên
git add <file>
git commit -m "message"

# Rebase để clean history
git rebase -i HEAD~n

# Merge với history rõ ràng
git merge --no-ff <branch>

# Xem lịch sử
git log --oneline
git log --graph
```

### Best Practices / Thực hành tốt nhất

1. **Commit thường xuyên** - Sau mỗi task nhỏ
2. **Giữ commits atomic** - Một commit, một việc
3. **Viết commit messages rõ ràng** - Theo conventional format
4. **Test trước khi commit** - Luôn chạy tests
5. **Dùng feature branches** - Tạo branch cho mỗi feature
6. **Review code trước khi merge** - Kiểm tra kỹ
7. **Giữ history sạch sẽ** - Rebase để squash WIP commits
8. **Document decisions** - Ghi lại lý do

9. **Commit frequently** - After each small task
10. **Keep commits atomic** - One commit, one thing
11. **Write clear commit messages** - Follow conventional format
12. **Test before committing** - Always run tests
13. **Use feature branches** - Create branch for each feature
14. **Review code before merging** - Check carefully
15. **Keep history clean** - Rebase to squash WIP commits
16. **Document decisions** - Record reasons
