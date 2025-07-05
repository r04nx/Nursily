"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Calendar,
  Heart,
  Thermometer,
  Activity,
  Smile,
  Frown,
  Meh,
  Edit3,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface JournalEntry {
  id: string
  date: string
  type: "symptoms" | "mood" | "vitals" | "general"
  title: string
  content: string
  mood?: "happy" | "neutral" | "sad"
  vitals?: {
    bloodPressure?: string
    heartRate?: string
    temperature?: string
    weight?: string
  }
  symptoms?: string[]
}

export default function HealthJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      type: "vitals",
      title: "Morning Vitals",
      content: "Feeling good today. Blood pressure is stable.",
      vitals: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
      },
    },
    {
      id: "2",
      date: "2024-01-14",
      type: "mood",
      title: "Daily Check-in",
      content: "Had a great day with family. Feeling energetic and positive.",
      mood: "happy",
    },
    {
      id: "3",
      date: "2024-01-13",
      type: "symptoms",
      title: "Mild Discomfort",
      content: "Experienced some joint stiffness in the morning. Better after medication.",
      symptoms: ["Joint stiffness", "Mild pain"],
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    type: "general",
    title: "",
    content: "",
    mood: undefined,
    vitals: {},
    symptoms: [],
  })

  const addEntry = () => {
    if (!newEntry.title || !newEntry.content) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      type: newEntry.type as JournalEntry["type"],
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      vitals: newEntry.vitals,
      symptoms: newEntry.symptoms,
    }

    setEntries((prev) => [entry, ...prev])
    setNewEntry({
      type: "general",
      title: "",
      content: "",
      mood: undefined,
      vitals: {},
      symptoms: [],
    })
    setShowAddForm(false)
  }

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vitals":
        return <Activity className="w-4 h-4 text-blue-500" />
      case "mood":
        return <Smile className="w-4 h-4 text-green-500" />
      case "symptoms":
        return <Heart className="w-4 h-4 text-red-500" />
      default:
        return <BookOpen className="w-4 h-4 text-purple-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vitals":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "mood":
        return "bg-green-100 text-green-700 border-green-300"
      case "symptoms":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-purple-100 text-purple-700 border-purple-300"
    }
  }

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case "happy":
        return <Smile className="w-4 h-4 text-green-500" />
      case "sad":
        return <Frown className="w-4 h-4 text-red-500" />
      case "neutral":
        return <Meh className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-800">Health Journal</h1>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg">New Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Entry Type</label>
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, type: e.target.value as JournalEntry["type"] }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="general">General</option>
                  <option value="vitals">Vitals</option>
                  <option value="mood">Mood</option>
                  <option value="symptoms">Symptoms</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                <Input
                  value={newEntry.title}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Entry title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Content</label>
                <Textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write about your health today..."
                  rows={3}
                />
              </div>

              {newEntry.type === "mood" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">How are you feeling?</label>
                  <div className="flex gap-3">
                    {[
                      { value: "happy", icon: Smile, color: "text-green-500" },
                      { value: "neutral", icon: Meh, color: "text-yellow-500" },
                      { value: "sad", icon: Frown, color: "text-red-500" },
                    ].map(({ value, icon: Icon, color }) => (
                      <Button
                        key={value}
                        variant="outline"
                        size="sm"
                        onClick={() => setNewEntry((prev) => ({ ...prev, mood: value as JournalEntry["mood"] }))}
                        className={`${newEntry.mood === value ? "bg-gray-100" : ""}`}
                      >
                        <Icon className={`w-4 h-4 ${color}`} />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {newEntry.type === "vitals" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Blood Pressure</label>
                    <Input
                      value={newEntry.vitals?.bloodPressure || ""}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          vitals: { ...prev.vitals, bloodPressure: e.target.value },
                        }))
                      }
                      placeholder="120/80"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Heart Rate</label>
                    <Input
                      value={newEntry.vitals?.heartRate || ""}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          vitals: { ...prev.vitals, heartRate: e.target.value },
                        }))
                      }
                      placeholder="72 bpm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Temperature</label>
                    <Input
                      value={newEntry.vitals?.temperature || ""}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          vitals: { ...prev.vitals, temperature: e.target.value },
                        }))
                      }
                      placeholder="98.6°F"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Weight</label>
                    <Input
                      value={newEntry.vitals?.weight || ""}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          vitals: { ...prev.vitals, weight: e.target.value },
                        }))
                      }
                      placeholder="150 lbs"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={addEntry} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  Add Entry
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(entry.type)}
                    <div>
                      <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <Badge className={`text-xs ${getTypeColor(entry.type)}`}>{entry.type}</Badge>
                        {entry.mood && getMoodIcon(entry.mood)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteEntry(entry.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3">{entry.content}</p>

                {entry.vitals && Object.keys(entry.vitals).length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Vitals</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {entry.vitals.bloodPressure && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>BP: {entry.vitals.bloodPressure}</span>
                        </div>
                      )}
                      {entry.vitals.heartRate && (
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-blue-500" />
                          <span>HR: {entry.vitals.heartRate}</span>
                        </div>
                      )}
                      {entry.vitals.temperature && (
                        <div className="flex items-center gap-1">
                          <Thermometer className="w-3 h-3 text-orange-500" />
                          <span>Temp: {entry.vitals.temperature}</span>
                        </div>
                      )}
                      {entry.vitals.weight && (
                        <div className="flex items-center gap-1">
                          <span>Weight: {entry.vitals.weight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {entry.symptoms && entry.symptoms.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-red-800 mb-2">Symptoms</h4>
                    <div className="flex flex-wrap gap-1">
                      {entry.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-red-100 text-red-700 border-red-300">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Your Health Journal</h3>
              <p className="text-gray-600 mb-4">
                Track your daily health, mood, and symptoms to better understand your wellbeing.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
