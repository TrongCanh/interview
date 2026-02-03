# 35. Git Troubleshooting / Khắc phục sự cố Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu cách chẩn đoán và khắc phục các vấn đề phổ biến khi làm việc với Git.

### Khi nào cần hiểu / When to Understand

- Khi gặp lỗi Git không rõ nguyên nhân
- Khi cần khôi phục repository từ trạng thái lỗi
- Khi chuẩn bị cho phỏng vấn Git ở mức độ cao

### Giá trị gì / Benefits

- Giảm thời gian debug và khôi phục
- Tăng tự tin khi xử lý các tình huống khẩn cấp
- Tránh mất dữ liệu quan trọng

---

## Câu hỏi 1: Lỗi "fatal: refusing to merge unrelated histories" là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu nguyên nhân và cách xử lý khi Git từ chối merge hai repository không có lịch sử liên quan.

### Khi nào dùng / When to Use

Khi push local repository lên remote đã có dữ liệu hoặc khi merge hai repository khác nhau.

### Giá trị gì / Benefits

- Giải quyết vấn đề khi khởi tạo repository theo cách khác nhau
- Cho phép ghép hai dự án lại với nhau

### Định nghĩa / Definition

Lỗi này xảy ra khi Git phát hiện hai repository không có commit chung (không có ancestor commit), mặc định Git sẽ từ chối merge để tránh tạo ra lịch sử không mong muốn.

### Ví dụ / Examples

```bash
# Lỗi xảy ra khi:
git remote add origin https://github.com/user/repo.git
git pull origin main
# fatal: refusing to merge unrelated histories

# Giải pháp 1: Cho phép merge với unrelated histories
git pull origin main --allow-unrelated-histories

# Giải pháp 2: Rebase với unrelated histories
git pull origin main --allow-unrelated-histories --rebase

# Giải pháp 3: Reset và push force (cẩn thận!)
git reset --hard origin/main
git push --force
```

### Best Practices

- Chỉ dùng `--allow-unrelated-histories` khi thực sự cần thiết
- Kiểm tra kỹ trước khi force push
- Backup repository trước khi thực hiện các thao tác rủi ro

### Anti-patterns

- Force push vào shared branch mà không thông báo
- Merge unrelated histories mà không hiểu hậu quả

---

## Câu hỏi 2: Lỗi "error: failed to push some refs to..." là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu nguyên nhân khi push bị từ chối do conflict với remote.

### Khi nào dùng / When to Use

Khi gặp lỗi push do remote có commit mới hơn local.

### Giá trị gì / Benefits

- Giải quyết conflict giữa local và remote
- Đảm bảo không mất commit của người khác

### Định nghĩa / Definition

Lỗi này xảy ra khi local branch không up-to-date với remote branch, Git từ chối push để tránh ghi đè commit của người khác.

### Ví dụ / Examples

```bash
# Lỗi:
git push origin main
# error: failed to push some refs to 'https://github.com/user/repo.git'

# Giải pháp 1: Pull trước rồi push
git pull origin main
# Giải quyết conflict nếu có
git push origin main

# Giải pháp 2: Pull với rebase
git pull --rebase origin main
git push origin main

# Giải pháp 3: Force push (chỉ dùng cho branch cá nhân)
git push --force origin main
# hoặc force with lease (an toàn hơn)
git push --force-with-lease origin main
```

### Best Practices

- Luôn pull trước khi push
- Dùng `--force-with-lease` thay vì `--force`
- Thường xuyên sync với remote

### Anti-patterns

- Force push vào shared branch
- Bỏ qua conflict một cách tùy ý

---

## Câu hỏi 3: Lỗi "fatal: not a git repository" là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu nguyên nhân khi Git không nhận diện thư mục là repository.

### Khi nào dùng / When to Use

Khi gặp lỗi này khi chạy lệnh Git.

### Giá trị gì / Benefits

- Xác định vị trí repository đúng
- Khởi tạo repository khi cần

### Định nghĩa / Definition

Lỗi này xảy ra khi lệnh Git được chạy trong thư mục không phải là Git repository hoặc chưa được khởi tạo.

### Ví dụ / Examples

```bash
# Lỗi:
git status
# fatal: not a git repository (or any of the parent directories): .git

# Giải pháp 1: Kiểm tra thư mục hiện tại
pwd
ls -la

# Giải pháp 2: Chuyển đến thư mục đúng
cd /path/to/project

# Giải pháp 3: Khởi tạo repository mới
git init

# Giải pháp 4: Clone từ remote
git clone https://github.com/user/repo.git
```

### Best Practices

