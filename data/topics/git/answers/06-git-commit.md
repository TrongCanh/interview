# 6. Git Commit / Git Commit

## Tổng quan về Git Commit / Git Commit Overview

### Mục đích / Purpose

**Git Commit** là action lưu trữ các staged changes vào repository với một message mô tả. Commit là đơn vị cơ bản để lưu trữ lịch sử trong Git.

**Mục đích chính:**

- Hiểu cách Git lưu trữ changes
- Biết cách tạo commits có ý nghĩa
- Hiểu các options của `git commit` command
- Biết cách sửa commits
- Nắm được best practices cho commit messages

### Khi nào cần hiểu về Git Commit / When to Use

Hiểu về Git Commit là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn tạo commits có ý nghĩa
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Xử lý các vấn đề về commit
- Review commit history

### Giúp ích gì / Benefits

**Lợi ích:**

- **Version Control**: Lưu trữ lịch sử changes
- **Collaboration**: Chia sẻ changes với team
- **Rollback**: Có thể quay lại các versions trước
- **Traceability**: Theo dõi ai đã làm gì
- **Documentation**: Commit messages như documentation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                      | Nhược điểm (Cons)                       |
| ----------------------------------- | --------------------------------------- |
| Permanent - commits là permanent    | Cannot delete - không thể xóa hoàn toàn |
| Traceable - có thể trace lịch sử    | Large history - history có thể lớn      |
| Reversible - có thể revert commits  | Bad commits - commits xấu gây khó khăn  |
| Shareable - có thể chia sẻ với team | Conflicts - có thể gây conflicts        |

---

## `git commit` là gì? Quy trình commit diễn ra như thế nào? / What is `git commit`? How does the commit process work?

### Mục đích / Purpose

Hiểu `git commit` và quy trình commit giúp bạn:

- Biết cách Git lưu trữ changes
- Hiểu workflow của Git
- Debug các vấn đề về commit

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Training Git cho developers mới
- Giải thích Git workflow

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ Git workflow
- **Efficiency**: Sử dụng Git hiệu quả hơn
- **Debugging**: Dễ dàng debug các vấn đề về commit

### Định nghĩa / Definition

**`git commit`** là command lưu trữ các staged changes vào repository với một commit message. Commit tạo một snapshot của repository tại thời điểm đó.

### Quy trình commit / Commit Process

```
1. Modify Files (Working Directory)
   ↓
2. Stage Changes (git add)
   ↓
3. Review Staged Changes (git diff --staged)
   ↓
4. Commit (git commit)
   ↓
5. Commit Created (Repository)
```

### Chi tiết từng bước / Step by Step

| Step | Action | Command             | Description                       |
| ---- | ------ | ------------------- | --------------------------------- |
| 1    | Modify | -                   | Sửa files trong working directory |
| 2    | Stage  | `git add`           | Move changes vào staging area     |
| 3    | Review | `git diff --staged` | Review staged changes             |
| 4    | Commit | `git commit`        | Create commit với message         |
| 5    | Done   | -                   | Commit được lưu vào repository    |

### Ví dụ:

```bash
# Step 1: Modify a file
echo "new content" >> file.txt

# Step 2: Stage the change
git add file.txt

# Step 3: Review staged changes
git diff --staged

# Step 4: Commit
git commit -m "Add new content to file.txt"

# Step 5: Verify commit
git log --oneline
```

### Cách Git tạo commit / How Git Creates a Commit

1. **Create commit object**: Git tạo một commit object với:
   - SHA-1 hash (commit ID)
   - Author info (name, email, date)
   - Committer info (name, email, date)
   - Parent commit(s)
   - Commit message
   - Tree object (snapshot của files)

2. **Store in repository**: Commit được lưu trong `.git/objects/` directory

3. **Update HEAD**: HEAD được cập nhật để trỏ đến commit mới

### Best Practices:

1. **Review before commit**: Luôn review staged changes trước khi commit
2. **Write meaningful messages**: Viết commit messages có ý nghĩa
3. **Keep commits atomic**: Mỗi commit nên làm một việc duy nhất
4. **Commit often**: Commit thường xuyên nhưng với changes có ý nghĩa

---

## `git commit -m` khác `git commit -am` như thế nào? / How is `git commit -m` different from `git commit -am`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git commit -m` và `git commit -am` giúp bạn:

- Commit nhanh hơn
- Hiểu khi nào nên dùng mỗi option
- Tránh staging unintended changes

### Khi nào dùng / When to Use

