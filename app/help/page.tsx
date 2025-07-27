import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import HelpContent from '@/components/help/HelpContent'

export const metadata: Metadata = {
  title: '도움말 및 고객지원 - SW기술자 경력관리시스템',
  description: 'SW기술자 경력관리시스템 사용법과 자주 묻는 질문을 확인하세요.',
}

export default function HelpPage() {
  return (
    <Layout>
      <HelpContent />
    </Layout>
  )
}