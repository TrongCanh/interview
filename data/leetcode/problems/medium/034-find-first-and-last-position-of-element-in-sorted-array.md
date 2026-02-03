# Find First and Last Position of Element in Sorted Array / Tìm Vị Trí Đầu và Cuối của Phần Tử trong Mảng Đã Sắp Xếp

> LeetCode Problem 34 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 34
- **URL:** https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Binary Search
- **Tags:** Array, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Binary Search, Array
- **Patterns liên quan / Related Patterns:** Binary Search

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

**Example 2:**

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

**Example 3:**

```
Input: nums = [], target = 0
Output: [-1,-1]
```

**Constraints:**

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non-decreasing array.
- `-10^9 <= target <= 10^9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng đã được sắp xếp tăng dần và một giá trị target
- **Output:** Mảng 2 phần tử [vị trí đầu tiên, vị trí cuối cùng] của target, hoặc [-1, -1] nếu không tìm thấy
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 0 ≤ nums.length ≤ 10^5
  - Giá trị phần tử: -10^9 ≤ nums[i] ≤ 10^9
  - Mảng được sắp xếp không giảm (non-decreasing) - có thể có phần tử trùng lặp
  - Yêu cầu O(log n) runtime complexity
- **Edge cases:**
  - Mảng rỗng
  - Target không có trong mảng
  - Target chỉ xuất hiện 1 lần
  - Target xuất hiện nhiều lần liên tiếp
  - Target xuất hiện ở đầu hoặc cuối mảng

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm vị trí đầu và cuối của target
- **Bước 2:** Nhận thấy có thể dùng binary search để tìm vị trí đầu tiên
- **Bước 3:** Tương tự, dùng binary search để tìm vị trí cuối cùng

### 3. Ví dụ minh họa / Examples

```
Example 1: [5,7,7,8,8,10], target = 8
- Target 8 xuất hiện tại vị trí 3 và 4
- Output: [3, 4]

Example 2: [5,7,7,8,8,10], target = 6
- Target 6 không có trong mảng
- Output: [-1, -1]

Example 3: [], target = 0
- Mảng rỗng
- Output: [-1, -1]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua từng phần tử của mảng để tìm vị trí đầu và cuối của target.

### Thuật toán / Algorithm

1. Khởi tạo first = -1, last = -1
2. Duyệt qua từng phần tử từ đầu đến cuối:
   - Nếu phần tử bằng target và first = -1, cập nhật first = i
   - Nếu phần tử bằng target, cập nhật last = i
3. Trả về [first, last]

### Code / Implementation

```javascript
function searchRange_bruteForce(nums, target) {
  let first = -1;
  let last = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) {
        first = i;
      }
      last = i;
    }
  }

  return [first, last];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt toàn bộ mảng
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Dễ hiểu và implement
- Chắc chắn tìm thấy target nếu có trong mảng

### Nhược điểm / Cons

- Không đáp ứng yêu cầu O(log n)
- Không tận dụng tính chất mảng đã được sắp xếp

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Yêu cầu bài toán là O(log n)
- Điểm yếu của giải pháp 1? Không tận dụng tính chất mảng sorted
- Cách tiếp cận mới? Sử dụng binary search để tìm first và last position

### Ý tưởng / Idea

Sử dụng binary search modified để tìm vị trí đầu tiên và vị trí cuối cùng:

1. Tìm vị trí đầu tiên (leftmost) của target
2. Tìm vị trí cuối cùng (rightmost) của target
3. Trả về [leftmost, rightmost]

### Thuật toán / Algorithm

**Tìm vị trí đầu tiên:**

1. Khởi tạo left = 0, right = nums.length - 1, result = -1
2. Trong khi left <= right:
   - Tính mid = left + Math.floor((right - left) / 2)
   - Nếu nums[mid] === target:
     - result = mid
     - Tiếp tục tìm ở bên trái: right = mid - 1
   - Nếu nums[mid] < target: left = mid + 1
   - Nếu nums[mid] > target: right = mid - 1
3. Trả về result

**Tìm vị trí cuối cùng:**

1. Khởi tạo left = 0, right = nums.length - 1, result = -1
2. Trong khi left <= right:
   - Tính mid = left + Math.floor((right - left) / 2)
   - Nếu nums[mid] === target:
     - result = mid
     - Tiếp tục tìm ở bên phải: left = mid + 1
   - Nếu nums[mid] < target: left = mid + 1
   - Nếu nums[mid] > target: right = mid - 1
3. Trả về result

### Code / Implementation

```javascript
function searchRange_optimized(nums, target) {
  return [findFirstPosition(nums, target), findLastPosition(nums, target)];
}

function findFirstPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      // Tiếp tục tìm ở bên trái
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function findLastPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      // Tiếp tục tìm ở bên phải
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - 2 lần binary search
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Đáp ứng yêu cầu O(log n)
- Tận dụng tính chất mảng sorted
- Rất hiệu quả với mảng lớn

### Nhược điểm / Cons

- Cần viết 2 binary search function riêng biệt
- Code có thể được tối ưu hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể gộp 2 binary search thành 1 function generic
- Có thuật toán/pattern nào phù hợp hơn? Binary search with custom comparator

### Ý tưởng / Idea

Tạo một generic binary search function có thể tìm cả first và last position bằng cách truyền comparator function.

