# useMemo / useMemo

## Định nghĩa / Definition

[`useMemo`](https://react.dev/reference/react/useMemo) là một hook trong React cho phép bạn memoize (cache) kết quả của một expensive calculation. Nó chỉ chạy lại calculation khi dependencies thay đổi, giúp tối ưu hiệu suất.

## Cú pháp / Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## Tham số / Parameters

| Tham số                 | Kiểu     | Mô tả                                     |
| ----------------------- | -------- | ----------------------------------------- |
| `computeExpensiveValue` | Function | Function tính toán giá trị cần memoize    |
| `dependencies`          | Array    | List các giá trị mà calculation phụ thuộc |

## Giá trị trả về / Return Value

| Giá trị         | Kiểu | Mô tả                                                         |
| --------------- | ---- | ------------------------------------------------------------- |
| `memoizedValue` | Any  | Kết quả của `computeExpensiveValue` từ lần tính toán gần nhất |

## Cách hoạt động / How it Works

### Memoization

`useMemo` cache kết quả của calculation và chỉ chạy lại khi dependencies thay đổi:

```javascript
const expensiveValue = useMemo(() => {
  // Chạy lại khi a hoặc b thay đổi
  return expensiveCalculation(a, b);
}, [a, b]);
```

### Dependency Array

| Dependency Array      | Hành vi                                     |
| --------------------- | ------------------------------------------- |
| `[]` (empty)          | Chạy một lần khi mount, trả về cached value |
| `[dep1, dep2]`        | Chạy lại khi dep1 hoặc dep2 thay đổi        |
| `undefined` (omitted) | Chạy lại sau mỗi render (không khuyến nghị) |

### Reference Equality

`useMemo` dùng reference equality để check dependencies thay đổi:

```javascript
// ❌ Sai - object mới mỗi render
const obj = useMemo(() => ({ a, b }), [a, b]);

// ✅ Đúng - dùng useMemo cho object
const obj = useMemo(() => ({ a, b }), [a, b]);
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useMemo, useState } from "react";

function ExpensiveCalculation({ a, b }) {
  const result = useMemo(() => {
    console.log("Calculating...");
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum * a * b;
  }, [a, b]);

  return <div>Result: {result}</div>;
}
```

### Ví dụ Filter List

```jsx
function FilteredList({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Ví dụ Sort List

```jsx
function SortedList({ items, sortBy }) {
  const sortedItems = useMemo(() => {
    console.log("Sorting...");
    return [...items].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }, [items, sortBy]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Ví dụ Complex Calculation

```jsx
function Fibonacci({ n }) {
  const fib = useMemo(() => {
    const calculate = (num) => {
      if (num <= 1) return num;
      return calculate(num - 1) + calculate(num - 2);
    };
    return calculate(n);
  }, [n]);

  return (
    <div>
      Fibonacci({n}): {fib}
    </div>
  );
}
```

### Ví dụ Derived State

```jsx
function ProductList({ products, minPrice, maxPrice, category }) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      const categoryMatch = !category || product.category === category;
      return priceMatch && categoryMatch;
    });
  }, [products, minPrice, maxPrice, category]);

  return (
    <div>
      <h2>Filtered Products: {filteredProducts.length}</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Ví dụ Chart Data Processing

```jsx
function Chart({ data }) {
  const chartData = useMemo(() => {
    // Expensive data processing
    return {
      labels: data.map((d) => d.label),
      values: data.map((d) => d.value),
      average: data.reduce((sum, d) => sum + d.value, 0) / data.length,
      max: Math.max(...data.map((d) => d.value)),
      min: Math.min(...data.map((d) => d.value)),
    };
  }, [data]);

  return <ChartComponent data={chartData} />;
}
```

### Ví dụ với TypeScript

```tsx
interface Props {
  items: Item[];
  filter: string;
}

function FilteredList({ items, filter }: Props) {
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có expensive calculations tốn kém CPU
- Khi cần filter/sort large lists
- Khi cần derive complex state từ props
- Khi cần cache kết quả của calculations
- Khi component re-render thường xuyên nhưng calculation không cần chạy lại

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi calculation đơn giản và nhanh
- Khi calculation phụ thuộc vào state thay đổi thường xuyên
- Khi muốn calculation chạy lại mỗi render
- Khi dependencies thay đổi mỗi render (không có lợi ích)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useMemo`, bạn sẽ gặp các vấn đề sau:

1. **Expensive calculations chạy mỗi render**: Mỗi lần component re-render, expensive calculation sẽ chạy lại, dẫn đến hiệu suất kém.

2. **UI lag**: Với large lists hoặc complex calculations, UI có thể bị lag.

3. **Unnecessary computations**: Calculations chạy lại ngay cả khi input không thay đổi.

## Vấn đề được giải quyết / Problems Solved

### 1. Expensive Calculations

`useMemo` cache kết quả của expensive calculations và chỉ chạy lại khi dependencies thay đổi.

### 2. Performance Optimization

Giúp tối ưu hiệu suất bằng cách tránh chạy lại calculations không cần thiết.

## Ưu điểm / Advantages

1. **Performance optimization**: Cache expensive calculations, chỉ chạy lại khi cần.

2. **Simple API**: API đơn giản, dễ hiểu và dùng.

3. **TypeScript support**: Tốt với TypeScript, có thể type return value.

## Nhược điểm / Disadvantages

1. **Overhead**: Có một chút overhead để check dependencies.

2. **Overuse**: Dùng quá nhiều có thể làm code khó hiểu và không có lợi ích hiệu suất.

3. **Reference equality**: Phải hiểu rõ reference equality để tránh bugs.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm     | useMemo                | useCallback    | React.memo        |
| ------------ | ---------------------- | -------------- | ----------------- |
| Memoize      | Values                 | Functions      | Components        |
| Use case     | Expensive calculations | Event handlers | Prevent re-render |
| Dependencies | Required               | Required       | Props comparison  |

## Best Practices / Các thực hành tốt

1. **Dùng cho expensive calculations**:

   ```javascript
   const result = useMemo(() => expensiveCalc(a, b), [a, b]);
   ```

2. **Khai báo dependencies đầy đủ**:

   ```javascript
   // ❌ Sai - missing dependency
   const result = useMemo(() => calc(a, b), [a]);

   // ✅ Đúng - thêm b vào dependencies
   const result = useMemo(() => calc(a, b), [a, b]);
   ```

3. **Không dùng cho simple calculations**:

   ```javascript
   // ❌ Sai - calculation đơn giản
   const sum = useMemo(() => a + b, [a, b]);

   // ✅ Đúng - tính toán trực tiếp
   const sum = a + b;
   ```

4. **Dùng với TypeScript để type return value**:
   ```typescript
   const result: number = useMemo(() => calc(a, b), [a, b]);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Missing Dependencies

```javascript
// ❌ Sai - missing dependency
const result = useMemo(() => expensiveCalc(a, b), [a]);

// ✅ Đúng - thêm b vào dependencies
const result = useMemo(() => expensiveCalc(a, b), [a, b]);
```

### 2. Overusing useMemo

```javascript
// ❌ Sai - calculation đơn giản
const sum = useMemo(() => a + b, [a, b]);

// ✅ Đúng - tính toán trực tiếp
const sum = a + b;
```

### 3. Creating New Object Every Render

```javascript
// ❌ Sai - object mới mỗi render
const obj = useMemo(() => ({ a, b }), [a, b]);

// ✅ Đúng - useMemo cache object
const obj = useMemo(() => ({ a, b }), [a, b]);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Cache hit**: Khi dependencies không thay đổi, trả về cached value ngay lập tức.

2. **Cache miss**: Khi dependencies thay đổi, chạy lại calculation.

3. **Memory overhead**: Cache values có thể tốn bộ nhớ nếu dùng quá nhiều.

## Câu hỏi phỏng vấn / Interview Questions

1. `useMemo` là gì? Khi nào nên dùng?

2. `useMemo` hoạt động như thế nào?

3. Dependency array trong `useMemo` hoạt động như thế nào?

4. Khi nào nên dùng `useMemo` thay vì tính toán trực tiếp?

5. Sự khác biệt giữa `useMemo` và `useCallback`?

6. Sự khác biệt giữa `useMemo` và `React.memo`?

7. Làm thế nào để memoize expensive calculations?

8. Làm thế nào để filter list với `useMemo`?

9. Làm thế nào để sort list với `useMemo`?

10. Reference equality trong `useMemo` là gì?

11. Làm thế nào để type `useMemo` với TypeScript?

12. Khi nào `useMemo` không có lợi ích?

13. Làm thế nào để debug `useMemo`?

14. Làm thế nào để measure performance của `useMemo`?

15. Làm thế nào để combine nhiều `useMemo`?

## Tài liệu tham khảo / References

- [useMemo - React Official Docs](https://react.dev/reference/react/useMemo)
- [Memoizing Values - React Official Docs](https://react.dev/reference/react/useMemo)
- [You Might Not Need an Effect - React Official Docs](https://react.dev/learn/you-might-not-need-an-effect)

---

_Last updated: 2026-01-31_
