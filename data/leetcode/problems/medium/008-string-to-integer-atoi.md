# String to Integer (atoi) / Chuyển Chuỗi sang Số Nguyên

> LeetCode Problem 8 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 8
- **URL:** https://leetcode.com/problems/string-to-integer-atoi/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Math
- **Tags:** string, math
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** Simulation

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).

The algorithm for `myAtoi(string s)` is as follows:

1. **Read in and ignore any leading whitespace.**
2. **Check if the next character (if not already at the end of the string) is '-' or '+'.** Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. **Read in next the characters until the next non-digit character or the end of the input is reached.** The rest of the string is ignored.
4. **Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32).** If no digits were read, then the integer is `0`.
5. **If the integer is out of the 32-bit signed integer range [-2³¹, 2³¹ - 1], then clamp the integer so that it remains in the range.** Specifically, integers less than -2³¹ should be clamped to -2³¹, and integers greater than 2³¹ - 1 should be clamped to 2³¹ - 1.
6. **Return the integer as the final result.**

**Note:**

- Only the space character `' '` is considered a whitespace character.
- Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

**Example 1:**

```
Input: s = "42"
Output: 42
Explanation: The underlined characters are what is read in, and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
```

**Example 2:**

```
Input: s = "   -42"
Output: -42
Explanation:
Step 1: "   -42" (leading whitespace is read and ignored)
            ^
Step 2: "   -42" ('-' is read, so the result should be negative)
             ^
Step 3: "   -42" ("42" is read in)
               ^
```

**Example 3:**

```
Input: s = "4193 with words"
Output: 4193
Explanation:
Step 1: "4193 with words" (no leading whitespace)
         ^
Step 2: "4193 with words" (no characters read because there is neither '-' nor '+')
         ^
Step 3: "4193 with words" ("4193" is read in)
             ^
```

**Constraints:**

- `0 <= s.length <= 200`
- `s` consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi s có thể chứa chữ cái, số, khoảng trắng, '+', '-', và '.'.
- **Output:** Số nguyên 32-bit signed sau khi chuyển đổi theo quy tắc atoi.
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 0 đến 200
  - Kết quả phải nằm trong khoảng [-2³¹, 2³¹ - 1] = [-2147483648, 2147483647]
- **Edge cases:**
  - Chuỗi rỗng hoặc chỉ có khoảng trắng: trả về 0
  - Số vượt quá giới hạn 32-bit: clamp về giới hạn
  - Không có số sau dấu: trả về 0
  - Ký tự không phải số đầu tiên: trả về 0

### 2. Tư duy / Thinking Process

- **Bước 1:** Bỏ qua khoảng trắng đầu tiên
  - Duyệt qua chuỗi cho đến khi gặp ký tự không phải khoảng trắng

- **Bước 2:** Xác định dấu
  - Nếu gặp '+': số dương
  - Nếu gặp '-': số âm
  - Nếu không gặp: số dương mặc định

- **Bước 3:** Đọc các chữ số
  - Chỉ đọc các ký tự từ '0' đến '9'
  - Dừng khi gặp ký tự không phải số
  - Chuyển từng chữ số thành số

- **Bước 4:** Xử lý overflow
  - Kiểm tra trước khi thêm chữ số mới
  - Nếu result > MAX/10 hoặc (result == MAX/10 và digit > MAX%10): clamp về MAX
  - Tương tự với MIN

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "42"
- Bỏ qua khoảng trắng: không có
- Xác định dấu: không có → dương
- Đọc số: "42" → 42
- Kết quả: 42

Example 2: s = "   -42"
- Bỏ qua khoảng trắng: "   " → còn "-42"
- Xác định dấu: '-' → âm
- Đọc số: "42" → 42
- Kết quả: -42

Example 3: s = "4193 with words"
- Bỏ qua khoảng trắng: không có
- Xác định dấu: không có → dương
- Đọc số: "4193" → 4193, dừng khi gặp ' '
- Kết quả: 4193

