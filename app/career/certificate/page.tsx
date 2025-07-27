'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { SidebarLayout } from '@/components/layout/Layout'
import { CareerSidebar } from '@/components/layout/Sidebar'
import { createSupabaseClient } from '@/lib/supabase-client'

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

export default function CertificatePage() {
  const { user, profile } = useAuth()
  const supabase = createSupabaseClient()
  
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

      // 발급된 인증서 조회
      const { data: certificatesData, error: certificatesError } = await supabase
        .from('certificates')
        .select(`
          *,
          career:careers(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (certificatesError) throw certificatesError
      setCertificates(certificatesData || [])
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
      const requests = selectedCareerIds.map(careerId => ({
        user_id: user?.id,
        career_id: careerId,
        purpose: purpose.trim(),
        status: 'pending'
      }))

      const { error } = await supabase
        .from('certificates')
        .insert(requests)

      if (error) throw error

      // 활동 로그 저장
      await supabase
        .from('activity_logs')
        .insert({
          user_id: user?.id,
          action: '경력확인서 발급 신청',
          details: {
            career_count: selectedCareerIds.length,
            purpose: purpose.trim()
          }
        })

      alert('경력확인서 발급 신청이 완료되었습니다. 처리 후 알려드리겠습니다.')
      
      // 폼 초기화
      setSelectedCareerIds([])
      setPurpose('')
      
      // 데이터 새로고침
      await fetchData()
    } catch (error) {
      console.error('Error requesting certificate:', error)
      alert('발급 신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIssuing(false)
    }
  }

  const handleDownload = async (certificate: Certificate) => {
    if (!certificate.pdf_path) {
      alert('아직 인증서가 생성되지 않았습니다.')
      return
    }

    try {
      const { data, error } = await supabase.storage
        .from('certificates')
        .download(certificate.pdf_path)

      if (error) throw error

      // 파일 다운로드
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = `경력확인서_${certificate.certificate_number}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading certificate:', error)
      alert('인증서 다운로드 중 오류가 발생했습니다.')
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
      <SidebarLayout 
        sidebar={<CareerSidebar />}
        title="확인서 발급"
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
        title="확인서 발급"
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
      title="확인서 발급"
      description="승인된 경력에 대한 확인서를 발급받으세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '경력확인', href: '/career' },
        { label: '확인서 발급' }
      ]}
    >
      <div className="space-y-8">
        {/* 발급 신청 섹션 */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">새 확인서 발급 신청</h3>
          
          {approvedCareers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📄</div>
              <h4 className="text-lg font-semibold mb-2">승인된 경력이 없습니다</h4>
              <p className="text-gray-600">
                경력 확인서를 발급받으려면 먼저 경력을 등록하고 승인을 받아야 합니다.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 경력 선택 */}
              <div>
                <h4 className="font-medium mb-3">발급받을 경력 선택</h4>
                <div className="space-y-3">
                  {approvedCareers.map((career) => (
                    <label key={career.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCareerIds.includes(career.id)}
                        onChange={() => handleCareerSelection(career.id)}
                        className="mt-1"
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
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  발급 목적 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="확인서 발급 목적을 입력해주세요 (예: 이직, 승진, 프로젝트 참여 등)"
                />
              </div>

              {/* 발급 신청 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={handleIssueRequest}
                  disabled={selectedCareerIds.length === 0 || !purpose.trim() || issuing}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {issuing ? '신청 중...' : '발급 신청'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 발급 내역 섹션 */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">발급 내역</h3>
          
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              발급 신청한 확인서가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {certificate.career.company_name} - {certificate.career.position}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          certificate.status === 'issued' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {certificate.status === 'issued' ? '발급완료' : '처리중'}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">신청일:</span> {formatDate(certificate.created_at)}</p>
                        {certificate.status === 'issued' && certificate.issue_date && (
                          <p><span className="font-medium">발급일:</span> {formatDate(certificate.issue_date)}</p>
                        )}
                        {certificate.certificate_number && (
                          <p><span className="font-medium">확인서 번호:</span> {certificate.certificate_number}</p>
                        )}
                        <p><span className="font-medium">발급 목적:</span> {certificate.purpose}</p>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {certificate.status === 'issued' && certificate.pdf_path && (
                        <button
                          onClick={() => handleDownload(certificate)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          다운로드
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 안내사항 */}
        <div className="card bg-gray-50">
          <h4 className="font-medium mb-3">확인서 발급 안내</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 경력확인서는 승인된 경력에 대해서만 발급 가능합니다.</li>
            <li>• 발급 신청 후 처리까지 1-2일 정도 소요됩니다.</li>
            <li>• 발급된 확인서는 PDF 형태로 다운로드 받을 수 있습니다.</li>
            <li>• 확인서에는 고유번호가 부여되어 진위여부 확인이 가능합니다.</li>
            <li>• 문의사항은 고객센터로 연락해주세요.</li>
          </ul>
        </div>
      </div>
    </SidebarLayout>
  )
}