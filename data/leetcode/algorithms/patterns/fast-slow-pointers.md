# Fast Slow Pointers / Con trỏ nhanh chậm

> Pattern Fast Slow Pointers - Giải thích chi tiết / Fast Slow Pointers Pattern - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Fast Slow Pointers** (Con trỏ nhanh chậm) là một kỹ thuật trong đó chúng ta sử dụng hai con trỏ để duyệt qua một cấu trúc dữ liệu (thường là Linked List hoặc Array). Con trỏ nhanh di chuyển nhanh hơn con trỏ chậm (thường là 2 lần), và chúng ta sử dụng khoảng cách giữa hai con trỏ để giải quyết bài toán.

### Các khái niệm cơ bản / Basic Concepts

- **Fast Pointer (Con trỏ nhanh):** Di chuyển nhanh hơn (thường 2 bước/lần)
- **Slow Pointer (Con trỏ chậm):** Di chuyển chậm hơn (thường 1 bước/lần)
- **Gap (Khoảng cách):** Khoảng cách giữa fast và slow pointer
- **Cycle Detection (Phát hiện chu trình):** Kiểm tra xem có chu trình trong cấu trúc không
- **Middle Element (Phần tử giữa):** Tìm phần tử giữa của cấu trúc

### Ví dụ thực tế / Real-world Examples

- **Detect Cycle in Linked List:** Kiểm tra xem Linked List có chu trình không
- **Find Middle of Linked List:** Tìm phần tử giữa của Linked List
- **Find Nth Node from End:** Tìm phần tử thứ n từ cuối
- **Check Palindrome Linked List:** Kiểm tra xem Linked List có phải palindrome không

---

## 🎯 Khi nào dùng? / When to use?

- **Cần tìm phần tử giữa của cấu trúc**
- **Cần phát hiện chu trình trong Linked List**
- **Cần tìm phần tử từ cuối của Linked List**
- **Cần kiểm tra palindrome trong Linked List**
- **Cần tìm giao điểm của hai cấu trúc**

---

## 🔄 Các biến thể / Variations

### Standard Fast Slow Pointers

Fast pointer di chuyển 2 bước, slow pointer di chuyển 1 bước.

### Three Pointers

Sử dụng ba con trỏ để giải quyết bài toán phức tạp hơn.

### Variable Speed Fast Slow

Tốc độ của fast pointer có thể thay đổi dựa trên điều kiện.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Fast Slow Pointers cơ bản - Basic Fast Slow Pointers Template
 * @param {ListNode} head - Head của Linked List
 * @return {*} - Kết quả
 */
