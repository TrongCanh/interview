# Rotate Array

> LeetCode Problem 189 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 189
- **URL:** https://leetcode.com/problems/rotate-array/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Math
- **Tags:** Array, Math
- **Thuật toán liên quan / Related Algorithms:** Array, Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.
>
> For example, if `k = 3`, the array `[1,2,3,4,5,6,7]` will be rotated to `[5,6,7,1,2,3,4]`.
>
> **Note:**
>
> - Try to come up with as many different algorithms as you can.
> - It is more challenging to come up with a solution with better than O(n^2) time complexity and O(1) extra space.

**Example 1:**

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation: rotate the array 3 steps to the right: [5,6,7,1,2,3,4]
```

**Example 2:**

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: rotate the array 2 steps to the right: [3,99,-1,-100]
```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= nums.length`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng nums và số nguyên k
- **Output:** Mảng nums đã được rotate k bước sang phải
- **Ràng buộc / Constraints:**
  - Rotate sang phải k bước
  - k không âm
- **Edge cases:**
  - k = 0 → không rotate
  - k = nums.length → quay về vị trí ban đầu
  - Mảng rỗng

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần rotate mảng sang phải k bước
- **Bước 2:** Có thể dùng cyclic replacement: element ở vị trí i sẽ chuyển đến vị trí (i + k) % n
- **Bước 3:** Hoặc dùng reverse portions

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3

Giải thích:
- k = 3, n = 7
- Vị trí mới: (i + k) % n
- 0 → (0 + 3) % 7 = 3
- 1 → (1 + 3) % 7 = 4
- 2 → (2 + 3) % 7 = 5
- 3 → (3 + 3) % 7 = 6
- 4 → (4 + 3) 7 = 0
- 5 → (5 + 3) % 7 = 1
- 6 → (6 + 3) % 7 = 2
- Kết quả: [5,6,7,1,2,3,4]

Output: [5,6,7,1,2,3,4]
```

```
Example 2:
Input: nums = [-1,-100,3,99], k = 2

Giải thích:
- k = 2, n = 4
- Vị trí mới: (i + k) % n
- 0 → (0 + 2) % 4 = 2
- 1 → (1 + 2) % 4 = 3
- 2 → (2 + 2) % 4 = 0
- 3 → (3 + 2) % 4 = 1
- Kết quả: [3,99,-1,-100]

Output: [3,99,-1,-100]
```

---

## 💡 Giải pháp 1: Cyclic Replacement (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng cyclic replacement: element ở vị trí i sẽ chuyển đến vị trí (i + k) % n. Lặp n lần.

### Thuật toán / Algorithm

1. Nếu k === 0 hoặc nums.length === 0, trả về nums
2. Tạo result copy của nums
3. Với i từ 0 đến n-1:
   - newPos = (i + k) % n
   - result[i] = result[newPos]
4. Trả về result

### Code / Implementation

```javascript
/**
 * Rotate Array - Cyclic Replacement Solution
 * @param {number[]} nums
 * @param {number} k
 * @return {void} - modify in place
 */
function rotate(nums, k) {
  const n = nums.length;

  if (k === 0 || n === 0) {
    return;
  }

  const result = [...nums];

  for (let i = 0; i < n; i++) {
    const newPos = (i + k) % n;
    result[i] = result[newPos];
  }

  // Copy result vào nums
  for (let i = 0; i < n; i++) {
    nums[i] = result[i];
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng n lần
- **Space Complexity:** O(n) - Lưu mảng result copy

### ưu điểm / Pros

- Dễ hiểu, dễ implement
- Code ngắn gọn

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho mảng copy
- Không đáp ứng yêu cầu O(1) extra space

---

## 🚀 Giải pháp 2: Reverse Portions (Cải tiến) / Reverse Portions Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 tốn O(n) space
- Điểm yếu của giải pháp 1? Tốn O(n) extra space
- Cách tiếp cận mới? Reverse các portions rồi kết hợp

### Ý tưởng / Idea

Reverse các portions của mảng:

- Reverse toàn bộ mảng
- Reverse k phần đầu
- Reverse n - k phần cuối
- Kết hợp: reverse(k đầu) + reverse(n - k phần cuối) + reverse(phần giữa)

### Thuật toán / Algorithm

1. Nếu k === 0 hoặc nums.length === 0, trả về
2. Reverse toàn bộ mảng
3. Reverse k phần đầu: nums[0:k]
4. Reverse n - k phần cuối: nums[n-k:]
5. Reverse phần giữa: nums[k:n-k]
6. Kết hợp: reverse(k đầu) + reverse(phần giữa) + reverse(n - k phần cuối)

### Code / Implementation

```javascript
/**
 * Rotate Array - Reverse Portions Solution
 * @param {number[]} nums
 * @param {number} k
 * @return {void} - modify in place
 */
