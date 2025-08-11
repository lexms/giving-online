// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Main App Initialization
function initializeApp() {
  setCurrentYear()
  initializeCookieOverlay()
  initializeSmoothScrolling()
  initializeToastSystem()
  initializeCopyButtons()
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// PWA functionality is now handled by pwa-install.js

// Cookie Management
function initializeCookieOverlay() {
  const cookieOverlay = document.getElementById("cookie-overlay")
  const learnMoreBtn = document.getElementById("cookie-learn-more")
  const gotItBtn = document.getElementById("cookie-got-it")

  // Check if user has already dismissed the cookie notice
  const hasDismissed = localStorage.getItem("cookie-notice-dismissed")
  if (hasDismissed) {
    cookieOverlay.style.display = "none"
    return
  }

  let hasScrolled = false
  const scrollThreshold = 200

  // Function to handle scroll events
  const handleScroll = () => {
    const scrollY = window.scrollY

    if (scrollY > scrollThreshold && !hasScrolled) {
      hasScrolled = true
      // Small delay for smooth entrance animation
      setTimeout(() => {
        if (cookieOverlay) {
          cookieOverlay.classList.add("visible")
        }
      }, 500)

      // Remove scroll listener after showing
      window.removeEventListener("scroll", handleScroll)
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll, { passive: true })

  // Add event listeners
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      window.open("https://www.hillsongberlin.de/privacy", "_blank")
    })
  }

  if (gotItBtn) {
    gotItBtn.addEventListener("click", handleCookieDismiss)
  }
}

function handleCookieDismiss() {
  const cookieOverlay = document.getElementById("cookie-overlay")

  if (cookieOverlay) {
    cookieOverlay.classList.add("animating-out")

    // Animate out before hiding
    setTimeout(() => {
      cookieOverlay.style.display = "none"
      localStorage.setItem("cookie-notice-dismissed", "true")
    }, 300)
  }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Toast Notification System
function initializeToastSystem() {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.id = "toast-container"
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)
  }
}

function showToast(message, type = "info", duration = 5000) {
  const toastContainer = document.getElementById("toast-container")
  if (!toastContainer) return

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  // Add to container
  toastContainer.appendChild(toast)

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, duration)

  // Add click to dismiss
  toast.addEventListener("click", () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  })

  return toast
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    // Handle responsive adjustments if needed
  }, 250)
)

// Handle scroll events
window.addEventListener(
  "scroll",
  debounce(() => {
    // Handle scroll-based animations or effects if needed
  }, 100)
)

// Service Worker Registration (for PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Handle offline/online status
window.addEventListener("online", () => {
  showToast("You are back online!", "success")
})

window.addEventListener("offline", () => {
  showToast("You are offline. Some features may not work.", "error")
})

// Enhanced error handling
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error)
  showToast("An error occurred. Please refresh the page.", "error")
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
  showToast("An error occurred. Please try again.", "error")
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      if (perfData) {
        console.log(
          "Page load time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        )
      }
    }, 0)
  })
}

// Accessibility improvements
function enhanceAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main content landmark
  const mainContent = document.querySelector("main")
  if (mainContent) {
    mainContent.id = "main-content"
    mainContent.setAttribute("role", "main")
  }
}

// Initialize accessibility enhancements
document.addEventListener("DOMContentLoaded", enhanceAccessibility)

// Copy functionality for bank details
function initializeCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn")

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-value")
      const label = button.getAttribute("data-label")

      if (!value || !label) return

      try {
        // Check if we're in a secure context
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value)
          showCopySuccess(button, label)
        } else {
          // Fallback for non-secure contexts
          const textArea = document.createElement("textarea")
          textArea.value = value
          textArea.style.position = "fixed"
          textArea.style.left = "-999999px"
          textArea.style.top = "-999999px"
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            document.execCommand("copy")
            textArea.remove()
            showCopySuccess(button, label)
          } catch {
            textArea.remove()
            showCopyError()
          }
        }
      } catch {
        showCopyError()
      }
    })
  })
}

function showCopySuccess(button, label) {
  // Show success state
  button.classList.add("copied")

  // Change icon to checkmark temporarily
  const copyIcon = button.querySelector(".copy-icon")
  if (copyIcon) {
    copyIcon.innerHTML =
      '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  }

  // Show toast notification
  showToast(`${label} copied to clipboard!`, "success")

  // Reset button after animation
  setTimeout(() => {
    button.classList.remove("copied")
    if (copyIcon) {
      copyIcon.innerHTML =
        '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>'
    }
  }, 2000)
}

function showCopyError() {
  showToast("Failed to copy. Please try manually selecting the text.", "error")
}

// Export functions for potential external use
window.GivingApp = {
  showToast,
  handleCookieDismiss,
  copyToClipboard: (text) => navigator.clipboard?.writeText(text),
}
