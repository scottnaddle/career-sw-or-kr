-- SW기술자 경력관리시스템 Supabase 스키마
-- PostgreSQL + Supabase 기준

-- 사용자 프로필 테이블 (auth.users와 연동)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    user_type TEXT CHECK (user_type IN ('individual', 'corporate')) NOT NULL DEFAULT 'individual',
    name TEXT NOT NULL,
    phone TEXT,
    birth_date DATE,
    gender TEXT CHECK (gender IN ('M', 'F')),
    
    -- 개인회원 추가 정보
    resident_number TEXT, -- 암호화된 주민번호
    address TEXT,
    education_level TEXT CHECK (education_level IN ('high_school', 'college', 'bachelor', 'master', 'doctor')),
    
    -- 기업회원 추가 정보
    company_name TEXT,
    business_number TEXT,
    company_address TEXT,
    representative_name TEXT,
    company_size TEXT CHECK (company_size IN ('large', 'medium', 'small', 'startup')),
    
    -- 공통 필드
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    status TEXT CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 경력 정보 테이블
CREATE TABLE public.careers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    business_number TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    position TEXT NOT NULL,
    department TEXT,
    job_category TEXT CHECK (job_category IN ('development', 'analysis', 'design', 'test', 'maintenance', 'consulting', 'management')) NOT NULL,
    job_description TEXT NOT NULL,
    technologies JSONB DEFAULT '[]', -- 사용 기술 배열
    projects JSONB DEFAULT '[]', -- 프로젝트 정보 배열
    
    -- 심사 관련
    status TEXT CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected')) DEFAULT 'draft',
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewer_id UUID,
    review_comment TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 파일 업로드 테이블
CREATE TABLE public.uploaded_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    career_id UUID REFERENCES public.careers(id) ON DELETE CASCADE,
    original_name TEXT NOT NULL,
    stored_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_type TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    category TEXT CHECK (category IN ('identity', 'education', 'career_cert', 'work_confirm', 'portfolio', 'other')) NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 결제 내역 테이블
CREATE TABLE public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    order_id TEXT UNIQUE NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('card', 'bank_transfer', 'virtual_account', 'mobile')) NOT NULL,
    service_type TEXT CHECK (service_type IN ('career_register', 'certificate_issue', 'annual_fee', 'expedited_service')) NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')) DEFAULT 'pending',
    
    -- PG사 정보
    pg_provider TEXT,
    pg_transaction_id TEXT,
    pg_response JSONB, -- PG사 응답 JSON
    
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 경력확인서 발급 내역 테이블
CREATE TABLE public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    certificate_type TEXT CHECK (certificate_type IN ('total', 'partial', 'english')) NOT NULL DEFAULT 'total',
    purpose TEXT,
    career_ids JSONB DEFAULT '[]', -- 선택된 경력 ID들
    certificate_number TEXT UNIQUE NOT NULL,
    
    -- 파일 정보
    file_path TEXT,
    file_name TEXT,
    
    payment_id UUID REFERENCES public.payments(id),
    issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공지사항 테이블
CREATE TABLE public.notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT CHECK (category IN ('system', 'policy', 'feature', 'fee', 'maintenance')) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_important BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    author TEXT DEFAULT '관리자',
    
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 자료실 테이블
CREATE TABLE public.downloads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT CHECK (category IN ('forms', 'guides', 'samples', 'legal')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    download_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 시스템 설정 테이블
CREATE TABLE public.system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 활동 로그 테이블
CREATE TABLE public.activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT, -- 'user', 'career', 'payment' etc.
    target_id UUID,
    details JSONB, -- 상세 정보 JSON
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_user_profiles_user_type ON public.user_profiles(user_type);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);

CREATE INDEX idx_careers_user_id ON public.careers(user_id);
CREATE INDEX idx_careers_status ON public.careers(status);
CREATE INDEX idx_careers_company ON public.careers(company_name);

CREATE INDEX idx_uploaded_files_user_id ON public.uploaded_files(user_id);
CREATE INDEX idx_uploaded_files_career_id ON public.uploaded_files(career_id);
CREATE INDEX idx_uploaded_files_category ON public.uploaded_files(category);

CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_status ON public.payments(status);

CREATE INDEX idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX idx_certificates_number ON public.certificates(certificate_number);

CREATE INDEX idx_notices_category ON public.notices(category);
CREATE INDEX idx_notices_published ON public.notices(published_at);
CREATE INDEX idx_notices_important ON public.notices(is_important);

CREATE INDEX idx_downloads_category ON public.downloads(category);

CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON public.activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON public.careers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_downloads_updated_at BEFORE UPDATE ON public.downloads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 기본 데이터 삽입
INSERT INTO public.system_settings (setting_key, setting_value, description) VALUES
('career_registration_fee', '25000', '경력등록 수수료'),
('annual_management_fee', '5000', '연간 관리비'),
('certificate_basic_fee', '2000', '기본 확인서 발급비'),
('certificate_english_fee', '5000', '영문 확인서 발급비'),
('max_file_size', '10485760', '최대 파일 크기 (10MB)'),
('allowed_file_types', '["pdf","jpg","jpeg","png","doc","docx"]', '허용 파일 형식');