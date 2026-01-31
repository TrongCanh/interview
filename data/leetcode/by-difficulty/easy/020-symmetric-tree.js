/**
 * Problem: Symmetric Tree
 * URL: https://leetcode.com/problems/symmetric-tree/
 * Difficulty: Easy
 * Category: Tree, DFS, BFS
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
 *
 * Example 1:
 * Input: root = [1,2,2,3,4,4]
 * Output: true
 * Explanation:
 * The binary tree [1,2,2,null,3,null,4,4] is symmetric.
 *
 * Example 2:
 * Input: root = [1,2,2,null,3,null,4,4]
 * Output: false
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 1000].
 * - -100 <= Node.val <= 100
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
 *    - Input: root của binary tree
 *    - Output: true nếu symmetric, false nếu không
 *    - Symmetric: mirror xung quanh center
 *
 * 2. Phân tích:
 *    - So sánh left và right subtree
 *    - Left subtree phải là mirror của right subtree
 *    - Dùng recursive để check mirror
 *
 * 3. Các cách tiếp cận:
 *    - Recursive: Dùng đệ quy → O(n)
 *    - Iterative: Dùng queue → O(n)
 *    - Reverse & Compare: Reverse rồi so sánh → O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Recursive (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(h) - call stack
 *
 * Ý tưởng: Dùng đệ quy để check mirror
 *
 * Giải thích:
 * - isMirror: check 2 trees có phải mirror không
 * - isSymmetric: check left và right có mirror không
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn stack space: O(h)
 * - Có thể stack overflow với tree sâu
 */
function isMirror(left, right) {
  if (!left && !right) return true;
  if (!left || !right) return false;
  if (left.val !== right.val) return false;

  return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}

function isSymmetric_recursive(root) {
  if (!root) return true;
  return isMirror(root.left, root.right);
}

// =====================================================
// GIẢI PHÁP 2: Iterative with Queue (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Dùng queue để duyệt từng level
 *
 * Giải thích:
 * - Duyệt từng level
 * - Mỗi level phải là palindrome
 * - Left và right của mỗi level phải giống nhau
 *
 * Ưu điểm:
 * - Không tốn stack space từ đệ quy
 * - Code sạch
 *
 * Nhược điểm:
 * - Tốn O(n) extra space cho queue
 * - Code phức tạp hơn
 */
function isSymmetric_iterative(root) {
  if (!root) return true;

  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Check level là palindrome
    const left = level.slice(0, Math.floor(level.length / 2));
    const right = level.slice(Math.ceil(level.length / 2)).reverse();

    if (JSON.stringify(left) !== JSON.stringify(right)) {
      return false;
    }
  }

  return true;
}

// =====================================================
// GIẢI PHÁP 3: Reverse & Compare (Nâng cao)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: Reverse right subtree rồi so sánh với left
 *
 * Giải thích:
 * - Serialize right subtree
 * - Reverse serialized right
 * - So sánh với left subtree
 *
 * Ưu điểm:
 * - Code dễ đọc
 * - Dễ debug
 *
 * Nhược điểm:
 * - Tốn extra space cho serialize/reverse
 * - Không tối ưu
 */
function isSymmetric_reverse(root) {
  if (!root) return true;

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

  const left = serialize(root.left);
  const right = serialize(root.right).reverse();

  return JSON.stringify(left) === JSON.stringify(right);
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
const tree1 = createTree([1, 2, 2, null, 3, null, 4, 4]);
console.log("Input: [1,2,2,null,3,null,4,4]");
console.log("Recursive:", isSymmetric_recursive(tree1));
console.log("Iterative:", isSymmetric_iterative(tree1));
console.log("Reverse & Compare:", isSymmetric_reverse(tree1));
// Expected: true

console.log("\n=== Test Case 2 ===");
const tree2 = createTree([1, 2, 2, null, 3, null, 4, 4]);
console.log("Input: [1,2,2,null,3,null,4,4]");
console.log("Recursive:", isSymmetric_recursive(tree2));
console.log("Iterative:", isSymmetric_iterative(tree2));
console.log("Reverse & Compare:", isSymmetric_reverse(tree2));
// Expected: true

console.log("\n=== Test Case 3 ===");
const tree3 = createTree([1, 2, 3]);
console.log("Input: [1,2,3]");
console.log("Recursive:", isSymmetric_recursive(tree3));
console.log("Iterative:", isSymmetric_iterative(tree3));
console.log("Reverse & Compare:", isSymmetric_reverse(tree3));
// Expected: false

console.log("\n=== Test Case 4 ===");
const tree4 = createTree([1]);
console.log("Input: [1]");
console.log("Recursive:", isSymmetric_recursive(tree4));
console.log("Iterative:", isSymmetric_iterative(tree4));
console.log("Reverse & Compare:", isSymmetric_reverse(tree4));
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
 * | Iterative | O(n) | O(n) | Không tốn stack đệ quy |
 * | Reverse & Compare | O(n) | O(n) | Dễ debug |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Recursive (giải pháp 1)
 * - Pattern này dùng cho check symmetric tree
 */

// Export cho LeetCode
module.exports = isSymmetric_recursive;
