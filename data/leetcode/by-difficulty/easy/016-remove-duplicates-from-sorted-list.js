/**
 * Problem: Remove Duplicates from Sorted List
 * URL: https://leetcode.com/problems/remove-duplicates-from-sorted-list/
 * Difficulty: Easy
 * Category: Linked List
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
 *
 * Example 1:
 * Input: head = [1,1,2]
 * Output: [1,2]
 *
 * Example 2:
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 *
 * Example 3:
 * Input: head = []
 * Output: []
 *
 * Constraints:
 * - The number of nodes in the list is in the range [0, 300].
 * - -100 <= Node.val <= 100
 * - The list is guaranteed to be sorted in ascending order.
 * ==========================================================================
 */

// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: head của sorted linked list
 *    - Output: head của linked list đã xóa duplicate
 *    - List đã sorted → duplicate nằm cạnh nhau
 *
 * 2. Phân tích:
 *    - Duyệt từng node
 *    - Nếu node.val === next.val → skip next
 *    - Ngược lại → giữ lại
 *
 * 3. Các cách tiếp cận:
 *    - Iterative: Duyệt từng node → O(n)
 *    - Recursive: Dùng đệ quy → O(n)
 *    - Set: Dùng set để track → O(n) nhưng tốn space
 */

// =====================================================
// GIẢI PHÁP 1: Iterative (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Duyệt từng node, skip duplicate
 *
 * Giải thích:
 * - current = head
 * - Duyệt trong khi current && current.next
 * - Nếu current.val === current.next.val:
 *   - current.next = current.next.next (skip duplicate)
 * - Ngược lại:
 *   - current = current.next
 *
 * Ưu điểm:
 * - Tối ưu, in-place
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Phải hiểu linked list
 */
function deleteDuplicates_iterative(head) {
  let current = head;

  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
}

// =====================================================
// GIẢI PHÁP 2: Recursive (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n) - call stack
 *
 * Ý tưởng: Dùng đệ quy để xử lý
 *
 * Giải thích:
 * - Base case: !head || !head.next → trả về head
 * - Nếu head.val === head.next.val:
 *   - head.next = deleteDuplicates_recursive(head.next.next)
 * - Ngược lại:
 *   - head.next = deleteDuplicates_recursive(head.next)
 *
 * Ưu điểm:
 * - Code ngắn, sạch
 * - Dễ hiểu
 *
 * Nhược điểm:
 * - Tốn stack space
 * - Có thể stack overflow với list dài
 */
function deleteDuplicates_recursive(head) {
  if (!head || !head.next) return head;

  if (head.val === head.next.val) {
    head.next = deleteDuplicates_recursive(head.next.next);
    return head;
  } else {
    head.next = deleteDuplicates_recursive(head.next);
    return head;
  }
}

// =====================================================
// GIẢI PHÁP 3: Dummy Node (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng dummy node để dễ xử lý
 *
 * Giải thích:
 * - Tạo dummy node trước head
 * - Dùng prev để track node trước
 * - Duyệt với prev
 * - Code dễ đọc hơn
 *
 * Ưu điểm:
 * - Code dễ đọc
 * - Tối ưu
 *
 * Nhược điểm:
 * - Tốn thêm dummy node
 */
function deleteDuplicates_dummy(head) {
  const dummy = new ListNode();
  dummy.next = head;
  let prev = dummy;
  let current = head;

  while (current) {
    if (current.next && current.val === current.next.val) {
      // Skip duplicate
      prev.next = current.next;
      current = current.next;
    } else {
      // Move forward
      prev = current;
      current = current.next;
    }
  }

  return dummy.next;
}

// =====================================================
// TEST CASES
// =====================================================
function createList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

function printList(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result.join("->");
}

console.log("=== Test Case 1 ===");
const l1_1 = createList([1, 1, 2]);
console.log("Input: [1,1,2]");
console.log("Iterative:", printList(deleteDuplicates_iterative(l1_1)));
console.log(
  "Recursive:",
  printList(deleteDuplicates_recursive(createList([1, 1, 2]))),
);
console.log(
  "Dummy Node:",
  printList(deleteDuplicates_dummy(createList([1, 1, 2]))),
);
// Expected: 1->2

console.log("\n=== Test Case 2 ===");
const l1_2 = createList([1, 1, 2, 3, 3]);
console.log("Input: [1,1,2,3,3]");
console.log("Iterative:", printList(deleteDuplicates_iterative(l1_2)));
console.log(
  "Recursive:",
  printList(deleteDuplicates_recursive(createList([1, 1, 2, 3, 3]))),
);
console.log(
  "Dummy Node:",
  printList(deleteDuplicates_dummy(createList([1, 1, 2, 3, 3]))),
);
// Expected: 1->2->3

console.log("\n=== Test Case 3 ===");
const l1_3 = createList([]);
console.log("Input: []");
console.log("Iterative:", printList(deleteDuplicates_iterative(l1_3)));
console.log(
  "Recursive:",
  printList(deleteDuplicates_recursive(createList([]))),
);
console.log("Dummy Node:", printList(deleteDuplicates_dummy(createList([]))));
// Expected: (empty)

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Iterative | O(n) | O(1) | Tối ưu (RECOMMENDED) |
 * | Recursive | O(n) | O(n) | Code ngắn |
 * | Dummy Node | O(n) | O(1) | Code dễ đọc |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Iterative (giải pháp 1)
 * - Pattern này dùng cho remove duplicates in sorted list
 */

// Export cho LeetCode
module.exports = deleteDuplicates_iterative;
