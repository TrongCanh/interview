# 19. Git Stash / Git Stash

## Tổng quan về Git Stash / Git Stash Overview

### Mục đích / Purpose

**Git Stash** là một tính năng mạnh mẽ cho phép bạn save current work và switch branches mà không cần commit changes. Nó giống như "save game" cho Git.

**Mục đích chính:**

- Hiểu Git stash là gì và cách nó hoạt động
- Biết cách stash và unstash changes
- Hiểu các options của `git stash`
- Biết cách manage multiple stashes
- Nắm được best practices cho stashing

### Khi nào cần hiểu về Git Stash / When to Use

Hiểu về Git Stash là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn switch branches mà không cần commit
- Muốn save work tạm thời
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Làm việc với multiple features song song

### Giả ích gì / Benefits

**Lợi ích:**

- **Save Work**: Save work tạm thời
- **Switch Branches**: Switch branches mà không cần commit
- **Multiple Stashes**: Có thể stash nhiều sets của changes
- **Context Switching**: Switch contexts dễ dàng
- **Clean Working Directory**: Giữ working directory clean

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                        | Nhược điểm (Cons)                            |
| ------------------------------------- | -------------------------------------------- |
| Temporary - save work tạm thời        | Complexity - có thể phức tạp                 |
| Flexible - có thể stash nhiều changes | Conflicts - có thể gây conflicts khi unstash |
| Clean - giữ working directory clean   | Forgetting - có thể quên unstash             |
| Context - switch contexts dễ dàng     | Limited - stash chỉ lưu trữ trong repo       |

---

## `git stash` làm gì? / What does `git stash` do?

### Mục đích / Purpose

Hiểu `git stash` giúp bạn:

- Save current work tạm thời
- Switch branches mà không cần commit
- Clean working directory

### Khi nào dùng / When to Use

Sử dụng `git stash` khi:

- Muốn switch branches mà không cần commit
- Muốn save work tạm thời
- Muốn clean working directory
- Muốn work trên emergency bug

### Giả ích gì / Benefits

- **Save**: Save work tạm thời
- **Switch**: Switch branches dễ dàng
- **Clean**: Giữ working directory clean
- **Emergency**: Handle emergency bugs

### Định nghĩa / Definition

**`git stash`** save current working directory changes (bao gồm tracked và untracked files, tùy thuộc vào options) vào stash stack. Stash được lưu trữ trong Git repository và có thể được restore sau đó.

### Cách hoạt động / How It Works

```
Working Directory (changes)
    ↓ git stash
    ↓
Stash Stack (saved changes)
    ↓
Clean Working Directory

Working Directory (new context)
    ↓ git stash pop
    ↓
Working Directory (restored changes)
```

### Ví dụ:

```bash
# Make changes
echo "new content" >> file.txt
echo "new file" > newfile.txt

# Stash changes
git stash

# Working directory is clean
ls
# No newfile.txt, file.txt is back to original

# Switch branches
git checkout other-branch

# Restore stashed changes
git stash pop

# Changes are restored
ls
# Shows newfile.txt, file.txt has new content
```

### Stash Contents:

| Content           | Description                           |
| ----------------- | ------------------------------------- |
| Tracked files     | Files đã được tracked bởi Git         |
| Untracked files   | Files chưa được tracked (tùy options) |
| Index (staged)    | Changes đã được staged                |
| Working directory | Unstaged changes                      |

### Best Practices:

1. **Use descriptive messages**: Sử dụng descriptive messages cho stashes
2. **Stash before switching**: Stash trước khi switch branches
3. **Review before stashing**: Review changes trước khi stash
4. **Use selective stashing**: Sử dụng selective stashing khi cần
5. **Clean up regularly**: Clean up stashes thường xuyên

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Stash without reviewing
git stash
# Don't know what's being stashed

# ✅ Nên: Review before stashing
git status
git diff
git stash
# Know what's being stashed
```

---

## `git stash save "message"` khác `git stash` như thế nào? / How is `git stash save "message"` different from `git stash`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git stash save "message"` và `git stash` giúp bạn:

- Add message cho stash
- Document stash contents
- Identify stashes dễ dàng hơn

### Khi nào dùng / When to Use

| Command                    | Khi nào dùng              |
| -------------------------- | ------------------------- |
| `git stash`                | Stash với default message |
| `git stash save "message"` | Stash với custom message  |

### Giả ích gì / Benefits

- **Documentation**: Document stash contents
- **Identification**: Identify stashes dễ dàng hơn
- **Clarity**: Rõ ràng về stash contents

### So sánh chi tiết / Detailed Comparison

| Aspect            | `git stash`     | `git stash save "message"` |
| ----------------- | --------------- | -------------------------- |
| **Message**       | Default message | Custom message             |
| **Clarity**       | Less clear      | More clear                 |
| **Documentation** | Limited         | Better                     |
| **Use Case**      | Quick stash     | Documented stash           |

