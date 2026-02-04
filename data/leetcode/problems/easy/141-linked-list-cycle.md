# Linked List Cycle

> LeetCode Problem 141 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 141
- **URL:** https://leetcode.com/problems/linked-list-cycle/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List, Two Pointers
- **Tags:** Linked List, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Linked List, Two Pointers
- **Patterns liên quan / Related Patterns:** Fast Slow Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given `head`, the head of a linked list, determine if the linked list has a cycle in it.
>
> There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. Note that `pos` is not passed as a parameter.
>
> Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

**Example 1:**

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

**Example 2:**

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

**Example 3:**

```
Input: = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

**Constraints:**

- The number of the nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index in the linked-list.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của linked list
- **Output:** Boolean - true nếu có cycle, false nếu không
- **Ràng buộc / Constraints:**
  - Cycle nếu có node có thể truy cập lại bằng cách đi theo next
- **Edge cases:**
  - Linked list rỗng (head = null) → false
  - Linked list chỉ có 1 node không có cycle → false
  - Linked list có cycle

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần phát hiện xem có cycle không
- **Bước 2:** Có thể dùng Hash Set để lưu các node đã thăm
- **Bước 3:** Hoặc dùng Fast Slow Pointers (Floyd's Algorithm)

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: head = [3,2,0,-4], pos = 1

Linked list:
3 → 2 → 0 → -4
    ↑_______________|

Giải thích:
- Node 2 trỏ về node 2 (tạo cycle)
- Có cycle trong linked list
Output: true
```

---

## 💡 Giải pháp 1: Hash Set (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Hash Set để lưu các node đã thăm. Nếu gặp lại node đã có trong Set, có cycle.

### Thuật toán / Algorithm

1. Nếu head = null, trả về false
2. Tạo Set để lưu các node đã thăm
3. Trong khi node != null:
   - Nếu Set có node, trả về true (có cycle)
   - Thêm node vào Set
   - node = node.next
4. Trả về false (không có cycle)

### Code / Implementation

