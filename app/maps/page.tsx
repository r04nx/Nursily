"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Navigation, Search, Star } from "lucide-react"
import Link from "next/link"

interface NearbyNurse {
  id: string
  name: string
  avatar: string
  specialty: string
  rating: number
  distance: string
  availability: "available" | "busy" | "offline"
  location: {
    lat: number
    lng: number
    address: string
  }
}

export default function MapsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [nearbyNurses] = useState<NearbyNurse[]>([
    {
      id: "1",
      name: "Emma Thompson",
      avatar: "👩‍⚕️",
      specialty: "General Practice",
      rating: 4.9,
      distance: "0.5 mi",
      availability: "available",
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: "123 Health St, New York, NY",
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "👩‍⚕️",
      specialty: "Pediatric Care",
      rating: 4.8,
      distance: "1.2 mi",
      availability: "busy",
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: "456 Care Ave, New York, NY",
      },
    },
  ])

  const requestLocationPermission = async () => {
    if ("geolocation" in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: "geolocation" })
        setLocationPermission(permission.state)

        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            },
            (error) => {
              console.error("Error getting location:", error)
              setLocationPermission("denied")
            },
          )
        } else {
          // Request permission
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
              setLocationPermission("granted")
            },
            (error) => {
              console.error("Error getting location:", error)
              setLocationPermission("denied")
            },
          )
        }
      } catch (error) {
        console.error("Error requesting location permission:", error)
        setLocationPermission("denied")
      }
    }
  }

  useEffect(() => {
    // Check if location permission was previously granted
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((permission) => {
        setLocationPermission(permission.state)
        if (permission.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          })
        }
      })
    }
  }, [])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Find Nurses</h1>
            <p className="text-gray-600">Locate nearby healthcare providers</p>
          </div>
        </div>

        {/* Location Permission Request */}
        {locationPermission === "prompt" && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800">Enable Location</h3>
                  <p className="text-sm text-blue-600">Allow location access to find nurses near you</p>
                </div>
                <Button onClick={requestLocationPermission} className="bg-blue-600 hover:bg-blue-700">
                  Allow
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {locationPermission === "denied" && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-red-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">Location Access Denied</h3>
                  <p className="text-sm text-red-600">
                    Please enable location in your browser settings to find nearby nurses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by location or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Map Placeholder */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-6">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">
                  {userLocation ? "Showing your location" : "Location access needed"}
                </p>
              </div>

              {/* Mock map pins */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-8 right-8 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              {userLocation && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white">
                  <div className="w-full h-full bg-blue-600 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Location Button */}
        {locationPermission === "granted" && (
          <Button
            variant="outline"
            className="w-full mb-6 bg-white/80 backdrop-blur-sm"
            onClick={() => {
              // Center map on user location
              console.log("Centering on user location")
            }}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Center on My Location
          </Button>
        )}

        {/* Nearby Nurses List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Nearby Nurses</h2>
          {nearbyNurses.map((nurse) => (
            <Card key={nurse.id} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{nurse.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{nurse.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(nurse.availability)}`}
                      >
                        {nurse.availability}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{nurse.specialty}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{nurse.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{nurse.distance}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{nurse.location.address}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    View Profile
                  </Button>
                  <Link href="/book-appointment" className="flex-1">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                      size="sm"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
