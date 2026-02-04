# Valid Anagram / Kiểm Tra Đảo Chữ

> LeetCode Problem 242 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 242
- **URL:** https://leetcode.com/problems/valid-anagram/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Hash Table, Sorting
- **Tags:** String, Hash Table, Sorting
- **Thuật toán liên quan / Related Algorithms:** Sorting, Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**

```
Input: s = "rat", t = "car"
Output: false
```

**Constraints:**

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai chuỗi `s` và `t`
- **Output:** `true` nếu `t` là anagram của `s`, `false` nếu không
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 ≤ s.length, t.length ≤ 5 × 10^4
  - Chuỗi chỉ chứa chữ cái tiếng Anh viết thường
- **Edge cases:**
  - Hai chuỗi rỗng: là anagram (nhưng theo constraints, độ dài tối thiểu là 1)
  - Hai chuỗi giống nhau: là anagram
  - Hai chuỗi có độ dài khác nhau: không phải anagram

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem hai chuỗi có cùng các ký tự với cùng số lượng không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Sorting hoặc Hash Table
- **Bước 3:** Lên kế hoạch giải pháp - Sorting (O(n log n) time), Hash Table (O(n) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "anagram", t = "nagaram"

Phương pháp Sorting:
- Sort s: "aaagmnr"
- Sort t: "aaagmnr"
- So sánh: "aaagmnr" === "aaagmnr" → true

Phương pháp Hash Table:
- Đếm ký tự trong s: {a:3, n:1, g:1, r:1, m:1}
- Đếm ký tự trong t: {n:1, a:3, g:1, a:2, r:1, a:3, m:1}
- So sánh: {a:3, n:1, g:1, r:1, m:1} === {a:3, n:1, g:1, r:1, m:1} → true

Example 2: s = "rat", t = "car"

Phương pháp Sorting:
- Sort s: "art"
- Sort t: "acr"
- So sánh: "art" !== "acr" → false
```

---

## 💡 Giải pháp 1: Brute Force - Sorting (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sắp xếp hai chuỗi, sau đó so sánh xem chúng có giống nhau không. Nếu giống nhau, chúng là anagram.

### Thuật toán / Algorithm

1. Nếu độ dài của `s` và `t` khác nhau, trả về `false`
2. Sắp xếp `s` thành `sortedS`
3. Sắp xếp `t` thành `sortedT`
4. So sánh `sortedS` và `sortedT`
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Valid Anagram - Sorting Solution
 * @param {string} s - Chuỗi thứ nhất
 * @param {string} t - Chuỗi thứ hai
 * @return {boolean} - true nếu t là anagram của s, false nếu không
 */
function isAnagram_bruteForce(s, t) {
  // Nếu độ dài khác nhau, không thể là anagram
  if (s.length !== t.length) {
    return false;
  }

  // Sắp xếp hai chuỗi và so sánh
  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");

  return sortedS === sortedT;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - Sorting chiếm O(n log n) với n là độ dài chuỗi
- **Space Complexity:** O(n) - Lưu trữ mảng chứa các ký tự

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn
- Không cần cấu trúc dữ liệu phức tạp

### Nhược điểm / Cons

- Độ phức tạp thời gian O(n log n) không tối ưu
- Tốn O(n) bộ nhớ cho mảng

---

## 🚀 Giải pháp 2: Optimized - Hash Table (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Sorting có độ phức tạp O(n log n)
- Điểm yếu của giải pháp 1? Sorting tốn thời gian
- Cách tiếp cận mới? Sử dụng Hash Table để đếm số lượng ký tự

### Ý tưởng / Idea

Sử dụng Hash Table (Object hoặc Map trong JavaScript) để đếm số lượng ký tự trong `s`. Sau đó duyệt qua `t` và giảm số lượng. Nếu tìm thấy ký tự không tồn tại hoặc số lượng âm, trả về `false`.

### Thuật toán / Algorithm

1. Nếu độ dài của `s` và `t` khác nhau, trả về `false`
2. Tạo một Hash Table `count` để đếm ký tự trong `s`
3. Duyệt qua `s`, tăng `count[char]` lên 1
4. Duyệt qua `t`, giảm `count[char]` xuống 1
   - Nếu `count[char]` không tồn tại hoặc âm, trả về `false`
5. Trả về `true`

### Code / Implementation

```javascript
/**
 * Valid Anagram - Hash Table Solution
 * @param {string} s - Chuỗi thứ nhất
 * @param {string} t - Chuỗi thứ hai
 * @return {boolean} - true nếu t là anagram của s, false nếu không
 */
function isAnagram_optimized(s, t) {
  // Nếu độ dài khác nhau, không thể là anagram
  if (s.length !== t.length) {
    return false;
  }

  // Tạo Hash Table để đếm ký tự
  const count = {};

  // Đếm ký tự trong s
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  // Kiểm tra ký tự trong t
  for (const char of t) {
    // Nếu ký tự không tồn tại hoặc đã hết, không phải anagram
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua hai chuỗi một lần
- **Space Complexity:** O(1) - Hash Table chỉ chứa tối đa 26 ký tự (chữ cái tiếng Anh)

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity O(1) vì chỉ có 26 ký tự
- Không cần sorting

### Nhược điểm / Cons

- Cần hiểu về Hash Table
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - Array Count (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Array thay vì Hash Table vì chỉ có 26 ký tự
- Có thuật toán/pattern nào phù hợp hơn? Array indexing

### Ý tưởng / Idea

Sử dụng Array có kích thước 26 để đếm số lượng ký tự. Mỗi ký tự tương ứng với một vị trí trong array (a=0, b=1, ..., z=25).

### Thuật toán / Algorithm

1. Nếu độ dài của `s` và `t` khác nhau, trả về `false`
2. Tạo array `count` có kích thước 26, khởi tạo tất cả bằng 0
3. Duyệt qua `s`, tăng `count[char.charCodeAt(0) - 'a'.charCodeAt(0)]` lên 1
4. Duyệt qua `t`, giảm `count[char.charCodeAt(0) - 'a'.charCodeAt(0)]` xuống 1
5. Kiểm tra xem tất cả phần tử trong `count` có bằng 0 không
6. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Valid Anagram - Array Count Solution
 * @param {string} s - Chuỗi thứ nhất
 * @param {string} t - Chuỗi thứ hai
 * @return {boolean} - true nếu t là anagram của s, false nếu không
 */
function isAnagram_advanced(s, t) {
  // Nếu độ dài khác nhau, không thể là anagram
  if (s.length !== t.length) {
    return false;
  }

  // Tạo array để đếm ký tự (26 chữ cái)
  const count = new Array(26).fill(0);
  const aCode = "a".charCodeAt(0);

  // Đếm ký tự trong s
  for (const char of s) {
    count[char.charCodeAt(0) - aCode]++;
  }

  // Giảm đếm ký tự trong t
  for (const char of t) {
    count[char.charCodeAt(0) - aCode]--;
  }

  // Kiểm tra xem tất cả phần tử có bằng 0 không
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) {
      return false;
    }
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua hai chuỗi và array 26 phần tử
- **Space Complexity:** O(1) - Array có kích thước cố định 26

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity O(1) với kích thước cố định
- Truy cập array nhanh hơn Hash Table

### Nhược điểm / Cons

- Chỉ hoạt động với chuỗi chứa chữ cái tiếng Anh viết thường
- Code hơi dài hơn
- Cần hiểu về charCodeAt

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---------- | ----- | ------------------- | -------------------------- |
| Sorting              | O(n log n) | O(n)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| Hash Table           | O(n)       | O(1)  | Trung bình / Medium | Cần tối ưu time            |
| Array Count          | O(n)       | O(1)  | Trung bình / Medium | Chuỗi chỉ có chữ cái a-z   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "anagram";
const t = "nagaram";
const expected = true;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

### Test Case 2: Không phải anagram / Not Anagram

```javascript
const s = "rat";
const t = "car";
const expected = false;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

### Test Case 3: Hai chuỗi giống nhau / Same Strings

```javascript
const s = "hello";
const t = "hello";
const expected = true;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

### Test Case 4: Độ dài khác nhau / Different Lengths

```javascript
const s = "a";
const t = "ab";
const expected = false;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

### Test Case 5: Chuỗi dài / Long Strings

```javascript
const s = "abcdefghijklmnopqrstuvwxyz";
const t = "zyxwvutsrqponmlkjihgfedcba";
const expected = true;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

### Test Case 6: Ký tự lặp lại / Repeated Characters

```javascript
const s = "aabbcc";
const t = "ccbbaa";
const expected = true;
const result = isAnagram_bruteForce(s, t);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Sorting](../algorithms/algorithms/sorting.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Anagram là gì?**
   - Hai chuỗi là anagram nếu chúng có cùng các ký tự với cùng số lượng
   - Ví dụ: "listen" và "silent" là anagram

2. **Các phương pháp kiểm tra Anagram:**
   - Sorting: sắp xếp hai chuỗi và so sánh
   - Hash Table: đếm số lượng ký tự
   - Array Count: tương tự Hash Table nhưng dùng array

3. **Hash Table vs Array Count:**
   - Hash Table: linh hoạt, hoạt động với mọi ký tự
   - Array Count: nhanh hơn, nhưng chỉ hoạt động với tập ký tự cố định

4. **charCodeAt trong JavaScript:**
   - `char.charCodeAt(0)` trả về mã Unicode của ký tự
   - `'a'.charCodeAt(0)` = 97
   - Để map a-z vào 0-25: `char.charCodeAt(0) - 'a'.charCodeAt(0)`

5. **Edge Cases:**
   - Độ dài khác nhau: không phải anagram
   - Chuỗi rỗng: là anagram (nhưng constraints đảm bảo độ dài ≥ 1)

6. **Lưu ý về ràng buộc:**
   - Chuỗi chỉ chứa chữ cái tiếng Anh viết thường
   - Điều này giúp tối ưu hóa với Array Count

---

_Last updated: 2025-02-04_
