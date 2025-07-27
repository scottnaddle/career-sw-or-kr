import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Database } from '@/types/supabase'

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 경력 통계 조회
    const { data: careers, error } = await supabase
      .from('careers')
      .select('status')
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 상태별 통계 계산
    const stats = careers.reduce((acc, career) => {
      acc.totalCareers++
      switch (career.status) {
        case 'approved':
          acc.approvedCareers++
          break
        case 'under_review':
        case 'submitted':
          acc.pendingCareers++
          break
        case 'rejected':
          acc.rejectedCareers++
          break
      }
      return acc
    }, {
      totalCareers: 0,
      approvedCareers: 0,
      pendingCareers: 0,
      rejectedCareers: 0
    })

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}