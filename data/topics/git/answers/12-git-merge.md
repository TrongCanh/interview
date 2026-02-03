# 12. Git Merge / Git Merge

## Tổng quan về Git Merge / Git Merge Overview

### Mục đích / Purpose

**Git Merge** là một trong những operations quan trọng nhất trong Git, cho phép bạn kết hợp changes từ các branches khác nhau. Hiểu về merge giúp bạn:

- Kết hợp work từ nhiều developers
- Quản lý branching workflows hiệu quả
- Xử lý merge conflicts
- Giữ history clean và meaningful

**Mục đích chính:**

- Kết hợp changes từ source branch vào target branch
- Hỗ trợ collaboration trong team
- Quản lý release và feature branches
- Giữ track của integration points

### Khi nào cần hiểu về Git Merge / When to Use

Hiểu về Git merge là cần thiết khi:

- Làm việc với multiple branches
- Collaboration với team members
- Managing feature branches
- Handling release branches
- Resolving merge conflicts

### Giúp ích gì / Benefits

**Lợi ích:**

- **Collaboration**: Cho phép multiple developers work cùng lúc
- **History**: Giữ nguyên history của cả hai branches
- **Flexibility**: Hỗ trợ nhiều merge strategies
- **Safety**: Non-destructive, có thể undo
- **Integration**: Dễ dàng integrate changes

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                            | Nhược điểm (Cons)                                        |
| ----------------------------------------- | -------------------------------------------------------- |
| Preserves history - giữ nguyên history    | Creates merge commits - tạo merge commits                |
| Non-destructive - không phá hủy           | Can create complex history - có thể tạo history phức tạp |
| Flexible - linh hoạt với nhiều strategies | Conflicts - có thể xảy ra conflicts                      |
| Safe - an toàn, có thể undo               | Requires conflict resolution - cần resolve conflicts     |

---

## `git merge branchname` làm gì? / What does `git merge branchname` do?

### Mục đích / Purpose

Hiểu `git merge branchname` giúp bạn:

- Biết cách kết hợp changes từ branch khác
- Hiểu merge process
- Xử lý merge conflicts hiệu quả

### Khi nào dùng / When to Use

Lệnh này được dùng khi:

- Bạn muốn merge feature branch vào main branch
- Bạn muốn integrate changes từ upstream
- Bạn muốn combine work từ multiple branches

### Giúp ích gì / Benefits

- **Integration**: Dễ dàng integrate changes
- **Collaboration**: Hỗ trợ team collaboration
- **Flexibility**: Hỗ trợ nhiều merge types

### Định nghĩa / Definition

`git merge branchname` là lệnh để kết hợp changes từ `branchname` vào current branch (HEAD).

**Merge process:**

1. Git tìm common ancestor của hai branches
2. Git tính toán changes từ common ancestor
3. Git áp dụng changes vào current branch
4. Nếu có conflicts, yêu cầu resolution
5. Tạo merge commit (hoặc fast-forward)

### Cú pháp / Syntax

```bash
# Basic merge
git merge branchname

# Merge với message tùy chỉnh
git merge -m "Custom message" branchname

# Merge không tạo commit (no-ff)
git merge --no-ff branchname

# Merge squash
git merge --squash branchname

# Abort merge
git merge --abort
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo và checkout feature branch
git checkout -b feature/new-feature

# 2. Make changes và commit
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Add new feature"

# 3. Checkout main branch
git checkout main

# 4. Merge feature branch vào main
git merge feature/new-feature

# 5. Xem merge commit
git log --oneline --graph
```

### Common Pitfalls / Lỗi thường gặp

- **Not checking current branch**: Không check branch hiện tại trước khi merge
- **Not pulling latest changes**: Không pull latest changes từ remote
- **Ignoring conflicts**: Bỏ qua conflicts thay vì resolve

### Best Practices / Thực hành tốt nhất

- Always check current branch before merging
- Pull latest changes before merging
- Review changes before merging
- Resolve conflicts carefully
- Use meaningful merge messages

---

## Fast-forward merge là gì? Khi nào xảy ra? / What is a fast-forward merge? When does it occur?

### Mục đích / Purpose

