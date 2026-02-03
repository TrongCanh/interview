# Climbing Stairs / Leo cầu thang

> LeetCode 70 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 70
- **URL:** https://leetcode.com/problems/climbing-stairs/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Dynamic Programming, Math, Memoization
- **Tags:** Dynamic Programming, Math, Memoization
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Example 1:**

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

**Constraints:**

- `1 <= n <= 45`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số bậc thang `n`
- **Output:** Số cách khác nhau để leo lên đỉnh thang
- **Ràng buộc / Constraints:**
  - `n` từ 1 đến 45
  - Mỗi lần chỉ có thể leo 1 hoặc 2 bậc
- **Edge cases:**
  - n = 1 → 1 cách
  - n = 2 → 2 cách
  - n = 3 → 3 cách

### 2. Tư duy / Thinking Process

- Bước 1: Để đến bậc thứ `n`, ta có thể đến từ bậc `n-1` (leo 1 bậc) hoặc bậc `n-2` (leo 2 bậc)
- Bước 2: Vậy `f(n) = f(n-1) + f(n-2)`
- Bước 3: Đây là dãy Fibonacci!
- Bước 4: Có thể dùng Recursion, Memoization, hoặc Dynamic Programming

### 3. Ví dụ minh họa / Examples

```
Example 1: n = 2
- f(2) = f(1) + f(0) = 1 + 1 = 2
- Cách 1: 1 + 1
- Cách 2: 2

Example 2: n = 3
- f(3) = f(2) + f(1) = 2 + 1 = 3
- Cách 1: 1 + 1 + 1
- Cách 2: 1 + 2
- Cách 3: 2 + 1

Example 3: n = 4
- f(4) = f(3) + f(2) = 3 + 2 = 5
- Cách 1: 1 + 1 + 1 + 1
- Cách 2: 1 + 1 + 2
- Cách 3: 1 + 2 + 1
- Cách 4: 2 + 1 + 1
- Cách 5: 2 + 2
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Recursion đơn giản: `f(n) = f(n-1) + f(n-2)` với `f(1) = 1`, `f(2) = 2`.

### Thuật toán / Algorithm

1. Nếu `n === 1`, trả về 1
2. Nếu `n === 2`, trả về 2
3. Ngược lại, trả về `climbStairs(n-1) + climbStairs(n-2)`

### Code / Implementation

```javascript
/**
 * Climbing Stairs - Giải pháp 1: Recursion (Brute Force)
 * @param {number} n - Số bậc thang
 * @return {number} - Số cách leo lên đỉnh
 *
 * Time Complexity: O(2^n) - mỗi lần gọi tạo 2 nhánh
 * Space Complexity: O(n) - stack depth
 *
 * Lưu ý: Giải pháp này rất chậm với n lớn
 */
function climbStairs_bruteForce(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  return climbStairs_bruteForce(n - 1) + climbStairs_bruteForce(n - 2);
}

// Test
console.log(climbStairs_bruteForce(2)); // 2
console.log(climbStairs_bruteForce(3)); // 3
console.log(climbStairs_bruteForce(4)); // 5
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(2^n) - mỗi lần gọi tạo 2 nhánh
- **Space Complexity:** O(n) - stack depth

### Ưu điểm / Pros

- Code rất đơn giản
- Dễ hiểu

### Nhược điểm / Cons

- **Rất chậm với n lớn** (tính lại nhiều lần cùng một giá trị)
- Không tối ưu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 quá chậm với n lớn
- Điểm yếu của giải pháp 1? Tính lại nhiều lần cùng một giá trị (overlapping subproblems)
- Cách tiếp cận mới? Sử dụng Memoization để lưu kết quả đã tính

### Ý tưởng / Idea

Sử dụng Memoization để lưu kết quả của các giá trị đã tính. Khi cần tính lại, chỉ cần lấy từ cache.

### Thuật toán / Algorithm

1. Tạo một array `memo` để lưu kết quả
2. Nếu `memo[n]` đã có, trả về nó
3. Ngược lại, tính `memo[n] = climbStairs(n-1) + climbStairs(n-2)` và lưu vào `memo`
4. Trả về `memo[n]`

### Code / Implementation

