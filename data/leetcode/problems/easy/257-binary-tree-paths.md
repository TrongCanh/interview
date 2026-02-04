# Binary Tree Paths / Các Đường Dẫn Cây Nhị Phân

> LeetCode Problem 257 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 257
- **URL:** https://leetcode.com/problems/binary-tree-paths/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Binary Tree, Depth-First Search, Backtracking
- **Tags:** Tree, Binary Tree, Depth-First Search, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Tree, DFS, Backtracking
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `root` of a binary tree, return all root-to-leaf paths in **any order**.

A **root-to-leaf path** is a sequence of nodes starting from the root node and ending at any leaf node. A **leaf node** is a node with no children.

**Example 1:**

```
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Explanation: There are two root-to-leaf paths in the binary tree:
1 -> 2 -> 5
1 -> 3
```

**Example 2:**

```
Input: root = [1]
Output: ["1"]
```

**Constraints:**

- The number of nodes in the tree is in the range `[1, 100]`.
- `-100 <= Node.val <= 100`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút gốc `root` của cây nhị phân
- **Output:** Mảng chứa tất cả đường dẫn từ root đến leaf
- **Ràng buộc / Constraints:**
  - Số lượng nút: 1 ≤ n ≤ 100
  - Giá trị nút: -100 ≤ Node.val ≤ 100
