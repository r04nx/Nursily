"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, Stethoscope, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UserSelectionPage() {
  const [selectedType, setSelectedType] = useState<"patient" | "nurse" | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/health-details?type=${selectedType}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Choose Your Role</h1>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4 mb-8">
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedType === "patient"
                ? "ring-2 ring-purple-500 bg-purple-50"
                : "bg-white/80 backdrop-blur-sm hover:bg-purple-50"
            }`}
            onClick={() => setSelectedType("patient")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">I'm a Patient</h3>
                  <p className="text-sm text-gray-600">Looking for professional nursing care and health monitoring</p>
                </div>
                {selectedType === "patient" && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedType === "nurse"
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "bg-white/80 backdrop-blur-sm hover:bg-blue-50"
            }`}
            onClick={() => setSelectedType("nurse")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">I'm a Nurse</h3>
                  <p className="text-sm text-gray-600">Providing professional healthcare services to patients</p>
                </div>
                {selectedType === "nurse" && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't worry, you can always change this later in your profile settings.
        </p>
      </div>
    </div>
  )
}
