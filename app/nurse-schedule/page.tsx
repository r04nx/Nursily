"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Phone,
  Video,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const appointments = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientAvatar: "👵",
    time: "09:00 AM",
    duration: "1 hour",
    type: "Home Visit",
    address: "123 Oak Street",
    status: "Confirmed",
    notes: "Regular checkup and medication review",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    patientName: "Robert Smith",
    patientAvatar: "👴",
    time: "11:30 AM",
    duration: "45 min",
    type: "Video Call",
    address: "Remote",
    status: "Confirmed",
    notes: "Follow-up on heart medication",
    phone: "+1 (555) 987-6543",
  },
  {
    id: 3,
    patientName: "Mary Wilson",
    patientAvatar: "👵",
    time: "02:00 PM",
    duration: "1.5 hours",
    type: "Home Visit",
    address: "789 Elm Street",
    status: "Pending",
    notes: "Physical therapy session",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 4,
    patientName: "James Brown",
    patientAvatar: "👴",
    time: "04:30 PM",
    duration: "30 min",
    type: "Phone Call",
    address: "Remote",
    status: "Confirmed",
    notes: "Mental health check-in",
    phone: "+1 (555) 321-0987",
  },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const currentDate = new Date()

export default function NurseSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [showAddAppointment, setShowAddAppointment] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return <Video className="w-4 h-4" />
      case "Phone Call":
        return <Phone className="w-4 h-4" />
      case "Home Visit":
        return <MapPin className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    }
    setSelectedDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/nurse-dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Schedule</h1>
          </div>
          <Button
            onClick={() => setShowAddAppointment(true)}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Date Navigation */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <h2 className="font-semibold text-gray-800">{formatDate(selectedDate)}</h2>
                <p className="text-sm text-gray-600">
                  {appointments.length} appointment{appointments.length !== 1 ? "s" : ""} today
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("day")}
                className={viewMode === "day" ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" : ""}
              >
                Day View
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={viewMode === "week" ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" : ""}
              >
                Week View
              </Button>
            </div>
          </CardContent>
        </Card>

        {viewMode === "day" ? (
          /* Day View */
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-lg">{appointment.patientAvatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{appointment.patientName}</h3>
                        <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {appointment.time} ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(appointment.type)}
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">{appointment.address}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-sm text-gray-700">{appointment.notes}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white">
                      <User className="w-4 h-4 mr-2" />
                      Start Visit
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {appointments.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No appointments today</h3>
                  <p className="text-gray-600 mb-4">Your schedule is clear for today.</p>
                  <Button
                    onClick={() => setShowAddAppointment(true)}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Week View */
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Week Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs font-medium text-gray-600 mb-1">{day}</div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        index === currentDate.getDay() - 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {new Date(
                        selectedDate.getTime() + (index - selectedDate.getDay() + 1) * 24 * 60 * 60 * 1000,
                      ).getDate()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {index === 0 ? appointments.length : Math.floor(Math.random() * 4)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>Total appointments this week: {appointments.length + 8}</p>
                <p>Available slots: 12</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Appointment Modal */}
        {showAddAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Add Appointment</span>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddAppointment(false)} className="h-6 w-6">
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Patient</label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                    <option>Select a patient...</option>
                    <option>Sarah Johnson</option>
                    <option>Robert Smith</option>
                    <option>Mary Wilson</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input type="date" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Time</label>
                    <input type="time" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                    <option>Home Visit</option>
                    <option>Video Call</option>
                    <option>Phone Call</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    placeholder="Appointment notes..."
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg h-20 resize-none"
                  />
                </div>
                <Button
                  onClick={() => {
                    alert("Appointment scheduled!")
                    setShowAddAppointment(false)
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                >
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
