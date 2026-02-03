# Generate Parentheses / Tạo dấu ngoặc

> LeetCode Problem 22 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 22
- **URL:** https://leetcode.com/problems/generate-parentheses/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Backtracking
- **Tags:** String, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Backtracking
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example 1:**

```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
```

**Example 2:**

```
Input: n = 1
Output: ["()"]
```

**Constraints:**

- `1 <= n <= 8`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên n (số lượng cặp ngoặc)
- **Output:** Mảng tất cả các chuỗi ngoặc hợp lệ có n cặp
- **Ràng buộc / Constraints:**
  - n từ 1 đến 8
  - Chuỗi kết quả phải có đúng số lượng cặp ngoặc
- **Edge cases:**
  - n = 1 (chỉ có "()")
  - n = 2 (có "(())", "()()")
  - n = 0 (theo constraint thì không, nhưng nên kiểm tra)

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - tạo tất cả các chuỗi ngoặc hợp lệ
- Bước 2: Nhận thấy đây là bài toán generate tất cả các kết quả có thể
- Bước 3: Có thể dùng Backtracking để thử tất cả các khả năng

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
Explanation: Tất cả 5 chuỗi có 3 cặp ngoặc

Example 2:
Input: n = 1
Output: ["()"]
Explanation: Chỉ có 1 chuỗi với 1 cặp ngoặc
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Backtracking để thử tất cả các khả năng đặt ngoặc. Mỗi bước, thêm '(' hoặc ')' và kiểm tra xem chuỗi hiện tại có hợp lệ không.

### Thuật toán / Algorithm

1. Tạo mảng result để lưu kết quả
2. Tạo mảng current để lưu chuỗi đang xây dựng
3. Gọi hàm đệ quy với các tham số:
   - n: số lượng cặp ngoặc còn lại
   - open: số lượng ngoặc mở đã dùng
   - close: số lượng ngoặc đóng đã dùng
4. Trong hàm đệ quy:
   - Base case: khi open = close = n, thêm chuỗi hiện tại vào result
   - Nếu open < n: thêm '(' và gọi đệ quy với open + 1
   - Nếu close < n: thêm ')' và gọi đệ quy với close + 1
5. Trả về result

### Code / Implementation

```javascript
/**
 * Generate Parentheses - Brute Force Solution
 * @param {number} n - Số lượng cặp ngoặc
 * @return {string[]} - Mảng tất cả các chuỗi ngoặc hợp lệ
 */
function generateParenthesis_bruteForce(n) {
  const result = [];

  function backtrack(current, open, close) {
    // Base case: đã dùng đủ n cặp ngoặc
    if (open === close && open === n) {
      result.push(current);
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
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(4^n / sqrt(n)) - số lượng chuỗi Catalan
- **Space Complexity:** O(n) - độ sâu của đệ quy

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tạo được tất cả các kết quả
- Tận dụng được tính chất của Backtracking

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- Tốn nhiều bộ nhớ cho đệ quy

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tối ưu việc cắt nhánh
- Điểm yếu của giải pháp 1? Duyệt qua tất cả các nhánh
- Cách tiếp cận mới? Dùng pruning để cắt các nhánh không cần thiết

### Ý tưởng / Idea

Tương tự giải pháp 1 nhưng thêm pruning: khi số lượng ngoặc đóng còn lại bằng số lượng ngoặc mở đã dùng, không thể thêm ngoặc mở mới.

### Thuật toán / Algorithm

1. Tạo mảng result để lưu kết quả
2. Tạo mảng current để lưu chuỗi đang xây dựng
3. Gọi hàm đệ quy với các tham số:
   - n: số lượng cặp ngoặc còn lại
   - open: số lượng ngoặc mở đã dùng
   - close: số lượng ngoặc đóng đã dùng
4. Trong hàm đệ quy:
   - Base case: khi open = close = n, thêm chuỗi hiện tại vào result
   - Pruning: nếu close = open, không thể thêm '(' (đã đủ ngoặc mở cho các ngoặc đóng)
   - Nếu open < n: thêm '(' và gọi đệ quy với open + 1
   - Nếu close < open: thêm ')' và gọi đệ quy với close + 1
5. Trả về result

### Code / Implementation

```javascript
/**
 * Generate Parentheses - Optimized Solution with Pruning
 * @param {number} n - Số lượng cặp ngoặc
 * @return {string[]} - Mảng tất cả các chuỗi ngoặc hợp lệ
 */
