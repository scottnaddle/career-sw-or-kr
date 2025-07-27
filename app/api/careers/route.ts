import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/supabase'

// 경력 목록 조회
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 경력 목록 조회
    const { data: careers, error } = await supabase
      .from('careers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ careers })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// 경력 등록
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  
  try {
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      company_name,
      business_number,
      start_date,
      end_date,
      is_current,
      position,
      department,
      job_category,
      job_description,
      technologies,
      projects
    } = body

    // 입력 데이터 검증
    if (!company_name || !start_date || !position || !job_category || !job_description) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    // 경력 등록
    const { data: career, error } = await supabase
      .from('careers')
      .insert({
        user_id: user.id,
        company_name,
        business_number,
        start_date,
        end_date,
        is_current: is_current || false,
        position,
        department,
        job_category,
        job_description,
        technologies: technologies || [],
        projects: projects || [],
        status: 'draft'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ career }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}