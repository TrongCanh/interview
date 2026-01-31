# 5. Array & Tuple

## Tổng quan về Array & Tuple

### Mục đích của Array & Tuple / Purpose

**Array & Tuple** là hai cách để định nghĩa collections trong TypeScript.

**Mục đích chính:**

- Định nghĩa arrays với type safety
- Định nghĩa tuples với fixed-length và specific types
- Type check array operations
- Enable better IntelliSense và refactoring
- Ensure type safety khi làm việc với collections

### Khi nào cần hiểu về Array & Tuple / When to Use

Hiểu về Array & Tuple là cần thiết khi:

- Làm việc với lists của items
- Định nghĩa fixed-length collections
- Type check array operations
- Work với API responses
- Create reusable collection types

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Self-documenting**: Code rõ ràng hơn
- **Safer Refactoring**: Refactor an toàn hơn
- **Fixed-length**: Tuples có fixed-length

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| Type safety       | Verbose hơn          |
| Better DX         | Learning curve       |
| Self-documenting  | Cần understand types |
| Safer refactoring | Có thể overkill      |

---

## Array types trong TypeScript?

**Array types** - Định nghĩa type cho arrays trong TypeScript.

### Mục đích / Purpose

Array types được dùng để:

- Định nghĩa type cho array elements
- Type check array operations
- Enable better IntelliSense
- Ensure type safety

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng                    |
| --------------- | ------------------------------- |
| Lists of items  | Khi có list của items cùng type |
| API responses   | Khi API trả về arrays           |
| Data processing | Khi process arrays              |
| Collections     | Khi làm việc với collections    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Safer operations**: Type check array operations
- **Documentation**: Rõ ràng về array type

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm           |
| ---------------- | -------------------- |
| Type safety      | Verbose hơn          |
| Better DX        | Learning curve       |
| Safer operations | Cần understand types |

### Ví dụ:

```typescript
// 1. Array type với []
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["a", "b", "c"];
const booleans: boolean[] = [true, false, true];

// 2. Array type với Array<T>
const numbers2: Array<number> = [1, 2, 3, 4, 5];
const strings2: Array<string> = ["a", "b", "c"];

// 3. Array với union types
const mixed: (string | number)[] = [1, "two", 3, "four"];

// 4. Array với object types
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// 5. Array methods với types
const doubled = numbers.map((n) => n * 2); // number[]
const filtered = numbers.filter((n) => n > 2); // number[]
const sum = numbers.reduce((acc, n) => acc + n, 0); // number

// 6. Readonly arrays
const readonlyNumbers: readonly number[] = [1, 2, 3];
const readonlyNumbers2: ReadonlyArray<number> = [1, 2, 3];

// readonlyNumbers.push(4); // ❌ Error
// readonlyNumbers[0] = 10; // ❌ Error

const first = readonlyNumbers[0]; // ✅ OK

// 7. Array destructuring
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// 8. Array với generic types
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement(numbers); // number | undefined
const firstStr = firstElement(strings); // string | undefined

// 9. Array với conditional types
type NonNullableArray<T> = T extends null | undefined ? never : T[];

const nonNullNumbers: NonNullableArray<number | null> = [1, 2, 3];
// const nullableNumbers: NonNullableArray<number | null> = [null, 2, 3]; // ❌ Error

// 10. Array với mapped types
type ReadonlyArray<T> = readonly T[];

const readonlyArr: ReadonlyArray<number> = [1, 2, 3];
```

### Best Practices:

1. **Use `T[]` syntax**: Dùng `T[]` thay vì `Array<T>` cho consistency
2. **Use readonly arrays**: Dùng `readonly T[]` cho immutable arrays
3. **Type inference**: Để TypeScript tự推断 array types khi có thể
4. **Explicit types cho public APIs**: Khai báo types cho arrays trong public APIs
5. **Avoid mixed arrays**: Hạn chế dùng arrays với nhiều types khác nhau

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any cho arrays
const items: any[] = [1, "two", true];

