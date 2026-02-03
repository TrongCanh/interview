# 3. Git Configuration / Cấu hình Git

## Tổng quan về Git Configuration / Git Configuration Overview

### Mục đích / Purpose

**Git Configuration** covers how to configure Git settings at different levels. Understanding this helps you:

- Configure Git for personal use
- Set up team-wide settings
- Manage multiple Git configurations
- Troubleshoot configuration issues

**Mục đích chính:**

- Understand Git configuration levels
- Configure user identity
- Set up Git aliases
- Configure default settings

### Khi nào cần hiểu về Git Configuration / When to Use

Hiểu về Git configuration là cần thiết khi:

- Setting up Git for the first time
- Configuring Git for team use
- Troubleshooting Git issues
- Managing multiple Git identities

### Giúp ích gì / Benefits

**Lợi ích:**

- **Customization**: Customize Git behavior
- **Efficiency**: Increase productivity with aliases
- **Consistency**: Ensure consistent settings
- **Flexibility**: Configure per-project settings

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                        | Nhược điểm (Cons)                      |
| ------------------------------------- | -------------------------------------- |
| Flexible - nhiều configuration levels | Complex - có thể confusing             |
| Hierarchical - override dễ dàng       | Conflicts - conflicts giữa levels      |
| Persistent - settings được lưu        | Security - sensitive info trong config |

---

## `git config --global`, `--local`, `--system` khác nhau như thế nào? / How are `git config --global`, `--local`, `--system` different?

### Mục đích / Purpose

Hiểu các Git configuration levels giúp bạn:

- Configure Git tại đúng level
- Override settings khi cần
- Troubleshoot configuration issues

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git configuration
- Khi troubleshooting config issues
- Khi setting up Git cho team

### Gi giúp ích gì / Benefits

- **Correct Configuration**: Configure tại đúng level
- **Flexibility**: Override settings khi cần
- **Troubleshooting**: Debug configuration issues

### Configuration Levels / Các Level Cấu hình

```
┌─────────────────────────────────────────────────────────────┐
│              Git Configuration Levels                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Priority (highest to lowest):                               │
│                                                             │
│  1. Local (--local)                                       │
│     └──> .git/config (repository-specific)                │
│                                                             │
│  2. Global (--global)                                      │
│     └──> ~/.gitconfig (user-specific)                      │
│                                                             │
│  3. System (--system)                                      │
│     └──> /etc/gitconfig (system-wide)                      │
│                                                             │
│  Settings merge: local overrides global overrides system       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Chi tiết từng level / Details của từng level

#### 1. Local Configuration (--local)

- **File location**: `.git/config` trong repository
- **Scope**: Repository-specific
- **Priority**: Highest
- **Use case**: Project-specific settings

```bash
# Set local configuration
git config --local user.name "Project Name"
git config --local user.email "project@example.com"

# View local configuration
git config --local --list

# Edit local config file
git config --local -e
```

#### 2. Global Configuration (--global)

- **File location**: `~/.gitconfig` (Unix) hoặc `~/.gitconfig` (Windows)
- **Scope**: User-specific
- **Priority**: Medium
- **Use case**: Default settings cho tất cả repositories

```bash
# Set global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# View global configuration
git config --global --list

# Edit global config file
git config --global -e
```

#### 3. System Configuration (--system)

- **File location**: `/etc/gitconfig` (Unix) hoặc `C:\ProgramData\Git\config` (Windows)
- **Scope**: System-wide
- **Priority**: Lowest
- **Use case**: Default settings cho tất cả users

```bash
# Set system configuration (requires admin rights)
git config --system core.editor vim

# View system configuration
git config --system --list

# Edit system config file (requires admin rights)
git config --system -e
```

### Configuration Priority / Priority Cấu hình

```
┌─────────────────────────────────────────────────────────────┐
│              Configuration Priority                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Setting Resolution Order:                                  │
│                                                             │
│  1. Check local config (.git/config)                        │
│     └──> If found, use local value                      │
│                                                             │
│  2. Check global config (~/.gitconfig)                      │
│     └──> If not in local, use global value                │
│                                                             │
│  3. Check system config (/etc/gitconfig)                     │
│     └──> If not in global, use system value                │
│                                                             │
│  4. Use Git default value                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# System level
git config --system core.editor vim

