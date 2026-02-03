# Git Submodules / Git Submodules

> Hướng dẫn chi tiết về cách sử dụng Git submodules để quản lý các repository phụ thuộc / Comprehensive guide to using Git submodules to manage dependent repositories

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng Git submodules để nhúng một repository vào repository khác.

Understand how to use Git submodules to embed one repository into another.

### Khi nào cần hiểu / When to understand

- Khi cần nhúng một library hoặc component
- Khi muốn chia sẻ code giữa nhiều projects
- Khi muốn giữ dependencies như Git repositories
- Khi cần quản lý version của external projects

- When needing to embed a library or component
- When wanting to share code between multiple projects
- When wanting to keep dependencies as Git repositories
- When needing to manage version of external projects

### Giá trị gì / Benefits

- Giữ dependencies như Git repositories
- Quản lý version dễ dàng
- Chia sẻ code giữa projects
- Tách biệt concerns rõ ràng

- Keep dependencies as Git repositories
- Easy version management
- Share code between projects
- Clear separation of concerns

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Giữ dependencies trackable
- Quản lý version dễ dàng
- Có thể update submodules độc lập
- Tách biệt codebase

**Nhược điểm / Cons:**

- Phức tạp hơn với nhiều submodules
- Clone cần thêm bước
- Update submodules tốn thời gian
- Conflicts có thể xảy ra

**Pros:**

- Keep dependencies trackable
- Easy version management
- Can update submodules independently
- Separate codebase

**Cons:**

- More complex with many submodules
- Clone requires extra steps
- Updating submodules takes time
- Conflicts can occur

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Git submodules là gì? Khi nào nên dùng? / What are Git submodules? When should you use them?

#### Mục đích / Purpose

Hiểu khái niệm và use cases của Git submodules.

Understand concept and use cases of Git submodules.

#### Khi nào dùng / When to use

Khi cần nhúng một repository vào repository khác.

When needing to embed one repository into another.

#### Giá trị gì / Benefits

- Biết khi nào nên dùng submodules
- Hiểu trade-offs
- Chọn giải pháp phù hợp

- Know when to use submodules
- Understand trade-offs
- Choose appropriate solution

#### Định nghĩa / Definition

Git submodules cho phép nhúng một Git repository vào repository khác như một subdirectory:

```
main-repo/
├── .gitmodules
├── src/
└── lib/
    └── external-lib/  (submodule - separate Git repo)
```

Submodules là Git repositories riêng biệt, có lịch sử commits riêng.

Git submodules allow embedding a Git repository into another as a subdirectory:

```
main-repo/
├── .gitmodules
├── src/
└── lib/
    └── external-lib/  (submodule - separate Git repo)
```

Submodules are separate Git repositories with their own commit history.

#### Ví dụ / Examples

**Use cases:**

1. **Shared libraries**: Library dùng bởi nhiều projects
2. **Third-party dependencies**: External code cần version control
3. **Microservices**: Services được phát triển riêng biệt
4. **Components**: Reusable components

**Ví dụ cấu trúc:**

```
my-project/
├── .gitmodules
├── src/
├── tests/
├── vendor/
│   ├── react/          (submodule)
│   ├── lodash/         (submodule)
│   └── my-library/     (submodule)
└── README.md
```

**File .gitmodules:**

```ini
[submodule "vendor/react"]
    path = vendor/react
    url = https://github.com/facebook/react.git

[submodule "vendor/lodash"]
    path = vendor/lodash
    url = https://github.com/lodash/lodash.git

[submodule "vendor/my-library"]
    path = vendor/my-library
    url = https://github.com/company/my-library.git
```

#### Best Practices

1. **Dùng submodules** cho external dependencies cần version control
2. **Tránh submodules** cho internal code thường xuyên thay đổi
3. **Giữ số lượng submodules** ở mức tối thiểu
4. **Document rõ ràng** trong README

