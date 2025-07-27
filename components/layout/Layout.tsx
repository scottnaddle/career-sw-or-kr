'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// 사이드바가 있는 레이아웃
interface SidebarLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  title?: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function SidebarLayout({ 
  children, 
  sidebar, 
  title, 
  description,
  breadcrumbs 
}: SidebarLayoutProps) {
  return (
    <Layout>
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <div className="breadcrumb bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex space-x-2 text-sm text-gray-600">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">{'>'}</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-primary-600">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Page Header */}
      {(title || description) && (
        <section className="page-header bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
          </div>
        </section>
      )}

      {/* Content with Sidebar */}
      <section className="content-section flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {sidebar}
            <div className="main-content flex-1 min-w-0">
              {children}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}