# Remove Element / Xóa phần tử

> LeetCode Problem 27 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 27
- **URL:** https://leetcode.com/problems/remove-element/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array
- **Tags:** Array, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in-place and return the new length.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

The order of the elements may be changed. It doesn't matter what you leave beyond the new length.

**Example 1:**

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,3]
```

**Example 2:**

```
Input: nums = [0,1,2,2,3], val = 2
Output: 2, nums = [0,1,_,2,3]
```

**Constraints:**

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

**Follow up:** Could you minimize the total number of operations?

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên nums và giá trị val cần xóa
- **Output:** Độ dài mới của mảng sau khi xóa tất cả phần tử có giá trị val
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 0 đến 100
  - Giá trị phần tử: 0 đến 50
  - Giá trị val: 0 đến 100
  - Không được cấp phát bộ nhớ thêm
- **Edge cases:**
  - Mảng rỗng
  - Mảng không có phần tử nào bằng val
  - Mảng toàn bộ là val
  - Mảng chỉ có 1 phần tử bằng val

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - xóa tất cả phần tử có giá trị val khỏi mảng, in-place
- Bước 2: Nhận thấy có thể dùng Two Pointers để tối ưu số lượng thao tác
- Bước 3: Với Two Pointers, dùng một pointer (write) để ghi đè giá trị mới, một pointer (read) để duyệt qua mảng

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,3]
Explanation:
- Mảng ban đầu: [3,2,2,3]
- Xóa tất cả phần tử có giá trị 3
- Kết quả: [2,2,_,3]
- k = 2 (độ dài mới)
- Dấu _ được dùng để đánh dấu vị trí đã xóa

Example 2:
Input: nums = [0,1,2,2,3], val = 2
Output: 2, nums = [0,1,_,2,3]
Explanation:
- Mảng ban đầu: [0,1,2,2,3]
- Xóa tất cả phần tử có giá trị 2
- Kết quả: [0,1,_,2,3]
- k = 2 (độ dài mới)
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng vòng lặp for để duyệt qua mảng, mỗi lần gặp phần tử bằng val, tăng k và ghi đè giá trị mới. Sau đó dùng vòng lặp for thứ hai để xóa các phần tử dư thừa.

### Thuật toán / Algorithm

1. Khởi tạo k = 0
2. Dùng vòng lặp for đầu tiên để ghi đè:
   - Duyệt qua từng phần tử nums[i]
   - Nếu nums[i] == val, bỏ qua (đã xóa)
   - Nếu nums[i] != val, ghi đè: nums[k] = nums[i], k++
3. Dùng vòng lặp for thứ hai để xóa phần tử dư:
   - Duyệt từ k đến nums.length - 1
   - Gán nums[i] = nums[i + 1] (dịch chuyển các phần tử)
4. Trả về k

### Code / Implementation

```javascript
/**
 * Remove Element - Brute Force Solution
 * @param {number[]} nums - Mảng số nguyên
 * @param {number} val - Giá trị cần xóa
 * @return {number} - Độ dài mới của mảng
 */
function removeElement_bruteForce(nums, val) {
  let k = 0;

  // Vòng lặp 1: ghi đè giá trị mới
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }

  // Vòng lặp 2: xóa phần tử dư
  for (let i = k; i < nums.length; i++) {
    nums[i] = nums[i + 1];
  }

  return k;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 2 vòng lặp qua mảng
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tận dụng được tính chất in-place
- Không dùng thêm bộ nhớ

### Nhược điểm / Cons

- Cần 2 vòng lặp qua mảng
- Không tối ưu số lượng thao tác

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể dùng Two Pointers để tối ưu thành 1 vòng lặp
- Điểm yếu của giải pháp 1? Cần 2 vòng lặp, số lượng thao tác nhiều
- Cách tiếp cận mới? Dùng Two Pointers để ghi đè và xóa trong 1 vòng lặp

### Ý tưởng / Idea

Sử dụng Two Pointers: một pointer (write) để ghi đè giá trị mới, một pointer (read) để duyệt qua mảng. Khi gặp phần tử bằng val, ghi đè và di chuyển cả hai pointer.

### Thuật toán / Algorithm

1. Khởi tạo write = 0, read = 0
2. Dùng vòng lặp while với điều kiện read < nums.length:
   - Nếu nums[read] == val:
     - Ghi đè: nums[write] = nums[read]
     - Tăng write
   - Nếu nums[read] != val:
     - Ghi đè: nums[write] = nums[read]
     - Tăng write
   - Tăng read
3. Trả về write

### Code / Implementation

