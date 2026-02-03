# Workflow: Tạo File Mới cho LeetCode / Workflow: Create New LeetCode File

> Hướng dẫn chi tiết quy trình tạo file mới trong thư mục data/leetcode / Detailed guide for creating new files in data/leetcode directory

---

## 📋 Tổng quan / Overview

Workflow này hướng dẫn quy trình tạo file mới trong thư mục [`data/leetcode/`](data/leetcode/), bao gồm:

- **Problem Files**: File bài toán LeetCode trong thư mục `problems/`
- **Algorithm Files**: File thuật toán/pattern trong thư mục `algorithms/`

---

## ⚠️ Quy tắc Quan trọng / Important Rules

### Quy tắc 1: Tạo file Thuật toán/Pattern liên quan / Create Related Algorithm/Pattern Files

**Khi xử lý 1 bài toán LeetCode, PHẢI:**

1. **Kiểm tra xem các thuật toán/pattern liên quan đã tồn tại chưa**
   - Xem trong phần "Thông tin Bài toán" của bài toán
   - Các mục: "Thuật toán liên quan" và "Patterns liên quan"

2. **Nếu chưa tồn tại, PHẢI TẠO file mới** trong thư mục `algorithms/`:
   - Cấu trúc dữ liệu → `algorithms/data-structures/`
   - Thuật toán → `algorithms/algorithms/`
   - Pattern tư duy → `algorithms/patterns/`
   - Dynamic Programming → `algorithms/dynamic-programming/`
   - Thuật toán đồ thị → `algorithms/graph-algorithms/`

3. **Quy trình tạo file thuật toán/pattern**:
   - Tham khảo phần "Quy trình Tạo File Thuật toán/Pattern" bên dưới
   - Sử dụng template [`template-algorithm.md`](template-algorithm.md)
   - Điền đầy đủ nội dung theo quy tắc

### Quy tắc 2: Liên kết Chéo giữa các File / Cross-linking Between Files

**Sau khi tạo đủ tất cả các file, PHẢI bổ sung liên kết:**

1. **Trong file bài toán (Problem File)**:
   - Phần "🔗 Liên kết Thuật toán" → Link đến các file thuật toán/pattern liên quan
   - Sử dụng đường dẫn tương đối: `../algorithms/[folder]/[file].md`

2. **Trong file thuật toán/pattern (Algorithm/Pattern File)**:
   - Phần "🎯 Bài toán LeetCode sử dụng" → Link đến bài toán vừa tạo
   - Sử dụng đường dẫn tương đối: `../problems/[difficulty]/[file].md`

3. **Đảm bảo liên kết hai chiều (bidirectional)**:
   - Bài toán → Thuật toán/Pattern
   - Thuật toán/Pattern → Bài toán

### Quy tắc 3: Kiểm tra và Cập nhật / Check and Update

**Sau khi hoàn thành:**

1. **Kiểm tra tất cả các liên kết** đều hoạt động
2. **Kiểm tra nội dung** đầy đủ theo checklist
3. **Cập nhật README** nếu cần thiết (thêm bài toán mới vào danh sách)

---

## 📁 Cấu trúc Thư mục / Directory Structure

```
data/leetcode/
├── problems/                           # Bài toán LeetCode
│   ├── easy/                           # Dễ
│   │   ├── 001-two-sum.md
│   │   └── ...
│   ├── medium/                         # Trung bình
│   │   └── ...
│   └── hard/                           # Khó
│       └── ...
│
├── algorithms/                         # Thuật toán & Patterns
│   ├── data-structures/                # Cấu trúc dữ liệu
│   │   ├── array.md
│   │   ├── linked-list.md
│   │   └── ...
│   ├── algorithms/                     # Các thuật toán
│   │   ├── sorting.md
│   │   ├── recursion.md
│   │   └── ...
│   ├── patterns/                       # Các pattern tư duy
│   │   ├── two-pointers.md
│   │   ├── sliding-window.md
│   │   └── ...
│   ├── dynamic-programming/            # Dynamic Programming
│   │   └── ...
│   └── graph-algorithms/               # Thuật toán đồ thị
│       └── ...
│
├── template-problem.md                 # Template cho bài toán
├── template-algorithm.md               # Template cho thuật toán
└── WORKFLOW.md                         # File này
```

---

## 🚀 Quy trình Tạo File Bài Toán / Problem File Creation Workflow

### Bước 1: Thu thập Thông tin Bài toán / Gather Problem Information