// ✅ Nên: Dùng union types hoặc specific types
const items: (string | number)[] = [1, "two"];

// ❌ Không nên: Over-annotation
const numbers: number[] = [1, 2, 3];

// ✅ Nên: Để TypeScript infer
const numbers = [1, 2, 3];
```

---

## Tuple là gì? Use cases?

**Tuple** - Fixed-length array với specific types cho từng position.

### Mục đích / Purpose

Tuple được dùng để:

- Định nghĩa fixed-length collections
- Represent data với specific structure
- Type check position-specific data
- Create strongly-typed pairs/triples/etc.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                     |
| ---------------------- | -------------------------------- |
| Coordinates            | Khi có (x, y) coordinates        |
| Key-value pairs        | Khi có key-value pairs           |
| Return multiple values | Khi function return nhiều values |
| Fixed-length data      | Khi data có fixed-length         |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Fixed-length**: Đảm bảo fixed-length
- **Type safety**: Type check từng position
- **Better DX**: IntelliSense cho từng position
- **Documentation**: Rõ ràng về structure

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm            |
| ------------- | --------------------- |
| Fixed-length  | Không flexible        |
| Type safety   | Verbose hơn           |
| Better DX     | Learning curve        |
| Documentation | Cần understand tuples |

### Ví dụ:

```typescript
// 1. Tuple cơ bản
const point: [number, number] = [10, 20];
const point2: [number, number, number] = [10, 20, 30];

// 2. Tuple destructuring
const [x, y] = point;
console.log(x); // 10
console.log(y); // 20

// 3. Tuple với optional elements
const user: [string, number?] = ["John"];
const user2: [string, number?] = ["Jane", 30];

// 4. Tuple với rest elements
const numbers: [number, ...string[]] = [1, "two", "three", "four"];
const numbers2: [...number[], string] = [1, 2, 3, "last"];

// 5. Readonly tuples
const readonlyPoint: readonly [number, number] = [10, 20];
// readonlyPoint[0] = 15; // ❌ Error

// 6. Tuple với named elements
type Point = {
  x: number;
  y: number;
};

const point3: Point = { x: 10, y: 20 };

// 7. Tuple với function return types
function getMinMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)];
}

const [min, max] = getMinMax([1, 2, 3, 4, 5]);
console.log(min, max); // 1 5

// 8. Tuple với generic types
type Pair<T, U> = [T, U];

const pair: Pair<string, number> = ["hello", 123];

// 9. Tuple với mapped types
type Tuple<T, N extends number, Acc extends T[] = []> = Acc["length"] extends N
  ? Acc
  : Tuple<T, N, [...Acc, T]>;

type Tuple3 = Tuple<string, 3>; // [string, string, string]

// 10. Tuple với conditional types
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;

type HeadResult = Head<[1, 2, 3]>; // 1
type TailResult = Tail<[1, 2, 3]>; // [2, 3]

// 11. Use case: Coordinates
type Coordinate = [number, number]; // [x, y]
type Coordinate3D = [number, number, number]; // [x, y, z]

const coord: Coordinate = [10, 20];
const coord3d: Coordinate3D = [10, 20, 30];

// 12. Use case: RGB color
type RGB = [number, number, number]; // [red, green, blue]

const red: RGB = [255, 0, 0];
const green: RGB = [0, 255, 0];
const blue: RGB = [0, 0, 255];

// 13. Use case: HTTP status
type HttpStatus = [number, string];

const ok: HttpStatus = [200, "OK"];
const notFound: HttpStatus = [404, "Not Found"];

// 14. Use case: Key-value pair
type KeyValuePair<K, V> = [K, V];

const entry: KeyValuePair<string, number> = ["age", 30];

// 15. Tuple với spread
function concat<T extends any[], U extends any[]>(a: T, b: U): [...T, ...U] {
  return [...a, ...b];
}