function rotate_Reverse(nums, k) {
  const n = nums.length;

  if (k === 0 || n === 0) {
    return;
  }

  // Reverse toàn bộ mảng
  nums.reverse();

  // Reverse k phần đầu
  reverseRange(nums, 0, k);

  // Reverse n - k phần cuối
  reverseRange(nums, n - k, n);
}

/**
 * Reverse một đoạn của mảng
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 */
function reverseRange(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Reverse toàn bộ mảng
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)

### Nhược điểm / Cons

- Code phức tạp hơn giải pháp 1
- Khó hiểu hơn

---

## ⚡ Giải pháp 3: Juggling Algorithm (Nâng cao) / Juggling Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Juggling Algorithm
- Có thuật toán/pattern nào phù hợp hơn? O(n) time, O(1) space

### Ý tưởng / Idea

Dùng Juggling Algorithm: Duyệt qua mảng và di chuyển từng phần tử đến vị trí mới.

### Thuật toán / Algorithm

1. Nếu k === 0 hoặc nums.length === 0, trả về
2. Tính gcd = GCD(n, k)
3. Tính cycles = n / gcd
4. Với i từ 0 đến cycles-1:
   - Tính temp = nums[i]
   - Tính nextPos = (i + k) % n
   - nums[i] = nums[nextPos]
5. Trả về

### Code / Implementation

```javascript
/**
 * Rotate Array - Juggling Algorithm Solution
 * @param {number[]} nums
 * @param {number} k
 * @return {void} - modify in place
 */
function rotate_Juggling(nums, k) {
  const n = nums.length;

  if (k === 0 || n === 0) {
    return;
  }

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const cycles = n / gcd(n, k);

  for (let i = 0; i < cycles; i++) {
    const temp = nums[i];
    const nextPos = (i + k) % n;
    nums[i] = nums[nextPos];
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng cycles lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)
- Đáp ứng yêu cầu O(n) time, O(1) space

### Nhược điểm / Cons

- Code phức tạp nhất
- Khó hiểu hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Cyclic Replacement   | O(n) | O(n)  | Dễ / Easy           | Dễ hiểu, code ngắn         |
| Reverse Portions     | O(n) | O(1)  | Trung bình / Medium | O(1) space, nên dùng       |
| Juggling             | O(n) | O(1)  | Khó / Hard          | Tối ưu, đáp ứng yêu cầu    |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;
rotate(nums, k);
console.log(nums); // Expected: [5,6,7,1,2,3,4]
```

### Test Case 2: k = 2

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 2;
rotate(nums, k);
console.log(nums); // Expected: [3,4,5,6,7,1,2]
```

### Test Case 3: k = 4

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 4;
rotate(nums, k);
console.log(nums); // Expected: [5,6,7,1,2,3,4]
```

### Test Case 4: k = n (full rotation)

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 7;
rotate(nums, k);
console.log(nums); // Expected: [1,2,3,4,5,6,7]
```

### Test Case 5: k = 0 (no rotation)

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 0;
rotate(nums, k);
console.log(nums); // Expected: [1,2,3,4,5,6,7]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

---

## 💬 Lời khuyên / Tips

- **Juggling Algorithm:**
  - O(n) time, O(1) space - tối ưu
  - Dùng GCD để tính số cycles
  - Duyệt qua mảng cycles lần
- **Reverse Portions:**
  - O(n) time, O(1) space - nên dùng
  - Reverse các portions rồi kết hợp
- **Cyclic Replacement:**
  - Dễ hiểu nhưng tốn O(n) extra space
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp k = 0 hoặc n = 0
  - Với reverse portions, quên reverse đúng thứ tự
  - Với juggling, quên xử lý trường hợp k = n

---

_Last updated: 2026-02-03_
