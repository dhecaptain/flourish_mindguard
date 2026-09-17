import { AuthForm } from '@/components/auth-form'
import Link from 'next/link'
import { TuliaLogo } from '@/components/tulia-logo'

export default function SignInPage() {
  return <main className="auth-page"><TuliaLogo /><section className="auth-card"><p className="eyebrow">A soft place to land</p><h1>Welcome back<span className="sun-dot">.</span></h1><p className="auth-intro">Your space is here whenever you are ready.</p><AuthForm mode="sign-in" /></section><Link className="auth-back" href="/">Back to Tulia</Link></main>
}
