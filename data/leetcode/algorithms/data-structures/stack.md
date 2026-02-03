# Stack / Ngăn xếp

> Cấu trúc dữ liệu LIFO (Last In, First Out) / LIFO (Last In, First Out) data structure

---

## 📚 Khái niệm / Concept

**Stack** là một cấu trúc dữ liệu tuân thủ nguyên tắc LIFO (Last In, First Out) - phần tử được thêm vào cuối cùng sẽ được lấy ra đầu tiên. Giống như chồng đĩa: đĩa đặt lên cùng sẽ được lấy ra trước.

**A Stack** is a data structure following LIFO (Last In, First Out) principle - the last element added is the first to be removed. Like a stack of plates: the top plate is removed first.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần xử lý theo thứ tự ngược (reverse)
  - Cần undo/redo
  - Cần kiểm tra cặp ngoặc, thẻ HTML
  - Cần duyệt cây/graph (DFS)
  - Cần tính toán biểu thức
  - Cần theo dõi lịch sử

- **Không dùng khi:**
  - Cần truy cập ngẫu nhiên
  - Cần duyệt theo thứ tự FIFO
  - Cần tìm kiếm phần tử

---

## 🔄 Các biến thể / Variations

### 1. Array-based Stack / Ngăn xếp dựa trên mảng

Sử dụng mảng với push/pop.

```javascript
const stack = [];
stack.push(1); // Thêm
stack.pop(); // Lấy ra
```

### 2. Linked List-based Stack / Ngăn xếp dựa trên danh sách liên kết

Sử dụng linked list với head là top.

```javascript
class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    const node = new StackNode(value);
    node.next = this.top;
    this.top = node;
    this.size++;
  }

  pop() {
    if (!this.top) return undefined;
    const value = this.top.value;
    this.top = this.top.next;
    this.size--;
    return value;
  }

  peek() {
    return this.top ? this.top.value : undefined;
  }
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
// Sử dụng Array làm Stack
const stack = [];

// Thêm phần tử vào đỉnh (push) - O(1)
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); // [1, 2, 3]

// Lấy phần tử từ đỉnh (pop) - O(1)
const top = stack.pop();
console.log(top); // 3
console.log(stack); // [1, 2]

// Xem phần tử đỉnh mà không lấy ra (peek) - O(1)
const peek = stack[stack.length - 1];
console.log(peek); // 2

// Kiểm tra rỗng - O(1)
const isEmpty = stack.length === 0;
console.log(isEmpty); // false

// Lấy kích thước - O(1)
const size = stack.length;
console.log(size); // 2

// Xóa tất cả - O(1)
stack.length = 0;
```

### Template nâng cao / Advanced Template

```javascript
// Class Stack đầy đủ
class Stack {
  constructor() {
    this.items = [];
  }

  // Thêm phần tử
  push(element) {
    this.items.push(element);
  }

  // Lấy phần tử
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  // Xem phần tử đỉnh
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  // Kiểm tra rỗng
  isEmpty() {
    return this.items.length === 0;
  }

  // Lấy kích thước
  size() {
    return this.items.length;
  }

  // Xóa tất cả
  clear() {
    this.items = [];
  }

  // Chuyển thành mảng
  toArray() {
    return [...this.items];
  }

  // Duyệt
  forEach(callback) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      callback(this.items[i], i);
    }
  }
}

// Sử dụng
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Kiểm tra ngoặc hợp lệ / Valid Parentheses

```javascript
function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// Time: O(n), Space: O(n)
```

### Ví dụ 2: Đảo ngược chuỗi / Reverse String

```javascript
function reverseString(s) {
  const stack = [];

  // Đẩy tất cả ký tự vào stack
  for (const char of s) {
    stack.push(char);
  }

  // Lấy ra để đảo ngược
  let result = "";
  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
}

// Time: O(n), Space: O(n)
```

### Ví dụ 3: Tính toán biểu thức hậu tố / Evaluate Postfix

```javascript
function evaluatePostfix(expression) {
  const stack = [];

  for (const token of expression.split(" ")) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  }

  return stack.pop();
}

// evaluatePostfix("3 4 + 2 *") = 14
// Time: O(n), Space: O(n)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/medium/020-valid-parentheses.md`](../problems/medium/020-valid-parentheses.md)
- [`../problems/hard/032-longest-valid-parentheses.md`](../problems/hard/032-longest-valid-parentheses.md)
- [`../problems/hard/042-trapping-rain-water.md`](../problems/hard/042-trapping-rain-water.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation | Array-based | Linked List-based |
| -------------------- | ----------- | ----------------- |
| Push / Thêm          | O(1)        | O(1)              |
| Pop / Lấy            | O(1)        | O(1)              |
| Peek / Xem           | O(1)        | O(1)              |
| isEmpty / Kiểm tra   | O(1)        | O(1)              |
| size / Kích thước    | O(1)        | O(1)              |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Empty stack pop**: Lấy từ stack rỗng gây lỗi
2. **Using array methods wrong**: Dùng shift/unshift thay vì push/pop
3. **Memory leak**: Không xóa stack khi không dùng
4. **Wrong order**: Nhầm lẫn LIFO với FIFO

---

## 💡 Tips & Tricks

- Dùng `stack[stack.length - 1]` để peek thay vì `stack.at(-1)` (hỗ trợ tốt hơn)
- Dùng `stack.length === 0` để kiểm tra rỗng nhanh hơn
- Dùng `stack.length = 0` để xóa nhanh hơn `stack = []`
- Dùng spread operator `[...stack]` để copy stack
- Dùng `Array.from(stack)` để chuyển stack thành mảng

---

## 📚 Tài liệu tham khảo / References

- [MDN - Array (Stack operations)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Stack - Wikipedia](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)

---

_Last updated: 2026-02-03_
