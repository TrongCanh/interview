# 206. Reverse Linked List

## Problem Information

| Property               | Value                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Problem ID**         | 206                                                                                                      |
| **URL**                | [https://leetcode.com/problems/reverse-linked-list/](https://leetcode.com/problems/reverse-linked-list/) |
| **Difficulty**         | Easy                                                                                                     |
| **Category**           | Linked List                                                                                              |
| **Tags**               | `Linked List`, `Recursion`                                                                               |
| **Related Algorithms** | [`Linked List`](../../algorithms/data-structures/linked-list.md)                                         |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                              |

---

## Original Problem

Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example 1:**

```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**

```
Input: head = [1,2]
Output: [2,1]
```

**Example 3:**

```
Input: head = []
Output: []
```

**Constraints:**

- The number of nodes in the list is in the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to reverse a singly linked list. This means the last node becomes the first, the second-to-last becomes the second, and so on. We need to update the `next` pointers of each node to point to the previous node instead of the next node.

**Vietnamese:**
Chúng ta cần đảo ngược một danh sách liên kết đơn. Điều này có nghĩa là nút cuối cùng trở thành nút thứ nhất, nút gần cuối trở thành nút thứ hai, v.v. Chúng ta cần cập nhật con trỏ `next` của mỗi nút để trỏ đến nút trước đó thay vì nút tiếp theo.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to traverse the linked list while keeping track of the previous node.
2. For each node, we need to change its `next` pointer to point to the previous node.
3. We need to be careful to not lose the reference to the next node before updating the current node's `next` pointer.
4. We can solve this iteratively or recursively.

**Vietnamese:**

1. Chúng ta cần duyệt qua danh sách liên kết trong khi theo dõi nút trước đó.
2. Với mỗi nút, chúng ta cần thay đổi con trỏ `next` của nó để trỏ đến nút trước đó.
3. Chúng ta cần cẩn thận để không mất tham chiếu đến nút tiếp theo trước khi cập nhật con trỏ `next` của nút hiện tại.
4. Chúng ta có thể giải quyết bài toán này bằng cách lặp hoặc đệ quy.

### Examples / Ví dụ

**Example 1:**

```
Input: 1 -> 2 -> 3 -> 4 -> 5

Process:
- prev = null, curr = 1: 1.next = null, prev = 1, curr = 2
- prev = 1, curr = 2: 2.next = 1, prev = 2, curr = 3
- prev = 2, curr = 3: 3.next = 2, prev = 3, curr = 4
- prev = 3, curr = 4: 4.next = 3, prev = 4, curr = 5
- prev = 4, curr = 5: 5.next = 4, prev = 5, curr = null

Output: 5 -> 4 -> 3 -> 2 -> 1
```

**Example 2:**

```
Input: 1 -> 2

Process:
- prev = null, curr = 1: 1.next = null, prev = 1, curr = 2
- prev = 1, curr = 2: 2.next = 1, prev = 2, curr = null

Output: 2 -> 1
```

**Example 3:**

```
Input: null (empty list)

Output: null (empty list)
```

---

## Solutions

### Solution 1: Iterative with Three Pointers / Lặp với ba con trỏ

#### Idea / Ý tưởng

**English:**
We use three pointers to reverse the list iteratively:

- `prev`: points to the previous node
- `curr`: points to the current node
- `next`: points to the next node (saved before updating curr.next)

For each node, we update its `next` pointer to point to `prev`, then move all pointers forward.

**Vietnamese:**
Chúng ta sử dụng ba con trỏ để đảo ngược danh sách theo cách lặp:

- `prev`: trỏ đến nút trước đó
- `curr`: trỏ đến nút hiện tại
- `next`: trỏ đến nút tiếp theo (được lưu trước khi cập nhật curr.next)

Với mỗi nút, chúng ta cập nhật con trỏ `next` của nó để trỏ đến `prev`, sau đó di chuyển tất cả các con trỏ lên trước.

#### Algorithm / Thuật toán

```
1. Initialize prev = null, curr = head
2. While curr is not null:
   a. Save next node: next = curr.next
   b. Reverse link: curr.next = prev
   c. Move prev forward: prev = curr
   d. Move curr forward: curr = next
3. Return prev (new head)
```

#### Code / Mã

```javascript
/**
 * Definition for singly-linked list / Định nghĩa cho danh sách liên kết đơn
 *
 * @class ListNode
 * @param {number} val - Value of the node / Giá trị của nút
 * @param {ListNode} next - Next node / Nút tiếp theo
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Reverse a singly linked list using iterative approach with three pointers
 * Đảo ngược một danh sách liên kết đơn bằng cách tiếp cận lặp với ba con trỏ
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @returns {ListNode} - New head of the reversed list / Đầu mới của danh sách đã đảo ngược
 * @timecomplexity O(n) - Single pass through the list / Một lần duyệt qua danh sách
 * @spacecomplexity O(1) - Only using three pointers / Chỉ sử dụng ba con trỏ
 */
function reverseList(head) {
  // Initialize pointers / Khởi tạo con trỏ
  let prev = null;
  let curr = head;

  while (curr !== null) {
    // Save next node before we change curr.next
    // Lưu nút tiếp theo trước khi chúng ta thay đổi curr.next
    const next = curr.next;

    // Reverse the link / Đảo ngược liên kết
    curr.next = prev;

    // Move pointers forward / Di chuyển các con trỏ lên trước
    prev = curr;
    curr = next;
  }

  // prev is now the new head / prev hiện tại là đầu mới
  return prev;
}

// Helper function to create linked list from array / Hàm trợ giúp để tạo danh sách liên kết từ mảng
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert linked list to array / Hàm trợ giúp để chuyển đổi danh sách liên kết thành mảng
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test cases / Các trường hợp kiểm tra
console.log(linkedListToArray(reverseList(createLinkedList([1, 2, 3, 4, 5])))); // Output: [5, 4, 3, 2, 1]
console.log(linkedListToArray(reverseList(createLinkedList([1, 2])))); // Output: [2, 1]
console.log(linkedListToArray(reverseList(createLinkedList([])))); // Output: []
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We traverse the list once
- **Space Complexity:** O(1) - Only using three pointers

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta duyệt qua danh sách một lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng ba con trỏ

#### Pros / Ưu điểm

- Simple and straightforward
- No recursion, so no stack overflow risk
- O(1) space complexity

#### Cons / Nhược điểm

- Requires careful pointer management
- Need to save next pointer before updating

---

### Solution 2: Recursive / Đệ quy

#### Idea / Ý tưởng

**English:**
We can reverse the list recursively. The base case is when head is null or head.next is null (single node). Otherwise, we recursively reverse the rest of the list and then attach the current head to the end of the reversed list.

**Vietnamese:**
Chúng ta có thể đảo ngược danh sách bằng đệ quy. Trường hợp cơ bản là khi head là null hoặc head.next là null (nút đơn). Nếu không, chúng ta đảo ngược đệ quy phần còn lại của danh sách và sau đó gắn head hiện tại vào cuối danh sách đã đảo ngược.

#### Algorithm / Thuật toán

```
1. Base case: if head is null or head.next is null, return head
2. Recursively reverse the rest of the list: newHead = reverseList(head.next)
3. Set head.next.next = head (to attach head to the end)
4. Set head.next = null (to break the original link)
5. Return newHead
```

#### Code / Mã

```javascript
/**
 * Definition for singly-linked list / Định nghĩa cho danh sách liên kết đơn
 *
 * @class ListNode
 * @param {number} val - Value of the node / Giá trị của nút
 * @param {ListNode} next - Next node / Nút tiếp theo
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Reverse a singly linked list using recursion
 * Đảo ngược một danh sách liên kết đơn bằng đệ quy
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @returns {ListNode} - New head of the reversed list / Đầu mới của danh sách đã đảo ngược
 * @timecomplexity O(n) - Visit each node once / Truy cập mỗi nút một lần
 * @spacecomplexity O(n) - For the recursion stack / Cho ngăn xếp đệ quy
 */
function reverseListRecursive(head) {
  // Base case: empty list or single node
  // Trường hợp cơ bản: danh sách rỗng hoặc nút đơn
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest of the list
  // Đảo ngược đệ quy phần còn lại của danh sách
  const newHead = reverseListRecursive(head.next);

  // Attach current head to the end of the reversed list
  // Gắn head hiện tại vào cuối danh sách đã đảo ngược
  head.next.next = head;

  // Break the original link / Phá liên kết gốc
  head.next = null;

  return newHead;
}

// Helper function to create linked list from array / Hàm trợ giúp để tạo danh sách liên kết từ mảng
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert linked list to array / Hàm trợ giúp để chuyển đổi danh sách liên kết thành mảng
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test cases / Các trường hợp kiểm tra
console.log(
  linkedListToArray(reverseListRecursive(createLinkedList([1, 2, 3, 4, 5]))),
); // Output: [5, 4, 3, 2, 1]
console.log(linkedListToArray(reverseListRecursive(createLinkedList([1, 2])))); // Output: [2, 1]
console.log(linkedListToArray(reverseListRecursive(createLinkedList([])))); // Output: []
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We visit each node once
- **Space Complexity:** O(n) - For the recursion stack in the worst case

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta truy cập mỗi nút một lần
- **Độ phức tạp không gian:** O(n) - Cho ngăn xếp đệ quy trong trường hợp xấu nhất

#### Pros / Ưu điểm

- Clean and elegant code
- Natural recursive structure
- Easy to understand

#### Cons / Nhược điểm

- Uses O(n) space for recursion stack
- Risk of stack overflow for very long lists
- Slightly less efficient than iterative approach

---

### Solution 3: Iterative with Dummy Node / Lặp với nút giả

#### Idea / Ý tưởng

**English:**
We can use a dummy node to simplify the reversal process. We insert each node at the beginning of a new list that starts with the dummy node. This approach is similar to building a new list by prepending each node.

**Vietnamese:**
Chúng ta có thể sử dụng một nút giả để đơn giản hóa quá trình đảo ngược. Chúng ta chèn mỗi nút vào đầu của một danh sách mới bắt đầu với nút giả. Cách tiếp cận này tương tự như xây dựng một danh sách mới bằng cách thêm vào trước mỗi nút.

#### Algorithm / Thuật toán

```
1. Create a dummy node with dummy.next = null
2. Initialize curr = head
3. While curr is not null:
   a. Save next node: next = curr.next
   b. Insert curr at the beginning: curr.next = dummy.next, dummy.next = curr
   c. Move curr forward: curr = next
4. Return dummy.next
```

#### Code / Mã

```javascript
/**
 * Definition for singly-linked list / Định nghĩa cho danh sách liên kết đơn
 *
 * @class ListNode
 * @param {number} val - Value of the node / Giá trị của nút
 * @param {ListNode} next - Next node / Nút tiếp theo
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Reverse a singly linked list using iterative approach with dummy node
 * Đảo ngược một danh sách liên kết đơn bằng cách tiếp cận lặp với nút giả
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @returns {ListNode} - New head of the reversed list / Đầu mới của danh sách đã đảo ngược
 * @timecomplexity O(n) - Single pass through the list / Một lần duyệt qua danh sách
 * @spacecomplexity O(1) - Only using a few pointers / Chỉ sử dụng một vài con trỏ
 */
function reverseListDummy(head) {
  // Create a dummy node / Tạo một nút giả
  const dummy = new ListNode(0, null);

  let curr = head;

  while (curr !== null) {
    // Save next node before we change curr.next
    // Lưu nút tiếp theo trước khi chúng ta thay đổi curr.next
    const next = curr.next;

    // Insert curr at the beginning of the reversed list
    // Chèn curr vào đầu của danh sách đã đảo ngược
    curr.next = dummy.next;
    dummy.next = curr;

    // Move curr forward / Di chuyển curr lên trước
    curr = next;
  }

  // dummy.next is the new head / dummy.next là đầu mới
  return dummy.next;
}

// Helper function to create linked list from array / Hàm trợ giúp để tạo danh sách liên kết từ mảng
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert linked list to array / Hàm trợ giúp để chuyển đổi danh sách liên kết thành mảng
function linkedListToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test cases / Các trường hợp kiểm tra
console.log(
  linkedListToArray(reverseListDummy(createLinkedList([1, 2, 3, 4, 5]))),
); // Output: [5, 4, 3, 2, 1]
console.log(linkedListToArray(reverseListDummy(createLinkedList([1, 2])))); // Output: [2, 1]
console.log(linkedListToArray(reverseListDummy(createLinkedList([])))); // Output: []
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We traverse the list once
- **Space Complexity:** O(1) - Only using a few pointers

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta duyệt qua danh sách một lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng một vài con trỏ

#### Pros / Ưu điểm

- No need to manage prev pointer
- Clean logic
- O(1) space complexity

#### Cons / Nhược điểm

- Requires extra dummy node
- Slightly less intuitive than three-pointer approach

---

## Solution Comparison / So sánh giải pháp

| Solution                      | Time | Space | Simplicity | Efficiency |
| ----------------------------- | ---- | ----- | ---------- | ---------- |
| Iterative with Three Pointers | O(n) | O(1)  | High       | Very High  |
| Recursive                     | O(n) | O(n)  | High       | Medium     |
| Iterative with Dummy Node     | O(n) | O(1)  | Medium     | High       |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let head1 = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(reverseList(head1))); // Expected: [5, 4, 3, 2, 1]
console.log(
  linkedListToArray(reverseListRecursive(createLinkedList([1, 2, 3, 4, 5]))),
); // Expected: [5, 4, 3, 2, 1]
console.log(
  linkedListToArray(reverseListDummy(createLinkedList([1, 2, 3, 4, 5]))),
); // Expected: [5, 4, 3, 2, 1]

