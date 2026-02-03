# Container With Most Water / Thùng Chứa Nước Nhiều Nhất

> LeetCode Problem 11 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 11
- **URL:** https://leetcode.com/problems/container-with-most-water/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Two Pointers, Greedy
- **Tags:** array, two-pointers, greedy
- **Thuật toán liên quan / Related Algorithms:** Array, Greedy
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

**Example 1:**

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**

```
Input: height = [1,1]
Output: 1
```

**Constraints:**

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng height, trong đó height[i] là độ cao của đường thẳng đứng tại vị trí i.
- **Output:** Diện tích lớn nhất của container được tạo bởi hai đường thẳng đứng và trục x.
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 2 đến 100,000
  - Giá trị mỗi phần tử: 0 đến 10,000
- **Edge cases:**
  - Mảng có 2 phần tử: diện tích = min(height[0], height[1]) \* 1
  - Mảng có phần tử bằng 0: không thể tạo container với phần tử đó

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu cách tính diện tích
  - Chọn hai đường thẳng đứng tại vị trí i và j (i < j)
  - Chiều rộng = j - i
  - Chiều cao = min(height[i], height[j])
  - Diện tích = chiều rộng × chiều cao

- **Bước 2:** Tư duy Brute Force
  - Kiểm tra tất cả các cặp (i, j) có thể
  - Tính diện tích cho mỗi cặp
  - Lưu diện tích lớn nhất
  - Vấn đề: O(n²) - quá chậm với n = 100,000

- **Bước 3:** Tư duy Two Pointers
  - Dùng hai con trỏ left và right ở hai đầu mảng
  - Tính diện tích cho cặp (left, right)
  - Di chuyển con trỏ bên cạnh có chiều cao thấp hơn
  - Tại sao? Vì nếu giữ con trỏ cao hơn, chiều rộng giảm nhưng chiều cao không tăng
  - Tiếp tục cho đến khi left >= right

### 3. Ví dụ minh họa / Examples

