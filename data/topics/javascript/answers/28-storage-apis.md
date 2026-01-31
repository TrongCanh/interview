# 28. Storage APIs / APIs Lưu Trữ

## Tổng quan về Storage APIs

### Mục đích của Storage APIs / Purpose

**Storage APIs** là các APIs cho phép lưu trữ data trên client-side (browser) để persist data giữa sessions.

**Mục đích chính:**

- Persist data giữa sessions
- Cache data offline
- Store user preferences
- Improve performance

### Khi nào nên dùng / When to Use

- Khi cần persist data
- Khi cần offline support
- Khi cần store user preferences
- Khi cần cache data

### Giúp ích gì / Benefits

**Lợi ích:**

- **Persistent**: Data persists giữa sessions
- **Offline**: Support offline functionality
- **Fast**: Fast access to cached data
- **User experience**: Better user experience

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm    | Giải thích                    |
| ---------- | ----------------------------- |
| Persistent | Data persists giữa sessions   |
| Offline    | Support offline functionality |
| Fast       | Fast access to data           |
| Easy       | Dễ sử dụng                    |

**Nhược điểm (Cons):**

| Nhược điểm      | Giải thích               |
| --------------- | ------------------------ |
| Limited storage | Hạn chế storage space    |
| Security        | Không lưu sensitive data |
| Sync            | Không sync giữa devices  |
| Clearable       | User có thể clear data   |

---

## `localStorage` vs `sessionStorage`?

**`localStorage`** và **`sessionStorage`** là hai Web Storage APIs với khác biệt về persistence.

### Sự khác biệt:

| Đặc điểm      | localStorage                    | sessionStorage              |
| ------------- | ------------------------------- | --------------------------- |
| Persistence   | Persistent (không expire)       | Session (xóa khi tab close) |
| Scope         | Same origin, all tabs           | Same origin, same tab       |
| Storage limit | ~5-10MB                         | ~5-10MB                     |
| Accessible    | Tất cả windows/tabs cùng origin | Chỉ tab tạo ra              |

### Ví dụ:

```javascript
// localStorage - persistent
// Set item
localStorage.setItem("key", "value");
localStorage.setItem("user", JSON.stringify({ name: "John", age: 30 }));

// Get item
const value = localStorage.getItem("key"); // 'value'
const user = JSON.parse(localStorage.getItem("user")); // { name: 'John', age: 30 }

// Remove item
localStorage.removeItem("key");

// Clear all
localStorage.clear();

// Check if item exists
if (localStorage.getItem("key")) {
  // Item exists
}

// Get all keys
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}

// sessionStorage - session only
// Set item
sessionStorage.setItem("key", "value");

// Get item
const value = sessionStorage.getItem("key");

// Remove item
sessionStorage.removeItem("key");

// Clear all
sessionStorage.clear();

// Difference: sessionStorage clears when tab closes
sessionStorage.setItem("temp", "value");
// Close tab -> temp is gone

// localStorage persists
localStorage.setItem("persistent", "value");
// Close tab, reopen -> persistent still exists
```

### Best Practices:

```javascript
// ✅ Dùng localStorage cho persistent data
localStorage.setItem("userPreferences", JSON.stringify(preferences));

// ✅ Dùng sessionStorage cho temporary data
sessionStorage.setItem("formData", JSON.stringify(formData));

// ✅ Parse/serialize objects
const user = JSON.parse(localStorage.getItem("user"));

// ✅ Check if item exists
if (localStorage.getItem("user")) {
  const user = JSON.parse(localStorage.getItem("user"));
}

// ✅ Handle errors (quota exceeded)
try {
  localStorage.setItem("key", largeData);
} catch (error) {
  console.error("Storage quota exceeded");
}

// ❌ Tránh lưu sensitive data
localStorage.setItem("password", "password"); // Bad

// ❌ Tránh lưu large data
localStorage.setItem("large", hugeData); // May exceed quota
```

---

## Cookies?

**Cookies** là small pieces of data được gửi với mỗi HTTP request.

### Mục đích / Purpose

