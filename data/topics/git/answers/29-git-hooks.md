# Git Hooks / Git Hooks

> Hướng dẫn chi tiết về cách sử dụng Git hooks để tự động hóa quy trình phát triển / Comprehensive guide to using Git hooks to automate development workflow

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng Git hooks để tự động hóa các tác vụ trước/sau khi commit, push, và các Git operations khác.

Understand how to use Git hooks to automate tasks before/after commits, pushes, and other Git operations.

### Khi nào cần hiểu / When to understand

- Khi muốn tự động hóa code quality checks
- Khi cần enforce commit message conventions
- Khi muốn chạy tests trước khi commit
- Khi cần deploy tự động sau khi push

- When wanting to automate code quality checks
- When needing to enforce commit message conventions
- When wanting to run tests before commit
- When needing automatic deployment after push

### Giá trị gì / Benefits

- Tự động hóa quy trình phát triển
- Enforce best practices
- Giảm lỗi do con người
- Tăng hiệu suất team

- Automate development workflow
- Enforce best practices
- Reduce human errors
- Increase team productivity

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Tự động hóa nhiều tác vụ
- Enforce standards và best practices
- Có thể viết bằng bất kỳ ngôn ngữ
- Tích hợp sẵn trong Git

**Nhược điểm / Cons:**

- Có thể chậm workflow nếu hooks phức tạp
- Debug hooks khó khăn
- Bypass được bằng --no-verify
- Không sync với remote (local only)

**Pros:**

- Automate many tasks
- Enforce standards and best practices
- Can write in any language
- Built into Git

**Cons:**

- Can slow workflow if hooks are complex
- Difficult to debug hooks
- Can be bypassed with --no-verify
- Not synced with remote (local only)

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Git hooks là gì? / What are Git hooks?

#### Mục đích / Purpose

Hiểu khái niệm và cơ chế hoạt động của Git hooks.

Understand concept and mechanism of Git hooks.

#### Khi nào dùng / When to use

Khi cần tự động hóa các tác vụ liên quan đến Git.

When needing to automate Git-related tasks.

#### Giá trị gì / Benefits

- Hiểu cách Git hooks hoạt động
- Biết các loại hooks có sẵn
- Có thể tự động hóa workflow

- Understand how Git hooks work
- Know available hook types
- Can automate workflow

#### Định nghĩa / Definition

Git hooks là scripts chạy tự động tại các điểm cụ thể trong Git workflow:

```
Git Workflow:
┌─────────────┐
│ pre-commit  │ ──→ Chạy trước khi commit
├─────────────┤
│   commit    │ ──→ Commit được tạo
├─────────────┤
│ post-commit │ ──→ Chạy sau khi commit
└─────────────┘
```

Có hai loại hooks:

- **Client-side hooks**: Chạy trên máy local (pre-commit, commit-msg, post-commit, etc.)
- **Server-side hooks**: Chạy trên server (pre-receive, update, post-receive, etc.)

Git hooks are scripts that run automatically at specific points in Git workflow:

```
Git Workflow:
┌─────────────┐
│ pre-commit  │ ──→ Runs before commit
├─────────────┤
│   commit    │ ──→ Commit is created
├─────────────┤
│ post-commit │ ──→ Runs after commit
└─────────────┘
```

Two types of hooks:

- **Client-side hooks**: Run on local machine (pre-commit, commit-msg, post-commit, etc.)
- **Server-side hooks**: Run on server (pre-receive, update, post-receive, etc.)

#### Ví dụ / Examples

**Client-side hooks:**

```bash
# pre-commit - Chạy trước khi commit
# pre-commit - Runs before commit
# commit-msg - Chạy khi viết commit message
# post-commit - Chạy sau khi commit
# pre-push - Chạy trước khi push
```

**Server-side hooks:**

```bash
# pre-receive - Chạy khi nhận push
# pre-receive - Runs when receiving push
# update - Chạy khi mỗi branch được update
# post-receive - Chạy sau khi nhận push
```

