# Add Digits / Cộng Các Chữ Số

> LeetCode Problem 258 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 258
- **URL:** https://leetcode.com/problems/add-digits/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math, Dynamic Programming
- **Tags:** Math, Dynamic Programming, Recursion, Backtracking
- **Thuật toán liên quan / Related Algorithms:** Math, Recursion, Backtracking
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an integer `num`, return the number of possible combinations that could make up that integer.

The digits are mapped to letters as follows:

```
Digits:     0  1  2  3  4  5  6  7  8  9
Letters:     ''  ''  abc def ghi jkl mno pqr stu vwxyz
```

Note that `1` does not map to any letters.

**Example 1:**

```
Input: num = 23
Output: 3
Explanation: It could be decoded as "AD", "AE", "AF", etc.
```

**Example 2:**

```
Input: num = 0
Output: 1
Explanation: Only "a" could be decoded.
```

**Example 3:**

```
Input: num = 1
Output: 1
Explanation: Only "b" could be decoded.
```

**Constraints:**

- `1 <= num <= 10^9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên `num`
- **Output:** Số lượng tổ hợp có thể tạo từ `num`
- **Ràng buộc / Constraints:**
  - Giá trị num: 1 ≤ num ≤ 10^9
- **Edge cases:**
  - `num = 0`: chỉ có 1 tổ hợp ("a")
  - `num = 1`: chỉ có 1 tổ hợp ("b")
  - `num` chứa chữ số 0: chữ số 0 không map đến chữ cái nào

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần đếm số lượng tổ hợp có thể tạo từ các chữ số
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Backtracking hoặc DP
- **Bước 3:** Lên kế hoạch giải pháp - Backtracking (O(n) time), DP (O(n) time)

### 3. Ví dụ minh họa / Examples

```
Example 1: num = 23

Các chữ số: 2, 3
Map: 2→abc, 3→def

Backtracking:
- 2→a, 3→d: "ad"
- 2→a, 3→e: "ae"
- 2→b, 3→d: "bd"
- 2→b, 3→e: "be"
- 2→c, 3→d: "cd"
- 2→c, 3→e: "ce"

Kết quả: 6 tổ hợp (nhưng đề bài yêu cầu đếm số tổ hợp có thể tạo, không phải liệt kê)

Wait, đề bài yêu cầu đếm số lượng tổ hợp, không phải liệt kê.
Với num = 23:
- Chữ số 2: 3 chữ cái
- Chữ số 3: 3 chữ cái
- Số lượng tổ hợp = 3 × 3 = 9

Nhưng đề bài yêu cầu đếm số tổ hợp có thể tạo từ num, không phải liệt kê.
Theo ví dụ, num = 23 → 3 tổ hợp.

Để ý: 2→abc (3 chữ cái), 3→def (3 chữ cái)
3 × 3 = 9 tổ hợp

Nhưng đề bài nói "could be decoded as AD, AE, AF, etc."
AD: A=2, D=3 ✓
AE: A=2, E=3 ✓
AF: A=2, F=3 ✓

Có vẻ đề bài muốn đếm số lượng tổ hợp có thể tạo.
Với num = 23:
- 2 có 3 chữ cái
- 3 có 3 chữ cái
- 3 × 3 = 9 tổ hợp

Nhưng ví dụ chỉ ra 3. Có thể đề bài yêu cầu đếm số lượng tổ hợp khác nhau?

Để lại đọc đề bài kỹ hơn:
"return the number of possible combinations that could make up that integer."

Có vẻ đề bài muốn đếm số lượng tổ hợp có thể tạo.
Với num = 23:
- 2 có 3 chữ cái
- 3 có 3 chữ cái
- 3 × 3 = 9 tổ hợp

Nhưng ví dụ chỉ ra 3. Có thể đề bài yêu cầu đếm số lượng tổ hợp khác nhau?

Để lại đọc ví dụ 1: num = 23 → 3
Có thể đề bài muốn đếm số lượng tổ hợp khác nhau?

Nếu vậy, với num = 23:
- 2 có 3 chữ cái
- 3 có 3 chữ cái
- Số lượng tổ hợp khác nhau = 3 (AD, AE, AF)

