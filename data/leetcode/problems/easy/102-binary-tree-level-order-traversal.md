# Binary Tree Level Order Traversal

> LeetCode Problem 102 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 102
- **URL:** https://leetcode.com/problems/binary-tree-level-order-traversal/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Queue
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1:**

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân
- **Output:** Mảng 2 chiều chứa giá trị các node theo từng level
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 2000
  - Giá trị node từ -1000 đến 1000
- **Edge cases:**
  - Cây rỗng (root = null)
  - Cây chỉ có 1 node
  - Cây không cân bằng
  - Cây đầy đủ

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần duyệt cây theo từng level, từ trên xuống dưới, từ trái sang phải
- **Bước 2:** Có thể dùng BFS (Breadth-First Search) với Queue để duyệt từng level
- **Bước 3:** Với mỗi level, lưu giá trị các node rồi thêm vào kết quả

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: root = [3,9,20,null,null,15,7]
      3
     / \
    9  20
      /  \
     15   7

Giải thích:
- Level 0: [3]
- Level 1: [9, 20]
- Level 2: [15, 7]
Output: [[3],[9,20],[15,7]]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng BFS với Queue để duyệt cây theo từng level. Với mỗi level, lưu số lượng node ở level đó, sau đó duyệt qua và lấy giá trị.

### Thuật toán / Algorithm

1. Nếu root = null, trả về mảng rỗng
2. Tạo Queue và thêm root vào
3. Trong khi Queue không rỗng:
   - Lấy số lượng node ở level hiện tại
   - Tạo mảng levelValues để lưu giá trị
   - Duyệt qua từng node ở level hiện tại:
     - Lấy node ra khỏi Queue
     - Thêm giá trị vào levelValues
     - Thêm node con trái (nếu có) vào Queue
     - Thêm node con phải (nếu có) vào Queue
   - Thêm levelValues vào kết quả
4. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Binary Tree Level Order Traversal - BFS Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelValues.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    result.push(levelValues);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Queue có thể chứa tối đa n/2 node ở level rộng nhất

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tự nhiên duyệt theo level
- Hiệu quả với cây cân bằng

### Nhược điểm / Cons

- Dùng nhiều bộ nhớ cho Queue
- Không tận dụng được tính chất đệ quy

---

## 🚀 Giải pháp 2: DFS (Depth-First Search) / DFS Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? BFS dùng nhiều bộ nhớ cho Queue
- Điểm yếu của giải pháp 1? Với cây sâu, Queue có thể lớn
- Cách tiếp cận mới? Dùng DFS với level tracking

### Ý tưởng / Idea

Dùng DFS để duyệt cây, nhưng theo dõi level của mỗi node. Khi đến node, thêm giá trị vào mảng tương ứng với level.

### Thuật toán / Algorithm

1. Tạo mảng result để lưu kết quả
2. Định nghĩa hàm DFS(node, level):
   - Nếu node = null, return
   - Nếu level >= result.length, tạo mảng mới cho level này
   - Thêm node.val vào result[level]
   - Gọi đệ quy cho node.left với level + 1
   - Gọi đệ quy cho node.right với level + 1
3. Gọi DFS(root, 0)
4. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Level Order Traversal - DFS Solution
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder_DFS(root) {
  const result = [];

  function dfs(node, level) {
    if (!node) {
      return;
    }

    // Tạo mảng mới cho level này nếu chưa có
    if (level >= result.length) {
      result[level] = [];
    }

    // Thêm giá trị node vào level tương ứng
    result[level].push(node.val);

    // Duyệt các node con
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(h) - Stack đệ quy có độ sâu bằng chiều cao cây (h)
  - Tốt nhất: O(log n) cho cây cân bằng
  - Xấu nhất: O(n) cho cây lệch

### Ưu điểm / Pros

- Tiết kiệm bộ nhớ hơn BFS với cây sâu
- Code ngắn gọn, sử dụng đệ quy tự nhiên
- Không cần cấu trúc Queue

### Nhược điểm / Cons

- Có thể gây stack overflow với cây rất sâu
- Khó hiểu hơn so với BFS cho người mới
- Đệ quy có thể chậm hơn iteration trong một số trường hợp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| BFS (Queue)          | O(n) | O(n)  | Dễ / Easy           | Cây cân bằng, cần rõ ràng  |
| DFS (Recursive)      | O(n) | O(h)  | Trung bình / Medium | Cây sâu, tiết kiệm bộ nhớ  |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Input: [3,9,20,null,null,15,7]
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(levelOrder(root)); // Expected: [[3],[9,20],[15,7]]
console.log(levelOrder_DFS(root)); // Expected: [[3],[9,20],[15,7]]
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
console.log(levelOrder(null)); // Expected: []
console.log(levelOrder_DFS(null)); // Expected: []
```

### Test Case 3: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(levelOrder(root)); // Expected: [[1]]
console.log(levelOrder_DFS(root)); // Expected: [[1]]
```

### Test Case 4: Cây lệch / Skewed Tree

```javascript
// Input: [1,2,null,3,null,4]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.left.left = new TreeNode(4);

console.log(levelOrder(root)); // Expected: [[1],[2],[3],[4]]
console.log(levelOrder_DFS(root)); // Expected: [[1],[2],[3],[4]]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Queue](../algorithms/data-structures/queue.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- **BFS vs DFS:** BFS tự nhiên hơn cho bài toán level order, nhưng DFS tiết kiệm bộ nhớ hơn với cây sâu
- **Level tracking:** Khi dùng DFS, luôn theo dõi level để biết vị trí trong mảng kết quả
- **Edge case:** Luôn kiểm tra root = null trước khi bắt đầu
- **Lỗi thường gặp:**
  - Quên kiểm tra node.left/node.right = null trước khi thêm vào Queue
  - Với DFS, quên tạo mảng mới cho level mới
  - Sử dụng queue.shift() nhiều lần có thể chậm, có thể dùng index để tối ưu

---

_Last updated: 2026-02-03_
