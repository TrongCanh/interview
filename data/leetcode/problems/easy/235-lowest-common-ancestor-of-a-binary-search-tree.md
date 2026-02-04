# Lowest Common Ancestor of a Binary Search Tree / Tổ Tiên Chung Thấp Nhất Của Cây Nhị Phân Tìm Kiếm

> LeetCode Problem 235 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 235
- **URL:** https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Binary Search Tree, Binary Tree
- **Tags:** Tree, Binary Search Tree, Depth-First Search
- **Thuật toán liên quan / Related Algorithms:** Tree, Binary Search Tree, DFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**)."

**Example 1:**

```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
```

**Example 2:**

```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
```

**Example 3:**

```
Input: root = [2,1], p = 2, q = 1
Output: 2
```

**Constraints:**

- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `p != q`
- `p` and `q` will exist in the BST.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút gốc `root` của Binary Search Tree (BST), và hai nút `p`, `q`
- **Output:** Nút LCA (Lowest Common Ancestor) của `p` và `q`
- **Ràng buộc / Constraints:**
  - Số lượng nút: 2 ≤ n ≤ 10^5
  - Giá trị nút: -10^9 ≤ Node.val ≤ 10^9
  - Tất cả giá trị là duy nhất (không trùng lặp)
  - `p != q` và cả hai đều tồn tại trong BST
- **Edge cases:**
  - `p` là tổ tiên của `q`: trả về `p`
  - `q` là tổ tiên của `p`: trả về `q`
  - `p` và `q` ở hai nhánh khác nhau của root: trả về root

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm nút thấp nhất là tổ tiên của cả `p` và `q`
- **Bước 2:** Xác định cách tiếp cận - tận dụng tính chất BST (nút trái < root < nút phải)
- **Bước 3:** Lên kế hoạch giải pháp - Iterative (O(h) time), Recursive (O(h) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8

Cây BST:
        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5

Tính chất BST:
- Nút trái < root < nút phải
- Tìm LCA:
  - root.val = 6
  - p.val = 2 < 6, q.val = 8 > 6
  - p và q nằm ở hai nhánh khác nhau → LCA = 6

Example 2: p = 2, q = 4
- root.val = 6
- p.val = 2 < 6, q.val = 4 < 6 → đi sang trái
- root.val = 2
- p.val = 2 == 2 → LCA = 2 (p là tổ tiên của q)
```

---

## 💡 Giải pháp 1: Brute Force - Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng đệ quy để tìm LCA. Tận dụng tính chất BST:

- Nếu cả `p` và `q` đều nhỏ hơn root, LCA nằm ở cây con trái
- Nếu cả `p` và `q` đều lớn hơn root, LCA nằm ở cây con phải
- Ngược lại, root chính là LCA

### Thuật toán / Algorithm

1. Nếu `root` là `null`, trả về `null`
2. Nếu cả `p.val` và `q.val` đều nhỏ hơn `root.val`:
   - Đệ quy tìm ở cây con trái
3. Nếu cả `p.val` và `q.val` đều lớn hơn `root.val`:
   - Đệ quy tìm ở cây con phải
4. Ngược lại, trả về `root` (đây là LCA)

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
 * Lowest Common Ancestor of a Binary Search Tree - Recursive Solution
 * @param {TreeNode} root - Nút gốc của BST
 * @param {TreeNode} p - Nút thứ nhất
 * @param {TreeNode} q - Nút thứ hai
 * @return {TreeNode} - Nút LCA của p và q
 */
function lowestCommonAncestor_bruteForce(root, p, q) {
  // Base case: cây rỗng
  if (root === null) {
    return null;
  }

  // Nếu cả p và q đều nhỏ hơn root, LCA nằm ở cây con trái
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor_bruteForce(root.left, p, q);
  }

  // Nếu cả p và q đều lớn hơn root, LCA nằm ở cây con phải
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor_bruteForce(root.right, p, q);
  }

  // Ngược lại, root là LCA
  return root;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(h) - h là chiều cao cây (h = log(n) cho BST cân bằng)
- **Space Complexity:** O(h) - Stack đệ quy, với h là chiều cao cây

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn
- Tận dụng tốt tính chất BST

### Nhược điểm / Cons

- Sử dụng đệ quy có thể gây stack overflow với cây sâu
- Space phụ thuộc vào chiều cao cây

---

## 🚀 Giải pháp 2: Optimized - Iterative (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp đệ quy có thể gây stack overflow với cây sâu
- Điểm yếu của giải pháp 1? Sử dụng đệ quy, space phụ thuộc chiều cao cây
- Cách tiếp cận mới? Sử dụng vòng lặp thay vì đệ quy

### Ý tưởng / Idea

Tương tự giải pháp đệ quy, nhưng sử dụng vòng lặp để tìm LCA. Điều này tránh stack overflow và giảm space complexity.

### Thuật toán / Algorithm

1. Trong khi `root` không phải là `null`:
   - Nếu cả `p.val` và `q.val` đều nhỏ hơn `root.val`:
     - Di chuyển `root` sang cây con trái
   - Nếu cả `p.val` và `q.val` đều lớn hơn `root.val`:
     - Di chuyển `root` sang cây con phải
   - Ngược lại, trả về `root` (đây là LCA)
2. Trả về `root`

### Code / Implementation

```javascript
/**
 * Lowest Common Ancestor of a Binary Search Tree - Iterative Solution
 * @param {TreeNode} root - Nút gốc của BST
 * @param {TreeNode} p - Nút thứ nhất
 * @param {TreeNode} q - Nút thứ hai
 * @return {TreeNode} - Nút LCA của p và q
 */
function lowestCommonAncestor_optimized(root, p, q) {
  let current = root;

  while (current !== null) {
    // Nếu cả p và q đều nhỏ hơn current, đi sang trái
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    }
    // Nếu cả p và q đều lớn hơn current, đi sang phải
    else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    }
    // Ngược lại, current là LCA
    else {
      return current;
    }
  }

  return current;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(h) - h là chiều cao cây (h = log(n) cho BST cân bằng)
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Không sử dụng đệ quy, tránh stack overflow
- Space complexity tối ưu O(1)
- Code rõ ràng, dễ hiểu

