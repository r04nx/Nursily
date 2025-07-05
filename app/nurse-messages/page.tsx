"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Search, Send, Phone, Video, Paperclip, Smile } from "lucide-react"
import Link from "next/link"

const conversations = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientAvatar: "👵",
    lastMessage: "Thank you for the medication reminder!",
    timestamp: "2 min ago",
    unread: 0,
    online: true,
  },
  {
    id: 2,
    patientName: "Robert Smith",
    patientAvatar: "👴",
    lastMessage: "When should I take my evening medication?",
    timestamp: "15 min ago",
    unread: 2,
    online: false,
  },
  {
    id: 3,
    patientName: "Mary Wilson",
    patientAvatar: "👵",
    lastMessage: "I'm feeling much better today",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    patientName: "James Brown",
    patientAvatar: "👴",
    lastMessage: "Could we schedule a video call?",
    timestamp: "3 hours ago",
    unread: 1,
    online: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "patient",
    content: "Hi Nurse Emma, I have a question about my medication",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "nurse",
    content: "Hello Sarah! I'm here to help. What's your question?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "patient",
    content: "Should I take my Metformin with food? I sometimes forget to eat breakfast",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    sender: "nurse",
    content:
      "Yes, it's best to take Metformin with food to reduce stomach upset. If you skip breakfast, try taking it with a small snack or wait until lunch.",
    timestamp: "10:35 AM",
  },
  {
    id: 5,
    sender: "patient",
    content: "Thank you for the medication reminder!",
    timestamp: "10:36 AM",
  },
]

export default function NurseMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedPatient = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Add message logic here
    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {!selectedConversation ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Link href="/nurse-dashboard">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-800">Messages</h1>
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
                    placeholder="Search conversations..."
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Conversations List */}
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-lg">{conversation.patientAvatar}</span>
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">{conversation.patientName}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Chat View */
          <div className="flex flex-col h-[calc(100vh-2rem)]">
            {/* Chat Header */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)} className="h-8 w-8">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-lg">{selectedPatient?.patientAvatar}</span>
                    </div>
                    {selectedPatient?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{selectedPatient?.patientName}</h3>
                    <p className="text-xs text-gray-500">{selectedPatient?.online ? "Online" : "Last seen 1h ago"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "nurse" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "nurse"
                            ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.sender === "nurse" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="pr-10"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 h-8 w-8"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
