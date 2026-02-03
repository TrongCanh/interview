# Git Clean / Git Clean

> Hướng dẫn chi tiết về cách sử dụng git clean để xóa untracked files / Comprehensive guide to using git clean to remove untracked files

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng `git clean` để xóa các untracked files và directories.

Understand how to use `git clean` to remove untracked files and directories.

### Khi nào cần hiểu / When to understand

- Khi cần dọn dẹp working directory
- Khi muốn xóa build artifacts
- Khi cần remove untracked files
- Khi muốn clean repository

- When needing to clean up working directory
- When wanting to remove build artifacts
- When needing to remove untracked files
- When wanting to clean repository

### Giá trị gì / Benefits

- Dọn dẹp working directory nhanh chóng
- Xóa untracked files hiệu quả
- Có nhiều options để tùy chỉnh
- Tránh commit files không cần thiết

- Quickly clean up working directory
- Efficiently remove untracked files
- Many options for customization
- Avoid committing unnecessary files

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Xóa untracked files nhanh
- Có nhiều options để kiểm soát
- Có dry run để xem trước
- Có interactive mode

**Nhược điểm / Cons:**

- Nguy hiểm nếu dùng sai
- Không thể undo sau khi xóa
- Cần cẩn thận với options
- Không xóa tracked files

**Pros:**

- Quickly remove untracked files
- Many options for control
- Has dry run to preview
- Has interactive mode

**Cons:**

- Dangerous if used incorrectly
- Cannot undo after deletion
- Need to be careful with options
- Doesn't remove tracked files

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: `git clean -f` làm gì? / What does `git clean -f` do?

#### Mục đích / Purpose

Hiểu cách sử dụng git clean với option -f để xóa untracked files.

Understand how to use git clean with -f option to remove untracked files.

#### Khi nào dùng / When to use

Khi cần xóa untracked files và muốn bypass confirmation.

When needing to remove untracked files and wanting to bypass confirmation.

#### Giá trị gì / Benefits

- Xóa untracked files nhanh
- Bypass confirmation prompt
- Dọn dẹp working directory

- Quickly remove untracked files
- Bypass confirmation prompt
- Clean up working directory

#### Định nghĩa / Definition

`git clean -f` xóa untracked files với force:

```bash
git clean -f
```

Option `-f` (force) cho phép xóa files mà không cần confirmation.

`git clean -f` removes untracked files with force:

```bash
git clean -f
```

Option `-f` (force) allows removing files without confirmation.

#### Ví dụ / Examples

**Xóa untracked files:**

```bash
# Xem untracked files
$ git status
Untracked files:
  temp.txt
  build/
  dist/

# Xóa untracked files
$ git clean -f
Removing temp.txt

# Kiểm tra lại
$ git status
Untracked files:
  build/
  dist/
```

**Xóa cả directories:**

```bash
# Chỉ xóa files, không xóa directories
$ git clean -f

# Xóa cả files và directories
$ git clean -f -d
Removing build/
Removing dist/
```

**Xóa files cụ thể:**

```bash
# Xóa tất cả untracked files
$ git clean -f

# Xóa files trong directory cụ thể
$ git clean -f build/

# Xóa files với pattern
$ git clean -f "*.log"
```

#### Best Practices

1. **Luôn chạy dry run** trước khi thực sự xóa
2. **Kiểm tra git status** trước khi clean
3. **Hiểu options** trước khi dùng
4. **Cẩn thận với force option**

5. **Always run dry run** before actually deleting
6. **Check git status** before cleaning
7. **Understand options** before using
8. **Be careful with force option**

#### Anti-patterns

- ❌ Chạy -f mà không kiểm tra trước
- ❌ Không hiểu options
- ❌ Xóa files quan trọng
- ❌ Không test với dry run

- ❌ Run -f without checking first
- ❌ Don't understand options
- ❌ Delete important files
- ❌ Don't test with dry run

---

### Q2: `git clean -fd` làm gì? / What does `git clean -fd` do?

#### Mục đích / Purpose

Hiểu cách xóa cả untracked files và directories.

Understand how to remove both untracked files and directories.

#### Khi nào dùng / When to use

Khi cần xóa tất cả untracked items (files và directories).

When needing to remove all untracked items (files and directories).

#### Giá trị gì / Benefits

- Xóa toàn bộ untracked items
- Dọn dẹp working directory hoàn toàn
- Tiết kiệm thời gian

- Remove all untracked items
- Completely clean up working directory
- Save time

#### Định nghĩa / Definition

`git clean -fd` xóa untracked files và directories với force:

```bash
git clean -fd
```

- `-f`: Force xóa
- `-d`: Xóa cả directories

`git clean -fd` removes untracked files and directories with force:

```bash
git clean -fd
```

- `-f`: Force deletion
- `-d`: Remove directories as well

#### Ví dụ / Examples

**Xóa cả files và directories:**

```bash
# Xem untracked items
$ git status
Untracked files:
  temp.txt
  build/
  dist/
  node_modules/

# Xóa cả files và directories
$ git clean -fd
Removing temp.txt
Removing build/
Removing dist/
Removing node_modules/

# Kiểm tra lại
$ git status
nothing to commit, working tree clean
```

**So sánh các options:**

```bash
# Chỉ xóa files
$ git clean -f
Removing temp.txt

# Xóa files và directories
$ git clean -fd
Removing temp.txt
Removing build/

# Xóa cả ignored files
$ git clean -fdx
Removing temp.txt
Removing build/
Removing .DS_Store
```

**Xóa directories cụ thể:**

```bash
# Xóa tất cả untracked directories
$ git clean -fd

# Xóa directories trong path cụ thể
$ git clean -fd build/
```

#### Best Practices

1. **Luôn chạy dry run** trước khi thực sự xóa
2. **Kiểm tra directories** trước khi xóa
3. **Hiểu options** -f và -d
4. **Cẩn thận với node_modules, dist, build**

5. **Always run dry run** before actually deleting
6. **Check directories** before deleting
7. **Understand options** -f and -d
8. **Be careful with node_modules, dist, build**

#### Anti-patterns

- ❌ Chạy -fd mà không kiểm tra trước
- ❌ Không hiểu options
- ❌ Xóa directories quan trọng
- ❌ Không test với dry run

- ❌ Run -fd without checking first
- ❌ Don't understand options
- ❌ Delete important directories
- ❌ Don't test with dry run

---

### Q3: `git clean -n` (dry run) làm gì? / What does `git clean -n` (dry run) do?

#### Mục đích / Purpose

Hiểu cách xem trước những gì sẽ bị xóa.

Understand how to preview what will be deleted.

#### Khi nào dùng / When to use

Luôn luôn nên dùng trước khi thực sự xóa.

Always should use before actually deleting.

#### Giá trị gì / Benefits

- Xem trước những gì sẽ bị xóa
- Tránh xóa nhầm
- An toàn hơn

- Preview what will be deleted
- Avoid accidental deletion
- Safer

#### Định nghĩa / Definition

`git clean -n` (dry run) hiển thị những gì sẽ bị xóa mà không thực sự xóa:

```bash
git clean -n
```

Option `-n` (dry run) chỉ hiển thị, không xóa.

`git clean -n` (dry run) displays what will be deleted without actually deleting:

```bash
git clean -n
```

Option `-n` (dry run) only displays, doesn't delete.

#### Ví dụ / Examples

**Dry run trước khi xóa:**

```bash
# Xem những gì sẽ bị xóa
$ git clean -n -fd
Would remove temp.txt
Would remove build/
Would remove dist/

# Nếu OK, thực sự xóa
$ git clean -fd
Removing temp.txt
Removing build/
Removing dist/
```

**Kết hợp với các options khác:**

```bash
# Dry run với -fd
$ git clean -n -fd
Would remove temp.txt
Would remove build/

# Dry run với -x (include ignored)
$ git clean -n -fdx
Would remove temp.txt
Would remove build/
Would remove .DS_Store
Would remove node_modules/
```

**So sánh dry run và thực sự xóa:**

```bash
# Dry run
$ git clean -n
Would remove temp.txt

# Thực sự xóa
$ git clean -f
Removing temp.txt
```

#### Best Practices

1. **Luôn chạy dry run** trước khi thực sự xóa
2. **Kiểm tra kỹ** những gì sẽ bị xóa
3. **Kết hợp -n với các options khác**
4. **Chỉ thực sự xóa** khi đã kiểm tra kỹ

5. **Always run dry run** before actually deleting
6. **Check carefully** what will be deleted
7. **Combine -n with other options**
8. **Only actually delete** when checked thoroughly

#### Anti-patterns

- ❌ Không chạy dry run trước
- ❌ Không kiểm tra những gì sẽ bị xóa
- ❌ Xóa ngay mà không xem trước
- ❌ Không hiểu lợi ích của dry run

- ❌ Don't run dry run before
- ❌ Don't check what will be deleted
- ❌ Delete immediately without previewing
- ❌ Don't understand benefits of dry run

---

### Q4: `git clean -x` (remove ignored files) làm gì? / What does `git clean -x` (remove ignored files) do?

#### Mục đích / Purpose