| Command                    | Khi nào dùng                           |
| -------------------------- | -------------------------------------- |
| `git commit -m "message"`  | Khi đã staged changes                  |
| `git commit -am "message"` | Khi muốn stage và commit tracked files |

### Giúp ích gì / Benefits

- **Efficiency**: Save time khi commit
- **Convenience**: Kết hợp stage và commit
- **Understanding**: Hiểu rõ Git workflow

### So sánh chi tiết / Detailed Comparison

| Aspect                      | `git commit -m`       | `git commit -am`             |
| --------------------------- | --------------------- | ---------------------------- |
| **Stages changes**          | No                    | Yes (tracked files only)     |
| **Requires git add**        | Yes                   | No                           |
| **Includes new files**      | No                    | No                           |
| **Includes modified files** | Yes (if staged)       | Yes (all modified)           |
| **Use case**                | Commit staged changes | Stage & commit tracked files |

### Ví dụ:

```bash
# Create and modify files
echo "new file" > newfile.txt
echo "modified content" >> existing.txt

# Using git commit -m (requires staging)
git add existing.txt
git commit -m "Update existing file"
# Result: Only existing.txt is committed

# Using git commit -am (stages and commits tracked files)
git commit -am "Update existing file"
# Result: existing.txt is committed (newfile.txt is NOT committed)
```

### Important Notes:

1. **`git commit -am` chỉ stage tracked files**: Nó không stage new (untracked) files
2. **Cần `git add` cho new files**: New files phải được staged với `git add` trước
3. **Be careful**: `git commit -am` stages ALL modified tracked files

### Best Practices:

1. **Use `-m` for precision**: Sử dụng `-m` khi muốn control chính xác những gì được staged
2. **Use `-am` for convenience**: Sử dụng `-am` khi muốn commit tất cả modified tracked files
3. **Review before commit**: Luôn review changes trước khi commit
4. **Add new files separately**: Luôn add new files với `git add` trước

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Commit new files with -am (they won't be committed)
echo "new file" > newfile.txt
git commit -am "Add new file"
# Result: newfile.txt is NOT committed

# ✅ Nên: Add new files separately
echo "new file" > newfile.txt
git add newfile.txt
git commit -m "Add new file"
# Result: newfile.txt is committed
```

---

## `git commit --amend` là gì? Khi nào nên dùng? / What is `git commit --amend`? When should you use it?

### Mục đích / Purpose

Hiểu `git commit --amend` giúp bạn:

- Sửa commit message
- Thêm changes vào commit gần nhất
- Fix mistakes trong commit gần nhất

### Khi nào dùng / When to Use

Sử dụng `git commit --amend` khi:

- Muốn sửa commit message của commit gần nhất
- Muốn thêm forgotten changes vào commit gần nhất
- Muốn fix typo trong commit message
- Commit chưa được pushed lên remote

### Giúp ích gì / Benefits

- **Fix mistakes**: Sửa mistakes trong commit gần nhất
- **Clean history**: Giữ history clean
- **Convenience**: Không cần tạo commit mới

### Định nghĩa / Definition

**`git commit --amend`** cho phép bạn sửa commit gần nhất (HEAD). Bạn có thể:

- Sửa commit message
- Thêm changes vào commit
- Sửa author info

### Cách hoạt động / How It Works

1. **Git creates a new commit**: Thay vì sửa commit cũ, Git tạo commit mới
2. **Old commit is discarded**: Commit cũ được thay thế
3. **HEAD moves to new commit**: HEAD được cập nhật để trỏ đến commit mới

### Ví dụ:

```bash
# Create a commit
echo "content" > file.txt
git add file.txt
git commit -m "Add file"

# Oops, forgot to add another file
echo "more content" > file2.txt
git add file2.txt

# Amend the commit (add file2.txt)
git commit --amend --no-edit
# Result: file2.txt is added to the previous commit

# Or amend the commit message
git commit --amend -m "Add files with better message"
# Result: Commit message is changed
```

### Options:

| Option           | Purpose                    |
| ---------------- | -------------------------- |
| `--no-edit`      | Amend mà không sửa message |
| `-m "message"`   | Sửa commit message         |
| `--reset-author` | Reset author info          |

### Best Practices:

1. **Only use on local commits**: Chỉ dùng cho commits chưa được pushed
2. **Be careful with shared history**: Cẩn thận khi dùng với shared branches
3. **Use for small fixes**: Chỉ dùng cho small fixes và improvements
4. **Document when amending**: Document khi bạn amend commits

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Amend pushed commits (causes issues for others)
git push origin main
git commit --amend -m "Better message"
git push -f origin main  # Dangerous!

# ✅ Nên: Only amend local commits
git commit -m "Initial commit"
git commit --amend -m "Better message"
git push origin main  # Safe
```

### Warnings:

⚠️ **Never amend pushed commits** nếu bạn đang làm việc với team. Việc này sẽ thay đổi history và gây issues cho những người khác.

---

## Best practices cho commit message là gì? / What are the best practices for commit messages?

### Mục đích / Purpose

Hiểu best practices cho commit messages giúp bạn:

- Viết commit messages rõ ràng và có ý nghĩa
- Tạo commit history dễ đọc
- Giúp team hiểu changes dễ hơn
- Tự động generate changelogs

### Khi nào dùng / When to Use

Best practices này nên được áp dụng:

- Mỗi khi bạn tạo một commit
- Khi review commit messages của team
- Khi setup commit message conventions cho project

### Giúp ích gì / Benefits

- **Clarity**: Commit messages rõ ràng và dễ hiểu
- **Searchable**: Dễ dàng tìm commits theo message
- **Automatable**: Có thể tự động generate changelogs
- **Collaboration**: Giúp team hiểu changes dễ hơn

### Best Practices:

#### 1. Use Imperative Mood

```bash
# ❌ Không nên
git commit -m "Added new feature"
git commit -m "Adding new feature"
git commit -m "Add new feature"

# ✅ Nên
git commit -m "Add new feature"
git commit -m "Fix bug in authentication"
git commit -m "Update documentation"
```

#### 2. Keep First Line Short (50 chars)

```bash
# ❌ Không nên
git commit -m "This is a very long commit message that exceeds the recommended 50 character limit for the first line"

# ✅ Nên
git commit -m "Add user authentication feature"

# Với detailed description:
git commit -m "Add user authentication feature

- Implement JWT token generation
- Add login/logout endpoints
- Update user model with auth fields
- Add unit tests for auth module"
```

#### 3. Use Conventional Commits Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat(auth): add JWT token generation"
git commit -m "fix(api): resolve timeout issue in user endpoint"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(user): add unit tests for login function"
```

#### 4. Explain "Why" and "What", Not "How"

```bash
# ❌ Không nên
git commit -m "Change x to 5 and y to 10"

# ✅ Nên
git commit -m "Adjust timeout values to improve performance

Increased timeout values to handle slow network connections.
This improves user experience in poor network conditions."
```

#### 5. Use Present Tense

```bash
# ❌ Không nên
git commit -m "Added feature"
git commit -m "Fixed bug"

# ✅ Nên
git commit -m "Add feature"
git commit -m "Fix bug"
```

#### 6. Reference Issues

```bash
# ✅ Nên
git commit -m "Fix authentication issue (#123)"
git commit -m "Implement user profile feature

Closes #456"
```

### Examples of Good Commit Messages:

```bash
# Simple commit
git commit -m "Add user authentication"

# Commit with body
git commit -m "Add user authentication

Implement JWT-based authentication with the following features:
- User registration
- Login/logout
- Password reset
- Token refresh"

# Commit with footer
git commit -m "Fix login timeout issue

Adjusted timeout values to handle slow connections.

Closes #123"
```

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Generic messages
git commit -m "Update"
git commit -m "Fix"
git commit -m "WIP"

# ❌ Không nên: Too long first line
git commit -m "This is a very long commit message that goes on and on and on and on and on and on and on and on"

# ❌ Không nên: Multiple topics in one commit
git commit -m "Add auth and fix bug and update docs"

# ❌ Không nên: Past tense
git commit -m "Added feature"
git commit -m "Fixed bug"
```

### Tools for Commit Messages:

- **commitlint**: Lint commit messages
- **commitizen**: Interactive commit message creator
- **conventional-changelog**: Generate changelog from commits
- **husky**: Git hooks for enforcing commit message format

---

## Empty commit là gì? Khi nào cần tạo? / What is an empty commit? When do you need to create one?

### Mục đích / Purpose

Hiểu empty commit giúp bạn:

- Biết cách tạo commits without changes
- Hiểu use cases của empty commits
- Sử dụng empty commits khi cần thiết

### Khi nào dùng / When to Use

Sử dụng empty commit khi:

- Muốn trigger CI/CD pipeline
- Muốn restart a build
- Muốn document a decision
- Muốn mark a milestone

### Giúp ích gì / Benefits

- **Trigger CI/CD**: Trigger pipelines without code changes
- **Documentation**: Document decisions or milestones
- **Restart**: Restart builds or deployments

### Định nghĩa / Definition

**Empty commit** là một commit không có bất kỳ changes nào. Nó chỉ có commit message và metadata (author, date, etc.).

### Cách tạo empty commit / How to Create Empty Commit

```bash
# Create empty commit
git commit --allow-empty -m "Empty commit message"

# Example: Trigger CI/CD
git commit --allow-empty -m "Trigger CI/CD pipeline"

# Example: Document decision
git commit --allow-empty -m "Decision: Use JWT for authentication"
```

### Use Cases:

#### 1. Trigger CI/CD Pipeline

```bash
# CI/CD failed, need to retry
git commit --allow-empty -m "Trigger CI/CD retry"
git push
```

#### 2. Document Decisions

```bash
# Document a team decision
git commit --allow-empty -m "Decision: Switch to TypeScript

Team decided to migrate to TypeScript for better type safety.
Migration will start next sprint."
```

#### 3. Mark Milestones

```bash
# Mark a milestone
git commit --allow-empty -m "Milestone: v1.0.0 release"
```

#### 4. Restart Build

```bash
# Build failed, need to restart
git commit --allow-empty -m "Restart build"
```

### Best Practices:

1. **Use meaningful messages**: Viết meaningful messages cho empty commits
2. **Document why**: Explain why empty commit is needed
3. **Use sparingly**: Chỉ dùng khi thực sự cần thiết
4. **Team communication**: Communicate với team về empty commits

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Empty commit without explanation
git commit --allow-empty -m "Empty commit"

# ✅ Nên: Explain the purpose
git commit --allow-empty -m "Trigger CI/CD pipeline after fixing build issue"
```

---

## `--no-verify` flag làm gì? / What does the `--no-verify` flag do?

### Mục đích / Purpose

Hiểu `--no-verify` flag giúp bạn:

- Bypass Git hooks khi cần thiết
- Hiểu risks của bypassing hooks
- Sử dụng flag này một cách an toàn

### Khi nào dùng / When to Use

Sử dụng `--no-verify` khi:

- Git hooks đang gây issues
- Cần bypass hooks cho một commit cụ thể
- Testing without hooks
- Emergency situations

### Giúp ích gì / Benefits

- **Flexibility**: Bypass hooks khi cần thiết
- **Debugging**: Giúp debug hook issues
- **Emergency**: Cho phép commits trong emergency situations

### Định nghĩa / Definition

**`--no-verify`** flag bypasses pre-commit và commit-msg hooks. Nó cho phép bạn commit mà không chạy các hooks này.

### Ví dụ:

```bash
# Normal commit (runs hooks)
git commit -m "Add feature"

# Bypass hooks
git commit --no-verify -m "Add feature"
```

### Git Hooks Affected:

| Hook Type          | Affected by --no-verify |
| ------------------ | ----------------------- |
| pre-commit         | Yes                     |
| commit-msg         | Yes                     |
| prepare-commit-msg | Yes                     |
| post-commit        | No                      |
| pre-push           | No                      |

### Use Cases:

#### 1. Debug Hook Issues

```bash
# Hook is causing issues, bypass to commit
git commit --no-verify -m "Fix bug"
# Then fix the hook later
```

#### 2. Temporary Bypass

```bash
# Need to commit quickly, bypass hooks temporarily
git commit --no-verify -m "Hotfix"
```

#### 3. Testing

```bash
# Test commit without hooks
git commit --no-verify -m "Test commit"
```

### Risks:

⚠️ **Using `--no-verify` can be dangerous** vì:

- Bypasses quality checks (linting, formatting)
- Bypasses validation (commit message format)
- Bypasses automated tests
- Can introduce bad commits

### Best Practices:

1. **Use sparingly**: Chỉ dùng khi thực sự cần thiết
2. **Understand the risk**: Hiểu risks trước khi dùng
3. **Fix the issue**: Fix hook issues thay vì bypassing
4. **Document**: Document khi và tại sao bạn dùng `--no-verify`

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always use --no-verify
git commit --no-verify -m "Add feature"

# ✅ Nên: Fix the hook instead
git commit -m "Add feature"
# Fix the hook issue
```

---

## Commit signing là gì? Cách thực hiện? / What is commit signing? How to do it?

### Mục đích / Purpose

Hiểu commit signing giúp bạn:

- Bảo vệ commits của bạn
- Verify authenticity của commits
- Hiểu GPG signing trong Git

### Khi nào dùng / When to Use

Sử dụng commit signing khi:

- Làm việc với open-source projects
- Cần verify authenticity của commits
- Muốn bảo vệ repository integrity
- Làm việc với security-sensitive projects

### Giả ích gì / Benefits

- **Authenticity**: Verify commits đến từ đúng người
- **Integrity**: Đảm bảo commits không bị thay đổi
- **Trust**: Build trust với team và community
- **Security**: Bảo vệ repository security

### Định nghĩa / Definition

**Commit signing** là process ký commits với GPG (GNU Privacy Guard) key để verify authenticity và integrity của commits.

### Cách thực hiện / How to Set Up

#### 1. Install GPG

```bash
# macOS
brew install gnupg

# Ubuntu/Debian
sudo apt-get install gnupg

# Windows
# Download from https://gnupg.org/download/
```

#### 2. Generate GPG Key

```bash
# Generate new key
gpg --full-generate-key

# Follow prompts:
# - Key type: RSA and RSA
# - Key size: 4096
# - Expiration: 0 (no expiration)
# - Name: Your Name
# - Email: your.email@example.com
# - Passphrase: Your passphrase
```

#### 3. List GPG Keys

```bash
# List all keys
gpg --list-secret-keys --keyid-format=long

# Output example:
# sec   rsa4096/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
# uid   Your Name <your.email@example.com>
```

#### 4. Configure Git

```bash
# Configure Git to use your GPG key
git config --global user.signingkey 3AA5C34371567BD2

# Enable signing commits by default
git config --global commit.gpgsign true

# Or sign commits manually
git config --global commit.gpgsign false
```

#### 5. Sign a Commit

```bash
# Sign a commit manually
git commit -S -m "Signed commit"

# Or if commit.gpgsign is true, just commit normally
git commit -m "Signed commit"
```

#### 6. Verify Signed Commits

```bash
# Verify a commit
git log --show-signature

# Or check specific commit
git show --show-signature <commit-hash>
```

### Best Practices:

1. **Protect your key**: Bảo vệ GPG key với passphrase
2. **Backup your key**: Backup GPG key và passphrase
3. **Use strong passphrase**: Sử dụng strong passphrase
4. **Verify regularly**: Verify signed commits thường xuyên

### Troubleshooting:

```bash
# If signing fails, check GPG agent
gpg --list-keys

# Check Git configuration
git config --list | grep gpg

# Test GPG signing
echo "test" | gpg --clearsign
```

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Share your GPG key
# Never share your private GPG key!

# ❌ Không nên: Use weak passphrase
# Always use a strong passphrase!

# ✅ Nên: Protect your key
# Keep your private key secure and backed up
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git commit`** lưu trữ staged changes vào repository với commit message
2. **`git commit -m`** commit staged changes, **`git commit -am`** stages và commits tracked files
3. **`git commit --amend`** sửa commit gần nhất (chỉ dùng cho local commits)
4. **Commit messages** nên rõ ràng, ngắn gọn, và follow best practices
5. **Empty commits** có thể dùng để trigger CI/CD hoặc document decisions
6. **`--no-verify`** bypasses Git hooks (cẩn thận khi dùng)
7. **Commit signing** với GPG verifies authenticity và integrity của commits

### Commands Reference:

| Command                                 | Purpose                      |
| --------------------------------------- | ---------------------------- |
| `git commit -m "message"`               | Commit staged changes        |
| `git commit -am "message"`              | Stage & commit tracked files |
| `git commit --amend`                    | Amend last commit            |
| `git commit --amend -m "new message"`   | Amend commit message         |
| `git commit --allow-empty -m "message"` | Create empty commit          |
| `git commit --no-verify -m "message"`   | Commit without running hooks |
| `git commit -S -m "message"`            | Sign commit with GPG         |
| `git log --show-signature`              | Verify signed commits        |

### Best Practices:

1. **Review before commit**: Luôn review staged changes trước khi commit
2. **Write meaningful messages**: Viết commit messages rõ ràng và có ý nghĩa
3. **Keep commits atomic**: Mỗi commit nên làm một việc duy nhất
4. **Use conventional commits**: Follow conventional commits format
5. **Never amend pushed commits**: Không amend commits đã được pushed
6. **Use commit signing**: Sử dụng signing cho security-sensitive projects
7. **Be careful with --no-verify**: Cẩn thận khi bypass hooks

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
