-- Row Level Security (RLS) 정책 설정

-- RLS 활성화
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 사용자 프로필 정책
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 경력 정보 정책
CREATE POLICY "Users can view own careers" ON public.careers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own careers" ON public.careers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own careers" ON public.careers
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own careers" ON public.careers
    FOR DELETE USING (auth.uid() = user_id);

-- 파일 업로드 정책
CREATE POLICY "Users can view own files" ON public.uploaded_files
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" ON public.uploaded_files
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" ON public.uploaded_files
    FOR DELETE USING (auth.uid() = user_id);

-- 결제 내역 정책
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 경력확인서 정책
CREATE POLICY "Users can view own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates" ON public.certificates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 공지사항 정책 (모든 사용자 읽기 가능)
CREATE POLICY "Anyone can view published notices" ON public.notices
    FOR SELECT USING (published_at IS NOT NULL);

-- 자료실 정책 (모든 사용자 읽기 가능)
CREATE POLICY "Anyone can view downloads" ON public.downloads
    FOR SELECT TO authenticated USING (true);

-- 시스템 설정 정책 (읽기만 가능)
CREATE POLICY "Anyone can view system settings" ON public.system_settings
    FOR SELECT TO authenticated USING (true);

-- 활동 로그 정책
CREATE POLICY "Users can view own activity logs" ON public.activity_logs
    FOR SELECT USING (auth.uid() = user_id);