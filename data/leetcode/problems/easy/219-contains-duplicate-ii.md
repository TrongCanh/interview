# Contains Duplicate II / Kiểm Tra Trùng Lặp II

> LeetCode Problem 219 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 219
- **URL:** https://leetcode.com/problems/contains-duplicate-ii/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Hash Table
- **Tags:** Array, Hash Table, Sliding Window
- **Thuật toán liên quan / Related Algorithms:** Hash Table, Sliding Window
- **Patterns liên quan / Related Patterns:** Sliding Window

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.

**Example 1:**

```
Input: nums = [1,2,3,1], k = 3
Output: true
Explanation: The duplicate 1 is at indices 0 and 3, and abs(0 - 3) = 3 <= 3.
```

**Example 2:**

```
Input: nums = [1,0,1,1], k = 1
Output: true
Explanation: The duplicate 1 is at indices 2 and 3, and abs(2 - 3) = 1 <= 1.
```

**Example 3:**

```
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
Explanation: No duplicate within distance k.
```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng số nguyên `nums` và số nguyên `k` (khoảng cách tối đa giữa hai chỉ số)
- **Output:** `true` nếu tồn tại hai chỉ số `i` và `j` khác nhau sao cho `nums[i] == nums[j]` và `abs(i - j) <= k`
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 10^5
  - Giá trị phần tử: -10^9 ≤ nums[i] ≤ 10^9
  - Khoảng cách k: 0 ≤ k ≤ 10^5