5. **Use submodules** for external dependencies needing version control
6. **Avoid submodules** for frequently changing internal code
7. **Keep number of submodules** at minimum
8. **Document clearly** in README

#### Anti-patterns

- ❌ Dùng submodules cho mọi dependencies
- ❌ Không document submodules
- ❌ Quên update submodules
- ❌ Dùng submodules thay vì npm/yarn

- ❌ Use submodules for all dependencies
- ❌ Don't document submodules
- ❌ Forget to update submodules
- ❌ Use submodules instead of npm/yarn

---

### Q2: `git submodule add URL` làm gì? / What does `git submodule add URL` do?

#### Mục đích / Purpose

Biết cách thêm một submodule vào repository.

Know how to add a submodule to repository.

#### Khi nào dùng / When to use

Khi muốn nhúng một repository khác vào project hiện tại.

When wanting to embed another repository into current project.

#### Giá trị gì / Benefits

- Thêm submodule dễ dàng
- Tự động tạo .gitmodules
- Clone submodule vào đúng path

- Add submodule easily
- Automatically create .gitmodules
- Clone submodule to correct path

#### Định nghĩa / Definition

`git submodule add URL` thêm một submodule vào repository:

```bash
git submodule add <URL> [<path>]
```

Lệnh này:

- Clone repository từ URL
- Thêm vào .gitmodules
- Stage thay đổi

`git submodule add URL` adds a submodule to repository:

```bash
git submodule add <URL> [<path>]
```

This command:

- Clones repository from URL
- Adds to .gitmodules
- Stages changes

#### Ví dụ / Examples

**Thêm submodule:**

```bash
# Thêm submodule với URL
git submodule add https://github.com/facebook/react.git vendor/react

# Thêm submodule với custom path
git submodule add https://github.com/lodash/lodash.git lib/lodash

# Thêm submodule với branch cụ thể
git submodule add -b stable https://github.com/company/lib.git vendor/lib
```

**Kết quả:**

```bash
# .gitmodules được tạo
$ cat .gitmodules
[submodule "vendor/react"]
    path = vendor/react
    url = https://github.com/facebook/react.git

# Submodule được clone
$ ls vendor/react
# ... contents of react repository ...

# Thay đổi được staged
$ git status
Changes to be committed:
  new file:   .gitmodules
  new file:   vendor/react
```

**Commit submodule:**

```bash
# Commit thay đổi
git commit -m "Add react as submodule"

# Push lên remote
git push origin main
```

#### Best Practices

1. **Chọn path hợp lý** cho submodule
2. **Dùng branch cụ thể** khi cần
3. **Commit submodule** ngay sau khi thêm
4. **Document trong README**

5. **Choose reasonable path** for submodule
6. **Use specific branch** when needed
7. **Commit submodule** immediately after adding
8. **Document in README**

#### Anti-patterns

- ❌ Không commit sau khi thêm submodule
- ❌ Chọn path không hợp lý
- ❌ Không hiểu .gitmodules
- ❌ Thêm submodule mà không cần

- ❌ Don't commit after adding submodule
- ❌ Choose unreasonable path
- ❌ Don't understand .gitmodules
- ❌ Add submodule without needing

---

### Q3: `git submodule init` làm gì? / What does `git submodule init` do?

#### Mục đích / Purpose

Biết cách khởi tạo submodules sau khi clone repository.

Know how to initialize submodules after cloning repository.

#### Khi nào dùng / When to use

Sau khi clone repository có submodules mà không dùng --recursive.

After cloning repository with submodules without using --recursive.

#### Giá trị gì / Benefits

- Khởi tạo submodules dễ dàng
- Chuẩn bị cho update
- Thiết lập cấu trúc submodule

- Initialize submodules easily
- Prepare for update
- Set up submodule structure

#### Định nghĩa / Definition

`git submodule init` khởi tạo các submodules từ .gitmodules:

```bash
git submodule init
```

Lệnh này đọc .gitmodules và tạo cấu trúc submodule.