# Global level
git config --global core.editor "code --wait"

# Local level (overrides global)
git config --local core.editor "nano"

# View effective value (local takes precedence)
git config core.editor
# Output: nano

# View all levels
git config --list --show-origin
# Output shows file location for each setting
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding priority**: Không hiểu priority
- **Wrong level configuration**: Cấu hình sai level
- **Conflicting settings**: Settings conflict giữa levels

### Best Practices / Thực hành tốt nhất

- Use global cho personal settings
- Use local cho project-specific settings
- Use system cho team-wide settings
- Understand configuration priority

---

## `user.name` và `user.email` dùng để làm gì? / What are `user.name` and `user.email` used for?

### Mục đích / Purpose

Hiểu `user.name` và `user.email` giúp bạn:

- Set up Git identity
- Ensure commits are properly attributed
- Configure multiple identities

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi setting up Git lần đầu
- Khi troubleshooting commit attribution

### Gi giúp ích gì / Benefits

- **Attribution**: Correct attribution cho commits
- **Collaboration**: Team members có thể identify authors
- **Compliance**: Meet organizational requirements

### Định nghĩa / Definition

**`user.name`** và **`user.email`** là Git configuration settings dùng để:

- Identify author của commits
- Set committer information
- Track changes attribution

### Cấu hình user.name và user.email / Configuring user.name và user.email

```bash
# Set user name (global)
git config --global user.name "Your Name"

# Set user email (global)
git config --global user.email "your.email@example.com"

# Set user name (local)
git config --local user.name "Project Name"

# Set user email (local)
git config --local user.email "project@example.com"

# View current settings
git config user.name
git config user.email

# View all settings
git config --list | grep user
```

### Multiple Identities / Nhiều Identities

```bash
# Default identity (global)
git config --global user.name "Your Name"
git config --global user.email "personal@example.com"

# Work identity (local in work repo)
cd ~/work/project
git config --local user.name "Work Name"
git config --local user.email "work@company.com"

# Open source identity (local in open source repo)
cd ~/oss/project
git config --local user.name "OSS Name"
git config --local user.email "oss@github.com"
```

### Conditional Identities / Identities Có Điều kiện

```bash
# Include file in ~/.gitconfig
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

# ~/.gitconfig-work
[user]
    name = Work Name
    email = work@company.com

[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal

# ~/.gitconfig-personal
[user]
    name = Personal Name
    email = personal@example.com
```

### Ví dụ thực tế / Practical Example

```bash
# Setup personal identity
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"

# Create personal project
mkdir ~/personal/myproject
cd ~/personal/myproject
git init
echo "Personal project" > README.md
git add README.md
git commit -m "Initial commit"

# Check commit author
git log --format="%an <%ae>" -1
# Output: John Doe <john.doe@gmail.com>

# Setup work identity
mkdir ~/work/workproject
cd ~/work/workproject
git init
git config --local user.name "John Doe (Work)"
git config --local user.email "john.doe@company.com"

echo "Work project" > README.md
git add README.md
git commit -m "Initial commit"

# Check commit author
git log --format="%an <%ae>" -1
# Output: John Doe (Work) <john.doe@company.com>
```

### Common Pitfalls / Lỗi thường gặp

- **Not setting identity**: Không set user.name/email
- **Wrong email**: Sai email address
- **Not updating**: Không update khi thay đổi

### Best Practices / Thực hành tốt nhất

- Always set user.name và user.email
- Use work email cho work projects
- Use personal email cho personal projects
- Verify commit attribution

---

## Cách xem tất cả cấu hình Git hiện tại? / How to view all current Git configuration?

### Mục đích / Purpose

Hiểu cách view Git configuration giúp bạn:

- Debug configuration issues
- Verify current settings
- Understand configuration hierarchy

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git configuration
- Khi troubleshooting config issues
- Khi verifying Git setup

### Gi giúp ích gì / Benefits

- **Verification**: Verify current settings
- **Debugging**: Debug configuration issues
- **Understanding**: Understand configuration hierarchy

### View Configuration Commands / Các Lệnh Xem Cấu hình

```bash
# View all configuration (all levels merged)
git config --list

# View global configuration
git config --global --list

# View local configuration
git config --local --list

# View system configuration
git config --system --list

# View specific setting
git config user.name

# View specific setting with origin
git config --list --show-origin

# View configuration file
git config -e
```

