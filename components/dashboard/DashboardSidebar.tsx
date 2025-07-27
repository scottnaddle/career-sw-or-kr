'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: '대시보드',
      href: '/dashboard',
      icon: '📊'
    },
    {
      title: '경력 관리',
      href: '/career/manage',
      icon: '💼'
    },
    {
      title: '경력 등록',
      href: '/career/register',
      icon: '➕'
    },
    {
      title: '확인서 발급',
      href: '/career/certificate',
      icon: '📜'
    },
    {
      title: '파일 관리',
      href: '/files',
      icon: '📁'
    },
    {
      title: '프로필 설정',
      href: '/profile',
      icon: '⚙️'
    }
  ]

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${
              pathname === item.href ? 'sidebar-link-active' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}