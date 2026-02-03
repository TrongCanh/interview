# Median of Two Sorted Arrays / Trung vị của Hai Mảng Đã Sắp Xếp

> LeetCode Problem 4 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 4
- **URL:** https://leetcode.com/problems/median-of-two-sorted-arrays/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Array, Binary Search, Divide and Conquer
- **Tags:** Array, Binary Search, Divide and Conquer
- **Thuật toán liên quan / Related Algorithms:** Binary Search, Divide and Conquer, Array
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

**Example 1:**

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

**Example 2:**

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

**Constraints:**

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai mảng đã được sắp xếp `nums1` (độ dài m) và `nums2` (độ dài n)
- **Output:** Giá trị trung vị (median) của hai mảng khi được gộp lại
- **Ràng buộc / Constraints:**
  - Độ phức tạp thời gian phải là O(log(m+n))
  - Cả hai mảng đều đã được sắp xếp
  - Mảng có thể rỗng
- **Edge cases:**
  - Một trong hai mảng rỗng
  - Cả hai mảng rỗng (không thể theo constraints)
  - Mảng có độ dài bằng nhau hoặc khác nhau
  - Tổng số phần tử là số lẻ hoặc chẵn

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu khái niệm median - giá trị ở giữa khi sắp xếp. Nếu tổng số phần tử là lẻ, median là phần tử giữa. Nếu chẵn, median là trung bình của hai phần tử giữa.
- **Bước 2:** Cách tiếp cận đơn giản nhất là gộp hai mảng rồi tìm median, nhưng độ phức tạp là O(m+n), không thỏa yêu cầu O(log(m+n)).
- **Bước 3:** Vì yêu cầu O(log(m+n)), ta cần dùng Binary Search. Thay vì gộp mảng, ta tìm cách chia hai mảng thành hai phần sao cho mỗi phần có đúng số phần tử cần thiết.

### 3. Ví dụ minh họa / Examples

```
Example 1:
nums1 = [1, 3], nums2 = [2]
Tổng phần tử: 3 (lẻ)
Merged: [1, 2, 3]
Median: 2 (phần tử ở vị trí 1 - 0-indexed)

Example 2:
nums1 = [1, 2], nums2 = [3, 4]
Tổng phần tử: 4 (chẵn)
Merged: [1, 2, 3, 4]
Median: (2 + 3) / 2 = 2.5 (trung bình của phần tử vị trí 1 và 2)
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Gộp hai mảng thành một mảng đã sắp xếp, sau đó tìm median trực tiếp từ mảng đã gộp.

### Thuật toán / Algorithm

1. Gộp hai mảng nums1 và nums2 thành một mảng merged
2. Sắp xếp mảng merged (hoặc dùng merge như trong Merge Sort vì cả hai đã được sắp xếp)
3. Nếu tổng số phần tử là lẻ, trả về phần tử ở giữa
4. Nếu tổng số phần tử là chẵn, trả về trung bình của hai phần tử ở giữa

### Code / Implementation

```javascript
/**
 * Median of Two Sorted Arrays - Brute Force Solution
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Median of the two sorted arrays
 */
