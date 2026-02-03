# Git Conflict Resolution / Xử lý Conflict trong Git

> Hướng dẫn chi tiết về cách xử lý conflict trong Git / Comprehensive guide to resolving conflicts in Git

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách xử lý conflict trong Git là kỹ năng quan trọng cho mọi lập trình viên. Conflicts xảy ra khi Git không thể tự động merge các thay đổi từ các nhánh khác nhau. Hướng dẫn này giúp bạn:

- Hiểu nguyên nhân và cơ chế của merge conflicts
- Biết cách xác định và đọc conflict markers
- Nắm vững các phương pháp resolve conflicts
- Sử dụng công cụ hỗ trợ như `git mergetool`
- Áp dụng best practices để tránh và giảm thiểu conflicts

Understanding conflict resolution in Git is essential for every developer. Conflicts occur when Git cannot automatically merge changes from different branches. This guide helps you:

- Understand the causes and mechanisms of merge conflicts
- Know how to identify and read conflict markers
- Master various conflict resolution methods
- Use supporting tools like `git mergetool`
- Apply best practices to avoid and minimize conflicts

### Khi nào cần hiểu / When to understand

- Khi làm việc trong team với nhiều người cùng phát triển
- Khi merge các nhánh có thay đổi trên cùng file
- Khi rebase hoặc cherry-pick commits
- Khi pull code từ remote repository
- Khi review và merge pull requests

- When working in teams with multiple developers
- When merging branches with changes on the same file
- When rebasing or cherry-picking commits
- When pulling code from remote repository
- When reviewing and merging pull requests

### Giá trị gì / Benefits

- Giải quyết conflicts nhanh chóng và chính xác
- Tránh mất code do resolve sai
- Duy trì lịch sử commit sạch sẽ
- Cải thiện hiệu quả làm việc team
- Tăng confidence khi làm việc với Git

- Resolve conflicts quickly and accurately
- Avoid losing code due to incorrect resolution
- Maintain clean commit history
- Improve team collaboration efficiency
- Increase confidence when working with Git

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Git cho phép resolve conflicts linh hoạt
- Có nhiều công cụ hỗ trợ (GUI, mergetool)
- Conflict markers rõ ràng, dễ hiểu
- Có thể abort và retry khi cần

**Nhược điểm / Cons:**

- Conflicts có thể gây mất thời gian
- Resolve sai có thể gây lỗi nghiêm trọng
- Conflicts phức tạp cần kỹ năng cao

**Pros:**

- Git allows flexible conflict resolution
- Many supporting tools available (GUI, mergetool)
- Clear and easy-to-understand conflict markers
- Can abort and retry when needed

**Cons:**

- Conflicts can be time-consuming
- Incorrect resolution can cause serious errors
- Complex conflicts require advanced skills

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) là gì? / What are merge conflict markers?

#### Mục đích / Purpose

Hiểu cách Git đánh dấu các phần code có conflict để có thể resolve chính xác.

Understand how Git marks conflicting code sections for accurate resolution.

#### Khi nào dùng / When to use

Khi gặp merge conflict và cần xác định các phần code đang conflict.

When encountering merge conflicts and needing to identify conflicting code sections.

#### Giá trị gì / Benefits

- Biết chính xác vị trí và nội dung conflict
- Hiểu ý nghĩa của mỗi marker
- Có thể resolve đúng theo yêu cầu

- Know exact location and content of conflicts
- Understand meaning of each marker
- Can resolve according to requirements

#### Định nghĩa / Definition

Git sử dụng các conflict markers để đánh dấu các phần code không thể tự động merge:

```
<<<<<<< HEAD
// Code từ nhánh hiện tại (HEAD)
=======
// Code từ nhánh đang merge
>>>>>>> feature-branch
```

- `<<<<<<< HEAD`: Bắt đầu phần code từ nhánh hiện tại
- `=======`: Phân tách giữa hai phiên bản
- `>>>>>>> branch-name`: Kết thúc phần code từ nhánh đang merge

