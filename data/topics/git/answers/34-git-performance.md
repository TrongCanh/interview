# Git Performance / Git Performance

> Hướng dẫn chi tiết về cách tối ưu hóa hiệu suất Git / Comprehensive guide to optimizing Git performance

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách tối ưu hóa hiệu suất Git cho large repositories.

Understand how to optimize Git performance for large repositories.

### Khi nào cần hiểu / When to understand

- Khi repository quá lớn và Git bị chậm
- Khi clone/pull mất nhiều thời gian
- Khi repository size quá lớn
- Khi cần giảm thời gian clone/pull

- When repository is too large and Git is slow
- When clone/pull takes too long
- When repository size is too large
- When needing to reduce clone/pull time

### Giá trị gì / Benefits

- Clone và pull nhanh hơn
- Repository size nhỏ hơn
- Git operations hiệu quả hơn
- Tăng hiệu suất team
- Tiết kiệm chi phí bandwidth

- Faster clone and pull
- Smaller repository size
- More efficient Git operations
- Increase team productivity
- Save bandwidth costs

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Git có nhiều options tối ưu
- Có thể giảm size đáng kể
- Clone và pull nhanh hơn
- Tích hợp sẵn với Git LFS

**Nhược điểm / Cons:**

- Cần hiểu sâu về Git internals
- Có thể phức tạp cấu hình
- Trade-offs giữa size và tốc độ
- Git LFS cần thêm setup

**Pros:**

- Git has many optimization options
- Can significantly reduce size
- Faster clone and pull
- Integrates with Git LFS

**Cons:**

- Need deep understanding of Git internals
- Can be complex to configure
- Trade-offs between size and speed
- Git LFS requires additional setup

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Shallow clone (`git clone --depth 1`) là gì? / What is shallow clone (`git clone --depth 1`)?

#### Mục đích / Purpose

Hiểu cách shallow clone để giảm thời gian clone.

Understand how to use shallow clone to reduce clone time.

#### Khi nào dùng / When to use

Khi chỉ cần lịch sử gần đây, không phải toàn bộ.

When only needing recent history, not entire history.

#### Giá trị gì / Benefits

- Clone nhanh hơn nhiều
- Giảm bandwidth usage
- Repository size nhỏ hơn
- Tăng hiệu suất

- Faster clone
- Reduce bandwidth usage
- Smaller repository size
- Increase productivity

#### Định nghĩa / Definition

Shallow clone chỉ clone một số commits gần nhất:

```bash
git clone --depth 1 <URL>
```

- `--depth 1`: Chỉ clone commit gần nhất
- Repository size nhỏ hơn
- Không có lịch sử cũ

Shallow clone only clones a specific number of recent commits:

```bash
git clone --depth 1 <URL>
```

- `--depth 1`: Clone only latest commit
- Smaller repository size
- No old history

#### Ví dụ / Examples

**Shallow clone:**

```bash
# Clone chỉ commit gần nhất
git clone --depth 1 https://github.com/user/project.git

# Kết quả: Repository ~100MB thay vì ~500MB
# Clone time: 30 giây thay vì 10 phút
```

**Clone với depth cụ thể:**

```bash
# Clone 10 commits gần nhất
git clone --depth 10 https://github.com/user/project.git
```

**Shallow clone cho large repository:**

```bash
# Repository có 10,000 commits
git clone --depth 1 https://github.com/user/project.git

# Kết quả: Repository ~50MB thay vì ~5GB
# Clone time: 2 phút thay vì 30 phút
```

**So sánh shallow và full clone:**

```bash
# Full clone
git clone https://github.com/user/project.git
# Size: 5GB, Time: 30 phút

# Shallow clone
git clone --depth 1 https://github.com/user/project.git
# Size: 100MB, Time: 30 giây
```

#### Best Practices

1. **Dùng shallow clone** khi không cần lịch sử cũ
2. **Chọn depth phù hợp** với nhu cầu
3. **Convert sang full clone** nếu cần lịch sử cũ
4. **Sử dụng cho large repositories**

5. **Use shallow clone** when old history not needed
6. **Choose appropriate depth** for needs
7. **Convert to full clone** if old history needed
8. **Use for large repositories**

#### Anti-patterns

- ❌ Dùng shallow clone khi cần lịch sử đầy đủ
- ❌ Depth quá nhỏ
- ❌ Không convert sang full clone khi cần
- ❌ Dùng shallow clone cho mọi repository