`git submodule init` initializes submodules from .gitmodules:

```bash
git submodule init
```

This command reads .gitmodules and creates submodule structure.

#### Ví dụ / Examples

**Clone và init:**

```bash
# Clone repository (không có submodules)
git clone https://github.com/user/project.git
cd project

# Khởi tạo submodules
git submodule init
Submodule 'vendor/react' (https://github.com/facebook/react.git) registered for path 'vendor/react'
Submodule 'vendor/lodash' (https://github.com/lodash/lodash.git) registered for path 'vendor/lodash'

# Cấu trúc được tạo
$ ls -la vendor/
drwxr-xr-x  2 user  group  4096 Jan 15 10:30 .
drwxr-xr-x  5 user  group  4096 Jan 15 10:30 ..
drwxr-xr-x  2 user  group  4096 Jan 15 10:30 react
drwxr-xr-x  2 user  group  4096 Jan 15 10:30 lodash

# Nhưng submodules vẫn rỗng
$ ls vendor/react/
# (empty)
```

**So sánh với --recursive:**

```bash
# Clone với --recursive (không cần init)
git clone --recursive https://github.com/user/project.git

# Tương đương với:
git clone https://github.com/user/project.git
cd project
git submodule init
git submodule update
```

#### Best Practices

1. **Dùng --recursive** khi clone để tránh cần init
2. **Kiểm tra .gitmodules** trước khi init
3. **Update sau khi init**
4. **Hiểu init chỉ tạo cấu trúc, không clone**

5. **Use --recursive** when cloning to avoid needing init
6. **Check .gitmodules** before init
7. **Update after init**
8. **Understand init only creates structure, doesn't clone**

#### Anti-patterns

- ❌ Init mà không update
- ❌ Không hiểu init chỉ tạo cấu trúc
- ❌ Không kiểm tra .gitmodules
- ❌ Dùng init khi đã clone với --recursive

- ❌ Init without updating
- ❌ Don't understand init only creates structure
- ❌ Don't check .gitmodules
- ❌ Use init when already cloned with --recursive

---

### Q4: `git submodule update` làm gì? / What does `git submodule update` do?

#### Mục đích / Purpose

Biết cách cập nhật các submodules về version mới nhất.

Know how to update submodules to latest version.

#### Khi nào dùng / When to use

Khi muốn cập nhật submodules sau khi init hoặc pull.

When wanting to update submodules after init or pull.

#### Giá trị gì / Benefits

- Cập nhật submodules dễ dàng
- Có nhiều options để tùy chỉnh
- Giữ submodules sync với remote

- Update submodules easily
- Many options for customization
- Keep submodules synced with remote

#### Định nghĩa / Definition

`git submodule update` cập nhật các submodules:

```bash
git submodule update [<options>]
```

Options phổ biến:

- `--remote`: Update về remote branch
- `--merge`: Merge thay đổi vào current branch
- `--rebase`: Rebase thay đổi lên current branch
- `--init`: Init trước khi update

`git submodule update` updates submodules:

```bash
git submodule update [<options>]
```

Common options:

- `--remote`: Update to remote branch
- `--merge`: Merge changes into current branch
- `--rebase`: Rebase changes onto current branch
- `--init`: Init before updating

#### Ví dụ / Examples

**Cập nhật submodules:**

```bash
# Cập nhật tất cả submodules
git submodule update

# Cập nhật submodule cụ thể
git submodule update vendor/react

# Cập nhật về remote branch
git submodule update --remote

# Cập nhật với merge
git submodule update --merge

# Cập nhật với rebase
git submodule update --rebase
```

**So sánh các options:**

```bash
# Default (checkout)
git submodule update
# Checkout về commit được ghi trong parent repo

# --remote
git submodule update --remote
# Checkout về remote branch (latest)

# --merge
git submodule update --merge
# Merge remote changes vào current branch

# --rebase
git submodule update --rebase
# Rebase remote changes lên current branch
```

