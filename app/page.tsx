import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Heart,
  HelpCircle,
  Leaf,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  UserCheck,
  Wind,
} from 'lucide-react'

const features = [
  {
    title: 'Ward — AI Companion',
    badge: 'ALWAYS HERE',
    description:
      'A gentle, non-judgmental conversational space whenever you need to process feelings or slow down.',
    details: [
      'Empathetic, soothing conversational responses',
      'Crisis safety detection with instant human support links',
      'Available 24/7 with total privacy boundary',
    ],
    icon: MessageCircle,
    colorClass: 'resource-sage',
  },
  {
    title: 'Private Journal',
    badge: 'PRIVATE TO YOU',
    description:
      'Express your honest thoughts freely without formatting pressure or fear of oversight.',
    details: [
      'Zero-pressure reflection space',
      'Tag entries with how you feel',
      'Admins can NEVER access your personal journal',
    ],
    icon: BookOpen,
    colorClass: 'resource-peach',
  },
  {
    title: 'Explore Library',
    badge: 'EVIDENCE-INFORMED',
    description:
      'Curated grounding practices for breathing, mindfulness, movement, and restful sleep.',
    details: [
      'Quick 2–10 minute guided exercises',
      'Save your favorite practices',
      'Track completions to build healthy habits',
    ],
    icon: Leaf,
    colorClass: 'resource-sage',
  },
  {
    title: 'Gentle Insights',
    badge: 'RHYTHM & PATTERNS',
    description:
      'Notice subtle mood patterns over time with warm weekly summaries and visual check-in graphs.',
    details: [
      '7-day mood rhythm visualization',
      'Weekly summaries written by Ward',
      'Zero clinical labels or judgmental metrics',
    ],
    icon: Sparkles,
    colorClass: 'resource-lavender',
  },
]

const steps = [
  {
    num: '01',
    title: 'Check in daily',
    text: 'Tap how you feel in one quick moment — no long forms or rating scales required.',
  },
  {
    num: '02',
    title: 'Reflect or practice',
    text: 'Chat with Ward, jot down a private entry, or practice a 3-minute breathwork routine.',
  },
  {
    num: '03',
    title: 'Notice your rhythm',
    text: 'Watch your steady streak grow and discover gentle patterns supporting your wellbeing.',
  },
]

const privacyHighlights = [
  {
    title: 'Strict Privacy Boundary',
    desc: 'Your journal entries and Ward conversations are strictly private. Admins cannot read your content.',
    icon: Lock,
  },
  {
    title: 'Non-Clinical & Grounded',
    desc: 'MindGuard does not diagnose. It provides immediate human crisis links whenever urgent support is needed.',
    icon: ShieldCheck,
  },
  {
    title: 'You Own Your Data',
    desc: 'Delete your account and all associated reflections instantly at any time with one click.',
    icon: UserCheck,
  },
]

const faqs = [
  {
    q: 'Is MindGuard free to use?',
    a: 'Yes, MindGuard is free for personal daily wellness tracking, journal writing, and chatting with Ward.',
  },
  {
    q: 'Can anyone else read my journal or messages with Ward?',
    a: 'No. We enforce a strict privacy boundary. Admins only see aggregate statistics (like total check-ins) and can never access personal entries or messages.',
  },
  {
    q: 'Can MindGuard replace a therapist or clinical care?',
    a: 'MindGuard is a gentle companion for mindfulness and self-reflection. It is not clinical treatment, but includes instant crisis hotline links if you ever need human support.',
  },
]

