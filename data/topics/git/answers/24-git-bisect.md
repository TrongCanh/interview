# Git Bisect / Git Bisect

> Hướng dẫn chi tiết về cách sử dụng git bisect để tìm lỗi bằng binary search / Comprehensive guide to using git bisect for finding bugs with binary search

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng `git bisect` để nhanh chóng tìm ra commit gây lỗi trong lịch sử Git.

Understand how to use `git bisect` to quickly find the commit that introduced a bug in Git history.

### Khi nào cần hiểu / When to understand

- Khi phát hiện bug nhưng không biết commit nào gây ra
- Khi cần tìm regression trong lịch sử dài
- Khi muốn debug bằng cách kiểm tra từng commit
- Khi code review và cần tìm commit gây vấn đề

- When discovering a bug but don't know which commit caused it
- When needing to find regression in long history
- When wanting to debug by checking each commit
- When doing code review and need to find problematic commit

### Giá trị gì / Benefits

- Tìm bug nhanh chóng bằng binary search
- Giảm thời gian debug đáng kể
- Không cần kiểm tra từng commit thủ công
- Có thể tự động hóa quá trình
- Học được kỹ năng quan trọng cho debugging

- Find bugs quickly using binary search
- Significantly reduce debugging time
- No need to manually check each commit
- Can automate the process
- Learn important debugging skill

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Tìm bug cực nhanh (O(log n))
- Tích hợp sẵn trong Git
- Có thể tự động hóa với scripts
- Không cần cài thêm công cụ

**Nhược điểm / Cons:**

- Cần có test case có thể chạy
- Cần biết một commit "good" và một commit "bad"
- Phức tạp hơn với conflicts
- Không hiệu quả nếu bug không có tính binary (có/không)

**Pros:**

- Find bugs extremely fast (O(log n))
- Built into Git
- Can be automated with scripts
- No need to install additional tools

**Cons:**

- Need runnable test case
- Need to know one "good" and one "bad" commit
- More complex with conflicts
- Not effective if bug is not binary (present/absent)

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: `git bisect` là gì? / What is `git bisect`?

#### Mục đích / Purpose

Hiểu khái niệm và cơ chế hoạt động của git bisect.

Understand the concept and mechanism of git bisect.

#### Khi nào dùng / When to use

Khi cần tìm commit gây ra bug hoặc regression.

When needing to find the commit that introduced a bug or regression.

#### Giá trị gì / Benefits

- Biết cách sử dụng công cụ mạnh mẽ của Git
- Tìm bug nhanh hơn nhiều so với manual search
- Hiểu nguyên lý binary search

- Know how to use powerful Git tool
- Find bugs much faster than manual search
- Understand binary search principle

#### Định nghĩa / Definition

`git bisect` là lệnh Git sử dụng binary search để tìm commit gây ra bug bằng cách chia đôi lịch sử commit:

```
Good commit (không có bug) ----> Bad commit (có bug)
         ↓
    Binary search
         ↓
  Tìm commit gây bug
```

Git bisect tự động checkout các commit ở giữa và bạn chỉ cần đánh dấu là "good" hoặc "bad".

`git bisect` is a Git command that uses binary search to find the commit that introduced a bug by halving the commit history:

```
Good commit (no bug) ----> Bad commit (has bug)
         ↓
    Binary search
         ↓
  Find commit causing bug
```

Git bisect automatically checks out commits in the middle and you only need to mark them as "good" or "bad".

#### Ví dụ / Examples

**Kịch bản: Bug xuất hiện ở commit hiện tại**

```bash
# Commit hiện tại có bug
$ git log --oneline -5
abc1234 Fix authentication bug
def5678 Add user profile feature
ghi9012 Update dependencies
jkl3456 Refactor database
mno7890 Initial commit

# abc1234 có bug, nhưng không biết commit nào gây ra
```

**Sử dụng git bisect:**

```bash
# Bắt đầu bisect
git bisect start

# Đánh dấu commit hiện tại là "bad" (có bug)
git bisect bad

# Đánh dấu commit cũ là "good" (không có bug)
git bisect good mno7890

# Git sẽ checkout commit ở giữa
Bisecting: 2 revisions left to test after this (roughly 1 step)
[ghi9012] Update dependencies

# Test và đánh giá
# ... chạy test ...
git bisect bad  # commit này có bug

# Git tiếp tục chia đôi
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[def5678] Add user profile feature

# Test và đánh giá
# ... chạy test ...
git bisect good  # commit này không có bug

# Kết quả: abc1234 là commit gây bug
abc1234 is the first bad commit
```