**Kết hợp với init:**

```bash
# Init và update cùng lúc
git submodule update --init

# Tương đương với:
git submodule init
git submodule update
```

#### Best Practices

1. **Chọn option phù hợp** cho workflow
2. **Update thường xuyên** để giữ submodules mới
3. **Dùng --remote** khi muốn latest version
4. **Test sau khi update**

5. **Choose appropriate option** for workflow
6. **Update frequently** to keep submodules fresh
7. **Use --remote** when wanting latest version
8. **Test after update**

#### Anti-patterns

- ❌ Không bao giờ update submodules
- ❌ Không hiểu các options
- ❌ Dùng sai option cho workflow
- ❌ Update mà không test

- ❌ Never update submodules
- ❌ Don't understand options
- ❌ Use wrong option for workflow
- ❌ Update without testing

---

### Q5: `git submodule update --init --recursive` làm gì? / What does `git submodule update --init --recursive` do?

#### Mục đích / Purpose

Biết cách init và update tất cả submodules bao gồm nested submodules.

Know how to init and update all submodules including nested submodules.

#### Khi nào dùng / When to use

Khi muốn clone và update tất cả submodules một lần.

When wanting to clone and update all submodules at once.

#### Giá trị gì / Benefits

- Clone và update tất cả submodules
- Xử lý nested submodules
- Tiết kiệm thời gian

- Clone and update all submodules
- Handle nested submodules
- Save time

#### Định nghĩa / Definition

`git submodule update --init --recursive` init và update tất cả submodules:

```bash
git submodule update --init --recursive
```

- `--init`: Init submodules trước khi update
- `--recursive`: Xử lý nested submodules

`git submodule update --init --recursive` inits and updates all submodules:

```bash
git submodule update --init --recursive
```

- `--init`: Init submodules before updating
- `--recursive`: Handle nested submodules

#### Ví dụ / Examples

**Clone và update tất cả:**

```bash
# Clone repository
git clone https://github.com/user/project.git
cd project

# Init và update tất cả submodules
git submodule update --init --recursive
Submodule 'vendor/react' (https://github.com/facebook/react.git) registered for path 'vendor/react'
Submodule 'vendor/lodash' (https://github.com/lodash/lodash.git) registered for path 'vendor/lodash'
Cloning into 'vendor/react'
Cloning into 'vendor/lodash'

# Nested submodules cũng được xử lý
```

**Nested submodules:**

```
project/
├── vendor/
│   ├── react/          (submodule)
│   └── my-lib/        (submodule)
│       └── vendor/      (nested submodule)
│           └── utils/  (nested submodule)
```

```bash
# --recursive xử lý cả nested
git submodule update --init --recursive
# Tất cả submodules được clone và update
```

**So sánh các cách:**

```bash
# Cách 1: Clone với --recursive
git clone --recursive https://github.com/user/project.git

# Cách 2: Clone rồi init/update
git clone https://github.com/user/project.git
cd project
git submodule update --init --recursive

# Cả hai cách đều clone tất cả submodules
```

#### Best Practices

1. **Dùng --recursive** cho nested submodules
2. **Clone với --recursive** khi có thể
3. **Kiểm tra nested submodules** trước khi update
4. **Dùng --init** để đảm bảo submodules được init

5. **Use --recursive** for nested submodules
6. **Clone with --recursive** when possible
7. **Check nested submodules** before updating
8. **Use --init** to ensure submodules are initialized

#### Anti-patterns

- ❌ Không dùng --recursive cho nested submodules
- ❌ Không hiểu nested submodules
- ❌ Clone mà không --recursive rồi quên init
- ❌ Không kiểm tra nested structure

- ❌ Don't use --recursive for nested submodules
- ❌ Don't understand nested submodules
- ❌ Clone without --recursive then forget to init
- ❌ Don't check nested structure

---

