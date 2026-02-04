# Count Complete Tree Nodes / Đếm Số Nút Cây Đầy Đủ

> LeetCode Problem 222 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 222
- **URL:** https://leetcode.com/problems/count-complete-tree-nodes/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Binary Tree
- **Tags:** Tree, Binary Tree, Depth-First Search, Breadth-First Search, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Recursion, Binary Search, DFS, BFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `root` of a **complete** binary tree, return the number of the nodes in the tree.

A **complete binary tree** is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

**Example 1:**

```
Input: root = [1,2,3,4,5,6]
Output: 6
Explanation:
    1
   / \
  2   3
 / \  /
4  5 6
```

**Example 2:**

```
Input: root = []
Output: 0
```

**Example 3:**

```
Input: root = [1]
Output: 1
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 5 * 10^4]`.
- `0 <= Node.val <= 5 * 10^4`
- The tree is guaranteed to be **complete**.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút gốc `root` của một cây nhị phân đầy đủ (complete binary tree)
- **Output:** Số lượng nút trong cây
- **Ràng buộc / Constraints:**
  - Số lượng nút: 0 ≤ n ≤ 5 × 10^4
  - Giá trị nút: 0 ≤ Node.val ≤ 5 × 10^4
  - Cây được đảm bảo là complete binary tree
- **Edge cases:**
  - Cây rỗng (root = null): trả về 0
  - Cây chỉ có 1 nút: trả về 1
  - Cây hoàn hảo (perfect binary tree): tất cả các level đều đầy
