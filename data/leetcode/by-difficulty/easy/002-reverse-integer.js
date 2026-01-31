/**
 * Problem: Reverse Integer
 * URL: https://leetcode.com/problems/reverse-integer/
 * Difficulty: Easy
 * Category: Math
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 *
 * Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 *
 * Example 1:
 * Input: x = 123
 * Output: 321
 *
 * Example 2:
 * Input: x = -123
 * Output: -321
 *
 * Example 3:
 * Input: x = 120
 * Output: 21
 *
 * Constraints:
 * - -2^31 <= x <= 2^31 - 1
 * - x does not contain any leading zero's, except the number 0 itself.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: số nguyên 32-bit x
 *    - Output: đảo ngược số, trả về 0 nếu overflow
 *    - Giả định: môi trường không thể lưu số 64-bit
 *
 * 2. Phân tích:
 *    - Cần đảo ngược chữ số của số nguyên
 *    - Phải kiểm tra overflow ([-2^31, 2^31 - 1])
 *    - Xử lý số âm
 *
 * 3. Các cách tiếp cận:
 *    - String: Chuyển sang string, đảo, chuyển lại → O(log n)
 *    - Math: Lấy từng chữ số bằng modulo → O(log n)
 *    - Recursion: Đệ quy → O(log n)
 */

// =====================================================
// GIẢI PHÁP 1: String Reverse (Đơn giản nhất)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(log n)
 *
 * Ý tưởng: Chuyển sang string, đảo, chuyển lại số
 *
 * Giải thích:
 * - Lấy absolute value
 * - Chuyển sang string, split, reverse, join
 * - Áp dụng dấu
 * - Kiểm tra overflow 32-bit
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn thêm bộ nhớ cho string
 * - Không tối ưu cho môi trường không có string
 */
function reverse_string(x) {
  const sign = Math.sign(x);
  const reversed = Math.abs(x).toString().split("").reverse().join("");
  const result = sign * parseInt(reversed, 10);

  // Kiểm tra overflow 32-bit
  if (result < -(2 ** 31) || result > 2 ** 31 - 1) {
    return 0;
  }

  return result;
}

// =====================================================
// GIẢI PHÁP 2: Math (Cải tiến - Tối ưu)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(1)
 *
 * Ý tưởng: Lấy từng chữ số bằng modulo 10, xây dựng số mới
 *
 * Giải thích:
 * - Lấy absolute value
 * - Duyệt: result = 0, x = Math.abs(x)
 * - Lặp: while (x > 0)
 * - Lấy chữ số cuối: digit = x % 10
 * - Xây dựng: result = result * 10 + digit
 * - Loại bỏ chữ số đã lấy: x = Math.floor(x / 10)
 * - Áp dụng dấu
 * - Kiểm tra overflow
 *
 * Ưu điểm:
 * - Tối ưu, không dùng string
 * - Code sạch
 *
 * Nhược điểm:
 * - Code phức tạp hơn một chút
 * - Phải hiểu modulo và overflow
 */
function reverse_math(x) {
  let result = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // Xử lý số âm
  const sign = Math.sign(x);
  let absX = Math.abs(x);

  while (absX > 0) {
    const digit = absX % 10;
    absX = Math.floor(absX / 10);

    // Kiểm tra overflow trước khi cộng
    if (result > INT_MAX / 10 || (result === INT_MAX / 10 && digit > 7)) {
      return 0;
    }

    result = result * 10 + digit;
  }

  return sign * result;
}

// =====================================================
// GIẢI PHÁP 3: Recursion (Nâng cao)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(log n) - call stack
 *
 * Ý tưởng: Dùng đệ quy để đảo ngược
 *
 * Giải thích:
 * - Base case: x = 0, trả về 0
 * - Lấy chữ số cuối: digit = x % 10
 * - Đệ quy với x / 10
 * - Kết hợp: digit * 10^length + recursive result
 *
 * Ưu điểm:
 * - Code sạch, dễ đọc
 * - Thể hiện tư duy đệ quy
 *
 * Nhược điểm:
 * - Tốn stack space
 * - Không tối ưu bằng math
 */
function reverse_recursive(x) {
  const helper = (num, reversed = 0) => {
    if (num === 0) return reversed;

    const digit = num % 10;
    const newNum = Math.floor(num / 10);
    const newReversed = reversed * 10 + digit;

    return helper(newNum, newReversed);
  };

  const result = helper(x, 0);

  // Kiểm tra overflow 32-bit
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  if (result > INT_MAX || result < INT_MIN) {
    return 0;
  }

  return result;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: 123");
console.log("String:", reverse_string(123));
console.log("Math:", reverse_math(123));
console.log("Recursive:", reverse_recursive(123));
console.log("Math.sqrt:", Math.floor(Math.sqrt(123)));
// Expected: 321

console.log("\n=== Test Case 2 ===");
console.log("Input: -123");
console.log("String:", reverse_string(-123));
console.log("Math:", reverse_math(-123));
console.log("Recursive:", reverse_recursive(-123));
console.log("Math.sqrt:", Math.floor(Math.sqrt(-123)));
// Expected: -321

console.log("\n=== Test Case 3 ===");
console.log("Input: 120");
console.log("String:", reverse_string(120));
console.log("Math:", reverse_math(120));
console.log("Recursive:", reverse_recursive(120));
console.log("Math.sqrt:", Math.floor(Math.sqrt(120)));
// Expected: 21

console.log("\n=== Test Case 4 (Overflow) ===");
console.log("Input: 1534236469");
console.log("String:", reverse_string(1534236469));
console.log("Math:", reverse_math(1534236469));
console.log("Recursive:", reverse_recursive(1534236469));
console.log("Math.sqrt:", Math.floor(Math.sqrt(1534236469)));
// Expected: 0

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | String | O(log n) | O(log n) | Code ngắn, dễ hiểu |
 * | Math | O(log n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Recursive | O(log n) | O(log n) | Code dễ đọc |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Math (giải pháp 2)
 * - Chú ý kiểm tra overflow 32-bit
 */

// Export cho LeetCode
module.exports = reverse_math;
