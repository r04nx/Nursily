"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Plus, FileText, CheckCircle, AlertCircle, Upload, X } from "lucide-react"
import Link from "next/link"

const certifications = [
  {
    id: 1,
    name: "Registered Nurse (RN)",
    issuer: "State Board of Nursing",
    issueDate: "2016-05-15",
    expiryDate: "2026-05-15",
    status: "Active",
    certificateNumber: "RN-123456789",
    verified: true,
  },
  {
    id: 2,
    name: "CPR Certification",
    issuer: "American Heart Association",
    issueDate: "2023-08-20",
    expiryDate: "2025-08-20",
    status: "Active",
    certificateNumber: "CPR-987654321",
    verified: true,
  },
  {
    id: 3,
    name: "Diabetes Educator",
    issuer: "Certification Board for Diabetes Care",
    issueDate: "2020-03-10",
    expiryDate: "2025-03-10",
    status: "Active",
    certificateNumber: "DE-456789123",
    verified: true,
  },
  {
    id: 4,
    name: "Wound Care Specialist",
    issuer: "Wound Care Certification Institute",
    issueDate: "2022-11-05",
    expiryDate: "2024-11-05",
    status: "Expiring Soon",
    certificateNumber: "WCS-789123456",
    verified: false,
  },
]

export default function NurseCertificationsPage() {
  const [showAddCertification, setShowAddCertification] = useState(false)
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    certificateNumber: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-700"
      case "Expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Expiring Soon":
      case "Expired":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const handleAddCertification = () => {
    if (!newCertification.name || !newCertification.issuer) return
    alert("Certification added! It will be verified within 24-48 hours.")
    setNewCertification({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      certificateNumber: "",
    })
    setShowAddCertification(false)
  }

  const isExpiringWithin30Days = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    return expiry <= thirtyDaysFromNow
  }

  const expiringCertifications = certifications.filter((cert) => isExpiringWithin30Days(cert.expiryDate))

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
            <Award className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Certifications</h1>
          </div>
          <Button
            onClick={() => setShowAddCertification(true)}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Expiring Soon Alert */}
        {expiringCertifications.length > 0 && (
          <Card className="bg-yellow-50 border-yellow-200 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 text-sm mb-1">Certifications Expiring Soon</h3>
                  <p className="text-yellow-700 text-xs mb-2">
                    {expiringCertifications.length} certification{expiringCertifications.length !== 1 ? "s" : ""}{" "}
                    expiring within 30 days
                  </p>
                  <div className="space-y-1">
                    {expiringCertifications.map((cert) => (
                      <p key={cert.id} className="text-xs text-yellow-700">
                        • {cert.name} - expires {new Date(cert.expiryDate).toLocaleDateString()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications List */}
        <div className="space-y-4">
          {certifications.map((certification) => (
            <Card key={certification.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{certification.name}</h3>
                      {certification.verified && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{certification.issuer}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs ${getStatusColor(certification.status)}`}>
                        {getStatusIcon(certification.status)}
                        <span className="ml-1">{certification.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Certificate #:</span>
                    <span className="font-medium text-gray-800">{certification.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Issue Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(certification.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Expiry Date:</span>
                    <span
                      className={`font-medium ${
                        isExpiringWithin30Days(certification.expiryDate) ? "text-yellow-700" : "text-gray-800"
                      }`}
                    >
                      {new Date(certification.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                  {certification.status === "Expiring Soon" && (
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                      Renew
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Certification Modal */}
        {showAddCertification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Add Certification</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddCertification(false)}
                    className="h-6 w-6"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Certification Name</label>
                  <Input
                    value={newCertification.name}
                    onChange={(e) => setNewCertification((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Advanced Cardiac Life Support"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
                  <Input
                    value={newCertification.issuer}
                    onChange={(e) => setNewCertification((prev) => ({ ...prev, issuer: e.target.value }))}
                    placeholder="e.g., American Heart Association"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Issue Date</label>
                    <Input
                      type="date"
                      value={newCertification.issueDate}
                      onChange={(e) => setNewCertification((prev) => ({ ...prev, issueDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                    <Input
                      type="date"
                      value={newCertification.expiryDate}
                      onChange={(e) => setNewCertification((prev) => ({ ...prev, expiryDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Certificate Number</label>
                  <Input
                    value={newCertification.certificateNumber}
                    onChange={(e) => setNewCertification((prev) => ({ ...prev, certificateNumber: e.target.value }))}
                    placeholder="Certificate/License number"
                    className="mt-1"
                  />
                </div>

                {/* Upload Certificate */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Certificate</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload certificate image or PDF</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    All certifications are verified by our team within 24-48 hours
                  </p>
                </div>

                <Button
                  onClick={handleAddCertification}
                  disabled={!newCertification.name || !newCertification.issuer}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                >
                  Add Certification
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Summary Stats */}
        <Card className="bg-gradient-to-r from-blue-100 to-teal-100 border-0 shadow-lg mt-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-800">{certifications.length}</div>
                <p className="text-xs text-gray-600">Total Certifications</p>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {certifications.filter((c) => c.status === "Active").length}
                </div>
                <p className="text-xs text-gray-600">Active</p>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">{expiringCertifications.length}</div>
                <p className="text-xs text-gray-600">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
