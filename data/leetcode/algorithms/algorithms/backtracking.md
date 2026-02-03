# Backtracking / Quay lui

> Thuật toán Backtracking - Giải thích chi tiết / Backtracking Algorithm - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Backtracking** (Quay lui) là một kỹ thuật thuật toán dùng để tìm tất cả các giải pháp có thể cho một bài toán, bằng cách thử từng khả năng và quay lui (backtrack) khi gặp đường cùng.

**Backtracking** is an algorithmic technique used to find all possible solutions to a problem by trying each possibility and backtracking when hitting a dead end.

### Các khái niệm cơ bản / Basic Concepts

- **State Space (Không gian trạng thái):** Tập hợp các trạng thái có thể của bài toán
- **Decision Tree (Cây quyết định):** Cây biểu diễn quá trình tìm kiếm
- **Backtrack (Quay lui):** Quay lại trạng thái trước khi gặp đường cùng
- **Pruning (Cắt nhánh):** Loại bỏ các nhánh không cần thiết để tối ưu
- **Base Case (Trường hợp cơ sở):** Điều kiện dừng đệ quy

### Ví dụ thực tế / Real-world Examples

- **N-Queens Problem:** Đặt n quân hậu trên bàn cờ nxn sao cho không ai ăn được ai
- **Sudoku Solver:** Điền số vào bảng Sudoku
- **Generate Parentheses:** Tạo tất cả chuỗi ngoặc hợp lệ
- **Subset Problem:** Tìm tất cả các tập con của một tập hợp

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần tìm tất cả các giải pháp có thể
  - Bài toán có cấu trúc cây quyết định rõ ràng
  - Cần thử từng khả năng và quay lui
  - Bài toán generate/combinatorial

- **Không dùng khi:**
  - Chỉ cần một giải pháp
  - Bài toán có thể giải bằng greedy
  - Cần tối ưu hiệu năng (backtracking thường chậm)

---

## 🔄 Các biến thể / Variations

### 1. Standard Backtracking / Quay lui tiêu chuẩn

Thử từng khả năng, quay lui khi gặp đường cùng.

### 2. Backtracking with Pruning / Quay lui với cắt nhánh

Cắt các nhánh không cần thiết để tối ưu.

### 3. Backtracking with Memoization / Quay lui với memoization

Lưu kết quả để tránh tính lại.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Backtracking cơ bản - Basic Backtracking Template
 * @param {Array} input - Mảng đầu vào
 * @return {Array} - Mảng các giải pháp
 */
