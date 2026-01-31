# 15. Type Assertions

## Tổng quan về Type Assertions

### Mục đích của Type Assertions / Purpose

**Type Assertions** là cách để nói với TypeScript rằng bạn biết rõ hơn về kiểu dữ liệu của một giá trị hơn là TypeScript có thể infer. Type assertions không thực hiện bất kỳ kiểm tra hoặc chuyển đổi runtime nào - chúng chỉ là compile-time constructs để giúp TypeScript hiểu code.

**Mục đích chính:**

- Override type inference của TypeScript
- Xử lý các trường hợp TypeScript không thể infer đúng
- Làm việc với libraries không có type definitions tốt
- Convert giữa các types khi bạn chắc chắn về runtime behavior

### Khi nào cần hiểu về Type Assertions / When to Use

Hiểu về Type Assertions là cần thiết khi:

- Làm việc với DOM elements
- Xử lý data từ APIs có type definitions không chính xác
- Convert giữa union types
- Làm việc với third-party libraries có types không tốt
- Implement patterns mà TypeScript không hiểu

### Giúp ích gì / Benefits

**Lợi ích:**

- **Override Inference**: Khi TypeScript infer sai
- **Better DX**: IntelliSense hoạt động đúng
- **Flexibility**: Xử lý edge cases
- **Legacy Code**: Làm việc với code cũ không có types tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                        |
| --------------------------- | --------------------------------- |
| Override type inference     | Không có runtime check            |
| - Giúp TypeScript hiểu code | Có thể gây runtime errors nếu sai |
| - Flexible cho edge cases   | Làm giảm type safety              |
| - Hỗ trợ legacy code        | Code khó maintain hơn             |

---

## Type assertions (`as` và `<>`)?

**Type assertions** - Có hai cú pháp: `as` (angle-bracket syntax `<>`) để chỉ định kiểu dữ liệu cho một giá trị.

### Mục đích / Purpose

Chỉ định kiểu dữ liệu cụ thể cho một giá trị khi TypeScript không thể infer hoặc infer sai.

### Khi nào dùng / When to Use

| Tình huống    | Khi nào dùng                      |
| ------------- | --------------------------------- |
| DOM elements  | Khi truy cập DOM elements         |
| Union types   | Khi muốn narrow union type        |
| Unknown types | Khi xử lý `unknown` types         |
| Library types | Khi library types không chính xác |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Two Syntaxes**: `as` và `<>` để lựa chọn
- **Compile-time Only**: Không có runtime overhead
- **Type Narrowing**: Giúp TypeScript hiểu type cụ thể
- **Flexible**: Dùng trong nhiều trường hợp

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                          |
| --------------------------- | ----------------------------------- |
| - Không có runtime overhead | Có thể gây runtime errors           |
| - Hai cú pháp để lựa chọn   | Giảm type safety                    |
| - Dễ dùng                   | Có thể bị lạm dụng                  |
| - Compile-time check        | TypeScript không validate assertion |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Cú pháp as
const value: unknown = "hello";
const str = value as string; // ✅ TypeScript biết str là string

// Ví dụ: Cú pháp angle-bracket
const value2: unknown = "world";
const str2 = <string>value2; // ✅ Tương tự như as

// Ví dụ: DOM elements
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d"); // ✅ TypeScript hiểu canvas là HTMLCanvasElement

// Ví dụ: Union types
function processValue(value: string | number) {
  const str = value as string; // ✅ Narrow to string
  return str.toUpperCase();
}

// Ví dụ: Unknown type
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJSON('{"name": "Alice"}');
const user = data as { name: string }; // ✅ Assert type
console.log(user.name); // ✅ TypeScript biết có property name

// Ví dụ: Chaining type assertions
const value: unknown = { nested: { value: 42 } };
const num = (value as { nested: { value: number } }).nested.value; // ✅

// Ví dụ thực tế: API response
interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data as User; // ✅ Assert API response type
}

