# Git Interview Questions / Câu hỏi Phỏng vấn Git

## Tổng quan / Overview

Topic này chứa toàn bộ tài liệu phỏng vấn về **Git** - hệ thống quản lý phiên bản phân tán (Distributed Version Control System) phổ biến nhất hiện nay. Nội dung bao gồm Git cơ bản, Git nâng cao và Git trong thực tế (best practices, CI/CD integration).

## Cấu trúc thư mục / Directory Structure

```
git/
├── README.md
├── plan.md
├── questions.md
└── answers/
    ├── 01-git-fundamentals.md
    ├── 02-git-installation-setup.md
    ├── 03-git-configuration.md
    ├── 04-git-repository.md
    ├── 05-git-staging-area.md
    ├── 06-git-commit.md
    ├── 07-git-diff.md
    ├── 08-git-log.md
    ├── 09-git-undo-changes.md
    ├── 10-git-branching-basics.md
    ├── 11-git-branching-advanced.md
    ├── 12-git-merge.md
    ├── 13-git-rebase.md
    ├── 14-git-merge-vs-rebase.md
    ├── 15-git-remote-repositories.md
    ├── 16-git-fetch-pull.md
    ├── 17-git-push.md
    ├── 18-git-remote-branches.md
    ├── 19-git-stash.md
    ├── 20-git-tag.md
    ├── 21-git-ignore.md
    ├── 22-git-workflows.md
    ├── 23-git-conflict-resolution.md
    ├── 24-git-bisect.md
    ├── 25-git-blame.md
    ├── 26-git-reflog.md
    ├── 27-git-clean.md
    ├── 28-git-submodules.md
    ├── 29-git-hooks.md
    ├── 30-git-lfs.md
    ├── 31-git-best-practices.md
    ├── 32-git-commit-message.md
    ├── 33-git-security.md
    ├── 34-git-performance.md
    ├── 35-git-troubleshooting.md
    ├── 36-git-github.md
    ├── 37-git-gitlab.md
    ├── 38-git-cicd-integration.md
    ├── 39-git-team-collaboration.md
    ├── 40-git-code-review.md
    ├── 41-git-advanced-commands.md
    ├── 42-git-internals.md
    ├── 43-git-alternatives.md
    ├── 44-git-history-visualization.md
    ├── 45-git-patching.md
    ├── 46-git-worktree.md
    ├── 47-git-sparse-checkout.md
    ├── 48-git-partial-clone.md
    ├── 49-git-maintenance.md
    └── 50-git-tips-tricks.md
```

## 📚 Phần 1: Git Cơ bản / Git Basics (10 files)

Các khái niệm và lệnh cơ bản của Git cần biết cho mọi developer:

| File                                                                   | Chủ đề                   | Link                                             |
| ---------------------------------------------------------------------- | ------------------------ | ------------------------------------------------ |
| [`01-git-fundamentals.md`](answers/01-git-fundamentals.md)             | Git Fundamentals         | Git là gì, lịch sử, cách Git hoạt động           |
| [`02-git-installation-setup.md`](answers/02-git-installation-setup.md) | Git Installation & Setup | Cài đặt Git trên các OS, cấu hình ban đầu        |
| [`03-git-configuration.md`](answers/03-git-configuration.md)           | Git Configuration        | Git config, user.name, user.email, aliases       |
| [`04-git-repository.md`](answers/04-git-repository.md)                 | Git Repository           | Khởi tạo repository, clone, .git directory       |
| [`05-git-staging-area.md`](answers/05-git-staging-area.md)             | Git Staging Area         | Staging area, git add, working directory         |
| [`06-git-commit.md`](answers/06-git-commit.md)                         | Git Commit               | Git commit, commit message, amend                |
| [`07-git-diff.md`](answers/07-git-diff.md)                             | Git Diff                 | git diff, git diff --staged, git diff HEAD       |
| [`08-git-log.md`](answers/08-git-log.md)                               | Git Log                  | git log, git log --oneline, git log --graph      |
| [`09-git-undo-changes.md`](answers/09-git-undo-changes.md)             | Git Undo Changes         | git reset, git checkout, git revert, git restore |
| [`10-git-branching-basics.md`](answers/10-git-branching-basics.md)     | Git Branching Basics     | Git branch, git checkout, git switch             |

## 🚀 Phần 2: Git Nâng cao / Git Advanced (15 files)

Các tính năng nâng cao của Git cho workflows phức tạp:

| File                                                                     | Chủ đề                  | Link                                                   |
| ------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------ |
| [`11-git-branching-advanced.md`](answers/11-git-branching-advanced.md)   | Git Branching Advanced  | Detached HEAD, tracking branches, force delete         |
| [`12-git-merge.md`](answers/12-git-merge.md)                             | Git Merge               | Fast-forward, 3-way merge, merge conflicts             |
| [`13-git-rebase.md`](answers/13-git-rebase.md)                           | Git Rebase              | Interactive rebase, rebase conflicts                   |
| [`14-git-merge-vs-rebase.md`](answers/14-git-merge-vs-rebase.md)         | Git Merge vs Rebase     | So sánh merge và rebase, khi nào dùng                  |
| [`15-git-remote-repositories.md`](answers/15-git-remote-repositories.md) | Git Remote Repositories | Git remote, git remote add, git remote -v              |
| [`16-git-fetch-pull.md`](answers/16-git-fetch-pull.md)                   | Git Fetch & Pull        | git fetch, git pull, git pull --rebase                 |
| [`17-git-push.md`](answers/17-git-push.md)                               | Git Push                | git push, git push -u, git push -f, git push --tags    |
| [`18-git-remote-branches.md`](answers/18-git-remote-branches.md)         | Git Remote Branches     | Tracking branches, upstream, git branch --set-upstream |
| [`19-git-stash.md`](answers/19-git-stash.md)                             | Git Stash               | git stash, git stash pop, git stash list               |
| [`20-git-tag.md`](answers/20-git-tag.md)                                 | Git Tag                 | Annotated tags, lightweight tags, git push --tags      |
| [`21-git-ignore.md`](answers/21-git-ignore.md)                           | Git Ignore              | .gitignore, git ignore, git check-ignore               |
| [`22-git-workflows.md`](answers/22-git-workflows.md)                     | Git Workflows           | Git Flow, GitHub Flow, Trunk-based development         |
| [`23-git-conflict-resolution.md`](answers/23-git-conflict-resolution.md) | Git Conflict Resolution | Xử lý conflict, merge tools, conflict markers          |
| [`24-git-bisect.md`](answers/24-git-bisect.md)                           | Git Bisect              | Binary search for bugs                                 |
| [`25-git-blame.md`](answers/25-git-blame.md)                             | Git Blame               | git blame, tìm ai đã thay đổi code                     |

## 🔥 Phần 3: Git Nâng cao hơn / Git More Advanced (10 files)

Các tính năng chuyên sâu và công cụ quản lý repository:

| File                                                             | Chủ đề              | Link                                           |
| ---------------------------------------------------------------- | ------------------- | ---------------------------------------------- |
| [`26-git-reflog.md`](answers/26-git-reflog.md)                   | Git Reflog          | Khôi phục commits đã xóa, HEAD@{n}             |
| [`27-git-clean.md`](answers/27-git-clean.md)                     | Git Clean           | Xóa untracked files                            |
| [`28-git-submodules.md`](answers/28-git-submodules.md)           | Git Submodules      | Quản lý dependencies                           |
| [`29-git-hooks.md`](answers/29-git-hooks.md)                     | Git Hooks           | pre-commit, post-commit, client/server hooks   |
| [`30-git-lfs.md`](answers/30-git-lfs.md)                         | Git LFS             | Git Large File Storage, quản lý large files    |
| [`31-git-best-practices.md`](answers/31-git-best-practices.md)   | Git Best Practices  | Best practices, conventions, guidelines        |
| [`32-git-commit-message.md`](answers/32-git-commit-message.md)   | Git Commit Message  | Conventional Commits, commit message format    |
| [`33-git-security.md`](answers/33-git-security.md)               | Git Security        | Signing commits, secrets management            |
| [`34-git-performance.md`](answers/34-git-performance.md)         | Git Performance     | Performance optimization, shallow clone        |
| [`35-git-troubleshooting.md`](answers/35-git-troubleshooting.md) | Git Troubleshooting | Common issues, solutions, debugging techniques |

## 🏢 Phần 4: Git trong Thực tế / Git in Practice (15 files)

Git trong môi trường thực tế, team collaboration và CI/CD:

