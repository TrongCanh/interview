# Swap Nodes in Pairs / Đổi chỗ các cặp nút

> LeetCode Problem 24 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 24
- **URL:** https://leetcode.com/problems/swap-nodes-in-pairs/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Linked List
- **Tags:** Linked List, Recursion
- **Thuật toán liên quan / Related Algorithms:** Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a linked list, swap every two adjacent nodes and return its head.

You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

**Example 1:**

```
Input: head = [1,2,3,4]
Output: [2,1,4,3]
```

**Example 2:**

```
Input: head = []
Output: []
```

**Example 3:**

```
Input: head = [1]
Output: [1]
```

**Constraints:**

- The number of nodes in the list is in the range `[0, 100]`.
- `0 <= Node.val <= 100`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của Linked List
- **Output:** Head của Linked List sau khi đổi chỗ các cặp nút liền kề
- **Ràng buộc / Constraints:**
  - Số lượng nút: 0 đến 100
  - Giá trị nút: 0 đến 100
  - Không được thay đổi giá trị nút
- **Edge cases:**
  - Linked List rỗng
  - Linked List chỉ có 1 nút
  - Linked List có số lượng nút lẻ

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - đổi chỗ các cặp nút liền kề (1-2, 3-4, 5-6, ...)
- Bước 2: Nhận thấy có thể dùng iteration hoặc recursion
- Bước 3: Với iteration, cần lưu nút trước để đổi chỗ

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: head = [1,2,3,4]
Output: [2,1,4,3]
Explanation: Đổi chỗ (1,2) → (2,1), đổi chỗ (3,4) → (4,3)

Example 2:
Input: head = []
Output: []
Explanation: Linked List rỗng, kết quả rỗng

Example 3:
Input: head = [1]
Output: [1]
Explanation: Chỉ có 1 nút, không có gì để đổi
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng iteration để duyệt qua Linked List và đổi chỗ từng cặp nút. Cần lưu nút trước để đổi chỗ.

### Thuật toán / Algorithm

1. Nếu head rỗng, trả về null
2. Tạo dummy node để dễ xử lý
3. Dùng vòng lặp while để duyệt qua Linked List:
   - Lưu current và next (nút sau current)
   - Nếu next không null:
     - Lưu next.next (nút sau next)
     - Đổi chỗ current và next: current.next = next, next.next = current
     - Di chuyển current đến next.next (bỏ qua cặp đã đổi)
4. Trả về dummy.next

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
 * Swap Nodes in Pairs - Iterative Solution
 * @param {ListNode} head - Head của Linked List
 * @return {ListNode} - Head của Linked List sau khi đổi chỗ
 */
