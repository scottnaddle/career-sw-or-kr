import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://career.sw.or.kr'),
  title: {
    default: 'SW기술자 경력관리시스템',
    template: '%s | SW기술자 경력관리시스템'
  },
  description: 'SW기술자의 경력을 체계적으로 관리하고 확인하는 시스템입니다. 경력등록, 확인서 발급, 경력 관리 서비스를 제공합니다.',
  keywords: ['SW기술자', '경력관리', '경력확인', '소프트웨어', '경력등록', '확인서발급', '한국소프트웨어산업협회'],
  authors: [{ name: '한국소프트웨어산업협회' }],
  creator: '한국소프트웨어산업협회',
  publisher: '한국소프트웨어산업협회',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://career.sw.or.kr',
    siteName: 'SW기술자 경력관리시스템',
    title: 'SW기술자 경력관리시스템',
    description: 'SW기술자의 경력을 체계적으로 관리하고 확인하는 시스템입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW기술자 경력관리시스템',
    description: 'SW기술자의 경력을 체계적으로 관리하고 확인하는 시스템입니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}