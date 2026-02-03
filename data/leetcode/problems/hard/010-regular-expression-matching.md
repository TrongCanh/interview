# Regular Expression Matching / Khớp Biểu thức Chính quy

> LeetCode Problem 10 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 10
- **URL:** https://leetcode.com/problems/regular-expression-matching/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** String, Dynamic Programming, Recursion
- **Tags:** String, Dynamic Programming, Recursion
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming, Recursion, String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:

- `'.'` Matches any single character.
- `'*'` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

**Example 1:**

```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

**Example 2:**

```
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

**Example 3:**

```
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

**Constraints:**

- `1 <= s.length <= 20`
- `1 <= p.length <= 30`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'.'`, and `'*'`.
- It is guaranteed for each appearance of the character `'*'`, there will be a previous valid character to match.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `s` và pattern `p`
- **Output:** `true` nếu pattern khớp toàn bộ chuỗi, `false` nếu không
- **Ràng buộc / Constraints:**
  - `'.'` khớp bất kỳ ký tự đơn nào
  - `'*'` khớp 0 hoặc nhiều lần của ký tự trước nó
  - Pattern phải khớp toàn bộ chuỗi
- **Edge cases:**
  - Chuỗi rỗng
  - Pattern rỗng
  - Pattern có `*` ở đầu (không hợp lệ theo constraints)
  - Pattern có nhiều `*` liên tiếp

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu ý nghĩa của `.` và `*`. `.` đơn giản, `*` phức tạp hơn vì có thể khớp 0 hoặc nhiều lần.
- **Bước 2:** Xem xét các trường hợp khi gặp `*`:
  - Khớp 0 lần: bỏ qua pattern[i-1] và pattern[i] (cả `x*`)
  - Khớp 1 hoặc nhiều lần: nếu s[j-1] khớp với pattern[i-1], tiếp tục so sánh với cùng pattern
- **Bước 3:** Sử dụng DP để lưu trữ kết quả các bài toán con. dp[i][j] = true nếu pattern[0...i-1] khớp với s[0...j-1].

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "aa", p = "a*"
- dp[0][0] = true (rỗng khớp rỗng)
- dp[1][0] = false (pattern "a" không khớp rỗng)
- dp[2][0] = true (pattern "a*" khớp rỗng - dùng 0 lần 'a')
- dp[1][1] = true ('a' khớp 'a')
- dp[2][1] = true ('a*' khớp 'a' - dùng 1 lần 'a')
- dp[2][2] = true ('a*' khớp 'aa' - dùng 2 lần 'a')
```

```
Example 2: s = "ab", p = ".*"
- dp[0][0] = true
- dp[2][0] = true (".*" khớp rỗng)
- dp[1][1] = true ('.' khớp 'a')
- dp[2][1] = true ('.*' khớp 'a' - dùng 1 lần '.')
- dp[2][2] = true ('.*' khớp 'ab' - dùng 2 lần '.')
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng đệ quy để thử tất cả các khả năng khớp pattern với chuỗi.

### Thuật toán / Algorithm

1. Nếu pattern rỗng: trả về true nếu chuỗi cũng rỗng
2. Kiểm tra khớp ký tự đầu tiên
3. Nếu ký tự tiếp theo là `*`:
   - Thử khớp 0 lần (bỏ qua `x*`)
   - Hoặc khớp 1+ lần (nếu khớp, tiếp tục với cùng pattern)
4. Nếu không phải `*`, khớp và tiếp tục

### Code / Implementation

```javascript
/**
 * Regular Expression Matching - Brute Force (Recursive)
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_bruteForce(s, p) {
  return isMatchHelper(s, p, 0, 0);
}

/**
 * Helper function for recursive matching
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @param {number} i - Index in string s
 * @param {number} j - Index in pattern p
 * @return {boolean} - True if pattern matches from these positions
 */
function isMatchHelper(s, p, i, j) {
  // Base case: pattern exhausted
  if (j === p.length) {
    return i === s.length;
  }

  // Check if current characters match
  const firstMatch = i < s.length && (p[j] === s[i] || p[j] === ".");

  // Handle '*' (need to check next character)
  if (j + 1 < p.length && p[j + 1] === "*") {
    // Two possibilities:
    // 1. Match 0 times: skip "x*" (move j by 2)
    // 2. Match 1+ times: if firstMatch, keep j, move i
    return (
      isMatchHelper(s, p, i, j + 2) ||
      (firstMatch && isMatchHelper(s, p, i + 1, j))
    );
  } else {
    // No '*', just match and move forward
    return firstMatch && isMatchHelper(s, p, i + 1, j + 1);
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O((m+n) \* 2^(m+n)) - trường hợp xấu nhất do đệ quy
- **Space Complexity:** O(m+n) - do stack đệ quy

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Logic rõ ràng

### Nhược điểm / Cons

- Tốn thời gian do tính toán lại nhiều lần
- Có thể gây stack overflow với chuỗi dài

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp đệ quy tính toán lại cùng một bài toán con nhiều lần.
- Điểm yếu của giải pháp 1? Overlapping subproblems.
- Cách tiếp cận mới? Sử dụng Memoization để lưu kết quả các bài toán con.

### Ý tưởng / Idea

Sử dụng Top-Down DP với memoization để lưu trữ kết quả của (i, j) và tránh tính toán lại.

### Thuật toán / Algorithm

1. Tương tự giải pháp 1 nhưng dùng memo object để lưu kết quả
2. Trước khi tính toán, kiểm tra memo
3. Sau khi tính toán, lưu vào memo

### Code / Implementation

```javascript
/**
 * Regular Expression Matching - Optimized (Memoization)
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_memoization(s, p) {
  const memo = {};
  return isMatchHelperMemo(s, p, 0, 0, memo);
}

/**
 * Helper function with memoization
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @param {number} i - Index in string s
 * @param {number} j - Index in pattern p
 * @param {Object} memo - Memoization object
 * @return {boolean} - True if pattern matches from these positions
 */