Hiểu fast-forward merge giúp bạn:

- Biết khi nào Git sẽ tạo fast-forward merge
- Hiểu sự khác biệt giữa fast-forward và merge commit
- Quyết định khi nào nên dùng fast-forward

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git merge
- Khi debugging merge behavior
- Khi planning branching strategy

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ merge behavior
- **Control**: Có thể control merge type
- **History**: Giữ history clean

### Định nghĩa / Definition

**Fast-forward merge** là một loại merge đặc biệt khi target branch không có new commits sau common ancestor. Git đơn giản là di chuyển pointer của target branch đến commit của source branch.

**Điều kiện:**

- Target branch không có commits mới sau common ancestor
- Source branch có commits mới
- Linear history

### Fast-forward vs Merge Commit / So sánh

```
┌─────────────────────────────────────────────────────────────┐
│              Fast-forward Merge                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Before:                                                    │
│                                                             │
│  main  ──► C1 ──► C2                                       │
│                  │                                           │
│  feature         └──► C3 ──► C4                             │
│                                                             │
│  After (git merge feature):                                 │
│                                                             │
│  main  ──► C1 ──► C2 ──► C3 ──► C4                         │
│                                                             │
│  (main pointer moves to C4)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Merge Commit (3-way)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Before:                                                    │
│                                                             │
│  main  ──► C1 ──► C2 ──► C5                                 │
│                  │                                           │
│  feature         └──► C3 ──► C4                             │
│                                                             │
│  After (git merge feature):                                 │
│                                                             │
│  main  ──► C1 ──► C2 ──► C5                                 │
│                  │       │                                   │
│  feature         └──► C3 ──► C4 ──► C6 (merge)             │
│                                  │                           │
│                                  └──► main                  │
│                                                             │
│  (C6 is a merge commit with 2 parents)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo feature branch
git checkout -b feature
echo "Feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# 2. Checkout main (không có changes mới)
git checkout main

# 3. Fast-forward merge
git merge feature
# Output: Fast-forward

# 4. Xem log
git log --oneline --graph
# Output: Linear history, no merge commit
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding fast-forward**: Không hiểu fast-forward behavior
- **Losing branch context**: Mất context của feature branch
- **Confusing with merge commit**: Nhầm lẫn với merge commit

### Best Practices / Thực hành tốt nhất

- Use `--no-ff` để giữ branch context
- Understand when fast-forward occurs
- Decide based on workflow needs

---

## 3-way merge là gì? / What is a 3-way merge?

### Mục đích / Purpose

Hiểu 3-way merge giúp bạn:

- Biết Git merge complex changes
- Hiểu merge conflicts
- Resolve conflicts hiệu quả

### Khi nào dùng / When to Use

3-way merge được dùng khi:

- Cả hai branches có new commits sau common ancestor
- Git cần combine changes từ cả hai branches
- Có potential conflicts

### Giúp ích gì / Benefits

- **Combination**: Kết hợp changes từ cả hai branches
- **Context**: Giữ context của cả hai branches
- **Flexibility**: Hỗ trợ complex scenarios

### Định nghĩa / Definition

**3-way merge** là một merge algorithm sử dụng 3 inputs:

1. **Common ancestor** (base commit)
2. **Current branch** (HEAD)
3. **Source branch** (branch to merge)

Git so sánh changes từ common ancestor đến cả hai branches và kết hợp chúng.

### 3-way Merge Process / Quy trình 3-way Merge

```
┌─────────────────────────────────────────────────────────────┐
│              3-way Merge Process                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Find Common Ancestor:                                  │
│                                                             │
│     Common Ancestor (C2)                                    │
│           │                                                 │
│     ┌─────┴─────┐                                          │
│     │           │                                          │
│     ▼           ▼                                          │
│  Current      Source                                        │
│  Branch (C3)  Branch (C4)                                   │
│                                                             │
│  2. Calculate Changes:                                      │
│                                                             │
│     Changes from C2 to C3 (current)                         │
│     Changes from C2 to C4 (source)                          │
│                                                             │
│  3. Combine Changes:                                       │
│                                                             │
│     Apply both changes to C2                                │
│     Resolve conflicts if any                                │
│                                                             │
│  4. Create Merge Commit:                                    │
│                                                             │
│     Merge commit (C5) with 2 parents (C3, C4)               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo feature branch
git checkout -b feature

