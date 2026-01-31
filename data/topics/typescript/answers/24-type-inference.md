# 24. Type Inference

## Tổng quan về Type Inference

### Mục đích của Type Inference / Purpose

**Type Inference** là khả năng của TypeScript tự động infer types từ giá trị được gán, giúp giảm số lượng type annotations cần thiết.

**Mục đích chính:**

- Tự động infer types từ values
- Giảm số lượng type annotations
- Code ngắn gọn hơn
- TypeScript hiểu types tốt hơn
- Better developer experience

### Khi nào cần hiểu về Type Inference / When to Use

Hiểu về Type Inference là cần thiết khi:

- Làm việc với TypeScript
- Viết code ngắn gọn hơn
- Hiểu TypeScript infer types như thế nào
- Debug type errors
- Optimize type annotations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Less Boilerplate**: Giảm type annotations
- **Cleaner Code**: Code ngắn gọn hơn
- **Type Safety**: TypeScript vẫn kiểm tra types
- **Better DX**: IntelliSense hoạt động tốt hơn
- **Flexibility**: TypeScript infer types thông minh

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| - Less boilerplate | Có thể infer sai types |
| - Cleaner code     | Learning curve         |
| - Type safety      | Debugging khó hơn      |
| - Better DX        | Performance impact nhỏ |

---

## Type inference là gì?

**Type inference** - Khả năng của TypeScript tự động infer types từ giá trị được gán.

### Mục đích / Purpose

Tự động infer types từ values để giảm type annotations.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                  |
| ----------------------- | ----------------------------- |
| - Variable declarations | Khi khai báo variables        |
| - Function returns      | TypeScript infer return types |
| - Array literals        | TypeScript infer array types  |
| - Object literals       | TypeScript infer object types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Less Annotations**: Giảm type annotations
- **Cleaner Code**: Code ngắn gọn hơn
- **Type Safety**: TypeScript vẫn kiểm tra types
- **Better DX**: IntelliSense hoạt động tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| - Less annotations | Có thể infer sai types |
| - Cleaner code     | Learning curve         |
| - Type safety      | Debugging khó hơn      |
| - Better DX        | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Type inference với variables
const name = "Alice"; // Type: string
const age = 30; // Type: number
const isActive = true; // Type: boolean

// Ví dụ: Type inference với arrays
const numbers = [1, 2, 3]; // Type: number[]
const strings = ["a", "b", "c"]; // Type: string[]
const mixed = [1, "a", true]; // Type: (string | number | boolean)[]

// Ví dụ: Type inference với objects
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
}; // Type: { id: number; name: string; email: string; }

// Ví dụ: Type inference với functions
function add(a: number, b: number) {
  return a + b; // TypeScript infer return type là number
}

const sum = add(1, 2); // Type: number

// Ví dụ: Type inference với arrow functions
const multiply = (a: number, b: number) => a * b;
// TypeScript infer type là (a: number, b: number) => number

// Ví dụ: Type inference với destructuring
const [first, second] = [1, 2]; // first: number, second: number
const { id, name } = { id: 1, name: "Alice" }; // id: number, name: string

// Ví dụ thực tế: API response
const response = {
  success: true,
  data: {
    id: 1,
    name: "Alice",
  },
};

// TypeScript infer type:
// {
//   success: boolean;
//   data: { id: number; name: string; };
// }
```

### Best Practices:

```typescript
// ✅ Dùng type inference cho simple cases
const name = "Alice"; // TypeScript infer: string
const age = 30; // TypeScript infer: number

// ✅ Dùng type inference cho arrays
const numbers = [1, 2, 3]; // TypeScript infer: number[]

// ✅ Dùng type inference cho objects
const user = {
  id: 1,
  name: "Alice",
}; // TypeScript infer: { id: number; name: string; }

// ✅ Dùng type inference cho functions
function add(a: number, b: number) {
  return a + b; // TypeScript infer return type là number
}

// ❌ Không nên dùng type inference cho complex cases
const complex = {
  // TypeScript có thể infer sai types
  data: JSON.parse('{"id": 1, "name": "Alice"}'),
};

