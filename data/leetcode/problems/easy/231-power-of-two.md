# Power of Two / Lũy Thừa Của 2

> LeetCode Problem 231 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 231
- **URL:** https://leetcode.com/problems/power-of-two/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math, Bit Manipulation
- **Tags:** Math, Bit Manipulation, Recursion
- **Thuật toán liên quan / Related Algorithms:** Bit Manipulation, Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an integer `n`, return `true` if it is a power of two. Otherwise return `false`.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Example 1:**

```
Input: n = 1
Output: true
Explanation: 2^0 = 1
```

**Example 2:**

```
Input: n = 16
Output: true
Explanation: 2^4 = 16
```

**Example 3:**

```
Input: n = 3
Output: false
```

**Constraints:**

- `-2^31 <= n <= 2^31 - 1`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên `n`
- **Output:** `true` nếu `n` là lũy thừa của 2, `false` nếu không
- **Ràng buộc / Constraints:**
  - Giá trị n: -2^31 ≤ n ≤ 2^31 - 1
  - n có thể âm hoặc bằng 0
- **Edge cases:**
  - `n = 0`: không phải lũy thừa của 2
  - `n = 1`: là lũy thừa của 2 (2^0 = 1)
  - `n < 0`: không phải lũy thừa của 2
  - `n = 2^31`: là lũy thừa của 2

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem n có phải là 2^x với x là số nguyên không âm không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Loop, Bit Manipulation, hoặc Math.log
- **Bước 3:** Lên kế hoạch giải pháp - Loop (O(log n) time), Bit Manipulation (O(1) time), Math.log (O(1) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: n = 1
1 = 2^0 → true

Example 2: n = 16
16 = 2^4 → true
16 trong binary: 10000 (chỉ có 1 bit là 1)

Example 3: n = 3
3 không phải lũy thừa của 2
3 trong binary: 11 (có 2 bit là 1)

Example 4: n = 0
0 không phải lũy thừa của 2 → false

Example 5: n = -4
-4 không phải lũy thừa của 2 → false
```

---

## 💡 Giải pháp 1: Brute Force - Loop (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chia n cho 2 liên tục cho đến khi n bằng 1. Nếu tại bất kỳ bước nào n không chia hết cho 2, trả về `false`.

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Trong khi `n > 1`:
   - Nếu `n % 2 !== 0`, trả về `false`
   - Chia `n` cho 2
3. Trả về `true`

### Code / Implementation

```javascript
/**
 * Power of Two - Loop Solution
 * @param {number} n - Số nguyên cần kiểm tra
 * @return {boolean} - true nếu là lũy thừa của 2, false nếu không
 */
function isPowerOfTwo_bruteForce(n) {
  // Edge case: số không dương không phải lũy thừa của 2
  if (n <= 0) {
    return false;
  }

  // Chia n cho 2 liên tục
  while (n > 1) {
    if (n % 2 !== 0) {
      return false;
    }
    n = n / 2;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia n cho 2 cho đến khi n = 1
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Không cần kiến thức về bit manipulation
- Code ngắn gọn

### Nhược điểm / Cons

- Độ phức tạp thời gian O(log n) không tối ưu
- Sử dụng phép chia (có thể chậm hơn bit manipulation)

---

## 🚀 Giải pháp 2: Optimized - Bit Manipulation (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Loop có độ phức tạp O(log n)
- Điểm yếu của giải pháp 1? Sử dụng phép chia, không tối ưu
- Cách tiếp cận mới? Sử dụng Bit Manipulation - lũy thừa của 2 chỉ có 1 bit là 1

### Ý tưởng / Idea

Một số là lũy thừa của 2 nếu và chỉ nếu trong biểu diễn binary của nó chỉ có đúng 1 bit là 1. Ví dụ:

- 1 = 0001
- 2 = 0010
- 4 = 0100
- 8 = 1000

Nếu `n` là lũy thừa của 2, thì `n & (n - 1)` sẽ bằng 0. Ví dụ:

- n = 8 (1000), n - 1 = 7 (0111)
- 8 & 7 = 1000 & 0111 = 0000 = 0

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Trả về `(n & (n - 1)) === 0`

### Code / Implementation

```javascript
/**
 * Power of Two - Bit Manipulation Solution
 * @param {number} n - Số nguyên cần kiểm tra
 * @return {boolean} - true nếu là lũy thừa của 2, false nếu không
 */
function isPowerOfTwo_optimized(n) {
  // Edge case: số không dương không phải lũy thừa của 2
  if (n <= 0) {
    return false;
  }

  // n là lũy thừa của 2 nếu và chỉ nếu n & (n - 1) == 0
  return (n & (n - 1)) === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - Chỉ thực hiện 1 phép toán bit
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(1)
- Code cực kỳ ngắn gọn
- Sử dụng bitwise operation rất nhanh

### Nhược điểm / Cons

- Cần hiểu về Bit Manipulation
- Không dễ hiểu cho người mới

---

## ⚡ Giải pháp 3: Advanced - Built-in Function (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng hàm built-in của JavaScript
- Có thuật toán/pattern nào phù hợp hơn? Math.log2

### Ý tưởng / Idea

Sử dụng `Math.log2(n)` để tính logarit cơ số 2 của n. Nếu kết quả là số nguyên, n là lũy thừa của 2.

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Tính `log2n = Math.log2(n)`
3. Trả về `Number.isInteger(log2n)`

### Code / Implementation

```javascript
/**
 * Power of Two - Math.log2 Solution
 * @param {number} n - Số nguyên cần kiểm tra
 * @return {boolean} - true nếu là lũy thừa của 2, false nếu không
 */
function isPowerOfTwo_advanced(n) {
  // Edge case: số không dương không phải lũy thừa của 2
  if (n <= 0) {
    return false;
  }

  // n là lũy thừa của 2 nếu log2(n) là số nguyên
  const log2n = Math.log2(n);
  return Number.isInteger(log2n);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - Math.log2 là O(1)
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Code rất ngắn gọn
- Dễ hiểu
- Sử dụng hàm built-in

### Nhược điểm / Cons

- Có thể có vấn đề với precision của số thực
- Phụ thuộc vào hàm built-in của JavaScript

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | -------- | ----- | ------------------- | -------------------------- |
| Loop                 | O(log n) | O(1)  | Dễ / Easy           | Học thuật toán cơ bản      |
| Bit Manipulation     | O(1)     | O(1)  | Trung bình / Medium | Cần tối ưu, hiểu bit       |
| Math.log2            | O(1)     | O(1)  | Dễ / Easy           | Code ngắn, dễ hiểu         |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const n = 1;
const expected = true;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 2: Lũy thừa lớn / Large Power

```javascript
const n = 16;
const expected = true;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 3: Không phải lũy thừa / Not Power of Two

```javascript
const n = 3;
const expected = false;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 4: Số 0 / Zero

```javascript
const n = 0;
const expected = false;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 5: Số âm / Negative Number

```javascript
const n = -4;
const expected = false;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 6: Lũy thừa lớn nhất trong constraints / Max Power

```javascript
const n = 1073741824; // 2^30
const expected = true;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 7: Số lẻ lớn / Large Odd Number

```javascript
const n = 2147483647; // 2^31 - 1 (số lẻ lớn nhất trong constraints)
const expected = false;
const result = isPowerOfTwo_bruteForce(n);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Lũy thừa của 2 trong Binary:**
   - 1 = 0001
   - 2 = 0010
   - 4 = 0100
   - 8 = 1000
   - 16 = 10000
   - Chỉ có đúng 1 bit là 1

2. **Bit Manipulation Trick:**
   - `n & (n - 1) == 0`: kiểm tra xem n có phải lũy thừa của 2 không
   - Nguyên lý: n - 1 sẽ flip tất cả các bit từ bit 1 đầu tiên của n trở về bên phải
   - Ví dụ: n = 8 (1000), n - 1 = 7 (0111), 8 & 7 = 0000

3. **Các lũy thừa của 2:**
   - 2^0 = 1
   - 2^1 = 2
   - 2^2 = 4
   - 2^3 = 8
   - 2^4 = 16
   - ...

4. **Edge Cases:**
   - n = 0: không phải lũy thừa của 2
   - n < 0: không phải lũy thừa của 2
   - n = 1: là lũy thừa của 2 (2^0)

5. **JavaScript Math Functions:**
   - `Math.log2(n)`: tính logarit cơ số 2
   - `Number.isInteger(n)`: kiểm tra xem n có phải số nguyên không
   - `Math.pow(2, x)`: tính 2^x

6. **Lưu ý về Precision:**
   - Math.log2 có thể có vấn đề với precision cho số rất lớn
   - Bit manipulation là phương pháp an toàn nhất

---

_Last updated: 2025-02-04_
