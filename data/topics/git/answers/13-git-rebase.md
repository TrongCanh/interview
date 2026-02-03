# 13. Git Rebase / Git Rebase

## Tổng quan về Git Rebase / Git Rebase Overview

### Mục đích / Purpose

**Git Rebase** là một trong những tính năng mạnh mẽ nhất của Git, cho phép bạn integrate changes từ một branch vào branch khác bằng cách reapply commits.

**Mục đích chính:**

- Hiểu Git rebase là gì và cách nó hoạt động
- Biết sự khác biệt giữa rebase và merge
- Hiểu interactive rebase
- Biết cách handle rebase conflicts
- Nắm được best practices cho rebasing

### Khi nào cần hiểu về Git Rebase / When to Use

Hiểu về Git Rebase là cần thiết khi:

- Muốn maintain linear history
- Chuẩn bị cho phỏng vấn về Git nâng cao
- Làm việc với complex branching scenarios
- Muốn clean up commit history
- Làm việc với team sử dụng rebase workflow

### Giả ích gì / Benefits

**Lợi ích:**

- **Linear History**: Maintain linear commit history
- **Clean**: Clean up commit history
- **Flexible**: Reorder, edit, squash commits
- **Integration**: Integrate changes hiệu quả hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                               | Nhược điểm (Cons)                    |
| -------------------------------------------- | ------------------------------------ |
| Linear - maintain linear history             | Dangerous - có thể rewrite history   |
| Clean - clean up commit history              | Conflicts - có thể gây conflicts     |
| Flexible - reorder, edit, squash commits     | Complex - learning curve cao         |
| Integration - integrate changes hiệu quả hơn | Risky - nguy hiểm cho shared history |

---

## `git rebase branchname` làm gì? / What does `git rebase branchname` do?

### Mục đích / Purpose

Hiểu `git rebase branchname` giúp bạn:

- Integrate changes từ branch khác
- Maintain linear history
- Hiểu cách rebase hoạt động

### Khi nào dùng / When to Use

Sử dụng `git rebase branchname` khi:

- Muốn integrate changes từ branch khác
- Muốn maintain linear history
- Muốn reapply commits trên top của branch khác

### Giả ích gì / Benefits

- **Linear**: Maintain linear commit history
- **Clean**: Clean up commit history
- **Integration**: Integrate changes hiệu quả hơn

### Định nghĩa / Definition

**`git rebase branchname`** reapply commits của current branch trên top của target branch. Nó tạo linear history bằng cách move commits của current branch sau commits của target branch.

### Cách hoạt động / How It Works

```
Before rebase:
A -> B -> C (main)
    \-> D -> E (feature)

After rebase feature onto main:
A -> B -> C -> D' -> E' (main)
```

### Ví dụ:

```bash
# Create main branch with commits
git switch main
echo "main1" > main.txt
git add main.txt
git commit -m "Add main1"

echo "main2" >> main.txt
git add main.txt
git commit -m "Add main2"

# Create feature branch
git switch -c feature

echo "feature1" > feature.txt
git add feature.txt
git commit -m "Add feature1"

echo "feature2" >> feature.txt
git add feature.txt
git commit -m "Add feature2"

# Rebase feature onto main
git switch feature
git rebase main

# Result: feature commits are reapplied after main commits
```

### Best Practices:

1. **Use for linear history**: Sử dụng để maintain linear history
2. **Rebase local branches**: Chỉ rebase local branches
3. **Handle conflicts**: Handle rebase conflicts cẩn thận
4. **Understand implications**: Hiểu implications của rebasing

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase pushed branches
git push origin main
git switch feature
git rebase main
git push -f origin feature
# Dangerous! Rewrites shared history

