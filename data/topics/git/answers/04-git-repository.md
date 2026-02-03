# 4. Git Repository / Git Repository

## Tổng quan về Git Repository / Git Repository Overview

### Mục đích / Purpose

**Git Repository** covers how Git stores and manages your project data. Understanding this helps you:

- Initialize new repositories
- Clone existing repositories
- Understand Git's internal structure
- Work with bare vs non-bare repositories

**Mục đích chính:**

- Create new Git repositories
- Clone existing repositories
- Understand .git directory structure
- Distinguish bare vs non-bare repositories

### Khi nào cần hiểu về Git Repository / When to Use

Hiểu về Git repository là cần thiết khi:

- Starting a new project
- Joining an existing project
- Troubleshooting Git issues
- Understanding Git internals

### Giúp ích gì / Benefits

**Lợi ích:**

- **Foundation**: Cơ sở cho version control
- **Collaboration**: Bắt đầu collaboration
- **Understanding**: Hiểu Git internals
- **Troubleshooting**: Debug repository issues

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                     | Nhược điểm (Cons)                      |
| ---------------------------------- | -------------------------------------- |
| Distributed - mỗi dev có full copy | Initial clone time - clone lần đầu lâu |
| Fast - local operations nhanh      | Storage space - tốn storage space      |
| Branching - branching nhanh và dễ  | Learning curve - cần học Git internals |

---

## `git init` là gì? Khi nào nên dùng? / What is `git init`? When to use it?

### Mục đích / Purpose

Hiểu `git init` giúp bạn:

- Create new Git repositories
- Start version control cho project
- Understand initialization process

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi starting new project
- Khi initializing Git

### Giúp ích gì / Benefits

- **Initialization**: Easy way to start Git
- **Flexibility**: Initialize anywhere
- **Control**: Full control over initialization

### Định nghĩa / Definition

**`git init`** là lệnh để initialize một new Git repository trong current directory.

**Đặc điểm:**

- Creates .git directory
- Creates initial commit (empty)
- Sets up default branch (main/master)
- Creates .gitignore nếu chưa có

### Cú pháp / Syntax

```bash
# Initialize new repository
git init

# Initialize with specific branch name
git init --initial-branch=main

# Initialize bare repository
git init --bare

# Initialize with template directory
git init --template=/path/to/template
```

### Ví dụ thực tế / Practical Example

```bash
# Create new project directory
mkdir my-project
cd my-project

# Initialize Git repository
git init

# Output:
# Initialized empty Git repository in /path/to/my-project/.git/

# Check .git directory
ls -la .git

# Output:
# HEAD
# config
# description
# hooks/
# info/
# objects/
# refs/

# Create initial commit
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

# Check status
git status

# Output:
# On branch main
# nothing to commit, working tree clean
```

### Common Pitfalls / Lỗi thường gặp

- **Initializing in wrong directory**: Init sai directory
- **Not committing after init**: Không commit sau khi init
- **Initializing nested repositories**: Init nested repos

### Best Practices / Thực hành tốt nhất

- Initialize at project root
- Create initial commit immediately
- Add .gitignore early
- Choose appropriate branch name

---

## `git clone` là gì? Sự khác biệt giữa các clone options? / What is `git clone`? What are the differences between clone options?

### Mục đích / Purpose

Hiểu `git clone` giúp bạn:

- Copy existing repositories
- Work with remote repositories
- Understand clone options

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi joining existing project
- Khi copying repositories

### Gi giúp ích gì / Benefits

- **Access**: Easy access to existing code
- **Collaboration**: Start collaborating
- **Flexibility**: Multiple clone options

### Định nghĩa / Definition

**`git clone`** là lệnh để copy một existing Git repository từ remote location sang local machine.

**Đặc điểm:**

- Copies entire repository history
- Sets up remote tracking
- Creates .git directory
- Checks out default branch

### Cú pháp / Syntax

```bash
# Basic clone
git clone <repository-url>

# Clone vào specific directory
git clone <repository-url> <directory-name>

# Clone specific branch
git clone -b <branch-name> <repository-url>

# Shallow clone (depth 1)
git clone --depth 1 <repository-url>

# Clone without history (single branch)
git clone --single-branch -b <branch-name> <repository-url>

# Clone with specific depth
git clone --depth <n> <repository-url>

# Clone without .git directory
git clone --no-hardlinks <repository-url>
```

### Clone Options / Các Tùy chọn Clone

