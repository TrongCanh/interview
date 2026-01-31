/**
 * Vercel Serverless Function - Search Files
 * Endpoint: /api/search?q=<query>
 */

const fs = require("fs").promises;
const path = require("path");

// Path đến thư mục data
const DATA_PATH = path.join(__dirname, "..", "data");

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

  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Thiếu tham số q",
    });
  }

  try {
    const results = [];
    await searchFiles(DATA_PATH, "", query, results);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error in /api/search:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
