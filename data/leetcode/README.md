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

| #   | Tên bài toán / Problem Name          | File / File                                                                                                | Tags / Tags                     |
| --- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 1   | Two Sum                              | [`001-two-sum.md`](problems/easy/001-two-sum.md)                                                           | Array, Hash Map                 |
| 7   | Reverse Integer                      | [`007-reverse-integer.md`](problems/easy/007-reverse-integer.md)                                           | Math                            |
| 9   | Palindrome Number                    | [`009-palindrome-number.md`](problems/easy/009-palindrome-number.md)                                       | Two Pointers                    |
| 13  | Roman to Integer                     | [`013-roman-to-integer.md`](problems/easy/013-roman-to-integer.md)                                         | Hash Map                        |
| 14  | Longest Common Prefix                | [`014-longest-common-prefix.md`](problems/easy/014-longest-common-prefix.md)                               | String                          |
| 20  | Valid Parentheses                    | [`020-valid-parentheses.md`](problems/easy/020-valid-parentheses.md)                                       | Stack                           |
| 21  | Merge Two Sorted Lists               | [`021-merge-two-sorted-lists.md`](problems/easy/021-merge-two-sorted-lists.md)                             | Linked List, Two Pointers       |
| 26  | Remove Duplicates from Sorted Array  | [`026-remove-duplicates-from-sorted-array.md`](problems/easy/026-remove-duplicates-from-sorted-array.md)   | Array, Two Pointers             |
| 27  | Remove Element                       | [`027-remove-element.md`](problems/easy/027-remove-element.md)                                             | Array, Two Pointers             |
| 35  | Search Insert Position               | [`035-search-insert-position.md`](problems/easy/035-search-insert-position.md)                             | Array, Binary Search            |
| 58  | Length of Last Word                  | [`058-length-of-last-word.md`](problems/easy/058-length-of-last-word.md)                                   | String                          |
| 66  | Plus One                             | [`066-plus-one.md`](problems/easy/066-plus-one.md)                                                         | Array, Math                     |
| 67  | Add Binary                           | [`067-add-binary.md`](problems/easy/067-add-binary.md)                                                     | String, Math                    |
| 69  | Sqrt(x)                              | [`069-sqrtx.md`](problems/easy/069-sqrtx.md)                                                               | Math, Binary Search             |
| 70  | Climbing Stairs                      | [`070-climbing-stairs.md`](problems/easy/070-climbing-stairs.md)                                           | DP, Fibonacci                   |
| 83  | Remove Duplicates from Sorted List   | [`083-remove-duplicates-from-sorted-list.md`](problems/easy/083-remove-duplicates-from-sorted-list.md)     | Linked List                     |
| 88  | Merge Sorted Array                   | [`088-merge-sorted-array.md`](problems/easy/088-merge-sorted-array.md)                                     | Array, Two Pointers             |
| 94  | Binary Tree Inorder Traversal        | [`094-binary-tree-inorder-traversal.md`](problems/easy/094-binary-tree-inorder-traversal.md)               | Tree, DFS                       |
| 100 | Same Tree                            | [`100-same-tree.md`](problems/easy/100-same-tree.md)                                                       | Tree, DFS                       |
| 101 | Symmetric Tree                       | [`101-symmetric-tree.md`](problems/easy/101-symmetric-tree.md)                                             | Tree, DFS, BFS                  |
| 102 | Binary Tree Level Order Traversal    | [`102-binary-tree-level-order-traversal.md`](problems/easy/102-binary-tree-level-order-traversal.md)       | Tree, BFS                       |
| 104 | Maximum Depth of Binary Tree         | [`104-maximum-depth-of-binary-tree.md`](problems/easy/104-maximum-depth-of-binary-tree.md)                 | Tree, DFS                       |
| 107 | Binary Tree Level Order Traversal II | [`107-binary-tree-level-order-traversal-ii.md`](problems/easy/107-binary-tree-level-order-traversal-ii.md) | Tree, BFS                       |
| 110 | Balanced Binary Tree                 | [`110-balanced-binary-tree.md`](problems/easy/110-balanced-binary-tree.md)                                 | Tree, DFS                       |
| 111 | Minimum Depth of Binary Tree         | [`111-minimum-depth-of-binary-tree.md`](problems/easy/111-minimum-depth-of-binary-tree.md)                 | Tree, DFS                       |
| 112 | Path Sum                             | [`112-path-sum.md`](problems/easy/112-path-sum.md)                                                         | Tree, DFS                       |
| 118 | Pascal's Triangle                    | [`118-pascals-triangle.md`](problems/easy/118-pascals-triangle.md)                                         | Array, DP                       |
| 119 | Pascal's Triangle II                 | [`119-pascals-triangle-ii.md`](problems/easy/119-pascals-triangle-ii.md)                                   | Array, DP                       |
| 121 | Best Time to Buy and Sell Stock      | [`121-best-time-to-buy-and-sell-stock.md`](problems/easy/121-best-time-to-buy-and-sell-stock.md)           | Array, DP                       |
| 125 | Valid Palindrome                     | [`125-valid-palindrome.md`](problems/easy/125-valid-palindrome.md)                                         | String, Two Pointers            |
| 136 | Single Number                        | [`136-single-number.md`](problems/easy/136-single-number.md)                                               | Array, Bit Manipulation         |
| 141 | Linked List Cycle                    | [`141-linked-list-cycle.md`](problems/easy/141-linked-list-cycle.md)                                       | Linked List, Two Pointers       |
| 144 | Binary Tree Preorder Traversal       | [`144-binary-tree-preorder-traversal.md`](problems/easy/144-binary-tree-preorder-traversal.md)             | Tree, DFS                       |
| 145 | Binary Tree Postorder Traversal      | [`145-binary-tree-postorder-traversal.md`](problems/easy/145-binary-tree-postorder-traversal.md)           | Tree, DFS                       |
| 160 | Intersection of Two Linked Lists     | [`160-intersection-of-two-linked-lists.md`](problems/easy/160-intersection-of-two-linked-lists.md)         | Linked List, Hash Set           |
| 167 | Two Sum II - Input Array Is Sorted   | [`167-two-sum-ii-input-array-is-sorted.md`](problems/easy/167-two-sum-ii-input-array-is-sorted.md)         | Array, Two Pointers             |
| 168 | Excel Sheet Column Title             | [`168-excel-sheet-column-title.md`](problems/easy/168-excel-sheet-column-title.md)                         | Math, String                    |
| 169 | Majority Element                     | [`169-majority-element.md`](problems/easy/169-majority-element.md)                                         | Array, Hash Map                 |
| 171 | Excel Sheet Column Number            | [`171-excel-sheet-column-number.md`](problems/easy/171-excel-sheet-column-number.md)                       | Math, String                    |
| 172 | Factorial Trailing Zeroes            | [`172-factorial-trailing-zeroes.md`](problems/easy/172-factorial-trailing-zeroes.md)                       | Math                            |
| 189 | Rotate Array                         | [`189-rotate-array.md`](problems/easy/189-rotate-array.md)                                                 | Array, Math                     |
| 190 | Reverse Bits                         | [`190-reverse-bits.md`](problems/easy/190-reverse-bits.md)                                                 | Bit Manipulation                |
| 191 | Number of 1 Bits                     | [`191-number-of-1-bits.md`](problems/easy/191-number-of-1-bits.md)                                         | Bit Manipulation                |
| 198 | House Robber                         | [`198-house-robber.md`](problems/easy/198-house-robber.md)                                                 | DP, Array                       |
| 199 | Binary Tree Right Side View          | [`199-binary-tree-right-side-view.md`](problems/easy/199-binary-tree-right-side-view.md)                   | Tree, BFS                       |
| 202 | Happy Number                         | [`202-happy-number.md`](problems/easy/202-happy-number.md)                                                 | Math, Hash Set                  |
| 203 | Remove Linked List Elements          | [`203-remove-linked-list-elements.md`](problems/easy/203-remove-linked-list-elements.md)                   | Linked List                     |
| 204 | Count Primes                         | [`204-count-primes.md`](problems/easy/204-count-primes.md)                                                 | Math, Array                     |
| 205 | Isomorphic Strings                   | [`205-isomorphic-strings.md`](problems/easy/205-isomorphic-strings.md)                                     | String, Hash Map                |
| 206 | Reverse Linked List                  | [`206-reverse-linked-list.md`](problems/easy/206-reverse-linked-list.md)                                   | Linked List                     |
| 217 | Contains Duplicate                   | [`217-contains-duplicate.md`](problems/easy/217-contains-duplicate.md)                                     | Array, Hash Set                 |
| 219 | Contains Duplicate II                | [`219-contains-duplicate-ii.md`](problems/easy/219-contains-duplicate-ii.md)                               | Array, Hash Map, Sliding Window |
| 225 | Implement Stack using Queues         | [`225-implement-stack-using-queues.md`](problems/easy/225-implement-stack-using-queues.md)                 | Stack, Queue                    |
| 226 | Invert Binary Tree                   | [`226-invert-binary-tree.md`](problems/easy/226-invert-binary-tree.md)                                     | Tree, DFS                       |
| 228 | Summary Ranges                       | [`228-summary-ranges.md`](problems/easy/228-summary-ranges.md)                                             | Array, Two Pointers             |
| 231 | Power of Two                         | [`231-power-of-two.md`](problems/easy/231-power-of-two.md)                                                 | Math, Bit Manipulation          |
| 232 | Implement Queue using Stacks         | [`232-implement-queue-using-stacks.md`](problems/easy/232-implement-queue-using-stacks.md)                 | Stack, Queue                    |
| 234 | Palindrome Linked List               | [`234-palindrome-linked-list.md`](problems/easy/234-palindrome-linked-list.md)                             | Linked List, Two Pointers       |
| 235 | Lowest Common Ancestor of BST        | [`235-lowest-common-ancestor-of-a-bst.md`](problems/easy/235-lowest-common-ancestor-of-a-bst.md)           | Tree, BST                       |
| 237 | Delete Node in a Linked List         | [`237-delete-node-in-a-linked-list.md`](problems/easy/237-delete-node-in-a-linked-list.md)                 | Linked List                     |
| 242 | Valid Anagram                        | [`242-valid-anagram.md`](problems/easy/242-valid-anagram.md)                                               | String, Hash Map                |
| 257 | Binary Tree Paths                    | [`257-binary-tree-paths.md`](problems/easy/257-binary-tree-paths.md)                                       | Tree, DFS                       |
| 258 | Add Digits                           | [`258-add-digits.md`](problems/easy/258-add-digits.md)                                                     | Math                            |
| 263 | Ugly Number                          | [`263-ugly-number.md`](problems/easy/263-ugly-number.md)                                                   | Math                            |
| 268 | Missing Number                       | [`268-missing-number.md`](problems/easy/268-missing-number.md)                                             | Array, Math, Bit Manipulation   |
| 278 | First Bad Version                    | [`278-first-bad-version.md`](problems/easy/278-first-bad-version.md)                                       | Binary Search                   |
| 283 | Move Zeroes                          | [`283-move-zeroes.md`](problems/easy/283-move-zeroes.md)                                                   | Array, Two Pointers             |

