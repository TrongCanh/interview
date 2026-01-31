# 17. Debounce & Throttle

## Tổng quan về Debounce & Throttle

### Mục đích của Debounce & Throttle / Purpose

**Debounce** và **Throttle** là techniques để limit số lần function được gọi.

**Mục đích chính:**

- Performance optimization
- Limit function calls
- Event handling
- User experience

### Khi nào cần hiểu về Debounce & Throttle / When to Use

Hiểu về Debounce & Throttle là cần thiết khi:

- Performance optimization
- Event handling
- User experience
- API calls

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Tối ưu performance
- **Limit calls**: Giới hạn function calls
- **User experience**: Tốt hơn UX
- **API optimization**: Tối ưu API calls

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm              |
| ---------------- | ----------------------- | --------------------- |
| Performance      | Tối ưu performance      | Có thể delay response |
| Limit calls      | Giới hạn function calls | Learning curve        |
| User experience  | Tốt hơn UX              | Có thể gây bugs       |
| API optimization | Tối ưu API calls        | Verbose hơn           |

---

## Debounce là gì?

**Debounce** - Function chỉ được gọi sau khi không có calls trong một khoảng thời gian.

### Mục đích / Purpose

**Debounce** được thiết kế để:

- Delay function calls
- Performance optimization
- Event handling
- User experience

### Khi nào dùng / When to Use

Debounce nên dùng khi:

- Performance optimization
- Event handling
- User experience
- API calls

### Giúp ích gì / Benefits

**Lợi ích:**

- **Delay**: Delay function calls
- **Performance**: Tối ưu performance
- **User experience**: Tốt hơn UX
- **API optimization**: Tối ưu API calls

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm           |
| --------------- | -------------------- | --------------------- |
| Delay           | Delay function calls | Có thể delay response |
| Performance     | Tối ưu performance   | Learning curve        |
| User experience | Tốt hơn UX           | Có thể gây bugs       |

### Debounce cơ bản:

```javascript
// Debounce - function chỉ được gọi sau khi không có calls trong delay
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Sử dụng
const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
}, 500);

// Event listener
searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### Debounce với immediate:

```javascript
// Debounce với immediate - gọi ngay lần đầu tiên
function debounce(fn, delay, immediate = false) {
  let timeoutId;
  let isImmediateInvoked = false;

  return function (...args) {
    const callNow = immediate && !isImmediateInvoked;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      isImmediateInvoked = false;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);

    if (callNow) {
      isImmediateInvoked = true;
      fn.apply(this, args);
    }
  };
}
```

### Best Practices:

```javascript
// ✅ Dùng debounce cho:
// - Search input
// - Resize events
// - Scroll events
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng debounce cho click events
const debouncedClick = debounce(handleClick, 500);

// ✅ Nên dùng throttle cho click events
const throttledClick = throttle(handleClick, 500);
```

---

## Throttle là gì?

**Throttle** - Function chỉ được gọi tối đa một lần trong một khoảng thời gian.

### Mục đích / Purpose

**Throttle** được thiết kế để:

- Giới hạn function calls
- Performance optimization
- Event handling
- User experience

### Khi nào dùng / When to Use

Throttle nên dùng khi:

- Performance optimization
- Event handling
- User experience
- API calls

### Giúp ích gì / Benefits

**Lợi ích:**

- **Limit**: Giới hạn function calls
- **Performance**: Tối ưu performance
- **User experience**: Tốt hơn UX
- **API optimization**: Tối ưu API calls

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- | --------------------- |
| Limit           | Giới hạn function calls | Có thể delay response |
| Performance     | Tối ưu performance      | Learning curve        |
| User experience | Tốt hơn UX              | Có thể gây bugs       |

### Throttle cơ bản:

```javascript
// Throttle - function chỉ được gọi tối đa một lần trong interval
function throttle(fn, interval) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}

// Sử dụng
const throttledScroll = throttle(() => {
  console.log("Scrolled");
}, 100);

// Event listener
window.addEventListener("scroll", throttledScroll);
```

### Throttle với trailing:

```javascript
// Throttle với trailing - gọi lần cuối cùng
function throttle(fn, interval) {
  let lastCallTime = 0;
  let timeoutId;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    clearTimeout(timeoutId);

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    } else {
      // Gọi lần cuối cùng
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastCallTime = Date.now();
      }, interval - timeSinceLastCall);
    }
  };
}
```

### Best Practices:

```javascript
// ✅ Dùng throttle cho:
// - Scroll events
// - Resize events
// - Mouse move events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng throttle cho search input
const throttledSearch = throttle((query) => {
  search(query);
}, 500);

