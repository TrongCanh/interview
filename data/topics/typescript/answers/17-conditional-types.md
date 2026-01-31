# 17. Conditional Types

## Tổng quan về Conditional Types

### Mục đích của Conditional Types / Purpose

**Conditional Types** là types có thể chọn một trong hai types dựa trên một condition, tương tự như conditional statements trong JavaScript (`condition ? true : false`).

**Mục đích chính:**

- Tạo types dựa trên conditions
- Implement complex type logic
- Build generic type transformations
- Create type-level programming

### Khi nào cần hiểu về Conditional Types / When to Use

Hiểu về Conditional Types là cần thiết khi:

- Xây dựng advanced type utilities
- Implement generic libraries
- Tạo type transformations phức tạp
- Xử lý type-level logic
- Build type-safe APIs

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type-level Logic**: Express logic tại type level
- **Flexibility**: Tạo dynamic types
- **Reusability**: Dùng lại type logic
- **Type Safety**: TypeScript kiểm tra types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                         |
| ------------------ | ---------------------------------- |
| - Type-level logic | Learning curve cao                 |
| - Flexible         | Có thể phức tạp                    |
| - Reusable         | Debugging khó                      |
| - Type-safe        | Performance impact nhỏ khi compile |

---

## Conditional types là gì?

**Conditional Types** - Types có thể chọn một trong hai types dựa trên một condition, sử dụng cú pháp `T extends U ? X : Y`.

### Mục đích / Purpose

Tạo types có thể thay đổi dựa trên conditions, cho phép type-level programming.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                |
| ---------------------- | --------------------------- |
| - Type transformations | Khi cần transform types     |
| - Generic constraints  | Khi cần conditional logic   |
| - Type utilities       | Khi xây dựng type utilities |
| - API design           | Khi cần type-safe APIs      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Dynamic Types**: Types thay đổi dựa trên conditions
- **Type-level Programming**: Logic tại type level
- **Expressive**: Express complex type relationships
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| - Dynamic types    | Learning curve         |
| - Type-level logic | Có thể phức tạp        |
| - Expressive       | Debugging khó          |
| - Flexible         | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// Ví dụ: Conditional type với union types
type NonNullable<T> = T extends null | undefined ? never : T;

type Test3 = NonNullable<string | null>; // string
type Test4 = NonNullable<number | undefined>; // number

// Ví dụ: Conditional type với generics
type TypeName<T> = T extends string
  ? "string"
  : T extends number
    ? "number"
    : T extends boolean
      ? "boolean"
      : T extends undefined
        ? "undefined"
        : T extends Function
          ? "function"
          : "object";

type Test5 = TypeName<string>; // "string"
type Test6 = TypeName<number>; // "number"
type Test7 = TypeName<boolean>; // "boolean"
type Test8 = TypeName<undefined>; // "undefined"
type Test9 = TypeName<() => void>; // "function"
type Test10 = TypeName<object>; // "object"

// Ví dụ thực tế: Flatten array type
type Flatten<T> = T extends (infer U)[] ? U : T;

type Test11 = Flatten<number[]>; // number
type Test12 = Flatten<string>; // string

// Ví dụ: Get return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Test13 = ReturnType<() => string>; // string
type Test14 = ReturnType<(x: number) => boolean>; // boolean

// Ví dụ: Get first parameter type
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type Test15 = FirstParameter<(x: string, y: number) => void>; // string

// Ví dụ: Conditional type với interfaces
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  permissions: string[];
}

type GetPermissions<T> = T extends { permissions: infer P } ? P : never;

type Test16 = GetPermissions<User>; // never
type Test17 = GetPermissions<Admin>; // string[]

// Ví dụ: Conditional type với discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

type GetData<T> = T extends { status: "success" } ? T["data"] : never;

type Test18 = GetData<Success<string>>; // string
type Test19 = GetData<Error>; // never
```

### Best Practices:

```typescript
// ✅ Dùng conditional types để transform types
type Flatten<T> = T extends (infer U)[] ? U : T;

// ✅ Dùng conditional types với generics
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ Dùng conditional types với infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// ✅ Dùng conditional types với union types
type ExtractString<T> = T extends string ? T : never;

// ❌ Không nên dùng conditional types quá phức tạp
type BadExample<T> = T extends A
  ? T extends B
    ? T extends C
      ? Result1
      : Result2
    : Result3
  : Result4;

