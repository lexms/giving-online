export interface DonationOption {
  id: string
  name: string
  description: string
  category: "tithe" | "missions" | "building" | "other"
}

export interface DonationForm {
  optionId: string
  amount: number
  frequency: "one-time" | "monthly" | "weekly"
  personalInfo: {
    firstName: string
    lastName: string
    email: string
  }
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
}
