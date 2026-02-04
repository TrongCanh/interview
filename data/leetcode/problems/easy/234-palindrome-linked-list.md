# Palindrome Linked List / Danh Sách Liên Kết Đối Xứng

> LeetCode Problem 234 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 234
- **URL:** https://leetcode.com/problems/palindrome-linked-list/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Linked List, Two Pointers, Stack, Recursion
- **Tags:** Linked List, Two Pointers, Stack, Recursion
- **Thuật toán liên quan / Related Algorithms:** Linked List, Two Pointers, Stack, Recursion
- **Patterns liên quan / Related Patterns:** Fast Slow Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.

**Example 1:**

```
Input: head = [1,2,2,1]
Output: true
Explanation: The list reads the same forward and backward.
```

**Example 2:**

```
Input: head = [1,2]
Output: false
```

**Constraints:**

- The number of nodes in the list is in the range `[1, 10^5]`.
- `0 <= Node.val <= 9`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Nút đầu `head` của singly linked list
- **Output:** `true` nếu linked list là palindrome (đọc xuôi và ngược như nhau), `false` nếu không
- **Ràng buộc / Constraints:**
  - Số lượng nút: 1 ≤ n ≤ 10^5
  - Giá trị nút: 0 ≤ Node.val ≤ 9
- **Edge cases:**
  - Linked list chỉ có 1 nút: luôn là palindrome
  - Linked list có 2 nút giống nhau: là palindrome
  - Linked list có 2 nút khác nhau: không phải palindrome

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần kiểm tra xem linked list có phải palindrome không
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Array, Stack, hoặc Reverse nửa sau
- **Bước 3:** Lên kế hoạch giải pháp - Array (O(n) time, O(n) space), Stack (O(n) time, O(n) space), Reverse (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: head = [1,2,2,1]

Phương pháp Array:
- Chuyển sang array: [1,2,2,1]
- So sánh array với reverse: [1,2,2,1] === [1,2,2,1] → true

Phương pháp Reverse:
- Tìm middle: slow=2, fast=null
- Reverse nửa sau: [1,2,2,1] → [1,2] và [1,2]
- So sánh: 1==1, 2==2 → true

Example 2: head = [1,2]

Phương pháp Array:
- Chuyển sang array: [1,2]
- So sánh array với reverse: [1,2] === [2,1] → false
```

---

## 💡 Giải pháp 1: Brute Force - Convert to Array (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển linked list sang array, sau đó so sánh array với array đảo ngược.

### Thuật toán / Algorithm

1. Chuyển linked list sang array
2. Tạo bản sao của array và đảo ngược
3. So sánh array gốc với array đảo ngược
4. Trả về kết quả

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
 * Palindrome Linked List - Convert to Array Solution
 * @param {ListNode} head - Nút đầu của linked list
 * @return {boolean} - true nếu là palindrome, false nếu không
 */
function isPalindrome_bruteForce(head) {
  // Chuyển linked list sang array
  const values = [];
  let current = head;
  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }

  // So sánh array với array đảo ngược
  const reversed = [...values].reverse();
  return values.join(",") === reversed.join(",");
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt linked list một lần, reverse array O(n)
- **Space Complexity:** O(n) - Lưu trữ array chứa n phần tử

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code ngắn gọn
- Dễ debug

### Nhược điểm / Cons

- Tốn O(n) bộ nhớ
- Không tối ưu cho linked list lớn

---

## 🚀 Giải pháp 2: Optimized - Stack (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Array tốn O(n) bộ nhớ
- Điểm yếu của giải pháp 1? Tốn nhiều bộ nhớ, không tận dụng tính chất linked list
- Cách tiếp cận mới? Sử dụng Stack để so sánh nửa đầu với nửa sau

### Ý tưởng / Idea

Dùng Fast-Slow Pointers để tìm middle của linked list. Đẩy nửa đầu vào stack. Sau đó so sánh nửa sau với các phần tử trong stack.

### Thuật toán / Algorithm

1. Dùng Fast-Slow Pointers để tìm middle:
   - `slow` di chuyển 1 bước, `fast` di chuyển 2 bước
2. Đẩy các phần tử từ đầu đến `slow` vào stack
3. Nếu số lượng nút lẻ, bỏ qua `slow` (nút giữa)
4. Di chuyển `slow` đến cuối, so sánh từng phần tử với stack
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Palindrome Linked List - Stack Solution
 * @param {ListNode} head - Nút đầu của linked list
 * @return {boolean} - true nếu là palindrome, false nếu không
 */
function isPalindrome_optimized(head) {
  const stack = [];
  let slow = head;
  let fast = head;

  // Tìm middle của linked list
  while (fast !== null && fast.next !== null) {
    stack.push(slow.val);
    slow = slow.next;
    fast = fast.next.next;
  }

  // Nếu số lượng nút lẻ, bỏ qua nút giữa
  if (fast !== null) {
    slow = slow.next;
  }

  // So sánh nửa sau với stack
  while (slow !== null) {
    const top = stack.pop();
    if (top !== slow.val) {
      return false;
    }
    slow = slow.next;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt linked list một lần
- **Space Complexity:** O(n) - Stack chứa n/2 phần tử

### Ưu điểm / Pros

- Code rõ ràng, dễ hiểu
- Tận dụng Fast-Slow Pointers pattern
- Không cần reverse linked list

### Nhược điểm / Cons

- Vẫn tốn O(n) bộ nhớ cho stack
- Không tối ưu về space

---

## ⚡ Giải pháp 3: Advanced - Reverse Half (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, giảm space complexity xuống O(1)
- Có thuật toán/pattern nào phù hợp hơn? Reverse linked list nửa sau

### Ý tưởng / Idea

Dùng Fast-Slow Pointers để tìm middle. Reverse nửa sau của linked list. So sánh nửa đầu với nửa sau đã reverse. Cuối cùng, reverse lại nửa sau để khôi phục linked list gốc (optional).

### Thuật toán / Algorithm

1. Dùng Fast-Slow Pointers để tìm middle:
   - `slow` di chuyển 1 bước, `fast` di chuyển 2 bước
2. Reverse nửa sau của linked list (từ `slow` trở đi)
3. So sánh nửa đầu với nửa sau đã reverse
4. (Optional) Reverse lại nửa sau để khôi phục linked list gốc
5. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Palindrome Linked List - Reverse Half Solution
 * @param {ListNode} head - Nút đầu của linked list
 * @return {boolean} - true nếu là palindrome, false nếu không
 */
function isPalindrome_advanced(head) {
  // Tìm middle của linked list
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse nửa sau của linked list
  let prev = null;
  let current = slow;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // So sánh nửa đầu với nửa sau đã reverse
  let left = head;
  let right = prev;
  let result = true;
  while (right !== null) {
    if (left.val !== right.val) {
      result = false;
      break;
    }
    left = left.next;
    right = right.next;
  }

  // (Optional) Reverse lại nửa sau để khôi phục linked list gốc
  // Trong thực tế, có thể bỏ qua bước này

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt linked list một lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Độ phức tạp space tối ưu O(1)
- Không tốn thêm bộ nhớ đáng kể
- Tận dụng tốt tính chất linked list

### Nhược điểm / Cons

- Code phức tạp hơn
- Cần hiểu về reverse linked list
- Thay đổi cấu trúc linked list (có thể khôi phục nếu cần)

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Convert to Array     | O(n) | O(n)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| Stack                | O(n) | O(n)  | Trung bình / Medium | Muốn áp dụng pattern       |
| Reverse Half         | O(n) | O(1)  | Khó / Hard          | Cần tối ưu space           |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
// Tạo linked list: [1,2,2,1]
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

const expected = true;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

### Test Case 2: Không phải palindrome / Not Palindrome

```javascript
// Tạo linked list: [1,2]
const head = new ListNode(1);
head.next = new ListNode(2);

const expected = false;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

### Test Case 3: 1 nút / Single Node

```javascript
// Tạo linked list: [1]
const head = new ListNode(1);

const expected = true;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

### Test Case 4: Số lượng nút lẻ / Odd Number of Nodes

```javascript
// Tạo linked list: [1,2,3,2,1]
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

const expected = true;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

### Test Case 5: Giá trị 0 / Zero Values

```javascript
// Tạo linked list: [0,0]
const head = new ListNode(0);
head.next = new ListNode(0);

const expected = true;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

### Test Case 6: Linked list dài / Long List

```javascript
// Tạo linked list: [1,2,3,4,5,4,3,2,1]
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);
head.next.next.next.next.next = new ListNode(4);
head.next.next.next.next.next.next = new ListNode(3);
head.next.next.next.next.next.next.next = new ListNode(2);
head.next.next.next.next.next.next.next.next = new ListNode(1);

