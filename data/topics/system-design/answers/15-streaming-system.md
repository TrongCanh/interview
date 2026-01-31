# 15. Streaming System

## Tổng quan về Streaming System

### Mục đích của Streaming System / Purpose

**Streaming System** là một platform cho phép users stream và consume video/audio content real-time.

**Mục đích chính:**

- Stream video/audio content
- Real-time playback
- Adaptive bitrate
- Content delivery optimization
- Multi-device support

### Khi nào cần hiểu về Streaming System / When to Use

Hiểu về Streaming System là cần thiết khi:

- Thiết kế video streaming service
- Xử lý large file streaming
- Cần adaptive bitrate
- Xây dựng content delivery network
- Implement DRM protection

### Giúp ích gì / Benefits

**Lợi ích:**

- **Real-time**: Real-time playback
- **Adaptive**: Adaptive quality based on network
- **Scalability**: Scalable delivery
- **Multi-device**: Support multiple devices
- **Optimized delivery**: Optimized content delivery

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm      |
| ---------------------- | --------------- |
| - Real-time streaming  | Complexity cao  |
| - Adaptive quality     | Storage cost    |
| - CDN integration      | Network latency |
| - Multi-device support | DRM complexity  |

---

## Video streaming?

**Video streaming** là quá trình stream video content đến users.

### Mục đích / Purpose

Stream video content real-time.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng             |
| -------------------- | ------------------------ |
| - Video playback     | Khi stream video         |
| - Live streaming     | Khi live events          |
| - On-demand          | Khi VOD content          |
| - Adaptive streaming | Khi cần adaptive quality |

### Giúp ích gì / Benefits

- **Real-time**: Real-time playback
- **Adaptive**: Adaptive quality
- **Buffering**: Smooth playback
- **Seeking**: Seek to any position

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm           |
| ----------- | -------------------- |
| - Real-time | Network dependency   |
| - Adaptive  | Complexity           |
| - Buffering | Startup delay        |
| - Seeking   | Storage requirements |

### Ví dụ:

```javascript
// Video Streaming Architecture

const architecture = {
  components: [
    "Upload Service",
    "Transcoding Service",
    "Storage Service (S3/GCS)",
    "CDN",
    "Streaming Server",
    "Analytics Service",
  ],

  flow: [
    "1. User uploads video",
    "2. Video is transcoded to multiple qualities",
    "3. Videos are stored in object storage",
    "4. CDN caches videos at edge locations",
    "5. Streaming server delivers video segments",
    "6. Player requests segments based on bandwidth",
  ],
};

// Video Transcoding
class VideoTranscoder {
  constructor(storageService, transcodeQueue) {
    this.storage = storageService;
    this.queue = transcodeQueue;
  }

  async transcode(videoId, qualities) {
    // Get video
    const video = await this.storage.getVideo(videoId);

    // Add transcoding jobs to queue
    for (const quality of qualities) {
      await this.queue.add({
        videoId,
        quality,
        status: "pending",
        createdAt: new Date(),
      });
    }

    return { success: true, jobs: qualities.length };
  }

  async processTranscode(job) {
    // Update status
    await this.queue.update(job.id, { status: "processing" });

    // Transcode video (simplified)
    const outputUrl = await this.transcodeVideo(job.videoId, job.quality);

    // Save transcoded video
    await this.storage.saveTranscodedVideo({
      videoId: job.videoId,
      quality: job.quality,
      url: outputUrl,
    });

    // Update status
    await this.queue.update(job.id, {
      status: "completed",
      completedAt: new Date(),
    });

    return { success: true, url: outputUrl };
  }

  async transcodeVideo(videoId, quality) {
    // This is a simplified example
    // In production, use FFmpeg, AWS Elemental, etc.
    const video = await this.storage.getVideo(videoId);

    // Simulate transcoding
    const outputKey = `videos/${videoId}/${quality}.mp4`;
    const outputUrl = `https://cdn.example.com/${outputKey}`;

    // Save to storage
    await this.storage.upload(outputKey, video.data, {
      contentType: "video/mp4",
    });

    return outputUrl;
  }

  getTranscodingStatus(videoId) {
    return this.queue.getJobs({ videoId });
  }
}

