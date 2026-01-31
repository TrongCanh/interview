# 13. File Storage System

## Tổng quan về File Storage System

### Mục đích của File Storage System / Purpose

**File Storage System** là một service cho phép users upload, store, và download files.

**Mục đích chính:**

- Upload và download files
- File management (organize, delete, share)
- Storage optimization
- Access control
- Media processing

### Khi nào cần hiểu về File Storage System / When to Use

Hiểu về File Storage System là cần thiết khi:

- Thiết kế file sharing service
- Xử lý large file uploads
- Cần file storage optimization
- Xây dựng media management
- Implement access control

### Giúp ích gì / Benefits

**Lợi ích:**

- **Storage**: Centralized file storage
- **Access control**: Control file access
- **Optimization**: Storage optimization
- **Scalability**: Scalable storage
- **Processing**: Media processing

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm      |
| --------------------- | --------------- |
| - Centralized storage | Storage cost    |
| - Access control      | Complexity      |
| - Optimization        | Network latency |
| - Scalability         | Data migration  |

---

## Upload/download files?

**File upload/download** là quá trình transfer files giữa client và server.

### Mục đích / Purpose

Enable file transfer giữa client và server.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng             |
| ---------------- | ------------------------ |
| - File uploads   | Khi users upload files   |
| - File downloads | Khi users download files |
| - Large files    | Khi xử lý large files    |
| - Multiple files | Khi xử lý multiple files |

### Giúp ích gì / Benefits

- **File transfer**: File transfer capability
- **Resume support**: Resume interrupted uploads
- **Chunking**: Handle large files
- **Progress tracking**: Track upload/download progress

### Ưu nhược điểm / Pros & Cons

| Feature        | Ưu điểm            | Nhược điểm      |
| -------------- | ------------------ | --------------- |
| Chunking       | Handle large files | Complexity      |
| Resume         | Resume interrupted | More state      |
| Progress       | Track progress     | More requests   |
| Multiple files | Batch uploads      | More complexity |

### Ví dụ:

