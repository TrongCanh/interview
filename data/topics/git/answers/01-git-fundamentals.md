# 1. Git Fundamentals / Git Cơ bản

## Tổng quan về Git Fundamentals / Git Fundamentals Overview

### Mục đích / Purpose

**Git Fundamentals** covers the fundamental concepts of Git - the most popular distributed version control system today. Understanding these basics is essential for any developer working with version control.

**Mục đích chính:**

- Hiểu Git là gì và tại sao nó trở nên phổ biến
- Biết lịch sử phát triển của Git
- Hiểu sự khác biệt giữa Git và các VCS khác
- Nắm được Distributed vs Centralized VCS
- Hiểu Git workflow cơ bản
- Biết Git object model
- Hiểu ba trạng thái của Git: working directory, staging area, repository

### Khi nào cần hiểu về Git Fundamentals / When to Use

Hiểu về Git fundamentals là cần thiết khi:

- Bắt đầu làm việc với Git lần đầu
- Chuẩn bị cho phỏng vấn về Git
- Muốn hiểu sâu hơn về cách Git hoạt động
- Xử lý các vấn đề phức tạp trong Git
- Training team members về Git

### Giúp ích gì / Benefits

**Lợi ích:**

- **Foundation**: Cơ sở vững chắc để học các tính năng nâng cao
- **Problem-solving**: Dễ dàng debug và fix các vấn đề Git
- **Efficiency**: Sử dụng Git hiệu quả hơn
- **Collaboration**: Làm việc tốt hơn với team
- **Interview success**: Trả lời tốt các câu hỏi phỏng vấn cơ bản

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                       | Nhược điểm (Cons)                  |
| ------------------------------------ | ---------------------------------- |
| Powerful - mạnh mẽ và linh hoạt      | Learning curve - cần thời gian học |
| Distributed - không phụ thuộc server | Complex concepts - nhiều khái niệm |
| Fast - thao tác nhanh                | Commands - nhiều lệnh cần nhớ      |
| Flexible - hỗ trợ nhiều workflows    | Conflicts - có thể xảy ra conflict |

---

## Git là gì? Tại sao Git lại trở nên phổ biến? / What is Git? Why is Git so popular?

### Mục đích / Purpose

Hiểu Git là gì và lý do tại sao nó trở nên phổ biến giúp bạn:

- Nhận ra giá trị của Git trong development
- Hiểu tại sao nên học Git
- Biết Git phù hợp với nhu cầu của bạn như thế nào

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Onboarding mới team members
- Đào tạo Git cho developers

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ vai trò của Git
- **Motivation**: Có động lực học Git
- **Decision**: Ra quyết định chọn VCS phù hợp

### Định nghĩa / Definition

**Git** là một **Distributed Version Control System (DVCS)** được tạo bởi **Linus Torvalds** vào năm 2005 để quản lý source code của Linux kernel.

**Key characteristics:**

- **Distributed**: Mỗi developer có full copy của repository
- **Fast**: Các operations diễn ra nhanh vì local
- **Branching**: Branching và merging cực kỳ mạnh mẽ
- **Distributed**: Không phụ thuộc vào central server
- **Open Source**: Miễn phí và open source

### Tại sao Git phổ biến? / Why Git is Popular?

| Lý do / Reason         | Giải thích / Explanation                    |
| ---------------------- | ------------------------------------------- |
| **Distributed**        | Mỗi dev có full copy, offline work được     |
| **Fast Performance**   | Local operations, không cần network         |
| **Powerful Branching** | Branching và merging dễ dàng và nhanh chóng |
| **Open Source**        | Miễn phí, community lớn, nhiều resources    |
| **GitHub/GitLab**      | Integration tốt với các platforms phổ biến  |
| **Industry Standard**  | Được sử dụng rộng rãi trong industry        |

- **Linux kernel**: Linus Torvalds cần VCS tốt hơn BitKeeper
- **2005**: Git được phát triển trong 2 tuần
- **2006**: Git trở thành VCS chính cho Linux kernel
- **2010s**: Git vượt qua SVN để trở thành VCS phổ biến nhất
- **Today**: Git là industry standard cho version control

