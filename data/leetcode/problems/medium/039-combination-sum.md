# Combination Sum / Tổng Hợp Các Số

> LeetCode Problem 39 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 39
- **URL:** https://leetcode.com/problems/combination-sum/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Backtracking
- **Tags:** Array, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking, Recursion
- **Patterns liên quan / Related Patterns:** Backtracking

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than 150 combinations for the given input.

**Example 1:**

```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**

```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

**Example 3:**

```
Input: candidates = [2], target = 1
Output: []
```

**Constraints:**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are distinct.
- `1 <= target <= 40`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng các số nguyên phân biệt và một giá trị target
- **Output:** Danh sách tất cả các combination có tổng bằng target
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ candidates.length ≤ 30
  - Giá trị phần tử: 2 ≤ candidates[i] ≤ 40
  - Tất cả phần tử là phân biệt (không trùng lặp)
  - Target: 1 ≤ target ≤ 40
  - Mỗi số có thể được dùng nhiều lần
  - Các combination phải là duy nhất
- **Edge cases:**
  - Không có combination nào đạt target
  - Target nhỏ hơn tất cả candidates
  - Chỉ có 1 candidate

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm tất cả các combination có tổng bằng target
- **Bước 2:** Nhận thấy có thể dùng backtracking để thử từng combination
- **Bước 3:** Để tránh trùng lặp, chỉ chọn từ vị trí hiện tại trở đi

### 3. Ví dụ minh họa / Examples