- ❌ Use shallow clone when full history needed
- ❌ Depth too small
- ❌ Don't convert to full clone when needed
- ❌ Use shallow clone for all repositories

---

### Q2: Partial clone (`git clone --filter`) là gì? / What is partial clone (`git clone --filter`)?

#### Mục đích / Purpose

Hiểu cách partial clone để clone chỉ một phần của repository.

Understand how to use partial clone to clone only part of repository.

#### Khi nào dùng / When to use

Khi chỉ cần một phần của repository (ví dụ: chỉ src/, không docs).

When only needing part of repository (e.g., only src/, not docs).

#### Giá trị gì / Benefits

- Clone nhanh hơn
- Repository size nhỏ hơn
- Tiết kiệm bandwidth
- Clone chỉ những gì cần thiết

- Faster clone
- Smaller repository size
- Save bandwidth
- Clone only what's needed

#### Định nghĩa / Definition

Partial clone sử dụng filter để clone chỉ một phần:

```bash
git clone --filter <pattern> <URL>
```

- `--filter`: Loại bỏ files/directories không cần
- Repository chỉ bao gồm những gì được filter

Partial clone uses filter to clone only part of repository:

```bash
git clone --filter <pattern> <URL>
```

- `--filter`: Exclude files/directories not needed
- Repository only includes what's filtered

#### Ví dụ / Examples

**Clone chỉ src/:**

```bash
# Chỉ clone src/, loại bỏ docs/
git clone --filter=src: --exclude=docs https://github.com/user/project.git

# Kết quả: Repository ~400MB thay vì ~5GB
# Chỉ có src/ directory
```

**Clone chỉ code, loại bỏ tests:**

```bash
# Chỉ clone code, loại bỏ tests/
git clone --filter=src: --exclude=tests https://github.com/user/project.git
```

**Clone nhiều paths:**

```bash
# Clone src/ và lib/, loại bỏ docs/ và tests/
git clone --filter=src: --filter=lib: --exclude=docs --exclude=tests https://github.com/user/project.git
```

**Sparse checkout kết hợp:**

```bash
# Clone rồi sparse checkout
git clone --depth 1 --no-checkout https://github.com/user/project.git
cd project
git sparse-checkout init --cone
git sparse-checkout set src/
git sparse-checkout set lib/
git read-tree -mu HEAD
```

#### Best Practices

1. **Dùng partial clone** khi chỉ cần một phần
2. **Kết hợp với sparse checkout** để tối ưu
3. **Kiểm tra filters** trước khi clone
4. **Document partial clone workflow**

5. **Use partial clone** when only needing part of repository
6. **Combine with sparse checkout** to optimize
7. **Check filters** before cloning
8. **Document partial clone workflow**

#### Anti-patterns

- ❌ Dùng partial clone khi cần toàn bộ
- ❌ Filter quá phức tạp
- ❌ Không kết hợp với sparse checkout
- ❌ Không document workflow
- ❌ Clone quá nhiều paths không cần

- ❌ Use partial clone when full repo needed
- ❌ Filters too complex
- ❌ Don't combine with sparse checkout
- ❌ Don't document workflow
- ❌ Clone too many paths not needed

---

### Q3: Sparse checkout là gì? / What is sparse checkout?

#### Mục đích / Purpose

Hiểu cách sparse checkout để chỉ checkout một phần của repository.

Understand how to use sparse checkout to checkout only part of repository.

#### Khi nào dùng / When to use

Khi chỉ cần một phần của repository (ví dụ: chỉ src/).

When only needing part of repository (e.g., only src/).

#### Giá trị gì / Benefits

- Clone nhanh hơn
- Repository size nhỏ hơn
- Tiết kiệm bandwidth
- Git operations hiệu quả hơn
- Chỉ làm việc với những gì cần

- Faster clone
- Smaller repository size
- Save bandwidth
- More efficient Git operations
- Work only with what's needed

#### Định nghĩa / Definition

Sparse checkout cho phép chỉ checkout một phần của repository:

```bash
git sparse-checkout init --cone
git sparse-checkout set <path>
```

- `init --cone`: Chỉ checkout working directory
- `set <path>`: Thêm paths cần thiết

Sparse checkout allows checking out only part of repository:

```bash
git sparse-checkout init --cone
git sparse-checkout set <path>
```

- `init --cone`: Checkout only working directory
- `set <path>`: Add needed paths

