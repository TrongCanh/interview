# Algorithms Interview Notes / Ghi chú Phỏng vấn Algorithms

> Ghi chú câu trả lời cho các câu hỏi phỏng vấn Algorithms / Notes for Algorithms interview answers

---

## 📊 Data Structures

### Arrays & Strings

**Two Sum:**

```javascript
// Brute Force: O(n²)
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}

// Hash Map: O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}
```

### Linked Lists

**Reverse Linked List:**

```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
```

**Detect Cycle (Floyd's Algorithm):**

```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
```

### Trees

**Tree Traversals:**

```javascript
// Inorder: Left, Root, Right
function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

// Preorder: Root, Left, Right
function preorder(root) {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}

// Postorder: Left, Right, Root
function postorder(root) {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}
```

**Level Order (BFS):**

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const level = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

### Graphs

**BFS:**

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length) {
    const node = queue.shift();
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

**DFS:**

```javascript
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;

  visited.add(node);
  console.log(node);

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
```

---

## 🔄 Algorithms

### Sorting

**Merge Sort: O(n log n)**

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

**Quick Sort: O(n log n) average**

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}
```

### Searching

**Binary Search: O(log n)**

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

### Two Pointers

**Container With Most Water:**

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, width * h);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return max;
}
```

**3Sum:**

```javascript
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
```

### Sliding Window

**Maximum Sum Subarray of Size K:**

```javascript
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Dynamic Programming

**Climbing Stairs:**

```javascript
// Fibonacci pattern
function climbStairs(n) {
  if (n <= 2) return n;

  let prev1 = 2;
  let prev2 = 1;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

**Coin Change:**

```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

---

## 📝 Coding Challenges

### 16. Binary Search Tree

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    this._insert(this.root, newNode);
  }

  _insert(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insert(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insert(node.right, newNode);
      }
    }
  }

  search(val) {
    return this._search(this.root, val);
  }

  _search(node, val) {
    if (!node) return false;
    if (node.val === val) return true;
    if (val < node.val) return this._search(node.left, val);
    return this._search(node.right, val);
  }
}
```

### 17. Queue using Two Stacks

```javascript
class Queue {
  constructor() {
    this.stack1 = []; // For enqueue
    this.stack2 = []; // For dequeue
  }

  enqueue(val) {
    this.stack1.push(val);
  }

  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }

  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
}
```

### 18. LRU Cache

```javascript
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key);
    this._remove(node);
    this._add(node);
    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this._remove(this.cache.get(key));
    }

    const node = new Node(key, value);
    this.cache.set(key, node);
    this._add(node);

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.cache.delete(lru.key);
    }
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
}
```

---

## 📊 Big O Complexity

| Algorithm      | Time (Best) | Time (Average) | Time (Worst) | Space    |
| -------------- | ----------- | -------------- | ------------ | -------- |
| Bubble Sort    | O(n)        | O(n²)          | O(n²)        | O(1)     |
| Selection Sort | O(n²)       | O(n²)          | O(n²)        | O(1)     |
| Insertion Sort | O(n)        | O(n²)          | O(n²)        | O(1)     |
| Merge Sort     | O(n log n)  | O(n log n)     | O(n log n)   | O(n)     |
| Quick Sort     | O(n log n)  | O(n log n)     | O(n²)        | O(log n) |
| Binary Search  | O(1)        | O(log n)       | O(log n)     | O(1)     |

---

_Last updated: 2026-01-30_
