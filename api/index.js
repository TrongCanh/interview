/**
 * Vercel Serverless Function - Catch-all Handler
 * Serves static files for non-API routes
 *
 * This handler ensures that requests to the root path "/" and other
 * static file requests are properly served on Vercel.
 */

const fs = require("fs").promises;
const path = require("path");

/**
 * Get content type based on file extension
 * @param {string} ext - File extension
 * @returns {string} Content type
 */
function getContentType(ext) {
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
  };
  return contentTypes[ext] || "application/octet-stream";
}

/**
 * Main handler function for Vercel
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle HEAD requests
  if (req.method === "HEAD") {
    return res.status(200).end();
  }

  // Only allow GET requests for static files
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  // Skip API routes - they are handled by their own functions
  if (req.url.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      error: "API route not found",
    });
  }

  try {
    // Determine the file path
    let filePath = req.url === "/" ? "/index.html" : req.url;

    // Remove query string if present
    filePath = filePath.split("?")[0];

    // Decode URL-encoded characters
    filePath = decodeURIComponent(filePath);

    // Build full path
    const fullPath = path.join(__dirname, "..", filePath);

    // Security check: ensure the path doesn't escape the project directory
    const normalizedPath = path.normalize(fullPath);
    const projectRoot = path.join(__dirname, "..");
    if (!normalizedPath.startsWith(projectRoot)) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    // Read the file
    const content = await fs.readFile(normalizedPath, "utf-8");

    // Get file extension and set content type
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);

    // Set headers
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour

    // Send the content
    res.status(200).send(content);
  } catch (error) {
    // If file not found, try to serve index.html for SPA routing
    if (error.code === "ENOENT" && req.url !== "/") {
      try {
        const indexPath = path.join(__dirname, "..", "index.html");
        const indexContent = await fs.readFile(indexPath, "utf-8");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(200).send(indexContent);
        return;
      } catch (indexError) {
        // Index file also not found
        console.error("Error serving index.html:", indexError);
      }
    }

    // Log error for debugging
    console.error("Error in catch-all handler:", error);

    // Return 404
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Not Found</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #1e1e1e;
            color: #cccccc;
          }
          .error-container {
            text-align: center;
          }
          h1 {
            font-size: 4rem;
            margin: 0 0 1rem 0;
            color: #61afef;
          }
          p {
            font-size: 1.2rem;
            margin: 0;
          }
          a {
            color: #61afef;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="error-container">
          <h1>404</h1>
          <p>Page not found. <a href="/">Go to home</a></p>
        </div>
      </body>
      </html>
    `);
  }
}