// ✅ Nên dùng type annotations cho complex cases
const complex: {
  data: { id: number; name: string };
} = {
  data: JSON.parse('{"id": 1, "name": "Alice"}'),
};
```

---

## Contextual typing?

**Contextual typing** - TypeScript infer types dựa trên context nơi value được sử dụng.

### Mục đích / Purpose

Infer types dựa trên context nơi value được sử dụng.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                      |
| --------------------- | --------------------------------- |
| - Function parameters | TypeScript infer types từ context |
| - Array literals      | TypeScript infer types từ context |
| - Object literals     | TypeScript infer types từ context |
| - Destructuring       | TypeScript infer types từ context |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context-aware**: TypeScript hiểu context
- **Less Annotations**: Giảm type annotations
- **Type Safety**: TypeScript vẫn kiểm tra types
- **Better DX**: IntelliSense hoạt động tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| - Context-aware    | Có thể confusing       |
| - Less annotations | Learning curve         |
| - Type safety      | Debugging khó hơn      |
| - Better DX        | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Contextual typing với function parameters
function processUser(user: { id: number; name: string }) {
  console.log(user.id, user.name);
}

processUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com", // ✅ OK, extra property được phép
});

// Ví dụ: Contextual typing với array literals
function processNumbers(numbers: number[]) {
  numbers.forEach((n) => console.log(n));
}

processNumbers([1, 2, 3]); // TypeScript infer: number[]

// Ví dụ: Contextual typing với object literals
interface User {
  id: number;
  name: string;
}

function createUser(user: User) {
  console.log(user.id, user.name);
}

createUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com", // ✅ OK, excess property check
});

// Ví dụ: Contextual typing với destructuring
function processUser({ id, name }: { id: number; name: string }) {
  console.log(id, name);
}

const user = { id: 1, name: "Alice", email: "alice@example.com" };
processUser(user); // ✅ OK

// Ví dụ thực tế: Window.addEventListener
window.addEventListener("click", (event) => {
  // TypeScript infer event là MouseEvent
  console.log(event.clientX, event.clientY);
});

// Ví dụ thực tế: Array methods
const numbers = [1, 2, 3];

numbers.forEach((n) => {
  // TypeScript infer n là number
  console.log(n.toFixed(2));
});

// Ví dụ thực tế: Promise.then
Promise.resolve(42).then((value) => {
  // TypeScript infer value là number
  console.log(value.toFixed(2));
});
```

### Best Practices:

```typescript
// ✅ Dùng contextual typing với function parameters
function processUser(user: { id: number; name: string }) {
  console.log(user.id, user.name);
}

processUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com", // ✅ OK
});

// ✅ Dùng contextual typing với array methods
const numbers = [1, 2, 3];
numbers.forEach((n) => {
  console.log(n.toFixed(2)); // TypeScript infer n là number
});

// ✅ Dùng contextual typing với destructuring
function processUser({ id, name }: { id: number; name: string }) {
  console.log(id, name);
}

// ❌ Không nên dùng contextual typing khi không rõ ràng
function badExample(data: any) {
  // TypeScript không thể infer types
  console.log(data.id);
}

// ✅ Nên dùng type annotations khi context không rõ ràng
function goodExample(data: { id: number; name: string }) {
  console.log(data.id, data.name);
}
```

---

## Control flow analysis?

**Control flow analysis** - TypeScript phân tích code flow để infer types chính xác hơn.

### Mục đích / Purpose

Phân tích code flow để infer types chính xác hơn.

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                              |
| ------------------------ | ----------------------------------------- |
| - Type guards            | TypeScript narrow types sau checks        |
| - Conditional statements | TypeScript infer types trong branches     |
| - Loops                  | TypeScript infer types trong loops        |
| - Try-catch              | TypeScript infer types trong catch blocks |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Narrowing**: Narrow types dựa trên control flow
- **Better Inference**: Infer types chính xác hơn
- **Type Safety**: TypeScript kiểm tra types tốt hơn
- **Better DX**: IntelliSense hoạt động tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| - Type narrowing   | Learning curve         |
| - Better inference | Có thể phức tạp        |
| - Type safety      | Debugging khó hơn      |
| - Better DX        | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Control flow analysis với type guards
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript biết value là string ở đây
    console.log(value.toUpperCase()); // ✅ OK
  } else {
    // TypeScript biết value là number ở đây
    console.log(value.toFixed(2)); // ✅ OK
  }
}

