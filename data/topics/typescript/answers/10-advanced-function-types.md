# 10. Advanced Function Types

## Tổng quan về Advanced Function Types

### Mục đích của Advanced Function Types / Purpose

**Advanced Function Types** - Các advanced type features cho functions trong TypeScript.

**Mục đích chính:**

- Function overloads
- Conditional types
- Infer types
- Utility types cho functions
- Type-safe function programming

### Khi nào cần hiểu về Advanced Function Types / When to Use

Hiểu về Advanced Function Types là cần thiết khi:

- Tạo overloaded functions
- Dùng conditional types
- Infer types từ function signatures
- Tạo utility types
- Type-safe function programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Flexible APIs**: Create flexible APIs
- **Reusable Types**: Types có thể reuse
- **Type-safe programming**: Type-safe function programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm                    |
| -------------- | ----------------------------- |
| Type safety    | Learning curve cao hơn        |
| Better DX      | Verbose hơn                   |
| Flexible APIs  | Cần understand advanced types |
| Reusable types | Có thể overkill               |

---

## Function overloads?

**Function overloads** - Định nghĩa multiple function signatures cho cùng một function.

### Mục đích / Purpose

Function overloads được dùng để:

- Định nghĩa multiple signatures
- Type check different parameter types
- Create flexible APIs
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                               |
| --------------------- | ------------------------------------------ |
| Multiple signatures   | Khi function có multiple signatures        |
| Flexible APIs         | Khi cần flexible APIs                      |
| Type-safe overloading | Khi cần type-safe overloading              |
| Different behaviors   | Khi behavior phụ thuộc vào parameter types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multiple signatures**: Hỗ trợ multiple function signatures
- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Flexible APIs**: Create flexible APIs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                     |
| ------------------- | ------------------------------ |
| Multiple signatures | Verbose hơn                    |
| Type safety         | Learning curve                 |
| Better DX           | Cần understand overloading     |
| Flexible APIs       | Implementation phải compatible |

### Ví dụ:

```typescript
// 1. Function overload cơ bản
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}

// 2. Function overload với optional parameters
function greet(name: string): string;
function greet(name: string, greeting: string): string;
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// 3. Function overload với object types
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

function getArea(shape: Circle): number;
function getArea(shape: Square): number;
function getArea(shape: Circle | Square): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
  }
}

// 4. Function overload với array types
function firstElement(arr: string[]): string | undefined;
function firstElement(arr: number[]): number | undefined;
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 5. Function overload với generic types
function firstElement<T>(arr: T[]): T | undefined;
function firstElement<T>(arr: T[], index: number): T | undefined;
function firstElement<T>(arr: T[], index?: number): T | undefined {
  return index !== undefined ? arr[index] : arr[0];
}

// 6. Function overload với return types
function getValue(): string;
function getValue(): number;
function getValue(): string | number {
  return Math.random() > 0.5 ? "hello" : 123;
}

// 7. Function overload với callback types
function fetchData(callback: (data: string) => void): void;
function fetchData(callback: (data: string) => void, timeout: number): void;
function fetchData(
  callback: (data: string) => void,
  timeout: number = 5000,
): void {
  setTimeout(() => {
    callback("Data loaded");
  }, timeout);
}

// 8. Function overload với event handlers
function addEventListener(
  event: "click",
  listener: (e: MouseEvent) => void,
): void;
function addEventListener(
  event: "keydown",
  listener: (e: KeyboardEvent) => void,
): void;
function addEventListener(event: string, listener: (e: Event) => void): void {
  // implementation
}

// 9. Function overload với Promise types
function fetchUser(id: number): Promise<User>;
function fetchUser(
  id: number,
  includeDetails: boolean,
): Promise<User & { details: string }>;
function fetchUser(
  id: number,
  includeDetails: boolean = false,
): Promise<User | (User & { details: string })> {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return includeDetails ? { ...user, details: "User details" } : user;
}

// 10. Function overload với constructor types
interface User {
  id: number;
  name: string;
}

class UserFactory {
  constructor(name: string, email: string);
  constructor(id: number);
  constructor(nameOrId: string | number, email?: string) {
    if (typeof nameOrId === "string") {
      this.name = nameOrId;
      this.email = email || "";
    } else {
      this.id = nameOrId;
    }
  }

  id?: number;
  name?: string;
  email?: string;
}

// 11. Function overload với generic constraints
function process<T extends string>(value: T): string;
function process<T extends number>(value: T): number;
function process<T extends string | number>(value: T): string | number {
  return typeof value === "string" ? value.toUpperCase() : value.toFixed(2);
}

// 12. Function overload với conditional types
function process<T>(value: T): T extends string ? string : number;
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

// 13. Function overload với union types
function process(value: string): string;
function process(value: number): number;
function process(value: boolean): boolean;
function process(value: string | number | boolean): string | number | boolean {
  return value;
}

// 14. Function overload với tuple types
function getPoint(x: number, y: number): [number, number];
function getPoint(point: [number, number]): [number, number];
function getPoint(
  xOrPoint: number | [number, number],
  y?: number,
): [number, number] {
  if (Array.isArray(xOrPoint)) {
    return xOrPoint;
  }
  return [xOrPoint, y!];
}

// 15. Function overload với discriminated unions
interface Success {
  status: "success";
  data: string;
}

interface Error {
  status: "error";
  message: string;
}

function handleResponse(response: Success): void;
function handleResponse(response: Error): void;
function handleResponse(response: Success | Error): void {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.error(response.message);
  }
}
```

