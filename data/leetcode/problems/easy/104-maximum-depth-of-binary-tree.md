# Maximum Depth of Binary Tree

> LeetCode Problem 104 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 104
- **URL:** https://leetcode.com/problems/maximum-depth-of-binary-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the `root` of a binary tree, return its maximum depth.
>
> A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**

```
Input: root = [1,null,2]
Output: 2
```

**Example 3:**

```
Input: root = []
Output: 0
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân
- **Output:** Số nguyên - độ sâu tối đa của cây (số node trên đường dài nhất từ root đến leaf)
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 10^4
  - Giá trị node từ -100 đến 100
- **Edge cases:**
  - Cây rỗng (root = null) → depth = 0
  - Cây chỉ có 1 node → depth = 1
  - Cây lệch hoàn toàn sang trái/phải
  - Cây cân bằng

### 2. Tư duy / Thinking Process

- **Bước 1:** Độ sâu của cây = 1 + max(độ sâu cây con trái, độ sâu cây con phải)
- **Bước 2:** Có thể dùng DFS đệ quy để tính độ sâu từng node
- **Bước 3:** Hoặc dùng BFS để đếm số level

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
- Đường dài nhất: 3 → 20 → 15 (hoặc 3 → 20 → 7)
- Số node: 3
Output: 3
```

---

## 💡 Giải pháp 1: DFS Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy để tính độ sâu của cây. Độ sâu của node hiện tại = 1 + max(độ sâu con trái, độ sâu con phải).

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Tính độ sâu cây con trái bằng đệ quy
3. Tính độ sâu cây con phải bằng đệ quy
4. Trả về 1 + max(leftDepth, rightDepth)

### Code / Implementation

