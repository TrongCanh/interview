# 41. Git Advanced Commands / Lệnh Git nâng cao

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu về các lệnh Git nâng cao cho complex workflows.

### Khi nào cần hiểu / When to Understand

- Khi cần xử lý complex Git scenarios
- Khi cần advanced Git operations
- Khi chuẩn bị cho senior/lead roles

### Giá trị gì / Benefits

- Xử lý complex scenarios
- Tăng hiệu suất làm việc
- Giải quyết các vấn đề khó

---

## Câu hỏi 1: Git cherry-pick là gì?

### Mục đích / Purpose

Hiểu cách áp dụng commit từ một branch sang branch khác.

### Khi nào dùng / When to Use

Khi cần áp dụng specific commit từ branch khác.

### Giá trị gì / Benefits

- Áp dụng specific changes
- Giải quyết issues nhanh
- Backport fixes

### Định nghĩa / Definition

`git cherry-pick` áp dụng changes từ một commit sang current branch.

### Ví dụ / Examples

```bash
# Cherry-pick một commit
git cherry-pick abc1234

# Cherry-pick nhiều commits
git cherry-pick abc1234 def5678

# Cherry-pick với no-commit (chỉ apply changes)
git cherry-pick --no-commit abc1234

# Cherry-pick với edit (tweak commit message)
git cherry-pick --edit abc1234

# Cherry-pick với sign-off
git cherry-pick --signoff abc1234

# Cherry-pick range của commits
git cherry-pick start..end

# Cherry-pick conflicts
git cherry-pick abc1234
# Nếu có conflict, resolve và:
git add .
git cherry-pick --continue

# Hủy cherry-pick
git cherry-pick --abort

# Ví dụ backport fix
# Branch: main (v2.0.0)
# Branch: release/v1.9.0

# 1. Checkout release branch
git checkout release/v1.9.0

# 2. Cherry-pick fix từ main
git cherry-pick abc1234

# 3. Push release branch
git push origin release/v1.9.0
```

### Best Practices

- Cherry-pick commits nhỏ
- Test sau khi cherry-pick
- Document cherry-picked commits
- Avoid cherry-pick merges

### Anti-patterns

- Cherry-pick quá nhiều commits
- Cherry-pick merge commits
- Không test sau khi cherry-pick
- Cherry-pick conflicts mà không resolve

---

## Câu hỏi 2: Git revert là gì?

### Mục đích / Purpose

Hiểu cách tạo commit để undo previous commits.

### Khi nào dùng / When to Use

Khi cần undo commit mà không thay đổi history.

### Giá trị gì / Benefits

- Undo commits safely
- Preserve history
- Collaborative-friendly

### Định nghĩa / Definition

`git revert` tạo new commit để undo changes từ previous commit.

### Ví dụ / Examples

```bash
# Revert một commit
git revert abc1234

# Revert nhiều commits
git revert abc1234 def5678

# Revert với no-commit (chỉ apply changes)
git revert --no-commit abc1234

# Revert với no-edit (giữ message mặc định)
git revert --no-edit abc1234

# Revert merge commit
git revert -m 1 abc1234

# Revert range của commits
git revert start..end

# Revert conflicts
git revert abc1234
# Nếu có conflict, resolve và:
git add .
git revert --continue

# Hủy revert
git revert --abort

# Ví dụ undo bad commit
# 1. Tìm commit cần revert
git log --oneline

# 2. Revert commit
git revert abc1234

# 3. Push changes
git push origin main

# Revert một revert (re-apply changes)
git revert abc1234
git revert def5678  # Revert của abc1234
```

### Best Practices

- Revert thay vì reset trong shared branches
- Write clear revert messages
- Test sau khi revert
- Document reason cho revert

### Anti-patterns

- Reset trong shared branches
- Revert merge commits mà không hiểu
- Không test sau khi revert
- Revert quá nhiều commits

---

## Câu hỏi 3: Git reset là gì?

### Mục đích / Purpose

