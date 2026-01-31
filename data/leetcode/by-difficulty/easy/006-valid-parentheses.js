/**
 * Problem: Valid Parentheses
 * URL: https://leetcode.com/problems/valid-parentheses/
 * Difficulty: Easy
 * Category: String, Stack
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 * - Open brackets must be closed by the same type of brackets.
 * - Open brackets must be closed in the correct order.
 * - Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * Example 4:
 * Input: s = "([)]"
 * Output: false
 *
 * Example 5:
 * Input: s = "{[]}"
 * Output: true
 *
 * Constraints:
 * - 1 <= s.length <= 10^4
 * - s consists of parentheses only '()[]{}'.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: string s chứa các ký tự '()[]{}'
 *    - Output: true nếu string hợp lệ, false nếu không
 *    - Hợp lệ: đóng ngoặc đúng loại, đúng thứ tự
 *
 * 2. Phân tích:
 *    - Dùng stack để theo dõi các ngoặc mở
 *    - Khi gặp ngoặc đóng → phải khớp với ngoặc mở cuối cùng
 *    - Cuối cùng: stack rỗng → hợp lệ
 *
 * 3. Các cách tiếp cận:
 *    - Stack: Dùng stack để lưu ngoặc mở → O(n)
 *    - Replace: Thay thế các cặp ngoặc → O(n²)
 *    - Counter: Đếm số ngoặc → không đủ chính xác
 */

// =====================================================
// GIẢI PHÁP 1: Stack (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Dùng stack để lưu ngoặc mở, so sánh khi gặp ngoặc đóng
 *
 * Giải thích:
 * - Tạo map để tra cứu ngoặc đóng tương ứng
 * - Duyệt từng ký tự
 * - Nếu là ngoặc mở → push vào stack
 * - Nếu là ngoặc đóng:
 *   - Stack rỗng → false
 *   - Top stack không khớp → false
 *   - Khớp → pop stack
 * - Cuối cùng: stack rỗng → true
 *
 * Ưu điểm:
 * - Tối ưu, dễ hiểu
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn O(n) bộ nhớ cho stack
 */
function isValid_stack(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of s) {
    if (char in pairs) {
      // Ngoặc đóng
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    } else {
      // Ngoặc mở
      stack.push(char);
    }
  }

  return stack.length === 0;
}

// =====================================================
// GIẢI PHÁP 2: Replace (Cải tiến - Không tối ưu)
// =====================================================
/**
 * Time: O(n²)
 * Space: O(1)
 *
 * Ý tưởng: Thay thế các cặp ngoặc bằng rỗng, lặp lại
 *
 * Giải thích:
 * - Thay thế "()", "[]", "{}" bằng ""
 * - Lặp lại cho đến khi không còn thay đổi
 * - Cuối cùng: string rỗng → hợp lệ
 *
 * Ưu điểm:
 * - Không dùng stack
 * - Code đơn giản
 *
 * Nhược điểm:
 * - Chậm: O(n²) do lặp lại
 * - Không tối ưu cho string dài
 */
function isValid_replace(s) {
  let prev = "";

  while (s !== prev) {
    prev = s;
    s = s.replace(/\(\)/g, "").replace(/\[\]/g, "").replace(/\{\}/g, "");
  }

  return s.length === 0;
}

// =====================================================
// GIẢI PHÁP 3: Optimized Stack (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Tối ưu stack bằng cách dùng array làm stack
 *
 * Giải thích:
 * - Tương tự giải pháp 1 nhưng tối ưu hơn
 * - Dùng array methods: push, pop
 * - Early exit khi stack rỗng và gặp ngoặc đóng
 *
 * Ưu điểm:
 * - Tối ưu nhất
 * - Code sạch
 *
 * Nhược điểm:
 * - Giống giải pháp 1
 */
function isValid_optimized(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const openBrackets = new Set(["(", "[", "{"]);

  for (const char of s) {
    if (openBrackets.has(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: '()'");
console.log("Stack:", isValid_stack("()"));
console.log("Replace:", isValid_replace("()"));
console.log("Optimized:", isValid_optimized("()"));
// Expected: true

console.log("\n=== Test Case 2 ===");
console.log("Input: '()[]{}'");
console.log("Stack:", isValid_stack("()[]{}"));
console.log("Replace:", isValid_replace("()[]{}"));
console.log("Optimized:", isValid_optimized("()[]{}"));
// Expected: true

console.log("\n=== Test Case 3 ===");
console.log("Input: '(]'");
console.log("Stack:", isValid_stack("(]"));
console.log("Replace:", isValid_replace("(]"));
console.log("Optimized:", isValid_optimized("(]"));
// Expected: false

console.log("\n=== Test Case 4 ===");
console.log("Input: '([)]'");
console.log("Stack:", isValid_stack("([)]"));
console.log("Replace:", isValid_replace("([)]"));
console.log("Optimized:", isValid_optimized("([)]"));
// Expected: false

console.log("\n=== Test Case 5 ===");
console.log("Input: '{[]}'");
console.log("Stack:", isValid_stack("{[]}"));
console.log("Replace:", isValid_replace("{[]}"));
console.log("Optimized:", isValid_optimized("{[]}"));
// Expected: true

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Stack | O(n) | O(n) | Tối ưu (RECOMMENDED) |
 * | Replace | O(n²) | O(1) | Học regex |
 * | Optimized | O(n) | O(n) | Tối ưu nhất |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Stack (giải pháp 1 hoặc 3)
 * - Pattern này dùng cho các bài toán về matching pairs
 */

// Export cho LeetCode
module.exports = isValid_stack;
