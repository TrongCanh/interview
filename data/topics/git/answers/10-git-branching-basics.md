# 10. Git Branching Basics / Git Branching Cơ bản

## Tổng quan về Git Branching Basics / Git Branching Basics Overview

### Mục đích / Purpose

**Git Branching** là một trong những tính năng mạnh mẽ nhất của Git, cho phép bạn làm việc trên multiple lines của development song song mà không ảnh hưởng đến nhau.

**Mục đích chính:**

- Hiểu Git branching là gì và tại sao cần branching
- Biết cách create, switch, và delete branches
- Hiểu các commands cơ bản cho branching
- Biết cách làm việc với multiple branches
- Nắm được best practices cho branching

### Khi nào cần hiểu về Git Branching Basics / When to Use

Hiểu về Git Branching Basics là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn làm việc trên multiple features song song
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Làm việc với team trên multiple branches
- Implement branching workflow

### Giả ích gì / Benefits

**Lợi ích:**

- **Parallel Development**: Làm việc trên multiple features song song
- **Isolation**: Isolate changes từ main codebase
- **Safety**: Test changes một cách an toàn
- **Flexibility**: Switch giữa contexts dễ dàng
- **Collaboration**: Làm việc với team hiệu quả hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                         | Nhược điểm (Cons)                       |
| -------------------------------------- | --------------------------------------- |
| Parallel - làm việc song song          | Complexity - có thể phức tạp            |
| Isolation - isolate changes            | Merge - cần merge branches              |
| Safe - test changes an toàn            | Conflicts - có thể gây conflicts        |
| Flexible - switch contexts dễ dàng     | Management - cần quản lý nhiều branches |
| Collaboration - team work hiệu quả hơn | Learning curve - cần thời gian học      |

---

## Git branch là gì? Tại sao cần branching? / What is Git branch? Why do we need branching?

### Mục đích / Purpose

Hiểu Git branch là gì và tại sao cần branching giúp bạn:

- Hiểu khái niệm branching trong Git
- Biết lợi ích của branching
- Hiểu khi nào nên tạo branches

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Training Git cho developers mới
- Giải thích Git workflow

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ Git branching
- **Workflow**: Hiểu branching workflow
- **Collaboration**: Làm việc với team hiệu quả hơn

### Định nghĩa / Definition

**Git Branch** là một pointer đến một commit. Nó cho phép bạn làm việc trên multiple lines của development song song mà không ảnh hưởng đến nhau.

Trong Git, branch chỉ là một pointer đến một commit, không phải là một copy của files. Điều này làm cho branching cực kỳ nhanh và lightweight.

### Tại sao cần branching? / Why Do We Need Branching?

| Lý do / Reason           | Giải thích / Explanation                                 |
| ------------------------ | -------------------------------------------------------- |
| **Parallel Development** | Làm việc trên multiple features song song                |
| **Isolation**            | Isolate changes từ main codebase                         |
| **Testing**              | Test changes một cách an toàn                            |
| **Bug Fixes**            | Fix bugs mà không ảnh hưởng đến features đang phát triển |
| **Releases**             | Prepare releases một cách an toàn                        |
| **Collaboration**        | Làm việc với team hiệu quả hơn                           |

### Cách Git branching hoạt động / How Git Branching Works

```
Initial commit (main)
    ↓
Second commit (main)
    ↓
Third commit (main)
    ↓
Create feature branch (feature)
    ↓
Fourth commit (feature)
    ↓
Fifth commit (main)
    ↓
Merge feature into main
```

### Ví dụ:

```bash
# Create initial commit
echo "content" > file.txt
git add file.txt
git commit -m "Initial commit"

# Create a new branch
git branch feature-branch

# Switch to the new branch
git checkout feature-branch

# Make changes on feature branch
echo "feature content" >> feature.txt
git add feature.txt
git commit -m "Add feature"

# Switch back to main branch
git checkout main

# Main branch is unchanged
ls
# Only shows file.txt
```

### Best Practices:

1. **Use branches for features**: Sử dụng branches cho mỗi feature
2. **Keep branches short-lived**: Giữ branches ngắn hạn
3. **Name branches descriptively**: Đặt tên branches rõ ràng
4. **Delete merged branches**: Xóa branches sau khi merge

