"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Menu,
  X,
  User,
  BookOpen,
  Quote,
  Activity,
  Smartphone,
  HelpCircle,
  Info,
  Phone,
  GraduationCap,
  Mic,
  Home,
  Camera,
  MessageCircle,
  History,
  Bell,
} from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Home", active: true, href: "/dashboard" },
  { icon: User, label: "Profile Settings", href: "/profile" },
  { icon: BookOpen, label: "Health Journal", href: "/health-journal" },
  { icon: Camera, label: "Medication Photos", href: "/medication-photos" },
  { icon: MessageCircle, label: "Connect with Nurses", href: "/nurse-connection" },
  { icon: History, label: "Connection History", href: "/connection-history" },
  { icon: Quote, label: "Quote of the Day", href: "/daily-quote" },
  { icon: Activity, label: "Daily Health Score", href: "/health-score" },
  { icon: Smartphone, label: "Connect Devices", href: "/connect-devices" },
  { icon: HelpCircle, label: "FAQ", href: "/faq" },
  { icon: Info, label: "About App", href: "/about" },
  { icon: Phone, label: "Contact Support", href: "/support" },
  { icon: GraduationCap, label: "Tutorials", href: "/tutorials" },
  { icon: Mic, label: "Voice Assistant", href: "/voice-assistant" },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)
  const [showNuri, setShowNuri] = useState(true)

  const healthScore = 78
  const dailyQuote = "Every day is a new beginning. Take a deep breath, smile, and start again."

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Compact Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-60`}
      >
        <div className="p-4">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nursily
              </h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Compact Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.href || "#"}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start h-10 text-left text-sm ${
                    item.active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-purple-50"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-60">
        {/* Compact Top Bar */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm p-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden h-8 w-8">
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Welcome back, Sarah!</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-sm">👵</span>
            </div>
          </div>
        </div>

        {/* Compact Dashboard Content */}
        <div className="p-4 space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/medication-photos">
              <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3 text-center">
                  <Camera className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">Photo Medication</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/nurse-connection">
              <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3 text-center">
                  <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">Ask Nurse</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Compact Quote */}
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-purple-700 text-sm mb-1">Daily Inspiration</h3>
                  <p className="text-gray-700 text-sm italic leading-relaxed">"{dailyQuote}"</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact Health Score */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${healthScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">{healthScore}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Health Score</h3>
                  <p className="text-xs text-gray-600 mb-2">Great job today!</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact Health Tracking */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Smartphone className="w-4 h-4 text-blue-500" />
                Today's Health
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">72</div>
                  <div className="text-xs text-gray-600">BPM</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">3.2K</div>
                  <div className="text-xs text-gray-600">Steps</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">7.5h</div>
                  <div className="text-xs text-gray-600">Sleep</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">98%</div>
                  <div className="text-xs text-gray-600">O2</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compact Voice Assistant Button */}
      <Button
        onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
        className="fixed bottom-20 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-lg z-30"
      >
        <Mic className="w-5 h-5 text-white" />
      </Button>

      {/* Fixed Nuri */}
      {showNuri && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            <div
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => setShowNuri(false)}
            >
              <span className="text-lg">🦉</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xs">👩‍⚕️</span>
            </div>
          </div>
        </div>
      )}

      {/* Compact Voice Assistant Modal */}
      {showVoiceAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mic className="w-5 h-5 text-blue-500" />
                Voice Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 text-sm">Listening... Ask me anything!</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>"How do I take my medication?"</p>
                <p>"What's my health score?"</p>
                <p>"Call my emergency contact"</p>
              </div>
              <Button onClick={() => setShowVoiceAssistant(false)} variant="outline" className="w-full">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
