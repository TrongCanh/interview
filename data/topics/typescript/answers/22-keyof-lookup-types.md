# 22. Keyof & Lookup Types

## Tổng quan về Keyof & Lookup Types

### Mục đích của Keyof & Lookup Types / Purpose

**`keyof` operator** lấy union type của tất cả keys của một type. **Lookup Types** dùng kết quả của `keyof` để access value types.

**Mục đích chính:**

- Lấy tất cả keys của một type
- Access value types bằng keys
- Create type-safe property access
- Build dynamic type-safe APIs
- Implement type-safe getters/setters

### Khi nào cần hiểu về Keyof & Lookup Types / When to Use

Hiểu về Keyof & Lookup Types là cần thiết khi:

- Xây dựng type-safe APIs
- Implement dynamic property access
- Create generic utilities
- Build type-safe object manipulation
- Implement getter/setter patterns

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type-safe Property Access**: Access properties type-safe
- **Dynamic Types**: Create dynamic types
- **Generic Utilities**: Build generic type utilities
- **Compile-time Checking**: TypeScript kiểm tra tại compile-time
- **Better DX**: IntelliSense hoạt động tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm             |
| --------------------------- | ---------------------- |
| - Type-safe property access | Learning curve         |
| - Dynamic types             | Có thể phức tạp        |
| - Generic utilities         | Debugging khó          |
| - Compile-time checking     | Performance impact nhỏ |

---

## `keyof` operator?

**`keyof` operator** - Lấy union type của tất cả keys của một type.

### Mục đích / Purpose

Lấy tất cả keys của một type dưới dạng union type.

### Khi nào dùng / When to Use

| Tình huống                  | Khi nào dùng                     |
| --------------------------- | -------------------------------- |
| - Get all keys              | Khi cần tất cả keys của type     |
| - Type-safe property access | Khi access properties type-safe  |
| - Generic utilities         | Khi build generic type utilities |
| - Dynamic APIs              | Khi build dynamic type-safe APIs |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Get All Keys**: Lấy tất cả keys của type
- **Type-safe Access**: Access properties type-safe
- **Generic Utilities**: Build generic type utilities
- **Compile-time Checking**: TypeScript kiểm tra tại compile-time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Get all keys          | Learning curve         |
| - Type-safe access      | Có thể phức tạp        |
| - Generic utilities     | Debugging khó          |
| - Compile-time checking | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: keyof với object
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
// "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getProperty(user, "id"); // Type: number
const name = getProperty(user, "name"); // Type: string

// ❌ Error: Argument of type '"age"' is not assignable
// const age = getProperty(user, "age");

// Ví dụ: keyof với class
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonKeys = keyof Person;
// "name" | "age"

// Ví dụ: keyof với array
type ArrayKeys = keyof any[];
// "length" | "push" | "pop" | "concat" | ...

// Ví dụ: keyof với function
type FunctionKeys = keyof () => void;
// "length" | "name" | "prototype" | "apply" | "call" | "bind"

// Ví dụ thực tế: Type-safe object access
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setValue<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

const url = getValue(config, "apiUrl"); // Type: string
const timeout = getValue(config, "timeout"); // Type: number

setValue(config, "timeout", 10000); // ✅ OK
// setValue(config, "unknown", 100); // ❌ Error

// Ví dụ thực tế: Pick utility
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserBasicInfo = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Ví dụ thực tế: Omit utility
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; }

// Ví dụ thực tế: Partial utility
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
```

### Best Practices:

```typescript
// ✅ Dùng keyof để lấy tất cả keys
type UserKeys = keyof User;

// ✅ Dùng keyof với generic utilities
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ✅ Dùng keyof để type-safe property access
const value = obj[key as keyof typeof obj];

// ✅ Dùng keyof với mapped types
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// ❌ Không nên dùng keyof với non-object types
type BadExample = keyof string; // ❌ Error: Type 'string' has no properties

// ✅ Nên dùng keyof với object types
type GoodExample = keyof { a: string; b: number }; // "a" | "b"

// ✅ Dùng keyof với conditional types
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface User {
  id: number;
  name: string;
  email: string;
}

