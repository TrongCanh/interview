# Factorial Trailing Zeroes

> LeetCode Problem 172 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 172
- **URL:** https://leetcode.com/problems/factorial-trailing-zeroes/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math
- **Tags:** Math
- **Thuật toán liên quan / Related Algorithms:** Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer `n`, return the number of trailing zeroes in `n!`.
>
> Note that `n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`.
>
> Follow up: Could you write a solution that uses logarithmic time complexity? (i.e., O(log n))?

**Example 1:**

```
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
```

**Example 2:**

```
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
```

**Example 3:**

```
Input: n = 0
Output: 0
Explanation: 0! = 1, no trailing zero.
```

**Constraints:**

- `0 <= n <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên n
- **Output:** Số nguyên - số lượng số 0 ở cuối n!
- **Ràng buộc / Constraints:**
  - n! = 1 _ 2 _ 3 _ ... _ n
  - Số 0 ở cuối n! là số trailing zeros
- **Edge cases:**
  - n = 0 → 0 trailing zeros
  - n = 1 → 0 trailing zeros
  - n = 5 → 1 trailing zero

### 2. Tư duy / Thinking Process

- **Bước 1:** n! = n _ (n-1) _ (n-2) _ ... _ 1
- **Bước 2:** Mỗi cặp (2, 5) tạo ra 1 số 0
- **Bước 3:** Đếm số cặp (2, 5) trong n!

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: n = 3

Giải thích:
- 3! = 6 = 110
- 6 = 110 (binary: 2 * 5 + 1 * 2 + 0)
- Không có số 0 ở cuối → 0 trailing zeros

Output: 0
```

```
Example 2:
Input: n = 5

Giải thích:
- 5! = 120 = 1111000 (binary: 1111000)
- 120 có 1 số 0 ở cuối → 1 trailing zero

Output: 1
```

```
Example 3:
Input: n = 10

Giải thích:
- 10! = 3628800
- 3628800 = 111011110000 (binary)
- Có 2 số 0 ở cuối → 2 trailing zeros

Output: 2
```

---

## 💡 Giải pháp 1: Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Đếm số cặp (2, 5) trong n!. Mỗi cặp (2, 5) tạo ra 1 số 0 ở cuối.

### Thuật toán / Algorithm

1. Nếu n === 0, trả về 0
2. Khởi tạo count = 0
3. Trong khi n > 0:
   - n = n / 5
   - Nếu n % 5 === 0:
     - count++
   - n = Math.floor(n / 5)
4. Trả về count

### Code / Implementation

```javascript
/**
 * Factorial Trailing Zeroes - Iterative Solution
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n) {
  if (n === 0) {
    return 0;
  }

  let count = 0;

  while (n > 0) {
    n = Math.floor(n / 5);

    if (n % 5 === 0) {
      count++;
    }
  }

  return count;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia cho 5 mỗi vòng lặp
- **Space Complexity:** O(1) - Chỉ dùng 1 biến

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(log n)
- Code ngắn gọn
- Không dùng đệ quy

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Mathematical (Cải tiến) / Mathematical Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 đã tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu
- Cách tiếp cận mới? Có thể dùng công thức toán học

### Ý tưởng / Idea

Dùng công thức toán học: trailing zeros = (n! - n! / 5) / 5.

### Thuật toán / Algorithm

1. Nếu n === 0, trả về 0
2. Tính factorial = n!
3. Tính factorialWithout5 = factorial / 5^count
4. Trả về (factorial - factorialWithout5) / 5

### Code / Implementation

```javascript
/**
 * Factorial Trailing Zeroes - Mathematical Solution
 * @param {number} n
 * @return {number}
 */
