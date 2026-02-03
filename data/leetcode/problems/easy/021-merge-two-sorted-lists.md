# Merge Two Sorted Lists

> LeetCode Problem 21 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 21
- **URL:** https://leetcode.com/problems/merge-two-sorted-lists/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List, Two Pointers
- **Tags:** Linked List, Recursion, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Linked List, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> You are given the heads of two sorted linked lists `list1` and `list2`.
>
> Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.
>
> Return the head of the merged linked list.

**Example 1:**

```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**

```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**

```
Input: list1 = [], list2 = [0]
Output: [0]
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai danh sách liên kết đã được sắp xếp `list1` và `list2`
- **Output:** Danh sách liên kết đã được hợp nhất và sắp xếp
- **Ràng buộc / Constraints:**
  - Số node trong cả hai danh sách nằm trong khoảng [0, 50]
  - `-100 <= Node.val <= 100`
  - Cả hai danh sách đều được sắp xếp theo thứ tự không giảm
- **Edge cases:**
  - Một hoặc cả hai danh sách rỗng
  - Một danh sách ngắn hơn danh sách kia
  - Các giá trị bằng nhau

### 2. Tư duy / Thinking Process

- **Bước 1:** Tạo một dummy node để làm head của danh sách kết quả
- **Bước 2:** Dùng hai con trỏ để duyệt qua hai danh sách
- **Bước 3:** So sánh giá trị của hai node, thêm node có giá trị nhỏ hơn vào kết quả
- **Bước 4:** Khi một danh sách hết, thêm phần còn lại của danh sách kia vào kết quả

### 3. Ví dụ minh họa / Examples

```
Example 1: list1 = [1,2,4], list2 = [1,3,4]

Duyệt:
1. 1 (list1) <= 1 (list2) → thêm 1, list1 = [2,4], result = [1]
2. 2 (list1) > 1 (list2) → thêm 1, list2 = [3,4], result = [1,1]
3. 2 (list1) <= 3 (list2) → thêm 2, list1 = [4], result = [1,1,2]
4. 4 (list1) > 3 (list2) → thêm 3, list2 = [4], result = [1,1,2,3]
5. 4 (list1) <= 4 (list2) → thêm 4, list1 = [], result = [1,1,2,3,4]
6. list1 rỗng → thêm list2 còn lại, result = [1,1,2,3,4,4]

Output: [1,1,2,3,4,4]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Iterative với dummy node để hợp nhất hai danh sách.

### Thuật toán / Algorithm

1. Tạo dummy node để làm head của danh sách kết quả
2. Tạo con trỏ current để duyệt qua danh sách kết quả
3. Duyệt khi cả hai danh sách đều còn node:
   - So sánh giá trị của hai node
   - Thêm node có giá trị nhỏ hơn vào kết quả
   - Di chuyển con trỏ của danh sách tương ứng
4. Khi một danh sách hết, thêm phần còn lại của danh sách kia vào kết quả
5. Trả về dummy.next (bỏ qua dummy node)

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
 * Merge Two Sorted Lists - Iterative Solution
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists_iterative(list1, list2) {
  // Tạo dummy node
  const dummy = new ListNode(0);
  let current = dummy;

  // Duyệt khi cả hai danh sách đều còn node
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Thêm phần còn lại của danh sách chưa hết
  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - n và m là độ dài của hai danh sách
- **Space Complexity:** O(1) - Không dùng thêm không gian (ngoại trừ dummy node)

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Hiệu quả về thời gian
- Không tốn thêm không gian

### Nhược điểm / Cons

- Cần tạo dummy node

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã khá tốt
- Điểm yếu của giải pháp 1? Không có điểm yếu rõ rệt
- Cách tiếp cận mới? Dùng Recursion

### Ý tưởng / Idea

Dùng Recursion để hợp nhất hai danh sách. Đệ quy tự động xử lý việc thêm phần còn lại.

### Code / Implementation

```javascript
/**
 * Merge Two Sorted Lists - Recursive Solution
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists_recursive(list1, list2) {
  // Base case: nếu một danh sách rỗng, trả về danh sách kia
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  // So sánh và gọi đệ quy
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists_recursive(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists_recursive(list1, list2.next);
    return list2;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m)
- **Space Complexity:** O(n + m) - Cho stack đệ quy

### Ưu điểm / Pros

- Code ngắn gọn hơn
- Tự động xử lý việc thêm phần còn lại

### Nhược điểm / Cons

- Tốn thêm không gian cho stack đệ quy
- Có thể gây stack overflow với danh sách rất dài

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp Iterative đã là tối ưu về không gian
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp Iterative là tối ưu nhất về không gian. Tuy nhiên, có thể tối ưu code bằng cách:

- Dùng biến tạm để tránh truy cập nhiều lần
- Tối ưu điều kiện kiểm tra

### Code / Implementation

```javascript
/**
 * Merge Two Sorted Lists - Optimized Iterative Solution
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists_optimized(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Gán phần còn lại (sử dụng || để gán nhanh hơn)
  current.next = list1 || list2;

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn
- Hiệu quả nhất về không gian

### Nhược điểm / Cons

- Tương tự giải pháp Iterative cơ bản

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space  | Độ khó / Difficulty | Khi nào dùng / When to use           |
| -------------------- | ------ | ------ | ------------------- | ------------------------------------ |
| Iterative            | O(n+m) | O(1)   | Dễ / Easy           | Danh sách lớn, cần tối ưu không gian |
| Recursive            | O(n+m) | O(n+m) | Dễ / Easy           | Code ngắn gọn, danh sách nhỏ         |
| Optimized Iterative  | O(n+m) | O(1)   | Dễ / Easy           | Cần tối ưu hiệu năng                 |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Helper function to create linked list from array
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// Helper function to convert linked list to array
function listToArray(list) {
  const result = [];
  while (list !== null) {
    result.push(list.val);
    list = list.next;
  }
  return result;
}

const list1 = createList([1, 2, 4]);
const list2 = createList([1, 3, 4]);
console.log(listToArray(mergeTwoLists_iterative(list1, list2))); // [1,1,2,3,4,4]
```

### Test Case 2: Cả hai danh sách rỗng / Both empty

```javascript
console.log(mergeTwoLists_iterative(null, null)); // null
```

### Test Case 3: Một danh sách rỗng / One empty

```javascript
const list2 = createList([0]);
console.log(listToArray(mergeTwoLists_iterative(null, list2))); // [0]
```

### Test Case 4: Các giá trị bằng nhau / Equal values

```javascript
const list1 = createList([1, 1, 1]);
const list2 = createList([1, 1, 1]);
console.log(listToArray(mergeTwoLists_recursive(list1, list2))); // [1,1,1,1,1,1]
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Linked List:** [`../algorithms/data-structures/linked-list.md`](../algorithms/data-structures/linked-list.md)
- **Two Pointers:** [`../algorithms/patterns/two-pointers.md`](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Linked List - Wikipedia](https://en.wikipedia.org/wiki/Linked_list)

---

_Last updated: 2026-02-03_
