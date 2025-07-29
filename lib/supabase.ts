import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  company_name?: string
  phone?: string
  user_type: 'individual' | 'business'
  subscription_status: 'active' | 'inactive' | 'cancelled'
  subscription_end_date?: string
  created_at: string
  updated_at: string
}

export interface Contract {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  location: string
  estimated_value: number
  currency: string
  deadline: string
  submission_deadline: string
  contract_type: 'tender' | 'rfp' | 'rfq' | 'auction'
  status: 'open' | 'closed' | 'awarded' | 'cancelled'
  client_name: string
  client_type: 'government' | 'private' | 'ngo'
  requirements: string[]
  documents_url?: string
  contact_email?: string
  contact_phone?: string
  created_at: string
  updated_at: string
}

export interface BidAnalytics {
  id: string
  contract_id: string
  total_bids: number
  average_bid: number
  highest_bid: number
  lowest_bid: number
  winning_bid?: number
  winning_company?: string
  competition_level: 'low' | 'medium' | 'high'
  win_probability_score: number
  created_at: string
  updated_at: string
}

export interface UserTracking {
  id: string
  user_id: string
  contract_id: string
  status: 'tracking' | 'bidding' | 'won' | 'lost'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'contract' | 'deadline' | 'payment' | 'system'
  read: boolean
  data?: any
  created_at: string
} 