Example 4: s = "-91283472332"
- Bỏ qua khoảng trắng: không có
- Xác định dấu: '-' → âm
- Đọc số: "91283472332" → vượt quá MIN (-2147483648)
- Kết quả: -2147483648 (clamp về MIN)

Example 5: s = "words and 987"
- Bỏ qua khoảng trắng: không có
- Xác định dấu: không có → dương
- Đọc số: gặp 'w' (không phải số) → không có số nào
- Kết quả: 0
```

---

## 💡 Giải pháp 1: Simulation (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Mô phỏng quy trình atoi theo từng bước: bỏ khoảng trắng, xác định dấu, đọc số, xử lý overflow.

### Thuật toán / Algorithm

1. Khởi tạo index = 0, sign = 1, result = 0
2. Bỏ qua khoảng trắng đầu tiên
3. Xác định dấu (+ hoặc -)
4. Đọc các chữ số và chuyển đổi:
   a. Nếu không phải số: dừng
   b. Chuyển ký tự thành số: digit = char.charCodeAt(0) - '0'.charCodeAt(0)
   c. Kiểm tra overflow trước khi thêm
   d. result = result \* 10 + digit
5. Trả về result \* sign

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution1_simulation(s) {
  const n = s.length;
  let index = 0;
  let sign = 1;
  let result = 0;

  // Giới hạn 32-bit signed integer
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  // Bước 1: Bỏ qua khoảng trắng đầu tiên
  while (index < n && s[index] === " ") {
    index++;
  }

  // Bước 2: Xác định dấu
  if (index < n && (s[index] === "+" || s[index] === "-")) {
    sign = s[index] === "-" ? -1 : 1;
    index++;
  }

  // Bước 3: Đọc các chữ số
  while (index < n && isDigit(s[index])) {
    const digit = s[index].charCodeAt(0) - "0".charCodeAt(0);

    // Kiểm tra overflow trước khi thêm
    // Nếu result > INT_MAX/10 hoặc (result == INT_MAX/10 và digit > INT_MAX%10)
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    index++;
  }

  return result * sign;
}

/**
 * Kiểm tra ký tự có phải số không
 * @param {string} char
 * @return {boolean}
 */
function isDigit(char) {
  return char >= "0" && char <= "9";
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua chuỗi một lần
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng, dễ đọc
- Xử lý đúng tất cả các trường hợp

### Nhược điểm / Cons

- Code hơi dài
- Cần nhiều điều kiện kiểm tra

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp 1 đã tốt, nhưng có thể rút gọn code hơn.
- **Điểm yếu của giải pháp 1?** Code hơi dài dòng.
- **Cách tiếp cận mới?** Rút gọn các điều kiện và sử dụng regex để kiểm tra số.

### Ý tưởng / Idea

Giữ nguyên thuật toán nhưng rút gọn code và sử dụng các kỹ thuật JavaScript hiện đại.

### Thuật toán / Algorithm

1. Sử dụng regex để tìm phần số trong chuỗi
2. Xử lý kết quả và clamp về giới hạn

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution2_optimized(s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // Bỏ qua khoảng trắng đầu tiên
  s = s.trim();

  if (!s) return 0;

  // Xác định dấu
  let sign = 1;
  let startIndex = 0;

  if (s[0] === "-") {
    sign = -1;
    startIndex = 1;
  } else if (s[0] === "+") {
    startIndex = 1;
  }

  let result = 0;

  // Đọc các chữ số
  for (let i = startIndex; i < s.length; i++) {
    const char = s[i];

    // Nếu không phải số, dừng
    if (!isDigit(char)) break;

    const digit = char.charCodeAt(0) - "0".charCodeAt(0);

    // Kiểm tra overflow
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
  }

  return result * sign;
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn
- Dùng trim() để bỏ khoảng trắng

### Nhược điểm / Cons

- Không cải thiện về độ phức tạp
- Tương đương giải pháp 1

---

## ⚡ Giải pháp 3: Regex Approach (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Có thể dùng regex để tìm phần số trực tiếp.
- **Có thuật toán/pattern nào phù hợp hơn?** Regex là công cụ mạnh cho xử lý chuỗi.

### Ý tưởng / Idea

Sử dụng regex để tìm phần số trong chuỗi theo pattern: optional whitespace, optional sign, then digits.

### Thuật toán / Algorithm

1. Sử dụng regex để match pattern: `^\s*[+-]?\d+`
2. Nếu match, chuyển đổi thành số
3. Clamp về giới hạn 32-bit

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution3_regex(s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // Regex match: optional whitespace, optional sign, then digits
  const match = s.match(/^\s*([+-]?\d+)/);

  if (!match) return 0;

  const numStr = match[1];
  const isNegative = numStr[0] === "-";
  const digits = isNegative
    ? numStr.slice(1)
    : numStr[0] === "+"
      ? numStr.slice(1)
      : numStr;

  let result = 0;

  for (const char of digits) {
    const digit = char.charCodeAt(0) - "0".charCodeAt(0);

    // Kiểm tra overflow
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      return isNegative ? INT_MIN : INT_MAX;
    }

    result = result * 10 + digit;
  }

  return isNegative ? -result : result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất gọn
- Sử dụng regex - công cụ mạnh

### Nhược điểm / Cons

- Regex có thể chậm hơn xử lý thủ công
- Khó debug hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Simulation           | O(n) | O(1)  | Dễ / Easy           | Cần rõ ràng, dễ hiểu       |
| Optimized            | O(n) | O(1)  | Trung bình / Medium | Code gọn                   |
| Regex Approach       | O(n) | O(1)  | Khó / Hard          | Thích regex, code ngắn     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "42";
console.log(solution1_simulation(s)); // Expected: 42
console.log(solution2_optimized(s)); // Expected: 42
console.log(solution3_regex(s)); // Expected: 42
```