| Option / Tùy chọn | Mô tả / Description         | Use Case / Trường hợp dùng |
| ----------------- | --------------------------- | -------------------------- |
| `-b <branch>`     | Clone specific branch       | Khi chỉ cần một branch     |
| `--depth <n>`     | Shallow clone với n commits | Khi không cần full history |
| `--single-branch` | Clone chỉ một branch        | Khi chỉ cần một branch     |
| `--no-hardlinks`  | Không use hardlinks         | Khi muốn full copy         |
| `--recursive`     | Clone submodules            | Khi repo có submodules     |
| `--filter`        | Partial clone               | Khi muốn partial clone     |

### Ví dụ thực tế / Practical Example

```bash
# Basic clone
git clone https://github.com/user/repo.git

# Clone vào specific directory
git clone https://github.com/user/repo.git my-project

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Shallow clone (chỉ latest commit)
git clone --depth 1 https://github.com/user/repo.git

# Clone với depth 10
git clone --depth 10 https://github.com/user/repo.git

# Clone single branch
git clone --single-branch -b main https://github.com/user/repo.git

# Clone với submodules
git clone --recursive https://github.com/user/repo.git

# Partial clone (blobless)
git clone --filter=blob:none https://github.com/user/repo.git
```

### Common Pitfalls / Lỗi thường gặp

- **Cloning wrong URL**: Clone sai URL
- **Not using appropriate options**: Không dùng options phù hợp
- **Cloning into existing directory**: Clone vào directory đã tồn tại

### Best Practices / Thực hành tốt nhất

- Use appropriate clone options
- Clone into appropriate directory
- Understand shallow vs full clone
- Use --recursive cho submodules

---

## .git directory structure là gì? / What is .git directory structure?

### Mục đích / Purpose

Hiểu .git directory structure giúp bạn:

- Understand Git internals
- Troubleshoot repository issues
- Know what files can be safely ignored

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git internals
- Khi troubleshooting repository issues
- Khi learning Git internals

### Gi giúp ích gì / Benefits

- **Understanding**: Hiểu Git internals
- **Troubleshooting**: Debug repository issues
- **Safety**: Biết files nào có thể ignore

### .git Directory Structure / Cấu trúc .git Directory

```
.git/
├── HEAD              # Pointer đến current branch
├── config            # Repository configuration
├── description       # Repository description
├── hooks/            # Git hooks (client-side)
├── info/             # Repository information
│   └── exclude      # Local exclude patterns
├── objects/          # Git objects (blobs, trees, commits)
│   ├── info/        # Object info
│   └── pack/        # Packed objects
├── refs/             # References (branches, tags, remotes)
│   ├── heads/        # Local branches
│   ├── remotes/      # Remote branches
│   └── tags/         # Tags
└── logs/             # Reflog history
```

### Chi tiết từng component / Details của từng component

#### HEAD

- **Mô tả**: Pointer đến current branch
- **Content**: `ref: refs/heads/main` hoặc commit hash
- **Purpose**: Track current branch/commit

```bash
# View HEAD content
cat .git/HEAD

# Output:
# ref: refs/heads/main

# hoặc (detached HEAD):
# abc1234def567890...
```

#### config

- **Mô tả**: Repository configuration
- **Content**: Key-value pairs
- **Purpose**: Store repository settings

```bash
# View config file
cat .git/config

# Output:
# [core]
#     repositoryformatversion = 0
#     filemode = true
#     bare = false
# [remote "origin"]
#     url = https://github.com/user/repo.git
#     fetch = +refs/heads/*:refs/remotes/origin/*
```

#### objects/

- **Mô tả**: Git objects (blobs, trees, commits, tags)
- **Structure**: Hash-based storage (first 2 chars = directory)
- **Purpose**: Store all repository data

```bash
# View objects directory
ls .git/objects/

# Output:
# ab/
# cd/
# ef/
# info/
# pack/

# View specific object
cat .git/objects/ab/cdef123...
```

#### refs/

- **Mô tả**: References (branches, tags, remotes)
- **Structure**: Subdirectories cho từng loại ref
- **Purpose**: Track branches, tags, remotes

```bash
# View refs directory
ls .git/refs/

# Output:
# heads/
# remotes/
# tags/

# View local branches
ls .git/refs/heads/

# Output:
# main
# develop
# feature/login
```

#### hooks/

- **Mô tả**: Git hooks (client-side)
- **Structure**: Executable scripts
- **Purpose**: Run scripts tại specific Git events

```bash
# View hooks directory
ls .git/hooks/

# Output:
# applypatch-msg.sample
# commit-msg.sample
# post-commit.sample
# post-receive.sample
# pre-commit.sample
# pre-push.sample
# pre-rebase.sample
# update.sample
```

