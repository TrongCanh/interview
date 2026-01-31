/**
 * Interview Practice Viewer - Client-side JavaScript
 */

// API Base URL
const API_BASE = "/api";

// DOM Elements
const fileTree = document.getElementById("fileTree");
const filePreview = document.getElementById("filePreview");
const breadcrumb = document.getElementById("breadcrumb");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const refreshBtn = document.getElementById("refreshBtn");
const searchModal = document.getElementById("searchModal");
const searchResults = document.getElementById("searchResults");
const closeSearchModal = document.getElementById("closeSearchModal");
const fileInfo = document.getElementById("fileInfo");
const statusMessage = document.getElementById("statusMessage");
const tocSidebar = document.getElementById("tocSidebar");
const tocContent = document.getElementById("tocContent");
const toggleTocBtn = document.getElementById("toggleTocBtn");
const closeTocBtn = document.getElementById("closeTocBtn");
const contentArea = document.querySelector(".content");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

// File icon mapping
const fileIcons = {
  ".js": { icon: "fab fa-js-square", color: "js" },
  ".ts": { icon: "fab fa-js-square", color: "ts" },
  ".md": { icon: "fab fa-markdown", color: "md" },
  ".html": { icon: "fab fa-html5", color: "html" },
  ".css": { icon: "fab fa-css3-alt", color: "css" },
  ".json": { icon: "fas fa-code", color: "file" },
  ".txt": { icon: "fas fa-file-alt", color: "file" },
};

/**
 * Initialize application
 */
function init() {
  loadFileTree();
  setupEventListeners();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Menu toggle for mobile
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Search button
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Refresh button
  refreshBtn.addEventListener("click", loadFileTree);

  // Close search modal
  closeSearchModal.addEventListener("click", () => {
    searchModal.classList.remove("active");
  });

  // Close modal on outside click
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("active");
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchModal.classList.remove("active");
    }
  });

  // Toggle TOC sidebar
  toggleTocBtn.addEventListener("click", () => {
    tocSidebar.classList.toggle("collapsed");
    updateToggleIcon();
  });

  // Close TOC sidebar
  closeTocBtn.addEventListener("click", () => {
    tocSidebar.classList.add("collapsed");
    updateToggleIcon();
  });

  // Scroll event for active TOC highlighting
  filePreview.addEventListener("scroll", handleScrollForTOC);
}

/**
 * Load file tree from API
 */
async function loadFileTree() {
  fileTree.innerHTML =
    '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
  updateStatus("Đang tải cấu trúc thư mục...");

  try {
    const response = await fetch(`${API_BASE}/tree`);
    const result = await response.json();

    if (result.success) {
      renderFileTree(result.data);
      updateStatus("Đã tải cấu trúc thư mục");
    } else {
      showError("Không thể tải cấu trúc thư mục");
    }
  } catch (error) {
    showError("Lỗi kết nối: " + error.message);
  }
}

/**
 * Render file tree
 * @param {Array} structure - Cấu trúc thư mục
 */
function renderFileTree(structure) {
  fileTree.innerHTML = "";

  if (structure.length === 0) {
    fileTree.innerHTML =
      '<div class="empty-state"><i class="fas fa-folder-open"></i><p>Không có file nào</p></div>';
    return;
  }

  const treeContainer = document.createElement("div");
  structure.forEach((item) => {
    treeContainer.appendChild(createTreeItem(item, 0));
  });

  fileTree.appendChild(treeContainer);
}

/**
 * Create tree item element
 * @param {Object} item - Thông tin file/thư mục
 * @param {number} level - Cấp độ lồng nhau
 * @returns {HTMLElement}
 */
