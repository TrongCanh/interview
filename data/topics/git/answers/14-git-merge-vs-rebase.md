# 14. Git Merge vs Rebase / So sánh Merge và Rebase

## Tổng quan về Git Merge vs Rebase / Git Merge vs Rebase Overview

### Mục đích / Purpose

**Git Merge vs Rebase** là so sánh giữa hai methods chính để integrate changes trong Git. Mỗi method có ưu và nhược điểm riêng.

**Mục đích chính:**

- Hiểu sự khác biệt giữa merge và rebase
- Biết khi nào nên dùng merge
- Biết khi nào nên dùng rebase
- Hiểu impact trên commit history
- Nắm được best practices cho mỗi method

### Khi nào cần hiểu về Git Merge vs Rebase / When to Use

Hiểu về Git Merge vs Rebase là cần thiết khi:

- Muốn chọn đúng method để integrate changes
- Chuẩn bị cho phỏng vấn về Git nâng cao
- Làm việc với team có branching workflow
- Muốn maintain clean commit history

### Giả ích gì / Benefits

**Lợi ích:**

- **Understanding**: Hiểu rõ khi nào nên dùng mỗi method
- **Flexibility**: Có nhiều options để integrate changes
- **Best Practices**: Nắm được best practices cho mỗi method
- **Team Collaboration**: Làm việc hiệu quả hơn với team

### Ưu nhược điểm / Pros & Cons

| Method     | Ưu điểm (Pros)          | Nhược điểm (Cons)                        |
| ---------- | ----------------------- | ---------------------------------------- |
| **Merge**  | Safe, preserves history | Non-linear, creates merge commits        |
| **Rebase** | Linear history, clean   | Dangerous if pushed, can cause conflicts |

---

## So sánh merge và rebase - ưu nhược điểm của từng cách? / Compare merge and rebase - pros and cons of each?

### Mục đích / Purpose

Hiểu ưu và nhược điểm của merge và rebase giúp bạn:

- Chọn đúng method cho tình huống
- Hiểu trade-offs giữa các methods
- Làm decision dựa trên requirements

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Giải thích branching workflow
- Lựa chọn method cho team

### Giả ích gì / Benefits

- **Informed**: Ra quyết định informed
- **Trade-offs**: Hiểu trade-offs giữa các methods
- **Appropriate**: Chọn appropriate method

### So sánh chi tiết / Detailed Comparison

| Aspect             | Merge                  | Rebase              |
| ------------------ | ---------------------- | ------------------- |
| **History**        | Preserves (non-linear) | Rewrites (linear)   |
| **Safety**         | Safe                   | Dangerous if pushed |
| **Commits**        | Creates merge commit   | Moves commits       |
| **Linearity**      | Non-linear (branching) | Linear              |
| **Conflicts**      | One-time               | Per commit          |
| **Use Case**       | Public history         | Local history       |
| **Complexity**     | Simple                 | Complex             |
| **Learning Curve** | Easy                   | Harder              |

### Merge Pros & Cons:

| Ưu điểm (Pros)                       | Nhược điểm (Cons)                    |
| ------------------------------------ | ------------------------------------ |
| Safe - không rewrite history         | Non-linear - history có thể phức tạp |
| Preserves - giữ nguyên commits       | Creates merge commits                |
| Simple - dễ hiểu và sử dụng          | Branching - có thể gây confusion     |
| Team-friendly - dễ cho collaboration | Can create many merge commits        |

### Rebase Pros & Cons:

| Ưu điểm (Pros)                           | Nhược điểm (Cons)                         |
| ---------------------------------------- | ----------------------------------------- |
| Linear - maintain linear history         | Dangerous - có thể rewrite shared history |
| Clean - clean up commit history          | Complex - learning curve cao              |
| Flexible - reorder, edit, squash commits | Conflicts - có thể gây nhiều conflicts    |
| Atomic - commits giữ nguyên              | Risky - có thể lose data nếu dùng sai     |

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

