# 2. Git Installation & Setup / Cài đặt và Cấu hình Git

## Tổng quan về Git Installation & Setup / Git Installation & Setup Overview

### Mục đích / Purpose

**Git Installation & Setup** covers the process of installing Git on different operating systems and setting it up for first use. Understanding this helps you:

- Install Git on your development machine
- Configure Git for first-time use
- Choose appropriate Git clients
- Verify installation

**Mục đích chính:**

- Install Git on Windows, macOS, Linux
- Choose between command line and GUI clients
- Verify Git installation
- Perform first-time setup

### Khi nào cần hiểu về Git Installation & Setup / When to Use

Hiểu về Git installation là cần thiết khi:

- Setting up a new development machine
- Installing Git for the first time
- Upgrading Git to latest version
- Setting up Git for team members

### Giúp ích gì / Benefits

**Lợi ích:**

- **Foundation**: Cơ sở cần thiết để sử dụng Git
- **Correct Setup**: Đảm bảo Git được cài đặt đúng
- **Version Control**: Sử dụng version control hiệu quả
- **Team Readiness**: Chuẩn bị cho collaboration

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                      | Nhược điểm (Cons)                                 |
| ----------------------------------- | ------------------------------------------------- |
| Cross-platform - chạy trên nhiều OS | Different install methods - khác nhau trên mỗi OS |
| Free - miễn phí                     | Requires configuration - cần cấu hình             |
| - GUI clients available - có GUI    | Command line required - cần command line          |

---

## Cách cài đặt Git trên Windows, macOS, Linux? / How to install Git on Windows, macOS, Linux?

### Mục đích / Purpose

Hiểu cách cài Git trên các OS khác nhau giúp bạn:

- Install Git trên bất kỳ OS nào
- Troubleshoot installation issues
- Choose appropriate installation method

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi setup new development machine
- Khi troubleshooting installation

### Giúp ích gì / Benefits

- **Versatility**: Sử dụng Git trên bất kỳ OS
- **Troubleshooting**: Fix installation issues
- **Best Practices**: Chọn đúng installation method

### Installation Methods / Các phương pháp cài đặt

#### Windows

```bash
# Method 1: Git for Windows installer (Recommended)
# Download: https://git-scm.com/download/win
# Run installer with default settings

# Method 2: Using package manager (Chocolatey)
choco install git

# Method 3: Using package manager (Scoop)
scoop install git

# Method 4: Using winget
winget install --id Git.Git -e --source winget
```

#### macOS

```bash
# Method 1: Using Homebrew (Recommended)
brew install git

# Method 2: Using MacPorts
sudo port install git

# Method 3: Using Xcode Command Line Tools
xcode-select --install

# Method 4: Download installer
# Download: https://git-scm.com/download/mac
```

#### Linux

```bash
# Debian/Ubuntu
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git

# CentOS/RHEL
sudo yum install git

# Arch Linux
sudo pacman -S git

# Verify installation
git --version
```

### Common Pitfalls / Lỗi thường gặp

- **Not adding to PATH**: Git không được thêm vào PATH
- **Wrong installer**: Chọn sai installer cho OS
- **Not verifying**: Không verify sau khi cài đặt

### Best Practices / Thực hành tốt nhất

- Use official Git installer
- Add Git to PATH
- Verify installation
- Keep Git updated

---

## Các Git GUI clients phổ biến là gì? / What are popular Git GUI clients?

### Mục đích / Purpose

Hiểu các Git GUI clients giúp bạn:

- Choose appropriate Git client
- Understand pros và cons của GUI vs CLI
- Select tool phù hợp với workflow

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git tools
- Khi choosing Git client cho team
- Khi recommending tools cho beginners

### Gi giúp ích gì / Benefits

- **Productivity**: Tăng productivity với GUI
- **Visualization**: Visualize Git operations
- **Ease of Use**: Dễ dàng hơn cho beginners

### Popular Git GUI Clients / Các Git GUI Clients Phổ Biến

| Client / Ứng dụng  | Platform / Nền tảng   | Features / Tính chất         | Pros / Ưu điểm                 | Cons / Nhược điểm     |
| ------------------ | --------------------- | ---------------------------- | ------------------------------ | --------------------- |
| **GitHub Desktop** | Windows, macOS        | Simple, GitHub integration   | Easy to use, free              | Limited features      |
| **GitKraken**      | Windows, macOS, Linux | Powerful, intuitive          | Great UI, cross-platform       | Paid (with free tier) |
| **SourceTree**     | Windows, macOS        | Powerful, visual             | Good for complex repos         | Resource-heavy        |
| **Sourcetree**     | Windows, macOS        | Free, Atlassian integration  | Good UI                        | Can be slow           |
| **Git Extensions** | Windows               | Windows Explorer integration | Free, integrates with Explorer | Windows only          |
| **TortoiseGit**    | Windows               | Shell integration            | Free, easy to use              | Windows only          |
| **Fork**           | macOS                 | Fast, GitHub integration     | Beautiful UI                   | macOS only            |
| **SmartGit**       | Windows, macOS, Linux | Professional features        | Powerful, customizable         | Paid                  |
| **Git Cola**       | Windows, macOS, Linux | Simple, cross-platform       | Free, open source              | Basic features        |