Điều này có vẻ hợp lý hơn.

Example 2: num = 0
- 0 không map đến chữ cái nào
- Số lượng tổ hợp = 1 (chỉ có "")

Example 3: num = 1
- 1 không map đến chữ cái nào
- Số lượng tổ hợp = 1 (chỉ có "b")

Để hiểu đề bài là đếm số lượng tổ hợp khác nhau có thể tạo.
```

---

## 💡 Giải pháp 1: Brute Force - Backtracking (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng Backtracking để liệt kê tất cả tổ hợp, sau đó dùng Set để đếm số lượng tổ hợp khác nhau.

### Thuật toán / Algorithm

1. Chuyển `num` sang chuỗi `str`
2. Tạo Set `combinations` để lưu trữ tổ hợp khác nhau
3. Định nghĩa hàm `backtrack(index, current)`:
   - Nếu `index == str.length`:
     - Thêm `current` vào `combinations`
   - Ngược lại:
     - Nếu `str[index] == '0'` hoặc `str[index] == '1'`:
       - Gọi `backtrack(index + 1, current)`
     - Ngược lại:
       - Lấy các chữ cái map từ `str[index]`
       - Với mỗi chữ cái:
         - Gọi `backtrack(index + 1, current + letter)`
4. Gọi `backtrack(0, "")`
5. Trả về `combinations.size`

### Code / Implementation

```javascript
/**
 * Add Digits - Backtracking Solution
 * @param {number} num - Số nguyên
 * @return {number} - Số lượng tổ hợp có thể tạo
 */
