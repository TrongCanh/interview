# 42. Git Internals / Cấu trúc nội bộ của Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu về cách Git lưu trữ và quản lý data ở cấp độ thấp.

### Khi nào cần hiểu / When to Understand

- Khi cần debug complex Git issues
- Khi cần customize Git behavior
- Khi chuẩn bị cho advanced Git roles

### Giá trị gì / Benefits

- Hiểu sâu hơn về Git
- Debug issues hiệu quả hơn
- Tận dụng Git features tốt hơn

---

## Câu hỏi 1: Git object model là gì?

### Mục đích / Purpose

Hiểu về cách Git lưu trữ data.

### Khi nào dùng / When to Use

Khi cần hiểu Git internals.

### Giá trị gì / Benefits

- Hiểu Git storage
- Debug issues
- Tối ưu repository

### Định nghĩa / Definition

Git lưu trữ data dưới dạng objects: blobs, trees, commits, và tags.

### Ví dụ / Examples

```bash
# Git object types:
# 1. Blob: File content (không có filename)
# 2. Tree: Directory structure
# 3. Commit: Commit metadata và tree reference
# 4. Tag: Reference đến commit với metadata

# Xem object
git cat-file -p <object-hash>

# Xem object type
git cat-file -t <object-hash>

# Xem object size
git cat-file -s <object-hash>

# Ví dụ:
# 1. Tạo file
echo "Hello, World!" > hello.txt

# 2. Add file
git add hello.txt

# 3. Xem object
git cat-file -p $(git ls-files -s | awk '{print $2}')

# Output:
# Hello, World!

# 4. Xem object type
git cat-file -t $(git ls-files -s | awk '{print $2}')

# Output:
# blob

# 5. Commit và xem commit object
git commit -m "Add hello.txt"
git cat-file -p HEAD

# Output:
# tree abc1234...
# author John Doe <john@example.com> 1234567890 +0000
# committer John Doe <john@example.com> 1234567890 +0000
#
# Add hello.txt
```

### Best Practices

- Hiểu object types
- Dùng `git cat-file` để debug
- Hiểu Git storage model

### Anti-patterns

- Bỏ qua Git internals
- Không hiểu object types
- Manipulate objects trực tiếp

---

## Câu hỏi 2: Git hash là gì?

### Mục đích / Purpose

Hiểu về cách Git tạo và sử dụng hashes.

### Khi nào dùng / When to Use

Khi cần hiểu Git integrity và deduplication.

### Giá trị gì / Benefits

- Hiểu Git integrity
- Debug corrupted repositories
- Hiểu deduplication

### Định nghĩa / Definition

Git hash (SHA-1) là unique identifier cho Git objects.

### Ví dụ / Examples

```bash
# Git hash format:
# 40-character hexadecimal string
# Ví dụ: abc1234def5678...

# Hash được tạo từ:
# - Object type
# - Object size
# - Object content

# Tính hash cho string
echo -n "Hello, World!" | git hash-object --stdin

# Output:
# abc1234def5678... (SHA-1 hash)

# Hash cho file
git hash-object hello.txt

# Hash cho staged file
git hash-object -w hello.txt

# Xem object hash
git rev-parse HEAD

# Xem object hash cho file trong working directory
git ls-files -s

# Output:
# abc1234... 100644 hello.txt

# Hash integrity:
# Nếu content thay đổi, hash thay đổi
# Nếu content giống nhau, hash giống nhau

# Ví dụ deduplication:
# 1. Tạo 2 files với cùng content
echo "Hello" > file1.txt
echo "Hello" > file2.txt

# 2. Add cả 2 files
git add file1.txt file2.txt

# 3. Xem hashes
git ls-files -s

# Output:
# abc1234... 100644 file1.txt
# abc1234... 100644 file2.txt

# Cùng hash vì content giống nhau!
```

### Best Practices

- Hiểu hash uniqueness
- Hiểu hash integrity
- Hiểu deduplication

### Anti-patterns

