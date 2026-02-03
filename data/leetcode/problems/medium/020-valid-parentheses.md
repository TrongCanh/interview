# Valid Parentheses / Dấu ngoặc hợp lệ

> LeetCode Problem 20 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 20
- **URL:** https://leetcode.com/problems/valid-parentheses/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Stack
- **Tags:** String, Stack
- **Thuật toán liên quan / Related Algorithms:** Stack
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**

```
Input: s = "()"
Output: true
```

**Example 2:**

```
Input: s = "()[]{}"
Output: true
```

**Example 3:**

```
Input: s = "(]"
Output: false
```

**Example 4:**

```
Input: s = "([)]"
Output: false
```

**Example 5:**

```
Input: s = "{[]}"
Output: true
```

**Constraints:**

- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi s chứa các ký tự ngoặc: '(', ')', '{', '}', '[', ']'
- **Output:** Boolean - true nếu chuỗi hợp lệ, false nếu không
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 đến 10^4
  - Chỉ chứa các ký tự ngoặc
- **Edge cases:**
  - Chuỗi rỗng (theo constraint thì không, nhưng nên kiểm tra)
  - Chuỗi chỉ có 1 ký tự
  - Chuỗi có số lượng ký tự lẻ
  - Chuỗi bắt đầu bằng dấu ngoặc đóng

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - kiểm tra xem chuỗi ngoặc có hợp lệ không
- Bước 2: Nhận thấy cần theo dõi thứ tự của các dấu ngoặc mở
- Bước 3: Stack là cấu trúc dữ liệu phù hợp nhất cho bài toán này

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: s = "()"
Output: true
Explanation: '(' mở, ')' đóng cùng loại, đúng thứ tự

Example 2:
Input: s = "()[]{}"
Output: true
Explanation: Tất cả các cặp ngoặc đều đóng đúng

Example 3:
Input: s = "(]"
Output: false
Explanation: '(' mở nhưng ']' đóng khác loại

Example 4:
Input: s = "([)]"
Output: false
Explanation: Thứ tự đóng sai, phải đóng ')' trước ']'

Example 5:
Input: s = "{[]}"
Output: true
Explanation: '{' mở, '[' mở, ']' đóng '[' đúng, '}' đóng '{' đúng
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Stack để lưu các dấu ngoặc mở. Khi gặp dấu ngoặc đóng, kiểm tra xem stack có phần tử tương ứng không.

### Thuật toán / Algorithm

1. Tạo một Map để lưu các cặp ngoặc đóng-mở
2. Tạo một Stack rỗng
3. Duyệt qua từng ký tự trong chuỗi
4. Nếu là dấu ngoặc mở, push vào stack
5. Nếu là dấu ngoặc đóng:
   - Kiểm tra stack có rỗng không (nếu rỗng, return false)
   - Pop phần tử đầu stack
   - Kiểm tra xem phần tử pop ra có khớp với dấu ngoặc đóng không
6. Sau khi duyệt xong, kiểm tra stack có rỗng không

### Code / Implementation

```javascript
/**
 * Valid Parentheses - Basic Solution using Stack
 * @param {string} s - Chuỗi chứa các ký tự ngoặc
 * @return {boolean} - True nếu chuỗi hợp lệ, false nếu không
 */
function isValid_bruteForce(s) {
  const stack = [];
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        return false;
      }
      const top = stack.pop();
      if (top !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua chuỗi 1 lần
- **Space Complexity:** O(n) - trong trường hợp xấu nhất, stack chứa n/2 phần tử

### Ưu điểm / Pros

- Dễ hiểu và implement
- Tận dụng được tính chất LIFO của Stack
- Xử lý được tất cả các trường hợp

### Nhược điểm / Cons

- Tốn bộ nhớ cho Stack
- Có thể tối ưu bằng cách dùng Set thay vì kiểm tra từng ký tự

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tối ưu việc kiểm tra ký tự
- Điểm yếu của giải pháp 1? Kiểm tra từng ký thủ công
- Cách tiếp cận mới? Dùng Set để kiểm tra nhanh hơn

### Ý tưởng / Idea

Tương tự giải pháp 1 nhưng dùng Set để lưu các dấu ngoặc mở, giúp kiểm tra nhanh hơn O(1) thay vì 3 lần so sánh.

### Thuật toán / Algorithm

1. Tạo Map để lưu các cặp ngoặc đóng-mở
2. Tạo Set để lưu các dấu ngoặc mở
3. Tạo Stack rỗng
4. Duyệt qua từng ký tự trong chuỗi
5. Nếu ký tự có trong Set (là dấu ngoặc mở), push vào stack
6. Nếu không (là dấu ngoặc đóng):
   - Kiểm tra stack có rỗng không
   - Pop và kiểm tra khớp
7. Trả về stack.length === 0

### Code / Implementation

```javascript
/**
 * Valid Parentheses - Optimized Solution using Set
 * @param {string} s - Chuỗi chứa các ký tự ngoặc
 * @return {boolean} - True nếu chuỗi hợp lệ, false nếu không
 */
