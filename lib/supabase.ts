import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Profile {
  id: string
  user_type: "patient" | "nurse"
  full_name: string
  email: string
  phone?: string
  address?: string
  date_of_birth?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  medical_conditions?: string[]
  allergies?: string[]
  current_medications?: any
  insurance_info?: any
  preferred_language?: string
  mobility_notes?: string
}

export interface Nurse {
  id: string
  license_number: string
  years_experience?: number
  hourly_rate?: number
  service_radius?: number
  bio?: string
  languages?: string[]
  specializations?: string[]
  certifications?: string[]
  availability?: any
  is_verified: boolean
  rating: number
  total_reviews: number
}

export interface HealthDevice {
  id: string
  user_id: string
  device_name: string
  device_model?: string
  device_type: "blood_pressure" | "glucose_monitor" | "scale" | "pulse_oximeter"
  is_connected: boolean
  battery_level?: number
  last_sync?: string
  created_at: string
}

export interface HealthReading {
  id: string
  user_id: string
  device_id?: string
  reading_type: string
  value: any
  unit?: string
  recorded_at: string
  notes?: string
}

export interface HealthJournalEntry {
  id: string
  user_id: string
  entry_type: string
  title: string
  content: string
  mood?: string
  symptoms?: string[]
  vitals?: any
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  patient_id: string
  nurse_id: string
  scheduled_at: string
  duration_minutes: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  service_type: string
  location_address?: string
  location_coordinates?: any
  notes?: string
  total_cost?: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  appointment_id?: string
  message_type: "text" | "voice" | "system"
  content: string
  is_read: boolean
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  body: string
  type: string
  is_read: boolean
  data?: any
  created_at: string
}
