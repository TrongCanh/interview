# 49. Throttle with requestAnimationFrame / Throttle với requestAnimationFrame

> Implement throttle using requestAnimationFrame / Triển khai throttle sử dụng requestAnimationFrame

---

## Overview / Tổng quan

`requestAnimationFrame` (RAF) là một API của trình duyệt được thiết kế để tạo ra các animation mượt mà. Khi sử dụng RAF để throttle một function, function sẽ được thực thi tối đa một lần mỗi frame (thường là 60 lần mỗi giây). Đây là cách tối ưu để throttle các function liên quan đến DOM hoặc animation.

`requestAnimationFrame` (RAF) is a browser API designed to create smooth animations. When using RAF to throttle a function, the function will execute at most once per frame (typically 60 times per second). This is an optimized way to throttle functions related to DOM or animations.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `requestAnimationFrame`
- Biết sự khác biệt giữa RAF throttle và setTimeout throttle
- Nắm vững các khái niệm về frame rate và performance
- Hiểu về optimizing DOM operations và animations

- Understand deeply how `requestAnimationFrame` works
- Know difference between RAF throttle and setTimeout throttle
- Master frame rate and performance concepts
- Understand optimizing DOM operations and animations

## When to Use / Khi nào nên dùng

- Khi cần throttle các function liên quan đến DOM manipulation
- Khi cần tạo smooth animations
- Khi cần optimize scroll handlers
- Khi cần resize handlers với performance tốt

- When throttling functions related to DOM manipulation
- When creating smooth animations
- When optimizing scroll handlers
- When needing resize handlers with good performance

## Benefits / Lợi ích

- Tự động đồng bộ với frame rate của trình duyệt
- Tối ưu cho animations và visual updates
- Tự động pause khi tab không active
- Giảm jank và improve smoothness

- Automatically syncs with browser frame rate
- Optimized for animations and visual updates
- Automatically pauses when tab is not active
- Reduces jank and improves smoothness

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Tối ưu cho animations và visual updates
- Tự động pause khi tab không active
- Đồng bộ với browser's paint cycle
- Better performance cho DOM operations

- Optimized for animations and visual updates
- Automatically pauses when tab is not active
- Syncs with browser's paint cycle
- Better performance for DOM operations

### Cons / Nhược điểm

- Chỉ hoạt động trong browser environment
- Không phù hợp cho non-DOM operations
- Frame rate có thể thay đổi tùy thiết bị
- Không thể set fixed interval

- Only works in browser environment
- Not suitable for non-DOM operations
- Frame rate can vary depending on device
- Cannot set fixed interval

## Examples / Ví dụ

### 1. Basic RAF throttle implementation / Triển khai RAF throttle cơ bản

```javascript
/**
 * Throttle function using requestAnimationFrame
 * Throttle function sử dụng requestAnimationFrame
 * @param {Function} func - Function to throttle / Hàm cần throttle
 * @returns {Function} Throttled function / Hàm đã được throttle
 */
function throttleRAF(func) {
  let requestId = null;
  let lastArgs = null;

  return function throttled(...args) {
    // Store latest arguments / Lưu trữ các tham số mới nhất
    lastArgs = args;

    // If already scheduled, do nothing / Nếu đã được lên lịch, không làm gì
    if (requestId !== null) {
      return;
    }

    // Schedule the function / Lên lịch cho function
    requestId = requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      requestId = null;
      lastArgs = null;
    });
  };
}

// Example usage / Ví dụ sử dụng
const handleScroll = throttleRAF(() => {
  console.log("Scroll position:", window.scrollY);
});

window.addEventListener("scroll", handleScroll);
```

### 2. RAF throttle with immediate execution / RAF throttle với thực thi ngay lập tức