# 2. Make changes trong feature branch
echo "Feature change" > file.txt
git add file.txt
git commit -m "Feature change"

# 3. Checkout main và make changes
git checkout main
echo "Main change" >> file.txt
git add file.txt
git commit -m "Main change"

# 4. 3-way merge
git merge feature
# Output: Merge made by the 'recursive' strategy

# 5. Xem merge commit
git show HEAD
# Output: Merge commit with 2 parents
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding 3-way merge**: Không hiểu 3-way merge process
- **Ignoring conflicts**: Bỏ qua conflicts
- **Not reviewing merge**: Không review merge result

### Best Practices / Thực hành tốt nhất

- Understand 3-way merge process
- Review changes before merging
- Resolve conflicts carefully
- Test after merging

---

## Merge commit là gì? / What is a merge commit?

### Mục đích / Purpose

Hiểu merge commit giúp bạn:

- Biết structure của merge commit
- Hiểu role của merge commit trong history
- Distinguish merge commits từ regular commits

### Khi nào dùng / When to Use

Merge commit được tạo khi:

- 3-way merge (non-fast-forward)
- Explicit merge with `--no-ff`
- Merging remote branches

### Gi giúp ích gì / Benefits

- **History**: Giữ track của merge points
- **Context**: Giữ context của merged branch
- **Traceability**: Dễ trace origin của changes

### Định nghĩa / Definition

**Merge commit** là một commit đặc biệt có **2 hoặc nhiều parent commits**. Nó đại diện cho điểm integration của hai hoặc nhiều branches.

**Đặc điểm:**

- Có 2+ parent commits
- Git tự động tạo merge message
- Không có changes trực tiếp (trừ conflicts)
- Có thể được annotated

### Merge Commit Structure / Cấu trúc Merge Commit

```
┌─────────────────────────────────────────────────────────────┐
│              Merge Commit Structure                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Regular Commit:                                            │
│                                                             │
│  Commit: C3                                                 │
│  Parent: C2                                                 │
│  Author: John Doe                                           │
│  Message: "Add feature"                                      │
│  Tree: T3 (snapshot of files)                                │
│                                                             │
│  Merge Commit:                                              │
│                                                             │
│  Commit: C5 (merge)                                         │
│  Parents: C3, C4                                           │
│  Author: John Doe                                           │
│  Message: "Merge branch 'feature' into main"                │
│  Tree: T5 (combined snapshot)                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo merge commit
git checkout main
git merge feature

# 2. Xem merge commit
git log --oneline --graph
# Output: *   abc1234 (HEAD -> main) Merge branch 'feature'
#             |\
#             | * def5678 (feature) Add feature
#             * cde9012 Update main

# 3. Xem merge commit details
git show HEAD
# Output: Merge: abc1234
#         Parents: cde9012, def5678
#         Message: "Merge branch 'feature' into main"

# 4. Xem parents của merge commit
git log --parents --oneline -1
# Output: abc1234 cde9012 def5678
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding merge commits**: Không hiểu merge commit structure
- **Ignoring merge commits**: Bỏ qua merge commits trong log
- **Confusing with regular commits**: Nhầm lẫn với regular commits

### Best Practices / Thực hành tốt nhất

- Understand merge commit structure
- Use merge commits to track integration points
- Review merge commits in history

---

## `git merge --no-ff` làm gì? / What does `git merge --no-ff` do?

### Mục đích / Purpose

Hiểu `git merge --no-ff` giúp bạn:

- Biết cách tạo merge commit ngay cả khi fast-forward có thể
- Giữ context của feature branch trong history
- Quyết định khi nào nên dùng `--no-ff`

### Khi nào dùng / When to Use

`--no-ff` được dùng khi:

- Bạn muốn giữ context của feature branch
- Bạn muốn clear indication của merge point
- Bạn muốn preserve branch history

### Gi giúp ích gì / Benefits

- **Context**: Giữ context của feature branch
- **History**: Clear indication của merge point
- **Traceability**: Dễ trace origin của changes

### Định nghĩa / Definition

`git merge --no-ff` là option để **tạo merge commit ngay cả khi fast-forward có thể**. Nó đảm bảo merge point luôn được recorded trong history.

**Khi nào dùng:**

- Feature branch workflows
- Khi muốn preserve branch history
- Khi muốn clear merge points

### Fast-forward vs No-ff / So sánh

```
┌─────────────────────────────────────────────────────────────┐
│              Fast-forward (default)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main  ──► C1 ──► C2 ──► C3 ──► C4                         │
│                                                             │
│  (Linear history, no merge commit)                          │
│  (Lost context of feature branch)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              No-ff (--no-ff)                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main  ──► C1 ──► C2 ──► C5 (merge)                        │
│                  │       │                                   │
│  feature         └──► C3 ──► C4                             │
│                                  │                           │
│                                  └──► main                  │
│                                                             │
│  (Merge commit created)                                     │
│  (Feature branch context preserved)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo feature branch
git checkout -b feature
echo "Feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# 2. Checkout main (không có changes mới)
git checkout main