- Persist data giữa requests
- Track user sessions
- Store user preferences
- Authentication

### Khi nào dùng / When to Use

- Khi cần send data với mỗi request
- Khi cần authentication
- Khi cần track sessions
- Khi cần store data server-side access

### Ví dụ:

```javascript
// Set cookie
document.cookie = "name=John; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/";
document.cookie = "sessionId=abc123; max-age=3600; path=/; secure; httponly";

// Get all cookies
const cookies = document.cookie;
console.log(cookies); // 'name=John; sessionId=abc123'

// Parse cookies
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

const name = getCookie("name"); // 'John'

// Delete cookie
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// Cookie attributes
// expires - expiration date
document.cookie = "name=John; expires=Thu, 01 Jan 2025 00:00:00 UTC";

// max-age - max age in seconds
document.cookie = "name=John; max-age=3600";

// path - cookie path
document.cookie = "name=John; path=/";

// domain - cookie domain
document.cookie = "name=John; domain=.example.com";

// secure - HTTPS only
document.cookie = "name=John; secure";

// httponly - not accessible via JavaScript
document.cookie = "sessionId=abc123; httponly";

// samesite - CSRF protection
document.cookie = "sessionId=abc123; samesite=strict";
document.cookie = "sessionId=abc123; samesite=lax";
```

### Best Practices:

```javascript
// ✅ Dùng httponly cho sensitive cookies
document.cookie = "sessionId=abc123; httponly; secure";

// ✅ Dùng secure cho HTTPS
document.cookie = "sessionId=abc123; secure";

// ✅ Dùng samesite cho CSRF protection
document.cookie = "sessionId=abc123; samesite=strict";

// ✅ Set expiration date
document.cookie = "name=John; expires=Thu, 01 Jan 2025 00:00:00 UTC";

// ✅ Dùng max-age thay vì expires
document.cookie = "name=John; max-age=3600";

// ❌ Tránh lưu sensitive data không có httponly
document.cookie = "password=secret"; // Bad

// ❌ Tránh cookies không có secure trên HTTPS
document.cookie = "sessionId=abc123"; // Bad
```

---

## IndexedDB?

**IndexedDB** là low-level API cho storing significant amounts of structured data.

### Mục đích / Purpose

- Store large amounts of data
- Store structured data
- Offline support
- Better performance than localStorage

### Khi nào dùng / When to Use

- Khi cần store large data
- Khi cần store complex data structures
- Khi cần offline support
- Khi cần better performance

### Ví dụ:

```javascript
// Open database
const request = indexedDB.open("myDatabase", 1);

request.onerror = (event) => {
  console.error("Database error:", event.target.error);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // Create object store
  const objectStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });
  // Create indexes
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // Add data
  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");
  const addRequest = objectStore.add({
    name: "John",
    email: "john@example.com",
  });

  addRequest.onsuccess = () => {
    console.log("Data added");
  };

  // Get data
  const getRequest = objectStore.get(1);
  getRequest.onsuccess = () => {
    console.log("Data:", getRequest.result);
  };

  // Get all data
  const getAllRequest = objectStore.getAll();
  getAllRequest.onsuccess = () => {
    console.log("All data:", getAllRequest.result);
  };

  // Update data
  const updateRequest = objectStore.put({
    id: 1,
    name: "Jane",
    email: "jane@example.com",
  });
  updateRequest.onsuccess = () => {
    console.log("Data updated");
  };

  // Delete data
  const deleteRequest = objectStore.delete(1);
  deleteRequest.onsuccess = () => {
    console.log("Data deleted");
  };
};

// Using promises wrapper
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

async function addUser(user) {
  const db = await openDB("myDatabase", 1);
  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");
  return new Promise((resolve, reject) => {
    const request = objectStore.add(user);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### Best Practices:

```javascript
// ✅ Dùng IndexedDB cho large data
const db = await openDB("myDatabase", 1);

// ✅ Dùng indexes cho queries
objectStore.createIndex("email", "email", { unique: true });

// ✅ Dùng promises wrapper cho async operations
const db = await openDB("myDatabase", 1);

