# Git Reflog / Git Reflog

> Hướng dẫn chi tiết về cách sử dụng git reflog để khôi phục lost commits và theo dõi lịch sử sử dụng Git / Comprehensive guide to using git reflog to recover lost commits and track Git usage history

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng `git reflog` để khôi phục các commits đã mất và theo dõi lịch sử thay đổi của HEAD.

Understand how to use `git reflog` to recover lost commits and track HEAD change history.

### Khi nào cần hiểu / When to understand

- Khi lỡ reset hoặc rebase và mất commits
- Khi muốn khôi phục deleted branches
- Khi cần xem lịch sử di chuyển của HEAD
- Khi muốn khôi phục về trạng thái trước đó

- When accidentally resetting or rebasing and losing commits
- When wanting to recover deleted branches
- When needing to view HEAD movement history
- When wanting to restore to previous state

### Giá trị gì / Benefits

- Khôi phục lost commits và branches
- Xem lịch sử đầy đủ của HEAD
- An toàn hơn khi làm việc với Git
- Có thể undo các thao tác nguy hiểm

- Recover lost commits and branches
- View complete HEAD history
- Safer when working with Git
- Can undo dangerous operations

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Khôi phục được hầu hết lost commits
- Lịch sử đầy đủ của mọi thao tác
- Tích hợp sẵn trong Git
- Không cần cài thêm công cụ

**Nhược điểm / Cons:**

- Reflog có expiration (mặc định 90 ngày)
- Chỉ hoạt động trên local repository
- Output có thể dài và khó đọc
- Không thể khôi phục nếu garbage collection đã chạy

**Pros:**

- Can recover most lost commits
- Complete history of all operations
- Built into Git
- No need to install additional tools

**Cons:**

- Reflog has expiration (default 90 days)
- Only works on local repository
- Output can be long and hard to read
- Cannot recover if garbage collection has run

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: `git reflog` là gì? / What is `git reflog`?

#### Mục đích / Purpose

Hiểu khái niệm và cơ chế hoạt động của git reflog.

Understand concept and mechanism of git reflog.

#### Khi nào dùng / When to use

Khi cần xem lịch sử thay đổi của HEAD hoặc khôi phục lost commits.

When needing to view HEAD change history or recover lost commits.

#### Giá trị gì / Benefits

- Biết cách Git lưu trữ lịch sử
- Có thể khôi phục lost commits
- Hiểu cơ chế hoạt động của Git

- Know how Git stores history
- Can recover lost commits
- Understand Git mechanism

#### Định nghĩa / Definition

`git reflog` (reference log) là bản ghi lịch sử mọi lần HEAD thay đổi:

```bash
git reflog
```

Mỗi khi bạn checkout, commit, reset, rebase, merge, Git sẽ ghi lại vào reflog. Reflog là một "safety net" cho các thao tác Git.

`git reflog` (reference log) is a record of every time HEAD changes:

```bash
git reflog
```

Every time you checkout, commit, reset, rebase, merge, Git records it in reflog. Reflog is a "safety net" for Git operations.

#### Ví dụ / Examples

**Output cơ bản:**

```bash
$ git reflog

abc1234 HEAD@{0}: commit: Add new feature
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: checkout: moving from main to feature
jkl3456 HEAD@{3}: reset: moving to main
mno7890 HEAD@{4}: commit: Initial commit
```

**Phân tích output:**

```
abc1234 HEAD@{0}: commit: Add new feature
│       │         │    │
│       │         │    └─ Action type (commit, checkout, reset, etc.)
│       │         └─────── Action description
│       └─────────────────── HEAD reference (HEAD@{n})
└─────────────────────────── Commit hash
```

**Các action types:**

- `commit`: Tạo commit mới
- `checkout`: Chuyển branch
- `reset`: Reset HEAD
- `rebase`: Rebase commits
- `merge`: Merge branches
- `amend`: Amend commit

#### Best Practices

1. **Luôn kiểm tra reflog** sau khi reset/rebase
2. **Hiểu action types** để đọc reflog dễ hơn
3. **Lưu commit hash** quan trọng trước khi thực hiện thao tác nguy hiểm
4. **Sử dụng reflog** như một safety net

