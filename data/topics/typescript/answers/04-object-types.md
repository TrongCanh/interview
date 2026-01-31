# 4. Object Types

## Tổng quan về Object Types

### Mục đích của Object Types / Purpose

**Object Types** là các cách để định nghĩa cấu trúc của objects trong TypeScript, bao gồm interfaces và type aliases.

**Mục đích chính:**

- Định nghĩa shape của objects
- Type check object properties
- Enable better IntelliSense và refactoring
- Document object structures
- Ensure type safety khi làm việc với objects

### Khi nào cần hiểu về Object Types / When to Use

Hiểu về Object Types là cần thiết khi:

- Định nghĩa object shapes
- Làm việc với API responses
- Type check function parameters
- Create reusable types
- Work với complex data structures

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Self-documenting**: Code rõ ràng hơn
- **Safer Refactoring**: Refactor an toàn hơn
- **Reusable Types**: Types có thể reuse

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm      |
| ----------------- | --------------- |
| Type safety       | Verbose hơn     |
| Better DX         | Learning curve  |
| Self-documenting  | Cần hiểu types  |
| Safer refactoring | Có thể overkill |

---

## Interface vs Type alias?

**Interface vs Type alias** - Hai cách để định nghĩa object types trong TypeScript.

### Mục đích / Purpose

- **Interface**: Định nghĩa contract cho objects, classes, và functions
- **Type alias**: Định nghĩa alias cho bất kỳ type nào, bao gồm primitives, unions, tuples, etc.

### Khi nào dùng / When to Use

| Tình huống    | Interface       | Type alias                      |
| ------------- | --------------- | ------------------------------- |
| Object shapes | ✅ Nên dùng     | ✅ Có thể dùng                  |
| Extending     | ✅ Nên dùng     | ✅ Có thể dùng với intersection |
| Merging       | ✅ Có thể merge | ❌ Không thể merge              |
| Unions/Tuples | ❌ Không thể    | ✅ Nên dùng                     |
| Primitives    | ❌ Không thể    | ✅ Nên dùng                     |
| Functions     | ✅ Nên dùng     | ✅ Có thể dùng                  |

### Giúp ích gì / Benefits

**Lợi ích của Interface:**

- **Extending**: Dễ dàng extend interfaces
- **Merging**: Interface declarations được merge
- **Class implementation**: Classes có thể implement interfaces
- **Better error messages**: Error messages thường rõ ràng hơn

**Lợi ích của Type alias:**

- **Flexible**: Có thể alias bất kỳ type nào
- **Unions**: Dùng cho union types
- **Tuples**: Dùng cho tuple types
- **Computed properties**: Hỗ trợ computed property names

### Ưu nhược điểm / Pros & Cons

| Interface             | Type alias          |
| --------------------- | ------------------- |
| Extending             | Flexible            |
| Merging               | Unions              |
| Class implementation  | Tuples              |
| Better error messages | Computed properties |

### Ví dụ:

```typescript
// 1. Interface cơ bản
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// 2. Type alias cơ bản
type User2 = {
  id: number;
  name: string;
  email: string;
};

const user2: User2 = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// 3. Extending interface
interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "John",
  email: "john@example.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
};

// 4. Extending type alias (với intersection)
type Admin2 = User2 & {
  role: "admin";
  permissions: string[];
};

const admin2: Admin2 = {
  id: 1,
  name: "John",
  email: "john@example.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
};

// 5. Interface merging
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
  age?: number;
}

const mergedUser: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30,
};

// 6. Type alias với union
type Status = "pending" | "approved" | "rejected";

const status: Status = "pending";

// 7. Type alias với tuple
type Point = [number, number];

const point: Point = [10, 20];

// 8. Interface với methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

// 9. Type alias với function type
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

// 10. Interface với readonly properties
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  email: string;
}

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// readonlyUser.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property
readonlyUser.email = "new@example.com"; // ✅ OK

// 11. Type alias với computed properties
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface State {
  count: number;
  name: string;
}

type Handlers = EventHandlers<State>;
// Handlers = {
//   onCount: (value: number) => void;
//   onName: (value: string) => void;
// }
```

### Interface vs Type alias - So sánh:

```typescript
// Interface - Extending
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type alias - Extending với intersection
type Animal2 = {
  name: string;
};

type Dog2 = Animal2 & {
  breed: string;
};

// Interface - Merging
interface User {
  id: number;
}

interface User {
  name: string;
}

const user: User = {
  id: 1,
  name: "John",
};

// Type alias - Không thể merge
type User2 = {
  id: number;
};

// type User2 = {  // ❌ Error: Duplicate identifier 'User2'
//   name: string;
// };

// Type alias - Union types
type Value = string | number | boolean;

const value: Value = "hello";

// Type alias - Tuple types
type Tuple = [string, number, boolean];

const tuple: Tuple = ["hello", 123, true];

// Type alias - Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>; // Result: string
```

