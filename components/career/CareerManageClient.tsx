'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import CareerForm from '@/components/career/CareerForm'

interface Career {
  id: string
  company_name: string
  position: string
  start_date: string
  end_date?: string
  is_current: boolean
  job_category: string
  status: string
  created_at: string
}

export default function CareerManageClient() {
  const { user, loading: authLoading } = useAuth()
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadCareers()
    }
  }, [user])

  const loadCareers = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setCareers(data || [])
    } catch (err) {
      console.error('경력 목록 로드 오류:', err)
      setError('경력 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const deleteCareer = async (id: string) => {
    if (!user || !confirm('정말로 이 경력 정보를 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('careers')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setCareers(careers.filter(career => career.id !== id))
      alert('경력 정보가 삭제되었습니다.')
    } catch (err) {
      console.error('경력 정보 삭제 오류:', err)
      alert('경력 정보 삭제에 실패했습니다.')
    }
  }

  const getJobCategoryLabel = (category: string) => {
    const labels = {
      'development': '개발',
      'analysis': '분석',
      'design': '디자인',
      'test': '테스트',
      'maintenance': '유지보수',
      'consulting': '컨설팅',
      'management': '관리'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      'draft': '임시저장',
      'submitted': '심사중',
      'under_review': '심사중',
      'approved': '승인됨',
      'rejected': '반려됨'
    }
    return labels[status as keyof typeof labels] || status
  }

  if (authLoading) {
    return (
      <div className="text-center py-12">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">접근 권한이 없습니다. 로그인해주세요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 경력 등록/수정 폼 */}
        <div className="card">
          <div className="card-header">
            <h2 className="section-title">
              {editingCareerId ? '경력 정보 수정' : '새로운 경력 등록'}
            </h2>
          </div>
          <CareerForm 
            careerId={editingCareerId} 
            onSuccess={() => {
              loadCareers()
              setEditingCareerId(null)
            }}
          />
        </div>

        {/* 경력 목록 */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="section-title">등록된 경력 목록</h2>
              <button 
                onClick={() => setEditingCareerId(null)}
                className="btn-secondary"
              >
                새 경력 추가
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto"></div>
              <p className="mt-2 text-gray-600">경력 목록 로딩 중...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">💼</div>
              <p className="text-gray-600">등록된 경력 정보가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((career) => (
                <div key={career.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {career.company_name}
                      </h3>
                      <p className="text-gray-600">{career.position}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCareerId(career.id)}
                        className="btn-outline btn-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteCareer(career.id)}
                        className="btn-danger btn-sm"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">재직기간:</span>
                      <div className="text-gray-600">
                        {new Date(career.start_date).toLocaleDateString()} ~ {
                          career.is_current 
                            ? '현재' 
                            : career.end_date 
                              ? new Date(career.end_date).toLocaleDateString() 
                              : ''
                        }
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">직무 분야:</span>
                      <div className="text-gray-600">
                        {getJobCategoryLabel(career.job_category)}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">상태:</span>
                      <div>
                        <span className={`badge ${
                          career.status === 'approved' ? 'badge-success' :
                          career.status === 'rejected' ? 'badge-danger' :
                          career.status === 'draft' ? 'badge-secondary' :
                          'badge-warning'
                        }`}>
                          {getStatusLabel(career.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}