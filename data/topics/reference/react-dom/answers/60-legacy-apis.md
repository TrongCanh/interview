# Legacy APIs / Các API cũ không nên dùng

## Định nghĩa / Definition

Legacy APIs là các API cũ của React và React-DOM đã bị deprecated hoặc không còn được khuyến nghị sử dụng. Các API này vẫn có thể hoạt động nhưng nên được thay thế bằng các API mới hơn, an toàn hơn và hiệu quả hơn.

Legacy APIs are old React and React-DOM APIs that have been deprecated or are no longer recommended. These APIs may still work but should be replaced with newer, safer, and more efficient APIs.

## Danh sách Legacy APIs / List of Legacy APIs

### React Legacy APIs

| API                                   | Trạng thái | Thay thế bằng                          | Lý do deprecated               |
| ------------------------------------- | ---------- | -------------------------------------- | ------------------------------ |
| `ReactDOM.render`                     | Deprecated | `createRoot`                           | React 18+ Concurrent Features  |
| `ReactDOM.unmountComponentAtNode`     | Deprecated | `root.unmount()`                       | React 18+ New API              |
| `ReactDOM.hydrate`                    | Deprecated | `hydrateRoot`                          | React 18+ New API              |
| `ReactDOM.findDOMNode`                | Deprecated | Refs                                   | Không an toàn, performance kém |
| `ReactDOMServer.renderToString`       | Legacy     | `renderToPipeableStream`               | React 18+ Streaming            |
| `ReactDOMServer.renderToStaticMarkup` | Legacy     | `prerender`                            | React 19+ Prerendering         |
| `componentWillMount`                  | Deprecated | `constructor` hoặc `componentDidMount` | React 17+ UNSAFE\_ prefix      |
| `componentWillReceiveProps`           | Deprecated | `getDerivedStateFromProps`             | React 17+ UNSAFE\_ prefix      |
| `componentWillUpdate`                 | Deprecated | `getSnapshotBeforeUpdate`              | React 17+ UNSAFE\_ prefix      |
| `React.createFactory`                 | Deprecated | JSX                                    | Không cần thiết với JSX        |
| `React.createClass`                   | Deprecated | ES6 Classes                            | ES6 Classes tốt hơn            |
| `React.PropTypes`                     | Deprecated | `prop-types` package                   | Tách ra thành package riêng    |
| `unstable_` APIs                      | Deprecated | Stable equivalents                     | Không ổn định                  |
| `String Refs`                         | Deprecated | Callback Refs hoặc `useRef`            | Performance kém                |

### React-DOM Legacy APIs

| API                               | Trạng thái | Thay thế bằng    | Lý do deprecated               |
| --------------------------------- | ---------- | ---------------- | ------------------------------ |
| `ReactDOM.render`                 | Deprecated | `createRoot`     | React 18+ Concurrent Features  |
| `ReactDOM.unmountComponentAtNode` | Deprecated | `root.unmount()` | React 18+ New API              |
| `ReactDOM.hydrate`                | Deprecated | `hydrateRoot`    | React 18+ New API              |
| `ReactDOM.findDOMNode`            | Deprecated | Refs             | Không an toàn, performance kém |

## Ví dụ thực tế / Practical Examples

### Ví dụ 1: `ReactDOM.render` → `createRoot`

**Legacy (Deprecated):**

```javascript
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

**New (Recommended):**

```javascript
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### Ví dụ 2: `ReactDOM.unmountComponentAtNode` → `root.unmount()`

**Legacy (Deprecated):**

```javascript
import ReactDOM from "react-dom";

ReactDOM.unmountComponentAtNode(document.getElementById("root"));
```

**New (Recommended):**

```javascript
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.unmount();
```

### Ví dụ 3: `ReactDOM.hydrate` → `hydrateRoot`

**Legacy (Deprecated):**

```javascript
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.hydrate(<App />, document.getElementById("root"));
```