function isMatchHelperMemo(s, p, i, j, memo) {
  const key = `${i},${j}`;

  // Check memo
  if (key in memo) {
    return memo[key];
  }

  // Base case: pattern exhausted
  if (j === p.length) {
    return i === s.length;
  }

  // Check if current characters match
  const firstMatch = i < s.length && (p[j] === s[i] || p[j] === ".");

  let result;

  // Handle '*'
  if (j + 1 < p.length && p[j + 1] === "*") {
    result =
      isMatchHelperMemo(s, p, i, j + 2, memo) ||
      (firstMatch && isMatchHelperMemo(s, p, i + 1, j, memo));
  } else {
    result = firstMatch && isMatchHelperMemo(s, p, i + 1, j + 1, memo);
  }

  // Store in memo
  memo[key] = result;
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m \* n) - mỗi cặp (i, j) chỉ tính một lần
- **Space Complexity:** O(m \* n) - cho memo + stack đệ quy

### Ưu điểm / Pros

- Tối ưu hơn giải pháp đệ quy
- Tránh tính toán lại

### Nhược điểm / Cons

- Tốn bộ nhớ cho memo
- Vẫn dùng đệ quy (có thể gây stack overflow)

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng Bottom-Up DP để tránh đệ quy.
- Có thuật toán/pattern nào phù hợp hơn? Bottom-Up DP.

### Ý tưởng / Idea

Sử dụng Bottom-Up DP với bảng 2D. dp[i][j] = true nếu pattern[0...i-1] khớp với s[0...j-1].

### Thuật toán / Algorithm

1. Khởi tạo dp[0][0] = true
2. Xử lý trường hợp pattern khớp chuỗi rỗng (như "a*", "a*b\*")
3. Tính toán từng ô dp[i][j]:
   - Nếu p[i-1] != '\*': dp[i][j] = dp[i-1][j-1] && match
   - Nếu p[i-1] == '\*':
     - Khớp 0 lần: dp[i][j] = dp[i-2][j]
     - Khớp 1+ lần: dp[i][j] = dp[i][j-1] && match

### Code / Implementation

```javascript
/**
 * Regular Expression Matching - Advanced (Bottom-Up DP)
 * @param {string} s - Input string
 * @param {string} p - Pattern string
 * @return {boolean} - True if pattern matches entire string
 */
function isMatch_dp(s, p) {
  const m = s.length;
  const n = p.length;

  // dp[i][j] = true if p[0...i-1] matches s[0...j-1]
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));

  // Empty pattern matches empty string
  dp[0][0] = true;

  // Handle patterns like "a*", "a*b*", "a*b*c*" that match empty string
  for (let i = 1; i <= n; i++) {
    if (p[i - 1] === "*") {
      dp[i][0] = dp[i - 2][0];
    }
  }

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (p[i - 1] === "*") {
        // Case 1: Match 0 times (skip "x*")
        dp[i][j] = dp[i - 2][j];

        // Case 2: Match 1+ times (if current char matches)
        if (p[i - 2] === s[j - 1] || p[i - 2] === ".") {
          dp[i][j] = dp[i][j] || dp[i][j - 1];
        }
      } else {
        // Regular character or '.'
        if (p[i - 1] === s[j - 1] || p[i - 1] === ".") {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }
  }

  return dp[n][m];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m \* n)
- **Space Complexity:** O(m \* n) - có thể tối ưu thành O(n)

### Ưu điểm / Pros

- Không dùng đệ quy, không lo stack overflow
- Tối ưu thời gian

### Nhược điểm / Cons

- Tốn nhiều bộ nhớ cho bảng 2D
- Phức tạp hơn để hiểu

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution    | Time       | Space   | Độ khó / Difficulty | Khi nào dùng / When to use |
| ----------------------- | ---------- | ------- | ------------------- | -------------------------- |
| Brute Force (Recursive) | O(2^(m+n)) | O(m+n)  | Trung bình / Medium | Prototype, chuỗi ngắn      |
| Optimized (Memoization) | O(m\*n)    | O(m\*n) | Khó / Hard          | Cần tối ưu, dễ hiểu        |
| Advanced (Bottom-Up DP) | O(m\*n)    | O(m\*n) | Khó / Hard          | Chuỗi dài, cần tối ưu nhất |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "aa";
const p = "a";
const expected = false;
const result = isMatch_dp(s, p);
console.log(result === expected); // true
```

### Test Case 2: Sử dụng \* / Using asterisk

```javascript
const s = "aa";
const p = "a*";
const expected = true;
const result = isMatch_dp(s, p);
console.log(result === expected); // true
```

### Test Case 3: Sử dụng .\* / Using dot-star

```javascript
const s = "ab";
const p = ".*";
const expected = true;
const result = isMatch_dp(s, p);
console.log(result === expected); // true
```

### Test Case 4: Chuỗi rỗng / Empty string

```javascript
const s = "";
const p = "a*";
const expected = true;
const result = isMatch_dp(s, p);
console.log(result === expected); // true
```

### Test Case 5: Pattern phức tạp / Complex pattern

```javascript
const s = "aab";
const p = "c*a*b";
const expected = true;
const result = isMatch_dp(s, p);
console.log(result === expected); // true
```

### Test Case 6: Không khớp / No match

```javascript
const s = "mississippi";
const p = "mis*is*p*.";
const expected = false;
const result = isMatch_dp(s, p);
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
