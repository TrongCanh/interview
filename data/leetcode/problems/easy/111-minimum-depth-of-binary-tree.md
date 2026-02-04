# Minimum Depth of Binary Tree

> LeetCode Problem 111 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 111
- **URL:** https://leetcode.com/problems/minimum-depth-of-binary-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a binary tree, find its minimum depth.
>
> The minimum depth is the number of nodes along the **shortest path** from the root node down to the nearest leaf node.
>
> **Note:** A leaf is a node with no children.

**Example 1:**

```
Input: root = [3,9,20,null,null,15,7]
Output: 2
```

**Example 2:**

```
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^5]`.
- `-1000 <= Node.val <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân
- **Output:** Số nguyên - độ sâu tối thiểu (số node trên đường ngắn nhất từ root đến leaf)
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 10^5
  - Leaf là node không có con
- **Edge cases:**
  - Cây rỗng (root = null) → depth = 0
  - Cây chỉ có 1 node → depth = 1
  - Cây lệch hoàn toàn sang trái/phải
  - Cây có node chỉ có 1 con

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm đường ngắn nhất từ root đến leaf
- **Bước 2:** Có thể dùng DFS để tìm depth nhỏ nhất
- **Bước 3:** Hoặc dùng BFS để tìm level đầu tiên có leaf node

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
- Path 1: 3 → 9 (leaf) → depth = 2
- Path 2: 3 → 20 → 15 (leaf) → depth = 3
- Path 3: 3 → 20 → 7 (leaf) → depth = 3
- Độ sâu tối thiểu: 2
Output: 2
```

```
Example 2:
Input: root = [2,null,3,null,4,null,5,null,6]
    2
     \
      3
       \
        4
         \
          5
           \
            6

Giải thích:
- Chỉ có 1 path: 2 → 3 → 4 → 5 → 6 (leaf)
- Độ sâu: 5
Output: 5
```

---

## 💡 Giải pháp 1: DFS Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy DFS. Độ sâu tối thiểu = 1 + min(depth con trái, depth con phải). Tuy nhiên cần lưu ý: nếu một bên không có con, chỉ tính bên còn lại.

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Nếu root.left = null, trả về 1 + minDepth(root.right)
3. Nếu root.right = null, trả về 1 + minDepth(root.left)
4. Trả về 1 + min(minDepth(root.left), minDepth(root.right))

### Code / Implementation

