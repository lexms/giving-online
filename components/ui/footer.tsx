"use client"

import { year } from "@/components/const"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="flex flex-col max-w-6xl mx-auto px-6 py-8 gap-4 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-4 flex-wrap">
          <a
            href="https://givingonline.eu/imprint/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Imprint
          </a>
          <a
            href="https://givingonline.eu/privacy-policy/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
          <button
            type="button"
            onClick={() => {
              // @ts-ignore - Usercentrics types not available
              window.UC_UI?.showSecondLayer()
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Cookie Preferences
          </button>
        </div>
        <p className="text-muted-foreground text-base">
          © {year} Giving Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
