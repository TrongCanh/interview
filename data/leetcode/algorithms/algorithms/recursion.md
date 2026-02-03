# Recursion / Đệ quy

> Thuật toán Recursion - Giải thích chi tiết / Recursion Algorithm - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Recursion** (Đệ quy) là một kỹ thuật lập trình trong đó một hàm gọi chính nó để giải quyết một bài toán nhỏ hơn của cùng bài toán gốc. Đệ quy dựa trên nguyên tắc **Divide and Conquer** (Chia và Trị).

### Các khái niệm cơ bản / Basic Concepts

- **Base Case (Trường hợp cơ sở):** Điều kiện dừng đệ quy, tránh vô hạn
- **Recursive Case (Trường hợp đệ quy):** Gọi hàm chính nó với bài toán nhỏ hơn
- **Call Stack (Ngăn xếp gọi):** Lưu trữ trạng thái của mỗi lần gọi đệ quy
- **Stack Overflow (Tràn ngăn xếp):** Khi call stack quá lớn, gây lỗi
- **Tail Recursion (Đệ quy đuôi):** Đệ quy trong đó lần gọi đệ quy là thao tác cuối cùng

### Ví dụ thực tế / Real-world Examples

- **File System:** Duyệt qua thư mục và file (thư mục con chứa thư mục con)
- **Tree Traversal:** Duyệt cây (node con chứa node con)
- **Factorial:** n! = n × (n-1)!
- **Fibonacci:** F(n) = F(n-1) + F(n-2)
- **Divide and Conquer:** Chia bài toán thành các bài toán nhỏ hơn

---

## 🎯 Khi nào dùng? / When to use?

- **Bài toán có cấu trúc đệ quy** (tree, graph, factorial, v.v.)
- **Có thể chia bài toán thành các bài toán nhỏ hơn**
- **Cần duyệt cấu trúc lồng nhau** (nested structures)
- **Cần giải pháp ngắn gọn và dễ hiểu**

---

## 🔄 Các biến thể / Variations

### Tail Recursion (Đệ quy đuôi)

Đệ quy trong đó lần gọi đệ quy là thao tác cuối cùng, có thể được tối ưu hóa thành iteration.

### Head Recursion (Đệ quy đầu)

Thực hiện thao tác trước khi gọi đệ quy.

### Mutual Recursion (Đệ quy tương hỗ)

Hai hoặc nhiều hàm gọi nhau.

### Indirect Recursion (Đệ quy gián tiếp)

Hàm gọi một hàm khác, hàm đó gọi lại hàm ban đầu.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template đệ quy cơ bản - Basic Recursion Template
 * @param {*} input - Đầu vào
 * @return {*} - Kết quả
 */