#### Best Practices

1. **Chuẩn bị test case** rõ ràng trước khi bắt đầu
2. **Biết chắc một commit good và một commit bad**
3. **Test kỹ từng commit** trước khi đánh giá
4. **Lưu lại kết quả** để tham khảo sau này
5. **Reset sau khi hoàn thành** để quay về trạng thái ban đầu

6. **Prepare clear test case** before starting
7. **Know for sure one good and one bad commit**
8. **Test each commit thoroughly** before evaluating
9. **Save results** for future reference
10. **Reset after completion** to return to initial state

#### Anti-patterns

- ❌ Không có test case rõ ràng
- ❌ Đánh giá sai good/bad
- ❌ Quên reset sau khi xong
- ❌ Dùng bisect cho bug không binary
- ❌ Không hiểu kết quả

- ❌ No clear test case
- ❌ Evaluate good/bad incorrectly
- ❌ Forget to reset when done
- ❌ Use bisect for non-binary bugs
- ❌ Don't understand results

---

### Q2: `git bisect start` làm gì? / What does `git bisect start` do?

#### Mục đích / Purpose

Biết cách bắt đầu quá trình bisect trong Git.

Know how to start bisect process in Git.

#### Khi nào dùng / When to use

Khi muốn bắt đầu tìm commit gây bug bằng binary search.

When wanting to start finding the bug-causing commit using binary search.

#### Giá trị gì / Benefits

- Khởi tạo môi trường bisect
- Chuẩn bị cho quá trình binary search
- Có thể chỉ định phạm vi commit

- Initialize bisect environment
- Prepare for binary search process
- Can specify commit range

#### Định nghĩa / Definition

`git bisect start` bắt đầu quá trình bisect:

```bash
git bisect start [<bad> [<good>...]]
```

- `bad`: Commit gây bug (mặc định: HEAD)
- `good`: Commit không có bug (có thể nhiều)

`git bisect start` starts the bisect process:

```bash
git bisect start [<bad> [<good>...]]
```

- `bad`: Commit with bug (default: HEAD)
- `good`: Commit without bug (can be multiple)

#### Ví dụ / Examples

**Cách sử dụng cơ bản:**

```bash
# Bắt đầu bisect
git bisect start

# Đánh dấu bad và good sau đó
git bisect bad HEAD
git bisect good v1.0.0
```

**Cách sử dụng rút gọn:**

```bash
# Bắt đầu và đánh giá cùng lúc
git bisect start HEAD v1.0.0
# HEAD là bad, v1.0.0 là good
```

**Chỉ định phạm vi cụ thể:**

```bash
# Bisect giữa hai commit cụ thể
git bisect start abc1234 def5678
# abc1234 là bad, def5678 là good
```

**Nhiều good commits:**

```bash
# Bisect với nhiều good commits (để xác định chính xác hơn)
git bisect start HEAD v1.0.0 v1.1.0 v1.2.0
```

#### Best Practices

1. **Luôn reset** trước khi bắt đầu bisect mới
2. **Chỉ định rõ bad và good** nếu có thể
3. **Sử dụng tags** cho good commits khi có thể
4. **Kiểm tra trạng thái** với `git bisect status`

5. **Always reset** before starting new bisect
6. **Specify bad and good clearly** if possible
7. **Use tags** for good commits when available
8. **Check status** with `git bisect status`

#### Anti-patterns

- ❌ Bắt đầu bisect mới khi chưa reset cái cũ
- ❌ Không chỉ định bad và good rõ ràng
- ❌ Dùng commit không chắc chắn làm good/bad
- ❌ Không kiểm tra trạng thái bisect

- ❌ Start new bisect without resetting old one
- ❌ Don't specify bad and good clearly
- ❌ Use uncertain commits as good/bad
- ❌ Don't check bisect status

---

### Q3: `git bisect bad` và `git bisect good` làm gì? / What do `git bisect bad` and `git bisect good` do?

#### Mục đích / Purpose

Biết cách đánh giá các commits trong quá trình bisect.

Know how to evaluate commits during bisect process.

#### Khi nào dùng / When to use

Sau khi Git checkout một commit trong quá trình bisect và bạn đã test.

After Git checks out a commit during bisect and you have tested.

#### Giá trị gì / Benefits

- Thông báo cho Git kết quả test
- Giúp Git thu hẹp phạm vi tìm kiếm
- Đưa binary search đến kết quả

