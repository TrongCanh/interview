# Pascal's Triangle II

> LeetCode Problem 119 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 119
- **URL:** https://leetcode.com/problems/pascals-triangle-ii/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Dynamic Programming
- **Tags:** Array, Dynamic Programming
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer `rowIndex`, return the `rowIndex-th` (0-indexed) row of the Pascal's triangle.
>
> In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

**Example 1:**

```
Input: rowIndex = 3
Output: [1,3,3,1]
```

**Example 2:**

```
Input: rowIndex = 0
Output: [1]
```

**Example 3:**

```
Input: rowIndex = 1
Output: [1,1]
```

**Constraints:**

- `0 <= rowIndex <= 33`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên rowIndex
- **Output:** Mảng chứa row thứ rowIndex của Pascal's Triangle
- **Ràng buộc / Constraints:**
  - rowIndex từ 0 đến 33
- **Edge cases:**
  - rowIndex = 0 → [1]
  - rowIndex = 1 → [1, 1]

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tạo hàng thứ rowIndex của Pascal's Triangle
- **Bước 2:** Mỗi phần tử bằng tổng 2 phần tử phía trên
- **Bước 3:** Dùng DP để xây dựng hàng từ trái sang phải

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: rowIndex = 3

Pascal's Triangle:
Row 0: [1]
Row 1: [1, 1]
Row 2: [1, 2, 1]
Row 3: [1, 3, 3, 1]

Giải thích:
- Phần tử đầu và cuối luôn là 1
- Row 3:
  - C(3,0) = 1
  - C(3,1) = 3
  - C(3,2) = 3
  - C(3,3) = 1

Output: [1, 3, 3, 1]
```

---

## 💡 Giải pháp 1: Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng vòng lặp để xây dựng từng hàng từ 0 đến rowIndex. Chỉ lưu hàng hiện tại để tối ưu bộ nhớ.

### Thuật toán / Algorithm

1. Tạo row = [1]
2. Với i từ 1 đến rowIndex:
   - Tạo newRow = [1]
   - Với j từ 1 đến i - 1:
     - newRow.push(row[j - 1] + row[j])
   - newRow.push(1)
   - row = newRow
3. Trả về row

### Code / Implementation

```javascript
/**
 * Pascal's Triangle II - Iterative Solution
 * @param {number} rowIndex
 * @return {number[]}
 */