```javascript
// File Upload/Download Implementation

class FileStorage {
  constructor(storageService, database, cache) {
    this.storageService = storageService; // S3, GCS, etc.
    this.database = database;
    this.cache = cache;
    this.chunkSize = 5 * 1024 * 1024; // 5MB chunks
    this.maxFileSize = 100 * 1024 * 1024; // 100MB max
  }

  async initiateUpload(userId, fileName, fileSize, contentType) {
    // Validate file
    if (fileSize > this.maxFileSize) {
      throw new Error("File too large");
    }

    // Generate upload ID
    const uploadId = generateUploadId();

    // Calculate number of chunks
    const totalChunks = Math.ceil(fileSize / this.chunkSize);

    // Save upload metadata
    await this.database.insert("uploads", {
      id: uploadId,
      userId,
      fileName,
      fileSize,
      contentType,
      totalChunks,
      uploadedChunks: 0,
      status: "initiated",
      createdAt: new Date(),
    });

    return {
      uploadId,
      chunkSize: this.chunkSize,
      totalChunks,
    };
  }

  async uploadChunk(uploadId, chunkIndex, chunkData) {
    // Get upload metadata
    const upload = await this.database.query(
      "SELECT * FROM uploads WHERE id = ?",
      [uploadId],
    );

    if (!upload || upload.status !== "initiated") {
      throw new Error("Invalid upload ID");
    }

    // Upload chunk to storage service
    const chunkKey = `${uploadId}/${chunkIndex}`;
    await this.storageService.upload(chunkKey, chunkData, {
      contentType: upload.contentType,
    });

    // Update upload progress
    await this.database.update(
      "uploads",
      {
        uploadedChunks: upload.uploadedChunks + 1,
        status:
          upload.uploadedChunks + 1 >= upload.totalChunks
            ? "completed"
            : "uploading",
      },
      { id: uploadId },
    );

    // Cache chunk location
    await this.cache.set(`chunk:${uploadId}:${chunkIndex}`, chunkKey, {
      ttl: 3600,
    });

    return { success: true, uploadedChunks: upload.uploadedChunks + 1 };
  }

  async completeUpload(uploadId) {
    // Get upload metadata
    const upload = await this.database.query(
      "SELECT * FROM uploads WHERE id = ?",
      [uploadId],
    );

    if (!upload || upload.uploadedChunks !== upload.totalChunks) {
      throw new Error("Upload not complete");
    }

    // Combine chunks into single file
    const fileKey = `files/${upload.userId}/${uploadId}/${upload.fileName}`;
    await this.storageService.combineChunks(
      uploadId,
      upload.totalChunks,
      fileKey,
    );

    // Save file metadata
    const fileId = await this.database.insert("files", {
      userId: upload.userId,
      fileName: upload.fileName,
      fileSize: upload.fileSize,
      contentType: upload.contentType,
      storageKey: fileKey,
      uploadId,
      createdAt: new Date(),
    });

    // Update upload status
    await this.database.update(
      "uploads",
      { status: "completed", fileId },
      { id: uploadId },
    );

    // Cleanup chunks
    await this.storageService.deleteChunks(uploadId);

    return { fileId, fileKey };
  }

  async initiateDownload(fileId, userId) {
    // Get file metadata
    const file = await this.database.query(
      "SELECT * FROM files WHERE id = ? AND userId = ?",
      [fileId, userId],
    );

    if (!file) {
      throw new Error("File not found");
    }

    // Check access permission
    if (!(await this.checkAccessPermission(userId, fileId, "read"))) {
      throw new Error("Access denied");
    }

    // Generate download URL
    const downloadUrl = await this.storageService.getSignedUrl(
      file.storageKey,
      3600, // 1 hour expiry
    );

    return {
      fileId,
      fileName: file.fileName,
      fileSize: file.fileSize,
      contentType: file.contentType,
      downloadUrl,
    };
  }

  async deleteFile(fileId, userId) {
    // Get file metadata
    const file = await this.database.query(
      "SELECT * FROM files WHERE id = ? AND userId = ?",
      [fileId, userId],
    );

    if (!file) {
      throw new Error("File not found");
    }

    // Check delete permission
    if (!(await this.checkAccessPermission(userId, fileId, "delete"))) {
      throw new Error("Access denied");
    }

    // Delete from storage
    await this.storageService.delete(file.storageKey);

    // Update file status
    await this.database.update(
      "files",
      { status: "deleted", deletedAt: new Date() },
      { id: fileId },
    );

    return { success: true };
  }

  async checkAccessPermission(userId, fileId, action) {
    // Check if user has permission
    const permission = await this.database.query(
      `SELECT * FROM file_permissions
       WHERE fileId = ? AND userId = ? AND ? IN ('read', 'write', 'delete')`,
      [fileId, userId, action],
    );

    return permission.length > 0;
  }

  async getUploadProgress(uploadId) {
    // Get upload progress
    const upload = await this.database.query(
      "SELECT * FROM uploads WHERE id = ?",
      [uploadId],
    );

    if (!upload) {
      throw new Error("Upload not found");
    }

    return {
      uploadId,
      fileName: upload.fileName,
      fileSize: upload.fileSize,
      uploadedChunks: upload.uploadedChunks,
      totalChunks: upload.totalChunks,
      status: upload.status,
      progress: (upload.uploadedChunks / upload.totalChunks) * 100,
    };
  }
}

// Express Routes
const express = require("express");
const multer = require("multer");
const app = express();

const fileStorage = new FileStorage(s3Service, database, redis);

// Initiate upload
app.post("/api/files/upload/initiate", async (req, res) => {
  const { fileName, fileSize, contentType } = req.body;
  const userId = req.user.id;

  try {
    const result = await fileStorage.initiateUpload(
      userId,
      fileName,
      fileSize,
      contentType,
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload chunk
app.post("/api/files/upload/chunk", async (req, res) => {
  const { uploadId, chunkIndex } = req.body;
  const userId = req.user.id;

  try {
    const result = await fileStorage.uploadChunk(
      uploadId,
      chunkIndex,
      req.file,
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Complete upload
app.post("/api/files/upload/complete", async (req, res) => {
  const { uploadId } = req.body;
  const userId = req.user.id;

  try {
    const result = await fileStorage.completeUpload(uploadId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get upload progress
app.get("/api/files/upload/progress/:uploadId", async (req, res) => {
  const { uploadId } = req.params;
  const userId = req.user.id;

  try {
    const progress = await fileStorage.getUploadProgress(uploadId);
    res.json(progress);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Download file
app.get("/api/files/download/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const userId = req.user.id;

  try {
    const result = await fileStorage.initiateDownload(fileId, userId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete file
app.delete("/api/files/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const userId = req.user.id;

  try {
    const result = await fileStorage.deleteFile(fileId, userId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// List files
app.get("/api/files", async (req, res) => {
  const userId = req.user.id;
  const { limit = 20, offset = 0 } = req.query;

  const files = await database.query(
    `SELECT * FROM files
     WHERE userId = ? AND status = 'active'
     ORDER BY createdAt DESC
     LIMIT ? OFFSET ?`,
    [userId, limit, offset],
  );

  res.json({ files });
});

// Chunking Strategy
const chunkingStrategies = {
  fixedSize: {
    description: "Fixed size chunks",
    pros: ["Simple", "Predictable"],
    cons: ["Last chunk may be small", "Not optimal for network"],
  },

  adaptive: {
    description: "Adaptive chunk size based on network",
    pros: ["Optimal for network", "Faster uploads"],
    cons: ["Complex", "Requires monitoring"],
  },

  parallel: {
    description: "Upload chunks in parallel",
    pros: ["Faster", "Better bandwidth utilization"],
    cons: ["More complex", "Ordering issues"],
  },
};

// Chunking Implementation
class ChunkedUploader {
  constructor(file, options = {}) {
    this.file = file;
    this.chunkSize = options.chunkSize || 5 * 1024 * 1024; // 5MB
    this.parallelUploads = options.parallelUploads || 3;
    this.onProgress = options.onProgress || (() => {});
  }

  async upload(uploadChunkFn) {
    const totalChunks = Math.ceil(this.file.size / this.chunkSize);
    let uploadedChunks = 0;
    const activeUploads = [];

    // Upload chunks
    for (let i = 0; i < totalChunks; i++) {
      // Wait if too many active uploads
      while (activeUploads.length >= this.parallelUploads) {
        await Promise.race(activeUploads);
        activeUploads.splice(
          activeUploads.findIndex((p) => p === result),
          1,
        );
      }

      // Upload chunk
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      const chunk = this.file.slice(start, end);

      const uploadPromise = uploadChunkFn(i, chunk).then(() => {
        uploadedChunks++;
        this.onProgress({
          uploadedChunks,
          totalChunks,
          progress: (uploadedChunks / totalChunks) * 100,
        });
      });

      activeUploads.push(uploadPromise);
    }

    // Wait for all uploads to complete
    await Promise.all(activeUploads);

    return {
      totalChunks,
      uploadedChunks,
      progress: 100,
    };
  }
}

// Usage
const fileInput = document.getElementById("fileInput");
const file = fileInput.files[0];

const uploader = new ChunkedUploader(file, {
  chunkSize: 5 * 1024 * 1024, // 5MB
  parallelUploads: 3,
  onProgress: (progress) => {
    console.log(`Upload progress: ${progress.progress}%`);
  },
});

uploader.upload(async (chunkIndex, chunk) => {
  return await fetch("/api/files/upload/chunk", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: chunk,
  });
});
```