Git uses conflict markers to mark code sections that cannot be automatically merged:

```
<<<<<<< HEAD
// Code from current branch (HEAD)
=======
// Code from branch being merged
>>>>>>> feature-branch
```

- `<<<<<<< HEAD`: Start of code from current branch
- `=======`: Separator between two versions
- `>>>>>>> branch-name`: End of code from branch being merged

#### Ví dụ / Examples

**Conflict trong file `app.js`:**

```javascript
function calculateTotal(price, tax) {
<<<<<<< HEAD
    // Phiên bản từ main branch
    return price + (price * tax);
=======
    // Phiên bản từ feature branch
    const discount = price * 0.1;
    return (price - discount) + ((price - discount) * tax);
>>>>>>> feature-discount
}
```

**Conflict trong file `README.md`:**

```markdown
## Installation

<<<<<<< HEAD
npm install my-package
=======
npm install my-package@latest
npm run setup

> > > > > > > dev-branch
```

#### Best Practices

1. **Đọc kỹ cả hai phiên bản** trước khi quyết định
2. **Hiểu context** của mỗi thay đổi
3. **Thảo luận với team** nếu không chắc chắn
4. **Giữ lại cả hai** khi cần thiết
5. **Test kỹ** sau khi resolve

6. **Read both versions carefully** before deciding
7. **Understand context** of each change
8. **Discuss with team** if unsure
9. **Keep both** when necessary
10. **Test thoroughly** after resolution

#### Anti-patterns

- ❌ Chọn ngẫu nhiên một phiên bản
- ❌ Xóa cả hai phiên bản
- ❌ Không hiểu context vẫn resolve
- ❌ Quên test sau khi resolve
- ❌ Commit ngay mà không review

- ❌ Randomly choose one version
- ❌ Delete both versions
- ❌ Resolve without understanding context
- ❌ Forget to test after resolution
- ❌ Commit immediately without review

---

### Q2: `git status` hiển thị gì khi có conflict? / What does `git status` show during conflicts?

#### Mục đích / Purpose

Biết cách xác định trạng thái repository khi có conflict.

Know how to identify repository state during conflicts.

#### Khi nào dùng / When to use

Khi cần kiểm tra xem có file nào đang conflict.

When needing to check which files have conflicts.

#### Giá trị gì / Benefits

- Xác định nhanh các file conflict
- Hiểu trạng thái merge/rebase
- Biết các bước tiếp theo cần làm

- Quickly identify conflicting files
- Understand merge/rebase state
- Know next steps to take

#### Định nghĩa / Definition

Khi có conflict, `git status` hiển thị:

```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/app.js
        both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

Khi có conflict, `git status` shows:

```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/app.js
        both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

#### Ví dụ / Examples

**Trước khi resolve:**

```bash
$ git status
On branch feature
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   utils.js
        deleted by us:    old-file.js
        added by them:    new-file.js
```

**Sau khi resolve một file:**

```bash
$ git status
On branch feature
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   utils.js

Changes to be committed:
        new file:   new-file.js
        deleted:    old-file.js
```

#### Best Practices

1. **Luôn chạy `git status`** sau khi merge
2. **Xem kỹ danh sách** các file conflict
3. **Resolve từng file một** và add ngay
4. **Kiểm tra status thường xuyên** trong quá trình resolve

5. **Always run `git status`** after merging
6. **Carefully review list** of conflicting files
7. **Resolve one file at a time** and add immediately
8. **Check status frequently** during resolution process

#### Anti-patterns

- ❌ Bỏ qua `git status` và resolve ngẫu nhiên
- ❌ Không hiểu ý nghĩa của "both modified", "added by us", "deleted by them"
- ❌ Quên add file sau khi resolve
- ❌ Không kiểm tra status trước khi commit