function getRow(rowIndex) {
  let row = [1];

  for (let i = 1; i <= rowIndex; i++) {
    const newRow = [1];

    // Các phần tử ở giữa bằng tổng 2 phần tử phía trên
    for (let j = 1; j < i; j++) {
      newRow.push(row[j - 1] + row[j]);
    }

    newRow.push(1);
    row = newRow;
  }

  return row;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Tổng số phần tử từ row 0 đến n là n(n+1)/2
- **Space Complexity:** O(n) - Chỉ lưu hàng hiện tại

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Chỉ lưu hàng hiện tại, tiết kiệm bộ nhớ

### Nhược điểm / Cons

- Độ phức tạp thời gian O(n²)

---

## 🚀 Giải pháp 2: Optimized In-Place (Cải tiến) / Optimized In-Place Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 tạo mảng mới mỗi vòng lặp
- Điểm yếu của giải pháp 1? Tốn bộ nhớ cho mảng tạm
- Cách tiếp cận mới? Cập nhật mảng hiện tại từ phải sang trái

### Ý tưởng / Idea

Cập nhật mảng hiện tại từ phải sang trái để không cần mảng tạm. Vì mỗi phần tử phụ thuộc vào phần tử bên trái, cập nhật từ phải sang trái an toàn.

### Thuật toán / Algorithm

1. Tạo row = [1]
2. Với i từ 1 đến rowIndex:
   - Thêm 1 vào cuối row
   - Cập nhật từ phải sang trái (từ i xuống 1):
     - row[j] = row[j] + row[j - 1]
3. Trả về row

### Code / Implementation

```javascript
/**
 * Pascal's Triangle II - Optimized In-Place Solution
 * @param {number} rowIndex
 * @return {number[]}
 */
function getRow_Optimized(rowIndex) {
  const row = [1];

  for (let i = 1; i <= rowIndex; i++) {
    row.push(1);

    // Cập nhật từ phải sang trái
    for (let j = i - 1; j > 0; j--) {
      row[j] = row[j] + row[j - 1];
    }
  }

  return row;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Tổng số phần tử từ row 0 đến n là n(n+1)/2
- **Space Complexity:** O(n) - Chỉ lưu hàng hiện tại

### Ưu điểm / Pros

- Không tạo mảng tạm
- Code gọn hơn

### Nhược điểm / Cons

- Cần hiểu rõ thứ tự cập nhật
- Độ phức tạp thời gian vẫn O(n²)

---

## ⚡ Giải pháp 3: Mathematical (Nâng cao) / Mathematical Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng công thức toán học
- Có thuật toán/pattern nào phù hợp hơn? Dùng combination formula

### Ý tưởng / Idea

Mỗi phần tử ở vị trí (r, c) của Pascal's Triangle bằng C(r, c) = r! / (c! \* (r-c)!). Tính trực tiếp từng phần tử bằng công thức này.

### Thuật toán / Algorithm

1. Tạo row = []
2. Với c từ 0 đến rowIndex:
   - Tính C(rowIndex, c) = rowIndex! / (c! \* (rowIndex-c)!)
   - row.push(C(rowIndex, c))
3. Trả về row

### Code / Implementation

```javascript
/**
 * Pascal's Triangle II - Mathematical Solution
 * @param {number} rowIndex
 * @return {number[]}
 */
function getRow_Math(rowIndex) {
  const row = [];

  for (let c = 0; c <= rowIndex; c++) {
    // Tính C(n, k) = n! / (k! * (n-k)!)
    row.push(combination(rowIndex, c));
  }

  return row;
}

/**
 * Tính C(n, k) = n! / (k! * (n-k)!)
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function combination(n, k) {
  // Tối ưu bằng cách tính trực tiếp thay vì dùng factorial
  let result = 1;

  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Tính từng phần tử
- **Space Complexity:** O(n) - Lưu hàng kết quả

### Ưu điểm / Pros

- Không phụ thuộc vào hàng trước
- Có thể tính trực tiếp từng phần tử
- Độ phức tạp thực tế thấp hơn O(n²) vì tính combination nhanh

### Nhược điểm / Cons

- Dễ gây overflow với số lớn (nhưng constraint nhỏ nên ổn)
- Code phức tạp hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Iterative            | O(n²) | O(n)  | Dễ / Easy           | Cách đơn giản, dễ hiểu     |
| Optimized In-Place   | O(n²) | O(n)  | Trung bình / Medium | Không tạo mảng tạm         |
| Mathematical         | O(n²) | O(n)  | Khó / Hard          | Không phụ thuộc hàng trước |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const rowIndex = 3;
console.log(getRow(rowIndex)); // Expected: [1,3,3,1]
console.log(getRow_Optimized(rowIndex)); // Expected: [1,3,3,1]
console.log(getRow_Math(rowIndex)); // Expected: [1,3,3,1]
```

### Test Case 2: rowIndex = 0

```javascript
const rowIndex = 0;
console.log(getRow(rowIndex)); // Expected: [1]
console.log(getRow_Optimized(rowIndex)); // Expected: [1]
console.log(getRow_Math(rowIndex)); // Expected: [1]
```

### Test Case 3: rowIndex = 1

```javascript
const rowIndex = 1;
console.log(getRow(rowIndex)); // Expected: [1,1]
console.log(getRow_Optimized(rowIndex)); // Expected: [1,1]
console.log(getRow_Math(rowIndex)); // Expected: [1,1]
```

### Test Case 4: rowIndex = 10

```javascript
const rowIndex = 10;
console.log(getRow(rowIndex)); // Expected: [1,10,45,120,210,252,210,120,45,10,1]
console.log(getRow_Optimized(rowIndex)); // Expected: [1,10,45,120,210,252,210,120,45,10,1]
console.log(getRow_Math(rowIndex)); // Expected: [1,10,45,120,210,252,210,120,45,10,1]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Dynamic Programming Basics](../algorithms/dynamic-programming/dp-basics.md)

- **Bài toán liên quan:**
  - [Pascal's Triangle (Problem 118)](./118-pascals-triangle.md)

---

## 💬 Lời khuyên / Tips

- **Pascal's Triangle:**
  - Hàng đầu và cuối luôn là 1
  - Các phần tử ở giữa bằng tổng 2 phần tử phía trên
  - C(n, k) = C(n, k-1) \* (n-k+1) / k (tối ưu tính)
- **In-Place Update:**
  - Cập nhật từ phải sang trái để không ghi đè giá trị cần dùng
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp rowIndex = 0
  - Sai index khi truy cập phần tử
  - Với in-place, cập nhật sai thứ tự

---

_Last updated: 2026-02-03_