#### Ví dụ / Examples

**Sparse checkout chỉ src/:**

```bash
# Clone repository
git clone https://github.com/user/project.git
cd project

# Khởi tạo sparse checkout
git sparse-checkout init --cone

# Chỉ checkout src/
git sparse-checkout set src/

# Xem cấu trúc
git sparse-checkout list
# src/
# lib/
# docs/ (không checkout)
```

**Sparse checkout nhiều paths:**

```bash
# Checkout src/ và lib/
git sparse-checkout init --cone
git sparse-checkout set src/ lib/

# Xem cấu trúc
git sparse-checkout list
# src/
# lib/
# docs/ (không checkout)
# tests/ (không checkout)
```

**Sparse checkout với depth:**

```bash
# Shallow clone + sparse checkout
git clone --depth 1 --no-checkout https://github.com/user/project.git
cd project
git sparse-checkout init --cone
git sparse-checkout set src/
```

**Thêm paths sau khi init:**

```bash
# Thêm lib/ sau khi đã checkout
git sparse-checkout set lib/
```

#### Best Practices

1. **Dùng sparse checkout** cho large repositories
2. **Kết hợp với shallow clone** để tối ưu
3. **Xem cấu trúc** với `git sparse-checkout list`
4. **Xóa paths không cần thiết** với `git sparse-checkout disable`

5. **Use sparse checkout** for large repositories
6. **Combine with shallow clone** to optimize
7. **View structure** with `git sparse-checkout list`
8. **Remove unneeded paths** with `git sparse-checkout disable`

#### Anti-patterns

- ❌ Dùng sparse checkout cho repository nhỏ
- ❌ Không kết hợp với shallow clone
- ❌ Quên xem cấu trúc
- ❌ Không xóa paths không cần
- ❌ Checkout toàn repository khi chỉ cần một phần

- ❌ Use sparse checkout for small repo
- ❌ Don't combine with shallow clone
- ❌ Don't view structure
- ❌ Don't remove unneeded paths
- ❌ Checkout entire repo when only need part

---

### Q4: `git gc` (garbage collection) làm gì? / What does `git gc` (garbage collection) do?

#### Mục đích / Purpose

Hiểu cách dùng git gc để dọn dẹp và tối ưu repository.

Understand how to use git gc to clean up and optimize repository.

#### Khi nào dùng / When to use

Khi repository có nhiều loose objects hoặc cần dọn dẹp.

When repository has many loose objects or needs cleanup.

#### Giá trị gì / Benefits

- Repository size nhỏ hơn
- Git operations nhanh hơn
- Dọn dẹp không cần thiết
- Tối ưu hóa storage
- Tiết kiệm disk space

- Smaller repository size
- Faster Git operations
- Clean up unnecessary files
- Optimize storage
- Save disk space

#### Định nghĩa / Definition

`git gc` (garbage collection) dọn dẹp các objects không cần thiết:

```bash
git gc
```

- Loại bỏ unreachable objects
- Nén các pack files
- Dọn dẹp loose objects

`git gc` (garbage collection) cleans up unnecessary objects:

```bash
git gc
```

- Remove unreachable objects
- Compress pack files
- Clean up loose objects

#### Ví dụ / Examples

**Chạy git gc:**

```bash
# Chạy garbage collection
git gc

# Output
Enumerating objects: 50000, done.
Counting objects: 100% (50000/50000), done.
Compressing objects: 100% (12345/12345), done.
Writing objects: 100% (4567/4567), done.
```

**Chạy git gc với verbose:**

```bash
# Xem chi tiết quá trình
git gc --verbose

# Output
Enumerating objects: 50000, done.
Counting objects: 100% (50000/50000), done.
Compressing objects: 100% (12345/12345), done.
Writing objects: 100% (4567/4567), done.
```

**Chạy git gc với aggressive:**

```bash
# Dọn dẹp tích cực hơn
git gc --aggressive

# Loại bỏ nhiều objects hơn
# Repository size giảm nhiều hơn
```

**Chạy git gc thủ công cho từng directory:**

```bash
# Dọn dẹp từng directory
git gc --aggressive --prune=now
```

#### Best Practices

1. **Chạy git gc thường xuyên** để dọn dẹp
2. **Dùng --aggressive** khi repository rất lớn
3. **Chạy gc trước khi backup**
4. **Kiểm tra disk space** sau khi gc
5. **Không chạy gc quá thường**