- Inform Git of test results
- Help Git narrow search scope
- Lead binary search to result

#### Định nghĩa / Definition

```bash
git bisect bad [<commit>]
git bisect good [<commit>...]
```

- `git bisect bad`: Đánh dấu commit hiện tại (hoặc cụ thể) có bug
- `git bisect good`: Đánh dấu commit hiện tại (hoặc cụ thể) không có bug

```bash
git bisect bad [<commit>]
git bisect good [<commit>...]
```

- `git bisect bad`: Mark current (or specific) commit as having bug
- `git bisect good`: Mark current (or specific) commit as not having bug

#### Ví dụ / Examples

**Quy trình bisect hoàn chỉnh:**

```bash
# 1. Bắt đầu bisect
git bisect start HEAD v1.0.0

# 2. Git checkout commit ở giữa
Bisecting: 5 revisions left to test after this (roughly 2 steps)
[abc1234] Add feature X

# 3. Test commit này
npm test
# ... test fails ...

# 4. Đánh giá là bad
git bisect bad

# 5. Git tiếp tục chia đôi
Bisecting: 2 revisions left to test after this (roughly 1 step)
[def5678] Update dependencies

# 6. Test commit này
npm test
# ... test passes ...

# 7. Đánh giá là good
git bisect good

# 8. Git tiếp tục chia đôi
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[ghi9012] Refactor code

# 9. Test commit này
npm test
# ... test fails ...

# 10. Đánh giá là bad
git bisect bad

# 11. Kết quả
ghi9012 is the first bad commit
```

**Đánh giá commit cụ thể:**

```bash
# Nếu bạn biết một commit cụ thể là good/bad
git bisect good abc1234
git bisect bad def5678
```

#### Best Practices

1. **Test kỹ từng commit** trước khi đánh giá
2. **Chỉ đánh giá khi chắc chắn** về kết quả
3. **Sử dụng test tự động** khi có thể
4. **Ghi chú lại kết quả** nếu cần

5. **Test each commit thoroughly** before evaluating
6. **Only evaluate when certain** about result
7. **Use automated tests** when possible
8. **Note down results** if needed

#### Anti-patterns

- ❌ Đánh giá mà không test kỹ
- ❌ Đánh giá sai do không chắc chắn
- ❌ Bỏ qua commit mà không đánh giá
- ❌ Đánh giá ngẫu nhiên

- ❌ Evaluate without thorough testing
- ❌ Evaluate incorrectly due to uncertainty
- ❌ Skip commit without evaluating
- ❌ Evaluate randomly

---

### Q4: `git bisect run` làm gì? / What does `git bisect run` do?

#### Mục đích / Purpose

Biết cách tự động hóa quá trình bisect với script.

Know how to automate bisect process with script.

#### Khi nào dùng / When to use

- Khi có test script có thể chạy tự động
- Khi muốn tránh đánh giá thủ công
- Khi cần bisect nhiều lần

- When having automated test script
- When wanting to avoid manual evaluation
- When needing to bisect multiple times

#### Giá trị gì / Benefits

- Tự động hóa hoàn toàn quá trình
- Giảm thời gian và công sức
- Tránh sai sót do con người
- Có thể chạy trong background

- Fully automate process
- Reduce time and effort
- Avoid human errors
- Can run in background

#### Định nghĩa / Definition

`git bisect run` chạy một script để tự động đánh giá các commits:

```bash
git bisect run <command>
```

Script phải trả về:

- 0: Commit là good (không có bug)
- 1-125 (trừ 127): Commit là bad (có bug)
- 127: Script bị lỗi

`git bisect run` runs a script to automatically evaluate commits:

```bash
git bisect run <command>
```

Script must return:

- 0: Commit is good (no bug)
- 1-125 (except 127): Commit is bad (has bug)
- 127: Script error

#### Ví dụ / Examples

**Sử dụng test script:**

```bash
# Bắt đầu bisect
git bisect start HEAD v1.0.0

# Chạy test tự động
git bisect run npm test

# Git sẽ tự động đánh giá từng commit
Bisecting: 5 revisions left to test after this (roughly 2 steps)
[abc1234] Add feature X
running 'npm test'
...

Bisecting: 2 revisions left to test after this (roughly 1 step)
[def5678] Update dependencies
running 'npm test'
...

# Kết quả
ghi9012 is the first bad commit
```

**Script tùy chỉnh:**