- ❌ Skip `git status` and resolve randomly
- ❌ Don't understand meaning of "both modified", "added by us", "deleted by them"
- ❌ Forget to add file after resolving
- ❌ Don't check status before committing

---

### Q3: Cách resolve conflicts manually? / How to resolve conflicts manually?

#### Mục đích / Purpose

Biết quy trình từng bước để resolve conflicts bằng tay.

Know the step-by-step process to manually resolve conflicts.

#### Khi nào dùng / When to use

- Khi không có hoặc không muốn dùng mergetool
- Khi muốn kiểm soát chi tiết từng thay đổi
- Khi conflicts đơn giản và dễ hiểu

- When mergetool is not available or not preferred
- When wanting detailed control over each change
- When conflicts are simple and straightforward

#### Giá trị gì / Benefits

- Hiểu sâu về nội dung conflict
- Học cách đọc và phân tích code
- Có thể apply logic tùy chỉnh
- Không phụ thuộc vào công cụ

- Deep understanding of conflict content
- Learn to read and analyze code
- Can apply custom logic
- Not dependent on tools

#### Định nghĩa / Definition

Quy trình resolve conflicts thủ công:

1. **Xác định file conflict**: Chạy `git status`
2. **Mở file conflict**: Tìm các conflict markers
3. **Phân tích nội dung**: Hiểu ý nghĩa của mỗi phiên bản
4. **Resolve conflict**: Chọn, kết hợp hoặc viết mới
5. **Xóa markers**: Loại bỏ tất cả conflict markers
6. **Stage file**: Chạy `git add <file>`
7. **Commit**: Chạy `git commit` (hoặc `git merge --continue`)

Manual conflict resolution process:

1. **Identify conflicting files**: Run `git status`
2. **Open conflicting file**: Find conflict markers
3. **Analyze content**: Understand meaning of each version
4. **Resolve conflict**: Choose, combine, or rewrite
5. **Remove markers**: Delete all conflict markers
6. **Stage file**: Run `git add <file>`
7. **Commit**: Run `git commit` (or `git merge --continue`)

#### Ví dụ / Examples

**Conflict gốc:**

```javascript
function getUser(id) {
<<<<<<< HEAD
    return users.find(u => u.id === id);
=======
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
>>>>>>> feature-validation
}
```

**Resolve - Kết hợp cả hai:**

```javascript
function getUser(id) {
  const user = users.find((u) => u.id === id);
  if (!user) throw new Error("User not found");
  return user;
}
```

**Commands:**

```bash
# 1. Kiểm tra conflicts
git status

# 2. Mở file và resolve
vim src/app.js

# 3. Sau khi resolve, stage file
git add src/app.js

# 4. Commit merge
git commit
# Hoặc:
git merge --continue
```

#### Best Practices

1. **Hiểu rõ business logic** trước khi resolve
2. **Thảo luận với author** nếu không chắc
3. **Test kỹ** sau khi resolve
4. **Giữ commit message** mặc định hoặc viết rõ ràng
5. **Resolve từng file một** để tránh nhầm lẫn

6. **Understand business logic clearly** before resolving
7. **Discuss with author** if unsure
8. **Test thoroughly** after resolution
9. **Keep default commit message** or write clearly
10. **Resolve one file at a time** to avoid confusion

#### Anti-patterns

- ❌ Chọn phiên bản mà không hiểu
- ❌ Quên xóa conflict markers
- ❌ Resolve nhiều file cùng lúc
- ❌ Không test sau khi resolve
- ❌ Commit với message không rõ ràng

- ❌ Choose version without understanding
- ❌ Forget to remove conflict markers
- ❌ Resolve multiple files at once
- ❌ Don't test after resolution
- ❌ Commit with unclear message

---

### Q4: `git mergetool` làm gì? / What does `git mergetool` do?

#### Mục đích / Purpose

Biết cách sử dụng công cụ merge tích hợp để resolve conflicts hiệu quả hơn.

Know how to use integrated merge tools to resolve conflicts more efficiently.