function isValid_optimized(s) {
  const stack = [];
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const openBrackets = new Set(["(", "{", "["]);

  for (const char of s) {
    if (openBrackets.has(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        return false;
      }
      const top = stack.pop();
      if (top !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua chuỗi 1 lần, mỗi thao tác O(1)
- **Space Complexity:** O(n) - trong trường hợp xấu nhất

### Ưu điểm / Pros

- Kiểm tra nhanh hơn với Set
- Code sạch và dễ đọc
- Tận dụng được tối ưu của JavaScript Set

### Nhược điểm / Cons

- Vẫn tốn bộ nhớ cho Stack
- Tốn thêm bộ nhớ cho Set (nhưng không đáng kể)

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Array như Stack với index
- Có thuật toán/pattern nào phù hợp hơn? Pattern giống nhau, chỉ thay đổi implement

### Ý tưởng / Idea

Thay vì dùng Array.push() và Array.pop(), dùng index thủ công để theo dõi vị trí trong Stack. Điều này có thể nhanh hơn trong một số trường hợp.

### Thuật toán / Algorithm

1. Tạo Map để lưu các cặp ngoặc đóng-mở
2. Tạo Array để dùng như Stack
3. Dùng biến topIndex để theo dõi vị trí đỉnh Stack
4. Duyệt qua từng ký tự:
   - Nếu là dấu ngoặc mở: stack[++topIndex] = char
   - Nếu là dấu ngoặc đóng:
     - Kiểm tra topIndex < 0
     - Kiểm tra stack[topIndex--] có khớp không
5. Trả về topIndex === -1

### Code / Implementation

```javascript
/**
 * Valid Parentheses - Advanced Solution using Index
 * @param {string} s - Chuỗi chứa các ký tự ngoặc
 * @return {boolean} - True nếu chuỗi hợp lệ, false nếu không
 */
function isValid_advanced(s) {
  const stack = new Array(s.length);
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  let topIndex = -1;

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack[++topIndex] = char;
    } else {
      if (topIndex < 0 || stack[topIndex--] !== map[char]) {
        return false;
      }
    }
  }

  return topIndex === -1;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua chuỗi 1 lần
- **Space Complexity:** O(n) - pre-allocate array với kích thước n

### Ưu điểm / Pros

- Pre-allocate array, không cần resize
- Tránh overhead của push/pop
- Có thể nhanh hơn trong một số trường hợp

### Nhược điểm / Cons

- Code phức tạp hơn
- Pre-allocate có thể lãng phí bộ nhớ nếu chuỗi ngắn
- Khó đọc hơn so với dùng push/pop

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n) | O(n)  | Dễ / Easy           | Chuỗi nhỏ                  |
| Optimized            | O(n) | O(n)  | Trung bình / Medium | Tất cả trường hợp          |
| Advanced             | O(n) | O(n)  | Khó / Hard          | Cần tối ưu hiệu năng       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(isValid_bruteForce("()")); // Expected: true
console.log(isValid_optimized("()")); // Expected: true
console.log(isValid_advanced("()")); // Expected: true
```

### Test Case 2: Nhiều loại ngoặc

```javascript
console.log(isValid_bruteForce("()[]{}")); // Expected: true
console.log(isValid_optimized("()[]{}")); // Expected: true
console.log(isValid_advanced("()[]{}")); // Expected: true
```

### Test Case 3: Sai loại ngoặc

```javascript
console.log(isValid_bruteForce("(]")); // Expected: false
console.log(isValid_optimized("(]")); // Expected: false
console.log(isValid_advanced("(]")); // Expected: false
```

### Test Case 4: Sai thứ tự

```javascript
console.log(isValid_bruteForce("([)]")); // Expected: false
console.log(isValid_optimized("([)]")); // Expected: false
console.log(isValid_advanced("([)]")); // Expected: false
```

### Test Case 5: Ngoặc lồng nhau

```javascript
console.log(isValid_bruteForce("{[]}")); // Expected: true
console.log(isValid_optimized("{[]}")); // Expected: true
console.log(isValid_advanced("{[]}")); // Expected: true
```

### Test Case 6: Chuỗi dài hợp lệ

```javascript
console.log(isValid_bruteForce("((({{{[[[]]]}}})))")); // Expected: true
console.log(isValid_optimized("((({{{[[[]]]}}})))")); // Expected: true
console.log(isValid_advanced("((({{{[[[]]]}}})))")); // Expected: true
```

### Test Case 7: Chuỗi dài không hợp lệ

```javascript
console.log(isValid_bruteForce("((({{{[[[]]]}}})))(")); // Expected: false
console.log(isValid_optimized("((({{{[[[]]]}}})))(")); // Expected: false
console.log(isValid_advanced("((({{{[[[]]]}}})))(")); // Expected: false
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Stack](../algorithms/data-structures/stack.md)

- **Patterns liên quan:**
  - None

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [LeetCode Discuss](https://leetcode.com/problems/valid-parentheses/discuss/)
- [Stack Data Structure](../algorithms/data-structures/stack.md)

---

## 💬 Lời khuyên / Tips

- Luôn dùng Stack cho bài toán kiểm tra dấu ngoặc
- Dùng Map để lưu các cặp ngoặc đóng-mở cho dễ kiểm tra
- Kiểm tra edge cases: chuỗi rỗng, chuỗi lẻ, bắt đầu bằng ngoặc đóng
- Dùng Set để kiểm tra nhanh hơn thay vì so sánh từng ký tự
- Sau khi duyệt xong, phải kiểm tra stack có rỗng không

---

_Last updated: 2026-02-03_
