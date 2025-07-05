"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Video, Phone } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  nurseName: string
  nurseAvatar: string
  date: string
  time: string
  type: "in-person" | "video" | "phone"
  status: "upcoming" | "completed" | "cancelled"
  location?: string
  notes?: string
  duration: string
}

export default function AppointmentsPage() {
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      nurseName: "Emma Thompson",
      nurseAvatar: "👩‍⚕️",
      date: "Today",
      time: "2:00 PM",
      type: "video",
      status: "upcoming",
      duration: "30 min",
      notes: "Follow-up consultation for medication review",
    },
    {
      id: "2",
      nurseName: "Sarah Johnson",
      nurseAvatar: "👩‍⚕️",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "in-person",
      status: "upcoming",
      location: "123 Health St, Medical Center",
      duration: "45 min",
      notes: "Initial health assessment",
    },
    {
      id: "3",
      nurseName: "Emma Thompson",
      nurseAvatar: "👩‍⚕️",
      date: "Dec 20",
      time: "3:15 PM",
      type: "phone",
      status: "completed",
      duration: "20 min",
      notes: "Medication consultation completed",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      case "in-person":
        return <MapPin className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
              <p className="text-gray-600">Manage your healthcare visits</p>
            </div>
          </div>
          <Link href="/book-appointment">
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
              <Plus className="w-4 h-4 mr-2" />
              Book
            </Button>
          </Link>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-lg">{appointment.nurseAvatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{appointment.nurseName}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getTypeIcon(appointment.type)}
                        <span className="capitalize">{appointment.type} Visit</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                  </div>

                  {appointment.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location}</span>
                    </div>
                  )}

                  {appointment.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{appointment.notes}</p>
                  )}

                  {appointment.status === "upcoming" && (
                    <div className="flex gap-2 pt-2">
                      {appointment.type === "video" && (
                        <Link href="/video-call" className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Reschedule
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-6">Book your first appointment with a nurse</p>
            <Link href="/book-appointment">
              <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
