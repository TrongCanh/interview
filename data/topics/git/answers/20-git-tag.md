# 20. Git Tag / Git Tag

## Tổng quan về Git Tag / Git Tag Overview

### Mục đích / Purpose

**Git Tag** là một tính năng cho phép bạn mark important points trong Git history, như releases, versions, hoặc milestones. Tags là references tĩnh trỏ đến commits cụ thể.

**Mục đích chính:**

- Hiểu Git tags là gì và tại sao cần chúng
- Biết sự khác biệt giữa lightweight và annotated tags
- Hiểu cách create, list, và delete tags
- Biết cách push tags lên remote
- Nắm được best practices cho tagging
- Biết cách tags được sử dụng trong releases

### Khi nào cần hiểu về Git Tag / When to Use

Hiểu về Git Tag là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Muốn mark releases hoặc versions
- Chuẩn bị cho phỏng vấn về Git cơ bản
- Làm việc với release management
- Muốn mark important milestones trong Git history

### Giả ích gì / Benefits

**Lợi ích:**

- **Releases**: Mark releases trong Git history
- **Versions**: Track version numbers
- **Milestones**: Mark important milestones
- **Reference**: Tạo references tĩnh cho commits
- **Documentation**: Document releases và versions
- **CI/CD**: Integrate với CI/CD pipelines
- **Distribution**: Facilitate software distribution

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                         | Nhược điểm (Cons)                   |
| -------------------------------------- | ----------------------------------- |
| Static - tags là tĩnh references       | Immutable - tags không thể thay đổi |
| Releases - mark releases dễ dàng       | Manual - cần manual tagging         |
| Versions - track version numbers       | Conflicts - có thể gây conflicts    |
| Milestones - mark important milestones | Maintenance - cần maintain tags     |
| Documentation - document releases      | Complexity - thêm một layer quản lý |
| CI/CD - integrate với pipelines        | Learning curve - cần hiểu tags      |

---

## Git tags là gì? Khi nào nên dùng? / What are Git tags? When should you use them?

### Mục đích / Purpose

Hiểu Git tags là gì và khi nào nên dùng chúng giúp bạn:

- Mark releases và versions
- Document important milestones
- Integrate với CI/CD pipelines
- Facilitate software distribution

### Khi nào dùng / When to Use

Sử dụng Git tags khi:

- **Releases**: Mark production releases
- **Versions**: Track version numbers (v1.0.0, v2.0.0)
- **Milestones**: Mark important milestones
- **Hotfixes**: Tag hotfix releases
- **Pre-releases**: Tag pre-release versions
- **Documentation**: Document release notes

### Giả ích gì / Benefits

- **Reference**: Tạo references tĩnh cho commits
- **Releases**: Mark releases dễ dàng
- **Versions**: Track version numbers
- **Distribution**: Facilitate software distribution
- **CI/CD**: Integrate với automated deployments
- **Documentation**: Document release notes

### Định nghĩa / Definition

**Git Tag** là một reference tĩnh trỏ đến một commit cụ thể trong Git history. Tags thường được dùng để mark releases, versions, hoặc milestones. Khác với branches, tags không thay đổi khi có commits mới.

### Ví dụ:

```bash
# Create commits
echo "initial" > file.txt
git add file.txt
git commit -m "Initial commit"

echo "feature" >> file.txt
git add file.txt
git commit -m "Add feature"

echo "bugfix" >> file.txt
git add file.txt
git commit -m "Fix bug"

# Create tag for release
git tag -a v1.0.0 -m "First release"

# List tags
git tag

# Output:
# v1.0.0 First release
```

### Use Cases:

| Use Case          | Description                               |
| ----------------- | ----------------------------------------- |
| **Releases**      | Mark production releases (v1.0.0, v2.0.0) |
| **Versions**      | Track semantic versioning                 |
| **Milestones**    | Mark important milestones                 |
| **Hotfixes**      | Tag hotfix releases (v1.0.1)              |
| **Pre-releases**  | Tag pre-releases (v1.0.0-rc1)             |
| **Documentation** | Document release notes                    |

### Best Practices:

1. **Use semantic versioning**: Sử dụng semantic versioning (v1.0.0)
2. **Use annotated tags**: Sử dụng annotated tags cho releases
3. **Tag releases**: Luôn tag releases
4. **Use meaningful messages**: Sử dụng descriptive messages
5. **Push tags**: Luôn push tags lên remote
6. **Document releases**: Document release notes trong tags

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Forget to tag releases
git commit -m "Release v1.0.0"
# No tag created

# ✅ Nên: Tag releases with meaningful messages
git commit -m "Release v1.0.0"
git tag -a v1.0.0 -m "First production release"
# Clear and documented
```

---

## Lightweight tags khác annotated tags như thế nào? / How are lightweight tags different from annotated tags?

### Mục đích / Purpose

Hiểu sự khác biệt giữa lightweight và annotated tags giúp bạn:

- Chọn đúng tag type cho tình huống
- Hiểu trade-offs giữa các types
- Sử dụng tags hiệu quả hơn

### Khi nào dùng / When to Use

| Tag Type        | Khi nào dùng                      |
| --------------- | --------------------------------- |
| **Lightweight** | Temporary tags, local development |
| **Annotated**   | Releases, versions, milestones    |

### Giả ích gì / Benefits

- **Lightweight**: Quick, simple, minimal overhead
- **Annotated**: Rich metadata, GPG signing, documentation

### So sánh chi tiết / Detailed Comparison

| Aspect           | Lightweight       | Annotated                        |
| ---------------- | ----------------- | -------------------------------- |
| **Creation**     | `git tag v1.0.0`  | `git tag -a v1.0.0 -m "message"` |
| **Metadata**     | None              | Name, email, date, message       |
| **Size**         | Small (~40 bytes) | Larger (~200+ bytes)             |
| **GPG**          | Cannot sign       | Can sign with GPG                |
| **Verification** | Cannot verify     | Can verify                       |
| **Use Case**     | Temporary, local  | Releases, versions               |
| **Performance**  | Faster            | Slower                           |

### Ví dụ:

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "First release"

# Show tag details
git show v1.0.0

# Lightweight tag output:
# commit abc1234

# Annotated tag output:
# tag v1.0.0
# Tagger: John Doe <john@example.com>
# Date: Mon Jan 1 10:00:00 2024 +0700
#
# First release
```

### Best Practices:

1. **Use annotated for releases**: Sử dụng annotated tags cho releases
2. **Use lightweight for temporary**: Sử dụng lightweight tags cho temporary
3. **Sign annotated tags**: Sử dụng GPG signing cho security
4. **Include metadata**: Bao gồm metadata trong annotated tags
5. **Use meaningful messages**: Sử dụng descriptive messages

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use lightweight tags for releases
git tag v1.0.0
git push --tags
# No metadata, cannot verify

# ✅ Nên: Use annotated tags for releases
git tag -a v1.0.0 -m "First production release"
git push --tags
# Has metadata, can be verified
```

---

## `git tag tagname` làm gì? / What does `git tag tagname` do?

### Mục đích / Purpose

Hiểu `git tag tagname` giúp bạn:

- Create lightweight tags
- Mark commits nhanh
- Create temporary references

### Khi nào dùng / When to Use

Sử dụng `git tag tagname` khi:

- Muốn create lightweight tag
- Muốn mark commit nhanh
- Muốn create temporary reference

### Giả ích gì / Benefits

- **Fast**: Create tags nhanh
- **Simple**: Dễ sử dụng
- **Lightweight**: Minimal overhead

### Định nghĩa / Definition

**`git tag tagname`** tạo một lightweight tag với tên được specified. Lightweight tag chỉ là một pointer đến commit, không có metadata.

### Ví dụ:

```bash
# Create lightweight tag
git tag v1.0.0

# Create lightweight tag at specific commit
git tag abc1234 v1.0.0

# Create lightweight tag with message
git tag -m "Bugfix" v1.0.1
```

### Best Practices:

1. **Use for temporary tags**: Sử dụng cho temporary tags
2. **Use annotated for releases**: Sử dụng annotated tags cho releases
3. **Use meaningful names**: Sử dụng tên tags rõ ràng
4. **Document purpose**: Document lý do tạo tag

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use lightweight tags for releases
git tag v1.0.0
git push --tags
# No metadata for releases

# ✅ Nên: Use annotated tags for releases
git tag -a v1.0.0 -m "First production release"
git push --tags
# Has metadata for releases
```