### Ví dụ thực tế / Practical Example

```bash
# Explore .git directory
cd my-project/.git

# View HEAD
cat HEAD
# Output: ref: refs/heads/main

# View config
cat config
# Output: [core]...

# View objects
ls objects/
# Output: ab/, cd/, ef/...

# View refs
ls refs/
# Output: heads/, remotes/, tags/

# View local branches
ls refs/heads/
# Output: main, develop

# View current commit hash
cat refs/heads/main
# Output: abc1234def567890...
```

### Common Pitfalls / Lỗi thường gặp

- **Modifying .git manually**: Modify .git directory thủ công
- **Not understanding structure**: Không hiểu structure
- **Deleting important files**: Xóa files quan trọng

### Best Practices / Thực hành tốt nhất

- Never modify .git manually
- Understand .git structure
- Use Git commands thay vì manual operations
- Backup .git directory khi cần

---

## File `HEAD` trong Git là gì? / What is the `HEAD` file in Git?

### Mục đích / Purpose

Hiểu HEAD file giúp bạn:

- Know current branch/commit
- Understand Git's pointer system
- Troubleshoot HEAD issues

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git internals
- Khi troubleshooting HEAD issues
- Khi learning Git internals

### Gi giúp ích gì / Benefits

- **Understanding**: Hiểu Git pointer system
- **Troubleshooting**: Debug HEAD issues
- **Navigation**: Navigate Git history

### Định nghĩa / Definition

**HEAD** là một symbolic reference trỏ đến current branch hoặc commit.

**Đặc điểm:**

- Trỏ đến current branch (normal state)
- Trỏ đến commit hash (detached HEAD state)
- Updated bởi Git commands
- Located trong .git/HEAD

### HEAD States / Các Trạng Thái HEAD

#### Normal HEAD

- **Mô tả**: HEAD trỏ đến branch
- **Content**: `ref: refs/heads/branch-name`
- **Use case**: Normal working state

```bash
# View HEAD (normal state)
cat .git/HEAD

# Output:
# ref: refs/heads/main

# View current branch
git branch --show-current

# Output:
# main
```

#### Detached HEAD

- **Mô tả**: HEAD trỏ đến commit hash
- **Content**: Commit hash
- **Use case**: Checking out specific commit

```bash
# Checkout specific commit (detached HEAD)
git checkout abc1234

# View HEAD (detached state)
cat .git/HEAD

# Output:
# abc1234def567890...

# View status
git status

# Output:
# HEAD detached at abc1234
```

### HEAD Operations / Các Operation trên HEAD

```bash
# View HEAD
cat .git/HEAD

# View HEAD ref
git symbolic-ref HEAD

# View HEAD commit
git rev-parse HEAD

# View HEAD~1 (parent commit)
git rev-parse HEAD~1

# Reset HEAD
git reset HEAD~1

# Move HEAD to branch
git checkout main
```

### Ví dụ thực tế / Practical Example

```bash
# Normal HEAD state
git branch
# Output:
#   main
# * develop
#   feature/login

cat .git/HEAD
# Output:
# ref: refs/heads/develop

# Checkout specific commit (detached HEAD)
git checkout abc1234

# Output:
# Note: checking out 'abc1234'.
# You are in 'detached HEAD' state.

cat .git/HEAD
# Output:
# abc1234def567890...

git status

# Output:
# HEAD detached at abc1234
# nothing to commit, working tree clean

# Checkout branch (restore normal HEAD)
git checkout main

cat .git/HEAD
# Output:
# ref: refs/heads/main
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding detached HEAD**: Không hiểu detached HEAD
- **Losing work in detached HEAD**: Mất work trong detached HEAD
- **Manually modifying HEAD**: Modify HEAD thủ công

### Best Practices / Thực hành tốt nhất

- Understand HEAD states
- Avoid working in detached HEAD
- Use branch names thay vì commit hashes
- Never manually modify HEAD

---

## `refs/heads/`, `refs/tags/`, `refs/remotes/` là gì? / What are `refs/heads/`, `refs/tags/`, `refs/remotes/`?

### Mục đích / Purpose

Hiểu Git refs giúp bạn:

- Understand Git's reference system
- Know where branches, tags, remotes are stored
- Navigate Git references

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git internals
- Khi troubleshooting ref issues
- Khi learning Git internals

### Gi giúp ích gì / Benefits

- **Understanding**: Hiểu Git reference system
- **Navigation**: Navigate Git references
- **Troubleshooting**: Debug ref issues

### Định nghĩa / Definition

**Git refs** (references) là pointers đến commits, organized trong subdirectories:

- `refs/heads/`: Local branches
- `refs/tags/`: Tags
- `refs/remotes/`: Remote branches

### refs/heads/ / Local Branches

- **Mô tả**: Local branch references
- **Structure**: File cho mỗi branch
- **Content**: Commit hash của branch tip

```bash
# View local branches
ls .git/refs/heads/

