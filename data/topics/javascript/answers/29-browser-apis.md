# 29. Browser APIs / APIs Trình Duyệt

## Tổng quan về Browser APIs

### Mục đích của Browser APIs / Purpose

**Browser APIs** là các APIs được cung cấp bởi browser để tương tác với browser features như network, storage, media, etc.

**Mục đích chính:**

- Tương tác với browser features
- Access device capabilities
- Create rich web applications
- Improve user experience

### Khi nào nên dùng / When to Use

- Khi cần access browser features
- Khi cần device APIs
- Khi cần rich interactions
- Khi cần offline support

### Giúp ích gì / Benefits

**Lợi ích:**

- **Rich features**: Access to browser features
- **Device access**: Access to device capabilities
- **Offline**: Offline support
- **Performance**: Better performance

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm       | Giải thích                    |
| ------------- | ----------------------------- |
| Rich features | Access to browser features    |
| Device access | Access to device capabilities |
| Offline       | Offline support               |
| Modern        | Modern web applications       |

**Nhược điểm (Cons):**

| Nhược điểm      | Giải thích                     |
| --------------- | ------------------------------ |
| Browser support | Không phải browsers đều hỗ trợ |
| Permissions     | Cần user permissions           |
| Security        | Security considerations        |
| Complexity      | Code có thể phức tạp           |

---

## Fetch API?

**Fetch API** là modern API để làm network requests, thay thế cho XMLHttpRequest.

### Mục đích / Purpose

- Make HTTP requests
- Handle responses
- Async network operations

### Khi nào dùng / When to Use

- Khi cần make HTTP requests
- Khi cần fetch data
- Khi cần upload files

### Ví dụ:

```javascript
// GET request
fetch("/api/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// POST request
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John", email: "john@example.com" }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Created:", data);
  });

// PUT request
fetch("/api/users/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Jane" }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Updated:", data);
  });

// DELETE request
fetch("/api/users/1", {
  method: "DELETE",
}).then((response) => {
  if (response.ok) {
    console.log("Deleted");
  }
});

// With async/await
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Headers
fetch("/api/users", {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
    "X-Custom-Header": "value",
  },
});

// Response methods
fetch("/api/users").then((response) => {
  console.log(response.status); // 200
  console.log(response.statusText); // 'OK'
  console.log(response.headers); // Headers object
  console.log(response.ok); // true
  console.log(response.redirected); // false
  console.log(response.type); // 'basic'
  console.log(response.url); // request URL

  // Parse response
  return response.json();
});

// Upload file
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
}

// Abort request
const controller = new AbortController();
const signal = controller.signal;

fetch("/api/users", { signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("Error:", error);
    }
  });

// Abort request
controller.abort();

// Timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
```

### Best Practices:

```javascript
// ✅ Dùng async/await cho cleaner code
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// ✅ Check response.ok
if (!response.ok) {
  throw new Error("Network response was not ok");
}

// ✅ Handle errors
try {
  const data = await fetch("/api/users");
} catch (error) {
  console.error("Error:", error);
}

// ✅ Dùng AbortController để cancel requests
const controller = new AbortController();
fetch("/api/users", { signal: controller.signal });
controller.abort();

// ❌ Tránh không check response.ok
const data = await response.json(); // May throw error
```

---

## XMLHttpRequest (XHR)?

**XMLHttpRequest (XHR)** là legacy API để làm network requests, được thay thế bởi Fetch API.

### Mục đích / Purpose

- Make HTTP requests
- Handle responses
- Async network operations

### Khi nào dùng / When to Use

- Khi cần support older browsers
- Khi cần upload progress
- Khi cần XHR-specific features

### Ví dụ:

```javascript
// GET request
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/users");
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log("Data:", data);
  }
};
xhr.onerror = function () {
  console.error("Error:", xhr.statusText);
};
xhr.send();

// POST request
const xhr = new XMLHttpRequest();
xhr.open("POST", "/api/users");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function () {
  if (xhr.status === 201) {
    const data = JSON.parse(xhr.responseText);
    console.log("Created:", data);
  }
};
xhr.send(JSON.stringify({ name: "John", email: "john@example.com" }));

// Upload progress
const xhr = new XMLHttpRequest();
xhr.open("POST", "/api/upload");
xhr.upload.onprogress = function (event) {
  if (event.lengthComputable) {
    const percent = (event.loaded / event.total) * 100;
    console.log("Upload progress:", percent + "%");
  }
};
xhr.onload = function () {
  console.log("Upload complete");
};
const formData = new FormData();
formData.append("file", file);
xhr.send(formData);

// Abort request
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/users");
xhr.send();
xhr.abort();

// Wrapper function
function xhrRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network error"));
    };
    xhr.send(JSON.stringify(data));
  });
}

// Usage
xhrRequest("GET", "/api/users")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Best Practices:

```javascript
// ✅ Dùng Fetch API thay vì XHR
fetch("/api/users").then((response) => response.json());

// ✅ Dùng XHR wrapper với promises
function xhrRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // ...
  });
}

// ✅ Dùng XHR cho upload progress
xhr.upload.onprogress = function (event) {
  const percent = (event.loaded / event.total) * 100;
  console.log("Progress:", percent + "%");
};

// ❌ Tránh XHR khi có thể dùng Fetch API
// Dùng Fetch API thay thế
```

---

## WebSocket?

**WebSocket** là protocol cho bidirectional, real-time communication giữa client và server.

### Mục đích / Purpose

- Real-time communication
- Bidirectional communication
- Low latency
- Persistent connection

### Khi nào dùng / When to Use

- Khi cần real-time updates
- Khi cần bidirectional communication
- Khi cần low latency
- Chat applications, live updates

### Ví dụ:

```javascript
// Create WebSocket connection
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.onopen = function (event) {
  console.log("WebSocket connection opened");
  socket.send("Hello server!");
};

// Receive message
socket.onmessage = function (event) {
  console.log("Message from server:", event.data);
};

// Connection closed
socket.onclose = function (event) {
  console.log("WebSocket connection closed:", event.code, event.reason);
};

// Connection error
socket.onerror = function (error) {
  console.error("WebSocket error:", error);
};

// Send message
socket.send("Hello server!");

// Send JSON
socket.send(JSON.stringify({ type: "message", content: "Hello" }));

// Close connection
socket.close();

// Reconnect on close
let socket;
function connect() {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = function () {
    console.log("Connected");
  };

  socket.onclose = function () {
    console.log("Disconnected, reconnecting...");
    setTimeout(connect, 3000);
  };

  socket.onmessage = function (event) {
    console.log("Message:", event.data);
  };
}

connect();

// WebSocket with authentication
const socket = new WebSocket("ws://localhost:8080?token=abc123");

// Binary data
socket.send(new ArrayBuffer(1024));
socket.send(new Uint8Array([1, 2, 3]));
socket.send(new Blob(["Hello"], { type: "text/plain" }));

// Ping/Pong
setInterval(() => {
  socket.send(JSON.stringify({ type: "ping" }));
}, 30000);

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.type === "pong") {
    console.log("Pong received");
  }
};
```

### Best Practices:

```javascript
// ✅ Dùng WebSocket cho real-time communication
const socket = new WebSocket("ws://localhost:8080");

// ✅ Handle connection states
socket.onopen = () => console.log("Connected");
socket.onclose = () => console.log("Disconnected");
socket.onerror = (error) => console.error("Error:", error);

// ✅ Reconnect on close
socket.onclose = () => {
  setTimeout(() => connect(), 3000);
};

// ✅ Send JSON messages
socket.send(JSON.stringify({ type: "message", content: "Hello" }));

// ❌ Tránh WebSocket cho simple requests
// Dùng Fetch API thay thế
```

---

## Geolocation API?

**Geolocation API** là API để lấy location của user.

### Mục đích / Purpose

- Get user location
- Location-based features
- Map applications

### Khi nào dùng / When to Use

- Khi cần user location
- Khi có location-based features
- Khi có map applications

### Ví dụ:

```javascript
// Get current position
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
    console.log("Accuracy:", position.coords.accuracy);
    console.log("Altitude:", position.coords.altitude);
    console.log("Altitude Accuracy:", position.coords.altitudeAccuracy);
    console.log("Heading:", position.coords.heading);
    console.log("Speed:", position.coords.speed);
  },
  (error) => {
    console.error("Error:", error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  },
);

