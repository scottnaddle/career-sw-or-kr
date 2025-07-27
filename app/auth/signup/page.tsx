import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import SignupForm from '@/components/auth/SignupForm'

export const metadata: Metadata = {
  title: '회원가입 - SW기술자 경력관리시스템',
  description: 'SW기술자 경력관리시스템에 회원가입하세요.',
}

export default function SignupPage() {
  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-form max-w-2xl">
          <div className="auth-header">
            <h2 className="auth-title">
              회원가입
            </h2>
            <p className="auth-subtitle">
              SW기술자 경력관리시스템에 가입하여 경력을 체계적으로 관리하세요
            </p>
          </div>
          
          <div className="auth-card">
            <SignupForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}