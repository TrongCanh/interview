# Heap / Đống

> Cấu trúc dữ liệu Heap - Giải thích chi tiết / Heap Data Structure - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Heap** là một cấu trúc dữ liệu dạng cây nhị phân hoàn chỉnh (complete binary tree) thỏa mãn **heap property**:

- **Max Heap:** Mỗi node cha có giá trị lớn hơn hoặc bằng các node con
- **Min Heap:** Mỗi node cha có giá trị nhỏ hơn hoặc bằng các node con

Heap thường được implement bằng array vì nó là complete binary tree, giúp tối ưu bộ nhớ và truy cập nhanh.

### Các khái niệm cơ bản / Basic Concepts

- **Root:** Node ở vị trí index 0 trong array
- **Parent:** Node cha của node tại index i là tại index `Math.floor((i - 1) / 2)`
- **Left Child:** Node con trái của node tại index i là tại index `2 * i + 1`
- **Right Child:** Node con phải của node tại index i là tại index `2 * i + 2`
- **Heapify:** Quá trình duy trì heap property khi thêm hoặc xóa phần tử
- **Insert:** Thêm phần tử vào heap và duy trì heap property
- **Extract:** Lấy phần tử root (min hoặc max) và duy trì heap property

### Ví dụ thực tế / Real-world Examples

- **Priority Queue:** Task có độ ưu tiên cao nhất được xử lý trước
- **Heap Sort:** Sắp xếp mảng với time complexity O(n log n)
- **Dijkstra's Algorithm:** Tìm đường đi ngắn nhất trong đồ thị
- **K-Nearest Neighbors:** Tìm k điểm gần nhất

---

## 🎯 Khi nào dùng? / When to use?

- **Cần truy cập phần tử min/max nhanh nhất (O(1))**
- **Cần Priority Queue**
- **Cần sắp xếp với O(n log n)**
- **Cần tìm k phần tử lớn nhất/nhỏ nhất**
- **Cần implement thuật toán như Dijkstra, Prim**

---

## 🔄 Các biến thể / Variations

### Min Heap

Root là phần tử nhỏ nhất.

### Max Heap

Root là phần tử lớn nhất.

### Binary Heap

Heap với mỗi node có tối đa 2 con.

### Fibonacci Heap

Heap với hiệu năng tốt hơn cho một số thao tác (decrease key, merge).

### Binomial Heap

Heap cho phép merge hai heap hiệu quả.

---

## 💡 Code Template / Mẫu Code

### Cấu trúc Min Heap / Min Heap Structure

```javascript
/**
 * Min Heap - Đống nhỏ nhất
 * Root là phần tử nhỏ nhất
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Lấy index của parent
  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Lấy index của left child
  leftChild(index) {
    return 2 * index + 1;
  }

  // Lấy index của right child
  rightChild(index) {
    return 2 * index + 2;
  }

  // Hoán đổi hai phần tử
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Thêm phần tử vào heap (Insert)
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // Heapify Up: Duy trì heap property từ dưới lên
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.parent(index);

      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Lấy phần tử nhỏ nhất (Extract Min)
  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  // Heapify Down: Duy trì heap property từ trên xuống
  heapifyDown(index) {
    const size = this.heap.length;
    let smallest = index;

    while (true) {
      const left = this.leftChild(index);
      const right = this.rightChild(index);

      if (left < size && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < size && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      this.swap(index, smallest);
      index = smallest;
    }
  }

  // Xem phần tử nhỏ nhất (Peek)
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Kiểm tra heap rỗng
  isEmpty() {
    return this.heap.length === 0;
  }

  // Lấy kích thước heap
  size() {
    return this.heap.length;
  }
}

// Sử dụng Min Heap
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
console.log(minHeap.peek()); // 1
console.log(minHeap.extractMin()); // 1
console.log(minHeap.extractMin()); // 3
```

### Template cơ bản / Basic Template

