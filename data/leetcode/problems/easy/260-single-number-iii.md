# Single Number III / Số Xuất Hiện Một Lần III

> LeetCode Problem 260 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 260
- **URL:** https://leetcode.com/problems/single-number-iii/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Bit Manipulation
- **Tags:** Array, Bit Manipulation
- **Thuật toán liên quan / Related Algorithms:** Bit Manipulation, Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an integer array `nums` where **every element appears three times except for one which appears exactly once**. Find the single element and return it.

**Example 1:**

```
Input: nums = [2,2,3,2]
Output: 3
```

**Example 2:**

```
Input: nums = [0,1,0,1,0,1,99]
Output: 99
```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- It is **guaranteed** that the input array has exactly one element that appears once, and the rest appear exactly three times.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên `nums` nơi mỗi phần tử xuất hiện 3 lần, trừ 1 phần tử xuất hiện 1 lần
- **Output:** Phần tử xuất hiện 1 lần
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 3 × 10^4
  - Giá trị phần tử: -3 × 10^4 ≤ nums[i] ≤ 3 × 10^4
  - Đảm bảo có đúng 1 phần tử xuất hiện 1 lần
- **Edge cases:**
  - Mảng chỉ có 1 phần tử: trả về phần tử đó
  - Phần tử xuất hiện 1 lần ở đầu hoặc cuối mảng

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm phần tử xuất hiện 1 lần trong mảng nơi các phần tử khác xuất hiện 3 lần
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Bit Manipulation hoặc Hash Table
- **Bước 3:** Lên kế hoạch giải pháp - Bit Manipulation (O(n) time, O(1) space), Hash Table (O(n) time, O(n) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [2,2,3,2]

Phương pháp Bit Manipulation:
- Tính XOR tất cả các bit: 2 XOR 2 XOR 3 XOR 2 = 1
- Tính XOR các bit lẻ: 2 XOR 3 = 1
- Tính XOR các bit chẵn: 2 XOR 2 = 0
- Kết quả: 1 XOR 0 XOR 0 = 1

Phương pháp Hash Table:
- Đếm: {2: 3, 3: 1}
- Phần tử có đếm = 1 là 3

Example 2: nums = [0,1,0,1,0,1,99]

Phương pháp Bit Manipulation:
- Tính XOR tất cả các bit: 0 XOR 1 XOR 0 XOR 1 XOR 0 XOR 1 XOR 99 = 99
- Tính XOR các bit lẻ: 1 XOR 0 XOR 1 = 0
- Tính XOR các bit chẵn: 0 XOR 0 XOR 99 = 99
- Kết quả: 0 XOR 99 = 99
```

---

## 💡 Giải pháp 1: Brute Force - Hash Table (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Hash Table để đếm số lượng xuất hiện của từng phần tử. Phần tử có đếm = 1 là kết quả.

### Thuật toán / Algorithm

1. Tạo Hash Table `count` để đếm số lượng xuất hiện
2. Duyệt qua mảng `nums`, tăng `count[num]` lên 1
3. Duyệt qua mảng `nums`, tìm phần tử có `count[num] == 1`
4. Trả về phần tử đó

### Code / Implementation

```javascript
/**
 * Single Number III - Hash Table Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Phần tử xuất hiện 1 lần
 */
function singleNumber_bruteForce(nums) {
  const count = {};

  // Đếm số lượng xuất hiện của từng phần tử
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }

  // Tìm phần tử có đếm = 1
  for (const num of nums) {
    if (count[num] === 1) {
      return num;
    }
  }

  return -1; // Không nên đến được theo ràng buộc
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng hai lần
- **Space Complexity:** O(n) - Hash Table lưu trữ đếm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ
- Duyệt mảng hai lần

---

## 🚀 Giải pháp 2: Optimized - Bit Manipulation (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Hash Table tốn O(n) bộ nhớ và duyệt mảng hai lần
- Điểm yếu của giải pháp 1? Tốn nhiều bộ nhớ, không tối ưu
- Cách tiếp cận mới? Sử dụng Bit Manipulation để giải trong O(n) time và O(1) space

### Ý tưởng / Idea

Tận dụng tính chất XOR:

- XOR tất cả các bit → kết quả là XOR của phần tử xuất hiện 1 lần
- XOR các bit ở vị trí lẻ → kết quả là XOR của phần tử xuất hiện 1 lần
- XOR các bit ở vị trí chẵn → kết quả là 0
- XOR của ba kết quả trên = phần tử xuất hiện 1 lần

### Thuật toán / Algorithm

1. Khởi tạo `ones = 0`, `twos = 0`
2. Duyệt qua mảng `nums`:
   - `ones = ones XOR nums[i]` (XOR các bit lẻ)
   - `twos = twos XOR nums[i]` (XOR tất cả các bit)
3. Trả về `ones XOR twos`

### Code / Implementation

```javascript
/**
 * Single Number III - Bit Manipulation Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Phần tử xuất hiện 1 lần
 */
function singleNumber_optimized(nums) {
  let ones = 0;
  let twos = 0;

  // ones = XOR của các bit ở vị trí lẻ
  // twos = XOR của tất cả các bit
  for (const num of nums) {
    ones = ones ^ num;
    twos = twos ^ num;
  }

  // ones XOR twos = phần tử xuất hiện 1 lần
  return ones ^ twos;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Duyệt mảng một lần

### Nhược điểm / Cons

- Cần hiểu về Bit Manipulation
- Code khó hiểu hơn

---

## ⚡ Giải pháp 3: Advanced - Bit Counting (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Bit Counting để giải
- Có thuật toán/pattern nào phù hợp hơn? Tương tự giải pháp Optimized

### Ý tưởng / Idea

Tương tự giải pháp Optimized, nhưng viết code rõ ràng hơn với comment chi tiết.

### Thuật toán / Algorithm

Tương tự giải pháp Optimized.

### Code / Implementation

```javascript
/**
 * Single Number III - Bit Counting Solution
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Phần tử xuất hiện 1 lần
 */
function singleNumber_advanced(nums) {
  // ones: XOR của các số ở vị trí lẻ (0, 2, 4, ...)
  // twos: XOR của tất cả các số
  let ones = 0;
  let twos = 0;

  for (let i = 0; i < nums.length; i++) {
    // XOR số ở vị trí lẻ vào ones
    if (i % 2 === 0) {
      // vị trí lẻ: 0, 2, 4, ...
      ones = ones ^ nums[i];
    }

    // XOR tất cả các số vào twos
    twos = twos ^ nums[i];
  }

  // ones XOR twos = số xuất hiện 1 lần
  return ones ^ twos;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rõ ràng với comment
- Độ phức tạp tối ưu

### Nhược điểm / Cons

- Tương tự giải pháp Optimized

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Hash Table           | O(n) | O(n)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| Bit Manipulation     | O(n) | O(1)  | Trung bình / Medium | Cần tối ưu time/space      |
| Bit Counting         | O(n) | O(1)  | Trung bình / Medium | Code rõ ràng hơn           |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [2, 2, 3, 2];
const expected = 3;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 2: Nhiều phần tử lặp lại / Multiple Repeated Elements

```javascript
const nums = [0, 1, 0, 1, 0, 1, 99];
const expected = 99;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 3: Giá trị âm / Negative Values

```javascript
const nums = [-1, -1, -1, -2, -2, -2, -2, 3];
const expected = 3;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 4: Mảng 1 phần tử / Single Element

```javascript
const nums = [5];
const expected = 5;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 5: Phần tử 0 / Zero Element

```javascript
const nums = [0, 0, 0, 1];
const expected = 1;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

### Test Case 6: Mảng lớn / Large Array

```javascript
const nums = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6];
const expected = 6;
const result = singleNumber_bruteForce(nums);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Bit Manipulation](../algorithms/algorithms/math.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Bit Manipulation với XOR:**
   - XOR một số với chính nó = 0
   - XOR có tính chất giao hoán: a XOR b XOR c = a XOR c XOR b
   - XOR có tính chất kết hợp: (a XOR b) XOR (a XOR c) = b XOR c

2. **Tư duy cho bài toán này:**
   - Phần tử xuất hiện 3 lần: trong XOR tất cả, chúng bị loại bỏ
   - Phần tử xuất hiện 1 lần: trong XOR các bit lẻ, chúng được giữ lại
   - Phần tử xuất hiện 1 lần = XOR các bit lẻ XOR XOR tất cả

3. **Hash Table vs Bit Manipulation:**
   - Hash Table: O(n) space, dễ hiểu
   - Bit Manipulation: O(1) space, khó hiểu hơn

4. **Vị trí lẻ vs Chẵn:**
   - Vị trí lẻ: 0, 2, 4, 6, ...
   - Vị trí chẵn: 1, 3, 5, 7, ...
   - `i % 2 === 0`: vị trí lẻ
   - `i % 2 === 1`: vị trí chẵn

5. **Edge Cases:**
   - Mảng chỉ có 1 phần tử: trả về phần tử đó
   - Phần tử 0: xử lý bình thường

6. **Lưu ý về ràng buộc:**
   - Đảm bảo có đúng 1 phần tử xuất hiện 1 lần
   - Các phần tử khác xuất hiện đúng 3 lần

---

_Last updated: 2025-02-04_