---

## `git tag -a tagname -m "message"` làm gì? / What does `git tag -a tagname -m "message"` do?

### Mục đích / Purpose

Hiểu `git tag -a tagname -m "message"` giúp bạn:

- Create annotated tags
- Add metadata cho tags
- Document releases
- Enable GPG signing

### Khi nào dùng / When to Use

Sử dụng `git tag -a tagname -m "message"` khi:

- Muốn create annotated tag
- Muốn add metadata cho tag
- Muốn document releases
- Muốn enable GPG signing
- Muốn create permanent references

### Giả ích gì / Benefits

- **Metadata**: Tạo tags với metadata
- **Documentation**: Document releases trong tags
- **Signing**: Enable GPG signing cho security
- **Verification**: Cho phép verify tags
- **Permanent**: Tạo permanent references

### Định nghĩa / Definition

**`git tag -a tagname -m "message"`** (hoặc `--annotate`) tạo một annotated tag với tên được specified, message, và metadata bao gồm tagger name, email, và date.

### Ví dụ:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "First production release"

# Show tag details
git show v1.0.0

# Output:
# tag v1.0.0
# Tagger: John Doe <john@example.com>
# Date: Mon Jan 1 10:00:00 2024 +0700
#
# First production release
```

### Metadata Included:

| Metadata     | Description                    |
| ------------ | ------------------------------ |
| **Tag Name** | Tên của tag                    |
| **Tagger**   | Tên và email của người tạo tag |
| **Date**     | Date tag được tạo              |
| **Message**  | Tag message                    |

### Best Practices:

1. **Use annotated for releases**: Luôn dùng annotated tags cho releases
2. **Use meaningful messages**: Sử dụng descriptive messages
3. **Include version info**: Bao gồm version trong tag name/message
4. **Sign releases**: Sử dụng GPG signing cho production releases
5. **Document changes**: Document những gì được release

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Use lightweight tags for releases
git tag v1.0.0
git push --tags
# No metadata

# ✅ Nên: Use annotated tags for releases
git tag -a v1.0.0 -m "First production release"
git push --tags
# Has metadata, can be verified
```

---

## `git tag -l` làm gì? / What does `git tag -l` do?

### Mục đích / Purpose

Hiểu `git tag -l` giúp bạn:

- List tất cả tags
- Xem tag names và messages
- Review existing tags

### Khi nào dùng / When to Use

Sử dụng `git tag -l` khi:

- Muốn xem tất cả tags
- Muốn review tag names
- Muốn check tag messages
- Muốn verify tags đã được created

### Giả ích gì / Benefits

- **List**: Xem tất cả tags
- **Review**: Review tag names và messages
- **Verify**: Verify tags đã được created
- **Search**: Search tags bằng pattern

### Định nghĩa / Definition

**`git tag -l`** (hoặc `--list`) hiển thị tất cả tags trong repository.

### Ví dụ:

```bash
# Create tags
git tag v1.0.0 -m "First release"
git tag v1.1.0 -m "Second release"
git tag v2.0.0 -m "Major release"

# List all tags
git tag -l

# Output:
# v1.0.0 First release
# v1.1.0 Second release
# v2.0.0 Major release

# List tags matching pattern
git tag -l "v1.*"

# Output:
# v1.0.0 First release
# v1.1.0 Second release
```

### Best Practices:

1. **Use -l to review**: Sử dụng để review tags
2. **Use with patterns**: Sử dụng patterns để search tags
3. **Check before creating**: Check tags trước khi tạo mới
4. **Use meaningful names**: Sử dụng tên tags rõ ràng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Create tags without checking
git tag v1.0.0 -m "First release"
# Don't know if tag already exists

