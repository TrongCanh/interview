# 21. Git Ignore / Git Ignore

## Tổng quan về Git Ignore / Git Ignore Overview

### Mục đích / Purpose

**Git Ignore** là một tính năng cho phép bạn specify files và directories mà Git nên track. Nó giúp bạn exclude unnecessary files từ version control.

**Mục đích chính:**

- Hiểu `.gitignore` file là gì
- Biết cách write patterns
- Hiểu precedence của ignore rules
- Biết cách ignore tracked files
- Biết cách ignore untracked files
- Hiểu global `.gitignore`
- Nắm được best practices cho ignoring files

### Khi nào cần hiểu về Git Ignore / When to Use

Hiểu về Git Ignore là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn exclude unnecessary files từ version control
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Làm việc với sensitive data
- Làm việc với build artifacts

### Giả ích gì / Benefits

**Lợi ích:**

- **Clean**: Giữ repository clean
- **Efficiency**: Tránh tracking unnecessary files
- **Security**: Excludes sensitive data
- **Performance**: Improves Git performance
- **Organization**: Tổ chức repository tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                            | Nhược điểm (Cons)                         |
| ----------------------------------------- | ----------------------------------------- |
| Clean - repository gọn hơn                | Complexity - cần hiểu patterns            |
| Efficient - không track unnecessary files | Conflicts - có thể gây confusion          |
| Secure - excludes sensitive data          | Debugging - khó debug nếu files bị ignore |
| Flexible - nhiều options để customize     | Learning curve - cần thời gian học        |

---

## `.gitignore` file là gì? / What is `.gitignore` file?

### Mục đích / Purpose

Hiểu `.gitignore` file giúp bạn:

- Biết cách exclude files từ Git
- Hiểu cách write patterns
- Giữ repository clean
- Tối ưu hóa Git performance

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git cơ bản
- Training Git cho developers mới
- Giải thích Git workflow

### Giả ích gì / Benefits

- **Understanding**: Hiểu cách Git ignore files
- **Clean**: Giữ repository clean
- **Efficiency**: Tránh tracking unnecessary files
- **Security**: Excludes sensitive data

### Định nghĩa / Definition

**`.gitignore`** là một text file được đặt trong root của Git repository. Mỗi dòng trong file là một pattern để match files và directories mà Git nên track. Git đọc file này để biết những gì nên ignore.

### Vị trí / Location

```
repository/
├── .gitignore
├── src/
├── node_modules/
└── .env
```

### Ví dụ:

```gitignore
# Ignore build artifacts
dist/
build/

# Ignore dependencies
node_modules/
vendor/

# Ignore IDE files
.vscode/
.idea/

# Ignore environment files
.env
.env.local
*.key
secrets/

# Ignore logs
*.log
```

### Best Practices:

1. **Commit .gitignore**: Luôn commit `.gitignore` vào repository
2. **Use specific patterns**: Sử dụng patterns cụ thể thay vì wildcard
3. **Comment rules**: Comment rules để dễ hiểu
4. **Organize by type**: Tổ chức rules theo loại
5. **Test patterns**: Test patterns trước khi commit

### Anti-patterns cần tránh

```gitignore
# ❌ Không nên: Use too broad patterns
*
# Ignores everything

# ✅ Nên: Use specific patterns
*.log
node_modules/
build/
# More precise and controlled
```

---

## Các patterns trong `.gitignore` hoạt động như thế nào? / How do patterns in `.gitignore` work?

### Mục đích / Purpose

Hiểu cách patterns hoạt động giúp bạn:

- Viết đúng ignore rules
- Debug ignore issues
- Tối ưu hóa patterns
- Hiểu matching behavior

### Khi nào dùng / When to Use

Sử dụng patterns khi:

- Muốn match files theo tên
- Muốn match files theo extension
- Muốn match directories
- Muốn negate patterns
- Muốn match paths

### Giả ích gì / Benefits

- **Precision**: Match files chính xác
- **Flexibility**: Nhiều options để customize
- **Efficiency**: Patterns hoạt động hiệu quả
- **Control**: Có control over matching behavior

### Pattern Types:

| Pattern Type  | Example          | Description                      |
| ------------- | ---------------- | -------------------------------- |
| **Filename**  | `config.json`    | Match file cụ thể                |
| **Extension** | `*.log`          | Match tất cả files với extension |
| **Directory** | `node_modules/`  | Match directory cụ thể           |
| **Wildcard**  | `*.tmp`          | Match tất cả files theo pattern  |
| **Negation**  | `!important.txt` | Bỏ qua file                      |
| **Path**      | `build/*.js`     | Match files trong path           |

