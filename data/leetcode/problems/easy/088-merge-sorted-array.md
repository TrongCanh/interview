# Merge Sorted Array / Gộp mảng đã sắp xếp

> LeetCode 88 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 88
- **URL:** https://leetcode.com/problems/merge-sorted-array/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Two Pointers, Sorting
- **Tags:** Array, Two Pointers, Sorting
- **Thuật toán liên quan / Related Algorithms:** Array, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be **stored inside the array `nums1`**. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

**Example 1:**

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6].
```

**Example 2:**

```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

**Example 3:**

```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
```

**Constraints:**

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai mảng nums1 và nums2 đã được sắp xếp, với m và n là số phần tử thực tế
- **Output:** Gộp nums2 vào nums1, kết quả được lưu trong nums1 và được sắp xếp
- **Ràng buộc / Constraints:**
  - nums1 có độ dài m + n, trong đó m phần tử đầu là dữ liệu, n phần tử cuối là 0
  - nums2 có độ dài n
  - m, n từ 0 đến 200
- **Edge cases:**
  - nums2 rỗng (n = 0)
  - nums1 rỗng (m = 0)
  - Tất cả phần tử của nums1 nhỏ hơn nums2
  - Tất cả phần tử của nums2 nhỏ hơn nums1

### 2. Tư duy / Thinking Process

- Bước 1: Nếu gộp từ đầu, sẽ ghi đè các phần tử chưa được xử lý của nums1
- Bước 2: Tốt hơn là gộp từ cuối về đầu
- Bước 3: Dùng 3 con trỏ: i cho nums1 (từ m-1), j cho nums2 (từ n-1), k cho vị trí ghi (từ m+n-1)
- Bước 4: So sánh nums1[i] và nums2[j], ghi phần tử lớn hơn vào nums1[k]

### 3. Ví dụ minh họa / Examples

```
Example 1: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
- i = 2, j = 2, k = 5
- nums1[2]=3 vs nums2[2]=6 -> nums1[5]=6, j=1, k=4
- nums1[2]=3 vs nums2[1]=5 -> nums1[4]=5, j=0, k=3
- nums1[2]=3 vs nums2[0]=2 -> nums1[3]=3, i=1, k=2
- nums1[1]=2 vs nums2[0]=2 -> nums1[2]=2, j=-1, k=1 (hoặc i=0, k=1)
- j < 0, dừng
- Kết quả: [1,2,2,3,5,6]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sao chép nums2 vào cuối nums1, sau đó sort toàn bộ nums1.

### Thuật toán / Algorithm

1. Sao chép nums2 vào nums1 từ vị trí m
2. Sort nums1

### Code / Implementation

```javascript
/**
 * Merge Sorted Array - Giải pháp 1: Sort (Brute Force)
 * @param {number[]} nums1 - Mảng thứ nhất (có đủ chỗ)
 * @param {number} m - Số phần tử thực tế trong nums1
 * @param {number[]} nums2 - Mảng thứ hai
 * @param {number} n - Số phần tử trong nums2
 * @return {void} - Không trả về, thay đổi nums1 trực tiếp
 *
 * Time Complexity: O((m+n) log(m+n)) - sort
 * Space Complexity: O(log(m+n)) hoặc O(m+n) - tùy thuật toán sort
 */
function merge_bruteForce(nums1, m, nums2, n) {
  // Sao chép nums2 vào cuối nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Sort nums1
  nums1.sort((a, b) => a - b);
}

// Test
let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;
merge_bruteForce(nums1, m, nums2, n);
console.log(nums1); // [1,2,2,3,5,6]

nums1 = [1];
m = 1;
nums2 = [];
n = 0;
merge_bruteForce(nums1, m, nums2, n);
console.log(nums1); // [1]

nums1 = [0];
m = 0;
nums2 = [1];
n = 1;
merge_bruteForce(nums1, m, nums2, n);
console.log(nums1); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O((m+n) log(m+n)) - sort
- **Space Complexity:** O(log(m+n)) hoặc O(m+n)) - tùy thuật toán sort

### Ưu điểm / Pros

- Code rất đơn giản
- Dễ implement

### Nhược điểm / Cons

- Không tận dụng tính chất đã sắp xếp
- Chậm hơn so với các giải pháp khác

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 không tận dụng tính chất đã sắp xếp
- Điểm yếu của giải pháp 1? Sort toàn bộ mảng trong khi hai mảng đã được sắp xếp
- Cách tiếp cận mới? Sử dụng Two Pointers, gộp từ cuối về đầu

### Ý tưởng / Idea

Sử dụng Three Pointers: i cho nums1 (từ m-1), j cho nums2 (từ n-1), k cho vị trí ghi (từ m+n-1). So sánh nums1[i] và nums2[j], ghi phần tử lớn hơn vào nums1[k].

### Thuật toán / Algorithm

1. Khởi tạo i = m - 1, j = n - 1, k = m + n - 1
2. Trong khi i >= 0 và j >= 0:
   - Nếu nums1[i] >= nums2[j], set nums1[k] = nums1[i], i--
   - Ngược lại, set nums1[k] = nums2[j], j--
   - k--
