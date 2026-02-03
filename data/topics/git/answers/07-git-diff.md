# 7. Git Diff / Git Diff

## Tổng quan về Git Diff / Git Diff Overview

### Mục đích / Purpose

**Git Diff** là command dùng để xem differences giữa các versions của files hoặc giữa các states trong Git. Nó là một công cụ quan trọng để review changes trước khi commit.

**Mục đích chính:**

- Hiểu cách xem differences trong Git
- Biết cách compare các versions của files
- Hiểu các options của `git diff` command
- Biết cách review changes trước khi commit
- Nắm được best practices cho reviewing changes

### Khi nào cần hiểu về Git Diff / When to Use

Hiểu về Git Diff là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn review changes trước khi commit
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Debug các issues về changes
- Review pull requests

### Giả ích gì / Benefits

**Lợi ích:**

- **Review**: Review changes trước khi commit
- **Debug**: Debug issues bằng cách xem differences
- **Compare**: Compare các versions của files
- **Understand**: Hiểu changes đã xảy ra
- **Safety**: Tránh unintended changes

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                           | Nhược điểm (Cons)                     |
| ---------------------------------------- | ------------------------------------- |
| Detailed - hiển thị chi tiết differences | Output lớn - có thể overwhelming      |
| Flexible - nhiều options để customize    | Learning curve - cần thời gian học    |
| Powerful - có thể compare nhiều states   | Context - cần hiểu Git states         |
| Colorful - output có màu để dễ đọc       | Terminal - cần terminal để xem đầy đủ |

---

## `git diff` hiển thị gì? / What does `git diff` display?

### Mục đích / Purpose

Hiểu `git diff` hiển thị gì giúp bạn:

- Biết cách view unstaged changes
- Hiểu differences giữa working directory và staging area
- Review changes trước khi stage

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Training Git cho developers mới
- Giải thích Git workflow

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ Git workflow
- **Review**: Review unstaged changes
- **Debug**: Debug issues bằng cách xem differences

### Định nghĩa / Definition

**`git diff`** hiển thị differences giữa **working directory** và **staging area**. Nó chỉ hiển thị **unstaged changes** - những changes chưa được staged.

### Cách hoạt động / How It Works

```
Working Directory (unstaged changes)
    ↓
git diff
    ↓
Shows differences
```

### Ví dụ:

```bash
# Modify a file
echo "new content" >> file.txt

# View unstaged changes
git diff

# Output:
# diff --git a/file.txt b/file.txt
# index 1234567..abcdefg 100644
# --- a/file.txt
# +++ b/file.txt
# @@ -1 +1,2 @@
#  original content
# +new content

# Stage the file
git add file.txt

# git diff now shows nothing (no unstaged changes)
git diff
```

### Định dạng output / Output Format

| Section      | Description               |
| ------------ | ------------------------- |
| `diff --git` | Header cho diff           |
| `index`      | Hash của old và new blobs |
| `---`        | Old file (a/file.txt)     |
| `+++`        | New file (b/file.txt)     |
| `@@`         | Line numbers và context   |
| `-`          | Removed lines             |
| `+`          | Added lines               |

### Best Practices:

1. **Review before staging**: Luôn review unstaged changes trước khi stage
2. **Use with other commands**: Kết hợp với `git status` để hiểu rõ hơn
3. **Understand output**: Hiểu định dạng output để đọc differences dễ hơn

---

## Sự khác biệt giữa `git diff`, `git diff --staged`, và `git diff HEAD`? / What is the difference between `git diff`, `git diff --staged`, and `git diff HEAD`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa các options của `git diff` giúp bạn:

- View differences ở các levels khác nhau
- Review changes ở đúng stage
- Debug issues hiệu quả hơn

### Khi nào dùng / When to Use

| Command             | Khi nào dùng                         |
| ------------------- | ------------------------------------ |
| `git diff`          | View unstaged changes                |
| `git diff --staged` | View staged changes                  |
| `git diff HEAD`     | View all changes (staged + unstaged) |

### Giả ích gì / Benefits

- **Precision**: View changes ở đúng level
- **Review**: Review changes hiệu quả hơn
- **Debug**: Debug issues dễ hơn

### So sánh chi tiết / Detailed Comparison

