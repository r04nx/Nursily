import { supabase } from "./supabase"
import type { Appointment } from "./supabase"

export interface AppointmentWithDetails extends Appointment {
  nurse_profile?: any
  patient_profile?: any
}

export async function createAppointment(appointment: Omit<Appointment, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("appointments").insert(appointment).select().single()

  if (error) throw error
  return data
}

export async function getUserAppointments(
  userId: string,
  userType: "patient" | "nurse",
): Promise<AppointmentWithDetails[]> {
  const column = userType === "patient" ? "patient_id" : "nurse_id"
  const otherColumn = userType === "patient" ? "nurse_id" : "patient_id"
  const otherTable = userType === "patient" ? "nurses" : "patients"

  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      ${otherTable}!appointments_${otherColumn}_fkey (
        *,
        profiles (*)
      )
    `)
    .eq(column, userId)
    .order("scheduled_at", { ascending: true })

  if (error) throw error
  return data || []
}

export async function updateAppointmentStatus(appointmentId: string, status: Appointment["status"]) {
  const { data, error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", appointmentId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUpcomingAppointments(userId: string, userType: "patient" | "nurse") {
  const column = userType === "patient" ? "patient_id" : "nurse_id"

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq(column, userId)
    .gte("scheduled_at", new Date().toISOString())
    .in("status", ["pending", "confirmed"])
    .order("scheduled_at", { ascending: true })
    .limit(5)

  if (error) throw error
  return data || []
}
