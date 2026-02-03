# 11. Git Branching Advanced / Git Branching Nâng cao

## Tổng quan về Git Branching Advanced / Git Branching Advanced Overview

### Mục đích / Purpose

**Git Branching Advanced** bao gồm các concepts và commands nâng cao cho branching trong Git. Nó giúp bạn làm việc hiệu quả hơn với complex branching scenarios.

**Mục đích chính:**

- Hiểu Detached HEAD state chi tiết hơn
- Biết cách force delete branches
- Hiểu tracking branches
- Biết cách rename branches
- Nắm được advanced branching techniques

### Khi nào cần hiểu về Git Branching Advanced / When to Use

Hiểu về Git Branching Advanced là cần thiết khi:

- Làm việc với complex branching scenarios
- Muốn force delete branches
- Cần quản lý tracking branches
- Chuẩn bị cho phỏng vấn về Git nâng cao
- Debug branching issues

### Giả ích gì / Benefits

**Lợi ích:**

- **Advanced**: Làm việc với complex scenarios
- **Flexible**: Nhiều options cho branching
- **Control**: Có full control over branches
- **Efficiency**: Làm việc hiệu quả hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                        | Nhược điểm (Cons)                   |
| ------------------------------------- | ----------------------------------- |
| Powerful - xử lý complex scenarios    | Complexity - cần hiểu sâu về Git    |
| Flexible - nhiều options để customize | Risky - một số operations nguy hiểm |
| Control - full control over branches  | Confusing - có thể gây nhầm lẫn     |
| Efficient - làm việc hiệu quả hơn     | Learning curve - cần thời gian học  |

---

## Detached HEAD state là gì? Khi nào xảy ra? / What is Detached HEAD state? When does it happen?

### Mục đích / Purpose

Hiểu Detached HEAD state chi tiết hơn giúp bạn:

- Biết chính xác khi nào HEAD bị detached
- Hiểu implications của Detached HEAD
- Biết cách handle Detached HEAD state

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Debug issues với Detached HEAD
- Giải thích Git internals

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ Detached HEAD state
- **Handling**: Biết cách handle Detached HEAD
- **Avoidance**: Tránh Detached HEAD khi không cần

### Định nghĩa / Definition

**Detached HEAD state** là khi HEAD không trỏ đến một branch mà trỏ trực tiếp đến một commit. Điều này xảy ra khi bạn checkout một specific commit, tag, hoặc remote branch mà không tạo local tracking branch.

### Khi nào xảy ra? / When Does It Happen?

| Situation                               | Explanation                  |
| --------------------------------------- | ---------------------------- |
| Checkout specific commit                | `git checkout <commit-hash>` |
| Checkout tag                            | `git checkout <tagname>`     |
| Checkout remote branch without tracking | `git checkout origin/main`   |
| Checkout old commit                     | `git checkout HEAD~5`        |

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

# Check status
git status
# HEAD detached at abc1234

# Recover from detached state
git switch -c new-branch
# Or
git switch main
```

### Cách recover từ Detached HEAD / How to Recover from Detached HEAD

```bash
# Method 1: Create new branch from detached HEAD
git switch -c new-branch

# Method 2: Save detached commit to existing branch
git branch new-branch HEAD

# Method 3: Switch back to previous branch
git switch main
# Warning: Detached commits will be lost unless saved
```

### Best Practices:

1. **Avoid detached state**: Tránh Detached HEAD khi không cần
2. **Create branch immediately**: Tạo branch ngay khi ở Detached HEAD
3. **Check HEAD status**: Check HEAD status với `git status`
4. **Understand implications**: Hiểu implications của Detached HEAD
5. **Use reflog**: Sử dụng reflog để recover lost commits

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Make commits in detached state without saving
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

## `git branch -D` (force delete) khi nào nên dùng? / When should you use `git branch -D` (force delete)?

### Mục đích / Purpose

Hiểu khi nào nên dùng `git branch -D` giúp bạn:

- Force delete branches khi cần
- Hiểu risks của force delete
- Chọn đúng option cho deletion

### Khi nào dùng / When to Use

Sử dụng `git branch -D` khi:

- Branch chưa được merged
- Muốn force delete branch
- Branch không cần nữa và không muốn merge

### Giả ích gì / Benefits

- **Force**: Force delete branches
- **Cleanup**: Cleanup unneeded branches
- **Control**: Có control over branch deletion

### Định nghĩa / Definition

**`git branch -D`** (force delete) delete một branch ngay cả khi nó chưa được merged. Nó bypasses safety checks của `-d`.

### So sánh với `-d` / Comparison with `-d`

| Option | Safety | Requirement           | Risk |
| ------ | ------ | --------------------- | ---- |
| `-d`   | Safe   | Branch must be merged | Low  |
| `-D`   | Unsafe | No requirement        | High |

### Khi nào nên dùng `-D`? / When to Use `-D`?

| Situation            | Explanation                                |
| -------------------- | ------------------------------------------ |
| **Unmerged branch**  | Branch chưa được merged và không cần merge |
| **Abandoned branch** | Branch bị bỏ và không cần nữa              |
| **Test branch**      | Test branch đã xong và không cần merge     |
| **Mistake branch**   | Branch được tạo nhầm                       |

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

1. **Use `-d` first**: Luôn dùng `-d` trước
2. **Understand why unmerged**: Hiểu tại sao branch chưa được merged
3. **Use `-D` with caution**: Cẩn thận khi dùng `-D`
4. **Check for valuable commits**: Check nếu branch có valuable commits trước khi delete
5. **Document**: Document lý do force delete

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always use -D
git branch -D feature-branch
# Can lose valuable commits

# ✅ Nên: Use -d first
git branch -d feature-branch
# If fails, understand why before using -D
```