| File                                                                         | Chủ đề                    | Link                                                   |
| ---------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------ |
| [`36-git-github.md`](answers/36-git-github.md)                               | Git & GitHub              | GitHub features, PR, Issues, Actions, GitHub CLI       |
| [`37-git-gitlab.md`](answers/37-git-gitlab.md)                               | Git & GitLab              | GitLab features, MR, CI/CD, GitLab CI                  |
| [`38-git-cicd-integration.md`](answers/38-git-cicd-integration.md)           | Git CI/CD Integration     | Git trong CI/CD pipelines, automated deployments       |
| [`39-git-team-collaboration.md`](answers/39-git-team-collaboration.md)       | Git Team Collaboration    | Collaboration patterns, code ownership, review process |
| [`40-git-code-review.md`](answers/40-git-code-review.md)                     | Git Code Review           | Code review process, PR review, review checklist       |
| [`41-git-advanced-commands.md`](answers/41-git-advanced-commands.md)         | Git Advanced Commands     | git cherry-pick, git filter-branch, git subtree        |
| [`42-git-internals.md`](answers/42-git-internals.md)                         | Git Internals             | Git objects, blobs, trees, commits, refs, pack files   |
| [`43-git-alternatives.md`](answers/43-git-alternatives.md)                   | Git Alternatives          | Mercurial, SVN, Perforce, so sánh với Git              |
| [`44-git-history-visualization.md`](answers/44-git-history-visualization.md) | Git History Visualization | git log --graph, gitk, GUI tools                       |
| [`45-git-patching.md`](answers/45-git-patching.md)                           | Git Patching              | git format-patch, git am, git apply, patch files       |
| [`46-git-worktree.md`](answers/46-git-worktree.md)                           | Git Worktree              | Work multiple branches simultaneously                  |
| [`47-git-sparse-checkout.md`](answers/47-git-sparse-checkout.md)             | Git Sparse Checkout       | Partial repository checkout                            |
| [`48-git-partial-clone.md`](answers/48-git-partial-clone.md)                 | Git Partial Clone         | Blobless, treeless clones                              |
| [`49-git-maintenance.md`](answers/49-git-maintenance.md)                     | Git Maintenance           | git gc, git prune, repository health                   |
| [`50-git-tips-tricks.md`](answers/50-git-tips-tricks.md)                     | Git Tips & Tricks         | Tips, tricks, shortcuts, productivity hacks            |

## 📊 Thống kê / Statistics

| Phần / Part                      | Số lượng files / Number of Files | Số lượng câu hỏi / Number of Questions |
| -------------------------------- | -------------------------------- | -------------------------------------- |
| Git Cơ bản / Git Basics          | 10                               | ~10                                    |
| Git Nâng cao / Git Advanced      | 15                               | ~15                                    |
| Git Nâng cao hơn / More Advanced | 10                               | ~10                                    |
| Git trong Thực tế / In Practice  | 15                               | ~15                                    |
| **Tổng cộng / Total**            | **50**                           | **~50**                                |

## 🎯 Mục tiêu học tập / Learning Objectives

Sau khi hoàn thành topic này, bạn sẽ:

- ✅ Hiểu rõ cách Git hoạt động và các khái niệm cơ bản
- ✅ Sử dụng thành thạo các lệnh Git cơ bản và nâng cao
- ✅ Làm việc với branching, merging, và rebase hiệu quả
- ✅ Quản lý remote repositories và collaboration
- ✅ Xử lý conflicts và troubleshooting các vấn đề thường gặp
- ✅ Áp dụng best practices và workflows trong team
- ✅ Tích hợp Git với CI/CD pipelines
- ✅ Sử dụng Git trong môi trường thực tế (GitHub, GitLab)
- ✅ Tối ưu hóa performance và maintenance của repository

## 📖 Cách sử dụng / How to Use

### Đối với người mới bắt đầu / For Beginners

1. Bắt đầu với **Phần 1: Git Cơ bản** (files 01-10)
2. Thực hành từng lệnh trên repository thực tế
3. Đọc [`questions.md`](questions.md) để xem danh sách câu hỏi
4. Tham khảo các file answers để hiểu chi tiết

### Đối với người có kinh nghiệm / For Experienced Developers

1. Review **Phần 2: Git Nâng cao** (files 11-25)
2. Tìm hiểu **Phần 3: Git Nâng cao hơn** (files 26-35)
3. Áp dụng **Phần 4: Git trong Thực tế** (files 36-50) vào dự án thực tế
4. Tập trung vào workflows, best practices và team collaboration

### Đối với phỏng vấn / For Interview Preparation

1. Đọc [`questions.md`](questions.md) để xem tất cả câu hỏi
2. Tham khảo các file answers để hiểu sâu hơn
3. Thực hành các lệnh và scenarios
4. Chuẩn bị câu trả lời cho các câu hỏi phổ biến

## 🔗 Tài liệu tham khảo / References

- [Git Official Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Git Guide](https://guides.github.com/introduction/git-handbook/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Git Flight Rules](https://github.com/k88hudson/git-flight-rules)

## 📝 Ghi chú / Notes

- Mọi nội dung đều có cả tiếng Việt và tiếng Anh (bilingual)
- Code examples được cung cấp trong code blocks
- Sử dụng emoji để dễ dàng phân loại các section
- Tuân thủ format của các topic hiện có trong interview-viewer

## 🤝 Đóng góp / Contributing

Nếu bạn muốn đóng góp thêm nội dung hoặc cải thiện topic này, vui lòng:

1. Đảm bảo tuân thủ format hiện tại
2. Cung cấp cả tiếng Việt và tiếng Anh
3. Thêm code examples thực tế
4. Cập nhật file [`plan.md`](plan.md) và [`README.md`](README.md) khi cần

---

**Topic được tạo theo format của interview-viewer / Topic created following interview-viewer format**