5. **Always check reflog** after reset/rebase
6. **Understand action types** to read reflog easier
7. **Save important commit hashes** before dangerous operations
8. **Use reflog** as a safety net

#### Anti-patterns

- ❌ Không biết reflog tồn tại
- ❌ Không kiểm tra reflog sau khi reset
- ❌ Không hiểu action types
- ❌ Làm mất commits mà không có cách khôi phục

- ❌ Don't know reflog exists
- ❌ Don't check reflog after reset
- ❌ Don't understand action types
- ❌ Lose commits without recovery method

---

### Q2: `git reflog show HEAD` hiển thị gì? / What does `git reflog show HEAD` display?

#### Mục đích / Purpose

Hiểu cách xem reflog cho một reference cụ thể.

Understand how to view reflog for a specific reference.

#### Khi nào dùng / When to use

Khi muốn xem lịch sử của HEAD hoặc một branch cụ thể.

When wanting to view history of HEAD or specific branch.

#### Giá trị gì / Benefits

- Xem lịch sử cụ thể cho reference
- Lọc output theo nhu cầu
- Hiểu rõ hơn về reflog

- View specific history for reference
- Filter output by need
- Understand reflog better

#### Định nghĩa / Definition

`git reflog show <reference>` hiển thị reflog cho reference cụ thể:

```bash
git reflog show HEAD
git reflog show main
git reflog show feature
```

`git reflog show <reference>` displays reflog for specific reference:

```bash
git reflog show HEAD
git reflog show main
git reflog show feature
```

#### Ví dụ / Examples

**Reflog của HEAD:**

```bash
$ git reflog show HEAD

abc1234 HEAD@{0}: commit: Add new feature
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: checkout: moving from main to feature
jkl3456 HEAD@{3}: reset: moving to main
mno7890 HEAD@{4}: commit: Initial commit
```

**Reflog của branch:**

```bash
$ git reflog show main

abc1234 main@{0}: merge feature: Merge feature branch
def5678 main@{1}: checkout: moving from feature to main
ghi9012 main@{2}: commit: Update documentation
jkl3456 main@{3}: commit: Add README
```

**Reflog của remote branch:**

```bash
$ git reflog show origin/main

abc1234 origin/main@{0}: update by push
def5678 origin/main@{1}: update by push
ghi9012 origin/main@{2}: update by fetch
```

**So sánh reflog HEAD và branch:**

```bash
# HEAD reflog - bao gồm tất cả các thao tác
$ git reflog show HEAD

# Branch reflog - chỉ bao gồm các thao tác trên branch đó
$ git reflog show main
```

#### Best Practices

1. **Sử dụng reflog show HEAD** để xem đầy đủ
2. **Xem reflog của branch** để hiểu lịch sử branch đó
3. **Kết hợp với git log** để có context
4. **Lọc output** với grep khi cần

5. **Use reflog show HEAD** to view complete history
6. **View branch reflog** to understand that branch's history
7. **Combine with git log** for context
8. **Filter output** with grep when needed

#### Anti-patterns

- ❌ Không hiểu khác biệt giữa HEAD và branch reflog
- ❌ Không lọc output khi cần
- ❌ Không kết hợp với git log
- ❌ Xem reflog sai reference

- ❌ Don't understand difference between HEAD and branch reflog
- ❌ Don't filter output when needed
- ❌ Don't combine with git log
- ❌ View reflog of wrong reference

---

### Q3: `HEAD@{n}` syntax là gì? / What is `HEAD@{n}` syntax?

#### Mục đích / Purpose

Hiểu cách sử dụng syntax HEAD@{n} để tham chiếu đến các trạng thái trước đó của HEAD.

Understand how to use HEAD@{n} syntax to reference previous HEAD states.

#### Khi nào dùng / When to use

Khi muốn khôi phục về một trạng thái cụ thể trong reflog.

When wanting to restore to a specific state in reflog.

#### Giá trị gì / Benefits

