# React Interview Questions / Câu hỏi Phỏng vấn React

> Danh sách câu hỏi phỏng vấn về React / List of React interview questions

---

## 📚 Cơ bản / Basics

### 1. React Fundamentals

- React là gì? Tại sao dùng React?
- Virtual DOM là gì? Nó hoạt động như thế nào?
- JSX là gì?
- Sự khác biệt giữa React Element và React Component?
- React là library hay framework? Tại sao?
- Declarative vs Imperative programming trong React?

### 2. Component Lifecycle

- Lifecycle methods trong class components?
- Lifecycle trong functional components (useEffect)?
- Khi nào nên dùng `useLayoutEffect` vs `useEffect`?
- `useInsertionEffect` là gì? Khi nào dùng?
- Phases của component lifecycle (Mounting, Updating, Unmounting, Error Handling)?

### 3. State & Props

- Sự khác biệt giữa state và props?
- Lifting state up là gì?
- Controlled vs Uncontrolled components?
- Props drilling là gì? Cách giải quyết?
- Key prop trong React là gì? Tại sao quan trọng?

---

## 🎣 Hooks - Deep Dive / Hooks - Đào sâu

### 4. useState - Advanced

- `useState` hoạt động như thế nào bên trong (batching, re-render)?
- Functional updates trong `useState`? Khi nào cần?
- Lazy initialization là gì? Khi nào dùng?
- Batching trong React 18 (Automatic Batching)?
- Tại sao `setState` không cập nhật state ngay lập tức?
- Object và Array updates trong React (immutability)?

### 5. useEffect - Deep Dive

- Dependency array hoạt động như thế nào?
- Cleanup function là gì? Khi nào chạy?
- Cách `useEffect` tương đương với các lifecycle methods?
- Effect cleanup trong Strict Mode?
- Infinite loops trong `useEffect`? Cách tránh?
- `useEffect` vs `useLayoutEffect` vs `useInsertionEffect`?

### 6. useContext - Advanced

- Context API là gì? Khi nào nên dùng?
- `useContext` vs Redux?
- Performance considerations với Context?
- Context propagation optimization (splitting context)?
- Nested Context Providers?
- Context vs Props drilling vs State Management Libraries?

### 7. useReducer - Deep Dive

- Khi nào nên dùng `useReducer` thay vì `useState`?
- Cấu trúc của reducer?
- `useReducer` với Context?
- Reducer composition?
- Middleware pattern với `useReducer`?
- Complex state management với `useReducer`?

### 8. useMemo & useCallback - Performance

- `useMemo` là gì? Khi nào nên dùng?
- `useCallback` là gì? Tại sao cần nó?
- Trade-offs của memoization?
- `useMemo` vs `React.memo`?
- Dependency array trong `useMemo`/`useCallback`?
- Reference equality và memoization?

### 9. useRef - Advanced

- `useRef` khác với `createRef` như thế nào?
- Use cases của `useRef`?
- Accessing DOM elements?
- `useRef` để lưu giá trị không trigger re-render?
- `useRef` vs `useState` cho persisting values?

### 10. Custom Hooks - Deep Dive

- Custom hook là gì?
- Rules of Hooks? Tại sao quan trọng?
- Tạo một custom hook?
- Hook composition?
- Testing custom hooks?
- Common custom hook patterns (useFetch, useDebounce, useLocalStorage, useToggle)?

### 11. Additional Hooks

- `useId` là gì? Khi nào dùng?
- `useTransition` là gì? Use cases?
- `useDeferredValue` là gì? Khi nào dùng?
- `useSyncExternalStore` là gì? Khi nào dùng?
- `useImperativeHandle` là gì? Khi nào dùng?
- `useDebugValue` là gì? Khi nào dùng?

### 12. Hook Rules & Best Practices

- Rules of Hooks chi tiết?
- ESLint plugin `react-hooks/rules-of-hooks`?
- Conditional hooks - tại sao không nên?
- Hooks trong loops - tại sao không nên?
- Custom hooks naming conventions?
- Common hook anti-patterns?

---

## 🔄 Advanced Concepts

### 13. Rendering & Re-rendering