# ✅ Nên: Check before creating
git tag -l
# Review existing tags
git tag v1.0.0 -m "First release"
# Create only if needed
```

---

## `git show tagname` hiển thị gì? / What does `git show tagname` display?

### Mục đích / Purpose

Hiểu `git show tagname` giúp bạn:

- Xem tag metadata
- Verify tag integrity
- Xem tag message và tagger info

### Khi nào dùng / When to Use

Sử dụng `git show tagname` khi:

- Muốn xem tag metadata
- Muốn verify tag integrity
- Muốn xem tag message
- Muốn xem tagger info

### Giả ích gì / Benefits

- **Metadata**: Xem tag metadata
- **Verification**: Verify tag integrity
- **Info**: Xem tag message và tagger info
- **Debug**: Debug tag issues

### Định nghĩa / Definition

**`git show tagname`** hiển thị thông tin chi tiết về tag bao gồm tag type, commit hash, tagger info, và message.

### Ví dụ:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "First release"

# Show tag details
git show v1.0.0

# Output:
# tag v1.0.0
# Tagger: John Doe <john@example.com>
# Date: Mon Jan 1 10:00:00 2024 +0700
#
# First production release
# commit abc1234
# Author: John Doe <john@example.com>
# Date: Mon Jan 1 09:00:00 2024 +0700
#
# Add new feature
```

### Tag Information Displayed:

| Information     | Description                    |
| --------------- | ------------------------------ |
| **Tag Name**    | Tên của tag                    |
| **Tag Type**    | Lightweight hoặc Annotated     |
| **Tagger**      | Tên và email của người tạo tag |
| **Date**        | Date tag được tạo              |
| **Message**     | Tag message                    |
| **Commit Hash** | Commit hash tag trỏ đến        |
| **Commit Info** | Commit author và date          |

### Best Practices:

1. **Use show to verify**: Sử dụng để verify tags
2. **Check tagger info**: Xem tagger info
3. **Verify annotated tags**: Kiểm tra annotated tags có metadata
4. **Use for debugging**: Sử dụng để debug tag issues

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Assume tag is correct
# Don't verify tag

# ✅ Nên: Verify tag before using
git show v1.0.0
# Verify tag has correct metadata
```

---

## `git push origin tagname` làm gì? / What does `git push origin tagname` do?

### Mục đích / Purpose

Hiểu `git push origin tagname` giúp bạn:

- Push tag lên remote
- Share tags với team
- Backup tags lên remote servers
- Distribute releases

### Khi nào dùng / When to Use

Sử dụng `git push origin tagname` khi:

- Muốn push tag lên remote
- Muốn share tag với team
- Muốn backup tag lên remote servers
- Muốn distribute releases

### Giả ích gì / Benefits

- **Share**: Share tags với team
- **Backup**: Backup tags lên remote servers
- **Distribution**: Facilitate software distribution
- **CI/CD**: Integrate với CI/CD pipelines

### Định nghĩa / Definition

**`git push origin tagname`** pushes một specific tag lên remote repository.

### Ví dụ:

```bash
# Create tag
git tag -a v1.0.0 -m "First release"

# Push specific tag
git push origin v1.0.0

# Push all tags
git push --tags

# Output: Tags are pushed to origin
```

### Best Practices:

1. **Push tags after creating**: Push tags ngay sau khi tạo
2. **Use --tags for all**: Sử dụng `--tags` để push tất cả tags
3. **Verify tags**: Verify tags đã được pushed
4. **Use meaningful names**: Sử dụng tên tags rõ ràng

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Forget to push tags
git tag v1.0.0 -m "First release"
# Tag only exists locally

# ✅ Nên: Push tags immediately
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0
# Tag is pushed to remote
```

---

## `git push --tags` làm gì? / What does `git push --tags` do?

### Mục đích / Purpose

Hiểu `git push --tags` giúp bạn:

- Push tất cả tags lên remote
- Backup tất cả tags
- Distribute tất cả releases

### Khi nào dùng / When to Use

Sử dụng `git push --tags` khi:

- Muốn push tất cả tags
- Muốn backup tất cả tags
- Muốn distribute tất cả releases
- Sync tất cả tags với remote

### Giả ích gì / Benefits

- **All**: Pushes tất cả tags
- **Backup**: Backups tất cả tags
- **Sync**: Syncs tất cả tags với remote
- **Distribution**: Facilitates distribution

### Định nghĩa / Definition

**`git push --tags`** pushes tất cả local tags lên remote repository.

### Ví dụ:

```bash
# Create multiple tags
git tag v1.0.0 -m "First release"
git tag v1.1.0 -m "Second release"
git tag v2.0.0 -m "Major release"

# Push all tags
git push --tags

# Output: All tags are pushed to origin
```