// Ví dụ: Control flow analysis với null checks
function processUser(user: { id: number; name: string | null }) {
  if (user.name !== null) {
    // TypeScript biết user.name là string ở đây
    console.log(user.name.toUpperCase()); // ✅ OK
  }
}

// Ví dụ: Control flow analysis với instanceof
function processEvent(event: Event) {
  if (event instanceof MouseEvent) {
    // TypeScript biết event là MouseEvent ở đây
    console.log(event.clientX, event.clientY); // ✅ OK
  } else if (event instanceof KeyboardEvent) {
    // TypeScript biết event là KeyboardEvent ở đây
    console.log(event.key); // ✅ OK
  }
}

// Ví dụ: Control flow analysis với loops
function processItems(items: (string | number)[]) {
  for (const item of items) {
    if (typeof item === "string") {
      // TypeScript biết item là string ở đây
      console.log(item.toUpperCase()); // ✅ OK
    } else {
      // TypeScript biết item là number ở đây
      console.log(item.toFixed(2)); // ✅ OK
    }
  }
}

// Ví dụ thực tế: API response handling
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  if (response.status === "success") {
    // TypeScript biết response có data ở đây
    console.log(response.data); // ✅ OK
  } else {
    // TypeScript biết response có error ở đây
    console.log(response.error); // ✅ OK
  }
}

// Ví dụ thực tế: Discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function getResult<T>(result: Result<T>): T | null {
  if (result.status === "success") {
    // TypeScript biết result có data ở đây
    return result.data; // ✅ OK
  }
  return null;
}
```

### Best Practices:

```typescript
// ✅ Dùng control flow analysis với type guards
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ TypeScript biết value là string
  }
}

// ✅ Dùng control flow analysis với null checks
function processUser(user: { id: number; name: string | null }) {
  if (user.name !== null) {
    console.log(user.name.toUpperCase()); // ✅ TypeScript biết user.name là string
  }
}

// ✅ Dùng control flow analysis với instanceof
function processEvent(event: Event) {
  if (event instanceof MouseEvent) {
    console.log(event.clientX, event.clientY); // ✅ TypeScript biết event là MouseEvent
  }
}

// ✅ Dùng control flow analysis với discriminated unions
function handleResponse<T>(response: ApiResponse<T>) {
  if (response.status === "success") {
    console.log(response.data); // ✅ TypeScript biết response có data
  }
}

// ❌ Không nên dùng type assertions thay vì control flow analysis
function badExample(value: string | number) {
  const str = value as string; // ❌ Không an toàn
  console.log(str.toUpperCase());
}

// ✅ Nên dùng type guards
function goodExample(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ An toàn
  }
}
```

---

## Widening vs Narrowing?

**Widening vs Narrowing** - TypeScript có thể widen (mở rộng) hoặc narrow (thu hẹp) types dựa trên context.

### Mục đích / Purpose

Hiểu TypeScript widen và narrow types như thế nào.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                |
| ----------------- | --------------------------- |
| - Widening        | Khi TypeScript widen types  |
| - Narrowing       | Khi TypeScript narrow types |
| - Type guards     | Khi cần narrow types        |
| - Type assertions | Khi cần override inference  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Understand Inference**: Hiểu TypeScript infer types
- **Type Safety**: TypeScript kiểm tra types tốt hơn
- **Better DX**: IntelliSense hoạt động tốt hơn
- **Debug Types**: Debug type errors dễ hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm             |
| ---------------------- | ---------------------- |
| - Understand inference | Learning curve         |
| - Type safety          | Có thể confusing       |
| - Better DX            | Debugging khó hơn      |
| - Debug types          | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ: Widening
let value = "hello"; // Type: string (widened từ literal)
value = "world"; // ✅ OK

// Ví dụ: Narrowing với const
const constValue = "hello"; // Type: "hello" (narrowed)
// constValue = "world"; // ❌ Error: Cannot assign to '"hello"'

// Ví dụ: Narrowing với type guards
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript narrow value từ string | number thành string
    console.log(value.toUpperCase()); // ✅ OK
  }
}

// Ví dụ: Widening với variable declarations
let value = 42; // Type: number (widened từ literal)
value = 100; // ✅ OK

// Ví dụ: Narrowing with instanceof
function processEvent(event: Event) {
  if (event instanceof MouseEvent) {
    // TypeScript narrow event từ Event thành MouseEvent
    console.log(event.clientX, event.clientY); // ✅ OK
  }
}

// Ví dụ thực tế: Widening với function parameters
function processValue(value: string) {
  // value được widened từ literal thành string
  console.log(value.toUpperCase()); // ✅ OK
}

processValue("hello"); // ✅ OK

// Ví dụ thực tế: Narrowing with discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    // TypeScript narrow result từ Result<T> thành Success<T>
    console.log(result.data); // ✅ OK
  }
}

// Ví dụ thực tế: Widening với array methods
const numbers = [1, 2, 3]; // Type: number[]

numbers.forEach((n) => {
  // n được widened từ number (literal) thành number
  console.log(n.toFixed(2)); // ✅ OK
});
```