Hiểu cách reset current branch đến một state khác.

### Khi nào dùng / When to Use

Khi cần undo commits hoặc changes (chỉ trong local branches).

### Giá trị gì / Benefits

- Undo commits nhanh
- Clean up history
- Reset to specific state

### Định nghĩa / Definition

`git reset` reset current branch đến một commit khác.

### Ví dụ / Examples

```bash
# Soft reset (giữ changes trong staging)
git reset --soft HEAD~1

# Mixed reset (giữ changes trong working directory)
git reset --mixed HEAD~1
git reset HEAD~1  # default

# Hard reset (xóa tất cả changes)
git reset --hard HEAD~1

# Reset đến specific commit
git reset --hard abc1234

# Reset với path (chỉ reset specific files)
git reset HEAD path/to/file

# Reset đến remote branch
git reset --hard origin/main

# Reset và keep untracked files
git reset --hard && git clean -fd

# Reset với reflog
git reflog
git reset --hard HEAD@{5}

# Ví dụ undo last commit
# 1. Soft reset (giữ changes)
git reset --soft HEAD~1
# Changes vẫn trong staging

# 2. Mixed reset (giữ changes nhưng không staged)
git reset --mixed HEAD~1
# Changes trong working directory

# 3. Hard reset (xóa changes)
git reset --hard HEAD~1
# Changes bị xóa

# Reset branch sau force push
git fetch origin
git reset --hard origin/main
```

### Best Practices

- Chỉ dùng reset trong local branches
- Dùng reflog để recover nếu cần
- Test trước khi hard reset
- Backup trước khi hard reset

### Anti-patterns

- Hard reset trong shared branches
- Reset mà không backup
- Không hiểu soft/mixed/hard
- Reset remote branch

---

## Câu hỏi 4: Git clean là gì?

### Mục đích / Purpose

Hiểu cách xóa untracked files khỏi working directory.

### Khi nào dùng / When to Use

Khi cần clean up working directory.

### Giá trị gì / Benefits

- Clean working directory
- Remove junk files
- Prepare for clean state

### Định nghĩa / Definition

`git clean` xóa untracked files khỏi working directory.

### Ví dụ / Examples

```bash
# Show files sẽ bị xóa (dry run)
git clean -n

# Xóa untracked files
git clean -f

# Xóa untracked directories
git clean -fd

# Xóa ignored files
git clean -fX

# Xóa untracked và ignored files
git clean -fx

# Xóa interactive
git clean -i

# Clean specific path
git clean -f path/to/directory

# Clean verbose
git clean -fv

# Ví dụ clean working directory
# 1. Preview files sẽ bị xóa
git clean -n

# 2. Xóa untracked files
git clean -f

# 3. Xóa untracked files và directories
git clean -fd

# 4. Xóa tất cả untracked và ignored
git clean -fxd

# Clean sau khi merge conflict
git reset --hard
git clean -fd
git pull
```

### Best Practices

- Dùng `-n` để preview trước khi xóa
- Backup trước khi clean
- Dùng `-fd` để clean directories
- Dùng `-i` để interactive clean

### Anti-patterns

- Clean mà không preview
- Clean mà không backup
- Clean important files
- Not understanding `-f`, `-d`, `-x`

---

## Câu hỏi 5: Git blame là gì?

### Mục đích / Purpose

Hiểu cách xem ai đã thay đổi từng line của file.

### Khi nào dùng / When to Use

Khi cần tìm ai đã viết hoặc thay đổi code.

### Giá trị gì / Benefits

- Tìm author của changes
- Debug issues
- Understand code history

### Định nghĩa / Definition

`git blame` hiển thị author và commit cho từng line của file.

### Ví dụ / Examples

