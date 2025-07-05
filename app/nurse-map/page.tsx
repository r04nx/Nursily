"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Navigation, Filter, Clock, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "👵",
    address: "123 Oak Street",
    distance: "0.8 miles",
    urgency: "Medium",
    nextAppointment: "Today 3:00 PM",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    name: "Robert Smith",
    avatar: "👴",
    address: "456 Pine Avenue",
    distance: "1.2 miles",
    urgency: "High",
    nextAppointment: "Tomorrow 10:00 AM",
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 3,
    name: "Mary Wilson",
    avatar: "👵",
    address: "789 Elm Street",
    distance: "2.1 miles",
    urgency: "Low",
    nextAppointment: "Friday 2:00 PM",
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
]

export default function NurseMapPage() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")

  const filteredPatients = patients.filter((patient) => {
    if (filter === "All") return true
    return patient.urgency === filter
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-700 border-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "Low":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

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
            <MapPin className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Patient Map</h1>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Placeholder */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg relative overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-gray-500" />
                </div>
              </div>

              {/* Patient Markers */}
              {filteredPatients.map((patient, index) => (
                <div
                  key={patient.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedPatient === patient.id ? "z-20" : "z-10"
                  }`}
                  style={{
                    left: `${30 + index * 25}%`,
                    top: `${40 + index * 15}%`,
                  }}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      patient.urgency === "High"
                        ? "bg-red-500"
                        : patient.urgency === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    } ${selectedPatient === patient.id ? "scale-125" : "hover:scale-110"} transition-transform`}
                  >
                    <span className="text-white text-sm">{patient.avatar}</span>
                  </div>
                  {selectedPatient === patient.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded-lg shadow-lg min-w-32 text-center">
                      <p className="text-xs font-semibold text-gray-800">{patient.name}</p>
                      <p className="text-xs text-gray-600">{patient.distance}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Current Location */}
              <div className="absolute bottom-4 left-4 bg-blue-500 w-3 h-3 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute bottom-1 left-1 text-xs text-blue-600 font-semibold">You</div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Buttons */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 overflow-x-auto">
              {["All", "High", "Medium", "Low"].map((urgency) => (
                <Button
                  key={urgency}
                  variant={filter === urgency ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(urgency)}
                  className={`whitespace-nowrap ${
                    filter === urgency ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" : ""
                  }`}
                >
                  {urgency} {urgency !== "All" && "Priority"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer transition-all ${
                selectedPatient === patient.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{patient.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{patient.name}</h3>
                      <Badge className={`text-xs ${getUrgencyColor(patient.urgency)}`}>{patient.urgency}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-600">{patient.address}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        <span>{patient.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <Navigation className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Actions */}
        <Card className="bg-gradient-to-r from-blue-100 to-teal-100 border-0 shadow-lg mt-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Route Optimization</h3>
                <p className="text-sm text-gray-600">Plan your most efficient route</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <Navigation className="w-4 h-4 mr-2" />
                Optimize Route
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient Details Modal */}
        {selectedPatient && selectedPatientData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
            <Card className="w-full max-w-md bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">{selectedPatientData.avatar}</span>
                    {selectedPatientData.name}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPatient(null)} className="h-6 w-6">
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedPatientData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedPatientData.distance} away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedPatientData.nextAppointment}</span>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