1. **Truy cập LeetCode** và tìm bài toán cần tạo
2. **Thu thập thông tin:**
   - Problem ID (số thứ tự)
   - Problem Name (tên bài toán)
   - URL (đường dẫn đầy đủ)
   - Difficulty (Easy/Medium/Hard)
   - Tags (nhãn bài toán)
   - Category (danh mục: Array, String, Tree, etc.)

3. **Xác định vị trí lưu file:**
   - Easy → `problems/easy/`
   - Medium → `problems/medium/`
   - Hard → `problems/hard/`

### Bước 2: Đặt tên File / File Naming Convention

**Quy tắc đặt tên file / File Naming Rule:**

```
[ProblemID]-[kebab-case-name].md
```

**Ví dụ / Examples:**

- Problem 1: Two Sum → `001-two-sum.md`
- Problem 2: Add Two Numbers → `002-add-two-numbers.md`
- Problem 15: 3Sum → `015-3sum.md`

**Lưu ý / Notes:**

- Problem ID phải có 3 chữ số (001, 002, ..., 999)
- Tên bài toán chuyển sang kebab-case (chữ thường, gạch nối)
- Không dùng khoảng trắng, ký tự đặc biệt

### Bước 3: Copy Template và Điền Thông tin / Copy Template and Fill Information

1. **Mở template:** [`template-problem.md`](template-problem.md)
2. **Copy toàn bộ nội dung** template
3. **Tạo file mới** với tên đã xác định ở Bước 2
4. **Điền thông tin vào phần "Thông tin Bài toán":**

```markdown
## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 1
- **URL:** https://leetcode.com/problems/two-sum/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array
- **Tags:** Array, Hash Map
- **Thuật toán liên quan / Related Algorithms:** Hash Table, Array
- **Patterns liên quan / Related Patterns:** None
```

### Bước 4: Copy Đề Bài Nguyên Bản / Copy Original Problem

1. **Copy nguyên văn đề bài** từ LeetCode
2. **Bao gồm cả:**
   - Mô tả bài toán (Description)
   - Ví dụ (Examples)
   - Ràng buộc (Constraints)
   - Follow-up (nếu có)

3. **Định dạng markdown:**
   - Dùng code block cho input/output
   - Giữ nguyên format từ LeetCode

### Bước 5: Phân tích Đề Bài / Problem Analysis

**Phần 1: Hiểu đề bài / Understanding the Problem**

```markdown
### 1. Hiểu đề bài / Understanding the Problem

- **Input:** [Mô tả input - kiểu dữ liệu, cấu trúc]
- **Output:** [Mô tả output - giá trị trả về, định dạng]
- **Ràng buộc / Constraints:**
  - Constraint 1
  - Constraint 2
  - Constraint 3
- **Edge cases:**
  - Case 1: [mô tả]
  - Case 2: [mô tả]
  - Case 3: [mô tả]
```

**Phần 2: Tư duy / Thinking Process**

```markdown
### 2. Tư duy / Thinking Process

- **Bước 1:** [Phân tích bước đầu tiên - hiểu yêu cầu chính]
- **Bước 2:** [Phân tích bước thứ hai - xác định cách tiếp cận]
- **Bước 3:** [Phân tích bước thứ ba - lên kế hoạch giải pháp]
```

**Phần 3: Ví dụ minh họa / Examples**

```markdown
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

```

```

### Bước 6: Viết Giải pháp 1 - Brute Force / Write Solution 1 - Brute Force

**Cấu trúc giải pháp / Solution Structure:**

````markdown
## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

[Mô tả ý tưởng cơ bản, đơn giản nhất để giải quyết bài toán]

### Thuật toán / Algorithm

1. [Bước 1 - mô tả ngắn gọn]
2. [Bước 2 - mô tả ngắn gọn]
3. [Bước 3 - mô tả ngắn gọn]

### Code / Implementation

```javascript
/**
 * [Tên bài toán] - Brute Force Solution
 * @param {[type]} [param] - [mô tả]
 * @return {[type]} - [mô tả]
 */
function [functionName]([params]) {
  // Implementation
}
```
````

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) hoặc O(2^n) - [giải thích ngắn]
- **Space Complexity:** O(1) hoặc O(n) - [giải thích ngắn]

### Ưu điểm / Pros

- Ưu điểm 1
- Ưu điểm 2

### Nhược điểm / Cons

- Nhược điểm 1
- Nhược điểm 2

````

**Lưu ý khi viết code / Code Writing Notes:**
- Thêm JSDoc comment đầy đủ
- Sử dụng tên hàm rõ ràng: `[problemName]_bruteForce`
- Code phải clean, dễ đọc
- Thêm comment giải thích logic quan trọng

### Bước 7: Viết Giải pháp 2 - Optimized / Write Solution 2 - Optimized

**Cấu trúc giải pháp / Solution Structure:**

```markdown
## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? [giải thích lý do]
- Điểm yếu của giải pháp 1? [chỉ ra vấn đề]
- Cách tiếp cận mới? [mô tả hướng đi]

