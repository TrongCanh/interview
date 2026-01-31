# 41. Implement `EventEmitter` / Triển Khai EventEmitter

## Tổng quan về EventEmitter

### Mục đích của EventEmitter / Purpose

**EventEmitter** là pattern để implement publish-subscribe pattern, cho phép objects communicate với nhau thông qua events.

**Mục đích chính:**

- Decouple components
- Enable communication giữa objects
- Publish-subscribe pattern
- Event-driven architecture

### Khi nào nên dùng / When to Use

- Khi cần decouple components
- Khi muốn event-driven architecture
- Khi cần communication giữa objects
- Khi muốn flexible architecture

### Giúp ích gì / Benefits

**Lợi ích:**

- **Decoupled**: Components không phụ thuộc nhau
- **Flexible**: Dễ thêm/removes listeners
- **Event-driven**: Event-driven architecture
- **Scalable**: Dễ scale system

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm      | Giải thích                 |
| ------------ | -------------------------- |
| Decoupled    | Components không phụ thuộc |
| Flexible     | Dễ thêm/removes listeners  |
| Event-driven | Event-driven architecture  |
| Scalable     | Dễ scale system            |

**Nhược điểm (Cons):**

| Nhược điểm | Giải thích                            |
| ---------- | ------------------------------------- |
| Complexity | Code phức tạp hơn                     |
| Memory     | Có thể memory leaks nếu không cleanup |
| Debugging  | Khó debug hơn callbacks               |

---

## Implement `EventEmitter`?

**Implement `EventEmitter`** là viết class để implement publish-subscribe pattern.

### Mục đích / Purpose

- Tạo EventEmitter class
- Implement publish-subscribe pattern
- Handle events
- Manage listeners

### Khi nào dùng / When to Use

- Khi cần event-driven architecture
- Khi muốn decouple components
- Khi cần communication giữa objects

### Ví dụ:

```javascript
// Method 1: Basic EventEmitter implementation
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }
    const index = this.events[event].indexOf(listener);
    if (index === -1) {
      return;
    }
    this.events[event].splice(index, 1);
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    this.on(event, onceWrapper);
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on("data", (data) => {
  console.log("Data received:", data);
});

emitter.emit("data", { value: 42 });

emitter.off("data", handler);
```

### Best Practices:

```javascript
// ✅ Dùng EventEmitter để decouple components
const emitter = new EventEmitter();
const component1 = new Component(emitter);
const component2 = new Component(emitter);

// ✅ Dùng once cho one-time events
emitter.once("init", () => {
  console.log("Initialized");
});

// ✅ Cleanup listeners khi không cần
emitter.off("event", handler);

// ✅ Dùng emit với multiple arguments
emitter.emit("event", arg1, arg2, arg3);

// ❌ Tránh memory leaks
// Luôn off listeners khi component unmount
```

---

## Test Cases

```javascript
// Test 1: Basic on/emit
const emitter = new EventEmitter();
let callCount = 0;

emitter.on("test", (data) => {
  callCount++;
  console.log("Test:", data, "Count:", callCount);
});

emitter.emit("test", "value");
emitter.emit("test", "value");
emitter.emit("test", "value");
console.log(callCount); // 3

// Test 2: Multiple listeners
const emitter = new EventEmitter();
const results = [];

emitter.on("test", (data) => {
  results.push(data);
});

emitter.emit("test", "value1");
emitter.emit("test", "value2");
console.log(results); // ['value1', 'value2']

// Test 3: Off listener
const emitter = new EventEmitter();
let callCount = 0;

const handler = (data) => {
  callCount++;
  console.log("Handler:", data);
};

emitter.on("test", handler);
emitter.emit("test", "value");
emitter.off("test", handler);
emitter.emit("test", "value");
console.log(callCount); // 1

// Test 4: Once listener
const emitter = new EventEmitter();
let callCount = 0;

emitter.once("test", (data) => {
  callCount++;
  console.log("Once:", data, "Count:", callCount);
});

emitter.emit("test", "value");
emitter.emit("test", "value");
console.log(callCount); // 1 (only called once)

// Test 5: Multiple events
const emitter = new EventEmitter();
const events = [];

emitter.on("event1", (data) => events.push({ event: "event1", data }));
emitter.on("event2", (data) => events.push({ event: "event2", data }));

emitter.emit("event1", "value1");
emitter.emit("event2", "value2");
console.log(events); // [{ event: 'event1', data: 'value1' }, { event: 'event2', data: 'value2' }]
```

---

## Complete Implementation