function recursiveFunction(input) {
  // Base case: điều kiện dừng
  if (baseCaseCondition) {
    return baseCaseResult;
  }

  // Recursive case: chia bài toán và gọi đệ quy
  const smallerProblem = makeProblemSmaller(input);
  const result = recursiveFunction(smallerProblem);

  // Kết hợp kết quả
  return combineResults(result, input);
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template đệ quy nâng cao - Advanced Recursion Template
 * Bao gồm memoization để tối ưu hiệu năng
 * @param {*} input - Đầu vào
 * @param {Object} memo - Cache kết quả
 * @return {*} - Kết quả
 */
function recursiveFunctionWithMemo(input, memo = {}) {
  // Kiểm tra cache
  if (input in memo) {
    return memo[input];
  }

  // Base case
  if (baseCaseCondition) {
    return baseCaseResult;
  }

  // Recursive case với memoization
  const smallerProblem = makeProblemSmaller(input);
  const result = recursiveFunctionWithMemo(smallerProblem, memo);

  // Lưu vào cache
  memo[input] = result;

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Factorial (Giai thừa)

**Mô tả:** Tính n! = n × (n-1) × ... × 1

**Code:**

```javascript
/**
 * Factorial - Giai thừa
 * @param {number} n - Số nguyên dương
 * @return {number} - n!
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - stack depth
 */
function factorial(n) {
  // Base case
  if (n <= 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test
console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
```

### Ví dụ 2 / Example 2: Fibonacci

**Mô tả:** Tính số Fibonacci thứ n: F(n) = F(n-1) + F(n-2)

**Code:**

```javascript
/**
 * Fibonacci - Số Fibonacci (không tối ưu)
 * @param {number} n - Vị trí cần tìm
 * @return {number} - Số Fibonacci thứ n
 *
 * Time Complexity: O(2^n) - rất chậm
 * Space Complexity: O(n) - stack depth
 */
function fibonacci(n) {
  // Base case
  if (n <= 1) {
    return n;
  }

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Fibonacci với Memoization - Tối ưu
 * @param {number} n - Vị trí cần tìm
 * @param {Object} memo - Cache
 * @return {number} - Số Fibonacci thứ n
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function fibonacciMemo(n, memo = {}) {
  // Kiểm tra cache
  if (n in memo) {
    return memo[n];
  }

  // Base case
  if (n <= 1) {
    return n;
  }

  // Recursive case với memoization
  const result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  memo[n] = result;

  return result;
}

// Test
console.log(fibonacci(10)); // 55 (chậm)
console.log(fibonacciMemo(10)); // 55 (nhanh)
console.log(fibonacciMemo(50)); // 12586269025
```

### Ví dụ 3 / Example 3: Tree Traversal

**Mô tả:** Duyệt cây theo Preorder (Root → Left → Right)

**Code:**

```javascript
/**
 * TreeNode - Cấu trúc node
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Preorder Traversal - Duyệt cây theo Preorder
 * @param {TreeNode} root - Root của cây
 * @return {number[]} - Mảng các giá trị theo preorder
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h) - stack depth, h là chiều cao cây
 */
function preorderTraversal(root, result = []) {
  // Base case: node null
  if (root === null) {
    return result;
  }

  // Xử lý root
  result.push(root.val);

  // Duyệt cây con trái
  preorderTraversal(root.left, result);

  // Duyệt cây con phải
  preorderTraversal(root.right, result);

  return result;
}

// Test
const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);

console.log(preorderTraversal(tree)); // [1, 2, 4, 5, 3]
```

### Ví dụ 4 / Example 4: Power (Lũy thừa)

**Mô tả:** Tính x^n

**Code:**

```javascript
/**
 * Power - Tính lũy thừa
 * @param {number} x - Cơ số
 * @param {number} n - Số mũ
 * @return {number} - x^n
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) - stack depth
 */
function power(x, n) {
  // Base case
  if (n === 0) {
    return 1;
  }

  // Recursive case
  return x * power(x, n - 1);
}

/**
 * Power với Divide and Conquer - Tối ưu
 * @param {number} x - Cơ số
 * @param {number} n - Số mũ
 * @return {number} - x^n
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) - stack depth
 */
function powerOptimized(x, n) {
  // Base case
  if (n === 0) {
    return 1;
  }

  // Recursive case với divide and conquer
  const half = powerOptimized(x, Math.floor(n / 2));

  if (n % 2 === 0) {
    return half * half;
  } else {
    return x * half * half;
  }
}

// Test
console.log(power(2, 10)); // 1024
console.log(powerOptimized(2, 10)); // 1024 (nhanh hơn)
console.log(powerOptimized(2, 100)); // 1267650600228229401496703205376
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/021-merge-two-sorted-lists.md`](../problems/easy/021-merge-two-sorted-lists.md)
- [`../problems/medium/002-add-two-numbers.md`](../problems/medium/002-add-two-numbers.md)
- [`../problems/medium/005-longest-palindromic-substring.md`](../problems/medium/005-longest-palindromic-substring.md)
- [`../problems/medium/017-letter-combinations-of-a-phone-number.md`](../problems/medium/017-letter-combinations-of-a-phone-number.md)
- [`../problems/hard/044-wildcard-matching.md`](../problems/hard/044-wildcard-matching.md)
- [`../problems/hard/010-regular-expression-matching.md`](../problems/hard/010-regular-expression-matching.md)

- [Climbing Stairs](../problems/easy/070-climbing-stairs.md)
- [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)
- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [Binary Tree Inorder Traversal](../problems/easy/094-binary-tree-inorder-traversal.md)
- [Subsets](https://leetcode.com/problems/subsets/)

---

## 📊 Độ phức tạp / Complexity

| Thuật toán / Algorithm     | Time Complexity | Space Complexity | Ghi chú / Notes    |
| -------------------------- | --------------- | ---------------- | ------------------ |
| Factorial                  | O(n)            | O(n)             | Stack depth = n    |
| Fibonacci (không tối ưu)   | O(2^n)          | O(n)             | Rất chậm           |
| Fibonacci (có memoization) | O(n)            | O(n)             | Tối ưu             |
| Tree Traversal             | O(n)            | O(h)             | h là chiều cao cây |
| Power (cơ bản)             | O(n)            | O(n)             | Stack depth = n    |
| Power (divide and conquer) | O(log n)        | O(log n)         | Tối ưu             |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên base case:** Luôn có base case để dừng đệ quy, tránh vô hạn
2. **Không giảm bài toán:** Mỗi lần gọi đệ quy phải giải quyết bài toán nhỏ hơn
3. **Stack Overflow:** Đệ quy quá sâu có thể gây stack overflow
4. **Không tối ưu:** Một số bài toán có thể được tối ưu với memoization
5. **Nhầm lẫn head và tail recursion:** Tail recursion có thể được tối ưu hóa thành iteration

---

## 💡 Tips & Tricks

1. **Base Case:** Luôn xác định base case rõ ràng
2. **Memoization:** Khi đệ quy tính lại cùng một giá trị nhiều lần, dùng memoization
3. **Tail Recursion:** Nếu có thể, dùng tail recursion để tối ưu
4. **Divide and Conquer:** Chia bài toán thành các bài toán nhỏ hơn để tối ưu
5. **Stack Depth:** Cẩn thận với stack depth, cân nhắc dùng iteration cho bài toán rất sâu

---

## 📚 Tài liệu tham khảo / References

- [Recursion - Wikipedia](https://en.wikipedia.org/wiki/Recursion)
- [Tail Recursion - Wikipedia](https://en.wikipedia.org/wiki/Tail_call)
- [Dynamic Programming - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)

---

_Last updated: 2025-02-03_
