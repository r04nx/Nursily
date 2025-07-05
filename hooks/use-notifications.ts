"use client"

import { useState, useEffect, useCallback } from "react"

interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("Notification" in window)
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }, [isSupported])

  const sendNotification = useCallback(
    (options: NotificationOptions) => {
      if (!isSupported || permission !== "granted") {
        console.warn("Notifications not supported or not permitted")
        return null
      }

      try {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || "/favicon.ico",
          badge: options.badge || "/favicon.ico",
          tag: options.tag,
          requireInteraction: options.requireInteraction || false,
        })

        return notification
      } catch (error) {
        console.error("Error sending notification:", error)
        return null
      }
    },
    [isSupported, permission],
  )

  const sendMedicationReminder = useCallback(
    (medicationName: string, time: string) => {
      return sendNotification({
        title: "💊 Medication Reminder",
        body: `Time to take your ${medicationName} at ${time}`,
        tag: "medication-reminder",
        requireInteraction: true,
      })
    },
    [sendNotification],
  )

  const sendAppointmentReminder = useCallback(
    (nurseName: string, time: string) => {
      return sendNotification({
        title: "🏥 Appointment Reminder",
        body: `Your appointment with ${nurseName} is at ${time}`,
        tag: "appointment-reminder",
        requireInteraction: true,
      })
    },
    [sendNotification],
  )

  const sendHealthAlert = useCallback(
    (message: string) => {
      return sendNotification({
        title: "⚠️ Health Alert",
        body: message,
        tag: "health-alert",
        requireInteraction: true,
      })
    },
    [sendNotification],
  )

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    sendMedicationReminder,
    sendAppointmentReminder,
    sendHealthAlert,
  }
}