### Best Practices:

1. **Use chunking**: Dùng chunking cho large files
2. **Support resume**: Hỗ trợ resume
3. **Track progress**: Theo dõi progress
4. **Validate files**: Validate files

```javascript
// ✅ Nên: Use chunking cho large files
const chunkSize = 5 * 1024 * 1024; // 5MB
const chunks = Math.ceil(fileSize / chunkSize);

// ✅ Nên: Support resume interrupted uploads
const uploadId = getUploadIdFromStorage();
if (uploadId) {
  resumeUpload(uploadId);
}

// ✅ Nên: Track upload progress
onProgress: (progress) => {
  console.log(`Progress: ${progress.progress}%`);
};

// ✅ Nên: Validate files before upload
if (fileSize > maxFileSize) {
  throw new Error("File too large");
}

// ❌ Không nên: Upload entire file at once
// Large files will timeout
```

---

## Chunking?

**Chunking** là chia nhỏ files thành smaller chunks để upload/download.

### Mục đích / Purpose

Handle large files và improve reliability.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng             |
| ------------------- | ------------------------ |
| - Large files       | Khi file > 10MB          |
| Unreliable network  | Khi network không stable |
| - Progress tracking | Khi cần track progress   |
| - Resume support    | Khi cần resume support   |

### Giúp ích gì / Benefits