### Best Practices:

1. **Order overloads**: Đặt specific overloads trước generic overloads
2. **Implementation signature**: Implementation signature phải compatible với tất cả overload signatures
3. **Document overloads**: Document rõ ràng về từng overload
4. **Type-safe implementation**: Đảm bảo implementation type-safe
5. **Avoid too many overloads**: Tránh quá nhiều overloads

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Implementation signature không compatible với overloads
function process(value: string): string;
function process(value: number): number;
function process(value: any): any {
  return value;
}

// ✅ Nên: Implementation signature phải compatible
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}

// ❌ Không nên: Quên overload signatures
function process(value: string | number): string | number {
  return value;
}

// ✅ Nên: Thêm overload signatures
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

---

## Conditional types?

**Conditional types** - Types dựa trên conditions.

### Mục đích / Purpose

Conditional types được dùng để:

- Tạo types dựa trên conditions
- Type-safe conditional logic
- Create utility types
- Enable type-level programming

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                        |
| ---------------------- | ----------------------------------- |
| Conditional types      | Khi cần types dựa trên conditions   |
| Utility types          | Khi tạo utility types               |
| Type-level programming | Khi cần type-level programming      |
| Type-safe logic        | Khi cần type-safe conditional logic |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Conditional types**: Types dựa trên conditions
- **Type safety**: Catch errors tại compile time
- **Utility types**: Create utility types
- **Type-level programming**: Type-level programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                       |
| ---------------------- | -------------------------------- |
| Conditional types      | Learning curve cao hơn           |
| Type safety            | Verbose hơn                      |
| Utility types          | Cần understand conditional types |
| Type-level programming | Có thể complex                   |

### Ví dụ:

```typescript
// 1. Conditional type cơ bản
type NonNullable<T> = T extends null | undefined ? never : T;

type Result1 = NonNullable<string | null>; // string
type Result2 = NonNullable<number | undefined>; // number

// 2. Conditional type với union types
type Flatten<T> = T extends (infer U)[] ? U : T;

type Result3 = Flatten<number[]>; // number
type Result4 = Flatten<string[]>; // string
type Result5 = Flatten<number>; // number

// 3. Conditional type với infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturn = ReturnType<typeof add>; // number

// 4. Conditional type với keyof
type PropertyType<T, K extends keyof T> = T[K];

interface User {
  id: number;
  name: string;
  email: string;
}

type IdType = PropertyType<User, "id">; // number
type NameType = PropertyType<User, "name">; // string

// 5. Conditional type với mapped types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser = Readonly<User>;
// ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

// 6. Conditional type với template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // 'onClick'
type KeydownEvent = EventName<"keydown">; // 'onKeydown'

// 7. Conditional type với distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type Result6 = ToArray<string | number>; // string[] | number[]
type Result7 = ToArray<string>; // string[]

// 8. Conditional type với union types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result8 = NonNullable<string | null | undefined>; // string

// 9. Conditional type với never
type NeverType<T> = T extends never ? never : T;

type Result9 = NeverType<never>; // never
type Result10 = NeverType<string>; // string

// 10. Conditional type với unknown
type UnknownType<T> = T extends unknown ? T : never;

type Result11 = UnknownType<string>; // string
type Result12 = UnknownType<unknown>; // unknown

// 11. Conditional type với any
type AnyType<T> = T extends any ? any : never;

type Result13 = AnyType<any>; // any
type Result14 = AnyType<string>; // never

// 12. Conditional type với tuple types
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

type Result15 = First<[string, number, boolean]>; // string

// 13. Conditional type với array types
type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type Result16 = Length<[string, number, boolean]>; // 3

// 14. Conditional type với function types
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type AddParams = Parameters<typeof add>; // [a: number, b: number]

// 15. Conditional type với Promise types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result17 = UnwrapPromise<Promise<string>>; // string
type Result18 = UnwrapPromise<string>; // string
```

