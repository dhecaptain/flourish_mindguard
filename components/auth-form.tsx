'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const result = isSignUp
      ? await authClient.signUp.email({ name: name.trim(), email, password })
      : await authClient.signIn.email({ email, password })
    if (result.error) setError('We could not complete that request. Please check your details and try again.')
    else { router.push('/dashboard'); router.refresh() }
    setPending(false)
  }

  return <form className="auth-form" onSubmit={submit}>
    {isSignUp && <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>}
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
    <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={isSignUp ? 'new-password' : 'current-password'} /></label>
    {error && <p className="auth-error" role="alert">{error}</p>}
    <button className="primary-button auth-submit" type="submit" disabled={pending}>{pending ? 'Opening your space…' : isSignUp ? 'Create my space' : 'Continue to Tulia'}</button>
    <p className="auth-switch">{isSignUp ? 'Already have an account?' : 'New to Tulia?'} <Link href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Sign in' : 'Create an account'}</Link></p>
  </form>
}