```javascript
/**
 * Minimum Depth of Binary Tree - DFS Recursive Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {
  // Base case: cây rỗng
  if (!root) {
    return 0;
  }

  // Nếu không có con trái, chỉ tính con phải
  if (!root.left) {
    return 1 + minDepth(root.right);
  }

  // Nếu không có con phải, chỉ tính con trái
  if (!root.right) {
    return 1 + minDepth(root.left);
  }

  // Cả hai con đều có, lấy min
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
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

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với cây rất sâu
- Dùng stack cho đệ quy, tốn bộ nhớ với cây sâu

---

## 🚀 Giải pháp 2: BFS Iterative (Cải tiến) / BFS Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? DFS có thể gây stack overflow với cây rất sâu
- Điểm yếu của giải pháp 1? Dùng đệ quy, phụ thuộc vào stack size
- Cách tiếp cận mới? Dùng BFS để tìm level đầu tiên có leaf node

### Ý tưởng / Idea

Dùng BFS để duyệt cây theo từng level. Khi gặp leaf node đầu tiên, trả về depth hiện tại.

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Tạo Queue, thêm root vào
3. Khởi tạo depth = 0
4. Trong khi Queue không rỗng:
   - Tăng depth lên 1
   - Lấy số lượng node ở level hiện tại
   - Duyệt qua từng node ở level hiện tại:
     - Lấy node ra khỏi Queue
     - Nếu node là leaf (không có con trái và phải), trả về depth
     - Thêm node con trái (nếu có) vào Queue
     - Thêm node con phải (nếu có) vào Queue
5. Trả về depth

### Code / Implementation

```javascript
/**
 * Minimum Depth of Binary Tree - BFS Iterative Solution
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth_BFS(root) {
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

      // Nếu là leaf node, trả về depth hiện tại
      if (!node.left && !node.right) {
        return depth;
      }

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
- Tìm leaf node đầu tiên nhanh hơn DFS
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

Dùng DFS với stack để duyệt cây, theo dõi depth của mỗi node. Khi đến leaf node, cập nhật minDepth.

### Thuật toán / Algorithm

1. Nếu root = null, trả về 0
2. Tạo stack với các cặp [node, depth], thêm [root, 1]
3. Khởi tạo minDepth = Infinity
4. Trong khi stack không rỗng:
   - Lấy [node, depth] ra khỏi stack
   - Nếu node là leaf (không có con trái và phải), cập nhật minDepth
   - Thêm [node.right, depth + 1] vào stack (nếu có)
   - Thêm [node.left, depth + 1] vào stack (nếu có)
5. Trả về minDepth

### Code / Implementation

```javascript
/**
 * Minimum Depth of Binary Tree - DFS Iterative Solution
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth_DFS_Iterative(root) {
  if (!root) {
    return 0;
  }

  const stack = [[root, 1]];
  let minDepth = Infinity;

  while (stack.length > 0) {
    const [node, depth] = stack.pop();

    // Nếu là leaf node, cập nhật minDepth
    if (!node.left && !node.right) {
      minDepth = Math.min(minDepth, depth);
      continue;
    }

    if (node.right) {
      stack.push([node.right, depth + 1]);
    }
    if (node.left) {
      stack.push([node.left, depth + 1]);
    }
  }

  return minDepth;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack có thể chứa tối đa n node

### Ưu điểm / Pros

- Không gây stack overflow như đệ quy
- Có thể kiểm soát stack size

### Nhược điểm / Cons

- Code phức tạp hơn DFS đệ quy
- Khó hiểu hơn so với các giải pháp khác

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use       |
| -------------------- | ---- | ----- | ------------------- | -------------------------------- |
| DFS Recursive        | O(n) | O(h)  | Dễ / Easy           | Cây không quá sâu, code ngắn     |
| BFS Iterative        | O(n) | O(n)  | Trung bình / Medium | Cây rất sâu, tìm leaf nhanh nhất |
| DFS Iterative        | O(n) | O(n)  | Khó / Hard          | Cây sâu, cần tiết kiệm bộ nhớ    |

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

console.log(minDepth(root)); // Expected: 2
console.log(minDepth_BFS(root)); // Expected: 2
console.log(minDepth_DFS_Iterative(root)); // Expected: 2
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
console.log(minDepth(null)); // Expected: 0
console.log(minDepth_BFS(null)); // Expected: 0
console.log(minDepth_DFS_Iterative(null)); // Expected: 0
```

### Test Case 3: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(minDepth(root)); // Expected: 1
console.log(minDepth_BFS(root)); // Expected: 1
console.log(minDepth_DFS_Iterative(root)); // Expected: 1
```

### Test Case 4: Cây lệch / Skewed Tree

```javascript
// Input: [2,null,3,null,4,null,5,null,6]
const root = new TreeNode(2);
root.right = new TreeNode(3);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(5);
root.right.right.right.right = new TreeNode(6);

console.log(minDepth(root)); // Expected: 5
console.log(minDepth_BFS(root)); // Expected: 5
console.log(minDepth_DFS_Iterative(root)); // Expected: 5
```

### Test Case 5: Cây có node chỉ có 1 con / Node with Single Child

```javascript
// Input: [1,2]
const root = new TreeNode(1);
root.left = new TreeNode(2);

console.log(minDepth(root)); // Expected: 2
console.log(minDepth_BFS(root)); // Expected: 2
console.log(minDepth_DFS_Iterative(root)); // Expected: 2
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Queue](../algorithms/data-structures/queue.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Bài toán liên quan:**
  - [Maximum Depth of Binary Tree (Problem 104)](./104-maximum-depth-of-binary-tree.md)

---

## 💬 Lời khuyên / Tips

- **Leaf node:** Leaf node là node không có con trái VÀ không có con phải
- **DFS vs BFS:**
  - DFS đệ quy: Code ngắn nhất, dễ hiểu
  - BFS: Tìm leaf node đầu tiên nhanh nhất, tốt cho cây sâu
  - DFS iterative: Kết hợp ưu điểm của cả hai
- **Lỗi thường gặp:**
  - Quên kiểm tra node.left/node.right = null
  - Với DFS, quên xử lý trường hợp một bên không có con
  - Với BFS, quên trả về depth khi gặp leaf node
  - Nhầm lẫn giữa "node không có con" và "node là leaf"

---

_Last updated: 2026-02-03_