**Hook execution flow:**

```
Developer commits:
  pre-commit hook ──→ (chạy checks)
  (nếu fail) ──→ Commit bị hủy
  (nếu pass) ──→ Commit tiếp tục
  commit-msg hook ──→ (validate message)
  (nếu fail) ──→ Commit bị hủy
  (nếu pass) ──→ Commit được tạo
  post-commit hook ──→ (chạy sau commit)
```

#### Best Practices

1. **Hiểu execution order** của hooks
2. **Dùng hooks để enforce** standards
3. **Giữ hooks đơn giản** để tránh chậm workflow
4. **Document hooks** trong repository

5. **Understand execution order** of hooks
6. **Use hooks to enforce** standards
7. **Keep hooks simple** to avoid slowing workflow
8. **Document hooks** in repository

#### Anti-patterns

- ❌ Dùng hooks quá phức tạp
- ❌ Không document hooks
- ❌ Không hiểu execution order
- ❌ Dùng hooks cho mọi thứ

- ❌ Use overly complex hooks
- ❌ Don't document hooks
- ❌ Don't understand execution order
- ❌ Use hooks for everything

---

### Q2: Client-side hooks (pre-commit, commit-msg, post-commit) làm gì? / What do client-side hooks (pre-commit, commit-msg, post-commit) do?

#### Mục đích / Purpose

Hiểu các client-side hooks phổ biến và cách sử dụng.

Understand common client-side hooks and how to use them.

#### Khi nào dùng / When to use

Khi muốn tự động hóa các tác vụ trên local machine.

When wanting to automate tasks on local machine.

#### Giá trị gì / Benefits

- Enforce code quality trên local
- Validate commit messages
- Tự động hóa các tác vụ local
- Giảm errors trước khi push

- Enforce code quality locally
- Validate commit messages
- Automate local tasks
- Reduce errors before pushing

#### Định nghĩa / Definition

Các client-side hooks phổ biến:

**pre-commit**: Chạy trước khi commit được tạo
**commit-msg**: Chạy khi commit message được viết
**post-commit**: Chạy sau khi commit được tạo
**pre-push**: Chạy trước khi push lên remote

Common client-side hooks:

**pre-commit**: Runs before commit is created
**commit-msg**: Runs when commit message is written
**post-commit**: Runs after commit is created
**pre-push**: Runs before push to remote

#### Ví dụ / Examples

**pre-commit hook - Run tests:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi
```

**pre-commit hook - Lint code:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running linter..."
npm run lint

if [ $? -ne 0 ]; then
    echo "Linting failed. Commit aborted."
    exit 1
fi
```

**commit-msg hook - Validate message:**

```bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check message format
if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: "; then
    echo "Commit message must follow Conventional Commits format"
    echo "Example: feat: add new feature"
    exit 1
fi
```

**post-commit hook - Notify:**

```bash
#!/bin/bash
# .git/hooks/post-commit

# Notify team
echo "New commit: $(git log -1 --pretty=%B)"
# Send notification via Slack, email, etc.
```

**pre-push hook - Run tests:**

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "Running full test suite..."
npm test

if [ $? -ne 0 ]; then
    echo "Tests failed. Push aborted."
    exit 1