#### Khi nào dùng / When to use

- Khi muốn so sánh trực quan các phiên bản
- Khi conflicts phức tạp và nhiều file
- Khi muốn có GUI hỗ trợ

- When wanting visual comparison of versions
- When conflicts are complex and multiple files
- When wanting GUI support

#### Giá trị gì / Benefits

- Giao diện trực quan, dễ hiểu
- So sánh side-by-side các phiên bản
- Resolve nhanh hơn
- Giảm sai sót do nhầm lẫn

- Intuitive, easy-to-understand interface
- Side-by-side version comparison
- Faster resolution
- Reduce errors from confusion

#### Định nghĩa / Definition

`git mergetool` chạy một chương trình merge tool (GUI) để giúp resolve conflicts:

```bash
git mergetool
```

Git hỗ trợ nhiều mergetools: vimdiff, opendiff, kdiff3, meld, beyond compare, etc.

`git mergetool` runs a merge tool program (GUI) to help resolve conflicts:

```bash
git mergetool
```

Git supports many mergetools: vimdiff, opendiff, kdiff3, meld, beyond compare, etc.

#### Ví dụ / Examples

**Cấu hình mergetool:**

```bash
# Cấu hình mergetool mặc định
git config --global merge.tool vimdiff

# Hoặc sử dụng meld
git config --global merge.tool meld

# Xem danh sách mergetools có sẵn
git mergetool --tool-help
```

**Sử dụng mergetool:**

```bash
# Chạy mergetool cho tất cả conflicts
git mergetool

# Chạy cho file cụ thể
git mergetool src/app.js

# Sau khi resolve với mergetool
git commit
```

**Vimdiff layout:**

```
┌────────────────────────────────────────────────────────────┐
│ LOCAL (HEAD)    BASE (common ancestor)    REMOTE (merge)  │
│                  (không có thay đổi)                       │
│                  ┌──────────────────────┐                  │
│                  │     MERGED RESULT    │                  │
│                  │   (kết quả sau khi    │                  │
│                  │   bạn chỉnh sửa)      │                  │
│                  └──────────────────────┘                  │
└────────────────────────────────────────────────────────────┘
```

#### Best Practices

1. **Cấu hình mergetool yêu thích** trước khi cần
2. **Học các phím tắt** của mergetool
3. **Review kỹ** kết quả sau khi merge
4. **Lưu file** và đóng tool khi hoàn thành
5. **Commit ngay** sau khi resolve xong

6. **Configure favorite mergetool** before needed
7. **Learn keyboard shortcuts** of mergetool
8. **Review carefully** result after merging
9. **Save file** and close tool when done
10. **Commit immediately** after resolution

#### Anti-patterns

- ❌ Không cấu hình mergetool trước
- ❌ Không hiểu layout của mergetool
- ❌ Quên save file trước khi đóng
- ❌ Không review kết quả sau khi merge
- ❌ Dùng mergetool cho conflicts đơn giản

- ❌ Don't configure mergetool beforehand
- ❌ Don't understand mergetool layout
- ❌ Forget to save file before closing
- ❌ Don't review result after merging
- ❌ Use mergetool for simple conflicts

---

### Q5: `git merge --continue` làm gì? / What does `git merge --continue` do?

#### Mục đích / Purpose

Biết cách hoàn thành quá trình merge sau khi resolve xong tất cả conflicts.

Know how to complete merge process after resolving all conflicts.

#### Khi nào dùng / When to use

- Sau khi đã resolve và stage tất cả conflicts
- Khi muốn hoàn thành merge mà không cần chạy `git commit`

- After resolving and staging all conflicts
- When wanting to complete merge without running `git commit`

#### Giá trị gì / Benefits

- Lệnh rõ ràng, dễ hiểu
- Tương đương với `git commit` nhưng ý nghĩa hơn
- Phù hợp với workflow merge/rebase