### Best Practices:

1. **Use interface cho objects**: Dùng interface cho object shapes khi có thể
2. **Use type alias cho unions/tuples**: Dùng type alias cho union và tuple types
3. **Prefer interface extending**: Dùng `extends` cho interface thay vì intersection
4. **Leverage interface merging**: Dùng interface merging khi cần
5. **Consistent convention**: Giữ consistent convention trong project

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng type alias cho object shapes khi interface phù hợp hơn
type User = {
  id: number;
  name: string;
};

// ✅ Nên: Dùng interface cho object shapes
interface User {
  id: number;
  name: string;
}

// ❌ Không nên: Dùng intersection thay vì extends cho interface
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

// ✅ Nên: Dùng extends cho interface
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

---

## Optional properties (`?`)?

**Optional properties** - Properties có thể có hoặc không trong object.

### Mục đích / Purpose

Optional properties được dùng để:

- Định nghĩa properties có thể không tồn tại
- Handle partial objects
- Support optional parameters
- Create flexible object types

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                              |
| --------------------- | ----------------------------------------- |
| Partial updates       | Khi update một phần của object            |
| Optional parameters   | Khi parameter có thể không được cung cấp  |
| API responses         | Khi API có thể không return tất cả fields |
| Configuration objects | Khi config có nhiều optional options      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Objects có thể có hoặc không có properties
- **Type safety**: TypeScript vẫn type check optional properties
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Partial updates**: Dễ dàng update một phần của object

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm       |
| ----------- | ---------------- |
| Flexibility | Cần null checks  |
| Type safety | Verbose hơn      |
| Better DX   | Có thể confusing |

### Ví dụ:

```typescript
// 1. Optional properties với ?
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  phone?: string; // Optional
}

const user1: User = {
  id: 1,
  name: "John",
  // email và phone không cần
};

const user2: User = {
  id: 2,
  name: "Jane",
  email: "jane@example.com",
  // phone không cần
};

// 2. Accessing optional properties
function getEmail(user: User): string {
  // Cần check trước khi dùng
  if (user.email) {
    return user.email;
  }
  return "No email";
}

// 3. Optional chaining với optional properties
function getPhone(user: User): string | undefined {
  return user.phone; // string | undefined
}

// 4. Default values cho optional properties
function getUserEmail(user: User): string {
  return user.email ?? "No email";
}

// 5. Optional properties trong function parameters
function updateUser(id: number, updates: Partial<User>) {
  // Partial<User> làm cho tất cả properties thành optional
  // ...
}

updateUser(1, { name: "John" }); // ✅ OK
updateUser(1, { email: "john@example.com" }); // ✅ OK

// 6. Optional properties với null
interface User2 {
  id: number;
  name: string;
  email: string | null; // Có thể là null
}

const user3: User2 = {
  id: 1,
  name: "John",
  email: null,
};

// 7. Optional properties với undefined
interface User3 {
  id: number;
  name: string;
  email?: string; // string | undefined
}

const user4: User3 = {
  id: 1,
  name: "John",
  // email: undefined
};

// 8. Destructuring với optional properties
function getUserInfo({ id, name, email }: User): string {
  return `${name} (ID: ${id})${email ? ` - ${email}` : ""}`;
}

// 9. Optional properties trong mapped types
type PartialUser = Partial<User>;
// PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
//   phone?: string;
// }

// 10. Required properties từ optional
type RequiredUser = Required<User>;
// RequiredUser = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
// }
```

### Best Practices:

1. **Use optional properties**: Dùng `?` cho properties có thể không tồn tại
2. **Handle undefined**: Luôn handle undefined khi dùng optional properties
3. **Use optional chaining**: Dùng `?.` để safely access optional properties
4. **Use nullish coalescing**: Dùng `??` cho default values
5. **Consider Partial utility**: Dùng `Partial<T>` cho partial updates

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không handle undefined
function getEmail(user: User) {
  return user.email.toUpperCase(); // ❌ Error: Object is possibly 'undefined'
}

// ✅ Nên: Handle undefined
function getEmail(user: User) {
  return user.email?.toUpperCase() ?? "No email";
}

