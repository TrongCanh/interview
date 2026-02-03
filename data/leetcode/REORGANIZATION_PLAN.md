# Kế hoạch Tổ chức lại Thư mục LeetCode / LeetCode Directory Reorganization Plan

> Kế hoạch chi tiết cho việc tổ chức lại cấu trúc thư mục LeetCode trong interview-viewer / Detailed plan for reorganizing LeetCode directory structure in interview-viewer

---

## 📋 Tổng quan / Overview

### Mục tiêu / Goals

1. **Chia làm 2 thư mục chính:**
   - `problems/` - Chứa các bài toán LeetCode
   - `algorithms/` - Chứa các thuật toán, patterns, cấu trúc dữ liệu

2. **Định dạng file:**
   - Sử dụng Markdown (.md) cho tất cả bài toán và thuật toán
   - Mỗi bài toán có đầy đủ: đề bài nguyên bản, độ khó, phân tích, giải pháp từ cơ bản đến nâng cao

3. **Liên kết:**
   - Mỗi bài toán tham chiếu đến thuật toán/pattern liên quan
   - Nếu chưa có thuật toán, phải tạo file giải thích chi tiết trong thư mục algorithms/

---

## 📁 Cấu trúc Thư mục Mới / New Directory Structure

```
leetcode/
├── 📁 problems/                    # Bài toán LeetCode / LeetCode Problems
│   ├── 📁 easy/                    # Dễ / Easy
│   │   ├── 001-two-sum.md
│   │   ├── 007-reverse-integer.md
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
└── 📄 README.md                    # File chính
```

---

## 📝 Template cho File Bài Toán / Problem File Template

### Cấu trúc File / File Structure

```markdown
# [Tên bài toán] / [Problem Name]

> LeetCode Problem ID & Difficulty

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** [ID]
- **URL:** https://leetcode.com/problems/[slug]/
- **Độ khó / Difficulty:** [Easy/Medium/Hard]
- **Danh mục / Category:** [Array, String, Tree, etc.]
- **Tags:** [tag1, tag2, tag3]
- **Thuật toán liên quan / Related Algorithms:** [algorithm1, algorithm2]
- **Patterns liên quan / Related Patterns:** [pattern1, pattern2]

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

[Đề bài đầy đủ từ LeetCode]

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** [Mô tả input]
- **Output:** [Mô tả output]
- **Ràng buộc / Constraints:**
  - Constraint 1
  - Constraint 2
- **Edge cases:**
  - Case 1
  - Case 2

### 2. Tư duy / Thinking Process

- Bước 1: [Phân tích bước 1]
- Bước 2: [Phân tích bước 2]
- Bước 3: [Phân tích bước 3]

### 3. Ví dụ minh họa / Examples
```

Example 1:
Input: ...
Output: ...
Explanation: ...

Example 2:
Input: ...
Output: ...
Explanation: ...

````

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

[Mô tả ý tưởng cơ bản]

### Thuật toán / Algorithm

1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

### Code / Implementation

