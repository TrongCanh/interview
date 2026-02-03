# Search in Rotated Sorted Array / Tìm Kiếm trong Mảng Đã Xoay

> LeetCode Problem 33 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 33
- **URL:** https://leetcode.com/problems/search-in-rotated-sorted-array/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Binary Search
- **Tags:** Array, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Binary Search, Array
- **Patterns liên quan / Related Patterns:** Binary Search

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**

```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:**

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are unique.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng đã được xoay (rotated) và một giá trị target cần tìm
- **Output:** Chỉ số của target trong mảng, hoặc -1 nếu không tìm thấy
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 5000
  - Giá trị phần tử: -10^4 ≤ nums[i] ≤ 10^4
  - Tất cả giá trị là duy nhất (không trùng lặp)
  - Mảng ban đầu được sắp xếp tăng dần, sau đó có thể được xoay
  - Yêu cầu O(log n) runtime complexity
- **Edge cases:**
  - Mảng có 1 phần tử
  - Mảng không được xoay (vẫn tăng dần)
  - Target nằm ở phần đã xoay hoặc chưa xoay

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu cấu trúc của mảng đã xoay - có 2 phần tăng dần
- **Bước 2:** Nhận thấy có thể dùng modified binary search
- **Bước 3:** Xác định cách xác định target nằm ở phần nào của mảng

### 3. Ví dụ minh họa / Examples

```
Example 1: [4,5,6,7,0,1,2], target = 0
- Mảng được xoay tại pivot 3: [4,5,6,7] + [0,1,2]
- Target 0 nằm ở phần thứ 2
- Binary search modified sẽ tìm thấy tại index 4

Example 2: [4,5,6,7,0,1,2], target = 3
- Target 3 không có trong mảng
- Trả về -1

Example 3: [1], target = 0
- Mảng chỉ có 1 phần tử là 1
- Target 0 không có trong mảng
- Trả về -1
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua từng phần tử của mảng và so sánh với target.

### Thuật toán / Algorithm

1. Duyệt qua từng phần tử từ đầu đến cuối
2. Nếu phần tử bằng target, trả về chỉ số
3. Nếu duyệt hết mà không tìm thấy, trả về -1

### Code / Implementation