---

## `git branch -m` (rename) làm gì? / What does `git branch -m` (rename) do?

### Mục đích / Purpose

Hiểu `git branch -m` giúp bạn:

- Rename branches
- Correct branch names
- Maintain branch history

### Khi nào dùng / When to Use

Sử dụng `git branch -m` khi:

- Muốn rename một branch
- Muốn correct spelling mistake trong branch name
- Muốn follow naming conventions

### Giả ích gì / Benefits

- **Rename**: Rename branches dễ dàng
- **Maintain**: Maintain branch history
- **Correct**: Correct mistakes trong branch names

### Định nghĩa / Definition

**`git branch -m`** (hoặc `--move`) rename một branch. Nó thay đổi tên branch nhưng giữ tất cả commits và history.

### Ví dụ:

```bash
# Create a branch
git switch -c old-name

# Rename branch
git branch -m old-name new-name

# Or rename current branch
git branch -m new-name

# Check branches
git branch
# Shows: new-name
```

### Rename current branch / Rename Current Branch

```bash
# Method 1: Using git branch -m
git branch -m old-name new-name

# Method 2: Using git switch -m (Git 2.23+)
git switch -m new-name

# Method 3: Using git branch with no arguments
git branch -m new-name
```

### Rename remote branch / Rename Remote Branch

```bash
# Rename local branch
git branch -m old-name new-name

# Delete old remote branch
git push origin --delete old-name

# Push new branch to remote
git push origin new-name

# Set upstream
git push -u origin new-name
```

### Best Practices:

1. **Use descriptive names**: Sử dụng tên branches rõ ràng
2. **Follow naming conventions**: Follow team naming conventions
3. **Rename before pushing**: Rename branches trước khi push
4. **Communicate with team**: Communicate với team về branch renaming
5. **Update tracking**: Update tracking sau khi rename remote branch

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rename branch after pushing
git push origin old-name
git branch -m old-name new-name
# Remote branch still has old name

# ✅ Nên: Rename before pushing
git branch -m old-name new-name
git push origin new-name
# Both local and remote have new name
```

---

## `git branch --merged` và `git branch --no-merged` hiển thị gì? / What do `git branch --merged` and `git branch --no-merged` display?

### Mục đích / Purpose

Hiểu `git branch --merged` và `--no-merged` giúp bạn:

- Xem branches đã được merged
- Xem branches chưa được merged
- Cleanup branches hiệu quả hơn

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn cleanup branches đã được merged
- Muốn xem branches chưa được merged
- Muốn review branch status

### Giả ích gì / Benefits

- **Cleanup**: Cleanup branches đã được merged
- **Review**: Review branch status
- **Efficiency**: Làm việc hiệu quả hơn

### Định nghĩa / Definition

**`git branch --merged`** hiển thị branches đã được merged vào current branch.

**`git branch --no-merged`** hiển thị branches chưa được merged vào current branch.

### Ví dụ:

```bash
# List merged branches
git branch --merged

# Output:
# main
# feature-branch
# bugfix-branch

# List unmerged branches
git branch --no-merged

# Output:
# new-feature
# experimental-branch
```

### Use Cases:

#### 1. Cleanup Merged Branches

```bash
# List merged branches
git branch --merged

# Delete merged branches
git branch -d feature-branch
git branch -d bugfix-branch
```

#### 2. Review Unmerged Branches

```bash
# List unmerged branches
git branch --no-merged

