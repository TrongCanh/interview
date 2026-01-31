# React Reference Topic Plan / Kế hoạch Topic React Reference

## Tổng quan / Overview

Tạo topic "reference" trong `interview-viewer\data\topics` để lưu trữ toàn bộ tài liệu phỏng vấn về React Reference và React-DOM Reference từ tài liệu chính thức của React (react.dev).

## Cấu trúc thư mục / Directory Structure

```
interview-viewer/data/topics/reference/
├── README.md
├── react/
│   ├── questions.md
│   └── answers/
│       ├── 01-usestate.md
│       ├── 02-useeffect.md
│       ├── 03-usecontext.md
│       ├── 04-usereducer.md
│       ├── 05-useref.md
│       ├── 06-usememo.md
│       ├── 07-usecallback.md
│       ├── 08-useid.md
│       ├── 09-uselayouteffect.md
│       ├── 10-useinsertioneffect.md
│       ├── 11-useimperativehandle.md
│       ├── 12-usedebugvalue.md
│       ├── 13-usesyncexternalstore.md
│       ├── 14-usetransition.md
│       ├── 15-usedeferredvalue.md
│       ├── 16-useoptimistic.md
│       ├── 17-useactionstate.md
│       ├── 18-useeffectevent.md
│       ├── 19-fragment.md
│       ├── 20-profiler.md
│       ├── 21-strictmode.md
│       ├── 22-suspense.md
│       ├── 23-activity.md
│       ├── 24-viewtransition.md
│       ├── 25-createcontext.md
│       ├── 26-memo.md
│       ├── 27-lazy.md
│       ├── 28-starttransition.md
│       ├── 29-use.md
│       ├── 30-act.md
│       ├── 31-cache.md
│       ├── 32-cachesignal.md
│       ├── 33-addtransitiontype.md
│       ├── 34-captureownerstack.md
│       ├── 35-experimental-taintobjectreference.md
│       ├── 36-experimental-taintuniquevalue.md
│       ├── 58-react-compiler.md
│       └── 59-eslint-plugin-react-hooks.md
└── react-dom/
    ├── questions.md
    └── answers/
        ├── 37-useformstatus.md
        ├── 38-createportal.md
        ├── 39-flushsync.md
        ├── 40-preconnect.md
        ├── 41-prefetchdns.md
        ├── 42-preload.md
        ├── 43-preloadmodule.md
        ├── 44-preinit.md
        ├── 45-preinitmodule.md
        ├── 46-createroot.md
        ├── 47-hydrateroot.md
        ├── 48-rendertopipeablestream.md
        ├── 49-rendertoreadablestream.md
        ├── 50-rendertostaticmarkup.md
        ├── 51-rendertostring.md
        ├── 52-resume.md
        ├── 53-resumetopipeablestream.md
        ├── 54-prerender.md
        ├── 55-prerendertonodestream.md
        ├── 56-resumeandprerender.md
        ├── 57-resumeandprerendertonodestream.md
        └── 60-legacy-apis.md
```

## Danh sách file cần tạo / List of Files to Create

### 1. React Hooks (18 files)

| STT | File                       | Tên Hook             | Mô tả                                       |
| --- | -------------------------- | -------------------- | ------------------------------------------- |
| 1   | 01-usestate.md             | useState             | Quản lý state trong functional components   |
| 2   | 02-useeffect.md            | useEffect            | Xử lý side effects                          |
| 3   | 03-usecontext.md           | useContext           | Đọc giá trị từ Context                      |
| 4   | 04-usereducer.md           | useReducer           | Quản lý state phức tạp với reducer          |
| 5   | 05-useref.md               | useRef               | Lưu trữ giá trị không trigger re-render     |
| 6   | 06-usememo.md              | useMemo              | Memoize giá trị tính toán                   |
| 7   | 07-usecallback.md          | useCallback          | Memoize function                            |
| 8   | 08-useid.md                | useId                | Tạo unique ID ổn định                       |
| 9   | 09-uselayouteffect.md      | useLayoutEffect      | Effect chạy đồng bộ sau mutations           |
| 10  | 10-useinsertioneffect.md   | useInsertionEffect   | Effect chạy trước DOM mutations (CSS-in-JS) |
| 11  | 11-useimperativehandle.md  | useImperativeHandle  | Tùy chỉnh ref暴露给 parent                  |
| 12  | 12-usedebugvalue.md        | useDebugValue        | Hiển thị label trong DevTools               |
| 13  | 13-usesyncexternalstore.md | useSyncExternalStore | Đọc từ external store                       |
| 14  | 14-usetransition.md        | useTransition        | Đánh dấu update không khẩn cấp              |
| 15  | 15-usedeferredvalue.md     | useDeferredValue     | Defer update của giá trị                    |
| 16  | 16-useoptimistic.md        | useOptimistic        | Optimistic UI updates                       |
| 17  | 17-useactionstate.md       | useActionState       | Quản lý state cho form actions              |
| 18  | 18-useeffectevent.md       | useEffectEvent       | Tạo non-reactive event handlers             |