// ✅ Nên chia nhỏ conditional types
type Step1<T> = T extends A ? Step2<T> : Result3;
type Step2<T> = T extends B ? Step3<T> : Result2;
type Step3<T> = T extends C ? Result1 : Result2;

// ✅ Dùng conditional types với type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// ✅ Dùng conditional types để create utility types
type Nullable<T> = T | null;
type NonNullable<T> = T extends null | undefined ? never : T;
```

---

## Distributive conditional types?

**Distributive conditional types** - Conditional types được distributive (phân phối) khi applied đến union types, nghĩa là conditional type được applied đến từng member của union.

### Mục đích / Purpose

Khi conditional type được applied đến union type, nó được distributive đến từng member của union.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                  |
| ----------------------- | ----------------------------- |
| - Filter union types    | Khi cần filter union types    |
| - Transform union types | Khi cần transform từng member |
| - Type utilities        | Khi xây dựng type utilities   |
| - Exclude/Extract       | Khi cần exclude/extract types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Distributive**: Applied đến từng member
- **Filter Union**: Filter union types
- **Transform**: Transform từng member
- **Built-in**: TypeScript tự động distributive

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm             |
| ---------------------- | ---------------------- |
| - Distributive tự động | Có thể không mong muốn |
| - Filter union         | Cần hiểu rõ behavior   |
| - Transform members    | Learning curve         |
| - Built-in             | Debugging khó          |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type Test1 = ToArray<string | number>;
// string[] | number[] (distributive)

// Ví dụ: Exclude với distributive
type MyExclude<T, U> = T extends U ? never : T;

type Test2 = MyExclude<string | number | boolean, number>;
// string | boolean (number bị exclude)

// Ví dụ: Extract với distributive
type MyExtract<T, U> = T extends U ? T : never;

type Test3 = MyExtract<string | number | boolean, number | string>;
// string | number (chỉ giữ lại string và number)

// Ví dụ: NonNullable với distributive
type MyNonNullable<T> = T extends null | undefined ? never : T;

type Test4 = MyNonNullable<string | null | number | undefined>;
// string | number

// Ví dụ: Filter string types
type OnlyStrings<T> = T extends string ? T : never;

type Test5 = OnlyStrings<string | number | boolean>;
// string

// Ví dụ: Filter non-string types
type NonStrings<T> = T extends string ? never : T;

type Test6 = NonStrings<string | number | boolean>;
// number | boolean

// Ví dụ thực tế: Get function names
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface User {
  id: number;
  name: string;
  greet(): void;
  update(): void;
}

type Test7 = FunctionPropertyNames<User>;
// "greet" | "update"

// Ví dụ: Get non-function property names
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type Test8 = NonFunctionPropertyNames<User>;
// "id" | "name"

// Ví dụ: Distributive với mapped types
type MakeNullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Test9 = MakeNullable<{ a: string; b: number }>;
// { a: string | null; b: number | null }

// Ví dụ: Distributive với conditional types
type Flatten<T> = T extends (infer U)[] ? U : T;

type Test10 = Flatten<(string | number)[]>;
// string | number (distributive)

// Ví dụ: Distributive với infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Test11 = UnwrapPromise<Promise<string> | Promise<number>>;
// string | number (distributive)
```

### Best Practices:

```typescript
// ✅ Dùng distributive conditional types để filter union
type OnlyStrings<T> = T extends string ? T : never;

// ✅ Dùng distributive conditional types để transform union
type ToArray<T> = T extends any ? T[] : never;

// ✅ Dùng distributive conditional types với mapped types
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// ✅ Dùng distributive conditional types với infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// ❌ Không nên dùng distributive khi không mong muốn
type BadExample<T> = T extends any ? T[] : never;
type Test = BadExample<string | number>; // string[] | number[] (có thể không mong muốn)

// ✅ Nên wrap trong tuple để tránh distributive
type NotDistributive<T> = [T] extends [any] ? T[] : never;
type Test2 = NotDistributive<string | number>; // (string | number)[]

// ✅ Dùng distributive conditional types để create utility types
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type NonNullable<T> = T extends null | undefined ? never : T;
```

---

## `infer` keyword?

**`infer` keyword** - Keyword dùng để infer một type variable từ một type trong conditional types.

### Mục đích / Purpose

