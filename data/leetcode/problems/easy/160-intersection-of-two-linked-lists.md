# Intersection of Two Linked Lists

> LeetCode Problem 160 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 160
- **URL:** https://leetcode.com/problems/intersection-of-two-linked-lists/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List, Hash Table, Two Pointers
- **Tags:** Linked List, Hash Table, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Linked List, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.
>
> For example, the following two linked lists:
>
> begin to intersect at node c1.
>
> The test cases are generated such that there are no cycles anywhere in the entire linked structure.
>
> **Note that the linked lists must retain their original structure after the function returns.**
>
> **Custom Judge:**
>
> The inputs to the judge are given as follows (your program is not given these inputs):
>
> - `intersectVal` - The value of the node where the intersection occurs. This is 0 if there is no intersected node.
> - `listA` - The first linked list.
> - `listB` - The second linked list.
> - `skipA` - The number of nodes to skip ahead in `listA` (starting from the head) to get to the intersected node.
> - `skipB` - The number of nodes to skip ahead in `listB` (starting from the head) to get to the intersected node.
>   The judge will then create the linked structure based on these inputs and pass the two heads to your program. If you correctly return the intersected node, then your solution will be accepted.

**Example 1:**

```
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
```

**Example 2:**

```
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2. There are 3 nodes in A before the intersected node; There are 1 node in B before the intersected node.
```

**Example 3:**

```
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: Since intersectVal = 0, there is no intersected node.
```

**Constraints:**

- The number of nodes of `listA` is in the range `[0, 10^4]`.
- The number of nodes of `listB` is in the range `[0, 10^4]`.
- `0 <= skipA < listA.length`
- `0 <= skipB < listB.length`
- `intersectVal` is `0` if there is no intersection, or the value of the intersected node if there is an intersection.
- `listA` and `listB` are non-decreasing.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Heads của hai linked lists
- **Output:** Node giao điểm của hai linked lists, hoặc null nếu không có giao điểm
- **Ràng buộc / Constraints:**
  - Không có cycle trong linked lists
  - Phải giữ nguyên cấu trúc linked lists
- **Edge cases:**
  - Một trong hai linked lists rỗng
  - Hai linked lists không có giao điểm
  - Giao điểm ở đầu linked list

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm node giao điểm của hai linked lists
- **Bước 2:** Có thể dùng Two Pointers để duyệt hai linked lists
- **Bước 3:** Hoặc dùng Hash Set để lưu các node của linked list thứ nhất

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]

List A: 4 → 1 → 8 → 4 → 5 → null
List B: 5 → 6 → 1 → 8 → 4 → 5 → null

