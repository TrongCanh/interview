# Implement Queue using Stacks / Triển Khai Queue Sử Dụng Stack

> LeetCode Problem 232 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 232
- **URL:** https://leetcode.com/problems/implement-queue-using-stacks/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Stack, Queue, Design
- **Tags:** Stack, Queue, Design
- **Thuật toán liên quan / Related Algorithms:** Stack, Queue
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:

- `void push(int x)` Pushes element x to the back of the queue.
- `int pop()` Removes the element from the front of the queue and returns it.
- `int peek()` Returns the element at the front of the queue.
- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

**Example 1:**

```
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is [2]
myQueue.empty(); // return false
```

**Constraints:**

- `1 <= x <= 9`
- At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.
- All the calls to `pop` and `peek` are valid.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Các thao tác trên Queue: `push`, `pop`, `peek`, `empty`
- **Output:** Kết quả của các thao tác tương ứng
- **Ràng buộc / Constraints:**
  - Giá trị phần tử: 1 ≤ x ≤ 9
  - Số lượng thao tác: tối đa 100
  - Chỉ được sử dụng các thao tác chuẩn của Stack
- **Edge cases:**
  - Queue rỗng khi gọi `pop()` hoặc `peek()` - theo ràng buộc, không xảy ra
  - Push nhiều phần tử liên tiếp
  - Push, pop xen kẽ

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - triển khai Queue (FIFO) sử dụng Stack (LIFO)
- **Bước 2:** Xác định cách tiếp cận - có thể dùng 1 stack hoặc 2 stack
- **Bước 3:** Lên kế hoạch giải pháp - 2 stacks (push O(1), pop amortized O(1))

### 3. Ví dụ minh họa / Examples

```
Example: push(1), push(2), peek(), pop(), empty()

Phương pháp 2 stacks:
push(1): inputStack = [1], outputStack = []
push(2): inputStack = [1, 2], outputStack = []
peek(): outputStack rỗng → chuyển từ inputStack → outputStack = [2, 1] → trả về 1
pop(): outputStack = [2], trả về 1
empty(): trả về false
```

---

## 💡 Giải pháp 1: Using Two Stacks with Transfer (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng 2 stacks: `inputStack` và `outputStack`. Khi push, thêm vào `inputStack`. Khi pop hoặc peek, nếu `outputStack` rỗng, chuyển tất cả từ `inputStack` sang `outputStack` (đảo ngược thứ tự).

### Thuật toán / Algorithm

**push(x):**

1. Thêm `x` vào `inputStack`

**pop():**

1. Nếu `outputStack` rỗng, chuyển tất cả từ `inputStack` sang `outputStack`
2. Lấy phần tử đầu `outputStack` ra
3. Trả về phần tử đó

**peek():**

1. Nếu `outputStack` rỗng, chuyển tất cả từ `inputStack` sang `outputStack`
2. Trả về phần tử đầu `outputStack`

**empty():**

1. Trả về true nếu cả 2 stacks đều rỗng

### Code / Implementation

```javascript
/**
 * Implement Queue using Stacks - Two Stacks Solution
 */

class MyQueue {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }

  /**
   * Pushes element x to the back of the queue
   * @param {number} x - Phần tử cần thêm vào queue
   * @return {void}
   */
  push(x) {
    // Thêm phần tử vào inputStack
    this.inputStack.push(x);
  }

  /**
   * Removes the element from the front of the queue and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    // Nếu outputStack rỗng, chuyển từ inputStack sang
    if (this.outputStack.length === 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }

    // Lấy phần tử đầu outputStack (đây là phần tử front của queue)
    return this.outputStack.pop();
  }

  /**
   * Returns the element at the front of the queue
   * @return {number} - Phần tử front của queue
   */
  peek() {
    // Nếu outputStack rỗng, chuyển từ inputStack sang
    if (this.outputStack.length === 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }

    // Trả về phần tử đầu outputStack (không xóa)
    return this.outputStack[this.outputStack.length - 1];
  }

  /**
   * Returns true if the queue is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(1) - Chỉ thêm vào stack
  - `pop`: Amortized O(1) - Trong trường hợp xấu nhất O(n), nhưng trung bình O(1)
  - `peek`: Amortized O(1) - Tương tự pop
  - `empty`: O(1) - Chỉ kiểm tra độ dài
- **Space Complexity:** O(n) - Lưu trữ n phần tử

### Ưu điểm / Pros

- `push` luôn O(1)
- `pop` và `peek` amortized O(1)
- Code rõ ràng, dễ hiểu

### Nhược điểm / Cons

- Cần 2 stacks
- Trong trường hợp xấu nhất, `pop` và `peek` có thể O(n)

---

## 🚀 Giải pháp 2: Optimized - Lazy Transfer (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã khá tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu đáng kể
- Cách tiếp cận mới? Tương tự giải pháp cơ bản nhưng tối ưu code

### Ý tưởng / Idea

Tương tự giải pháp cơ bản, nhưng tối ưu code bằng cách tạo hàm helper để chuyển từ `inputStack` sang `outputStack`.

### Thuật toán / Algorithm

Tương tự giải pháp cơ bản, nhưng tạo hàm `transfer()` để chuyển từ `inputStack` sang `outputStack`.

### Code / Implementation

```javascript
/**
 * Implement Queue using Stacks - Optimized Solution with Helper
 */

