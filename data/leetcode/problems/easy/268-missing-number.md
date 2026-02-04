# Missing Number / Số Bị Thiếu

> LeetCode Problem 268 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 268
- **URL:** https://leetcode.com/problems/missing-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Math, Bit Manipulation
- **Tags:** Array, Math, Bit Manipulation
- **Thuật toán liên quan / Related Algorithms:** Math, Bit Manipulation
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

**Example 1:**

```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3, there are 3 numbers [0,1,2,3], so the missing number is 2.
```

**Example 2:**

```
Input: nums = [0,1]
Output: 2
Explanation: n = 2, there are 2 numbers [0,1,2], so the missing number is 2.
```

**Example 3:**

```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9, there are 9 numbers [0,1,2,3,4,5,6,7,8,9], so the missing number is 8.
```

**Constraints:**

- `n == nums.length`
- `1 <= n <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng `nums` chứa `n` số riêng biệt trong khoảng [0, n]
- **Output:** Số bị thiếu trong khoảng [0, n]
- **Ràng buộc / Constraints:**
  - Độ dài mảng: n == nums.length
  - Giá trị: 1 ≤ n ≤ 10^4
  - Các số là riêng biệt
- **Edge cases:**
  - `n = 1`: mảng [0], trả về 1
  - Số bị thiếu là 0: mảng [1], trả về 0
  - Số bị thiếu là n: mảng [0, 1, ..., n-1], trả về n

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm số bị thiếu trong khoảng [0, n]
- **Bước 2:** Xác định cách tiếp cận - có thể dùng XOR hoặc Sum Formula
- **Bước 3:** Lên kế hoạch giải pháp - XOR (O(n) time, O(1) space), Sum Formula (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [3,0,1]

Phương pháp XOR:
- XOR tất cả các số: 3 XOR 0 XOR 1 = 2
- XOR từ 0 đến n: 0 XOR 1 XOR 2 XOR 3 = 0
- Kết quả: 2 XOR 0 = 2

Phương pháp Sum Formula:
- Tổng mảng: 3 + 0 + 1 = 4
- Tổng từ 0 đến n: 0 + 1 + 2 + 3 = 6
- Kết quả: 6 - 4 = 2

Example 2: nums = [0,1]

Phương pháp XOR:
- XOR tất cả các số: 0 XOR 1 = 1
- XOR từ 0 đến n: 0 XOR 1 XOR 2 = 3
- Kết quả: 1 XOR 3 = 2

Phương pháp Sum Formula:
- Tổng mảng: 0 + 1 = 1
- Tổng từ 0 đến n: 0 + 1 + 2 = 3
- Kết quả: 3 - 1 = 2

Example 3: nums = [9,6,4,2,3,5,7,0,1]

Phương pháp XOR:
- XOR tất cả các số: 9 XOR 6 XOR 4 XOR 2 XOR 3 XOR 5 XOR 7 XOR 0 XOR 1 = 8
- XOR từ 0 đến n: 0 XOR 1 XOR 2 XOR 3 XOR 4 XOR 5 XOR 6 XOR 7 XOR 8 XOR 9 = 1
- Kết quả: 8 XOR 1 = 9

Phương pháp Sum Formula:
- Tổng mảng: 9 + 6 + 4 + 2 + 3 + 5 + 7 + 0 + 1 = 37
- Tổng từ 0 đến n: 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45
- Kết quả: 45 - 37 = 8
```

---

## 💡 Giải pháp 1: Brute Force - XOR (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Tính XOR của tất cả các số trong mảng, sau đó XOR với XOR từ 0 đến n. Kết quả là số bị thiếu.

### Thuật toán / Algorithm

1. Tính `xorAll` = XOR của tất cả các số trong `nums`
2. Tính `xorRange` = XOR từ 0 đến n
3. Trả về `xorAll XOR xorRange`

### Code / Implementation

```javascript
/**
 * Missing Number - XOR Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Số bị thiếu
 */
function missingNumber_bruteForce(nums) {
  const n = nums.length;

  // Tính XOR của tất cả các số trong mảng
  let xorAll = 0;
  for (const num of nums) {
    xorAll ^= num;
  }

  // Tính XOR từ 0 đến n
  let xorRange = 0;
  for (let i = 0; i <= n; i++) {
    xorRange ^= i;
  }

  // Kết quả là số bị thiếu
  return xorAll ^ xorRange;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Optimized - Sum Formula (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp XOR đã tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu đáng kể
- Cách tiếp cận mới? Sử dụng công thức tổng

### Ý tưởng / Idea

Số bị thiếu = Tổng từ 0 đến n - Tổng mảng

### Thuật toán / Algorithm

1. Tính `sumArray` = Tổng của tất cả các số trong `nums`
2. Tính `sumRange` = Tổng từ 0 đến n = n × (n + 1) / 2
3. Trả về `sumRange - sumArray`

### Code / Implementation

```javascript
/**
 * Missing Number - Sum Formula Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Số bị thiếu
 */