// Ví dụ: Event handling
function handleClick(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  console.log(button.value); // ✅ TypeScript biết có property value
}
```

### Best Practices:

```typescript
// ✅ Dùng cú pháp as (preferred)
const str = value as string;

// ✅ Dùng angle-bracket trong JSX không được
// Trong JSX files, dùng as để tránh conflict
const str = value as string; // ✅ Works in JSX
// const str = <string>value; // ❌ Conflict with JSX syntax

// ✅ Dùng type assertions với DOM elements
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Hello"; // ✅ TypeScript hiểu

// ✅ Dùng type assertions khi chắc chắn về type
function getLength(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }
  return String(value).length;
}

// ❌ Không nên dùng type assertions thay vì type guards
function badExample(value: string | number) {
  const str = value as string; // ❌ Không an toàn
  return str.toUpperCase();
}

// ✅ Nên dùng type guards
function goodExample(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ An toàn
  }
  return String(value);
}

// ✅ Dùng type assertions với unknown sau khi validate
function parseAndProcess(json: string): string {
  const data = JSON.parse(json) as unknown;
  if (typeof data === "object" && data !== null && "name" in data) {
    return (data as { name: string }).name;
  }
  throw new Error("Invalid data");
}

// ❌ Không nên chain nhiều type assertions
const bad = value as unknown as string; // ❌ Hard to read

// ✅ Nên validate trước khi assert
if (typeof value === "string") {
  const str = value; // ✅ TypeScript tự động narrow
}
```

---

## Non-null assertion (`!`)?

**Non-null assertion operator (`!`)** - Toán tử dùng để chỉ định rằng một giá trị không phải là `null` hoặc `undefined`.

### Mục đích / Purpose

Bỏ qua kiểm tra `null`/`undefined` khi bạn chắc chắn rằng giá trị không null/undefined.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                                |
| ------------------- | ------------------------------------------- |
| Optional properties | Khi chắc chắn property có giá trị           |
| DOM elements        | Khi chắc chắn element tồn tại               |
| Function parameters | Khi chắc chắn param không null              |
| After validation    | Khi đã validate nhưng TypeScript không hiểu |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Concise**: Ngắn gọn hơn type guards
- **Remove Checks**: Không cần if statements
- **After Validation**: Khi đã validate nhưng TypeScript không hiểu

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                         | Nhược điểm                |
| ------------------------------- | ------------------------- |
| - Ngắn gọn, dễ dùng             | Không có runtime check    |
| - Bỏ qua checks không cần thiết | Có thể gây runtime errors |
| - Hữu ích sau validation        | Dễ bị lạm dụng            |
| - TypeScript hiểu type          | Giảm type safety          |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Non-null assertion
function greet(name: string | undefined) {
  console.log(`Hello, ${name!}`); // ✅ TypeScript biết name không undefined
}

// Ví dụ: Optional properties
interface User {
  id: number;
  name?: string;
}

function getUserName(user: User): string {
  return user.name!; // ✅ TypeScript biết name có giá trị
}

// Ví dụ: DOM elements
const button = document.getElementById("submit-button")!;
button.addEventListener("click", handleClick); // ✅ TypeScript biết button tồn tại

// Ví dụ: Sau validation
function processValue(value: string | null) {
  if (value !== null) {
    // TypeScript vẫn không hiểu value không null ở đây
    // Dùng ! để bỏ qua check
    console.log(value!.length); // ✅
  }
}

// Ví dụ thực tế: Form inputs
interface FormData {
  username?: string;
  email?: string;
}

function submitForm(data: FormData) {
  // Sau khi validate client-side
  const username = data.username!;
  const email = data.email!;

  console.log(`Submitting: ${username}, ${email}`);
}

// Ví dụ: Array access
function getFirstItem<T>(items: T[] | undefined): T {
  return items![0]!; // ✅ TypeScript biết items và items[0] tồn tại
}

// Ví dụ: Function parameters
function processOptional(value?: string) {
  // Sau khi check value tồn tại
  if (value) {
    console.log(value!.toUpperCase()); // ✅
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng non-null assertion khi đã validate
function safeLength(value: string | null): number {
  if (value !== null) {
    return value!.length; // ✅ Đã validate
  }
  return 0;
}

// ✅ Dùng non-null assertion với DOM elements khi chắc chắn
const button = document.getElementById("submit")!;
button.addEventListener("click", handleClick);

// ✅ Dùng non-null assertion với optional properties sau validation
interface Config {
  apiUrl?: string;
  timeout?: number;
}

function loadConfig(config: Config) {
  // Sau khi validate
  const apiUrl = config.apiUrl!;
  const timeout = config.timeout!;

  console.log(`Loading from ${apiUrl} with timeout ${timeout}`);
}

// ❌ Không nên dùng non-null assertion khi chưa validate
function badExample(value: string | null) {
  console.log(value!.length); // ❌ Runtime error nếu value là null
}

// ✅ Nên validate trước
function goodExample(value: string | null) {
  if (value !== null) {
    console.log(value.length); // ✅ TypeScript tự động narrow
  }
}

// ❌ Không nên dùng non-null assertion với user input
function badProcess(input: string | undefined) {
  console.log(input!.toUpperCase()); // ❌ Có thể undefined
}

// ✅ Nên validate user input
function goodProcess(input: string | undefined) {
  if (input) {
    console.log(input.toUpperCase()); // ✅
  } else {
    throw new Error("Input is required");
  }
}

// ⚠️ Cẩn thận với array access
function badGetFirst<T>(items: T[]): T {
  return items[0]!; // ❌ Có thể undefined nếu array rỗng
}

// ✅ Nên check length trước
function goodGetFirst<T>(items: T[]): T | undefined {
  if (items.length > 0) {
    return items[0];
  }
  return undefined;
}

// ✅ Kết hợp non-null assertion với type guards
function processValue(value: string | null | undefined): string {
  if (value != null) {
    // value là string ở đây
    return value; // ✅ Không cần !
  }
  throw new Error("Value is required");
}
```

