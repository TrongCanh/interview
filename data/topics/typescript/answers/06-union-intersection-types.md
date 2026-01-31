# 6. Union & Intersection Types

## Tổng quan về Union & Intersection Types

### Mục đích của Union & Intersection Types / Purpose

**Union & Intersection Types** là hai cách để combine types trong TypeScript.

**Mục đích chính:**

- Union types (`|`): Value có thể là một trong nhiều types
- Intersection types (`&`): Value phải thỏa mãn tất cả types
- Flexible type definitions
- Type safety với complex scenarios

### Khi nào cần hiểu về Union & Intersection Types / When to Use

Hiểu về Union & Intersection Types là cần thiết khi:

- Value có thể là nhiều types khác nhau
- Combine multiple types vào một
- Type check complex scenarios
- Work với polymorphic data
- Create flexible APIs

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Flexible type definitions
- **Type Safety**: Type check complex scenarios
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về possible types
- **Polymorphism**: Support polymorphic behavior

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm           |
| ------------ | -------------------- |
| Flexibility  | Verbose hơn          |
| Type safety  | Learning curve       |
| Better DX    | Cần understand types |
| Polymorphism | Có thể complex       |

---

## Union types (`|`) là gì?

**Union types** - Type có thể là một trong nhiều types.

### Mục đích / Purpose

Union types được dùng để:

- Định nghĩa types có thể là một trong nhiều types
- Type check polymorphic values
- Handle different scenarios
- Create flexible APIs

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                      |
| ----------------------- | --------------------------------- |
| Multiple possible types | Khi value có thể là nhiều types   |
| API responses           | Khi API có thể return nhiều types |
| Optional values         | Khi value có thể có hoặc không    |
| Polymorphic data        | Khi data có nhiều shapes          |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Hỗ trợ multiple types
- **Type safety**: Type check từng type
- **Better DX**: IntelliSense cho từng type
- **Documentation**: Rõ ràng về possible types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm            |
| ------------- | --------------------- |
| Flexibility   | Cần type guards       |
| Type safety   | Verbose hơn           |
| Better DX     | Learning curve        |
| Documentation | Cần understand unions |

### Ví dụ:

```typescript
// 1. Union type cơ bản
type ID = string | number;

const id1: ID = 123; // ✅ OK
const id2: ID = "abc"; // ✅ OK
// const id3: ID = true; // ❌ Error

// 2. Union type với primitives
type Value = string | number | boolean;

const value1: Value = "hello";
const value2: Value = 123;
const value3: Value = true;

// 3. Union type với objects
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

type Shape = Circle | Square;

const circle: Shape = { kind: "circle", radius: 10 };
const square: Shape = { kind: "square", side: 20 };

// 4. Union type với functions
type StringOrNumberFunc = (value: string | number) => string;

const func1: StringOrNumberFunc = (value) => value.toString();
const func2: StringOrNumberFunc = (value) => String(value);

// 5. Union type với arrays
type StringOrNumberArray = string[] | number[];

const arr1: StringOrNumberArray = ["a", "b", "c"];
const arr2: StringOrNumberArray = [1, 2, 3];

// 6. Union type với optional properties
interface User {
  id: number;
  name: string;
  email?: string; // string | undefined
}

// 7. Union type với null/undefined
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

const nullableString: Nullable<string> = null;
const optionalString: Optional<string> = undefined;

// 8. Union type narrowing với typeof
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value: string
  } else {
    console.log(value.toFixed(2)); // value: number
  }
}

// 9. Union type narrowing với instanceof
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // animal: Dog
  } else {
    animal.meow(); // animal: Cat
  }
}

// 10. Union type với discriminated unions
interface Success {
  status: "success";
  data: string;
}

interface Error {
  status: "error";
  message: string;
}

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // result: Success
  } else {
    console.log(result.message); // result: Error
  }
}

// 11. Union type với literal types
type Direction = "up" | "down" | "left" | "right";

const direction: Direction = "up";

// 12. Union type với template literal types
type EventName = `on${Capitalize<string>}`;

const eventName: EventName = "onClick"; // ✅ OK
// const eventName2: EventName = 'click'; // ❌ Error

// 13. Union type với conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result1 = NonNullable<string | null>; // string
type Result2 = NonNullable<number | undefined>; // number

// 14. Union type với mapped types
type Partial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
// }

// 15. Union type với utility types
type ID = string | number;
type IDOrArray = ID | ID[];

const id: IDOrArray = 123;
const idArray: IDOrArray = [1, 2, 3];
```

