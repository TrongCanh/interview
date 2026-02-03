# Permutations / Các Hoán Vị

> LeetCode Problem 46 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 46
- **URL:** https://leetcode.com/problems/permutations/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Backtracking
- **Tags:** Array, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking, Recursion
- **Patterns liên quan / Related Patterns:** Backtracking

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in **any order**.

**Example 1:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**

```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All the integers of `nums` are unique.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng các số nguyên phân biệt
- **Output:** Tất cả các hoán vị có thể của mảng
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 6
  - Giá trị phần tử: -10 ≤ nums[i] ≤ 10
  - Tất cả phần tử là phân biệt (không trùng lặp)
- **Edge cases:**
  - Mảng có 1 phần tử
  - Mảng có 2 phần tử
  - Mảng có nhiều phần tử

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tạo tất cả các hoán vị của mảng
- **Bước 2:** Nhận thấy có thể dùng backtracking để thử từng cách sắp xếp
- **Bước 3:** Theo dõi các phần tử đã dùng để tránh trùng lặp

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [1,2,3]
- Tất cả hoán vị: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
- Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2: nums = [0,1]
- Tất cả hoán vị: [0,1], [1,0]
- Output: [[0,1],[1,0]]

Example 3: nums = [1]
- Tất cả hoán vị: [1]
- Output: [[1]]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng backtracking để thử từng phần tử chưa dùng, đệ quy cho đến khi hoàn thành một hoán vị.

### Thuật toán / Algorithm

1. Tạo mảng kết quả
2. Dùng backtracking với mảng used để theo dõi phần tử đã dùng
3. Khi current permutation có độ dài bằng nums.length, thêm vào kết quả
4. Duyệt qua từng phần tử, nếu chưa dùng thì thêm vào current permutation

### Code / Implementation

```javascript
function permute_bruteForce(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(currentPermutation) {
    // Base case: đã hoàn thành một hoán vị
    if (currentPermutation.length === nums.length) {
      result.push([...currentPermutation]);
      return;
    }

    // Duyệt qua từng phần tử
    for (let i = 0; i < nums.length; i++) {
      // Nếu phần tử chưa được dùng
      if (!used[i]) {
        // Đánh dấu là đã dùng
        used[i] = true;

        // Thêm vào hoán vị hiện tại
        currentPermutation.push(nums[i]);

        // Đệ quy
        backtrack(currentPermutation);

        // Backtrack: loại bỏ phần tử vừa thêm
        currentPermutation.pop();

        // Đánh dấu là chưa dùng
        used[i] = false;
      }
    }
  }

  backtrack([]);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n) - n! hoán vị, mỗi hoán vị có n phần tử
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tìm được tất cả các hoán vị
- Tránh được trùng lặp nhờ mảng used

### Nhược điểm / Cons

- Cần mảng used tốn bộ nhớ
- Không tối ưu về thời gian (nhưng đây là độ phức tạp tối thiểu)

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tránh dùng mảng used bằng cách swap
- Điểm yếu của giải pháp 1? Cần mảng used tốn bộ nhớ
- Cách tiếp cận mới? Dùng swap để tạo hoán vị tại chỗ

### Ý tưởng / Idea

Sử dụng backtracking với swap:

1. Dùng swap để đổi chỗ phần tử tại index hiện tại với các phần tử sau
2. Đệ quy với index + 1
3. Swap lại để quay lại trạng thái ban đầu

### Thuật toán / Algorithm

1. Tạo mảng kết quả
2. Dùng backtracking với startIndex:
   - Nếu startIndex === nums.length, thêm copy của nums vào kết quả
   - Duyệt từ startIndex đến cuối:
     - Swap nums[startIndex] với nums[i]
     - Đệ quy với startIndex + 1
     - Swap lại để quay lại

### Code / Implementation

