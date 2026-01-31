# 3. Equality & Type Coercion

## Tổng quan về Equality và Type Coercion

### Mục đích của Equality và Type Coercion / Purpose

**Equality** và **Type Coercion** là cơ chế so sánh và chuyển đổi type trong JavaScript.

**Mục đích chính:**

- So sánh giá trị trong JavaScript
- Chuyển đổi giữa các types khác nhau
- Hỗ trợ flexible comparisons
- Maintain backward compatibility

### Khi nào cần hiểu về Equality và Type Coercion / When to Use

Hiểu về equality và type coercion là cần thiết khi:

- So sánh giá trị trong code
- Debug comparison-related issues
- Validate input data
- Write defensive code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible comparisons**: Hỗ trợ nhiều type comparisons
- **Backward compatibility**: Maintain compatibility với old code
- **Type safety**: Có thể kiểm tra type
- **Validation**: Validate input data

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                            |
| ---------------------- | ------------------------------------- |
| Flexible comparisons   | Type coercion gây unexpected behavior |
| Backward compatibility | Khó debug với complex comparisons     |
| Easy to use            | `==` dễ gây bugs                      |

---

## Sự khác biệt giữa `==` và `===`?

### Mục đích / Purpose

**`==`** (Loose Equality) và **`===`** (Strict Equality) là hai cách so sánh trong JavaScript.

**Mục đích:**

- `===`: So sánh chính xác cả type và value
- `==`: So sánh với type coercion

### Khi nào dùng / When to Use

| Operator | Khi nào dùng                           |
| -------- | -------------------------------------- |
| `===`    | Mặc định cho mọi comparisons           |
| `==`     | Khi muốn kiểm tra cả null và undefined |

### Giúp ích gì / Benefits

**Lợi ích:**

- **`===`**: Chính xác, predictable, tránh bugs
- **`==`**: Flexible cho null/undefined checks

### Ưu nhược điểm / Pros & Cons

| Operator | Ưu điểm              | Nhược điểm                            |
| -------- | -------------------- | ------------------------------------- |
| `===`    | Chính xác, type-safe | Không có type coercion                |
| `==`     | Flexible             | Type coercion gây unexpected behavior |

### Bảng so sánh:

| Đặc điểm            | `==` (Loose Equality) | `===` (Strict Equality) |
| ------------------- | --------------------- | ----------------------- |
| Type check          | ❌ Không              | ✅ Có                   |
| Type coercion       | ✅ Có                 | ❌ Không                |
| `null == undefined` | `true`                | `false`                 |
| `'5' == 5`          | `true`                | `false`                 |
| `false == 0`        | `true`                | `false`                 |
| `[] == 0`           | `true`                | `false`                 |
| `[] == ''`          | `true`                | `false`                 |
| `[] == []`          | `false`               | `false`                 |

### Ví dụ chi tiết:

```javascript
// === - Strict Equality (không coercion)
5 === 5; // true
5 === "5"; // false (khác type)
null === undefined; // false
false === 0; // false

// == - Loose Equality (có coercion)
5 == 5; // true
5 == "5"; // true (coerce '5' thành 5)
null == undefined; // true
false == 0; // true (coerce false thành 0)
```

### Type coercion rules với `==`:

```javascript
// 1. String vs Number
'5' == 5;    // true (string -> number)
'5' == '5';  // true (không cần coerce)

// 2. Boolean vs Number
true == 1;   // true (true -> 1)
false == 0;  // true (false -> 0)

// 3. Boolean vs String
true == '1';   // true (true -> 1, '1' -> 1)
false == '0';  // true (false -> 0, '0' -> 0)

// 4. null vs undefined
null == undefined;  // true

// 5. Object vs Primitive
[] == 0;      // true ([] -> '' -> 0)
[] == '';     // true ([] -> '')
[] == false;  // true ([] -> '' -> 0 -> false)

// 6. Object vs Object
[] == [];      // false (khác tham chiếu)
{} == {};      // false (khác tham chiếu)
```

### Best practices:

```javascript
// ✅ Luôn dùng === để tránh lỗi không mong muốn
if (value === null) {
  // Chỉ null
}

if (value === undefined) {
  // Chỉ undefined
}

// ✅ Dùng == null khi muốn kiểm tra cả null và undefined
if (value == null) {
  // null hoặc undefined
}

// ❌ Tránh == với các type khác nhau
if ("5" == 5) {
} // Khó đọc, dễ gây nhầm lẫn

// ✅ Dùng === với explicit type conversion
if (Number("5") === 5) {
} // Rõ ràng hơn
if (String(5) === "5") {
} // Rõ ràng hơn
```

---

## Type coercion là gì?

**Type coercion** (ép kiểu) là quá trình chuyển đổi giá trị từ một type sang type khác, tự động hoặc thủ công.

### Mục đích / Purpose

**Type coercion** được thiết kế để:

- Hỗ trợ flexible comparisons
- Chuyển đổi giữa types
- Maintain backward compatibility
- Hỗ trợ dynamic typing

### Khi nào dùng / When to Use

| Type coercion | Khi nào dùng                              |
| ------------- | ----------------------------------------- |
| Implicit      | Tự động bởi JavaScript (tránh khi có thể) |
| Explicit      | Khi cần chuyển đổi type một cách rõ ràng  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible**: Hỗ trợ nhiều type conversions
- **Convenient**: Không cần manual conversion
- **Backward compatible**: Maintain compatibility

### Ưu nhược điểm / Pros & Cons

| Type coercion | Ưu điểm            | Nhược điểm          |
| ------------- | ------------------ | ------------------- |
| Implicit      | Convenient         | Unexpected behavior |
| Explicit      | Clear, predictable | Verbose             |

### 2 loại coercion:

#### 1. Implicit Coercion (Tự động)

```javascript
// String coercion
const num = 42;
const str = "The answer is " + num; // 'The answer is 42'

// Number coercion
const strNum = "42";
const result = strNum * 2; // 84

// Boolean coercion
if (value) {
  // value được coerce thành boolean
}

// Equality coercion
"5" == 5; // true
```

#### 2. Explicit Coercion (Thủ công)

```javascript
// String()
String(42); // '42'
String(null); // 'null'
String(undefined); // 'undefined'
String(true); // 'true'

// Number()
Number("42"); // 42
Number("hello"); // NaN
Number(true); // 1
Number(false); // 0

// Boolean()
Boolean(0); // false
Boolean(1); // true
Boolean(""); // false
Boolean("hello"); // true

// parseInt(), parseFloat()
parseInt("42px"); // 42
parseFloat("3.14"); // 3.14

// toString()
(42).toString(); // '42'
```

### Falsy values (trong boolean coercion):

```javascript
// 6 falsy values trong JavaScript
Boolean(false); // false
Boolean(0); // false
Boolean(-0); // false
Boolean(0n); // false
Boolean(""); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false

// Mọi giá trị khác là truthy
Boolean({}); // true
Boolean([]); // true
Boolean("0"); // true
Boolean("false"); // true
```

### String coercion rules:

```javascript
// + operator với string
1 + "2"; // '12'
"1" + 2; // '12'
1 + 2 + "3"; // '33' (1+2=3, then 3+'3'='33')
"1" + 2 + 3; // '123'

// toString()
({}).toString(); // '[object Object]'
[1, 2, 3].toString(); // '1,2,3'
```

### Number coercion rules:

```javascript
// - * / % operator
"5" - 2; // 3
"5" * 2; // 10
"10" / 2; // 5
"10" % 3; // 1

// Unary +
+"5"; // 5
+"hello"; // NaN

// Comparison operators
"5" > 3; // true
"5" < 10; // true
```

### Ví dụ thực tế:

```javascript
// ✅ Explicit coercion - rõ ràng
const age = Number(userInput);
if (age >= 18) {
  console.log("Adult");
}

// ❌ Implicit coercion - dễ gây lỗi
const age = userInput;
if (age >= 18) {
  // Nếu userInput là '18abc', NaN >= 18 = false
}

// ✅ Explicit coercion với fallback
const age = Number(userInput) || 0;

// ✅ Boolean coercion với if
if (users.length) {
  // users.length > 0
}

// ✅ String coercion cho template literals
const name = "John";
const greeting = `Hello, ${name}!`; // 'Hello, John!'
```

---

## Abstract Equality Comparison Algorithm?

