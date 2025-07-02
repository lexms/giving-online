import type { DonationOption } from "@/types/donation"

export const donationOptions: DonationOption[] = [
  {
    id: "tithes",
    name: "Tithes & Offerings",
    description:
      "Support the general ministry and operations of Hillsong Berlin",
    category: "tithe",
  },
  {
    id: "missions",
    name: "Missions",
    description: "Help us plant churches and support missions around the world",
    category: "missions",
  },
  {
    id: "building",
    name: "Building Fund",
    description: "Contribute to our facilities and infrastructure development",
    category: "building",
  },
  {
    id: "youth",
    name: "Youth Ministry",
    description: "Support programs and activities for young people",
    category: "other",
  },
  {
    id: "worship",
    name: "Worship & Arts",
    description: "Fund music, creative arts, and worship experiences",
    category: "other",
  },
]

export const predefinedAmounts = [25, 50, 100, 200, 500]
