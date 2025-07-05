"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I connect with a nurse?",
      answer:
        "You can connect with nurses through our 'Connect with Nurses' feature. Browse available nurses, filter by specialization, and send a message or schedule a call.",
      category: "Getting Started",
    },
    {
      id: "2",
      question: "Are the nurses licensed and verified?",
      answer:
        "Yes, all nurses on our platform are licensed professionals. We verify their credentials, licenses, and background before they can provide services.",
      category: "Safety",
    },
    {
      id: "3",
      question: "How much do nurse services cost?",
      answer:
        "Costs vary by nurse and service type. Most nurses charge between $40-60 per hour. You can see each nurse's hourly rate before connecting.",
      category: "Pricing",
    },
    {
      id: "4",
      question: "Can I use the app for emergency situations?",
      answer:
        "This app is not for medical emergencies. For emergencies, call 911 immediately. Our nurses provide non-emergency care and health monitoring.",
      category: "Safety",
    },
    {
      id: "5",
      question: "How do I take photos of my medications?",
      answer:
        "Go to 'Medication Photos' in your dashboard. Fill in the medication details, then use your camera to take a clear photo of the medication bottle or packaging.",
      category: "Features",
    },
    {
      id: "6",
      question: "Is my health data secure?",
      answer:
        "Yes, we use industry-standard encryption and follow HIPAA guidelines to protect your health information. Your data is never shared without your consent.",
      category: "Privacy",
    },
    {
      id: "7",
      question: "Can I schedule recurring appointments?",
      answer:
        "Yes, you can schedule one-time or recurring appointments with your preferred nurses. They'll help you set up a regular care schedule.",
      category: "Appointments",
    },
    {
      id: "8",
      question: "What if I need to cancel an appointment?",
      answer:
        "You can cancel appointments up to 24 hours in advance without penalty. Last-minute cancellations may incur a small fee.",
      category: "Appointments",
    },
    {
      id: "9",
      question: "How does the voice assistant work?",
      answer:
        "Nuri, our voice assistant, can help you with medication reminders, health questions, and navigating the app. Just tap the microphone button to start talking.",
      category: "Features",
    },
    {
      id: "10",
      question: "Can family members access my account?",
      answer:
        "You can add family members as emergency contacts, but they cannot access your account directly. You can share specific information with them if needed.",
      category: "Privacy",
    },
  ]

  const categories = ["All", ...Array.from(new Set(faqItems.map((item) => item.category)))]

  const filteredItems = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
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
            <HelpCircle className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">FAQ</h1>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search frequently asked questions..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.question}</h3>
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    {expandedItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedItems.includes(item.id) && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or browse different categories.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                variant="outline"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-lg mt-6">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Still need help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link href="/support">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Contact Support</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
