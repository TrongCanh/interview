# Single Number

> LeetCode Problem 136 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 136
- **URL:** https://leetcode.com/problems/single-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Bit Manipulation
- **Tags:** Array, Bit Manipulation
- **Thuật toán liên quan / Related Algorithms:** Array, Bit Manipulation
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a **non-empty** array of integers `nums` where every element appears **twice** except for one. Find that single one.
>
> You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

```
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**

```
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**

```
Input: nums = [1]
Output: 1
```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which appears once.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng nums, mỗi phần tử xuất hiện 2 lần trừ 1 phần tử
- **Output:** Số nguyên - phần tử xuất hiện 1 lần
- **Ràng buộc / Constraints:**
  - Mảng không rỗng
  - Mỗi phần tử xuất hiện 2 lần trừ 1
  - Phải có độ phức tạp O(n) và O(1) space
- **Edge cases:**
  - Mảng chỉ có 1 phần tử
  - Số âm
  - Số lớn

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm phần tử xuất hiện 1 lần
- **Bước 2:** Có thể dùng Hash Map để đếm
- **Bước 3:** Hoặc dùng XOR bit manipulation

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [2,2,1]

Giải thích:
- 2 xuất hiện 2 lần
- 1 xuất hiện 1 lần
Output: 1
```

```
Example 2:
Input: nums = [4,1,2,1,2]

Giải thích:
- 1 xuất hiện 2 lần
- 2 xuất hiện 2 lần
- 4 xuất hiện 1 lần
Output: 4
```

---

## 💡 Giải pháp 1: Hash Map (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Hash Map để đếm số lần xuất hiện của từng phần tử, sau đó tìm phần tử xuất hiện 1 lần.

### Thuật toán / Algorithm

1. Tạo Map để đếm số lần xuất hiện
2. Duyệt qua nums:
   - Tăng count cho mỗi phần tử
3. Duyệt qua Map:
   - Nếu count = 1, trả về phần tử đó
4. Trả về -1 (không tìm thấy)

### Code / Implementation

```javascript
/**
 * Single Number - Hash Map Solution
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
  const countMap = new Map();

  // Đếm số lần xuất hiện
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // Tìm phần tử xuất hiện 1 lần
  for (const [num, count] of countMap) {
    if (count === 1) {
      return num;
    }
  }

  return -1; // Không tìm thấy
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 2 lần
- **Space Complexity:** O(n) - Lưu Map với n/2 phần tử

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không phụ thuộc vào bit manipulation

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Map
- Không đáp ứng yêu cầu O(1) space

---

## 🚀 Giải pháp 2: XOR Bit Manipulation (Cải tiến) / XOR Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Hash Map tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Không đáp ứng yêu cầu O(1) space
- Cách tiếp cận mới? Dùng XOR bit manipulation

### Ý tưởng / Idea

Dùng XOR để tìm phần tử đơn lẻ. XOR có tính chất:

- a ^ a = 0
- a ^ 0 = a
- XOR có tính giao hoán (commutative) và kết hợp (associative)

### Thuật toán / Algorithm

1. Khởi tạo result = 0
2. Duyệt qua nums:
   - result = result ^ num
3. Trả về result

### Code / Implementation

```javascript
/**
 * Single Number - XOR Bit Manipulation Solution
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber_XOR(nums) {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 1 biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)
- Code cực kỳ ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về XOR bit manipulation

---

## ⚡ Giải pháp 3: Math (Nâng cao) / Math Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng toán học
- Có thuật toán/pattern nào phù hợp hơn? Dùng công thức tổng

### Ý tưởng / Idea

Tính tổng của mảng và tổng của các số duy nhất. Phần tử đơn lẻ = tổng mảng - 2 \* tổng các số duy nhất.

### Thuật toán / Algorithm

1. Tạo Set để lưu các số duy nhất
2. Tính sumArray = tổng các phần tử trong nums
3. Tính sumUnique = tổng các phần tử trong Set
4. Trả về 2 \* sumUnique - sumArray

### Code / Implementation

```javascript
/**
 * Single Number - Math Solution
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber_Math(nums) {
  const uniqueSet = new Set(nums);
  let sumArray = 0;
  let sumUnique = 0;

  // Tính tổng mảng
  for (const num of nums) {
    sumArray += num;
  }

  // Tính tổng các số duy nhất
  for (const num of uniqueSet) {
    sumUnique += num;
  }

  // Phần tử đơn lẻ = 2 * sumUnique - sumArray
  return 2 * sumUnique - sumArray;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 2 lần
- **Space Complexity:** O(n) - Lưu Set với n/2 phần tử

### Ưu điểm / Pros

- Dễ hiểu
- Không phụ thuộc vào bit manipulation

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Set
- Không đáp ứng yêu cầu O(1) space

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use          |
| -------------------- | ---- | ----- | ------------------- | ----------------------------------- |
| Hash Map             | O(n) | O(n)  | Dễ / Easy           | Dễ hiểu, không cần bit manipulation |
| XOR Bit Manipulation | O(n) | O(1)  | Trung bình / Medium | Tối ưu, nên dùng                    |
| Math                 | O(n) | O(n)  | Trung bình / Medium | Không cần bit manipulation          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [2, 2, 1];
console.log(singleNumber(nums)); // Expected: 1
console.log(singleNumber_XOR(nums)); // Expected: 1
console.log(singleNumber_Math(nums)); // Expected: 1
```

### Test Case 2: Mảng lớn hơn / Larger Array

```javascript
const nums = [4, 1, 2, 1, 2];
console.log(singleNumber(nums)); // Expected: 4
console.log(singleNumber_XOR(nums)); // Expected: 4
console.log(singleNumber_Math(nums)); // Expected: 4
```

### Test Case 3: Chỉ có 1 phần tử / Single Element

```javascript
const nums = [1];
console.log(singleNumber(nums)); // Expected: 1
console.log(singleNumber_XOR(nums)); // Expected: 1
console.log(singleNumber_Math(nums)); // Expected: 1
```

### Test Case 4: Có số âm / With Negative Numbers

```javascript
const nums = [-1, -1, -2];
console.log(singleNumber(nums)); // Expected: -2
console.log(singleNumber_XOR(nums)); // Expected: -2
console.log(singleNumber_Math(nums)); // Expected: -2
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)

---

## 💬 Lời khuyên / Tips

- **XOR Bit Manipulation:**
  - a ^ a = 0 (cùng số XOR bằng nhau = 0)
  - a ^ 0 = a (số XOR 0 bằng chính nó)
  - XOR có tính giao hoán và kết hợp
  - Tối ưu: O(n) time, O(1) space
- **Hash Map:**
  - Dễ hiểu nhưng tốn O(n) space
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp mảng chỉ có 1 phần tử
  - Với math, sai công thức
  - Quên kiểm tra count === 1

---

_Last updated: 2026-02-03_
