# Delete Node in a Linked List / Xóa Nút Trong Danh Sách Liên Kết

> LeetCode Problem 237 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 237
- **URL:** https://leetcode.com/problems/delete-node-in-a-linked-list/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List
- **Tags:** Linked List
- **Thuật toán liên quan / Related Algorithms:** Linked List
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Write a function to **delete a node** in a singly-linked list. You will **not** be given access to the `head` of the list, instead you will be given access to **the node to be deleted** directly.

It is **guaranteed** that the node to be deleted is **not a tail node** in the list.

**Example 1:**

```
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

**Example 2:**

```
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
```

**Example 3:**

```
Input: head = [1,2,3,4], node = 3
Output: [1,2,4]
```

**Constraints:**

- The number of the nodes in the given list is in the range `[2, 1000]`.
- `-1000 <= Node.val <= 1000`
- The value of each node in the list is **unique**.
- The `node` to be deleted is **in the list** and is **not a tail** node.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút `node` cần xóa (không có quyền truy cập vào `head`)
- **Output:** Xóa nút `node` khỏi linked list
- **Ràng buộc / Constraints:**
  - Số lượng nút: 2 ≤ n ≤ 1000
  - Giá trị nút: -1000 ≤ Node.val ≤ 1000
  - Tất cả giá trị là duy nhất (không trùng lặp)
  - Nút cần xóa không phải là tail node
- **Edge cases:**
  - Nút cần xóa ở đầu linked list (không có prev)
  - Nút cần xóa ở giữa linked list
  - Linked list chỉ có 2 nút

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần xóa nút không có quyền truy cập vào head
- **Bước 2:** Xác định cách tiếp cận - không thể tìm prev node, nên phải copy giá trị từ next node
- **Bước 3:** Lên kế hoạch giải pháp - Copy giá trị từ next node, sau đó xóa next node

### 3. Ví dụ minh họa / Examples

```
Example 1: head = [4,5,1,9], node = 5

Trước khi xóa:
4 -> 5 -> 1 -> 9
     ^node

Cách tiếp cận:
- Copy giá trị từ node.next (1) sang node (5)
- node.val = 1
- Xóa node.next (nút 1 cũ)

Sau khi xóa:
4 -> 1 -> 9

Example 2: head = [4,5,1,9], node = 1

Trước khi xóa:
4 -> 5 -> 1 -> 9
          ^node

Cách tiếp cận:
- Copy giá trị từ node.next (9) sang node (1)
- node.val = 9
- Xóa node.next (nút 9 cũ)

Sau khi xóa:
4 -> 5 -> 9
```

---

## 💡 Giải pháp 1: Brute Force - Copy and Delete (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Copy giá trị từ node tiếp theo sang node hiện tại, sau đó xóa node tiếp theo. Điều này tạo hiệu quả như thể xóa node hiện tại.

### Thuật toán / Algorithm

1. Copy giá trị từ `node.next.val` sang `node.val`
2. Lưu tham chiếu đến `node.next.next`
3. Xóa `node.next` bằng cách gán `node.next = node.next.next`

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
 * Delete Node in a Linked List - Copy and Delete Solution
 * @param {ListNode} node - Nút cần xóa
 * @return {void} - Không trả về, chỉ xóa nút
 */
function deleteNode_bruteForce(node) {
  // Copy giá trị từ node tiếp theo sang node hiện tại
  node.val = node.next.val;

  // Xóa node tiếp theo
  node.next = node.next.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1) - Chỉ thực hiện 2 phép gán
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Độ phức tạp thời gian tối ưu O(1)
- Không sử dụng thêm bộ nhớ

### Nhược điểm / Cons

- Không thực sự xóa node, mà là copy giá trị và xóa node tiếp theo
- Không hoạt động với tail node (nhưng theo ràng buộc, node không phải là tail)

---

## 🚀 Giải pháp 2: Optimized - Same as Basic (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã tối ưu
- Điểm yếu của giải pháp 1? Không có điểm yếu đáng kể
- Cách tiếp cận mới? Tương tự giải pháp cơ bản

### Ý tưởng / Idea

Tương tự giải pháp cơ bản, nhưng viết code ngắn gọn hơn.

### Thuật toán / Algorithm

Tương tự giải pháp cơ bản.

### Code / Implementation

```javascript
/**
 * Delete Node in a Linked List - Optimized Solution
 * @param {ListNode} node - Nút cần xóa
 * @return {void} - Không trả về, chỉ xóa nút
 */