```javascript
/**
 * Throttle function using requestAnimationFrame with immediate option
 * Throttle function sử dụng requestAnimationFrame với tùy chọn immediate
 * @param {Function} func - Function to throttle / Hàm cần throttle
 * @param {Object} options - Options object / Object options
 * @param {boolean} options.leading - Execute immediately on first call / Thực thi ngay lập tức khi gọi đầu tiên
 * @returns {Function} Throttled function / Hàm đã được throttle
 */
function throttleRAFWithLeading(func, options = {}) {
  const { leading = false } = options;
  let requestId = null;
  let lastArgs = null;
  let isPending = false;

  return function throttled(...args) {
    lastArgs = args;

    if (!requestId && leading) {
      // Execute immediately on first call / Thực thi ngay lập tức khi gọi đầu tiên
      func.apply(this, args);
      isPending = true;
    }

    if (requestId !== null) {
      return;
    }

    requestId = requestAnimationFrame(() => {
      if (!leading || isPending) {
        func.apply(this, lastArgs);
      }
      requestId = null;
      lastArgs = null;
      isPending = false;
    });
  };
}

// Example / Ví dụ
const handleScrollImmediate = throttleRAFWithLeading(
  () => {
    console.log("Scroll:", window.scrollY);
  },
  { leading: true },
);

window.addEventListener("scroll", handleScrollImmediate);
```

### 3. RAF throttle with cancel / RAF throttle với hủy

```javascript
/**
 * Throttle function using requestAnimationFrame with cancel support
 * Throttle function sử dụng requestAnimationFrame với hỗ trợ hủy
 * @param {Function} func - Function to throttle / Hàm cần throttle
 * @returns {Object} Object with throttled function and cancel method / Object chứa hàm đã throttle và phương thức hủy
 */
function throttleRAFCancellable(func) {
  let requestId = null;
  let lastArgs = null;

  const throttled = function (...args) {
    lastArgs = args;

    if (requestId !== null) {
      return;
    }

    requestId = requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      requestId = null;
      lastArgs = null;
    });
  };

  // Cancel pending execution / Hủy thực thi đang chờ
  throttled.cancel = function () {
    if (requestId !== null) {
      cancelAnimationFrame(requestId);
      requestId = null;
      lastArgs = null;
    }
  };

  return throttled;
}

// Example usage / Ví dụ sử dụng
const handleResize = throttleRAFCancellable(() => {
  console.log("Window size:", window.innerWidth, window.innerHeight);
});

window.addEventListener("resize", handleResize);

// Cancel pending execution / Hủy thực thi đang chờ
// handleResize.cancel();
```

### 4. RAF throttle vs setTimeout throttle / RAF throttle so với setTimeout throttle

```javascript
/**
 * Throttle using setTimeout
 * Throttle sử dụng setTimeout
 * @param {Function} func - Function to throttle / Hàm cần throttle
 * @param {number} limit - Minimum time between calls in ms / Thời gian tối thiểu giữa các lần gọi (ms)
 * @returns {Function} Throttled function / Hàm đã được throttle
 */
function throttleTimeout(func, limit) {
  let inThrottle = false;
  let lastArgs = null;

  return function throttled(...args) {
    lastArgs = args;

    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    }
  };
}

// Compare RAF vs setTimeout / So sánh RAF với setTimeout
const rafThrottled = throttleRAF(() => {
  console.log("RAF throttle");
});

const timeoutThrottled = throttleTimeout(() => {
  console.log("Timeout throttle");
}, 16); // ~60fps

// RAF is better for animations / RAF tốt hơn cho animations
// setTimeout is better for fixed intervals / setTimeout tốt hơn cho các khoảng thời gian cố định
```

### 5. Smooth scroll with RAF throttle / Smooth scroll với RAF throttle

```javascript
/**
 * Smooth scroll to element using RAF
 * Smooth scroll đến element sử dụng RAF
 * @param {HTMLElement} element - Element to scroll to / Element cần scroll đến
 * @param {number} duration - Duration in ms / Thời gian tính bằng ms
 */
function smoothScrollTo(element, duration = 500) {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const rafThrottled = throttleRAF((timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);

    // Easing function / Hàm easing
    const ease = (t) => t * (2 - t);
    const easePercentage = ease(percentage);

    window.scrollTo(0, startPosition + distance * easePercentage);

    if (progress < duration) {
      requestAnimationFrame(rafThrottled);
    }
  });

  requestAnimationFrame(rafThrottled);
}

// Example usage / Ví dụ sử dụng
// const element = document.getElementById('target');
// smoothScrollTo(element);
```

### 6. Lazy loading images with RAF throttle / Lazy loading images với RAF throttle

```javascript
/**
 * Lazy load images using RAF throttle
 * Lazy load images sử dụng RAF throttle
 */
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const checkImages = throttleRAF(() => {
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();

      // Check if image is in viewport / Kiểm tra nếu ảnh trong viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
    });
  });

  // Check on scroll and initial load / Kiểm tra khi scroll và load ban đầu
  window.addEventListener("scroll", checkImages);
  window.addEventListener("load", checkImages);

  // Initial check / Kiểm tra ban đầu
  checkImages();
}

// Example usage / Ví dụ sử dụng
// setupLazyLoading();
```

