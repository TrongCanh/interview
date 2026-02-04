# Balanced Binary Tree

> LeetCode Problem 110 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 110
- **URL:** https://leetcode.com/problems/balanced-binary-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Depth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a binary tree, determine if it is **height-balanced**.
>
> For this problem, a height-balanced binary tree is defined as:
>
> A binary tree in which the left and right subtrees of **every** node differ in height by no more than 1.

**Example 1:**

```
Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**

```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

**Example 3:**

```
Input: root = []
Output: true
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-10^4 <= Node.val <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của cây nhị phân
- **Output:** Boolean - true nếu cây cân bằng theo chiều cao, false nếu không
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 5000
  - Cây cân bằng nếu mọi node có độ sâu 2 cây con chênh lệch không quá 1
- **Edge cases:**
  - Cây rỗng (root = null) → cân bằng
  - Cây chỉ có 1 node → cân bằng
  - Cây lệch hoàn toàn
  - Cây cân bằng

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần kiểm tra độ sâu của cây con trái và phải tại mỗi node
- **Bước 2:** Nếu chênh lệch > 1, cây không cân bằng
- **Bước 3:** Áp dụng đệ quy cho từng node

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
- Node 3: left depth = 1, right depth = 2 → |1-2| = 1 ✓
- Node 9: left depth = 0, right depth = 0 → |0-0| = 0 ✓
- Node 20: left depth = 1, right depth = 1 → |1-1| = 0 ✓
- Node 15: left depth = 0, right depth = 0 → |0-0| = 0 ✓
- Node 7: left depth = 0, right depth = 0 → |0-0| = 0 ✓
Output: true
```

```
Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
        1
       / \
      2   2
     / \   \
    3   3   4
   / \
  4   4

Giải thích:
- Node 4 (trái cùng): left depth = 0, right depth = 0 → |0-0| = 0 ✓
- Node 3 (trái): left depth = 1, right depth = 0 → |1-0| = 1 ✓
- Node 2 (trái): left depth = 2, right depth = 1 → |2-1| = 1 ✓
- Node 1: left depth = 3, right depth = 2 → |3-2| = 1 ✓
- Tuy nhiên node 3 (trái) có subtree không cân bằng (node 4)
Output: false
```

---

## 💡 Giải pháp 1: Top-Down (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy top-down. Với mỗi node, tính độ sâu của cây con trái và phải, kiểm tra chênh lệch, sau đó đệ quy kiểm tra các node con.

### Thuật toán / Algorithm

1. Định nghĩa hàm height(node):
   - Nếu node = null, trả về 0
   - Trả về 1 + max(height(node.left), height(node.right))
2. Định nghĩa hàm isBalanced(node):
   - Nếu node = null, trả về true
   - Tính leftHeight = height(node.left)
   - Tính rightHeight = height(node.right)
   - Nếu |leftHeight - rightHeight| > 1, trả về false
   - Trả về isBalanced(node.left) && isBalanced(node.right)
