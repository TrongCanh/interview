# Git Blame / Git Blame

> Hướng dẫn chi tiết về cách sử dụng git blame để theo dõi lịch sử thay đổi của từng dòng code / Comprehensive guide to using git blame to track change history of each line of code

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách sử dụng `git blame` để tìm ra ai đã thay đổi từng dòng code và khi nào.

Understand how to use `git blame` to find who changed each line of code and when.

### Khi nào cần hiểu / When to understand

- Khi cần tìm người chịu trách nhiệm cho một dòng code
- Khi muốn hiểu lịch sử thay đổi của file
- Khi debug và cần biết context của code
- Khi code review và muốn biết ai đã viết code

- When needing to find person responsible for a line of code
- When wanting to understand file change history
- When debugging and needing code context
- When doing code review and wanting to know who wrote code

### Giá trị gì / Benefits

- Tìm nhanh người chịu trách nhiệm
- Hiểu context và lý do của code
- Hỗ trợ debugging hiệu quả
- Cải thiện communication trong team
- Học từ lịch sử code

- Quickly find responsible person
- Understand context and reason for code
- Support effective debugging
- Improve team communication
- Learn from code history

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Xem lịch sử từng dòng code
- Tìm người chịu trách nhiệm nhanh
- Có nhiều options để tùy chỉnh
- Tích hợp sẵn trong Git

**Nhược điểm / Cons:**

- Không phù hợp để "blame" người khác
- Output có thể dài và khó đọc
- Không hiển thị context đầy đủ
- Có thể bị ảnh hưởng bởi rebase/rewrite

**Pros:**

- View history of each line of code
- Quickly find responsible person
- Many options for customization
- Built into Git

**Cons:**

- Not suitable for "blaming" others
- Output can be long and hard to read
- Doesn't show full context
- Can be affected by rebase/rewrite

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: `git blame filename` làm gì? / What does `git blame filename` do?

#### Mục đích / Purpose

Biết cách sử dụng git blame cơ bản để xem lịch sử thay đổi của file.

Know how to use basic git blame to view file change history.

#### Khi nào dùng / When to use

Khi cần biết ai đã thay đổi từng dòng trong một file.

When needing to know who changed each line in a file.

#### Giá trị gì / Benefits

- Xem lịch sử từng dòng code
- Tìm người chịu trách nhiệm nhanh
- Hiểu context của thay đổi

- View history of each line of code
- Quickly find responsible person
- Understand context of changes

#### Định nghĩa / Definition

`git blame filename` hiển thị thông tin về commit và author cho từng dòng trong file:

```bash
git blame <filename>
```

Output bao gồm:

- Commit hash
- Author name
- Timestamp
- Line number
- Nội dung dòng code

`git blame filename` displays information about commit and author for each line in file:

```bash
git blame <filename>
```

Output includes:

- Commit hash
- Author name
- Timestamp
- Line number
- Line content

#### Ví dụ / Examples

**Ví dụ cơ bản:**

```bash
$ git blame src/app.js

abc1234f (John Doe 2024-01-15 10:30:45 +0700  1) const express = require('express');
def5678a (Jane Smith 2024-01-16 14:20:30 +0700  2) const app = express();
ghi9012b (John Doe 2024-01-17 09:15:22 +0700  3)
jkl3456c (Jane Smith 2024-01-18 16:45:10 +0700  4) app.get('/', (req, res) => {
mno7890d (Bob Wilson 2024-01-19 11:30:00 +0700  5)     res.send('Hello World');
pqr1234e (John Doe 2024-01-20 08:00:00 +0700  6) });
```

**Đọc output:**

```
abc1234f (John Doe 2024-01-15 10:30:45 +0700  1) const express = require('express');
│         │         │                                     │    │
│         │         │                                     │    └─ Line number
│         │         │                                     └─────── Line content
│         │         └─────────────────────────────────────────────── Timestamp
│         └────────────────────────────────────────────────────── Author
└─────────────────────────────────────────────────────────────── Commit hash
```

**Xem chi tiết commit:**

```bash
# Copy commit hash và xem chi tiết
git show abc1234f
```

#### Best Practices

1. **Dùng để hiểu context**, không phải để "blame"
2. **Xem chi tiết commit** nếu cần hiểu thêm
3. **Kết hợp với git log** để có bức tranh đầy đủ
4. **Sử dụng options** để lọc kết quả

