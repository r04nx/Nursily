import { supabase } from "./supabase"
import type { Nurse, Profile } from "./supabase"

export interface NurseWithProfile extends Nurse {
  profiles: Profile
}

export async function getAllNurses(): Promise<NurseWithProfile[]> {
  const { data, error } = await supabase
    .from("nurses")
    .select(`
      *,
      profiles (*)
    `)
    .eq("is_verified", true)
    .order("rating", { ascending: false })

  if (error) throw error
  return data || []
}

export async function searchNurses(filters: {
  specialization?: string
  location?: string
  maxRate?: number
  minRating?: number
}): Promise<NurseWithProfile[]> {
  let query = supabase
    .from("nurses")
    .select(`
      *,
      profiles (*)
    `)
    .eq("is_verified", true)

  if (filters.specialization) {
    query = query.contains("specializations", [filters.specialization])
  }

  if (filters.maxRate) {
    query = query.lte("hourly_rate", filters.maxRate)
  }

  if (filters.minRating) {
    query = query.gte("rating", filters.minRating)
  }

  const { data, error } = await query.order("rating", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getNurseById(nurseId: string): Promise<NurseWithProfile | null> {
  const { data, error } = await supabase
    .from("nurses")
    .select(`
      *,
      profiles (*)
    `)
    .eq("id", nurseId)
    .single()

  if (error) throw error
  return data
}

export async function getFavoriteNurses(patientId: string): Promise<string[]> {
  const { data, error } = await supabase.from("favorite_nurses").select("nurse_id").eq("patient_id", patientId)

  if (error) throw error
  return data?.map((item) => item.nurse_id) || []
}

export async function addFavoriteNurse(patientId: string, nurseId: string) {
  const { data, error } = await supabase
    .from("favorite_nurses")
    .insert({ patient_id: patientId, nurse_id: nurseId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeFavoriteNurse(patientId: string, nurseId: string) {
  const { error } = await supabase.from("favorite_nurses").delete().eq("patient_id", patientId).eq("nurse_id", nurseId)

  if (error) throw error
}

export async function getNurseReviews(nurseId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles!reviews_patient_id_fkey (full_name)
    `)
    .eq("nurse_id", nurseId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}
