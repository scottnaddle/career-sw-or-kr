import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// 환경변수가 없을 때는 클라이언트 생성을 건너뜀
export const supabase = supabaseUrl.includes('placeholder') ? null : createClient<Database>(supabaseUrl, supabaseAnonKey)

// 서버사이드에서 사용할 클라이언트 (Service Role Key 사용)
export const supabaseAdmin = (supabaseUrl.includes('placeholder') || !process.env.SUPABASE_SERVICE_ROLE_KEY) 
  ? null 
  : createClient<Database>(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )