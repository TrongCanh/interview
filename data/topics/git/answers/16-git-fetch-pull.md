# 16. Git Fetch & Pull / Git Fetch và Pull

## Tổng quan về Git Fetch & Pull / Git Fetch & Pull Overview

### Mục đích / Purpose

**Git Fetch & Pull** là commands dùng để get changes từ remote repositories. Fetch downloads changes nhưng không merge, trong khi pull downloads và merges changes.

**Mục đích chính:**

- Hiểu sự khác biệt giữa fetch và pull
- Biết khi nào nên dùng fetch
- Biết khi nào nên dùng pull
- Hiểu cách sync local với remote
- Nắm được best practices cho remote operations

### Khi nào cần hiểu về Git Fetch & Pull / When to Use

Hiểu về Git Fetch & Pull là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn sync local với remote
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Làm việc với remote repositories
- Debug issues với remote sync

### Giả ích gì / Benefits

**Lợi ích:**

- **Sync**: Sync local với remote repositories
- **Control**: Fetch cho phép review trước khi merge
- **Convenience**: Pull downloads và merges trong một command
- **Safety**: Fetch cho phép review changes trước khi merge
- **Flexibility**: Có nhiều options để customize

### Ưu nhược điểm / Pros & Cons

| Command   | Ưu điểm (Pros)                   | Nhược điểm (Cons)                           |
| --------- | -------------------------------- | ------------------------------------------- |
| **Fetch** | Control - review before merge    | Manual - cần merge thủ công                 |
|           | Safe - không modify local        | Multiple steps - fetch + merge              |
|           | Flexible - có thể review changes | Complex - cần hiểu Git workflow             |
| **Pull**  | Convenient - một command         | Automatic - merge ngay lập tức              |
|           | Fast - downloads và merges       | Less control - không review trước khi merge |
|           | Simple - dễ sử dụng              | Conflicts - có thể gây conflicts            |

---

## `git fetch` làm gì? / What does `git fetch` do?

### Mục đích / Purpose

Hiểu `git fetch` giúp bạn:

- Download changes từ remote
- Review changes trước khi merge
- Sync local với remote

### Khi nào dùng / When to Use

Sử dụng `git fetch` khi:

- Muốn download changes từ remote
- Muốn review changes trước khi merge
- Muốn sync local với remote
- Muốn check remote changes

### Giả ích gì / Benefits

- **Download**: Download changes từ remote
- **Review**: Review changes trước khi merge
- **Safe**: Không modify local repository
- **Control**: Có control over khi merge

### Định nghĩa / Definition

**`git fetch`** downloads changes từ remote repository nhưng không merge chúng vào local branches. Nó updates remote tracking branches (như `origin/main`) với latest changes từ remote.

### Cách hoạt động / How It Works

```
Remote Repository (origin/main)
    ↓ git fetch
    ↓
Local Repository (origin/main tracking branch)
    ↓ (not merged yet)
Local Branch (main)
```

### Ví dụ:

```bash
# Fetch all remotes
git fetch

# Fetch specific remote
git fetch origin

# Fetch specific branch
git fetch origin main

# Fetch all tags
git fetch --tags

# Check what was fetched
git log --oneline origin/main
# Shows remote commits
```

### Fetch Options:

| Option              | Purpose                   |
| ------------------- | ------------------------- |
| `--all`             | Fetch tất cả remotes      |
| `--prune`           | Xóa stale remote branches |
| `--tags`            | Fetch tất cả tags         |
| `<remote>`          | Fetch specific remote     |
| `<remote> <branch>` | Fetch specific branch     |

### Best Practices:

1. **Fetch before merging**: Luôn fetch trước khi merge
2. **Review changes**: Review changes trước khi merge
3. **Use --prune**: Sử dụng `--prune` để clean up stale branches
4. **Fetch specific branches**: Fetch specific branches khi cần
5. **Check before merging**: Check changes trước khi merge

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Pull without knowing what's coming
git pull
# Don't know what changes are coming

# ✅ Nên: Fetch first, review, then merge
git fetch
git log --oneline origin/main
# Review changes
git merge origin/main
# Know what's coming before merging
```

---

## `git fetch origin` khác `git fetch` như thế nào? / How is `git fetch origin` different from `git fetch`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git fetch origin` và `git fetch` giúp bạn:

- Fetch specific remote
- Fetch all remotes
- Control fetch behavior

### Khi nào dùng / When to Use

| Command            | Khi nào dùng          |
| ------------------ | --------------------- |
| `git fetch`        | Fetch tất cả remotes  |
| `git fetch origin` | Fetch specific remote |

### Giả ích gì / Benefits

- **Specific**: Fetch specific remote
- **All**: Fetch tất cả remotes
- **Control**: Có control over fetch behavior

### So sánh chi tiết / Detailed Comparison

| Aspect       | `git fetch`                    | `git fetch origin`       |
| ------------ | ------------------------------ | ------------------------ |
| **Scope**    | Tất cả remotes                 | Chỉ origin remote        |
| **Default**  | Fetches all configured remotes | Fetches specified remote |
| **Use Case** | Sync với tất cả remotes        | Sync với specific remote |

### Ví dụ:

```bash
# Fetch all remotes
git fetch

# Output: Fetches origin, upstream, etc.

# Fetch specific remote
git fetch origin

# Output: Fetches only origin
```

### Best Practices:

1. **Use specific remote**: Sử dụng specific remote khi chỉ cần sync với một remote
2. **Use all remotes**: Sử dụng `git fetch` khi cần sync với tất cả remotes
3. **Understand the difference**: Hiểu sự khác biệt để dùng đúng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Fetch all remotes when only need one
git fetch
# Unnecessary network traffic

# ✅ Nên: Fetch specific remote when needed
git fetch origin
# Only fetch what's needed
```

---

## `git fetch --all` làm gì? / What does `git fetch --all` do?

### Mục đích / Purpose

Hiểu `git fetch --all` giúp bạn:

- Fetch tất cả remotes
- Sync với tất cả remote repositories
- Update tất cả tracking branches

### Khi nào dùng / When to Use

Sử dụng `git fetch --all` khi:

- Muốn sync với tất cả remotes
- Muốn update tất cả tracking branches
- Làm việc với multiple remote repositories

### Giả ích gì / Benefits

- **All**: Fetches tất cả remotes
- **Sync**: Sync với tất cả remote repositories
- **Update**: Updates tất cả tracking branches

### Định nghĩa / Definition

**`git fetch --all`** fetches tất cả remotes configured trong repository.

### Ví dụ:

```bash
# Fetch all remotes
git fetch --all

# Output: Fetches origin, upstream, etc.
# Updates all tracking branches
```

### Best Practices:

1. **Use when needed**: Sử dụng khi cần sync với tất cả remotes
2. **Understand network impact**: Hiểu network impact của fetching all remotes
3. **Use with --prune**: Sử dụng với `--prune` để clean up stale branches
4. **Monitor fetch time**: Monitor fetch time để avoid long waits

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Fetch all remotes unnecessarily
git fetch --all
# Unnecessary network traffic

# ✅ Nên: Fetch specific remote when needed
git fetch origin
# Only fetch what's needed
```

---

## `git pull` làm gì? / What does `git pull` do?

### Mục đích / Purpose

Hiểu `git pull` giúp bạn:

- Download và merge changes từ remote
- Sync local với remote trong một command
- Update local branches

### Khi nào dùng / When to Use

Sử dụng `git pull` khi:

- Muốn sync local với remote
- Muốn download và merge changes
- Muốn update local branch nhanh

### Giả ích gì / Benefits

- **Convenient**: Download và merge trong một command
- **Fast**: Update local branch nhanh
- **Simple**: Dễ sử dụng
- **Automatic**: Automatic merge

### Định nghĩa / Definition

**`git pull`** downloads changes từ remote repository và merges chúng vào current local branch. Nó là shorthand cho `git fetch` + `git merge`.

### Cách hoạt động / How It Works

```
Remote Repository (origin/main)
    ↓ git pull (fetch + merge)
    ↓
Local Repository (updated main)
```

### Ví dụ:

```bash
# Pull current branch
git pull

# Pull specific branch
git pull origin main

# Pull with rebase
git pull --rebase

# Pull specific remote and branch
git pull origin main
```

### Pull Options:

| Option              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `--rebase`          | Rebase local commits on top of remote    |
| `--no-rebase`       | Merge (default behavior)                 |
| `--ff-only`         | Only fast-forward if possible            |
| `--no-ff`           | Create merge commit even if fast-forward |
| `<remote>`          | Pull from specific remote                |
| `<remote> <branch>` | Pull specific branch                     |

### Best Practices:

1. **Review before pulling**: Review changes trước khi pull
2. **Use --rebase for linear history**: Sử dụng `--rebase` để maintain linear history
3. **Understand merge vs rebase**: Hiểu sự khác biệt giữa merge và rebase
4. **Handle conflicts**: Handle pull conflicts cẩn thận

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Pull without knowing what's coming
git pull
# Don't know what changes are coming

# ✅ Nên: Fetch first, review, then merge
git fetch
git log --oneline origin/main
# Review changes
git merge origin/main
# Know what's coming before merging
```

---

## `git pull --rebase` khác `git pull` như thế nào? / How is `git pull --rebase` different from `git pull`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git pull --rebase` và `git pull` giúp bạn:

- Chọn merge hoặc rebase khi pulling
- Maintain linear history
- Avoid unnecessary merge commits

### Khi nào dùng / When to Use

| Command             | Khi nào dùng             |
| ------------------- | ------------------------ |
| `git pull`          | Pull với merge (default) |
| `git pull --rebase` | Pull với rebase          |

### Giả ích gì / Benefits

- **Linear**: `--rebase` maintain linear history
- **Merge**: Default pull creates merge commit
- **Clean**: `--rebase` clean up commit history
- **Control**: Có control over pull behavior

### So sánh chi tiết / Detailed Comparison

| Aspect        | `git pull`           | `git pull --rebase`      |
| ------------- | -------------------- | ------------------------ |
| **Action**    | Fetch + merge        | Fetch + rebase           |
| **History**   | Creates merge commit | Maintains linear history |
| **Linearity** | Non-linear           | Linear                   |
| **Conflicts** | One-time             | Per commit               |

### Ví dụ:

```bash
# Pull with merge (default)
git pull origin main
# Creates merge commit

# Pull with rebase
git pull --rebase origin main
# Rebases local commits on top of remote
```

### Khi nào nên dùng `--rebase`? / When to Use `--rebase`?

- **Local commits**: Có local commits chưa được pushed
- **Linear history**: Muốn maintain linear history
- **Clean up**: Muốn clean up commit history
- **Before merging**: Rebase trước khi merge

### Best Practices:

1. **Use --rebase for linear history**: Sử dụng `--rebase` để maintain linear history
2. **Rebase local only**: Chỉ rebase local commits
3. **Handle conflicts**: Handle rebase conflicts cẩn thận
4. **Test after pulling**: Test sau khi pull

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Pull with rebase on pushed branches
git push origin main
git switch feature
git pull --rebase origin main
# Dangerous! Rebase pushed branch

# ✅ Nên: Pull with merge on pushed branches
git push origin main
git switch feature
git pull origin main
# Safe! Preserves history
```

---

## Sự khác biệt giữa fetch và pull? / What is the difference between fetch and pull?

### Mục đích / Purpose

Hiểu sự khác biệt giữa fetch và pull giúp bạn:

- Chọn đúng command để sync với remote
- Hiểu trade-offs giữa fetch và pull
- Control khi merge happens

### Khi nào dùng / When to Use

| Command     | Khi nào dùng                        |
| ----------- | ----------------------------------- |
| `git fetch` | Review changes trước khi merge      |
| `git pull`  | Download và merge trong một command |

### Giả ích gì / Benefits

- **Control**: Fetch cho phép review trước khi merge
- **Convenience**: Pull downloads và merges trong một command
- **Understanding**: Hiểu trade-offs giữa các methods

### So sánh chi tiết / Detailed Comparison

| Aspect      | Fetch               | Pull              |
| ----------- | ------------------- | ----------------- |
| **Action**  | Download only       | Download + merge  |
| **Merge**   | Manual              | Automatic         |
| **Control** | High                | Low               |
| **Steps**   | 2 (fetch + merge)   | 1                 |
| **Safety**  | Review before merge | Merge immediately |

### Ví dụ:

```bash
# Fetch (download only)
git fetch origin
# Changes downloaded, not merged yet

# Review changes
git log --oneline origin/main

# Merge manually
git merge origin/main

