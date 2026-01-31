# 30. Security Best Practices / Thực Hành Bảo Mật

## Tổng quan về Security Best Practices

### Mục đích của Security Best Practices / Purpose

**Security Best Practices** là các thực hành để bảo vệ ứng dụng web khỏi các vulnerabilities và attacks.

**Mục đích chính:**

- Prevent security vulnerabilities
- Protect user data
- Prevent attacks
- Compliance với security standards

### Khi nào nên quan tâm / When to Care

- Luôn nên quan tâm security
- Khi handle user input
- Khi make network requests
- Khi store sensitive data

### Giúp ích gì / Benefits

**Lợi ích:**

- **Secure**: Ứng dụng an toàn hơn
- **Trust**: User trust cao hơn
- **Compliance**: Đạt security standards
- **Protection**: Bảo vệ khỏi attacks

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm    | Giải thích             |
| ---------- | ---------------------- |
| Secure     | Ứng dụng an toàn hơn   |
| Trust      | User trust cao hơn     |
| Compliance | Đạt security standards |
| Protection | Bảo vệ khỏi attacks    |

**Nhược điểm (Cons):**

| Nhược điểm       | Giải thích                   |
| ---------------- | ---------------------------- |
| Complexity       | Code phức tạp hơn            |
| Development time | Tốn thời gian hơn            |
| Performance      | Có thể ảnh hưởng performance |

---

## XSS (Cross-Site Scripting)?

**XSS (Cross-Site Scripting)** là attack cho phép attacker inject malicious scripts vào web pages.

### Mục đích / Purpose

- Prevent XSS attacks
- Protect users from malicious scripts
- Secure user input

### Khi nào dùng / When to Use

- Luôn nên prevent XSS
- Khi handle user input
- Khi display user content

### Ví dụ:

```javascript
// XSS vulnerability - Bad
function renderUserInput(input) {
  document.getElementById('output').innerHTML = input;
}

// Attacker injects:
// <script>alert('XSS')</script>
// <img src=x onerror=alert('XSS')>

// Prevention - Good: textContent
function renderUserInput(input) {
  document.getElementById('output').textContent = input;
}

// Prevention: escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#039;");
}

function renderUserInput(input) {
  document.getElementById('output').innerHTML = escapeHtml(input);
}

// Prevention: DOMPurify library
import DOMPurify from 'dompurify';

function renderUserInput(input) {
  document.getElementById('output').innerHTML = DOMPurify.sanitize(input);
}

// Prevention: CSP (Content Security Policy)
// Add CSP header
// Content-Security-Policy: default-src 'self'; script-src 'self'

// Prevention: validate input
function validateInput(input) {
  // Whitelist allowed characters
  if (!/^[a-zA-Z0-9 ]*$/.test(input)) {
    throw new Error('Invalid input');
  }
  return input;
}

// Prevention: encode URLs
function encodeUrl(url) {
  return encodeURIComponent(url);
}

// Prevention: use safe APIs
// Bad
element.innerHTML = userInput;

// Good
element.textContent = userInput;

// Prevention: avoid eval
// Bad
eval(userInput);

// Good
// Don't use eval with user input

// Prevention: avoid innerHTML with user input
// Bad
element.innerHTML = userInput;

// Good
element.textContent = userInput;
// hoặc
element.innerHTML = DOMPurify.sanitize(userInput);
```

### Best Practices:

```javascript
// ✅ Dùng textContent thay vì innerHTML
element.textContent = userInput;

// ✅ Escape HTML khi cần dùng innerHTML
element.innerHTML = escapeHtml(userInput);

// ✅ Dùng DOMPurify để sanitize HTML
element.innerHTML = DOMPurify.sanitize(userInput);

// ✅ Validate input
if (!/^[a-zA-Z0-9 ]*$/.test(input)) {
  throw new Error('Invalid input');
}

// ✅ Dùng CSP
Content-Security-Policy: default-src 'self'; script-src 'self'

// ❌ Tránh innerHTML với user input
element.innerHTML = userInput; // Dangerous

// ❌ Tránh eval với user input
eval(userInput); // Dangerous
```

---

## CSRF (Cross-Site Request Forgery)?

**CSRF (Cross-Site Request Forgery)** là attack cho phép attacker trick users thực hiện unwanted actions trên authenticated websites.