fi
```

#### Best Practices

1. **Dùng pre-commit** để enforce code quality
2. **Dùng commit-msg** để enforce message format
3. **Giữ hooks nhanh** để không chậm workflow
4. **Return exit code** đúng (0 = success, 1 = fail)

5. **Use pre-commit** to enforce code quality
6. **Use commit-msg** to enforce message format
7. **Keep hooks fast** to not slow workflow
8. **Return correct exit code** (0 = success, 1 = fail)

#### Anti-patterns

- ❌ Hooks quá chậm
- ❌ Không return exit code đúng
- ❌ Dùng hooks cho mọi thứ
- ❌ Không handle errors

- ❌ Hooks too slow
- ❌ Don't return correct exit code
- ❌ Use hooks for everything
- ❌ Don't handle errors

---

### Q3: Server-side hooks (pre-receive, update, post-receive) làm gì? / What do server-side hooks (pre-receive, update, post-receive) do?

#### Mục đích / Purpose

Hiểu các server-side hooks và cách sử dụng để enforce policies trên server.

Understand server-side hooks and how to use them to enforce policies on server.

#### Khi nào dùng / When to use

Khi muốn enforce policies trên Git server.

When wanting to enforce policies on Git server.

#### Giá trị gì / Benefits

- Enforce policies trên server
- Validate pushes trước khi accept
- Tự động hóa deployment
- Notify team về changes

- Enforce policies on server
- Validate pushes before accepting
- Automate deployment
- Notify team about changes

#### Định nghĩa / Definition

Các server-side hooks phổ biến:

**pre-receive**: Chạy khi nhận push, trước khi accept
**update**: Chạy khi mỗi branch được update
**post-receive**: Chạy sau khi push được accept

Common server-side hooks:

**pre-receive**: Runs when receiving push, before accepting
**update**: Runs when each branch is updated
**post-receive**: Runs after push is accepted

#### Ví dụ / Examples

**pre-receive hook - Enforce commit message:**

```bash
#!/bin/bash
# .git/hooks/pre-receive

while read oldrev newrev refname; do
    # Get commit message
    message=$(git log -1 --pretty=%B $newrev)

    # Check format
    if ! echo "$message" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)"; then
        echo "Commit message must follow Conventional Commits format"
        exit 1
    fi
done
```

**pre-receive hook - Block force push:**

```bash
#!/bin/bash
# .git/hooks/pre-receive

while read oldrev newrev refname; do
    # Check if force push
    if [ "$oldrev" != "0000000000000000000000000000000000000" ]; then
        echo "Force push not allowed on $refname"
        exit 1
    fi
done
```

**update hook - Block delete on main:**

```bash
#!/bin/bash
# .git/hooks/update

refname=$1
oldrev=$2
newrev=$3

# Block delete on main branch
if [ "$refname" = "refs/heads/main" ] && [ "$newrev" = "0000000000000000000000000000000000000" ]; then
    echo "Cannot delete main branch"
    exit 1
fi
```

**post-receive hook - Auto deploy:**

```bash
#!/bin/bash
# .git/hooks/post-receive

while read oldrev newrev refname; do
    # Deploy on push to main
    if [ "$refname" = "refs/heads/main" ]; then
        echo "Deploying to production..."
        ./deploy.sh
    fi
done
```

**post-receive hook - Notify team:**

```bash
#!/bin/bash
# .git/hooks/post-receive

while read oldrev newrev refname; do
    # Get commit info
    author=$(git log -1 --pretty=%an $newrev)
    message=$(git log -1 --pretty=%s $newrev)

    # Send notification
    curl -X POST https://hooks.slack.com/services/... \
        -d "{\"text\": \"$author pushed to $refname: $message\"}"
