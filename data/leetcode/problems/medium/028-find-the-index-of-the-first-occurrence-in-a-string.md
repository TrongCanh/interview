# Find the Index of the First Occurrence in a String / Tìm vị trí xuất hiện đầu tiên của chuỗi

> LeetCode Problem 28 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 28
- **URL:** https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String
- **Tags:** String, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Clarification:**

What should we return when `needle` is an empty string? This is a great question, but for the purposes of this problem, we will return `0` when `needle` is empty.

**Example 1:**

```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
```

**Example 2:**

```
Input: haystack = "leetcode", needle = "leeto"
Output: 2
```

**Example 3:**

```
Input: haystack = "mississippi", needle = "issip"
Output: 4
```

**Constraints:**

- `1 <= haystack.length, needle.length <= 5 * 10^4`
- `haystack` and `needle` consist of only lowercase English letters.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai chuỗi haystack và needle
- **Output:** Vị trí xuất hiện đầu tiên của needle trong haystack, hoặc -1 nếu không tìm thấy
- **Ràng buộc / Constraints:**
  - Độ dài: 1 đến 5 \* 10^4
  - Chỉ chứa chữ cái thường tiếng Anh
- **Edge cases:**
  - needle rỗng (theo clarification, trả về 0)
  - haystack rỗng
  - needle dài hơn haystack
  - needle chỉ xuất hiện 1 lần ở cuối haystack

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - tìm vị trí xuất hiện đầu tiên của needle trong haystack
- Bước 2: Nhận thấy có thể dùng các phương pháp: brute force, Two Pointers, KMP algorithm
- Bước 3: Two Pointers là phương pháp phổ biến nhất và dễ hiểu

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" xuất hiện ở vị trí 0 trong "sadbutsad"

Example 2:
Input: haystack = "leetcode", needle = "leeto"
Output: 2
Explanation: "leeto" xuất hiện ở vị trí 2 trong "leetcode" (leeto -> leeto)

Example 3:
Input: haystack = "mississippi", needle = "issip"
Output: 4
Explanation: "issip" xuất hiện ở vị trí 4 trong "mississippi"
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng vòng lặp để duyệt qua từng vị trí trong haystack, tại mỗi vị trí kiểm tra xem needle có xuất hiện từ đó không.

### Thuật toán / Algorithm

1. Nếu needle rỗng, trả về 0
2. Dùng vòng lặp for với index i từ 0 đến haystack.length - needle.length:
   - Kiểm tra xem haystack.substring(i, i + needle.length) có bằng needle không
   - Nếu bằng, trả về i
3. Nếu không tìm thấy, trả về -1

### Code / Implementation

```javascript
/**
 * Find the Index of the First Occurrence in a String - Brute Force Solution
 * @param {string} haystack - Chuỗi cần tìm kiếm
 * @param {string} needle - Chuỗi cần tìm
 * @return {number} - Vị trí xuất hiện đầu tiên, hoặc -1
 */
function strStr_bruteForce(haystack, needle) {
  // Edge case: needle rỗng
  if (needle.length === 0) {
    return 0;
  }

  const n = haystack.length;
  const m = needle.length;

  // Duyệt qua từng vị trí có thể
  for (let i = 0; i <= n - m; i++) {
    // Kiểm tra xem needle có xuất hiện từ vị trí i
    if (haystack.substring(i, i + m) === needle) {
      return i;
    }
  }

  return -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n\*m) - n là độ dài haystack, m là độ dài needle
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Dễ hiểu và implement
- Không cần cấu trúc dữ liệu phức tạp
- Tận dụng được built-in string methods

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- substring() tạo chuỗi mới mỗi lần, tốn bộ nhớ

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? substring() tạo chuỗi mới mỗi lần, tốn bộ nhớ
- Điểm yếu của giải pháp 1? Tốn nhiều bộ nhớ cho substring
- Cách tiếp cận mới? Dùng Two Pointers để so sánh từng ký tự

### Ý tưởng / Idea

Sử dụng Two Pointers để so sánh từng ký tự của needle với haystack. Một pointer duyệt qua haystack, một pointer duyệt qua needle.

### Thuật toán / Algorithm

1. Nếu needle rỗng, trả về 0
2. Nếu haystack rỗng hoặc needle dài hơn haystack, trả về -1
3. Khởi tạo hai pointer:
   - i: duyệt qua haystack
   - j: duyệt qua needle
4. Dùng vòng lặp while với điều kiện i < haystack.length:
   - Nếu haystack[i] == needle[j]:
     - Nếu j == needle.length - 1, tìm thấy needle hoàn toàn, trả về i - needle.length + 1
     - Tăng j
   - Ngược lại:
     - Đặt j = 0 (bắt đầu lại từ đầu needle)
     - Tăng i
5. Nếu không tìm thấy, trả về -1

### Code / Implementation

```javascript
/**
 * Find the Index of the First Occurrence in a String - Optimized Solution using Two Pointers
 * @param {string} haystack - Chuỗi cần tìm kiếm
 * @param {string} needle - Chuỗi cần tìm
 * @return {number} - Vị trí xuất hiện đầu tiên, hoặc -1
 */
