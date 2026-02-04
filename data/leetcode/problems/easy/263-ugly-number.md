# Ugly Number / Số Xấu

> LeetCode Problem 263 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 263
- **URL:** https://leetcode.com/problems/ugly-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math, Dynamic Programming
- **Tags:** Math, Dynamic Programming
- **Thuật toán liên quan / Related Algorithms:** Math, DP
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, or `5`.

Given an integer `n`, return `true` if `n` is an ugly number, or `false` otherwise.

**Example 1:**

```
Input: n = 6
Output: true
Explanation: 6 = 2 × 3
```

**Example 2:**

```
Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore no prime factors limited to 2, 3, or 5.
```

**Example 3:**

```
Input: n = 14
Output: false
Explanation: 14 = 2 × 7, and 7 is a prime factor not limited to 2, 3, or 5.
```

**Constraints:**

- `1 <= n <= 1690`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên dương `n`
- **Output:** `true` nếu `n` là ugly number, `false` nếu không
- **Ràng buộc / Constraints:**
  - Giá trị n: 1 ≤ n ≤ 1690
- **Edge cases:**
  - `n = 1`: là ugly number (không có prime factor)
  - `n` là số nguyên tố: không phải ugly number
  - `n` có prime factor ngoài 2, 3, 5: không phải ugly number

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem tất cả prime factors của n có nằm trong {2, 3, 5} không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Loop chia hoặc DP
- **Bước 3:** Lên kế hoạch giải pháp - Loop chia (O(√n) time), DP (O(n) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: n = 6

Prime factors của 6:
- 6 ÷ 2 = 3
- 3 là prime → 6 = 2 × 3
- 3 ∈ {2, 3, 5} ✓
Kết quả: true

Example 2: n = 1

1 không có prime factor
Kết quả: true (theo đề bài, không có prime factor = ugly)

Example 3: n = 14

Prime factors của 14:
- 14 ÷ 2 = 7
- 7 là prime → 14 = 2 × 7
- 7 ∉ {2, 3, 5} ✗
Kết quả: false
```

---

## 💡 Giải pháp 1: Brute Force - Loop Chia (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chia `n` cho từng số nguyên tố từ 2 đến √n. Nếu n chia hết cho số nào, chia tiếp `n` cho số đó. Lặp cho đến khi `n = 1`. Nếu tất cả các số nguyên tố đều nằm trong {2, 3, 5}, trả về `true`.

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Khởi tạo `current = n`
3. Duyệt qua các số nguyên tố từ 2 đến √n:
   - Nếu `current % i == 0`:
     - Nếu `i` không nằm trong {2, 3, 5}, trả về `false`
     - `current = current / i`
4. Trả về `true`

### Code / Implementation

```javascript
/**
 * Ugly Number - Loop Division Solution
 * @param {number} n - Số nguyên dương
 * @return {boolean} - true nếu là ugly number, false nếu không
 */
function isUgly_bruteForce(n) {
  // Edge case: số không dương
  if (n <= 0) {
    return false;
  }

  const uglyPrimes = new Set([2, 3, 5]);
  let current = n;

  // Chia cho các số nguyên tố từ 2 đến √n
  for (let i = 2; i * i <= current; i++) {
    if (current % i === 0) {
      // Kiểm tra xem i có phải là ugly prime không
      if (!uglyPrimes.has(i)) {
        return false;
      }
      current = current / i;
    }
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(√n) - Chia cho các số từ 2 đến √n
- **Space Complexity:** O(1) - Set có kích thước cố định 3

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng

### Nhược điểm / Cons

- Độ phức tạp thời gian không tối ưu
- Chia cho nhiều số không cần thiết

---

## 🚀 Giải pháp 2: Optimized - Loop Chia Tối ưu (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force chia cho nhiều số không cần thiết
- Điểm yếu của giải pháp 1? Chia cho các số không phải là ugly prime
- Cách tiếp cận mới? Chia chỉ cho các ugly primes

### Ý tưởng / Idea

Chia `n` chỉ cho các ugly primes (2, 3, 5) cho đến khi `n = 1`.

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Khởi tạo `current = n`
3. Duyệt qua các ugly primes [2, 3, 5]:
   - Trong khi `current % i == 0`:
     - `current = current / i`
4. Trả về `true`

### Code / Implementation

```javascript
/**
 * Ugly Number - Optimized Loop Division Solution
 * @param {number} n - Số nguyên dương
 * @return {boolean} - true nếu là ugly number, false nếu không
 */
function isUgly_optimized(n) {
  // Edge case: số không dương
  if (n <= 0) {
    return false;
  }

  const uglyPrimes = [2, 3, 5];
  let current = n;

  // Chia chỉ cho các ugly primes
  for (const i of uglyPrimes) {
    while (current % i === 0) {
      current = current / i;
    }
  }

  return current === 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia cho 3 ugly primes
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Độ phức tạp thời gian tốt hơn
- Code ngắn gọn
- Không chia cho các số không cần thiết

### Nhược điểm / Cons

- Cần biết các ugly primes
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - DP (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng DP để kiểm tra nhanh hơn
- Có thuật toán/pattern nào phù hợp hơn? Dynamic Programming

### Ý tưởng / Idea

Sử dụng DP để lưu trữ các ugly numbers. Nếu `n` là ugly number, `n = 2^a × 3^b × 5^c` với a, b, c ≥ 0.

### Thuật toán / Algorithm

1. Nếu `n <= 0`, trả về `false`
2. Khởi tạo `dp = [1]` (1 là ugly number)
3. Duyệt qua các ugly numbers từ 2 đến n:
   - Nếu `dp[i]` không phải ugly number, bỏ qua
   - Ngược lại, thêm vào `dp`
4. Trả về `dp[n] === true`

### Code / Implementation

```javascript
/**
 * Ugly Number - DP Solution
 * @param {number} n - Số nguyên dương
 * @return {boolean} - true nếu là ugly number, false nếu không
 */
function isUgly_advanced(n) {
  // Edge case: số không dương
  if (n <= 0) {
    return false;
  }

  // DP để lưu trữ các ugly numbers
  const dp = new Array(n + 1).fill(false);
  dp[1] = true;

  // Duyệt qua các số từ 2 đến n
  for (let i = 2; i <= n; i++) {
    // Kiểm tra xem i có phải ugly number không
    if (i % 2 === 0) {
      dp[i] = dp[i / 2];
    } else if (i % 3 === 0) {
      dp[i] = dp[i / 3];
    } else if (i % 5 === 0) {
      dp[i] = dp[i / 5];
    }
    // Ngược lại, không phải ugly number
  }

  return dp[n];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua các số từ 2 đến n
- **Space Complexity:** O(n) - Mảng dp lưu trữ n + 1 phần tử

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Tận dụng DP

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ
- Code phức tạp hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | -------- | ----- | ------------------- | -------------------------- |
| Loop Chia            | O(√n)    | O(1)  | Dễ / Easy           | Học thuật toán cơ bản      |
| Loop Chia Tối ưu     | O(log n) | O(1)  | Dễ / Easy           | Cần tối ưu time            |
| DP                   | O(n)     | O(n)  | Trung bình / Medium | Cần tối ưu nhiều truy vấn  |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const n = 6;
const expected = true;
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 2: Số 1 / Number 1

```javascript
const n = 1;
const expected = true;
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 3: Không phải ugly number / Not Ugly Number

```javascript
const n = 14;
const expected = false;
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 4: Số nguyên tố / Prime Number

```javascript
const n = 7;
const expected = false;
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 5: Số lớn / Large Number

```javascript
const n = 30;
const expected = true; // 2 × 3 × 5
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 6: Số 0 / Zero

```javascript
const n = 0;
const expected = false;
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 7: Số 5 / Number 5

```javascript
const n = 5;
const expected = true; // 5 là ugly prime
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

### Test Case 8: Số 25 / Number 25

```javascript
const n = 25;
const expected = true; // 5 × 5
const result = isUgly_bruteForce(n);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)
  - [Dynamic Programming](../algorithms/dynamic-programming/dp-basics.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Ugly Number là gì?**
   - Số nguyên dương có prime factors chỉ là 2, 3, hoặc 5
   - Ví dụ: 6 = 2 × 3, 8 = 2 × 2 × 2

2. **Các phương pháp kiểm tra:**
   - Loop Chia: chia cho các số nguyên tố
   - Loop Chia Tối ưu: chia chỉ cho ugly primes
   - DP: lưu trữ các ugly numbers

3. **DP vs Loop:**
   - Loop: đơn giản, dễ hiểu
   - DP: tối ưu cho nhiều truy vấn

4. **Ugly Primes:**
   - Chỉ có 3 ugly primes: 2, 3, 5
   - Tất cả ugly numbers có thể biểu diễn dưới dạng 2^a × 3^b × 5^c

5. **Edge Cases:**
   - n = 1: là ugly number (không có prime factor)
   - n là số nguyên tố: không phải ugly number
   - n = 0: không phải ugly number

6. **Lưu ý về ràng buộc:**
   - n là số nguyên dương
   - n ≤ 1690

---

_Last updated: 2025-02-04_