- Không hiểu hash uniqueness
- Manipulate hashes
- Rely on hash format

---

## Câu hỏi 3: Git refs là gì?

### Mục đích / Purpose

Hiểu về cách Git references commits và objects.

### Khi nào dùng / When to Use

Khi cần hiểu Git references.

### Giá trị gì / Benefits

- Navigate Git history
- Hiểu Git branches và tags
- Debug references

### Định nghĩa / Definition

Git refs là pointers đến commits hoặc objects.

### Ví dụ / Examples

```bash
# Git ref types:
# 1. HEAD: Reference đến current branch
# 2. Branches: References đến commits
# 3. Tags: References đến commits với metadata
# 4. Remote branches: References đến remote commits

# Xem HEAD
git symbolic-ref HEAD

# Output:
# refs/heads/main

# Xem HEAD hash
git rev-parse HEAD

# Xem branch refs
git show-ref

# Xem tag refs
git show-ref --tags

# Xem remote refs
git show-ref | grep origin

# Ref files:
# .git/HEAD
# .git/refs/heads/main
# .git/refs/tags/v1.0.0
# .git/refs/remotes/origin/main

# Xem ref file
cat .git/HEAD

# Output:
# ref: refs/heads/main

# Xem branch ref
cat .git/refs/heads/main

# Output:
# abc1234...

# Xem tag ref
cat .git/refs/tags/v1.0.0

# Output:
# def5678...

# Reflog:
git reflog

# Output:
# abc1234 HEAD@{0}: commit: Add feature
# def5678 HEAD@{1}: checkout: moving from main to feature
```

### Best Practices

- Hiểu ref types
- Dùng refs để navigate
- Hiểu reflog

### Anti-patterns

- Bỏ qua refs
- Manipulate refs trực tiếp
- Không hiểu reflog

---

## Câu hỏi 4: Git index là gì?

### Mục đích / Purpose

Hiểu về staging area và cách Git track changes.

### Khi nào dùng / When to Use

Khi cần hiểu Git staging area.

### Giá trị gì / Benefits

- Hiểu staging area
- Debug staging issues
- Tối ưu workflow

### Định nghĩa / Definition

Git index (staging area) là binary file track changes sẽ được committed.

### Ví dụ / Examples

```bash
# Index file:
# .git/index

# Xem index
git ls-files -s

# Output:
# abc1234... 100644 file1.txt
# def5678... 100644 file2.txt

# Format:
# <object-hash> <mode> <filename>

# Xem index details
git ls-files --stage

# Xem index với stat
git diff --cached --stat

# Xem index với diff
git diff --cached

# Add file vào index
git add file.txt

# Remove file khỏi index
git rm --cached file.txt

# Reset index
git reset

# Reset index cho specific file
git reset HEAD file.txt

# Index example:
# 1. Tạo file
echo "Hello" > file.txt

# 2. Xem index (file chưa trong index)
git ls-files -s

# 3. Add file vào index
git add file.txt

# 4. Xem index (file trong index)
git ls-files -s

# Output:
# abc1234... 100644 file.txt

# 5. Modify file
echo "World" >> file.txt

# 6. Xem diff giữa working directory và index
git diff file.txt

# 7. Xem diff giữa index và HEAD
git diff --cached file.txt
```

### Best Practices

- Hiểu staging area
- Dùng index hiệu quả
- Debug index issues

### Anti-patterns

- Bỏ qua staging area
- Không hiểu index
- Manipulate index trực tiếp

---

## Câu hỏi 5: Git packfiles là gì?

### Mục đích / Purpose

Hiểu về cách Git compress và store objects.

### Khi nào dùng / When to Use

Khi cần hiểu Git storage optimization.

### Giá trị gì / Benefits

- Hiểu Git compression
- Tối ưu repository size
- Debug storage issues

### Định nghĩa / Definition

Git packfiles là compressed storage cho Git objects.

### Ví dụ / Examples

