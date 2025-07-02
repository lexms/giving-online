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
      // On iOS, we want to show the install instructions by default
      if (isIOSDevice) {
        setShowInstall(true)
      }
    }

    // Check if running in standalone mode (installed PWA)
    const checkInstallation = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches
      // @ts-ignore - navigator.standalone is only available on iOS
      const isIOSInstalled = navigator.standalone
      setIsInstalled(isStandalone || isIOSInstalled)
    }

    // Check initial status
    checkIsIOS()
    checkInstallation()

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    mediaQuery.addEventListener("change", checkInstallation)

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
      mediaQuery.removeEventListener("change", checkInstallation)
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

  const handleOpenApp = () => {
    // Get the current URL but ensure it uses HTTPS
    const appUrl = window.location.href.replace("http://", "https://")
    window.open(appUrl, "_blank")
  }

  // Don't show if it's not installed and we don't have install prompt (except on iOS)
  if (!showInstall && !isInstalled && !isIOS) return null

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/icons/web-app-manifest-192x192.png"
          alt="App Icon"
          className="w-8 h-8 rounded"
        />
        <span>
          {isInstalled
            ? "Open our app for a better experience"
            : isIOS
              ? "Add to Home Screen for a better experience"
              : "Install our app for a better experience"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isInstalled ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleOpenApp}
            className="whitespace-nowrap"
          >
            Open App
          </Button>
        ) : isIOS ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {}}
            className="whitespace-nowrap"
          >
            Tap ⋯ then "Add to Home Screen"
          </Button>
        ) : (
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
