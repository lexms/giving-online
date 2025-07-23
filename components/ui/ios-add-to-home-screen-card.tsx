import { X } from "lucide-react"
import React from "react"

export interface IOSAddToHomeScreenCardProps {
  open: boolean
  onClose: () => void
}

export function IOSAddToHomeScreenCard({ open, onClose }: IOSAddToHomeScreenCardProps) {
  // For accessibility, focus trap could be added if needed
  return (
    <div
      className={`fixed top-0 right-0 h-full max-w-xs w-full z-50 bg-white text-primary shadow-lg border-l border-primary/10 transition-transform duration-300 ease-in-out flex flex-col
        ${open ? 'translate-x-0' : 'translate-x-full'}
      `}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-primary text-primary-foreground">
        <span className="font-semibold">Add to Home Screen</span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-primary-foreground hover:text-primary-foreground/70"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-4">
        <img
          src="/icons/web-app-manifest-192x192.png"
          alt="App Icon"
          className="w-12 h-12 rounded self-center mb-2"
        />
        <h2 className="text-lg font-bold mb-2 text-center">Install this app on your iPhone</h2>
        <ol className="list-decimal list-inside text-sm space-y-2">
          <li>Tap the <span className="inline-block align-middle"><svg className="inline w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-8" /><path d="M8 12l4-4 4 4" /></svg></span> Share button in Safari.</li>
          <li>Scroll down and tap <span className="font-semibold">Add to Home Screen</span>.</li>
          <li>Tap <span className="font-semibold">Add</span> in the top right corner.</li>
        </ol>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Enjoy a better, app-like experience!
        </div>
      </div>
    </div>
  )
}

export default IOSAddToHomeScreenCard; 