- Khi nào component re-render?
- React.memo là gì?
- `React.memo` vs `useMemo`?
- Shallow comparison vs Deep comparison?
- Render phases (Render, Commit)?
- Fiber architecture là gì?
- Reconciliation algorithm là gì?

### 14. Performance Optimization

- Code splitting?
- Lazy loading components?
- Virtualization (react-window)?
- Memoization strategies?
- Profiling React apps?
- React DevTools Profiler?
- List rendering optimization (keys, virtualization)?

### 15. Forms

- Form handling trong React?
- Formik vs React Hook Form?
- Validation strategies?
- Controlled vs Uncontrolled forms?
- Form state management patterns?
- Multi-step forms?

### 16. Error Boundaries

- Error Boundary là gì?
- Implement error boundary?
- Limitations?
- Error boundaries vs try-catch?
- Fallback UI patterns?
- Error logging integration?

---

## 🚀 React 18+ Features / Tính năng React 18+

### 17. Concurrent Mode

- Concurrent Rendering là gì?
- Automatic Batching là gì?
- Transitions API (`startTransition`)?
- `useTransition` hook?
- `useDeferredValue` hook?
- Suspense for data fetching?

### 18. Suspense

- Suspense là gì?
- Suspense với lazy loading?
- Suspense với data fetching?
- Suspense boundaries?
- Fallback UI patterns?
- Error boundaries với Suspense?

### 19. Server Components (React 18+)

- React Server Components là gì?
- Client vs Server Components?
- Khi nào dùng Server Components?
- Server Components với Next.js?
- Data fetching trong Server Components?

### 20. New Hooks in React 18+

- `useId` - Unique IDs
- `useTransition` - Non-urgent updates
- `useDeferredValue` - Deferred updates
- `useSyncExternalStore` - External subscriptions
- `useInsertionEffect` - CSS-in-JS

---

## 🎯 React 19 Features / Tính năng React 19

### 21. React Server Components (RSC)

- Server Components architecture?
- Client vs Server Components?
- "use client" directive?
- Server Actions?
- Streaming SSR?

### 22. Actions & Forms

- Server Actions là gì?
- `useActionState` hook?
- `useFormStatus` hook?
- Form handling với Actions?
- Optimistic UI updates?
- Progressive enhancement?

### 23. New Hooks in React 19

- `use` - Reading resources (Promises, Context)
- `useOptimistic` - Optimistic updates
- `useActionState` - Form state management
- `useFormStatus` - Form submission status

### 24. Other React 19 Features

- Asset loading?
- Document metadata?
- Improved error handling?
- Custom element support?
- Ref cleanup?

---

## 🌐 React Router

### 25. Routing

- Client-side routing là gì?
- `useParams`, `useLocation`, `useNavigate`?
- Protected routes?
- Nested routes?
- Route parameters?
- Query parameters?
- Programmatic navigation?

### 26. Advanced Routing

- Code splitting with React Router?
- Route guards?
- Lazy loading routes?
- Custom scroll behavior?
- Transition animations?
- Data routers (React Router 6.4+)?

---

## 🔗 State Management

### 27. Redux

- Redux principles?
- Actions, Reducers, Store?
- Redux Toolkit?
- Thunks vs Sagas?
- Redux DevTools?
- Normalized state shape?

### 28. Zustand / Jotai / Recoil

- Alternatives to Redux?
- Khi nào nên dùng library nhỏ hơn?
- Zustand - simplicity & performance?
- Jotai - atomic state?
- Recoil - Facebook's solution?
- Context API vs State Libraries?

### 29. State Management Patterns

- Compound Components pattern?
- Control Props pattern?
- State Reducer pattern?
- Render Props pattern?
- Higher-Order Components (HOC)?

---

## 🧪 Testing

### 30. Testing React

- Jest vs Vitest?
- React Testing Library?
- Testing hooks?
- Integration testing?
- E2E testing (Cypress, Playwright)?
- Testing Library philosophy?

### 31. Testing Patterns

- Testing user behavior vs implementation?
- Mocking in React tests?
- Testing async operations?
- Testing context providers?
- Testing custom hooks?
- Snapshot testing - pros/cons?

---

## 🖥️ Server-Side Rendering (SSR)

