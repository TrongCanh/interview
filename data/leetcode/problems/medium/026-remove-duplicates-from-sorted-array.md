# Remove Duplicates from Sorted Array / Xóa trùng lặp từ mảng đã sắp xếp

> LeetCode Problem 26 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 26
- **URL:** https://leetcode.com/problems/remove-duplicates-from-sorted-array/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array
- **Tags:** Array, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Return `k` after placing the final result in the first `k` slots of `nums`.

Do **not** allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**

```
Input: nums = [1,1,2]
Output: 5, nums = [1,2,_,2]
Explanation: Your function should return k = 2, and nums = [1,2,_,2].
```

**Example 2:**

```
Input: nums = [0,0,1,1,1,2,2,3,3]
Output: 7, nums = [0,1,2,3,_,_,_,_]
Explanation: Your function should return k = 7, and nums = [0,1,2,3,_,_,_,_].
```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

**Follow up:** Could you solve the problem with O(n) time complexity and O(1) extra space?

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên nums đã sắp xếp theo thứ tự không giảm
- **Output:** Số lượng phần tử duy nhất k, và mảng nums sau khi xóa trùng lặp
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 đến 3 \* 10^4
  - Giá trị phần tử: -100 đến 100
  - Mảng đã sắp xếp theo thứ tự không giảm
  - Không được cấp phát bộ nhớ thêm
- **Edge cases:**
  - Mảng rỗng
  - Mảng chỉ có 1 phần tử
  - Mảng không có trùng lặp
  - Mảng toàn bộ là cùng một giá trị

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - xóa trùng lặp từ mảng đã sắp xếp, giữ thứ tự
- Bước 2: Nhận thấy mảng đã sắp xếp, có thể dùng Two Pointers
- Bước 3: Với Two Pointers, dùng một pointer để duyệt qua mảng và một pointer để ghi đè giá trị

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [1,1,2]
Output: 5, nums = [1,2,_,2]
Explanation:
- Mảng ban đầu: [1,1,1,2]
- Sau khi xóa trùng: [1,2,_,2]
- k = 2 (có 2 phần tử duy nhất: 1 và 2)
- Dấu _ được dùng để đánh dấu vị trí đã xóa

Example 2:
Input: nums = [0,0,1,1,1,2,2,3,3]
Output: 7, nums = [0,1,2,3,_,_,_,_]
Explanation:
- Mảng ban đầu: [0,0,1,1,1,2,2,3,3]
- Sau khi xóa trùng: [0,1,2,3,_,_,_,_]
- k = 4 (có 4 phần tử duy nhất: 0, 1, 2, 3)
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng vòng lặp lồng nhau để tìm và xóa các phần tử trùng lặp. Với mỗi phần tử, kiểm tra xem nó đã xuất hiện trước chưa.

### Thuật toán / Algorithm

1. Khởi tạo k = 0
2. Dùng vòng lặp for với index i từ 0 đến nums.length - 1:
   - Giả sử nums[i] là phần tử duy nhất
   - Dùng vòng lặp for với index j từ 0 đến i - 1:
     - Nếu nums[j] == nums[i], tìm thấy trùng lặp
     - Nếu nums[j] != nums[i], không phải trùng lặp
3. Nếu nums[i] là duy nhất:
   - Tăng k
   - Nếu không phải duy nhất, đánh dấu \_ tại vị trí i

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted Array - Brute Force Solution
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {number} - Số lượng phần tử duy nhất
 */
function removeDuplicates_bruteForce(nums) {
  if (nums.length === 0) return 0;

  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    let isDuplicate = false;

    for (let j = 0; j < i; j++) {
      if (nums[j] === nums[i]) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      k++;
    } else {
      nums[i] = "_"; // Đánh dấu trùng lặp
    }
  }

  return k;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - hai vòng lặp lồng nhau
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tận dụng được tính chất đã sắp xếp của mảng
- Không dùng thêm bộ nhớ

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- Duyệt qua nhiều phần tử không cần thiết

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể dùng Two Pointers để tối ưu
- Điểm yếu của giải pháp 1? Duyệt qua nhiều phần tử không cần thiết
- Cách tiếp cận mới? Dùng Two Pointers để duyệt qua mảng 1 lần

### Ý tưởng / Idea

Sử dụng Two Pointers: một pointer (write) để ghi đè giá trị duy nhất, một pointer (read) để duyệt qua mảng và kiểm tra trùng lặp.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về 0
2. Khởi tạo k = 1 (phần tử đầu tiên luôn duy nhất)
3. Dùng vòng lặp while với read pointer từ 1 đến nums.length:
   - Nếu nums[read] != nums[read - 1]:
     - Không phải trùng lặp, ghi đè: nums[write] = nums[read]
     - Tăng write pointer
   - Ngược lại:
     - Phải trùng lặp, tăng read pointer
