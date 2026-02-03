# Merge Intervals / Gộp khoảng

> Pattern Merge Intervals - Giải thích chi tiết / Merge Intervals Pattern - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Merge Intervals** (Gộp khoảng) là một kỹ thuật trong đó chúng ta gộp các khoảng (intervals) giao nhau hoặc chồng chéo thành các khoảng lớn hơn. Khoảng thường được đại diện bởi một cặp số [start, end] trong đó start <= end.

### Các khái niệm cơ bản / Basic Concepts

- **Interval (Khoảng):** Một khoảng thời gian hoặc không gian, đại diện bởi [start, end]
- **Overlap (Giao nhau):** Hai khoảng giao nhau (một khoảng bắt đầu trước khi khoảng kia kết thúc)
- **Merge (Gộp):** Kết hợp các khoảng giao nhau thành khoảng lớn hơn
- **Sort by Start:** Sắp xếp các khoảng theo start để dễ gộp
- **Non-overlapping (Không giao nhau):** Các khoảng không giao nhau

### Ví dụ thực tế / Real-world Examples

- **Meeting Rooms:** Tìm số lượng phòng họp tối đa cần thiết
- **Merge Meeting Times:** Gộp các cuộc họp giao nhau
- **Employee Free Time:** Tìm thời gian rảnh của nhân viên
- **Calendar Events:** Gộp các sự kiện lịch trình giao nhau

---

## 🎯 Khi nào dùng? / When to use?

- **Cần gộp các khoảng giao nhau**
- **Cần tìm khoảng rảnh**
- **Cần tối ưu hóa lịch trình**
- **Cần tìm số lượng khoảng giao nhau**

---

## 🔄 Các biến thể / Variations

### Standard Merge Intervals

Gộp các khoảng giao nhau thành khoảng lớn hơn.

### Insert Interval

Chèn một khoảng mới vào danh sách các khoảng đã gộp.

### Interval Intersection

Tìm giao điểm của các khoảng.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Merge Intervals cơ bản - Basic Merge Intervals Template
 * @param {Array<{start: number, end: number}>} intervals - Danh sách khoảng
 * @return {Array<{start: number, end: number}>} - Các khoảng đã gộp
 */
function mergeIntervalsBasic(intervals) {
  // Edge case: không có khoảng
  if (intervals.length === 0) {
    return [];
  }

  // Sắp xếp theo start
  intervals.sort((a, b) => a.start - b.start);

  const result = [intervals[0]];

  // Duyệt qua các khoảng
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    // Nếu giao nhau, gộp
    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      // Không giao nhau, thêm mới
      result.push(current);
    }
  }

  return result;
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Merge Intervals nâng cao - Advanced Merge Intervals Template
 * Bao gồm validation và edge case handling
 * @param {Array<{start: number, end: number}>} intervals - Danh sách khoảng
 * @return {Array<{start: number, end: number}>} - Các khoảng đã gộp
 */
function mergeIntervalsAdvanced(intervals) {
  // Edge case: không có khoảng
  if (intervals.length === 0) {
    return [];
  }

  // Validate: start <= end
  for (const interval of intervals) {
    if (interval.start > interval.end) {
      throw new Error("Invalid interval: start must be <= end");
    }
  }

  // Sắp xếp theo start
  intervals.sort((a, b) => a.start - b.start);

  const result = [];
  let current = intervals[0];

  // Duyệt qua các khoảng
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];

    // Nếu giao nhau, gộp
    if (interval.start <= current.end) {
      current.end = Math.max(current.end, interval.end);
    } else {
      // Không giao nhau, lưu current và bắt đầu khoảng mới
      result.push({ ...current });
      current = interval;
    }
  }

  // Thêm khoảng cuối cùng
  result.push(current);

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Merge Intervals

**Mô tả:** Gộp các khoảng giao nhau thành khoảng lớn hơn.

**Code:**

```javascript
/**
 * Merge Intervals - Gộp khoảng
 * @param {Array<{start: number, end: number}>} intervals - Danh sách khoảng
 * @return {Array<{start: number, end: number}>} - Các khoảng đã gộp
 *
 * Time Complexity: O(n log n) - sort + O(n) - merge
 * Space Complexity: O(n) - result array
 */
function merge(intervals) {
  // Edge case: không có khoảng
  if (intervals.length === 0) {
    return [];
  }

  // Sắp xếp theo start
  intervals.sort((a, b) => a.start - b.start);

  const result = [intervals[0]];

  // Duyệt qua các khoảng
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    // Nếu giao nhau, gộp
    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      // Không giao nhau, thêm mới
      result.push(current);
    }
  }

  return result;
}

// Test
const intervals1 = [
  { start: 1, end: 3 },
  { start: 2, end: 6 },
  { start: 8, end: 10 },
  { start: 15, end: 18 },
];
console.log(merge(intervals1));
// [{ start: 1, end: 6 }, { start: 8, end: 10 }, { start: 15, end: 18 }]

const intervals2 = [
  { start: 1, end: 4 },
  { start: 0, end: 1 },
  { start: 3, end: 5 },
  { start: 4, end: 6 },
];
console.log(merge(intervals2));
// [{ start: 0, end: 1 }, { start: 1, end: 6 }]
```

