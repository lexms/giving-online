"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

export function PWAInstallHeader() {
  const [showInstall, setShowInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstall(false)
    }
  }

  if (!showInstall) return null

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
