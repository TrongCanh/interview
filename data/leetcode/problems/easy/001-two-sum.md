# Two Sum

> LeetCode Problem 1 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 1
- **URL:** https://leetcode.com/problems/two-sum/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array
- **Tags:** Array, Hash Map
- **Thuật toán liên quan / Related Algorithms:** Hash Table, Array
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
>
> You may assume that each input would have exactly one solution, and you may not use the same element twice.
>
> You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên `nums` và số nguyên `target`
- **Output:** Mảng chứa 2 chỉ số của các phần tử có tổng bằng `target`
- **Ràng buộc / Constraints:**
  - `2 <= nums.length <= 10^4`
  - `-10^9 <= nums[i] <= 10^9`
  - `-10^9 <= target <= 10^9`
  - Chỉ có một giải pháp duy nhất
  - Không được dùng cùng một phần tử 2 lần
- **Edge cases:**
  - Mảng chỉ có 2 phần tử
  - Các phần tử có giá trị trùng nhau
  - Số âm
  - Số lớn

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm 2 số trong mảng có tổng bằng target
- **Bước 2:** Có thể duyệt qua từng cặp phần tử và kiểm tra tổng
- **Bước 3:** Có thể tối ưu bằng cách dùng Hash Map để lưu trữ các giá trị đã xem

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Giải thích:
- nums[0] = 2, cần tìm 7 (9 - 2 = 7)
- nums[1] = 7, 2 + 7 = 9 ✓
- Trả về [0, 1]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua từng cặp phần tử và kiểm tra xem tổng của chúng có bằng `target` hay không.

### Thuật toán / Algorithm

1. Duyệt qua mảng với chỉ số `i` từ 0 đến n-2
2. Với mỗi `i`, duyệt qua mảng với chỉ số `j` từ i+1 đến n-1
3. Nếu `nums[i] + nums[j] == target`, trả về `[i, j]`

### Code / Implementation

```javascript
/**
 * Two Sum - Brute Force Solution
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum_bruteForce(nums, target) {
  const n = nums.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return []; // Không tìm thấy (theo đề bài luôn có giải pháp)
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Duyệt qua tất cả các cặp phần tử
- **Space Complexity:** O(1) - Không dùng thêm không gian

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không cần cấu trúc dữ liệu phức tạp

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- Không hiệu quả với mảng lớn

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force quá chậm với mảng lớn
- Điểm yếu của giải pháp 1? Duyệt qua tất cả các cặp, nhiều phép tính thừa
- Cách tiếp cận mới? Dùng Hash Map để lưu trữ giá trị đã xem, tra cứu O(1)

### Ý tưởng / Idea

Dùng Hash Map để lưu trữ `{value: index}` khi duyệt mảng. Với mỗi phần tử `nums[i]`, kiểm tra xem `target - nums[i]` đã có trong Map chưa.

### Thuật toán / Algorithm

1. Tạo Map rỗng để lưu `{value: index}`
2. Duyệt qua mảng với chỉ số `i`
3. Tính `complement = target - nums[i]`
4. Nếu `complement` có trong Map, trả về `[map[complement], i]`
5. Ngược lại, lưu `nums[i]: i` vào Map

### Code / Implementation

```javascript
/**
 * Two Sum - Hash Map Solution (Optimized)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum_hashMap(nums, target) {
  const numToIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement), i];
    }

    numToIndex.set(nums[i], i);
  }

  return []; // Không tìm thấy (theo đề bài luôn có giải pháp)
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần, mỗi thao tác Map O(1)
- **Space Complexity:** O(n) - Lưu trữ tối đa n phần tử trong Map

### Ưu điểm / Pros

- Độ phức tạp thời gian tốt hơn nhiều
- Hiệu quả với mảng lớn

### Nhược điểm / Cons

- Tốn thêm không gian bộ nhớ
- Cần hiểu về Hash Map

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp Hash Map đã là tối ưu về thời gian
- Có thuật toán/pattern nào phù hợp hơn? Không có, đây là bài toán cơ bản

### Ý tưởng / Idea

Giải pháp Hash Map là tối ưu nhất cho bài toán này. Tuy nhiên, có thể tối ưu thêm bằng cách:

- Dùng Object thay vì Map (trong JavaScript, Object có thể nhanh hơn trong một số trường hợp)
- Sử dụng early return khi tìm thấy kết quả

### Code / Implementation

```javascript
/**
 * Two Sum - Object Solution (Alternative Hash Map)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum_object(nums, target) {
  const numToIndex = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in numToIndex) {
      return [numToIndex[complement], i];
    }

    numToIndex[nums[i]] = i;
  }

  return [];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Tương tự Hash Map
- **Space Complexity:** O(n) - Tương tự Hash Map

### Ưu điểm / Pros

- Có thể nhanh hơn Map trong một số trường hợp
- Cú pháp đơn giản hơn với Object

### Nhược điểm / Cons

- Object chỉ hỗ trợ key là string hoặc symbol
- Map hỗ trợ key là bất kỳ giá trị nào

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use         |
| -------------------- | ----- | ----- | ------------------- | ---------------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ, không quan tâm hiệu năng |
| Hash Map (Map)       | O(n)  | O(n)  | Trung bình / Medium | Mảng lớn, cần hiệu quả             |
| Hash Map (Object)    | O(n)  | O(n)  | Trung bình / Medium | Mảng lớn, key là số nguyên         |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input = [2, 7, 11, 15];
const target = 9;
const expected = [0, 1];

console.log(twoSum_bruteForce(input, target)); // [0, 1]
console.log(twoSum_hashMap(input, target)); // [0, 1]
console.log(twoSum_object(input, target)); // [0, 1]
```

### Test Case 2: Các phần tử trùng nhau / Duplicate elements

```javascript
const input = [3, 3];
const target = 6;
const expected = [0, 1];

console.log(twoSum_bruteForce(input, target)); // [0, 1]
console.log(twoSum_hashMap(input, target)); // [0, 1]
console.log(twoSum_object(input, target)); // [0, 1]
```

### Test Case 3: Số âm / Negative numbers

```javascript
const input = [-1, -2, -3, -4, -5];
const target = -8;
const expected = [2, 4];

console.log(twoSum_bruteForce(input, target)); // [2, 4]
console.log(twoSum_hashMap(input, target)); // [2, 4]
console.log(twoSum_object(input, target)); // [2, 4]
```

### Test Case 4: Mảng lớn / Large array

```javascript
const input = Array.from({ length: 10000 }, (_, i) => i);
const target = 19997;
const expected = [9998, 9999];

console.log(twoSum_hashMap(input, target)); // [9998, 9999]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Array:** [`../algorithms/data-structures/array.md`](../algorithms/data-structures/array.md)
- **Hash Table:** [`../algorithms/data-structures/hash-table.md`](../algorithms/data-structures/hash-table.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Two Sum](https://leetcode.com/problems/two-sum/)
- [Hash Table - Wikipedia](https://en.wikipedia.org/wiki/Hash_table)

---

_Last updated: 2026-02-03_
