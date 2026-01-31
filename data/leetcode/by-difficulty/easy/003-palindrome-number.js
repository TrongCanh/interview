/**
 * Problem: Palindrome Number
 * URL: https://leetcode.com/problems/palindrome-number/
 * Difficulty: Easy
 * Category: Math, Two Pointers
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given an integer x, return true if x is a palindrome, and false otherwise.
 *
 * An integer is a palindrome when it reads the same backward and forward.
 *
 * Example 1:
 * Input: x = 121
 * Output: true
 * Explanation: 121 reads as "121" from both directions (backward and forward).
 *
 * Example 2:
 * Input: x = -121
 * Output: false
 * Explanation: From left to right, it reads "-121" which is not the same as "121-".
 *
 * Example 3:
 * Input: x = 10
 * Output: false
 * Explanation: Reads "01" from right, but "10" from left. Not the same.
 *
 * Constraints:
 * - -2^31 <= x <= 2^31 - 1
 * - x consists only of digits.
 * - -2^31 <= x <= 2^31 - 1
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: số nguyên x
 *    - Output: true nếu palindrome, false nếu không
 *    - Palindrome: đọc xuôi = đọc ngược
 *
 * 2. Phân tích:
 *    - Số âm không phải palindrome
 *    - Số kết thúc bằng 0 (trừ chính 0) không phải palindrome
 *    - Cần so sánh chữ số đầu và cuối
 *
 * 3. Các cách tiếp cận:
 *    - String: Chuyển sang string, so sánh với reverse → O(log n)
 *    - Reverse Half: Đảo ngược nửa sau, so sánh → O(log n)
 *    - Two Pointers: So sánh chữ số đầu và cuối → O(log n)
 */

// =====================================================
// GIẢI PHÁP 1: String (Đơn giản nhất)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(log n)
 *
 * Ý tưởng: Chuyển sang string, so sánh với reverse
 *
 * Giải thích:
 * - Số âm → false
 * - Chuyển sang string
 * - So sánh với string đã đảo ngược
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn thêm bộ nhớ cho string
 * - Vi phạm giả định "không dùng string"
 */
function isPalindrome_string(x) {
  // Số âm không phải palindrome
  if (x < 0) return false;

  // Số kết thúc bằng 0 không phải palindrome (trừ chính số 0)
  if (x % 10 === 0) return false;

  const str = x.toString();
  const reversed = str.split("").reverse().join("");

  return str === reversed;
}

// =====================================================
// GIẢI PHÁP 2: Reverse Half (Cải tiến - Tối ưu)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(1)
 *
 * Ý tưởng: Đảo ngược nửa sau của số, so sánh với nửa đầu
 *
 * Giải thích:
 * - Số âm → false
 * - Số kết thúc bằng 0 (trừ chính 0) → false
 * - Duyệt từng chữ số từ cuối về đầu
 * - Kiểm tra: số kết thúc bằng 0 (trừ chính 0) → false
 *
 * Ưu điểm:
 * - Tối ưu, không dùng string
 * - Code sạch
 *
 * Nhược điểm:
 * - Phải hiểu two pointers
 */
function isPalindrome_reverseHalf(x) {
  // Số âm không phải palindrome
  if (x < 0) return false;

  // Số kết thúc bằng 0 không phải palindrome (trừ chính số 0)
  if (x % 10 === 0) return false;

  let left = 0;
  let right = x;

  // Duyệt từng chữ số từ cuối về đầu
  while (left < right) {
    const digit = right % 10;
    right = Math.floor(right / 10);

    // Kiểm tra: số kết thúc bằng 0 (trừ chính 0) không phải palindrome
    if (left === 0 && digit === 0) return false;

    left++;
  }

  // So sánh: x === left * 10 + digit
  return x === left * 10 + digit;
}

// =====================================================
// GIẢI PHÁP 3: Two Pointers (Nâng cao)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(1)
 *
 * Ý tưởng: So sánh chữ số đầu và cuối bằng 2 con trỏ
 *
 * Giải thích:
 * - Số âm → false
 * - Dùng 2 con trỏ: left = 0, right = length - 1
 * - So sánh nums[left] và nums[right]
 *
 * Ưu điểm:
 * - Không dùng string
 * - Code dễ đọc
 *
 * Nhược điểm:
 * - Phải hiểu two pointers
 */
function isPalindrome_twoPointers(x) {
  // Số âm không phải palindrome
  if (x < 0) return false;

  // Số kết thúc bằng 0 không phải palindrome (trừ chính số 0)
  if (x % 10 === 0) return false;

  // Tách số thành mảng chữ số
  const digits = [];
  let temp = x;
  while (temp > 0) {
    digits.push(temp % 10);
    temp = Math.floor(temp / 10);
  }

  // Dùng 2 con trỏ so sánh
  let left = 0;
  let right = digits.length - 1;

  while (left < right) {
    if (digits[left] !== digits[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: 121");
console.log("String:", isPalindrome_string(121));
console.log("Reverse Half:", isPalindrome_reverseHalf(121));
console.log("Two Pointers:", isPalindrome_twoPointers(121));
// Expected: true

console.log("\n=== Test Case 2 ===");
console.log("Input: -121");
console.log("String:", isPalindrome_string(-121));
console.log("Reverse Half:", isPalindrome_reverseHalf(-121));
console.log("Two Pointers:", isPalindrome_twoPointers(-121));
// Expected: false

console.log("\n=== Test Case 3 ===");
console.log("Input: 10");
console.log("String:", isPalindrome_string(10));
console.log("Reverse Half:", isPalindrome_reverseHalf(10));
console.log("Two Pointers:", isPalindrome_twoPointers(10));
// Expected: false

console.log("\n=== Test Case 4 ===");
console.log("Input: 0");
console.log("String:", isPalindrome_string(0));
console.log("Reverse Half:", isPalindrome_reverseHalf(0));
console.log("Two Pointers:", isPalindrome_twoPointers(0));
// Expected: true

console.log("\n=== Test Case 5 ===");
console.log("Input: -101");
console.log("String:", isPalindrome_string(-101));
console.log("Reverse Half:", isPalindrome_reverseHalf(-101));
console.log("Two Pointers:", isPalindrome_twoPointers(-101));
// Expected: false

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | String | O(log n) | O(log n) | Code ngắn, dễ hiểu |
 * | Reverse Half | O(log n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Two Pointers | O(log n) | O(1) | Dễ đọc |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Reverse Half (giải pháp 2)
 * - Chú ý các edge cases: số âm, số kết thúc bằng 0
 */

// Export cho LeetCode
module.exports = isPalindrome_reverseHalf;