done
```

#### Best Practices

1. **Dùng pre-receive** để validate pushes
2. **Dùng post-receive** để deploy hoặc notify
3. **Giữ hooks đơn giản** để không chậm pushes
4. **Return exit code** đúng

5. **Use pre-receive** to validate pushes
6. **Use post-receive** to deploy or notify
7. **Keep hooks simple** to not slow pushes
8. **Return correct exit code**

#### Anti-patterns

- ❌ Hooks quá chậm
- ❌ Không validate input
- ❌ Không handle errors
- ❌ Block legitimate pushes

- ❌ Hooks too slow
- ❌ Don't validate input
- ❌ Don't handle errors
- ❌ Block legitimate pushes

---

### Q4: Hooks nằm ở đâu trong repository? / Where are hooks located in repository?

#### Mục đích / Purpose

Biết vị trí của Git hooks trong repository.

Know location of Git hooks in repository.

#### Khi nào dùng / When to use

Khi cần tạo, chỉnh sửa, hoặc debug hooks.

When needing to create, modify, or debug hooks.

#### Giá trị gì / Benefits

- Biết nơi để đặt hooks
- Có thể customize hooks
- Debug hooks dễ dàng hơn

- Know where to place hooks
- Can customize hooks
- Easier to debug hooks

#### Định nghĩa / Definition

Git hooks nằm trong directory `.git/hooks/`:

```
repository/
├── .git/
│   └── hooks/
│       ├── pre-commit.sample
│       ├── commit-msg.sample
│       ├── post-commit.sample
│       ├── pre-push.sample
│       ├── pre-receive.sample
│       ├── update.sample
│       └── post-receive.sample
└── src/
```

Git hooks are located in `.git/hooks/` directory:

```
repository/
├── .git/
│   └── hooks/
│       ├── pre-commit.sample
│       ├── commit-msg.sample
│       ├── post-commit.sample
│       ├── pre-push.sample
│       ├── pre-receive.sample
│       ├── update.sample
│       └── post-receive.sample
└── src/
```

#### Ví dụ / Examples

**Xem sample hooks:**

```bash
# Liệt kê hooks
$ ls .git/hooks/
applypatch-msg.sample
commit-msg.sample
post-commit.sample
post-receive.sample
post-update.sample
pre-applypatch.sample
pre-commit.sample
pre-push.sample
pre-rebase.sample
prepare-commit-msg.sample
update.sample
```

**Tạo hook từ sample:**

```bash
# Copy sample và rename
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit

# Hoặc tạo mới
vim .git/hooks/pre-commit
```

**Make hook executable:**

```bash
# Hook phải executable để chạy
chmod +x .git/hooks/pre-commit
```

**Hook directory structure:**

```bash
# Client-side hooks
.git/hooks/pre-commit
.git/hooks/commit-msg
.git/hooks/post-commit
.git/hooks/pre-push
.git/hooks/post-merge
.git/hooks/pre-rebase

# Server-side hooks
.git/hooks/pre-receive
.git/hooks/update
.git/hooks/post-receive
```

#### Best Practices

1. **Copy từ sample** khi tạo hook mới
2. **Make executable** sau khi tạo
3. **Test hooks** trước khi dùng
4. **Document hooks** trong README

5. **Copy from sample** when creating new hook
6. **Make executable** after creating
7. **Test hooks** before using
8. **Document hooks** in README

#### Anti-patterns

- ❌ Không make executable
- ❌ Không test trước khi dùng
- ❌ Không document hooks
- ❌ Dùng tên sai cho hooks

- ❌ Don't make executable
- ❌ Don't test before using
- ❌ Don't document hooks
- ❌ Use wrong names for hooks

---

### Q5: Sample hooks là gì? / What are sample hooks?

#### Mục đích / Purpose

Hiểu sample hooks và cách sử dụng chúng.

Understand sample hooks and how to use them.

#### Khi nào dùng / When to use

Khi muốn tạo hook mới hoặc học cách viết hooks.

When wanting to create new hook or learn how to write hooks.

#### Giá trị gì / Benefits

- Có template để bắt đầu
- Học từ các ví dụ
- Hiểu cấu trúc của hooks

- Have template to start with
- Learn from examples
- Understand hook structure

#### Định nghĩa / Definition

Sample hooks là các file ví dụ đi kèm với Git:

```
.git/hooks/pre-commit.sample
.git/hooks/commit-msg.sample
.git/hooks/post-commit.sample
...
```

Git cung cấp các sample hooks làm template.

Sample hooks are example files provided with Git:

```
.git/hooks/pre-commit.sample
.git/hooks/commit-msg.sample
.git/hooks/post-commit.sample
...
```

Git provides sample hooks as templates.

#### Ví dụ / Examples

**pre-commit.sample:**

```bash
#!/bin/sh
#
# An example hook script to verify what is about to be committed
# is called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if it wants
# to stop the commit.
#

# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	echo ""
else
	echo ""
fi

git diff --cached --name-status --diff-filter=A -z |
while read -r mode pfile; do
	# Skip files that are removed
	if [ "$mode" = 'D' ]; then
		continue
	fi

	# Test if the file is executable
	test -x "$pfile" && echo "You are trying to commit an executable file: $pfile" && exit 1
done
```

**commit-msg.sample:**

```bash
#!/bin/sh
#
# An example hook script to validate the commit log message.
# Called by "git commit" with one argument, the name of the file
# that has the commit message.  The hook should exit with non-zero
# status after issuing an appropriate message if it wants to stop the
# commit.  The hook is allowed to edit the message file.
#

# To enable this hook, rename this file to "commit-msg".

# Uncomment the block below to enforce a commit message length limit
# MESSAGE=$(cat "$1")
# if [ ${#MESSAGE} -lt 10 ]; then
#     echo "Commit message is too short (minimum 10 characters)"
#     exit 1
# fi
```

**pre-push.sample:**

```bash
#!/bin/sh
#
# An example hook script to validate a patch (email) before
# git push is run.
#
# Called by "git push" after it has checked the remote status,
# but before anything has been pushed.
#
# If this script exits with a non-zero status nothing will be pushed.
#
# To enable this hook, rename this file to "pre-push".

remote="$1"
url="$2"

z40=0000000000000000000000000000000000000

echo "Executing pre-push hook for $remote"

while read local_ref local_sha remote_ref remote_sha
do
	if [ "$local_sha" = $z40 ]
	then
		# Handle delete
		:
	else
		if [ "$remote_sha" = $z40 ]
		then
			# New branch, examine all commits
			range="$local_sha"
		else
			# Update to existing branch, examine new commits
			range="$remote_sha..$local_sha"
		fi

		# Check for WIP commit
		commit=`git rev-list -n 1 --grep '^WIP' "$range"`
		if [ -n "$commit" ]
		then
			echo >&2 "Found WIP commit in $local_ref, not pushing"
			exit 1
		fi
	done

exit 0
```

#### Best Practices

1. **Đọc sample hooks** để học
2. **Copy sample** làm template
3. **Customize** theo nhu cầu
4. **Rename** từ .sample để enable

5. **Read sample hooks** to learn
6. **Copy sample** as template
7. **Customize** by needs
8. **Rename** from .sample to enable

#### Anti-patterns

- ❌ Không đọc sample hooks
- ❌ Copy mà không hiểu
- ❌ Không customize theo nhu cầu
- ❌ Quên rename để enable

- ❌ Don't read sample hooks
- ❌ Copy without understanding
- ❌ Don't customize by needs
- ❌ Forget to rename to enable

---

### Q6: Cách viết custom hooks? / How to write custom hooks?

#### Mục đích / Purpose

Biết cách viết Git hooks custom để tự động hóa workflow.

Know how to write custom Git hooks to automate workflow.

#### Khi nào dùng / When to use

Khi cần tạo hooks theo nhu cầu cụ thể.

When needing to create hooks for specific needs.

#### Giá trị gì / Benefits

- Tự động hóa theo nhu cầu
- Enforce standards cụ thể
- Tăng hiệu suất team

- Automate by needs
- Enforce specific standards
- Increase team productivity

#### Định nghĩa / Definition

Quy trình viết custom hooks:

1. **Chọn hook type** phù hợp
2. **Tạo file hook** trong .git/hooks/
3. **Make executable**
4. **Write script** với exit code đúng

Process to write custom hooks:

1. **Choose appropriate hook type**
2. **Create hook file** in .git/hooks/
3. **Make executable**
4. **Write script** with correct exit code

#### Ví dụ / Examples

**Hook 1: Pre-commit - Run linter:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get staged files
files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')

if [ -z "$files" ]; then
    exit 0
fi

# Run linter
echo "Running ESLint on staged JavaScript files..."
npm run lint -- $files

# Exit with linter's exit code
exit $?
```

