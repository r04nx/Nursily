"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, Upload, X, Clock, AlertTriangle, Check } from "lucide-react"
import Link from "next/link"

interface MedicationPhoto {
  id: string
  name: string
  dosage: string
  frequency: string
  image: string
  timestamp: string
  verified: boolean
}

export default function MedicationPhotosPage() {
  const [medications, setMedications] = useState<MedicationPhoto[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      image: "/placeholder.svg?height=200&width=200",
      timestamp: "2024-01-15 08:00 AM",
      verified: true,
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      image: "/placeholder.svg?height=200&width=200",
      timestamp: "2024-01-15 12:00 PM",
      verified: false,
    },
  ])

  const [isCapturing, setIsCapturing] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0)

      const imageData = canvas.toDataURL("image/jpeg")
      addMedication(imageData)
      stopCamera()
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCapturing(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        addMedication(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const addMedication = (imageData: string) => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency) {
      alert("Please fill in all medication details")
      return
    }

    const medication: MedicationPhoto = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency,
      image: imageData,
      timestamp: new Date().toLocaleString(),
      verified: false,
    }

    setMedications((prev) => [medication, ...prev])
    setNewMedication({ name: "", dosage: "", frequency: "" })
  }

  const deleteMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id))
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
            <Camera className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Medication Photos</h1>
          </div>
        </div>

        {/* Add New Medication */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Add New Medication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <Input
                  value={newMedication.name}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Medication name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Dosage</label>
                <Input
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 10mg"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Frequency</label>
              <Input
                value={newMedication.frequency}
                onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                placeholder="e.g., Once daily"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={startCamera} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </CardContent>
        </Card>

        {/* Camera View */}
        {isCapturing && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                <div className="flex gap-2 mt-4">
                  <Button onClick={capturePhoto} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                    Capture
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* Medication List */}
        <div className="space-y-4">
          {medications.map((medication) => (
            <Card key={medication.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={medication.image || "/placeholder.svg"}
                    alt={medication.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{medication.name}</h3>
                      {medication.verified ? (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {medication.dosage} • {medication.frequency}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{medication.timestamp}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMedication(medication.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {medications.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No medications yet</h3>
              <p className="text-gray-600 mb-4">
                Take photos of your medications to help nurses verify your prescriptions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
