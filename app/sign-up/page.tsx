import { AuthForm } from '@/components/auth-form'
import Link from 'next/link'

export default function SignUpPage() {
  return <main className="auth-page"><div className="auth-brand"><span>m</span><strong>tulia</strong></div><section className="auth-card"><p className="eyebrow">A space made for you</p><h1>Begin gently<span className="sun-dot">.</span></h1><p className="auth-intro">Create a private place for check-ins, reflection, and support.</p><AuthForm mode="sign-up" /></section><Link className="auth-back" href="/">Back to Tulia</Link></main>
}