### Cách Git hoạt động / How Git Works

```
┌─────────────────────────────────────────────────────────────┐
│                      Git Workflow                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Working Directory  ──►  Staging Area  ──►  Repository    │
│  (Modified files)       (Staged files)      (Commits)       │
│                                                             │
│  git add                  git commit                        │
│  (stage files)           (create commit)                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# Khởi tạo repository mới
git init

# Tạo file mới
echo "Hello Git" > README.md

# Stage file
git add README.md

# Commit changes
git commit -m "Initial commit"

# Xem log
git log --oneline
```

### Common Pitfalls / Lỗi thường gặp

- **Thinking Git is like SVN**: Git hoạt động khác với centralized VCS
- **Ignoring staging area**: Không hiểu role của staging area
- **Not understanding distributed nature**: Không tận dụng lợi ích của distributed model

### Best Practices / Thực hành tốt nhất

- Learn Git fundamentals before advanced features
- Practice with real projects
- Understand Git's three states
- Use Git's branching capabilities
- Keep commits atomic

---

## Lịch sử phát triển của Git là gì? / What is the history of Git?

### Mục đích / Purpose

Hiểu lịch sử Git giúp bạn:

- Biết nguồn gốc của Git
- Hiểu tại sao Git được thiết kế theo cách này
- Đánh giá được sự phát triển của Git

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn nâng cao về Git
- Khi cần hiểu sâu về Git
- Khi so sánh Git với các VCS khác

### Giúp ích gì / Benefits

- **Context**: Hiểu context của Git
- **Appreciation**: Đánh giá cao hơn về Git
- **Insight**: Có insight về design decisions

### Timeline / Lịch sử

| Năm / Year | Sự kiện / Event                                  |
| ---------- | ------------------------------------------------ |
| 2002       | Linux kernel sử dụng BitKeeper (proprietary VCS) |
| 2005       | BitKeeper thu hồi license miễn phí cho community |
| 2005       | Linus Torvalds bắt đầu phát triển Git            |
| 2005       | Git được phát triển trong ~2 tuần                |
| 2006       | Git trở thành VCS chính cho Linux kernel         |
| 2008       | GitHub được thành lập                            |
| 2010s      | Git vượt qua SVN để trở thành VCS phổ biến nhất  |
| 2014       | Git 2.0 release                                  |
| 2019       | Git 2.23 release (git switch, git restore)       |
| Today      | Git là industry standard                         |

### Design Goals / Mục tiêu thiết kế

Git được thiết kế với các mục tiêu sau:

1. **Speed**: Các operations phải nhanh
2. **Simplicity**: Design đơn giản
3. **Non-linear development**: Hỗ trợ branching và merging mạnh mẽ
4. **Fully distributed**: Không phụ thuộc vào central server
5. **Efficient handling of large projects**: Quản lý tốt các dự án lớn như Linux kernel

### Ví dụ thực tế / Practical Example

```bash
# Xem version Git hiện tại
git --version

# Xem Git changelog
git help revisions
```

### Common Pitfalls / Lỗi thường gặp

- **Not knowing Git's age**: Không biết Git đã tồn tại lâu
- **Ignoring design goals**: Không hiểu tại sao Git được thiết kế như vậy

### Best Practices / Thực hành tốt nhất

- Understand Git's history and design goals
- Appreciate Git's simplicity and power
- Learn from Git's evolution

---

## Sự khác biệt giữa Git và các VCS khác (SVN, Mercurial)? / What are the differences between Git and other VCSs (SVN, Mercurial)?

### Mục đích / Purpose

Hiểu sự khác biệt giữa Git và các VCS khác giúp bạn:

- Chọn VCS phù hợp với nhu cầu
- Hiểu ưu nhược điểm của từng VCS
- Migrate từ VCS khác sang Git hiệu quả

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn so sánh VCS
- Khi chọn VCS cho dự án mới
- Khi migrate từ VCS khác

### Gi giúp ích gì / Benefits