// Adaptive Bitrate Streaming
class AdaptiveBitrateStreaming {
  constructor(videoService) {
    this.videoService = videoService;
    this.qualities = [
      { name: "360p", bitrate: 800, resolution: "640x360" },
      { name: "480p", bitrate: 1200, resolution: "854x480" },
      { name: "720p", bitrate: 2500, resolution: "1280x720" },
      { name: "1080p", bitrate: 5000, resolution: "1920x1080" },
    ];
  }

  async getManifest(videoId) {
    // Get video qualities
    const qualities = await this.videoService.getVideoQualities(videoId);

    // Generate HLS manifest
    const manifest = {
      version: 3,
      playlists: qualities.map((q) => ({
        name: q.name,
        bandwidth: q.bitrate,
        resolution: q.resolution,
        codecs: "avc1.42e01e,mp4a.40.2",
        segments: this.generateSegments(videoId, q.name),
      })),
    };

    return manifest;
  }

  generateSegments(videoId, quality) {
    // Generate segment list
    const segments = [];
    const duration = 600; // 10 minutes
    const segmentDuration = 10; // 10 seconds per segment

    for (let i = 0; i < duration / segmentDuration; i++) {
      segments.push({
        duration: segmentDuration,
        url: `https://cdn.example.com/videos/${videoId}/${quality}/segment_${i}.ts`,
      });
    }

    return segments;
  }

  async getSegment(videoId, quality, segmentIndex) {
    const segment = await this.videoService.getSegment(
      videoId,
      quality,
      segmentIndex,
    );
    return segment;
  }
}

// Streaming Server
class StreamingServer {
  constructor(videoService, cdnService) {
    this.videoService = videoService;
    this.cdnService = cdnService;
  }

  async getManifest(videoId) {
    const manifest = await this.videoService.getManifest(videoId);
    return manifest;
  }

  async getSegment(videoId, quality, segmentIndex) {
    const segment = await this.videoService.getSegment(
      videoId,
      quality,
      segmentIndex,
    );

    // Redirect to CDN
    return {
      redirect: segment.url,
      type: "video/mp2t",
    };
  }

  async streamVideo(req, res) {
    const { videoId } = req.params;
    const range = req.headers["range"];

    // Get video info
    const video = await this.videoService.getVideoInfo(videoId);

    // Handle range requests
    if (range) {
      const [start, end] = range.replace("bytes=", "").split("-");
      const startByte = parseInt(start);
      const endByte = parseInt(end);

      res.setHeader(
        "Content-Range",
        `bytes ${startByte}-${endByte}/${video.size}`,
      );
      res.setHeader("Content-Length", endByte - startByte + 1);
      res.setHeader("Accept-Ranges", "bytes");
      res.status(206).send(video.data.slice(startByte, endByte + 1));
    } else {
      res.setHeader("Content-Length", video.size);
      res.setHeader("Accept-Ranges", "bytes");
      res.status(200).send(video.data);
    }
  }
}

// Video Storage Service
class VideoStorage {
  constructor(storageService, database) {
    this.storage = storageService;
    this.database = database;
  }

  async uploadVideo(userId, file) {
    // Validate video
    if (!this.isVideoFile(file)) {
      throw new Error("Invalid video file");
    }

    // Generate video ID
    const videoId = generateVideoId();

    // Upload to storage
    const storageKey = `videos/${userId}/${videoId}/${file.originalname}`;
    const url = await this.storage.upload(storageKey, file, {
      contentType: "video/mp4",
    });

    // Save video metadata
    await this.database.insert("videos", {
      id: videoId,
      userId,
      originalName: file.originalname,
      size: file.size,
      duration: null, // Will be updated after transcoding
      storageKey,
      url,
      status: "uploaded",
      createdAt: new Date(),
    });

    // Queue for transcoding
    await this.queueTranscoding(videoId);

    return { videoId, url };
  }

  async getVideoInfo(videoId) {
    const video = await this.database.query(
      "SELECT * FROM videos WHERE id = ?",
      [videoId],
    );

    if (video.length === 0) {
      throw new Error("Video not found");
    }

    return video[0];
  }

  async getVideoQualities(videoId) {
    // Get transcoded versions
    const qualities = await this.database.query(
      "SELECT * FROM video_qualities WHERE videoId = ?",
      [videoId],
    );

    return qualities;
  }

