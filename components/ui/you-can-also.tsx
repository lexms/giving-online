import { useToast } from "@/hooks/use-toast"
import { Copy } from "lucide-react"
import { Button } from "./button"

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
  const { toast } = useToast()

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast({
        title: "Copied!",
        description: `${label} has been copied to clipboard`,
      })
    } catch (_err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

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
                className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
              >
                <dt className="font-medium text-gray-700 min-w-[140px]">
                  {detail.label}:
                </dt>
                <dd className="font-mono text-gray-900 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(detail.value, detail.label)}
                    className="size-8 hover:bg-gray-100"
                  >
                    <Copy className="size-4" />
                    <span className="sr-only">Copy {detail.label}</span>
                  </Button>
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
