import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Shield, Users, BookOpen, BarChart3, ArrowLeft } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user || (session.user as any).role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <div className="brand-mark">
          <span>m</span>
        </div>
        <p className="brand-name">mindguard admin</p>
        <nav className="nav-links" aria-label="Admin navigation">
          <Link href="/admin" className="nav-link">
            <BarChart3 aria-hidden="true" />
            <span>Overview</span>
          </Link>
          <Link href="/admin/users" className="nav-link">
            <Users aria-hidden="true" />
            <span>Users</span>
          </Link>
          <Link href="/admin/activities" className="nav-link">
            <BookOpen aria-hidden="true" />
            <span>Activities</span>
          </Link>
        </nav>
        <div className="side-bottom">
          <Link href="/dashboard" className="nav-link">
            <ArrowLeft aria-hidden="true" />
            <span>Back to App</span>
          </Link>
          <div className="profile-chip">
            <div className="avatar">
              <Shield aria-hidden="true" style={{ width: 14 }} />
            </div>
            <div>
              <strong>{session.user.name || 'Admin'}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Admin Panel</span>
            <span className="breadcrumb-dot">/</span>
            <strong>Management</strong>
          </div>
        </header>
        <div className="content-wrap">{children}</div>
      </main>
    </div>
  )
}