6. **Run git gc regularly** to clean up
7. **Use --aggressive** for very large repos
8. **Run gc before backup**
9. **Check disk space** after gc
10. **Don't run gc too frequently**

#### Anti-patterns

- ❌ Chạy git gc quá thường
- ❌ Dùng --aggressive cho repository nhỏ
- ❌ Chạy gc trước khi backup
- ❌ Không kiểm tra disk space
- ❌ Chạy gc trong production mà không kiểm tra

- ❌ Run gc too often
- ❌ Use --aggressive for small repo
- ❌ Run gc before backup
- ❌ Don't check disk space
- ❌ Run gc in production without checking

---

### Q5: `git prune` làm gì? / What does `git prune` do?

#### Mục đích / Purpose

Hiểu cách dùng git prune để xóa unreachable references.

Understand how to use git prune to remove unreachable references.

#### Khi nào dùng / When to use

Khi có nhiều unreachable references cần xóa.

When having many unreachable references that need removal.

#### Giá trị gì / Benefits

- Repository size nhỏ hơn
- Git operations nhanh hơn
- Dọn dẹp references không cần thiết
- Tối ưu hóa performance

- Smaller repository size
- Faster Git operations
- Clean up unnecessary references
- Optimize performance

#### Định nghĩa / Definition

`git prune` xóa các unreachable references:

```bash
git prune
```

- Loại bỏ branches/tags không có commit
- Giảm repository size
- Tối ưu hóa Git operations

`git prune` removes unreachable references:

```bash
git prune
```

- Remove branches/tags without commits
- Reduce repository size
- Optimize Git operations

#### Ví dụ / Examples

**Prune branches:**

```bash
# Xóa unreachable branches
git prune

# Prune tags
git prune --tags
```

**Prune với dry run:**

```bash
# Xem những gì sẽ bị xóa
git prune --dry-run --verbose

# Prune thực sự
git prune
```

**Prune remote branches:**

```bash
# Xóa unreachable remote branches
git prune --origin

# Prune với expire
git prune --expire=2.weeks.ago
```

#### Best Practices

1. **Chạy prune thường xuyên** để dọn dẹp
2. **Dùng --dry run** trước khi prune thực sự
3. **Kiểm tra trước khi prune remote branches**
4. **Dùng --expire** cho remote branches

5. **Run prune regularly** to clean up
6. **Use --dry run** before actual prune
7. **Check before pruning remote branches**
8. **Use --expire** for remote branches

#### Anti-patterns

- ❌ Không prune thường xuyên
- ❌ Dùng prune thực sự mà không test
- ❌ Prune remote branches mà không kiểm tra
- ❌ Không dùng --expire cho remote branches
- ❌ Prune without checking

- ❌ Don't prune regularly
- ❌ Prune without testing
- ❌ Don't check before pruning remote
- ❌ Don't use --expire for remote branches

---

### Q6: Cách handle large files? / How to handle large files?

#### Mục đích / Purpose

Hiểu các phương pháp để xử lý large files trong Git.

Understand methods to handle large files in Git.

#### Khi nào dùng / When to use

Khi project có large files ảnh hưởng đến Git.

When project has large files affecting Git.

#### Giá trị gì / Benefits

- Repository size nhỏ hơn
- Git performance tốt hơn
- Dễ quản lý và clone

- Smaller repository size
- Better Git performance
- Easier to manage and clone

#### Định nghĩa / Definition

Các phương pháp xử lý large files:

1. **Git LFS**: Lưu large files trên LFS server
2. **Git attributes**: Đánh dấu large files
3. **Sparse checkout**: Chỉ checkout cần thiết
4. **Partial clone**: Clone chỉ phần cần thiết
5. **Shallow clone**: Clone chỉ commits gần nhất

Methods to handle large files:

1. **Git LFS**: Store large files on LFS server
2. **Git attributes**: Mark large files
3. **Sparse checkout**: Checkout only needed parts
4. **Partial clone**: Clone only needed parts
5. **Shallow clone**: Clone only recent commits

#### Ví dụ / Examples

**Sử dụng Git LFS:**

```bash
# Track large files
git lfs track "*.png"
git lfs track "*.mp4"

# Repository size giảm từ 5GB xuống 500MB
```

**Sử dụng sparse checkout:**

```bash
# Chỉ checkout src/
git sparse-checkout init --cone
git sparse-checkout set src/

# Repository size giảm từ 5GB xuống 1GB
```

