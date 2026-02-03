# Remove Element

> LeetCode Problem 27 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 27
- **URL:** https://leetcode.com/problems/remove-element/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Two Pointers
- **Tags:** Array, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Array
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.
>
> **Custom Judge:**
> The judge will test your solution with the following code:
>
> ```
> int[] nums = [...]; // Input array
> int val = ...; // Value to remove
> int[] expectedNums = [...]; // The expected answer with correct length.
>                           // It is sorted with no values equaling val.
>
> int k = removeElement(nums, val); // Calls your implementation
>
> assert k == expectedNums.length;
> sort(nums, 0, k); // Sort the first k elements of nums
> for (int i = 0; i < actualLength; i++) {
>     assert nums[i] == expectedNums[i];
> }
> ```

**Example 1:**

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Example 2:**

```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên `nums` và giá trị cần xóa `val`
- **Output:** Số lượng phần tử không bằng `val`, mảng được sửa đổi in-place
- **Ràng buộc / Constraints:**
  - `0 <= nums.length <= 100`
  - `0 <= nums[i] <= 50`
  - `0 <= val <= 100`
  - Phải làm in-place với O(1) extra memory
- **Edge cases:**
  - Mảng rỗng
  - Tất cả phần tử đều bằng val
  - Không có phần tử nào bằng val

### 2. Tư duy / Thinking Process

- **Bước 1:** Dùng Two Pointers: một con trỏ duyệt, một con trỏ ghi vị trí phần tử hợp lệ
- **Bước 2:** Con trỏ duyệt đi qua từng phần tử
- **Bước 3:** Khi tìm thấy phần tử khác val, ghi vào vị trí con trỏ ghi

### 3. Ví dụ minh họa / Examples

```
Example 2: nums = [0,1,2,2,3,0,4,2], val = 2

Two Pointers:
- write = 0 (vị trí ghi phần tử hợp lệ)
- read = 0 (vị trí duyệt)

Duyệt:
1. read=0: nums[0]=0 != 2 → hợp lệ → nums[write]=0, write++, read++
2. read=1: nums[1]=1 != 2 → hợp lệ → nums[write]=1, write++, read++
3. read=2: nums[2]=2 == 2 → không hợp lệ → read++
4. read=3: nums[3]=2 == 2 → không hợp lệ → read++
5. read=4: nums[4]=3 != 2 → hợp lệ → nums[write]=3, write++, read++
6. read=5: nums[5]=0 != 2 → hợp lệ → nums[write]=0, write++, read++
7. read=6: nums[6]=4 != 2 → hợp lệ → nums[write]=4, write++, read++
8. read=7: nums[7]=2 == 2 → không hợp lệ → read++

Kết quả: nums = [0,1,3,0,4,0,4,2], k = 5
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Two Pointers: một con trỏ duyệt (read), một con trỏ ghi vị trí phần tử hợp lệ (write).

### Thuật toán / Algorithm

1. Khởi tạo write = 0
2. Duyệt read từ 0 đến cuối mảng:
   - Nếu nums[read] != val:
     - nums[write] = nums[read]
     - write++
3. Trả về write

### Code / Implementation

```javascript
/**
 * Remove Element - Two Pointers Solution
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement_twoPointers(nums, val) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== val) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 biến con trỏ

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Hiệu quả về thời gian và không gian
- Làm in-place
- Giữ nguyên thứ tự của các phần tử

### Nhược điểm / Cons

- Không tối ưu khi hầu hết phần tử đều bằng val

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Khi hầu hết phần tử đều bằng val, giải pháp 1 vẫn phải copy nhiều lần
- Điểm yếu của giải pháp 1? Copy không cần thiết khi gặp phần tử hợp lệ
- Cách tiếp cận mới? Dùng Two Pointers từ 2 đầu

### Ý tưởng / Idea

Dùng Two Pointers từ 2 đầu: left duyệt từ đầu, right duyệt từ cuối. Khi left gặp val, đổi chỗ với phần tử ở right.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = nums.length - 1
2. Duyệt khi left <= right:
   - Nếu nums[left] == val:
     - Đổi chỗ nums[left] và nums[right]
     - right--
   - Ngược lại:
     - left++
3. Trả về left

### Code / Implementation

```javascript
/**
 * Remove Element - Two Pointers from Both Ends
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement_twoPointersBothEnds(nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }

  return left;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi phần tử được xử lý tối đa 1 lần
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Tối ưu khi hầu hết phần tử đều bằng val
- Ít thao tác copy hơn

### Nhược điểm / Cons

- Không giữ nguyên thứ tự của các phần tử
- Code hơi phức tạp hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp Two Pointers đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp Two Pointers là tối ưu nhất. Tuy nhiên, có thể viết code theo functional programming style.

### Code / Implementation

```javascript
/**
 * Remove Element - Functional Style
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement_functional(nums, val) {
  let write = 0;

  nums.forEach((num, read) => {
    if (num !== val) {
      nums[write] = num;
      write++;
    }
  });

  return write;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code declarative hơn

### Nhược điểm / Cons

- forEach có thể chậm hơn for trong một số trường hợp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution     | Time | Space | Giữ thứ tự / Preserves Order | Độ khó / Difficulty | Khi nào dùng / When to use               |
| ------------------------ | ---- | ----- | ---------------------------- | ------------------- | ---------------------------------------- |
| Two Pointers (one-way)   | O(n) | O(1)  | Có / Yes                     | Dễ / Easy           | Cần giữ thứ tự, ít phần tử bằng val      |
| Two Pointers (both ends) | O(n) | O(1)  | Không / No                   | Trung bình / Medium | Nhiều phần tử bằng val, không cần thứ tự |
| Functional Style         | O(n) | O(1)  | Có / Yes                     | Trung bình / Medium | Thích functional programming             |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums1 = [3, 2, 2, 3];
const k1 = removeElement_twoPointers(nums1, 3);
console.log(k1, nums1.slice(0, k1)); // 2, [2, 2]
```

### Test Case 2: Nhiều phần tử cần xóa / Many elements to remove

```javascript
const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
const k2 = removeElement_twoPointers(nums2, 2);
console.log(k2, nums2.slice(0, k2)); // 5, [0, 1, 3, 0, 4]
```

### Test Case 3: Mảng rỗng / Empty array

```javascript
const nums3 = [];
const k3 = removeElement_twoPointers(nums3, 0);
console.log(k3, nums3.slice(0, k3)); // 0, []
```

### Test Case 4: Tất cả phần tử đều bằng val / All elements equal val

```javascript
const nums4 = [3, 3, 3, 3];
const k4 = removeElement_twoPointersBothEnds(nums4, 3);
console.log(k4, nums4.slice(0, k4)); // 0, []
```

### Test Case 5: Không có phần tử nào bằng val / No element equals val

```javascript
const nums5 = [1, 2, 3, 4];
const k5 = removeElement_twoPointers(nums5, 5);
console.log(k5, nums5.slice(0, k5)); // 4, [1, 2, 3, 4]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Array:** [`../algorithms/data-structures/array.md`](../algorithms/data-structures/array.md)
- **Two Pointers:** [`../algorithms/patterns/two-pointers.md`](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Remove Element](https://leetcode.com/problems/remove-element/)
- [Two Pointers Pattern](https://leetcode.com/tag/two-pointers/)

---

_Last updated: 2026-02-03_