---

## `git branch` làm gì? / What does `git branch` do?

### Mục đích / Purpose

Hiểu `git branch` command giúp bạn:

- List tất cả branches
- Create new branches
- Delete branches
- Rename branches

### Khi nào dùng / When to Use

Sử dụng `git branch` khi:

- Muốn xem tất cả branches
- Muốn tạo new branch
- Muốn delete branch
- Muốn rename branch

### Giả ích gì / Benefits

- **List**: Xem tất cả branches
- **Create**: Tạo new branches
- **Delete**: Delete branches
- **Rename**: Rename branches

### Định nghĩa / Definition

**`git branch`** là command dùng để list, create, delete, và rename branches.

### Options:

| Option         | Purpose                              |
| -------------- | ------------------------------------ |
| (no option)    | List all local branches              |
| `-r`           | List all remote branches             |
| `-a`           | List all branches (local and remote) |
| `-d`           | Delete branch (must be merged)       |
| `-D`           | Force delete branch                  |
| `-m`           | Rename branch                        |
| `<branchname>` | Create new branch                    |

### Ví dụ:

```bash
# List all local branches
git branch

# Output:
# * main
#   feature-branch
#   bugfix-branch

# List all branches (local and remote)
git branch -a

# Output:
# * main
#   feature-branch
#   bugfix-branch
#   remotes/origin/main
#   remotes/origin/feature-branch

# Create new branch
git branch new-feature

# Delete branch (must be merged)
git branch -d old-feature

# Force delete branch
git branch -D old-feature

# Rename branch
git branch -m old-name new-name
```

### Best Practices:

1. **Use descriptive names**: Sử dụng tên branches rõ ràng
2. **Delete merged branches**: Xóa branches sau khi merge
3. **Use -a to see remote branches**: Sử dụng `-a` để xem remote branches
4. **Use -D with caution**: Cẩn thận khi dùng `-D` force delete

---

## `git checkout branchname` khác `git switch branchname` như thế nào? / How is `git checkout branchname` different from `git switch branchname`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git checkout branchname` và `git switch branchname` giúp bạn:

- Chọn đúng command để switch branches
- Hiểu modern Git commands
- Sử dụng Git hiệu quả hơn

### Khi nào dùng / When to Use

| Command                   | Khi nào dùng                              |
| ------------------------- | ----------------------------------------- |
| `git checkout branchname` | Switch branches (older method)            |
| `git switch branchname`   | Switch branches (newer method, Git 2.23+) |

### Giả ích gì / Benefits

- **Modern**: `git switch` là command mới, more intuitive
- **Separation**: `git switch` chỉ dùng cho switching branches
- **Compatibility**: `git checkout` vẫn hoạt động trên all versions

### So sánh chi tiết / Detailed Comparison

| Aspect            | `git checkout branchname`      | `git switch branchname` |
| ----------------- | ------------------------------ | ----------------------- |
| **Version**       | All versions                   | Git 2.23+               |
| **Purpose**       | Switch branches, restore files | Switch branches only    |
| **Intuitiveness** | Less intuitive                 | More intuitive          |
| **Safety**        | Can be confusing               | Safer, clearer          |

### Ví dụ:

```bash
# Using git checkout (older method)
git checkout feature-branch

# Using git switch (newer method)
git switch feature-branch

# Both do the same thing: switch to feature-branch
```

### Best Practices:

1. **Use `git switch`**: Sử dụng `git switch` nếu bạn đang dùng Git 2.23+
2. **Use `git checkout`**: Sử dụng `git checkout` nếu cần compatibility với older versions
3. **Understand the difference**: Hiểu sự khác biệt để dùng đúng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use git checkout for switching (confusing)
git checkout feature-branch
# Can be confused with file restoration

# ✅ Nên: Use git switch for switching
git switch feature-branch
# Clearer intent
```

---

## `git checkout -b branchname` khác `git switch -c branchname` như thế nào? / How is `git checkout -b branchname` different from `git switch -c branchname`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git checkout -b branchname` và `git switch -c branchname` giúp bạn:

- Create và switch to new branch
- Chọn đúng command
- Hiểu modern Git commands

### Khi nào dùng / When to Use