**New (Recommended):**

```javascript
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root"), <App />);
```

### Ví dụ 4: `ReactDOM.findDOMNode` → Refs

**Legacy (Deprecated):**

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";

class MyComponent extends Component {
  handleClick() {
    const node = ReactDOM.findDOMNode(this);
    node.classList.add("active");
  }

  render() {
    return <div onClick={this.handleClick}>Click me</div>;
  }
}
```

**New (Recommended):**

```javascript
import React, { useRef } from "react";

function MyComponent() {
  const divRef = useRef(null);

  function handleClick() {
    divRef.current.classList.add("active");
  }

  return (
    <div ref={divRef} onClick={handleClick}>
      Click me
    </div>
  );
}
```

### Ví dụ 5: `componentWillMount` → `constructor` / `componentDidMount`

**Legacy (Deprecated):**

```javascript
class MyComponent extends Component {
  componentWillMount() {
    this.setState({ data: fetchData() });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

**New (Recommended):**

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    this.setState({ data: fetchData() });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

### Ví dụ 6: `componentWillReceiveProps` → `getDerivedStateFromProps`

**Legacy (Deprecated):**

```javascript
class MyComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ derivedValue: nextProps.value * 2 });
    }
  }

  render() {
    return <div>{this.state.derivedValue}</div>;
  }
}
```

**New (Recommended):**

```javascript
class MyComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      return {
        derivedValue: props.value * 2,
        prevValue: props.value,
      };
    }
    return null;
  }

  render() {
    return <div>{this.state.derivedValue}</div>;
  }
}
```

### Ví dụ 7: `componentWillUpdate` → `getSnapshotBeforeUpdate`

**Legacy (Deprecated):**

```javascript
class MyComponent extends Component {
  componentWillUpdate(nextProps, nextState) {
    this.scrollHeight = this.node.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    const newScrollHeight = this.node.scrollHeight;
    // Use scrollHeight difference
  }

  render() {
    return <div ref={(node) => (this.node = node)}>Content</div>;
  }
}
```

**New (Recommended):**

```javascript
class MyComponent extends Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.node.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollHeight = snapshot;
    // Use scrollHeight
  }

  render() {
    return <div ref={(node) => (this.node = node)}>Content</div>;
  }
}
```

### Ví dụ 8: String Refs → Callback Refs / useRef

**Legacy (Deprecated):**

```javascript
class MyComponent extends Component {
  render() {
    return <input ref="myInput" />;
  }

  componentDidMount() {
    this.refs.myInput.focus();
  }
}
```

**New (Recommended):**

```javascript
class MyComponent extends Component {
  render() {
    return <input ref={(node) => (this.myInput = node)} />;
  }

  componentDidMount() {
    this.myInput.focus();
  }
}
```

**Or with Hooks:**

```javascript
import { useRef, useEffect } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

### Ví dụ 9: `React.createClass` → ES6 Classes

**Legacy (Deprecated):**

```javascript
const MyComponent = React.createClass({
  getInitialState() {
    return { count: 0 };
  },

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  },

  render() {
    return <div onClick={this.handleClick}>Count: {this.state.count}</div>;
  },
});
```

**New (Recommended):**

```javascript
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <div onClick={this.handleClick}>Count: {this.state.count}</div>;
  }
}
```

### Ví dụ 10: `React.PropTypes` → `prop-types` package

**Legacy (Deprecated):**

```javascript
import React from "react";

class MyComponent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    age: React.PropTypes.number,
  };

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

**New (Recommended):**