4. Trả về k

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted Array - Optimized Solution using Two Pointers
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {number} - Số lượng phần tử duy nhất
 */
function removeDuplicates_optimized(nums) {
  if (nums.length === 0) return 0;

  let write = 1; // Luôn ghi đè từ vị trí 1
  let k = 1; // Phần tử đầu tiên luôn duy nhất

  while (write < nums.length) {
    if (nums[write] !== nums[write - 1]) {
      // Không phải trùng lặp, ghi đè
      nums[write] = nums[write - 1];
      write++;
      k++;
    } else {
      // Phải trùng lặp, bỏ qua
      write++;
    }
  }

  return k;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Độ phức tạp thời gian tốt hơn nhiều
- Chỉ duyệt qua mảng 1 lần
- Tối ưu bộ nhớ

### Nhược điểm / Cons

- Cần hiểu rõ về Two Pointers
- Phức tạp hơn brute force

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là O(n), không thể tốt hơn
- Có thuật toán/pattern nào phù hợp hơn? Two Pointers pattern đã là tối ưu nhất

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu nhất cho bài toán này. Không thể cải thiện thêm về độ phức tạp thời gian.

### Thuật toán / Algorithm

Tương tự giải pháp 2.

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted Array - Advanced Solution (Same as Optimized)
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {number} - Số lượng phần tử duy nhất
 */
function removeDuplicates_advanced(nums) {
  if (nums.length === 0) return 0;

  let write = 1;
  let k = 1;

  while (write < nums.length) {
    if (nums[write] !== nums[write - 1]) {
      nums[write] = nums[write - 1];
      write++;
      k++;
    } else {
      write++;
    }
  }

  return k;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Tối ưu về cả thời gian và bộ nhớ
- Đáp ứng yêu cầu Follow-up

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ, dễ hiểu          |
| Optimized            | O(n)  | O(1)  | Trung bình / Medium | Tất cả trường hợp          |
| Advanced             | O(n)  | O(1)  | Trung bình / Medium | Tất cả trường hợp          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(removeDuplicates_bruteForce([1, 1, 2])); // Expected: 2
console.log(removeDuplicates_optimized([1, 1, 2])); // Expected: 2
console.log(removeDuplicates_advanced([1, 1, 2])); // Expected: 2
```

### Test Case 2: Nhiều trùng lặp

```javascript
console.log(removeDuplicates_bruteForce([0, 0, 1, 1, 1, 2, 2, 3, 3])); // Expected: 4
console.log(removeDuplicates_optimized([0, 0, 1, 1, 1, 2, 2, 3, 3])); // Expected: 4
console.log(removeDuplicates_advanced([0, 0, 1, 1, 1, 2, 2, 3, 3])); // Expected: 4
```

### Test Case 3: Không có trùng lặp

```javascript
console.log(removeDuplicates_bruteForce([1, 2, 3, 4, 5])); // Expected: 5
console.log(removeDuplicates_optimized([1, 2, 3, 4, 5])); // Expected: 5
console.log(removeDuplicates_advanced([1, 2, 3, 4, 5])); // Expected: 5
```

### Test Case 4: Mảng rỗng

```javascript
console.log(removeDuplicates_bruteForce([])); // Expected: 0
console.log(removeDuplicates_optimized([])); // Expected: 0
console.log(removeDuplicates_advanced([])); // Expected: 0
```

### Test Case 5: Chỉ 1 phần tử

```javascript
console.log(removeDuplicates_bruteForce([1])); // Expected: 1
console.log(removeDuplicates_optimized([1])); // Expected: 1
console.log(removeDuplicates_advanced([1])); // Expected: 1
```

### Test Case 6: Mảng lớn

```javascript
const largeArray = Array.from({ length: 100 }, (_, i) => i % 10); // [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,...]
console.log(removeDuplicates_optimized(largeArray)); // Expected: 10
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- [LeetCode Discuss](https://leetcode.com/problems/remove-duplicates-from-sorted-array/discuss/)
- [Two Pointers Pattern](../algorithms/patterns/two-pointers.md)

---

## 💬 Lời khuyên / Tips

- Luôn kiểm tra edge cases: mảng rỗng, 1 phần tử, không trùng lặp
- Với Two Pointers, write pointer luôn ghi đè giá trị duy nhất
- read pointer dùng để kiểm tra trùng lặp
- Dấu \_ được dùng để đánh dấu vị trí đã xóa
- Giải pháp Two Pointers là tối ưu nhất cho bài toán này

---

_Last updated: 2026-02-03_
