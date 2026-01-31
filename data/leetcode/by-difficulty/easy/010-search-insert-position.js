/**
 * Problem: Search Insert Position
 * URL: https://leetcode.com/problems/search-insert-position/
 * Difficulty: Easy
 * Category: Array, Binary Search
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Example 1:
 * Input: nums = [1,3,5,6], target = 5
 * Output: 2
 *
 * Example 2:
 * Input: nums = [1,3,5,6], target = 2
 * Output: 1
 *
 * Example 3:
 * Input: nums = [1,3,5,6], target = 7
 * Output: 4
 *
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums contains distinct values sorted in ascending order.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng nums đã sắp xếp, target
 *    - Output: index của target hoặc vị trí chèn
 *    - Yêu cầu: O(log n) runtime
 *
 * 2. Phân tích:
 *    - Mảng đã sorted → dùng binary search
 *    - Nếu tìm thấy → trả về index
 *    - Nếu không tìm thấy → trả về left (vị trí chèn)
 *
 * 3. Các cách tiếp cận:
 *    - Binary Search: Dùng binary search → O(log n)
 *    - Linear Search: Duyệt từng phần tử → O(n)
 *    - Built-in: Dùng indexOf/findIndex → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Binary Search (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(log n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng binary search để tìm vị trí
 *
 * Giải thích:
 * - left = 0, right = nums.length - 1
 * - Vòng lặp: left <= right
 * - mid = floor((left + right) / 2)
 * - Nếu nums[mid] === target → trả về mid
 * - Nếu nums[mid] < target → left = mid + 1
 * - Nếu nums[mid] > target → right = mid - 1
 * - Cuối cùng: trả về left
 *
 * Ưu điểm:
 * - Tối ưu, O(log n)
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu binary search
 */
function searchInsert_binary(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

// =====================================================
// GIẢI PHÁP 2: Linear Search (Cải tiến - Không tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từng phần tử, tìm vị trí chèn
 *
 * Giải thích:
 * - Duyệt từ 0 đến cuối
 * - Nếu nums[i] >= target → trả về i
 * - Nếu không tìm thấy → trả về nums.length
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code đơn giản
 *
 * Nhược điểm:
 * - Chậm: O(n)
 * - Vi phạm yêu cầu O(log n)
 */
function searchInsert_linear(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
}

// =====================================================
// GIẢI PHÁP 3: Built-in (Nâng cao - Không tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng built-in methods
 *
 * Giải thích:
 * - Tìm index bằng findIndex
 * - Nếu không tìm thấy → trả về nums.length
 *
 * Ưu điểm:
 * - Code ngắn nhất
 * - Dùng built-in
 *
 * Nhược điểm:
 * - Chậm: O(n)
 * - Không tối ưu
 */
function searchInsert_builtin(nums, target) {
  const index = nums.findIndex((num) => num >= target);
  return index === -1 ? nums.length : index;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
console.log("Input: [1,3,5,6], target = 5");
console.log("Binary Search:", searchInsert_binary([1, 3, 5, 6], 5));
console.log("Linear Search:", searchInsert_linear([1, 3, 5, 6], 5));
console.log("Built-in:", searchInsert_builtin([1, 3, 5, 6], 5));
// Expected: 2

console.log("\n=== Test Case 2 ===");
console.log("Input: [1,3,5,6], target = 2");
console.log("Binary Search:", searchInsert_binary([1, 3, 5, 6], 2));
console.log("Linear Search:", searchInsert_linear([1, 3, 5, 6], 2));
console.log("Built-in:", searchInsert_builtin([1, 3, 5, 6], 2));
// Expected: 1

console.log("\n=== Test Case 3 ===");
console.log("Input: [1,3,5,6], target = 7");
console.log("Binary Search:", searchInsert_binary([1, 3, 5, 6], 7));
console.log("Linear Search:", searchInsert_linear([1, 3, 5, 6], 7));
console.log("Built-in:", searchInsert_builtin([1, 3, 5, 6], 7));
// Expected: 4

console.log("\n=== Test Case 4 ===");
console.log("Input: [1], target = 0");
console.log("Binary Search:", searchInsert_binary([1], 0));
console.log("Linear Search:", searchInsert_linear([1], 0));
console.log("Built-in:", searchInsert_builtin([1], 0));
// Expected: 0

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Binary Search | O(log n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Linear Search | O(n) | O(1) | Dễ hiểu |
 * | Built-in | O(n) | O(1) | Code ngắn |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Binary Search (giải pháp 1)
 * - Pattern này dùng cho search in sorted array
 */

// Export cho LeetCode
module.exports = searchInsert_binary;