---

## Const assertions?

**Const assertions** - Sử dụng `as const` để chỉ định TypeScript nên infer literal type cụ thể thay vì widened type.

### Mục đích / Purpose

Giữ nguyên literal types thay vì widen lên primitive types, và làm readonly tất cả properties.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                     |
| --------------------- | -------------------------------- |
| Configuration objects | Khi cần literal types cho config |
| Enum-like objects     | Khi tạo enum-like structures     |
| Readonly objects      | Khi cần immutable objects        |
| Literal types         | Khi cần specific literal values  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Literal Types**: Giữ nguyên literal values
- **Readonly**: Tự động làm readonly
- **Type Safety**: Chỉ cho phép exact values
- **Better DX**: IntelliSense chính xác hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm              |
| --------------------- | ----------------------- |
| - Giữ literal types   | Có thể quá restrictive  |
| - Tự động readonly    | Không thể mutate        |
| - Type safety cao     | Code có thể verbose hơn |
| - Better IntelliSense | Học curve cho newcomers |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Const assertion với string
const name = "Alice" as const; // ✅ Type là "Alice" (literal), không phải string
// name = "Bob"; // ❌ Error: Type '"Bob"' is not assignable to type '"Alice"'

// Ví dụ: Const assertion với number
const count = 42 as const; // ✅ Type là 42 (literal), không phải number

// Ví dụ: Const assertion với array
const colors = ["red", "green", "blue"] as const;
// Type là readonly ["red", "green", "blue"]
// colors.push("yellow"); // ❌ Error: Property 'push' does not exist

// Ví dụ: Const assertion với object
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;
// Type là { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3; }

// Ví dụ: Enum-like object
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];
// Type là "UP" | "DOWN" | "LEFT" | "RIGHT"

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}