3. Nếu còn phần tử trong nums2, sao chép vào nums1
4. (Không cần sao chép phần còn lại của nums1 vì đã ở đúng vị trí)

### Code / Implementation

```javascript
/**
 * Merge Sorted Array - Giải pháp 2: Two Pointers from End (Optimized)
 * @param {number[]} nums1 - Mảng thứ nhất (có đủ chỗ)
 * @param {number} m - Số phần tử thực tế trong nums1
 * @param {number[]} nums2 - Mảng thứ hai
 * @param {number} n - Số phần tử trong nums2
 * @return {void} - Không trả về, thay đổi nums1 trực tiếp
 *
 * Time Complexity: O(m + n) - duyệt qua cả hai mảng một lần
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function merge_twoPointers(nums1, m, nums2, n) {
  let i = m - 1; // Con trỏ cho nums1 (từ cuối về đầu)
  let j = n - 1; // Con trỏ cho nums2 (từ cuối về đầu)
  let k = m + n - 1; // Con trỏ cho vị trí ghi (từ cuối về đầu)

  // So sánh và gộp từ cuối về đầu
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Nếu còn phần tử trong nums2, sao chép vào nums1
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  // Không cần sao chép phần còn lại của nums1 vì đã ở đúng vị trí
}

// Test
nums1 = [1, 2, 3, 0, 0, 0];
m = 3;
nums2 = [2, 5, 6];
n = 3;
merge_twoPointers(nums1, m, nums2, n);
console.log(nums1); // [1,2,2,3,5,6]

nums1 = [1];
m = 1;
nums2 = [];
n = 0;
merge_twoPointers(nums1, m, nums2, n);
console.log(nums1); // [1]

nums1 = [0];
m = 0;
nums2 = [1];
n = 1;
merge_twoPointers(nums1, m, nums2, n);
console.log(nums1); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m + n) - duyệt qua cả hai mảng một lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Tối ưu về cả time và space
- Tận dụng tính chất đã sắp xếp
- Không ghi đè dữ liệu chưa được xử lý

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với giải pháp 1

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã tối ưu nhất
- Có thuật toán/pattern nào phù hợp hơn? Không cần, Two Pointers là tốt nhất

### Ý tưởng / Idea

Tối ưu hóa giải pháp 2 bằng cách xử lý edge cases một cách rõ ràng hơn. Nếu nums2 rỗng, không cần làm gì. Nếu nums1 rỗng, chỉ cần sao chép nums2 vào nums1.

### Thuật toán / Algorithm

1. Nếu n === 0, trả về (nums1 đã sẵn có kết quả)
2. Nếu m === 0, sao chép nums2 vào nums1 và trả về
3. Sử dụng Three Pointers như giải pháp 2

### Code / Implementation

```javascript
/**
 * Merge Sorted Array - Giải pháp 3: Optimized with Edge Cases (Advanced)
 * @param {number[]} nums1 - Mảng thứ nhất (có đủ chỗ)
 * @param {number} m - Số phần tử thực tế trong nums1
 * @param {number[]} nums2 - Mảng thứ hai
 * @param {number} n - Số phần tử trong nums2
 * @return {void} - Không trả về, thay đổi nums1 trực tiếp
 *
 * Time Complexity: O(m + n) - duyệt qua cả hai mảng một lần
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function merge_advanced(nums1, m, nums2, n) {
  // Edge case: nums2 rỗng
  if (n === 0) {
    return;
  }

  // Edge case: nums1 rỗng
  if (m === 0) {
    for (let i = 0; i < n; i++) {
      nums1[i] = nums2[i];
    }
    return;
  }

  let i = m - 1; // Con trỏ cho nums1
  let j = n - 1; // Con trỏ cho nums2
  let k = m + n - 1; // Con trỏ cho vị trí ghi

  // So sánh và gộp từ cuối về đầu
  while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] >= nums2[j] ? nums1[i--] : nums2[j--];
  }

  // Sao chép phần còn lại của nums2 (nếu có)
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
}

// Test
nums1 = [1, 2, 3, 0, 0, 0];
m = 3;
nums2 = [2, 5, 6];
n = 3;
merge_advanced(nums1, m, nums2, n);
console.log(nums1); // [1,2,2,3,5,6]

nums1 = [1];
m = 1;
nums2 = [];
n = 0;
merge_advanced(nums1, m, nums2, n);
console.log(nums1); // [1]

nums1 = [0];
m = 0;
nums2 = [1];
n = 1;
merge_advanced(nums1, m, nums2, n);
console.log(nums1); // [1]

nums1 = [4, 5, 6, 0, 0, 0];
m = 3;
nums2 = [1, 2, 3];
n = 3;
merge_advanced(nums1, m, nums2, n);
console.log(nums1); // [1,2,3,4,5,6]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(m + n) - duyệt qua cả hai mảng một lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Tối ưu về cả time và space
- Xử lý edge cases rõ ràng
- Code ngắn gọn và sạch

### Nhược điểm / Cons

- Cần hiểu về Two Pointers pattern

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time             | Space       | Độ khó / Difficulty | Khi nào dùng / When to use                 |
| -------------------- | ---------------- | ----------- | ------------------- | ------------------------------------------ |
| Sort (Brute Force)   | O((m+n)log(m+n)) | O(log(m+n)) | Dễ / Easy           | Code nhanh, không quan tâm hiệu suất       |
| Two Pointers         | O(m+n)           | O(1)        | Trung bình / Medium | Tối ưu nhất, tận dụng tính chất đã sắp xếp |
| Advanced             | O(m+n)           | O(1)        | Trung bình / Medium | Tối ưu nhất với edge cases rõ ràng         |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1_nums1 = [1, 2, 3, 0, 0, 0];
const input1_m = 3;
const input1_nums2 = [2, 5, 6];
const input1_n = 3;
const expected1 = [1, 2, 2, 3, 5, 6];
merge_twoPointers([...input1_nums1], input1_m, input1_nums2, input1_n);
console.log(
  `Input: nums1=${JSON.stringify(input1_nums1)}, m=${input1_m}, nums2=${JSON.stringify(input1_nums2)}, n=${input1_n}`,
);
console.log(`Expected: ${JSON.stringify(expected1)}`);
```

### Test Case 2: nums2 rỗng / nums2 Empty

```javascript
const input2_nums1 = [1];
const input2_m = 1;
const input2_nums2 = [];
const input2_n = 0;
const expected2 = [1];
merge_twoPointers([...input2_nums1], input2_m, input2_nums2, input2_n);
console.log(
  `Input: nums1=${JSON.stringify(input2_nums1)}, m=${input2_m}, nums2=${JSON.stringify(input2_nums2)}, n=${input2_n}`,
);
console.log(`Expected: ${JSON.stringify(expected2)}`);
```

### Test Case 3: nums1 rỗng / nums1 Empty

```javascript
const input3_nums1 = [0];
const input3_m = 0;
const input3_nums2 = [1];
const input3_n = 1;
const expected3 = [1];
merge_twoPointers([...input3_nums1], input3_m, input3_nums2, input3_n);
console.log(
  `Input: nums1=${JSON.stringify(input3_nums1)}, m=${input3_m}, nums2=${JSON.stringify(input3_nums2)}, n=${input3_n}`,
);
console.log(`Expected: ${JSON.stringify(expected3)}`);
```

### Test Case 4: Tất cả nums1 nhỏ hơn nums2 / All nums1 Smaller

```javascript
const input4_nums1 = [4, 5, 6, 0, 0, 0];
const input4_m = 3;
const input4_nums2 = [1, 2, 3];
const input4_n = 3;
const expected4 = [1, 2, 3, 4, 5, 6];
merge_twoPointers([...input4_nums1], input4_m, input4_nums2, input4_n);
console.log(
  `Input: nums1=${JSON.stringify(input4_nums1)}, m=${input4_m}, nums2=${JSON.stringify(input4_nums2)}, n=${input4_n}`,
);
console.log(`Expected: ${JSON.stringify(expected4)}`);
```

### Test Case 5: Tất cả nums2 nhỏ hơn nums1 / All nums2 Smaller

```javascript
const input5_nums1 = [1, 2, 3, 0, 0, 0];
const input5_m = 3;
const input5_nums2 = [4, 5, 6];
const input5_n = 3;
const expected5 = [1, 2, 3, 4, 5, 6];
merge_twoPointers([...input5_nums1], input5_m, input5_nums2, input5_n);
console.log(
  `Input: nums1=${JSON.stringify(input5_nums1)}, m=${input5_m}, nums2=${JSON.stringify(input5_nums2)}, n=${input5_n}`,
);
console.log(`Expected: ${JSON.stringify(expected5)}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Array:** [`../../algorithms/data-structures/array.md`](../../algorithms/data-structures/array.md)
- **Two Pointers:** [`../../algorithms/patterns/two-pointers.md`](../../algorithms/patterns/two-pointers.md)
- **Sorting:** [`../../algorithms/algorithms/sorting.md`](../../algorithms/algorithms/sorting.md)

---

## 💡 Tips & Tricks

1. **Gộp từ cuối về đầu:** Khi gộp hai mảng đã sắp xếp vào một mảng, gộp từ cuối về đầu để tránh ghi đè dữ liệu chưa được xử lý
2. **Three Pointers:** Sử dụng 3 con trỏ: 2 cho mảng nguồn, 1 cho mảng đích
3. **Edge Cases:** Luôn kiểm tra edge cases như mảng rỗng
4. **Tận dụng tính chất đã sắp xếp:** Khi hai mảng đã được sắp xếp, Two Pointers luôn là lựa chọn tốt nhất

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 88 - Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- [Two Pointers Pattern - LeetCode](https://leetcode.com/tag/two-pointers/)

---

_Last updated: 2025-02-03_