### Ý tưởng / Idea

[Mô tả ý tưởng cải tiến, tối ưu hơn]

### Thuật toán / Algorithm

1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

### Code / Implementation

```javascript
/**
 * [Tên bài toán] - Optimized Solution
 * @param {[type]} [param] - [mô tả]
 * @return {[type]} - [mô tả]
 */
function [problemName]_optimized([params]) {
  // Implementation
}
````

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - [giải thích]
- **Space Complexity:** O(n) - [giải thích]

### Ưu điểm / Pros

- Ưu điểm 1
- Ưu điểm 2

### Nhược điểm / Cons

- Nhược điểm 1
- Nhược điểm 2

````

### Bước 8: Viết Giải pháp 3 - Advanced (Tùy chọn) / Write Solution 3 - Advanced (Optional)

**Khi nào cần giải pháp 3? / When to include Solution 3?**
- Khi có cách giải quyết khác biệt đáng kể
- Khi có thể tối ưu thêm về space hoặc time
- Khi có thuật toán/pattern đặc biệt có thể áp dụng

**Cấu trúc tương tự giải pháp 2 / Similar structure to Solution 2**

### Bước 9: So sánh Các Giải pháp / Compare Solutions

```markdown
## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ                   |
| Optimized            | O(n)  | O(n)  | Trung bình / Medium | Mảng lớn                   |
| Advanced             | O(n)  | O(1)  | Khó / Hard          | Cần tối ưu bộ nhớ          |
````

### Bước 10: Viết Test Cases / Write Test Cases

````markdown
## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input = [...];
const expected = [...];
const result = [functionName](input);
console.log(result === expected); // true
```
````

### Test Case 2: Edge Case

```javascript
const input = [...];
const expected = [...];
const result = [functionName](input);
console.log(result === expected); // true
```

### Test Case 3: Large Input

```javascript
const input = [...];
const expected = [...];
const result = [functionName](input);
console.log(result === expected); // true
```

````

### Bước 11: Liên kết Thuật toán/Pattern / Link Algorithms/Patterns

```markdown
## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Array](../algorithms/data-structures/array.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)
````

**Lưu ý / Notes:**

- Nếu thuật toán/pattern chưa tồn tại, phải tạo file mới trong thư mục `algorithms/`
- Sử dụng đường dẫn tương đối: `../algorithms/...`

---

## 🧠 Quy trình Tạo File Thuật toán / Algorithm File Creation Workflow

### Bước 1: Xác định Loại Thuật toán/Pattern / Identify Algorithm/Pattern Type

**Các loại trong thư mục algorithms/ / Types in algorithms/ directory:**

1. **data-structures/**: Cấu trúc dữ liệu
   - Array, Linked List, Stack, Queue, Hash Table, Tree, Graph, Heap

2. **algorithms/**: Các thuật toán
   - Sorting, Searching, Binary Search, Recursion, Divide and Conquer, Greedy

3. **patterns/**: Các pattern tư duy
   - Two Pointers, Sliding Window, Fast Slow Pointers, Merge Intervals

4. **dynamic-programming/**: Dynamic Programming
   - DP Basics, DP 1D, DP 2D, Knapsack, LCS

5. **graph-algorithms/**: Thuật toán đồ thị
   - BFS, DFS, Dijkstra, Topological Sort, Union Find

### Bước 2: Đặt tên File / File Naming Convention

**Quy tắc đặt tên file / File Naming Rule:**

```
[kebab-case-name].md
```

**Ví dụ / Examples:**

- Two Pointers → `two-pointers.md`
- Binary Search → `binary-search.md`
- Linked List → `linked-list.md`

### Bước 3: Copy Template và Điền Thông tin / Copy Template and Fill Information

1. **Mở template:** [`template-algorithm.md`](template-algorithm.md)
2. **Copy toàn bộ nội dung** template
3. **Tạo file mới** với tên đã xác định
4. **Điền thông tin vào các phần:**

### Bước 4: Viết Khái niệm / Write Concept

```markdown
## 📚 Khái niệm / Concept

[Giải thích chi tiết về thuật toán/pattern - bao gồm cả tiếng Việt và tiếng Anh]

### Các khái niệm cơ bản / Basic Concepts

- Khái niệm 1: [giải thích]
- Khái niệm 2: [giải thích]
- Khái niệm 3: [giải thích]
```

### Bước 5: Khi nào dùng? / When to use?

```markdown
## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Điều kiện 1
  - Điều kiện 2
  - Điều kiện 3

- **Không dùng khi:**
  - Điều kiện 1
  - Điều kiện 2
```

### Bước 6: Các biến thể / Variations

````markdown
## 🔄 Các biến thể / Variations

### Biến thể 1 / Variation 1

[Mô tả biến thể]

```javascript
// Code mẫu cho biến thể 1
```
````

### Biến thể 2 / Variation 2

[Mô tả biến thể]

```javascript
// Code mẫu cho biến thể 2
```

````

### Bước 7: Code Template / Code Template

```markdown
## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * [Tên thuật toán] - Basic Template
 * @param {[type]} [param] - [mô tả]
 * @return {[type]} - [mô tả]
 */
