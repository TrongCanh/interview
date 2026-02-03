# Dynamic Programming Basics / Cơ bản về Quy hoạch Động

> Dynamic Programming (DP) là kỹ thuật tối ưu hóa giải quyết các bài toán có cấu trúc con lặp lại / Dynamic Programming is an optimization technique for solving problems with overlapping subproblems

---

## 📚 Khái niệm / Concept

**Dynamic Programming (DP)** là một phương pháp giải quyết các bài toán phức tạp bằng cách chia nhỏ thành các bài toán con, giải quyết từng bài toán con một lần và lưu kết quả để tái sử dụng.

**Dynamic Programming (DP)** is a method for solving complex problems by breaking them down into simpler subproblems, solving each subproblem only once, and storing the results for reuse.

### Nguyên lý cốt lõi / Core Principles

1. **Overlapping Subproblems (Bài toán con lặp lại):** Cùng một bài toán con được giải quyết nhiều lần
2. **Optimal Substructure (Cấu trúc tối ưu con):** Giải pháp tối ưu của bài toán lớn có thể được xây dựng từ các giải pháp tối ưu của bài toán con

### Các phương pháp chính / Main Approaches

1. **Top-Down (Memoization):** Đệ quy với lưu trữ kết quả
2. **Bottom-Up (Tabulation):** Tính toán từ dưới lên, dùng bảng

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Bài toán có thể chia thành các bài toán con lặp lại
  - Bài toán có cấu trúc tối ưu con (optimal substructure)
  - Cần tối ưu hóa các bài toán đệ quy tốn thời gian
  - Bài toán tìm đường đi tối ưu, chuỗi con, v.v.

- **Không dùng khi:**
  - Bài toán không có overlapping subproblems
  - Bài toán không có optimal substructure
  - Cần giải pháp nhanh (Greedy có thể đủ)
  - Không cần lưu trữ kết quả

---

## 🔄 Các biến thể / Variations

### 1. 1D Dynamic Programming / DP 1 Chiều

Dùng cho bài toán với một chiều dữ liệu hoặc chuỗi.

```javascript
// Ví dụ: Fibonacci với Memoization
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Time: O(n), Space: O(n)
```

```javascript
// Ví dụ: Fibonacci với Tabulation
function fibonacciTabulation(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Time: O(n), Space: O(n)
```

```javascript
// Ví dụ: Fibonacci với Space Optimization
function fibonacciOptimized(n) {
  if (n <= 1) return n;

  let prev2 = 0,
    prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Time: O(n), Space: O(1)
```

### 2. 2D Dynamic Programming / DP 2 Chiều

Dùng cho bài toán với hai chiều dữ liệu hoặc hai chuỗi.

```javascript
// Ví dụ: Longest Common Subsequence (LCS)
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = LCS của text1[0...i-1] và text2[0...j-1]
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Time: O(m*n), Space: O(m*n)
```

### 3. State Machine DP / DP Máy Trạng Thái

Dùng cho bài toán với các trạng thái chuyển đổi.

```javascript
// Ví dụ: House Robber
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // dp[i] = tối đa có thể cướp từ nhà 0 đến i
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // Hoặc cướp nhà i (không cướp i-1), hoặc không cướp nhà i
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
}

// Time: O(n), Space: O(n)
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template (Top-Down)

```javascript
/**
 * Top-Down DP với Memoization
 * @param {number} n - Kích thước bài toán
 * @return {number} - Kết quả tối ưu
 */
function dpTopDown(n, memo = {}) {
  // Base case
  if (n <= 1) return n;

  // Kiểm tra memo
  if (n in memo) return memo[n];

  // Tính toán và lưu vào memo
  memo[n] = dpTopDown(n - 1, memo) + dpTopDown(n - 2, memo);

  return memo[n];
}
```

### Template nâng cao / Advanced Template (Bottom-Up)

```javascript
/**
 * Bottom-Up DP với Tabulation
 * @param {number} n - Kích thước bài toán
 * @return {number} - Kết quả tối ưu
 */
function dpBottomUp(n) {
  // Base case
  if (n <= 1) return n;

  // Khởi tạo bảng DP
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  // Tính toán từ dưới lên
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

### Template 2D / 2D Template

```javascript
/**
 * 2D DP Template
 * @param {string} s1 - Chuỗi thứ nhất
 * @param {string} s2 - Chuỗi thứ hai
 * @return {number} - Kết quả tối ưu
 */
function dp2D(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  // Khởi tạo bảng 2D
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Tính toán từng ô
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Climbing Stairs / Leo Cầu Thang

**Mô tả:** Tìm số cách leo cầu thang với n bậc, mỗi lần có thể leo 1 hoặc 2 bậc.

**Code:**

```javascript
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1,
    prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// climbStairs(3) = 3
// climbStairs(4) = 5
// Time: O(n), Space: O(1)
```

### Ví dụ 2: Coin Change / Đổi Tiền

**Mô tả:** Tìm số lượng xu tối thiểu để tạo ra amount.

**Code:**

```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// coinChange([1,2,5], 11) = 3 (5+5+1)
// Time: O(amount * coins.length), Space: O(amount)
```

### Ví dụ 3: Longest Increasing Subsequence / Chuỗi Tăng Dài Nhất

**Mô tả:** Tìm độ dài chuỗi con tăng dài nhất.

**Code:**

```javascript
function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

// lengthOfLIS([10,9,2,5,3,7,101,18]) = 4
// Time: O(n²), Space: O(n)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/hard/010-regular-expression-matching.md`](../problems/hard/010-regular-expression-matching.md)
- [`../problems/hard/032-longest-valid-parentheses.md`](../problems/hard/032-longest-valid-parentheses.md)
- [`../problems/hard/044-wildcard-matching.md`](../problems/hard/044-wildcard-matching.md)

---

## 📊 Độ phức tạp / Complexity

| Loại / Type | Time         | Space             | Mô tả / Description |
| ----------- | ------------ | ----------------- | ------------------- |
| 1D DP       | O(n)         | O(n) hoặc O(1)    | Một chiều           |
| 2D DP       | O(m\*n)      | O(m\*n) hoặc O(n) | Hai chiều           |
| State DP    | O(n\*states) | O(n\*states)      | Nhiều trạng thái    |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên base case:** Không xác định điều kiện dừng đúng
2. **Sai thứ tự tính toán:** Bottom-up cần tính từ nhỏ đến lớn
3. **Khởi tạo sai:** Khởi tạo giá trị mặc định không đúng (0 vs Infinity)
4. **Overflow index:** Truy cập ngoài mảng khi i-1 hoặc j-1
5. **Space không tối ưu:** Có thể giảm space bằng cách chỉ lưu 2 hàng/cột trước

---

## 💡 Tips & Tricks

- Vẽ bảng DP để visualize
- Xác định rõ state (đại diện cho gì)
- Viết công thức chuyển đổi state trước khi code
- Cố gắng tối ưu space khi có thể
- Top-down dễ hiểu hơn, Bottom-up thường nhanh hơn
- Kiểm tra edge cases: rỗng, 1 phần tử

---

## 📚 Tài liệu tham khảo / References

- [Dynamic Programming - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)
- [Dynamic Programming - LeetCode](https://leetcode.com/tag/dynamic-programming/)
- [Introduction to DP - GeeksforGeeks](https://www.geeksforgeeks.org/dynamic-programming/)

---

_Last updated: 2026-02-03_
