# Zigzag Conversion / Chuyển Đổi Zigzag

> LeetCode Problem 6 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 6
- **URL:** https://leetcode.com/problems/zigzag-conversion/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String
- **Tags:** string
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** Simulation

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

**Example 1:**

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

**Example 2:**

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

**Constraints:**

- `1 <= s.length <= 1000`
- `s` consists of English letters (lower-case and upper-case), ',' and '.'.
- `1 <= numRows <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi s và số hàng numRows.
- **Output:** Chuỗi kết quả sau khi viết theo pattern zigzag và đọc theo hàng.
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 đến 1000
  - numRows: 1 đến 1000
- **Edge cases:**
  - numRows = 1: trả về nguyên chuỗi gốc
  - numRows >= độ dài chuỗi: trả về nguyên chuỗi gốc

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu pattern Zigzag
  - Viết chuỗi theo chiều dọc xuống, sau đó đi chéo lên, rồi lại xuống
  - Ví dụ với numRows = 3:
    ```
    P   A   H   N    (hàng 0)
    A P L S I I G    (hàng 1)
    Y   I   R        (hàng 2)
    ```

- **Bước 2:** Tư duy Simulation
  - Tạo một mảng để lưu ký tự của mỗi hàng
  - Duyệt qua chuỗi, quyết định ký tự thuộc hàng nào
  - Khi đi xuống: row tăng từ 0 đến numRows-1
  - Khi đi lên: row giảm từ numRows-2 đến 1
  - Sau đó đọc kết quả từ các hàng

- **Bước 3:** Tư duy bằng công thức toán học
  - Mỗi chu kỳ zigzag có cycleLen = 2 \* numRows - 2 ký tự
  - Với hàng 0 và hàng numRows-1: chỉ lấy ký tự mỗi cycleLen
  - Với các hàng giữa: lấy 2 ký tự mỗi chu kỳ

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "PAYPALISHIRING", numRows = 3
Pattern:
P   A   H   N    (hàng 0: indices 0, 4, 8, 12)
A P L S I I G    (hàng 1: indices 1, 3, 5, 7, 9, 11, 13)
Y   I   R        (hàng 2: indices 2, 6, 10)
Đọc theo hàng: "PAHNAPLSIIGYIR"

Example 2: s = "PAYPALISHIRING", numRows = 4
Pattern:
P     I    N     (hàng 0: indices 0, 6, 12)
A   L S  I G     (hàng 1: indices 1, 5, 7, 11, 13)
Y A   H R        (hàng 2: indices 2, 4, 8, 10)
P     I          (hàng 3: indices 3, 9)
Đọc theo hàng: "PINALSIGYAHRPI"
```

---

## 💡 Giải pháp 1: Simulation (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Mô phỏng quá trình đi xuống và đi lên của pattern zigzag. Dùng một mảng để lưu ký tự của mỗi hàng.

### Thuật toán / Algorithm

1. Nếu numRows = 1 hoặc numRows >= độ dài chuỗi: trả về nguyên chuỗi
2. Tạo mảng rows với numRows phần tử, mỗi phần tử là một chuỗi rỗng
3. Khởi tạo currentRow = 0, goingDown = false
4. Duyệt qua từng ký tự trong chuỗi:
   a. Thêm ký tự vào rows[currentRow]
   b. Nếu currentRow = 0 hoặc currentRow = numRows-1: đảo goingDown
   c. currentRow += goingDown ? 1 : -1
