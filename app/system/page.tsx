import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import SystemContent from '@/components/system/SystemContent'

export const metadata: Metadata = {
  title: '시스템 관리 - SW기술자 경력관리시스템',
  description: '시스템 설정 및 관리 페이지',
}

export default function SystemPage() {
  return (
    <Layout>
      <SystemContent />
    </Layout>
  )
}