# Review and decide what to do
```

#### 3. Cleanup with Command

```bash
# Delete all merged branches except main
git branch --merged | grep -v main | xargs git branch -d
```

### Best Practices:

1. **Use --merged to cleanup**: Sử dụng để cleanup branches đã được merged
2. **Use --no-merged to review**: Sử dụng để review branches chưa được merged
3. **Be careful with deletion**: Cẩn thận khi delete branches
4. **Check for valuable commits**: Check nếu branch có valuable commits trước khi delete
5. **Document**: Document lý do delete branches

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Delete all merged branches without checking
git branch --merged | xargs git branch -d
# Might delete valuable branches

# ✅ Nên: Check before deleting
git branch --merged
# Review branches before deleting
```

---

## Tracking branches là gì? / What are tracking branches?

### Mục đích / Purpose

Hiểu tracking branches giúp bạn:

- Biết relationship giữa local và remote branches
- Hiểu upstream branches
- Làm việc với remotes hiệu quả hơn

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Debug issues với remote branches
- Giải thích Git remotes

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ local-remote relationship
- **Efficiency**: Làm việc với remotes hiệu quả hơn
- **Synchronization**: Sync local và remote branches

### Định nghĩa / Definition

**Tracking branch** (hay **upstream branch**) là một local branch có direct relationship với một remote branch. Git biết local branch tracks remote branch nào và có thể push/pull tự động.

### Cách hoạt động / How It Works

```
Remote Branch (origin/main)
    ↑
    | (tracks)
    ↓
Local Branch (main)

git push: Pushes local main to origin/main
git pull: Pulls from origin/main to local main
```

### Ví dụ:

```bash
# Create tracking branch when cloning
git clone https://github.com/user/repo.git
# main tracks origin/main

# Create tracking branch with checkout
git checkout -b feature origin/feature
# feature tracks origin/feature

# Create tracking branch with switch (Git 2.23+)
git switch -c feature origin/feature
# feature tracks origin/feature

# Set upstream for existing branch
git branch -u origin/main main
# main now tracks origin/main
```

### Xem tracking branches / View Tracking Branches

```bash
# View tracking branches
git branch -vv

# Output:
# * main abc1234 [origin/main] Add feature
#   feature def4567 [origin/feature] Fix bug
#   bugfix ghi8901 Fix issue
```

### Best Practices:

1. **Use tracking branches**: Luôn sử dụng tracking branches
2. **Set upstream explicitly**: Set upstream khi cần
3. **Check tracking status**: Check tracking status với `git branch -vv`
4. **Understand upstream**: Hiểu upstream branch của mỗi local branch

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Work with non-tracking branches
git checkout -b feature
git push origin feature
# Need to specify remote and branch every time

# ✅ Nên: Create tracking branches
git checkout -b feature origin/feature
# Or
git switch -c feature origin/feature
# Git knows upstream automatically
```

---

## `git branch --set-upstream-to` làm gì? / What does `git branch --set-upstream-to` do?

### Mục đích / Purpose

Hiểu `git branch --set-upstream-to` giúp bạn:

- Set upstream branch cho local branch
- Enable automatic push/pull
- Làm việc với remotes hiệu quả hơn

### Khi nào dùng / When to Use

Sử dụng `git branch --set-upstream-to` khi:

- Muốn set upstream cho existing branch
- Muốn enable automatic push/pull
- Muốn fix tracking relationship

### Giả ích gì / Benefits

- **Automatic**: Enable automatic push/pull
- **Convenience**: Không cần specify remote và branch
- **Efficiency**: Làm việc hiệu quả hơn

### Định nghĩa / Definition

**`git branch --set-upstream-to`** (hoặc `-u`) set upstream branch cho local branch. Sau đó, bạn có thể push/pull mà không cần specify remote và branch.

### Ví dụ:

```bash
# Create local branch without tracking
git checkout -b feature

# Set upstream branch
git branch --set-upstream-to origin/feature

# Or use -u (short form)
git branch -u origin/feature

# Now push without specifying remote and branch
git push
# Pushes to origin/feature

# Pull without specifying remote and branch
git pull
# Pulls from origin/feature
```

### So sánh với các methods khác / Comparison with Other Methods

| Method           | Command           | Description                              |
| ---------------- | ----------------- | ---------------------------------------- |
| **Clone**        | `git clone`       | Automatically creates tracking branches  |
| **Checkout**     | `git checkout -b` | Creates tracking branch if remote exists |
| **Switch**       | `git switch -c`   | Creates tracking branch if remote exists |
| **Set upstream** | `git branch -u`   | Sets upstream for existing branch        |

### Best Practices:

1. **Use -u when creating branches**: Sử dụng `-u` khi tạo branches từ remotes
2. **Set upstream for existing branches**: Set upstream cho existing branches
3. **Check tracking status**: Check tracking status với `git branch -vv`
4. **Use automatic push/pull**: Sử dụng automatic push/pull sau khi set upstream

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always specify remote and branch
git push origin feature
git pull origin feature
# Tedious to type every time

# ✅ Nên: Set upstream and use automatic
git branch -u origin/feature
git push
git pull
# Git knows upstream automatically
```