### Best Practices:

1. **Use union types**: Dùng union types cho values có thể là nhiều types
2. **Type narrowing**: Dùng type guards để narrow union types
3. **Discriminated unions**: Dùng discriminated unions cho complex scenarios
4. **Literal types**: Dùng literal types cho specific values
5. **Avoid overly broad unions**: Hạn chế dùng unions quá rộng

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không type narrow trước khi dùng
function processValue(value: string | number) {
  console.log(value.toUpperCase()); // ❌ Error
}

// ✅ Nên: Type narrow trước khi dùng
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

// ❌ Không nên: Dùng any thay vì union
function processValue(value: any) {
  console.log(value);
}

// ✅ Nên: Dùng union types
function processValue(value: string | number) {
  console.log(value);
}
```

---

## Intersection types (`&`) là gì?

**Intersection types** - Type phải thỏa mãn tất cả types.

### Mục đích / Purpose

Intersection types được dùng để:

- Combine multiple types vào một
- Create composite types
- Mix multiple interfaces
- Type check complex objects

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng                                 |
| --------------- | -------------------------------------------- |
| Combine types   | Khi cần combine multiple types               |
| Mix interfaces  | Khi object cần implement multiple interfaces |
| Composite types | Khi type là composite của nhiều types        |
| Utility types   | Khi tạo utility types                        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Combination**: Combine multiple types
- **Type safety**: Type check tất cả types
- **Better DX**: IntelliSense cho tất cả types
- **Composition**: Support composition patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm                   |
| ----------- | ---------------------------- |
| Combination | Có thể conflicts             |
| Type safety | Verbose hơn                  |
| Better DX   | Learning curve               |
| Composition | Cần understand intersections |

### Ví dụ:

```typescript
// 1. Intersection type cơ bản
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30,
};

// 2. Intersection type với interfaces
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

type Duck = Flyable & Swimmable;

const duck: Duck = {
  fly() {
    console.log("Flying");
  },
  swim() {
    console.log("Swimming");
  },
};

// 3. Intersection type với objects
type Employee = {
  id: number;
  name: string;
};

type Manager = {
  department: string;
  reports: Employee[];
};

type ManagerEmployee = Employee & Manager;

const manager: ManagerEmployee = {
  id: 1,
  name: "John",
  department: "Engineering",
  reports: [
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ],
};

// 4. Intersection type với utility types
type ReadonlyPerson = Readonly<Person>;
// ReadonlyPerson = {
//   readonly name: string;
//   readonly age: number;
// }

// 5. Intersection type với conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>; // string

// 6. Intersection type với mapped types
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};

type PartialRequired = Partial<Person> & Required<Partial<Person>>;
// PartialRequired = {
//   name: string;
//   age: number;
// }

// 7. Intersection type với brand types
type USD = number & { readonly __brand: unique symbol };
type EUR = number & { readonly __brand: unique symbol };

const usd: USD = 100 as USD;
const eur: EUR = 100 as EUR;

// function convertUSDToEUR(amount: USD): EUR {
//   return (amount * 0.85) as EUR;
// }

// 8. Intersection type với mixins
type Constructor<T> = new (...args: any[]) => T;

function Timestamped<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);

const user = new TimestampedUser("John");
console.log(user.timestamp); // timestamp: number

// 9. Intersection type với pick/omit
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type PersonName = Pick<Person, "name">;
// PersonName = { name: string }

type PersonWithoutAge = Omit<Person, "age">;
// PersonWithoutAge = { name: string }

// 10. Intersection type với this types
interface State {
  setState(state: Partial<this>): void;
}

class Counter implements State {
  count = 0;

  setState(state: Partial<Counter>) {
    Object.assign(this, state);
  }
}

const counter = new Counter();
counter.setState({ count: 10 });

// 11. Intersection type với type guards
interface Bird {
  fly(): void;
  layEgg(): void;
}

interface Fish {
  swim(): void;
  layEgg(): void;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return "fly" in animal;
}