### Ví dụ 2 / Example 2: Insert Interval

**Mô tả:** Chèn một khoảng mới vào danh sách các khoảng đã gộp.

**Code:**

```javascript
/**
 * Insert Interval - Chèn khoảng mới
 * @param {Array<{start: number, end: number}>} intervals - Danh sách khoảng đã gộp
 * @param {{start: number, end: number}} newInterval - Khoảng mới cần chèn
 * @return {Array<{start: number, end: number}>} - Danh sách khoảng đã chèn
 *
 * Time Complexity: O(n) - duyệt qua danh sách
 * Space Complexity: O(n) - result array
 */
function insert(intervals, newInterval) {
  const result = [];
  let inserted = false;

  // Duyệt qua các khoảng
  for (const interval of intervals) {
    // Nếu chưa chèn và khoảng mới giao nhau với khoảng hiện tại
    if (
      !inserted &&
      newInterval.start <= interval.end &&
      newInterval.end >= interval.start
    ) {
      // Gộp khoảng mới với khoảng hiện tại
      result.push({
        start: Math.min(interval.start, newInterval.start),
        end: Math.max(interval.end, newInterval.end),
      });
      inserted = true;
    } else if (!inserted && newInterval.start > interval.end) {
      // Thêm khoảng hiện tại
      result.push(interval);
    } else if (inserted) {
      // Đã chèn, thêm khoảng hiện tại
      result.push(interval);
    } else {
      // Chưa chèn và không giao nhau, thêm khoảng hiện tại
      result.push(interval);
    }
  }

  // Nếu chưa chèn, thêm khoảng mới
  if (!inserted) {
    result.push(newInterval);
  }

  return result;
}

// Test
const intervals = [
  { start: 1, end: 3 },
  { start: 6, end: 9 },
];
console.log(insert(intervals, { start: 2, end: 5 }));
// [{ start: 1, end: 5 }, { start: 6, end: 9 }]

console.log(insert(intervals, { start: 10, end: 12 }));
// [{ start: 1, end: 3 }, { start: 6, end: 9 }, { start: 10, end: 12 }]
```

### Ví dụ 3 / Example 3: Meeting Rooms

**Mô tả:** Tìm số lượng phòng họp tối đa cần thiết.

**Code:**

```javascript
/**
 * Meeting Rooms - Số lượng phòng họp tối đa
 * @param {Array<{start: number, end: number}>} intervals - Danh sách cuộc họp
 * @return {number} - Số lượng phòng tối đa
 *
 * Time Complexity: O(n log n) - sort + O(n) - duyệt
 * Space Complexity: O(n) - min heap
 */
function minMeetingRooms(intervals) {
  // Edge case: không có cuộc họp
  if (intervals.length === 0) {
    return 0;
  }

  // Sắp xếp theo start
  intervals.sort((a, b) => a.start - b.start);

  // Sử dụng Min Heap để theo dõi các cuộc họp kết thúc sớm nhất
  const minHeap = [];
  let maxRooms = 0;

  for (const interval of intervals) {
    // Loại bỏ các cuộc họp đã kết thúc
    while (minHeap.length > 0 && minHeap[0] <= interval.start) {
      minHeap.shift();
    }

    // Thêm cuộc họp hiện tại
    minHeap.push(interval.end);

    // Cập nhật số lượng phòng tối đa
    maxRooms = Math.max(maxRooms, minHeap.length);
  }

  return maxRooms;
}

// Test
const meetings1 = [
  { start: 0, end: 30 },
  { start: 5, end: 10 },
  { start: 15, end: 20 },
];
console.log(minMeetingRooms(meetings1)); // 2

const meetings2 = [{ start: 2, end: 7 }];
console.log(minMeetingRooms(meetings2)); // 1
```

### Ví dụ 4 / Example 4: Employee Free Time

**Mô tả:** Tìm thời gian rảnh chung của nhân viên.

**Code:**