Hiểu cách xóa cả ignored files.

Understand how to remove ignored files as well.

#### Khi nào dùng / When to use

Khi cần xóa cả ignored files như .DS_Store, node_modules, etc.

When needing to remove ignored files like .DS_Store, node_modules, etc.

#### Giá trị gì / Benefits

- Xóa tất cả untracked items
- Dọn dẹp hoàn toàn working directory
- Xóa cả system files

- Remove all untracked items
- Completely clean up working directory
- Remove system files as well

#### Định nghĩa / Definition

`git clean -x` xóa cả ignored files:

```bash
git clean -x
```

Option `-x` (ignored) cho phép xóa cả files được ignore bởi .gitignore.

`git clean -x` removes ignored files as well:

```bash
git clean -x
```

Option `-x` (ignored) allows removing files ignored by .gitignore.

#### Ví dụ / Examples

**Xóa cả ignored files:**

```bash
# Xem untracked files
$ git status
Untracked files:
  temp.txt

# Xóa cả ignored files
$ git clean -x
Removing temp.txt
Removing .DS_Store
Removing .vscode/
```

**Kết hợp với các options khác:**

```bash
# Dry run với -x
$ git clean -n -x
Would remove temp.txt
Would remove .DS_Store
Would remove .vscode/

# Xóa với force và directories
$ git clean -fdx
Removing temp.txt
Removing .DS_Store
Removing .vscode/
Removing node_modules/
```

**So sánh với và không có -x:**

```bash
# Không có -x
$ git clean -fd
Removing temp.txt
Removing build/

# Có -x
$ git clean -fdx
Removing temp.txt
Removing build/
Removing .DS_Store
Removing .vscode/
Removing node_modules/
```

#### Best Practices

1. **Cẩn thận với -x** - sẽ xóa cả ignored files
2. **Luôn chạy dry run** trước khi dùng -x
3. **Hiểu .gitignore** trước khi dùng -x
4. **Chỉ dùng -x** khi thực sự cần

5. **Be careful with -x** - will remove ignored files too
6. **Always run dry run** before using -x
7. **Understand .gitignore** before using -x
8. **Only use -x** when really needed

#### Anti-patterns

- ❌ Dùng -x mà không hiểu .gitignore
- ❌ Không chạy dry run trước
- ❌ Xóa node_modules khi không cần
- ❌ Không cẩn thận với -x

- ❌ Use -x without understanding .gitignore
- ❌ Don't run dry run before
- ❌ Delete node_modules when not needed
- ❌ Don't be careful with -x

---

### Q5: `git clean -i` (interactive) làm gì? / What does `git clean -i` (interactive) do?

#### Mục đích / Purpose

Hiểu cách sử dụng interactive mode để chọn từng item để xóa.

Understand how to use interactive mode to select each item to delete.

#### Khi nào dùng / When to use

Khi muốn kiểm soát từng item sẽ bị xóa.

When wanting to control each item that will be deleted.

#### Giá trị gì / Benefits

- Chọn từng item để xóa
- An toàn hơn
- Có nhiều options cho từng item

- Select each item to delete
- Safer
- Many options for each item

#### Định nghĩa / Definition

`git clean -i` (interactive) cho phép chọn từng item để xóa:

```bash
git clean -i
```

Interactive mode hiển thị menu với các options cho từng item.

`git clean -i` (interactive) allows selecting each item to delete:

```bash
git clean -i
```

Interactive mode displays menu with options for each item.

#### Ví dụ / Examples

**Interactive mode:**

```bash
$ git clean -i

Would remove the following items:
  temp.txt
  build/
  dist/

*** Commands ***
  1: clean                2: filter by pattern
  3: select by numbers    4: ask each
  5: quit                6: help

What now> 1
```

**Các options trong interactive mode:**

```bash
# 1: clean - Xóa tất cả
What now> 1

# 2: filter by pattern - Lọc theo pattern
What now> 2
input_pattern> *.log

# 3: select by numbers - Chọn theo số
What now> 3
Select items to delete (1-3): 1,3

# 4: ask each - Hỏi từng cái
What now> 4
Remove temp.txt? [y/N] y
Remove build/? [y/N] n
Remove dist/? [y/N] y

# 5: quit - Thoát
What now> 5

# 6: help - Trợ giúp
What now> 6
```

#### Best Practices

1. **Dùng interactive mode** khi không chắc chắn
2. **Hiểu các options** trong interactive mode
3. **Chọn kỹ** từng item
4. **Sử dụng filter** khi cần

5. **Use interactive mode** when unsure
6. **Understand options** in interactive mode
7. **Carefully select** each item
8. **Use filter** when needed