```javascript
/**
 * Linked List Cycle - Hash Set Solution
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  if (!head) {
    return false;
  }

  const visited = new Set();
  let node = head;

  while (node) {
    // Nếu node đã thăm, có cycle
    if (visited.has(node)) {
      return true;
    }

    visited.add(node);
    node = node.next;
  }

  // Đi đến cuối list, không có cycle
  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt tối đa 1 lần
- **Space Complexity:** O(n) - Lưu Set với n node

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không phụ thuộc vào thuật toán phức tạp

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Set

---

## 🚀 Giải pháp 2: Fast Slow Pointers (Cải tiến) / Fast Slow Pointers Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Hash Set tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Tốn O(n) space
- Cách tiếp cận mới? Dùng Floyd's Cycle Detection Algorithm (Fast Slow Pointers)

### Ý tưởng / Idea

Dùng 2 pointers: slow di chuyển 1 bước, fast di chuyển 2 bước. Nếu có cycle, fast sẽ bắt kịp slow.

### Thuật toán / Algorithm

1. Nếu head = null hoặc head.next = null, trả về false
2. Khởi tạo slow = head, fast = head
3. Trong khi fast && fast.next:
   - slow = slow.next (di chuyển 1 bước)
   - fast = fast.next.next (di chuyển 2 bước)
   - Nếu slow === fast, trả về true (có cycle)
4. Trả về false (không có cycle)

### Code / Implementation

```javascript
/**
 * Linked List Cycle - Fast Slow Pointers Solution (Floyd's Algorithm)
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle_FastSlow(head) {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // Di chuyển 1 bước
    fast = fast.next.next; // Di chuyển 2 bước

    // Nếu fast bắt kịp slow, có cycle
    if (slow === fast) {
      return true;
    }
  }

  // fast đến cuối list, không có cycle
  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Trong trường hợp có cycle, fast sẽ bắt kịp slow
- **Space Complexity:** O(1) - Chỉ dùng 2 pointers

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)
- Không cần cấu trúc dữ liệu bổ sung

### Nhược điểm / Cons

- Cần hiểu về Floyd's Algorithm
- Khó hiểu hơn Hash Set

---

## ⚡ Giải pháp 3: Mark Visited (Nâng cao) / Mark Visited Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể đánh dấu node đã thăm
- Có thuật toán/pattern nào phù hợp hơn? Dùng property để đánh dấu

### Ý tưởng / Idea

Duyệt qua linked list và đánh dấu node đã thăm bằng cách thay đổi giá trị hoặc thêm property.

### Thuật toán / Algorithm

1. Nếu head = null, trả về false
2. Khởi tạo node = head
3. Trong khi node != null:
   - Nếu node.visited === true, trả về true (có cycle)
   - node.visited = true
   - node = node.next
4. Trả về false (không có cycle)

### Code / Implementation

```javascript
/**
 * Linked List Cycle - Mark Visited Solution
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle_MarkVisited(head) {
  if (!head) {
    return false;
  }

  let node = head;

  while (node) {
    // Nếu node đã thăm, có cycle
    if (node.visited) {
      return true;
    }

    node.visited = true;
    node = node.next;
  }

  // Đi đến cuối list, không có cycle
  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi node được duyệt tối đa 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 1 biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Độ phức tạp bộ nhớ O(1)

### Nhược điểm / Cons

- Thay đổi cấu trúc node (thêm property visited)
- Không nên dùng trong production (modify input)

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use             |
| -------------------- | ---- | ----- | ------------------- | -------------------------------------- |
| Hash Set             | O(n) | O(n)  | Dễ / Easy           | Dễ hiểu, không cần thuật toán phức tạp |
| Fast Slow Pointers   | O(n) | O(1)  | Trung bình / Medium | Tối ưu, nên dùng                       |
| Mark Visited         | O(n) | O(1)  | Khó / Hard          | Không nên dùng (modify input)          |

---

## 🧪 Test Cases

### Test Case 1: Có cycle / Has Cycle

```javascript
// Tạo linked list với cycle: 3 -> 2 -> 0 -> -4 -> (back to 2)
const head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(-4);
head.next.next.next.next = head.next; // cycle

console.log(hasCycle(head)); // Expected: true
console.log(hasCycle_FastSlow(head)); // Expected: true
```

### Test Case 2: Không có cycle / No Cycle

```javascript
// Tạo linked list không có cycle: 1 -> 2 -> 3 -> null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

console.log(hasCycle(head)); // Expected: false
console.log(hasCycle_FastSlow(head)); // Expected: false
```

### Test Case 3: Linked list rỗng / Empty List

```javascript
console.log(hasCycle(null)); // Expected: false
console.log(hasCycle_FastSlow(null)); // Expected: false
```

### Test Case 4: Chỉ có 1 node / Single Node

```javascript
const head = new ListNode(1);
console.log(hasCycle(head)); // Expected: false
console.log(hasCycle_FastSlow(head)); // Expected: false
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)

- **Thuật toán liên quan:**
  - [Fast Slow Pointers](../algorithms/patterns/fast-slow-pointers.md)

---

## 💬 Lời khuyên / Tips

- **Fast Slow Pointers (Floyd's Algorithm):**
  - slow di chuyển 1 bước, fast di chuyển 2 bước
  - Nếu có cycle, fast sẽ bắt kịp slow
  - Tối ưu: O(n) time, O(1) space
- **Hash Set:**
  - Dễ hiểu nhưng tốn O(n) space
- **Lỗi thường gặp:**
  - Quên kiểm tra head = null
  - Với fast slow, quên kiểm tra fast.next = null
  - Quên điều kiện dừng vòng lặp (fast && fast.next)
  - Với mark visited, không nên modify input

---

_Last updated: 2026-02-03_
