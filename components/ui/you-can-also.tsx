import { Card } from "./card"

interface BankDetails {
  label: string
  value: string
}

const bankDetails: BankDetails[] = [
  { label: "Account Name", value: "Hillsong Berlin e.V." },
  { label: "Bank", value: "Commerzbank Berlin" },
  { label: "IBAN", value: "DE07 1204 0000 0623 4595 00" },
  { label: "SWIFT CODE (BIC)", value: "COBADEFFXXX" },
]

export function YouCanAlso() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            You can also give via
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Standing Order (Dauerauftrag)
          </h3>

          <p className="text-gray-600">
            The best way to help your church plan financially. Please use the
            following details to set up your standing order:
          </p>

          <dl className="space-y-3">
            {bankDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col sm:flex-row sm:gap-4"
              >
                <dt className="font-medium text-gray-700 min-w-[140px]">
                  {detail.label}:
                </dt>
                <dd className="font-mono text-gray-900">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
