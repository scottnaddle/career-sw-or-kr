'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

interface CareerStats {
  totalCareers: number
  approvedCareers: number
  pendingCareers: number
  rejectedCareers: number
}

interface RecentCareer {
  id: string
  company_name: string
  position: string
  status: string
  created_at: string
}

export default function DashboardContent() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState<CareerStats>({
    totalCareers: 0,
    approvedCareers: 0,
    pendingCareers: 0,
    rejectedCareers: 0
  })
  const [recentCareers, setRecentCareers] = useState<RecentCareer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // 경력 통계 조회
      const statsResponse = await fetch('/api/careers/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // 최근 경력 조회
      const careersResponse = await fetch('/api/careers?limit=5')
      if (careersResponse.ok) {
        const careersData = await careersResponse.json()
        setRecentCareers(careersData.careers || [])
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-success">승인됨</span>
      case 'pending':
        return <span className="badge badge-warning">검토중</span>
      case 'rejected':
        return <span className="badge badge-danger">반려됨</span>
      case 'draft':
        return <span className="badge badge-secondary">임시저장</span>
      default:
        return <span className="badge badge-info">{status}</span>
    }
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">로그인이 필요합니다.</p>
        <Link href="/auth/login" className="btn-primary">
          로그인하기
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 환영 메시지 */}
      <div className="card">
        <div className="card-header">
          <h2 className="section-title">
            안녕하세요, {profile?.name || user.email}님! 👋
          </h2>
          <p className="text-gray-600">
            {profile?.user_type === 'corporate' ? '기업회원' : '개인회원'}으로 로그인하셨습니다.
          </p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {stats.totalCareers}
          </div>
          <div className="text-gray-600">총 경력</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {stats.approvedCareers}
          </div>
          <div className="text-gray-600">승인된 경력</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {stats.pendingCareers}
          </div>
          <div className="text-gray-600">검토중인 경력</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {stats.rejectedCareers}
          </div>
          <div className="text-gray-600">반려된 경력</div>
        </div>
      </div>

      {/* 빠른 작업 */}
      <div className="card">
        <div className="card-header">
          <h3 className="section-title">빠른 작업</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/career/register" 
            className="btn-primary text-center py-4"
          >
            <div className="text-2xl mb-2">➕</div>
            <div>새 경력 등록</div>
          </Link>

          <Link 
            href="/career/certificate" 
            className="btn-outline text-center py-4"
          >
            <div className="text-2xl mb-2">📜</div>
            <div>확인서 발급</div>
          </Link>

          <Link 
            href="/career/manage" 
            className="btn-secondary text-center py-4"
          >
            <div className="text-2xl mb-2">💼</div>
            <div>경력 관리</div>
          </Link>
        </div>
      </div>

      {/* 최근 경력 */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="section-title">최근 등록한 경력</h3>
            <Link href="/career/manage" className="auth-link">
              전체 보기
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : recentCareers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">회사명</th>
                  <th className="table-header-cell">직책</th>
                  <th className="table-header-cell">상태</th>
                  <th className="table-header-cell">등록일</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {recentCareers.map((career) => (
                  <tr key={career.id}>
                    <td className="table-cell font-medium">
                      {career.company_name}
                    </td>
                    <td className="table-cell">{career.position}</td>
                    <td className="table-cell">
                      {getStatusBadge(career.status)}
                    </td>
                    <td className="table-cell-muted">
                      {new Date(career.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">💼</div>
            <p className="text-gray-600 mb-4">등록된 경력이 없습니다.</p>
            <Link href="/career/register" className="btn-primary">
              첫 경력 등록하기
            </Link>
          </div>
        )}
      </div>

      {/* 공지사항 */}
      <div className="card">
        <div className="card-header">
          <h3 className="section-title">공지사항</h3>
        </div>
        <div className="space-y-3">
          <div className="border-l-4 border-primary-500 pl-4">
            <div className="font-medium text-gray-900">
              경력확인서 발급 시스템 업데이트 안내
            </div>
            <div className="text-sm text-gray-600">
              2025.01.27 | 더 빠르고 정확한 확인서 발급을 위해 시스템을 업데이트했습니다.
            </div>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <div className="font-medium text-gray-900">
              신규 기술스택 카테고리 추가
            </div>
            <div className="text-sm text-gray-600">
              2025.01.20 | AI/ML, 블록체인 등 최신 기술 카테고리가 추가되었습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}