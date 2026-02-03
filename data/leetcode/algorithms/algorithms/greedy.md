# Greedy / Tham lam

> Thuật toán Greedy - Giải thích chi tiết / Greedy Algorithm - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Greedy** (Tham lam) là một kỹ thuật lập trình trong đó chúng ta đưa ra quyết định tối ưu cục bộ (local optimum) tại mỗi bước, với hy vọng tìm được giải pháp tối ưu toàn cục (global optimum). Khác với Dynamic Programming, Greedy không xem xét lại các quyết định đã đưa ra.

### Các khái niệm cơ bản / Basic Concepts

- **Local Optimum (Tối ưu cục bộ):** Lựa chọn tốt nhất tại thời điểm hiện tại
- **Global Optimum (Tối ưu toàn cục):** Giải pháp tốt nhất cho toàn bộ bài toán
- **Greedy Choice Property (Tính chất lựa chọn tham lam):** Có thể chọn lựa chọn tham lam
- **Optimal Substructure (Cấu trúc tối ưu):** Giải pháp tối ưu chứa các giải pháp tối ưu của các bài toán con

### Ví dụ thực tế / Real-world Examples

- **Change Making:** Đổi tiền với số tờ tiền ít nhất
- **Activity Selection:** Chọn nhiều hoạt động không xung đột nhất
- **Huffman Coding:** Nén dữ liệu với mã Huffman
- **Dijkstra's Algorithm:** Tìm đường đi ngắn nhất
- **Kruskal's Algorithm:** Tìm Minimum Spanning Tree

---

## 🎯 Khi nào dùng? / When to use?

- **Bài toán có Greedy Choice Property**
- **Bài toán có Optimal Substructure**
- **Cần giải pháp nhanh, đơn giản**
- **Không cần xem xét lại các quyết định đã đưa ra**

### Khi KHÔNG nên dùng / When NOT to use

- **Bài toán cần xem xét lại các quyết định**
- **Bài toán có nhiều ràng buộc phức tạp**
- **Bài toán yêu cầu giải pháp tối ưu toàn cục**

---

## 🔄 Các thuật toán Greedy phổ biến / Common Greedy Algorithms

### Activity Selection Problem

Chọn nhiều hoạt động không xung đột nhất bằng cách chọn hoạt động kết thúc sớm nhất mỗi lần.

### Fractional Knapsack Problem

Chọn các vật phẩm dựa trên giá trị trên đơn vị trọng lượng (có thể chọn một phần).

### Huffman Coding

Nén dữ liệu bằng cách gán mã ngắn nhất cho ký tự xuất hiện nhiều nhất.

### Dijkstra's Algorithm

Tìm đường đi ngắn nhất trong đồ thị có trọng số không âm.

### Prim's Algorithm

Tìm Minimum Spanning Tree bằng cách thêm cạnh có trọng số nhỏ nhất.

### Kruskal's Algorithm

Tìm Minimum Spanning Tree bằng cách thêm cạnh không tạo chu trình.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Greedy cơ bản - Basic Greedy Template
 * @param {*} input - Đầu vào
 * @return {*} - Kết quả
 */