### Understanding --show-origin / Hiểu --show-origin

```bash
# View configuration with file origin
git config --list --show-origin

# Output example:
# user.name=John Doe    file:/home/user/.gitconfig
# user.email=john@example.com    file:/home/user/.gitconfig
# core.editor=vim    file:/etc/gitconfig
# core.autocrlf=true    file:.git/config
```

### Filter Configuration / Lọc Cấu hình

```bash
# Filter by key
git config --list | grep user

# Filter by pattern
git config --list | grep core

# View specific setting
git config user.name
git config core.editor
git config init.defaultBranch
```

### Ví dụ thực tế / Practical Example

```bash
# View all configuration
git config --list

# Output:
# user.name=John Doe
# user.email=john@example.com
# core.editor=vim
# core.autocrlf=true
# init.defaultbranch=main
# push.default=simple
# color.ui=auto
# alias.co=checkout
# alias.br=branch
# alias.ci=commit
# alias.st=status

# View with origin
git config --list --show-origin

# Output:
# user.name=John Doe    file:/home/user/.gitconfig
# user.email=john@example.com    file:/home/user/.gitconfig
# core.editor=vim    file:/home/user/.gitconfig
# core.autocrlf=true    file:/home/user/.gitconfig
# init.defaultbranch=main    file:/home/user/.gitconfig
# push.default=simple    file:/home/user/.gitconfig
# color.ui=auto    file:/home/user/.gitconfig
# alias.co=checkout    file:/home/user/.gitconfig
# alias.br=branch    file:/home/user/.gitconfig
# alias.ci=commit    file:/home/user/.gitconfig
# alias.st=status    file:/home/user/.gitconfig

# View specific setting
git config user.name
# Output: John Doe

# Filter by key
git config --list | grep alias
# Output:
# alias.co=checkout
# alias.br=branch
# alias.ci=commit
# alias.st=status
```

### Common Pitfalls / Lỗi thường gặp

- **Not checking configuration**: Không check configuration
- **Not understanding hierarchy**: Không hiểu hierarchy
- **Confusing settings**: Nhầm lẫn settings

### Best Practices / Thực hành tốt nhất

- Check configuration regularly
- Understand configuration hierarchy
- Use --show-origin cho debugging
- Filter configuration khi cần

---

## Git aliases là gì? Cách tạo và sử dụng? / What are Git aliases? How to create and use them?

### Mục đích / Purpose

Hiểu Git aliases giúp bạn:

- Increase productivity
- Shorten common commands
- Create custom Git commands

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git productivity
- Khi optimizing Git workflow
- Khi learning Git tips

### Gi giúp ích gì / Benefits

- **Productivity**: Tăng productivity
- **Efficiency**: Shorten commands
- **Customization**: Create custom commands

### Định nghĩa / Definition

**Git aliases** là shortcuts cho Git commands, cho phép bạn:

- Create short forms của long commands
- Combine multiple commands
- Create custom Git operations

### Creating Aliases / Tạo Aliases

```bash
# Basic alias syntax
git config --global alias.<name> "<command>"

# Common aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.logg 'log --graph --decorate --oneline --abbrev-commit'
git config --global alias.lg 'log --graph --decorate --oneline --abbrev-commit --all'
```

### Common Aliases / Các Aliases Thường Dùng

| Alias     | Command / Lệnh                                           | Mô tả / Description |
| --------- | -------------------------------------------------------- | ------------------- |
| `co`      | `checkout`                                               | Short for checkout  |
| `br`      | `branch`                                                 | Short for branch    |
| `ci`      | `commit`                                                 | Short for commit    |
| `st`      | `status`                                                 | Short for status    |
| `unstage` | `reset HEAD --`                                          | Unstage files       |
| `last`    | `log -1 HEAD`                                            | Show last commit    |
| `amend`   | `commit --amend`                                         | Amend last commit   |
| `undo`    | `reset --soft HEAD~1`                                    | Undo last commit    |
| `lg`      | `log --graph --decorate --oneline --abbrev-commit --all` | Pretty log          |
| `addp`    | `add -p`                                                 | Add with patch mode |
| `diffp`   | `diff --cached`                                          | Diff staged changes |
| `pushf`   | `push --force-with-lease`                                | Safe force push     |

