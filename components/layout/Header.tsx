'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="header bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="logo">
            <Link href="/" className="text-xl font-bold text-primary-600 hover:text-primary-700">
              SW기술자 경력관리시스템
            </Link>
          </div>

          {/* Navigation */}
          <nav className="nav hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/career" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  경력확인
                </Link>
              </li>
              <li>
                <Link 
                  href="/system" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  제도안내
                </Link>
              </li>
              <li>
                <Link 
                  href="/apply" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  신청절차
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  소식·공지
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  도움말
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="login-section flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  안녕하세요, {profile?.name}님
                </span>
                <Link 
                  href="/dashboard" 
                  className="btn-secondary text-sm"
                >
                  대시보드
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="btn-primary text-sm"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/auth/login" 
                  className="btn-secondary text-sm"
                >
                  로그인
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="btn-primary text-sm"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}