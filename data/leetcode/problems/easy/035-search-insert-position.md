# Search Insert Position

> LeetCode Problem 35 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 35
- **URL:** https://leetcode.com/problems/search-insert-position/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Binary Search
- **Tags:** Array, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Binary Search
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a sorted array of distinct integers `nums` and a target value `target`, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
>
> You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

**Example 2:**

```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

**Example 3:**

```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

**Example 4:**

```
Input: nums = [1,3,5,6], target = 0
Output: 0
```

**Example 5:**

```
Input: nums = [1], target = 0
Output: 0
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên đã được sắp xếp `nums` và giá trị `target`
- **Output:** Chỉ số của `target` nếu tìm thấy, hoặc chỉ số chèn nếu không tìm thấy
- **Ràng buộc / Constraints:**
  - `1 <= nums.length <= 10^4`
  - `-10^4 <= nums[i] <= 10^4`
  - `nums` chứa các giá trị phân biệt và được sắp xếp theo thứ tự tăng
  - `-10^4 <= target <= 10^4`
  - Phải có độ phức tạp thời gian O(log n)
- **Edge cases:**
  - `target` nhỏ hơn tất cả phần tử
  - `target` lớn hơn tất cả phần tử
  - `target` nằm giữa các phần tử
  - `target` bằng một phần tử

### 2. Tư duy / Thinking Process

- **Bước 1:** Vì mảng đã được sắp xếp và yêu cầu O(log n), dùng Binary Search
- **Bước 2:** Dùng hai con trỏ left và right để thu hẹp phạm vi tìm kiếm
- **Bước 3:** Khi tìm thấy `target`, trả về chỉ số
- **Bước 4:** Khi không tìm thấy, trả về left (vị trí chèn)

### 3. Ví dụ minh họa / Examples

```
Example 2: nums = [1,3,5,6], target = 2

Binary Search:
- left = 0, right = 3
- mid = 1, nums[1] = 3
  - 3 > 2 → right = mid - 1 = 0
- left = 0, right = 0
- mid = 0, nums[0] = 1
  - 1 < 2 → left = mid + 1 = 1
- left = 1, right = 0 → left > right → dừng

Output: 1 (vị trí chèn của 2)
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua mảng và tìm vị trí chèn. Không đáp ứng yêu cầu O(log n).

### Thuật toán / Algorithm

1. Duyệt qua mảng
2. Nếu tìm thấy phần tử bằng target, trả về chỉ số
3. Nếu phần tử lớn hơn target, trả về chỉ số hiện tại
4. Nếu duyệt hết mảng mà không tìm thấy, trả về độ dài mảng

### Code / Implementation

```javascript
/**
 * Search Insert Position - Linear Search (NOT O(log n))
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert_linear(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }
  return nums.length;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Dễ hiểu, dễ implement

### Nhược điểm / Cons

- Không đáp ứng yêu cầu O(log n)

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Yêu cầu O(log n)
- Điểm yếu của giải pháp 1? Độ phức tạp thời gian O(n)
- Cách tiếp cận mới? Dùng Binary Search

### Ý tưởng / Idea

Dùng Binary Search để tìm vị trí chèn. Khi không tìm thấy target, trả về left.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = nums.length - 1
2. Duyệt khi left <= right:
   - Tính mid = Math.floor((left + right) / 2)
   - Nếu nums[mid] == target, trả về mid
   - Nếu nums[mid] < target, left = mid + 1
   - Nếu nums[mid] > target, right = mid - 1
3. Trả về left (vị trí chèn)

### Code / Implementation

```javascript
/**
 * Search Insert Position - Binary Search
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert_binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Binary Search
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Đáp ứng yêu cầu O(log n)
- Hiệu quả với mảng lớn

### Nhược điểm / Cons

- Code phức tạp hơn Linear Search

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp Binary Search đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp Binary Search là tối ưu nhất. Tuy nhiên, có thể tối ưu code bằng cách:

- Dùng bit shift thay vì Math.floor
- Tối ưu điều kiện kiểm tra

### Code / Implementation

```javascript
/**
 * Search Insert Position - Optimized Binary Search
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert_optimized(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1; // Bit shift thay vì Math.floor

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn
- Bit shift có thể nhanh hơn Math.floor trong một số trường hợp

### Nhược điểm / Cons

- Bit shift ít rõ ràng hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution    | Time     | Space | Đáp ứng O(log n) / Meets O(log n) | Độ khó / Difficulty | Khi nào dùng / When to use         |
| ----------------------- | -------- | ----- | --------------------------------- | ------------------- | ---------------------------------- |
| Linear Search           | O(n)     | O(1)  | Không / No                        | Dễ / Easy           | Mảng nhỏ, không quan tâm hiệu năng |
| Binary Search           | O(log n) | O(1)  | Có / Yes                          | Trung bình / Medium | Mảng lớn, cần hiệu quả             |
| Optimized Binary Search | O(log n) | O(1)  | Có / Yes                          | Trung bình / Medium | Cần tối ưu hiệu năng               |

---

## 🧪 Test Cases

### Test Case 1: Tìm thấy / Found

```javascript
console.log(searchInsert_binarySearch([1, 3, 5, 6], 5)); // 2
```

### Test Case 2: Chèn giữa / Insert in middle

```javascript
console.log(searchInsert_binarySearch([1, 3, 5, 6], 2)); // 1
```

### Test Case 3: Chèn cuối / Insert at end

```javascript
console.log(searchInsert_binarySearch([1, 3, 5, 6], 7)); // 4
```

### Test Case 4: Chèn đầu / Insert at beginning

```javascript
console.log(searchInsert_binarySearch([1, 3, 5, 6], 0)); // 0
```

### Test Case 5: Mảng 1 phần tử / Single element array

```javascript
console.log(searchInsert_binarySearch([1], 0)); // 0
console.log(searchInsert_binarySearch([1], 1)); // 0
console.log(searchInsert_binarySearch([1], 2)); // 1
```

### Test Case 6: Số âm / Negative numbers

```javascript
console.log(searchInsert_binarySearch([-3, -1, 0, 2, 4], -2)); // 1
console.log(searchInsert_binarySearch([-3, -1, 0, 2, 4], 3)); // 4
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Binary Search:** [`../algorithms/algorithms/binary-search.md`](../algorithms/algorithms/binary-search.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [Binary Search - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

---

_Last updated: 2026-02-03_
