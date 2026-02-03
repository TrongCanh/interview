# Remove Duplicates from Sorted List / Xóa phần tử trùng trong danh sách đã sắp xếp

> LeetCode 83 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 83
- **URL:** https://leetcode.com/problems/remove-duplicates-from-sorted-list/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List
- **Tags:** Linked List
- **Thuật toán liên quan / Related Algorithms:** Linked List
- **Patterns liên quan / Related Patterns:** Fast Slow Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `head` of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list **sorted** as well.

**Example 1:**

```
Input: head = [1,1,2]
Output: [1,2]
```

**Example 2:**

```
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

**Constraints:**

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be **sorted** in ascending order.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của một singly linked list đã được sắp xếp
- **Output:** Head của linked list sau khi xóa các phần tử trùng
- **Ràng buộc / Constraints:**
  - Số node từ 0 đến 300
  - Giá trị node từ -100 đến 100
  - Linked list đã được sắp xếp tăng dần
- **Edge cases:**
  - Linked list rỗng (head = null)
  - Linked list chỉ có 1 node
  - Tất cả node đều giống nhau

### 2. Tư duy / Thinking Process

- Bước 1: Vì linked list đã được sắp xếp, các phần tử trùng sẽ nằm cạnh nhau
- Bước 2: Duyệt qua linked list
- Bước 3: Nếu node hiện tại và node tiếp theo có giá trị giống nhau, bỏ qua node tiếp theo
- Bước 4: Ngược lại, di chuyển đến node tiếp theo

### 3. Ví dụ minh họa / Examples

```
Example 1: [1,1,2]
- current = 1, next = 1 (giống nhau) -> current.next = 2
- current = 1, next = 2 (khác nhau) -> current = 2
- Kết quả: [1,2]

Example 2: [1,1,2,3,3]
- current = 1, next = 1 (giống nhau) -> current.next = 2
- current = 1, next = 2 (khác nhau) -> current = 2
- current = 2, next = 3 (khác nhau) -> current = 3
- current = 3, next = 3 (giống nhau) -> current.next = null
- Kết quả: [1,2,3]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua linked list, nếu node hiện tại và node tiếp theo có giá trị giống nhau, bỏ qua node tiếp theo bằng cách trỏ current.next đến node tiếp theo của node tiếp theo.

### Thuật toán / Algorithm

1. Nếu head là null, trả về null
2. Khởi tạo current = head
3. Trong khi current và current.next không null:
   - Nếu current.val === current.next.val, set current.next = current.next.next
   - Ngược lại, set current = current.next
4. Trả về head

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
 * Remove Duplicates from Sorted List - Giải pháp 1: Iterative (Brute Force)
 * @param {ListNode} head - Head của linked list
 * @return {ListNode} - Head của linked list sau khi xóa trùng
 *
 * Time Complexity: O(n) - duyệt qua linked list một lần
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function deleteDuplicates_bruteForce(head) {
  // Nếu linked list rỗng
  if (head === null) {
    return null;
  }

  let current = head;

  // Duyệt qua linked list
  while (current !== null && current.next !== null) {
    // Nếu node hiện tại và node tiếp theo có giá trị giống nhau
    if (current.val === current.next.val) {
      // Bỏ qua node tiếp theo
      current.next = current.next.next;
    } else {
      // Di chuyển đến node tiếp theo
      current = current.next;
    }
  }

  return head;
}

