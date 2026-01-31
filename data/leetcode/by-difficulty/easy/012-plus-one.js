/**
 * Problem: Plus One
 * URL: https://leetcode.com/problems/plus-one/
 * Difficulty: Easy
 * Category: Array, Math
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant digit to the least significant digit in left-to-right order. The large integer does not contain any leading 0's, except for the number 0 itself.
 *
 * Increment the large integer by one and return the resulting array of digits.
 *
 * Example 1:
 * Input: digits = [1,2,3]
 * Output: [1,2,4]
 * Explanation: The array represents the integer 123.
 * Incrementing by one gives 123 + 1 = 124.
 * Thus, the result should be [1,2,4].
 *
 * Example 2:
 * Input: digits = [4,3,2,1]
 * Output: [4,3,2,2]
 * Explanation: The array represents the integer 4321.
 * Incrementing by one gives 4321 + 1 = 4322.
 * Thus, the result should be [4,3,2,2].
 *
 * Example 3:
 * Input: digits = [9]
 * Output: [1,0]
 * Explanation: The array represents the integer 9.
 * Incrementing by one gives 9 + 1 = 10.
 * Thus, the result should be [1,0].
 *
 * Constraints:
 * - 1 <= digits.length <= 100
 * - 0 <= digits[i] <= 9
 * - digits does not contain any leading 0, except for the number 0 itself.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng digits (số nguyên lớn)
 *    - Output: mảng digits sau khi cộng 1
 *    - Xử lý carry khi có 9
 *
 * 2. Phân tích:
 *    - Cộng 1 vào chữ số cuối
 *    - Nếu có carry, propagate lên các chữ số trước
 *    - Nếu tất cả là 9 → thêm 1 vào đầu
 *
 * 3. Các cách tiếp cận:
 *    - Iterate with Carry: Duyệt từ cuối, xử lý carry → O(n)
 *    - Convert to Number: Chuyển sang số, cộng, chuyển lại → O(n)
 *    - Reverse: Đảo ngược, xử lý, đảo lại → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Iterate with Carry (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1) (hoặc O(n) nếu phải thêm digit)
 *
 * Ý tưởng: Duyệt từ cuối, cộng 1, xử lý carry
 *
 * Giải thích:
 * - Duyệt từ cuối về đầu
 * - Nếu digit < 9 → cộng 1, break
 * - Nếu digit = 9 → set = 0, tiếp tục
 * - Nếu hết vòng lặp → thêm 1 vào đầu
 *
 * Ưu điểm:
 * - Tối ưu, in-place
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải xử lý edge case: tất cả là 9
 */
function plusOne_iterate(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }

  // Tất cả là 9, thêm 1 vào đầu
  return [1, ...digits];
}

// =====================================================
// GIẢI PHÁP 2: Convert to Number (Cải tiến - Không tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Chuyển sang số, cộng, chuyển lại
 *
 * Giải thích:
 * - Join digits thành string
 * - Parse thành số
 * - Cộng 1
 * - Tách lại thành mảng digits
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Không tối ưu cho số rất lớn (tràn số)
 * - Tốn extra space
 */
function plusOne_convert(digits) {
  const num = parseInt(digits.join(""), 10) + 1;
  return num.toString().split("").map(Number);
}

// =====================================================
// GIẢI PHÁP 3: Reverse (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Đảo ngược, xử lý từ đầu, đảo lại
 *
 * Giải thích:
 * - Đảo ngược mảng
 * - Cộng 1 vào phần tử đầu (đã là cuối)
 * - Xử lý carry
 * - Đảo ngược lại
 *
 * Ưu điểm:
 * - Code sạch
 * - Dễ đọc
 *
 * Nhược điểm:
 * - Tốn extra space cho reverse
 * - Không tối ưu bằng iterate
 */
function plusOne_reverse(digits) {
  const reversed = [...digits].reverse();
  let carry = 1;

  for (let i = 0; i < reversed.length; i++) {
    const sum = reversed[i] + carry;
    reversed[i] = sum % 10;
    carry = Math.floor(sum / 10);

    if (carry === 0) break;
  }

  if (carry > 0) {
    reversed.push(carry);
  }

  return reversed.reverse();
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: [1,2,3]");
console.log("Iterate:", plusOne_iterate([1, 2, 3]));
console.log("Convert:", plusOne_convert([1, 2, 3]));
console.log("Reverse:", plusOne_reverse([1, 2, 3]));
// Expected: [1,2,4]

console.log("\n=== Test Case 2 ===");
console.log("Input: [4,3,2,1]");
console.log("Iterate:", plusOne_iterate([4, 3, 2, 1]));
console.log("Convert:", plusOne_convert([4, 3, 2, 1]));
console.log("Reverse:", plusOne_reverse([4, 3, 2, 1]));
// Expected: [4,3,2,2]

console.log("\n=== Test Case 3 ===");
console.log("Input: [9]");
console.log("Iterate:", plusOne_iterate([9]));
console.log("Convert:", plusOne_convert([9]));
console.log("Reverse:", plusOne_reverse([9]));
// Expected: [1,0]

console.log("\n=== Test Case 4 ===");
console.log("Input: [9,9,9]");
console.log("Iterate:", plusOne_iterate([9, 9, 9]));
console.log("Convert:", plusOne_convert([9, 9, 9]));
console.log("Reverse:", plusOne_reverse([9, 9, 9]));
// Expected: [1,0,0,0]

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Iterate | O(n) | O(1)/O(n) | Tối ưu (RECOMMENDED) |
 * | Convert | O(n) | O(n) | Dễ hiểu |
 * | Reverse | O(n) | O(n) | Code sạch |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Iterate (giải pháp 1)
 * - Pattern này dùng cho xử lý carry trong math
 */

// Export cho LeetCode
module.exports = plusOne_iterate;