// ❌ Không nên: Dùng null thay vì optional
interface User {
  id: number;
  name: string;
  email: string | null; // Không nên dùng null cho optional
}

// ✅ Nên: Dùng optional
interface User {
  id: number;
  name: string;
  email?: string; // string | undefined
}
```

---

## Readonly properties?

**Readonly properties** - Properties không thể được reassigned sau khi được khởi tạo.

### Mục đích / Purpose

Readonly properties được dùng để:

- Prevent mutations
- Ensure immutability
- Document intent
- Create immutable data structures

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                              |
| -------------- | ----------------------------------------- |
| Immutable data | Khi data không nên thay đổi               |
| Configuration  | Khi config không nên thay đổi sau khi set |
| Constants      | Khi value là constant                     |
| API responses  | Khi response không nên modify             |

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
// 1. Readonly properties
interface User {
  readonly id: number;
  readonly name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

user.email = "new@example.com"; // ✅ OK
// user.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property
// user.name = 'Jane'; // ❌ Error: Cannot assign to 'name' because it is a read-only property

// 2. Readonly type alias
type ReadonlyUser = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
};

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// readonlyUser.id = 2; // ❌ Error

// 3. Readonly utility type
interface User2 {
  id: number;
  name: string;
  email: string;
}

const user2: Readonly<User2> = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// user2.id = 2; // ❌ Error

// 4. Readonly arrays
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
// numbers[0] = 10; // ❌ Error: Index signature in type 'readonly number[]' only permits reading

const first = numbers[0]; // ✅ OK

// 5. Readonly tuples
type Point = readonly [number, number];

const point: Point = [10, 20];
// point[0] = 15; // ❌ Error

// 6. Readonly trong classes
class Circle {
  readonly radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(10);
// circle.radius = 15; // ❌ Error

// 7. Readonly với methods
interface Config {
  readonly apiEndpoint: string;
  readonly timeout: number;
  getTimeout(): number;
}

const config: Config = {
  apiEndpoint: "https://api.example.com",
  timeout: 5000,
  getTimeout() {
    return this.timeout;
  },
};

// 8. Readonly với optional properties
interface User3 {
  readonly id: number;
  readonly name: string;
  readonly email?: string;
}

const user3: User3 = {
  id: 1,
  name: "John",
  // email: undefined
};

// 9. Shallow readonly
interface Nested {
  readonly id: number;
  readonly data: {
    value: number;
  };
}

const nested: Nested = {
  id: 1,
  data: { value: 123 },
};

// nested.id = 2; // ❌ Error
nested.data.value = 456; // ✅ OK (shallow readonly)

// 10. Deep readonly (custom type)
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface DeepNested {
  id: number;
  data: {
    value: number;
  };
}

const deepNested: DeepReadonly<DeepNested> = {
  id: 1,
  data: { value: 123 },
};

// deepNested.id = 2; // ❌ Error
// deepNested.data.value = 456; // ❌ Error
```

### Best Practices:

1. **Use readonly cho immutable data**: Dùng `readonly` cho data không nên thay đổi
2. **Use Readonly utility**: Dùng `Readonly<T>` để làm tất cả properties readonly
3. **Understand shallow readonly**: Hiểu rằng `readonly` là shallow
4. **Document intent**: Dùng `readonly` để document intent
5. **Prefer const**: Dùng `const` cho variables thay vì readonly properties

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Mutate readonly properties
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "John" };
user.id = 2; // ❌ Error

// ✅ Nên: Tạo new object nếu cần thay đổi
const updatedUser: User = { ...user, id: 2 };

// ❌ Không nên: Dùng readonly cho mutable data
interface Counter {
  readonly count: number;
}

const counter: Counter = { count: 0 };
// counter.count++; // ❌ Error

// ✅ Nên: Không dùng readonly cho mutable data
interface Counter {
  count: number;
}
```

---

## Index signatures?

**Index signatures** - Định nghĩa type cho properties với dynamic keys.

### Mục đích / Purpose

Index signatures được dùng để:

- Định nghĩa objects với dynamic keys
- Type check dictionary-like objects
- Handle API responses với dynamic fields
- Create flexible object types

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                  |
| --------------------- | ----------------------------- |
| Dictionary objects    | Khi object có dynamic keys    |
| API responses         | Khi API return dynamic fields |
| Configuration objects | Khi config có dynamic options |
| Cache objects         | Khi cache có dynamic keys     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Hỗ trợ dynamic keys
- **Type safety**: Type check values của dynamic properties
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về object structure

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                      |
| ------------- | ------------------------------- |
| Flexibility   | Cần specific type cho keys      |
| Type safety   | Verbose hơn                     |
| Better DX     | Cần understand index signatures |
| Documentation | Có thể overkill                 |

### Ví dụ:

```typescript
// 1. Index signature cơ bản
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  name: "John",
  email: "john@example.com",
  phone: "123-456-7890",
};

