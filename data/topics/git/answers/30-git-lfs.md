# Git LFS / Git LFS

> Hướng dẫn chi tiết về cách sử dụng Git LFS để quản lý large files / Comprehensive guide to using Git LFS to manage large files

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng Git LFS (Large File Storage) để quản lý large files trong Git repository.

Understand how to use Git LFS (Large File Storage) to manage large files in Git repository.

### Khi nào cần hiểu / When to understand

- Khi project có large files (assets, binaries, datasets)
- Khi repository size quá lớn do large files
- Khi cần version control cho media files
- Khi Git performance bị ảnh hưởng bởi large files

- When project has large files (assets, binaries, datasets)
- When repository size is too large due to large files
- When needing version control for media files
- When Git performance is affected by large files

### Giá trị gì / Benefits

- Quản lý large files hiệu quả
- Giảm repository size
- Tăng Git performance
- Giữ version control cho mọi file types
- Clone và pull nhanh hơn

- Efficiently manage large files
- Reduce repository size
- Improve Git performance
- Keep version control for all file types
- Faster clone and pull

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Giữ large files trong Git mà không làm chậm
- Repository size nhỏ hơn
- Clone và pull nhanh hơn
- Transparent cho user
- Hỗ trợ nhiều Git hosts

**Nhược điểm / Cons:**

- Cần cài Git LFS riêng
- Cần LFS server support
- Khác biệt workflow so với Git thường
- Có thể tốn chi phí storage

**Pros:**

- Keep large files in Git without slowing down
- Smaller repository size
- Faster clone and pull
- Transparent to user
- Supports many Git hosts

**Cons:**

- Need to install Git LFS separately
- Need LFS server support
- Different workflow than regular Git
- May have storage costs

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Git LFS là gì? Tại sao cần? / What is Git LFS? Why is it needed?

#### Mục đích / Purpose

Hiểu khái niệm và lý do cần Git LFS.

Understand concept and reason for needing Git LFS.

#### Khi nào dùng / When to use

Khi project có large files ảnh hưởng đến Git performance.

When project has large files affecting Git performance.

#### Giá trị gì / Benefits

- Hiểu vấn đề với large files trong Git
- Biết giải pháp Git LFS
- Quyết định khi nào cần dùng

- Understand problem with large files in Git
- Know Git LFS solution
- Decide when to use it

#### Định nghĩa / Definition

Git LFS (Large File Storage) là extension cho Git thay thế large files bằng pointers:

```
Repository với Git LFS:
├── .gitattributes      # Cấu hình file patterns
├── .git/
│   └── lfs/           # LFS metadata
├── assets/
│   ├── image.png       # Large file (LFS pointer)
│   └── video.mp4       # Large file (LFS pointer)
└── src/
    └── app.js          # Regular file (Git)
```

Git LFS lưu large files trên LFS server thay vì trong Git repository.

Git LFS (Large File Storage) is extension for Git that replaces large files with pointers:

```
Repository with Git LFS:
├── .gitattributes      # Configuration for file patterns
├── .git/
│   └── lfs/           # LFS metadata
├── assets/
│   ├── image.png       # Large file (LFS pointer)
│   └── video.mp4       # Large file (LFS pointer)
└── src/
    └── app.js          # Regular file (Git)
```

Git LFS stores large files on LFS server instead of in Git repository.

#### Ví dụ / Examples

**Vấn đề với large files trong Git:**

```bash
# Repository có large files
$ du -sh .git/
500M    .git/

# Git performance bị ảnh hưởng
$ git status
# Takes long time...

# Clone rất chậm
$ git clone https://github.com/user/project.git
# Takes forever...
```

**Giải pháp với Git LFS:**

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.png"
git lfs track "*.mp4"
git lfs track "*.zip"

# Commit như bình thường
git add .
git commit -m "Add large files with LFS"

# Large files được thay bằng pointers
$ cat assets/image.png
version https://github.com/user/project.git/info/lfs/objects/sha256/...
size 5242880
```

**Repository size sau khi dùng LFS:**

```bash
# Repository size nhỏ hơn nhiều
$ du -sh .git/
50M     .git/

