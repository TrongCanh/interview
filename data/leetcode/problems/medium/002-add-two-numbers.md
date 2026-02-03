# Add Two Numbers / Cộng Hai Số

> LeetCode Problem 2 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 2
- **URL:** https://leetcode.com/problems/add-two-numbers/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Linked List, Math, Recursion
- **Tags:** linked-list, math, recursion
- **Thuật toán liên quan / Related Algorithms:** Linked List, Recursion
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**

```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

**Example 2:**

```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Example 3:**

```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

**Constraints:**

- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai linked list không rỗng, mỗi node chứa một chữ số (0-9). Các chữ số được lưu theo thứ tự ngược (đơn vị ở đầu).
- **Output:** Một linked list mới chứa tổng của hai số, cũng được lưu theo thứ tự ngược.
- **Ràng buộc / Constraints:**
  - Số node trong mỗi linked list: 1 đến 100
  - Giá trị mỗi node: 0 đến 9
  - Không có số 0 ở đầu (trừ chính số 0)
- **Edge cases:**
  - Hai linked list có độ dài khác nhau
  - Tổng tại một vị trí >= 10 (có carry)
  - Carry ở vị trí cuối cùng tạo thêm node mới

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu cách lưu trữ số trong linked list
  - Ví dụ: [2,4,3] đại diện cho số 342 (3*100 + 4*10 + 2\*1)
  - Được lưu ngược nên node đầu tiên là đơn vị, node thứ hai là chục, v.v.

- **Bước 2:** Tư duy phép cộng như cộng tay
  - Bắt đầu từ vị trí đơn vị (node đầu tiên của mỗi list)
  - Cộng hai chữ số và carry từ vị trí trước
  - Lưu chữ số kết quả vào node mới
  - Carry mới = tổng / 10 (0 hoặc 1)
  - Tiếp tục với node tiếp theo của mỗi list

- **Bước 3:** Xử lý khi một list kết thúc trước
  - Tiếp tục với list còn lại
  - Xử lý carry cuối cùng (nếu còn)

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation:
  - 342 + 465 = 807
  - 2 + 5 = 7, carry = 0
  - 4 + 6 = 10, lưu 0, carry = 1
  - 3 + 4 + 1 = 8, carry = 0
  - Kết quả: [7,0,8]

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]
Explanation: 0 + 0 = 0

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
Explanation:
  - 9,999,999 + 9,999 = 10,009,998
  - 9 + 9 = 18, lưu 8, carry = 1
  - 9 + 9 + 1 = 19, lưu 9, carry = 1
  - 9 + 9 + 1 = 19, lưu 9, carry = 1
  - 9 + 9 + 1 = 19, lưu 9, carry = 1
  - 9 + 1 = 10, lưu 0, carry = 1
  - 9 + 1 = 10, lưu 0, carry = 1
  - 1 = 1, lưu 1
  - Kết quả: [8,9,9,9,0,0,0,1]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua cả hai linked list cùng lúc, cộng giá trị tại mỗi vị trí cùng với carry từ vị trí trước. Tạo node mới cho mỗi kết quả.

### Thuật toán / Algorithm

1. Khởi tạo dummy node để làm đầu của kết quả
2. Khởi tạo current node để duyệt và tạo các node kết quả
3. Khởi tạo carry = 0
4. Trong khi l1 hoặc l2 còn node hoặc carry > 0:
   a. Lấy giá trị từ l1 (nếu còn) và l2 (nếu còn), ngược lại là 0
   b. Tính tổng = val1 + val2 + carry
   c. Tạo node mới với giá trị tổng % 10
   d. Cập nhật carry = Math.floor(tổng / 10)
   e. Di chuyển current, l1, l2 đến node tiếp theo
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function solution1_bruteForce(l1, l2) {
  // Tạo dummy node để làm đầu của kết quả
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  // Duyệt khi còn node hoặc còn carry
  while (l1 !== null || l2 !== null || carry > 0) {
    // Lấy giá trị từ mỗi list, nếu hết thì lấy 0
    const val1 = l1 !== null ? l1.val : 0;
    const val2 = l2 !== null ? l2.val : 0;

    // Tính tổng tại vị trí hiện tại
    const sum = val1 + val2 + carry;

    // Tạo node mới với giá trị là chữ số đơn vị
    current.next = new ListNode(sum % 10);

    // Cập nhật carry cho vị trí tiếp theo
    carry = Math.floor(sum / 10);

    // Di chuyển đến node tiếp theo
    current = current.next;

    // Di chuyển l1 và l2 nếu còn node
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  // Trả về node đầu tiên thực sự (bỏ qua dummy)
  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(max(m, n)) - trong đó m và n là độ dài của hai linked list
- **Space Complexity:** O(max(m, n)) - để lưu kết quả (không tính dummy node)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Xử lý được tất cả các trường hợp
- Không cần chuyển đổi sang số nguyên (tránh overflow với số rất lớn)

### Nhược điểm / Cons

- Cần tạo node mới cho mỗi vị trí (tốn không gian)
- Không tối ưu nếu cần in-place modification

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp 1 đã khá tối ưu về mặt thuật toán, nhưng có thể tối ưu code để gọn hơn và dễ đọc hơn.
- **Điểm yếu của giải pháp 1?** Code hơi dài dòng, có thể rút gọn một số bước.
- **Cách tiếp cận mới?** Sử dụng destructuring và rút gọn logic điều kiện.

### Ý tưởng / Idea

Giữ nguyên thuật toán nhưng tối ưu code để gọn hơn, sử dụng toán tử gán kết hợp và rút gọn điều kiện.

### Thuật toán / Algorithm

1. Khởi tạo dummy node và current node
2. Khởi tạo carry = 0
3. Sử dụng vòng lặp while với điều kiện l1 || l2 || carry
4. Tính tổng và tạo node mới trong cùng một dòng
5. Trả về dummy.next

### Code / Implementation

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function solution2_optimized(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    // Tính tổng với giá trị mặc định là 0 nếu node null
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;

    // Tạo node mới và cập nhật carry
    current.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);

    // Di chuyển đến node tiếp theo
    current = current.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }

  return dummy.next;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(max(m, n))
- **Space Complexity:** O(max(m, n))

### Ưu điểm / Pros

- Code gọn hơn, dễ đọc
- Sử dụng optional chaining (?.) hiện đại
- Hiệu suất tương đương giải pháp 1

### Nhược điểm / Cons

- Cần trình duyệt/Node.js hỗ trợ optional chaining
- Không cải thiện về độ phức tạp thuật toán

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt thuật toán, giải pháp đã tối ưu. Tuy nhiên, có thể xem xét các biến thể khác nhau.
- **Có thuật toán/pattern nào phù hợp hơn?** Có thể sử dụng đệ quy thay vì vòng lặp để thể hiện tư duy đệ quy.

### Ý tưởng / Idea

Sử dụng đệ quy để cộng hai linked list. Mỗi lần đệ quy xử lý một cặp node và trả về kết quả cùng với carry.

### Thuật toán / Algorithm

1. Hàm đệ quy nhận l1, l2, và carry
2. Nếu cả l1, l2 đều null và carry = 0, trả về null
3. Tính tổng tại vị trí hiện tại
4. Tạo node mới với tổng % 10
5. Đệ quy gọi cho node tiếp theo với carry mới
6. Gán kết quả đệ quy vào node.next
7. Trả về node hiện tại

### Code / Implementation

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function solution3_recursive(l1, l2, carry = 0) {
  // Base case: không còn node và không còn carry
  if (!l1 && !l2 && carry === 0) {
    return null;
  }

  // Lấy giá trị từ mỗi list, nếu hết thì lấy 0
  const val1 = l1 ? l1.val : 0;
  const val2 = l2 ? l2.val : 0;

  // Tính tổng tại vị trí hiện tại
  const sum = val1 + val2 + carry;

  // Tạo node mới
  const node = new ListNode(sum % 10);

  // Đệ quy cho node tiếp theo
  node.next = solution3_recursive(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10),
  );

  return node;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(max(m, n))
- **Space Complexity:** O(max(m, n)) - cho stack đệ quy

### Ưu điểm / Pros

- Code gọn và thể hiện tư duy đệ rõ ràng
- Dễ hiểu với người quen với đệ quy

### Nhược điểm / Cons

- Có thể gây stack overflow với linked list rất dài (>1000 nodes)
- Tốn thêm không gian cho stack đệ quy
- Không thực tế hơn giải pháp vòng lặp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time        | Space             | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----------- | ----------------- | ------------------- | -------------------------- |
| Brute Force          | O(max(m,n)) | O(max(m,n))       | Dễ / Easy           | Mọi trường hợp, dễ hiểu    |
| Optimized            | O(max(m,n)) | O(max(m,n))       | Trung bình / Medium | Code cần gọn, hiện đại     |
| Recursive            | O(max(m,n)) | O(max(m,n)) stack | Khó / Hard          | Thích đệ quy, list ngắn    |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Helper function để tạo linked list từ array
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// Helper function để chuyển linked list sang array
function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// Test 1
const l1 = createList([2, 4, 3]);
const l2 = createList([5, 6, 4]);
const result = solution1_bruteForce(l1, l2);
console.log(listToArray(result)); // Expected: [7, 0, 8]
```

