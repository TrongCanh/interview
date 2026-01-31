# 1. Data Types / Kiểu dữ liệu

## Tổng quan về Data Types trong JavaScript

### Mục đích của Data Types / Purpose

**Data Types** (kiểu dữ liệu) là cách JavaScript phân loại và lưu trữ các giá trị khác nhau. Mỗi type có cách xử lý và hoạt động riêng biệt.

**Mục đích chính:**

- Phân loại dữ liệu để engine biết cách xử lý
- Đảm bảo tính đúng đắn của các phép toán
- Hỗ trợ type checking và validation
- Tối ưu hóa memory allocation

### Khi nào cần hiểu về Data Types / When to Use

Hiểu về data types là cần thiết khi:

- Viết code JavaScript cơ bản
- Debug và fix lỗi type-related
- Làm việc với APIs và external data
- Perform type checking và validation
- Optimize performance

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type safety**: Tránh lỗi do type mismatch
- **Code clarity**: Code dễ hiểu hơn với đúng types
- **Debugging**: Dễ dàng tìm và fix lỗi
- **Performance**: Engine có thể optimize tốt hơn
- **Maintainability**: Code dễ maintain hơn

### Ưu nhược điểm / Pros & Cons

JavaScript là dynamically typed language:

| Ưu điểm (Pros)          | Nhược điểm (Cons)                     |
| ----------------------- | ------------------------------------- |
| Flexible - dễ viết code | Type errors ở runtime                 |
| Không cần khai báo type | Khó debug với large codebase          |
| Rapid prototyping       | Khó maintain trong large projects     |
| Code ngắn gọn           | Performance overhead từ type checking |

---

## JavaScript có bao nhiêu kiểu dữ liệu?

JavaScript có **8 kiểu dữ liệu** cơ bản:

### Mục đích / Purpose

JavaScript chia data types thành 2 nhóm chính để quản lý và xử lý dữ liệu hiệu quả:

- **Primitive types**: Lưu trữ giá trị đơn giản, immutable
- **Reference types**: Lưu trữ collections và objects, mutable

### Khi nào dùng / When to Use

| Type        | Khi nào dùng                           |
| ----------- | -------------------------------------- |
| `string`    | Lưu trữ text, names, messages          |
| `number`    | Tính toán, counters, measurements      |
| `bigint`    | Số nguyên lớn, cryptography            |
| `boolean`   | Flags, conditional logic               |
| `undefined` | Biến chưa được gán giá trị             |
| `null`      | Biểu thị "không có giá trị"            |
| `symbol`    | Unique identifiers, private properties |
| `object`    | Complex data structures, collections   |

### Giúp ích gì / Benefits

- **Primitive types**: Fast access, predictable behavior
- **Reference types**: Flexible, support complex structures
- **8 types**: Cover most use cases while keeping simple

### Ưu nhược điểm / Pros & Cons

| Type      | Ưu điểm                      | Nhược điểm                 |
| --------- | ---------------------------- | -------------------------- |
| Primitive | Fast, immutable, predictable | Không thể thay đổi giá trị |
| Reference | Flexible, mutable            | Reference equality issues  |

---

## Primitive types là gì? Có những loại nào?

**Primitive types** (kiểu nguyên thủy) là các kiểu dữ liệu cơ bản trong JavaScript, được lưu trữ trực tiếp trong stack memory và không thể thay đổi (immutable).

### Mục đích / Purpose

Primitive types được thiết kế để:

- Lưu trữ các giá trị đơn giản
- Tối ưu hóa performance (stack memory)
- Đảm bảo immutability (không thể thay đổi)
- Hỗ trợ comparison by value

### Khi nào dùng / When to Use

Dùng primitive types khi:

- Lưu trữ các giá trị đơn giản (text, numbers, booleans)
- Cần immutability
- Cần performance cao
- Làm việc với small data

### Giúp ích gì / Benefits

**Lợi ích:**

- **Fast access**: Truy cập trực tiếp từ stack
- **Immutable**: Không thể thay đổi, tránh side effects
- **Predictable**: Hành vi nhất quán
- **Memory efficient**: Chiếm ít memory hơn objects

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                   |
| -------------------- | ---------------------------- |
| Fast access          | Không thể thay đổi giá trị   |
| Immutable            | Không thể add methods        |
| Memory efficient     | Không thể store complex data |
| Predictable behavior | Giới hạn functionality       |