# Merge (non-linear history)
git switch main
git merge feature
# Creates merge commit

# Reset for rebase example
git reset --hard HEAD~2

# Rebase (linear history)
git switch feature
git rebase main
# Moves feature commits after main commits
```

### Khi nào nên dùng merge? / When to Use Merge

- **Public history**: History đã được shared
- **Team collaboration**: Làm việc với team
- **Preserve history**: Muốn preserve branch history
- **Complex merges**: Complex merge scenarios
- **Safety**: Priority là safety

### Khi nào nên dùng rebase? / When to Use Rebase

- **Local history**: Chỉ local commits
- **Linear history**: Muốn maintain linear history
- **Clean up**: Muốn clean up commit history
- **Before merging**: Rebase trước khi merge
- **Feature branches**: Feature branches chưa được shared

### Best Practices:

1. **Rebase local, merge pushed**: Luôn rebase local, merge pushed
2. **Understand the impact**: Hiểu impact trên commit history
3. **Communicate with team**: Communicate với team về method
4. **Test after operation**: Test sau khi merge hoặc rebase

---

## Khi nào nên dùng merge? / When should you use merge?

### Mục đích / Purpose

Biết khi nào nên dùng merge giúp bạn:

- Chọn đúng method để integrate changes
- Avoid rewriting shared history
- Maintain safety trong team collaboration

### Khi nào dùng / When to Use

Sử dụng merge khi:

- **Public history**: History đã được shared
- **Team collaboration**: Làm việc với team
- **Preserve history**: Muốn preserve branch history
- **Complex merges**: Complex merge scenarios
- **Safety**: Priority là safety

### Giả ích gì / Benefits

- **Safe**: Không rewrite shared history
- **Preserves**: Giữ nguyên commit history
- **Simple**: Dễ hiểu và sử dụng
- **Team-friendly**: Dễ cho team collaboration

### Use Cases:

#### 1. Public History

```bash
# Branch has been pushed
git push origin feature

# Use merge to integrate
git switch main
git merge feature
git push origin main
# Safe! Preserves history
```

#### 2. Team Collaboration

```bash
# Multiple developers working on same branch
# Use merge to integrate changes
git switch main
git merge feature1
git merge feature2
git push origin main
# Safe! Preserves history
```

#### 3. Complex Merges

```bash
# Complex merge scenario with multiple branches
# Use merge to integrate
git switch main
git merge feature1
git merge feature2
git merge hotfix
git push origin main
# Safe! Handles complex scenarios
```

#### 4. Preserve History

```bash
# Want to preserve branch history
git switch main
git merge feature --no-ff
git push origin main
# Creates merge commit, preserves history
```

### Best Practices:

1. **Use merge for public history**: Luôn dùng merge cho public history
2. **Use --no-ff for preservation**: Sử dụng `--no-ff` để preserve history
3. **Resolve conflicts carefully**: Resolve conflicts cẩn thận
4. **Test after merge**: Test sau khi merge
5. **Communicate with team**: Communicate với team về merges

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase pushed branches
git push origin feature
git switch main
git rebase feature
git push -f origin main
# Dangerous! Rewrites shared history

# ✅ Nên: Merge pushed branches
git push origin feature
git switch main
git merge feature
git push origin main
# Safe! Preserves history
```

---

## Khi nào nên dùng rebase? / When should you use rebase?

### Mục đích / Purpose

Biết khi nào nên dùng rebase giúp bạn:

- Maintain linear history
- Clean up commit history
- Integrate changes hiệu quả hơn

### Khi nào dùng / When to Use

Sử dụng rebase khi:

- **Local history**: Chỉ local commits
- **Linear history**: Muốn maintain linear history
- **Clean up**: Muốn clean up commit history
- **Before merging**: Rebase trước khi merge
- **Feature branches**: Feature branches chưa được shared

### Giả ích gì / Benefits

- **Linear**: Maintain linear commit history
- **Clean**: Clean up commit history
- **Flexible**: Reorder, edit, squash commits
- **Atomic**: Commits giữ nguyên

