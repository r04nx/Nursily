"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PermissionsRequest from "@/components/permissions-request"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const steps = [
    {
      title: "Welcome to Nursily",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🏥</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Health, Our Priority</h2>
            <p className="text-gray-600 leading-relaxed">
              Connect with qualified nurses for personalized healthcare support, medication guidance, and health
              monitoring - all from the comfort of your home.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">👩‍⚕️</span>
              </div>
              <p className="text-sm text-gray-600">Expert Nurses</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📱</span>
              </div>
              <p className="text-sm text-gray-600">24/7 Access</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🔒</span>
              </div>
              <p className="text-sm text-gray-600">Secure & Private</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "App Permissions",
      content: (
        <PermissionsRequest
          onComplete={(perms) => {
            setPermissions(perms)
            setCurrentStep(2)
          }}
        />
      ),
    },
    {
      title: "You're All Set!",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Nursily!</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your account is ready. You can now connect with nurses, track your health, and get the care you deserve.
            </p>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm">Profile created successfully</span>
            </div>
            {permissions.geolocation && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Location access enabled</span>
              </div>
            )}
            {permissions.notifications && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm">Notifications enabled</span>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem("nursily_onboarding_complete", "true")
      router.push("/dashboard")
    }
  }

  const handleSkip = () => {
    localStorage.setItem("nursily_onboarding_complete", "true")
    router.push("/dashboard")
  }

  if (currentStep === 1) {
    return steps[1].content
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {steps[currentStep].content}

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button variant="outline" onClick={handleSkip} className="flex-1 bg-transparent">
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
