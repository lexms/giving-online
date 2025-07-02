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

  useEffect(() => {
    // Check if running in standalone mode (installed PWA)
    const checkInstallation = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches
      // @ts-ignore - navigator.standalone is only available on iOS
      const isIOSInstalled = navigator.standalone
      setIsInstalled(isStandalone || isIOSInstalled)
    }

    // Check initial installation status
    checkInstallation()

    // Listen for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    mediaQuery.addEventListener("change", checkInstallation)

    // Handle install prompt
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

  // Don't show if prompt isn't available and app isn't installed
  if (!showInstall && !isInstalled) return null

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
            : "Install our app for a better experience"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={isInstalled ? handleOpenApp : handleInstall}
          className="whitespace-nowrap"
        >
          {isInstalled ? "Open App" : "Install App"}
        </Button>
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
