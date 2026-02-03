# Binary Tree Inorder Traversal / Duyệt cây nhị phân theo thứ tự giữa

> LeetCode 94 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 94
- **URL:** https://leetcode.com/problems/binary-tree-inorder-traversal/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Depth-First Search, Binary Tree
- **Tags:** Tree, Depth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, DFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `root` of a binary tree, return the **inorder traversal** of its nodes' values.

**Example 1:**

```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Example 2:**

```
Input: root = []
Output: []
```

**Example 3:**

```
Input: root = [1]
Output: [1]
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của một binary tree
- **Output:** Mảng chứa các giá trị của node theo thứ tự inorder (trái - root - phải)
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 100
  - Giá trị node từ -100 đến 100
- **Edge cases:**
  - Cây rỗng (root = null)
  - Cây chỉ có root
  - Cây không cân bằng

### 2. Tư duy / Thinking Process

- Bước 1: Inorder traversal: Left → Root → Right
- Bước 2: Có thể dùng Recursion: gọi đệ quy cho trái, thêm root, gọi đệ quy cho phải
- Bước 3: Có thể dùng Iterative với Stack: duyệt đến node trái nhất, sau đó xử lý root và node phải
- Bước 4: Có thể dùng Morris Traversal: không dùng stack, O(1) space

### 3. Ví dụ minh họa / Examples

