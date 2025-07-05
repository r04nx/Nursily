"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  User,
  Edit3,
  Save,
  X,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Heart,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface UserProfile {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalConditions: string[]
  allergies: string[]
  medications: string[]
  profileImage: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1945-03-15",
    address: "123 Oak Street, Springfield, IL 62701",
    emergencyContact: "John Johnson (Son)",
    emergencyPhone: "+1 (555) 987-6543",
    medicalConditions: ["Hypertension", "Type 2 Diabetes", "Arthritis"],
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg", "Ibuprofen 200mg"],
    profileImage: "/placeholder.svg?height=100&width=100",
  })

  const [editedProfile, setEditedProfile] = useState(profile)
  const [notifications, setNotifications] = useState({
    medication: true,
    appointments: true,
    healthAlerts: true,
    marketing: false,
  })

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const addItem = (field: keyof Pick<UserProfile, "medicalConditions" | "allergies" | "medications">, item: string) => {
    if (item.trim()) {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: [...prev[field], item.trim()],
      }))
    }
  }

  const removeItem = (
    field: keyof Pick<UserProfile, "medicalConditions" | "allergies" | "medications">,
    index: number,
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-800">Profile</h1>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Save className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={profile.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{profile.name}</h2>
            <p className="text-gray-600">Patient since March 2024</p>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date of Birth</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editedProfile.dateOfBirth}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile((prev) => ({ ...prev, address: e.target.value }))}
                    rows={2}
                  />
                ) : (
                  <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Person</label>
              {isEditing ? (
                <Input
                  value={editedProfile.emergencyContact}
                  onChange={(e) => setEditedProfile((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{profile.emergencyContact}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
              {isEditing ? (
                <Input
                  value={editedProfile.emergencyPhone}
                  onChange={(e) => setEditedProfile((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{profile.emergencyPhone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Medical Conditions</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(isEditing ? editedProfile : profile).medicalConditions.map((condition, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-300">
                    {condition}
                    {isEditing && (
                      <button
                        onClick={() => removeItem("medicalConditions", index)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Input
                  placeholder="Add medical condition"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addItem("medicalConditions", e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Allergies</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(isEditing ? editedProfile : profile).allergies.map((allergy, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                    {allergy}
                    {isEditing && (
                      <button
                        onClick={() => removeItem("allergies", index)}
                        className="ml-1 text-yellow-500 hover:text-yellow-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Input
                  placeholder="Add allergy"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addItem("allergies", e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current Medications</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(isEditing ? editedProfile : profile).medications.map((medication, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    {medication}
                    {isEditing && (
                      <button
                        onClick={() => removeItem("medications", index)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Input
                  placeholder="Add medication"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addItem("medications", e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Medication Reminders</p>
                <p className="text-sm text-gray-600">Get notified when it's time to take medication</p>
              </div>
              <Switch
                checked={notifications.medication}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, medication: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Appointment Reminders</p>
                <p className="text-sm text-gray-600">Reminders for upcoming nurse visits</p>
              </div>
              <Switch
                checked={notifications.appointments}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, appointments: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Health Alerts</p>
                <p className="text-sm text-gray-600">Important health-related notifications</p>
              </div>
              <Switch
                checked={notifications.healthAlerts}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, healthAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Marketing Updates</p>
                <p className="text-sm text-gray-600">News and updates about Nursily</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 space-y-3">
            <Link href="/permissions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                App Permissions
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
