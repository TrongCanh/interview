# 203. Remove Linked List Elements

## Problem Information

| Property               | Value                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Problem ID**         | 203                                                                                                                      |
| **URL**                | [https://leetcode.com/problems/remove-linked-list-elements/](https://leetcode.com/problems/remove-linked-list-elements/) |
| **Difficulty**         | Easy                                                                                                                     |
| **Category**           | Linked List                                                                                                              |
| **Tags**               | `Linked List`, `Recursion`                                                                                               |
| **Related Algorithms** | [`Linked List`](../../algorithms/data-structures/linked-list.md)                                                         |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                                              |

---

## Original Problem

Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.

**Example 1:**

```
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
```

**Example 2:**

```
Input: head = [], val = 1
Output: []
```

**Example 3:**

```
Input: head = [7,7,7,7], val = 7
Output: []
```

**Constraints:**

- The number of nodes in the list is in the range `[0, 10^4]`.
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to remove all nodes from a linked list that have a specific value. The challenge is to handle edge cases like removing the head node or removing consecutive nodes with the target value.

**Vietnamese:**
Chúng ta cần xóa tất cả các nút từ danh sách liên kết có một giá trị cụ thể. Thách thức là xử lý các trường hợp đặc biệt như xóa nút đầu tiên hoặc xóa các nút liên tiếp có giá trị mục tiêu.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to traverse the linked list and check each node's value.
2. If a node's value matches the target, we need to remove it by updating the previous node's next pointer.
3. Special care is needed when removing the head node.
4. We can use a dummy node to simplify handling the head removal case.

**Vietnamese:**

1. Chúng ta cần duyệt qua danh sách liên kết và kiểm tra giá trị của mỗi nút.
2. Nếu giá trị của một nút khớp với mục tiêu, chúng ta cần xóa nó bằng cách cập nhật con trỏ next của nút trước đó.
3. Chú ý đặc biệt khi xóa nút đầu tiên.
4. Chúng ta có thể sử dụng một nút giả để đơn giản hóa việc xử lý trường hợp xóa nút đầu tiên.

### Examples / Ví dụ

**Example 1:**

```
Input: 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6, val = 6
Process:
- Node 1: Keep (1 != 6)
- Node 2: Keep (2 != 6)
- Node 6: Remove (6 == 6), link 2 -> 3
- Node 3: Keep (3 != 6)
- Node 4: Keep (4 != 6)
- Node 5: Keep (5 != 6)
- Node 6: Remove (6 == 6), link 5 -> null

Output: 1 -> 2 -> 3 -> 4 -> 5
```

**Example 2:**

```
Input: [], val = 1
Output: [] (empty list)
```

**Example 3:**

```
Input: 7 -> 7 -> 7 -> 7, val = 7
Process:
- All nodes have value 7, so all are removed

Output: [] (empty list)
```

---

## Solutions

### Solution 1: Iterative with Dummy Node / Lặp với nút giả

#### Idea / Ý tưởng

**English:**
We use a dummy node that points to the head of the list. This allows us to handle the case where the head needs to be removed. We then iterate through the list, removing nodes with the target value.

**Vietnamese:**
Chúng ta sử dụng một nút giả trỏ đến đầu danh sách. Điều này cho phép chúng ta xử lý trường hợp nút đầu tiên cần bị xóa. Sau đó chúng ta lặp qua danh sách, xóa các nút có giá trị mục tiêu.

#### Algorithm / Thuật toán

```
1. Create a dummy node pointing to head
2. Initialize prev = dummy, curr = head
3. While curr is not null:
   a. If curr.val == val, remove curr by setting prev.next = curr.next
   b. Otherwise, move prev to curr
   c. Move curr to curr.next
4. Return dummy.next (the new head)
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
 * Remove all elements from a linked list with a specific value using dummy node
 * Xóa tất cả các phần tử từ danh sách liên kết có giá trị cụ thể bằng nút giả
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @param {number} val - Value to remove / Giá trị cần xóa
 * @returns {ListNode} - New head of the linked list / Đầu mới của danh sách liên kết
 * @timecomplexity O(n) - Single pass through the list / Một lần duyệt qua danh sách
 * @spacecomplexity O(1) - Only using a few pointers / Chỉ sử dụng một vài con trỏ
 */
function removeElements(head, val) {
  // Create a dummy node to handle the case where head needs to be removed
  // Tạo một nút giả để xử lý trường hợp nút đầu tiên cần bị xóa
  const dummy = new ListNode(0, head);

  let prev = dummy;
  let curr = head;

  while (curr !== null) {
    if (curr.val === val) {
      // Remove current node by skipping it / Xóa nút hiện tại bằng cách bỏ qua nó
      prev.next = curr.next;
    } else {
      // Move prev pointer only when we don't remove a node
      // Chỉ di chuyển con trỏ prev khi chúng ta không xóa một nút
      prev = curr;
    }
    // Always move curr pointer / Luôn di chuyển con trỏ curr
    curr = curr.next;
  }

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
  linkedListToArray(removeElements(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6)),
); // Output: [1, 2, 3, 4, 5]
console.log(linkedListToArray(removeElements(createLinkedList([]), 1))); // Output: []
console.log(
  linkedListToArray(removeElements(createLinkedList([7, 7, 7, 7]), 7)),
); // Output: []
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We traverse the list once
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta duyệt qua danh sách một lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- Simple and straightforward
- Handles all edge cases including removing the head
- No recursion, so no stack overflow risk

#### Cons / Nhược điểm

- Requires extra dummy node
- Slightly more memory due to dummy node

---

### Solution 2: Recursive / Đệ quy

#### Idea / Ý tưởng

**English:**
We can solve this problem recursively. For each node, if its value matches the target, we return the result of removing elements from the next node. Otherwise, we keep the current node and recursively process the rest of the list.

**Vietnamese:**
Chúng ta có thể giải quyết bài toán này bằng đệ quy. Với mỗi nút, nếu giá trị của nó khớp với mục tiêu, chúng ta trả về kết quả của việc xóa các phần tử từ nút tiếp theo. Nếu không, chúng ta giữ nút hiện tại và xử lý đệ quy phần còn lại của danh sách.

#### Algorithm / Thuật toán

```
1. Base case: if head is null, return null
2. Recursive case:
   a. If head.val == val, return removeElements(head.next, val)
   b. Otherwise, set head.next = removeElements(head.next, val) and return head
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
 * Remove all elements from a linked list with a specific value using recursion
 * Xóa tất cả các phần tử từ danh sách liên kết có giá trị cụ thể bằng đệ quy
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @param {number} val - Value to remove / Giá trị cần xóa
 * @returns {ListNode} - New head of the linked list / Đầu mới của danh sách liên kết
 * @timecomplexity O(n) - Visit each node once / Truy cập mỗi nút một lần
 * @spacecomplexity O(n) - For the recursion stack / Cho ngăn xếp đệ quy
 */
function removeElementsRecursive(head, val) {
  // Base case: empty list / Trường hợp cơ bản: danh sách rỗng
  if (head === null) {
    return null;
  }

  // Recursive case / Trường hợp đệ quy
  if (head.val === val) {
    // Skip current node and process the rest / Bỏ qua nút hiện tại và xử lý phần còn lại
    return removeElementsRecursive(head.next, val);
  } else {
    // Keep current node and recursively process the rest
    // Giữ nút hiện tại và xử lý đệ quy phần còn lại
    head.next = removeElementsRecursive(head.next, val);
    return head;
  }
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
  linkedListToArray(
    removeElementsRecursive(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6),
  ),
); // Output: [1, 2, 3, 4, 5]
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([]), 1)),
); // Output: []
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([7, 7, 7, 7]), 7)),
); // Output: []
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
- Naturally handles head removal
- Easy to understand

