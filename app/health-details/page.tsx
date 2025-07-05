"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Heart, Stethoscope, Clock, X } from "lucide-react"

interface HealthCondition {
  id: string
  name: string
  severity: "mild" | "moderate" | "severe"
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
}

export default function HealthDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userType = searchParams.get("type") as "patient" | "nurse" | "senior"

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Health Information (Patient/Senior)
    medicalConditions: [] as HealthCondition[],
    medications: [] as Medication[],
    allergies: [] as string[],
    dailyNeeds: [] as string[],
    mobilityLevel: "",

    // Professional Information (Nurse)
    licenseNumber: "",
    specializations: [] as string[],
    experience: "",
    education: "",
    certifications: [] as string[],
    hourlyRate: "",
    serviceRadius: "",
    availability: [] as string[],
  })

  const totalSteps = userType === "nurse" ? 4 : 3

  const commonConditions = [
    "Hypertension",
    "Diabetes",
    "Heart Disease",
    "Arthritis",
    "COPD",
    "Osteoporosis",
    "Depression",
    "Anxiety",
    "High Cholesterol",
    "Kidney Disease",
  ]

  const commonAllergies = ["Penicillin", "Shellfish", "Nuts", "Latex", "Aspirin", "Sulfa drugs"]

  const dailyNeedsOptions = [
    "Medication reminders",
    "Mobility assistance",
    "Meal preparation",
    "Personal hygiene",
    "Transportation",
    "Companionship",
    "Exercise support",
  ]

  const nurseSpecializations = [
    "Geriatric Care",
    "Diabetes Care",
    "Heart Care",
    "Wound Care",
    "Mental Health",
    "Physical Therapy",
    "Medication Management",
    "Post-surgical Care",
  ]

  const availabilityOptions = [
    "Monday Morning",
    "Monday Afternoon",
    "Monday Evening",
    "Tuesday Morning",
    "Tuesday Afternoon",
    "Tuesday Evening",
    "Wednesday Morning",
    "Wednesday Afternoon",
    "Wednesday Evening",
    "Thursday Morning",
    "Thursday Afternoon",
    "Thursday Evening",
    "Friday Morning",
    "Friday Afternoon",
    "Friday Evening",
    "Saturday Morning",
    "Saturday Afternoon",
    "Saturday Evening",
    "Sunday Morning",
    "Sunday Afternoon",
    "Sunday Evening",
  ]

  const addCondition = (conditionName: string) => {
    const newCondition: HealthCondition = {
      id: Date.now().toString(),
      name: conditionName,
      severity: "mild",
    }
    setFormData((prev) => ({
      ...prev,
      medicalConditions: [...prev.medicalConditions, newCondition],
    }))
  }

  const removeCondition = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((c) => c.id !== id),
    }))
  }

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "",
    }
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, newMedication],
    }))
  }

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((med) => (med.id === id ? { ...med, [field]: value } : med)),
    }))
  }

  const removeMedication = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((m) => m.id !== id),
    }))
  }

  const toggleArrayItem = (array: string[], item: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: array.includes(item) ? array.filter((i) => i !== item) : [...array, item],
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Complete setup and redirect to appropriate dashboard
      const dashboardPath = userType === "nurse" ? "/nurse-dashboard" : "/dashboard"
      router.push(dashboardPath)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const renderPersonalInfo = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
          <Input
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Date of Birth</label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone number"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
          <Textarea
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="Your home address"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Emergency Contact</label>
            <Input
              value={formData.emergencyContact}
              onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
              placeholder="Contact name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Emergency Phone</label>
            <Input
              value={formData.emergencyPhone}
              onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
              placeholder="Phone number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderHealthInfo = () => (
    <div className="space-y-6">
      {/* Medical Conditions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Medical Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {commonConditions.map((condition) => (
              <Button
                key={condition}
                variant="outline"
                size="sm"
                onClick={() => addCondition(condition)}
                className={`text-xs ${
                  formData.medicalConditions.some((c) => c.name === condition)
                    ? "bg-red-100 text-red-700 border-red-300"
                    : ""
                }`}
              >
                {condition}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {formData.medicalConditions.map((condition) => (
              <div key={condition.id} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <span className="flex-1 text-sm">{condition.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeCondition(condition.id)}
                  className="h-6 w-6 p-0 text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.medications.map((medication) => (
            <div key={medication.id} className="grid grid-cols-3 gap-2 p-3 bg-blue-50 rounded">
              <Input
                placeholder="Medication name"
                value={medication.name}
                onChange={(e) => updateMedication(medication.id, "name", e.target.value)}
              />
              <Input
                placeholder="Dosage"
                value={medication.dosage}
                onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
              />
              <div className="flex gap-1">
                <Input
                  placeholder="Frequency"
                  value={medication.frequency}
                  onChange={(e) => updateMedication(medication.id, "frequency", e.target.value)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeMedication(medication.id)}
                  className="h-10 w-10 p-0 text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={addMedication} variant="outline" className="w-full bg-transparent">
            Add Medication
          </Button>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Allergies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {commonAllergies.map((allergy) => (
              <Button
                key={allergy}
                variant="outline"
                size="sm"
                onClick={() => toggleArrayItem(formData.allergies, allergy, "allergies")}
                className={`text-xs ${
                  formData.allergies.includes(allergy) ? "bg-yellow-100 text-yellow-700 border-yellow-300" : ""
                }`}
              >
                {allergy}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCareNeeds = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Daily Care Needs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {dailyNeedsOptions.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox
                id={need}
                checked={formData.dailyNeeds.includes(need)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    toggleArrayItem(formData.dailyNeeds, need, "dailyNeeds")
                  } else {
                    toggleArrayItem(formData.dailyNeeds, need, "dailyNeeds")
                  }
                }}
              />
              <label htmlFor={need} className="text-sm text-gray-700">
                {need}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Mobility Level</label>
          <select
            value={formData.mobilityLevel}
            onChange={(e) => setFormData((prev) => ({ ...prev, mobilityLevel: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select mobility level</option>
            <option value="independent">Fully Independent</option>
            <option value="assistance">Needs Some Assistance</option>
            <option value="limited">Limited Mobility</option>
            <option value="wheelchair">Wheelchair Bound</option>
          </select>
        </div>
      </CardContent>
    </Card>
  )

  const renderNurseProfessional = () => (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            Professional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">License Number</label>
            <Input
              value={formData.licenseNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
              placeholder="Your nursing license number"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Years of Experience</label>
              <Input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="Years"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Hourly Rate ($)</label>
              <Input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                placeholder="Rate per hour"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Education</label>
            <Input
              value={formData.education}
              onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
              placeholder="e.g., BSN from University of..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Service Radius (miles)</label>
            <Input
              type="number"
              value={formData.serviceRadius}
              onChange={(e) => setFormData((prev) => ({ ...prev, serviceRadius: e.target.value }))}
              placeholder="How far will you travel?"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {nurseSpecializations.map((spec) => (
              <Button
                key={spec}
                variant="outline"
                size="sm"
                onClick={() => toggleArrayItem(formData.specializations, spec, "specializations")}
                className={`text-xs ${
                  formData.specializations.includes(spec) ? "bg-blue-100 text-blue-700 border-blue-300" : ""
                }`}
              >
                {spec}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNurseAvailability = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600" />
          Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">Select your available time slots:</p>
        <div className="grid grid-cols-1 gap-2">
          {availabilityOptions.map((slot) => (
            <div key={slot} className="flex items-center space-x-2">
              <Checkbox
                id={slot}
                checked={formData.availability.includes(slot)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    toggleArrayItem(formData.availability, slot, "availability")
                  } else {
                    toggleArrayItem(formData.availability, slot, "availability")
                  }
                }}
              />
              <label htmlFor={slot} className="text-sm text-gray-700">
                {slot}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderStepContent = () => {
    if (userType === "nurse") {
      switch (step) {
        case 1:
          return renderPersonalInfo()
        case 2:
          return renderNurseProfessional()
        case 3:
          return renderNurseAvailability()
        default:
          return null
      }
    } else {
      switch (step) {
        case 1:
          return renderPersonalInfo()
        case 2:
          return renderHealthInfo()
        case 3:
          return renderCareNeeds()
        default:
          return null
      }
    }
  }

  const getStepTitle = () => {
    if (userType === "nurse") {
      switch (step) {
        case 1:
          return "Personal Information"
        case 2:
          return "Professional Details"
        case 3:
          return "Availability"
        default:
          return ""
      }
    } else {
      switch (step) {
        case 1:
          return "Personal Information"
        case 2:
          return "Health Information"
        case 3:
          return "Care Needs"
        default:
          return ""
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{getStepTitle()}</h1>
            <p className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= step
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {step === totalSteps ? "Complete Setup" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
