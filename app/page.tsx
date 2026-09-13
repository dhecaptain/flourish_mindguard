import Link from 'next/link'
import { ArrowUpRight, BookOpen, Leaf, MessageCircle, Sparkles } from 'lucide-react'

const pillars = [
  { title: 'Ward', text: 'A thoughtful chat companion for whatever you are carrying.', icon: MessageCircle },
  { title: 'Journal', text: 'A private place to put honest moments into words.', icon: BookOpen },
  { title: 'Explore', text: 'Guided practices for breathing, rest, movement, and reflection.', icon: Leaf },
  { title: 'Insights', text: 'Gentle patterns that help you notice what supports you.', icon: Sparkles },
]

function WardOrb() {
  return <div className="ward-orb" aria-label="Ward"><div className="ward-halo" /><div className="ward-body"><div className="ward-face"><span className="ward-eye" /><span className="ward-eye" /><span className="ward-smile" /></div></div></div>
}

export default function LandingPage() {
  return <main className="landing-page">
    <div className="landing-nav"><div className="auth-brand"><span>m</span> mindguard</div><Link className="auth-back" href="/sign-in">Sign in</Link></div>
    <section className="ward-hero landing-hero"><div className="hero-copy"><span className="hero-label"><Sparkles aria-hidden="true" /> A SOFT PLACE TO LAND</span><h1>Make room for your whole self.</h1><p>MindGuard helps you check in, reflect, and find a little more steadiness — one small moment at a time.</p><div className="landing-actions"><Link className="primary-button" href="/sign-up">Create your space <ArrowUpRight aria-hidden="true" /></Link><Link className="outline-button" href="/sign-in">I already have an account</Link></div></div><WardOrb /></section>
    <section className="landing-pillars"><div><p className="eyebrow">A gentler way forward</p><h2>Support for the moments in between.</h2></div><div className="resource-grid">{pillars.map(({ title, text, icon: Icon }) => <article className="resource-card resource-sage" key={title}><div className="resource-icon"><Icon aria-hidden="true" /></div><span className="activity-tag">{title.toUpperCase()}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  </main>
}