# Output:
# main
# develop
# feature/login

# View main branch content
cat .git/refs/heads/main

# Output:
# abc1234def567890...

# View all local branches
git branch

# Output:
#   develop
# * feature/login
#   main
```

### refs/tags/ / Tags

- **Mô tả**: Tag references
- **Structure**: File cho mỗi tag
- **Content**: Commit hash của tag

```bash
# View tags
ls .git/refs/tags/

# Output:
# v1.0.0
# v1.1.0
# v2.0.0

# View v1.0.0 tag content
cat .git/refs/tags/v1.0.0

# Output:
# abc1234def567890...

# View all tags
git tag

# Output:
# v1.0.0
# v1.1.0
# v2.0.0
```

### refs/remotes/ / Remote Branches

- **Mô tả**: Remote branch references
- **Structure**: Directory cho mỗi remote
- **Content**: Commit hash của remote branch tip

```bash
# View remotes
ls .git/refs/remotes/

# Output:
# origin/

# View origin branches
ls .git/refs/remotes/origin/

# Output:
# HEAD
# main
# develop
# feature/login

# View origin/main content
cat .git/refs/remotes/origin/main

# Output:
# abc1234def567890...

# View all remote branches
git branch -r

# Output:
# origin/HEAD
# origin/main
# origin/develop
# origin/feature/login
```

### Ví dụ thực tế / Practical Example

```bash
# Explore refs directory
cd .git/refs

# View structure
ls -R

# Output:
# .:
# heads/
# remotes/
# tags/
#
# heads:
# main
# develop
# feature/login
#
# remotes:
# origin:
#   HEAD
#   main
#   develop
#   feature/login
#
# tags:
# v1.0.0
# v1.1.0
# v2.0.0

# View local branches
git branch

# Output:
#   develop
# * feature/login
#   main

# View remote branches
git branch -r

# Output:
# origin/HEAD -> origin/main
# origin/main
# origin/develop
# origin/feature/login

# View tags
git tag

# Output:
# v1.0.0
# v1.1.0
# v2.0.0
```

### Common Pitfalls / Lỗi thường gặp

- **Manually modifying refs**: Modify refs thủ công
- **Not understanding ref structure**: Không hiểu ref structure
- **Confusing local vs remote**: Nhầm local và remote refs

### Best Practices / Thực hành tốt nhất

- Never manually modify refs
- Understand ref structure
- Use Git commands thay vì manual operations
- Distinguish local vs remote refs

---

## Bare repository vs non-bare repository khác nhau như thế nào? / How are bare and non-bare repositories different?

### Mục đích / Purpose

Hiểu bare vs non-bare repositories giúp bạn:

- Choose appropriate repository type
- Set up shared repositories
- Understand Git server setup

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git internals
- Khi setting up Git server
- Khi creating shared repositories

### Gi giúp ích gì / Benefits

- **Correct Setup**: Choose đúng repository type
- **Server Setup**: Setup Git servers correctly
- **Understanding**: Hiểu Git repository types

### Định nghĩa / Definition

**Bare repository**: Repository không có working directory, chỉ có .git directory. Dùng cho shared repositories.

**Non-bare repository**: Repository có working directory và .git directory. Dùng cho development.

### So sánh / Comparison

| Aspect / Khía cạnh    | Bare Repository / Bare Repo  | Non-Bare Repository / Non-Bare Repo |
| --------------------- | ---------------------------- | ----------------------------------- |
| **Working Directory** | Không có                     | Có                                  |
| **.git Directory**    | Root directory               | Subdirectory                        |
| **Use Case**          | Shared repositories, servers | Development                         |
| **Can Commit**        | Không                        | Có                                  |
| **Can Checkout**      | Không                        | Có                                  |
| **Size**              | Nhỏ hơn                      | Lớn hơn                             |
| **Location**          | Server, shared               | Local machine                       |

### Creating Bare Repository / Tạo Bare Repository

```bash
# Initialize bare repository
git init --bare

# Clone as bare repository
git clone --bare source-repo.git

# Convert non-bare to bare
cd non-bare-repo
git clone --bare . ../bare-repo.git
```

### Creating Non-Bare Repository / Tạo Non-Bare Repository

```bash
# Initialize non-bare repository
git init

