"use client"

import { year } from "@/components/const"
import { FundraisingBox } from "@/components/ui/fundraising-box"
import { useToast } from "@/hooks/use-toast"
import { Church, Heart } from "lucide-react"

// FundraisingBox hash from your URL
const FUNDRAISING_BOX_HASH = "0s4qe4vszf7y7jfh"

export default function HomePage() {
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: "Thank you for your donation!",
      description: "Your payment was processed successfully.",
    })
  }

  const handleError = (error: any) => {
    toast({
      title: "Payment Failed",
      description: error?.message || "Something went wrong. Please try again.",
      variant: "destructive",
    })
  }

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

      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[400px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-banner.jpg')",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">
            OPERATING AND ADVANCING
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Welcome Message */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto shadow-lg mb-8">
              <Heart className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Hillsong Berlin Giving
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your generosity makes a difference in our community and beyond.
              Thank you for partnering with us in building God's kingdom.
            </p>
          </div>

          {/* Message Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Tithe & Offerings */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Tithe & Offerings</h2>
              <p className="text-gray-600 leading-relaxed">
                Tithes & Offerings operate the ongoing work of the local church.
                By bringing our tithes & our offerings to God's House we put God
                first and honour who He is in our lives.
              </p>
            </div>

            {/* Heart for the House */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Heart for the House</h2>
              <p className="text-gray-600 leading-relaxed">
                Heart for the House is an annual sacrificial giving that
                advances the church. It's a time of prayer and listening to
                God's voice.
              </p>
            </div>

            {/* Kingdom Builders */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Kingdom Builders</h2>
              <p className="text-gray-600 leading-relaxed">
                Kingdom Builders are the financial pillars of our church, who
                feel called by God to advance the church financially throughout
                the year, above their normal tithes & offerings. To know more
                about Kingdom Builders, please contact our team.
              </p>
            </div>

            {/* Building Fund */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Building Fund</h2>
              <p className="text-gray-600 leading-relaxed">
                The Building Fund is an initiative to move towards owning our
                own facilities, establishing the Church for the Generations to
                come.
              </p>
            </div>
          </div>

          {/* FundraisingBox Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Make Your Contribution
            </h2>
            <FundraisingBox
              hash={FUNDRAISING_BOX_HASH}
              onSuccess={handleSuccess}
              onError={handleError}
            />
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
