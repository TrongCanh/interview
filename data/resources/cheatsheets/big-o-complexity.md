# Big O Complexity Cheat Sheet

> Tham chiếu độ phức tạp thuật toán / Algorithm complexity reference

---

## 📊 Data Structures

| Data Structure     | Access       | Search       | Insertion    | Deletion     | Space   |
| ------------------ | ------------ | ------------ | ------------ | ------------ | ------- |
| Array              | O(1)         | O(n)         | O(n)         | O(n)         | O(n)    |
| Stack              | O(n)         | O(n)         | O(1)         | O(1)         | O(n)    |
| Queue              | O(n)         | O(n)         | O(1)         | O(1)         | O(n)    |
| Linked List        | O(n)         | O(n)         | O(1)         | O(1)         | O(n)    |
| Hash Table         | N/A          | O(1) avg     | O(1) avg     | O(1) avg     | O(n)    |
| Binary Search Tree | O(log n) avg | O(log n) avg | O(log n) avg | O(log n) avg | O(n)    |
| AVL Tree           | O(log n)     | O(log n)     | O(log n)     | O(log n)     | O(n)    |
| Red-Black Tree     | O(log n)     | O(log n)     | O(log n)     | O(log n)     | O(n)    |
| B-Tree             | O(log n)     | O(log n)     | O(log n)     | O(log n)     | O(n)    |
| Trie               | O(m)         | O(m)         | O(m)         | O(m)         | O(n\*m) |

---

## 🔄 Sorting Algorithms

| Algorithm      | Best       | Average    | Worst      | Space    | Stable |
| -------------- | ---------- | ---------- | ---------- | -------- | ------ |
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes    |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     | No     |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     | Yes    |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes    |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) | No     |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     | No     |
| Counting Sort  | O(n + k)   | O(n + k)   | O(n + k)   | O(k)     | Yes    |
| Radix Sort     | O(nk)      | O(nk)      | O(nk)      | O(n + k) | Yes    |
| Bucket Sort    | O(n + k)   | O(n + k)   | O(n²)      | O(n)     | Yes    |

---

## 🔍 Searching Algorithms

| Algorithm     | Best     | Average  | Worst    | Space |
| ------------- | -------- | -------- | -------- | ----- |
| Linear Search | O(1)     | O(n)     | O(n)     | O(1)  |
| Binary Search | O(1)     | O(log n) | O(log n) | O(1)  |
| BFS           | O(V + E) | O(V + E) | O(V + E) | O(V)  |
| DFS           | O(V + E) | O(V + E) | O(V + E) | O(V)  |

---

## 🎯 Common Algorithms

| Algorithm        | Time             | Space    | Use Case               |
| ---------------- | ---------------- | -------- | ---------------------- |
| Two Pointers     | O(n)             | O(1)     | Sorted arrays, pairs   |
| Sliding Window   | O(n)             | O(1)     | Subarrays, substrings  |
| Binary Search    | O(log n)         | O(1)     | Sorted data            |
| Merge Sort       | O(n log n)       | O(n)     | Sorting                |
| Quick Sort       | O(n log n) avg   | O(log n) | Sorting                |
| DFS              | O(V + E)         | O(V)     | Graph traversal        |
| BFS              | O(V + E)         | O(V)     | Shortest path          |
| Dijkstra         | O((V + E) log V) | O(V)     | Shortest path weighted |
| Floyd-Warshall   | O(V³)            | O(V²)    | All pairs shortest     |
| Topological Sort | O(V + E)         | O(V)     | DAG ordering           |
| Kruskal's        | O(E log E)       | O(V + E) | MST                    |
| Prim's           | O(E log V)       | O(V)     | MST                    |
| KMP              | O(n + m)         | O(m)     | Pattern matching       |

---

## 📐 Dynamic Programming Patterns

| Pattern            | Time  | Space | Example                        |
| ------------------ | ----- | ----- | ------------------------------ |
| 0/1 Knapsack       | O(nW) | O(nW) | Knapsack                       |
| Unbounded Knapsack | O(nW) | O(W)  | Coin Change                    |
| LCS                | O(nm) | O(nm) | Longest Common Subsequence     |
| LIS                | O(n²) | O(n)  | Longest Increasing Subsequence |
| Palindrome         | O(n²) | O(n²) | Longest Palindromic Substring  |
| Matrix Chain       | O(n³) | O(n²) | Matrix Multiplication          |
| Subset Sum         | O(nS) | O(S)  | Partition Equal Subset Sum     |

---

## 🧮 Mathematical Operations

| Operation             | Time              | Notes                 |
| --------------------- | ----------------- | --------------------- |
| Addition              | O(1)              |                       |
| Subtraction           | O(1)              |                       |
| Multiplication        | O(1)              | For small numbers     |
| Division              | O(1)              | For small numbers     |
| Modulo                | O(1)              |                       |
| Power (x^n)           | O(log n)          | Binary exponentiation |
| GCD                   | O(log(min(a, b))) | Euclidean algorithm   |
| Factorial             | O(n)              |                       |
| Fibonacci (recursive) | O(2^n)            |                       |
| Fibonacci (DP)        | O(n)              |                       |
| Fibonacci (matrix)    | O(log n)          |                       |

---

## 🎲 Common Time Complexities (Sorted)

| Complexity | Name         | Example               |
| ---------- | ------------ | --------------------- |
| O(1)       | Constant     | Array access          |
| O(log n)   | Logarithmic  | Binary search         |
| O(n)       | Linear       | Linear search         |
| O(n log n) | Linearithmic | Merge sort            |
| O(n²)      | Quadratic    | Bubble sort           |
| O(n³)      | Cubic        | Matrix multiplication |
| O(2^n)     | Exponential  | Recursive Fibonacci   |
| O(n!)      | Factorial    | Permutations          |

---

## 📝 Notes

- **n** = size of input
- **m** = length of pattern/string
- **V** = number of vertices
- **E** = number of edges
- **W** = weight/capacity
- **k** = range of values
- **avg** = average case
- **worst** = worst case

---

_Last updated: 2026-01-30_
