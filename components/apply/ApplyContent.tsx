'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface JobPost {
  id: string
  title: string
  company: string
  location: string
  experience: string
  salary: string
  skills: string[]
  description: string
  requirements: string[]
  benefits: string[]
  employmentType: string
  deadline: string
  isUrgent: boolean
  views: number
  applicants: number
  postedAt: string
}

export default function ApplyContent() {
  const { user, profile } = useAuth()
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterExperience, setFilterExperience] = useState('')
  const [filterEmploymentType, setFilterEmploymentType] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 더미 데이터로 시작 (실제로는 API에서 데이터 가져오기)
    const dummyJobs: JobPost[] = [
      {
        id: '1',
        title: '시니어 프론트엔드 개발자',
        company: '테크스타트업',
        location: '서울 강남구',
        experience: '3-5년',
        salary: '5000-7000만원',
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        description: '프론트엔드 개발 및 UI/UX 구현 업무를 담당할 개발자를 모집합니다.',
        requirements: ['React 3년 이상 경험', 'TypeScript 활용 가능', '웹 표준 및 접근성 이해'],
        benefits: ['유연근무제', '스톡옵션', '교육비 지원', '점심식사 제공'],
        employmentType: 'full-time',
        deadline: '2025-02-15',
        isUrgent: true,
        views: 245,
        applicants: 12,
        postedAt: '2025-01-20'
      },
      {
        id: '2',
        title: '백엔드 개발자',
        company: '핀테크코리아',
        location: '서울 서초구',
        experience: '2-4년',
        salary: '4500-6500만원',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'AWS'],
        description: '금융 서비스 백엔드 API 개발 및 시스템 운영을 담당합니다.',
        requirements: ['Node.js 2년 이상 경험', 'REST API 개발 경험', '데이터베이스 설계 경험'],
        benefits: ['재택근무', '성과급', '건강검진', '복리후생'],
        employmentType: 'full-time',
        deadline: '2025-02-28',
        isUrgent: false,
        views: 189,
        applicants: 8,
        postedAt: '2025-01-18'
      },
      {
        id: '3',
        title: '풀스택 개발자',
        company: '이커머스플랫폼',
        location: '경기 성남시',
        experience: '1-3년',
        salary: '3500-5000만원',
        skills: ['Vue.js', 'Django', 'Python', 'MySQL'],
        description: '이커머스 플랫폼의 프론트엔드와 백엔드 개발을 담당합니다.',
        requirements: ['웹 개발 1년 이상', 'Vue.js 또는 React 경험', 'Python 기본 지식'],
        benefits: ['학습지원', '도서구입비', '야근식대', '연차 자유사용'],
        employmentType: 'contract',
        deadline: '2025-02-10',
        isUrgent: true,
        views: 312,
        applicants: 15,
        postedAt: '2025-01-22'
      }
    ]
    
    setJobPosts(dummyJobs)
    setLoading(false)
  }, [])

  const filteredJobs = jobPosts.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesLocation = !filterLocation || job.location.includes(filterLocation)
    const matchesExperience = !filterExperience || job.experience.includes(filterExperience)
    const matchesEmploymentType = !filterEmploymentType || job.employmentType === filterEmploymentType
    
    return matchesSearch && matchesLocation && matchesExperience && matchesEmploymentType
  })

  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time': return '정규직'
      case 'contract': return '계약직'
      case 'part-time': return '파트타임'
      case 'internship': return '인턴십'
      default: return type
    }
  }

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return '마감'
    if (diffDays === 0) return 'D-Day'
    return `D-${diffDays}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SW기술자 채용정보</h1>
        <p className="text-gray-600">경력을 바탕으로 새로운 기회를 찾아보세요.</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="card mb-8">
        <div className="space-y-4">
          {/* 검색창 */}
          <div>
            <input
              type="text"
              placeholder="회사명, 직무, 기술스택으로 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full"
            />
          </div>

          {/* 필터 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">지역</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="form-input"
              >
                <option value="">전체</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="form-label">경력</label>
              <select
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                className="form-input"
              >
                <option value="">전체</option>
                <option value="신입">신입</option>
                <option value="1-3년">1-3년</option>
                <option value="3-5년">3-5년</option>
                <option value="5년 이상">5년 이상</option>
              </select>
            </div>

            <div>
              <label className="form-label">고용형태</label>
              <select
                value={filterEmploymentType}
                onChange={(e) => setFilterEmploymentType(e.target.value)}
                className="form-input"
              >
                <option value="">전체</option>
                <option value="full-time">정규직</option>
                <option value="contract">계약직</option>
                <option value="part-time">파트타임</option>
                <option value="internship">인턴십</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{jobPosts.length}</div>
          <div className="text-sm text-blue-800">전체 채용공고</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {jobPosts.filter(job => job.isUrgent).length}
          </div>
          <div className="text-sm text-green-800">급구 채용</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {filteredJobs.length}
          </div>
          <div className="text-sm text-purple-800">검색 결과</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {jobPosts.reduce((sum, job) => sum + job.applicants, 0)}
          </div>
          <div className="text-sm text-orange-800">총 지원자</div>
        </div>
      </div>

      {/* 채용공고 목록 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">채용정보를 불러오는 중...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 필터를 사용해보세요.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    {job.isUrgent && (
                      <span className="badge badge-danger">급구</span>
                    )}
                  </div>
                  <div className="text-lg font-medium text-primary-600 mb-2">{job.company}</div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>📍 {job.location}</span>
                    <span>👤 {job.experience}</span>
                    <span>💰 {job.salary}</span>
                    <span>💼 {getEmploymentTypeLabel(job.employmentType)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold mb-1 ${
                    formatDeadline(job.deadline).includes('D-') ? 'text-orange-600' :
                    formatDeadline(job.deadline) === 'D-Day' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {formatDeadline(job.deadline)}
                  </div>
                  <div className="text-sm text-gray-500">
                    조회 {job.views} · 지원 {job.applicants}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="space-y-3">
                {/* 요구 기술 */}
                <div>
                  <span className="text-sm font-medium text-gray-700 mr-2">기술스택:</span>
                  <div className="inline-flex flex-wrap gap-1">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 주요 요구사항 */}
                <div>
                  <span className="text-sm font-medium text-gray-700">요구사항:</span>
                  <ul className="text-sm text-gray-600 mt-1">
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <li key={index} className="ml-4">• {req}</li>
                    ))}
                  </ul>
                </div>

                {/* 복리후생 */}
                <div>
                  <span className="text-sm font-medium text-gray-700 mr-2">복리후생:</span>
                  <span className="text-sm text-gray-600">
                    {job.benefits.slice(0, 3).join(', ')}
                    {job.benefits.length > 3 && ' 외'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {new Date(job.postedAt).toLocaleDateString('ko-KR')} 게시
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline">관심등록</button>
                  {user ? (
                    <button className="btn-primary">지원하기</button>
                  ) : (
                    <a href="/auth/login" className="btn-primary">
                      로그인 후 지원
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 하단 안내 */}
      <div className="mt-12 card bg-gray-50 border-gray-200">
        <h4 className="font-medium mb-3 text-gray-900">채용정보 안내</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 경력확인시스템에 등록된 경력을 바탕으로 맞춤 채용정보를 제공합니다.</li>
          <li>• 지원 시 등록된 경력정보가 자동으로 연동됩니다.</li>
          <li>• 기업 회원은 직접 채용공고를 등록할 수 있습니다.</li>
          <li>• 허위 정보나 부적절한 채용공고는 즉시 삭제됩니다.</li>
        </ul>
      </div>
    </div>
  )
}