```bash
# Packfile location:
# .git/objects/pack/

# Packfile types:
# .pack: Compressed objects
# .idx: Index file

# Xem packfiles
ls -la .git/objects/pack/

# Output:
# pack-abc1234...idx
# pack-abc1234...pack

# Xem packfile info
git verify-pack -v .git/objects/pack/pack-abc1234...pack

# Garbage collection tạo packfiles
git gc

# Xem packfiles sau gc
ls -la .git/objects/pack/

# Repack
git repack -a -d

# Prune loose objects
git prune

# Xem loose objects
find .git/objects/ -type f | wc -l

# Packfile benefits:
# - Compression giảm size
# - Delta compression cho similar objects
# - Faster operations

# Ví dụ packfile:
# 1. Tạo nhiều commits
for i in {1..100}; do
  echo "Commit $i" >> file.txt
  git add file.txt
  git commit -m "Commit $i"
done

# 2. Xem loose objects
find .git/objects/ -type f | wc -l

# 3. Run gc
git gc

# 4. Xem packfiles
ls -la .git/objects/pack/

# 5. Xem packfile info
git verify-pack -v .git/objects/pack/pack-*.pack
```

### Best Practices

- Run gc thường xuyên
- Hiểu packfile benefits
- Monitor repository size

### Anti-patterns

- Không run gc
- Bỏ qua packfiles
- Manipulate packfiles

---

## Câu hỏi 6: Git reflog là gì?

### Mục đích / Purpose

Hiểu về cách Git track history của HEAD và refs.

### Khi nào dùng / When to Use

Khi cần recover lost commits hoặc undo operations.

### Giá trị gì / Benefits

- Recover lost commits
- Undo operations
- Debug history

### Định nghĩa / Definition

Git reflog là log của HEAD và refs changes.

### Ví dụ / Examples

```bash
# Xem reflog
git reflog

# Output:
# abc1234 HEAD@{0}: commit: Add feature
# def5678 HEAD@{1}: checkout: moving from main to feature
# ghi9012 HEAD@{2}: commit: Fix bug

# Xem reflog cho specific ref
git reflog show HEAD

# Xem reflog cho branch
git reflog show main

# Xem reflog cho all refs
git reflog show --all

# Xem reflog với date
git reflog --date=iso

# Xem reflog với relative time
git reflog --relative-date

# Reset đến reflog entry
git reset --hard HEAD@{2}

# Recover lost commit
# 1. Xem reflog
git reflog

# 2. Tìm commit bị mất
# abc1234 HEAD@{5}: commit: Lost commit

# 3. Reset đến commit đó
git reset --hard HEAD@{5}

# Reflog expiration:
# - Default: 90 days cho reachable commits
# - Default: 30 days cho unreachable commits

# Configure reflog expiration
git config --global gc.reflogExpire 90.days
git config --global gc.reflogExpireUnreachable 30.days
```

### Best Practices

- Dùng reflog để recover
- Hiểu reflog expiration
- Configure reflog khi cần

### Anti-patterns

- Bỏ qua reflog
- Không recover từ reflog
- Không hiểu reflog expiration

---

## Câu hỏi 7: Git plumbing và porcelain là gì?

### Mục đích / Purpose

Hiểu về phân loại Git commands.

### Khi nào dùng / When to Use

Khi cần hiểu Git architecture.

### Giá trị gì / Benefits

- Hiểu Git design
- Sử dụng plumbing commands
- Debug Git issues

### Định nghĩa / Definition

- **Plumbing**: Low-level commands truy cập Git internals
- **Porcelain**: High-level commands cho daily use

### Ví dụ / Examples