- **Edge cases:**
  - `k = 0`: luôn trả về `false` vì không thể có hai chỉ số khác nhau với khoảng cách 0
  - Mảng có 1 phần tử: luôn trả về `false`
  - Tất cả phần tử giống nhau: trả về `true` nếu `k >= 1`

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm hai phần tử giống nhau với khoảng cách giữa chỉ số ≤ k
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Hash Map để lưu chỉ số gần nhất, hoặc dùng Sliding Window với Set
- **Bước 3:** Lên kế hoạch giải pháp - Brute Force (kiểm tra từng cặp), Hash Map (O(n) time), Sliding Window (O(n) time, O(k) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: nums = [1,2,3,1], k = 3
- i=0: nums[0]=1, chưa gặp → map={1:0}
- i=1: nums[1]=2, chưa gặp → map={1:0, 2:1}
- i=2: nums[2]=3, chưa gặp → map={1:0, 2:1, 3:2}
- i=3: nums[3]=1, đã gặp tại 0, |3-0|=3 ≤ 3 → return true

Example 2: nums = [1,0,1,1], k = 1
- i=0: nums[0]=1, chưa gặp → map={1:0}
- i=1: nums[1]=0, chưa gặp → map={1:0, 0:1}
- i=2: nums[2]=1, đã gặp tại 0, |2-0|=2 > 1 → cập nhật map={1:2, 0:1}
- i=3: nums[3]=1, đã gặp tại 2, |3-2|=1 ≤ 1 → return true

Example 3: nums = [1,2,3,1,2,3], k = 2
- i=0: nums[0]=1 → map={1:0}
- i=1: nums[1]=2 → map={1:0, 2:1}
- i=2: nums[2]=3 → map={1:0, 2:1, 3:2}
- i=3: nums[3]=1, đã gặp tại 0, |3-0|=3 > 2 → map={1:3, 2:1, 3:2}
- i=4: nums[4]=2, đã gặp tại 1, |4-1|=3 > 2 → map={1:3, 2:4, 3:2}
- i=5: nums[5]=3, đã gặp tại 2, |5-2|=3 > 2 → map={1:3, 2:4, 3:5}
- return false
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

So sánh từng cặp phần tử trong mảng. Nếu tìm thấy hai phần tử giống nhau với khoảng cách chỉ số ≤ k, trả về `true`.

### Thuật toán / Algorithm

1. Duyệt qua mảng với chỉ số `i` từ 0 đến n-2
2. Với mỗi `i`, duyệt qua mảng với chỉ số `j` từ i+1 đến min(i+k, n-1)
3. Nếu `nums[i] === nums[j]`, trả về `true`
4. Sau khi duyệt hết tất cả các cặp, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate II - Brute Force Solution
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @param {number} k - Khoảng cách tối đa giữa hai chỉ số
 * @return {boolean} - true nếu có trùng lặp trong khoảng k, false nếu không
 */
function containsNearbyDuplicate_bruteForce(nums, k) {
  const n = nums.length;

  for (let i = 0; i < n - 1; i++) {
    // Chỉ kiểm tra các phần tử trong khoảng k
    const maxJ = Math.min(i + k, n - 1);
    for (let j = i + 1; j <= maxJ; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n × k) - Trong trường hợp xấu nhất, mỗi phần tử so sánh với k phần tử tiếp theo
- **Space Complexity:** O(1) - Không sử dụng thêm bộ nhớ

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Không cần cấu trúc dữ liệu phức tạp
- Không tốn thêm bộ nhớ

### Nhược điểm / Cons

- Độ phức tạp thời gian cao
- Không hiệu quả với mảng lớn và k lớn
- Sẽ bị Time Limit Exceeded với n = 10^5 và k = 10^5

---

## 🚀 Giải pháp 2: Optimized - Hash Map (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force quá chậm với mảng lớn
- Điểm yếu của giải pháp 1? O(n × k) time complexity
- Cách tiếp cận mới? Sử dụng Hash Map để lưu chỉ số gần nhất của mỗi phần tử

### Ý tưởng / Idea

Duyệt qua mảng một lần, sử dụng Hash Map để lưu chỉ số gần nhất của mỗi phần tử. Với mỗi phần tử, kiểm tra xem nó đã tồn tại trong Map chưa. Nếu có, tính khoảng cách giữa chỉ số hiện tại và chỉ số đã lưu. Nếu khoảng cách ≤ k, trả về `true`. Nếu không, cập nhật chỉ số trong Map.

### Thuật toán / Algorithm

1. Tạo một Map rỗng
2. Duyệt qua mảng với chỉ số `i`
3. Với mỗi phần tử `nums[i]`:
   - Nếu phần tử đã tồn tại trong Map và `i - map[nums[i]] <= k`, trả về `true`
   - Cập nhật Map: `map[nums[i]] = i`
4. Sau khi duyệt hết mảng, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate II - Optimized Solution using Hash Map
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @param {number} k - Khoảng cách tối đa giữa hai chỉ số
 * @return {boolean} - true nếu có trùng lặp trong khoảng k, false nếu không
 */
function containsNearbyDuplicate_optimized(nums, k) {
  const lastIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (lastIndex.has(num)) {
      const prevIndex = lastIndex.get(num);
      if (i - prevIndex <= k) {
        return true;
      }
    }

    lastIndex.set(num, i);
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt mảng một lần, mỗi thao tác với Map là O(1) trung bình
- **Space Complexity:** O(n) - Trong trường hợp xấu nhất, Map chứa tất cả phần tử

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Hiệu quả với mảng lớn
- Code ngắn gọn, dễ đọc

### Nhược điểm / Cons

- Sử dụng thêm O(n) bộ nhớ
- Không tận dụng được giới hạn k để tối ưu space

---

## ⚡ Giải pháp 3: Advanced - Sliding Window (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể giảm space complexity từ O(n) xuống O(k)
- Có thuật toán/pattern nào phù hợp hơn? Sliding Window pattern cho phép chỉ lưu trữ k phần tử gần nhất

### Ý tưởng / Idea

Sử dụng Sliding Window với Set để lưu trữ k phần tử gần nhất. Khi duyệt qua mảng, thêm phần tử hiện tại vào Set. Nếu kích thước Set vượt quá k, xóa phần tử cũ nhất. Nếu phần tử hiện tại đã tồn tại trong Set, trả về `true`.

### Thuật toán / Algorithm

1. Tạo một Set rỗng
2. Duyệt qua mảng với chỉ số `i`
3. Với mỗi phần tử `nums[i]`:
   - Nếu phần tử đã tồn tại trong Set, trả về `true`
   - Thêm phần tử vào Set
   - Nếu kích thước Set > k, xóa phần tử `nums[i-k]` khỏi Set
4. Sau khi duyệt hết mảng, trả về `false`

### Code / Implementation

```javascript
/**
 * Contains Duplicate II - Advanced Solution using Sliding Window
 * @param {number[]} nums - Mảng số nguyên cần kiểm tra
 * @param {number} k - Khoảng cách tối đa giữa hai chỉ số
 * @return {boolean} - true nếu có trùng lặp trong khoảng k, false nếu không
 */
function containsNearbyDuplicate_advanced(nums, k) {
  const window = new Set();

  for (let i = 0; i < nums.length; i++) {
    // Nếu phần tử đã tồn tại trong window, tìm thấy trùng lặp
    if (window.has(nums[i])) {
      return true;
    }

    // Thêm phần tử hiện tại vào window
    window.add(nums[i]);

    // Giữ window có kích thước không quá k
    if (window.size > k) {
      window.delete(nums[i - k]);
    }
  }

  return false;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt mảng một lần, mỗi thao tác với Set là O(1) trung bình
- **Space Complexity:** O(min(n, k)) - Set chỉ chứa tối đa k phần tử

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(k)
- Tận dụng tốt giới hạn k
- Code ngắn gọn, dễ hiểu

### Nhược điểm / Cons

- Cần hiểu về Sliding Window pattern
- Trong trường hợp k ≥ n, space complexity vẫn là O(n)

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use    |
| -------------------- | ------ | ----- | ------------------- | ----------------------------- |
| Brute Force          | O(n×k) | O(1)  | Dễ / Easy           | Mảng rất nhỏ, k nhỏ           |
| Optimized (Map)      | O(n)   | O(n)  | Dễ / Easy           | Mảng lớn, cần tối ưu time     |
| Advanced (Sliding)   | O(n)   | O(k)  | Trung bình / Medium | Mảng lớn, k nhỏ, tối ưu space |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums = [1, 2, 3, 1];
const k = 3;
const expected = true;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

### Test Case 2: Khoảng cách bằng k / Distance equals k

```javascript
const nums = [1, 0, 1, 1];
const k = 1;
const expected = true;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

### Test Case 3: Không có trùng lặp trong khoảng k / No duplicate within k

```javascript
const nums = [1, 2, 3, 1, 2, 3];
const k = 2;
const expected = false;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

### Test Case 4: k = 0 / k equals zero

```javascript
const nums = [1, 1];
const k = 0;
const expected = false;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

### Test Case 5: Mảng 1 phần tử / Single Element

```javascript
const nums = [1];
const k = 1;
const expected = false;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

### Test Case 6: k lớn / Large k

```javascript
const nums = [1, 2, 3, 4, 5, 1];
const k = 10;
const expected = true;
const result = containsNearbyDuplicate_optimized(nums, k);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Sliding Window](../algorithms/patterns/sliding-window.md)

- **Patterns liên quan:**
  - [Sliding Window](../algorithms/patterns/sliding-window.md)

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Sliding Window là lựa chọn tốt nhất** cho bài toán này khi k nhỏ, vì nó tối ưu cả time và space
2. **Hash Map là lựa chọn tốt** khi k lớn (≈ n), vì Sliding Window cũng sẽ tốn O(n) space
3. **Brute Force chỉ dùng cho mảng rất nhỏ** hoặc khi học thuật toán cơ bản
4. **Lưu ý về k = 0**: Luôn trả về `false` vì không thể có hai chỉ số khác nhau với khoảng cách 0
5. **JavaScript Map vs Set**:
   - Map lưu key-value (phù hợp cho giải pháp Hash Map)
   - Set chỉ lưu key (phù hợp cho giải pháp Sliding Window)
6. **Sliding Window pattern** rất hữu ích cho các bài toán liên quan đến khoảng cách hoặc kích thước cửa sổ

---

_Last updated: 2025-02-04_