#### Cons / Nhược điểm

- Uses O(n) space for recursion stack
- Risk of stack overflow for very long lists
- Slightly less efficient than iterative approach

---

### Solution 3: Iterative without Dummy Node / Lặp không có nút giả

#### Idea / Ý tưởng

**English:**
We can solve this without a dummy node by first handling the case where the head needs to be removed, then iterating through the rest of the list.

**Vietnamese:**
Chúng ta có thể giải quyết bài toán này mà không cần nút giả bằng cách đầu tiên xử lý trường hợp nút đầu tiên cần bị xóa, sau đó lặp qua phần còn lại của danh sách.

#### Algorithm / Thuật toán

```
1. Remove all leading nodes with value val
2. If list is empty, return null
3. Iterate through the rest of the list:
   a. If curr.next.val == val, remove curr.next
   b. Otherwise, move curr to curr.next
4. Return head
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
 * Remove all elements from a linked list with a specific value without dummy node
 * Xóa tất cả các phần tử từ danh sách liên kết có giá trị cụ thể mà không có nút giả
 *
 * @param {ListNode} head - Head of the linked list / Đầu của danh sách liên kết
 * @param {number} val - Value to remove / Giá trị cần xóa
 * @returns {ListNode} - New head of the linked list / Đầu mới của danh sách liên kết
 * @timecomplexity O(n) - Single pass through the list / Một lần duyệt qua danh sách
 * @spacecomplexity O(1) - Only using a few pointers / Chỉ sử dụng một vài con trỏ
 */
function removeElementsNoDummy(head, val) {
  // Remove all leading nodes with value val
  // Xóa tất cả các nút đầu tiên có giá trị val
  while (head !== null && head.val === val) {
    head = head.next;
  }

  // If list is empty, return null / Nếu danh sách rỗng, trả về null
  if (head === null) {
    return null;
  }

  // Iterate through the rest of the list / Lặp qua phần còn lại của danh sách
  let curr = head;
  while (curr.next !== null) {
    if (curr.next.val === val) {
      // Remove next node / Xóa nút tiếp theo
      curr.next = curr.next.next;
    } else {
      // Move to next node / Di chuyển đến nút tiếp theo
      curr = curr.next;
    }
  }

  return head;
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
  linkedListToArray(
    removeElementsNoDummy(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6),
  ),
); // Output: [1, 2, 3, 4, 5]
console.log(linkedListToArray(removeElementsNoDummy(createLinkedList([]), 1))); // Output: []
console.log(
  linkedListToArray(removeElementsNoDummy(createLinkedList([7, 7, 7, 7]), 7)),
); // Output: []
console.log(
  linkedListToArray(
    removeElementsNoDummy(createLinkedList([6, 6, 1, 2, 3]), 6),
  ),
); // Output: [1, 2, 3]
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We traverse the list once
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta duyệt qua danh sách một lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- No extra dummy node needed
- O(1) space complexity
- Efficient

#### Cons / Nhược điểm

- Slightly more complex logic
- Need to handle head removal separately

---

## Solution Comparison / So sánh giải pháp

| Solution                  | Time | Space | Simplicity | Efficiency |
| ------------------------- | ---- | ----- | ---------- | ---------- |
| Iterative with Dummy Node | O(n) | O(1)  | High       | High       |
| Recursive                 | O(n) | O(n)  | High       | Medium     |
| Iterative without Dummy   | O(n) | O(1)  | Medium     | High       |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let head1 = createLinkedList([1, 2, 6, 3, 4, 5, 6]);
console.log(linkedListToArray(removeElements(head1, 6))); // Expected: [1, 2, 3, 4, 5]
console.log(
  linkedListToArray(
    removeElementsRecursive(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6),
  ),
); // Expected: [1, 2, 3, 4, 5]
console.log(
  linkedListToArray(
    removeElementsNoDummy(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6),
  ),
); // Expected: [1, 2, 3, 4, 5]

// Test case 2: Example 2 - Empty list
let head2 = createLinkedList([]);
console.log(linkedListToArray(removeElements(head2, 1))); // Expected: []
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([]), 1)),
); // Expected: []
console.log(linkedListToArray(removeElementsNoDummy(createLinkedList([]), 1))); // Expected: []

// Test case 3: Example 3 - All nodes to be removed
let head3 = createLinkedList([7, 7, 7, 7]);
console.log(linkedListToArray(removeElements(head3, 7))); // Expected: []
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([7, 7, 7, 7]), 7)),
); // Expected: []
console.log(
  linkedListToArray(removeElementsNoDummy(createLinkedList([7, 7, 7, 7]), 7)),
); // Expected: []

// Test case 4: Head needs to be removed
let head4 = createLinkedList([6, 6, 1, 2, 3]);
console.log(linkedListToArray(removeElements(head4, 6))); // Expected: [1, 2, 3]
console.log(
  linkedListToArray(
    removeElementsRecursive(createLinkedList([6, 6, 1, 2, 3]), 6),
  ),
); // Expected: [1, 2, 3]
console.log(
  linkedListToArray(
    removeElementsNoDummy(createLinkedList([6, 6, 1, 2, 3]), 6),
  ),
); // Expected: [1, 2, 3]

// Test case 5: No nodes to be removed
let head5 = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(removeElements(head5, 6))); // Expected: [1, 2, 3, 4, 5]
console.log(
  linkedListToArray(
    removeElementsRecursive(createLinkedList([1, 2, 3, 4, 5]), 6),
  ),
); // Expected: [1, 2, 3, 4, 5]
console.log(
  linkedListToArray(
    removeElementsNoDummy(createLinkedList([1, 2, 3, 4, 5]), 6),
  ),
); // Expected: [1, 2, 3, 4, 5]

// Test case 6: Single node to be removed
let head6 = createLinkedList([1]);
console.log(linkedListToArray(removeElements(head6, 1))); // Expected: []
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([1]), 1)),
); // Expected: []
console.log(linkedListToArray(removeElementsNoDummy(createLinkedList([1]), 1))); // Expected: []

// Test case 7: Single node not to be removed
let head7 = createLinkedList([1]);
console.log(linkedListToArray(removeElements(head7, 2))); // Expected: [1]
console.log(
  linkedListToArray(removeElementsRecursive(createLinkedList([1]), 2)),
); // Expected: [1]
console.log(linkedListToArray(removeElementsNoDummy(createLinkedList([1]), 2))); // Expected: [1]
```

