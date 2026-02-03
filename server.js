/**
 * Interview Practice Viewer Server
 * Server Node.js để đọc file từ thư mục interview-practice
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const chokidar = require("chokidar");

const app = express();
const PORT = 3000;

// Store SSE clients
const sseClients = new Set();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve from public directory to match Vercel deployment

// Path đến thư mục data (chứa nội dung interview-practice)
const INTERVIEW_PRACTICE_PATH = path.join(__dirname, "data");

/**
 * Lấy cấu trúc thư mục đệ quy
 * @param {string} dirPath - Đường dẫn thư mục
 * @param {string} relativePath - Đường dẫn tương đối
 * @returns {Promise<Array>} - Mảng cấu trúc thư mục
 */
async function getDirectoryStructure(dirPath, relativePath = "") {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const structure = [];

    for (const entry of entries) {
      // Bỏ qua các file ẩn và node_modules
      if (entry.name.startsWith(".") || entry.name === "node_modules") {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        // Đệ quy để lấy cấu trúc thư mục con
        structure.push({
          name: entry.name,
          path: entryRelativePath,
          type: "folder",
          children: await getDirectoryStructure(fullPath, entryRelativePath),
        });
      } else {
        // Lấy thông tin file
        const stats = await fs.stat(fullPath);
        structure.push({
          name: entry.name,
          path: entryRelativePath,
          type: "file",
          extension: path.extname(entry.name).toLowerCase(),
          size: stats.size,
        });
      }
    }

    // Sắp xếp: thư mục trước, file sau
    structure.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });

    return structure;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

/**
 * Đọc nội dung file
 * @param {string} filePath - Đường dẫn file tương đối
 * @returns {Promise<Object>} - Nội dung file và thông tin
 */
async function getFileContent(filePath) {
  try {
    const fullPath = path.join(INTERVIEW_PRACTICE_PATH, filePath);
    const content = await fs.readFile(fullPath, "utf-8");
    const stats = await fs.stat(fullPath);

    return {
      path: filePath,
      name: path.basename(filePath),
      content: content,
      size: stats.size,
      extension: path.extname(filePath).toLowerCase(),
    };
  } catch (error) {
    throw new Error(`Không thể đọc file: ${error.message}`);
  }
}

// API Routes

/**
 * GET /api/tree
 * Lấy cấu trúc thư mục của interview-practice
 */
app.get("/api/tree", async (req, res) => {
  try {
    const structure = await getDirectoryStructure(INTERVIEW_PRACTICE_PATH);
    res.json({
      success: true,
      data: structure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/file
 * Đọc nội dung file
 * Query params: path - đường dẫn file tương đối
 */
app.get("/api/file", async (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({
      success: false,
      error: "Thiếu tham số path",
    });
  }

  try {
    const fileData = await getFileContent(filePath);
    res.json({
      success: true,
      data: fileData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/search
 * Tìm kiếm file theo tên
 * Query params: q - từ khóa tìm kiếm
 */
app.get("/api/search", async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Thiếu tham số q",
    });
  }

  try {
    const results = [];
    await searchFiles(INTERVIEW_PRACTICE_PATH, "", query, results);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Tìm kiếm file đệ quy
 */
async function searchFiles(dirPath, relativePath, query, results) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    const entryRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      await searchFiles(fullPath, entryRelativePath, query, results);
    } else if (entry.name.toLowerCase().includes(query)) {
      const stats = await fs.stat(fullPath);
      results.push({
        name: entry.name,
        path: entryRelativePath,
        extension: path.extname(entry.name).toLowerCase(),
      });
    }
  }
}

// SSE endpoint for hot reload
app.get("/api/events", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add client to set
  sseClients.add(res);

  // Send initial connection message
  res.write("data: connected\n\n");

  // Remove client on disconnect
  req.on("close", () => {
    sseClients.delete(res);
  });
});

// Function to notify all clients to reload
function notifyReload() {
  sseClients.forEach((client) => {
    try {
      client.write("data: reload\n\n");
    } catch (err) {
      // Remove disconnected clients
      sseClients.delete(client);
    }
  });
}

// Start server (chỉ chạy khi không phải trên Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Interview Practice Viewer đang chạy tại:`);
    console.log(`   http://localhost:${PORT}\n`);
    console.log(`📁 Đang đọc từ: ${INTERVIEW_PRACTICE_PATH}\n`);

    // Watch public directory for changes
    const watcher = chokidar.watch("public", {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    });

    watcher.on("change", (path) => {
      console.log(`📝 File changed: ${path}`);
      notifyReload();
    });
  });
}

// Export app cho Vercel
module.exports = app;