### 2. React Components (6 files)

| STT | File                 | Tên Component  | Mô tả                              |
| --- | -------------------- | -------------- | ---------------------------------- |
| 19  | 19-fragment.md       | Fragment       | Group elements không cần wrapper   |
| 20  | 20-profiler.md       | Profiler       | Đo hiệu suất render                |
| 21  | 21-strictmode.md     | StrictMode     | Phát hiện vấn đề trong development |
| 22  | 22-suspense.md       | Suspense       | Hiển thị fallback khi loading      |
| 23  | 23-activity.md       | Activity       | Track activity status              |
| 24  | 24-viewtransition.md | ViewTransition | View transitions API               |

### 3. React APIs (12 files)

| STT | File                                    | Tên API                           | Mô tả                          |
| --- | --------------------------------------- | --------------------------------- | ------------------------------ |
| 25  | 25-createcontext.md                     | createContext                     | Tạo Context object             |
| 26  | 26-memo.md                              | memo                              | Memoize component              |
| 27  | 27-lazy.md                              | lazy                              | Lazy load components           |
| 28  | 28-starttransition.md                   | startTransition                   | Bắt đầu transition             |
| 29  | 29-use.md                               | use                               | Đọc resource (Promise/Context) |
| 30  | 30-act.md                               | act                               | Wrap updates trong tests       |
| 31  | 31-cache.md                             | cache                             | Cache async operations         |
| 32  | 32-cachesignal.md                       | cacheSignal                       | Signal cho cache               |
| 33  | 33-addtransitiontype.md                 | addTransitionType                 | Thêm transition type           |
| 34  | 34-captureownerstack.md                 | captureOwnerStack                 | Capture owner stack            |
| 35  | 35-experimental-taintobjectreference.md | experimental_taintObjectReference | Taint object references        |
| 36  | 36-experimental-taintuniquevalue.md     | experimental_taintUniqueValue     | Taint unique values            |

### 4. React-DOM Hooks (1 file)

| STT | File                | Tên Hook      | Mô tả                      |
| --- | ------------------- | ------------- | -------------------------- |
| 37  | 37-useformstatus.md | useFormStatus | Đọc status form submission |

### 5. React-DOM Browser APIs (8 files)

| STT | File                | Tên API       | Mô tả                    |
| --- | ------------------- | ------------- | ------------------------ |
| 38  | 38-createportal.md  | createPortal  | Render vào DOM node khác |
| 39  | 39-flushsync.md     | flushSync     | Force synchronous render |
| 40  | 40-preconnect.md    | preconnect    | Preconnect đến origin    |
| 41  | 41-prefetchdns.md   | prefetchDNS   | Prefetch DNS             |
| 42  | 42-preload.md       | preload       | Preload resource         |
| 43  | 43-preloadmodule.md | preloadModule | Preload module           |
| 44  | 44-preinit.md       | preinit       | Preinit resource         |
| 45  | 45-preinitmodule.md | preinitModule | Preinit module           |

### 6. React-DOM Client APIs (2 files)

| STT | File              | Tên API     | Mô tả               |
| --- | ----------------- | ----------- | ------------------- |
| 46  | 46-createroot.md  | createRoot  | Tạo root container  |
| 47  | 47-hydrateroot.md | hydrateRoot | Hydrate SSR content |

### 7. React-DOM Server APIs (6 files)

| STT | File                         | Tên API                | Mô tả                    |
| --- | ---------------------------- | ---------------------- | ------------------------ |
| 48  | 48-rendertopipeablestream.md | renderToPipeableStream | Render to Node.js stream |
| 49  | 49-rendertoreadablestream.md | renderToReadableStream | Render to Web stream     |
| 50  | 50-rendertostaticmarkup.md   | renderToStaticMarkup   | Render static HTML       |
| 51  | 51-rendertostring.md         | renderToString         | Render to string         |
| 52  | 52-resume.md                 | resume                 | Resume rendering         |
| 53  | 53-resumetopipeablestream.md | resumeToPipeableStream | Resume to stream         |

### 8. React-DOM Static APIs (4 files)

