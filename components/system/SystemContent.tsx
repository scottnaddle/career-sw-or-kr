'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

interface SystemStats {
  totalUsers: number
  totalCareers: number
  pendingApprovals: number
  totalCertificates: number
}

export default function SystemContent() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalCareers: 0,
    pendingApprovals: 0,
    totalCertificates: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && profile?.user_type === 'admin') {
      fetchSystemStats()
    } else {
      setLoading(false)
    }
  }, [user, profile])

  const fetchSystemStats = async () => {
    try {
      // 시스템 통계 데이터 조회 (실제 구현시 admin 권한 확인 필요)
      const [usersCount, careersCount, pendingCount] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('careers').select('id', { count: 'exact', head: true }),
        supabase.from('careers').select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ])

      setStats({
        totalUsers: usersCount.count || 0,
        totalCareers: careersCount.count || 0,
        pendingApprovals: pendingCount.count || 0,
        totalCertificates: 0 // 인증서 테이블이 구현되면 추가
      })
    } catch (error) {
      console.error('Error fetching system stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">접근 권한이 필요합니다</h2>
          <p className="text-gray-600 mb-6">시스템 관리 페이지는 로그인이 필요합니다.</p>
          <a href="/auth/login" className="btn-primary">
            로그인하기
          </a>
        </div>
      </div>
    )
  }

  if (profile?.user_type !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">관리자 권한이 필요합니다</h2>
          <p className="text-gray-600 mb-6">이 페이지는 시스템 관리자만 접근할 수 있습니다.</p>
          <a href="/dashboard" className="btn-primary">
            대시보드로 이동
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">시스템 관리</h1>
        <p className="text-gray-600">SW기술자 경력관리시스템의 전반적인 운영 현황을 관리합니다.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 시스템 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalUsers}
              </div>
              <div className="text-gray-600">총 사용자</div>
            </div>

            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.totalCareers}
              </div>
              <div className="text-gray-600">등록된 경력</div>
            </div>

            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {stats.pendingApprovals}
              </div>
              <div className="text-gray-600">승인 대기</div>
            </div>

            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.totalCertificates}
              </div>
              <div className="text-gray-600">발급된 인증서</div>
            </div>
          </div>

          {/* 시스템 관리 메뉴 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold mb-2">사용자 관리</h3>
                <p className="text-gray-600 mb-4">회원 정보 조회 및 권한 관리</p>
                <button className="btn-primary w-full" disabled>
                  관리하기 (개발중)
                </button>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2">경력 심사</h3>
                <p className="text-gray-600 mb-4">제출된 경력 정보 검토 및 승인</p>
                <button className="btn-primary w-full" disabled>
                  심사하기 (개발중)
                </button>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-lg font-semibold mb-2">인증서 발급</h3>
                <p className="text-gray-600 mb-4">경력확인서 생성 및 발급 관리</p>
                <button className="btn-primary w-full" disabled>
                  발급하기 (개발중)
                </button>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">통계 분석</h3>
                <p className="text-gray-600 mb-4">시스템 사용 현황 및 통계</p>
                <button className="btn-primary w-full" disabled>
                  분석하기 (개발중)
                </button>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📢</div>
                <h3 className="text-lg font-semibold mb-2">공지사항 관리</h3>
                <p className="text-gray-600 mb-4">시스템 공지사항 작성 및 관리</p>
                <button className="btn-primary w-full" disabled>
                  관리하기 (개발중)
                </button>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-lg font-semibold mb-2">시스템 설정</h3>
                <p className="text-gray-600 mb-4">시스템 환경 설정 및 관리</p>
                <button className="btn-primary w-full" disabled>
                  설정하기 (개발중)
                </button>
              </div>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="card">
            <div className="card-header">
              <h3 className="section-title">최근 시스템 활동</h3>
            </div>
            <div className="text-center py-8 text-gray-500">
              <div className="text-gray-400 text-4xl mb-4">📋</div>
              <p>활동 로그 기능은 현재 개발 중입니다.</p>
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="section-title">시스템 상태</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">데이터베이스</span>
                  <span className="badge badge-success">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">파일 저장소</span>
                  <span className="badge badge-success">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">인증 서비스</span>
                  <span className="badge badge-success">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">이메일 서비스</span>
                  <span className="badge badge-warning">점검중</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="section-title">서버 정보</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">서버 버전</span>
                  <span className="text-gray-900">v1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">데이터베이스</span>
                  <span className="text-gray-900">PostgreSQL 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">운영 환경</span>
                  <span className="text-gray-900">Supabase</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">배포 플랫폼</span>
                  <span className="text-gray-900">Netlify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}