### Ví dụ:

```bash
# Stash with default message
git stash
# Stash message is like: "WIP on branchname"

# Stash with custom message
git stash save "Add user authentication feature"
# Stash message is: "Add user authentication feature"

# List stashes
git stash list

# Output:
# stash@{0}: WIP on main
# stash@{1}: Add user authentication feature
```

### Best Practices:

1. **Use descriptive messages**: Sử dụng descriptive messages
2. **Document work in progress**: Document work đang làm
3. **Use save for documentation**: Sử dụng `save` để document
4. **Keep messages concise**: Giữ messages ngắn gọn nhưng rõ ràng
5. **Include context**: Bao gồm context trong message

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use default message
git stash
# Hard to identify what's in stash

# ✅ Nên: Use descriptive message
git stash save "Add user authentication feature"
# Easy to identify what's in stash
```

---

## `git stash list` hiển thị gì? / What does `git stash list` display?

### Mục đích / Purpose

Hiểu `git stash list` giúp bạn:

- Xem tất cả stashes
- Hiểu stash contents
- Identify stashes
- Manage stash stack

### Khi nào dùng / When to Use

Sử dụng `git stash list` khi:

- Muốn xem tất cả stashes
- Muốn identify stash contents
- Muốn manage stash stack
- Muốn find specific stash

### Giả ích gì / Benefits

- **List**: Xem tất cả stashes
- **Identify**: Identify stashes
- **Manage**: Manage stash stack
- **Contents**: Hiểu stash contents

### Định nghĩa / Definition

**`git stash list`** hiển thị tất cả stashes trong stash stack với thông tin như stash name, branch, commit hash, và message.

### Định dạng output / Output Format

| Column        | Description                     |
| ------------- | ------------------------------- |
| `stash@{n}`   | Stash reference number          |
| `branchname`  | Branch stash được tạo từ        |
| `commit hash` | Commit hash của stash           |
| `message`     | Stash message                   |
| `files`       | Files trong stash (tùy options) |

### Ví dụ:

```bash
# Create multiple stashes
echo "work1" > file1.txt
git add file1.txt
git commit -m "Add file1"
git stash save "Work on file1"

echo "work2" > file2.txt
git add file2.txt
git commit -m "Add file2"
git stash save "Work on file2"

# List all stashes
git stash list

# Output:
# stash@{0}: On main: Work on file2
# stash@{1}: On main: Work on file1
```

### Stash Reference Syntax:

| Syntax        | Description                       |
| ------------- | --------------------------------- |
| `stash@{n}`   | Reference nth stash (most recent) |
| `stash@{n}^m` | Reference mth stash from end      |
| `stash@{n}~m` | Reference mth stash from start    |

### Best Practices:

1. **Use list to identify**: Sử dụng list để identify stashes
2. **Use descriptive messages**: Sử dụng descriptive messages
3. **Clean up old stashes**: Xóa old stashes
4. **Use references**: Sử dụng references để access specific stashes
5. **Understand stack order**: Hiểu stack order (newest = 0)

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Ignore stashes
git stash list
# Don't know what's in stashes

# ✅ Nên: Review stashes regularly
git stash list
# Know what's in stashes
```

---

## `git stash pop` khác `git stash apply` như thế nào? / How is `git stash pop` different from `git stash apply`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `git stash pop` và `git stash apply` giúp bạn:

- Chọn đúng method để restore stash
- Hiểu impact trên stash stack
- Manage stashes hiệu quả hơn

### Khi nào dùng / When to Use

| Command           | Khi nào dùng            |
| ----------------- | ----------------------- |
| `git stash pop`   | Restore và remove stash |
| `git stash apply` | Restore nhưng giữ stash |

### Giả ích gì / Benefits

- **Clean**: `pop` removes stash sau khi restore
- **Keep**: `apply` giữ stash trong stack
- **Flexibility**: Có nhiều options để restore
- **Management**: Manage stash stack hiệu quả hơn

### So sánh chi tiết / Detailed Comparison

| Aspect          | `git stash pop`   | `git stash apply` |
| --------------- | ----------------- | ----------------- |
| **Action**      | Restore và remove | Restore nhưng giữ |
| **Stash Stack** | Removes stash     | Giữ stash         |
| **Use Case**    | One-time restore  | Multiple restores |
| **Clean up**    | Automatic         | Manual            |

### Ví dụ:

```bash
# Create stash
echo "content" > file.txt
git stash save "Work in progress"

# Restore with pop (removes stash)
git stash pop
# Changes are restored, stash is removed

# Create another stash
echo "more content" >> file.txt
git stash save "More work"

# Restore with apply (keeps stash)
git stash apply stash@{0}
# Changes are restored, stash is kept
```

