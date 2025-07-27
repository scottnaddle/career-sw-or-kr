'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface SidebarProps {
  title: string
  children: ReactNode
}

interface SidebarMenuProps {
  items: {
    label: string
    href: string
    icon?: string
  }[]
}

export function Sidebar({ title, children }: SidebarProps) {
  return (
    <div className="sidebar w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export function SidebarMenu({ items }: SidebarMenuProps) {
  const pathname = usePathname()

  return (
    <ul className="sidebar-menu space-y-1">
      {items.map((item, index) => {
        const isActive = pathname === item.href
        
        return (
          <li key={index}>
            <Link
              href={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {item.icon && (
                <span className="mr-3 text-lg">{item.icon}</span>
              )}
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// 경력확인 사이드바
export function CareerSidebar() {
  const items = [
    { label: '개인 대시보드', href: '/career/dashboard', icon: '📊' },
    { label: '경력 등록', href: '/career/register', icon: '➕' },
    { label: '경력 관리', href: '/career/manage', icon: '📋' },
    { label: '확인서 발급', href: '/career/certificate', icon: '📄' },
    { label: '경력 이력', href: '/career/history', icon: '📈' },
  ]

  return (
    <Sidebar title="경력확인">
      <SidebarMenu items={items} />
    </Sidebar>
  )
}

// 제도안내 사이드바
export function SystemSidebar() {
  const items = [
    { label: '제도 개요', href: '/system/overview', icon: '🎯' },
    { label: '기술자 정의', href: '/system/qualification', icon: '👤' },
    { label: '제도 혜택', href: '/system/benefits', icon: '🎁' },
    { label: '신청 요건', href: '/system/requirements', icon: '📋' },
    { label: '경력 관리', href: '/system/management', icon: '⚙️' },
  ]

  return (
    <Sidebar title="제도안내">
      <SidebarMenu items={items} />
    </Sidebar>
  )
}

// 신청절차 사이드바
export function ApplySidebar() {
  const items = [
    { label: '신청 절차', href: '/apply/process', icon: '📝' },
    { label: '제출 서류', href: '/apply/documents', icon: '📎' },
    { label: '기업회원 서비스', href: '/apply/corporate', icon: '🏢' },
    { label: '수수료 안내', href: '/apply/fees', icon: '💰' },
    { label: '처리 기간', href: '/apply/timeline', icon: '⏰' },
  ]

  return (
    <Sidebar title="신청절차">
      <SidebarMenu items={items} />
    </Sidebar>
  )
}

// 소식·공지 사이드바
export function NewsSidebar() {
  const items = [
    { label: '공지사항', href: '/news/notices', icon: '📢' },
    { label: '자료실', href: '/news/downloads', icon: '📁' },
    { label: '뉴스레터', href: '/news/newsletter', icon: '📧' },
    { label: '시스템 업데이트', href: '/news/updates', icon: '🔄' },
    { label: '행사/이벤트', href: '/news/events', icon: '🎉' },
  ]

  return (
    <Sidebar title="소식·공지">
      <SidebarMenu items={items} />
    </Sidebar>
  )
}

// 도움말 사이드바
export function HelpSidebar() {
  const items = [
    { label: '자주 묻는 질문', href: '/help/faq', icon: '❓' },
    { label: '이용 가이드', href: '/help/guide', icon: '📖' },
    { label: '회사 찾기', href: '/help/company-search', icon: '🔍' },
    { label: '문의하기', href: '/help/contact', icon: '💬' },
    { label: '원격 지원', href: '/help/remote-support', icon: '🖥️' },
  ]

  return (
    <Sidebar title="도움말">
      <SidebarMenu items={items} />
    </Sidebar>
  )
}