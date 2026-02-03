# Same Tree / Cây giống nhau

> LeetCode 100 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 100
- **URL:** https://leetcode.com/problems/same-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, DFS, BFS
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**

```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2:**

```
Input: p = [1,2], q = [1,null,2]
Output: false
```

**Example 3:**

```
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

**Constraints:**

- The number of nodes in both trees is in the range `[0, 100]`.
- `-10^4 <= Node.val <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Root của hai binary tree p và q
- **Output:** True nếu hai cây giống nhau, ngược lại False
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 100
  - Giá trị node từ -10^4 đến 10^4
- **Edge cases:**
  - Cả hai cây rỗng (p = null, q = null)
  - Một cây rỗng, một cây không
  - Cây có cấu trúc giống nhưng giá trị khác
  - Cây có cấu trúc khác nhau

### 2. Tư duy / Thinking Process

- Bước 1: Hai cây giống nhau nếu:
  - Cả hai null → True
  - Một null, một không → False
  - Giá trị khác nhau → False
  - Cả hai không null, giá trị giống nhau → kiểm tra cây con trái và phải
- Bước 2: Có thể dùng Recursion (DFS)
- Bước 3: Có thể dùng Iterative với Stack hoặc Queue

### 3. Ví dụ minh họa / Examples

```
Example 1: p = [1,2,3], q = [1,2,3]
    1         1
   / \       / \
  2   3     2   3
→ Cả hai cây giống nhau → True

Example 2: p = [1,2], q = [1,null,2]
    1         1
   /           \
  2             2
→ Cấu trúc khác nhau → False

Example 3: p = [1,2,1], q = [1,1,2]
    1         1
   / \       / \
  2   1     1   2
→ Cấu trúc giống nhưng giá trị node khác nhau → False
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Recursion (DFS): kiểm tra node hiện tại, sau đó đệ quy kiểm tra cây con trái và phải.

### Thuật toán / Algorithm

1. Nếu cả p và q là null, trả về true
2. Nếu một trong hai null, trả về false
3. Nếu p.val !== q.val, trả về false
4. Trả về isSameTree(p.left, q.left) && isSameTree(p.right, q.right)

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
 * Same Tree - Giải pháp 1: Recursive DFS (Brute Force)
 * @param {TreeNode} p - Root của cây thứ nhất
 * @param {TreeNode} q - Root của cây thứ hai
 * @return {boolean} - True nếu hai cây giống nhau, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(h) - stack depth, h là chiều cao của cây
 */