- **Decision making**: Ra quyết định tốt hơn
- **Migration**: Migrate hiệu quả hơn
- **Knowledge**: Hiểu sâu hơn về Git

### So sánh chi tiết / Detailed Comparison

| Tính chất / Feature | Git                | SVN (Subversion) | Mercurial (Hg)     |
| ------------------- | ------------------ | ---------------- | ------------------ |
| **Type**            | Distributed        | Centralized      | Distributed        |
| **Branching**       | Very fast, cheap   | Slow, expensive  | Fast, cheap        |
| **Merging**         | Powerful, easy     | Difficult        | Good               |
| **Offline work**    | Full support       | Limited          | Full support       |
| **Performance**     | Very fast          | Moderate         | Fast               |
| **Learning curve**  | Steep              | Moderate         | Moderate           |
| **Repository size** | Compact            | Large            | Compact            |
| **Binary files**    | Poor (use Git LFS) | Good             | Poor               |
| **Access control**  | Basic (via server) | Advanced         | Basic (via server) |
| **Popularity**      | Very high          | Moderate         | Low                |

### Distributed vs Centralized / Phân tán vs Tập trung

```
┌─────────────────────────────────────────────────────────────┐
│              Centralized VCS (SVN)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────┐                               │
│                    │ Server  │                               │
│                    │ (Single)│                               │
│                    └────┬────┘                               │
│                         │                                    │
│         ┌───────────────┼───────────────┐                  │
│         │               │               │                  │
│    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐             │
│    │ Dev A   │     │ Dev B   │     │ Dev C   │             │
│    └─────────┘     └─────────┘     └─────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Distributed VCS (Git)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────┐     ┌─────────┐     ┌─────────┐             │
│    │ Dev A   │     │ Dev B   │     │ Dev C   │             │
│    │ (Full)  │     │ (Full)  │     │ (Full)  │             │
│    └────┬────┘     └────┬────┘     └────┬────┘             │
│         │               │               │                  │
│         └───────────────┼───────────────┘                  │
│                         │                                    │
│                    ┌────▼────┐                               │
│                    │ Remote  │                               │
│                    │ (Backup)│                               │
│                    └─────────┘                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# Git - Distributed
git clone https://github.com/user/repo.git
# Dev A có full repository local, có thể work offline

# SVN - Centralized
svn checkout https://svn.example.com/repo
# Dev A chỉ có working copy, cần server cho nhiều operations
```

### Common Pitfalls / Lỗi thường gặp

- **Thinking Git is like SVN**: Git hoạt động khác với SVN
- **Not understanding distributed model**: Không tận dụng lợi ích của distributed
- **Ignoring branching differences**: Không hiểu branching khác nhau giữa các VCS

### Best Practices / Thực hành tốt nhất

- Understand the differences between VCSs
- Choose the right VCS for your needs
- Learn Git's distributed model
- Use Git's powerful branching

---

## Distributed VCS vs Centralized VCS - khác nhau như thế nào? / How are Distributed VCS and Centralized VCS different?

### Mục đích / Purpose

Hiểu sự khác biệt giữa Distributed và Centralized VCS giúp bạn:

- Chọn VCS phù hợp với nhu cầu
- Hiểu ưu nhược điểm của từng loại
- Làm việc hiệu quả với Git

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git fundamentals
- Khi chọn VCS cho dự án
- Khi training team về Git

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ các loại VCS
- **Decision**: Ra quyết định tốt hơn
- **Efficiency**: Sử dụng VCS hiệu quả hơn

### So sánh chi tiết / Detailed Comparison

| Tính chất / Feature         | Centralized VCS (SVN)  | Distributed VCS (Git) |
| --------------------------- | ---------------------- | --------------------- |
| **Server**                  | Required               | Optional              |
| **Offline work**            | Limited                | Full support          |
| **Single point of failure** | Yes                    | No                    |
| **Branching**               | Slow, expensive        | Fast, cheap           |
| **Merging**                 | Difficult              | Easy                  |
| **Performance**             | Network-dependent      | Local operations fast |
| **Backup**                  | Server backup required | Every dev has backup  |
| **Collaboration**           | Via server             | P2P or via server     |
| **Access control**          | Advanced               | Basic                 |

