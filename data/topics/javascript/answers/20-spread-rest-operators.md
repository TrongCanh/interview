# 20. Spread & Rest Operators / Toán tử Spread & Rest

## Tổng quan về Spread & Rest Operators

### Mục đích của Spread & Rest Operators / Purpose

**Spread operator (`...`)** và **Rest operator (`...`)** là cùng một cú pháp (`...`) nhưng được sử dụng trong các ngữ cảnh khác nhau để thực hiện các chức năng đối lập nhau.

**Mục đích chính:**

- **Spread**: Mở rộng (expand) một iterable (array, string, object) thành các phần tử riêng biệt
- **Rest**: Thu gom (collect) nhiều phần tử thành một array hoặc object
- Giúp code ngắn gọn hơn và dễ đọc hơn
- Hỗ trợ việc xử lý dữ liệu linh hoạt hơn

### Khi nào nên dùng / When to Use

**Spread operator nên dùng khi:**

- Copy array hoặc object
- Merge arrays hoặc objects
- Convert iterable (string, Set, Map) thành array
- Spread elements trong function calls
- Clone objects (shallow copy)

**Rest operator nên dùng khi:**

- Xử lý function arguments không xác định số lượng
- Destructuring để thu gom các phần tử còn lại
- Tạo các function flexible với số lượng arguments biến thiên

### Giúp ích gì / Benefits

**Lợi ích:**

- **Cleaner code**: Code ngắn gọn và dễ đọc hơn
- **Immutability**: Dễ dàng tạo bản copy shallow
- **Flexible functions**: Tạo functions có thể nhận số lượng arguments biến thiên
- **Modern syntax**: Theo chuẩn ES6+, được hỗ trợ rộng rãi
- **Powerful destructuring**: Hỗ trợ destructuring linh hoạt

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm      | Giải thích             |
| ------------ | ---------------------- |
| Ngắn gọn     | Giảm code boilerplate  |
| Dễ đọc       | Rõ ràng về ý định      |
| Flexible     | Hỗ trợ nhiều use cases |
| Immutability | Dễ tạo immutable data  |

**Nhược điểm (Cons):**

| Nhược điểm     | Giải thích                                          |
| -------------- | --------------------------------------------------- |
| Shallow copy   | Chỉ copy nông, không deep copy                      |
| Performance    | Có overhead nhỏ so với các phương thức truyền thống |
| Learning curve | Cần hiểu rõ ngữ cảnh sử dụng                        |

---

## Sự khác biệt giữa spread (`...`) và rest (`...`)?

**Spread** và **Rest** sử dụng cùng cú pháp `...` nhưng có mục đích khác nhau:

- **Spread**: Mở rộng (expand) - dùng trong array literals, object literals, function calls
- **Rest**: Thu gom (collect) - dùng trong destructuring và function parameters

### Ví dụ:

```javascript
// Spread - Mở rộng array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest - Thu gom vào array
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

---

## Spread với arrays?

**Spread với arrays** cho phép mở rộng các phần tử của array thành các giá trị riêng biệt.

### Mục đích / Purpose

- Copy arrays
- Merge arrays
- Add elements vào array
- Convert iterable thành array

### Khi nào dùng / When to Use

- Khi cần tạo bản copy của array
- Khi cần merge nhiều arrays
- Khi cần thêm phần tử vào array
- Khi cần convert string, Set, Map thành array

### Ví dụ:

```javascript
// Copy array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Add elements
const numbers = [2, 3, 4];
const withFirstAndLast = [0, ...numbers, 5]; // [0, 2, 3, 4, 5]

// Convert string to array
const str = "hello";
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

// Convert Set to array
const set = new Set([1, 2, 3, 3]);
const uniqueArray = [...set]; // [1, 2, 3]

// Clone array (shallow copy)
const nested = [
  [1, 2],
  [3, 4],
];
const cloned = [...nested];
cloned[0][0] = 999;
console.log(nested[0][0]); // 999 - shared reference!
```

### Best Practices:

```javascript
// ✅ Dùng spread để copy array
const copy = [...original];

// ✅ Dùng spread để merge arrays
const merged = [...arr1, ...arr2];

// ✅ Dùng spread để convert string thành array
const chars = [...str];

// ❌ Tránh dùng spread cho nested arrays khi cần deep copy
const nested = [
  [1, 2],
  [3, 4],
];
const shallowCopy = [...nested]; // Shallow copy!
```

---

## Spread với objects?

**Spread với objects** cho phép mở rộng các properties của object thành key-value pairs riêng biệt.

### Mục đích / Purpose

- Copy objects (shallow copy)
- Merge objects
- Update/override properties
- Clone objects với modifications

### Khi nào dùng / When to Use

- Khi cần tạo bản copy của object
- Khi cần merge nhiều objects
- Khi cần update một số properties của object
- Khi cần tạo object mới dựa trên object cũ

### Ví dụ:

```javascript
// Copy object
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Override properties (later properties win)
const base = { a: 1, b: 2, c: 3 };
const updated = { ...base, b: 99, c: 100 }; // { a: 1, b: 99, c: 100 }

