# Divide and Conquer / Chia và Trị

> Thuật toán Divide and Conquer - Giải thích chi tiết / Divide and Conquer Algorithm - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Divide and Conquer** (Chia và Trị) là một kỹ thuật lập trình trong đó một bài toán lớn được chia thành các bài toán nhỏ hơn, giải quyết từng bài toán nhỏ, sau đó kết hợp các giải pháp để có kết quả cho bài toán lớn.

### Các bước chính / Main Steps

1. **Divide (Chia):** Chia bài toán lớn thành các bài toán nhỏ hơn
2. **Conquer (Trị):** Giải quyết từng bài toán nhỏ một cách đệ quy
3. **Combine (Kết hợp):** Kết hợp các giải pháp của các bài toán nhỏ để có giải pháp cho bài toán lớn

### Ví dụ thực tế / Real-world Examples

- **Merge Sort:** Chia mảng thành hai phần, sắp xếp từng phần, gộp lại
- **Quick Sort:** Chọn pivot, chia mảng thành hai phần, sắp xếp từng phần
- **Binary Search:** Chia mảng thành hai phần, tìm trong phần thích hợp
- **Tree Traversal:** Duyệt cây con trái và phải, kết hợp kết quả
- **Matrix Multiplication:** Chia ma trận thành các ma trận nhỏ hơn

---

## 🎯 Khi nào dùng? / When to use?

- **Bài toán có thể chia thành các bài toán nhỏ hơn**
- **Bài toán có cấu trúc đệ quy tự nhiên**
- **Cần giải pháp song song (parallel computing)**
- **Cần tối ưu hiệu năng bằng cách giảm bài toán**

---

## 🔄 Các biến thể / Variations

### Standard Divide and Conquer

Chia bài toán thành các bài toán nhỏ hơn, giải quyết từng bài toán, kết hợp kết quả.

### Recursive Divide and Conquer

Sử dụng đệ quy để chia và trị bài toán.

### Iterative Divide and Conquer

Sử dụng iteration thay vì đệ quy để chia và trị bài toán.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Divide and Conquer cơ bản - Basic Divide and Conquer Template
 * @param {*} input - Đầu vào
 * @return {*} - Kết quả
 */