### Ví dụ:

```gitignore
# Filename pattern
config.json

# Extension pattern
*.log

# Directory pattern
node_modules/

# Wildcard pattern
*.tmp

# Negation pattern
!important.txt

# Path pattern
build/*.js
```

### Best Practices:

1. **Use specific patterns**: Sử dụng patterns cụ thể
2. **Use wildcards carefully**: Cẩn thận khi dùng wildcards
3. **Use negation**: Sử dụng `!` để exclude
4. **Test patterns**: Test patterns trước khi commit
5. **Comment patterns**: Comment patterns để dễ hiểu

### Anti-patterns cần tránh

```gitignore
# ❌ Không nên: Use too broad patterns
*
# Ignores everything

# ✅ Nên: Use specific patterns
config.json
*.log
node_modules/
# More precise and controlled
```

---

## `git ignore file` làm gì? / What does `git ignore file` do?

### Mục đích / Purpose

Hiểu `git ignore file` command giúp bạn:

- Ignore tracked files
- Debug ignore rules
- Test ignore patterns

### Khi nào dùng / When to Use

Sử dụng `git ignore file` khi:

- Muốn ignore một tracked file cụ thể
- Muốn debug ignore rules
- Muốn test ignore patterns
- Muốn xem ignore status

### Giả ích gì / Benefits

- **Ignore**: Stop tracking một file cụ thể
- **Debug**: Debug ignore rules
- **Test**: Test ignore patterns
- **Verify**: Verify ignore status

### Định nghĩa / Definition

**`git ignore file`** (hoặc `git ignore`) mark một tracked file là unchanged, khiến Git ignore nó trong future operations. Nó tương đương với việc xóa file khỏi tracking và sau đó thêm vào `.gitignore`.

### Ví dụ:

```bash
# File was tracked by mistake
echo "password" > secret.txt
git add secret.txt
git commit -m "Oops, committed password"

# Ignore the file
git ignore secret.txt

# Verify ignore status
git status

# Output:
# On branch main
# Your branch is up to date with 'origin/main'.
# Untracked files:
# secret.txt
```

### Best Practices:

1. **Use for mistakes**: Sử dụng để fix tracking mistakes
2. **Verify before ignoring**: Verify trước khi ignore
3. **Test after ignoring**: Test sau khi ignore
4. **Document decisions**: Document lý do ignore

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Ignore without verifying
git ignore secret.txt
# Don't know if file is still needed

# ✅ Nên: Verify before ignoring
git status
# Check if file is still needed
git ignore secret.txt
# Know what's being ignored
```

---

## `git check-ignore` làm gì? / What does `git check-ignore` do?

### Mục đích / Purpose

Hiểu `git check-ignore` giúp bạn:

- Debug ignore patterns
- Test ignore rules
- Xem files sẽ bị ignore

### Khi nào dùng / When to Use

Sử dụng `git check-ignore` khi:

- Muốn debug ignore patterns
- Muốn test ignore rules
- Muốn xem files sẽ bị ignore

### Giả ích gì / Benefits

- **Debug**: Debug ignore patterns
- **Test**: Test ignore rules
- **Verify**: Xem files sẽ bị ignore

### Định nghĩa / Definition

**`git check-ignore`** (hoặc `git check-ignore -v`) debug ignore patterns và hiển thị files sẽ bị ignore theo những patterns.

### Ví dụ:

```bash
# Test specific pattern
git check-ignore -v file.txt

# Output:
# file.txt: ignored

# Test extension pattern
git check-ignore -v "*.log"

# Output:
# *.log: ignored
```

### Best Practices:

1. **Use for debugging**: Sử dụng để debug ignore issues
2. **Test patterns**: Test patterns trước khi commit
3. **Use -v for verbose**: Sử dụng `-v` để xem chi tiết
4. **Verify before committing**: Verify trước khi commit

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Commit without verifying
git add .
git commit -m "Add files"
# Don't know what's being ignored

# ✅ Nên: Verify before committing
git check-ignore -v *.log
git status
# Know what's being ignored
git add .
git commit -m "Add files"
# Only add what's not ignored
```

---

## `.gitignore` precedence là gì? / What is `.gitignore` precedence?

### Mục đích / Purpose

Hiểu `.gitignore` precedence giúp bạn:

- Hiểu ignore rules được áp dụng như thế nào
- Debug ignore conflicts
- Tối ưu hóa ignore rules
- Xử dụng multiple `.gitignore` files

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git nâng cao
- Debug ignore issues
- Giải thích Git internals

### Giả ích gì / Benefits

- **Understanding**: Hiểu precedence giúp debug
- **Debugging**: Dễ debug ignore issues
- **Optimization**: Tối ưu hóa ignore rules
- **Flexibility**: Có thể override rules

### Định nghĩa / Definition

**`.gitignore` precedence** là thứ tự mà Git áp dụng ignore rules từ multiple sources khi có conflicts. Nó xác định rule nào được áp dụng khi có nhiều `.gitignore` files với conflicting rules.

### Precedence Order:

| Priority | Source                              | Description        |
| -------- | ----------------------------------- | ------------------ |
| **1**    | `.gitignore` trong repository root  | Highest precedence |
| **2**    | `.gitignore` trong parent directory | Medium precedence  |
| **3**    | `.gitignore` trong repository root  | Medium precedence  |
| **4**    | `.gitignore` trong repository root  | Medium precedence  |
| **5**    | `GIT_DIR/info/exclude`              | Medium precedence  |
| **6**    | `core.excludesFile`                 | Lowest precedence  |

### Ví dụ:

```gitignore
# Repository root .gitignore
*.log

# src/.gitignore
!*.log

# File structure
repo/
├── .gitignore (contains: *.log)
├── src/
│   └── .gitignore (contains: !*.log)
└── file.log

# file.log is ignored by repo/.gitignore
# src/file.log is NOT ignored by src/.gitignore
```

### Best Practices:

1. **Use root `.gitignore`**: Sử dụng root `.gitignore` cho global rules
2. **Use directory-specific**: Sử dụng directory-specific `.gitignore` cho local overrides
3. **Understand precedence**: Hiểu precedence để debug issues
4. **Test precedence**: Test precedence bằng cách tạo conflicting rules
5. **Document overrides**: Document directory-specific overrides

### Anti-patterns cần tránh

```gitignore
# ❌ Không nên: Ignore precedence without understanding
# Create conflicting rules without knowing precedence

# ✅ Nên: Understand precedence
# Test with conflicting rules
# Document which rule takes precedence
```

---

## Cách ignore tracked files? / How to ignore tracked files?

### Mục đích / Purpose

Biết cách ignore tracked files giúp bạn:

- Stop tracking files đã được tracked
- Fix tracking mistakes
- Exclude sensitive data từ version control

### Khi nào dùng / When to Use

Sử dụng khi:

- File đã được tracked nhầm
- Muốn stop tracking file
- Muốn fix tracking mistakes
- Muốn exclude sensitive data

### Cách thực hiện / How to Do It

#### Method 1: Using `git rm --cached`

```bash
# Remove from tracking but keep file
git rm --cached sensitive.txt

# Commit removal
git commit -m "Stop tracking sensitive file"
```

#### Method 2: Using `.gitignore`

```bash
# Add to .gitignore
echo "sensitive.txt" >> .gitignore

# Commit .gitignore
git add .gitignore
git commit -m "Add .gitignore"
```

#### Method 3: Using `git update-index --assume-unchanged`

```bash
# Mark as unchanged
git update-index --assume-unchanged sensitive.txt

# Commit change
git commit -m "Mark sensitive.txt as unchanged"
```

### Best Practices:

1. **Use `.gitignore` first**: Sử dụng `.gitignore` thay vì `git rm --cached`
2. **Verify before removing**: Verify trước khi remove
3. **Document decisions**: Document lý do ignore tracked files
4. **Use for sensitive data**: Sử dụng cho sensitive files

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Delete tracked files
git rm sensitive.txt
# File is lost

# ✅ Nên: Use git rm --cached
git rm --cached sensitive.txt
# File is kept, just untracked
```

---

## Cách ignore untracked files? / How to ignore untracked files?

### Mục đích / Purpose

Biết cách ignore untracked files giúp bạn:

- Giữ repository clean
- Tối ưu hóa Git performance
- Exclude temporary files

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn exclude temporary files
- Muốn ignore build artifacts
- Muốn clean up repository

### Cách thực hiện / How to Do It

#### Method 1: Using patterns

```gitignore
# Ignore temporary files
*.tmp
*.temp
```

#### Method 2: Using `git clean -fd`

```bash
# Clean up untracked files
git clean -fd