function findMedianSortedArrays_bruteForce(nums1, nums2) {
  // Merge two sorted arrays
  const merged = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  // Add remaining elements
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  // Find median
  const n = merged.length;
  if (n % 2 === 1) {
    return merged[Math.floor(n / 2)];
  } else {
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m + n) - cần duyệt qua tất cả phần tử của cả hai mảng
- **Space Complexity:** O(m + n) - cần lưu mảng merged

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement
- Không cần kiến thức phức tạp

### Nhược điểm / Cons

- Không thỏa yêu cầu O(log(m+n))
- Tốn thêm không gian bộ nhớ cho mảng merged

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force có độ phức tạp O(m+n), không thỏa yêu cầu O(log(m+n)).
- Điểm yếu của giải pháp 1? Phải duyệt qua tất cả phần tử.
- Cách tiếp cận mới? Sử dụng Binary Search để tìm vị trí chia cắt mà không cần gộp mảng.

### Ý tưởng / Idea

Thay vì gộp mảng, ta tìm cách chia hai mảng thành hai phần sao cho:

- Mọi phần tử ở phần bên trái đều nhỏ hơn hoặc bằng mọi phần tử ở phần bên phải
- Số phần tử ở phần bên trái bằng số phần tử ở phần bên phải (hoặc chênh lệch 1 nếu tổng số phần tử là lẻ)

Nếu ta tìm được vị trí chia cắt như vậy, median sẽ là:

- Nếu tổng phần tử lẻ: max(phần trái)
- Nếu tổng phần tử chẵn: (max(phần trái) + min(phải)) / 2

### Thuật toán / Algorithm

1. Đảm bảo nums1 luôn là mảng ngắn hơn (để binary search trên mảng ngắn hơn)
2. Binary Search trên nums1 để tìm vị trí chia cắt partitionX
3. partitionY = (total + 1) / 2 - partitionX
4. Kiểm tra xem partition có hợp lệ không:
   - maxLeftX <= minRightY
   - maxLeftY <= minRightX
5. Nếu hợp lệ, tính median
6. Nếu không, điều chỉnh binary search

### Code / Implementation

```javascript
/**
 * Median of Two Sorted Arrays - Optimized Solution (Binary Search)
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Median of the two sorted arrays
 */
function findMedianSortedArrays_optimized(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays_optimized(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    // Partition positions
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = half - partitionX;

    // Get the four boundary values
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];
    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    // Check if partition is correct
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // Found the correct partition
      if (total % 2 === 1) {
        return Math.max(maxLeftX, maxLeftY);
      } else {
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      }
    } else if (maxLeftX > minRightY) {
      // Move partitionX to the left
      right = partitionX - 1;
    } else {
      // Move partitionX to the right
      left = partitionX + 1;
    }
  }

  // This should never be reached
  throw new Error("Input arrays are not sorted");
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(min(m, n))) - binary search trên mảng ngắn hơn
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Thỏa yêu cầu O(log(m+n))
- Không tốn thêm không gian bộ nhớ
- Tối ưu cho mảng lớn

### Nhược điểm / Cons

- Phức tạp hơn để hiểu và implement
- Dễ mắc lỗi khi xử lý edge cases

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã đạt yêu cầu O(log(min(m,n))) và O(1) space.
- Có thuật toán/pattern nào phù hợp hơn? Đây là ứng dụng tối ưu của Binary Search và Divide and Conquer.

### Ý tưởng / Idea

Giải pháp này sử dụng cùng tư duy với giải pháp 2 nhưng được viết theo hướng Divide and Conquer rõ ràng hơn. Ta tìm k-th element trong hai mảng đã sắp xếp bằng cách loại bỏ một nửa phần tử không thể là k-th element ở mỗi bước.

### Thuật toán / Algorithm

1. Để tìm median, ta cần tìm element thứ (m+n+1)/2 và (m+n+2)/2
2. Để tìm k-th element:
   - So sánh phần tử giữa của mỗi mảng
   - Loại bỏ một nửa phần tử không thể là k-th element
   - Đệ quy với k đã giảm

### Code / Implementation

```javascript
/**
 * Median of Two Sorted Arrays - Advanced Solution (Divide and Conquer)
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} - Median of the two sorted arrays
 */
function findMedianSortedArrays_advanced(nums1, nums2) {
  const total = nums1.length + nums2.length;

  if (total % 2 === 1) {
    return findKthElement(nums1, nums2, Math.floor(total / 2) + 1);
  } else {
    const left = findKthElement(nums1, nums2, total / 2);
    const right = findKthElement(nums1, nums2, total / 2 + 1);
    return (left + right) / 2;
  }
}

/**
 * Find k-th element in two sorted arrays
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @param {number} k - The k-th element to find (1-indexed)
 * @return {number} - The k-th element
 */
function findKthElement(nums1, nums2, k) {
  const m = nums1.length;
  const n = nums2.length;

  // Ensure nums1 is the smaller array
  if (m > n) {
    return findKthElement(nums2, nums1, k);
  }

  // Base cases
  if (m === 0) {
    return nums2[k - 1];
  }
  if (k === 1) {
    return Math.min(nums1[0], nums2[0]);
  }

  // Divide k into two parts
  const i = Math.min(m, Math.floor(k / 2));
  const j = k - i;

  if (nums1[i - 1] < nums2[j - 1]) {
    // Discard nums1[0...i-1]
    return findKthElement(nums1.slice(i), nums2, k - i);
  } else {
    // Discard nums2[0...j-1]
    return findKthElement(nums1, nums2.slice(j), k - j);
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(m+n)) - mỗi bước giảm một nửa số phần tử
- **Space Complexity:** O(log(m+n)) - do đệ quy (có thể cải thiện thành O(1) với tail recursion)

### Ưu điểm / Pros

- Tư duy Divide and Conquer rõ ràng
- Dễ mở rộng để tìm k-th element bất kỳ

### Nhược điểm / Cons

- Sử dụng slice() tạo mảng mới, tốn bộ nhớ
- Đệ quy tốn stack space
- Không tối ưu bằng giải pháp 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution          | Time             | Space       | Độ khó / Difficulty | Khi nào dùng / When to use |
| ----------------------------- | ---------------- | ----------- | ------------------- | -------------------------- |
| Brute Force                   | O(m+n)           | O(m+n)      | Dễ / Easy           | Mảng nhỏ, prototype nhanh  |
| Optimized (Binary Search)     | O(log(min(m,n))) | O(1)        | Khó / Hard          | Mảng lớn, cần tối ưu       |
| Advanced (Divide and Conquer) | O(log(m+n))      | O(log(m+n)) | Khó / Hard          | Cần tìm k-th element       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums1 = [1, 3];
const nums2 = [2];
const expected = 2.0;
const result = findMedianSortedArrays_optimized(nums1, nums2);
console.log(Math.abs(result - expected) < 0.00001); // true
```

### Test Case 2: Tổng phần tử chẵn / Even total elements

```javascript
const nums1 = [1, 2];
const nums2 = [3, 4];
const expected = 2.5;
const result = findMedianSortedArrays_optimized(nums1, nums2);
console.log(Math.abs(result - expected) < 0.00001); // true
```

### Test Case 3: Một mảng rỗng / One empty array

```javascript
const nums1 = [];
const nums2 = [1];
const expected = 1.0;
const result = findMedianSortedArrays_optimized(nums1, nums2);
console.log(Math.abs(result - expected) < 0.00001); // true
```

### Test Case 4: Mảng có phần tử âm / Negative numbers

```javascript
const nums1 = [-5, 3, 6, 12, 15];
const nums2 = [-12, -10, -6, -3, 4, 10];
const expected = 3.0;
const result = findMedianSortedArrays_optimized(nums1, nums2);
console.log(Math.abs(result - expected) < 0.00001); // true
```

### Test Case 5: Mảng lớn / Large arrays

```javascript
const nums1 = Array.from({ length: 1000 }, (_, i) => i * 2);
const nums2 = Array.from({ length: 1000 }, (_, i) => i * 2 + 1);
const expected = 999.5;
const result = findMedianSortedArrays_optimized(nums1, nums2);
console.log(Math.abs(result - expected) < 0.00001); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Binary Search](../algorithms/algorithms/binary-search.md)
  - [Divide and Conquer](../algorithms/algorithms/divide-and-conquer.md)
  - [Array](../algorithms/data-structures/array.md)

- **Patterns liên quan:**
  - None
