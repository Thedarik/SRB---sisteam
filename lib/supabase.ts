import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Student {
  id: string
  full_name: string
  phone_number: string
  passport_number?: string
  group_id?: string
  enrollment_date: string
  status: 'active' | 'inactive' | 'graduated'
  created_at: string
  updated_at: string
}

export interface Group {
  id: string
  name: string
  course_type: string
  schedule: string
  start_date: string
  end_date: string
  teacher_name?: string
  created_at: string
}

export interface Payment {
  id: string
  student_id: string
  amount: number
  payment_date: string
  status: 'completed' | 'pending' | 'cancelled'
  payment_method?: string
  created_at: string
}

export interface Attendance {
  id: string
  student_id: string
  group_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  created_at: string
}



