# Contains Duplicate / Kiểm Tra Trùng Lặp

> LeetCode Problem 217 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 217
- **URL:** https://leetcode.com/problems/contains-duplicate/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array
- **Tags:** Array, Hash Table, Sorting
- **Thuật toán liên quan / Related Algorithms:** Sorting, Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.
```

**Example 2:**

```
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.
```

**Example 3:**

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên `nums` với độ dài từ 1 đến 10^5
- **Output:** `true` nếu có bất kỳ phần tử nào xuất hiện ít nhất 2 lần, `false` nếu tất cả phần tử đều duy nhất
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 10^5
  - Giá trị phần tử: -10^9 ≤ nums[i] ≤ 10^9
- **Edge cases:**
  - Mảng có 1 phần tử → luôn trả về `false`
  - Mảng có tất cả phần tử giống nhau → trả về `true`
  - Mảng có phần tử âm
  - Mảng có giá trị lớn

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem có phần tử nào xuất hiện nhiều hơn 1 lần không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Hash Table để lưu trữ các phần tử đã gặp, hoặc sắp xếp mảng rồi kiểm tra phần tử liền kề
- **Bước 3:** Lên kế hoạch giải pháp - Brute Force (kiểm tra từng cặp), Hash Table (O(n) time, O(n) space), Sorting (O(n log n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [1,2,3,1]
- Duyệt: 1 (chưa gặp), 2 (chưa gặp), 3 (chưa gặp), 1 (đã gặp!) → return true

Example 2: nums = [1,2,3,4]
- Duyệt: 1, 2, 3, 4 (tất cả đều chưa gặp) → return false

Example 3: nums = [1,1,1,3,3,4,3,2,4,2]
- Duyệt: 1 (chưa gặp), 1 (đã gặp!) → return true
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

So sánh từng cặp phần tử trong mảng. Nếu tìm thấy hai phần tử giống nhau, trả về `true`. Nếu duyệt hết tất cả các cặp mà không tìm thấy trùng lặp, trả về `false`.

### Thuật toán / Algorithm

1. Duyệt qua mảng với chỉ số `i` từ 0 đến n-2
2. Với mỗi `i`, duyệt qua mảng với chỉ số `j` từ i+1 đến n-1
3. Nếu `nums[i] === nums[j]`, trả về `true`
4. Sau khi duyệt hết tất cả các cặp, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate - Brute Force Solution
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @return {boolean} - true nếu có trùng lặp, false nếu không
 */
function containsDuplicate_bruteForce(nums) {
  const n = nums.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - So sánh từng cặp phần tử
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Không cần cấu trúc dữ liệu phức tạp
- Không tốn thêm bộ nhớ

### Nhược điểm / Cons

- Độ phức tạp thời gian quá cao
- Không hiệu quả với mảng lớn
- Sẽ bị Time Limit Exceeded với n = 10^5

---

## 🚀 Giải pháp 2: Optimized - Hash Table (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force quá chậm với mảng lớn
- Điểm yếu của giải pháp 1? O(n²) time complexity
- Cách tiếp cận mới? Sử dụng Hash Table để lưu trữ các phần tử đã gặp, cho phép tra cứu O(1)

### Ý tưởng / Idea

Duyệt qua mảng một lần, sử dụng Hash Table (Set trong JavaScript) để lưu trữ các phần tử đã gặp. Với mỗi phần tử, kiểm tra xem nó đã tồn tại trong Set chưa. Nếu có, trả về `true`. Nếu không, thêm vào Set và tiếp tục.

### Thuật toán / Algorithm

1. Tạo một Set rỗng
2. Duyệt qua từng phần tử trong mảng
3. Với mỗi phần tử:
   - Nếu phần tử đã tồn tại trong Set, trả về `true`
   - Nếu không, thêm phần tử vào Set
4. Sau khi duyệt hết mảng, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate - Optimized Solution using Hash Table (Set)
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @return {boolean} - true nếu có trùng lặp, false nếu không
 */
function containsDuplicate_optimized(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt mảng một lần, mỗi thao tác với Set là O(1) trung bình
- **Space Complexity:** O(n) - Trong trường hợp xấu nhất, Set chứa tất cả phần tử

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Hiệu quả với mảng lớn
- Code ngắn gọn, dễ đọc

### Nhược điểm / Cons

- Sử dụng thêm O(n) bộ nhớ
- Trong trường hợp mảng đã được sắp xếp, không tận dụng được tính chất này

---

## ⚡ Giải pháp 3: Advanced - Sorting (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể giảm space complexity
- Có thuật toán/pattern nào phù hợp hơn? Sorting cho phép kiểm tra trùng lặp với O(1) space

### Ý tưởng / Idea

Sắp xếp mảng trước, sau đó kiểm tra xem có phần tử nào liền kề bằng nhau không. Nếu có, trả về `true`.

### Thuật toán / Algorithm

1. Sắp xếp mảng `nums`
2. Duyệt qua mảng từ chỉ số 1 đến n-1
3. Nếu `nums[i] === nums[i-1]`, trả về `true`
4. Sau khi duyệt hết, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate - Advanced Solution using Sorting
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @return {boolean} - true nếu có trùng lặp, false nếu không
 */
function containsDuplicate_advanced(nums) {
  // Sắp xếp mảng (JavaScript sort mặc định chuyển thành string)
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) - Do thuật toán sắp xếp
- **Space Complexity:** O(1) hoặc O(log n) - Tùy thuộc vào thuật toán sắp xếp (JavaScript sort thường là O(log n) cho stack)

### Ưu điểm / Pros

- Không cần thêm bộ nhớ đáng kể (O(1) hoặc O(log n))
- Tận dụng tính chất đã sắp xếp
- Đơn giản, dễ hiểu

### Nhược điểm / Cons

- Độ phức tạp thời gian O(n log n) cao hơn Hash Table
- Thay đổi thứ tự mảng gốc (nếu cần giữ nguyên, cần copy mảng)
- Không phù hợp nếu mảng đã được sắp xếp từ trước (vẫn cần O(n log n))

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time       | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---------- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²)      | O(1)  | Dễ / Easy           | Mảng rất nhỏ (n < 100)     |
| Optimized (Set)      | O(n)       | O(n)  | Dễ / Easy           | Mảng lớn, cần tối ưu time  |
| Advanced (Sorting)   | O(n log n) | O(1)  | Dễ / Easy           | Mảng lớn, cần tối ưu space |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input = [1, 2, 3, 1];
const expected = true;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

### Test Case 2: Không trùng lặp / No Duplicate

```javascript
const input = [1, 2, 3, 4];
const expected = false;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