- Khôi phục chính xác về trạng thái trước đó
- Tham chiếu đến bất kỳ trạng thái nào trong reflog
- An toàn và dễ sử dụng

- Restore accurately to previous state
- Reference any state in reflog
- Safe and easy to use

#### Định nghĩa / Definition

`HEAD@{n}` syntax tham chiếu đến trạng thái thứ n trong reflog:

```bash
HEAD@{0}  # Trạng thái hiện tại
HEAD@{1}  # Trạng thái trước đó
HEAD@{2}  # Trạng thái 2 bước trước
# ...
```

`HEAD@{n}` syntax references the nth state in reflog:

```bash
HEAD@{0}  # Current state
HEAD@{1}  # Previous state
HEAD@{2}  # State 2 steps back
# ...
```

#### Ví dụ / Examples

**Reflog:**

```bash
$ git reflog

abc1234 HEAD@{0}: commit: Add new feature
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: checkout: moving from main to feature
jkl3456 HEAD@{3}: reset: moving to main
mno7890 HEAD@{4}: commit: Initial commit
```

**Khôi phục về trạng thái trước đó:**

```bash
# Khôi phục về HEAD@{1} (trước commit hiện tại)
git reset --hard HEAD@{1}

# Khôi phục về HEAD@{2} (trước khi checkout feature)
git reset --hard HEAD@{2}

# Khôi phục về HEAD@{3} (trước khi reset)
git reset --hard HEAD@{3}
```

**Sử dụng với các lệnh khác:**

```bash
# Xem commit ở HEAD@{1}
git show HEAD@{1}

# Checkout branch ở HEAD@{2}
git checkout HEAD@{2}

# Diff với HEAD@{1}
git diff HEAD@{1}
```

**Relative references:**

```bash
# HEAD@{yesterday} - Trạng thái HEAD hôm qua
git show HEAD@{yesterday}

# HEAD@{2.weeks.ago} - Trạng thái HEAD 2 tuần trước
git show HEAD@{2.weeks.ago}

# HEAD@{"2024-01-15"} - Trạng thái HEAD vào ngày cụ thể
git show HEAD@{"2024-01-15"}
```

#### Best Practices

1. **Kiểm tra reflog** trước khi sử dụng HEAD@{n}
2. **Hiểu số thứ tự** trong reflog
3. **Sử dụng relative references** khi cần
4. **Test trước khi reset** với git show

5. **Check reflog** before using HEAD@{n}
6. **Understand numbering** in reflog
7. **Use relative references** when needed
8. **Test before reset** with git show

#### Anti-patterns

- ❌ Không kiểm tra reflog trước khi dùng HEAD@{n}
- ❌ Nhầm lẫn số thứ tự
- ❌ Reset mà không test trước
- ❌ Dùng HEAD@{n} sai

- ❌ Don't check reflog before using HEAD@{n}
- ❌ Confuse numbering
- ❌ Reset without testing first
- ❌ Use wrong HEAD@{n}

---

### Q4: Cách recover lost commits bằng reflog? / How to recover lost commits using reflog?

#### Mục đích / Purpose

Biết cách khôi phục các commits đã mất bằng reflog.

Know how to recover lost commits using reflog.

#### Khi nào dùng / When to use

- Khi lỡ reset và mất commits
- Khi rebase sai và mất commits
- Khi xóa branch và muốn khôi phục
- Khi amend commit và muốn khôi phục version cũ

- When accidentally resetting and losing commits
- When rebasing incorrectly and losing commits
- When deleting branch and wanting to recover
- When amending commit and wanting to recover old version

#### Giá trị gì / Benefits

- Khôi phục được hầu hết lost commits
- An toàn hơn khi làm việc với Git
- Không cần backup

- Can recover most lost commits
- Safer when working with Git
- No need for backup

#### Định nghĩa / Definition

Quy trình khôi phục lost commits:

1. **Xem reflog** để tìm commit cần khôi phục
2. **Copy commit hash** của commit đó
3. **Reset hoặc checkout** về commit đó
4. **Tạo branch mới** (nếu cần)