5. **Use to understand context**, not to "blame"
6. **View commit details** if needing more understanding
7. **Combine with git log** for full picture
8. **Use options** to filter results

#### Anti-patterns

- ❌ Dùng để chỉ trích người khác
- ❌ Không xem context trước khi kết luận
- ❌ Kết luận dựa trên một dòng code
- ❌ Không hiểu output của git blame

- ❌ Use to criticize others
- ❌ Don't view context before concluding
- ❌ Conclude based on one line of code
- ❌ Don't understand git blame output

---

### Q2: `git blame -L start,end filename` làm gì? / What does `git blame -L start,end filename` do?

#### Mục đích / Purpose

Biết cách giới hạn phạm vi dòng khi sử dụng git blame.

Know how to limit line range when using git blame.

#### Khi nào dùng / When to use

- Khi chỉ quan tâm đến một phần của file
- Khi file quá dài và output quá nhiều
- Khi cần xem một function cụ thể

- When only interested in part of file
- When file is too long and output is too much
- When needing to view specific function

#### Giá trị gì / Benefits

- Output ngắn gọn hơn
- Tập trung vào phần cần thiết
- Dễ đọc hơn

- Shorter output
- Focus on needed part
- Easier to read

#### Định nghĩa / Definition

`-L` option giới hạn phạm vi dòng:

```bash
git blame -L <start>,<end> <filename>
# Hoặc
git blame -L <start>,<filename>  # từ start đến cuối file
```

`-L` option limits line range:

```bash
git blame -L <start>,<end> <filename>
# Or
git blame -L <start>,<filename>  # from start to end of file
```

#### Ví dụ / Examples

**Giới hạn phạm vi:**

```bash
# Xem dòng 10-20
git blame -L 10,20 src/app.js

# Xem từ dòng 50 đến cuối
git blame -L 50, src/app.js

# Xem từ đầu đến dòng 30
git blame -L 1,30 src/app.js
```

**Xem một function cụ thể:**

```javascript
// src/utils.js
function calculateTotal(price, tax) {
  const subtotal = price;
  const taxAmount = price * tax;
  return subtotal + taxAmount;
}

function calculateDiscount(price, discount) {
  return price * (1 - discount);
}
```

```bash
# Xem function calculateTotal (dòng 1-5)
git blame -L 1,5 src/utils.js

abc1234 (John Doe 2024-01-15 10:30:45 1) function calculateTotal(price, tax) {
def5678 (Jane Smith 2024-01-16 14:20:30 2)     const subtotal = price;
ghi9012 (John Doe 2024-01-17 09:15:22 3)     const taxAmount = price * tax;
jkl3456 (Jane Smith 2024-01-18 16:45:10 4)     return subtotal + taxAmount;
mno7890 (Bob Wilson 2024-01-19 11:30:00 5) }
```

**Kết hợp với grep:**

```bash
# Tìm function và xem blame
grep -n "function calculateTotal" src/utils.js
# Output: 1:function calculateTotal(price, tax) {

git blame -L 1,5 src/utils.js
```

#### Best Practices

1. **Xác định phạm vi** trước khi chạy blame
2. **Sử dụng line numbers** từ editor
3. **Kết hợp với grep** để tìm function
4. **Lưu phạm vi** nếu cần xem lại

5. **Determine range** before running blame
6. **Use line numbers** from editor
7. **Combine with grep** to find function
8. **Save range** if needing to view again

#### Anti-patterns

- ❌ Xem toàn file khi chỉ cần một phần
- ❌ Không xác định phạm vi chính xác
- ❌ Dùng line numbers sai
- ❌ Không kết hợp với grep

- ❌ View entire file when only need part
- ❌ Don't determine exact range
- ❌ Use wrong line numbers
- ❌ Don't combine with grep

---

### Q3: `git blame -M` (detect moved lines) làm gì? / What does `git blame -M` do?

#### Mục đích / Purpose

Biết cách git blame phát hiện các dòng đã được di chuyển trong cùng file.

Know how git blame detects lines moved within same file.

#### Khi nào dùng / When to use

- Khi code đã được refactor và di chuyển
- Khi function đã được sắp xếp lại
- Khi muốn theo dõi code sau khi restructure

- When code has been refactored and moved
- When function has been reorganized
- When wanting to track code after restructuring

#### Giá trị gì / Benefits

