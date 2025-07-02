"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "./button"

export function BackButton() {
  return (
    <Link href="/">
      <Button variant="ghost" className="gap-2 pl-0">
        <ChevronLeft className="h-4 w-4" />
        Back to giving
      </Button>
    </Link>
  )
}