### Nhược điểm / Cons

- Code hơi dài hơn một chút so với đệ quy
- Cần hiểu về vòng lặp trong cây

---

## ⚡ Giải pháp 3: Advanced - Path Comparison (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể tìm đường dẫn từ root đến p và q, sau đó so sánh
- Có thuật toán/pattern nào phù hợp hơn? Path Finding

### Ý tưởng / Idea

Tìm đường dẫn từ root đến p và từ root đến q. So sánh hai đường dẫn để tìm điểm phân nhánh cuối cùng (LCA).

### Thuật toán / Algorithm

1. Tìm đường dẫn từ root đến p
2. Tìm đường dẫn từ root đến q
3. So sánh hai đường dẫn để tìm điểm phân nhánh cuối cùng
4. Trả về điểm phân nhánh đó (LCA)

### Code / Implementation

```javascript
/**
 * Lowest Common Ancestor of a Binary Search Tree - Path Comparison Solution
 * @param {TreeNode} root - Nút gốc của BST
 * @param {TreeNode} p - Nút thứ nhất
 * @param {TreeNode} q - Nút thứ hai
 * @return {TreeNode} - Nút LCA của p và q
 */
function lowestCommonAncestor_advanced(root, p, q) {
  // Tìm đường dẫn từ root đến p
  const pathToP = findPath(root, p);

  // Tìm đường dẫn từ root đến q
  const pathToQ = findPath(root, q);

  // So sánh hai đường dẫn để tìm LCA
  let lca = null;
  const minLen = Math.min(pathToP.length, pathToQ.length);

  for (let i = 0; i < minLen; i++) {
    if (pathToP[i] === pathToQ[i]) {
      lca = pathToP[i];
    } else {
      break;
    }
  }

  return lca;
}

/**
 * Tìm đường dẫn từ root đến target
 * @param {TreeNode} root - Nút gốc
 * @param {TreeNode} target - Nút cần tìm
 * @return {TreeNode[]} - Đường dẫn từ root đến target
 */
function findPath(root, target) {
  const path = [];
  let current = root;

  while (current !== null) {
    path.push(current);

    if (current.val === target.val) {
      break;
    } else if (target.val < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return path;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(h) - h là chiều cao cây
- **Space Complexity:** O(h) - Lưu trữ đường dẫn

### Ưu điểm / Pros

- Code rõ ràng, dễ hiểu
- Có thể dễ dàng mở rộng cho Binary Tree thông thường

### Nhược điểm / Cons

- Tốn O(h) bộ nhớ cho đường dẫn
- Code dài hơn các giải pháp khác
- Không tận dụng tốt tính chất BST

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use       |
| -------------------- | ---- | ----- | ------------------- | -------------------------------- |
| Recursive            | O(h) | O(h)  | Dễ / Easy           | Cây cân bằng, code đơn giản      |
| Iterative            | O(h) | O(1)  | Dễ / Easy           | Cây sâu, tránh đệ quy            |
| Path Comparison      | O(h) | O(h)  | Trung bình / Medium | Muốn mở rộng cho BT thông thường |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo cây: [6,2,8,0,4,7,9,null,null,3,5]
//        6
//       / \
//      2   8
//     / \ / \
//    0  4 7  9
//      / \
//     3   5
const root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);

const p = root.left; // 2
const q = root.right; // 8
const result = lowestCommonAncestor_bruteForce(root, p, q);
console.log(result.val === 6); // true
```

