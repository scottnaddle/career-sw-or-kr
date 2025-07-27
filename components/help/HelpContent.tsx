'use client'

import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'account' | 'career' | 'certificate' | 'system' | 'general'
  popularity: number
}

interface GuideSection {
  id: string
  title: string
  icon: string
  description: string
  steps: string[]
}

export default function HelpContent() {
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  })

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: '경력 등록은 어떻게 하나요?',
      answer: '1. 로그인 후 "경력 등록" 메뉴를 클릭하세요.\n2. 회사명, 직책, 근무기간 등 필수 정보를 입력합니다.\n3. 담당 업무와 사용 기술스택을 상세히 작성해주세요.\n4. 재직증명서나 경력증명서 등 증빙서류를 첨부합니다.\n5. "등록하기" 버튼을 클릭하여 제출하면 심사 후 승인됩니다.',
      category: 'career',
      popularity: 95
    },
    {
      id: '2',
      question: '경력확인서 발급은 얼마나 걸리나요?',
      answer: '경력확인서 발급은 신청 후 1-2일(영업일 기준) 소요됩니다. 승인된 경력에 대해서만 발급이 가능하며, 발급 완료 시 이메일과 SMS로 알림을 보내드립니다. 급하신 경우 고객센터(1588-1234)로 연락주시면 우선 처리해드립니다.',
      category: 'certificate',
      popularity: 88
    },
    {
      id: '3',
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '회원 탈퇴는 마이페이지 > 계정 설정에서 가능합니다. 탈퇴 시 모든 개인정보가 즉시 삭제되며, 등록된 경력정보와 발급된 인증서도 모두 삭제됩니다. 탈퇴는 신중히 결정해주세요.',
      category: 'account',
      popularity: 72
    },
    {
      id: '4',
      question: '경력 심사 기준이 무엇인가요?',
      answer: '경력 심사는 다음 기준으로 진행됩니다:\n1. 제출된 증빙서류의 진위 여부\n2. 회사 실존 여부 및 사업자등록번호 확인\n3. 직무 내용과 기술스택의 연관성\n4. 근무기간의 합리성\n5. 이전 경력과의 연속성\n\n허위 정보 제출 시 계정이 정지될 수 있으니 정확한 정보를 입력해주세요.',
      category: 'career',
      popularity: 79
    },
    {
      id: '5',
      question: '비밀번호를 잊어버렸어요',
      answer: '로그인 페이지의 "비밀번호 찾기"를 클릭하여 가입 시 등록한 이메일을 입력하세요. 임시 비밀번호가 이메일로 발송되며, 로그인 후 반드시 새 비밀번호로 변경해주세요.',
      category: 'account',
      popularity: 84
    },
    {
      id: '6',
      question: '모바일에서도 사용할 수 있나요?',
      answer: '네, 모바일 브라우저에서도 모든 기능을 사용할 수 있습니다. 반응형 웹으로 제작되어 스마트폰, 태블릿에서도 편리하게 이용하실 수 있습니다. 전용 앱은 현재 개발 중입니다.',
      category: 'system',
      popularity: 65
    }
  ]

  const guides: GuideSection[] = [
    {
      id: '1',
      title: '회원가입 및 로그인',
      icon: '👤',
      description: 'SW기술자 경력관리시스템 계정을 만들고 로그인하는 방법',
      steps: [
        '홈페이지 우상단 "회원가입" 클릭',
        '개인회원 또는 기업회원 선택',
        '필수 정보 입력 (이메일, 비밀번호, 이름 등)',
        '이메일 인증 완료',
        '로그인 후 프로필 정보 추가 입력'
      ]
    },
    {
      id: '2',
      title: '경력 등록하기',
      icon: '💼',
      description: 'SW기술자 경력을 등록하고 관리하는 방법',
      steps: [
        '대시보드에서 "경력 등록" 메뉴 선택',
        '회사 정보 및 근무 기간 입력',
        '직책, 부서, 담당 업무 상세 작성',
        '사용한 기술스택과 참여 프로젝트 추가',
        '증빙서류 첨부 후 제출'
      ]
    },
    {
      id: '3',
      title: '경력확인서 발급',
      icon: '📜',
      description: '승인된 경력에 대한 공식 확인서를 발급받는 방법',
      steps: [
        '"확인서 발급" 메뉴에서 발급할 경력 선택',
        '발급 목적 입력 (이직, 승진 등)',
        '발급 신청서 제출',
        '심사 완료 후 이메일 알림 확인',
        'PDF 형태로 다운로드'
      ]
    },
    {
      id: '4',
      title: '채용정보 활용',
      icon: '🔍',
      description: '등록된 경력을 바탕으로 맞춤 채용정보 확인하기',
      steps: [
        '"채용정보" 메뉴에서 구인공고 확인',
        '기술스택, 경력, 지역별 필터링',
        '관심 있는 공고에 "관심등록" 또는 "지원하기"',
        '등록된 경력정보가 자동으로 연동됨',
        '지원 현황을 마이페이지에서 관리'
      ]
    }
  ]

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'account': return '계정관리'
      case 'career': return '경력관리'
      case 'certificate': return '인증서발급'
      case 'system': return '시스템이용'
      case 'general': return '일반문의'
      default: return category
    }
  }

  const filteredFAQs = faqs.filter(faq => 
    selectedFAQCategory === 'all' || faq.category === selectedFAQCategory
  ).sort((a, b) => b.popularity - a.popularity)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    setContactForm({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">도움말 및 고객지원</h1>
        <p className="text-xl text-gray-600">
          SW기술자 경력관리시스템 사용법과 자주 묻는 질문을 확인하세요
        </p>
      </div>

      {/* 빠른 검색 */}
      <div className="card mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">무엇을 도와드릴까요?</h2>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요 (예: 경력등록, 인증서발급)"
              className="form-input w-full text-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              * 검색 기능은 현재 준비 중입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 시작하기 가이드 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 시작하기 가이드</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div key={guide.id} className="card hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{guide.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </div>
              
              <div className="space-y-3">
                {guide.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ 자주 묻는 질문</h2>
        
        {/* FAQ 카테고리 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedFAQCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFAQCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {Array.from(new Set(faqs.map(faq => faq.category))).map(category => (
            <button
              key={category}
              onClick={() => setSelectedFAQCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFAQCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="card border">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className="badge badge-secondary">{getCategoryLabel(faq.category)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">인기 {faq.popularity}%</span>
                  <span className={`transform transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="prose prose-gray max-w-none">
                    {faq.answer.split('\n').map((line, index) => (
                      <p key={index} className="mb-2 text-gray-700">{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 고객지원 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📞 고객지원</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 연락처 정보 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">📋 연락처 정보</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-medium text-gray-900">고객센터</div>
                  <div className="text-gray-600">1588-1234</div>
                  <div className="text-sm text-gray-500">평일 09:00-18:00 (점심시간 12:00-13:00)</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <div className="font-medium text-gray-900">이메일 문의</div>
                  <div className="text-gray-600">support@career.sw.or.kr</div>
                  <div className="text-sm text-gray-500">24시간 접수, 1-2일 내 답변</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium text-gray-900">실시간 채팅</div>
                  <div className="text-gray-600">평일 09:00-18:00</div>
                  <div className="text-sm text-gray-500">홈페이지 우하단 채팅 버튼</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="font-medium text-gray-900">방문 상담</div>
                  <div className="text-gray-600">서울시 서초구 서초대로 77길 55</div>
                  <div className="text-sm text-gray-500">사전 예약 필수 (고객센터 연락)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 양식 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">📝 온라인 문의</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">이름 *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="form-input"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="form-label">이메일 *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="form-input"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">문의 유형 *</label>
                <select
                  required
                  value={contactForm.category}
                  onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                  className="form-input"
                >
                  <option value="">선택해주세요</option>
                  <option value="account">계정관리</option>
                  <option value="career">경력관리</option>
                  <option value="certificate">인증서발급</option>
                  <option value="system">시스템오류</option>
                  <option value="general">기타문의</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">제목 *</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="form-input"
                  placeholder="문의 제목을 입력하세요"
                />
              </div>
              
              <div>
                <label className="form-label">문의 내용 *</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="form-input"
                  placeholder="문의 내용을 상세히 작성해주세요"
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                문의하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 추가 도움말 */}
      <section>
        <div className="card bg-gray-50 border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📖 더 많은 도움말이 필요하신가요?</h3>
          <p className="text-gray-600 mb-6">
            사용자 매뉴얼과 상세한 가이드를 다운로드하여 참고하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-outline" disabled>
              사용자 매뉴얼 다운로드 (준비중)
            </button>
            <button className="btn-outline" disabled>
              동영상 가이드 보기 (준비중)
            </button>
            <button className="btn-primary" disabled>
              온라인 교육 신청 (준비중)
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}