### Best Practices:

1. **Use for backup**: Sử dụng để backup tất cả tags
2. **Use for distribution**: Sử dụng để distribute releases
3. **Verify after pushing**: Verify tags đã được pushed
4. **Use with care**: Cẩn thận khi push nhiều tags
5. **Check remote tags**: Verify remote tags trước khi push

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Push without verifying
git push --tags
# Don't know what's being pushed

# ✅ Nên: Verify before pushing
git tag -l
# Review tags
git push --tags
# Know what's being pushed
```

---

## Cách xóa tags? / How to delete tags?

### Mục đích / Purpose

Biết cách xóa tags giúp bạn:

- Clean up old tags
- Remove incorrect tags
- Maintain tag repository
- Fix tag mistakes

### Khi nào dùng / When to Use

Sử dụng khi:

- Muốn xóa old tags
- Muốn remove incorrect tags
- Muốn clean up tag repository
- Muốn fix tag mistakes

### Cách thực hiện / How to Do It

#### 1. Delete local tag

```bash
# Delete local tag
git tag -d v1.0.0

# Force delete local tag
git tag -D v1.0.0
```

#### 2. Delete remote tag

```bash
# Delete remote tag
git push origin --delete v1.0.0

# Or use : syntax
git push origin :v1.0.0
```

#### 3. Delete all local tags matching pattern

```bash
# Delete all local tags matching pattern
git tag -d "v1.*"
```

### Best Practices:

1. **Delete old tags**: Xóa old tags
2. **Verify before deleting**: Verify trước khi xóa
3. **Use -d for safety**: Sử dụng `-d` trước `-D`
4. **Document deletions**: Document lý do xóa tags
5. **Clean up regularly**: Clean up tags thường xuyên

### Anti-patterns cần tránh

```bash
# ❌ Không nên: Delete without verifying
git tag -D v1.0.0
# Don't know if tag is still needed

# ✅ Nên: Verify before deleting
git tag -l
# Review tags
git tag -d v1.0.0
# Delete only if needed
```

---

## Tổng kết / Summary

### Key Takeaways:

1. **Git Tags** là static references trỏ đến commits
2. **Lightweight tags** là simple pointers, **annotated tags** có metadata
3. **`git tag tagname`** tạo lightweight tag
4. **`git tag -a tagname -m "message"`** tạo annotated tag
5. **`git tag -l`** list tất cả tags
6. **`git show tagname`** hiển thị tag metadata
7. **`git push origin tagname`** push specific tag lên remote
8. **`git push --tags`** push tất cả tags lên remote
9. **Use annotated tags cho releases**: Luôn dùng annotated tags cho releases
10. **Use lightweight tags cho temporary**: Sử dụng lightweight tags cho temporary

### Commands Reference:

| Command                            | Purpose                   |
| ---------------------------------- | ------------------------- |
| `git tag tagname`                  | Create lightweight tag    |
| `git tag -a tagname -m "message"`  | Create annotated tag      |
| `git tag -l`                       | List tất cả tags          |
| `git show tagname`                 | Show tag metadata         |
| `git push origin tagname`          | Push specific tag         |
| `git push --tags`                  | Push tất cả tags          |
| `git tag -d tagname`               | Delete local tag (safely) |
| `git tag -D tagname`               | Force delete local tag    |
| `git push origin --delete tagname` | Delete remote tag         |

### Best Practices:

1. **Use annotated for releases**: Luôn dùng annotated tags cho releases
2. **Use semantic versioning**: Sử dụng semantic versioning (v1.0.0)
3. **Use meaningful messages**: Sử dụng descriptive messages
4. **Push tags immediately**: Push tags ngay sau khi tạo
5. **Delete old tags**: Xóa old tags
6. **Verify tags**: Verify tags trước khi sử dụng
7. **Sign releases**: Sử dụng GPG signing cho production releases
8. **Document releases**: Document release notes trong tags

### Tag Naming Conventions:

```bash
# Semantic versioning
v1.0.0
v1.0.1
v1.1.0
v2.0.0

# Pre-releases
v1.0.0-rc1
v1.0.0-beta1
v1.0.0-alpha1

# Hotfixes
v1.0.1
v1.0.2
```

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
