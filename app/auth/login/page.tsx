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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              로그인
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              SW기술자 경력관리시스템에 로그인하세요
            </p>
          </div>
          
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}