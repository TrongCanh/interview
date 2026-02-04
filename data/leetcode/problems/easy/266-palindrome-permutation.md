# Palindrome Permutation / Hoán Vị Đối Xứng

> LeetCode Problem 266 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 266
- **URL:** https://leetcode.com/problems/palindrome-permutation/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Hash Table, String
- **Tags:** Hash Table, String
- **Thuật toán liên quan / Related Algorithms:** Hash Table, String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given a string `s`, return `true` if a permutation of the string could form a palindrome.

**Example 1:**

```
Input: s = "code"
Output: true
Explanation: "aab" can be rearranged to "aba", which is a palindrome.
```

**Example 2:**

```
Input: s = "aab"
Output: true
Explanation: "aab" can be rearranged to "aba", which is a palindrome.
```

**Example 3:**

```
Input: s = "carerac"
Output: true
Explanation: "carerac" can be rearranged to "racecar", which is a palindrome.
```

**Constraints:**

- `1 <= s.length <= 5000`
- `s` consists of lowercase English letters only.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `s`
- **Output:** `true` nếu có thể hoán vị để tạo palindrome, `false` nếu không
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 ≤ s.length ≤ 5000
  - Chỉ chứa chữ cái tiếng Anh viết thường
- **Edge cases:**
  - Chuỗi rỗng: không phải palindrome
  - Chuỗi 1 ký tự: luôn là palindrome
  - Chuỗi đã là palindrome: trả về `true`

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem có thể hoán vị chuỗi để tạo palindrome không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng đếm ký tự
- **Bước 3:** Lên kế hoạch giải pháp - Count Characters (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "code"

Đếm ký tự: {c:1, o:1, d:1, e:1}
- Tối đa 1 ký tự lẻ: 1
- Có thể tạo palindrome: true

Example 2: s = "aab"

Đếm ký tự: {a:2, b:1}
- Tối đa 1 ký tự lẻ: 1 (a)
- Có thể tạo palindrome: true

Example 3: s = "abc"

Đếm ký tự: {a:1, b:1, c:1}
- Tối đa 1 ký tự lẻ: 1 (a, b, c)
- Có thể tạo palindrome: true

Example 4: s = "aaabbb"

Đếm ký tự: {a:3, b:3}
- Tối đa 1 ký tự lẻ: 0
- Không thể tạo palindrome: false
```

---

## 💡 Giải pháp 1: Brute Force - Count Characters (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Đếm số lượng xuất hiện của từng ký tự. Một chuỗi có thể tạo palindrome nếu và chỉ nếu tối đa 1 ký tự có số lượng lẻ.

### Thuật toán / Algorithm

1. Đếm số lượng xuất hiện của từng ký tự trong `s`
2. Đếm số lượng ký tự có số lượng lẻ
3. Nếu số lượng ký tự lẻ ≤ 1, trả về `true`, ngược lại trả về `false`

### Code / Implementation

```javascript
/**
 * Palindrome Permutation - Count Characters Solution
 * @param {string} s - Chuỗi cần kiểm tra
 * @return {boolean} - true nếu có thể hoán vị tạo palindrome, false nếu không
 */
function canPermutePalindrome_bruteForce(s) {
  // Edge case: chuỗi rỗng
  if (s.length === 0) {
    return false;
  }

  // Đếm số lượng xuất hiện của từng ký tự
  const count = {};
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  // Đếm số lượng ký tự có số lượng lẻ
  let oddCount = 0;
  for (const char in count) {
    if (count[char] % 2 === 1) {
      oddCount++;
    }
  }

  // Có thể tạo palindrome nếu tối đa 1 ký tự có số lượng lẻ
  return oddCount <= 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Đếm ký tự và kiểm tra số lượng lẻ
- **Space Complexity:** O(1) - Hash Table chỉ chứa tối đa 26 ký tự

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Optimized - Single Pass (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force đã tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu đáng kể
- Cách tiếp cận mới? Tương tự giải pháp Brute Force nhưng viết code ngắn gọn hơn

### Ý tưởng / Idea

Tương tự giải pháp Brute Force, nhưng viết code ngắn gọn hơn.

### Thuật toán / Algorithm

Tương tự giải pháp Brute Force.

### Code / Implementation

```javascript
/**
 * Palindrome Permutation - Single Pass Solution
 * @param {string} s - Chuỗi cần kiểm tra
 * @return {boolean} - true nếu có thể hoán vị tạo palindrome, false nếu không
 */
function canPermutePalindrome_optimized(s) {
  // Edge case: chuỗi rỗng
  if (s.length === 0) {
    return false;
  }

  const count = {};
  let oddCount = 0;

  // Đếm và kiểm tra trong một vòng lặp
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;

    // Nếu số lượng lẻ, tăng oddCount
    if (count[char] % 2 === 1) {
      oddCount++;
    }
  }

  return oddCount <= 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code ngắn gọn
- Độ phức tạp tối ưu

### Nhược điểm / Cons

- Tương tự giải pháp Brute Force

---

## ⚡ Giải pháp 3: Advanced - Array Count (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Array thay vì Object
- Có thuật toán/pattern nào phù hợp hơn? Array indexing

### Ý tưởng / Idea

Tương tự giải pháp Optimized, nhưng dùng Array để đếm ký tự.

### Thuật toán / Algorithm

Tương tự giải pháp Optimized.

### Code / Implementation

```javascript
/**
 * Palindrome Permutation - Array Count Solution
 * @param {string} s - Chuỗi cần kiểm tra
 * @return {boolean} - true nếu có thể hoán vị tạo palindrome, false nếu không
 */
function canPermutePalindrome_advanced(s) {
  // Edge case: chuỗi rỗng
  if (s.length === 0) {
    return false;
  }

  // Array để đếm ký tự (26 chữ cái)
  const count = new Array(26).fill(0);
  const aCode = "a".charCodeAt(0);

  let oddCount = 0;

  // Đếm và kiểm tra trong một vòng lặp
  for (const char of s) {
    const index = char.charCodeAt(0) - aCode;
    count[index]++;

    // Kiểm tra số lượng lẻ
    if (count[index] % 2 === 1) {
      oddCount++;
    }
  }

  return oddCount <= 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1) - Array có kích thước cố định 26

### Ưu điểm / Pros

- Array indexing nhanh hơn Object
- Code rõ ràng

### Nhược điểm / Cons

- Chỉ hoạt động với chuỗi chứa chữ cái a-z

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Count Characters     | O(n) | O(1)  | Dễ / Easy           | Luôn dùng (tối ưu nhất)    |
| Single Pass          | O(n) | O(1)  | Dễ / Easy           | Code ngắn gọn              |
| Array Count          | O(n) | O(1)  | Trung bình / Medium | Chuỗi chỉ có chữ cái a-z   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "code";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 2: Có thể tạo palindrome / Can Create Palindrome

```javascript
const s = "aab";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 3: Không thể tạo palindrome / Cannot Create Palindrome

```javascript
const s = "aaabbb";
const expected = false;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 4: Chuỗi 1 ký tự / Single Character

```javascript
const s = "a";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 5: Chuỗi đã là palindrome / Already Palindrome

```javascript
const s = "aba";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 6: Chuỗi rỗng / Empty String

```javascript
const s = "";
const expected = false;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 7: Chuỗi dài / Long String

```javascript
const s = "carerac";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

### Test Case 8: Tất cả ký tự khác nhau / All Unique Characters

```javascript
const s = "abc";
const expected = true;
const result = canPermutePalindrome_bruteForce(s);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Palindrome là gì?**
   - Chuỗi đọc xuôi và ngược như nhau
   - Ví dụ: "aba", "racecar"

2. **Tại sao tối đa 1 ký tự lẻ?**
   - Để tạo palindrome, cần có thể đặt ký tự ở giữa
   - Nếu có 2 ký tự lẻ, không thể đặt cả hai ở giữa
   - Ví dụ: "aab" → "aba" (a ở giữa, b ở hai đầu)

3. **Các phương pháp đếm:**
   - Hash Table: linh hoạt, dễ dùng
   - Array: nhanh hơn, nhưng chỉ hoạt động với tập ký tự cố định

4. **Edge Cases:**
   - Chuỗi rỗng: không phải palindrome
   - Chuỗi 1 ký tự: luôn là palindrome
   - Chuỗi đã là palindrome: trả về true

5. **Lưu ý về ràng buộc:**
   - Chuỗi chỉ chứa chữ cái tiếng Anh viết thường
   - Độ dài tối đa 5000

---

_Last updated: 2025-02-04_
