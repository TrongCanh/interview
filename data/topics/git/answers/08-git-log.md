# 8. Git Log / Git Log

## Tổng quan về Git Log / Git Log Overview

### Mục đích / Purpose

**Git Log** là command dùng để xem lịch sử commits trong repository. Nó là một công cụ quan trọng để hiểu và navigate commit history.

**Mục đích chính:**

- Hiểu cách xem commit history
- Biết cách filter và format log output
- Hiểu các options của `git log` command
- Biết cách search commit history
- Nắm được best practices cho reviewing history

### Khi nào cần hiểu về Git Log / When to Use

Hiểu về Git Log là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn review commit history
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Debug issues bằng cách xem history
- Review pull requests

### Giả ích gì / Benefits

**Lợi ích:**

- **History**: Xem lịch sử commits
- **Search**: Search commits theo các criteria
- **Filter**: Filter commits theo nhiều cách
- **Format**: Customize output format
- **Debug**: Debug issues bằng cách xem history

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                               | Nhược điểm (Cons)                     |
| -------------------------------------------- | ------------------------------------- |
| Powerful - nhiều options để customize        | Output lớn - có thể overwhelming      |
| Flexible - có thể filter theo nhiều cách     | Learning curve - cần thời gian học    |
| Searchable - có thể search commits           | Terminal - cần terminal để xem đầy đủ |
| Formattable - có thể customize output format | History size - có thể rất lớn         |

---

## `git log` hiển thị gì? / What does `git log` display?

### Mục đích / Purpose

Hiểu `git log` hiển thị gì giúp bạn:

- Biết cách xem commit history
- Hiểu thông tin được hiển thị trong log
- Review commit history hiệu quả hơn

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Training Git cho developers mới
- Giải thích Git history

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ Git history
- **Review**: Review commit history
- **Debug**: Debug issues bằng cách xem history

### Định nghĩa / Definition

**`git log`** hiển thị commit history của repository, bắt đầu từ commit gần nhất và đi ngược lại. Mỗi commit hiển thị thông tin như:

- Commit hash (SHA-1)
- Author name và email
- Date
- Commit message

### Ví dụ:

```bash
# View commit history
git log

# Output:
# commit abc123def4567890123456789012345678901234 (HEAD -> main)
# Author: John Doe <john@example.com>
# Date:   Mon Jan 1 10:00:00 2024 +0700
#
#     Add new feature
#
# commit def4567890123456789012345678901234567890
# Author: Jane Smith <jane@example.com>
# Date:   Sun Dec 31 15:30:00 2023 +0700
#
#     Fix bug in authentication
```

### Định dạng output / Output Format

| Field        | Description          |
| ------------ | -------------------- |
| `commit`     | Commit hash (SHA-1)  |
| `Author`     | Author name và email |
| `Date`       | Commit date          |
| (blank line) | Separator            |
| `message`    | Commit message       |

### Best Practices:

1. **Use with options**: Sử dụng với các options để customize output
2. **Limit output**: Giới hạn output khi history lớn
3. **Use --oneline**: Sử dụng `--oneline` để xem summary
4. **Understand chronology**: Hiểu chronological order của commits

---

## `git log --oneline` khác `git log` như thế nào? / How is `git log --oneline` different from `git log`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git log --oneline` và `git log` giúp bạn:

- View commit history ở định dạng khác nhau
- Chọn format phù hợp với nhu cầu
- Review history hiệu quả hơn

### Khi nào dùng / When to Use

| Command             | Khi nào dùng                |
| ------------------- | --------------------------- |
| `git log`           | Xem detailed commit history |
| `git log --oneline` | Xem summary commit history  |

### Giả ích gì / Benefits

- **Flexibility**: View history ở định dạng khác nhau
- **Summary**: `--oneline` cho summary ngắn gọn
- **Detail**: `git log` cho detailed information

### So sánh chi tiết / Detailed Comparison

| Aspect               | `git log`          | `git log --oneline`   |
| -------------------- | ------------------ | --------------------- |
| **Output format**    | Detailed           | Concise               |
| **Commit hash**      | Full SHA-1         | Short SHA-1 (7 chars) |
| **Author info**      | Full name và email | Not shown             |
| **Date**             | Full date and time | Not shown             |
| **Message**          | Full message       | First line only       |
| **Lines per commit** | 4+ lines           | 1 line                |

### Ví dụ:

```bash
# Using git log (detailed)
git log

# Output:
# commit abc123def4567890123456789012345678901234 (HEAD -> main)
# Author: John Doe <john@example.com>
# Date:   Mon Jan 1 10:00:00 2024 +0700
#
#     Add new feature
#
#     This commit adds a new feature for user authentication.
#     It includes JWT token generation and validation.

# Using git log --oneline (concise)
git log --oneline

# Output:
# abc1234 (HEAD -> main) Add new feature
# def4567 Fix bug in authentication
# ghi8901 Initial commit
```

