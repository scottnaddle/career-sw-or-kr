'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { SidebarLayout } from '@/components/layout/Layout'
import { CareerSidebar } from '@/components/layout/Sidebar'
import { createSupabaseClient } from '@/lib/supabase-client'

interface CareerFormData {
  company_name: string
  position: string
  department: string
  start_date: string
  end_date: string
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship'
  responsibilities: string
  technologies: string
  project_description: string
  annual_salary: number
  is_current: boolean
}

export default function CareerRegisterPage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const supabase = createSupabaseClient()
  
  const [formData, setFormData] = useState<CareerFormData>({
    company_name: '',
    position: '',
    department: '',
    start_date: '',
    end_date: '',
    employment_type: 'full-time',
    responsibilities: '',
    technologies: '',
    project_description: '',
    annual_salary: 0,
    is_current: false
  })
  
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
      
      // 현재 근무 중이면 종료일을 비움
      if (name === 'is_current' && checked) {
        setFormData(prev => ({
          ...prev,
          end_date: ''
        }))
      }
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.company_name.trim()) {
      newErrors.company_name = '회사명을 입력해주세요.'
    }
    
    if (!formData.position.trim()) {
      newErrors.position = '직책을 입력해주세요.'
    }
    
    if (!formData.start_date) {
      newErrors.start_date = '시작일을 선택해주세요.'
    }
    
    if (!formData.is_current && !formData.end_date) {
      newErrors.end_date = '종료일을 선택해주세요.'
    }
    
    if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
      newErrors.end_date = '종료일은 시작일보다 늦어야 합니다.'
    }
    
    if (!formData.responsibilities.trim()) {
      newErrors.responsibilities = '담당 업무를 입력해주세요.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // 경력 정보 저장
      const { data: careerData, error: careerError } = await supabase
        .from('careers')
        .insert({
          user_id: user?.id,
          ...formData,
          status: 'pending'
        })
        .select()
        .single()
      
      if (careerError) throw careerError
      
      // 파일 업로드
      if (files.length > 0) {
        for (const file of files) {
          const fileName = `${Date.now()}-${file.name}`
          const filePath = `career-documents/${user?.id}/${fileName}`
          
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file)
          
          if (uploadError) throw uploadError
          
          // 파일 정보 저장
          const { error: fileError } = await supabase
            .from('career_files')
            .insert({
              career_id: careerData.id,
              file_name: file.name,
              file_path: filePath,
              file_size: file.size,
              file_type: file.type
            })
          
          if (fileError) throw fileError
        }
      }
      
      // 활동 로그 저장
      await supabase
        .from('activity_logs')
        .insert({
          user_id: user?.id,
          action: '경력 등록',
          details: {
            company_name: formData.company_name,
            position: formData.position
          }
        })
      
      alert('경력이 성공적으로 등록되었습니다. 심사 후 승인 여부를 알려드립니다.')
      router.push('/career/dashboard')
      
    } catch (error) {
      console.error('Error registering career:', error)
      alert('경력 등록 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <SidebarLayout 
        sidebar={<CareerSidebar />}
        title="경력 등록"
        description="로그인이 필요합니다"
      >
        <div className="text-center py-12">
          <p className="text-gray-600">로그인 후 이용하실 수 있습니다.</p>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout
      sidebar={<CareerSidebar />}
      title="경력 등록"
      description="새로운 SW기술자 경력 정보를 등록하세요"
      breadcrumbs={[
        { label: '홈', href: '/' },
        { label: '경력확인', href: '/career' },
        { label: '경력 등록' }
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">기본 정보</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.company_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="회사명을 입력하세요"
                />
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직책/직위 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.position ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="예: 시니어 소프트웨어 엔지니어"
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  부서
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="예: 개발팀, IT사업부"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  고용형태
                </label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="full-time">정규직</option>
                  <option value="part-time">비정규직</option>
                  <option value="contract">계약직</option>
                  <option value="internship">인턴</option>
                </select>
              </div>
            </div>
          </div>

          {/* 근무 기간 */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">근무 기간</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시작일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.start_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  종료일 {!formData.is_current && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  disabled={formData.is_current}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    formData.is_current ? 'bg-gray-100' : ''
                  } ${
                    errors.end_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">현재 근무 중</span>
              </label>
            </div>
          </div>

          {/* 업무 내용 */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">업무 내용</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당 업무 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.responsibilities ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="담당했던 주요 업무를 구체적으로 작성해주세요"
                />
                {errors.responsibilities && (
                  <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사용 기술
                </label>
                <textarea
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="사용한 프로그래밍 언어, 프레임워크, 도구 등을 입력해주세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트 설명
                </label>
                <textarea
                  name="project_description"
                  value={formData.project_description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="참여한 주요 프로젝트에 대해 설명해주세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연봉 (만원)
                </label>
                <input
                  type="number"
                  name="annual_salary"
                  value={formData.annual_salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* 증빙서류 */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">증빙서류</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                첨부파일
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                재직증명서, 경력증명서, 급여명세서 등 (PDF, 이미지, 문서 파일만 가능)
              </p>
              
              {files.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">선택된 파일:</p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '등록 중...' : '경력 등록'}
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  )
}