- Theo dõi code chính xác hơn
- Hiểu lịch sử thay đổi tốt hơn
- Không bị mất track khi code di chuyển

- Track code more accurately
- Better understand change history
- Don't lose track when code moves

#### Định nghĩa / Definition

`-M` option phát hiện các dòng đã được di chuyển trong cùng file:

```bash
git blame -M <filename>
```

Git sẽ cố gắng match các dòng đã được di chuyển với commit gốc.

`-M` option detects lines moved within same file:

```bash
git blame -M <filename>
```

Git will try to match moved lines with original commit.

#### Ví dụ / Examples

**Trước khi refactor:**

```javascript
// src/app.js (commit abc1234)
function calculateTotal(price, tax) {
  const subtotal = price;
  const taxAmount = price * tax;
  return subtotal + taxAmount;
}

function calculateDiscount(price, discount) {
  return price * (1 - discount);
}
```

**Sau khi refactor (di chuyển calculateTotal xuống dưới):**

```javascript
// src/app.js (commit def5678)
function calculateDiscount(price, discount) {
  return price * (1 - discount);
}

function calculateTotal(price, tax) {
  const subtotal = price;
  const taxAmount = price * tax;
  return subtotal + taxAmount;
}
```

**Không dùng -M:**

```bash
$ git blame src/app.js

def5678 (Jane Smith 2024-01-20 10:00:00 1) function calculateDiscount(price, discount) {
def5678 (Jane Smith 2024-01-20 10:00:00 2)     return price * (1 - discount);
def5678 (Jane Smith 2024-01-20 10:00:00 3) }
def5678 (Jane Smith 2024-01-20 10:00:00 4)
def5678 (Jane Smith 2024-01-20 10:00:00 5) function calculateTotal(price, tax) {
def5678 (Jane Smith 2024-01-20 10:00:00 6)     const subtotal = price;
def5678 (Jane Smith 2024-01-20 10:00:00 7)     const taxAmount = price * tax;
def5678 (Jane Smith 2024-01-20 10:00:00 8)     return subtotal + taxAmount;
def5678 (Jane Smith 2024-01-20 10:00:00 9) }
```

**Dùng -M:**

```bash
$ git blame -M src/app.js

def5678 (Jane Smith 2024-01-20 10:00:00 1) function calculateDiscount(price, discount) {
def5678 (Jane Smith 2024-01-20 10:00:00 2)     return price * (1 - discount);
def5678 (Jane Smith 2024-01-20 10:00:00 3) }
def5678 (Jane Smith 2024-01-20 10:00:00 4)
abc1234 (John Doe 2024-01-15 10:30:45 5) function calculateTotal(price, tax) {
abc1234 (John Doe 2024-01-15 10:30:45 6)     const subtotal = price;
abc1234 (John Doe 2024-01-15 10:30:45 7)     const taxAmount = price * tax;
abc1234 (John Doe 2024-01-15 10:30:45 8)     return subtotal + taxAmount;
abc1234 (John Doe 2024-01-15 10:30:45 9) }
```

#### Best Practices

1. **Luôn dùng -M** khi xem file đã refactor
2. **Hiểu giới hạn** của -M (chỉ trong cùng file)
3. **Kết hợp với -C** để detect copy
4. **Test với và không có -M** để so sánh

5. **Always use -M** when viewing refactored files
6. **Understand limitation** of -M (only within same file)
7. **Combine with -C** to detect copy
8. **Test with and without -M** to compare

#### Anti-patterns

- ❌ Không dùng -M khi file đã refactor
- ❌ Mong đợi -M hoạt động giữa các file
- ❌ Không hiểu output của -M
- ❌ Dùng -M khi không cần thiết

- ❌ Don't use -M when file has been refactored
- ❌ Expect -M to work across files
- ❌ Don't understand output of -M
- ❌ Use -M when not necessary

---

### Q4: `git blame -C` (detect copied lines) làm gì? / What does `git blame -C` do?

#### Mục đích / Purpose

Biết cách git blame phát hiện các dòng đã được copy từ file khác.

Know how git blame detects lines copied from other files.

#### Khi nào dùng / When to use

- Khi code đã được copy từ file khác
- Khi function đã được extract sang file mới
- Khi muốn theo dõi code qua các file

- When code has been copied from other file
- When function has been extracted to new file
- When wanting to track code across files

#### Giá trị gì / Benefits