- Clear, easy-to-understand command
- Equivalent to `git commit` but more meaningful
- Fits merge/rebase workflow

#### Định nghĩa / Definition

`git merge --continue` hoàn thành quá trình merge sau khi resolve conflicts:

```bash
git merge --continue
```

Lệnh này tương đương với `git commit` khi đang trong trạng thái merge conflict.

`git merge --continue` completes merge process after resolving conflicts:

```bash
git merge --continue
```

This command is equivalent to `git commit` when in merge conflict state.

#### Ví dụ / Examples

**Quy trình hoàn chỉnh:**

```bash
# 1. Bắt đầu merge
git merge feature-branch

# 2. Có conflicts xảy ra
Auto-merging src/app.js
CONFLICT (content): Merge conflict in src/app.js
Automatic merge failed; fix conflicts and then commit the result.

# 3. Resolve conflicts
vim src/app.js
# ... chỉnh sửa file ...

# 4. Stage file đã resolve
git add src/app.js

# 5. Hoàn thành merge
git merge --continue
# Hoặc:
git commit
```

**Tương tự với rebase:**

```bash
# 1. Bắt đầu rebase
git rebase main

# 2. Resolve conflicts
vim src/app.js
git add src/app.js

# 3. Tiếp tục rebase
git rebase --continue
```

#### Best Practices

1. **Đảm bảo tất cả conflicts đã được resolve** trước khi continue
2. **Stage tất cả files** đã resolve
3. **Review changes** một lần cuối trước khi continue
4. **Kiểm tra commit message** và chỉnh sửa nếu cần

5. **Ensure all conflicts resolved** before continuing
6. **Stage all resolved files**
7. **Review changes** one last time before continuing
8. **Check commit message** and edit if needed

#### Anti-patterns

- ❌ Chạy `--continue` khi còn conflicts
- ❌ Quên stage file đã resolve
- ❌ Không review trước khi continue
- ❌ Dùng `--continue` khi không trong trạng thái merge

- ❌ Run `--continue` when conflicts remain
- ❌ Forget to stage resolved files
- ❌ Don't review before continuing
- ❌ Use `--continue` when not in merge state

---

### Q6: `git merge --abort` làm gì? / What does `git merge --abort` do?

#### Mục đích / Purpose

Biết cách hủy bỏ quá trình merge khi gặp conflicts hoặc muốn thử lại.

Know how to abort merge process when encountering conflicts or wanting to retry.

#### Khi nào dùng / When to use

- Khi conflicts quá phức tạp và muốn thử cách khác
- Khi nhận ra merge sai nhánh
- Khi muốn quay về trạng thái trước khi merge

- When conflicts are too complex and want to try another way
- When realizing merging wrong branch
- When wanting to return to state before merge

#### Giá trị gì / Benefits

- Quay lại trạng thái an toàn
- Thử lại merge với chiến lược khác
- Không làm mất code đang làm việc

- Return to safe state
- Retry merge with different strategy
- Don't lose work in progress

#### Định nghĩa / Definition

`git merge --abort` hủy bỏ quá trình merge hiện tại và quay về trạng thái trước khi merge:

```bash
git merge --abort
```

Lệnh này reset HEAD và index về trạng thái trước khi merge, giữ lại working directory.

`git merge --abort` aborts current merge process and returns to state before merge:

```bash
git merge --abort
```

This command resets HEAD and index to state before merge, keeping working directory.

#### Ví dụ / Examples

**Quy trình abort merge:**

```bash
# 1. Bắt đầu merge
git merge feature-branch

# 2. Có nhiều conflicts xảy ra
CONFLICT (content): Merge conflict in src/app.js
CONFLICT (content): Merge conflict in utils.js
CONFLICT (content): Merge conflict in README.md

# 3. Quyết định abort và thử lại
git merge --abort

# 4. Kiểm tra trạng thái
git status
# On branch main
# nothing to commit, working tree clean

# 5. Thử lại với chiến lược khác
git merge --no-ff feature-branch
```

