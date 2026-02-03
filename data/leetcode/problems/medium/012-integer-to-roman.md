# Integer to Roman / Chuyển Số Nguyên sang Số La Mã

> LeetCode Problem 12 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 12
- **URL:** https://leetcode.com/problems/integer-to-roman/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Hash Table, Math
- **Tags:** string, hash-table, math
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** Greedy

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two one's added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral.

**Example 1:**

```
Input: num = 3
Output: "III"
Explanation: 3 is represented as 3 ones.
```

**Example 2:**

```
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

**Example 3:**

```
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

**Constraints:**

- `1 <= num <= 3999`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một số nguyên num từ 1 đến 3999.
- **Output:** Chuỗi La Mã tương ứng.
- **Ràng buộc / Constraints:**
  - num từ 1 đến 3999
  - Số La Mã có các quy tắc đặc biệt cho 4, 9, 40, 90, 400, 900
- **Edge cases:**
  - num = 1: "I"
  - num = 4: "IV" (không phải "IIII")
  - num = 1994: "MCMXCIV"

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu quy tắc số La Mã
  - Số La Mã được viết từ lớn đến nhỏ
  - Có 6 trường hợp đặc biệt dùng phép trừ: IV, IX, XL, XC, CD, CM
  - Các trường hợp đặc biệt: 4, 9, 40, 90, 400, 900

- **Bước 2:** Tư duy Greedy
  - Tạo danh sách các giá trị từ lớn đến nhỏ, bao gồm cả trường hợp đặc biệt
  - Với mỗi giá trị, lấy số lần lớn nhất có thể
  - Trừ giá trị đó khỏi num
  - Tiếp tục cho đến khi num = 0

- **Bước 3:** Tư duy bằng cách chia
  - Với mỗi giá trị, tính số lần = num / giá trị
  - Thêm ký tự tương ứng số lần đó vào kết quả
  - num = num % giá trị
  - Tiếp tục với giá trị tiếp theo

### 3. Ví dụ minh họa / Examples

```
Example 1: num = 3
- 1000 > 3 → bỏ qua
- 900 > 3 → bỏ qua
- ...
- 3 >= 3 → thêm "I", num = 2
- 2 >= 3 → không
- 2 >= 1 → thêm "I", num = 1
- 1 >= 1 → thêm "I", num = 0
Kết quả: "III"

Example 2: num = 58
- 1000 > 58 → bỏ qua
- 900 > 58 → bỏ qua
- 500 > 58 → bỏ qua
- 400 > 58 → bỏ qua
- 100 > 58 → bỏ qua
- 90 > 58 → bỏ qua
- 58 >= 50 → thêm "L", num = 8
- 40 > 8 → bỏ qua
- 10 > 8 → bỏ qua
- 9 > 8 → bỏ qua
- 8 >= 5 → thêm "V", num = 3
- 4 > 3 → bỏ qua
- 3 >= 1 → thêm "I", num = 2
- 2 >= 1 → thêm "I", num = 1
- 1 >= 1 → thêm "I", num = 0
Kết quả: "LVIII"

Example 3: num = 1994
- 1994 >= 1000 → thêm "M", num = 994
- 994 >= 900 → thêm "CM", num = 94
- 94 >= 500 → không
- 94 >= 400 → không
- 94 >= 100 → không
- 94 >= 90 → thêm "XC", num = 4
- 4 >= 50 → không
- 4 >= 40 → không
- 4 >= 10 → không
- 4 >= 9 → không
- 4 >= 5 → không
- 4 >= 4 → thêm "IV", num = 0
Kết quả: "MCMXCIV"
```

---

## 💡 Giải pháp 1: Greedy (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng thuật toán Greedy: luôn chọn giá trị lớn nhất có thể từ danh sách các giá trị La Mã.

### Thuật toán / Algorithm

1. Tạo danh sách các giá trị từ lớn đến nhỏ, bao gồm cả trường hợp đặc biệt
2. Khởi tạo result = ""
3. Với mỗi (value, symbol) trong danh sách:
   a. Trong khi num >= value:
   - result += symbol
   - num -= value
4. Trả về result

### Code / Implementation

```javascript
/**
 * @param {number} num
 * @return {string}
 */
function solution1_greedy(num) {
  // Danh sách giá trị từ lớn đến nhỏ, bao gồm cả trường hợp đặc biệt
  const values = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  // Với mỗi giá trị, lấy số lần lớn nhất có thể
  for (const [value, symbol] of values) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - số lần lặp là cố định (tối đa 15 lần cho mỗi giá trị)
- **Space Complexity:** O(1) - chuỗi kết quả tối đa 15 ký tự

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng
- Không cần tư duy phức tạp

### Nhược điểm / Cons

- Cần while loop cho mỗi giá trị
- Có thể tối ưu hơn

---

## 🚀 Giải pháp 2: Optimized Greedy (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp 1 đã tốt, nhưng có thể rút gọn code hơn.
- **Điểm yếu của giải pháp 1?** Cần while loop cho mỗi giá trị.
- **Cách tiếp cận mới?** Sử dụng phép chia để tính số lần trực tiếp.

### Ý tưởng / Idea

Với mỗi giá trị, tính số lần = num / value, thêm symbol số lần đó vào kết quả, và num = num % value.

### Thuật toán / Algorithm

1. Tạo danh sách các giá trị từ lớn đến nhỏ
2. Khởi tạo result = ""
3. Với mỗi (value, symbol) trong danh sách:
   a. count = Math.floor(num / value)
   b. result += symbol.repeat(count)
   c. num = num % value
4. Trả về result

### Code / Implementation

```javascript
/**
 * @param {number} num
 * @return {string}
 */