class MyQueueOptimized {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }

  /**
   * Chuyển tất cả phần tử từ inputStack sang outputStack
   * @return {void}
   */
  transfer() {
    while (this.inputStack.length > 0) {
      this.outputStack.push(this.inputStack.pop());
    }
  }

  /**
   * Pushes element x to the back of the queue
   * @param {number} x - Phần tử cần thêm vào queue
   * @return {void}
   */
  push(x) {
    this.inputStack.push(x);
  }

  /**
   * Removes the element from the front of the queue and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    if (this.outputStack.length === 0) {
      this.transfer();
    }
    return this.outputStack.pop();
  }

  /**
   * Returns the element at the front of the queue
   * @return {number} - Phần tử front của queue
   */
  peek() {
    if (this.outputStack.length === 0) {
      this.transfer();
    }
    return this.outputStack[this.outputStack.length - 1];
  }

  /**
   * Returns true if the queue is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(1)
  - `pop`: Amortized O(1)
  - `peek`: Amortized O(1)
  - `empty`: O(1)
- **Space Complexity:** O(n)

### Ưu điểm / Pros

- Code rõ ràng hơn với hàm helper
- Tái sử dụng code tốt hơn
- Tối ưu tương tự giải pháp cơ bản

### Nhược điểm / Cons

- Cần 2 stacks
- Trong trường hợp xấu nhất, `pop` và `peek` có thể O(n)

---

## ⚡ Giải pháp 3: Advanced - Single Stack (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng 1 stack nhưng sẽ làm cho pop/peek O(n)
- Có thuật toán/pattern nào phù hợp hơn? Recursive stack

### Ý tưởng / Idea

Sử dụng 1 stack duy nhất. Khi pop, sử dụng đệ quy để lấy phần tử cuối cùng của stack (đây là phần tử front của queue).

### Thuật toán / Algorithm

**push(x):**

1. Thêm `x` vào stack

**pop():**

1. Nếu stack chỉ có 1 phần tử, lấy ra và trả về
2. Ngược lại, lấy phần tử đầu ra, đệ quy pop(), sau đó thêm lại phần tử đã lấy ra

**peek():**

1. Tương tự pop(), nhưng không xóa phần tử cuối cùng

**empty():**

1. Trả về true nếu stack rỗng

### Code / Implementation

```javascript
/**
 * Implement Queue using Stacks - Single Stack Solution
 */

class MyQueueSingleStack {
  constructor() {
    this.stack = [];
  }

  /**
   * Pushes element x to the back of the queue
   * @param {number} x - Phần tử cần thêm vào queue
   * @return {void}
   */
  push(x) {
    this.stack.push(x);
  }

  /**
   * Removes the element from the front of the queue and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    // Nếu stack chỉ có 1 phần tử, lấy ra và trả về
    if (this.stack.length === 1) {
      return this.stack.pop();
    }

    // Lấy phần tử đầu ra
    const top = this.stack.pop();

    // Đệ quy lấy phần tử cuối cùng (front của queue)
    const result = this.pop();

    // Thêm lại phần tử đã lấy ra
    this.stack.push(top);

    return result;
  }

  /**
   * Returns the element at the front of the queue
   * @return {number} - Phần tử front của queue
   */
  peek() {
    // Nếu stack chỉ có 1 phần tử, trả về nó
    if (this.stack.length === 1) {
      return this.stack[this.stack.length - 1];
    }

    // Lấy phần tử đầu ra
    const top = this.stack.pop();

    // Đệ quy lấy phần tử cuối cùng (front của queue)
    const result = this.peek();

    // Thêm lại phần tử đã lấy ra
    this.stack.push(top);

    return result;
  }

