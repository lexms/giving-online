"use client"

import { useEffect, useState } from "react"

interface FundraisingBoxProps {
  hash: string
}

export function FundraisingBox({ hash }: FundraisingBoxProps) {
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

  return (
    <iframe
      src={`https://secure.fundraisingbox.com/app/payment?hash=${hash}#https%3A%2F%2Fgivingonline.eu%2Fberlin%2F%23give`}
      className="w-full border-none"
      height={`${height + 100}px`}
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