### Các loại Primitive types:

| Type        | Description                        | Example                 |
| ----------- | ---------------------------------- | ----------------------- |
| `string`    | Chuỗi ký tự                        | `"Hello"`, `'World'`    |
| `number`    | Số (integer, float, NaN, Infinity) | `42`, `3.14`, `NaN`     |
| `bigint`    | Số nguyên lớn                      | `12345678901234567890n` |
| `boolean`   | Giá trị logic                      | `true`, `false`         |
| `undefined` | Biến chưa được gán giá trị         | `let x;`                |
| `null`      | Giá trị rỗng                       | `null`                  |
| `symbol`    | Giá trị duy nhất                   | `Symbol('id')`          |

### Đặc điểm của Primitive types:

```javascript
// 1. Immutable - không thể thay đổi
let str = "Hello";
str[0] = "J"; // Không có tác dụng
console.log(str); // "Hello"

// 2. So sánh theo giá trị
let a = 5;
let b = 5;
console.log(a === b); // true

// 3. Khi gán, sao chép giá trị (không phải tham chiếu)
let x = 10;
let y = x; // y có giá trị riêng
y = 20;
console.log(x); // 10 (không bị ảnh hưởng)
```

---

## Reference types là gì? Có những loại nào?

**Reference types** (kiểu tham chiếu) là các kiểu dữ liệu được lưu trữ trong heap memory, và biến chỉ lưu trữ tham chiếu (địa chỉ) đến dữ liệu thực tế.

### Mục đích / Purpose

Reference types được thiết kế để:

- Lưu trữ collections và complex data structures
- Hỗ trợ mutability (có thể thay đổi)
- Tối ưu hóa memory cho large data
- Hỗ trợ dynamic properties

### Khi nào dùng / When to Use

Dùng reference types khi:

- Lưu trữ collections (arrays, objects)
- Cần mutability
- Làm việc với large data
- Cần dynamic properties

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible**: Có thể thay đổi nội dung
- **Efficient**: Share references thay vì copy
- **Dynamic**: Có thể add/remove properties
- **Powerful**: Hỗ trợ complex data structures

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                    | Nhược điểm                |
| -------------------------- | ------------------------- |
| Flexible và mutable        | Reference equality issues |
| Efficient memory usage     | Potential memory leaks    |
| Dynamic properties         | Harder to debug           |
| Support complex structures | Mutable side effects      |

### Các loại Reference types:

| Type       | Description              | Example            |
| ---------- | ------------------------ | ------------------ |
| `Object`   | Đối tượng thông thường   | `{ name: "John" }` |
| `Array`    | Mảng                     | `[1, 2, 3]`        |
| `Function` | Hàm                      | `function() {}`    |
| `Date`     | Ngày tháng               | `new Date()`       |
| `RegExp`   | Biểu thức chính quy      | `/pattern/`        |
| `Map`      | Cặp key-value            | `new Map()`        |
| `Set`      | Tập hợp giá trị duy nhất | `new Set()`        |
| `WeakMap`  | Map với key là object    | `new WeakMap()`    |
| `WeakSet`  | Set với object           | `new WeakSet()`    |

### Đặc điểm của Reference types:

```javascript
// 1. Mutable - có thể thay đổi nội dung
let obj = { name: "John" };
obj.name = "Jane"; // Thay đổi được
console.log(obj); // { name: "Jane" }

// 2. So sánh theo tham chiếu (không phải giá trị)
let obj1 = { name: "John" };
let obj2 = { name: "John" };
console.log(obj1 === obj2); // false (khác tham chiếu)

let obj3 = obj1;
console.log(obj1 === obj3); // true (cùng tham chiếu)

// 3. Khi gán, sao chép tham chiếu (không phải giá trị)
let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 tham chiếu đến cùng mảng
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] (bị ảnh hưởng)
```

---

## Sự khác biệt giữa `null` và `undefined` là gì?

### Mục đích / Purpose

Cả `null` và `undefined` đều biểu thị "không có giá trị", nhưng:

- `undefined`: Biến chưa được gán giá trị (default)
- `null`: Biến được chủ động gán giá trị rỗng

### Khi nào dùng / When to Use

| Giá trị     | Khi nào dùng                                                  |
| ----------- | ------------------------------------------------------------- |
| `undefined` | Biến chưa được khởi tạo, function không return value          |
| `null`      | Chủ động biểu thị "không có giá trị", API trả về empty result |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Clear intent**: Phân biệt giữa "chưa có" và "không có"
- **API design**: Expressive API responses
- **Type checking**: Dễ dàng validate

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                        |
| --------------------------- | --------------------------------- |
| Phân biệt rõ ràng intent    | `typeof null === 'object'` là bug |
| Flexible API design         | Có thể gây confusion              |
| Default value cho variables | Type coercion với `==`            |

| Đặc điểm           | `null`                         | `undefined`                |
| ------------------ | ------------------------------ | -------------------------- |
| Ý nghĩa            | Giá trị rỗng, không có giá trị | Biến chưa được gán giá trị |
| Gán bởi            | Lập trình viên chủ động gán    | JavaScript tự động gán     |
| Type               | `object` (bug lịch sử)         | `undefined`                |
| `typeof`           | `"object"`                     | `"undefined"`              |
| `JSON.stringify()` | `"null"`                       | `undefined` (bỏ qua)       |

```javascript
// undefined - biến chưa được gán giá trị
let x;
console.log(x); // undefined

// null - chủ động gán giá trị rỗng
let y = null;
console.log(y); // null

// typeof
console.log(typeof null); // "object" (bug lịch sử)
console.log(typeof undefined); // "undefined"

// So sánh
console.log(null == undefined); // true (type coercion)
console.log(null === undefined); // false (khác type)

// JSON
console.log(JSON.stringify({ a: null })); // '{"a":"null"}'
console.log(JSON.stringify({ a: undefined })); // '{}'

// Thực tế sử dụng
function findUser(id) {
  const user = db.findUser(id);
  return user || null; // Trả về null khi không tìm thấy
}

let user;
console.log(user); // undefined - chưa được gán
```

**Lưu ý:** Trong thực tế, nên dùng `null` khi muốn biểu thị "không có giá trị", và `undefined` là giá trị mặc định khi biến chưa được khởi tạo.

---

## `Symbol` là gì? Khi nào dùng?

**`Symbol`** là một primitive type trong JavaScript, được giới thiệu từ ES6, đại diện cho một giá trị duy nhất và bất biến.

### Mục đích / Purpose

**Symbol** được thiết kế để:

- Tạo unique identifiers
- Tránh property name conflicts
- Định nghĩa special behaviors cho objects
- Tạo private properties

### Khi nào dùng / When to Use

Dùng `Symbol` khi:

- Cần unique identifiers
- Tránh xung đột tên properties
- Định nghĩa special behaviors (well-known symbols)
- Tạo pseudo-private properties

### Giúp ích gì / Benefits

**Lợi ích:**

- **Unique**: Mỗi Symbol là duy nhất
- **Hidden properties**: Không xuất hiện trong Object.keys()
- **Well-known symbols**: Định nghĩa behaviors (iterator, toStringTag, etc.)
- **No conflicts**: Tránh property name collisions

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                               |
| ------------------ | ---------------------------------------- |
| Unique identifiers | Không thể serialize với JSON             |
| Hidden properties  | Khó debug (không hiển thị trong console) |
| Well-known symbols | Không phải thực sự private               |
| Avoid conflicts    | Syntax phức tạp hơn                      |

### Đặc điểm của Symbol:

```javascript
// 1. Tạo Symbol - mỗi Symbol là duy nhất
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false

// 2. Không thể tạo với new
const sym3 = new Symbol(); // TypeError

// 3. Có thể dùng làm key của object
const id = Symbol("id");
const user = {
  name: "John",
  [id]: 123, // Symbol key
};
console.log(user[id]); // 123
console.log(Object.keys(user)); // ['name'] - Symbol key bị ẩn

// 4. Symbol.for() - tạo/giải quyết global symbol
const globalSym1 = Symbol.for("app.id");
const globalSym2 = Symbol.for("app.id");
console.log(globalSym1 === globalSym2); // true

// 5. Symbol.keyFor() - lấy key description
console.log(Symbol.keyFor(globalSym1)); // 'app.id'
```