| Command                      | Khi nào dùng                                             |
| ---------------------------- | -------------------------------------------------------- |
| `git checkout -b branchname` | Create và switch to new branch (older method)            |
| `git switch -c branchname`   | Create và switch to new branch (newer method, Git 2.23+) |

### Giả ích gì / Benefits

- **Modern**: `git switch -c` là command mới, more intuitive
- **Efficiency**: Create và switch trong một command
- **Compatibility**: `git checkout -b` vẫn hoạt động trên all versions

### So sánh chi tiết / Detailed Comparison

| Aspect            | `git checkout -b branchname`   | `git switch -c branchname`     |
| ----------------- | ------------------------------ | ------------------------------ |
| **Version**       | All versions                   | Git 2.23+                      |
| **Purpose**       | Create và switch to new branch | Create và switch to new branch |
| **Intuitiveness** | Less intuitive                 | More intuitive                 |
| **Option**        | `-b` (create)                  | `-c` (create)                  |

### Ví dụ:

```bash
# Using git checkout -b (older method)
git checkout -b feature-branch

# Using git switch -c (newer method)
git switch -c feature-branch

# Both do the same thing: create and switch to feature-branch
```

### Best Practices:

1. **Use `git switch -c`**: Sử dụng `git switch -c` nếu bạn đang dùng Git 2.23+
2. **Use `git checkout -b`**: Sử dụng `git checkout -b` nếu cần compatibility với older versions
3. **Understand the difference**: Hiểu sự khác biệt để dùng đúng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use two commands
git branch feature-branch
git checkout feature-branch

# ✅ Nên: Use one command
git switch -c feature-branch
# Or
git checkout -b feature-branch
```

---

## `git branch -d branchname` khác `git branch -D branchname` như thế nào? / How is `git branch -d branchname` different from `git branch -D branchname`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git branch -d branchname` và `git branch -D branchname` giúp bạn:

- Delete branches an toàn
- Hiểu risks của force delete
- Chọn đúng option cho tình huống

### Khi nào dùng / When to Use

| Option | Khi nào dùng                             |
| ------ | ---------------------------------------- |
| `-d`   | Delete branch (safely, must be merged)   |
| `-D`   | Force delete branch (even if not merged) |

### Giả ích gì / Benefits

- **Safety**: `-d` là safe delete
- **Force**: `-D` là force delete khi cần
- **Understanding**: Hiểu risks của mỗi option

### So sánh chi tiết / Detailed Comparison

