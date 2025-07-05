"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MessageCircle, Mail, Clock, Send, Headphones, AlertCircle } from "lucide-react"
import Link from "next/link"

const supportOptions = [
  {
    id: 1,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    icon: MessageCircle,
    availability: "24/7",
    responseTime: "< 2 minutes",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Phone Support",
    description: "Speak directly with a support specialist",
    icon: Phone,
    availability: "6 AM - 10 PM",
    responseTime: "Immediate",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "24/7",
    responseTime: "< 4 hours",
    color: "from-purple-500 to-pink-500",
  },
]

export default function SupportPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")

  const handleSendMessage = () => {
    if (!message.trim()) return
    alert("Support request sent! We'll get back to you soon.")
    setMessage("")
    setEmail("")
    setSubject("")
    setSelectedOption(null)
  }

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
            <Headphones className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Contact Support</h1>
          </div>
        </div>

        {/* Emergency Notice */}
        <Card className="bg-red-50 border-red-200 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 text-sm mb-1">Medical Emergency?</h3>
                <p className="text-red-700 text-xs mb-2">
                  For medical emergencies, call 911 immediately or contact your emergency contact.
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Call 911
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="space-y-4 mb-6">
          {supportOptions.map((option) => (
            <Card
              key={option.id}
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer transition-all duration-200 ${
                selectedOption === option.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center`}
                  >
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {option.availability}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {option.responseTime}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        {selectedOption && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedOption === 1 && "Start Live Chat"}
                {selectedOption === 2 && "Request Phone Call"}
                {selectedOption === 3 && "Send Email"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedOption === 2 && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Call Us Now</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">1-800-NURSILY</p>
                  <p className="text-sm text-gray-600">Available 6 AM - 10 PM daily</p>
                </div>
              )}

              {(selectedOption === 1 || selectedOption === 3) && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>

                  {selectedOption === 3 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Subject</label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Brief description of your issue"
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {selectedOption === 1 ? "Start your message" : "Message"}
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or question in detail..."
                      className="mt-1 h-24"
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || !email.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {selectedOption === 1 ? "Start Chat" : "Send Message"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Help */}
        <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-0 shadow-lg mt-6">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Need Quick Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Check our FAQ for instant answers to common questions</p>
            <Link href="/faq">
              <Button variant="outline" className="bg-transparent">
                View FAQ
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