  async getManifest(videoId) {
    const qualities = await this.getVideoQualities(videoId);

    // Generate HLS manifest
    const manifest = {
      version: 3,
      playlists: qualities.map((q) => ({
        name: q.quality,
        bandwidth: q.bitrate,
        resolution: q.resolution,
        codecs: "avc1.42e01e,mp4a.40.2",
        segments: this.generateSegmentList(videoId, q.quality),
      })),
    };

    return manifest;
  }

  generateSegmentList(videoId, quality) {
    const segments = [];
    const duration = 600; // 10 minutes
    const segmentDuration = 10; // 10 seconds per segment

    for (let i = 0; i < duration / segmentDuration; i++) {
      segments.push({
        duration: segmentDuration,
        url: `${this.storage.baseUrl}/videos/${videoId}/${quality}/segment_${i}.ts`,
      });
    }

    return segments;
  }

  async getSegment(videoId, quality, segmentIndex) {
    const segment = await this.storage.get(
      `videos/${videoId}/${quality}/segment_${segmentIndex}.ts`,
    );

    return segment;
  }

  isVideoFile(file) {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const ext = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf("."));
    return videoExtensions.includes(ext);
  }

  async queueTranscoding(videoId) {
    const qualities = ["360p", "480p", "720p", "1080p"];

    for (const quality of qualities) {
      await this.database.insert("transcoding_jobs", {
        videoId,
        quality,
        status: "pending",
        createdAt: new Date(),
      });
    }
  }
}

// Usage
const videoStorage = new VideoStorage(s3Service, database);
const streamingServer = new StreamingServer(videoStorage, cdnService);

