# Majority Element

> LeetCode Problem 169 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 169
- **URL:** https://leetcode.com/problems/majority-element/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Hash Table, Divide and Conquer
- **Tags:** Array, Hash Table, Sorting, Divide and Conquer
- **Thuật toán liên quan / Related Algorithms:** Array, Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an array `nums` of size `n`, return the majority element.
>
> The majority element is the element that appears **more than** `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**

```
Input: nums = [3,2,3]
Output: 3
Explanation: The majority element is 3 because it appears 2 times which is greater than n/2 = 3/2 = 1.5.
```

**Example 2:**

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:**

- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng nums
- **Output:** Số nguyên - phần tử xuất hiện nhiều hơn n/2 lần
- **Ràng buộc / Constraints:**
  - Majority element luôn tồn tại
  - Xuất hiện nhiều hơn n/2 lần
- **Edge cases:**
  - Mảng chỉ có 1 phần tử
  - Mảng có nhiều phần tử giống nhau
  - Mảng có số âm

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần đếm số lần xuất hiện của từng phần tử
- **Bước 2:** Phần tử xuất hiện nhiều nhất là majority element
- **Bước 3:** Có thể dùng Hash Map để đếm, hoặc Sort để tìm

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: nums = [3,2,3]

Giải thích:
- 3 xuất hiện 2 lần (> 3/2 = 1.5)
- 2 xuất hiện 1 lần
- Majority element: 3

Output: 3
```

```
Example 2:
Input: nums = [2,2,1,1,1,2,2]

Giải thích:
- 2 xuất hiện 4 lần (> 7/2 = 3.5)
- 1 xuất hiện 3 lần
- Majority element: 2

Output: 2
```

---

## 💡 Giải pháp 1: Hash Map (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Hash Map để đếm số lần xuất hiện của từng phần tử, sau đó tìm phần tử có count > n/2.

### Thuật toán / Algorithm

1. Tạo Map để đếm số lần xuất hiện
2. Duyệt qua nums:
   - Tăng count cho mỗi phần tử
3. Tìm majorityCount = n / 2
4. Duyệt qua Map:
   - Nếu count > majorityCount, trả về phần tử đó
5. Trả về -1 (không tìm thấy)

### Code / Implementation

```javascript
/**
 * Majority Element - Hash Map Solution
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
  const countMap = new Map();
  const n = nums.length;
  const majorityCount = Math.floor(n / 2);

  // Đếm số lần xuất hiện
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // Tìm phần tử có count > n/2
  for (const [num, count] of countMap) {
    if (count > majorityCount) {
      return num;
    }
  }

  return -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 2 lần
- **Space Complexity:** O(n) - Lưu Map với n/2 phần tử

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không phụ thuộc vào thuật toán phức tạp

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Map
- Không tối ưu về bộ nhớ

---

## 🚀 Giải pháp 2: Sorting (Cải tiến) / Sorting Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Hash Map tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Tốn O(n) space
- Cách tiếp cận mới? Sort mảng, phần tử ở giữa sẽ là majority element

### Ý tưởng / Idea

Sort mảng, phần tử ở vị trí n/2 sẽ là majority element vì nó xuất hiện nhiều hơn n/2 lần.

### Thuật toán / Algorithm

1. Sort mảng nums
2. Trả về nums[Math.floor(n / 2)]

### Code / Implementation

```javascript
/**
 * Majority Element - Sorting Solution
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement_Sorting(nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - Sorting tốn O(n log n)
- **Space Complexity:** O(1) hoặc O(n) - Tùy sorting algorithm

### Ưu điểm / Pros

- Code cực kỳ ngắn gọn
- Không cần Map

### Nhược điểm / Cons

- Độ phức tạp thời gian O(n log n)
- Thay đổi thứ tự mảng (modify input)

---

## ⚡ Giải pháp 3: Boyer-Moore (Nâng cao) / Boyer-Moore Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Boyer-Moore Algorithm
- Có thuật toán/pattern nào phù hợp hơn? O(n) time, O(1) space

### Ý tưởng / Idea

Dùng Boyer-Moore Algorithm: Duyệt qua mảng 1 lần, theo dõi candidate và count. Nếu count = 0, reset candidate.

### Thuật toán / Algorithm

1. Khởi tạo candidate = nums[0], count = 1
2. Với i từ 1 đến n-1:
   - Nếu nums[i] === candidate, count++
   - Nếu không, count--
   - Nếu count === 0, candidate = nums[i], count = 1
3. Trả về candidate

### Code / Implementation

```javascript
/**
 * Majority Element - Boyer-Moore Solution
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement_BoyerMoore(nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      candidate = nums[i];
      count = 1;
    }
  }

  return candidate;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)
- Không thay đổi input

### Nhược điểm / Cons

- Khó hiểu hơn Hash Map
- Cần hiểu về Boyer-Moore Algorithm

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space | Độ khó / Difficulty | Khi nào dùng / When to use             |
| -------------------- | ---------- | ----- | ------------------- | -------------------------------------- |
| Hash Map             | O(n)       | O(n)  | Dễ / Easy           | Dễ hiểu, không cần thuật toán phức tạp |
| Sorting              | O(n log n) | O(1)  | Dễ / Easy           | Code ngắn nhất, modify input OK        |
| Boyer-Moore          | O(n)       | O(1)  | Khó / Hard          | Tối ưu, nên dùng                       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [3, 2, 3];
console.log(majorityElement(nums)); // Expected: 3
console.log(majorityElement_Sorting(nums)); // Expected: 3
console.log(majorityElement_BoyerMoore(nums)); // Expected: 3
```

### Test Case 2: Mảng lớn hơn / Larger Array

```javascript
const nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums)); // Expected: 2
console.log(majorityElement_Sorting(nums)); // Expected: 2
```

### Test Case 3: Chỉ có 1 phần tử / Single Element

```javascript
const nums = [1];
console.log(majorityElement(nums)); // Expected: 1
console.log(majorityElement_Sorting(nums)); // Expected: 1
```

### Test Case 4: Có số âm / With Negative Numbers

```javascript
const nums = [-1, -1, 2, 2];
console.log(majorityElement(nums)); // Expected: -1
console.log(majorityElement_Sorting(nums)); // Expected: -1
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)

- **Thuật toán liên quan:**
  - [Sorting](../algorithms/algorithms/sorting.md)

---

## 💬 Lời khuyên / Tips

- **Boyer-Moore Algorithm:**
  - O(n) time, O(1) space - tối ưu
  - Theo dõi candidate và count
  - Khi count = 0, reset candidate
- **Hash Map:**
  - Dễ hiểu nhưng tốn O(n) space
- **Sorting:**
  - Code ngắn nhất
  - Phần tử ở giữa sau khi sort sẽ là majority element
- **Lỗi thường gặp:**
  - Quên tính majorityCount = Math.floor(n / 2)
  - Với Boyer-Moore, quên reset count khi count = 0
  - Quên xử lý trường hợp mảng rỗng

---

_Last updated: 2026-02-03_
