/**
 * Problem: Remove Element
 * URL: https://leetcode.com/problems/remove-element/
 * Difficulty: Easy
 * Category: Array, Two Pointers
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
 *
 * Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
 *
 * Return k.
 *
 * Custom Judge:
 * The judge will test your solution with the following code:
 *
 * int[] nums = [...]; // Input array
 * int val = ...; // Value to remove
 * int k = removeElement(nums, val); // Calls your implementation
 *
 * assert k == expectedNums.length;
 * for (int i = 0; i < k; i++) {
 *     assert nums[i] == expectedNums[i];
 * }
 *
 * Example 1:
 * Input: nums = [3,2,2,3], val = 3
 * Output: 2, nums = [2,2,_,_]
 *
 * Example 2:
 * Input: nums = [0,1,2,2,3,0,4,2], val = 2
 * Output: 5, nums = [0,1,4,0,3,_,_]
 *
 * Constraints:
 * - 0 <= nums.length <= 100
 * - 0 <= nums[i] <= 50
 * - 0 <= val <= 100
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng nums, giá trị val cần xóa
 *    - Output: số phần tử không bằng val (k), modify in-place
 *
 * 2. Phân tích:
 *    - Cần xóa tất cả phần tử = val
 *    - Dùng 2 con trỏ: 1 để duyệt, 1 để ghi kết quả
 *    - Slow pointer chỉ trỏ đến phần tử không phải val
 *
 * 3. Các cách tiếp cận:
 *    - Two Pointers: Dùng 2 con trỏ → O(n)
 *    - For Loop: Dùng 1 vòng lặp → O(n)
 *    - Filter: Dùng filter → O(n) nhưng tốn space
 */

// =====================================================
// GIẢI PHÁP 1: Two Pointers (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng 2 con trỏ, slow ghi kết quả, fast duyệt
 *
 * Giải thích:
 * - slow = 0 (vị trí ghi kết quả)
 * - fast duyệt từ 0 đến cuối
 * - Nếu nums[fast] !== val:
 *   - nums[slow] = nums[fast]
 *   - slow++
 * - Trả về slow
 *
 * Ưu điểm:
 * - Tối ưu, in-place
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu two pointers
 */
function removeElement_twoPointers(nums, val) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
}

// =====================================================
// GIẢI PHÁP 2: For Loop (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng for loop thay vì two pointers
 *
 * Giải thích:
 * - Tương tự two pointers nhưng viết khác
 * - Dùng index để track vị trí ghi
 * - Code dễ đọc hơn
 *
 * Ưu điểm:
 * - Tối ưu
 * - Code dễ đọc
 *
 * Nhược điểm:
 * - Giống two pointers
 */
function removeElement_forLoop(nums, val) {
  let writeIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}

// =====================================================
// GIẢI PHÁP 3: While Loop (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng while loop để swap
 *
 * Giải thích:
 * - Dùng 2 con trỏ: left, right
 * - Swap phần tử val với phần tử cuối
 * - Thu hẹp right
 *
 * Ưu điểm:
 * - Không cần ghi đè
 *
 * Nhược điểm:
 * - Code phức tạp
 * - Không tối ưu bằng two pointers
 */
function removeElement_whileLoop(nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }

  return left;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
const test1 = [3, 2, 2, 3];
console.log("Input:", [...test1], "val = 3");
console.log("Two Pointers:", removeElement_twoPointers([...test1], 3));
console.log("For Loop:", removeElement_forLoop([...test1], 3));
console.log("While Loop:", removeElement_whileLoop([...test1], 3));
// Expected: 2, nums = [2, 2, _, _]

console.log("\n=== Test Case 2 ===");
const test2 = [0, 1, 2, 2, 3, 0, 4, 2];
console.log("Input:", [...test2], "val = 2");
console.log("Two Pointers:", removeElement_twoPointers([...test2], 2));
console.log("For Loop:", removeElement_forLoop([...test2], 2));
console.log("While Loop:", removeElement_whileLoop([...test2], 2));
// Expected: 5, nums = [0, 1, 4, 0, 3, _, _]

console.log("\n=== Test Case 3 ===");
const test3 = [1];
console.log("Input:", [...test3], "val = 1");
console.log("Two Pointers:", removeElement_twoPointers([...test3], 1));
console.log("For Loop:", removeElement_forLoop([...test3], 1));
console.log("While Loop:", removeElement_whileLoop([...test3], 1));
// Expected: 0, nums = [_]

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Two Pointers | O(n) | O(1) | Tối ưu (RECOMMENDED) |
 * | For Loop | O(n) | O(1) | Code dễ đọc |
 * | While Loop | O(n) | O(1) | Swap thay vì ghi đè |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Two Pointers (giải pháp 1)
 * - Pattern này dùng cho remove elements in-place
 */

// Export cho LeetCode
module.exports = removeElement_twoPointers;
