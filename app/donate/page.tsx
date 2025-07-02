import { year } from "@/components/const"
import { Button } from "@/components/ui/button"
import DonationFormComponent from "@/features/donation/components/donation-form"
import { ArrowLeft, Church } from "lucide-react"
import Link from "next/link"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Church className="h-10 w-10 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Hillsong Berlin
              </h1>
            </div>
            <Button variant="ghost" asChild size="lg">
              <Link href="/" className="gap-2 text-base">
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center flex flex-col gap-6 mb-16">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Give Generously
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Thank you for choosing to give. Your generosity helps us build
              God's kingdom and impacts lives in our community and beyond.
            </p>
          </div>

          <DonationFormComponent />
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
