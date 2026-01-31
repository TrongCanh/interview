# Dynamic Programming Pattern / Pattern Quy hoạch động

> Giải thích và ví dụ về pattern Dynamic Programming / Dynamic Programming pattern explanation and examples

---

## 📚 Khái niệm / Concept

**Dynamic Programming (DP)** là kỹ thuật giải quyết bài toán bằng cách chia nhỏ thành các bài toán con, lưu kết quả để tránh tính lại.

---

## 🎯 Khi nào dùng? / When to use?

- Bài toán có overlapping subproblems
- Bài toán có optimal substructure
- Tìm max/min/count số cách
- Bài toán đệ quy có tính toán lặp lại

---

## 🔄 Các biến thể / Variations

### 1. Top-Down (Memoization)

- Dùng đệ quy + cache
- Dễ hiểu, dễ implement

### 2. Bottom-Up (Tabulation)

- Dùng vòng lặp + table
- Tối ưu hơn, không stack overflow

---

## 💡 Code Template / Mẫu Code

### Top-Down with Memoization

```javascript
function dpTopDown(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = dpTopDown(n - 1, memo) + dpTopDown(n - 2, memo);
  return memo[n];
}
```

### Bottom-Up with Tabulation

```javascript
function dpBottomUp(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

### Space Optimized

```javascript
function dpOptimized(n) {
  if (n <= 1) return n;

  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

---

## 📝 Ví dụ bài toán / Example Problems

### 1. Climbing Stairs

**URL:** https://leetcode.com/problems/climbing-stairs/

**Approach:** Fibonacci pattern

```javascript
// Top-Down
function climbStairs(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return n;

  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

// Bottom-Up
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

### 2. Coin Change

**URL:** https://leetcode.com/problems/coin-change/

**Approach:** Unbounded knapsack pattern

```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### 3. Longest Increasing Subsequence

**URL:** https://leetcode.com/problems/longest-increasing-subsequence/

**Approach:** DP + Binary Search (O(n log n))

```javascript
// O(n²) - Basic DP
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }

  return max;
}

// O(n log n) - With Binary Search
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}
```

### 4. Longest Common Subsequence

**URL:** https://leetcode.com/problems/longest-common-subsequence/

**Approach:** 2D DP

```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

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
```

### 5. House Robber

**URL:** https://leetcode.com/problems/house-robber/

**Approach:** DP với 2 trạng thái

```javascript
function rob(nums) {
  let prev2 = 0; // không rob nhà trước
  let prev1 = 0; // rob nhà trước

  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

---

## 🎯 Practice Problems / Bài tập

### 1D DP

1. Climbing Stairs (Easy)
2. Min Cost Climbing Stairs (Easy)
3. House Robber (Medium)
4. Coin Change (Medium)
5. Partition Equal Subset Sum (Medium)

### 2D DP

1. Unique Paths (Medium)
2. Unique Paths II (Medium)
3. Longest Common Subsequence (Medium)
4. Edit Distance (Medium)
5. Regular Expression Matching (Hard)

### Advanced

1. Longest Increasing Subsequence (Medium)
2. Best Time to Buy and Sell Stock (Medium)
3. Burst Balloons (Hard)
4. Trapping Rain Water (Hard)

---

## ⚠️ Common Pitfalls / Lỗi thường gặp

1. Quên base case
2. Sai công thức chuyển trạng thái
3. Quên space optimization
4. Tính lại subproblems (không dùng memo)

---

## 📊 Complexity / Độ phức tạp

| Loại / Type | Time  | Space        |
| ----------- | ----- | ------------ |
| 1D DP       | O(n)  | O(n) → O(1)  |
| 2D DP       | O(mn) | O(mn) → O(n) |

---

## 💡 Tips / Mẹo

1. Bắt đầu với đệ quy, sau đó chuyển sang DP
2. Xác định state (điều kiện để xác định subproblem)
3. Xác định base case
4. Viết công thức chuyển trạng thái
5. Cố gắng space optimize

---

## 🔄 DP Patterns / Các Pattern DP

| Pattern                        | Ví dụ / Example                                        |
| ------------------------------ | ------------------------------------------------------ |
| 0/1 Knapsack                   | Subset Sum, Partition Equal Subset Sum                 |
| Unbounded Knapsack             | Coin Change, Rod Cutting                               |
| Longest Common Subsequence     | LCS, Edit Distance                                     |
| Longest Increasing Subsequence | LIS, Russian Doll Envelopes                            |
| Matrix Chain Multiplication    | Burst Balloons, Minimum Score Triangulation            |
| Palindrome                     | Longest Palindromic Substring, Palindrome Partitioning |

---

## 🎯 4 Steps to Solve DP / 4 bước giải DP

1. **Define State**: DP[i] đại diện cho gì?
2. **Base Case**: DP[0], DP[1] bằng gì?
3. **Transition**: Công thức để tính DP[i] từ các DP trước đó?
4. **Answer**: Kết quả nằm ở đâu?

---

_Last updated: 2026-01-30_
