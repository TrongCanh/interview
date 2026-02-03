# Jump Game II / Trò Chơi Nhảy II

> LeetCode Problem 45 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 45
- **URL:** https://leetcode.com/problems/jump-game-ii/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Greedy
- **Tags:** Array, Greedy, BFS
- **Thuật toán liên quan / Related Algorithms:** Greedy, BFS
- **Patterns liên quan / Related Patterns:** Greedy

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

You are given a **0-indexed** array of non-negative integers `nums` of length `n`. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum jump length from that position. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:

- `0 <= j <= nums[i]`
- `i + j < n`

Return the minimum number of jumps to reach `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.

**Example 1:**

```
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**

```
Input: nums = [2,3,0,1,4]
Output: 2
```

**Constraints:**

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- It's guaranteed that you can reach `nums[n - 1]`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng số nguyên không âm, mỗi phần tử đại diện cho khoảng cách nhảy tối đa từ vị trí đó
- **Output:** Số lần nhảy tối thiểu để đến được vị trí cuối cùng
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 10^4
  - Giá trị phần tử: 0 ≤ nums[i] ≤ 1000
  - Đảm bảo có thể đến được vị trí cuối cùng
- **Edge cases:**
  - Mảng có 1 phần tử (không cần nhảy)
  - Mảng có 2 phần tử
  - Có thể nhảy trực tiếp đến cuối

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm số bước nhảy tối thiểu
- **Bước 2:** Nhận thấy có thể dùng BFS hoặc greedy
- **Bước 3:** Với greedy, theo dõi phạm vi có thể đạt được trong mỗi bước

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [2,3,1,1,4]
- Bước 0: tại index 0, có thể nhảy đến index 1 hoặc 2
- Bước 1: chọn index 1 (giá trị 3), có thể nhảy đến index 2, 3, 4
- Bước 2: từ index 1, nhảy đến index 4 (cuối)
- Tổng: 2 bước

Example 2: nums = [2,3,0,1,4]
- Bước 0: tại index 0, có thể nhảy đến index 1 hoặc 2
- Bước 1: chọn index 1 (giá trị 3), có thể nhảy đến index 2, 3, 4
- Bước 2: từ index 1, nhảy đến index 4 (cuối)
- Tổng: 2 bước
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng BFS để tìm đường đi ngắn nhất từ index 0 đến index cuối.

### Thuật toán / Algorithm

1. Dùng queue để BFS
2. Bắt đầu từ index 0
3. Mỗi bước, lấy tất cả các vị trí có thể đạt được
4. Lặp cho đến khi đến được index cuối

### Code / Implementation

