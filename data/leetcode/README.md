# LeetCode Practice / Luyện tập LeetCode

> Hướng dẫn và tài liệu luyện tập LeetCode với cấu trúc bài toán và thuật toán chi tiết / LeetCode practice guide with detailed problem and algorithm structure

---

## 📋 Mục lục / Table of Contents

- [Cấu trúc Folder / Folder Structure](#cấu-trúc-folder--folder-structure)
- [Cách sử dụng / How to Use](#cách-sử-dụng--how-to-use)
- [Danh sách Bài toán / Problem List](#danh-sách-bài-toán--problem-list)
- [Danh sách Thuật toán / Algorithm List](#danh-sách-thuật-toán--algorithm-list)

---

## 📁 Cấu trúc Folder / Folder Structure

```
leetcode/
├── 📁 problems/                    # Bài toán LeetCode / LeetCode Problems
│   ├── 📁 easy/                    # Dễ / Easy
│   │   ├── 001-two-sum.md
│   │   ├── 002-reverse-integer.md
│   │   └── ...
│   ├── 📁 medium/                  # Trung bình / Medium
│   │   └── ...
│   ├── 📁 hard/                    # Khó / Hard
│   │   └── ...
│   └── 📄 README.md                # Danh sách bài toán
│
├── 📁 algorithms/                  # Thuật toán & Patterns / Algorithms & Patterns
│   ├── 📁 data-structures/         # Cấu trúc dữ liệu
│   │   ├── array.md
│   │   ├── linked-list.md
│   │   ├── stack.md
│   │   ├── queue.md
│   │   ├── hash-table.md
│   │   ├── tree.md
│   │   ├── graph.md
│   │   └── heap.md
│   │
│   ├── 📁 algorithms/              # Các thuật toán
│   │   ├── sorting.md
│   │   ├── searching.md
│   │   ├── binary-search.md
│   │   ├── recursion.md
│   │   ├── divide-and-conquer.md
│   │   └── greedy.md
│   │
│   ├── 📁 patterns/                # Các pattern tư duy
│   │   ├── two-pointers.md
│   │   ├── sliding-window.md
│   │   ├── fast-slow-pointers.md
│   │   └── merge-intervals.md
│   │
│   ├── 📁 dynamic-programming/     # Dynamic Programming
│   │   ├── dp-basics.md
│   │   ├── dp-1d.md
│   │   ├── dp-2d.md
│   │   ├── knapsack.md
│   │   └── lcs.md
│   │
│   ├── 📁 graph-algorithms/        # Thuật toán đồ thị
│   │   ├── bfs.md
│   │   ├── dfs.md
│   │   ├── dijkstra.md
│   │   ├── topological-sort.md
│   │   └── union-find.md
│   │
│   └── 📄 README.md                # Danh sách thuật toán
│
└── 📄 README.md                    # File này / This file
```

---

## 🚀 Cách sử dụng / How to Use

### 1. Làm bài toán LeetCode / Solve LeetCode Problems

Mở folder [`problems/`](problems/) và chọn độ khó phù hợp:

- **Easy**: Bắt đầu với các bài cơ bản
- **Medium**: Khi đã quen với easy
- **Hard**: Khi muốn thách thức

Mỗi file bài toán bao gồm:

- **Đề bài nguyên bản**: Copy từ LeetCode
- **Đánh giá độ khó**: Easy/Medium/Hard
- **Phân tích đề bài**: Hiểu input, output, constraints
- **Tư duy giải quyết**: Quy trình suy nghĩ
- **3 giải pháp**:
  - Giải pháp 1: Brute Force (cơ bản nhất)
  - Giải pháp 2: Optimized (cải tiến)
  - Giải pháp 3: Advanced (nâng cao)
- **Code JavaScript**: Mỗi giải pháp có code đầy đủ
- **Độ phức tạp**: Time và Space complexity
- **Test cases**: Các test case để kiểm tra
- **Liên kết thuật toán**: Tham chiếu đến thuật toán/pattern liên quan

### 2. Học thuật toán và patterns / Learn Algorithms and Patterns

Mở folder [`algorithms/`](algorithms/) để học:

- **Cấu trúc dữ liệu**: Array, Linked List, Stack, Queue, Hash Table, Tree, Graph, Heap
- **Thuật toán**: Sorting, Searching, Binary Search, Recursion, Divide and Conquer, Greedy
- **Patterns tư duy**: Two Pointers, Sliding Window, Fast Slow Pointers, Merge Intervals
- **Dynamic Programming**: DP Basics, DP 1D, DP 2D, Knapsack, LCS
- **Thuật toán đồ thị**: BFS, DFS, Dijkstra, Topological Sort, Union Find

Mỗi file thuật toán bao gồm:

- **Khái niệm**: Giải thích chi tiết
- **Khi nào dùng**: Điều kiện áp dụng
- **Code template**: Mẫu code có thể tái sử dụng
- **Ví dụ minh họa**: Các ví dụ cụ thể
- **Liên kết bài toán**: Các bài toán LeetCode sử dụng thuật toán này

### 3. Quy trình làm việc / Workflow

```
1. Chọn bài toán → Đọc đề bài → Phân tích
2. Tìm giải pháp Brute Force → Code → Test
3. Tìm giải pháp Optimized → Code → Test
4. Tìm giải pháp Advanced → Code → Test
5. Học thuật toán/pattern liên quan
6. Luyện tập thêm các bài toán tương tự
```

---

## 📊 Danh sách Bài toán / Problem List

### Easy Problems / Bài toán Dễ

| #   | Tên bài toán / Problem Name         | File / File                                                                                              | Tags / Tags               |
| --- | ----------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| 1   | Two Sum                             | [`001-two-sum.md`](problems/easy/001-two-sum.md)                                                         | Array, Hash Map           |
| 2   | Reverse Integer                     | [`002-reverse-integer.md`](problems/easy/002-reverse-integer.md)                                         | Math                      |
| 3   | Palindrome Number                   | [`003-palindrome-number.md`](problems/easy/003-palindrome-number.md)                                     | Two Pointers              |
| 4   | Roman to Integer                    | [`004-roman-to-integer.md`](problems/easy/004-roman-to-integer.md)                                       | Hash Map                  |
| 5   | Longest Common Prefix               | [`005-longest-common-prefix.md`](problems/easy/005-longest-common-prefix.md)                             | String                    |
| 6   | Valid Parentheses                   | [`006-valid-parentheses.md`](problems/easy/006-valid-parentheses.md)                                     | Stack                     |
| 7   | Merge Two Sorted Lists              | [`007-merge-two-sorted-lists.md`](problems/easy/007-merge-two-sorted-lists.md)                           | Linked List, Two Pointers |
| 8   | Remove Duplicates from Sorted Array | [`008-remove-duplicates-from-sorted-array.md`](problems/easy/008-remove-duplicates-from-sorted-array.md) | Array, Two Pointers       |
| 9   | Remove Element                      | [`009-remove-element.md`](problems/easy/009-remove-element.md)                                           | Array, Two Pointers       |
| 10  | Search Insert Position              | [`010-search-insert-position.md`](problems/easy/010-search-insert-position.md)                           | Array, Binary Search      |
| 11  | Length of Last Word                 | [`011-length-of-last-word.md`](problems/easy/011-length-of-last-word.md)                                 | String                    |
| 12  | Plus One                            | [`012-plus-one.md`](problems/easy/012-plus-one.md)                                                       | Array, Math               |
| 13  | Add Binary                          | [`013-add-binary.md`](problems/easy/013-add-binary.md)                                                   | String, Math              |
| 14  | Sqrt(x)                             | [`014-sqrtx.md`](problems/easy/014-sqrtx.md)                                                             | Math, Binary Search       |
| 15  | Climbing Stairs                     | [`015-climbing-stairs.md`](problems/easy/015-climbing-stairs.md)                                         | DP, Fibonacci             |
| 16  | Remove Duplicates from Sorted List  | [`016-remove-duplicates-from-sorted-list.md`](problems/easy/016-remove-duplicates-from-sorted-list.md)   | Linked List               |
| 17  | Merge Sorted Array                  | [`017-merge-sorted-array.md`](problems/easy/017-merge-sorted-array.md)                                   | Array, Two Pointers       |
| 18  | Binary Tree Inorder Traversal       | [`018-binary-tree-inorder-traversal.md`](problems/easy/018-binary-tree-inorder-traversal.md)             | Tree, DFS                 |
| 19  | Same Tree                           | [`019-same-tree.md`](problems/easy/019-same-tree.md)                                                     | Tree, DFS                 |
| 20  | Symmetric Tree                      | [`020-symmetric-tree.md`](problems/easy/020-symmetric-tree.md)                                           | Tree, DFS, BFS            |

### Medium Problems / Bài toán Trung bình

| #   | Tên bài toán / Problem Name                    | File / File                                                                                                                      | Tags / Tags            |
| --- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | 3Sum                                           | [`003-3sum.md`](problems/medium/003-3sum.md)                                                                                     | Array, Two Pointers    |
| 2   | Longest Substring Without Repeating Characters | [`003-longest-substring-without-repeating-characters.md`](problems/medium/003-longest-substring-without-repeating-characters.md) | String, Sliding Window |
| 3   | Container With Most Water                      | [`011-container-with-most-water.md`](problems/medium/011-container-with-most-water.md)                                           | Array, Two Pointers    |
| 4   | Add Two Numbers                                | [`002-add-two-numbers.md`](problems/medium/002-add-two-numbers.md)                                                               | Linked List            |
| 5   | Valid Parentheses String                       | [`678-valid-parenthesis-string.md`](problems/medium/678-valid-parenthesis-string.md)                                             | String, Stack, DP      |

### Hard Problems / Bài toán Khó

| #   | Tên bài toán / Problem Name | File / File                                                              | Tags / Tags                |
| --- | --------------------------- | ------------------------------------------------------------------------ | -------------------------- |
| 1   | Trapping Rain Water         | [`042-trapping-rain-water.md`](problems/hard/042-trapping-rain-water.md) | Array, Two Pointers, Stack |

---

## 📚 Danh sách Thuật toán / Algorithm List

### Cấu trúc dữ liệu / Data Structures

| Tên / Name  | File / File                                                   |
| ----------- | ------------------------------------------------------------- |
| Array       | [`array.md`](algorithms/data-structures/array.md)             |
| Linked List | [`linked-list.md`](algorithms/data-structures/linked-list.md) |
| Stack       | [`stack.md`](algorithms/data-structures/stack.md)             |
| Queue       | [`queue.md`](algorithms/data-structures/queue.md)             |
| Hash Table  | [`hash-table.md`](algorithms/data-structures/hash-table.md)   |
| Tree        | [`tree.md`](algorithms/data-structures/tree.md)               |
| Graph       | [`graph.md`](algorithms/data-structures/graph.md)             |
| Heap        | [`heap.md`](algorithms/data-structures/heap.md)               |

### Thuật toán / Algorithms

| Tên / Name         | File / File                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| Sorting            | [`sorting.md`](algorithms/algorithms/sorting.md)                       |
| Searching          | [`searching.md`](algorithms/algorithms/searching.md)                   |
| Binary Search      | [`binary-search.md`](algorithms/algorithms/binary-search.md)           |
| Recursion          | [`recursion.md`](algorithms/algorithms/recursion.md)                   |
| Divide and Conquer | [`divide-and-conquer.md`](algorithms/algorithms/divide-and-conquer.md) |
| Greedy             | [`greedy.md`](algorithms/algorithms/greedy.md)                         |

### Patterns tư duy / Thinking Patterns

| Tên / Name         | File / File                                                          |
| ------------------ | -------------------------------------------------------------------- |
| Two Pointers       | [`two-pointers.md`](algorithms/patterns/two-pointers.md)             |
| Sliding Window     | [`sliding-window.md`](algorithms/patterns/sliding-window.md)         |
| Fast Slow Pointers | [`fast-slow-pointers.md`](algorithms/patterns/fast-slow-pointers.md) |
| Merge Intervals    | [`merge-intervals.md`](algorithms/patterns/merge-intervals.md)       |

### Dynamic Programming / Lập trình động

| Tên / Name                       | File / File                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| DP Basics                        | [`dp-basics.md`](algorithms/dynamic-programming/dp-basics.md) |
| DP 1D                            | [`dp-1d.md`](algorithms/dynamic-programming/dp-1d.md)         |
| DP 2D                            | [`dp-2d.md`](algorithms/dynamic-programming/dp-2d.md)         |
| Knapsack                         | [`knapsack.md`](algorithms/dynamic-programming/knapsack.md)   |
| LCS (Longest Common Subsequence) | [`lcs.md`](algorithms/dynamic-programming/lcs.md)             |

### Thuật toán đồ thị / Graph Algorithms

| Tên / Name                 | File / File                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| BFS (Breadth-First Search) | [`bfs.md`](algorithms/graph-algorithms/bfs.md)                           |
| DFS (Depth-First Search)   | [`dfs.md`](algorithms/graph-algorithms/dfs.md)                           |
| Dijkstra                   | [`dijkstra.md`](algorithms/graph-algorithms/dijkstra.md)                 |
| Topological Sort           | [`topological-sort.md`](algorithms/graph-algorithms/topological-sort.md) |
| Union Find                 | [`union-find.md`](algorithms/graph-algorithms/union-find.md)             |

---

## 📊 Theo dõi tiến độ / Progress Tracking

| Độ khó / Difficulty | Số bài đã làm / Completed | Tổng / Total | %   |
| ------------------- | ------------------------- | ------------ | --- |
| Easy                | 0                         | 20           | 0%  |
| Medium              | 0                         | 5            | 0%  |
| Hard                | 0                         | 1            | 0%  |

---

## 🎯 Mục tiêu / Goals

### Tuần này / This Week

- [ ] Làm 5 bài Easy
- [ ] Học 3 thuật toán cơ bản
- [ ] Học 2 patterns tư duy

### Tháng này / This Month

- [ ] Làm 20 bài Easy
- [ ] Làm 5 bài Medium
- [ ] Học tất cả cấu trúc dữ liệu cơ bản
- [ ] Học tất cả patterns tư duy

---

## 🔗 Resources / Tài liệu tham khảo

- [LeetCode](https://leetcode.com/)
- [NeetCode](https://neetcode.io/)
- [LeetCode Discuss](https://leetcode.com/discuss/)
- [Big O Cheat Sheet](../resources/cheatsheets/big-o-complexity.md)

---

## 📝 Quy trình tạo bài toán mới / Creating New Problems

1. Copy template từ [`template-problem.md`](template-problem.md)
2. Điền thông tin bài toán (ID, URL, Difficulty, Category, Tags)
3. Copy đề bài nguyên bản từ LeetCode
4. Phân tích đề bài (Input, Output, Constraints, Edge cases)
5. Viết 3 giải pháp (Brute Force → Optimized → Advanced)
6. Code JavaScript cho mỗi giải pháp
7. Phân tích độ phức tạp (Time, Space)
8. Viết test cases
9. Liên kết với thuật toán/pattern liên quan
10. Nếu chưa có thuật toán, tạo file mới trong thư mục [`algorithms/`](algorithms/)

---

_Last updated: 2026-02-03_
