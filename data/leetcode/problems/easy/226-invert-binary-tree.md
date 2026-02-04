# Invert Binary Tree / Đảo Ngược Cây Nhị Phân

> LeetCode Problem 226 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 226
- **URL:** https://leetcode.com/problems/invert-binary-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Binary Tree
- **Tags:** Tree, Binary Tree, Depth-First Search, Breadth-First Search
- **Thuật toán liên quan / Related Algorithms:** Recursion, DFS, BFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `root` of a binary tree, invert the tree, and return its root.

**Example 1:**

```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

**Example 2:**

```
Input: root = [2,1,3]
Output: [2,3,1]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút gốc `root` của một cây nhị phân
- **Output:** Nút gốc của cây nhị phân sau khi đảo ngược (swap left và right của mỗi nút)
- **Ràng buộc / Constraints:**
  - Số lượng nút: 0 ≤ n ≤ 100
  - Giá trị nút: -100 ≤ Node.val ≤ 100
- **Edge cases:**
  - Cây rỗng (root = null): trả về null
  - Cây chỉ có 1 nút: trả về chính nút đó
  - Cây có 2 nút: swap left và right

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần đảo ngược cây nhị phân bằng cách swap left và right của mỗi nút
- **Bước 2:** Xác định cách tiếp cận - có thể dùng đệ quy (DFS) hoặc BFS
- **Bước 3:** Lên kế hoạch giải pháp - DFS đệ quy (O(n) time), BFS (O(n) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: root = [4,2,7,1,3,6,9]

Trước khi đảo:
       4
      / \
     2   7
    / \ / \
   1  3 6  9

Sau khi đảo:
       4
      / \
     7   2
    / \ / \
   9  6 3  1

Quá trình:
- nút 4: swap(2, 7) → left=7, right=2
- nút 7: swap(6, 9) → left=6, right=9
- nút 2: swap(1, 3) → left=1, right=3
```

---

## 💡 Giải pháp 1: Brute Force - Recursive DFS (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng đệ quy để duyệt qua cây. Với mỗi nút, swap left và right, sau đó đệ quy đảo ngược cây con trái và cây con phải.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về `null`
2. Swap `root.left` và `root.right`
3. Đệ quy đảo ngược cây con trái: `invertTree(root.left)`
4. Đệ quy đảo ngược cây con phải: `invertTree(root.right)`
5. Trả về `root`

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
 * Invert Binary Tree - Recursive DFS Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {TreeNode} - Nút gốc của cây đã đảo ngược
 */
function invertTree_bruteForce(root) {
  // Base case: cây rỗng
  if (root === null) {
    return null;
  }

  // Swap left và right
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Đệ quy đảo ngược cây con trái và phải
  invertTree_bruteForce(root.left);
  invertTree_bruteForce(root.right);

  return root;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(h) - Stack đệ quy, với h là chiều cao cây (h = n trong trường hợp xấu nhất, h = log(n) trong trường hợp tốt nhất)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn
- Tự nhiên với cấu trúc cây

### Nhược điểm / Cons

- Sử dụng đệ quy có thể gây stack overflow với cây sâu
- Space phụ thuộc vào chiều cao cây

---

## 🚀 Giải pháp 2: Optimized - BFS (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp đệ quy có thể gây stack overflow với cây sâu
- Điểm yếu của giải pháp 1? Sử dụng đệ quy, space phụ thuộc chiều cao cây
- Cách tiếp cận mới? Sử dụng BFS với queue để duyệt theo level

### Ý tưởng / Idea

Sử dụng Breadth-First Search (BFS) với queue để duyệt qua cây theo từng level. Với mỗi nút lấy ra khỏi queue, swap left và right, sau đó thêm cả hai con vào queue.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về `null`
2. Tạo một queue và thêm `root` vào
3. Trong khi queue không rỗng:
   - Lấy nút ra khỏi queue
   - Swap `node.left` và `node.right`
   - Nếu `node.left` không null, thêm vào queue
   - Nếu `node.right` không null, thêm vào queue
4. Trả về `root`

### Code / Implementation

```javascript
/**
 * Invert Binary Tree - BFS Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {TreeNode} - Nút gốc của cây đã đảo ngược
 */
function invertTree_optimized(root) {
  // Base case: cây rỗng
  if (root === null) {
    return null;
  }

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    // Swap left và right
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Thêm con trái và phải vào queue
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return root;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(n) - Trong trường hợp xấu nhất, queue chứa n/2 nút (level cuối cùng)

### Ưu điểm / Pros

- Không sử dụng đệ quy, tránh stack overflow
- Dễ hiểu, dễ debug
- Đảm bảo space O(n) bất kể chiều cao cây

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho queue
- Code dài hơn một chút so với đệ quy

---

## ⚡ Giải pháp 3: Advanced - Iterative DFS (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng stack để mô phỏng DFS không đệ quy
- Có thuật toán/pattern nào phù hợp hơn? Iterative DFS với stack

### Ý tưởng / Idea

Sử dụng stack để mô phỏng DFS không đệ quy. Với mỗi nút lấy ra khỏi stack, swap left và right, sau đó thêm cả hai con vào stack.

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về `null`
2. Tạo một stack và thêm `root` vào
3. Trong khi stack không rỗng:
   - Lấy nút ra khỏi stack
   - Swap `node.left` và `node.right`
   - Nếu `node.left` không null, thêm vào stack
   - Nếu `node.right` không null, thêm vào stack
4. Trả về `root`

### Code / Implementation

```javascript
/**
 * Invert Binary Tree - Iterative DFS Solution
 * @param {TreeNode} root - Nút gốc của cây nhị phân
 * @return {TreeNode} - Nút gốc của cây đã đảo ngược
 */
function invertTree_advanced(root) {
  // Base case: cây rỗng
  if (root === null) {
    return null;
  }

  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    // Swap left và right
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Thêm con trái và phải vào stack
    if (node.left !== null) {
      stack.push(node.left);
    }
    if (node.right !== null) {
      stack.push(node.right);
    }
  }

  return root;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua tất cả n nút
- **Space Complexity:** O(h) - Stack chứa tối đa h nút (h là chiều cao cây)

### Ưu điểm / Pros

- Không sử dụng đệ quy, tránh stack overflow
- Space O(h) tốt hơn BFS trong nhiều trường hợp
- Giữ nguyên thứ tự DFS

### Nhược điểm / Cons

- Code phức tạp hơn đệ quy
- Space phụ thuộc vào chiều cao cây

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use    |
| -------------------- | ---- | ----- | ------------------- | ----------------------------- |
| Recursive DFS        | O(n) | O(h)  | Dễ / Easy           | Cây cân bằng, code đơn giản   |
| BFS                  | O(n) | O(n)  | Dễ / Easy           | Cây sâu, tránh đệ quy         |
| Iterative DFS        | O(n) | O(h)  | Trung bình / Medium | Cây sâu, cần DFS không đệ quy |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo cây: [4,2,7,1,3,6,9]
//       4
//      / \
//     2   7
//    / \ / \
//   1  3 6  9
const root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(7);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(9);

const result = invertTree_bruteForce(root);
// Kết quả: [4,7,2,9,6,3,1]
console.log(result.val === 4); // true
console.log(result.left.val === 7); // true
console.log(result.right.val === 2); // true
```

### Test Case 2: Cây rỗng / Empty Tree

```javascript
const root = null;
const result = invertTree_bruteForce(root);
console.log(result === null); // true
```

### Test Case 3: Cây 1 nút / Single Node

```javascript
const root = new TreeNode(1);
const result = invertTree_bruteForce(root);
console.log(result.val === 1); // true
console.log(result.left === null); // true
console.log(result.right === null); // true
```

### Test Case 4: Cây 2 nút / Two Nodes

```javascript
// Tạo cây: [2,1,3]
//   2
//  / \
// 1   3
const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);

const result = invertTree_bruteForce(root);
// Kết quả: [2,3,1]
console.log(result.val === 2); // true
console.log(result.left.val === 3); // true
console.log(result.right.val === 1); // true
```

### Test Case 5: Cây lệch / Skewed Tree

```javascript
// Tạo cây lệch phải: [1,null,2,null,3]
// 1
//  \
//   2
//    \
//     3
const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.right = new TreeNode(3);

const result = invertTree_bruteForce(root);
// Kết quả: [1,2,null,null,null,3]
console.log(result.val === 1); // true
console.log(result.left.val === 2); // true
console.log(result.left.left.val === 3); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Invert Binary Tree là bài toán kinh điển:**
   - Được Google hỏi trong phỏng vấn (thuật ngữ "homebrew")
   - Câu nói nổi tiếng: "Our engineers are getting soft" - Max Howell (tác viên Homebrew)

2. **Các phương pháp duyệt cây:**
   - DFS (Depth-First Search): đi sâu vào một nhánh trước
   - BFS (Breadth-First Search): duyệt theo level

3. **Đệ quy vs Không đệ quy:**
   - Đệ quy: code ngắn gọn, dễ hiểu, nhưng có thể stack overflow
   - Không đệ quy: code dài hơn, nhưng an toàn hơn với cây sâu

4. **Swap trong JavaScript:**
   - Cách 1: dùng biến tạm `const temp = a; a = b; b = temp;`
   - Cách 2: destructuring `[a, b] = [b, a]`

5. **Lưu ý về Tree Traversal:**
   - Pre-order: xử lý nút hiện tại → trái → phải
   - In-order: trái → nút hiện tại → phải
   - Post-order: trái → phải → nút hiện tại
   - Level-order (BFS): duyệt theo level

---

_Last updated: 2025-02-04_