| Command             | Compares              | Shows            | Use Case                             |
| ------------------- | --------------------- | ---------------- | ------------------------------------ |
| `git diff`          | Working vs Staging    | Unstaged changes | Review changes before staging        |
| `git diff --staged` | Staging vs Repository | Staged changes   | Review changes before committing     |
| `git diff HEAD`     | Working vs Repository | All changes      | Review all changes since last commit |

### Visualization:

```
Repository (Last Commit)
    ↑
    | git diff --staged (staged changes)
    ↓
Staging Area
    ↑
    | git diff (unstaged changes)
    ↓
Working Directory

git diff HEAD = git diff + git diff --staged
```

### Ví dụ:

```bash
# Create a commit
echo "original" > file.txt
git add file.txt
git commit -m "Initial commit"

# Modify the file
echo "first change" >> file.txt

# Stage the file
git add file.txt

# Modify again
echo "second change" >> file.txt

# View unstaged changes (second change only)
git diff
# Shows: +second change

# View staged changes (first change only)
git diff --staged
# Shows: +first change

# View all changes (both changes)
git diff HEAD
# Shows: +first change +second change
```

### Aliases:

```bash
# git diff --staged is same as:
git diff --cached

# Both show staged changes
```

### Best Practices:

1. **Use `git diff`**: Review unstaged changes trước khi staging
2. **Use `git diff --staged`**: Review staged changes trước khi committing
3. **Use `git diff HEAD`**: Review tất cả changes trước khi commit
4. **Combine with git status**: Sử dụng với `git status` để hiểu rõ hơn

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Commit mà không review changes
git add .
git commit -m "Update files"

# ✅ Nên: Review changes trước khi commit
git diff --staged
git commit -m "Update files"
```

---

## `git diff --stat` làm gì? / What does `git diff --stat` do?

### Mục đích / Purpose

Hiểu `git diff --stat` giúp bạn:

- Xem summary của differences
- Hiểu scope của changes
- Review changes nhanh hơn

### Khi nào dùng / When to Use

Sử dụng `git diff --stat` khi:

- Muốn xem summary của changes
- Muốn biết scope của changes
- Muốn review changes nhanh chóng

### Giả ích gì / Benefits

- **Summary**: Xem summary của differences
- **Quick**: Review changes nhanh hơn
- **Scope**: Hiểu scope của changes

### Định nghĩa / Definition

**`git diff --stat`** hiển thị summary statistics của differences thay vì chi tiết từng line. Nó cho bạn biết:

- Số files đã thay đổi
- Số lines đã thêm và xóa cho mỗi file

### Ví dụ:

```bash
# Modify multiple files
echo "content1" >> file1.txt
echo "content2" >> file2.txt

# View detailed diff
git diff
# Shows detailed line-by-line differences

# View summary statistics
git diff --stat
# Output:
# file1.txt | 1 +
# file2.txt | 1 +
# 2 files changed, 2 insertions(+)
```

### Định dạng output / Output Format

| Column   | Description                          |
| -------- | ------------------------------------ | ---------------- |
| Filename | Tên file đã thay đổi                 |
| `        | 1 +`                                 | Số lines đã thêm |
| `        | 1 -`                                 | Số lines đã xóa  |
| Summary  | Tổng số files, insertions, deletions |

### Ví dụ với nhiều changes:

```bash
# Modify files with additions and deletions
git diff --stat

# Output:
# README.md      | 10 +++++-----
# src/app.js     | 20 +++++++++++++-------
# src/utils.js   |  5 -----
# 3 files changed, 20 insertions(+), 15 deletions(-)
```

### Best Practices:

1. **Use for quick review**: Sử dụng để review changes nhanh
2. **Combine with detailed diff**: Kết hợp với `git diff` để xem chi tiết
3. **Understand scope**: Hiểu scope của changes trước khi commit

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rely only on --stat for review
git diff --stat
git commit -m "Update files"

# ✅ Nên: Review detailed changes too
git diff --stat
git diff
git commit -m "Update files"
```

---

## `git diff --color-words` hữu ích khi nào? / When is `git diff --color-words` useful?

### Mục đích / Purpose

Hiểu `git diff --color-words` giúp bạn:

- View differences ở word level thay vì line level
- Review changes trong text files dễ hơn
- Xem changes trong long lines

### Khi nào dùng / When to Use

Sử dụng `git diff --color-words` khi:

- Reviewing text documents (Markdown, HTML, etc.)
- Reviewing changes trong long lines
- Muốn see differences ở word level
- Reviewing changes trong paragraphs

### Giả ích gì / Benefits

- **Word-level**: View differences ở word level
- **Readable**: Dễ đọc hơn cho text documents
- **Context**: Hiển thị context tốt hơn cho text changes

### Định nghĩa / Definition

**`git diff --color-words`** hiển thị differences ở word level thay vì line level. Nó highlight các words đã thay đổi thay vì cả lines.

### Ví dụ:

```bash
# Modify a sentence
echo "This is a modified sentence with some changes." > file.txt
git add file.txt
git commit -m "Initial"

echo "This is an updated sentence with many changes." > file.txt

# Normal diff (line level)
git diff
# Shows entire line as changed

# Word-level diff
git diff --color-words
# Shows only changed words highlighted
```

### So sánh / Comparison:

```bash
# Original: This is a modified sentence with some changes.
# Modified: This is an updated sentence with many changes.

# git diff (line level):
# -This is a modified sentence with some changes.
# +This is an updated sentence with many changes.

# git diff --color-words (word level):
# This is a [modified->updated] sentence with [some->many] changes.
```

### Use Cases:

#### 1. Reviewing Markdown Documents

```bash
# Review changes in README.md
git diff --color-words README.md
```

#### 2. Reviewing HTML Files

```bash
# Review changes in HTML files
git diff --color-words index.html
```

#### 3. Reviewing Long Lines

```bash
# Review changes in long configuration lines
git diff --color-words config.json
```

### Best Practices:

1. **Use for text documents**: Sử dụng cho text documents
2. **Use for long lines**: Sử dụng cho long lines với nhiều changes
3. **Combine with other options**: Kết hợp với `--staged` để review staged changes

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use for code files
git diff --color-words app.js
# Not as useful for code files

# ✅ Nên: Use for text documents
git diff --color-words README.md
# More useful for text documents
```

---

## Cách diff giữa hai branches? / How to diff between two branches?

### Mục đích / Purpose

Biết cách diff giữa hai branches giúp bạn:

- Review differences giữa branches
- Hiểu changes sẽ được merge
- Debug issues khi merging

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn review changes giữa branches
- Chuẩn bị merge một branch vào branch khác
- Debug merge conflicts
- Review pull requests

### Giả ích gì / Benefits

- **Review**: Review changes giữa branches
- **Understand**: Hiểu changes sẽ được merge
- **Debug**: Debug merge issues

### Cách thực hiện / How to Do It

#### 1. Diff giữa hai branches

```bash
# Diff between current branch and another branch
git diff branchname

# Diff between two specific branches
git diff branch1 branch2

# Example: Diff between feature branch and main
git diff main feature-branch
```

#### 2. Diff với specific files

```bash
# Diff specific file between branches
git diff branch1 branch2 -- path/to/file.txt

# Example: Diff app.js between branches
git diff main feature-branch -- src/app.js
```

#### 3. Diff với output statistics

```bash
# Diff with statistics
git diff --stat main feature-branch
```

### Ví dụ:

```bash
# Create two branches with different changes
git checkout -b feature-branch
echo "feature content" >> feature.txt
git add feature.txt
git commit -m "Add feature"

git checkout main
echo "main content" >> main.txt
git add main.txt
git commit -m "Add main content"

# Diff between branches
git diff main feature-branch

# Output shows:
# - Files only in main
# + Files only in feature-branch
# Differences in common files
```

### Best Practices:

1. **Specify branches clearly**: Luôn specify branches rõ ràng
2. **Use --stat for summary**: Sử dụng `--stat` để xem summary
3. **Review before merge**: Review differences trước khi merge
4. **Use with care**: Cẩn thận khi diff giữa branches có nhiều differences

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Diff without understanding context
git diff main feature-branch
git merge feature-branch

# ✅ Nên: Review and understand before merge
git diff --stat main feature-branch
git diff main feature-branch
# Understand changes, then merge
git merge feature-branch
```