### Test Case 2: Có khoảng trắng và dấu âm

```javascript
const s = "   -42";
console.log(solution1_simulation(s)); // Expected: -42
console.log(solution2_optimized(s)); // Expected: -42
console.log(solution3_regex(s)); // Expected: -42
```

### Test Case 3: Có chữ sau số

```javascript
const s = "4193 with words";
console.log(solution1_simulation(s)); // Expected: 4193
console.log(solution2_optimized(s)); // Expected: 4193
console.log(solution3_regex(s)); // Expected: 4193
```

### Test Case 4: Overflow dương

```javascript
const s = "91283472332";
console.log(solution1_simulation(s)); // Expected: 2147483647
console.log(solution2_optimized(s)); // Expected: 2147483647
console.log(solution3_regex(s)); // Expected: 2147483647
```

### Test Case 5: Overflow âm

```javascript
const s = "-91283472332";
console.log(solution1_simulation(s)); // Expected: -2147483648
console.log(solution2_optimized(s)); // Expected: -2147483648
console.log(solution3_regex(s)); // Expected: -2147483648
```

### Test Case 6: Không có số

```javascript
const s = "words and 987";
console.log(solution1_simulation(s)); // Expected: 0
console.log(solution2_optimized(s)); // Expected: 0
console.log(solution3_regex(s)); // Expected: 0
```

### Test Case 7: Chuỗi rỗng

```javascript
const s = "";
console.log(solution1_simulation(s)); // Expected: 0
console.log(solution2_optimized(s)); // Expected: 0
console.log(solution3_regex(s)); // Expected: 0
```

---

## 📚 Tài liệu tham khảo / References

- [String](../../algorithms/data-structures/string.md)
- [Math](../../algorithms/algorithms/math.md)
- [LeetCode Discuss](https://leetcode.com/problems/string-to-integer-atoi/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=zwL1tsQzT9Q)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn kiểm tra overflow TRƯỚC khi thêm chữ số mới, không phải sau
- **Tip 2:** Sử dụng `Math.floor(INT_MAX / 10)` thay vì `INT_MAX / 10` để tránh floating point
- **Tip 3:** Xử lý dấu trước khi đọc số
- **Lỗi thường gặp:** Quên kiểm tra overflow, dẫn đến kết quả sai với số lớn

---

_Last updated: 2026-02-03_
