# Remove Nth Node From End of List / Xóa nút thứ n từ cuối

> LeetCode Problem 19 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 19
- **URL:** https://leetcode.com/problems/remove-nth-node-from-end-of-list/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Linked List
- **Tags:** Linked List, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Two Pointers
- **Patterns liên quan / Related Patterns:** Fast Slow Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Example 1:**

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

**Example 2:**

```
Input: head = [1], n = 1
Output: []
```

**Example 3:**

```
Input: head = [1,2], n = 1
Output: [1]
```

**Constraints:**

- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

**Follow up:** Could you do this in one pass?

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của Linked List và số nguyên n
- **Output:** Head của Linked List sau khi xóa nút thứ n từ cuối
- **Ràng buộc / Constraints:**
  - Số lượng nút: 1 đến 30
  - Giá trị nút: 0 đến 100
  - n từ 1 đến số lượng nút
- **Edge cases:**
  - Linked List chỉ có 1 nút
  - Xóa nút đầu tiên (n = độ dài list)
  - Xóa nút cuối cùng (n = 1)
  - Linked List có nhiều nút giống nhau

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - xóa nút thứ n từ cuối của Linked List
- Bước 2: Nhận thấy cần duyệt Linked List để tìm vị trí cần xóa
- Bước 3: Có thể dùng Two Pointers (Fast-Slow) để giải trong 1 pass

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Explanation: Nút thứ 2 từ cuối là 4, xóa nó đi
- Linked List: 1 -> 2 -> 3 -> 4 -> 5
- Từ cuối: 5(1), 4(2), 3(3), 2(4), 1(5)
- Xóa nút 4: 1 -> 2 -> 3 -> 5

Example 2:
Input: head = [1], n = 1
Output: []
Explanation: Chỉ có 1 nút, xóa nó đi thì Linked List rỗng
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Đếm tổng số nút trong Linked List, sau đó duyệt đến vị trí cần xóa và xóa nó.

### Thuật toán / Algorithm

1. Đếm tổng số nút trong Linked List
2. Tính vị trí cần xóa từ đầu: position = count - n
3. Dùng dummy node để dễ xử lý trường hợp xóa head
4. Duyệt đến nút trước nút cần xóa
5. Xóa nút cần xóa bằng cách thay đổi next pointer
6. Trả về dummy.next

### Code / Implementation

```javascript
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * Remove Nth Node From End of List - Brute Force Solution
 * @param {ListNode} head - Head của Linked List
 * @param {number} n - Vị trí từ cuối cần xóa
 * @return {ListNode} - Head của Linked List sau khi xóa
 */
function removeNthFromEnd_bruteForce(head, n) {
  // Đếm tổng số nút
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }

  // Vị trí cần xóa từ đầu
  const position = count - n;

  // Dùng dummy node để dễ xử lý trường hợp xóa head
  const dummy = new ListNode(0);
  dummy.next = head;
  current = dummy;

  // Duyệt đến nút trước nút cần xóa
  for (let i = 0; i < position; i++) {
    current = current.next;
  }

  // Xóa nút cần xóa
  current.next = current.next.next;

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 2 pass qua Linked List
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Dễ hiểu và implement
- Xử lý được tất cả các trường hợp

### Nhược điểm / Cons

- Cần 2 pass qua Linked List
- Không tối ưu cho Follow-up (1 pass)

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Follow-up yêu cầu làm trong 1 pass
- Điểm yếu của giải pháp 1? Cần đếm trước rồi mới tìm vị trí
- Cách tiếp cận mới? Dùng Fast-Slow Pointers để tìm vị trí trong 1 pass

### Ý tưởng / Idea

Sử dụng Fast-Slow Pointers: Di chuyển con trỏ fast n bước trước, sau đó di chuyển cả hai con trỏ cùng lúc cho đến khi fast đến cuối. Khi đó, slow sẽ ở vị trí trước nút cần xóa.

### Thuật toán / Algorithm

1. Tạo dummy node và đặt slow, fast đều trỏ vào dummy
2. Di chuyển fast n bước trước
3. Di chuyển cả slow và fast cho đến khi fast.next là null
4. Khi đó, slow.next là nút cần xóa
5. Xóa nút cần xóa: slow.next = slow.next.next
6. Trả về dummy.next

### Code / Implementation

```javascript
/**
 * Remove Nth Node From End of List - Optimized Solution (One Pass)
 * @param {ListNode} head - Head của Linked List
 * @param {number} n - Vị trí từ cuối cần xóa
 * @return {ListNode} - Head của Linked List sau khi xóa
 */