# Clone as non-bare repository
git clone source-repo.git

# Convert bare to non-bare
git clone bare-repo.git non-bare-repo
```

### Use Cases / Trường hợp dùng

#### Bare Repository Use Cases

- **Git Server**: Central server cho team
- **Shared Repository**: Repository shared giữa nhiều users
- **CI/CD**: Repository cho CI/CD pipelines
- **Backup**: Backup repository

#### Non-Bare Repository Use Cases

- **Development**: Local development
- **Feature Branching**: Working với branches
- **Experimentation**: Trying new features
- **Personal Projects**: Personal projects

### Ví dụ thực tế / Practical Example

```bash
# Create bare repository (server)
mkdir /srv/git/my-project.git
cd /srv/git/my-project.git
git init --bare

# Output:
# Initialized empty Git repository in /srv/git/my-project.git/

# Clone bare repository (developer)
cd ~/projects
git clone user@server:/srv/git/my-project.git

# Output:
# Cloning into 'my-project'...
# remote: Enumerating objects: 5, done.
# remote: Counting objects: 100% (5/5), done.
# remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0 (delta 0)
# Receiving objects: 100% (5/5), done.

# Work in non-bare repository (developer)
cd my-project
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Add feature"
git push
```

### Common Pitfalls / Lỗi thường gặp

- **Working in bare repository**: Work trong bare repository
- **Not understanding difference**: Không hiểu sự khác biệt
- **Wrong repository type**: Chọn sai repository type

### Best Practices / Thực hành tốt nhất

- Use bare repositories cho servers
- Use non-bare repositories cho development
- Never work directly trong bare repository
- Clone bare repository để work

---

## Khi nào nên dùng bare repository? / When should you use a bare repository?

### Mục đích / Purpose

Hiểu khi nào dùng bare repository giúp bạn:

- Choose appropriate repository type
- Set up Git servers correctly
- Configure shared repositories

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git setup
- Khi setting up Git server
- Khi creating shared repositories

### Gi giúp ích gì / Benefits

- **Correct Setup**: Setup đúng repository type
- **Server Configuration**: Configure servers correctly
- **Shared Access**: Enable shared access

### Use Cases cho Bare Repository / Use Cases cho Bare Repository

| Use Case / Trường hợp dùng | Mô tả / Description                          |
| -------------------------- | -------------------------------------------- |
| **Git Server**             | Central server cho team collaboration        |
| **Shared Repository**      | Repository shared giữa nhiều developers      |
| **CI/CD**                  | Repository cho CI/CD pipelines               |
| **Backup**                 | Backup repository không có working directory |
| **Fork**                   | Repository cho forks                         |

### Setting Up Bare Repository / Thiết lập Bare Repository

```bash
# Create bare repository
mkdir /srv/git/my-project.git
cd /srv/git/my-project.git
git init --bare

# Configure bare repository
cd /srv/git/my-project.git
git config core.sharedRepository group

# Set permissions
chown -R git:git /srv/git/my-project.git
chmod -R 775 /srv/git/my-project.git
```

### Accessing Bare Repository / Truy cập Bare Repository

```bash
# Clone bare repository
git clone user@server:/srv/git/my-project.git

# Push to bare repository
cd my-project
git remote add origin user@server:/srv/git/my-project.git
git push -u origin main
```

### Ví dụ thực tế / Practical Example

```bash
# Server setup
sudo mkdir -p /srv/git
sudo chown git:git /srv/git
sudo -u git

# Create bare repository
cd /srv/git
git init --bare my-project.git

# Configure permissions
chown -R git:git my-project.git
chmod -R 775 my-project.git

# Developer clone
cd ~/projects
git clone git@server:/srv/git/my-project.git

# Work in non-bare repository
cd my-project
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Add feature"

# Push to bare repository
git push -u origin main
```

### Common Pitfalls / Lỗi thường gặp

- **Working in bare repository**: Work trực tiếp trong bare repo
- **Wrong permissions**: Sai permissions
- **Not configuring shared repo**: Không cấu hình shared repo

### Best Practices / Thực hành tốt nhất

- Use bare repositories cho servers
- Set correct permissions
- Configure shared repository
- Never work directly trong bare repository

---

## 📚 Tài liệu tham khảo / References

- [Git Official Documentation - git-init](https://git-scm.com/docs/git-init)
- [Git Official Documentation - git-clone](https://git-scm.com/docs/git-clone)
- [Pro Git Book - Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
- [Git Internals - .git Directory](https://git-scm.com/book/en/v2/Git-Internals-The-.git-Directory)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