```javascript
import React from "react";
import PropTypes from "prop-types";

class MyComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
  };

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

## Khi nào nên migrate / When to Migrate

- Khi upgrade lên React 18+
- Khi muốn sử dụng Concurrent Features
- Khi muốn cải thiện performance
- Khi muốn sử dụng Suspense
- Khi muốn sử dụng Automatic Batching
- Khi muốn sử dụng Transitions
- Khi muốn sử dụng React 19+ features

## Nếu không migrate thì có khó khăn gì? / Difficulties Without Migration

- Không thể sử dụng React 18+ Concurrent Features
- Không thể sử dụng Suspense
- Không thể sử dụng Automatic Batching
- Không thể sử dụng Transitions
- Không thể sử dụng React 19+ features
- Performance kém hơn
- Code không maintainable
- Có thể bị lỗi trong các phiên bản React tương lai

## Vấn đề được giải quyết / Problems Solved

- **Concurrent Features**: Hỗ trợ Concurrent Rendering
- **Performance**: Cải thiện performance với các API mới
- **Safety**: Loại bỏ các API không an toàn
- **Maintainability**: Code dễ maintain hơn
- **Future-proof**: Chuẩn bị cho các phiên bản React tương lai

## Ưu điểm của API mới / Advantages of New APIs

- Hỗ trợ Concurrent Features
- Performance tốt hơn
- An toàn hơn
- Dễ sử dụng hơn
- Tương thích với các tính năng mới của React
- Better TypeScript support

## Nhược điểm của Legacy APIs / Disadvantages of Legacy APIs

- Không hỗ trợ Concurrent Features
- Performance kém
- Không an toàn
- Sẽ bị xóa trong tương lai
- Không tương thích với các tính năng mới
- Khó maintain

## Best Practices / Các thực hành tốt

- Luôn sử dụng API mới nhất
- Migrate codebase sang API mới
- Sử dụng ESLint rules để detect legacy APIs
- Test kỹ sau khi migrate
- Đọc documentation trước khi migrate
- Sử dụng codemods để tự động migrate

## Common Pitfalls / Các lỗi thường gặp

- Quên migrate legacy APIs khi upgrade React
- Sử dụng `findDOMNode` thay vì refs
- Sử dụng String Refs thay vì callback refs hoặc `useRef`
- Sử dụng `componentWillMount` thay vì `constructor` hoặc `componentDidMount`
- Sử dụng `componentWillReceiveProps` thay vì `getDerivedStateFromProps`

## Migration Guide / Hướng dẫn migrate

### 1. Migrate `ReactDOM.render` → `createRoot`

```bash
npx react-codemod react-18-create-root
```

### 2. Migrate `componentWillMount` → `constructor` / `componentDidMount`

```bash
npx react-codemod react-18-no-will-mount
```

### 3. Migrate `componentWillReceiveProps` → `getDerivedStateFromProps`

```bash
npx react-codemod react-18-no-will-receive-props
```

### 4. Migrate `componentWillUpdate` → `getSnapshotBeforeUpdate`

```bash
npx react-codemod react-18-no-will-update
```

## Tài liệu tham khảo / References

- [React 18: What's New - react.dev](https://react.dev/blog/2022/03/29/react-v18)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [React 18 Upgrade Guide - react.dev](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [Legacy APIs - react.dev](https://react.dev/reference/react/legacy)

## Câu hỏi phỏng vấn / Interview Questions

1. Tại sao `ReactDOM.render` bị deprecated và nên thay thế bằng gì?
2. Sự khác biệt giữa `ReactDOM.render` và `createRoot`?
3. Tại sao `componentWillMount` bị deprecated và nên thay thế bằng gì?
4. Sự khác biệt giữa `componentWillReceiveProps` và `getDerivedStateFromProps`?
5. Tại sao `ReactDOM.findDOMNode` bị deprecated và nên thay thế bằng gì?
6. String Refs có vấn đề gì và nên thay thế bằng gì?
7. Concurrent Features là gì và tại sao cần migrate?
8. Làm thế nào để migrate từ legacy APIs sang API mới?
9. React 18+ có những tính năng mới nào không có trong legacy APIs?
10. Làm thế nào để detect legacy APIs trong codebase?
