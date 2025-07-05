import { supabase } from "./supabase"
import type { Notification } from "./supabase"

export async function createNotification(notification: Omit<Notification, "id" | "created_at" | "is_read">) {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ ...notification, is_read: false })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserNotifications(userId: string, limit = 20): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function markAllNotificationsAsRead(userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  if (error) throw error
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  if (error) throw error
  return count || 0
}

export async function deleteNotification(notificationId: string) {
  const { error } = await supabase.from("notifications").delete().eq("id", notificationId)

  if (error) throw error
}

// Notification helpers
export async function sendMedicationReminder(userId: string, medication: string, time: string) {
  return createNotification({
    user_id: userId,
    title: "💊 Medication Reminder",
    body: `Time to take your ${medication} at ${time}`,
    type: "medication",
    data: { medication, time },
  })
}

export async function sendAppointmentReminder(userId: string, nurseName: string, time: string) {
  return createNotification({
    user_id: userId,
    title: "🏥 Appointment Reminder",
    body: `Your appointment with ${nurseName} is at ${time}`,
    type: "appointment",
    data: { nurseName, time },
  })
}

export async function sendHealthAlert(userId: string, message: string) {
  return createNotification({
    user_id: userId,
    title: "⚠️ Health Alert",
    body: message,
    type: "health_alert",
    data: { message },
  })
}