### Best Practices:

1. **Use pop for final restore**: Sử dụng `pop` cho final restore
2. **Use apply for multiple restores**: Sử dụng `apply` cho multiple restores
3. **Clean up old stashes**: Xóa old stashes
4. **Understand the difference**: Hiểu sự khác biệt để dùng đúng
5. **Review before restoring**: Review stash trước khi restore

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use pop when need multiple restores
git stash pop
# Can't restore again

# ✅ Nên: Use apply when need multiple restores
git stash apply stash@{0}
# Can restore multiple times
```

---

## `git stash drop` làm gì? / What does `git stash drop` do?

### Mục đích / Purpose

Hiểu `git stash drop` giúp bạn:

- Remove stash từ stack
- Clean up stash stack
- Remove unwanted stashes

### Khi nào dùng / When to Use

Sử dụng `git stash drop` khi:

- Muốn remove stash từ stack
- Muốn clean up old stashes
- Muốn remove unwanted stashes
- Muốn manage stash stack

### Giả ích gì / Benefits

- **Remove**: Remove stashes từ stack
- **Clean**: Clean up stash stack
- **Manage**: Manage stash stack hiệu quả hơn

### Định nghĩa / Definition

**`git stash drop`** (hoặc `git stash drop stash@{n}`) remove một stash từ stash stack mà không restore changes.

### Ví dụ:

```bash
# Create multiple stashes
echo "work1" > file1.txt
git stash save "Work 1"

echo "work2" > file2.txt
git stash save "Work 2"

# List stashes
git stash list

# Output:
# stash@{0}: Work 2
# stash@{1}: Work 1

# Drop specific stash
git stash drop stash@{1}

# List stashes again
git stash list

# Output:
# stash@{0}: Work 2
# (stash@{1} is removed)

# Drop most recent stash
git stash drop
# Removes stash@{0}
```

### Best Practices:

1. **Drop old stashes**: Xóa old stashes
2. **Drop unwanted stashes**: Xóa unwanted stashes
3. **Use list to identify**: Sử dụng list để identify stashes
4. **Clean up regularly**: Clean up stashes thường xuyên
5. **Use drop with reference**: Sử dụng reference để drop specific stash

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Drop without checking
git stash drop
# Don't know what's being dropped

# ✅ Nên: Check before dropping
git stash list
# Know what's being dropped
git stash drop stash@{0}
# Drop specific stash
```

---

## `git stash clear` làm gì? / What does `git stash clear` do?

### Mục đích / Purpose

Hiểu `git stash clear` giúp bạn:

- Remove tất cả stashes
- Clean up stash stack hoàn toàn
- Reset stash stack

### Khi nào dùng / When to Use

Sử dụng `git stash clear` khi:

- Muốn remove tất cả stashes
- Muốn clean up stash stack hoàn toàn
- Muốn reset stash stack
- Muốn start fresh stash stack

### Giả ích gì / Benefits

- **Clean**: Clean up stash stack hoàn toàn
- **Reset**: Reset stash stack
- **Fresh**: Start fresh stash stack
- **Simple**: Một command để clean up

### Ví dụ:

```bash
# Create multiple stashes
echo "work1" > file1.txt
git stash save "Work 1"

echo "work2" > file2.txt
git stash save "Work 2"

# List stashes
git stash list

# Output:
# stash@{0}: Work 2
# stash@{1}: Work 1

# Clear all stashes
git stash clear

# List stashes again
git stash list

# Output:
# (empty - no stashes)
```

### Best Practices:

1. **Use with caution**: Cẩn thận khi dùng vì xóa tất cả stashes
2. **List before clearing**: List stashes trước khi clear
3. **Use drop for specific**: Sử dụng `drop` cho specific stashes
4. **Clear only when needed**: Chỉ clear khi cần
5. **Understand impact**: Hiểu impact trước khi clear

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Clear without checking
git stash clear
# Don't know what's being cleared

# ✅ Nên: Check before clearing
git stash list
# Know what's being cleared
git stash clear
# Clear only when needed
```

---

## `git stash branch` làm gì? / What does `git stash branch` do?

### Mục đích / Purpose

Hiểu `git stash branch` giúp bạn:

- Stash changes cho specific branch
- Switch contexts dễ dàng hơn
- Manage branch-specific stashes

### Khi nào dùng / When to Use

Sử dụng `git stash branch` khi:

- Muốn stash changes cho specific branch
- Muốn save work cho branch khác
- Muốn switch contexts dễ dàng hơn
- Muốn manage branch-specific work

### Giả ích gì / Benefits

- **Branch-specific**: Stash changes cho specific branch
- **Context**: Save work cho specific context
- **Easy**: Easy để restore branch-specific work
- **Organized**: Organize stashes theo branch

### Ví dụ:

```bash
# Switch to feature branch
git checkout feature

