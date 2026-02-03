# Merge Two Sorted Lists / Gộp hai danh sách đã sắp xếp

> LeetCode Problem 21 & Difficulty: Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 21
- **URL:** https://leetcode.com/problems/merge-two-sorted-lists/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Linked List
- **Tags:** Linked List, Recursion
- **Thuật toán liên quan / Related Algorithms:** Recursion
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

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

**Constraints:**

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in non-decreasing order.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Head của hai Linked List đã sắp xếp (list1 và list2)
- **Output:** Head của Linked List đã gộp và sắp xếp
- **Ràng buộc / Constraints:**
  - Số lượng nút trong mỗi list: 0 đến 50
  - Giá trị nút: -100 đến 100
  - Cả hai list đều đã sắp xếp theo thứ tự không giảm
- **Edge cases:**
  - Một hoặc cả hai list rỗng
  - Một list chỉ có 1 nút
  - Hai list có giá trị giống nhau

### 2. Tư duy / Thinking Process

- Bước 1: Hiểu yêu cầu - gộp hai Linked List đã sắp xếp thành một list đã sắp xếp
- Bước 2: Nhận thấy cả hai list đã sắp xếp, có thể dùng technique merge của Merge Sort
- Bước 3: Có thể dùng iteration hoặc recursion

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Explanation:
- list1: 1 -> 2 -> 4
- list2: 1 -> 3 -> 4
- Merge: 1 -> 1 -> 2 -> 3 -> 4 -> 4

Example 2:
Input: list1 = [], list2 = []
Output: []
Explanation: Cả hai list rỗng, kết quả rỗng

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]
Explanation: list1 rỗng, list2 có 1 nút, kết quả là list2
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng một Linked List mới để lưu kết quả. So sánh giá trị của hai list và thêm nút có giá trị nhỏ hơn vào kết quả.

### Thuật toán / Algorithm

1. Tạo dummy node để làm head của kết quả
2. Tạo current pointer để theo dõi vị trí hiện tại trong kết quả
3. Dùng vòng lặp while để duyệt qua cả hai list:
   - Nếu list1 không rỗng và (list2 rỗng hoặc list1.val < list2.val):
     - Thêm list1 vào kết quả
     - Di chuyển list1
   - Ngược lại:
     - Thêm list2 vào kết quả
     - Di chuyển list2
4. Sau khi một list hết, thêm toàn bộ list còn lại vào kết quả
5. Trả về dummy.next

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
 * Merge Two Sorted Lists - Iterative Solution
 * @param {ListNode} list1 - Head của Linked List thứ nhất
 * @param {ListNode} list2 - Head của Linked List thứ hai
 * @return {ListNode} - Head của Linked List đã gộp
 */
