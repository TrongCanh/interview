# Symmetric Tree / Cây đối xứng

> LeetCode 101 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 101
- **URL:** https://leetcode.com/problems/symmetric-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, DFS, BFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

**Example 1:**

```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

**Example 2:**

```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

**Constraints:**

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`

**Follow up:** Could you solve it both recursively and iteratively?

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của một binary tree
- **Output:** True nếu cây đối xứng, ngược lại False
- **Ràng buộc / Constraints:**
  - Số node từ 1 đến 1000
  - Giá trị node từ -100 đến 100
- **Edge cases:**
  - Cây chỉ có root (đối xứng)
  - Cây không cân bằng
  - Cây có giá trị khác nhau ở các vị trí đối xứng

### 2. Tư duy / Thinking Process

- Bước 1: Cây đối xứng nếu cây con trái của root giống cây con phải của root khi đảo ngược
- Bước 2: Có thể dùng Recursion: so sánh node trái của cây con trái với node phải của cây con phải
- Bước 3: Có thể dùng Iterative với Queue: so sánh các cặp node theo level

### 3. Ví dụ minh họa / Examples

```
Example 1: [1,2,2,3,4,4,3]
        1
       / \
      2   2
     / \ / \
    3  4 4  3
→ Cây đối xứng → True

Example 2: [1,2,2,null,3,null,3]
        1
       / \
      2   2
       \   \
        3   3
→ Cây không đối xứng → False
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Recursion: so sánh hai cây con (trái và phải) như nhau nhưng với vị trí đảo ngược.

### Thuật toán / Algorithm

1. Nếu root là null, trả về true
2. Gọi hàm isMirror(root.left, root.right)
3. Trong hàm isMirror:
   - Nếu cả hai null, trả về true
   - Nếu một null hoặc giá trị khác nhau, trả về false
   - Trả về isMirror(left.left, right.right) && isMirror(left.right, right.left)

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
 * Symmetric Tree - Giải pháp 1: Recursive DFS (Brute Force)
 * @param {TreeNode} root - Root của binary tree
 * @return {boolean} - True nếu cây đối xứng, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(h) - stack depth, h là chiều cao của cây
 */