### Mục đích / Purpose

- Prevent CSRF attacks
- Protect authenticated actions
- Secure state-changing requests

### Khi nào dùng / When to Use

- Luôn nên prevent CSRF
- Khi handle authenticated requests
- Khi có state-changing operations

### Ví dụ:

```javascript
// CSRF vulnerability - Bad
// Attacker creates malicious site:
// <img src="https://bank.com/transfer?to=attacker&amount=1000">

// Prevention: CSRF token
// Server generates token
const csrfToken = generateCsrfToken();

// Client sends token with request
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({ to: 'user', amount: 100 })
});

// Prevention: SameSite cookies
// Server sets cookie with SameSite attribute
Set-Cookie: session=abc123; SameSite=Strict

// Prevention: verify origin
// Server verifies request origin
if (request.headers['Origin'] !== 'https://myapp.com') {
  throw new Error('Invalid origin');
}

// Prevention: custom headers
// Client sends custom header
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  body: JSON.stringify({ to: 'user', amount: 100 })
});

// Server verifies header
if (request.headers['X-Requested-With'] !== 'XMLHttpRequest') {
  throw new Error('Invalid request');
}

// Prevention: double submit cookie
// Server generates token and stores in cookie
const csrfToken = generateCsrfToken();
res.cookie('csrfToken', csrfToken);
res.json({ csrfToken });

// Client sends token in request body
fetch('/api/transfer', {
  method: 'POST',
  body: JSON.stringify({
    to: 'user',
    amount: 100,
    csrfToken: getCsrfToken()
  })
});

// Server verifies token matches cookie
if (request.body.csrfToken !== request.cookies.csrfToken) {
  throw new Error('Invalid CSRF token');
}
```

### Best Practices:

```javascript
// ✅ Dùng CSRF tokens
fetch('/api/transfer', {
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

// ✅ Dùng SameSite cookies
Set-Cookie: session=abc123; SameSite=Strict

// ✅ Verify origin
if (request.headers['Origin'] !== 'https://myapp.com') {
  throw new Error('Invalid origin');
}

// ✅ Dùng custom headers
fetch('/api/transfer', {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// ❌ Tránh không verify CSRF
// Luôn verify CSRF tokens cho state-changing requests
```

---

## Content Security Policy (CSP)?

**Content Security Policy (CSP)** là HTTP header giúp prevent XSS, clickjacking, và other attacks.

### Mục đích / Purpose

- Prevent XSS attacks
- Control resource loading
- Prevent data exfiltration

### Khi nào dùng / When to Use

- Luôn nên dùng CSP
- Khi muốn prevent XSS
- Khi muốn control resource loading

### Ví dụ:

```javascript
// CSP header examples
// Allow scripts from same origin only
Content-Security-Policy: default-src 'self'; script-src 'self'

// Allow scripts from specific domains
Content-Security-Policy: script-src 'self' https://cdn.example.com

// Allow inline scripts (not recommended)
Content-Security-Policy: script-src 'self' 'unsafe-inline'

// Allow eval (not recommended)
Content-Security-Policy: script-src 'self' 'unsafe-eval'

// Strict CSP
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'

// CSP with nonce
// Server generates nonce
const nonce = generateNonce();

// HTML
<script nonce="${nonce}">
  // Script content
</script>

// CSP header
Content-Security-Policy: script-src 'self' 'nonce-${nonce}'

// CSP with hash
// Server calculates hash
const hash = calculateHash(scriptContent);

// CSP header
Content-Security-Policy: script-src 'self' 'sha256-${hash}'

// CSP report-uri (report violations)
Content-Security-Policy: default-src 'self'; report-uri /csp-report

// Handle CSP reports
app.post('/csp-report', (req, res) => {
  console.log('CSP violation:', req.body);
  res.status(204).end();
});

// CSP in meta tag (not as secure as header)
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">

// Check if CSP is supported
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // Trusted Types supported
}
```

### Best Practices:

```javascript
// ✅ Dùng CSP header
Content-Security-Policy: default-src 'self'; script-src 'self'

// ✅ Dùng CSP report-uri để monitor violations
Content-Security-Policy: default-src 'self'; report-uri /csp-report

// ✅ Dùng CSP nonce cho dynamic scripts
<script nonce="${nonce}"></script>

// ✅ Dùng strict CSP
Content-Security-Policy: default-src 'none'; script-src 'self'

// ❌ Tránh 'unsafe-inline' và 'unsafe-eval'
Content-Security-Policy: script-src 'self' 'unsafe-inline' // Bad
```

---

## Same-Origin Policy?

**Same-Origin Policy** là security mechanism restricts how documents/scripts from one origin can interact with resources from another origin.

### Mục đích / Purpose

- Prevent cross-origin attacks
- Protect user data
- Secure cross-origin interactions

### Khi nào dùng / When to Use

- Hiểu Same-Origin Policy
- Khi làm việc với cross-origin requests
- Khi muốn secure cross-origin interactions

### Ví dụ:

```javascript
// Same origin: protocol, domain, and port match
// https://example.com:443/page1.html
// https://example.com:443/page2.html
// Same origin

// Different origin: protocol differs
// http://example.com/page1.html
// https://example.com/page2.html
// Different origin

// Different origin: domain differs
// https://example.com/page1.html
// https://sub.example.com/page2.html
// Different origin

// Different origin: port differs
// https://example.com:80/page1.html
// https://example.com:443/page2.html
// Different origin

// Cross-origin request with CORS
fetch("https://api.example.com/data", {
  mode: "cors",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Data:", data);
  });

// PostMessage for cross-origin communication
// Window 1 (sender)
const iframe = document.getElementById("iframe");
iframe.contentWindow.postMessage({ message: "Hello" }, "https://example.com");

// Window 2 (receiver)
window.addEventListener("message", (event) => {
  // Verify origin
  if (event.origin !== "https://example.com") {
    return;
  }
  console.log("Message:", event.data);
});

// JSONP (deprecated, use CORS instead)
function handleResponse(data) {
  console.log("Data:", data);
}

const script = document.createElement("script");
script.src = "https://api.example.com/data?callback=handleResponse";
document.body.appendChild(script);

// Storage: localStorage is same-origin
// https://example.com/page1.html
localStorage.setItem("key", "value");

// https://example.com/page2.html
const value = localStorage.getItem("key"); // Can access

// https://sub.example.com/page3.html
const value = localStorage.getItem("key"); // Cannot access (different origin)
```

### Best Practices:

```javascript
// ✅ Verify origin trong postMessage
window.addEventListener("message", (event) => {
  if (event.origin !== "https://example.com") {
    return;
  }
  console.log("Message:", event.data);
});

// ✅ Dùng CORS thay vì JSONP
fetch("https://api.example.com/data", { mode: "cors" });

// ✅ Hiểu Same-Origin Policy
// Cross-origin requests cần CORS hoặc postMessage

// ❌ Tránh không verify origin trong postMessage
window.addEventListener("message", (event) => {
  console.log(event.data); // Dangerous - không verify origin
});
```

---

## CORS (Cross-Origin Resource Sharing)?

**CORS (Cross-Origin Resource Sharing)** là mechanism cho phép servers specify who can access resources.

### Mục đích / Purpose

- Enable cross-origin requests
- Control access to resources
- Secure cross-origin interactions

### Khi nào dùng / When to Use

- Khi cần make cross-origin requests
- Khi muốn control access to resources
- Khi muốn secure APIs

### Ví dụ:

```javascript
// Client: make CORS request
fetch('https://api.example.com/data', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Server: set CORS headers
// Allow all origins (not recommended for production)
Access-Control-Allow-Origin: *

// Allow specific origin
Access-Control-Allow-Origin: https://myapp.com

// Allow credentials
Access-Control-Allow-Credentials: true

// Allow specific methods
Access-Control-Allow-Methods: GET, POST, PUT, DELETE

// Allow specific headers
Access-Control-Allow-Headers: Content-Type, Authorization

// Preflight request (OPTIONS)
// Client sends preflight request
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

// Server responds
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400

// CORS with credentials
fetch('https://api.example.com/data', {
  credentials: 'include'
});

// Server must allow credentials
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Credentials: true

// CORS middleware (Express)
const cors = require('cors');

app.use(cors({
  origin: 'https://myapp.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// CORS proxy (when server doesn't support CORS)
const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + targetUrl;
fetch(proxyUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Data:', data);
  });
```