### Best Practices:

```typescript
// ✅ Dùng const để narrow types
const value = "hello"; // Type: "hello"

// ✅ Dùng type guards để narrow types
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ TypeScript narrow value thành string
  }
}

// ✅ Dùng as const để narrow types
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const; // Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; }

// ✅ Dùng type assertions khi cần override inference
const value = 42 as const; // Type: 42 (narrowed)

// ❌ Không nên dùng type assertions để bypass type checks
function badExample(value: unknown) {
  const str = value as string; // ❌ Không an toàn
  console.log(str.toUpperCase());
}

// ✅ Nên dùng type guards
function goodExample(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ An toàn
  }
}
```

---

## Common type inference pitfalls?

**Common type inference pitfalls** - Các lỗi phổ biến khi TypeScript infer types sai.

### Mục đích / Purpose

Hiểu các lỗi phổ biến khi TypeScript infer types sai.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                        |
| -------------------- | ----------------------------------- |
| - Debug type errors  | Khi TypeScript infer sai types      |
| - Avoid pitfalls     | Tránh các lỗi phổ biến              |
| - Better annotations | Dùng type annotations khi cần thiết |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Avoid Errors**: Tránh type errors
- **Better Code**: Code chính xác hơn
- **Type Safety**: TypeScript kiểm tra types tốt hơn
- **Better DX**: IntelliSense hoạt động tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm             |
| -------------- | ---------------------- |
| - Avoid errors | Learning curve         |
| - Better code  | Có thể verbose         |
| - Type safety  | Debugging khó hơn      |
| - Better DX    | Performance impact nhỏ |

### Ví dụ:

```typescript
// Pitfall 1: Widening literals
let value = "hello"; // Type: string (widened)
value = 42; // ❌ Runtime error, nhưng TypeScript không bắt được

// Fix: Dùng const hoặc type annotations
const constValue = "hello"; // Type: "hello"
const typedValue: string = "hello"; // Type: string

// Pitfall 2: Any type inference
const data = JSON.parse('{"id": 1, "name": "Alice"}');
// Type: any (TypeScript không thể infer từ JSON.parse)

// Fix: Dùng type annotations
const data: { id: number; name: string } = JSON.parse(
  '{"id": 1, "name": "Alice"}',
);

// Pitfall 3: Array element type inference
const numbers = [1, "2", 3]; // Type: (string | number)[]

// Fix: Dùng type annotations
const numbers: number[] = [1, 2, 3];

// Pitfall 4: Object literal excess property checks
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com", // ❌ Error: excess property
};

// Fix: Dùng type assertion hoặc excess property checks
const user2 = {
  id: 1,
  name: "Alice",
  email: "alice@example.com", // ✅ OK
} as User;

// Pitfall 5: Function return type inference
function add(a: number, b: number) {
  return (a + b) as any; // ❌ TypeScript infer return type là any
}

// Fix: Dùng type annotations hoặc return type
function add2(a: number, b: number): number {
  return a + b; // ✅ TypeScript infer return type là number
}

// Pitfall 6: Contextual typing with wrong types
function processUser(user: { id: number; name: string }) {
  console.log(user.email); // ❌ Error: Property 'email' does not exist
}

// Fix: Dùng đúng types
function processUser2(user: { id: number; name: string; email: string }) {
  console.log(user.email); // ✅ OK
}

// Ví dụ thực tế: Async function return type inference
async function fetchData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data; // TypeScript infer return type là Promise<any>
}

// Fix: Dùng type annotations
async function fetchData2(): Promise<{ id: number; name: string }> {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data; // ✅ TypeScript infer return type là Promise<{ id: number; name: string }>
}
```