function isSymmetric_recursive(root) {
  function isMirror(left, right) {
    // Cả hai null
    if (left === null && right === null) {
      return true;
    }

    // Một null hoặc giá trị khác nhau
    if (left === null || right === null || left.val !== right.val) {
      return false;
    }

    // So sánh cây con trái của left với cây con phải của right
    // và cây con phải của left với cây con trái của right
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  // Cây rỗng hoặc chỉ có root
  if (root === null) {
    return true;
  }

  return isMirror(root.left, root.right);
}

// Helper function để tạo cây từ array
function createTree(arr, index = 0) {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const node = new TreeNode(arr[index]);
  node.left = createTree(arr, 2 * index + 1);
  node.right = createTree(arr, 2 * index + 2);

  return node;
}

// Test
console.log(isSymmetric_recursive(createTree([1, 2, 2, 3, 4, 4, 3]))); // true
console.log(isSymmetric_recursive(createTree([1, 2, 2, null, 3, null, 3]))); // false
console.log(isSymmetric_recursive(createTree([1]))); // true
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(h) - stack depth, h là chiều cao của cây

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Tốn bộ nhớ cho stack
- Có thể gây stack overflow với cây rất sâu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Recursion có thể gây stack overflow
- Điểm yếu của giải pháp 1? Tốn bộ nhớ cho stack
- Cách tiếp cận mới? Sử dụng Iterative với Queue (BFS)

### Ý tưởng / Idea

Sử dụng Iterative với Queue. Đẩy cặp node vào queue, sau đó dequeue và so sánh. Nếu giống nhau, enqueue các node con theo thứ tự đối xứng.

### Thuật toán / Algorithm

1. Nếu root là null, trả về true
2. Khởi tạo queue = [root.left, root.right]
3. Trong khi queue không rỗng:
   - Dequeue hai node (left, right)
   - Nếu cả hai null, tiếp tục
   - Nếu một null hoặc giá trị khác nhau, trả về false
   - Enqueue (left.left, right.right) và (left.right, right.left)
4. Trả về true

### Code / Implementation

```javascript
/**
 * Symmetric Tree - Giải pháp 2: Iterative BFS with Queue (Optimized)
 * @param {TreeNode} root - Root của binary tree
 * @return {boolean} - True nếu cây đối xứng, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(n) - queue có thể chứa tất cả node trong trường hợp xấu nhất
 */
function isSymmetric_iterativeBFS(root) {
  // Cây rỗng hoặc chỉ có root
  if (root === null) {
    return true;
  }

  const queue = [root.left, root.right];

  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();

    // Cả hai null, tiếp tục
    if (left === null && right === null) {
      continue;
    }

    // Một null hoặc giá trị khác nhau
    if (left === null || right === null || left.val !== right.val) {
      return false;
    }

    // Enqueue các node con theo thứ tự đối xứng
    queue.push(left.left);
    queue.push(right.right);
    queue.push(left.right);
    queue.push(right.left);
  }

  return true;
}

// Test
console.log(isSymmetric_iterativeBFS(createTree([1, 2, 2, 3, 4, 4, 3]))); // true
console.log(isSymmetric_iterativeBFS(createTree([1, 2, 2, null, 3, null, 3]))); // false
console.log(isSymmetric_iterativeBFS(createTree([1]))); // true
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(n) - queue có thể chứa tất cả node trong trường hợp xấu nhất

### Ưu điểm / Pros

- Không có stack overflow
- Tối ưu về space trong một số trường hợp

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với recursion
- Space có thể tốn hơn trong trường hợp xấu nhất

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng DFS với Stack thay vì BFS
- Có thuật toán/pattern nào phù hợp hơn? DFS với Stack

### Ý tưởng / Idea

Sử dụng Iterative với Stack (DFS). Đẩy cặp node vào stack, sau đó pop và so sánh. Nếu giống nhau, đẩy các node con theo thứ tự đối xứng.

### Thuật toán / Algorithm

1. Nếu root là null, trả về true
2. Khởi tạo stack = [root.left, root.right]
3. Trong khi stack không rỗng:
   - Pop hai node (left, right)
   - Nếu cả hai null, tiếp tục
   - Nếu một null hoặc giá trị khác nhau, trả về false
   - Đẩy (left.left, right.right) và (left.right, right.left) vào stack
4. Trả về true

### Code / Implementation

```javascript
/**
 * Symmetric Tree - Giải pháp 3: Iterative DFS with Stack (Advanced)
 * @param {TreeNode} root - Root của binary tree
 * @return {boolean} - True nếu cây đối xứng, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(n) - stack có thể chứa tất cả node trong trường hợp xấu nhất
 */
function isSymmetric_iterativeDFS(root) {
  // Cây rỗng hoặc chỉ có root
  if (root === null) {
    return true;
  }

  const stack = [root.left, root.right];

  while (stack.length > 0) {
    const left = stack.pop();
    const right = stack.pop();

    // Cả hai null, tiếp tục
    if (left === null && right === null) {
      continue;
    }

    // Một null hoặc giá trị khác nhau
    if (left === null || right === null || left.val !== right.val) {
      return false;
    }

    // Đẩy các node con theo thứ tự đối xứng
    stack.push(left.left);
    stack.push(right.right);
    stack.push(left.right);
    stack.push(right.left);
  }

  return true;
}

// Test
console.log(isSymmetric_iterativeDFS(createTree([1, 2, 2, 3, 4, 4, 3]))); // true
console.log(isSymmetric_iterativeDFS(createTree([1, 2, 2, null, 3, null, 3]))); // false
console.log(isSymmetric_iterativeDFS(createTree([1]))); // true
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(n) - stack có thể chứa tất cả node trong trường hợp xấu nhất

### Ưu điểm / Pros

- Không có stack overflow
- DFS đi sâu vào cây, có thể tối ưu hơn trong một số trường hợp

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với recursion
- Space có thể tốn hơn trong trường hợp xấu nhất

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use                      |
| -------------------- | ---- | ----- | ------------------- | ----------------------------------------------- |
| Recursive (DFS)      | O(n) | O(h)  | Dễ / Easy           | Code nhanh, cây không quá sâu                   |
| Iterative (BFS)      | O(n) | O(n)  | Trung bình / Medium | Cây sâu, tránh stack overflow, xử lý theo level |
| Iterative (DFS)      | O(n) | O(n)  | Trung bình / Medium | Cây sâu, tránh stack overflow, đi sâu vào cây   |

---

## 🧪 Test Cases

### Test Case 1: Cây đối xứng / Symmetric Tree

```javascript
const input1 = [1, 2, 2, 3, 4, 4, 3];
const expected1 = true;
console.log(`Input: ${JSON.stringify(input1)}`);
console.log(`Expected: ${expected1}`);
console.log(`Recursive: ${isSymmetric_recursive(createTree(input1))}`);
console.log(`Iterative BFS: ${isSymmetric_iterativeBFS(createTree(input1))}`);
console.log(`Iterative DFS: ${isSymmetric_iterativeDFS(createTree(input1))}`);
```

### Test Case 2: Cây không đối xứng / Asymmetric Tree

```javascript
const input2 = [1, 2, 2, null, 3, null, 3];
const expected2 = false;
console.log(`Input: ${JSON.stringify(input2)}`);
console.log(`Expected: ${expected2}`);
console.log(`Recursive: ${isSymmetric_recursive(createTree(input2))}`);
console.log(`Iterative BFS: ${isSymmetric_iterativeBFS(createTree(input2))}`);
console.log(`Iterative DFS: ${isSymmetric_iterativeDFS(createTree(input2))}`);
```

### Test Case 3: Chỉ có root / Only Root

```javascript
const input3 = [1];
const expected3 = true;
console.log(`Input: ${JSON.stringify(input3)}`);
console.log(`Expected: ${expected3}`);
console.log(`Recursive: ${isSymmetric_recursive(createTree(input3))}`);
console.log(`Iterative BFS: ${isSymmetric_iterativeBFS(createTree(input3))}`);
console.log(`Iterative DFS: ${isSymmetric_iterativeDFS(createTree(input3))}`);
```

### Test Case 4: Cây đối xứng với nhiều level / Multi-level Symmetric Tree

```javascript
const input4 = [1, 2, 2, 3, 4, 4, 3, 5, 6, 7, 7, 6, 5];
const expected4 = true;
console.log(`Input: ${JSON.stringify(input4)}`);
console.log(`Expected: ${expected4}`);
console.log(`Recursive: ${isSymmetric_recursive(createTree(input4))}`);
console.log(`Iterative BFS: ${isSymmetric_iterativeBFS(createTree(input4))}`);
console.log(`Iterative DFS: ${isSymmetric_iterativeDFS(createTree(input4))}`);
```

### Test Case 5: Cây lệch / Skewed Tree

```javascript
const input5 = [1, 2, 2, null, 3, null, 4];
const expected5 = false;
console.log(`Input: ${JSON.stringify(input5)}`);
console.log(`Expected: ${expected5}`);
console.log(`Recursive: ${isSymmetric_recursive(createTree(input5))}`);
console.log(`Iterative BFS: ${isSymmetric_iterativeBFS(createTree(input5))}`);
console.log(`Iterative DFS: ${isSymmetric_iterativeDFS(createTree(input5))}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Tree:** [`../../algorithms/data-structures/tree.md`](../../algorithms/data-structures/tree.md)
- **DFS:** [`../../algorithms/graph-algorithms/dfs.md`](../../algorithms/graph-algorithms/dfs.md)
- **BFS:** [`../../algorithms/graph-algorithms/bfs.md`](../../algorithms/graph-algorithms/bfs.md)

---

## 💡 Tips & Tricks

1. **Mirror Comparison:** Khi so sánh hai cây đối xứng, so sánh left.left với right.right và left.right với right.left
2. **Base Cases:** Luôn xử lý các base cases trước: cả null, một null, giá trị khác nhau
3. **Recursion vs Iterative:** Recursion code ngắn hơn nhưng có thể gây stack overflow
4. **DFS vs BFS:** DFS đi sâu vào cây, BFS xử lý theo level

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 101 - Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- [Tree Traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)

---

_Last updated: 2025-02-03_
