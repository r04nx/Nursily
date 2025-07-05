"use client"

import { useState, useEffect } from "react"
import { MapPin, Bell, AlertCircle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PermissionStatus {
  location: PermissionState | "unknown"
  notifications: PermissionState | "unknown"
}

export function PermissionsManager() {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    location: "unknown",
    notifications: "unknown",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    try {
      // Check location permission
      if ("geolocation" in navigator && "permissions" in navigator) {
        const locationPermission = await navigator.permissions.query({ name: "geolocation" })
        setPermissions((prev) => ({ ...prev, location: locationPermission.state }))
      }

      // Check notification permission
      if ("Notification" in window) {
        const notificationState = Notification.permission as PermissionState
        setPermissions((prev) => ({ ...prev, notifications: notificationState }))
      }
    } catch (error) {
      console.error("Error checking permissions:", error)
    }
  }

  const requestLocationPermission = async () => {
    setIsLoading(true)
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location granted:", position.coords)
            setPermissions((prev) => ({ ...prev, location: "granted" }))
            setIsLoading(false)
          },
          (error) => {
            console.error("Location denied:", error)
            setPermissions((prev) => ({ ...prev, location: "denied" }))
            setIsLoading(false)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          },
        )
      }
    } catch (error) {
      console.error("Error requesting location:", error)
      setIsLoading(false)
    }
  }

  const requestNotificationPermission = async () => {
    setIsLoading(true)
    try {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission()
        setPermissions((prev) => ({ ...prev, notifications: permission }))

        if (permission === "granted") {
          // Test notification
          new Notification("Nursily Notifications Enabled", {
            body: "You'll now receive important health reminders and updates.",
            icon: "/favicon.ico",
            badge: "/favicon.ico",
          })
        }
      }
    } catch (error) {
      console.error("Error requesting notifications:", error)
    }
    setIsLoading(false)
  }

  const getPermissionBadge = (status: PermissionState | "unknown") => {
    switch (status) {
      case "granted":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Granted</Badge>
      case "denied":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Denied</Badge>
      case "prompt":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Prompt</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPermissionIcon = (status: PermissionState | "unknown") => {
    switch (status) {
      case "granted":
        return <Check className="h-5 w-5 text-green-600" />
      case "denied":
        return <X className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Location Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getPermissionIcon(permissions.location)}
              <span className="text-sm font-medium">Current Status:</span>
            </div>
            {getPermissionBadge(permissions.location)}
          </div>

          <p className="text-sm text-gray-600">
            Location access helps us find nearby nurses and provide accurate emergency services.
          </p>

          {permissions.location !== "granted" && (
            <Button
              onClick={requestLocationPermission}
              disabled={isLoading || permissions.location === "denied"}
              className="w-full"
            >
              {isLoading ? "Requesting..." : "Enable Location Access"}
            </Button>
          )}

          {permissions.location === "denied" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Location access was denied. Please enable it in your browser settings to use location-based features.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getPermissionIcon(permissions.notifications)}
              <span className="text-sm font-medium">Current Status:</span>
            </div>
            {getPermissionBadge(permissions.notifications)}
          </div>

          <p className="text-sm text-gray-600">
            Receive important medication reminders, appointment notifications, and health alerts.
          </p>

          {permissions.notifications !== "granted" && (
            <Button
              onClick={requestNotificationPermission}
              disabled={isLoading || permissions.notifications === "denied"}
              className="w-full"
            >
              {isLoading ? "Requesting..." : "Enable Notifications"}
            </Button>
          )}

          {permissions.notifications === "denied" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Notifications were blocked. Please enable them in your browser settings to receive health reminders.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
