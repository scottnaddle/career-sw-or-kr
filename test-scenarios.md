# SW기술자 경력관리시스템 종합 테스트 시나리오

## 🧪 테스트 환경
- **로컬 개발서버**: http://localhost:3001
- **배포 환경**: Netlify
- **테스트 일시**: 2025-01-27

## 📋 테스트 시나리오

### 1. 기본 사이트 접근성 테스트

#### 1.1 메인 페이지 로딩
- [ ] 홈페이지 정상 로딩
- [ ] 메타데이터 및 SEO 태그 확인
- [ ] 반응형 디자인 동작 확인

#### 1.2 네비게이션 테스트
- [ ] 헤더 메뉴 링크 동작
- [ ] 사이드바 메뉴 동작 (있는 경우)
- [ ] 푸터 링크 동작
- [ ] 브레드크럼 네비게이션

### 2. 인증 시스템 테스트

#### 2.1 회원가입 기능
- [ ] 회원가입 페이지 접근 (/auth/signup)
- [ ] 개인회원 가입 폼 동작
- [ ] 기업회원 가입 폼 동작
- [ ] 필수 입력 필드 검증
- [ ] 이메일 중복 검사
- [ ] 비밀번호 강도 검증
- [ ] 가입 완료 후 리다이렉트

#### 2.2 로그인 기능
- [ ] 로그인 페이지 접근 (/auth/login)
- [ ] 올바른 계정 로그인
- [ ] 잘못된 계정 로그인 에러 처리
- [ ] "로그인 상태 유지" 기능
- [ ] 비밀번호 재설정 링크

#### 2.3 로그아웃 및 세션 관리
- [ ] 로그아웃 기능
- [ ] 세션 만료 처리
- [ ] 인증이 필요한 페이지 접근 제한

### 3. 경력 관리 기능 테스트

#### 3.1 경력 등록
- [ ] 경력 등록 페이지 접근 (/career/register)
- [ ] 회사 정보 입력 폼
- [ ] 기간 설정 (시작일, 종료일)
- [ ] 현재 근무중 체크박스
- [ ] 직무 카테고리 선택
- [ ] 기술스택 입력
- [ ] 프로젝트 정보 입력
- [ ] 경력 저장 기능

#### 3.2 경력 조회
- [ ] 경력 대시보드 (/career/dashboard)
- [ ] 등록된 경력 목록 표시
- [ ] 경력 상세 정보 보기
- [ ] 경력 승인 상태 확인

#### 3.3 경력 관리
- [ ] 경력 관리 페이지 (/career/manage)
- [ ] 경력 수정 기능
- [ ] 경력 삭제 기능
- [ ] 경력 승인 요청
- [ ] 진행 상태별 필터링

#### 3.4 경력확인서 발급
- [ ] 확인서 발급 페이지 (/career/certificate)
- [ ] 발급 대상 경력 선택
- [ ] 확인서 종류 선택 (전체, 부분, 영문)
- [ ] 발급 목적 입력
- [ ] 결제 연동 (있는 경우)
- [ ] PDF 다운로드 기능

### 4. 파일 업로드 기능 테스트

#### 4.1 증빙 서류 업로드
- [ ] 파일 선택 인터페이스
- [ ] 허용 파일 형식 검증
- [ ] 파일 크기 제한 검증
- [ ] 업로드 진행률 표시
- [ ] 업로드 완료 확인

#### 4.2 업로드된 파일 관리
- [ ] 파일 목록 조회
- [ ] 파일 다운로드
- [ ] 파일 삭제
- [ ] 파일 미리보기 (가능한 경우)

### 5. API 엔드포인트 테스트

#### 5.1 Career API
- [ ] GET /api/careers - 경력 목록 조회
- [ ] POST /api/careers - 경력 등록
- [ ] GET /api/careers/[id] - 특정 경력 조회
- [ ] PUT /api/careers/[id] - 경력 수정
- [ ] DELETE /api/careers/[id] - 경력 삭제

#### 5.2 Notice API
- [ ] GET /api/notices - 공지사항 조회
- [ ] POST /api/notices - 공지사항 작성 (관리자)

#### 5.3 Upload API
- [ ] POST /api/upload - 파일 업로드
- [ ] 파일 크기 및 형식 검증
- [ ] 에러 응답 처리

### 6. UI/UX 품질 테스트

#### 6.1 디자인 일관성
- [ ] 색상 테마 일관성
- [ ] 폰트 및 타이포그래피
- [ ] 버튼 스타일 통일성
- [ ] 여백 및 레이아웃 정렬

#### 6.2 사용성 테스트
- [ ] 폼 입력 편의성
- [ ] 에러 메시지 명확성
- [ ] 로딩 상태 표시
- [ ] 성공/실패 피드백

#### 6.3 반응형 디자인
- [ ] 모바일 화면 (320px~)
- [ ] 태블릿 화면 (768px~)
- [ ] 데스크톱 화면 (1024px~)
- [ ] 터치 인터페이스 동작

### 7. 성능 및 접근성 테스트

#### 7.1 페이지 로딩 성능
- [ ] 첫 페이지 로딩 시간
- [ ] 이미지 최적화
- [ ] 번들 크기 적정성
- [ ] 캐싱 동작

#### 7.2 접근성 (a11y)
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] 색상 대비
- [ ] 대체 텍스트

### 8. 보안 테스트

#### 8.1 인증 보안
- [ ] JWT 토큰 관리
- [ ] CSRF 보호
- [ ] XSS 방지
- [ ] SQL Injection 방지

#### 8.2 데이터 보안
- [ ] 개인정보 암호화
- [ ] 파일 업로드 보안
- [ ] API 접근 권한
- [ ] 세션 보안

### 9. 에러 처리 테스트

#### 9.1 클라이언트 에러
- [ ] 404 페이지
- [ ] 500 에러 페이지
- [ ] 네트워크 에러 처리
- [ ] 폼 유효성 검사 에러

#### 9.2 서버 에러
- [ ] API 에러 응답
- [ ] 데이터베이스 연결 실패
- [ ] 타임아웃 처리
- [ ] 파일 업로드 실패

## 📊 테스트 결과 요약

### ✅ 정상 동작
- 

### ⚠️ 부분 동작 / 개선 필요
- 

### ❌ 오류 / 미구현
- 

### 🔧 긴급 수정 필요
- 

### 📝 개선 제안
- 

---

**테스트 수행자**: Claude Code
**최종 업데이트**: 2025-01-27