// Helper function để tạo linked list từ array
function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function để chuyển linked list thành array
function listToArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Test
console.log(listToArray(deleteDuplicates_bruteForce(createList([1, 1, 2])))); // [1,2]
console.log(
  listToArray(deleteDuplicates_bruteForce(createList([1, 1, 2, 3, 3]))),
); // [1,2,3]
console.log(listToArray(deleteDuplicates_bruteForce(createList([])))); // []
console.log(listToArray(deleteDuplicates_bruteForce(createList([1])))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua linked list một lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Tối ưu về cả time và space

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 đã tối ưu về cả time và space
- Điểm yếu của giải pháp 1? Không có
- Cách tiếp cận mới? Sử dụng Recursion để giải quyết bài toán

### Ý tưởng / Idea

Sử dụng Recursion để xóa các phần tử trùng. Base case là khi head là null hoặc head.next là null. Recursive case là xóa trùng từ head.next, sau đó so sánh head.val với head.next.val.

### Thuật toán / Algorithm

1. Nếu head là null hoặc head.next là null, trả về head
2. Gọi đệ quy deleteDuplicates(head.next)
3. Nếu head.val === head.next.val, set head.next = head.next.next
4. Trả về head

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted List - Giải pháp 2: Recursive (Optimized)
 * @param {ListNode} head - Head của linked list
 * @return {ListNode} - Head của linked list sau khi xóa trùng
 *
 * Time Complexity: O(n) - mỗi node được xử lý một lần
 * Space Complexity: O(n) - stack depth của recursion
 */
function deleteDuplicates_recursive(head) {
  // Base case: linked list rỗng hoặc chỉ có 1 node
  if (head === null || head.next === null) {
    return head;
  }

  // Gọi đệ quy để xóa trùng từ node tiếp theo
  head.next = deleteDuplicates_recursive(head.next);

  // Nếu node hiện tại và node tiếp theo có giá trị giống nhau
  if (head.val === head.next.val) {
    // Bỏ qua node tiếp theo
    return head.next;
  } else {
    return head;
  }
}

// Test
console.log(listToArray(deleteDuplicates_recursive(createList([1, 1, 2])))); // [1,2]
console.log(
  listToArray(deleteDuplicates_recursive(createList([1, 1, 2, 3, 3]))),
); // [1,2,3]
console.log(listToArray(deleteDuplicates_recursive(createList([])))); // []
console.log(listToArray(deleteDuplicates_recursive(createList([1])))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi node được xử lý một lần
- **Space Complexity:** O(n) - stack depth của recursion

### Ưu điểm / Pros

- Code ngắn gọn, đẹp
- Dễ hiểu với người quen với recursion

### Nhược điểm / Cons

- Tốn bộ nhớ cho stack
- Có thể gây stack overflow với linked list rất dài

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 1 đã tối ưu nhất
- Có thuật toán/pattern nào phù hợp hơn? Fast Slow Pointers không cần thiết vì list đã sắp xếp

### Ý tưởng / Idea

Sử dụng Two Pointers với một con trỏ duyệt và một con trỏ theo dõi node cuối cùng đã được xử lý. Tuy nhiên, vì list đã sắp xếp, giải pháp này không hiệu quả hơn giải pháp 1.

### Thuật toán / Algorithm

1. Nếu head là null, trả về null
2. Khởi tạo slow = head, fast = head.next
3. Trong khi fast không null:
   - Nếu slow.val !== fast.val:
     - slow.next = fast
     - slow = slow.next
   - fast = fast.next
4. slow.next = null
5. Trả về head

### Code / Implementation

```javascript
/**
 * Remove Duplicates from Sorted List - Giải pháp 3: Two Pointers (Advanced)
 * @param {ListNode} head - Head của linked list
 * @return {ListNode} - Head của linked list sau khi xóa trùng
 *
 * Time Complexity: O(n) - duyệt qua linked list một lần
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function deleteDuplicates_twoPointers(head) {
  // Nếu linked list rỗng hoặc chỉ có 1 node
  if (head === null || head.next === null) {
    return head;
  }

  let slow = head;
  let fast = head.next;

  while (fast !== null) {
    // Nếu giá trị khác nhau, di chuyển slow
    if (slow.val !== fast.val) {
      slow.next = fast;
      slow = slow.next;
    }
    fast = fast.next;
  }

  // Cắt bỏ phần còn lại của linked list
  slow.next = null;

  return head;
}

// Test
console.log(listToArray(deleteDuplicates_twoPointers(createList([1, 1, 2])))); // [1,2]
console.log(
  listToArray(deleteDuplicates_twoPointers(createList([1, 1, 2, 3, 3]))),
); // [1,2,3]
console.log(listToArray(deleteDuplicates_twoPointers(createList([])))); // []
console.log(listToArray(deleteDuplicates_twoPointers(createList([1])))); // [1]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua linked list một lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Tối ưu về cả time và space
- Dễ hiểu với pattern Two Pointers

### Nhược điểm / Cons

- Code dài hơn một chút so với giải pháp 1

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use  |
| -------------------- | ---- | ----- | ------------------- | --------------------------- |
| Iterative            | O(n) | O(1)  | Dễ / Easy           | Mọi trường hợp, tối ưu nhất |
| Recursive            | O(n) | O(n)  | Trung bình / Medium | Thích recursion, list ngắn  |
| Two Pointers         | O(n) | O(1)  | Trung bình / Medium | Học Two Pointers pattern    |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = [1, 1, 2];
const expected1 = [1, 2];
console.log(`Input: ${JSON.stringify(input1)}`);
console.log(`Expected: ${JSON.stringify(expected1)}`);
console.log(
  `Iterative: ${JSON.stringify(listToArray(deleteDuplicates_bruteForce(createList(input1))))}`,
);
console.log(
  `Recursive: ${JSON.stringify(listToArray(deleteDuplicates_recursive(createList(input1))))}`,
);
console.log(
  `Two Pointers: ${JSON.stringify(listToArray(deleteDuplicates_twoPointers(createList(input1))))}`,
);
```

### Test Case 2: Nhiều trùng / Multiple Duplicates

```javascript
const input2 = [1, 1, 2, 3, 3];
const expected2 = [1, 2, 3];
console.log(`Input: ${JSON.stringify(input2)}`);
console.log(`Expected: ${JSON.stringify(expected2)}`);
console.log(
  `Iterative: ${JSON.stringify(listToArray(deleteDuplicates_bruteForce(createList(input2))))}`,
);
console.log(
  `Recursive: ${JSON.stringify(listToArray(deleteDuplicates_recursive(createList(input2))))}`,
);
console.log(
  `Two Pointers: ${JSON.stringify(listToArray(deleteDuplicates_twoPointers(createList(input2))))}`,
);
```

### Test Case 3: Linked list rỗng / Empty List

```javascript
const input3 = [];
const expected3 = [];
console.log(`Input: ${JSON.stringify(input3)}`);
console.log(`Expected: ${JSON.stringify(expected3)}`);
console.log(
  `Iterative: ${JSON.stringify(listToArray(deleteDuplicates_bruteForce(createList(input3))))}`,
);
console.log(
  `Recursive: ${JSON.stringify(listToArray(deleteDuplicates_recursive(createList(input3))))}`,
);
console.log(
  `Two Pointers: ${JSON.stringify(listToArray(deleteDuplicates_twoPointers(createList(input3))))}`,
);
```

### Test Case 4: Chỉ một node / Single Node

```javascript
const input4 = [1];
const expected4 = [1];
console.log(`Input: ${JSON.stringify(input4)}`);
console.log(`Expected: ${JSON.stringify(expected4)}`);
console.log(
  `Iterative: ${JSON.stringify(listToArray(deleteDuplicates_bruteForce(createList(input4))))}`,
);
console.log(
  `Recursive: ${JSON.stringify(listToArray(deleteDuplicates_recursive(createList(input4))))}`,
);
console.log(
  `Two Pointers: ${JSON.stringify(listToArray(deleteDuplicates_twoPointers(createList(input4))))}`,
);
```

### Test Case 5: Tất cả giống nhau / All Same

```javascript
const input5 = [1, 1, 1, 1];
const expected5 = [1];
console.log(`Input: ${JSON.stringify(input5)}`);
console.log(`Expected: ${JSON.stringify(expected5)}`);
console.log(
  `Iterative: ${JSON.stringify(listToArray(deleteDuplicates_bruteForce(createList(input5))))}`,
);
console.log(
  `Recursive: ${JSON.stringify(listToArray(deleteDuplicates_recursive(createList(input5))))}`,
);
console.log(
  `Two Pointers: ${JSON.stringify(listToArray(deleteDuplicates_twoPointers(createList(input5))))}`,
);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Linked List:** [`../../algorithms/data-structures/linked-list.md`](../../algorithms/data-structures/linked-list.md)
- **Fast Slow Pointers:** [`../../algorithms/patterns/fast-slow-pointers.md`](../../algorithms/patterns/fast-slow-pointers.md)

---

## 💡 Tips & Tricks

1. **Sorted List:** Khi linked list đã được sắp xếp, các phần tử trùng sẽ nằm cạnh nhau, giúp việc xóa trùng dễ dàng hơn
2. **Modify in Place:** Có thể xóa node bằng cách thay đổi con trỏ next thay vì tạo node mới
3. **Edge Cases:** Luôn kiểm tra linked list rỗng hoặc chỉ có 1 node
4. **Recursion vs Iterative:** Recursion code ngắn hơn nhưng tốn bộ nhớ cho stack

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 83 - Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)
- [Linked List - Wikipedia](https://en.wikipedia.org/wiki/Linked_list)

---

_Last updated: 2025-02-03_