function mergeTwoLists_bruteForce(list1, list2) {
  // Tạo dummy node
  const dummy = new ListNode(0);
  let current = dummy;

  // Duyệt qua cả hai list
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Thêm phần còn lại của list1 hoặc list2
  if (list1 !== null) {
    current.next = list1;
  } else {
    current.next = list2;
  }

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - n và m là độ dài của hai list
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ đáng kể (ngoài dummy node)

### Ưu điểm / Pros

- Dễ hiểu và implement
- Không dùng recursion, tránh stack overflow
- Tận dụng được tính chất đã sắp xếp của hai list

### Nhược điểm / Cons

- Cần tạo dummy node
- Code dài hơn so với recursion

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Code có thể ngắn gọn hơn với recursion
- Điểm yếu của giải pháp 1? Code dài, nhiều điều kiện
- Cách tiếp cận mới? Dùng recursion để code gọn hơn

### Ý tưởng / Idea

Sử dụng recursion để gộp hai list. Với mỗi bước, so sánh giá trị của hai list và trả về nút có giá trị nhỏ hơn, sau đó đệ quy gộp phần còn lại.

### Thuật toán / Algorithm

1. Base case: nếu list1 rỗng, trả về list2
2. Base case: nếu list2 rỗng, trả về list1
3. So sánh giá trị của hai list:
   - Nếu list1.val < list2.val:
     - list1.next = merge(list1.next, list2)
     - Trả về list1
   - Ngược lại:
     - list2.next = merge(list1, list2.next)
     - Trả về list2

### Code / Implementation

```javascript
/**
 * Merge Two Sorted Lists - Recursive Solution
 * @param {ListNode} list1 - Head của Linked List thứ nhất
 * @param {ListNode} list2 - Head của Linked List thứ hai
 * @return {ListNode} - Head của Linked List đã gộp
 */
function mergeTwoLists_optimized(list1, list2) {
  // Base cases
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }

  // So sánh và gộp
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists_optimized(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists_optimized(list1, list2.next);
    return list2;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - mỗi nút được xử lý 1 lần
- **Space Complexity:** O(n + m) - call stack cho recursion

### Ưu điểm / Pros

- Code rất ngắn gọn và dễ đọc
- Tận dụng được tính chất của recursion
- Logic rõ ràng, dễ hiểu

### Nhược điểm / Cons

- Có thể gây stack overflow với list rất dài
- Tốn bộ nhớ cho call stack

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng in-place merge
- Có thuật toán/pattern nào phù hợp hơn? In-place merge pattern

### Ý tưởng / Idea

Thay vì tạo Linked List mới, có thể merge in-place bằng cách thay đổi next pointer của các nút trong một list để trỏ vào nút của list kia.

### Thuật toán / Algorithm

1. Nếu list1 rỗng, trả về list2
2. Nếu list2 rỗng, trả về list1
3. Xác định list nào có head nhỏ hơn, dùng làm head kết quả
4. Dùng current pointer để theo dõi vị trí hiện tại
5. Duyệt qua cả hai list, thay đổi next pointer để merge in-place
6. Trả về head kết quả

### Code / Implementation

```javascript
/**
 * Merge Two Sorted Lists - In-place Solution
 * @param {ListNode} list1 - Head của Linked List thứ nhất
 * @param {ListNode} list2 - Head của Linked List thứ hai
 * @return {ListNode} - Head của Linked List đã gộp
 */
function mergeTwoLists_advanced(list1, list2) {
  // Base cases
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  // Xác định head kết quả
  let head;
  if (list1.val <= list2.val) {
    head = list1;
    list1 = list1.next;
  } else {
    head = list2;
    list2 = list2.next;
  }

  let current = head;

  // Merge in-place
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

  // Thêm phần còn lại
  current.next = list1 !== null ? list1 : list2;

  return head;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - mỗi nút được xử lý 1 lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Không tạo dummy node
- Tối ưu bộ nhớ
- Tương đương hiệu năng với iteration

### Nhược điểm / Cons

- Code phức tạp hơn
- Cần xử lý nhiều edge case
- Khó đọc hơn so với recursion

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space  | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ------ | ------ | ------------------- | -------------------------- |
| Brute Force          | O(n+m) | O(1)   | Dễ / Easy           | List nhỏ, tránh recursion  |
| Optimized            | O(n+m) | O(n+m) | Trung bình / Medium | Code gọn, dễ hiểu          |
| Advanced             | O(n+m) | O(1)   | Khó / Hard          | Cần tối ưu bộ nhớ          |

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

const list1 = createList([1, 2, 4]);
const list2 = createList([1, 3, 4]);
console.log(listToArray(mergeTwoLists_bruteForce(list1, list2))); // Expected: [1,1,2,3,4,4]
console.log(
  listToArray(
    mergeTwoLists_optimized(createList([1, 2, 4]), createList([1, 3, 4])),
  ),
); // Expected: [1,1,2,3,4,4]
console.log(
  listToArray(
    mergeTwoLists_advanced(createList([1, 2, 4]), createList([1, 3, 4])),
  ),
); // Expected: [1,1,2,3,4,4]
```

### Test Case 2: Cả hai list rỗng

```javascript
console.log(listToArray(mergeTwoLists_bruteForce(null, null))); // Expected: []
console.log(listToArray(mergeTwoLists_optimized(null, null))); // Expected: []
console.log(listToArray(mergeTwoLists_advanced(null, null))); // Expected: []
```

### Test Case 3: Một list rỗng

```javascript
console.log(listToArray(mergeTwoLists_bruteForce(null, createList([0])))); // Expected: [0]
console.log(listToArray(mergeTwoLists_optimized(null, createList([0])))); // Expected: [0]
console.log(listToArray(mergeTwoLists_advanced(null, createList([0])))); // Expected: [0]
```

### Test Case 4: List có giá trị giống nhau

```javascript
console.log(
  listToArray(
    mergeTwoLists_bruteForce(createList([1, 1, 2]), createList([1, 2, 3])),
  ),
); // Expected: [1,1,1,2,2,3]
console.log(
  listToArray(
    mergeTwoLists_optimized(createList([1, 1, 2]), createList([1, 2, 3])),
  ),
); // Expected: [1,1,1,2,2,3]
console.log(
  listToArray(
    mergeTwoLists_advanced(createList([1, 1, 2]), createList([1, 2, 3])),
  ),
); // Expected: [1,1,1,2,2,3]
```

### Test Case 5: List dài

```javascript
console.log(
  listToArray(
    mergeTwoLists_bruteForce(
      createList([1, 3, 5, 7, 9]),
      createList([2, 4, 6, 8, 10]),
    ),
  ),
); // Expected: [1,2,3,4,5,6,7,8,9,10]
console.log(
  listToArray(
    mergeTwoLists_optimized(
      createList([1, 3, 5, 7, 9]),
      createList([2, 4, 6, 8, 10]),
    ),
  ),
); // Expected: [1,2,3,4,5,6,7,8,9,10]
console.log(
  listToArray(
    mergeTwoLists_advanced(
      createList([1, 3, 5, 7, 9]),
      createList([2, 4, 6, 8, 10]),
    ),
  ),
); // Expected: [1,2,3,4,5,6,7,8,9,10]
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

- [LeetCode Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [LeetCode Discuss](https://leetcode.com/problems/merge-two-sorted-lists/discuss/)
- [Recursion Algorithm](../algorithms/algorithms/recursion.md)

---

## 💬 Lời khuyên / Tips

- Dùng dummy node để dễ xử lý trường hợp head null
- Kiểm tra edge cases: cả hai list rỗng, một list rỗng
- Với recursion, luôn có base case để tránh infinite recursion
- Với iteration, dùng while với điều kiện cả hai list không null
- Sau khi một list hết, thêm toàn bộ list còn lại vào kết quả

---

_Last updated: 2026-02-03_
