import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="footer-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="footer-info">
              <h4 className="text-lg font-semibold mb-4">SW기술자 경력관리시스템</h4>
              <div className="space-y-1 text-gray-300">
                <p>주소: 서울특별시 강남구 테헤란로</p>
                <p>전화: 02-1234-5678</p>
                <p>이메일: info@career.sw.or.kr</p>
              </div>
            </div>

            {/* Links */}
            <div className="footer-links">
              <h4 className="text-lg font-semibold mb-4">바로가기</h4>
              <ul className="grid grid-cols-2 gap-2 text-gray-300">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="hover:text-white transition-colors">
                    사이트맵
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    도움말
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom border-t border-gray-700 mt-8 pt-4">
          <p className="text-center text-gray-400 text-sm">
            &copy; 2024 SW기술자 경력관리시스템. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}