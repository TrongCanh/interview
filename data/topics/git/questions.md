# Git Interview Questions / Câu hỏi Phỏng vấn Git

> Danh sách câu hỏi phỏng vấn về Git / List of Git interview questions

---

## 📚 Phần 1: Git Cơ bản / Git Basics

### 1. Git Fundamentals / Git Cơ bản

- Git là gì? Tại sao Git lại trở nên phổ biến?
- Lịch sử phát triển của Git là gì?
- Sự khác biệt giữa Git và các VCS khác (SVN, Mercurial)?
- Distributed VCS vs Centralized VCS - khác nhau như thế nào?
- Git workflow cơ bản hoạt động như thế nào?
- Git object model là gì?
- Git có ba trạng thái nào? Giải thích working directory, staging area, và repository.

### 2. Git Installation & Setup / Cài đặt và Cấu hình Git

- Cách cài đặt Git trên Windows, macOS, Linux?
- Các Git GUI clients phổ biến là gì?
- Làm sao để kiểm tra Git đã được cài đặt đúng cách?
- Git version check như thế nào?
- Các bước first-time setup cho Git là gì?

### 3. Git Configuration / Cấu hình Git

- `git config --global`, `--local`, `--system` khác nhau như thế nào?
- `user.name` và `user.email` dùng để làm gì?
- Cách xem tất cả cấu hình Git hiện tại?
- Git aliases là gì? Cách tạo và sử dụng?
- Default branch name là gì? Cách thay đổi?
- `core.autocrlf` là gì? Khi nào cần cấu hình?
- Cách cấu hình merge tools trong Git?

### 4. Git Repository / Git Repository

- `git init` là gì? Khi nào nên dùng?
- `git clone` là gì? Sự khác biệt giữa các clone options?
- Cấu trúc thư mục `.git` là gì?
- File `HEAD` trong Git là gì?
- `refs/heads/`, `refs/tags/`, `refs/remotes/` là gì?
- Bare repository vs non-bare repository khác nhau như thế nào?
- Khi nào nên dùng bare repository?

### 5. Git Staging Area / Git Staging Area

- Git staging area (index) là gì?
- `git add file` khác `git add .` như thế nào?
- `git add -A` làm gì?
- `git add -p` (patch mode) là gì? Khi nào nên dùng?
- `git restore --staged` khác `git reset HEAD` như thế nào?
- Sự khác biệt giữa staged và unstaged changes là gì?

### 6. Git Commit / Git Commit

- `git commit` là gì? Quy trình commit diễn ra như thế nào?
- `git commit -m` khác `git commit -am` như thế nào?
- `git commit --amend` là gì? Khi nào nên dùng?
- Best practices cho commit message là gì?
- Empty commit là gì? Khi nào cần tạo?
- `--no-verify` flag làm gì?
- Commit signing là gì? Cách thực hiện?

### 7. Git Diff / Git Diff

- `git diff` hiển thị gì?
- Sự khác biệt giữa `git diff`, `git diff --staged`, và `git diff HEAD`?
- `git diff --stat` làm gì?
- `git diff --color-words` hữu ích khi nào?
- Cách diff giữa hai branches?
- Cách diff giữa hai files?

### 8. Git Log / Git Log

- `git log` hiển thị gì?
- `git log --oneline` khác `git log` như thế nào?
- `git log --graph` làm gì?
- `git log --all`, `--decorate` là gì?
- Cách giới hạn số lượng commits hiển thị?
- `--since`, `--until`, `--author`, `--grep` làm gì?
- `git log -p` hiển thị gì?

### 9. Git Undo Changes / Hoàn tác thay đổi trong Git

- `git restore file` làm gì?
- `git restore --staged file` khác `git restore file` như thế nào?
- `git reset --soft`, `--mixed`, `--hard` khác nhau như thế nào?
- `git revert` khác `git reset` như thế nào?
- Khi nào nên dùng revert thay vì reset?
- Làm sao để discard uncommitted changes?

### 10. Git Branching Basics / Git Branching Cơ bản

- Git branch là gì? Tại sao cần branching?
- `git branch` làm gì?
- `git checkout branchname` khác `git switch branchname` như thế nào?
- `git checkout -b branchname` khác `git switch -c branchname` như thế nào?
- `git branch -d branchname` khác `git branch -D branchname` như thế nào?
- Detached HEAD state là gì?

---

## 🚀 Phần 2: Git Nâng cao / Git Advanced

### 11. Git Branching Advanced / Git Branching Nâng cao

- Detached HEAD state là gì? Khi nào xảy ra?
- `git branch -D` (force delete) khi nào nên dùng?
- `git branch -m` (rename) làm gì?
- `git branch --merged` và `git branch --no-merged` hiển thị gì?
- Tracking branches là gì?
- `git branch --set-upstream-to` làm gì?
- `git branch -u` là gì?

