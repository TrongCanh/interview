# Merge k Sorted Lists / Gộp k Danh Sách Đã Sắp Xếp

> LeetCode Problem 23 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 23
- **URL:** https://leetcode.com/problems/merge-k-sorted-lists/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** Linked List, Heap, Divide and Conquer
- **Tags:** Linked List, Heap, Divide and Conquer
- **Thuật toán liên quan / Related Algorithms:** Linked List, Heap, Divide and Conquer
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

**Merge all the linked-lists into one sorted linked-list and return it.**

**Example 1:**

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

**Example 2:**

```
Input: lists = []
Output: []
```

**Example 3:**

```
Input: lists = [[]]
Output: []
```

**Constraints:**

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` is sorted in ascending order.
- The sum of `lists[i].length` will not exceed `10^4`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng k danh sách liên kết đã được sắp xếp
- **Output:** Một danh sách liên kết đã được sắp xếp gộp từ tất cả các danh sách
- **Ràng buộc / Constraints:**
  - Mỗi danh sách đã được sắp xếp tăng dần
  - Tổng số phần tử không quá 10^4
  - k có thể lên đến 10^4
- **Edge cases:**
  - Mảng rỗng
  - Các danh sách rỗng
  - Chỉ có một danh sách
  - Các danh sách có độ dài khác nhau

### 2. Tư duy / Thinking Process

- **Bước 1:** Đây là bài toán mở rộng của "Merge Two Sorted Lists". Thay vì 2 danh sách, ta có k danh sách.
- **Bước 2:** Cách tiếp cận đơn giản nhất là gộp từng cặp danh sách, nhưng độ phức tạp sẽ cao.
- **Bước 3:** Có thể dùng Min-Heap để luôn lấy phần tử nhỏ nhất từ đầu mỗi danh sách. Hoặc dùng Divide and Conquer để gộp từng cặp.

### 3. Ví dụ minh họa / Examples

```
Example: lists = [[1,4,5],[1,3,4],[2,6]]

Với Min-Heap:
1. Khởi tạo heap với (1,0,0), (1,1,0), (2,2,0)
2. Lấy 1 từ list 0, thêm (4,0,1) vào heap
3. Lấy 1 từ list 1, thêm (3,1,1) vào heap
4. Lấy 2 từ list 2, thêm (6,2,1) vào heap
5. Lấy 3 từ list 1, thêm (4,1,2) vào heap
6. ... tiếp tục đến khi heap rỗng

Kết quả: [1,1,2,3,4,4,5,6]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Gộp từng cặp danh sách bằng cách sử dụng lại hàm mergeTwoLists.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về null
2. Khởi tạo result = lists[0]
3. Với mỗi danh sách còn lại, gộp vào result
4. Trả về result

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
 * Merge k Sorted Lists - Brute Force
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKLists_bruteForce(lists) {
  if (lists.length === 0) return null;

  let result = lists[0];

  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;
}

/**
 * Merge two sorted lists
 * @param {ListNode} l1 - First list
 * @param {ListNode} l2 - Second list
 * @return {ListNode} - Merged list
 */
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
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(k \* n) - mỗi lần gộp duyệt qua tất cả phần tử
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ (ngoài result)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Tận dụng lại hàm mergeTwoLists

### Nhược điểm / Cons

- Không tối ưu, độ phức tạp cao
- Gộp lại từ đầu nhiều lần

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force gộp lại từ đầu nhiều lần.
- Điểm yếu của giải pháp 1? O(k \* n) quá chậm với k lớn.
- Cách tiếp cận mới? Sử dụng Min-Heap để luôn lấy phần tử nhỏ nhất.

### Ý tưởng / Idea

Sử dụng Min-Heap (Priority Queue) để lưu trữ phần tử đầu của mỗi danh sách. Mỗi lần lấy phần tử nhỏ nhất và thêm phần tử tiếp theo từ danh sách đó vào heap.

### Thuật toán / Algorithm

1. Tạo Min-Heap
2. Thêm phần tử đầu của mỗi danh sách không rỗng vào heap
3. Khi heap không rỗng:
   - Lấy phần tử nhỏ nhất
   - Thêm vào result
   - Nếu danh sách đó còn phần tử, thêm phần tử tiếp theo vào heap
4. Trả về result

### Code / Implementation