# ✅ Nên: Rebase only local branches
git switch feature
git rebase main
# Safe! Only local history is rewritten
```

---

## Interactive rebase (`git rebase -i`) là gì? / What is interactive rebase (`git rebase -i`)?

### Mục đích / Purpose

Hiểu interactive rebase giúp bạn:

- Reorder commits
- Edit commits
- Squash commits
- Split commits
- Clean up commit history

### Khi nào dùng / When to Use

Sử dụng `git rebase -i` khi:

- Muốn reorder commits
- Muốn edit commit messages
- Muốn squash commits
- Muốn split commits
- Muốn clean up commit history

### Giả ích gì / Benefits

- **Flexible**: Reorder, edit, squash commits
- **Clean**: Clean up commit history
- **Control**: Có full control over commits

### Định nghĩa / Definition

**Interactive rebase** (`git rebase -i`) cho phép bạn interactively modify commits trước khi reapply chúng. Bạn có thể reorder, edit, squash, split, hoặc drop commits.

### Commands trong interactive rebase / Commands in Interactive Rebase

| Command  | Action        | Description                                           |
| -------- | ------------- | ----------------------------------------------------- |
| `pick`   | Use commit    | Sử dụng commit như bình thường                        |
| `reword` | Edit message  | Sửa commit message                                    |
| `edit`   | Edit commit   | Sửa commit (changes và message)                       |
| `squash` | Merge commits | Merge commits vào commit trước đó                     |
| `fixup`  | Merge quietly | Merge commits vào commit trước đó (không giữ message) |
| `exec`   | Run command   | Chạy command                                          |
| `drop`   | Drop commit   | Bỏ commit                                             |

### Ví dụ:

```bash
# Create commits
echo "commit1" > file.txt
git add file.txt
git commit -m "Add commit1"

echo "commit2" >> file.txt
git add file.txt
git commit -m "Add commit2"

echo "commit3" >> file.txt
git add file.txt
git commit -m "Add commit3"

# Interactive rebase to squash commits
git rebase -i HEAD~3

# Git opens editor with:
# pick abc1234 Add commit1
# pick def4567 Add commit2
# pick ghi8901 Add commit3

# Edit to squash:
# pick abc1234 Add commit1
# squash def4567 Add commit2
# squash ghi8901 Add commit3

# Save and close editor
# Git opens editor to edit combined commit message
```

### Use Cases:

#### 1. Reorder Commits

```bash
# Interactive rebase
git rebase -i HEAD~3

# Edit to reorder:
# pick ghi8901 Add commit3
# pick abc1234 Add commit1
# pick def4567 Add commit2
```

#### 2. Edit Commit Message

```bash
# Interactive rebase
git rebase -i HEAD~3

# Edit to reword:
# reword abc1234 Add commit1
# pick def4567 Add commit2
# pick ghi8901 Add commit3
```

#### 3. Squash Commits

```bash
# Interactive rebase
git rebase -i HEAD~3

# Edit to squash:
# pick abc1234 Add commit1
# squash def4567 Add commit2
# squash ghi8901 Add commit3
```

### Best Practices:

1. **Use for cleanup**: Sử dụng để cleanup commit history
2. **Rebase local branches**: Chỉ rebase local branches
3. **Test after rebase**: Test sau khi rebase
4. **Understand implications**: Hiểu implications của rebasing

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Interactive rebase pushed branches
git push origin main
git switch feature
git rebase -i HEAD~5
git push -f origin feature
# Dangerous! Rewrites shared history

# ✅ Nên: Interactive rebase only local branches
git switch feature
git rebase -i HEAD~5
# Safe! Only local history is rewritten
```

---

## Rebase khác merge như thế nào? / How is rebase different from merge?

### Mục đích / Purpose

Hiểu sự khác biệt giữa rebase và merge giúp bạn:

- Chọn đúng method để integrate changes
- Hiểu impact trên commit history
- Avoid rewriting history khi không cần

### Khi nào dùng / When to Use

| Method       | Khi nào dùng                          |
| ------------ | ------------------------------------- |
| `git merge`  | Integrate changes với merge commit    |
| `git rebase` | Integrate changes với reapply commits |

### Giả ích gì / Benefits

- **Linear**: Rebase maintain linear history
- **Preserves**: Merge preserves history
- **Understanding**: Hiểu khi nào nên dùng mỗi method

### So sánh chi tiết / Detailed Comparison

| Aspect        | Merge                  | Rebase              |
| ------------- | ---------------------- | ------------------- |
| **Action**    | Creates merge commit   | Reapplies commits   |
| **History**   | Preserves history      | Rewrites history    |
| **Commits**   | Creates merge commit   | Moves commits       |
| **Linearity** | Non-linear (branching) | Linear              |
| **Use case**  | Public history         | Local history       |
| **Safety**    | Safe                   | Dangerous if pushed |

### Visualization:

```
Merge:
A -> B -> C (main)
    \-> D -> E (feature)
    ↓ merge
A -> B -> C -> M (merge commit) <- D -> E

Rebase:
A -> B -> C (main)
    \-> D -> E (feature)
    ↓ rebase
A -> B -> C -> D' -> E' (main)
```

### Ví dụ:

```bash
# Create main branch with commits
git switch main
echo "main1" > main.txt
git add main.txt
git commit -m "Add main1"

# Create feature branch
git switch -c feature
echo "feature1" > feature.txt
git add feature.txt
git commit -m "Add feature1"

# Merge (preserves history)
git switch main
git merge feature
# Creates merge commit

# Reset for rebase example
git reset --hard HEAD~1

# Rebase (rewrites history)
git switch feature
git rebase main
# Moves feature commits after main commits
```

### Khi nào nên dùng merge? / When to Use Merge

- **Public history**: History đã được shared
- **Team collaboration**: Làm việc với team
- **Preserve history**: Muốn preserve branch history
- **Complex merges**: Complex merge scenarios

### Khi nào nên dùng rebase? / When to Use Rebase

- **Local history**: Chỉ local commits
- **Linear history**: Muốn maintain linear history
- **Clean up**: Muốn clean up commit history
- **Before merging**: Rebase trước khi merge

### Best Practices:

1. **Rebase local, merge pushed**: Rebase local, merge pushed
2. **Use rebase for linear history**: Sử dụng rebase để maintain linear history
3. **Use merge for public history**: Sử dụng merge cho public history
4. **Understand implications**: Hiểu implications của mỗi method

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase pushed branches
git push origin main
git switch feature
git rebase main
git push -f origin feature
# Dangerous! Rewrites shared history

# ✅ Nên: Merge pushed branches
git push origin main
git switch feature
git merge main
git push origin feature
# Safe! Preserves history
```

---

## `git rebase --onto` làm gì? / What does `git rebase --onto` do?

### Mục đích / Purpose

Hiểu `git rebase --onto` giúp bạn:

- Rebase commits sang một branch khác
- Skip commits
- Rebase specific commits

### Khi nào dùng / When to Use

Sử dụng `git rebase --onto` khi:

- Muốn rebase commits sang một branch khác
- Muốn skip commits
- Muốn rebase specific commits

### Giả ích gì / Benefits

- **Flexible**: Rebase commits sang branch khác
- **Selective**: Rebase specific commits
- **Skip**: Skip commits khi cần

### Định nghĩa / Definition

**`git rebase --onto`** rebase commits của current branch lên một branch khác, có thể skip một số commits.

### Ví dụ:

```bash
# Create main branch with commits
git switch main
echo "main1" > main.txt
git add main.txt
git commit -m "Add main1"

echo "main2" >> main.txt
git add main.txt
git commit -m "Add main2"

# Create feature branch
git switch -c feature

echo "feature1" > feature.txt
git add feature.txt
git commit -m "Add feature1"

echo "feature2" >> feature.txt
git add feature.txt
git commit -m "Add feature2"

# Rebase feature onto main, skipping first commit
git rebase --onto main HEAD~2

# Result: Only feature2 is rebased onto main
```

### Use Cases:

#### 1. Rebase onto Different Branch

```bash
# Rebase feature onto develop
git rebase --onto develop feature
```

#### 2. Skip Commits

```bash
# Rebase skipping first 2 commits
git rebase --onto main HEAD~2
```

#### 3. Rebase Specific Range

```bash
# Rebase specific commit range
git rebase --onto main abc1234..def4567
```

### Best Practices:

1. **Use for specific scenarios**: Sử dụng cho specific scenarios
2. **Understand what's being rebased**: Hiểu những gì đang được rebased
3. **Test after rebase**: Test sau khi rebase
4. **Use with caution**: Cẩn thận khi dùng `--onto`

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase without understanding
git rebase --onto main HEAD~2
# May skip important commits

# ✅ Nên: Understand what's being rebased
git log --oneline HEAD~3
# Review commits before rebasing
git rebase --onto main HEAD~2
```

---

## Rebase conflicts khác merge conflicts như thế nào? / How are rebase conflicts different from merge conflicts?

### Mục đích / Purpose

Hiểu sự khác biệt giữa rebase conflicts và merge conflicts giúp bạn:

- Handle conflicts hiệu quả hơn
- Hiểu khi nào xảy ra conflicts
- Resolve conflicts đúng cách

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Debug rebase conflicts
- Giải thích Git conflict resolution

### Giả ích gì / Benefits

- **Understanding**: Hiểu rõ conflicts
- **Resolution**: Resolve conflicts hiệu quả hơn
- **Prevention**: Tránh conflicts khi có thể

### So sánh chi tiết / Detailed Comparison