```javascript
/**
 * Maximum Depth of Binary Tree - DFS Recursive Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Base case: cây rỗng có độ sâu 0
  if (!root) {
    return 0;
  }

  // Đệ quy tính độ sâu cây con trái và phải
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // Độ sâu hiện tại = 1 + max(độ sâu con trái, độ sâu con phải)
  return 1 + Math.max(leftDepth, rightDepth);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(h) - Stack đệ quy có độ sâu bằng chiều cao cây (h)
  - Tốt nhất: O(log n) cho cây cân bằng
  - Xấu nhất: O(n) cho cây lệch

### Ưu điểm / Pros

- Code ngắn gọn, dễ hiểu
- Tận dụng tính chất đệ quy tự nhiên của cây
- Không cần cấu trúc dữ liệu bổ sung

### Nhược điểm / Cons

- Có thể gây stack overflow với cây rất sâu
- Dùng stack cho đệ quy, tốn bộ nhớ với cây sâu

---

## 🚀 Giải pháp 2: BFS Iterative (Cải tiến) / BFS Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? DFS có thể gây stack overflow với cây rất sâu
- Điểm yếu của giải pháp 1? Dùng đệ quy, phụ thuộc vào stack size
- Cách tiếp cận mới? Dùng BFS với Queue để duyệt từng level

### Ý tưởng / Idea

Dùng BFS để duyệt cây theo từng level, đếm số level duyệt được. Mỗi level tương ứng với độ sâu tăng thêm 1.

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Tạo Queue, thêm root vào
3. Khởi tạo depth = 0
4. Trong khi Queue không rỗng:
   - Tăng depth lên 1
   - Lấy số lượng node ở level hiện tại
   - Duyệt qua từng node ở level hiện tại:
     - Lấy node ra khỏi Queue
     - Thêm node con trái (nếu có) vào Queue
     - Thêm node con phải (nếu có) vào Queue
5. Trả về depth

### Code / Implementation

```javascript
/**
 * Maximum Depth of Binary Tree - BFS Iterative Solution
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth_BFS(root) {
  if (!root) {
    return 0;
  }

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return depth;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Queue có thể chứa tối đa n/2 node ở level rộng nhất

### Ưu điểm / Pros

- Không gây stack overflow
- Dễ hiểu, tự nhiên duyệt theo level
- Tốt cho cây rất sâu

### Nhược điểm / Cons

- Dùng nhiều bộ nhớ cho Queue với cây rộng
- Code dài hơn so với DFS đệ quy

---

## ⚡ Giải pháp 3: DFS Iterative (Nâng cao) / DFS Iterative Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng DFS với stack thay vì đệ quy
- Có thuật toán/pattern nào phù hợp hơn? DFS iterative tránh stack overflow

### Ý tưởng / Idea

Dùng DFS với stack để duyệt cây, theo dõi depth của mỗi node. Khi đến node, cập nhật maxDepth.

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Tạo stack với các cặp [node, depth], thêm [root, 1]
3. Khởi tạo maxDepth = 0
4. Trong khi stack không rỗng:
   - Lấy [node, depth] ra khỏi stack
   - Cập nhật maxDepth = max(maxDepth, depth)
   - Thêm [node.right, depth + 1] vào stack (trước để duyệt trái trước)
   - Thêm [node.left, depth + 1] vào stack
5. Trả về maxDepth

### Code / Implementation

```javascript
/**
 * Maximum Depth of Binary Tree - DFS Iterative Solution
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth_DFS_Iterative(root) {
  if (!root) {
    return 0;
  }

  const stack = [[root, 1]];
  let maxDepth = 0;

  while (stack.length > 0) {
    const [node, depth] = stack.pop();
    maxDepth = Math.max(maxDepth, depth);

    if (node.right) {
      stack.push([node.right, depth + 1]);
    }
    if (node.left) {
      stack.push([node.left, depth + 1]);
    }
  }

  return maxDepth;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(h) - Stack có thể chứa tối đa h node (chiều cao cây)
  - Tốt nhất: O(log n) cho cây cân bằng
  - Xấu nhất: O(n) cho cây lệch

### Ưu điểm / Pros

- Không gây stack overflow như đệ quy
- Tiết kiệm bộ nhớ hơn BFS với cây sâu
- Có thể kiểm soát stack size

### Nhược điểm / Cons

- Code phức tạp hơn DFS đệ quy
- Khó hiểu hơn so với các giải pháp khác

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use        |
| -------------------- | ---- | ----- | ------------------- | --------------------------------- |
| DFS Recursive        | O(n) | O(h)  | Dễ / Easy           | Cây không quá sâu, code ngắn      |
| BFS Iterative        | O(n) | O(n)  | Trung bình / Medium | Cây rất sâu, tránh stack overflow |
| DFS Iterative        | O(n) | O(h)  | Khó / Hard          | Cây sâu, cần tiết kiệm bộ nhớ     |

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

console.log(maxDepth(root)); // Expected: 3
console.log(maxDepth_BFS(root)); // Expected: 3
console.log(maxDepth_DFS_Iterative(root)); // Expected: 3
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
console.log(maxDepth(null)); // Expected: 0
console.log(maxDepth_BFS(null)); // Expected: 0
console.log(maxDepth_DFS_Iterative(null)); // Expected: 0
```

### Test Case 3: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(maxDepth(root)); // Expected: 1
console.log(maxDepth_BFS(root)); // Expected: 1
console.log(maxDepth_DFS_Iterative(root)); // Expected: 1
```

### Test Case 4: Cây lệch / Skewed Tree

```javascript
// Input: [1,2,null,3,null,4]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.left.left = new TreeNode(4);

console.log(maxDepth(root)); // Expected: 4
console.log(maxDepth_BFS(root)); // Expected: 4
console.log(maxDepth_DFS_Iterative(root)); // Expected: 4
```

### Test Case 5: Cây cân bằng / Balanced Tree

```javascript
// Input: [1,2,3,4,5,6,7]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log(maxDepth(root)); // Expected: 3
console.log(maxDepth_BFS(root)); // Expected: 3
console.log(maxDepth_DFS_Iterative(root)); // Expected: 3
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Queue](../algorithms/data-structures/queue.md)
  - [Stack](../algorithms/data-structures/stack.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- **DFS vs BFS:**
  - DFS đệ quy: Code ngắn nhất, dễ hiểu, nhưng có thể stack overflow
  - BFS: Tốt cho cây rất sâu, nhưng tốn bộ nhớ với cây rộng
  - DFS iterative: Kết hợp ưu điểm của cả hai, nhưng code phức tạp hơn
- **Base case:** Luôn kiểm tra root = null trước khi bắt đầu
- **Lỗi thường gặp:**
  - Quên base case (root = null)
  - Với DFS đệ quy, quên cộng 1 cho node hiện tại
  - Với BFS, quên tăng depth khi bắt đầu level mới
  - Với DFS iterative, thêm node trái/phải vào stack sai thứ tự

---

_Last updated: 2026-02-03_
