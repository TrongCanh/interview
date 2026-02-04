# Convert Sorted Array to Binary Search Tree

> LeetCode Problem 108 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 108
- **URL:** https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Tree
- **Tags:** Tree, Binary Search Tree, Array, Divide and Conquer, Binary Tree
- **Thuật toán liên quan / Related Algorithms:** Tree, Binary Search, Divide and Conquer
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer array `nums` where the elements are sorted in ascending order, convert it to a **height-balanced** binary search tree.
>
> A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

**Example 1:**

```
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:
```

**Example 2:**

```
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
```

**Constraints:**

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in a strictly increasing order.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên đã được sắp xếp tăng dần
- **Output:** Root của cây BST cân bằng theo chiều cao
- **Ràng buộc / Constraints:**
  - Độ dài mảng từ 1 đến 10^4
  - Mảng đã được sắp xếp tăng dần
  - Cây kết quả phải là BST cân bằng theo chiều cao
- **Edge cases:**
  - Mảng chỉ có 1 phần tử
  - Mảng có số phần tử lẻ
  - Mảng có số phần tử chẵn

### 2. Tư duy / Thinking Process

- **Bước 1:** Để tạo BST cân bằng, root phải là phần tử ở giữa mảng
- **Bước 2:** Nửa trái của mảng thành cây con trái, nửa phải thành cây con phải
- **Bước 3:** Áp dụng đệ quy cho từng nửa mảng

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [-10,-3,0,5,9]

Giải thích:
- Chọn middle element: 0 (index 2) làm root
- Left subtree: [-10, -3] → middle: -3
  - Left: [-10], Right: []
- Right subtree: [5, 9] → middle: 9
  - Left: [5], Right: []

Cây kết quả:
      0
     / \
   -3   9
   /   /
 -10  5