function strStr_optimized(haystack, needle) {
  // Edge cases
  if (needle.length === 0) {
    return 0;
  }
  if (haystack.length === 0 || haystack.length < needle.length) {
    return -1;
  }

  const n = haystack.length;
  const m = needle.length;
  let i = 0;
  let j = 0;

  while (i < n) {
    if (haystack[i] === needle[j]) {
      j++;

      // Tìm thấy needle hoàn toàn
      if (j === m) {
        return i - m + 1;
      }
    } else {
      // Không khớp, reset j và tăng i
      j = 0;
      i++;
    }
  }

  return -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n\*m) - n là độ dài haystack, m là độ dài needle
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Tối ưu bộ nhớ hơn brute force
- Không tạo chuỗi mới với substring()
- Hiệu năng tốt cho string lớn

### Nhược điểm / Cons

- Độ phức tạp thời gian vẫn cao
- Code phức tạp hơn brute force

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng KMP Algorithm
- Có thuật toán/pattern nào phù hợp hơn? String Matching pattern

### Ý tưởng / Idea

Sử dụng KMP (Knuth-Morris-Pratt) Algorithm để tìm pattern trong string. KMP xây dựng failure function (hay còn gọi là lps - longest prefix suffix) để tối ưu việc tìm kiếm, tránh so sánh lại các phần tử đã khớp.

### Thuật toán / Algorithm

1. Nếu needle rỗng, trả về 0
2. Nếu haystack rỗng hoặc needle dài hơn haystack, trả về -1
3. Xây dựng lps array (longest prefix suffix) cho needle:
   - lps[i] = độ dài prefix dài nhất mà cũng là suffix của needle[0...i]
4. Dùng KMP để tìm needle trong haystack:
   - Duyệt qua haystack với i và j
   - Khi khớp: tăng cả hai pointer
   - Khi không khớp: dùng lps để quay lui j

### Code / Implementation

