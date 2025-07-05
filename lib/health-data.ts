import { supabase } from "./supabase"
import type { HealthDevice, HealthReading, HealthJournalEntry } from "./supabase"

// Health Devices
export async function getUserDevices(userId: string): Promise<HealthDevice[]> {
  const { data, error } = await supabase
    .from("health_devices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function addHealthDevice(device: Omit<HealthDevice, "id" | "created_at">) {
  const { data, error } = await supabase.from("health_devices").insert(device).select().single()

  if (error) throw error
  return data
}

export async function updateHealthDevice(deviceId: string, updates: Partial<HealthDevice>) {
  const { data, error } = await supabase.from("health_devices").update(updates).eq("id", deviceId).select().single()

  if (error) throw error
  return data
}

export async function deleteHealthDevice(deviceId: string) {
  const { error } = await supabase.from("health_devices").delete().eq("id", deviceId)

  if (error) throw error
}

// Health Readings
export async function getUserHealthReadings(userId: string, limit = 50): Promise<HealthReading[]> {
  const { data, error } = await supabase
    .from("health_readings")
    .select("*")
    .eq("user_id", userId)
    .order("recorded_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function addHealthReading(reading: Omit<HealthReading, "id">) {
  const { data, error } = await supabase.from("health_readings").insert(reading).select().single()

  if (error) throw error
  return data
}

export async function getLatestReadingByType(userId: string, readingType: string): Promise<HealthReading | null> {
  const { data, error } = await supabase
    .from("health_readings")
    .select("*")
    .eq("user_id", userId)
    .eq("reading_type", readingType)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

// Health Journal
export async function getUserJournalEntries(userId: string, limit = 20): Promise<HealthJournalEntry[]> {
  const { data, error } = await supabase
    .from("health_journal")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function addJournalEntry(entry: Omit<HealthJournalEntry, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("health_journal").insert(entry).select().single()

  if (error) throw error
  return data
}

export async function updateJournalEntry(entryId: string, updates: Partial<HealthJournalEntry>) {
  const { data, error } = await supabase
    .from("health_journal")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", entryId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteJournalEntry(entryId: string) {
  const { error } = await supabase.from("health_journal").delete().eq("id", entryId)

  if (error) throw error
}

// Health Score Calculation
export async function calculateHealthScore(userId: string): Promise<number> {
  // Get recent readings
  const readings = await getUserHealthReadings(userId, 10)

  let score = 0
  let factors = 0

  // Blood pressure scoring
  const bpReading = readings.find((r) => r.reading_type === "blood_pressure")
  if (bpReading) {
    const { systolic, diastolic } = bpReading.value
    if (systolic <= 120 && diastolic <= 80) score += 25
    else if (systolic <= 140 && diastolic <= 90) score += 15
    else score += 5
    factors++
  }

  // Heart rate scoring
  const hrReading = readings.find((r) => r.reading_type === "heart_rate")
  if (hrReading) {
    const { bpm } = hrReading.value
    if (bpm >= 60 && bpm <= 100) score += 25
    else if (bpm >= 50 && bpm <= 110) score += 15
    else score += 5
    factors++
  }

  // Blood glucose scoring
  const bgReading = readings.find((r) => r.reading_type === "blood_glucose")
  if (bgReading) {
    const { glucose } = bgReading.value
    if (glucose >= 70 && glucose <= 100) score += 25
    else if (glucose >= 60 && glucose <= 140) score += 15
    else score += 5
    factors++
  }

  // Default score if no readings
  if (factors === 0) return 75

  return Math.round(score / factors)
}