Infer một type variable từ một type, cho phép extract types từ complex types.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                  |
| ----------------------- | ----------------------------- |
| - Extract types         | Khi cần extract types         |
| - Infer return types    | Khi cần infer return types    |
| - Infer parameter types | Khi cần infer parameter types |
| - Type utilities        | Khi xây dựng type utilities   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract Types**: Extract types từ complex types
- **Infer Variables**: Infer type variables
- **Type Utilities**: Build type utilities
- **Expressive**: Express type relationships

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm             |
| ----------------- | ---------------------- |
| - Extract types   | Learning curve         |
| - Infer variables | Có thể phức tạp        |
| - Type utilities  | Debugging khó          |
| - Expressive      | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Infer return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Test1 = ReturnType<() => string>; // string
type Test2 = ReturnType<(x: number) => boolean>; // boolean

// Ví dụ: Infer parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type Test3 = Parameters<(x: string, y: number) => void>; // [string, number]

// Ví dụ: Infer array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

type Test4 = ElementType<string[]>; // string
type Test5 = ElementType<number[]>; // number

// Ví dụ: Infer promise value type
type PromiseValue<T> = T extends Promise<infer V> ? V : never;

type Test6 = PromiseValue<Promise<string>>; // string
type Test7 = PromiseValue<Promise<number>>; // number

// Ví dụ: Infer first parameter
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type Test8 = FirstParameter<(x: string, y: number) => void>; // string

// Ví dụ: Infer rest parameters
type RestParameters<T> = T extends (first: any, ...rest: infer R) => any
  ? R
  : never;

type Test9 = RestParameters<(x: string, y: number, z: boolean) => void>; // [number, boolean]

// Ví dụ thực tế: Infer từ discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

type ExtractData<T> = T extends { status: "success"; data: infer D }
  ? D
  : never;

type Test10 = ExtractData<Result<string>>; // string

// Ví dụ: Infer từ constructor
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends new (...args: any) => infer I ? I : never;

class User {
  constructor(public name: string) {}
}

type Test11 = InstanceType<typeof User>; // User

// Ví dụ: Infer từ mapped types
type GetValueType<T> = T extends { value: infer V } ? V : never;

type Test12 = GetValueType<{ value: string }>; // string
type Test13 = GetValueType<{ value: number }>; // number

// Ví dụ: Infer từ function overloads
type OverloadedReturnType<T> = T extends {
  (...args: any[]): infer R;
  (...args: any[]): infer R;
}
  ? R
  : never;

function foo(x: string): number;
function foo(x: number): string;
function foo(x: any): any {
  return x;
}

type Test14 = OverloadedReturnType<typeof foo>; // string | number

// Ví dụ: Infer từ conditional types
type Flatten<T> = T extends (infer U)[] ? U : T;

type Test15 = Flatten<string[]>; // string
type Test16 = Flatten<number[][]>; // number[] (không flatten sâu)

// Ví dụ: Infer từ nested types
type Nested<T> = T extends { nested: infer N } ? N : never;

type Test17 = Nested<{ nested: { value: string } }>; // { value: string }
```

### Best Practices:

```typescript
// ✅ Dùng infer để extract return types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// ✅ Dùng infer để extract parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// ✅ Dùng infer để extract array element types
type ElementType<T> = T extends (infer U)[] ? U : never;

// ✅ Dùng infer để extract promise value types
type PromiseValue<T> = T extends Promise<infer V> ? V : never;

// ✅ Dùng infer với conditional types
type Flatten<T> = T extends (infer U)[] ? U : T;

// ❌ Không nên dùng infer khi không cần
type BadExample<T> = T extends string ? infer R : never; // ❌ Không có nghĩa

// ✅ Nên dùng infer đúng cách
type GoodExample<T> = T extends string ? T : never;

// ✅ Dùng infer để extract types từ complex types
type GetValueType<T> = T extends { value: infer V } ? V : never;

// ✅ Dùng infer với mapped types
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
};

