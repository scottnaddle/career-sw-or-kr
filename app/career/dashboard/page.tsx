'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { SidebarLayout } from '@/components/layout/Layout'
import { CareerSidebar } from '@/components/layout/Sidebar'
import { createSupabaseClient } from '@/lib/supabase-client'

interface DashboardStats {
  career_count: number
  approved_count: number
  pending_count: number
  certificate_count: number
  total_experience_years: number
}

interface ActivityLog {
  id: string
  action: string
  details: any
  created_at: string
}

export default function CareerDashboardPage() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // 통계 데이터 조회
      const { data: statsData } = await supabase.rpc('get_user_statistics', {
        p_user_id: user?.id
      })

      if (statsData) {
        setStats(statsData)
      }

      // 최근 활동 조회
      const { data: activitiesData } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (activitiesData) {
        setActivities(activitiesData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <SidebarLayout 
        sidebar={<CareerSidebar />}
        title="개인 대시보드"
        description="로그인이 필요합니다"
      >
        <div className="text-center py-12">
          <p className="text-gray-600">로그인 후 이용하실 수 있습니다.</p>
        </div>
      </SidebarLayout>
    )
  }

  if (loading) {
    return (
      <SidebarLayout 
        sidebar={<CareerSidebar />}
        title="개인 대시보드"
        description="로딩 중..."
      >
        <div className="flex justify-center py-12">
          <div className="loading-spinner"></div>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout
      sidebar={<CareerSidebar />}
      title="개인 대시보드"
      description={`안녕하세요, ${profile?.name}님! 경력 정보 현황을 한눈에 확인하세요.`}
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '경력확인', href: '/career' },
        { label: '개인 대시보드' }
      ]}
    >
      <div className="space-y-8">
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <h4 className="font-medium text-blue-100">등록된 경력</h4>
                <span className="text-2xl font-bold">{stats?.career_count || 0}건</span>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center">
              <div className="text-3xl mr-4">✅</div>
              <div>
                <h4 className="font-medium text-green-100">승인된 경력</h4>
                <span className="text-2xl font-bold">{stats?.approved_count || 0}건</span>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⏳</div>
              <div>
                <h4 className="font-medium text-yellow-100">심사중인 경력</h4>
                <span className="text-2xl font-bold">{stats?.pending_count || 0}건</span>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📄</div>
              <div>
                <h4 className="font-medium text-purple-100">발급된 확인서</h4>
                <span className="text-2xl font-bold">{stats?.certificate_count || 0}건</span>
              </div>
            </div>
          </div>
        </div>

        {/* 경력 요약 */}
        <div className="card">
          <h4 className="text-lg font-semibold mb-4">경력 요약</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {stats?.total_experience_years || 0}년
              </div>
              <div className="text-sm text-gray-600">총 경력 기간</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {profile?.user_type === 'individual' ? '개인' : '기업'}
              </div>
              <div className="text-sm text-gray-600">회원 유형</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {profile?.status === 'active' ? '활성' : '비활성'}
              </div>
              <div className="text-sm text-gray-600">계정 상태</div>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="card">
          <h4 className="text-lg font-semibold mb-4">최근 활동</h4>
          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(activity.created_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              아직 활동 내역이 없습니다.
            </div>
          )}
        </div>

        {/* 빠른 실행 버튼들 */}
        <div className="card">
          <h4 className="text-lg font-semibold mb-4">빠른 실행</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/career/register"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
            >
              <div className="text-2xl mr-3 group-hover:scale-110 transition-transform">➕</div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-primary-700">경력 등록</div>
                <div className="text-sm text-gray-500">새로운 경력을 등록하세요</div>
              </div>
            </a>

            <a
              href="/career/certificate"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
            >
              <div className="text-2xl mr-3 group-hover:scale-110 transition-transform">📄</div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-primary-700">확인서 발급</div>
                <div className="text-sm text-gray-500">경력확인서를 발급받으세요</div>
              </div>
            </a>

            <a
              href="/career/manage"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
            >
              <div className="text-2xl mr-3 group-hover:scale-110 transition-transform">⚙️</div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-primary-700">경력 관리</div>
                <div className="text-sm text-gray-500">등록된 경력을 관리하세요</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}