### Test Case 2: p là tổ tiên của q / p is ancestor of q

```javascript
const root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);

const p = root.left; // 2
const q = root.left.right; // 4
const result = lowestCommonAncestor_bruteForce(root, p, q);
console.log(result.val === 2); // true
```

### Test Case 3: q là tổ tiên của p / q is ancestor of p

```javascript
const root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);

const p = root.left.right; // 4
const q = root.left; // 2
const result = lowestCommonAncestor_bruteForce(root, p, q);
console.log(result.val === 2); // true
```

### Test Case 4: Cây nhỏ / Small Tree

```javascript
// Tạo cây: [2,1]
//   2
//  /
// 1
const root = new TreeNode(2);
root.left = new TreeNode(1);

const p = root; // 2
const q = root.left; // 1
const result = lowestCommonAncestor_bruteForce(root, p, q);
console.log(result.val === 2); // true
```

### Test Case 5: Giá trị âm / Negative Values

```javascript
// Tạo cây: [0,-2,4,-1,1,3,5]
//       0
//      / \
//    -2   4
//    / \  / \
//   -1 1 3  5
const root = new TreeNode(0);
root.left = new TreeNode(-2);
root.right = new TreeNode(4);
root.left.left = new TreeNode(-1);
root.left.right = new TreeNode(1);
root.right.left = new TreeNode(3);
root.right.right = new TreeNode(5);

const p = root.left.left; // -1
const q = root.right.left; // 3
const result = lowestCommonAncestor_bruteForce(root, p, q);
console.log(result.val === 0); // true
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

1. **Binary Search Tree (BST) Property:**
   - Nút trái < root < nút phải
   - Tính chất này giúp tìm kiếm nhanh O(log n)

2. **Lowest Common Ancestor (LCA):**
   - Là nút thấp nhất là tổ tiên của cả hai nút
   - Một nút có thể là tổ tiên của chính nó

3. **Các trường hợp LCA:**
   - p và q ở hai nhánh khác nhau: LCA là điểm phân nhánh
   - p là tổ tiên của q: LCA là p
   - q là tổ tiên của p: LCA là q

4. **Đệ quy vs Không đệ quy:**
   - Đệ quy: code ngắn gọn, dễ hiểu
   - Không đệ quy: an toàn hơn với cây sâu, space O(1)

5. **Chiều cao của BST:**
   - Cân bằng: h = log(n)
   - Lệch: h = n (trường hợp xấu nhất)

6. **Lưu ý về ràng buộc:**
   - p != q
   - Cả p và q đều tồn tại trong BST
   - Tất cả giá trị là duy nhất

---

_Last updated: 2025-02-04_
