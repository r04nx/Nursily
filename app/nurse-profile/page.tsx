"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  User,
  Camera,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Edit,
  Save,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function NurseProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    phone: "+1 (555) 123-4567",
    address: "456 Healthcare Ave, Springfield, IL 62701",
    licenseNumber: "RN-123456789",
    yearsExperience: "8",
    hourlyRate: "45",
    serviceRadius: "10",
    bio: "Compassionate registered nurse with 8 years of experience in geriatric care. Specialized in diabetes management and medication compliance. Dedicated to providing personalized, dignified care to seniors in their homes.",
    languages: "English, Spanish",
    specializations: ["Geriatric Care", "Diabetes Management", "Medication Management"],
    certifications: ["RN", "CPR Certified", "Diabetes Educator"],
  })

  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })

  const [notifications, setNotifications] = useState({
    newPatients: true,
    appointments: true,
    messages: true,
    emergencies: true,
  })

  const stats = {
    rating: 4.9,
    totalReviews: 127,
    totalPatients: 45,
    completedVisits: 234,
    responseTime: "< 2 min",
  }

  const handleSave = () => {
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <User className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          </div>
          <Button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            size="sm"
            className={isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>

        <div className="space-y-4">
          {/* Profile Header */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👩‍⚕️</span>
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{profileData.name}</h2>
              <p className="text-sm text-gray-600 mb-3">
                Registered Nurse • {profileData.yearsExperience} years experience
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-800">{stats.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{stats.totalReviews} reviews</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800 mb-1">{stats.totalPatients}</div>
                  <p className="text-xs text-gray-600">Patients</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800 mb-1">{stats.completedVisits}</div>
                  <p className="text-xs text-gray-600">Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-700 font-medium text-sm">Full Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium text-sm">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-700 font-medium text-sm">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-700 font-medium text-sm">Service Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 mt-1 h-16"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-green-500" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium text-sm">License Number</label>
                  <Input
                    value={profileData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium text-sm">Experience (years)</label>
                  <Input
                    value={profileData.yearsExperience}
                    onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium text-sm">Hourly Rate ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={profileData.hourlyRate}
                      onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-700 font-medium text-sm">Service Radius (miles)</label>
                  <Input
                    value={profileData.serviceRadius}
                    onChange={(e) => handleInputChange("serviceRadius", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-700 font-medium text-sm">Languages</label>
                <Input
                  value={profileData.languages}
                  onChange={(e) => handleInputChange("languages", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium text-sm">Professional Bio</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {profileData.specializations.map((spec, index) => (
                  <Badge key={index} className="bg-red-100 text-red-700">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {profileData.certifications.map((cert, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700">
                    <Award className="w-3 h-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(availability).map(([day, available]) => (
                <div key={day} className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium text-sm capitalize">{day}</label>
                  <Switch
                    checked={available}
                    onCheckedChange={(checked) => setAvailability((prev) => ({ ...prev, [day]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-500" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-gray-700 font-medium text-sm">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [key]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