// Add new properties
const user = { name: "John" };
const withAge = { ...user, age: 30 }; // { name: 'John', age: 30 }

// Clone with modifications
const config = { debug: false, port: 3000 };
const devConfig = { ...config, debug: true }; // { debug: true, port: 3000 }

// Nested object spread
const user = {
  name: "John",
  address: {
    city: "NYC",
    country: "USA",
  },
};
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "LA",
  },
};
// { name: 'John', address: { city: 'LA', country: 'USA' } }
```

### Best Practices:

```javascript
// ✅ Dùng spread để copy object
const copy = { ...original };

// ✅ Dùng spread để merge objects
const merged = { ...obj1, ...obj2 };

// ✅ Dùng spread để update properties (immutable update)
const updated = { ...state, count: state.count + 1 };

// ❌ Tránh dùng spread cho nested objects khi cần deep copy
const nested = { a: { b: 1 } };
const shallowCopy = { ...nested };
shallowCopy.a.b = 999;
console.log(nested.a.b); // 999 - shared reference!

// ✅ Dùng nested spread cho nested objects
const deepCopy = { ...nested, a: { ...nested.a } };
```

---

## Rest parameters?

**Rest parameters** cho phép function nhận số lượng arguments không xác định và thu gom chúng thành một array.

### Mục đích / Purpose

- Xử lý function arguments không giới hạn số lượng
- Tạo flexible functions
- Thu gom các arguments còn lại

### Khi nào dùng / When to Use

- Khi function cần nhận số lượng arguments biến thiên
- Khi muốn tạo function flexible
- Khi cần xử lý arguments như một array

### Ví dụ:

```javascript
// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest với regular parameters
function greet(greeting, ...names) {
  names.forEach((name) => {
    console.log(`${greeting}, ${name}!`);
  });
}

greet("Hello", "Alice", "Bob", "Charlie");
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!

// Rest trong destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Rest với objects
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 1
console.log(b); // 2
console.log(rest); // { c: 3, d: 4 }

// Arrow function với rest
const multiply = (...factors) => factors.reduce((p, c) => p * c, 1);
console.log(multiply(2, 3, 4)); // 24
```

### Best Practices:

```javascript
// ✅ Dùng rest parameters cho số lượng arguments biến thiên
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

// ✅ Rest parameter phải là parameter cuối cùng
function log(type, ...messages) {
  console.log(`[${type}]`, ...messages);
}

// ❌ Tránh đặt rest parameter ở giữa
// function invalid(...rest, last) { } // SyntaxError!

// ✅ Dùng rest trong destructuring để thu gom phần còn lại
const [first, ...others] = array;
```

---

## Use cases?

### Common Use Cases cho Spread & Rest:

```javascript
// 1. Immutable state updates (Redux, React)
const state = { count: 0, name: "test" };
const newState = { ...state, count: state.count + 1 };

// 2. Clone arrays/objects
const arrCopy = [...originalArray];
const objCopy = { ...originalObject };

// 3. Merge configurations
const defaultConfig = { port: 3000, debug: false };
const userConfig = { port: 8080 };
const finalConfig = { ...defaultConfig, ...userConfig };

// 4. Function với variable arguments
function logAll(...messages) {
  messages.forEach((msg) => console.log(msg));
}

// 5. Remove elements from array
const numbers = [1, 2, 3, 4, 5];
const [second, ...withoutSecond] = numbers;
// withoutSecond = [1, 3, 4, 5]

// 6. Get unique values
const duplicates = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(duplicates)]; // [1, 2, 3, 4]

// 7. String manipulation
const str = "Hello";
const chars = [...str].reverse().join(""); // 'olleH'

// 8. Convert NodeList to Array
const elements = [...document.querySelectorAll("div")];

// 9. Math operations
const nums = [1, 2, 3];
const max = Math.max(...nums); // 3
const min = Math.min(...nums); // 1

// 10. Destructuring với rest
const user = { id: 1, name: "John", email: "john@example.com", age: 30 };
const { id, ...profile } = user;
// profile = { name: 'John', email: 'john@example.com', age: 30 }
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Spread cho deep copy nested objects
const nested = { a: { b: 1 } };
const copy = { ...nested };
copy.a.b = 999; // Affects original!

// ✅ Dùng structuredClone hoặc deep clone library
const deepCopy = structuredClone(nested);

// ❌ Spread với very large arrays (performance issue)
const hugeArray = new Array(1000000).fill(0);
const copy = [...hugeArray]; // Slow!

// ✅ Dùng slice hoặc Array.from cho large arrays
const copy = hugeArray.slice();

// ❌ Spread trong loop (performance issue)
for (let i = 0; i < 1000; i++) {
  result.push(...array); // Creates new arrays each iteration
}

// ✅ Dùng concat hoặc push.apply
result = result.concat(array);
```

---

_References: [MDN Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [MDN Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)_
