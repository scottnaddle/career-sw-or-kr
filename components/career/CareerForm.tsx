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

export default function CareerForm({ careerId }: { careerId?: string }) {
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
    } catch (err) {
      console.error('경력 정보 저장 오류:', err)
      setError('경력 정보 저장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="career-form">
      <h2>{careerId ? '경력 정보 수정' : '경력 정보 등록'}</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-section">
        <h3>기본 정보</h3>
        
        <div className="form-group">
          <label htmlFor="company_name">회사명 *</label>
          <input
            type="text"
            id="company_name"
            {...register('company_name', { required: '회사명을 입력해주세요.' })}
            disabled={loading}
          />
          {errors.company_name && (
            <span className="error-text">{errors.company_name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="business_number">사업자번호</label>
          <input
            type="text"
            id="business_number"
            {...register('business_number')}
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_date">입사일 *</label>
            <input
              type="date"
              id="start_date"
              {...register('start_date', { required: '입사일을 입력해주세요.' })}
              disabled={loading}
            />
            {errors.start_date && (
              <span className="error-text">{errors.start_date.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="end_date">퇴사일</label>
            <input
              type="date"
              id="end_date"
              {...register('end_date')}
              disabled={loading || (document.getElementById('is_current') as HTMLInputElement)?.checked}
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              id="is_current"
              {...register('is_current')}
              disabled={loading}
            />
            현재 재직 중
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="position">직책/직급 *</label>
          <input
            type="text"
            id="position"
            {...register('position', { required: '직책/직급을 입력해주세요.' })}
            disabled={loading}
          />
          {errors.position && (
            <span className="error-text">{errors.position.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="department">부서</label>
          <input
            type="text"
            id="department"
            {...register('department')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="job_category">직무 분야 *</label>
          <select
            id="job_category"
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
            <span className="error-text">{errors.job_category.message}</span>
          )}
        </div>
      </div>

      <div className="form-section">
        <h3>직무 내용</h3>
        
        <div className="form-group">
          <label htmlFor="job_description">직무 설명 *</label>
          <textarea
            id="job_description"
            {...register('job_description', { required: '직무 설명을 입력해주세요.' })}
            rows={5}
            disabled={loading}
          />
          {errors.job_description && (
            <span className="error-text">{errors.job_description.message}</span>
          )}
        </div>
      </div>

      <div className="form-section">
        <h3>기술 스택</h3>
        
        <div className="form-group">
          <label htmlFor="tech-input">기술 추가</label>
          <div className="tech-input-group">
            <input
              type="text"
              id="tech-input"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              disabled={loading}
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
            >
              추가
            </button>
          </div>
          
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  disabled={loading}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>프로젝트</h3>
        
        <button
          type="button"
          onClick={addProject}
          disabled={loading}
          className="add-project-btn"
        >
          프로젝트 추가
        </button>
        
        {projects.map((project, index) => (
          <div key={index} className="project-form">
            <h4>프로젝트 {index + 1}</h4>
            
            <div className="form-group">
              <label>프로젝트명</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>설명</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                disabled={loading}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={project.start_date}
                  onChange={(e) => updateProject(index, 'start_date', e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label>종료일</label>
                <input
                  type="date"
                  value={project.end_date || ''}
                  onChange={(e) => updateProject(index, 'end_date', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => removeProject(index)}
              disabled={loading}
              className="remove-project-btn"
            >
              프로젝트 제거
            </button>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? '저장 중...' : (careerId ? '수정하기' : '등록하기')}
        </button>
        
        {careerId && (
          <button
            type="button"
            onClick={() => {
              reset()
              setTechnologies([])
              setProjects([])
            }}
            disabled={loading}
            className="reset-btn"
          >
            초기화
          </button>
        )}
      </div>
    </form>
  )
}