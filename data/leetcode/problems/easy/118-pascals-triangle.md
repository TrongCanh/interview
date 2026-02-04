# Pascal's Triangle

> LeetCode Problem 118 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 118
- **URL:** https://leetcode.com/problems/pascals-triangle/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Dynamic Programming
- **Tags:** Array, Dynamic Programming
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer `numRows`, return the first numRows of **Pascal's triangle**.
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
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

**Example 2:**

```
Input: numRows = 1
Output: [[1]]
```

**Constraints:**

- `1 <= numRows <= 30`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên numRows
- **Output:** Mảng 2 chiều chứa numRows đầu tiên của Pascal's Triangle
- **Ràng buộc / Constraints:**
  - numRows từ 1 đến 30
- **Edge cases:**
  - numRows = 1 → [[1]]
  - numRows = 2 → [[1], [1,1]]

### 2. Tư duy / Thinking Process

- **Bước 1:** Mỗi hàng bắt đầu và kết thúc bằng 1
- **Bước 2:** Các phần tử ở giữa bằng tổng 2 phần tử phía trên
- **Bước 3:** Dùng DP để xây dựng từng hàng từ hàng trước

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: numRows = 5

Giải thích:
- Row 0: [1]
- Row 1: [1, 1]
- Row 2: [1, 1+1, 1] = [1, 2, 1]
- Row 3: [1, 1+2, 2+1, 1] = [1, 3, 3, 1]
- Row 4: [1, 1+3, 3+3, 3+1, 1] = [1, 4, 6, 4, 1]

Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

---

## 💡 Giải pháp 1: Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng vòng lặp để xây dựng từng hàng. Mỗi hàng mới được tạo từ hàng trước đó.

### Thuật toán / Algorithm

1. Nếu numRows = 0, trả về []
2. Tạo result = [[1]]
3. Với i từ 1 đến numRows - 1:
   - Tạo prevRow = result[i-1]
   - Tạo newRow = [1]
   - Với j từ 1 đến prevRow.length - 1:
     - newRow.push(prevRow[j-1] + prevRow[j])
   - newRow.push(1)
   - result.push(newRow)
4. Trả về result

### Code / Implementation

```javascript
/**
 * Pascal's Triangle - Iterative Solution
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
  if (numRows === 0) {
    return [];
  }

  const result = [[1]];

  for (let i = 1; i < numRows; i++) {
    const prevRow = result[i - 1];
    const newRow = [1];

    // Các phần tử ở giữa bằng tổng 2 phần tử phía trên
    for (let j = 1; j < prevRow.length; j++) {
      newRow.push(prevRow[j - 1] + prevRow[j]);
    }

    newRow.push(1);
    result.push(newRow);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Tổng số phần tử là n(n+1)/2
- **Space Complexity:** O(n²) - Lưu toàn bộ Pascal's Triangle

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Code rõ ràng, trực quan

### Nhược điểm / Cons

- Tốn nhiều bộ nhớ để lưu toàn bộ triangle
- Không tối ưu nếu chỉ cần một hàng cụ thể

---

## 🚀 Giải pháp 2: Optimized Space (Cải tiến) / Optimized Space Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 tốn nhiều bộ nhớ
- Điểm yếu của giải pháp 1? Lưu toàn bộ triangle
- Cách tiếp cận mới? Có thể tối ưu bằng cách chỉ lưu hàng hiện tại

### Ý tưởng / Idea

Chỉ lưu hàng hiện tại và dùng nó để tính hàng tiếp theo. Tuy nhiên với bài toán này cần trả về toàn bộ triangle, nên không thể tối ưu nhiều.

### Thuật toán / Algorithm

1. Nếu numRows = 0, trả về []
2. Tạo result = []
3. Tạo currentRow = []
4. Với i từ 0 đến numRows - 1:
   - Tạo newRow từ currentRow
   - Thêm newRow vào result
   - currentRow = newRow
5. Trả về result

### Code / Implementation

```javascript
/**
 * Pascal's Triangle - Optimized Space Solution
 * @param {number} numRows
 * @return {number[][]}
 */