- Theo dõi code qua các file khác nhau
- Hiểu nguồn gốc của code
- Không mất track khi code được copy

- Track code across different files
- Understand code origin
- Don't lose track when code is copied

#### Định nghĩa / Definition

`-C` option phát hiện các dòng đã được copy từ file khác:

```bash
git blame -C <filename>
```

Git sẽ tìm kiếm các dòng tương tự trong các file khác để xác định nguồn gốc.

`-C` option detects lines copied from other files:

```bash
git blame -C <filename>
```

Git will search for similar lines in other files to determine origin.

#### Ví dụ / Examples

**Trước khi extract:**

```javascript
// src/app.js (commit abc1234)
function calculateTotal(price, tax) {
  const subtotal = price;
  const taxAmount = price * tax;
  return subtotal + taxAmount;
}

function calculateDiscount(price, discount) {
  return price * (1 - discount);
}
```

**Sau khi extract sang file mới:**

```javascript
// src/app.js (commit def5678)
function calculateDiscount(price, discount) {
  return price * (1 - discount);
}
```

```javascript
// src/utils.js (commit def5678)
function calculateTotal(price, tax) {
  const subtotal = price;
  const taxAmount = price * tax;
  return subtotal + taxAmount;
}
```

**Không dùng -C:**

```bash
$ git blame src/utils.js

def5678 (Jane Smith 2024-01-20 10:00:00 1) function calculateTotal(price, tax) {
def5678 (Jane Smith 2024-01-20 10:00:00 2)     const subtotal = price;
def5678 (Jane Smith 2024-01-20 10:00:00 3)     const taxAmount = price * tax;
def5678 (Jane Smith 2024-01-20 10:00:00 4)     return subtotal + taxAmount;
def5678 (Jane Smith 2024-01-20 10:00:00 5) }
```

**Dùng -C:**

```bash
$ git blame -C src/utils.js

abc1234 (John Doe 2024-01-15 10:30:45 1) function calculateTotal(price, tax) {
abc1234 (John Doe 2024-01-15 10:30:45 2)     const subtotal = price;
abc1234 (John Doe 2024-01-15 10:30:45 3)     const taxAmount = price * tax;
abc1234 (John Doe 2024-01-15 10:30:45 4)     return subtotal + taxAmount;
abc1234 (John Doe 2024-01-15 10:30:45 5) }
```

**Kết hợp -M và -C:**

```bash
# Detect cả move và copy
git blame -M -C src/utils.js
```

#### Best Practices

1. **Dùng -C** khi code đã được copy từ file khác
2. **Kết hợp -M và -C** cho comprehensive tracking
3. **Hiểu giới hạn** của -C (cần tương tự nhau)
4. **Test với và không có -C** để so sánh

5. **Use -C** when code has been copied from other file
6. **Combine -M and -C** for comprehensive tracking
7. **Understand limitation** of -C (needs similarity)
8. **Test with and without -C** to compare

#### Anti-patterns

- ❌ Không dùng -C khi code đã copy
- ❌ Mong đợi -C hoạt động với code đã thay đổi nhiều
- ❌ Không kết hợp -M và -C
- ❌ Dùng -C khi không cần thiết

- ❌ Don't use -C when code has been copied
- ❌ Expect -C to work with heavily changed code
- ❌ Don't combine -M and -C
- ❌ Use -C when not necessary

---

### Q5: Cách đọc output của git blame? / How to read git blame output?

#### Mục đích / Purpose

Hiểu cách đọc và phân tích output của git blame.

Understand how to read and analyze git blame output.

#### Khi nào dùng / When to use

Luôn cần khi sử dụng git blame để hiểu kết quả.

Always needed when using git blame to understand results.

#### Giá trị gì / Benefits

- Đọc output chính xác
- Hiểu thông tin mỗi phần
- Sử dụng kết quả hiệu quả

- Read output accurately
- Understand each part of information
- Use results effectively

#### Định nghĩa / Definition

Output format của git blame:

```
<commit-hash> (<author-name> <timestamp> <line-number>) <line-content>
```

Git blame output format:

```
<commit-hash> (<author-name> <timestamp> <line-number>) <line-content>
```

#### Ví dụ / Examples

**Output chi tiết:**