### Best Practices:

1. **Use conditional types**: Dùng conditional types khi cần types dựa trên conditions
2. **Infer types**: Dùng `infer` để extract types
3. **Distributive conditionals**: Hiểu về distributive conditional types
4. **Utility types**: Dùng conditional types để tạo utility types
5. **Type-level programming**: Dùng conditional types cho type-level programming

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Overly complex conditional types
type Complex<T> = T extends (infer U)[] ? U : T extends (infer V)[] ? V : never;

// ✅ Nên: Giữ conditional types đơn giản
type Flatten<T> = T extends (infer U)[] ? U : T;

// ❌ Không nên: Không dùng infer khi có thể
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ Nên: Dùng infer khi cần
type NonNullable<T> = T extends null | undefined ? never : T;
```

---

## Infer types?

**Infer types** - Extract types từ conditional types.

### Mục đích / Purpose

Infer types được dùng để:

- Extract types từ conditional types
- Create utility types
- Type-level programming
- Extract return types, parameter types, etc.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                               |
| ---------------------- | ------------------------------------------ |
| Extract types          | Khi cần extract types từ conditional types |
| Utility types          | Khi tạo utility types                      |
| Type-level programming | Khi cần type-level programming             |
| Function types         | Khi cần extract function types             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract types**: Extract types từ conditional types
- **Utility types**: Create utility types
- **Type-level programming**: Type-level programming
- **Type safety**: Catch errors tại compile time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm             |
| ---------------------- | ---------------------- |
| Extract types          | Learning curve cao hơn |
| Utility types          | Verbose hơn            |
| Type-level programming | Cần understand infer   |
| Type safety            | Có thể complex         |

### Ví dụ:

```typescript
// 1. Infer return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturn = ReturnType<typeof add>; // number

// 2. Infer parameter types
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type AddParams = Parameters<typeof add>; // [a: number, b: number]

// 3. Infer this type
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;

function greet(this: { name: string }): string {
  return `Hello, ${this.name}!`;
}

type GreetThis = ThisParameterType<typeof greet>; // { name: string }

// 4. Infer array element type
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type Numbers = number[];
type NumberElement = ArrayElementType<Numbers>; // number

// 5. Infer promise value type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;
type UnwrappedString = UnwrapPromise<PromiseString>; // string

// 6. Infer tuple types
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Rest<T extends any[]> = T extends [any, ...infer R] ? R : never;

type Tuple = [string, number, boolean];
type FirstElement = First<Tuple>; // string
type RestElements = Rest<Tuple>; // [number, boolean]

// 7. Infer object property types
type PropertyType<T, K extends keyof T> = T[K];

interface User {
  id: number;
  name: string;
  email: string;
}

type IdType = PropertyType<User, "id">; // number
type NameType = PropertyType<User, "name">; // string

// 8. Infer function parameter types
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any
  ? F
  : never;

function process(a: string, b: number): void {
  // implementation
}

type FirstParam = FirstParameter<typeof process>; // string

// 9. Infer constructor return type
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;

class User {
  constructor(public name: string) {}
}

type UserInstance = InstanceType<typeof User>; // User

// 10. Infer multiple types
type Unwrap<T> =
  T extends Promise<infer U> ? U : T extends Array<infer V> ? V : T;

type PromiseArray = Promise<string[]>;
type Unwrapped = Unwrap<PromiseArray>; // string[]

// 11. Infer conditional types
type ConditionalInfer<T> = T extends { value: infer V } ? V : never;

type Object = { value: string };
type InferredValue = ConditionalInfer<Object>; // string