- Luôn kiểm tra thư mục hiện tại trước khi chạy lệnh Git
- Sử dụng terminal có hiển thị branch hiện tại

### Anti-patterns

- Chạy lệnh Git ở thư mục sai
- Git init trong thư mục đã có repository

---

## Câu hỏi 4: Lỗi "fatal: refusing to update checked out branch" là gì?

### Mục đích / Purpose

Hiểu vấn đề khi push vào branch đang được checkout trên remote.

### Khi nào dùng / When to Use

Khi push vào bare repository hoặc server Git.

### Giá trị gì / Benefits

- Tránh làm hỏng working directory trên remote
- Hiểu cách thiết lập Git server đúng cách

### Định nghĩa / Definition

Lỗi này xảy ra khi cố push vào branch đang được checkout (có working directory) trên remote repository.

### Ví dụ / Examples

```bash
# Lỗi:
git push origin main
# fatal: refusing to update checked out branch: refs/heads/main

# Giải pháp 1: Dùng bare repository trên server
git init --bare /path/to/repo.git

# Giải pháp 2: Push vào branch khác
git push origin main:remote-main

# Giải pháp 3: Cấu hình receive.denyCurrentBranch
# Trên remote:
git config receive.denyCurrentBranch ignore
git config receive.denyCurrentBranch updateInstead
```

### Best Practices

- Luôn dùng bare repository cho Git server
- Không push vào branch đang được checkout

### Anti-patterns

- Push vào non-bare repository trên server
- Disable bảo mật mà không hiểu hậu quả

---

## Câu hỏi 5: Lỗi "CONFLICT (content): Merge conflict in..." là gì và cách xử lý?

### Mục đích / Purpose

Hiểu cách xử lý merge conflict khi hai thay đổi xung đột.

### Khi nào dùng / When to Use

Khi merge hoặc rebase gặp conflict.

### Giá trị gì / Benefits

- Giải quyết conflict một cách hiệu quả
- Tránh mất thay đổi quan trọng

### Định nghĩa / Definition

Merge conflict xảy ra khi Git không thể tự động ghép hai thay đổi vào cùng một phần của file.

### Ví dụ / Examples

```bash
# Lỗi khi merge:
git merge feature-branch
# CONFLICT (content): Merge conflict in file.txt

# Giải pháp 1: Xem conflict
git status
cat file.txt

# File với conflict markers:
<<<<<<< HEAD
// Code của bạn
=======
// Code từ branch khác
>>>>>>> feature-branch

# Giải pháp 2: Edit file để giải quyết
# Xóa markers và giữ code cần thiết

# Giải pháp 3: Mark as resolved
git add file.txt

# Giải pháp 4: Hoàn thành merge
git commit

# Giải pháp 5: Hủy merge
git merge --abort
```

### Best Practices

- Thường xuyên pull để tránh conflict lớn
- Giao tiếp với team khi có conflict
- Dùng merge tool (git mergetool)

### Anti-patterns

- Bỏ qua conflict một cách tùy ý
- Commit mà không giải quyết hết conflict

---

## Câu hỏi 6: Lỗi "fatal: bad signature" là gì?

### Mục đích / Purpose

Hiểu nguyên nhân khi Git gặp lỗi với signature của commit hoặc object.

### Khi nào dùng / When to Use

Khi repository bị corrupted hoặc có vấn đề với GPG signing.

### Giá trị gì / Benefits

- Chẩn đoán repository bị hỏng
- Khắc phục vấn đề với commit signing

### Định nghĩa / Definition

Lỗi này xảy ra khi Git phát hiện object hoặc commit có signature không hợp lệ.

### Ví dụ / Examples

```bash
# Lỗi:
git log
# fatal: bad signature

# Giải pháp 1: Kiểm tra repository integrity
git fsck --full

# Giải pháp 2: Clone lại repository
git clone https://github.com/user/repo.git backup
cp -r backup/.git .git

# Giải pháp 3: Dùng reflog để khôi phục
git reflog
git reset --hard HEAD@{n}

# Giải pháp 4: Disable GPG verify (tạm thời)
git config --global commit.gpgsign false
```

### Best Practices

- Backup repository thường xuyên
- Dùng `git fsck` để kiểm tra integrity

### Anti-patterns

- Bỏ qua lỗi signature mà không hiểu nguyên nhân
- Làm việc với repository bị corrupted mà không backup

---

## Câu hỏi 7: Lỗi "fatal: loose object" là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu cách xử lý khi Git object bị corrupted.

### Khi nào dùng / When to Use

Khi repository bị corrupted do disk failure hoặc vấn đề khác.

### Giá trị gì / Benefits

