# Reverse Integer

> LeetCode Problem 7 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 7
- **URL:** https://leetcode.com/problems/reverse-integer/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math
- **Tags:** Math
- **Thuật toán liên quan / Related Algorithms:** Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.
>
> **Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

**Example 1:**

```
Input: x = 123
Output: 321
```

**Example 2:**

```
Input: x = -123
Output: -321
```

**Example 3:**

```
Input: x = 120
Output: 21
```

**Example 4:**

```
Input: x = 0
Output: 0
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên 32-bit có dấu `x`
- **Output:** Số nguyên với các chữ số được đảo ngược
- **Ràng buộc / Constraints:**
  - `-2^31 <= x <= 2^31 - 1` (khoảng -2,147,483,648 đến 2,147,483,647)
  - Nếu kết quả vượt quá khoảng 32-bit, trả về 0
  - Không được dùng số 64-bit
- **Edge cases:**
  - Số âm
  - Số kết thúc bằng 0 (ví dụ: 120 → 21, không phải 021)
  - Số vượt quá khoảng 32-bit sau khi đảo
  - Số 0

### 2. Tư duy / Thinking Process

- **Bước 1:** Lấy từng chữ số của số (dùng modulo 10)
- **Bước 2:** Xây dựng số mới từ các chữ số đã lấy
- **Bước 3:** Kiểm tra tràn số trong quá trình xây dựng

### 3. Ví dụ minh họa / Examples

```
Example 1: x = 123
Bước 1: digit = 123 % 10 = 3,  x = 123 / 10 = 12,  result = 0 * 10 + 3 = 3
Bước 2: digit = 12 % 10 = 2,   x = 12 / 10 = 1,   result = 3 * 10 + 2 = 32
Bước 3: digit = 1 % 10 = 1,    x = 1 / 10 = 0,    result = 32 * 10 + 1 = 321
Output: 321
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển số thành chuỗi, đảo chuỗi, sau đó chuyển lại thành số.

### Thuật toán / Algorithm

1. Chuyển số thành chuỗi
2. Xử lý dấu âm nếu có
3. Đảo ngược chuỗi
4. Chuyển lại thành số
5. Kiểm tra tràn số

### Code / Implementation

```javascript
/**
 * Reverse Integer - String Solution
 * @param {number} x
 * @return {number}
 */
function reverse_string(x) {
  const isNegative = x < 0;
  const str = Math.abs(x).toString();
  const reversed = str.split("").reverse().join("");
  const result = isNegative ? -parseInt(reversed, 10) : parseInt(reversed, 10);

  // Kiểm tra tràn số 32-bit
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = -Math.pow(2, 31);

  if (result < INT_MIN || result > INT_MAX) {
    return 0;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Số chữ số của x
- **Space Complexity:** O(log n) - Lưu trữ chuỗi

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tận dụng các hàm built-in của JavaScript

### Nhược điểm / Cons

- Tốn thêm không gian cho chuỗi
- Không tối ưu về hiệu năng

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp String tốn thêm không gian
- Điểm yếu của giải pháp 1? Chuyển đổi giữa số và chuỗi tốn thời gian
- Cách tiếp cận mới? Dùng toán học để đảo ngược trực tiếp

### Ý tưởng / Idea

Dùng toán học: lấy từng chữ số bằng `% 10`, xây dựng số mới bằng `result * 10 + digit`.

### Thuật toán / Algorithm

1. Lưu dấu của số
2. Lấy giá trị tuyệt đối của số
3. Lặp khi x != 0:
   - Lấy chữ số cuối: `digit = x % 10`
   - Xây dựng kết quả: `result = result * 10 + digit`
   - Loại bỏ chữ số cuối: `x = Math.floor(x / 10)`
4. Áp dụng dấu ban đầu
5. Kiểm tra tràn số

### Code / Implementation

```javascript
/**
 * Reverse Integer - Mathematical Solution
 * @param {number} x
 * @return {number}
 */
