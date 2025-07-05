import { supabase } from "./supabase"
import type { Profile, Patient, Nurse } from "./supabase"

export async function signUp(
  email: string,
  password: string,
  userData: {
    full_name: string
    user_type: "patient" | "nurse"
    phone?: string
  },
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.full_name,
        user_type: userData.user_type,
        phone: userData.phone,
      },
    },
  })

  if (error) throw error

  // Create profile
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      user_type: userData.user_type,
      full_name: userData.full_name,
      email: email,
      phone: userData.phone,
    })

    if (profileError) throw profileError

    // Create user-specific table entry
    if (userData.user_type === "patient") {
      const { error: patientError } = await supabase.from("patients").insert({ id: data.user.id })

      if (patientError) throw patientError
    } else if (userData.user_type === "nurse") {
      const { error: nurseError } = await supabase.from("nurses").insert({
        id: data.user.id,
        license_number: `RN-${Date.now()}`, // Temporary license number
        is_verified: false,
        rating: 0,
        total_reviews: 0,
      })

      if (nurseError) throw nurseError
    }
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

export async function getPatientData(userId: string): Promise<Patient | null> {
  const { data, error } = await supabase.from("patients").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updatePatientData(userId: string, updates: Partial<Patient>) {
  const { data, error } = await supabase.from("patients").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

export async function getNurseData(userId: string): Promise<Nurse | null> {
  const { data, error } = await supabase.from("nurses").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateNurseData(userId: string, updates: Partial<Nurse>) {
  const { data, error } = await supabase.from("nurses").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}