| Aspect          | `git branch -d`             | `git branch -D`         |
| --------------- | --------------------------- | ----------------------- |
| **Safety**      | Safe                        | Unsafe                  |
| **Requirement** | Branch must be merged       | No requirement          |
| **Risk**        | Low (won't delete unmerged) | High (can lose commits) |
| **Use case**    | Normal deletion             | Force deletion          |

### Ví dụ:

```bash
# Create a branch
git switch -c feature-branch
echo "feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# Switch back to main
git switch main

# Try to delete with -d (will fail if not merged)
git branch -d feature-branch
# Error: error: The branch 'feature-branch' is not fully merged.

# Force delete with -D
git branch -D feature-branch
# Success: Deleted branch feature-branch
```

### Best Practices:

1. **Use `-d` for normal deletion**: Sử dụng `-d` cho normal deletion
2. **Use `-D` with caution**: Cẩn thận khi dùng `-D`
3. **Check if merged**: Check nếu branch đã được merged trước khi delete
4. **Understand the risk**: Hiểu risk của force delete

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always use -D
git branch -D feature-branch
# Can lose commits

# ✅ Nên: Use -d first
git branch -d feature-branch
# If fails, understand why before using -D
```

---

## Detached HEAD state là gì? / What is Detached HEAD state?

### Mục đích / Purpose

Hiểu Detached HEAD state giúp bạn:

- Biết khi nào HEAD bị detached
- Hiểu implications của Detached HEAD
- Biết cách recover từ Detached HEAD

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git branching
- Debug issues với Detached HEAD
- Giải thích Git internals

### Giả ích gì / Benefits

- **Understanding**: Hiểu Detached HEAD state
- **Recovery**: Biết cách recover từ Detached HEAD
- **Avoidance**: Tránh Detached HEAD khi không cần

### Định nghĩa / Definition

**Detached HEAD state** là khi HEAD không trỏ đến một branch mà trỏ trực tiếp đến một commit. Điều này xảy ra khi bạn checkout một specific commit thay vì một branch.

### Khi nào xảy ra? / When Does It Happen?

| Situation                               | Explanation                  |
| --------------------------------------- | ---------------------------- |
| Checkout specific commit                | `git checkout <commit-hash>` |
| Checkout tag                            | `git checkout <tagname>`     |
| Checkout remote branch without tracking | `git checkout origin/main`   |

### Ví dụ:

```bash
# Normal state (HEAD points to branch)
git switch main
# HEAD -> main -> commit

# Detached HEAD state (HEAD points to commit)
git checkout abc1234
# HEAD -> commit (detached)

# Make commits in detached state
echo "content" > file.txt
git add file.txt
git commit -m "Detached commit"
# Commit is created but not on any branch

# Recover from detached state
git switch main
# Detached commits are lost unless saved
```

### Cách recover từ Detached HEAD / How to Recover from Detached HEAD

```bash
# Create a new branch from detached HEAD
git switch -c new-branch

# Or save the commit reference
git branch new-branch HEAD
```

### Best Practices:

1. **Avoid detached state**: Tránh Detached HEAD khi không cần
2. **Create branch immediately**: Tạo branch ngay khi ở Detached HEAD
3. **Check HEAD status**: Check HEAD status với `git status`
4. **Understand implications**: Hiểu implications của Detached HEAD

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Make commits in detached state without creating branch
git checkout abc1234
echo "content" > file.txt
git add file.txt
git commit -m "Detached commit"
git switch main
# Commit is lost

# ✅ Nên: Create branch immediately
git checkout abc1234
git switch -c new-branch
echo "content" > file.txt
git add file.txt
git commit -m "New commit"
# Commit is saved on new-branch
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **Git Branch** là một pointer đến một commit
2. **Branching** cho phép parallel development và isolation
3. **`git branch`** lists, creates, deletes, và renames branches
4. **`git checkout branchname`** switches branches (older method)
5. **`git switch branchname`** switches branches (newer method, Git 2.23+)
6. **`git checkout -b branchname`** creates và switches to new branch (older method)
7. **`git switch -c branchname`** creates và switches to new branch (newer method)
8. **`git branch -d branchname`** deletes branch safely (must be merged)
9. **`git branch -D branchname`** force deletes branch (even if not merged)
10. **Detached HEAD state** là khi HEAD trỏ trực tiếp đến commit thay vì branch

### Commands Reference:

| Command                        | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `git branch`                   | List all local branches                   |
| `git branch -a`                | List all branches (local and remote)      |
| `git branch <branchname>`      | Create new branch                         |
| `git branch -d <branchname>`   | Delete branch safely                      |
| `git branch -D <branchname>`   | Force delete branch                       |
| `git branch -m <old> <new>`    | Rename branch                             |
| `git checkout <branchname>`    | Switch to branch (older method)           |
| `git switch <branchname>`      | Switch to branch (newer method)           |
| `git checkout -b <branchname>` | Create và switch to branch (older method) |
| `git switch -c <branchname>`   | Create và switch to branch (newer method) |
| `git checkout <commit-hash>`   | Checkout specific commit (detached HEAD)  |

### Best Practices:

1. **Use branches for features**: Sử dụng branches cho mỗi feature
2. **Keep branches short-lived**: Giữ branches ngắn hạn
3. **Name branches descriptively**: Đặt tên branches rõ ràng
4. **Use `git switch`**: Sử dụng `git switch` nếu Git 2.23+
5. **Use `-d` for deletion**: Sử dụng `-d` cho normal deletion
6. **Use `-D` with caution**: Cẩn thận khi dùng `-D`
7. **Avoid detached state**: Tránh Detached HEAD khi không cần
8. **Create branch from detached HEAD**: Tạo branch ngay khi ở Detached HEAD

### Branch Naming Conventions:

```bash
# Feature branches
feature/user-authentication
feature/add-dashboard

# Bugfix branches
bugfix/login-issue
bugfix/memory-leak

# Release branches
release/v1.0.0
release/v2.0.0

# Hotfix branches
hotfix/critical-bug
hotfix/security-patch
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
