# Reverse Nodes in k-Group / Đảo Ngược Nút theo Nhóm k

> LeetCode Problem 25 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 25
- **URL:** https://leetcode.com/problems/reverse-nodes-in-k-group/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Linked List, Recursion
- **Tags:** Linked List, Recursion
- **Thuật toán liên quan / Related Algorithms:** Linked List, Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

**Example 1:**

```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

**Example 2:**

```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

**Constraints:**

- The number of nodes in the list is `n`.
- `1 <= k <= n <= 5000`
- `0 <= Node.val <= 1000`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của linked list và số k
- **Output:** Linked list đã được đảo ngược từng nhóm k node
- **Ràng buộc / Constraints:**
  - Chỉ đảo ngược từng nhóm k node
  - Nếu số node còn lại < k, giữ nguyên
  - Không được thay đổi giá trị node
- **Edge cases:**
  - k = 1 (không cần đảo)
  - k = độ dài list (đảo toàn bộ)
  - List rỗng hoặc có 1 node

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần đảo ngược từng nhóm k node. Có thể dùng đệ quy hoặc vòng lặp.
- **Bước 2:** Với đệ quy: đảo ngược k node đầu tiên, đệ quy với phần còn lại, nối kết quả.
- **Bước 3:** Với vòng lặp: duyệt qua list, mỗi lần đảo ngược k node và nối vào result.

### 3. Ví dụ minh họa / Examples

```
Example: head = [1,2,3,4,5], k = 2

Nhóm 1: [1,2] -> đảo -> [2,1]
Nhóm 2: [3,4] -> đảo -> [4,3]
Nhóm 3: [5] -> < k, giữ nguyên -> [5]

Kết quả: [2,1,4,3,5]
```

```
Example: head = [1,2,3,4,5], k = 3

Nhóm 1: [1,2,3] -> đảo -> [3,2,1]
Nhóm 2: [4,5] -> < k, giữ nguyên -> [4,5]

Kết quả: [3,2,1,4,5]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Sử dụng đệ quy để đảo ngược từng nhóm k node.

### Thuật toán / Algorithm

1. Nếu số node còn lại < k, trả về head
2. Đảo ngược k node đầu tiên
3. Đệ quy với phần còn lại của list
4. Nối kết quả đệ quy vào cuối nhóm đã đảo

### Code / Implementation

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Reverse Nodes in k-Group - Recursive Solution
 * @param {ListNode} head - Head of linked list
 * @param {number} k - Group size
 * @return {ListNode} - Modified linked list
 */
function reverseKGroup_recursive(head, k) {
  // Check if there are at least k nodes
  let count = 0;
  let current = head;
  while (current && count < k) {
    current = current.next;
    count++;
  }

  // If less than k nodes, return as is
  if (count < k) {
    return head;
  }

  // Reverse k nodes
  const reversed = reverseKNodes(head, k);

  // Recursively reverse the rest
  head.next = reverseKGroup_recursive(current, k);

  return reversed;
}

/**
 * Reverse first k nodes
 * @param {ListNode} head - Head of group
 * @param {number} k - Number of nodes to reverse
 * @return {ListNode} - New head of reversed group
 */
function reverseKNodes(head, k) {
  let prev = null;
  let current = head;

  for (let i = 0; i < k; i++) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi node được duyệt một lần
- **Space Complexity:** O(n/k) - stack đệ quy

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code gọn gàng

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow
- Tốn stack space

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp đệ quy tốn stack space.
- Điểm yếu của giải pháp 1? Có thể gây stack overflow với list dài.
- Cách tiếp cận mới? Sử dụng vòng lặp thay vì đệ quy.

### Ý tưởng / Idea

Sử dụng vòng lặp để duyệt qua list, mỗi lần đảo ngược k node và nối vào result.

### Thuật toán / Algorithm

1. Tạo dummy node để làm head mới
2. Duyệt qua list với step k
3. Mỗi lần:
   - Lưu prevGroupTail
   - Đảo ngược k node
   - Nối vào result
   - Cập nhật prevGroupTail
4. Trả về dummy.next

### Code / Implementation

```javascript
/**
 * Reverse Nodes in k-Group - Iterative Solution
 * @param {ListNode} head - Head of linked list
 * @param {number} k - Group size
 * @return {ListNode} - Modified linked list
 */
