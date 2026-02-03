# Queue / Hàng đợi

> Cấu trúc dữ liệu Queue - Giải thích chi tiết / Queue Data Structure - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Queue** (Hàng đợi) là một cấu trúc dữ liệu tuyến tính (linear) hoạt động theo nguyên tắc **FIFO** (First In, First Out - Vào trước, Ra trước). Điều này có nghĩa là phần tử được thêm vào đầu tiên sẽ là phần tử được lấy ra đầu tiên.

### Các khái niệm cơ bản / Basic Concepts

- **Enqueue:** Thêm phần tử vào cuối queue
- **Dequeue:** Lấy phần tử từ đầu queue
- **Front/Head:** Phần tử ở đầu queue (sẽ được lấy ra tiếp theo)
- **Rear/Tail:** Phần tử ở cuối queue (vừa được thêm vào)
- **Size:** Số lượng phần tử trong queue
- **IsEmpty:** Kiểm tra xem queue có rỗng không

### Ví dụ thực tế / Real-world Examples

- **Hàng đợi tại siêu thị:** Khách hàng đến trước sẽ được phục vụ trước
- **Printer Queue:** Tài liệu được gửi trước sẽ được in trước
- **Task Scheduling:** Các task được xử lý theo thứ tự đến
- **Breadth-First Search (BFS):** Duyệt đồ thị theo level

---

## 🎯 Khi nào dùng? / When to use?

- **Cần xử lý theo thứ tự đến (FIFO)**
- **Cần quản lý các task theo thứ tự**
- **Cần duyệt đồ thị theo level (BFS)**
- **Cần buffer cho producer-consumer pattern**
- **Cần implement sliding window**

---

## 🔄 Các biến thể / Variations

### Simple Queue

Queue cơ bản với các thao tác enqueue và dequeue.

### Circular Queue (Ring Buffer)

Queue có kích thước cố định, khi đầy sẽ ghi đè các phần tử cũ.

### Priority Queue

Queue với mỗi phần tử có độ ưu tiên, phần tử có độ ưu tiên cao nhất sẽ được lấy ra trước.

### Deque (Double-Ended Queue)

Queue có thể thêm và lấy phần tử từ cả hai đầu.

---

## 💡 Code Template / Mẫu Code

### Cấu trúc Queue / Queue Structure

```javascript
/**
 * Queue - Cấu trúc dữ liệu Queue
 * Sử dụng Array để implement
 */
class Queue {
  constructor() {
    this.items = [];
  }

  // Thêm phần tử vào cuối queue (Enqueue)
  enqueue(element) {
    this.items.push(element);
  }

  // Lấy phần tử từ đầu queue (Dequeue)
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  // Xem phần tử đầu queue (Front)
  front() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[0];
  }

  // Kiểm tra queue rỗng
  isEmpty() {
    return this.items.length === 0;
  }

  // Lấy kích thước queue
  size() {
    return this.items.length;
  }

  // Xóa tất cả phần tử
  clear() {
    this.items = [];
  }

  // In queue
  print() {
    console.log(this.items);
  }
}

// Sử dụng Queue
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.front()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.size()); // 2
```

### Template cơ bản / Basic Template

```javascript
/**
 * Sử dụng Queue cơ bản - Basic Queue Usage
 */
function useQueue() {
  const queue = [];

  // Enqueue
  queue.push(1);
  queue.push(2);
  queue.push(3);

  // Dequeue
  while (queue.length > 0) {
    const item = queue.shift();
    console.log(item);
  }
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Circular Queue - Queue vòng tròn
 * @param {number} capacity - Kích thước tối đa của queue
 */
class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = new Array(capacity);
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }

  enqueue(element) {
    if (this.isFull()) {
      console.log("Queue is full");
      return false;
    }

    if (this.front === -1) {
      this.front = 0;
    }

    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = element;
    this.size++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }

    const element = this.queue[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;

    if (this.isEmpty()) {
      this.front = -1;
      this.rear = -1;
    }

    return element;
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue[this.front];
  }
}

// Sử dụng Circular Queue
const circularQueue = new CircularQueue(3);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
console.log(circularQueue.dequeue()); // 1
circularQueue.enqueue(4); // Vòng tròn, ghi đè vị trí cũ
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Implement Queue với Linked List

**Mô tả:** Implement Queue sử dụng Linked List để có O(1) cho cả enqueue và dequeue.

**Code:**

```javascript
/**
 * Node cho Linked List Queue
 */
