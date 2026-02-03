# 3Sum Closest / Tổng Ba Số Gần Nhất

> LeetCode Problem 16 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 16
- **URL:** https://leetcode.com/problems/3sum-closest/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array, Two Pointers, Sorting
- **Tags:** array, two-pointers, sorting
- **Thuật toán liên quan / Related Algorithms:** Array, Sorting
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

**Example 1:**

```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

**Example 2:**

```
Input: nums = [0,0,0], target = 1
Output: 0
```

**Constraints:**

- `3 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `-10^4 <= target <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng nums có độ dài từ 3 đến 1000 và một số target.
- **Output:** Tổng của ba số trong nums có tổng gần nhất với target.
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 3 đến 1000
  - Giá trị mỗi phần tử: -1000 đến 1000
  - Target: -10,000 đến 10,000
  - Luôn có đúng một giải pháp
- **Edge cases:**
  - Mảng có đúng 3 phần tử: trả về tổng của cả ba
  - Target nằm giữa các tổng có thể: trả về tổng gần nhất

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu
  - Tìm ba số trong nums có tổng gần nhất với target
  - Không cần trả về ba số, chỉ cần trả về tổng
  - Luôn có đúng một giải pháp

- **Bước 2:** Tư duy Brute Force
  - Kiểm tra tất cả các bộ ba (i, j, k) có thể
  - Tính tổng và tính khoảng cách đến target
  - Lưu tổng có khoảng cách nhỏ nhất
  - Vấn đề: O(n³) - quá chậm với n = 1000

- **Bước 3:** Tư duy Sorting + Two Pointers
  - Sắp xếp mảng trước
  - Với mỗi phần tử nums[i]:
    - Dùng Two Pointers để tìm hai phần tử còn lại
    - left = i + 1, right = n - 1
    - Tính sum = nums[i] + nums[left] + nums[right]
    - Cập nhật closestSum nếu |sum - target| nhỏ hơn
    - Nếu sum < target: left++ (cần số lớn hơn)
    - Nếu sum > target: right-- (cần số nhỏ hơn)
    - Nếu sum == target: trả về target ngay (không thể gần hơn)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [-1,2,1,-4], target = 1
Sau khi sắp xếp: [-4,-1,1,2]

i=0, nums[i]=-4:
  left=1, right=3: sum = -4 + (-1) + 2 = -3, |sum-target|=4, closestSum=-3
    -3 < 1 → left++
  left=2, right=3: sum = -4 + 1 + 2 = -1, |sum-target|=2, closestSum=-1
    -1 < 1 → left++
  left=3, right=3: left >= right, dừng

i=1, nums[i]=-1:
  left=2, right=3: sum = -1 + 1 + 2 = 2, |sum-target|=1, closestSum=2
    2 > 1 → right--
  left=2, right=2: left >= right, dừng

Kết quả: 2

Example 2: nums = [0,0,0], target = 1
Sau khi sắp xếp: [0,0,0]

i=0, nums[i]=0:
  left=1, right=2: sum = 0 + 0 + 0 = 0, |sum-target|=1, closestSum=0
    0 < 1 → left++
  left=2, right=2: left >= right, dừng

Kết quả: 0
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra tất cả các bộ ba (i, j, k) có thể, tính tổng và khoảng cách đến target.

### Thuật toán / Algorithm

1. Khởi tạo closestSum = nums[0] + nums[1] + nums[2]
2. Với mỗi i từ 0 đến n-3:
   a. Với mỗi j từ i+1 đến n-2:
   b. Với mỗi k từ j+1 đến n-1:
   c. Tính sum = nums[i] + nums[j] + nums[k]
   d. Nếu |sum - target| < |closestSum - target|: - closestSum = sum
3. Trả về closestSum

### Code / Implementation

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function solution1_bruteForce(nums, target) {
  const n = nums.length;
  let closestSum = nums[0] + nums[1] + nums[2];

  // Kiểm tra tất cả các bộ ba
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const sum = nums[i] + nums[j] + nums[k];

        // Cập nhật closestSum nếu gần target hơn
        if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
          closestSum = sum;
        }
      }
    }
  }

  return closestSum;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n³) - kiểm tra tất cả các bộ ba
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code dễ đọc
- Không cần tư duy phức tạp

### Nhược điểm / Cons

- Quá chậm với mảng lớn
- Time Limit Exceeded trên LeetCode
- Không tối ưu

---

## 🚀 Giải pháp 2: Sorting + Two Pointers (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp Brute Force quá chậm O(n³), không chấp nhận được với n = 1000.
- **Điểm yếu của giải pháp 1?** Kiểm tra lại các bộ ba đã xem xét nhiều lần.
- **Cách tiếp cận mới?** Sắp xếp mảng và dùng Two Pointers để tìm hai phần tử còn lại.

### Ý tưởng / Idea

Sắp xếp mảng trước. Với mỗi phần tử nums[i], dùng Two Pointers để tìm hai phần tử còn lại có tổng gần nhất với target - nums[i].

### Thuật toán / Algorithm

1. Sắp xếp mảng nums
2. Khởi tạo closestSum = nums[0] + nums[1] + nums[2]
3. Với mỗi i từ 0 đến n-3:
   a. left = i + 1, right = n - 1
   b. Trong khi left < right:
   - sum = nums[i] + nums[left] + nums[right]
   - Nếu |sum - target| < |closestSum - target|: closestSum = sum
   - Nếu sum == target: trả về target ngay
   - Nếu sum < target: left++
   - Nếu sum > target: right--
4. Trả về closestSum

### Code / Implementation

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function solution2_twoPointers(nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b); // Sắp xếp mảng
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      // Cập nhật closestSum nếu gần target hơn
      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }

      // Nếu tìm thấy tổng bằng target, trả về ngay
      if (sum === target) {
        return target;
      }

      // Di chuyển con trỏ
      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closestSum;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - sắp xếp O(n log n) + vòng lặp O(n²)
- **Space Complexity:** O(1) hoặc O(n) - tùy thuộc thuật toán sắp xếp

### Ưu điểm / Pros

- Tối ưu về thời gian
- Chấp nhận được trên LeetCode
- Code rõ ràng

### Nhược điểm / Cons

- Cần sắp xếp mảng (thay đổi thứ tự ban đầu)
- Tư duy Two Pointers cần thời gian để hiểu

---

## ⚡ Giải pháp 3: Early Termination (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Có thể thêm early termination khi không thể tìm kết quả tốt hơn.
- **Có thuật toán/pattern nào phù hợp hơn?** Giữ nguyên Two Pointers nhưng thêm logic early termination.

### Ý tưởng / Idea

Giữ nguyên thuật toán Two Pointers nhưng thêm early termination: nếu tìm thấy sum == target, trả về ngay vì không thể gần hơn.

### Thuật toán / Algorithm

1. Sắp xếp mảng nums
2. Khởi tạo closestSum = nums[0] + nums[1] + nums[2]
3. Với mỗi i từ 0 đến n-3:
   a. left = i + 1, right = n - 1
   b. Trong khi left < right:
   - sum = nums[i] + nums[left] + nums[right]
   - Nếu |sum - target| < |closestSum - target|: closestSum = sum
   - Nếu sum == target: trả về target ngay (early termination)
   - Nếu sum < target: left++
   - Nếu sum > target: right--
4. Trả về closestSum

### Code / Implementation

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function solution3_earlyTermination(nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }

      // Early termination: tìm thấy tổng bằng target
      if (sum === target) {
        return target;
      }

      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closestSum;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1) hoặc O(n)

### Ưu điểm / Pros

- Early termination giúp tối ưu trong trường hợp tốt
- Code gọn

### Nhược điểm / Cons

- Không cải thiện nhiều về độ phức tạp
- Tương đương giải pháp 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space          | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | -------------- | ------------------- | -------------------------- |
| Brute Force          | O(n³) | O(1)           | Dễ / Easy           | Mảng nhỏ, cần nhanh        |
| Two Pointers         | O(n²) | O(1) hoặc O(n) | Trung bình / Medium | Tối ưu thời gian           |
| Early Termination    | O(n²) | O(1) hoặc O(n) | Trung bình / Medium | Có thể early terminate     |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [-1, 2, 1, -4];
const target = 1;
console.log(solution1_bruteForce(nums, target)); // Expected: 2
console.log(solution2_twoPointers(nums, target)); // Expected: 2
console.log(solution3_earlyTermination(nums, target)); // Expected: 2
```