| STT | File                                 | Tên API                        | Mô tả                          |
| --- | ------------------------------------ | ------------------------------ | ------------------------------ |
| 54  | 54-prerender.md                      | prerender                      | Prerender to static HTML       |
| 55  | 55-prerendertonodestream.md          | prerenderToNodeStream          | Prerender to Node.js stream    |
| 56  | 56-resumeandprerender.md             | resumeAndPrerender             | Resume and prerender           |
| 57  | 57-resumeandprerendertonodestream.md | resumeAndPrerenderToNodeStream | Resume and prerender to stream |

### 9. React Compiler & ESLint (2 files)

| STT | File                            | Tên API        | Mô tả                  |
| --- | ------------------------------- | -------------- | ---------------------- |
| 58  | 58-react-compiler.md            | React Compiler | Build-time optimizer   |
| 59  | 59-eslint-plugin-react-hooks.md | ESLint Plugin  | React Hooks lint rules |

### 10. Legacy APIs (1 file)

| STT | File              | Tên API     | Mô tả                     |
| --- | ----------------- | ----------- | ------------------------- |
| 60  | 60-legacy-apis.md | Legacy APIs | Các API cũ không nên dùng |

## Định dạng file answer / Answer File Format

Mỗi file answer phải bao gồm các phần sau:

### Cấu trúc tiêu chuẩn / Standard Structure

````markdown
# [Tên API/Hook/Component] / [English Name]

## Định nghĩa / Definition

[Giải thích chi tiết về API/Hook/Component là gì]

## Cú pháp / Syntax

```javascript
// Code cú pháp
```
````

## Tham số / Parameters

| Tham số | Kiểu | Mô tả |
| ------- | ---- | ----- |
| ...     | ...  | ...   |

## Giá trị trả về / Return Value

[Giải thích về giá trị trả về]

## Cách hoạt động / How it Works

[Giải thích chi tiết về cách hoạt động bên trong]

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
// Code ví dụ
```

### Ví dụ nâng cao / Advanced Example

```jsx
// Code ví dụ nâng cao
```

## Khi nào nên dùng / When to Use

- [Danh sách tình huống nên dùng]

## Khi nào KHÔNG nên dùng / When NOT to Use

- [Danh sách tình huống không nên dùng]

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

[Giải thích những vấn đề có thể xảy ra nếu không sử dụng]

## Vấn đề được giải quyết / Problems Solved

[Giải thích vấn đề mà API/Hook/Component giải quyết]

## Ưu điểm / Advantages

- [Danh sách ưu điểm]

## Nhược điểm / Disadvantages

- [Danh sách nhược điểm]

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm | [Tên API] | [Giải pháp 1] | [Giải pháp 2] |
| -------- | --------- | ------------- | ------------- |
| ...      | ...       | ...           | ...           |

## Best Practices / Các thực hành tốt

- [Danh sách best practices]

## Common Pitfalls / Các lỗi thường gặp

- [Danh sách lỗi thường gặp và cách tránh]

## Performance Considerations / Yếu tố hiệu suất

[Giải thích về hiệu suất]

## Browser Support / Hỗ trợ trình duyệt

[Thông tin về hỗ trợ trình duyệt nếu có]

## Tài liệu tham khảo / References

- [Link đến tài liệu chính thức]

````

## Câu hỏi phỏng vấn mẫu / Sample Interview Questions

Mỗi file cũng nên bao gồm các câu hỏi phỏng vấn liên quan:

```markdown
## Câu hỏi phỏng vấn / Interview Questions

1. [Tên API/Hook/Component] là gì?
2. Khi nào nên sử dụng [Tên API/Hook/Component]?
3. Sự khác biệt giữa [Tên API/Hook/Component] và [Giải pháp khác]?
4. [Tên API/Hook/Component] hoạt động như thế nào?
5. Những vấn đề nào [Tên API/Hook/Component] giải quyết?
6. Ưu và nhược điểm của [Tên API/Hook/Component]?
7. [Câu hỏi nâng cao]
````

## Tổng số file cần tạo / Total Files to Create

- **React Hooks**: 18 files
- **React Components**: 6 files
- **React APIs**: 12 files
- **React-DOM Hooks**: 1 file
- **React-DOM Browser APIs**: 8 files
- **React-DOM Client APIs**: 2 files
- **React-DOM Server APIs**: 6 files
- **React-DOM Static APIs**: 4 files
- **React Compiler & ESLint**: 2 files
- **Legacy APIs**: 1 file
- **Questions files**: 2 files (react/questions.md, react-dom/questions.md)
- **README**: 1 file

**Tổng cộng**: 63 files

## Nguồn tài liệu / Documentation Sources

- [React Reference - react.dev/reference/react](https://react.dev/reference/react)
- [React-DOM Reference - react.dev/reference/react-dom](https://react.dev/reference/react-dom)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)

---

_Last updated: 2026-01-31_
