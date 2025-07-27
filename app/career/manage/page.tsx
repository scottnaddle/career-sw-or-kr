'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import CareerForm from '@/components/career/CareerForm'
import { Database } from '@/types/supabase'

type Career = Database['public']['Tables']['careers']['Row']

export default function CareerManagePage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
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

      // 목록에서 삭제된 항목 제거
      setCareers(careers.filter(career => career.id !== id))
      alert('경력 정보가 삭제되었습니다.')
    } catch (err) {
      console.error('경력 정보 삭제 오류:', err)
      alert('경력 정보 삭제에 실패했습니다.')
    }
  }

  if (authLoading) {
    return <div className="loading">로딩 중...</div>
  }

  if (!user) {
    return <div className="unauthorized">접근 권한이 없습니다. 로그인해주세요.</div>
  }

  return (
    <div className="career-manage-page">
      <h1>경력 관리</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="content-section">
        <div className="form-section">
          <h2>{editingCareerId ? '경력 정보 수정' : '새로운 경력 등록'}</h2>
          <CareerForm careerId={editingCareerId} />
        </div>

        <div className="list-section">
          <div className="section-header">
            <h2>등록된 경력 목록</h2>
            <button 
              onClick={() => setEditingCareerId(null)}
              className="new-career-btn"
            >
              새 경력 추가
            </button>
          </div>

          {loading ? (
            <div className="loading">경력 목록 로딩 중...</div>
          ) : careers.length === 0 ? (
            <div className="no-data">등록된 경력 정보가 없습니다.</div>
          ) : (
            <div className="career-list">
              {careers.map((career) => (
                <div key={career.id} className="career-item">
                  <div className="career-header">
                    <h3>{career.company_name}</h3>
                    <div className="career-actions">
                      <button
                        onClick={() => setEditingCareerId(career.id)}
                        className="edit-btn"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteCareer(career.id)}
                        className="delete-btn"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  
                  <div className="career-details">
                    <div className="detail-row">
                      <span className="label">직책:</span>
                      <span>{career.position}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="label">재직기간:</span>
                      <span>
                        {new Date(career.start_date).toLocaleDateString()} ~ {
                          career.is_current 
                            ? '현재' 
                            : career.end_date 
                              ? new Date(career.end_date).toLocaleDateString() 
                              : ''
                        }
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="label">직무 분야:</span>
                      <span>
                        {
                          {
                            'development': '개발',
                            'analysis': '분석',
                            'design': '디자인',
                            'test': '테스트',
                            'maintenance': '유지보수',
                            'consulting': '컨설팅',
                            'management': '관리'
                          }[career.job_category]
                        }
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="label">상태:</span>
                      <span className={`status ${career.status}`}>
                        {
                          {
                            'draft': '임시저장',
                            'submitted': '심사중',
                            'under_review': '심사중',
                            'approved': '승인됨',
                            'rejected': '반려됨'
                          }[career.status]
                        }
                      </span>
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