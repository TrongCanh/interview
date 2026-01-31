/**
 * Problem: Merge Two Sorted Lists
 * URL: https://leetcode.com/problems/merge-two-sorted-lists/
 * Difficulty: Easy
 * Category: Linked List, Two Pointers
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 * Constraints:
 * - The number of nodes in both lists is in the range [0, 50].
 * - -100 <= Node.val <= 100
 * - Both list1 and list2 are sorted in non-decreasing order.
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
 *    - Input: 2 linked lists đã sắp xếp
 *    - Output: 1 linked list đã merge và sắp xếp
 *
 * 2. Phân tích:
 *    - Cả 2 lists đã sorted → chỉ cần duyệt 1 lần
 *    - So sánh giá trị hiện tại, thêm nhỏ hơn vào kết quả
 *    - Sau khi 1 list hết → thêm list còn lại
 *
 * 3. Các cách tiếp cận:
 *    - Iterative: Dùng 2 con trỏ duyệt → O(n + m)
 *    - Recursive: Đệ quy → O(n + m)
 *    - Create New: Tạo node mới → O(n + m)
 */

// =====================================================
// GIẢI PHÁP 1: Iterative (Đơn giản nhất - Tối ưu)
// =====================================================
/**
 * Time: O(n + m)
 * Space: O(1)
 *
 * Ý tưởng: Dùng 2 con trỏ duyệt, so sánh và merge
 *
 * Giải thích:
 * - Tạo dummy node để dễ xử lý
 * - Dùng 2 con trỏ: current, l1, l2
 * - So sánh l1.val và l2.val
 * - Thêm nhỏ hơn vào current.next
 * - Khi 1 list hết → gán list còn lại
 *
 * Ưu điểm:
 * - Tối ưu, dễ hiểu
 * - Không tốn thêm bộ nhớ
 *
 * Nhược điểm:
 * - Phải xử lý nhiều edge cases
 */
function mergeTwoLists_iterative(l1, l2) {
  const dummy = new ListNode();
  let current = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Gán phần còn lại
  current.next = l1 || l2;

  return dummy.next;
}

// =====================================================
// GIẢI PHÁP 2: Recursive (Cải tiến)
// =====================================================
/**
 * Time: O(n + m)
 * Space: O(n + m) - call stack
 *
 * Ý tưởng: Dùng đệ quy để merge
 *
 * Giải thích:
 * - Base case: l1 hoặc l2 null → trả về cái còn lại
 * - So sánh l1.val và l2.val
 * - Đệ quy với phần còn lại
 *
 * Ưu điểm:
 * - Code ngắn, sạch
 * - Dễ hiểu
 *
 * Nhược điểm:
 * - Tốn stack space
 * - Có thể stack overflow với list dài
 */
function mergeTwoLists_recursive(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists_recursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists_recursive(l1, l2.next);
    return l2;
  }
}

// =====================================================
// GIẢI PHÁP 3: Create New Nodes (Nâng cao)
// =====================================================
/**
 * Time: O(n + m)
 * Space: O(n + m)
 *
 * Ý tưởng: Tạo node mới thay vì reuse
 *
 * Giải thích:
 * - Tương tự iterative nhưng tạo node mới
 * - Không modify input lists
 *
 * Ưu điểm:
 * - Không modify input
 * - An toàn hơn
 *
 * Nhược điểm:
 * - Tốn thêm bộ nhớ
 * - Không tối ưu
 */
function mergeTwoLists_createNew(l1, l2) {
  const dummy = new ListNode();
  let current = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      current.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    current = current.next;
  }

  // Gán phần còn lại
  while (l1) {
    current.next = new ListNode(l1.val);
    l1 = l1.next;
    current = current.next;
  }

  while (l2) {
    current.next = new ListNode(l2.val);
    l2 = l2.next;
    current = current.next;
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
const l1_1 = createList([1, 2, 4]);
const l2_1 = createList([1, 3, 4]);
console.log("Input: [1,2,4], [1,3,4]");
console.log("Iterative:", printList(mergeTwoLists_iterative(l1_1, l2_1)));
console.log(
  "Recursive:",
  printList(
    mergeTwoLists_recursive(createList([1, 2, 4]), createList([1, 3, 4])),
  ),
);
console.log(
  "Create New:",
  printList(
    mergeTwoLists_createNew(createList([1, 2, 4]), createList([1, 3, 4])),
  ),
);
// Expected: 1->1->2->3->4->4

console.log("\n=== Test Case 2 ===");
const l1_2 = createList([]);
const l2_2 = createList([]);
console.log("Input: [], []");
console.log("Iterative:", printList(mergeTwoLists_iterative(l1_2, l2_2)));
console.log(
  "Recursive:",
  printList(mergeTwoLists_recursive(createList([]), createList([]))),
);
console.log(
  "Create New:",
  printList(mergeTwoLists_createNew(createList([]), createList([]))),
);
// Expected: (empty)

console.log("\n=== Test Case 3 ===");
const l1_3 = createList([]);
const l2_3 = createList([0]);
console.log("Input: [], [0]");
console.log("Iterative:", printList(mergeTwoLists_iterative(l1_3, l2_3)));
console.log(
  "Recursive:",
  printList(mergeTwoLists_recursive(createList([]), createList([0]))),
);
console.log(
  "Create New:",
  printList(mergeTwoLists_createNew(createList([]), createList([0]))),
);
// Expected: 0

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Iterative | O(n+m) | O(1) | Tối ưu (RECOMMENDED) |
 * | Recursive | O(n+m) | O(n+m) | Code ngắn |
 * | Create New | O(n+m) | O(n+m) | Không modify input |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Iterative (giải pháp 1)
 * - Pattern này dùng cho merge 2 sorted sequences
 */

// Export cho LeetCode
module.exports = mergeTwoLists_iterative;