### 12. Git Merge / Git Merge

- `git merge branchname` làm gì?
- Fast-forward merge là gì? Khi nào xảy ra?
- 3-way merge là gì?
- Merge commit là gì?
- `git merge --no-ff` làm gì?
- `git merge --squash` khác merge thường như thế nào?
- Merge conflicts là gì? Cách xử lý?

### 13. Git Rebase / Git Rebase

- `git rebase branchname` làm gì?
- Interactive rebase (`git rebase -i`) là gì?
- Rebase khác merge như thế nào?
- `git rebase --onto` làm gì?
- Rebase conflicts khác merge conflicts như thế nào?
- `git rebase --continue`, `--abort`, `--skip` làm gì?
- Rebase best practices là gì?

### 14. Git Merge vs Rebase / So sánh Merge và Rebase

- So sánh merge và rebase - ưu nhược điểm của từng cách?
- Khi nào nên dùng merge?
- Khi nào nên dùng rebase?
- Impact trên commit history của merge và rebase?
- Team considerations khi chọn giữa merge và rebase?
- Golden rule of rebase là gì?

### 15. Git Remote Repositories / Git Remote Repositories

- `git remote` làm gì?
- `git remote -v` hiển thị gì?
- `git remote add origin URL` làm gì?
- `git remote remove origin` làm gì?
- `git remote rename old new` làm gì?
- `git remote set-url origin URL` làm gì?
- Git protocols (HTTPS, SSH, Git) khác nhau như thế nào?

### 16. Git Fetch & Pull / Git Fetch và Pull

- `git fetch` làm gì?
- `git fetch origin` khác `git fetch` như thế nào?
- `git fetch --all` làm gì?
- `git pull` làm gì?
- `git pull --rebase` khác `git pull` như thế nào?
- Sự khác biệt giữa fetch và pull?
- `git pull origin branchname` làm gì?

### 17. Git Push / Git Push

- `git push` làm gì?
- `git push -u origin branchname` làm gì?
- `git push origin branchname` khác `git push` như thế nào?
- `git push --all` làm gì?
- `git push --tags` làm gì?
- `git push -f` (force push) là gì? Tại sao nguy hiểm?
- `git push --force-with-lease` khác `git push -f` như thế nào?

### 18. Git Remote Branches / Git Remote Branches

- Tracking branches là gì?
- Upstream branches là gì?
- `git branch -vv` hiển thị gì?
- `git branch --set-upstream-to` làm gì?
- `git push -u` làm gì?
- `git branch -r` hiển thị gì?
- `git checkout -b local origin/remote` làm gì?

### 19. Git Stash / Git Stash

- `git stash` làm gì?
- `git stash save "message"` khác `git stash` như thế nào?
- `git stash list` hiển thị gì?
- `git stash pop` khác `git stash apply` như thế nào?
- `git stash drop` làm gì?
- `git stash clear` làm gì?
- `git stash branch` làm gì?
- Cách stash untracked files?

### 20. Git Tag / Git Tag

- Git tags là gì? Khi nào nên dùng?
- Lightweight tags khác annotated tags như thế nào?
- `git tag tagname` làm gì?
- `git tag -a tagname -m "message"` làm gì?
- `git tag -l` làm gì?
- `git show tagname` hiển thị gì?
- `git push origin tagname` làm gì?
- `git push --tags` làm gì?
- Cách xóa tags?

### 21. Git Ignore / Git Ignore

- `.gitignore` file là gì?
- Các patterns trong `.gitignore` hoạt động như thế nào?
- `git ignore file` làm gì?
- `git check-ignore` làm gì?
- `git check-ignore -v` hiển thị gì?
- `.gitignore` precedence là gì?
- Cách ignore tracked files?
- Global `.gitignore` là gì?

### 22. Git Workflows / Git Workflows

- Centralized Workflow là gì?
- Feature Branch Workflow là gì?
- Gitflow Workflow là gì?
- Forking Workflow là gì?
- GitHub Flow là gì?
- Trunk-based Development là gì?
- Làm sao để chọn workflow phù hợp?

### 23. Git Conflict Resolution / Xử lý Conflict trong Git

- Merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) là gì?
- `git status` hiển thị gì khi có conflict?
- Cách resolve conflicts manually?
- `git mergetool` làm gì?
- `git merge --continue` làm gì?
- `git merge --abort` làm gì?
- Best practices để tránh conflicts?

### 24. Git Bisect / Git Bisect

- `git bisect` là gì?
- `git bisect start` làm gì?
- `git bisect bad` và `git bisect good` làm gì?
- `git bisect run` làm gì?
- `git bisect reset` làm gì?
- Binary search for bugs hoạt động như thế nào?
- Automated bisecting là gì?

### 25. Git Blame / Git Blame