function greedyAlgorithm(input) {
  // Khởi tạo kết quả
  const result = [];

  // Sắp xếp đầu vào theo tiêu chí tham lam
  const sortedInput = sortByGreedyCriteria(input);

  // Duyệt qua đầu vào đã sắp xếp
  for (const item of sortedInput) {
    // Kiểm tra xem có thể chọn item này không
    if (canSelect(item, result)) {
      // Chọn item này
      result.push(item);
    }
  }

  return result;
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Greedy nâng cao - Advanced Greedy Template
 * Bao gồm validation và edge case handling
 * @param {*} input - Đầu vào
 * @return {*} - Kết quả
 */
function greedyAlgorithmAdvanced(input) {
  // Edge case
  if (input.length === 0) {
    return [];
  }

  // Khởi tạo kết quả
  const result = [];
  let currentValue = 0;

  // Sắp xếp theo tiêu chí tham lam
  const sortedInput = [...input].sort((a, b) => b.value - a.value);

  // Duyệt qua đầu vào đã sắp xếp
  for (const item of sortedInput) {
    // Kiểm tra constraint
    if (isValid(item, result, currentValue)) {
      result.push(item);
      currentValue += item.value;
    }
  }

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Activity Selection Problem

**Mô tả:** Cho một danh sách các hoạt động với thời gian bắt đầu và kết thúc, chọn nhiều hoạt động không xung đột nhất.

**Code:**

```javascript
/**
 * Activity Selection Problem - Bài toán chọn hoạt động
 * @param {Array<{start: number, end: number}>} activities - Danh sách hoạt động
 * @return {Array<{start: number, end: number}>} - Các hoạt động được chọn
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function activitySelection(activities) {
  // Sắp xếp hoạt động theo thời gian kết thúc
  const sorted = [...activities].sort((a, b) => a.end - b.end);

  const result = [];
  let lastEnd = -Infinity;

  // Chọn hoạt động không xung đột
  for (const activity of sorted) {
    if (activity.start >= lastEnd) {
      result.push(activity);
      lastEnd = activity.end;
    }
  }

  return result;
}

// Test
const activities = [
  { start: 1, end: 3 },
  { start: 2, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 8, end: 9 },
  { start: 5, end: 9 },
];
console.log(activitySelection(activities));
// [{ start: 1, end: 3 }, { start: 3, end: 5 }, { start: 5, end: 7 }, { start: 8, end: 9 }]
```

### Ví dụ 2 / Example 2: Jump Game

**Mô tả:** Cho một mảng số nguyên không âm, mỗi phần tử đại diện cho độ dài nhảy tối đa từ vị trí đó. Xác định xem có thể đến vị trí cuối cùng không.

**Code:**

```javascript
/**
 * Jump Game - Bài toán nhảy
 * @param {number[]} nums - Mảng số nguyên không âm
 * @return {boolean} - True nếu có thể đến cuối cùng
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function canJump(nums) {
  if (nums.length === 1) {
    return true;
  }

  let maxReach = nums[0];
  let steps = nums[0];
  let jumps = 1;

  for (let i = 1; i < nums.length; i++) {
    if (i === nums.length - 1) {
      return true;
    }

    maxReach = Math.max(maxReach, i + nums[i]);
    steps--;

    if (steps === 0) {
      jumps++;
      steps = maxReach - i;
    }
  }

  return false;
}

// Test
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // true
console.log(canJump([2, 0, 0])); // false
```

### Ví dụ 3 / Example 3: Gas Station

**Mô tả:** Có n trạm xăng dọc theo một vòng tròn. Cho hai mảng gas và cost, xác định xem có thể đi hết vòng tròn không.

**Code:**

```javascript
/**
 * Gas Station - Bài toán trạm xăng
 * @param {number[]} gas - Mảng lượng xăng tại mỗi trạm
 * @param {number[]} cost - Mảng chi phí để đi từ trạm i đến i+1
 * @return {number} - Index trạm bắt đầu, hoặc -1 nếu không thể
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function canCompleteCircuit(gas, cost) {
  const n = gas.length;
  let totalGas = 0;
  let totalCost = 0;
  let currentGas = 0;
  let start = 0;

  for (let i = 0; i < n; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currentGas += gas[i] - cost[i];

    if (currentGas < 0) {
      // Không thể đến trạm i+1, bắt đầu từ i+1
      start = i + 1;
      currentGas = 0;
    }
  }

  // Nếu tổng gas >= tổng cost, có thể hoàn thành
  return totalGas >= totalCost ? start : -1;
}

// Test
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // -1
```

### Ví dụ 4 / Example 4: Maximum Subarray

**Mô tả:** Tìm tổng lớn nhất của một mảng con liên tiếp (giống Kadane's Algorithm).

**Code:**

```javascript
/**
 * Maximum Subarray - Tổng lớn nhất của mảng con (Kadane's Algorithm)
 * @param {number[]} nums - Mảng số nguyên
 * @return {number} - Tổng lớn nhất của mảng con
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxSubarray(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Tối ưu cục bộ: hoặc bắt đầu mảng mới tại i, hoặc nối vào mảng hiện tại
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

    // Cập nhật tối ưu toàn cục
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// Test
console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubarray([1, 2, 3, 4, 5])); // 15
console.log(maxSubarray([-1, -2, -3])); // -1
```

### Ví dụ 5 / Example 5: Partition Labels

**Mô tả:** Cho một chuỗi s và một số nguyên k, chia chuỗi thành các phần con sao cho mỗi phần con chứa các ký tự khác nhau và số phần con là nhỏ nhất.

**Code:**

```javascript
/**
 * Partition Labels - Chia nhãn
 * @param {string} s - Chuỗi cần chia
 * @param {number} k - Số phần con tối đa
 * @return {number[]} - Số lượng ký tự trong mỗi phần con
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function partitionLabels(s, k) {
  const n = s.length;
  let count = 0;
  let result = [];

  for (let i = 0; i < n; i++) {
    count++;

    // Nếu đến cuối chuỗi hoặc đã dùng k phần con
    if (i === n - 1 || s[i] !== s[i + 1]) {
      result.push(count);
      count = 0;
    }
  }

  // Nếu số phần con > k, cần gộp
  while (result.length > k) {
    // Gộp hai phần con có tổng nhỏ nhất
    let minIndex = 0;
    for (let i = 1; i < result.length; i++) {
      if (result[i - 1] + result[i] < result[minIndex - 1] + result[minIndex]) {
        minIndex = i;
      }
    }

    // Gộp phần con tại minIndex-1 và minIndex
    result[minIndex - 1] += result[minIndex];
    result.splice(minIndex, 1);
  }

  return result;
}

// Test
console.log(partitionLabels("abacbc", 3)); // [2, 1, 3]
console.log(partitionLabels("ababcbacadefegdehijhklij", 3)); // [6, 6, 6, 6, 6, 6]
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Jump Game](https://leetcode.com/problems/jump-game/)
- [Gas Station](https://leetcode.com/problems/gas-station/)
- [Candy](https://leetcode.com/problems/candy/)
- [Partition Labels](https://leetcode.com/problems/partition-labels/)
- [Task Scheduler](https://leetcode.com/problems/task-scheduler/)

---

## 📊 So sánh với các kỹ thuật khác / Comparison with Other Techniques

| Kỹ thuật / Technique | Ưu điểm / Pros  | Nhược điểm / Cons | Khi nào dùng / When to use          |
| -------------------- | --------------- | ----------------- | ----------------------------------- |
| Greedy               | Đơn giản, nhanh | Không luôn tối ưu | Bài toán có Greedy Choice Property  |
| Dynamic Programming  | Tối ưu toàn cục | Khó implement     | Bài toán có overlapping subproblems |
| Brute Force          | Đơn giản        | Rất chậm          | Mảng nhỏ, demo                      |
| Divide and Conquer   | Tối ưu          | Có thể tốn bộ nhớ | Bài toán có thể chia nhỏ            |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Không kiểm tra Greedy Choice Property:** Greedy không luôn hoạt động
2. **Sai tiêu chí sắp xếp:** Cần sắp xếp theo đúng tiêu chí tham lam
3. **Quên edge cases:** Luôn kiểm tra edge cases như mảng rỗng
4. **Không xác định rõ tiêu chí tham lam:** Cần xác định rõ ràng tiêu chí lựa chọn
5. **Không xác định constraint:** Cần xác định rõ ràng constraint của bài toán

---

## 💡 Tips & Tricks

1. **Greedy Choice Property:** Kiểm tra xem bài toán có Greedy Choice Property không
2. **Optimal Substructure:** Kiểm tra xem bài toán có Optimal Substructure không
3. **Sắp xếp theo tiêu chí tham lam:** Luôn sắp xếp đầu vào theo đúng tiêu chí
4. **Validation:** Luôn validate kết quả
5. **Counterexample:** Tìm counterexample để chứng minh Greedy không hoạt động

---

## 📚 Tài liệu tham khảo / References

- [Greedy Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)
- [Activity Selection Problem - Wikipedia](https://en.wikipedia.org/wiki/Activity_selection_problem)
- [Dijkstra's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

---

_Last updated: 2025-02-03_