**Abstract Equality Comparison Algorithm** là quy tắc mà JavaScript dùng để so sánh với `==` operator.

### Mục đích / Purpose

**Abstract Equality Comparison Algorithm** được thiết kế để:

- Định nghĩa rõ ràng cách `==` hoạt động
- Hỗ trợ type coercion
- Maintain backward compatibility
- Đảm bảo consistent behavior

### Khi nào dùng / When to Use

Hiểu về algorithm này giúp:

- Debug `==` related issues
- Predict `==` behavior
- Write better comparisons
- Avoid unexpected results

### Gihelp ích gì / Benefits

**Lợi ích:**

- **Predictable**: Hành vi được định nghĩa rõ ràng
- **Debugging**: Dễ dàng debug `==` issues
- **Understanding**: Hiểu sâu về JavaScript

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                |
| -------------------- | ------------------------- |
| Predictable behavior | Complex rules             |
| Well-defined         | Easy to make mistakes     |
| Backward compatible  | Type coercion causes bugs |

### Quy tắc (theo ECMAScript specification):

```javascript
// 1. Nếu type giống nhau → dùng Strict Equality Comparison
x == y  // khi typeof x === typeof y → x === y

// 2. Nếu một bên là null và bên kia là undefined → true
null == undefined;  // true
undefined == null;  // true

// 3. Nếu một bên là number và bên kia là string
// → coerce string thành number rồi so sánh
5 == '5';    // true (Number('5') === 5)
0 == '';     // true (Number('') === 0)

// 4. Nếu một bên là boolean
// → coerce boolean thành number rồi so sánh
true == 1;   // true (Number(true) === 1)
false == 0;  // true (Number(false) === 0)
true == '1'; // true (Number(true) === 1 === Number('1'))

// 5. Nếu một bên là object và bên kia là string/number/symbol
// → coerce object thành primitive (toPrimitive) rồi so sánh
[] == 0;      // true ([] -> '' -> 0)
[1] == '1';   // true ([1] -> '1')
{} == '[object Object]';  // true

// 6. Ngược lại → false
[] == [];     // false
{} == {};     // false
```

### ToPrimitive operation:

```javascript
// Object được coerce thành primitive theo thứ tự:
// 1. Nếu có [Symbol.toPrimitive] → gọi nó
// 2. Nếu hint là 'string' → toString() rồi valueOf()
// 3. Nếu hint là 'number' → valueOf() rồi toString()
// 4. Nếu không có → toString()

// Ví dụ:
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'hello';
    return true;
  }
};

obj == 42;      // true
obj == 'hello'; // true
obj == true;    // true

// Array toString
[] == '';       // true ([] -> '')
[1, 2] == '1,2'; // true ([1,2] -> '1,2')

// Object toString
{} == '[object Object]'; // true
```

### Ví dụ phức tạp:

```javascript
// [] == ![]
// ![] = false
// [] == false
// [] == 0 (false -> 0)
// '' == 0 ([] -> '')
// 0 == 0 ('' -> 0)
// true

// '0' == false
// '0' == 0 (false -> 0)
// 0 == 0 ('0' -> 0)
// true

// [1, 2] == '1,2'
// [1, 2] -> '1,2' (toString)
// '1,2' == '1,2'
// true

// {} == !{}
// !{} = false
// {} == false
// {} == 0 (false -> 0)
// '[object Object]' == 0 ({} -> '[object Object]')
// NaN == 0 ('[object Object]' -> NaN)
// false
```

---

## Kết quả của: `[] == ![]`?

### Mục đích / Purpose

Hiểu ví dụ này giúp:

- Nắm vững Abstract Equality Comparison Algorithm
- Debug `==` related issues
- Hiểu về type coercion
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

Tình huống này xuất hiện khi:

- So sánh array với boolean
- Dùng `==` với complex types
- Debug unexpected comparison results

### Giúp ích gì / Benefits

Hiểu ví dụ này giúp:

- **Deep understanding**: Hiểu sâu về `==`
- **Debugging**: Dễ dàng debug comparisons
- **Best practices**: Sử dụng `===` thay vì `==`

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm              |
| ----------------------- | ----------------------- |
| Demonstrates complexity | Confusing for beginners |
| Shows coercion behavior | Not practical use case  |