function generate_Optimized(numRows) {
  if (numRows === 0) {
    return [];
  }

  const result = [];
  let currentRow = [];

  for (let i = 0; i < numRows; i++) {
    // Tạo hàng mới từ hàng hiện tại
    const newRow = new Array(i + 1).fill(1);

    for (let j = 1; j < i; j++) {
      newRow[j] = currentRow[j - 1] + currentRow[j];
    }

    result.push(newRow);
    currentRow = newRow;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Tổng số phần tử là n(n+1)/2
- **Space Complexity:** O(n²) - Vẫn cần lưu toàn bộ triangle

### Ưu điểm / Pros

- Code gọn hơn một chút
- Dùng array.fill() để tạo hàng mới

### Nhược điểm / Cons

- Vẫn tốn nhiều bộ nhớ
- Không thực sự tối ưu hơn giải pháp 1

---

## ⚡ Giải pháp 3: Mathematical (Nâng cao) / Mathematical Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng công thức toán học
- Có thuật toán/pattern nào phù hợp hơn? Dùng combination formula

### Ý tưởng / Idea

Mỗi phần tử ở vị trí (r, c) của Pascal's Triangle bằng C(r, c) = r! / (c! \* (r-c)!). Tuy nhiên tính factorial có thể gây overflow.

### Thuật toán / Algorithm

1. Tạo result = []
2. Với r từ 0 đến numRows - 1:
   - Tạo row = []
   - Với c từ 0 đến r:
     - Tính C(r, c) = r! / (c! \* (r-c)!)
     - row.push(C(r, c))
   - result.push(row)
3. Trả về result

### Code / Implementation

```javascript
/**
 * Pascal's Triangle - Mathematical Solution
 * @param {number} numRows
 * @return {number[][]}
 */
function generate_Math(numRows) {
  const result = [];

  for (let r = 0; r < numRows; r++) {
    const row = [];

    for (let c = 0; c <= r; c++) {
      // Tính C(r, c) = r! / (c! * (r-c)!)
      row.push(combination(r, c));
    }

    result.push(row);
  }

  return result;
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
- **Space Complexity:** O(n²) - Lưu toàn bộ triangle

### Ưu điểm / Pros

- Không phụ thuộc vào hàng trước
- Có thể tính trực tiếp từng phần tử

### Nhược điểm / Cons

- Dễ gây overflow với số lớn
- Tốn nhiều bộ nhớ cho factorial

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Iterative            | O(n²) | O(n²) | Dễ / Easy           | Cách đơn giản, dễ hiểu     |
| Optimized Space      | O(n²) | O(n²) | Trung bình / Medium | Code gọn hơn               |
| Mathematical         | O(n²) | O(n²) | Khó / Hard          | Không phụ thuộc hàng trước |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const numRows = 5;
console.log(generate(numRows));
// Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate_Optimized(numRows));
// Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate_Math(numRows));
// Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

### Test Case 2: numRows = 1

```javascript
const numRows = 1;
console.log(generate(numRows)); // Expected: [[1]]
console.log(generate_Optimized(numRows)); // Expected: [[1]]
console.log(generate_Math(numRows)); // Expected: [[1]]
```

### Test Case 2: numRows = 2

```javascript
const numRows = 2;
console.log(generate(numRows)); // Expected: [[1],[1,1]]
console.log(generate_Optimized(numRows)); // Expected: [[1],[1,1]]
console.log(generate_Math(numRows)); // Expected: [[1],[1,1]]
```

### Test Case 4: numRows = 10

```javascript
const numRows = 10;
console.log(generate(numRows));
// Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1],[1,7,21,35,35,21,7,1],[1,8,28,56,70,56,28,8,1],[1,9,36,84,126,126,84,36,9,1]]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Dynamic Programming Basics](../algorithms/dynamic-programming/dp-basics.md)

- **Bài toán liên quan:**
  - [Pascal's Triangle II (Problem 119)](./119-pascals-triangle-ii.md)

---

## 💬 Lời khuyên / Tips

- **Pascal's Triangle:**
  - Hàng đầu và cuối luôn là 1
  - Các phần tử ở giữa bằng tổng 2 phần tử phía trên
- **DP Approach:**
  - Dùng hàng trước để tính hàng sau
  - Không cần tính lại các giá trị đã có
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp numRows = 0
  - Sai index khi truy cập phần tử hàng trước
  - Với mathematical, gây overflow khi tính factorial

---

_Last updated: 2026-02-03_
