/**
 * Problem: Same Tree
 * URL: https://leetcode.com/problems/same-tree/
 * Difficulty: Easy
 * Category: Tree, DFS
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
 *
 * Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 *
 * Example 1:
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 *
 * Example 2:
 * Input: p = [1,2], q = [1,null,2]
 * Output: false
 *
 * Constraints:
 * - The number of nodes in both trees is in the range [0, 100].
 * - -10^4 <= Node.val <= 10^4
 * ==========================================================================
 */

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: 2 binary trees p và q
 *    - Output: true nếu giống nhau, false nếu không
 *    - Giống nhau: cùng cấu trúc, cùng giá trị
 *
 * 2. Phân tích:
 *    - Duyệt cả 2 trees cùng lúc
 *    - So sánh từng node tương ứng
 *    - Nếu khác nhau → trả về false
 *
 * 3. Các cách tiếp cận:
 *    - Recursive: Dùng đệ quy → O(n)
 *    - Iterative: Dùng 2 stacks → O(n)
 *    - Serialize: Serialize rồi so sánh → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Recursive (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(h) - call stack
 *
 * Ý tưởng: Dùng đệ quy để so sánh
 *
 * Giải thích:
 * - Base case: cả 2 null → true
 * - Nếu 1 null hoặc 2 null → false
 * - So sánh val, left, right
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn stack space: O(h)
 * - Có thể stack overflow với tree sâu
 */
function isSameTree_recursive(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return (
    isSameTree_recursive(p.left, q.left) &&
    isSameTree_recursive(p.right, q.right)
  );
}

// =====================================================
// GIẢI PHÁP 2: Iterative with 2 Stacks (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(h)
 *
 * Ý tưởng: Dùng 2 stacks để duyệt song song
 *
 * Giải thích:
 * - Dùng 2 stacks: stackP và stackQ
 * - Duyệt song song 2 trees
 * - So sánh node tương ứng
 *
 * Ưu điểm:
 * - Không tốn stack space từ đệ quy
 * - Code sạch
 *
 * Nhược điểm:
 * - Code phức tạp hơn recursive
 * - Vẫn tốn O(h) space cho stacks
 */
function isSameTree_iterative(p, q) {
  const stackP = [p];
  const stackQ = [q];

  while (stackP.length && stackQ.length) {
    const nodeP = stackP.pop();
    const nodeQ = stackQ.pop();

    if (nodeP.val !== nodeQ.val) return false;

    if (nodeP.left) stackP.push(nodeP.left);
    if (nodeP.right) stackP.push(nodeP.right);
    if (nodeQ.left) stackQ.push(nodeQ.left);
    if (nodeQ.right) stackQ.push(nodeQ.right);
  }

  return stackP.length === stackQ.length;
}

// =====================================================
// GIẢI PHÁP 3: Serialize (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Serialize cả 2 trees rồi so sánh
 *
 * Giải thích:
 * - Serialize tree thành string/array
 * - So sánh 2 serialized versions
 *
 * Ưu điểm:
 * - Code dễ đọc
 * - Dễ debug
 *
 * Nhược điểm:
 * - Tốn extra space cho serialize
 * - Không tối ưu
 */
function isSameTree_serialize(p, q) {
  const serialize = (node) => {
    if (!node) return [];
    const result = [node.val];
    const queue = [node];

    while (queue.length) {
      const current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  };

  return JSON.stringify(serialize(p)) === JSON.stringify(serialize(q));
}

// =====================================================
// TEST CASES
// =====================================================
function createTree(arr) {
  if (!arr.length) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift();

    // Left child
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
      i++;
    }

    // Right child
    if (arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
      i++;
    }
  }

  return root;
}

console.log("=== Test Case 1 ===");
const tree1_p = createTree([1, 2, 3]);
const tree1_q = createTree([1, 2, 3]);
console.log("Input: p = [1,2,3], q = [1,2,3]");
console.log("Recursive:", isSameTree_recursive(tree1_p, tree1_q));
console.log("Iterative:", isSameTree_iterative(tree1_p, tree1_q));
console.log("Serialize:", isSameTree_serialize(tree1_p, tree1_q));
// Expected: true

console.log("\n=== Test Case 2 ===");
const tree2_p = createTree([1, 2]);
const tree2_q = createTree([1, null, 2]);
console.log("Input: p = [1,2], q = [1,null,2]");
console.log("Recursive:", isSameTree_recursive(tree2_p, tree2_q));
console.log("Iterative:", isSameTree_iterative(tree2_p, tree2_q));
console.log("Serialize:", isSameTree_serialize(tree2_p, tree2_q));
// Expected: false

console.log("\n=== Test Case 3 ===");
const tree3_p = createTree([]);
const tree3_q = createTree([]);
console.log("Input: p = [], q = []");
console.log("Recursive:", isSameTree_recursive(tree3_p, tree3_q));
console.log("Iterative:", isSameTree_iterative(tree3_p, tree3_q));
console.log("Serialize:", isSameTree_serialize(tree3_p, tree3_q));
// Expected: true

// =====================================================
// TỔNG KẾT / SUMMARY
// =====================================================
/**
 * So sánh các giải pháp:
 *
 * | Giải pháp | Time | Space | Khi nào dùng |
 * |-----------|------|-------|--------------|
 * | Recursive | O(n) | O(h) | Dễ hiểu (RECOMMENDED) |
 * | Iterative | O(n) | O(h) | Không tốn stack đệ quy |
 * | Serialize | O(n) | O(n) | Dễ debug |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Recursive (giải pháp 1)
 * - Pattern này dùng cho so sánh 2 trees
 */

// Export cho LeetCode
module.exports = isSameTree_recursive;