```
Example 1: [1,null,2,3]
    1
     \
      2
     /
    3

Inorder: Left → Root → Right
- Node 1: Left = null, Root = 1, Right = 2
  - Node 2: Left = 3, Root = 2, Right = null
    - Node 3: Left = null, Root = 3, Right = null
      - Kết quả: [3]
    - Kết quả: [3, 2]
  - Kết quả: [1, 3, 2]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Recursion: duyệt trái, thêm root, duyệt phải.

### Thuật toán / Algorithm

1. Nếu root là null, trả về mảng rỗng
2. Gọi đệ quy cho node trái
3. Thêm giá trị root vào kết quả
4. Gọi đệ quy cho node phải
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Binary Tree Inorder Traversal - Giải pháp 1: Recursive (Brute Force)
 * @param {TreeNode} root - Root của binary tree
 * @return {number[]} - Mảng chứa các giá trị theo thứ tự inorder
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(h) - stack depth, h là chiều cao của cây
 */
function inorderTraversal_recursive(root) {
  const result = [];

  function inorder(node) {
    // Base case: node null
    if (node === null) {
      return;
    }

    // Duyệt trái
    inorder(node.left);

    // Thêm root
    result.push(node.val);

    // Duyệt phải
    inorder(node.right);
  }

  inorder(root);
  return result;
}

// Helper function để tạo cây từ array
function createTree(arr, index = 0) {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const node = new TreeNode(arr[index]);
  node.left = createTree(arr, 2 * index + 1);
  node.right = createTree(arr, 2 * index + 2);

  return node;
}

// Test
console.log(inorderTraversal_recursive(createTree([1, null, 2, 3]))); // [1,3,2]
console.log(inorderTraversal_recursive(createTree([]))); // []
console.log(inorderTraversal_recursive(createTree([1]))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(h) - stack depth, h là chiều cao của cây

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Tốn bộ nhớ cho stack
- Có thể gây stack overflow với cây rất sâu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Recursion có thể gây stack overflow
- Điểm yếu của giải pháp 1? Tốn bộ nhớ cho stack
- Cách tiếp cận mới? Sử dụng Iterative với Stack

### Ý tưởng / Idea

Sử dụng Iterative với Stack. Duyệt đến node trái nhất, lưu các node vào stack. Khi không còn node trái, pop node từ stack, thêm giá trị vào kết quả, sau đó duyệt node phải.

### Thuật toán / Algorithm

1. Khởi tạo result = [], stack = [], current = root
2. Trong khi current không null hoặc stack không rỗng:
   - Trong khi current không null:
     - Đẩy current vào stack
     - current = current.left
   - Pop node từ stack
   - Thêm node.val vào result
   - current = node.right
3. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Inorder Traversal - Giải pháp 2: Iterative with Stack (Optimized)
 * @param {TreeNode} root - Root của binary tree
 * @return {number[]} - Mảng chứa các giá trị theo thứ tự inorder
 *
 * Time Complexity: O(n) - mỗi node được đẩy và pop từ stack một lần
 * Space Complexity: O(h) - stack depth, h là chiều cao của cây
 */
function inorderTraversal_iterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    // Duyệt đến node trái nhất
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // Pop node từ stack
    current = stack.pop();

    // Thêm giá trị vào kết quả
    result.push(current.val);

    // Duyệt node phải
    current = current.right;
  }

  return result;
}

// Test
console.log(inorderTraversal_iterative(createTree([1, null, 2, 3]))); // [1,3,2]
console.log(inorderTraversal_iterative(createTree([]))); // []
console.log(inorderTraversal_iterative(createTree([1]))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi node được đẩy và pop từ stack một lần
- **Space Complexity:** O(h) - stack depth, h là chiều cao của cây

### Ưu điểm / Pros

- Không có stack overflow
- Tối ưu về space (so với recursion trong một số trường hợp)
- Dễ hiểu

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với recursion

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể giảm space complexity xuống O(1)
- Có thuật toán/pattern nào phù hợp hơn? Morris Traversal - không dùng stack

### Ý tưởng / Idea

Sử dụng Morris Traversal. Ý tưởng là tạo liên kết tạm thời từ node phải nhất của cây con trái đến node hiện tại. Điều này cho phép quay lại node hiện tại sau khi duyệt cây con trái mà không cần stack.

### Thuật toán / Algorithm

1. Khởi tạo result = [], current = root
2. Trong khi current không null:
   - Nếu current.left là null:
     - Thêm current.val vào result
     - current = current.right
   - Ngược lại:
     - Tìm node phải nhất của cây con trái (predecessor)
     - Nếu predecessor.right là null:
       - Tạo liên kết tạm thời: predecessor.right = current
       - current = current.left
     - Ngược lại:
       - Xóa liên kết tạm thời: predecessor.right = null
       - Thêm current.val vào result
       - current = current.right
3. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Inorder Traversal - Giải pháp 3: Morris Traversal (Advanced)
 * @param {TreeNode} root - Root của binary tree
 * @return {number[]} - Mảng chứa các giá trị theo thứ tự inorder
 *
 * Time Complexity: O(n) - mỗi node được duyệt tối đa 2 lần
 * Space Complexity: O(1) - không dùng stack
 */
function inorderTraversal_morris(root) {
  const result = [];
  let current = root;

  while (current !== null) {
    // Nếu không có node trái, thêm current và đi sang phải
    if (current.left === null) {
      result.push(current.val);
      current = current.right;
    } else {
      // Tìm node phải nhất của cây con trái (predecessor)
      let predecessor = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      // Nếu chưa tạo liên kết tạm thời
      if (predecessor.right === null) {
        // Tạo liên kết tạm thời
        predecessor.right = current;
        current = current.left;
      } else {
        // Đã có liên kết tạm thời, xóa nó
        predecessor.right = null;
        result.push(current.val);
        current = current.right;
      }
    }
  }

  return result;
}

// Test
console.log(inorderTraversal_morris(createTree([1, null, 2, 3]))); // [1,3,2]
console.log(inorderTraversal_morris(createTree([]))); // []
console.log(inorderTraversal_morris(createTree([1]))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi node được duyệt tối đa 2 lần
- **Space Complexity:** O(1) - không dùng stack

### Ưu điểm / Pros

- Tối ưu về space (O(1))
- Không có stack overflow
- Không làm thay đổi cấu trúc cây sau khi hoàn thành

### Nhược điểm / Cons

- Code phức tạp hơn
- Tốn thêm thời gian để tìm predecessor
- Khó hiểu hơn các giải pháp khác

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use    |
| -------------------- | ---- | ----- | ------------------- | ----------------------------- |
| Recursive            | O(n) | O(h)  | Dễ / Easy           | Code nhanh, cây không quá sâu |
| Iterative (Stack)    | O(n) | O(h)  | Trung bình / Medium | Cây sâu, tránh stack overflow |
| Morris Traversal     | O(n) | O(1)  | Khó / Hard          | Cần tối ưu space, cây rất sâu |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = [1, null, 2, 3];
const expected1 = [1, 3, 2];
console.log(`Input: ${JSON.stringify(input1)}`);
console.log(`Expected: ${JSON.stringify(expected1)}`);
console.log(
  `Recursive: ${JSON.stringify(inorderTraversal_recursive(createTree(input1)))}`,
);
console.log(
  `Iterative: ${JSON.stringify(inorderTraversal_iterative(createTree(input1)))}`,
);
console.log(
  `Morris: ${JSON.stringify(inorderTraversal_morris(createTree(input1)))}`,
);
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
const input2 = [];
const expected2 = [];
console.log(`Input: ${JSON.stringify(input2)}`);
console.log(`Expected: ${JSON.stringify(expected2)}`);
console.log(
  `Recursive: ${JSON.stringify(inorderTraversal_recursive(createTree(input2)))}`,
);
console.log(
  `Iterative: ${JSON.stringify(inorderTraversal_iterative(createTree(input2)))}`,
);
console.log(
  `Morris: ${JSON.stringify(inorderTraversal_morris(createTree(input2)))}`,
);
```

