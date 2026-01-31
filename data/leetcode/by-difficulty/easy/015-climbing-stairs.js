/**
 * Problem: Climbing Stairs
 * URL: https://leetcode.com/problems/climbing-stairs/
 * Difficulty: Easy
 * Category: Dynamic Programming, Math
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 * Example 1:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * Example 2:
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 *
 * Constraints:
 * - 1 <= n <= 45
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: số bậc cầu thang n
 *    - Output: số cách leo lên đỉnh
 *    - Mỗi bước: 1 hoặc 2 bậc
 *
 * 2. Phân tích:
 *    - Đây là bài toán Fibonacci
 *    - f(n) = f(n-1) + f(n-2)
 *    - f(1) = 1, f(2) = 2
 *
 * 3. Các cách tiếp cận:
 *    - DP: Dùng dynamic programming → O(n)
 *    - Recursion: Dùng đệ quy → O(2^n)
 *    - Formula: Dùng công thức Fibonacci → O(log n)
 */

// =====================================================
// GIẢI PHÁP 1: DP with Array (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Dùng DP array để lưu kết quả
 *
 * Giải thích:
 * - dp[i] = số cách leo lên bậc i
 * - dp[0] = 1, dp[1] = 1
 * - dp[i] = dp[i-1] + dp[i-2]
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn O(n) extra space
 */
function climbStairs_dpArray(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// =====================================================
// GIẢI PHÁP 2: DP with Variables (Cải tiến - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng 2 biến thay vì array
 *
 * Giải thích:
 * - prev2 = f(i-2), prev1 = f(i-1)
 * - current = prev1 + prev2
 * - Cập nhật: prev2 = prev1, prev1 = current
 *
 * Ưu điểm:
 * - Tối ưu, O(1) space
 * - Code sạch
 *
 * Nhược điểm:
 * - Phải hiểu Fibonacci
 */
function climbStairs_dpVariables(n) {
  if (n <= 2) return n;

  let prev2 = 1; // f(0)
  let prev1 = 1; // f(1)

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// =====================================================
// GIẢI PHÁP 3: Recursion with Memoization (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n) - call stack + memo
 *
 * Ý tưởng: Dùng đệ quy với memoization
 *
 * Giải thích:
 * - Base case: n <= 2 → trả về n
 * - Recursive: f(n) = f(n-1) + f(n-2)
 * - Dùng memo để tránh tính lại
 *
 * Ưu điểm:
 * - Code dễ đọc
 * - Thể hiện tư duy đệ quy
 *
 * Nhược điểm:
 * - Tốn stack space
 * - Không tối ưu bằng DP variables
 */
function climbStairs_recursion(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) {
    memo[n] = n;
    return n;
  }

  memo[n] =
    climbStairs_recursion(n - 1, memo) + climbStairs_recursion(n - 2, memo);
  return memo[n];
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: n = 2");
console.log("DP Array:", climbStairs_dpArray(2));
console.log("DP Variables:", climbStairs_dpVariables(2));
console.log("Recursion:", climbStairs_recursion(2));
// Expected: 2

console.log("\n=== Test Case 2 ===");
console.log("Input: n = 3");
console.log("DP Array:", climbStairs_dpArray(3));
console.log("DP Variables:", climbStairs_dpVariables(3));
console.log("Recursion:", climbStairs_recursion(3));
// Expected: 3

console.log("\n=== Test Case 3 ===");
console.log("Input: n = 1");
console.log("DP Array:", climbStairs_dpArray(1));
console.log("DP Variables:", climbStairs_dpVariables(1));
console.log("Recursion:", climbStairs_recursion(1));
// Expected: 1

console.log("\n=== Test Case 4 ===");
console.log("Input: n = 5");
console.log("DP Array:", climbStairs_dpArray(5));
console.log("DP Variables:", climbStairs_dpVariables(5));
console.log("Recursion:", climbStairs_recursion(5));
// Expected: 8

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | DP Array | O(n) | O(n) | Dễ hiểu |
 * | DP Variables | O(n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Recursion | O(n) | O(n) | Code dễ đọc |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng DP Variables (giải pháp 2)
 * - Pattern này dùng cho Fibonacci-like problems
 */

// Export cho LeetCode
module.exports = climbStairs_dpVariables;