```javascript
function permute_optimized(nums) {
  const result = [];

  function backtrack(startIndex) {
    // Base case: đã hoàn thành một hoán vị
    if (startIndex === nums.length) {
      result.push([...nums]);
      return;
    }

    // Duyệt qua từng phần tử từ startIndex
    for (let i = startIndex; i < nums.length; i++) {
      // Swap
      [nums[startIndex], nums[i]] = [nums[i], nums[startIndex]];

      // Đệ quy
      backtrack(startIndex + 1);

      // Swap lại (backtrack)
      [nums[startIndex], nums[i]] = [nums[i], nums[startIndex]];
    }
  }

  backtrack(0);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n)
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Không cần mảng used
- Tạo hoán vị tại chỗ
- Tiết kiệm bộ nhớ
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Phải copy mảng khi thêm vào kết quả
- Logic swap cần hiểu rõ

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Backtracking với swap là chuẩn

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function permute_advanced(nums) {
  // Validate input
  if (!isValidInput(nums)) {
    return [];
  }

  const result = [];

  // Tạo bản sao để không thay đổi mảng gốc
  const numsCopy = [...nums];

  // Bắt đầu backtracking
  backtrack(numsCopy, 0, result);

  return result;
}

/**
 * Kiểm tra input có hợp lệ không
 * @param {number[]} nums - mảng đầu vào
 * @returns {boolean}
 */
function isValidInput(nums) {
  return nums && nums.length > 0;
}

/**
 * Backtracking để tạo tất cả các hoán vị
 * @param {number[]} nums - mảng số
 * @param {number} startIndex - chỉ số bắt đầu
 * @param {number[][]} result - mảng kết quả
 */
function backtrack(nums, startIndex, result) {
  // Base case: đã hoàn thành một hoán vị
  if (startIndex === nums.length) {
    addPermutationToResult(nums, result);
    return;
  }

  // Duyệt qua từng phần tử từ startIndex
  for (let i = startIndex; i < nums.length; i++) {
    // Swap phần tử tại startIndex với phần tử tại i
    swap(nums, startIndex, i);

    // Đệ quy với startIndex + 1
    backtrack(nums, startIndex + 1, result);

    // Swap lại (backtrack)
    swap(nums, startIndex, i);
  }
}

/**
 * Thêm hoán vị vào kết quả
 * @param {number[]} nums - mảng hiện tại
 * @param {number[][]} result - mảng kết quả
 */
function addPermutationToResult(nums, result) {
  result.push([...nums]);
}

/**
 * Swap hai phần tử trong mảng
 * @param {number[]} nums - mảng
 * @param {number} i - chỉ số thứ nhất
 * @param {number} j - chỉ số thứ hai
 */
function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

/**
 * Hàm wrapper để dễ test
 * @param {number[]} nums - mảng đầu vào
 * @returns {number[][]} - tất cả các hoán vị
 */
function getAllPermutations(nums) {
  return permute_advanced(nums);
}

/**
 * Tính số lượng hoán vị (n!)
 * @param {number} n - số lượng phần tử
 * @returns {number} - số lượng hoán vị
 */
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n)
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Không thay đổi mảng gốc
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time    | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ------- | ----- | ------------------- | ------------------------------- |
| Brute Force (Used)   | O(n!×n) | O(n)  | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized (Swap)     | O(n!×n) | O(n)  | Trung bình / Medium | Production, cần tối ưu          |
| Advanced (Swap)      | O(n!×n) | O(n)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(permute_advanced([1, 2, 3]));
// Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

console.log(permute_advanced([0, 1]));
// Expected: [[0,1],[1,0]]

console.log(permute_advanced([1]));
// Expected: [[1]]
```

### Test Case 2: Edge case

```javascript
// Mảng có số âm
console.log(permute_advanced([-1, 1]));
// Expected: [[-1,1],[1,-1]]

// Mảng có 0
console.log(permute_advanced([0, 1, 2]));
// Expected: [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
```

### Test Case 3: Phức tạp / Complex

```javascript
// Mảng có độ dài tối đa (6)
console.log(permute_advanced([1, 2, 3, 4, 5, 6]));
// Expected: 720 hoán vị (6!)

// Mảng có số lớn
console.log(permute_advanced([10, 20, 30]));
// Expected: [[10,20,30],[10,30,20],[20,10,30],[20,30,10],[30,10,20],[30,20,10]]
```

---

## 📚 Tài liệu tham khảo / References

- [Backtracking](../../algorithms/algorithms/backtracking.md)
- [Recursion](../../algorithms/algorithms/recursion.md)
- [LeetCode Discuss](https://leetcode.com/problems/permutations/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Với mảng used, nhớ reset sau khi backtrack
- **Tip 2:** Với swap, nhớ swap lại sau khi backtrack
- **Tip 3:** Luôn copy mảng khi thêm vào kết quả: `[...nums]`
- **Tip 4:** Base case là khi current permutation có độ dài bằng nums.length
- **Lỗi thường gặp và cách tránh:**
  - Quên reset used[i] = false sau backtrack
  - Quên swap lại sau backtrack
  - Không copy mảng khi thêm vào kết quả
  - Sai điều kiện base case

---

_Last updated: 2026-02-03_