```javascript
function jump_bruteForce(nums) {
  if (nums.length <= 1) {
    return 0;
  }

  const n = nums.length;
  const visited = new Set();
  const queue = [[0, 0]]; // [index, jumps]
  visited.add(0);

  while (queue.length > 0) {
    const [currentIndex, jumps] = queue.shift();

    // Tìm tất cả các vị trí có thể nhảy đến
    const maxJump = nums[currentIndex];
    for (let j = 1; j <= maxJump; j++) {
      const nextIndex = currentIndex + j;

      if (nextIndex >= n - 1) {
        return jumps + 1;
      }

      if (!visited.has(nextIndex)) {
        visited.add(nextIndex);
        queue.push([nextIndex, jumps + 1]);
      }
    }
  }

  return -1; // Không thể đến được (theo đề bài thì luôn có thể)
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n^2) - trong trường hợp xấu nhất
- **Space Complexity:** O(n) - visited set và queue

### Ưu điểm / Pros

- Dễ hiểu và implement
- Đảm bảo tìm được đường đi ngắn nhất

### Nhược điểm / Cons

- Không tối ưu về thời gian
- Tốn nhiều bộ nhớ với visited set

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? BFS quá chậm với mảng lớn
- Điểm yếu của giải pháp 1? Không tận dụng tính chất bài toán
- Cách tiếp cận mới? Dùng greedy để theo dõi phạm vi có thể đạt được

### Ý tưởng / Idea

Sử dụng greedy algorithm:

1. Theo dõi phạm vi hiện tại (currentEnd) và phạm vi tiếp theo (farthest)
2. Khi đạt đến currentEnd, tăng số bước nhảy
3. Cập nhật currentEnd = farthest

### Thuật toán / Algorithm

1. Khởi tạo jumps = 0, currentEnd = 0, farthest = 0
2. Duyệt từ đầu đến n-2 (không cần duyệt phần tử cuối):
   - Cập nhật farthest = max(farthest, i + nums[i])
   - Nếu i == currentEnd:
     - jumps++
     - currentEnd = farthest
3. Trả về jumps

### Code / Implementation

```javascript
function jump_optimized(nums) {
  if (nums.length <= 1) {
    return 0;
  }

  const n = nums.length;
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  // Không cần duyệt phần tử cuối cùng
  for (let i = 0; i < n - 1; i++) {
    // Cập nhật vị trí xa nhất có thể đạt được
    farthest = Math.max(farthest, i + nums[i]);

    // Nếu đã đến cuối phạm vi hiện tại, cần nhảy thêm 1 bước
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;

      // Nếu đã có thể đến cuối, thoát sớm
      if (currentEnd >= n - 1) {
        break;
      }
    }
  }

  return jumps;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - chỉ duyệt mảng 1 lần
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Rất nhanh với O(n) thời gian
- Chỉ dùng O(1) extra memory
- Tối ưu về hiệu năng
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Logic cần hiểu rõ greedy
- Cần cẩn thận với edge cases

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Greedy với early termination

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function jump_advanced(nums) {
  // Validate input
  if (!isValidInput(nums)) {
    return 0;
  }

  // Edge case: chỉ có 1 phần tử
  if (nums.length === 1) {
    return 0;
  }

  return greedyJump(nums);
}

/**
 * Kiểm tra input có hợp lệ không
 * @param {number[]} nums - mảng đầu vào
 * @returns {boolean}
 */
function isValidInput(nums) {
  return nums && nums.length > 0;
}

/**
 * Sử dụng greedy algorithm để tìm số bước nhảy tối thiểu
 * @param {number[]} nums - mảng đại diện cho khả năng nhảy
 * @returns {number} - số bước nhảy tối thiểu
 */
function greedyJump(nums) {
  const n = nums.length;

  // Khởi tạo các biến theo dõi
  const state = initializeState();

  // Duyệt qua mảng (không cần phần tử cuối)
  for (let i = 0; i < n - 1; i++) {
    // Cập nhật vị trí xa nhất có thể đạt được từ vị trí hiện tại
    state.farthest = updateFarthest(state.farthest, i, nums[i]);

    // Kiểm tra có cần nhảy thêm bước không
    if (shouldJump(i, state.currentEnd)) {
      state.jumps = incrementJumps(state.jumps);
      state.currentEnd = updateCurrentEnd(state.currentEnd, state.farthest);

      // Early termination: nếu đã có thể đến cuối
      if (canReachEnd(state.currentEnd, n)) {
        break;
      }
    }
  }

  return state.jumps;
}

/**
 * Khởi tạo trạng thái ban đầu
 * @returns {object} - {jumps, currentEnd, farthest}
 */
function initializeState() {
  return {
    jumps: 0,
    currentEnd: 0,
    farthest: 0,
  };
}

/**
 * Cập nhật vị trí xa nhất có thể đạt được
 * @param {number} currentFarthest - vị trí xa nhất hiện tại
 * @param {number} currentIndex - vị trí hiện tại
 * @param {number} jumpValue - giá trị nhảy tại vị trí hiện tại
 * @returns {number} - vị trí xa nhất mới
 */
function updateFarthest(currentFarthest, currentIndex, jumpValue) {
  return Math.max(currentFarthest, currentIndex + jumpValue);
}