console.log(dictionary.name); // 'John'
console.log(dictionary["email"]); // 'john@example.com'

// 2. Index signature với number keys
interface NumberDictionary {
  [key: number]: string;
}

const numberDict: NumberDictionary = {
  1: "one",
  2: "two",
  3: "three",
};

console.log(numberDict[1]); // 'one'

// 3. Index signature với union types
interface MixedDictionary {
  [key: string]: string | number;
}

const mixedDict: MixedDictionary = {
  name: "John",
  age: 30,
  email: "john@example.com",
};

console.log(mixedDict.name); // 'John'
console.log(mixedDict.age); // 30

// 4. Index signature với readonly
interface ReadonlyDictionary {
  readonly [key: string]: string;
}

const readonlyDict: ReadonlyDictionary = {
  name: "John",
  email: "john@example.com",
};

// readonlyDict.name = 'Jane'; // ❌ Error

// 5. Index signature với optional properties
interface User {
  id: number;
  name: string;
  [key: string]: any; // Additional properties
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com", // ✅ OK
  age: 30, // ✅ OK
};

// 6. Index signature với specific types
interface ApiResponse {
  status: number;
  message: string;
  data: {
    [key: string]: unknown;
  };
}

const response: ApiResponse = {
  status: 200,
  message: "Success",
  data: {
    name: "John",
    age: 30,
    active: true,
  },
};

// 7. Record utility type (cách tốt hơn cho index signatures)
type RecordType = Record<string, string>;

const record: RecordType = {
  name: "John",
  email: "john@example.com",
};

// 8. Index signature với template literal types
type EventHandlers = {
  [K in `on${string}`]: (event: Event) => void;
};

const handlers: EventHandlers = {
  onClick: (e) => console.log("Clicked", e),
  onSubmit: (e) => console.log("Submitted", e),
};

// 9. Index signature với symbol keys
interface SymbolDictionary {
  [key: symbol]: string;
}

const sym = Symbol("description");
const symbolDict: SymbolDictionary = {
  [sym]: "value",
};

console.log(symbolDict[sym]); // 'value'

// 10. Index signature với mapped types
type ReadonlyDictionary<T> = {
  readonly [K in keyof T]: T[K];
};

interface User2 {
  name: string;
  email: string;
}

const readonlyUser: ReadonlyDictionary<User2> = {
  name: "John",
  email: "john@example.com",
};

// readonlyUser.name = 'Jane'; // ❌ Error
```

### Best Practices:

1. **Use Record utility**: Dùng `Record<K, T>` thay vì index signatures khi có thể
2. **Specific key types**: Dùng specific types cho keys thay vì `string`
3. **Avoid any**: Hạn chế dùng `any` cho values
4. **Consider Map**: Dùng `Map` cho key-value pairs với non-string keys
5. **Document dynamic keys**: Document rõ ràng về dynamic keys

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any cho values
interface Dictionary {
  [key: string]: any;
}

// ✅ Nên: Dùng specific types
interface Dictionary {
  [key: string]: string | number;
}

// ❌ Không nên: Dùng index signatures khi Record phù hợp hơn
interface User {
  [key: string]: string;
}

// ✅ Nên: Dùng Record
type User = Record<string, string>;

// ❌ Không nên: Dùng index signatures cho known properties
interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any; // Không cần
}

// ✅ Nên: Dùng interface với optional properties
interface User {
  id: number;
  name: string;
  email?: string;
  age?: number;
}
```

---

## Mapped types?

**Mapped types** - Tạo mới types từ existing types bằng cách transform properties.

### Mục đích / Purpose

Mapped types được dùng để:

- Transform existing types
- Create utility types
- Make all properties optional/readonly
- Create partial/required types

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng                     |
| --------------- | -------------------------------- |
| Utility types   | Khi tạo utility types            |
| Transform types | Khi cần transform existing types |
| Partial updates | Khi cần partial types            |
| Readonly types  | Khi cần readonly types           |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusable**: Types có thể reuse
- **Flexible**: Transform types theo nhu cầu
- **Type-safe**: Maintain type safety
- **DRY**: Don't Repeat Yourself

### Ưu nhược điểm / Pros & Cons