```javascript
/**
 * Sử dụng Min Heap cơ bản - Basic Min Heap Usage
 */
function useMinHeap() {
  const heap = new MinHeap();

  // Thêm phần tử
  heap.insert(5);
  heap.insert(3);
  heap.insert(8);

  // Lấy phần tử nhỏ nhất
  while (!heap.isEmpty()) {
    console.log(heap.extractMin());
  }
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Max Heap - Đống lớn nhất
 * Root là phần tử lớn nhất
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChild(index) {
    return 2 * index + 1;
  }

  rightChild(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.parent(index);

      if (this.heap[parentIndex] >= this.heap[index]) {
        break;
      }

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return max;
  }

  heapifyDown(index) {
    const size = this.heap.length;
    let largest = index;

    while (true) {
      const left = this.leftChild(index);
      const right = this.rightChild(index);

      if (left < size && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < size && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      this.swap(index, largest);
      index = largest;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

// Sử dụng Max Heap
const maxHeap = new MaxHeap();
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
maxHeap.insert(1);
console.log(maxHeap.peek()); // 8
console.log(maxHeap.extractMax()); // 8
console.log(maxHeap.extractMax()); // 5
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: K phần tử lớn nhất

**Mô tả:** Tìm k phần tử lớn nhất trong mảng sử dụng Min Heap.

**Code:**

```javascript
/**
 * K phần tử lớn nhất - K Largest Elements
 * @param {number[]} nums - Mảng số
 * @param {number} k - Số phần tử lớn nhất cần tìm
 * @return {number[]} - K phần tử lớn nhất
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
function kLargest(nums, k) {
  const minHeap = new MinHeap();

  // Thêm k phần tử đầu tiên vào heap
  for (let i = 0; i < k; i++) {
    minHeap.insert(nums[i]);
  }

  // Duyệt qua các phần tử còn lại
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > minHeap.peek()) {
      minHeap.extractMin();
      minHeap.insert(nums[i]);
    }
  }

  // Lấy kết quả
  const result = [];
  while (!minHeap.isEmpty()) {
    result.push(minHeap.extractMin());
  }

  return result.reverse();
}

// Test
console.log(kLargest([3, 2, 1, 5, 6, 4], 2)); // [6, 5]
console.log(kLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // [6, 5, 5, 4]
```

### Ví dụ 2 / Example 2: Merge K Sorted Lists

**Mô tả:** Gộp k danh sách đã sắp xếp thành một danh sách đã sắp xếp.

**Code:**

```javascript
/**
 * Merge K Sorted Lists với Min Heap
 * @param {ListNode[]} lists - Mảng các danh sách đã sắp xếp
 * @return {ListNode} - Danh sách đã gộp
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  const minHeap = new MinHeap();

  // Thêm node đầu tiên của mỗi danh sách vào heap
  for (const list of lists) {
    if (list !== null) {
      minHeap.insert(list);
    }
  }

  const dummy = new ListNode();
  let current = dummy;

  while (!minHeap.isEmpty()) {
    const node = minHeap.extractMin();
    current.next = node;
    current = current.next;

    if (node.next !== null) {
      minHeap.insert(node.next);
    }
  }

  return dummy.next;
}

// Test
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));

const merged = mergeKLists([list1, list2, list3]);
// Kết quả: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
```

### Ví dụ 3 / Example 3: Top K Frequent Elements

**Mô tả:** Tìm k phần tử có tần suất xuất hiện cao nhất.

**Code:**

```javascript
/**
 * Top K Frequent Elements với Heap
 * @param {number[]} nums - Mảng số
 * @param {number} k - Số phần tử cần tìm
 * @return {number[]} - K phần tử có tần suất cao nhất
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(n)
 */
function topKFrequent(nums, k) {
  // Đếm tần suất
  const frequency = {};
  for (const num of nums) {
    frequency[num] = (frequency[num] || 0) + 1;
  }

  // Tạo Min Heap dựa trên tần suất
  const minHeap = new MinHeap();

  for (const [num, freq] of Object.entries(frequency)) {
    if (minHeap.size() < k) {
      minHeap.insert({ num: parseInt(num), freq });
    } else if (freq > minHeap.peek().freq) {
      minHeap.extractMin();
      minHeap.insert({ num: parseInt(num), freq });
    }
  }

  // Lấy kết quả
  const result = [];
  while (!minHeap.isEmpty()) {
    result.push(minHeap.extractMin().num);
  }

  return result;
}

// Test
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- [Task Scheduler](https://leetcode.com/problems/task-scheduler/)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation | Time Complexity | Space Complexity | Ghi chú / Notes |
| -------------------- | --------------- | ---------------- | --------------- |
| Insert               | O(log n)        | O(1)             | Heapify Up      |
| Extract Min/Max      | O(log n)        | O(1)             | Heapify Down    |
| Peek                 | O(1)            | O(1)             | Xem root        |
| IsEmpty              | O(1)            | O(1)             | Kiểm tra size   |
| Build Heap           | O(n)            | O(1)             | Từ mảng có sẵn  |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Nhầm lẫn Min Heap và Max Heap:** Min Heap có root nhỏ nhất, Max Heap có root lớn nhất
2. **Quên heapify:** Sau khi insert hoặc extract, phải heapify để duy trì heap property
3. **Index sai:** Công thức tính parent, left child, right child phải chính xác
4. **Không xử lý edge case:** Heap rỗng khi extract
5. **Sai comparator:** Khi so sánh object, cần so sánh đúng thuộc tính

---

## 💡 Tips & Tricks

1. **Array Implementation:** Heap thường implement bằng array vì là complete binary tree
2. **Min Heap cho K Largest:** Dùng Min Heap để tìm k phần tử lớn nhất (giữ k phần tử lớn nhất)
3. **Max Heap cho K Smallest:** Dùng Max Heap để tìm k phần tử nhỏ nhất
4. **Priority Queue:** Heap là cấu trúc dữ liệu mặc định cho Priority Queue
5. **Heap Sort:** Có thể sắp xếp mảng bằng cách extract liên tục từ heap

---

## 📚 Tài liệu tham khảo / References

- [Heap Data Structure - Wikipedia](<https://en.wikipedia.org/wiki/Heap_(data_structure)>)
- [Binary Heap - Wikipedia](https://en.wikipedia.org/wiki/Binary_heap)
- [Priority Queue - Wikipedia](https://en.wikipedia.org/wiki/Priority_queue)

---

_Last updated: 2025-02-03_
