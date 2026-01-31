# React Reference / React Reference

## Tổng quan / Overview

Topic này chứa toàn bộ tài liệu phỏng vấn về **React Reference** và **React-DOM Reference** từ tài liệu chính thức của React (react.dev). Đây là tài liệu tham khảo chi tiết về tất cả các Hooks, Components, và APIs có sẵn trong React.

## Cấu trúc thư mục / Directory Structure

```
reference/
├── README.md
├── plan.md
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

## React Hooks / Hooks React

Các hooks built-in của React:

| Hook                                                               | Mô tả                                       | File                       |
| ------------------------------------------------------------------ | ------------------------------------------- | -------------------------- |
| [`useState`](react/answers/01-usestate.md)                         | Quản lý state trong functional components   | 01-usestate.md             |
| [`useEffect`](react/answers/02-useeffect.md)                       | Xử lý side effects                          | 02-useeffect.md            |
| [`useContext`](react/answers/03-usecontext.md)                     | Đọc giá trị từ Context                      | 03-usecontext.md           |
| [`useReducer`](react/answers/04-usereducer.md)                     | Quản lý state phức tạp với reducer          | 04-userducer.md            |
| [`useRef`](react/answers/05-useref.md)                             | Lưu trữ giá trị không trigger re-render     | 05-useref.md               |
| [`useMemo`](react/answers/06-usememo.md)                           | Memoize giá trị tính toán                   | 06-usememo.md              |
| [`useCallback`](react/answers/07-usecallback.md)                   | Memoize function                            | 07-usecallback.md          |
| [`useId`](react/answers/08-useid.md)                               | Tạo unique ID ổn định                       | 08-useid.md                |
| [`useLayoutEffect`](react/answers/09-uselayouteffect.md)           | Effect chạy đồng bộ sau mutations           | 09-uselayouteffect.md      |
| [`useInsertionEffect`](react/answers/10-useinsertioneffect.md)     | Effect chạy trước DOM mutations (CSS-in-JS) | 10-useinsertioneffect.md   |
| [`useImperativeHandle`](react/answers/11-useimperativehandle.md)   | Tùy chỉnh ref暴露给 parent                  | 11-useimperativehandle.md  |
| [`useDebugValue`](react/answers/12-usedebugvalue.md)               | Hiển thị label trong DevTools               | 12-usedebugvalue.md        |
| [`useSyncExternalStore`](react/answers/13-usesyncexternalstore.md) | Đọc từ external store                       | 13-usesyncexternalstore.md |
| [`useTransition`](react/answers/14-usetransition.md)               | Đánh dấu update không khẩn cấp              | 14-usetransition.md        |
| [`useDeferredValue`](react/answers/15-usedeferredvalue.md)         | Defer update của giá trị                    | 15-usedeferredvalue.md     |
| [`useOptimistic`](react/answers/16-useoptimistic.md)               | Optimistic UI updates                       | 16-useoptimistic.md        |
| [`useActionState`](react/answers/17-useactionstate.md)             | Quản lý state cho form actions              | 17-useactionstate.md       |
| [`useEffectEvent`](react/answers/18-useeffectevent.md)             | Tạo non-reactive event handlers             | 18-useeffectevent.md       |

## React Components / Components React

Các built-in components của React:

| Component                                                | Mô tả                              | File                 |
| -------------------------------------------------------- | ---------------------------------- | -------------------- |
| [`<Fragment>`](react/answers/19-fragment.md)             | Group elements không cần wrapper   | 19-fragment.md       |
| [`<Profiler>`](react/answers/20-profiler.md)             | Đo hiệu suất render                | 20-profiler.md       |
| [`<StrictMode>`](react/answers/21-strictmode.md)         | Phát hiện vấn đề trong development | 21-strictmode.md     |
| [`<Suspense>`](react/answers/22-suspense.md)             | Hiển thị fallback khi loading      | 22-suspense.md       |
| [`<Activity>`](react/answers/23-activity.md)             | Track activity status              | 23-activity.md       |
| [`<ViewTransition>`](react/answers/24-viewtransition.md) | View transitions API               | 24-viewtransition.md |

## React APIs / APIs React

Các APIs quan trọng của React:

| API                                                                                          | Mô tả                          | File                                    |
| -------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------- |
| [`createContext`](react/answers/25-createcontext.md)                                         | Tạo Context object             | 25-createcontext.md                     |
| [`memo`](react/answers/26-memo.md)                                                           | Memoize component              | 26-memo.md                              |
| [`lazy`](react/answers/27-lazy.md)                                                           | Lazy load components           | 27-lazy.md                              |
| [`startTransition`](react/answers/28-starttransition.md)                                     | Bắt đầu transition             | 28-starttransition.md                   |
| [`use`](react/answers/29-use.md)                                                             | Đọc resource (Promise/Context) | 29-use.md                               |
| [`act`](react/answers/30-act.md)                                                             | Wrap updates trong tests       | 30-act.md                               |
| [`cache`](react/answers/31-cache.md)                                                         | Cache async operations         | 31-cache.md                             |
| [`cacheSignal`](react/answers/32-cachesignal.md)                                             | Signal cho cache               | 32-cachesignal.md                       |
| [`addTransitionType`](react/answers/33-addtransitiontype.md)                                 | Thêm transition type           | 33-addtransitiontype.md                 |
| [`captureOwnerStack`](react/answers/34-captureownerstack.md)                                 | Capture owner stack            | 34-captureownerstack.md                 |
| [`experimental_taintObjectReference`](react/answers/35-experimental-taintobjectreference.md) | Taint object references        | 35-experimental-taintobjectreference.md |
| [`experimental_taintUniqueValue`](react/answers/36-experimental-taintuniquevalue.md)         | Taint unique values            | 36-experimental-taintuniquevalue.md     |

## React-DOM Hooks / Hooks React-DOM

| Hook                                                     | Mô tả                      | File                |
| -------------------------------------------------------- | -------------------------- | ------------------- |
| [`useFormStatus`](react-dom/answers/37-useformstatus.md) | Đọc status form submission | 37-useformstatus.md |

## React-DOM Browser APIs / APIs Trình duyệt React-DOM

Các APIs chỉ dùng cho web apps:

| API                                                      | Mô tả                    | File                |
| -------------------------------------------------------- | ------------------------ | ------------------- |
| [`createPortal`](react-dom/answers/38-createportal.md)   | Render vào DOM node khác | 38-createportal.md  |
| [`flushSync`](react-dom/answers/39-flushsync.md)         | Force synchronous render | 39-flushsync.md     |
| [`preconnect`](react-dom/answers/40-preconnect.md)       | Preconnect đến origin    | 40-preconnect.md    |
| [`prefetchDNS`](react-dom/answers/41-prefetchdns.md)     | Prefetch DNS             | 41-prefetchdns.md   |
| [`preload`](react-dom/answers/42-preload.md)             | Preload resource         | 42-preload.md       |
| [`preloadModule`](react-dom/answers/43-preloadmodule.md) | Preload module           | 43-preloadmodule.md |
| [`preinit`](react-dom/answers/44-preinit.md)             | Preinit resource         | 44-preinit.md       |
| [`preinitModule`](react-dom/answers/45-preinitmodule.md) | Preinit module           | 45-preinitmodule.md |

## React-DOM Client APIs / APIs Client React-DOM

Để render React trên trình duyệt:

| API                                                  | Mô tả               | File              |
| ---------------------------------------------------- | ------------------- | ----------------- |
| [`createRoot`](react-dom/answers/46-createroot.md)   | Tạo root container  | 46-createroot.md  |
| [`hydrateRoot`](react-dom/answers/47-hydrateroot.md) | Hydrate SSR content | 47-hydrateroot.md |

## React-DOM Server APIs / APIs Server React-DOM

Render React thành HTML trên server:

| API                                                                        | Mô tả                    | File                         |
| -------------------------------------------------------------------------- | ------------------------ | ---------------------------- |
| [`renderToPipeableStream`](react-dom/answers/48-rendertopipeablestream.md) | Render to Node.js stream | 48-rendertopipeablestream.md |
| [`renderToReadableStream`](react-dom/answers/49-rendertoreadablestream.md) | Render to Web stream     | 49-rendertoreadablestream.md |
| [`renderToStaticMarkup`](react-dom/answers/50-rendertostaticmarkup.md)     | Render static HTML       | 50-rendertostaticmarkup.md   |
| [`renderToString`](react-dom/answers/51-rendertostring.md)                 | Render to string         | 51-rendertostring.md         |
| [`resume`](react-dom/answers/52-resume.md)                                 | Resume rendering         | 52-resume.md                 |
| [`resumeToPipeableStream`](react-dom/answers/53-resumetopipeablestream.md) | Resume to stream         | 53-resumetopipeablestream.md |

## React-DOM Static APIs / APIs Static React-DOM

Tạo static HTML:

| API                                                                                        | Mô tả                          | File                                 |
| ------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------ |
| [`prerender`](react-dom/answers/54-prerender.md)                                           | Prerender to static HTML       | 54-prerender.md                      |
| [`prerenderToNodeStream`](react-dom/answers/55-prerendertonodestream.md)                   | Prerender to Node.js stream    | 55-prerendertonodestream.md          |
| [`resumeAndPrerender`](react-dom/answers/56-resumeandprerender.md)                         | Resume and prerender           | 56-resumeandprerender.md             |
| [`resumeAndPrerenderToNodeStream`](react-dom/answers/57-resumeandprerendertonodestream.md) | Resume and prerender to stream | 57-resumeandprerendertonodestream.md |

## React Compiler & ESLint / React Compiler & ESLint

| API                                                                         | Mô tả                  | File                            |
| --------------------------------------------------------------------------- | ---------------------- | ------------------------------- |
| [React Compiler](react/answers/58-react-compiler.md)                        | Build-time optimizer   | 58-react-compiler.md            |
| [ESLint Plugin: React Hooks](react/answers/59-eslint-plugin-react-hooks.md) | React Hooks lint rules | 59-eslint-plugin-react-hooks.md |

## Legacy APIs / APIs Cũ

Các API cũ không nên dùng:

| API                                                | Mô tả                     | File              |
| -------------------------------------------------- | ------------------------- | ----------------- |
| [Legacy APIs](react-dom/answers/60-legacy-apis.md) | Các API cũ không nên dùng | 60-legacy-apis.md |

## Định dạng file answer / Answer File Format

Mỗi file answer bao gồm các phần:

- Định nghĩa / Definition
- Cú pháp / Syntax
- Tham số / Parameters
- Giá trị trả về / Return Value
- Cách hoạt động / How it Works
- Ví dụ thực tế / Practical Examples (cơ bản và nâng cao)
- Khi nào nên dùng / When to Use
- Khi nào KHÔNG nên dùng / When NOT to Use
- Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It
- Vấn đề được giải quyết / Problems Solved
- Ưu điểm / Advantages
- Nhược điểm / Disadvantages
- So sánh với các giải pháp khác / Comparison with Alternatives
- Best Practices / Các thực hành tốt
- Common Pitfalls / Các lỗi thường gặp
- Performance Considerations / Yếu tố hiệu suất
- Câu hỏi phỏng vấn / Interview Questions

## Nguồn tài liệu / Documentation Sources

- [React Reference - react.dev/reference/react](https://react.dev/reference/react)
- [React-DOM Reference - react.dev/reference/react-dom](https://react.dev/reference/react-dom)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)

---

_Last updated: 2026-01-31_