Output: [0,-3,9,-10,null,5]
```

---

## 💡 Giải pháp 1: Recursive (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng đệ quy với Divide and Conquer. Chọn phần tử ở giữa làm root, sau đó đệ quy xây dựng cây con từ nửa trái và nửa phải.

### Thuật toán / Algorithm

1. Định nghĩa hàm helper(left, right):
   - Nếu left > right, trả về null
   - Tìm mid = left + Math.floor((right - left) / 2)
   - Tạo node với giá trị nums[mid]
   - node.left = helper(left, mid - 1)
   - node.right = helper(mid + 1, right)
   - Trả về node
2. Gọi helper(0, nums.length - 1)
3. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Convert Sorted Array to Binary Search Tree - Recursive Solution
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
  function buildBST(left, right) {
    // Base case: không còn phần tử
    if (left > right) {
      return null;
    }

    // Chọn phần tử ở giữa làm root
    const mid = left + Math.floor((right - left) / 2);
    const node = new TreeNode(nums[mid]);

    // Đệ quy xây dựng cây con trái và phải
    node.left = buildBST(left, mid - 1);
    node.right = buildBST(mid + 1, right);

    return node;
  }

  return buildBST(0, nums.length - 1);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi phần tử được duyệt đúng 1 lần
- **Space Complexity:** O(log n) - Stack đệ quy có độ sâu bằng chiều cao cây cân bằng

### Ưu điểm / Pros

- Code ngắn gọn, dễ hiểu
- Tự nhiên sử dụng Divide and Conquer
- Tạo ra cây cân bằng theo chiều cao

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với mảng rất lớn
- Tốn bộ nhớ cho stack đệ quy

---

## 🚀 Giải pháp 2: Iterative (Cải tiến) / Iterative Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Đệ quy có thể gây stack overflow
- Điểm yếu của giải pháp 1? Dùng đệ quy, phụ thuộc vào stack size
- Cách tiếp cận mới? Dùng stack để mô phỏng đệ quy

### Ý tưởng / Idea

Dùng stack để lưu các cặp (left, right, parent, isLeftChild). Mô phỏng quá trình đệ quy một cách thủ công.

### Thuật toán / Algorithm

1. Nếu nums rỗng, trả về null
2. Tính mid ban đầu, tạo root
3. Tạo stack với các cặp (left, right, parent, isLeftChild)
4. Trong khi stack không rỗng:
   - Lấy (left, right, parent, isLeftChild) ra khỏi stack
   - Nếu left > right, tiếp tục
   - Tính mid, tạo node mới
   - Gán node vào parent.left hoặc parent.right
   - Thêm (mid + 1, right, node, false) vào stack (cây con phải)
   - Thêm (left, mid - 1, node, true) vào stack (cây con trái)
5. Trả về root

### Code / Implementation

```javascript
/**
 * Convert Sorted Array to Binary Search Tree - Iterative Solution
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST_Iterative(nums) {
  if (nums.length === 0) {
    return null;
  }

  // Tạo root ban đầu
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);

  // Stack lưu: [left, right, parent, isLeftChild]
  const stack = [
    [0, mid - 1, root, true], // cây con trái
    [mid + 1, nums.length - 1, root, false], // cây con phải
  ];

  while (stack.length > 0) {
    const [left, right, parent, isLeftChild] = stack.pop();

    if (left > right) {
      continue;
    }

    const newMid = left + Math.floor((right - left) / 2);
    const node = new TreeNode(nums[newMid]);

    // Gán node vào parent
    if (isLeftChild) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    // Thêm cây con phải trước (để duyệt trái sau)
    stack.push([newMid + 1, right, node, false]);
    stack.push([left, newMid - 1, node, true]);
  }

  return root;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi phần tử được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Stack có thể chứa tối đa n phần tử

### Ưu điểm / Pros

- Không gây stack overflow
- Có thể kiểm soát stack size

### Nhược điểm / Cons

- Code phức tạp hơn
- Khó hiểu hơn so với đệ quy
- Tốn nhiều bộ nhớ hơn cho stack

---

## ⚡ Giải pháp 3: Recursive with Slice (Nâng cao) / Recursive with Slice Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng array.slice để đơn giản hóa
- Có thuật toán/pattern nào phù hợp hơn? Dùng slice để chia mảng

### Ý tưởng / Idea

Dùng đệ quy với array.slice để lấy nửa trái và nửa phải của mảng. Code đơn giản hơn nhưng tốn thêm bộ nhớ.

### Thuật toán / Algorithm

1. Nếu nums rỗng, trả về null
2. Tìm mid = Math.floor(nums.length / 2)
3. Tạo node với giá trị nums[mid]
4. node.left = sortedArrayToBST(nums.slice(0, mid))
5. node.right = sortedArrayToBST(nums.slice(mid + 1))
6. Trả về node

### Code / Implementation

```javascript
/**
 * Convert Sorted Array to Binary Search Tree - Recursive with Slice Solution
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST_Slice(nums) {
  if (nums.length === 0) {
    return null;
  }

  const mid = Math.floor(nums.length / 2);
  const node = new TreeNode(nums[mid]);

  node.left = sortedArrayToBST_Slice(nums.slice(0, mid));
  node.right = sortedArrayToBST_Slice(nums.slice(mid + 1));

  return node;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - Mỗi lần slice tốn O(n), gọi O(log n) lần
- **Space Complexity:** O(n log n) - Mỗi lần slice tạo mảng mới

### Ưu điểm / Pros

- Code rất ngắn gọn, dễ đọc
- Không cần quản lý index

### Nhược điểm / Cons

- Độ phức tạp thời gian cao hơn do slice
- Tốn nhiều bộ nhớ hơn do tạo nhiều mảng mới
- Không tối ưu cho mảng lớn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space      | Độ khó / Difficulty | Khi nào dùng / When to use         |
| -------------------- | ---------- | ---------- | ------------------- | ---------------------------------- |
| Recursive            | O(n)       | O(log n)   | Dễ / Easy           | Mảng không quá lớn, code ngắn      |
| Iterative            | O(n)       | O(n)       | Khó / Hard          | Mảng rất lớn, tránh stack overflow |
| Recursive with Slice | O(n log n) | O(n log n) | Dễ / Easy           | Code ngắn, không tối ưu            |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [-10, -3, 0, 5, 9];
const result1 = sortedArrayToBST(nums);
const result2 = sortedArrayToBST_Iterative(nums);
const result3 = sortedArrayToBST_Slice(nums);
// Expected: height-balanced BST with 0 as root
```

### Test Case 2: Mảng chỉ có 1 phần tử / Single Element

```javascript
const nums = [1];
const result1 = sortedArrayToBST(nums);
const result2 = sortedArrayToBST_Iterative(nums);
const result3 = sortedArrayToBST_Slice(nums);
// Expected: TreeNode with val = 1, left = null, right = null
```

### Test Case 3: Mảng có số phần tử chẵn / Even Length

```javascript
const nums = [1, 3];
const result1 = sortedArrayToBST(nums);
const result2 = sortedArrayToBST_Iterative(nums);
const result3 = sortedArrayToBST_Slice(nums);
// Expected: Either [3,1] or [1,null,3] (both valid)
```

### Test Case 4: Mảng lớn / Large Array

```javascript
const nums = Array.from({ length: 100 }, (_, i) => i);
const result1 = sortedArrayToBST(nums);
const result2 = sortedArrayToBST_Iterative(nums);
// Expected: height-balanced BST
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Tree](../algorithms/data-structures/tree.md)
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Binary Search](../algorithms/algorithms/binary-search.md)
  - [Divide and Conquer](../algorithms/algorithms/divide-and-conquer.md)
  - [Recursion](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- **Chọn mid:** Dùng `left + Math.floor((right - left) / 2)` thay vì `(left + right) / 2` để tránh overflow
- **Cân bằng BST:** Chọn phần tử ở giữa làm root đảm bảo cây cân bằng theo chiều cao
- **Lỗi thường gặp:**
  - Quên base case (left > right)
  - Sai công thức tính mid gây overflow
  - Với slice, không nhận ra độ phức tạp O(n log n)
  - Quên gán node.left/node.right

---

_Last updated: 2026-02-03_
