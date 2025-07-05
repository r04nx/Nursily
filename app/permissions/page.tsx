"use client"

import { ArrowLeft, Shield, MapPin, Bell, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PermissionsManager } from "@/components/permissions-manager"
import Link from "next/link"

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">App Permissions</h1>
            <p className="text-sm text-gray-600">Manage your privacy settings</p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Your Privacy Matters</h3>
            <p className="text-sm text-gray-600">
              Nursily needs certain permissions to provide you with the best healthcare experience. All data is kept
              secure and private.
            </p>
          </CardContent>
        </Card>

        {/* Permissions Manager */}
        <PermissionsManager />

        {/* Why We Need These */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Why These Permissions?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Location Services</h4>
                <p className="text-sm text-gray-600">
                  Find nearby nurses, emergency services, and provide accurate health data based on your location.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-600">
                  Receive medication reminders, appointment alerts, and important health notifications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Browser Instructions */}
        <Card className="mt-6 bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="h-5 w-5" />
              Browser Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">If permissions were denied, you can enable them manually:</p>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Chrome:</strong> Click the lock icon in the address bar → Site settings
              </div>
              <div>
                <strong>Safari:</strong> Safari menu → Settings for This Website
              </div>
              <div>
                <strong>Firefox:</strong> Click the shield icon → Permissions
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