```bash
# Blame một file
git blame file.txt

# Blame với line range
git blame -L 10,20 file.txt

# Blame với commit hash
git blame abc1234 file.txt

# Blame với email
git blame -e file.txt

# Blame với date
git blame -t file.txt

# Blame với no whitespace changes
git blame -w file.txt

# Blame với ignore specific rev
git blame --ignore-rev-file .git-blame-ignore-revs

# Ví dụ tìm author của bug
# 1. Blame file
git blame src/app.js

# Output:
# abc1234 (John Doe 2024-01-01 10:00:00 +0000 10) function hello() {
# def5678 (Jane Smith 2024-01-02 11:00:00 +0000 11)   console.log('Hello');
# abc1234 (John Doe 2024-01-01 10:00:00 +0000 12) }

# 2. Xem commit details
git show abc1234

# 3. Contact author hoặc review commit

# Ignore specific commits in blame
# .git-blame-ignore-revs
abc1234  # Format code commit
def5678  # Whitespace changes commit
```

### Best Practices

- Dùng blame để understand history
- Contact author khi cần
- Review commit details
- Ignore formatting commits

### Anti-patterns

- Blame để指责
- Not reviewing commit context
- Not understanding blame output
- Blame formatting commits

---

## Câu hỏi 6: Git bisect là gì?

### Mục đích / Purpose

Hiểu cách tìm commit gây ra bug bằng binary search.

### Khi nào dùng / When to Use

Khi cần tìm commit gây ra bug trong history.

### Giá trị gì / Benefits

- Tìm bug commit nhanh
- Binary search efficiency
- Automated testing

### Định nghĩa / Definition

`git bisect` dùng binary search để tìm commit gây ra bug.

### Ví dụ / Examples

```bash
# Manual bisect
# 1. Start bisect
git bisect start

# 2. Mark bad commit (hiện tại)
git bisect bad

# 3. Mark good commit (trước khi bug)
git bisect good abc1234

# 4. Git checkout middle commit
# 5. Test code
# 6. Mark good hoặc bad
git bisect good  # hoặc git bisect bad

# 7. Lặp lại cho đến khi tìm được bad commit

# 8. Reset sau khi tìm được
git bisect reset

# Automated bisect
git bisect start HEAD abc1234
git bisect run npm test

# Skip commits
git bisect skip

# View bisect log
git bisect log

# Replay bisect log
git bisect replay < bisect-log

# Ví dụ tìm bug commit
# 1. Start bisect
git bisect start

# 2. Mark current commit là bad
git bisect bad

# 3. Mark commit 10 commits trước là good
git bisect good HEAD~10

# 4. Git checkout middle commit (HEAD~5)
# 5. Test code
npm test

# 6. Nếu test pass, mark good
git bisect good

# 7. Git checkout middle commit (HEAD~2)
# 8. Test code
npm test

# 9. Nếu test fail, mark bad
git bisect bad

# 10. Git checkout middle commit (HEAD~3)
# ... tiếp tục cho đến khi tìm được bad commit

# 11. Reset sau khi tìm được
git bisect reset
```

### Best Practices

- Dùng automated test khi có thể
- Mark good/bad chính xác
- Reset sau khi tìm được
- Document bug commit

### Anti-patterns

- Not testing properly
- Not marking good/bad correctly
- Not resetting after bisect
- Bisect với unstable tests

---

## Câu hỏi 7: Git rerere là gì?

### Mục đích / Purpose

Hiểu cách reuse recorded resolution cho conflicts.

### Khi nào dùng / When to Use

Khi cần resolve conflicts lặp lại.

### Giá trị gì / Benefits

- Tự động resolve conflicts
- Save time
- Consistent resolutions

### Định nghĩa / Definition

`git rerere` (Reuse Recorded Resolution) tự động resolve conflicts đã được resolve trước đó.

### Ví dụ / Examples

```bash
# Enable rerere
git config --global rerere.enabled true

# Check rerere status
git rerere status

# View recorded resolutions
git rerere diff

# Clear recorded resolutions
git rerere clear

# Forget specific resolution
git rerere forget path/to/file

# Ví dụ sử dụng rerere
# 1. Enable rerere
git config --global rerere.enabled true

# 2. Merge và resolve conflict
git merge feature-branch
# Resolve conflict in file.txt
git add file.txt
git commit

# 3. Rerere ghi nhớ resolution

# 4. Merge lại sau đó
git checkout main
git pull
git merge feature-branch
# Rerere tự động apply resolution đã ghi nhớ

# 5. Commit resolution
git commit

# View rerere log
git rerere status
git rerere diff
```