### Các Symbol được định nghĩa sẵn (Well-known Symbols):

```javascript
// Symbol.iterator - định nghĩa iterator
const myIterable = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 1, done: false };
      },
    };
  },
};

// Symbol.toStringTag - tùy chỉnh [object Type]
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}
console.log(Object.prototype.toString.call(new MyClass())); // [object MyClass]

// Symbol.toPrimitive - tùy chỉnh chuyển đổi primitive
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    return "hello";
  },
};
console.log(+obj); // 42
console.log(`${obj}`); // 'hello'
```

### Khi nào dùng Symbol:

**1. Tạo private properties trong objects:**

```javascript
const _private = Symbol("private");

class Counter {
  constructor() {
    this[_private] = 0; // Private property
  }
  increment() {
    this[_private]++;
  }
  getCount() {
    return this[_private];
  }
}
```

**2. Tránh xung đột tên property:**

```javascript
// Thư viện A
const LIB_A_ID = Symbol("id");

// Thư viện B
const LIB_B_ID = Symbol("id");

// Không xung đột khi dùng cùng object
const obj = {
  [LIB_A_ID]: "A123",
  [LIB_B_ID]: "B456",
};
```

**3. Định nghĩa hành vi đặc biệt:**

```javascript
// Tạo object có thể lặp qua
const collection = {
  items: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.items[index++],
        done: index > this.items.length,
      }),
    };
  },
};

for (const item of collection) {
  console.log(item); // 1, 2, 3
}
```

---

## `BigInt` là gì? Khi nào dùng?

**`BigInt`** là một primitive type trong JavaScript, được giới thiệu từ ES2020, dùng để biểu diễn số nguyên lớn hơn `Number.MAX_SAFE_INTEGER` (2^53 - 1).

### Mục đích / Purpose

**BigInt** được thiết kế để:

- Xử lý số nguyên lớn
- Đảm bảo precision cho large integers
- Hỗ trợ cryptography và database IDs
- Tránh precision loss với large numbers

### Khi nào dùng / When to Use

Dùng `BigInt` khi:

- Làm việc với numbers lớn hơn MAX_SAFE_INTEGER
- Xử lý cryptography keys
- Làm việc với database IDs lớn
- Cần precision cho large integers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Precision**: Không mất precision với large numbers
- **Safe**: Tránh unexpected results
- **Standard**: IEEE 754 compliant
- **Growing**: Hỗ trợ cho modern use cases

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                             |
| --------------------------- | -------------------------------------- |
| Precision cho large numbers | Không thể dùng với Math methods        |
| Tránh unexpected results    | Không thể mix với Number trong toán tử |
| Hỗ trợ modern use cases     | JSON không hỗ trợ                      |
| IEEE 754 compliant          | Performance overhead                   |

### Đặc điểm của BigInt:

```javascript
// 1. Tạo BigInt - thêm 'n' hoặc dùng BigInt()
const big1 = 9007199254740991n; // MAX_SAFE_INTEGER
const big2 = BigInt(9007199254740991);
const big3 = BigInt("900719925474099123456789");

// 2. Số nguyên lớn
const maxSafeInt = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log(maxSafeInt + 1); // 9007199254740992 (sai!)
console.log(maxSafeInt + 2); // 9007199254740992 (sai!)

// Với BigInt
const bigMax = BigInt(Number.MAX_SAFE_INTEGER);
console.log(bigMax + 1n); // 9007199254740992n (đúng!)
console.log(bigMax + 2n); // 9007199254740993n (đúng!)

// 3. Không thể trộn lẫn với Number trong toán tử
// console.log(10n + 5);  // TypeError
console.log(10n + BigInt(5)); // 15n
console.log(Number(10n) + 5); // 15

// 4. So sánh
console.log(10n === 10); // false (khác type)
console.log(10n == 10); // true (type coercion)
console.log(10n > 5); // true

// 5. Các toán tử hỗ trợ
let a = 10n;
console.log(-a); // -10n
console.log(~a); // -11n
console.log(a ** 3n); // 1000n
```

### Khi nào dùng BigInt:

**1. Xử lý số nguyên lớn:**