// Watch position changes
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log("Position changed:", position.coords);
  },
  (error) => {
    console.error("Error:", error.message);
  },
);

// Stop watching
navigator.geolocation.clearWatch(watchId);

// Error codes
// 1: PERMISSION_DENIED
// 2: POSITION_UNAVAILABLE
// 3: TIMEOUT

// Check if geolocation is supported
if ("geolocation" in navigator) {
  // Geolocation is supported
} else {
  // Geolocation is not supported
}

// Request permission (HTTPS required)
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Position:", position);
  },
  (error) => {
    if (error.code === 1) {
      console.error("Permission denied");
    }
  },
);

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

const distance = calculateDistance(
  40.7128,
  -74.006, // New York
  34.0522,
  -118.2437, // Los Angeles
);
console.log("Distance:", distance, "meters");
```

### Best Practices:

```javascript
// ✅ Request permission trước khi dùng geolocation
navigator.geolocation.getCurrentPosition(success, error);

// ✅ Handle errors
navigator.geolocation.getCurrentPosition(
  (position) => {},
  (error) => {
    console.error("Error:", error.message);
  },
);

// ✅ Dùng options để configure geolocation
navigator.geolocation.getCurrentPosition(success, error, {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
});

// ✅ Check if geolocation is supported
if ("geolocation" in navigator) {
  // Use geolocation
}

// ❌ Tránh geolocation trên HTTP (HTTPS required)
// Geolocation chỉ hoạt động trên HTTPS
```

---

## Web Workers?

**Web Workers** là API để chạy JavaScript ở background threads.

### Mục đích / Purpose

- Run code in background
- Parallel processing
- Non-blocking UI
- CPU-intensive tasks

### Khi nào dùng / When to Use

- Khi có CPU-intensive tasks
- Khi không muốn block UI
- Khi cần parallel processing
- Image processing, data analysis

### Ví dụ:

```javascript
// Main thread
const worker = new Worker("worker.js");

// Send message to worker
worker.postMessage({ data: largeData });

// Receive message from worker
worker.onmessage = function (event) {
  console.log("Result:", event.data);
};

// Handle worker errors
worker.onerror = function (error) {
  console.error("Worker error:", error);
};

// Terminate worker
worker.terminate();

// Worker file (worker.js)
self.onmessage = function (event) {
  const data = event.data;
  // Process data...
  const result = processData(data);
  // Send result back to main thread
  self.postMessage(result);
};

// Worker with importScripts
self.importScripts("utils.js");

self.onmessage = function (event) {
  const result = heavyCalculation(event.data);
  self.postMessage(result);
};

// Inline worker
const workerCode = `
  self.onmessage = function(event) {
    const result = event.data * 2;
    self.postMessage(result);
  };
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function (event) {
  console.log("Result:", event.data);
};

worker.postMessage(10);

// Worker with async operations
self.onmessage = async function (event) {
  const data = event.data;
  const result = await asyncProcess(data);
  self.postMessage(result);
};

// Multiple workers
const workers = [];
for (let i = 0; i < 4; i++) {
  workers.push(new Worker("worker.js"));
}

// Distribute work among workers
const chunks = splitData(largeData, 4);
workers.forEach((worker, i) => {
  worker.postMessage(chunks[i]);
});

// Collect results
let completed = 0;
const results = [];
workers.forEach((worker, i) => {
  worker.onmessage = function (event) {
    results[i] = event.data;
    completed++;
    if (completed === workers.length) {
      console.log("All results:", results);
    }
  };
});
```

### Best Practices:

```javascript
// ✅ Dùng Web Workers cho CPU-intensive tasks
const worker = new Worker("worker.js");
worker.postMessage(largeData);

// ✅ Terminate workers khi không cần
worker.terminate();

// ✅ Handle worker errors
worker.onerror = function (error) {
  console.error("Worker error:", error);
};

// ✅ Dùng multiple workers cho parallel processing
const workers = [new Worker("worker.js"), new Worker("worker.js")];

// ❌ Tránh Web Workers cho simple tasks
// Dùng main thread thay thế
```

---

## WebSockets?

**WebSockets** (đã được đề cập ở trên) là protocol cho real-time, bidirectional communication.

### Mục đích / Purpose

