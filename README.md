# 📁 Interview Practice Viewer

> Một ứng dụng web đơn giản để xem và quản lý các file trong project interview-practice
> A simple web application to view and manage files in the interview-practice project

---

## 🚀 Cài đặt / Installation

### Yêu cầu / Requirements

- Node.js (v14 trở lên)
- npm hoặc yarn

### Bước 1: Cài đặt dependencies / Install dependencies

```bash
cd interview-viewer
npm install
```

### Bước 2: Chạy server / Run the server

```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

---

## 📖 Tính năng / Features

### 1. File Tree / Cây thư mục

- Hiển thị cấu trúc thư mục của project interview-practice
- Expand/collapse các thư mục
- Click vào file để xem nội dung

### 2. File Preview / Xem trước file

- **Markdown (.md)**: Hiển thị với định dạng đẹp
- **JavaScript (.js)**: Highlight syntax
- **TypeScript (.ts)**: Highlight syntax
- **HTML/CSS**: Highlight syntax

### 3. Tìm kiếm / Search

- Tìm kiếm file theo tên
- Hiển thị kết quả trong modal
- Click vào kết quả để mở file

### 4. Breadcrumb Navigation

- Hiển thị đường dẫn file hiện tại
- Điều hướng nhanh

### 5. Status Bar

- Hiển thị thông tin file đang xem
- Trạng thái ứng dụng

---

## 🎨 Giao diện / Interface

### Dark Theme

- Thiết kế tối, hiện đại
- Màu sắc dễ nhìn cho lập trình viên
- Responsive design

---

## 📁 Cấu trúc project / Project Structure

```
interview-viewer/
├── public/                   # Static files
│   ├── index.html           # HTML chính
│   ├── styles.css           # Styles
│   └── app.js               # Client-side JavaScript
├── server.js                # Node.js server
├── package.json             # Dependencies
└── README.md               # File này
```

---

## 🔧 API Endpoints

### GET /api/tree

Lấy cấu trúc thư mục của interview-practice

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "topics",
      "path": "topics",
      "type": "folder",
      "children": [...]
    }
  ]
}
```

### GET /api/file?path=<file_path>

Đọc nội dung file

**Query Parameters:**

- `path`: Đường dẫn file tương đối

**Response:**

```json
{
  "success": true,
  "data": {
    "path": "topics/javascript/notes.md",
    "name": "notes.md",
    "content": "...",
    "size": 1234,
    "extension": ".md"
  }
}
```

### GET /api/search?q=<query>

Tìm kiếm file theo tên

**Query Parameters:**

- `q`: Từ khóa tìm kiếm

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "notes.md",
      "path": "topics/javascript/notes.md",
      "extension": ".md"
    }
  ]
}
```

---

## 📝 Thư viện sử dụng / Libraries Used

### Frontend

- **marked.js**: Markdown parser
- **highlight.js**: Code syntax highlighting
- **Font Awesome**: Icons

### Backend

- **Express**: Web framework
- **CORS**: Cross-origin resource sharing

---

## 🎯 Hướng dẫn sử dụng / Usage Guide

### Xem file / View a file

1. Mở ứng dụng tại `http://localhost:3000`
2. Nhìn vào cây thư mục bên trái
3. Click vào thư mục để mở rộng
4. Click vào file để xem nội dung

### Tìm kiếm file / Search for a file

1. Nhập từ khóa vào ô tìm kiếm ở góc trên bên phải
2. Nhấn Enter hoặc click vào icon tìm kiếm
3. Kết quả sẽ hiển thị trong modal
4. Click vào kết quả để mở file

### Làm mới / Refresh

Click vào icon refresh bên cạnh tiêu đề "Cấu trúc thư mục" để tải lại cây thư mục.

---

## 🛠️ Tùy chỉnh / Customization

### Thay đổi port / Change port

Mở file `server.js` và thay đổi giá trị `PORT`:

```javascript
const PORT = 3000; // Thay đổi port ở đây
```

### Thay đổi đường dẫn interview-practice / Change interview-practice path

Mở file `server.js` và thay đổi `INTERVIEW_PRACTICE_PATH`:

```javascript
const INTERVIEW_PRACTICE_PATH = path.join(
  __dirname,
  "..",
  "interview-practice",
);
```

---

## 📄 License

MIT

---

_Created for interview-practice project_
