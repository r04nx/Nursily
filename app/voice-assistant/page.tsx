"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Mic, MicOff, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const quickCommands = [
  "How do I take my medication?",
  "What's my blood pressure today?",
  "Schedule a nurse visit",
  "Call emergency services",
  "Record my symptoms",
  "Check my health score",
]

const conversationHistory = [
  {
    id: 1,
    type: "user",
    message: "What's my medication schedule for today?",
    time: "2:30 PM",
  },
  {
    id: 2,
    type: "assistant",
    message:
      "You have 3 medications scheduled today: Lisinopril at 8 AM (taken), Metformin at 12 PM (taken), and your evening dose of Lisinopril at 8 PM (pending).",
    time: "2:30 PM",
  },
  {
    id: 3,
    type: "user",
    message: "Remind me about my evening medication",
    time: "2:31 PM",
  },
  {
    id: 4,
    type: "assistant",
    message: "I've set a reminder for your Lisinopril at 8 PM today. You'll receive a notification 15 minutes before.",
    time: "2:31 PM",
  },
]

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentMessage, setCurrentMessage] = useState("")
  const [conversation, setConversation] = useState(conversationHistory)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const startListening = () => {
    setIsListening(true)
    setCurrentMessage("Listening...")

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setCurrentMessage("")
      // Add user message to conversation
      const userMessage = {
        id: conversation.length + 1,
        type: "user" as const,
        message: "How is my health today?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setConversation((prev) => [...prev, userMessage])

      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage = {
          id: conversation.length + 2,
          type: "assistant" as const,
          message:
            "Based on your recent vitals, you're doing well! Your blood pressure is within normal range, and you've been consistent with your medications. Keep up the great work!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setConversation((prev) => [...prev, assistantMessage])
      }, 1500)
    }, 3000)
  }

  const handleQuickCommand = (command: string) => {
    const userMessage = {
      id: conversation.length + 1,
      type: "user" as const,
      message: command,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversation((prev) => [...prev, userMessage])

    // Simulate assistant response based on command
    setTimeout(() => {
      let response = "I'm here to help! Let me get that information for you."

      if (command.includes("medication")) {
        response = "Your next medication is Lisinopril at 8 PM. Would you like me to set a reminder?"
      } else if (command.includes("blood pressure")) {
        response = "Your last blood pressure reading was 120/80 mmHg at 10 AM today. That's within the normal range!"
      } else if (command.includes("nurse")) {
        response = "I can help you schedule a nurse visit. What time works best for you?"
      } else if (command.includes("emergency")) {
        response = "In case of emergency, I can connect you to emergency services. Is this a medical emergency?"
      }

      const assistantMessage = {
        id: conversation.length + 2,
        type: "assistant" as const,
        message: response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setConversation((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nuri Assistant</h1>
              <p className="text-sm text-gray-600">Your health companion</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Voice Controls */}
        <div className="p-4 bg-white/60 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Voice Response</span>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>
            <Badge variant={isListening ? "default" : "secondary"} className="bg-purple-100 text-purple-800">
              {isListening ? "Listening" : "Ready"}
            </Badge>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === "user" ? "bg-purple-600 text-white" : "bg-white shadow-sm border"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${message.type === "user" ? "text-purple-200" : "text-gray-500"}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          {currentMessage && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl">
                <p className="text-sm text-gray-600">{currentMessage}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Commands */}
        <div className="p-4 bg-white/80 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Commands</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickCommands.slice(0, 4).map((command, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2 px-3 text-left justify-start bg-transparent"
                onClick={() => handleQuickCommand(command)}
              >
                {command}
              </Button>
            ))}
          </div>
        </div>

        {/* Voice Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center justify-center">
            <Button
              size="lg"
              className={`rounded-full w-16 h-16 ${
                isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-purple-600 hover:bg-purple-700"
              }`}
              onClick={startListening}
              disabled={isListening}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {isListening ? "Listening... Tap to stop" : "Tap to speak with Nuri"}
          </p>
        </div>
      </div>
    </div>
  )
}
