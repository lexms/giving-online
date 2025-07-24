"use client"

import { useEffect, useState } from "react"

interface FundraisingBoxProps {
  hash: string
  fullHeight?: boolean
}

export function FundraisingBox({ hash, fullHeight = false }: FundraisingBoxProps) {
  const [height, setHeight] = useState<number>(1500) // fallback height

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === "https://secure.fundraisingbox.com" &&
        event.data &&
        typeof event.data.height === "number"
      ) {
        setHeight(event.data.height)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Calculate full viewport height minus any header/footer space
  const getFullHeight = () => {
    if (fullHeight) {
      // Subtract approximate header height (adjust as needed)
      const headerHeight = 80 // Adjust based on your layout
      return `calc(100vh - ${headerHeight}px)`
    }
    return `${height + 110}px`
  }

  return (
    <iframe
      src={`https://secure.fundraisingbox.com/app/payment?hash=${hash}#https%3A%2F%2Fgivingonline.eu%2Fberlin%2F%23give`}
      className={`w-full border-none ${fullHeight ? 'h-full' : ''}`}
      style={{ height: getFullHeight() }}
      title="Donation Form"
      allow="payment"
    />
  )
}

// Add TypeScript declaration for FundraisingBox global object
declare global {
  interface Window {
    FundraisingBox?: {
      init: (config: { hash: string }) => void
    }
  }
}
