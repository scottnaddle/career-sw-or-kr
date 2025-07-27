import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: '로그인 - SW기술자 경력관리시스템',
  description: 'SW기술자 경력관리시스템에 로그인하세요.',
}

export default function LoginPage() {
  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-header">
            <h2 className="auth-title">
              로그인
            </h2>
            <p className="auth-subtitle">
              SW기술자 경력관리시스템에 로그인하세요
            </p>
          </div>
          
          <div className="auth-card">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}