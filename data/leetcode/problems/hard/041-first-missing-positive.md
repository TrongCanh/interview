# First Missing Positive / Số dương đầu tiên bị thiếu

> LeetCode Problem 41 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 41
- **URL:** https://leetcode.com/problems/first-missing-positive/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Array, Hash Table, Sorting
- **Tags:** Array, Hash Table, Sorting
- **Thuật toán liên quan / Related Algorithms:** Array, Hash Table, Sorting
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an unsorted integer array `nums`, return the **smallest missing positive integer**.

You must implement an algorithm that runs in **O(n) time** and uses **O(1) auxiliary space**.

**Example 1:**

```
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all present in the array.
```

**Example 2:**

```
Input: nums = [3,4,-1,1]
Output: 2
Explanation: The number 1 is missing from the range [1,2,3,4].
```

**Example 3:**

```
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên chưa được sắp xếp
- **Output:** Số dương nhỏ nhất bị thiếu
- **Ràng buộc / Constraints:**
  - Độ phức tạp thời gian: O(n)
  - Độ phức tạp không gian phụ trợ: O(1)
- **Edge cases:**
  - Mảng rỗng
  - Tất cả số âm
  - Số từ 1 đến n đều có
  - Mảng có số trùng lặp

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm số dương nhỏ nhất không có trong mảng.
- **Bước 2:** Có thể dùng Hash Set để lưu các số, nhưng tốn O(n) không gian.
- **Bước 3:** Có thể dùng kỹ thuật "place number at its index" để đạt O(1) không gian.

### 3. Ví dụ minh họa / Examples

```
Example: nums = [3,4,-1,1]

Với Hash Set:
- Tạo set = {3,4,-1,1}
- Kiểm tra từ 1: 1 có, 2 không có
- Kết quả: 2

Với O(1) Space:
- Bước 1: [-1,3,4,1] -> không hợp lệ (số âm ở vị trí 0)
- Bước 2: [1,-1,3,4] -> hợp lệ (nums[0]=1)
- Bước 3: [1,-1,3,4] -> không hợp lệ (nums[1]=-1)
- Bước 4: [1,3,-1,4] -> hợp lệ (nums[1]=3)
- Bước 5: [1,3,4,-1] -> không hợp lệ (nums[3]=-1)
- Bước 6: [1,3,-1,4] -> hợp lệ (nums[3]=4)
- nums[4] = -1, không hợp lệ
- Kết quả: nums[0] = 1, nums[1] = -1, nums[2] = 3, nums[3] = 4, nums[4] = -1
- Vị trí đầu tiên không hợp lệ là 1, nên kết quả là 2
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sắp xếp mảng, sau đó tìm số dương đầu tiên bị thiếu.

### Thuật toán / Algorithm

1. Sắp xếp mảng
2. Duyệt qua mảng đã sắp xếp
3. Tìm số dương đầu tiên không khớp với vị trí + 1

### Code / Implementation

```javascript
/**
 * First Missing Positive - Sorting Solution
 * @param {number[]} nums - Input array
 * @return {number} - First missing positive
 */
function firstMissingPositive_sorting(nums) {
  nums.sort((a, b) => a - b);

  let expected = 1;
  for (const num of nums) {
    if (num === expected) {
      expected++;
    } else if (num > expected) {
      return expected;
    }
  }

  return expected;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - do sắp xếp
- **Space Complexity:** O(1) hoặc O(n) - tùy thuật toán sắp xếp

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Không thỏa O(n)
- Sắp xếp tốn thời gian

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Sorting không thỏa O(n).
- Điểm yếu của giải pháp 1? Sắp xếp tốn O(n log n).
- Cách tiếp cận mới? Sử dụng Hash Set để đạt O(n).

### Ý tưởng / Idea

Sử dụng Hash Set để lưu các số dương, sau đó tìm số nhỏ nhất không có trong set.

### Thuật toán / Algorithm

1. Tạo Hash Set với các số dương trong mảng
2. Bắt đầu từ 1, kiểm tra từng số
3. Trả về số đầu tiên không có trong set

### Code / Implementation

```javascript
/**
 * First Missing Positive - Hash Set Solution
 * @param {number[]} nums - Input array
 * @return {number} - First missing positive
 */