```javascript
// Bước 1: Đánh giá ![]
![]; // false (empty array là truthy)

// Bước 2: [] == false
// Theo Abstract Equality Comparison:
// - false là boolean → coerce thành number
// - Number(false) = 0
// - [] == 0

// Bước 3: [] == 0
// - [] là object → coerce thành primitive
// - [].toString() = ''
// - '' == 0

// Bước 4: '' == 0
// - '' là string → coerce thành number
// - Number('') = 0
// - 0 == 0

// Kết quả: true

console.log([] == ![]); // true
```

### Giải thích chi tiết:

```javascript
// Step by step:
console.log(![]); // false
console.log([] == false); // true
console.log([] == 0); // true
console.log([] + ""); // ''
console.log("" == 0); // true

// Tương tự:
console.log([1] == ![]); // false
// [1] == false
// [1] == 0
// '1' == 0
// 1 == 0
// false

console.log([0] == ![]); // true
// [0] == false
// [0] == 0
// '0' == 0
// 0 == 0
// true
```

---

## Kết quả của: `null == undefined`?

### Mục đích / Purpose

Hiểu ví dụ này giúp:

- Nắm vững null/undefined behavior
- Debug null/undefined comparisons
- Hiểu về Abstract Equality Comparison
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

Tình huống này xuất hiện khi:

- So sánh null với undefined
- Kiểm tra missing values
- Debug null/undefined related issues

### Giúp ích gì / Benefits

Hiểu ví dụ này giúp:

- **Null/undefined handling**: Xử lý null/undefined hiệu quả
- **Validation**: Validate input data
- **Debugging**: Dễ dàng debug comparisons

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                        | Nhược điểm                        |
| ------------------------------ | --------------------------------- |
| Flexible null/undefined checks | Type coercion                     |
| Easy to check missing values   | Không phân biệt null và undefined |

```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
```

### Giải thích:

```javascript
// Theo Abstract Equality Comparison:
// - Nếu một bên là null và bên kia là undefined → true

// Điều này được thiết kế đặc biệt trong JavaScript
// để null và undefined được coi là "không có giá trị"

// Ví dụ:
function checkValue(value) {
  if (value == null) {
    console.log("No value provided");
  }
}

checkValue(null); // 'No value provided'
checkValue(undefined); // 'No value provided'
checkValue(0); // Không in gì
checkValue(""); // Không in gì
```

### So sánh với các falsy values:

```javascript
// == null chỉ match null và undefined
null == null; // true
undefined == null; // true
0 == null; // false
"" == null; // false
false == null; // false

// === null chỉ match null
null === null; // true
undefined === null; // false
0 === null; // false
"" === null; // false
false === null; // false
```

---

## Kết quả của: `'0' == 0`?

### Mục đích / Purpose

Hiểu ví dụ này giúp:

- Nắm vững string/number coercion
- Debug string/number comparisons
- Hiểu về Abstract Equality Comparison
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

Tình huống này xuất hiện khi:

- So sánh string với number
- Validate input từ form
- Debug string/number related issues

### Giúp ích gì / Benefits

Hiểu ví dụ này giúp:

- **Type coercion**: Hiểu về string/number coercion
- **Validation**: Validate input data
- **Debugging**: Dễ dàng debug comparisons

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                  |
| --------------------- | --------------------------- |
| Flexible comparisons  | Type coercion gây confusion |
| Easy to compare types | Không type-safe             |

```javascript
console.log("0" == 0); // true
console.log("0" === 0); // false
```

### Giải thích:

```javascript
// Theo Abstract Equality Comparison:
// - '0' là string, 0 là number
// - Coerce string thành number
// - Number('0') = 0
// - 0 == 0
// - true

// Tương tự:
"5" == 5; // true
"10" == 10; // true
"abc" == 0; // false (Number('abc') = NaN, NaN == 0 = false)
```

### Ví dụ khác:

```javascript
// String vs Number
"0" == 0; // true
"1" == 1; // true
"  1  " == 1; // true (trim spaces)
"\t\n1" == 1; // true (trim whitespace)

// Edge cases
"" == 0; // true (Number('') = 0)
" " == 0; // true (Number(' ') = 0)
"\n" == 0; // true (Number('\n') = 0)

// Invalid numbers
"abc" == NaN; // false (NaN != NaN)
"123abc" == NaN; // false
```

