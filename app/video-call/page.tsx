"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function VideoCallPage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isCallActive, setIsCallActive] = useState(true)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const endCall = () => {
    setIsCallActive(false)
    // Navigate back to chat or dashboard
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Remote Video */}
      <div className="absolute inset-0">
        <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        {/* Placeholder for remote video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-4xl">👩‍⚕️</span>
            </div>
            <h3 className="text-xl font-semibold">Emma Thompson</h3>
            <p className="text-blue-200">Registered Nurse</p>
          </div>
        </div>
      </div>

      {/* Local Video */}
      <div className="absolute top-4 right-4 w-32 h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
        {isVideoOff && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <VideoOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-40 flex items-center justify-between">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="text-center text-white">
          <p className="text-sm opacity-80">Call Duration</p>
          <p className="text-lg font-mono">{formatDuration(callDuration)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              isMuted ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            } text-white`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
            } text-white`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
            onClick={endCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          <Link href="/chat">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Connection Status */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center gap-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