- Real-time communication
- Low latency
- Persistent connection

### Khi nào dùng / When to Use

- Real-time applications
- Chat applications
- Live updates
- Gaming

---

## BroadcastChannel?

**BroadcastChannel** là API để communication giữa different tabs/windows cùng origin.

### Mục đích / Purpose

- Communication giữa tabs/windows
- Sync state giữa tabs
- Cross-tab notifications

### Khi nào dùng / When to Use

- Khi cần sync giữa tabs
- Khi cần cross-tab communication
- Khi cần broadcast messages

### Ví dụ:

```javascript
// Create channel
const channel = new BroadcastChannel("my-channel");

// Send message
channel.postMessage({ type: "update", data: "Hello" });

// Receive message
channel.onmessage = function (event) {
  console.log("Message received:", event.data);
};

// Close channel
channel.close();

// Tab 1 - Sender
const channel = new BroadcastChannel("my-channel");
document.getElementById("send").addEventListener("click", () => {
  channel.postMessage({ type: "message", content: "Hello from tab 1" });
});

// Tab 2 - Receiver
const channel = new BroadcastChannel("my-channel");
channel.onmessage = function (event) {
  console.log("Received:", event.data);
  document.getElementById("output").textContent = event.data.content;
};

// Sync state giữa tabs
const channel = new BroadcastChannel("state-sync");

// Send state update
function updateState(newState) {
  state = newState;
  channel.postMessage({ type: "state-update", state });
}

// Receive state update
channel.onmessage = function (event) {
  if (event.data.type === "state-update") {
    state = event.data.state;
    render();
  }
};
```

### Best Practices:

```javascript
// ✅ Dùng BroadcastChannel cho cross-tab communication
const channel = new BroadcastChannel("my-channel");
channel.postMessage({ type: "update", data: "Hello" });

// ✅ Handle messages
channel.onmessage = function (event) {
  console.log("Received:", event.data);
};

// ✅ Close channel khi không cần
channel.close();

// ❌ Tránh BroadcastChannel cho same-tab communication
// Dùng events hoặc custom events thay thế
```

---

## Use Cases & Patterns

### Common Browser API Patterns:

```javascript
// 1. Fetch with retry
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// 2. WebSocket reconnection
class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.reconnectDelay = 1000;
    this.maxReconnectDelay = 30000;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      console.log("Connected");
      this.reconnectDelay = 1000;
    };
    this.socket.onclose = () => {
      console.log("Disconnected, reconnecting...");
      setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(
        this.reconnectDelay * 2,
        this.maxReconnectDelay,
      );
    };
    this.socket.onmessage = (event) => {
      this.onMessage(event.data);
    };
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  onMessage(data) {
    // Override in subclass
  }
}

// 3. Geolocation with permission check
async function getLocation() {
  if (!("geolocation" in navigator)) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
}

// 4. Worker pool
class WorkerPool {
  constructor(workerScript, size = 4) {
    this.workers = [];
    this.queue = [];
    for (let i = 0; i < size; i++) {
      this.workers.push(new Worker(workerScript));
    }
  }

  execute(data) {
    return new Promise((resolve, reject) => {
      const worker = this.workers.find((w) => !w.busy);
      if (worker) {
        worker.busy = true;
        worker.onmessage = (event) => {
          worker.busy = false;
          resolve(event.data);
        };
        worker.onerror = reject;
        worker.postMessage(data);
      } else {
        this.queue.push({ data, resolve, reject });
      }
    });
  }
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Không handle errors trong fetch
fetch("/api/users").then((response) => response.json()); // May throw error

// ✅ Handle errors
fetch("/api/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .catch((error) => console.error("Error:", error));

// ❌ Dùng XHR khi có thể dùng Fetch API
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/users");

// ✅ Dùng Fetch API
fetch("/api/users");

// ❌ Không request permission trước khi dùng geolocation
navigator.geolocation.getCurrentPosition(success);

// ✅ Request permission và handle errors
navigator.geolocation.getCurrentPosition(success, (error) =>
  console.error("Error:", error.message),
);

// ❌ Không terminate workers
const worker = new Worker("worker.js");

// ✅ Terminate workers khi không cần
worker.terminate();
```

---

_References: [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), [MDN Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)_
