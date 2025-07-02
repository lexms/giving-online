import { year } from "@/components/const"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">
        <div className="flex justify-center gap-8 mb-4">
          <a
            href="/imprint"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Imprint
          </a>
          <a
            href="/privacy-policy"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <p className="text-muted-foreground text-base">
          © {year} Hillsong Berlin. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
