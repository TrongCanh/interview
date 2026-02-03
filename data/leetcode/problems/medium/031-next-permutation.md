# Next Permutation / Permutation Tiếp Theo

> LeetCode Problem 31 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 31
- **URL:** https://leetcode.com/problems/next-permutation/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** Array
- **Tags:** Array, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** Array, Sorting
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for `arr = [1,2,3]`, the following are all the permutations of `arr`: `[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`.

The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of `arr = [1,2,3]` is `[1,3,2]`.
Similarly, the next permutation of `arr = [2,3,1]` is `[3,1,2]`.
While the next permutation of `arr = [3,2,1]` is `[1,2,3]` because `[3,2,1]` does not have a lexicographical larger rearrangement.

Given an array of integers `nums`, find the next permutation of `nums`.

The replacement must be in place and use only constant extra memory.

**Example 1:**

```
Input: nums = [1,2,3]
Output: [1,3,2]
```

**Example 2:**

```
Input: nums = [3,2,1]
Output: [1,2,3]
```

**Example 3:**

```
Input: nums = [1,1,5]
Output: [1,5,1]
```

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một mảng số nguyên `nums`
- **Output:** Mảng `nums` được sửa đổi tại chỗ (in-place) để trở thành permutation tiếp theo theo thứ tự từ điển
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ nums.length ≤ 100
  - Giá trị phần tử: 0 ≤ nums[i] ≤ 100
  - Phải thực hiện in-place với O(1) extra memory
- **Edge cases:**
  - Mảng có 1 phần tử - không đổi
  - Mảng giảm dần (ví dụ: [3,2,1]) - trả về mảng tăng dần
  - Mảng có phần tử trùng lặp (ví dụ: [1,1,5])

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu khái niệm permutation theo thứ tự từ điển (lexicographical order)
- **Bước 2:** Phân tích thuật toán để tìm permutation tiếp theo
- **Bước 3:** Xác định các trường hợp đặc biệt và xử lý chúng

### 3. Ví dụ minh họa / Examples

```
Example 1: [1,2,3] → [1,3,2]
- 1,2,3 là permutation nhỏ nhất
- 1,3,2 là permutation tiếp theo

Example 2: [3,2,1] → [1,2,3]
- 3,2,1 là permutation lớn nhất
- Không có permutation lớn hơn, nên quay về permutation nhỏ nhất

Example 3: [1,1,5] → [1,5,1]
- 1,1,5 → 1,5,1 là permutation tiếp theo
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Tạo tất cả các permutation, sắp xếp chúng theo thứ tự từ điển, sau đó tìm permutation tiếp theo của mảng hiện tại.

### Thuật toán / Algorithm

1. Tạo tất cả các permutation của mảng
2. Sắp xếp các permutation theo thứ tự từ điển
3. Tìm vị trí của mảng hiện tại trong danh sách
4. Trả về permutation tiếp theo (hoặc permutation đầu tiên nếu là cuối cùng)

### Code / Implementation

```javascript
function nextPermutation_bruteForce(nums) {
  // Tạo tất cả các permutations
  function generatePermutations(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
      const remainingPerms = generatePermutations(remaining);
      for (const perm of remainingPerms) {
        result.push([current, ...perm]);
      }
    }
    return result;
  }

  const allPerms = generatePermutations(nums);

  // Sắp xếp theo thứ tự từ điển
  allPerms.sort((a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return a.length - b.length;
  });

  // Tìm vị trí hiện tại
  const currentIndex = allPerms.findIndex(
    (perm) => JSON.stringify(perm) === JSON.stringify(nums),
  );

  // Lấy permutation tiếp theo
  const nextIndex = (currentIndex + 1) % allPerms.length;
  const nextPerm = allPerms[nextIndex];

  // Copy vào nums
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nextPerm[i];
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n! \* n log n) - tạo n! permutations và sắp xếp
- **Space Complexity:** O(n! \* n) - lưu trữ tất cả permutations

### Ưu điểm / Pros

- Dễ hiểu và implement
- Đảm bảo đúng kết quả

### Nhược điểm / Cons

- Rất chậm với mảng lớn
- Sử dụng quá nhiều bộ nhớ
- Không đáp ứng yêu cầu O(1) extra memory

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Brute force quá chậm và tốn bộ nhớ
- Điểm yếu của giải pháp 1? Tạo tất cả permutations không cần thiết
- Cách tiếp cận mới? Sử dụng thuật toán đặc biệt để tìm next permutation trực tiếp

### Ý tưởng / Idea

Sử dụng thuật toán đặc biệt để tìm next permutation trong O(n) thời gian:

1. Tìm pivot: phần tử đầu tiên từ phải sang trái mà nums[i] < nums[i+1]
2. Tìm successor: phần tử nhỏ nhất lớn hơn pivot từ phải sang trái
3. Swap pivot và successor
4. Reverse phần sau pivot

### Thuật toán / Algorithm

1. **Tìm pivot:** Duyệt từ cuối mảng về đầu, tìm phần tử đầu tiên thỏa mãn `nums[i] < nums[i+1]`
2. **Nếu không tìm thấy pivot:** Mảng đang giảm dần, reverse toàn bộ mảng
3. **Nếu tìm thấy pivot:**
   - Tìm successor: phần tử nhỏ nhất lớn hơn pivot từ cuối về đầu
   - Swap pivot và successor
   - Reverse phần sau vị trí pivot

### Code / Implementation