function algorithmTemplate(input) {
  // Implementation
}
````

### Template nâng cao / Advanced Template

```javascript
/**
 * [Tên thuật toán] - Advanced Template
 * @param {[type]} [param] - [mô tả]
 * @return {[type]} - [mô tả]
 */
function algorithmTemplateAdvanced(input) {
  // Implementation
}
```

````

### Bước 8: Ví dụ minh họa / Examples

```markdown
## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1

**Mô tả:** [Mô tả bài toán]

**Code:**

```javascript
function example1(input) {
  // Implementation
}

// Time: O(n), Space: O(1)
````

### Ví dụ 2 / Example 2

**Mô tả:** [Mô tả bài toán]

**Code:**

```javascript
function example2(input) {
  // Implementation
}

// Time: O(n log n), Space: O(n)
```

````

### Bước 9: Bài toán LeetCode sử dụng / LeetCode Problems using this

```markdown
## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Two Sum](../problems/easy/001-two-sum.md)
- [3Sum](../problems/medium/015-3sum.md)
- [Container With Most Water](../problems/medium/011-container-with-most-water.md)
````

### Bước 10: Độ phức tạp / Complexity

```markdown
## 📊 Độ phức tạp / Complexity

- **Time Complexity:** O(...) - [giải thích chi tiết]
- **Space Complexity:** O(...) - [giải thích chi tiết]
```

### Bước 11: Lỗi thường gặp / Common Pitfalls

```markdown
## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Lỗi 1:** [Mô tả lỗi] - [Cách khắc phục]
2. **Lỗi 2:** [Mô tả lỗi] - [Cách khắc phục]
3. **Lỗi 3:** [Mô tả lỗi] - [Cách khắc phục]
```

### Bước 12: Tips & Tricks

```markdown
## 💡 Tips & Tricks

- Tip 1: [mô tả]
- Tip 2: [mô tả]
- Tip 3: [mô tả]
```

### Bước 13: Tài liệu tham khảo / References

```markdown
## 📚 Tài liệu tham khảo / References