// Test case 2: Example 2
let head2 = createLinkedList([1, 2]);
console.log(linkedListToArray(reverseList(head2))); // Expected: [2, 1]
console.log(linkedListToArray(reverseListRecursive(createLinkedList([1, 2])))); // Expected: [2, 1]
console.log(linkedListToArray(reverseListDummy(createLinkedList([1, 2])))); // Expected: [2, 1]

// Test case 3: Example 3 - Empty list
let head3 = createLinkedList([]);
console.log(linkedListToArray(reverseList(head3))); // Expected: []
console.log(linkedListToArray(reverseListRecursive(createLinkedList([])))); // Expected: []
console.log(linkedListToArray(reverseListDummy(createLinkedList([])))); // Expected: []

// Test case 4: Single node
let head4 = createLinkedList([1]);
console.log(linkedListToArray(reverseList(head4))); // Expected: [1]
console.log(linkedListToArray(reverseListRecursive(createLinkedList([1])))); // Expected: [1]
console.log(linkedListToArray(reverseListDummy(createLinkedList([1])))); // Expected: [1]

// Test case 5: Two nodes
let head5 = createLinkedList([1, 2]);
console.log(linkedListToArray(reverseList(head5))); // Expected: [2, 1]
console.log(linkedListToArray(reverseListRecursive(createLinkedList([1, 2])))); // Expected: [2, 1]
console.log(linkedListToArray(reverseListDummy(createLinkedList([1, 2])))); // Expected: [2, 1]

