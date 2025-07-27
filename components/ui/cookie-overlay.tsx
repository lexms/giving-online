"use client"

import { Cookie, Info, Shield, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

export function CookieOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the cookie notice
    const hasDismissed = localStorage.getItem("cookie-notice-dismissed")
    // if (hasDismissed) return

    // Function to handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollThreshold = 200 // Show after scrolling 200px

      if (scrollY > scrollThreshold && !hasScrolled) {
        setHasScrolled(true)
        // Small delay for smooth entrance animation
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 500)
        return () => clearTimeout(timer)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasScrolled])

  const handleDismiss = () => {
    setIsAnimating(true)
    // Animate out before hiding
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("cookie-notice-dismissed", "true")
    }, 300)
  }

  // Don't render anything until we've scrolled
  if (!hasScrolled) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isAnimating
          ? "translate-y-full opacity-0"
          : isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
      }`}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />

      {/* Main container - much more compact */}
      <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-row lg:flex-row gap-3">
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-900 mr-2 leading-[5px]">
                Privacy & Cookies:
              </span>
              <span className="text-xs text-gray-600 leading-[5px]">
                We take your privacy seriously. This site uses only essential
                cookies to ensure the donation process works properly.{" "}
                <span className="font-medium text-gray-700">
                  We do not use any tracking or marketing cookies.
                </span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 justify-center flex-shrink-0">
              <Button
                onClick={() =>
                  window.open(
                    "https://givingonline.eu/privacy-policy/",
                    "_blank"
                  )
                }
                variant="outline"
                size="sm"
                className="border-[#448989] text-[#448989] hover:bg-[#448989]/10 hover:border-[#448989] transition-colors text-xs px-2 py-1 h-6"
              >
                Learn more
              </Button>

              <Button
                onClick={handleDismiss}
                size="sm"
                className="bg-[#448989] hover:bg-[#448989]/80 text-white shadow-sm hover:shadow-md transition-all duration-200 text-xs px-2 py-1 h-6"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
