# Implement Stack using Queues / Triển Khai Stack Sử Dụng Queue

> LeetCode Problem 225 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 225
- **URL:** https://leetcode.com/problems/implement-stack-using-queues/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Stack, Queue, Design
- **Tags:** Stack, Queue, Design
- **Thuật toán liên quan / Related Algorithms:** Stack, Queue
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:

- `void push(int x)` Pushes element x to the top of the stack.
- `int pop()` Removes the element on the top of the stack and returns it.
- `int top()` Returns the element on the top of the stack.
- `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a queue, which means only `push to back`, `peek/pop from front`, `size`, and `is empty` operations are valid.
- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

**Example 1:**

```
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
```

**Constraints:**

- `1 <= x <= 9`
- At most `100` calls will be made to `push`, `pop`, `top`, and `empty`.
- All the calls to `pop` and `top` are valid.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Các thao tác trên Stack: `push`, `pop`, `top`, `empty`
- **Output:** Kết quả của các thao tác tương ứng
- **Ràng buộc / Constraints:**
  - Giá trị phần tử: 1 ≤ x ≤ 9
  - Số lượng thao tác: tối đa 100
  - Chỉ được sử dụng các thao tác chuẩn của Queue
- **Edge cases:**
  - Stack rỗng khi gọi `pop()` hoặc `top()` - theo ràng buộc, không xảy ra
  - Push nhiều phần tử liên tiếp
  - Push, pop xen kẽ

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - triển khai Stack (LIFO) sử dụng Queue (FIFO)
- **Bước 2:** Xác định cách tiếp cận - có thể dùng 1 queue hoặc 2 queue
- **Bước 3:** Lên kế hoạch giải pháp - 1 queue (push O(n), pop O(1)), 2 queues (push O(1), pop O(n))

### 3. Ví dụ minh họa / Examples

```
Example: push(1), push(2), top(), pop(), empty()

Phương pháp 1 queue:
push(1): queue = [1]
push(2): queue = [2, 1] (đảo 2 lên đầu)
top(): trả về 2
pop(): queue = [1], trả về 2
empty(): trả về false

Phương pháp 2 queues:
push(1): q1 = [1], q2 = []
push(2): q1 = [], q2 = [1, 2] (chuyển từ q1 sang q2)
top(): trả về 2
pop(): q1 = [2], q2 = [], trả về 2
empty(): trả về false
```

---

## 💡 Giải pháp 1: Using One Queue (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng một queue duy nhất. Khi push, thêm phần tử mới vào cuối, sau đó chuyển tất cả các phần tử hiện có lên phía trước của phần tử mới. Điều này đảm bảo phần tử mới luôn ở đầu queue.

### Thuật toán / Algorithm

**push(x):**

1. Thêm `x` vào cuối queue
2. Lấy kích thước queue trước khi thêm `x`
3. Lặp `size - 1` lần:
   - Lấy phần tử đầu queue ra
   - Thêm vào cuối queue

**pop():**

1. Lấy phần tử đầu queue ra
2. Trả về phần tử đó

**top():**

1. Trả về phần tử đầu queue

**empty():**

1. Trả về true nếu queue rỗng, false nếu không

### Code / Implementation

```javascript
/**
 * Implement Stack using Queues - One Queue Solution
 */

class MyStack {
  constructor() {
    this.queue = [];
  }