```javascript
function search_bruteForce(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
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
- Không tận dụng tính chất mảng đã được sắp xếp và xoay

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Yêu cầu bài toán là O(log n)
- Điểm yếu của giải pháp 1? Không tận dụng tính chất mảng sorted rotated
- Cách tiếp cận mới? Sử dụng modified binary search

### Ý tưởng / Idea

Sử dụng binary search modified cho mảng đã xoay:

1. Tìm phần tử giữa (mid)
2. Xác định nửa trái hay nửa phải được sắp xếp
3. Kiểm tra target có nằm trong phần được sắp xếp không
4. Thu hẹp phạm vi tìm kiếm

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = nums.length - 1
2. Trong khi left <= right:
   - Tính mid = left + Math.floor((right - left) / 2)
   - Nếu nums[mid] === target, trả về mid
   - Xác định nửa trái hay nửa phải được sắp xếp:
     - Nếu nums[left] <= nums[mid]: nửa trái được sắp xếp
       - Nếu target nằm trong [nums[left], nums[mid]), right = mid - 1
       - Ngược lại, left = mid + 1
     - Ngược lại: nửa phải được sắp xếp
       - Nếu target nằm trong (nums[mid], nums[right]], left = mid + 1
       - Ngược lại, right = mid - 1
3. Trả về -1 nếu không tìm thấy

### Code / Implementation

```javascript
function search_optimized(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Xác định nửa nào được sắp xếp
    if (nums[left] <= nums[mid]) {
      // Nửa trái được sắp xếp
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Nửa phải được sắp xếp
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - binary search
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Đáp ứng yêu cầu O(log n)
- Tận dụng tính chất mảng sorted rotated
- Rất hiệu quả với mảng lớn

### Nhược điểm / Cons

- Logic phức tạp hơn brute force
- Cần hiểu rõ cấu trúc mảng rotated

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Đây là modified binary search chuẩn

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function search_advanced(nums, target) {
  return binarySearchRotated(nums, target, 0, nums.length - 1);
}

/**
 * Binary search trên mảng đã xoay
 * @param {number[]} nums - mảng đã xoay
 * @param {number} target - giá trị cần tìm
 * @param {number} left - chỉ số trái
 * @param {number} right - chỉ số phải
 * @returns {number} - chỉ số của target hoặc -1
 */
function binarySearchRotated(nums, target, left, right) {
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Kiểm tra nửa trái có được sắp xếp không
    if (isLeftHalfSorted(nums, left, mid)) {
      // Kiểm tra target có nằm trong nửa trái không
      if (isTargetInLeftHalf(nums, target, left, mid)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Nửa phải được sắp xếp
      // Kiểm tra target có nằm trong nửa phải không
      if (isTargetInRightHalf(nums, target, mid, right)) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

/**
 * Kiểm tra nửa trái có được sắp xếp không
 * @param {number[]} nums - mảng
 * @param {number} left - chỉ số trái
 * @param {number} mid - chỉ số giữa
 * @returns {boolean}
 */
function isLeftHalfSorted(nums, left, mid) {
  return nums[left] <= nums[mid];
}

/**
 * Kiểm tra target có nằm trong nửa trái không
 * @param {number[]} nums - mảng
 * @param {number} target - giá trị cần tìm
 * @param {number} left - chỉ số trái
 * @param {number} mid - chỉ số giữa
 * @returns {boolean}
 */
function isTargetInLeftHalf(nums, target, left, mid) {
  return target >= nums[left] && target < nums[mid];
}

/**
 * Kiểm tra target có nằm trong nửa phải không
 * @param {number[]} nums - mảng
 * @param {number} target - giá trị cần tìm
 * @param {number} mid - chỉ số giữa
 * @param {number} right - chỉ số phải
 * @returns {boolean}
 */
function isTargetInRightHalf(nums, target, mid, right) {
  return target > nums[mid] && target <= nums[right];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn giải pháp 2
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
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 0)); // Expected: 4
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 3)); // Expected: -1
console.log(search_advanced([1], 0)); // Expected: -1
```

### Test Case 2: Edge case

```javascript
// Mảng không được xoay
console.log(search_advanced([1, 2, 3, 4, 5], 3)); // Expected: 2

// Target ở đầu mảng
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 4)); // Expected: 0

// Target ở cuối mảng
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 2)); // Expected: 6
```

### Test Case 3: Phức tạp / Complex

```javascript
// Mảng lớn
console.log(search_advanced([6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 3)); // Expected: 7

// Target ở phần đã xoay
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 1)); // Expected: 5

// Target ở phần chưa xoay
console.log(search_advanced([4, 5, 6, 7, 0, 1, 2], 6)); // Expected: 2
```

---

## 📚 Tài liệu tham khảo / References

- [Array](../../algorithms/data-structures/array.md)
- [Binary Search](../../algorithms/algorithms/binary-search.md)
- [LeetCode Discuss](https://leetcode.com/problems/search-in-rotated-sorted-array/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Mảng rotated có 2 phần tăng dần, luôn có 1 nửa được sắp xếp
- **Tip 2:** Binary search modified là giải pháp chuẩn cho bài toán này
- **Tip 3:** Cẩn thận với điều kiện so sánh - cần kiểm tra cả >= và <=
- **Lỗi thường gặp và cách tránh:**
  - Quên kiểm tra cả 2 nửa của mảng
  - Sai điều kiện so sánh khi xác định target nằm ở phần nào
  - Không xử lý trường hợp mảng không được xoay
  - Dùng `mid = (left + right) / 2` có thể gây overflow - dùng `left + (right - left) / 2`

---

_Last updated: 2026-02-03_
