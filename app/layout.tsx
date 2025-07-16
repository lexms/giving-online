import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Footer } from "@/components/ui/footer"
import { PWAInstallHeader } from "@/components/ui/pwa-install-header"
import { Toaster } from "@/components/ui/toaster"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
}

export const metadata: Metadata = {
  title: "Giving",
  description: "Giving",
  manifest: "/manifest.json",
  appleWebApp: {
    statusBarStyle: "default",
    title: "Giving",
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
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Giving Platform" />
      </head>
      <script
        id="usercentrics-cmp"
        async
        data-eu-mode="true"
        data-settings-id="PMhw0hdM1B3hC2"
        src="https://app.eu.usercentrics.eu/browser-ui/latest/loader.js"
      />
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <PWAInstallHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