### Q6: Cách clone repository với submodules? / How to clone repository with submodules?

#### Mục đích / Purpose

Biết các cách clone repository có submodules.

Know ways to clone repository with submodules.

#### Khi nào dùng / When to use

Khi clone repository có submodules.

When cloning repository with submodules.

#### Giá trị gì / Benefits

- Clone submodules cùng lúc
- Có nhiều cách để clone
- Chọn cách phù hợp với nhu cầu

- Clone submodules at once
- Many ways to clone
- Choose appropriate method for needs

#### Định nghĩa / Definition

Các cách clone repository với submodules:

1. **--recursive**: Clone tất cả submodules
2. **Clone rồi init/update**: Clone riêng, init/update sau
3. **Clone từng submodule**: Clone thủ công từng cái

Ways to clone repository with submodules:

1. **--recursive**: Clone all submodules
2. **Clone then init/update**: Clone separately, init/update after
3. **Clone each submodule**: Manually clone each one

#### Ví dụ / Examples

**Cách 1: Clone với --recursive**

```bash
# Clone tất cả submodules
git clone --recursive https://github.com/user/project.git
cd project

# Tất cả submodules được clone
```

**Cách 2: Clone rồi init/update**

```bash
# Clone repository (không có submodules)
git clone https://github.com/user/project.git
cd project

# Init và update submodules
git submodule update --init
# Hoặc:
git submodule update --init --recursive
```

**Cách 3: Clone từng submodule**

```bash
# Clone repository
git clone https://github.com/user/project.git
cd project

# Clone từng submodule thủ công
git clone https://github.com/facebook/react.git vendor/react
git clone https://github.com/lodash/lodash.git vendor/lodash
```

**Shallow clone với submodules:**

```bash
# Shallow clone repository
git clone --depth 1 https://github.com/user/project.git

# Shallow clone submodules
git submodule update --init --depth 1
```

**Sparse checkout với submodules:**

```bash
# Sparse checkout repository
git clone --depth 1 --no-checkout https://github.com/user/project.git
cd project
git sparse-checkout init --cone
git sparse-checkout set src/

# Update submodules
git submodule update --init
```

#### Best Practices

1. **Dùng --recursive** khi cần tất cả submodules
2. **Shallow clone** khi repository lớn
3. **Kiểm tra .gitmodules** để hiểu submodules
4. **Document trong README** cách clone

5. **Use --recursive** when needing all submodules
6. **Shallow clone** when repository is large
7. **Check .gitmodules** to understand submodules
8. **Document in README** how to clone

#### Anti-patterns

- ❌ Clone mà không clone submodules
- ❌ Không hiểu .gitmodules
- ❌ Clone sâu khi không cần
- ❌ Không document cách clone

- ❌ Clone without cloning submodules
- ❌ Don't understand .gitmodules
- ❌ Deep clone when not needed
- ❌ Don't document how to clone

---

### Q7: Cách remove submodules? / How to remove submodules?

#### Mục đích / Purpose

Biết cách xóa submodule khỏi repository.

Know how to remove submodule from repository.

#### Khi nào dùng / When to use

Khi không còn cần submodule hoặc muốn thay thế bằng giải pháp khác.

When no longer needing submodule or wanting to replace with other solution.

#### Giá trị gì / Benefits

- Xóa submodule sạch sẽ
- Có nhiều cách để remove
- Có thể restore nếu cần

- Cleanly remove submodule
- Many ways to remove
- Can restore if needed

#### Định nghĩa / Definition

Quy trình remove submodule:

1. **Xóa entry từ .gitmodules**
2. **Xóa .git directory** của submodule
3. **Xóa submodule directory** khỏi working directory
4. **Commit thay đổi**

Process to remove submodule:

1. **Remove entry from .gitmodules**
2. **Remove .git directory** of submodule
3. **Remove submodule directory** from working directory
4. **Commit changes**

#### Ví dụ / Examples

**Cách 1: Remove thủ công**

