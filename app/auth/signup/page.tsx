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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              회원가입
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              SW기술자 경력관리시스템에 가입하세요
            </p>
          </div>
          
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <SignupForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}