# Make changes on feature branch
echo "feature content" > feature.txt

# Switch back to main
git checkout main

# Stash feature branch changes
git stash branch feature

# List stashes
git stash list

# Output:
# stash@{0}: On feature: feature content
```

### Best Practices:

1. **Use for branch switching**: Sử dụng khi switching branches
2. **Use descriptive messages**: Sử dụng descriptive messages
3. **Clean up branch stashes**: Clean up branch stashes thường xuyên
4. **List before applying**: List stashes trước khi apply
5. **Understand branch context**: Hiểu branch context

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Stash without specifying branch
git stash
# Hard to know which branch

# ✅ Nên: Specify branch when needed
git stash branch feature
# Clear which branch
```

---

## Cách stash untracked files? / How to stash untracked files?

### Mục đích / Purpose

Biết cách stash untracked files giúp bạn:

- Stash tất cả files bao gồm untracked
- Clean working directory hoàn toàn
- Save toàn bộ work

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn stash tất cả files
- Muốn clean working directory hoàn toàn
- Muốn save untracked files
- Muốn backup toàn bộ work

### Giả ích gì / Benefits

- **Complete**: Stash tất cả files
- **Clean**: Clean working directory hoàn toàn
- **Backup**: Backup toàn bộ work
- **Convenience**: Một command để stash tất cả

### Cách thực hiện / How to Do It

#### Method 1: Using `-u` option

```bash
# Stash including untracked files
git stash -u

# Or use --include-untracked
git stash --include-untracked
```

#### Method 2: Adding all files

```bash
# Add all files including untracked
git add -A

# Stash
git stash
```

### Ví dụ:

```bash
# Create tracked and untracked files
echo "tracked content" > tracked.txt
echo "untracked content" > untracked.txt

# Stash including untracked
git stash -u

# List stashes
git stash list

# Output shows both files are stashed
```

### Options:

| Option                | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `-u`                  | Include untracked files                  |
| `--include-untracked` | Include untracked files                  |
| `-a`                  | Stash all changes (default tracked only) |

### Best Practices:

1. **Use -u when needed**: Sử dụng `-u` khi cần untracked files
2. **Review before stashing**: Review changes trước khi stash
3. **Clean up regularly**: Clean up stashes thường xuyên
4. **Understand what's stashed**: Hiểu những gì đang được stashed
5. **Test after restoring**: Test sau khi restore

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Stash without knowing
git stash -u
# Don't know what's being stashed

# ✅ Nên: Review before stashing
git status
git stash -u
# Know what's being stashed
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git stash`** save current work tạm thời
2. **`git stash save "message"`** stash với custom message
3. **`git stash list`** hiển thị tất cả stashes
4. **`git stash pop`** restore và remove stash
5. **`git stash apply`** restore nhưng giữ stash
6. **`git stash drop`** remove stash từ stack
7. **`git stash clear`** remove tất cả stashes
8. **`git stash branch`** stash changes cho specific branch
9. **`-u` option** include untracked files
10. **Stash reference** `stash@{n}` để access specific stash

### Commands Reference:

| Command                         | Purpose                           |
| ------------------------------- | --------------------------------- |
| `git stash`                     | Stash current work                |
| `git stash save "message"`      | Stash với custom message          |
| `git stash list`                | List tất cả stashes               |
| `git stash pop`                 | Restore và remove stash           |
| `git stash apply`               | Restore nhưng giữ stash           |
| `git stash apply stash@{n}`     | Restore specific stash            |
| `git stash drop`                | Remove stash                      |
| `git stash drop stash@{n}`      | Remove specific stash             |
| `git stash clear`               | Remove tất cả stashes             |
| `git stash branch`              | Stash changes cho specific branch |
| `git stash -u`                  | Include untracked files           |
| `git stash --include-untracked` | Include untracked files           |

### Best Practices:

1. **Use descriptive messages**: Sử dụng descriptive messages
2. **Stash before switching**: Stash trước khi switch branches
3. **Review before stashing**: Review changes trước khi stash
4. **Clean up regularly**: Clean up stashes thường xuyên
5. **Use pop for final restore**: Sử dụng `pop` cho final restore
6. **Use apply for multiple restores**: Sử dụng `apply` cho multiple restores
7. **Drop old stashes**: Xóa old stashes
8. **Use -u for untracked**: Sử dụng `-u` khi cần untracked files
9. **List before operations**: List stashes trước khi operations
10. **Understand stash stack**: Hiểu stash stack order

### Stash Workflow:

```
1. Make changes
   ↓
2. Review changes
   ↓
3. Stash with message
   ↓
4. Switch context (branch/bug fix)
   ↓
5. Work in new context
   ↓
6. Restore stash (pop or apply)
   ↓
7. Continue work
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