```
Example 1: height = [1,8,6,2,5,4,8,3,7]
Step by step:
- left=0, right=8: area = min(1,7) × 8 = 1 × 8 = 8, maxArea=8
  height[left]=1 < height[right]=7 → left++
- left=1, right=8: area = min(8,7) × 7 = 7 × 7 = 49, maxArea=49
  height[left]=8 > height[right]=7 → right--
- left=1, right=7: area = min(8,3) × 6 = 3 × 6 = 18, maxArea=49
  height[left]=8 > height[right]=3 → right--
- left=1, right=6: area = min(8,8) × 5 = 8 × 5 = 40, maxArea=49
  height[left]=8 == height[right]=8 → left++ (hoặc right--)
- left=2, right=6: area = min(6,8) × 4 = 6 × 4 = 24, maxArea=49
  height[left]=6 < height[right]=8 → left++
- left=3, right=6: area = min(2,8) × 3 = 2 × 3 = 6, maxArea=49
  height[left]=2 < height[right]=8 → left++
- left=4, right=6: area = min(5,8) × 2 = 5 × 2 = 10, maxArea=49
  height[left]=5 < height[right]=8 → left++
- left=5, right=6: area = min(4,8) × 1 = 4 × 1 = 4, maxArea=49
  height[left]=4 < height[right]=8 → left++
- left=6, right=6: left >= right, dừng
Kết quả: 49

Example 2: height = [1,1]
- left=0, right=1: area = min(1,1) × 1 = 1 × 1 = 1, maxArea=1
Kết quả: 1
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra tất cả các cặp (i, j) có thể, tính diện tích cho mỗi cặp và lưu diện tích lớn nhất.

### Thuật toán / Algorithm

1. Khởi tạo maxArea = 0
2. Với mỗi vị trí i từ 0 đến n-1:
   a. Với mỗi vị trí j từ i+1 đến n-1:
   b. Tính area = min(height[i], height[j]) × (j - i)
   c. Cập nhật maxArea = max(maxArea, area)
3. Trả về maxArea

### Code / Implementation

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
function solution1_bruteForce(height) {
  const n = height.length;
  let maxArea = 0;

  // Kiểm tra tất cả các cặp
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Tính diện tích
      const width = j - i;
      const h = Math.min(height[i], height[j]);
      const area = width * h;

      // Cập nhật diện tích lớn nhất
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - kiểm tra tất cả các cặp
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code dễ đọc
- Không cần tư duy phức tạp

### Nhược điểm / Cons

- Quá chậm với mảng lớn
- Time Limit Exceeded trên LeetCode
- Không tối ưu

---

## 🚀 Giải pháp 2: Two Pointers (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp Brute Force quá chậm O(n²), không chấp nhận được với n = 100,000.
- **Điểm yếu của giải pháp 1?** Kiểm tra lại các cặp đã xem xét nhiều lần.
- **Cách tiếp cận mới?** Sử dụng Two Pointers - bắt đầu từ hai đầu mảng và di chuyển về phía giữa.

### Ý tưởng / Idea

Dùng hai con trỏ left và right ở hai đầu mảng. Tính diện tích cho cặp (left, right), sau đó di chuyển con trỏ bên cạnh có chiều cao thấp hơn. Lý do: nếu giữ con trỏ cao hơn, chiều rộng giảm nhưng chiều cao không tăng, nên diện tích chắc chắn giảm.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = n-1, maxArea = 0
2. Trong khi left < right:
   a. Tính area = min(height[left], height[right]) × (right - left)
   b. Cập nhật maxArea = max(maxArea, area)
   c. Nếu height[left] < height[right]: left++
   d. Ngược lại: right--
3. Trả về maxArea

### Code / Implementation

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
function solution2_twoPointers(height) {
  const n = height.length;
  let left = 0;
  let right = n - 1;
  let maxArea = 0;

  while (left < right) {
    // Tính diện tích hiện tại
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;

    // Cập nhật diện tích lớn nhất
    maxArea = Math.max(maxArea, area);

    // Di chuyển con trỏ bên cạnh có chiều cao thấp hơn
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi con trỏ di chuyển tối đa n lần
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Tối ưu về thời gian
- Chấp nhận được trên LeetCode
- Code gọn và dễ hiểu

### Nhược điểm / Cons

- Tư duy Two Pointers cần thời gian để hiểu
- Không dễ thấy ngay tại sao thuật toán hoạt động

---

## ⚡ Giải pháp 3: Optimized Two Pointers (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp, giải pháp 2 đã tối ưu. Tuy nhiên, có thể tối ưu code hơn.
- **Có thuật toán/pattern nào phù hợp hơn?** Giữ nguyên Two Pointers nhưng rút gọn code.

### Ý tưởng / Idea

Giữ nguyên thuật toán Two Pointers nhưng rút gọn code để gọn hơn.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = n-1, maxArea = 0
2. Trong khi left < right:
   a. Tính area và cập nhật maxArea
   b. Di chuyển con trỏ có chiều cao thấp hơn
3. Trả về maxArea

### Code / Implementation

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
function solution3_optimizedTwoPointers(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, width * h);

    // Di chuyển con trỏ có chiều cao thấp hơn
    height[left] < height[right] ? left++ : right--;
  }

  return maxArea;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất gọn
- Hiệu suất tương đương giải pháp 2

### Nhược điểm / Cons

- Code khó đọc hơn giải pháp 2
- Không cải thiện về độ phức tạp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution   | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| ---------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force            | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ, cần nhanh        |
| Two Pointers           | O(n)  | O(1)  | Trung bình / Medium | Tối ưu thời gian           |
| Optimized Two Pointers | O(n)  | O(1)  | Trung bình / Medium | Code gọn                   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(solution1_bruteForce(height)); // Expected: 49
console.log(solution2_twoPointers(height)); // Expected: 49
console.log(solution3_optimizedTwoPointers(height)); // Expected: 49
```

### Test Case 2: Mảng có 2 phần tử

```javascript
const height = [1, 1];
console.log(solution1_bruteForce(height)); // Expected: 1
console.log(solution2_twoPointers(height)); // Expected: 1
console.log(solution3_optimizedTwoPointers(height)); // Expected: 1
```

### Test Case 3: Tăng dần

```javascript
const height = [1, 2, 1];
console.log(solution1_bruteForce(height)); // Expected: 2
console.log(solution2_twoPointers(height)); // Expected: 2
console.log(solution3_optimizedTwoPointers(height)); // Expected: 2
```

### Test Case 4: Có phần tử bằng 0

```javascript
const height = [4, 3, 2, 1, 4];
console.log(solution1_bruteForce(height)); // Expected: 16
console.log(solution2_twoPointers(height)); // Expected: 16
console.log(solution3_optimizedTwoPointers(height)); // Expected: 16
```

### Test Case 5: Mảng lớn

```javascript
const height = [1, 2, 4, 3];
console.log(solution2_twoPointers(height)); // Expected: 4
```

---

## 📚 Tài liệu tham khảo / References

- [Two Pointers](../../algorithms/patterns/two-pointers.md)
- [Array](../../algorithms/data-structures/array.md)
- [Greedy](../../algorithms/algorithms/greedy.md)
- [LeetCode Discuss](https://leetcode.com/problems/container-with-most-water/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=UuiTKBwPgAo)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn di chuyển con trỏ có chiều cao thấp hơn, không phải cao hơn
- **Tip 2:** Hiểu lý do: nếu giữ con trỏ cao hơn, chiều rộng giảm nhưng chiều cao không tăng
- **Tip 3:** Two Pointers là pattern quan trọng cho các bài toán về mảng
- **Lỗi thường gặp:** Di chuyển con trỏ sai (di chuyển con trỏ cao hơn thay vì thấp hơn)

---

_Last updated: 2026-02-03_