```
Example 1: candidates = [2,3,6,7], target = 7
- Combination [2,2,3]: 2+2+3=7 ✓
- Combination [7]: 7=7 ✓
- Output: [[2,2,3],[7]]

Example 2: candidates = [2,3,5], target = 8
- [2,2,2,2]: 2+2+2+2=8 ✓
- [2,3,3]: 2+3+3=8 ✓
- [3,5]: 3+5=8 ✓
- Output: [[2,2,2,2],[2,3,3],[3,5]]

Example 3: candidates = [2], target = 1
- Không có combination nào
- Output: []
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Thử tất cả các combination có thể bằng cách thử từng candidate và đệ quy.

### Thuật toán / Algorithm

1. Sắp xếp candidates để dễ dàng cắt nhánh (pruning)
2. Dùng backtracking để thử từng combination:
   - Thêm candidate hiện tại vào combination
   - Đệ quy với target mới = target - candidate
   - Nếu target = 0, thêm combination vào kết quả
   - Nếu target < 0, quay lại (backtrack)
   - Nếu target > 0, tiếp tục thử

### Code / Implementation

```javascript
function combinationSum_bruteForce(candidates, target) {
  const result = [];

  function backtrack(startIndex, currentCombination, remainingTarget) {
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    if (remainingTarget < 0) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      currentCombination.push(candidates[i]);
      backtrack(i, currentCombination, remainingTarget - candidates[i]);
      currentCombination.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(N^(T/M + 1)) - N là số lượng candidates, T là target, M là giá trị nhỏ nhất
- **Space Complexity:** O(T/M) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tìm được tất cả các combination

### Nhược điểm / Cons

- Có thể chậm với input lớn
- Không tối ưu hóa việc cắt nhánh

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tối ưu bằng cách sắp xếp và cắt nhánh sớm
- Điểm yếu của giải pháp 1? Không tận dụng việc sắp xếp để cắt nhánh
- Cách tiếp cận mới? Sắp xếp candidates và cắt nhánh khi candidate > remaining target

### Ý tưởng / Idea

Sắp xếp candidates và dùng backtracking với pruning:

1. Sắp xếp candidates tăng dần
2. Trong vòng lặp, nếu candidate > remaining target, break (do đã sắp xếp)
3. Chỉ thử từ startIndex trở đi để tránh trùng lặp

### Thuật toán / Algorithm

1. Sắp xếp candidates tăng dần
2. Dùng backtracking:
   - Nếu remainingTarget = 0, thêm combination vào kết quả
   - Duyệt từ startIndex đến cuối:
     - Nếu candidates[i] > remainingTarget, break (pruning)
     - Thêm candidates[i] vào combination
     - Đệ quy với i (có thể dùng lại candidate này)
     - Pop candidate khỏi combination

### Code / Implementation

```javascript
function combinationSum_optimized(candidates, target) {
  const result = [];

  // Sắp xếp để dễ dàng pruning
  candidates.sort((a, b) => a - b);

  function backtrack(startIndex, currentCombination, remainingTarget) {
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      // Pruning: nếu candidate lớn hơn target còn lại, không cần thử nữa
      if (candidates[i] > remainingTarget) {
        break;
      }

      currentCombination.push(candidates[i]);
      // i thay vì i+1 vì có thể dùng lại candidate này
      backtrack(i, currentCombination, remainingTarget - candidates[i]);
      currentCombination.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(N^(T/M + 1)) - nhưng với pruning sẽ nhanh hơn nhiều
- **Space Complexity:** O(T/M) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Tối ưu với pruning
- Tránh các combination không cần thiết
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Cần sắp xếp mảng trước
- Logic vẫn tương tự brute force

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
function combinationSum_advanced(candidates, target) {
  const result = [];

  // Sắp xếp candidates để dễ dàng pruning
  const sortedCandidates = [...candidates].sort((a, b) => a - b);

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
      const candidate = sortedCandidates[i];

      // Pruning: nếu candidate lớn hơn target còn lại, không cần thử nữa
      // Do đã sắp xếp, tất cả candidates sau cũng sẽ lớn hơn
      if (candidate > remainingTarget) {
        break;
      }

      // Thêm candidate vào combination
      currentCombination.push(candidate);

      // Đệ quy với i (không phải i+1) vì có thể dùng lại candidate này
      backtrack(i, currentCombination, remainingTarget - candidate);

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
 * @param {number[]} candidates - mảng các số nguyên phân biệt
 * @param {number} target - giá trị target cần đạt
 * @returns {number[][]} - danh sách các combination
 */
function findCombinations(candidates, target) {
  // Validate input
  if (!candidates || candidates.length === 0 || target <= 0) {
    return [];
  }

  return combinationSum_advanced(candidates, target);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(N^(T/M + 1)) - với pruning giúp giảm đáng kể
- **Space Complexity:** O(T/M) - độ sâu tối đa của đệ quy

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test và extend
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time         | Space  | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ------------ | ------ | ------------------- | ------------------------------- |
| Brute Force          | O(N^(T/M+1)) | O(T/M) | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized            | O(N^(T/M+1)) | O(T/M) | Trung bình / Medium | Production, cần tối ưu          |
| Advanced             | O(N^(T/M+1)) | O(T/M) | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(combinationSum_advanced([2, 3, 6, 7], 7));
// Expected: [[2,2,3],[7]]

console.log(combinationSum_advanced([2, 3, 5], 8));
// Expected: [[2,2,2,2],[2,3,3],[3,5]]

console.log(combinationSum_advanced([2], 1));
// Expected: []
```

### Test Case 2: Edge case

```javascript
// Target bằng với một candidate
console.log(combinationSum_advanced([2, 3, 5], 5));
// Expected: [[5],[2,3]]

// Chỉ có 1 candidate
console.log(combinationSum_advanced([3], 9));
// Expected: [[3,3,3]]

// Candidates lớn hơn target
console.log(combinationSum_advanced([5, 6, 7], 3));
// Expected: []
```

### Test Case 3: Phức tạp / Complex

```javascript
// Nhiều candidates, target lớn
console.log(combinationSum_advanced([2, 3, 4, 5], 10));
// Expected: [[2,2,2,2,2],[2,2,3,3],[2,2,2,4],[2,3,5],[2,4,4],[3,3,4],[5,5]]

// Candidates không liên tiếp
console.log(combinationSum_advanced([3, 5, 7], 15));
// Expected: [[3,3,3,3,3],[3,5,7],[5,5,5]]
```

---

## 📚 Tài liệu tham khảo / References

- [Backtracking](../../algorithms/algorithms/backtracking.md)
- [Recursion](../../algorithms/algorithms/recursion.md)
- [LeetCode Discuss](https://leetcode.com/problems/combination-sum/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn sắp xếp candidates trước để dễ dàng pruning
- **Tip 2:** Dùng startIndex thay vì luôn bắt đầu từ 0 để tránh trùng lặp
- **Tip 3:** Khi candidate > remainingTarget, break ngay (do đã sắp xếp)
- **Tip 4:** Copy array khi thêm vào kết quả: `[...currentCombination]` thay vì `currentCombination`
- **Lỗi thường gặp và cách tránh:**
  - Quên pop sau đệ quy (backtrack)
  - Dùng i+1 thay vì i trong đệ quy (sẽ không thể dùng lại candidate)
  - Không copy array khi thêm vào kết quả (sẽ bị thay đổi sau này)
  - Quên sắp xếp trước khi pruning

---

_Last updated: 2026-02-03_