```javascript
/**
 * Employee Free Time - Thời gian rảnh chung
 * @param {Array<Array<{start: number, end: number}>>} schedule - Lịch trình của nhân viên
 * @return {Array<{start: number, end: number}>} - Thời gian rảnh chung
 *
 * Time Complexity: O(n log n) - sort + O(n) - merge
 * Space Complexity: O(n) - result array
 */
function employeeFreeTime(schedule) {
  // Gộp lịch trình của mỗi nhân viên
  const mergedSchedule = schedule.map((employeeIntervals) => {
    return merge(employeeIntervals);
  });

  // Tìm giao điểm của tất cả nhân viên (thời gian rảnh chung)
  const commonFree = [];

  // Thêm khoảng trước cuộc họp đầu tiên
  let minStart = Math.min(...mergedSchedule.map((s) => s[0]?.start));
  commonFree.push({ start: 0, end: minStart });

  // Duyệt qua các khoảng đã gộp
  for (let i = 0; i < mergedSchedule.length; i++) {
    const employeeIntervals = mergedSchedule[i];

    for (const interval of employeeIntervals) {
      // Thêm khoảng rảnh sau mỗi khoảng
      commonFree.push({
        start: interval.end,
        end:
          i < mergedSchedule.length - 1
            ? mergedSchedule[i + 1][0]?.start
            : Infinity,
      });
    }
  }

  // Gộp các khoảng rảnh giao nhau
  return merge(commonFree);
}

// Test
const schedule = [
  [
    { start: 1, end: 3 },
    { start: 6, end: 9 },
  ], // Nhân viên 1
  [
    { start: 2, end: 4 },
    { start: 7, end: 10 },
  ], // Nhân viên 2
  [{ start: 5, end: 8 }], // Nhân viên 3
];
console.log(employeeFreeTime(schedule));
// [{ start: 0, end: 1 }, { start: 4, end: 5 }, { start: 9, end: Infinity }]
```

### Ví dụ 5 / Example 5: Non-overlapping Intervals

**Mô tả:** Tìm số lượng tối đa các khoảng không giao nhau.

**Code:**

```javascript
/**
 * Non-overlapping Intervals - Số lượng tối đa khoảng không giao nhau
 * @param {Array<{start: number, end: number}>} intervals - Danh sách khoảng
 * @return {number} - Số lượng tối đa khoảng không giao nhau
 *
 * Time Complexity: O(n log n) - sort + O(n) - duyệt
 * Space Complexity: O(1)
 */
function eraseOverlapIntervals(intervals) {
  // Edge case: không có khoảng
  if (intervals.length === 0) {
    return 0;
  }

  // Sắp xếp theo end
  intervals.sort((a, b) => a.end - b.end);

  let count = 1;
  let lastEnd = intervals[0].end;

  // Duyệt qua các khoảng
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];

    // Nếu không giao nhau, tăng count
    if (current.start >= lastEnd) {
      count++;
      lastEnd = current.end;
    }
  }

  return count;
}

// Test
const intervals1 = [
  { start: 1, end: 2 },
  { start: 2, end: 3 },
  { start: 3, end: 4 },
  { start: 1, end: 3 },
];
console.log(eraseOverlapIntervals(intervals1)); // 2 ([1,2] và [3,4])

const intervals2 = [
  { start: 1, end: 2 },
  { start: 2, end: 3 },
  { start: 3, end: 4 },
];
console.log(eraseOverlapIntervals(intervals2)); // 3 (tất cả không giao nhau)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

---

## 📊 So sánh với các kỹ thuật khác / Comparison with Other Techniques

| Kỹ thuật / Technique | Ưu điểm / Pros             | Nhược điểm / Cons | Khi nào dùng / When to use   |
| -------------------- | -------------------------- | ----------------- | ---------------------------- |
| Merge Intervals      | Đơn giản, hiệu quả         | Cần sort trước    | Khoảng thời gian, lịch trình |
| Sweep Line           | Tối ưu cho một số bài toán | Khó implement     | Bài toán phức tạp            |
| Segment Tree         | Tối ưu cho query           | Khó implement     | Cần query nhiều lần          |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên sort:** Luôn sort các khoảng trước khi gộp
2. **Sai điều kiện giao nhau:** Điều kiện giao nhau phải đúng
3. **Quên edge case:** Luôn kiểm tra edge cases như mảng rỗng
4. **Sai thứ tự sort:** Cần sort theo start, không phải end
5. **Không xử lý khoảng rỗng:** Luôn kiểm tra xem khoảng có hợp lệ không

---

## 💡 Tips & Tricks

1. **Sort by Start:** Luôn sort các khoảng theo start trước khi gộp
2. **Overlap Condition:** Hai khoảng [a.start, a.end] và [b.start, b.end] giao nhau nếu a.start <= b.end && b.start <= a.end
3. **Edge Cases:** Luôn kiểm tra edge cases như mảng rỗng, khoảng không hợp lệ
4. **Min Heap:** Sử dụng Min Heap để theo dõi các khoảng kết thúc sớm nhất
5. **Space Optimization:** Có thể gộp trực tiếp vào mảng hiện tại để tối ưu space

---

## 📚 Tài liệu tham khảo / References

- [Merge Intervals - GeeksforGeeks](https://www.geeksforgeeks.org/merging-intervals/)
- [Merge Intervals - LeetCode](https://leetcode.com/tag/interval/)

---

_Last updated: 2025-02-03_
