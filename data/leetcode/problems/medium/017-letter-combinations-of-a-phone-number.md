# Letter Combinations of a Phone Number / Các Kết Hợp Chữ Cái của Số Điện Thoại

> LeetCode Problem 17 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 17
- **URL:** https://leetcode.com/problems/letter-combinations-of-a-phone-number/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Hash Table, Backtracking
- **Tags:** string, hash-table, backtracking
- **Thuật toán liên quan / Related Algorithms:** String, Recursion
- **Patterns liên quan / Related Patterns:** Backtracking

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

```
2: abc
3: def
4: ghi
5: jkl
6: mno
7: pqrs
8: tuv
9: wxyz
```

**Example 1:**

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Explanation:
The digit '2' maps to 'a', 'b', or 'c'.
The digit '3' maps to 'd', 'e', or 'f'.
All possible combinations are: "ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf".
```

**Example 2:**

```
Input: digits = ""
Output: []
```

**Example 3:**

```
Input: digits = "2"
Output: ["a","b","c"]
```

**Constraints:**

- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '3', '4', '5', '6', '7', '8', '9']`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi digits chứa các số từ 2 đến 9.
- **Output:** Tất cả các kết hợp chữ cái có thể từ số điện thoại.
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 0 đến 4
  - Chỉ chứa số từ 2 đến 9
  - Số 1 không map đến chữ cái nào
- **Edge cases:**
  - Chuỗi rỗng: trả về []
  - Chuỗi có 1 số: trả về các chữ cái tương ứng
  - Chuỗi có nhiều số: trả về tất cả các kết hợp

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu mapping số - chữ cái
  - 2: abc
  - 3: def
  - 4: ghi
  - 5: jkl
  - 6: mno
  - 7: pqrs
  - 8: tuv
  - 9: wxyz

- **Bước 2:** Tư duy Backtracking
  - Với mỗi chữ số trong digits, thử tất cả các chữ cái có thể
  - Khi chọn một chữ cái, đệ quy để chọn chữ cái cho chữ số tiếp theo
  - Khi hết chữ số, thêm kết hợp vào result
  - Quay lại (backtrack) để thử chữ cái khác

- **Bước 3:** Tư duy Iterative
  - Bắt đầu với result = [""]
  - Với mỗi chữ số trong digits:
    - Tạo newResult = []
    - Với mỗi combination trong result:
      - Với mỗi chữ cái tương ứng chữ số:
        - Thêm combination + chữ cái vào newResult
    - result = newResult
  - Trả về result

### 3. Ví dụ minh họa / Examples

```
Example 1: digits = "23"
Step by step (Backtracking):
- Chọn 'a' (từ '2'): đệ quy với "3"
  - Chọn 'd' (từ '3'): hết chữ số → thêm "ad"
  - Chọn 'e' (từ '3'): hết chữ số → thêm "ae"
  - Chọn 'f' (từ '3'): hết chữ số → thêm "af"
- Chọn 'b' (từ '2'): đệ quy với "3"
  - Chọn 'd' (từ '3'): hết chữ số → thêm "bd"
  - Chọn 'e' (từ '3'): hết chữ số → thêm "be"
  - Chọn 'f' (từ '3'): hết chữ số → thêm "bf"
- Chọn 'c' (từ '2'): đệ quy với "3"
  - Chọn 'd' (từ '3'): hết chữ số → thêm "cd"
  - Chọn 'e' (từ '3'): hết chữ số → thêm "ce"
  - Chọn 'f' (từ '3'): hết chữ số → thêm "cf"
Kết quả: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2: digits = ""
Kết quả: []

Example 3: digits = "2"
Kết quả: ["a","b","c"]
```

---

## 💡 Giải pháp 1: Backtracking (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng thuật toán Backtracking: thử tất cả các chữ cái có thể cho mỗi chữ số.

### Thuật toán / Algorithm

1. Tạo mapping từ chữ số đến chữ cái
2. Khởi tạo result = []
3. Gọi hàm backtrack(index, current):
   a. Nếu index == digits.length:
   - Thêm current vào result
   - Trả về
     b. Lấy chữ cái tương ứng digits[index]
     c. Với mỗi chữ cái trong mapping:
   - backtrack(index + 1, current + chữ cái)
4. Trả về result