function removeNthFromEnd_optimized(head, n) {
  // Tạo dummy node để dễ xử lý trường hợp xóa head
  const dummy = new ListNode(0);
  dummy.next = head;

  let slow = dummy;
  let fast = dummy;

  // Di chuyển fast n bước trước
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Di chuyển cả slow và fast cho đến khi fast là null
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // Xóa nút cần xóa
  slow.next = slow.next.next;

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 1 pass qua Linked List
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Chỉ cần 1 pass qua Linked List
- Đáp ứng yêu cầu Follow-up
- Code ngắn gọn

### Nhược điểm / Cons

- Cần dummy node
- Phải cẩn thận với điều kiện dừng vòng lặp

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng recursion
- Có thuật toán/pattern nào phù hợp hơn? Recursion pattern

### Ý tưởng / Idea

Sử dụng recursion để duyệt đến cuối Linked List, sau đó đếm ngược về. Khi đếm đến n, xóa nút đó và trả về.

### Thuật toán / Algorithm

1. Gọi đệ quy với nút tiếp theo
2. Sau khi đệ quy trả về, tăng counter
3. Khi counter == n, xóa nút hiện tại
4. Trả về nút tiếp theo (để xóa nút hiện tại)

### Code / Implementation

```javascript
/**
 * Remove Nth Node From End of List - Advanced Solution (Recursion)
 * @param {ListNode} head - Head của Linked List
 * @param {number} n - Vị trí từ cuối cần xóa
 * @return {ListNode} - Head của Linked List sau khi xóa
 */
function removeNthFromEnd_advanced(head, n) {
  let counter = 0;

  function removeHelper(node) {
    if (!node) {
      return null;
    }

    const nextNode = removeHelper(node.next);
    counter++;

    if (counter === n) {
      return nextNode; // Bỏ qua nút hiện tại
    }

    node.next = nextNode;
    return node;
  }

  return removeHelper(head);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - 1 pass qua Linked List
- **Space Complexity:** O(n) - call stack cho recursion

### Ưu điểm / Pros

- Code ngắn gọn và dễ đọc
- Tự nhiên đếm ngược từ cuối

### Nhược điểm / Cons

- Tốn bộ nhớ cho call stack
- Có thể gây stack overflow cho Linked List rất dài

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n) | O(1)  | Dễ / Easy           | Linked List nhỏ            |
| Optimized            | O(n) | O(1)  | Trung bình / Medium | Tất cả trường hợp          |
| Advanced             | O(n) | O(n)  | Khó / Hard          | Linked List nhỏ, code gọn  |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Helper function to create linked list from array
function createList(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert linked list to array
function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

const head1 = createList([1, 2, 3, 4, 5]);
const n1 = 2;
console.log(listToArray(removeNthFromEnd_bruteForce(head1, n1))); // Expected: [1,2,3,5]
console.log(
  listToArray(removeNthFromEnd_optimized(createList([1, 2, 3, 4, 5]), n1)),
); // Expected: [1,2,3,5]
console.log(
  listToArray(removeNthFromEnd_advanced(createList([1, 2, 3, 4, 5]), n1)),
); // Expected: [1,2,3,5]
```

### Test Case 2: Edge case - Chỉ 1 nút

```javascript
const head2 = createList([1]);
const n2 = 1;
console.log(listToArray(removeNthFromEnd_bruteForce(head2, n2))); // Expected: []
console.log(listToArray(removeNthFromEnd_optimized(createList([1]), n2))); // Expected: []
console.log(listToArray(removeNthFromEnd_advanced(createList([1]), n2))); // Expected: []
```

### Test Case 3: Edge case - Xóa nút đầu tiên

```javascript
const head3 = createList([1, 2]);
const n3 = 2;
console.log(listToArray(removeNthFromEnd_bruteForce(head3, n3))); // Expected: [2]
console.log(listToArray(removeNthFromEnd_optimized(createList([1, 2]), n3))); // Expected: [2]
console.log(listToArray(removeNthFromEnd_advanced(createList([1, 2]), n3))); // Expected: [2]
```

### Test Case 4: Edge case - Xóa nút cuối cùng

```javascript
const head4 = createList([1, 2, 3, 4, 5]);
const n4 = 1;
console.log(listToArray(removeNthFromEnd_bruteForce(head4, n4))); // Expected: [1,2,3,4]
console.log(
  listToArray(removeNthFromEnd_optimized(createList([1, 2, 3, 4, 5]), n4)),
); // Expected: [1,2,3,4]
console.log(
  listToArray(removeNthFromEnd_advanced(createList([1, 2, 3, 4, 5]), n4)),
); // Expected: [1,2,3,4]
```

### Test Case 5: Linked List dài

```javascript
const head5 = createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const n5 = 5;
console.log(listToArray(removeNthFromEnd_bruteForce(head5, n5))); // Expected: [1,2,3,4,5,7,8,9,10]
console.log(
  listToArray(
    removeNthFromEnd_optimized(createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), n5),
  ),
); // Expected: [1,2,3,4,5,7,8,9,10]
console.log(
  listToArray(
    removeNthFromEnd_advanced(createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), n5),
  ),
); // Expected: [1,2,3,4,5,7,8,9,10]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

- **Patterns liên quan:**
  - [Fast Slow Pointers](../algorithms/patterns/fast-slow-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [LeetCode Discuss](https://leetcode.com/problems/remove-nth-node-from-end-of-list/discuss/)
- [Fast Slow Pointers Pattern](../algorithms/patterns/fast-slow-pointers.md)

---

## 💬 Lời khuyên / Tips

- Luôn dùng dummy node để dễ xử lý trường hợp xóa head
- Với Fast-Slow Pointers, di chuyển fast n+1 bước để slow ở vị trí trước nút cần xóa
- Kiểm tra edge cases: Linked List rỗng, 1 nút, xóa head, xóa tail
- Vẽ hình để visualize movement của con trỏ
- Đảm bảo không có memory leak trong các ngôn ngữ có garbage collection thủ công

---

_Last updated: 2026-02-03_
