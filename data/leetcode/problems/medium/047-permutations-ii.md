# Permutations II / Các Hoán Vị II

> LeetCode Problem 47 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 47
- **URL:** https://leetcode.com/problems/permutations-ii/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Backtracking
- **Tags:** Array, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking, Recursion
- **Patterns liên quan / Related Patterns:** Backtracking

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations **in any order**.

**Example 1:**

```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**Example 2:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Constraints:**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng các số nguyên (có thể trùng lặp)
- **Output:** Tất cả các hoán vị duy nhất của mảng
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 8
  - Giá trị phần tử: -10 ≤ nums[i] ≤ 10
  - Có thể có phần tử trùng lặp
  - Kết quả phải là duy nhất
- **Edge cases:**
  - Mảng có 1 phần tử
  - Mảng có nhiều phần tử trùng lặp
  - Mảng không có phần tử trùng lặp

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tạo tất cả các hoán vị duy nhất của mảng
- **Bước 2:** Nhận thấy có thể dùng backtracking tương tự Permutations
- **Bước 3:** Để tránh trùng lặp, cần sắp xếp và bỏ qua các phần tử trùng trong cùng một level

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [1,1,2]
- Sắp xếp: [1,1,2]
- Các hoán vị duy nhất: [1,1,2], [1,2,1], [2,1,1]
- Output: [[1,1,2],[1,2,1],[2,1,1]]

Example 2: nums = [1,2,3]
- Không có trùng lặp
- Tất cả hoán vị: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
- Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng backtracking với Set để tránh trùng lặp.

### Thuật toán / Algorithm

1. Sắp xếp nums để dễ dàng tránh trùng lặp
2. Dùng backtracking với mảng used để theo dõi phần tử đã dùng
3. Khi current permutation có độ dài bằng nums.length, thêm vào Set
4. Convert Set thành Array trước khi trả về

### Code / Implementation

```javascript
function permuteUnique_bruteForce(nums) {
  const result = new Set();
  const used = new Array(nums.length).fill(false);

  // Sắp xếp để dễ dàng tránh trùng lặp
  nums.sort((a, b) => a - b);

  function backtrack(currentPermutation) {
    // Base case: đã hoàn thành một hoán vị
    if (currentPermutation.length === nums.length) {
      result.add(JSON.stringify(currentPermutation));
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

  // Convert Set of strings to Array of arrays
  return Array.from(result).map((s) => JSON.parse(s));
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n) - n! hoán vị, mỗi hoán vị có n phần tử
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tìm được tất cả các hoán vị
- Tránh được trùng lặp nhờ Set

### Nhược điểm / Cons

- Dùng Set làm tăng bộ nhớ
- Không tối ưu việc tránh trùng lặp

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tránh trùng lặp mà không cần dùng Set
- Điểm yếu của giải pháp 1? Dùng Set tốn bộ nhớ và thời gian
- Cách tiếp cận mới? Bỏ qua các phần tử trùng lặp trong cùng một level

### Ý tưởng / Idea

Sắp xếp nums và dùng backtracking với skip logic:

1. Sắp xếp nums tăng dần
2. Trong vòng lặp, bỏ qua các phần tử trùng lặp trong cùng một level
3. Chỉ chọn từ startIndex trở đi để tránh trùng lặp

### Thuật toán / Algorithm

1. Sắp xếp nums tăng dần
2. Dùng backtracking với mảng used:
   - Nếu current permutation có độ dài bằng nums.length, thêm vào kết quả
   - Duyệt từ 0 đến cuối:
     - Nếu used[i], skip
     - Nếu i > 0 && nums[i] === nums[i-1] && !used[i-1], skip (tránh trùng lặp)
     - Đánh dấu used[i] = true, thêm nums[i] vào permutation
     - Đệ quy
     - Backtrack: used[i] = false, pop

### Code / Implementation

```javascript
function permuteUnique_optimized(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  // Sắp xếp để dễ dàng tránh trùng lặp
  nums.sort((a, b) => a - b);

  function backtrack(currentPermutation) {
    // Base case: đã hoàn thành một hoán vị
    if (currentPermutation.length === nums.length) {
      result.push([...currentPermutation]);
      return;
    }

    // Duyệt qua từng phần tử
    for (let i = 0; i < nums.length; i++) {
      // Nếu phần tử đã được dùng, skip
      if (used[i]) {
        continue;
      }

      // Bỏ qua phần tử trùng lặp trong cùng một level
      // Nếu phần tử hiện tại bằng với phần tử trước đó
      // Và phần tử trước đó chưa được dùng trong level hiện tại
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

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

  backtrack([]);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n) - với skip logic giúp giảm đáng kể
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Không dùng Set, tiết kiệm bộ nhớ
- Tránh trùng lặp hiệu quả
- Tối ưu với pruning
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Cần sắp xếp mảng trước
- Logic skip trùng lặp cần hiểu rõ

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Backtracking với skip logic là chuẩn

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function permuteUnique_advanced(nums) {
  // Validate input
  if (!isValidInput(nums)) {
    return [];
  }

  const result = [];
  const used = new Array(nums.length).fill(false);

  // Sắp xếp để dễ dàng tránh trùng lặp
  const sortedNums = [...nums].sort((a, b) => a - b);

  // Bắt đầu backtracking
  backtrack(sortedNums, used, [], result);

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
 * Backtracking để tạo tất cả các hoán vị duy nhất
 * @param {number[]} nums - mảng đã sắp xếp
 * @param {boolean[]} used - mảng đánh dấu phần tử đã dùng
 * @param {number[]} currentPermutation - hoán vị hiện tại
 * @param {number[][]} result - mảng kết quả
 */
function backtrack(nums, used, currentPermutation, result) {
  // Base case: đã hoàn thành một hoán vị
  if (currentPermutation.length === nums.length) {
    addPermutationToResult(currentPermutation, result);
    return;
  }

  // Duyệt qua từng phần tử
  for (let i = 0; i < nums.length; i++) {
    // Nếu phần tử đã được dùng, skip
    if (isUsed(used, i)) {
      continue;
    }

    // Bỏ qua phần tử trùng lặp trong cùng một level
    if (shouldSkipDuplicate(nums, used, i)) {
      continue;
    }

    // Đánh dấu là đã dùng
    markAsUsed(used, i);

    // Thêm vào hoán vị hiện tại
    addToPermutation(currentPermutation, nums[i]);

    // Đệ quy
    backtrack(nums, used, currentPermutation, result);

    // Backtrack
    removeFromPermutation(currentPermutation);
    markAsUnused(used, i);
  }
}

/**
 * Kiểm tra phần tử đã được dùng chưa
 * @param {boolean[]} used - mảng đánh dấu
 * @param {number} index - chỉ số phần tử
 * @returns {boolean}
 */
function isUsed(used, index) {
  return used[index];
}

/**
 * Kiểm tra có nên bỏ qua phần tử trùng lặp không
 * @param {number[]} nums - mảng đã sắp xếp
 * @param {boolean[]} used - mảng đánh dấu
 * @param {number} index - chỉ số hiện tại
 * @returns {boolean}
 */
function shouldSkipDuplicate(nums, used, index) {
  // Nếu không phải là phần tử đầu tiên trong vòng lặp
  // Và bằng với phần tử trước đó
  // Và phần tử trước đó chưa được dùng trong level hiện tại
  return index > 0 && nums[index] === nums[index - 1] && !used[index - 1];
}

/**
 * Đánh dấu phần tử là đã dùng
 * @param {boolean[]} used - mảng đánh dấu
 * @param {number} index - chỉ số phần tử
 */
function markAsUsed(used, index) {
  used[index] = true;
}

/**
 * Đánh dấu phần tử là chưa dùng
 * @param {boolean[]} used - mảng đánh dấu
 * @param {number} index - chỉ số phần tử
 */
function markAsUnused(used, index) {
  used[index] = false;
}

/**
 * Thêm phần tử vào hoán vị hiện tại
 * @param {number[]} currentPermutation - hoán vị hiện tại
 * @param {number} value - giá trị cần thêm
 */
function addToPermutation(currentPermutation, value) {
  currentPermutation.push(value);
}

/**
 * Loại bỏ phần tử cuối cùng khỏi hoán vị hiện tại
 * @param {number[]} currentPermutation - hoán vị hiện tại
 */
function removeFromPermutation(currentPermutation) {
  currentPermutation.pop();
}

/**
 * Thêm hoán vị vào kết quả
 * @param {number[]} currentPermutation - hoán vị hiện tại
 * @param {number[][]} result - mảng kết quả
 */
function addPermutationToResult(currentPermutation, result) {
  result.push([...currentPermutation]);
}

/**
 * Hàm wrapper để dễ test
 * @param {number[]} nums - mảng đầu vào
 * @returns {number[][]} - tất cả các hoán vị duy nhất
 */
function getUniquePermutations(nums) {
  return permuteUnique_advanced(nums);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! × n) - với skip logic giúp giảm đáng kể
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng
- Không dùng Set, tiết kiệm bộ nhớ

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time    | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ------- | ----- | ------------------- | ------------------------------- |
| Brute Force (Set)    | O(n!×n) | O(n)  | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized (Skip)     | O(n!×n) | O(n)  | Trung bình / Medium | Production, cần tối ưu          |
| Advanced (Skip)      | O(n!×n) | O(n)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(permuteUnique_advanced([1, 1, 2]));
// Expected: [[1,1,2],[1,2,1],[2,1,1]]

console.log(permuteUnique_advanced([1, 2, 3]));
// Expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Test Case 2: Edge case

```javascript
// Mảng có 1 phần tử
console.log(permuteUnique_advanced([1]));
// Expected: [[1]]

// Tất cả phần tử giống nhau
console.log(permuteUnique_advanced([1, 1, 1]));
// Expected: [[1,1,1]]

// Mảng có 2 phần tử trùng
console.log(permuteUnique_advanced([1, 1]));
// Expected: [[1,1]]
```

### Test Case 3: Phức tạp / Complex

```javascript
// Nhiều phần tử trùng lặp
console.log(permuteUnique_advanced([1, 1, 2, 2]));
// Expected: [[1,1,2,2],[1,2,1,2],[1,2,2,1],[2,1,1,2],[2,1,2,1],[2,2,1,1]]

// Mảng có số âm
console.log(permuteUnique_advanced([-1, -1, 2]));
// Expected: [[-1,-1,2],[-1,2,-1],[2,-1,-1]]
```

---

## 📚 Tài liệu tham khảo / References

- [Backtracking](../../algorithms/algorithms/backtracking.md)
- [Recursion](../../algorithms/algorithms/recursion.md)
- [LeetCode Discuss](https://leetcode.com/problems/permutations-ii/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn sắp xếp nums trước để dễ dàng tránh trùng lặp
- **Tip 2:** Điều kiện `i > 0 && nums[i] === nums[i-1] && !used[i-1]` giúp tránh trùng lặp
- **Tip 3:** `!used[i-1]` nghĩa là phần tử trước đó chưa được dùng trong level hiện tại
- **Tip 4:** Quên reset used[i] = false sau backtrack
- **Lỗi thường gặp và cách tránh:**
  - Quên điều kiện skip trùng lặp, dẫn đến kết quả trùng
  - Dùng `used[i-1]` thay vì `!used[i-1]`, sẽ skip quá nhiều
  - Quên reset used[i] = false sau backtrack
  - Không copy array khi thêm vào kết quả

---

_Last updated: 2026-02-03_