### Best Practices:

```typescript
// ✅ Dùng const để narrow literal types
const value = "hello"; // Type: "hello"

// ✅ Dùng type annotations khi TypeScript không infer đúng
const data: { id: number; name: string } = JSON.parse(
  '{"id": 1, "name": "Alice"}',
);

// ✅ Dùng type annotations cho function return types
function add(a: number, b: number): number {
  return a + b; // ✅ TypeScript infer return type là number
}

// ✅ Dùng type annotations cho async functions
async function fetchData(): Promise<{ id: number; name: string }> {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data; // ✅ TypeScript infer return type là Promise<{ id: number; name: string }>
}

// ✅ Dùng as const để narrow object types
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const; // Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; }

// ❌ Không nên để TypeScript infer any types
const data = JSON.parse('{"id": 1, "name": "Alice"}'); // Type: any

// ✅ Nên dùng type annotations
const data2: { id: number; name: string } = JSON.parse(
  '{"id": 1, "name": "Alice"}',
);
```

---

## Tổng kết

### Bảng so sánh Type Inference Features

| Feature               | Mô tả                      | Use Case              |
| --------------------- | -------------------------- | --------------------- |
| Basic inference       | Infer types từ values      | Variable declarations |
| Contextual typing     | Infer types từ context     | Function parameters   |
| Control flow analysis | Narrow types dựa trên flow | Type guards           |
| Widening              | Mở rộng types              | Variable declarations |
| Narrowing             | Thu hẹp types              | Type guards, const    |

### Khi nào nên dùng Type Inference

| Tình huống    | Nên dùng                    |
| ------------- | --------------------------- |
| Simple cases  | ✅ Dùng inference           |
| Complex cases | ✅ Dùng type annotations    |
| Type guards   | ✅ Dùng để narrow types     |
| Literal types | ✅ Dùng const hoặc as const |

### Best Practices chung cho Type Inference

1. **Dùng inference cho simple cases**: Giảm type annotations khi có thể
2. **Dùng type annotations cho complex cases**: Khi TypeScript không infer đúng
3. **Dùng type guards để narrow types**: Narrow types dựa trên checks
4. **Dùng const để narrow literals**: Giữ literal types khi cần thiết
5. **Avoid any types**: Tránh TypeScript infer any types

### Anti-patterns cần tránh

```typescript
// ❌ Dùng type assertions thay vì type guards
function badExample(value: string | number) {
  const str = value as string; // ❌ Không an toàn
  console.log(str.toUpperCase());
}

// ✅ Nên dùng type guards
function goodExample(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ An toàn
  }
}

// ❌ Để TypeScript infer any types
const data = JSON.parse('{"id": 1, "name": "Alice"}'); // Type: any

// ✅ Nên dùng type annotations
const data2: { id: number; name: string } = JSON.parse(
  '{"id": 1, "name": "Alice"}',
);

// ❌ Dùng type assertions để bypass type checks
const user = { id: 1, name: "Alice", email: "test" } as User; // ❌ Bypass checks

// ✅ Nên dùng đúng types
interface UserWithEmail {
  id: number;
  name: string;
  email: string;
}

const user2: UserWithEmail = { id: 1, name: "Alice", email: "test" }; // ✅ Đúng types
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- [TypeScript Handbook - Type Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Deep Dive - Type Inference](https://basarat.gitbook.io/typescript/type-system/typeInference)
- [TypeScript - Control Flow Analysis](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

_Last updated: 2026-01-30_