```bash
# 1. Xóa entry từ .gitmodules
git config -f .gitmodules --remove-section submodule.vendor/react

# 2. Xóa .git directory của submodule
rm -rf .git/modules/vendor/react

# 3. Xóa submodule directory
rm -rf vendor/react

# 4. Commit thay đổi
git add .gitmodules
git rm vendor/react
git commit -m "Remove react submodule"
```

**Cách 2: Sử dụng git rm**

```bash
# Xóa submodule
git rm vendor/react

# Commit thay đổi
git commit -m "Remove react submodule"
```

**Cách 3: Deinit và remove**

```bash
# Deinit submodule
git submodule deinit vendor/react

# Xóa directory
rm -rf vendor/react

# Commit thay đổi
git add .gitmodules
git commit -m "Remove react submodule"
```

**Xóa tất cả submodules:**

```bash
# Deinit tất cả
git submodule deinit --all

# Xóa tất cả directories
rm -rf vendor/

# Commit thay đổi
git add .gitmodules
git commit -m "Remove all submodules"
```

#### Best Practices

1. **Deinit trước khi xóa** directory
2. **Xóa .git/modules** để dọn dẹp
3. **Commit thay đổi** ngay sau khi remove
4. **Document thay đổi** trong commit message

5. **Deinit before deleting** directory
6. **Remove .git/modules** to clean up
7. **Commit changes** immediately after removing
8. **Document change** in commit message

#### Anti-patterns

- ❌ Xóa directory mà không deinit
- ❌ Không xóa .git/modules
- ❌ Không commit thay đổi
- ❌ Xóa submodule mà không cần

- ❌ Delete directory without deiniting
- ❌ Don't remove .git/modules
- ❌ Don't commit changes
- ❌ Remove submodule without needing

---

### Q8: Submodule best practices? / What are submodule best practices?

#### Mục đích / Purpose

Hiểu các best practices khi làm việc với submodules.

Understand best practices when working with submodules.

#### Khi nào dùng / When to use

Luôn luôn cần cân nhắc khi làm việc với submodules.

Always need to consider when working with submodules.

#### Giá trị gì / Benefits

- Tránh các vấn đề phổ biến
- Làm việc hiệu quả hơn với submodules
- Giữ repository sạch sẽ

- Avoid common issues
- Work more efficiently with submodules
- Keep repository clean

#### Định nghĩa / Definition

Các best practices khi làm việc với submodules:

1. **Dùng submodules cho external dependencies**: Không cho internal code
2. **Giữ số lượng submodules tối thiểu**: Quá nhiều phức tạp
3. **Document rõ ràng**: README, .gitmodules comments
4. **Update thường xuyên**: Giữ submodules mới
5. **Dùng --recursive cho nested**: Xử lý nested submodules
6. **Commit submodule changes**: Track submodule changes
7. **Tránh conflicts**: Sync submodule versions

Best practices when working with submodules:

1. **Use submodules for external dependencies**: Not for internal code
2. **Keep number of submodules minimum**: Too many is complex
3. **Document clearly**: README, .gitmodules comments
4. **Update frequently**: Keep submodules fresh
5. **Use --recursive for nested**: Handle nested submodules
6. **Commit submodule changes**: Track submodule changes
7. **Avoid conflicts**: Sync submodule versions

#### Ví dụ / Examples

**Document trong README:**

````markdown
# Project with Submodules

This project uses Git submodules for external dependencies.

## Cloning

Clone with all submodules:

```bash
git clone --recursive https://github.com/user/project.git
```
````

Or clone then init:

```bash
git clone https://github.com/user/project.git
cd project
git submodule update --init --recursive
```

## Updating Submodules

Update all submodules:

```bash
git submodule update --remote
```

Update specific submodule:

```bash
cd vendor/react
git pull origin main
```

## Submodules

- **vendor/react**: React UI library
- **vendor/lodash**: Utility library

````

**Commit submodule changes:**