```javascript
// Tính toán số lớn trong cryptography
const largeNumber = 123456789012345678901234567890n;
const result = largeNumber * 2n;

// Database IDs lớn
const userId = BigInt("18446744073709551615");
```

**2. Timestamp chính xác:**

```javascript
// Microsecond timestamps
const timestamp = BigInt(Date.now()) * 1000n + BigInt(process.hrtime()[1]);
```

**3. Tính toán tài chính chính xác:**

```javascript
// Lưu trữ số tiền chính xác (theo cents)
const amount = BigInt(1234567890123); // $12,345,678,901.23
```

### Hạn chế của BigInt:

```javascript
// Không thể dùng với Math
// Math.max(10n, 20n);  // TypeError

// Không thể chuyển đổi sang Number khi quá lớn
const huge = 123456789012345678901234567890n;
// Number(huge);  // Infinity

// JSON không hỗ trợ BigInt
const obj = { value: 100n };
// JSON.stringify(obj);  // TypeError

// Cần custom toJSON
BigInt.prototype.toJSON = function () {
  return this.toString();
};
JSON.stringify({ value: 100n }); // '{"value":"100"}'
```

---

## Kiểm tra type trong JS: `typeof`, `instanceof`, `Object.prototype.toString`?

### Mục đích / Purpose

Type checking giúp:

- Validate input data
- Debug type-related errors
- Write defensive code
- Ensure type safety

### Khi nào dùng / When to Use

| Method                      | Khi nào dùng                     |
| --------------------------- | -------------------------------- |
| `typeof`                    | Kiểm tra primitive types         |
| `instanceof`                | Kiểm tra constructor inheritance |
| `Object.prototype.toString` | Kiểm tra chính xác mọi types     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Validation**: Đảm bảo data đúng type
- **Debugging**: Dễ dàng tìm type errors
- **Safety**: Write defensive code
- **Clarity**: Code intent rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Method                      | Ưu điểm              | Nhược điểm                                           |
| --------------------------- | -------------------- | ---------------------------------------------------- |
| `typeof`                    | Nhanh, đơn giản      | `null` trả về "object", không phân biệt object types |
| `instanceof`                | Kiểm tra inheritance | Không hoạt động qua frames                           |
| `Object.prototype.toString` | Chính xác nhất       | Verbose                                              |

### 1. `typeof` - Kiểm tra primitive types

```javascript
typeof undefined; // "undefined"
typeof null; // "object" (bug lịch sử)
typeof true; // "boolean"
typeof 42; // "number"
typeof "hello"; // "string"
typeof Symbol(); // "symbol"
typeof 42n; // "bigint"

typeof []; // "object"
typeof {}; // "object"
typeof function () {}; // "function"

// Hạn chế
console.log(typeof null); // "object" (không chính xác)
console.log(typeof []); // "object" (không phân biệt được array)
```

### 2. `instanceof` - Kiểm tra constructor

```javascript
// Kiểm tra object có được tạo từ constructor nào
[] instanceof Array;           // true
[] instanceof Object;          // true
{} instanceof Object;          // true
new Date() instanceof Date;    // true

function Person() {}
const p = new Person();
p instanceof Person;  // true

// Hạn chế - không hoạt động qua multiple frames/contexts
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeArray = iframe.contentWindow.Array;
iframeArray instanceof Array;  // false
```

### 3. `Object.prototype.toString` - Kiểm tra chính xác nhất

```javascript
// Cách sử dụng
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(/regex/); // "[object RegExp]"
Object.prototype.toString.call(new Date()); // "[object Date]"

// Helper function
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

getType([]); // "array"
getType({}); // "object"
getType(null); // "null"
getType(undefined); // "undefined"
getType(new Map()); // "map"
getType(new Set()); // "set"
```

### So sánh và khi dùng:

| Method                      | Ưu điểm              | Nhược điểm                                           | Khi dùng                 |
| --------------------------- | -------------------- | ---------------------------------------------------- | ------------------------ |
| `typeof`                    | Nhanh, đơn giản      | `null` trả về "object", không phân biệt object types | Kiểm tra primitive types |
| `instanceof`                | Kiểm tra inheritance | Không hoạt động qua frames                           | Kiểm tra custom classes  |
| `Object.prototype.toString` | Chính xác nhất       | Verbose                                              | Kiểm tra mọi types       |