### Centralized VCS / VCS Tập trung

**Ưu điểm / Advantages:**

- Simple to understand
- Good access control
- Centralized backup
- Good for binary files

**Nhược điểm / Disadvantages:**

- Single point of failure
- Requires network
- Slow branching
- Limited offline work

### Distributed VCS / VCS Phân tán

**Ưu điểm / Advantages:**

- No single point of failure
- Full offline support
- Fast branching
- Every dev has backup
- Better performance

**Nhược điểm / Disadvantages:**

- Steeper learning curve
- More complex
- Larger initial clone
- Basic access control

### Ví dụ thực tế / Practical Example

```bash
# Centralized VCS (SVN)
svn checkout https://svn.example.com/repo
# Cần server cho commit, update, log, etc.

# Distributed VCS (Git)
git clone https://github.com/user/repo.git
# Có thể commit, log, branch, merge offline
git push # Chỉ cần network khi push/pull
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding distributed model**: Không hiểu model phân tán
- **Ignoring offline capabilities**: Không tận dụng offline work
- **Misunderstanding server role**: Không hiểu role của remote server

### Best Practices / Thực hành tốt nhất

- Understand distributed model
- Use offline capabilities
- Commit frequently even offline
- Push regularly to remote

---

## Git workflow cơ bản hoạt động như thế nào? / How does the basic Git workflow work?

### Mục đích / Purpose

Hiểu Git workflow cơ bản giúp bạn:

- Biết cách Git quản lý changes
- Hiểu ba trạng thái của Git
- Sử dụng Git hiệu quả

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Khi training new developers
- Khi debug Git issues

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ Git workflow
- **Efficiency**: Sử dụng Git hiệu quả hơn
- **Debugging**: Dễ debug các vấn đề

### Git Three States / Ba Trạng Thái Của Git

```
┌─────────────────────────────────────────────────────────────┐
│                    Git Three States                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────┐  │
│  │ Working      │─────►│ Staging      │─────►│ Repository│  │
│  │ Directory    │      │ Area         │      │          │  │
│  │ (Modified)   │      │ (Staged)     │      │ (Committed)│ │
│  └──────────────┘      └──────────────┘      └──────────┘  │
│                                                             │
│  git add                   git commit                      │
│  (stage files)            (create commit)                   │
│                                                             │
│  git checkout              git reset                        │
│  (discard changes)         (unstage/undo)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Chi tiết từng trạng thái / State Details

#### 1. Working Directory / Thư mục làm việc

- **Mô tả**: Files bạn đang làm việc
- **Trạng thái**: Modified, Untracked
- **Lệnh liên quan**: `git status`, `git add`, `git checkout`

```bash
# Xem trạng thái working directory
git status

# Discard changes trong working directory
git checkout -- file.txt
# hoặc (Git 2.23+)
git restore file.txt
```

#### 2. Staging Area / Khu vực staging

- **Mô tả**: Files đã được staged, sẵn sàng commit
- **Trạng thái**: Staged
- **Lệnh liên quan**: `git add`, `git reset`, `git diff --staged`

```bash
# Stage file
git add file.txt

# Unstage file
git reset HEAD file.txt
# hoặc (Git 2.23+)
git restore --staged file.txt

# Xem staged changes
git diff --staged
```

#### 3. Repository / Kho lưu trữ

- **Mô tả**: Files đã được commit
- **Trạng thái**: Committed
- **Lệnh liên quan**: `git commit`, `git log`, `git show`