```javascript
/**
 * Climbing Stairs - Giải pháp 2: Memoization (Optimized)
 * @param {number} n - Số bậc thang
 * @return {number} - Số cách leo lên đỉnh
 *
 * Time Complexity: O(n) - mỗi giá trị chỉ tính một lần
 * Space Complexity: O(n) - memo array + stack depth
 */
function climbStairs_memoization(n, memo = {}) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  // Nếu đã tính rồi, trả về kết quả từ memo
  if (memo[n]) {
    return memo[n];
  }

  // Tính và lưu vào memo
  memo[n] =
    climbStairs_memoization(n - 1, memo) + climbStairs_memoization(n - 2, memo);

  return memo[n];
}

// Test
console.log(climbStairs_memoization(2)); // 2
console.log(climbStairs_memoization(3)); // 3
console.log(climbStairs_memoization(4)); // 5
console.log(climbStairs_memoization(45)); // 1836311903
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi giá trị chỉ tính một lần
- **Space Complexity:** O(n) - memo array + stack depth

### Ưu điểm / Pros

- Nhanh hơn nhiều so với giải pháp 1
- Dễ hiểu
- Không tính lại cùng một giá trị

### Nhược điểm / Cons

- Tốn bộ nhớ để lưu memo
- Stack depth vẫn là O(n)

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể giảm space complexity
- Có thuật toán/pattern nào phù hợp hơn? Dynamic Programming (Bottom-up) hoặc Space Optimization

### Ý tưởng / Idea

Sử dụng Dynamic Programming (Bottom-up) với Space Optimization. Vì `f(n)` chỉ phụ thuộc vào `f(n-1)` và `f(n-2)`, ta chỉ cần lưu 2 giá trị này thay vì toàn bộ array.

### Thuật toán / Algorithm

1. Nếu `n === 1`, trả về 1
2. Khởi tạo `prev2 = 1` (f(1)), `prev1 = 2` (f(2))
3. Duyệt từ 3 đến n:
   - `current = prev1 + prev2`
   - `prev2 = prev1`
   - `prev1 = current`
4. Trả về `prev1`

### Code / Implementation

```javascript
/**
 * Climbing Stairs - Giải pháp 3: DP with Space Optimization (Advanced)
 * @param {number} n - Số bậc thang
 * @return {number} - Số cách leo lên đỉnh
 *
 * Time Complexity: O(n) - duyệt từ 3 đến n
 * Space Complexity: O(1) - chỉ lưu 2 biến
 */
function climbStairs_dp(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  let prev2 = 1; // f(1)
  let prev1 = 2; // f(2)

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Test
console.log(climbStairs_dp(2)); // 2
console.log(climbStairs_dp(3)); // 3
console.log(climbStairs_dp(4)); // 5
console.log(climbStairs_dp(45)); // 1836311903
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt từ 3 đến n
- **Space Complexity:** O(1) - chỉ lưu 2 biến

### Ưu điểm / Pros

- Tối ưu về cả time và space
- Không có stack overflow
- Code ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về Dynamic Programming

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution    | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| ----------------------- | ------ | ----- | ------------------- | -------------------------- |
| Recursion (Brute Force) | O(2^n) | O(n)  | Dễ / Easy           | Số nhỏ, demo nhanh         |
| Memoization             | O(n)   | O(n)  | Trung bình / Medium | Số lớn, cần tối ưu         |
| DP (Space Optimized)    | O(n)   | O(1)  | Trung bình / Medium | Tối ưu nhất, số lớn        |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = 2;
const expected1 = 2;
console.log(`Input: ${input1}`);
console.log(`Expected: ${expected1}`);
console.log(`Brute Force: ${climbStairs_bruteForce(input1)}`);
console.log(`Memoization: ${climbStairs_memoization(input1)}`);
console.log(`DP: ${climbStairs_dp(input1)}`);
```

### Test Case 2: 3 bậc / 3 Steps

```javascript
const input2 = 3;
const expected2 = 3;
console.log(`Input: ${input2}`);
console.log(`Expected: ${expected2}`);
console.log(`Brute Force: ${climbStairs_bruteForce(input2)}`);
console.log(`Memoization: ${climbStairs_memoization(input2)}`);
console.log(`DP: ${climbStairs_dp(input2)}`);
```

### Test Case 3: 4 bậc / 4 Steps

```javascript
const input3 = 4;
const expected3 = 5;
console.log(`Input: ${input3}`);
console.log(`Expected: ${expected3}`);
console.log(`Brute Force: ${climbStairs_bruteForce(input3)}`);
console.log(`Memoization: ${climbStairs_memoization(input3)}`);
console.log(`DP: ${climbStairs_dp(input3)}`);
```

### Test Case 4: Số lớn / Large Number

```javascript
const input4 = 45;
const expected4 = 1836311903;
console.log(`Input: ${input4}`);
console.log(`Expected: ${expected4}`);
console.log(`Brute Force: ${climbStairs_bruteForce(input4)}`); // Rất chậm
console.log(`Memoization: ${climbStairs_memoization(input4)}`);
console.log(`DP: ${climbStairs_dp(input4)}`);
```

### Test Case 5: 1 bậc / 1 Step

```javascript
const input5 = 1;
const expected5 = 1;
console.log(`Input: ${input5}`);
console.log(`Expected: ${expected5}`);
console.log(`Brute Force: ${climbStairs_bruteForce(input5)}`);
console.log(`Memoization: ${climbStairs_memoization(input5)}`);
console.log(`DP: ${climbStairs_dp(input5)}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Dynamic Programming:** [`../../algorithms/dynamic-programming/dp-basics.md`](../../algorithms/dynamic-programming/dp-basics.md)
- **Recursion:** [`../../algorithms/algorithms/recursion.md`](../../algorithms/algorithms/recursion.md)
- **Math:** [`../../algorithms/algorithms/math.md`](../../algorithms/algorithms/math.md)

---

## 💡 Tips & Tricks

1. **Fibonacci Sequence:** Bài toán này chính là dãy Fibonacci với `f(1) = 1`, `f(2) = 2`
2. **Overlapping Subproblems:** Khi recursion tính lại cùng một giá trị nhiều lần, dùng Memoization
3. **Space Optimization:** Khi DP chỉ phụ thuộc vào vài giá trị trước đó, có thể tối ưu space
4. **Base Cases:** Luôn xác định rõ base cases (trong bài này là f(1) và f(2))

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 70 - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [Dynamic Programming - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)
- [Fibonacci Sequence - Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_sequence)

---

_Last updated: 2025-02-03_
