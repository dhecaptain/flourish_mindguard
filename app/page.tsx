'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Heart,
  Home,
  Leaf,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Sparkles,
  Sun,
  Timer,
  Wind,
  X,
} from 'lucide-react'

const moods = [
  { label: 'Low', icon: '−', tone: 'mood-low' },
  { label: 'Okay', icon: '•', tone: 'mood-okay' },
  { label: 'Good', icon: '◒', tone: 'mood-good' },
  { label: 'Great', icon: '✦', tone: 'mood-great' },
]

const activities = [
  { title: 'Reset your nervous system', detail: 'A 4-minute breathing practice', time: '4 min', icon: Wind, color: 'sage' },
  { title: 'Put it into words', detail: 'A guided reflection for today', time: '8 min', icon: BookOpen, color: 'peach' },
]

function WardOrb({ small = false }: { small?: boolean }) {
  return (
    <div className={`ward-orb ${small ? 'ward-orb-small' : ''}`} aria-label="Ward, your MindGuard companion">
      <div className="ward-halo" />
      <div className="ward-body">
        <div className="ward-ear ward-ear-left" />
        <div className="ward-ear ward-ear-right" />
        <div className="ward-face">
          <span className="ward-eye" />
          <span className="ward-eye" />
          <span className="ward-smile" />
        </div>
        <span className="ward-spark ward-spark-one">✦</span>
        <span className="ward-spark ward-spark-two">·</span>
      </div>
    </div>
  )
}