### Best Practices:

1. **Use `--oneline` for quick review**: Sử dụng để review nhanh
2. **Use `git log` for detailed review**: Sử dụng để xem chi tiết
3. **Combine with other options**: Kết hợp với các options khác
4. **Use with --graph**: Sử dụng với `--graph` để visualize branches

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use detailed log when summary is enough
git log
# Too much output for quick review

# ✅ Nên: Use --oneline for quick review
git log --oneline
# Concise output for quick review
```

---

## `git log --graph` làm gì? / What does `git log --graph` do?

### Mục đích / Purpose

Hiểu `git log --graph` giúp bạn:

- Visualize commit history với branches
- Hiểu branching và merging
- Review complex histories dễ hơn

### Khi nào dùng / When to Use

Sử dụng `git log --graph` khi:

- Muốn visualize commit history
- Làm việc với nhiều branches
- Review merge histories
- Debug branching issues

### Giả ích gì / Benefits

- **Visualization**: Visualize commit history
- **Branching**: Hiểu branching và merging
- **Complex histories**: Review complex histories dễ hơn

### Định nghĩa / Definition

**`git log --graph`** hiển thị commit history với ASCII graph để visualize branches và merges. Nó cho bạn thấy relationships giữa commits và branches.

### Ví dụ:

```bash
# View commit history with graph
git log --graph

# Output:
# * abc1234 (HEAD -> main) Merge feature-branch
# |\
# | * def4567 (feature-branch) Add feature
# * | ghi8901 Fix bug
# |/
# * jkl1234 Initial commit
```

### Định dạng output / Output Format

| Symbol | Meaning                 |
| ------ | ----------------------- | ---------------------------- |
| `*`    | Commit                  |
| `      | `                       | Vertical line (continuation) |
| `/`    | Merge line (from left)  |
| `\`    | Merge line (from right) |
| `>`    | Current HEAD            |

### Best Practices:

1. **Use with --oneline**: Sử dụng với `--oneline` để output ngắn gọn hơn
2. **Use with --all**: Sử dụng với `--all` để xem tất cả branches
3. **Use with --decorate**: Sử dụng với `--decorate` để xem branch và tag names
4. **Understand graph**: Hiểu cách đọc graph

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use graph alone (can be hard to read)
git log --graph

# ✅ Nên: Combine with other options
git log --graph --oneline --all --decorate
# Easier to read and understand
```

---

## `git log --all`, `--decorate` là gì? / What are `git log --all`, `--decorate`?

### Mục đích / Purpose

Hiểu `git log --all` và `--decorate` giúp bạn:

- Xem tất cả commits trong repository
- Hiểu branch và tag references
- Review complete history

### Khi nào dùng / When to Use

| Option       | Khi nào dùng                             |
| ------------ | ---------------------------------------- |
| `--all`      | Xem tất cả commits trong tất cả branches |
| `--decorate` | Xem branch và tag names                  |

### Giả ích gì / Benefits

- **Complete**: Xem complete history
- **References**: Hiểu branch và tag references
- **Context**: Có thêm context về commits

### Định nghĩa / Definition

**`git log --all`** hiển thị commits từ tất cả branches, không chỉ current branch.

**`git log --decorate`** hiển thị branch và tag names next to commits.

### Ví dụ:

```bash
# Using --all (shows all branches)
git log --all

# Output:
# commit abc1234 (HEAD -> main, origin/main, tag: v1.0)
# commit def4567 (feature-branch, origin/feature-branch)
# commit ghi8901

# Using --decorate (shows references)
git log --decorate

# Output:
# commit abc1234 (HEAD -> main, origin/main, tag: v1.0)
# Author: John Doe <john@example.com>
# Date:   Mon Jan 1 10:00:00 2024 +0700
#
#     Merge feature-branch

# Using both --all and --decorate
git log --all --decorate

# Output:
# commit abc1234 (HEAD -> main, origin/main, tag: v1.0)
# commit def4567 (feature-branch, origin/feature-branch)
# commit ghi8901 (origin/develop)
```

### Best Practices:

1. **Use --all for complete view**: Sử dụng để xem complete history
2. **Use --decorate for context**: Sử dụng để có thêm context
3. **Combine with --graph**: Kết hợp với `--graph` để visualize
4. **Use with --oneline**: Sử dụng với `--oneline` để output ngắn gọn

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use git log alone (misses other branches)
git log
# Only shows current branch