// ✅ Dùng infer với conditional types và distributive
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Test = UnwrapPromise<Promise<string> | Promise<number>>; // string | number
```

---

## Mapped types?

**Mapped Types** - Types được tạo bằng cách mapping over properties của một type, tương tự như array map nhưng tại type level.

### Mục đích / Purpose

Tạo mới types bằng cách transform properties của một type có sẵn.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                   |
| ----------------- | ------------------------------ |
| - Transform types | Khi cần transform types        |
| - Create variants | Khi cần tạo variants của types |
| - Type utilities  | Khi xây dựng type utilities    |
| - API design      | Khi cần type-safe APIs         |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform Types**: Transform properties của types
- **Create Variants**: Tạo variants của types
- **Type Utilities**: Build type utilities
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm             |
| ----------------- | ---------------------- |
| - Transform types | Learning curve         |
| - Create variants | Có thể phức tạp        |
| - Type utilities  | Debugging khó          |
| - Built-in        | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Mapped type
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

// Ví dụ: Mapped type với optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Ví dụ: Mapped type với required
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// { id: number; name: number; email: number; }

// Ví dụ: Mapped type với modifier keys
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }

// Ví dụ: Mapped type với conditional types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// Ví dụ: Mapped type với key remapping
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

type NumberProperties = PickByType<Product, number>;
// { id: number; price: number }

// Ví dụ: Mapped type với template literal types
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

interface Events {
  click: MouseEvent;
  keydown: KeyboardEvent;
}

type Handlers = EventHandlers<Events>;
// {
//   onClick: (event: MouseEvent) => void;
//   onKeydown: (event: KeyboardEvent) => void;
// }

// Ví dụ thực tế: Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
  database: {
    host: string;
    port: number;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// Tất cả properties ở mọi level đều readonly

// Ví dụ: Mapped type với conditional types
type NonNullableFields<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];

interface UserWithNullable {
  id: number;
  name: string;
  email: string | null;
}

type NonNullableKeys = NonNullableFields<UserWithNullable>;
// "id" | "name"
```

### Best Practices:

```typescript
// ✅ Dùng mapped types để transform types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Partial<T> = { [K in keyof T]?: T[K] };

// ✅ Dùng mapped types với conditional types
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// ✅ Dùng mapped types với key remapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ✅ Dùng mapped types với template literal types
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

// ✅ Dùng mapped types để create utility types
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// ❌ Không nên dùng mapped types quá phức tạp
type BadExample<T> = {
  [K in keyof T as T[K] extends A
    ? T[K] extends B
      ? T[K] extends C
        ? K
        : never
      : never
    : never]: T[K];
};

// ✅ Nên chia nhỏ mapped types
type Step1<T> = {
  [K in keyof T as T[K] extends A ? K : never]: T[K];
};
type Step2<T> = {
  [K in keyof Step1<T> as T[K] extends B ? K : never]: T[K];
};

// ✅ Dùng mapped types với conditional types và infer
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

---

## Template literal types?

**Template Literal Types** - Types được tạo từ string literal types và template literal syntax, cho phép string manipulation tại type level.

### Mục đích / Purpose

Tạo types từ string literals và template literal syntax, cho phép string manipulation tại type level.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                |
| --------------------- | --------------------------- |
| - String manipulation | Khi cần manipulate strings  |
| - Event handlers      | Khi tạo event handler types |
| - API endpoints       | Khi tạo API endpoint types  |
| - Type utilities      | Khi xây dựng type utilities |

### Giúp ích gì / Benefits

**Lợi ích:**

- **String Manipulation**: Manipulate strings tại type level
- **Event Handlers**: Tạo event handler types
- **API Endpoints**: Tạo API endpoint types
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm             |
| --------------------- | ---------------------- |
| - String manipulation | Learning curve         |
| - Event handlers      | Có thể phức tạp        |
| - API endpoints       | Debugging khó          |
| - Built-in            | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Template literal types
type Greeting = "Hello" | "Hi";
type Name = "Alice" | "Bob";

type GreetingMessage = `${Greeting}, ${Name}!`;
// "Hello, Alice!" | "Hello, Bob!" | "Hi, Alice!" | "Hi, Bob!"

// Ví dụ: Event handler types
type Event = "click" | "keydown" | "keyup";

type EventHandler = `on${Capitalize<Event>}`;
// "onClick" | "onKeydown" | "onKeyup"

// Ví dụ: API endpoint types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "users" | "posts" | "comments";

type ApiEndpoint = `${HttpMethod} /api/${Resource}`;
// "GET /api/users" | "GET /api/posts" | "GET /api/comments" |
// "POST /api/users" | "POST /api/posts" | "POST /api/comments" |
// "PUT /api/users" | "PUT /api/posts" | "PUT /api/comments" |
// "DELETE /api/users" | "DELETE /api/posts" | "DELETE /api/comments"

// Ví dụ: String manipulation types
type Uppercase<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${Uppercase<R>}`
  : T;

