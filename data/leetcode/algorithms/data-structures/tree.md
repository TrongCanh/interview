# Tree / Cây

> Cấu trúc dữ liệu Tree - Giải thích chi tiết / Tree Data Structure - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Tree** (Cây) là một cấu trúc dữ liệu phi tuyến tính (non-linear) bao gồm các node (nút) được kết nối với nhau bởi các cạnh (edges). Mỗi tree có một node đặc biệt gọi là **root** (gốc), và các node không có con được gọi là **leaf** (lá).

### Các khái niệm cơ bản / Basic Concepts

- **Root (Gốc):** Node duy nhất không có cha, là điểm bắt đầu của tree
- **Parent (Cha):** Node có ít nhất một node con
- **Child (Con):** Node được kết nối trực tiếp từ một node cha
- **Leaf (Lá):** Node không có node con
- **Sibling (Anh chị em):** Các node có cùng cha
- **Depth (Độ sâu):** Số cạnh từ root đến node đó
- **Height (Chiều cao):** Số cạnh lớn nhất từ node đến node lá xa nhất
- **Level (Cấp độ):** Depth + 1

### Các loại cây phổ biến / Common Types of Trees

1. **Binary Tree (Cây nhị phân):** Mỗi node có tối đa 2 con (left và right)
2. **Binary Search Tree (BST):** Binary Tree với đặc điểm:
   - Tất cả node ở cây con trái nhỏ hơn node hiện tại
   - Tất cả node ở cây con phải lớn hơn node hiện tại
3. **Balanced Tree (Cây cân bằng):** Chiều cao của cây con trái và phải chênh lệch không quá 1
4. **Complete Binary Tree:** Tất cả level được lấp đầy đầy đủ, trừ có thể level cuối cùng
5. **Full Binary Tree:** Mỗi node có 0 hoặc 2 con
6. **Perfect Binary Tree:** Tất cả node có 2 con và tất cả leaf ở cùng depth

---

## 🎯 Khi nào dùng? / When to use?

- **Cần lưu trữ dữ liệu có cấu trúc phân cấp** (file system, organization chart)
- **Cần tìm kiếm nhanh** (BST: O(log n))
- **Cần duyệt dữ liệu theo thứ tự** (inorder, preorder, postorder)
- **Cần biểu diễn các mối quan hệ cha-con** (DOM tree, XML parser)
- **Cần tối ưu hóa các bài toán về khoảng cách** (shortest path, minimum spanning tree)

---

## 🔄 Các biến thể / Variations

### Binary Tree (Cây nhị phân)

Mỗi node có tối đa 2 con.

### Binary Search Tree (BST)

Binary Tree với đặc điểm:

- Left subtree < Node < Right subtree
- Cho phép tìm kiếm, thêm, xóa trong O(log n) (trong trường hợp cân bằng)

### AVL Tree

BST tự cân bằng, đảm bảo chiều cao cây luôn là O(log n).

### Red-Black Tree

BST tự cân bằng với các node được đánh màu đỏ/đen, đảm bảo các thao tác trong O(log n).

### B-Tree

Cây cân bằng dùng cho cơ sở dữ liệu và file system, có thể có nhiều con.

### Trie (Prefix Tree)

Cây dùng để lưu trữ chuỗi, hữu ích cho autocomplete và spell checking.

---

## 💡 Code Template / Mẫu Code

### Cấu trúc Node / Node Structure

```javascript
/**
 * TreeNode - Cấu trúc node cho Binary Tree
 * @param {*} val - Giá trị của node
 * @param {TreeNode} left - Node con trái
 * @param {TreeNode} right - Node con phải
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Tạo node
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```

### Template cơ bản / Basic Template

```javascript
/**
 * Duyệt cây - Tree Traversal Template
 * @param {TreeNode} root - Root của cây
 */
function traverseTree(root) {
  if (root === null) {
    return;
  }

  // Xử lý node hiện tại
  console.log(root.val);

  // Duyệt cây con trái
  traverseTree(root.left);

  // Duyệt cây con phải
  traverseTree(root.right);
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Duyệt cây theo các cách khác nhau - Tree Traversal Variations
 * @param {TreeNode} root - Root của cây
 */

// Preorder Traversal: Root -> Left -> Right
function preorderTraversal(root, result = []) {
  if (root === null) return result;

  result.push(root.val); // Root
  preorderTraversal(root.left, result); // Left
  preorderTraversal(root.right, result); // Right

  return result;
}

// Inorder Traversal: Left -> Root -> Right
function inorderTraversal(root, result = []) {
  if (root === null) return result;

  inorderTraversal(root.left, result); // Left
  result.push(root.val); // Root
  inorderTraversal(root.right, result); // Right

  return result;
}

// Postorder Traversal: Left -> Right -> Root
function postorderTraversal(root, result = []) {
  if (root === null) return result;

  postorderTraversal(root.left, result); // Left
  postorderTraversal(root.right, result); // Right
  result.push(root.val); // Root

  return result;
}

// Level Order Traversal (BFS)
function levelOrderTraversal(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Tìm chiều cao cây

**Mô tả:** Tính chiều cao của binary tree (số cạnh lớn nhất từ root đến leaf).

**Code:**

```javascript
/**
 * Tìm chiều cao cây - Find Tree Height
 * @param {TreeNode} root - Root của cây
 * @return {number} - Chiều cao của cây
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(h) - stack depth, h là chiều cao của cây
 */