### Ví dụ thực tế:

```javascript
// Kiểm tra array
function isArray(value) {
  return Array.isArray(value); // Cách tốt nhất
  // Hoặc: Object.prototype.toString.call(value) === '[object Array]'
}

// Kiểm tra null
function isNull(value) {
  return value === null;
  // typeof null === 'object' không chính xác
}

// Kiểm tra plain object
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

// Kiểm tra function
function isFunction(value) {
  return typeof value === "function";
}

// Kiểm tra Promise
function isPromise(value) {
  return (
    value instanceof Promise ||
    Object.prototype.toString.call(value) === "[object Promise]"
  );
}
```

---

## `NaN` là gì? Tại sao `typeof NaN === 'number'`?

**`NaN`** (Not a Number) là một giá trị đặc biệt trong JavaScript, đại diện cho kết quả của một phép tính toán học không hợp lệ.

### Mục đích / Purpose

**NaN** được thiết kế để:

- Biểu thị kết quả invalid của phép tính
- Handle mathematical errors gracefully
- Signal computation failures
- Maintain type consistency

### Khi nào dùng / When to Use

`NaN` xuất hiện khi:

- Chia 0 cho 0
- Lấy square root của số âm
- Parse invalid string thành number
- Phép toán với invalid operands

### Giúp ích gì / Benefits

**Lợi ích:**

- **Graceful failure**: Không throw error cho invalid math
- **Type consistency**: Giữ type là number
- **Detectable**: Có thể kiểm tra với Number.isNaN()
- **Standard**: IEEE 754 compliant

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                        |
| ------------------ | --------------------------------- |
| Graceful failure   | Không bằng chính nó (NaN !== NaN) |
| Type consistency   | Cần Number.isNaN() để kiểm tra    |
| IEEE 754 compliant | Có thể gây confusion              |

### Đặc điểm của NaN:

```javascript
// 1. NaN là một giá trị của type number
console.log(typeof NaN); // "number"

// 2. NaN là kết quả của các phép tính không hợp lệ
console.log(0 / 0); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(parseInt("abc")); // NaN
console.log("hello" * 5); // NaN

// 3. NaN là giá trị duy nhất không bằng chính nó
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false

// 4. Cách kiểm tra NaN đúng cách
console.log(isNaN(NaN)); // true (nhưng có vấn đề)
console.log(isNaN("hello")); // true (coerce sang number)
console.log(Number.isNaN(NaN)); // true (ES6, chính xác)
console.log(Number.isNaN("hello")); // false

// 5. So sánh với NaN luôn false
console.log(NaN < 0); // false
console.log(NaN > 0); // false
console.log(NaN >= 0); // false
console.log(NaN <= 0); // false
```

### Tại sao `typeof NaN === 'number'`?

**`NaN`** được thiết kế là một giá trị của type `number` vì:

1. **Lịch sử:** IEEE 754 floating-point standard định nghĩa NaN là một giá trị số đặc biệt
2. **Tính nhất quán:** Các phép tính số học trả về NaN vẫn là kết quả của type number
3. **Sử dụng thực tế:** Khi tính toán với numbers, kết quả có thể là NaN

```javascript
// Ví dụ thực tế
function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return NaN; // Trả về NaN thay vì throw error
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Kiểm tra kết quả hợp lệ
const result = calculateAverage([]);
if (Number.isNaN(result)) {
  console.log("Invalid calculation");
}
```

### Các phương thức liên quan:

```javascript
// isNaN() - coerce value trước khi kiểm tra
isNaN("123"); // false (coerce thành 123)
isNaN("hello"); // true (coerce thành NaN)
isNaN(undefined); // true

// Number.isNaN() - không coerce, chính xác hơn
Number.isNaN("123"); // false
Number.isNaN("hello"); // false
Number.isNaN(undefined); // false
Number.isNaN(NaN); // true

// Object.is() - so sánh chính xác cả NaN
Object.is(NaN, NaN); // true
Object.is(-0, 0); // false
Object.is(-0, -0); // true
```

### Best practices:

```javascript
// ❌ Không nên
if (value === NaN) {
} // Luôn false

// ✅ Nên
if (Number.isNaN(value)) {
}

// ✅ Hoặc kiểm tra kết quả tính toán
const result = someCalculation();
if (result !== result) {
} // NaN là giá trị duy nhất không bằng chính nó
```

---

## Sự khác biệt giữa `== null` và `=== null`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa `==` và `===` giúp:

- Tránh type coercion errors
- Write predictable code
- Implement proper validation
- Debug comparison issues

### Khi nào dùng / When to Use

| Operator   | Khi nào dùng                       |
| ---------- | ---------------------------------- |
| `=== null` | Chỉ muốn kiểm tra null             |
| `== null`  | Muốn kiểm tra cả null và undefined |
| `!value`   | Muốn kiểm tra tất cả falsy values  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Precision**: `===` kiểm tra chính xác type và value
- **Flexibility**: `==` có thể kiểm tra cả null và undefined
- **Safety**: Tránh unexpected type coercion
- **Clarity**: Code intent rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Operator   | Ưu điểm                    | Nhược điểm             |
| ---------- | -------------------------- | ---------------------- |
| `=== null` | Chính xác, type-safe       | Không match undefined  |
| `== null`  | Match cả null và undefined | Type coercion          |
| `!value`   | Match tất cả falsy values  | Match quá nhiều values |

### `==` (Loose Equality) vs `===` (Strict Equality)

```javascript
// === - so sánh cả type và value
null === null; // true
null === undefined; // false
undefined === null; // false

// == - so sánh với type coercion
null == null; // true
null == undefined; // true (coercion)
undefined == null; // true (coercion)
```

### Tại sao `null == undefined` là true?

Theo ECMAScript specification, khi so sánh `null == undefined`:

- Nếu một bên là `null` và bên kia là `undefined` → trả về `true`

```javascript
// Bảng truthy/falsy với null và undefined
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

console.log(!null); // true
console.log(!undefined); // true

console.log(null ? "truthy" : "falsy"); // 'falsy'
console.log(undefined ? "truthy" : "falsy"); // 'falsy'
```

### Khi dùng `== null`:

```javascript
// Kiểm tra cả null và undefined
function checkValue(value) {
  if (value == null) {
    console.log("Value is null or undefined");
  }
}

checkValue(null); // 'Value is null or undefined'
checkValue(undefined); // 'Value is null or undefined'
checkValue(0); // Không in gì
checkValue(""); // Không in gì
```

### Khi dùng `=== null`:

```javascript
// Chỉ kiểm tra null
function checkNull(value) {
  if (value === null) {
    console.log("Value is null");
  }
}

checkNull(null); // 'Value is null'
checkNull(undefined); // Không in gì
```

### So sánh với các falsy values:

```javascript
// == null chỉ match null và undefined
null == null; // true
undefined == null; // true
0 == null; // false
"" == null; // false
false == null; // false
NaN == null; // false

// === null chỉ match null
null === null; // true
undefined === null; // false
0 === null; // false
"" === null; // false
false === null; // false
```

### Best practices:

```javascript
// ✅ Khi muốn kiểm tra cả null và undefined
function setConfig(config) {
  if (config == null) {
    config = {}; // Default cho cả null và undefined
  }
}

// ✅ Khi muốn phân biệt rõ ràng null và undefined
function processData(data) {
  if (data === null) {
    // Data bị gán null
    return handleNull();
  } else if (data === undefined) {
    // Data không được truyền
    return handleMissing();
  }
}

// ✅ Khi muốn kiểm tra falsy values
if (!value) {
  // Match: null, undefined, 0, '', false, NaN
}

// ✅ Khi muốn kiểm tra null/undefined riêng biệt
if (value == null) {
  // Match: null, undefined
}

// ✅ Kiểm tra optional chaining
const result = obj?.prop?.value; // Trả về undefined khi null/undefined
```

### Tóm tắt:

| Expression            | Matches               | Type Check |
| --------------------- | --------------------- | ---------- |
| `value === null`      | Chỉ `null`            | Có         |
| `value == null`       | `null` và `undefined` | Không      |
| `!value`              | Tất cả falsy values   | Không      |
| `value === undefined` | Chỉ `undefined`       | Có         |