```bash
# Tạo script test.sh
#!/bin/bash
npm run build
if [ $? -eq 0 ]; then
    npm test
else
    exit 1  # Build failed = bad
fi

# Chạy script
git bisect run ./test.sh
```

**Test cụ thể:**

```bash
# Chạy test cụ thể
git bisect run npm test -- --grep "authentication"

# Chạy lệnh shell
git bisect run sh -c 'npm run build && npm test'
```

**Script Python:**

```bash
# Tạo script check_bug.py
#!/usr/bin/env python3
import subprocess

result = subprocess.run(['npm', 'test'])
exit(result.returncode)

# Chạy script
git bisect run python3 check_bug.py
```

#### Best Practices

1. **Script phải trả về exit code đúng**
2. **Test nhanh** để không mất thời gian
3. **Xử lý lỗi** trong script
4. **Test script trước** khi dùng với bisect
5. **Log output** để debug nếu cần

6. **Script must return correct exit code**
7. **Fast tests** to save time
8. **Handle errors** in script
9. **Test script first** before using with bisect
10. **Log output** for debugging if needed

#### Anti-patterns

- ❌ Script không trả về exit code đúng
- ❌ Test quá lâu
- ❌ Không xử lý lỗi trong script
- ❌ Script không đáng tin cậy
- ❌ Không test script trước khi dùng

- ❌ Script doesn't return correct exit code
- ❌ Tests too long
- ❌ Don't handle errors in script
- ❌ Script is unreliable
- ❌ Don't test script before using

---

### Q5: `git bisect reset` làm gì? / What does `git bisect reset` do?

#### Mục đích / Purpose

Biết cách kết thúc và reset quá trình bisect.

Know how to end and reset bisect process.

#### Khi nào dùng / When to use

- Sau khi tìm được commit gây bug
- Khi muốn hủy bỏ bisect
- Khi muốn thử lại từ đầu

- After finding the bug-causing commit
- When wanting to cancel bisect
- When wanting to retry from beginning

#### Giá trị gì / Benefits

- Quay về trạng thái ban đầu
- Dọn dẹp trạng thái bisect
- Có thể thử lại với tham số khác

- Return to initial state
- Clean up bisect state
- Can retry with different parameters

#### Định nghĩa / Definition

`git bisect reset` kết thúc quá trình bisect và quay về branch ban đầu:

```bash
git bisect reset [<commit>]
```

- Nếu không chỉ định commit: quay về branch trước khi start bisect
- Nếu chỉ định commit: checkout commit đó

`git bisect reset` ends bisect process and returns to original branch:

```bash
git bisect reset [<commit>]
```

- If no commit specified: return to branch before bisect start
- If commit specified: checkout that commit

#### Ví dụ / Examples

**Reset sau khi hoàn thành:**

```bash
# Sau khi tìm được commit gây bug
ghi9012 is the first bad commit

# Reset về branch ban đầu
git bisect reset
Previous HEAD position was abc1234 Fix authentication bug
Switched to branch 'feature-auth'

# Kiểm tra trạng thái
git status
On branch feature-auth
nothing to commit, working tree clean
```

**Reset về commit cụ thể:**

```bash
# Reset về commit good
git bisect reset v1.0.0
```

**Hủy bỏ bisect giữa chừng:**

```bash
# Trong quá trình bisect, muốn hủy bỏ
git bisect reset
```

**Kiểm tra trạng thái bisect:**

```bash
# Xem trạng thái hiện tại
git bisect status

# Xem log bisect
git bisect log
```

#### Best Practices

1. **Luôn reset** sau khi hoàn thành bisect
2. **Lưu lại kết quả** trước khi reset
3. **Kiểm tra trạng thái** sau khi reset
4. **Reset trước khi bắt đầu bisect mới**

5. **Always reset** after completing bisect
6. **Save results** before resetting
7. **Check status** after resetting
8. **Reset before starting new bisect**

#### Anti-patterns

- ❌ Quên reset sau khi xong
- ❌ Không lưu kết quả trước khi reset
- ❌ Bắt đầu bisect mới mà chưa reset
- ❌ Không kiểm tra trạng thái sau reset

- ❌ Forget to reset when done
- ❌ Don't save results before resetting
- ❌ Start new bisect without resetting
- ❌ Don't check status after reset

---

### Q6: Binary search for bugs hoạt động như thế nào? / How does binary search for bugs work?

#### Mục đích / Purpose

Hiểu nguyên lý hoạt động của binary search trong git bisect.

Understand the principle of binary search in git bisect.

