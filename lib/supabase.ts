import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 기본 Supabase 클라이언트 (클라이언트/서버 공용)
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// 서버사이드에서 사용할 클라이언트 (Service Role Key 사용)
export const supabaseAdmin = (supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY) 
  ? createClient<Database>(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null