/**
 * PWA Installation Manager
 * Handles PWA installation prompts and UI for different platforms (iOS, Android, Desktop)
 */
class PWAInstallManager {
  constructor() {
    this.deferredPrompt = null
    this.installHeader = document.getElementById("pwa-install-header")
    this.isIOS = this.detectIOSDevice()
    this.isInstalled = this.detectInstalledPWA()

    this.init()
  }

  /**
   * Platform Detection
   */
  detectIOSDevice() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !navigator.userAgent.includes("Android")
    )
  }

  detectInstalledPWA() {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches
    const isIOSInstalled = navigator.standalone // iOS Safari specific
    return isStandalone || isFullscreen || isIOSInstalled
  }

  isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  /**
   * Initialization
   */
  init() {
    if (this.isInstalled) {
      this.hideInstallPrompt()
      return
    }

    this.setupEventListeners()
    this.setupPlatformSpecificBehavior()
  }

  setupEventListeners() {
    this.setupDisplayModeListener()
    this.setupButtonEventDelegation()
  }

  setupPlatformSpecificBehavior() {
    if (this.isIOS) {
      this.initializeIOSBehavior()
    } else {
      this.initializeAndroidBehavior()
    }
  }

  /**
   * iOS Specific Behavior
   */
  initializeIOSBehavior() {
    this.renderInitialContent()
    this.showInstallPrompt()
    this.renderIOSContent()
  }

  /**
   * Android/Desktop Specific Behavior
   */
  initializeAndroidBehavior() {
    // Wait for beforeinstallprompt before showing anything
    this.hideInstallPrompt()
    this.setupAndroidEventListeners()
    this.setupFallbackTimeout()
  }

  setupAndroidEventListeners() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      this.deferredPrompt = e

      // Show header now that PWA install is ready
      this.renderAndroidContent()
      this.showInstallPrompt()
    })

    window.addEventListener("appinstalled", () => {
      this.handleSuccessfulInstallation()
    })
  }

  setupFallbackTimeout() {
    // If no PWA install prompt after reasonable time, show manual install option
    setTimeout(() => {
      if (!this.deferredPrompt && !this.isInstalled && this.isMobileDevice()) {
        this.showManualInstallButton()
      }
    }, 10000) // Wait 10 seconds for PWA support detection
  }

  /**
   * Event Listeners
   */
  setupDisplayModeListener() {
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const fullscreenQuery = window.matchMedia("(display-mode: fullscreen)")

    const handleDisplayModeChange = () => {
      this.isInstalled = this.detectInstalledPWA()
      if (this.isInstalled) {
        this.hideInstallPrompt()
      }
    }

    mediaQuery.addEventListener("change", handleDisplayModeChange)
    fullscreenQuery.addEventListener("change", handleDisplayModeChange)
  }

  setupButtonEventDelegation() {
    document.addEventListener("click", (e) => {
      this.handleButtonClick(e)
    })
  }

  handleButtonClick(e) {
    const target = e.target

    if (target.id === "pwa-dismiss-btn") {
      this.hideInstallPrompt()
    }

    if (target.id === "pwa-install-btn") {
      this.handleInstallButtonClick()
    }

    if (target.id === "ios-install-help") {
      this.showIOSInstallInstructions()
    }
  }

  handleInstallButtonClick() {
    if (this.deferredPrompt) {
      this.installPWA()
    } else {
      this.showInstallInstructions()
    }
  }

  /**
   * Content Rendering
   */
  renderInitialContent() {
    this.renderContent({
      text: "Install this app on your device",
      buttonText: "Install",
      buttonId: "pwa-install-btn",
    })
  }

  renderIOSContent() {
    this.renderContent({
      text: "For iOS users, please add to home screen for a better experience",
      buttonText: "How to Install",
      buttonId: "ios-install-help",
      buttonStyle:
        "background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; font-weight: 500;",
    })
  }

  renderAndroidContent() {
    this.renderContent({
      text: "Install our app for your android",
      buttonText: "Install App",
      buttonId: "pwa-install-btn",
    })
  }

  renderContent({ text, buttonText, buttonId, buttonStyle = "" }) {
    if (!this.installHeader) return

    const content = this.installHeader.querySelector(".pwa-install-content")
    if (!content) return

    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="./icons/web-app-manifest-192x192.png" alt="App Icon" style="width: 32px; height: 32px; border-radius: 0.25rem;">
        <span>${text}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button id="${buttonId}" class="pwa-install-btn" style="${buttonStyle}">${buttonText}</button>
        <button id="pwa-dismiss-btn" class="pwa-dismiss-btn">×</button>
      </div>
    `
  }

  /**
   * State Management
   */
  updateInstallButtonState() {
    if (!this.installHeader || !this.deferredPrompt) return

    const installBtn = this.installHeader.querySelector("#pwa-install-btn")
    if (installBtn) {
      installBtn.textContent = "Install App (Ready)"
      installBtn.style.background = "#10b981"
      installBtn.style.color = "white"
    }
  }

  updateButtonForUnsupportedSite() {
    if (!this.installHeader) return

    const installBtn = this.installHeader.querySelector("#pwa-install-btn")
    if (installBtn) {
      installBtn.textContent = "How to Install"
      installBtn.style.background = "#6b7280"
      installBtn.style.color = "white"
    }
  }

  handleSuccessfulInstallation() {
    this.hideInstallPrompt()
    this.deferredPrompt = null
    this.isInstalled = true
    this.showToast("App installed successfully! 🎉", "success")
  }

  /**
   * Installation Actions
   */
  async installPWA() {
    if (!this.deferredPrompt) {
      this.showToast("PWA installation not available", "error")
      return
    }

    try {
      await this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice

      if (outcome === "accepted") {
        this.showToast("PWA installation started! 📱", "success")
        this.isInstalled = true
      } else {
        this.showToast("PWA installation cancelled", "info")
      }

      this.deferredPrompt = null
      this.hideInstallPrompt()
    } catch (error) {
      console.error("Error installing PWA:", error)
      this.showToast("Error installing PWA", "error")
    }
  }

  /**
   * UI Controls
   */
  showInstallPrompt() {
    if (this.installHeader) {
      this.installHeader.classList.remove("hidden")
      this.installHeader.style.animation = "slideDown 0.3s ease-out"
    }
  }

  hideInstallPrompt() {
    if (this.installHeader) {
      this.installHeader.classList.add("hidden")
      this.installHeader.style.animation = ""
    }
  }

  /**
   * Instruction Modals
   */
  showIOSInstallInstructions() {
    this.showModal({
      title: "How to Install on iOS",
      content: `
        <ol style="text-align: left; margin-bottom: 1.5rem; line-height: 1.6;">
          <li>Tap the <strong>Share</strong> button (📤) in Safari</li>
          <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
          <li>Tap <strong>"Add"</strong> to confirm</li>
          <li>The app will now appear on your home screen!</li>
        </ol>
      `,
    })
  }

  showInstallInstructions() {
    this.showModal({
      title: "How to Install This App",
      content: `
        <div style="text-align: left; margin-bottom: 1.5rem; line-height: 1.6;">
          <p><strong>Chrome/Edge:</strong></p>
          <ol>
            <li>Look for the install icon (📱) in the address bar</li>
            <li>Click it and select "Install"</li>
          </ol>
          <p><strong>Firefox:</strong></p>
          <ol>
            <li>Click the menu button (☰)</li>
            <li>Select "Install App"</li>
          </ol>
          <p><strong>Mobile Safari:</strong></p>
          <ol>
            <li>Tap the Share button (📤)</li>
            <li>Select "Add to Home Screen"</li>
          </ol>
        </div>
      `,
    })
  }

  showModal({ title, content }) {
    const modal = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem;">
        <div style="background: white; border-radius: 1rem; padding: 2rem; max-width: 500px; text-align: center;">
          <h3 style="margin-bottom: 1rem; color: #1f2937;">${title}</h3>
          ${content}
          <button onclick="this.parentElement.parentElement.remove()" style="background: #448989; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: 500;">Got it!</button>
        </div>
      </div>
    `
    document.body.insertAdjacentHTML("beforeend", modal)
  }

  /**
   * Manual Install Fallback
   */
  showManualInstallButton() {
    const manualBtn = document.getElementById("manual-install-btn")
    if (!manualBtn) return

    // Clean slate approach to avoid duplicate event listeners
    const newManualBtn = manualBtn.cloneNode(true)
    manualBtn.parentNode.replaceChild(newManualBtn, manualBtn)

    newManualBtn.style.display = "inline-block"
    newManualBtn.addEventListener("click", () => this.showInstallInstructions())
  }

  /**
   * Toast Notifications
   */
  showToast(message, type = "info", duration = 5000) {
    if (window.GivingApp?.showToast) {
      window.GivingApp.showToast(message, type, duration)
    } else {
      console.log(`${type.toUpperCase()}: ${message}`)
    }
  }
}

/**
 * Initialize PWA Install Manager when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  new PWAInstallManager()
})

/**
 * Export for external use
 */
window.PWAInstallManager = PWAInstallManager