function isSameTree_recursive(p, q) {
  // Base case: cả hai null
  if (p === null && q === null) {
    return true;
  }

  // Base case: một null, một không
  if (p === null || q === null) {
    return false;
  }

  // Base case: giá trị khác nhau
  if (p.val !== q.val) {
    return false;
  }

  // Đệ quy kiểm tra cây con trái và phải
  return (
    isSameTree_recursive(p.left, q.left) &&
    isSameTree_recursive(p.right, q.right)
  );
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
console.log(isSameTree_recursive(createTree([1, 2, 3]), createTree([1, 2, 3]))); // true
console.log(isSameTree_recursive(createTree([1, 2]), createTree([1, null, 2]))); // false
console.log(isSameTree_recursive(createTree([1, 2, 1]), createTree([1, 1, 2]))); // false
console.log(isSameTree_recursive(createTree([]), createTree([]))); // true
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
- Cách tiếp cận mới? Sử dụng Iterative với Stack (DFS)

### Ý tưởng / Idea

Sử dụng Iterative với Stack. Đẩy cặp node (p, q) vào stack, sau đó pop và so sánh. Nếu giống nhau, đẩy các node con vào stack.

### Thuật toán / Algorithm

1. Khởi tạo stack = [(p, q)]
2. Trong khi stack không rỗng:
   - Pop (node1, node2) từ stack
   - Nếu cả hai null, tiếp tục
   - Nếu một null hoặc giá trị khác nhau, trả về false
   - Đẩy (node1.left, node2.left) và (node1.right, node2.right) vào stack
3. Trả về true

### Code / Implementation

```javascript
/**
 * Same Tree - Giải pháp 2: Iterative DFS with Stack (Optimized)
 * @param {TreeNode} p - Root của cây thứ nhất
 * @param {TreeNode} q - Root của cây thứ hai
 * @return {boolean} - True nếu hai cây giống nhau, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(n) - stack có thể chứa tất cả node trong trường hợp xấu nhất
 */
function isSameTree_iterativeDFS(p, q) {
  const stack = [[p, q]];

  while (stack.length > 0) {
    const [node1, node2] = stack.pop();

    // Cả hai null, tiếp tục
    if (node1 === null && node2 === null) {
      continue;
    }

    // Một null hoặc giá trị khác nhau
    if (node1 === null || node2 === null || node1.val !== node2.val) {
      return false;
    }

    // Đẩy các node con vào stack (phải trước để trái được xử lý trước)
    stack.push([node1.right, node2.right]);
    stack.push([node1.left, node2.left]);
  }

  return true;
}

// Test
console.log(
  isSameTree_iterativeDFS(createTree([1, 2, 3]), createTree([1, 2, 3])),
); // true
console.log(
  isSameTree_iterativeDFS(createTree([1, 2]), createTree([1, null, 2])),
); // false
console.log(
  isSameTree_iterativeDFS(createTree([1, 2, 1]), createTree([1, 1, 2])),
); // false
console.log(isSameTree_iterativeDFS(createTree([]), createTree([]))); // true
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(n) - stack có thể chứa tất cả node trong trường hợp xấu nhất

### Ưu điểm / Pros

- Không có stack overflow
- Tối ưu về space trong một số trường hợp

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với recursion
- Space có thể tốn hơn trong trường hợp xấu nhất

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng BFS thay vì DFS
- Có thuật toán/pattern nào phù hợp hơn? BFS với Queue

### Ý tưởng / Idea

Sử dụng Iterative với Queue (BFS). Đẩy cặp node (p, q) vào queue, sau đó dequeue và so sánh. Nếu giống nhau, enqueue các node con.

### Thuật toán / Algorithm

1. Khởi tạo queue = [(p, q)]
2. Trong khi queue không rỗng:
   - Dequeue (node1, node2) từ queue
   - Nếu cả hai null, tiếp tục
   - Nếu một null hoặc giá trị khác nhau, trả về false
   - Enqueue (node1.left, node2.left) và (node1.right, node2.right)
3. Trả về true

### Code / Implementation

```javascript
/**
 * Same Tree - Giải pháp 3: Iterative BFS with Queue (Advanced)
 * @param {TreeNode} p - Root của cây thứ nhất
 * @param {TreeNode} q - Root của cây thứ hai
 * @return {boolean} - True nếu hai cây giống nhau, ngược lại False
 *
 * Time Complexity: O(n) - duyệt qua tất cả node
 * Space Complexity: O(n) - queue có thể chứa tất cả node trong trường hợp xấu nhất
 */
function isSameTree_iterativeBFS(p, q) {
  const queue = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift();

    // Cả hai null, tiếp tục
    if (node1 === null && node2 === null) {
      continue;
    }

    // Một null hoặc giá trị khác nhau
    if (node1 === null || node2 === null || node1.val !== node2.val) {
      return false;
    }

    // Enqueue các node con
    queue.push([node1.left, node2.left]);
    queue.push([node1.right, node2.right]);
  }

  return true;
}

// Test
console.log(
  isSameTree_iterativeBFS(createTree([1, 2, 3]), createTree([1, 2, 3])),
); // true
console.log(
  isSameTree_iterativeBFS(createTree([1, 2]), createTree([1, null, 2])),
); // false
console.log(
  isSameTree_iterativeBFS(createTree([1, 2, 1]), createTree([1, 1, 2])),
); // false
console.log(isSameTree_iterativeBFS(createTree([]), createTree([]))); // true
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua tất cả node
- **Space Complexity:** O(n) - queue có thể chứa tất cả node trong trường hợp xấu nhất

### Ưu điểm / Pros

- Không có stack overflow
- BFS xử lý theo level, hữu ích trong một số trường hợp

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với recursion
- Space có thể tốn hơn trong trường hợp xấu nhất

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use    |
| -------------------- | ---- | ----- | ------------------- | ----------------------------- |
| Recursive (DFS)      | O(n) | O(h)  | Dễ / Easy           | Code nhanh, cây không quá sâu |
| Iterative (DFS)      | O(n) | O(n)  | Trung bình / Medium | Cây sâu, tránh stack overflow |
| Iterative (BFS)      | O(n) | O(n)  | Trung bình / Medium | Cần xử lý theo level, cây sâu |

---

## 🧪 Test Cases

### Test Case 1: Cây giống nhau / Same Trees

