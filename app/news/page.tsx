import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import NewsContent from '@/components/news/NewsContent'

export const metadata: Metadata = {
  title: '뉴스 및 공지사항 - SW기술자 경력관리시스템',
  description: 'SW기술자 관련 뉴스와 시스템 공지사항을 확인하세요.',
}

export default function NewsPage() {
  return (
    <Layout>
      <NewsContent />
    </Layout>
  )
}