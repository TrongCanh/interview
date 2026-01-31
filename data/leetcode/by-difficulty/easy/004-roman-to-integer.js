/**
 * Problem: Roman to Integer
 * URL: https://leetcode.com/problems/roman-to-integer/
 * Difficulty: Easy
 * Category: String, Hash Map
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 *
 * Symbol       Value
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 *
 * For example, 2 is written as II in Roman numeral, just two ones added together.
 * 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.
 *
 * Roman numerals are usually written largest to smallest from left to right.
 * However, the numeral for four is not IIII. Instead, the number four is written as IV.
 * Because the one is before the five we subtract it making four.
 * The same principle applies to the number nine, which is written as IX.
 * There are six instances where subtraction is used:
 *
 * I can be placed before V (5) and X (10) to make 4 and 9.
 * X can be placed before L (50) and C (100) to make 40 and 90.
 * C can be placed before D (500) and M (1000) to make 400 and 900.
 *
 * Given a roman numeral, convert it to an integer.
 *
 * Example 1:
 * Input: s = "III"
 * Output: 3
 * Explanation: III = 3.
 *
 * Example 2:
 * Input: s = "IV"
 * Output: 4
 * Explanation: IV = 4.
 *
 * Example 3:
 * Input: s = "IX"
 * Output: 9
 * Explanation: IX = 9.
 *
 * Example 4:
 * Input: s = "LVIII"
 * Output: 58
 * Explanation: L = 50, V= 5, III = 3.
 *
 * Example 5:
 * Input: s = "MCMXCIV"
 * Output: 1994
 * Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 *
 * Constraints:
 * - 1 <= s.length <= 15
 * - s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
 * - It is guaranteed that s is a valid roman numeral in the range [1, 3999].
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: string s (số La Mã)
 *    - Output: số nguyên tương ứng
 *    - Quy tắc: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
 *    - Quy tắc đặc biệt: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
 *
 * 2. Phân tích:
 *    - Duyệt từ trái sang phải
 *    - Nếu chữ số hiện tại < chữ số sau → trừ đi
 *    - Nếu chữ số hiện tại >= chữ số sau → cộng thêm
 *
 * 3. Các cách tiếp cận:
 *    - Left to Right: Duyệt từ trái, so sánh với chữ số sau → O(n)
 *    - Right to Left: Duyệt từ phải, cộng/trừ dựa trên so sánh → O(n)
 *    - Replace Special Cases: Thay IV→IIII, IX→VIIII... → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Left to Right (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từ trái sang phải, so sánh với chữ số sau
 *
 * Giải thích:
 * - Tạo map giá trị các chữ số La Mã
 * - Duyệt từng ký tự
 * - Nếu giá trị hiện tại < giá trị sau → trừ đi
 * - Nếu giá trị hiện tại >= giá trị sau → cộng thêm
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải kiểm tra index + 1 (edge case cuối)
 */
function romanToInt_leftToRight(s) {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = romanValues[s[i]];
    const next = romanValues[s[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}

// =====================================================
// GIẢI PHÁP 2: Right to Left (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từ phải sang trái, cộng/trừ dựa trên so sánh
 *
 * Giải thích:
 * - Duyệt từ cuối về đầu
 * - Nếu giá trị hiện tại < giá trị trước đó → trừ đi
 * - Nếu giá trị hiện tại >= giá trị trước đó → cộng thêm
 * - Lưu giá trị trước đó để so sánh
 *
 * Ưu điểm:
 * - Không cần kiểm tra index + 1
 * - Code sạch hơn
 *
 * Nhược điểm:
 * - Ít trực quan hơn left to right
 */
function romanToInt_rightToLeft(s) {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const currentValue = romanValues[s[i]];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return result;
}

// =====================================================
// GIẢI PHÁP 3: Replace Special Cases (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Thay thế các trường hợp đặc biệt trước khi tính
 *
 * Giải thích:
 * - Thay thế: IV→IIII, IX→VIIII, XL→XXXX, XC→LXXXX, CD→CCCC, CM→DCCCC
 * - Sau đó chỉ cần cộng tất cả giá trị
 *
 * Ưu điểm:
 * - Logic đơn giản sau khi replace
 * - Dễ hiểu
 *
 * Nhược điểm:
 * - Phải replace nhiều lần
 * - Không tối ưu cho string dài
 */
function romanToInt_replace(s) {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Thay thế các trường hợp đặc biệt
  s = s
    .replace(/IV/g, "IIII")
    .replace(/IX/g, "VIIII")
    .replace(/XL/g, "XXXX")
    .replace(/XC/g, "LXXXX")
    .replace(/CD/g, "CCCC")
    .replace(/CM/g, "DCCCC");

  // Cộng tất cả giá trị
  let result = 0;
  for (const char of s) {
    result += romanValues[char];
  }

  return result;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: III");
console.log("Left to Right:", romanToInt_leftToRight("III"));
console.log("Right to Left:", romanToInt_rightToLeft("III"));
console.log("Replace:", romanToInt_replace("III"));
// Expected: 3

console.log("\n=== Test Case 2 ===");
console.log("Input: IV");
console.log("Left to Right:", romanToInt_leftToRight("IV"));
console.log("Right to Left:", romanToInt_rightToLeft("IV"));
console.log("Replace:", romanToInt_replace("IV"));
// Expected: 4

console.log("\n=== Test Case 3 ===");
console.log("Input: IX");
console.log("Left to Right:", romanToInt_leftToRight("IX"));
console.log("Right to Left:", romanToInt_rightToLeft("IX"));
console.log("Replace:", romanToInt_replace("IX"));
// Expected: 9

console.log("\n=== Test Case 4 ===");
console.log("Input: LVIII");
console.log("Left to Right:", romanToInt_leftToRight("LVIII"));
console.log("Right to Left:", romanToInt_rightToLeft("LVIII"));
console.log("Replace:", romanToInt_replace("LVIII"));
// Expected: 58

console.log("\n=== Test Case 5 ===");
console.log("Input: MCMXCIV");
console.log("Left to Right:", romanToInt_leftToRight("MCMXCIV"));
console.log("Right to Left:", romanToInt_rightToLeft("MCMXCIV"));
console.log("Replace:", romanToInt_replace("MCMXCIV"));
// Expected: 1994

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Left to Right | O(n) | O(1) | Dễ hiểu (RECOMMENDED) |
 * | Right to Left | O(n) | O(1) | Code sạch |
 * | Replace | O(n) | O(1) | Học regex |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Left to Right (giải pháp 1)
 * - Chú ý các trường hợp đặc biệt: IV, IX, XL, XC, CD, CM
 */

// Export cho LeetCode
module.exports = romanToInt_leftToRight;