- **Reliability**: Tăng reliability
- **Progress**: Track progress
- **Resume**: Resume interrupted uploads
- **Parallelism**: Parallel uploads

### Ưu nhược điểm / Pros & Cons

| Strategy   | Ưu điểm  | Nhược điểm   |
| ---------- | -------- | ------------ |
| Fixed size | Đơn giản | Not optimal  |
| Adaptive   | Optimal  | Complexity   |
| Parallel   | Faster   | Order issues |

### Ví dụ:

```javascript
// Chunking Strategies

const strategies = {
  fixedSize: {
    description: "Fixed size chunks",
    chunkSize: 5 * 1024 * 1024, // 5MB
    pros: ["Simple", "Predictable"],
    cons: ["Last chunk may be small", "Not optimal for network"],
  },

  adaptive: {
    description: "Adaptive chunk size based on network speed",
    algorithm: "Start with 5MB, adjust based on upload speed",
    pros: ["Optimal", "Faster"],
    cons: ["Complex", "Requires monitoring"],
  },

  exponentialBackoff: {
    description: "Exponential backoff for failed chunks",
    algorithm: "Retry with exponential delay",
    pros: ["Handles failures", "Reduces load"],
    cons: ["Slower on failures", "Complex"],
  },
};

// Adaptive Chunking Implementation
class AdaptiveChunker {
  constructor(file, options = {}) {
    this.file = file;
    this.minChunkSize = options.minChunkSize || 1 * 1024 * 1024; // 1MB
    this.maxChunkSize = options.maxChunkSize || 10 * 1024 * 1024; // 10MB
    this.chunkSize = this.minChunkSize;
    this.uploadSpeeds = [];
    this.targetUploadTime = 10000; // 10 seconds per chunk
  }

  calculateChunkSize(uploadSpeed) {
    // Update upload speeds
    this.uploadSpeeds.push(uploadSpeed);
    if (this.uploadSpeeds.length > 10) {
      this.uploadSpeeds.shift();
    }

    // Calculate average upload speed
    const avgSpeed =
      this.uploadSpeeds.reduce((a, b) => a + b, 0) / this.uploadSpeeds.length;

    // Calculate optimal chunk size
    const optimalSize = avgSpeed * this.targetUploadTime;

    // Clamp to min/max
    this.chunkSize = Math.max(
      this.minChunkSize,
      Math.min(this.maxChunkSize, optimalSize),
    );

    return this.chunkSize;
  }

  getChunks() {
    const chunks = [];
    const totalChunks = Math.ceil(this.file.size / this.chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      chunks.push({
        index: i,
        start,
        end,
        size: end - start,
        data: this.file.slice(start, end),
      });
    }

    return chunks;
  }
}

// Usage
const file = fileInput.files[0];
const chunker = new AdaptiveChunker(file);

// Get initial chunks
let chunks = chunker.getChunks();

// Upload and adjust chunk size
for (const chunk of chunks) {
  const startTime = Date.now();

  await uploadChunk(chunk);

  const duration = Date.now() - startTime;
  const speed = chunk.size / duration; // bytes per second

  // Adjust chunk size for next chunks
  chunker.calculateChunkSize(speed);

  // Re-calculate remaining chunks with new size
  if (chunk.index < chunks.length - 1) {
    chunks = chunker.getChunks();
    // Skip already uploaded chunks
    chunks = chunks.slice(chunk.index + 1);
  }
}
```