function createTreeItem(item, level) {
  const container = document.createElement("div");
  container.className = "tree-item-container";

  const itemEl = document.createElement("div");
  itemEl.className = "tree-item";
  itemEl.dataset.path = item.path;
  itemEl.dataset.type = item.type;

  // Toggle icon for folders
  if (item.type === "folder") {
    const toggle = document.createElement("span");
    toggle.className = "toggle";
    toggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
    itemEl.appendChild(toggle);
  }

  // File/Folder icon
  const icon = document.createElement("span");
  icon.className = `icon ${item.type}`;

  if (item.type === "folder") {
    icon.innerHTML = '<i class="fas fa-folder"></i>';
  } else {
    const iconInfo = fileIcons[item.extension] || {
      icon: "fas fa-file",
      color: "file",
    };
    icon.classList.add(iconInfo.color);
    icon.innerHTML = `<i class="${iconInfo.icon}"></i>`;
  }

  itemEl.appendChild(icon);

  // Name
  const name = document.createElement("span");
  name.className = "name";
  name.textContent = item.name;
  itemEl.appendChild(name);

  container.appendChild(itemEl);

  // Children for folders
  if (item.type === "folder" && item.children && item.children.length > 0) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "tree-children";

    item.children.forEach((child) => {
      childrenContainer.appendChild(createTreeItem(child, level + 1));
    });

    container.appendChild(childrenContainer);

    // Toggle folder on click
    itemEl.addEventListener("click", () => {
      const toggleIcon = itemEl.querySelector(".toggle");
      const folderIcon = icon.querySelector("i");

      childrenContainer.classList.toggle("open");
      toggleIcon.classList.toggle("open");

      if (childrenContainer.classList.contains("open")) {
        folderIcon.classList.remove("fa-folder");
        folderIcon.classList.add("fa-folder-open");
      } else {
        folderIcon.classList.remove("fa-folder-open");
        folderIcon.classList.add("fa-folder");
      }
    });
  } else if (item.type === "file") {
    // Load file content on click
    itemEl.addEventListener("click", () => {
      // Remove active class from all items
      document
        .querySelectorAll(".tree-item")
        .forEach((el) => el.classList.remove("active"));
      itemEl.classList.add("active");

      loadFileContent(item.path);
    });
  }

  return container;
}

/**
 * Load file content
 * @param {string} filePath - Đường dẫn file
 */
async function loadFileContent(filePath) {
  updateStatus(`Đang tải: ${filePath}`);
  filePreview.innerHTML =
    '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tải file...</div>';

  try {
    const response = await fetch(
      `${API_BASE}/file?path=${encodeURIComponent(filePath)}`,
    );
    const result = await response.json();

    if (result.success) {
      renderFileContent(result.data);
      updateBreadcrumb(filePath);
      updateFileInfo(result.data);
      updateStatus("Đã tải file");
    } else {
      showError(result.error || "Không thể tải file");
    }
  } catch (error) {
    showError("Lỗi kết nối: " + error.message);
  }
}

/**
 * Render file content based on type
 * @param {Object} fileData - Dữ liệu file
 */