---

## `git branch -u` là gì? / What is `git branch -u`?

### Mục đích / Purpose

Hiểu `git branch -u` giúp bạn:

- Set upstream branch cho local branch
- Enable automatic push/pull
- Làm việc với remotes hiệu quả hơn

### Khi nào dùng / When to Use

Sử dụng `git branch -u` khi:

- Muốn set upstream cho existing branch
- Muốn enable automatic push/pull
- Muốn fix tracking relationship

### Giả ích gì / Benefits

- **Automatic**: Enable automatic push/pull
- **Convenience**: Không cần specify remote và branch
- **Efficiency**: Làm việc hiệu quả hơn

### Định nghĩa / Definition

**`git branch -u`** (hoặc `--set-upstream-to`) set upstream branch cho local branch. Nó là short form của `--set-upstream-to`.

### Ví dụ:

```bash
# Create local branch without tracking
git checkout -b feature

# Set upstream branch
git branch -u origin/feature

# Now push without specifying remote and branch
git push
# Pushes to origin/feature

# Pull without specifying remote and branch
git pull
# Pulls from origin/feature
```

### So sánh với `--set-upstream-to` / Comparison with `--set-upstream-to`

| Option | Full Name           | Description                    |
| ------ | ------------------- | ------------------------------ |
| `-u`   | `--set-upstream-to` | Short form, same functionality |

### Best Practices:

1. **Use -u for brevity**: Sử dụng `-u` vì ngắn hơn
2. **Set upstream for existing branches**: Set upstream cho existing branches
3. **Check tracking status**: Check tracking status với `git branch -vv`
4. **Use automatic push/pull**: Sử dụng automatic push/pull sau khi set upstream

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always specify remote and branch
git push origin feature
git pull origin feature
# Tedious to type every time

# ✅ Nên: Set upstream and use automatic
git branch -u origin/feature
git push
git pull
# Git knows upstream automatically
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **Detached HEAD state** là khi HEAD trỏ trực tiếp đến commit thay vì branch
2. **`git branch -D`** force delete branches (even if not merged)
3. **`git branch -m`** rename branches
4. **`git branch --merged`** hiển thị branches đã được merged
5. **`git branch --no-merged`** hiển thị branches chưa được merged
6. **Tracking branches** là local branches có relationship với remote branches
7. **`git branch --set-upstream-to`** set upstream branch cho local branch
8. **`git branch -u`** là short form của `--set-upstream-to`

### Commands Reference:

| Command                                          | Purpose                               |
| ------------------------------------------------ | ------------------------------------- |
| `git branch -D <branchname>`                     | Force delete branch                   |
| `git branch -m <old> <new>`                      | Rename branch                         |
| `git branch --merged`                            | List merged branches                  |
| `git branch --no-merged`                         | List unmerged branches                |
| `git branch -vv`                                 | View tracking branches                |
| `git branch --set-upstream-to <remote>/<branch>` | Set upstream branch                   |
| `git branch -u <remote>/<branch>`                | Set upstream branch (short form)      |
| `git checkout -b <branch> <remote>/<branch>`     | Create tracking branch (older method) |
| `git switch -c <branch> <remote>/<branch>`       | Create tracking branch (newer method) |

### Best Practices:

1. **Avoid detached state**: Tránh Detached HEAD khi không cần
2. **Create branch immediately**: Tạo branch ngay khi ở Detached HEAD
3. **Use `-d` first**: Luôn dùng `-d` trước khi delete
4. **Use `-D` with caution**: Cẩn thận khi dùng `-D`
5. **Use descriptive names**: Sử dụng tên branches rõ ràng
6. **Follow naming conventions**: Follow team naming conventions
7. **Use tracking branches**: Luôn sử dụng tracking branches
8. **Set upstream explicitly**: Set upstream khi cần
9. **Check tracking status**: Check tracking status với `git branch -vv`
10. **Use automatic push/pull**: Sử dụng automatic push/pull sau khi set upstream

### Branch Cleanup Workflow:

```bash
# List merged branches
git branch --merged

# Delete merged branches (except main)
git branch --merged | grep -v main | xargs git branch -d

# List unmerged branches
git branch --no-merged

# Review and decide what to do
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