function deleteNode_optimized(node) {
  // Copy giá trị từ node tiếp theo và xóa node tiếp theo
  const nextNode = node.next;
  node.val = nextNode.val;
  node.next = nextNode.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code ngắn gọn
- Độ phức tạp tối ưu
- Dễ đọc

### Nhược điểm / Cons

- Tương tự giải pháp cơ bản

---

## ⚡ Giải pháp 3: Advanced - Alternative Approach (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Không, giải pháp cơ bản đã tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp tương tự, nhưng viết theo cách khác để minh họa tư duy.

### Thuật toán / Algorithm

Tương tự giải pháp cơ bản.

### Code / Implementation

```javascript
/**
 * Delete Node in a Linked List - Alternative Solution
 * @param {ListNode} node - Nút cần xóa
 * @return {void} - Không trả về, chỉ xóa nút
 */
function deleteNode_advanced(node) {
  // Giải pháp này thực chất là "trick" - copy giá trị từ next node
  // và xóa next node thay vì xóa node hiện tại

  // Step 1: Copy giá trị
  node.val = node.next.val;

  // Step 2: Bypass next node
  node.next = node.next.next;

  // Lưu ý: JavaScript sẽ tự động garbage collect node.next cũ
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(1)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rõ ràng với comment
- Giải thích rõ tư duy

### Nhược điểm / Cons

- Tương tự giải pháp cơ bản

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use  |
| -------------------- | ---- | ----- | ------------------- | --------------------------- |
| Copy and Delete      | O(1) | O(1)  | Dễ / Easy           | Luôn dùng (chỉ có cách này) |
| Optimized            | O(1) | O(1)  | Dễ / Easy           | Code ngắn gọn               |
| Alternative          | O(1) | O(1)  | Dễ / Easy           | Minh họa tư duy             |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo linked list: [4,5,1,9]
const head = new ListNode(4);
head.next = new ListNode(5);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(9);

const node = head.next; // node với giá trị 5
deleteNode_bruteForce(node);

// Kết quả: [4,1,9]
console.log(head.val === 4); // true
console.log(head.next.val === 1); // true
console.log(head.next.next.val === 9); // true
console.log(head.next.next.next === null); // true
```

### Test Case 2: Xóa node ở giữa / Delete Middle Node

```javascript
// Tạo linked list: [4,5,1,9]
const head = new ListNode(4);
head.next = new ListNode(5);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(9);

const node = head.next.next; // node với giá trị 1
deleteNode_bruteForce(node);

// Kết quả: [4,5,9]
console.log(head.val === 4); // true
console.log(head.next.val === 5); // true
console.log(head.next.next.val === 9); // true
console.log(head.next.next.next === null); // true
```

### Test Case 3: Linked list 2 nút / Two Nodes

```javascript
// Tạo linked list: [1,2]
const head = new ListNode(1);
head.next = new ListNode(2);

const node = head; // node với giá trị 1
deleteNode_bruteForce(node);

// Kết quả: [2]
console.log(head.val === 2); // true
console.log(head.next === null); // true
```

### Test Case 4: Giá trị âm / Negative Values

```javascript
// Tạo linked list: [-1,-2,-3,-4]
const head = new ListNode(-1);
head.next = new ListNode(-2);
head.next.next = new ListNode(-3);
head.next.next.next = new ListNode(-4);

const node = head.next; // node với giá trị -2
deleteNode_bruteForce(node);

// Kết quả: [-1,-3,-4]
console.log(head.val === -1); // true
console.log(head.next.val === -3); // true
console.log(head.next.next.val === -4); // true
```

### Test Case 5: Giá trị 0 / Zero Values

```javascript
// Tạo linked list: [0,1,0,2]
const head = new ListNode(0);
head.next = new ListNode(1);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(2);

const node = head.next.next; // node với giá trị 0
deleteNode_bruteForce(node);

// Kết quả: [0,1,2]
console.log(head.val === 0); // true
console.log(head.next.val === 1); // true
console.log(head.next.next.val === 2); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)

- **Patterns liên quan:**
  - None

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Trick của bài toán:**
   - Không thể xóa node trực tiếp vì không có prev node
   - Giải pháp: copy giá trị từ next node và xóa next node
   - Đây là "hack" thú vị của linked list

2. **Tại sao không thể xóa node trực tiếp?**
   - Để xóa node, cần cập nhật prev.next
   - Nhưng không có quyền truy cập vào prev
   - Không thể tìm prev vì không có head

3. **Ràng buộc quan trọng:**
   - Node cần xóa không phải là tail node
   - Điều này đảm bảo node.next luôn tồn tại

4. **Garbage Collection trong JavaScript:**
   - Khi node.next được gán sang node khác
   - Node cũ sẽ được garbage collect tự động

5. **Edge Cases:**
   - Node ở đầu linked list: hoạt động bình thường
   - Node ở giữa linked list: hoạt động bình thường
   - Linked list chỉ có 2 nút: hoạt động bình thường

6. **Lưu ý về thực tế:**
   - Trong thực tế, cách tiếp cận này có thể gây vấn đề
   - Nếu có tham chiếu khác đến node, giá trị sẽ thay đổi
   - Nhưng trong bài toán này, đây là giải pháp duy nhất

---

_Last updated: 2025-02-04_