---

## Algorithm Links / Liên kết thuật toán

- [`Linked List`](../../algorithms/data-structures/linked-list.md) - Core data structure used in this problem
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Related pattern for traversing linked lists

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Use a dummy node**: A dummy node simplifies handling the case where the head needs to be removed. This is the most common and recommended approach.

2. **Handle edge cases**: Make sure to handle empty lists, lists where all nodes need to be removed, and lists where only the head needs to be removed.

3. **Pointer management**: Be careful with pointer updates. When removing a node, make sure to update the previous node's next pointer correctly.

4. **Recursive approach**: The recursive solution is elegant but uses O(n) space for the recursion stack. Use it for cleaner code when space is not a concern.

### Common Pitfalls / Lỗi thường gặp

1. **Not handling head removal**: Forgetting to handle the case where the head node needs to be removed is a common mistake.

2. **Losing the reference**: When removing a node, make sure to store the next pointer before updating.

3. **Infinite loop**: Incorrect pointer updates can lead to infinite loops.

4. **Memory leaks**: In languages with manual memory management, make sure to free the memory of removed nodes.

5. **Not checking for null**: Always check if the current node or next node is null before accessing its properties.

6. **Moving prev incorrectly**: In the iterative solution with dummy node, only move the prev pointer when we don't remove a node.

7. **Recursive stack overflow**: For very long lists, the recursive solution might cause a stack overflow. Use the iterative solution in such cases.