### Use Cases:

#### 1. Local Feature Branch

```bash
# Local feature branch (not pushed)
git switch -c feature
echo "feature1" > feature.txt
git add feature.txt
git commit -m "Add feature1"

echo "feature2" >> feature.txt
git add feature.txt
git commit -m "Add feature2"

# Rebase onto main
git rebase main
# Linear history
```

#### 2. Clean Up History

```bash
# Interactive rebase to clean up
git rebase -i HEAD~5
# Can squash, reorder, edit commits
```

#### 3. Before Merging

```bash
# Rebase before merging to main
git switch feature
git rebase main
# Then merge
git switch main
git merge feature
# Clean merge
```

#### 4. Sync with Main

```bash
# Sync feature branch with main
git switch feature
git fetch origin
git rebase origin/main
# Up to date with main
```

### Best Practices:

1. **Rebase local only**: Chỉ rebase local branches
2. **Use interactive rebase**: Sử dụng interactive rebase để clean up
3. **Test after rebase**: Test sau khi rebase
4. **Handle conflicts properly**: Handle conflicts đúng cách
5. **Never rebase pushed**: Không bao giờ rebase pushed branches

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase pushed branches
git push origin feature
git switch main
git rebase feature
git push -f origin main
# Dangerous! Rewrites shared history

# ✅ Nên: Rebase only local branches
git switch feature
git rebase main
# Safe! Only local history is rewritten
```

---

## Impact trên commit history của merge và rebase? / Impact on commit history of merge and rebase?

### Mục đích / Purpose

Hiểu impact trên commit history của merge và rebase giúp bạn:

- Hiểu cách mỗi method affects history
- Chọn method phù hợp với requirements
- Maintain desired history structure

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Giải thích branching workflow
- Lựa chọn method cho team

### Giả ích gì / Benefits

- **Understanding**: Hiểu impact trên commit history
- **Informed**: Ra quyết định informed
- **Appropriate**: Chọn appropriate method

### Impact của Merge / Merge Impact

```
Before merge:
A -> B -> C (main)
    \-> D -> E (feature)

After merge:
A -> B -> C -> M (merge commit) <- D -> E
```

**Characteristics:**

- **Non-linear**: History có branching
- **Preserves**: Giữ nguyên commit history
- **Merge commit**: Tạo merge commit
- **Traceable**: Dễ trace branch history

### Impact của Rebase / Rebase Impact

```
Before rebase:
A -> B -> C (main)
    \-> D -> E (feature)

After rebase:
A -> B -> C -> D' -> E' (main)
```

**Characteristics:**

- **Linear**: History là linear
- **Rewrites**: Rewrites commit history
- **Moves**: Di chuyển commits
- **Clean**: Clean up commit history

### So sánh History / Comparison of History

| Aspect            | Merge         | Rebase           |
| ----------------- | ------------- | ---------------- |
| **Linearity**     | Non-linear    | Linear           |
| **Branching**     | Visible       | Hidden           |
| **Commits**       | Preserved     | Moved            |
| **Merge Commits** | Creates       | No merge commits |
| **Traceability**  | Easy to trace | Harder to trace  |

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

# Merge (non-linear history)
git switch main
git merge feature
git log --oneline --graph

# Output:
# * abc1234 (HEAD -> main) Merge branch 'feature'
# |\
# | * def4567 Add feature2
# | * ghi8901 Add feature1
# * jkl1234 Add main2
# * mno5678 Add main1

# Reset for rebase example
git reset --hard HEAD~2

# Rebase (linear history)
git switch feature
git rebase main
git log --oneline --graph

# Output:
# * abc1234' (HEAD -> main) Add feature2
# * def4567' Add feature1
# * ghi8901 Add main2
# * jkl1234 Add main1
```

### Best Practices:

1. **Understand the impact**: Hiểu impact trên commit history
2. **Choose appropriate method**: Chọn appropriate method cho requirements
3. **Communicate with team**: Communicate với team về method
4. **Document decisions**: Document decisions về method

