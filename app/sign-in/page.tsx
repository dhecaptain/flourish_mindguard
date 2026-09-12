import { AuthForm } from '@/components/auth-form'
import Link from 'next/link'

export default function SignInPage() {
  return <main className="auth-page"><div className="auth-brand"><span>m</span><strong>mindguard</strong></div><section className="auth-card"><p className="eyebrow">A soft place to land</p><h1>Welcome back<span className="sun-dot">.</span></h1><p className="auth-intro">Your space is here whenever you are ready.</p><AuthForm mode="sign-in" /></section><Link className="auth-back" href="/">Back to MindGuard</Link></main>
}
