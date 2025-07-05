"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Star, MessageCircle, Phone, Video, Calendar } from "lucide-react"
import Link from "next/link"

interface ConnectionHistory {
  id: string
  nurseName: string
  nurseAvatar: string
  specialization: string
  connectionDate: string
  duration: string
  status: "completed" | "cancelled" | "ongoing"
  rating?: number
  notes?: string
  cost: string
}

export default function ConnectionHistoryPage() {
  const [connections] = useState<ConnectionHistory[]>([
    {
      id: "1",
      nurseName: "Emma Thompson",
      nurseAvatar: "👩‍⚕️",
      specialization: "Geriatric Care",
      connectionDate: "2024-01-15",
      duration: "2 hours",
      status: "completed",
      rating: 5,
      notes: "Excellent care, very professional and kind",
      cost: "$90.00",
    },
    {
      id: "2",
      nurseName: "Michael Chen",
      nurseAvatar: "👨‍⚕️",
      specialization: "Diabetes Care",
      connectionDate: "2024-01-10",
      duration: "1.5 hours",
      status: "completed",
      rating: 4,
      notes: "Good advice on medication management",
      cost: "$63.00",
    },
    {
      id: "3",
      nurseName: "Sarah Williams",
      nurseAvatar: "👩‍⚕️",
      specialization: "Heart Care",
      connectionDate: "2024-01-08",
      duration: "3 hours",
      status: "cancelled",
      notes: "Had to reschedule due to emergency",
      cost: "$0.00",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300"
      case "ongoing":
        return "bg-blue-100 text-blue-700 border-blue-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
    ))
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
            <Clock className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Connection History</h1>
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {connections.filter((c) => c.status === "completed").length}
                </p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {connections.filter((c) => c.rating).reduce((acc, c) => acc + (c.rating || 0), 0) /
                    connections.filter((c) => c.rating).length || 0}
                </p>
                <p className="text-xs text-gray-600">Avg Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  $
                  {connections
                    .filter((c) => c.status === "completed")
                    .reduce((acc, c) => acc + Number.parseFloat(c.cost.replace("$", "")), 0)
                    .toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection History */}
        <div className="space-y-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{connection.nurseAvatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{connection.nurseName}</h3>
                      <Badge className={getStatusColor(connection.status)}>{connection.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{connection.specialization}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{connection.connectionDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{connection.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{connection.cost}</p>
                    {connection.rating && (
                      <div className="flex items-center gap-1 mt-1">{renderStars(connection.rating)}</div>
                    )}
                  </div>
                </div>

                {connection.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">{connection.notes}</p>
                  </div>
                )}

                {connection.status === "completed" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message Again
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {connections.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No connections yet</h3>
              <p className="text-gray-600 mb-4">Start connecting with nurses to see your history here.</p>
              <Link href="/nurse-connection">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Find Nurses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