class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Queue implement bằng Linked List
 * Time Complexity: O(1) cho cả enqueue và dequeue
 * Space Complexity: O(n)
 */
class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new QueueNode(value);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.front.value;
    this.front = this.front.next;

    if (this.front === null) {
      this.rear = null;
    }

    this.size--;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.front.value;
  }
}

// Test
const llQueue = new LinkedListQueue();
llQueue.enqueue(1);
llQueue.enqueue(2);
llQueue.enqueue(3);
console.log(llQueue.dequeue()); // 1
console.log(llQueue.peek()); // 2
console.log(llQueue.size); // 2
```

### Ví dụ 2 / Example 2: BFS với Queue

**Mô tả:** Sử dụng Queue để implement Breadth-First Search (BFS) trên cây.

**Code:**

```javascript
/**
 * BFS với Queue - BFS using Queue
 * @param {TreeNode} root - Root của cây
 * @return {number[]} - Các giá trị theo level order
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function bfsWithQueue(root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return result;
}

// Test
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);

console.log(bfsWithQueue(tree)); // [1, 2, 3, 4, 5]
```

### Ví dụ 3 / Example 3: Sliding Window với Queue

**Mô tả:** Tìm giá trị lớn nhất trong mỗi sliding window của size k.

**Code:**

```javascript
/**
 * Sliding Window Maximum với Deque
 * @param {number[]} nums - Mảng số
 * @param {number} k - Kích thước window
 * @return {number[]} - Mảng các giá trị lớn nhất
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Lưu index

  for (let i = 0; i < nums.length; i++) {
    // Xóa các phần tử nằm ngoài window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Xóa các phần tử nhỏ hơn phần tử hiện tại
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Thêm index hiện tại
    deque.push(i);

    // Thêm giá trị lớn nhất vào kết quả
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Test
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // [1]
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)
- [Design Circular Queue](https://leetcode.com/problems/design-circular-queue/)
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
- [Binary Tree Level Order Traversal](../problems/easy/094-binary-tree-inorder-traversal.md)
- [Number of Islands](https://leetcode.com/problems/number-of-islands/)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation | Array | Linked List | Circular Array | Ghi chú / Notes                      |
| -------------------- | ----- | ----------- | -------------- | ------------------------------------ |
| Enqueue              | O(1)  | O(1)        | O(1)           | Array: push, Linked List: thêm cuối  |
| Dequeue              | O(n)  | O(1)        | O(1)           | Array: shift O(n), Linked List: O(1) |
| Front                | O(1)  | O(1)        | O(1)           | Xem phần tử đầu                      |
| IsEmpty              | O(1)  | O(1)        | O(1)           | Kiểm tra size                        |
| Size                 | O(1)  | O(1)        | O(1)           | Lưu biến size                        |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Dùng Array.shift():** `shift()` có time complexity O(n), nên dùng Linked List hoặc Circular Queue cho O(1)
2. **Quên kiểm tra rỗng:** Luôn kiểm tra `isEmpty()` trước khi `dequeue()`
3. **Nhầm lẫn FIFO vs LIFO:** Queue là FIFO (vào trước ra trước), Stack là LIFO (vào sau ra trước)
4. **Memory Leak:** Trong Circular Queue, cần reset front và rear khi queue rỗng
5. **Index out of bounds:** Trong Circular Queue, cần dùng modulo để quay vòng

---

## 💡 Tips & Tricks

1. **Linked List cho O(1):** Nếu cần O(1) cho cả enqueue và dequeue, dùng Linked List
2. **Circular Queue:** Khi kích thước cố định, dùng Circular Queue để tối ưu bộ nhớ
3. **Deque cho flexibility:** Nếu cần thêm/xóa từ cả hai đầu, dùng Deque
4. **Priority Queue:** Khi cần xử lý theo độ ưu tiên, dùng Priority Queue (Heap)
5. **BFS:** Queue là cấu trúc dữ liệu mặc định cho BFS

---

## 📚 Tài liệu tham khảo / References

- [Queue Data Structure - Wikipedia](<https://en.wikipedia.org/wiki/Queue_(abstract_data_type)>)
- [Breadth-First Search - Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- [Circular Buffer - Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

---

_Last updated: 2025-02-03_