### Test Case 3: Chỉ có root / Only Root

```javascript
const input3 = [1];
const expected3 = [1];
console.log(`Input: ${JSON.stringify(input3)}`);
console.log(`Expected: ${JSON.stringify(expected3)}`);
console.log(
  `Recursive: ${JSON.stringify(inorderTraversal_recursive(createTree(input3)))}`,
);
console.log(
  `Iterative: ${JSON.stringify(inorderTraversal_iterative(createTree(input3)))}`,
);
console.log(
  `Morris: ${JSON.stringify(inorderTraversal_morris(createTree(input3)))}`,
);
```

### Test Case 4: Cây đầy đủ / Full Tree

```javascript
const input4 = [1, 2, 3, 4, 5, 6, 7];
const expected4 = [4, 2, 5, 1, 6, 3, 7];
console.log(`Input: ${JSON.stringify(input4)}`);
console.log(`Expected: ${JSON.stringify(expected4)}`);
console.log(
  `Recursive: ${JSON.stringify(inorderTraversal_recursive(createTree(input4)))}`,
);
console.log(
  `Iterative: ${JSON.stringify(inorderTraversal_iterative(createTree(input4)))}`,
);
console.log(
  `Morris: ${JSON.stringify(inorderTraversal_morris(createTree(input4)))}`,
);
```

### Test Case 5: Cây lệch trái / Left Skewed Tree

```javascript
const input5 = [1, 2, null, 3, null, 4];
const expected5 = [4, 3, 2, 1];
console.log(`Input: ${JSON.stringify(input5)}`);
console.log(`Expected: ${JSON.stringify(expected5)}`);
console.log(
  `Recursive: ${JSON.stringify(inorderTraversal_recursive(createTree(input5)))}`,
);
console.log(
  `Iterative: ${JSON.stringify(inorderTraversal_iterative(createTree(input5)))}`,
);
console.log(
  `Morris: ${JSON.stringify(inorderTraversal_morris(createTree(input5)))}`,
);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Tree:** [`../../algorithms/data-structures/tree.md`](../../algorithms/data-structures/tree.md)
- **DFS:** [`../../algorithms/graph-algorithms/dfs.md`](../../algorithms/graph-algorithms/dfs.md)

---

## 💡 Tips & Tricks

1. **Inorder Traversal:** Left → Root → Right, hữu ích cho BST vì kết quả sẽ được sắp xếp
2. **Recursion vs Iterative:** Recursion code ngắn hơn nhưng có thể gây stack overflow
3. **Morris Traversal:** Khi cần tối ưu space, Morris Traversal là lựa chọn tốt nhất
4. **Stack Depth:** Space complexity phụ thuộc vào chiều cao của cây (h), không phải số node (n)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 94 - Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [Tree Traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- [Morris Traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal#Morris_in-order_traversal_using_threading)

---

_Last updated: 2025-02-03_
