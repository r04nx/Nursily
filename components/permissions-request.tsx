"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bell, Mic, Camera, X, Check } from "lucide-react"

interface Permission {
  name: string
  icon: React.ReactNode
  title: string
  description: string
  required: boolean
  status: "granted" | "denied" | "prompt"
}

interface PermissionsRequestProps {
  onComplete: (permissions: Record<string, boolean>) => void
}

export default function PermissionsRequest({ onComplete }: PermissionsRequestProps) {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      name: "geolocation",
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Access",
      description: "Find nearby nurses and provide location-based services",
      required: true,
      status: "prompt",
    },
    {
      name: "notifications",
      icon: <Bell className="w-6 h-6" />,
      title: "Push Notifications",
      description: "Receive appointment reminders and health updates",
      required: true,
      status: "prompt",
    },
    {
      name: "microphone",
      icon: <Mic className="w-6 h-6" />,
      title: "Microphone Access",
      description: "Enable voice calls and voice messages with nurses",
      required: false,
      status: "prompt",
    },
    {
      name: "camera",
      icon: <Camera className="w-6 h-6" />,
      title: "Camera Access",
      description: "Take photos of medications and enable video calls",
      required: false,
      status: "prompt",
    },
  ])

  const requestPermission = async (permissionName: string) => {
    try {
      let granted = false

      switch (permissionName) {
        case "geolocation":
          if ("geolocation" in navigator) {
            try {
              await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
              })
              granted = true
            } catch (error) {
              granted = false
            }
          }
          break

        case "notifications":
          if ("Notification" in window) {
            const permission = await Notification.requestPermission()
            granted = permission === "granted"
          }
          break

        case "microphone":
          if ("mediaDevices" in navigator) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
              stream.getTracks().forEach((track) => track.stop())
              granted = true
            } catch (error) {
              granted = false
            }
          }
          break

        case "camera":
          if ("mediaDevices" in navigator) {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true })
              stream.getTracks().forEach((track) => track.stop())
              granted = true
            } catch (error) {
              granted = false
            }
          }
          break
      }

      setPermissions((prev) =>
        prev.map((p) => (p.name === permissionName ? { ...p, status: granted ? "granted" : "denied" } : p)),
      )
    } catch (error) {
      console.error(`Error requesting ${permissionName} permission:`, error)
      setPermissions((prev) => prev.map((p) => (p.name === permissionName ? { ...p, status: "denied" } : p)))
    }
  }

  const handleContinue = () => {
    const permissionResults = permissions.reduce(
      (acc, p) => {
        acc[p.name] = p.status === "granted"
        return acc
      },
      {} as Record<string, boolean>,
    )

    onComplete(permissionResults)
  }

  const allRequiredGranted = permissions.filter((p) => p.required).every((p) => p.status === "granted")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "granted":
        return <Check className="w-5 h-5 text-green-600" />
      case "denied":
        return <X className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted":
        return "border-green-500 bg-green-50"
      case "denied":
        return "border-red-500 bg-red-50"
      default:
        return "border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">App Permissions</CardTitle>
            <p className="text-gray-600">Nursily needs these permissions to provide the best healthcare experience</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {permissions.map((permission) => (
              <div
                key={permission.name}
                className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(permission.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-blue-600 mt-1">{permission.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {permission.title}
                        {permission.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      {getStatusIcon(permission.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{permission.description}</p>
                    {permission.status === "prompt" && (
                      <Button
                        onClick={() => requestPermission(permission.name)}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                        size="sm"
                      >
                        Allow {permission.title}
                      </Button>
                    )}
                    {permission.status === "denied" && permission.required && (
                      <Button
                        onClick={() => requestPermission(permission.name)}
                        variant="outline"
                        className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        Try Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <p className="text-xs text-gray-500 mb-4">* Required permissions are needed for core app functionality</p>
              <Button
                onClick={handleContinue}
                disabled={!allRequiredGranted}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 py-3"
              >
                Continue to App
              </Button>
              {!allRequiredGranted && (
                <p className="text-sm text-red-600 text-center mt-2">Please allow required permissions to continue</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
