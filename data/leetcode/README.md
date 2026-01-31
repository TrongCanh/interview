# LeetCode Practice / Luyện tập LeetCode

> Hướng dẫn và tài liệu luyện tập LeetCode / LeetCode practice guide and resources

---

## 📋 Mục lục / Table of Contents

- [Cấu trúc Folder / Folder Structure](#cấu-trúc-folder--folder-structure)
- [Cách sử dụng / How to Use](#cách-sử-dụng--how-to-use)
- [Template bài toán / Problem Template](#template-bài-toán--problem-template)

---

## 📁 Cấu trúc Folder / Folder Structure

```
leetcode/
├── 📁 by-difficulty/           # Theo độ khó / By difficulty
│   ├── 📁 easy/                 # Dễ / Easy
│   ├── 📁 medium/               # Trung bình / Medium
│   └── 📁 hard/                 # Khó / Hard
│
├── 📁 by-category/             # Theo danh mục / By category
│   ├── 📁 arrays/
│   ├── 📁 strings/
│   ├── 📁 linked-list/
│   ├── 📁 trees/
│   ├── 📁 dynamic-programming/
│   ├── 📁 graph/
│   └── 📁 sorting-searching/
│
├── 📁 patterns/                # Các pattern tư duy / Thinking patterns
│   ├── two-pointers.md
│   ├── sliding-window.md
│   ├── binary-search.md
│   ├── dfs-bfs.md
│   └── dynamic-programming.md
│
└── 📄 README.md                # File này / This file
```

---

## 🚀 Cách sử dụng / How to Use

### 1. Chọn bài toán theo độ khó / Choose problem by difficulty

Mở folder `by-difficulty/` và chọn độ khó phù hợp:

- **Easy**: Bắt đầu với các bài cơ bản
- **Medium**: Khi đã quen với easy
- **Hard**: Khi muốn thách thức

### 2. Chọn bài toán theo danh mục / Choose problem by category

Mở folder `by-category/` và chọn danh mục:

- Arrays, Strings, Linked Lists, Trees, etc.

### 3. Học các pattern tư duy / Learn thinking patterns

Mở folder `patterns/` để học các pattern:

- Two Pointers, Sliding Window, Binary Search, etc.

### 4. Làm bài toán / Solve problems

Mỗi file bài toán có:

- **Phương pháp tư duy**: Cách tiếp cận bài toán
- **Giải pháp 1**: Đơn giản nhất (brute force)
- **Giải pháp 2**: Cải tiến (optimized)
- **Giải pháp 3**: Nâng cao (advanced)
- **Test cases**: Các test case để kiểm tra

---

## 📝 Template bài toán / Problem Template

> ⚠️ **QUAN TRỌNG / IMPORTANT**: Phải copy nguyên văn đề bài từ LeetCode vào phần "ĐỀ BÀI NGUYÊN BẢN" / **Must copy the original problem description from LeetCode into the "ORIGINAL PROBLEM" section**

```javascript
/**
 * Problem: [Tên bài toán]
 * URL: https://leetcode.com/problems/[slug]/
 * Difficulty: [Easy/Medium/Hard]
 * Category: [Danh mục]
 *
 * ==================== ĐỀ BÀI NGUYÊN BẢN / ORIGINAL PROBLEM ====================
 * [Copy nguyên văn đề bài từ LeetCode vào đây]
 * ==========================================================================
 */

// =====================================================
// PHƯƠNG PHÁP TƯ DUY / THINKING APPROACH
// =====================================================
/**
 * 1. Đọc đề bài:
 *    - Input: ...
 *    - Output: ...
 *
 * 2. Phân tích:
 *    - ...
 *
 * 3. Các cách tiếp cận:
 *    - Brute Force: O(n²)
 *    - Optimized: O(n)
 */

// =====================================================
// GIẢI PHÁP 1: Brute Force (Đơn giản nhất)
// =====================================================
/**
 * Time: O(n²)
 * Space: O(1)
 *
 * Ý tưởng: ...
 */
function solution1_bruteForce(input) {
  // Implementation
}

// =====================================================
// GIẢI PHÁP 2: Optimized (Cải tiến)
// =====================================================
/**
 * Time: O(n)
 * Space: O(n)
 *
 * Ý tưởng: ...
 */
function solution2_optimized(input) {
  // Implementation
}

// =====================================================
// GIẢI PHÁP 3: Advanced (Nâng cao)
// =====================================================
/**
 * Time: O(n log n)
 * Space: O(1)
 *
 * Ý tưởng: ...
 */
function solution3_advanced(input) {
  // Implementation
}

// =====================================================
// TEST CASES
// =====================================================
console.log(solution1_bruteForce(test1));
console.log(solution2_optimized(test1));
console.log(solution3_advanced(test1));
```

---

## 📊 Theo dõi tiến độ / Progress Tracking

| Độ khó / Difficulty | Số bài đã làm / Completed | Tổng / Total | %    |
| ------------------- | ------------------------- | ------------ | ---- |
| Easy                | 20                        | 20           | 100% |
| Medium              | 0                         | 0            | 0%   |
| Hard                | 0                         | 0            | 0%   |

---

## 🎯 Mục tiêu / Goals

### Tuần này / This Week

- [x] Làm 20 bài Easy
- [x] Học các pattern cơ bản

### Tháng này / This Month

- [x] Làm 20 bài Easy
- [ ] Làm 5 bài Medium

---

## 📝 Danh sách bài toán / Problem List

### Easy Problems (20 bài) / 20 Problems

| #   | Tên bài toán / Problem Name         | File / File                                                                                                     | Pattern / Pattern |
| --- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------- |
| 1   | Two Sum                             | [`001-two-sum.js`](by-difficulty/easy/001-two-sum.js:1)                                                         | Hash Map          |
| 2   | Reverse Integer                     | [`002-reverse-integer.js`](by-difficulty/easy/002-reverse-integer.js:1)                                         | Math              |
| 3   | Palindrome Number                   | [`003-palindrome-number.js`](by-difficulty/easy/003-palindrome-number.js:1)                                     | Two Pointers      |
| 4   | Roman to Integer                    | [`004-roman-to-integer.js`](by-difficulty/easy/004-roman-to-integer.js:1)                                       | Hash Map          |
| 5   | Longest Common Prefix               | [`005-longest-common-prefix.js`](by-difficulty/easy/005-longest-common-prefix.js:1)                             | String            |
| 6   | Valid Parentheses                   | [`006-valid-parentheses.js`](by-difficulty/easy/006-valid-parentheses.js:1)                                     | Stack             |
| 7   | Merge Two Sorted Lists              | [`007-merge-two-sorted-lists.js`](by-difficulty/easy/007-merge-two-sorted-lists.js:1)                           | Two Pointers      |
| 8   | Remove Duplicates from Sorted Array | [`008-remove-duplicates-from-sorted-array.js`](by-difficulty/easy/008-remove-duplicates-from-sorted-array.js:1) | Two Pointers      |
| 9   | Remove Element                      | [`009-remove-element.js`](by-difficulty/easy/009-remove-element.js:1)                                           | Two Pointers      |
| 10  | Search Insert Position              | [`010-search-insert-position.js`](by-difficulty/easy/010-search-insert-position.js:1)                           | Binary Search     |
| 11  | Length of Last Word                 | [`011-length-of-last-word.js`](by-difficulty/easy/011-length-of-last-word.js:1)                                 | String            |
| 12  | Plus One                            | [`012-plus-one.js`](by-difficulty/easy/012-plus-one.js:1)                                                       | Math (Carry)      |
| 13  | Add Binary                          | [`013-add-binary.js`](by-difficulty/easy/013-add-binary.js:1)                                                   | Math (Binary)     |
| 14  | Sqrt(x)                             | [`014-sqrtx.js`](by-difficulty/easy/014-sqrtx.js:1)                                                             | Binary Search     |
| 15  | Climbing Stairs                     | [`015-climbing-stairs.js`](by-difficulty/easy/015-climbing-stairs.js:1)                                         | DP (Fibonacci)    |
| 16  | Remove Duplicates from Sorted List  | [`016-remove-duplicates-from-sorted-list.js`](by-difficulty/easy/016-remove-duplicates-from-sorted-list.js:1)   | Linked List       |
| 17  | Merge Sorted Array                  | [`017-merge-sorted-array.js`](by-difficulty/easy/017-merge-sorted-array.js:1)                                   | Two Pointers      |
| 18  | Binary Tree Inorder Traversal       | [`018-binary-tree-inorder-traversal.js`](by-difficulty/easy/018-binary-tree-inorder-traversal.js:1)             | DFS               |
| 19  | Same Tree                           | [`019-same-tree.js`](by-difficulty/easy/019-same-tree.js:1)                                                     | DFS               |
| 20  | Symmetric Tree                      | [`020-symmetric-tree.js`](by-difficulty/easy/020-symmetric-tree.js:1)                                           | DFS / BFS         |

---

## 🔗 Resources / Tài liệu tham khảo

- [LeetCode](https://leetcode.com/)
- [NeetCode](https://neetcode.io/)
- [LeetCode Discuss](https://leetcode.com/discuss/)

---

_Last updated: 2026-01-30_
