import { year } from "@/components/const"
import { BackButton } from "@/components/ui/back-button"

export default function ImprintPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="mb-8">
            <BackButton />
          </div>
          <h1 className="text-4xl font-bold mb-8">Site Notice</h1>

          <section className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Information pursuant to Sect. 5 German Telemedia Act (TMG)
              </h2>
              <div className="text-gray-600">
                <p>Hillsong Berlin e.V.</p>
                <p>Danziger Str. 211</p>
                <p>10407 Berlin</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                Register Information
              </h2>
              <div className="text-gray-600">
                <p>Register of Associations: VR 27694 B</p>
                <p>Registration court: Amtsgericht Charlottenburg</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Represented by</h2>
              <div className="text-gray-600">
                <p>Constantin von Polier, Vorstandsvorsitzender</p>
                <p>Mark Wilkinson, stellv. Vorstandsvorsitzender</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <div className="text-gray-600">
                <p>Phone: 030 233271060</p>
                <p>E-mail: contact@berlinteam.org</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Dispute Resolution</h2>
              <p className="text-gray-600">
                We are not willing or obliged to participate in dispute
                resolution proceedings in front of a consumer arbitration board.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
