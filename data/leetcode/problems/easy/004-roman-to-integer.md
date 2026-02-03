# Roman to Integer

> LeetCode Problem 13 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 13
- **URL:** https://leetcode.com/problems/roman-to-integer/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Hash Map
- **Tags:** String, Hash Map, Math
- **Thuật toán liên quan / Related Algorithms:** Hash Table
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.
>
> ```
> Symbol       Value
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> ```
>
> For example, `2` is written as `II` in Roman numeral, just two one's added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.
>
> Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
>
> - `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
> - `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
> - `C` can be placed trước `D` (500) và `M` (1000) để tạo 400 và 900.
>
> Given a roman numeral, convert it to an integer.

**Example 1:**

```
Input: s = "III"
Output: 3
Explanation: III = 3.
```

**Example 2:**

```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V = 5, III = 3.
```

**Example 3:**

```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90, IV = 4.
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi số La Mã `s`
- **Output:** Số nguyên tương ứng
- **Ràng buộc / Constraints:**
  - `1 <= s.length <= 15`
  - `s` chỉ chứa các ký tự: 'I', 'V', 'X', 'L', 'C', 'D', 'M'
  - `s` là một số La Mã hợp lệ trong khoảng [1, 3999]
- **Edge cases:**
  - Các trường hợp trừ: IV, IX, XL, XC, CD, CM
  - Chuỗi dài
  - Chuỗi ngắn

### 2. Tư duy / Thinking Process

- **Bước 1:** Tạo bảng mapping từ ký tự La Mã sang giá trị
- **Bước 2:** Duyệt qua chuỗi từ trái sang phải
- **Bước 3:** Nếu ký tự hiện tại nhỏ hơn ký tự tiếp theo, trừ đi giá trị. Ngược lại, cộng thêm.

### 3. Ví dụ minh họa / Examples

```
Example 3: s = "MCMXCIV"
M = 1000, C = 100, M = 1000, X = 10, C = 100, I = 1, V = 5

Duyệt:
- M (1000) < C (100)? Không → result = 1000
- C (100) < M (1000)? Có → result = 1000 - 100 = 900
- M (1000) < X (10)? Không → result = 900 + 1000 = 1900
- X (10) < C (100)? Có → result = 1900 - 10 = 1890
- C (100) < I (1)? Không → result = 1890 + 100 = 1990
- I (1) < V (5)? Có → result = 1990 - 1 = 1989
- V (5) (không có ký tự tiếp theo) → result = 1989 + 5 = 1994

Output: 1994
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua chuỗi, cộng giá trị của mỗi ký tự. Nếu ký tự hiện tại nhỏ hơn ký tự tiếp theo, trừ thay vì cộng.

### Thuật toán / Algorithm

1. Tạo Map từ ký tự La Mã sang giá trị
2. Khởi tạo result = 0
3. Duyệt qua chuỗi từ trái sang phải:
   - Nếu giá trị ký tự hiện tại < giá trị ký tự tiếp theo: result -= giá trị hiện tại
   - Ngược lại: result += giá trị hiện tại
4. Trả về result

### Code / Implementation

```javascript
/**
 * Roman to Integer - Basic Solution
 * @param {string} s
 * @return {number}
 */
function romanToInt_basic(s) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const currentValue = romanMap[s[i]];
    const nextValue = romanMap[s[i + 1]];

    if (nextValue && currentValue < nextValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi 1 lần
- **Space Complexity:** O(1) - Map có kích thước cố định (7 phần tử)

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Hiệu quả về thời gian

### Nhược điểm / Cons

- Cần tạo Map

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã khá tốt
- Điểm yếu của giải pháp 1? Không có điểm yếu rõ rệt
- Cách tiếp cận mới? Dùng Object thay vì Map (có thể nhanh hơn trong JS)

### Ý tưởng / Idea

Tương tự giải pháp cơ bản nhưng dùng Object thay vì Map. Object thường nhanh hơn Map trong JavaScript cho các key là string.

### Code / Implementation

```javascript
/**
 * Roman to Integer - Object Solution
 * @param {string} s
 * @return {number}
 */
function romanToInt_object(s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = roman[s[i]];
    const next = roman[s[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Có thể nhanh hơn Map trong JavaScript
- Cú pháp đơn giản hơn

### Nhược điểm / Cons

- Object chỉ hỗ trợ key là string hoặc symbol

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể tối ưu code
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Dùng switch-case thay vì Map/Object. Trong một số trường hợp, switch-case có thể nhanh hơn vì không cần tra cứu key.

### Code / Implementation

```javascript
/**
 * Roman to Integer - Switch-Case Solution
 * @param {string} s
 * @return {number}
 */
function romanToInt_switch(s) {
  const getValue = (char) => {
    switch (char) {
      case "I":
        return 1;
      case "V":
        return 5;
      case "X":
        return 10;
      case "L":
        return 50;
      case "C":
        return 100;
      case "D":
        return 500;
      case "M":
        return 1000;
      default:
        return 0;
    }
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = getValue(s[i]);
    const next = getValue(s[i + 1]);

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Không cần Map/Object
- Có thể nhanh hơn trong một số trình duyệt

### Nhược điểm / Cons

- Code dài hơn
- Khó bảo trì hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Map                  | O(n) | O(1)  | Dễ / Easy           | Code rõ ràng, dễ đọc       |
| Object               | O(n) | O(1)  | Dễ / Easy           | Cần hiệu năng tốt hơn      |
| Switch-Case          | O(n) | O(1)  | Trung bình / Medium | Cần tối ưu hiệu năng       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(romanToInt_basic("III")); // 3
console.log(romanToInt_object("III")); // 3
console.log(romanToInt_switch("III")); // 3
```

### Test Case 2: Nhiều ký tự khác nhau / Multiple different characters

```javascript
console.log(romanToInt_basic("LVIII")); // 58
console.log(romanToInt_object("LVIII")); // 58
console.log(romanToInt_switch("LVIII")); // 58
```

### Test Case 3: Có trường hợp trừ / With subtraction cases

```javascript
console.log(romanToInt_basic("MCMXCIV")); // 1994
console.log(romanToInt_object("MCMXCIV")); // 1994
console.log(romanToInt_switch("MCMXCIV")); // 1994
```

### Test Case 4: Các trường hợp trừ riêng lẻ / Individual subtraction cases

```javascript
console.log(romanToInt_basic("IV")); // 4
console.log(romanToInt_basic("IX")); // 9
console.log(romanToInt_basic("XL")); // 40
console.log(romanToInt_basic("XC")); // 90
console.log(romanToInt_basic("CD")); // 400
console.log(romanToInt_basic("CM")); // 900
```

### Test Case 5: Số lớn nhất / Largest number

```javascript
console.log(romanToInt_basic("MMMCMXCIX")); // 3999
console.log(romanToInt_object("MMMCMXCIX")); // 3999
console.log(romanToInt_switch("MMMCMXCIX")); // 3999
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Hash Table:** [`../algorithms/data-structures/hash-table.md`](../algorithms/data-structures/hash-table.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Roman to Integer](https://leetcode.com/problems/roman-to-integer/)
- [Roman Numerals - Wikipedia](https://en.wikipedia.org/wiki/Roman_numerals)

---

_Last updated: 2026-02-03_
