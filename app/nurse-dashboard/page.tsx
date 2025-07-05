"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Menu,
  X,
  User,
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  Clock,
  Phone,
  Video,
  FileText,
  DollarSign,
  Users,
  Activity,
  Bell,
} from "lucide-react"
import Link from "next/link"

const nurseSidebarItems = [
  { icon: Activity, label: "Dashboard", active: true, href: "/nurse-dashboard" },
  { icon: Users, label: "My Patients", href: "/nurse-patients" },
  { icon: Calendar, label: "Schedule", href: "/nurse-schedule" },
  { icon: MessageCircle, label: "Messages", href: "/nurse-messages" },
  { icon: MapPin, label: "Map View", href: "/nurse-map" },
  { icon: User, label: "Profile", href: "/nurse-profile" },
  { icon: FileText, label: "Certifications", href: "/nurse-certifications" },
  { icon: DollarSign, label: "Earnings", href: "/nurse-earnings" },
  { icon: Star, label: "Reviews", href: "/nurse-reviews" },
]

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 72,
    condition: "Diabetes, Hypertension",
    lastContact: "2 hours ago",
    status: "Active",
    urgency: "Medium",
    avatar: "👵",
  },
  {
    id: 2,
    name: "Robert Smith",
    age: 68,
    condition: "Heart Disease",
    lastContact: "1 day ago",
    status: "Scheduled",
    urgency: "High",
    avatar: "👴",
  },
  {
    id: 3,
    name: "Mary Wilson",
    age: 75,
    condition: "Arthritis",
    lastContact: "3 hours ago",
    status: "Active",
    urgency: "Low",
    avatar: "👵",
  },
]

export default function NurseDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Nurse Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-60`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Nursily Pro
              </h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="space-y-1">
            {nurseSidebarItems.map((item, index) => (
              <Link key={index} href={item.href || "#"}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start h-10 text-left text-sm ${
                    item.active
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-60">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm p-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden h-8 w-8">
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Welcome, Nurse Emma!</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
              <span className="text-sm">👩‍⚕️</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-0 shadow-md">
              <CardContent className="p-3 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">12</div>
                <p className="text-xs text-gray-600">Active Patients</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-0 shadow-md">
              <CardContent className="p-3 text-center">
                <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">5</div>
                <p className="text-xs text-gray-600">Today's Visits</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-md">
              <CardContent className="p-3 text-center">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">4.9</div>
                <p className="text-xs text-gray-600">Rating</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-md">
              <CardContent className="p-3 text-center">
                <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">$2,340</div>
                <p className="text-xs text-gray-600">This Month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Recent Patients
                <Link href="/nurse-patients">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{patient.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{patient.name}</h3>
                      <Badge
                        className={`text-xs ${
                          patient.urgency === "High"
                            ? "bg-red-100 text-red-700"
                            : patient.urgency === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {patient.urgency}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{patient.condition}</p>
                    <p className="text-xs text-gray-500">Last contact: {patient.lastContact}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">Morning Checkup - Sarah Johnson</h3>
                  <p className="text-xs text-gray-600">9:00 AM - 10:00 AM</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">Medication Review - Robert Smith</h3>
                  <p className="text-xs text-gray-600">2:00 PM - 3:00 PM</p>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">Scheduled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
