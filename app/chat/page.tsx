"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone, Video, Paperclip, Mic, Send } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "image" | "audio" | "system"
  isRead: boolean
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  role: "nurse" | "patient"
  isOnline: boolean
  lastSeen?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "nurse1",
      senderName: "Emma Thompson",
      senderAvatar: "👩‍⚕️",
      content: "Hello! I'm here to help with your health questions. How are you feeling today?",
      timestamp: "10:30 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "2",
      senderId: "patient1",
      senderName: "You",
      senderAvatar: "👤",
      content: "Hi Emma! I'm doing well, thank you. I had a question about my medication timing.",
      timestamp: "10:32 AM",
      type: "text",
      isRead: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentUser] = useState<ChatUser>({
    id: "nurse1",
    name: "Emma Thompson",
    avatar: "👩‍⚕️",
    role: "nurse",
    isOnline: true,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "patient1",
      senderName: "You",
      senderAvatar: "👤",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isRead: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate nurse response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: "nurse1",
        senderName: "Emma Thompson",
        senderAvatar: "👩‍⚕️",
        content: "Thank you for that information. Let me help you with that right away.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
        isRead: false,
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-md flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-lg">{currentUser.avatar}</span>
                </div>
                {currentUser.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{currentUser.name}</h3>
                <p className="text-xs text-gray-600">
                  {currentUser.isOnline ? "Online" : `Last seen ${currentUser.lastSeen}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/video-call">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === "patient1" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === "patient1" ? "bg-blue-500 text-white" : "bg-white text-gray-800 shadow-md"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.senderId === "patient1" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isRecording ? "text-red-500" : ""}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button onClick={sendMessage} size="icon" className="h-8 w-8">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}