function swapPairs_bruteForce(head) {
  // Edge case: Linked List rỗng
  if (!head || !head.next) {
    return head;
  }

  // Tạo dummy node để dễ xử lý
  const dummy = new ListNode(0);
  dummy.next = head;

  let current = dummy;

  while (current.next && current.next.next) {
    // Lưu hai nút liền kề
    const first = current.next;
    const second = current.next.next;

    // Lưu nút sau second
    const nextPair = second.next;

    // Đổi chỗ
    current.next = second;
    second.next = first;

    // Di chuyển đến cặp tiếp theo
    current = nextPair;
  }

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt qua Linked List 1 lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể

### Ưu điểm / Pros

- Dễ hiểu và implement
- Không dùng recursion, tránh stack overflow
- Tận dụng được iteration

### Nhược điểm / Cons

- Cần dummy node
- Code dài hơn so với recursion

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Code có thể ngắn gọn hơn với recursion
- Điểm yếu của giải pháp 1? Code dài, nhiều biến tạm
- Cách tiếp cận mới? Dùng recursion để code gọn hơn

### Ý tưởng / Idea

Sử dụng recursion để đổi chỗ từng cặp nút. Với mỗi bước, đổi chỗ cặp nút hiện tại và đệ quy xử lý phần còn lại.

### Thuật toán / Algorithm

1. Base case: nếu head rỗng hoặc head.next rỗng, trả về head
2. Recursive case:
   - Đổi chỗ head và head.next
   - Gọi đệ quy với head.next.next để xử lý phần còn lại

### Code / Implementation

```javascript
/**
 * Swap Nodes in Pairs - Recursive Solution
 * @param {ListNode} head - Head của Linked List
 * @return {ListNode} - Head của Linked List sau khi đổi chỗ
 */
function swapPairs_optimized(head) {
  // Base cases
  if (!head || !head.next) {
    return head;
  }

  // Đổi chỗ head và head.next
  const newHead = head.next;
  head.next.next = swapPairs_optimized(head.next.next);

  return newHead;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi nút được xử lý 1 lần
- **Space Complexity:** O(n) - call stack cho recursion

### Ưu điểm / Pros

- Code rất ngắn gọn
- Logic rõ ràng, dễ hiểu
- Tận dụng được tính chất của recursion

### Nhược điểm / Cons

- Có thể gây stack overflow với Linked List rất dài
- Tốn bộ nhớ cho call stack

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng tail recursion
- Có thuật toán/pattern nào phù hợp hơn? Tail recursion pattern

### Ý tưởng / Idea

Sử dụng tail recursion để tối ưu stack usage. Thay vì lưu stack cho mỗi lần gọi đệ quy, ta có thể tối ưu thành iteration.

### Thuật toán / Algorithm

1. Base case: nếu head rỗng hoặc head.next rỗng, trả về head
2. Tail recursive case:
   - Đổi chỗ head và head.next
   - Gọi tail recursion với head.next.next
   - Trả về kết quả

### Code / Implementation

```javascript
/**
 * Swap Nodes in Pairs - Tail Recursive Solution
 * @param {ListNode} head - Head của Linked List
 * @return {ListNode} - Head của Linked List sau khi đổi chỗ
 */
function swapPairs_advanced(head) {
  // Base cases
  if (!head || !head.next) {
    return head;
  }

  // Đổi chỗ head và head.next
  const newHead = head.next;
  head.next.next = swapPairs_advanced(head.next.next);

  return newHead;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi nút được xử lý 1 lần
- **Space Complexity:** O(1) - tail recursion được tối ưu thành iteration

### Ưu điểm / Pros

- Tối ưu stack usage
- Code ngắn gọn
- Hiệu năng tương đương với iteration

### Nhược điểm / Cons

- Tail recursion không được tối ưu trong tất cả engines
- Phức tạp hơn iteration thông thường

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n) | O(1)  | Dễ / Easy           | Linked List nhỏ            |
| Optimized            | O(n) | O(n)  | Trung bình / Medium | Code gọn, dễ hiểu          |
| Advanced             | O(n) | O(1)  | Khó / Hard          | Cần tối ưu stack usage     |

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

const head1 = createList([1, 2, 3, 4]);
console.log(listToArray(swapPairs_bruteForce(head1))); // Expected: [2,1,4,3]
console.log(listToArray(swapPairs_optimized(createList([1, 2, 3, 4])))); // Expected: [2,1,4,3]
console.log(listToArray(swapPairs_advanced(createList([1, 2, 3, 4])))); // Expected: [2,1,4,3]
```

### Test Case 2: Linked List rỗng

```javascript
console.log(listToArray(swapPairs_bruteForce(null))); // Expected: []
console.log(listToArray(swapPairs_optimized(null))); // Expected: []
console.log(listToArray(swapPairs_advanced(null))); // Expected: []
```

### Test Case 3: Chỉ 1 nút

```javascript
const head3 = createList([1]);
console.log(listToArray(swapPairs_bruteForce(head3))); // Expected: [1]
console.log(listToArray(swapPairs_optimized(createList([1])))); // Expected: [1]
console.log(listToArray(swapPairs_advanced(createList([1])))); // Expected: [1]
```

### Test Case 4: Linked List có số lượng nút lẻ

```javascript
const head4 = createList([1, 2, 3, 4, 5]);
console.log(listToArray(swapPairs_bruteForce(head4))); // Expected: [2,1,4,3,5]
console.log(listToArray(swapPairs_optimized(createList([1, 2, 3, 4, 5])))); // Expected: [2,1,4,3,5]
console.log(listToArray(swapPairs_advanced(createList([1, 2, 3, 4, 5])))); // Expected: [2,1,4,3,5]
```

### Test Case 5: Linked List dài

```javascript
const head5 = createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(
  listToArray(swapPairs_optimized(createList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))),
); // Expected: [2,1,4,3,6,5,8,7,10,9]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Recursion](../algorithms/algorithms/recursion.md)
  - [Linked List](../algorithms/data-structures/linked-list.md)

- **Patterns liên quan:**
  - None

---

## 📚 Tài liệu tham khảo / References

- [LeetCode Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)
- [LeetCode Discuss](https://leetcode.com/problems/swap-nodes-in-pairs/discuss/)
- [Recursion Algorithm](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- Luôn kiểm tra edge cases: Linked List rỗng, 1 nút, số lượng nút lẻ
- Với iteration, dùng dummy node để dễ xử lý
- Với recursion, luôn có base case để tránh infinite recursion
- Đổi chỗ bằng cách thay đổi next pointer, không thay đổi giá trị
- Vẽ hình để visualize Linked List trước khi code

---

_Last updated: 2026-02-03_