/**
 * Kiểm tra có cần nhảy thêm bước không
 * @param {number} currentIndex - vị trí hiện tại
 * @param {number} currentEnd - vị trí cuối phạm vi hiện tại
 * @returns {boolean}
 */
function shouldJump(currentIndex, currentEnd) {
  return currentIndex === currentEnd;
}

/**
 * Tăng số bước nhảy
 * @param {number} jumps - số bước nhảy hiện tại
 * @returns {number} - số bước nhảy mới
 */
function incrementJumps(jumps) {
  return jumps + 1;
}

/**
 * Cập nhật vị trí cuối phạm vi mới
 * @param {number} currentEnd - vị trí cuối phạm vi hiện tại
 * @param {number} farthest - vị trí xa nhất có thể đạt được
 * @returns {number} - vị trí cuối phạm vi mới
 */
function updateCurrentEnd(currentEnd, farthest) {
  return farthest;
}

/**
 * Kiểm tra có thể đến cuối mảng không
 * @param {number} currentEnd - vị trí cuối phạm vi hiện tại
 * @param {number} n - độ dài mảng
 * @returns {boolean}
 */
function canReachEnd(currentEnd, n) {
  return currentEnd >= n - 1;
}

/**
 * Hàm wrapper để dễ test
 * @param {number[]} nums - mảng đầu vào
 * @returns {number} - số bước nhảy tối thiểu
 */
function minJumps(nums) {
  return jump_advanced(nums);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ----- | ----- | ------------------- | ------------------------------- |
| Brute Force (BFS)    | O(n²) | O(n)  | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized (Greedy)   | O(n)  | O(1)  | Trung bình / Medium | Production, cần tối ưu          |
| Advanced (Greedy)    | O(n)  | O(1)  | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(jump_advanced([2, 3, 1, 1, 4])); // Expected: 2
console.log(jump_advanced([2, 3, 0, 1, 4])); // Expected: 2
console.log(jump_advanced([1])); // Expected: 0
```

### Test Case 2: Edge case

```javascript
// Mảng có 2 phần tử
console.log(jump_advanced([1, 1])); // Expected: 1

// Có thể nhảy trực tiếp đến cuối
console.log(jump_advanced([5, 1, 1, 1, 1, 1])); // Expected: 1

// Mỗi bước chỉ nhảy được 1
console.log(jump_advanced([1, 1, 1, 1, 1])); // Expected: 4
```

### Test Case 3: Phức tạp / Complex

```javascript
// Mảng lớn
console.log(jump_advanced([2, 3, 1, 1, 4, 2, 1, 1, 1])); // Expected: 4

// Có vị trí không thể nhảy (0)
console.log(jump_advanced([3, 2, 1, 0, 4])); // Expected: 2

// Phức tạp hơn
console.log(jump_advanced([1, 2, 1, 1, 0, 1])); // Expected: 3
```

---

## 📚 Tài liệu tham khảo / References

- [Greedy](../../algorithms/algorithms/greedy.md)
- [Array](../../algorithms/data-structures/array.md)
- [LeetCode Discuss](https://leetcode.com/problems/jump-game-ii/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Theo dõi 2 giá trị: currentEnd (kết thúc phạm vi hiện tại) và farthest (xa nhất có thể đạt được)
- **Tip 2:** Khi i == currentEnd, cần nhảy thêm 1 bước
- **Tip 3:** Không cần duyệt phần tử cuối cùng vì đã đến đích rồi
- **Tip 4:** Early termination khi currentEnd >= n - 1
- **Lỗi thường gặp và cách tránh:**
  - Quên kiểm tra edge case mảng có 1 phần tử
  - Duyệt cả phần tử cuối cùng (không cần thiết)
  - Sai logic khi cập nhật farthest
  - Quên reset currentEnd khi tăng jumps

---

_Last updated: 2026-02-03_
