# Sudoku Solver / Giải Sudoku

> LeetCode Problem 37 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 37
- **URL:** https://leetcode.com/problems/sudoku-solver/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Array, Matrix, Backtracking
- **Tags:** Array, Matrix, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking, Array
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

1. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.
2. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

**Note:**

- The given board `board` contains only digits `1-9` and character `'.'`.
- There will be only one unique solution.

**Example 1:**

```
Input: board = [
  ["5","3",".",".","7",".",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: The solved board (modified in-place)
```

**Constraints:**

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`.
- It is guaranteed that the input board has only one solution.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Bảng Sudoku 9x9 với các ô trống ('.')
- **Output:** Bảng Sudoku đã được giải (điền đầy đủ)
- **Ràng buộc / Constraints:**
  - Mỗi hàng 1-9 xuất hiện đúng một lần
  - Mỗi cột 1-9 xuất hiện đúng một lần
  - Mỗi ô 3x3 xuất hiện đúng một lần
- **Edge cases:**
  - Bảng đã giải hoàn chỉnh
  - Bảng rỗng (không thể theo constraints)
  - Nhiều ô trống

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần điền từng ô trống với số 1-9 thỏa mãn quy tắc Sudoku.
- **Bước 2:** Có thể dùng Backtracking để thử từng số và quay lui khi sai.
- **Bước 3:** Tối ưu bằng cách chỉ thử các số có thể cho ô đó (kiểm tra hàng, cột, ô 3x3).

### 3. Ví dụ minh họa / Examples

```
Example: Bảng Sudoku 9x9

Với Backtracking:
1. Tìm ô trống đầu tiên
2. Thử số 1-9, kiểm tra hợp lệ
3. Nếu hợp lệ, điền và tiếp tục
4. Nếu không hợp lệ, thử số khác
5. Nếu tất cả số đều không hợp lệ, quay lui (backtrack)

Tiếp tục cho đến khi bảng được giải hoàn chỉnh.
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Backtracking để thử từng số từ 1-9 cho mỗi ô trống.

### Thuật toán / Algorithm

1. Tìm ô trống tiếp theo
2. Thử số từ 1-9
3. Kiểm tra số có hợp lệ (hàng, cột, ô 3x3)
4. Nếu hợp lệ, điền và đệ quy
5. Nếu không hợp lệ, thử số khác
6. Nếu tất cả số đều không hợp lệ, quay lui

### Code / Implementation

```javascript
/**
 * Sudoku Solver - Basic Backtracking
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {void} - Solve in-place
 */
function solveSudoku_backtrack(board) {
  solve(board);
}

/**
 * Solve Sudoku using backtracking
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {boolean} - True if solved
 */
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        for (let num = "1"; num <= "9"; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            }
            board[row][col] = ".";
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Check if placing num at board[row][col] is valid
 * @param {character[][]} board - 9x9 Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {string} num - Number to place
 * @return {boolean} - True if valid
 */
function isValid(board, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(9^m) - m là số ô trống
- **Space Complexity:** O(m) - stack đệ quy

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Không tối ưu
- Thử nhiều số không cần thiết

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force thử tất cả số 1-9.
- Điểm yếu của giải pháp 1? Không dùng thông tin về số đã có trong hàng/cột/box.
- Cách tiếp cận mới? Lưu trữ số đã có và chỉ thử số còn lại.

### Ý tưởng / Idea

Sử dụng kỹ thuật "constraint propagation" để tối ưu: chỉ thử các số chưa có trong hàng, cột, và ô 3x3.

### Thuật toán / Algorithm

1. Với mỗi ô trống:
   - Tìm các số chưa có trong hàng
   - Tìm các số chưa có trong cột
   - Tìm các số chưa có trong ô 3x3
   - Chỉ thử các số chưa có ở cả 3 vị trí
2. Nếu thử hết số đều không hợp lệ, quay lui

### Code / Implementation

```javascript
/**
 * Sudoku Solver - Optimized with Constraint Propagation
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {void} - Solve in-place
 */
function solveSudoku_optimized(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  // Initialize sets with existing numbers
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        const num = board[i][j];
        rows[i].add(num);
        cols[j].add(num);
        boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(num);
      }
    }
  }

  solveOptimized(board, 0, 0, rows, cols, boxes);
}

/**
 * Solve with constraint propagation
 * @param {character[][]} board - 9x9 Sudoku board
 * @param {number} row - Current row
 * @param {number} col - Current column
 * @param {Set[]} rows - Row sets
 * @param {Set[]} cols - Column sets
 * @param {Set[]} boxes - Box sets
 * @return {boolean} - True if solved
 */