function trailingZeroes_Math(n) {
  if (n === 0) {
    return 0;
  }

  // Tính n!
  let factorial = 1;
  for (let i = 2; i <= n; i++) {
    factorial *= i;
  }

  // Đếm số 5 trong n!
  let count = 0;
  let temp = n;
  while (temp % 5 === 0) {
    count++;
    temp = temp / 5;
  }

  // Loại bỏ các số 5
  const factorialWithout5 = factorial / Math.pow(5, count);

  return (factorial - factorialWithout5) / 5;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Tính factorial tốn O(n)
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Code dễ hiểu
- Không phụ thuộc vào vòng lặp

### Nhược điểm / Cons

- Độ phức tạp thời gian O(n) cao hơn giải pháp 1

---

## ⚡ Giải pháp 3: Logarithmic (Nâng cao) / Logarithmic Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng logarithmic time
- Có thuật toán/pattern nào phù hợp hơn? Dùng Legendre's Formula

### Ý tưởng / Idea

Dùng công thức Legendre: trailing zeros = (n - s_2 - s_5 - s_7 - ...) / 4 + 1, trong đó s_k là tổng các chữ số 1 của n trong biểu diễn 5.

### Thuật toán / Algorithm

1. Nếu n === 0, trả về 0
2. Tính s_2 = tổng các chữ số 1 của n trong biểu diễn 2
3. Tính s_5 = tổng các chữ số 1 của n trong biểu diễn 5
4. Trả về (n - s_2 - s_5) / 4

### Code / Implementation

```javascript
/**
 * Factorial Trailing Zeroes - Logarithmic Solution
 * @param {number} n
 * @return {number}
 */
function trailingZeroes_Logarithmic(n) {
  if (n === 0) {
    return 0;
  }

  // Tính s_2: tổng các chữ số 1 trong biểu diễn 2 của n
  let s_2 = 0;
  let temp = n;
  while (temp > 0) {
    s_2 += Math.floor(temp / 2);
    temp = Math.floor(temp / 2);
  }

  // Tính s_5: tổng các chữ số 1 trong biểu diễn 5 của n
  let s_5 = 0;
  temp = n;
  while (temp > 0) {
    s_5 += Math.floor(temp / 5);
    temp = Math.floor(temp / 5);
  }

  // Legendre's Formula
  return (n - s_2 - s_5) / 4;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia cho 2 và 5 mỗi vòng lặp
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(log n)
- Đáp ứng yêu cầu logarithmic time

### Nhược điểm / Cons

- Code phức tạp hơn giải pháp 1
- Khó hiểu hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space | Độ khó / Difficulty | Khi nào dùng / When to use    |
| -------------------- | -------- | ----- | ------------------- | ----------------------------- |
| Iterative            | O(log n) | O(1)  | Dễ / Easy           | Code ngắn, dễ hiểu            |
| Mathematical         | O(n)     | O(1)  | Trung bình / Medium | Code dễ hiểu                  |
| Logarithmic          | O(log n) | O(1)  | Khó / Hard          | Tối ưu, đáp ứng yêu cầu log n |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const n = 3;
console.log(trailingZeroes(n)); // Expected: 0
console.log(trailingZeroes_Math(n)); // Expected: 0
console.log(trailingZeroes_Logarithmic(n)); // Expected: 0
```

### Test Case 2: Có trailing zero / Has Trailing Zero

```javascript
const n = 5;
console.log(trailingZeroes(n)); // Expected: 1
console.log(trailingZeroes_Math(n)); // Expected: 1
console.log(trailingZeroes_Logarithmic(n)); // Expected: 1
```

### Test Case 3: n = 0

```javascript
const n = 0;
console.log(trailingZeroes(n)); // Expected: 0
console.log(trailingZeroes_Math(n)); // Expected: 0
console.log(trailingZeroes_Logarithmic(n)); // Expected: 0
```

### Test Case 4: n lớn / Large Number

```javascript
const n = 10;
console.log(trailingZeroes(n)); // Expected: 2
console.log(trailingZeroes_Math(n)); // Expected: 2
console.log(trailingZeroes_Logarithmic(n)); // Expected: 2
```

### Test Case 5: n rất lớn / Very Large Number

```javascript
const n = 100;
console.log(trailingZeroes(n)); // Expected: 24
console.log(trailingZeroes_Logarithmic(n)); // Expected: 24
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

---

## 💬 Lời khuyên / Tips

- **Iterative Approach:**
  - Chia n cho 5 mỗi vòng lặp
  - Đếm số lần chia hết cho 5
  - O(log n) time, O(1) space - nên dùng
- **Logarithmic Approach:**
  - Dùng Legendre's Formula
  - O(log n) time, O(1) space - đáp ứng yêu cầu
- **Legendre's Formula:**
  - trailing zeros = (n - s_2 - s_5 - s_7 - ...) / 4 + 1
  - s_k = tổng các chữ số 1 của n trong biểu diễn k
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp n = 0
  - Với iterative, sai điều kiện (n % 5 === 0)
  - Với logarithmic, sai công thức Legendre

---

_Last updated: 2026-02-03_