type UserStringKeys = StringKeys<User>;
// "name" | "email"
```

---

## Lookup types?

**Lookup types** - Dùng kết quả của `keyof` để access value types.

### Mục đích / Purpose

Access value types bằng keys sử dụng `keyof` operator.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                     |
| ------------------- | -------------------------------- |
| - Get value type    | Khi cần type của property        |
| - Type-safe access  | Khi access properties type-safe  |
| - Generic utilities | Khi build generic type utilities |
| - Dynamic APIs      | Khi build dynamic type-safe APIs |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Get Value Type**: Lấy type của property
- **Type-safe Access**: Access properties type-safe
- **Generic Utilities**: Build generic type utilities
- **Compile-time Checking**: TypeScript kiểm tra tại compile-time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Get value type        | Learning curve         |
| - Type-safe access      | Có thể phức tạp        |
| - Generic utilities     | Debugging khó          |
| - Compile-time checking | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Lookup type
interface User {
  id: number;
  name: string;
  email: string;
}

type IdType = User["id"]; // number
type NameType = User["name"]; // string
type EmailType = User["email"]; // string

// Ví dụ: Lookup type với union keys
type IdOrNameType = User["id" | "name"]; // number | string

// Ví dụ: Lookup type với keyof
type AllValueTypes = User[keyof User]; // number | string

// Ví dụ thực tế: Type-safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setValue<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getProperty(user, "id"); // Type: number
const name = getProperty(user, "name"); // Type: string

setValue(user, "id", 2); // ✅ OK
// setValue(user, "id", "not a number"); // ❌ Error

// Ví dụ thực tế: Generic getter/setter
class Store<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.data[key] = value;
  }
}

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const configStore = new Store<Config>({
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
});

const url = configStore.get("apiUrl"); // Type: string
configStore.set("timeout", 10000); // ✅ OK
// configStore.set("timeout", "not a number"); // ❌ Error

// Ví dụ thực tế: Type-safe event handler
type EventHandler<T> = {
  [K in keyof T]?: (value: T[K]) => void;
};

interface State {
  count: number;
  name: string;
  loading: boolean;
}

const handlers: EventHandler<State> = {
  count: (value) => console.log("Count:", value),
  name: (value) => console.log("Name:", value),
};

handlers.count?.(10); // ✅ OK
// handlers.age?.(10); // ❌ Error: Property 'age' does not exist

// Ví dụ thực tế: Type-safe object merge
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

interface User {
  id: number;
  name: string;
}

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

const merged = mergeObjects<User, Timestamp>(
  { id: 1, name: "Alice" },
  { createdAt: new Date(), updatedAt: new Date() },
);
// Type: User & Timestamp

console.log(merged.id); // Type: number
console.log(merged.createdAt); // Type: Date
```

### Best Practices:

```typescript
// ✅ Dùng lookup types để lấy value types
type IdType = User["id"]; // number

// ✅ Dùng lookup types với generic utilities
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ✅ Dùng lookup types với conditional types
type ValueType<T, K extends keyof T> = T[K];

// ✅ Dùng lookup types với mapped types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ❌ Không nên dùng lookup types với invalid keys
type BadExample = User["invalidKey"]; // ❌ Error: Property 'invalidKey' does not exist

// ✅ Nên dùng keyof để get valid keys
type GoodExample = User[keyof User]; // number | string

// ✅ Dùng lookup types với union keys
type IdOrNameType = User["id" | "name"]; // number | string

// ✅ Dùng lookup types với conditional types
type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];
```

---

## `keyof` với generics?

**`keyof` với generics** - Dùng `keyof` với generic type parameters.

### Mục đích / Purpose

Lấy keys của generic type parameters.

### Khi nào dùng / When to Use

| Tình huống                | Khi nào dùng                     |
| ------------------------- | -------------------------------- |
| - Generic utilities       | Khi build generic type utilities |
| - Type-safe APIs          | Khi build type-safe APIs         |
| - Dynamic property access | Khi access properties type-safe  |
| - Generic constraints     | Khi constrain generic types      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Generic Utilities**: Build generic type utilities
- **Type-safe APIs**: Build type-safe APIs
- **Dynamic Access**: Access properties type-safe
- **Compile-time Checking**: TypeScript kiểm tra tại compile-time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Generic utilities     | Learning curve         |
| - Type-safe APIs        | Có thể phức tạp        |
| - Dynamic access        | Debugging khó          |
| - Compile-time checking | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: keyof với generic
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setValue<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const user = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getProperty(user, "id"); // Type: number
const name = getProperty(user, "name"); // Type: string

// Ví dụ: Generic Pick utility
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type UserBasicInfo = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Ví dụ: Generic Omit utility
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; }

// Ví dụ: Generic Partial utility
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Ví dụ thực tế: Type-safe object access
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function hasKey<T, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & Record<K, T[K]> {
  return key in obj;
}

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

if (hasKey(config, "apiUrl")) {
  const url = getValue(config, "apiUrl"); // Type: string
}

// Ví dụ thực tế: Type-safe object update
function updateObject<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

const updatedConfig = updateObject(config, "timeout", 10000);
// Type: { apiUrl: string; timeout: number; retries: number; }

// Ví dụ thực tế: Generic class with keyof
class Store<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.data[key] = value;
  }

  update<K extends keyof T>(key: K, value: T[K]): Store<T> {
    return new Store({ ...this.data, [key]: value });
  }
}

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const configStore = new Store<Config>({
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
});

const url = configStore.get("apiUrl"); // Type: string
const updatedStore = configStore.update("timeout", 10000);
```

### Best Practices:

```typescript
// ✅ Dùng keyof với generic type parameters
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ✅ Dùng keyof với generic utilities
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// ✅ Dùng keyof với generic classes
class Store<T> {
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }
}

// ✅ Dùng keyof với conditional types
type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];