function missingNumber_optimized(nums) {
  const n = nums.length;

  // Tính tổng của mảng
  const sumArray = nums.reduce((sum, num) => sum + num, 0);

  // Tính tổng từ 0 đến n: n × (n + 1) / 2
  const sumRange = (n * (n + 1)) / 2;

  // Số bị thiếu = tổng từ 0 đến n - tổng mảng
  return sumRange - sumArray;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Không cần XOR

### Nhược điểm / Cons

- Có thể gây overflow với n lớn (nhưng constraints n ≤ 10^4 nên không đáng kể)

---

## ⚡ Giải pháp 3: Advanced - Gauss Formula (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng công thức Gauss
- Có thuật toán/pattern nào phù hợp hơn? Công thức toán học

### Ý tưởng / Idea

Tổng từ 0 đến n = n × (n + 1) / 2 (công thức Gauss)
Số bị thiếu = Tổng từ 0 đến n - Tổng mảng

### Thuật toán / Algorithm

Tương tự giải pháp Sum Formula.

### Code / Implementation

```javascript
/**
 * Missing Number - Gauss Formula Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Số bị thiếu
 */
function missingNumber_advanced(nums) {
  const n = nums.length;

  // Tính tổng của mảng
  const sumArray = nums.reduce((sum, num) => sum + num, 0);

  // Tính tổng từ 0 đến n bằng công thức Gauss: n × (n + 1) / 2
  const sumRange = (n * (n + 1)) / 2;

  // Số bị thiếu = tổng từ 0 đến n - tổng mảng
  return sumRange - sumArray;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rõ ràng với comment
- Độ phức tạp tối ưu

### Nhược điểm / Cons

- Tương tự giải pháp Sum Formula

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| XOR                  | O(n) | O(1)  | Dễ / Easy           | Luôn dùng (tối ưu nhất)    |
| Sum Formula          | O(n) | O(1)  | Dễ / Easy           | Cách toán học đơn giản     |
| Gauss Formula        | O(n) | O(1)  | Dễ / Easy           | Code rõ ràng hơn           |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [3, 0, 1];
const expected = 2;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 2: Mảng 2 phần tử / Two Elements

```javascript
const nums = [0, 1];
const expected = 2;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 3: Mảng lớn / Large Array

```javascript
const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
const expected = 8;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 4: Số bị thiếu là 0 / Missing is 0

```javascript
const nums = [1];
const expected = 0;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 5: Số bị thiếu là n / Missing is n

```javascript
const nums = [0, 1, 2];
const expected = 3;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 6: Mảng 1 phần tử / Single Element

```javascript
const nums = [0];
const expected = 1;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 7: Mảng không có sắp xếp / Unsorted Array

```javascript
const nums = [1, 2, 0];
const expected = 3;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 8: Mảng đã sắp xếp / Sorted Array

```javascript
const nums = [0, 1, 2];
const expected = 3;
const result = missingNumber_bruteForce(nums);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)
  - [Bit Manipulation](../algorithms/algorithms/math.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **XOR Properties:**
   - a XOR a = 0
   - a XOR b XOR a = b
   - XOR có tính chất giao hoán: (a XOR b) XOR (a XOR c) = b XOR c

2. **Công thức Gauss:**
   - Tổng từ 0 đến n = n × (n + 1) / 2
   - Công thức này được phát hiện bởi Gauss khi còn nhỏ

3. **XOR vs Sum Formula:**
   - XOR: không gây overflow, nhưng cần hiểu về XOR
   - Sum Formula: đơn giản, dễ hiểu, nhưng có thể overflow với n rất lớn

4. **Edge Cases:**
   - n = 1: mảng [0], trả về 1
   - Số bị thiếu là 0: mảng [1], trả về 0
   - Số bị thiếu là n: mảng [0, 1, ..., n-1], trả về n

5. **Lưu ý về ràng buộc:**
   - Mảng chứa n số riêng biệt trong khoảng [0, n]
   - n = nums.length
   - Đảm bảo có đúng 1 số bị thiếu

---

_Last updated: 2025-02-04_
