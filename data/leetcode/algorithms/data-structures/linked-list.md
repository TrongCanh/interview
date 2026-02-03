# Linked List / Danh sách liên kết

> Cấu trúc dữ liệu động với các node được nối với nhau qua tham chiếu / Dynamic data structure with nodes connected via references

---

## 📚 Khái niệm / Concept

**Linked List** là một cấu trúc dữ liệu gồm các node, mỗi node chứa dữ liệu và tham chiếu đến node tiếp theo. Không giống array, các phần tử không được lưu trữ liên tiếp trong bộ nhớ.

**A Linked List** is a data structure consisting of nodes, each containing data and a reference to the next node. Unlike arrays, elements are not stored contiguously in memory.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần chèn/xóa thường xuyên
  - Không biết trước kích thước
  - Cần hiệu quả về không gian cho các thao tác chèn/xóa
  - Cần thực hiện Queue/Stack

- **Không dùng khi:**
  - Cần truy cập ngẫu nhiên (random access)
  - Cần tìm kiếm nhanh
  - Cần truy cập theo chỉ số

---

## 🔄 Các biến thể / Variations

### 1. Singly Linked List / Danh sách liên kết đơn

Mỗi node chỉ có tham chiếu đến node tiếp theo.

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

### 2. Doubly Linked List / Danh sách liên kết đôi

Mỗi node có tham chiếu đến node trước và sau.

```javascript
class DoublyListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
```

### 3. Circular Linked List / Danh sách liên kết vòng

Node cuối cùng tham chiếu đến node đầu tiên.

```javascript
// Singly Circular
class CircularListNode {
  constructor(val) {
    this.val = val;
    this.next = null; // Sẽ trỏ đến head khi thêm
  }
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template (Singly Linked List)

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Thêm vào cuối - O(1) với tail
  append(val) {
    const newNode = new ListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Thêm vào đầu - O(1)
  prepend(val) {
    const newNode = new ListNode(val);
    newNode.next = this.head;
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
  }

  // Xóa node có giá trị - O(n)
  remove(val) {
    if (!this.head) return false;

    if (this.head.val === val) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.val !== val) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.size--;
      return true;
    }

    return false;
  }

  // Tìm node - O(n)
  find(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) return current;
      current = current.next;
    }
    return null;
  }

  // Chuyển thành mảng - O(n)
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  // Đảo ngược - O(n)
  reverse() {
    let prev = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}
```

### Template nâng cao / Advanced Template (Doubly Linked List)

```javascript
class DoublyListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Thêm vào cuối - O(1)
  append(val) {
    const newNode = new DoublyListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  // Xóa node - O(n) để tìm, O(1) để xóa
  remove(node) {
    if (!node) return;

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    this.size--;
  }

  // Duyệt từ đầu đến cuối
  forEach(callback) {
    let current = this.head;
    while (current) {
      callback(current.val, current);
      current = current.next;
    }
  }

  // Duyệt từ cuối đến đầu
  forEachReverse(callback) {
    let current = this.tail;
    while (current) {
      callback(current.val, current);
      current = current.prev;
    }
  }
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Hợp nhất 2 danh sách liên kết / Merge Two Sorted Lists

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;

  return dummy.next;
}

// Time: O(n + m), Space: O(1)
```

### Ví dụ 2: Phát hiện vòng lặp / Detect Cycle

```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}

// Time: O(n), Space: O(1)
```

### Ví dụ 3: Đảo ngược danh sách liên kết / Reverse Linked List

```javascript
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/021-merge-two-sorted-lists.md`](../problems/easy/021-merge-two-sorted-lists.md)
- [`../problems/medium/002-add-two-numbers.md`](../problems/medium/002-add-two-numbers.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation                | Singly Linked List | Doubly Linked List |
| ----------------------------------- | ------------------ | ------------------ |
| Truy cập đầu / Access head          | O(1)               | O(1)               |
| Truy cập cuối / Access tail         | O(1) với tail      | O(1) với tail      |
| Truy cập ngẫu nhiên / Random access | O(n)               | O(n)               |
| Thêm đầu / Prepend                  | O(1)               | O(1)               |
| Thêm cuối / Append                  | O(1) với tail      | O(1) với tail      |
| Thêm giữa / Insert                  | O(n)               | O(n)               |
| Xóa đầu / Delete head               | O(1)               | O(1)               |
| Xóa cuối / Delete tail              | O(n)               | O(1) với tail      |
| Xóa giữa / Delete                   | O(n)               | O(n)               |
| Tìm kiếm / Search                   | O(n)               | O(n)               |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Lost reference**: Ghi đè tham chiếu mà không lưu lại
2. **Null pointer exception**: Truy cập next của null node
3. **Cycle in traversal**: Không kiểm tra điều kiện dừng đúng
4. **Memory leak**: Không xóa tham chiếu khi xóa node
5. **Off-by-one**: Duyệt quá nhiều hoặc quá ít

---

## 💡 Tips & Tricks

- Luôn kiểm tra null trước khi truy cập next
- Dùng dummy node để đơn giản hóa việc thêm/xóa đầu
- Dùng two pointers (slow, fast) để phát hiện cycle
- Dùng prev pointer để xóa node dễ hơn
- Vẽ hình để visualize linked list trước khi code
- Dùng tail pointer để thêm cuối O(1)

---

## 📚 Tài liệu tham khảo / References

- [Linked List - Wikipedia](https://en.wikipedia.org/wiki/Linked_list)
- [LeetCode - Linked List](https://leetcode.com/tag/linked-list/)

---

_Last updated: 2026-02-03_
