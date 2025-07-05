import { supabase } from "./supabase"
import type { Message } from "./supabase"

export interface MessageWithSender extends Message {
  sender_profile: {
    full_name: string
    profile_image_url?: string
  }
}

export async function sendMessage(message: Omit<Message, "id" | "created_at" | "is_read">) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ ...message, is_read: false })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getConversation(userId: string, otherUserId: string): Promise<MessageWithSender[]> {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender_profile:profiles!messages_sender_id_fkey (
        full_name,
        profile_image_url
      )
    `)
    .or(
      `and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`,
    )
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

export async function getUserConversations(userId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender_profile:profiles!messages_sender_id_fkey (
        full_name,
        profile_image_url
      ),
      recipient_profile:profiles!messages_recipient_id_fkey (
        full_name,
        profile_image_url
      )
    `)
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) throw error

  // Group by conversation and get latest message
  const conversations = new Map()

  data?.forEach((message) => {
    const otherUserId = message.sender_id === userId ? message.recipient_id : message.sender_id
    const otherProfile = message.sender_id === userId ? message.recipient_profile : message.sender_profile

    if (
      !conversations.has(otherUserId) ||
      new Date(message.created_at) > new Date(conversations.get(otherUserId).created_at)
    ) {
      conversations.set(otherUserId, {
        ...message,
        other_user_id: otherUserId,
        other_user_profile: otherProfile,
      })
    }
  })

  return Array.from(conversations.values())
}

export async function markMessagesAsRead(userId: string, senderId: string) {
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("recipient_id", userId)
    .eq("sender_id", senderId)
    .eq("is_read", false)

  if (error) throw error
}

export async function getUnreadMessageCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("recipient_id", userId)
    .eq("is_read", false)

  if (error) throw error
  return count || 0
}
