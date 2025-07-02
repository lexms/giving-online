"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import type { DonationForm } from "@/types/donation"
import { CreditCard, Heart, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import { processDonation } from "../actions"
import { donationOptions, predefinedAmounts } from "../data"

export default function DonationFormComponent() {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const [showThankYou, setShowThankYou] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  const [form, setForm] = useState<DonationForm>({
    optionId: donationOptions[0].id,
    amount: 0,
    frequency: "one-time",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      })
      return
    }

    if (
      !form.personalInfo.firstName ||
      !form.personalInfo.lastName ||
      !form.personalInfo.email
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const result = await processDonation(form)

      if (result.success) {
        setTransactionId(result.transactionId || "")
        setShowThankYou(true)
        toast({
          title: "Donation Successful!",
          description: `Thank you for your generous donation of €${form.amount}.`,
        })
        // Reset form
        setForm({
          ...form,
          amount: 0,
          personalInfo: { firstName: "", lastName: "", email: "" },
        })
      } else {
        toast({
          title: "Payment Failed",
          description:
            result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  if (showThankYou) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-6 pt-12">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Heart className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-900 mb-4">
              Thank You!
            </CardTitle>
            <CardDescription className="text-lg text-green-800 leading-relaxed">
              Your donation of €{form.amount} was successful.
              {transactionId && (
                <>
                  <br />
                  <span className="text-sm font-mono bg-green-100 px-3 py-1 rounded mt-3 inline-block">
                    Transaction ID: {transactionId}
                  </span>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-12">
            <Button
              onClick={() => setShowThankYou(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-lg"
              size="lg"
            >
              Make Another Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Donation Option Selection */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">Choose a Fund</CardTitle>
            <CardDescription className="text-base mt-2">
              Select which ministry or cause you'd like to support
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <RadioGroup
              value={form.optionId}
              onValueChange={(value) => setForm({ ...form, optionId: value })}
              className="space-y-4"
            >
              {donationOptions.map((option) => (
                <div key={option.id} className="flex gap-2 items-start">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1"
                  />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="space-y-2">
                      <div className="font-semibold text-lg text-gray-900">
                        {option.name}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Amount Selection */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">Select Amount</CardTitle>
            <CardDescription className="text-base mt-2">
              Choose a preset amount or enter your own
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={form.amount === amount ? "default" : "outline"}
                  onClick={() => setForm({ ...form, amount })}
                  className="h-14 text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  €{amount}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <Label
                htmlFor="custom-amount"
                className="text-xl font-medium min-w-fit"
              >
                €
              </Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter custom amount"
                value={form.amount || ""}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
                min="1"
                className="flex-1 h-14 text-lg px-4 border-2 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Frequency */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">Frequency</CardTitle>
            <CardDescription className="text-base mt-2">
              How often would you like to give?
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <RadioGroup
              value={form.frequency}
              onValueChange={(value) =>
                setForm({ ...form, frequency: value as any })
              }
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8"
            >
              {["one-time", "weekly", "monthly"].map((freq) => (
                <div
                  key={freq}
                  className="flex gap-2 items-center justify-center"
                >
                  <RadioGroupItem value={freq} id={freq} />
                  <Label
                    htmlFor={freq}
                    className="cursor-pointer font-medium text-lg capitalize flex-1"
                  >
                    {freq.replace("-", " ")}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">
              Your Information
            </CardTitle>
            <CardDescription className="text-base mt-2">
              We need this information to process your donation securely
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={form.personalInfo.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personalInfo: {
                        ...form.personalInfo,
                        firstName: e.target.value,
                      },
                    })
                  }
                  className="h-12 text-base border-2 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={form.personalInfo.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      personalInfo: {
                        ...form.personalInfo,
                        lastName: e.target.value,
                      },
                    })
                  }
                  className="h-12 text-base border-2 focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={form.personalInfo.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    personalInfo: {
                      ...form.personalInfo,
                      email: e.target.value,
                    },
                  })
                }
                className="h-12 text-base border-2 focus:border-primary"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Separator className="mb-8" />

          {/* Submit Button */}
          <div className="text-center space-y-6">
            <Button
              type="submit"
              disabled={isPending || form.amount <= 0}
              className="w-full max-w-md h-16 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-3 h-6 w-6" />
                  Give €{form.amount || 0}{" "}
                  {form.frequency !== "one-time" && `(${form.frequency})`}
                </>
              )}
            </Button>

            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              🔒 This is a secure demo environment. No actual transactions will
              be processed.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