```javascript
function nextPermutation_optimized(nums) {
  const n = nums.length;

  // Bước 1: Tìm pivot - phần tử đầu tiên từ phải sang trái mà nums[i] < nums[i+1]
  let pivot = -1;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }

  // Nếu không tìm thấy pivot, mảng đang giảm dần, reverse toàn bộ
  if (pivot === -1) {
    reverse(nums, 0, n - 1);
    return;
  }

  // Bước 2: Tìm successor - phần tử nhỏ nhất lớn hơn pivot từ phải sang trái
  let successor = -1;
  for (let i = n - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      successor = i;
      break;
    }
  }

  // Bước 3: Swap pivot và successor
  [nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];

  // Bước 4: Reverse phần sau pivot
  reverse(nums, pivot + 1, n - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt mảng tối đa 3 lần
- **Space Complexity:** O(1) - chỉ dùng biến tạm

### Ưu điểm / Pros

- Rất nhanh với O(n) thời gian
- Chỉ dùng O(1) extra memory
- Là giải pháp tối ưu cho bài toán này

### Nhược điểm / Cons

- Cần hiểu rõ logic của thuật toán
- Phải cẩn thận với các edge cases

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Đây là thuật toán chuẩn cho bài toán này

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability và maintainability bằng cách tách các bước thành các function riêng biệt.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function nextPermutation_advanced(nums) {
  const n = nums.length;

  // Bước 1: Tìm pivot
  const pivot = findPivot(nums);

  // Bước 2: Xử lý theo kết quả tìm pivot
  if (pivot === -1) {
    // Không có pivot - reverse toàn bộ mảng
    reverseArray(nums, 0, n - 1);
  } else {
    // Có pivot - swap với successor và reverse phần sau
    const successor = findSuccessor(nums, pivot);
    swap(nums, pivot, successor);
    reverseArray(nums, pivot + 1, n - 1);
  }
}

/**
 * Tìm pivot: phần tử đầu tiên từ phải sang trái mà nums[i] < nums[i+1]
 * @param {number[]} nums - mảng đầu vào
 * @returns {number} - chỉ số của pivot, hoặc -1 nếu không tìm thấy
 */
function findPivot(nums) {
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      return i;
    }
  }
  return -1;
}

/**
 * Tìm successor: phần tử nhỏ nhất lớn hơn pivot từ phải sang trái
 * @param {number[]} nums - mảng đầu vào
 * @param {number} pivot - chỉ số của pivot
 * @returns {number} - chỉ số của successor
 */
function findSuccessor(nums, pivot) {
  for (let i = nums.length - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      return i;
    }
  }
  return -1;
}

/**
 * Swap hai phần tử trong mảng
 * @param {number[]} nums - mảng đầu vào
 * @param {number} i - chỉ số phần tử thứ nhất
 * @param {number} j - chỉ số phần tử thứ hai
 */
function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

/**
 * Reverse một đoạn của mảng
 * @param {number[]} nums - mảng đầu vào
 * @param {number} start - chỉ số bắt đầu
 * @param {number} end - chỉ số kết thúc
 */
function reverseArray(nums, start, end) {
  while (start < end) {
    swap(nums, start, end);
    start++;
    end--;
  }
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code dễ đọc và maintain
- Có JSDoc comments chi tiết
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn giải pháp 2
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time             | Space      | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ---------------- | ---------- | ------------------- | ------------------------------- |
| Brute Force          | O(n! \* n log n) | O(n! \* n) | Dễ / Easy           | Học tập, mảng rất nhỏ           |
| Optimized            | O(n)             | O(1)       | Trung bình / Medium | Production, tối ưu              |
| Advanced             | O(n)             | O(1)       | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const nums1 = [1, 2, 3];
nextPermutation_advanced(nums1);
console.log(nums1); // Expected: [1, 3, 2]

const nums2 = [3, 2, 1];
nextPermutation_advanced(nums2);
console.log(nums2); // Expected: [1, 2, 3]

const nums3 = [1, 1, 5];
nextPermutation_advanced(nums3);
console.log(nums3); // Expected: [1, 5, 1]
```

### Test Case 2: Edge case

```javascript
// Mảng có 1 phần tử
const nums4 = [1];
nextPermutation_advanced(nums4);
console.log(nums4); // Expected: [1]

// Mảng có 2 phần tử
const nums5 = [1, 2];
nextPermutation_advanced(nums5);
console.log(nums5); // Expected: [2, 1]

const nums6 = [2, 1];
nextPermutation_advanced(nums6);
console.log(nums6); // Expected: [1, 2]
```

### Test Case 3: Phức tạp / Complex

```javascript
// Mảng lớn
const nums7 = [1, 3, 5, 4, 2];
nextPermutation_advanced(nums7);
console.log(nums7); // Expected: [1, 4, 2, 3, 5]

// Mảng có phần tử trùng lặp
const nums8 = [2, 3, 1, 3, 3];
nextPermutation_advanced(nums8);
console.log(nums8); // Expected: [2, 3, 3, 1, 3]
```

---

## 📚 Tài liệu tham khảo / References

- [Array](../../algorithms/data-structures/array.md)
- [Two Pointers](../../algorithms/patterns/two-pointers.md)
- [LeetCode Discuss](https://leetcode.com/problems/next-permutation/discuss/)
- [Permutation Algorithm](https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Hiểu rõ khái niệm lexicographical order - giống như cách từ điển sắp xếp các từ
- **Tip 2:** Thuật toán này là chuẩn cho bài toán next permutation, nên học thuộc logic
- **Tip 3:** Khi tìm pivot, luôn duyệt từ phải sang trái
- **Lỗi thường gặp và cách tránh:**
  - Quên reverse phần sau pivot sau khi swap
  - Tìm successor sai - phải tìm phần tử nhỏ nhất LỚN HƠN pivot
  - Không xử lý trường hợp pivot = -1 (mảng giảm dần)

---

_Last updated: 2026-02-03_
