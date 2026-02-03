# Divide Two Integers / Chia hai số nguyên

> LeetCode Problem 29 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 29
- **URL:** https://leetcode.com/problems/divide-two-integers/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Math, Bit Manipulation
- **Tags:** Math, Bit Manipulation
- **Thuật toán liên quan / Related Algorithms:** Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing `dividend` by `divisor`.

The integer division should truncate toward zero.

**Example 1:**

```
Input: dividend = 10, divisor = 3
Output: 3
```

**Example 2:**

```
Input: dividend = 7, divisor = -3
Output: -2
```

**Example 3:**

```
Input: dividend = 0, divisor = 1
Output: 0
```

**Constraints:**

- `-2^31 <= dividend, divisor <= 2^31 - 1`
- `divisor != 0`
- `dividend != 0` (or `dividend == 0` and `divisor < 0`)

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai số nguyên dividend và divisor
- **Output:** Thương số nguyên sau khi chia dividend cho divisor
- **Ràng buộc / Constraints:**
  - Giá trị: -2^31 đến 2^31 - 1
  - Divisor không được bằng 0
  - Dividend không được bằng 0 (hoặc nếu bằng 0 thì divisor phải âm)
- **Edge cases:**
  - Dividend nhỏ hơn divisor (kết quả 0)
  - Dividend là số âm
  - Divisor là số âm
  - Kết quả overflow (khi chia -2^31 cho -1)

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - chia hai số nguyên mà không dùng phép nhân, chia, mod
- Bước 2: Nhận thấy có thể dùng bit manipulation để tối ưu
- Bước 3: Với bit manipulation, có thể xử lý dấu hiệu quả và overflow

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10 / 3 = 3 (chia nguyên)

Example 2:
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7 / -3 = -2.33... = -2 (truncate về 0)

Example 3:
Input: dividend = 0, divisor = 1
Output: 0
Explanation: 0 / 1 = 0
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng phép chia liên tiếp (repeated subtraction) để tính thương. Trừ divisor cho dividend cho đến khi kết quả nhỏ hơn divisor hoặc bằng 0.

### Thuật toán / Algorithm

1. Nếu divisor == 0, trả về 0 (không thể chia cho 0)
2. Xác định dấu của kết quả (cùng dấu với dividend \* divisor)
3. Dùng vòng lặp while để trừ liên tiếp:
   - Khởi tạo quotient = 0
   - Dùng vòng lặp while với điều kiện:
     - Nếu |dividend| >= |divisor|, có thể trừ
     - Trừ divisor cho dividend
     - Tăng quotient
     - Nếu |dividend| < |divisor|, dừng
4. Trả về quotient với đúng dấu

### Code / Implementation

```javascript
/**
 * Divide Two Integers - Brute Force Solution
 * @param {number} dividend - Số bị chia
 * @param {number} divisor - Số chia
 * @return {number} - Thương số nguyên
 */
function divide_bruteForce(dividend, divisor) {
  // Edge case: không thể chia cho 0
  if (divisor === 0) {
    return 0;
  }

  // Xác định dấu của kết quả
  const negative = dividend < 0 !== divisor < 0;

  // Chuyển về số dương để dễ xử lý
  let absDividend = Math.abs(dividend);
  let absDivisor = Math.abs(divisor);

  let quotient = 0;

  // Dùng phép chia liên tiếp
  while (absDividend >= absDivisor) {
    absDividend -= absDivisor;
    quotient++;
  }

  return negative ? -quotient : quotient;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(|dividend|/|divisor|) - số lần trừ bằng thương
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Dễ hiểu và implement
- Không cần bit manipulation
- Xử lý được trường hợp số âm

### Nhược điểm / Cons

- Độ phức tạp thời gian cao với số lớn
- Không tối ưu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? O(|dividend|/|divisor|) quá chậm với số lớn
- Điểm yếu của giải pháp 1? Chia lần lượt, rất chậm
- Cách tiếp cận mới? Dùng bit manipulation để chia nhanh hơn (binary search)

### Ý tưởng / Idea

Sử dụng bit manipulation để chia nhanh hơn. Thay vì chia lần lượt, ta có thể dịch phải sang trái (dịch 31 bit) để nhân nhanh với 2^n, sau đó dịch lại phải để chia.

### Thuật toán / Algorithm

1. Nếu divisor == 0, trả về 0
2. Xác định dấu của kết quả (cùng dấu với dividend \* divisor)
3. Dịch phải dividend sang trái 31 bit: shiftedDividend = dividend << 31
4. Dịch phải divisor sang trái 31 bit: shiftedDivisor = divisor << 31
5. Tính thương: quotient = shiftedDividend / shiftedDivisor
6. Trả về kết quả với đúng dấu

### Code / Implementation

```javascript
/**
 * Divide Two Integers - Optimized Solution using Bit Manipulation
 * @param {number} dividend - Số bị chia
 * @param {number} divisor - Số chia
 * @return {number} - Thương số nguyên
 */