**Hook 2: Commit-msg - Validate format:**

```bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Validate format (Conventional Commits)
if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: [A-Z].{1,}"; then
    echo "❌ Commit message must follow Conventional Commits format"
    echo ""
    echo "Valid types: feat, fix, docs, style, refactor, test, chore"
    echo "Example: feat: add user authentication"
    echo ""
    echo "See: https://www.conventionalcommits.org/"
    exit 1
fi

# Check length
if [ ${#COMMIT_MSG} -lt 10 ]; then
    echo "❌ Commit message too short (minimum 10 characters)"
    exit 1
fi

if [ ${#COMMIT_MSG} -gt 72 ]; then
    echo "❌ Commit message too long (maximum 72 characters for subject)"
    exit 1
fi

exit 0
```

**Hook 3: Pre-push - Run tests:**

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "🧪 Running tests before push..."

# Run tests
npm test

# Check exit code
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Push aborted."
    echo ""
    echo "Fix the failing tests and try again."
    exit 1
fi

echo "✅ All tests passed. Proceeding with push..."
exit 0
```

**Hook 4: Post-commit - Notify Slack:**

```bash
#!/bin/bash
# .git/hooks/post-commit

# Get commit info
commit_hash=$(git rev-parse HEAD)
commit_author=$(git log -1 --pretty=%an)
commit_message=$(git log -1 --pretty=%s)
repo_name=$(basename $(git rev-parse --show-toplevel))

# Send to Slack
curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
  -H 'Content-Type: application/json' \
  -d "{
    \"text\": \"🎉 New commit in $repo_name\",
    \"attachments\": [{
      \"color\": \"#36a64f\",
      \"fields\": [
        {\"title\": \"Author\", \"value\": \"$commit_author\", \"short\": true},
        {\"title\": \"Message\", \"value\": \"$commit_message\"},
        {\"title\": \"Hash\", \"value\": \"$commit_hash\", \"short\": true}
      ]
    }]
  }"

exit 0
```

#### Best Practices

1. **Chọn hook type** phù hợp với nhu cầu
2. **Giữ hooks đơn giản** và nhanh
3. **Return exit code** đúng (0 = success, 1 = fail)
4. **Handle errors** gracefully
5. **Document hooks** rõ ràng

6. **Choose appropriate hook type** for needs
7. **Keep hooks simple** and fast
8. **Return correct exit code** (0 = success, 1 = fail)
9. **Handle errors** gracefully
10. **Document hooks** clearly

#### Anti-patterns

- ❌ Hooks quá phức tạp
- ❌ Không return exit code
- ❌ Không handle errors
- ❌ Hooks quá chậm

- ❌ Hooks too complex
- ❌ Don't return exit code
- ❌ Don't handle errors
- ❌ Hooks too slow

---

### Q7: Ví dụ về useful hooks? / What are examples of useful hooks?

#### Mục đích / Purpose

Biết các ví dụ hooks hữu ích để áp dụng vào project.

Know examples of useful hooks to apply to project.

#### Khi nào dùng / When to use

Khi cần ideas để tự động hóa workflow.

When needing ideas to automate workflow.

#### Giá trị gì / Benefits

- Học từ các ví dụ thực tế
- Áp dụng hooks phù hợp với project
- Tăng hiệu suất team

- Learn from real examples
- Apply appropriate hooks to project
- Increase team productivity

#### Định nghĩa / Definition

Các ví dụ hooks hữu ích cho các use cases khác nhau:

1. **Code quality**: Lint, format, tests
2. **Commit standards**: Message format, length
3. **Notifications**: Slack, email
4. **Deployment**: Auto deploy on push

Examples of useful hooks for different use cases:

1. **Code quality**: Lint, format, tests
2. **Commit standards**: Message format, length
3. **Notifications**: Slack, email
4. **Deployment**: Auto deploy on push

#### Ví dụ / Examples

**Hook 1: Pre-commit - Run ESLint and Prettier:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get staged JS files
js_files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')

if [ -n "$js_files" ]; then
    echo "🔍 Running ESLint..."
    npm run lint -- $js_files

    if [ $? -ne 0 ]; then
        echo "❌ ESLint failed. Fix the issues and commit again."
        exit 1
    fi

    echo "✨ Running Prettier..."
    npm run format -- $js_files

    # Stage formatted files
    git add $js_files
fi

exit 0
```