**Kết hợp nhiều phương pháp:**

```bash
# Git LFS cho media files
# Sparse checkout cho code
# Shallow clone cho history gần đây
git clone --depth 1 --filter=blob:*.png https://github.com/user/project.git
```

#### Best Practices

1. **Dùng Git LFS** cho files > 100MB
2. **Sparse checkout** cho directories không cần
3. **Partial clone** cho modules không cần thiết
4. **Kết hợp các phương pháp** để tối ưu
5. **Document large file strategy** trong README

6. **Use Git LFS** for files > 100MB
7. **Sparse checkout** for unneeded directories
8. **Partial clone** for unneeded modules
9. **Combine methods** to optimize
10. **Document large file strategy** in README

#### Anti-patterns

- ❌ Commit large files vào Git
- ❌ Không dùng Git LFS cho files lớn
- ❌ Checkout toàn repository khi chỉ cần một phần
- ❌ Không document large file strategy
- ❌ Commit large files into Git
- ❌ Don't use Git LFS for large files
- ❌ Checkout entire repo when only need part
- ❌ Don't document large file strategy

---

### Q7: Network optimization tips? / Network optimization tips?

#### Mục đích / Purpose

Hiểu cách tối ưu hóa Git network operations.

Understand how to optimize Git network operations.

#### Khi nào dùng / When to use

Khi clone/pull mất nhiều thời gian do mạng.

When clone/pull takes too long due to network.

#### Giá trị gì / Benefits

- Clone và pull nhanh hơn
- Tiết kiệm bandwidth
- Tăng hiệu suất team
- Giảm chi phí

- Faster clone and pull
- Save bandwidth
- Increase team productivity
- Reduce costs

#### Định nghĩa / Definition

Các tips tối ưu hóa Git network:

1. **Sử dụng shallow clone**: Giảm dữ liệu cần tải
2. **Sử dụng partial clone**: Chỉ tải cần thiết
3. **Sparse checkout**: Giảm kích thước
4. **Sử dụng Git LFS**: Tách biệt large files
5. **Sử dụng compression**: Giảm bandwidth

Network optimization tips:

1. **Use shallow clone**: Reduce data to download
2. **Use partial clone**: Download only needed parts
3. **Sparse checkout**: Reduce download size
4. **Use Git LFS**: Separate large files
5. **Use compression**: Reduce bandwidth

#### Ví dụ / Examples

**Shallow clone + partial clone:**

```bash
# Chỉ clone 50 commits gần nhất, chỉ src/
git clone --depth 50 --filter=src: --exclude=tests https://github.com/user/project.git

# Repository size: ~200MB thay vì ~5GB
# Clone time: 2 phút thay vì 20 phút
```

**Git LFS cho media files:**

```bash
# Track large media files
git lfs track "*.mp4"
git lfs track "*.mov"

# Repository size: ~100MB cho code
# Media files trên LFS server
```

#### Best Practices

1. **Dùng shallow clone** cho repositories lớn
2. **Kết hợp sparse checkout** để giảm kích thước
3. **Sử dụng Git LFS** cho media files
4. **Kiểm tra bandwidth** trước khi clone
5. **Tối ưu hóa cho từng project**

6. **Use shallow clone** for large repositories
7. **Combine with sparse checkout** to reduce size
8. **Use Git LFS** for media files
9. **Check bandwidth** before cloning
10. **Optimize per project**

#### Anti-patterns

- ❌ Không tối ưu hóa network
- ❌ Clone toàn repository khi không cần
- ❌ Không dùng Git LFS cho large files
- ❌ Không kiểm tra bandwidth
- ❌ Tối ưu hóa không phù hợp

- ❌ Don't optimize network
- ❌ Clone entire repo when not needed
- ❌ Don't use Git LFS for large files
- ❌ Don't check bandwidth
- ❌ Optimize inappropriately

---

### Q8: Repository size management? / Repository size management?

#### Mục đích / Purpose

Hiểu cách quản lý và giảm kích thước repository.

Understand how to manage and reduce repository size.

#### Khi nào dùng / When to use

Khi repository quá lớn cần giảm kích thước.

When repository is too large and needs size reduction.

#### Giá trị gì / Benefits

- Clone và pull nhanh hơn
- Tiết kiệm disk space
- Tăng hiệu suất Git
- Giảm chi phí storage

- Faster clone and pull
- Save disk space
- Improve Git performance
- Reduce storage costs

