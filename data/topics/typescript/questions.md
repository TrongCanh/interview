# TypeScript Interview Questions / Câu hỏi Phỏng vấn TypeScript

> Danh sách câu hỏi phỏng vấn về TypeScript / List of TypeScript interview questions

---

## 📚 Cơ bản / Basics

### 1. TypeScript Fundamentals

- TypeScript là gì? Tại sao nên dùng TypeScript?
- TypeScript và JavaScript khác nhau như thế nào?
- TypeScript được compile như thế nào?
- Static typing là gì? Lợi ích của nó?
- Type inference trong TypeScript hoạt động như thế nào?

### 2. Installation & Configuration

- Cách cài đặt TypeScript?
- `tsconfig.json` là gì? Các cấu hình quan trọng?
- `target`, `module`, `lib` trong tsconfig?
- `strict` mode là gì? Tại sao nên dùng?
- `outDir`, `rootDir`, `include`, `exclude`?

---

## 🔤 Types / Kiểu dữ liệu

### 3. Basic Types

- Các basic types trong TypeScript?
- `any` vs `unknown`?
- `never` type là gì? Khi nào dùng?
- `void` type là gì?
- `null` và `undefined` trong TypeScript?

### 4. Object Types

- Interface vs Type alias?
- Optional properties (`?`)?
- Readonly properties?
- Index signatures?
- Mapped types?

### 5. Array & Tuple

- Array types trong TypeScript?
- Tuple là gì? Use cases?
- Readonly array?
- Array methods với types?

### 6. Union & Intersection Types

- Union types (`|`) là gì?
- Intersection types (`&`) là gì?
- Discriminated unions?
- Type narrowing với union types?
- Use cases thực tế?

---

## 🎯 Functions / Hàm

### 7. Function Types

- Function type annotations?
- Parameter types?
- Return type annotations?
- Optional parameters?
- Default parameters?

### 8. Arrow Functions

- Arrow function types?
- Function type expressions?
- Call signatures?
- Overload signatures?

### 9. Generics

- Generics là gì? Tại sao cần?
- Generic functions?
- Generic interfaces?
- Generic classes?
- Generic constraints?
- `extends` keyword trong generics?
- Type parameters với defaults?

### 10. Advanced Function Types

- Function overloads?
- Conditional types?
- Infer types?
- Utility types (`ReturnType`, `Parameters`, `ThisParameterType`)?

---

## 🏗️ Classes & OOP

### 11. Classes

- Class trong TypeScript?
- Access modifiers (`public`, `private`, `protected`)?
- Readonly modifier?
- Parameter properties?
- Abstract classes?
- Constructor signatures?

### 12. Inheritance

- `extends` keyword?
- `super` keyword?
- Method overriding?
- Polymorphism trong TypeScript?
- Implements interfaces?

### 13. Interfaces

- Interface là gì?
- Interface vs Type alias?
- Extending interfaces?
- Implementing interfaces?
- Merging interfaces?

---

## 🔧 Advanced Types

### 14. Type Guards

- Type guards là gì?
- `typeof` type guard?
- `instanceof` type guard?
- Custom type guards (`is` keyword)?
- Discriminated unions type guards?

### 15. Type Assertions

- Type assertions (`as` và `<>`)?
- Non-null assertion (`!`)?
- Const assertions?
- Type casting pitfalls?

### 16. Utility Types

- `Partial<T>`?
- `Required<T>`?
- `Readonly<T>`?
- `Record<K, T>`?
- `Pick<T, K>`?
- `Omit<T, K>`?
- `Exclude<T, U>`?
- `Extract<T, U>`?
- `NonNullable<T>`?
- `ReturnType<T>`?
- `Parameters<T>`?

### 17. Conditional Types

- Conditional types là gì?
- Distributive conditional types?
- `infer` keyword?
- Mapped types?
- Template literal types?

### 18. Template Literal Types

- Template literal types là gì?
- String manipulation types?
- `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`?
- Use cases thực tế?

---

## 📦 Modules & Namespaces

### 19. Modules

- ES Modules trong TypeScript?
- `import`, `export`?
- Default exports vs named exports?
- Re-exports?
- Dynamic imports?
- Type-only imports?

### 20. Namespaces

- Namespaces là gì?
- `namespace` keyword?
- Multi-file namespaces?
- Namespace vs Modules?

---

## 🛠️ Decorators

### 21. Decorators

- Decorators là gì?
- Class decorators?
- Method decorators?
- Property decorators?
- Parameter decorators?
- Decorator factories?
- Decorator metadata?
- `experimentalDecorators`?

---

## 🔍 Type Manipulation

### 22. Keyof & Lookup Types

- `keyof` operator?
- Lookup types?
- `keyof` với generics?
- `keyof` với mapped types?

### 23. Mapped Types

- Mapped types là gì?
- `[K in keyof T]`?
- `as` clause trong mapped types?
- Key remapping?

### 24. Type Inference

- Type inference là gì?
- Contextual typing?
- Control flow analysis?
- Widening vs Narrowing?
- Common type inference pitfalls?

---

## 🎨 Declaration Files

### 25. Declaration Files

- `.d.ts` files là gì?
- `declare` keyword?
- Ambient modules?
- `@types` packages?
- Writing declaration files?
- `moduleResolution`?

---

## 🌐 TypeScript with Frameworks

### 26. TypeScript with React

- Component props types?
- `FC` type?
- `React.FC` vs direct function?
- Event handler types?
- `useRef`, `useState`, `useEffect` với types?
- Generic components?

### 27. TypeScript with Node.js

- Express với TypeScript?
- Request/Response types?
- Route parameter types?
- Middleware types?
- Type-safe API routes?

---

## 🧪 Testing & Tooling

### 28. Testing

- Jest với TypeScript?
- Type-safe tests?
- Mocking với types?
- Testing Library với TypeScript?

### 29. Tooling

- ESLint với TypeScript?
- Prettier với TypeScript?
- TSLint (deprecated)?
- ts-jest, ts-node?
- Type checking in CI/CD?

---

## 📝 Best Practices

### 30. Best Practices

- When to use `any` vs `unknown`?
- Avoiding `any`?
- Type safety patterns?
- Naming conventions?
- Code organization?
- Type definition patterns?

---

## 🐛 Common Pitfalls

### 31. Common Errors

- Type errors thường gặp?
- `Object is of type 'unknown'`?
- `Property does not exist on type`?
- Type assertions misuse?
- Circular type references?
- `this` typing issues?

---

## 🔗 Resources / Tài liệu tham khảo

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

---

## 📊 Difficulty Levels / Mức độ khó

| Level / Mức độ                 | Topics / Chủ đề                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| ⭐ Basic / Cơ bản              | Basic Types, Functions, Interfaces, Classes                                         |
| ⭐⭐ Intermediate / Trung bình | Generics, Union/Intersection, Type Guards, Utility Types                            |
| ⭐⭐⭐ Advanced / Nâng cao     | Conditional Types, Mapped Types, Template Literal Types, Decorators                 |
| ⭐⭐⭐⭐ Expert / Chuyên gia   | Advanced Type Manipulation, Type-level Programming, Declaration Files, Compiler API |

---

_Last updated: 2026-01-30_