# Or with dry run first
git clean -n
```

### Best Practices:

1. **Use patterns**: Sử dụng patterns cho temporary files
2. **Test before cleaning**: Test trước khi clean
3. **Use `-n` for safety**: Sử dụng `-n` để dry run trước
4. **Clean regularly**: Clean up thường xuyên

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Clean without testing
git clean -fd
# May delete important files

# ✅ Nên: Test before cleaning
git clean -n
# Verify what will be deleted
git clean -fd
# Safe cleaning
```

---

## Global `.gitignore` là gì? / What is global `.gitignore`?

### Mục đích / Purpose

Hiểu global `.gitignore` giúp bạn:

- Áp dụng ignore rules cho tất cả repositories
- Tổ chức ignore rules
- Giữ consistency across projects
- Tiết kiệm setup

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn ignore files cho tất cả projects
- Muốn tổ chức ignore rules
- Muốn áp dụng common patterns
- Tiết kiệm setup environment

### Giả ích gì / Benefits

- **Consistency**: Áp dụng rules cho tất cả repositories
- **Efficiency**: Không cần tạo `.gitignore` cho mỗi project
- **Organization**: Tổ chức ignore rules
- **Time-saving**: Tiết kiệm setup

### Cách thiết lập / How to Set Up

#### Method 1: Using `git config --global`

```bash
# Set global ignore file
git config --global core.excludesFile ~/.gitignore_global

# Add patterns
echo "*.log" >> ~/.gitignore_global
```

#### Method 2: Creating file manually

```bash
# Create global ignore file
touch ~/.gitignore_global

# Add patterns
echo "*.log" >> ~/.gitignore_global
```

### Ví dụ:

```bash
# Set global ignore file
git config --global core.excludesFile ~/.gitignore_global

# Add common patterns
echo "node_modules/" >> ~/.gitignore_global
echo "*.log" >> ~/.gitignore_global
echo "dist/" >> ~/.gitignore_global
```

### Best Practices:

1. **Use for common patterns**: Sử dụng cho patterns phổ biến
2. **Organize by type**: Tổ chức patterns theo loại
3. **Keep updated**: Cập nhật global ignore thường xuyên
4. **Test patterns**: Test patterns trước khi sử dụng
5. **Document patterns**: Document patterns trong global ignore

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use too broad patterns
git config --global core.excludesFile ~/.gitignore_global
echo "*"
# Ignores everything

# ✅ Nên: Use specific patterns
git config --global core.excludesFile ~/.gitignore_global
echo "*.log"
echo "node_modules/"
# More controlled
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **`.gitignore`** file specifies files Git nên track
2. **Patterns** hoạt động theo filename, extension, directory, wildcard
3. **`git ignore file`** mark tracked files như unchanged
4. **`git check-ignore`** debug ignore patterns
5. **Precedence** xác định rule nào được áp dụng khi có conflicts
6. **Tracked files** ignore với `git rm --cached` hoặc `.gitignore`
7. **Untracked files** ignore với patterns hoặc `git clean`
8. **Global `.gitignore`** áp dụng rules cho tất cả repositories

### Commands Reference:

| Command                                 | Purpose                   |
| --------------------------------------- | ------------------------- |
| `.gitignore`                            | File chứa ignore patterns |
| `git ignore file`                       | Ignore tracked file       |
| `git check-ignore`                      | Debug ignore patterns     |
| `git rm --cached`                       | Remove from tracking      |
| `git update-index --assume-unchanged`   | Mark as unchanged         |
| `git config --global core.excludesFile` | Set global ignore file    |

### Best Practices:

1. **Commit .gitignore**: Luôn commit `.gitignore` vào repository
2. **Use specific patterns**: Sử dụng patterns cụ thể thay vì wildcard
3. **Comment rules**: Comment rules để dễ hiểu
4. **Organize by type**: Tổ chức rules theo loại
5. **Test patterns**: Test patterns trước khi commit
6. **Use global ignore**: Sử dụng global ignore cho common patterns
7. **Handle tracked files**: Sử dụng `git rm --cached` thay vì `git ignore file`
8. **Debug with check-ignore**: Sử dụng `git check-ignore` để debug patterns
9. **Understand precedence**: Hiểu precedence để debug conflicts

### Common Ignore Patterns:

```gitignore
# Dependencies
node_modules/
vendor/
bower_components/

# Build artifacts
dist/
build/
*.min.js
*.map

# IDE files
.vscode/
.idea/
*.swp
.DS_Store

# Environment files
.env
.env.local
*.key
secrets/

# Logs
*.log
*.log.*
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
