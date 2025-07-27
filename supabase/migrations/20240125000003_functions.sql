-- 유용한 SQL 함수들

-- 공지사항 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_notice_view(notice_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.notices 
  SET view_count = view_count + 1 
  WHERE id = notice_id;
END;
$$;

-- 사용자 활동 로그 기록 함수
CREATE OR REPLACE FUNCTION log_user_activity(
  p_user_id UUID,
  p_action TEXT,
  p_target_type TEXT DEFAULT NULL,
  p_target_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.activity_logs (
    user_id,
    action,
    target_type,
    target_id,
    details,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_action,
    p_target_type,
    p_target_id,
    p_details,
    p_ip_address,
    p_user_agent
  );
END;
$$;

-- 경력확인서 번호 생성 함수
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  year_str TEXT;
  seq_num INTEGER;
  cert_number TEXT;
BEGIN
  year_str := EXTRACT(YEAR FROM NOW())::TEXT;
  
  -- 올해 발급된 확인서 개수 + 1
  SELECT COALESCE(MAX(CAST(SUBSTRING(certificate_number FROM 5 FOR 6) AS INTEGER)), 0) + 1
  INTO seq_num
  FROM public.certificates
  WHERE certificate_number LIKE year_str || '%';
  
  cert_number := year_str || LPAD(seq_num::TEXT, 6, '0');
  
  RETURN cert_number;
END;
$$;

-- 사용자 통계 정보 조회 함수
CREATE OR REPLACE FUNCTION get_user_statistics(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  career_count INTEGER;
  approved_count INTEGER;
  pending_count INTEGER;
  certificate_count INTEGER;
  total_experience_months INTEGER;
BEGIN
  -- 경력 건수
  SELECT COUNT(*) INTO career_count
  FROM public.careers
  WHERE user_id = p_user_id;
  
  -- 승인된 경력 건수
  SELECT COUNT(*) INTO approved_count
  FROM public.careers
  WHERE user_id = p_user_id AND status = 'approved';
  
  -- 심사중인 경력 건수
  SELECT COUNT(*) INTO pending_count
  FROM public.careers
  WHERE user_id = p_user_id AND status IN ('submitted', 'under_review');
  
  -- 발급된 확인서 건수
  SELECT COUNT(*) INTO certificate_count
  FROM public.certificates
  WHERE user_id = p_user_id;
  
  -- 총 경력 개월수 (승인된 경력만)
  SELECT COALESCE(SUM(
    CASE 
      WHEN end_date IS NOT NULL THEN 
        EXTRACT(YEAR FROM AGE(end_date, start_date)) * 12 + 
        EXTRACT(MONTH FROM AGE(end_date, start_date))
      ELSE 
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, start_date)) * 12 + 
        EXTRACT(MONTH FROM AGE(CURRENT_DATE, start_date))
    END
  ), 0)::INTEGER INTO total_experience_months
  FROM public.careers
  WHERE user_id = p_user_id AND status = 'approved';
  
  result := jsonb_build_object(
    'career_count', career_count,
    'approved_count', approved_count,
    'pending_count', pending_count,
    'certificate_count', certificate_count,
    'total_experience_months', total_experience_months,
    'total_experience_years', ROUND(total_experience_months / 12.0, 1)
  );
  
  RETURN result;
END;
$$;

-- 시스템 설정값 조회 함수
CREATE OR REPLACE FUNCTION get_system_setting(p_key TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  setting_value TEXT;
BEGIN
  SELECT setting_value INTO setting_value
  FROM public.system_settings
  WHERE setting_key = p_key;
  
  RETURN setting_value;
END;
$$;