# 3. Merge với --no-ff
git merge --no-ff feature -m "Merge feature branch"

# 4. Xem log
git log --oneline --graph
# Output: *   abc1234 (HEAD -> main) Merge feature branch
#             |\
#             | * def5678 (feature) Add feature
#             * cde9012 Initial commit
```

### Common Pitfalls / Lỗi thường gặp

- **Overusing --no-ff**: Lạm dụng --no-ff
- **Not understanding impact**: Không hiểu impact trên history
- **Creating unnecessary merge commits**: Tạo merge commits không cần thiết

### Best Practices / Thực hành tốt nhất

- Use `--no-ff` cho feature branches
- Use fast-forward cho hotfix branches
- Decide based on workflow needs
- Consider history readability

---

## `git merge --squash` khác merge thường như thế nào? / How is `git merge --squash` different from regular merge?

### Mục đích / Purpose

Hiểu `git merge --squash` giúp bạn:

- Biết cách combine multiple commits thành một
- Giữ history clean
- Quyết định khi nào nên dùng squash

### Khi nào dùng / When to Use

`--squash` được dùng khi:

- Bạn muốn combine multiple commits thành một
- Feature branch có nhiều small commits
- Bạn muốn clean history

### Gi giúp ích gì / Benefits

- **Clean history**: Giữ history clean
- **Single commit**: Combine multiple commits thành một
- **Flexibility**: Có thể review changes trước khi commit

### Định nghĩa / Definition

`git merge --squash` là option để **combine tất cả changes từ source branch thành một single commit** trong target branch, mà không tạo merge commit.

**Đặc điểm:**

- Không tạo merge commit
- Combine tất cả changes thành single commit
- Không preserve branch history
- Có thể review changes trước khi commit

### Regular Merge vs Squash Merge / So sánh

```
┌─────────────────────────────────────────────────────────────┐
│              Regular Merge                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main  ──► C1 ──► C2 ──► C5 (merge)                        │
│                  │       │                                   │
│  feature         └──► C3 ──► C4                             │
│                                  │                           │
│                                  └──► main                  │
│                                                             │
│  (Merge commit created)                                     │
│  (All commits preserved)                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Squash Merge                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main  ──► C1 ──► C2 ──► C3 (squashed)                      │
│                  │                                           │
│  feature         └──► C4 ──► C5                             │
│                                  │                           │
│                                  └──► (squashed)            │
│                                                             │
│  (No merge commit)                                          │
│  (C4 and C5 combined into C3)                              │
│  (Feature branch commits lost)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo feature branch với nhiều commits
git checkout -b feature
echo "Feature 1" > f1.txt
git add f1.txt
git commit -m "Add feature 1"

echo "Feature 2" > f2.txt
git add f2.txt
git commit -m "Add feature 2"

# 2. Checkout main
git checkout main

# 3. Squash merge
git merge --squash feature

# 4. Review changes
git status
# Output: All changes from feature branch staged

# 5. Commit squashed changes
git commit -m "Add complete feature"

