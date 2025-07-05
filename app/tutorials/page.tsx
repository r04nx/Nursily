"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, GraduationCap, Play, Clock, CheckCircle, Camera, MessageCircle, Heart, User } from "lucide-react"
import Link from "next/link"

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Nursily",
    description: "Learn the basics of using the Nursily app",
    duration: "5 min",
    difficulty: "Beginner",
    completed: true,
    icon: GraduationCap,
    steps: [
      "Creating your profile",
      "Setting up health information",
      "Understanding the dashboard",
      "Finding help and support",
    ],
  },
  {
    id: 2,
    title: "Taking Medication Photos",
    description: "How to photograph your medications and ask questions",
    duration: "3 min",
    difficulty: "Beginner",
    completed: false,
    icon: Camera,
    steps: [
      "Opening the camera feature",
      "Taking clear medication photos",
      "Adding medication details",
      "Asking questions to nurses",
    ],
  },
  {
    id: 3,
    title: "Connecting with Nurses",
    description: "Find and communicate with qualified nurses",
    duration: "7 min",
    difficulty: "Beginner",
    completed: false,
    icon: MessageCircle,
    steps: [
      "Browsing available nurses",
      "Using filters to find specialists",
      "Sending your first message",
      "Scheduling appointments",
    ],
  },
  {
    id: 4,
    title: "Managing Your Health Journal",
    description: "Track your daily health and symptoms",
    duration: "4 min",
    difficulty: "Intermediate",
    completed: false,
    icon: Heart,
    steps: [
      "Creating journal entries",
      "Recording symptoms and vitals",
      "Tracking medication effects",
      "Sharing with your nurse",
    ],
  },
  {
    id: 5,
    title: "Profile and Privacy Settings",
    description: "Customize your profile and privacy preferences",
    duration: "6 min",
    difficulty: "Intermediate",
    completed: false,
    icon: User,
    steps: [
      "Updating personal information",
      "Managing emergency contacts",
      "Setting notification preferences",
      "Understanding privacy controls",
    ],
  },
]

export default function TutorialsPage() {
  const [selectedTutorial, setSelectedTutorial] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const startTutorial = (tutorialId: number) => {
    setSelectedTutorial(tutorialId)
    setCurrentStep(0)
  }

  const nextStep = () => {
    const tutorial = tutorials.find((t) => t.id === selectedTutorial)
    if (tutorial && currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Tutorial completed
      setSelectedTutorial(null)
      setCurrentStep(0)
      alert("Tutorial completed! Great job!")
    }
  }

  const selectedTutorialData = tutorials.find((t) => t.id === selectedTutorial)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Tutorials</h1>
          </div>
        </div>

        {!selectedTutorial ? (
          <>
            {/* Progress Overview */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-lg mb-6">
              <CardContent className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Progress</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {tutorials.filter((t) => t.completed).length}
                    </div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {tutorials.length - tutorials.filter((t) => t.completed).length}
                    </div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial List */}
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tutorial.completed ? "bg-green-100" : "bg-purple-100"
                        }`}
                      >
                        {tutorial.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <tutorial.icon className="w-6 h-6 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm">{tutorial.title}</h3>
                          {tutorial.completed && <Badge className="bg-green-100 text-green-700 text-xs">✓ Done</Badge>}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{tutorial.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {tutorial.duration}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => startTutorial(tutorial.id)}
                          size="sm"
                          className={
                            tutorial.completed
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          }
                        >
                          <Play className="w-3 h-3 mr-2" />
                          {tutorial.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Tutorial View */
          <div className="space-y-4">
            {/* Tutorial Header */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {selectedTutorialData && <selectedTutorialData.icon className="w-5 h-5 text-purple-600" />}
                    {selectedTutorialData && selectedTutorialData.title}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedTutorial(null)} className="h-6 w-6">
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Step {currentStep + 1} of {selectedTutorialData ? selectedTutorialData.steps.length : 0}
                  </Badge>
                  <Badge
                    className={`text-xs ${selectedTutorialData ? getDifficultyColor(selectedTutorialData.difficulty) : ""}`}
                  >
                    {selectedTutorialData && selectedTutorialData.difficulty}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${selectedTutorialData ? ((currentStep + 1) / selectedTutorialData.steps.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Current Step */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  {selectedTutorialData && <selectedTutorialData.icon className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {selectedTutorialData && selectedTutorialData.steps[currentStep]}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  This step will guide you through{" "}
                  {selectedTutorialData && selectedTutorialData.steps[currentStep].toLowerCase()}. Follow along with the
                  app to complete this tutorial step.
                </p>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {selectedTutorialData &&
                    (currentStep === selectedTutorialData.steps.length - 1 ? "Complete Tutorial" : "Next Step")}
                </Button>
              </CardContent>
            </Card>

            {/* All Steps Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Tutorial Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedTutorialData &&
                    selectedTutorialData.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          index === currentStep
                            ? "bg-purple-50 border border-purple-200"
                            : index < currentStep
                              ? "bg-green-50"
                              : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                            index < currentStep
                              ? "bg-green-500 text-white"
                              : index === currentStep
                                ? "bg-purple-500 text-white"
                                : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {index < currentStep ? "✓" : index + 1}
                        </div>
                        <span
                          className={`text-sm ${
                            index === currentStep ? "font-semibold text-purple-700" : "text-gray-700"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