- **Edge cases:**
  - Cây chỉ có 1 nút: trả về ["root.val"]
  - Cây có 2 nút: trả về ["root.val->left.val", "root.val->right.val"]
  - Cây lệch: chỉ có 1 đường dẫn

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm tất cả đường dẫn từ root đến leaf
- **Bước 2:** Xác định cách tiếp cận - có thể dùng DFS với Backtracking
- **Bước 3:** Lên kế hoạch giải pháp - DFS (O(n) time, O(h) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: root = [1,2,3,null,5]

Cây:
    1
   / \
  2   3
   \
    5

DFS:
- Đi xuống 1 -> 2 -> 5 (leaf)
- Đi xuống 1 -> 3 (leaf)
Kết quả: ["1->2->5", "1->3"]

Example 2: root = [1]

Cây:
  1

DFS:
- Đi xuống 1 (leaf)
Kết quả: ["1"]
```

---

## 💡 Giải pháp 1: Brute Force - Recursive DFS (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng đệ quy DFS để duyệt qua cây. Khi đến leaf, thêm đường dẫn vào kết quả.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về mảng rỗng
2. Nếu `root` là leaf (không có cả left và right):
   - Trả về mảng chứa `[root.val.toString()]`
3. Ngược lại:
   - Đệ quy tìm đường dẫn ở cây con trái
   - Đệ quy tìm đường dẫn ở cây con phải
   - Kết hợp hai mảng kết quả, thêm `root.val` vào đầu mỗi đường dẫn

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
 * Binary Tree Paths - Recursive DFS Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {string[]} - Mảng chứa tất cả đường dẫn từ root đến leaf
 */
function binaryTreePaths_bruteForce(root) {
  const result = [];

  // Hàm helper để duyệt DFS
  function dfs(node, currentPath) {
    // Base case: nút null
    if (node === null) {
      return;
    }

    // Thêm giá trị nút hiện tại vào đường dẫn
    currentPath.push(node.val);

    // Nếu là leaf node, thêm đường dẫn vào kết quả
    if (node.left === null && node.right === null) {
      result.push(currentPath.join("->"));
    } else {
      // Đệ quy duyệt cây con trái và phải
      dfs(node.left, [...currentPath]);
      dfs(node.right, [...currentPath]);
    }
  }

  dfs(root, []);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(h) - Stack đệ quy, với h là chiều cao cây

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng
- Tự nhiên với cấu trúc cây

### Nhược điểm / Cons

- Tạo nhiều mảng tạm (copy currentPath)
- Sử dụng đệ quy có thể gây stack overflow với cây sâu

---

## 🚀 Giải pháp 2: Optimized - Backtracking (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force tạo nhiều mảng tạm
- Điểm yếu của giải pháp 1? Tốn nhiều bộ nhớ cho các mảng tạm
- Cách tiếp cận mới? Sử dụng Backtracking để tái sử dụng mảng

### Ý tưởng / Idea

Sử dụng Backtracking với một mảng `path` duy nhất. Khi đi xuống cây, thêm giá trị vào `path`. Khi quay lên, xóa giá trị khỏi `path`.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về mảng rỗng
2. Khởi tạo `result = []`, `path = []`
3. Định nghĩa hàm `backtrack(node)`:
   - Thêm `node.val` vào `path`
   - Nếu `node` là leaf:
     - Thêm `path.join('->')` vào `result`
   - Ngược lại:
     - Gọi `backtrack(node.left)`
     - Gọi `backtrack(node.right)`
   - Xóa `node.val` khỏi `path` (backtrack)
4. Gọi `backtrack(root)`
5. Trả về `result`

### Code / Implementation

```javascript
/**
 * Binary Tree Paths - Backtracking Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {string[]} - Mảng chứa tất cả đường dẫn từ root đến leaf
 */
function binaryTreePaths_optimized(root) {
  const result = [];
  const path = [];

  // Hàm backtracking
  function backtrack(node) {
    if (node === null) {
      return;
    }

    // Thêm giá trị nút hiện tại vào đường dẫn
    path.push(node.val);

    // Nếu là leaf node, thêm đường dẫn vào kết quả
    if (node.left === null && node.right === null) {
      result.push(path.join("->"));
    } else {
      // Đệ quy duyệt cây con trái và phải
      backtrack(node.left);
      backtrack(node.right);
    }

    // Quay lên: xóa giá trị nút hiện tại khỏi đường dẫn
    path.pop();
  }

  backtrack(root);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(h) - Stack đệ quy và path array, với h là chiều cao cây

### Ưu điểm / Pros

- Không tạo nhiều mảng tạm
- Tái sử dụng path array
- Code rõ ràng, dễ hiểu

### Nhược điểm / Cons

- Vẫn sử dụng đệ quy
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - Iterative DFS (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng BFS không đệ quy
- Có thuật toán/pattern nào phù hợp hơn? Iterative DFS với stack

### Ý tưởng / Idea

Sử dụng stack để mô phỏng DFS không đệ quy. Mỗi phần tử trong stack chứa nút và đường dẫn đến nút đó.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về mảng rỗng
2. Khởi tạo `result = []`, `stack = [{node: root, path: []}]`
3. Trong khi stack không rỗng:
   - Lấy phần tử đầu ra khỏi stack
   - Thêm `node.val` vào `path`
   - Nếu `node` là leaf:
     - Thêm `path.join('->')` vào `result`
   - Ngược lại:
     - Nếu `node.left` không null, thêm vào stack
     - Nếu `node.right` không null, thêm vào stack
4. Trả về `result`

### Code / Implementation

```javascript
/**
 * Binary Tree Paths - Iterative DFS Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {string[]} - Mảng chứa tất cả đường dẫn từ root đến leaf
 */
function binaryTreePaths_advanced(root) {
  // Edge case: cây rỗng
  if (root === null) {
    return [];
  }

  const result = [];
  const stack = [{ node: root, path: [] }];

  while (stack.length > 0) {
    const { node, path } = stack.pop();

    // Thêm giá trị nút hiện tại vào đường dẫn
    const currentPath = [...path, node.val];

    // Nếu là leaf node, thêm đường dẫn vào kết quả
    if (node.left === null && node.right === null) {
      result.push(currentPath.join("->"));
    } else {
      // Thêm cây con trái vào stack
      if (node.left !== null) {
        stack.push({ node: node.left, path: currentPath });
      }
      // Thêm cây con phải vào stack
      if (node.right !== null) {
        stack.push({ node: node.right, path: currentPath });
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(n) - Stack có thể chứa n phần tử trong trường hợp xấu nhất

### Ưu điểm / Pros

- Không sử dụng đệ quy
- Tránh stack overflow
- Code rõ ràng

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho stack
- Code phức tạp hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use  |
| -------------------- | ---- | ----- | ------------------- | --------------------------- |
| Recursive DFS        | O(n) | O(h)  | Dễ / Easy           | Cây cân bằng, code đơn giản |
| Backtracking         | O(n) | O(h)  | Trung bình / Medium | Muốn tối ưu bộ nhớ          |
| Iterative DFS        | O(n) | O(n)  | Khó / Hard          | Cây sâu, tránh đệ quy       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo cây: [1,2,3,null,5]
//    1
//   / \
//  2   3
//   \
//    5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(5);

const expected = ["1->2->5", "1->3"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result.sort()) === JSON.stringify(expected.sort())); // true
```

### Test Case 2: Cây 1 nút / Single Node

```javascript
// Tạo cây: [1]
//  1
const root = new TreeNode(1);

const expected = ["1"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 3: Cây 2 nút / Two Nodes

```javascript
// Tạo cây: [1,2,3]
//    1
//   / \
//  2   3
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);

const expected = ["1->2", "1->3"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result.sort()) === JSON.stringify(expected.sort())); // true
```

### Test Case 4: Cây lệch phải / Right Skewed Tree

```javascript
// Tạo cây: [1,null,2,null,3]
//  1
//   \
//    2
//      \
//       3
const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.right = new TreeNode(3);

const expected = ["1->2->3"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 5: Cây lệch trái / Left Skewed Tree

```javascript
// Tạo cây: [1,2,null,3,null,4]
//      1
//     /
//    2
//   /
//  3
// /
// 4
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.left.left = new TreeNode(4);

const expected = ["1->2->3->4"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 6: Giá trị âm / Negative Values

```javascript
// Tạo cây: [-1,-2,-3,-4]
//      -1
//      / \
//    -2   -3
//   /
// -4
const root = new TreeNode(-1);
root.left = new TreeNode(-2);
root.right = new TreeNode(-3);
root.left.left = new TreeNode(-4);

const expected = ["-1->-2->-4", "-1->-3"];
const result = binaryTreePaths_bruteForce(root);
console.log(JSON.stringify(result.sort()) === JSON.stringify(expected.sort())); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Recursion](../algorithms/algorithms/recursion.md)
  - [Backtracking](../algorithms/algorithms/backtracking.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Binary Tree Traversal:**
   - DFS (Depth-First Search): đi sâu vào một nhánh trước
   - BFS (Breadth-First Search): duyệt theo level

2. **Backtracking Pattern:**
   - Thêm giá trị vào path
   - Đệ quy
   - Quay lên: xóa giá trị khỏi path

3. **Recursive vs Iterative:**
   - Đệ quy: code ngắn gọn, dễ hiểu
   - Không đệ quy: an toàn hơn với cây sâu

4. **Leaf Node:**
   - Nút không có cả left và right
   - Đây là điểm kết thúc của một đường dẫn

5. **Edge Cases:**
   - Cây chỉ có 1 nút: chỉ có 1 đường dẫn
   - Cây lệch: chỉ có 1 đường dẫn

6. **Lưu ý về ràng buộc:**
   - Giá trị nút có thể âm
   - Đường dẫn có thể ở bất kỳ thứ tự
   - Không cần sắp xếp kết quả

---

_Last updated: 2025-02-04_