### Code / Implementation

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
function solution1_backtracking(digits) {
  // Trường hợp đặc biệt: chuỗi rỗng
  if (digits.length === 0) {
    return [];
  }

  // Mapping từ chữ số đến chữ cái
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  /**
   * Hàm đệ quy để thử tất cả các kết hợp
   * @param {number} index - Vị trí hiện tại trong digits
   * @param {string} current - Kết hợp hiện tại
   */
  function backtrack(index, current) {
    // Base case: đã hết chữ số
    if (index === digits.length) {
      result.push(current);
      return;
    }

    // Lấy chữ cái tương ứng chữ số hiện tại
    const letters = mapping[digits[index]];

    // Thử từng chữ cái
    for (const letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }

  backtrack(0, "");
  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(3^n × 4^m) - trong đó n là số chữ số 2-6 (3 chữ cái), m là số chữ số 7-9 (4 chữ cái)
- **Space Complexity:** O(n) - cho call stack đệ quy

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng
- Tư duy Backtracking rõ ràng

### Nhược điểm / Cons

- Tốn không gian cho call stack
- Có thể gây stack overflow với chuỗi dài

---

## 🚀 Giải pháp 2: Iterative (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp Backtracking dùng đệ quy, có thể gây stack overflow.
- **Điểm yếu của giải pháp 1?** Tốn không gian cho call stack.
- **Cách tiếp cận mới?** Sử dụng vòng lặp thay vì đệ quy.

### Ý tưởng / Idea

Bắt đầu với result = [""]. Với mỗi chữ số, tạo các kết hợp mới từ result hiện tại.

### Thuật toán / Algorithm

1. Tạo mapping từ chữ số đến chữ cái
2. Khởi tạo result = [""]
3. Với mỗi chữ số trong digits:
   a. Tạo newResult = []
   b. Với mỗi combination trong result:
   - Với mỗi chữ cái tương ứng chữ số: \* Thêm combination + chữ cái vào newResult
     c. result = newResult
4. Trả về result

### Code / Implementation

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
function solution2_iterative(digits) {
  // Trường hợp đặc biệt: chuỗi rỗng
  if (digits.length === 0) {
    return [];
  }

  // Mapping từ chữ số đến chữ cái
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  let result = [""];

  // Với mỗi chữ số, tạo các kết hợp mới
  for (const digit of digits) {
    const letters = mapping[digit];
    const newResult = [];

    for (const combination of result) {
      for (const letter of letters) {
        newResult.push(combination + letter);
      }
    }

    result = newResult;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(3^n × 4^m)
- **Space Complexity:** O(3^n × 4^m) - cho result

### Ưu điểm / Pros

- Không dùng đệ quy, không gây stack overflow
- Code gọn và dễ hiểu
- Tối ưu về không gian call stack

### Nhược điểm / Cons

- Tốn nhiều không gian cho result
- Tương đương về mặt thời gian với giải pháp 1

---

## ⚡ Giải pháp 3: BFS (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp, giải pháp 2 đã tối ưu. Tuy nhiên, có thể dùng BFS.
- **Có thuật toán/pattern nào phù hợp hơn?** Sử dụng BFS để duyệt qua các kết hợp.

### Ý tưởng / Idea

Dùng BFS để duyệt qua các kết hợp. Mỗi node trong queue là một kết hợp. Với mỗi bước, thêm các chữ cái có thể.

### Thuật toán / Algorithm

1. Tạo mapping từ chữ số đến chữ cái
2. Nếu digits rỗng: trả về []
3. Khởi tạo queue với [""]
4. Trong khi queue không rỗng:
   a. Lấy combination từ queue
   b. Nếu độ dài combination == digits.length:
   - Thêm vào result
     c. Ngược lại:
   - index = độ dài combination
   - Với mỗi chữ cái tương ứng digits[index]:
     - Thêm combination + chữ cái vào queue
5. Trả về result

### Code / Implementation

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
function solution3_bfs(digits) {
  // Trường hợp đặc biệt: chuỗi rỗng
  if (digits.length === 0) {
    return [];
  }

  // Mapping từ chữ số đến chữ cái
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];
  const queue = [""];

  while (queue.length > 0) {
    const combination = queue.shift();

    // Nếu đã hết chữ số
    if (combination.length === digits.length) {
      result.push(combination);
      continue;
    }

    // Lấy chữ cái tương ứng chữ số tiếp theo
    const index = combination.length;
    const letters = mapping[digits[index]];

    // Thêm các kết hợp mới vào queue
    for (const letter of letters) {
      queue.push(combination + letter);
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(3^n × 4^m)
- **Space Complexity:** O(3^n × 4^m) - cho queue và result

### Ưu điểm / Pros

- Dùng BFS - pattern quan trọng
- Không dùng đệ quy

### Nhược điểm / Cons

- Tốn nhiều không gian cho queue
- Không tối ưu hơn giải pháp 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time         | Space        | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ------------ | ------------ | ------------------- | -------------------------- |
| Backtracking         | O(3^n × 4^m) | O(n)         | Dễ / Easy           | Cần rõ ràng, dễ hiểu       |
| Iterative            | O(3^n × 4^m) | O(3^n × 4^m) | Trung bình / Medium | Không muốn đệ quy          |
| BFS                  | O(3^n × 4^m) | O(3^n × 4^m) | Khó / Hard          | Thích BFS                  |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const digits = "23";
console.log(solution1_backtracking(digits)); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(solution2_iterative(digits)); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(solution3_bfs(digits)); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Test Case 2: Chuỗi rỗng

```javascript
const digits = "";
console.log(solution1_backtracking(digits)); // Expected: []
console.log(solution2_iterative(digits)); // Expected: []
console.log(solution3_bfs(digits)); // Expected: []
```

### Test Case 3: Một chữ số

```javascript
const digits = "2";
console.log(solution1_backtracking(digits)); // Expected: ["a","b","c"]
console.log(solution2_iterative(digits)); // Expected: ["a","b","c"]
console.log(solution3_bfs(digits)); // Expected: ["a","b","c"]
```

### Test Case 4: Nhiều chữ số

```javascript
const digits = "234";
console.log(solution1_backtracking(digits)); // Expected: 27 kết hợp
console.log(solution2_iterative(digits)); // Expected: 27 kết hợp
```

### Test Case 5: Chữ số 7-9

```javascript
const digits = "79";
console.log(solution1_backtracking(digits)); // Expected: 16 kết hợp
console.log(solution2_iterative(digits)); // Expected: 16 kết hợp
```

---

## 📚 Tài liệu tham khảo / References

- [Recursion](../../algorithms/algorithms/recursion.md)
- [String](../../algorithms/data-structures/string.md)
- [LeetCode Discuss](https://leetcode.com/problems/letter-combinations-of-a-phone-number/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=0snEunUuZY)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn xử lý trường hợp đặc biệt chuỗi rỗng trước
- **Tip 2:** Mapping từ chữ số đến chữ cái là cố định, không cần thay đổi
- **Tip 3:** Backtracking là pattern quan trọng cho các bài toán về kết hợp
- **Lỗi thường gặp:** Quên xử lý trường hợp chuỗi rỗng, dẫn đến kết quả sai

---

_Last updated: 2026-02-03_