### Medium Problems / Bài toán Trung bình

| #   | Tên bài toán / Problem Name                      | File / File                                                                                                                          | Tags / Tags                 |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| 1   | 3Sum                                             | [`003-3sum.md`](problems/medium/003-3sum.md)                                                                                         | Array, Two Pointers         |
| 2   | Longest Substring Without Repeating Characters   | [`003-longest-substring-without-repeating-characters.md`](problems/medium/003-longest-substring-without-repeating-characters.md)     | String, Sliding Window      |
| 3   | Container With Most Water                        | [`011-container-with-most-water.md`](problems/medium/011-container-with-most-water.md)                                               | Array, Two Pointers         |
| 4   | Add Two Numbers                                  | [`002-add-two-numbers.md`](problems/medium/002-add-two-numbers.md)                                                                   | Linked List                 |
| 5   | Valid Parentheses String                         | [`678-valid-parenthesis-string.md`](problems/medium/678-valid-parenthesis-string.md)                                                 | String, Stack, DP           |
| 6   | 3Sum Closest                                     | [`016-3sum-closest.md`](problems/medium/016-3sum-closest.md)                                                                         | Array, Two Pointers         |
| 7   | Letter Combinations of a Phone Number            | [`017-letter-combinations-of-a-phone-number.md`](problems/medium/017-letter-combinations-of-a-phone-number.md)                       | String, Backtracking        |
| 8   | Remove Nth Node From End of List                 | [`019-remove-nth-node-from-end-of-list.md`](problems/medium/019-remove-nth-node-from-end-of-list.md)                                 | Linked List, Two Pointers   |
| 9   | Generate Parentheses                             | [`022-generate-parentheses.md`](problems/medium/022-generate-parentheses.md)                                                         | String, Backtracking        |
| 10  | Swap Nodes in Pairs                              | [`024-swap-nodes-in-pairs.md`](problems/medium/024-swap-nodes-in-pairs.md)                                                           | Linked List                 |
| 11  | Search in Rotated Sorted Array                   | [`033-search-in-rotated-sorted-array.md`](problems/medium/033-search-in-rotated-sorted-array.md)                                     | Array, Binary Search        |
| 12  | Permutations                                     | [`046-permutations.md`](problems/medium/046-permutations.md)                                                                         | Array, Backtracking         |
| 13  | Rotate Image                                     | [`048-rotate-image.md`](problems/medium/048-rotate-image.md)                                                                         | Array, Matrix               |
| 14  | Group Anagrams                                   | [`049-group-anagrams.md`](problems/medium/049-group-anagrams.md)                                                                     | String, Hash Map            |
| 15  | Subsets                                          | [`078-subsets.md`](problems/medium/078-subsets.md)                                                                                   | Array, Backtracking         |
| 16  | Word Search                                      | [`079-word-search.md`](problems/medium/079-word-search.md)                                                                           | Matrix, DFS, Backtracking   |
| 17  | Decode Ways                                      | [`091-decode-ways.md`](problems/medium/091-decode-ways.md)                                                                           | String, DP                  |
| 18  | Unique Binary Search Trees                       | [`096-unique-binary-search-trees.md`](problems/medium/096-unique-binary-search-trees.md)                                             | Tree, DP, BST               |
| 19  | Validate Binary Search Tree                      | [`098-validate-binary-search-tree.md`](problems/medium/098-validate-binary-search-tree.md)                                           | Tree, BST, DFS              |
| 20  | Binary Tree Zigzag Level Order Traversal         | [`103-binary-tree-zigzag-level-order-traversal.md`](problems/medium/103-binary-tree-zigzag-level-order-traversal.md)                 | Tree, BFS                   |
| 21  | Construct Binary Tree from Preorder and Inorder  | [`105-construct-binary-tree-from-preorder-and-inorder.md`](problems/medium/105-construct-binary-tree-from-preorder-and-inorder.md)   | Tree, DFS                   |
| 22  | Construct Binary Tree from Inorder and Postorder | [`106-construct-binary-tree-from-inorder-and-postorder.md`](problems/medium/106-construct-binary-tree-from-inorder-and-postorder.md) | Tree, DFS                   |
| 23  | Convert Sorted Array to Binary Search Tree       | [`108-convert-sorted-array-to-binary-search-tree.md`](problems/medium/108-convert-sorted-array-to-binary-search-tree.md)             | Tree, BST, DFS              |
| 24  | Convert Sorted List to Binary Search Tree        | [`109-convert-sorted-list-to-binary-search-tree.md`](problems/medium/109-convert-sorted-list-to-binary-search-tree.md)               | Tree, BST, DFS              |
| 25  | Flatten Binary Tree to Linked List               | [`114-flatten-binary-tree-to-linked-list.md`](problems/medium/114-flatten-binary-tree-to-linked-list.md)                             | Tree, DFS                   |
| 26  | Populating Next Right Pointers in Each Node      | [`116-populating-next-right-pointers-in-each-node.md`](problems/medium/116-populating-next-right-pointers-in-each-node.md)           | Tree, BFS                   |
| 27  | Populating Next Right Pointers in Each Node II   | [`117-populating-next-right-pointers-in-each-node-ii.md`](problems/medium/117-populating-next-right-pointers-in-each-node-ii.md)     | Tree, BFS                   |
| 28  | Triangle                                         | [`120-triangle.md`](problems/medium/120-triangle.md)                                                                                 | Array, DP                   |
| 29  | Best Time to Buy and Sell Stock II               | [`122-best-time-to-buy-and-sell-stock-ii.md`](problems/medium/122-best-time-to-buy-and-sell-stock-ii.md)                             | Array, DP                   |
| 30  | Best Time to Buy and Sell Stock III              | [`123-best-time-to-buy-and-sell-stock-iii.md`](problems/medium/123-best-time-to-buy-and-sell-stock-iii.md)                           | Array, DP                   |
| 31  | Binary Tree Maximum Path Sum                     | [`124-binary-tree-maximum-path-sum.md`](problems/medium/124-binary-tree-maximum-path-sum.md)                                         | Tree, DFS, DP               |
| 32  | Word Ladder                                      | [`127-word-ladder.md`](problems/medium/127-word-ladder.md)                                                                           | String, BFS, Graph          |
| 33  | Longest Consecutive Sequence                     | [`128-longest-consecutive-sequence.md`](problems/medium/128-longest-consecutive-sequence.md)                                         | Array, Hash Set, Union Find |
| 34  | Surrounded Regions                               | [`130-surrounded-regions.md`](problems/medium/130-surrounded-regions.md)                                                             | Matrix, DFS, BFS            |
| 35  | Palindrome Partitioning                          | [`131-palindrome-partitioning.md`](problems/medium/131-palindrome-partitioning.md)                                                   | String, DP, Backtracking    |