# Clone nhanh hơn
$ git clone https://github.com/user/project.git
# Much faster!
```

#### Best Practices

1. **Dùng Git LFS** cho files > 100MB
2. **Track appropriate patterns** (.png, .mp4, .zip, etc.)
3. **Không track small files** với LFS
4. **Document trong .gitattributes**

5. **Use Git LFS** for files > 100MB
6. **Track appropriate patterns** (.png, .mp4, .zip, etc.)
7. **Don't track small files** with LFS
8. **Document in .gitattributes**

#### Anti-patterns

- ❌ Dùng LFS cho mọi files
- ❌ Track small files với LFS
- ❌ Không document .gitattributes
- ❌ Không hiểu pointer mechanism

- ❌ Use LFS for all files
- ❌ Track small files with LFS
- ❌ Don't document .gitattributes
- ❌ Don't understand pointer mechanism

---

### Q2: Cách install Git LFS? / How to install Git LFS?

#### Mục đích / Purpose

Biết cách cài đặt Git LFS trên các hệ điều hành khác nhau.

Know how to install Git LFS on different operating systems.

#### Khi nào dùng / When to use

Khi cần bắt đầu dùng Git LFS cho project.

When needing to start using Git LFS for project.

#### Giá trị gì / Benefits

- Có thể cài Git LFS trên mọi platform
- Tích hợp tốt với Git
- Dễ dàng cài đặt

- Can install Git LFS on all platforms
- Integrates well with Git
- Easy to install

#### Định nghĩa / Definition

Git LFS có thể cài bằng package manager hoặc download trực tiếp:

```bash
# macOS (Homebrew)
brew install git-lfs

# Linux (apt)
apt install git-lfs

# Windows (Chocolatey)
choco install git-lfs

# Hoặc download trực tiếp
# https://github.com/git-lfs/git-lfs/releases
```

Git LFS can be installed via package manager or direct download:

```bash
# macOS (Homebrew)
brew install git-lfs

# Linux (apt)
apt install git-lfs

# Windows (Chocolatey)
choco install git-lfs

# Or direct download
# https://github.com/git-lfs/git-lfs/releases
```

#### Ví dụ / Examples

**Cài đặt trên macOS:**

```bash
# Cài với Homebrew
brew install git-lfs

