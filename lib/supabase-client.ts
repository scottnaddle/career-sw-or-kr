import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export const createSupabaseClient = () => {
  try {
    // createClientComponentClient는 자동으로 환경 변수를 처리함
    return createClientComponentClient<Database>()
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}