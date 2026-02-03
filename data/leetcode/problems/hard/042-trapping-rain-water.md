# Trapping Rain Water / Thu nước mưa

> LeetCode Problem 42 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 42
- **URL:** https://leetcode.com/problems/trapping-rain-water/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Array, Two Pointers, Stack
- **Tags:** Array, Two Pointers, Stack
- **Thuật toán liên quan / Related Algorithms:** Array, Two Pointers, Stack
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

**Example 2:**

```
Input: height = [4,2,0,3,2,5]
Output: 9
```

**Constraints:**

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng chiều cao của các cột
- **Output:** Tổng lượng nước có thể thu
- **Ràng buộc / Constraints:**
  - Chiều rộng mỗi cột = 1
  - Nước thu ở giữa các cột cao hơn
- **Edge cases:**
  - Mảng rỗng
  - Tất cả cột cùng chiều cao
  - Mảng tăng dần hoặc giảm dần

### 2. Tư duy / Thinking Process

- **Bước 1:** Lượng nước ở mỗi vị trí = min(max bên trái, max bên phải) - chiều cao hiện tại.
- **Bước 2:** Cần tính max bên trái và max bên phải cho mỗi vị trí.
- **Bước 3:** Có thể dùng Two Pointers hoặc Stack để tối ưu.

### 3. Ví dụ minh họa / Examples

```
Example: height = [0,1,0,2,1,0,1,3,2,1,2,1]

Với Two Pointers:
- left = 0, right = 9
- leftMax = [0,0,0,0,0,0,0,0,0,0,0]
- rightMax = [3,3,3,3,3,2,2,2,2,1]

Tính nước:
- i=0: min(0,3) - 0 = 0
- i=1: min(1,3) - 1 = 0
- i=2: min(1,3) - 0 = 1
- i=3: min(2,3) - 2 = 1
- i=4: min(2,3) - 1 = 1
- i=5: min(2,2) - 0 = 2
- i=6: min(3,2) - 1 = 1
- i=7: min(2,2) - 3 = 0
- i=8: min(2,1) - 2 = 0
- i=9: min(2,1) - 1 = 0

Tổng: 0+0+1+1+1+2+1+0+0+0 = 6
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Với mỗi vị trí, tìm max bên trái và max bên phải, tính lượng nước.

### Thuật toán / Algorithm

1. Với mỗi vị trí i:
   - Tìm max bên trái từ 0 đến i
   - Tìm max bên phải từ i đến n-1
   - Nước = min(leftMax, rightMax) - height[i]
2. Tổng tất cả lượng nước

### Code / Implementation

```javascript
/**
 * Trapping Rain Water - Brute Force
 * @param {number[]} height - Array of heights
 * @return {number} - Total trapped water
 */
function trap_bruteForce(height) {
  const n = height.length;
  let totalWater = 0;

  for (let i = 0; i < n; i++) {
    // Find max height to the left
    let leftMax = 0;
    for (let j = 0; j <= i; j++) {
      leftMax = Math.max(leftMax, height[j]);
    }

    // Find max height to the right
    let rightMax = 0;
    for (let j = i; j < n; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    // Water trapped at i
    totalWater += Math.min(leftMax, rightMax) - height[i];
  }

  return totalWater;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - mỗi vị trí duyệt qua mảng 2 lần
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Không tối ưu
- Tốn nhiều thời gian

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force tính lại max nhiều lần.
- Điểm yếu của giải pháp 1? O(n²) quá chậm.
- Cách tiếp cận mới? Sử dụng Two Pointers để tính max bên trái và phải một lần.

### Ý tưởng / Idea

Sử dụng Two Pointers từ hai đầu mảng, tính max bên trái và phải trong một lần duyệt.

### Thuật toán / Algorithm

1. left = 0, right = n-1
2. leftMax = 0, rightMax = 0, totalWater = 0
3. Trong khi left < right:
   - Cập nhật leftMax và rightMax
   - Nước tại vị trí nhỏ hơn = min(leftMax, rightMax) - height[i]
   - Cộng vào totalWater
4. Di chuyển pointer

### Code / Implementation

```javascript
/**
 * Trapping Rain Water - Two Pointers
 * @param {number[]} height - Array of heights
 * @return {number} - Total trapped water
 */
function trap_twoPointers(height) {
  const n = height.length;
  if (n === 0) return 0;

  let left = 0,
    right = n - 1;
  let leftMax = 0,
    rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    // Update max heights
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    // Calculate water at the smaller position
    if (leftMax < rightMax) {
      totalWater += leftMax - height[left];
      left++;
    } else {
      totalWater += rightMax - height[right];
      right--;
    }
  }

  return totalWater;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi phần tử được duyệt một lần
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Tối ưu thời gian
- Không tốn thêm bộ nhớ

### Nhược điểm / Cons

- Phức tạp hơn để hiểu
- Cần quản lý nhiều biến

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng Stack để tối ưu.
- Có thuật toán/pattern nào phù hợp hơn? Stack pattern.

### Ý tưởng / Idea

Sử dụng Stack để lưu các cột có thể chứa nước. Khi gặp cột cao hơn, tính lượng nước.

### Thuật toán / Algorithm

1. Duyệt qua mảng, push chỉ số vào stack
2. Khi gặp cột cao hơn cột ở top stack:
   - Pop stack, tính lượng nước
   - Cộng vào totalWater
3. Push cột hiện tại vào stack

### Code / Implementation

```javascript
/**
 * Trapping Rain Water - Stack Solution
 * @param {number[]} height - Array of heights
 * @return {number} - Total trapped water
 */
function trap_stack(height) {
  const stack = []; // Store indices
  let totalWater = 0;

  for (let i = 0; i < height.length; i++) {
    // While current height > height at stack top
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      const distance = i - top - 1;
      const boundedHeight = Math.min(height[top], height[i]);
      totalWater += distance * (boundedHeight - height[top]);
    }

    stack.push(i);
  }

  return totalWater;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi phần tử được push/pop tối đa 2 lần
- **Space Complexity:** O(n) - cho stack

### Ưu điểm / Pros

- Tối ưu
- Dễ visualize

### Nhược điểm / Cons

- Tốn không gian stack
- Phức tạp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Prototype, input nhỏ       |
| Two Pointers         | O(n)  | O(1)  | Khó / Hard          | Cần tối ưu bộ nhớ          |
| Stack                | O(n)  | O(n)  | Khó / Hard          | Cần tối ưu, dễ visualize   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const result = trap_twoPointers(height);
const expected = 6;
console.log(result === expected); // true
```

### Test Case 2: Mảng ngắn / Short array

```javascript
const height = [4, 2, 0, 3, 2, 5];
const result = trap_twoPointers(height);
const expected = 9;
console.log(result === expected); // true
```

### Test Case 3: Mảng rỗng / Empty array

```javascript
const height = [];
const result = trap_twoPointers(height);
const expected = 0;
console.log(result === expected); // true
```

### Test Case 4: Tất cả bằng nhau / All equal

```javascript
const height = [5, 5, 5, 5];
const result = trap_twoPointers(height);
const expected = 0;
console.log(result === expected); // true
```

### Test Case 5: Tăng dần / Increasing

```javascript
const height = [1, 2, 3, 4, 5];
const result = trap_twoPointers(height);
const expected = 0;
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Two Pointers](../algorithms/patterns/two-pointers.md)
  - [Stack](../algorithms/data-structures/stack.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)
