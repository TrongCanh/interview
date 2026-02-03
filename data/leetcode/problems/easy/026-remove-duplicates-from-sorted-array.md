# Remove Duplicates from Sorted Array

> LeetCode Problem 26 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 26
- **URL:** https://leetcode.com/problems/remove-duplicates-from-sorted-array/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Two Pointers
- **Tags:** Array, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Array
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates in-place such that each unique element appears only **once**. The relative order of the elements should be kept the same.
>
> Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
>
> **Custom Judge:**
> The judge will test your solution with the following code:
>
> ```
> int[] nums = [...]; // Input array
> int[] expectedNums = [...]; // The expected answer with correct length
>
> int k = removeDuplicates(nums); // Calls your implementation
>
> assert k == expectedNums.length;
> sort(nums, 0, k); // Sort the first k elements of nums
> for (int i = 0; i < actualLength; i++) {
>     assert nums[i] == expectedNums[i];
> }
> ```

**Example 1:**

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Example 2:**

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên đã được sắp xếp `nums`
- **Output:** Số lượng phần tử duy nhất `k`, mảng được sửa đổi in-place
- **Ràng buộc / Constraints:**
  - `1 <= nums.length <= 3 * 10^4`
  - `-100 <= nums[i] <= 100`
  - Mảng đã được sắp xếp theo thứ tự không giảm
  - Phải làm in-place với O(1) extra memory
- **Edge cases:**
  - Mảng có 1 phần tử
  - Tất cả phần tử giống nhau
  - Tất cả phần tử khác nhau

### 2. Tư duy / Thinking Process

- **Bước 1:** Dùng Two Pointers: một con trỏ duyệt, một con trỏ ghi vị trí phần tử duy nhất
- **Bước 2:** Con trỏ duyệt đi qua từng phần tử
- **Bước 3:** Khi tìm thấy phần tử mới (khác với phần tử trước đó), ghi vào vị trí con trỏ ghi

### 3. Ví dụ minh họa / Examples

```
Example 2: nums = [0,0,1,1,1,2,2,3,3,4]

Two Pointers:
- write = 0 (vị trí ghi phần tử duy nhất)
- read = 1 (vị trí duyệt)

Duyệt:
1. read=1: nums[1]=0 == nums[0]=0 → trùng → read++
2. read=2: nums[2]=1 != nums[0]=0 → mới → write=1, nums[1]=1, read++
3. read=3: nums[3]=1 == nums[1]=1 → trùng → read++
4. read=4: nums[4]=1 == nums[1]=1 → trùng → read++
5. read=5: nums[5]=2 != nums[1]=1 → mới → write=2, nums[2]=2, read++
6. read=6: nums[6]=2 == nums[2]=2 → trùng → read++
7. read=7: nums[7]=3 != nums[2]=2 → mới → write=3, nums[3]=3, read++
8. read=8: nums[8]=3 == nums[3]=3 → trùng → read++
9. read=9: nums[9]=4 != nums[3]=3 → mới → write=4, nums[4]=4, read++

Kết quả: nums = [0,1,2,3,4,2,2,3,3,4], k = 5
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Two Pointers: một con trỏ duyệt (read), một con trỏ ghi vị trí phần tử duy nhất (write).

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về 0
2. Khởi tạo write = 0
3. Duyệt read từ 1 đến cuối mảng:
   - Nếu nums[read] != nums[write]:
     - write++
     - nums[write] = nums[read]
4. Trả về write + 1

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted Array - Two Pointers Solution
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates_twoPointers(nums) {
  if (nums.length === 0) return 0;

  let write = 0;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write]) {
      write++;
      nums[write] = nums[read];
    }
  }

  return write + 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 biến con trỏ

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Hiệu quả về thời gian và không gian
- Làm in-place

### Nhược điểm / Cons

- Không có nhược điểm rõ rệt

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã là tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu
- Cách tiếp cận mới? Không có cách tiếp cận tốt hơn

### Ý tưởng / Idea

Giải pháp Two Pointers là tối ưu nhất. Tuy nhiên, có thể tối ưu code bằng cách:

- Dùng while thay vì for
- Tối ưu điều kiện kiểm tra

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted Array - Optimized Solution
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates_optimized(nums) {
  if (!nums || nums.length === 0) return 0;

  let write = 0;
  let read = 1;

  while (read < nums.length) {
    if (nums[read] !== nums[write]) {
      write++;
      nums[write] = nums[read];
    }
    read++;
  }

  return write + 1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rõ ràng hơn
- Tương tự giải pháp cơ bản

### Nhược điểm / Cons

- Tương tự giải pháp cơ bản

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
 * Remove Duplicates from Sorted Array - Functional Style
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates_functional(nums) {
  if (!nums || nums.length === 0) return 0;

  let write = 0;

  nums.forEach((num, read) => {
    if (read > 0 && num !== nums[write]) {
      write++;
      nums[write] = num;
    }
  });

  return write + 1;
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

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use          |
| -------------------- | ---- | ----- | ------------------- | ----------------------------------- |
| Two Pointers (for)   | O(n) | O(1)  | Dễ / Easy           | Code rõ ràng, dễ đọc                |
| Two Pointers (while) | O(n) | O(1)  | Dễ / Easy           | Cần điều kiện kiểm tra phức tạp hơn |
| Functional Style     | O(n) | O(1)  | Trung bình / Medium | Thích functional programming        |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums1 = [1, 1, 2];
const k1 = removeDuplicates_twoPointers(nums1);
console.log(k1, nums1.slice(0, k1)); // 2, [1, 2]
```

### Test Case 2: Nhiều phần tử trùng / Many duplicates

```javascript
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k2 = removeDuplicates_twoPointers(nums2);
console.log(k2, nums2.slice(0, k2)); // 5, [0, 1, 2, 3, 4]
```

### Test Case 3: Một phần tử / Single element

```javascript
const nums3 = [1];
const k3 = removeDuplicates_twoPointers(nums3);
console.log(k3, nums3.slice(0, k3)); // 1, [1]
```

### Test Case 4: Tất cả giống nhau / All same

```javascript
const nums4 = [1, 1, 1, 1];
const k4 = removeDuplicates_twoPointers(nums4);
console.log(k4, nums4.slice(0, k4)); // 1, [1]
```

### Test Case 5: Tất cả khác nhau / All different

```javascript
const nums5 = [1, 2, 3, 4];
const k5 = removeDuplicates_twoPointers(nums5);
console.log(k5, nums5.slice(0, k5)); // 4, [1, 2, 3, 4]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Array:** [`../algorithms/data-structures/array.md`](../algorithms/data-structures/array.md)
- **Two Pointers:** [`../algorithms/patterns/two-pointers.md`](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
- [Two Pointers Pattern](https://leetcode.com/tag/two-pointers/)

---

_Last updated: 2026-02-03_