function generateParenthesis_optimized(n) {
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
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(4^n / sqrt(n)) - với pruning tốt hơn
- **Space Complexity:** O(n) - độ sâu của đệ quy

### Ưu điểm / Pros

- Cắt được nhiều nhánh không cần thiết
- Hiệu năng tốt hơn brute force
- Code vẫn dễ hiểu

### Nhược điểm / Cons

- Độ phức tạp thời gian vẫn cao
- Tốn nhiều bộ nhớ cho đệ quy

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Dynamic Programming
- Có thuật toán/pattern nào phù hợp hơn? DP pattern

### Ý tưởng / Idea

Sử dụng Dynamic Programming để tính số lượng chuỗi Catalan. Số chuỗi Catalan C(n) cho n cặp ngoặc là (2n)!/((n+1)!n!. Sau đó generate từng chuỗi bằng cách dùng DP.

### Thuật toán / Algorithm

1. Tính số Catalan C(n) = (2n)!/((n+1)!n!
2. Sử dụng DP để generate từng chuỗi:
   - dp[i][j] = chuỗi kết quả khi có i ngoặc mở và j ngoặc đóng
   - dp[i][j] = dp[i-1][j+1] + dp[i][j-1] + dp[i+1][j]
3. Trả về dp[n][n]

### Code / Implementation

```javascript
/**
 * Generate Parentheses - Advanced Solution using DP
 * @param {number} n - Số lượng cặp ngoặc
 * @return {string[]} - Mảng tất cả các chuỗi ngoặc hợp lệ
 */
function generateParenthesis_advanced(n) {
  // Tạo bảng DP
  const dp = Array.from({ length: n + 1 }, () => []);
  dp[0][0] = [""];

  // Tính từng chuỗi
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = [""];
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1].map((s) => s + ")");
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j].map((s) => "(" + s);
      } else {
        dp[i][j] = [];
        for (const s1 of dp[i - 1][j]) {
          dp[i][j].push("(" + s1);
        }
        for (const s2 of dp[i][j - 1]) {
          dp[i][j].push(s2 + ")");
        }
      }
    }
  }

  return dp[n][n];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(4^n / n^(3/2)) - tốt hơn brute force
- **Space Complexity:** O(4^n / n^(3/2)) - để lưu bảng DP

### Ưu điểm / Pros

- Tối ưu hơn brute force
- Không cần đệ quy, tránh stack overflow
- Có thể generate từng chuỗi thay vì lưu tất cả

### Nhược điểm / Cons

- Tốn rất nhiều bộ nhớ
- Code phức tạp hơn
- Khó hiểu hơn so với Backtracking

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time           | Space          | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | -------------- | -------------- | ------------------- | -------------------------- |
| Brute Force          | O(4^n/√n)      | O(n)           | Dễ / Easy           | n nhỏ (< 5)                |
| Optimized            | O(4^n/√n)      | O(n)           | Trung bình / Medium | n trung bình (5-7)         |
| Advanced             | O(4^n/n^(3/2)) | O(4^n/n^(3/2)) | Khó / Hard          | n lớn, cần tối ưu          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(generateParenthesis_bruteForce(3)); // Expected: ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
console.log(generateParenthesis_optimized(3)); // Expected: ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
console.log(generateParenthesis_advanced(3)); // Expected: ["((()))","(()())","(())()","()(())","()()()","()(()","()()","((()))"]
```

### Test Case 2: n = 1

```javascript
console.log(generateParenthesis_bruteForce(1)); // Expected: ["()"]
console.log(generateParenthesis_optimized(1)); // Expected: ["()"]
console.log(generateParenthesis_advanced(1)); // Expected: ["()"]
```

### Test Case 3: n = 2

```javascript
console.log(generateParenthesis_bruteForce(2)); // Expected: ["(())","()()"]
console.log(generateParenthesis_optimized(2)); // Expected: ["(())","()()"]
console.log(generateParenthesis_advanced(2)); // Expected: ["(())","()()"]
```

### Test Case 4: n = 4

```javascript
const result4 = generateParenthesis_optimized(4);
console.log(result4.length); // Expected: 14 (Catalan number C4 = 14)
console.log(result4.includes("(((())))")); // Expected: true
console.log(result4.includes("()()()()"))); // Expected: true
```

### Test Case 5: n = 8 (max theo constraint)

```javascript
const result8 = generateParenthesis_optimized(8);
console.log(result8.length); // Expected: 1430 (Catalan number C8 = 1430)
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Backtracking](../algorithms/algorithms/backtracking.md)

- **Patterns liên quan:**
  - None

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
- [LeetCode Discuss](https://leetcode.com/problems/generate-parentheses/discuss/)
- [Catalan Numbers - Wikipedia](https://en.wikipedia.org/wiki/Catalan_number)

---

## 💬 Lời khuyên / Tips

- Số lượng kết quả là số Catalan: C(n) = (2n)!/((n+1)!n!
- Dùng pruning để tối ưu: nếu close = open, không thể thêm '('
- Kiểm tra edge cases: n = 0, n = 1, n lớn
- Với DP, có thể generate từng chuỗi thay vì lưu tất cả
- Vẽ cây đệ quy để visualize quá trình generate

---

_Last updated: 2026-02-03_