#### Anti-patterns

- ❌ Không hiểu options trong interactive mode
- ❌ Chọn nhanh mà không kiểm tra
- ❌ Không sử dụng filter khi cần
- ❌ Thoát sớm mà không xóa

- ❌ Don't understand options in interactive mode
- ❌ Select quickly without checking
- ❌ Don't use filter when needed
- ❌ Exit early without deleting

---

### Q6: Cách remove untracked files? / How to remove untracked files?

#### Mục đích / Purpose

Biết các cách khác nhau để remove untracked files.

Know different ways to remove untracked files.

#### Khi nào dùng / When to use

Khi cần xóa untracked files với các phương pháp khác nhau.

When needing to remove untracked files with different methods.

#### Giá trị gì / Benefits

- Biết nhiều phương pháp
- Chọn phương pháp phù hợp
- Hiểu ưu nhược điểm của từng cách

- Know many methods
- Choose appropriate method
- Understand pros and cons of each way

#### Định nghĩa / Definition

Các cách remove untracked files:

1. **git clean**: Lệnh Git chuyên dụng
2. **rm**: Lệnh hệ thống
3. **git add**: Add vào .gitignore
4. **git stash**: Stash untracked files

Ways to remove untracked files:

1. **git clean**: Git dedicated command
2. **rm**: System command
3. **git add**: Add to .gitignore
4. **git stash**: Stash untracked files

#### Ví dụ / Examples

**Cách 1: git clean**

```bash
# Xóa untracked files
$ git clean -f

# Xóa cả directories
$ git clean -fd

# Dry run trước
$ git clean -n -fd
```

**Cách 2: rm**

```bash
# Xóa file cụ thể
$ rm temp.txt

# Xóa directory
$ rm -rf build/

# Xóa tất cả untracked files
$ rm $(git ls-files --others --exclude-standard)
```

**Cách 3: Add vào .gitignore**

```bash
# Thêm vào .gitignore
$ echo "*.log" >> .gitignore
$ echo "build/" >> .gitignore
$ echo "dist/" >> .gitignore

# Commit .gitignore
$ git add .gitignore
$ git commit -m "Add gitignore"
```

**Cách 4: git stash**

```bash
# Stash untracked files
$ git stash -u

# Stash cả ignored files
$ git stash -u -a

# Xem stashes
$ git stash list

# Apply stash
$ git stash pop
```

**So sánh các cách:**

| Cách       | Ưu điểm             | Nhược điểm              |
| ---------- | ------------------- | ----------------------- |
| git clean  | An toàn, có dry run | Chỉ xóa untracked       |
| rm         | Nhanh, linh hoạt    | Không liên quan đến Git |
| .gitignore | Vĩnh viễn           | Không xóa ngay          |
| stash      | Có thể restore      | Tạm thời                |

| Method     | Pros              | Cons                       |
| ---------- | ----------------- | -------------------------- |
| git clean  | Safe, has dry run | Only removes untracked     |
| rm         | Fast, flexible    | Not Git-related            |
| .gitignore | Permanent         | Doesn't delete immediately |
| stash      | Can restore       | Temporary                  |

#### Best Practices

1. **Dùng git clean** cho untracked files
2. **Dùng .gitignore** cho files không muốn track
3. **Dùng stash** khi muốn tạm thời xóa
4. **Dùng rm** khi cần linh hoạt

5. **Use git clean** for untracked files
6. **Use .gitignore** for files you don't want to track
7. **Use stash** when wanting to temporarily remove
8. **Use rm** when needing flexibility

#### Anti-patterns

- ❌ Dùng rm cho Git-related cleanup
- ❌ Không dùng .gitignore cho files thường xuyên
- ❌ Không hiểu khác biệt giữa các cách
- ❌ Dùng sai cách cho tình huống

- ❌ Use rm for Git-related cleanup
- ❌ Don't use .gitignore for frequent files
- ❌ Don't understand difference between methods
- ❌ Use wrong method for situation

---

### Q7: Safety considerations khi dùng git clean? / What are safety considerations when using git clean?

#### Mục đích / Purpose

Hiểu các rủi ro và cách sử dụng git clean an toàn.

Understand risks and how to use git clean safely.

#### Khi nào dùng / When to use

Luôn luôn cần cân nhắc khi sử dụng git clean.

Always need to consider when using git clean.

#### Giá trị gì / Benefits

- Tránh mất files quan trọng
- Sử dụng git clean an toàn
- Hiểu rủi ro

- Avoid losing important files
- Use git clean safely
- Understand risks

#### Định nghĩa / Definition

