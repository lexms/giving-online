import { year } from "@/components/const"
import { Button } from "@/components/ui/button"
import { Church, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Church className="h-10 w-10 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Hillsong Berlin
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Heart className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
              Welcome to Hillsong Berlin Giving
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your generosity makes a difference in our community and beyond.
              Thank you for partnering with us in building God's kingdom.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <Button
              asChild
              size="lg"
              className="text-xl px-12 py-8 h-16 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/donate" className="gap-3">
                <Heart className="h-6 w-6" />
                Give Now
              </Link>
            </Button>

            <p className="text-base text-muted-foreground">
              🔒 Safe and secure giving powered by our trusted platform
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground text-base">
            © {year} Hillsong Berlin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
