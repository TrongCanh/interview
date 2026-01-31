/**
 * Vercel Serverless Function - Get File Content
 * Endpoint: /api/file?path=<file_path>
 */

const fs = require("fs").promises;
const path = require("path");

// Path đến thư mục data
const DATA_PATH = path.join(__dirname, "..", "data");

/**
 * Đọc nội dung file
 * @param {string} filePath - Đường dẫn file tương đối
 * @returns {Promise<Object>} - Nội dung file và thông tin
 */
async function getFileContent(filePath) {
  try {
    const fullPath = path.join(DATA_PATH, filePath);
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

// Vercel Serverless Function Handler
module.exports = async function handler(req, res) {
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

  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({
      success: false,
      error: "Thiếu tham số path",
    });
  }

  try {
    const fileData = await getFileContent(filePath);
    res.status(200).json({
      success: true,
      data: fileData,
    });
  } catch (error) {
    console.error("Error in /api/file:", error);
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
