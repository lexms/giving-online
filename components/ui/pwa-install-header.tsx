"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"
import { IOSAddToHomeScreenCard } from "./ios-add-to-home-screen-card"

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

function isIOSDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !navigator.userAgent.includes("Android")
  )
}

function isStandalonePWA() {
  // Check if running in standalone mode
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches
  // Check if running in fullscreen mode
  const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches
  // Check iOS specific standalone mode
  // @ts-ignore - navigator.standalone is only available on iOS
  const isIOSInstalled = navigator.standalone
  return isStandalone || isFullscreen || isIOSInstalled
}

function PWAInstallHeaderIOS() {
  const [showInstall, setShowInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setShowInstall(!isStandalonePWA())
    setIsInstalled(isStandalonePWA())

    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const fullscreenQuery = window.matchMedia("(display-mode: fullscreen)")

    const handleDisplayModeChange = () => {
      setIsInstalled(isStandalonePWA())
      setShowInstall(!isStandalonePWA())
    }

    mediaQuery.addEventListener("change", handleDisplayModeChange)
    fullscreenQuery.addEventListener("change", handleDisplayModeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleDisplayModeChange)
      fullscreenQuery.removeEventListener("change", handleDisplayModeChange)
    }
  }, [])

  if (isInstalled || !showInstall) return null

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/icons/web-app-manifest-192x192.png"
          alt="App Icon"
          className="w-8 h-8 rounded"
        />
        <span>
          For iOS users, please add to home screen for a better experience
        </span>
      </div>
      <div className="flex items-center gap-2">
        <IOSAddToHomeScreenCard />
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

function PWAInstallHeaderAndroid() {
  const [showInstall, setShowInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsInstalled(isStandalonePWA())

    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const fullscreenQuery = window.matchMedia("(display-mode: fullscreen)")

    const handleDisplayModeChange = () => {
      setIsInstalled(isStandalonePWA())
    }

    mediaQuery.addEventListener("change", handleDisplayModeChange)
    fullscreenQuery.addEventListener("change", handleDisplayModeChange)

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
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setShowInstall(false)
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
  }

  if (isInstalled || !showInstall) return null

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/icons/web-app-manifest-192x192.png"
          alt="App Icon"
          className="w-8 h-8 rounded"
        />
        <span>Install our app for a better experience</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleInstall}
          className="whitespace-nowrap"
        >
          Install App
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

export function PWAInstallHeader() {
  const [isIOS, setIsIOS] = useState(false)
  useEffect(() => {
    setIsIOS(isIOSDevice())
  }, [])
  if (isIOS) return <PWAInstallHeaderIOS />
  return <PWAInstallHeaderAndroid />
}
