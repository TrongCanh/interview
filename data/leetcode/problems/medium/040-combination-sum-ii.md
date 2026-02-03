# Combination Sum II / Tổng Hợp Các Số II

> LeetCode Problem 40 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 40
- **URL:** https://leetcode.com/problems/combination-sum-ii/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Backtracking
- **Tags:** Array, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking, Recursion
- **Patterns liên quan / Related Patterns:** Backtracking

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used once in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**

```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**

```
Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]
```

**Constraints:**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng các số nguyên (có thể trùng lặp) và một giá trị target
- **Output:** Danh sách tất cả các combination duy nhất có tổng bằng target
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ candidates.length ≤ 100
  - Giá trị phần tử: 1 ≤ candidates[i] ≤ 50
  - Target: 1 ≤ target ≤ 30
  - Mỗi số chỉ được dùng 1 lần trong mỗi combination
  - Không được có combination trùng lặp
- **Edge cases:**
  - Không có combination nào đạt target
  - Candidates có nhiều phần tử trùng lặp
  - Target nhỏ hơn tất cả candidates

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm tất cả các combination duy nhất có tổng bằng target
- **Bước 2:** Nhận thấy có thể dùng backtracking tương tự Combination Sum
- **Bước 3:** Để tránh trùng lặp, cần:
  - Sắp xếp candidates
  - Bỏ qua các phần tử trùng lặp trong cùng một level

### 3. Ví dụ minh họa / Examples

```
Example 1: candidates = [10,1,2,7,6,1,5], target = 8
- Sắp xếp: [1,1,2,5,6,7,10]
- [1,1,6]: 1+1+6=8 ✓
- [1,2,5]: 1+2+5=8 ✓
- [1,7]: 1+7=8 ✓
- [2,6]: 2+6=8 ✓
- Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

Example 2: candidates = [2,5,2,1,2], target = 5
- Sắp xếp: [1,2,2,2,5]
- [1,2,2]: 1+2+2=5 ✓
- [5]: 5=5 ✓
- Output: [[1,2,2],[5]]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Thử tất cả các combination có thể bằng cách thử từng candidate và đệ quy, dùng Set để tránh trùng lặp.

### Thuật toán / Algorithm

1. Sắp xếp candidates để dễ dàng cắt nhánh
2. Dùng backtracking với Set để lưu kết quả
3. Chỉ chọn từ vị trí hiện tại + 1 (không dùng lại cùng số)
4. Convert Set thành Array trước khi trả về

### Code / Implementation

