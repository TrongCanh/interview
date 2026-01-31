/**
 * Problem: Remove Duplicates from Sorted Array
 * URL: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * Difficulty: Easy
 * Category: Array, Two Pointers
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.
 *
 * Return k after placing the final result in the first k slots of nums.
 *
 * Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * Custom Judge:
 * The judge will test your solution with the following code:
 *
 * int[] nums = [...]; // Input array
 * int[] expectedNums = [...]; // The expected answer with correct length
 * int k = removeDuplicates(nums); // Calls your implementation
 *
 * assert k == expectedNums.length;
 * for (int i = 0; i < k; i++) {
 *     assert nums[i] == expectedNums[i];
 * }
 *
 * Example 1:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 *
 * Example 2:
 * Input: nums = [0,0,1,1,1,2,2,3,3,4]
 * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
 *
 * Constraints:
 * - 1 <= nums.length <= 3 * 10^4
 * - -100 <= nums[i] <= 100
 * - nums is sorted in non-decreasing order.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng nums đã sắp xếp
 *    - Output: số phần tử unique (k), modify in-place
 *    - Giả định: không dùng extra space
 *
 * 2. Phân tích:
 *    - Mảng đã sorted → duplicate nằm cạnh nhau
 *    - Dùng 2 con trỏ: 1 để duyệt, 1 để ghi kết quả
 *    - Slow pointer chỉ trỏ đến phần tử unique cuối
 *
 * 3. Các cách tiếp cận:
 *    - Two Pointers: Dùng 2 con trỏ → O(n)
 *    - Set: Dùng set để track → O(n) nhưng tốn space
 *    - Filter: Dùng filter → O(n) nhưng tốn space
 */

// =====================================================
// GIẢI PHÁP 1: Two Pointers (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng 2 con trỏ, slow ghi unique, fast duyệt
 *
 * Giải thích:
 * - Nếu nums.length <= 1 → trả về length
 * - slow = 0 (vị trí ghi kết quả)
 * - fast duyệt từ 1 đến cuối
 * - Nếu nums[fast] !== nums[slow]:
 *   - slow++
 *   - nums[slow] = nums[fast]
 * - Trả về slow + 1
 *
 * Ưu điểm:
 * - Tối ưu, in-place
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu two pointers
 */
function removeDuplicates_twoPointers(nums) {
  if (nums.length <= 1) return nums.length;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
}

// =====================================================
// GIẢI PHÁP 2: Set (Cải tiến - Không tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Dùng set để track unique, sau đó copy
 *
 * Giải thích:
 * - Tạo set từ nums
 * - Copy unique elements vào nums
 * - Trả về set size
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn O(n) extra space
 * - Vi phạm giả định "in-place"
 */
function removeDuplicates_set(nums) {
  const unique = new Set(nums);
  const result = Array.from(unique);

  for (let i = 0; i < result.length; i++) {
    nums[i] = result[i];
  }

  return result.length;
}

// =====================================================
// GIẢI PHÁP 3: For Loop (Nâng cao)
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
function removeDuplicates_forLoop(nums) {
  if (nums.length <= 1) return nums.length;

  let writeIndex = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  return writeIndex;
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
const test1 = [1, 1, 2];
console.log("Input:", [...test1]);
console.log("Two Pointers:", removeDuplicates_twoPointers([...test1]));
console.log("Set:", removeDuplicates_set([...test1]));
console.log("For Loop:", removeDuplicates_forLoop([...test1]));
// Expected: 2, nums = [1, 2]

console.log("\n=== Test Case 2 ===");
const test2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log("Input:", [...test2]);
console.log("Two Pointers:", removeDuplicates_twoPointers([...test2]));
console.log("Set:", removeDuplicates_set([...test2]));
console.log("For Loop:", removeDuplicates_forLoop([...test2]));
// Expected: 5, nums = [0, 1, 2, 3, 4]

console.log("\n=== Test Case 3 ===");
const test3 = [1];
console.log("Input:", [...test3]);
console.log("Two Pointers:", removeDuplicates_twoPointers([...test3]));
console.log("Set:", removeDuplicates_set([...test3]));
console.log("For Loop:", removeDuplicates_forLoop([...test3]));
// Expected: 1, nums = [1]

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Two Pointers | O(n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Set | O(n) | O(n) | Dễ hiểu |
 * | For Loop | O(n) | O(1) | Code dễ đọc |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Two Pointers (giải pháp 1)
 * - Pattern này dùng cho remove duplicates in-place
 */

// Export cho LeetCode
module.exports = removeDuplicates_twoPointers;