### Thuật toán / Algorithm

Tạo binary search generic với comparator:

- Comparator trả về -1 nếu cần tìm ở bên trái
- Comparator trả về 1 nếu cần tìm ở bên phải
- Comparator trả về 0 nếu tìm thấy

### Code / Implementation

```javascript
function searchRange_advanced(nums, target) {
  const first = binarySearch(nums, target, (mid, target) => {
    if (nums[mid] >= target) return -1; // Tìm ở bên trái
    return 1; // Tìm ở bên phải
  });

  // Nếu không tìm thấy target
  if (nums[first] !== target) {
    return [-1, -1];
  }

  const last = binarySearch(nums, target, (mid, target) => {
    if (nums[mid] > target) return -1; // Tìm ở bên trái
    return 1; // Tìm ở bên phải
  });

  return [first, last];
}

/**
 * Generic binary search với custom comparator
 * @param {number[]} nums - mảng đã sắp xếp
 * @param {number} target - giá trị cần tìm
 * @param {function} comparator - function so sánh, trả về -1, 0, hoặc 1
 * @returns {number} - vị trí tìm được
 */
function binarySearch(nums, target, comparator) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const cmp = comparator(mid, target);

    if (nums[mid] === target) {
      result = mid;
    }

    if (cmp === -1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}
```

Hoặc một cách tiếp cận khác với code structure rõ ràng hơn:

```javascript
function searchRange_advanced(nums, target) {
  const first = findLeftmost(nums, target);

  // Nếu không tìm thấy target
  if (first === -1) {
    return [-1, -1];
  }

  const last = findRightmost(nums, target);

  return [first, last];
}

/**
 * Tìm vị trí đầu tiên của target trong mảng đã sắp xếp
 * @param {number[]} nums - mảng đã sắp xếp tăng dần
 * @param {number} target - giá trị cần tìm
 * @returns {number} - vị trí đầu tiên của target, hoặc -1 nếu không tìm thấy
 */
function findLeftmost(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      // Tiếp tục tìm ở bên trái để tìm vị trí đầu tiên
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

/**
 * Tìm vị trí cuối cùng của target trong mảng đã sắp xếp
 * @param {number[]} nums - mảng đã sắp xếp tăng dần
 * @param {number} target - giá trị cần tìm
 * @returns {number} - vị trí cuối cùng của target, hoặc -1 nếu không tìm thấy
 */
function findRightmost(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;
      // Tiếp tục tìm ở bên phải để tìm vị trí cuối cùng
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - 2 lần binary search
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng
- Có thể tái sử dụng các helper functions

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | -------- | ----- | ------------------- | ------------------------------- |
| Brute Force          | O(n)     | O(1)  | Dễ / Easy           | Học tập, mảng nhỏ               |
| Optimized            | O(log n) | O(1)  | Trung bình / Medium | Production, đáp ứng yêu cầu     |
| Advanced             | O(log n) | O(1)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(searchRange_advanced([5, 7, 7, 8, 8, 10], 8)); // Expected: [3, 4]
console.log(searchRange_advanced([5, 7, 7, 8, 8, 10], 6)); // Expected: [-1, -1]
console.log(searchRange_advanced([], 0)); // Expected: [-1, -1]
```

### Test Case 2: Edge case

```javascript
// Target chỉ xuất hiện 1 lần
console.log(searchRange_advanced([1, 2, 3, 4, 5], 3)); // Expected: [2, 2]

// Target ở đầu mảng
console.log(searchRange_advanced([1, 1, 2, 3, 4], 1)); // Expected: [0, 1]

// Target ở cuối mảng
console.log(searchRange_advanced([1, 2, 3, 4, 4], 4)); // Expected: [3, 4]

// Mảng có 1 phần tử
console.log(searchRange_advanced([5], 5)); // Expected: [0, 0]
console.log(searchRange_advanced([5], 6)); // Expected: [-1, -1]
```

### Test Case 3: Phức tạp / Complex

```javascript
// Target xuất hiện nhiều lần liên tiếp
console.log(searchRange_advanced([2, 2, 2, 2, 2], 2)); // Expected: [0, 4]

// Mảng lớn
console.log(searchRange_advanced([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)); // Expected: [4, 4]

// Target với số âm
console.log(searchRange_advanced([-5, -3, -3, 0, 1, 2], -3)); // Expected: [1, 2]
```

---

## 📚 Tài liệu tham khảo / References

- [Array](../../algorithms/data-structures/array.md)
- [Binary Search](../../algorithms/algorithms/binary-search.md)
- [LeetCode Discuss](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Khi tìm first position, sau khi tìm thấy target, tiếp tục tìm ở bên trái
- **Tip 2:** Khi tìm last position, sau khi tìm thấy target, tiếp tục tìm ở bên phải
- **Tip 3:** Luôn kiểm tra kết quả first position trước khi tìm last position để tránh không cần thiết
- **Lỗi thường gặp và cách tránh:**
  - Quên tiếp tục tìm sau khi đã tìm thấy target
  - Sai điều kiện so sánh khi tìm first vs last position
  - Không xử lý trường hợp mảng rỗng
  - Dùng `mid = (left + right) / 2` có thể gây overflow - dùng `left + (right - left) / 2`

---

_Last updated: 2026-02-03_