  /**
   * Pushes element x to the top of the stack
   * @param {number} x - Phần tử cần thêm vào stack
   * @return {void}
   */
  push(x) {
    // Thêm phần tử mới vào cuối queue
    this.queue.push(x);

    // Đảo phần tử mới lên đầu queue
    const size = this.queue.length;
    for (let i = 0; i < size - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  /**
   * Removes the element on the top of the stack and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    // Lấy phần tử đầu queue (đây là phần tử top của stack)
    return this.queue.shift();
  }

  /**
   * Returns the element on the top of the stack
   * @return {number} - Phần tử top của stack
   */
  top() {
    // Trả về phần tử đầu queue (không xóa)
    return this.queue[0];
  }

  /**
   * Returns true if the stack is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.queue.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(n) - Cần đảo n phần tử
  - `pop`: O(1) - Chỉ lấy phần tử đầu
  - `top`: O(1) - Chỉ đọc phần tử đầu
  - `empty`: O(1) - Chỉ kiểm tra độ dài
- **Space Complexity:** O(n) - Lưu trữ n phần tử

### Ưu điểm / Pros

- Chỉ sử dụng 1 queue, đơn giản
- `pop`, `top`, `empty` đều O(1)
- Code dễ hiểu

### Nhược điểm / Cons

- `push` có độ phức tạp O(n)
- Cần thao tác thêm khi push

---

## 🚀 Giải pháp 2: Using Two Queues (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể làm cho `push` trở thành O(1)
- Điểm yếu của giải pháp 1? `push` có độ phức tạp O(n)
- Cách tiếp cận mới? Sử dụng 2 queues để tối ưu hóa `push`

### Ý tưởng / Idea

Sử dụng 2 queues: `mainQueue` và `tempQueue`. Khi push, thêm vào `tempQueue`. Khi pop, chuyển tất cả phần tử từ `mainQueue` sang `tempQueue` trừ phần tử cuối cùng, sau đó đổi tên 2 queues.

### Thuật toán / Algorithm

**push(x):**

1. Thêm `x` vào `tempQueue`

**pop():**

1. Nếu `mainQueue` rỗng, đổi chỗ `mainQueue` và `tempQueue`
2. Chuyển tất cả phần tử từ `mainQueue` sang `tempQueue`, trừ phần tử cuối cùng
3. Lấy phần tử cuối cùng của `mainQueue` ra
4. Đổi chỗ `mainQueue` và `tempQueue`
5. Trả về phần tử đã lấy ra

**top():**

1. Tương tự như `pop()` nhưng không xóa phần tử
2. Sau khi tìm được phần tử top, thêm lại vào queue

**empty():**

1. Trả về true nếu cả 2 queues đều rỗng

### Code / Implementation

```javascript
/**
 * Implement Stack using Queues - Two Queues Solution
 */

class MyStackTwoQueues {
  constructor() {
    this.mainQueue = [];
    this.tempQueue = [];
  }

  /**
   * Pushes element x to the top of the stack
   * @param {number} x - Phần tử cần thêm vào stack
   * @return {void}
   */
  push(x) {
    // Thêm phần tử mới vào tempQueue
    this.tempQueue.push(x);
  }

  /**
   * Removes the element on the top of the stack and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    // Nếu mainQueue rỗng, đổi chỗ 2 queues
    if (this.mainQueue.length === 0) {
      [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];
    }

    // Chuyển tất cả phần tử sang tempQueue, trừ phần tử cuối cùng
    while (this.mainQueue.length > 1) {
      this.tempQueue.push(this.mainQueue.shift());
    }

    // Lấy phần tử cuối cùng (top của stack)
    const topElement = this.mainQueue.shift();

    // Đổi chỗ 2 queues
    [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];

    return topElement;
  }

  /**
   * Returns the element on the top of the stack
   * @return {number} - Phần tử top của stack
   */
  top() {
    // Nếu mainQueue rỗng, đổi chỗ 2 queues
    if (this.mainQueue.length === 0) {
      [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];
    }

    // Chuyển tất cả phần tử sang tempQueue, trừ phần tử cuối cùng
    while (this.mainQueue.length > 1) {
      this.tempQueue.push(this.mainQueue.shift());
    }

    // Lấy phần tử cuối cùng (top của stack)
    const topElement = this.mainQueue[0];

    // Thêm lại vào tempQueue
    this.tempQueue.push(this.mainQueue.shift());

    // Đổi chỗ 2 queues
    [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];

    return topElement;
  }

  /**
   * Returns true if the stack is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.mainQueue.length === 0 && this.tempQueue.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(1) - Chỉ thêm vào queue
  - `pop`: O(n) - Cần chuyển n phần tử
  - `top`: O(n) - Cần chuyển n phần tử
  - `empty`: O(1) - Chỉ kiểm tra độ dài
- **Space Complexity:** O(n) - Lưu trữ n phần tử

### Ưu điểm / Pros

- `push` có độ phức tạp O(1)
- Tối ưu hóa cho trường hợp push nhiều lần

### Nhược điểm / Cons

- `pop` và `top` có độ phức tạp O(n)
- Cần 2 queues
- Code phức tạp hơn

---

## ⚡ Giải pháp 3: Optimized Two Queues (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể tối ưu hóa cả `push` và `pop`
- Có thuật toán/pattern nào phù hợp hơn? Luôn giữ phần tử top ở đầu mainQueue

### Ý tưởng / Idea

Luôn đảm bảo phần tử top của stack nằm ở đầu `mainQueue`. Khi push, thêm vào `tempQueue`, sau đó chuyển tất cả từ `mainQueue` sang `tempQueue`, rồi đổi tên.

### Thuật toán / Algorithm

**push(x):**

1. Thêm `x` vào `tempQueue`
2. Chuyển tất cả phần tử từ `mainQueue` sang `tempQueue`
3. Đổi chỗ `mainQueue` và `tempQueue`

**pop():**

1. Lấy phần tử đầu `mainQueue` ra
2. Trả về phần tử đó

**top():**

1. Trả về phần tử đầu `mainQueue`

**empty():**

1. Trả về true nếu `mainQueue` rỗng

### Code / Implementation

```javascript
/**
 * Implement Stack using Queues - Optimized Two Queues Solution
 */

class MyStackOptimized {
  constructor() {
    this.mainQueue = [];
    this.tempQueue = [];
  }

  /**
   * Pushes element x to the top of the stack
   * @param {number} x - Phần tử cần thêm vào stack
   * @return {void}
   */
  push(x) {
    // Thêm phần tử mới vào tempQueue
    this.tempQueue.push(x);

    // Chuyển tất cả phần tử từ mainQueue sang tempQueue
    while (this.mainQueue.length > 0) {
      this.tempQueue.push(this.mainQueue.shift());
    }

    // Đổi chỗ 2 queues
    [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];
  }

  /**
   * Removes the element on the top of the stack and returns it
   * @return {number} - Phần tử bị xóa
   */
  pop() {
    // Lấy phần tử đầu queue (đây là phần tử top của stack)
    return this.mainQueue.shift();
  }

  /**
   * Returns the element on the top of the stack
   * @return {number} - Phần tử top của stack
   */
  top() {
    // Trả về phần tử đầu queue (không xóa)
    return this.mainQueue[0];
  }

  /**
   * Returns true if the stack is empty, false otherwise
   * @return {boolean} - true nếu rỗng, false nếu không
   */
  empty() {
    return this.mainQueue.length === 0;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:**
  - `push`: O(n) - Cần chuyển n phần tử
  - `pop`: O(1) - Chỉ lấy phần tử đầu
  - `top`: O(1) - Chỉ đọc phần tử đầu
  - `empty`: O(1) - Chỉ kiểm tra độ dài
- **Space Complexity:** O(n) - Lưu trữ n phần tử

### Ưu điểm / Pros

- `pop`, `top`, `empty` đều O(1)
- Code rõ ràng, dễ hiểu
- Luôn giữ phần tử top ở đầu queue

### Nhược điểm / Cons

- `push` có độ phức tạp O(n)
- Cần 2 queues

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | push | pop  | top  | empty | Space | Độ khó / Difficulty |
| -------------------- | ---- | ---- | ---- | ----- | ----- | ------------------- |
| One Queue            | O(n) | O(1) | O(1) | O(1)  | O(n)  | Dễ / Easy           |
| Two Queues           | O(1) | O(n) | O(n) | O(1)  | O(n)  | Trung bình / Medium |
| Optimized Two Queues | O(n) | O(1) | O(1) | O(1)  | O(n)  | Trung bình / Medium |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const myStack = new MyStack();
myStack.push(1);
myStack.push(2);
console.log(myStack.top()); // 2
console.log(myStack.pop()); // 2
console.log(myStack.empty()); // false
```

### Test Case 2: Push nhiều lần / Multiple Pushes

```javascript
const myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
console.log(myStack.top()); // 4
console.log(myStack.pop()); // 4
console.log(myStack.top()); // 3
```

### Test Case 3: Push pop xen kẽ / Alternate Push Pop

```javascript
const myStack = new MyStack();
myStack.push(1);
console.log(myStack.pop()); // 1
myStack.push(2);
console.log(myStack.top()); // 2
myStack.push(3);
console.log(myStack.pop()); // 3
console.log(myStack.top()); // 2
```

### Test Case 4: Stack rỗng / Empty Stack

```javascript
const myStack = new MyStack();
console.log(myStack.empty()); // true
myStack.push(1);
console.log(myStack.empty()); // false
myStack.pop();
console.log(myStack.empty()); // true
```

### Test Case 5: Giá trị lớn / Large Values

```javascript
const myStack = new MyStack();
myStack.push(9);
myStack.push(8);
myStack.push(7);
console.log(myStack.pop()); // 7
console.log(myStack.top()); // 8
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

2. **Các phương pháp triển khai:**
   - 1 Queue: push O(n), pop O(1) - phù hợp khi pop nhiều hơn push
   - 2 Queues: push O(1), pop O(n) - phù hợp khi push nhiều hơn pop
   - Optimized 2 Queues: push O(n), pop O(1) - cân bằng tốt

3. **JavaScript Array as Queue:**
   - `push()`: thêm vào cuối
   - `shift()`: lấy từ đầu
   - `unshift()`: thêm vào đầu
   - `pop()`: lấy từ cuối

4. **Destructuring Assignment:**
   - `[a, b] = [b, a]` là cách nhanh để đổi giá trị 2 biến trong JavaScript

5. **Lưu ý về ràng buộc:**
   - Theo đề bài, các gọi `pop()` và `top()` luôn hợp lệ (stack không rỗng)
   - Trong thực tế, nên kiểm tra stack rỗng trước khi pop/top

---

_Last updated: 2025-02-04_
