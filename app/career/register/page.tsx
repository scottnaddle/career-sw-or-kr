import { Metadata } from 'next'
import { SidebarLayout } from '@/components/layout/Layout'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import CareerForm from '@/components/career/CareerForm'

export const metadata: Metadata = {
  title: '경력 등록 - SW기술자 경력관리시스템',
  description: '새로운 SW기술자 경력 정보를 등록하세요.',
}

export default function CareerRegisterPage() {
  return (
    <SidebarLayout
      title="경력 등록"
      description="새로운 SW기술자 경력 정보를 등록하세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '대시보드', href: '/dashboard' },
        { label: '경력 등록' }
      ]}
      sidebar={<DashboardSidebar />}
    >
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="card-header">
            <h2 className="section-title">새 경력 등록</h2>
            <p className="text-gray-600">
              SW기술자 경력확인을 위한 경력 정보를 등록해주세요.
            </p>
          </div>
          <CareerForm />
        </div>
      </div>
    </SidebarLayout>
  )
}