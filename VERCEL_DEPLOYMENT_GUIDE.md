# 🚀 Vercel Deployment Guide - Fix "Cannot get /" Error

# Hướng dẫn Deploy Vercel - Khắc phục lỗi "Cannot get /"

## 📋 Table of Contents / Mục lục

1. [Problem Analysis / Phân tích vấn đề](#problem-analysis)
2. [Root Cause / Nguyên nhân gốc rễ](#root-cause)
3. [Solution / Giải pháp](#solution)
4. [Implementation Steps / Các bước thực hiện](#implementation-steps)
5. [Testing / Kiểm tra](#testing)

---

## 🔍 Problem Analysis / Phân tích vấn đề

### Current Situation / Tình trạng hiện tại

| Environment              | Status   | Details                               |
| ------------------------ | -------- | ------------------------------------- |
| **Local (`yarn start`)** | ✅ Works | Express server serves files correctly |
| **Vercel (deployed)**    | ❌ Fails | "Cannot get /" error                  |

### File Structure / Cấu trúc file hiện tại

```
interview-viewer/
├── public/              # Static files (problematic for Vercel)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── api/                 # Vercel Serverless Functions
│   ├── tree.js         # ✅ Works: /api/tree
│   ├── file.js         # ✅ Works: /api/file
│   └── search.js       # ✅ Works: /api/search
├── server.js           # Local Express server (not used by Vercel)
├── vercel.json         # Vercel configuration
└── data/               # Content directory
```

---

## 🎯 Root Cause / Nguyên nhân gốc rễ

### Why Local Works / Tại sao local hoạt động

**Local Environment (`yarn start`):**

```javascript
// server.js - Line 17
app.use(express.static("public"));
```

When you access `http://localhost:3000/`:

1. Express receives the request to `/`
2. `express.static("public")` middleware handles it
3. Express automatically serves `public/index.html`
4. ✅ Page loads successfully

### Why Vercel Fails / Tại sao Vercel thất bại

**Vercel Environment:**

```json
// vercel.json - Current (INCORRECT)
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/public/$1" // ❌ This doesn't work as expected
    }
  ]
}
```

When you access `https://your-app.vercel.app/`:

1. Vercel receives request to `/`
2. Rewrite rule matches `/(.*)` and redirects to `/public/`
3. **Problem**: Vercel doesn't have a handler for `/public/`
4. No file exists at `/public/index.html` in the root
5. ❌ Returns "Cannot get /"

### Key Differences / Sự khác biệt chính

| Aspect              | Local (Express)            | Vercel                                   |
| ------------------- | -------------------------- | ---------------------------------------- |
| Static File Serving | `express.static("public")` | No automatic serving                     |
| Root Path Handler   | Express middleware         | Needs explicit configuration             |
| File Location       | `public/` directory        | Should be at root or properly configured |

---

## ✅ Solution / Giải pháp

### Approach 1: Move Static Files to Root (Recommended / Khuyến nghị)

**Why this works:**

- Vercel automatically serves files from the root directory
- No complex rewrite rules needed
- Matches Vercel's best practices

**New Structure:**

```
interview-viewer/
├── index.html       # Moved from public/
├── styles.css       # Moved from public/
├── app.js           # Moved from public/
├── api/             # Serverless Functions (unchanged)
│   ├── tree.js
│   ├── file.js
│   └── search.js
├── vercel.json      # Updated configuration
└── data/            # Content (unchanged)
```

**Updated vercel.json:**

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

### Approach 2: Create Catch-All Handler (Alternative / Phương án thay thế)

Create `api/index.js` to serve static files:

```javascript
// api/index.js
const fs = require("fs").promises;
const path = require("path");

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle API routes
  if (req.url.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }

  // Serve static files from public/
  try {
    let filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(__dirname, "..", "public", filePath);

    const content = await fs.readFile(fullPath, "utf-8");

    // Set appropriate content type
    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
    };

    res.setHeader("Content-Type", contentTypes[ext] || "text/plain");
    res.status(200).send(content);
  } catch (error) {
    res.status(404).send("Not Found");
  }
}
```

---

## 📝 Implementation Steps / Các bước thực hiện

### Step 1: Move Static Files to Root / Di chuyển file static về thư mục gốc

```bash
# Move files from public/ to root
cd interview-viewer
mv public/index.html .
mv public/styles.css .
mv public/app.js .
```

Or manually copy the files.

### Step 2: Update vercel.json / Cập nhật file vercel.json

Replace the content of `vercel.json` with:

```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

### Step 3: Update server.js for Local Development / Cập nhật server.js cho local

Update the static file serving line in `server.js`:

```javascript
// Before (Line 17):
app.use(express.static("public"));

// After:
app.use(express.static(".")); // Serve from root directory
```

### Step 4: Test Locally / Kiểm tra local

```bash
cd interview-viewer
yarn start
```

Visit `http://localhost:3000/` and verify it works.

### Step 5: Deploy to Vercel / Deploy lên Vercel

```bash
# Using Vercel CLI
vercel --prod

# Or push to GitHub and let Vercel auto-deploy
git add .
git commit -m "Fix Vercel deployment - move static files to root"
git push
```

---

## 🧪 Testing / Kiểm tra

### Test Checklist / Danh sách kiểm tra

After deployment, verify:

| Test                       | Expected Result                |
| -------------------------- | ------------------------------ |
| Visit `/`                  | ✅ Shows index.html            |
| Visit `/styles.css`        | ✅ Returns CSS file            |
| Visit `/app.js`            | ✅ Returns JS file             |
| Visit `/api/tree`          | ✅ Returns directory structure |
| Visit `/api/file?path=...` | ✅ Returns file content        |
| Visit `/api/search?q=...`  | ✅ Returns search results      |

### Debug Commands / Lệnh debug

```bash
# Test Vercel deployment locally
vercel dev

# Check Vercel logs
vercel logs

# View deployment details
vercel inspect
```

---

## 📚 Additional Resources / Tài liệu tham khảo

- [Vercel Static File Serving](https://vercel.com/docs/concepts/projects/overview#static-files)
- [Vercel Rewrites](https://vercel.com/docs/configuration/project/rewrites)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Express Static Files](https://expressjs.com/en/starter/static-files.html)

---

## 🎓 Summary / Tóm tắt

### Problem Summary / Tóm tắt vấn đề

- Local works because Express serves `public/index.html` automatically
- Vercel fails because the rewrite configuration doesn't properly serve static files

### Solution Summary / Tóm tắt giải pháp

- Move static files (`index.html`, `styles.css`, `app.js`) from `public/` to root
- Update `vercel.json` to serve files from root
- Update `server.js` to serve static files from root for local development

### Result / Kết quả

After implementing these changes, both local and Vercel environments will work identically.

---

_Last updated: 2026-01-31_