function firstMissingPositive_hashSet(nums) {
  const numSet = new Set();

  // Add all positive numbers to set
  for (const num of nums) {
    if (num > 0) {
      numSet.add(num);
    }
  }

  // Find first missing positive
  let result = 1;
  while (numSet.has(result)) {
    result++;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi phần tử được duyệt một lần
- **Space Complexity:** O(n) - cho Hash Set

### Ưu điểm / Pros

- Tối ưu thời gian
- Đơn giản

### Nhược điểm / Cons

- Tốn O(n) không gian phụ trợ

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng kỹ thuật "place number at its index".
- Có thuật toán/pattern nào phù hợp hơn? Đây là bài toán kinh điển với O(1) space.

### Ý tưởng / Idea

Sử dụng kỹ thuật "place number at its index": nếu số x nằm trong khoảng [1, n], đặt nums[x-1] = x. Sau đó, vị trí đầu tiên không hợp lệ là kết quả.

### Thuật toán / Algorithm

1. Bước 1: Đặt mỗi số x trong khoảng [1, n] vào vị trí x-1
2. Bước 2: Tìm vị trí đầu tiên không hợp lệ (nums[i] != i+1)
3. Trả về i+1

### Code / Implementation

```javascript
/**
 * First Missing Positive - O(1) Space Solution
 * @param {number[]} nums - Input array
 * @return {number} - First missing positive
 */
function firstMissingPositive_optimized(nums) {
  const n = nums.length;

  // Step 1: Place each number in its right position
  for (let i = 0; i < n; i++) {
    // Only consider positive numbers in range [1, n]
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const temp = nums[i];
      nums[i] = nums[temp - 1];
      nums[temp - 1] = temp;
    }
  }

  // Step 2: Find first position where nums[i] != i + 1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // All numbers 1 to n are present
  return n + 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi phần tử được duyệt tối đa 2 lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Thỏa O(n) thời gian
- Thỏa O(1) không gian phụ trợ

### Nhược điểm / Cons

- Phức tạp để hiểu
- Dễ mắc lỗi với vòng lặp while

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---------- | ----- | ------------------- | -------------------------- |
| Sorting              | O(n log n) | O(1)  | Dễ / Easy           | Prototype, không cần O(n)  |
| Hash Set             | O(n)       | O(n)  | Trung bình / Medium | Cần O(n), dễ hiểu          |
| Optimized            | O(n)       | O(1)  | Khó / Hard          | Cần O(n) và O(1) space     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [1, 2, 0];
const result = firstMissingPositive_optimized(nums);
const expected = 3;
console.log(result === expected); // true
```

### Test Case 2: Số âm / Negative numbers

```javascript
const nums = [3, 4, -1, 1];
const result = firstMissingPositive_optimized(nums);
const expected = 2;
console.log(result === expected); // true
```

### Test Case 3: Số lớn / Large numbers

```javascript
const nums = [7, 8, 9, 11, 12];
const result = firstMissingPositive_optimized(nums);
const expected = 1;
console.log(result === expected); // true
```

### Test Case 4: Mảng rỗng / Empty array

```javascript
const nums = [];
const result = firstMissingPositive_optimized(nums);
const expected = 1;
console.log(result === expected); // true
```

### Test Case 5: Số trùng lặp / Duplicate numbers

```javascript
const nums = [1, 1, 2, 2];
const result = firstMissingPositive_optimized(nums);
const expected = 3;
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Sorting](../algorithms/algorithms/sorting.md)

- **Patterns liên quan:**
  - None