function reverse_math(x) {
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = -Math.pow(2, 31);

  let result = 0;
  let num = x;

  while (num !== 0) {
    const digit = num % 10;
    num = Math.trunc(num / 10);

    // Kiểm tra tràn số trước khi nhân
    if (
      result > INT_MAX / 10 ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return 0;
    }
    if (
      result < Math.ceil(INT_MIN / 10) ||
      (result === Math.ceil(INT_MIN / 10) && digit < -8)
    ) {
      return 0;
    }

    result = result * 10 + digit;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Số chữ số của x
- **Space Complexity:** O(1) - Không dùng thêm không gian

### Ưu điểm / Pros

- Không tốn thêm không gian
- Hiệu quả hơn về hiệu năng
- Kiểm tra tràn số trong quá trình tính toán

### Nhược điểm / Cons

- Cần hiểu về toán học đảo ngược số
- Kiểm tra tràn số phức tạp hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp toán học đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp toán học là tối ưu nhất. Tuy nhiên, có thể tối ưu code bằng cách:

- Dùng `Math.trunc()` thay vì `Math.floor()` cho số âm
- Tối ưu điều kiện kiểm tra tràn số

### Code / Implementation

```javascript
/**
 * Reverse Integer - Optimized Mathematical Solution
 * @param {number} x
 * @return {number}
 */
function reverse_optimized(x) {
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let result = 0;

  while (x !== 0) {
    const digit = x % 10;
    x = Math.trunc(x / 10);

    // Kiểm tra tràn số - tối ưu
    if (result > INT_MAX / 10 || (result === INT_MAX / 10 && digit > 7)) {
      return 0;
    }
    if (result < INT_MIN / 10 || (result === INT_MIN / 10 && digit < -8)) {
      return 0;
    }

    result = result * 10 + digit;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn
- Hiệu quả nhất về cả thời gian và không gian

### Nhược điểm / Cons

- Cần hiểu rõ về kiểm tra tràn số

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space    | Độ khó / Difficulty | Khi nào dùng / When to use           |
| -------------------- | -------- | -------- | ------------------- | ------------------------------------ |
| String               | O(log n) | O(log n) | Dễ / Easy           | Code nhanh, không quan tâm hiệu năng |
| Mathematical         | O(log n) | O(1)     | Trung bình / Medium | Cần hiệu quả về không gian           |
| Optimized Math       | O(log n) | O(1)     | Trung bình / Medium | Cần tối ưu hiệu năng                 |

---

## 🧪 Test Cases

### Test Case 1: Số dương / Positive number

```javascript
console.log(reverse_string(123)); // 321
console.log(reverse_math(123)); // 321
console.log(reverse_optimized(123)); // 321
```

### Test Case 2: Số âm / Negative number

```javascript
console.log(reverse_string(-123)); // -321
console.log(reverse_math(-123)); // -321
console.log(reverse_optimized(-123)); // -321
```

### Test Case 3: Số kết thúc bằng 0 / Number ending with 0

```javascript
console.log(reverse_string(120)); // 21
console.log(reverse_math(120)); // 21
console.log(reverse_optimized(120)); // 21
```

### Test Case 4: Số 0 / Zero

```javascript
console.log(reverse_string(0)); // 0
console.log(reverse_math(0)); // 0
console.log(reverse_optimized(0)); // 0
```

### Test Case 5: Tràn số / Overflow

```javascript
console.log(reverse_string(1534236469)); // 0 (vượt quá 32-bit)
console.log(reverse_math(1534236469)); // 0
console.log(reverse_optimized(1534236469)); // 0
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Math:** [`../algorithms/algorithms/math.md`](../algorithms/algorithms/math.md)

---

## Tài liệu tham khảo / References

- [LeetCode - Reverse Integer](https://leetcode.com/problems/reverse-integer/)
- [32-bit Integer Range](<https://en.wikipedia.org/wiki/Integer_(computer_science)>)

---

_Last updated: 2026-02-03_