#### Khi nào dùng / When to use

Khi muốn hiểu sâu về cơ chế của git bisect.

When wanting to deeply understand git bisect mechanism.

#### Giá trị gì / Benefits

- Hiểu tại sao bisect nhanh
- Có thể giải thích cho người khác
- Áp dụng binary search vào các vấn đề khác

- Understand why bisect is fast
- Can explain to others
- Apply binary search to other problems

#### Định nghĩa / Definition

Binary search là thuật toán tìm kiếm với độ phức tạp O(log n):

```
Giả sử có 16 commits từ good đến bad:

Step 1: Chia đôi → 8 commits còn lại
Step 2: Chia đôi → 4 commits còn lại
Step 3: Chia đôi → 2 commits còn lại
Step 4: Chia đôi → 1 commit (tìm được!)

Chỉ cần 4 bước thay vì 16 bước (linear search)
```

Binary search is a search algorithm with O(log n) complexity:

```
Suppose there are 16 commits from good to bad:

Step 1: Halve → 8 commits left
Step 2: Halve → 4 commits left
Step 3: Halve → 2 commits left
Step 4: Halve → 1 commit (found!)

Only need 4 steps instead of 16 steps (linear search)
```

#### Ví dụ / Examples

**Ví dụ cụ thể với 8 commits:**

```
Good (v1.0) ---- Bad (HEAD)
  ↓
  C1 - C2 - C3 - C4 - C5 - C6 - C7 - C8
  (không bug)              (có bug)

Step 1: Test C4 (giữa)
  → C4 có bug → loại bỏ C5-C8
  → Còn lại: C1-C4

Step 2: Test C2 (giữa C1-C4)
  → C2 không bug → loại bỏ C1-C2
  → Còn lại: C3-C4

Step 3: Test C3 (giữa C3-C4)
  → C3 không bug → loại bỏ C3
  → Còn lại: C4

Kết quả: C4 là commit gây bug
```

**So sánh số bước:**

```
Linear search (kiểm tra từng commit):
  8 commits = 8 bước

Binary search (git bisect):
  8 commits = log₂(8) = 3 bước
```

**Ví dụ thực tế:**

```bash
# 100 commits từ v1.0 đến HEAD
git bisect start HEAD v1.0

# Số bước tối đa: log₂(100) ≈ 7 bước
# Thay vì 100 bước với linear search!
```

#### Best Practices

1. **Hiểu nguyên lý** để sử dụng hiệu quả
2. **Chọn phạm vi tốt** để tối ưu số bước
3. **Sử dụng tags** để dễ xác định phạm vi
4. **Tin tưởng thuật toán** - nó luôn tìm được nếu có good và bad

5. **Understand principle** to use effectively
6. **Choose good range** to optimize steps
7. **Use tags** for easy range identification
8. **Trust algorithm** - it always finds if there's good and bad

#### Anti-patterns

- ❌ Không hiểu nguyên lý và dùng sai
- ❌ Chọn phạm vi quá rộng không cần thiết
- ❌ Không tin tưởng kết quả
- ❌ Dùng linear search thay vì bisect

- ❌ Don't understand principle and use incorrectly
- ❌ Choose unnecessarily wide range
- ❌ Don't trust results
- ❌ Use linear search instead of bisect

---

### Q7: Automated bisecting là gì? / What is automated bisecting?

#### Mục đích / Purpose

Biết cách tự động hóa hoàn toàn quá trình bisect.

Know how to fully automate bisect process.

#### Khi nào dùng / When to use

- Khi có test suite tự động
- Khi cần bisect nhiều lần
- Khi muốn chạy bisect trong CI/CD

- When having automated test suite
- When needing to bisect multiple times
- When wanting to run bisect in CI/CD

#### Giá trị gì / Benefits

- Không cần can thiệp thủ công
- Có thể chạy overnight
- Kết quả nhất quán
- Tích hợp được vào pipeline

- No manual intervention needed
- Can run overnight
- Consistent results
- Can integrate into pipeline

#### Định nghĩa / Definition

Automated bisecting sử dụng `git bisect run` với script tự động để đánh giá các commits:

```bash
git bisect start HEAD v1.0.0
git bisect run ./test-script.sh
git bisect reset
```

Automated bisecting uses `git bisect run` with automated script to evaluate commits:

```bash
git bisect start HEAD v1.0.0
git bisect run ./test-script.sh
git bisect reset
```

#### Ví dụ / Examples

**Script test đơn giản:**