### Test Case 2: Edge case - Cả hai là số 0

```javascript
const l1 = createList([0]);
const l2 = createList([0]);
const result = solution1_bruteForce(l1, l2);
console.log(listToArray(result)); // Expected: [0]
```

### Test Case 3: Phức tạp - Có carry ở cuối

```javascript
const l1 = createList([9, 9, 9, 9, 9, 9, 9]);
const l2 = createList([9, 9, 9, 9]);
const result = solution1_bruteForce(l1, l2);
console.log(listToArray(result)); // Expected: [8, 9, 9, 9, 0, 0, 0, 1]
```

### Test Case 4: Độ dài khác nhau

```javascript
const l1 = createList([9, 9, 9]);
const l2 = createList([1]);
const result = solution1_bruteForce(l1, l2);
console.log(listToArray(result)); // Expected: [0, 0, 0, 1]
```

---

## 📚 Tài liệu tham khảo / References

- [Linked List](../../algorithms/data-structures/linked-list.md)
- [Two Pointers](../../algorithms/patterns/two-pointers.md)
- [LeetCode Discuss](https://leetcode.com/problems/add-two-numbers/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=wgFPrzTjm7s)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn sử dụng dummy node để tránh xử lý trường hợp đặc biệt cho node đầu tiên
- **Tip 2:** Hãy nhớ xử lý carry ở vòng lặp cuối cùng (khi cả hai list đã hết nhưng carry còn)
- **Tip 3:** Không cần chuyển linked list sang số nguyên vì có thể gây overflow với số rất lớn
- **Lỗi thường gặp:** Quên xử lý carry ở vị trí cuối cùng, dẫn đến kết quả sai khi tổng >= 10 ở vị trí cuối

---

_Last updated: 2026-02-03_
