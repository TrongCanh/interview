# Longest Valid Parentheses / Dấu ngoặc hợp lệ dài nhất

> LeetCode Problem 32 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 32
- **URL:** https://leetcode.com/problems/longest-valid-parentheses/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** String, Dynamic Programming, Stack
- **Tags:** String, Dynamic Programming, Stack
- **Thuật toán liên quan / Related Algorithms:** Stack, Dynamic Programming, String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given a string containing just the characters `'('` and `')'`, find the length of the longest valid (well-formed) parentheses substring.

**Example 1:**

```
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

**Example 2:**

```
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```

**Example 3:**

```
Input: s = ""
Output: 0
```

**Constraints:**

- `0 <= s.length <= 3 * 10^4`
- `s[i]` is `'('` or `')'`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi chỉ chứa '(' và ')'
- **Output:** Độ dài của chuỗi con ngoặc hợp lệ dài nhất
- **Ràng buộc / Constraints:**
  - Ngoặc hợp lệ: mỗi '(' có ')' tương ứng và đúng thứ tự
  - Chuỗi con phải liên tục
- **Edge cases:**
  - Chuỗi rỗng
  - Tất cả ngoặc không hợp lệ
  - Chuỗi dài

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm chuỗi ngoặc hợp lệ dài nhất. Có thể dùng Stack hoặc DP.
- **Bước 2:** Với Stack: lưu vị trí của ngoặc, tính độ dài khi tìm được cặp hợp lệ.
- **Bước 3:** Với DP: dp[i] = độ dài chuỗi hợp lệ kết thúc tại i.

### 3. Ví dụ minh họa / Examples

```
Example: s = ")()())"

Với Stack:
- i=0: ')', push 0 -> stack = [0]
- i=1: '(', push 1 -> stack = [0,1]
- i=2: ')', pop 1, match với 1, stack = [0], length = 2
- i=3: '(', push 3 -> stack = [0,3]
- i=4: ')', pop 3, match với 3, stack = [0], length = 4
- i=5: ')', pop 0, stack = [], length = 4

Kết quả: 4
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra mọi chuỗi con, xem có hợp lệ không.

### Thuật toán / Algorithm

1. Với mỗi vị trí bắt đầu:
   - Với mỗi vị trí kết thúc:
     - Kiểm tra chuỗi con có hợp lệ không
2. Lưu độ dài lớn nhất

### Code / Implementation

```javascript
/**
 * Longest Valid Parentheses - Brute Force
 * @param {string} s - Input string
 * @return {number} - Length of longest valid parentheses substring
 */
function longestValidParentheses_bruteForce(s) {
  let maxLen = 0;

  // Check all possible substrings
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 2; j <= s.length; j += 2) {
      if (isValid(s.substring(i, j))) {
        maxLen = Math.max(maxLen, j - i);
      }
    }
  }

  return maxLen;
}

/**
 * Check if a string has valid parentheses
 * @param {string} s - String to check
 * @return {boolean} - True if valid
 */
function isValid(s) {
  let count = 0;
  for (const char of s) {
    if (char === "(") {
      count++;
    } else {
      count--;
      if (count < 0) return false;
    }
  }
  return count === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n³) - n² chuỗi con, mỗi lần O(n) kiểm tra
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu

### Nhược điểm / Cons

- Rất chậm
- Không tối ưu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force quá chậm.
- Điểm yếu của giải pháp 1? Kiểm tra lại nhiều lần.
- Cách tiếp cận mới? Sử dụng Stack để tối ưu.

### Ý tưởng / Idea

Sử dụng Stack để lưu vị trí của ngoặc, tính độ dài khi tìm được cặp hợp lệ.

### Thuật toán / Algorithm

1. Khởi tạo stack với -1
2. Duyệt qua chuỗi:
   - Nếu '(' -> push vị trí
   - Nếu ')' -> pop, nếu stack rỗng push vị trí hiện tại
   - Tính độ dài = i - stack[stack.length-1]
3. Lưu độ dài lớn nhất

### Code / Implementation

```javascript
/**
 * Longest Valid Parentheses - Stack Solution
 * @param {string} s - Input string
 * @return {number} - Length of longest valid parentheses substring
 */
function longestValidParentheses_stack(s) {
  const stack = [-1]; // Store indices, start with -1
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();

      if (stack.length === 0) {
        // No matching '(', push current position
        stack.push(i);
      } else {
        // Valid substring found
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi phần tử được duyệt một lần
- **Space Complexity:** O(n) - cho stack

### Ưu điểm / Pros

- Tối ưu thời gian
- Dễ hiểu

### Nhược điểm / Cons

- Tốn không gian stack

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng DP để tối ưu không gian.
- Có thuật toán/pattern nào phù hợp hơn? Dynamic Programming.

### Ý tưởng / Idea

Sử dụng DP: dp[i] = độ dài chuỗi ngoặc hợp lệ kết thúc tại i.

### Thuật toán / Algorithm

1. dp[i] = 0
2. Nếu s[i] == '(' -> dp[i] = 0
3. Nếu s[i] == ')':
   - Nếu s[i-1] == '(' -> dp[i] = dp[i-2] + 2
   - Nếu s[i-1] == ')' và s[i-dp[i-1]-1] == '(' -> dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2]
4. Lưu max(dp)

### Code / Implementation

```javascript
/**
 * Longest Valid Parentheses - DP Solution
 * @param {string} s - Input string
 * @return {number} - Length of longest valid parentheses substring
 */
function longestValidParentheses_dp(s) {
  const n = s.length;
  const dp = new Array(n).fill(0);
  let maxLen = 0;

  for (let i = 1; i < n; i++) {
    if (s[i] === ")") {
      if (s[i - 1] === "(") {
        // Case: "()"
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === "(") {
        // Case: "(...)"
        dp[i] =
          dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
      }
      maxLen = Math.max(maxLen, dp[i]);
    }
  }

  return maxLen;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n) - cho dp array

### Ưu điểm / Pros

- Tối ưu thời gian
- Có thể tối ưu không gian thành O(1)

### Nhược điểm / Cons

- Phức tạp để hiểu
- Tốn không gian dp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n³) | O(1)  | Dễ / Easy           | Input nhỏ, demo            |
| Stack                | O(n)  | O(n)  | Trung bình / Medium | Cần tối ưu, dễ hiểu        |
| DP                   | O(n)  | O(n)  | Khó / Hard          | Cần tối ưu nhất            |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "(()";
const result = longestValidParentheses_stack(s);
const expected = 2;
console.log(result === expected); // true
```

### Test Case 2: Nhiều kết quả / Multiple results

```javascript
const s = ")()())";
const result = longestValidParentheses_stack(s);
const expected = 4;
console.log(result === expected); // true
```

### Test Case 3: Chuỗi rỗng / Empty string

```javascript
const s = "";
const result = longestValidParentheses_stack(s);
const expected = 0;
console.log(result === expected); // true
```

### Test Case 4: Chuỗi dài / Long string

```javascript
const s = "((()))";
const result = longestValidParentheses_stack(s);
const expected = 6;
console.log(result === expected); // true
```

### Test Case 5: Không hợp lệ / Invalid

```javascript
const s = "((((";
const result = longestValidParentheses_stack(s);
const expected = 0;
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Stack](../algorithms/data-structures/stack.md)
  - [Dynamic Programming](../algorithms/dynamic-programming/dp-basics.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - None