```bash
# Porcelain commands (daily use):
# git add, git commit, git status, git log, git diff

# Plumbing commands (low-level):
# git hash-object, git cat-file, git update-index, git write-tree

# Ví dụ porcelain:
git add file.txt
git commit -m "Add file"

# Tương đương với plumbing:
# 1. Hash object
git hash-object -w file.txt

# 2. Update index
git update-index --add file.txt

# 3. Write tree
git write-tree

# 4. Create commit
git commit-tree <tree-hash> -m "Add file"

# 5. Update HEAD
git update-ref HEAD <commit-hash>

# Plumbing examples:
# Xem object
git cat-file -p <hash>

# Xem object type
git cat-file -t <hash>

# Hash object
git hash-object -w file.txt

# Update index
git update-index --add file.txt

# Write tree
git write-tree

# Create commit
git commit-tree <tree-hash> -m "Message"

# Update ref
git update-ref HEAD <commit-hash>

# Khi nào dùng plumbing:
# - Custom Git workflows
# - Debug Git issues
# - Git automation
# - Understanding Git internals
```

### Best Practices

- Dùng porcelain cho daily use
- Dùng plumbing khi cần
- Hiểu sự khác biệt

### Anti-patterns

- Dùng plumbing cho daily use
- Không hiểu porcelain
- Không hiểu plumbing

---

## Câu hỏi 8: Git shallow clone là gì?

### Mục đích / Purpose

Hiểu về cách clone repository với partial history.

### Khi nào dùng / When to Use

Khi cần clone large repositories nhanh hơn.

### Giá trị gì / Benefits

- Faster clone
- Smaller disk usage
- Faster operations

### Định nghĩa / Definition

Shallow clone clone repository với limited history depth.

### Ví dụ / Examples

```bash
# Shallow clone với depth 1
git clone --depth 1 https://github.com/user/repo.git

# Shallow clone với depth 5
git clone --depth 5 https://github.com/user/repo.git

# Shallow clone với single branch
git clone --depth 1 --single-branch https://github.com/user/repo.git

# Shallow clone với specific branch
git clone --depth 1 --branch develop https://github.com/user/repo.git

# Convert shallow clone thành full clone
git fetch --unshallow

# Hoặc:
git fetch --depth=1000

# Xem clone depth
git log --oneline | wc -l

# Shallow clone benefits:
# - Faster clone (chỉ fetch recent commits)
# - Smaller disk usage
# - Faster operations

# Shallow clone limitations:
# - Không thể access full history
# - Không thể checkout old commits
# - Một số operations không hoạt động

# Ví dụ shallow clone:
# 1. Shallow clone
git clone --depth 1 https://github.com/user/repo.git
cd repo

# 2. Xem history (chỉ 1 commit)
git log --oneline

# 3. Fetch more history
git fetch --depth=10

# 4. Xem history (10 commits)
git log --oneline

# 5. Unshallow (fetch all history)
git fetch --unshallow
```

### Best Practices

- Dùng shallow clone cho large repos
- Unshallow khi cần full history
- Hiểu limitations

### Anti-patterns

- Shallow clone khi cần full history
- Không unshallow khi cần
- Không hiểu limitations

---

## Câu hỏi 9: Git sparse checkout là gì?

### Mục đích / Purpose

Hiểu cách checkout partial directory tree.

### Khi nào dùng / When to Use

Khi cần làm việc với subset của repository.

### Giá trị gì / Benefits

- Smaller working directory
- Faster operations
- Save disk space

### Định nghĩa / Definition

Sparse checkout checkout chỉ specified directories.

### Ví dụ / Examples

```bash
# Enable sparse checkout
git config core.sparseCheckout true

# Configure sparse checkout
echo "src/" >> .git/info/sparse-checkout
echo "docs/" >> .git/info/sparse-checkout

# Checkout
git checkout main

# Xem sparse checkout config
cat .git/info/sparse-checkout

# Add directory
echo "tests/" >> .git/info/sparse-checkout

# Remove directory
echo "!tests/" >> .git/info/sparse-checkout

# Sparse checkout với cone mode
git config core.sparseCheckoutCone true
git sparse-checkout init --cone
git sparse-checkout set src docs

# Xem sparse checkout status
git sparse-checkout list

# Disable sparse checkout
git sparse-checkout disable

# Sparse checkout benefits:
# - Smaller working directory
# - Faster operations
# - Save disk space

# Sparse checkout limitations:
# - Không thể access files không được checkout
# - Một số operations không hoạt động

# Ví dụ sparse checkout:
# 1. Clone repository
git clone https://github.com/user/repo.git
cd repo

# 2. Enable sparse checkout
git config core.sparseCheckout true

# 3. Configure directories
echo "src/" >> .git/info/sparse-checkout
echo "docs/" >> .git/info/sparse-checkout

# 4. Remove all files
rm -rf *

# 5. Checkout
git checkout main

# 6. Chỉ src/ và docs/ được checkout
ls
```

