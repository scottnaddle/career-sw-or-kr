'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'individual' as 'individual' | 'corporate',
    phone: '',
    // 기업회원 추가 필드
    companyName: '',
    businessNumber: '',
    representativeName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signUp } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      setLoading(false)
      return
    }

    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        user_type: formData.userType,
        phone: formData.phone
      })
      
      alert('회원가입이 완료되었습니다. 이메일 인증을 완료해주세요.')
      router.push('/auth/login')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="userType" className="form-label">
            회원 유형
          </label>
          <select
            name="userType"
            className="form-input"
            value={formData.userType}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="individual">개인회원 (SW기술자)</option>
            <option value="corporate">기업회원</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            이메일 주소
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="8자 이상 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {formData.userType === 'individual' ? '이름' : '담당자명'}
            </label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder={formData.userType === 'individual' ? '이름을 입력하세요' : '담당자명을 입력하세요'}
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              연락처
            </label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* 기업회원 추가 필드 */}
        {formData.userType === 'corporate' && (
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900">기업 정보</h3>
            
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">
                회사명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                className="form-input"
                placeholder="회사명을 입력하세요"
                value={formData.companyName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="businessNumber" className="form-label">
                  사업자등록번호
                </label>
                <input
                  type="text"
                  name="businessNumber"
                  className="form-input"
                  placeholder="000-00-00000"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="representativeName" className="form-label">
                  대표자명
                </label>
                <input
                  type="text"
                  name="representativeName"
                  className="form-input"
                  placeholder="대표자명을 입력하세요"
                  value={formData.representativeName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="loading-spinner-sm mr-2"></div>
                가입 중...
              </>
            ) : (
              '회원가입'
            )}
          </button>
        </div>
      </form>

      <div className="auth-links">
        <div className="text-center">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <a href="/auth/login" className="auth-link">
            로그인
          </a>
        </div>
      </div>
    </div>
  )
}