```javascript
function combinationSum2_bruteForce(candidates, target) {
  const result = new Set();

  candidates.sort((a, b) => a - b);

  function backtrack(startIndex, currentCombination, remainingTarget) {
    if (remainingTarget === 0) {
      result.add(JSON.stringify(currentCombination));
      return;
    }

    if (remainingTarget < 0) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      if (candidates[i] > remainingTarget) {
        break;
      }

      currentCombination.push(candidates[i]);
      // i+1 thay vì i vì không được dùng lại cùng số
      backtrack(i + 1, currentCombination, remainingTarget - candidates[i]);
      currentCombination.pop();
    }
  }

  backtrack(0, [], target);

  // Convert Set of strings to Array of arrays
  return Array.from(result).map((s) => JSON.parse(s));
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(2^n) - n là số lượng candidates
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tìm được tất cả các combination
- Tránh được trùng lặp nhờ Set

### Nhược điểm / Cons

- Dùng Set làm tăng bộ nhớ
- Không tối ưu việc cắt nhánh

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tránh trùng lặp mà không cần dùng Set
- Điểm yếu của giải pháp 1? Dùng Set tốn bộ nhớ và thời gian
- Cách tiếp cận mới? Bỏ qua các phần tử trùng lặp trong cùng một level

### Ý tưởng / Idea

Sắp xếp candidates và dùng backtracking với pruning:

1. Sắp xếp candidates tăng dần
2. Trong vòng lặp, bỏ qua các phần tử trùng lặp trong cùng một level
3. Chỉ chọn từ startIndex trở đi để tránh trùng lặp

### Thuật toán / Algorithm

1. Sắp xếp candidates tăng dần
2. Dùng backtracking:
   - Nếu remainingTarget = 0, thêm combination vào kết quả
   - Duyệt từ startIndex đến cuối:
     - Nếu i > startIndex và candidates[i] === candidates[i-1], skip (tránh trùng lặp)
     - Nếu candidates[i] > remainingTarget, break (pruning)
     - Thêm candidates[i] vào combination
     - Đệ quy với i+1 (không dùng lại candidate này)
     - Pop candidate khỏi combination

### Code / Implementation

```javascript
function combinationSum2_optimized(candidates, target) {
  const result = [];

  // Sắp xếp để dễ dàng pruning và tránh trùng lặp
  candidates.sort((a, b) => a - b);

  function backtrack(startIndex, currentCombination, remainingTarget) {
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      // Bỏ qua phần tử trùng lặp trong cùng một level
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // Pruning: nếu candidate lớn hơn target còn lại, không cần thử nữa
      if (candidates[i] > remainingTarget) {
        break;
      }

      currentCombination.push(candidates[i]);
      // i+1 thay vì i vì không được dùng lại candidate này
      backtrack(i + 1, currentCombination, remainingTarget - candidates[i]);
      currentCombination.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(2^n) - nhưng với pruning sẽ nhanh hơn nhiều
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

- Có thể cải thiện thêm không? Có thể cải thiện code structure và readability
- Có thuật toán/pattern nào phù hợp hơn? Backtracking với early termination

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu về thuật toán. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function combinationSum2_advanced(candidates, target) {
  const result = [];

  // Sắp xếp candidates để dễ dàng pruning và tránh trùng lặp
  const sortedCandidates = [...candidates].sort((a, b) => a - b);

  /**
   * Kiểm tra có nên bỏ qua candidate này không (để tránh trùng lặp)
   * @param {number} currentIndex - chỉ số hiện tại
   * @param {number} startIndex - chỉ số bắt đầu của vòng lặp hiện tại
   * @param {number[]} candidates - mảng candidates đã sắp xếp
   * @returns {boolean}
   */
  function shouldSkipDuplicate(currentIndex, startIndex, candidates) {
    // Nếu không phải là phần tử đầu tiên trong vòng lặp
    // Và bằng với phần tử trước đó, thì bỏ qua
    return (
      currentIndex > startIndex &&
      candidates[currentIndex] === candidates[currentIndex - 1]
    );
  }

  /**
   * Backtracking để tìm tất cả các combination
   * @param {number} startIndex - chỉ số bắt đầu để tránh trùng lặp
   * @param {number[]} currentCombination - combination hiện tại
   * @param {number} remainingTarget - target còn lại cần đạt
   */
  function backtrack(startIndex, currentCombination, remainingTarget) {
    // Base case: tìm được combination hợp lệ
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    // Duyệt qua từng candidate từ startIndex
    for (let i = startIndex; i < sortedCandidates.length; i++) {
      // Bỏ qua phần tử trùng lặp trong cùng một level
      if (shouldSkipDuplicate(i, startIndex, sortedCandidates)) {
        continue;
      }

      const candidate = sortedCandidates[i];

      // Pruning: nếu candidate lớn hơn target còn lại, không cần thử nữa
      if (candidate > remainingTarget) {
        break;
      }

      // Thêm candidate vào combination
      currentCombination.push(candidate);

      // Đệ quy với i+1 (không dùng lại candidate này)
      backtrack(i + 1, currentCombination, remainingTarget - candidate);

      // Backtrack: loại bỏ candidate vừa thêm
      currentCombination.pop();
    }
  }

  // Bắt đầu backtracking từ index 0
  backtrack(0, [], target);

  return result;
}

/**
 * Hàm wrapper để dễ test và extend
 * @param {number[]} candidates - mảng các số nguyên (có thể trùng lặp)
 * @param {number} target - giá trị target cần đạt
 * @returns {number[][]} - danh sách các combination duy nhất
 */
function findCombinations2(candidates, target) {
  // Validate input
  if (!candidates || candidates.length === 0 || target <= 0) {
    return [];
  }

  return combinationSum2_advanced(candidates, target);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(2^n) - với pruning giúp giảm đáng kể
- **Space Complexity:** O(n) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test và extend
- Tối ưu về hiệu năng
- Không dùng Set, tiết kiệm bộ nhớ

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ------ | ----- | ------------------- | ------------------------------- |
| Brute Force          | O(2^n) | O(n)  | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized            | O(2^n) | O(n)  | Trung bình / Medium | Production, cần tối ưu          |
| Advanced             | O(2^n) | O(n)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(combinationSum2_advanced([10, 1, 2, 7, 6, 1, 5], 8));
// Expected: [[1,1,6],[1,2,5],[1,7],[2,6]]

console.log(combinationSum2_advanced([2, 5, 2, 1, 2], 5));
// Expected: [[1,2,2],[5]]
```

### Test Case 2: Edge case

```javascript
// Target bằng với một candidate
console.log(combinationSum2_advanced([1, 2, 3, 5], 5));
// Expected: [[5],[2,3]]

// Chỉ có 1 candidate
console.log(combinationSum2_advanced([3], 3));
// Expected: [[3]]

// Candidates lớn hơn target
console.log(combinationSum2_advanced([5, 6, 7], 3));
// Expected: []
```

### Test Case 3: Phức tạp / Complex

```javascript
// Nhiều phần tử trùng lặp
console.log(combinationSum2_advanced([1, 1, 1, 2, 2, 2], 4));
// Expected: [[1,1,2],[2,2]]

// Tất cả phần tử giống nhau
console.log(combinationSum2_advanced([2, 2, 2, 2, 2], 6));
// Expected: [[2,2,2]]

// Candidates không liên tiếp
console.log(combinationSum2_advanced([3, 5, 7, 9], 12));
// Expected: [[3,9],[5,7]]
```

---

## 📚 Tài liệu tham khảo / References

- [Backtracking](../../algorithms/algorithms/backtracking.md)
- [Recursion](../../algorithms/algorithms/recursion.md)
- [LeetCode Discuss](https://leetcode.com/problems/combination-sum-ii/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn sắp xếp candidates trước để dễ dàng pruning và tránh trùng lặp
- **Tip 2:** Điều kiện `i > startIndex && candidates[i] === candidates[i-1]` giúp tránh trùng lặp
- **Tip 3:** Dùng `i+1` thay vì `i` trong đệ quy vì không được dùng lại cùng số
- **Tip 4:** Khi candidate > remainingTarget, break ngay (do đã sắp xếp)
- **Lỗi thường gặp và cách tránh:**
  - Quên điều kiện skip trùng lặp, dẫn đến kết quả trùng
  - Dùng `i >= startIndex` thay vì `i > startIndex`, sẽ skip quá nhiều
  - Dùng `i` thay vì `i+1` trong đệ quy, cho phép dùng lại số (sai)
  - Quên pop sau đệ quy (backtrack)
  - Không copy array khi thêm vào kết quả

---

_Last updated: 2026-02-03_