function WardOrb() {
  return (
    <div className="ward-orb" aria-label="Ward companion orb">
      <div className="ward-halo" />
      <div className="ward-body">
        <div className="ward-face">
          <span className="ward-eye" />
          <span className="ward-eye" />
          <span className="ward-smile" />
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="landing-page">
      {/* Top Navbar */}
      <nav className="landing-nav">
        <div className="auth-brand">
          <span>m</span> mindguard
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link className="auth-back" href="/sign-in">
            Sign in
          </Link>
          <Link className="primary-button" style={{ marginTop: 0 }} href="/sign-up">
            Get Started free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="ward-hero landing-hero" style={{ minHeight: '440px', marginBottom: '80px' }}>
        <div className="hero-copy" style={{ maxWidth: '540px' }}>
          <span className="hero-label">
            <Sparkles aria-hidden="true" /> A SOFT PLACE TO LAND
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 62px)', lineHeight: 1.08, marginTop: '16px' }}>
            Make room for your whole self.
          </h1>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#5f7566', marginTop: '16px' }}>
            MindGuard is your private companion for daily check-ins, journal reflections, and guided mindfulness practices — designed to bring steadiness to your day.
          </p>
          <div className="landing-actions" style={{ gap: '14px', marginTop: '28px' }}>
            <Link className="primary-button" href="/sign-up" style={{ padding: '14px 22px', fontSize: '13px' }}>
              Create your free space <ArrowRight size={16} />
            </Link>
            <Link className="outline-button" href="/sign-in" style={{ padding: '14px 22px', fontSize: '13px' }}>
              I already have an account
            </Link>
          </div>
        </div>
        <WardOrb />
      </section>

      {/* Feature Showcase Grid */}
      <section className="landing-pillars" style={{ marginBottom: '90px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="eyebrow" style={{ letterSpacing: '.18em' }}>
            THOUGHTFUL WELLBEING TOOLS
          </p>
          <h2 style={{ fontSize: '36px', color: '#294536', margin: '8px 0 12px' }}>
            Everything you need to nurture inner peace.
          </h2>
          <p style={{ color: '#748078', maxWidth: '560px', margin: '0 auto', fontSize: '14px' }}>
            Built with warmth and privacy at the core, helping you notice patterns and cultivate daily mindfulness.
          </p>
        </div>

        <div className="resource-grid" style={{ gap: '24px' }}>
          {features.map(({ title, badge, description, details, icon: Icon, colorClass }) => (
            <article
              className={`resource-card ${colorClass}`}
              key={title}
              style={{ padding: '28px', minHeight: '260px', borderRadius: '20px' }}
            >
              <div className="resource-top" style={{ marginBottom: '14px' }}>
                <div className="resource-icon" style={{ width: '42px', height: '42px' }}>
                  <Icon size={20} />
                </div>
                <span className="activity-tag" style={{ background: '#ffffff88', padding: '4px 9px', borderRadius: '6px' }}>
                  {badge}
                </span>
              </div>
              <h3 style={{ fontSize: '24px', margin: '12px 0 8px', color: '#294536' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#66776b', lineHeight: 1.6, minHeight: 'auto', marginBottom: '16px' }}>
                {description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {details.map((detail) => (
                  <li key={detail} style={{ fontSize: '12px', color: '#4a6352', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} style={{ color: '#5b8068', flexShrink: 0 }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="surface" style={{ padding: '48px 5.5%', borderRadius: '24px', marginBottom: '90px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-kicker" style={{ justifyContent: 'center' }}>
            <Sun size={14} /> SIMPLE DAILY RHYTHM
          </span>
          <h2 style={{ font: '400 32px Georgia, serif', color: '#294536', marginTop: '8px' }}>
            How MindGuard fits into your day.
          </h2>
        </div>

        <div className="resource-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {steps.map((step) => (
            <div key={step.num} style={{ padding: '20px', background: '#f3f6f0', borderRadius: '16px' }}>
              <span style={{ font: '700 28px Georgia, serif', color: '#8db399', display: 'block', marginBottom: '8px' }}>
                {step.num}
              </span>
              <h3 style={{ font: '600 18px Georgia, serif', color: '#355542', margin: '0 0 6px' }}>{step.title}</h3>
              <p style={{ fontSize: '12px', color: '#748078', margin: 0, lineHeight: 1.6 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Guarantee Banner */}
      <section
        style={{
          background: 'linear-gradient(110deg, #e5efe2, #f1f5eb 60%, #f8e4d2)',
          borderRadius: '24px',
          padding: '48px 6%',
          marginBottom: '90px',
        }}
      >
        <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
          <span className="hero-label">
            <Lock size={13} /> PRIVACY FIRST
          </span>
          <h2 style={{ font: '400 34px Georgia, serif', color: '#355d46', margin: '12px 0 8px' }}>
            Your inner world stays yours.
          </h2>
          <p style={{ color: '#687e70', fontSize: '14px', lineHeight: 1.65 }}>
            We believe mental wellbeing tools must earn your complete trust. MindGuard is designed with zero-compromise privacy boundaries.
          </p>
        </div>

        <div className="resource-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {privacyHighlights.map(({ title, desc, icon: Icon }) => (
            <div key={title} style={{ background: '#ffffffcc', padding: '20px', borderRadius: '16px' }}>
              <Icon size={22} style={{ color: '#527b61', marginBottom: '10px' }} />
              <h4 style={{ font: '600 16px Georgia, serif', color: '#355542', margin: '0 0 6px' }}>{title}</h4>
              <p style={{ fontSize: '12px', color: '#748078', margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section style={{ maxWidth: '800px', margin: '0 auto 90px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-kicker" style={{ justifyContent: 'center' }}>
            <HelpCircle size={14} /> QUESTIONS & ANSWERS
          </span>
          <h2 style={{ font: '400 32px Georgia, serif', color: '#294536', marginTop: '8px' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <details key={q} className="faq-item" style={{ padding: '8px 0' }}>
              <summary style={{ font: '600 16px Georgia, serif', color: '#355542', padding: '12px 0', cursor: 'pointer' }}>
                {q}
              </summary>
              <p style={{ fontSize: '13px', color: '#66776b', lineHeight: 1.7, margin: '4px 0 16px' }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Call to Action CTA */}
      <section
        className="surface"
        style={{
          textAlign: 'center',
          padding: '56px 24px',
          borderRadius: '24px',
          background: '#fbfcf9',
          border: '1px solid #e3eae0',
        }}
      >
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <span className="eyebrow">A GENTLE BEGINNING</span>
          <h2 style={{ font: '400 36px Georgia, serif', color: '#294536', margin: '12px 0' }}>
            Ready to find your steadiness?
          </h2>
          <p style={{ color: '#748078', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
            Join MindGuard today and start your daily practice of mindful reflection.
          </p>
          <Link className="primary-button" href="/sign-up" style={{ padding: '14px 28px', fontSize: '14px', margin: '0 auto' }}>
            Create your free space <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: '60px',
          paddingTop: '24px',
          borderTop: '1px solid #e3eae0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: '#8f9c91',
          fontSize: '12px',
        }}
      >
        <div className="auth-brand" style={{ fontSize: '15px' }}>
          <span>m</span> mindguard
        </div>
        <p style={{ margin: 0 }}>
          MindGuard is a wellness companion for reflection and grounding. If you are in crisis, please call or text 988.
        </p>
      </footer>
    </main>
  )
}
