# DFS & BFS Patterns / Pattern DFS và BFS

> Giải thích và ví dụ về pattern DFS và BFS / DFS and BFS pattern explanation and examples

---

## 📚 Khái niệm / Concept

### DFS (Depth-First Search)

- Duyệt sâu trước, đi hết một nhánh rồi mới chuyển nhánh khác
- Dùng stack (hoặc đệ quy)

### BFS (Breadth-First Search)

- Duyệt rộng trước, duyệt tất cả nodes cùng level trước
- Dùng queue

---

## 🎯 Khi nào dùng? / When to use?

### DFS

- Tìm đường đi trong maze
- Topological sort
- Detect cycles
- Path finding (tất cả đường đi)
- Permutations, Combinations

### BFS

- Tìm đường đi ngắn nhất (unweighted graph)
- Level order traversal
- Connected components
- Shortest path in unweighted graph

---

## 💡 Code Template / Mẫu Code

### DFS (Recursive)

```javascript
function dfs(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  visited.add(node);

  // Process current node
  console.log(node);

  // Visit neighbors
  for (const neighbor of graph[node]) {
    dfs(neighbor, visited);
  }
}
```

### DFS (Iterative)

```javascript
function dfsIterative(start) {
  const stack = [start];
  const visited = new Set();

  while (stack.length) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);

    // Process current node
    console.log(node);

    // Add neighbors to stack
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
```

### BFS

```javascript
function bfs(start) {
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length) {
    const node = queue.shift();

    // Process current node
    console.log(node);

    // Add neighbors to queue
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

---

## 📝 Ví dụ bài toán / Example Problems

### 1. Number of Islands

**URL:** https://leetcode.com/problems/number-of-islands/

**Approach:** DFS/BFS để đánh dấu các island

```javascript
function numIslands(grid) {
  if (!grid.length) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") {
      return;
    }

    grid[r][c] = "0"; // Mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}
```

### 2. Binary Tree Level Order Traversal

**URL:** https://leetcode.com/problems/binary-tree-level-order-traversal/

**Approach:** BFS để duyệt theo level

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

### 3. Clone Graph

**URL:** https://leetcode.com/problems/clone-graph/

**Approach:** DFS/BFS với hash map để track clones

```javascript
function cloneGraph(node) {
  if (!node) return null;

  const clones = new Map();

  function dfs(original) {
    if (clones.has(original.val)) {
      return clones.get(original.val);
    }

    const clone = new Node(original.val);
    clones.set(original.val, clone);

    for (const neighbor of original.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

### 4. Word Search

**URL:** https://leetcode.com/problems/word-search/

**Approach:** DFS với backtracking

```javascript
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== word[index]
    ) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = "#"; // Mark as visited

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    board[r][c] = temp; // Backtrack
    return found;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}
```

---

## 🎯 Practice Problems / Bài tập

### DFS

1. Number of Islands (Medium)
2. Clone Graph (Medium)
3. Word Search (Medium)
4. Surrounded Regions (Medium)
5. Course Schedule (Medium)

### BFS

1. Binary Tree Level Order Traversal (Medium)
2. Rotting Oranges (Medium)
3. Shortest Path in Binary Matrix (Medium)
4. Open the Lock (Medium)
5. Course Schedule II (Medium)

---

## ⚠️ Common Pitfalls / Lỗi thường gặp

1. Quên mark visited → infinite loop
2. Sai điều kiện boundary check
3. Quên backtrack trong backtracking
4. Sử dụng đệ quy → stack overflow cho graph lớn

---

## 📊 Complexity / Độ phức tạp

| Algorithm | Time     | Space |
| --------- | -------- | ----- |
| DFS       | O(V + E) | O(V)  |
| BFS       | O(V + E) | O(V)  |

**V** = số vertices, **E** = số edges

---

## 💡 Tips / Mẹo

1. Luôn mark visited khi visit node
2. BFS cho shortest path, DFS cho tất cả paths
3. Cẩn thận với đệ quy → dùng iterative cho graph lớn
4. Vẽ graph để hình dung traversal

---

## 🔄 Comparison / So sánh

| Đặc điểm / Feature | DFS                   | BFS                        |
| ------------------ | --------------------- | -------------------------- |
| Data Structure     | Stack                 | Queue                      |
| Memory Usage       | O(h)                  | O(w)                       |
| Best for           | Deep paths, all paths | Shortest path, level order |
| Implementation     | Recursive easier      | Iterative only             |

**h** = height, **w** = width

---

_Last updated: 2026-01-30_