move(Direction.Up); // ✅ OK
move("UP"); // ✅ OK
move("DIAGONAL"); // ❌ Error

// Ví dụ thực tế: API endpoints
const ApiEndpoints = {
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments",
} as const;

function fetchApi(endpoint: keyof typeof ApiEndpoints) {
  return fetch(ApiEndpoints[endpoint]);
}

fetchApi("users"); // ✅ OK
fetchApi("products"); // ❌ Error

// Ví dụ: Status codes
const StatusCodes = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
} as const;

type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes];
// Type là 200 | 201 | 400 | 401 | 404

function handleResponse(status: StatusCode) {
  if (status === StatusCodes.OK) {
    console.log("Success!");
  }
}

// Ví dụ: Configuration with nested object
const appConfig = {
  server: {
    host: "localhost",
    port: 3000,
  },
  database: {
    host: "localhost",
    port: 5432,
    name: "mydb",
  },
} as const;

// Type là readonly object với tất cả properties readonly
```

### Best Practices:

```typescript
// ✅ Dùng const assertions cho configuration
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;

// ✅ Dùng const assertions cho enum-like objects
const Role = {
  Admin: "admin",
  User: "user",
  Guest: "guest",
} as const;

type Role = (typeof Role)[keyof typeof Role];

// ✅ Dùng const assertions cho API endpoints
const endpoints = {
  getUsers: "/users",
  getUserById: (id: number) => `/users/${id}`,
} as const;

// ✅ Kết hợp const assertions với type inference
const actions = {
  increment: { type: "INCREMENT" as const },
  decrement: { type: "DECREMENT" as const },
};

type Action = (typeof actions)[keyof typeof actions];
// Type là { type: "INCREMENT" } | { type: "DECREMENT" }

// ❌ Không nên dùng const assertions khi cần mutability
const badColors = ["red", "green", "blue"] as const;
badColors.push("yellow"); // ❌ Error: Cannot assign to 'push'

// ✅ Nên dùng readonly array khi cần mutability
const goodColors: readonly string[] = ["red", "green", "blue"];
// goodColors.push("yellow"); // ❌ Error
// Nhưng có thể cast nếu cần mutability
const mutableColors = [...goodColors]; // ✅ Mutable copy

// ❌ Không nên dùng const assertions khi values có thể thay đổi
const badConfig = {
  apiUrl: process.env.API_URL as const, // ❌ Có thể undefined
};

// ✅ Nên validate trước khi dùng const assertion
const goodConfig = {
  apiUrl: (process.env.API_URL ?? "https://default.api.com") as const,
};

// ✅ Dùng const assertions với function return types
function getConfig() {
  return {
    debug: false,
    version: "1.0.0",
  } as const;
}

const config = getConfig();
// Type là { readonly debug: false; readonly version: "1.0.0"; }

// ✅ Dùng const assertions với template literals
const prefix = "user_" as const;
const suffix = "_data" as const;
const key = `${prefix}${123}${suffix}` as const;
// Type là "user_123_data"
```

---

## Type casting pitfalls?

**Type casting pitfalls** - Các lỗi phổ biến và nguy hiểm khi sử dụng type assertions/casting.

### Mục đích / Purpose

Hiểu các rủi ro và tránh pitfalls khi sử dụng type assertions.

### Khi nào cần hiểu / When to Understand

Hiểu về pitfalls là cần thiết khi:

- Sử dụng type assertions thường xuyên
- Làm việc với third-party libraries
- Xử lý runtime data
- Review code của team members

### Giúp ích gì / Benefits

**Lợi ích:**

- **Avoid Bugs**: Tránh runtime errors
- **Better Code**: Code an toàn hơn
- **Team Knowledge**: Chia sẻ kiến thức
- **Code Review**: Phát hiện issues sớm

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm                 |
| ----------------------- | -------------------------- |
| - Tránh runtime errors  | Cần hiểu sâu về TypeScript |
| - Code an toàn hơn      | Có thể verbose             |
| - Better team practices | Learning curve             |
| - Catch issues early    | Cần discipline             |

### Ví dụ:

```typescript
// Pitfall 1: Casting sai type
function badCast(value: string) {
  const num = value as number; // ❌ Runtime: value vẫn là string
  console.log(num.toFixed(2)); // ❌ Runtime error: value.toFixed is not a function
}