type Lowercase<T extends string> = T extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${Lowercase<R>}`
  : T;

type Capitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : T;

type Uncapitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : T;

// Ví dụ thực tế: CSS classes
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ButtonClass = `btn-${Color}-${Size}`;
// "btn-red-small" | "btn-red-medium" | "btn-red-large" |
// "btn-green-small" | "btn-green-medium" | "btn-green-large" |
// "btn-blue-small" | "btn-blue-medium" | "btn-blue-large"

// Ví dụ: Getter/setter types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface User {
  id: number;
  name: string;
  email: string;
}

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

type UserSetters = Setters<User>;
// {
//   setId: (value: number) => void;
//   setName: (value: string) => void;
//   setEmail: (value: string) => void;
// }

// Ví dụ: String literal types với conditional types
type RemovePrefix<
  T extends string,
  P extends string,
> = T extends `${P}${infer R}` ? R : T;

type Test1 = RemovePrefix<"hello world", "hello ">; // "world"

type RemoveSuffix<
  T extends string,
  S extends string,
> = T extends `${infer R}${S}` ? R : T;

type Test2 = RemoveSuffix<"hello world", " world">; // "hello"

// Ví dụ: String literal types với mapped types
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

interface Events {
  click: MouseEvent;
  keydown: KeyboardEvent;
}

type Handlers = EventHandlers<Events>;
// {
//   onClick: (event: MouseEvent) => void;
//   onKeydown: (event: KeyboardEvent) => void;
// }
```

### Best Practices:

```typescript
// ✅ Dùng template literal types để tạo string types
type Greeting = `Hello, ${string}!`;

// ✅ Dùng template literal types với event handlers
type EventHandler = `on${Capitalize<Event>}`;

// ✅ Dùng template literal types với API endpoints
type ApiEndpoint = `${HttpMethod} /api/${Resource}`;

// ✅ Dùng template literal types với string manipulation
type RemovePrefix<T, P> = T extends `${P}${infer R}` ? R : T;

// ✅ Dùng template literal types với mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ❌ Không nên dùng template literal types quá phức tạp
type BadExample<T> = `prefix_${T extends string ? T : never}_suffix`;

// ✅ Nên dùng conditional types với template literal types
type GoodExample<T extends string> = `prefix_${T}_suffix`;

// ✅ Dùng template literal types với conditional types
type IsPrefix<T extends string, P extends string> = T extends `${P}${string}`
  ? true
  : false;

// ✅ Dùng template literal types với infer
type ExtractPrefix<T extends string> = T extends `${infer P}${string}`
  ? P
  : never;
```

---

## Tổng kết

### Bảng so sánh Conditional Types và Related Features

| Feature                        | Mục đích                           | Ví dụ                                                |
| ------------------------------ | ---------------------------------- | ---------------------------------------------------- |
| Conditional Types              | Chọn type dựa trên condition       | `T extends U ? X : Y`                                |
| Distributive Conditional Types | Applied đến từng member của union  | `ToArray<string \| number>` → `string[] \| number[]` |
| `infer` keyword                | Infer type variable                | `T extends (...args: any[]) => infer R ? R : never`  |
| Mapped Types                   | Transform properties của type      | `{ readonly [K in keyof T]: T[K] }`                  |
| Template Literal Types         | String manipulation tại type level | `` `Hello, ${Name}!` ``                              |

### Best Practices chung cho Conditional Types

1. **Đơn giản hóa**: Giữ conditional types đơn giản khi có thể
2. **Kết hợp**: Kết hợp conditional types với các features khác
3. **Document**: Comment complex conditional types
4. **Test**: Test types với unit tests
5. **Debug**: Dùng `type` assertions để debug

### Anti-patterns cần tránh

```typescript
// ❌ Conditional types quá phức tạp
type BadExample<T> = T extends A
  ? T extends B
    ? T extends C
      ? Result1
      : Result2
    : Result3
  : Result4;

// ✅ Nên chia nhỏ
type Step1<T> = T extends A ? Step2<T> : Result3;
type Step2<T> = T extends B ? Step3<T> : Result2;
type Step3<T> = T extends C ? Result1 : Result2;

// ❌ Dùng conditional types khi không cần
type BadExample2<T> = T extends string ? string : never;

// ✅ Nên dùng type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// ❌ Không validate runtime
function badUpdate(id: number, updates: Partial<User>) {
  return { id, ...updates };
}

// ✅ Nên validate trước
function goodUpdate(id: number, updates: Partial<User>): User {
  const validated = validateUpdates(updates);
  return { id, ...validated };
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [TypeScript Deep Dive - Conditional Types](https://basarat.gitbook.io/typescript/type-system/conditional-types)

---

_Last updated: 2026-01-30_
