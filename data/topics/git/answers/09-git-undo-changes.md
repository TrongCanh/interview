# 9. Git Undo Changes / Hoàn tác thay đổi trong Git

## Tổng quan về Git Undo Changes / Git Undo Changes Overview

### Mục đích / Purpose

**Git Undo Changes** là các commands và techniques dùng để hoàn tác changes trong Git. Git cung cấp nhiều cách để undo changes tùy thuộc vào loại changes và tình huống.

**Mục đích chính:**

- Hiểu cách undo changes ở các levels khác nhau
- Biết sự khác biệt giữa các undo commands
- Hiểu risks của undoing changes
- Biết cách recover lost changes
- Nắm được best practices cho undoing changes

### Khi nào cần hiểu về Git Undo Changes / When to Use

Hiểu về Git Undo Changes là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn undo unintended changes
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Debug issues bằng cách undoing changes
- Recover từ mistakes

### Giả ích gì / Benefits

**Lợi ích:**

- **Safety**: Có thể undo changes khi cần
- **Recovery**: Recover từ mistakes
- **Flexibility**: Nhiều cách để undo changes
- **Control**: Có control over changes

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                              | Nhược điểm (Cons)                          |
| ------------------------------------------- | ------------------------------------------ |
| Flexible - nhiều ways để undo changes       | Complexity - nhiều options cần hiểu        |
| Safe - có thể recover lost changes          | Risky - có thể lose data nếu dùng sai      |
| Powerful - có thể undo bất kỳ changes nào   | Confusing - dễ nhầm lẫn giữa các options   |
| Reversible - nhiều operations là reversible | History - có thể rewrite history nguy hiểm |

---

## `git restore file` làm gì? / What does `git restore file` do?

### Mục đích / Purpose

Hiểu `git restore file` giúp bạn:

- Discard unstaged changes trong working directory
- Restore files từ staging area hoặc repository
- Undo unintended changes

### Khi nào dùng / When to Use

Sử dụng `git restore file` khi:

- Muốn discard unstaged changes
- Muốn restore file về version trong staging area
- Muốn undo unintended modifications

### Giả ích gì / Benefits

- **Discard**: Discard unstaged changes
- **Restore**: Restore files về previous version
- **Clean**: Clean working directory

### Định nghĩa / Definition

**`git restore file`** (Git 2.23+) discards unstaged changes trong working directory và restore file về version trong staging area hoặc repository.

### Cách hoạt động / How It Works

```
Working Directory (unstaged changes)
    ↓ git restore file
    ↓
Restored to staging area version
```

### Ví dụ:

```bash
# Modify a file
echo "new content" >> file.txt

# Discard unstaged changes
git restore file.txt

# Result: file.txt is restored to staging area version
```

### Options:

| Option                | Purpose                              |
| --------------------- | ------------------------------------ |
| `--staged`            | Restore staged files (unstage)       |
| `--source=<commit>`   | Restore from specific commit         |
| `--worktree`          | Restore working tree (default)       |
| `--staged --worktree` | Restore both staged and working tree |

### Best Practices:

1. **Use with caution**: Cẩn thận khi dùng vì changes sẽ bị mất
2. **Review before restoring**: Review changes trước khi discard
3. **Use --staged to unstage**: Sử dụng `--staged` để unstage files
4. **Understand the difference**: Hiểu sự khác biệt với `git checkout`

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Restore without reviewing
git restore file.txt
# Changes are lost

# ✅ Nên: Review before restoring
git diff file.txt
# Review changes, then restore if needed
git restore file.txt
```

---

## `git restore --staged file` khác `git restore file` như thế nào? / How is `git restore --staged file` different from `git restore file`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git restore --staged file` và `git restore file` giúp bạn:

- Discard staged changes
- Discard unstaged changes
- Chọn đúng command cho tình huống

### Khi nào dùng / When to Use

| Command                     | Khi nào dùng                             |
| --------------------------- | ---------------------------------------- |
| `git restore file`          | Discard unstaged changes                 |
| `git restore --staged file` | Unstage changes (discard staged changes) |

### Giả ích gì / Benefits

- **Precision**: Discard changes ở đúng level
- **Flexibility**: Có thể discard staged hoặc unstaged changes
- **Control**: Có control over changes

### So sánh chi tiết / Detailed Comparison

| Aspect        | `git restore file`              | `git restore --staged file` |
| ------------- | ------------------------------- | --------------------------- |
| **Affects**   | Working directory               | Staging area                |
| **Discards**  | Unstaged changes                | Staged changes              |
| **Preserves** | Staged changes                  | Unstaged changes            |
| **Result**    | File restored to staged version | File unstaged               |

### Visualization:

```
Repository
    ↑
    | (staged changes)
    ↓
Staging Area
    ↑
    | (unstaged changes)
    ↓
Working Directory

git restore file: Discard unstaged changes (Working → Staging)
git restore --staged file: Unstage changes (Staging → Repository)
```

### Ví dụ:

```bash
# Modify a file
echo "first change" >> file.txt
git add file.txt

# Modify again
echo "second change" >> file.txt

# Discard unstaged changes (second change)
git restore file.txt
# Result: file.txt has first change (staged)

# Unstage changes (first change)
git restore --staged file.txt
# Result: file.txt has no changes (unstaged)
```

### Best Practices:

1. **Use `git restore file`**: Discard unstaged changes
2. **Use `git restore --staged file`**: Unstage changes
3. **Review before discarding**: Luôn review changes trước khi discard
4. **Understand the difference**: Hiểu sự khác biệt để dùng đúng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use wrong command
git restore file.txt
# When you want to unstage

# ✅ Nên: Use correct command
git restore --staged file.txt
# Unstages the file
```

---

## `git reset --soft`, `--mixed`, `--hard` khác nhau như thế nào? / How are `git reset --soft`, `--mixed`, `--hard` different?

### Mục đích / Purpose

Hiểu sự khác biệt giữa các options của `git reset` giúp bạn:

- Reset HEAD và staging area ở các levels khác nhau
- Chọn đúng option cho tình huống
- Hiểu risks của mỗi option

### Khi nào dùng / When to Use

| Option    | Khi nào dùng                                   |
| --------- | ---------------------------------------------- |
| `--soft`  | Reset HEAD nhưng keep changes staged           |
| `--mixed` | Reset HEAD và staging area (default)           |
| `--hard`  | Reset HEAD, staging area, và working directory |

### Giả ích gì / Benefits

- **Flexibility**: Nhiều levels để reset
- **Control**: Có control over changes
- **Recovery**: Có thể recover với reflog

### So sánh chi tiết / Detailed Comparison

| Option    | HEAD  | Staging Area | Working Directory | Changes         |
| --------- | ----- | ------------ | ----------------- | --------------- |
| `--soft`  | Reset | Preserved    | Preserved         | Kept (staged)   |
| `--mixed` | Reset | Reset        | Preserved         | Kept (unstaged) |
| `--hard`  | Reset | Reset        | Reset             | Discarded       |

### Visualization:

```
Repository (HEAD)
    ↑
    | (staged changes)
    ↓
Staging Area
    ↑
    | (unstaged changes)
    ↓
Working Directory

--soft:  HEAD moves, changes stay staged
--mixed: HEAD moves, changes unstaged
--hard:  HEAD moves, all changes discarded
```

### Ví dụ:

```bash
# Create commits
echo "content1" > file1.txt
git add file1.txt
git commit -m "First commit"

echo "content2" > file2.txt
git add file2.txt
git commit -m "Second commit"

# Make new changes
echo "new content" >> file1.txt
git add file1.txt
echo "more content" >> file2.txt

# Reset --soft (keep changes staged)
git reset --soft HEAD~1
# Result: file1.txt staged, file2.txt unstaged

# Reset --mixed (keep changes unstaged)
git reset --mixed HEAD~1
# Result: file1.txt unstaged, file2.txt unstaged

# Reset --hard (discard all changes)
git reset --hard HEAD~1
# Result: All changes discarded
```

### Best Practices:

1. **Use --soft to modify commits**: Sử dụng để modify commits gần nhất
2. **Use --mixed to unstage**: Sử dụng để unstage changes
3. **Use --hard with caution**: Cẩn thận khi dùng vì changes sẽ bị mất
4. **Use reflog to recover**: Sử dụng reflog để recover nếu cần

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use --hard without understanding
git reset --hard HEAD~1
# All changes are lost

# ✅ Nên: Use appropriate option
git reset --soft HEAD~1
# Changes are preserved
```

---

## `git revert` khác `git reset` như thế nào? / How is `git revert` different from `git reset`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git revert` và `git reset` giúp bạn:

- Chọn đúng method để undo commits
- Hiểu impact trên commit history
- Avoid rewriting history

### Khi nào dùng / When to Use

| Command      | Khi nào dùng                             |
| ------------ | ---------------------------------------- |
| `git reset`  | Undo commits locally (rewrites history)  |
| `git revert` | Undo commits safely (creates new commit) |

### Giả ích gì / Benefits

- **Safe**: `git revert` không rewrite history
- **Flexible**: `git reset` cho phép nhiều options
- **Understanding**: Hiểu khi nào nên dùng mỗi command

### So sánh chi tiết / Detailed Comparison

| Aspect       | `git reset`         | `git revert`       |
| ------------ | ------------------- | ------------------ |
| **Action**   | Moves HEAD          | Creates new commit |
| **History**  | Rewrites history    | Preserves history  |
| **Commits**  | Removes commits     | Adds new commit    |
| **Use case** | Local undo          | Public undo        |
| **Safety**   | Dangerous if pushed | Safe               |

### Visualization:

```
git reset:
A -> B -> C
    ↓ reset to B
A -> B

git revert:
A -> B -> C
    ↓ revert C
A -> B -> C -> D (D undoes C)
```

### Ví dụ:

```bash
# Create commits
echo "content1" > file1.txt
git add file1.txt
git commit -m "First commit"

echo "content2" > file2.txt
git add file2.txt
git commit -m "Second commit"

# Using git reset (rewrites history)
git reset HEAD~1
# Result: Second commit is removed

# Using git revert (preserves history)
git revert HEAD
# Result: New commit that undoes second commit
```

### Best Practices:

1. **Use reset for local commits**: Sử dụng `git reset` cho local commits
2. **Use revert for shared history**: Sử dụng `git revert` cho shared history
3. **Never reset pushed commits**: Không reset commits đã được pushed
4. **Understand the impact**: Hiểu impact trên commit history

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Reset pushed commits
git push origin main
git reset HEAD~1
git push -f origin main
# Dangerous! Rewrites shared history

# ✅ Nên: Revert pushed commits
git push origin main
git revert HEAD
git push origin main
# Safe! Preserves history
```

---

## Khi nào nên dùng revert thay vì reset? / When should you use revert instead of reset?

### Mục đích / Purpose

Biết khi nào nên dùng `git revert` thay vì `git reset` giúp bạn:

- Avoid rewriting shared history
- Maintain commit history integrity
- Work safely với team

### Khi nào dùng / When to Use

Sử dụng `git revert` thay vì `git reset` khi:

- Commits đã được pushed lên remote
- Làm việc với shared branches
- Muốn preserve commit history
- Muốn undo commits một cách an toàn

### Giả ích gì / Benefits

- **Safe**: Không rewrite history
- **Preserves**: Preserve commit history
- **Collaboration**: Làm việc an toàn với team
- **Traceability**: Giữ traceability của changes

### Quyết định / Decision Tree

```
Has commit been pushed?
├─ Yes → Use revert (safe)
└─ No → Use reset (flexible)
```

### Ví dụ:

```bash
# Scenario 1: Local commit (not pushed)
echo "content" > file.txt
git add file.txt
git commit -m "Add content"

# Use reset (safe because local)
git reset HEAD~1

# Scenario 2: Pushed commit (shared)
echo "content" > file.txt
git add file.txt
git commit -m "Add content"
git push origin main

# Use revert (safe because shared)
git revert HEAD
git push origin main
```

### Best Practices:

1. **Use revert for pushed commits**: Luôn dùng revert cho pushed commits
2. **Use reset for local commits**: Có thể dùng reset cho local commits
3. **Communicate with team**: Communicate với team về undo operations
4. **Understand the impact**: Hiểu impact trên team

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Reset pushed commits
git push origin main
git reset HEAD~1
git push -f origin main
# Breaks team's workflow

# ✅ Nên: Revert pushed commits
git push origin main
git revert HEAD
git push origin main
# Safe for team
```

---

## Làm sao để discard uncommitted changes? / How to discard uncommitted changes?

### Mục đích / Purpose

Biết cách discard uncommitted changes giúp bạn:

- Clean working directory
- Undo unintended changes
- Start fresh

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn discard unstaged changes
- Muốn discard staged changes
- Muốn discard tất cả changes