**So sánh với `git reset --hard`:**

```bash
# git merge --abort: Giữ working directory, chỉ reset merge state
git merge --abort

# git reset --hard HEAD: Reset cả working directory về commit
git reset --hard HEAD
```

#### Best Practices

1. **Sử dụng `--abort`** thay vì `reset --hard` khi muốn giữ working directory
2. **Review conflicts** trước khi quyết định abort
3. **Thảo luận với team** nếu conflicts quá phức tạp
4. **Thử lại với rebase** nếu merge không hiệu quả

5. **Use `--abort`** instead of `reset --hard` when wanting to keep working directory
6. **Review conflicts** before deciding to abort
7. **Discuss with team** if conflicts are too complex
8. **Try with rebase** if merge is ineffective

#### Anti-patterns

- ❌ Dùng `--abort` quá thường xuyên thay vì học resolve
- ❌ Không hiểu khác biệt giữa `--abort` và `reset --hard`
- ❌ Abort mà không lưu lại thông tin conflicts
- ❌ Quên `--abort` và làm mất code

- ❌ Use `--abort` too often instead of learning to resolve
- ❌ Don't understand difference between `--abort` and `reset --hard`
- ❌ Abort without saving conflict information
- ❌ Forget `--abort` and lose code

---

### Q7: Best practices để tránh conflicts? / Best practices to avoid conflicts?

#### Mục đích / Purpose

Biết các phương pháp để giảm thiểu và tránh conflicts trong Git.

Know methods to minimize and avoid conflicts in Git.

#### Khi nào dùng / When to use

Luôn áp dụng trong quá trình phát triển để làm việc hiệu quả hơn.

Always apply during development to work more efficiently.

#### Giá trị gì / Benefits

- Giảm thời gian resolve conflicts
- Làm việc mượt mà hơn với team
- Duy trì lịch sử commit sạch sẽ
- Tăng hiệu suất team

- Reduce conflict resolution time
- Smoother team collaboration
- Maintain clean commit history
- Increase team productivity

#### Định nghĩa / Definition

Các best practices để tránh conflicts:

1. **Pull thường xuyên**: Luôn pull latest changes trước khi bắt đầu làm việc
2. **Commit nhỏ và thường xuyên**: Giảm phạm vi conflicts
3. **Làm việc trên các feature branches riêng biệt**: Giảm xung đột trực tiếp
4. **Communicate với team**: Thông báo về các thay đổi lớn
5. **Review code trước khi merge**: Phát hiện conflicts sớm
6. **Sử dụng rebase cho local branches**: Giữ lịch sử tuyến tính
7. **Tránh thay đổi cùng file trên nhiều branches**: Tách logic rõ ràng

Best practices to avoid conflicts:

1. **Pull frequently**: Always pull latest changes before starting work
2. **Commit small and often**: Reduce conflict scope
3. **Work on separate feature branches**: Reduce direct conflicts
4. **Communicate with team**: Notify about major changes
5. **Review code before merging**: Detect conflicts early
6. **Use rebase for local branches**: Keep linear history
7. **Avoid changing same file on multiple branches**: Separate logic clearly

#### Ví dụ / Examples

**Workflow tránh conflicts:**

```bash
# 1. Pull latest changes trước khi làm việc
git pull origin main

# 2. Tạo feature branch mới
git checkout -b feature/user-auth

# 3. Commit nhỏ và thường xuyên
git add src/auth/login.js
git commit -m "feat: add login function"

git add src/auth/register.js
git commit -m "feat: add register function"

# 4. Rebase trước khi merge
git fetch origin
git rebase origin/main

# 5. Resolve conflicts nếu có (ít hơn nhờ rebase thường xuyên)
# ... resolve conflicts ...

# 6. Merge hoặc tạo PR
git checkout main
git merge feature/user-auth
```

**Communication trong team:**

