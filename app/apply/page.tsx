import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import ApplyContent from '@/components/apply/ApplyContent'

export const metadata: Metadata = {
  title: '채용정보 - SW기술자 경력관리시스템',
  description: 'SW기술자 채용정보 및 구인구직 서비스',
}

export default function ApplyPage() {
  return (
    <Layout>
      <ApplyContent />
    </Layout>
  )
}