- [Reference 1](URL)
- [Reference 2](URL)
- [Reference 3](URL)
```

---

## ✅ Checklist Kiểm tra / Checklist

### Khi xử lý Bài toán LeetCode (Toàn bộ quy trình) / When Processing LeetCode Problem (Full Workflow)

#### Bước 1: Tạo File Bài toán / Create Problem File

- [ ] Đặt tên file đúng quy tắc: `[ProblemID]-[kebab-case-name].md`
- [ ] Đặt file đúng thư mục theo độ khó (easy/medium/hard)
- [ ] Điền đầy đủ thông tin trong phần "Thông tin Bài toán"
- [ ] Copy nguyên văn đề bài từ LeetCode
- [ ] Phân tích đề bài đầy đủ (Input, Output, Constraints, Edge cases)
- [ ] Viết ít nhất 2 giải pháp (Brute Force + Optimized)
- [ ] Code có JSDoc comment đầy đủ
- [ ] Mỗi giải pháp có độ phức tạp Time/Space
- [ ] Có bảng so sánh các giải pháp
- [ ] Có test cases đầy đủ (Basic, Edge, Large)

#### Bước 2: Tạo File Thuật toán/Pattern (Nếu chưa tồn tại) / Create Algorithm/Pattern Files (If Not Exist)

- [ ] Kiểm tra các thuật toán/pattern trong "Thông tin Bài toán"
- [ ] Với mỗi thuật toán/pattern chưa tồn tại:
  - [ ] Đặt file đúng thư mục (data-structures/algorithms/patterns/dynamic-programming/graph-algorithms)
  - [ ] Đặt tên file đúng quy tắc kebab-case
  - [ ] Giải thích khái niệm rõ ràng (cả VI và EN)
  - [ ] Liệt kê khi nào dùng/không dùng
  - [ ] Có ít nhất 2 biến thể (nếu có)
  - [ ] Có code template (Basic + Advanced)
  - [ ] Có ít nhất 2 ví dụ minh họa
  - [ ] Có độ phức tạp Time/Space
  - [ ] Có phần lỗi thường gặp
  - [ ] Có tips & tricks
  - [ ] Có tài liệu tham khảo

#### Bước 3: Liên kết Chéo giữa các File / Cross-linking Between Files

- [ ] Trong file bài toán: Thêm liên kết đến tất cả thuật toán/pattern liên quan
- [ ] Trong mỗi file thuật toán/pattern: Thêm bài toán vừa tạo vào danh sách "Bài toán LeetCode sử dụng"
- [ ] Kiểm tra tất cả liên kết đều hoạt động (đường dẫn tương đối đúng)
- [ ] Đảm bảo liên kết hai chiều (bidirectional)

#### Bước 4: Kiểm tra và Cập nhật / Check and Update

- [ ] Kiểm tra nội dung đầy đủ theo checklist
- [ ] Cập nhật README.md (thêm bài toán mới vào danh sách nếu cần)
- [ ] Kiểm tra format nhất quán với các file khác

### Khi tạo File Thuật toán/Pattern Độc lập / When Creating Standalone Algorithm/Pattern File

- [ ] Đặt file đúng thư mục (data-structures/algorithms/patterns/dynamic-programming/graph-algorithms)
- [ ] Đặt tên file đúng quy tắc kebab-case
- [ ] Giải thích khái niệm rõ ràng (cả VI và EN)
- [ ] Liệt kê khi nào dùng/không dùng
- [ ] Có ít nhất 2 biến thể (nếu có)
- [ ] Có code template (Basic + Advanced)
- [ ] Có ít nhất 2 ví dụ minh họa
- [ ] Liên kết đến các bài toán LeetCode sử dụng (nếu có)
- [ ] Có độ phức tạp Time/Space
- [ ] Có phần lỗi thường gặp
- [ ] Có tips & tricks
- [ ] Có tài liệu tham khảo

---

## 🔗 Liên kết quan trọng / Important Links

- [Template Bài toán / Problem Template](template-problem.md)
- [Template Thuật toán / Algorithm Template](template-algorithm.md)
- [README LeetCode](README.md)
- [Kế hoạch Tổ chức lại / Reorganization Plan](REORGANIZATION_PLAN.md)

---

## 💡 Mẹo sử dụng / Usage Tips

### Cho AI Assistant / For AI Assistant

Khi yêu cầu AI tạo file bài toán LeetCode, cung cấp thông tin:

```
Đọc data/leetcode/WORKFLOW.md rồi tạo file bài toán LeetCode:
- Problem ID: 1
- Problem Name: Two Sum
- Difficulty: Easy
- URL: https://leetcode.com/problems/two-sum/
- Tags: Array, Hash Map
- Related Algorithms: Hash Table
- Related Patterns: None
```

**Lưu ý quan trọng:** AI sẽ tự động:

1. Tạo file bài toán đầy đủ
2. Kiểm tra và tạo file thuật toán/pattern nếu chưa tồn tại
3. Liên kết chéo giữa tất cả các file
4. Cập nhật checklist

Hoặc khi yêu cầu tạo file thuật toán độc lập:

```
Đọc data/leetcode/WORKFLOW.md rồi tạo file thuật toán:
- Loại: Pattern
- Tên: Two Pointers
- Thư mục: algorithms/patterns/
```

### Cho Người dùng / For User

1. **Luôn đọc WORKFLOW.md trước** khi yêu cầu tạo file mới
2. **Sử dụng checklist** để đảm bảo không bỏ sót phần nào
3. **Quy tắc quan trọng:**
   - Khi xử lý bài toán, PHẢI tạo file thuật toán/pattern nếu chưa tồn tại
   - Sau khi tạo đủ xong, PHẢI liên kết chéo giữa tất cả các file
4. **Giữ format nhất quán** với các file đã có
5. **Đặt tên file rõ ràng** để dễ tìm kiếm
6. **Kiểm tra liên kết** sau khi hoàn thành

---

_Last updated: 2026-02-03_