Giải thích:
- Giao điểm: node 8
- List A gặp node 8 sau 2 bước
- List B gặp node 8 sau 3 bước
Output: node 8
```

---

## 💡 Giải pháp 1: Hash Set (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Hash Set để lưu các node của linked list thứ nhất, sau đó duyệt linked list thứ hai để tìm node giao điểm.

### Thuật toán / Algorithm

1. Nếu headA = null hoặc headB = null, trả về null
2. Tạo Set để lưu các node của listA
3. Duyệt listA:
   - Thêm từng node vào Set
4. Duyệt listB:
   - Nếu Set có node hiện tại, trả về node đó (giao điểm)
5. Trả về null (không có giao điểm)

### Code / Implementation

```javascript
/**
 * Intersection of Two Linked Lists - Hash Set Solution
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  const visited = new Set();
  let node = headA;

  // Lưu các node của listA vào Set
  while (node) {
    visited.add(node);
    node = node.next;
  }

  // Duyệt listB để tìm node giao điểm
  node = headB;
  while (node) {
    if (visited.has(node)) {
      return node;
    }
    node = node.next;
  }

  // Không có giao điểm
  return null;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - Duyệt qua listA (n) và listB (m)
- **Space Complexity:** O(n) - Lưu Set với n node của listA

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không phụ thuộc vào thuật toán phức tạp

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ cho Set
- Không tối ưu về bộ nhớ

---

## 🚀 Giải pháp 2: Two Pointers (Cải tiến) / Two Pointers Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Hash Set tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Tốn O(n) space
- Cách tiếp cận mới? Dùng Two Pointers để đồng thời duyệt hai linked lists

### Ý tưởng / Idea

Dùng 2 pointers để duyệt hai linked lists. Tính độ dài của mỗi linked list, sau đó điều chỉnh pointers để bắt đầu từ cùng vị trí.

### Thuật toán / Algorithm

1. Nếu headA = null hoặc headB = null, trả về null
2. Tính lenA = độ dài của listA
3. Tính lenB = độ dài của listB
4. Khởi tạo pointerA = headA, pointerB = headB
5. Nếu lenA > lenB:
   - Di chuyển pointerA lenA - lenB bước
6. Nếu lenB > lenA:
   - Di chuyển pointerB lenB - lenA bước
7. Trong khi pointerA !== pointerB:
   - pointerA = pointerA.next
   - pointerB = pointerB.next
8. Trả về pointerA (hoặc null nếu không có giao điểm)

### Code / Implementation

```javascript
/**
 * Intersection of Two Linked Lists - Two Pointers Solution
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode_TwoPointers(headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  // Tính độ dài của mỗi linked list
  let lenA = 0;
  let lenB = 0;
  let node = headA;
  while (node) {
    lenA++;
    node = node.next;
  }
  node = headB;
  while (node) {
    lenB++;
    node = node.next;
  }

  // Điều chỉnh pointers để bắt đầu từ cùng vị trí
  let pointerA = headA;
  let pointerB = headB;

  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; i++) {
      pointerA = pointerA.next;
    }
  } else if (lenB > lenA) {
    for (let i = 0; i < lenB - lenA; i++) {
      pointerB = pointerB.next;
    }
  }

  // Duyệt cùng lúc
  while (pointerA !== pointerB) {
    pointerA = pointerA.next;
    pointerB = pointerB.next;
  }

  // Trả về node giao điểm (hoặc null)
  return pointerA;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - Duyệt qua listA (n) và listB (m)
- **Space Complexity:** O(1) - Chỉ dùng vài biến

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n + m)
- Độ phức tạp bộ nhớ O(1)
- Không cần cấu trúc dữ liệu bổ sung

### Nhược điểm / Cons

- Cần hiểu về Two Pointers
- Khó hiểu hơn Hash Set

---

## ⚡ Giải pháp 3: Difference Method (Nâng cao) / Difference Method Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng phương pháp chênh lệch
- Có thuật toán/pattern nào phù hợp hơn? Dùng vòng lặp để đồng thời duyệt

### Ý tưởng / Idea

Dùng vòng lặp để đồng thời duyệt hai linked lists. Khi một pointer đến cuối, di chuyển nó về đầu linked list kia.

### Thuật toán / Algorithm

1. Nếu headA = null hoặc headB = null, trả về null
2. Khởi tạo pointerA = headA, pointerB = headB
3. Trong khi pointerA !== pointerB:
   - Nếu pointerA = null, pointerA = headB
   - Nếu pointerB = null, pointerB = headA
   - pointerA = pointerA.next
   - pointerB = pointerB.next
4. Trả về pointerA (hoặc null nếu không có giao điểm)

### Code / Implementation

```javascript
/**
 * Intersection of Two Linked Lists - Difference Method Solution
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode_Difference(headA, headB) {
  if (!headA || !headB) {
    return null;
  }

  let pointerA = headA;
  let pointerB = headB;

  while (pointerA !== pointerB) {
    // Nếu pointerA đến cuối, di chuyển về headB
    if (pointerA === null) {
      pointerA = headB;
    }
    // Nếu pointerB đến cuối, di chuyển về headA
    if (pointerB === null) {
      pointerB = headA;
    }

    pointerA = pointerA.next;
    pointerB = pointerB.next;
  }

  // Trả về node giao điểm
  return pointerA;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n + m) - Duyệt qua cả hai linked lists
- **Space Complexity:** O(1) - Chỉ dùng 2 pointers

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n + m)
- Độ phức tạp bộ nhớ O(1)
- Code ngắn gọn

### Nhược điểm / Cons

- Có thể gây infinite loop nếu có cycle (nhưng đề bài đảm bảo không có)
- Khó hiểu hơn Hash Set

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use             |
| -------------------- | ------ | ----- | ------------------- | -------------------------------------- |
| Hash Set             | O(n+m) | O(n)  | Dễ / Easy           | Dễ hiểu, không cần thuật toán phức tạp |
| Two Pointers         | O(n+m) | O(1)  | Trung bình / Medium | Tối ưu, nên dùng                       |
| Difference Method    | O(n+m) | O(1)  | Trung bình / Medium | Code ngắn gọn                          |

---

## 🧪 Test Cases

### Test Case 1: Có giao điểm / Has Intersection

```javascript
// Tạo linked lists có giao điểm
const headA = new ListNode(4);
headA.next = new ListNode(1);
headA.next.next = new ListNode(8);
headA.next.next.next = new ListNode(4);
headA.next.next.next.next = new ListNode(5);

const headB = new ListNode(5);
headB.next = new ListNode(6);
headB.next.next = new ListNode(1);
headB.next.next.next = new ListNode(8);
headB.next.next.next.next = new ListNode(4);
headB.next.next.next.next.next = new ListNode(5);

console.log(getIntersectionNode(headA, headB).val); // Expected: 8
console.log(getIntersectionNode_TwoPointers(headA, headB).val); // Expected: 8
```

### Test Case 2: Không có giao điểm / No Intersection

```javascript
const headA = new ListNode(2);
headA.next = new ListNode(6);
headA.next.next = new ListNode(4);

const headB = new ListNode(1);
headB.next = new ListNode(5);

console.log(getIntersectionNode(headA, headB)); // Expected: null
console.log(getIntersectionNode_TwoPointers(headA, headB)); // Expected: null
```

### Test Case 3: Một linked list rỗng / One Empty List

```javascript
const headA = new ListNode(1);
headA.next = new ListNode(2);

console.log(getIntersectionNode(headA, null)); // Expected: null
console.log(getIntersectionNode_TwoPointers(headA, null)); // Expected: null
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)

- **Thuật toán liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 💬 Lời khuyên / Tips

- **Two Pointers Approach:**
  - Tính độ dài của mỗi linked list
  - Điều chỉnh pointers để bắt đầu từ cùng vị trí
  - Duyệt cùng lúc, O(1) space
- **Hash Set:**
  - Dễ hiểu nhưng tốn O(n) space
- **Lỗi thường gặp:**
  - Quên kiểm tra headA = null hoặc headB = null
  - Với two pointers, sai cách tính độ dài
  - Quên điều chỉnh pointers trước khi duyệt

---

_Last updated: 2026-02-03_
