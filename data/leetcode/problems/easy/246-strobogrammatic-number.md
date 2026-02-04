# Strobogrammatic Number / Số Strobogrammatic

> LeetCode Problem 246 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 246
- **URL:** https://leetcode.com/problems/strobogrammatic-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math, Hash Table
- **Tags:** Math, Hash Table
- **Thuật toán liên quan / Related Algorithms:** Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

A **strobogrammatic number** is a number that looks the same when rotated **180 degrees** (looked at upside down).

Given a string `num` representing a positive integer, return `true` if `num` is a strobogrammatic number, or `false` otherwise.

**Example 1:**

```
Input: num = "69"
Output: true
Explanation: 69 rotated 180 degrees becomes 69.
```

**Example 2:**

```
Input: num = "88"
Output: true
Explanation: 88 rotated 180 degrees becomes 88.
```

**Example 3:**

```
Input: num = "962"
Output: false
Explanation: 962 rotated 180 degrees becomes 269, which is different from 962.
```

**Constraints:**

- `1 <= num.length <= 50`
- `num` consists of only digits.
- `num` does not contain any leading zeros except for the number zero itself.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `num` biểu diễn một số nguyên dương
- **Output:** `true` nếu `num` là strobogrammatic number, `false` nếu không
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 ≤ num.length ≤ 50
  - Chỉ chứa các chữ số
  - Không có số 0 đứng đầu (trừ chính số 0)