// Fix: Validate trước khi cast
function goodCast(value: string) {
  const num = Number(value);
  if (!isNaN(num)) {
    console.log(num.toFixed(2)); // ✅
  }
}

// Pitfall 2: Casting giữa không compatible types
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  price: number;
}

function badConversion(user: User): Product {
  return user as Product; // ❌ Runtime: user không có price
}

function badUsage(user: User) {
  const product = badConversion(user);
  console.log(product.price); // ❌ Runtime error: undefined
}

// Fix: Tạo proper conversion
function goodConversion(user: User): Product {
  return {
    id: user.id,
    price: 0, // ✅ Default value
  };
}

// Pitfall 3: Casting unknown data từ API
async function badFetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data as User; // ❌ Data có thể không đúng format
}

// Fix: Validate data
async function goodFetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  const data = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "number" &&
    typeof data.name === "string"
  ) {
    return data as User; // ✅ Đã validate
  }

  throw new Error("Invalid user data");
}

// Pitfall 4: Non-null assertion với null values
function badNonNull(value: string | null) {
  console.log(value!.length); // ❌ Runtime error nếu value là null
}

// Fix: Validate trước
function goodNonNull(value: string | null) {
  if (value !== null) {
    console.log(value.length); // ✅
  }
}

// Pitfall 5: Casting array elements
function badArrayCast(items: unknown[]) {
  return items as string[]; // ❌ Elements có thể không phải string
}

function badUsage(items: unknown[]) {
  const strings = badArrayCast(items);
  strings.forEach((s) => console.log(s.toUpperCase())); // ❌ Runtime error
}

// Fix: Validate từng element
function goodArrayCast(items: unknown[]): string[] {
  return items.filter((item): item is string => typeof item === "string");
}

// Pitfall 6: Casting với generic types
function badGeneric<T>(value: unknown): T {
  return value as T; // ❌ Không có validation
}

function badUsage() {
  const user = badGeneric<User>({ id: "not a number", name: "Alice" });
  console.log(user.id.toFixed(2)); // ❌ Runtime error
}

// Fix: Validate với type guards
function goodGeneric<T>(value: unknown, guard: (v: unknown) => v is T): T {
  if (guard(value)) {
    return value;
  }
  throw new Error("Invalid value");
}

// Pitfall 7: Casting DOM elements
function badDOMCast() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  // ❌ Nếu element không tồn tại hoặc không phải canvas, runtime error
  const ctx = canvas.getContext("2d");
}

// Fix: Validate trước
function goodDOMCast() {
  const canvas = document.getElementById("canvas");
  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext("2d"); // ✅
  }
}

// Pitfall 8: Double casting
function badDoubleCast(value: string) {
  return value as unknown as number; // ❌ Vẫn là string tại runtime
}

// Pitfall 9: Casting với union types
function badUnionCast(value: string | number) {
  const str = value as string; // ❌ Có thể là number
  console.log(str.toUpperCase()); // ❌ Runtime error nếu value là number
}

// Fix: Dùng type guards
function goodUnionCast(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅
  }
}
```

### Best Practices:

```typescript
// ✅ Validate trước khi cast
function safeCast<T>(value: unknown, guard: (v: unknown) => v is T): T {
  if (guard(value)) {
    return value;
  }
  throw new Error(`Invalid value: ${value}`);
}

// ✅ Dùng type guards thay vì cast khi có thể
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ TypeScript tự narrow
  }
  return value.toFixed(2);
}

