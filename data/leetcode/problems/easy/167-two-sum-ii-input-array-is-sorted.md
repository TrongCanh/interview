# Two Sum II - Input Array Is Sorted

> LeetCode Problem 167 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 167
- **URL:** https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Two Pointers
- **Tags:** Array, Two Pointers, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Array, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.
>
> Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.
>
> The tests are generated such that there is exactly one solution. You may not use the same element twice.
>
> Your solution must use only constant extra space.

**Example 1:**

```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

**Example 2:**

```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 3 and 4 is 6. Therefore, index1 = 1, index2 = 3. We return [1, 3].
```

**Constraints:**

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- `-1000 <= target <= 1000`
- There is exactly one solution in the input.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng numbers đã được sắp xếp tăng dần và target
- **Output:** Mảng chứa 2 indices (1-indexed) của hai số có tổng bằng target
- **Ràng buộc / Constraints:**
  - Mảng đã được sắp xếp
  - Chỉ được dùng mỗi phần tử 1 lần
  - Phải dùng O(1) extra space
- **Edge cases:**
  - Mảng chỉ có 2 phần tử
  - Số âm
  - Target = 0

### 2. Tư duy / Thinking Process

- **Bước 1:** Vì mảng đã được sắp xếp, có thể dùng Two Pointers
- **Bước 2:** Left pointer từ đầu, right pointer từ cuối
- **Bước 3:** Di chuyển pointers dựa trên tổng so với target

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: numbers = [2,7,11,15], target = 9

Giải thích:
- left = 0 (value = 2), right = 3 (value = 15)
- sum = 2 + 15 = 17 > 9 → right--
- left = 0 (value = 2), right = 2 (value = 11)
- sum = 2 + 11 = 13 > 9 → right--
- left = 0 (value = 2), right = 1 (value = 7)
- sum = 2 + 7 = 9 = target ✓
- Trả về [1, 2] (1-indexed)

Output: [1, 2]
```

---

## 💡 Giải pháp 1: Two Pointers (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Two Pointers: left từ đầu, right từ cuối. Di chuyển dựa trên tổng so với target.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = numbers.length - 1
2. Trong khi left < right:
   - sum = numbers[left] + numbers[right]
   - Nếu sum === target, trả về [left + 1, right + 1]
   - Nếu sum < target, left++
   - Nếu sum > target, right--
3. Trả về [-1, -1] (không tìm thấy)

### Code / Implementation

```javascript
/**
 * Two Sum II - Input Array Is Sorted - Two Pointers Solution
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // Trả về 1-indexed
      return [left + 1, right + 1];
    } else if (sum < target) {
      // Cần tăng tổng, di chuyển left
      left++;
    } else {
      // Cần giảm tổng, di chuyển right
      right--;
    }
  }

  // Không tìm thấy (theo đề bài luôn có giải pháp)
  return [-1, -1];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi phần tử được duyệt tối đa 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 pointers

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Độ phức tạp bộ nhớ O(1)
- Code ngắn gọn

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Binary Search (Cải tiến) / Binary Search Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 đã tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu
- Cách tiếp cận mới? Có thể dùng Binary Search cho mỗi phần tử

### Ý tưởng / Idea

Với mỗi phần tử, dùng Binary Search để tìm phần tử còn lại cần thiết để đạt target.

### Thuật toán / Algorithm

1. Với i từ 0 đến n-1:
   - Tìm complement = target - numbers[i] dùng Binary Search trong [i+1, n-1]
   - Nếu tìm thấy, trả về [i+1, j+1] (1-indexed)
2. Trả về [-1, -1]

### Code / Implementation

```javascript
/**
 * Two Sum II - Input Array Is Sorted - Binary Search Solution
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum_BinarySearch(numbers, target) {
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    const complement = target - numbers[i];

    // Binary Search trong [i+1, n-1]
    let left = i + 1;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (numbers[mid] === complement) {
        // Trả về 1-indexed
        return [i + 1, mid + 1];
      } else if (numbers[mid] < complement) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return [-1, -1];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - Binary Search cho mỗi phần tử
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n log n)
- Độ phức tạp bộ nhớ O(1)

### Nhược điểm / Cons

- Độ phức tạp thời gian cao hơn Two Pointers
- Code phức tạp hơn

---

## ⚡ Giải pháp 3: Hash Map (Nâng cao) / Hash Map Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Hash Map
- Có thuật toán/pattern nào phù hợp hơn? Hash Map lookup O(1)

### Ý tưởng / Idea

Dùng Hash Map để lưu giá trị và index. Với mỗi phần tử, tìm complement trong Map.

### Thuật toán / Algorithm

1. Tạo Map để lưu value → index
2. Duyệt qua numbers:
   - complement = target - numbers[i]
   - Nếu Map có complement, trả về [Map.get(complement), i+1]
   - Thêm numbers[i] vào Map
3. Trả về [-1, -1]

### Code / Implementation

```javascript
/**
 * Two Sum II - Input Array Is Sorted - Hash Map Solution
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum_HashMap(numbers, target) {
  const numToIndex = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    if (numToIndex.has(complement)) {
      // Trả về 1-indexed
      return [numToIndex.get(complement) + 1, i + 1];
    }

    numToIndex.set(numbers[i], i);
  }

  return [-1, -1];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi phần tử được duyệt đúng 1 lần
- **Space Complexity:** O(n) - Lưu Map với n phần tử

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Code ngắn gọn

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Map
- Không đáp ứng yêu cầu O(1) extra space

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---------- | ----- | ------------------- | -------------------------- |
| Two Pointers         | O(n)       | O(1)  | Dễ / Easy           | Tối ưu, nên dùng           |
| Binary Search        | O(n log n) | O(1)  | Trung bình / Medium | Mảng đã sắp xếp            |
| Hash Map             | O(n)       | O(n)  | Dễ / Easy           | Không cần mảng sắp xếp     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const numbers = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(numbers, target)); // Expected: [1, 2]
console.log(twoSum_BinarySearch(numbers, target)); // Expected: [1, 2]
```

### Test Case 2: Mảng nhỏ / Small Array

```javascript
const numbers = [2, 3, 4];
const target = 6;
console.log(twoSum(numbers, target)); // Expected: [1, 3]
console.log(twoSum_BinarySearch(numbers, target)); // Expected: [1, 3]
```

### Test Case 3: Có số âm / With Negative Numbers

```javascript
const numbers = [-5, -3, 0, 2, 4, 6];
const target = 1;
console.log(twoSum(numbers, target)); // Expected: [2, 3] (indices of -3 and 4)
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)
  - [Binary Search](../algorithms/algorithms/binary-search.md)

- **Bài toán liên quan:**
  - [Two Sum (Problem 1)](./001-two-sum.md)

---

## 💬 Lời khuyên / Tips

- **Two Pointers Approach:**
  - Left từ đầu, right từ cuối
  - Di chuyển dựa trên tổng so với target
  - O(n) time, O(1) space - tối ưu
- **Binary Search:**
  - Tìm complement dùng Binary Search
  - O(n log n) time
- **Lỗi thường gặp:**
  - Quên trả về 1-indexed indices
  - Quên điều kiện dừng vòng lặp (left < right)
  - Với binary search, sai phạm vi tìm kiếm

---

_Last updated: 2026-02-03_