function divide_optimized(dividend, divisor) {
  // Edge case: không thể chia cho 0
  if (divisor === 0) {
    return 0;
  }

  // Xác định dấu của kết quả
  const negative = dividend < 0 !== divisor < 0;

  // Dịch phải sang trái 31 bit để nhân nhanh với 2^31
  const shiftedDividend = dividend << 31;
  const shiftedDivisor = divisor << 31;

  // Tính thương
  const quotient = shiftedDividend / shiftedDivisor;

  // Trả về kết quả với đúng dấu
  return negative ? -quotient : quotient;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - chỉ dùng phép chia và dịch bit
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Độ phức tạp thời gian rất tốt
- Tối ưu về số lượng phép tính
- Không cần vòng lặp

### Nhược điểm / Cons

- Phức tạp hơn brute force
- Cần hiểu về bit manipulation
- Có thể gây overflow khi dịch bit

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là O(1), không thể tốt hơn
- Có thuật toán/pattern nào phù hợp hơn? Binary Search pattern

### Ý tưởng / Idea

Tương tự giải pháp 2 nhưng xử lý tốt hơn overflow và edge cases. Dùng binary search để tìm thương gần đúng, sau đó điều chỉnh.

### Thuật toán / Algorithm

1. Nếu divisor == 0, trả về 0
2. Xác định dấu của kết quả
3. Dùng binary search để tìm thương:
   - Tìm thương trong khoảng [-2^31, 2^31 - 1]
   - Dùng phép nhân để kiểm tra: quotient \* divisor <= dividend
   - Điều chỉnh thương dựa trên kết quả phép nhân

### Code / Implementation

```javascript
/**
 * Divide Two Integers - Advanced Solution with Binary Search
 * @param {number} dividend - Số bị chia
 * @param {number} divisor - Số chia
 * @return {number} - Thương số nguyên
 */
function divide_advanced(dividend, divisor) {
  // Edge case: không thể chia cho 0
  if (divisor === 0) {
    return 0;
  }

  // Xác định dấu của kết quả
  const negative = dividend < 0 !== divisor < 0;

  // Xác định khoảng tìm kiếm
  const INT_MIN = -Math.pow(2, 31);
  const INT_MAX = Math.pow(2, 31) - 1;

  let quotient = 0;

  // Binary search để tìm thương
  let low = -1;
  let high = dividend;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Kiểm tra xem mid * divisor có overflow không
    // Để tránh overflow, kiểm tra mid > INT_MAX / divisor
    if (mid > INT_MAX / divisor) {
      // Nếu có thể overflow, dùng INT_MAX thay vì mid * divisor
      const product = INT_MAX * divisor;
      if (product <= dividend) {
        quotient = mid;
        break;
      } else {
        // Quá lớn, dùng low
        low = mid + 1;
      }
    } else {
      // Kiểm tra mid * divisor <= dividend
      const product = mid * divisor;
      if (product <= dividend) {
        quotient = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  }

  return negative ? -quotient : quotient;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(|dividend|/|divisor|)) - binary search
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Độ phức tạp thời gian rất tốt
- Xử lý tốt overflow
- Không gây overflow

### Nhược điểm / Cons

- Code phức tạp hơn giải pháp 2
- Cần hiểu về binary search
- Khó implement đúng

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- | ---------- | ---------------------------- |
| Brute Force          | O(    | d     | )                   | O(1)                       | Dễ / Easy  | Số nhỏ, dễ hiểu              |
| Optimized            | O(1)  | O(1)  | Trung bình / Medium | Tất cả trường hợp, tối ưu  |
| Advanced             | O(log | d     | )                   | O(1)                       | Khó / Hard | Số lớn, cần tối ưu thời gian |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(divide_bruteForce(10, 3)); // Expected: 3
console.log(divide_optimized(10, 3)); // Expected: 3
console.log(divide_advanced(10, 3)); // Expected: 3
```

### Test Case 2: Số âm

```javascript
console.log(divide_bruteForce(7, -3)); // Expected: -2
console.log(divide_optimized(7, -3)); // Expected: -2
console.log(divide_advanced(7, -3)); // Expected: -2
```

### Test Case 3: Divisor âm

```javascript
console.log(divide_bruteForce(10, -3)); // Expected: -3
console.log(divide_optimized(10, -3)); // Expected: -3
console.log(divide_advanced(10, -3)); // Expected: -3
```

### Test Case 4: Dividend nhỏ hơn divisor

```javascript
console.log(divide_bruteForce(3, 10)); // Expected: 0
console.log(divide_optimized(3, 10)); // Expected: 0
console.log(divide_advanced(3, 10)); // Expected: 0
```

### Test Case 5: Số lớn

```javascript
console.log(divide_bruteForce(Math.pow(2, 30) - 1, 1)); // Expected: 1073741823
console.log(divide_optimized(Math.pow(2, 30) - 1, 1)); // Expected: 1073741823
console.log(divide_advanced(Math.pow(2, 30) - 1, 1)); // Expected: 1073741823
```

### Test Case 6: Edge case - dividend = 0

```javascript
console.log(divide_bruteForce(0, 1)); // Expected: 0
console.log(divide_optimized(0, 1)); // Expected: 0
console.log(divide_advanced(0, 1)); // Expected: 0
```

### Test Case 7: Edge case - divisor = 0

```javascript
console.log(divide_bruteForce(10, 0)); // Expected: 0
console.log(divide_optimized(10, 0)); // Expected: 0
console.log(divide_advanced(10, 0)); // Expected: 0
```

### Test Case 8: Số âm chia cho số âm

```javascript
console.log(divide_bruteForce(-10, 3)); // Expected: -3
console.log(divide_optimized(-10, 3)); // Expected: -3
console.log(divide_advanced(-10, 3)); // Expected: -3
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

- **Patterns liên quan:**
  - None

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
- [LeetCode Discuss](https://leetcode.com/problems/divide-two-integers/discuss/)
- [Bit Manipulation - GeeksforGeeks](https://www.geeksforgeeks.org/bit-manipulation/)
- [Binary Search - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

---

## 💬 Lời khuyên / Tips

- Luôn kiểm tra edge cases: divisor = 0, dividend = 0, số âm
- Xác định dấu của kết quả trước khi tính
- Dịch phải sang trái 31 bit để nhân nhanh với 2^31
- Kiểm tra overflow trước khi phép nhân
- Với binary search, luôn có điều kiện dừng đúng
- Vẽ hình để visualize binary search

---

_Last updated: 2026-02-03_