### Best Practices

- Enable rerere cho frequent conflicts
- Review resolutions trước khi commit
- Clear resolutions khi không cần
- Use rerere cho stable conflicts

### Anti-patterns

- Not reviewing resolutions
- Relying too much on rerere
- Not clearing old resolutions
- Rerere với unstable conflicts

---

## Câu hỏi 8: Git notes là gì?

### Mục đích / Purpose

Hiểu cách thêm notes cho commits mà không thay đổi commit.

### Khi nào dùng / When to Use

Khi cần thêm metadata cho commits.

### Giá trị gì / Benefits

- Add metadata without changing commits
- Document decisions
- Track additional info

### Định nghĩa / Definition

`git notes` thêm notes cho commits mà không thay đổi commit hash.

### Ví dụ / Examples

```bash
# Add note cho commit
git notes add abc1234 -m "This commit fixes bug #123"

# Edit note
git notes edit abc1234

# Show note
git notes show abc1234

# List notes
git notes list

# Copy notes
git notes copy abc1234 def5678

# Remove note
git notes remove abc1234

# Show notes trong log
git log --show-notes

# Show specific notes ref
git log --show-notes=refs/notes/commits

# Ví dụ sử dụng notes
# 1. Add note cho commit
git notes add abc1234 -m "Code review: Approved by John"

# 2. Add note cho commit khác
git notes add def5678 -m "Bug: Fixed in production"

# 3. Show notes
git log --show-notes

# 4. Edit note
git notes edit abc1234

# 5. Remove note
git notes remove abc1234

# Notes refs khác
git notes --ref=code-review add abc1234 -m "Approved"
git log --show-notes=refs/notes/code-review
```

### Best Practices

- Sửze notes cho metadata
- Document decisions
- Use notes refs để tổ chức
- Show notes trong log

### Anti-patterns

- Notes thay vì commit messages
- Notes quá dài
- Not showing notes trong log
- Notes không organized

---

## Câu hỏi 9: Git worktree là gì?

### Mục đích / Purpose

Hiểu cách làm việc với multiple working directories.

### Khi nào dùng / When to Use

Khi cần làm việc trên multiple branches cùng lúc.

### Giá trị gì / Benefits

- Switch branches nhanh
- Làm việc trên multiple features
- Test multiple versions

### Định nghĩa / Definition

`git worktree` tạo multiple working directories cho cùng một repository.

### Ví dụ / Examples

```bash
# Create worktree cho branch
git worktree add ../project-feature feature-branch

# Create worktree với new branch
git worktree add ../project-new-branch -b new-branch

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../project-feature

# Prune worktrees
git worktree prune

# Move worktree
git worktree move ../project-feature ../project-feature-new

# Ví dụ sử dụng worktree
# 1. Clone repository
git clone https://github.com/user/repo.git
cd repo

# 2. Tạo worktree cho feature branch
git worktree add ../repo-feature feature/new-feature

# 3. Tạo worktree cho hotfix
git worktree add ../repo-hotfix -b hotfix/critical-fix

# 4. List worktrees
git worktree list

# Output:
# /path/to/repo              abc1234 [main]
# /path/to/repo-feature      def5678 [feature/new-feature]
# /path/to/repo-hotfix       ghi9012 [hotfix/critical-fix]

# 5. Làm việc trong cả 3 directories
# 6. Remove worktree khi xong
git worktree remove ../repo-feature
git worktree remove ../repo-hotfix
```

### Best Practices

- Dùng worktree cho parallel work
- Prune worktrees thường xuyên
- Remove worktrees khi xong
- Use descriptive worktree names

### Anti-patterns