### Test Case 3: Nhiều trùng lặp / Multiple Duplicates

```javascript
const input = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
const expected = true;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

### Test Case 4: Mảng 1 phần tử / Single Element

```javascript
const input = [1];
const expected = false;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

### Test Case 5: Phần tử âm / Negative Numbers

```javascript
const input = [-1, -2, -3, -1];
const expected = true;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

### Test Case 6: Giá trị lớn / Large Values

```javascript
const input = [1000000000, -1000000000, 1000000000];
const expected = true;
const result = containsDuplicate_optimized(input);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Sorting](../algorithms/algorithms/sorting.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Hash Table là lựa chọn tốt nhất** cho bài toán kiểm tra trùng lặp khi cần tối ưu thời gian
2. **Sorting là lựa chọn tốt** khi cần tối ưu bộ nhớ và chấp nhận O(n log n) time
3. **Brute Force chỉ dùng cho mảng rất nhỏ** hoặc khi học thuật toán cơ bản
4. **JavaScript Set** là cấu trúc dữ liệu phù hợp cho bài toán này với O(1) cho các thao tác cơ bản
5. **Lưu ý về JavaScript sort**: `nums.sort()` mặc định chuyển thành string, cần truyền comparator `nums.sort((a, b) => a - b)` cho số

---

_Last updated: 2025-02-04_