### 32. SSR Fundamentals

- CSR vs SSR vs SSG vs ISR?
- Hydration là gì?
- Server-side rendering với React?
- Next.js SSR basics?
- SEO considerations?

### 33. Advanced SSR

- Streaming SSR?
- Suspense on the server?
- Data fetching strategies?
- Caching strategies?
- Error handling in SSR?
- Performance optimization for SSR?

---

## 🏗️ Architecture Patterns

### 34. Component Architecture

- Container vs Presentational components?
- Smart vs Dumb components?
- Compound components?
- Render props?
- Higher-order components (HOC)?
- Custom hooks vs HOC?

### 35. Design Patterns

- Provider pattern?
- Observer pattern?
- Factory pattern?
- Singleton pattern (anti-pattern)?
- Composition vs Inheritance?
- Liskov Substitution Principle in React?

### 36. Scalability

- Folder structure for large apps?
- Feature-based organization?
- Shared components library?
- Micro-frontends with React?
- Monorepo setup for React apps?

---

## 🔧 Developer Experience

### 37. Tooling

- Create React App vs Vite vs Next.js?
- ESLint configuration for React?
- Prettier setup?
- TypeScript with React?
- Bundlers (Webpack, Vite, esbuild)?

### 38. Debugging

- React DevTools?
- Profiling React apps?
- Common React bugs?
- Debugging re-renders?
- Performance debugging?

---

## 📝 Coding Challenges / Thử thách Coding

### 39. Implement custom hook `useFetch`

```javascript
function useFetch(url) {
  // TODO: Implement custom hook for fetching data
  // - Loading state
  // - Error handling
  // - Abort controller
  // - Retry logic
}
```

### 40. Implement `useDebounce`

```javascript
function useDebounce(value, delay) {
  // TODO: Implement debounce hook
}
```

### 41. Implement `usePrevious`

```javascript
function usePrevious(value) {
  // TODO: Implement hook to get previous value
}
```

### 42. Implement `useLocalStorage`

```javascript
function useLocalStorage(key, initialValue) {
  // TODO: Implement localStorage sync
}
```

### 43. Implement `useToggle`

```javascript
function useToggle(initialValue = false) {
  // TODO: Implement toggle hook
}
```

### 44. Implement `useAsync`

```javascript
function useAsync(asyncFunction, immediate = true) {
  // TODO: Implement async operation hook
}
```

### 45. Implement `useMediaQuery`

```javascript
function useMediaQuery(query) {
  // TODO: Implement media query hook
}
```

### 46. Build a counter component with:

- Increment/Decrement
- Reset
- Step control
- Min/Max limits

### 47. Build a Todo List with:

- Add/Delete todos
- Toggle completion
- Filter (All/Active/Completed)
- Local storage persistence
- Edit todo functionality

### 48. Implement a Modal component:

- Portal usage
- Backdrop click to close
- Escape key to close
- Animation on open/close

### 49. Build a Form with:

- Validation
- Error messages
- Submit handling
- Reset functionality

### 50. Implement Infinite Scroll:

- Intersection Observer API
- Loading state
- Error handling
- Data fetching

---

## 🔗 Resources / Tài liệu tham khảo

- [React Official Docs](https://react.dev/)
- [React Hooks FAQ](https://react.dev/reference/react)
- [React Patterns](https://reactpatterns.com/)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [React Router Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Kent C. Dodds' Blog](https://kentcdodds.com/blog)
- [Dan Abramov's Blog](https://overreacted.io/)

---

## 📊 Difficulty Levels / Mức độ khó

| Level / Mức độ                 | Topics / Chủ đề                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------- |
| ⭐ Basic / Cơ bản              | React Fundamentals, JSX, Props, State, Basic Hooks                              |
| ⭐⭐ Intermediate / Trung bình | useEffect, Context, Custom Hooks, React Router, Redux                           |
| ⭐⭐⭐ Advanced / Nâng cao     | Performance Optimization, Concurrent Mode, Suspense, SSR, Architecture Patterns |
| ⭐⭐⭐⭐ Expert / Chuyên gia   | React Server Components, React 19 Actions, Fiber Architecture, Micro-frontends  |

---

_Last updated: 2026-01-30_