5. Nối tất cả các rows lại và trả về

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function solution1_simulation(s, numRows) {
  const n = s.length;

  // Trường hợp đặc biệt: không cần chuyển đổi
  if (numRows === 1 || numRows >= n) {
    return s;
  }

  // Tạo mảng để lưu ký tự của mỗi hàng
  const rows = Array.from({ length: numRows }, () => "");

  let currentRow = 0;
  let goingDown = false;

  // Duyệt qua từng ký tự
  for (const char of s) {
    rows[currentRow] += char;

    // Đổi hướng khi đến đầu hoặc cuối
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    // Di chuyển đến hàng tiếp theo
    currentRow += goingDown ? 1 : -1;
  }

  // Nối tất cả các hàng lại
  return rows.join("");
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua chuỗi một lần
- **Space Complexity:** O(n) - để lưu kết quả

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code gọn và dễ đọc
- Không cần tư duy toán học phức tạp

### Nhược điểm / Cons

- Cần tạo mảng rows
- Không tối ưu về không gian (nhưng vẫn chấp nhận được)

---

## 🚀 Giải pháp 2: Mathematical Formula (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp 1 đã khá tốt, nhưng có thể tối ưu hơn bằng cách hiểu pattern toán học.
- **Điểm yếu của giải pháp 1?** Cần duyệt qua từng ký tự và quyết định nó thuộc hàng nào.
- **Cách tiếp cận mới?** Tìm công thức toán học để xác định vị trí của từng ký tự trong kết quả.

### Ý tưởng / Idea

Mỗi chu kỳ zigzag có cycleLen = 2 \* numRows - 2 ký tự. Với mỗi hàng, ta có thể tính toán vị trí của các ký tự thuộc hàng đó.

### Thuật toán / Algorithm

1. Nếu numRows = 1 hoặc numRows >= độ dài chuỗi: trả về nguyên chuỗi
2. Khởi tạo result = ""
3. Tính cycleLen = 2 \* numRows - 2
4. Với mỗi row từ 0 đến numRows-1:
   a. Với i = row; i < n; i += cycleLen:
   - Thêm s[i] vào result
   - Nếu row không phải hàng đầu hoặc cuối và i + cycleLen - 2\*row < n:
     - Thêm s[i + cycleLen - 2*row] vào result
5. Trả về result

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function solution2_mathematical(s, numRows) {
  const n = s.length;

  // Trường hợp đặc biệt
  if (numRows === 1 || numRows >= n) {
    return s;
  }

  let result = "";
  const cycleLen = 2 * numRows - 2;

  // Xử lý từng hàng
  for (let row = 0; row < numRows; row++) {
    for (let i = row; i < n; i += cycleLen) {
      // Thêm ký tự theo chiều dọc
      result += s[i];

      // Thêm ký tự theo đường chéo (không phải hàng đầu hoặc cuối)
      if (row !== 0 && row !== numRows - 1) {
        const diagonalIndex = i + cycleLen - 2 * row;
        if (diagonalIndex < n) {
          result += s[diagonalIndex];
        }
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi ký tự được thêm vào result đúng một lần
- **Space Complexity:** O(n) - để lưu kết quả

### Ưu điểm / Pros

- Tối ưu về thời gian
- Không cần tạo mảng rows
- Hiểu sâu về pattern toán học

### Nhược điểm / Cons

- Tư duy toán học phức tạp hơn
- Code khó hiểu hơn giải pháp 1

---

## ⚡ Giải pháp 3: Direct Calculation (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp, giải pháp 2 đã tối ưu. Tuy nhiên, có thể rút gọn code hơn.
- **Có thuật toán/pattern nào phù hợp hơn?** Sử dụng vòng lặp lồng nhau gọn hơn.

### Ý tưởng / Idea

Giữ nguyên tư duy toán học nhưng rút gọn code để dễ đọc hơn.

### Thuật toán / Algorithm

1. Nếu numRows = 1 hoặc numRows >= độ dài chuỗi: trả về nguyên chuỗi
2. Khởi tạo result = ""
3. Tính cycleLen = 2 \* numRows - 2
4. Với mỗi row từ 0 đến numRows-1:
   a. Với i = row; i < n; i += cycleLen:
   - result += s[i]
   - j = i + cycleLen - 2\*row
   - Nếu row > 0 && row < numRows-1 && j < n: result += s[j]
5. Trả về result

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function solution3_directCalculation(s, numRows) {
  const n = s.length;

  if (numRows === 1 || numRows >= n) {
    return s;
  }

  let result = "";
  const cycleLen = 2 * numRows - 2;

  for (let row = 0; row < numRows; row++) {
    for (let i = row; i < n; i += cycleLen) {
      result += s[i];
      const j = i + cycleLen - 2 * row;
      if (row > 0 && row < numRows - 1 && j < n) {
        result += s[j];
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

### Ưu điểm / Pros

- Code gọn hơn giải pháp 2
- Hiệu suất tương đương

### Nhược điểm / Cons

- Không cải thiện về độ phức tạp
- Tư duy toán học vẫn phức tạp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Simulation           | O(n) | O(n)  | Dễ / Easy           | Cần nhanh, dễ hiểu         |
| Mathematical Formula | O(n) | O(n)  | Trung bình / Medium | Tối ưu, hiểu toán học      |
| Direct Calculation   | O(n) | O(n)  | Trung bình / Medium | Code gọn                   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "PAYPALISHIRING";
const numRows = 3;
console.log(solution1_simulation(s, numRows)); // Expected: "PAHNAPLSIIGYIR"
console.log(solution2_mathematical(s, numRows)); // Expected: "PAHNAPLSIIGYIR"
console.log(solution3_directCalculation(s, numRows)); // Expected: "PAHNAPLSIIGYIR"
```

### Test Case 2: 4 hàng

```javascript
const s = "PAYPALISHIRING";
const numRows = 4;
console.log(solution1_simulation(s, numRows)); // Expected: "PINALSIGYAHRPI"
console.log(solution2_mathematical(s, numRows)); // Expected: "PINALSIGYAHRPI"
console.log(solution3_directCalculation(s, numRows)); // Expected: "PINALSIGYAHRPI"
```

### Test Case 3: numRows = 1

```javascript
const s = "AB";
const numRows = 1;
console.log(solution1_simulation(s, numRows)); // Expected: "AB"
console.log(solution2_mathematical(s, numRows)); // Expected: "AB"
```

### Test Case 4: Chuỗi ngắn

```javascript
const s = "A";
const numRows = 2;
console.log(solution1_simulation(s, numRows)); // Expected: "A"
console.log(solution2_mathematical(s, numRows)); // Expected: "A"
```

---

## 📚 Tài liệu tham khảo / References

- [String](../../algorithms/data-structures/string.md)
- [Math](../../algorithms/algorithms/math.md)
- [LeetCode Discuss](https://leetcode.com/problems/zigzag-conversion/discuss/)
- [Video giải thích](https://www.youtube.com/watch?v=Q2Tw6gcVEwc)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn xử lý trường hợp đặc biệt numRows = 1 trước
- **Tip 2:** Simulation là cách tiếp cận đơn giản và dễ hiểu nhất
- **Tip 3:** Hiểu pattern zigzag: đi xuống rồi đi lên, lặp lại
- **Lỗi thường gặp:** Quên xử lý trường hợp numRows = 1, dẫn đến cycleLen = 0 và vòng lặp vô tận

---

_Last updated: 2026-02-03_