```bash
# Commit staged changes
git commit -m "Commit message"

# Xem commit history
git log --oneline

# Xem chi tiết commit
git show <commit-hash>
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo file mới trong working directory
echo "Hello Git" > file.txt

# 2. Xem trạng thái
git status
# Output: file.txt is untracked

# 3. Stage file (working -> staging)
git add file.txt

# 4. Xem trạng thái
git status
# Output: file.txt is staged

# 5. Commit (staging -> repository)
git commit -m "Add file.txt"

# 6. Xem trạng thái
git status
# Output: working directory clean
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding staging area**: Không hiểu role của staging area
- **Skipping staging**: Không stage trước khi commit
- **Confusing states**: Nhầm lẫn giữa các trạng thái

### Best Practices / Thực hành tốt nhất

- Understand Git's three states
- Stage changes intentionally
- Review changes before committing
- Keep commits atomic

---

## Git object model là gì? / What is the Git object model?

### Mục đích / Purpose

Hiểu Git object model giúp bạn:

- Biết Git lưu trữ dữ liệu như thế nào
- Hiểu tại sao Git nhanh và efficient
- Debug các vấn đề về Git internals

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn nâng cao về Git
- Khi cần hiểu Git internals
- Khi troubleshooting Git issues

### Giúp ích gì / Benefits

- **Deep understanding**: Hiểu sâu về Git
- **Efficiency**: Sử dụng Git hiệu quả hơn
- **Troubleshooting**: Dễ debug các vấn đề

### Git Objects / Git Objects

Git sử dụng 4 loại objects chính:

| Object Type | Mô tả / Description | Ví dụ / Example                  |
| ----------- | ------------------- | -------------------------------- |
| **Blob**    | File content        | File content (không bao gồm tên) |
| **Tree**    | Directory structure | Files và subdirectories          |
| **Commit**  | Commit metadata     | Author, date, parent, tree       |
| **Tag**     | Tag reference       | Annotated tag metadata           |

### Git Object Storage / Lưu trữ Git Objects

```
┌─────────────────────────────────────────────────────────────┐
│                  Git Object Storage                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  .git/objects/                                              │
│  ├── ab/                                                     │
│  │   └── cdef123...  (blob object)                          │
│  ├── cd/                                                     │
│  │   └── ef456789...  (tree object)                         │
│  └── ef/                                                     │
│      └── 7890abcd...  (commit object)                       │
│                                                             │
│  Object name = SHA-1 hash of content                        │
│  Object location = .git/objects/ab/cdef123...              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Chi tiết từng object type / Object Type Details

#### 1. Blob Object

- **Mô tả**: Lưu trữ content của file
- **Không bao gồm**: Tên file, permissions, metadata
- **Đặc điểm**: Content-based addressing

```bash
# Xem blob object
git cat-file -p <blob-hash>

# Xem blob type
git cat-file -t <blob-hash>
```

#### 2. Tree Object

- **Mô tả**: Lưu trữ directory structure
- **Bao gồm**: File names, permissions, blob/tree references
- **Đặc điểm**: Recursive structure

```bash
# Xem tree object
git cat-file -p <tree-hash>

# Xem tree type
git cat-file -t <tree-hash>
```

#### 3. Commit Object

- **Mô tả**: Lưu trữ commit metadata
- **Bao gồm**: Tree, parent(s), author, committer, message
- **Đặc điểm**: Immutable

```bash
# Xem commit object
git cat-file -p <commit-hash>

# Xem commit type
git cat-file -t <commit-hash>

# Xem commit tree
git cat-file -p HEAD | grep tree
```

#### 4. Tag Object

- **Mô tả**: Lưu trữ tag metadata (annotated tags)
- **Bao gồm**: Object, tagger, date, message
- **Đặc điểm**: Persistent reference

```bash
# Xem tag object
git cat-file -p <tag-hash>

# Xem tag type
git cat-file -t <tag-hash>
```

### Ví dụ thực tế / Practical Example

