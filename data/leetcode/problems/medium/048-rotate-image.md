# Rotate Image / Xoay Ảnh

> LeetCode Problem 48 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 48
- **URL:** https://leetcode.com/problems/rotate-image/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Matrix
- **Tags:** Array, Matrix, Math
- **Thuật toán liên quan / Related Algorithms:** Array, Math
- **Patterns liên quan / Related Patterns:** In-place Operation

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

You are given an `n x n` 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

**Example 2:**

```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

**Constraints:**

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Ma trận n x n
- **Output:** Ma trận đã được xoay 90 độ theo chiều kim đồng hồ (in-place)
- **Ràng buộc / Constraints:**
  - n == matrix.length == matrix[i].length (ma trận vuông)
  - 1 ≤ n ≤ 20
  - Giá trị phần tử: -1000 ≤ matrix[i][j] ≤ 1000
  - Phải xoay in-place (không được tạo ma trận mới)
- **Edge cases:**
  - Ma trận 1x1
  - Ma trận 2x2
  - Ma trận lớn

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần xoay ma trận 90 độ clockwise
- **Bước 2:** Nhận thấy có thể xoay bằng cách swap các phần tử theo vòng
- **Bước 3:** Hoặc có thể transpose rồi reverse mỗi hàng

### 3. Ví dụ minh họa / Examples

```
Example 1: matrix = [[1,2,3],[4,5,6],[7,8,9]]
- Trước khi xoay:
  1 2 3
  4 5 6
  7 8 9
- Sau khi xoay 90 độ clockwise:
  7 4 1
  8 5 2
  9 6 3
- Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
- Trước khi xoay:
  5  1  9 11
  2  4  8 10
 13  3  6  7
 15 14 12 16
- Sau khi xoay 90 độ clockwise:
 15 13  2  5
 14  3  4  1
 12  6  8  9
 16  7 10 11
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Tạo ma trận mới, copy từng phần tử vào vị trí tương ứng sau khi xoay.

### Thuật toán / Algorithm

1. Tạo ma trận mới với cùng kích thước
2. Copy từng phần tử từ ma trận cũ sang vị trí mới:
   - matrix[i][j] → matrix[j][n-1-i]
3. Copy ma trận mới vào ma trận gốc

### Code / Implementation

```javascript
function rotate_bruteForce(matrix) {
  const n = matrix.length;
  const result = new Array(n);

  // Tạo ma trận mới
  for (let i = 0; i < n; i++) {
    result[i] = new Array(n);
  }

  // Copy từng phần tử vào vị trí mới
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[j][n - 1 - i] = matrix[i][j];
    }
  }

  // Copy ma trận mới vào ma trận gốc
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = result[i][j];
    }
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - duyệt qua tất cả phần tử
- **Space Complexity:** O(n²) - ma trận mới

### Ưu điểm / Pros

- Dễ hiểu và implement
- Đảm bảo kết quả đúng

### Nhược điểm / Cons

- Không đáp ứng yêu cầu in-place
- Tốn nhiều bộ nhớ

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Yêu cầu bài toán là in-place
- Điểm yếu của giải pháp 1? Tạo ma trận mới tốn bộ nhớ
- Cách tiếp cận mới? Dùng transpose + reverse

### Ý tưởng / Idea

Xoay 90 độ clockwise = Transpose + Reverse mỗi hàng:

1. Transpose: matrix[i][j] ↔ matrix[j][i]
2. Reverse mỗi hàng: matrix[i][j] ↔ matrix[i][n-1-j]

### Thuật toán / Algorithm

1. Transpose ma trận:
   - Duyệt i từ 0 đến n-1
   - Duyệt j từ i+1 đến n-1 (tránh swap 2 lần)
   - Swap matrix[i][j] và matrix[j][i]
2. Reverse mỗi hàng:
   - Duyệt i từ 0 đến n-1
   - Duyệt j từ 0 đến n/2-1
   - Swap matrix[i][j] và matrix[i][n-1-j]

### Code / Implementation

```javascript
function rotate_optimized(matrix) {
  const n = matrix.length;

  // Bước 1: Transpose ma trận
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Swap matrix[i][j] và matrix[j][i]
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Bước 2: Reverse mỗi hàng
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      // Swap matrix[i][j] và matrix[i][n-1-j]
      [matrix[i][j], matrix[i][n - 1 - j]] = [
        matrix[i][n - 1 - j],
        matrix[i][j],
      ];
    }
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - duyệt qua tất cả phần tử
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Xoay in-place
- Chỉ dùng O(1) extra memory
- Tối ưu về hiệu năng
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Cần 2 bước (transpose + reverse)
- Logic cần hiểu rõ

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Transpose + Reverse là chuẩn

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function rotate_advanced(matrix) {
  // Validate input
  if (!isValidMatrix(matrix)) {
    return;
  }

  const n = matrix.length;

  // Bước 1: Transpose ma trận
  transposeMatrix(matrix, n);

  // Bước 2: Reverse mỗi hàng
  reverseRows(matrix, n);
}