**Hook 2: Commit-msg - Enforce Conventional Commits:**

```bash
#!/bin/bash
# .git/hooks/commit-msg

msg_file=$1
msg=$(cat "$msg_file")

# Check Conventional Commits format
pattern="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .{1,}"

if ! echo "$msg" | grep -qE "$pattern"; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "Format: <type>(<scope>): <subject>"
    echo ""
    echo "Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert"
    echo ""
    echo "Example: feat(auth): add user login"
    exit 1
fi

exit 0
```

**Hook 3: Pre-push - Run full test suite:**

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "🧪 Running full test suite..."
npm run test:all

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Push aborted."
    exit 1
fi

echo "✅ All tests passed!"
exit 0
```

**Hook 4: Post-receive - Auto deploy to staging:**

```bash
#!/bin/bash
# .git/hooks/post-receive

while read oldrev newrev refname; do
    # Deploy to staging when push to develop
    if [ "$refname" = "refs/heads/develop" ]; then
        echo "🚀 Deploying to staging..."
        cd /path/to/staging
        git pull origin develop
        npm install
        npm run build
        pm2 restart ecosystem.config.js
    fi
done

exit 0
```

**Hook 5: Pre-commit - Check for secrets:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check for common secret patterns
if git diff --cached --name-only | xargs grep -lEi "(password|secret|api[_-]key)"; then
    echo "❌ Potential secrets detected in staged files!"
    echo "Please remove secrets before committing."
    exit 1
fi

exit 0
```

**Hook 6: Commit-msg - Add issue number:**

```bash
#!/bin/bash
# .git/hooks/commit-msg

msg_file=$1
msg=$(cat "$msg_file")

# Check if issue number is present
if ! echo "$msg" | grep -qE "#[0-9]+"; then
    echo "⚠️  No issue number found in commit message."
    echo "   Consider adding issue number like: feat: add feature #123"
fi

exit 0
```

#### Best Practices

1. **Chọn hooks phù hợp** với project
2. **Test hooks kỹ** trước khi dùng
3. **Giữ hooks đơn giản** và maintainable
4. **Document hooks** trong README

5. **Choose appropriate hooks** for project
6. **Test hooks thoroughly** before using
7. **Keep hooks simple** and maintainable
8. **Document hooks** in README

#### Anti-patterns

- ❌ Dùng quá nhiều hooks
- ❌ Hooks quá phức tạp
- ❌ Không test trước khi dùng
- ❌ Không document hooks

- ❌ Use too many hooks
- ❌ Hooks too complex
- ❌ Don't test before using
- ❌ Don't document hooks

---

### Q8: Cách bypass hooks (`--no-verify`)? / How to bypass hooks (`--no-verify`)?

#### Mục đích / Purpose

Hiểu cách bypass Git hooks khi cần.

Understand how to bypass Git hooks when needed.

#### Khi nào dùng / When to use

Khi cần bypass hooks trong trường hợp đặc biệt.

When needing to bypass hooks in special cases.

#### Giá trị gì / Benefits

- Có thể bypass khi cần
- Biết rủi ro khi bypass
- Có emergency escape hatch

- Can bypass when needed
- Know risks when bypassing
- Have emergency escape hatch

#### Định nghĩa / Definition

`--no-verify` option bypass hooks:

```bash
git commit --no-verify -m "message"
git push --no-verify
```

Option này skip pre-commit và commit-msg hooks.

`--no-verify` option bypasses hooks:

```bash
git commit --no-verify -m "message"
git push --no-verify
```

This option skips pre-commit and commit-msg hooks.

#### Ví dụ / Examples

**Bypass pre-commit hook:**

```bash
# Commit với hook (bị fail nếu hook fail)
git commit -m "Add feature"

# Bypass hook
git commit --no-verify -m "Add feature"
```

**Bypass pre-push hook:**

```bash
# Push với hook (bị fail nếu hook fail)
git push origin main

# Bypass hook
git push --no-verify origin main
```

**Use cases:**

```bash
# 1. Emergency fix
git commit --no-verify -m "hotfix: critical bug"

# 2. Initial commit (không có tests)
git commit --no-verify -m "Initial commit"

# 3. Merge conflict (hook fail vì format)
git commit --no-verify -m "Merge conflict resolution"

# 4. Temporary workaround
git commit --no-verify -m "WIP: temporary fix"
```

#### Best Practices

1. **Tránh dùng --no-verify** trừ khi thực sự cần
2. **Hiểu rủi ro** khi bypass hooks
3. **Sửa hooks** thay vì bypass thường xuyên
4. **Document lý do** khi dùng --no-verify

5. **Avoid using --no-verify** unless really needed
6. **Understand risks** when bypassing hooks
7. **Fix hooks** instead of bypassing frequently
8. **Document reason** when using --no-verify

#### Anti-patterns

- ❌ Dùng --no-verify thường xuyên
- ❌ Không hiểu rủi ro
- ❌ Bypass thay vì sửa hooks
- ❌ Không document lý do

- ❌ Use --no-verify frequently
- ❌ Don't understand risks
- ❌ Bypass instead of fixing hooks
- ❌ Don't document reason

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Git hooks** là scripts chạy tự động tại các điểm trong Git workflow
2. **Client-side hooks** (pre-commit, commit-msg, post-commit) chạy trên local machine
3. **Server-side hooks** (pre-receive, update, post-receive) chạy trên Git server
4. **Hooks nằm** trong `.git/hooks/` directory
5. **Sample hooks** là templates đi kèm với Git
6. **Có thể viết custom hooks** để tự động hóa workflow
7. **`--no-verify`** option cho phép bypass hooks khi cần

8. **Git hooks** are scripts that run automatically at points in Git workflow
9. **Client-side hooks** (pre-commit, commit-msg, post-commit) run on local machine
10. **Server-side hooks** (pre-receive, update, post-receive) run on Git server
11. **Hooks are located** in `.git/hooks/` directory
12. **Sample hooks** are templates provided with Git
13. **Can write custom hooks** to automate workflow
14. **`--no-verify`** option allows bypassing hooks when needed

### Commands Reference / Tham khảo lệnh

```bash
# Xem hooks
ls .git/hooks/

# Tạo hook từ sample
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit

# Make executable
chmod +x .git/hooks/pre-commit

# Bypass hooks
git commit --no-verify -m "message"
git push --no-verify

# Test hook
.git/hooks/pre-commit
```

### Best Practices / Thực hành tốt nhất

1. **Dùng pre-commit** để enforce code quality
2. **Dùng commit-msg** để enforce message format
3. **Giữ hooks đơn giản** và nhanh
4. **Test hooks kỹ** trước khi dùng
5. **Document hooks** rõ ràng trong README
6. **Tránh --no-verify** trừ khi thực sự cần
7. **Sửa hooks** thay vì bypass thường xuyên

8. **Use pre-commit** to enforce code quality
9. **Use commit-msg** to enforce message format
10. **Keep hooks simple** and fast
11. **Test hooks thoroughly** before using
12. **Document hooks** clearly in README
13. **Avoid --no-verify** unless really needed
14. **Fix hooks** instead of bypassing frequently