- Khôi phục repository từ corrupted state
- Hiểu Git object storage

### Định nghĩa / Definition

Lỗi này xảy ra khi Git không thể đọc một object trong repository do file bị corrupted.

### Ví dụ / Examples

```bash
# Lỗi:
git status
# error: object file .git/objects/xx/xxxx... is empty
# fatal: loose object xx/xxxx... (stored in .git/objects/xx/xxxx...) is corrupt

# Giải pháp 1: Clone lại từ remote
git clone https://github.com/user/repo.git temp
rm -rf .git
mv temp/.git .
rm -rf temp

# Giải pháp 2: Sử dụng git reflog
git reflog
# Reset đến commit còn tốt

# Giải pháp 3: Git gc để clean
git gc --prune=now

# Giải pháp 4: Restore từ backup
cp -r backup/.git .git
```

### Best Practices

- Backup repository định kỳ
- Dùng bare repository cho server
- Kiểm tra disk health

### Anti-patterns

- Xóa .git folder khi gặp lỗi
- Làm việc với corrupted repository mà không backup

---

## Câu hỏi 8: Lỗi "error: Your local changes to the following files would be overwritten by checkout" là gì?

### Mục đích / Purpose

Hiểu cách xử lý khi Git từ chối checkout do có uncommitted changes.

### Khi nào dùng / When to Use

Khi muốn switch branch nhưng có thay đổi chưa commit.

### Giá trị gì / Benefits

- Tránh mất thay đổi không mong muốn
- Quản lý work-in-progress hiệu quả

### Định nghĩa / Definition

Lỗi này xảy ra khi Git phát hiện có thay đổi chưa commit sẽ bị ghi đè khi switch branch.

### Ví dụ / Examples

```bash
# Lỗi:
git checkout feature-branch
# error: Your local changes to the following files would be overwritten by checkout:
# 	file.txt
# Please commit your changes or stash them before you switch branches.

# Giải pháp 1: Commit changes
git add file.txt
git commit -m "WIP"

# Giải pháp 2: Stash changes
git stash
git checkout feature-branch
git stash pop

# Giải pháp 3: Discard changes
git restore file.txt
git checkout feature-branch

# Giải pháp 4: Force checkout (mất changes!)
git checkout -f feature-branch
```

### Best Practices

- Commit hoặc stash trước khi switch branch
- Dùng `git status` để kiểm tra changes

### Anti-patterns

- Force checkout mà không backup changes
- Bỏ qua warning của Git

---

## Câu hỏi 9: Lỗi "fatal: unable to access..." là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu cách xử lý khi Git không thể kết nối đến remote repository.

### Khi nào dùng / When to Use

Khi gặp lỗi network hoặc authentication khi clone/pull/push.

### Giá trị gì / Benefits

- Chẩn đoán và giải quyết vấn đề kết nối
- Thiết lập authentication đúng cách

### Định nghĩa / Definition

Lỗi này xảy ra khi Git không thể kết nối đến remote repository do network, proxy, hoặc authentication issues.

### Ví dụ / Examples

```bash
# Lỗi:
git push origin main
# fatal: unable to access 'https://github.com/user/repo.git/': Failed to connect to github.com port 443

# Giải pháp 1: Kiểm tra kết nối
ping github.com
curl -I https://github.com

# Giải pháp 2: Cấu hình proxy
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# Giải pháp 3: Disable proxy
git config --global --unset http.proxy
git config --global --unset https.proxy

# Giải pháp 4: Sử dụng SSH thay vì HTTPS
git remote set-url origin git@github.com:user/repo.git

# Giải pháp 5: Cấu hình authentication
git config --global credential.helper store
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Best Practices

- Kiểm tra kết nối network trước
- Sử dụng SSH key cho authentication
- Cấu hình proxy khi cần

### Anti-patterns

- Bỏ qua lỗi network mà không kiểm tra
- Hardcode credentials trong URL

---

## Câu hỏi 10: Lỗi "fatal: ambiguous argument 'HEAD'" là gì?

### Mục đích / Purpose

Hiểu nguyên nhân khi Git không xác định được reference HEAD.

### Khi nào dùng / When to Use

Khi gặp lỗi này khi chạy lệnh Git với HEAD.

### Giá trị gì / Benefits

- Hiểu Git HEAD reference
- Xử lý repository ở trạng thái đặc biệt

### Định nghĩa / Definition

Lỗi này xảy ra khi repository không có commit (HEAD chưa được tạo) hoặc HEAD bị corrupted.

### Ví dụ / Examples

```bash
# Lỗi:
git log HEAD
# fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree

# Giải pháp 1: Kiểm tra repository state
git status
git log --all

# Giải pháp 2: Tạo commit đầu tiên
git add .
git commit -m "Initial commit"

# Giải pháp 3: Reset HEAD nếu corrupted
git symbolic-ref HEAD refs/heads/main

# Giải pháp 4: Clone lại repository
git clone https://github.com/user/repo.git
```

### Best Practices

- Tạo commit ngay sau khi init repository
- Kiểm tra HEAD state khi gặp lỗi

### Anti-patterns

- Làm việc với repository không có HEAD
- Bỏ qua lỗi HEAD mà không hiểu nguyên nhân

---

## Câu hỏi 11: Lỗi "fatal: refusing to merge unrelated histories" trong rebase là gì?

### Mục đích / Purpose

Hiểu cách xử lý khi rebase gặp unrelated histories.

### Khi nào dùng / When to Use

Khi rebase với branch không có lịch sử liên quan.

### Giá trị gì / Benefits

- Ghép lịch sử từ hai repository khác nhau
- Tạo lịch sử sạch khi cần

### Định nghĩa / Definition

Lỗi này xảy ra khi rebase với branch không có ancestor commit, Git từ chối để tránh tạo ra lịch sử không mong muốn.

### Ví dụ / Examples

```bash
# Lỗi:
git rebase upstream/main
# fatal: refusing to merge unrelated histories

# Giải pháp 1: Rebase với allow-unrelated-histories
git rebase --allow-unrelated-histories upstream/main

# Giải pháp 2: Merge trước rồi rebase
git merge --allow-unrelated-histories upstream/main
git rebase upstream/main

# Giải pháp 3: Reset và pull
git reset --hard upstream/main
```

### Best Practices

- Chỉ dùng khi thực sự cần ghép hai repository
- Kiểm tra lịch sử sau khi rebase

### Anti-patterns

- Dùng flag này mà không hiểu hậu quả
- Rebase unrelated histories trong shared branch

---

## Câu hỏi 12: Lỗi "error: cannot lock ref" là gì và cách khắc phục?

### Mục đích / Purpose

Hiểu cách xử lý khi Git không thể lock reference.

### Khi nào dùng / When to Use

Khi gặp lỗi lock reference khi pull/push/checkout.

### Giá trị gì / Benefits

- Giải quyết vấn đề lock file
- Hiểu Git reference locking

### Định nghĩa / Definition

Lỗi này xảy ra khi Git không thể lock reference do file lock còn tồn tại từ operation trước đó.

### Ví dụ / Examples

```bash
# Lỗi:
git pull origin main
# error: cannot lock ref 'refs/remotes/origin/main': is at ...

# Giải pháp 1: Xóa lock file
rm .git/refs/remotes/origin/main.lock

# Giải pháp 2: Git gc để clean
git gc --prune=now

# Giải pháp 3: Clone lại repository
git clone https://github.com/user/repo.git

# Giải pháp 4: Fix reference
git update-ref refs/remotes/origin/main origin/main
```

### Best Practices

- Đóng Git operations trước khi đóng terminal
- Kiểm tra và xóa lock file khi cần

### Anti-patterns

- Xóa .git folder khi gặp lock error
- Bỏ qua lock error mà không hiểu nguyên nhân

---

## Câu hỏi 13: Lỗi "fatal: bad object" là gì?

### Mục đích / Purpose

Hiểu cách xử lý khi Git gặp object không hợp lệ.

### Khi nào dùng / When to Use

Khi repository bị corrupted hoặc có reference đến object không tồn tại.

### Giá trị gì / Benefits

- Chẩn đoán và khắc phục corrupted repository
- Hiểu Git object model

### Định nghĩa / Definition

Lỗi này xảy ra khi Git tìm reference đến object không tồn tại hoặc bị corrupted.

### Ví dụ / Examples

```bash
# Lỗi:
git show abc1234
# fatal: bad object abc1234

# Giải pháp 1: Kiểm tra object tồn tại
git cat-file -p abc1234

# Giải pháp 2: Git fsck để kiểm tra
git fsck --full --no-reflogs

# Giải pháp 3: Clone lại từ remote
git clone https://github.com/user/repo.git