// Test case 6: Large list
let head6 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(linkedListToArray(reverseList(head6))); // Expected: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(
  linkedListToArray(
    reverseListRecursive(createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
  ),
); // Expected: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(
  linkedListToArray(
    reverseListDummy(createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
  ),
); // Expected: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---

## Algorithm Links / Liên kết thuật toán

- [`Linked List`](../../algorithms/data-structures/linked-list.md) - Core data structure used in this problem
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Related pattern for traversing linked lists

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Three-pointer approach**: This is the most common and recommended approach. Use `prev`, `curr`, and `next` pointers to reverse the list in place.

2. **Save next pointer**: Always save the next pointer before updating `curr.next`. Otherwise, you'll lose the reference to the rest of the list.

3. **Recursive approach**: The recursive solution is elegant but uses O(n) space for the recursion stack. Use it for cleaner code when space is not a concern.

4. **Handle edge cases**: Make sure to handle empty lists and single-node lists correctly.

### Common Pitfalls / Lỗi thường gặp

1. **Not saving next pointer**: Forgetting to save `curr.next` before updating it will cause you to lose the reference to the rest of the list.

2. **Incorrect pointer updates**: Updating pointers in the wrong order can lead to incorrect results or infinite loops.

3. **Not handling null head**: Forgetting to handle the case where head is null can cause errors.

4. **Creating cycles**: Incorrect pointer updates can create cycles in the list.

5. **Memory leaks**: In languages with manual memory management, make sure to properly manage memory.

6. **Recursive stack overflow**: For very long lists, the recursive solution might cause a stack overflow. Use the iterative solution in such cases.

7. **Returning wrong value**: In the iterative solution, remember to return `prev` (the new head), not `head` (the old head).

8. **Not updating head.next in recursion**: In the recursive solution, remember to set `head.next = null` after attaching it to the reversed list to avoid cycles.