### Best Practices:

```javascript
// ✅ Dùng CORS headers trên server
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization

// ✅ Dùng credentials khi cần
fetch(url, { credentials: 'include' });

// ✅ Handle preflight requests
// Server phải respond với appropriate headers

// ✅ Dùng specific origin thay vì *
Access-Control-Allow-Origin: https://myapp.com

// ❌ Tránh Access-Control-Allow-Origin: * với credentials
Access-Control-Allow-Origin: * // Bad với credentials
Access-Control-Allow-Credentials: true // Conflict với *
```

---

## Secure cookies?

**Secure cookies** là cookies được sent chỉ qua HTTPS connections.

### Mục đích / Purpose

- Protect cookies from interception
- Prevent session hijacking
- Secure authentication

### Khi nào dùng / When to Use

- Luôn nên dùng secure cookies cho HTTPS
- Khi store sensitive data trong cookies
- Khi muốn protect sessions

### Ví dụ:

```javascript
// Set secure cookie
document.cookie = 'sessionId=abc123; secure; httponly; samesite=strict';

// Server sets secure cookie
Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict

// Cookie attributes
// Secure - chỉ sent qua HTTPS
Set-Cookie: sessionId=abc123; Secure

// HttpOnly - không accessible qua JavaScript
Set-Cookie: sessionId=abc123; HttpOnly

// SameSite - CSRF protection
Set-Cookie: sessionId=abc123; SameSite=Strict
Set-Cookie: sessionId=abc123; SameSite=Lax
Set-Cookie: sessionId=abc123; SameSite=None (cần Secure)

// Max-Age - expiration in seconds
Set-Cookie: sessionId=abc123; Max-Age=3600

// Expires - expiration date
Set-Cookie: sessionId=abc123; Expires=Thu, 01 Jan 2025 00:00:00 GMT

// Path - cookie path
Set-Cookie: sessionId=abc123; Path=/

// Domain - cookie domain
Set-Cookie: sessionId=abc123; Domain=.example.com

// Secure cookie trong Express
res.cookie('sessionId', sessionId, {
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 3600
});

// Check if cookie is secure
// Browser DevTools -> Application -> Cookies
// Look for "Secure" column
```

### Best Practices:

```javascript
// ✅ Dùng Secure attribute cho HTTPS cookies
Set-Cookie: sessionId=abc123; Secure

// ✅ Dùng HttpOnly để prevent XSS
Set-Cookie: sessionId=abc123; HttpOnly

// ✅ Dùng SameSite để prevent CSRF
Set-Cookie: sessionId=abc123; SameSite=Strict

// ✅ Set expiration
Set-Cookie: sessionId=abc123; Max-Age=3600

// ❌ Tránh cookies không có Secure trên HTTPS
Set-Cookie: sessionId=abc123; // Bad trên HTTPS

// ❌ Tránh cookies không có HttpOnly
Set-Cookie: sessionId=abc123; // Bad - vulnerable to XSS
```

---

## Input sanitization?

**Input sanitization** là việc clean và validate user input để prevent attacks.

### Mục đích / Purpose

- Prevent XSS attacks
- Prevent SQL injection
- Validate user input

### Khi nào dùng / When to Use

- Luôn nên sanitize user input
- Khi handle user input
- Khi display user content

### Ví dụ:

```javascript
// Sanitize HTML input
import DOMPurify from 'dompurify';

const cleanHtml = DOMPurify.sanitize(dirtyHtml);

// Escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#039;");
}

// Validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Validate number
function isValidNumber(value) {
  return !isNaN(value) && isFinite(value);
}

// Validate string length
function isValidLength(value, min, max) {
  return value.length >= min && value.length <= max;
}

// Whitelist allowed characters
function isValidInput(input) {
  return /^[a-zA-Z0-9 ]*$/.test(input);
}

// Sanitize SQL input (parameterized queries)
// Bad - SQL injection vulnerable
const query = `SELECT * FROM users WHERE name = '${userName}'`;

// Good - parameterized query
const query = 'SELECT * FROM users WHERE name = ?';
db.query(query, [userName]);

// Sanitize file upload
function isValidFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  if (!allowedExtensions.some(ext => file.name.endsWith(ext))) {
    throw new Error('Invalid file extension');
  }

  if (file.size > maxSize) {
    throw new Error('File too large');
  }

  return true;
}
```