// ✅ Handle errors
request.onerror = () => console.error("Error:", request.error);

// ❌ Tránh IndexedDB cho small data
// Dùng localStorage thay thế
localStorage.setItem("key", "value");

// ❌ Tránh synchronous operations
// IndexedDB operations are async
```

---

## Cache API?

**Cache API** là API để cache network requests cho offline support.

### Mục đích / Purpose

- Cache network requests
- Offline support
- Improve performance
- Reduce bandwidth

### Khi nào dùng / When to Use

- Khi cần offline support
- Khi cần cache assets
- Khi cần improve performance
- Service Workers

### Ví dụ:

```javascript
// Open cache
caches.open("my-cache").then((cache) => {
  // Cache a request
  cache.add("/api/data");

  // Cache multiple requests
  cache.addAll(["/index.html", "/styles.css", "/script.js"]);

  // Get cached response
  cache.match("/api/data").then((response) => {
    if (response) {
      console.log("Cached response:", response);
    }
  });

  // Put response in cache
  fetch("/api/data").then((response) => {
    cache.put("/api/data", response);
  });

  // Delete from cache
  cache.delete("/api/data");

  // Get all cached requests
  cache.keys().then((keys) => {
    console.log("Cached requests:", keys);
  });
});

// Service Worker cache strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached response
      }
      return fetch(event.request).then((response) => {
        // Cache response
        const responseClone = response.clone();
        caches.open("my-cache").then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }),
  );
});

// Cache-first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  const cache = await caches.open("my-cache");
  cache.put(request, response.clone());
  return response;
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open("my-cache");
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}
```

### Best Practices:

```javascript
// ✅ Dùng Cache API cho offline support
caches.open("my-cache").then((cache) => {
  cache.addAll(["/index.html", "/styles.css"]);
});

// ✅ Dùng Service Workers cho cache strategies
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

// ✅ Cache responses với clone
cache.put(request, response.clone());

// ✅ Handle errors
cache.match(request).catch((error) => {
  console.error("Cache error:", error);
});

// ❌ Tránh Cache API cho small data
// Dùng localStorage thay thế
```

---

## Service Workers?

**Service Workers** là scripts chạy ở background, enable offline support và push notifications.

### Mục đích / Purpose

- Offline support
- Background sync
- Push notifications
- Cache management

### Khi nào dùng / When to Use

- Khi cần offline support
- Khi cần background sync
- Khi cần push notifications
- Progressive Web Apps

### Ví dụ:

```javascript
// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Service Worker file (sw.js)
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  // Cache assets
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/script.js"]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "my-cache") {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  // Cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open("my-cache").then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }),
  );
});

// Background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Sync data to server
  const response = await fetch("/api/sync", {
    method: "POST",
    body: JSON.stringify(getOfflineData()),
  });
  // Clear offline data
  clearOfflineData();
}

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/icon.png",
    badge: "/badge.png",
  };
  event.waitUntil(self.registration.showNotification("Notification", options));
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
```

### Best Practices:

```javascript
// ✅ Dùng Service Workers cho offline support
navigator.serviceWorker.register("/sw.js");

// ✅ Cache assets trong install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/index.html", "/styles.css"]);
    }),
  );
});

// ✅ Clean up old caches trong activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "my-cache") {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// ✅ Dùng cache strategies
event.respondWith(cacheFirst(event.request));

// ❌ Tránh blocking trong Service Worker
// Dùng event.waitUnless()
```

---

## Storage limits?

**Storage limits** là giới hạn storage cho các storage APIs.

### Mục đích / Purpose

- Hiểu storage limits
- Handle quota exceeded
- Optimize storage usage

### Khi nào dùng / When to Use

- Khi store large data
- Khi handle quota exceeded
- Khi optimize storage

### Ví dụ:

```javascript
// localStorage limit (~5-10MB)
try {
  localStorage.setItem("key", largeData);
} catch (error) {
  if (error.name === "QuotaExceededError") {
    console.error("Storage quota exceeded");
  }
}