const result = concat([1, 2], ["a", "b"]); // [1, 2, 'a', 'b']
```

### Best Practices:

1. **Use tuples cho fixed-length data**: Dùng tuples cho data có fixed-length
2. **Destructure tuples**: Dùng destructuring để access tuple elements
3. **Use readonly tuples**: Dùng readonly tuples cho immutable data
4. **Document tuple structure**: Document rõ ràng về tuple structure
5. **Consider objects**: Consider dùng objects thay vì tuples cho complex data

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng tuple khi object phù hợp hơn
const user: [string, number, string] = ["John", 30, "john@example.com"];

// ✅ Nên: Dùng object
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = { name: "John", age: 30, email: "john@example.com" };

// ❌ Không nên: Mutate readonly tuples
const point: readonly [number, number] = [10, 20];
// point[0] = 15; // ❌ Error

// ✅ Nên: Tạo new tuple
const newPoint: [number, number] = [15, 20];
```

---

## Readonly array?

**Readonly array** - Array không thể được modified sau khi được tạo.

### Mục đích / Purpose

Readonly array được dùng để:

- Prevent array mutations
- Ensure immutability
- Document intent
- Create immutable data structures

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                  |
| -------------- | ----------------------------- |
| Immutable data | Khi data không nên thay đổi   |
| Configuration  | Khi config không nên modify   |
| Constants      | Khi array là constant         |
| API responses  | Khi response không nên modify |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Immutability**: Prevent unintended mutations
- **Type safety**: Catch mutations tại compile time
- **Documentation**: Rõ ràng về intent
- **Safer code**: Giảm bugs từ mutations

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm              |
| ------------- | ----------------------- |
| Immutability  | Không thể modify        |
| Type safety   | Verbose hơn             |
| Documentation | Cần understand readonly |
| Safer code    | Shallow readonly        |

### Ví dụ:

```typescript
// 1. Readonly array với readonly keyword
const numbers: readonly number[] = [1, 2, 3, 4, 5];
const strings: readonly string[] = ["a", "b", "c"];

// 2. Readonly array với ReadonlyArray<T>
const numbers2: ReadonlyArray<number> = [1, 2, 3, 4, 5];
const strings2: ReadonlyArray<string> = ["a", "b", "c"];

// 3. Readonly tuples
const point: readonly [number, number] = [10, 20];
const point2: Readonly<[number, number]> = [10, 20];

// 4. Readonly array methods
// numbers.push(6); // ❌ Error
// numbers.pop(); // ❌ Error
// numbers.shift(); // ❌ Error
// numbers.unshift(0); // ❌ Error
// numbers[0] = 10; // ❌ Error

const first = numbers[0]; // ✅ OK
const length = numbers.length; // ✅ OK
const mapped = numbers.map((n) => n * 2); // ✅ OK
const filtered = numbers.filter((n) => n > 2); // ✅ OK

// 5. Readonly array với as const
const numbers3 = [1, 2, 3] as const;
// numbers3: readonly [1, 2, 3]

// 6. Readonly utility type
interface User {
  id: number;
  name: string;
  email: string;
}

const users: Readonly<User[]> = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

// users.push({ id: 3, name: 'Bob', email: 'bob@example.com' }); // ❌ Error

// 7. Shallow readonly
interface Nested {
  id: number;
  data: {
    value: number;
  };
}

const nested: Readonly<Nested> = {
  id: 1,
  data: { value: 123 },
};

// nested.id = 2; // ❌ Error
nested.data.value = 456; // ✅ OK (shallow readonly)

// 8. Deep readonly (custom type)
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const deepNested: DeepReadonly<Nested> = {
  id: 1,
  data: { value: 123 },
};

// deepNested.id = 2; // ❌ Error
// deepNested.data.value = 456; // ❌ Error

// 9. Readonly array với generic functions
function firstElement<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement(numbers); // number | undefined

// 10. Readonly array với spread
const arr1 = [1, 2, 3] as const;
const arr2 = [4, 5, 6] as const;

const combined = [...arr1, ...arr2]; // readonly [1, 2, 3, 4, 5, 6]
```

### Best Practices:

1. **Use readonly arrays**: Dùng `readonly T[]` cho immutable arrays
2. **Use as const**: Dùng `as const` cho literal arrays
3. **Understand shallow readonly**: Hiểu rằng readonly là shallow
4. **Document intent**: Dùng readonly để document intent
5. **Prefer immutability**: Prefer immutable data structures

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Mutate readonly arrays
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4); // ❌ Error

// ✅ Nên: Tạo new array
const newNumbers = [...numbers, 4];

// ❌ Không nên: Dùng readonly khi mutation cần thiết
function processArray(arr: readonly number[]) {
  // arr.push(4); // ❌ Error
}

// ✅ Nên: Dùng mutable array khi cần mutation
function processArray(arr: number[]) {
  arr.push(4);
}
```

---

## Array methods với types?

**Array methods với types** - TypeScript type checks array methods.

### Mục đích / Purpose

TypeScript type checks array methods để:

- Ensure type safety
- Enable better IntelliSense
- Catch errors tại compile time
- Provide accurate return types

### Khi nào dùng / When to Use

| Method    | Use case                        |
| --------- | ------------------------------- |
| `map`     | Transform array elements        |
| `filter`  | Filter array elements           |
| `reduce`  | Reduce array to single value    |
| `find`    | Find element matching condition |
| `forEach` | Iterate over array              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Accurate types**: Return types chính xác
- **Safer code**: Giảm bugs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Type safety    | Verbose hơn          |
| Better DX      | Learning curve       |
| Accurate types | Cần understand types |
| Safer code     | Có thể overkill      |

### Ví dụ:

```typescript
// 1. map - Transform array elements
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2); // number[]
const strings = numbers.map((n) => n.toString()); // string[]
const lengths = strings.map((s) => s.length); // number[]

// 2. filter - Filter array elements
const evens = numbers.filter((n) => n % 2 === 0); // number[]
const greaterThanTwo = numbers.filter((n) => n > 2); // number[]

// 3. reduce - Reduce array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0); // number
const product = numbers.reduce((acc, n) => acc * n, 1); // number

// 4. find - Find element matching condition
const found = numbers.find((n) => n > 3); // number | undefined
const notFound = numbers.find((n) => n > 10); // undefined

// 5. findIndex - Find index of element
const index = numbers.findIndex((n) => n === 3); // number

// 6. some - Check if any element matches condition
const hasEven = numbers.some((n) => n % 2 === 0); // boolean
const hasNegative = numbers.some((n) => n < 0); // boolean

// 7. every - Check if all elements match condition
const allPositive = numbers.every((n) => n > 0); // boolean
const allEven = numbers.every((n) => n % 2 === 0); // boolean

// 8. forEach - Iterate over array
numbers.forEach((n) => console.log(n)); // void

// 9. includes - Check if array includes element
const includesThree = numbers.includes(3); // boolean
const includesTen = numbers.includes(10); // boolean

// 10. indexOf - Find index of element
const indexOfThree = numbers.indexOf(3); // number
const indexOfTen = numbers.indexOf(10); // -1

// 11. slice - Create subarray
const firstTwo = numbers.slice(0, 2); // number[]
const lastTwo = numbers.slice(-2); // number[]

// 12. splice - Modify array (mutable)
const mutableNumbers = [1, 2, 3, 4, 5];
const removed = mutableNumbers.splice(2, 1); // number[]
console.log(mutableNumbers); // [1, 2, 4, 5]

// 13. concat - Concatenate arrays
const moreNumbers = [6, 7, 8, 9, 10];
const allNumbers = numbers.concat(moreNumbers); // number[]
const allNumbers2 = [...numbers, ...moreNumbers]; // number[]

// 14. flat - Flatten nested arrays
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattened = nested.flat(); // number[]

// 15. flatMap - Map và flatten
const doubledNested = numbers.map((n) => [n, n * 2]); // number[][]
const doubledFlat = numbers.flatMap((n) => [n, n * 2]); // number[]

// 16. sort - Sort array (mutable)
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = unsorted.sort((a, b) => a - b); // number[]

