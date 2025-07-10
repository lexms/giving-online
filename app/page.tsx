"use client"

import { year } from "@/components/const"
import { FundraisingBox } from "@/components/ui/fundraising-box"
import { YouCanAlso } from "@/components/ui/you-can-also"
import { Church, Heart } from "lucide-react"

// FundraisingBox hash from your URL
const FUNDRAISING_BOX_HASH = "0s4qe4vszf7y7jfh"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-[80vh] min-h-[600px] bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-banner.jpg')",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
            Be a part of the Mission
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-4xl leading-relaxed">
            Changing perceptions about Jesus & His Church, Creating a new
            mindset through the Gospel, Contributing to the wellbeing of
            Society.
          </p>
          <a
            href="#give"
            className="mt-8 px-8 py-4 bg-[#448989] text-white text-lg font-semibold rounded-md hover:bg-[#448989]/80 transition-colors"
          >
            Give now
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col max-w-6xl mx-auto px-4 py-16 gap-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            OPERATING AND ADVANCING
          </h2>
          {/* Message Sections */}
          <div className="grid md:grid-cols-2 gap-8">
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

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 leading-relaxed text-center">
              Your giving is fully tax-deductible, a giving-statement for your
              tax-return will be posted to you at the beginning of the new year.
              As an independent church, we do not benefit from the state church
              tax, if you would like to know more about how to opt out of the
              church tax system, please let the team know.
            </p>
          </div>

          {/* FundraisingBox Form */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8" id="give">
            <h2 className="text-2xl font-bold text-center mb-8">
              Make Your Contribution
            </h2>
            <FundraisingBox hash={FUNDRAISING_BOX_HASH} />
          </div>

          <YouCanAlso />
        </div>
      </div>
    </div>
  )
}
