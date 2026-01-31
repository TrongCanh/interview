/**
 * Problem: Longest Common Prefix
 * URL: https://leetcode.com/problems/longest-common-prefix/
 * Difficulty: Easy
 * Category: String
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Write a function to find the longest common prefix string amongst an array of strings.
 *
 * If there is no common prefix, return an empty string "".
 *
 * Example 1:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 *
 * Example 2:
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 *
 * Constraints:
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] consists of only lowercase English letters.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng strings strs
 *    - Output: chuỗi prefix chung dài nhất
 *    - Giả định: không có prefix → trả về ""
 *
 * 2. Phân tích:
 *    - Prefix là chuỗi bắt đầu giống nhau
 *    - Cần tìm chuỗi ngắn nhất làm giới hạn
 *    - So sánh từng ký tự của tất cả strings
 *
 * 3. Các cách tiếp cận:
 *    - Horizontal Scanning: So sánh từng string với prefix hiện tại → O(S)
 *    - Vertical Scanning: So sánh từng ký tự theo cột → O(S)
 *    - Divide and Conquer: Chia mảng, tìm prefix từng phần → O(S)
 *    - Binary Search: Tìm độ dài prefix bằng binary search → O(S * log m)
 *
 * Lưu ý: S = tổng số ký tự trong tất cả strings, m = số strings
 */

// =====================================================
// GIẢI PHÁP 1: Horizontal Scanning (Đơn giản nhất)
// =====================================================
/**
 * Time: O(S)
 * Space: O(1)
 *
 * Ý tưởng: So sánh từng string với prefix hiện tại
 *
 * Giải thích:
 * - Bắt đầu với string đầu tiên làm prefix
 * - Duyệt từng string còn lại
 * - Cập nhật prefix bằng cách cắt bớt từ cuối
 * - Nếu prefix rỗng → trả về ""
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải cắt string nhiều lần
 * - Không tối ưu khi string đầu tiên rất dài
 */
function longestCommonPrefix_horizontal(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

// =====================================================
// GIẢI PHÁP 2: Vertical Scanning (Cải tiến)
// =====================================================
/**
 * Time: O(S)
 * Space: O(1)
 *
 * Ý tưởng: So sánh từng ký tự theo cột (theo vị trí)
 *
 * Giải thích:
 * - Duyệt từng vị trí ký tự
 * - So sánh ký tự tại vị trí đó của tất cả strings
 * - Nếu khác nhau → trả về prefix đến vị trí đó
 * - Nếu string ngắn hơn vị trí → trả về prefix đó
 *
 * Ưu điểm:
 * - Dừng sớm khi tìm thấy sự khác biệt
 * - Không phải cắt string
 *
 * Nhược điểm:
 * - Code phức tạp hơn một chút
 */
function longestCommonPrefix_vertical(strs) {
  if (strs.length === 0) return "";

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i === strs[j].length || strs[j][i] !== char) {
        return strs[0].slice(0, i);
      }
    }
  }

  return strs[0];
}

// =====================================================
// GIẢI PHÁP 3: Binary Search (Nâng cao)
// =====================================================
/**
 * Time: O(S * log m)
 * Space: O(1)
 *
 * Ý tưởng: Tìm độ dài prefix bằng binary search
 *
 * Giải thích:
 * - Tìm string ngắn nhất làm giới hạn
 * - Binary search trên độ dài prefix [0, minLength]
 * - Kiểm tra xem prefix có độ dài mid có phải common không
 * - Nếu có → tìm dài hơn, nếu không → tìm ngắn hơn
 *
 * Ưu điểm:
 * - Tối ưu khi có nhiều strings dài
 * - Dừng sớm với binary search
 *
 * Nhược điểm:
 * - Code phức tạp nhất
 * - Không phải lúc nào cũng tốt hơn vertical
 */
function longestCommonPrefix_binary(strs) {
  if (strs.length === 0) return "";

  const isCommonPrefix = (length) => {
    const prefix = strs[0].slice(0, length);
    for (let i = 1; i < strs.length; i++) {
      if (!strs[i].startsWith(prefix)) {
        return false;
      }
    }
    return true;
  };

  // Tìm string ngắn nhất
  let minLength = strs[0].length;
  for (const str of strs) {
    minLength = Math.min(minLength, str.length);
  }

  // Binary search
  let left = 0;
  let right = minLength;

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);

    if (isCommonPrefix(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return strs[0].slice(0, left);
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: ['flower','flow','flight']");
console.log(
  "Horizontal:",
  longestCommonPrefix_horizontal(["flower", "flow", "flight"]),
);
console.log(
  "Vertical:",
  longestCommonPrefix_vertical(["flower", "flow", "flight"]),
);
console.log(
  "Binary Search:",
  longestCommonPrefix_binary(["flower", "flow", "flight"]),
);
// Expected: "fl"

console.log("\n=== Test Case 2 ===");
console.log("Input: ['dog','racecar','car']");
console.log(
  "Horizontal:",
  longestCommonPrefix_horizontal(["dog", "racecar", "car"]),
);
console.log(
  "Vertical:",
  longestCommonPrefix_vertical(["dog", "racecar", "car"]),
);
console.log(
  "Binary Search:",
  longestCommonPrefix_binary(["dog", "racecar", "car"]),
);
// Expected: ""

console.log("\n=== Test Case 3 ===");
console.log("Input: ['ab','a']");
console.log("Horizontal:", longestCommonPrefix_horizontal(["ab", "a"]));
console.log("Vertical:", longestCommonPrefix_vertical(["ab", "a"]));
console.log("Binary Search:", longestCommonPrefix_binary(["ab", "a"]));
// Expected: "a"

console.log("\n=== Test Case 4 ===");
console.log("Input: ['a']");
console.log("Horizontal:", longestCommonPrefix_horizontal(["a"]));
console.log("Vertical:", longestCommonPrefix_vertical(["a"]));
console.log("Binary Search:", longestCommonPrefix_binary(["a"]));
// Expected: "a"

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Horizontal | O(S) | O(1) | Dễ hiểu |
 * | Vertical | O(S) | O(1) | Tối ưu (RECOMMENDED) |
 * | Binary Search | O(S * log m) | O(1) | Nhiều strings dài |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Vertical (giải pháp 2)
 * - Chú ý edge cases: mảng rỗng, 1 string
 */

// Export cho LeetCode
module.exports = longestCommonPrefix_vertical;
