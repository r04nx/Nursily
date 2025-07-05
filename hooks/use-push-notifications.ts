"use client"

import { useState, useEffect } from "react"

interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
}

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("Notification" in window)
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }

  const sendNotification = (options: NotificationOptions) => {
    if (!isSupported || permission !== "granted") {
      console.warn("Notifications not supported or permission not granted")
      return
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || "/icon-192x192.png",
        badge: options.badge || "/icon-192x192.png",
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
      })

      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close()
      }, 5000)

      return notification
    } catch (error) {
      console.error("Error sending notification:", error)
    }
  }

  const scheduleNotification = (options: NotificationOptions, delay: number) => {
    setTimeout(() => {
      sendNotification(options)
    }, delay)
  }

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    scheduleNotification,
  }
}