| Aspect         | Merge Conflicts        | Rebase Conflicts                 |
| -------------- | ---------------------- | -------------------------------- |
| **When**       | During merge operation | During each commit reapplication |
| **Frequency**  | Once                   | Multiple times (per commit)      |
| **Resolution** | Resolve once           | Resolve multiple times           |
| **History**    | Creates merge commit   | Rewrites commits                 |

### Ví dụ:

```bash
# Create main branch with conflicting change
git switch main
echo "main content" > file.txt
git add file.txt
git commit -m "Add main content"

# Create feature branch with conflicting change
git switch -c feature
echo "feature content" > file.txt
git add file.txt
git commit -m "Add feature content"

# Merge conflict (occurs once)
git switch main
git merge feature
# Conflict occurs once, resolve once

# Reset for rebase example
git reset --hard HEAD~1

# Rebase conflict (occurs per commit)
git switch feature
git rebase main
# Conflict occurs for each conflicting commit
```

### Cách handle rebase conflicts / How to Handle Rebase Conflicts

```bash
# Rebase with conflicts
git rebase main

# Git stops at first conflict
# Resolve conflict
git add file.txt

# Continue rebase
git rebase --continue

# If more conflicts, repeat process
# Or abort rebase
git rebase --abort
```

### Best Practices:

1. **Resolve all conflicts**: Resolve tất cả conflicts
2. **Test after resolution**: Test sau khi resolve
3. **Use --continue**: Sử dụng `--continue` để continue rebase
4. **Use --abort**: Sử dụng `--abort` để abort rebase
5. **Understand the process**: Hiểu process của rebase conflicts

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Skip conflicts without resolving
git rebase main
# Conflict occurs
git rebase --skip
# Skips commit, may lose changes

# ✅ Nên: Resolve conflicts properly
git rebase main
# Conflict occurs
# Resolve conflict
git add file.txt
git rebase --continue
# Properly resolves conflict
```

---

## `git rebase --continue`, `--abort`, `--skip` làm gì? / What do `git rebase --continue`, `--abort`, `--skip` do?

### Mục đích / Purpose

Hiểu các options của `git rebase` giúp bạn:

- Continue rebase sau khi resolve conflicts
- Abort rebase khi cần
- Skip commits khi cần

### Khi nào dùng / When to Use

| Option       | Khi nào dùng                                |
| ------------ | ------------------------------------------- |
| `--continue` | Continue rebase sau khi resolve conflicts   |
| `--abort`    | Abort rebase và quay về trạng thái trước đó |
| `--skip`     | Skip commit hiện tại và tiếp tục            |

### Giả ích gì / Benefits

- **Continue**: Continue rebase sau khi resolve conflicts
- **Abort**: Abort rebase khi cần
- **Skip**: Skip commits khi cần

### Định nghĩa / Definition

| Option       | Purpose                                     |
| ------------ | ------------------------------------------- |
| `--continue` | Continue rebase sau khi resolve conflicts   |
| `--abort`    | Abort rebase và quay về trạng thái trước đó |
| `--skip`     | Skip commit hiện tại và tiếp tục            |

### Ví dụ:

```bash
# Rebase with conflicts
git rebase main

# Conflict occurs
# Resolve conflict
git add file.txt

# Continue rebase
git rebase --continue

# If another conflict occurs, repeat process
# Or abort rebase
git rebase --abort

# Or skip current commit
git rebase --skip
```

### Workflow:

```
1. Start rebase
   ↓
2. Conflict occurs
   ↓
3. Resolve conflict
   ↓
4. git add
   ↓
5. git rebase --continue
   ↓
6. Repeat if more conflicts
   ↓
7. Or git rebase --abort
   ↓
8. Or git rebase --skip
```

### Best Practices:

1. **Use --continue**: Sử dụng `--continue` sau khi resolve conflicts
2. **Use --abort**: Sử dụng `--abort` khi cần abort
3. **Use --skip**: Sử dụng `--skip` khi cần skip commit
4. **Understand the workflow**: Hiểu workflow của rebase conflicts

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Skip without understanding
git rebase main
# Conflict occurs
git rebase --skip
# May lose important changes

# ✅ Nên: Resolve or abort properly
git rebase main
# Conflict occurs
# Resolve conflict
git add file.txt
git rebase --continue
# Properly handles conflict
```

---

## Rebase best practices là gì? / What are rebase best practices?

### Mục đích / Purpose

Hiểu rebase best practices giúp bạn:

