'use client'

import { useState, useEffect } from 'react'

interface NewsItem {
  id: string
  title: string
  content: string
  category: 'system' | 'policy' | 'industry' | 'event'
  author: string
  publishedAt: string
  views: number
  isImportant: boolean
  tags: string[]
  summary: string
}

export default function NewsContent() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 더미 뉴스 데이터
    const dummyNews: NewsItem[] = [
      {
        id: '1',
        title: '경력확인서 발급 시스템 업데이트 안내',
        content: `경력확인서 발급 시스템이 업데이트되어 더욱 빠르고 정확한 서비스를 제공합니다.

주요 개선사항:
1. 발급 처리 시간 단축 (기존 2-3일 → 1-2일)
2. 모바일 최적화 인터페이스 제공
3. 실시간 처리 현황 확인 기능 추가
4. PDF 품질 개선 및 보안 강화

업데이트는 2025년 1월 27일부터 적용되며, 기존 발급된 인증서의 유효성에는 변화가 없습니다.

문의사항이 있으시면 고객센터(1588-1234)로 연락해주세요.`,
        category: 'system',
        author: '시스템관리자',
        publishedAt: '2025-01-27',
        views: 1247,
        isImportant: true,
        tags: ['시스템', '업데이트', '인증서'],
        summary: '경력확인서 발급 시스템 업데이트로 처리 시간 단축 및 사용성 개선'
      },
      {
        id: '2',
        title: 'SW기술자 경력인정 기준 개정 안내',
        content: `SW기술자 경력인정 기준이 개정되어 2025년 3월부터 적용됩니다.

주요 변경사항:
1. 프리랜서 및 외주 개발 경력 인정 범위 확대
2. 오픈소스 기여 활동도 경력으로 인정
3. 부트캠프 및 개인 프로젝트 경력 가산점 신설
4. 기술스택별 세분화된 평가 기준 도입

기존 등록된 경력에 대해서도 새로운 기준으로 재심사가 가능하며, 자세한 내용은 홈페이지에서 확인하실 수 있습니다.`,
        category: 'policy',
        author: '정책팀',
        publishedAt: '2025-01-25',
        views: 892,
        isImportant: true,
        tags: ['정책', '경력인정', '기준개정'],
        summary: 'SW기술자 경력인정 기준 개정으로 다양한 경력 형태 인정 확대'
      },
      {
        id: '3',
        title: '2025년 SW산업 전망 및 인력 동향',
        content: `한국소프트웨어산업협회에서 발표한 2025년 SW산업 전망 보고서 주요 내용을 공유합니다.

주요 전망:
1. AI/ML 개발자 수요 전년 대비 40% 증가 예상
2. 클라우드 네이티브 기술 전문가 부족 심화
3. 데이터 엔지니어링 분야 신규 채용 급증
4. 사이버보안 전문가 임금 상승률 20% 예상

이에 따라 해당 분야 경력자들의 취업 기회가 확대될 것으로 예상되며, 관련 교육과정 및 자격증 취득을 권장합니다.`,
        category: 'industry',
        author: '산업분석팀',
        publishedAt: '2025-01-23',
        views: 634,
        isImportant: false,
        tags: ['산업동향', '전망', '인력수요'],
        summary: '2025년 AI/ML, 클라우드, 데이터 분야 개발자 수요 급증 전망'
      },
      {
        id: '4',
        title: 'SW기술자 경력관리 세미나 개최 안내',
        content: `SW기술자들을 위한 경력관리 세미나를 개최합니다.

일시: 2025년 2월 15일 (토) 14:00-17:00
장소: 코엑스 컨퍼런스룸 A
참가비: 무료
대상: SW기술자, 예비 개발자, 기업 인사담당자

주요 프로그램:
1. 성공적인 경력관리 전략 (14:00-15:00)
2. 기술스택별 커리어 패스 (15:15-16:15)
3. 경력확인시스템 활용법 (16:30-17:00)

신청은 홈페이지에서 2월 10일까지 가능하며, 선착순 100명으로 제한됩니다.`,
        category: 'event',
        author: '교육팀',
        publishedAt: '2025-01-22',
        views: 445,
        isImportant: false,
        tags: ['세미나', '교육', '경력관리'],
        summary: 'SW기술자 경력관리 세미나 2월 15일 코엑스에서 개최'
      },
      {
        id: '5',
        title: '개인정보처리방침 개정 안내',
        content: `개인정보보호법 개정에 따라 개인정보처리방침이 개정되었습니다.

주요 변경사항:
1. 개인정보 수집 목적 명확화
2. 제3자 제공 기준 강화
3. 개인정보 보관기간 조정
4. 개인정보 삭제 요청 절차 간소화

개정된 방침은 2025년 2월 1일부터 적용되며, 기존 회원님들의 동의는 자동으로 연장됩니다.

자세한 내용은 개인정보처리방침 페이지에서 확인하실 수 있습니다.`,
        category: 'system',
        author: '법무팀',
        publishedAt: '2025-01-20',
        views: 312,
        isImportant: false,
        tags: ['개인정보', '정책', '개정'],
        summary: '개인정보처리방침 개정으로 개인정보 보호 강화'
      }
    ]
    
    setNews(dummyNews)
    setLoading(false)
  }, [])

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'system': return '시스템'
      case 'policy': return '정책'
      case 'industry': return '산업동향'
      case 'event': return '이벤트'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'bg-blue-100 text-blue-800'
      case 'policy': return 'bg-green-100 text-green-800'
      case 'industry': return 'bg-purple-100 text-purple-800'
      case 'event': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">뉴스 및 공지사항</h1>
        <p className="text-gray-600">SW기술자 관련 최신 뉴스와 시스템 공지사항을 확인하세요.</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="card mb-8">
        <div className="space-y-4">
          {/* 검색창 */}
          <div>
            <input
              type="text"
              placeholder="제목, 내용, 태그로 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full"
            />
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedCategory('system')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'system'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              시스템
            </button>
            <button
              onClick={() => setSelectedCategory('policy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'policy'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              정책
            </button>
            <button
              onClick={() => setSelectedCategory('industry')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'industry'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              산업동향
            </button>
            <button
              onClick={() => setSelectedCategory('event')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'event'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              이벤트
            </button>
          </div>
        </div>
      </div>

      {/* 중요 공지사항 */}
      {selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📌 중요 공지사항</h2>
          <div className="space-y-4">
            {news.filter(item => item.isImportant).map((item) => (
              <div key={item.id} className="card border-l-4 border-red-500 bg-red-50 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className="badge badge-danger">중요</span>
                      <span className={`badge ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{item.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>👤 {item.author}</span>
                      <span>📅 {formatDate(item.publishedAt)}</span>
                      <span>👁️ {item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 뉴스 목록 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">뉴스를 불러오는 중...</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? '전체 뉴스' : `${getCategoryLabel(selectedCategory)} 뉴스`}
            <span className="text-sm font-normal text-gray-600 ml-2">
              ({filteredNews.length}건)
            </span>
          </h2>
          
          {filteredNews.map((item) => (
            <article key={item.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <span className={`badge ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{item.summary}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>👤 {item.author}</span>
                      <span>📅 {formatDate(item.publishedAt)}</span>
                      <span>👁️ {item.views}</span>
                    </div>
                    <button className="btn-outline btn-sm">자세히 보기</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 구독 안내 */}
      <div className="mt-12 card bg-primary-50 border-primary-200">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-primary-900 mb-2">📧 뉴스레터 구독</h4>
          <p className="text-primary-800 mb-4">
            SW기술자 관련 최신 뉴스와 공지사항을 이메일로 받아보세요.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="form-input flex-1"
            />
            <button className="btn-primary">구독하기</button>
          </div>
          <p className="text-xs text-primary-700 mt-2">
            * 구독 기능은 현재 준비 중입니다.
          </p>
        </div>
      </div>
    </div>
  )
}