### Using Aliases / Sử dụng Aliases

```bash
# Use alias instead of full command
git co main                    # git checkout main
git br feature                  # git branch feature
git ci "Add feature"           # git commit "Add feature"
git st                         # git status
git unstage file.txt           # git reset HEAD -- file.txt
git last                       # git log -1 HEAD
git lg                         # git log --graph --decorate --oneline --abbrev-commit --all
```

### Advanced Aliases / Aliases Nâng cao

```bash
# Alias with arguments
git config --global alias.recent 'branch --sort=-committerdate'

# Alias combining commands
git config --global alias.pushall '!git push --all && git push --tags'

# Alias with shell commands
git config --global alias.count '!git shortlog -sn --all --no-merges'

# Alias for showing files in commit
git config --global alias.show-files '!git show --pretty="" --name-only'

# Alias for deleting merged branches
git config --global alias.delete-merged '!git branch --merged | grep -v "\*" | xargs -n 1 git branch -d'

# Alias for showing untracked files
git config --global alias.untracked 'ls-files --others --exclude-standard'
```

### Managing Aliases / Quản lý Aliases

```bash
# View all aliases
git config --global --get-regexp alias

# View specific alias
git config alias.co

# Remove alias
git config --global --unset alias.co

# Edit aliases in config file
git config --global -e

# Backup aliases
git config --global --list > git-aliases-backup.txt
```

### Ví dụ thực tế / Practical Example

```bash
# Setup common aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg 'log --graph --decorate --oneline --abbrev-commit --all'

# Use aliases in workflow
git br feature-login              # Create branch
git co feature-login               # Checkout branch
echo "Login feature" > login.js
git ci "Add login feature"        # Commit changes
git st                           # Check status
git lg                           # View log
```

### Common Pitfalls / Lỗi thường gặp

- **Not using aliases**: Không tận dụng aliases
- **Conflicting names**: Tên alias conflict với Git commands
- **Over-complicating**: Aliases quá phức tạp

### Best Practices / Thực hành tốt nhất

- Create aliases cho common commands
- Use short, memorable names
- Document custom aliases
- Avoid conflicts với Git commands

---

## Default branch name là gì? Cách thay đổi? / What is default branch name? How to change it?

### Mục đích / Purpose

Hiểu default branch name giúp bạn:

- Configure Git initialization
- Use modern branch naming (main vs master)
- Ensure consistency across team

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git configuration
- Khi migrating từ master sang main
- Khi setting up Git cho team

### Gi giúp ích gì / Benefits

- **Consistency**: Consistent branch naming
- **Modernization**: Use modern naming conventions
- **Inclusivity**: More inclusive language

### Định nghĩa / Definition

**Default branch name** là tên branch được tạo khi:

- Initializing new repository (`git init`)
- Cloning repository (`git clone`)
- Creating new worktree

### Changing Default Branch Name / Thay đổi Default Branch Name

```bash
# Set default branch name to main
git config --global init.defaultBranch main

# Verify configuration
git config init.defaultBranch

# Output: main
```

### Renaming Existing Branch / Đổi tên Branch Hiện có

```bash
# Rename master to main (local)
git branch -m master main

# Rename master to main (remote)
git push origin :master
git push origin main

# Update upstream tracking
git push origin -u main

# Update HEAD reference
git symbolic-ref refs/HEAD refs/heads/main
```

### GitHub Default Branch / GitHub Default Branch

```bash
# Using GitHub CLI
gh repo edit --default-branch main

# Using GitHub API
curl -X PATCH \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/owner/repo \
  -d '{"default_branch":"main"}'
```

### GitLab Default Branch / GitLab Default Branch

```bash
# Using GitLab API
curl -X PUT \
  -H "PRIVATE-TOKEN: YOUR_TOKEN" \
  https://gitlab.com/api/v4/projects/PROJECT_ID \
  -d '{"default_branch":"main"}'
```

### Migration Script / Script Migration

```bash
#!/bin/bash
# Migrate from master to main

# Rename local branch
git branch -m master main

# Fetch remote changes
git fetch origin

# Delete remote master branch
git push origin :master

# Push new main branch
git push origin main

# Set upstream tracking
git push origin -u main

# Update HEAD reference
git symbolic-ref refs/HEAD refs/heads/main

# Update remote HEAD
git remote set-heads origin main

echo "Migration complete! Default branch is now 'main'"
```