```bash
$ git blame src/app.js

abc1234f5 (John Doe 2024-01-15 10:30:45 +0700  1) const express = require('express');
def5678a9b (Jane Smith 2024-01-16 14:20:30 +0700  2) const app = express();
ghi9012c3d (John Doe 2024-01-17 09:15:22 +0700  3)
jkl3456d7e (Jane Smith 2024-01-18 16:45:10 +0700  4) app.get('/', (req, res) => {
mno7890e8f (Bob Wilson 2024-01-19 11:30:00 +0700  5)     res.send('Hello World');
pqr1234f9a (John Doe 2024-01-20 08:00:00 +0700  6) });
```

**Phân tích từng phần:**

```
abc1234f5 (John Doe 2024-01-15 10:30:45 +0700  1) const express = require('express');
│         │         │                                     │    │
│         │         │                                     │    └─ Line number
│         │         │                                     └─────── Line content
│         │         └─────────────────────────────────────────────── Timestamp (ISO 8601)
│         └────────────────────────────────────────────────────── Author name
└─────────────────────────────────────────────────────────────── Commit hash (short)
```

**Các trường hợp đặc biệt:**

```bash
# Dòng trống (không có commit)
^abc1234 (John Doe 2024-01-15 10:30:45  1)
# ^ = boundary commit (không có parent)

# Dòng đã được moved/copied
abc1234 (John Doe 2024-01-15 10:30:45  1) function example() {
def5678 (Jane Smith 2024-01-16 14:20:30  2)     // moved from line 5

# Commit không có author
abc1234 (Not Committed Yet 2024-01-15 10:30:45  1) const x = 1;
```

**Options để tùy chỉnh output:**

```bash
# Hiển thị commit hash đầy đủ
git blame --show-email src/app.js

# Hiển thị email thay vì tên
git blame -e src/app.js

# Hiển thị raw timestamp
git blame --date=raw src/app.js

# Hiển thị relative timestamp
git blame --date=relative src/app.js
```

#### Best Practices

1. **Hiểu từng phần** của output
2. **Sử dụng options** để tùy chỉnh khi cần
3. **Xem chi tiết commit** nếu cần hiểu thêm
4. **Kết hợp với git log** để có context đầy đủ

5. **Understand each part** of output
6. **Use options** to customize when needed
7. **View commit details** if needing more understanding
8. **Combine with git log** for full context

#### Anti-patterns

- ❌ Không hiểu output và kết luận sai
- ❌ Bỏ qua các trường hợp đặc biệt
- ❌ Không xem chi tiết commit
- ❌ Kết luận dựa trên một dòng

- ❌ Don't understand output and conclude incorrectly
- ❌ Ignore special cases
- ❌ Don't view commit details
- ❌ Conclude based on one line

---

### Q6: Khi nào nên dùng git blame? / When should you use git blame?

#### Mục đích / Purpose

Hiểu các tình huống phù hợp để sử dụng git blame.

Understand appropriate situations to use git blame.

#### Khi nào dùng / When to use

Khi cần hiểu lịch sử thay đổi của code hoặc tìm người chịu trách nhiệm.

When needing to understand code change history or find responsible person.

#### Giá trị gì / Benefits

- Sử dụng git blame đúng cách
- Tránh lạm dụng công cụ
- Cải thiện hiệu quả làm việc

- Use git blame correctly
- Avoid misusing tool
- Improve work efficiency

#### Định nghĩa / Definition

Git blame nên dùng trong các tình huống:

**Nên dùng:**

- Debug và cần hiểu context
- Code review và muốn biết lịch sử
- Học từ code cũ
- Tìm người để hỏi về code

**Không nên dùng:**

- Chỉ trích người khác
- Đánh giá performance dựa trên số commit
- Quyết định dựa trên một dòng code
- Khi code đã được rewrite hoàn toàn

Git blame should be used in these situations:

**Should use:**

- Debugging and needing context
- Code review and wanting history
- Learning from old code
- Finding person to ask about code

**Should not use:**

- Criticizing others
- Evaluating performance based on commit count
- Making decisions based on one line of code
- When code has been completely rewritten

#### Ví dụ / Examples

**Tình huống nên dùng:**

```bash
# 1. Debug - cần hiểu tại sao có dòng code này
git blame src/app.js
# Xem commit và hiểu lý do

# 2. Code review - muốn biết ai đã viết
git blame src/utils.js
# Hỏi author về logic

# 3. Học code - muốn hiểu lịch sử
git blame src/config.js
# Xem cách code đã phát triển
```