```bash
# Xem HEAD object
git cat-file -p HEAD

# Xem HEAD tree
git cat-file -p HEAD^{tree}

# Xem blob trong tree
git ls-tree HEAD^{tree}

# Xem content của file
git show HEAD:file.txt

# Xem object hash
git hash-object file.txt
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding content-based addressing**: Không hiểu Git lưu trữ theo content
- **Confusing objects with files**: Nhầm lẫn objects với files
- **Ignoring object immutability**: Không hiểu objects là immutable

### Best Practices / Thực hành tốt nhất

- Understand Git's object model
- Use `git cat-file` to explore objects
- Understand content-based addressing
- Know that objects are immutable

---

## Git có ba trạng thái nào? Giải thích working directory, staging area, và repository. / What are the three states of Git? Explain working directory, staging area, and repository.

### Mục đích / Purpose

Hiểu ba trạng thái của Git giúp bạn:

- Biết cách Git quản lý changes
- Sử dụng Git commands đúng cách
- Debug các vấn đề về Git states

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn cơ bản về Git
- Khi training new developers
- Khi troubleshooting Git issues

### Giúp ích gì / Benefits

- **Understanding**: Hiểu rõ Git states
- **Efficiency**: Sử dụng Git hiệu quả hơn
- **Debugging**: Dễ debug các vấn đề

### Ba Trạng Thái Của Git / Git's Three States

```
┌─────────────────────────────────────────────────────────────┐
│              Git's Three States (Detailed)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Working Directory                                    │   │
│  │ - Files bạn đang làm việc                            │   │
│  │ - Modified, Untracked                               │   │
│  │ - Lệnh: git status, git checkout, git restore       │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                    git add                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Staging Area (Index)                                │   │
│  │ - Files đã staged, sẵn sàng commit                  │   │
│  │ - Staged                                             │   │
│  │ - Lệnh: git diff --staged, git reset, git restore   │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                    git commit                                │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Repository (.git directory)                         │   │
│  │ - Files đã committed                               │   │
│  │ - Committed                                         │   │
│  │ - Lệnh: git log, git show, git checkout            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1. Working Directory / Thư mục làm việc

**Mô tả:**

- Files bạn đang làm việc
- Sandbox của bạn để làm changes
- Files ở đây chưa được tracked bởi Git

**Trạng thái files:**

- **Untracked**: Files mới, chưa được Git biết
- **Modified**: Files đã được tracked nhưng có changes

**Commands:**

```bash
# Xem trạng thái
git status

# Discard changes
git checkout -- file.txt
# hoặc (Git 2.23+)
git restore file.txt

# Xem changes
git diff
```

### 2. Staging Area / Khu vực staging

**Mô tả:**

- Files đã được staged, sẵn sàng commit
- Còn gọi là "index"
- Giúp bạn review changes trước khi commit

**Trạng thái files:**

- **Staged**: Files đã được staged

**Commands:**

```bash
# Stage files
git add file.txt
git add .
git add -A

# Unstage files
git reset HEAD file.txt
# hoặc (Git 2.23+)
git restore --staged file.txt

# Xem staged changes
git diff --staged
```

### 3. Repository / Kho lưu trữ

**Mô tả:**

- Files đã được committed
- Lưu trữ trong `.git` directory
- Immutable - không thể thay đổi

**Trạng thái files:**

- **Committed**: Files đã được committed

**Commands:**

```bash
# Commit changes
git commit -m "Message"

# Xem commit history
git log
git log --oneline
git log --graph

# Xem commit details
git show <commit-hash>
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Working Directory: Tạo file mới
echo "Hello Git" > file.txt
git status
# Output: file.txt is untracked

# 2. Staging Area: Stage file
git add file.txt
git status
# Output: file.txt is staged

# 3. Xem staged changes
git diff --staged

# 4. Repository: Commit changes
git commit -m "Add file.txt"
git status
# Output: working directory clean

# 5. Xem commit
git log --oneline
```

### Common Pitfalls / Lỗi thường gặp

- **Not staging before committing**: Không stage trước khi commit
- **Confusing states**: Nhầm lẫn giữa các trạng thái
- **Not reviewing staged changes**: Không review trước khi commit

### Best Practices / Thực hành tốt nhất

- Understand Git's three states
- Stage changes intentionally
- Review changes before committing
- Keep commits atomic

---

## 📚 Tài liệu tham khảo / References

- [Git Official Documentation](https://git-scm.com/doc)
- [Pro Git Book - Chapter 1: Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
- [Git Internals - Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