```bash
# Update submodule
cd vendor/react
git pull origin main

# Commit submodule change
cd ../..
git add vendor/react
git commit -m "Update react to latest version"
````

**Avoid conflicts:**

```bash
# Document required submodule versions
echo "react@17.0.2" >> .gitmodules

# Team members check out same version
cd vendor/react
git checkout v17.0.2
```

#### Best Practices

1. **Dùng submodules cho external code**: Internal code nên ở cùng repo
2. **Giữ số lượng tối thiểu**: 1-3 submodules là lý tưởng
3. **Document rõ ràng**: README, commit messages
4. **Update thường xuyên**: Định kỳ hoặc trước khi release
5. **Dùng --recursive**: Xử lý nested submodules
6. **Commit submodule changes**: Track version updates
7. **Sync versions**: Team dùng cùng version submodule

8. **Use submodules for external code**: Internal code should be in same repo
9. **Keep number minimum**: 1-3 submodules is ideal
10. **Document clearly**: README, commit messages
11. **Update frequently**: Periodically or before release
12. **Use --recursive**: Handle nested submodules
13. **Commit submodule changes**: Track version updates
14. **Sync versions**: Team uses same submodule version

#### Anti-patterns

- ❌ Dùng submodules cho mọi dependencies
- ❌ Quá nhiều submodules
- ❌ Không document submodules
- ❌ Không bao giờ update submodules
- ❌ Không track submodule changes
- ❌ Dùng submodules cho internal code

- ❌ Use submodules for all dependencies
- ❌ Too many submodules
- ❌ Don't document submodules
- ❌ Never update submodules
- ❌ Don't track submodule changes
- ❌ Use submodules for internal code

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Git submodules** cho phép nhúng repository vào repository khác
2. **`git submodule add URL`** thêm submodule vào repository
3. **`git submodule init`** khởi tạo submodules sau khi clone
4. **`git submodule update`** cập nhật submodules về version mới
5. **`git submodule update --init --recursive`** init và update tất cả submodules
6. Có nhiều cách để **clone repository với submodules**
7. Có nhiều cách để **remove submodules** khỏi repository
8. **Best practices** giúp làm việc hiệu quả với submodules

9. **Git submodules** allow embedding repository into another repository
10. **`git submodule add URL`** adds submodule to repository
11. **`git submodule init`** initializes submodules after cloning
12. **`git submodule update`** updates submodules to latest version
13. **`git submodule update --init --recursive`** inits and updates all submodules
14. Many ways to **clone repository with submodules**
15. Many ways to **remove submodules** from repository
16. **Best practices** help work efficiently with submodules

### Commands Reference / Tham khảo lệnh

```bash
# Thêm submodule
git submodule add <URL> [<path>]

# Clone với submodules
git clone --recursive <URL>

# Init submodules
git submodule init

# Update submodules
git submodule update
git submodule update --remote
git submodule update --merge
git submodule update --rebase

# Init và update tất cả
git submodule update --init --recursive

# Xóa submodule
git rm <path>
git submodule deinit <path>

# Xem status
git submodule status
git submodule foreach --recursive git status
```

### Best Practices / Thực hành tốt nhất

1. **Dùng --recursive** khi clone repository có submodules
2. **Update thường xuyên** để giữ submodules mới
3. **Document rõ ràng** trong README
4. **Giữ số lượng submodules tối thiểu**
5. **Dùng submodules cho external dependencies**
6. **Commit submodule changes** để track version updates
7. **Deinit trước khi xóa** submodule
8. **Xóa .git/modules** để dọn dẹp

9. **Use --recursive** when cloning repository with submodules
10. **Update frequently** to keep submodules fresh
11. **Document clearly** in README
12. **Keep number of submodules minimum**
13. **Use submodules for external dependencies**
14. **Commit submodule changes** to track version updates
15. **Deinit before deleting** submodule
16. **Remove .git/modules** to clean up
