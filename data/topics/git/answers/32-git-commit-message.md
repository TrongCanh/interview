# Git Commit Message / Git Commit Message

> Hướng dẫn chi tiết về cách viết commit message hiệu quả / Comprehensive guide to writing effective Git commit messages

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách viết commit message rõ ràng, hiệu quả để dễ đọc và hiểu.

Understand how to write clear, effective commit messages that are easy to read and understand.

### Khi nào cần hiểu / When to understand

Luôn luôn cần viết commit message tốt khi làm việc với Git.

Always need to write good commit messages when working with Git.

### Giá trị gì / Benefits

- Lịch sử dễ đọc và hiểu
- Dễ tìm và filter commits
- Cải thiện code review
- Tự động hóa changelog generation
- Chuyên nghiệp hơn

- History is easy to read and understand
- Easy to find and filter commits
- Improve code review
- Automate changelog generation
- More professional

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Chuẩn hóa format
- Dễ đọc và hiểu
- Tự động hóa tools
- Cải thiện collaboration

**Nhược điểm / Cons:**

- Có thể mất thời gian ban đầu
- Cần discipline để tuân thủ
- Format có thể quá cứng nhặt

**Pros:**

- Standardized format
- Easy to read and understand
- Automated tools
- Improved collaboration

**Cons:**

- Can take time initially
- Requires discipline to follow
- Format can be too rigid

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Conventional Commits specification là gì? / What is Conventional Commits specification?

#### Mục đích / Purpose

Hiểu Conventional Commits specification và cách áp dụng.

Understand Conventional Commits specification and how to apply it.

#### Khi nào dùng / When to use

Khi muốn tuân thủ chuẩn cho commit message.

When wanting to follow standard for commit messages.

#### Giá trị gì / Benefits

- Chuẩn hóa format
- Dễ đọc và filter
- Tự động hóa tools
- Cải thiện collaboration

- Standardized format
- Easy to read and filter
- Automated tools
- Improved collaboration

#### Định nghĩa / Definition

Conventional Commits specification là quy ước cho commit message:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: Loại thay đổi (feat, fix, docs, style, refactor, test, chore)
- **scope**: Phạm vi ảnh hưởng (optional)
- **subject**: Mô tả ngắn (< 72 ký tự)
- **body**: Mô tả chi tiết (optional)
- **footer**: Metadata (optional)

Conventional Commits specification is convention for commit message:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: Type of change (feat, fix, docs, style, refactor, test, chore)
- **scope**: Affected scope (optional)
- **subject**: Short description (< 72 characters)
- **body**: Detailed description (optional)
- **footer**: Metadata (optional)

#### Ví dụ / Examples

**Conventional Commits format:**

```
feat(auth): add user login

Add JWT-based authentication with login and registration endpoints.
Implements secure token storage and refresh logic.

Closes #123
```

**Các types:**

```
feat:     New feature
fix:       Bug fix
docs:      Documentation changes
style:     Code style changes (formatting, etc.)
refactor:  Code refactoring
test:      Adding or updating tests
chore:      Maintenance tasks (build, dependencies, etc.)
perf:      Performance improvements
ci:        CI/CD changes
build:     Build system changes
revert:    Revert previous commit
```

**Scopes:**

```
auth:      Authentication and authorization
user:      User management
api:        API changes
db:         Database changes
ui:         User interface changes
config:      Configuration changes
```

#### Best Practices

1. **Dùng type đúng** cho loại thay đổi
2. **Giữ subject ngắn** (< 72 ký tự)
3. **Dùng imperative mood** trong subject
4. **Bắt subject với chữ thường** (không viết hoa)
5. **Reference issues** trong footer

6. **Use correct type** for type of change
7. **Keep subject short** (< 72 characters)
8. **Use imperative mood** in subject
9. **Start subject with lowercase** (not capital)
10. **Reference issues** in footer

#### Anti-patterns

- ❌ Subject quá dài
- ❌ Dùng past tense
- ❌ Subject viết hoa
- ❌ Không mô tả rõ ràng
- ❌ Type không chính xác