```javascript
/**
 * Merge k Sorted Lists - Optimized (Min-Heap)
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKLists_heap(lists) {
  if (lists.length === 0) return null;

  // Min-Heap implementation using array
  const heap = [];

  // Add first node of each non-empty list to heap
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      heapPush(heap, lists[i]);
    }
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (heap.length > 0) {
    // Get minimum node
    const node = heapPop(heap);
    current.next = node;
    current = current.next;

    // Add next node from the same list
    if (node.next) {
      heapPush(heap, node.next);
    }
  }

  return dummy.next;
}

/**
 * Push node to min-heap
 * @param {ListNode[]} heap - Min-heap array
 * @param {ListNode} node - Node to push
 */
function heapPush(heap, node) {
  heap.push(node);
  let i = heap.length - 1;

  // Bubble up
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent].val <= heap[i].val) break;
    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
  }
}

/**
 * Pop minimum node from min-heap
 * @param {ListNode[]} heap - Min-heap array
 * @return {ListNode} - Minimum node
 */
function heapPop(heap) {
  if (heap.length === 0) return null;
  if (heap.length === 1) return heap.pop();

  const result = heap[0];
  heap[0] = heap.pop();

  // Bubble down
  let i = 0;
  const n = heap.length;

  while (true) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && heap[left].val < heap[smallest].val) {
      smallest = left;
    }
    if (right < n && heap[right].val < heap[smallest].val) {
      smallest = right;
    }

    if (smallest === i) break;

    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n \* log k) - mỗi phần tử được push/pop từ heap
- **Space Complexity:** O(k) - heap chứa tối đa k phần tử

### Ưu điểm / Pros

- Tối ưu hơn nhiều
- Không gộp lại từ đầu

### Nhược điểm / Cons

- Cần implement Min-Heap
- Phức tạp hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng Divide and Conquer.
- Có thuật toán/pattern nào phù hợp hơn? Divide and Conquer.

### Ý tưởng / Idea

Sử dụng Divide and Conquer để gộp từng cặp danh sách, giống như Merge Sort. Chia k danh sách thành các cặp, gộp từng cặp, lặp lại cho đến khi còn 1 danh sách.

### Thuật toán / Algorithm

1. Chia k danh sách thành các cặp
2. Gộp từng cặp
3. Lặp lại cho đến khi còn 1 danh sách
4. Tương tự Merge Sort nhưng với linked lists

### Code / Implementation

```javascript
/**
 * Merge k Sorted Lists - Advanced (Divide and Conquer)
 * @param {ListNode[]} lists - Array of sorted linked lists
 * @return {ListNode} - Merged sorted linked list
 */
function mergeKLists_divideConquer(lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  // Divide and conquer
  while (lists.length > 1) {
    const mergedLists = [];

    // Merge pairs
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }

    lists = mergedLists;
  }

  return lists[0];
}

/**
 * Merge two sorted lists
 * @param {ListNode} l1 - First list
 * @param {ListNode} l2 - Second list
 * @return {ListNode} - Merged list
 */
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
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n \* log k) - mỗi level gộp n phần tử, có log k levels
- **Space Complexity:** O(log k) - do đệ quy (nếu dùng đệ quy) hoặc O(1) (nếu dùng iteration)

### Ưu điểm / Pros

- Không cần implement Heap
- Tối ưu như Min-Heap
- Có thể parallelize

### Nhược điểm / Cons

- Phức tạp hơn để hiểu
- Cần nhiều lần gộp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution        | Time        | Space    | Độ khó / Difficulty | Khi nào dùng / When to use |
| --------------------------- | ----------- | -------- | ------------------- | -------------------------- |
| Brute Force                 | O(k\*n)     | O(1)     | Dễ / Easy           | k nhỏ, prototype nhanh     |
| Optimized (Min-Heap)        | O(n\*log k) | O(k)     | Khó / Hard          | Cần tối ưu, k lớn          |
| Advanced (Divide & Conquer) | O(n\*log k) | O(log k) | Khó / Hard          | Không muốn implement Heap  |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const lists = [
  createList([1, 4, 5]),
  createList([1, 3, 4]),
  createList([2, 6]),
];
const result = mergeKLists_heap(lists);
const expected = [1, 1, 2, 3, 4, 4, 5, 6];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 2: Mảng rỗng / Empty array

```javascript
const lists = [];
const result = mergeKLists_heap(lists);
console.log(result === null); // true
```

### Test Case 3: Các danh sách rỗng / Empty lists

```javascript
const lists = [[]];
const result = mergeKLists_heap(lists);
console.log(result === null); // true
```

### Test Case 4: Một danh sách / Single list

```javascript
const lists = [createList([1, 2, 3])];
const result = mergeKLists_heap(lists);
const expected = [1, 2, 3];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Test Case 5: Các danh sách rỗng trộn / Mixed empty lists

```javascript
const lists = [
  createList([]),
  createList([1]),
  createList([]),
  createList([2, 3]),
];
const result = mergeKLists_heap(lists);
const expected = [1, 2, 3];
console.log(listToArray(result).join(",") === expected.join(",")); // true
```

### Helper Functions

```javascript
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Linked List](../algorithms/data-structures/linked-list.md)
  - [Heap](../algorithms/data-structures/heap.md)
  - [Divide and Conquer](../algorithms/algorithms/divide-and-conquer.md)

- **Patterns liên quan:**
  - None
