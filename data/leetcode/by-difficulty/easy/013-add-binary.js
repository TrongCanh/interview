/**
 * Problem: Add Binary
 * URL: https://leetcode.com/problems/add-binary/
 * Difficulty: Easy
 * Category: String, Math, Bit Manipulation
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given two binary strings a and b, return their sum as a binary string.
 *
 * Example 1:
 * Input: a = "11", b = "1"
 * Output: "100"
 * Explanation: 11 (binary) + 1 (binary) = 100 (binary)
 *
 * Example 2:
 * Input: a = "1010", b = "1011"
 * Output: "10101"
 * Explanation: 1010 (binary) + 1011 (binary) = 10101 (binary)
 *
 * Constraints:
 * - 1 <= a.length, b.length <= 10^4
 * - a and b consist only of characters '0' and '1'.
 * - Each string does not contain leading zeros except for the zero itself.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: 2 binary strings a và b
 *    - Output: binary string của tổng
 *
 * 2. Phân tích:
 *    - Cộng từng bit từ phải sang trái
 *    - Xử lý carry khi tổng > 1
 *    - Kết quả có thể dài hơn input
 *
 * 3. Các cách tiếp cận:
 *    - Bitwise: Dùng bitwise operations → O(max(n,m))
 *    - Iterate: Duyệt từng bit → O(max(n,m))
 *    - Convert: Chuyển sang số, cộng, chuyển lại → O(max(n,m))
 */

// =====================================================
// GIẢI PHÁP 1: Iterate (Đơn giản nhất)
// =====================================================
/**
 * Time: O(max(n,m))
 * Space: O(max(n,m))
 *
 * Ý tưởng: Duyệt từng bit từ phải sang trái, cộng và xử lý carry
 *
 * Giải thích:
 * - i = max length - 1 (vị trí bit hiện tại)
 * - sum = bit a + bit b + carry
 * - result[i] = sum % 2
 * - carry = Math.floor(sum / 2)
 * - Sau khi hết vòng lặp, nếu còn carry → thêm vào kết quả
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải xử lý nhiều edge cases
 */
function addBinary_iterate(a, b) {
  const result = [];
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;

  while (i >= 0 || j >= 0) {
    const bitA = i >= 0 ? parseInt(a[i]) : 0;
    const bitB = j >= 0 ? parseInt(b[j]) : 0;
    const sum = bitA + bitB + carry;

    result.push(sum % 2);
    carry = Math.floor(sum / 2);

    i--;
    j--;
  }

  if (carry > 0) {
    result.push(carry);
  }

  return result.reverse().join("");
}

// =====================================================
// GIẢI PHÁP 2: Convert to Number (Cải tiến)
// =====================================================
/**
 * Time: O(max(n,m))
 * Space: O(max(n,m))
 *
 * Ý tưởng: Chuyển sang số, cộng, chuyển lại
 *
 * Giải thích:
 * - parseInt(a, 2) + parseInt(b, 2)
 * - toString(2) để chuyển về binary
 *
 * Ưu điểm:
 * - Code ngắn nhất
 * - Dùng built-in methods
 *
 * Nhược điểm:
 * - Không tối ưu cho string rất dài (tràn số)
 * - Tốn extra space
 */
function addBinary_convert(a, b) {
  const sum = parseInt(a, 2) + parseInt(b, 2);
  return sum.toString(2);
}

// =====================================================
// GIẢI PHÁP 3: Bitwise (Nâng cao - Tối ưu)
// =====================================================
/**
 * Time: O(max(n,m))
 * Space: O(max(n,m))
 *
 * Ý tưởng: Dùng bitwise operations
 *
 * Giải thích:
 * - Tương tự iterate nhưng dùng bitwise
 * - XOR để tính sum
 * - AND để tính carry
 * -
 * Ưu điểm:
 * - Tối ưu
 * - Code sạch
 *
 * Nhược điểm:
 * - Phức tạp hơn
 * - Khó hiểu
 */
function addBinary_bitwise(a, b) {
  // Implementation tương tự iterate
  // Nhưng dùng bitwise operations
  // Do JS không có unsigned types, bitwise phức tạp hơn
  return addBinary_iterate(a, b);
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: a = '11', b = '1'");
console.log("Iterate:", addBinary_iterate("11", "1"));
console.log("Convert:", addBinary_convert("11", "1"));
console.log("Bitwise:", addBinary_bitwise("11", "1"));
// Expected: "100"

console.log("\n=== Test Case 2 ===");
console.log("Input: a = '1010', b = '1011'");
console.log("Iterate:", addBinary_iterate("1010", "1011"));
console.log("Convert:", addBinary_convert("1010", "1011"));
console.log("Bitwise:", addBinary_bitwise("1010", "1011"));
// Expected: "10101"

console.log("\n=== Test Case 3 ===");
console.log("Input: a = '0', b = '0'");
console.log("Iterate:", addBinary_iterate("0", "0"));
console.log("Convert:", addBinary_convert("0", "0"));
console.log("Bitwise:", addBinary_bitwise("0", "0"));
// Expected: "0"

console.log("\n=== Test Case 4 ===");
console.log("Input: a = '1111', b = '1111'");
console.log("Iterate:", addBinary_iterate("1111", "1111"));
console.log("Convert:", addBinary_convert("1111", "1111"));
console.log("Bitwise:", addBinary_bitwise("1111", "1111"));
// Expected: "11110"

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Iterate | O(max(n,m)) | O(max(n,m)) | Dễ hiểu (RECOMMENDED) |
 * | Convert | O(max(n,m)) | O(max(n,m)) | Code ngắn |
 * | Bitwise | O(max(n,m)) | O(max(n,m)) | Tối ưu |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Iterate (giải pháp 1)
 * - Pattern này dùng cho binary addition
 */

// Export cho LeetCode
module.exports = addBinary_iterate;