### Test Case 2: Tất cả số bằng 0

```javascript
const nums = [0, 0, 0];
const target = 1;
console.log(solution1_bruteForce(nums, target)); // Expected: 0
console.log(solution2_twoPointers(nums, target)); // Expected: 0
console.log(solution3_earlyTermination(nums, target)); // Expected: 0
```

### Test Case 3: Có số âm

```javascript
const nums = [-3, -2, -5, 3, -4];
const target = -1;
console.log(solution1_bruteForce(nums, target)); // Expected: -2
console.log(solution2_twoPointers(nums, target)); // Expected: -2
console.log(solution3_earlyTermination(nums, target)); // Expected: -2
```

### Test Case 4: Target bằng tổng có thể

```javascript
const nums = [0, 2, 1, -3];
const target = 0;
console.log(solution1_bruteForce(nums, target)); // Expected: 0
console.log(solution2_twoPointers(nums, target)); // Expected: 0
console.log(solution3_earlyTermination(nums, target)); // Expected: 0
```

### Test Case 5: Mảng lớn

```javascript
const nums = Array.from({ length: 100 }, (_, i) => i - 50);
const target = 0;
console.log(solution2_twoPointers(nums, target)); // Expected: tổng gần nhất với 0
```

---

## 📚 Tài liệu tham khảo / References

- [Two Pointers](../../algorithms/patterns/two-pointers.md)
- [Array](../../algorithms/data-structures/array.md)
- [Sorting](../../algorithms/algorithms/sorting.md)
- [LeetCode Discuss](https://leetcode.com/problems/3sum-closest/discuss/)
- [Video giải thích](https://www.youtube.com/watch?v=PyQcx6Q0hI)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn sắp xếp mảng trước khi dùng Two Pointers
- **Tip 2:** Nếu tìm thấy sum == target, trả về ngay vì không thể gần hơn
- **Tip 3:** Sử dụng Math.abs() để tính khoảng cách đến target
- **Lỗi thường gặp:** Quên cập nhật closestSum sau khi tính sum

---

_Last updated: 2026-02-03_
