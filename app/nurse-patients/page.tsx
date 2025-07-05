"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Heart,
  MapPin,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 72,
    avatar: "👵",
    conditions: ["Diabetes", "Hypertension"],
    lastContact: "2 hours ago",
    nextAppointment: "Today 3:00 PM",
    status: "Active",
    urgency: "Medium",
    distance: "0.8 miles",
    medications: ["Metformin", "Lisinopril"],
    notes: "Prefers morning appointments",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield",
  },
  {
    id: 2,
    name: "Robert Smith",
    age: 68,
    avatar: "👴",
    conditions: ["Heart Disease", "Arthritis"],
    lastContact: "1 day ago",
    nextAppointment: "Tomorrow 10:00 AM",
    status: "Scheduled",
    urgency: "High",
    distance: "1.2 miles",
    medications: ["Atorvastatin", "Aspirin"],
    notes: "Has mobility issues",
    phone: "+1 (555) 987-6543",
    address: "456 Pine Avenue, Springfield",
  },
  {
    id: 3,
    name: "Mary Wilson",
    age: 75,
    avatar: "👵",
    conditions: ["Osteoporosis", "Memory Issues"],
    lastContact: "3 hours ago",
    nextAppointment: "Friday 2:00 PM",
    status: "Active",
    urgency: "Low",
    distance: "2.1 miles",
    medications: ["Calcium", "Vitamin D"],
    notes: "Family member usually present",
    phone: "+1 (555) 456-7890",
    address: "789 Elm Street, Springfield",
  },
  {
    id: 4,
    name: "James Brown",
    age: 70,
    avatar: "👴",
    conditions: ["COPD", "Depression"],
    lastContact: "5 hours ago",
    nextAppointment: "Next Monday 11:00 AM",
    status: "Active",
    urgency: "Medium",
    distance: "1.8 miles",
    medications: ["Albuterol", "Sertraline"],
    notes: "Needs emotional support",
    phone: "+1 (555) 321-0987",
    address: "321 Maple Drive, Springfield",
  },
]

export default function NursePatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filter === "All" || patient.status === filter

    return matchesSearch && matchesFilter
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
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">My Patients</h1>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patients..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {["All", "Active", "Scheduled", "Completed"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={`whitespace-nowrap ${
                    filter === status ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" : ""
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{patient.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <Badge className={`text-xs ${getUrgencyColor(patient.urgency)}`}>{patient.urgency}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Age {patient.age}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{patient.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{patient.lastContact}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPatient(patient.id)}
                    className="text-blue-600"
                  >
                    View Details
                  </Button>
                </div>

                {/* Conditions */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-1">Conditions:</p>
                  <div className="flex gap-1 flex-wrap">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Next Appointment */}
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Next: {patient.nextAppointment}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Patient Details Modal */}
        {selectedPatient && selectedPatientData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white max-h-[90vh] overflow-y-auto">
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
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="font-semibold">{selectedPatientData.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-semibold">{selectedPatientData.distance}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm font-medium">{selectedPatientData.phone}</p>
                  <p className="text-sm text-gray-600">{selectedPatientData.address}</p>
                </div>

                {/* Medical Conditions */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Medical Conditions</p>
                  <div className="flex gap-1 flex-wrap">
                    {selectedPatientData.conditions.map((condition, index) => (
                      <Badge key={index} className="bg-red-100 text-red-700 text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Current Medications */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Current Medications</p>
                  <div className="space-y-1">
                    {selectedPatientData.medications.map((med, index) => (
                      <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedPatientData.notes}</p>
                  </div>
                </div>

                {/* Urgency Alert */}
                {selectedPatientData.urgency === "High" && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">High Priority Patient</span>
                    </div>
                    <p className="text-xs text-red-700 mt-1">Requires immediate attention and frequent monitoring</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredPatients.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
