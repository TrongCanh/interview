/**
 * Problem: Merge Sorted Array
 * URL: https://leetcode.com/problems/merge-sorted-array/
 * Difficulty: Easy
 * Category: Array, Two Pointers
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 *
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 *
 * The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
 *
 * Example 1:
 * Input: nums1 = [1,2,3,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 * Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
 * The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
 *
 * Example 2:
 * Input: nums1 = [1], m = 1, nums2 = [], n = 0
 * Output: [1]
 * Explanation: No need to merge, as nums2 is empty.
 *
 * Example 3:
 * Input: nums1 = [0], m = 1, nums2 = [1], n = 1
 * Output: [1]
 * Explanation: No need to merge, as nums1 is empty.
 *
 * Constraints:
 * - nums1.length == m
 * - nums2.length == n
 * - 0 <= m <= 200
 * - 0 <= n <= 200
 * - 1 <= m + n <= 200
 * - -10^9 <= nums1[i], nums2[j] <= 10^9
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: nums1 (có m+n slots), m, nums2, n
 *    - Output: nums1 đã merge (m phần tử đầu)
 *    - Cả 2 arrays đã sorted
 *
 * 2. Phân tích:
 *    - Dùng 2 con trỏ: i cho nums1, j cho nums2
 *    - So sánh nums1[i] và nums2[j]
 *    - Thêm nhỏ hơn vào nums1 tại vị trí k
 *
 * 3. Các cách tiếp cận:
 *    - Two Pointers: Dùng 2 con trỏ → O(m + n)
 *    - Concatenate & Sort: Nối rồi sort → O((m+n) log(m+n))
 *    - Insert: Chèn từng phần tử nums2 vào nums1 → O(mn)
 */

// =====================================================
// GIẢI PHÁP 1: Two Pointers (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(m + n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng 2 con trỏ, so sánh và merge
 *
 * Giải thích:
 * - i = m - 1 (vị trí cuối nums1 có giá trị)
 * - j = n - 1 (vị trí cuối nums2)
 * - k = m + n - 1 (vị trí ghi kết quả)
 * - So sánh nums1[i] và nums2[j]
 * - Thêm nhỏ hơn vào nums1[k]
 *
 * Ưu điểm:
 * - Tối ưu, in-place
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu two pointers
 */
function merge_twoPointers(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums2[j--];
    } else {
      nums1[k--] = nums1[i--];
    }
  }

  // Copy phần còn lại của nums2 (nếu có)
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
}

// =====================================================
// GIẢI PHÁP 2: Concatenate & Sort (Cải tiến - Không tối ưu)
// =====================================================
/**
 * Time: O((m+n) log(m+n))
 * Space: O(1)
 *
 * Ý tưởng: Nối 2 arrays rồi sort
 *
 * Giải thích:
 * - Copy nums1 và nums2 vào nums1
 * - Sort nums1
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Không tối ưu: O((m+n) log(m+n))
 * - Không tận dụng tính chất đã sorted
 */
function merge_concatenate(nums1, m, nums2, n) {
  // Copy nums2 vào cuối nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Sort toàn bộ nums1
  nums1.sort((a, b) => a - b);
}

// =====================================================
// GIẢI PHÁP 3: Insert (Nâng cao - Không tối ưu)
// =====================================================
/**
 * Time: O(mn)
 * Space: O(1)
 *
 * Ý tưởng: Chèn từng phần tử nums2 vào nums1
 *
 * Giải thích:
 * - Duyệt từng phần tử nums2
 * - Tìm vị trí chèn trong nums1
 * - Dịch chuyển các phần tử
 *
 * Ưu điểm:
 * - Code dễ hiểu
 * - Không cần sort
 *
 * Nhược điểm:
 * - Chậm: O(mn)
 * - Không tối ưu
 */
function merge_insert(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    const num = nums2[i];
    let j = m - 1;

    // Tìm vị trí chèn
    while (j >= 0 && nums1[j] > num) {
      j--;
    }

    // Dịch chuyển
    for (let k = m + i - 1; k > j + 1; k--) {
      nums1[k] = nums1[k - 1];
    }
    nums1[j + 1] = num;
  }
}

// =====================================================
// TEST CASES
// =====================================================
console.log("=== Test Case 1 ===");
const nums1_1 = [1, 2, 3, 0, 0];
const m1 = 3;
const nums2_1 = [2, 5, 6];
const n1 = 3;
console.log("Input: nums1 = [1,2,3,0,0], m = 3, nums2 = [2,5,6], n = 3");
merge_twoPointers([...nums1_1], m1, [...nums2_1], n1);
console.log("Result:", nums1_1);
// Expected: [1,2,2,3,5,6,0,0]

console.log("\n=== Test Case 2 ===");
const nums1_2 = [1];
const m2 = 1;
const nums2_2 = [];
const n2 = 0;
console.log("Input: nums1 = [1], m = 1, nums2 = [], n = 0");
merge_twoPointers([...nums1_2], m2, [...nums2_2], n2);
console.log("Result:", nums1_2);
// Expected: [1]

console.log("\n=== Test Case 3 ===");
const nums1_3 = [0];
const m3 = 1;
const nums2_3 = [1];
const n3 = 1;
console.log("Input: nums1 = [0], m = 1, nums2 = [1], n = 1");
merge_twoPointers([...nums1_3], m3, [...nums2_3], n3);
console.log("Result:", nums1_3);
// Expected: [1]

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Two Pointers | O(m+n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Concatenate | O((m+n)log(m+n)) | O(1) | Dễ hiểu |
 * | Insert | O(mn) | O(1) | Không tối ưu |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Two Pointers (giải pháp 1)
 * - Pattern này dùng cho merge 2 sorted sequences
 */

// Export cho LeetCode
module.exports = merge_twoPointers;