Process to recover lost commits:

1. **View reflog** to find commit to recover
2. **Copy commit hash** of that commit
3. **Reset or checkout** to that commit
4. **Create new branch** (if needed)

#### Ví dụ / Examples

**Kịch bản 1: Reset và mất commits**

```bash
# Trước khi reset
$ git log --oneline
abc1234 Add new feature
def5678 Fix bug
ghi9012 Initial commit

# Reset về commit cũ
$ git reset --hard ghi9012

# Commits abc1234 và def5678 đã mất

# Khôi phục bằng reflog
$ git reflog
abc1234 HEAD@{0}: reset: moving to ghi9012
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: commit: Initial commit

# Reset về HEAD@{1}
$ git reset --hard HEAD@{1}

# Commits đã khôi phục!
$ git log --oneline
def5678 Fix bug
ghi9012 Initial commit
```

**Kịch bản 2: Rebase và mất commits**

```bash
# Rebase sai
$ git rebase main
# Conflicts xảy ra, abort
$ git rebase --abort
# Commits đã mất

# Khôi phục bằng reflog
$ git reflog
abc1234 HEAD@{0}: rebase --abort: returning to abc1234
def5678 HEAD@{1}: rebase: checkout main
ghi9012 HEAD@{2}: commit: Add feature

# Khôi phục về HEAD@{2}
$ git reset --hard HEAD@{2}

# Tạo branch mới để giữ
$ git branch recovered-feature
```

**Kịch bản 3: Xóa branch và khôi phục**

```bash
# Xóa branch
$ git branch -D feature

# Khôi phục bằng reflog
$ git reflog
abc1234 HEAD@{0}: checkout: moving from feature to main
def5678 HEAD@{1}: commit: Add feature on feature branch

# Khôi phục branch
$ git branch feature def5678
```

**Kịch bản 4: Amend và muốn khôi phục version cũ**

```bash
# Amend commit
$ git commit --amend -m "Updated message"

# Version cũ đã mất

# Khôi phục bằng reflog
$ git reflog
abc1234 HEAD@{0}: commit: Updated message
def5678 HEAD@{1}: commit: Original message

# Xem version cũ
$ git show HEAD@{1}

# Khôi phục nếu cần
$ git reset --hard HEAD@{1}
```

#### Best Practices

1. **Luôn kiểm tra reflog** sau khi thực hiện thao tác nguy hiểm
2. **Tạo branch mới** sau khi khôi phục để giữ
3. **Test kỹ** trước khi reset
4. **Lưu commit hash** quan trọng

5. **Always check reflog** after dangerous operations
6. **Create new branch** after recovering to keep
7. **Test thoroughly** before resetting
8. **Save important commit hashes**

#### Anti-patterns

- ❌ Không kiểm tra reflog sau khi reset/rebase
- ❌ Không tạo branch mới sau khi khôi phục
- ❌ Reset mà không test trước
- ❌ Quên commit hash quan trọng

- ❌ Don't check reflog after reset/rebase
- ❌ Don't create new branch after recovering
- ❌ Reset without testing first
- ❌ Forget important commit hashes

---

### Q5: `git reset --hard HEAD@{n}` làm gì? / What does `git reset --hard HEAD@{n}` do?

#### Mục đích / Purpose

Hiểu cách reset về một trạng thái cụ thể trong reflog.

Understand how to reset to a specific state in reflog.

#### Khi nào dùng / When to use

Khi muốn khôi phục về một trạng thái trước đó được ghi trong reflog.

When wanting to restore to a previous state recorded in reflog.

#### Giá trị gì / Benefits

- Khôi phục nhanh về trạng thái trước đó
- Reset cả working directory và index
- An toàn và dễ sử dụng

- Quickly restore to previous state
- Reset both working directory and index
- Safe and easy to use

#### Định nghĩa / Definition

`git reset --hard HEAD@{n}` reset về trạng thái thứ n trong reflog:

```bash
git reset --hard HEAD@{n}
```

Lệnh này:

- Reset HEAD về commit đó
- Reset index (staging area)
- Reset working directory

`git reset --hard HEAD@{n}` resets to nth state in reflog:

```bash
git reset --hard HEAD@{n}
```

This command:

- Resets HEAD to that commit
- Resets index (staging area)
- Resets working directory

#### Ví dụ / Examples

**Reset về trạng thái trước đó:**

```bash
# Xem reflog
$ git reflog
abc1234 HEAD@{0}: commit: Add new feature
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: checkout: moving from main to feature

# Reset về HEAD@{1}
$ git reset --hard HEAD@{1}
HEAD is now at def5678 Fix bug
```

**Reset về trạng thái trước khi rebase:**

```bash
# Rebase thất bại
$ git rebase main
# Conflicts...

# Abort rebase
$ git rebase --abort

# Xem reflog
$ git reflog
abc1234 HEAD@{0}: rebase --abort: returning to abc1234
def5678 HEAD@{1}: rebase: checkout main
ghi9012 HEAD@{2}: commit: Add feature

# Reset về trước khi rebase
$ git reset --hard HEAD@{2}
```

**So sánh với các loại reset:**

```bash
# --soft: Chỉ reset HEAD, giữ changes
$ git reset --soft HEAD@{1}

# --mixed: Reset HEAD và index, giữ working directory
$ git reset --mixed HEAD@{1}
# Hoặc:
$ git reset HEAD@{1}

# --hard: Reset HEAD, index, và working directory
$ git reset --hard HEAD@{1}
```

#### Best Practices

1. **Kiểm tra reflog** trước khi reset
2. **Test với git show** trước khi reset --hard
3. **Hiểu khác biệt** giữa --soft, --mixed, --hard
4. **Tạo branch mới** trước khi reset --hard

5. **Check reflog** before resetting
6. **Test with git show** before reset --hard
7. **Understand difference** between --soft, --mixed, --hard
8. **Create new branch** before reset --hard

#### Anti-patterns

- ❌ Reset --hard mà không test trước
- ❌ Không hiểu khác biệt giữa các loại reset
- ❌ Không kiểm tra reflog trước
- ❌ Reset --hard mà không tạo branch backup

- ❌ Reset --hard without testing first
- ❌ Don't understand difference between reset types
- ❌ Don't check reflog before
- ❌ Reset --hard without creating backup branch

---

### Q6: Reflog expiration là gì? / What is reflog expiration?

#### Mục đích / Purpose

Hiểu cơ chế expiration của reflog và cách cấu hình.

Understand reflog expiration mechanism and how to configure.

#### Khi nào dùng / When to use

Khi cần cấu hình reflog retention hoặc hiểu giới hạn.

When needing to configure reflog retention or understand limitations.

#### Giá trị gì / Benefits

- Biết giới hạn của reflog
- Có thể cấu hình retention
- Hiểu khi reflog sẽ bị xóa

- Know reflog limitations
- Can configure retention
- Understand when reflog will be deleted

#### Định nghĩa / Definition

Reflog expiration là cơ chế tự động xóa các entries cũ trong reflog:

- **Mặc định**: 90 ngày cho reachable commits, 30 ngày cho unreachable commits
- **Cấu hình**: `gc.reflogExpire` và `gc.reflogExpireUnreachable`
- **Garbage collection**: `git gc` sẽ xóa các entries expired

Reflog expiration is automatic mechanism to delete old entries in reflog:

- **Default**: 90 days for reachable commits, 30 days for unreachable commits
- **Configuration**: `gc.reflogExpire` and `gc.reflogExpireUnreachable`
- **Garbage collection**: `git gc` will delete expired entries

#### Ví dụ / Examples

**Xem cấu hình hiện tại:**

```bash
$ git config --get gc.reflogExpire
90.days

$ git config --get gc.reflogExpireUnreachable
30.days
```

**Cấu hình reflog expiration:**

