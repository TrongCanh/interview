# Binary Tree Level Order Traversal II

> LeetCode Problem 107 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 107
- **URL:** https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Queue
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the `root` of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).

**Example 1:**

```
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
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
- **Output:** Mảng 2 chiều chứa giá trị các node theo từng level, từ dưới lên trên
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 2000
  - Giá trị node từ -1000 đến 1000
- **Edge cases:**
  - Cây rỗng (root = null)
  - Cây chỉ có 1 node
  - Cây không cân bằng
  - Cây đầy đủ

### 2. Tư duy / Thinking Process

- **Bước 1:** Tương tự bài 102, nhưng kết quả cần đảo ngược
- **Bước 2:** Có thể dùng BFS rồi reverse kết quả
- **Bước 3:** Hoặc dùng DFS với level tracking, rồi reverse kết quả

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
- Đảo ngược: [[15,7],[9,20],[3]]
Output: [[15,7],[9,20],[3]]
```

---

## 💡 Giải pháp 1: BFS + Reverse (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng BFS để duyệt cây theo từng level từ trên xuống, sau đó reverse kết quả để được từ dưới lên.

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
4. Reverse kết quả
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Binary Tree Level Order Traversal II - BFS + Reverse Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrderBottom(root) {
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

  // Reverse kết quả để được từ dưới lên
  return result.reverse();
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần, reverse thêm O(n)
- **Space Complexity:** O(n) - Queue có thể chứa tối đa n/2 node ở level rộng nhất

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tận dụng giải pháp của bài 102
- Hiệu quả với cây cân bằng

### Nhược điểm / Cons

- Dùng nhiều bộ nhớ cho Queue
- Phải reverse mảng kết quả

---

## 🚀 Giải pháp 2: DFS + Reverse (Cải tiến) / DFS Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? BFS dùng nhiều bộ nhớ cho Queue
- Điểm yếu của giải pháp 1? Với cây sâu, Queue có thể lớn
- Cách tiếp cận mới? Dùng DFS với level tracking

### Ý tưởng / Idea

Dùng DFS để duyệt cây, theo dõi level của mỗi node. Sau khi hoàn thành, reverse kết quả.

### Thuật toán / Algorithm

1. Tạo mảng result để lưu kết quả
2. Định nghĩa hàm DFS(node, level):
   - Nếu node = null, return
   - Nếu level >= result.length, tạo mảng mới cho level này
   - Thêm node.val vào result[level]
   - Gọi đệ quy cho node.left với level + 1
   - Gọi đệ quy cho node.right với level + 1
3. Gọi DFS(root, 0)
4. Reverse kết quả
5. Trả về result

### Code / Implementation

```javascript
/**
 * Binary Tree Level Order Traversal II - DFS + Reverse Solution
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrderBottom_DFS(root) {
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

  // Reverse kết quả để được từ dưới lên
  return result.reverse();
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt đúng 1 lần, reverse thêm O(n)
- **Space Complexity:** O(h) - Stack đệ quy có độ sâu bằng chiều cao cây (h)
  - Tốt nhất: O(log n) cho cây cân bằng
  - Xấu nhất: O(n) cho cây lệch

### Ưu điểm / Pros

- Tiết kiệm bộ nhớ hơn BFS với cây sâu
- Code ngắn gọn, sử dụng đệ quy tự nhiên
- Không cần cấu trúc Queue

### Nhược điểm / Cons

- Có thể gây stack overflow với cây rất sâu
- Phải reverse mảng kết quả
- Khó hiểu hơn so với BFS cho người mới

---

## ⚡ Giải pháp 3: BFS với Prepend (Nâng cao) / BFS with Prepend Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể thêm vào đầu mảng thay vì reverse cuối cùng
- Có thuật toán/pattern nào phù hợp hơn? Dùng unshift để thêm vào đầu

### Ý tưởng / Idea

Dùng BFS để duyệt cây, nhưng thêm mỗi level vào đầu kết quả thay vì cuối. Như vậy không cần reverse.

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
   - Thêm levelValues vào ĐẦU kết quả (unshift)
4. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Binary Tree Level Order Traversal II - BFS with Prepend Solution
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrderBottom_Prepend(root) {
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

    // Thêm vào đầu mảng thay vì cuối
    result.unshift(levelValues);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - unshift() có độ phức tạp O(n), gọi n lần
- **Space Complexity:** O(n) - Queue có thể chứa tối đa n/2 node ở level rộng nhất

### Ưu điểm / Pros

- Không cần reverse ở cuối
- Kết quả đúng ngay khi duyệt

### Nhược điểm / Cons

- unshift() có độ phức tạp O(n), làm tổng độ phức tạp thành O(n²)
- Chậm hơn so với reverse cuối cùng

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use  |
| -------------------- | ----- | ----- | ------------------- | --------------------------- |
| BFS + Reverse        | O(n)  | O(n)  | Dễ / Easy           | Cây cân bằng, hiệu quả nhất |
| DFS + Reverse        | O(n)  | O(h)  | Trung bình / Medium | Cây sâu, tiết kiệm bộ nhớ   |
| BFS with Prepend     | O(n²) | O(n)  | Trung bình / Medium | Không nên dùng (chậm)       |

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

console.log(levelOrderBottom(root)); // Expected: [[15,7],[9,20],[3]]
console.log(levelOrderBottom_DFS(root)); // Expected: [[15,7],[9,20],[3]]
console.log(levelOrderBottom_Prepend(root)); // Expected: [[15,7],[9,20],[3]]
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
console.log(levelOrderBottom(null)); // Expected: []
console.log(levelOrderBottom_DFS(null)); // Expected: []
console.log(levelOrderBottom_Prepend(null)); // Expected: []
```

### Test Case 3: Cây chỉ có 1 node / Single Node

```javascript
const root = new TreeNode(1);
console.log(levelOrderBottom(root)); // Expected: [[1]]
console.log(levelOrderBottom_DFS(root)); // Expected: [[1]]
console.log(levelOrderBottom_Prepend(root)); // Expected: [[1]]
```

### Test Case 4: Cây lệch / Skewed Tree

```javascript
// Input: [1,2,null,3,null,4]
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.left.left = new TreeNode(4);

console.log(levelOrderBottom(root)); // Expected: [[4],[3],[2],[1]]
console.log(levelOrderBottom_DFS(root)); // Expected: [[4],[3],[2],[1]]
console.log(levelOrderBottom_Prepend(root)); // Expected: [[4],[3],[2],[1]]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Queue](../algorithms/data-structures/queue.md)

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Bài toán liên quan:**
  - [Binary Tree Level Order Traversal (Problem 102)](./102-binary-tree-level-order-traversal.md)

---

## 💬 Lời khuyên / Tips

- **Reverse vs Unshift:** Reverse cuối cùng (O(n)) nhanh hơn unshift nhiều lần (O(n²))
- **BFS vs DFS:** BFS tự nhiên hơn cho bài toán level order, nhưng DFS tiết kiệm bộ nhớ hơn với cây sâu
- **Lỗi thường gặp:**
  - Quên reverse hoặc unshift
  - Với unshift, không nhận ra độ phức tạp O(n²)
  - Quên kiểm tra node.left/node.right = null trước khi thêm vào Queue

---

_Last updated: 2026-02-03_
