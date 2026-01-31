/**
 * Problem: Binary Tree Inorder Traversal
 * URL: https://leetcode.com/problems/binary-tree-inorder-traversal/
 * Difficulty: Easy
 * Category: Tree, DFS
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 *
 * Example 1:
 * Input: root = [1,null,2,3]
 * Output: [1,3,2]
 * Explanation:
 * The inorder traversal of the binary tree is [1,3,2].
 *
 * Example 2:
 * Input: root = []
 * Output: []
 *
 * Example 3:
 * Input: root = [1]
 * Output: [1]
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 100].
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
 *    - Output: mảng giá trị theo inorder traversal
 *    - Inorder: Left → Root → Right
 *
 * 2. Phân tích:
 *    - Duyệt theo inorder: left, root, right
 *    - Dùng DFS (depth-first search)
 *
 * 3. Các cách tiếp cận:
 *    - Recursive: Dùng đệ quy → O(n)
 *    - Iterative with Stack: Dùng stack → O(n)
 *    - Morris Traversal: Dùng Morris → O(n), O(1) space
 */

// =====================================================
// GIẢI PHÁP 1: Recursive (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n)
 * Space: O(h) - call stack
 *
 * Ý tưởng: Dùng đệ quy để duyệt inorder
 *
 * Giải thích:
 * - Base case: !root → trả về []
 * - Traversal: left, root, right
 * - Concat kết quả: [...left, root.val, ...right]
 *
 * Ưu điểm:
 * - Dễ hiểu, dễ implement
 * - Code ngắn gọn
 *
 * Nhược điểm:
 * - Tốn stack space: O(h)
 * - Có thể stack overflow với tree sâu
 */
function inorderTraversal_recursive(root) {
  if (!root) return [];

  const left = inorderTraversal_recursive(root.left);
  const right = inorderTraversal_recursive(root.right);

  return [...left, root.val, ...right];
}

// =====================================================
// GIẢI PHÁP 2: Iterative with Stack (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(h)
 *
 * Ý tưởng: Dùng stack để duyệt inorder
 *
 * Giải thích:
 * - Dùng stack để track nodes
 * - Duyệt: left, root, right
 * - Push node vào stack khi đi sang left
 * - Pop khi đã duyệt xong left
 *
 * Ưu điểm:
 * - Không tốn stack space từ đệ quy
 * - Code sạch
 *
 * Nhược điểm:
 * - Code phức tạp hơn recursive
 * - Vẫn tốn O(h) space cho stack
 */
function inorderTraversal_iterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    // Đi hết sang trái
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Pop node
    current = stack.pop();
    result.push(current.val);

    // Đi sang phải
    current = current.right;
  }

  return result;
}

// =====================================================
// GIẢI PHÁP 3: Morris Traversal (Nâng cao - Tối ưu)
// =====================================================
/**
 * Time: O(n)
 * Space: O(1)
 *
 * Ý tưởng: Dùng Morris traversal để không tốn stack
 *
 * Giải thích:
 * - Tạo link từ rightmost của left subtree
 * - Duyệt và restore link
 *
 * Ưu điểm:
 * - Tối ưu: O(1) space
 * - Không tốn stack
 *
 * Nhược điểm:
 * - Code phức tạp nhất
 * - Khó hiểu
 * - Modify tree structure
 */
function inorderTraversal_morris(root) {
  const result = [];
  let current = root;
  let prev = null;

  while (current) {
    if (!current.left) {
      // Không có left, xử lý node
      result.push(current.val);
      prev = current;
      current = current.right;
    } else {
      // Có left, tạo link
      let temp = current.left;

      // Đi hết sang trái
      while (temp.right && temp.right !== current) {
        temp = temp.right;
      }

      // Tạo link
      if (temp.right !== current) {
        temp.right = current;
        current.left = temp;
      }

      // Xử lý node
      prev = current;
      current = current.left;
    }
  }

  return result;
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
const tree1 = createTree([1, null, 2, 3]);
console.log("Input: [1,null,2,3]");
console.log("Recursive:", inorderTraversal_recursive(tree1));
console.log("Iterative:", inorderTraversal_iterative(tree1));
console.log("Morris:", inorderTraversal_morris(createTree([1, null, 2, 3])));
// Expected: [1, 3, 2]

console.log("\n=== Test Case 2 ===");
const tree2 = createTree([]);
console.log("Input: []");
console.log("Recursive:", inorderTraversal_recursive(tree2));
console.log("Iterative:", inorderTraversal_iterative(tree2));
console.log("Morris:", inorderTraversal_morris(createTree([])));
// Expected: []

console.log("\n=== Test Case 3 ===");
const tree3 = createTree([1]);
console.log("Input: [1]");
console.log("Recursive:", inorderTraversal_recursive(tree3));
console.log("Iterative:", inorderTraversal_iterative(tree3));
console.log("Morris:", inorderTraversal_morris(createTree([1])));
// Expected: [1]

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
 * | Morris | O(n) | O(1) | Tối ưu space |
 *
 * Lời khuyên:
 * - Trong interview, giải thích cả 3 cách
 * - Trong thực tế, dùng Recursive (giải pháp 1)
 * - Pattern này dùng cho tree traversals
 */

// Export cho LeetCode
module.exports = inorderTraversal_recursive;