# ✅ Nên: Use --all to see everything
git log --all --oneline
# Shows all branches
```

---

## Cách giới hạn số lượng commits hiển thị? / How to limit the number of commits displayed?

### Mục đích / Purpose

Biết cách giới hạn số lượng commits giúp bạn:

- Review recent commits
- Giảm output size
- Focus trên specific commits

### Khi nào dùng / When to Use

Sử dụng khi:

- History rất lớn
- Chỉ muốn xem recent commits
- Muốn focus trên specific commits

### Giả ích gì / Benefits

- **Focus**: Focus trên specific commits
- **Performance**: Giảm output size
- **Efficiency**: Review commits nhanh hơn

### Cách thực hiện / How to Do It

#### 1. Giới hạn số lượng commits với `-n`

```bash
# Show last 5 commits
git log -5

# Show last 10 commits
git log -10

# Show last n commits
git log -n
```

#### 2. Giới hạn với `--max-count`

```bash
# Show last 5 commits
git log --max-count=5

# Show last n commits
git log --max-count=n
```

#### 3. Giới hạn với `--since` và `--until`

```bash
# Show commits since last week
git log --since="1 week ago"

# Show commits until last month
git log --until="1 month ago"

# Show commits between dates
git log --since="2024-01-01" --until="2024-01-31"

# Show commits from last 3 days
git log --since="3 days ago"
```

#### 4. Giới hạn với `--after` và `--before`

```bash
# Show commits after a date
git log --after="2024-01-01"

# Show commits before a date
git log --before="2024-01-31"

# Show commits between dates
git log --after="2024-01-01" --before="2024-01-31"
```

### Ví dụ:

```bash
# Show last 5 commits
git log -5 --oneline

# Show commits from last week
git log --since="1 week ago" --oneline

# Show commits between dates
git log --since="2024-01-01" --until="2024-01-31" --oneline

# Show last 10 commits with graph
git log -10 --graph --oneline --all
```

### Best Practices:

1. **Use -n for recent commits**: Sử dụng `-n` để xem recent commits
2. **Use --since/--until for date ranges**: Sử dụng để filter theo date
3. **Combine with --oneline**: Kết hợp với `--oneline` để output ngắn gọn
4. **Use with --graph**: Kết hợp với `--graph` để visualize

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Show all commits when history is large
git log
# Too much output

# ✅ Nên: Limit output
git log -10 --oneline
# Focused output
```

---

## `--since`, `--until`, `--author`, `--grep` làm gì? / What do `--since`, `--until`, `--author`, `--grep` do?

### Mục đích / Purpose

Hiểu các filter options của `git log` giúp bạn:

- Filter commits theo date
- Filter commits theo author
- Search commits theo message
- Review commits hiệu quả hơn

### Khi nào dùng / When to Use

| Option     | Khi nào dùng                  |
| ---------- | ----------------------------- |
| `--since`  | Filter commits sau một date   |
| `--until`  | Filter commits trước một date |
| `--author` | Filter commits theo author    |
| `--grep`   | Search commits theo message   |

### Giả ích gì / Benefits

- **Filter**: Filter commits theo nhiều criteria
- **Search**: Search commits theo author hoặc message
- **Efficiency**: Review commits hiệu quả hơn

### Định nghĩa / Definition

| Option     | Purpose                                    |
| ---------- | ------------------------------------------ |
| `--since`  | Show commits sau một date                  |
| `--until`  | Show commits trước một date                |
| `--author` | Filter commits theo author name hoặc email |
| `--grep`   | Search commits theo commit message         |

### Ví dụ:

```bash
# Show commits since last week
git log --since="1 week ago"

# Show commits until last month
git log --until="1 month ago"

# Show commits between dates
git log --since="2024-01-01" --until="2024-01-31"

# Show commits by specific author
git log --author="John Doe"

# Show commits by author email
git log --author="john@example.com"

# Show commits matching a pattern in message
git log --grep="bug"

# Show commits matching multiple patterns
git log --grep="feature" --grep="fix"

# Combine multiple filters
git log --author="John Doe" --since="1 week ago" --grep="bug"
```

### Date Formats:

```bash
# Relative dates
git log --since="1 week ago"
git log --since="2 days ago"
git log --since="3 months ago"

# Absolute dates
git log --since="2024-01-01"
git log --since="2024-01-01 10:00:00"

# ISO format
git log --since="2024-01-01T10:00:00+07:00"
```

### Author Matching:

```bash
# Match by name
git log --author="John"

# Match by email
git log --author="john@example.com"

# Partial match (matches both name and email)
git log --author="john"
```

### Grep Patterns:

```bash
# Simple pattern
git log --grep="bug"

# Multiple patterns (OR)
git log --grep="bug" --grep="fix"

# Regex pattern
git log --grep="^feat:"

# Case insensitive
git log --grep="bug" --regexp-ignore-case
```

### Best Practices:

1. **Use --since/--until for date ranges**: Sử dụng để filter theo date
2. **Use --author for specific developers**: Sử dụng để filter theo author
3. **Use --grep for searching**: Sử dụng để search theo message
4. **Combine filters**: Kết hợp nhiều filters để narrow down results

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Show all commits and search manually
git log
# Manually search through output

# ✅ Nên: Use filters to narrow down
git log --author="John" --since="1 week ago"
# Focused output
```

---

## `git log -p` hiển thị gì? / What does `git log -p` display?

### Mục đích / Purpose

Hiểu `git log -p` giúp bạn:

- Xem commit history với diff
- Review changes trong mỗi commit
- Debug issues bằng cách xem detailed changes

### Khi nào dùng / When to Use

Sử dụng `git log -p` khi:

- Muốn xem detailed changes trong commits
- Debug issues bằng cách xem changes
- Review pull requests với detailed changes

### Giả ích gì / Benefits

- **Detailed**: Xem detailed changes trong mỗi commit
- **Debug**: Debug issues bằng cách xem changes
- **Review**: Review changes thoroughly

### Định nghĩa / Definition

**`git log -p`** (hoặc `--patch`) hiển thị commit history với diff cho mỗi commit. Nó cho bạn thấy changes đã được thực hiện trong mỗi commit.

### Ví dụ:

```bash
# View commit history with patches
git log -p

# Output:
# commit abc1234 (HEAD -> main)
# Author: John Doe <john@example.com>
# Date:   Mon Jan 1 10:00:00 2024 +0700
#
#     Add new feature
#
# diff --git a/file.txt b/file.txt
# index 1234567..abcdefg 100644
# --- a/file.txt
# +++ b/file.txt
# @@ -1 +1,2 @@
#  original content
# +new content
#
# commit def4567
# Author: Jane Smith <jane@example.com>
# Date:   Sun Dec 31 15:30:00 2023 +0700
#
#     Fix bug
#
# diff --git a/app.js b/app.js
# index 7654321..fedcba9 100644
# --- a/app.js
# +++ b/app.js
# @@ -10,7 +10,7 @@
#  function login() {
# -   return false;
# +   return true;
#  }
```

### Best Practices:

1. **Use with -n để limit output**: Sử dụng `-n` để limit số lượng commits
2. **Use with --stat để xem summary**: Sử dụng `--stat` để xem summary
3. **Use for debugging**: Sử dụng để debug issues
4. **Use with caution**: Cẩn thận khi history lớn

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Show all commits with patches (too much output)
git log -p
# Too much output

# ✅ Nên: Limit output
git log -p -5
# Focused output
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git log`** hiển thị detailed commit history
2. **`git log --oneline`** hiển thị concise commit history (1 line per commit)
3. **`git log --graph`** visualize commit history với ASCII graph
4. **`git log --all`** hiển thị commits từ tất cả branches
5. **`git log --decorate`** hiển thị branch và tag names
6. **`git log -n`** giới hạn số lượng commits
7. **`git log --since/--until`** filter commits theo date
8. **`git log --author`** filter commits theo author
9. **`git log --grep`** search commits theo message
10. **`git log -p`** hiển thị commit history với diff

### Commands Reference:

| Command                    | Purpose                      |
| -------------------------- | ---------------------------- |
| `git log`                  | View detailed commit history |
| `git log --oneline`        | View concise commit history  |
| `git log --graph`          | Visualize commit history     |
| `git log --all`            | Show all branches            |
| `git log --decorate`       | Show branch and tag names    |
| `git log -n`               | Limit number of commits      |
| `git log --max-count=n`    | Limit number of commits      |
| `git log --since="date"`   | Show commits since date      |
| `git log --until="date"`   | Show commits until date      |
| `git log --author="name"`  | Filter by author             |
| `git log --grep="pattern"` | Search by message            |
| `git log -p`               | Show commits with patches    |
| `git log --stat`           | Show commit statistics       |

### Best Practices:

1. **Use --oneline for quick review**: Sử dụng để review nhanh
2. **Use --graph to visualize**: Sử dụng để visualize branches
3. **Use --all for complete view**: Sử dụng để xem tất cả branches
4. **Use filters to narrow down**: Sử dụng filters để narrow down results
5. **Use -n to limit output**: Sử dụng để limit output
6. **Use -p for detailed review**: Sử dụng để review detailed changes
7. **Combine options**: Kết hợp nhiều options để customize output

### Common Combinations:

```bash
# Quick overview
git log --oneline --graph --all --decorate

# Recent commits
git log -5 --oneline

# Filter by author and date
git log --author="John" --since="1 week ago" --oneline

# Detailed review
git log -p -5

# Search commits
git log --grep="bug" --oneline
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