Các safety considerations khi dùng git clean:

1. **Luôn dùng dry run** trước
2. **Kiểm tra git status** trước
3. **Hiểu options** trước khi dùng
4. **Backup quan trọng** trước khi clean
5. **Cẩn thận với ignored files**
6. **Không dùng trong production**

Safety considerations when using git clean:

1. **Always use dry run** first
2. **Check git status** before
3. **Understand options** before using
4. **Backup important** before cleaning
5. **Be careful with ignored files**
6. **Don't use in production**

#### Ví dụ / Examples

**Workflow an toàn:**

```bash
# 1. Kiểm tra git status
$ git status
Untracked files:
  temp.txt
  build/
  dist/

# 2. Dry run trước
$ git clean -n -fd
Would remove temp.txt
Would remove build/
Would remove dist/

# 3. Kiểm tra kỹ những gì sẽ bị xóa
# ... review ...

# 4. Nếu OK, thực sự xóa
$ git clean -fd
Removing temp.txt
Removing build/
Removing dist/
```

**Backup trước khi clean:**

```bash
# 1. Backup quan trọng
$ cp important.txt ~/backup/
$ cp -r build/ ~/backup/build/

# 2. Clean
$ git clean -fd

# 3. Nếu có vấn đề, restore
$ cp ~/backup/important.txt .
$ cp -r ~/backup/build/ .
```

**Interactive mode để an toàn hơn:**

```bash
# Sử dụng interactive mode
$ git clean -i

# Chọn từng item
What now> 4
Remove temp.txt? [y/N] y
Remove build/? [y/N] n
Remove dist/? [y/N] y
```

#### Best Practices

1. **Luôn dùng dry run** trước
2. **Kiểm tra git status** trước
3. **Backup quan trọng** trước khi clean
4. **Dùng interactive mode** khi không chắc chắn
5. **Hiểu options** trước khi dùng
6. **Không dùng trong production**
7. **Review kỹ** những gì sẽ bị xóa

8. **Always use dry run** first
9. **Check git status** before
10. **Backup important** before cleaning
11. **Use interactive mode** when unsure
12. **Understand options** before using
13. **Don't use in production**
14. **Review carefully** what will be deleted

#### Anti-patterns

- ❌ Không dùng dry run
- ❌ Không kiểm tra git status
- ❌ Không backup quan trọng
- ❌ Dùng trong production
- ❌ Không hiểu options
- ❌ Xóa nhanh mà không review

- ❌ Don't use dry run
- ❌ Don't check git status
- ❌ Don't backup important
- ❌ Use in production
- ❌ Don't understand options
- ❌ Delete quickly without review

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **`git clean -f`** xóa untracked files với force
2. **`git clean -fd`** xóa cả untracked files và directories
3. **`git clean -n`** (dry run) hiển thị những gì sẽ bị xóa
4. **`git clean -x`** xóa cả ignored files
5. **`git clean -i`** (interactive) cho phép chọn từng item
6. Có nhiều cách để remove untracked files: git clean, rm, .gitignore, stash
7. Luôn dùng dry run và backup quan trọng trước khi clean

8. **`git clean -f`** removes untracked files with force
9. **`git clean -fd`** removes both untracked files and directories
10. **`git clean -n`** (dry run) displays what will be deleted
11. **`git clean -x`** removes ignored files as well
12. **`git clean -i`** (interactive) allows selecting each item
13. Many ways to remove untracked files: git clean, rm, .gitignore, stash
14. Always use dry run and backup important before cleaning

### Commands Reference / Tham khảo lệnh

```bash
# Xóa untracked files
git clean -f

# Xóa cả directories
git clean -fd

# Dry run
git clean -n
git clean -n -fd

# Xóa cả ignored files
git clean -x
git clean -fdx

# Interactive mode
git clean -i

# Các options khác
git clean -d      # Xóa directories
git clean -e <pattern>  # Exclude pattern
git clean -X      # Chỉ xóa ignored files
```

### Best Practices / Thực hành tốt nhất

1. **Luôn dùng dry run** trước khi thực sự xóa
2. **Kiểm tra git status** trước khi clean
3. **Backup quan trọng** trước khi clean
4. **Dùng interactive mode** khi không chắc chắn
5. **Hiểu options** trước khi dùng
6. **Không dùng trong production**
7. **Review kỹ** những gì sẽ bị xóa

8. **Always use dry run** before actually deleting
9. **Check git status** before cleaning
10. **Backup important** before cleaning
11. **Use interactive mode** when unsure
12. **Understand options** before using
13. **Don't use in production**
14. **Review carefully** what will be deleted