- `git blame filename` làm gì?
- `git blame -L start,end filename` làm gì?
- `git blame -M` (detect moved lines) làm gì?
- `git blame -C` (detect copied lines) làm gì?
- Cách đọc output của git blame?
- Khi nào nên dùng git blame?

---

## 🔥 Phần 3: Git Nâng cao hơn / Git More Advanced

### 26. Git Reflog / Git Reflog

- `git reflog` là gì?
- `git reflog show HEAD` hiển thị gì?
- `HEAD@{n}` syntax là gì?
- Cách recover lost commits bằng reflog?
- `git reset --hard HEAD@{n}` làm gì?
- Reflog expiration là gì?
- `git reflog` khác `git log` như thế nào?

### 27. Git Clean / Git Clean

- `git clean -f` làm gì?
- `git clean -fd` làm gì?
- `git clean -n` (dry run) làm gì?
- `git clean -x` (remove ignored files) làm gì?
- `git clean -i` (interactive) làm gì?
- Cách remove untracked files?
- Safety considerations khi dùng git clean?

### 28. Git Submodules / Git Submodules

- Git submodules là gì? Khi nào nên dùng?
- `git submodule add URL` làm gì?
- `git submodule init` làm gì?
- `git submodule update` làm gì?
- `git submodule update --init --recursive` làm gì?
- Cách clone repository với submodules?
- Cách remove submodules?
- Submodule best practices?

### 29. Git Hooks / Git Hooks

- Git hooks là gì?
- Client-side hooks (pre-commit, commit-msg, post-commit) làm gì?
- Server-side hooks (pre-receive, update, post-receive) làm gì?
- Hooks nằm ở đâu trong repository?
- Sample hooks là gì?
- Cách viết custom hooks?
- Ví dụ về useful hooks?
- Cách bypass hooks (`--no-verify`)?

### 30. Git LFS / Git LFS

- Git LFS là gì? Tại sao cần?
- Cách install Git LFS?
- `git lfs track "*.extension"` làm gì?
- `git lfs track` hiển thị gì?
- `git lfs ls-files` làm gì?
- `git lfs pull` và `git lfs push` làm gì?
- LFS server requirements là gì?
- Khi nào nên dùng Git LFS?

### 31. Git Best Practices / Git Best Practices

- "Commit early, commit often" có nghĩa là gì?
- Best practices cho commit message?
- Tại sao nên keep commits atomic?
- Tại sao không nên commit broken code?
- Tại sao nên use branches cho features?
- Best practices cho review trước khi merge?
- Tại sao nên keep history clean?
- Tại sao nên document decisions?

### 32. Git Commit Message / Git Commit Message

- Conventional Commits specification là gì?
- Format: `type(scope): subject` hoạt động như thế nào?
- Các types: feat, fix, docs, style, refactor, test, chore khác nhau như thế nào?
- Rules cho subject line?
- Body và footer trong commit message?
- Examples của good commit messages?
- Các tools cho commit message?

### 33. Git Security / Git Security

- Signing commits với GPG là gì?
- `git commit -S` làm gì?
- `git tag -s` làm gì?
- Cách verify signatures?
- Secrets trong repositories là vấn đề gì?
- `git-secrets` tool là gì?
- `.gitignore` cho sensitive files?
- Access control trong Git?

### 34. Git Performance / Git Performance

- Shallow clone (`git clone --depth 1`) là gì?
- Partial clone (`git clone --filter`) là gì?
- Sparse checkout là gì?
- `git gc` (garbage collection) làm gì?
- `git prune` làm gì?
- Cách handle large files?
- Network optimization tips?
- Repository size management?

### 35. Git Troubleshooting / Git Troubleshooting

- Common error messages trong Git?
- "fatal: refusing to merge unrelated histories" - cách fix?
- "error: failed to push some refs" - cách fix?
- Best practices cho merge conflict resolution?
- Cách recover từ detached HEAD?
- Corrupted repository - cách fix?
- Permission issues trong Git?
- Network problems troubleshooting?

---

## 🏢 Phần 4: Git trong Thực tế / Git in Practice

### 36. Git & GitHub / Git và GitHub

- GitHub features overview là gì?
- Pull Requests (PR) là gì?
- Issues trong GitHub là gì?
- GitHub Actions là gì?
- GitHub Pages là gì?
- GitHub CLI (`gh`) là gì?
- GitHub Codespaces là gì?
- GitHub Security features?

### 37. Git & GitLab / Git và GitLab

- GitLab features overview là gì?
- Merge Requests (MR) khác Pull Requests như thế nào?
- Issues và Boards trong GitLab?
- GitLab CI/CD là gì?
- GitLab Registry là gì?
- GitLab Pages là gì?
- GitLab API?
- GitLab Security features?

### 38. Git CI/CD Integration / Git trong CI/CD