```bash
# Tăng retention lên 180 ngày
$ git config --global gc.reflogExpire "180.days"
$ git config --global gc.reflogExpireUnreachable "90.days"

# Giảm retention xuống 30 ngày
$ git config --global gc.reflogExpire "30.days"
$ git config --global gc.reflogExpireUnreachable "7.days"

# Tắt expiration (không khuyến khích)
$ git config --global gc.reflogExpire "never"
```

**Chạy garbage collection thủ công:**

```bash
# Chạy gc để xóa entries expired
$ git gc

# Chạy gc với verbose
$ git gc --verbose
```

**Kiểm tra reflog age:**

```bash
# Xem reflog với timestamp
$ git reflog --date=iso

abc1234 HEAD@{0}: commit: Add new feature (2024-01-20 10:30:45)
def5678 HEAD@{1}: commit: Fix bug (2024-01-19 14:20:30)
ghi9012 HEAD@{2}: checkout: moving from main (2024-01-18 09:15:22)
```

#### Best Practices

1. **Hiểu retention mặc định** và điều chỉnh theo nhu cầu
2. **Không tắt expiration** trừ khi cần thiết
3. **Chạy gc thường xuyên** để dọn dẹp
4. **Backup quan trọng** trước khi expiration

5. **Understand default retention** and adjust by need
6. **Don't disable expiration** unless necessary
7. **Run gc regularly** to clean up
8. **Backup important** before expiration

#### Anti-patterns

- ❌ Tắt expiration không cần thiết
- ❌ Không hiểu retention mặc định
- ❌ Không backup trước khi expiration
- ❌ Cấu hình retention quá ngắn

- ❌ Disable expiration unnecessarily
- ❌ Don't understand default retention
- ❌ Don't backup before expiration
- ❌ Configure retention too short

---

### Q7: `git reflog` khác `git log` như thế nào? / How does `git reflog` differ from `git log`?

#### Mục đích / Purpose

Hiểu sự khác biệt giữa reflog và log.

Understand the difference between reflog and log.

#### Khi nào dùng / When to use

Khi cần quyết định dùng reflog hay log cho tình huống cụ thể.

When needing to decide between reflog or log for specific situation.

#### Giá trị gì / Benefits

- Hiểu rõ công dụng của từng lệnh
- Sử dụng đúng lệnh cho đúng tình huống
- Tối ưu hóa workflow

- Understand purpose of each command
- Use correct command for correct situation
- Optimize workflow

#### Định nghĩa / Definition

**Sự khác biệt chính:**

| Đặc điểm     | git reflog                             | git log             |
| ------------ | -------------------------------------- | ------------------- |
| Nội dung     | Lịch sử thay đổi của HEAD              | Lịch sử commits     |
| Scope        | Local only                             | Local và remote     |
| Lost commits | Có thể khôi phục                       | Không thể khôi phục |
| Expiration   | Có expiration (90 ngày)                | Không có expiration |
| Action types | Tất cả (commit, checkout, reset, etc.) | Chỉ commits         |
| Branches     | HEAD và local branches                 | Tất cả branches     |

**Main differences:**

| Feature      | git reflog                          | git log          |
| ------------ | ----------------------------------- | ---------------- |
| Content      | HEAD change history                 | Commit history   |
| Scope        | Local only                          | Local and remote |
| Lost commits | Can recover                         | Cannot recover   |
| Expiration   | Has expiration (90 days)            | No expiration    |
| Action types | All (commit, checkout, reset, etc.) | Only commits     |
| Branches     | HEAD and local branches             | All branches     |

#### Ví dụ / Examples

**So sánh output:**

```bash
# git reflog
$ git reflog
abc1234 HEAD@{0}: commit: Add new feature
def5678 HEAD@{1}: checkout: moving from main to feature
ghi9012 HEAD@{2}: reset: moving to main
jkl3456 HEAD@{3}: commit: Fix bug

# git log
$ git log --oneline
abc1234 Add new feature
def5678 Fix bug
ghi9012 Initial commit
```

**Kịch bản: Reset và mất commits**