### GUI vs CLI / So sánh GUI và CLI

| Aspect / Khía cạnh | GUI / Giao diện đồ họa    | CLI / Command line       |
| ------------------ | ------------------------- | ------------------------ |
| **Learning Curve** | Easier cho beginners      | Steeper learning curve   |
| **Speed**          | Slower cho advanced users | Faster cho experts       |
| **Visualization**  | Better visualization      | Limited visualization    |
| **Automation**     | Limited                   | Excellent cho automation |
| **Flexibility**    | Limited operations        | Full Git capabilities    |
| **Scripting**      | Difficult                 | Easy                     |

### Ví dụ thực tế / Practical Example

```bash
# Using CLI (Command Line Interface)
git clone https://github.com/user/repo.git
cd repo
git checkout -b feature
echo "New feature" > file.txt
git add file.txt
git commit -m "Add feature"
git push -u origin feature

# Using GitHub Desktop (GUI)
# 1. Click "Clone a repository"
# 2. Enter repository URL
# 3. Click "Clone"
# 4. Click "Current branch" → "New branch"
# 5. Enter branch name → "Create branch"
# 6. Make changes in editor
# 7. Click "Commit" → Enter message → "Commit"
# 8. Click "Publish branch"
```

### Common Pitfalls / Lỗi thường gặp

- **Over-reliance on GUI**: Quá phụ thuộc vào GUI
- **Not learning CLI**: Không học CLI
- **Choosing wrong tool**: Chọn tool không phù hợp

### Best Practices / Thực hành tốt nhất

- Learn both GUI and CLI
- Use GUI cho visualization
- Use CLI cho automation
- Choose tool phù hợp với workflow

---

## Làm sao để kiểm tra Git đã được cài đặt đúng cách? / How to verify Git installation?

### Mục đích / Purpose

Hiểu cách verify Git installation giúp bạn:

- Đảm bảo Git được cài đặt đúng
- Troubleshoot installation issues
- Check Git version

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi troubleshooting installation
- Khi setting up new machine

### Gi giúp ích gì / Benefits

- **Verification**: Đảm bảo installation thành công
- **Troubleshooting**: Fix installation issues
- **Version Check**: Kiểm tra Git version

### Verification Steps / Các bước kiểm tra

#### 1. Check Git Version

```bash
# Check Git version
git --version

# Output example:
# git version 2.39.0.windows.1
```

#### 2. Check Git Location

```bash
# Windows
where git

# macOS/Linux
which git

# Output example:
# /usr/bin/git
```

#### 3. Check Git Configuration

```bash
# List all Git configuration
git config --list

# Check global configuration
git config --global --list

# Check user configuration
git config user.name
git config user.email
```

#### 4. Test Git Commands

```bash
# Test basic Git command
git --help

# Initialize test repository
mkdir test-git
cd test-git
git init
git status

# Clean up
cd ..
rm -rf test-git
```

### Common Issues / Các vấn đề thường gặp

| Issue / Vấn đề               | Solution / Giải pháp              |
| ---------------------------- | --------------------------------- |
| **"git: command not found"** | Git not in PATH - add Git to PATH |
| **"git is not recognized"**  | Git not installed or not in PATH  |
| **Permission denied**        | Run with appropriate permissions  |
| **Wrong version**            | Update Git to latest version      |

### Ví dụ thực tế / Practical Example

```bash
# Complete verification process
# Step 1: Check version
git --version
# Output: git version 2.39.0

# Step 2: Check location
which git
# Output: /usr/bin/git

# Step 3: Check configuration
git config --global user.name
# Output: Your Name

git config --global user.email
# Output: your.email@example.com

# Step 4: Test Git
mkdir test-repo
cd test-repo
git init
# Output: Initialized empty Git repository

git status
# Output: On branch main, nothing to commit

# Step 5: Clean up
cd ..
rm -rf test-repo
```

### Common Pitfalls / Lỗi thường gặp

- **Not verifying installation**: Không verify sau khi cài
- **Ignoring PATH issues**: Bỏ qua PATH issues
- **Not checking configuration**: Không check configuration

### Best Practices / Thực hành tốt nhất

- Always verify installation
- Check Git version
- Verify PATH configuration
- Test basic Git commands

---

## Git version check như thế nào? / How to check Git version?

### Mục đích / Purpose

Hiểu cách check Git version giúp bạn:

- Verify installation
- Check if Git is up to date
- Troubleshoot version-specific issues

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi troubleshooting issues
- Khi checking for updates

### Gi giúp ích gì / Benefits

- **Verification**: Verify Git installation
- **Updates**: Check for updates
- **Troubleshooting**: Debug version-specific issues

### Check Git Version / Kiểm tra Git Version

```bash
# Check Git version
git --version

# Alternative command
git -v

# Output example:
# git version 2.39.0.windows.1
```

### Version Format / Format Version

Git version follows semantic versioning: `MAJOR.MINOR.PATCH`

| Component / Thành phần | Example / Ví dụ | Meaning / Ý nghĩa     |
| ---------------------- | --------------- | --------------------- |
| **MAJOR**              | 2               | Major version changes |
| **MINOR**              | 39              | Minor features added  |
| **PATCH**              | 0               | Bug fixes             |

### Check for Updates / Kiểm tra Updates

```bash
# Check for updates (macOS with Homebrew)
brew upgrade git

# Check for updates (Windows with Chocolatey)
choco upgrade git

# Check for updates (Linux)
sudo apt update && sudo apt upgrade git

# Download latest version
# Visit: https://git-scm.com/downloads
```

### Common Pitfalls / Lỗi thường gặp

- **Not checking version**: Không check version
- **Using outdated version**: Dùng version cũ
- **Version incompatibility**: Version không compatible

### Best Practices / Thực hành tốt nhất

- Check Git version regularly
- Keep Git updated
- Note version-specific features
- Document version in project

---

## Các bước first-time setup cho Git là gì? / What are first-time setup steps for Git?

### Mục đích / Purpose

Hiểu first-time setup giúp bạn:

- Configure Git correctly
- Set up user identity
- Configure default settings

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về Git basics
- Khi setting up Git lần đầu
- Khi onboarding new developers

### Gi giúp ích gì / Benefits

- **Correct Configuration**: Đảm bảo Git được cấu hình đúng
- **User Identity**: Set up user identity cho commits
- **Default Settings**: Configure appropriate defaults

### First-Time Setup Steps / Các Bước First-Time Setup

#### 1. Set User Identity

```bash
# Set user name
git config --global user.name "Your Name"

# Set user email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global user.name
git config --global user.email
```

#### 2. Set Default Branch Name

```bash
# Set default branch name to main
git config --global init.defaultBranch main

# Verify configuration
git config --global init.defaultBranch
```

#### 3. Configure Line Endings

```bash
# Windows (convert to CRLF on checkout, LF on commit)
git config --global core.autocrlf true

# macOS/Linux (keep LF)
git config --global core.autocrlf input

# Verify configuration
git config --global core.autocrlf
```

#### 4. Set Default Editor

```bash
# Set default editor to VS Code
git config --global core.editor "code --wait"

# Set default editor to Vim
git config --global core.editor "vim"

# Set default editor to Nano
git config --global core.editor "nano"

# Verify configuration
git config --global core.editor
```

#### 5. Configure Push Behavior

```bash
# Set push to push current branch
git config --global push.default simple

# Verify configuration
git config --global push.default
```

#### 6. Set Aliases (Optional)

```bash
# Set common aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Verify aliases
git config --global --get-regexp alias
```

#### 7. Configure Colors (Optional)

```bash
# Enable colored output
git config --global color.ui auto

# Configure specific colors
git config --global color.diff.meta "yellow bold"
git config --global color.diff.frag "magenta bold"
git config --global color.diff.old "red bold"
git config --global color.diff.new "green bold"

# Verify configuration
git config --global color.ui
```

### Complete Setup Script / Script Setup Hoàn Chỉnh

```bash
#!/bin/bash
# Git First-Time Setup Script

# Set user identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch
git config --global init.defaultBranch main

# Configure line endings
if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "linux-gnu"* ]]; then
    git config --global core.autocrlf input
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    git config --global core.autocrlf true
fi

# Set default editor
git config --global core.editor "code --wait"

# Set push behavior
git config --global push.default simple

# Enable colors
git config --global color.ui auto

# Set aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Display configuration
echo "Git configuration:"
git config --global --list
```

### Common Pitfalls / Lỗi thường gặp

- **Not setting user identity**: Không set user name/email
- **Wrong line ending settings**: Sai cấu hình line endings
- **Not configuring editor**: Không cấu hình editor

### Best Practices / Thực hành tốt nhất

- Always set user identity
- Configure line endings correctly
- Set default editor
- Use aliases for common commands
- Verify configuration

---

## 📚 Tài liệu tham khảo / References

- [Git Official Documentation - Getting Started](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Git for Windows](https://git-scm.com/download/win)
- [GitHub Desktop](https://desktop.github.com/)
- [GitKraken](https://www.gitkraken.com/)
- [SourceTree](https://www.sourcetreeapp.com/)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
