# Valid Parentheses

> LeetCode Problem 20 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 20
- **URL:** https://leetcode.com/problems/valid-parentheses/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Stack
- **Tags:** String, Stack
- **Thuật toán liên quan / Related Algorithms:** Stack
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
>
> An input string is valid if:
>
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
> 3. Every close bracket has a corresponding open bracket of the same type.

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

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `s` chỉ chứa các ký tự: '(', ')', '{', '}', '[', ']'
- **Output:** `true` nếu chuỗi hợp lệ, `false` nếu không
- **Ràng buộc / Constraints:**
  - `1 <= s.length <= 10^4`
  - `s` chỉ chứa các ký tự ngoặc
- **Edge cases:**
  - Chuỗi rỗng
  - Chuỗi chỉ có ngoặc mở
  - Chuỗi chỉ có ngoặc đóng
  - Chuỗi có độ dài lẻ (không thể hợp lệ)

### 2. Tư duy / Thinking Process

- **Bước 1:** Dùng Stack để lưu trữ các ngoặc mở
- **Bước 2:** Duyệt qua chuỗi:
  - Nếu là ngoặc mở, đẩy vào Stack
  - Nếu là ngoặc đóng, kiểm tra xem phần tử đầu Stack có phải là ngoặc mở tương ứng không
- **Bước 3:** Sau khi duyệt xong, Stack phải rỗng

### 3. Ví dụ minh họa / Examples

```
Example 5: s = "{[]}"
Duyệt:
1. '{' là ngoặc mở → Stack: ['{']
2. '[' là ngoặc mở → Stack: ['{', '[']
3. ']' là ngoặc đóng, '[' ở đầu Stack → Stack: ['{']
4. '}' là ngoặc đóng, '{' ở đầu Stack → Stack: []
5. Stack rỗng → true

Example 4: s = "([)]"
Duyệt:
1. '(' là ngoặc mở → Stack: ['(']
2. '[' là ngoặc mở → Stack: ['(', '[']
3. ')' là ngoặc đóng, '[' ở đầu Stack → không khớp → false
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Stack để kiểm tra tính hợp lệ của chuỗi ngoặc.

### Thuật toán / Algorithm

1. Nếu độ dài chuỗi lẻ, trả về false ngay
2. Tạo Stack rỗng
3. Tạo Map từ ngoặc đóng sang ngoặc mở tương ứng
4. Duyệt qua chuỗi:
   - Nếu là ngoặc mở, đẩy vào Stack
   - Nếu là ngoặc đóng:
     - Nếu Stack rỗng, trả về false
     - Nếu phần tử đầu Stack không phải ngoặc mở tương ứng, trả về false
     - Ngược lại, pop khỏi Stack
5. Trả về true nếu Stack rỗng, false nếu không

### Code / Implementation

```javascript
/**
 * Valid Parentheses - Stack Solution
 * @param {string} s
 * @return {boolean}
 */
function isValid_stack(s) {
  // Chuỗi lẻ không thể hợp lệ
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const matchingBrackets = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  const openBrackets = new Set(["(", "{", "["]);

  for (const char of s) {
    if (openBrackets.has(char)) {
      stack.push(char);
    } else {
      // Là ngoặc đóng
      if (stack.length === 0) return false;

      const top = stack.pop();
      if (top !== matchingBrackets[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi 1 lần
- **Space Complexity:** O(n) - Stack có thể chứa tối đa n/2 phần tử

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Hiệu quả về thời gian

### Nhược điểm / Cons

- Tốn thêm không gian cho Stack

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã khá tốt
- Điểm yếu của giải pháp 1? Không có điểm yếu rõ rệt
- Cách tiếp cận mới? Dùng Array thay vì Stack (Array trong JS có push/pop O(1))

### Ý tưởng / Idea

Tương tự giải pháp cơ bản nhưng tối ưu code bằng cách dùng Array trực tiếp thay vì Stack class.

### Code / Implementation

```javascript
/**
 * Valid Parentheses - Optimized Array Solution
 * @param {string} s
 * @return {boolean}
 */
function isValid_optimized(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (const char of s) {
    if (map[char]) {
      // Là ngoặc mở, đẩy vào stack
      stack.push(char);
    } else {
      // Là ngoặc đóng
      if (stack.length === 0 || map[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

### Ưu điểm / Pros

- Code gọn hơn
- Tối ưu hơn về hiệu năng

### Nhược điểm / Cons

- Logic hơi khác (map từ ngoặc mở sang đóng thay vì ngược lại)

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
 * Valid Parentheses - Switch-Case Solution
 * @param {string} s
 * @return {boolean}
 */
function isValid_switch(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];

  for (const char of s) {
    switch (char) {
      case "(":
      case "{":
      case "[":
        stack.push(char);
        break;
      case ")":
        if (stack.length === 0 || stack.pop() !== "(") return false;
        break;
      case "}":
        if (stack.length === 0 || stack.pop() !== "{") return false;
        break;
      case "]":
        if (stack.length === 0 || stack.pop() !== "[") return false;
        break;
    }
  }

  return stack.length === 0;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

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
| Stack (Map)          | O(n) | O(n)  | Dễ / Easy           | Code rõ ràng, dễ đọc       |
| Array (Optimized)    | O(n) | O(n)  | Dễ / Easy           | Cần hiệu năng tốt hơn      |
| Switch-Case          | O(n) | O(n)  | Trung bình / Medium | Cần tối ưu hiệu năng       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(isValid_stack("()")); // true
console.log(isValid_optimized("()")); // true
console.log(isValid_switch("()")); // true
```

### Test Case 2: Nhiều cặp ngoặc / Multiple bracket pairs

```javascript
console.log(isValid_stack("()[]{}")); // true
console.log(isValid_optimized("()[]{}")); // true
console.log(isValid_switch("()[]{}")); // true
```

### Test Case 3: Ngoặc không khớp / Mismatched brackets

```javascript
console.log(isValid_stack("(]")); // false
console.log(isValid_optimized("(]")); // false
console.log(isValid_switch("(]")); // false
```

### Test Case 4: Ngoặc lồng nhau sai / Wrong nesting

```javascript
console.log(isValid_stack("([)]")); // false
console.log(isValid_optimized("([)]")); // false
console.log(isValid_switch("([)]")); // false
```

### Test Case 5: Ngoặc lồng nhau đúng / Correct nesting

```javascript
console.log(isValid_stack("{[]}")); // true
console.log(isValid_optimized("{[]}")); // true
console.log(isValid_switch("{[]}")); // true
```

### Test Case 6: Chuỗi lẻ / Odd length

```javascript
console.log(isValid_stack("(()")); // false
console.log(isValid_optimized("(()")); // false
console.log(isValid_switch("(()")); // false
```

### Test Case 7: Chỉ ngoặc mở / Only opening brackets

```javascript
console.log(isValid_stack("((((")); // false
console.log(isValid_optimized("((((")); // false
console.log(isValid_switch("((((")); // false
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Stack:** [`../algorithms/data-structures/stack.md`](../algorithms/data-structures/stack.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [Stack Data Structure - Wikipedia](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)

---

_Last updated: 2026-02-03_
