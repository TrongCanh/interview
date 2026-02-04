# Summary Ranges / Tóm Tắt Khoảng

> LeetCode Problem 228 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 228
- **URL:** https://leetcode.com/problems/summary-ranges/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array
- **Tags:** Array
- **Thuật toán liên quan / Related Algorithms:** Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are given a **sorted unique** integer array `nums`.

Return the **smallest sorted** list of ranges that cover all the numbers in the array exactly. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` should be output as:

- `"a->b"` if `a != b`
- `"a"` if `a == b`

**Example 1:**

```
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

**Example 2:**

```
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

**Constraints:**

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 100`
- All the values of `nums` are **unique**.
- `nums` is sorted in ascending order.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên đã được sắp xếp và không có phần tử trùng lặp
- **Output:** Danh sách các khoảng (ranges) bao phủ tất cả các số trong mảng
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 0 ≤ nums.length ≤ 100
  - Giá trị phần tử: 0 ≤ nums[i] ≤ 100
  - Mảng đã được sắp xếp tăng dần
  - Tất cả giá trị là duy nhất (không trùng lặp)
- **Edge cases:**
  - Mảng rỗng: trả về mảng rỗng
  - Mảng có 1 phần tử: trả về ["x"]
  - Mảng có các số liên tiếp: gộp thành 1 range
  - Mảng có các số không liên tiếp: tách thành nhiều ranges

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần gộp các số liên tiếp thành ranges
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Two Pointers để xác định start và end của mỗi range
- **Bước 3:** Lên kế hoạch giải pháp - Two Pointers (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [0,1,2,4,5,7]

i=0: start=0
i=1: nums[1]=1, nums[0]+1=1 → tiếp tục
i=2: nums[2]=2, nums[1]+1=2 → tiếp tục
i=3: nums[3]=4, nums[2]+1=3 ≠ 4 → kết thúc range [0,2]
     output: ["0->2"], start=4
i=4: nums[4]=5, nums[3]+1=5 → tiếp tục
i=5: nums[5]=7, nums[4]+1=6 ≠ 7 → kết thúc range [4,5]
     output: ["0->2","4->5"], start=7
Kết thúc: output: ["0->2","4->5","7"]
```

---

## 💡 Giải pháp 1: Brute Force - Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua mảng, xác định start của mỗi range. Khi tìm thấy số không liên tiếp, kết thúc range hiện tại và bắt đầu range mới.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về mảng rỗng
2. Khởi tạo `result = []` và `start = nums[0]`
3. Duyệt qua mảng từ chỉ số 1 đến n-1:
   - Nếu `nums[i] !== nums[i-1] + 1`:
     - Nếu `start === nums[i-1]`, thêm `"${start}"` vào `result`
     - Nếu `start !== nums[i-1]`, thêm `"${start}->${nums[i-1]}"` vào `result`
     - Cập nhật `start = nums[i]`
4. Xử lý range cuối cùng:
   - Nếu `start === nums[n-1]`, thêm `"${start}"` vào `result`
   - Nếu `start !== nums[n-1]`, thêm `"${start}->${nums[n-1]}"` vào `result`
5. Trả về `result`

### Code / Implementation

```javascript
/**
 * Summary Ranges - Iterative Solution
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {string[]} - Danh sách các khoảng
 */
function summaryRanges_bruteForce(nums) {
  // Edge case: mảng rỗng
  if (nums.length === 0) {
    return [];
  }

  const result = [];
  let start = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Nếu số hiện tại không liên tiếp với số trước đó
    if (nums[i] !== nums[i - 1] + 1) {
      // Thêm range vào result
      if (start === nums[i - 1]) {
        result.push(`${start}`);
      } else {
        result.push(`${start}->${nums[i - 1]}`);
      }
      // Bắt đầu range mới
      start = nums[i];
    }
  }

  // Xử lý range cuối cùng
  if (start === nums[nums.length - 1]) {
    result.push(`${start}`);
  } else {
    result.push(`${start}->${nums[nums.length - 1]}`);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ đáng kể (không tính output)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Độ phức tạp thời gian tối ưu O(n)
- Không sử dụng thêm bộ nhớ

### Nhược điểm / Cons

- Code hơi dài do phải xử lý range cuối cùng riêng
- Lặp lại logic thêm range vào result

---

## 🚀 Giải pháp 2: Optimized - Two Pointers (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản có code lặp lại logic
- Điểm yếu của giải pháp 1? Phải xử lý range cuối cùng riêng
- Cách tiếp cận mới? Sử dụng Two Pointers để xác định start và end của mỗi range

### Ý tưởng / Idea

Sử dụng hai con trỏ `start` và `end`. Di chuyển `end` đến khi tìm thấy số không liên tiếp, sau đó thêm range vào result và di chuyển `start` đến vị trí của `end`.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về mảng rỗng
2. Khởi tạo `result = []`, `start = 0`, `end = 0`
3. Trong khi `end < nums.length`:
   - Nếu `end + 1 < nums.length` và `nums[end + 1] === nums[end] + 1`:
     - Tăng `end` lên 1
   - Ngược lại:
     - Nếu `start === end`, thêm `"${nums[start]}"` vào `result`
     - Nếu `start !== end`, thêm `"${nums[start]}->${nums[end]}"` vào `result`
     - Cập nhật `start = end + 1`, `end = start`
4. Trả về `result`

### Code / Implementation

```javascript
/**
 * Summary Ranges - Two Pointers Solution
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {string[]} - Danh sách các khoảng
 */
function summaryRanges_optimized(nums) {
  // Edge case: mảng rỗng
  if (nums.length === 0) {
    return [];
  }

  const result = [];
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    // Nếu số tiếp theo liên tiếp với số hiện tại
    if (end + 1 < nums.length && nums[end + 1] === nums[end] + 1) {
      end++;
    } else {
      // Kết thúc range hiện tại
      if (start === end) {
        result.push(`${nums[start]}`);
      } else {
        result.push(`${nums[start]}->${nums[end]}`);
      }
      // Bắt đầu range mới
      start = end + 1;
      end = start;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ đáng kể (không tính output)

### Ưu điểm / Pros

- Code rõ ràng, dễ hiểu
- Không phải xử lý riêng range cuối cùng
- Tận dụng Two Pointers pattern

### Nhược điểm / Cons

- Cần hiểu về Two Pointers pattern
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - For Loop with Early Continue (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể viết code ngắn gọn hơn
- Có thuật toán/pattern nào phù hợp hơn? Sử dụng for loop với continue

### Ý tưởng / Idea

Dùng for loop để duyệt qua mảng. Khi tìm thấy số không liên tiếp, thêm range vào result và cập nhật start. Sử dụng continue để bỏ qua các số trong cùng một range.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về mảng rỗng
2. Khởi tạo `result = []`, `start = nums[0]`
3. Duyệt qua mảng từ chỉ số 0 đến n-1:
   - Nếu `i + 1 < nums.length` và `nums[i + 1] === nums[i] + 1`:
     - Tiếp tục (continue)
   - Nếu `start === nums[i]`, thêm `"${start}"` vào `result`
   - Nếu `start !== nums[i]`, thêm `"${start}->${nums[i]}"` vào `result`
   - Nếu `i + 1 < nums.length`, cập nhật `start = nums[i + 1]`
4. Trả về `result`

### Code / Implementation

```javascript
/**
 * Summary Ranges - For Loop with Continue Solution
 * @param {number[]} nums - Mảng số nguyên đã sắp xếp
 * @return {string[]} - Danh sách các khoảng
 */
function summaryRanges_advanced(nums) {
  // Edge case: mảng rỗng
  if (nums.length === 0) {
    return [];
  }

  const result = [];
  let start = nums[0];

  for (let i = 0; i < nums.length; i++) {
    // Nếu số tiếp theo liên tiếp, tiếp tục
    if (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      continue;
    }

    // Kết thúc range hiện tại
    if (start === nums[i]) {
      result.push(`${start}`);
    } else {
      result.push(`${start}->${nums[i]}`);
    }

    // Bắt đầu range mới (nếu còn số tiếp theo)
    if (i + 1 < nums.length) {
      start = nums[i + 1];
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ đáng kể (không tính output)

### Ưu điểm / Pros

- Code ngắn gọn, dễ đọc
- Không phải xử lý riêng range cuối cùng
- Tận dụng continue để skip các số trong cùng range

### Nhược điểm / Cons

- Cần hiểu về continue trong loop
- Logic hơi khác so với các giải pháp khác

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Iterative            | O(n) | O(1)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| Two Pointers         | O(n) | O(1)  | Trung bình / Medium | Muốn áp dụng pattern       |
| For Loop + Continue  | O(n) | O(1)  | Dễ / Easy           | Code ngắn gọn, tối ưu      |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [0, 1, 2, 4, 5, 7];
const expected = ["0->2", "4->5", "7"];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 2: Mảng rỗng / Empty Array

```javascript
const nums = [];
const expected = [];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 3: Mảng 1 phần tử / Single Element

```javascript
const nums = [5];
const expected = ["5"];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 4: Tất cả số liên tiếp / All Consecutive

```javascript
const nums = [1, 2, 3, 4, 5];
const expected = ["1->5"];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 5: Không có số liên tiếp / No Consecutive

```javascript
const nums = [1, 3, 5, 7];
const expected = ["1", "3", "5", "7"];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

### Test Case 6: Kết hợp / Mixed

```javascript
const nums = [0, 2, 3, 4, 6, 8, 9];
const expected = ["0", "2->4", "6", "8->9"];
const result = summaryRanges_bruteForce(nums);
console.log(JSON.stringify(result) === JSON.stringify(expected)); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Two Pointers Pattern:**
   - Rất hữu ích cho các bài toán liên quan đến mảng đã sắp xếp
   - Có thể dùng để xác định start và end của một range

2. **Template String trong JavaScript:**
   - `` `${variable}` ``: chèn giá trị biến vào string
   - `` `${start}->${end}` ``: tạo string dạng "a->b"

3. **Kiểm tra số liên tiếp:**
   - `nums[i] === nums[i-1] + 1`: kiểm tra xem nums[i] có phải là số tiếp theo của nums[i-1] không
   - `nums[i] - nums[i-1] === 1`: cách viết tương đương

4. **Edge Cases:**
   - Luôn kiểm tra mảng rỗng trước khi xử lý
   - Xử lý riêng range cuối cùng hoặc dùng continue để xử lý

5. **Lưu ý về ràng buộc:**
   - Mảng đã được sắp xếp và không có phần tử trùng lặp
   - Điều này giúp đơn giản hóa bài toán

---

_Last updated: 2025-02-04_