```javascript
/**
 * Find the Index of the First Occurrence in a String - Advanced Solution using KMP Algorithm
 * @param {string} haystack - Chuỗi cần tìm kiếm
 * @param {string} needle - Chuỗi cần tìm
 * @return {number} - Vị trí xuất hiện đầu tiên, hoặc -1
 */
function strStr_advanced(haystack, needle) {
  // Edge cases
  if (needle.length === 0) {
    return 0;
  }
  if (haystack.length === 0 || haystack.length < needle.length) {
    return -1;
  }

  const n = haystack.length;
  const m = needle.length;

  // Xây dựng lps array (longest prefix suffix)
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    while (len > 0 && needle[i] !== needle[len]) {
      len = lps[len - 1];
    }

    if (needle[i] === needle[len]) {
      len++;
      lps[i] = len;
    } else {
      lps[i] = len;
    }

    i++;
  }

  // Dùng KMP để tìm needle trong haystack
  i = 0; // index cho haystack
  j = 0; // index cho needle
  let k = 0; // index cho lps khi quay lui

  while (i < n) {
    if (needle[j] === haystack[i + k]) {
      j++;

      if (j === m) {
        return i + k - m + 1;
      } else {
        // Quay lui j dựa trên lps
        k = lps[j - 1];
      }
    } else {
      // Không khớp, tăng i, reset j
      if (i > k) {
        k = 0;
      }
      i++;
    }
  }

  return -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - n là độ dài haystack, m là độ dài needle
- **Space Complexity:** O(m) - để lưu lps array

### Ưu điểm / Pros

- Độ phức tạp thời gian rất tốt cho string lớn
- Không so sánh lại các phần tử đã khớp
- Tối ưu cho bài toán tìm kiếm pattern trong string

### Nhược điểm / Cons

- Code phức tạp hơn
- Tốn bộ nhớ cho lps array
- Khó hiểu và implement

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time    | Space | Độ khó / Difficulty | Khi nào dùng / When to use       |
| -------------------- | ------- | ----- | ------------------- | -------------------------------- |
| Brute Force          | O(n\*m) | O(1)  | Dễ / Easy           | String nhỏ, dễ hiểu              |
| Optimized            | O(n\*m) | O(1)  | Trung bình / Medium | String trung bình, tối ưu bộ nhớ |
| Advanced             | O(n+m)  | O(m)  | Khó / Hard          | String lớn, cần tối ưu thời gian |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(strStr_bruteForce("sadbutsad", "sad")); // Expected: 0
console.log(strStr_optimized("sadbutsad", "sad")); // Expected: 0
console.log(strStr_advanced("sadbutsad", "sad")); // Expected: 0
```

### Test Case 2: Tìm thấy

```javascript
console.log(strStr_bruteForce("leetcode", "leeto")); // Expected: 2
console.log(strStr_optimized("leetcode", "leeto")); // Expected: 2
console.log(strStr_advanced("leetcode", "leeto")); // Expected: 2
```

### Test Case 3: Needle xuất hiện nhiều lần

```javascript
console.log(strStr_bruteForce("mississippi", "issip")); // Expected: 4
console.log(strStr_optimized("mississippi", "issip")); // Expected: 4
console.log(strStr_advanced("mississippi", "issip")); // Expected: 4
```

### Test Case 4: Needle rỗng

```javascript
console.log(strStr_bruteForce("hello", "")); // Expected: 0
console.log(strStr_optimized("hello", "")); // Expected: 0
console.log(strStr_advanced("hello", "")); // Expected: 0
```

### Test Case 5: Haystack rỗng

```javascript
console.log(strStr_bruteForce("", "a")); // Expected: -1
console.log(strStr_optimized("", "a")); // Expected: -1
console.log(strStr_advanced("", "a")); // Expected: -1
```

### Test Case 6: Needle dài hơn haystack

```javascript
console.log(strStr_bruteForce("abc", "abcd")); // Expected: -1
console.log(strStr_optimized("abc", "abcd")); // Expected: -1
console.log(strStr_advanced("abc", "abcd")); // Expected: -1
```

### Test Case 7: String lớn

```javascript
const largeHaystack = "a".repeat(10000); // "aaaaa..."
const largeNeedle = "b".repeat(100); // "bbbb..."
console.log(strStr_optimized(largeHaystack, largeNeedle)); // Expected: 0 (vị trí 0)
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)
  - [Array](../algorithms/data-structures/array.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)
- [LeetCode Discuss](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/discuss/)
- [KMP Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
- [Two Pointers Pattern](../algorithms/patterns/two-pointers.md)

---

## 💬 Lời khuyên / Tips

- Luôn kiểm tra edge cases: needle rỗng, haystack rỗng, needle dài hơn
- Với Two Pointers, luôn reset j = 0 khi không khớp
- Với KMP, lps array là key để tối ưu
- substring() tạo chuỗi mới, dùng charCodeAt() để tối ưu hơn
- Vẽ hình để visualize movement của hai pointer

---

_Last updated: 2026-02-03_