function move(animal: Bird | Fish) {
  if (isBird(animal)) {
    animal.fly(); // animal: Bird
  } else {
    animal.swim(); // animal: Fish
  }
}

// 12. Intersection type với never
type Impossible = string & number; // never

// 13. Intersection type với unknown
type UnknownIntersection = unknown & string; // string

// 14. Intersection type với any
type AnyIntersection = any & string; // any

// 15. Intersection type với same properties
interface A {
  name: string;
  age: number;
}

interface B {
  name: string;
  email: string;
}

type AB = A & B;
// AB = {
//   name: string;
//   age: number;
//   email: string;
// }
```

### Best Practices:

1. **Use intersection types**: Dùng intersection types để combine types
2. **Avoid conflicts**: Tránh conflicts khi intersect types
3. **Use utility types**: Dùng utility types như `Pick`, `Omit`
4. **Brand types**: Dùng brand types cho type-safe values
5. **Composition**: Dùng composition thay vì inheritance

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Intersection types với conflicts
interface A {
  name: string;
}

interface B {
  name: number;
}

type AB = A & B;
// AB = {
//   name: string & number; // never
// }

// ✅ Nên: Tránh conflicts hoặc rename properties
interface A {
  name: string;
}

interface B {
  displayName: number;
}

type AB = A & B;

// ❌ Không nên: Overly complex intersections
type Complex = A & B & C & D & E & F;

// ✅ Nên: Giữ intersections đơn giản
type Simple = A & B;
```

---

## Discriminated unions?

**Discriminated unions** - Union types với discriminant property để distinguish giữa các types.

### Mục đích / Purpose

Discriminated unions được dùng để:

- Distinguish giữa union types
- Type narrowing với discriminant
- Create type-safe state machines
- Handle polymorphic data

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng               |
| ---------------- | -------------------------- |
| Polymorphic data | Khi data có nhiều shapes   |
| State machines   | Khi có nhiều states        |
| API responses    | Khi API return nhiều types |
| Event handling   | Khi có nhiều event types   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type narrowing**: Easy type narrowing
- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense cho từng type
- **Exhaustive checking**: Đảm bảo handle tất cả cases

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                          |
| ------------------- | ----------------------------------- |
| Type narrowing      | Verbose hơn                         |
| Type safety         | Learning curve                      |
| Better DX           | Cần understand discriminated unions |
| Exhaustive checking | Có thể complex                      |

### Ví dụ:

```typescript
// 1. Discriminated union cơ bản
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return 0.5 * shape.base * shape.height;
  }
}

// 2. Discriminated union với exhaustive checking
function getAreaWithExhaustive(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// 3. Discriminated union với API responses
interface SuccessResponse {
  status: "success";
  data: {
    id: number;
    name: string;
  };
}

interface ErrorResponse {
  status: "error";
  error: {
    code: number;
    message: string;
  };
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data.name); // response: SuccessResponse
  } else {
    console.log(response.error.message); // response: ErrorResponse
  }
}

// 4. Discriminated union với state machines
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };

function render(state: State) {
  switch (state.status) {
    case "idle":
      return "Click to start";
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data}`;
    case "error":
      return `Error: ${state.error}`;
  }
}

// 5. Discriminated union với events
interface ClickEvent {
  type: "click";
  x: number;
  y: number;
}

interface KeyEvent {
  type: "keydown" | "keyup";
  key: string;
}

type UIEvent = ClickEvent | KeyEvent;

function handleEvent(event: UIEvent) {
  switch (event.type) {
    case "click":
      console.log(`Clicked at (${event.x}, ${event.y})`);
      break;
    case "keydown":
    case "keyup":
      console.log(`Key: ${event.key}`);
      break;
  }
}

// 6. Discriminated union với actions
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; value: number }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "set":
      return action.value;
    case "reset":
      return 0;
  }
}

// 7. Discriminated union với user roles
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User {
  role: "user";
  email: string;
}

interface Guest {
  role: "guest";
}

type Account = Admin | User | Guest;

function getPermissions(account: Account): string[] {
  switch (account.role) {
    case "admin":
      return account.permissions;
    case "user":
      return ["read"];
    case "guest":
      return [];
  }
}