// Check storage usage
function getStorageUsed() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
}

console.log("Storage used:", getStorageUsed(), "bytes");

// IndexedDB limit (depends on available disk space)
// Check quota
navigator.storage.estimate().then((estimate) => {
  console.log("Quota:", estimate.quota);
  console.log("Usage:", estimate.usage);
  console.log("Available:", estimate.quota - estimate.usage);
});

// Request persistent storage
navigator.storage.persist().then((persistent) => {
  if (persistent) {
    console.log("Storage is persistent");
  } else {
    console.log("Storage is not persistent");
  }
});

// Clear storage khi quota exceeded
function clearOldItems() {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  if (items.length > 100) {
    // Keep only last 100 items
    const newItems = items.slice(-100);
    localStorage.setItem("items", JSON.stringify(newItems));
  }
}
```

### Best Practices:

```javascript
// ✅ Handle quota exceeded
try {
  localStorage.setItem("key", largeData);
} catch (error) {
  if (error.name === "QuotaExceededError") {
    clearOldItems();
    localStorage.setItem("key", largeData);
  }
}

// ✅ Check storage usage
navigator.storage.estimate().then((estimate) => {
  console.log("Usage:", estimate.usage, "/", estimate.quota);
});

// ✅ Request persistent storage
navigator.storage.persist().then((persistent) => {
  console.log("Persistent:", persistent);
});

// ✅ Clear old items khi cần
clearOldItems();

// ❌ Tránh store large data trong localStorage
// Dùng IndexedDB thay thế
```

---

## Use Cases & Patterns

### Common Storage Patterns:

```javascript
// 1. User preferences
function savePreferences(preferences) {
  localStorage.setItem("preferences", JSON.stringify(preferences));
}

function loadPreferences() {
  const saved = localStorage.getItem("preferences");
  return saved ? JSON.parse(saved) : defaultPreferences;
}

// 2. Auth token
function saveToken(token) {
  localStorage.setItem("authToken", token);
}

function getToken() {
  return localStorage.getItem("authToken");
}

function clearToken() {
  localStorage.removeItem("authToken");
}

// 3. Offline data
function saveOfflineData(data) {
  const offlineData = JSON.parse(localStorage.getItem("offlineData") || "[]");
  offlineData.push(data);
  localStorage.setItem("offlineData", JSON.stringify(offlineData));
}

function syncOfflineData() {
  const offlineData = JSON.parse(localStorage.getItem("offlineData") || "[]");
  offlineData.forEach(async (data) => {
    await sendToServer(data);
  });
  localStorage.removeItem("offlineData");
}

// 4. Cache API responses
async function fetchWithCache(url) {
  const cacheKey = `cache_${url}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
}

// 5. IndexedDB wrapper
class DB {
  constructor(name, version) {
    this.db = null;
    this.name = name;
    this.version = version;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = (event) => {
        this.onUpgrade(event.target.result);
      };
    });
  }

  async add(storeName, data) {
    const transaction = this.db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    const transaction = this.db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Lưu sensitive data trong localStorage
localStorage.setItem("password", "password"); // Bad

// ✅ Dùng httponly cookies
document.cookie = "token=abc123; httponly; secure";

// ❌ Lưu large data trong localStorage
localStorage.setItem("large", hugeData); // May exceed quota

// ✅ Dùng IndexedDB cho large data
const db = await openDB("myDatabase", 1);
await addUser(largeData);

// ❌ Không handle quota exceeded
localStorage.setItem("key", largeData); // May throw error

// ✅ Handle quota exceeded
try {
  localStorage.setItem("key", largeData);
} catch (error) {
  if (error.name === "QuotaExceededError") {
    clearOldItems();
  }
}

// ❌ Parse localStorage mỗi lần
const user = JSON.parse(localStorage.getItem("user"));

// ✅ Cache parsed data
let cachedUser = null;
function getUser() {
  if (!cachedUser) {
    cachedUser = JSON.parse(localStorage.getItem("user"));
  }
  return cachedUser;
}
```

---

_References: [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), [MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)_