- ❌ Subject too long
- ❌ Use past tense
- ❌ Capitalized subject
- ❌ Vague description
- ❌ Incorrect type

---

### Q2: Format: `type(scope): subject` hoạt động như thế nào? / How does `type(scope): subject` format work?

#### Mục đích / Purpose

Hiểu cấu trúc và syntax của Conventional Commits format.

Understand structure and syntax of Conventional Commits format.

#### Khi nào dùng / When to use

Khi viết commit message theo Conventional Commits.

When writing commit message following Conventional Commits.

#### Giá trị gì / Benefits

- Format nhất quán
- Dễ parse bởi tools
- Rõ ràng về loại và phạm vi
- Dễ đọc

- Consistent format
- Easy to parse by tools
- Clear about type and scope
- Easy to read

#### Định nghĩa / Definition

Format `type(scope): subject`:

- **type**: Bắt buộc, một trong các types được định nghĩa
- **scope**: Tùy chọn, trong ngoặc đơn `()`
- **subject**: Bắt buộc, mô tả ngắn
- **Colon**: Phân tách type và scope

Format `type(scope): subject`:

- **type**: Required, one of defined types
- **scope**: Optional, in parentheses `()`
- **subject**: Required, short description
- **Colon**: Separates type and scope

#### Ví dụ / Examples

**Format với scope:**

```
feat(auth): add user login
fix(api): correct email validation
docs(readme): update installation guide
style(ui): fix button alignment
refactor(user): simplify profile logic
test(auth): add login unit tests
```

**Format không có scope:**

```
feat: add user authentication
fix: fix memory leak in data processing
docs: update API documentation
style: format code with Prettier
refactor: optimize database queries
test: add integration tests
```

**Subject line rules:**

```
✅ feat: add user login
✅ feat(auth): add user login
❌ Feat: Add User Login (viết hoa)
✅ fix: correct email validation
✅ fix(api): correct email validation
❌ fix(api): Correct email validation (scope không cần thiết)
```

#### Best Practices

1. **Dùng type đúng** cho loại thay đổi
2. **Scope chỉ khi cần thiết** để xác định module
3. **Giữ subject ngắn** và mô tả chính xác
4. **Dùng imperative mood** (add, fix, not added, fixed)
5. **Bắt subject với chữ thường**

6. **Use correct type** for type of change
7. **Only use scope when needed** to specify module
8. **Keep subject short** and accurately describe
9. **Use imperative mood** (add, fix, not added, fixed)
10. **Start subject with lowercase**

#### Anti-patterns

- ❌ Dùng sai type
- ❌ Scope quá rộng hoặc không cần thiết
- ❌ Subject quá dài hoặc mơ hồ
- ❌ Dùng declarative mood
- ❌ Viết hoa subject

- ❌ Use wrong type
- ❌ Scope too broad or unnecessary
- ❌ Subject too long or vague
- ❌ Use declarative mood
- ❌ Capitalize subject

---

### Q3: Các types: feat, fix, docs, style, refactor, test, chore khác nhau như thế nào? / How do types: feat, fix, docs, style, refactor, test, chore differ?

#### Mục đích / Purpose

Hiểu ý nghĩa và cách dùng từng type trong Conventional Commits.

Understand meaning and usage of each type in Conventional Commits.

#### Khi nào dùng / When to use

Khi cần chọn type phù hợp cho commit.

When needing to choose appropriate type for commit.

#### Giá trị gì / Benefits

- Dễ phân loại commits
- Dễ filter theo type
- Hiểu ý nghĩa thay đổi
- Tự động hóa changelog

- Easy to categorize commits
- Easy to filter by type
- Understand intent of change
- Automate changelog

#### Định nghĩa / Definition

Các types trong Conventional Commits:

| Type     | Mô tả                    | Ví dụ                     |
| -------- | ------------------------ | ------------------------- |
| feat     | New feature              | Add user login            |
| fix      | Bug fix                  | Fix authentication bug    |
| docs     | Documentation            | Update README             |
| style    | Code style               | Format code with Prettier |
| refactor | Code refactoring         | Optimize database queries |
| test     | Adding or updating tests | Add unit tests            |
| chore    | Maintenance tasks        | Update dependencies       |

Types in Conventional Commits:

| Type     | Description              | Example                   |
| -------- | ------------------------ | ------------------------- |
| feat     | New feature              | Add user login            |
| fix      | Bug fix                  | Fix authentication bug    |
| docs     | Documentation            | Update README             |
| style    | Code style               | Format code with Prettier |
| refactor | Code refactoring         | Optimize database queries |
| test     | Adding or updating tests | Add unit tests            |
| chore    | Maintenance tasks        | Update dependencies       |

#### Ví dụ / Examples

**feat - New feature:**

```
feat: add user authentication

Implement JWT-based authentication with login and registration.
- Add token storage and refresh logic
- Implement secure password hashing
- Add email verification

Closes #123
```

**fix - Bug fix:**

```
fix(auth): correct token expiration check

Fix issue where tokens weren't properly expiring.
Now tokens expire correctly after 24 hours.

Fixes #456
```

**docs - Documentation:**

```
docs(readme): update installation guide

Add instructions for:
- Installing dependencies
- Running development server
- Building for production

Closes #789
```

**style - Code style:**

```
style(ui): fix button alignment

Use flexbox for consistent button alignment across all screens.
```

**refactor - Code refactoring:**

```
refactor(api): simplify user service

Extract common user operations into separate utility functions.
Reduces code duplication and improves maintainability.
```

**test - Tests:**

```
test(auth): add login unit tests

Add comprehensive unit tests for login functionality.
Covers success and failure scenarios.
```

**chore - Maintenance:**

```
chore(deps): update dependencies

Update all packages to latest versions.
- react: 18.2.0
- lodash: 4.17.21
```

#### Best Practices

1. **Dùng type đúng** cho từng loại thay đổi
2. **feat** chỉ cho new features
3. **fix** chỉ cho bug fixes
4. **refactor** chỉ cho code refactoring (không thay đổi behavior)
5. **test** chỉ cho test-related changes

6. **Use correct type** for each type of change
7. **feat** only for new features
8. **fix** only for bug fixes
9. **refactor** only for code refactoring (no behavior change)
10. **test** only for test-related changes

#### Anti-patterns

- ❌ Dùng feat cho bug fixes
- ❌ Dùng fix cho new features
- ❌ Dùng refactor cho behavior changes
- ❌ Dùng test cho non-test changes

- ❌ Use feat for bug fixes
- ❌ Use fix for new features
- ❌ Use refactor for behavior changes
- ❌ Use test for non-test changes

---

### Q4: Rules cho subject line? / Rules for subject line?

#### Mục đích / Purpose

Hiểu các quy tắc cho subject line trong Conventional Commits.

Understand rules for subject line in Conventional Commits.

#### Khi nào dùng / When to use

Khi viết subject line cho commit message.

When writing subject line for commit message.

#### Giá trị gì / Benefits

- Subject nhất quán và dễ đọc
- Dễ parse bởi tools
- Giảm ambiguity

- Consistent and easy to read
- Easy to parse by tools
- Reduce ambiguity

#### Định nghĩa / Definition

Các quy tắc cho subject line:

1. **Ngắn gọn**: < 72 ký tự
2. **Imperative mood**: Dùng động từ (add, fix, not added)
3. **Viết thường**: Không viết hoa
4. **Không kết thúc bằng dấu chấm**: Chỉ khi cần
5. **Mô tả chính xác những gì đã thay đổi**

Rules for subject line:

1. **Concise**: < 72 characters
2. **Imperative mood**: Use imperative verbs (add, fix, not added)
3. **Lowercase**: No capitalization
4. **No period**: Only when needed
5. **Accurate description**: Describe what changed

#### Ví dụ / Examples

**Subject tốt:**

```
✅ feat: add user authentication
✅ fix: correct email validation
✅ docs: update installation guide
✅ style: format code with Prettier
✅ refactor: simplify user service
✅ test: add login unit tests
```

**Subject kém:**

```
❌ Add user authentication (không có type)
❌ Fixed email validation (dùng past tense)
❌ Update installation guide (quá dài)
❌ Format Code (viết hoa)
❌ Simplified user service (không mô tả rõ)
❌ Add login unit tests (không mô tả rõ)
```

**Subject với scope:**

```
✅ feat(auth): add user login
✅ fix(api): correct email validation
✅ docs(readme): update installation guide
```

#### Best Practices

1. **Giữ subject ngắn** (< 72 ký tự)
2. **Dùng imperative mood** (add, fix, update)
3. **Viết thường** (không viết hoa)
4. **Mô tả chính xác** những gì đã thay đổi
5. **Không kết thúc bằng dấu chấm** trừ khi cần

6. **Keep subject short** (< 72 characters)
7. **Use imperative mood** (add, fix, update)
8. **Write in lowercase** (no capitalization)
9. **Describe accurately** what changed
10. **No period** unless needed

#### Anti-patterns

- ❌ Subject quá dài (> 72 ký tự)
- ❌ Dùng past tense (added, fixed)
- ❌ Viết hoa subject
- ❌ Mô tả mơ hồ
- ❌ Luôn kết thúc bằng dấu chấm

- ❌ Subject too long (> 72 characters)
- ❌ Use past tense (added, fixed)
- ❌ Capitalize subject
- ❌ Vague description
- ❌ Always end with period

---

### Q5: Body và footer trong commit message? / Body and footer in commit message?

#### Mục đích / Purpose

Hiểu cách viết body và footer cho commit message chi tiết.

Understand how to write body and footer for detailed commit message.

#### Khi nào dùng / When to use

Khi cần mô tả chi tiết thay đổi hoặc thêm metadata.

When needing to describe changes in detail or add metadata.

#### Giá trị gì / Benefits

- Cung context đầy đủ
- Giải thích lý do thay đổi
- Reference issues và PRs
- Tự động hóa changelog

- Provide full context
- Explain reason for change
- Reference issues and PRs
- Automate changelog

#### Định nghĩa / Definition

**Body**: Mô tả chi tiết thay đổi, có thể nhiều dòng.

**Footer**: Metadata như issue references, breaking changes, etc.

**Body**: Detailed description of changes, can be multiple lines.

**Footer**: Metadata like issue references, breaking changes, etc.

#### Ví dụ / Examples

**Body chi tiết:**

```
feat(auth): add user login

Add JWT-based authentication with login and registration.

Implementation details:
- JWT tokens stored in localStorage
- Token refresh mechanism implemented
- Password hashing with bcrypt
- Email verification flow added

Security considerations:
- Tokens expire after 24 hours
- HTTPS only for auth endpoints
- Rate limiting implemented

Closes #123
```

**Footer với issue reference:**

```
feat(auth): add user login

Add JWT-based authentication with login and registration.

Closes #123
```

**Footer với breaking changes:**

```
feat(api): remove deprecated endpoints

BREAKING CHANGE: The /api/v1/ endpoints have been removed.
Migration guide: See MIGRATION.md

Closes #456
```

**Footer với co-authored commits:**

```
feat: add user authentication

Co-authored-by: Jane Doe <jane@example.com>
Co-authored-by: Bob Smith <bob@example.com>
```

#### Best Practices

1. **Dùng body** cho thay đổi phức tạp
2. **Reference issues** trong footer
3. **Cung context** và lý do
4. **Dùng BREAKING CHANGE** cho breaking changes
5. **Giữ body ngắn gọn** khi có thể

6. **Use body** for complex changes
7. **Reference issues** in footer
8. **Provide context** and reasoning
9. **Use BREAKING CHANGE** for breaking changes
10. **Keep body concise** when possible

#### Anti-patterns

- ❌ Body quá dài không cần thiết
- ❌ Không reference issues
- ❌ Không thông báo breaking changes
- ❌ Body mơ hồ hoặc không rõ ràng

- ❌ Body too long unnecessarily
- ❌ Don't reference issues
- ❌ Don't announce breaking changes
- ❌ Vague or unclear body

---

### Q6: Examples của good commit messages? / Examples of good commit messages?

#### Mục đích / Purpose

Xem các ví dụ commit message tốt để học cách viết.

See examples of good commit messages to learn how to write.

#### Khi nào dùng / When to use

Khi cần tham khảo cách viết commit message.

When needing to reference how to write commit messages.

#### Giá trị gì / Benefits

- Học từ ví dụ thực tế
- Hiểu best practices
- Cải thiện kỹ năng viết

- Learn from real examples
- Understand best practices
- Improve writing skills

#### Định nghĩa / Definition

Các ví dụ commit message tốt cho các tình huống khác nhau.

Examples of good commit messages for different situations.

#### Ví dụ / Examples

**feat - New feature:**

```
feat: add user authentication

Implement JWT-based authentication with login and registration.

- Add token storage and refresh logic
- Implement secure password hashing
- Add email verification flow

Closes #123
```

**fix - Bug fix:**

```
fix(auth): correct token expiration check

Fix issue where tokens weren't properly expiring.
Now tokens expire correctly after 24 hours.

Fixes #456
```

**docs - Documentation:**

```
docs(readme): update installation guide

Update installation instructions with new requirements:
- Node.js 18+ required
- PostgreSQL 14+ required
- Environment variables documented

Closes #789
```

**refactor - Code refactoring:**

```
refactor(api): simplify user service

Extract common user operations into separate utility functions.
Reduces code duplication and improves maintainability.

Performance impact: ~15% faster user operations.
```

**test - Tests:**

```
test(auth): add login unit tests

Add comprehensive unit tests for login functionality.
Covers success and failure scenarios.
Coverage: 95%

Closes #234
```

**chore - Maintenance:**

```
chore(deps): update dependencies

Update all packages to latest versions:
- react: 18.2.0
- react-dom: 18.2.0
- lodash: 4.17.21
```

**Breaking changes:**

```
feat(api): remove deprecated endpoints

BREAKING CHANGE: The /api/v1/ endpoints have been removed.
Migration guide: See MIGRATION.md

Closes #456
```

#### Best Practices

1. **Mô tả "what" và "why"** trong body
2. **Reference issues** khi liên quan
3. **Dùng BREAKING CHANGE** cho breaking changes
4. **Giữ commit message nhất quán**
5. **Dùng footer** cho metadata

6. **Describe "what" and "why"** in body
7. **Reference issues** when relevant
8. **Use BREAKING CHANGE** for breaking changes
9. **Keep commit message consistent**
10. **Use footer** for metadata

#### Anti-patterns

- ❌ Commit message mơ hồ
- ❌ Không reference issues khi cần
- ❌ Không thông báo breaking changes
- ❌ Format không nhất quán
- ❌ Footer không có thông tin cần thiết

- ❌ Vague commit message
- ❌ Don't reference issues when needed
- ❌ Don't announce breaking changes
- ❌ Inconsistent format
- ❌ Footer missing needed info

---

### Q7: Các tools cho commit message? / What are tools for commit messages?

#### Mục đích / Purpose

Hiểu các công cụ hỗ trợ viết và validate commit messages.

Understand tools that help write and validate commit messages.

#### Khi nào dùng / When to use

Khi muốn tự động hóa quy trình commit message.

When wanting to automate commit message workflow.

#### Giá trị gì / Benefits

- Validate commit messages
- Tự động hóa format
- Tạo changelog từ commits
- Enforce best practices
- Giảm lỗi do con người

- Validate commit messages
- Automate format
- Generate changelog from commits
- Enforce best practices
- Reduce human errors

#### Định nghĩa / Definition

Các công cụ hỗ trợ commit messages:

1. **Commitlint**: Validate commit messages
2. **Husky**: Git hooks để enforce standards
3. **Commitizen**: Interactive CLI để tạo commits
4. **Conventional Changelog**: Tự động tạo changelog

Tools that support commit messages:

1. **Commitlint**: Validate commit messages
2. **Husky**: Git hooks to enforce standards
3. **Commitizen**: Interactive CLI to create commits
4. **Conventional Changelog**: Auto-generate changelog

#### Ví dụ / Examples

**Commitlint:**

```json
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always'],
    'type-case': [2, 'always'],
    'subject-empty': [2, 'always'],
    'subject-full-stop': [2, 'always'],
    'subject-case': [2, 'always'],
    'body-leading-blank': [1, 'always'],
    'footer-max-line-length': [0, 'always']
  }
}
```

**Husky:**

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

**Commitizen:**

```bash
# Cài đặt
npm install -g commitizen cz-conventional-changelog

# Sử dụng
git cz

# Hoặc với git hook
git commit
```

**Conventional Changelog:**

```json
// package.json
{
  "version": "0.0.0",
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

#### Best Practices

1. **Cài đặt commitlint** để validate messages
2. **Dùng Husky** để enforce trước khi commit
3. **Cấu hình Commitizen** cho team
4. **Tự động tạo changelog** với conventional-changelog
5. **Tùy chỉnh rules** theo nhu cầu team

6. **Install commitlint** to validate messages
7. **Use Husky** to enforce before committing
8. **Configure Commitizen** for team
9. **Auto-generate changelog** with conventional-changelog
10. **Customize rules** by team needs

#### Anti-patterns

- ❌ Không validate commit messages
- ❌ Không enforce standards với hooks
- ❌ Dùng Commitizen mà không cấu hình
- ❌ Không tạo changelog tự động
- ❌ Rules quá cứng nhặt

- ❌ Don't validate commit messages
- ❌ Don't enforce standards with hooks
- ❌ Use Commitizen without configuring
- ❌ Don't auto-generate changelog
- ❌ Rules too rigid

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Conventional Commits** là quy ước cho commit message
2. **Format**: `type(scope): subject` với type, scope (optional), và subject
3. **Types**: feat, fix, docs, style, refactor, test, chore
4. **Subject rules**: Ngắn (< 72 ký tự), imperative mood, viết thường
5. **Body**: Mô tả chi tiết thay đổi (optional)
6. **Footer**: Metadata như issue references, breaking changes
7. **Tools**: Commitlint, Husky, Commitizen, Conventional Changelog

8. **Conventional Commits** is convention for commit messages
9. **Format**: `type(scope): subject` with type, scope (optional), and subject
10. **Types**: feat, fix, docs, style, refactor, test, chore
11. **Subject rules**: Short (< 72 characters), imperative mood, lowercase
12. **Body**: Detailed description of changes (optional)
13. **Footer**: Metadata like issue references, breaking changes
14. **Tools**: Commitlint, Husky, Commitizen, Conventional Changelog

### Commands Reference / Tham khảo lệnh

```bash
# Validate commit message
npx commitlint --edit

# Tự động tạo commit message
git cz

# Tạo changelog
npx conventional-changelog -p angular -i CHANGELOG.md

# Xem changelog
git log --oneline --grep "^feat"
```

### Best Practices / Thực hành tốt nhất

1. **Dùng Conventional Commits format** nhất quán
2. **Giữ subject ngắn** và mô tả chính xác
3. **Dùng type đúng** cho từng loại thay đổi
4. **Mô tả chi tiết** trong body khi cần
5. **Reference issues** trong footer
6. **Cài đặt tools** (commitlint, Husky) để enforce standards
7. **Tự động tạo changelog** từ commits

8. **Use Conventional Commits format** consistently
9. **Keep subject short** and describe accurately
10. **Use correct type** for each type of change
11. **Describe in detail** in body when needed
12. **Reference issues** in footer
13. **Install tools** (commitlint, Husky) to enforce standards
14. **Auto-generate changelog** from commits