// 8. Discriminated union với form states
type FormState =
  | { status: "pristine" }
  | { status: "dirty"; values: Record<string, unknown> }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; errors: Record<string, string> };

function renderForm(state: FormState) {
  switch (state.status) {
    case "pristine":
      return "Form is pristine";
    case "dirty":
      return `Form is dirty: ${JSON.stringify(state.values)}`;
    case "submitting":
      return "Submitting...";
    case "success":
      return "Success!";
    case "error":
      return `Errors: ${JSON.stringify(state.errors)}`;
  }
}

// 9. Discriminated union với network requests
type NetworkState =
  | { state: "loading" }
  | { state: "success"; data: string }
  | { state: "error"; error: Error };

function handleNetwork(state: NetworkState) {
  switch (state.state) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log(`Data: ${state.data}`);
      break;
    case "error":
      console.error(state.error.message);
      break;
  }
}

// 10. Discriminated union với navigation
type Route =
  | { path: "home" }
  | { path: "about" }
  | { path: "user"; userId: number }
  | { path: "post"; postId: number };

function navigate(route: Route) {
  switch (route.path) {
    case "home":
      console.log("Navigate to home");
      break;
    case "about":
      console.log("Navigate to about");
      break;
    case "user":
      console.log(`Navigate to user ${route.userId}`);
      break;
    case "post":
      console.log(`Navigate to post ${route.postId}`);
      break;
  }
}
```

### Best Practices:

1. **Use discriminant property**: Dùng discriminant property để distinguish types
2. **Exhaustive checking**: Dùng exhaustive checking để ensure handle tất cả cases
3. **Literal types**: Dùng literal types cho discriminant
4. **Switch statements**: Dùng switch statements để handle discriminated unions
5. **Type narrowing**: TypeScript sẽ tự narrow types với discriminant

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không dùng discriminant property
interface Circle {
  radius: number;
}

interface Square {
  side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  // Không thể narrow types mà không discriminant
}

// ✅ Nên: Dùng discriminant property
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
  }
}
```

---

## Type narrowing với union types?

**Type narrowing** - Quá trình reduce union types xuống specific types.

### Mục đích / Purpose

Type narrowing được dùng để:

- Reduce union types xuống specific types
- Enable type-safe operations
- Improve IntelliSense
- Catch errors tại compile time

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                 |
| ----------------- | ---------------------------- |
| Union types       | Khi cần narrow union types   |
| Type guards       | Khi cần check types          |
| Conditional logic | Khi logic phụ thuộc vào type |
| Polymorphic data  | Khi xử lý polymorphic data   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense tốt hơn sau narrowing
- **Safer code**: Giảm runtime errors
- **Clear intent**: Rõ ràng về type checks

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm               |
| ------------ | ------------------------ |
| Type safety  | Verbose hơn              |
| Better DX    | Learning curve           |
| Safer code   | Cần understand narrowing |
| Clear intent | Có thể overkill          |

### Ví dụ:

```typescript
// 1. Type narrowing với typeof
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value: string
  } else {
    console.log(value.toFixed(2)); // value: number
  }
}

// 2. Type narrowing với instanceof
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // animal: Dog
  } else {
    animal.meow(); // animal: Cat
  }
}

// 3. Type narrowing với in operator
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // animal: Bird
  } else {
    animal.swim(); // animal: Fish
  }
}

// 4. Type narrowing với equality checks
type Status = "pending" | "approved" | "rejected";

function getStatusColor(status: Status): string {
  if (status === "pending") {
    return "yellow";
  } else if (status === "approved") {
    return "green";
  } else {
    return "red"; // status: 'rejected'
  }
}

// 5. Type narrowing với null checks
function getLength(str: string | null): number {
  if (str === null) {
    return 0;
  }
  return str.length; // str: string
}

// 6. Type narrowing với truthiness
function printLength(value: string | undefined) {
  if (value) {
    console.log(value.length); // value: string
  }
}

// 7. Type narrowing với type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value: string
  }
}

// 8. Type narrowing với discriminant
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
  }
}

// 9. Type narrowing với assignment
let value: string | number;

value = "hello";
console.log(value.toUpperCase()); // value: string

value = 123;
console.log(value.toFixed(2)); // value: number

// 10. Type narrowing với control flow analysis
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value: string
  } else if (typeof value === "number") {
    console.log(value.toFixed(2)); // value: number
  } else {
    console.log(value ? "true" : "false"); // value: boolean
  }
}

// 11. Type narrowing với Array.isArray
function processArrayOrString(value: string | string[]) {
  if (Array.isArray(value)) {
    console.log(value.join(", ")); // value: string[]
  } else {
    console.log(value.toUpperCase()); // value: string
  }
}

// 12. Type narrowing với optional chaining
interface User {
  id: number;
  name: string;
  address?: {
    city: string;
    country: string;
  };
}

function getCity(user: User): string | undefined {
  return user.address?.city;
}

// 13. Type narrowing với nullish coalescing
function getDisplayName(name: string | null | undefined): string {
  return name ?? "Anonymous";
}

// 14. Type narrowing với exhaustive checking
type Shape2 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getPerimeter(shape: Shape2): number {
  switch (shape.kind) {
    case "circle":
      return 2 * Math.PI * shape.radius;
    case "square":
      return 4 * shape.side;
    case "triangle":
      return shape.base + shape.side + shape.height; // ❌ Error (exhaustive check catches this)
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// 15. Type narrowing với custom type guards
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // pet: Fish
  } else {
    pet.fly(); // pet: Bird
  }
}
```

### Best Practices:

1. **Use type guards**: Dùng type guards để narrow types
2. **Type predicates**: Dùng type predicates cho custom type guards
3. **Discriminated unions**: Dùng discriminated unions cho complex scenarios
4. **Exhaustive checking**: Dùng exhaustive checking để ensure handle tất cả cases
5. **Control flow analysis**: Để TypeScript tự narrow types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Type assertion thay vì type narrowing
function processValue(value: string | number) {
  console.log((value as string).toUpperCase());
}

// ✅ Nên: Type narrowing
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

// ❌ Không nên: Không handle tất cả cases
function getStatusColor(status: Status): string {
  if (status === "pending") {
    return "yellow";
  } else if (status === "approved") {
    return "green";
  }
  // Quên handle 'rejected'
}

// ✅ Nên: Exhaustive checking
function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}
```

---

## Use cases thực tế?

**Use cases thực tế** - Các scenarios thực tế sử dụng union và intersection types.

### Ví dụ thực tế:

```typescript
// 1. API responses với union types
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: { code: number; message: string } };

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();

  if (response.ok) {
    return { status: 'success', data };
  } else {
    return { status: 'error', error: data };
  }
}

// 2. Form validation với intersection types
type Validated<T> = {
  [K in keyof T]: T[K] | { error: string };
};

interface UserForm {
  name: string;
  email: string;
  age: number;
}

type ValidatedUserForm = Validated<UserForm>;

// 3. Event handling với discriminated unions
type UIEvent =
  | { type: 'click'; x: number; y: number }
  | { type: 'keydown'; key: string }
  | { type: 'scroll'; scrollTop: number };

function handleEvent(event: UIEvent) {
  switch (event.type) {
    case 'click':
      console.log(`Clicked at (${event.x}, ${event.y})`);
      break;
    case 'keydown':
      console.log(`Key pressed: ${event.key}`);
      break;
    case 'scroll':
      console.log(`Scrolled to ${event.scrollTop}`);
      break;
  }
}

// 4. State management với union types
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'fetch':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', data: action.users };
    case 'error':
      return { status: 'error', error: action.message };
    default:
      return state;
  }
}

// 5. Component props với intersection types
interface BaseProps {
  className?: string;
  id?: string;
}

interface ButtonProps extends BaseProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return <button onClick={onClick} {...props}>{children}</button>;
};

// 6. Configuration với intersection types
type BaseConfig = {
  apiUrl: string;
  timeout: number;
};

type AuthConfig = BaseConfig & {
  apiKey: string;
  secret: string;
};

const config: AuthConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  apiKey: 'abc123',
  secret: 'xyz789'
};

