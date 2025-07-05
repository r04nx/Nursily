"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Shield, Users, Award, Mail, Phone, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
            <Heart className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">About Nursily</h1>
          </div>
        </div>

        <div className="space-y-4">
          {/* App Info */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Nursily
              </h2>
              <p className="text-gray-600 mb-4">Connecting Hearts, Caring Hands</p>
              <div className="text-sm text-gray-500">
                <p>Version 1.0.0</p>
                <p>© 2024 Nursily Inc.</p>
              </div>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Nursily bridges the gap between senior citizens and qualified healthcare professionals, providing
                compassionate, personalized care in the comfort of home. We believe everyone deserves access to quality
                healthcare with dignity and respect.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Verified Professionals</h3>
                  <p className="text-xs text-gray-600">All nurses are background-checked and licensed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Personalized Matching</h3>
                  <p className="text-xs text-gray-600">Find nurses specialized in your health needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">24/7 Support</h3>
                  <p className="text-xs text-gray-600">Round-the-clock assistance when you need it</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Founded by healthcare professionals and technology experts, Nursily was created to address the growing
                need for accessible, quality healthcare for seniors.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-sm">👩‍⚕️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Dr. Sarah Mitchell</p>
                    <p className="text-xs text-gray-600">Chief Medical Officer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-sm">👨‍💻</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Alex Chen</p>
                    <p className="text-xs text-gray-600">Chief Technology Officer</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">support@nursily.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">1-800-NURSILY</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">www.nursily.com</span>
              </div>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center gap-4 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-purple-600">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-purple-600">
                  Terms of Service
                </Link>
                <Link href="/licenses" className="hover:text-purple-600">
                  Licenses
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