3. Gọi isBalanced(root)
4. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Balanced Binary Tree - Top-Down Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced(root) {
  // Hàm tính độ sâu của cây
  function height(node) {
    if (!node) {
      return 0;
    }
    return 1 + Math.max(height(node.left), height(node.right));
  }

  // Hàm kiểm tra cây cân bằng
  function checkBalanced(node) {
    if (!node) {
      return true;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Kiểm tra chênh lệch độ sâu
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    // Đệ quy kiểm tra cây con trái và phải
    return checkBalanced(node.left) && checkBalanced(node.right);
  }

  return checkBalanced(root);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Mỗi node gọi height() tốn O(n), tổng O(n²)
- **Space Complexity:** O(n) - Stack đệ quy có độ sâu bằng chiều cao cây

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Code rõ ràng, trực quan

### Nhược điểm / Cons

- Độ phức tạp thời gian cao O(n²)
- Tính lại độ sâu nhiều lần

---

## 🚀 Giải pháp 2: Bottom-Up (Cải tiến) / Bottom-Up Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Top-down tính lại độ sâu nhiều lần
- Điểm yếu của giải pháp 1? Độ phức tạp O(n²) quá cao
- Cách tiếp cận mới? Dùng bottom-up, trả về độ sâu và kiểm tra cân bằng cùng lúc

### Ý tưởng / Idea

Dùng đệ quy bottom-up. Với mỗi node, trả về độ sâu nếu cây cân bằng, trả về -1 nếu không cân bằng. Như vậy chỉ cần duyệt cây 1 lần.

### Thuật toán / Algorithm

1. Định nghĩa hàm checkHeight(node):
   - Nếu node = null, trả về 0
   - Tính leftHeight = checkHeight(node.left)
     - Nếu leftHeight = -1, trả về -1 (cây con trái không cân bằng)
   - Tính rightHeight = checkHeight(node.right)
     - Nếu rightHeight = -1, trả về -1 (cây con phải không cân bằng)
   - Nếu |leftHeight - rightHeight| > 1, trả về -1
   - Trả về 1 + max(leftHeight, rightHeight)
2. Gọi checkHeight(root)
3. Trả về true nếu kết quả != -1, false nếu = -1

### Code / Implementation

```javascript
/**
 * Balanced Binary Tree - Bottom-Up Solution
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced_BottomUp(root) {
  // Hàm trả về độ sâu nếu cân bằng, -1 nếu không cân bằng
  function checkHeight(node) {
    if (!node) {
      return 0;
    }

    // Kiểm tra cây con trái
    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) {
      return -1; // Cây con trái không cân bằng
    }

    // Kiểm tra cây con phải
    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) {
      return -1; // Cây con phải không cân bằng
    }

    // Kiểm tra chênh lệch độ sâu
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1; // Cây hiện tại không cân bằng
    }

    // Trả về độ sâu của cây hiện tại
    return 1 + Math.max(leftHeight, rightHeight);
  }

  return checkHeight(root) !== -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack đệ quy có độ sâu bằng chiều cao cây

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Chỉ duyệt cây 1 lần
- Không tính lại độ sâu

### Nhược điểm / Cons

- Code phức tạp hơn một chút
- Khó hiểu hơn cho người mới

---

## ⚡ Giải pháp 3: Iterative with DFS (Nâng cao) / Iterative DFS Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng DFS với stack để tránh đệ quy
- Có thuật toán/pattern nào phù hợp hơn? DFS iterative với post-order traversal

### Ý tưởng / Idea

Dùng DFS với stack để duyệt cây theo post-order. Lưu trạng thái (node, visited, leftHeight, rightHeight) để tính độ sâu.

### Thuật toán / Algorithm

1. Nếu root = null, trả về true
2. Tạo stack với các phần tử [node, visited, leftHeight, rightHeight]
3. Tạo Map để lưu độ sâu của từng node
4. Trong khi stack không rỗng:
   - Lấy [node, visited, leftHeight, rightHeight] ra khỏi stack
   - Nếu node = null, tiếp tục
   - Nếu chưa visited:
     - Đánh dấu visited = true
     - Đẩy lại vào stack với visited = true
     - Đẩy node.right vào stack
     - Đẩy node.left vào stack
   - Nếu đã visited:
     - Lấy leftHeight và rightHeight từ Map
     - Nếu |leftHeight - rightHeight| > 1, trả về false
     - Lưu độ sâu vào Map: 1 + max(leftHeight, rightHeight)
5. Trả về true

### Code / Implementation

```javascript
/**
 * Balanced Binary Tree - Iterative DFS Solution
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced_Iterative(root) {
  if (!root) {
    return true;
  }

  // Stack lưu: [node, visited]
  const stack = [[root, false]];
  // Map lưu độ sâu của từng node
  const heightMap = new Map();

  while (stack.length > 0) {
    const [node, visited] = stack.pop();

    if (!node) {
      continue;
    }

    if (visited) {
      // Đã duyệt xong cây con, tính độ sâu
      const leftHeight = heightMap.get(node.left) || 0;
      const rightHeight = heightMap.get(node.right) || 0;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      heightMap.set(node, 1 + Math.max(leftHeight, rightHeight));
    } else {
      // Post-order: right, left, current
      stack.push([node, true]);
      stack.push([node.right, false]);
      stack.push([node.left, false]);
    }
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack và Map có thể chứa tối đa n phần tử

### Ưu điểm / Pros

- Không gây stack overflow
- Độ phức tạp thời gian O(n)

### Nhược điểm / Cons

- Code phức tạp nhất
- Khó hiểu
- Tốn nhiều bộ nhớ hơn cho Map

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Top-Down             | O(n²) | O(n)  | Dễ / Easy           | Cây nhỏ, code dễ hiểu      |
| Bottom-Up            | O(n)  | O(n)  | Trung bình / Medium | Tối ưu, nên dùng           |
| Iterative DFS        | O(n)  | O(n)  | Khó / Hard          | Tránh stack overflow       |

---

## 🧪 Test Cases

### Test Case 1: Cây cân bằng / Balanced Tree

```javascript
// Input: [3,9,20,null,null,15,7]
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(isBalanced(root)); // Expected: true
console.log(isBalanced_BottomUp(root)); // Expected: true
console.log(isBalanced_Iterative(root)); // Expected: true
```

### Test Case 2: Cây không cân bằng / Unbalanced Tree

```javascript
// Input: [1,2,2,3,3,null,null,4,4]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(3);
root.left.left.left = new TreeNode(4);
root.left.left.right = new TreeNode(4);

console.log(isBalanced(root)); // Expected: false
console.log(isBalanced_BottomUp(root)); // Expected: false
console.log(isBalanced_Iterative(root)); // Expected: false
```

### Test Case 3: Cây rỗng / Empty Tree

```javascript
console.log(isBalanced(null)); // Expected: true
console.log(isBalanced_BottomUp(null)); // Expected: true
console.log(isBalanced_Iterative(null)); // Expected: true
```

### Test Case 4: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(isBalanced(root)); // Expected: true
console.log(isBalanced_BottomUp(root)); // Expected: true
console.log(isBalanced_Iterative(root)); // Expected: true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- **Top-Down vs Bottom-Up:**
  - Top-down: Dễ hiểu nhưng O(n²)
  - Bottom-up: Tối ưu O(n), nên dùng
- **Early termination:** Với bottom-up, trả về -1 ngay khi phát hiện không cân bằng để tránh tính thừa
- **Lỗi thường gặp:**
  - Với top-down, không nhận ra độ phức tạp O(n²)
  - Quên base case (node = null)
  - Với bottom-up, quên trả về -1 khi phát hiện không cân bằng
  - Sai công thức tính độ sâu

---

_Last updated: 2026-02-03_