---

## Team considerations khi chọn giữa merge và rebase? / Team considerations when choosing between merge and rebase?

### Mục đích / Purpose

Hiểu team considerations khi chọn giữa merge và rebase giúp bạn:

- Chọn method phù hợp với team workflow
- Communicate với team về branching strategy
- Avoid conflicts với team members

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Setup branching workflow cho team
- Resolve team conflicts về Git practices

### Giả ích gì / Benefits

- **Team Alignment**: Chọn method phù hợp với team
- **Communication**: Communicate với team về practices
- **Consistency**: Maintain consistency trong team
- **Conflict Avoidance**: Tránh conflicts với team members

### Team Considerations:

#### 1. Team Size

| Team Size     | Recommended Method | Reason                  |
| ------------- | ------------------ | ----------------------- |
| Small (1-3)   | Either             | Easy to coordinate      |
| Medium (4-10) | Merge              | Easier coordination     |
| Large (10+)   | Merge              | Safer for collaboration |

#### 2. Experience Level

| Experience   | Recommended Method | Reason                      |
| ------------ | ------------------ | --------------------------- |
| Beginners    | Merge              | Safer, easier to understand |
| Intermediate | Either             | Can handle both             |
| Advanced     | Rebase             | Can handle complexity       |

#### 3. Workflow Type

| Workflow    | Recommended Method | Reason                     |
| ----------- | ------------------ | -------------------------- |
| Git Flow    | Merge              | Preserves feature branches |
| GitHub Flow | Either             | Flexible                   |
| Trunk-based | Rebase             | Linear history             |

#### 4. Project Type

| Project       | Recommended Method | Reason                   |
| ------------- | ------------------ | ------------------------ |
| Open Source   | Merge              | Preserves contributions  |
| Closed Source | Either             | Team decides             |
| High Security | Merge              | Safer, preserves history |

#### 5. CI/CD Integration

| CI/CD     | Recommended Method | Reason              |
| --------- | ------------------ | ------------------- |
| Automated | Merge              | Easier to integrate |
| Manual    | Either             | Team decides        |

### Communication Guidelines:

#### 1. Document Branching Strategy

```markdown
# Branching Strategy Document

## Merge vs Rebase

- **Default**: Use merge for all integrations
- **Exception**: Rebase local feature branches before merging
- **Never**: Rebase pushed branches
```

#### 2. Team Training

```bash
# Train team on chosen method
- Explain pros and cons
- Provide examples
- Practice in safe environment
```

#### 3. Code Review Guidelines

```markdown
# Code Review Guidelines

## Merge vs Rebase

- **Review**: Review both merge and rebase PRs
- **Guidelines**: Provide guidelines for each method
- **Consistency**: Maintain consistency
```

### Best Practices:

1. **Document team strategy**: Document branching strategy cho team
2. **Train team members**: Train team members trên chosen method
3. **Provide guidelines**: Provide guidelines cho each method
4. **Communicate changes**: Communicate changes trong strategy
5. **Be consistent**: Maintain consistency trong team

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Mix methods without communication
# Some use merge, some use rebase
# Without team agreement

# ✅ Nên: Agree on method as team
# Document branching strategy
# Train team members
# Be consistent
```

---

## Golden rule of rebase là gì? / What is the golden rule of rebase?

### Mục đích / Purpose

Hiểu golden rule của rebase giúp bạn:

- Avoid dangerous situations
- Maintain safety trong team collaboration
- Use rebase responsibly

### Khi nào dùng / When to Use

Golden rule này nên được áp dụng:

- Mỗi khi bạn rebase
- Khi training team members
- Khi documenting branching strategy

### Giả ích gì / Benefits

- **Safety**: Maintain safety trong team collaboration
- **Avoidance**: Tránh dangerous situations
- **Responsibility**: Use rebase responsibly

### Golden Rule:

⚠️ **"Never rebase commits that exist outside your repository"**

⚠️ **"Never rebase commits that have been pushed"**

### Explanation:

Rebase rewrites commit history. Nếu bạn rebase commits đã được pushed lên remote:

1. **Others may have based work** trên những commits đó
2. **Rewriting history** sẽ break their work
3. **Force push** sẽ gây issues cho team members
4. **Lost work** có thể cause lost work

### Safe Rebase Workflow:

```
1. Create feature branch (local)
   ↓