function solution2_optimizedGreedy(num) {
  const values = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for (const [value, symbol] of values) {
    const count = Math.floor(num / value);
    result += symbol.repeat(count);
    num %= value;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - cố định 13 giá trị
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn giải pháp 1
- Sử dụng repeat() - hiệu quả
- Không cần while loop

### Nhược điểm / Cons

- Không cải thiện về độ phức tạp
- Tương đương giải pháp 1

---

## ⚡ Giải pháp 3: Hardcoded Lookup (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp, giải pháp 2 đã tối ưu. Tuy nhiên, có thể dùng lookup table.
- **Có thuật toán/pattern nào phù hợp hơn?** Sử dụng lookup table với các range.

### Ý tưởng / Idea

Tạo lookup table với các range và symbol tương ứng. Với mỗi num, tìm range phù hợp và thêm symbol.

### Thuật toán / Algorithm

1. Tạo lookup table với các range và symbol
2. Khởi tạo result = ""
3. Trong khi num > 0:
   a. Tìm (value, symbol) lớn nhất mà num >= value
   b. result += symbol
   c. num -= value
4. Trả về result

### Code / Implementation

```javascript
/**
 * @param {number} num
 * @return {string}
 */
function solution3_lookupTable(num) {
  const values = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  while (num > 0) {
    // Tìm giá trị lớn nhất có thể
    for (const [value, symbol] of values) {
      if (num >= value) {
        result += symbol;
        num -= value;
        break;
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - tối đa 15 lần lặp
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rõ ràng
- Dễ hiểu tư duy

### Nhược điểm / Cons

- Có vòng lặp lồng nhau
- Không tối ưu hơn giải pháp 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Greedy               | O(1) | O(1)  | Dễ / Easy           | Cần rõ ràng, dễ hiểu       |
| Optimized Greedy     | O(1) | O(1)  | Trung bình / Medium | Code gọn, tối ưu           |
| Lookup Table         | O(1) | O(1)  | Trung bình / Medium | Tư duy khác                |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const num = 3;
console.log(solution1_greedy(num)); // Expected: "III"
console.log(solution2_optimizedGreedy(num)); // Expected: "III"
console.log(solution3_lookupTable(num)); // Expected: "III"
```

### Test Case 2: Có nhiều giá trị

```javascript
const num = 58;
console.log(solution1_greedy(num)); // Expected: "LVIII"
console.log(solution2_optimizedGreedy(num)); // Expected: "LVIII"
console.log(solution3_lookupTable(num)); // Expected: "LVIII"
```

### Test Case 3: Có trường hợp đặc biệt

```javascript
const num = 1994;
console.log(solution1_greedy(num)); // Expected: "MCMXCIV"
console.log(solution2_optimizedGreedy(num)); // Expected: "MCMXCIV"
console.log(solution3_lookupTable(num)); // Expected: "MCMXCIV"
```

### Test Case 4: Số nhỏ nhất

```javascript
const num = 1;
console.log(solution1_greedy(num)); // Expected: "I"
console.log(solution2_optimizedGreedy(num)); // Expected: "I"
```

### Test Case 5: Số lớn nhất

```javascript
const num = 3999;
console.log(solution1_greedy(num)); // Expected: "MMMCMXCIX"
console.log(solution2_optimizedGreedy(num)); // Expected: "MMMCMXCIX"
```

### Test Case 6: Có trường hợp trừ

```javascript
const num = 4;
console.log(solution1_greedy(num)); // Expected: "IV"
console.log(solution2_optimizedGreedy(num)); // Expected: "IV"
```

---

## 📚 Tài liệu tham khảo / References

- [String](../../algorithms/data-structures/string.md)
- [Math](../../algorithms/algorithms/math.md)
- [Greedy](../../algorithms/algorithms/greedy.md)
- [LeetCode Discuss](https://leetcode.com/problems/integer-to-roman/discuss/)
- [Video giải thích](https://www.youtube.com/watch?v=ohBNdSJyLh8)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn bao gồm cả 6 trường hợp đặc biệt trong danh sách giá trị
- **Tip 2:** Sắp xếp giá trị từ lớn đến nhỏ
- **Tip 3:** Sử dụng repeat() để lặp ký tự thay vì while loop
- **Lỗi thường gặp:** Quên trường hợp đặc biệt (4, 9, 40, 90, 400, 900)

---

_Last updated: 2026-02-03_