```bash
# Reset về commit cũ
$ git reset --hard ghi9012

# git log - không thấy lost commits
$ git log --oneline
ghi9012 Initial commit

# git reflog - vẫn thấy lost commits
$ git reflog
abc1234 HEAD@{0}: reset: moving to ghi9012
def5678 HEAD@{1}: commit: Fix bug
ghi9012 HEAD@{2}: commit: Initial commit
```

**Khi nào dùng reflog:**

```bash
# Khôi phục lost commits
$ git reflog
$ git reset --hard HEAD@{1}

# Xem lịch sử checkout
$ git reflog show HEAD

# Khôi phục về trạng thái trước đó
$ git reset --hard HEAD@{yesterday}
```

**Khi nào dùng log:**

```bash
# Xem lịch sử commits
$ git log --oneline

# Xem chi tiết commit
$ git show abc1234

# Tìm commit theo author
$ git log --author="John Doe"

# Tìm commit theo message
$ git log --grep="bug"
```

#### Best Practices

1. **Dùng reflog** để khôi phục lost commits
2. **Dùng log** để xem lịch sử commits
3. **Hiểu rõ khác biệt** giữa hai lệnh
4. **Kết hợp cả hai** để có bức tranh đầy đủ

5. **Use reflog** to recover lost commits
6. **Use log** to view commit history
7. **Understand clearly difference** between two commands
8. **Combine both** for full picture

#### Anti-patterns

- ❌ Dùng log để khôi phục lost commits
- ❌ Dùng reflog để xem lịch sử commits thông thường
- ❌ Không hiểu khác biệt giữa hai lệnh
- ❌ Dùng sai lệnh cho tình huống

- ❌ Use log to recover lost commits
- ❌ Use reflog to view normal commit history
- ❌ Don't understand difference between two commands
- ❌ Use wrong command for situation

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **`git reflog`** ghi lại lịch sử mọi lần HEAD thay đổi
2. **`git reflog show HEAD`** hiển thị reflog cho reference cụ thể
3. **`HEAD@{n}`** syntax tham chiếu đến trạng thái thứ n trong reflog
4. **Reflog có thể khôi phục** lost commits và branches
5. **`git reset --hard HEAD@{n}`** reset về trạng thái trong reflog
6. **Reflog có expiration** (mặc định 90 ngày cho reachable commits)
7. **`git reflog` khác `git log`** ở nội dung và scope

8. **`git reflog`** records history of every HEAD change
9. **`git reflog show HEAD`** displays reflog for specific reference
10. **`HEAD@{n}`** syntax references nth state in reflog
11. **Reflog can recover** lost commits and branches
12. **`git reset --hard HEAD@{n}`** resets to state in reflog
13. **Reflog has expiration** (default 90 days for reachable commits)
14. **`git reflog` differs from `git log`** in content and scope

### Commands Reference / Tham khảo lệnh

```bash
# Xem reflog
git reflog
git reflog show HEAD
git reflog show <branch-name>

# Sử dụng HEAD@{n}
git show HEAD@{n}
git reset --hard HEAD@{n}
git checkout HEAD@{n}

# Relative references
git show HEAD@{yesterday}
git show HEAD@{2.weeks.ago}
git show HEAD@{"2024-01-15"}

# Cấu hình expiration
git config --global gc.reflogExpire "<time>"
git config --global gc.reflogExpireUnreachable "<time>"

# Chạy garbage collection
git gc
git gc --verbose
```

### Best Practices / Thực hành tốt nhất

1. **Luôn kiểm tra reflog** sau khi reset/rebase
2. **Tạo branch mới** sau khi khôi phục từ reflog
3. **Hiểu retention mặc định** và điều chỉnh theo nhu cầu
4. **Dùng reflog** để khôi phục, dùng log để xem lịch sử
5. **Test trước khi reset --hard**
6. **Backup quan trọng** trước khi expiration
7. **Kết hợp reflog và log** để có bức tranh đầy đủ

8. **Always check reflog** after reset/rebase
9. **Create new branch** after recovering from reflog
10. **Understand default retention** and adjust by need
11. **Use reflog** to recover, use log to view history
12. **Test before reset --hard**
13. **Backup important** before expiration
14. **Combine reflog and log** for full picture