| Ưu điểm   | Nhược điểm                  |
| --------- | --------------------------- |
| Reusable  | Learning curve              |
| Flexible  | Verbose hơn                 |
| Type-safe | Cần understand mapped types |
| DRY       | Có thể complex              |

### Ví dụ:

```typescript
// 1. Mapped type cơ bản
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

// 2. Partial mapped type
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>;
// PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
// }

// 3. Required mapped type
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface User2 {
  id: number;
  name: string;
  email?: string;
}

type RequiredUser = Required<User2>;
// RequiredUser = {
//   id: number;
//   name: string;
//   email: string;
// }

// 4. Mapped type với modifier removal/addition
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type ReadonlyMutable = Mutable<ReadonlyUser>;
// ReadonlyMutable = {
//   id: number;
//   name: string;
//   email: string;
// }

// 5. Mapped type với key transformation
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// UserGetters = {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// 6. Mapped type với value transformation
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringifiedUser = Stringify<User>;
// StringifiedUser = {
//   id: string;
//   name: string;
//   email: string;
// }

// 7. Mapped type với conditional types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// NullableUser = {
//   id: number | null;
//   name: string | null;
//   email: string | null;
// }

// 8. Mapped type với template literal types
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface State {
  count: number;
  name: string;
}

type Handlers = EventHandlers<State>;
// Handlers = {
//   onCount: (value: number) => void;
//   onName: (value: string) => void;
// }

// 9. Mapped type với key filtering
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
  id: number;
  name: string;
  email: string;
  age: number;
}

type StringProps = OnlyStrings<Mixed>;
// StringProps = {
//   name: string;
//   email: string;
// }

// 10. Mapped type với Pick/Omit
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserBasic = Pick<User, "id" | "name">;
// UserBasic = {
//   id: number;
//   name: string;
// }

type UserWithoutEmail = Omit<User, "email">;
// UserWithoutEmail = {
//   id: number;
//   name: string;
// }
```

### Best Practices:

1. **Use built-in utility types**: Dùng `Partial<T>`, `Required<T>`, `Readonly<T>`, etc.
2. **Create reusable mapped types**: Tạo mapped types reusable
3. **Use key transformation**: Dùng key transformation khi cần
4. **Filter keys**: Dùng conditional types để filter keys
5. **Document mapped types**: Document rõ ràng về mapped types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Tạo mapped types phức tạp khi không cần
type ComplexMapped<T> = {
  [K in keyof T as T[K] extends string
    ? `get${Capitalize<string & K>}`
    : never]: T[K] extends (...args: any[]) => any ? never : () => T[K];
};

// ✅ Nên: Giữ mapped types đơn giản và readable
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ❌ Không nên: Dùng mapped types khi interface phù hợp hơn
type User = {
  [K in "id" | "name" | "email"]: string | number;
};

// ✅ Nên: Dùng interface
interface User {
  id: number;
  name: string;
  email: string;
}
```

---

## Best Practices cho Object Types

### 1. Use Interface cho Object Shapes

Dùng interface cho object shapes khi có thể:

```typescript
// ✅ Nên
interface User {
  id: number;
  name: string;
  email: string;
}
```

### 2. Use Type Alias cho Unions/Tuples

Dùng type alias cho union và tuple types:

```typescript
// ✅ Nên
type Status = "pending" | "approved" | "rejected";
type Point = [number, number];
```

### 3. Use Optional Properties

Dùng optional properties cho properties có thể không tồn tại:

```typescript
// ✅ Nên
interface User {
  id: number;
  name: string;
  email?: string;
}
```

### 4. Use Readonly cho Immutable Data

Dùng readonly cho data không nên thay đổi:

```typescript
// ✅ Nên
interface Config {
  readonly apiEndpoint: string;
  readonly timeout: number;
}
```

### 5. Use Record Utility

Dùng `Record<K, T>` thay vì index signatures:

```typescript
// ✅ Nên
type Dictionary = Record<string, string>;
```

---

## Anti-patterns cần tránh

### 1. Using Type Alias cho Object Shapes khi Interface Phù hợp hơn

```typescript
// ❌ Không nên
type User = {
  id: number;
  name: string;
};

// ✅ Nên
interface User {
  id: number;
  name: string;
}
```

### 2. Not Handling Undefined

```typescript
// ❌ Không nên
function getEmail(user: User) {
  return user.email.toUpperCase();
}

// ✅ Nên
function getEmail(user: User) {
  return user.email?.toUpperCase() ?? "No email";
}
```

---

_References:_

- [TypeScript Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/interfaces.html)
- [TypeScript Type Manipulation](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