```javascript
const input1_p = [1, 2, 3];
const input1_q = [1, 2, 3];
const expected1 = true;
console.log(
  `Input: p=${JSON.stringify(input1_p)}, q=${JSON.stringify(input1_q)}`,
);
console.log(`Expected: ${expected1}`);
console.log(
  `Recursive: ${isSameTree_recursive(createTree(input1_p), createTree(input1_q))}`,
);
console.log(
  `Iterative DFS: ${isSameTree_iterativeDFS(createTree(input1_p), createTree(input1_q))}`,
);
console.log(
  `Iterative BFS: ${isSameTree_iterativeBFS(createTree(input1_p), createTree(input1_q))}`,
);
```

### Test Case 2: Cấu trúc khác nhau / Different Structure

```javascript
const input2_p = [1, 2];
const input2_q = [1, null, 2];
const expected2 = false;
console.log(
  `Input: p=${JSON.stringify(input2_p)}, q=${JSON.stringify(input2_q)}`,
);
console.log(`Expected: ${expected2}`);
console.log(
  `Recursive: ${isSameTree_recursive(createTree(input2_p), createTree(input2_q))}`,
);
console.log(
  `Iterative DFS: ${isSameTree_iterativeDFS(createTree(input2_p), createTree(input2_q))}`,
);
console.log(
  `Iterative BFS: ${isSameTree_iterativeBFS(createTree(input2_p), createTree(input2_q))}`,
);
```

### Test Case 3: Giá trị khác nhau / Different Values

```javascript
const input3_p = [1, 2, 1];
const input3_q = [1, 1, 2];
const expected3 = false;
console.log(
  `Input: p=${JSON.stringify(input3_p)}, q=${JSON.stringify(input3_q)}`,
);
console.log(`Expected: ${expected3}`);
console.log(
  `Recursive: ${isSameTree_recursive(createTree(input3_p), createTree(input3_q))}`,
);
console.log(
  `Iterative DFS: ${isSameTree_iterativeDFS(createTree(input3_p), createTree(input3_q))}`,
);
console.log(
  `Iterative BFS: ${isSameTree_iterativeBFS(createTree(input3_p), createTree(input3_q))}`,
);
```

### Test Case 4: Cả hai cây rỗng / Both Empty

```javascript
const input4_p = [];
const input4_q = [];
const expected4 = true;
console.log(
  `Input: p=${JSON.stringify(input4_p)}, q=${JSON.stringify(input4_q)}`,
);
console.log(`Expected: ${expected4}`);
console.log(
  `Recursive: ${isSameTree_recursive(createTree(input4_p), createTree(input4_q))}`,
);
console.log(
  `Iterative DFS: ${isSameTree_iterativeDFS(createTree(input4_p), createTree(input4_q))}`,
);
console.log(
  `Iterative BFS: ${isSameTree_iterativeBFS(createTree(input4_p), createTree(input4_q))}`,
);
```

### Test Case 5: Một cây rỗng / One Empty

```javascript
const input5_p = [1, 2, 3];
const input5_q = [];
const expected5 = false;
console.log(
  `Input: p=${JSON.stringify(input5_p)}, q=${JSON.stringify(input5_q)}`,
);
console.log(`Expected: ${expected5}`);
console.log(
  `Recursive: ${isSameTree_recursive(createTree(input5_p), createTree(input5_q))}`,
);
console.log(
  `Iterative DFS: ${isSameTree_iterativeDFS(createTree(input5_p), createTree(input5_q))}`,
);
console.log(
  `Iterative BFS: ${isSameTree_iterativeBFS(createTree(input5_p), createTree(input5_q))}`,
);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Tree:** [`../../algorithms/data-structures/tree.md`](../../algorithms/data-structures/tree.md)
- **DFS:** [`../../algorithms/graph-algorithms/dfs.md`](../../algorithms/graph-algorithms/dfs.md)
- **BFS:** [`../../algorithms/graph-algorithms/bfs.md`](../../algorithms/graph-algorithms/bfs.md)

---

## 💡 Tips & Tricks

1. **Base Cases:** Luôn xử lý các base cases trước: cả null, một null, giá trị khác nhau
2. **Recursion vs Iterative:** Recursion code ngắn hơn nhưng có thể gây stack overflow
3. **DFS vs BFS:** DFS đi sâu vào cây, BFS xử lý theo level
4. **Short-circuit Evaluation:** Sử dụng && để dừng sớm khi tìm thấy sự khác biệt

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 100 - Same Tree](https://leetcode.com/problems/same-tree/)
- [Tree Traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)

---

_Last updated: 2025-02-03_