// 7. Database models với union types
type User = {
  id: number;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type Entity = User | Product;

function getEntity(id: number, type: 'user' | 'product'): Entity {
  if (type === 'user') {
    return { id, name: 'John', email: 'john@example.com' };
  } else {
    return { id, name: 'Product', price: 99.99 };
  }
}

// 8. Type-safe event emitters với intersection types
type EventEmitter<T extends Record<string, any>> = {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
};

type AppEvents = {
  userLoggedIn: { userId: number; name: string };
  userLoggedOut: { userId: number };
  dataUpdated: { data: string };
};

const emitter: EventEmitter<AppEvents> = {
  on(event, listener) {
    // implementation
  },
  emit(event, data) {
    // implementation
  }
};

emitter.emit('userLoggedIn', { userId: 1, name: 'John' });
emitter.on('userLoggedOut', (data) => {
  console.log(`User ${data.userId} logged out`);
});

// 9. Brand types với intersection types
type USD = number & { readonly __brand: 'USD' };
type EUR = number & { readonly __brand: 'EUR' };

function usd(value: number): USD {
  return value as USD;
}

function eur(value: number): EUR {
  return value as EUR;
}

function convertUSDToEUR(amount: USD): EUR {
  return (amount * 0.85) as EUR;
}

const price = usd(100);
const priceInEUR = convertUSDToEUR(price);

// 10. Middleware composition với intersection types
type Middleware<T> = (context: T, next: () => void) => void;

type Context = {
  request: Request;
  response: Response;
  user?: { id: number; name: string };
};

type AuthenticatedContext = Context & {
  user: { id: number; name: string };
};

const authMiddleware: Middleware<Context> = (context, next) => {
  const token = context.request.headers.get('Authorization');
  if (token) {
    context.user = { id: 1, name: 'John' };
  }
  next();
};

const loggerMiddleware: Middleware<Context> = (context, next) => {
  console.log(`Request: ${context.request.url}`);
  next();
};

// 11. Plugin system với intersection types
interface Plugin {
  name: string;
  version: string;
}

interface AuthPlugin extends Plugin {
  authenticate(): boolean;
}

interface CachePlugin extends Plugin {
  get(key: string): any;
  set(key: string, value: any): void;
}

type AppPlugin = AuthPlugin | CachePlugin;

function loadPlugin(plugin: AppPlugin) {
  console.log(`Loading plugin: ${plugin.name} v${plugin.version}`);

  if ('authenticate' in plugin) {
    plugin.authenticate();
  } else if ('get' in plugin) {
    const value = plugin.get('key');
  }
}

// 12. Type-safe routes với discriminated unions
type Route =
  | { path: '/'; component: 'Home' }
  | { path: '/about'; component: 'About' }
  | { path: '/users/:id'; component: 'UserDetail'; params: { id: string } }
  | { path: '/posts/:id'; component: 'PostDetail'; params: { id: string } };

function renderRoute(route: Route) {
  switch (route.path) {
    case '/':
      return <Home />;
    case '/about':
      return <About />;
    case '/users/:id':
      return <UserDetail userId={route.params.id} />;
    case '/posts/:id':
      return <PostDetail postId={route.params.id} />;
  }
}
```

---

## Best Practices cho Union & Intersection Types

### 1. Use Union Types cho Multiple Possible Types

Dùng union types cho values có thể là nhiều types:

```typescript
// ✅ Nên
type ID = string | number;
```

### 2. Use Intersection Types để Combine Types

Dùng intersection types để combine multiple types:

```typescript
// ✅ Nên
type Person = HasName & HasAge;
```

### 3. Use Discriminated Unions cho Complex Scenarios

Dùng discriminated unions cho complex scenarios:

```typescript
// ✅ Nên
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
```

### 4. Use Type Guards để Narrow Types

Dùng type guards để narrow union types:

```typescript
// ✅ Nên
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

### 5. Use Exhaustive Checking

Dùng exhaustive checking để ensure handle tất cả cases:

```typescript
// ✅ Nên
function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}
```

---

## Anti-patterns cần tránh

### 1. Using Any Instead of Union Types

```typescript
// ❌ Không nên
function processValue(value: any) {
  console.log(value);
}

// ✅ Nên
function processValue(value: string | number) {
  console.log(value);
}
```

### 2. Not Narrowing Types

```typescript
// ❌ Không nên
function processValue(value: string | number) {
  console.log(value.toUpperCase());
}

// ✅ Nên
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

---

_References:_

- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
- [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
