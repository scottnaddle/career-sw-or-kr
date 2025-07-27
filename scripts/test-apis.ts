import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import dotenv from 'dotenv'

// .env 파일 로드
dotenv.config({ path: '.env.local' })

// Supabase Admin Client (Service Role Key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testAPIs() {
  console.log('API 테스트를 시작합니다...')

  // 테스트 사용자 생성 (이미 생성된 경우 생략 가능)
  let userId = ''
  
  try {
    // 기존 테스트 사용자 확인
    const { data: existingUsers, error: usersError } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('name', '홍길동')
    
    if (usersError) throw usersError
    
    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id
      console.log('기존 테스트 사용자 ID:', userId)
    } else {
      // 새로운 테스트 사용자 생성
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email: 'test@example.com',
        password: 'password123',
        user_metadata: {
          name: '홍길동',
          user_type: 'individual'
        }
      })

      if (userError) throw userError

      userId = userData.user?.id || ''
      console.log('새로운 테스트 사용자 생성 완료:', userId)

      // 사용자 프로필 생성
      const { error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .insert({
          id: userId,
          user_type: 'individual',
          name: '홍길동',
          phone: '010-1234-5678',
          email_verified: true,
          phone_verified: true,
          status: 'active'
        })

      if (profileError) throw profileError
      console.log('사용자 프로필 생성 완료')
    }

    // 테스트 경력 정보 생성
    const { data: careerData, error: careerError } = await supabaseAdmin
      .from('careers')
      .insert({
        user_id: userId,
        company_name: 'API 테스트 회사',
        start_date: '2023-01-01',
        is_current: true,
        position: 'API 테스트 엔지니어',
        department: '테스트부서',
        job_category: 'test',
        job_description: 'API 테스트용 경력 정보',
        technologies: ['TypeScript', 'Next.js'],
        projects: [
          {
            name: 'API 테스트 프로젝트',
            description: 'API 엔드포인트 테스트용 프로젝트',
            start_date: '2023-02-01',
            end_date: null
          }
        ],
        status: 'approved'
      })
      .select()
      .single()

    if (careerError) throw careerError
    console.log('테스트 경력 정보 생성 완료:', careerData.id)

    // 테스트 완료
    console.log('모든 API 테스트가 완료되었습니다.')
  } catch (error) {
    console.error('API 테스트 오류:', error)
  }
}

testAPIs()