function renderFileContent(fileData) {
  const extension = fileData.extension;
  let content = "";

  // Markdown files
  if (extension === ".md") {
    const parsedMarkdown = marked.parse(fileData.content);
    content = `
      <div class="file-content">
        <div class="file-header">
          <div class="file-title">
            <span class="icon file md"><i class="fab fa-markdown"></i></span>
            <h2>${fileData.name}</h2>
          </div>
          <div class="file-meta">${formatFileSize(fileData.size)}</div>
        </div>
        <div class="markdown-content" id="markdownContent">
          ${parsedMarkdown}
        </div>
      </div>
    `;
    filePreview.innerHTML = content;
    // Generate TOC after content is rendered
    setTimeout(() => generateTableOfContents(), 100);
    return;
  }

  // Hide TOC sidebar for non-markdown files
  hideTocSidebar();

  // JavaScript/TypeScript files
  if (extension === ".js" || extension === ".ts") {
    const highlighted = hljs.highlight(fileData.content, {
      language: extension.substring(1),
    }).value;
    content = `
      <div class="file-content">
        <div class="file-header">
          <div class="file-title">
            <span class="icon file ${extension.substring(1)}"><i class="${fileIcons[extension].icon}"></i></span>
            <h2>${fileData.name}</h2>
          </div>
          <div class="file-meta">${formatFileSize(fileData.size)}</div>
        </div>
        <div class="code-preview">
          <pre><code class="language-${extension.substring(1)}">${highlighted}</code></pre>
        </div>
      </div>
    `;
  }
  // Other text files
  else if ([".txt", ".json", ".html", ".css"].includes(extension)) {
    const lang = extension.substring(1);
    const highlighted = hljs.highlight(fileData.content, {
      language: lang,
    }).value;
    content = `
      <div class="file-content">
        <div class="file-header">
          <div class="file-title">
            <span class="icon file ${lang}"><i class="${fileIcons[extension]?.icon || "fas fa-file-alt"}"></i></span>
            <h2>${fileData.name}</h2>
          </div>
          <div class="file-meta">${formatFileSize(fileData.size)}</div>
        </div>
        <div class="code-preview">
          <pre><code class="language-${lang}">${highlighted}</code></pre>
        </div>
      </div>
    `;
  }
  // Binary or unsupported files
  else {
    content = `
      <div class="empty-state">
        <i class="fas fa-file"></i>
        <h3>Không thể xem file này</h3>
        <p>Loại file ${extension} không được hỗ trợ</p>
      </div>
    `;
  }

  filePreview.innerHTML = content;
}

/**
 * Update breadcrumb
 * @param {string} filePath - Đường dẫn file
 */
function updateBreadcrumb(filePath) {
  const parts = filePath.split("/");
  let html =
    '<span class="breadcrumb-item"><i class="fas fa-home"></i> interview-practice</span>';

  parts.forEach((part, index) => {
    html +=
      '<span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>';
    html += `<span class="breadcrumb-item">${part}</span>`;
  });

  breadcrumb.innerHTML = html;
}

/**
 * Update file info in status bar
 * @param {Object} fileData - Dữ liệu file
 */
function updateFileInfo(fileData) {
  fileInfo.textContent = `${fileData.name} - ${formatFileSize(fileData.size)}`;
}

/**
 * Handle search
 */
async function handleSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  updateStatus("Đang tìm kiếm...");
  searchResults.innerHTML =
    '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Đang tìm kiếm...</div>';
  searchModal.classList.add("active");

  try {
    const response = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(query)}`,
    );
    const result = await response.json();

    if (result.success) {
      renderSearchResults(result.data);
      updateStatus(`Tìm thấy ${result.data.length} kết quả`);
    } else {
      searchResults.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>${result.error}</p></div>`;
    }
  } catch (error) {
    searchResults.innerHTML = `<div class="no-results"><i class="fas fa-exclamation-circle"></i><p>Lỗi: ${error.message}</p></div>`;
  }
}

/**
 * Render search results
 * @param {Array} results - Kết quả tìm kiếm
 */
function renderSearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>Không tìm thấy kết quả nào</p>
      </div>
    `;
    return;
  }

  searchResults.innerHTML = "";

  results.forEach((result) => {
    const item = document.createElement("div");
    item.className = "search-result-item";

    const iconInfo = fileIcons[result.extension] || {
      icon: "fas fa-file",
      color: "file",
    };

    item.innerHTML = `
      <span class="icon ${iconInfo.color}"><i class="${iconInfo.icon}"></i></span>
      <span class="name">${result.name}</span>
      <span class="path">${result.path}</span>
    `;

    item.addEventListener("click", () => {
      searchModal.classList.remove("active");
      loadFileContent(result.path);
    });

    searchResults.appendChild(item);
  });
}

/**
 * Show error message
 * @param {string} message - Thông báo lỗi
 */
function showError(message) {
  filePreview.innerHTML = `
    <div class="empty-state">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Có lỗi xảy ra</h3>
      <p>${message}</p>
    </div>
  `;
  updateStatus("Lỗi: " + message);
}

/**
 * Update status message
 * @param {string} message - Thông báo trạng thái
 */
function updateStatus(message) {
  statusMessage.textContent = message;
}

/**
 * Format file size
 * @param {number} bytes - Kích thước file trong bytes
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Generate Table of Contents from markdown headings
 */
function generateTableOfContents() {
  const markdownContent = document.getElementById("markdownContent");
  if (!markdownContent) {
    hideTocSidebar();
    return;
  }

  // Get all headings
  const headings = markdownContent.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // If no headings, hide TOC sidebar
  if (headings.length === 0) {
    hideTocSidebar();
    return;
  }

  // Generate unique IDs for headings if they don't have one
  headings.forEach((heading, index) => {
    if (!heading.id) {
      const text = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      heading.id = `${text}-${index}`;
    }
  });

  // Build TOC HTML
  let tocHtml = '<ul class="toc-list">';
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent;
    const id = heading.id;

    tocHtml += `
      <li class="toc-item">
        <a href="#${id}" class="toc-link toc-level-${level}" data-target="${id}">
          ${text}
        </a>
      </li>
    `;
  });
  tocHtml += "</ul>";

  // Update TOC content
  tocContent.innerHTML = tocHtml;

  // Add click handlers to TOC links
  const tocLinks = tocContent.querySelectorAll(".toc-link");
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      scrollToHeading(targetId);
    });
  });

  // Show TOC sidebar (starts collapsed)
  showTocSidebar();

  // Initial highlight
  handleScrollForTOC();
}

/**
 * Show TOC sidebar
 */
function showTocSidebar() {
  tocSidebar.style.display = "flex";
  contentArea.classList.add("with-toc");
  // Start in collapsed state
  tocSidebar.classList.add("collapsed");
  updateToggleIcon();
}

/**
 * Hide TOC sidebar
 */
function hideTocSidebar() {
  tocSidebar.style.display = "none";
  contentArea.classList.remove("with-toc");
}

/**
 * Update toggle icon based on sidebar state
 */
function updateToggleIcon() {
  const icon = toggleTocBtn.querySelector("i");
  if (tocSidebar.classList.contains("collapsed")) {
    icon.classList.remove("fa-chevron-left");
    icon.classList.add("fa-chevron-right");
    toggleTocBtn.title = "Mở rộng mục lục";
  } else {
    icon.classList.remove("fa-chevron-right");
    icon.classList.add("fa-chevron-left");
    toggleTocBtn.title = "Thu gọn mục lục";
  }
}

/**
 * Scroll to heading
 * @param {string} headingId - ID của heading
 */
function scrollToHeading(headingId) {
  const heading = document.getElementById(headingId);
  if (heading) {
    // Calculate scroll position with offset
    const offset = 20;
    const elementPosition = heading.getBoundingClientRect().top;
    const offsetPosition = elementPosition + filePreview.scrollTop - offset;

    filePreview.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update active state
    updateActiveTocItem(headingId);
  }
}

/**
 * Handle scroll to highlight active TOC item
 */
function handleScrollForTOC() {
  const markdownContent = document.getElementById("markdownContent");
  if (!markdownContent) return;

  const headings = markdownContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const scrollPosition = filePreview.scrollTop;
  const offset = 100;

  let activeId = null;

  headings.forEach((heading) => {
    const headingTop = heading.offsetTop - offset;
    const headingBottom = headingTop + heading.offsetHeight;

    if (scrollPosition >= headingTop && scrollPosition < headingBottom) {
      activeId = heading.id;
    }
  });

  // If no heading is in view, use first visible heading
  if (!activeId) {
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      if (heading.offsetTop - offset <= scrollPosition) {
        activeId = heading.id;
        break;
      }
    }
  }

  if (activeId) {
    updateActiveTocItem(activeId);
  }
}

/**
 * Update active TOC item
 * @param {string} activeId - ID của heading đang active
 */
function updateActiveTocItem(activeId) {
  const tocLinks = tocContent.querySelectorAll(".toc-link");
  tocLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === activeId) {
      link.classList.add("active");
      // Scroll TOC to show active item
      link.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", init);