- Quá nhiều worktrees
- Not pruning worktrees
- Worktree names không rõ ràng
- Not removing old worktrees

---

## Câu hỏi 10: Git submodule là gì?

### Mục đích / Purpose

Hiểu cách include Git repository trong repository khác.

### Khi nào dùng / When to Use

Khi cần include external dependencies hoặc shared code.

### Giá trị gì / Benefits

- Include external repositories
- Share code giữa projects
- Version control dependencies

### Định nghĩa / Definition

`git submodule` cho phép include Git repository trong repository khác.

### Ví dụ / Examples

```bash
# Add submodule
git submodule add https://github.com/user/submodule.git

# Add submodule vào specific directory
git submodule add https://github.com/user/submodule.git libs/submodule

# Clone repository với submodules
git clone --recursive https://github.com/user/repo.git

# Hoặc:
git clone https://github.com/user/repo.git
cd repo
git submodule update --init --recursive

# Update submodules
git submodule update --remote

# Update specific submodule
git submodule update --remote libs/submodule

# Pull với submodules
git pull --recurse-submodules

# Status của submodules
git submodule status

# Remove submodule
git submodule deinit libs/submodule
git rm libs/submodule
rm -rf .git/modules/libs/submodule

# Ví dụ sử dụng submodule
# 1. Add submodule
git submodule add https://github.com/user/library.git libs/library

# 2. Commit submodule
git commit -m "Add library submodule"

# 3. Push
git push origin main

# 4. Clone repository với submodules
git clone --recursive https://github.com/user/repo.git

# 5. Update submodules
git submodule update --remote

# 6. Commit submodule update
git commit -m "Update library submodule"
git push
```

### Best Practices

- Document submodules trong README
- Update submodules thường xuyên
- Use `--recursive` khi clone
- Test submodule changes

### Anti-patterns

- Not updating submodules
- Not documenting submodules
- Not using `--recursive` khi clone
- Submodules trong submodules

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. `cherry-pick` áp dụng commit từ branch khác
2. `revert` undo commits bằng new commit
3. `reset` reset branch đến state khác
4. `clean` xóa untracked files
5. `blame` xem author của từng line
6. `bisect` tìm commit gây bug
7. `rerere` reuse conflict resolutions
8. `notes` thêm metadata cho commits
9. `worktree` multiple working directories
10. `submodule` include Git repository trong repository

### Commands Reference / Tham khảo lệnh

```bash
# Cherry-pick
git cherry-pick abc1234
git cherry-pick --no-commit abc1234
git cherry-pick --edit abc1234
git cherry-pick --continue
git cherry-pick --abort

# Revert
git revert abc1234
git revert --no-edit abc1234
git revert -m 1 abc1234
git revert --continue
git revert --abort

# Reset
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git reset --hard origin/main

# Clean
git clean -n
git clean -f
git clean -fd
git clean -fxd
git clean -i

# Blame
git blame file.txt
git blame -L 10,20 file.txt
git blame -w file.txt
git blame -e file.txt

# Bisect
git bisect start
git bisect bad
git bisect good abc1234
git bisect run npm test
git bisect reset

# Rerere
git config --global rerere.enabled true
git rerere status
git rerere diff
git rerere clear

# Notes
git notes add abc1234 -m "Note"
git notes show abc1234
git notes edit abc1234
git notes remove abc1234
git log --show-notes

# Worktree
git worktree add ../project-feature feature-branch
git worktree list
git worktree remove ../project-feature
git worktree prune

# Submodule
git submodule add https://github.com/user/repo.git
git submodule update --init --recursive
git submodule update --remote
git submodule status
git clone --recursive https://github.com/user/repo.git
```

### Best Practices / Thực hành tốt

1. Cherry-pick commits nhỏ
2. Revert trong shared branches
3. Reset chỉ trong local branches
4. Clean với preview trước
5. Blame để understand history
6. Bisect với automated tests
7. Rerere cho frequent conflicts
8. Notes cho metadata
9. Worktree cho parallel work
10. Document submodules