```javascript
function solution1_bruteForce(input) {
  // Implementation
}
````

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) hoặc O(2^n)
- **Space Complexity:** O(1) hoặc O(n)

### Ưu điểm / Pros

- Ưu điểm 1
- Ưu điểm 2

### Nhược điểm / Cons

- Nhược điểm 1
- Nhược điểm 2

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến?
- Điểm yếu của giải pháp 1?
- Cách tiếp cận mới?

### Ý tưởng / Idea

[Mô tả ý tưởng cải tiến]

### Thuật toán / Algorithm

1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

### Code / Implementation

```javascript
function solution2_optimized(input) {
  // Implementation
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

### Ưu điểm / Pros

- Ưu điểm 1
- Ưu điểm 2

### Nhược điểm / Cons

- Nhược điểm 1
- Nhược điểm 2

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không?
- Có thuật toán/pattern nào phù hợp hơn?

### Ý tưởng / Idea

[Mô tả ý tưởng nâng cao]

### Thuật toán / Algorithm

1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

### Code / Implementation

```javascript
function solution3_advanced(input) {
  // Implementation
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n log n) hoặc O(n)
- **Space Complexity:** O(1) hoặc O(n)

### Ưu điểm / Pros

- Ưu điểm 1
- Ưu điểm 2

### Nhược điểm / Cons

- Nhược điểm 1
- Nhược điểm 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ                   |
| Optimized            | O(n)  | O(n)  | Trung bình / Medium | Mảng lớn                   |
| Advanced             | O(n)  | O(1)  | Khó / Hard          | Cần tối ưu bộ nhớ          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input = [...];
const expected = [...];

console.log(solution1_bruteForce(input)); // Expected: expected
console.log(solution2_optimized(input)); // Expected: expected
console.log(solution3_advanced(input)); // Expected: expected
```

### Test Case 2: Edge case

```javascript
const input = [...];
const expected = [...];

console.log(solution1_bruteForce(input)); // Expected: expected
console.log(solution2_optimized(input)); // Expected: expected
console.log(solution3_advanced(input)); // Expected: expected
```

### Test Case 3: Phức tạp / Complex

```javascript
const input = [...];
const expected = [...];

console.log(solution1_bruteForce(input)); // Expected: expected
console.log(solution2_optimized(input)); // Expected: expected
console.log(solution3_advanced(input)); // Expected: expected
```

---

## 📚 Tài liệu tham khảo / References

- [Thuật toán liên quan 1](../../algorithms/...md)
- [Pattern liên quan 1](../../algorithms/patterns/...md)
- [LeetCode Discuss](https://leetcode.com/problems/[slug]/discuss/)
- [Video giải thích](...)

---

## 💬 Lời khuyên / Tips

- Tip 1
- Tip 2
- Lỗi thường gặp và cách tránh

---

_Last updated: [date]_

````

---

## 📝 Template cho File Thuật toán / Algorithm File Template

### Cấu trúc File / File Structure

```markdown
# [Tên Thuật toán/Pattern] / [Algorithm/Pattern Name]

> Giải thích chi tiết về thuật toán/pattern / Detailed explanation of algorithm/pattern

---

## 📚 Khái niệm / Concept

[Giải thích khái niệm cơ bản]

---

## 🎯 Khi nào dùng? / When to use?

- Điều kiện 1
- Điều kiện 2
- Điều kiện 3

---

## 🔄 Các biến thể / Variations

### Biến thể 1 / Variation 1

[Mô tả]

### Biến thể 2 / Variation 2

[Mô tả]

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
function algorithmTemplate(input) {
  // Implementation
}
````

### Template nâng cao / Advanced Template

```javascript
function algorithmTemplateAdvanced(input) {
  // Implementation
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1

**Mô tả:** [Mô tả bài toán]

**Code:**

```javascript
function example1(input) {
  // Implementation
}
```

### Ví dụ 2 / Example 2

**Mô tả:** [Mô tả bài toán]

**Code:**

```javascript
function example2(input) {
  // Implementation
}
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Problem 1](../problems/...md)
- [Problem 2](../problems/...md)
- [Problem 3](../problems/...md)

---

## 📊 Độ phức tạp / Complexity

- **Time Complexity:** O(...)
- **Space Complexity:** O(...)

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. Lỗi 1
2. Lỗi 2
3. Lỗi 3

---

## 💡 Tips & Tricks

- Tip 1
- Tip 2
- Tip 3

---

## 📚 Tài liệu tham khảo / References

- Reference 1
- Reference 2
- Reference 3

---

_Last updated: [date]_

```

---

## 🎯 Danh sách Bài toán cần tạo / Problems to Create

### Easy Problems (20 bài)

1. Two Sum - Hash Map
2. Reverse Integer - Math
3. Palindrome Number - Two Pointers
4. Roman to Integer - Hash Map
5. Longest Common Prefix - String
6. Valid Parentheses - Stack
7. Merge Two Sorted Lists - Two Pointers
8. Remove Duplicates from Sorted Array - Two Pointers
9. Remove Element - Two Pointers
10. Search Insert Position - Binary Search
11. Length of Last Word - String
12. Plus One - Math (Carry)
13. Add Binary - Math (Binary)
14. Sqrt(x) - Binary Search
15. Climbing Stairs - DP (Fibonacci)
16. Remove Duplicates from Sorted List - Linked List
17. Merge Sorted Array - Two Pointers
18. Binary Tree Inorder Traversal - DFS
19. Same Tree - DFS
20. Symmetric Tree - DFS / BFS

### Medium Problems (5 bài mẫu)

1. 3Sum - Two Pointers
2. Longest Substring Without Repeating Characters - Sliding Window
3. Container With Most Water - Two Pointers
4. Add Two Numbers - Linked List
5. Valid Parentheses String - Stack / DP

---

## 🎯 Danh sách Thuật toán cần tạo / Algorithms to Create

### Data Structures (8 files)

1. Array
2. Linked List
3. Stack
4. Queue
5. Hash Table
6. Tree
7. Graph
8. Heap

### Algorithms (6 files)

1. Sorting
2. Searching
3. Binary Search
4. Recursion
5. Divide and Conquer
6. Greedy

### Patterns (4 files)

1. Two Pointers
2. Sliding Window
3. Fast Slow Pointers
4. Merge Intervals

### Dynamic Programming (5 files)

1. DP Basics
2. DP 1D
3. DP 2D
4. Knapsack
5. LCS (Longest Common Subsequence)

### Graph Algorithms (5 files)

1. BFS
2. DFS
3. Dijkstra
4. Topological Sort
5. Union Find

---

## 📋 Các bước thực hiện / Implementation Steps

1. ✅ Tạo cấu trúc thư mục mới
2. ✅ Tạo template cho file bài toán
3. ✅ Tạo template cho file thuật toán
4. ✅ Cập nhật README.md chính
5. ✅ Tạo file README.md cho problems/
6. ✅ Tạo file README.md cho algorithms/
7. ✅ Tạo file ví dụ: problems/easy/001-two-sum.md
8. ✅ Tạo file thuật toán: algorithms/data-structures/hash-table.md
9. ✅ Tạo file pattern: algorithms/patterns/two-pointers.md

---

## 🔄 Quy trình làm việc / Workflow

1. **Tạo file bài toán mới:**
    - Copy template từ template-problem.md
    - Điền thông tin bài toán
    - Copy đề bài nguyên bản từ LeetCode
    - Phân tích và viết 3 giải pháp
    - **QUAN TRỌNG:** Nếu bài toán sử dụng thuật toán hoặc cấu trúc dữ liệu nào chưa có, **PHẢI TẠO FILE THUẬT TOÁN TRƯỚC**, rồi mới tạo file bài toán

2. **Tạo file thuật toán mới:**
    - Copy template từ template-algorithm.md
    - Điền thông tin thuật toán
    - Viết code template
    - Thêm ví dụ minh họa
    - Liên kết với các bài toán liên quan

## ⚠️ Quy tắc quan trọng / Important Rules

### 1. Trình tự tạo file / File Creation Order
- **Luôn tạo thuật toán trước khi cần dùng cho bài toán:**
  - Nếu bài toán sử dụng thuật toán hoặc cấu trúc dữ liệu chưa có, phải tạo file thuật toán trước
  - Sau đó mới tạo file bài toán và liên kết đến thuật toán đã tạo
  - Điều này đảm bảo tính nhất quán và dễ dàng tham chiếu

### 2. Giải thích chi tiết / Detailed Explanation
- **Ý tưởng tư duy và thuật toán:**
  - Giải thích kỹ hơn về ý tưởng tư duy bài toán, thuật toán
  - Giống như người giảng viên đang chỉ cho sinh viên
  - Không chỉ viết code, mà phải giải thích TẠI SAO và TẠI NHƯ THẾ

### 3. So sánh giải pháp / Solution Comparison
- **Giải thích tại sao chọn phương án thay đổi:**
  - Phải giải thích rõ ràng lợi ích của giải pháp mới so với giải pháp cũ
  - Ví dụ: "Tại sao cần cải tiến? Giải pháp Brute Force quá chậm với mảng lớn"
  - Ví dụ: "Điểm yếu của giải pháp 1? Tốn thêm không gian cho chuỗi"
  - Điều này giúp người đọc hiểu được tiến trình tư duy

---

_Last updated: 2026-02-03_
```