  /**
   * Returns true if the queue is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.stack.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(1)
  - `pop`: O(n) - Đệ quy qua tất cả phần tử
  - `peek`: O(n) - Đệ quy qua tất cả phần tử
  - `empty`: O(1)
- **Space Complexity:** O(n) - Stack đệ quy có thể sâu đến n

### Ưu điểm / Pros

- Chỉ dùng 1 stack
- Code thú vị, sử dụng đệ quy

### Nhược điểm / Cons

- `pop` và `peek` có độ phức tạp O(n)
- Có thể gây stack overflow với queue lớn
- Code khó hiểu hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | push | pop    | peek   | empty | Space | Độ khó / Difficulty |
| -------------------- | ---- | ------ | ------ | ----- | ----- | ------------------- |
| Two Stacks           | O(1) | O(1)\* | O(1)\* | O(1)  | O(n)  | Dễ / Easy           |
| Optimized Two Stacks | O(1) | O(1)\* | O(1)\* | O(1)  | O(n)  | Dễ / Easy           |
| Single Stack         | O(1) | O(n)   | O(n)   | O(1)  | O(n)  | Khó / Hard          |

\*Amortized O(1)

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(2);
console.log(myQueue.peek()); // 1
console.log(myQueue.pop()); // 1
console.log(myQueue.empty()); // false
```

### Test Case 2: Push nhiều lần / Multiple Pushes

```javascript
const myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(2);
myQueue.push(3);
myQueue.push(4);
console.log(myQueue.peek()); // 1
console.log(myQueue.pop()); // 1
console.log(myQueue.peek()); // 2
```

### Test Case 3: Push pop xen kẽ / Alternate Push Pop

```javascript
const myQueue = new MyQueue();
myQueue.push(1);
console.log(myQueue.pop()); // 1
myQueue.push(2);
console.log(myQueue.peek()); // 2
myQueue.push(3);
console.log(myQueue.pop()); // 2
console.log(myQueue.peek()); // 3
```

### Test Case 4: Queue rỗng / Empty Queue

```javascript
const myQueue = new MyQueue();
console.log(myQueue.empty()); // true
myQueue.push(1);
console.log(myQueue.empty()); // false
myQueue.pop();
console.log(myQueue.empty()); // true
```

### Test Case 5: Giá trị lớn / Large Values

```javascript
const myQueue = new MyQueue();
myQueue.push(9);
myQueue.push(8);
myQueue.push(7);
console.log(myQueue.pop()); // 9
console.log(myQueue.peek()); // 8
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Stack](../algorithms/data-structures/stack.md)
  - [Queue](../algorithms/data-structures/queue.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Stack vs Queue:**
   - Stack: LIFO (Last In First Out) - vào sau ra trước
   - Queue: FIFO (First In First Out) - vào trước ra trước

2. **Amortized Time Complexity:**
   - Một thao tác có thể O(n) trong trường hợp xấu nhất
   - Nhưng trung bình qua nhiều thao tác là O(1)
   - Ví dụ: chuyển từ inputStack sang outputStack chỉ làm 1 lần cho n phần tử

3. **Two Stacks Approach:**
   - `inputStack`: lưu các phần tử mới được push
   - `outputStack`: lưu các phần tử đã được đảo ngược (để pop/peek)
   - Chỉ chuyển khi `outputStack` rỗng

4. **JavaScript Array as Stack:**
   - `push()`: thêm vào cuối
   - `pop()`: lấy từ cuối
   - `peek`: `arr[arr.length - 1]`

5. **Lưu ý về ràng buộc:**
   - Theo đề bài, các gọi `pop()` và `peek()` luôn hợp lệ (queue không rỗng)
   - Trong thực tế, nên kiểm tra queue rỗng trước khi pop/peek

---

_Last updated: 2025-02-04_
