"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"

interface FundraisingBoxProps {
  hash: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function FundraisingBox({
  hash,
  onSuccess,
  onError,
}: FundraisingBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up function to remove any FundraisingBox elements when component unmounts
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  const handleScriptLoad = () => {
    if (typeof window !== "undefined" && window.FundraisingBox) {
      window.FundraisingBox.init({
        hash,
        onSuccess: (data: any) => {
          console.log("Payment successful", data)
          onSuccess?.(data)
        },
        onError: (error: any) => {
          console.error("Payment failed", error)
          onError?.(error)
        },
      })
    }
  }

  return (
    <>
      <Script
        src="https://secure.fundraisingbox.com/app/paymentJS"
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />
      <div
        ref={containerRef}
        id="fundraisingbox-container"
        className="w-full"
      />
    </>
  )
}

// Add TypeScript declaration for FundraisingBox global object
declare global {
  interface Window {
    FundraisingBox?: {
      init: (config: {
        hash: string
        onSuccess?: (data: any) => void
        onError?: (error: any) => void
      }) => void
    }
  }
}
