# 🚀 Deployment Guide / Hướng dẫn Deploy

## 📋 Cấu trúc Project / Project Structure

```
interview-viewer/
├── server.js              # Node.js Express server
├── package.json           # Dependencies & scripts
├── vercel.json            # Vercel configuration
├── public/                # Static files (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── app.js
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
git commit -m "Initial commit"
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
- [ ] Kiểm tra trang chủ hiển thị đúng
- [ ] Kiểm tra API `/api/tree` hoạt động
- [ ] Kiểm tra API `/api/file` hoạt động
- [ ] Kiểm tra API `/api/search` hoạt động
- [ ] Kiểm tra xem nội dung từ thư mục `data/` được hiển thị đúng

---

## 🔧 Troubleshooting / Xử lý sự cố

### Lỗi: "Cannot find module"

**Giải pháp / Solution:**

```bash
cd interview-viewer
npm install
```

### Lỗi: API không hoạt động / API not working

**Giải pháp / Solution:**

- Kiểm tra file `vercel.json` có đúng cấu trúc
- Kiểm tra routes trong `vercel.json` match với API endpoints

### Lỗi: Không thể đọc file từ thư mục data / Cannot read files from data directory

**Giải pháp / Solution:**

- Đảm bảo thư mục `data/` được deploy cùng với project
- Kiểm tra `INTERVIEW_PRACTICE_PATH` trong `server.js` trỏ đúng đường dẫn

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

---

## 📞 Hỗ trợ / Support

Nếu gặp vấn đề, hãy kiểm tra:

1. [Vercel Documentation](https://vercel.com/docs)
2. [Vercel CLI Documentation](https://vercel.com/docs/cli)
3. Logs trong Vercel Dashboard

---

_Last updated: 2026-01-31_