function SideNav({ active, onChange }: { active: string; onChange: (item: string) => void }) {
  const items = [
    { label: 'Today', icon: Home },
    { label: 'Explore', icon: Search },
    { label: 'Journal', icon: BookOpen },
  ]
  return (
    <aside className="side-nav">
      <div className="brand-mark"><span>m</span></div>
      <p className="brand-name">mindguard</p>
      <nav aria-label="Primary navigation" className="nav-links">
        {items.map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-link ${active === label ? 'nav-link-active' : ''}`} onClick={() => onChange(label)} aria-current={active === label ? 'page' : undefined}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="side-bottom">
        <button className="nav-link" onClick={() => onChange('Help')}><CircleHelp aria-hidden="true" /><span>Support</span></button>
        <div className="profile-chip"><div className="avatar">A</div><div><strong>Alex</strong><span>Growing daily</span></div><MoreHorizontal aria-hidden="true" /></div>
      </div>
    </aside>
  )
}

function MoodCheckIn({ selected, onSelect }: { selected: string | null; onSelect: (mood: string) => void }) {
  return (
    <section className="surface mood-card">
      <div className="section-kicker"><Sun aria-hidden="true" /> DAILY CHECK-IN</div>
      <div className="mood-heading"><div><h2>How are you arriving today?</h2><p>A tiny check-in is a powerful way to notice yourself.</p></div><span className="date-pill">Tuesday, Sep 12</span></div>
      <div className="mood-options" role="group" aria-label="Choose your mood">
        {moods.map((mood) => <button key={mood.label} className={`mood-option ${mood.tone} ${selected === mood.label ? 'mood-selected' : ''}`} onClick={() => onSelect(mood.label)} aria-pressed={selected === mood.label}><span>{mood.icon}</span><small>{mood.label}</small></button>)}
      </div>
      {selected && <p className="saved-note"><Check aria-hidden="true" /> Noted. Thank you for checking in with yourself.</p>}
    </section>
  )
}

function ActivityCard({ activity, completed, onComplete }: { activity: typeof activities[number]; completed: boolean; onComplete: () => void }) {
  const Icon = activity.icon
  return <article className={`activity-card activity-${activity.color} ${completed ? 'activity-complete' : ''}`}><div className="activity-icon"><Icon aria-hidden="true" /></div><div className="activity-copy"><span className="activity-tag">{completed ? 'COMPLETED' : 'FOR YOU'}</span><h3>{activity.title}</h3><p>{activity.detail}</p><span className="activity-time"><Timer aria-hidden="true" /> {activity.time}</span></div><button className="activity-action" onClick={onComplete} aria-label={completed ? `Completed: ${activity.title}` : `Start ${activity.title}`}>{completed ? <Check aria-hidden="true" /> : <Play aria-hidden="true" />}</button></article>
}

export default function Page() {
  const [active, setActive] = useState('Today')
  const [mood, setMood] = useState<string | null>(null)
  const [completed, setCompleted] = useState<number[]>([])
  const [showChat, setShowChat] = useState(false)
  const [affirmation, setAffirmation] = useState(true)

  return <div className="app-shell">
    <SideNav active={active} onChange={setActive} />
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true" /></button><div className="breadcrumb"><span>Tuesday, September 12</span><span className="breadcrumb-dot">/</span><strong>{active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search aria-hidden="true" /></button><button className="help-button" onClick={() => setShowChat(true)}><MessageCircle aria-hidden="true" /> <span>Talk to Ward</span></button></div></header>
      <div className="content-wrap">
        <section className="welcome-row"><div><p className="eyebrow">A soft place to land</p><h1>Good morning, Alex<span className="sun-dot">.</span></h1><p className="intro">You don&apos;t have to have it all figured out. Just be here for this moment.</p></div><div className="streak-card"><div className="streak-flame">✦</div><div><strong>6 day</strong><span>mindful streak</span></div><div className="streak-progress"><i /><i /><i /><i /><i /><i className="filled" /><i className="today" /></div></div></section>
        <section className="ward-hero"><div className="hero-copy"><span className="hero-label"><Sparkles aria-hidden="true" /> YOUR COMPANION</span><h2>Meet Ward.</h2><p>Thoughtful support, whenever you need a little more room to breathe. No judgment, no fixing — just a place to start.</p><button className="text-button" onClick={() => setShowChat(true)}>Say hello <ArrowUpRight aria-hidden="true" /></button></div><WardOrb /></section>
        <div className="dashboard-grid"><div className="left-column"><MoodCheckIn selected={mood} onSelect={setMood} /><section className="section-block"><div className="section-heading"><div><span className="section-kicker"><Leaf aria-hidden="true" /> A LITTLE SOMETHING</span><h2>Made for your moment</h2></div><button className="see-all" onClick={() => setActive('Explore')}>See all <ChevronRight aria-hidden="true" /></button></div><div className="activity-list">{activities.map((activity, index) => <ActivityCard key={activity.title} activity={activity} completed={completed.includes(index)} onComplete={() => setCompleted((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])} />)}</div></section></div><aside className="right-column"><section className="surface rhythm-card"><div className="section-heading"><div><span className="section-kicker">YOUR RHYTHM</span><h2>This week</h2></div><button className="more-button" aria-label="More rhythm options"><MoreHorizontal aria-hidden="true" /></button></div><div className="week-graph"><div className="graph-line" /><div className="graph-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <div key={`${day}-${i}`} className={i === 1 ? 'graph-day-current' : ''}><span className={`graph-bar graph-bar-${i}`} /><small>{day}</small></div>)}</div></div><div className="rhythm-footer"><span><strong>4</strong> check-ins</span><span className="positive">+12% <small>vs last week</small></span></div></section>{affirmation && <section className="affirmation-card"><button className="close-affirmation" onClick={() => setAffirmation(false)} aria-label="Dismiss affirmation"><X aria-hidden="true" /></button><div className="affirmation-mark">“</div><p>You are allowed to take things one breath at a time.</p><span>— a note for today</span></section>}<section className="moments-card"><div className="section-heading"><div><span className="section-kicker">RECENT MOMENTS</span><h2>Your reflections</h2></div><button className="add-button" aria-label="Add reflection"><Plus aria-hidden="true" /></button></div><div className="moment-entry"><div className="moment-icon"><Heart aria-hidden="true" /></div><div><p>“I noticed I was holding my breath...”</p><span>Yesterday · 9:42 AM</span></div><ChevronRight aria-hidden="true" /></div><button className="journal-button" onClick={() => setActive('Journal')}>Open journal <ArrowUpRight aria-hidden="true" /></button></section></aside></div>
        <p className="disclaimer">MindGuard is a wellness companion, not a medical service. If you&apos;re in crisis, please contact <button>988 Suicide &amp; Crisis Lifeline</button> or your local emergency services.</p>
      </div>
    </main>
    <nav className="bottom-nav" aria-label="Mobile navigation">{[{ label: 'Today', icon: Home }, { label: 'Explore', icon: Search }, { label: 'Journal', icon: BookOpen }].map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'bottom-active' : ''} onClick={() => setActive(label)}><Icon aria-hidden="true" /><span>{label}</span></button>)}</nav>
    {showChat && <div className="chat-overlay" role="dialog" aria-modal="true" aria-labelledby="chat-title"><div className="chat-panel"><div className="chat-header"><div className="chat-title"><WardOrb small /><div><span>WARD</span><h2 id="chat-title">A listening space</h2></div></div><button className="icon-button" onClick={() => setShowChat(false)} aria-label="Close chat"><X aria-hidden="true" /></button></div><div className="chat-body"><div className="chat-message ward-message">Hi Alex. I&apos;m here with you. What feels most present right now?</div><div className="chat-suggestion">I&apos;m feeling a little overwhelmed</div><div className="chat-suggestion">I want to celebrate something</div></div><form className="chat-composer" onSubmit={(event) => { event.preventDefault(); setShowChat(false) }}><input aria-label="Message Ward" placeholder="Write what&apos;s on your mind..." /><button type="submit" aria-label="Send message"><ArrowUpRight aria-hidden="true" /></button></form><p className="chat-note">Ward is a supportive wellness companion, not a crisis service.</p></div></div>}
  </div>
}
