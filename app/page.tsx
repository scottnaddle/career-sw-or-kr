import Link from 'next/link'
import Layout from '@/components/layout/Layout'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SW기술자 경력관리시스템
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              체계적인 SW기술자 경력 관리와 신뢰할 수 있는 경력 확인 서비스
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/career/register" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                경력 등록하기
              </Link>
              <Link 
                href="/system/overview" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                제도 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 SW기술자 경력관리시스템인가요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SW기술자의 경력을 체계적으로 관리하고 객관적으로 인증하여, 
              개인과 기업 모두에게 신뢰할 수 있는 경력 정보를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">객관적인 경력 인증</h3>
              <p className="text-gray-600">
                전문 심사를 통한 신뢰할 수 있는 SW기술자 경력 확인서 발급
              </p>
            </div>

            <div className="feature-card text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4">체계적인 경력 관리</h3>
              <p className="text-gray-600">
                경력 이력 자동 보관 및 통계 분석으로 경력 개발 방향 제시
              </p>
            </div>

            <div className="feature-card text-center p-8 rounded-lg bg-gray-50">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-4">기업 신뢰도 향상</h3>
              <p className="text-gray-600">
                검증된 인력 정보로 채용 효율성 증대 및 프로젝트 신뢰성 확보
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              간단한 5단계 프로세스
            </h2>
            <p className="text-lg text-gray-600">
              회원가입부터 경력확인서 발급까지, 쉽고 빠른 절차
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            {[
              { step: '1', title: '회원가입', desc: '개인/기업 회원가입' },
              { step: '2', title: '경력등록', desc: 'SW기술자 경력 정보 입력' },
              { step: '3', title: '서류제출', desc: '증빙서류 업로드' },
              { step: '4', title: '심사/승인', desc: '경력 정보 검토 및 승인' },
              { step: '5', title: '확인서발급', desc: '경력확인서 발급' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            SW기술자 경력관리시스템과 함께 체계적인 경력 관리를 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              무료 회원가입
            </Link>
            <Link 
              href="/help/faq" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">25,000+</div>
              <div className="text-gray-600">등록된 SW기술자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1,200+</div>
              <div className="text-gray-600">참여 기업</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">발급된 확인서</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">99.2%</div>
              <div className="text-gray-600">만족도</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}