const expected = true;
const result = isPalindrome_bruteForce(head);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)
  - [Stack](../algorithms/data-structures/stack.md)
  - [Recursion](../algorithms/algorithms/recursion.md)

- **Patterns liên quan:**
  - [Fast Slow Pointers](../algorithms/patterns/fast-slow-pointers.md)

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Fast-Slow Pointers Pattern:**
   - `slow` di chuyển 1 bước mỗi lần
   - `fast` di chuyển 2 bước mỗi lần
   - Khi `fast` đến cuối, `slow` ở middle

2. **Reverse Linked List:**

   ```javascript
   let prev = null;
   let current = head;
   while (current !== null) {
     const next = current.next;
     current.next = prev;
     prev = current;
     current = next;
   }
   ```

3. **Palindrome Check:**
   - Array: so sánh với reverse
   - Linked List: reverse nửa sau hoặc dùng stack

4. **Edge Cases:**
   - Linked list chỉ có 1 nút: luôn là palindrome
   - Số lượng nút lẻ: nút giữa không cần so sánh

5. **Space Complexity Trade-off:**
   - Array/Stack: O(n) space, code đơn giản
   - Reverse: O(1) space, code phức tạp

6. **Lưu ý về khôi phục linked list:**
   - Nếu cần giữ nguyên linked list gốc, nên reverse lại nửa sau
   - Trong bài toán này, không cần khôi phục theo đề bài

---

_Last updated: 2025-02-04_
