"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Video,
  Star,
  MapPin,
  Clock,
  Send,
  Search,
  Filter,
  Heart,
  X,
} from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

const availableNurses = [
  {
    id: 1,
    name: "Emma Thompson",
    specialization: "Geriatric Care",
    rating: 4.9,
    reviews: 127,
    distance: "0.8 miles",
    availability: "Available now",
    hourlyRate: "$45/hr",
    avatar: "👩‍⚕️",
    verified: true,
    languages: ["English", "Spanish"],
    experience: 8,
    location: "Downtown",
  },
  {
    id: 2,
    name: "Michael Chen",
    specialization: "Diabetes Care",
    rating: 4.8,
    reviews: 89,
    distance: "1.2 miles",
    availability: "Available in 2 hours",
    hourlyRate: "$42/hr",
    avatar: "👨‍⚕️",
    verified: true,
    languages: ["English", "Mandarin"],
    experience: 5,
    location: "Midtown",
  },
  {
    id: 3,
    name: "Sarah Williams",
    specialization: "Heart Care",
    rating: 4.9,
    reviews: 156,
    distance: "2.1 miles",
    availability: "Available tomorrow",
    hourlyRate: "$48/hr",
    avatar: "👩‍⚕️",
    verified: true,
    languages: ["English"],
    experience: 12,
    location: "Uptown",
  },
  {
    id: 4,
    name: "David Rodriguez",
    specialization: "Physical Therapy",
    rating: 4.7,
    reviews: 73,
    distance: "1.8 miles",
    availability: "Available now",
    hourlyRate: "$40/hr",
    avatar: "👨‍⚕️",
    verified: true,
    languages: ["English", "Spanish"],
    experience: 6,
    location: "Downtown",
  },
  {
    id: 5,
    name: "Lisa Park",
    specialization: "Mental Health",
    rating: 4.9,
    reviews: 134,
    distance: "3.2 miles",
    availability: "Available in 4 hours",
    hourlyRate: "$50/hr",
    avatar: "👩‍⚕️",
    verified: true,
    languages: ["English", "Korean"],
    experience: 10,
    location: "Suburbs",
  },
]

export default function NurseConnectionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNurse, setSelectedNurse] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  // Filter states
  const [filters, setFilters] = useState({
    specialization: "All",
    availability: "All",
    rating: "All",
    priceRange: "All",
    location: "All",
  })

  const specializations = ["All", "Geriatric Care", "Diabetes Care", "Heart Care", "Physical Therapy", "Mental Health"]
  const availabilityOptions = ["All", "Available now", "Available today", "Available tomorrow"]
  const ratingOptions = ["All", "4.5+", "4.0+", "3.5+"]
  const priceRanges = ["All", "$30-40", "$40-50", "$50+"]
  const locations = ["All", "Downtown", "Midtown", "Uptown", "Suburbs"]

  const toggleFavorite = (nurseId: number) => {
    setFavorites((prev) => (prev.includes(nurseId) ? prev.filter((id) => id !== nurseId) : [...prev, nurseId]))
  }

  const handleConnect = (nurseId: number) => {
    setSelectedNurse(nurseId)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    alert("Message sent to nurse!")
    setMessage("")
    setSelectedNurse(null)
  }

  const filteredNurses = availableNurses.filter((nurse) => {
    const matchesSearch =
      nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialization = filters.specialization === "All" || nurse.specialization === filters.specialization

    const matchesAvailability =
      filters.availability === "All" ||
      (filters.availability === "Available now" && nurse.availability === "Available now") ||
      (filters.availability === "Available today" &&
        (nurse.availability.includes("Available now") || nurse.availability.includes("hours"))) ||
      (filters.availability === "Available tomorrow" && nurse.availability.includes("tomorrow"))

    const matchesRating =
      filters.rating === "All" ||
      (filters.rating === "4.5+" && nurse.rating >= 4.5) ||
      (filters.rating === "4.0+" && nurse.rating >= 4.0) ||
      (filters.rating === "3.5+" && nurse.rating >= 3.5)

    const hourlyRateNum = Number.parseInt(nurse.hourlyRate.replace(/[$/hr]/g, ""))
    const matchesPrice =
      filters.priceRange === "All" ||
      (filters.priceRange === "$30-40" && hourlyRateNum >= 30 && hourlyRateNum <= 40) ||
      (filters.priceRange === "$40-50" && hourlyRateNum >= 40 && hourlyRateNum <= 50) ||
      (filters.priceRange === "$50+" && hourlyRateNum >= 50)

    const matchesLocation = filters.location === "All" || nurse.location === filters.location

    return (
      matchesSearch && matchesSpecialization && matchesAvailability && matchesRating && matchesPrice && matchesLocation
    )
  })

  const clearFilters = () => {
    setFilters({
      specialization: "All",
      availability: "All",
      rating: "All",
      priceRange: "All",
      location: "All",
    })
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
            <MessageCircle className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Connect with Nurses</h1>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or specialization..."
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-purple-100" : ""}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {showFilters && (
              <div className="space-y-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 text-sm">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                    Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-600">Specialization</Label>
                    <select
                      value={filters.specialization}
                      onChange={(e) => setFilters((prev) => ({ ...prev, specialization: e.target.value }))}
                      className="w-full text-xs border rounded p-1"
                    >
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Availability</Label>
                    <select
                      value={filters.availability}
                      onChange={(e) => setFilters((prev) => ({ ...prev, availability: e.target.value }))}
                      className="w-full text-xs border rounded p-1"
                    >
                      {availabilityOptions.map((avail) => (
                        <option key={avail} value={avail}>
                          {avail}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Rating</Label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters((prev) => ({ ...prev, rating: e.target.value }))}
                      className="w-full text-xs border rounded p-1"
                    >
                      {ratingOptions.map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Price Range</Label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
                      className="w-full text-xs border rounded p-1"
                    >
                      {priceRanges.map((price) => (
                        <option key={price} value={price}>
                          {price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="text-sm text-gray-600 mb-4">
          {filteredNurses.length} nurse{filteredNurses.length !== 1 ? "s" : ""} found
        </div>

        {/* Available Nurses */}
        <div className="space-y-4">
          {filteredNurses.map((nurse) => (
            <Card key={nurse.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">{nurse.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{nurse.name}</h3>
                      {nurse.verified && <Badge className="bg-blue-100 text-blue-700 text-xs">✓ Verified</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{nurse.specialization}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>
                          {nurse.rating} ({nurse.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{nurse.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{nurse.hourlyRate}</p>
                    <p className="text-xs text-gray-500">{nurse.availability}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">{nurse.availability}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Languages:</span>
                  {nurse.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConnect(nurse.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(nurse.id)}
                    className={favorites.includes(nurse.id) ? "bg-red-50 text-red-600 border-red-300" : ""}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(nurse.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNurses.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No nurses found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters to find more nurses.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Message Modal */}
        {selectedNurse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
            <Card className="w-full max-w-md bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Send Message</span>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedNurse(null)} className="h-6 w-6">
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span>{availableNurses.find((n) => n.id === selectedNurse)?.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {availableNurses.find((n) => n.id === selectedNurse)?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {availableNurses.find((n) => n.id === selectedNurse)?.specialization}
                    </p>
                  </div>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