- **Định nghĩa Complete Binary Tree:**
  - Mọi level, trừ có thể là level cuối cùng, đều đầy
  - Tất cả nút ở level cuối cùng đều nằm ở bên trái nhất có thể

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần đếm số lượng nút trong cây nhị phân đầy đủ
- **Bước 2:** Xác định cách tiếp cận - có thể dùng DFS/BFS đếm từng nút, hoặc tận dụng tính chất của complete binary tree để tối ưu
- **Bước 3:** Lên kế hoạch giải pháp - DFS/BFS (O(n) time), Binary Search (O(log²n) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: root = [1,2,3,4,5,6]
Cây:
    1
   / \
  2   3
 / \  /
4  5 6

DFS: 1 → 2 → 4 → 5 → 3 → 6 = 6 nút
```

```
Example 2: root = []
Cây rỗng → 0 nút
```

```
Example 3: root = [1]
Cây:
  1

→ 1 nút
```

---

## 💡 Giải pháp 1: Brute Force - DFS (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Depth-First Search (DFS) để duyệt qua tất cả các nút trong cây và đếm số lượng nút.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về 0
2. Đệ quy đếm số nút ở cây con trái: `countNodes(root.left)`
3. Đệ quy đếm số nút ở cây con phải: `countNodes(root.right)`
4. Trả về tổng: `1 + countNodes(root.left) + countNodes(root.right)`

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
 * Count Complete Tree Nodes - Brute Force Solution using DFS
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {number} - Số lượng nút trong cây
 */
function countNodes_bruteForce(root) {
  // Base case: cây rỗng
  if (root === null) {
    return 0;
  }

  // Đệ quy đếm nút ở cây con trái và phải
  const leftCount = countNodes_bruteForce(root.left);
  const rightCount = countNodes_bruteForce(root.right);

  // Tổng số nút = nút hiện tại + nút trái + nút phải
  return 1 + leftCount + rightCount;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(h) - Stack đệ quy, với h là chiều cao cây (h = log(n) cho complete binary tree)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Hoạt động với mọi loại cây nhị phân
- Code ngắn gọn

### Nhược điểm / Cons

- Không tận dụng được tính chất của complete binary tree
- Duyệt qua tất cả các nút ngay cả khi không cần thiết

---

## 🚀 Giải pháp 2: Optimized - BFS (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp DFS dùng đệ quy có thể gây stack overflow với cây sâu
- Điểm yếu của giải pháp 1? Sử dụng đệ quy, không tận dụng tính chất complete binary tree
- Cách tiếp cận mới? Sử dụng BFS với queue để duyệt theo level

### Ý tưởng / Idea

Sử dụng Breadth-First Search (BFS) với queue để duyệt qua tất cả các nút theo từng level và đếm số lượng nút.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về 0
2. Tạo một queue và thêm `root` vào
3. Khởi tạo `count = 0`
4. Trong khi queue không rỗng:
   - Lấy nút ra khỏi queue
   - Tăng `count` lên 1
   - Nếu nút có con trái, thêm vào queue
   - Nếu nút có con phải, thêm vào queue
5. Trả về `count`

### Code / Implementation

```javascript
/**
 * Count Complete Tree Nodes - Optimized Solution using BFS
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {number} - Số lượng nút trong cây
 */
function countNodes_optimized(root) {
  // Base case: cây rỗng
  if (root === null) {
    return 0;
  }

  const queue = [root];
  let count = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    count++;

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return count;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(n) - Trong trường hợp xấu nhất, queue chứa n/2 nút (level cuối cùng)

### Ưu điểm / Pros

- Không sử dụng đệ quy, tránh stack overflow
- Hoạt động với mọi loại cây nhị phân
- Dễ hiểu, dễ debug

### Nhược điểm / Cons

- Không tận dụng được tính chất của complete binary tree
- Tốn O(n) bộ nhớ cho queue

---

## ⚡ Giải pháp 3: Advanced - Binary Search (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, tận dụng tính chất của complete binary tree để đạt O(log²n)
- Có thuật toán/pattern nào phù hợp hơn? Binary Search trên level cuối cùng

### Ý tưởng / Idea

Tận dụng tính chất của complete binary tree:

1. Kiểm tra xem cây có phải là perfect binary tree không (cả left depth và right depth bằng nhau)
2. Nếu là perfect, số nút = 2^h - 1
3. Nếu không phải, đệ quy đếm nút ở cây con trái và phải
4. Hoặc dùng binary search để tìm nút cuối cùng ở level cuối cùng

### Thuật toán / Algorithm

1. Định nghĩa hàm `getDepth(node)` để tính chiều sâu cây (chỉ đi theo con trái)
2. Định nghĩa hàm `exists(idx, depth, node)` để kiểm tra nút tại index idx có tồn tại không
3. Tính chiều sâu của cây
4. Dùng binary search trên level cuối cùng để tìm nút cuối cùng tồn tại
5. Tính tổng số nút = 2^depth - 1 + số nút ở level cuối cùng

### Code / Implementation

```javascript
/**
 * Count Complete Tree Nodes - Advanced Solution using Binary Search
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {number} - Số lượng nút trong cây
 */
function countNodes_advanced(root) {
  if (root === null) {
    return 0;
  }

  // Tính chiều sâu của cây (chỉ đi theo con trái)
  const depth = getDepth(root);

  // Nếu cây là perfect binary tree
  if (depth === 0) {
    return 1;
  }

  // Binary search trên level cuối cùng
  let left = 0;
  let right = Math.pow(2, depth) - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nodeExists(mid, depth, root)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Tổng số nút = nút ở các level đầy + nút ở level cuối cùng
  return Math.pow(2, depth) - 1 + left;
}

/**
 * Tính chiều sâu của cây (chỉ đi theo con trái)
 * @param {TreeNode} node - Nút cần tính chiều sâu
 * @return {number} - Chiều sâu của cây
 */
function getDepth(node) {
  let depth = 0;
  while (node.left !== null) {
    depth++;
    node = node.left;
  }
  return depth;
}

/**
 * Kiểm tra nút tại index idx có tồn tại không
 * @param {number} idx - Index của nút cần kiểm tra
 * @param {number} depth - Chiều sâu của cây
 * @param {TreeNode} node - Nút gốc
 * @return {boolean} - true nếu nút tồn tại, false nếu không
 */
function nodeExists(idx, depth, node) {
  let left = 0;
  let right = Math.pow(2, depth) - 1;

  for (let i = 0; i < depth; i++) {
    const mid = Math.floor((left + right) / 2);

    if (idx <= mid) {
      node = node.left;
      right = mid;
    } else {
      node = node.right;
      left = mid + 1;
    }
  }

  return node !== null;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log²n) - Binary search trên level cuối cùng với O(log n) bước, mỗi bước đi xuống O(log n) level
- **Space Complexity:** O(log n) - Stack đệ quy hoặc biến tạm

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(log²n)
- Tận dụng tốt tính chất của complete binary tree
- Không duyệt qua tất cả các nút

### Nhược điểm / Cons

- Code phức tạp hơn
- Chỉ hoạt động với complete binary tree
- Khó hiểu và khó debug hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space    | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | -------- | -------- | ------------------- | -------------------------- |
| Brute Force (DFS)    | O(n)     | O(h)     | Dễ / Easy           | Cây nhỏ, code đơn giản     |
| Optimized (BFS)      | O(n)     | O(n)     | Dễ / Easy           | Cây sâu, tránh đệ quy      |
| Advanced (Binary)    | O(log²n) | O(log n) | Khó / Hard          | Cây lớn, cần tối ưu time   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo cây: [1,2,3,4,5,6]
//     1
//    / \
//   2   3
//  / \  /
// 4  5 6
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

const expected = 6;
const result = countNodes_bruteForce(root);
console.log(result === expected); // true
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
const root = null;
const expected = 0;
const result = countNodes_bruteForce(root);
console.log(result === expected); // true
```

### Test Case 3: Cây 1 nút / Single Node

```javascript
const root = new TreeNode(1);
const expected = 1;
const result = countNodes_bruteForce(root);
console.log(result === expected); // true
```

### Test Case 4: Perfect Binary Tree

```javascript
// Tạo cây: [1,2,3,4,5,6,7]
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const expected = 7;
const result = countNodes_bruteForce(root);
console.log(result === expected); // true
```

### Test Case 5: Cây lớn / Large Tree

```javascript
// Tạo cây hoàn hảo với chiều sâu 10
function createPerfectTree(depth, val = 1) {
  if (depth === 0) return null;
  const node = new TreeNode(val++);
  node.left = createPerfectTree(depth - 1, val);
  node.right = createPerfectTree(depth - 1, val + Math.pow(2, depth - 2));
  return node;
}

const root = createPerfectTree(10);
const expected = Math.pow(2, 10) - 1; // 1023
const result = countNodes_advanced(root);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Recursion](../algorithms/algorithms/recursion.md)
  - [Binary Search](../algorithms/algorithms/binary-search.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Complete Binary Tree vs Perfect Binary Tree:**
   - Complete: Mọi level, trừ có thể là level cuối, đều đầy; nút level cuối nằm bên trái
   - Perfect: Tất cả các level đều đầy

2. **DFS vs BFS:**
   - DFS: Dùng đệ quy, space O(h), dễ viết
   - BFS: Dùng queue, space O(n), tránh stack overflow

3. **Binary Search Solution:**
   - Tận dụng tính chất của complete binary tree
   - Độ phức tạp O(log²n) thay vì O(n)
   - Phức tạp hơn nhưng hiệu quả hơn với cây lớn

4. **Chiều cao của Complete Binary Tree:**
   - h = ⌊log₂n⌋ + 1
   - Số nút tối đa ở level h: 2^(h-1)

5. **JavaScript Tips:**
   - Sử dụng `Math.pow(2, n)` thay vì `2 ** n` cho tương thích tốt hơn
   - Cẩn thận với stack đệ quy khi cây sâu

---

_Last updated: 2025-02-04_