### Hard Problems / Bài toán Khó

| #   | Tên bài toán / Problem Name | File / File                                                                              | Tags / Tags                           |
| --- | --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| 1   | Trapping Rain Water         | [`042-trapping-rain-water.md`](problems/hard/042-trapping-rain-water.md)                 | Array, Two Pointers, Stack            |
| 2   | Median of Two Sorted Arrays | [`004-median-of-two-sorted-arrays.md`](problems/hard/004-median-of-two-sorted-arrays.md) | Array, Binary Search                  |
| 3   | Regular Expression Matching | [`010-regular-expression-matching.md`](problems/hard/010-regular-expression-matching.md) | String, DP                            |
| 4   | Merge k Sorted Lists        | [`023-merge-k-sorted-lists.md`](problems/hard/023-merge-k-sorted-lists.md)               | Linked List, Heap, Divide and Conquer |
| 5   | Reverse Nodes in k-Group    | [`025-reverse-nodes-in-k-group.md`](problems/hard/025-reverse-nodes-in-k-group.md)       | Linked List                           |
| 6   | Divide Two Integers         | [`029-divide-two-integers.md`](problems/hard/029-divide-two-integers.md)                 | Math, Bit Manipulation                |
| 7   | Longest Valid Parentheses   | [`032-longest-valid-parentheses.md`](problems/hard/032-longest-valid-parentheses.md)     | String, Stack, DP                     |
| 8   | First Missing Positive      | [`041-first-missing-positive.md`](problems/hard/041-first-missing-positive.md)           | Array, Hash Map                       |
| 9   | Wildcard Matching           | [`044-wildcard-matching.md`](problems/hard/044-wildcard-matching.md)                     | String, DP                            |
| 10  | Jump Game II                | [`045-jump-game-ii.md`](problems/hard/045-jump-game-ii.md)                               | Array, DP, Greedy                     |
| 11  | Subsets II                  | [`090-subsets-ii.md`](problems/hard/090-subsets-ii.md)                                   | Array, Backtracking, DP               |
| 12  | Interleaving String         | [`097-interleaving-string.md`](problems/hard/097-interleaving-string.md)                 | String, DP                            |
| 13  | Distinct Subsequences       | [`115-distinct-subsequences.md`](problems/hard/115-distinct-subsequences.md)             | String, DP                            |
| 14  | Word Break II               | [`140-word-break-ii.md`](problems/hard/140-word-break-ii.md)                             | String, DP, Backtracking              |
| 15  | Sort List                   | [`148-sort-list.md`](problems/hard/148-sort-list.md)                                     | Linked List, Merge Sort               |
| 16  | Maximum Product Subarray    | [`152-maximum-product-subarray.md`](problems/hard/152-maximum-product-subarray.md)       | Array, DP                             |
| 17  | Dungeon Game                | [`174-dungeon-game.md`](problems/hard/174-dungeon-game.md)                               | Array, DP, Matrix                     |
| 18  | Largest Number              | [`179-largest-number.md`](problems/hard/179-largest-number.md)                           | String, Sorting, Greedy               |
| 19  | House Robber III            | [`213-house-robber-iii.md`](problems/hard/213-house-robber-iii.md)                       | Tree, DFS, DP                         |
| 20  | Shortest Palindrome         | [`214-shortest-palindrome.md`](problems/hard/214-shortest-palindrome.md)                 | String, KMP, DP                       |
| 21  | The Skyline Problem         | [`218-the-skyline-problem.md`](problems/hard/218-the-skyline-problem.md)                 | Array, Heap, Divide and Conquer       |

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
| Easy                | 10                        | 20           | 50% |
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
