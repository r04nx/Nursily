"use client"

import { useState } from "react"
import { ArrowLeft, Bluetooth, Wifi, Plus, Check, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const availableDevices = [
  {
    id: 1,
    name: "Blood Pressure Monitor",
    model: "Omron HEM-7120",
    type: "bluetooth",
    battery: 85,
    connected: false,
    icon: "🩺",
  },
  {
    id: 2,
    name: "Smart Scale",
    model: "Withings Body+",
    type: "wifi",
    battery: 92,
    connected: true,
    icon: "⚖️",
  },
  {
    id: 3,
    name: "Glucose Monitor",
    model: "FreeStyle Libre",
    type: "bluetooth",
    battery: 67,
    connected: false,
    icon: "🩸",
  },
  {
    id: 4,
    name: "Pulse Oximeter",
    model: "Masimo MightySat",
    type: "bluetooth",
    battery: 78,
    connected: true,
    icon: "🫀",
  },
]

export default function ConnectDevicePage() {
  const [scanning, setScanning] = useState(false)
  const [devices, setDevices] = useState(availableDevices)

  const handleConnect = (deviceId: number) => {
    setDevices(devices.map((device) => (device.id === deviceId ? { ...device, connected: !device.connected } : device)))
  }

  const startScanning = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 3000)
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Connect Devices</h1>
            <p className="text-sm text-gray-600">Manage your health devices</p>
          </div>
        </div>

        {/* Scan Button */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add New Device</h3>
              <p className="text-sm text-gray-600 mb-4">Scan for nearby health monitoring devices</p>
            </div>
            <Button onClick={startScanning} disabled={scanning} className="w-full bg-blue-600 hover:bg-blue-700">
              {scanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Bluetooth className="h-4 w-4 mr-2" />
                  Scan for Devices
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Devices</h2>
          <div className="space-y-3">
            {devices.map((device) => (
              <Card key={device.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{device.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{device.name}</h3>
                        <p className="text-sm text-gray-600">{device.model}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {device.type === "bluetooth" ? (
                            <Bluetooth className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Wifi className="h-3 w-3 text-green-500" />
                          )}
                          <span className="text-xs text-gray-500 capitalize">{device.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={device.connected ? "default" : "secondary"}
                        className={device.connected ? "bg-green-100 text-green-800" : ""}
                      >
                        {device.connected ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Connected
                          </>
                        ) : (
                          "Disconnected"
                        )}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Battery className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{device.battery}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Battery Level</span>
                      <span className="text-xs text-gray-600">{device.battery}%</span>
                    </div>
                    <Progress value={device.battery} className="h-1" />
                  </div>
                  <Button
                    variant={device.connected ? "outline" : "default"}
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleConnect(device.id)}
                  >
                    {device.connected ? "Disconnect" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">💡 Connection Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Make sure your device is in pairing mode</li>
              <li>• Keep devices close during setup</li>
              <li>• Check device battery levels regularly</li>
              <li>• Sync data daily for best results</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
