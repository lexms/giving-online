import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
}

export const metadata: Metadata = {
  title: "Hillsong Berlin Giving",
  description: "Give generously to support Hillsong Berlin",
  manifest: "/manifest.json",
  appleWebApp: {
    statusBarStyle: "default",
    title: "Hillsong Berlin Giving",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Hillsong Berlin Giving"
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