---

## Kết quả của: `[] == 0`?

### Mục đích / Purpose

Hiểu ví dụ này giúp:

- Nắm vững object/primitive coercion
- Debug array/number comparisons
- Hiểu về Abstract Equality Comparison
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

Tình huống này xuất hiện khi:

- So sánh array với number
- Validate array inputs
- Debug array/number related issues

### Giúp ích gì / Benefits

Hiểu ví dụ này giúp:

- **Object coercion**: Hiểu về object/primitive coercion
- **Validation**: Validate input data
- **Debugging**: Dễ dàng debug comparisons

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                  |
| --------------------- | --------------------------- |
| Flexible comparisons  | Type coercion gây confusion |
| Easy to compare types | Không type-safe             |

```javascript
console.log([] == 0); // true
console.log([] === 0); // false
```

### Giải thích:

```javascript
// Theo Abstract Equality Comparison:
// - [] là object, 0 là number
// - Coerce object thành primitive
// - [].toString() = ''
// - '' == 0

// - '' là string, 0 là number
// - Coerce string thành number
// - Number('') = 0
// - 0 == 0
// - true

// Step by step:
console.log([].toString()); // ''
console.log("" == 0); // true
console.log(Number("")); // 0
```

### Ví dụ khác với array:

```javascript
// Arrays vs Numbers
[] == 0; // true
[0] == 0; // false ('0' == 0 = true)
[1] == 1; // true ('1' == 1 = true)
[1, 2] == NaN; // false ('1,2' == NaN = false)

// Arrays vs Strings
[] == ""; // true
[1] == "1"; // true
[1, 2] == "1,2"; // true

// Arrays vs Booleans
[] == false; // true ([] == 0 == false)
[1] == true; // true ([1] == '1' == 1 == true)
[0] == false; // true ([0] == '0' == 0 == false)
```

---

## Kết quả của: `'' == false`?

### Mục đích / Purpose

Hiểu ví dụ này giúp:

- Nắm vững string/boolean coercion
- Debug string/boolean comparisons
- Hiểu về Abstract Equality Comparison
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

Tình huống này xuất hiện khi:

- So sánh string với boolean
- Validate input từ form
- Debug string/boolean related issues

### Giúp ích gì / Benefits

Hiểu ví dụ này giúp:

- **Type coercion**: Hiểu về string/boolean coercion
- **Validation**: Validate input data
- **Debugging**: Dễ dàng debug comparisons

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                  |
| --------------------- | --------------------------- |
| Flexible comparisons  | Type coercion gây confusion |
| Easy to compare types | Không type-safe             |

```javascript
console.log("" == false); // true
console.log("" === false); // false
```

### Giải thích:

```javascript
// Theo Abstract Equality Comparison:
// - '' là string, false là boolean
// - Coerce boolean thành number
// - Number(false) = 0
// - '' == 0

// - '' là string, 0 là number
// - Coerce string thành number
// - Number('') = 0
// - 0 == 0
// - true

// Step by step:
console.log(Number(false)); // 0
console.log("" == 0); // true
console.log(Number("")); // 0
```

### Ví dụ khác với strings và booleans:

```javascript
// Strings vs Booleans
"" == false; // true
"0" == false; // true ('0' == 0 == false)
"1" == true; // true ('1' == 1 == true)
"hello" == true; // false (Number('hello') = NaN)

// Edge cases
"false" == false; // false (Number('false') = NaN)
"true" == true; // false (Number('true') = NaN)
```

### Truthy/Falsy comparison:

```javascript
// Falsy values == false
false == false; // true
0 == false; // true
"" == false; // true
null == false; // false (null chỉ == undefined)
undefined == false; // false
NaN == false; // false
[] == false; // true ([] == 0 == false)

// Truthy values == true
true == true; // true
1 == true; // true
"1" == true; // true
[1] == true; // true
"hello" == true; // false
```

---

## Tránh type coercion như thế nào?

### Mục đích / Purpose

Tránh type coercion giúp:

- Write predictable code
- Avoid unexpected behavior
- Debug easier
- Improve code quality