### Giả ích gì / Benefits

- **Clean**: Clean working directory
- **Fresh**: Start fresh
- **Undo**: Undo unintended changes

### Cách thực hiện / How to Do It

#### 1. Discard unstaged changes

```bash
# Discard unstaged changes in a file
git restore file.txt

# Discard all unstaged changes
git restore .

# Using git checkout (older method)
git checkout -- file.txt
```

#### 2. Discard staged changes

```bash
# Unstage changes (keep in working directory)
git restore --staged file.txt

# Using git reset (older method)
git reset HEAD file.txt
```

#### 3. Discard all changes (staged and unstaged)

```bash
# Discard all changes
git reset --hard HEAD

# Discard all changes and untracked files
git clean -fd
git reset --hard HEAD
```

### Ví dụ:

```bash
# Create and modify files
echo "content1" > file1.txt
git add file1.txt
git commit -m "Initial"

echo "unstaged" >> file1.txt
echo "staged" >> file1.txt
git add file1.txt

# Discard unstaged changes
git restore file1.txt
# Result: file1.txt has staged change

# Discard staged changes
git restore --staged file1.txt
# Result: file1.txt has no changes

# Discard all changes
git reset --hard HEAD
# Result: All changes discarded
```

### Best Practices:

1. **Review before discarding**: Luôn review changes trước khi discard
2. **Use with caution**: Cẩn thận khi dùng vì changes sẽ bị mất
3. **Use reflog to recover**: Sử dụng reflog để recover nếu cần
4. **Understand the difference**: Hiểu sự khác biệt giữa các methods

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Discard without reviewing
git restore .
git reset --hard HEAD
# Changes are lost

# ✅ Nên: Review before discarding
git status
git diff
git restore .
# Review, then discard
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git restore file`** discards unstaged changes trong working directory
2. **`git restore --staged file`** unstages changes (discard staged changes)
3. **`git reset --soft`** resets HEAD nhưng keeps changes staged
4. **`git reset --mixed`** resets HEAD và staging area (default)
5. **`git reset --hard`** resets HEAD, staging area, và working directory
6. **`git revert`** creates new commit to undo previous commit (preserves history)
7. **`git reset`** moves HEAD (rewrites history)
8. **Use revert for pushed commits**: Luôn dùng revert cho pushed commits
9. **Use reset for local commits**: Có thể dùng reset cho local commits

### Commands Reference:

| Command                         | Purpose                                         |
| ------------------------------- | ----------------------------------------------- |
| `git restore file.txt`          | Discard unstaged changes                        |
| `git restore --staged file.txt` | Unstage changes                                 |
| `git restore .`                 | Discard all unstaged changes                    |
| `git reset --soft HEAD~1`       | Reset HEAD, keep staged                         |
| `git reset --mixed HEAD~1`      | Reset HEAD and staging area                     |
| `git reset --hard HEAD~1`       | Reset HEAD, staging area, and working directory |
| `git revert HEAD`               | Create new commit to undo last commit           |
| `git reset HEAD~1`              | Remove last commit (rewrites history)           |
| `git clean -fd`                 | Remove untracked files                          |
| `git reflog`                    | View reflog to recover lost commits             |

### Best Practices:

1. **Review before discarding**: Luôn review changes trước khi discard
2. **Use revert for shared history**: Luôn dùng revert cho pushed commits
3. **Use reset for local history**: Có thể dùng reset cho local commits
4. **Use with caution**: Cẩn thận khi dùng các commands này
5. **Use reflog to recover**: Sử dụng reflog để recover nếu cần
6. **Communicate with team**: Communicate với team về undo operations

### Decision Tree:

```
Need to undo changes?
├─ Unstaged changes?
│  └─ Use `git restore file.txt`
├─ Staged changes?
│  └─ Use `git restore --staged file.txt`
├─ Local commit (not pushed)?
│  └─ Use `git reset`
└─ Pushed commit (shared)?
   └─ Use `git revert`
```

### Safety Tips:

⚠️ **Important Warnings:**

1. **Never reset pushed commits**: Không reset commits đã được pushed
2. **Review before discarding**: Luôn review changes trước khi discard
3. **Use reflog to recover**: Sử dụng reflog để recover lost commits
4. **Understand the impact**: Hiểu impact trên commit history
5. **Communicate with team**: Communicate với team về undo operations

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