# Giải pháp 4: Dùng reflog để khôi phục
git reflog
```

### Best Practices

- Backup repository thường xuyên
- Dùng `git fsck` để kiểm tra integrity

### Anti-patterns

- Bỏ qua bad object error
- Làm việc với corrupted repository mà không backup

---

## Câu hỏi 14: Lỗi "error: RPC failed; curl 56 OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054" là gì?

### Mục đích / Purpose

Hiểu cách xử lý lỗi SSL/network khi clone/pull/push large repository.

### Khi nào dùng / When to Use

Khi gặp lỗi SSL hoặc network timeout với large files.

### Giá trị gì / Benefits

- Giải quyết vấn đề với large repository
- Cấu hình Git cho large files

### Định nghĩa / Definition

Lỗi này xảy ra khi Git gặp vấn đề SSL hoặc network timeout khi transfer large data.

### Ví dụ / Examples

```bash
# Lỗi:
git clone https://github.com/user/repo.git
# error: RPC failed; curl 56 OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054

# Giải pháp 1: Tăng buffer size
git config --global http.postBuffer 524288000

# Giải pháp 2: Shallow clone
git clone --depth 1 https://github.com/user/repo.git

# Giải pháp 3: Dùng SSH thay vì HTTPS
git clone git@github.com:user/repo.git

# Giải pháp 4: Disable SSL verify (không khuyến nghị)
git config --global http.sslVerify false

# Giải pháp 5: Sử dụng Git LFS cho large files
git lfs install
git lfs track "*.psd"
git lfs migrate import --include="*.psd"
```

### Best Practices

- Dùng Git LFS cho large files
- Tăng buffer size khi cần
- Sử dụng SSH cho stable connection

### Anti-patterns

- Disable SSL verify trong production
- Bỏ qua large file issue

---

## Câu hỏi 15: Lỗi "fatal: The current branch master has no upstream branch" là gì?

### Mục đích / Purpose

Hiểu cách thiết lập upstream branch cho tracking.

### Khi nào dùng / When to Use

Khi push branch lần đầu hoặc khi branch chưa có upstream.

### Giá trị gì / Benefits

- Thiết lập tracking branch đúng cách
- Đơn giản hóa pull/push

### Định nghĩa / Definition

Lỗi này xảy ra khi branch hiện tại chưa được cấu hình để track remote branch.

### Ví dụ / Examples

```bash
# Lỗi:
git push
# fatal: The current branch master has no upstream branch.

# Giải pháp 1: Push với -u để thiết lập upstream
git push -u origin master

# Giải pháp 2: Thiết lập upstream riêng
git branch --set-upstream-to=origin/master master

# Giải pháp 3: Push trực tiếp với remote và branch
git push origin master

# Giải pháp 4: Cấu hình push.default
git config --global push.default current
```

### Best Practices

- Luôn dùng `-u` khi push lần đầu
- Cấu hình push.default phù hợp

### Anti-patterns

- Bỏ qua upstream tracking
- Luôn chỉ định remote/branch khi push

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. Git errors thường có thông báo rõ ràng về nguyên nhân
2. Luôn backup trước khi thực hiện các thao tác rủi ro
3. Hiểu nguyên nhân trước khi áp dụng giải pháp
4. Dùng `git status`, `git log`, `git fsck` để chẩn đoán
5. Reflog là công cụ mạnh để khôi phục từ lỗi

### Commands Reference / Tham khảo lệnh

```bash
# Chẩn đoán / Diagnostics
git status                    # Kiểm tra trạng thái
git log --all                 # Xem tất cả commits
git fsck --full               # Kiểm tra integrity
git reflog                    # Xem lịch sử operations
git remote -v                 # Kiểm remotes

# Khôi phục / Recovery
git reset --hard HEAD@{n}     # Reset đến reflog entry
git merge --abort             # Hủy merge
git rebase --abort            # Hủy rebase
git checkout -f branch       # Force checkout
git stash                     # Lưu work-in-progress

# Cấu hình / Configuration
git config --global http.proxy URL
git config --global http.postBuffer SIZE
git config --global credential.helper store
git config --global push.default current
git config --global commit.gpgsign false

# Advanced / Nâng cao
git pull --allow-unrelated-histories
git rebase --allow-unrelated-histories
git push --force-with-lease
git clone --depth 1 URL
git gc --prune=now
```

### Best Practices / Thực hành tốt

1. Backup repository trước khi thực hiện các thao tác rủi ro
2. Đọc kỹ error message để hiểu nguyên nhân
3. Sử dụng `--force-with-lease` thay vì `--force`
4. Thường xuyên sync với remote để tránh conflict lớn
5. Dùng merge tool để giải quyết conflict hiệu quả
6. Kiểm tra connection và authentication trước khi push/pull
7. Sử dụng Git LFS cho large files
8. Cấu hình SSH key cho authentication an toàn
9. Thường xuyên chạy `git fsck` để kiểm tra integrity
10. Giao tiếp với team khi gặp conflict phức tạp