- **Edge cases:**
  - Số 1 chữ số: chỉ có 0, 1, 8 là strobogrammatic
  - Số chứa các chữ số không strobogrammatic (2, 3, 4, 5, 7)
  - Số 0: là strobogrammatic

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem số có giống nhau khi xoay 180 độ không
- **Bước 2:** Xác định cách tiếp cận - dùng Hash Table để map các chữ số strobogrammatic
- **Bước 3:** Lên kế hoạch giải pháp - Hash Table (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: num = "69"

Các chữ số strobogrammatic:
- 0 → 0
- 1 → 1
- 6 → 9
- 8 → 8
- 9 → 6

Kiểm tra:
- 6 → 9 ✓
- 9 → 6 ✓
Kết quả: "69" → "69" → true

Example 2: num = "88"

Kiểm tra:
- 8 → 8 ✓
- 8 → 8 ✓
Kết quả: "88" → "88" → true

Example 3: num = "962"

Kiểm tra:
- 9 → 6 ✓
- 6 → 9 ✓
- 2 → không strobogrammatic ✗
Kết quả: false
```

---

## 💡 Giải pháp 1: Brute Force - Hash Table (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Hash Table để map các chữ số strobogrammatic (0→0, 1→1, 6→9, 8→8, 9→6). Duyệt qua chuỗi, kiểm tra xem mỗi chữ số có trong map không. Nếu có, thay bằng giá trị tương ứng. Sau đó so sánh chuỗi gốc với chuỗi đã thay đổi.

### Thuật toán / Algorithm

1. Tạo Hash Table `strobMap` = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
2. Tạo chuỗi kết quả `result = ""`
3. Duyệt qua từng ký tự trong `num`:
   - Nếu ký tự không tồn tại trong `strobMap`, trả về `false`
   - Thêm `strobMap[char]` vào `result`
4. So sánh `num` với `result`
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Strobogrammatic Number - Hash Table Solution
 * @param {string} num - Chuỗi biểu diễn số
 * @return {boolean} - true nếu là strobogrammatic number, false nếu không
 */
function isStrobogrammatic_bruteForce(num) {
  // Hash Table map các chữ số strobogrammatic
  const strobMap = {
    0: "0",
    1: "1",
    6: "9",
    8: "8",
    9: "6",
  };

  // Tạo chuỗi kết quả
  let result = "";

  // Duyệt qua từng ký tự
  for (const char of num) {
    // Nếu ký tự không strobogrammatic, trả về false
    if (!strobMap[char]) {
      return false;
    }
    // Thêm giá trị tương ứng vào kết quả
    result += strobMap[char];
  }

  // So sánh chuỗi gốc với chuỗi kết quả
  return num === result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi một lần, n là độ dài chuỗi
- **Space Complexity:** O(n) - Lưu trữ chuỗi kết quả

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn
- Độ phức tạp thời gian tối ưu O(n)

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho chuỗi kết quả
- Không tối ưu về space

---

## 🚀 Giải pháp 2: Optimized - Two Pointers (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Tốn bộ nhớ cho chuỗi kết quả
- Cách tiếp cận mới? Sử dụng Two Pointers để so sánh trực tiếp

### Ý tưởng / Idea

Dùng hai con trỏ `left` và `right` để so sánh từ hai đầu của chuỗi. Với mỗi cặp ký tự, kiểm tra xem chúng có phải là cặp strobogrammatic không.

### Thuật toán / Algorithm

1. Tạo Hash Table `strobMap` = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
2. Khởi tạo `left = 0`, `right = num.length - 1`
3. Trong khi `left <= right`:
   - Nếu `num[left]` không tồn tại trong `strobMap` hoặc `num[right]` không tồn tại trong `strobMap`, trả về `false`
   - Nếu `strobMap[num[left]] !== num[right]` hoặc `strobMap[num[right]] !== num[left]`, trả về `false`
   - Tăng `left`, giảm `right`
4. Trả về `true`

### Code / Implementation

```javascript
/**
 * Strobogrammatic Number - Two Pointers Solution
 * @param {string} num - Chuỗi biểu diễn số
 * @return {boolean} - true nếu là strobogrammatic number, false nếu không
 */
function isStrobogrammatic_optimized(num) {
  // Hash Table map các chữ số strobogrammatic
  const strobMap = {
    0: "0",
    1: "1",
    6: "9",
    8: "8",
    9: "6",
  };

  // Sử dụng Two Pointers
  let left = 0;
  let right = num.length - 1;

  while (left <= right) {
    const leftChar = num[left];
    const rightChar = num[right];

    // Kiểm tra xem ký tự có strobogrammatic không
    if (!strobMap[leftChar] || !strobMap[rightChar]) {
      return false;
    }

    // Kiểm tra xem có phải cặp strobogrammatic không
    if (strobMap[leftChar] !== rightChar || strobMap[rightChar] !== leftChar) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi một lần
- **Space Complexity:** O(1) - Hash Table có kích thước cố định

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Không cần tạo chuỗi kết quả

### Nhược điểm / Cons

- Cần hiểu về Two Pointers
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - Set Lookup (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Set để kiểm tra nhanh hơn
- Có thuật toán/pattern nào phù hợp hơn? Tương tự giải pháp Optimized

### Ý tưởng / Idea

Tương tự giải pháp Optimized, nhưng dùng Set để kiểm tra xem ký tự có phải là strobogrammatic không.

### Thuật toán / Algorithm

Tương tự giải pháp Optimized.

### Code / Implementation

```javascript
/**
 * Strobogrammatic Number - Set Lookup Solution
 * @param {string} num - Chuỗi biểu diễn số
 * @return {boolean} - true nếu là strobogrammatic number, false nếu không
 */
function isStrobogrammatic_advanced(num) {
  // Set chứa các chữ số strobogrammatic
  const strobSet = new Set(["0", "1", "6", "8", "9"]);

  // Hash Table map các chữ số strobogrammatic
  const strobMap = {
    0: "0",
    1: "1",
    6: "9",
    8: "8",
    9: "6",
  };

  // Sử dụng Two Pointers
  let left = 0;
  let right = num.length - 1;

  while (left <= right) {
    const leftChar = num[left];
    const rightChar = num[right];

    // Kiểm tra xem ký tự có strobogrammatic không (dùng Set)
    if (!strobSet.has(leftChar) || !strobSet.has(rightChar)) {
      return false;
    }

    // Kiểm tra xem có phải cặp strobogrammatic không
    if (strobMap[leftChar] !== rightChar || strobMap[rightChar] !== leftChar) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi một lần
- **Space Complexity:** O(1) - Set và Hash Table có kích thước cố định

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Set lookup nhanh hơn

### Nhược điểm / Cons

- Tương tự giải pháp Optimized

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Hash Table           | O(n) | O(n)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| Two Pointers         | O(n) | O(1)  | Trung bình / Medium | Cần tối ưu space           |
| Set Lookup           | O(n) | O(1)  | Trung bình / Medium | Muốn tối ưu lookup         |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const num = "69";
const expected = true;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 2: Số 88 / Number 88

```javascript
const num = "88";
const expected = true;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 3: Không phải strobogrammatic / Not Strobogrammatic

```javascript
const num = "962";
const expected = false;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 4: Số 0 / Number 0

```javascript
const num = "0";
const expected = true;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 5: Số 1 chữ số không strobogrammatic / Single Non-Strobogrammatic

```javascript
const num = "2";
const expected = false;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 6: Số dài / Long Number

```javascript
const num = "609";
const expected = true;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 7: Số chứa chữ số không strobogrammatic / Contains Non-Strobogrammatic

```javascript
const num = "123";
const expected = false;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

### Test Case 8: Số 11 / Number 11

```javascript
const num = "11";
const expected = true;
const result = isStrobogrammatic_bruteForce(num);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Math](../algorithms/algorithms/math.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Strobogrammatic Number là gì?**
   - Số nhìn giống nhau khi xoay 180 độ
   - Các chữ số strobogrammatic: 0→0, 1→1, 6→9, 8→8, 9→6

2. **Các phương pháp kiểm tra:**
   - Hash Table + String Comparison: tạo chuỗi kết quả và so sánh
   - Two Pointers: so sánh trực tiếp từ hai đầu

3. **Two Pointers Pattern:**
   - `left` di chuyển từ đầu sang giữa
   - `right` di chuyển từ cuối sang giữa
   - Dừng khi `left > right`

4. **Hash Table vs Set:**
   - Hash Table: map giá trị từ khóa
   - Set: kiểm tra xem khóa có tồn tại không

5. **Edge Cases:**
   - Số 0: là strobogrammatic
   - Số 1 chữ số: chỉ 0, 1, 8 là strobogrammatic
   - Số chứa 2, 3, 4, 5, 7: không phải strobogrammatic

6. **Lưu ý về ràng buộc:**
   - Không có số 0 đứng đầu (trừ chính số 0)
   - Chuỗi chỉ chứa chữ số

---

_Last updated: 2025-02-04_
