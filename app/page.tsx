"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, ArrowRight, X, ChevronLeft } from "lucide-react"
import Link from "next/link"

const onboardingSlides = [
  {
    title: "Welcome to Nursily",
    subtitle: "Compassion Meets Care",
    text: "Connect with qualified nurses who provide personalized, compassionate care in the comfort of your home.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-pink-600/80 via-purple-600/70 to-blue-600/80",
    icon: "🏠",
  },
  {
    title: "Find Your Perfect Match",
    subtitle: "Personalized Care",
    text: "Our smart matching system connects you with nurses specialized in your specific health needs and preferences.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-blue-600/80 via-teal-600/70 to-green-600/80",
    icon: "🎯",
  },
  {
    title: "Track Your Health Journey",
    subtitle: "Stay Connected",
    text: "Monitor your well-being, track medications, and stay connected with your care team for better health outcomes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
    bgGradient: "from-green-600/80 via-emerald-600/70 to-teal-600/80",
    icon: "📊",
  },
]

// Enhanced Nuri Mascot Component
function NuriMascot({ message, isVisible, onHide }: { message?: string; isVisible: boolean; onHide: () => void }) {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div
          className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300 animate-bounce"
          onClick={onHide}
        >
          <span className="text-2xl">🦉</span>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xs">👩‍⚕️</span>
        </div>
        {message && (
          <div className="absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl max-w-64 text-sm border border-white/20">
            <div className="flex justify-between items-start gap-2">
              <div className="text-gray-700 text-sm leading-relaxed">{message}</div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full" onClick={onHide}>
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white/95"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNuri, setShowNuri] = useState(false)
  const [nuriMessage, setNuriMessage] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNuri(true)
      setNuriMessage(
        "Hi there! I'm Nuri, your health companion! 💜 Swipe through to discover how Nursily can help you!",
      )
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const currentSlideData = onboardingSlides[currentSlide]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full-screen Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image || "/placeholder.svg"}
          alt="Onboarding background"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {/* Vignette Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-700`}
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Nursily</h1>
          </div>
          <Link href="/user-selection">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Skip
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-32">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 mb-8">
              <span className="text-4xl">{currentSlideData.icon}</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-white leading-tight">{currentSlideData.title}</h2>
              <h3 className="text-xl font-medium text-white/90">{currentSlideData.subtitle}</h3>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed max-w-sm mx-auto">{currentSlideData.text}</p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-6 space-y-6">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white w-8" : index < currentSlide ? "bg-white/60 w-2" : "bg-white/30 w-2"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            {currentSlide < onboardingSlides.length - 1 ? (
              <Button
                onClick={nextSlide}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-8 py-3 rounded-full"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Link href="/user-selection">
                <Button className="bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white text-gray-800 px-8 py-3 rounded-full font-semibold shadow-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          {/* Swipe Hint */}
          <div className="text-center">
            <p className="text-white/60 text-sm">Swipe or tap to continue</p>
          </div>
        </div>
      </div>

      {/* Enhanced Nuri Mascot */}
      <NuriMascot message={nuriMessage} isVisible={showNuri} onHide={() => setShowNuri(false)} />

      {/* Touch/Swipe Areas for Mobile */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute left-0 top-0 w-1/3 h-full pointer-events-auto" onClick={prevSlide} />
        <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-auto" onClick={nextSlide} />
      </div>
    </div>
  )
}