#### Định nghĩa / Definition

Các phương pháp quản lý repository size:

1. **Git LFS**: Tách biệt large files
2. **Git attributes**: Đánh dấu binary files
3. **Sparse checkout**: Chỉ checkout cần thiết
4. **Shallow clone**: Giảm lịch sử
5. **Regular cleanup**: Dọn dẹp không cần thiết

Repository size management methods:

1. **Git LFS**: Separate large files
2. **Git attributes**: Mark binary files
3. **Sparse checkout**: Checkout only needed parts
4. **Shallow clone**: Reduce history
5. **Regular cleanup**: Clean up unnecessary

#### Ví dụ / Examples

**Repository size trước khi tối ưu:**

```bash
# Repository size: 5GB
# .git: 2GB
# assets/: 2GB
# src/: 1GB

# Clone time: 30 phút
```

**Sau khi tối ưu:**

```bash
# Repository size: 1GB
# .git: 500MB
# assets/: 0 (LFS)
# src/: 500MB

# Clone time: 5 phút
```

**Git LFS setup:**

```bash
# Track large files
git lfs track "*.mp4"
git lfs track "*.mov"

# Kết quả
# assets/ được chuyển sang LFS
# Repository size giảm 80%
```

#### Best Practices

1. **Dùng Git LFS** cho files > 100MB
2. **Sparse checkout** cho directories không cần
3. **Chạy git gc** thường xuyên
4. **Kiểm tra size** thường xuyên
5. **Document size strategy** trong README

6. **Use Git LFS** for files > 100MB
7. **Sparse checkout** for unneeded directories
8. **Run git gc** regularly
9. **Check size** regularly
10. **Document size strategy** in README

#### Anti-patterns

- ❌ Không quản lý size
- ❌ Dùng Git cho mọi file
- ❌ Không chạy git gc
- ❌ Không kiểm tra size thường xuyên
- ❌ Không document size strategy

- ❌ Don't manage size
- ❌ Use Git for all files
- ❌ Don't run git gc
- ❌ Don't check size regularly
- ❌ Don't document size strategy

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Shallow clone** (`--depth 1`) chỉ clone commits gần nhất để giảm thời gian
2. **Partial clone** (`--filter`) chỉ clone phần cần thiết của repository
3. **Sparse checkout** chỉ checkout một phần của repository
4. **`git gc`** dọn dẹp unreachable objects để tối ưu hóa storage
5. **`git prune`** xóa unreachable references để giảm kích thước
6. **Git LFS** tách biệt large files khỏi repository
7. **Network optimization** dùng shallow clone, partial clone, và Git LFS

8. **Shallow clone** (`--depth 1`) clones only recent commits to reduce time
9. **Partial clone** (`--filter`) clones only needed parts of repository
10. **Sparse checkout** checks out only part of repository
11. \*\*`git gc` cleans up unreachable objects to optimize storage
12. \*\*`git prune` removes unreachable references to reduce size
13. **Git LFS** separates large files from repository
14. **Network optimization** uses shallow clone, partial clone, and Git LFS

### Commands Reference / Tham khảo lệnh

```bash
# Shallow clone
git clone --depth 1 <URL>
git clone --depth 10 <URL>

# Partial clone
git clone --filter=src: --exclude=docs <URL>
git clone --filter=blob:*.png <URL>

# Sparse checkout
git sparse-checkout init --cone
git sparse-checkout set <path>
git sparse-checkout list

# Git gc
git gc
git gc --aggressive
git gc --prune=now

# Git prune
git prune
git prune --dry-run
git prune --expire=2.weeks.ago

# Git LFS
git lfs track "*.extension"
git lfs ls-files
```

### Best Practices / Thực hành tốt nhất

1. **Dùng shallow clone** cho repositories lớn
2. **Sử dụng partial clone** khi chỉ cần một phần
3. **Kết hợp sparse checkout** với shallow clone
4. **Chạy git gc** thường xuyên để dọn dẹp
5. **Sử dụng Git LFS** cho files > 100MB
6. **Kiểm tra repository size** thường xuyên
7. **Document large file strategy** trong README

8. **Use shallow clone** for large repositories
9. **Use partial clone** when only needing part
10. **Combine sparse checkout** with shallow clone
11. **Run git gc** regularly to clean up
12. **Use Git LFS** for files > 100MB
13. **Check repository size** regularly
14. **Document large file strategy** in README