```markdown
# Team Slack channel

@everyone: Tôi đang làm việc trên file src/api/users.js, sẽ thay đổi cấu trúc user object. Nếu ai cũng cần thay đổi file này, hãy thông báo để chúng ta phối hợp.

# Team Slack channel

@everyone: I'm working on src/api/users.js file, will change user object structure. If anyone also needs to change this file, please notify so we can coordinate.
```

#### Best Practices

1. **Pull trước khi push**: Luôn sync với remote
2. **Rebase thường xuyên**: Giữ local branch up-to-date
3. **Tách features**: Mỗi branch làm một feature
4. **Review code**: Phát hiện conflicts sớm trong PR
5. **Communicate**: Thông báo về thay đổi lớn
6. **Atomic commits**: Mỗi commit làm một việc
7. **Test trước khi merge**: Đảm bảo code hoạt động

8. **Pull before push**: Always sync with remote
9. **Rebase frequently**: Keep local branch up-to-date
10. **Separate features**: One feature per branch
11. **Review code**: Detect conflicts early in PR
12. **Communicate**: Notify about major changes
13. **Atomic commits**: One task per commit
14. **Test before merge**: Ensure code works

#### Anti-patterns

- ❌ Làm việc trực tiếp trên main/master
- ❌ Commit lớn, ít thường xuyên
- ❌ Không pull trong nhiều ngày
- ❌ Thay đổi cùng file trên nhiều branches
- ❌ Không communicate với team
- ❌ Force push thay vì resolve conflicts

- ❌ Work directly on main/master
- ❌ Large, infrequent commits
- ❌ Don't pull for many days
- ❌ Change same file on multiple branches
- ❌ Don't communicate with team
- ❌ Force push instead of resolving conflicts

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`) đánh dấu các phần code không thể tự động merge
2. **`git status`** hiển thị danh sách các file đang conflict
3. **Manual resolution** bao gồm: mở file, phân tích, chỉnh sửa, xóa markers, stage, commit
4. **`git mergetool`** cung cấp GUI để resolve conflicts hiệu quả hơn
5. **`git merge --continue`** hoàn thành merge sau khi resolve xong
6. **`git merge --abort`** hủy bỏ merge và quay về trạng thái trước đó
7. **Best practices** để tránh conflicts: pull thường xuyên, commit nhỏ, communicate với team

8. **Conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`) mark code sections that cannot be automatically merged
9. **`git status`** shows list of conflicting files
10. **Manual resolution** includes: open file, analyze, edit, remove markers, stage, commit
11. **`git mergetool`** provides GUI for more efficient conflict resolution
12. **`git merge --continue`** completes merge after resolving conflicts
13. **`git merge --abort`** cancels merge and returns to previous state
14. **Best practices** to avoid conflicts: pull frequently, commit small, communicate with team

### Commands Reference / Tham khảo lệnh

```bash
# Xem trạng thái conflicts
git status

# Resolve thủ công
vim <file>
git add <file>
git commit
# Hoặc:
git merge --continue

# Sử dụng mergetool
git mergetool

# Hủy bỏ merge
git merge --abort

# Cấu hình mergetool
git config --global merge.tool <tool-name>
git mergetool --tool-help
```

### Best Practices / Thực hành tốt nhất

1. **Hiểu rõ nguyên nhân** của conflict trước khi resolve
2. **Thảo luận với team** khi conflicts phức tạp
3. **Test kỹ** sau khi resolve
4. **Sử dụng mergetool** cho conflicts phức tạp
5. **Pull và rebase thường xuyên** để tránh conflicts
6. **Communicate** về thay đổi lớn với team
7. **Keep commits atomic** để dễ resolve

8. **Understand root cause** of conflict before resolving
9. **Discuss with team** when conflicts are complex
10. **Test thoroughly** after resolution
11. **Use mergetool** for complex conflicts
12. **Pull and rebase frequently** to avoid conflicts
13. **Communicate** about major changes with team
14. **Keep commits atomic** for easier resolution