```javascript
/**
 * Remove Element - Optimized Solution using Two Pointers
 * @param {number[]} nums - Mảng số nguyên
 * @param {number} val - Giá trị cần xóa
 * @return {number} - Độ dài mới của mảng
 */
function removeElement_optimized(nums, val) {
  let write = 0;
  let read = 0;

  while (read < nums.length) {
    if (nums[read] === val) {
      nums[write++] = nums[read];
    } else {
      nums[write++] = nums[read];
    }
    read++;
  }

  return write;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 1 vòng lặp qua mảng
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Chỉ cần 1 vòng lặp qua mảng
- Tối ưu số lượng thao tác
- Code ngắn gọn hơn brute force

### Nhược điểm / Cons

- Cần hiểu rõ về Two Pointers
- Phức tạp hơn brute force về độ khó

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu nhất cho bài toán này
- Có thuật toán/pattern nào phù hợp hơn? Two Pointers pattern đã là tối ưu nhất

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu nhất cho bài toán này, không thể cải thiện thêm về độ phức tạp thời gian. Có thể thêm giải pháp tối ưu về số lượng thao tác cho Follow-up.

### Thuật toán / Algorithm

Tương tự giải pháp 2 nhưng thêm biến đếm số lượng ghi đè để tối ưu cho Follow-up.

### Code / Implementation

```javascript
/**
 * Remove Element - Advanced Solution with Operation Count
 * @param {number[]} nums - Mảng số nguyên
 * @param {number} val - Giá trị cần xóa
 * @return {number} - Độ dài mới của mảng
 */
function removeElement_advanced(nums, val) {
  let write = 0;
  let read = 0;
  let operations = 0; // Đếm số lượng thao tác

  while (read < nums.length) {
    if (nums[read] === val) {
      nums[write++] = nums[read];
      operations++; // Đếm ghi đè
    } else {
      nums[write++] = nums[read];
      operations++; // Đếm ghi đè
    }
    read++;
  }

  return write;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 1 vòng lặp qua mảng
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Tối ưu cho Follow-up
- Đếm được số lượng thao tác
- Tương đương hiệu năng với giải pháp 2

### Nhược điểm / Cons

- Tốn thêm biến để đếm
- Không cải thiện về độ phức tạp thời gian

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n) | O(1)  | Dễ / Easy           | Mảng nhỏ, dễ hiểu          |
| Optimized            | O(n) | O(1)  | Trung bình / Medium | Tất cả trường hợp          |
| Advanced             | O(n) | O(1)  | Khó / Hard          | Cần tối ưu số thao tác     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(removeElement_bruteForce([3, 2, 2, 3], 3)); // Expected: 2
console.log(removeElement_optimized([3, 2, 2, 3], 3)); // Expected: 2
console.log(removeElement_advanced([3, 2, 2, 3], 3)); // Expected: 2
```

### Test Case 2: Nhiều phần tử bằng val

```javascript
console.log(removeElement_bruteForce([0, 1, 2, 2, 3], 2)); // Expected: 2
console.log(removeElement_optimized([0, 1, 2, 2, 3], 2)); // Expected: 2
console.log(removeElement_advanced([0, 1, 2, 2, 3], 2)); // Expected: 2
```

### Test Case 3: Không có phần tử nào bằng val

```javascript
console.log(removeElement_bruteForce([1, 2, 3], 3)); // Expected: 3
console.log(removeElement_optimized([1, 2, 3], 3)); // Expected: 3
console.log(removeElement_advanced([1, 2, 3], 3)); // Expected: 3
```

### Test Case 4: Mảng toàn bộ là val

```javascript
console.log(removeElement_bruteForce([3, 3, 3], 3)); // Expected: 0
console.log(removeElement_optimized([3, 3, 3], 3)); // Expected: 0
console.log(removeElement_advanced([3, 3, 3], 3)); // Expected: 0
```

### Test Case 5: Mảng rỗng

```javascript
console.log(removeElement_bruteForce([], 3)); // Expected: 0
console.log(removeElement_optimized([], 3)); // Expected: 0
console.log(removeElement_advanced([], 3)); // Expected: 0
```

### Test Case 6: Mảng lớn

```javascript
const largeArray = Array.from({ length: 100 }, (_, i) => i % 10); // [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,...]
console.log(removeElement_optimized(largeArray, 5)); // Expected: 90
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

- [LeetCode Remove Element](https://leetcode.com/problems/remove-element/)
- [LeetCode Discuss](https://leetcode.com/problems/remove-element/discuss/)
- [Two Pointers Pattern](../algorithms/patterns/two-pointers.md)

---

## 💬 Lời khuyên / Tips

- Luôn kiểm tra edge cases: mảng rỗng, không có phần tử bằng val
- Với Two Pointers, write pointer luôn ghi đè giá trị mới
- read pointer dùng để duyệt qua mảng
- Đảm bảo điều kiện dừng vòng lặp đúng (read < nums.length)
- Với Follow-up, đếm số lượng thao tác để tối ưu
- Vẽ hình để visualize movement của hai pointer

---

_Last updated: 2026-02-03_
