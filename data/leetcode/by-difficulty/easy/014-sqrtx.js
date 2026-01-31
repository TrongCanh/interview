/**
 * Problem: Sqrt(x)
 * URL: https://leetcode.com/problems/sqrtx/
 * Difficulty: Easy
 * Category: Math, Binary Search
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given a non-negative integer x, return the square root of x rounded down to the nearest integer.
 *
 * The returned integer should be non-negative as well.
 *
 * Example 1:
 * Input: x = 4
 * Output: 2
 * Explanation: The square root of 4 is 2, so we return 2.
 *
 * Example 2:
 * Input: x = 8
 * Output: 2
 * Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, we return 2.
 *
 * Constraints:
 * - 0 <= x <= 2^31 - 1
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: số nguyên không âm x
 *    - Output: floor(sqrt(x))
 *    - Không được dùng built-in sqrt
 *
 * 2. Phân tích:
 *    - Cần tìm số n sao cho n² <= x < (n+1)²
 *    - Dùng binary search để tìm
 *    - Hoặc dùng Newton's method
 *
 * 3. Các cách tiếp cận:
 *    - Binary Search: Dùng binary search → O(log x)
 *    - Newton's Method: Dùng iteration → O(log x)
 *    - Linear Search: Duyệt từ 0 → O(√x)
 */

// =====================================================
// GIẢI PHÁP 1: Binary Search (Đơn giản nhất)
// =====================================================
/**
 * Time: O(log x)
 * Space: O(1)
 *
 * Ý tưởng: Dùng binary search để tìm sqrt
 *
 * Giải thích:
 * - left = 0, right = x
 * - Vòng lặp: left <= right
 * - mid = floor((left + right) / 2)
 * - Nếu mid² > x → right = mid - 1
 * - Nếu mid² <= x → left = mid
 * - Trả về left
 *
 * Ưu điểm:
 * - Tối ưu, dễ hiểu
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu binary search
 */
function mySqrt_binary(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square > x) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return left;
}

// =====================================================
// GIẢI PHÁP 2: Newton's Method (Cải tiến)
// =====================================================
/**
 * Time: O(log x)
 * Space: O(1)
 *
 * Ý tưởng: Dùng Newton's method để tìm sqrt
 *
 * Giải thích:
 * - Formula: x_{n+1} = (x_n + x / x_n) / 2
 * - Bắt đầu với x_0 = x
 * - Lặp cho đến khi |x_{n+1} - x_n| < 1
 *
 * Ưu điểm:
 * - Tối ưu
 * - Convergence nhanh
 *
 * Nhược điểm:
 * - Phức tạp hơn binary search
 * - Khó hiểu
 */
function mySqrt_newton(x) {
  if (x < 2) return x;

  let result = x;

  while (true) {
    const newResult = Math.floor((result + x / result) / 2);

    if (newResult >= result) {
      return result;
    }

    result = newResult;
  }
}

// =====================================================
// GIẢI PHÁP 3: Linear Search (Nâng cao - Không tối ưu)
// =====================================================
/**
 * Time: O(√x)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từ 0 đến khi n² > x
 *
 * Giải thích:
 * - Duyệt n từ 0
 * - Nếu n² > x → trả về n - 1
 *
 * Ưu điểm:
 * - Dễ hiểu nhất
 * - Code đơn giản
 *
 * Nhược điểm:
 * - Chậm: O(√x)
 * - Không tối ưu cho x lớn
 */
function mySqrt_linear(x) {
  if (x < 2) return x;

  let n = 1;
  while (n * n <= x) {
    n++;
  }

  return n - 1;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: x = 4");
console.log("Binary Search:", mySqrt_binary(4));
console.log("Newton's Method:", mySqrt_newton(4));
console.log("Linear Search:", mySqrt_linear(4));
console.log("Math.sqrt:", Math.floor(Math.sqrt(4)));
// Expected: 2

console.log("\n=== Test Case 2 ===");
console.log("Input: x = 8");
console.log("Binary Search:", mySqrt_binary(8));
console.log("Newton's Method:", mySqrt_newton(8));
console.log("Linear Search:", mySqrt_linear(8));
console.log("Math.sqrt:", Math.floor(Math.sqrt(8)));
// Expected: 2

console.log("\n=== Test Case 3 ===");
console.log("Input: x = 0");
console.log("Binary Search:", mySqrt_binary(0));
console.log("Newton's Method:", mySqrt_newton(0));
console.log("Linear Search:", mySqrt_linear(0));
console.log("Math.sqrt:", Math.floor(Math.sqrt(0)));
// Expected: 0

console.log("\n=== Test Case 4 ===");
console.log("Input: x = 2147395599");
console.log("Binary Search:", mySqrt_binary(2147395599));
console.log("Newton's Method:", mySqrt_newton(2147395599));
console.log("Linear Search:", mySqrt_linear(2147395599));
console.log("Math.sqrt:", Math.floor(Math.sqrt(2147395599)));
// Expected: 46339

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Binary Search | O(log x) | O(1) | Tối ưu (RECOMMENDED) |
 * | Newton's Method | O(log x) | O(1) | Tối ưu |
 * | Linear Search | O(√x) | O(1) | Dễ hiểu |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Binary Search (giải pháp 1)
 * - Pattern này dùng cho tìm giá trị gần đúng trong sorted range
 */

// Export cho LeetCode
module.exports = mySqrt_binary;
