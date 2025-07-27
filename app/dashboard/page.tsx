import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { SidebarLayout } from '@/components/layout/Layout'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardContent from '@/components/dashboard/DashboardContent'

export const metadata: Metadata = {
  title: '대시보드 - SW기술자 경력관리시스템',
  description: 'SW기술자 경력관리 대시보드',
}

export default function DashboardPage() {
  return (
    <SidebarLayout
      title="대시보드"
      description="경력 현황과 주요 정보를 한눈에 확인하세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '대시보드' }
      ]}
      sidebar={<DashboardSidebar />}
    >
      <DashboardContent />
    </SidebarLayout>
  )
}