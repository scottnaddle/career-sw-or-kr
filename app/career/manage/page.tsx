import { Metadata } from 'next'
import { SidebarLayout } from '@/components/layout/Layout'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import CareerManageClient from '@/components/career/CareerManageClient'

export const metadata: Metadata = {
  title: '경력 관리 - SW기술자 경력관리시스템',
  description: '등록된 경력 정보를 관리하고 수정하세요.',
}

export default function CareerManagePage() {
  return (
    <SidebarLayout
      title="경력 관리"
      description="등록된 경력 정보를 관리하고 수정하세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '대시보드', href: '/dashboard' },
        { label: '경력 관리' }
      ]}
      sidebar={<DashboardSidebar />}
    >
      <CareerManageClient />
    </SidebarLayout>
  )
}