// Upload video
app.post("/api/videos/upload", upload.single("video"), async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await videoStorage.uploadVideo(userId, req.file);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get manifest
app.get("/api/videos/:videoId/manifest.m3u8", async (req, res) => {
  const { videoId } = req.params;

  try {
    const manifest = await streamingServer.getManifest(videoId);
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(manifest);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get segment
app.get("/api/videos/:videoId/:quality/:segment.ts", async (req, res) => {
  const { videoId, quality, segment } = req.params;

  try {
    const segment = await streamingServer.getSegment(
      videoId,
      quality,
      parseInt(segment),
    );
    res.redirect(segment.url);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
```

### Best Practices:

1. **Use adaptive streaming**: Dùng adaptive streaming
2. **Implement buffering**: Implement buffering
3. **Use CDN**: Dùng CDN cho delivery
4. **Optimize transcoding**: Optimize transcoding

```javascript
// ✅ Nên: Use adaptive bitrate streaming
const quality = selectQuality(bandwidth, video.qualities);

// ✅ Nên: Implement buffering
const buffer = new Buffer(bufferSize);
while (buffer.length < bufferSize) {
  const chunk = await readChunk();
  buffer.fill(chunk, buffer.length);
}

// ✅ Nên: Use CDN cho delivery
const segmentUrl = `https://cdn.example.com/videos/${videoId}/${quality}/segment_${i}.ts`;

// ✅ Nên: Optimize transcoding
await transcodeWithGPU(videoId);

// ❌ Không nên: Stream entire file at once
// No buffering, poor UX on slow networks
```

---

## Adaptive bitrate?

**Adaptive bitrate** là kỹ thuật điều chỉnh video quality dựa trên network bandwidth.

### Mục đích / Purpose

Optimize video quality dựa trên network conditions.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng             |
| -------------------- | ------------------------ |
| - Variable bandwidth | Khi network không stable |
| - Mobile devices     | Khi mobile users         |
| - Live streaming     | Khi live events          |
| - VOD platforms      | Khi VOD platforms        |

### Giúp ích gì / Benefits

- **Better UX**: Better user experience
- **Reduced buffering**: Reduced buffering
- **Efficient bandwidth**: Efficient bandwidth usage
- **Quality optimization**: Quality optimization

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm          |
| ---------------------- | ------------------- |
| - Better UX            | Complexity          |
| - Reduced buffering    | Storage cost        |
| - Efficient bandwidth  | Processing overhead |
| - Quality optimization | Network dependency  |

### Ví dụ:

```javascript
// Adaptive Bitrate Algorithms

const algorithms = {
  dash: {
    description: "Dynamic Adaptive Streaming over HTTP",
    protocol: "HTTP",
    manifest: "MPD",
    segments: "Multiple bitrates",
    switching: "Seamless",
    pros: ["Standard", "Wide support", "CDN-friendly"],
    cons: ["Complexity", "Segment overhead"],
  },

  hls: {
    description: "HTTP Live Streaming",
    protocol: "HTTP",
    manifest: "M3U8",
    segments: "Multiple bitrates",
    switching: "Seamless",
    pros: ["Standard", "Wide support", "Apple support"],
    cons: ["Complexity", "Segment overhead"],
  },

  smoothStreaming: {
    description: "Smooth Streaming Protocol",
    protocol: "HTTP",
    manifest: "Manifest",
    segments: "Single bitrate",
    switching: "Not adaptive",
    pros: ["Simple", "Low latency"],
    cons: ["Not adaptive", "Poor quality on slow networks"],
  },
};

// DASH Implementation
class DASHAdaptive {
  constructor(videoService) {
    this.videoService = videoService;
    this.qualities = [
      { name: "360p", bitrate: 800, resolution: "640x360" },
      { name: "480p", bitrate: 1200, resolution: "854x480" },
      { name: "720p", bitrate: 2500, resolution: "1280x720" },
      { name: "1080p", bitrate: 5000, resolution: "1920x1080" },
    ];
  }

  async getMPD(videoId) {
    const qualities = await this.videoService.getVideoQualities(videoId);

    // Generate MPD manifest
    const mpd = {
      xmlns: "urn:mpeg:dash:schema:mpd:2011",
      type: "static",
      mediaPresentationDuration: "PT600S",
      minimumUpdatePeriod: "PT10S",
      publishTime: new Date().toISOString(),
      periods: qualities.map((q) => ({
        id: q.id,
        adaptationSet: q.id,
        mimeType: "video/mp4",
        codecs: "avc1.42e01e,mp4a.40.2",
        width: parseInt(q.resolution.split("x")[0]),
        height: parseInt(q.resolution.split("x")[1]),
        bandwidth: q.bitrate,
        segments: this.generateDASHSegments(videoId, q),
      })),
    };

    return mpd;
  }

  generateDASHSegments(videoId, quality) {
    const segments = [];
    const duration = 600; // 10 minutes
    const segmentDuration = 10; // 10 seconds per segment

    for (let i = 0; i < duration / segmentDuration; i++) {
      segments.push({
        d: i + 1,
        duration: segmentDuration,
        url: `${this.storage.baseUrl}/videos/${videoId}/${quality}/segment_${i}.m4s`,
      });
    }

    return segments;
  }

  async selectQuality(bandwidth, availableQualities) {
    // Select best quality based on bandwidth
    const sortedQualities = [...availableQualities].sort(
      (a, b) => a.bitrate - b.bitrate,
    );

    for (const quality of sortedQualities) {
      if (quality.bitrate <= bandwidth * 1.2) {
        // Allow 20% overhead
        return quality;
      }
    }

    // Return lowest quality if all are too high
    return sortedQualities[sortedQualities.length - 1];
  }
}

// HLS Implementation
class HLSAdaptive {
  constructor(videoService) {
    this.videoService = videoService;
    this.qualities = [
      { name: "360p", bitrate: 800, resolution: "640x360" },
      { name: "480p", bitrate: 1200, resolution: "854x480" },
      { name: "720p", bitrate: 2500, resolution: "1280x720" },
      { name: "1080p", bitrate: 5000, resolution: "1920x1080" },
    ];
  }

  async getM3U8(videoId) {
    const qualities = await this.videoService.getVideoQualities(videoId);

    // Generate M3U8 master playlist
    const masterPlaylist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1500000,CODECS="avc1, mp4a"
#EXT-X-MEDIA:VIDEO
#EXT-X-MEDIA:DURATION=600.000
#EXT-X-MEDIA:VIDEO

#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360,CODECS="avc1, mp4a"
${qualities[0].name}.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1200000,RESOLUTION=854x480,CODECS="avc1, mp4a"
${qualities[1].name}.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720,CODECS="avc1, m4a"
${qualities[2].name}.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080,CODECS="avc1, m4a"
${qualities[3].name}.m3u8
#EXT-X-ENDLIST
`;

    // Generate variant playlists
    for (const quality of qualities) {
      masterPlaylist += this.generateVariantPlaylist(videoId, quality);
    }

    return masterPlaylist;
  }

  generateVariantPlaylist(videoId, quality) {
    const segments = this.generateHLSSegments(videoId, quality);

    return `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:600
#EXT-X-MEDIA-SEQUENCE:0,${segments.length}
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-STREAM-INF:BANDWIDTH=${quality.bitrate},RESOLUTION=${quality.resolution}
#EXTINF:ALLOW-CACHE:YES
#EXTM3U
${quality.name}.m3u8
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=${quality.bitrate},RESOLUTION=${quality.resolution}
#EXTINF:DURATION=${segments.reduce((sum, s) => sum + s.duration, 0).toFixed(3)}
#EXTINF:TARGETDURATION=${segments.reduce((sum, s) => sum + s.duration, 0).toFixed(3)}
#EXTINF:PLAYLIST-TYPE:VOD
#EXT-X-ENDLIST
${segments.map((s) => `#EXTINF:${s.duration.toFixed(3)},${s.d},${s.url}`).join("\n")}
`;
  }

  generateHLSSegments(videoId, quality) {
    const segments = [];
    const duration = 600; // 10 minutes
    const segmentDuration = 10; // 10 seconds per segment

    for (let i = 0; i < duration / segmentDuration; i++) {
      segments.push({
        duration: segmentDuration,
        url: `${this.storage.baseUrl}/videos/${videoId}/${quality}/segment_${i}.ts`,
      });
    }

    return segments;
  }
}

// Bandwidth Estimation
class BandwidthEstimator {
  constructor() {
    this.samples = [];
    this.windowSize = 10;
  }

  addSample(duration, bytes) {
    this.samples.push({ duration, bytes, bitrate: bytes / duration });

    if (this.samples.length > this.windowSize) {
      this.samples.shift();
    }
  }

  getEstimatedBandwidth() {
    if (this.samples.length === 0) {
      return 0;
    }

    // Calculate average bitrate
    const avgBitrate =
      this.samples.reduce((sum, s) => sum + s.bitrate, 0) / this.samples.length;

    return avgBitrate;
  }

  getQualityForBandwidth(bandwidth) {
    if (bandwidth < 1000) {
      return "360p"; // 800 kbps
    } else if (bandwidth < 2000) {
      return "480p"; // 1200 kbps
    } else if (bandwidth < 3000) {
      return "720p"; // 2500 kbps
    } else {
      return "1080p"; // 5000 kbps
    }
  }
}

// Usage
const dashAdaptive = new DASHAdaptive(videoService);
const hlsAdaptive = new HLSAdaptive(videoService);
const bandwidthEstimator = new BandwidthEstimator();

// Track bandwidth
bandwidthEstimator.addSample(10, 100000); // 100KB in 10 seconds = 80 kbps
const bandwidth = bandwidthEstimator.getEstimatedBandwidth();
const quality = dashAdaptive.selectQuality(bandwidth, dashAdaptive.qualities);

// Get manifest
const mpd = await dashAdaptive.getMPD(videoId);
const m3u8 = await hlsAdaptive.getM3U8(videoId);
```

### Best Practices:

1. **Use standard protocols**: Dùng standard protocols (HLS, DASH)
2. **Implement buffering**: Implement buffering
3. **Monitor bandwidth**: Theo dõi bandwidth
4. **Provide fallback**: Provide fallback options

```javascript
// ✅ Nên: Use HLS và DASH
const manifest = await getHLSManifest(videoId);

// ✅ Nên: Implement buffering
const buffer = new Buffer(bufferSize);

// ✅ Nên: Monitor bandwidth
const bandwidth = estimateBandwidth(samples);

// ✅ Nên: Provide fallback
if (!hlsSupported) {
  return dashManifest;
}

// ❌ Không nên: Single bitrate streaming
// Poor UX on slow networks
```

---

## CDN integration?

**CDN integration** là sử dụng Content Delivery Network để cache và deliver content gần users hơn.

### Mục đích / Purpose

Tăng performance và giảm latency cho content delivery.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng        |
| ----------------- | ------------------- |
| - Global audience | Khi users toàn cầu  |
| - High traffic    | Khi high traffic    |
| - Low latency     | Khi cần low latency |
| - Static content  | Khi static content  |

### Giúp ích gì / Benefits

- **Performance**: Tăng performance
- **Low latency**: Giảm latency
- **Scalability**: Tăng scalability
- **Availability**: Tăng availability
- **Cost optimization**: Tối ưu chi phí

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm               |
| ------------------- | ------------------------ |
| - Performance       | Cost                     |
| - Low latency       | Configuration complexity |
| - Scalability       | Cache invalidation       |
| - Availability      | Vendor lock-in           |
| - Cost optimization | Setup time               |

### Ví dụ:

```javascript
// CDN Integration

class CDNIntegration {
  constructor(cdnProvider, storageService) {
    this.cdnProvider = cdnProvider;
    this.storageService = storageService;
  }

  async uploadToCDN(contentKey, file, options = {}) {
    // Upload file to CDN
    const cdnUrl = await this.cdnProvider.upload(contentKey, file, {
      contentType: options.contentType || "application/octet-stream",
      cacheControl: options.cacheControl || "public, max-age=31536000",
      headers: options.headers || {},
    });

    return cdnUrl;
  }

  async invalidateCDNCache(contentKey) {
    // Invalidate CDN cache
    await this.cdnProvider.invalidate(contentKey);
  }

  async getSignedURL(contentKey, options = {}) {
    // Get signed URL for private content
    const signedUrl = await this.cdnProvider.getSignedURL(contentKey, {
      expiresIn: options.expiresIn || 3600, // 1 hour
      headers: options.headers || {},
    });

    return signedUrl;
  }

  async purgeCDN(contentKey) {
    // Purge content from CDN
    await this.cdnProvider.purge(contentKey);
  }
}

// CDN Provider Interface
class CDNProvider {
  constructor(config) {
    this.config = config;
  }

  async upload(contentKey, file, options) {
    // Upload to CDN
    // Implementation depends on CDN provider
    const url = `${this.config.baseUrl}/${contentKey}`;

    // Upload file
    await this.uploadFile(url, file);

    return url;
  }

  async invalidate(contentKey) {
    // Invalidate cache
    await this.sendRequest("INVALIDATE", contentKey);
  }

  async getSignedURL(contentKey, options) {
    // Generate signed URL
    const expires = Date.now() + (options.expiresIn || 3600) * 1000;
    const signature = this.generateSignature(contentKey, expires);

    return `${this.config.baseUrl}/${contentKey}?signature=${signature}&expires=${expires}`;
  }

  async purge(contentKey) {
    // Purge content
    await this.sendRequest("PURGE", contentKey);
  }

  generateSignature(contentKey, expires) {
    // Generate signature (simplified)
    const secret = this.config.secret;
    const stringToSign = `${contentKey}:${expires}`;

    const crypto = require("crypto");
    return crypto
      .createHmac("sha256", secret)
      .update(stringToSign)
      .digest("hex");
  }

  async sendRequest(action, contentKey) {
    // Send request to CDN API
    // Implementation depends on CDN provider
    const url = `${this.config.apiUrl}/${action}/${contentKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    });

    return response.json();
  }
}

// Usage
const cdnIntegration = new CDNIntegration(cloudFront, s3Service);

// Upload video to CDN
const cdnUrl = await cdnIntegration.uploadToCDN(
  `videos/${videoId}/1080p/video.mp4`,
  file,
  {
    contentType: "video/mp4",
    cacheControl: "public, max-age=31536000",
  },
);

// Invalidate CDN cache
await cdnIntegration.invalidateCDN(`videos/${videoId}/1080p/video.mp4`);

// Get signed URL for private content
const signedUrl = await cdnIntegration.getSignedURL(`private/${fileId}`, {
  expiresIn: 7200,
});
```

### Best Practices:

1. **Use CDN edge caching**: Dùng CDN edge caching
2. **Set appropriate cache headers**: Đặt cache headers phù hợp
3. **Invalidate properly**: Invalidate properly
4. **Use signed URLs**: Dùng signed URLs cho private content

```javascript
// ✅ Nên: Set appropriate cache headers
cacheControl: "public, max-age=31536000, s-maxage=31536000";

// ✅ Nên: Invalidate cache on updates
await cdn.invalidate(contentKey);

// ✅ Nên: Use signed URLs cho private content
const signedUrl = await cdn.getSignedURL(contentKey, { expiresIn: 3600 });

// ❌ Không nên: Không set cache headers
// No caching, poor performance
```

---

## References

- [HLS Specification](https://tools.ietf.org/html/rfc8216)
- [DASH Specification](https://dashif.org/)
- [AWS MediaConvert](https://aws.amazon.com/mediaconvert/)
- [CloudFront CDN](https://aws.amazon.com/cloudfront/)