function reverseKGroup_iterative(head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupTail = dummy;

  while (true) {
    // Check if there are k nodes
    let count = 0;
    let current = prevGroupTail.next;
    while (current && count < k) {
      current = current.next;
      count++;
    }

    // If less than k nodes, we're done
    if (count < k) {
      break;
    }

    // Reverse k nodes
    const groupHead = prevGroupTail.next;
    const reversed = reverseKNodes(groupHead, k);

    // Connect to previous group
    prevGroupTail.next = reversed;

    // Update prevGroupTail to the end of reversed group
    prevGroupTail = groupHead;
  }

  return dummy.next;
}

/**
 * Reverse first k nodes
 * @param {ListNode} head - Head of group
 * @param {number} k - Number of nodes to reverse
 * @return {ListNode} - New head of reversed group
 */
function reverseKNodes(head, k) {
  let prev = null;
  let current = head;

  for (let i = 0; i < k; i++) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi node được duyệt một lần
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Không dùng đệ quy
- Tối ưu bộ nhớ

### Nhược điểm / Cons

- Code phức tạp hơn
- Cần quản lý nhiều con trỏ

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã tối ưu.
- Có thuật toán/pattern nào phù hợp hơn? Đây là bài toán Linked List kinh điển.

### Ý tưởng / Idea

Sử dụng kỹ thuật "three-pointer" để đảo ngược và nối groups một cách hiệu quả hơn.

### Thuật toán / Algorithm

1. Tương tự giải pháp 2 nhưng tối ưu cách nối các groups
2. Sử dụng kỹ thuật "pre-connect" để giảm số lần gán

### Code / Implementation

```javascript
/**
 * Reverse Nodes in k-Group - Optimized Iterative
 * @param {ListNode} head - Head of linked list
 * @param {number} k - Group size
 * @return {ListNode} - Modified linked list
 */
function reverseKGroup_optimized(head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupTail = dummy;

  while (true) {
    // Find the kth node
    let kth = prevGroupTail;
    let count = 0;
    while (kth.next && count < k) {
      kth = kth.next;
      count++;
    }

    // If less than k nodes, we're done
    if (count < k) {
      break;
    }

    // Save next group head
    const nextGroupHead = kth.next;

    // Reverse the group
    const groupHead = prevGroupTail.next;
    let prev = nextGroupHead;
    let current = groupHead;

    while (current !== nextGroupHead) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    // Connect to previous group
    prevGroupTail.next = prev;
    prevGroupTail = groupHead;
  }

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Tối ưu nhất
- Không cần hàm phụ trợ

### Nhược điểm / Cons

- Phức tạp nhất để hiểu

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space  | Độ khó / Difficulty | Khi nào dùng / When to use   |
| -------------------- | ---- | ------ | ------------------- | ---------------------------- |
| Recursive            | O(n) | O(n/k) | Trung bình / Medium | Code gọn, list không quá dài |
| Iterative            | O(n) | O(1)   | Khó / Hard          | List dài, cần tối ưu bộ nhớ  |
| Optimized Iterative  | O(n) | O(1)   | Khó / Hard          | Cần tối ưu nhất              |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const head = createList([1, 2, 3, 4, 5]);
const k = 2;
const result = reverseKGroup_iterative(head, k);
const expected = [2, 1, 4, 3, 5];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 2: k = 3 / k equals 3

```javascript
const head = createList([1, 2, 3, 4, 5]);
const k = 3;
const result = reverseKGroup_iterative(head, k);
const expected = [3, 2, 1, 4, 5];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 3: k = 1 / k equals 1

```javascript
const head = createList([1, 2, 3, 4, 5]);
const k = 1;
const result = reverseKGroup_iterative(head, k);
const expected = [1, 2, 3, 4, 5];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 4: k = độ dài list / k equals list length

```javascript
const head = createList([1, 2, 3, 4, 5]);
const k = 5;
const result = reverseKGroup_iterative(head, k);
const expected = [5, 4, 3, 2, 1];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 5: List có 1 node / Single node list

```javascript
const head = createList([1]);
const k = 2;
const result = reverseKGroup_iterative(head, k);
const expected = [1];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Helper Functions

```javascript
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Patterns liên quan:**
  - None