# Verify cài đặt
git lfs version
git-lfs/2.13.3 (GitHub; https://github.com/git-lfs/git-lfs)

# Enable cho repository
git lfs install
```

**Cài đặt trên Linux:**

```bash
# Cài với apt
sudo apt update
sudo apt install git-lfs

# Cài với yum
sudo yum install git-lfs

# Cài với dnf
sudo dnf install git-lfs

# Verify cài đặt
git lfs version
git-lfs/2.13.3 (GitHub; https://github.com/git-lfs/git-lfs)

# Enable cho repository
git lfs install
```

**Cài đặt trên Windows:**

```bash
# Cài với Chocolatey
choco install git-lfs

# Cài với Scoop
scoop install git-lfs

# Hoặc download installer
# https://github.com/git-lfs/git-lfs/releases

# Verify cài đặt
git lfs version
git-lfs/2.13.3 (GitHub; https://github.com/git-lfs/git-lfs)

# Enable cho repository
git lfs install
```

**Cài đặt global:**

```bash
# Cài Git LFS global
git lfs install --global

# Verify
git lfs env
```

#### Best Practices

1. **Cài Git LFS** trước khi track files
2. **Verify cài đặt** với `git lfs version`
3. **Cài global** nếu dùng nhiều projects
4. **Update thường xuyên** để có version mới nhất

5. **Install Git LFS** before tracking files
6. **Verify installation** with `git lfs version`
7. **Install globally** if using multiple projects
8. **Update frequently** to have latest version

#### Anti-patterns

- ❌ Track files trước khi cài LFS
- ❌ Không verify cài đặt
- ❌ Dùng version cũ
- ❌ Không cài global khi cần

- ❌ Track files before installing LFS
- ❌ Don't verify installation
- ❌ Use old version
- ❌ Don't install globally when needed

---

### Q3: `git lfs track "*.extension"` làm gì? / What does `git lfs track "*.extension"` do?

#### Mục đích / Purpose

Biết cách track large files với Git LFS.

Know how to track large files with Git LFS.

#### Khi nào dùng / When to use

Khi muốn track một file type với Git LFS.

When wanting to track a file type with Git LFS.

#### Giá trị gì / Benefits

- Tự động thay thế large files bằng pointers
- Giảm repository size
- Clone và pull nhanh hơn

- Automatically replace large files with pointers
- Reduce repository size
- Faster clone and pull

#### Định nghĩa / Definition

`git lfs track "*.extension"` track files với pattern cụ thể:

```bash
git lfs track "*.extension"
```

Lệnh này:

- Thêm pattern vào .gitattributes
- Files khớp pattern sẽ được lưu trong LFS

`git lfs track "*.extension"` tracks files with specific pattern:

```bash
git lfs track "*.extension"
```

This command:

- Adds pattern to .gitattributes
- Files matching pattern will be stored in LFS

#### Ví dụ / Examples

**Track file types:**

```bash
# Track images
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.gif"

# Track videos
git lfs track "*.mp4"
git lfs track "*.mov"
git lfs track "*.avi"

# Track archives
git lfs track "*.zip"
git lfs track "*.tar"
git lfs track "*.gz"

# Track datasets
git lfs track "*.csv"
git lfs track "*.json"
git lfs track "*.parquet"
```

**Track tất cả files trong directory:**

```bash
# Track tất cả trong assets/
git lfs track "assets/*"

# Track files > 100MB
git lfs track "*.*" --glob="*.large"
```

**Kết quả trong .gitattributes:**

```ini
# .gitattributes
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```

**Commit sau khi track:**

```bash
# Track files
git lfs track "*.png"

# Add và commit
git add .
git commit -m "Track PNG files with LFS"
```

#### Best Practices

1. **Track appropriate patterns** cho large files
2. **Không track small files** với LFS
3. **Test track** trước khi commit
4. **Review .gitattributes** sau khi track

5. **Track appropriate patterns** for large files
6. **Don't track small files** with LFS
7. **Test track** before committing
8. **Review .gitattributes** after tracking

#### Anti-patterns

- ❌ Track small files với LFS
- ❌ Track quá nhiều patterns
- ❌ Không test trước khi commit
- ❌ Không review .gitattributes

- ❌ Track small files with LFS
- ❌ Track too many patterns
- ❌ Don't test before committing
- ❌ Don't review .gitattributes

---

### Q4: `git lfs track` hiển thị gì? / What does `git lfs track` display?

#### Mục đích / Purpose

Biết cách xem các patterns đang được track.

Know how to view patterns currently being tracked.

#### Khi nào dùng / When to use

Khi cần kiểm tra hoặc review các tracked patterns.

When needing to check or review tracked patterns.

#### Giá trị gì / Benefits

- Xem tất cả tracked patterns
- Debug tracking issues
- Review và adjust khi cần

- View all tracked patterns
- Debug tracking issues
- Review and adjust when needed

#### Định nghĩa / Definition

`git lfs track` hiển thị các patterns đang được track:

```bash
git lfs track
```

Lệnh này hiển thị nội dung của .gitattributes.

`git lfs track` displays patterns currently being tracked:

```bash
git lfs track
```

This command displays contents of .gitattributes.

#### Ví dụ / Examples

**Xem tracked patterns:**

```bash
$ git lfs track
Listing tracked patterns
    *.png filter=lfs diff=lfs merge=lfs -text
    *.jpg filter=lfs diff=lfs merge=lfs -text
    *.mp4 filter=lfs diff=lfs merge=lfs -text
    *.zip filter=lfs diff=lfs merge=lfs -text
```

**Xem tracked paths:**

```bash
$ git lfs ls-files
assets/image.png
assets/video.mp4
data/dataset.csv
```

**Xem .gitattributes:**

```bash
$ cat .gitattributes
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```

#### Best Practices

1. **Review tracked patterns** thường xuyên
2. **Untrack patterns không cần thiết**
3. **Giữ .gitattributes sạch sẽ**
4. **Document patterns** trong README

5. **Review tracked patterns** regularly
6. **Untrack unnecessary patterns**
7. **Keep .gitattributes clean**
8. **Document patterns** in README

#### Anti-patterns

- ❌ Không review tracked patterns
- ❌ Quên untrack patterns không cần
- ❌ .gitattributes quá phức tạp
- ❌ Không document patterns

- ❌ Don't review tracked patterns
- ❌ Forget to untrack unnecessary patterns
- ❌ .gitattributes too complex
- ❌ Don't document patterns

---

### Q5: `git lfs ls-files` làm gì? / What does `git lfs ls-files` do?

#### Mục đích / Purpose

Biết cách xem các files đang được quản lý bởi Git LFS.

Know how to view files currently managed by Git LFS.

#### Khi nào dùng / When to use

Khi cần xem hoặc debug LFS files.

When needing to view or debug LFS files.

#### Giá trị gì / Benefits

- Xem tất cả LFS files
- Debug LFS issues
- Kiểm tra tracking status

- View all LFS files
- Debug LFS issues
- Check tracking status

#### Định nghĩa / Definition

`git lfs ls-files` hiển thị các files đang được track bởi Git LFS:

```bash
git lfs ls-files
```

Lệnh này hiển thị files có trong LFS storage.

`git lfs ls-files` displays files currently tracked by Git LFS:

```bash
git lfs ls-files
```

This command displays files in LFS storage.

#### Ví dụ / Examples

**Xem LFS files:**

```bash
$ git lfs ls-files
assets/image.png
assets/video.mp4
data/dataset.csv
models/model.pkl
```

**Xem LFS files với size:**

```bash
$ git lfs ls-files -l
assets/image.png (5.2 MB)
assets/video.mp4 (125.8 MB)
data/dataset.csv (45.1 MB)
models/model.pkl (150.3 MB)
```

**Xem LFS files với size và OID:**

```bash
$ git lfs ls-files -l --oid
assets/image.png (5.2 MB) - oid sha256:abc123...
assets/video.mp4 (125.8 MB) - oid sha256:def456...
data/dataset.csv (45.1 MB) - oid sha256:ghi789...
```

**Xem LFS files trong directory:**

```bash
$ git lfs ls-files assets/
assets/image.png
assets/video.mp4
assets/audio.mp3
```

#### Best Practices

1. **Dùng ls-files** để debug LFS
2. **Kiểm tra size** của LFS files
3. **Review thường xuyên** để tránh issues
4. **Kết hợp với git status** để có bức tranh đầy đủ

5. **Use ls-files** to debug LFS
6. **Check size** of LFS files
7. **Review regularly** to avoid issues
8. **Combine with git status** for full picture

#### Anti-patterns

- ❌ Không dùng ls-files để debug
- ❌ Không kiểm tra size
- ❌ Không review LFS files
- ❌ Không kết hợp với git status

- ❌ Don't use ls-files to debug
- ❌ Don't check size
- ❌ Don't review LFS files
- ❌ Don't combine with git status

---

### Q6: `git lfs pull` và `git lfs push` làm gì? / What do `git lfs pull` and `git lfs push` do?

#### Mục đích / Purpose

Biết cách pull và push LFS files.

Know how to pull and push LFS files.

#### Khi nào dùng / When to use

Khi cần sync LFS files với remote.

When needing to sync LFS files with remote.

#### Giá trị gì / Benefits

- Sync LFS files với remote
- Pull và push large files hiệu quả
- Tự động hóa LFS workflow

- Sync LFS files with remote
- Efficiently pull and push large files
- Automate LFS workflow

#### Định nghĩa / Definition

`git lfs pull` và `git lfs push` sync LFS files:

```bash
git lfs pull
git lfs push
```

Các lệnh này tự động download/upload LFS files.

`git lfs pull` and `git lfs push` sync LFS files:

```bash
git lfs pull
git lfs push
```

These commands automatically download/upload LFS files.

#### Ví dụ / Examples

**Pull LFS files:**

```bash
# Pull LFS files
git lfs pull

# Pull với include
git lfs pull --include="*.png,*.jpg"

# Pull với exclude
git lfs pull --exclude="*.zip"
```

**Push LFS files:**

```bash
# Push LFS files
git lfs push

# Push với all
git lfs push --all

# Push với dry run
git lfs push --dry-run
```

**Workflow hoàn chỉnh:**

```bash
# Clone repository
git clone https://github.com/user/project.git
cd project

# Pull LFS files
git lfs pull

# Thay đổi LFS file
vim assets/image.png

# Add và commit
git add assets/image.png
git commit -m "Update image"

# Push (bao gồm LFS files)
git push
# Git LFS tự động push LFS files
```

**Sync LFS files:**

```bash
# Sync LFS files (pull và push)
git lfs fetch
git lfs prune
```

#### Best Practices

1. **Luôn lfs pull** sau khi clone
2. **Git push** sẽ tự động push LFS files
3. **Dùng --all** khi cần push tất cả
4. **Kiểm tra status** trước khi push

5. **Always lfs pull** after cloning
6. **Git push** will automatically push LFS files
7. **Use --all** when needing to push all
8. **Check status** before pushing

#### Anti-patterns

- ❌ Quên lfs pull sau khi clone
- ❌ Push LFS files thủ công
- ❌ Không kiểm tra status trước khi push
- ❌ Dùng git push thay vì git lfs push

- ❌ Forget to lfs pull after cloning
- ❌ Manually push LFS files
- ❌ Don't check status before pushing
- ❌ Use git push instead of git lfs push

---

### Q7: LFS server requirements là gì? / What are LFS server requirements?

#### Mục đích / Purpose

Hiểu yêu cầu server để chạy Git LFS.

Understand server requirements to run Git LFS.

#### Khi nào dùng / When to use

Khi cần setup Git LFS server hoặc khi dùng Git hosting với LFS.

When needing to set up Git LFS server or when using Git hosting with LFS.

#### Giá trị gì / Benefits

- Biết yêu cầu server
- Setup LFS server đúng cách
- Chọn Git hosting phù hợp

- Know server requirements
- Set up LFS server correctly
- Choose appropriate Git hosting

#### Định nghĩa / Definition

LFS server requirements:

1. **Git server version**: Git >= 2.1.0
2. **LFS support**: Server phải hỗ trợ LFS API
3. **Storage**: Sufficient storage cho LFS files
4. **Bandwidth**: Tốt cho large files
5. **Authentication**: OAuth hoặc token-based

LFS server requirements:

1. **Git server version**: Git >= 2.1.0
2. **LFS support**: Server must support LFS API
3. **Storage**: Sufficient storage for LFS files
4. **Bandwidth**: Good for large files
5. **Authentication**: OAuth or token-based

#### Ví dụ / Examples

**GitHub LFS:**

```bash
# GitHub có LFS built-in
# Không cần setup riêng

# Cài Git LFS
brew install git-lfs

# Enable cho repository
git lfs install

# Push LFS files
git push origin main
# GitHub tự động xử lý LFS files
```

**GitLab LFS:**

```bash
# GitLab hỗ trợ LFS
# Cấu hình trong GitLab project settings

# Cài Git LFS
apt install git-lfs

# Enable cho repository
git lfs install
```

**Self-hosted LFS server:**

```bash
# Cài Git LFS server
# https://github.com/git-lfs/git-lfs/wiki/Installation

# Cấu hình .lfsconfig
[lfs]
    url = https://lfs.example.com
    access = basic
```

**Storage requirements:**

```bash
# Tính toán storage
# 100 files x 50MB average = 5GB

# Bandwidth
# 5GB initial download + 100MB per push
```

#### Best Practices

1. **Dùng Git hosting** có built-in LFS support
2. **Kiểm tra server version** trước khi dùng
3. **Plan storage** cho LFS files
4. **Monitor bandwidth usage**

5. **Use Git hosting** with built-in LFS support
6. **Check server version** before using
7. **Plan storage** for LFS files
8. **Monitor bandwidth usage**

#### Anti-patterns

- ❌ Dùng LFS với server không hỗ trợ
- ❌ Không plan storage
- ❌ Không monitor bandwidth
- ❌ Dùng Git version quá cũ

- ❌ Use LFS with unsupported server
- ❌ Don't plan storage
- ❌ Don't monitor bandwidth
- ❌ Use too old Git version

---

### Q8: Khi nào nên dùng Git LFS? / When should you use Git LFS?

#### Mục đích / Purpose

Biết các tình huống nên dùng Git LFS.

Know situations where you should use Git LFS.

#### Khi nào dùng / When to use

Khi quyết định có nên dùng Git LFS cho project.

When deciding whether to use Git LFS for project.

#### Giá trị gì / Benefits

- Quyết định đúng khi nào dùng LFS
- Tránh over-engineering
- Chọn giải pháp phù hợp

- Decide correctly when to use LFS
- Avoid over-engineering
- Choose appropriate solution

#### Định nghĩa / Definition

Các tình huống nên dùng Git LFS:

1. **Large media files**: Images, videos, audio > 10MB
2. **Binary datasets**: ML models, datasets > 50MB
3. **Archives**: ZIP, TAR, etc. > 20MB
4. **Repository size**: > 500MB
5. **Slow clone/pull**: Do large files

Situations where you should use Git LFS:

1. **Large media files**: Images, videos, audio > 10MB
2. **Binary datasets**: ML models, datasets > 50MB
3. **Archives**: ZIP, TAR, etc. > 20MB
4. **Repository size**: > 500MB
5. **Slow clone/pull**: Due to large files

#### Ví dụ / Examples

**Nên dùng LFS:**

```bash
# Project có nhiều images
project/
├── assets/
│   ├── hero-image.png    (15MB)
│   ├── background.jpg      (8MB)
│   └── icons/             (50 files, ~2MB each)
└── src/
    └── app.js

# Repository size: 2GB
# Clone time: 10+ minutes

# Nên dùng LFS
git lfs track "assets/*"
```

**Không nên dùng LFS:**

```bash
# Project chỉ có code
project/
├── src/
│   ├── app.js
│   ├── utils.js
│   └── config.js
└── tests/

# Repository size: 50MB
# Clone time: 30 seconds

# Không cần LFS
```

**Borderline cases:**

```bash
# Một vài large files
project/
├── assets/
│   └── logo.png          (5MB)
└── src/
    └── app.js

# Repository size: 200MB
# Có thể dùng LFS, nhưng không bắt buộc
```

#### Best Practices

1. **Dùng LFS** cho files > 10MB
2. **Không dùng LFS** cho code files
3. **Monitor repository size** thường xuyên
4. **Test clone time** trước khi quyết định

5. **Use LFS** for files > 10MB
6. **Don't use LFS** for code files
7. **Monitor repository size** regularly
8. **Test clone time** before deciding

#### Anti-patterns

- ❌ Dùng LFS cho mọi files
- ❌ Không dùng LFS khi cần
- ❌ Không monitor repository size
- ❌ Over-engineering với LFS

- ❌ Use LFS for all files
- ❌ Don't use LFS when needed
- ❌ Don't monitor repository size
- ❌ Over-engineering with LFS

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **Git LFS** quản lý large files bằng cách lưu chúng trên LFS server
2. **Cài Git LFS** với package manager hoặc download trực tiếp
3. **`git lfs track`** track files với pattern cụ thể
4. **`git lfs ls-files`** xem các files đang được quản lý bởi LFS
5. **`git lfs pull/push`** sync LFS files với remote
6. **LFS server** cần Git >= 2.1.0 và hỗ trợ LFS API
7. **Nên dùng LFS** cho files > 10MB, datasets, archives

8. **Git LFS** manages large files by storing them on LFS server
9. **Install Git LFS** via package manager or direct download
10. **`git lfs track`** tracks files with specific pattern
11. **`git lfs ls-files`** views files currently managed by LFS
12. **`git lfs pull/push`** syncs LFS files with remote
13. **LFS server** requires Git >= 2.1.0 and LFS API support
14. **Should use LFS** for files > 10MB, datasets, archives

### Commands Reference / Tham khảo lệnh

```bash
# Cài Git LFS
brew install git-lfs
apt install git-lfs
choco install git-lfs

# Enable cho repository
git lfs install

# Track files
git lfs track "*.extension"
git lfs track "path/*"

# Xem tracked patterns
git lfs track

# Xem LFS files
git lfs ls-files
git lfs ls-files -l
git lfs ls-files -l --oid

# Sync LFS files
git lfs pull
git lfs push
git lfs push --all
git lfs push --dry-run

# Untrack files
git lfs untrack "*.extension"
```

### Best Practices / Thực hành tốt nhất

1. **Dùng Git LFS** cho files > 10MB
2. **Track appropriate patterns** (.png, .mp4, .zip, datasets)
3. **Luôn lfs pull** sau khi clone
4. **Review .gitattributes** thường xuyên
5. **Monitor repository size** và performance
6. **Dùng Git hosting** có built-in LFS support
7. **Document LFS usage** trong README

8. **Use Git LFS** for files > 10MB
9. **Track appropriate patterns** (.png, .mp4, .zip, datasets)
10. **Always lfs pull** after cloning
11. **Review .gitattributes** regularly
12. **Monitor repository size** and performance
13. **Use Git hosting** with built-in LFS support
14. **Document LFS usage** in README
