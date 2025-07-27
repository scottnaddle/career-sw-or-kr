'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

interface Career {
  id: string
  company_name: string
  position: string
  department: string
  start_date: string
  end_date: string
  employment_type: string
  status: 'approved'
  is_current: boolean
}

interface Certificate {
  id: string
  career_id: string
  certificate_number: string
  issue_date: string
  purpose: string
  status: 'pending' | 'issued'
  pdf_path: string | null
  created_at: string
  career: Career
}

export default function CertificateClient() {
  const { user } = useAuth()
  
  const [approvedCareers, setApprovedCareers] = useState<Career[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCareerIds, setSelectedCareerIds] = useState<string[]>([])
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(true)
  const [issuing, setIssuing] = useState(false)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      // 승인된 경력 조회
      const { data: careersData, error: careersError } = await supabase
        .from('careers')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'approved')
        .order('start_date', { ascending: false })

      if (careersError) throw careersError
      setApprovedCareers(careersData || [])

      // 발급된 인증서 조회 (certificates 테이블이 있다면)
      // const { data: certificatesData, error: certificatesError } = await supabase
      //   .from('certificates')
      //   .select(`
      //     *,
      //     career:careers(*)
      //   `)
      //   .eq('user_id', user?.id)
      //   .order('created_at', { ascending: false })

      // if (certificatesError) throw certificatesError
      // setCertificates(certificatesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCareerSelection = (careerId: string) => {
    setSelectedCareerIds(prev => 
      prev.includes(careerId)
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    )
  }

  const handleIssueRequest = async () => {
    if (selectedCareerIds.length === 0) {
      alert('발급받을 경력을 선택해주세요.')
      return
    }

    if (!purpose.trim()) {
      alert('발급 목적을 입력해주세요.')
      return
    }

    setIssuing(true)

    try {
      // 실제 certificates 테이블이 구현되면 여기에 코드 추가
      alert('경력확인서 발급 기능은 현재 구현 중입니다.')
      
      // 폼 초기화
      setSelectedCareerIds([])
      setPurpose('')
    } catch (error) {
      console.error('Error requesting certificate:', error)
      alert('발급 신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIssuing(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const calculateTotalExperience = (careers: Career[]) => {
    let totalDays = 0
    
    careers.forEach(career => {
      const start = new Date(career.start_date)
      const end = career.is_current ? new Date() : new Date(career.end_date)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      totalDays += Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    })
    
    const years = Math.floor(totalDays / 365)
    const months = Math.floor((totalDays % 365) / 30)
    
    if (years > 0) {
      return months > 0 ? `${years}년 ${months}개월` : `${years}년`
    }
    return `${months}개월`
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">로그인 후 이용하실 수 있습니다.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 발급 신청 섹션 */}
      <div className="card">
        <div className="card-header">
          <h3 className="section-title">새 확인서 발급 신청</h3>
        </div>
        
        {approvedCareers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📄</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900">승인된 경력이 없습니다</h4>
            <p className="text-gray-600">
              경력 확인서를 발급받으려면 먼저 경력을 등록하고 승인을 받아야 합니다.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 경력 선택 */}
            <div>
              <h4 className="font-medium mb-3 text-gray-900">발급받을 경력 선택</h4>
              <div className="space-y-3">
                {approvedCareers.map((career) => (
                  <label key={career.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCareerIds.includes(career.id)}
                      onChange={() => handleCareerSelection(career.id)}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {career.company_name} - {career.position}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(career.start_date)} - {career.is_current ? '현재' : formatDate(career.end_date)}
                        {career.department && ` • ${career.department}`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              
              {selectedCareerIds.length > 0 && (
                <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <span className="font-medium">선택된 경력:</span> {selectedCareerIds.length}건
                    <span className="ml-4">
                      <span className="font-medium">총 경력:</span> {calculateTotalExperience(
                        approvedCareers.filter(career => selectedCareerIds.includes(career.id))
                      )}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* 발급 목적 */}
            <div>
              <label className="form-label">
                발급 목적 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="form-input"
                placeholder="확인서 발급 목적을 입력해주세요 (예: 이직, 승진, 프로젝트 참여 등)"
              />
            </div>

            {/* 발급 신청 버튼 */}
            <div className="flex justify-end">
              <button
                onClick={handleIssueRequest}
                disabled={selectedCareerIds.length === 0 || !purpose.trim() || issuing}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {issuing ? '신청 중...' : '발급 신청'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 발급 내역 섹션 */}
      <div className="card">
        <div className="card-header">
          <h3 className="section-title">발급 내역</h3>
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <p>발급 신청한 확인서가 없습니다.</p>
          <p className="text-sm mt-2">경력확인서 발급 기능은 현재 개발 중입니다.</p>
        </div>
      </div>

      {/* 안내사항 */}
      <div className="card bg-gray-50 border-gray-200">
        <h4 className="font-medium mb-3 text-gray-900">확인서 발급 안내</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 경력확인서는 승인된 경력에 대해서만 발급 가능합니다.</li>
          <li>• 발급 신청 후 처리까지 1-2일 정도 소요됩니다.</li>
          <li>• 발급된 확인서는 PDF 형태로 다운로드 받을 수 있습니다.</li>
          <li>• 확인서에는 고유번호가 부여되어 진위여부 확인이 가능합니다.</li>
          <li>• 문의사항은 고객센터로 연락해주세요.</li>
        </ul>
      </div>
    </div>
  )
}