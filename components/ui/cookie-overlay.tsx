"use client"

import { useState, useEffect } from "react"
import { Button } from "./button"
import { Cookie, X, Shield, Info } from "lucide-react"

export function CookieOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the cookie notice
    const hasDismissed = localStorage.getItem("cookie-notice-dismissed")
    if (!hasDismissed) {
      // Small delay for smooth entrance animation
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsAnimating(true)
    // Animate out before hiding
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("cookie-notice-dismissed", "true")
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />

      {/* Main container */}
      <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Icon and content */}
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#448989]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#448989]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    Privacy & Cookies
                  </h3>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  We take your privacy seriously. This site uses only essential
                  cookies to ensure the donation process works properly.{" "}
                  <span className="font-medium text-gray-700">
                    We do not use any tracking or marketing cookies.
                  </span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={() =>
                  window.open(
                    "https://givingonline.eu/privacy-policy/",
                    "_blank"
                  )
                }
                variant="outline"
                size="sm"
                className="border-[#448989] text-[#448989] hover:bg-[#448989]/10 hover:border-[#448989] transition-colors"
              >
                Learn More
              </Button>

              <Button
                onClick={handleDismiss}
                size="sm"
                className="bg-[#448989] hover:bg-[#448989]/80 text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Got this
              </Button>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors group"
          aria-label="Close cookie notice"
        >
          <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
        </button>
      </div>
    </div>
  )
}