**Tình huống không nên dùng:**

```bash
# ❌ Chỉ trích người khác
git blame src/app.js
# "Tại sao John viết code tệ như vậy?"

# ❌ Đánh giá performance
git blame src/app.js
# "Jane không commit nhiều, chắc không làm việc"

# ❌ Quyết định dựa trên một dòng
git blame src/app.js
# "Dòng này do Bob viết, chắc là lỗi của anh ta"
```

**Best practices khi dùng git blame:**

```bash
# 1. Luôn xem chi tiết commit
git blame src/app.js
# Copy commit hash
git show abc1234

# 2. Hiểu context trước khi kết luận
git blame -L 10,20 src/app.js
# Xem cả function, không chỉ một dòng

# 3. Kết hợp với git log
git blame src/app.js
git log --oneline --follow src/app.js
# Xem lịch sử đầy đủ

# 4. Hỏi trực tiếp thay vì kết luận
git blame src/app.js
# "John, bạn có thể giải thích dòng này không?"
```

#### Best Practices

1. **Dùng để hiểu**, không phải để chỉ trích
2. **Luôn xem chi tiết commit** trước khi kết luận
3. **Hiểu context đầy đủ** của code
4. **Hỏi trực tiếp author** thay vì tự kết luận
5. **Kết hợp với git log** để có bức tranh đầy đủ

6. **Use to understand**, not to criticize
7. **Always view commit details** before concluding
8. **Understand full context** of code
9. **Ask author directly** instead of self-concluding
10. **Combine with git log** for full picture

#### Anti-patterns

- ❌ Dùng để chỉ trích người khác
- ❌ Kết luận mà không xem chi tiết commit
- ❌ Đánh giá dựa trên một dòng code
- ❌ Không hiểu context đầy đủ
- ❌ Không kết hợp với git log

- ❌ Use to criticize others
- ❌ Conclude without viewing commit details
- ❌ Evaluate based on one line of code
- ❌ Don't understand full context
- ❌ Don't combine with git log

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **`git blame`** hiển thị lịch sử thay đổi cho từng dòng code
2. **`git blame -L`** giới hạn phạm vi dòng để xem
3. **`git blame -M`** phát hiện các dòng đã được di chuyển trong cùng file
4. **`git blame -C`** phát hiện các dòng đã được copy từ file khác
5. **Output của git blame** bao gồm commit hash, author, timestamp, line number, content
6. **Nên dùng git blame** để hiểu context và debug, không phải để chỉ trích
7. **Kết hợp với git log** và git show để có bức tranh đầy đủ

8. **`git blame`** displays change history for each line of code
9. **`git blame -L`** limits line range to view
10. **`git blame -M`** detects lines moved within same file
11. **`git blame -C`** detects lines copied from other files
12. **Git blame output** includes commit hash, author, timestamp, line number, content
13. **Should use git blame** to understand context and debug, not to criticize
14. **Combine with git log** and git show for full picture

### Commands Reference / Tham khảo lệnh

```bash
# Cơ bản
git blame <filename>

# Giới hạn phạm vi
git blame -L <start>,<end> <filename>
git blame -L <start>,<filename>

# Detect moved/copied lines
git blame -M <filename>
git blame -C <filename>
git blame -M -C <filename>

# Tùy chỉnh output
git blame --show-email <filename>
git blame -e <filename>
git blame --date=raw <filename>
git blame --date=relative <filename>

# Xem chi tiết commit
git show <commit-hash>

# Kết hợp với git log
git log --oneline --follow <filename>
```

### Best Practices / Thực hành tốt nhất

1. **Dùng để hiểu context**, không phải để chỉ trích
2. **Luôn xem chi tiết commit** trước khi kết luận
3. **Sử dụng -M và -C** khi code đã refactor/copy
4. **Giới hạn phạm vi với -L** khi file quá dài
5. **Kết hợp với git log** để có bức tranh đầy đủ
6. **Hỏi trực tiếp author** thay vì tự kết luận
7. **Hiểu output format** để đọc chính xác

8. **Use to understand context**, not to criticize
9. **Always view commit details** before concluding
10. **Use -M and -C** when code has been refactored/copied
11. **Limit range with -L** when file is too long
12. **Combine with git log** for full picture
13. **Ask author directly** instead of self-concluding
14. **Understand output format** to read accurately