// 12. Infer mapped types
type MappedInfer<T> = {
  [K in keyof T]: T[K] extends infer U ? U : never;
};

interface User2 {
  id: number;
  name: string;
  email: string;
}

type MappedUser = MappedInfer<User2>;
// MappedUser = {
//   id: number;
//   name: string;
//   email: string;
// }

// 13. Infer template literal types
type ExtractEventName<T> = T extends `on${infer Event}` ? Event : never;

type ClickHandler = `onClick`;
type EventName = ExtractEventName<ClickHandler>; // 'click'

// 14. Infer union types
type ExtractUnion<T> = T extends (infer U)[] ? U : never;

type Union = [string, number, boolean];
type Extracted = ExtractUnion<Union>; // string | number | boolean

// 15. Infer nested types
type DeepInfer<T> = T extends { value: infer V; nested: { value: infer N } }
  ? [V, N]
  : never;

type Nested = { value: string; nested: { value: number } };
type Inferred = DeepInfer<Nested>; // [string, number]
```

### Best Practices:

1. **Use infer**: Dùng `infer` để extract types từ conditional types
2. **Utility types**: Dùng `infer` để tạo utility types
3. **Type-level programming**: Dùng `infer` cho type-level programming
4. **Multiple infer**: Dùng multiple `infer` trong cùng conditional type
5. **Document infer**: Document rõ ràng về infer types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không dùng infer khi có thể
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ Nên: Dùng infer khi cần
type NonNullable<T> = T extends null | undefined ? never : T;

// ❌ Không nên: Overly complex infer types
type Complex<T> = T extends {
  value: infer V;
  nested: { value: infer N; deep: { value: infer D } };
}
  ? [V, N, D]
  : never;

// ✅ Nên: Giữ infer types đơn giản
type PropertyType<T, K extends keyof T> = T[K];
```

---

## Utility types (`ReturnType`, `Parameters`, `ThisParameterType`)?

**Utility types** - Built-in utility types cho functions.

### Mục đích / Purpose

Utility types được dùng để:

- Extract function types
- Create type-safe utilities
- Type-level programming
- Simplify type definitions

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                       |
| ---------------------- | ---------------------------------- |
| Extract types          | Khi cần extract types từ functions |
| Utility types          | Khi cần utility types              |
| Type-level programming | Khi cần type-level programming     |
| Simplify types         | Khi muốn simplify type definitions |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract types**: Extract types từ functions
- **Utility types**: Built-in utility types
- **Type-level programming**: Type-level programming
- **Simplify types**: Simplify type definitions

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                   |
| ---------------------- | ---------------------------- |
| Extract types          | Learning curve               |
| Utility types          | Verbose hơn                  |
| Type-level programming | Cần understand utility types |
| Simplify types         | Có thể limiting              |

### Ví dụ:

```typescript
// 1. ReturnType
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturn = ReturnType<typeof add>; // number

// 2. Parameters
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type AddParams = Parameters<typeof add>; // [a: number, b: number]

// 3. ThisParameterType
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;

function greet(this: { name: string }): string {
  return `Hello, ${this.name}!`;
}

type GreetThis = ThisParameterType<typeof greet>; // { name: string }

// 4. OmitThisParameter
type OmitThisParameter<T> = T extends (this: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : T;

type GreetWithoutThis = OmitThisParameter<typeof greet>; // (name: string) => string

// 5. ConstructorParameters
type ConstructorParameters<T extends new (...args: any[]) => any> =
  T extends new (...args: infer P) => any ? P : never;

class User {
  constructor(
    public name: string,
    public email: string,
  ) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>; // [name: string, email: string]

// 6. InstanceType
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;

type UserInstance = InstanceType<typeof User>; // User

// 7. Awaited
type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;
type AwaitedString = Awaited<PromiseString>; // string

// 8. Partial với ReturnType
type PartialReturn<T extends (...args: any[]) => any> = Partial<ReturnType<T>>;

function getUser(): User {
  return { id: 1, name: "John", email: "john@example.com" };
}

type PartialUser = PartialReturn<typeof getUser>;
// PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
// }

// 9. Required với Parameters
type RequiredParams<T extends (...args: any[]) => any> = Required<
  Parameters<T>[number]
>;

function process(id?: number, name?: string): void {
  // implementation
}

type RequiredProcessParams = RequiredParams<typeof process>; // number | string

// 10. Pick với ReturnType
type PickReturn<
  T extends (...args: any[]) => any,
  K extends keyof ReturnType<T>,
> = Pick<ReturnType<T>, K>;

function getUser2(): User {
  return { id: 1, name: "John", email: "john@example.com" };
}

type UserBasic = PickReturn<typeof getUser2, "id" | "name">;
// UserBasic = {
//   id: number;
//   name: string;
// }

// 11. Omit với Parameters
type OmitParams<
  T extends (...args: any[]) => any,
  K extends keyof Parameters<T>,
> = Omit<Parameters<T>, K>;

function createUser(id: number, name: string, email: string): User {
  return { id, name, email };
}

type CreateUserWithoutId = OmitParams<typeof createUser, "id">; // [name: string, email: string]

// 12. Exclude với ReturnType
type ExcludeReturn<T extends (...args: any[]) => any, U> = Exclude<
  ReturnType<T>,
  U
>;

function getStatus(): "pending" | "approved" | "rejected" {
  return "pending";
}

type StatusWithoutPending = ExcludeReturn<typeof getStatus, "pending">; // 'approved' | 'rejected'

// 13. Extract với Parameters
type ExtractParams<T extends (...args: any[]) => any, U> = Extract<
  Parameters<T>[number],
  U
>;

function process2(value: string | number): void {
  // implementation
}

type StringParams = ExtractParams<typeof process2, string>; // string

// 14. Record với Parameters
type RecordParams<T extends (...args: any[]) => any> = Record<
  keyof Parameters<T>,
  Parameters<T>[keyof Parameters<T>]
>;

function process3(id: number, name: string): void {
  // implementation
}

type Process3Params = RecordParams<typeof process3>;
// Process3Params = {
//   0: number;
//   1: string;
// }

// 15. ReturnType với conditional types
type ConditionalReturn<T> = T extends () => infer R ? R : never;

function returnsString(): string {
  return "hello";
}

function returnsNumber(): number {
  return 123;
}

type StringReturn = ConditionalReturn<typeof returnsString>; // string
type NumberReturn = ConditionalReturn<typeof returnsNumber>; // number
```

### Best Practices:

1. **Use utility types**: Dùng built-in utility types khi có thể
2. **Extract types**: Dùng utility types để extract types từ functions
3. **Type-level programming**: Dùng utility types cho type-level programming
4. **Simplify types**: Dùng utility types để simplify type definitions
5. **Document usage**: Document rõ ràng về utility types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Reimplement utility types
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// ✅ Nên: Dùng built-in utility types
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

// ❌ Không nên: Overly complex utility type usage
type ComplexType = ReturnType<Parameters<ReturnType<typeof func>>>;

// ✅ Nên: Giữ utility type usage đơn giản
type FuncReturn = ReturnType<typeof func>;
```

---

## Best Practices cho Advanced Function Types

### 1. Use Function Overloads cho Multiple Signatures

Dùng function overloads cho multiple signatures:

```typescript
// ✅ Nên
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

### 2. Use Conditional Types cho Type-Level Logic

Dùng conditional types cho type-level logic:

```typescript
// ✅ Nên
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 3. Use Infer để Extract Types

Dùng `infer` để extract types:

```typescript
// ✅ Nên
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

### 4. Use Built-in Utility Types

Dùng built-in utility types khi có thể:

```typescript
// ✅ Nên
type AddReturn = ReturnType<typeof add>;
```

### 5. Document Advanced Types

Document rõ ràng về advanced types:

```typescript
// ✅ Nên
/**
 * Extracts the return type of a function type
 * @typeparam T - The function type
 */
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

---

## Anti-patterns cần tránh

### 1. Implementation Signature không Compatible với Overloads

```typescript
// ❌ Không nên
function process(value: string): string;
function process(value: number): number;
function process(value: any): any {
  return value;
}

// ✅ Nên
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

### 2. Overly Complex Conditional Types

```typescript
// ❌ Không nên
type Complex<T> = T extends (infer U)[] ? U : T extends (infer V)[] ? V : never;

// ✅ Nên
type Flatten<T> = T extends (infer U)[] ? U : T;
```

---

_References:_

- [TypeScript Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Type Inference](https://www.typescriptlang.org/docs/handbook/2/type-inference.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
