# SW기술자 경력관리시스템

SW기술자의 경력을 체계적으로 관리하고 확인하는 웹 시스템입니다.

## 🚀 주요 기능

- **경력 등록**: SW기술자의 경력 정보 등록 및 관리
- **경력 확인서 발급**: 등록된 경력 기반 확인서 자동 발급
- **사용자 인증**: 개인회원/기업회원 구분 인증 시스템
- **파일 관리**: 경력 증빙 서류 업로드 및 관리
- **공지사항**: 시스템 공지사항 및 정책 안내

## 🛠 기술 스택

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel

## 📦 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd career.sw.or.kr
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.example` 파일을 `.env.local`로 복사하고 필요한 값들을 설정하세요.

```bash
cp .env.example .env.local
```

필수 환경변수:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon 키
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role 키

### 4. 개발 서버 실행
```bash
npm run dev
```

http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 🗃 데이터베이스 설정

### Supabase 마이그레이션 실행
```bash
# 로컬 개발용
npx supabase start
npx supabase db reset

# 프로덕션용 (Supabase 대시보드에서 직접 실행)
# supabase/migrations/ 폴더의 SQL 파일들을 순서대로 실행
```

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # 인증 관련 페이지
│   ├── career/            # 경력 관리 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── auth/              # 인증 컴포넌트
│   ├── career/            # 경력 관련 컴포넌트
│   └── layout/            # 레이아웃 컴포넌트
├── lib/                   # 유틸리티 라이브러리
│   ├── supabase.ts        # Supabase 클라이언트
│   └── error-handler.ts   # 에러 처리
├── hooks/                 # 커스텀 React Hooks
├── types/                 # TypeScript 타입 정의
├── supabase/             # Supabase 설정 및 마이그레이션
│   ├── config.toml       # Supabase 설정
│   └── migrations/       # DB 마이그레이션 파일
└── public/               # 정적 파일
```

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 애플리케이션 실행
npm start

# 코드 린팅
npm run lint

# Supabase 타입 생성
npm run supabase:gen-types

# 테스트 데이터 삽입
npm run seed:test-data

# API 테스트
npm run test:apis
```

## 🚀 배포

### Vercel 배포
1. Vercel 계정에 프로젝트 연결
2. 환경변수 설정 (Vercel 대시보드)
3. 자동 배포 또는 수동 배포

### 환경변수 (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🔒 보안 설정

- **CORS**: API 엔드포인트별 CORS 설정
- **Headers**: 보안 헤더 설정 (CSP, X-Frame-Options 등)
- **환경변수**: 민감한 정보 환경변수 관리
- **Supabase RLS**: Row Level Security 정책 적용

## 📊 모니터링

- **에러 처리**: 구조화된 에러 로깅
- **성능 모니터링**: Next.js 빌드 번들 분석
- **사용자 활동**: Supabase를 통한 활동 로그

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 한국소프트웨어산업협회의 소유입니다.

## 📞 지원

문의사항이 있으시면 [한국소프트웨어산업협회](https://www.sw.or.kr)로 연락주시기 바랍니다.