### 7. Parallax effect with RAF throttle / Hiệu ứng parallax với RAF throttle

```javascript
/**
 * Parallax effect using RAF throttle
 * Hiệu ứng parallax sử dụng RAF throttle
 * @param {string} selector - Selector for parallax elements / Selector cho các elements parallax
 * @param {number} speed - Parallax speed / Tốc độ parallax
 */
function setupParallax(selector, speed = 0.5) {
  const elements = document.querySelectorAll(selector);

  const updateParallax = throttleRAF(() => {
    const scrollY = window.scrollY;

    elements.forEach((element) => {
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  window.addEventListener("scroll", updateParallax);
  updateParallax(); // Initial update / Cập nhật ban đầu
}

// Example usage / Ví dụ sử dụng
// setupParallax('.parallax', 0.3);
```

### 8. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm thử
let rafCount = 0;
let timeoutCount = 0;

const rafThrottled = throttleRAF(() => {
  rafCount++;
});

const timeoutThrottled = throttleTimeout(() => {
  timeoutCount++;
}, 16);

// Simulate rapid calls / Giả lập các cuộc gọi nhanh
for (let i = 0; i < 1000; i++) {
  rafThrottled();
  timeoutThrottled();
}

// RAF will execute ~60 times per second / RAF sẽ thực thi ~60 lần mỗi giây
// setTimeout will execute every 16ms / setTimeout sẽ thực thi mỗi 16ms

console.log("RAF count:", rafCount); // Depends on frame rate / Phụ thuộc vào frame rate
console.log("Timeout count:", timeoutCount); // ~60 / ~60
```

### 9. Cleanup and best practices / Dọn dẹp và thực hành tốt nhất

```javascript
/**
 * Throttle with cleanup support
 * Throttle với hỗ trợ dọn dẹp
 * @param {Function} func - Function to throttle / Hàm cần throttle
 * @returns {Object} Object with throttled function and cleanup / Object chứa hàm đã throttle và dọn dẹp
 */
function throttleRAFWithCleanup(func) {
  let requestId = null;
  let lastArgs = null;
  let isCancelled = false;

  const throttled = function (...args) {
    if (isCancelled) return;
    lastArgs = args;

    if (requestId !== null) {
      return;
    }

    requestId = requestAnimationFrame(() => {
      if (!isCancelled) {
        func.apply(this, lastArgs);
      }
      requestId = null;
      lastArgs = null;
    });
  };

  // Cleanup method / Phương thức dọn dẹp
  throttled.cleanup = function () {
    isCancelled = true;
    if (requestId !== null) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  };

  return throttled;
}

// Example usage with cleanup / Ví dụ sử dụng với dọn dẹp
const handleScroll = throttleRAFWithCleanup(() => {
  console.log("Scroll:", window.scrollY);
});

window.addEventListener("scroll", handleScroll);

