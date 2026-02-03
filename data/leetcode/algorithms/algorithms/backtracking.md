# Backtracking / Quay lui

> Thuật toán tìm kiếm tất cả các giải pháp bằng cách thử từng khả năng và quay lui khi gặp bế tắc / Search algorithm that tries all possibilities and backtracks when stuck

---

## 📚 Khái niệm / Concept

**Backtracking** là một kỹ thuật thuật toán tìm kiếm tất cả các giải pháp cho một bài toán bằng cách xây dựng dần dần các giải pháp và "quay lui" (backtrack) khi phát hiện giải pháp hiện tại không thể dẫn đến giải pháp hợp lệ.

**Backtracking** is an algorithmic technique that finds all solutions to a problem by incrementally building solutions and "backtracking" when the current solution cannot lead to a valid solution.

### Nguyên lý hoạt động / How it works

1. **Build (Xây dựng):** Thêm từng phần tử vào giải pháp hiện tại
2. **Check (Kiểm tra):** Kiểm tra giải pháp hiện tại có hợp lệ không
3. **Backtrack (Quay lui):** Nếu không hợp lệ, quay lại bước trước
4. **Repeat (Lặp lại):** Tiếp tục cho đến khi tìm được tất cả giải pháp

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần tìm TẤT CẢ các giải pháp
  - Bài toán có nhiều bước quyết định
  - Cần thử tất cả các khả năng
  - Có thể xác định nhanh khi một giải pháp không hợp lệ

- **Không dùng khi:**
  - Chỉ cần một giải pháp (dùng greedy hoặc DP)
  - Không thể xác định nhanh khi không hợp lệ
  - Không gian tìm kiếm quá lớn

---

## 🔄 Các biến thể / Variations

### 1. Standard Backtracking / Quay lui chuẩn

Dùng cho các bài toán như N-Queens, Sudoku, Permutations.

```javascript
function backtrack(current, n, result) {
  // Base case: found a solution
  if (isValidSolution(current)) {
    result.push([...current]);
    return;
  }

  // Try each possibility
  for (let i = 0; i < n; i++) {
    current.push(i);

    if (isValid(current)) {
      backtrack(current, n, result);
    }

    current.pop(); // Backtrack
  }
}
```

### 2. Backtracking with Pruning / Quay lui với cắt tỉa

Tối ưu bằng cách cắt tỉa các nhánh không thể dẫn đến giải pháp.

```javascript
function backtrackWithPruning(current, n, result) {
  if (isValidSolution(current)) {
    result.push([...current]);
    return;
  }

  for (let i = 0; i < n; i++) {
    // Prune: skip if this can't lead to solution
    if (!canLeadToSolution(current, i)) {
      continue;
    }

    current.push(i);
    backtrackWithPruning(current, n, result);
    current.pop();
  }
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Backtracking - Basic Template
 * @param {Array} current - Current solution being built
 * @param {Array} result - Array to store all valid solutions
 */
function backtrack(current, result) {
  // Base case: found a valid solution
  if (isComplete(current)) {
    result.push([...current]);
    return;
  }

  // Try each possible choice
  for (const choice of getChoices(current)) {
    // Make a choice
    current.push(choice);

    // If valid, continue exploring
    if (isValid(current)) {
      backtrack(current, result);
    }

    // Undo the choice (backtrack)
    current.pop();
  }
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Backtracking - Advanced Template with Pruning
 * @param {Array} current - Current solution being built
 * @param {number} start - Starting index for choices
 * @param {Array} result - Array to store all valid solutions
 */
function backtrackAdvanced(current, start, result) {
  // Base case
  if (isComplete(current)) {
    result.push([...current]);
    return;
  }

  // Try each choice from start onwards
  for (let i = start; i < getNumChoices(); i++) {
    // Pruning: skip invalid choices early
    if (!canChoose(current, i)) {
      continue;
    }

    current.push(i);
    backtrackAdvanced(current, i + 1, result);
    current.pop();
  }
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Permutations / Hoán vị

**Mô tả:** Tìm tất cả hoán vị của một mảng.

**Code:**

```javascript
function permute(nums) {
  const result = [];
  backtrack([], nums, result);
  return result;
}

function backtrack(current, remaining, result) {
  if (remaining.length === 0) {
    result.push([...current]);
    return;
  }

  for (let i = 0; i < remaining.length; i++) {
    current.push(remaining[i]);
    backtrack(
      current,
      [...remaining.slice(0, i), ...remaining.slice(i + 1)],
      result,
    );
    current.pop();
  }
}

// permute([1,2,3]) = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Time: O(n*n!), Space: O(n!)
```

### Ví dụ 2: N-Queens / N-Queens

**Mô tả:** Đặt n quân hậu trên bàn cờ n×n sao cho không quân nào ăn nhau.

**Code:**

```javascript
function solveNQueens(n) {
  const result = [];
  backtrack([], n, result);
  return result;
}

function backtrack(current, n, result) {
  if (current.length === n) {
    result.push([...current]);
    return;
  }

  const row = current.length;
  for (let col = 0; col < n; col++) {
    if (isValid(current, row, col)) {
      current.push(col);
      backtrack(current, n, result);
      current.pop();
    }
  }
}

function isValid(current, row, col) {
  for (let i = 0; i < current.length; i++) {
    const prevRow = i;
    const prevCol = current[i];

    // Check column and diagonals
    if (
      prevCol === col ||
      Math.abs(prevRow - row) === Math.abs(prevCol - col)
    ) {
      return false;
    }
  }
  return true;
}

// solveNQueens(4) returns 2 solutions
// Time: O(n!), Space: O(n)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/hard/037-sudoku-solver.md`](../problems/hard/037-sudoku-solver.md)
- [Permutations](https://leetcode.com/problems/permutations/)
- [N-Queens](https://leetcode.com/problems/n-queens/)
- [Combination Sum](https://leetcode.com/problems/combination-sum/)
- [Subsets](https://leetcode.com/problems/subsets/)
- [Word Search](https://leetcode.com/problems/word-search/)

---

## 📊 Độ phức tạp / Complexity

| Loại / Type  | Time     | Space | Mô tả / Description |
| ------------ | -------- | ----- | ------------------- |
| Permutations | O(n\*n!) | O(n)  | n! hoán vị          |
| Subsets      | O(2^n)   | O(n)  | 2^n tập con         |
| N-Queens     | O(n!)    | O(n)  | n! cách đặt         |
| Sudoku       | O(9^m)   | O(m)  | m ô trống           |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên backtrack:** Không pop sau khi đệ quy
2. **Không copy mảng:** Tham chiếu thay vì copy khi lưu kết quả
3. **Cắt tỉa sai:** Cắt tỉa quá nhiều hoặc quá ít
4. **Base case sai:** Không xác định đúng điều kiện dừng
5. **Tính toán lại:** Không dùng memoization cho các bài toán con lặp lại

---

## 💡 Tips & Tricks

- Luôn backtrack sau khi đệ quy
- Copy mảng khi lưu vào result
- Dùng pruning để tối ưu
- Vẽ cây quyết định để visualize
- Xác định rõ base case
- Kiểm tra tính lặp lại, có thể dùng memoization

---

## 📚 Tài liệu tham khảo / References

- [Backtracking - Wikipedia](https://en.wikipedia.org/wiki/Backtracking)
- [Backtracking - GeeksforGeeks](https://www.geeksforgeeks.org/backtracking-algorithms/)
- [Backtracking - LeetCode](https://leetcode.com/tag/backtracking/)

---

_Last updated: 2026-02-03_