function divideAndConquer(input) {
  // Base case: bài toán đủ nhỏ để giải quyết trực tiếp
  if (isSmallEnough(input)) {
    return solveDirectly(input);
  }

  // Divide: chia bài toán thành các bài toán nhỏ hơn
  const subProblems = divide(input);

  // Conquer: giải quyết từng bài toán nhỏ
  const subResults = subProblems.map((problem) => divideAndConquer(problem));

  // Combine: kết hợp các kết quả
  return combine(subResults);
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Divide and Conquer nâng cao - Advanced Divide and Conquer Template
 * Bao gồm memoization để tối ưu hiệu năng
 * @param {*} input - Đầu vào
 * @param {Object} memo - Cache kết quả
 * @return {*} - Kết quả
 */
function divideAndConquerWithMemo(input, memo = {}) {
  // Kiểm tra cache
  if (input in memo) {
    return memo[input];
  }

  // Base case
  if (isSmallEnough(input)) {
    return solveDirectly(input);
  }

  // Divide
  const subProblems = divide(input);

  // Conquer với memoization
  const subResults = subProblems.map((problem) =>
    divideAndConquerWithMemo(problem, memo),
  );

  // Combine
  const result = combine(subResults);

  // Lưu vào cache
  memo[input] = result;

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Merge Sort

**Mô tả:** Sắp xếp mảng bằng cách chia thành hai phần, sắp xếp từng phần, gộp lại.

**Code:**

```javascript
/**
 * Merge Sort với Divide and Conquer
 * @param {number[]} arr - Mảng cần sắp xếp
 * @return {number[]} - Mảng đã sắp xếp
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function mergeSort(arr) {
  // Base case: mảng có 0 hoặc 1 phần tử
  if (arr.length <= 1) {
    return arr;
  }

  // Divide: chia mảng thành hai phần
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Conquer: đệ quy sắp xếp từng phần
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine: gộp hai mảng đã sắp xếp
  return merge(sortedLeft, sortedRight);
}

/**
 * Gộp hai mảng đã sắp xếp - Merge two sorted arrays
 * @param {number[]} left - Mảng trái đã sắp xếp
 * @param {number[]} right - Mảng phải đã sắp xếp
 * @return {number[]} - Mảng đã gộp
 */
function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Thêm các phần tử còn lại
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Test
console.log(mergeSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Ví dụ 2 / Example 2: Quick Sort

**Mô tả:** Sắp xếp mảng bằng cách chọn pivot, chia thành hai phần, sắp xếp từng phần.

**Code:**

```javascript
/**
 * Quick Sort với Divide and Conquer
 * @param {number[]} arr - Mảng cần sắp xếp
 * @return {number[]} - Mảng đã sắp xếp
 *
 * Time Complexity: O(n log n) trung bình, O(n^2) xấu nhất
 * Space Complexity: O(log n) cho stack
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  // Base case: mảng có 0 hoặc 1 phần tử
  if (low >= high) {
    return arr;
  }

  // Divide: partition và lấy index của pivot
  const pivotIndex = partition(arr, low, high);

  // Conquer: đệ quy sắp xếp hai phần
  quickSort(arr, low, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, high);

  return arr;
}

/**
 * Partition - Chia mảng dựa trên pivot
 * @param {number[]} arr - Mảng
 * @param {number} low - Index bắt đầu
 * @param {number} high - Index kết thúc
 * @return {number} - Index của pivot sau khi partition
 */
function partition(arr, low, high) {
  // Chọn phần tử cuối cùng làm pivot
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Đưa pivot vào vị trí đúng
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
}

// Test
console.log(quickSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Ví dụ 3 / Example 3: Binary Search

**Mô tả:** Tìm phần tử trong mảng đã sắp xếp bằng cách chia mảng thành hai phần.

**Code:**

```javascript
/**
 * Binary Search với Divide and Conquer
 * @param {number[]} arr - Mảng đã sắp xếp
 * @param {number} target - Giá trị cần tìm
 * @return {number} - Index của target, hoặc -1 nếu không tìm thấy
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) cho stack
 */
function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  // Base case: không tìm thấy
  if (low > high) {
    return -1;
  }

  // Divide: tính mid
  const mid = Math.floor((low + high) / 2);

  // Conquer: kiểm tra mid và đệ quy
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] > target) {
    return binarySearch(arr, target, low, mid - 1);
  } else {
    return binarySearch(arr, target, mid + 1, high);
  }
}

// Test
const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedArr, 7)); // 3
console.log(binarySearch(sortedArr, 10)); // -1
```

### Ví dụ 4 / Example 4: Power (Lũy thừa)

**Mô tả:** Tính x^n bằng cách chia n thành hai phần.

**Code:**

```javascript
/**
 * Power với Divide and Conquer
 * @param {number} x - Cơ số
 * @param {number} n - Số mũ
 * @return {number} - x^n
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) cho stack
 */
function power(x, n) {
  // Base case
  if (n === 0) {
    return 1;
  }

  // Divide: chia n thành hai phần
  const half = power(x, Math.floor(n / 2));

  // Conquer và Combine
  if (n % 2 === 0) {
    return half * half;
  } else {
    return x * half * half;
  }
}

// Test
console.log(power(2, 10)); // 1024
console.log(power(2, 100)); // 1267650600228229401496703205376
```

### Ví dụ 5 / Example 5: Maximum Subarray Sum

**Mô tả:** Tìm tổng lớn nhất của một mảng con liên tiếp.

**Code:**

```javascript
/**
 * Maximum Subarray Sum với Divide and Conquer
 * @param {number[]} arr - Mảng số
 * @return {number} - Tổng lớn nhất của mảng con
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) cho stack
 */
function maxSubarraySum(arr, left = 0, right = arr.length - 1) {
  // Base case: chỉ có một phần tử
  if (left === right) {
    return Math.max(0, arr[left]);
  }

  // Divide: chia mảng thành hai phần
  const mid = Math.floor((left + right) / 2);

  // Conquer: tính max cho ba trường hợp
  const leftMax = maxSubarraySum(arr, left, mid);
  const rightMax = maxSubarraySum(arr, mid + 1, right);
  const crossMax = maxCrossingSum(arr, left, mid, right);

  // Combine: trả về max của ba trường hợp
  return Math.max(leftMax, rightMax, crossMax);
}

/**
 * Tính tổng lớn nhất của mảng con đi qua mid
 * @param {number[]} arr - Mảng số
 * @param {number} left - Index bắt đầu
 * @param {number} mid - Index giữa
 * @param {number} right - Index kết thúc
 * @return {number} - Tổng lớn nhất
 */
function maxCrossingSum(arr, left, mid, right) {
  // Tìm max từ mid về trái
  let leftSum = -Infinity;
  let sum = 0;
  for (let i = mid; i >= left; i--) {
    sum += arr[i];
    leftSum = Math.max(leftSum, sum);
  }

  // Tìm max từ mid+1 về phải
  let rightSum = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= right; i++) {
    sum += arr[i];
    rightSum = Math.max(rightSum, sum);
  }

  return leftSum + rightSum;
}

// Test
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubarraySum([1, 2, 3, 4, 5])); // 15
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/hard/004-median-of-two-sorted-arrays.md`](../problems/hard/004-median-of-two-sorted-arrays.md)
- [Sort an Array](https://leetcode.com/problems/sort-an-array/)
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- [Pow(x, n)](https://leetcode.com/problems/powx-n/)

---

## 📊 So sánh với các kỹ thuật khác / Comparison with Other Techniques

| Kỹ thuật / Technique | Ưu điểm / Pros         | Nhược điểm / Cons | Khi nào dùng / When to use          |
| -------------------- | ---------------------- | ----------------- | ----------------------------------- |
| Divide and Conquer   | Tối ưu, dễ parallel    | Có thể tốn bộ nhớ | Bài toán có thể chia nhỏ            |
| Dynamic Programming  | Tối ưu, tránh tính lại | Khó implement     | Bài toán có overlapping subproblems |
| Greedy               | Đơn giản, nhanh        | Không luôn tối ưu | Bài toán có optimal substructure    |
| Brute Force          | Đơn giản               | Rất chậm          | Mảng nhỏ, demo                      |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên base case:** Luôn có base case để dừng đệ quy
2. **Chia sai:** Cách chia phải đảm bảo bài toán nhỏ hơn
3. **Kết hợp sai:** Cách kết hợp các kết quả phải đúng
4. **Không tối ưu:** Một số bài toán có thể được tối ưu với memoization
5. **Stack Overflow:** Đệ quy quá sâu có thể gây stack overflow

---

## 💡 Tips & Tricks

1. **Base Case:** Luôn xác định base case rõ ràng
2. **Memoization:** Khi đệ quy tính lại cùng một giá trị nhiều lần, dùng memoization
3. **Divide Strategy:** Chọn cách chia phù hợp với bài toán
4. **Combine Strategy:** Cách kết hợp các kết quả phải đúng
5. **Parallel Computing:** Divide and Conquer phù hợp cho song song

---

## 📚 Tài liệu tham khảo / References

- [Divide and Conquer - Wikipedia](https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm)
- [Merge Sort - Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
- [Quick Sort - Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
- [Binary Search - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

---

_Last updated: 2025-02-03_