# Pull (download + merge)
git pull origin main
# Changes downloaded và merged in one command
```

### Khi nào nên dùng fetch? / When to Use Fetch

- **Review before merging**: Muốn review changes trước khi merge
- **Control merge**: Muốn control khi merge happens
- **Multiple remotes**: Làm việc với multiple remotes
- **Debug**: Debug remote sync issues

### Khi nào nên dùng pull? / When to Use Pull

- **Quick sync**: Muốn sync nhanh
- **Simple workflow**: Dùng simple workflow
- **No review needed**: Không cần review changes
- **Automatic merge**: Muốn automatic merge

### Best Practices:

1. **Fetch for review**: Sử dụng fetch khi cần review
2. **Pull for quick sync**: Sử dụng pull cho quick sync
3. **Understand the difference**: Hiểu sự khác biệt để dùng đúng
4. **Use --rebase for linear history**: Sử dụng `--rebase` để maintain linear history

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Always use pull without review
git pull
# Don't know what's coming

# ✅ Nên: Fetch first when needed
git fetch
git log --oneline origin/main
# Review changes
git merge origin/main
# Know what's coming before merging
```

---

## `git pull origin branchname` làm gì? / What does `git pull origin branchname` do?

### Mục đích / Purpose

Hiểu `git pull origin branchname` giúp bạn:

- Pull specific branch
- Update specific local branch
- Sync với remote branch

### Khi nào dùng / When to Use

Sử dụng `git pull origin branchname` khi:

- Muốn pull specific branch
- Muốn update specific local branch
- Muốn sync với specific remote branch

### Giả ích gì / Benefits

- **Specific**: Pull specific branch
- **Update**: Update specific local branch
- **Sync**: Sync với specific remote branch

### Định nghĩa / Definition

**`git pull origin branchname`** downloads và merges specific branch từ remote vào current local branch.

### Ví dụ:

```bash
# Pull specific branch
git pull origin main

# Pull specific branch with rebase
git pull --rebase origin main

# Pull specific branch from different remote
git pull upstream develop
```

### Best Practices:

1. **Specify branch explicitly**: Specify branch rõ ràng
2. **Use with --rebase**: Sử dụng `--rebase` để maintain linear history
3. **Check current branch**: Check current branch trước khi pull
4. **Handle conflicts**: Handle pull conflicts cẩn thận

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Pull without specifying branch
git pull
# May pull wrong branch

# ✅ Nên: Specify branch explicitly
git pull origin main
# Clear which branch to pull
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git fetch`** downloads changes từ remote nhưng không merge
2. **`git fetch origin`** fetches specific remote
3. **`git fetch --all`** fetches tất cả remotes
4. **`git pull`** downloads và merges changes trong một command
5. **`git pull --rebase`** rebases local commits on top of remote
6. **Fetch** cho phép review trước khi merge
7. **Pull** là automatic merge
8. **Sự khác biệt**: Fetch = download, Pull = download + merge
9. **Use fetch** khi cần review trước khi merge
10. **Use pull** cho quick sync

### Commands Reference:

| Command                  | Purpose                          |
| ------------------------ | -------------------------------- |
| `git fetch`              | Fetch tất cả remotes             |
| `git fetch origin`       | Fetch specific remote            |
| `git fetch --all`        | Fetch tất cả remotes             |
| `git fetch --prune`      | Fetch và clean up stale branches |
| `git fetch --tags`       | Fetch tất cả tags                |
| `git pull`               | Pull (fetch + merge)             |
| `git pull --rebase`      | Pull với rebase                  |
| `git pull --no-rebase`   | Pull với merge (default)         |
| `git pull origin branch` | Pull specific branch             |

### Best Practices:

1. **Fetch before merging**: Luôn fetch trước khi merge
2. **Review changes**: Review changes trước khi merge
3. **Use --rebase for linear history**: Sử dụng `--rebase` để maintain linear history
4. **Use --prune**: Sử dụng `--prune` để clean up stale branches
5. **Handle conflicts**: Handle conflicts cẩn thận
6. **Check current branch**: Check current branch trước khi operations
7. **Use specific remote/branch**: Specify remote và branch rõ ràng
8. **Understand the difference**: Hiểu sự khác biệt giữa fetch và pull

### Fetch vs Pull Decision Tree:

```
Need to review changes before merging?
├─ Yes → Use fetch (control)
└─ No → Use pull (convenience)
   Need linear history?
   ├─ Yes → Use pull --rebase
   └─ No → Use pull (merge)
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