function solveOptimized(board, row, col, rows, cols, boxes) {
  if (row === 9) return true;

  // Find next empty cell
  if (board[row][col] !== ".") {
    return solveOptimized(
      board,
      row + (col + 1) / 9,
      (col + 1) % 9,
      rows,
      cols,
      boxes,
    );
  }

  const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

  for (let num = "1"; num <= "9"; num++) {
    if (
      !rows[row].has(num) &&
      !cols[col].has(num) &&
      !boxes[boxIndex].has(num)
    ) {
      board[row][col] = num;
      rows[row].add(num);
      cols[col].add(num);
      boxes[boxIndex].add(num);

      if (solveOptimized(board, row, col, rows, cols, boxes)) {
        return true;
      }

      // Backtrack
      board[row][col] = ".";
      rows[row].delete(num);
      cols[col].delete(num);
      boxes[boxIndex].delete(num);
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(9^m) - nhưng thực tế nhanh hơn nhiều
- **Space Complexity:** O(81) - cho các Set

### Ưu điểm / Pros

- Tối ưu hơn nhiều
- Ít lần thử sai

### Nhược điểm / Cons

- Tốn thêm bộ nhớ cho các Set
- Phức tạp hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng kỹ thuật "Minimum Remaining Values".
- Có thuật toán/pattern nào phù hợp hơn? Đây là bài toán Backtracking kinh điển.

### Ý tưởng / Idea

Tối ưu thêm bằng cách chọn ô có ít lựa chọn nhất trước (MRV - Minimum Remaining Values heuristic).

### Thuật toán / Algorithm

Tương tự giải pháp 2 nhưng ưu tiên xử lý các ô có ít số có thể điền nhất.

### Code / Implementation

```javascript
/**
 * Sudoku Solver - Advanced with MRV Heuristic
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {void} - Solve in-place
 */
function solveSudoku_advanced(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  // Initialize sets
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        const num = board[i][j];
        rows[i].add(num);
        cols[j].add(num);
        boxes[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(num);
      }
    }
  }

  solveAdvanced(board, rows, cols, boxes);
}

/**
 * Solve with MRV heuristic
 * @param {character[][]} board - 9x9 Sudoku board
 * @param {Set[]} rows - Row sets
 * @param {Set[]} cols - Column sets
 * @param {Set[]} boxes - Box sets
 * @return {boolean} - True if solved
 */
function solveAdvanced(board, rows, cols, boxes) {
  // Find empty cell with minimum remaining values
  let minRow = -1,
    minCol = -1,
    minCount = 10;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        let count = 0;
        for (let num = "1"; num <= "9"; num++) {
          if (
            !rows[i].has(num) &&
            !cols[j].has(num) &&
            !boxes[boxIndex].has(num)
          ) {
            count++;
          }
        }
        if (count < minCount) {
          minCount = count;
          minRow = i;
          minCol = j;
        }
      }
    }
  }

  // No empty cell found
  if (minRow === -1) return true;

  const boxIndex = Math.floor(minRow / 3) * 3 + Math.floor(minCol / 3);

  for (let num = "1"; num <= "9"; num++) {
    if (
      !rows[minRow].has(num) &&
      !cols[minCol].has(num) &&
      !boxes[boxIndex].has(num)
    ) {
      board[minRow][minCol] = num;
      rows[minRow].add(num);
      cols[minCol].add(num);
      boxes[boxIndex].add(num);

      if (solveAdvanced(board, rows, cols, boxes)) {
        return true;
      }

      // Backtrack
      board[minRow][minCol] = ".";
      rows[minRow].delete(num);
      cols[minCol].delete(num);
      boxes[boxIndex].delete(num);
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(9^m) - nhưng thực tế nhanh hơn
- **Space Complexity:** O(81)

### Ưu điểm / Pros

- Tối ưu nhất
- Giảm số lần thử sai

### Nhược điểm / Cons

- Phức tạp nhất
- Tốn bộ nhớ

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution   | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| ---------------------- | ------ | ----- | ------------------- | -------------------------- |
| Basic Backtracking     | O(9^m) | O(m)  | Trung bình / Medium | Dễ hiểu, prototype         |
| Constraint Propagation | O(9^m) | O(81) | Khó / Hard          | Cần tối ưu                 |
| MRV Heuristic          | O(9^m) | O(81) | Khó / Hard          | Cần tối ưu nhất            |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", "6"],
  [".", "6", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", "5"],
  [".", ".", ".", ".", "8", ".", "7", "9"],
];
solveSudoku_optimized(board);
// Board should be solved
```

### Test Case 2: Đã giải hoàn chỉnh / Already solved

```javascript
const board = [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "1", "7", "9", "6"],
];
solveSudoku_optimized(board);
// Board should remain unchanged
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Backtracking](../algorithms/algorithms/backtracking.md)
  - [Array](../algorithms/data-structures/array.md)

- **Patterns liên quan:**
  - None