# 6. Xem log
git log --oneline --graph
# Output: Linear history, only one commit for feature
```

### Common Pitfalls / Lỗi thường gặp

- **Losing commit history**: Mất commit history của feature branch
- **Not reviewing changes**: Không review changes trước khi commit
- **Overusing squash**: Lạm dụng squash

### Best Practices / Thực hành tốt nhất

- Use squash cho feature branches với nhiều small commits
- Review changes trước khi commit
- Use meaningful commit message
- Consider if you need to preserve history

---

## Merge conflicts là gì? Cách xử lý? / What are merge conflicts? How to handle them?

### Mục đích / Purpose

Hiểu merge conflicts giúp bạn:

- Biết khi nào conflicts xảy ra
- Hiểu cách resolve conflicts
- Xử lý conflicts hiệu quả

### Khi nào dùng / When to Use

Merge conflicts xảy ra khi:

- Cả hai branches thay đổi cùng một phần của file
- Changes conflict với nhau
- Git không thể tự động merge

### Gi giúp ích gì / Benefits

- **Resolution**: Resolve conflicts hiệu quả
- **Understanding**: Hiểu nguyên nhân conflicts
- **Prevention**: Tránh conflicts trong tương lai

### Định nghĩa / Definition

**Merge conflicts** xảy ra khi Git không thể tự động combine changes từ hai branches vì chúng conflict với nhau.

**Nguyên nhân:**

- Cả hai branches thay đổi cùng dòng của file
- Một branch xóa file, branch khác sửa file
- Changes không compatible

### Merge Conflict Markers / Conflict Markers

```
┌─────────────────────────────────────────────────────────────┐
│              Merge Conflict Markers                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  <<<<<<< HEAD                                               │
│  Changes từ current branch (HEAD)                           │
│  =======                                                    │
│  Changes từ branch đang merge                                │
│  >>>>>>> branchname                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Cách xử lý Merge Conflicts / Conflict Resolution Steps

```
┌─────────────────────────────────────────────────────────────┐
│              Merge Conflict Resolution Process              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Detect Conflict:                                        │
│     git status                                               │
│     Output: "both modified: file.txt"                       │
│                                                             │
│  2. View Conflicts:                                         │
│     git diff                                                │
│     hoặc mở file trong editor                               │
│                                                             │
│  3. Resolve Conflicts:                                     │
│     Edit file, chọn changes cần thiết                       │
│     Xóa conflict markers                                    │
│                                                             │
│  4. Stage Resolved Files:                                   │
│     git add file.txt                                        │
│                                                             │
│  5. Complete Merge:                                         │
│     git commit                                              │
│                                                             │
│  6. (Optional) Abort Merge:                                │
│     git merge --abort                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo conflict
git checkout -b feature
echo "Feature change" > file.txt
git add file.txt
git commit -m "Feature change"

git checkout main
echo "Main change" > file.txt
git add file.txt
git commit -m "Main change"

# 2. Merge (conflict xảy ra)
git merge feature
# Output: CONFLICT (content): Merge conflict in file.txt

# 3. Xem conflict
git status
# Output: both modified: file.txt

# 4. Xem file với conflict markers
cat file.txt
# Output:
# <<<<<<< HEAD
# Main change
# =======
# Feature change
# >>>>>>> feature

# 5. Resolve conflict (edit file)
echo "Resolved change" > file.txt

# 6. Stage resolved file
git add file.txt

# 7. Complete merge
git commit
# Output: Merge branch 'feature' (conflict resolved)
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding conflicts**: Không hiểu conflict markers
- **Ignoring conflicts**: Bỏ qua conflicts thay vì resolve
- **Not testing after resolution**: Không test sau khi resolve

### Best Practices / Thực hành tốt nhất

- Understand conflict markers
- Review both sets of changes
- Test after resolving conflicts
- Communicate with team members
- Use merge tools for complex conflicts

---

## 📚 Tài liệu tham khảo / References

- [Git Official Documentation - git-merge](https://git-scm.com/docs/git-merge)
- [Pro Git Book - Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [Atlassian Git Tutorial - Merging](https://www.atlassian.com/git/tutorials/using-branches/git-merge)
- [Git Merge Strategies](https://git-scm.com/docs/merge-strategies)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