### Best Practices:

1. **Start with reasonable size**: Bắt đầu với size hợp lý
2. **Monitor upload speed**: Theo dõi upload speed
3. **Adjust gradually**: Điều chỉnh gradually
4. **Set min/max**: Đặt min/max limits

```javascript
// ✅ Nên: Start with reasonable chunk size
const chunkSize = 5 * 1024 * 1024; // 5MB

// ✅ Nên: Monitor upload speed
const speed = chunkSize / uploadDuration;
chunker.calculateChunkSize(speed);

// ✅ Nên: Set min/max limits
const minChunkSize = 1 * 1024 * 1024; // 1MB
const maxChunkSize = 10 * 1024 * 1024; // 10MB

// ❌ Không nên: Too small chunks
const chunkSize = 100 * 1024; // 100KB
// Too many requests, overhead high

// ❌ Không nên: Too large chunks
const chunkSize = 100 * 1024 * 1024; // 100MB
// Single request may timeout
```

---

## Deduplication?

**Deduplication** là kỹ thuật lưu trữ chỉ một bản copy của file giống nhau.

### Mục đích / Purpose

Giảm storage space bằng cách không lưu trữ duplicate files.

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng        |
| ------------------ | ------------------- |
| - File storage     | Khi lưu trữ files   |
| - Backup systems   | Khi backup data     |
| - Content delivery | Khi deliver content |
| - Version control  | Khi version files   |

### Giúp ích gì / Benefits

- **Storage savings**: Giảm storage space
- **Cost reduction**: Giảm chi phí
- **Faster uploads**: Uploads nhanh hơn (nếu file đã tồn tại)

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| - Storage savings | Computation overhead |
| - Cost reduction  | Complexity           |
| - Faster uploads  | Need metadata        |

### Ví dụ:

