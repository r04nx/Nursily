"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Clock, MapPin, Video, Phone } from "lucide-react"
import Link from "next/link"

interface Nurse {
  id: string
  name: string
  avatar: string
  specialty: string
  rating: number
  experience: string
  availability: string[]
}

export default function BookAppointmentPage() {
  const [selectedNurse, setSelectedNurse] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<"video" | "phone" | "in-person">("video")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")

  const nurses: Nurse[] = [
    {
      id: "1",
      name: "Emma Thompson",
      avatar: "👩‍⚕️",
      specialty: "General Practice",
      rating: 4.9,
      experience: "8 years",
      availability: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "👩‍⚕️",
      specialty: "Pediatric Care",
      rating: 4.8,
      experience: "6 years",
      availability: ["10:00 AM", "11:30 AM", "1:00 PM", "4:00 PM"],
    },
  ]

  const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"]

  const handleBooking = () => {
    // Handle appointment booking logic
    console.log({
      nurse: selectedNurse,
      type: appointmentType,
      date: selectedDate,
      time: selectedTime,
      notes,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/appointments">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Book Appointment</h1>
            <p className="text-gray-600">Schedule your healthcare visit</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appointment Type */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Appointment Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "video" as const, icon: Video, label: "Video Call" },
                  { type: "phone" as const, icon: Phone, label: "Phone Call" },
                  { type: "in-person" as const, icon: MapPin, label: "In Person" },
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setAppointmentType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      appointmentType === type ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">{label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Select Nurse */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Select Nurse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nurses.map((nurse) => (
                  <button
                    key={nurse.id}
                    onClick={() => setSelectedNurse(nurse.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedNurse === nurse.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-lg">{nurse.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{nurse.name}</h3>
                        <p className="text-sm text-gray-600">{nurse.specialty}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>⭐ {nurse.rating}</span>
                          <span>{nurse.experience} experience</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Select Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTime === time ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm font-medium">{time}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your health concerns or questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Book Button */}
          <Button
            onClick={handleBooking}
            disabled={!selectedNurse || !selectedDate || !selectedTime}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 py-3"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}
