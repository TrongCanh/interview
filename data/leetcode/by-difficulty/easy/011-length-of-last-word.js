/**
 * Problem: Length of Last Word
 * URL: https://leetcode.com/problems/length-of-last-word/
 * Difficulty: Easy
 * Category: String
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given a string s consisting of words and spaces, return the length of the last word in the string.
 *
 * A word is a maximal substring consisting of non-space characters only.
 *
 * Example 1:
 * Input: s = "Hello World"
 * Output: 5
 * Explanation: The last word is "World" with length 5.
 *
 * Example 2:
 * Input: s = "   fly me   to   the moon  "
 * Output: 4
 * Explanation: The last word is "moon" with length 4.
 *
 * Constraints:
 * - 1 <= s.length <= 10^4
 * - s consists of only English letters and spaces ' '.
 * - There will be at least one word in s.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: string s
 *    - Output: độ dài của từ cuối cùng
 *    - Từ: chuỗi không có space
 *
 * 2. Phân tích:
 *    - Từ cuối cùng là từ sau space cuối
 *    - Có thể có trailing spaces
 *    - Cần trim hoặc duyệt từ cuối
 *
 * 3. Các cách tiếp cận:
 *    - Trim & Split: Trim rồi split → O(n)
 *    - Reverse: Đảo ngược rồi split → O(n)
 *    - Iterate from End: Duyệt từ cuối → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Trim & Split (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Trim string, split by space, lấy từ cuối
 *
 * Giải thích:
 * - Trim() để bỏ leading/trailing spaces
 * - Split() by space để tách thành mảng từ
 * - Lấy từ cuối cùng
 * - Trả về độ dài
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn O(n) extra space cho mảng
 */
function lengthOfLastWord_trim(s) {
  const words = s.trim().split(" ");
  const lastWord = words[words.length - 1];
  return lastWord.length;
}

// =====================================================
// GIẢI PHÁP 2: Reverse (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Đảo ngược string, từ đầu chính là từ cuối
 *
 * Giải thích:
 * - Đảo ngược string
 * - Trim để bỏ trailing spaces (đã là leading)
 * - Tìm space đầu tiên
 * - Độ dài = vị trí space đầu tiên hoặc độ dài string
 *
 * Ưu điểm:
 * - Không cần split toàn bộ
 * - Code sạch
 *
 * Nhược điểm:
 * - Tốn O(n) extra space cho reverse
 */
function lengthOfLastWord_reverse(s) {
  const reversed = s.split("").reverse().join("");
  const trimmed = reversed.trim();

  // Tìm space đầu tiên
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return trimmed.length;
  }

  return spaceIndex;
}

// =====================================================
// GIẢI PHÁP 3: Iterate from End (Nâng cao - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từ cuối, đếm độ dài từ cuối
 *
 * Giải thích:
 * - Bỏ trailing spaces
 * - Duyệt từ cuối về đầu
 * - Đếm số ký tự cho đến khi gặp space
 *
 * Ưu điểm:
 * - Không tốn extra space
 * - Tối ưu
 *
 * Nhược điểm:
 * - Code phức tạp hơn một chút
 */
function lengthOfLastWord_iterate(s) {
  let length = 0;
  let i = s.length - 1;

  // Bỏ trailing spaces
  while (i >= 0 && s[i] === " ") {
    i--;
  }

  // Đếm độ dài từ cuối
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: 'Hello World'");
console.log("Trim & Split:", lengthOfLastWord_trim("Hello World"));
console.log("Reverse:", lengthOfLastWord_reverse("Hello World"));
console.log("Iterate:", lengthOfLastWord_iterate("Hello World"));
// Expected: 5

console.log("\n=== Test Case 2 ===");
console.log("Input: '   fly me   to   the moon  '");
console.log(
  "Trim & Split:",
  lengthOfLastWord_trim("   fly me   to   the moon  "),
);
console.log(
  "Reverse:",
  lengthOfLastWord_reverse("   fly me   to   the moon  "),
);
console.log(
  "Iterate:",
  lengthOfLastWord_iterate("   fly me   to   the moon  "),
);
// Expected: 4

console.log("\n=== Test Case 3 ===");
console.log("Input: 'luffy is still joyboy'");
console.log("Trim & Split:", lengthOfLastWord_trim("luffy is still joyboy"));
console.log("Reverse:", lengthOfLastWord_reverse("luffy is still joyboy"));
console.log("Iterate:", lengthOfLastWord_iterate("luffy is still joyboy"));
// Expected: 7

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Trim & Split | O(n) | O(n) | Dễ hiểu |
 * | Reverse | O(n) | O(n) | Code sạch |
 * | Iterate | O(n) | O(1) | Tối ưu (RECOMMENDED) |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Trim & Split (giải pháp 1) cho dễ đọc
 * - Hoặc dùng Iterate (giải pháp 3) cho tối ưu
 */

// Export cho LeetCode
module.exports = lengthOfLastWord_trim;