/**
 * Kiểm tra ma trận có hợp lệ không
 * @param {number[][]} matrix - ma trận đầu vào
 * @returns {boolean}
 */
function isValidMatrix(matrix) {
  return matrix && matrix.length > 0 && matrix.length === matrix[0].length;
}

/**
 * Transpose ma trận (đổi hàng thành cột)
 * @param {number[][]} matrix - ma trận
 * @param {number} n - kích thước ma trận
 */
function transposeMatrix(matrix, n) {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      swapElements(matrix, i, j, j, i);
    }
  }
}

/**
 * Reverse mỗi hàng của ma trận
 * @param {number[][]} matrix - ma trận
 * @param {number} n - kích thước ma trận
 */
function reverseRows(matrix, n) {
  for (let i = 0; i < n; i++) {
    reverseRow(matrix[i], n);
  }
}

/**
 * Reverse một hàng
 * @param {number[]} row - hàng cần reverse
 * @param {number} length - độ dài hàng
 */
function reverseRow(row, length) {
  let left = 0;
  let right = length - 1;

  while (left < right) {
    swapInArray(row, left, right);
    left++;
    right--;
  }
}

/**
 * Swap hai phần tử trong ma trận
 * @param {number[][]} matrix - ma trận
 * @param {number} i1 - chỉ số hàng thứ nhất
 * @param {number} j1 - chỉ số cột thứ nhất
 * @param {number} i2 - chỉ số hàng thứ hai
 * @param {number} j2 - chỉ số cột thứ hai
 */
function swapElements(matrix, i1, j1, i2, j2) {
  [matrix[i1][j1], matrix[i2][j2]] = [matrix[i2][j2], matrix[i1][j1]];
}

/**
 * Swap hai phần tử trong mảng
 * @param {number[]} arr - mảng
 * @param {number} i - chỉ số thứ nhất
 * @param {number} j - chỉ số thứ hai
 */
function swapInArray(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Hàm wrapper để dễ test
 * @param {number[][]} matrix - ma trận đầu vào
 */
function rotateImage(matrix) {
  rotate_advanced(matrix);
}

/**
 * In ma trận ra console (để test)
 * @param {number[][]} matrix - ma trận cần in
 */
function printMatrix(matrix) {
  console.log(matrix.map((row) => row.join(" ")).join("\n"));
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng
- Xoay in-place

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution            | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| ------------------------------- | ----- | ----- | ------------------- | ------------------------------- |
| Brute Force (New Matrix)        | O(n²) | O(n²) | Dễ / Easy           | Học tập, không yêu cầu in-place |
| Optimized (Transpose + Reverse) | O(n²) | O(1)  | Trung bình / Medium | Production, cần in-place        |
| Advanced (Transpose + Reverse)  | O(n²) | O(1)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
let matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
rotate_advanced(matrix1);
console.log(matrix1); // Expected: [[7,4,1],[8,5,2],[9,6,3]]

let matrix2 = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];
rotate_advanced(matrix2);
console.log(matrix2); // Expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

### Test Case 2: Edge case

```javascript
// Ma trận 1x1
let matrix3 = [[1]];
rotate_advanced(matrix3);
console.log(matrix3); // Expected: [[1]]

// Ma trận 2x2
let matrix4 = [
  [1, 2],
  [3, 4],
];
rotate_advanced(matrix4);
console.log(matrix4); // Expected: [[3,1],[4,2]]
```

### Test Case 3: Phức tạp / Complex

```javascript
// Ma trận có số âm
let matrix5 = [
  [-1, -2, -3],
  [-4, -5, -6],
  [-7, -8, -9],
];
rotate_advanced(matrix5);
console.log(matrix5); // Expected: [[-7,-4,-1],[-8,-5,-2],[-9,-6,-3]]

// Ma trận 5x5
let matrix6 = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
rotate_advanced(matrix6);
console.log(matrix6);
// Expected: [[21,16,11,6,1],[22,17,12,7,2],[23,18,13,8,3],[24,19,14,9,4],[25,20,15,10,5]]
```

---

## 📚 Tài liệu tham khảo / References

- [Array](../../algorithms/data-structures/array.md)
- [Math](../../algorithms/algorithms/math.md)
- [LeetCode Discuss](https://leetcode.com/problems/rotate-image/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Xoay 90° clockwise = Transpose + Reverse mỗi hàng
- **Tip 2:** Xoay 90° counter-clockwise = Transpose + Reverse mỗi cột
- **Tip 3:** Trong transpose, j bắt đầu từ i+1 để tránh swap 2 lần
- **Tip 4:** Trong reverse, j chỉ đi đến n/2-1 (điểm giữa không cần swap)
- **Lỗi thường gặp và cách tránh:**
  - Quên điều kiện j bắt đầu từ i+1 trong transpose
  - Dùng j < n thay vì j < n/2 trong reverse
  - Quên reverse sau khi transpose
  - Sai thứ tự (transpose rồi reverse, không phải ngược lại)

---

_Last updated: 2026-02-03_
