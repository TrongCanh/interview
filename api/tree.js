/**
 * Vercel Serverless Function - Get Directory Tree
 * Endpoint: /api/tree
 */

const fs = require("fs").promises;
const path = require("path");

// Path đến thư mục data
const DATA_PATH = path.join(__dirname, "..", "data");

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

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const structure = await getDirectoryStructure(DATA_PATH);
    res.status(200).json({
      success: true,
      data: structure,
    });
  } catch (error) {
    console.error("Error in /api/tree:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