function fastSlowPointersTemplate(head) {
  // Khởi tạo fast và slow pointer
  let slow = head;
  let fast = head;

  // Duyệt với fast pointer đi nhanh hơn
  while (fast !== null && fast.next !== null) {
    // Fast pointer di chuyển 2 bước
    fast = fast.next.next;

    // Slow pointer di chuyển 1 bước
    slow = slow.next;
  }

  // Sử dụng slow pointer để có kết quả
  return slow; // hoặc return result dựa trên slow
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Fast Slow Pointers nâng cao - Advanced Fast Slow Pointers Template
 * Bao gồm cycle detection và edge case handling
 * @param {ListNode} head - Head của Linked List
 * @return {*} - Kết quả
 */
function fastSlowPointersAdvanced(head) {
  // Edge case: Linked List rỗng hoặc chỉ có 1 node
  if (head === null || head.next === null) {
    return head; // hoặc return appropriate result
  }

  // Khởi tạo fast và slow pointer
  let slow = head;
  let fast = head;

  // Duyệt với fast pointer đi nhanh hơn
  while (fast !== null && fast.next !== null) {
    // Fast pointer di chuyển 2 bước
    fast = fast.next.next;

    // Slow pointer di chuyển 1 bước
    slow = slow.next;

    // Kiểm tra điều kiện dừng (tùy bài toán)
    if (stopCondition(slow, fast)) {
      break;
    }
  }

  // Sử dụng slow pointer để có kết quả
  return processResult(slow, fast);
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Detect Cycle in Linked List

**Mô tả:** Kiểm tra xem Linked List có chu trình không.

**Code:**

```javascript
/**
 * Detect Cycle in Linked List - Phát hiện chu trình
 * @param {ListNode} head - Head của Linked List
 * @return {boolean} - True nếu có chu trình
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function hasCycle(head) {
  // Edge case: Linked List rỗng hoặc chỉ có 1 node
  if (head === null || head.next === null) {
    return false;
  }

  let slow = head;
  let fast = head;

  // Duyệt với fast pointer đi nhanh hơn
  while (fast !== null && fast.next !== null) {
    // Fast pointer di chuyển 2 bước
    fast = fast.next.next;

    // Slow pointer di chuyển 1 bước
    slow = slow.next;

    // Nếu fast gặp slow, có chu trình
    if (fast === slow) {
      return true;
    }
  }

  // Fast đến cuối, không có chu trình
  return false;
}

/**
 * Find Cycle Start Node - Tìm node bắt đầu chu trình
 * @param {ListNode} head - Head của Linked List
 * @return {ListNode|null} - Node bắt đầu chu trình
 */
function detectCycle(head) {
  let slow = head;
  let fast = head;

  // Duyệt để tìm meeting point
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      break;
    }
  }

  // Không có chu trình
  if (fast === null || fast.next === null) {
    return null;
  }

  // Tìm node bắt đầu chu trình
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

// Test
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Tạo Linked List có chu trình
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Tạo chu trình: 2 -> 3 -> 4 -> 2

console.log(hasCycle(node1)); // true
console.log(detectCycle(node1)?.val); // 2

// Tạo Linked List không có chu trình
const node5 = new ListNode(1);
const node6 = new ListNode(2);
const node7 = new ListNode(3);
node5.next = node6;
node6.next = node7;

console.log(hasCycle(node5)); // false
console.log(detectCycle(node5)); // null
```

### Ví dụ 2 / Example 2: Find Middle of Linked List

**Mô tả:** Tìm phần tử giữa của Linked List.

**Code:**

```javascript
/**
 * Find Middle of Linked List - Tìm phần tử giữa
 * @param {ListNode} head - Head của Linked List
 * @return {ListNode|null} - Phần tử giữa
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMiddle(head) {
  // Edge case: Linked List rỗng
  if (head === null) {
    return null;
  }

  let slow = head;
  let fast = head;

  // Duyệt với fast pointer đi nhanh hơn
  while (fast !== null && fast.next !== null) {
    // Fast pointer di chuyển 2 bước
    fast = fast.next.next;

    // Slow pointer di chuyển 1 bước
    slow = slow.next;
  }

  // Slow pointer ở giữa (hoặc gần giữa)
  return slow;
}

// Test
const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

console.log(findMiddle(list1)?.val); // 3

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = new ListNode(3);

console.log(findMiddle(list2)?.val); // 2
```

### Ví dụ 3 / Example 3: Check Palindrome Linked List

**Mô tả:** Kiểm tra xem Linked List có phải palindrome không.

**Code:**

```javascript
/**
 * Check Palindrome Linked List - Kiểm tra palindrome
 * @param {ListNode} head - Head của Linked List
 * @return {boolean} - True nếu là palindrome
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isPalindrome(head) {
  // Edge case: Linked List rỗng hoặc chỉ có 1 node
  if (head === null || head.next === null) {
    return true;
  }

  // Tìm phần tử giữa
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // Đảo ngược nửa sau của Linked List
  let prev = null;
  let current = slow;
  let reversed = null;

  while (current !== null) {
    const next = current.next;
    current.next = reversed;
    reversed = current;
    current = next;
  }

  // So sánh nửa đầu và nửa sau đã đảo ngược
  let first = head;
  let second = reversed;

  while (second !== null) {
    if (first.val !== second.val) {
      return false;
    }
    first = first.next;
    second = second.next;
  }

  return true;
}

// Test
const palindrome1 = new ListNode(1);
palindrome1.next = new ListNode(2);
palindrome1.next.next = new ListNode(1);

console.log(isPalindrome(palindrome1)); // true (1 -> 2 -> 1)

const notPalindrome = new ListNode(1);
notPalindrome.next = new ListNode(2);
notPalindrome.next.next = new ListNode(3);

console.log(isPalindrome(notPalindrome)); // false (1 -> 2 -> 3)
```

### Ví dụ 4 / Example 4: Find Nth Node from End

**Mô tả:** Tìm phần tử thứ n từ cuối của Linked List.

**Code:**

```javascript
/**
 * Find Nth Node from End - Tìm phần tử thứ n từ cuối
 * @param {ListNode} head - Head của Linked List
 * @param {number} n - Vị trí từ cuối
 * @return {ListNode|null} - Phần tử thứ n từ cuối
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findNthFromEnd(head, n) {
  // Edge case: Linked List rỗng hoặc n <= 0
  if (head === null || n <= 0) {
    return null;
  }

  let slow = head;
  let fast = head;

  // Di chuyển fast pointer n bước trước
  for (let i = 0; i < n; i++) {
    if (fast === null) {
      return null; // n lớn hơn độ dài Linked List
    }
    fast = fast.next;
  }

  // Duyệt với fast pointer đi nhanh hơn cho đến khi fast đến cuối
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // Slow pointer ở vị trí thứ n từ cuối
  return slow;
}

// Test
const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

console.log(findNthFromEnd(list, 2)?.val); // 4
console.log(findNthFromEnd(list, 1)?.val); // 5
console.log(findNthFromEnd(list, 5)?.val); // 1
```

### Ví dụ 5 / Example 5: Find Intersection of Two Linked Lists

**Mô tả:** Tìm giao điểm của hai Linked Lists.

**Code:**

```javascript
/**
 * Find Intersection of Two Linked Lists - Tìm giao điểm
 * @param {ListNode} headA - Head của Linked List thứ nhất
 * @param {ListNode} headB - Head của Linked List thứ hai
 * @return {ListNode|null} - Giao điểm
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
function getIntersectionNode(headA, headB) {
  // Edge case: một trong hai Linked List rỗng
  if (headA === null || headB === null) {
    return null;
  }

  let slowA = headA;
  let fastA = headA;

  // Tìm độ dài Linked List A
  let lenA = 0;
  while (fastA !== null && fastA.next !== null) {
    fastA = fastA.next.next;
    slowA = slowA.next;
    lenA++;
  }
  if (fastA !== null) lenA++;

  let slowB = headB;
  let fastB = headB;

  // Tìm độ dài Linked List B
  let lenB = 0;
  while (fastB !== null && fastB.next !== null) {
    fastB = fastB.next.next;
    slowB = slowB.next;
    lenB++;
  }
  if (fastB !== null) lenB++;

  // Reset pointer đến đầu của Linked List dài hơn
  let longHead = lenA > lenB ? headA : headB;
  let shortHead = lenA > lenB ? headB : headA;
  let diff = Math.abs(lenA - lenB);

  // Di chuyển longHead diff bước
  for (let i = 0; i < diff; i++) {
    longHead = longHead.next;
  }

  // Duyệt cả hai Linked List với cùng tốc độ
  while (longHead !== null && shortHead !== null) {
    if (longHead === shortHead) {
      return longHead;
    }
    longHead = longHead.next;
    shortHead = shortHead.next;
  }

  return null;
}

// Test
const listA = new ListNode(1);
listA.next = new ListNode(2);
listA.next.next = new ListNode(3);

const listB = new ListNode(4);
listB.next = new ListNode(5);
listB.next.next = new ListNode(6);

console.log(getIntersectionNode(listA, listB)?.val); // null

// Tạo Linked List có giao điểm
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;

const node4 = new ListNode(4);
node4.next = node2; // Giao điểm tại node2

console.log(getIntersectionNode(node1, node4)?.val); // 2
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)
- [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

---

## 📊 So sánh với các kỹ thuật khác / Comparison with Other Techniques

| Kỹ thuật / Technique | Ưu điểm / Pros        | Nhược điểm / Cons             | Khi nào dùng / When to use                 |
| -------------------- | --------------------- | ----------------------------- | ------------------------------------------ |
| Fast Slow Pointers   | O(n) time, O(1) space | Chỉ áp dụng cho Linked List   | Linked List, tìm giữa, phát hiện chu trình |
| Two Pointers         | Đơn giản, dễ hiểu     | Không tối ưu cho mọi bài toán | Mảng đã sắp xếp                            |
| Hash Map             | O(n) time             | O(n) space                    | Cần thêm bộ nhớ                            |
| Recursion            | Đơn giản              | O(n) space cho stack          | Cấu trúc đệ quy                            |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên edge case:** Luôn kiểm tra edge cases như Linked List rỗng
2. **Sai tốc độ:** Fast pointer phải di chuyển nhanh hơn slow pointer
3. **Quên kiểm tra null:** Luôn kiểm tra `fast !== null && fast.next !== null`
4. **Sai điều kiện dừng:** Điều kiện dừng phải đúng với bài toán
5. **Không xử lý chu trình:** Khi phát hiện chu trình, cần xử lý đúng

---

## 💡 Tips & Tricks

1. **Speed Ratio:** Fast pointer thường di chuyển 2 lần nhanh hơn slow pointer
2. **Edge Cases:** Luôn kiểm tra edge cases như Linked List rỗng hoặc chỉ có 1 node
3. **Cycle Detection:** Khi fast pointer gặp slow pointer, có chu trình
4. **Middle Element:** Slow pointer sẽ ở giữa (hoặc gần giữa) khi fast đến cuối
5. **Space Optimization:** Fast Slow Pointers chỉ dùng O(1) space

---

## 📚 Tài liệu tham khảo / References

- [Fast Slow Pointers - GeeksforGeeks](https://www.geeksforgeeks.org/fast-slow-pointers/)
- [Linked List Cycle - LeetCode](https://leetcode.com/problems/linked-list-cycle/)

---

_Last updated: 2025-02-03_