function treeHeight(root) {
  // Base case: cây rỗng
  if (root === null) {
    return -1; // Chiều cao của cây rỗng là -1
  }

  // Chiều cao = max(chiều cao trái, chiều cao phải) + 1
  return Math.max(treeHeight(root.left), treeHeight(root.right)) + 1;
}

// Test
const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);
console.log(treeHeight(tree1)); // 1

const tree2 = new TreeNode(1);
tree2.left = new TreeNode(2);
tree2.left.left = new TreeNode(3);
console.log(treeHeight(tree2)); // 2
```

### Ví dụ 2 / Example 2: Kiểm tra cây cân bằng

**Mô tả:** Kiểm tra xem binary tree có phải là balanced tree không (chiều cao cây con trái và phải chênh lệch không quá 1).

**Code:**

```javascript
/**
 * Kiểm tra cây cân bằng - Check Balanced Tree
 * @param {TreeNode} root - Root của cây
 * @return {boolean} - True nếu cây cân bằng
 *
 * Time Complexity: O(n) - mỗi node được duyệt một lần
 * Space Complexity: O(h) - stack depth
 */
function isBalanced(root) {
  function checkHeight(node) {
    // Base case: node null
    if (node === null) {
      return 0;
    }

    // Kiểm tra cây con trái
    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1;

    // Kiểm tra cây con phải
    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1;

    // Kiểm tra độ chênh lệch
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    // Trả về chiều cao
    return Math.max(leftHeight, rightHeight) + 1;
  }

  return checkHeight(root) !== -1;
}

// Test
const balancedTree = new TreeNode(1);
balancedTree.left = new TreeNode(2);
balancedTree.right = new TreeNode(3);
console.log(isBalanced(balancedTree)); // true

const unbalancedTree = new TreeNode(1);
unbalancedTree.left = new TreeNode(2);
unbalancedTree.left.left = new TreeNode(3);
console.log(isBalanced(unbalancedTree)); // false
```

### Ví dụ 3 / Example 3: Tìm node có giá trị x

**Mô tả:** Tìm node có giá trị x trong binary tree.

**Code:**

```javascript
/**
 * Tìm node có giá trị x - Find Node with Value x
 * @param {TreeNode} root - Root của cây
 * @param {*} x - Giá trị cần tìm
 * @return {TreeNode|null} - Node tìm được hoặc null
 *
 * Time Complexity: O(n) - duyệt qua tất cả node trong trường hợp xấu nhất
 * Space Complexity: O(h) - stack depth
 */
function findNode(root, x) {
  // Base case: cây rỗng hoặc tìm thấy node
  if (root === null || root.val === x) {
    return root;
  }

  // Tìm trong cây con trái
  const leftResult = findNode(root.left, x);
  if (leftResult !== null) {
    return leftResult;
  }

  // Tìm trong cây con phải
  return findNode(root.right, x);
}

// Test
const searchTree = new TreeNode(1);
searchTree.left = new TreeNode(2);
searchTree.right = new TreeNode(3);
searchTree.left.left = new TreeNode(4);
console.log(findNode(searchTree, 3)?.val); // 3
console.log(findNode(searchTree, 5)?.val); // undefined
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Same Tree](../problems/easy/100-same-tree.md)
- [Symmetric Tree](../problems/easy/101-symmetric-tree.md)
- [Binary Tree Inorder Traversal](../problems/easy/094-binary-tree-inorder-traversal.md)
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- [Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation     | Time Complexity | Space Complexity | Ghi chú / Notes       |
| ------------------------ | --------------- | ---------------- | --------------------- |
| Truy cập node / Access   | O(1)            | O(1)             | Nếu có reference      |
| Duyệt cây / Traversal    | O(n)            | O(h)             | h là chiều cao cây    |
| Tìm kiếm (BST) / Search  | O(log n) - O(n) | O(h)             | O(log n) nếu cân bằng |
| Thêm node (BST) / Insert | O(log n) - O(n) | O(h)             | O(log n) nếu cân bằng |
| Xóa node (BST) / Delete  | O(log n) - O(n) | O(h)             | O(log n) nếu cân bằng |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên kiểm tra null:** Luôn kiểm tra `node === null` trước khi truy cập `node.left` hoặc `node.right`
2. **Nhầm lẫn depth và height:** Depth là khoảng cách từ root, height là khoảng cách đến leaf xa nhất
3. **Không hiểu rõ loại tree:** BST có đặc điểm riêng, không áp dụng cho binary tree thường
4. **Stack overflow với recursion:** Cây rất sâu có thể gây stack overflow, cân nhắc dùng iterative
5. **Nhầm lẫn các loại traversal:** Preorder, inorder, postorder có thứ tự khác nhau

---

## 💡 Tips & Tricks

1. **Base Cases:** Luôn xử lý base cases trước (null, leaf node)
2. **Recursion vs Iterative:** Recursion code ngắn hơn nhưng có thể gây stack overflow
3. **BST Properties:** Tận dụng đặc điểm của BST để tối ưu tìm kiếm
4. **Level Order:** Dùng queue để duyệt theo level (BFS)
5. **Height vs Depth:** Height = max distance to leaf, Depth = distance from root

---

## 📚 Tài liệu tham khảo / References

- [Tree Data Structure - Wikipedia](<https://en.wikipedia.org/wiki/Tree_(data_structure)>)
- [Binary Tree - Wikipedia](https://en.wikipedia.org/wiki/Binary_tree)
- [Binary Search Tree - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree)
- [Tree Traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)

---

_Last updated: 2025-02-03_
