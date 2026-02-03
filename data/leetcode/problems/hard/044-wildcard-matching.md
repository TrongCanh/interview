# Wildcard Matching / Khớp Wildcard

> LeetCode Problem 44 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 44
- **URL:** https://leetcode.com/problems/wildcard-matching/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** String, Dynamic Programming, Recursion
- **Tags:** String, Dynamic Programming, Recursion, Greedy
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming, Recursion, String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an input string (`s`) and a pattern (`p`), implement wildcard matching with support for `'?'` and `'*'` where:

- `'?'` Matches any single character.
- `'*'` Matches any sequence of characters (including an empty sequence).

The matching should cover the **entire** input string (not partial).

**Example 1:**

```
Input: s = "aa", p = "a"
Output: false
Explanation: 'a' does not match the entire string "aa".
```

**Example 2:**

```
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
```

**Example 3:**

```
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c' but 'a' does not match 'b'.
```

**Constraints:**

- `1 <= s.length, p.length <= 2000`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'?'`, and `'*'`.
- It is guaranteed for each appearance of the character `'*'`, there will be a previous valid character to match.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `s` và pattern `p` với `?` và `*`
- **Output:** `true` nếu pattern khớp toàn bộ chuỗi, `false` nếu không
- **Ràng buộc / Constraints:**
  - `?` khớp bất kỳ ký tự đơn
  - `*` khớp bất kỳ chuỗi (bao gồm rỗng)
  - Pattern phải khớp toàn bộ chuỗi
- **Edge cases:**
  - Pattern rỗng
  - Chuỗi rỗng
  - Pattern chỉ có `*`
  - Nhiều `*` liên tiếp

### 2. Tư duy / Thinking Process

- **Bước 1:** Có thể dùng DP với dp[i][j] = true nếu s[0...i] khớp p[0...j].
- **Bước 2:** Có thể dùng Greedy để xử lý `*` liên tiếp.
- **Bước 3:** Tối ưu bằng cách xử lý `*` liên tiếp thành một `*`.

### 3. Ví dụ minh họa / Examples

```
Example: s = "adceb", p = "*a*b"

Với DP:
- dp[i][j] = true nếu s[0...i] khớp p[0...j]
- dp[4][3] = true vì "adce" khớp "*a*b"
- dp[4][4] = true vì "adceb" khớp "*a*b"

Kết quả: dp[4][4] = true
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy để thử tất cả các khả năng khớp.

### Thuật toán / Algorithm

1. Nếu cả hai chuỗi rỗng, trả về true
2. Nếu pattern[0] là `*`, kiểm tra xem s có rỗng hoặc chỉ có ký tự khớp với `*`
3. Nếu pattern[0] là `?` hoặc ký tự:
   - Khớp ký tự đầu tiên
   - Đệ quy với phần còn lại
4. Nếu không khớp, trả về false

### Code / Implementation