- Git hoạt động như thế nào trong CI/CD pipelines?
- Cách trigger builds trên commit?
- `git checkout` trong CI làm gì?
- Shallow clones trong CI - khi nào nên dùng?
- Cách handle Git credentials trong CI?
- Automated deployments với Git?
- Git hooks trong CI/CD?
- Version tagging trong CI/CD?

### 39. Git Team Collaboration / Git Team Collaboration

- Collaboration patterns phổ biến là gì?
- Code ownership trong Git?
- Review process best practices?
- Branch naming conventions?
- Commit conventions cho team?
- Release process với Git?
- Onboarding new team members với Git?
- Git training cho teams?

### 40. Git Code Review / Git Code Review

- Code review process là gì?
- Pull Request/Merge Request workflow?
- Review checklist là gì?
- Review comments và suggestions best practices?
- Cách address review feedback?
- Review tools và integrations?
- Review metrics?
- Best practices cho effective code review?

### 41. Git Advanced Commands / Git Advanced Commands

- `git cherry-pick` là gì?
- `git filter-branch` là gì?
- `git subtree` là gì?
- `git archive` làm gì?
- `git bundle` làm gì?
- `git format-patch` làm gì?
- `git am` làm gì?
- `git apply` làm gì?

### 42. Git Internals / Git Internals

- Git objects (blob, tree, commit, tag) là gì?
- SHA-1 hashing trong Git hoạt động như thế nào?
- `.git/objects/` directory là gì?
- refs và HEAD là gì?
- Pack files là gì?
- Index file là gì?
- Git DAG (Directed Acyclic Graph) là gì?

### 43. Git Alternatives / Git Alternatives

- Mercurial (Hg) là gì?
- Subversion (SVN) là gì?
- Perforce là gì?
- Bazaar là gì?
- So sánh Git với các VCS khác?
- Cách migrate từ other VCS sang Git?
- Khi nào nên dùng alternatives thay vì Git?

### 44. Git History Visualization / Git History Visualization

- `git log --graph` hiển thị gì?
- `gitk` là gì?
- Các Git GUI tools phổ biến?
- GitHub commit graph?
- GitLab commit graph?
- Visualization best practices?
- Cách hiểu complex histories?

### 45. Git Patching / Git Patching

- `git format-patch` làm gì?
- `git am` làm gì?
- `git apply` làm gì?
- `git diff > patch` tạo gì?
- Patch file format là gì?
- Cách apply patches?
- Cách tạo patches cho review?
- Email-based workflows?

### 46. Git Worktree / Git Worktree

- `git worktree add` làm gì?
- `git worktree list` hiển thị gì?
- `git worktree remove` làm gì?
- `git worktree prune` làm gì?
- Use cases cho worktree?
- Worktree vs branches - khác nhau như thế nào?
- Worktree best practices?

### 47. Git Sparse Checkout / Git Sparse Checkout

- `git sparse-checkout init` làm gì?
- `git sparse-checkout set` làm gì?
- `git sparse-checkout add` làm gì?
- `git sparse-checkout disable` làm gì?
- Cone mode vs non-cone mode?
- Use cases cho sparse checkout?
- Performance benefits?

### 48. Git Partial Clone / Git Partial Clone

- `git clone --filter=blob:none` làm gì?
- `git clone --filter=tree:0` làm gì?
- Partial clone concepts là gì?
- Cách fetch missing objects?
- Use cases cho partial clone?
- Limitations của partial clone?

### 49. Git Maintenance / Git Maintenance

- `git maintenance start` làm gì?
- `git maintenance run` làm gì?
- `git gc` làm gì?
- `git prune` làm gì?
- `git repack` làm gì?
- Repository health checks?
- Maintenance schedules?

### 50. Git Tips & Tricks / Git Tips & Tricks

- Useful Git aliases là gì?
- Productivity shortcuts trong Git?
- Git tricks hữu ích?
- Hidden features trong Git?
- Git configuration tips?
- Command line tips?
- GUI tips?
- Time-saving techniques?

---

## 📝 Ghi chú / Notes

- Tổng số câu hỏi: **50 câu hỏi**
- Phân chia thành 4 phần: Git Cơ bản (10), Git Nâng cao (15), Git Nâng cao hơn (10), Git trong Thực tế (15)
- Mỗi câu hỏi có thể bao gồm nhiều sub-questions
- Đọc các file answers trong thư mục [`answers/`](answers/) để hiểu chi tiết

## 🔗 Liên kết / Links

- Xem [`README.md`](README.md) để hiểu cấu trúc topic
- Xem [`plan.md`](plan.md) để xem kế hoạch chi tiết
- Xem [`answers/`](answers/) để đọc câu trả lời chi tiết

---

**Danh sách câu hỏi được tạo theo format của interview-viewer / Questions list created following interview-viewer format**