```javascript
/**
 * EventEmitter class for publish-subscribe pattern
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to event
   * @param {string} event - Event name
   * @param {Function} listener - Event listener function
   * @returns {Function} Unsubscribe function
   */
  on(event, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }
    if (typeof event !== "string") {
      throw new TypeError("Event must be a string");
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    // Return unsubscribe function
    return () => this.off(event, listener);
  }

  /**
   * Unsubscribe from event
   * @param {string} event - Event name
   * @param {Function} listener - Event listener function
   */
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    const listeners = this.events[event];
    const index = listeners.indexOf(listener);

    if (index === -1) {
      return;
    }

    listeners.splice(index, 1);

    // Remove empty array
    if (listeners.length === 0) {
      delete this.events[event];
    }
  }

  /**
   * Emit event
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to listeners
   */
  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    const listeners = [...this.events[event]];

    // Call all listeners
    listeners.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        // Error in listener shouldn't break other listeners
        console.error("Error in listener:", error);
      }
    });
  }

  /**
   * Subscribe to event once
   * @param {string} event - Event name
   * @param {Function} listener - Event listener function
   * @returns {Function} Unsubscribe function
   */
  once(event, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      try {
        listener(...args);
      } catch (error) {
        console.error("Error in once listener:", error);
      }
    };

    this.on(event, onceWrapper);

    // Return unsubscribe function
    return () => this.off(event, onceWrapper);
  }

  /**
   * Get all listeners for event
   * @param {string} event - Event name
   * @returns {Array} Array of listeners
   */
  listeners(event) {
    return this.events[event] ? [...this.events[event]] : [];
  }

  /**
   * Remove all listeners for event
   * @param {string} event - Event name
   */
  removeAllListeners(event) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = [];
  }

  /**
   * Remove all listeners
   */
  removeAllListeners() {
    this.events = {};
  }

  /**
   * Get event count
   * @param {string} event - Event name
   * @returns {number} Number of listeners
   */
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  /**
   * Get all events
   * @returns {Array} Array of event names
   */
  eventNames() {
    return Object.keys(this.events);
  }
}

// Usage examples

// Example 1: Basic usage
const emitter = new EventEmitter();

const unsubscribe = emitter.on("data", (data) => {
  console.log("Data:", data);
});

emitter.emit("data", { value: 42 });

// Unsubscribe when done
unsubscribe();

// Example 2: Multiple listeners
const emitter = new EventEmitter();

emitter.on("click", (e) => {
  console.log("Button clicked:", e.target);
});

emitter.on("click", (e) => {
  console.log("Button clicked again:", e.target);
});

emitter.emit("click", { target: document.getElementById("button") });

// Example 3: Once listener
const emitter = new EventEmitter();

emitter.once("init", () => {
  console.log("Initialized");
});

emitter.emit("init");
emitter.emit("init"); // Only logs once

// Example 4: Cleanup
const emitter = new EventEmitter();
const unsubscribe1 = emitter.on("event1", handler1);
const unsubscribe2 = emitter.on("event2", handler2);

// Cleanup all listeners
emitter.removeAllListeners("event1");
emitter.removeAllListeners("event2");

// Example 5: Event-driven architecture
class Component {
  constructor(emitter) {
    this.emitter = emitter;
    this.init();
  }

  init() {
    this.emitter.on("data", this.handleData.bind(this));
    this.emitter.on("error", this.handleError.bind(this));
  }

  handleData(data) {
    console.log("Data received:", data);
  }

  handleError(error) {
    console.error("Error occurred:", error);
  }

  destroy() {
    this.emitter.removeAllListeners();
  }
}
```

---

## Use Cases

```javascript
// 1. Decoupled components
const emitter = new EventEmitter();

class UserService {
  constructor(emitter) {
    this.emitter = emitter;
  }

  fetchUser(id) {
    fetch(`/api/users/${id}`)
      .then((user) => this.emitter.emit("userLoaded", user))
      .catch((error) => this.emitter.emit("userError", error));
  }
}

class UI {
  constructor(emitter) {
    this.emitter = emitter;
    this.init();
  }

  init() {
    this.emitter.on("userLoaded", this.showUser.bind(this));
    this.emitter.on("userError", this.showError.bind(this));
  }

  showUser(user) {
    console.log("User loaded:", user);
  }

  showError(error) {
    console.error("Error:", error);
  }
}

const emitter = new EventEmitter();
const userService = new UserService(emitter);
const ui = new UI(emitter);

userService.fetchUser(1);

// 2. Event-driven architecture
class EventBus {
  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(event, data) {
    this.emitter.emit(event, data);
  }

  on(event, listener) {
    return this.emitter.on(event, listener);
  }

  off(event, listener) {
    this.emitter.off(event, listener);
  }
}

const eventBus = new EventBus();

eventBus.on("user:created", (user) => {
  console.log("User created:", user);
});

eventBus.emit("user:created", { id: 1, name: "John" });

// 3. Real-time updates
class RealtimeService {
  constructor(emitter) {
    this.emitter = emitter;
    this.init();
  }

  init() {
    setInterval(() => {
      const data = this.fetchData();
      this.emitter.emit("data:update", data);
    }, 1000);
  }

  fetchData() {
    return { timestamp: Date.now(), value: Math.random() };
  }
}

const service = new RealtimeService(new EventEmitter());
service.on("data:update", (data) => {
  console.log("Data updated:", data);
});
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Quên cleanup listeners
class Component {
  constructor(emitter) {
    this.emitter = emitter;
    this.emitter.on("event", this.handleEvent.bind(this));
  }
  // Quên off trong destroy
}

// ✅ Luôn cleanup listeners
class Component {
  constructor(emitter) {
    this.emitter = emitter;
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.unsubscribe = this.emitter.on("event", this.handleEvent.bind(this));
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// ❌ Error trong listener breaks other listeners
emitter.on("event", (data) => {
  throw new Error("Error!");
});

emitter.emit("event", "value");
// Other listeners won't execute

// ✅ Try-catch trong listeners
emitter.on("event", (data) => {
  try {
    processData(data);
  } catch (error) {
    console.error("Error:", error);
  }
});

// ❌ Memory leaks - không cleanup
function createComponent(emitter) {
  const component = {};
  emitter.on("event", component.handleEvent.bind(component));
  // Quên trả về cleanup function
  return component;
}

// ✅ Luôn trả về unsubscribe function
function createComponent(emitter) {
  const component = {};
  const unsubscribe = emitter.on(
    "event",
    component.handleEvent.bind(component),
  );
  return { ...component, unsubscribe };
}
```

---

_References: [Node.js EventEmitter](https://nodejs.org/api/events.html), [EventEmitter Pattern](https://www.patternsjs.dev/patterns/observer-pattern)_
