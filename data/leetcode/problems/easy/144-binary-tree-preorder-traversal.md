# Binary Tree Preorder Traversal

> LeetCode Problem 144 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 144
- **URL:** https://leetcode.com/problems/binary-tree-preorder-traversal/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Depth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the `root` of a binary tree, return the preorder traversal of its nodes' values.

**Example 1:**

```
Input: root = [1,null,2,3]
Output: [1,2,3]
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

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân
- **Output:** Mảng chứa giá trị các node theo preorder traversal
- **Ràng buộc / Constraints:**
  - Preorder: Root → Left → Right
- **Edge cases:**
  - Cây rỗng (root = null) → []
  - Cây chỉ có 1 node → [root.val]
  - Cây lệch hoàn toàn

### 2. Tư duy / Thinking Process

- **Bước 1:** Preorder traversal: thăm root trước, sau đó left subtree, rồi right subtree
- **Bước 2:** Có thể dùng đệ quy để duyệt cây
- **Bước 3:** Hoặc dùng stack để duyệt iterative

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: root = [1,null,2,3]
    1
     \
      2
       \
        3

Giải thích:
- Preorder traversal: Root → Left → Right
- 1 (root) → null (left) → 2 (right) → null (left) → 3 (right)
Output: [1, 2, 3]
```

---

## 💡 Giải pháp 1: Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy để duyệt cây theo preorder: thăm node hiện tại, sau đó đệ quy left, rồi right.

### Thuật toán / Algorithm

1. Nếu root = null, trả về []
2. Tạo result = [root.val]
3. Thêm preorderTraversal(root.left) vào result
4. Thêm preorderTraversal(root.right) vào result
5. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Preorder Traversal - Recursive Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number[]}
 */
function preorderTraversal(root) {
  if (!root) {
    return [];
  }

  const result = [root.val];
  result.push(...preorderTraversal(root.left));
  result.push(...preorderTraversal(root.right));

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack đệ quy có độ sâu bằng chiều cao cây + result array

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tận dụng tính chất đệ quy tự nhiên của cây

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với cây rất sâu
- Tốn bộ nhớ cho stack đệ quy

---

## 🚀 Giải pháp 2: Iterative with Stack (Cải tiến) / Iterative Stack Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Đệ quy có thể gây stack overflow với cây rất sâu
- Điểm yếu của giải pháp 1? Dùng đệ quy, phụ thuộc vào stack size
- Cách tiếp cận mới? Dùng stack để mô phỏng đệ quy

### Ý tưởng / Idea

Dùng stack để duyệt cây theo preorder. Push root vào stack, sau đó pop và push right, left.

### Thuật toán / Algorithm

1. Nếu root = null, trả về []
2. Tạo result = []
3. Tạo stack = [root]
4. Trong khi stack.length > 0:
   - Pop node ra khỏi stack
   - Thêm node.val vào result
   - Push node.right vào stack (nếu có)
   - Push node.left vào stack (nếu có)
5. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Preorder Traversal - Iterative Stack Solution
 * @param {TreeNode} root
 * @return {number[]}
 */
function preorderTraversal_Iterative(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Push right trước (để left được xử lý trước)
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack có thể chứa tối đa n node + result array

### Ưu điểm / Pros

- Không gây stack overflow
- Có thể kiểm soát stack size

### Nhược điểm / Cons

- Code phức tạp hơn đệ quy
- Khó hiểu hơn

---

## ⚡ Giải pháp 3: Morris Traversal (Nâng cao) / Morris Traversal Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Morris Traversal
- Có thuật toán/pattern nào phù hợp hơn? Dùng thread binary tree

### Ý tưởng / Idea

Dùng Morris Traversal để duyệt cây với O(1) space bằng cách tạo temporary links.

### Thuật toán / Algorithm

1. Tạo result = []
2. Tạo current = root
3. Trong khi current != null:
   - Nếu current.left = null:
     - Thêm current.val vào result
     - current = current.right
   - Nếu không:
     - Tìm predecessor của current (node phải nhất của left subtree)
     - Nếu predecessor.right = null:
       - Thêm current.val vào result
       - predecessor.right = current
       - current = current.left
     - Nếu không:
       - current = current.right
4. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Preorder Traversal - Morris Traversal Solution
 * @param {TreeNode} root
 * @return {number[]}
 */
function preorderTraversal_Morris(root) {
  const result = [];
  let current = root;

  while (current) {
    if (!current.left) {
      // Không có cây con trái, thăm node hiện tại
      result.push(current.val);
      current = current.right;
    } else {
      // Tìm predecessor
      let predecessor = current.left;
      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (!predecessor.right) {
        // Thăm node hiện tại
        result.push(current.val);
        predecessor.right = current;
        current = current.left;
      } else {
        // Đã thăm, break temporary link
        current = current.right;
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt tối đa 2 lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Độ phức tạp bộ nhớ O(1)
- Không gây stack overflow

### Nhược điểm / Cons

- Code rất phức tạp
- Thay đổi cấu trúc cây (tạo temporary links)
- Khó hiểu

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use        |
| -------------------- | ---- | ----- | ------------------- | --------------------------------- |
| Recursive            | O(n) | O(n)  | Dễ / Easy           | Cây không quá sâu, code ngắn      |
| Iterative Stack      | O(n) | O(n)  | Trung bình / Medium | Cây rất sâu, tránh stack overflow |
| Morris Traversal     | O(n) | O(1)  | Khó / Hard          | Cần tối ưu bộ nhớ tuyệt đối       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Input: [1,null,2,3]
const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.right = new TreeNode(3);

console.log(preorderTraversal(root)); // Expected: [1,2,3]
console.log(preorderTraversal_Iterative(root)); // Expected: [1,2,3]
console.log(preorderTraversal_Morris(root)); // Expected: [1,2,3]
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
console.log(preorderTraversal(null)); // Expected: []
console.log(preorderTraversal_Iterative(null)); // Expected: []
console.log(preorderTraversal_Morris(null)); // Expected: []
```

### Test Case 3: Chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(preorderTraversal(root)); // Expected: [1]
console.log(preorderTraversal_Iterative(root)); // Expected: [1]
console.log(preorderTraversal_Morris(root)); // Expected: [1]
```

### Test Case 4: Cây đầy đủ / Full Tree

```javascript
// Input: [1,2,3,4,5,6,7]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log(preorderTraversal(root)); // Expected: [1,2,4,5,3,6,7]
console.log(preorderTraversal_Iterative(root)); // Expected: [1,2,4,5,3,6,7]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Stack](../algorithms/data-structures/stack.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Bài toán liên quan:**
  - [Binary Tree Inorder Traversal (Problem 94)](./094-binary-tree-inorder-traversal.md)
  - [Binary Tree Postorder Traversal (Problem 145)](./145-binary-tree-postorder-traversal.md)

---

## 💬 Lời khuyên / Tips

- **Preorder Traversal:**
  - Root → Left → Right
  - Thăm root trước, sau đó đệ quy left, rồi right
- **Iterative Stack:**
  - Push root vào stack
  - Pop node, thăm node.val
  - Push right trước (để left được xử lý trước)
  - Push left sau
- **Lỗi thường gặp:**
  - Quên base case (root = null)
  - Với đệ quy, quên push kết quả đệ quy vào result
  - Với iterative, sai thứ tự push (để left được xử lý trước)

---

_Last updated: 2026-02-03_
