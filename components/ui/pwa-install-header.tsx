"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

// Extend the WindowEventMap interface
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export function PWAInstallHeader() {
  const [showInstall, setShowInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if device is iOS
    const checkIsIOS = () => {
      const isIOSDevice =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !navigator.userAgent.includes("Android")
      setIsIOS(isIOSDevice)
      // On iOS, we want to show the install instructions by default if not installed
      if (isIOSDevice && !isStandalonePWA()) {
        setShowInstall(true)
      }
    }

    // Check if running as installed PWA
    const isStandalonePWA = () => {
      // Check if running in standalone mode
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches
      // Check if running in fullscreen mode
      const isFullscreen = window.matchMedia(
        "(display-mode: fullscreen)"
      ).matches
      // Check iOS specific standalone mode
      // @ts-ignore - navigator.standalone is only available on iOS
      const isIOSInstalled = navigator.standalone
      return isStandalone || isFullscreen || isIOSInstalled
    }

    // Check if running in standalone mode (installed PWA)
    const checkInstallation = () => {
      setIsInstalled(isStandalonePWA())
    }

    // Check initial status
    checkIsIOS()
    checkInstallation()

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const fullscreenQuery = window.matchMedia("(display-mode: fullscreen)")

    const handleDisplayModeChange = () => {
      checkInstallation()
    }

    mediaQuery.addEventListener("change", handleDisplayModeChange)
    fullscreenQuery.addEventListener("change", handleDisplayModeChange)

    // Handle install prompt (won't fire on iOS)
    const handleInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      if (!isInstalled) {
        setDeferredPrompt(e)
        setShowInstall(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handleInstallPrompt)

    return () => {
      mediaQuery.removeEventListener("change", handleDisplayModeChange)
      fullscreenQuery.removeEventListener("change", handleDisplayModeChange)
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt)
    }
  }, [isInstalled])

  const handleInstall = async () => {
    if (isIOS) {
      // Can't programmatically trigger install on iOS
      return
    }

    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstall(false)
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
  }

  // Hide if running as installed app
  if (isInstalled) return null

  // Don't show if it's not installed and we don't have install prompt (except on iOS)
  if (!showInstall && !isIOS) return null

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/icons/web-app-manifest-192x192.png"
          alt="App Icon"
          className="w-8 h-8 rounded"
        />
        <span>
          {isIOS
            ? "For iOS users, please add to home screen for a better experience"
            : "Install our app for a better experience"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {!isIOS && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleInstall}
            className="whitespace-nowrap"
          >
            Install App
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInstall(false)}
          className="text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