// Cleanup when needed / Dọn dẹp khi cần
// handleScroll.cleanup();
// window.removeEventListener('scroll', handleScroll);
```

## Best Practices / Thực hành tốt nhất

1. **Use RAF for visual updates / Sử dụng RAF cho các cập nhật visual**

   ```javascript
   // Good / Tốt - Use RAF for visual updates / Sử dụng RAF cho các cập nhật visual
   const updateUI = throttleRAF(() => {
     element.style.transform = `translateX(${x}px)`;
   });

   // Bad / Không tốt - Use setTimeout for non-visual updates / Sử dụng setTimeout cho các cập nhật không phải visual
   const updateData = throttleTimeout(() => {
     processData(data);
   }, 100);
   ```

2. **Always cleanup RAF when component unmounts / Luôn dọn dẹp RAF khi component unmount**

   ```javascript
   // Good / Tốt
   class Component {
     constructor() {
       this.handleScroll = throttleRAF(this.onScroll.bind(this));
       window.addEventListener("scroll", this.handleScroll);
     }

     destroy() {
       this.handleScroll.cleanup();
       window.removeEventListener("scroll", this.handleScroll);
     }
   }
   ```

3. **Use RAF for animations / Sử dụng RAF cho animations**

   ```javascript
   // Good / Tốt
   function animate() {
     const rafThrottled = throttleRAF((timestamp) => {
       // Animation logic / Logic animation
       updatePosition(timestamp);

       if (shouldContinue) {
         requestAnimationFrame(rafThrottled);
       }
     });

     requestAnimationFrame(rafThrottled);
   }
   ```

4. **Combine with other optimizations / Kết hợp với các tối ưu hóa khác**

   ```javascript
   // Good / Tốt - Combine RAF with other optimizations
   // Kết hợp RAF với các tối ưu hóa khác
   const handleScroll = throttleRAF(() => {
     // Use IntersectionObserver for visibility checks
     // Sử dụng IntersectionObserver cho các kiểm tra visibility
     if (isVisible) {
       updateElement();
     }
   });
   ```

5. **Consider using CSS animations when possible / Cân nhắc sử dụng CSS animations khi có thể**

   ```javascript
   // Good / Tốt - Use CSS for simple animations / Sử dụng CSS cho các animations đơn giản
   .element {
     transition: transform 0.3s ease;
   }

   // Use RAF for complex, dynamic animations
   // Sử dụng RAF cho các animations phức tạp, động
   const updateComplexAnimation = throttleRAF(() => {
     // Complex animation logic / Logic animation phức tạp
   });
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Using RAF for non-visual operations / Sử dụng RAF cho các operations không phải visual

```javascript
// BAD / KHÔNG TỐT - RAF is overkill for non-visual operations
// RAF là quá mức cho các operations không phải visual
const processData = throttleRAF(() => {
  // This doesn't update the DOM / Điều này không cập nhật DOM
  calculateStats(data);
});

// GOOD / TỐT - Use setTimeout or debounce for non-visual operations
// Sử dụng setTimeout hoặc debounce cho các operations không phải visual
const processData = throttleTimeout(() => {
  calculateStats(data);
}, 100);
```

### 2. Not cleaning up RAF / Không dọn dẹp RAF

```javascript
// BAD / KHÔNG TỐT - RAF continues running after component unmounts
// RAF tiếp tục chạy sau khi component unmounts
class Component {
  constructor() {
    this.handleScroll = throttleRAF(this.onScroll.bind(this));
    window.addEventListener("scroll", this.handleScroll);
  }

  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
    // Forgot to cleanup RAF! / Quên dọn dẹp RAF!
  }
}

// GOOD / TỐT - Cleanup RAF when component unmounts
// Dọn dẹp RAF khi component unmounts
class Component {
  constructor() {
    this.handleScroll = throttleRAFWithCleanup(this.onScroll.bind(this));
    window.addEventListener("scroll", this.handleScroll);
  }

  destroy() {
    this.handleScroll.cleanup();
    window.removeEventListener("scroll", this.handleScroll);
  }
}
```

### 3. Using RAF for fixed time intervals / Sử dụng RAF cho các khoảng thời gian cố định

```javascript
// BAD / KHÔNG TỐT - RAF doesn't guarantee fixed intervals
// RAF không đảm bảo các khoảng thời gian cố định
const pollData = throttleRAF(() => {
  fetch("/api/data").then(updateUI);
});

// GOOD / TỐT - Use setInterval for fixed time intervals
// Sử dụng setInterval cho các khoảng thời gian cố định
const pollData = setInterval(() => {
  fetch("/api/data").then(updateUI);
}, 5000);
```

### 4. Nesting RAF calls unnecessarily / Lồng các lời gọi RAF không cần thiết

```javascript
// BAD / KHÔNG TỐT - Unnecessary nesting / Lồng không cần thiết
function animate() {
  requestAnimationFrame(() => {
    update();
    requestAnimationFrame(() => {
      update();
      requestAnimationFrame(() => {
        update();
      });
    });
  });
}

// GOOD / TỐT - Use loop or recursion properly / Sử dụng vòng lặp hoặc đệ quy đúng cách
function animate() {
  update();
  if (shouldContinue) {
    requestAnimationFrame(animate);
  }
}
```

## References / Tài liệu tham khảo

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MDN: cancelAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame)
- [Web.dev: Rendering Performance](https://web.dev/rendering-performance/)
- [Paul Lewis: Using requestAnimationFrame](https://www.html5rocks.com/en/tutorials/speed/animations-using-requestanimationframe/)
