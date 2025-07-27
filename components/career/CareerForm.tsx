'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

type CareerFormData = {
  company_name: string
  business_number?: string
  start_date: string
  end_date?: string
  is_current: boolean
  position: string
  department?: string
  job_category: 'development' | 'analysis' | 'design' | 'test' | 'maintenance' | 'consulting' | 'management'
  job_description: string
  technologies: string[]
  projects: {
    name: string
    description: string
    start_date: string
    end_date?: string
  }[]
}

interface CareerFormProps {
  careerId?: string | null
  onSuccess?: () => void
}

export default function CareerForm({ careerId, onSuccess }: CareerFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [technologies, setTechnologies] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')
  const [projects, setProjects] = useState<CareerFormData['projects']>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CareerFormData>({
    defaultValues: {
      is_current: false,
      job_category: 'development',
      technologies: [],
      projects: []
    }
  })

  // 기존 경력 정보 로드 (수정 모드일 경우)
  // useEffect(() => {
  //   if (careerId && user) {
  //     loadCareerData()
  //   }
  // }, [careerId, user])

  // const loadCareerData = async () => {
  //   if (!user) return
  //   
  //   try {
  //     const { data, error } = await supabase
  //       .from('careers')
  //       .select('*')
  //       .eq('id', careerId)
  //       .eq('user_id', user.id)
  //       .single()
  //     
  //     if (error) throw error
  //     
  //     if (data) {
  //       reset(data)
  //       setTechnologies(data.technologies || [])
  //       setProjects(data.projects || [])
  //     }
  //   } catch (err) {
  //     console.error('경력 정보 로드 오류:', err)
  //     setError('경력 정보를 불러오는데 실패했습니다.')
  //   }
  // }

  // 기술 추가
  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      const newTechnologies = [...technologies, techInput.trim()]
      setTechnologies(newTechnologies)
      setValue('technologies', newTechnologies)
      setTechInput('')
    }
  }

  // 기술 제거
  const removeTechnology = (tech: string) => {
    const newTechnologies = technologies.filter(t => t !== tech)
    setTechnologies(newTechnologies)
    setValue('technologies', newTechnologies)
  }

  // 프로젝트 추가
  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: '',
        description: '',
        start_date: '',
        end_date: ''
      }
    ])
  }

  // 프로젝트 업데이트
  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    }
    setProjects(updatedProjects)
    setValue('projects', updatedProjects)
  }

  // 프로젝트 제거
  const removeProject = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    setProjects(updatedProjects)
    setValue('projects', updatedProjects)
  }

  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const careerData = {
        ...data,
        user_id: user.id,
        technologies,
        projects
      }

      let result
      if (careerId) {
        // 경력 수정
        const { data, error } = await supabase
          .from('careers')
          .update(careerData)
          .eq('id', careerId)
          .eq('user_id', user.id)
          .select()
          .single()
        
        if (error) throw error
        result = data
      } else {
        // 경력 등록
        const { data, error } = await supabase
          .from('careers')
          .insert(careerData)
          .select()
          .single()
        
        if (error) throw error
        result = data
      }

      console.log('경력 정보 저장 완료:', result)
      alert(careerId ? '경력 정보가 수정되었습니다.' : '경력 정보가 등록되었습니다.')
      
      // 폼 초기화
      reset()
      setTechnologies([])
      setProjects([])
      
      // 성공 콜백 호출
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error('경력 정보 저장 오류:', err)
      setError('경력 정보 저장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
        
        <div>
          <label htmlFor="company_name" className="form-label">
            회사명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company_name"
            className="form-input"
            {...register('company_name', { required: '회사명을 입력해주세요.' })}
            disabled={loading}
          />
          {errors.company_name && (
            <p className="form-error">{errors.company_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="business_number" className="form-label">
            사업자번호
          </label>
          <input
            type="text"
            id="business_number"
            className="form-input"
            {...register('business_number')}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_date" className="form-label">
              입사일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="start_date"
              className="form-input"
              {...register('start_date', { required: '입사일을 입력해주세요.' })}
              disabled={loading}
            />
            {errors.start_date && (
              <p className="form-error">{errors.start_date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="end_date" className="form-label">
              퇴사일
            </label>
            <input
              type="date"
              id="end_date"
              className="form-input"
              {...register('end_date')}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_current"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            {...register('is_current')}
            disabled={loading}
          />
          <label htmlFor="is_current" className="ml-2 block text-sm text-gray-900">
            현재 재직 중
          </label>
        </div>

        <div>
          <label htmlFor="position" className="form-label">
            직책/직급 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="position"
            className="form-input"
            {...register('position', { required: '직책/직급을 입력해주세요.' })}
            disabled={loading}
          />
          {errors.position && (
            <p className="form-error">{errors.position.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="department" className="form-label">
            부서
          </label>
          <input
            type="text"
            id="department"
            className="form-input"
            {...register('department')}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="job_category" className="form-label">
            직무 분야 <span className="text-red-500">*</span>
          </label>
          <select
            id="job_category"
            className="form-input"
            {...register('job_category', { required: '직무 분야를 선택해주세요.' })}
            disabled={loading}
          >
            <option value="development">개발</option>
            <option value="analysis">분석</option>
            <option value="design">디자인</option>
            <option value="test">테스트</option>
            <option value="maintenance">유지보수</option>
            <option value="consulting">컨설팅</option>
            <option value="management">관리</option>
          </select>
          {errors.job_category && (
            <p className="form-error">{errors.job_category.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">직무 내용</h3>
        
        <div>
          <label htmlFor="job_description" className="form-label">
            직무 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="job_description"
            className="form-input"
            {...register('job_description', { required: '직무 설명을 입력해주세요.' })}
            rows={5}
            disabled={loading}
          />
          {errors.job_description && (
            <p className="form-error">{errors.job_description.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
        
        <div>
          <label htmlFor="tech-input" className="form-label">
            기술 추가
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="tech-input"
              className="form-input flex-1"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              disabled={loading}
              placeholder="예: React, TypeScript, Node.js"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTechnology()
                }
              }}
            />
            <button
              type="button"
              onClick={addTechnology}
              disabled={loading}
              className="btn-secondary"
            >
              추가
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  disabled={loading}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">프로젝트</h3>
          <button
            type="button"
            onClick={addProject}
            disabled={loading}
            className="btn-secondary"
          >
            프로젝트 추가
          </button>
        </div>
        
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">프로젝트 {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
                disabled={loading}
                className="btn-danger btn-sm"
              >
                제거
              </button>
            </div>
            
            <div>
              <label className="form-label">프로젝트명</label>
              <input
                type="text"
                className="form-input"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="form-label">설명</label>
              <textarea
                className="form-input"
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                disabled={loading}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">시작일</label>
                <input
                  type="date"
                  className="form-input"
                  value={project.start_date}
                  onChange={(e) => updateProject(index, 'start_date', e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="form-label">종료일</label>
                <input
                  type="date"
                  className="form-input"
                  value={project.end_date || ''}
                  onChange={(e) => updateProject(index, 'end_date', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <div>
          {careerId && (
            <button
              type="button"
              onClick={() => {
                reset()
                setTechnologies([])
                setProjects([])
              }}
              disabled={loading}
              className="btn-outline"
            >
              초기화
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center"
        >
          {loading ? (
            <>
              <div className="loading-spinner-sm mr-2"></div>
              저장 중...
            </>
          ) : (
            careerId ? '수정하기' : '등록하기'
          )}
        </button>
      </div>
    </form>
  )
}