// ✅ Dùng assertion functions cho validation
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Value is not a string: ${value}`);
  }
}

function processUnknown(value: unknown) {
  assertIsString(value);
  console.log(value.toUpperCase()); // ✅ TypeScript biết value là string
}

// ✅ Dùng zod hoặc yup cho runtime validation
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

function parseUser(data: unknown): User {
  return UserSchema.parse(data); // ✅ Runtime validation + type inference
}

// ✅ Dùng non-null assertion sau khi validate
function processOptional(value: string | null) {
  if (value !== null) {
    console.log(value.length); // ✅ TypeScript tự narrow, không cần !
  }
}

// ✅ Dùng const assertions cho literal types
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;

// ❌ Không nên cast khi có thể dùng type guards
// ❌ Không nên cast unknown data từ API mà không validate
// ❌ Không nên dùng non-null assertion với user input
// ❌ Không nên double cast để bypass type checking
// ❌ Không nên cast DOM elements mà không validate

// ✅ Tạo helper functions cho common casts
function assertDefined<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
  return value;
}

function assertHTMLElement(element: unknown): HTMLElement {
  if (element instanceof HTMLElement) {
    return element;
  }
  throw new Error("Value is not an HTMLElement");
}
```

---

## Tổng kết

### Best Practices chung cho Type Assertions

1. **Ưu tiên type guards over type assertions**: Type guards an toàn hơn vì có runtime check
2. **Validate trước khi assert**: Luôn validate data trước khi dùng type assertions
3. **Dùng `as const` cho literal types**: Khi cần giữ nguyên literal values
4. **Cẩn thận với non-null assertion**: Chỉ dùng khi chắc chắn value không null/undefined
5. **Tránh double casting**: Double casting thường là code smell

### Anti-patterns cần tránh

```typescript
// ❌ Dùng type assertions thay vì type guards
function bad(value: string | number) {
  const str = value as string;
  return str.toUpperCase();
}

// ✅ Nên dùng type guards
function good(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return String(value);
}

// ❌ Non-null assertion với user input
function bad(input: string | undefined) {
  console.log(input!.toUpperCase());
}

// ✅ Nên validate
function good(input: string | undefined) {
  if (input) {
    console.log(input.toUpperCase());
  }
}

// ❌ Cast API response mà không validate
async function badFetch() {
  const response = await fetch("/api/data");
  return (await response.json()) as User; // ❌ Không validate
}

// ✅ Nên validate
async function goodFetch() {
  const response = await fetch("/api/data");
  const data = await response.json();
  if (isValidUser(data)) {
    return data;
  }
  throw new Error("Invalid data");
}

// ❌ Double casting
const bad = value as unknown as string; // ❌ Bypass type checking

// ✅ Nên validate đúng cách
if (typeof value === "string") {
  const str = value; // ✅ TypeScript tự narrow
}
```

### Khi nào nên dùng Type Assertions

| Tình huống       | Nên dùng                 |
| ---------------- | ------------------------ |
| DOM elements     | `as HTMLCanvasElement`   |
| API responses    | Sau khi validate runtime |
| Union types      | Khi type guards không đủ |
| Unknown types    | Sau khi validate         |
| Const assertions | Cho literal types        |

### Khi nào KHÔNG NÊN dùng Type Assertions

| Tình huống              | Không nên dùng           |
| ----------------------- | ------------------------ |
| Type guards có thể dùng | Dùng type guards thay vì |
| User input              | Luôn validate            |
| API responses           | Validate trước khi cast  |
| Unknown data            | Luôn validate            |
| Double casting          | Tránh hoàn toàn          |

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [TypeScript Handbook - Non-null Assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
- [TypeScript Handbook - Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
- [TypeScript Deep Dive - Type Assertion](https://basarat.gitbook.io/typescript/type-system/type-assertion)

---

_Last updated: 2026-01-30_