// ❌ Không nên dùng keyof với unconstrained generics
function badExample<T>(obj: T, key: keyof T) {
  return obj[key]; // ❌ key có thể không tồn tại trong T
}

// ✅ Nên constrain generics với keyof
function goodExample<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // ✅ key được đảm bảo tồn tại trong T
}
```

---

## `keyof` với mapped types?

**`keyof` với mapped types** - Dùng `keyof` trong mapped types để transform types.

### Mục đích / Purpose

Transform types sử dụng `keyof` trong mapped types.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng             |
| ----------------- | ------------------------ |
| - Type utilities  | Khi build type utilities |
| - Transform types | Khi transform types      |
| - Filter keys     | Khi filter keys          |
| - Type-safe APIs  | Khi build type-safe APIs |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Utilities**: Build type utilities
- **Transform Types**: Transform types
- **Filter Keys**: Filter keys
- **Type-safe APIs**: Build type-safe APIs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm             |
| ----------------- | ---------------------- |
| - Type utilities  | Learning curve         |
| - Transform types | Có thể phức tạp        |
| - Filter keys     | Debugging khó          |
| - Type-safe APIs  | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: keyof trong mapped types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

// Ví dụ: Partial utility
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Ví dụ: Required utility
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// { id: number; name: string; email: string; }

// Ví dụ: Filter string keys
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserStringKeys = StringKeys<User>;
// "name" | "email"

// Ví dụ: Filter number keys
type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type UserNumberKeys = NumberKeys<User>;
// "id" | "age"

// Ví dụ thực tế: Get only function properties
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface User {
  id: number;
  name: string;
  greet(): void;
  update(): void;
}

type UserFunctionKeys = FunctionKeys<User>;
// "greet" | "update"

// Ví dụ thực tế: Get only non-function properties
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type UserNonFunctionKeys = NonFunctionKeys<User>;
// "id" | "name"

// Ví dụ thực tế: Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }

// Ví dụ thực tế: Make all properties optional
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
  apiUrl: string;
  timeout: number;
  database: {
    host: string;
    port: number;
  };
}

type PartialConfig = DeepPartial<Config>;
// {
//   apiUrl?: string;
//   timeout?: number;
//   database?: {
//     host?: string;
//     port?: number;
//   };
// }
```

### Best Practices:

```typescript
// ✅ Dùng keyof trong mapped types để transform types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ✅ Dùng keyof trong mapped types để filter keys
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

// ✅ Dùng keyof trong mapped types để create utilities
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// ✅ Dùng keyof trong mapped types với conditional types
type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];

// ❌ Không nên dùng keyof trong mapped types với unconstrained generics
type BadExample<T> = {
  [K in keyof T]: T[K];
}; // ❌ K có thể không được infer

// ✅ Nên constrain generics với keyof
type GoodExample<T extends object> = {
  [K in keyof T]: T[K];
}; // ✅ K được infer từ keyof T
```

---

## Tổng kết

### Bảng so sánh Keyof & Lookup Types

| Feature       | Cú pháp             | Use Case                    |
| ------------- | ------------------- | --------------------------- |
| `keyof T`     | `keyof T`           | Lấy tất cả keys của type T  |
| Lookup type   | `T[K]`              | Lấy type của property K     |
| Generic keyof | `K extends keyof T` | Constrain generic với keyof |
| Mapped keyof  | `[K in keyof T]`    | Transform types             |

### Khi nào nên dùng Keyof & Lookup Types

| Tình huống        | Nên dùng            |
| ----------------- | ------------------- |
| Get all keys      | `keyof T`           |
| Get value type    | `T[K]`              |
| Generic utilities | `K extends keyof T` |
| Transform types   | `[K in keyof T]`    |

### Best Practices chung cho Keyof & Lookup Types

1. **Dùng keyof để get keys**: Lấy tất cả keys của type
2. **Dùng lookup types để get value types**: Access value types bằng keys
3. **Constrain generics với keyof**: Constrain generic type parameters
4. **Dùng mapped types với keyof**: Transform types
5. **Type-safe property access**: Access properties type-safe

### Anti-patterns cần tránh

```typescript
// ❌ Dùng keyof với non-object types
type BadExample = keyof string; // ❌ Error

// ✅ Nên dùng keyof với object types
type GoodExample = keyof { a: string; b: number }; // "a" | "b"

// ❌ Dùng lookup types với invalid keys
type BadExample2 = User["invalidKey"]; // ❌ Error

// ✅ Nên dùng keyof để get valid keys
type GoodExample2 = User[keyof User]; // number | string

// ❌ Dùng keyof với unconstrained generics
function badExample<T>(obj: T, key: keyof T) {
  return obj[key]; // ❌ key có thể không tồn tại
}

// ✅ Nên constrain generics với keyof
function goodExample<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // ✅ key được đảm bảo tồn tại
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [TypeScript Handbook - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Deep Dive - Keyof](https://basarat.gitbook.io/typescript/type-system/keyof)

---

_Last updated: 2026-01-30_