function backtrackingTemplate(input) {
  const result = [];

  function backtrack(index, current) {
    // Base case: đã xử lý hết phần tử
    if (index === input.length) {
      result.push([...current]);
      return;
    }

    // Thử từng khả năng
    for (let i = index; i < input.length; i++) {
      current.push(input[i]);
      backtrack(i + 1, current);
      current.pop(); // Quay lui
    }
  }

  backtrack(0, []);
  return result;
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Backtracking nâng cao - Advanced Backtracking Template
 * Bao gồm pruning và memoization
 * @param {Array} input - Mảng đầu vào
 * @return {Array} - Mảng các giải pháp
 */
function backtrackingAdvancedTemplate(input) {
  const result = [];
  const memo = new Set();

  function backtrack(index, current) {
    // Base case
    if (index === input.length) {
      const key = current.join(",");
      if (!memo.has(key)) {
        memo.add(key);
        result.push([...current]);
      }
      return;
    }

    // Pruning: kiểm tra điều kiện cắt nhánh
    if (!isValid(current)) {
      return;
    }

    // Thử từng khả năng
    for (let i = index; i < input.length; i++) {
      current.push(input[i]);
      backtrack(i + 1, current);
      current.pop(); // Quay lui
    }
  }

  backtrack(0, []);
  return result;
}

function isValid(arr) {
  // Hàm kiểm tra tính hợp lệ để pruning
  return true; // Tùy bài toán
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Generate Parentheses / Tạo dấu ngoặc

**Mô tả:** Tạo tất cả chuỗi ngoặc hợp lệ với n cặp.

**Code:**

```javascript
/**
 * Generate Parentheses - Backtracking Solution
 * @param {number} n - Số lượng cặp ngoặc
 * @return {string[]} - Mảng tất cả chuỗi ngoặc hợp lệ
 */
function generateParentheses(n) {
  const result = [];

  function backtrack(current, open, close) {
    // Base case: đã dùng đủ n cặp ngoặc
    if (open === close && open === n) {
      result.push(current);
      return;
    }

    // Pruning: nếu số ngoặc đóng bằng số ngoặc mở, không thể thêm ngoặc mở
    if (close === open) {
      backtrack(current + "(", open + 1, close);
      return;
    }

    // Thêm ngoặc mở nếu còn có thể thêm
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // Thêm ngoặc đóng nếu còn có thể thêm
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
}

// generateParentheses(3) = ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
// Time: O(4^n / sqrt(n)), Space: O(n)
```

### Ví dụ 2: Subsets / Tập con

**Mô tả:** Tìm tất cả các tập con của một tập hợp.

**Code:**

```javascript
/**
 * Subsets - Tìm tất cả tập con
 * @param {number[]} nums - Mảng số
 * @return {number[][]} - Mảng tất cả tập con
 */
function subsets(nums) {
  const result = [];

  function backtrack(index, current) {
    // Base case: đã xử lý hết phần tử
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    // Thử từng khả năng: bao gồm hoặc không bao gồm phần tử hiện tại
    current.push(nums[index]);
    backtrack(index + 1, current);
    current.pop(); // Quay lui

    // Không bao gồm phần tử hiện tại
    backtrack(index + 1, current);
  }

  backtrack(0, []);
  return result;
}

// subsets([1,2,3]) = [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
// Time: O(2^n), Space: O(n)
```

### Ví dụ 3: Permutations / Hoán vị

**Mô tả:** Tìm tất cả các hoán vị của một tập hợp.

**Code:**

```javascript
/**
 * Permutations - Tìm tất cả hoán vị
 * @param {number[]} nums - Mảng số
 * @return {number[][]} - Mảng tất cả hoán vị
 */
function permutations(nums) {
  const result = [];

  function backtrack(index, current) {
    // Base case: đã xử lý hết phần tử
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    // Thử từng khả năng
    for (let i = index; i < nums.length; i++) {
      // Swap để tránh trùng lặp
      [current[index], current[i]] = [current[i], current[index]];
      backtrack(index + 1, current);
      // Swap lại
      [current[index], current[i]] = [current[i], current[index]];
    }
  }

  backtrack(0, []);
  return result;
}

// permutations([1,2,3]) = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Time: O(n!), Space: O(n!)
```

### Ví dụ 4: N-Queens / N quân hậu

**Mô tả:** Đặt n quân hậu trên bàn cờ nxn sao cho không ai ăn được ai.

**Code:**

```javascript
/**
 * N-Queens - Đặt n quân hậu
 * @param {number} n - Số lượng quân hậu
 * @return {string[][]} - Mảng các giải pháp
 */
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function backtrack(row, cols, diag1, diag2) {
    // Base case: đã đặt hết n quân hậu
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }

    // Thử từng cột
    for (let col = 0; col < n; col++) {
      // Kiểm tra xem có thể đặt quân hậu không
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue; // Cắt nhánh
      }

      // Đặt quân hậu
      board[row][col] = "Q";
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      backtrack(row + 1, cols, diag1, diag2);

      // Quay lui
      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0, new Set(), new Set(), new Set());
  return result;
}

// solveNQueens(4) = [".Q...", ...] (2 giải pháp)
// Time: O(n!), Space: O(n)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/medium/022-generate-parentheses.md`](../problems/medium/022-generate-parentheses.md)
- [`../problems/medium/017-letter-combinations-of-a-phone-number.md`](../problems/medium/017-letter-combinations-of-a-phone-number.md)

- [Subsets](https://leetcode.com/problems/subsets/)
- [Subsets II](https://leetcode.com/problems/subsets-ii/)
- [Permutations](https://leetcode.com/problems/permutations/)
- [Permutations II](https://leetcode.com/problems/permutations-ii/)
- [N-Queens](https://leetcode.com/problems/n-queens/)
- [Word Search](https://leetcode.com/problems/word-search/)
- [Combination Sum](https://leetcode.com/problems/combination-sum/)

---

## 📊 Độ phức tạp / Complexity

| Loại bài toán / Problem Type | Time Complexity | Space Complexity | Ghi chú / Notes      |
| ---------------------------- | --------------- | ---------------- | -------------------- |
| Generate Parentheses         | O(4^n / √n)     | O(n)             | Catalan numbers      |
| Subsets                      | O(2^n)          | O(n)             | 2^n tập con          |
| Permutations                 | O(n!)           | O(n)             | n! hoán vị           |
| N-Queens                     | O(n!)           | O(n)             | Cắt nhánh quan trọng |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên quay lui:** Không pop sau khi đệ quy trả về
2. **Không có base case:** Không có điều kiện dừng, gây vô hạn
3. **Không pruning:** Duyệt qua tất cả nhánh, rất chậm
4. **Sai điều kiện pruning:** Cắt nhánh sai, mất giải pháp
5. **Memory leak:** Không xóa mảng tạm khi không dùng

---

## 💡 Tips & Tricks

1. **Pruning:** Luôn tìm cách cắt nhánh để tối ưu
2. **Base Case:** Xác định base case rõ ràng
3. **Copy Array:** Dùng spread operator `[...arr]` để copy mảng
4. **Set for O(1):** Dùng Set để kiểm tra tồn tại nhanh hơn
5. **Backtrack Order:** Luôn pop sau khi đệ quy trả về
6. **Memoization:** Khi tính lại cùng giá trị, dùng memoization
7. **Swap Trick:** Với hoán vị, dùng swap để tránh trùng lặp

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems Using This

- [022 Generate Parentheses](../problems/medium/022-generate-parentheses.md)
- [039 Combination Sum](../problems/medium/039-combination-sum.md)
- [040 Combination Sum II](../problems/medium/040-combination-sum-ii.md)
- [046 Permutations](../problems/medium/046-permutations.md)
- [047 Permutations II](../problems/medium/047-permutations-ii.md)

---

## 📚 Tài liệu tham khảo / References

- [Backtracking - Wikipedia](https://en.wikipedia.org/wiki/Backtracking)
- [Backtracking - GeeksforGeeks](https://www.geeksforgeeks.org/backtracking-algorithms/)
- [Catalan Numbers - Wikipedia](https://en.wikipedia.org/wiki/Catalan_number)

---

_Last updated: 2026-02-03_
