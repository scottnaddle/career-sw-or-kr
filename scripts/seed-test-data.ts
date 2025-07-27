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

async function seedTestData() {
  console.log('테스트 데이터 추가를 시작합니다...')

  // 테스트 사용자 생성
  const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email: 'test@example.com',
    password: 'password123',
    user_metadata: {
      name: '홍길동',
      user_type: 'individual'
    }
  })

  if (userError) {
    console.error('사용자 생성 오류:', userError)
    return
  }

  const userId = userData.user?.id
  console.log('사용자 생성 완료:', userId)

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

  if (profileError) {
    console.error('프로필 생성 오류:', profileError)
    return
  }

  console.log('사용자 프로필 생성 완료')

  // 테스트 경력 정보 생성
  const careers = [
    {
      user_id: userId,
      company_name: '테스트 회사 1',
      start_date: '2020-01-01',
      end_date: '2022-12-31',
      is_current: false,
      position: '소프트웨어 엔지니어',
      department: '개발부서',
      job_category: 'development',
      job_description: '웹 애플리케이션 개발 및 유지보수',
      technologies: ['JavaScript', 'React', 'Node.js'],
      projects: [
        {
          name: '쇼핑몰 웹사이트 개발',
          description: 'React와 Node.js를 사용한 전자상거래 플랫폼 개발',
          start_date: '2020-03-01',
          end_date: '2020-08-31'
        }
      ],
      status: 'approved'
    },
    {
      user_id: userId,
      company_name: '테스트 회사 2',
      start_date: '2023-01-01',
      is_current: true,
      position: '시니어 개발자',
      department: '기술부서',
      job_category: 'development',
      job_description: '팀 리딩 및 아키텍처 설계',
      technologies: ['TypeScript', 'Next.js', 'AWS'],
      projects: [
        {
          name: '모바일 앱 개발',
          description: 'Next.js와 React Native를 활용한 하이브리드 모바일 앱 개발',
          start_date: '2023-02-01',
          end_date: null
        }
      ],
      status: 'approved'
    }
  ]

  const { error: careersError } = await supabaseAdmin
    .from('careers')
    .insert(careers)

  if (careersError) {
    console.error('경력 정보 생성 오류:', careersError)
    return
  }

  console.log('경력 정보 생성 완료')

  // 테스트 공지사항 생성
  const notices = [
    {
      category: 'system',
      title: '시스템 점검 안내',
      content: '2024년 2월 1일 오전 2시부터 4시까지 시스템 점검이 진행됩니다.',
      is_important: true,
      author: '관리자',
      published_at: new Date().toISOString()
    },
    {
      category: 'feature',
      title: '새로운 기능 추가 안내',
      content: '경력 관리 시스템에 문서 관리 기능이 추가되었습니다.',
      is_important: false,
      author: '관리자',
      published_at: new Date().toISOString()
    }
  ]

  const { error: noticesError } = await supabaseAdmin
    .from('notices')
    .insert(notices)

  if (noticesError) {
    console.error('공지사항 생성 오류:', noticesError)
    return
  }

  console.log('공지사항 생성 완료')

  console.log('모든 테스트 데이터 추가가 완료되었습니다.')
}

seedTestData()