### Ví dụ thực tế / Practical Example

```bash
# Set default branch to main
git config --global init.defaultBranch main

# Initialize new repository
mkdir new-project
cd new-project
git init

# Check default branch
git branch
# Output: * main

# Create first commit
echo "Initial commit" > README.md
git add README.md
git commit -m "Initial commit"

# Verify branch name
git branch
# Output: * main
```

### Common Pitfalls / Lỗi thường gặp

- **Not updating remote**: Không update remote branch
- **Forgetting to update HEAD**: Quên update HEAD reference
- **Breaking CI/CD**: Phá vỡ CI/CD pipelines

### Best Practices / Thực hành tốt nhất

- Use modern naming (main)
- Update both local và remote
- Update CI/CD configurations
- Communicate with team

---

## `core.autocrlf` là gì? Khi nào cần cấu hình? / What is `core.autocrlf`? When to configure it?

### Mục đích / Purpose

Hiểu `core.autocrlf` giúp bạn:

- Handle line endings correctly
- Avoid whitespace issues
- Work cross-platform effectively

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git configuration
- Khi troubleshooting whitespace issues
- Khi working cross-platform

### Gi giúp ích gì / Benefits

- **Compatibility**: Cross-platform compatibility
- **Clean History**: Avoid whitespace changes in commits
- **Consistency**: Consistent line endings

### Định nghĩa / Definition

**`core.autocrlf`** là Git configuration setting để handle line endings (CRLF vs LF) khi:

- Committing files
- Checking out files
- Working cross-platform

### Line Endings / Line Endings

| Platform / Nền tảng  | Line Ending / Kết thúc dòng | Character / Ký tự |
| -------------------- | --------------------------- | ----------------- |
| **Windows**          | CRLF                        | `\r\n`            |
| **Unix/Linux/macOS** | LF                          | `\n`              |
| **Old macOS**        | CR                          | `\r`              |

### core.autocrlf Settings / Các cài đặt core.autocrlf

| Value / Giá trị | Mô tả / Description                                     | Use Case / Trường hợp dùng            |
| --------------- | ------------------------------------------------------- | ------------------------------------- |
| `true`          | Convert CRLF to LF on commit, LF to CRLF on checkout    | Windows                               |
| `false`         | No conversion                                           | Unix/Linux/macOS                      |
| `input`         | Convert CRLF to LF on commit, no conversion on checkout | Unix/Linux/macOS working with Windows |

### Configuration Examples / Ví dụ Cấu hình

```bash
# Windows (convert to CRLF on checkout, LF on commit)
git config --global core.autocrlf true

# macOS/Linux (keep LF)
git config --global core.autocrlf false

# macOS/Linux working with Windows (convert CRLF to LF on commit)
git config --global core.autocrlf input

# Verify configuration
git config core.autocrlf
```

### .gitattributes / .gitattributes File

```bash
# Create .gitattributes file
cat > .gitattributes << EOF
# Auto detect text files
* text=auto

# Force LF for text files
*.txt text eol=lf
*.js text eol=lf
*.py text eol=lf
*.md text eol=lf

# Force CRLF for Windows-specific files
*.bat text eol=crlf
*.cmd text eol=crlf

# Binary files
*.png binary
*.jpg binary
*.pdf binary
EOF

# Commit .gitattributes
git add .gitattributes
git commit -m "Add .gitattributes for line endings"
```

### Troubleshooting Line Endings / Troubleshooting Line Endings

```bash
# Check line endings of a file
cat -A file.txt

# Output:
# Line endings with CRLF show as ^M$
# Line endings with LF show as $

# Check line endings with file command (Unix)
file file.txt

# Output:
# ASCII text, with CRLF line terminators
# hoặc
# ASCII text

# Normalize line endings
git add --renormalize .
git commit -m "Normalize line endings"
```

### Ví dụ thực tế / Practical Example

```bash
# Windows user
git config --global core.autocrlf true

# Create file with CRLF (Windows default)
echo "Hello Git" > file.txt

# Add and commit
git add file.txt
git commit -m "Add file"

# Check what was committed
git show HEAD:file.txt | cat -A

# Output:
# Hello Git^M$  (^M indicates CRLF was converted to LF)

# Checkout file (LF converted back to CRLF)
git checkout HEAD -- file.txt

# Check line endings
cat -A file.txt

# Output:
# Hello Git^M^M$  (CRLF restored)
```

### Common Pitfalls / Lỗi thường gặp

- **Wrong autocrlf setting**: Sai autocrlf setting
- **Not using .gitattributes**: Không dùng .gitattributes
- **Mixed line endings**: Mixed line endings trong repository

### Best Practices / Thực hành tốt nhất

- Configure autocrlf based on OS
- Use .gitattributes cho consistency
- Normalize line endings
- Test cross-platform

---

## Cách cấu hình merge tools trong Git? / How to configure merge tools in Git?

### Mục đích / Purpose

Hiểu cách configure merge tools giúp bạn:

- Use visual merge tools
- Resolve conflicts easier
- Configure preferred diff/merge tools

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git configuration
- Khi setting up merge tools
- Khi improving conflict resolution

### Gi giúp ích gì / Benefits

- **Visual Resolution**: Visual conflict resolution
- **Efficiency**: Faster conflict resolution
- **Flexibility**: Use preferred tools

### Popular Merge Tools / Các Merge Tools Phổ Biến

| Tool / Công cụ     | Platform / Nền tảng | Type / Loại        |
| ------------------ | ------------------- | ------------------ |
| **VS Code**        | Cross-platform      | Free, Built-in     |
| **KDiff3**         | Cross-platform      | Free, 3-way        |
| **Meld**           | Cross-platform      | Free, Visual       |
| **Beyond Compare** | Windows, macOS      | Paid, Powerful     |
| **WinMerge**       | Windows             | Free, 2-way        |
| **Kaleidoscope**   | macOS               | Paid, Beautiful    |
| **DeltaWalker**    | Cross-platform      | Paid, Fast         |
| **P4Merge**        | Cross-platform      | Paid, Professional |

### Configuring Merge Tools / Cấu hình Merge Tools

```bash
# Configure VS Code as merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.vscode.trustExitCode true

# Configure VS Code as diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'

# Configure KDiff3
git config --global merge.tool kdiff3
git config --global mergetool.kdiff3.path "/path/to/kdiff3"

# Configure Meld
git config --global merge.tool meld
git config --global mergetool.meld.path "/path/to/meld"

# Configure Beyond Compare
git config --global merge.tool bc
git config --global mergetool.bc.path "/path/to/bcomp.exe"
```

### Using Merge Tools / Sử dụng Merge Tools

```bash
# Use configured merge tool
git mergetool

# Use specific merge tool
git mergetool --tool vscode

# Use diff tool
git difftool

# Use specific diff tool
git difftool --tool vscode
```

### Git Configuration for VS Code / Cấu hình Git cho VS Code

```bash
# Complete VS Code configuration
git config --global core.editor "code --wait"
git config --global diff.tool vscode
git config --global diff.tool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.vscode.trustExitCode true

# Test merge tool
git mergetool
```

### Ví dụ thực tế / Practical Example

```bash
# Configure VS Code as merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.vscode.trustExitCode true

# Create conflict
git checkout -b feature
echo "Feature change" > file.txt
git add file.txt
git commit -m "Feature change"

git checkout main
echo "Main change" > file.txt
git add file.txt
git commit -m "Main change"

# Merge (conflict occurs)
git merge feature

# Use VS Code to resolve conflict
git mergetool

# VS Code opens with:
# - LOCAL: main branch version
# - REMOTE: feature branch version
# - BASE: common ancestor
# - MERGED: resolved version

# After resolving, stage and commit
git add file.txt
git commit -m "Resolve merge conflict"
```

### Common Pitfalls / Lỗi thường gặp

- **Wrong path configuration**: Sai path configuration
- **Not testing tool**: Không test merge tool
- **Ignoring exit codes**: Bỏ qua exit codes

### Best Practices / Thực hành tốt nhất

- Test merge tool configuration
- Use tool bạn comfortable với
- Configure both diff và merge tools
- Understand tool's exit codes

---

## 📚 Tài liệu tham khảo / References

- [Git Official Documentation - git-config](https://git-scm.com/docs/git-config)
- [Git Configuration Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)
- [Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)
- [Line Endings](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_core_autocrlf)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
