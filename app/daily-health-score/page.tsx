"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, Heart, Activity, Droplets, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const healthMetrics = [
  {
    id: 1,
    name: "Blood Pressure",
    value: 85,
    status: "Good",
    trend: "up",
    icon: Heart,
    color: "text-green-600",
    bgColor: "bg-green-100",
    reading: "120/80 mmHg",
  },
  {
    id: 2,
    name: "Heart Rate",
    value: 78,
    status: "Normal",
    trend: "stable",
    icon: Activity,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    reading: "72 bpm",
  },
  {
    id: 3,
    name: "Blood Sugar",
    value: 92,
    status: "Excellent",
    trend: "up",
    icon: Droplets,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    reading: "95 mg/dL",
  },
  {
    id: 4,
    name: "Sleep Quality",
    value: 68,
    status: "Fair",
    trend: "down",
    icon: Moon,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    reading: "6.5 hours",
  },
]

const weeklyScores = [
  { day: "Mon", score: 82 },
  { day: "Tue", score: 85 },
  { day: "Wed", score: 78 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 91 },
  { day: "Sat", score: 86 },
  { day: "Sun", score: 89 },
]

const recommendations = [
  {
    id: 1,
    title: "Improve Sleep Schedule",
    description: "Try to get 7-8 hours of sleep for better recovery",
    priority: "Medium",
    icon: "😴",
  },
  {
    id: 2,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily",
    priority: "Low",
    icon: "💧",
  },
  {
    id: 3,
    title: "Take Evening Medication",
    description: "Don't forget your Lisinopril at 8 PM",
    priority: "High",
    icon: "💊",
  },
]

export default function DailyHealthScorePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Today")
  const overallScore = 86

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 75) return "bg-blue-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Score</h1>
            <p className="text-sm text-gray-600">Your daily wellness overview</p>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div
              className={`w-24 h-24 ${getScoreBg(overallScore)} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Great Job!</h3>
            <p className="text-sm text-gray-600 mb-4">Your health score is above average</p>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+3 from yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {["Today", "Week", "Month"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? "bg-blue-600 text-white" : ""}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Weekly Trend Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyScores.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-200 rounded-t-sm mb-2 transition-all duration-300"
                    style={{ height: `${(item.score / 100) * 100}%` }}
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${(item.score / 100) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{item.day}</span>
                  <span className="text-xs font-medium text-gray-800">{item.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Health Metrics</h2>
          <div className="space-y-3">
            {healthMetrics.map((metric) => {
              const IconComponent = metric.icon
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${metric.bgColor} rounded-full flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${metric.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{metric.name}</h3>
                          <p className="text-sm text-gray-600">{metric.reading}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <Badge variant="secondary" className="text-xs">
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Score</span>
                        <span className="font-medium">{metric.value}/100</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">{rec.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">{rec.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
