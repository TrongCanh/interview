# Path Sum

> LeetCode Problem 112 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 112
- **URL:** https://leetcode.com/problems/path-sum/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.
>
> A **leaf** is a node with no children.

**Example 1:**

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown in the following figure.
```

**Example 2:**

```
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
```

**Example 3:**

```
Input: root = [], targetSum = 0
Output: false
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân và targetSum
- **Output:** Boolean - true nếu có đường từ root đến leaf có tổng bằng targetSum
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 5000
  - Leaf là node không có con
  - Chỉ tính đường từ root đến leaf
- **Edge cases:**
  - Cây rỗng (root = null) → false
  - Cây chỉ có 1 node
  - targetSum = 0
  - Node có giá trị âm

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần duyệt từ root đến từng leaf node
- **Bước 2:** Tính tổng giá trị trên đường đi
- **Bước 3:** Kiểm tra tổng có bằng targetSum không

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
        5
       / \
      4   8
     /   / \
    11  13  4
   /  \      \
  7    2      1

Giải thích:
- Path 1: 5 → 4 → 11 → 7 → sum = 27
- Path 2: 5 → 4 → 11 → 2 → sum = 22 ✓
- Path 3: 5 → 8 → 13 → sum = 26
- Path 4: 5 → 8 → 4 → 1 → sum = 18
Output: true
```

---

## 💡 Giải pháp 1: DFS Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy DFS. Tại mỗi node, trừ giá trị node khỏi targetSum. Khi đến leaf node, kiểm tra targetSum còn lại có bằng 0 không.

### Thuật toán / Algorithm

1. Nếu root = null, trả về false
2. Nếu root là leaf (không có con trái và phải):
   - Trả về targetSum === root.val
3. Trả về hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)

### Code / Implementation

```javascript
/**
 * Path Sum - DFS Recursive Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  // Base case: cây rỗng
  if (!root) {
    return false;
  }

  // Nếu là leaf node, kiểm tra tổng
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  // Đệ quy kiểm tra cây con trái và phải
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(h) - Stack đệ quy có độ sâu bằng chiều cao cây
  - Tốt nhất: O(log n) cho cây cân bằng
  - Xấu nhất: O(n) cho cây lệch

### Ưu điểm / Pros

- Code ngắn gọn, dễ hiểu
- Tận dụng tính chất đệ quy tự nhiên của cây
- Không cần cấu trúc dữ liệu bổ sung

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với cây rất sâu
- Tốn bộ nhớ cho stack đệ quy

---

## 🚀 Giải pháp 2: BFS Iterative (Cải tiến) / BFS Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? DFS có thể gây stack overflow với cây rất sâu
- Điểm yếu của giải pháp 1? Dùng đệ quy, phụ thuộc vào stack size
- Cách tiếp cận mới? Dùng BFS với queue để lưu node và sum hiện tại

### Ý tưởng / Idea

Dùng BFS để duyệt cây theo từng level. Với mỗi node, lưu tổng giá trị từ root đến node đó. Khi gặp leaf node, kiểm tra tổng có bằng targetSum không.

### Thuật toán / Algorithm

1. Nếu root = null, trả về false
2. Tạo Queue, thêm [root, root.val] vào
3. Trong khi Queue không rỗng:
   - Lấy [node, currentSum] ra khỏi Queue
   - Nếu node là leaf (không có con trái và phải):
     - Nếu currentSum === targetSum, trả về true
   - Thêm [node.left, currentSum + node.left.val] vào Queue (nếu có)
   - Thêm [node.right, currentSum + node.right.val] vào Queue (nếu có)
4. Trả về false

### Code / Implementation

```javascript
/**
 * Path Sum - BFS Iterative Solution
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum_BFS(root, targetSum) {
  if (!root) {
    return false;
  }

  // Queue lưu: [node, currentSum]
  const queue = [[root, root.val]];

  while (queue.length > 0) {
    const [node, currentSum] = queue.shift();

    // Nếu là leaf node, kiểm tra tổng
    if (!node.left && !node.right) {
      if (currentSum === targetSum) {
        return true;
      }
      continue;
    }

    // Thêm node con vào queue với tổng mới
    if (node.left) {
      queue.push([node.left, currentSum + node.left.val]);
    }
    if (node.right) {
      queue.push([node.right, currentSum + node.right.val]);
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Queue có thể chứa tối đa n/2 node ở level rộng nhất

### Ưu điểm / Pros

- Không gây stack overflow
- Tìm leaf node nhanh hơn DFS
- Dễ hiểu, tự nhiên duyệt theo level

### Nhược điểm / Cons

- Dùng nhiều bộ nhớ cho Queue với cây rộng
- Code dài hơn so với DFS đệ quy

---

## ⚡ Giải pháp 3: DFS Iterative (Nâng cao) / DFS Iterative Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng DFS với stack thay vì đệ quy
- Có thuật toán/pattern nào phù hợp hơn? DFS iterative tránh stack overflow

### Ý tưởng / Idea

Dùng DFS với stack để duyệt cây, lưu node và sum hiện tại. Khi đến leaf node, kiểm tra tổng.

### Thuật toán / Algorithm

1. Nếu root = null, trả về false
2. Tạo stack với các cặp [node, currentSum], thêm [root, root.val]
3. Trong khi stack không rỗng:
   - Lấy [node, currentSum] ra khỏi stack
   - Nếu node là leaf (không có con trái và phải):
     - Nếu currentSum === targetSum, trả về true
   - Thêm [node.right, currentSum + node.right.val] vào stack (nếu có)
   - Thêm [node.left, currentSum + node.left.val] vào stack (nếu có)
4. Trả về false

### Code / Implementation

```javascript
/**
 * Path Sum - DFS Iterative Solution
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum_DFS_Iterative(root, targetSum) {
  if (!root) {
    return false;
  }

  // Stack lưu: [node, currentSum]
  const stack = [[root, root.val]];

  while (stack.length > 0) {
    const [node, currentSum] = stack.pop();

    // Nếu là leaf node, kiểm tra tổng
    if (!node.left && !node.right) {
      if (currentSum === targetSum) {
        return true;
      }
      continue;
    }

    // Thêm node con vào stack với tổng mới
    if (node.right) {
      stack.push([node.right, currentSum + node.right.val]);
    }
    if (node.left) {
      stack.push([node.left, currentSum + node.left.val]);
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack có thể chứa tối đa n node

### Ưu điểm / Pros

- Không gây stack overflow như đệ quy
- Có thể kiểm soát stack size
- Tiết kiệm bộ nhớ hơn BFS với cây sâu

### Nhược điểm / Cons

- Code phức tạp hơn DFS đệ quy
- Khó hiểu hơn so với các giải pháp khác

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use        |
| -------------------- | ---- | ----- | ------------------- | --------------------------------- |
| DFS Recursive        | O(n) | O(h)  | Dễ / Easy           | Cây không quá sâu, code ngắn      |
| BFS Iterative        | O(n) | O(n)  | Trung bình / Medium | Cây rất sâu, tránh stack overflow |
| DFS Iterative        | O(n) | O(n)  | Khó / Hard          | Cây sâu, cần tiết kiệm bộ nhớ     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Input: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
const root = new TreeNode(5);
root.left = new TreeNode(4);
root.right = new TreeNode(8);
root.left.left = new TreeNode(11);
root.left.left.left = new TreeNode(7);
root.left.left.right = new TreeNode(2);
root.right.left = new TreeNode(13);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(1);

console.log(hasPathSum(root, 22)); // Expected: true
console.log(hasPathSum_BFS(root, 22)); // Expected: true
console.log(hasPathSum_DFS_Iterative(root, 22)); // Expected: true
```

### Test Case 2: Không có path / No Path

```javascript
// Input: [1,2,3], targetSum = 5
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);

console.log(hasPathSum(root, 5)); // Expected: false
console.log(hasPathSum_BFS(root, 5)); // Expected: false
console.log(hasPathSum_DFS_Iterative(root, 5)); // Expected: false
```

### Test Case 3: Cây rỗng / Empty Tree

```javascript
console.log(hasPathSum(null, 0)); // Expected: false
console.log(hasPathSum_BFS(null, 0)); // Expected: false
console.log(hasPathSum_DFS_Iterative(null, 0)); // Expected: false
```

### Test Case 4: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(5);
console.log(hasPathSum(root, 5)); // Expected: true
console.log(hasPathSum_BFS(root, 5)); // Expected: true
console.log(hasPathSum_DFS_Iterative(root, 5)); // Expected: true
```

### Test Case 5: Node có giá trị âm / Negative Values

```javascript
// Input: [-2,null,-3], targetSum = -5
const root = new TreeNode(-2);
root.right = new TreeNode(-3);

console.log(hasPathSum(root, -5)); // Expected: true
console.log(hasPathSum_BFS(root, -5)); // Expected: true
console.log(hasPathSum_DFS_Iterative(root, -5)); // Expected: true
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

- **Leaf node:** Leaf node là node không có con trái VÀ không có con phải
- **Subtract vs Add:**
  - Cách 1: Trừ giá trị node khỏi targetSum (như giải pháp 1)
  - Cách 2: Cộng giá trị node vào currentSum (như giải pháp 2, 3)
- **Lỗi thường gặp:**
  - Quên kiểm tra node.left/node.right = null trước khi truy cập
  - Với đệ quy, quên base case (root = null)
  - Quên chỉ tính path đến leaf node
  - Sai công thức tính tổng

---

_Last updated: 2026-02-03_