```javascript
/**
 * Wildcard Matching - Brute Force (Recursive)
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_bruteForce(s, p) {
  // Both empty
  if (s.length === 0 && p.length === 0) return true;
  if (p.length === 0) return s.length === 0;

  return isMatchHelper_bruteForce(s, p, 0, 0);
}

/**
 * Helper function for recursive matching
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @param {number} sIdx - Index in string s
 * @param {number} pIdx - Index in pattern p
 * @return {boolean} - True if matches
 */
function isMatchHelper_bruteForce(s, p, sIdx, pIdx) {
  // Base case: both reached end
  if (sIdx === s.length && pIdx === p.length) return true;

  // Handle consecutive '*'
  while (pIdx < p.length && p[pIdx] === "*") {
    const nextPIdx = pIdx + 1;

    // Skip consecutive '*'
    while (nextPIdx < p.length && p[nextPIdx] === "*") {
      nextPIdx++;
    }

    pIdx = nextPIdx;
  }

  // Check if characters match or pattern has '?'
  if (pIdx < p.length && p[pIdx] === "?") {
    return isMatchHelper_bruteForce(s, p, sIdx + 1, pIdx + 1);
  }

  // Characters must match
  if (sIdx < s.length && pIdx < p.length && p[pIdx] !== s[sIdx]) {
    return false;
  }

  // Move to next characters
  return isMatchHelper_bruteForce(s, p, sIdx + 1, pIdx + 1);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(2^(m+n)) - trường hợp xấu nhất
- **Space Complexity:** O(m+n) - stack đệ quy

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Không tối ưu
- Có thể gây stack overflow với chuỗi dài

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp đệ quy tính toán lại nhiều lần.
- Điểm yếu của giải pháp 1? Không xử lý `*` liên tiếp hiệu quả.
- Cách tiếp cận mới? Sử dụng DP để lưu kết quả các bài toán con.

### Ý tưởng / Idea

Sử dụng DP 2D: dp[i][j] = true nếu s[0...i] khớp p[0...j].

### Thuật toán / Algorithm

1. Khởi tạo dp với dp[p.length+1][s.length+1] = false
2. Xử lý trường hợp đặc biệt:
   - dp[0][0] = true (cả hai rỗng)
   - Nếu p chỉ có `*`, kiểm tra s có rỗng hoặc chỉ có ký tự khớp
3. Tính dp:
   - Nếu p[j-1] == `*` hoặc p[j-1] == `?`:
     - dp[i][j] = dp[i-1][j-1] || dp[i][j-1]
   - Nếu không:
     - dp[i][j] = dp[i-1][j] && (s[i-1] === p[j-1] || p[j-1] === '?')
4. Trả về dp[p.length][s.length]

### Code / Implementation

```javascript
/**
 * Wildcard Matching - DP Solution
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_dp(s, p) {
  const m = s.length,
    n = p.length;

  // Create DP table
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

  // Base case: both empty
  dp[0][0] = true;

  // Handle pattern with only '*'
  if (p === "*") {
    return s.length === 0;
  }

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else if (p[j - 1] === "?" || s[i - 1] === p[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] || dp[i][j];
      }
    }
  }

  return dp[m][n];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m \* n) - điền bảng DP
- **Space Complexity:** O(m \* n) - cho bảng DP

### Ưu điểm / Pros

- Tối ưu hơn đệ quy
- Không lo stack overflow

### Nhược điểm / Cons

- Tốn nhiều bộ nhớ cho bảng DP

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, tối ưu không gian DP.
- Có thuật toán/pattern nào phù hợp hơn? Đây là bài toán DP kinh điển.

### Ý tưởng / Idea

Tối ưu không gian bằng cách chỉ lưu hai hàng trước của DP.

### Thuật toán / Algorithm

Tương tự giải pháp 2 nhưng chỉ lưu 2 hàng thay vì cả bảng.

### Code / Implementation

```javascript
/**
 * Wildcard Matching - Space Optimized DP
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_dpOptimized(s, p) {
  const m = s.length,
    n = p.length;

  // Only keep 2 rows
  let prevRow = new Array(n + 1).fill(false);
  let currRow = new Array(n + 1).fill(false);

  // Base case
  prevRow[0] = true;

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        currRow[j] = prevRow[j] || currRow[j - 1];
      } else if (p[j - 1] === "?" || s[i - 1] === p[j - 1]) {
        currRow[j] = prevRow[j - 1];
      }
    }

    // Swap rows
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[n];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m \* n)
- **Space Complexity:** O(n) - chỉ lưu 2 hàng

### Ưu điểm / Pros

- Tối ưu không gian
- Vẫn đạt O(m \* n) thời gian

### Nhược điểm / Cons

- Phức tạp hơn để hiểu
- Cần quản lý việc swap hàng

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution    | Time       | Space   | Độ khó / Difficulty | Khi nào dùng / When to use       |
| ----------------------- | ---------- | ------- | ------------------- | -------------------------------- |
| Brute Force (Recursive) | O(2^(m+n)) | O(m+n)  | Dễ / Easy           | Prototype, chuỗi ngắn            |
| DP                      | O(m\*n)    | O(m\*n) | Khó / Hard          | Chuỗi dài, cần tối ưu            |
| Space Optimized DP      | O(m\*n)    | O(n)    | Khó / Hard          | Chuỗi rất dài, cần tối ưu bộ nhớ |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "aa";
const p = "a";
const result = isMatch_dp(s, p);
const expected = false;
console.log(result === expected); // true
```

### Test Case 2: Pattern chỉ có \* / Only asterisk

```javascript
const s = "abc";
const p = "*";
const result = isMatch_dp(s, p);
const expected = true;
console.log(result === expected); // true
```

### Test Case 3: Có ? / With question mark

```javascript
const s = "cb";
const p = "?a";
const result = isMatch_dp(s, p);
const expected = false;
console.log(result === expected); // true
```

### Test Case 4: Nhiều \* / Multiple asterisks

```javascript
const s = "acdcb";
const p = "a*c?b";
const result = isMatch_dp(s, p);
const expected = true;
console.log(result === expected); // true
```

### Test Case 5: Chuỗi rỗng / Empty string

```javascript
const s = "";
const p = "*";
const result = isMatch_dp(s, p);
const expected = true;
console.log(result === expected); // true
```

### Test Case 6: Pattern rỗng / Empty pattern

```javascript
const s = "abc";
const p = "";
const result = isMatch_dp(s, p);
const expected = false;
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Dynamic Programming](../algorithms/dynamic-programming/dp-basics.md)
  - [Recursion](../algorithms/algorithms/recursion.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - None