// ✅ Nên dùng debounce cho search input
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);
```

---

## Debounce vs Throttle?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **Debounce** và **Throttle** giúp:

- Chọn đúng technique
- Hiểu JavaScript
- Performance optimization
- User experience

### Khi nào dùng / When to Use

| Technique  | Khi nào dùng            |
| ---------- | ----------------------- | --------------------------- |
| `Debounce` | Delay function calls    | Search input, resize events |
| `Throttle` | Giới hạn function calls | Scroll events, mouse move   |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Choose right**: Chọn đúng technique
- **Understand**: Hiểu JavaScript
- **Performance**: Tối ưu performance
- **User experience**: Tốt hơn UX

### Ưu nhược điểm / Pros & Cons

| Technique  | Ưu điểm                 | Nhược điểm            |
| ---------- | ----------------------- | --------------------- |
| `Debounce` | Delay function calls    | Có thể delay response |
| `Throttle` | Giới hạn function calls | Learning curve        |

### Debounce - Delay function calls:

```javascript
// Debounce - function chỉ được gọi sau khi không có calls trong delay
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Sử dụng cho search input
const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
}, 500);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### Throttle - Giới hạn function calls:

```javascript
// Throttle - function chỉ được gọi tối đa một lần trong interval
function throttle(fn, interval) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}

// Sử dụng cho scroll events
const throttledScroll = throttle(() => {
  console.log("Scrolled");
}, 100);

window.addEventListener("scroll", throttledScroll);
```

### So sánh:

```javascript
// Debounce - chỉ gọi khi user dừng typing
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);

// Throttle - gọi định kỳ
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### Best Practices:

```javascript
// ✅ Dùng debounce cho:
// - Search input
// - Resize events
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);

// ✅ Dùng throttle cho:
// - Scroll events
// - Mouse move events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng debounce cho scroll events
const debouncedScroll = debounce(() => {
  updateScrollPosition();
}, 100);

// ✅ Nên dùng throttle cho scroll events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

// ❌ Không nên dùng throttle cho search input
const throttledSearch = throttle((query) => {
  search(query);
}, 500);

// ✅ Nên dùng debounce cho search input
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);
```

---

## Implement `debounce` function?

### Mục đích / Purpose

Implement [`debounce()`](interview-practice/topics/javascript/answers/17-debounce-throttle.md:1) function giúp:

- Tự động debounce
- Performance optimization
- Event handling
- Code reuse

### Khi nào cần implement / When to Use

Cần implement [`debounce()`](interview-practice/topics/javascript/answers/17-debounce-throttle.md:1) khi:

- Performance optimization
- Event handling
- Code reuse
- Learning purposes

### Giúp ích gì / Benefits

**Lợi ích:**

- **Automatic**: Tự động debounce
- **Performance**: Tối ưu performance
- **Code reuse**: Reuse logic
- **Event handling**: Event handling

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm         |
| -------------- | ------------------ | --------------------------- |
| Automatic      | Tự động debounce   | Verbose hơn manual debounce |
| Performance    | Tối ưu performance | Có thể gây bugs             |
| Code reuse     | Reuse logic        | Learning curve              |
| Event handling | Event handling     | Verbose hơn                 |

### Implement `debounce` function:

```javascript
// Implement debounce function
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Sử dụng
const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
}, 500);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### Implement `debounce` với immediate:

```javascript
// Implement debounce với immediate
function debounce(fn, delay, immediate = false) {
  let timeoutId;
  let isImmediateInvoked = false;

  return function (...args) {
    const callNow = immediate && !isImmediateInvoked;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      isImmediateInvoked = false;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);

    if (callNow) {
      isImmediateInvoked = true;
      fn.apply(this, args);
    }
  };
}
```

### Best Practices:

```javascript
// ✅ Implement debounce cho:
// - Performance optimization
// - Event handling
// - Code reuse
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên implement debounce với bugs
function badDebounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    // Không clearTimeout!
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// ✅ Nên implement debounce đúng
function goodDebounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

---

## Implement `throttle` function?

### Mục đích / Purpose

Implement [`throttle()`](interview-practice/topics/javascript/answers/17-debounce-throttle.md:1) function giúp:

- Tự động throttle
- Performance optimization
- Event handling
- Code reuse

### Khi nào cần implement / When to Use

Cần implement [`throttle()`](interview-practice/topics/javascript/answers/17-debounce-throttle.md:1) khi:

- Performance optimization
- Event handling
- Code reuse
- Learning purposes

### Giúp ích gì / Benefits

**Lợi ích:**

- **Automatic**: Tự động throttle
- **Performance**: Tối ưu performance
- **Code reuse**: Reuse logic
- **Event handling**: Event handling

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm         |
| -------------- | ------------------ | --------------------------- |
| Automatic      | Tự động throttle   | Verbose hơn manual throttle |
| Performance    | Tối ưu performance | Có thể gây bugs             |
| Code reuse     | Reuse logic        | Learning curve              |
| Event handling | Event handling     | Verbose hơn                 |

### Implement `throttle` function:

```javascript
// Implement throttle function
function throttle(fn, interval) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}

// Sử dụng
const throttledScroll = throttle(() => {
  console.log("Scrolled");
}, 100);

window.addEventListener("scroll", throttledScroll);
```

### Implement `throttle` với trailing:

```javascript
// Implement throttle với trailing
function throttle(fn, interval) {
  let lastCallTime = 0;
  let timeoutId;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    clearTimeout(timeoutId);

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    } else {
      // Gọi lần cuối cùng
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastCallTime = Date.now();
      }, interval - timeSinceLastCall);
    }
  };
}
```

### Best Practices:

```javascript
// ✅ Implement throttle cho:
// - Performance optimization
// - Event handling
// - Code reuse
function throttle(fn, interval) {
  let lastCallTime = 0;
  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên implement throttle với bugs
function badThrottle(fn, interval) {
  let lastCallTime = 0;
  return function (...args) {
    const now = Date.now();
    // Không update lastCallTime!
    if (now - lastCallTime >= interval) {
      fn.apply(this, args);
    }
  };
}

// ✅ Nên implement throttle đúng
function goodThrottle(fn, interval) {
  let lastCallTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCallTime >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}
```

---

## Use cases: Search, Scroll, Resize?

### Mục đích / Purpose

Hiểu về **use cases** giúp:

- Chọn đúng technique
- Performance optimization
- User experience
- Event handling

### Khi nào dùng / When to Use

| Use case | Khi nào dùng               |
| -------- | -------------------------- | --------------------------------- |
| `Search` | Debounce cho search input  | User typing, API calls            |
| `Scroll` | Throttle cho scroll events | Scroll position, lazy loading     |
| `Resize` | Debounce cho resize events | Layout changes, responsive design |

### Giúp ích gì / Benefits

Hiểu về use cases giúp:

- **Choose right**: Chọn đúng technique
- **Performance**: Tối ưu performance
- **User experience**: Tốt hơn UX
- **Event handling**: Event handling

### Ưu nhược điểm / Pros & Cons

| Use case | Ưu điểm              | Nhược điểm            |
| -------- | -------------------- | --------------------- |
| `Search` | Delay API calls      | Có thể delay response |
| `Scroll` | Giới hạn calls       | Learning curve        |
| `Resize` | Delay layout changes | Có thể gây bugs       |

### Search - Debounce:

```javascript
// Search - debounce cho search input
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
  // API call
  fetch(`/api/search?q=${query}`);
}, 500);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### Scroll - Throttle:

```javascript
// Scroll - throttle cho scroll events
function throttle(fn, interval) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    if (timeSinceLastCall >= interval) {
      fn.apply(this, args);
      lastCallTime = now;
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scrolled");
  // Update scroll position
  updateScrollPosition();
}, 100);

window.addEventListener("scroll", throttledScroll);
```

### Resize - Debounce:

```javascript
// Resize - debounce cho resize events
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedResize = debounce(() => {
  console.log("Resized");
  // Update layout
  updateLayout();
}, 250);

window.addEventListener("resize", debouncedResize);
```

### Best Practices:

```javascript
// ✅ Dùng debounce cho:
// - Search input
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);

// ✅ Dùng throttle cho:
// - Scroll events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

// ✅ Dùng debounce cho:
// - Resize events
const debouncedResize = debounce(() => {
  updateLayout();
}, 250);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng throttle cho search input
const throttledSearch = throttle((query) => {
  search(query);
}, 500);

// ✅ Nên dùng debounce cho search input
const debouncedSearch = debounce((query) => {
  search(query);
}, 500);

// ❌ Không nên dùng debounce cho scroll events
const debouncedScroll = debounce(() => {
  updateScrollPosition();
}, 100);

// ✅ Nên dùng throttle cho scroll events
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```