```javascript
// Deduplication Strategies

const strategies = {
  contentHash: {
    description: "Hash file content and use as key",
    algorithm: "SHA-256",
    pros: ["Exact deduplication", "Simple"],
    cons: ["Computation overhead", "Need to read entire file"],
  },

  chunkHash: {
    description: "Hash chunks and use for deduplication",
    algorithm: "SHA-256 per chunk",
    pros: ["Partial deduplication", "Faster"],
    cons: ["More storage", "Complex"],
  },

  blockSize: {
    description: "Compare fixed-size blocks",
    pros: ["Fast", "Efficient"],
    cons: ["Partial deduplication", "Complex"],
  },
};

// Content-based Deduplication
class ContentDeduplication {
  constructor(storage, database) {
    this.storage = storage;
    this.database = database;
  }

  async getFileHash(file) {
    // Calculate SHA-256 hash
    const crypto = require("crypto");
    const hash = crypto.createHash("sha256");

    // Read file in chunks to avoid memory issues
    const chunkSize = 1024 * 1024; // 1MB
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      hash.update(chunk);
      offset += chunkSize;
    }

    return hash.digest("hex");
  }

  async uploadFile(file, metadata) {
    // Calculate file hash
    const fileHash = await this.getFileHash(file);

    // Check if file already exists
    const existing = await this.database.query(
      "SELECT * FROM files WHERE contentHash = ?",
      [fileHash],
    );

    if (existing.length > 0) {
      // File already exists, return existing file
      return {
        fileId: existing[0].id,
        isNew: false,
        message: "File already exists",
      };
    }

    // Upload new file
    const storageKey = `files/${metadata.userId}/${fileHash}/${metadata.fileName}`;
    await this.storage.upload(storageKey, file, {
      contentType: metadata.contentType,
    });

    // Save file metadata
    const fileId = await this.database.insert("files", {
      ...metadata,
      contentHash: fileHash,
      storageKey,
      createdAt: new Date(),
    });

    return {
      fileId,
      isNew: true,
      message: "File uploaded successfully",
    };
  }
}

// Chunk-based Deduplication
class ChunkDeduplication {
  constructor(storage, database) {
    this.storage = storage;
    this.database = database;
    this.chunkSize = 1024 * 1024; // 1MB chunks
  }

  async getChunkHash(chunk) {
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(chunk).digest("hex");
  }

  async uploadFile(file, metadata) {
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    const chunkHashes = [];
    const existingChunks = new Map();

    // Process chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, file.size);
      const chunk = file.slice(start, end);

      // Calculate chunk hash
      const chunkHash = await this.getChunkHash(chunk);
      chunkHashes.push(chunkHash);

      // Check if chunk already exists
      const existing = await this.database.query(
        "SELECT * FROM file_chunks WHERE chunkHash = ?",
        [chunkHash],
      );

      if (existing.length > 0) {
        existingChunks.set(i, existing[0]);
      }
    }

    // Calculate overall file hash
    const fileHash = await this.getFileHash(file);

    // Check if file already exists
    const existingFile = await this.database.query(
      "SELECT * FROM files WHERE contentHash = ?",
      [fileHash],
    );

    if (existingFile.length > 0) {
      return {
        fileId: existingFile[0].id,
        isNew: false,
        message: "File already exists",
      };
    }

    // Upload only new chunks
    const storageKey = `files/${metadata.userId}/${fileHash}/${metadata.fileName}`;

    for (let i = 0; i < totalChunks; i++) {
      if (!existingChunks.has(i)) {
        const start = i * this.chunkSize;
        const end = Math.min(start + this.chunkSize, file.size);
        const chunk = file.slice(start, end);
        const chunkHash = chunkHashes[i];

        // Upload chunk
        await this.storage.upload(`${storageKey}/chunk_${i}`, chunk);

        // Save chunk metadata
        await this.database.insert("file_chunks", {
          fileId: null, // Will be updated after file is created
          chunkIndex: i,
          chunkHash,
          storageKey: `${storageKey}/chunk_${i}`,
        });
      }
    }

    // Save file metadata
    const fileId = await this.database.insert("files", {
      ...metadata,
      contentHash: fileHash,
      storageKey,
      totalChunks,
      createdAt: new Date(),
    });

    // Update chunks with fileId
    await this.database.update(
      "file_chunks",
      { fileId },
      { chunkHash: chunkHashes.map((h) => ({ chunkHash: h })) },
    );

    return {
      fileId,
      isNew: true,
      message: "File uploaded successfully",
    };
  }

  async getFileHash(file) {
    const crypto = require("crypto");
    const hash = crypto.createHash("sha256");

    const chunkSize = 1024 * 1024;
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      hash.update(chunk);
      offset += chunkSize;
    }

    return hash.digest("hex");
  }
}

// Usage
const contentDedup = new ContentDeduplication(s3Service, database);
const chunkDedup = new ChunkDeduplication(s3Service, database);

// Upload with content deduplication
const result1 = await contentDedup.uploadFile(file, {
  userId: req.user.id,
  fileName: file.name,
  contentType: file.type,
});

// Upload with chunk deduplication
const result2 = await chunkDedup.uploadFile(file, {
  userId: req.user.id,
  fileName: file.name,
  contentType: file.type,
});
```

### Best Practices:

1. **Use appropriate algorithm**: Dùng algorithm phù hợp
2. **Cache hashes**: Cache hashes
3. **Consider trade-offs**: Cân nhắc trade-offs
4. **Monitor storage savings**: Theo dõi storage savings

```javascript
// ✅ Nên: Content deduplication cho exact files
const fileHash = await getFileHash(file);

// ✅ Nên: Chunk deduplication cho large files
const chunkHashes = await getChunkHashes(file);

// ✅ Nên: Monitor storage savings
const savings = await calculateStorageSavings();

// ❌ Không nên: Không dùng deduplication
// Storage waste, higher costs
```

---

## References

- [AWS S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html)
- [File Upload Best Practices](https://cloud.google.com/storage/docs/uploading-objects)
- [Chunked Upload Implementation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files)