### Best Practices

- Dùng sparse checkout cho large repos
- Configure directories carefully
- Hiểu limitations

### Anti-patterns

- Sparse checkout khi cần full repo
- Không configure directories
- Không hiểu limitations

---

## Câu hỏi 10: Git garbage collection là gì?

### Mục đích / Purpose

Hiểu về cách Git cleanup unused objects.

### Khi nào dùng / When to Use

Khi cần cleanup repository.

### Giá trị gì / Benefits

- Free disk space
- Optimize repository
- Remove garbage

### Định nghĩa / Definition

Git garbage collection (gc) cleanup unused objects và optimize repository.

### Ví dụ / Examples

```bash
# Run garbage collection
git gc

# Run gc với aggressive
git gc --aggressive

# Run gc với prune
git gc --prune=now

# Run gc với auto
git gc --auto

# Prune loose objects
git prune

# Prune với expire date
git prune --expire=2.weeks.ago

# Verify repository
git fsck

# Verify với full
git fsck --full

# Verify với verbose
git fsck --verbose

# GC benefits:
# - Free disk space
# - Compress objects
# - Optimize repository

# GC considerations:
# - Có thể mất thời gian
# - Có thể lock repository
# - Có thể mất unreachable objects

# Ví dụ gc:
# 1. Xem repository size
du -sh .git

# 2. Run gc
git gc

# 3. Xem repository size sau gc
du -sh .git

# 4. Verify repository
git fsck --full

# 5. Prune loose objects
git prune --expire=now

# 6. Run aggressive gc
git gc --aggressive
```

### Best Practices

- Run gc thường xuyên
- Verify sau gc
- Hiểu gc considerations

### Anti-patterns

- Không run gc
- Run gc trong production
- Không verify sau gc

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. Git object model: blobs, trees, commits, tags
2. Git hash: SHA-1 unique identifiers
3. Git refs: pointers đến commits
4. Git index: staging area
5. Git packfiles: compressed storage
6. Git reflog: history của HEAD
7. Plumbing vs Porcelain: low-level vs high-level commands
8. Shallow clone: partial history
9. Sparse checkout: partial directory tree
10. Garbage collection: cleanup unused objects

### Commands Reference / Tham khảo lệnh

```bash
# Git objects
git cat-file -p <hash>
git cat-file -t <hash>
git cat-file -s <hash>
git hash-object -w file.txt

# Git refs
git symbolic-ref HEAD
git rev-parse HEAD
git show-ref
git reflog

# Git index
git ls-files -s
git diff --cached
git reset HEAD file.txt

# Git packfiles
git verify-pack -v .git/objects/pack/*.pack
git gc
git repack -a -d
git prune

# Git plumbing
git hash-object -w file.txt
git update-index --add file.txt
git write-tree
git commit-tree <tree-hash> -m "Message"
git update-ref HEAD <commit-hash>

# Shallow clone
git clone --depth 1 URL
git fetch --unshallow

# Sparse checkout
git config core.sparseCheckout true
git sparse-checkout init --cone
git sparse-checkout set src docs

# Garbage collection
git gc
git gc --aggressive
git prune
git fsck --full
```

### Best Practices / Thực hành tốt

1. Hiểu Git object model
2. Dùng reflog để recover
3. Dùng porcelain cho daily use
4. Shallow clone cho large repos
5. Sparse checkout cho partial work
6. Run gc thường xuyên
7. Verify repository sau gc
8. Hiểu Git internals
9. Debug với plumbing commands
10. Monitor repository size