### Best Practices:

```javascript
// ✅ Dùng DOMPurify để sanitize HTML
const cleanHtml = DOMPurify.sanitize(dirtyHtml);

// ✅ Validate input
if (!isValidEmail(email)) {
  throw new Error("Invalid email");
}

// ✅ Dùng parameterized queries
db.query("SELECT * FROM users WHERE name = ?", [userName]);

// ✅ Validate file uploads
if (!isValidFile(file)) {
  throw new Error("Invalid file");
}

// ❌ Tránh không validate input
const query = `SELECT * FROM users WHERE name = '${userName}'`; // Dangerous
```

---

## Output encoding?

**Output encoding** là việc encode output để prevent XSS attacks.

### Mục đích / Purpose

- Prevent XSS attacks
- Secure output
- Protect users

### Khi nào dùng / When to Use

- Luôn nên encode output
- Khi display user content
- Khi insert user input vào HTML

### Ví dụ:

```javascript
// Encode HTML entities
function encodeHtml(unsafe) {
  const div = document.createElement('div');
  div.textContent = unsafe;
  return div.innerHTML;
}

// hoặc
function encodeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#039;");
}

// Encode URL
function encodeUrl(unsafe) {
  return encodeURIComponent(unsafe);
}

// Encode JavaScript
function encodeJs(unsafe) {
  return unsafe
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Use textContent (safe)
element.textContent = userInput;

// Use innerHTML with encoding (safe)
element.innerHTML = encodeHtml(userInput);

// Use template literals with encoding (safe)
element.innerHTML = `<div>${encodeHtml(userInput)}</div>`;

// Use DOM API (safe)
const div = document.createElement('div');
div.textContent = userInput;
element.appendChild(div);
```

### Best Practices:

```javascript
// ✅ Dùng textContent (safe)
element.textContent = userInput;

// ✅ Encode HTML khi dùng innerHTML
element.innerHTML = encodeHtml(userInput);

// ✅ Encode URLs
const url = encodeUrl(userInput);

// ✅ Dùng DOM API (safe)
const div = document.createElement("div");
div.textContent = userInput;

// ❌ Tránh innerHTML với user input không encode
element.innerHTML = userInput; // Dangerous
```

---

## Use Cases & Patterns

### Common Security Patterns:

```javascript
// 1. Input validation middleware
function validateInput(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }

  next();
}

// 2. XSS prevention middleware
import DOMPurify from "dompurify";

function sanitizeInput(req, res, next) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
}

function sanitizeObject(obj) {
  const sanitized = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      sanitized[key] = DOMPurify.sanitize(obj[key]);
    } else if (typeof obj[key] === "object") {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
}

// 3. CSRF protection middleware
const csrf = require("csurf");

app.use(csrf({ cookie: true }));

app.post("/api/transfer", (req, res) => {
  if (!req.csrfToken()) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  // Process request...
});

// 4. Security headers middleware
function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  next();
}

// 5. Rate limiting
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);

// 6. Helmet middleware (Express)
const helmet = require("helmet");

app.use(helmet());
// Sets various security headers automatically
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Không validate input
const query = `SELECT * FROM users WHERE name = '${userName}'`;

// ✅ Validate và sanitize input
if (!isValidInput(userName)) {
  throw new Error('Invalid input');
}
db.query('SELECT * FROM users WHERE name = ?', [userName]);

// ❌ Không encode output
element.innerHTML = userInput;

// ✅ Encode output
element.textContent = userInput;
// hoặc
element.innerHTML = encodeHtml(userInput);

// ❌ Không verify origin trong postMessage
window.addEventListener('message', (event) => {
  console.log(event.data);
});

// ✅ Verify origin
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') {
    return;
  }
  console.log(event.data);
});

// ❌ Dùng cookies không có Secure/HttpOnly
Set-Cookie: sessionId=abc123;

// ✅ Dùng Secure/HttpOnly cookies
Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict
```

---

_References: [OWASP Top 10](https://owasp.org/www-project-top-ten/), [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security), [CSP Evaluator](https://csp-evaluator.withgoogle.com/)_
