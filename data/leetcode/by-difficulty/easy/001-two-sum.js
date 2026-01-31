/**
 * Problem: Two Sum
 * URL: https://leetcode.com/problems/two-sum/
 * Difficulty: Easy
 * Category: Array, Hash Table
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 * Explanation: Because nums[1] + nums[2] == 6, we return [1, 2].
 *
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * Constraints:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * - Only one valid answer exists.
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: mảng nums (số nguyên), target (số nguyên)
 *    - Output: mảng 2 chỉ số của 2 số có tổng bằng target
 *    - Giả định: chỉ có 1 giải pháp, không dùng cùng phần tử 2 lần
 *
 * 2. Phân tích:
 *    - Cần tìm 2 số a, b sao cho a + b = target
 *    - Với mỗi số nums[i], cần tìm complement = target - nums[i]
 *    - Trả về [index của complement, i]
 *
 * 3. Các cách tiếp cận:
 *    - Brute Force: Duyệt từng cặp số → O(n²)
 *    - Hash Map: Lưu số đã thấy vào map → O(n)
 *    - Two Pointers (Nếu mảng đã sắp xếp): O(n log n)
 */

// =====================================================
// GIẢI PHÁP 1: Brute Force (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n²)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từng cặp số, kiểm tra tổng
 *
 * Giải thích:
 * - Duyệt i từ 0 đến n-2
 * - Duyệt j từ i+1 đến n-1
 * - Nếu nums[i] + nums[j] === target, trả về [i, j]
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Không cần bộ nhớ phụ
 *
 * Nhược điểm:
 * - Chậm với mảng lớn
 */
function twoSum_brute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return []; // Không tìm thấy
}

// =====================================================
// GIẢI PHÁP 2: Hash Map (Cải tiến - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Sử dụng hash map để lưu giá trị đã thấy
 * và kiểm tra complement trong O(1)
 *
 * Giải thích:
 * - Duyệt qua từng số nums[i]
 * - Tính complement = target - nums[i]
 * - Nếu complement đã có trong map → trả về [map[complement], i]
 * - Nếu chưa có → lưu nums[i] vào map với key là nums[i], value là i
 *
 * Ưu điểm:
 * - Nhanh hơn brute force rất nhiều
 * - Chỉ cần duyệt mảng 1 lần
 *
 * Nhược điểm:
 * - Tốn thêm O(n) bộ nhớ cho map
 */
function twoSum_hashMap(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // Không tìm thấy
}

// =====================================================
// GIẢI PHÁP 3: Two Pointers (Nếu mảng đã sắp xếp)
// =====================================================
/**
 * Time: O(n log n)
 * Space: O(n)
 *
 * Ý tưởng: Sort mảng, sau đó dùng 2 con trỏ
 *
 * Giải thích:
 * - Tạo mảng mới với {value, index} để giữ index gốc
 * - Sort theo value
 * - Dùng 2 con trỏ: left = 0, right = n-1
 * - Nếu sum < target → left++
 * - Nếu sum > target → right--
 * - Nếu sum === target → trả về [index gốc]
 *
 * Ưu điểm:
 * - Không cần hash map
 * - Tốt nếu mảng đã sắp xếp
 *
 * Nhược điểm:
 * - Phải sort → mất O(n log n)
 * - Phải lưu index gốc → tốn thêm bộ nhớ
 */
function twoSum_twoPointers(nums, target) {
  // Tạo mảng với {value, index} để giữ index gốc
  const indexedNums = nums.map((value, index) => ({ value, index }));

  // Sort theo value
  indexedNums.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = indexedNums[left].value + indexedNums[right].value;

    if (sum === target) {
      return [indexedNums[left].index, indexedNums[right].index];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return []; // Không tìm thấy
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
const test1 = [2, 7, 11, 15];
const target1 = 9;
console.log("Input:", test1, "Target:", target1);
console.log("Brute Force:", twoSum_brute([...test1], target1));
console.log("Hash Map:", twoSum_hashMap([...test1], target1));
console.log("Two Pointers:", twoSum_twoPointers([...test1], target1));
// Expected: [0, 1]

console.log("\n=== Test Case 2 ===");
const test2 = [3, 2, 4];
const target2 = 6;
console.log("Input:", test2, "Target:", target2);
console.log("Brute Force:", twoSum_brute([...test2], target2));
console.log("Hash Map:", twoSum_hashMap([...test2], target2));
console.log("Two Pointers:", twoSum_twoPointers([...test2], target2));
// Expected: [1, 2]

console.log("\n=== Test Case 3 ===");
const test3 = [3, 3];
const target3 = 6;
console.log("Input:", test3, "Target:", target3);
console.log("Brute Force:", twoSum_brute([...test3], target3));
console.log("Hash Map:", twoSum_hashMap([...test3], target3));
console.log("Two Pointers:", twoSum_twoPointers([...test3], target3));
// Expected: [0, 1]

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Brute Force | O(n²) | O(1) | Mảng nhỏ, không quan tâm performance |
 * | Hash Map | O(n) | O(n) | Mảng lớn, cần tốc độ (RECOMMENDED) |
 * | Two Pointers | O(n log n) | O(n) | Mảng đã sắp xếp |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách để show kiến thức
 * - Trong thực tế, dùng Hash Map (giải pháp 2)
 * - Chú ý các edge cases: mảng rỗng, không có giải pháp
 */

// Export cho LeetCode
module.exports = twoSum_hashMap;