2. Make commits (local only)
   ↓
3. Rebase onto main (local only)
   ↓
4. Test changes
   ↓
5. Push to remote (first time)
   ↓
6. Merge into main (merge, not rebase)
```

### Examples:

#### 1. Safe Rebase

```bash
# ✅ Safe: Rebase local branch
git switch -c feature
echo "feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# Rebase (local only)
git rebase main

# Push (first time)
git push -u origin feature

# Merge into main
git switch main
git merge feature
git push origin main
# Safe! Feature was never pushed before
```

#### 2. Unsafe Rebase

```bash
# ❌ Unsafe: Rebase pushed branch
git switch -c feature
echo "feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# Push
git push -u origin feature

# Rebase (dangerous!)
git rebase main

# Force push (dangerous!)
git push -f origin feature
# Dangerous! Rewrites shared history
```

### Best Practices:

1. **Never rebase pushed commits**: Không bao giờ rebase pushed commits
2. **Rebase only local branches**: Chỉ rebase local branches
3. **Test before pushing**: Test trước khi push
4. **Use merge for integration**: Sử dụng merge để integrate pushed branches
5. **Communicate with team**: Communicate với team về rebase

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Rebase pushed branches
git push origin feature
git rebase main
git push -f origin feature
# Dangerous! Breaks team workflow

# ✅ Nên: Rebase only local branches
git switch -c feature
git rebase main
git push -u origin feature
# Safe! Only local history is rewritten
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **Merge** preserves history, **Rebase** rewrites history
2. **Merge** creates merge commits, **Rebase** moves commits
3. **Merge** là non-linear, **Rebase** là linear
4. **Use merge** cho public history và team collaboration
5. **Use rebase** cho local history và linear history
6. **Golden rule**: Never rebase pushed commits
7. **Team considerations**: Consider team size, experience, workflow
8. **Test after operation**: Luôn test sau khi merge hoặc rebase
9. **Communicate with team**: Communicate với team về branching strategy
10. **Document decisions**: Document decisions về merge vs rebase

### Decision Tree:

```
Has branch been pushed?
├─ Yes → Use merge (safe)
└─ No → Can use rebase (linear history)
   ├─ Want linear history? → Use rebase
   └─ Want to preserve history? → Use merge
```

### Commands Reference:

| Command                        | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `git merge branchname`         | Merge branch vào current branch           |
| `git merge --no-ff branchname` | Merge với merge commit                    |
| `git rebase branchname`        | Rebase current branch onto branchname     |
| `git rebase -i HEAD~n`         | Interactive rebase                        |
| `git rebase --continue`        | Continue rebase sau khi resolve conflicts |
| `git rebase --abort`           | Abort rebase                              |
| `git rebase --skip`            | Skip commit hiện tại                      |

### Best Practices:

1. **Rebase local, merge pushed**: Luôn rebase local, merge pushed
2. **Use merge for public history**: Luôn dùng merge cho public history
3. **Use rebase for linear history**: Sử dụng rebase để maintain linear history
4. **Never rebase pushed commits**: Không bao giờ rebase pushed commits
5. **Test after operation**: Luôn test sau khi merge hoặc rebase
6. **Communicate with team**: Communicate với team về branching strategy
7. **Document team strategy**: Document branching strategy cho team
8. **Handle conflicts properly**: Handle conflicts đúng cách
9. **Use interactive rebase**: Sử dụng interactive rebase để clean up
10. **Understand the impact**: Hiểu impact trên commit history

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
