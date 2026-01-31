# 🚀 Deployment Guide / Hướng dẫn Deploy

## 📋 Cấu trúc Project / Project Structure

```
interview-viewer/
├── index.html             # Main HTML page (static file)
├── styles.css             # Styles (static file)
├── app.js                 # Frontend JavaScript (static file)
├── server.js              # Local development server (không dùng trên Vercel)
├── package.json           # Dependencies & scripts
├── vercel.json            # Vercel configuration
├── api/                   # Vercel Serverless Functions
│   ├── tree.js            # GET /api/tree - Lấy cấu trúc thư mục
│   ├── file.js            # GET /api/file?path=... - Đọc nội dung file
│   └── search.js          # GET /api/search?q=... - Tìm kiếm file
└── data/                  # Interview practice content
    ├── topics/            # JavaScript, React, TypeScript, etc.
    ├── leetcode/          # LeetCode solutions
    ├── resources/         # Reference materials
    ├── sessions/          # Interview session logs
    └── progress/          # Progress tracking
```

---

## 🌐 Deploy lên Vercel / Deploy to Vercel

### Cách 1: Sử dụng Vercel CLI (Recommended / Khuyến nghị)

#### Bước 1: Cài đặt Vercel CLI / Install Vercel CLI

```bash
npm install -g vercel
```

#### Bước 2: Đăng nhập vào Vercel / Login to Vercel

```bash
vercel login
```

#### Bước 3: Deploy project / Deploy project

```bash
cd interview-viewer
vercel
```

#### Bước 4: Deploy production / Deploy to production

```bash
vercel --prod
```

---

### Cách 2: Sử dụng GitHub + Vercel (Recommended cho CI/CD)

#### Bước 1: Push code lên GitHub / Push code to GitHub

```bash
cd interview-viewer
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/interview-viewer.git
git push -u origin main
```

#### Bước 2: Kết nối Vercel với GitHub / Connect Vercel with GitHub

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập với tài khoản GitHub
3. Click "Add New Project"
4. Import repository `interview-viewer` từ GitHub
5. Click "Deploy"

#### Bước 3: Cấu hình Environment Variables (nếu cần) / Configure Environment Variables (if needed)

Không cần environment variables cho project này.

---

### Cách 3: Sử dụng Vercel Dashboard

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập hoặc tạo tài khoản
3. Click "Add New" → "Project"
4. Import project từ:
   - GitHub
   - GitLab
   - Bitbucket
   - Hoặc upload trực tiếp
5. Click "Deploy"

---

## ✅ Kiểm tra sau khi Deploy / Post-Deployment Checklist

- [ ] Truy cập URL được cung cấp bởi Vercel
- [ ] Kiểm tra trang chủ hiển thị đúng (`/` hoặc `/index.html`)
- [ ] Kiểm tra API `/api/tree` hoạt động
- [ ] Kiểm tra API `/api/file` hoạt động
- [ ] Kiểm tra API `/api/search` hoạt động
- [ ] Kiểm tra xem nội dung từ thư mục `data/` được hiển thị đúng

---

## 🔧 Troubleshooting / Xử lý sự cố

### Lỗi: Giao diện trắng / White screen

**Nguyên nhân / Cause:**

- Static files không được serve đúng cách

**Giải pháp / Solution:**

- Đảm bảo file `index.html`, `styles.css`, `app.js` nằm ở thư mục gốc
- Không đặt trong thư mục `public/` khi deploy lên Vercel
- Kiểm tra logs trong Vercel Dashboard

### Lỗi: 404 Not Found

**Giải pháp / Solution:**

- Đảm bảo thư mục `api/` có 3 file: `tree.js`, `file.js`, `search.js`
- Kiểm tra file `vercel.json` có cấu hình đúng
- Xem logs trong Vercel Dashboard

### Lỗi: "Cannot find module"

**Giải pháp / Solution:**

```bash
cd interview-viewer
npm install
```

### Lỗi: API không hoạt động / API not working

**Giải pháp / Solution:**

- Kiểm tra file trong thư mục `api/` có export default function
- Kiểm tra CORS headers được set đúng
- Xem logs trong Vercel Dashboard → Functions

### Lỗi: Không thể đọc file từ thư mục data / Cannot read files from data directory

**Giải pháp / Solution:**

- Đảm bảo thư mục `data/` được commit và push lên GitHub
- Kiểm tra `DATA_PATH` trong các file API trỏ đúng đường dẫn
- Xem logs trong Vercel Dashboard

---

## 📝 Cập nhật nội dung / Updating Content

Để cập nhật nội dung interview-practice:

1. Cập nhật file trong thư mục `data/`
2. Commit và push lên GitHub (nếu dùng GitHub + Vercel)
3. Vercel sẽ tự động redeploy

Hoặc nếu dùng Vercel CLI:

```bash
vercel --prod
```

---

## 🌟 Tính năng / Features

- **File Browser**: Xem cấu trúc thư mục interview-practice
- **File Viewer**: Đọc nội dung file markdown, JavaScript, v.v.
- **Search**: Tìm kiếm file theo tên
- **Responsive**: Hoạt động tốt trên desktop và mobile
- **Serverless Functions**: API endpoints chạy trên Vercel Edge Network

---

## 📞 Hỗ trợ / Support

Nếu gặp vấn đề, hãy kiểm tra:

1. [Vercel Documentation](https://vercel.com/docs)
2. [Vercel Functions Documentation](https://vercel.com/docs/functions)
3. [Vercel CLI Documentation](https://vercel.com/docs/cli)
4. Logs trong Vercel Dashboard

---

## 🔍 Debugging Tips

### Kiểm tra Logs trong Vercel Dashboard

1. Truy cập Vercel Dashboard
2. Chọn project của bạn
3. Click tab "Functions"
4. Chọn function cần debug
5. Xem logs và errors

### Test API cục bộ / Test API locally

```bash
# Install Vercel CLI
npm install -g vercel

# Test locally
cd interview-viewer
vercel dev
```

### Kiểm tra Build Logs

1. Truy cập Vercel Dashboard
2. Chọn project của bạn
3. Click tab "Deployments"
4. Chọn deployment gần nhất
5. Xem Build Logs

---

_Last updated: 2026-01-31_