---

## Cách diff giữa hai files? / How to diff between two files?

### Mục đích / Purpose

Biết cách diff giữa hai files giúp bạn:

- Compare các versions của một file
- Review changes giữa các commits
- Debug issues trong specific files

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn compare hai versions của một file
- Muốn review changes trong specific file
- Debug issues trong specific file

### Giả ích gì / Benefits

- **Compare**: Compare các versions của files
- **Review**: Review changes trong specific files
- **Debug**: Debug issues trong specific files

### Cách thực hiện / How to Do It

#### 1. Diff file giữa working directory và staging area

```bash
# Diff file in working directory vs staging area
git diff file.txt
```

#### 2. Diff file giữa staging area và repository

```bash
# Diff staged file vs repository
git diff --staged file.txt
```

#### 3. Diff file giữa working directory và repository

```bash
# Diff file in working directory vs repository
git diff HEAD file.txt
```

#### 4. Diff file giữa hai commits

```bash
# Diff file between two commits
git diff commit1 commit2 -- file.txt

# Example: Diff file between two commits
git diff abc123 def456 -- src/app.js
```

#### 5. Diff file giữa hai branches

```bash
# Diff file between two branches
git diff branch1 branch2 -- file.txt

# Example: Diff file between branches
git diff main feature-branch -- src/app.js
```

### Ví dụ:

```bash
# Create initial commit
echo "original content" > file.txt
git add file.txt
git commit -m "Initial"

# Modify file
echo "first change" >> file.txt
git add file.txt
git commit -m "First change"

# Modify file again
echo "second change" >> file.txt

# Diff file (working vs staging)
git diff file.txt
# Shows: second change

# Stage the change
git add file.txt

# Diff file (staging vs repository)
git diff --staged file.txt
# Shows: second change

# Diff file between commits
git diff HEAD~1 HEAD -- file.txt
# Shows: first change
```

### Best Practices:

1. **Specify file path**: Luôn specify file path rõ ràng
2. **Use with context**: Hiểu context của differences
3. **Review carefully**: Review differences carefully
4. **Use --stat for summary**: Sử dụng `--stat` để xem summary

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Diff without specifying file
git diff
# Shows all file differences

# ✅ Nên: Specify file for focused review
git diff file.txt
# Shows only specified file differences
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git diff`** hiển thị unstaged changes (working vs staging)
2. **`git diff --staged`** hiển thị staged changes (staging vs repository)
3. **`git diff HEAD`** hiển thị tất cả changes (working vs repository)
4. **`git diff --stat`** hiển thị summary statistics của differences
5. **`git diff --color-words`** hiển thị differences ở word level
6. **`git diff branch1 branch2`** diff giữa hai branches
7. **`git diff commit1 commit2 -- file.txt`** diff file giữa hai commits

### Commands Reference:

| Command                                | Purpose                     |
| -------------------------------------- | --------------------------- |
| `git diff`                             | View unstaged changes       |
| `git diff --staged`                    | View staged changes         |
| `git diff --cached`                    | View staged changes (alias) |
| `git diff HEAD`                        | View all changes            |
| `git diff --stat`                      | View summary statistics     |
| `git diff --color-words`               | View word-level differences |
| `git diff branch1 branch2`             | Diff between branches       |
| `git diff commit1 commit2 -- file.txt` | Diff file between commits   |
| `git diff branch1 branch2 -- file.txt` | Diff file between branches  |

### Best Practices:

1. **Review before staging**: Luôn review unstaged changes trước khi staging
2. **Review before committing**: Luôn review staged changes trước khi committing
3. **Use --stat for quick review**: Sử dụng `--stat` để review nhanh
4. **Use --color-words for text**: Sử dụng `--color-words` cho text documents
5. **Understand differences**: Hiểu differences trước khi merge
6. **Specify targets clearly**: Luôn specify targets rõ ràng (branches, commits, files)

### Diff Visualization:

```
Repository (Last Commit)
    ↑ git diff --staged
    ↓
Staging Area (Staged Changes)
    ↑ git diff
    ↓
Working Directory (Unstaged Changes)

git diff HEAD = git diff + git diff --staged
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