// 17. reverse - Reverse array (mutable)
const reversed = numbers.slice().reverse(); // number[]

// 18. join - Join array elements to string
const joined = numbers.join(", "); // string

// 19. Array methods với object types
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
  { id: 3, name: "Bob", email: "bob@example.com" },
];

const names = users.map((u) => u.name); // string[]
const filteredUsers = users.filter((u) => u.id > 1); // User[]
const foundUser = users.find((u) => u.name === "Jane"); // User | undefined
const userIds = users.map((u) => u.id); // number[]

// 20. Array methods với generic types
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement(numbers); // number | undefined
const firstStr = firstElement(strings); // string | undefined
```

### Best Practices:

1. **Use immutable methods**: Dùng `map`, `filter`, `reduce` thay vì mutating methods
2. **Type inference**: Để TypeScript tự推断 return types
3. **Explicit types khi cần**: Khai báo types khi inference không rõ ràng
4. **Handle undefined**: Handle undefined cho `find`, `findIndex`, etc.
5. **Use readonly arrays**: Dùng `readonly T[]` cho immutable arrays

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không handle undefined
const found = numbers.find((n) => n > 10);
console.log(found.toFixed(2)); // ❌ Error: Object is possibly 'undefined'

// ✅ Nên: Handle undefined
const found = numbers.find((n) => n > 10);
if (found !== undefined) {
  console.log(found.toFixed(2));
}

// ❌ Không nên: Dùng mutating methods khi immutable methods phù hợp hơn
const mutableNumbers = [1, 2, 3];
mutableNumbers.push(4); // ❌ Mutates original array

// ✅ Nên: Dùng immutable methods
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4]; // Creates new array
```

---

## Best Practices cho Array & Tuple

### 1. Use `T[]` Syntax

Dùng `T[]` thay vì `Array<T>`:

```typescript
// ✅ Nên
const numbers: number[] = [1, 2, 3];

// ❌ Không nên
const numbers: Array<number> = [1, 2, 3];
```

### 2. Use Tuples cho Fixed-Length Data

Dùng tuples cho data có fixed-length:

```typescript
// ✅ Nên
type Coordinate = [number, number];
const point: Coordinate = [10, 20];
```

### 3. Use Readonly Arrays cho Immutable Data

Dùng `readonly T[]` cho immutable arrays:

```typescript
// ✅ Nên
const numbers: readonly number[] = [1, 2, 3];
```

### 4. Use Immutable Array Methods

Dùng `map`, `filter`, `reduce` thay vì mutating methods:

```typescript
// ✅ Nên
const doubled = numbers.map((n) => n * 2);
const filtered = numbers.filter((n) => n > 2);

// ❌ Không nên
numbers.push(4);
numbers.splice(0, 1);
```

### 5. Handle Undefined cho Find Methods

Handle undefined cho `find`, `findIndex`, etc.:

```typescript
// ✅ Nên
const found = numbers.find((n) => n > 10);
if (found !== undefined) {
  console.log(found);
}
```

---

## Anti-patterns cần tránh

### 1. Using Any cho Arrays

```typescript
// ❌ Không nên
const items: any[] = [1, "two", true];

// ✅ Nên
const items: (string | number)[] = [1, "two"];
```

### 2. Not Handling Undefined

```typescript
// ❌ Không nên
const found = numbers.find((n) => n > 10);
console.log(found.toFixed(2));

// ✅ Nên
const found = numbers.find((n) => n > 10);
if (found !== undefined) {
  console.log(found.toFixed(2));
}
```

### 3. Using Tuples khi Objects Phù hợp hơn

```typescript
// ❌ Không nên
const user: [string, number, string] = ["John", 30, "john@example.com"];

// ✅ Nên
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = { name: "John", age: 30, email: "john@example.com" };
```

---

_References:_

- [TypeScript Arrays](https://www.typescriptlang.org/docs/handbook/2/objects.html#arrays)
- [TypeScript Tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [TypeScript Readonly Arrays](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-modifier)