- Sử dụng rebase an toàn
- Tránh rewriting shared history
- Maintain clean history

### Khi nào dùng / When to Use

Best practices này nên được áp dụng:

- Mỗi khi bạn rebase
- Khi setup rebase workflow cho team
- Khi review rebase processes

### Giả ích gì / Benefits

- **Safe**: Sử dụng rebase an toàn
- **Clean**: Maintain clean history
- **Efficient**: Làm việc hiệu quả hơn

### Best Practices:

#### 1. Rebase Local, Merge Pushed

```bash
# ✅ Nên: Rebase local branches
git switch feature
git rebase main
# Safe! Only local history is rewritten

# ❌ Không nên: Rebase pushed branches
git push origin main
git switch feature
git rebase main
git push -f origin feature
# Dangerous! Rewrites shared history
```

#### 2. Use Interactive Rebase for Cleanup

```bash
# ✅ Nên: Use interactive rebase to clean up
git rebase -i HEAD~5
# Can squash, reorder, edit commits
```

#### 3. Test After Rebase

```bash
# ✅ Nên: Test after rebase
git rebase main
# Test changes
git push origin feature
```

#### 4. Communicate with Team

```bash
# ✅ Nên: Communicate with team
# Let team know before rebasing shared branches
```

#### 5. Use Rebase for Linear History

```bash
# ✅ Nên: Use rebase for linear history
git rebase main
# Maintains linear history
```

#### 6. Handle Conflicts Properly

```bash
# ✅ Nên: Handle conflicts properly
git rebase main
# Conflict occurs
# Resolve conflict
git add file.txt
git rebase --continue
# Properly handles conflict
```

#### 7. Use --onto for Specific Scenarios

```bash
# ✅ Nên: Use --onto for specific scenarios
git rebase --onto main HEAD~2
# Rebase specific commits
```

#### 8. Keep Commits Atomic

```bash
# ✅ Nên: Keep commits atomic
# Each commit should do one thing
```

#### 9. Use Meaningful Commit Messages

```bash
# ✅ Nên: Use meaningful commit messages
git commit -m "Add user authentication feature"
# Clear and descriptive
```

#### 10. Document Rebase Decisions

```bash
# ✅ Nên: Document rebase decisions
# Document why and when you rebased
```

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase without understanding
git rebase main
# May cause unexpected issues

# ❌ Không nên: Force push after rebase
git rebase main
git push -f origin feature
# Dangerous! Rewrites shared history

# ❌ Không nên: Rebase large history
git rebase -i HEAD~100
# Can be overwhelming and error-prone
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`git rebase branchname`** reapply commits của current branch trên top của target branch
2. **Interactive rebase** (`git rebase -i`) cho phép modify commits trước khi reapply
3. **Rebase** maintain linear history, **merge** preserves history
4. **`git rebase --onto`** rebase commits sang một branch khác
5. **Rebase conflicts** xảy ra per commit, **merge conflicts** xảy ra một lần
6. **`git rebase --continue`** continue rebase sau khi resolve conflicts
7. **`git rebase --abort`** abort rebase và quay về trạng thái trước đó
8. **`git rebase --skip`** skip commit hiện tại và tiếp tục
9. **Rebase local, merge pushed**: Luôn rebase local branches
10. **Test after rebase**: Luôn test sau khi rebase

### Commands Reference:

| Command                    | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `git rebase branchname`    | Rebase current branch onto branchname     |
| `git rebase -i HEAD~n`     | Interactive rebase of last n commits      |
| `git rebase --onto branch` | Rebase onto specific branch               |
| `git rebase --continue`    | Continue rebase after resolving conflicts |
| `git rebase --abort`       | Abort rebase and restore state            |
| `git rebase --skip`        | Skip current commit and continue          |

### Best Practices:

1. **Rebase local, merge pushed**: Luôn rebase local branches
2. **Use interactive rebase**: Sử dụng interactive rebase để cleanup
3. **Test after rebase**: Luôn test sau khi rebase
4. **Handle conflicts properly**: Handle conflicts đúng cách
5. **Communicate with team**: Communicate với team về rebase
6. **Keep commits atomic**: Giữ commits atomic
7. **Use meaningful messages**: Sử dụng meaningful commit messages
8. **Document decisions**: Document rebase decisions

### Rebase vs Merge Decision Tree:

```
Is the branch shared (pushed)?
├─ Yes → Use merge (safe)
└─ No → Use rebase (linear history)
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