```bash
#!/bin/bash
# test-bug.sh

# Build project
npm run build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Build failed"
    exit 1  # Bad
fi

# Run tests
npm test > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Tests passed"
    exit 0  # Good
else
    echo "Tests failed"
    exit 1  # Bad
fi
```

**Chạy automated bisect:**

```bash
# Make script executable
chmod +x test-bug.sh

# Run bisect
git bisect start HEAD v1.0.0
git bisect run ./test-bug.sh

# Kết quả
abc1234 is the first bad commit

# Reset
git bisect reset
```

**Script phức tạp hơn:**

```bash
#!/bin/bash
# test-specific-bug.sh

# Check specific bug condition
node -e "
const app = require('./app');
const result = app.calculate(1, 2);
if (result !== 3) {
    process.exit(1); // Bad
}
process.exit(0); // Good
"
```

**Tích hợp vào CI/CD:**

```yaml
# .github/workflows/find-bug.yml
name: Find Bug
on: [workflow_dispatch]

jobs:
  bisect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: |
          git bisect start HEAD v1.0.0
          git bisect run npm test
          git bisect reset
```

**Bisect với nhiều test cases:**

```bash
#!/bin/bash
# test-all.sh

# Run all tests
for test in tests/*.test.js; do
    npm test "$test"
    if [ $? -ne 0 ]; then
        exit 1  # Bad
    fi
done

exit 0  # Good
```

#### Best Practices

1. **Script phải đáng tin cậy** và nhất quán
2. **Xử lý tất cả lỗi** trong script
3. **Log output** để debug
4. **Test script** trước khi dùng với bisect
5. **Tối ưu thời gian chạy** của script

6. **Script must be reliable** and consistent
7. **Handle all errors** in script
8. **Log output** for debugging
9. **Test script** before using with bisect
10. **Optimize script run time**

#### Anti-patterns

- ❌ Script không đáng tin cậy
- ❌ Không xử lý lỗi
- ❌ Script chạy quá lâu
- ❌ Không test script trước khi dùng
- ❌ Script có side effects

- ❌ Script is unreliable
- ❌ Don't handle errors
- ❌ Script runs too long
- ❌ Don't test script before using
- ❌ Script has side effects

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **`git bisect`** sử dụng binary search để tìm commit gây bug nhanh chóng
2. **`git bisect start`** bắt đầu quá trình bisect
3. **`git bisect bad/good`** đánh giá các commits trong quá trình bisect
4. **`git bisect run`** tự động hóa quá trình với script
5. **`git bisect reset`** kết thúc và reset về trạng thái ban đầu
6. **Binary search** giảm số bước từ O(n) xuống O(log n)
7. **Automated bisecting** cho phép chạy không cần can thiệp thủ công

8. **`git bisect`** uses binary search to quickly find bug-causing commit
9. **`git bisect start`** starts bisect process
10. **`git bisect bad/good`** evaluate commits during bisect
11. **`git bisect run`** automates process with script
12. **`git bisect reset`** ends and resets to initial state
13. **Binary search** reduces steps from O(n) to O(log n)
14. **Automated bisecting** allows running without manual intervention

### Commands Reference / Tham khảo lệnh

```bash
# Bắt đầu bisect
git bisect start
git bisect start <bad> <good>

# Đánh giá commits
git bisect bad
git bisect good
git bisect bad <commit>
git bisect good <commit>

# Tự động hóa
git bisect run <command>

# Kết thúc
git bisect reset
git bisect reset <commit>

# Kiểm tra trạng thái
git bisect status
git bisect log

# Các lệnh khác
git bisect skip      # Bỏ qua commit hiện tại
git bisect visualize   # Hiển thị graph
git bisect replay     # Replay bisect log
```

### Best Practices / Thực hành tốt nhất

1. **Chuẩn bị test case** rõ ràng trước khi bắt đầu
2. **Biết chắc một commit good và một commit bad**
3. **Test kỹ từng commit** trước khi đánh giá
4. **Luôn reset** sau khi hoàn thành bisect
5. **Sử dụng automated bisecting** khi có thể
6. **Script phải đáng tin cậy** và trả về exit code đúng
7. **Tối ưu thời gian chạy** của test script

8. **Prepare clear test case** before starting
9. **Know for sure one good and one bad commit**
10. **Test each commit thoroughly** before evaluating
11. **Always reset** after completing bisect
12. **Use automated bisecting** when possible
13. **Script must be reliable** and return correct exit code
14. **Optimize test script run time**
