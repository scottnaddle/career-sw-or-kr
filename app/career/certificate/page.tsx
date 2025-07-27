import { Metadata } from 'next'
import { SidebarLayout } from '@/components/layout/Layout'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import CertificateClient from '@/components/career/CertificateClient'

export const metadata: Metadata = {
  title: '확인서 발급 - SW기술자 경력관리시스템',
  description: '승인된 경력에 대한 확인서를 발급받으세요.',
}

export default function CertificatePage() {
  return (
    <SidebarLayout
      title="확인서 발급"
      description="승인된 경력에 대한 확인서를 발급받으세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '대시보드', href: '/dashboard' },
        { label: '확인서 발급' }
      ]}
      sidebar={<DashboardSidebar />}
    >
      <CertificateClient />
    </SidebarLayout>
  )
}