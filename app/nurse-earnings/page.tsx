"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, Eye, Clock } from "lucide-react"
import Link from "next/link"

const earningsData = {
  thisMonth: 2340,
  lastMonth: 2180,
  thisWeek: 580,
  today: 135,
  totalEarnings: 18750,
  pendingPayments: 450,
}

const recentTransactions = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    service: "Home Visit - Medication Review",
    date: "2024-03-15",
    duration: "1 hour",
    amount: 45,
    status: "Paid",
  },
  {
    id: 2,
    patientName: "Robert Smith",
    service: "Video Consultation",
    date: "2024-03-15",
    duration: "30 min",
    amount: 25,
    status: "Paid",
  },
  {
    id: 3,
    patientName: "Mary Wilson",
    service: "Physical Therapy Session",
    date: "2024-03-14",
    duration: "1.5 hours",
    amount: 65,
    status: "Pending",
  },
  {
    id: 4,
    patientName: "James Brown",
    service: "Phone Consultation",
    date: "2024-03-14",
    duration: "20 min",
    amount: 20,
    status: "Paid",
  },
  {
    id: 5,
    patientName: "Linda Davis",
    service: "Home Visit - Wound Care",
    date: "2024-03-13",
    duration: "45 min",
    amount: 40,
    status: "Paid",
  },
]

const monthlyEarnings = [
  { month: "Jan", amount: 2100 },
  { month: "Feb", amount: 2180 },
  { month: "Mar", amount: 2340 },
]

export default function NurseEarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Processing":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const calculateGrowth = () => {
    const growth = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100
    return growth.toFixed(1)
  }

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
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Earnings</h1>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Earnings Overview */}
        <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">${earningsData.thisMonth.toLocaleString()}</h2>
              <p className="text-sm text-gray-600">This Month</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+{calculateGrowth()}% from last month</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">${earningsData.thisWeek}</div>
                <p className="text-xs text-gray-600">This Week</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">${earningsData.today}</div>
                <p className="text-xs text-gray-600">Today</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">${earningsData.pendingPayments}</div>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">${earningsData.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Total Earnings</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">$47</div>
              <p className="text-xs text-gray-600">Avg. Per Hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Chart Placeholder */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Earnings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end justify-between gap-4">
              {monthlyEarnings.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-teal-500 rounded-t"
                    style={{ height: `${(data.amount / 2500) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                  <p className="text-xs font-semibold text-gray-800">${data.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Transactions
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{transaction.patientName}</h3>
                    <p className="text-xs text-gray-600 mb-1">{transaction.service}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{transaction.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">${transaction.amount}</div>
                    <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>{transaction.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card className="bg-blue-50 border-blue-200 shadow-lg mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Payment Information</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• Payments are processed weekly on Fridays</p>
              <p>• Direct deposit typically takes 1-2 business days</p>
              <p>• Tax documents are available in January</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent border-blue-300 text-blue-700">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