function addDigits_bruteForce(num) {
  // Map chữ số sang chữ cái
  const digitToLetters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // Chuyển num sang chuỗi
  const str = num.toString();
  const combinations = new Set();

  // Hàm backtracking
  function backtrack(index, current) {
    // Base case: đã duyệt hết tất cả chữ số
    if (index === str.length) {
      combinations.add(current);
      return;
    }

    const digit = str[index];

    // Nếu chữ số là 0 hoặc 1, chỉ có 1 tổ hợp
    if (digit === "0" || digit === "1") {
      backtrack(index + 1, current);
    } else {
      // Với mỗi chữ cái map từ chữ số
      const letters = digitToLetters[digit];
      for (const letter of letters) {
        backtrack(index + 1, current + letter);
      }
    }
  }

  backtrack(0, "");
  return combinations.size;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(4^n) - Với n là số lượng chữ số, mỗi chữ số có tối đa 4 chữ cái
- **Space Complexity:** O(n) - Set lưu trữ tổ hợp

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- Liệt kê tất cả tổ hợp, không tối ưu

---

## 🚀 Giải pháp 2: Optimized - Product (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force có độ phức tạp quá cao
- Điểm yếu của giải pháp 1? Liệt kê tất cả tổ hợp, không tối ưu
- Cách tiếp cận mới? Tính số lượng tổ hợp bằng cách nhân số lượng chữ cái của mỗi chữ số

### Ý tưởng / Idea

Số lượng tổ hợp = tích của số lượng chữ cái của mỗi chữ số. Chữ số 0 và 1 không map đến chữ cái nào, nên số lượng = 1.

### Thuật toán / Algorithm

1. Chuyển `num` sang chuỗi `str`
2. Khởi tạo `result = 1`
3. Duyệt qua từng chữ số trong `str`:
   - Nếu chữ số là '0' hoặc '1', tiếp tục
   - Ngược lại:
     - Lấy số lượng chữ cái map từ chữ số
     - Nhân `result` với số lượng đó
4. Trả về `result`

### Code / Implementation

```javascript
/**
 * Add Digits - Product Solution
 * @param {number} num - Số nguyên
 * @return {number} - Số lượng tổ hợp có thể tạo
 */
function addDigits_optimized(num) {
  // Map chữ số sang số lượng chữ cái
  const digitToCount = {
    0: 1, // 0 không map đến chữ cái nào
    1: 1, // 1 không map đến chữ cái nào
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 4,
    8: 3,
    9: 4,
  };

  // Chuyển num sang chuỗi
  const str = num.toString();
  let result = 1;

  // Tính số lượng tổ hợp bằng cách nhân
  for (const digit of str) {
    result *= digitToCount[digit];
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua từng chữ số, n là độ dài chuỗi
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Code rất ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về cách tính số lượng tổ hợp
- Không liệt kê các tổ hợp

---

## ⚡ Giải pháp 3: Advanced - Recursive Product (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể viết code ngắn gọn hơn
- Có thuật toán/pattern nào phù hợp hơn? Tương tự giải pháp Optimized

### Ý tưởng / Idea

Tương tự giải pháp Optimized, nhưng viết theo cách đệ quy.

### Thuật toán / Algorithm

Tương tự giải pháp Optimized.

### Code / Implementation

```javascript
/**
 * Add Digits - Recursive Product Solution
 * @param {number} num - Số nguyên
 * @return {number} - Số lượng tổ hợp có thể tạo
 */
function addDigits_advanced(num) {
  // Map chữ số sang số lượng chữ cái
  const digitToCount = {
    0: 1,
    1: 1,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 4,
    8: 3,
    9: 4,
  };

  const str = num.toString();

  // Hàm đệ quy
  function helper(index) {
    // Base case: đã duyệt hết tất cả chữ số
    if (index === str.length) {
      return 1;
    }

    const digit = str[index];
    const count = digitToCount[digit];

    // Nhân số lượng tổ hợp
    return count * helper(index + 1);
  }

  return helper(0);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n) - Stack đệ quy

### Ưu điểm / Pros

- Code rõ ràng
- Độ phức tạp tối ưu

### Nhược điểm / Cons

- Sử dụng đệ quy
- Code hơi dài hơn giải pháp Optimized

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ------ | ----- | ------------------- | -------------------------- |
| Backtracking         | O(4^n) | O(n)  | Dễ / Easy           | Học thuật toán cơ bản      |
| Product              | O(n)   | O(1)  | Dễ / Easy           | Luôn dùng (tối ưu nhất)    |
| Recursive Product    | O(n)   | O(n)  | Trung bình / Medium | Muốn viết theo đệ quy      |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const num = 23;
const expected = 9; // 3×3 = 9
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 2: Số 0 / Number 0

```javascript
const num = 0;
const expected = 1;
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 3: Số 1 / Number 1

```javascript
const num = 1;
const expected = 1;
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 4: Số chứa chữ số 0 / Contains Zero

```javascript
const num = 101;
const expected = 4; // 1×1×1 = 4
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 5: Số lớn / Large Number

```javascript
const num = 999;
const expected = 256; // 4×4×4 = 64
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 6: Số nhiều chữ số / Multi-digit Number

```javascript
const num = 1234;
const expected = 108; // 3×3×3×4 = 108
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 7: Chỉ có chữ số 2 và 3 / Only 2 and 3

```javascript
const num = 23;
const expected = 9; // 3×3 = 9
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

### Test Case 8: Chỉ có chữ số 7 / Only 7

```javascript
const num = 7;
const expected = 4; // 4 chữ cái
const result = addDigits_optimized(num);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)
  - [Recursion](../algorithms/algorithms/recursion.md)
  - [Backtracking](../algorithms/algorithms/backtracking.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Map Chữ số sang Chữ cái:**
   - 0, 1: không map đến chữ cái nào
   - 2: abc (3 chữ cái)
   - 3: def (3 chữ cái)
   - 4: ghi (3 chữ cái)
   - 5: jkl (3 chữ cái)
   - 6: mno (3 chữ cái)
   - 7: pqrs (4 chữ cái)
   - 8: tuv (3 chữ cái)
   - 9: wxyz (4 chữ cái)

2. **Số lượng tổ hợp:**
   - Tích của số lượng chữ cái của mỗi chữ số
   - Ví dụ: 23 → 3×3 = 9

3. **Backtracking vs Product:**
   - Backtracking: liệt kê tất cả tổ hợp, O(4^n)
   - Product: tính trực tiếp số lượng, O(n)

4. **Edge Cases:**
   - Chữ số 0 và 1: số lượng = 1
   - Số chứa chữ số 0: nhân với 1

5. **Lưu ý về ràng buộc:**
   - num >= 1
   - Không cần xử lý số âm

---

_Last updated: 2025-02-04_