### Khi nào cần tránh / When to Use

Cần tránh type coercion khi:

- So sánh giá trị
- Validate input
- Write production code
- Maintain large codebase

### Giúp ích gì / Benefits

**Lợi ích:**

- **Predictable**: Code dễ dự đoán
- **Type-safe**: Tránh type-related bugs
- **Debugging**: Dễ dàng debug
- **Maintainability**: Code dễ maintain

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm              |
| ---------------- | ----------------------- |
| Predictable code | Verbose hơn             |
| Type-safe        | Cần explicit conversion |
| Easy to debug    | Cần hiểu về types       |

### 1. Dùng Strict Equality (`===`)

```javascript
// ✅ Luôn dùng ===
if (value === 5) {
  // Chỉ khi value là number 5
}

// ❌ Tránh == với các type khác nhau
if (value == 5) {
  // Có thể là 5, '5', [5], v.v.
}
```

### 2. Explicit Type Conversion

```javascript
// ✅ Explicit conversion - rõ ràng
const age = Number(userInput);
if (age === 18) {
  console.log("Exactly 18");
}

// ✅ Dùng parseInt/parseFloat cho strings
const count = parseInt(userInput, 10);
if (count > 0) {
  console.log("Positive count");
}

// ✅ Dùng String() cho string conversion
const message = String(value);
if (message === "hello") {
  console.log("Hello!");
}
```

### 3. Type Guards

```javascript
// ✅ Kiểm tra type trước khi so sánh
function processValue(value) {
  if (typeof value === "number") {
    return value * 2;
  }
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value;
}

// ✅ Dùng instanceof cho objects
if (obj instanceof Array) {
  obj.forEach((item) => console.log(item));
}

// ✅ Dùng Array.isArray()
if (Array.isArray(value)) {
  // value là array
}
```

### 4. Null/Undefined checks

```javascript
// ✅ Kiểm tra null/undefined riêng biệt
if (value === null) {
  // Chỉ null
}

if (value === undefined) {
  // Chỉ undefined
}

// ✅ Kiểm tra cả null và undefined
if (value == null) {
  // null hoặc undefined
}

// ✅ Kiểm tra nullish (null hoặc undefined)
if (value === null || value === undefined) {
  // nullish
}
```

### 5. Optional Chaining & Nullish Coalescing

```javascript
// ✅ Optional chaining tránh TypeError
const name = user?.profile?.name;

// ✅ Nullish coalescing cho default values
const timeout = config?.timeout ?? 5000;

// ✅ Kết hợp
const apiUrl = config?.apiUrl ?? "https://api.example.com";
```

### 6. Strict Mode

```javascript
"use strict";

// Strict mode giúp tránh một số lỗi
// - Không thể gán cho undeclared variables
// - Không thể delete variables
// - Không thể dùng duplicate parameter names
```

### 7. Linting Tools

```javascript
// ESLint với quy tắc eqeqeq
// "eqeqeq": ["error", "always"]

// ESLint sẽ báo lỗi khi dùng ==
// ❌ if (a == b) {}
// ✅ if (a === b) {}
```

### 8. TypeScript

```typescript
// TypeScript giúp tránh type coercion
function add(a: number, b: number): number {
  return a + b;
}

// TypeScript sẽ báo lỗi nếu truyền string
add(1, 2); // OK
add(1, "2"); // Error: Argument of type 'string' is not assignable
```

### Ví dụ thực tế:

```javascript
// ❌ Bad - implicit coercion
function calculateTotal(price, quantity) {
  return price * quantity;
}

calculateTotal('100', '2');  // 200 (coercion)

// ✅ Good - explicit conversion
function calculateTotal(price: string | number, quantity: string | number) {
  const numPrice = Number(price);
  const numQuantity = Number(quantity);

  if (isNaN(numPrice) || isNaN(numQuantity)) {
    throw new Error('Invalid input');
  }

  return numPrice * numQuantity;
}

// ✅ Good - type guard
function calculateTotal(price: number, quantity: number) {
  return price * quantity;
}

// Validate trước
const price = Number(userInput.price);
const quantity = Number(userInput.quantity);

if (!isNaN(price) && !isNaN(quantity)) {
  calculateTotal(price, quantity);
}
```
